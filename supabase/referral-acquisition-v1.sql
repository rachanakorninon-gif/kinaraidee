-- Kinaraidee referral + acquisition attribution v1
-- Additive schema. This measures acquisition/referrals only.
-- It MUST NOT be treated as Campaign 3,000 prize eligibility or entry truth.

create schema if not exists kinaraidee_private;
revoke all on schema kinaraidee_private from public, anon, authenticated;

create table if not exists public.member_referral_codes (
  user_id uuid primary key references auth.users(id) on delete cascade,
  code text not null unique,
  created_at timestamptz not null default now(),
  constraint member_referral_codes_format check (code ~ '^[A-Z0-9_-]{1,24}$')
);

create table if not exists public.member_referrals (
  referred_user_id uuid primary key references auth.users(id) on delete cascade,
  referrer_user_id uuid not null references auth.users(id) on delete cascade,
  referral_code text not null references public.member_referral_codes(code),
  status text not null default 'pending',
  created_at timestamptz not null default now(),
  confirmed_at timestamptz,
  constraint member_referrals_not_self check (referred_user_id <> referrer_user_id),
  constraint member_referrals_status check (status in ('pending','confirmed','invalid'))
);

create index if not exists member_referrals_referrer_status_idx
  on public.member_referrals(referrer_user_id,status);

create table if not exists public.member_acquisition_attribution (
  user_id uuid primary key references auth.users(id) on delete cascade,
  utm_source text,
  utm_medium text,
  utm_campaign text,
  utm_content text,
  referral_code text,
  created_at timestamptz not null default now(),
  constraint member_acquisition_source_format check (utm_source is null or utm_source ~ '^[a-z0-9_-]{1,80}$'),
  constraint member_acquisition_medium_format check (utm_medium is null or utm_medium ~ '^[a-z0-9_-]{1,80}$'),
  constraint member_acquisition_campaign_format check (utm_campaign is null or utm_campaign ~ '^[a-z0-9_-]{1,80}$'),
  constraint member_acquisition_content_format check (utm_content is null or utm_content ~ '^[a-z0-9_-]{1,80}$'),
  constraint member_acquisition_referral_format check (referral_code is null or referral_code ~ '^[A-Z0-9_-]{1,24}$')
);

alter table public.member_referral_codes enable row level security;
alter table public.member_referrals enable row level security;
alter table public.member_acquisition_attribution enable row level security;

-- Browser clients do not read/write the raw growth tables. The authenticated user
-- receives only their own aggregate referral summary through the RPC below.
revoke all on public.member_referral_codes from anon, authenticated;
revoke all on public.member_referrals from anon, authenticated;
revoke all on public.member_acquisition_attribution from anon, authenticated;

-- Backfill codes for members that existed before this feature.
insert into public.member_referral_codes(user_id,code)
select id, 'K' || upper(substr(replace(id::text,'-',''),1,12))
from auth.users
on conflict (user_id) do nothing;

create or replace function kinaraidee_private.handle_new_auth_user_growth()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_referral text;
  v_referrer uuid;
  v_source text;
  v_medium text;
  v_campaign text;
  v_content text;
begin
  insert into public.member_referral_codes(user_id,code)
  values (new.id, 'K' || upper(substr(replace(new.id::text,'-',''),1,12)))
  on conflict (user_id) do nothing;

  v_referral := upper(nullif(btrim(coalesce(new.raw_user_meta_data->>'kinaraidee_referral_code','')),''));
  v_source := lower(nullif(btrim(coalesce(new.raw_user_meta_data->>'kinaraidee_utm_source','')),''));
  v_medium := lower(nullif(btrim(coalesce(new.raw_user_meta_data->>'kinaraidee_utm_medium','')),''));
  v_campaign := lower(nullif(btrim(coalesce(new.raw_user_meta_data->>'kinaraidee_utm_campaign','')),''));
  v_content := lower(nullif(btrim(coalesce(new.raw_user_meta_data->>'kinaraidee_utm_content','')),''));

  if v_referral is not null and v_referral !~ '^[A-Z0-9_-]{1,24}$' then v_referral := null; end if;
  if v_source is not null and v_source !~ '^[a-z0-9_-]{1,80}$' then v_source := null; end if;
  if v_medium is not null and v_medium !~ '^[a-z0-9_-]{1,80}$' then v_medium := null; end if;
  if v_campaign is not null and v_campaign !~ '^[a-z0-9_-]{1,80}$' then v_campaign := null; end if;
  if v_content is not null and v_content !~ '^[a-z0-9_-]{1,80}$' then v_content := null; end if;

  insert into public.member_acquisition_attribution(
    user_id,utm_source,utm_medium,utm_campaign,utm_content,referral_code
  ) values (
    new.id,v_source,v_medium,v_campaign,v_content,v_referral
  ) on conflict (user_id) do nothing;

  if v_referral is not null then
    select rc.user_id into v_referrer
    from public.member_referral_codes rc
    where rc.code = v_referral;

    if v_referrer is not null and v_referrer <> new.id then
      insert into public.member_referrals(
        referred_user_id,referrer_user_id,referral_code,status,confirmed_at
      ) values (
        new.id,
        v_referrer,
        v_referral,
        case when new.email_confirmed_at is null then 'pending' else 'confirmed' end,
        case when new.email_confirmed_at is null then null else new.email_confirmed_at end
      ) on conflict (referred_user_id) do nothing;
    end if;
  end if;

  return new;
end;
$$;

revoke all on function kinaraidee_private.handle_new_auth_user_growth() from public, anon, authenticated;

create or replace function kinaraidee_private.handle_auth_user_email_confirmed()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  if old.email_confirmed_at is null and new.email_confirmed_at is not null then
    update public.member_referrals
    set status='confirmed', confirmed_at=new.email_confirmed_at
    where referred_user_id=new.id and status='pending';
  end if;
  return new;
end;
$$;

revoke all on function kinaraidee_private.handle_auth_user_email_confirmed() from public, anon, authenticated;

drop trigger if exists kinaraidee_growth_after_user_insert on auth.users;
create trigger kinaraidee_growth_after_user_insert
after insert on auth.users
for each row execute function kinaraidee_private.handle_new_auth_user_growth();

drop trigger if exists kinaraidee_growth_after_email_confirm on auth.users;
create trigger kinaraidee_growth_after_email_confirm
after update of email_confirmed_at on auth.users
for each row
when (old.email_confirmed_at is null and new.email_confirmed_at is not null)
execute function kinaraidee_private.handle_auth_user_email_confirmed();

create or replace function public.get_my_referral_summary()
returns table(referral_code text,total_referrals bigint,confirmed_referrals bigint)
language sql
stable
security definer
set search_path = ''
as $$
  select
    rc.code,
    count(r.referred_user_id)::bigint,
    count(r.referred_user_id) filter (where r.status='confirmed')::bigint
  from public.member_referral_codes rc
  left join public.member_referrals r on r.referrer_user_id=rc.user_id
  where rc.user_id=(select auth.uid())
  group by rc.code;
$$;

revoke all on function public.get_my_referral_summary() from public, anon;
grant execute on function public.get_my_referral_summary() to authenticated;

comment on table public.member_referrals is 'Growth referral measurement only; not prize/campaign eligibility truth.';
comment on table public.member_acquisition_attribution is 'First-signup coarse acquisition attribution; no PII in UTM/referral fields.';
comment on function public.get_my_referral_summary() is 'Returns only the authenticated member own referral code and aggregate counts.';
