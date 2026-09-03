-- Kinaraidee referral-code privacy fix
-- Production migration trace: 20260903221043 / referral_code_privacy_fix_20260904
-- This file records the guarded privacy correction already applied to the live Supabase project.
-- Referral codes are public random identifiers; they must never derive from auth.users.id.

-- Rotate only legacy/non-random-format codes. If referral/acquisition usage has begun,
-- abort rather than silently invalidating an already-shared referral relationship.
do $$
declare
  needs_rotation boolean;
begin
  select exists (
    select 1
    from public.member_referral_codes
    where code !~ '^K[0-9A-F]{20}$'
  ) into needs_rotation;

  if needs_rotation then
    if exists (select 1 from public.member_referrals)
       or exists (select 1 from public.member_acquisition_attribution) then
      raise exception 'Referral-code rotation blocked because referral/acquisition usage already exists';
    end if;

    update public.member_referral_codes
    set code = 'K' || upper(substr(replace(gen_random_uuid()::text,'-',''),1,20));
  end if;
end;
$$;

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
  -- Referral codes are random public identifiers and must not derive from account UUIDs.
  -- Bare ON CONFLICT keeps an astronomically unlikely code collision from failing signup.
  insert into public.member_referral_codes(user_id,code)
  values (new.id, 'K' || upper(substr(replace(gen_random_uuid()::text,'-',''),1,20)))
  on conflict do nothing;

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
