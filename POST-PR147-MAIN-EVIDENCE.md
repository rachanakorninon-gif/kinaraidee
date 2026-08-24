# Post-PR147 Main Evidence

Status: **RELEASE-CONSISTENCY CI VALIDATED / RUNTIME UNCHANGED / GOVERNANCE NOT ENFORCED**

This document records evidence observed after PR #147 without promoting CI/static evidence into deployment, real-device, partner, revenue, legal, or Commercial readiness evidence.

## Main lineage

- Current `main` observed at `4bc08800f4ec6d9f89997433081486f9664220fe` (merge of PR #147).
- PR #147 title: `Validate Partner API release consistency guard`.
- PR #147 merged with documentation/evidence + release-consistency workflow changes only.
- Repository compare from `c3331d306a369d19b26b91ed39ac32d840cf864e` to `4bc08800f4ec6d9f89997433081486f9664220fe` shows changes only in `.github/workflows/release-checklist-consistency.yml` and `PARTNER-API-HARDENING-EVIDENCE.md`.
- No browser/PWA runtime asset, Group API source, Partner API function source, Supabase schema/data/config, device result, user data, partner event, conversion, or revenue data changed in that range.

Therefore existing runtime candidates are not superseded by PR #147.

## PR #147 CI evidence

PR #147 head: `736717981a9c63f6b4d9261ce4a2459a9ae56650`.

The following pull-request workflow runs were observed completed with `success` on that head:

- Commercial Release Checklist Consistency — run `32683944438`
- Kinaraidee Release Consistency — run `32683944401`
- Kinaraidee Beta QA — run `32683944398`
- Beta integrity checks — run `32683944408`
- Kinaraidee Security Hygiene — run `32683944406`
- Runtime Lineage Regression — run `32683944448`
- Governance Required Checks Regression — run `32683944430`
- Real Device Contract Regression — run `32683944393`
- Surprise Accessibility Regression — run `32683944396`
- PWA Cache Upgrade Regression — run `32683944429`
- iOS Install Hint Regression — run `32683944523`
- Group Result Regression — run `32683944400`
- Credential Scanner Regression — run `32683944403`
- Kinaraidee History Sync Regression — run `32683944404`
- Kinaraidee Release Metadata Regression — run `32683944474`
- Pages Source Diagnostic — run `32683944402`

Scope of this evidence: the Partner API additions to the commercial release-consistency guard were exercised through PR CI after the ancestry-history fetch fix. This validates the static/cross-document guard behavior on that PR head only.

It does **not** establish a new Partner API deployment, successful product-action request, recurring monitoring SLA, real partner agreement, conversion/reconciliation, revenue, real-device acceptance, Public Beta completion, or Commercial GO.

## Repository governance read-back

Fresh branch read-back for `main` at `4bc08800f4ec6d9f89997433081486f9664220fe` reports:

- `protected=false`
- branch protection disabled
- required-status-check enforcement `off`
- required contexts/checks empty

Status remains **PREPARED / NOT YET ENFORCED**.

CI success, including `Governance Required Checks Regression`, does not equal GitHub branch/ruleset enforcement. Before Commercial GO, an authorized GitHub administration action must enable protection/ruleset enforcement and a safe failing required-check proof must demonstrate that merge is blocked.

## Evidence boundary

This file records source-lineage, PR-CI, and governance read-back only. It creates no device result, user count, conversion, payment, partner, revenue, retention approval, Privacy/Legal approval, deployment PASS, Public Beta PASS, or Commercial GO.
