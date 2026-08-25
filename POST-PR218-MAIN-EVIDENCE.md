# Post-PR218 Main Evidence

## Reviewed merge

- PR: #218 — Bound Group API live probe network waits
- Merged `main` SHA: `cfff88a0c050a132ba77c0e3d65c16575dc2d5da`
- PR head SHA: `4d722a123c0d14a600e18506b50ea2200fda1c17`
- Scope: QA/monitoring workflow hardening only; no browser/PWA runtime, Group API product source, Supabase schema/data, device result, Beta-user metric, payment, partner, conversion or revenue evidence was created.

## Verified PR-head CI

The PR-head workflow set was inspected after completion. Relevant successful runs include:

- Kinaraidee Group API Regression — run `32849428374` — **success**
- Kinaraidee Release Consistency — run `32849428237` — **success**
- Kinaraidee Release Baseline Regression — run `32849428192` — **success**
- Kinaraidee Beta QA — run `32849428411` — **success**
- Beta integrity checks — run `32849428299` — **success**
- Kinaraidee Security Hygiene — run `32849428365` — **success**
- Runtime Lineage Regression — run `32849428375` — **success**
- Real Device Contract Regression — run `32849428391` — **success**
- Credential Scanner Regression — run `32849428188` — **success**

This CI evidence is scoped to repository/workflow contracts. It is not a successful Group API product action and does not establish a monitoring SLA, device acceptance, Public Beta completion or Commercial GO.

## Group API probe contract added by PR #218

The recurring rejection-only Group API live probe now centralizes curl flags through a shared `curl_common` array and bounds every request with:

- connection timeout: 10 seconds
- total transfer timeout: 30 seconds

The existing 5-minute job ceiling remains a separate outer bound. The rejection-only mutation boundary and GitHub Issue failure-alert path remain unchanged.

`Kinaraidee Group API Regression` now guards the timeout contract so future workflow drift is detected in CI.

## Evidence boundary

The following remain open until independent real evidence exists:

- controlled or real failure proving the GitHub Issue alert-delivery path end-to-end;
- application-event ingestion and a production monitoring baseline/owner;
- approved Group API retention/deletion policy and verified cleanup execution;
- complete anonymous abuse-control strategy;
- real-device and accessibility gates tracked by the Beta device/test evidence;
- Supabase Auth leaked-password protection;
- rollback/restore drill;
- Payment/Merchant, real partner agreements, Production Privacy/Legal approval and any commercial reconciliation.

No user count, room/vote count, Beta result, conversion, revenue, payment success, partner readiness, Public Beta PASS or Commercial GO is inferred from PR #218 or the CI runs above.
