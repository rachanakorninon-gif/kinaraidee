# Public Form Physical Evidence

Status: **NOT VERIFIED**

Purpose: record only real physical-device evidence for PR #201 / deployed `kinaraidee-beta-v16` public Feedback and Partner form acceptance (TC-11 / TC-12). This file must not be used to fabricate or infer device, user, partner, conversion, payment, revenue, Public Beta, or Commercial results from CI, source review, Pages, Live Smoke, or synthetic checks.

## Canonical runtime scope

- Browser/PWA runtime candidate: PR #201 / `a60318b432598e2eb82e71dcf1a9ec804ff1c4b2`
- Runtime merge/deployed SHA: `00bdcb7f432d542b732cf355336e9f08798e4320`
- PWA cache: `kinaraidee-beta-v16`
- Source/deployment evidence: verified separately in `CURRENT-RELEASE.md` / `CURRENT-RUNTIME.md`
- Current descendants may retain these form files unchanged, but this evidence remains scoped to the public-form behavior actually exercised on the physical session below.

## 2026-09-03 Android physical session

- Physical platform: Android device, user-assisted real-device session.
- Exact device model: **NOT CAPTURED**.
- Exact Android version: **NOT CAPTURED**.
- Exact browser vs installed-PWA context: **NOT CAPTURED**.
- TC-11 stored feedback row reported a reduced Chromium user-agent with Chrome `152.0.0.0`; the reduced Android token is not sufficient to infer the exact OS/device.
- Network states exercised: online, airplane-mode/offline, restored online.
- Evidence reference: GitHub Issue #5 comment `5527422702`; screenshots were supplied during the 2026-09-03 user-assisted QA session. Backend rows were independently checked in Supabase.

## TC-11 Feedback physical acceptance

- Device / OS / browser or installed-PWA context: **PARTIALLY CAPTURED** — Android physical device; exact model/Android/browser-or-PWA context **NOT CAPTURED**.
- Tester/session reference: **CAPTURED** — 2026-09-03 user-assisted Android QA session; Issue #5 comment `5527422702`.
- Intended authorized Beta test submission completed: **VERIFIED** — marker `TC-11 Android offline recovery Beta test 2026-09-03`, rating 5, type `feedback`; Supabase confirmed exactly one matching row at `2026-09-03 14:21:44.844204+00`.
- Duplicate-submit protection observed: **NOT VERIFIED** — this session did not produce sufficiently traceable physical rapid-repeat evidence for TC-11.
- Reproducible network/SDK failure exercised: **VERIFIED** — airplane mode/offline attempt produced an understandable failure state.
- Submit control re-enabled after failure: **VERIFIED** — screenshot showed the normal `ส่งความคิดเห็น` control restored and the entered rating/message retained for retry.
- `aria-busy` cleared after failure: **NOT VERIFIED** — screenshots do not directly expose the DOM attribute; source behavior is implementation evidence only.
- Success evidence kept separate from failure-recovery evidence: **VERIFIED** — offline failure was captured first, then network was restored and a separate successful retry was captured and backend-confirmed.
- Evidence location: Issue #5 comment `5527422702` + 2026-09-03 session screenshots + Supabase row identified above.
- Result: **PARTIAL / NOT VERIFIED** — failure recovery, retry success and backend acceptance are physically supported, but duplicate-submit and direct `aria-busy` acceptance remain open and exact device trace metadata is incomplete.

## TC-12 Partner application physical acceptance

- Device / OS / browser or installed-PWA context: **PARTIALLY CAPTURED** — Android physical device; exact model/Android/browser-or-PWA context **NOT CAPTURED**.
- Tester/session reference: **CAPTURED** — 2026-09-03 user-assisted Android QA session; Issue #5 comment `5527422702`.
- Intended authorized Beta test submission completed: **VERIFIED** — restaurant marker `TC-12 Android Beta Test`, notes `TC-12 Android offline recovery Beta test 2026-09-03`; Supabase confirmed exactly one matching row at `2026-09-03 14:34:10.665115+00`.
- Duplicate-submit protection observed: **VERIFIED FOR THIS SESSION** — focused retest used restaurant `TC-12 Android Duplicate Test`, notes `TC-12 Android duplicate guard retest 2026-09-03`; tester explicitly reported 3 rapid submit presses and Supabase independently found exactly one matching row at `2026-09-03 14:37:16.509208+00`.
- Reproducible network/SDK failure exercised: **VERIFIED** — airplane mode/offline attempt produced `ส่งข้อมูลไม่สำเร็จ กรุณาลองใหม่อีกครั้ง`.
- Submit control re-enabled after failure: **VERIFIED** — screenshot showed normal `ส่งข้อมูลร้าน` restored with entered data + consent retained for retry.
- `aria-busy` cleared after failure: **NOT VERIFIED** — screenshots do not directly expose the DOM attribute; source behavior is implementation evidence only.
- Privacy notice version recorded as expected: **VERIFIED** — `privacy_notice_version='2026-08-21'`.
- Privacy acknowledgement timestamp recorded as expected: **VERIFIED** — non-null `privacy_acknowledged_at='2026-09-03 14:34:08.844+00'` on the offline-recovery retry record.
- Consent validation before submission: **VERIFIED** — with required Beta fields populated and consent unchecked, UI blocked submission and showed `กรุณายอมรับการใช้ข้อมูลเพื่อให้ทีมติดต่อกลับ`.
- Success evidence kept separate from failure-recovery evidence: **VERIFIED** — privacy validation, offline failure, restored-network success and focused duplicate retest were captured as separate observations.
- Evidence location: Issue #5 comment `5527422702` + 2026-09-03 session screenshots + Supabase rows identified above.
- Result: **PARTIAL / NOT VERIFIED** — duplicate guard, failure recovery, retry success and privacy persistence are physically/backend supported for this session, but direct `aria-busy` acceptance and complete device trace metadata remain open.

## Evidence boundary

- Static `Public Form Resilience Regression`, Pages, Live Smoke, source markers, CI, or repository documentation are implementation/deployment evidence only; they do **not** establish TC-11/TC-12 physical interaction PASS.
- Partner test records used for Beta QA must not be counted as real commercial partner, conversion, commission, payment, or revenue evidence.
- If exact device/OS/browser metadata was not captured, keep `NOT CAPTURED`; never guess.
- A PASS requires the tested device/OS/browser-or-PWA context, tester/session reference, and evidence location to be captured for both TC-11 and TC-12; missing trace metadata must remain `NOT CAPTURED`, not inferred from CI or deployment records.
- Direct `aria-busy` acceptance must not be inferred merely because the visible button recovered; screenshots confirm visible recovery, not the DOM attribute value itself.
- Change `Status` or a TC result to PASS only after the physical acceptance steps in `BETA-TEST-CASES.md` were actually executed and the supporting evidence is traceable.
- TC-11/TC-12 PASS does not imply full device-matrix completion, Public Beta completion, or Commercial GO.
