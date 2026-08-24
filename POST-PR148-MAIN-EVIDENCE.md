# Post-PR148 Main Evidence

Status: **SCOPED CI / LINEAGE EVIDENCE ONLY**

This document records the repository state after PR #148 without promoting static/CI evidence into live product, partner, revenue, device, or Commercial readiness evidence.

## Reviewed main

- Reviewed `main` SHA: `453ed758b7e206aaf614cda484fccfcc40f42946` (merge of PR #148).
- Repository compare from prior reviewed descendant `4b205282db221daa1980ec4d4722dea9f07cfbdd` to PR #148 main spans 6 commits.
- Changed files in that range are limited to:
  - `.github/workflows/partner-api-live-probe.yml`
  - `.github/workflows/partner-api-regression.yml`
  - `CURRENT-RELEASE.md`
  - `POST-PARTNER-PROBE-HARDENING-EVIDENCE.md`
- No browser/PWA runtime asset, Group API function source, or Partner API Edge Function source changed in this range.

Therefore PR #148 does **not** supersede the current browser/PWA runtime candidate, Group API source candidate, or Partner API deployed function source candidate.

## PR #148 CI evidence

PR #148 head `1415e5f83b9fe9f66182f08f99079f94e78762cc` produced completed-success PR workflow runs including:

- Partner API Regression — run `32694354792`
- Kinaraidee Release Consistency — run `32694354774`
- Kinaraidee Beta QA — run `32694354748`
- Beta integrity checks — run `32694354762`
- Kinaraidee Security Hygiene — run `32694354736`
- Runtime Lineage Regression — run `32694354749`
- Governance Required Checks Regression — run `32694354772`
- Real Device Contract Regression — run `32694354740`
- PWA Cache Upgrade Regression — run `32694354768`
- Surprise Accessibility Regression — run `32694354803`

The PR #148 change strengthens the static regression contract for the rejection-only Partner API probe by requiring the shared curl options (`--silent --show-error --connect-timeout 10 --max-time 30`) and byte-exact `--data-binary @-` delivery in addition to the existing 405/400/413 payload assertions.

## Post-PR148 canonical baseline guard

After PR #148, direct evidence/documentation commits advanced `main` to `e62730f1fbc3bd92dc67ebd089a145bbf391a573` and added `.github/workflows/release-baseline-regression.yml`.

That workflow is intended to prevent a stale canonical reviewed descendant from silently covering later browser/PWA runtime, Group API source, Partner API source, data, or Supabase migration changes. It checks that the `CURRENT-RELEASE.md` reviewed descendant exists, remains an ancestor of the PR head, and that guarded runtime/API/schema paths have not changed after that baseline without corresponding candidate/evidence advancement. It also preserves explicit Public Beta NOT COMPLETE, Commercial NO-GO, leaked-password NOT PASS, and governance NOT YET ENFORCED boundaries.

PR #149 validated this guard through pull-request CI. PR #149 head `5f18b20bdb786c2001ea063428aa3f1f3d8ae084` merged as `5143c677cfe32e72d63340e03ff9071e8e1a6f01`. The `Kinaraidee Release Baseline Regression` run `32699731708` completed successfully. The same PR head also produced completed-success runs for Release Consistency, Beta QA, Beta integrity, Security Hygiene, Runtime Lineage Regression, Governance Required Checks Regression, Real Device Contract Regression, PWA Cache Upgrade Regression, Surprise Accessibility Regression, Credential Scanner Regression, History Sync Regression, Group Result Regression, Release Metadata Regression, and iOS Install Hint Regression.

Repository compare from `e62730f1fbc3bd92dc67ebd089a145bbf391a573` to the PR #149 merge changes only `POST-PR148-MAIN-EVIDENCE.md`; no guarded browser/PWA runtime, Group API, Partner API, or Supabase migration path changes in that range.

This PR #149 result is **repository consistency / lineage CI evidence only**. It does not prove a new Pages deployment, live Partner API probe, real-device acceptance, partner action, conversion, revenue, Public Beta completion, or Commercial GO.

## Evidence boundary

The successful PR runs above prove only that the repository/workflow contracts exercised on the PR head completed successfully. They do **not** prove a new scheduled/manual live Partner API probe run after PR #148, successful product-action requests, production traffic baseline, alert delivery, complete anonymous abuse controls, retention approval, partner agreement, conversion/reconciliation, revenue, real-device acceptance, Public Beta completion, or Commercial GO.

The previously verified merged-main Partner API rejection run remains scoped historical live evidence until a later live probe run is explicitly inspected and recorded.

## Governance read-back

At PR #148 merge, fresh `main` branch read-back still reports:

- `protected=false`
- branch protection disabled
- required status checks enforcement `off`
- no required contexts/checks enforced

Fresh read-back after the baseline-guard direct commit at `e62730f1fbc3bd92dc67ebd089a145bbf391a573` still reports the same unprotected state.

Repository governance therefore remains **PREPARED / NOT YET ENFORCED**. CI success does not substitute for GitHub branch-protection/ruleset enforcement.
