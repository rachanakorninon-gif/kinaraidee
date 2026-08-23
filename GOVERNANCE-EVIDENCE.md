# Kinaraidee — Repository Governance Evidence

Status: **PREPARED / ENFORCEMENT NOT VERIFIED**

This record captures the current repository-governance evidence without claiming that branch protection or a ruleset is enabled.

## Current observed state

Fresh GitHub branch read-back on 2026-08-23 at `main` SHA `a597db1150a02cd703a5dd003d5dc5a3db458f6a` reports:

- `protected=false`;
- protection `enabled=false`;
- required status-check enforcement = `off`;
- required contexts/checks are empty.

The current lineage also contains direct post-PR #114 commits on `main`, including `a04a2efc85048c4e0e04632f1632a3fb461856fb` and `a597db1150a02cd703a5dd003d5dc5a3db458f6a`. Their presence is consistent with the current absence of a pull-request enforcement rule. This is recorded as governance exposure evidence, not as an assertion about who intentionally bypassed a policy.

Compare from PR #114 merge `58ab88dc4c3ac8bf34359e7926523b6f2e07bbf0` through `a597db1150a02cd703a5dd003d5dc5a3db458f6a` is 14 commits ahead and changes only governance/RLS evidence documents plus `.github/workflows/supabase-rls-negative-evidence-regression.yml`; it does not change the browser/PWA runtime candidate or Group API source candidate.

Therefore Issue #35 remains a **Commercial Governance blocker**.

## Prepared required-check contract

The initial proposed required set is:

1. `Kinaraidee Release Consistency` / job `release-consistency`.
2. `Beta integrity checks` / job `validate`.
3. `Kinaraidee Beta QA` / job `static-qa`.
4. `Kinaraidee Security Hygiene` / job `repository-security-hygiene`.

PR #114 added a regression workflow that protects these workflow/job identities and verifies that each candidate workflow retains an unfiltered `pull_request` trigger.

## PR #114 CI evidence

For PR #114 head `0ffc70d1a1dace304b4acce8ee902d6f32462f1c`, the inspected pull-request workflow runs completed successfully, including:

- `Governance Required Checks Regression` run `32646056459` — success.
- `Kinaraidee Release Consistency` run `32646056475` — success.
- `Beta integrity checks` run `32646056442` — success.
- `Kinaraidee Beta QA` run `32646056461` — success.
- `Kinaraidee Security Hygiene` run `32646056390` — success.

Other inspected regression suites for the same PR head also completed successfully.

Evidence boundary: successful PR checks prove the source-side required-check contract is coherent. They do **not** prove GitHub is enforcing those checks on `main`.

## Evidence still required before governance PASS

Do not mark governance PASS until all of the following have direct evidence:

- branch protection or an equivalent repository ruleset is enabled for `main`;
- pull requests are required before merge;
- the intended release/security checks are configured as required checks;
- force-push and branch deletion policy is configured as intended;
- bypass/admin policy is reviewed and recorded;
- a safe failing-check proof demonstrates that GitHub blocks merge while a required check is failing;
- a subsequent branch/API read-back confirms the protection/ruleset is active.

`GOVERNANCE-RUNBOOK.md` contains the safe verification procedure. No failing proof PR has been claimed in this record because enforcement is not currently enabled.

## Scope boundary

Repository-governance evidence does not replace deployment, Supabase/Auth security, real-device/accessibility, Privacy/Legal, monitoring/operations, payment or partner readiness evidence. Commercial GO remains independent of this prepared-but-not-enforced governance state.
