# Kinaraidee — Current Release State

เอกสารนี้เป็นจุดอ้างอิงหลักสำหรับสถานะ release ปัจจุบัน เพื่อป้องกัน release/evidence drift ระหว่าง runtime, QA, deployment, Supabase security และ Commercial Readiness

หลักการ: deployment, real-device result, accessibility, security configuration, ผู้ใช้, conversion, partner, payment หรือรายได้ จะถูกระบุว่า PASS/พร้อมใช้งานได้เมื่อมีหลักฐานจริงเท่านั้น

## Current source/runtime state

- Current browser/PWA runtime candidate: `db539c75f87683a4225baeb5601509fe3bb26f6f` (PR #134 runtime lineage).
- Runtime merge/deployed SHA: `e30aa999f6277b221bf8dae85aa3b23521ad6f06` (PR #134 merged).
- PWA cache marker: `kinaraidee-beta-v14`.
- Current Group API source candidate remains PR #93 / `fefc29322ac13f7066038a663bfeb7091d218b8f`; prior connected inspection verified Supabase ACTIVE version 6 source/deployment parity.
- Partner API source/deployment hardening is tracked separately in `PARTNER-API-HARDENING-EVIDENCE.md`; existing evidence records Supabase ACTIVE v15 parity and rejection-path hardening. This is not partner/commercial readiness evidence.
- `CURRENT-RUNTIME.md` is the canonical small browser/PWA runtime declaration and must stay consistent with this document.

PR #134 changed browser/PWA runtime behavior by adding visible keyboard focus and reduced-motion accessibility hardening on the main app and public Feedback/Partner forms. Therefore historical PR #79 / v13 deployment evidence is no longer the current runtime deployment evidence.

## Browser/PWA deployment evidence

Status: **PASS FOR CURRENT BROWSER/PWA DEPLOYMENT TRACE**

Verified v14 evidence:

- Pages workflow run `32673914310` completed success for deployed SHA `e30aa999f6277b221bf8dae85aa3b23521ad6f06`.
- Corresponding Live Smoke run `32673939090` completed success on the same SHA.
- Read-only diagnostic run `32674078371` confirmed exact Pages/Live Smoke run metadata; temporary PR #135 was closed without merge.
- Live public `release-meta.json` matched deployed SHA `e30aa999f6277b221bf8dae85aa3b23521ad6f06`.
- Live Service Worker marker matched `kinaraidee-beta-v14`.
- Live Smoke covered focus/reduced-motion deployed source contracts, persistent Surprise accessibility markers, Group-result bridge, Partner renderer/privacy wiring and guarded development-only paths.
- PR #136 merged the verified v14 deployment evidence into the canonical runtime declaration.

This deployment PASS is scoped to Pages/public metadata/assets/automated Live Smoke. It does not imply real keyboard interaction, physical reduced-motion behavior, TalkBack/VoiceOver, full device matrix, Public Beta completion or Commercial GO.

## Supabase security evidence

Existing live evidence remains valid unless superseded by a later schema/configuration change:

- least-privilege browser-facing grants and anonymous Data API SELECT-denial evidence are recorded in `SUPABASE-GRANT-HARDENING-EVIDENCE.md`;
- authenticated RLS read-isolation and cross-user negative mutation evidence are recorded in `SUPABASE-RLS-AUTHORIZATION-EVIDENCE.md` and `SUPABASE-RLS-NEGATIVE-EVIDENCE.md`;
- the private admin-owner RLS helper remediation removed the prior public `SECURITY DEFINER` warning;
- Supabase Auth leaked-password protection remains **BLOCKED BY PLAN/CONFIGURATION — NOT PASS** and must not be inferred from code/CI/deployment evidence.

No paid-plan upgrade is authorized or inferred.

## Real-device / accessibility status

Public Beta remains **NOT COMPLETE**. CI, source inspection and Live Smoke do not replace these gates:

- NF-09 TalkBack/VoiceOver remains open until a functioning assistive-technology environment is validated and current v14 behavior is retested end-to-end.
- v14 visible focus must be verified with real keyboard/focus navigation on deployed pages.
- v14 reduced-motion behavior must be verified on a real platform with reduced-motion preference enabled.
- NF-07 now requires a verifiable older-cache baseline and real-device upgrade to `kinaraidee-beta-v14`.
- NF-05 still requires real iPhone/iPad Safari install-hint evidence.
- TC-08 requires traceable permission-allow evidence, not inference from Maps opening or coordinates alone.
- Android Chrome still requires at least 3 device models total and iPhone Safari at least 2 device models total.
- Remaining TC-01–TC-15 / NF-01–NF-10 results must be scored only from actual device evidence.

Historical same-device Android evidence for specific fixed defects remains scoped historical evidence and is not automatically promoted to v14 full-matrix PASS.

## Group API / operations evidence

- Group API source candidate remains PR #93 / Supabase ACTIVE version 6 according to prior verified deployment/source evidence.
- Rejection-only probes and bounded-body behavior are backend security/availability evidence only.
- Group retention policy remains **NOT APPROVED**.
- Read-only retention/dry-run contracts and cleanup-design documents do not execute deletion and do not establish Privacy/Legal approval.
- Application-event observability, monitoring owner/baseline, complete anonymous abuse controls and production retention cleanup remain incomplete.
- Operations evidence templates, recovery-integrity contracts and rollback/runbook preparation do not constitute backup restore or rollback drill PASS until executed evidence exists.

## Partner API evidence

- Partner API request-body handling, coordinate validation, no-store/nosniff and rejection-only probe mechanisms are documented in `PARTNER-API-HARDENING-EVIDENCE.md`.
- Existing deployment evidence records ACTIVE v15 parity, but synthetic rejection-path evidence does not establish production traffic baseline, complete abuse controls, partner agreement, conversion/reconciliation or Commercial readiness.
- No user, click, conversion or revenue figure is inferred from API hardening evidence.

## Repository governance

Status remains **PREPARED / NOT YET ENFORCED** unless fresh GitHub administration evidence proves otherwise.

Repository-side runbooks/regression guards exist, but prior branch read-back showed `main` unprotected with required-status-check enforcement off. CI success does not equal branch protection. Before Commercial GO, an authorized GitHub administration action must enable protection/ruleset enforcement and a safe failing required-check proof must demonstrate that merge is blocked.

## Public Beta gate impact

Public Beta is still **NOT COMPLETE**.

Current v14 browser/PWA deployment trace is verified, but minimum open evidence includes real-device/accessibility acceptance, v14 keyboard/reduced-motion checks, remaining device-matrix coverage and Blocker/Critical closure appropriate to Beta acceptance. Issue #5 remains the primary technical/device QA tracker; Issue #1 remains Beta launch acceptance.

## Commercial Readiness impact

Commercial launch remains **NO-GO** while important gates remain incomplete, including:

- Public Beta technical/device/accessibility acceptance on the current v14 runtime;
- Supabase leaked-password protection gate (#11), currently blocked by plan/configuration;
- actual `main` branch protection / required-check enforcement (#35);
- remaining external authenticated API/JWT lifecycle and privileged-backend negative authorization evidence beyond currently scoped tests;
- Group API application-event observability, retention/deletion policy, complete anonymous abuse controls and monitoring ownership/baseline (#45);
- Partner API complete abuse-control/monitoring/retention and real partner-commercial evidence;
- Production Privacy/Terms/controller/contact/retention/legal decisions;
- Production owner/on-call, monitoring, backup/recovery and real rollback/restore drill evidence;
- Payment/Premium provider and real subscription lifecycle evidence;
- real restaurant/affiliate partner agreements and verified commercial reconciliation for any enabled model.

No user-count, conversion, revenue, payment success, partner readiness, legal approval, full device-matrix PASS, full Public Beta PASS or Commercial GO is inferred from this document.

## Supersession rule

- Current browser/PWA runtime candidate = PR #134 runtime lineage `db539c75f87683a4225baeb5601509fe3bb26f6f`; deployed merge SHA = `e30aa999f6277b221bf8dae85aa3b23521ad6f06` until another browser/PWA runtime change occurs.
- Current PWA cache marker = `kinaraidee-beta-v14`.
- Current Group API source candidate = merged PR #93 / `fefc29322ac13f7066038a663bfeb7091d218b8f` until another Group API source change occurs.
- Partner API source/deployment lineage is tracked in `PARTNER-API-HARDENING-EVIDENCE.md`; Partner API evidence does not supersede browser/PWA or Group API candidates.
- PR #136 / `707d9a403d82a57e6736842a3fa74882d1722e8b` is evidence/runtime-declaration maintenance after the v14 deploy; it does not create a newer browser runtime than PR #134.
- Supabase grants/RLS evidence is scoped security evidence, not blanket Auth/security PASS.
- Governance runbook/check-contract evidence is preparation evidence, not enforcement PASS.
- Public accessibility/source/synthetic evidence does not close NF-09, NF-07, NF-05, TC-08 or new v14 keyboard/reduced-motion real-device requirements.
