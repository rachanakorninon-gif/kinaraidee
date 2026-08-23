-- Kinaraidee Supabase Data API table-grant contract
--
-- Applied to the connected project on 2026-08-23 after a transaction-only dry run.
-- Scope: anon/authenticated table privileges only. RLS policies remain the row-level
-- authorization layer. service_role privileges, sequences, policies and data are not
-- changed by this script.
--
-- Evidence boundary: this file records the intended grant contract. Repository/CI
-- checks cannot prove the live database state; verify live grants separately after any
-- future database/security change.

revoke all privileges on table public.beta_feedback from anon, authenticated;
grant insert on table public.beta_feedback to anon;
grant select, insert on table public.beta_feedback to authenticated;

revoke all privileges on table public.partner_applications from anon, authenticated;
grant insert on table public.partner_applications to anon, authenticated;

revoke all privileges on table public.restaurant_requests from anon, authenticated;
grant insert on table public.restaurant_requests to anon, authenticated;

revoke all privileges on table public.member_profiles from anon, authenticated;
grant select, insert, update on table public.member_profiles to authenticated;

revoke all privileges on table public.member_food_history from anon, authenticated;
grant select, insert, delete on table public.member_food_history to authenticated;

revoke all privileges on table public.user_food_history from anon, authenticated;
grant select, insert, delete on table public.user_food_history to authenticated;
