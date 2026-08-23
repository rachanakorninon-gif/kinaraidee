# Kinaraidee — Current Release State

เอกสารนี้เป็นจุดอ้างอิงหลักสำหรับสถานะ release ปัจจุบัน เพื่อป้องกัน release/evidence drift ระหว่าง runtime, QA, deployment, Supabase security และ Commercial Readiness

หลักการ: deployment, real-device result, accessibility, security configuration, ผู้ใช้, conversion, partner, payment หรือรายได้ จะถูกระบุว่า PASS/พร้อมใช้งานได้เมื่อมีหลักฐานจริงเท่านั้น

## Current source/runtime state

- Latest reviewed `main`: `f337d35cfa2fbe71719ec6fde022807d08ef7443` (PR #109 merge; Supabase anonymous Data API live negative probe + relation-grant contract hardening; no browser/PWA or Group API runtime-source change).
- Current browser/PWA runtime candidate: `35fe4b7fbf201882ea2ebad8ffca2b8da668999b` (PR #79; deployed and trace-verified on GitHub Pages).
- Current Group API source candidate: PR #93 / `fefc29322ac13f7066038a663bfeb7091d218b8f`; previous connected Supabase inspection verified ACTIVE version 6 source/deployment parity.
- PWA cache marker: `kinaraidee-beta-v13`.
- Supabase grant/security descendants through PR #109 change database grants, security verification workflows and evidence only. They do not change browser/PWA runtime assets or `supabase/functions/group-api/index.ts`.

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

## Supabase Auth security gate

Fresh Security Advisor re-check after the relation-grant/view hardening still reports:

- WARN: `auth_leaked_password_protection` / `Leaked Password Protection Disabled`;
- visible `RLS Enabled No Policy` findings are INFO-only deny-by-default/server-side tables;
- no new Security Advisor WARN was introduced by the grant/view hardening.

Performance Advisor remains INFO-only unused-index findings; no index was dropped as part of this work.

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
- Synthetic/rejection probes do not establish production traffic baseline, SLA/SLO, application-event ingestion, retention approval, cleanup verification or complete anonymous abuse controls.
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
- complete authenticated per-user RLS/JWT and privileged/admin negative authorization evidence beyond the scoped relation-grant + anonymous-SELECT hardening;
- Group API application-event observability, retention/deletion policy, complete anonymous abuse controls and monitoring ownership/baseline (#45);
- Production Privacy/Terms/controller/contact/retention/legal decisions;
- Production owner/on-call, monitoring, backup/recovery and real rollback/restore drill evidence;
- Payment/Premium provider and real subscription lifecycle evidence;
- real restaurant/affiliate partner commercial evidence for any enabled model.

No user-count, conversion, revenue, payment success, partner readiness, legal approval, full device-matrix PASS, full Public Beta PASS, or Commercial GO is inferred from this document.

## Supersession rule

- Current browser/PWA runtime candidate = merged PR #79 / `35fe4b7fbf201882ea2ebad8ffca2b8da668999b` until another browser/PWA runtime change occurs.
- Current Group API source candidate = merged PR #93 / `fefc29322ac13f7066038a663bfeb7091d218b8f` until another Group API source change occurs.
- Latest reviewed `main` baseline = PR #109 merge `f337d35cfa2fbe71719ec6fde022807d08ef7443`; later evidence/documentation descendants do not supersede runtime candidates unless runtime source changes.
- Supabase least-privilege relation grants + anonymous SELECT negative probe are scoped live security evidence, not a blanket RLS/Auth/security PASS.
- Supabase leaked-password protection remains blocked and must not be inferred PASS from source, CI, grants or deployment evidence.
- Public accessibility/source/synthetic evidence does not close NF-09, NF-07, NF-05 or TC-08 real-device requirements.
