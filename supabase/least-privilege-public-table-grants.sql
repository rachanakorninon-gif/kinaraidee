-- Kinaraidee Supabase Data API table-grant contract
--
-- Applied to the connected project on 2026-08-23 after transaction-only dry-run
-- verification for the browser-facing tables. The public summary view was reviewed
-- separately and its anon/authenticated grants were revoked after confirming that its
-- underlying restaurant_search_demand relation is already server-side only.
-- Scope: anon/authenticated relation privileges only. RLS policies remain the row-level
-- authorization layer. Privileged backend-role access, sequences, policies and data
-- are not changed by this script.
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

-- Read-only analytics summary backed by restaurant_search_demand. The view uses
-- security_invoker=true and the underlying table has no direct anon/authenticated
-- access; keep the view itself non-public as well.
revoke all privileges on table public.partner_opportunity_summary from anon, authenticated;
