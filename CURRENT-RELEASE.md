# Kinaraidee — Current Release State

เอกสารนี้เป็นจุดอ้างอิงหลักสำหรับสถานะ release ปัจจุบัน เพื่อป้องกัน release/evidence drift ระหว่าง runtime, QA, deployment และ Commercial Readiness

หลักการ: deployment, real-device result, accessibility, ผู้ใช้, conversion, partner, payment หรือรายได้ จะถูกระบุว่า PASS/พร้อมใช้งานได้เมื่อมีหลักฐานจริงเท่านั้น

## Current source/runtime state

- Latest reviewed `main`: `12e993f2ce330254bd5352ce6132ca9ccd08a8c1` (deployment-evidence documentation descendant).
- Current browser/PWA runtime candidate: `35fe4b7fbf201882ea2ebad8ffca2b8da668999b` (PR #79; deployed and trace-verified on GitHub Pages).
- Compare `35fe4b7f...` → `12e993f2...` shows only `CURRENT-RELEASE.md`, `LIVE-DEPLOYMENT-VERIFICATION.md` and `RELEASE-CHECKLIST.md` changed; no browser/PWA runtime asset changed.
- Current Group API source candidate: `f683f8291e57501e0fde75b0e689324d0a65dfb4` (merge PR #63); Supabase inspection previously verified ACTIVE version 3 source/deployment parity for that candidate.
- PWA cache marker: `kinaraidee-beta-v13`.
- PR #67 persistent Surprise accessibility implementation remains present in the deployed browser/PWA candidate.
- PR #79 wires `data/pwa-install.js` from the already-active `data/home-surprise.js` bootstrap. This closes the source-wiring gap discovered by Live Smoke; it does not create real iPhone/iPad NF-05 PASS.
- PR #71 adds synthetic old-cache activation coverage; this is not NF-07 real-device PASS.
- PR #75 adds synthetic iOS install-hint behavior coverage; PR #79 additionally guards that the active app bootstrap actually loads that helper.

## Verified CI/static evidence

- PR #78 final head passed the main regression/security suites before merge, including Release Metadata Regression, Release Consistency, Runtime Lineage Regression, Beta QA, Beta integrity, Security Hygiene, Credential Scanner, Surprise Accessibility, PWA Cache Upgrade, iOS Install Hint, Group Result, Pages Source Diagnostic and History Sync.
- PR #79 fixed the PWA install-helper bootstrap wiring discovered by the first matching Live Smoke failure and retained the synthetic iOS install-hint regression boundary.
- Static source markers, workflow configuration, synthetic probes, and CI success do not replace real-device evidence.

## Deployment evidence

Status: **PASS FOR CURRENT BROWSER/PWA DEPLOYMENT TRACE**

The current browser/PWA runtime candidate has a matching successful Pages deployment, public release metadata and corresponding successful Live Smoke run.

Confirmed evidence for PR #79 / `35fe4b7fbf201882ea2ebad8ffca2b8da668999b`:

- Pages Source Diagnostic reports `build_type: workflow` for the repository.
- Pages workflow run `32621529715` completed **success** for that exact SHA.
- Public Pages Trace Check run `32621547307` completed **success** and verified public `release-meta.json` SHA = `35fe4b7fbf201882ea2ebad8ffca2b8da668999b`, `pwa_cache` = `kinaraidee-beta-v13`, `pages-actions-source-v1` on the deployment probe, and the matching live Service Worker marker.
- Corresponding Live Smoke run `32621549478` completed **success**. Public pages/assets, latest live app markers and accessibility/group/PWA contracts, development-file exclusion, and traceable automated evidence all passed.
- Issue #69 is closed as completed for the browser/PWA deployment-trace scope.

This deployment PASS is scoped to browser/PWA deployment trace and automated live smoke only. It does not imply real-device, assistive-technology, payment, partner, legal, full Public Beta or Commercial PASS.

## Real-device regression status

### Surprise accessibility — Issue #57 / NF-09

Status: **IMPLEMENTED + DEPLOYED SOURCE CONTRACT VERIFIED / REAL ASSISTIVE-TECH RETEST BLOCKED BY TEST ENVIRONMENT**

- PR #67 fixed persistent live-region placement for the Surprise busy announcement and that implementation remains in the deployed PR #79 runtime.
- The available Android TalkBack environment later became unsuitable for app PASS/FAIL because TalkBack double-tap activation also failed on Android Settings controls.
- Therefore the latest NF-09 retest remains **BLOCKED / INCONCLUSIVE**, not PASS and not a new application FAIL.
- Issue #57 remains open until a functioning TalkBack/VoiceOver environment is available.

### Android device #1 evidence boundary

Issue #5 contains scoped same-device evidence for multiple core flows, including Group 2/2 result flow and selected PWA/recovery scenarios. Exact device model/OS/Chrome were not captured and must not be guessed. One device/session does not satisfy the full device matrix.

NF-07 has synthetic CI coverage only; real-device old-cache → `kinaraidee-beta-v13` upgrade remains unverified. NF-05 has synthetic iOS install-hint behavior coverage and active-bootstrap wiring in the deployed runtime, but real iPhone/iPad Safari evidence remains required.

## Group API / operations evidence

- Current Group API source candidate remains PR #63 / `f683f8291e57501e0fde75b0e689324d0a65dfb4`.
- Privacy-safe structured operational events are implemented in source/deployed v3 evidence, but live application-event ingestion/monitoring baseline remains **NOT VERIFIED**.
- Retention policy remains **NOT APPROVED**. Existing schema expiry/defaults and read-only diagnostics must not be interpreted as an approved deletion schedule.
- Cleanup implementation/cascade verification and anonymous abuse controls remain open under Issue #45.

## Supabase security/performance evidence

- Connected Supabase organization is on the Free plan.
- Security Advisor still reports leaked-password protection disabled; Issue #11 remains open.
- INFO-only RLS/no-policy findings for deny-by-default tables are not a reason to make those tables permissive.

## Repository governance

Issue #35 remains a Commercial Governance blocker: `main` branch protection / required-check enforcement is disabled. Workflow success does not equal governance enforcement.

## Public Beta gate impact

Public Beta is still **NOT COMPLETE**.

The browser/PWA deployment-trace blocker from Issue #69 is satisfied for PR #79. Minimum open evidence still includes:

- NF-09 assistive-tech acceptance on a functioning TalkBack/VoiceOver environment;
- NF-07 real-device old-cache → current-cache upgrade evidence;
- NF-05 real iPhone/iPad Safari install-hint evidence despite synthetic CI and deployed source-wiring coverage;
- Android Chrome on at least 3 device models total;
- iPhone Safari on at least 2 device models total;
- remaining TC-01–TC-15 / NF-01–NF-10 evidence and Blocker/Critical closure appropriate to Beta acceptance.

Issue #5 remains the primary technical/device QA tracker. Issue #1 remains Beta launch acceptance.

## Commercial Readiness impact

Commercial launch remains **NO-GO** while important gates remain incomplete, including:

- Public Beta technical/device/accessibility acceptance;
- Supabase leaked-password protection gate (#11);
- `main` branch protection / required checks (#35);
- Group API live observability, retention/deletion policy, abuse controls and monitoring baseline (#45);
- Production Privacy/Terms/controller/contact/retention/legal decisions;
- Production owner/on-call, monitoring, backup/recovery and real rollback/restore drill evidence;
- Payment/Premium provider and real subscription lifecycle evidence;
- real restaurant/affiliate partner commercial evidence for any model enabled.

No user-count, conversion, revenue, payment success, partner readiness, legal approval, full device-matrix PASS, full Public Beta PASS, or Commercial GO is inferred from this document.

## Supersession rule

- Current browser/PWA runtime candidate = merged PR #79 / `35fe4b7fbf201882ea2ebad8ffca2b8da668999b` until another browser/PWA runtime change occurs.
- Current Group API source candidate = PR #63 / `f683f8291e57501e0fde75b0e689324d0a65dfb4` until another Group API source change occurs.
- Latest reviewed `main` baseline = `12e993f2ce330254bd5352ce6132ca9ccd08a8c1`; changes after runtime candidate are evidence/docs only per repository compare.
- PR #79 Pages deployment/public metadata/Live Smoke trace is verified for the current browser/PWA runtime candidate.
- Retention policy remains **NOT APPROVED**.
- Public accessibility source probes and synthetic CI do not close NF-09, NF-07 or NF-05 real-device requirements.
