# Kinaraidee — Current Release State

เอกสารนี้เป็นจุดอ้างอิงหลักสำหรับสถานะ release ปัจจุบัน เพื่อป้องกัน release/evidence drift ระหว่าง runtime, QA, deployment, Supabase security และ Commercial Readiness

หลักการ: deployment, real-device result, accessibility, security configuration, ผู้ใช้, conversion, partner, payment หรือรายได้ จะถูกระบุว่า PASS/พร้อมใช้งานได้เมื่อมีหลักฐานจริงเท่านั้น

## Current source/runtime state

- Latest reviewed `main`: `d444006015ff2a70337378e8c420c03ce96cab29` (PR #120 merge; compare from `61323280...` shows 3 documentation/evidence commits changing only `CURRENT-RELEASE.md`, with no browser/PWA, Group API or Supabase runtime-state change).
- Current browser/PWA runtime candidate: `35fe4b7fbf201882ea2ebad8ffca2b8da668999b` (PR #79; deployed and trace-verified on GitHub Pages).
- Current Group API source candidate: PR #93 / `fefc29322ac13f7066038a663bfeb7091d218b8f`; previous connected Supabase inspection verified ACTIVE version 6 source/deployment parity.
- PWA cache marker: `kinaraidee-beta-v13`.
- Supabase grant/RLS/security descendants through PR #112 changed database grants, policies/helpers, security verification workflows and evidence only. PR #114 prepared governance documentation/regression protection; PR #119 and PR #120 plus their documentation-only refreshes updated governance/release evidence. None of these descendants change browser/PWA runtime assets or `supabase/functions/group-api/index.ts`.

## Browser/PWA deployment evidence

Status: **PASS FOR CURRENT BROWSER/PWA DEPLOYMENT TRACE**

Confirmed evidence for PR #79 / `35fe4b7fbf201882ea2ebad8ffca2b8da668999b` remains:

- Pages workflow run `32621529715` completed success for that exact SHA.
- Public Pages Trace Check run `32621547307` verified public `release-meta.json` SHA, `kinaraidee-beta-v13`, and matching live Service Worker marker.
- Corresponding Live Smoke run `32621549478` completed success.
- Later documentation, QA, Group API, Supabase security and governance descendants have not changed the browser/PWA runtime candidate.

This deployment PASS is scoped to browser/PWA deployment trace and automated live smoke only. It does not imply real-device, assistive-technology, payment, partner, legal, full Public Beta or Commercial PASS.

## Supabase least-privilege + live anonymous access evidence

On 2026-08-23, connected-project inspection found `anon` / `authenticated` roles had broader public-relation privileges than the active RLS/application operation set required.

Migration `20260823134036 / least_privilege_public_table_grants` reduced browser-facing grants for six tables:

- `beta_feedback`: anon `INSERT`; authenticated `SELECT, INSERT`.
- `partner_applications`: anon/authenticated `INSERT`.
- `restaurant_requests`: anon/authenticated `INSERT`.
- `member_profiles`: anon none; authenticated `SELECT, INSERT, UPDATE`.
- `member_food_history`: anon none; authenticated `SELECT, INSERT, DELETE`.
- `user_food_history`: anon none; authenticated `SELECT, INSERT, DELETE`.

Migration `20260823135244 / revoke_public_partner_opportunity_summary_grants` additionally revoked all direct `anon` / `authenticated` privileges from `partner_opportunity_summary`. Connected inspection confirms the view remains `security_invoker=true`; `anon` / `authenticated` cannot SELECT either the view or its source `restaurant_search_demand`, while `service_role` retains SELECT on both.

A read-only expected-privilege matrix then checked 50 table/view assertions and found **0 mismatches**.

PR #109 merged at `f337d35cfa2fbe71719ec6fde022807d08ef7443` and added a scheduled, GET-only live negative probe for the public Data API. Canonical main evidence:

- workflow: `Supabase Anonymous Data API Access Probe`;
- run `32643996631` completed **success** on exact SHA `f337d35cfa2fbe71719ec6fde022807d08ef7443`;
- job `97205302130` passed a non-mutating public Auth-settings connectivity control;
- anonymous SELECT returned HTTP 401 for all 16 checked public relations, including member/profile/history, feedback/application/request, Group, partner/admin/server-side tables and `partner_opportunity_summary`;
- workflow guards keep the probe GET-only and prohibit printing response bodies.

PR #110 was a temporary read-only Actions diagnostic used only to trace the exact main run and was closed without merge.

Repository contract: `supabase/least-privilege-public-table-grants.sql`; static guard: `.github/workflows/supabase-grant-contract-regression.yml`; live negative probe: `.github/workflows/supabase-anon-access-probe.yml`; detailed evidence: `SUPABASE-GRANT-HARDENING-EVIDENCE.md`.

Evidence boundary: this proves the scoped live relation grants and anonymous Data API SELECT-denial boundary above. It does not prove every authenticated per-user JWT/RLS path, privileged backend authorization path or Production Security PASS.

## Supabase authenticated RLS authorization evidence

Database-side authenticated-claim simulation found a real policy defect in `beta_feedback`: the admin-owner branch of `feedback_select_authenticated` directly referenced `public.admin_dashboard_owners`, while browser-facing roles intentionally have no SELECT privilege on that table. This could turn an otherwise valid normal-user feedback read into a permission error during policy evaluation.

Live remediation was applied in two migrations:

- `20260823140943 / fix_beta_feedback_admin_select_rls_helper` introduced a `STABLE SECURITY DEFINER` admin-owner helper with `search_path=''` and repointed the policy to it.
- Security Advisor then identified the intermediate public-schema helper as an authenticated-callable `SECURITY DEFINER` API surface.
- `20260823141156 / move_feedback_admin_rls_helper_private` moved the helper to schema `private`, revoked anonymous access, retained only authenticated usage/execute required for policy evaluation, repointed the policy and removed the public helper.

Post-remediation connected verification confirms:

- normal authenticated simulation is not treated as admin, sees exactly its own `beta_feedback` rows and is denied cross-user/unowned rows;
- admin-owner simulation is recognized by the private helper and matches the full feedback scope expected by the admin path;
- member profile/history simulations also matched own-row scope exactly and denied cross-user rows for `member_profiles`, `member_food_history` and `user_food_history`;
- transaction-scoped negative mutation probes found cross-user `member_profiles` UPDATE = 0 rows and cross-user history DELETE operations = 0 rows, with the transaction rolled back and no user identifiers or row contents recorded in repository evidence;
- `private.is_admin_dashboard_owner()` is `STABLE SECURITY DEFINER` with `search_path=''`, `anon` cannot execute it, and the public helper no longer exists;
- the Security Advisor warning for an authenticated-callable public `SECURITY DEFINER` helper is no longer present.

PR #112 merged as `722712a5997511998a09ce9ed401f71799bf9283`. Later PR #117 and PR #118 added scoped authenticated read-isolation and cross-user mutation-negative evidence only; they did not change schema, policies, runtime or user data.

Repository contract: `supabase/beta-feedback-admin-rls-contract.sql`; static guard: `.github/workflows/supabase-feedback-rls-contract-regression.yml`; detailed evidence: `SUPABASE-RLS-AUTHORIZATION-EVIDENCE.md` and `SUPABASE-RLS-NEGATIVE-EVIDENCE.md`.

This is database-side role/JWT-claim simulation and live policy/configuration inspection. It does not claim a complete external authenticated-session/API lifecycle PASS or blanket privileged-backend authorization PASS.

## Supabase Auth security gate

Fresh Security Advisor re-check after the relation-grant, view and feedback-RLS hardening reports:

- WARN: `auth_leaked_password_protection` / `Leaked Password Protection Disabled`;
- visible `RLS Enabled No Policy` findings are INFO-only deny-by-default/server-side tables;
- the intermediate public `SECURITY DEFINER` helper warning has been removed by the private-schema migration.

Fresh Performance Advisor after the same DDL changes remains INFO-only unused-index findings and reports no Performance WARN; no index was dropped as part of this security work.

Previous connected evidence records the organization on the Free plan and the leaked-password feature as unavailable without the relevant plan/configuration. Therefore Issue #11 remains **BLOCKED BY PLAN/CONFIGURATION — NOT PASS** until authorized enablement is possible and a fresh Security Advisor result confirms the WARN is absent.

No paid-plan upgrade is authorized or inferred by this repository state.

## Real-device regression status

The remaining device/accessibility gates are not replaced by CI or source inspection:

- NF-09 TalkBack/VoiceOver remains INCONCLUSIVE until a functioning assistive-tech environment is validated and busy/ready behavior is retested end-to-end.
- NF-07 requires a verifiable pre-v13 cache baseline and real-device old-cache → `kinaraidee-beta-v13` upgrade evidence.
- NF-05 requires real iPhone/iPad Safari install-hint evidence.
- TC-08 requires traceable permission-allow evidence, not inference from Maps opening or coordinates alone.
- Android Chrome still requires at least 3 device models total and iPhone Safari at least 2 device models total.
- Remaining TC-01–TC-15 / NF-01–NF-10 evidence must be scored only from actual device evidence.

## Group API / operations evidence

- Current Group API source candidate remains PR #93 / `fefc29322ac13f7066038a663bfeb7091d218b8f`.
- Connected evidence previously verified ACTIVE Supabase `group-api` version 6 source parity and rejection-only live probes, including bounded request-body rejection behavior.
- A refreshed read-only retention baseline at `2026-08-23 14:31 UTC` observed 16 rooms total (14 expired / 2 active), 14 joined votes (10 linked to expired rooms / 4 active), and 0 orphan votes. No cleanup/delete was executed and no retention period is inferred or approved from these counts.
- Synthetic/rejection probes and read-only retention inspection do not establish production traffic baseline, SLA/SLO, application-event ingestion, retention approval, cleanup verification or complete anonymous abuse controls.
- Retention policy remains **NOT APPROVED**.
- Application-level structured-event ingestion/monitoring ownership remains not fully verified.

## Repository governance

Issue #35 remains a Commercial Governance blocker, but the repository-side preparation and evidence are explicit:

- PR #114 merged as `58ab88dc4c3ac8bf34359e7926523b6f2e07bbf0` after 15 successful PR checks and established the governance runbook/required-check contract.
- PR #119 merged as `1b12f44248566a2e2ffe245ed6e783caa6868322` after its inspected PR checks succeeded and refreshed the current-main governance evidence.
- Subsequent commit `61323280ac45885658d36cadb1fcb4c85957d06a` changed only `GOVERNANCE-EVIDENCE.md`; compare against PR #119 merge shows no runtime/source change.
- PR #120 merged at `d444006015ff2a70337378e8c420c03ce96cab29`; compare from `61323280...` shows 3 commits changing only `CURRENT-RELEASE.md`, so this advances the reviewed evidence baseline without superseding browser/PWA or Group API runtime candidates.
- Fresh branch read-back at `61323280...` still reports `protected=false`, protection disabled and required-status-check enforcement `off`; no newer enforcement PASS is inferred from PR #120.
- `GOVERNANCE-RUNBOOK.md` defines the recommended initial `main` protection/ruleset configuration and safe failure-blocking proof procedure.
- Initial required-check candidates are `Kinaraidee Release Consistency / release-consistency`, `Beta integrity checks / validate`, `Kinaraidee Beta QA / static-qa`, and `Kinaraidee Security Hygiene / repository-security-hygiene`; all four currently run on every pull request without path filters.
- `Governance Required Checks Regression` guards those workflow/job identities and universal PR triggers from drift.

Status remains **PREPARED / NOT YET ENFORCED**. The connected GitHub surface still does not expose an administration write action for branch protection/rulesets, and current branch evidence remains unprotected. Workflow success or a prepared runbook does not equal governance enforcement.

Before Commercial GO, an authorized GitHub administration action must enable protection/ruleset enforcement, then a safe temporary failing required check must be verified to block merge and branch state must be read back as protected/enforced.

## Public Beta gate impact

Public Beta is still **NOT COMPLETE**.

The browser/PWA deployment trace is verified, but minimum open evidence still includes real-device/accessibility acceptance, remaining device-matrix coverage, and Blocker/Critical closure appropriate to Beta acceptance. Issue #5 remains the primary technical/device QA tracker; Issue #1 remains Beta launch acceptance.

## Commercial Readiness impact

Commercial launch remains **NO-GO** while important gates remain incomplete, including:

- Public Beta technical/device/accessibility acceptance;
- Supabase leaked-password protection gate (#11), currently blocked by plan/configuration;
- actual `main` branch protection / required-check enforcement (#35), despite completed repository-side preparation;
- remaining external authenticated API/JWT lifecycle and privileged-backend negative authorization evidence beyond the scoped anonymous Data API probe and database-side RLS simulations;
- Group API application-event observability, retention/deletion policy, complete anonymous abuse controls and monitoring ownership/baseline (#45);
- Production Privacy/Terms/controller/contact/retention/legal decisions;
- Production owner/on-call, monitoring, backup/recovery and real rollback/restore drill evidence;
- Payment/Premium provider and real subscription lifecycle evidence;
- real restaurant/affiliate partner commercial evidence for any enabled model.

No user-count, conversion, revenue, payment success, partner readiness, legal approval, full device-matrix PASS, full Public Beta PASS, or Commercial GO is inferred from this document.

## Supersession rule

- Current browser/PWA runtime candidate = merged PR #79 / `35fe4b7fbf201882ea2ebad8ffca2b8da668999b` until another browser/PWA runtime change occurs.
- Current Group API source candidate = merged PR #93 / `fefc29322ac13f7066038a663bfeb7091d218b8f` until another Group API source change occurs.
- Latest reviewed evidence baseline = `d444006015ff2a70337378e8c420c03ce96cab29`; later evidence/documentation-only descendants do not supersede runtime candidates unless runtime source changes.
- Supabase least-privilege relation grants + anonymous SELECT negative probe + scoped database-side RLS simulations are security evidence, not a blanket RLS/Auth/security PASS.
- Governance runbook/required-check contract and evidence refreshes are preparation evidence, not branch-protection enforcement PASS.
- Supabase leaked-password protection remains blocked and must not be inferred PASS from source, CI, grants or deployment evidence.
- Public accessibility/source/synthetic evidence does not close NF-09, NF-07, NF-05 or TC-08 real-device requirements.
