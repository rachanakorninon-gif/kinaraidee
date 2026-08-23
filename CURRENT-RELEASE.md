# Kinaraidee — Current Release State

เอกสารนี้เป็นจุดอ้างอิงหลักสำหรับสถานะ release ปัจจุบัน เพื่อป้องกัน release/evidence drift ระหว่าง runtime, QA, deployment และ Commercial Readiness

หลักการ: deployment, real-device result, accessibility, ผู้ใช้, conversion, partner, payment หรือรายได้ จะถูกระบุว่า PASS/พร้อมใช้งานได้เมื่อมีหลักฐานจริงเท่านั้น

## Current source/runtime state

- Latest reviewed `main`: `d44bebad948c0e54a62bcd95129d46175514edce` (latest reviewed source/evidence baseline before this documentation sync).
- Current browser/PWA runtime candidate: `96b405460f29d0f410f255cc48c68c58e4621784` (merge PR #67).
- Current Group API source candidate: `f683f8291e57501e0fde75b0e689324d0a65dfb4` (merge PR #63); Supabase inspection confirms `group-api` ACTIVE version 3 with source/deployment parity.
- PWA cache marker: `kinaraidee-beta-v13`.
- PR #67 keeps the Surprise screen-reader live region outside hidden `.screen` containers and adds delayed busy-message write/clear behavior plus accessibility regression guards.
- Public `deployment-check.html` has been observed on Android with `surprise-a11y-v2`, Group result bridge PASS, Surprise accessibility source probe PASS (`persistent live region`), and `kinaraidee-beta-v13`.
- Public `release-meta.json` still returns HTTP 404; deployment-SHA trace defect is tracked in Issue #69.

## Verified CI/static evidence

PR #67 final PR head passed the triggered regression/security suites before merge, including Surprise Accessibility Regression, Runtime Lineage Regression, Release Consistency, Beta QA, Beta integrity, History Sync, Group Result, Security Hygiene, Credential Scanner, and Release Metadata Regression.

Static source markers, workflow configuration, synthetic probes, and CI success do not replace real-device or live-deployment evidence.

## Deployment evidence

Status: **PARTIAL / PR #67 BROWSER DEPLOYMENT WORKFLOW TRACE STILL REQUIRED**

Current public evidence confirms that the v2 Surprise accessibility source markers and current cache are being served. However:

- public `release-meta.json` is still HTTP 404;
- the deployed 40-character SHA cannot yet be verified from the public site;
- a corresponding successful Pages deployment trace and Live Smoke trace for the same deployment are still required;
- Issue #69 tracks the missing release metadata / active Pages deployment-path investigation.

Do not infer complete deployment-gate success from source, PR/CI success, public source markers, or the presence of deployment workflow files alone.

## Real-device regression status

### Surprise accessibility — Issue #57 / NF-09

Status: **IMPLEMENTED + PUBLIC V2 SOURCE PROBE CONFIRMED / REAL ASSISTIVE-TECH RETEST BLOCKED BY TEST ENVIRONMENT**

Actual evidence from the only available Android phone:

- TalkBack previously announced the Surprise accessible name and role correctly: `ไม่รู้เลย ให้ระบบเลือกอาหารให้ทันที ปุ่ม`.
- Before PR #67, the busy-state announcement was not heard; Issue #57 records that failure.
- After PR #67 public v2 source markers became visible, the next TalkBack attempt could not be used as app PASS/FAIL evidence because TalkBack activation itself malfunctioned on the device.
- A focused Android Settings control (`เปิดการตั้งค่า Wi‑Fi`) was announced as a button, but TalkBack double-tap did not activate it; the same activation problem was reported across apps even after restart and delay-reset attempts.
- Therefore the latest PR #67 NF-09 retest is **BLOCKED / INCONCLUSIVE (assistive-tech test environment)**, not PASS and not a new application FAIL.
- Issue #57 remains open. Do not repeatedly request another Kinaraidee TalkBack retest on this phone until TalkBack activation works normally or another functioning assistive-tech device is available.

### Android device #1 evidence boundary

Issue #5 records scoped same-device evidence for core flows including guided/surprise selection, Group 2/2 result flow, History/Favorite, Feedback, Partner, Maps/location fallback, PWA install/reopen, offline cold start/recommendation, offline→online recovery, 404 recovery, rapid-tap observation, and background/lock recovery.

Exact device model, Android version, and Chrome version were not captured and must not be guessed. This remains one Android device/session only and does not satisfy the full device matrix.

NF-07 old-cache upgrade remains unverified. NF-09 remains open/blocked as described above.

## Group API / operations evidence

- `group-api` remains intentionally public (`verify_jwt=false`) for accountless invite participation.
- PR #63 privacy-safe structured event instrumentation is present in deployed version 3 and excludes sensitive identifiers/payload fields by design.
- Latest available Edge Function logs show historical version-2 request gateway records but no inspectable version-3 structured application-event record; live v3 event ingestion/monitoring baseline remains **NOT VERIFIED**.
- Fresh read-only retention snapshot on 2026-08-23: 16 rooms total (13 expired / 3 active), 14 joined votes (8 attached to expired rooms / 6 to active rooms), 0 orphan votes. Expired-room ages ranged from about 1 day 08:52 to 2 days 03:26 at query time.
- This snapshot does not approve a retention duration, execute cleanup, prove purge safety, or establish anonymous abuse controls. Issue #45 remains open.

## Supabase security/performance evidence

- Connected Supabase organization is on the **Free** plan.
- Security Advisor still reports `auth_leaked_password_protection` = WARN / disabled.
- Supabase documentation indicates leaked-password protection is available on Pro Plan and above; Issue #11 is therefore a plan-dependent security/commercial gate under the current Free plan.
- Acceptance path for #11: upgrade to a supporting plan, enable leaked-password protection, then rerun Security Advisor and record the WARN as cleared.
- Remaining `rls_enabled_no_policy` findings are INFO-only for deny-by-default tables; do not make them permissive merely to silence lint.
- Latest Performance Advisor result contains unused-index INFO findings only; no performance WARN is being claimed from that advisor result.

## Repository governance

Issue #35 remains a Commercial Governance blocker: `main` branch protection / required-check enforcement has not been verified as enabled. Workflow files and successful checks do not equal governance enforcement.

## Public Beta gate impact

Public Beta is still **NOT COMPLETE**.

Minimum open evidence includes:

- Issue #69: successful Pages + corresponding Live Smoke trace with public valid `release-meta.json`/deployed SHA;
- NF-09 assistive-tech acceptance when a functioning TalkBack/VoiceOver environment is available;
- NF-07 old-cache → current cache upgrade evidence;
- Android Chrome on at least 3 device models total;
- iPhone Safari on at least 2 device models total;
- remaining TC-01–TC-15 / NF-01–NF-10 evidence and Blocker/Critical closure appropriate to Beta acceptance.

Issue #5 remains the primary technical/device QA tracker. Issue #1 remains Beta launch acceptance.

## Commercial Readiness impact

Commercial launch remains **NO-GO** while important gates remain incomplete, including:

- Public Beta technical/device/accessibility acceptance and deployment trace;
- Supabase leaked-password protection plan-dependent gate (#11);
- `main` branch protection / required checks (#35);
- Group API live observability, retention/deletion policy, abuse controls and monitoring baseline (#45);
- Production Privacy/Terms/controller/contact/retention/legal decisions;
- Production owner/on-call, monitoring, backup/recovery and real rollback/restore drill evidence;
- Payment/Premium provider, pricing, subscribe/renew/cancel/failure/refund flows;
- real restaurant/affiliate partner commercial evidence for any model enabled.

No user-count, conversion, revenue, payment success, partner readiness, legal approval, complete deployment PASS, full device-matrix PASS, or Commercial GO is inferred from this document.

## Supersession rule

- Current browser/PWA runtime candidate = PR #67 / `96b405460f29d0f410f255cc48c68c58e4621784` until another browser/PWA runtime change occurs.
- Current Group API source candidate = PR #63 / `f683f8291e57501e0fde75b0e689324d0a65dfb4`; deployed version-3 source parity is verified, live structured-event ingestion is not.
- Latest reviewed `main` baseline = `d44bebad948c0e54a62bcd95129d46175514edce`; this documentation change does not supersede browser/PWA or Group API runtime behavior.
- Retention policy remains **NOT APPROVED**; schema defaults must not be treated as an approved deletion schedule.
- Public v2 accessibility source probe evidence does not close NF-09 while the assistive-tech environment is malfunctioning.
- Deployment metadata remains incomplete while public `release-meta.json` is 404.
