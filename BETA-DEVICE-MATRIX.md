# กินอะไรดี — Beta Device Matrix

ใช้ตารางนี้บันทึกผลทดสอบจริงรายอุปกรณ์ โดยอ้างอิง `BETA-TEST-CASES.md` และ `BETA-NEW-FLOW-TESTS.md`

## Release trace สำหรับรอบนี้
- Current browser runtime candidate: `6fadf04fdf647680b60df2ada9cb43f4659816dd` (PR #42 merged; completed live-group result bridge fix)
- Current `main` descendant at evidence-sync start: `ef1cdee9e5dd60677a544e36be02bb7d003ae6a6` (PR #53 merged; deployment diagnostic/workflow change, no core browser behavior change)
- Expected Service Worker cache: `kinaraidee-beta-v13`
- PR #53 final head `f3c6d6f7d905b39e99b92ae181b3175de5761ad1` passed 8 PR checks: Security Hygiene `32589443121`, Release Metadata Regression `32589443150`, Release Consistency `32589443112`, Group Result Regression `32589443111`, History Sync Regression `32589443118`, Beta integrity `32589443151`, Credential Scanner Regression `32589443114`, Beta QA `32589443133` — all SUCCESS.
- PR #53 adds `deployment-check.html` and Pages/Live Smoke probe wiring, but PR CI is not Pages deployment proof.
- Deployed SHA / Pages run / Live Smoke run: **not yet independently verified**.
- Historical Partner privacy runtime: `0624d7e4928e75d617137db0dba22825e7ba9f5a` (PR #28). TC-12 was retested on the current runtime-equivalent Android session and backend privacy fields were independently confirmed.

> Android evidence below comes from the same physical device/session only. Device model, Android version, and Chrome version were not captured, so those fields remain `not captured` rather than being guessed.

> A PASS below means actual-device evidence was recorded in Issue #5. It must not be generalized to another device/browser. Empty cells remain untested/unverified.

## Android Chrome

| Device | Android | Chrome | TC-01 | TC-02 | TC-03 | TC-08 | TC-09 | TC-10 | TC-13 | TC-14 | NF-01 | NF-02 | NF-04 | NF-08 | NF-09 | NF-10 | SW/Cache | Notes |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Android #1 | not captured | not captured | PASS | PASS | PASS |  | PASS | PASS | PASS | PASS | PASS | PASS* |  | PASS |  | PASS | v13 expected; shell/offline observed | Installed standalone PWA; offline cold start + offline recommendation + offline→online recovery passed. `NF-02` is observed behavior: first tap navigated immediately and repeat taps could not be delivered; no duplicate/result-stack symptom was observed. Group 2/2 final result was later observed working on this same session. TC-11/TC-12/TC-15 shared cases also PASS. |
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
| TC-06 เมนูโปรด | PASS | Favorite/history persistence observed after the PR #41 race fix retest. |
| TC-07 แชร์ | PASS | Share/invite flow was exercised during live-group testing on this Android session. |
| TC-10 Google Maps / nearby flow | PASS | No-partner fallback continued to Google Maps and later recovered correctly from offline→online. |
| TC-11 Feedback | PASS | UI success observed and backend row independently confirmed during the session. |
| TC-12 Partner application | PASS | Consent + submission succeeded; Supabase independently confirmed `privacy_notice_version='2026-08-21'` and non-null `privacy_acknowledged_at`. |
| TC-15 404 recovery | PASS | Deliberately nonexistent Pages path recovered to usable Kinaraidee home instead of blank/dead 404. |
| NF-03 กลับหน้าแรกแล้วสุ่มใหม่ | PASS | Surprise/result flow was repeated successfully on the same device. |
| NF-06 Offline after update | PASS | Offline shell and offline recommendation worked after prior online use; this is not the same as NF-07 old-cache upgrade. |
| NF-07 Update จาก cache รุ่นก่อนหน้าไป `kinaraidee-beta-v13` |  | Still unverified; do not infer from normal v13 PWA use. |

## Live-group focused regression — Android #1

- Pre-fix session reached 2/2 votes but final-result button returned home; this was the defect fixed by PR #42.
- Later same-device/session evidence recorded in Issue #5 shows **group 2/2 final result + repeated reroll + handoff to normal result** working.
- This closes the narrow observed Android #1 interaction regression only. It does **not** prove Pages SHA trace, other Android models, or iPhone behavior.

## สถานะที่ใช้
- `PASS` = ทดสอบจริงและผ่านในขอบเขตที่บันทึก
- `FAIL` = ทดสอบจริงและไม่ผ่าน
- `N/A` = อุปกรณ์/browser ไม่รองรับกรณีนั้นจริง
- เว้นว่าง = ยังไม่ได้ทดสอบ / หลักฐานไม่พอ

## กฎการปล่อย Beta รอบถัดไป
- Android Chrome อย่างน้อย 3 รุ่นต้องผ่าน core flow — ตอนนี้มีหลักฐาน Android เพียง 1 รุ่น/เครื่อง
- iPhone Safari อย่างน้อย 2 รุ่นต้องผ่าน core flow — ยังไม่มีหลักฐาน
- New Flow NF-01–NF-10 ต้องมีผลทดสอบตาม platform ที่เกี่ยวข้อง
- NF-07 ต้องตรวจ upgrade จาก cache รุ่นก่อนหน้าไป `kinaraidee-beta-v13` บนอุปกรณ์จริงอย่างน้อยหนึ่งเครื่อง
- NF-09 ต้องตรวจ accessibility/semantics บน platform ที่เกี่ยวข้อง; ยังไม่ถือว่าผ่านจาก visual screenshot
- ต้องมี GitHub Pages deployment + Live Smoke evidence ที่ trace ไปยัง deployed SHA ของ release ปัจจุบัน
- ต้องยืนยัน deployed SHA ว่าตรงกับ runtime candidate หรือเป็น runtime-equivalent descendant
- Blocker/Critical ต้องเป็น 0 ก่อนเพิ่ม traffic
- ทุก FAIL ต้องมี defect/Issue หรือบันทึกเหตุผลที่ตามแก้ได้

ห้ามกรอก PASS จากการคาดเดา, CI/static review เพียงอย่างเดียว, หรือผลของอุปกรณ์คนละเครื่อง
