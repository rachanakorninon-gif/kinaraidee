-- Kinaraidee product acquisition telemetry v1
-- Purpose: unique-session funnel measurement for reviewed UTM traffic only.

create table if not exists public.product_measurement_meta (
  singleton boolean primary key default true check (singleton),
  started_at timestamptz not null default now(),
  schema_version integer not null default 1 check (schema_version = 1)
);

alter table public.product_measurement_meta enable row level security;
revoke all on table public.product_measurement_meta from public, anon, authenticated;
grant select on table public.product_measurement_meta to service_role;

insert into public.product_measurement_meta (singleton)
values (true)
on conflict (singleton) do nothing;

create table if not exists public.product_acquisition_events (
  id bigint generated always as identity primary key,
  session_id uuid not null,
  event_name text not null check (event_name in (
    'landing',
    'guided_start',
    'surprise_tap',
    'recommendation_result',
    'nearby_tap'
  )),
  utm_source text not null check (
    char_length(utm_source) between 1 and 80 and
    utm_source ~ '^[a-z0-9][a-z0-9_-]{0,79}$'
  ),
  utm_medium text not null check (
    char_length(utm_medium) between 1 and 80 and
    utm_medium ~ '^[a-z0-9][a-z0-9_-]{0,79}$'
  ),
  utm_campaign text not null check (
    char_length(utm_campaign) between 1 and 80 and
    utm_campaign ~ '^[a-z0-9][a-z0-9_-]{0,79}$'
  ),
  utm_content text not null check (
    char_length(utm_content) between 1 and 80 and
    utm_content ~ '^[a-z0-9][a-z0-9_-]{0,79}$'
  ),
  occurred_at timestamptz not null default now(),
  constraint product_acquisition_events_session_stage_key unique (session_id, event_name)
);

create index if not exists product_acquisition_events_occurred_at_idx
  on public.product_acquisition_events (occurred_at);
create index if not exists product_acquisition_events_campaign_content_idx
  on public.product_acquisition_events (utm_campaign, utm_content, occurred_at);
create index if not exists product_acquisition_events_source_idx
  on public.product_acquisition_events (utm_source, occurred_at);

alter table public.product_acquisition_events enable row level security;
revoke all on table public.product_acquisition_events from public, anon, authenticated;
grant select, insert on table public.product_acquisition_events to service_role;
grant usage, select on sequence public.product_acquisition_events_id_seq to service_role;

comment on table public.product_acquisition_events is
  'Pseudonymous first-party acquisition funnel events. One row per session/event stage; no email, account ID, menu, budget, or location.';
