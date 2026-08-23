# Kinaraidee — Current Release State

เอกสารนี้เป็นจุดอ้างอิงหลักสำหรับสถานะ release ปัจจุบัน เพื่อป้องกัน release/evidence drift ระหว่าง runtime, QA, deployment และ Commercial Readiness

หลักการ: deployment, real-device result, accessibility, ผู้ใช้, conversion, partner, payment หรือรายได้ จะถูกระบุว่า PASS/พร้อมใช้งานได้เมื่อมีหลักฐานจริงเท่านั้น

## Current source/runtime state

- Latest reviewed `main`: `95034bce89853fe87a4b399ca0a4a58c3e9e93d0` (merge PR #76; deployment-probe/observability descendant).
- Current browser/PWA runtime candidate: `96b405460f29d0f410f255cc48c68c58e4621784` (merge PR #67).
- Current Group API source candidate: `f683f8291e57501e0fde75b0e689324d0a65dfb4` (merge PR #63); Supabase inspection previously verified ACTIVE version 3 source/deployment parity for that candidate.
- PWA cache marker: `kinaraidee-beta-v13`.
- PR #67 keeps the Surprise screen-reader live region outside hidden `.screen` containers and remains the browser/PWA runtime candidate.
- PR #71 adds synthetic old-cache activation coverage; this is not NF-07 real-device PASS.
- PR #75 adds synthetic iOS install-hint coverage; this is not iPhone/iPad real-device NF-05 PASS.
- PR #76 changes only `deployment-check.html` to add `pages-actions-source-v1` and intentionally triggers the Pages artifact path after the repository Pages source was changed to GitHub Actions.

## Verified CI/static evidence

- PR #77 head `063bcf07013a6c15a6c69c3722ff79d6ddee6885` completed the main regression/security suites successfully, including Beta QA, Beta integrity, Release Consistency, Security Hygiene, Credential Scanner, Runtime Lineage Regression, Surprise Accessibility Regression, PWA Cache Upgrade Regression, iOS Install Hint Regression, Group Result Regression, Release Metadata Regression and History Sync Regression.
- The dedicated `Public Pages Trace Check` on the same PR failed; do not fold the successful static/CI suites into deployment PASS.
- Static source markers, workflow configuration, synthetic probes, and CI success do not replace real-device or live-deployment evidence.

## Deployment evidence

Status: **PARTIAL / GITHUB ACTIONS SOURCE CONFIRMED / PUBLIC ARTIFACT TRACE STILL FAILING**

The former repository-admin Pages-source blocker is resolved:

- Fresh read-only Pages diagnostic on 2026-08-23 reports `build_type: workflow`.
- Source branch/path is still reported as `main` / `/`, and the public site remains `https://rachanakorninon-gif.github.io/kinaraidee/`.
- Therefore the repository is now configured for GitHub Actions Pages deployments; no further admin source migration is required for Issue #69.

However deployment acceptance is still not met:

- PR #76 merged as `95034bce89853fe87a4b399ca0a4a58c3e9e93d0` to trigger the watched deployment path.
- PR #77 `Public Pages Trace Check` workflow run `32620743936`, job `97148434823`, retried the public trace 18 times between 2026-08-23T05:35:51Z and 05:38:52Z.
- Every attempt failed fetching public `/release-meta.json` with HTTP 404.
- The check therefore ended `failure`; there is still no verified public metadata linking the live site to PR #76's deployed SHA.
- Corresponding Pages deployment run ID/URL and Live Smoke evidence for the same deployment have not been recorded here.

Required next deployment work is now investigation of why the GitHub Actions-configured site still does not expose the workflow-generated artifact, followed by a successful Pages artifact deployment and corresponding Live Smoke trace.

Do not infer complete deployment-gate success from source, PR/CI success, the Pages `build_type: workflow` setting, public source markers, or workflow files alone.

## Real-device regression status

### Surprise accessibility — Issue #57 / NF-09

Status: **IMPLEMENTED + PUBLIC V2 SOURCE PROBE CONFIRMED / REAL ASSISTIVE-TECH RETEST BLOCKED BY TEST ENVIRONMENT**

- PR #67 fixed persistent live-region placement for the Surprise busy announcement.
- The only available Android TalkBack environment later became unsuitable for app PASS/FAIL because TalkBack double-tap activation also failed on Android Settings controls.
- Therefore the latest PR #67 NF-09 retest remains **BLOCKED / INCONCLUSIVE**, not PASS and not a new application FAIL.
- Issue #57 remains open until a functioning TalkBack/VoiceOver environment is available.

### Android device #1 evidence boundary

Issue #5 contains scoped same-device evidence for multiple core flows, including Group 2/2 result flow and selected PWA/recovery scenarios. Exact device model/OS/Chrome were not captured and must not be guessed. One device/session does not satisfy the full device matrix.

NF-07 has synthetic CI coverage only; real-device old-cache → `kinaraidee-beta-v13` upgrade remains unverified. NF-05 now also has synthetic iOS install-hint coverage only; real iPhone/iPad Safari evidence remains required.

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

Issue #35 remains a Commercial Governance blocker: `main` branch protection / required-check enforcement has not been verified as enabled. Latest GitHub branch evidence still showed protection disabled. Workflow success does not equal governance enforcement.

## Public Beta gate impact

Public Beta is still **NOT COMPLETE**.

Minimum open evidence includes:

- Issue #69: public `release-meta.json` + traceable Pages workflow run + corresponding Live Smoke for one deployment after the GitHub Actions source migration;
- NF-09 assistive-tech acceptance on a functioning TalkBack/VoiceOver environment;
- NF-07 real-device old-cache → current-cache upgrade evidence;
- NF-05 real iPhone/iPad Safari install-hint evidence despite synthetic CI coverage;
- Android Chrome on at least 3 device models total;
- iPhone Safari on at least 2 device models total;
- remaining TC-01–TC-15 / NF-01–NF-10 evidence and Blocker/Critical closure appropriate to Beta acceptance.

Issue #5 remains the primary technical/device QA tracker. Issue #1 remains Beta launch acceptance.

## Commercial Readiness impact

Commercial launch remains **NO-GO** while important gates remain incomplete, including:

- Public Beta technical/device/accessibility acceptance and deployment trace;
- Supabase leaked-password protection gate (#11);
- `main` branch protection / required checks (#35);
- Group API live observability, retention/deletion policy, abuse controls and monitoring baseline (#45);
- Production Privacy/Terms/controller/contact/retention/legal decisions;
- Production owner/on-call, monitoring, backup/recovery and real rollback/restore drill evidence;
- Payment/Premium provider and real subscription lifecycle evidence;
- real restaurant/affiliate partner commercial evidence for any model enabled.

No user-count, conversion, revenue, payment success, partner readiness, legal approval, complete deployment PASS, full device-matrix PASS, or Commercial GO is inferred from this document.

## Supersession rule

- Current browser/PWA runtime candidate = PR #67 / `96b405460f29d0f410f255cc48c68c58e4621784` until another browser/PWA runtime change occurs.
- Current Group API source candidate = PR #63 / `f683f8291e57501e0fde75b0e689324d0a65dfb4` until another Group API source change occurs.
- Latest reviewed source/evidence baseline = PR #76 merge `95034bce89853fe87a4b399ca0a4a58c3e9e93d0`; it is deployment-probe/observability work and does not supersede browser/PWA runtime behavior.
- Pages source migration to `build_type: workflow` is verified, but deployment trace remains incomplete while public `release-meta.json` returns 404 and no matching Pages + Live Smoke evidence is recorded.
- Retention policy remains **NOT APPROVED**.
- Public accessibility source probes and synthetic CI do not close NF-09, NF-07 or NF-05 real-device requirements.
