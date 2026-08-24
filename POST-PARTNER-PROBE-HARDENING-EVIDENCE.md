# Post-Partner-Probe Hardening Evidence

Status: **WORKFLOW / EVIDENCE LINEAGE ONLY — NOT A NEW RUNTIME OR COMMERCIAL PASS**

This record captures the repository state after the Partner API rejection-only probe was hardened on `main` and subsequently validated through pull-request CI.

## Reviewed lineage

- Prior reviewed descendant in `CURRENT-RELEASE.md`: `4b205282db221daa1980ec4d4722dea9f07cfbdd`.
- Latest reviewed `main` for this record: `453ed758b7e206aaf614cda484fccfcc40f42946` (merged PR #148).
- Repository compare from `4b205282...` to `453ed758...`: 6 commits ahead, 0 behind.
- Files changed in that range are limited to:
  - `.github/workflows/partner-api-live-probe.yml`
  - `.github/workflows/partner-api-regression.yml`
  - `CURRENT-RELEASE.md`
  - `POST-PARTNER-PROBE-HARDENING-EVIDENCE.md`
- No browser/PWA runtime asset, Group API source, Partner API Edge Function source, Supabase schema/policy/data or real-device result changed in this reviewed range.

## Partner API probe hardening

Commit `4f9e6df319b13eff5eb2c103fd239ac16d79e032` hardened the rejection-only live probe by:

- adding explicit `curl` connection and total-transfer timeouts;
- requiring the existing GET rejection to be HTTP 405 with JSON `{"error":"method_not_allowed"}`;
- requiring malformed JSON to be HTTP 400 with JSON `{"error":"invalid_json"}`;
- requiring an oversized request body to be HTTP 413 with JSON `{"error":"request_too_large"}`;
- preserving the rejection-only scope without adding successful application actions.

Commit `d46bd2f16c1eb6c63f2f86ec0f425fb624f77467` hardened the static Partner API regression guard so the repository contract requires those timeouts and exact rejection payload assertions to remain present in the live probe.

PR #148 (`1415e5f83b9fe9f66182f08f99079f94e78762cc`, merged as `453ed758b7e206aaf614cda484fccfcc40f42946`) then validated the hardened repository contract through pull-request CI. The observed PR-head runs completed successfully, including:

- Partner API Regression run `32694354792`;
- Kinaraidee Release Consistency run `32694354774`;
- Kinaraidee Beta QA run `32694354748`;
- Beta integrity checks run `32694354762`;
- Kinaraidee Security Hygiene run `32694354736`;
- Runtime Lineage Regression run `32694354749`;
- Credential Scanner Regression run `32694354783`;
- Real Device Contract Regression run `32694354740`.

These successful PR runs prove repository workflow/guard consistency for the PR head. They do not prove that a scheduled/manual Partner API Live Rejection Probe using the hardened workflow has itself completed successfully after the hardening.

## Evidence boundary

This evidence establishes source/workflow lineage and PR-CI validation of the intended rejection-only monitoring contract. It does **not** establish partner readiness, successful product-action requests, production traffic baseline, recurring alert delivery, complete abuse control, approved retention, partner agreements, conversion/reconciliation, revenue, Public Beta completion or Commercial GO.

Existing canonical runtime boundaries remain unchanged unless superseded by separate evidence:

- browser/PWA runtime remains the current v14 candidate recorded in `CURRENT-RELEASE.md`;
- Group API source/deployment lineage remains separately tracked;
- Partner API Edge Function source/deployment parity remains separately tracked in `PARTNER-API-HARDENING-EVIDENCE.md`.

## Follow-up evidence required

- Observe a real scheduled or manual Partner API Live Rejection Probe run using the hardened workflow and record its exact run/SHA/result before claiming live-probe PASS for this hardened revision.
- Keep complete abuse control, retention approval/cleanup, monitoring ownership/baseline, partner agreements, conversion/reconciliation and revenue evidence separate from rejection-only probe evidence.
- Keep Public Beta device/accessibility acceptance and Commercial Release gates unchanged until their own evidence exists.
