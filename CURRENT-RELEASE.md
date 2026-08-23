# Kinaraidee — Current Release State

เอกสารนี้เป็นจุดอ้างอิงหลักสำหรับสถานะ release ปัจจุบัน เพื่อป้องกัน release/evidence drift ระหว่าง runtime, QA, deployment, Supabase security และ Commercial Readiness

หลักการ: deployment, real-device result, accessibility, security configuration, ผู้ใช้, conversion, partner, payment หรือรายได้ จะถูกระบุว่า PASS/พร้อมใช้งานได้เมื่อมีหลักฐานจริงเท่านั้น

## Current source/runtime state

- Latest reviewed `main`: `722712a5997511998a09ce9ed401f71799bf9283` (PR #112 merge; Supabase feedback authenticated/admin RLS contract + evidence descendant, with no browser/PWA or Group API runtime-source change).
- Current browser/PWA runtime candidate: `35fe4b7fbf201882ea2ebad8ffca2b8da668999b` (PR #79; deployed and trace-verified on GitHub Pages).
- Current Group API source candidate: PR #93 / `fefc29322ac13f7066038a663bfeb7091d218b8f`; previous connected Supabase inspection verified ACTIVE version 6 source/deployment parity.
- PWA cache marker: `kinaraidee-beta-v13`.
- Supabase grant/RLS/security descendants through PR #112 change database grants, policies/helpers, security verification workflows and evidence only. They do not change browser/PWA runtime assets or `supabase/functions/group-api/index.ts`.

## Browser/PWA deployment evidence

Status: **PASS FOR CURRENT BROWSER/PWA DEPLOYMENT TRACE**

Confirmed evidence for PR #79 / `35fe4b7fbf201882ea2ebad8ffca2b8da668999b` remains:

- Pages workflow run `32621529715` completed success for that exact SHA.
- Public Pages Trace Check run `32621547307` verified public `release-meta.json` SHA, `kinaraidee-beta-v13`, and matching live Service Worker marker.
- Corresponding Live Smoke run `32621549478` completed success.
- Later documentation, QA, Group API, and Supabase security descendants have not changed the browser/PWA runtime candidate.

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

Evidence boundary: this proves the scoped live relation grants and anonymous Data API SELECT-denial boundary above. It does **not** prove every authenticated per-user JWT/RLS path, privileged backend authorization path or Production Security PASS.

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
- `private.is_admin_dashboard_owner()` is `STABLE SECURITY DEFINER` with `search_path=''`, `anon` cannot execute it, and the public helper no longer exists;
- the Security Advisor warning for an authenticated-callable public `SECURITY DEFINER` helper is no longer present.

PR #112 merged as `722712a5997511998a09ce9ed401f71799bf9283`. Its head `32011345f4a646fd100427a3811b88d9226624fc` had 15 inspected successful PR checks, including new `Supabase Feedback RLS Contract Regression` run `32645461886`, Security Hygiene, Credential Scanner, Release Consistency/Metadata, Runtime Lineage and the existing Beta/PWA/accessibility/history/group/device-contract suites.

Repository contract: `supabase/beta-feedback-admin-rls-contract.sql`; static guard: `.github/workflows/supabase-feedback-rls-contract-regression.yml`; detailed evidence: `SUPABASE-RLS-AUTHORIZATION-EVIDENCE.md`.

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

Issue #35 remains a Commercial Governance blocker. The most recently verified branch-governance evidence reports `main` protection / required-status-check enforcement absent. Workflow success does not equal governance enforcement.

Before Commercial GO, production merge governance must have verifiable required release/security checks and evidence that a failing required check blocks merge.

## Public Beta gate impact

Public Beta is still **NOT COMPLETE**.

The browser/PWA deployment trace is verified, but minimum open evidence still includes real-device/accessibility acceptance, remaining device-matrix coverage, and Blocker/Critical closure appropriate to Beta acceptance. Issue #5 remains the primary technical/device QA tracker; Issue #1 remains Beta launch acceptance.

## Commercial Readiness impact

Commercial launch remains **NO-GO** while important gates remain incomplete, including:

- Public Beta technical/device/accessibility acceptance;
- Supabase leaked-password protection gate (#11), currently blocked by plan/configuration;
- `main` branch protection / required checks (#35);
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
- Latest reviewed `main` baseline = PR #112 merge `722712a5997511998a09ce9ed401f71799bf9283`; later evidence/documentation descendants do not supersede runtime candidates unless runtime source changes.
- Supabase least-privilege relation grants + anonymous SELECT negative probe + scoped database-side RLS simulations are security evidence, not a blanket RLS/Auth/security PASS.
- Supabase leaked-password protection remains blocked and must not be inferred PASS from source, CI, grants or deployment evidence.
- Public accessibility/source/synthetic evidence does not close NF-09, NF-07, NF-05 or TC-08 real-device requirements.
