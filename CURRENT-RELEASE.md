# Kinaraidee — Current Release State

เอกสารนี้เป็นจุดอ้างอิงสั้น ๆ สำหรับสถานะ release ปัจจุบัน เพื่อป้องกันการตีความเอกสาร QA/Commercial ที่อาจยังมี release trace รุ่นก่อนหน้าอยู่ระหว่างการอัปเดต

หลักการ: ข้อมูล deployment, real-device result, ผู้ใช้, conversion, partner หรือรายได้ จะถูกระบุว่า PASS/พร้อมใช้งานได้เมื่อมีหลักฐานจริงเท่านั้น

## Current source/runtime state

- Current `main`: `907ea6b1b44ae3d7ec0bc82323ac96716b46cae0` (merge of PR #44).
- Current runtime candidate: `6fadf04fdf647680b60df2ada9cb43f4659816dd` (merge of PR #42).
- Latest runtime change: restore completed live-group result bridge after the Android 2/2-vote real-device failure.
- Commits after PR #42 through PR #44 add release/docs/deployment observability and do not change the public runtime payload; PR #44 adds `release-meta.json` SHA tracing and deployed group-bridge checks.
- PWA cache marker remains: `kinaraidee-beta-v13`.
- PR #42 restores `useRemoteVotes(votes, setup)`, exports `window.KINARAIDEE_GROUP_MODE.showRemoteResult`, and restores deterministic group module loading so `group-remote.js` can hand completed remote votes back to the group result renderer.
- PR #42 also adds the dedicated `Group Result Regression` workflow.
- PR #37 previously fixed cloud-history schema mapping (`created_at` -> numeric `at`, plus `liked` / `accepted`).
- PR #41 tracks pending member-history writes and a write generation, prevents stale cloud snapshots from replacing newer optimistic history, and reconciles from cloud after a successful write.
- Dedicated history regression workflow: `Kinaraidee History Sync Regression`.

## Verified CI evidence

PR #42 head `d0afde6a6c6b819bfd078ebb4222738a7dad878b` completed successfully for:

- Beta integrity run `32566703357`
- Beta QA run `32566703324`
- Security Hygiene run `32566703331`
- Group Result Regression run `32566703337`
- History Sync Regression run `32566703316`
- Release Consistency run `32566703318`

PR #42 validation also corrected two CI-gate defects discovered during the fix: generic secret scans self-matching the Security Hygiene detector source, and stale transient assertions in Release Consistency.

These are CI/static evidence only. They do not replace GitHub Pages deployment evidence, Live Smoke evidence, or real-device interaction testing.

## Deployment evidence

Status: **PARTIAL / DEPLOYMENT WORKFLOW TRACE STILL REQUIRED**

PR #44 adds deployment observability so Pages publishes `release-meta.json` with the deployed commit SHA and PWA cache marker, while Live Smoke verifies that SHA against the successful Pages workflow-run head when triggered from deployment. It also verifies the completed live-group result bridge on deployed assets.

This implementation improves traceability but does not itself prove that a Pages run and matching Live Smoke run have succeeded for `6fadf04f...` or runtime-equivalent descendant `907ea6b1...`. Do not infer complete deployment-gate success from merged workflow code alone.

## Real-device regression status

### Group live result — completed 2/2 vote path

Status: **FIX MERGED / REAL-DEVICE RETEST REQUIRED**

Android real-device testing reached a live room with 2/2 votes complete. Room creation, invite sharing, second-participant sync, and the completed-vote state were observed successfully. Tapping `🎉 ดูผลโหวตกลุ่ม` then returned the tester to the home screen instead of showing the group result, so the end-to-end Group flow was recorded as FAIL at the final-result step.

Source inspection found that `group-remote.js` still invoked the remote-result bridge while the simplified `group-mode.js` no longer exported it. PR #42 restores that bridge and its module initialization order. The affected final-result path must be retested on the same Android device after the merged runtime is confirmed available; pre-fix 2/2 evidence must not be promoted to a final-result PASS automatically.

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
- denied-location path continuing to Google Maps fallback without crash or blank screen,
- 404 recovery,
- live-group room creation, invite sharing, participant sync, and 2/2 completion before the final-result defect was encountered.

These observations are evidence for that device/session only; they do not satisfy the full multi-device matrix by themselves.

## Public Beta gate impact

Progress has improved materially because the signed-in Android history regressions (#38 and #40) have same-device fix verification, the live-group final-result defect has a merged source fix plus dedicated regression CI, and PR #44 now provides deployed-SHA trace plumbing. Public Beta is still **NOT COMPLETE** because the remaining gate includes at minimum:

- real-device retest of the live-group final-result path after PR #42 is confirmed deployed,
- GitHub Pages deployment workflow evidence for the current runtime or runtime-equivalent descendant,
- corresponding Live Smoke evidence traced to that deployment and `release-meta.json`,
- required device matrix completion: Android Chrome on at least 3 device models and iPhone Safari on at least 2 device models,
- remaining TC-01–TC-15 / NF-01–NF-10 cases that are not yet backed by real-device evidence,
- any remaining release checklist items that explicitly require real workflow/device evidence.

Issue #5 remains the primary Beta QA execution tracker.

## Commercial Readiness impact

Commercial launch remains **NO-GO** while required evidence or decisions are outstanding, including at minimum:

- Public Beta technical/device acceptance and deployment/live trace,
- Supabase Auth leaked-password protection follow-up (Issue #11),
- `main` branch protection / required-check governance (Issue #35),
- Production Privacy/Terms/controller/contact/retention/legal review decisions,
- Production operations ownership, monitoring, backup/recovery drill evidence,
- Payment/Premium and partner commercial terms only if/when those business flows are actually enabled.

No user-count, conversion, revenue, payment success, partner readiness, legal approval, complete deployment PASS, or full device-matrix PASS is implied by this document.

## Supersession rule

Where an older tracker says the current runtime is `0624d7e4...`, `21c56f2e...`, or `d2b8dc08...`, treat those SHAs as previous candidate baselines. Current runtime work uses `6fadf04f...`; `907ea6b1...` is the current non-runtime descendant that adds deployment traceability. Use this file plus latest `main`, Issue #5, and the open Commercial Readiness issues until all secondary trackers are refreshed.
