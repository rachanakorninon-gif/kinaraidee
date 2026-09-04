# Kinaraidee Group API — Deployment Evidence

Evidence refreshed: 2026-09-05 (Asia/Bangkok)

## Current verified deployment/source parity

- Supabase project: `cuspfvfzprlgtvtdyilh` (`Kinaraidee`).
- Edge Function: `group-api`.
- Observed deployed status at inspection time: `ACTIVE`.
- Observed deployed version at inspection time: `7`.
- Observed deployment setting: `verify_jwt=false`, preserved intentionally for accountless invited-friend voting.
- Supabase-reported deployed bundle SHA-256 at inspection time: `363f7f547f8b773bec46e211a59c380e276f1fbf2fcc2852471dfd1608730887`.
- The deployed `index.ts` payload retrieved from Supabase was inspected against repository `main` at `supabase/functions/group-api/index.ts` (repository blob `93d5d4afe9436e23ac5a9af3567349bedd8b73af`) and matched the PR #518 source candidate payload.
- Production migration `20260904161702 / group_api_event_observability_v1` is applied.
- Current deployed payload preserves the previous identifier/token/input hardening and uses `maxRequestBytes=8192` with `Content-Length` as a cheap early reject plus a bounded `ReadableStream` reader as the authoritative body-size guard.
- The stream reader counts each incoming chunk's raw bytes, cancels the reader immediately when the total exceeds 8192 bytes, decodes UTF-8 with a fatal decoder and parses JSON only after the bounded read succeeds.
- Direct `req.json()` and full-body `req.text()` parsing remain absent and are rejected by the static Group API regression gate.
- Operational console logging remains bounded to privacy-safe fields such as `reason`, `size`, `voteCount`, and `isUpdate`; the inspected source does not directly log room IDs, host tokens, voter IDs, tags, IP addresses, request headers, request bodies or `rawBody` values.
- The new application-owned persistence copies only allowlisted `event_name` / `reason` presence into a UTC daily bucket. It stores no user/account identifier and no request/event counter.
- `group_api_event_observations` has RLS enabled and only `bucket_date,event_name,reason`; `anon` and `authenticated` do not have table SELECT access. `observe_group_api_event(...)` is `SECURITY INVOKER`; execute is unavailable to `anon`/`authenticated` and available to `service_role`.

## Repository lineage

PR #518 merged to `main` at `8ab5fc9dd506740b48b245469421518381bbe079` and is the current Group API source candidate. It adds the privacy-minimal daily event/reason presence path plus source/schema regression guards while preserving accountless invited-friend voting and the existing bounded-body behavior.

PR #93 merged at `fefc29322ac13f7066038a663bfeb7091d218b8f` and is the historical v6 source candidate that introduced the bounded streaming/cancel/fatal UTF-8 body guard. PR #95 merged at `8eff6c10e9adb4bd78a2bd0526e4e03e7d4d06f3` as a verification descendant without changing Group API source.

Earlier v3/v4/v5/v6 deployment evidence remains historical/scoped; current backend source/deployment parity is PR #518 / Supabase v7.

## Live rejection-probe evidence

Canonical `Group API Live Observability Probe` run `32632951668` was re-run after the v7 deployment. Attempt-2 job `101112482238` completed `success` on 2026-09-05 Asia/Bangkok.

The canonical probe is deliberately rejection-only and non-mutating. It verifies:

- unsupported GET → HTTP 405 / `method_not_allowed`;
- malformed `roomId` for `get_room` → HTTP 400 / `invalid_room_id`;
- malformed `roomId` for `submit_vote` → HTTP 400 / `invalid_vote`;
- malformed room/token shapes for host-only actions → HTTP 403 / `forbidden`;
- voter identifier longer than 120 characters → HTTP 400 / `invalid_vote`;
- >8 KiB HTTP/1.1 chunked request body → HTTP 413 / `request_too_large`.

The oversized-body case forces `Transfer-Encoding: chunked`, so a useful `Content-Length` is unavailable to the early reject and the deployed application must enforce the actual stream byte budget.

The probe does not create a room, submit a successful vote, update a room, or close a room.

The attempt-2 workflow source is historical because it is a rerun of the canonical run, while its HTTP target is the current production Edge Function. Therefore the rerun is used only for the live rejection behavior/application-ingestion observation; v7 source parity is established independently by retrieving the deployed payload from Supabase and comparing it with the PR #518 repository source.

## Application structured-event ingestion evidence

After the successful rejection-only rerun, a read-only database query on UTC date `2026-09-04` found exactly six privacy-safe daily presence rows:

- `request_rejected / method_not_allowed`;
- `request_rejected / request_too_large`;
- `get_room_rejected / invalid_room_id`;
- `submit_vote_rejected / invalid_vote`;
- `get_votes_rejected / forbidden`;
- `close_room_rejected / forbidden`.

The table contained 6 total rows and all 6 belonged to that UTC date at verification time. No room ID, host token, voter ID, tags, IP, request body, account/user identifier, request count or event count is stored in this evidence path.

Therefore:

- deployment/source parity for inspected v7 payload: **VERIFIED**
- production observability migration application: **VERIFIED**
- bounded-stream 8 KiB source contract: **VERIFIED IN SOURCE/REGRESSION GATE**
- scoped live v7 rejection behavior including chunked >8 KiB body rejection: **VERIFIED**
- privacy-safe application-owned event ingestion for the controlled rejection-only probe: **VERIFIED IN SCOPE**
- request/error traffic baseline, thresholds, alert owner/channel/escalation and alert-delivery path: **NOT YET VERIFIED**

The daily presence rows prove that selected application event categories reached the server-owned persistence path. They intentionally do not measure request volume, error rate, unique users or traffic distribution and must not be promoted to monitoring-baseline evidence.

## Post-deployment advisor status

A post-v7 Supabase Security Advisor run reported no new WARN caused by the observability schema. `group_api_event_observations` appears as INFO `RLS Enabled No Policy`, consistent with deliberate deny-by-default/server-only access. `Leaked Password Protection Disabled` remains the visible security WARN. Performance Advisor findings are INFO-only and do not establish a Group monitoring baseline.

## Retention baseline observation

A separate read-only SQL baseline on 2026-08-23 observed:

- `group_rooms`: 16 total / 13 expired / 3 active;
- joined `group_votes`: 14 total / 8 attached to expired rooms / 6 to active rooms;
- orphan votes: 0;
- expired-room ages at observation time ranged from roughly 1 day 12 hours 53 minutes to 2 days 7 hours 27 minutes.

A later read-only baseline recorded in Issue #45 observed 16 rooms total / 16 expired / 0 active, 14 votes linked to expired rooms / 0 active-room votes and 0 orphan votes. No cleanup/deletion was performed by these observations.

These are time-stamped operational observations only. They do not select a retention period, authorize deletion, or verify cleanup/cascade execution. The database default room expiry of roughly 24 hours is product availability behavior, not an approved retention period. Operational/application-log retention is also **NOT APPROVED**; the v7 presence table does not invent a purge duration or automatic deletion policy.

## Evidence boundary

This evidence verifies the inspected ACTIVE `group-api` v7 payload, repository/deployment source parity, production observability migration, bounded-stream request-size implementation, scoped non-mutating rejection behavior and privacy-safe application-owned daily event presence for the controlled rejection-only probe. It does **not** prove production traffic/error-rate baseline, alert thresholds, alert delivery, monitoring owner/SLA/escalation, load capacity, a complete anonymous rate-limit/quota strategy, approved retention/deletion policy, cleanup correctness, Privacy/PDPA approval, real-device Group final-result behavior, Public Beta completion, or Commercial GO readiness.

Issue #45 remains open for monitoring baseline/operations, retention cleanup, complete anonymous abuse controls, related privacy decisions and remaining production-readiness evidence.