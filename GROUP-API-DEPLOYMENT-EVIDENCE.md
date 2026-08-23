# Kinaraidee Group API — Deployment Evidence

Evidence refreshed: 2026-08-23 (Asia/Bangkok)

## Current verified deployment/source parity

- Supabase project: `cuspfvfzprlgtvtdyilh` (`Kinaraidee`).
- Edge Function: `group-api`.
- Observed deployed status at inspection time: `ACTIVE`.
- Observed deployed version at inspection time: `5`.
- Observed deployment setting: `verify_jwt=false`, preserved intentionally for accountless invited-friend voting.
- Supabase-reported deployed bundle SHA-256 at inspection time: `d2f70b4345ce05af1c4645764f4de205695593b79ba4f165a7fdd7aef52bf150`.
- The deployed `index.ts` payload retrieved from Supabase was inspected against repository `main` at `supabase/functions/group-api/index.ts` (repository blob `9f6cadc6dd9385f8b786aeec56c7d87134cb9e39`) and matched the PR #87 source payload.
- Current deployed payload includes `Cache-Control: no-store`, `X-Content-Type-Options: nosniff`, room expiry/state checks, host-token authorization for host-only actions, validated room/vote inputs, privacy-safe structured operational event code, and an 8 KiB request-body contract enforced against actual UTF-8 bytes after the body is read.
- `Content-Length` remains an early rejection signal, but version 5 also measures `rawBody` bytes before JSON parsing so missing/chunked `Content-Length` cannot bypass the same limit.
- The v4 UUID-shaped room ID checks, 64-hex host-token shape checks and >120-character voter-ID rejection remain present.
- Operational event code remains bounded to fields such as `reason`, `size`, `voteCount`, and `isUpdate`; the inspected source does not directly log room IDs, host tokens, voter IDs, tags, IP addresses, request headers, or request bodies.

## Repository lineage

PR #83 was merged to `main` at `a4237ce6746478caa8f0b9da60d4456b6dce4758` and established the identifier-shape hardening used by v4.

PR #87 was merged at `3b2375e50368add46e8b683111c30ed41be75715` and is the current Group API source candidate. It changes `supabase/functions/group-api/index.ts` so the existing 8 KiB contract is enforced against the actual UTF-8 request body and extends the static regression guard accordingly.

PR #88 was merged at `524c185517b27c55c56218c8331b2a2ecec0f949`; it changes the rejection-only live probe workflow and does not alter backend runtime source. Therefore PR #88 is a live-verification descendant, not a new Group API source candidate.

Earlier PR #63/v3 and PR #83/v4 deployment parity records remain historical evidence and are superseded for current backend source/deployment parity by PR #87 / Supabase v5.

## Live rejection-probe evidence

`Group API Live Observability Probe` run `32631490603` completed `success` on exact `main` SHA `524c185517b27c55c56218c8331b2a2ecec0f949`.

The probe is deliberately rejection-only and non-mutating. It retained the existing checks for unsupported method, malformed room identifiers, malformed host-only room/token shapes and overlong voter IDs, and additionally verified:

- a request body larger than 8 KiB sent with HTTP/1.1 `Transfer-Encoding: chunked` is rejected with HTTP 413 / `request_too_large`.

The chunked transfer case specifically exercises the post-read actual-byte guard rather than relying only on the `Content-Length` early check. The probe does not create a room, submit a successful vote, update a room, or close a room.

Fresh Supabase Edge Function platform logs during the same probe window show version 5 requests with the expected rejection status classes, including:

- GET 405;
- POST 400/403 for the existing malformed-input cases;
- POST 413 at `2026-08-23T09:37:00.760Z` for the oversized request.

This establishes that the controlled probe reached the ACTIVE v5 deployment and that request-level platform invocation logs captured the actual-body 413 rejection.

## Application structured-event evidence status

The currently available Supabase log surface exposes request-level platform events such as method, status code, execution time, function/deployment ID and version. It did not expose the function's application `console.log` JSON payload in the inspected result.

Therefore:

- deployment/source parity for inspected v5 payload: **VERIFIED**
- scoped live v5 rejection behavior including chunked oversized-body 413: **VERIFIED**
- request-level platform log ingestion for the controlled v5 probe: **VERIFIED**
- exact application structured-event ingestion for `component=group-api`: **NOT VERIFIED IN THE AVAILABLE LOG SURFACE**
- monitoring baseline / thresholds / alerts / owner / escalation: **NOT YET VERIFIED**

Do not infer application-event ingestion from platform request logs alone.

## Advisor evidence after v5 deployment

A fresh read-only Supabase advisor re-check after the v5 backend deployment found:

- Security Advisor: leaked-password protection remains disabled (`WARN`); other current findings are INFO-only RLS-enabled/no-policy notices on deny-by-default tables.
- Performance Advisor: INFO-only unused-index notices; no Performance Advisor WARN was observed.

No DDL change was made as part of PR #87/v5.

## Retention baseline observation

A separate read-only SQL baseline on 2026-08-23 observed:

- `group_rooms`: 16 total / 13 expired / 3 active;
- joined `group_votes`: 14 total / 8 attached to expired rooms / 6 attached to active rooms;
- orphan votes: 0;
- expired-room ages at observation time ranged from roughly 1 day 12 hours 53 minutes to 2 days 7 hours 27 minutes.

These are time-stamped operational observations only. They do not select a retention period, authorize deletion, or verify cleanup/cascade execution.

## Evidence boundary

This evidence verifies the inspected ACTIVE `group-api` v5 payload, repository/deployment source parity, and a scoped non-mutating live rejection contract including chunked oversized-body handling with matching platform request logs. It does **not** prove application structured-event ingestion, alerting, load capacity, a complete anonymous rate-limit/quota strategy, approved retention/deletion policy, cleanup correctness, Privacy/PDPA approval, real-device Group final-result behavior, Public Beta completion, or Commercial GO readiness.

Issue #45 remains open for application-event observability, monitoring baseline/operations, retention cleanup, complete anonymous abuse controls, related privacy decisions, and remaining production-readiness evidence.
