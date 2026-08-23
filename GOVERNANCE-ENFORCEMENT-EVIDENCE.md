# Kinaraidee — Governance Enforcement Evidence

Evidence date: 2026-08-23

Purpose: record the current repository-governance state after PR #114 without treating workflow success or a prepared runbook as proof that `main` is protected.

## Current `main` state

Fresh GitHub branch inspection after PR #114 reports:

- `main` SHA: `58ab88dc4c3ac8bf34359e7926523b6f2e07bbf0`
- `protected=false`
- branch protection `enabled=false`
- required status checks enforcement: `off`
- required status-check contexts/checks: empty

Therefore repository governance is **PREPARED / NOT YET ENFORCED** and Issue #35 remains an open Commercial Governance blocker.

## PR #114 preparation evidence

PR #114 (`Prepare main branch protection runbook and required-check contract`) merged as `58ab88dc4c3ac8bf34359e7926523b6f2e07bbf0`.

Its final head `0ffc70d1a1dace304b4acce8ee902d6f32462f1c` had all inspected PR workflows complete successfully, including:

- `Governance Required Checks Regression` run `32646056459` — success;
- `Kinaraidee Release Consistency` run `32646056475` — success;
- `Beta integrity checks` run `32646056442` — success;
- `Kinaraidee Beta QA` run `32646056461` — success;
- `Kinaraidee Security Hygiene` run `32646056390` — success;
- `Credential Scanner Regression` run `32646056397` — success;
- `Runtime Lineage Regression` run `32646056394` — success;
- `Real Device Contract Regression` run `32646056460` — success;
- `PWA Cache Upgrade Regression` run `32646056373` — success;
- `iOS Install Hint Regression` run `32646056507` — success;
- `Surprise Accessibility Regression` run `32646056440` — success;
- `Group Result Regression` run `32646056457` — success;
- `Kinaraidee History Sync Regression` run `32646056426` — success;
- `Kinaraidee Release Metadata Regression` run `32646056357` — success;
- `Pages Source Diagnostic` run `32646056391` — success.

Workflow success demonstrates that the proposed governance contract is internally consistent. It does **not** demonstrate branch-protection enforcement.

## Prepared required-check baseline

`GOVERNANCE-RUNBOOK.md` defines the initial required set because each workflow runs on every pull request without path filters:

1. `Kinaraidee Release Consistency / release-consistency`
2. `Beta integrity checks / validate`
3. `Kinaraidee Beta QA / static-qa`
4. `Kinaraidee Security Hygiene / repository-security-hygiene`

`.github/workflows/governance-required-checks-regression.yml` guards the workflow names, job identifiers and universal pull-request triggers against drift before protection is enabled.

## Required evidence before this gate can become PASS

1. Enable branch protection or a repository ruleset targeting `main`.
2. Require pull requests before merge.
3. Require the four baseline checks above.
4. Block force pushes and deletion of `main` unless an explicitly approved policy says otherwise.
5. Read back the effective configuration and record `protected=true` or equivalent active-ruleset evidence.
6. Use the safe documentation-only failure proof from `GOVERNANCE-RUNBOOK.md` to make a required check fail without merging the failing change.
7. Verify GitHub blocks merge while the required check is failing.
8. Restore the temporary change, confirm checks recover, then close the proof PR safely.

## Fresh Supabase security context

A fresh Supabase Security Advisor check on the same evidence date still reports `auth_leaked_password_protection` / `Leaked Password Protection Disabled` as the remaining WARN. Visible `rls_enabled_no_policy` findings remain INFO-level deny-by-default/server-side table notices already tracked separately.

This repository-governance evidence does not satisfy the Supabase Auth gate.

## Evidence boundary

- Current governance status: **PREPARED / NOT YET ENFORCED — NOT PASS**.
- No branch-protection/ruleset setting was changed by this evidence record.
- No failing-check merge-block proof has yet been performed.
- CI success does not equal governance enforcement.
- This record does not change browser/PWA runtime, Group API runtime, Supabase schema/data/Auth configuration, real-device results, user counts, conversion, revenue, payment, partner readiness, legal approval, full Public Beta status or Commercial GO.
