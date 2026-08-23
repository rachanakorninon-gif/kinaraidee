-- Kinaraidee beta_feedback admin-select RLS contract
--
-- Final live state after migrations:
--   20260823140943 fix_beta_feedback_admin_select_rls_helper
--   20260823141156 move_feedback_admin_rls_helper_private
--
-- Purpose: keep normal authenticated users scoped to their own feedback while allowing
-- an authenticated dashboard owner to read all beta_feedback rows without granting
-- browser-facing roles direct SELECT access to public.admin_dashboard_owners.
--
-- This file records the intended final contract. It is idempotent and may be used to
-- restore that contract, but repository checks do not by themselves prove live RLS.

create schema if not exists private;
revoke all on schema private from public;
revoke all on schema private from anon;
grant usage on schema private to authenticated;

create or replace function private.is_admin_dashboard_owner()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1
    from public.admin_dashboard_owners o
    where lower(o.email) = lower(coalesce(auth.jwt()->>'email',''))
      and o.active = true
  );
$$;

revoke all on function private.is_admin_dashboard_owner() from public;
revoke execute on function private.is_admin_dashboard_owner() from anon;
grant execute on function private.is_admin_dashboard_owner() to authenticated;

drop policy if exists feedback_select_authenticated on public.beta_feedback;
create policy feedback_select_authenticated
on public.beta_feedback
for select
to authenticated
using (
  (select auth.uid()) = user_id
  or (select private.is_admin_dashboard_owner())
);

-- Do not leave an API-exposed SECURITY DEFINER helper in public.
drop function if exists public.is_admin_dashboard_owner();
