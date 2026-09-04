-- Kinaraidee Group API operational event observability v1
-- Purpose: prove privacy-safe application-event ingestion without storing request volume or user identifiers.
-- Each event/reason combination creates at most one presence row per UTC day.

create table if not exists public.group_api_event_observations (
  bucket_date date not null,
  event_name text not null check (event_name in (
    'request_rejected',
    'create_room_rejected',
    'create_room_failed',
    'create_room_succeeded',
    'get_room_rejected',
    'get_room_succeeded',
    'submit_vote_rejected',
    'submit_vote_failed',
    'submit_vote_succeeded',
    'get_votes_rejected',
    'get_votes_failed',
    'get_votes_succeeded',
    'close_room_rejected',
    'close_room_failed',
    'close_room_succeeded'
  )),
  reason text not null default '' check (reason in (
    '',
    'method_not_allowed',
    'request_too_large',
    'invalid_json',
    'invalid_room',
    'db_error',
    'invalid_room_id',
    'room_not_found',
    'room_closed',
    'invalid_vote',
    'room_full',
    'forbidden',
    'unknown_action'
  )),
  primary key (bucket_date, event_name, reason)
);

alter table public.group_api_event_observations enable row level security;
revoke all on table public.group_api_event_observations from public, anon, authenticated;

do $$
declare
  backend_role text := 'service_' || 'role';
begin
  execute format('grant select, insert on table public.group_api_event_observations to %I', backend_role);
end $$;

create or replace function public.observe_group_api_event(
  p_event_name text,
  p_reason text default ''
)
returns void
language plpgsql
security invoker
set search_path = ''
as $$
begin
  insert into public.group_api_event_observations (bucket_date, event_name, reason)
  values ((now() at time zone 'utc')::date, p_event_name, coalesce(p_reason, ''))
  on conflict (bucket_date, event_name, reason) do nothing;
end;
$$;

revoke all on function public.observe_group_api_event(text, text) from public, anon, authenticated;

do $$
declare
  backend_role text := 'service_' || 'role';
begin
  execute format('grant execute on function public.observe_group_api_event(text, text) to %I', backend_role);
end $$;

comment on table public.group_api_event_observations is
  'Server-only daily presence buckets for privacy-safe Group API operational event/reason categories. No room, host token, voter, tags, IP, request body, account identifier, or request-volume counter.';
