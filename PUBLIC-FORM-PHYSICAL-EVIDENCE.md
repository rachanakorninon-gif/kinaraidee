# Public Form Physical Evidence

Status: **PASS**

Purpose: record only real physical-device evidence for the deployed public Feedback and Partner form acceptance (TC-11 / TC-12). This file must not be used to fabricate or infer device, user, partner, conversion, payment, revenue, Public Beta, or Commercial results from CI, source review, Pages, Live Smoke, or synthetic checks.

## Canonical runtime scope

- Relevant public-form implementation lineage: PR #201 / `a60318b432598e2eb82e71dcf1a9ec804ff1c4b2`
- Historical runtime merge/deployed SHA for that form hardening: `00bdcb7f432d542b732cf355336e9f08798e4320`
- PWA cache lineage: `kinaraidee-beta-v16`
- Physical retests below were executed against the currently deployed GitHub Pages runtime on 2026-09-03–04 (Thailand local time).
- Source/deployment evidence remains tracked separately in `CURRENT-RELEASE.md` / `CURRENT-RUNTIME.md`.

## TC-11 Feedback physical acceptance

- Device / OS / browser or installed-PWA context: OPPO Reno13 5G (`CPH2689`) / Android 16 / Chrome `152.0.7977.64`; focused acceptance retests were explicitly captured in a visible Chrome tab.
- Tester/session reference: 2026-09-03–04 continuous user-assisted Android physical QA session.
- Intended authorized Beta test submission completed: **PASS**
- Duplicate-submit protection observed: **PASS**
- Reproducible network/SDK failure exercised: **PASS**
- Submit control re-enabled after failure: **PASS**
- `aria-busy` cleared after failure: **PASS**
- Success evidence kept separate from failure-recovery evidence: **PASS**
- Evidence location: GitHub Issue #5 comments including `5527228686`, `5527422702`, and DOM-state PASS comment `5529451809`; source screenshots were supplied in the same user-assisted QA conversation.
- Result: **PASS**
- Scope note: PASS is limited to this Android Chrome device/session and does not satisfy the remaining device-matrix minimum by itself.

## TC-12 Partner application physical acceptance

- Device / OS / browser or installed-PWA context: OPPO Reno13 5G (`CPH2689`) / Android 16 / Chrome `152.0.7977.64`; focused acceptance retests were explicitly captured in a visible Chrome tab.
- Tester/session reference: 2026-09-03–04 continuous user-assisted Android physical QA session.
- Intended authorized Beta test submission completed: **PASS**
- Duplicate-submit protection observed: **PASS**
- Reproducible network/SDK failure exercised: **PASS**
- Submit control re-enabled after failure: **PASS**
- `aria-busy` cleared after failure: **PASS**
- Privacy notice version recorded as expected: **PASS**
- Privacy acknowledgement timestamp recorded as expected: **PASS**
- Success evidence kept separate from failure-recovery evidence: **PASS**
- Evidence location: GitHub Issue #5 comments including `5527422702` and DOM-state PASS comment `5529522177`; source screenshots were supplied in the same user-assisted QA conversation.
- Result: **PASS**
- Scope note: PASS is limited to this Android Chrome device/session and does not satisfy the remaining device-matrix minimum by itself.

## 2026-09-03–04 Android scoped supporting observations

These observations came from a user-assisted physical Android session. They establish TC-11 / TC-12 acceptance only for the explicitly captured OPPO Reno13 5G / Android 16 / Chrome 152 context and do not satisfy the remaining device-matrix minimum by themselves.

### TC-11 supporting observations

- Physical Android session exercised airplane-mode/offline submission with Beta marker `TC-11 Android offline recovery Beta test 2026-09-03`, rating 5 and type `feedback`.
- The UI showed an understandable failure state and visibly restored the normal `ส่งความคิดเห็น` control while retaining the entered rating/message for retry.
- After network restoration, a separate retry succeeded; the UI showed `ขอบคุณครับ เราได้รับความคิดเห็นของคุณแล้ว ✅` and cleared the submitted form state.
- Supabase independently confirmed exactly one matching `beta_feedback` row at `2026-09-03 14:21:44.844204+00`.
- The stored feedback row reported a reduced Chromium user-agent with Chrome `152.0.0.0`; same-device About Chrome evidence captured the exact installed Chrome application version as `152.0.7977.64`.
- Focused duplicate-guard retest used marker `TC-11 Android Chrome duplicate guard retest 2026-09-03` in an explicitly visible Chrome tab. The tester was instructed to press submit 3 times in rapid succession; the UI then showed the normal success state and cleared the submitted form fields.
- Supabase independently confirmed exactly one matching `beta_feedback` row for that focused duplicate retest at `2026-09-03 16:15:57.958743+00`.
- Focused Chrome-tab offline-recovery retest used marker `TC-11 Android Chrome offline recovery retest 2026-09-03`. A screenshot captured the Chrome address bar together with airplane-mode status, an understandable `ส่งความคิดเห็นไม่สำเร็จ กรุณาลองใหม่อีกครั้ง` error, the normal `ส่งความคิดเห็น` control visibly restored, and the original five-star rating/message retained for retry.
- After network restoration in that same visible Chrome tab, a separate retry succeeded; the UI showed `ขอบคุณครับ เราได้รับความคิดเห็นของคุณแล้ว ✅` and cleared the submitted form state.
- Supabase independently confirmed exactly one matching `beta_feedback` row for the focused Chrome-tab offline-recovery marker at `2026-09-03 16:21:22.645204+00`.
- Final DOM-state physical retest used the QA-only same-origin probe on the same Android Chrome device, with airplane mode enabled before submit and Beta marker `TC-11 Android Chrome offline recovery Beta test 2026-09-04`.
- The probe directly recorded `aria-busy` mutation from `<absent>` to `true`, `disabled=true`, the failure message, then `aria-busy` mutation from `true` to `<absent>` with `disabled=false`.
- The probe displayed the physical verdict: `PASS: เคยเห็น aria-busy=true และหลัง error ค่า aria-busy ถูกลบ พร้อม disabled=false`.

### TC-12 supporting observations

- With required Beta fields populated and consent unchecked, the physical UI blocked submission and showed `กรุณายอมรับการใช้ข้อมูลเพื่อให้ทีมติดต่อกลับ`.
- Beta marker `TC-12 Android Beta Test` with notes `TC-12 Android offline recovery Beta test 2026-09-03` was then exercised with consent checked and airplane mode enabled.
- The offline attempt showed `ส่งข้อมูลไม่สำเร็จ กรุณาลองใหม่อีกครั้ง`; the normal `ส่งข้อมูลร้าน` control visibly returned and the entered data + consent remained available for retry.
- After network restoration, a separate retry succeeded and the UI showed `✅ ส่งข้อมูลร้านเรียบร้อยแล้ว ทีมงานจะตรวจสอบและติดต่อกลับ`; the form fields and consent were cleared after success.
- Supabase independently confirmed exactly one matching retry row at `2026-09-03 14:34:10.665115+00`, with `privacy_notice_version='2026-08-21'` and non-null `privacy_acknowledged_at='2026-09-03 14:34:08.844+00`.
- Focused duplicate-guard retest used restaurant `TC-12 Android Duplicate Test` and notes `TC-12 Android duplicate guard retest 2026-09-03`. The tester explicitly reported pressing submit 3 times in rapid succession; Supabase independently found exactly one matching row at `2026-09-03 14:37:16.509208+00`.
- Focused Chrome-tab offline-recovery retest used restaurant `TC-12 Android Chrome Retest` and notes `TC-12 Android Chrome offline recovery retest 2026-09-03`. A screenshot captured the Chrome address bar together with airplane-mode status, `ส่งข้อมูลไม่สำเร็จ กรุณาลองใหม่อีกครั้ง`, the normal `ส่งข้อมูลร้าน` control visibly restored, the Beta form data retained and consent still checked for retry.
- After network restoration in that same visible Chrome tab, a separate retry succeeded; the UI showed `✅ ส่งข้อมูลร้านเรียบร้อยแล้ว ทีมงานจะตรวจสอบและติดต่อกลับ` and cleared the form fields and consent.
- Supabase independently confirmed exactly one matching `partner_applications` row for that focused Chrome-tab offline-recovery marker at `2026-09-03 16:33:16.114258+00`, with `privacy_notice_version='2026-08-21'` and a non-null privacy acknowledgement timestamp.
- Focused Chrome-tab duplicate-guard retest used restaurant `TC-12 Android Chrome Duplicate Retest` and notes `TC-12 Android Chrome duplicate guard retest 2026-09-03`. The tester was instructed to press submit 3 times rapidly; the UI showed the success state and cleared the form fields and consent.
- Supabase independently confirmed exactly one matching row for that focused Chrome duplicate retest at `2026-09-03 16:35:51.907906+00`, with `privacy_notice_version='2026-08-21'` and a non-null privacy acknowledgement timestamp.
- Final DOM-state physical retest used the QA-only same-origin probe on the same Android Chrome device, with airplane mode enabled before submit and notes marker `TC-12 Android Chrome aria-busy offline 2026-09-04`.
- The probe directly recorded `aria-busy` mutation from `<absent>` to `true`, button text `กำลังส่งข้อมูล...`, `disabled=true`, the failure message, then `aria-busy` mutation from `true` to `<absent>` with `disabled=false` and normal button text restored.
- The probe displayed the physical verdict: `PASS: เคยเห็น aria-busy=true และหลัง error ค่า aria-busy ถูกลบ พร้อม disabled=false`.
- These are Beta QA test records only and are not commercial partner/conversion/revenue evidence.

### Trace boundary for this session

- Device: OPPO Reno13 5G (`CPH2689`).
- OS: Android 16; ColorOS 16.0.5; Android security update shown as 1 July 2026.
- Software/build evidence: `CPH2689_16.0.5.1000(EX01B100P01)` and Android build shown in About Chrome as `CPH2689 Build/BP2A.250605.015`.
- Browser application version captured on the same device: Chrome `152.0.7977.64`.
- Focused TC-11 and TC-12 duplicate-submit, offline-recovery/retry, and final DOM-state retests were explicitly captured in a Chrome tab.
- Screenshot evidence was supplied during the 2026-09-03–04 user-assisted QA conversation; repository anchors include Issue #5 comments for the focused Chrome and DOM-state retests.

## Evidence boundary

- Static `Public Form Resilience Regression`, Pages, Live Smoke, source markers, CI, or repository documentation are implementation/deployment evidence only; they do **not** establish TC-11/TC-12 physical interaction PASS.
- The PASS above comes from the documented physical Android Chrome session and is limited to that device/browser scope.
- Partner test records used for Beta QA must not be counted as real commercial partner, conversion, commission, payment, or revenue evidence.
- If exact device/OS/browser metadata was not captured, keep `NOT CAPTURED`; never guess.
- A PASS requires the tested device/OS/browser-or-PWA context, tester/session reference, and evidence location to be captured for both TC-11 and TC-12; missing trace metadata must remain `NOT CAPTURED`, not inferred from CI or deployment records.
- Change `Status` or a TC result to PASS only after the physical acceptance steps in `BETA-TEST-CASES.md` were actually executed and the supporting evidence is traceable.
- TC-11/TC-12 PASS does not imply full device-matrix completion, Public Beta completion, or Commercial GO.
