# Kinaraidee Group API — Deployment Evidence

Evidence refreshed: 2026-08-23 (Asia/Bangkok)

## Current verified deployment/source parity

- Supabase project: `cuspfvfzprlgtvtdyilh` (`Kinaraidee`).
- Edge Function: `group-api`.
- Observed deployed status at inspection time: `ACTIVE`.
- Observed deployed version at inspection time: `3`.
- Observed deployment setting: `verify_jwt=false`, preserved intentionally for accountless invited-friend voting.
- Supabase-reported deployed bundle SHA-256 at inspection time: `3b4253c1ff9af3750d787b3cdb63b8c3547caf64cf3304d7b285534e1d5b2a07`.
- The deployed `index.ts` payload retrieved from Supabase was inspected against repository `main` at `supabase/functions/group-api/index.ts` (repository blob `ca048e8513f2f4a16bc86838c940c74340a719f5`) and matched the current PR #63 observability source payload.
- Current deployed payload includes `Cache-Control: no-store`, `X-Content-Type-Options: nosniff`, 8 KiB Content-Length rejection, room expiry/state checks, host-token checks for host-only actions, validated room/vote inputs, and privacy-safe structured operational event logging.
- Operational event logging is bounded to fields such as `reason`, `size`, `voteCount`, and `isUpdate`; the inspected source does not directly log room IDs, host tokens, voter IDs, tags, IP addresses, request headers, or request bodies.

## Repository lineage

PR #63 was merged to `main` at `f683f8291e57501e0fde75b0e689324d0a65dfb4` and added the privacy-safe structured operational event instrumentation plus static regression guards for sensitive logging fields.

The repository source currently inspected is the post-PR #63 source. Therefore the earlier v2 parity record is historical, while the current Supabase v3 source/deployment inspection restores **deployment/source parity evidence for the inspected payload**.

## Live-log evidence status

A Supabase Edge Function log inspection was also performed. The returned recent request-level entries visible in that query were from older `group-api` versions (v1/v2) and did not provide a v3 invocation/event record suitable to prove that the new structured application events have been ingested from live traffic.

Therefore:

- deployment/source parity for inspected v3 payload: **VERIFIED**
- live v3 structured-event ingestion: **NOT YET VERIFIED**
- monitoring baseline / thresholds / alerts / owner / escalation: **NOT YET VERIFIED**

Do not create synthetic user activity or infer monitoring rates/counts from the absence of v3 events.

## Evidence boundary

This evidence verifies the inspected ACTIVE `group-api` v3 payload and its parity with current repository source. It does **not** prove live structured-event ingestion, alerting, load capacity, anonymous abuse protection, rate limiting, retention/deletion policy, cleanup correctness, Privacy/PDPA approval, real-device Group final-result behavior, Public Beta completion, or Commercial GO readiness.

Issue #45 remains open for live log-ingestion verification, monitoring baseline/operations, retention cleanup, abuse controls, related privacy decisions, and any required advisor re-checks.
