# Kinaraidee — Main Branch Governance Runbook

Status: **PREPARED / NOT YET ENFORCED**

This runbook defines a low-risk starting configuration for protecting `main` before Commercial GO. It does not claim that GitHub branch protection or a repository ruleset is currently enabled.

## Why these checks are the initial required set

The following four workflows run on every pull request without path filters, so they are suitable initial required checks without creating a permanent pending-check problem for documentation-only or narrowly scoped PRs:

| Workflow | Stable job id/name | Purpose |
| --- | --- | --- |
| `Kinaraidee Release Consistency` | `release-consistency` | protects canonical release marker, reviewed SHA lineage, browser/PWA runtime lineage and app-shell strategy |
| `Beta integrity checks` | `validate` | protects required beta files, public wiring, credential patterns, accessibility/privacy markers and PWA integrity |
| `Kinaraidee Beta QA` | `static-qa` | broad static beta QA, syntax, wiring, privacy, PWA, recovery and security checks |
| `Kinaraidee Security Hygiene` | `repository-security-hygiene` | credential-pattern self-test, workflow permission hygiene and dangerous-trigger checks |

Repository regression guard: `.github/workflows/governance-required-checks-regression.yml` verifies that these workflow names/job IDs continue to exist and keep an unfiltered `pull_request` trigger. If any of those contracts change, branch-protection configuration must be reviewed before the change is treated as governance-safe.

## Recommended initial `main` protection/ruleset

Use GitHub branch protection or a repository ruleset targeting `main` with this starting policy:

1. Require a pull request before merge.
2. Require the four checks listed above to pass.
3. Block force pushes to `main`.
4. Block deletion of `main`.
5. Do not configure routine bypass as the normal release path. If an emergency bypass policy is later approved, document who may use it, why, and what post-incident evidence is required.
6. Consider requiring the branch to be up to date before merge only after confirming it does not create unnecessary queue friction for the current repository workflow.

This is a recommended baseline, not evidence that these settings have been applied.

## Safe enforcement proof after protection is enabled

A governance gate is not PASS merely because the settings page looks correct. Capture both a success path and a failure-blocking path.

### A. Read-back evidence

After enabling protection/ruleset, inspect `main` and record:

- `protected=true` or the equivalent active ruleset evidence;
- pull-request requirement enabled;
- the four required checks present;
- force-push/delete policy;
- bypass/admin policy actually configured.

### B. Failing required-check proof

Create a temporary branch and PR that changes **only** `CURRENT-RELEASE.md` so the exact line

`Public Beta is still **NOT COMPLETE**.`

is temporarily changed to a different phrase. This is intentionally safe because it changes documentation only and should cause `Kinaraidee Release Consistency / release-consistency` to fail.

While that required check is failing:

- verify GitHub blocks merge;
- capture the failed required check and merge-block state;
- do **not** merge the failing commit.

Then restore the exact required phrase in the same PR. After required checks pass:

- verify the PR becomes merge-eligible subject to the configured policy;
- close the temporary governance-proof PR **without merge** unless there is an independent reason to retain it.

This proves enforcement rather than merely workflow success.

## Evidence record required for Issue #35

Record at minimum:

- timestamp;
- `main` SHA observed when settings were read back;
- active branch-protection/ruleset state;
- exact required checks;
- force-push/delete settings;
- bypass/admin setting;
- failing proof PR number and failed check run;
- evidence that merge was blocked while the required check failed;
- evidence that the temporary PR was restored/closed safely.

## Scope boundary

Repository governance does not replace deployment trace, Supabase security, real-device/accessibility acceptance, legal/privacy approval, monitoring/operations, payment or partner readiness. Until protection/ruleset is actually enabled and failure-blocking is verified, Issue #35 remains an open Commercial Governance blocker.
