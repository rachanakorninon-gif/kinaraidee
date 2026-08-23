# Kinaraidee Group API — Deployment Evidence

Evidence refreshed: 2026-08-23 (Asia/Bangkok)

## Current verified deployment/source parity

- Supabase project: `cuspfvfzprlgtvtdyilh` (`Kinaraidee`).
- Edge Function: `group-api`.
- Observed deployed status at inspection time: `ACTIVE`.
- Observed deployed version at inspection time: `6`.
- Observed deployment setting: `verify_jwt=false`, preserved intentionally for accountless invited-friend voting.
- Supabase-reported deployed bundle SHA-256 at inspection time: `e389ae3a6d5da19f81b909df6616524391825bdaef2ca568b522fbb3d8da2e52`.
- The deployed `index.ts` payload retrieved from Supabase was inspected against repository `main` at `supabase/functions/group-api/index.ts` (repository blob `04e7f595ef73b9fdbdf377ba3b8936a818a109be`) and matched the PR #93 source payload.
- Current deployed payload preserves the previous identifier/token/input hardening and uses `maxRequestBytes=8192` with `Content-Length` as a cheap early reject plus a bounded `ReadableStream` reader as the authoritative body-size guard.
- The stream reader counts each incoming chunk's raw bytes, cancels the reader immediately when the total exceeds 8192 bytes, decodes UTF-8 with a fatal decoder and parses JSON only after the bounded read succeeds.
- Direct `req.json()` and full-body `req.text()` parsing are absent from the current source and are rejected by the static Group API regression gate.
- Operational event code remains bounded to fields such as `reason`, `size`, `voteCount`, and `isUpdate`; the inspected source does not directly log room IDs, host tokens, voter IDs, tags, IP addresses, request headers, request bodies or `rawBody` values.

## Repository lineage

PR #93 merged to `main` at `fefc29322ac13f7066038a663bfeb7091d218b8f` and is the current Group API source candidate. It changed `supabase/functions/group-api/index.ts` plus its static regression gate so oversized chunked/missing-length bodies are stopped while streaming rather than buffered in full before rejection.

PR #95 merged at `8eff6c10e9adb4bd78a2bd0526e4e03e7d4d06f3`; it changes only wording/comments in the non-mutating live probe workflow to describe the streamed v6 guard. It does not alter `supabase/functions/group-api/index.ts`, so PR #95 is a live-verification descendant, not a new backend source candidate.

Earlier v3/v4/v5 parity evidence is historical and has been superseded for current backend source/deployment parity by PR #93 / Supabase v6.

## Live rejection-probe evidence

Canonical `Group API Live Observability Probe` run `32632951668` completed `success` on exact `main` SHA `8eff6c10e9adb4bd78a2bd0526e4e03e7d4d06f3`.

PR #94 was a temporary read-only deployed-v6 diagnostic and independently passed the same rejection contract before being closed without merge. PR #96 was a temporary read-only workflow-run metadata diagnostic; it traced canonical run `32632951668` as successful on the exact SHA above and was closed without merge after evidence capture.

The canonical probe is deliberately rejection-only and non-mutating. It verifies:

- unsupported GET → HTTP 405 / `method_not_allowed`;
- malformed `roomId` for `get_room` → HTTP 400 / `invalid_room_id`;
- malformed `roomId` for `submit_vote` → HTTP 400 / `invalid_vote`;
- malformed room/token shapes for host-only actions → HTTP 403 / `forbidden`;
- voter identifier longer than 120 characters → HTTP 400 / `invalid_vote`;
- >8 KiB HTTP/1.1 chunked request body → HTTP 413 / `request_too_large`.

The oversized-body case forces `Transfer-Encoding: chunked`, so a useful `Content-Length` is unavailable to the early reject and the deployed application must enforce the actual stream byte budget.

The probe does not create a room, submit a successful vote, update a room, or close a room.

Fresh Supabase Edge Function platform logs during the matching canonical run window show ACTIVE version 6 requests with expected status classes, including GET 405, POST 400/403 and POST 413. The visible canonical-run 413 entry occurred at `2026-08-23T10:08:47.714000` with deployment version `6`, providing matching platform invocation evidence for the streamed actual-body rejection path.

## Application structured-event evidence status

The currently available Supabase log surface exposes request-level platform events such as method, status code, execution time, function/deployment ID and version. It still does not expose the function's application `console.log` JSON payload in the inspected result.

Therefore:

- deployment/source parity for inspected v6 payload: **VERIFIED**
- bounded-stream 8 KiB source contract: **VERIFIED IN SOURCE/REGRESSION GATE**
- scoped live v6 rejection behavior including chunked >8 KiB body rejection: **VERIFIED**
- request-level platform log ingestion for the controlled v6 probe: **VERIFIED**
- exact application structured-event ingestion for `component=group-api`: **NOT VERIFIED IN THE AVAILABLE LOG SURFACE**
- monitoring baseline / thresholds / alerts / owner / escalation: **NOT YET VERIFIED**

Do not infer application-event ingestion from platform request logs alone.

## Retention baseline observation

A separate read-only SQL baseline on 2026-08-23 observed:

- `group_rooms`: 16 total / 13 expired / 3 active;
- joined `group_votes`: 14 total / 8 attached to expired rooms / 6 to active rooms;
- orphan votes: 0;
- expired-room ages at observation time ranged from roughly 1 day 12 hours 53 minutes to 2 days 7 hours 27 minutes.

These are time-stamped operational observations only. They do not select a retention period, authorize deletion, or verify cleanup/cascade execution. The database default room expiry of roughly 24 hours is product availability behavior, not an approved retention period.

## Evidence boundary

This evidence verifies the inspected ACTIVE `group-api` v6 payload, repository/deployment source parity, bounded-stream request-size implementation and a scoped non-mutating live rejection contract with matching platform request logs. It does **not** prove application structured-event ingestion, alerting, load capacity, a complete anonymous rate-limit/quota strategy, approved retention/deletion policy, cleanup correctness, Privacy/PDPA approval, real-device Group final-result behavior, Public Beta completion, or Commercial GO readiness.

Issue #45 remains open for application-event observability, monitoring baseline/operations, retention cleanup, complete anonymous abuse controls, related privacy decisions and remaining production-readiness evidence.
