# Public Form Physical Evidence

Status: **NOT VERIFIED**

Purpose: record only real physical-device evidence for PR #201 / deployed `kinaraidee-beta-v16` public Feedback and Partner form acceptance (TC-11 / TC-12). This file must not be used to fabricate or infer device, user, partner, conversion, payment, revenue, Public Beta, or Commercial results from CI, source review, Pages, Live Smoke, or synthetic checks.

## Canonical runtime scope

- Browser/PWA runtime candidate: PR #201 / `a60318b432598e2eb82e71dcf1a9ec804ff1c4b2`
- Runtime merge/deployed SHA: `00bdcb7f432d542b732cf355336e9f08798e4320`
- PWA cache: `kinaraidee-beta-v16`
- Source/deployment evidence: verified separately in `CURRENT-RELEASE.md` / `CURRENT-RUNTIME.md`

## TC-11 Feedback physical acceptance

- Device / OS / browser or installed-PWA context: OPPO Reno13 5G (`CPH2689`) / Android 16 / Chrome `152.0.7977.64`; later focused duplicate-submit and offline-recovery retests were explicitly captured in a visible Chrome tab
- Tester/session reference: 2026-09-03 user-assisted Android physical QA session
- Intended authorized Beta test submission completed: **NOT VERIFIED**
- Duplicate-submit protection observed: **NOT VERIFIED**
- Reproducible network/SDK failure exercised: **NOT VERIFIED**
- Submit control re-enabled after failure: **NOT VERIFIED**
- `aria-busy` cleared after failure: **NOT VERIFIED**
- Success evidence kept separate from failure-recovery evidence: **NOT VERIFIED**
- Evidence location: GitHub Issue #5 comments `5527228686` / `5527422702`; source screenshots were supplied in the same user-assisted QA conversation
- Result: **NOT VERIFIED**

## TC-12 Partner application physical acceptance

- Device / OS / browser or installed-PWA context: OPPO Reno13 5G (`CPH2689`) / Android 16 / Chrome `152.0.7977.64` available from same-device metadata capture; exact browser-tab vs installed-PWA context during the public-form interaction is **NOT CAPTURED**
- Tester/session reference: 2026-09-03 user-assisted Android physical QA session
- Intended authorized Beta test submission completed: **NOT VERIFIED**
- Duplicate-submit protection observed: **NOT VERIFIED**
- Reproducible network/SDK failure exercised: **NOT VERIFIED**
- Submit control re-enabled after failure: **NOT VERIFIED**
- `aria-busy` cleared after failure: **NOT VERIFIED**
- Privacy notice version recorded as expected: **NOT VERIFIED**
- Privacy acknowledgement timestamp recorded as expected: **NOT VERIFIED**
- Success evidence kept separate from failure-recovery evidence: **NOT VERIFIED**
- Evidence location: GitHub Issue #5 comment `5527422702`; source screenshots were supplied in the same user-assisted QA conversation
- Result: **NOT VERIFIED**

## 2026-09-03 Android scoped supporting observations

These observations came from a user-assisted physical Android session and materially improve the evidence record, but they do not promote the canonical acceptance fields above while direct `aria-busy` verification remains incomplete. Details are also recorded in GitHub Issue #5 comments `5527228686` and `5527422702`.

### TC-11 supporting observations

- Physical Android session exercised airplane-mode/offline submission with Beta marker `TC-11 Android offline recovery Beta test 2026-09-03`, rating 5 and type `feedback`.
- The UI showed an understandable failure state and visibly restored the normal `ส่งความคิดเห็น` control while retaining the entered rating/message for retry.
- After network restoration, a separate retry succeeded; the UI showed `ขอบคุณครับ เราได้รับความคิดเห็นของคุณแล้ว ✅` and cleared the submitted form state.
- Supabase independently confirmed exactly one matching `beta_feedback` row at `2026-09-03 14:21:44.844204+00`.
- The stored feedback row reported a reduced Chromium user-agent with Chrome `152.0.0.0`; later same-device About Chrome evidence captured the exact installed Chrome application version as `152.0.7977.64`.
- Focused duplicate-guard retest used marker `TC-11 Android Chrome duplicate guard retest 2026-09-03` in an explicitly visible Chrome tab. The tester was instructed to press submit 3 times in rapid succession; the UI then showed the normal success state and cleared the submitted form fields.
- Supabase independently confirmed exactly one matching `beta_feedback` row for that focused duplicate retest at `2026-09-03 16:15:57.958743+00`. This supports a scoped TC-11 duplicate-submit guard PASS for this Chrome-tab retest, while the canonical result remains unchanged until all required acceptance fields can move together.
- Focused Chrome-tab offline-recovery retest then used marker `TC-11 Android Chrome offline recovery retest 2026-09-03`. A screenshot captured the Chrome address bar together with airplane-mode status, an understandable `ส่งความคิดเห็นไม่สำเร็จ กรุณาลองใหม่อีกครั้ง` error, the normal `ส่งความคิดเห็น` control visibly restored, and the original five-star rating/message retained for retry.
- After network restoration in that same visible Chrome tab, a separate retry succeeded; the UI showed `ขอบคุณครับ เราได้รับความคิดเห็นของคุณแล้ว ✅` and cleared the submitted form state.
- Supabase independently confirmed exactly one matching `beta_feedback` row for the focused Chrome-tab offline-recovery marker at `2026-09-03 16:21:22.645204+00`.
- This focused retest resolves the earlier browser-vs-installed-PWA ambiguity for the visible TC-11 failure-recovery and restored-network success behavior on this device.
- The visible button recovery does not directly prove the DOM `aria-busy` value, so direct `aria-busy` acceptance remains open.

### TC-12 supporting observations

- With required Beta fields populated and consent unchecked, the physical UI blocked submission and showed `กรุณายอมรับการใช้ข้อมูลเพื่อให้ทีมติดต่อกลับ`.
- Beta marker `TC-12 Android Beta Test` with notes `TC-12 Android offline recovery Beta test 2026-09-03` was then exercised with consent checked and airplane mode enabled.
- The offline attempt showed `ส่งข้อมูลไม่สำเร็จ กรุณาลองใหม่อีกครั้ง`; the normal `ส่งข้อมูลร้าน` control visibly returned and the entered data + consent remained available for retry.
- After network restoration, a separate retry succeeded and the UI showed `✅ ส่งข้อมูลร้านเรียบร้อยแล้ว ทีมงานจะตรวจสอบและติดต่อกลับ`; the form fields and consent were cleared after success.
- Supabase independently confirmed exactly one matching retry row at `2026-09-03 14:34:10.665115+00`, with `privacy_notice_version='2026-08-21'` and non-null `privacy_acknowledged_at='2026-09-03 14:34:08.844+00`.
- Focused duplicate-guard retest used restaurant `TC-12 Android Duplicate Test` and notes `TC-12 Android duplicate guard retest 2026-09-03`. The tester explicitly reported pressing submit 3 times in rapid succession; Supabase independently found exactly one matching row at `2026-09-03 14:37:16.509208+00`.
- These are Beta QA test records only and are not commercial partner/conversion/revenue evidence.
- The visible button recovery does not directly prove the DOM `aria-busy` value.

### Trace boundary for this session

- Device: OPPO Reno13 5G (`CPH2689`).
- OS: Android 16; ColorOS 16.0.5; Android security update shown as 1 July 2026.
- Software/build evidence: `CPH2689_16.0.5.1000(EX01B100P01)` and Android build shown in About Chrome as `CPH2689 Build/BP2A.250605.015`.
- Browser application version captured on the same device: Chrome `152.0.7977.64`.
- Exact browser-vs-installed-PWA context for the original TC-11/TC-12 offline-recovery screenshots was not captured; the later TC-11 duplicate-submit and offline-recovery/retry retests were explicitly captured in a Chrome tab.
- Screenshot evidence was supplied during the 2026-09-03 user-assisted QA conversation; the repository evidence anchors are Issue #5 comments `5527228686` and `5527422702`.
- Because the canonical contract requires complete trace metadata and direct acceptance fields to move together, the canonical TC-11/TC-12 result blocks above remain unchanged until a fully qualifying session is captured.

## Evidence boundary

- Static `Public Form Resilience Regression`, Pages, Live Smoke, source markers, CI, or repository documentation are implementation/deployment evidence only; they do **not** establish TC-11/TC-12 physical interaction PASS.
- Partner test records used for Beta QA must not be counted as real commercial partner, conversion, commission, payment, or revenue evidence.
- If exact device/OS/browser metadata was not captured, keep `NOT CAPTURED`; never guess.
- A PASS requires the tested device/OS/browser-or-PWA context, tester/session reference, and evidence location to be captured for both TC-11 and TC-12; missing trace metadata must remain `NOT CAPTURED`, not inferred from CI or deployment records.
- Change `Status` or a TC result to PASS only after the physical acceptance steps in `BETA-TEST-CASES.md` were actually executed and the supporting evidence is traceable.
- TC-11/TC-12 PASS does not imply full device-matrix completion, Public Beta completion, or Commercial GO.
