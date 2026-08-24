# กินอะไรดี — Beta Device Matrix

ใช้ตารางนี้บันทึกผลทดสอบจริงรายอุปกรณ์ โดยอ้างอิง `BETA-TEST-CASES.md` และ `BETA-NEW-FLOW-TESTS.md`

## Release trace สำหรับรอบนี้
- Current browser/PWA runtime candidate: `46b494cc9430ee39c2322f9e0ae8b66149c0d3bf` — `kinaraidee-beta-v15`; merged/deployed SHA `367162286d1e1452151df11dca805ed629bb5466` with Pages `32748690413` = SUCCESS, Live Smoke `32748752875` = SUCCESS and read-only diagnostic `32749016604` = SUCCESS.
- Public `release-meta.json` was independently verified as SHA `367162286d1e1452151df11dca805ed629bb5466` with `kinaraidee-beta-v15`; live `sw.js`, Nearby v15 markers and Favorite/History helper markers were also confirmed.
- v15 changes the real-device paths found during the 2026-08-24 focused session: Location status/error UX, Favorite/History differentiation and PWA shell membership for the new history helper.
- Historical pre-fix browser/PWA runtime remains v14; its deployment/device evidence is retained only as historical scoped evidence and is not reused as post-v15 device PASS.
- The exact public `release-meta.json` descendant read by each physical-device browser session before the v15 fix was not captured. The focused evidence below is therefore scoped to the then-live pre-fix v14 browser behavior, not asserted as v15 evidence.
- Current Group API source candidate: PR #93 / `fefc29322ac13f7066038a663bfeb7091d218b8f`, deployed as Supabase ACTIVE version 6 with source/deployment parity. Canonical rejection-only probe `32632951668` = SUCCESS. Backend evidence does **not** create a new device PASS by itself.
- `CURRENT-RUNTIME.md` and `CURRENT-RELEASE.md` are the canonical release-state references when older notes conflict.

> Android evidence below comes from the same physical device/session family only. Device model, Android version and Chrome version were not captured, so those fields remain `not captured` rather than being guessed.

> iPhone evidence below comes from one physical iPhone/Safari session. Exact iPhone model, iOS version and Safari version were not captured, so those fields remain `not captured` rather than being inferred from appearance.

> A PASS below means actual-device evidence was recorded for that scoped behavior. It must not be generalized to another device/browser or to runtime/backend behavior changed later. Empty cells remain untested/unverified.

## Android Chrome

| Device | Android | Chrome | TC-01 | TC-02 | TC-03 | TC-08 | TC-09 | TC-10 | TC-13 | TC-14 | NF-01 | NF-02 | NF-04 | NF-08 | NF-09 | NF-10 | SW/Cache | Notes |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Android #1 | not captured | not captured | PASS | PASS | PASS |  | PASS | PASS | PASS | PASS | PASS | PASS* |  | PASS | INCONCLUSIVE* | PASS | v14 focused session; v15 post-fix retest required for changed paths | 2026-08-24 focused run: member page/session rendered; logout→login PASS; forgot/reset email arrived; reset page enforced 8 characters; password update returned to member page; logout→login with the new password PASS. Home Surprise returned a valid result. Favorite persistence was observed by the liked count increasing 3→4 and History showed the latest item; the same session exposed that Favorite/History did not visually distinguish liked rows. Nearby→Google Maps opened with numeric coordinates in the Maps query, but TC-08 is not newly marked PASS because an allow-permission decision was not independently captured. Historical installed-PWA/offline/TalkBack notes remain valid only for their earlier scoped runtime. |
| Android #2 |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
| Android #3 |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |

## iPhone Safari

| Device | iOS | Safari | TC-01 | TC-02 | TC-03 | TC-08 | TC-09 | TC-10 | TC-13 | TC-14 | NF-01 | NF-02 | NF-05 | NF-08 | NF-09 | NF-10 | Standalone | Notes |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| iPhone #1 | not captured | not captured | PASS | PASS |  | FAIL |  | PASS |  |  | PASS |  |  |  |  |  |  | 2026-08-24 physical Safari run: Home rendered; immediate Surprise returned a usable result; Nearby rendered; Google Maps fallback opened and produced nearby results; local single-device Group flow completed 2/2 and produced a scored group result; member login and logout both PASS. Install guidance was visibly present, but NF-05 suppression/standalone steps were not completed, so NF-05 remains blank. For TC-08, Safari Websites Location was first observed as Never, then changed to While Using; the per-site Location setting was changed from Ask to Allow; after returning/retrying, Kinaraidee still did not retain coordinates and Maps received `ซุปไก่ใส ใกล้ฉัน` rather than numeric coordinates. This is a scoped pre-fix v14 FAIL and is the defect addressed by the v15 Location-status/error hardening; v15 device retest is still required. |
| iPhone #2 |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |

## iPadOS Safari (ถ้ามีอุปกรณ์)

ใช้ตรวจกรณี Safari รายงานตัวเป็น Mac โดยเฉพาะ NF-05

| Device | iPadOS | Safari | NF-05 | Standalone | Install hint | “เข้าใจแล้ว” suppression | Notes |
|---|---|---|---|---|---|---|---|
| iPad #1 |  |  |  |  |  |  |  |

## Shared functional cases — Android #1 evidence

| Case | Result | Evidence boundary |
|---|---|---|
| TC-04 เลือกใหม่/reroll | PASS | Same-device repeated reroll completed with healthy result UI; exact intermediate count was not independently visible in the final screenshot. |
| TC-05 กินอันนี้ / ประวัติ | PASS | History/stat persistence observed on same Android session, including logout/login checks. |
| TC-06 เมนูโปรด | PASS | Historical same-device persistence evidence remains recorded; the 2026-08-24 focused run independently confirmed persistence by the liked count changing 3→4, while also exposing the pre-v15 visual-differentiation defect. Post-v15 UX retest remains required. |
| TC-07 แชร์ | PASS | Share/invite flow was exercised during live-group testing on this Android session family. |
| TC-10 Google Maps / nearby flow | PASS | No-partner fallback continued to Google Maps; the 2026-08-24 focused Android run showed a menu query carrying numeric coordinates. |
| TC-11 Feedback | PASS | UI success observed and backend row independently confirmed during the historical session. |
| TC-12 Partner application | PASS | Consent + submission succeeded; Supabase independently confirmed `privacy_notice_version='2026-08-21'` and non-null `privacy_acknowledged_at`. |
| TC-15 404 recovery | PASS | Deliberately nonexistent Pages path recovered to usable Kinaraidee home instead of blank/dead 404. |
| NF-03 กลับหน้าแรกแล้วสุ่มใหม่ | PASS | Surprise/result flow was repeated successfully on the same device. |
| NF-06 Offline after update | PASS | Offline shell and offline recommendation worked after prior online use; this is not the same as NF-07 old-cache upgrade. |
| NF-07 Update จาก cache รุ่นก่อนหน้าไป `kinaraidee-beta-v15` |  | Still unverified. Synthetic CI coverage and normal prior-runtime PWA use do not constitute v15 device PASS. |
| NF-09 TalkBack/VoiceOver | INCONCLUSIVE | Earlier TalkBack evidence validly covered accessible name + button role. Busy announcement had historical pre-fix FAIL evidence. Current persistent live-region implementation was deployed on the earlier runtime, but latest full acceptance attempt remains blocked/inconclusive because assistive-technology activation outside the app was not reliably usable. Issue #57 remains open. |

## 2026-08-24 focused cross-platform observations

- Android auth/reset chain: logout → login → forgot password → Supabase reset email → `reset-password.html` → new password (8+ chars) → return to `member.html` → logout → login with new password = **PASS** on the tested Android device.
- Android Favorite persistence: liked counter changed **3 → 4** after liking the result; History retained the item = persistence **PASS**, while lack of visual Favorite differentiation was recorded as a UX defect.
- Android Nearby/Maps: Google Maps query included numeric coordinates = fallback with acquired coordinates **PASS**; this does not by itself create a new TC-08 permission-allow PASS.
- iPhone Home + Surprise + Maps fallback + local 2-person Group result + member login/logout = **PASS** in the scopes observed.
- iPhone TC-08 allow path = **FAIL on the pre-fix v14 runtime** after OS/Safari and per-site Location settings were set to allow but Kinaraidee still supplied no numeric coordinates to Maps.
- v15 is now verified deployed. None of the pre-fix PASS/FAIL observations are relabeled as post-v15 device results.

## Live-group focused regression — Android #1

- Pre-fix session reached 2/2 votes but final-result button returned home; this was the defect fixed by PR #42.
- Later same-device/session evidence recorded in Issue #5 shows **group 2/2 final result + repeated reroll + handoff to normal result** working.
- Current Group API v6 has source/deployment/rejection-probe evidence, but no new post-v6 real-device Group run is inferred from those automated checks.
- The recorded PASS therefore remains scoped to the historical Android #1 tested interaction session and does **not** prove other Android models or iPhone remote/multi-device group behavior.

## สถานะที่ใช้
- `PASS` = ทดสอบจริงและผ่านในขอบเขตที่บันทึก
- `FAIL` = ทดสอบจริงและไม่ผ่าน
- `INCONCLUSIVE` = มีการพยายามทดสอบจริง แต่สภาพแวดล้อม/เครื่องมือทดสอบไม่อนุญาตให้สรุป PASS หรือ FAIL ของแอปอย่างน่าเชื่อถือ
- `N/A` = อุปกรณ์/browser ไม่รองรับกรณีนั้นจริง
- เว้นว่าง = ยังไม่ได้ทดสอบ / หลักฐานไม่พอ

## กฎการปล่อย Beta รอบถัดไป
- Android Chrome อย่างน้อย 3 รุ่นต้องผ่าน core flow — ตอนนี้มีหลักฐาน Android เพียง 1 เครื่อง/session family และ exact model/version ไม่ถูกบันทึก
- iPhone Safari อย่างน้อย 2 รุ่นต้องผ่าน core flow — ตอนนี้มีหลักฐาน iPhone 1 เครื่อง และ exact model/iOS/Safari version ไม่ถูกบันทึก
- New Flow NF-01–NF-10 ต้องมีผลตาม platform ที่เกี่ยวข้อง
- NF-07 ต้องตรวจ upgrade จาก cache รุ่นก่อนหน้าไป `kinaraidee-beta-v15` บนอุปกรณ์จริงอย่างน้อยหนึ่งเครื่อง
- NF-09 ต้องผ่านบน TalkBack/VoiceOver environment ที่ทำงานได้จริง; source/static/synthetic evidence ไม่แทน assistive-tech device acceptance
- v15 merged-main Pages + Live Smoke deployment trace ผ่านแล้ว; automated deployment PASS ไม่แทน post-fix device retest
- iPhone TC-08 pre-fix FAIL ต้องมี post-v15 focused retest ก่อนปิด defect
- Favorite/History v15 visual differentiation ต้องมี physical-device focused retest ก่อนปิด defect
- Blocker/Critical ต้องเป็น 0 ก่อน Beta acceptance/เพิ่ม traffic ตาม gate ที่กำหนด
- ทุก FAIL ต้องมี defect/Issue หรือบันทึกเหตุผลที่ตามแก้ได้

ห้ามกรอก PASS จากการคาดเดา, CI/static review เพียงอย่างเดียว, synthetic monitoring, หรือผลของอุปกรณ์คนละเครื่อง
