-- Emergency rollback companion for referral-summary Edge cutover.
-- Use only with a browser runtime rollback that restores the caller-scoped RPC fallback.
-- Do not apply during the normal post-acceptance cutover.

begin;

grant execute on function public.get_my_referral_summary() to authenticated;
revoke execute on function public.get_my_referral_summary() from public, anon;

commit;
