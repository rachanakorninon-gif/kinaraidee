# Kinaraidee — Current Release State

เอกสารนี้เป็นจุดอ้างอิงสั้น ๆ สำหรับสถานะ release ปัจจุบัน เพื่อป้องกันการตีความเอกสาร QA/Commercial ที่อาจยังมี release trace รุ่นก่อนหน้าอยู่ระหว่างการอัปเดต

หลักการ: ข้อมูล deployment, real-device result, ผู้ใช้, conversion, partner หรือรายได้ จะถูกระบุว่า PASS/พร้อมใช้งานได้เมื่อมีหลักฐานจริงเท่านั้น

## Current source/runtime state

- Current `main` after member-history fix: `21c56f2e84760fada6cebfa464be767facb56b34` (merge of PR #37)
- Latest runtime-changing commit in that fix: `9d5133324dc272a1072c1538ec8606ee574f05a5`
- PWA cache marker remains: `kinaraidee-beta-v13`
- Runtime delta from the previous tracked candidate `0624d7e4928e75d617137db0dba22825e7ba9f5a`: signed-in cloud history now maps Supabase `created_at` to local numeric `at` and restores `liked` / `accepted` flags so the existing history renderer receives the same schema as local-only history.
- Dedicated regression workflow added by PR #37: `Kinaraidee History Sync Regression`.

## Verified CI evidence for PR #37 head

PR #37 head `49aae3a7f6207c75ddeded3ce6f482251c926069` completed successfully for:

- History Sync Regression run `32562684630`
- Beta QA run `32562684566`
- Release Consistency run `32562684574`
- Beta integrity run `32562684582`
- Security Hygiene run `32562684559`

These are static/CI evidence only. They do not replace live deployment evidence or real-device interaction testing.

## Deployment evidence

Status: **PENDING / NOT RECORDED HERE YET**

Before using `21c56f2e...` as a Public Beta release candidate, record evidence that GitHub Pages deployed this commit or a descendant whose runtime payload includes the history fix, and record the corresponding Live Smoke result.

Do not infer deployment success merely from a merged PR or workflow configuration.

## Real-device regression status

A real Android session before PR #37 reproduced `Invalid Date` in signed-in cloud-synced history. The code fix is merged, but the same-device post-deployment regression is still required before Issue #38 may be closed.

Required retest:

1. Open the deployed app online so `data/member-sync.js` can refresh.
2. Sign in to the same member flow used for the defect.
3. Open history and verify every cloud-synced row shows a valid date/time rather than `Invalid Date`.
4. Verify liked/picked counts remain correct after cloud reload.
5. Preserve device/browser/deployed-SHA evidence and link it from Issue #38 / Beta run evidence.

Status: **NOT YET VERIFIED AFTER FIX**.

## Public Beta gate impact

Until the post-fix real-device retest and deployment trace are recorded:

- Issue #38 remains open.
- Issue #5 technical real-device gate remains incomplete.
- Issue #1 Beta launch acceptance remains incomplete.
- Recruitment/measurement in Issue #3 must not treat the history regression as closed.

The Android Partner application validation/privacy path tested in the assisted QA session is useful evidence for that device session, but it does not by itself satisfy the complete device matrix or deployment trace requirements.

## Commercial Readiness impact

Commercial launch remains **NO-GO** while required evidence or decisions are outstanding, including at minimum:

- Public Beta technical/device acceptance and deployment/live trace.
- Supabase Auth leaked-password protection follow-up (Issue #11).
- `main` branch protection / required-check governance (Issue #35).
- Production Privacy/Terms/controller/contact/retention/legal review decisions.
- Production operations ownership, monitoring, backup/recovery drill evidence.
- Payment/Premium and partner commercial terms only if/when those business flows are actually enabled.

No user-count, conversion, revenue, payment success, partner readiness, legal approval, deployment PASS, or real-device PASS is implied by this document.

## Supersession rule

Where an older tracker says the “current runtime release” is `0624d7e4...`, treat that SHA as the previous candidate baseline. For current work, use this file plus the latest `main` history and open issues until those trackers are refreshed.
