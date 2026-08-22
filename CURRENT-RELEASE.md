# Kinaraidee — Current Release State

เอกสารนี้เป็นจุดอ้างอิงสั้น ๆ สำหรับสถานะ release ปัจจุบัน เพื่อป้องกันการตีความเอกสาร QA/Commercial ที่อาจยังมี release trace รุ่นก่อนหน้าอยู่ระหว่างการอัปเดต

หลักการ: ข้อมูล deployment, real-device result, ผู้ใช้, conversion, partner หรือรายได้ จะถูกระบุว่า PASS/พร้อมใช้งานได้เมื่อมีหลักฐานจริงเท่านั้น

## Current source/runtime state

- Current `main`: `d2b8dc08d908fb6034a1958d2260c8886ad96804` (merge of PR #41)
- Latest runtime change: member-history write/read race hardening from PR #41.
- PWA cache marker remains: `kinaraidee-beta-v13`.
- PR #37 previously fixed cloud-history schema mapping (`created_at` -> numeric `at`, plus `liked` / `accepted`).
- PR #41 now tracks pending member-history writes and a write generation, prevents stale cloud snapshots from replacing newer optimistic history, and reconciles from cloud after a successful write.
- Dedicated regression workflow: `Kinaraidee History Sync Regression`.

## Verified CI evidence

PR #41 head `e035263260fb5df25a408f76c16e39ff419c1ffc` completed successfully for:

- History Sync Regression run `32564035800`
- Beta QA run `32564035735`
- Release Consistency run `32564035733`
- Beta integrity run `32564035786`
- Security Hygiene run `32564035728`

These are CI/static evidence only. They do not replace GitHub Pages deployment evidence, Live Smoke evidence, or real-device interaction testing.

## Deployment evidence

Status: **PARTIAL / DEPLOYMENT WORKFLOW TRACE STILL REQUIRED**

Real-device testing on 2026-08-22 demonstrated behavior from the PR #41 history-race fix in the installed Android PWA, including the same-device lock/resume favorite regression path. However, this file still does not contain a verified GitHub Pages deployment workflow run and corresponding Live Smoke run that trace the deployed public release back to `d2b8dc08...` or a runtime-equivalent descendant.

Do not infer complete deployment-gate success merely from merged commits, CI, or successful real-device behavior.

## Real-device regression status

### Issue #38 — `Invalid Date` after cloud sync

Status: **FIXED / SAME-DEVICE RETEST RECORDED**

The Android signed-in history regression was retested after the fix reached the installed PWA. History rendered valid Thai-local date/time values instead of `Invalid Date`, and subsequent account/history checks remained internally consistent. Issue #38 is closed based on recorded real-device evidence.

### Issue #40 — favorite loss after lock/resume

Status: **FIXED / SAME-DEVICE RETEST RECORDED**

The Android reproduction path (fresh result -> lock/suspend -> resume -> like -> History) was retested after PR #41. The newly liked item remained in History and the previous favorite-loss symptom did not recur. Issue #40 is closed based on recorded same-device evidence.

Additional Android recovery evidence from the same assisted QA session includes:

- offline -> online recovery without app failure,
- external Google Maps round-trip with result state retained,
- favorite/history persistence after recovery,
- logout/login persistence of signed-in history counts,
- standalone PWA close/reopen session persistence,
- denied-location path continuing to Google Maps fallback without crash or blank screen.

These observations are evidence for that device/session only; they do not satisfy the full multi-device matrix by themselves.

## Public Beta gate impact

Progress has improved materially because the two signed-in Android history regressions (#38 and #40) now have real-device fix verification. Public Beta is still **NOT COMPLETE** because the remaining gate includes at minimum:

- GitHub Pages deployment workflow evidence for the current runtime or runtime-equivalent descendant.
- Corresponding Live Smoke evidence traced to that deployment.
- Required device matrix completion: Android Chrome on at least 3 device models and iPhone Safari on at least 2 device models.
- Remaining TC-01–TC-15 / NF-01–NF-10 cases that are not yet backed by real-device evidence.
- Any remaining release checklist items that explicitly require real workflow/device evidence.

Issue #5 remains the primary Beta QA execution tracker.

## Commercial Readiness impact

Commercial launch remains **NO-GO** while required evidence or decisions are outstanding, including at minimum:

- Public Beta technical/device acceptance and deployment/live trace.
- Supabase Auth leaked-password protection follow-up (Issue #11).
- `main` branch protection / required-check governance (Issue #35).
- Production Privacy/Terms/controller/contact/retention/legal review decisions.
- Production operations ownership, monitoring, backup/recovery drill evidence.
- Payment/Premium and partner commercial terms only if/when those business flows are actually enabled.

No user-count, conversion, revenue, payment success, partner readiness, legal approval, complete deployment PASS, or full device-matrix PASS is implied by this document.

## Supersession rule

Where an older tracker says the current runtime is `0624d7e4...` or `21c56f2e...`, treat those SHAs as previous candidate baselines. For current work, use this file plus latest `main`, Issue #5, and the open Commercial Readiness issues until all secondary trackers are refreshed.
