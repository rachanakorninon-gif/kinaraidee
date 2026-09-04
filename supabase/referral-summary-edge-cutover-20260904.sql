-- Post-acceptance security cutover for Member referral summary.
-- Apply only after the Edge-only member.html runtime is deployed and live-smoke verified.
-- Physical signed-in EDGE acceptance was recorded on 2026-09-04.

begin;

revoke execute on function public.get_my_referral_summary() from public, anon, authenticated;

commit;
