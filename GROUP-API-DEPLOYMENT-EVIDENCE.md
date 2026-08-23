# Kinaraidee Group API — Deployment Evidence

Evidence refreshed: 2026-08-23 (Asia/Bangkok)

## Current verified deployment/source parity

- Supabase project: `cuspfvfzprlgtvtdyilh` (`Kinaraidee`).
- Edge Function: `group-api`.
- Observed deployed status at inspection time: `ACTIVE`.
- Observed deployed version at inspection time: `5`.
- Observed deployment setting: `verify_jwt=false`, preserved intentionally for accountless invited-friend voting.
- Supabase-reported deployed bundle SHA-256 at inspection time: `d2f70b4345ce05af1c4645764f4de205695593b79ba4f165a7fdd7aef52bf150`.
- The deployed `index.ts` payload retrieved from Supabase was inspected against repository `main` at `supabase/functions/group-api/index.ts` (repository blob `9f6cadc6dd9385f8b786aeec56c7d87134cb9e39`) and matched the current PR #87 source payload.
- Current deployed payload preserves the v4 identifier/token hardening and adds an actual UTF-8 request-body byte-length guard with `maxRequestBytes=8192`, while retaining `Content-Length` as an early reject.
- The handler reads the body once with `req.text()`, rejects `byteLength(rawBody)>maxRequestBytes` with HTTP 413 / `request_too_large`, and parses JSON only after the actual-byte check passes. Direct `req.json()` parsing is absent from the current source.
- Operational event code remains bounded to fields such as `reason`, `size`, `voteCount`, and `isUpdate`; the inspected source does not directly log room IDs, host tokens, voter IDs, tags, IP addresses, request headers, or request bodies.

## Repository lineage

PR #87 merged to `main` at `3b2375e50368add46e8b683111c30ed41be75715` and is the current Group API source candidate. It changed `supabase/functions/group-api/index.ts` plus its static regression gate to enforce the actual 8 KiB body-size contract even when `Content-Length` is absent or chunked.

PR #88 merged at `524c185517b27c55c56218c8331b2a2ecec0f949`; it changes only the non-mutating live probe workflow and does not alter `supabase/functions/group-api/index.ts`. Therefore PR #88 is a live-verification descendant, not a new backend source candidate.

Earlier v3/v4 parity evidence is historical and has been superseded for current backend source/deployment parity by PR #87 / Supabase v5.

## Live rejection-probe evidence

`Group API Live Observability Probe` run `32631490603` completed `success` on exact `main` SHA `524c185517b27c55c56218c8331b2a2ecec0f949`. PR #89 was a temporary read-only diagnostic PR and was closed without merge after tracing this run as successful.

The probe is deliberately rejection-only and non-mutating. It retains the v4 rejection cases and additionally sends a payload larger than 8 KiB using HTTP/1.1 chunked transfer with `Transfer-Encoding: chunked`, so the deployed application must enforce the actual-body byte limit rather than relying only on `Content-Length`.

Verified current rejection contract includes:

- unsupported GET → HTTP 405 / `method_not_allowed`;
- malformed `roomId` for `get_room` → HTTP 400 / `invalid_room_id`;
- malformed `roomId` for `submit_vote` → HTTP 400 / `invalid_vote`;
- malformed room/token shapes for host-only actions → HTTP 403 / `forbidden`;
- voter identifier longer than 120 characters → HTTP 400 / `invalid_vote`;
- >8 KiB HTTP/1.1 chunked request body → HTTP 413 / `request_too_large`.

The probe does not create a room, submit a successful vote, update a room, or close a room.

Fresh Supabase Edge Function platform logs during the matching v5 probe window show ACTIVE version 5 requests with expected status classes, including GET 405, POST 400/403, and POST 413. The visible 413 entry occurred at `2026-08-23T09:37:00.760000` with deployment version `5`, which provides matching platform invocation evidence for the actual-body rejection path.

## Application structured-event evidence status

The currently available Supabase log surface exposes request-level platform events such as method, status code, execution time, function/deployment ID and version. It still does not expose the function's application `console.log` JSON payload in the inspected result.

Therefore:

- deployment/source parity for inspected v5 payload: **VERIFIED**
- scoped live v5 rejection behavior including chunked >8 KiB body rejection: **VERIFIED**
- request-level platform log ingestion for the controlled v5 probe: **VERIFIED**
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

This evidence verifies the inspected ACTIVE `group-api` v5 payload, repository/deployment source parity, and a scoped non-mutating live rejection contract including the actual 8 KiB body-size guard with matching platform request logs. It does **not** prove application structured-event ingestion, alerting, load capacity, a complete anonymous rate-limit/quota strategy, approved retention/deletion policy, cleanup correctness, Privacy/PDPA approval, real-device Group final-result behavior, Public Beta completion, or Commercial GO readiness.

Issue #45 remains open for application-event observability, monitoring baseline/operations, retention cleanup, complete anonymous abuse controls, related privacy decisions, and remaining production-readiness evidence.
