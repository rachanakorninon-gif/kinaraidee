-- Rollback for referral-acquisition-v1.sql
-- Removes only the referral/acquisition feature introduced by that script.

drop trigger if exists kinaraidee_growth_after_email_confirm on auth.users;
drop trigger if exists kinaraidee_growth_after_user_insert on auth.users;

drop function if exists public.get_my_referral_summary();
drop function if exists kinaraidee_private.handle_auth_user_email_confirmed();
drop function if exists kinaraidee_private.handle_new_auth_user_growth();

drop table if exists public.member_referrals;
drop table if exists public.member_acquisition_attribution;
drop table if exists public.member_referral_codes;

drop schema if exists kinaraidee_private;
