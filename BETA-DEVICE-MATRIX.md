# กินอะไรดี — Beta Device Matrix

ใช้ตารางนี้บันทึกผลทดสอบจริงรายอุปกรณ์ โดยอ้างอิง `BETA-TEST-CASES.md` และ `BETA-NEW-FLOW-TESTS.md`

## Release trace สำหรับรอบนี้
- Current browser/PWA runtime candidate: `35fe4b7fbf201882ea2ebad8ffca2b8da668999b` (PR #79; deployed and trace-verified).
- Expected Service Worker cache: `kinaraidee-beta-v13`.
- Pages run `32621529715` = SUCCESS for exact runtime SHA `35fe4b7fbf201882ea2ebad8ffca2b8da668999b`.
- Public Pages Trace Check `32621547307` = SUCCESS and verified public `release-meta.json`, `kinaraidee-beta-v13`, deployment probe lineage and matching live Service Worker marker.
- Corresponding Live Smoke `32621549478` = SUCCESS for the same deployed browser/PWA runtime.
- Current Group API source candidate: PR #93 / `fefc29322ac13f7066038a663bfeb7091d218b8f`, deployed as Supabase ACTIVE version 6 with source/deployment parity. Canonical rejection-only probe `32632951668` = SUCCESS. This backend evidence does **not** create a new real-device Group PASS.
- Historical Partner privacy runtime: `0624d7e4928e75d617137db0dba22825e7ba9f5a` (PR #28). Android #1 TC-12 submission/privacy fields were independently confirmed.
- `CURRENT-RELEASE.md` is the canonical release-state reference when older device notes conflict.

> Android evidence below comes from the same physical device/session family only. Device model, Android version and Chrome version were not captured, so those fields remain `not captured` rather than being guessed.

> A PASS below means actual-device evidence was recorded for that scoped behavior. It must not be generalized to another device/browser or to runtime/backend behavior changed later. Empty cells remain untested/unverified.

## Android Chrome

| Device | Android | Chrome | TC-01 | TC-02 | TC-03 | TC-08 | TC-09 | TC-10 | TC-13 | TC-14 | NF-01 | NF-02 | NF-04 | NF-08 | NF-09 | NF-10 | SW/Cache | Notes |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Android #1 | not captured | not captured | PASS | PASS | PASS |  | PASS | PASS | PASS | PASS | PASS | PASS* |  | PASS | INCONCLUSIVE* | PASS | v13 expected; shell/offline observed | Installed standalone PWA; offline cold start + offline recommendation + offline→online recovery passed. `NF-02` is observed behavior only: first tap navigated immediately and repeat taps could not be delivered; no duplicate/result-stack symptom was observed. Accessible name/role for Surprise was spoken correctly by TalkBack in an earlier valid attempt, but the current full NF-09 busy-state acceptance is not validly completed because the available TalkBack activation environment became unreliable outside the app as well. Group 2/2 final result was observed working in the historical tested session. TC-11/TC-12/TC-15 shared cases also PASS. |
| Android #2 |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
| Android #3 |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |

## iPhone Safari

| Device | iOS | Safari | TC-01 | TC-02 | TC-03 | TC-08 | TC-09 | TC-10 | TC-13 | TC-14 | NF-01 | NF-02 | NF-05 | NF-08 | NF-09 | NF-10 | Standalone | Notes |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| iPhone #1 |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
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
| TC-06 เมนูโปรด | PASS | Favorite/history persistence observed after focused history race regression retest. |
| TC-07 แชร์ | PASS | Share/invite flow was exercised during live-group testing on this Android session. |
| TC-10 Google Maps / nearby flow | PASS | No-partner fallback continued to Google Maps and later recovered correctly from offline→online. |
| TC-11 Feedback | PASS | UI success observed and backend row independently confirmed during the session. |
| TC-12 Partner application | PASS | Consent + submission succeeded; Supabase independently confirmed `privacy_notice_version='2026-08-21'` and non-null `privacy_acknowledged_at`. |
| TC-15 404 recovery | PASS | Deliberately nonexistent Pages path recovered to usable Kinaraidee home instead of blank/dead 404. |
| NF-03 กลับหน้าแรกแล้วสุ่มใหม่ | PASS | Surprise/result flow was repeated successfully on the same device. |
| NF-06 Offline after update | PASS | Offline shell and offline recommendation worked after prior online use; this is not the same as NF-07 old-cache upgrade. |
| NF-07 Update จาก cache รุ่นก่อนหน้าไป `kinaraidee-beta-v13` |  | Still unverified; synthetic CI coverage and normal v13 PWA use do not constitute device PASS. |
| NF-09 TalkBack/VoiceOver | INCONCLUSIVE | Earlier TalkBack evidence validly covered accessible name + button role. Busy announcement had historical pre-fix FAIL evidence. Current persistent live-region implementation is deployed, but latest full acceptance attempt is blocked/inconclusive because assistive-technology activation outside the app was not reliably usable. Issue #57 remains open. |

## Live-group focused regression — Android #1

- Pre-fix session reached 2/2 votes but final-result button returned home; this was the defect fixed by PR #42.
- Later same-device/session evidence recorded in Issue #5 shows **group 2/2 final result + repeated reroll + handoff to normal result** working.
- Current Group API v6 has source/deployment/rejection-probe evidence, but no new post-v6 real-device Group run is inferred from those automated checks.
- The recorded PASS therefore remains scoped to the historical Android #1 tested interaction session and does **not** prove other Android models or iPhone behavior.

## สถานะที่ใช้
- `PASS` = ทดสอบจริงและผ่านในขอบเขตที่บันทึก
- `FAIL` = ทดสอบจริงและไม่ผ่าน
- `INCONCLUSIVE` = มีการพยายามทดสอบจริง แต่สภาพแวดล้อม/เครื่องมือทดสอบไม่อนุญาตให้สรุป PASS หรือ FAIL ของแอปอย่างน่าเชื่อถือ
- `N/A` = อุปกรณ์/browser ไม่รองรับกรณีนั้นจริง
- เว้นว่าง = ยังไม่ได้ทดสอบ / หลักฐานไม่พอ

## กฎการปล่อย Beta รอบถัดไป
- Android Chrome อย่างน้อย 3 รุ่นต้องผ่าน core flow — ตอนนี้มีหลักฐาน Android เพียง 1 เครื่อง/session และ exact model/version ไม่ถูกบันทึก
- iPhone Safari อย่างน้อย 2 รุ่นต้องผ่าน core flow — ยังไม่มีหลักฐาน
- New Flow NF-01–NF-10 ต้องมีผลตาม platform ที่เกี่ยวข้อง
- NF-07 ต้องตรวจ upgrade จาก cache รุ่นก่อนหน้าไป `kinaraidee-beta-v13` บนอุปกรณ์จริงอย่างน้อยหนึ่งเครื่อง
- NF-09 ต้องผ่านบน TalkBack/VoiceOver environment ที่ทำงานได้จริง; source/static/synthetic evidence ไม่แทน assistive-tech device acceptance
- Browser/PWA deployment trace สำหรับ PR #79 ผ่านแล้ว แต่ deployment PASS ไม่แทน device matrix
- Blocker/Critical ต้องเป็น 0 ก่อน Beta acceptance/เพิ่ม traffic ตาม gate ที่กำหนด
- ทุก FAIL ต้องมี defect/Issue หรือบันทึกเหตุผลที่ตามแก้ได้

ห้ามกรอก PASS จากการคาดเดา, CI/static review เพียงอย่างเดียว, synthetic monitoring, หรือผลของอุปกรณ์คนละเครื่อง
