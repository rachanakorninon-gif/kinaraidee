# กินอะไรดี — Beta Run Log

ใช้ไฟล์นี้บันทึกรอบทดสอบจริงทีละอุปกรณ์ โดยอ้างอิง `BETA-TEST-CASES.md`, `BETA-NEW-FLOW-TESTS.md` และ `BETA-DEVICE-MATRIX.md`

## Release trace ที่ต้องบันทึกทุก run
- Current browser runtime candidate: `6fadf04fdf647680b60df2ada9cb43f4659816dd` (PR #42 merged; live-group final-result bridge fix)
- Current `main` descendant at evidence-sync start: `ef1cdee9e5dd60677a544e36be02bb7d003ae6a6` (PR #53 merged; deployment diagnostic/workflow only)
- Expected Service Worker cache: `kinaraidee-beta-v13`
- PR #53 head `f3c6d6f7d905b39e99b92ae181b3175de5761ad1` passed 8 PR checks: Security Hygiene `32589443121`, Release Metadata Regression `32589443150`, Release Consistency `32589443112`, Group Result Regression `32589443111`, History Sync Regression `32589443118`, Beta integrity `32589443151`, Credential Scanner Regression `32589443114`, Beta QA `32589443133` — all SUCCESS.
- PR #53 adds public `deployment-check.html` and Pages/Live Smoke probe wiring. PR CI does **not** prove a Pages deployment or Live Smoke success.
- GitHub Pages deployed SHA / Pages run / Live Smoke run: **not yet independently verified**.
- Historical Partner privacy runtime: `0624d7e4928e75d617137db0dba22825e7ba9f5a` (PR #28); current Android TC-12 evidence independently confirms the privacy acknowledgement fields on the backend.

## วิธีใช้
1. สร้างหัวข้อใหม่ต่อหนึ่งอุปกรณ์/Browser
2. กรอกข้อมูลอุปกรณ์จริงและ release/deployment trace
3. รันทดสอบ TC-01 ถึง TC-15 และ NF-01 ถึง NF-10 เท่าที่อุปกรณ์รองรับ
4. บันทึก PASS / FAIL / N/A เท่านั้นเมื่อมีหลักฐานจริง
5. ทุก FAIL ต้องสร้าง Bug Issue หรือบันทึกรายละเอียด defect พร้อมหลักฐานถ้ามี
6. ห้ามกรอกผลจากการคาดเดา หรือยก CI/static review เป็นผล real-device

---

## Run — Android device #1 / Chrome / installed PWA

### Release / deployment evidence
- App runtime candidate: `6fadf04fdf647680b60df2ada9cb43f4659816dd` (PR #42)
- Runtime-equivalent repository descendant used during latest session: source lineage through PR #53 / `ef1cdee9e5dd60677a544e36be02bb7d003ae6a6`
- Deployed SHA: not independently verified
- GitHub Pages run URL / ID: not independently verified
- Live Smoke run URL / ID: not independently verified
- Public URL: `https://rachanakorninon-gif.github.io/kinaraidee/`
- Expected SW/cache: `kinaraidee-beta-v13`
- Runtime diff vs PR #42: later reviewed changes are deployment diagnostics, QA/workflows, docs, or backend source/evidence; no known core browser runtime behavior change after PR #42.

### Device
- วันที่/เวลา: 2026-08-22 to 2026-08-23 ICT
- ผู้ทดสอบ: user-assisted real-device session
- Device model: not captured
- OS / version: Android; exact version not captured
- Browser / version: Chrome; exact version not captured
- Installed PWA: Yes
- Service Worker / cache generation ที่สังเกตได้: v13 expected by source; offline shell behavior observed. Exact cache-storage inspection not captured on device.
- Network: Mobile/online + airplane-mode/offline + recovery back online
- Screenshot / video evidence: screenshots supplied in chat; consolidated observations recorded in GitHub Issue #5

### Core Results
| Test Case | Result | Notes / Issue |
|---|---|---|
| TC-01 เปิดแอป | PASS | Home/app shell rendered and remained usable in browser/PWA session. |
| TC-02 ไม่รู้เลย | PASS | Surprise one-tap produced menu results without crash/blank state. |
| TC-03 เลือกเงื่อนไข | PASS | Guided flow validation + result preservation observed on same device. |
| TC-04 เลือกใหม่ | PASS | Repeated reroll completed; final result UI healthy. Intermediate tap count not independently visible in final screenshot. |
| TC-05 กินอันนี้ / ประวัติ | PASS | History/stat persistence observed, including signed-in/logout-login follow-up. |
| TC-06 เมนูโปรด | PASS | Favorite persisted after focused PR #41 race-condition retest. |
| TC-07 แชร์ | PASS | Share/invite flow exercised during live-group flow. |
| TC-08 Location อนุญาต |  | Exact allow-permission evidence not separated clearly enough in the current record; leave unverified rather than infer from coordinate use. |
| TC-09 Location ปฏิเสธ | PASS | Denied site location still continued to understandable Google Maps fallback; no crash/blank page. |
| TC-10 Google Maps fallback | PASS | No-partner flow opened Maps/search and later online recovery returned to nearby flow successfully. |
| TC-11 Feedback | PASS | UI success observed; Supabase row independently confirmed during session. |
| TC-12 Partner application | PASS | Required/privacy validation observed; consent submission succeeded. Supabase independently confirmed `privacy_notice_version='2026-08-21'` and non-null `privacy_acknowledged_at`. |
| TC-13 PWA | PASS | Installed from Chrome; home-screen icon launched standalone; close/reopen worked. |
| TC-14 Offline shell | PASS | Airplane-mode cold start reopened app shell and offline menu recommendation still worked. |
| TC-15 404 recovery | PASS | Deliberately nonexistent Pages path recovered to usable Kinaraidee home instead of blank/dead 404. |

### New Flow Results
| Test Case | Result | Notes / Issue |
|---|---|---|
| NF-01 Surprise one-tap | PASS | Real result produced immediately on Android. |
| NF-02 Double-tap protection | PASS* | Observed behavior only: first tap navigated immediately, so second/third rapid taps could not be delivered; no duplicate/result-stack symptom observed. This is not an implementation-level proof. |
| NF-03 Start new surprise round | PASS | Surprise/result flow repeated successfully on same device. |
| NF-04 Android PWA update |  | Normal current-version use/install observed, but no isolated update-from-prior-build evidence. |
| NF-05 iPhone/iPad install guidance | N/A | Android run. |
| NF-06 Offline after update | PASS | Offline shell + offline recommendation worked after prior online use; does not substitute for NF-07 old-cache upgrade. |
| NF-07 Upgrade from older cache |  | Still unverified; requires actual pre-v13 cache/device path. |
| NF-08 Recovery after interruption | PASS | Result state survived background/resume + lock/unlock; same result remained visible. |
| NF-09 Accessibility state |  | Visual rendering alone is insufficient; assistive semantics/state still unverified. |
| NF-10 Online recovery | PASS | After airplane mode was disabled, nearby online flow resumed without app restart. |

### Live-group focused regression
- Earlier Android session reached 2/2 votes but tapping `🎉 ดูผลโหวตกลุ่ม` returned home; this was the PR #42 defect.
- Later evidence on the same Android device/session records **group 2/2 final result + repeated reroll + handoff to normal result** working.
- Record this as the narrow Android #1 final-result regression PASS only. It does not establish Pages deployed-SHA trace or multi-device/iPhone coverage.

### Defects / retest history
- Issue #38 `Invalid Date` after cloud sync: fixed and same-device retest recorded PASS.
- Issue #40 favorite loss after lock/resume: fixed and same-device retest recorded PASS.
- Pre-fix live-group final-result failure: fixed by PR #42 and later same-device final-result interaction observed working.
- No new Blocker/Critical defect is created by this run log update.

### Final status for this device
- Core flow: **PARTIAL PASS** — substantial real-device coverage exists, but TC-08 exact allow-location evidence remains unverified and device-wide beta gate is not closed.
- New flow: **PARTIAL PASS** — NF-07 old-cache upgrade and NF-09 accessibility remain unverified; NF-04 update-specific evidence is also incomplete.
- Device-matrix contribution: **Android 1/3**. iPhone remains **0/2**.

---

## Gate สำหรับปิด Real-device Beta Round
- Android Chrome ผ่านอย่างน้อย 3 รุ่น — ปัจจุบันมีหลักฐาน 1 เครื่อง/รุ่นเท่านั้น
- iPhone Safari ผ่านอย่างน้อย 2 รุ่น — ปัจจุบันยังไม่มีหลักฐาน
- ไม่มี Blocker/Critical ที่ยังเปิดอยู่
- Core flow TC-01, TC-02, TC-03, TC-08/09 และ TC-10 ต้องผ่านบนอุปกรณ์จริงที่เกี่ยวข้อง; TC-08 ยังต้องเก็บหลักฐานที่แยกชัดเจน
- TC-11 Feedback และ TC-12 Partner application มี Android #1 evidence แล้ว แต่ยังไม่ควร generalize ไปยัง platform/device อื่น
- New flow NF-01, NF-02, NF-03 และ recovery ที่เกี่ยวข้องมี Android #1 evidence แล้วในขอบเขตที่ระบุ
- NF-07 ต้องครอบคลุมการ update จาก cache รุ่นก่อนหน้าไป `kinaraidee-beta-v13`
- NF-09 ต้องตรวจ state/semantics ของ Surprise และ public forms ด้วย assistive technology/platform semantics ที่เหมาะสม
- PWA/Offline/Install guidance ให้ตัดสินตาม platform support และบันทึก N/A เมื่อไม่รองรับจริง
- ต้องมี Pages deployment + Live Smoke evidence ที่ trace กลับไปยัง deployed SHA
- ต้องบันทึก deployed SHA และยืนยันความสัมพันธ์กับ runtime candidate / runtime-equivalent descendant
- ห้ามปิดรอบจาก static review หรือ PR CI อย่างเดียว
