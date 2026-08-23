# Post-PR #120 Lineage Evidence

Status: **SCOPED RELEASE/QA EVIDENCE**

Evidence date: 2026-08-24 (Asia/Bangkok)
Baseline: PR #120 merge `d444006015ff2a70337378e8c420c03ce96cab29`
Reviewed `main`: `98fe9254df38c5894c3510ab9314e8b2b4cedbc1`

## Changes after PR #120

Two direct descendants were present on `main` when this evidence was recorded:

1. `08cbe84d0966d3304fbd1bfb2776a5e66880b831` — updates `CURRENT-RELEASE.md` only to synchronize the canonical evidence baseline to PR #120.
2. `98fe9254df38c5894c3510ab9314e8b2b4cedbc1` — updates `.github/workflows/release-consistency.yml` only, adding validation for the declared Group API source-candidate lineage.

Neither descendant changes browser/PWA runtime assets or `supabase/functions/group-api/index.ts`.

Therefore this evidence does **not** supersede:

- browser/PWA runtime candidate PR #79 / `35fe4b7fbf201882ea2ebad8ffca2b8da668999b`; or
- Group API source candidate PR #93 / `fefc29322ac13f7066038a663bfeb7091d218b8f`.

## Group API lineage guard

The new Release Consistency step must fail when either:

- the Group API candidate declared in `CURRENT-RELEASE.md` is not a repository ancestor of the tested head; or
- files under `supabase/functions/group-api` changed after the declared candidate without advancing the canonical candidate/evidence.

This PR exists partly to exercise that newly added guard through the normal pull-request CI path, because the guard itself entered `main` as a direct commit while branch protection remains disabled.

A successful Release Consistency result on this PR is scoped evidence that the guard parses the current canonical candidate and accepts the unchanged Group API lineage. It is not a deployment/source-parity re-verification of Supabase and is not a backend live-test PASS.

## Governance boundary

Fresh GitHub branch read-back at `98fe9254df38c5894c3510ab9314e8b2b4cedbc1` reports:

- `protected=false`;
- branch protection disabled; and
- required status-check enforcement `off`.

Accordingly, the direct commits above are additional evidence of the governance gap tracked in Issue #35. This document and successful PR checks do not turn governance enforcement into PASS.

## Readiness boundary

No device result, user count, conversion, revenue, payment, partner readiness, legal approval, retention approval, accessibility acceptance or Commercial GO is created by this evidence.

Public Beta remains dependent on actual real-device/accessibility/device-matrix acceptance. Commercial readiness remains dependent on the open security, governance, Group API operations/privacy, legal, operations, payment and partner gates recorded in the canonical trackers.
