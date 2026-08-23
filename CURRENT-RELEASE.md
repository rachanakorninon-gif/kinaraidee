# Kinaraidee — Current Release State

เอกสารนี้เป็นจุดอ้างอิงหลักสำหรับสถานะ release ปัจจุบัน เพื่อป้องกัน release/evidence drift ระหว่าง runtime, QA, deployment, Supabase security และ Commercial Readiness

หลักการ: deployment, real-device result, accessibility, security configuration, ผู้ใช้, conversion, partner, payment หรือรายได้ จะถูกระบุว่า PASS/พร้อมใช้งานได้เมื่อมีหลักฐานจริงเท่านั้น

## Current source/runtime state

- Latest reviewed `main`: `41cd9f654931e167e3c8e0e5598cff82e86db2a6` (Supabase least-privilege grant hardening + Auth plan-blocker evidence descendant; no browser/PWA or Group API runtime-source change after the previously reviewed baseline).
- Current browser/PWA runtime candidate: `35fe4b7fbf201882ea2ebad8ffca2b8da668999b` (PR #79; deployed and trace-verified on GitHub Pages).
- Current Group API source candidate: PR #93 / `fefc29322ac13f7066038a663bfeb7091d218b8f`; previous connected Supabase inspection verified ACTIVE version 6 source/deployment parity.
- PWA cache marker: `kinaraidee-beta-v13`.
- Compare from the prior reviewed baseline `b7fd1cf425ce33f19807353f7c3164d08d667742` through `41cd9f654931e167e3c8e0e5598cff82e86db2a6` changes only Supabase grant/evidence files, a grant-contract regression workflow and release documentation. It does not change browser/PWA runtime assets or `supabase/functions/group-api/index.ts`.

## Browser/PWA deployment evidence

Status: **PASS FOR CURRENT BROWSER/PWA DEPLOYMENT TRACE**

Confirmed evidence for PR #79 / `35fe4b7fbf201882ea2ebad8ffca2b8da668999b` remains:

- Pages workflow run `32621529715` completed success for that exact SHA.
- Public Pages Trace Check run `32621547307` verified public `release-meta.json` SHA, `kinaraidee-beta-v13`, and matching live Service Worker marker.
- Corresponding Live Smoke run `32621549478` completed success.
- Later documentation, QA, Group API, and Supabase security descendants have not changed the browser/PWA runtime candidate.

This deployment PASS is scoped to browser/PWA deployment trace and automated live smoke only. It does not imply real-device, assistive-technology, payment, partner, legal, full Public Beta or Commercial PASS.

## Supabase least-privilege grant evidence

On 2026-08-23, connected-project inspection found `anon` / `authenticated` roles had broader public-table privileges than the active RLS operation set required. A scoped least-privilege migration was applied and post-change read-only verification confirmed the intended matrix for six tables:

- `beta_feedback`: anon `INSERT`; authenticated `SELECT, INSERT`.
- `partner_applications`: anon/authenticated `INSERT`.
- `restaurant_requests`: anon/authenticated `INSERT`.
- `member_profiles`: anon none; authenticated `SELECT, INSERT, UPDATE`.
- `member_food_history`: anon none; authenticated `SELECT, INSERT, DELETE`.
- `user_food_history`: anon none; authenticated `SELECT, INSERT, DELETE`.

`service_role` privileges, table data, RLS policies, Edge Functions, browser/PWA runtime, sequences and Auth settings were not changed. Repository contract: `supabase/least-privilege-public-table-grants.sql`; regression guard: `.github/workflows/supabase-grant-contract-regression.yml`; evidence: `SUPABASE-GRANT-HARDENING-EVIDENCE.md`.

This is scoped table-grant hardening evidence only. It does not replace negative authorization testing for every RLS path or make Production Security PASS.

## Supabase Auth security gate

Connected evidence dated 2026-08-23 records:

- organization plan observed: Free;
- Security Advisor WARN: `auth_leaked_password_protection` / `Leaked Password Protection Disabled`;
- current Supabase documentation states leaked-password protection is available on Pro Plan and above.

Therefore this gate is **BLOCKED BY PLAN/CONFIGURATION — NOT PASS**. A plan/configuration decision, authorized enablement, and a fresh Security Advisor result with the WARN absent are required before Issue #11 can close. Evidence: `SUPABASE-AUTH-SECURITY-EVIDENCE.md`.

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
- complete RLS/auth/admin negative authorization evidence beyond the scoped table-grant hardening;
- Group API application-event observability, retention/deletion policy, complete anonymous abuse controls and monitoring ownership/baseline (#45);
- Production Privacy/Terms/controller/contact/retention/legal decisions;
- Production owner/on-call, monitoring, backup/recovery and real rollback/restore drill evidence;
- Payment/Premium provider and real subscription lifecycle evidence;
- real restaurant/affiliate partner commercial evidence for any enabled model.

No user-count, conversion, revenue, payment success, partner readiness, legal approval, full device-matrix PASS, full Public Beta PASS, or Commercial GO is inferred from this document.

## Supersession rule

- Current browser/PWA runtime candidate = merged PR #79 / `35fe4b7fbf201882ea2ebad8ffca2b8da668999b` until another browser/PWA runtime change occurs.
- Current Group API source candidate = merged PR #93 / `fefc29322ac13f7066038a663bfeb7091d218b8f` until another Group API source change occurs.
- Latest reviewed `main` baseline = `41cd9f654931e167e3c8e0e5598cff82e86db2a6`; later evidence/documentation/workflow descendants do not supersede runtime candidates unless runtime source changes.
- Supabase least-privilege table grants are scoped live security evidence, not a blanket RLS/Auth/security PASS.
- Supabase leaked-password protection remains blocked and must not be inferred PASS from source, CI, grants or deployment evidence.
- Public accessibility/source/synthetic evidence does not close NF-09, NF-07, NF-05 or TC-08 real-device requirements.
