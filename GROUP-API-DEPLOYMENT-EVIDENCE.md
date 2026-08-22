# Kinaraidee Group API — Deployment Evidence

Evidence refreshed: 2026-08-23 (Asia/Bangkok)

## Historical verified deployment/source parity

- Supabase project: `cuspfvfzprlgtvtdyilh`.
- Edge Function: `group-api`.
- Observed deployed status at inspection time: `ACTIVE`.
- Observed deployed version at inspection time: `2`.
- Observed deployment setting: `verify_jwt=false`, preserved intentionally for accountless invited-friend voting.
- At the recorded inspection point, deployed function source retrieved from Supabase matched the repository source at `supabase/functions/group-api/index.ts` for the inspected `index.ts` payload.
- Deployed function SHA-256 reported by Supabase at that inspection point: `4f12e48c55a782dbc00b13d739a2a4c72e22e751e9d16dc8e87fd89d4c5cb7bd`.
- The inspected baseline included `Cache-Control: no-store`, `X-Content-Type-Options: nosniff`, 8 KiB Content-Length rejection, room expiry checks, host-token checks for host-only actions, and validated room/vote inputs.

## Current parity status after PR #63

PR #63 was merged to `main` at `f683f8291e57501e0fde75b0e689324d0a65dfb4` and changes the repository Group API source by adding privacy-safe structured operational event logging plus a regression guard for sensitive logging fields.

Because repository backend source changed after the inspected Supabase v2 parity evidence above, that parity evidence is now **HISTORICAL / RE-VERIFICATION REQUIRED** for the current source candidate. Do not infer that the currently deployed Supabase function contains PR #63 until a new deployment/version/source inspection proves it.

The PR #63 head `527cfa0c0fc11d026f549132004b04d71f400662` had inspectable pull-request CI evidence with `Kinaraidee Group API Regression`, `Kinaraidee Security Hygiene`, `Kinaraidee Beta QA`, `Beta integrity checks`, `Kinaraidee Release Consistency`, `Runtime Lineage Regression`, `Credential Scanner Regression`, `Surprise Accessibility Regression`, `Group Result Regression`, `Kinaraidee Release Metadata Regression`, and `Kinaraidee History Sync Regression` completed with `success`. This is source/CI evidence only; it is not Supabase deployment or live log-ingestion evidence.

## Evidence boundary

The historical evidence verifies source/deployment parity only for the inspected `group-api` v2 payload at that earlier inspection point. It does **not** prove current source/deployment parity after PR #63, live log ingestion, alerting, load capacity, anonymous abuse protection, rate limiting, retention/deletion policy, monitoring baseline, Privacy/PDPA approval, real-device Group final-result behavior, or Commercial GO readiness.

Issue #45 remains open for retention cleanup, abuse controls, monitoring baseline/operations, deployment re-verification after backend changes, and related privacy decisions.
