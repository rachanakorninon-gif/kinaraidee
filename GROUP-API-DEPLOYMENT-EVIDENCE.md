# Kinaraidee Group API — Deployment Evidence

Evidence refreshed: 2026-08-23 (Asia/Bangkok)

## Current verified deployment/source parity

- Supabase project: `cuspfvfzprlgtvtdyilh` (`Kinaraidee`).
- Edge Function: `group-api`.
- Observed deployed status at inspection time: `ACTIVE`.
- Observed deployed version at inspection time: `4`.
- Observed deployment setting: `verify_jwt=false`, preserved intentionally for accountless invited-friend voting.
- Supabase-reported deployed bundle SHA-256 at inspection time: `cec4b0678645b49266ed0cd0b826c05ff58e5a751466c0c2ff0899ebf161023c`.
- The deployed `index.ts` payload retrieved from Supabase was inspected against repository `main` at `supabase/functions/group-api/index.ts` (repository blob `90de51709db9634fa4c396c9cd27bbe6de8619de`) and matched the PR #83 source payload.
- Current deployed payload includes `Cache-Control: no-store`, `X-Content-Type-Options: nosniff`, 8 KiB Content-Length rejection, room expiry/state checks, host-token authorization for host-only actions, validated room/vote inputs, and privacy-safe structured operational event code.
- PR #83 additionally validates UUID-shaped room IDs before UUID-column lookups, validates the existing 64-hex host-token shape before host-only DB lookups, and rejects voter IDs longer than 120 characters rather than silently truncating them.
- Operational event code remains bounded to fields such as `reason`, `size`, `voteCount`, and `isUpdate`; the inspected source does not directly log room IDs, host tokens, voter IDs, tags, IP addresses, request headers, or request bodies.

## Repository lineage

PR #83 was squash-merged to `main` at `a4237ce6746478caa8f0b9da60d4456b6dce4758` and is the current Group API source candidate.

PR #84 was squash-merged at `1bec99be1dbdf253bed67610b354973897af253f`; it changes the rejection-only live probe workflow and does not alter `supabase/functions/group-api/index.ts`. Therefore PR #84 is a live-verification descendant, not a new Group API source candidate.

The earlier PR #63 / Supabase v3 parity evidence is historical and has been superseded for current backend source/deployment parity by PR #83 / Supabase v4.

## Live rejection-probe evidence

`Group API Live Observability Probe` run `32629629579` completed `success` on exact `main` SHA `1bec99be1dbdf253bed67610b354973897af253f`.

The probe is deliberately rejection-only and non-mutating. It verified the deployed public endpoint rejects:

- unsupported GET with HTTP 405 / `method_not_allowed`;
- malformed `roomId` for `get_room` with HTTP 400 / `invalid_room_id`;
- malformed `roomId` for `submit_vote` with HTTP 400 / `invalid_vote`;
- malformed room/token shapes for host-only actions with HTTP 403 / `forbidden`;
- a voter identifier longer than 120 characters with HTTP 400 / `invalid_vote`.

The probe does not create a room, submit a successful vote, update a room, or close a room.

Fresh Supabase Edge Function platform logs during the same probe window show version 4 requests with the expected rejection status classes, including GET 405 and POST 400/403 responses. This establishes that the controlled probe reached the ACTIVE v4 deployment and that request-level platform invocation logs were ingested.

## Application structured-event evidence status

The currently available Supabase log surface exposes request-level platform events such as method, status code, execution time, function/deployment ID and version. It did not expose the function's application `console.log` JSON payload in the inspected result.

Therefore:

- deployment/source parity for inspected v4 payload: **VERIFIED**
- scoped live v4 rejection behavior: **VERIFIED**
- request-level platform log ingestion for the controlled v4 probe: **VERIFIED**
- exact application structured-event ingestion for `component=group-api`: **NOT VERIFIED IN THE AVAILABLE LOG SURFACE**
- monitoring baseline / thresholds / alerts / owner / escalation: **NOT YET VERIFIED**

Do not infer application-event ingestion from platform request logs alone.

## Retention baseline observation

A separate read-only SQL baseline on 2026-08-23 observed:

- `group_rooms`: 16 total / 13 expired / 3 active;
- joined `group_votes`: 14 total / 8 attached to expired rooms / 6 attached to active rooms;
- orphan votes: 0;
- expired-room ages at observation time ranged from roughly 1 day 12 hours 53 minutes to 2 days 7 hours 27 minutes.

These are time-stamped operational observations only. They do not select a retention period, authorize deletion, or verify cleanup/cascade execution.

## Evidence boundary

This evidence verifies the inspected ACTIVE `group-api` v4 payload, repository/deployment source parity, and a scoped non-mutating live rejection contract with matching platform request logs. It does **not** prove application structured-event ingestion, alerting, load capacity, a complete anonymous rate-limit/quota strategy, approved retention/deletion policy, cleanup correctness, Privacy/PDPA approval, real-device Group final-result behavior, Public Beta completion, or Commercial GO readiness.

Issue #45 remains open for application-event observability, monitoring baseline/operations, retention cleanup, complete anonymous abuse controls, related privacy decisions, and remaining production-readiness evidence.
