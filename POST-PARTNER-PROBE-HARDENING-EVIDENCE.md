# Post-Partner-Probe Hardening Evidence

Status: **WORKFLOW / EVIDENCE LINEAGE ONLY — NOT A NEW RUNTIME OR COMMERCIAL PASS**

This record captures the repository state after the Partner API rejection-only probe was hardened on `main`.

## Reviewed lineage

- Prior reviewed descendant in `CURRENT-RELEASE.md`: `4b205282db221daa1980ec4d4722dea9f07cfbdd`.
- Latest reviewed `main` for this record: `d46bd2f16c1eb6c63f2f86ec0f425fb624f77467`.
- Repository compare from `4b205282...` to `d46bd2f1...`: 3 commits ahead, 0 behind.
- Files changed in that range are limited to:
  - `.github/workflows/partner-api-live-probe.yml`
  - `.github/workflows/partner-api-regression.yml`
  - `CURRENT-RELEASE.md`
- No browser/PWA runtime asset, Group API source, Partner API Edge Function source, Supabase schema/policy/data or real-device result changed in this reviewed range.

## Partner API probe hardening

Commit `4f9e6df319b13eff5eb2c103fd239ac16d79e032` hardened the rejection-only live probe by:

- adding explicit `curl` connection and total-transfer timeouts;
- requiring the existing GET rejection to be HTTP 405 with JSON `{"error":"method_not_allowed"}`;
- requiring malformed JSON to be HTTP 400 with JSON `{"error":"invalid_json"}`;
- requiring an oversized request body to be HTTP 413 with JSON `{"error":"request_too_large"}`;
- preserving the rejection-only scope without adding successful application actions.

Commit `d46bd2f16c1eb6c63f2f86ec0f425fb624f77467` hardened the static Partner API regression guard so the repository contract now requires those timeouts and exact rejection payload assertions to remain present in the live probe.

## Evidence boundary

This evidence establishes only source/workflow lineage and the intended rejection-only monitoring contract. It does **not** establish that the hardened probe has completed a successful live run on `d46bd2f1...`.

At the time this record was created, the GitHub combined-status lookup for `d46bd2f1...` returned no status entries. Therefore no CI, scheduled probe, deployment, real-device, partner, conversion, revenue or Commercial PASS is inferred from these commits.

Existing canonical runtime boundaries remain unchanged unless superseded by separate evidence:

- browser/PWA runtime remains the current v14 candidate recorded in `CURRENT-RELEASE.md`;
- Group API source/deployment lineage remains separately tracked;
- Partner API Edge Function source/deployment parity remains separately tracked in `PARTNER-API-HARDENING-EVIDENCE.md`.

## Follow-up evidence required

- Observe a real scheduled or manual Partner API Live Rejection Probe run using the hardened workflow and record its exact run/SHA/result before claiming recurring probe PASS for this revision.
- Keep complete abuse control, retention approval/cleanup, monitoring ownership/baseline, partner agreements, conversion/reconciliation and revenue evidence separate from rejection-only probe evidence.
- Keep Public Beta device/accessibility acceptance and Commercial Release gates unchanged until their own evidence exists.
