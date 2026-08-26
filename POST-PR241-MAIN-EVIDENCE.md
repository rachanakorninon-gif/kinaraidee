# Post-PR241 Main Evidence

## Scope

This evidence record documents the verified repository/QA state after PR #241 (`Add Partner API abuse-control decision gate`) merged to `main`.

- Merge commit: `1064dccffa976fa0e1a72608f41c4f344235d198`
- PR head: `43c7d3ae2ac00a99f2f33b202429ce9f42acb112`
- PR #241 changed only:
  - `PARTNER-ABUSE-CONTROL-DECISION.md`
  - `.github/workflows/partner-abuse-control-decision-regression.yml`

PR #241 did not modify browser/PWA runtime, Group API source, Partner API function source, Supabase schema/data/config, device results, Beta-user metrics, partner records, payments, conversions, or revenue.

## Verified PR-head CI

The following pull-request workflow runs for head `43c7d3ae2ac00a99f2f33b202429ce9f42acb112` were inspected and completed successfully:

- Partner Abuse-Control Decision Regression — run `32920222058`
- Kinaraidee Release Consistency — run `32920221950`
- Kinaraidee Release Baseline Regression — run `32920221955`
- Kinaraidee Beta QA — run `32920221934`
- Beta integrity checks — run `32920221975`
- Kinaraidee Security Hygiene — run `32920221951`
- Runtime Lineage Regression — run `32920222033`
- Real Device Contract Regression — run `32920221945`
- Credential Scanner Regression — run `32920221952`
- PWA Cache Upgrade Regression — run `32920222024`

Other successful regression runs existed on the same PR head; this record lists the runs most directly relevant to release, security, lineage, and the new Partner abuse-control decision gate.

## Decision-state boundary

`PARTNER-ABUSE-CONTROL-DECISION.md` remains `NOT APPROVED`.

The following values remain intentionally `UNSET` until real product/security/privacy/operations decisions and evidence exist: traffic envelopes, anonymous client/session identifier, per-action limits/windows, over-limit behavior, false-positive recovery, shared-network handling, retained abuse-control data, retention period, Privacy/Terms reference, monitoring dependency, decision owner, approvers, and approval timestamp.

The successful regression run proves only that the decision record and anti-fabrication boundary are internally consistent. It does **not** implement or prove a rate limiter, quota, load/security resistance, monitoring SLA, retention/privacy approval, successful Partner API product actions, partner agreements, conversions, reconciliation, revenue, Public Beta completion, or Commercial GO.

## Current blocked evidence

Before Partner anonymous abuse control may be treated as approved/implemented, the project still needs real decisions/evidence for the selected traffic/rate policy, identifiers/privacy impact, false-positive recovery, monitoring ownership, retention of abuse-control data, implementation/deployment parity, and over-limit behavior. These must not be inferred from CI success, current row counts, probe cadence, request-size limits, or commercial assumptions.
