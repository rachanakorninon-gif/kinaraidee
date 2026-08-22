# Kinaraidee Group API — Deployment Evidence

Evidence refreshed: 2026-08-23 (Asia/Bangkok)

## Historical verified deployment/source parity

- Supabase project: `cuspfvfzprlgtvtdyilh`.
- Edge Function: `group-api`.
- Earlier inspected deployment was `ACTIVE` version `2`, `verify_jwt=false`.
- Earlier deployed function SHA-256: `4f12e48c55a782dbc00b13d739a2a4c72e22e751e9d16dc8e87fd89d4c5cb7bd`.
- At that earlier inspection point, deployed `index.ts` matched the then-current repository source and included the existing request/room/host-token hardening.
- That v2 parity evidence is historical because PR #63 later changed the repository Group API source.

## Current verified parity after PR #63

PR #63 was merged to `main` at `f683f8291e57501e0fde75b0e689324d0a65dfb4` and added privacy-safe structured operational event logging plus regression coverage that rejects logging of sensitive identifiers/payload references.

On 2026-08-23, the repository `supabase/functions/group-api/index.ts` source was deployed to the same Supabase `group-api` Edge Function with the existing public invite-flow configuration preserved:

- status after deployment: `ACTIVE`;
- deployed version: `3`;
- `verify_jwt=false` (unchanged from the prior deployment; required by the existing accountless invited-friend voting flow);
- deployed function SHA-256 reported by Supabase: `3b4253c1ff9af3750d787b3cdb63b8c3547caf64cf3304d7b285534e1d5b2a07`;
- post-deploy source inspection retrieved `index.ts` from Supabase and matched the repository candidate, including `logEvent(...)`, bounded operational fields, and the existing API response/security behavior.

This closes the source/deployment parity gap introduced by PR #63 for the inspected v3 payload.

## CI/source evidence for PR #63

The PR #63 head `527cfa0c0fc11d026f549132004b04d71f400662` had inspectable pull-request CI evidence with `Kinaraidee Group API Regression`, `Kinaraidee Security Hygiene`, `Kinaraidee Beta QA`, `Beta integrity checks`, `Kinaraidee Release Consistency`, `Runtime Lineage Regression`, `Credential Scanner Regression`, `Surprise Accessibility Regression`, `Group Result Regression`, `Kinaraidee Release Metadata Regression`, and `Kinaraidee History Sync Regression` completed with `success`.

CI/static evidence and deployment/source parity are separate evidence types. The deployment inspection above proves the current function payload/source/version configuration only; it does not prove production traffic behavior or monitoring quality.

## Evidence boundary

Current v3 evidence verifies only that the inspected deployed Supabase function is ACTIVE, preserves `verify_jwt=false`, and contains the repository PR #63 source candidate.

It does **not** prove live operational-event ingestion volume/quality, alerting, load capacity, anonymous abuse protection, rate limiting, retention/deletion policy, monitoring baseline, Privacy/PDPA approval, real-device Group final-result behavior, user counts, conversion, revenue, or Commercial GO readiness.

Issue #45 remains open for retention cleanup, abuse controls, monitoring baseline/operations, live observability validation, and related privacy decisions.
