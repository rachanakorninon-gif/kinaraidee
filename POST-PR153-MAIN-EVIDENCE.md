# Post-PR153 Main Evidence

Purpose: record the verified repository lineage and pull-request CI evidence after PR #153 without promoting repository checks into runtime, device, user, revenue, partner, payment, or Commercial readiness evidence.

## Repository state reviewed

- PR #153: `Validate current main after PR152 through PR CI`
- PR head SHA: `a15c29fe74023b90b83870c56a1cc062c048ff32`
- Merge SHA on `main`: `e018528cabdfbab1078791c045ae100c71da8df1`
- PR #153 changed exactly one evidence file and explicitly made no browser/PWA, Group API, Partner API, Supabase schema/data/configuration, device, user, conversion, or revenue change.

Repository compare from reviewed baseline `ca339234fc66396ba6b7ededfbb83a830334c0ad` to PR #153 merge SHA spans 9 commits and changes only:

- `.github/workflows/supabase-rls-negative-evidence-regression.yml`
- `CURRENT-RELEASE.md`
- `POST-GROUP-API-RELEASE-GUARD-VALIDATION.md`
- `POST-PR151-MAIN-EVIDENCE.md`
- `POST-PR152-MAIN-EVIDENCE.md`
- `POST-PR152-PR-CI-VALIDATION.md`
- `SUPABASE-RLS-NEGATIVE-EVIDENCE.md`

No browser/PWA runtime asset, Group API source, Partner API source, or Supabase migration/runtime source changed in that compare range.

## Verified PR-head CI evidence

For PR head `a15c29fe74023b90b83870c56a1cc062c048ff32`, the following observed GitHub Actions runs completed successfully:

- Kinaraidee Release Consistency — run `32722789144`
- Kinaraidee Release Baseline Regression — run `32722789106`
- Kinaraidee Beta QA — run `32722789124`
- Beta integrity checks — run `32722789071`
- Kinaraidee Security Hygiene — run `32722789134`
- Runtime Lineage Regression — run `32722789125`
- Real Device Contract Regression — run `32722789102`
- Credential Scanner Regression — run `32722789099`
- Kinaraidee Release Metadata Regression — run `32722789096`
- Governance Required Checks Regression — run `32722789198`
- Surprise Accessibility Regression — run `32722789129`
- Group Result Regression — run `32722789142`
- iOS Install Hint Regression — run `32722789145`
- PWA Cache Upgrade Regression — run `32722789118`
- Kinaraidee History Sync Regression — run `32722789085`
- Pages Source Diagnostic — run `32722789132`

## Evidence boundary

This proves that the repository consistency / regression checks observed above passed on the PR #153 head and that PR #153 was merged. It does **not** prove or create any of the following:

- a new browser/PWA deployment or Live Smoke PASS;
- a new Group API or Partner API deployment;
- complete Supabase/Auth/RLS security PASS;
- branch protection or required-check enforcement;
- real-device NF/TC PASS, keyboard/reduced-motion acceptance, TalkBack/VoiceOver, or full device matrix;
- Public Beta completion;
- user counts, conversions, partner actions, payment success, revenue, or Commercial GO.

The existing browser/PWA runtime candidate, PWA cache marker, API source candidates, deployment evidence, and all open external/device/security/commercial gates remain unchanged unless separately superseded by direct evidence.
