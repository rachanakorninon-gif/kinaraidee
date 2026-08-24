# Kinaraidee — Repository Governance Evidence

Status: **PASS FOR REPOSITORY GOVERNANCE ENFORCEMENT**

This record captures verified GitHub repository-governance evidence for `main`. It is scoped to repository merge governance only and does not imply Public Beta or Commercial readiness.

## Verified current state

Fresh GitHub branch read-back on 2026-08-24 at `main` SHA `901cd82294c3458f610ab820b6736dae80f47951` reports `protected=true`.

Issue #35 records the active repository ruleset `Protect main` with:

- target = default branch (`main`);
- pull request required before merge;
- required approvals = 0;
- bypass list empty;
- branch deletion restricted;
- force pushes blocked;
- required status-check job contexts:
  - `release-consistency`;
  - `static-qa`;
  - `validate`;
  - `repository-security-hygiene`;
- require-branches-up-to-date intentionally off for the current policy.

The legacy branch-protection fields in the branch REST payload still show `protection.enabled=false` and required-status-check enforcement `off`; this is not contradictory because the repository is protected by the repository ruleset rather than the legacy branch-protection mechanism. The branch-level signal is `protected=true`, supplemented by the enforcement tests below.

## Positive enforcement proof — PR #159

PR #159 (`Verify Protect main ruleset enforcement`) changed only `RULESET-ENFORCEMENT-VALIDATION.md` and merged through the protected flow as `901cd82294c3458f610ab820b6736dae80f47951`.

For head `62efa566d42c5f93d320673044fe7ed32577fcba`, inspected pull-request workflow runs completed successfully, including:

- `Kinaraidee Release Consistency` run `32731041661` — success;
- `Kinaraidee Beta QA` run `32731041664` — success;
- `Beta integrity checks` run `32731041682` — success;
- `Kinaraidee Security Hygiene` run `32731041678` — success;
- `Governance Required Checks Regression` run `32731041723` — success.

Issue #35 records that an earlier merge attempt using workflow-name contexts was rejected; after the ruleset was corrected to the actual job/status contexts, PR #159 merged successfully.

## Negative enforcement proof — PR #160

PR #160 (`Negative-test Protect main required check blocking`) intentionally changed only the branch copy of `CURRENT-RUNTIME.md` to an invalid runtime candidate SHA. It was a temporary governance test and was never merged.

Recorded enforcement evidence:

- `Kinaraidee Release Consistency` run `32732740827` concluded failure;
- GitHub rejected the merge with HTTP 405 and explicit rule violation that required status check `release-consistency` was failing;
- PR #160 was closed without merge.

This is the safe failing-check proof that the repository ruleset blocks merge while a selected required check is failing.

## Governance conclusion

Issue #35 is closed as **COMPLETED / GOVERNANCE ENFORCEMENT VERIFIED**. The former Commercial Governance blocker for `main` protection/required-check enforcement is resolved.

This conclusion is limited to repository governance. It does not establish deployment, real-device/accessibility, Supabase Auth, API monitoring/retention/abuse-control, Privacy/Legal, operations/rollback, payment, partner, conversion, revenue, Public Beta completion or Commercial GO.
