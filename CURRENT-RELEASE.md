# Kinaraidee — Current Release State

เอกสารนี้เป็นจุดอ้างอิงหลักสำหรับสถานะ release ปัจจุบัน เพื่อป้องกัน release/evidence drift ระหว่าง runtime, QA, deployment, Supabase security และ Commercial Readiness

หลักการ: deployment, real-device result, accessibility, security configuration, ผู้ใช้, conversion, partner, payment หรือรายได้ จะถูกระบุว่า PASS/พร้อมใช้งานได้เมื่อมีหลักฐานจริงเท่านั้น

## Current source/runtime state

- Latest reviewed `main` descendant: `367162286d1e1452151df11dca805ed629bb5466` (PR #174 merged v15 real-device follow-up runtime).
- Current browser/PWA runtime candidate: `46b494cc9430ee39c2322f9e0ae8b66149c0d3bf` (PR #174 v15 runtime lineage).
- Runtime merge/deployed SHA: `367162286d1e1452151df11dca805ed629bb5466` (PR #174 merged).
- PWA cache marker: `kinaraidee-beta-v15`.
- Current Group API source candidate: PR #93 / `fefc29322ac13f7066038a663bfeb7091d218b8f`; prior connected inspection verified Supabase ACTIVE version 6 source/deployment parity.
- Partner API source/deployment hardening is tracked separately in `PARTNER-API-HARDENING-EVIDENCE.md`; existing evidence records Supabase ACTIVE v15 parity and a verified rejection-only live contract on merged main. This is not partner/commercial readiness evidence.
- `CURRENT-RUNTIME.md` is the canonical small browser/PWA runtime declaration and must stay consistent with this document.

PR #174 changed browser/PWA runtime behavior after the 2026-08-24 physical Android/iPhone focused session. Nearby now keeps Location outcome separate from partner-search status, shows actionable permission/unavailable/timeout states, uses a 15-second low-accuracy mobile geolocation timeout and preserves Maps fallback. Favorite/History now distinguishes `❤️ เมนูโปรด` from `👍 เลือกกิน`; `data/history-ui.js` is included in the atomic v15 PWA shell.

Historical PR #164/v14 member-auth deployment and PR #134/v14 accessibility deployment evidence remain historical evidence only where the relevant runtime portions are unchanged. They are not reused as proof of the v15 deployment or post-v15 physical-device acceptance.

## Browser/PWA deployment evidence

Status: **PASS FOR CURRENT BROWSER/PWA DEPLOYMENT TRACE**

Verified v15 evidence:

- PR #174 merged as `367162286d1e1452151df11dca805ed629bb5466`.
- Pages workflow run `32748690413` completed **success** for exact merged-main SHA `367162286d1e1452151df11dca805ed629bb5466`.
- Corresponding Live Smoke run `32748752875` completed **success** on the same deployed SHA.
- Read-only diagnostic run `32749016604` completed **success** and verified the exact Actions records plus public-site state; temporary PR #175 was closed without merge.
- Live public `release-meta.json` matched `367162286d1e1452151df11dca805ed629bb5466` and `kinaraidee-beta-v15`.
- Live `sw.js` used `kinaraidee-beta-v15` and included `data/history-ui.js`.
- Live `data/nearby-restaurants.js` contained the separated Location-status path and `timeout:15000`.
- Live `data/history-ui.js` contained explicit Favorite/accepted badges.
- The v15 PR-head regression suite completed successfully before merge, including Release Consistency, Release Baseline Regression, Beta QA/integrity, Security Hygiene, Runtime Lineage, Real Device Contract, Release Metadata, Governance Required Checks, PWA Cache Upgrade, iOS Install Hint, Accessibility, History Sync, Device UX and Commercial Release Checklist Consistency.

Historical v14 deployment evidence remains available in repository history and prior evidence documents. The last v14 member-auth deployment trace included Pages `32737240239`, Live Smoke `32737301309` and diagnostic `32738157335`; those runs are not current v15 deployment evidence.

This deployment PASS is scoped to Pages/public metadata/assets/automated Live Smoke. It does not imply real keyboard interaction, physical reduced-motion behavior, post-fix iPhone Location acceptance, post-fix Favorite/History device acceptance, TalkBack/VoiceOver, full device matrix, Public Beta completion or Commercial GO.

## Supabase security evidence

Existing live evidence remains valid unless superseded by a later schema/configuration change:

- least-privilege browser-facing grants and anonymous Data API SELECT-denial evidence are recorded in `SUPABASE-GRANT-HARDENING-EVIDENCE.md`;
- authenticated RLS read-isolation and cross-user negative mutation evidence are recorded in `SUPABASE-RLS-AUTHORIZATION-EVIDENCE.md` and `SUPABASE-RLS-NEGATIVE-EVIDENCE.md`;
- the private admin-owner RLS helper remediation removed the prior public `SECURITY DEFINER` warning;
- Supabase Auth leaked-password protection remains **BLOCKED BY PLAN/CONFIGURATION — NOT PASS** and must not be inferred from code/CI/deployment evidence.

This scoped evidence does not prove every authenticated per-user JWT/RLS path, every mutation shape, external authenticated-session lifecycle, privileged-backend authorization path, Production Security PASS, Public Beta completion or Commercial GO.

No paid-plan upgrade is authorized or inferred.

## Real-device / accessibility status

Public Beta remains **NOT COMPLETE**. CI, source inspection and Live Smoke do not replace these gates:

- iPhone TC-08 is recorded as **FAIL on the pre-fix v14 physical Safari session** after OS/Safari and per-site Location settings were set to allow but Kinaraidee still did not supply numeric coordinates. Issue #171 remains open until a post-v15 physical iPhone retest.
- Android Favorite persistence was observed, while the pre-v15 combined Favorite/History screen did not visually distinguish liked rows. Issue #172 remains open until the v15 badge/summary UX is retested on a physical device.
- NF-09 TalkBack/VoiceOver remains open until a functioning assistive-technology environment is validated and current v15 behavior is retested end-to-end.
- visible keyboard focus must be verified with real keyboard/focus navigation on deployed pages.
- reduced-motion behavior must be verified on a real platform with reduced-motion preference enabled.
- NF-07 requires a verifiable older-cache baseline and real-device upgrade to `kinaraidee-beta-v15`.
- NF-05 still requires real iPhone/iPad Safari install-hint suppression/standalone evidence.
- Android Chrome still requires at least 3 device models total and iPhone Safari at least 2 device models total.
- Remaining TC-01–TC-15 / NF-01–NF-10 results must be scored only from actual device evidence.

Historical same-device Android/iPhone evidence remains scoped to the exact behaviors observed and is not automatically promoted to v15 full-matrix PASS.

## Group API / operations evidence

- Group API source candidate remains PR #93 / Supabase ACTIVE version 6 according to prior verified deployment/source evidence.
- Rejection-only probes and bounded-body behavior are backend security/availability evidence only.
- Group retention policy remains **NOT APPROVED**.
- Read-only retention/dry-run contracts and cleanup-design documents do not execute deletion and do not establish Privacy/Legal approval.
- Application-event observability, monitoring owner/baseline, complete anonymous abuse controls and production retention cleanup remain incomplete.
- Operations evidence templates, recovery-integrity contracts and rollback/runbook preparation do not constitute backup restore or rollback drill PASS until executed evidence exists.

## Partner API evidence

- Partner API request-body handling, coordinate validation, no-store/nosniff and rejection-only probe mechanisms are documented in `PARTNER-API-HARDENING-EVIDENCE.md`.
- Supabase ACTIVE v15 source/deployment parity remains the scoped deployment evidence for the Partner API source candidate.
- PR #142 fixed an Actions workflow-validation defect that had caused the rejection probe to fail before job creation; the repaired workflow preserved rejection-only behavior and introduced no application-action payload.
- Merged-main Partner API Live Rejection Probe run `32675596758` completed **success** on exact SHA `5ca280f4832e0d0fc1aa7057bb68f4df001d4067`; job `97283018587` passed GET=405 with no-store/nosniff, malformed JSON=400 and oversized body=413.
- Read-only diagnostic run `32675626819` confirmed the exact push run/SHA, and PR #144 merged the scoped evidence/consistency guard as `cc3b08101a2f342e4f5e6c178c56f1b25aa0c67c`.
- This is **VERIFIED PASS FOR REJECTION BEHAVIOR ONLY** based on the previously verified merged-main live rejection run. It does not establish successful product-action requests, production traffic baseline, complete abuse controls, recurring monitoring/alert SLA, approved retention, partner agreement, conversion/reconciliation, revenue or Commercial readiness.
- No user, click, conversion or revenue figure is inferred from API hardening/live-rejection evidence.

## Repository governance

Status: **ENFORCED FOR `main` THROUGH THE `Protect main` RULESET**. Repository evidence records that PR #159 passed the required checks and merged, while PR #160 had a failing `release-consistency` check and GitHub blocked the merge under the repository rule; Issue #35 is closed as completed.

This governance PASS is scoped to merge-rule enforcement. It does not replace runtime deployment, Supabase Auth, device, privacy/legal, payment or Commercial readiness evidence.

## Public Beta gate impact

Public Beta is still **NOT COMPLETE**.

Current v15 browser/PWA deployment trace is verified. Minimum open evidence still includes post-v15 physical retest of iPhone Location (#171) and Favorite/History differentiation (#172), real-device/accessibility acceptance, keyboard/reduced-motion checks, NF-05/NF-07/NF-09, remaining device-matrix coverage and Blocker/Critical closure appropriate to Beta acceptance. Issue #5 remains the primary technical/device QA tracker; Issue #1 remains Beta launch acceptance.

## Commercial Readiness impact

Commercial launch remains **NO-GO** while important gates remain incomplete, including:

- Public Beta technical/device/accessibility acceptance on the current v15 runtime;
- Supabase leaked-password protection gate (#11), currently blocked by plan/configuration;
- repository governance must remain enforced; Issue #35 is closed after verified required-check blocking evidence;
- remaining external authenticated API/JWT lifecycle and privileged-backend negative authorization evidence beyond currently scoped tests;
- Group API application-event observability, retention/deletion policy, complete anonymous abuse controls and monitoring ownership/baseline (#45);
- Partner API complete abuse-control/monitoring/retention and real partner-commercial evidence;
- Production Privacy/Terms/controller/contact/retention/legal decisions;
- Production owner/on-call, monitoring, backup/recovery and real rollback/restore drill evidence;
- Payment/Premium provider and real subscription lifecycle evidence;
- real restaurant/affiliate partner agreements and verified commercial reconciliation for any enabled model.

No user-count, conversion, revenue, payment success, partner readiness, legal approval, full device-matrix PASS, full Public Beta PASS or Commercial GO is inferred from this document.

## Supersession rule

- Current browser/PWA runtime candidate = PR #174 v15 runtime lineage `46b494cc9430ee39c2322f9e0ae8b66149c0d3bf`; deployed merge SHA = `367162286d1e1452151df11dca805ed629bb5466`.
- Current PWA cache marker = `kinaraidee-beta-v15`.
- Current Group API source candidate = merged PR #93 / `fefc29322ac13f706603bfeb7091d218b8f` until another Group API source change occurs.
- Partner API source/deployment lineage and scoped live rejection evidence are tracked in `PARTNER-API-HARDENING-EVIDENCE.md`; Partner API evidence does not supersede browser/PWA or Group API candidates.
- Merged PR #174 / `367162286d1e1452151df11dca805ed629bb5466` supersedes the prior v14 browser/PWA deployment trace.
- Historical v14 evidence remains historical support only and does not create post-v15 device PASS.
- Supabase grants/RLS evidence is scoped security evidence, not blanket Auth/security PASS.
- Governance enforcement evidence is scoped merge-rule evidence, not Product/Security/Commercial readiness evidence.
- Public accessibility/source/synthetic/deployment evidence does not close NF-09, NF-07, NF-05, TC-08 or post-v15 physical-device requirements.
