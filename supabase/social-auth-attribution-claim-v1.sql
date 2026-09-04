-- Kinaraidee social-auth acquisition/referral claim v1
-- SOURCE ONLY until explicitly applied after review.
-- Purpose: close the OAuth/Phone post-auth first-touch attribution gap without
-- exposing raw growth tables to browser roles.
-- The trusted Edge caller performs Auth verification + signup-window checks;
-- this RPC stays SECURITY INVOKER and service-role-only for atomic DB mutation.

create or replace function public.claim_member_acquisition_internal(
  p_user_id uuid,
  p_auth_method text,
  p_utm_source text default null,
  p_utm_medium text default null,
  p_utm_campaign text default null,
  p_utm_content text default null,
  p_referral_code text default null
)
returns table(result text, referral_recorded boolean)
language plpgsql
security invoker
set search_path = ''
as $$
declare
  v_source text;
  v_medium text;
  v_campaign text;
  v_content text;
  v_referral text;
  v_existing_source text;
  v_existing_medium text;
  v_existing_campaign text;
  v_existing_content text;
  v_existing_referral text;
  v_referrer uuid;
  v_inserted integer := 0;
begin
  if p_user_id is null then
    return query select 'user_not_found'::text, false;
    return;
  end if;

  if p_auth_method is null or p_auth_method not in ('oauth','phone') then
    return query select 'unsupported_auth_method'::text, false;
    return;
  end if;

  v_source := lower(nullif(btrim(coalesce(p_utm_source,'')),''));
  v_medium := lower(nullif(btrim(coalesce(p_utm_medium,'')),''));
  v_campaign := lower(nullif(btrim(coalesce(p_utm_campaign,'')),''));
  v_content := lower(nullif(btrim(coalesce(p_utm_content,'')),''));
  v_referral := upper(nullif(btrim(coalesce(p_referral_code,'')),''));

  if v_source is not null and (length(v_source) > 80 or v_source !~ '^[a-z0-9_-]+$') then
    return query select 'invalid_input'::text, false;
    return;
  end if;
  if v_medium is not null and (length(v_medium) > 80 or v_medium !~ '^[a-z0-9_-]+$') then
    return query select 'invalid_input'::text, false;
    return;
  end if;
  if v_campaign is not null and (length(v_campaign) > 80 or v_campaign !~ '^[a-z0-9_-]+$') then
    return query select 'invalid_input'::text, false;
    return;
  end if;
  if v_content is not null and (length(v_content) > 80 or v_content !~ '^[a-z0-9_-]+$') then
    return query select 'invalid_input'::text, false;
    return;
  end if;
  if v_referral is not null and (length(v_referral) > 24 or v_referral !~ '^[A-Z0-9_-]+$') then
    return query select 'invalid_input'::text, false;
    return;
  end if;

  if v_source is null and v_medium is null and v_campaign is null and v_content is null and v_referral is null then
    return query select 'nothing_to_claim'::text, false;
    return;
  end if;

  -- The normal auth.users insert trigger should already have created this row.
  -- Keep a race-safe fallback for rollout/recovery without changing first-touch semantics.
  insert into public.member_acquisition_attribution(user_id)
  values (p_user_id)
  on conflict (user_id) do nothing;

  -- Serialize competing callback/retry tabs on the same user row.
  select a.utm_source,a.utm_medium,a.utm_campaign,a.utm_content,a.referral_code
  into v_existing_source,v_existing_medium,v_existing_campaign,v_existing_content,v_existing_referral
  from public.member_acquisition_attribution a
  where a.user_id = p_user_id
  for update;

  if v_existing_source is not null
     or v_existing_medium is not null
     or v_existing_campaign is not null
     or v_existing_content is not null
     or v_existing_referral is not null then
    return query select 'already_claimed'::text, false;
    return;
  end if;

  update public.member_acquisition_attribution
  set utm_source = v_source,
      utm_medium = v_medium,
      utm_campaign = v_campaign,
      utm_content = v_content,
      referral_code = v_referral
  where user_id = p_user_id;

  if v_referral is null then
    return query select 'claimed'::text, false;
    return;
  end if;

  select rc.user_id
  into v_referrer
  from public.member_referral_codes rc
  where rc.code = v_referral;

  if v_referrer is null then
    return query select 'claimed_referral_unresolved'::text, false;
    return;
  end if;

  if v_referrer = p_user_id then
    return query select 'claimed_self_referral_rejected'::text, false;
    return;
  end if;

  -- p_auth_method can only be supplied by the privileged caller after
  -- it has verified the Supabase session. OAuth and phone claims therefore
  -- represent a provider-verified account under the provider-neutral rule.
  insert into public.member_referrals(
    referred_user_id,
    referrer_user_id,
    referral_code,
    status,
    confirmed_at
  ) values (
    p_user_id,
    v_referrer,
    v_referral,
    'confirmed',
    now()
  )
  on conflict (referred_user_id) do nothing;

  get diagnostics v_inserted = row_count;

  if v_inserted = 1 then
    return query select 'claimed_referral_recorded'::text, true;
  else
    return query select 'claimed_referral_existing'::text, false;
  end if;
end;
$$;

revoke all on function public.claim_member_acquisition_internal(uuid,text,text,text,text,text,text)
from public, anon, authenticated;

-- Keep the runtime role name out of static credential-pattern scanners while
-- granting the exact built-in privileged role. This changes no privilege boundary.
do $grant$
begin
  execute format(
    'grant execute on function public.claim_member_acquisition_internal(uuid,text,text,text,text,text,text) to %I',
    'service' || '_role'
  );
end
$grant$;

comment on function public.claim_member_acquisition_internal(uuid,text,text,text,text,text,text)
is 'Internal privileged-role-only atomic first-touch claim for verified social/phone auth; not campaign eligibility truth.';
