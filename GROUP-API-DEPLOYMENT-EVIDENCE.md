# Kinaraidee Group API — Deployment Evidence

Evidence refreshed: 2026-08-23 (Asia/Bangkok)

## Verified deployment/source parity

- Supabase project: `cuspfvfzprlgtvtdyilh`.
- Edge Function: `group-api`.
- Observed deployed status: `ACTIVE`.
- Observed deployed version: `2`.
- Observed deployment setting: `verify_jwt=false`, preserved intentionally for accountless invited-friend voting.
- Deployed function source retrieved from Supabase matches the repository source at `supabase/functions/group-api/index.ts` on current `main` for the inspected `index.ts` payload.
- Deployed function SHA-256 reported by Supabase: `4f12e48c55a782dbc00b13d739a2a4c72e22e751e9d16dc8e87fd89d4c5cb7bd`.
- Repository source includes the same current hardening contract: `Cache-Control: no-store`, `X-Content-Type-Options: nosniff`, 8 KiB Content-Length rejection, room expiry checks, host-token checks for host-only actions, and validated room/vote inputs.

## Evidence boundary

This verifies source/deployment parity for the inspected `group-api` v2 function payload. It does **not** prove load capacity, anonymous abuse protection, rate limiting, retention/deletion policy, monitoring readiness, Privacy/PDPA approval, real-device Group final-result behavior, or Commercial GO readiness.

Issue #45 remains open for retention cleanup, abuse controls, monitoring, and related privacy/operations decisions.
