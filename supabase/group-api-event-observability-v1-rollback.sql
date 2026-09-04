-- Kinaraidee Group API operational event observability v1 rollback
-- Execute only as an explicit rollback; this removes the server-only observation table.

revoke all on function public.observe_group_api_event(text, text) from public, anon, authenticated;
drop function if exists public.observe_group_api_event(text, text);

revoke all on table public.group_api_event_observations from public, anon, authenticated;
drop table if exists public.group_api_event_observations;
