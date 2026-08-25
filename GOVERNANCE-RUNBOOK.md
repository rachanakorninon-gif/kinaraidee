# Kinaraidee — Main Branch Governance Runbook

Status: **ENFORCED / VERIFIED FOR REPOSITORY GOVERNANCE**

This runbook documents the current repository-governance baseline for `main`. It is scoped to repository merge governance only and does not imply Public Beta or Commercial readiness.

## Current verified state

Fresh GitHub read-back on 2026-08-25 shows `main` with `protected=true` and repository ruleset `Protect main` in `active` enforcement mode.

The active ruleset targets the default branch and currently requires:

1. A pull request before merge.
2. Required status checks:
   - `release-consistency`
   - `static-qa`
   - `validate`
   - `repository-security-hygiene`
3. Force pushes blocked through the non-fast-forward rule.
4. Branch deletion blocked.
5. No configured bypass actors.

Required approvals are currently `0`, and strict "branch must be up to date" enforcement is intentionally off for the present policy.

The legacy branch-protection fields in the branch REST payload may still show `protection.enabled=false` and legacy required-status-check enforcement `off`. This is not contradictory: protection is provided by the active repository ruleset. Use the active ruleset plus enforcement proof as the canonical governance evidence.

Canonical evidence: `GOVERNANCE-EVIDENCE.md`.

## Required-check workflow contract

The four required checks must keep stable job identities and run on every pull request without path filtering:

| Workflow | Required job/status context | Purpose |
| --- | --- | --- |
| `Kinaraidee Release Consistency` | `release-consistency` | release/runtime lineage and evidence consistency |
| `Beta integrity checks` | `validate` | required beta files, public wiring and PWA integrity |
| `Kinaraidee Beta QA` | `static-qa` | broad static beta QA and syntax/wiring checks |
| `Kinaraidee Security Hygiene` | `repository-security-hygiene` | credential/workflow permission/security hygiene |

`.github/workflows/governance-required-checks-regression.yml` protects these workflow/job identities and the governance evidence boundary. If any required job/context changes, review and update the GitHub ruleset before merging the change.

## Verified enforcement proof

### Positive path — PR #159

PR #159 merged through the protected flow after the ruleset was corrected to use the actual job/status contexts. Its required workflows completed successfully, providing the positive merge path through the enforced ruleset.

### Negative path — PR #160

PR #160 intentionally changed only the branch copy of `CURRENT-RUNTIME.md` to an invalid runtime candidate SHA. `Kinaraidee Release Consistency` failed, GitHub rejected merge with HTTP 405 because required check `release-consistency` was failing, and the PR was closed without merge.

This is the verified failure-blocking proof that a failing selected required check blocks merge.

## Safe maintenance procedure

When changing any required workflow/job identity:

1. Keep the proposed change on a branch/PR; never bypass `main` governance.
2. Confirm all required workflows still have universal `pull_request` triggers.
3. Update the repository ruleset when a required job/status context changes.
4. Verify the PR is blocked while any required check is failing.
5. Verify merge eligibility only after all configured required checks pass.
6. Record new enforcement evidence if the ruleset policy itself changes materially.

Do not create artificial device, Beta-user, payment, partner, conversion, revenue, deployment or Commercial evidence while validating repository governance.

## Scope boundary

Repository governance PASS does not establish deployment correctness, real-device/accessibility acceptance, Supabase Auth/RLS completeness, API monitoring/retention/abuse-control readiness, Privacy/Legal approval, rollback/restore readiness, payment readiness, partner readiness, Public Beta completion or Commercial GO.
