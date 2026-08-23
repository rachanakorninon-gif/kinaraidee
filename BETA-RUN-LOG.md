# กินอะไรดี — Beta Run Log

ใช้ไฟล์นี้บันทึกรอบทดสอบจริงทีละอุปกรณ์ โดยอ้างอิง `BETA-TEST-CASES.md`, `BETA-NEW-FLOW-TESTS.md` และ `BETA-DEVICE-MATRIX.md`

## Release trace ที่ต้องบันทึกทุก run
- Current browser/PWA runtime candidate: `35fe4b7fbf201882ea2ebad8ffca2b8da668999b` (PR #79; deployed and trace-verified).
- Expected Service Worker cache: `kinaraidee-beta-v13`.
- Verified browser/PWA deployment evidence: Pages `32621529715` = SUCCESS, Public Pages Trace Check `32621547307` = SUCCESS, corresponding Live Smoke `32621549478` = SUCCESS for runtime SHA `35fe4b7fbf201882ea2ebad8ffca2b8da668999b`.
- Current Group API source candidate: PR #93 / `fefc29322ac13f7066038a663bfeb7091d218b8f`, deployed as Supabase ACTIVE version 6 with source/deployment parity. Canonical rejection-only live probe `32632951668` = SUCCESS.
- Group API v6 automated/deployment evidence is not a substitute for a new real-device Group run.
- Historical Partner privacy runtime: `0624d7e4928e75d617137db0dba22825e7ba9f5a` (PR #28); Android #1 TC-12 evidence independently confirms privacy acknowledgement fields on the backend.
- `CURRENT-RELEASE.md` is the canonical release-state reference when historical run notes conflict with current repository/deployment state.

## วิธีใช้
1. สร้างหัวข้อใหม่ต่อหนึ่งอุปกรณ์/Browser
2. กรอกข้อมูลอุปกรณ์จริงและ release/deployment trace ที่ตรวจได้สำหรับ run นั้น
3. รันทดสอบ TC-01 ถึง TC-15 และ NF-01 ถึง NF-10 เท่าที่อุปกรณ์รองรับ
4. บันทึก PASS / FAIL / INCONCLUSIVE / N/A ตามหลักฐานจริง
5. ทุก FAIL ต้องสร้าง Bug Issue หรือบันทึกรายละเอียด defect พร้อมหลักฐานถ้ามี
6. ห้ามกรอกผลจากการคาดเดา หรือยก CI/static/synthetic review เป็นผล real-device

---

## Run — Android device #1 / Chrome / installed PWA

### Release / deployment evidence
- Historical Android evidence below was collected across the same physical device/session family while the browser/PWA runtime evolved through the documented beta lineage.
- Current browser/PWA candidate for further retest is PR #79 / `35fe4b7fbf201882ea2ebad8ffca2b8da668999b`, and its Pages/public-metadata/Live-Smoke trace is independently verified.
- Do **not** retroactively label every historical Android PASS as a PR #79 device PASS if that exact behavior was not re-exercised after PR #79.
- Current Group API v6 deployment/rejection evidence likewise does not retroactively create a post-v6 Group device PASS.
- Public URL: `https://rachanakorninon-gif.github.io/kinaraidee/`
- Expected current SW/cache: `kinaraidee-beta-v13`

### Device
- วันที่/เวลา: 2026-08-22 to 2026-08-23 ICT
- ผู้ทดสอบ: user-assisted real-device session
- Device model: not captured
- OS / version: Android; exact version not captured
- Browser / version: Chrome; exact version not captured
- Installed PWA: Yes
- Service Worker / cache generation ที่สังเกตได้: v13 expected by source/current deployment; offline shell behavior observed. Exact cache-storage inspection on device was not captured.
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
| TC-06 เมนูโปรด | PASS | Favorite persisted after focused history race-condition retest. |
| TC-07 แชร์ | PASS | Share/invite flow exercised during live-group flow. |
| TC-08 Location อนุญาต |  | Exact allow-permission evidence was not separated clearly enough in the current record; leave unverified rather than infer from coordinate use. |
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
| NF-07 Upgrade from older cache |  | Still unverified; requires actual pre-v13 cache/device path. Synthetic CI coverage does not count as device PASS. |
| NF-08 Recovery after interruption | PASS | Result state survived background/resume + lock/unlock; same result remained visible. |
| NF-09 Accessibility state | INCONCLUSIVE | Earlier valid TalkBack evidence confirmed accessible name + button role. Historical pre-fix busy announcement was not heard and was tracked in Issue #57. Persistent live-region fix is now deployed in the current runtime, but the latest full retest cannot be scored because the available TalkBack activation environment became unreliable outside Kinaraidee as well. Keep Issue #57 open; do not mark current implementation PASS or new FAIL from that attempt. |
| NF-10 Online recovery | PASS | After airplane mode was disabled, nearby online flow resumed without app restart. |

### Live-group focused regression
- Earlier Android session reached 2/2 votes but tapping `🎉 ดูผลโหวตกลุ่ม` returned home; this was the PR #42 defect.
- Later evidence on the same Android device/session records **group 2/2 final result + repeated reroll + handoff to normal result** working.
- The successful historical interaction remains a narrow Android #1 Group regression PASS for that tested session.
- Current Group API v6 has source/deployment parity plus scoped rejection-only live evidence; these automated checks do **not** establish a new post-v6 Group device PASS.

### Defects / retest history
- Issue #38 `Invalid Date` after cloud sync: fixed and same-device retest recorded PASS.
- Issue #40 favorite loss after lock/resume: fixed and same-device retest recorded PASS.
- Pre-fix live-group final-result failure: fixed by PR #42 and later same-device final-result interaction observed working.
- Issue #57 Surprise busy announcement: historical pre-fix FAIL exists; persistent fix is implemented/deployed, but latest full assistive-tech acceptance remains INCONCLUSIVE because of test-environment activation reliability. Issue stays open.
- No device PASS is inferred from static/source/deployment checks alone.

### Final status for this device
- Core flow: **PARTIAL PASS** — substantial real-device coverage exists, but TC-08 exact allow-location evidence remains unverified and the full device gate is not closed.
- New flow: **PARTIAL / INCONCLUSIVE** — NF-07 old-cache upgrade remains unverified; NF-09 full assistive-tech acceptance is inconclusive; NF-04 update-specific evidence is incomplete.
- Device-matrix contribution: evidence exists for **one Android device/session only**. Exact model/version was not captured. iPhone remains **0/2**.

---

## Gate สำหรับปิด Real-device Beta Round
- Android Chrome อย่างน้อย 3 device models ผ่าน core flow — ปัจจุบันมีหลักฐานเพียงหนึ่ง Android device/session และ exact model/version ไม่ถูกบันทึก
- iPhone Safari อย่างน้อย 2 device models ผ่าน core flow — ปัจจุบันยังไม่มีหลักฐาน
- ไม่มี Blocker/Critical ที่ยังเปิดอยู่ตาม Beta acceptance gate
- Core flow TC-01, TC-02, TC-03, TC-08/09 และ TC-10 ต้องผ่านบนอุปกรณ์จริงที่เกี่ยวข้อง; TC-08 exact allow-location evidence ยังต้องเก็บให้ชัด
- TC-11 Feedback และ TC-12 Partner application มี Android #1 evidence แล้ว แต่ห้าม generalize ไปยัง platform/device อื่น
- New flow NF-01, NF-02, NF-03 และ recovery ที่เกี่ยวข้องมี Android #1 evidence แล้วในขอบเขตที่ระบุ
- NF-07 ต้องครอบคลุม update จาก cache รุ่นก่อนหน้าไป `kinaraidee-beta-v13` บนอุปกรณ์จริง
- NF-09 ต้องผ่านด้วย TalkBack/VoiceOver environment ที่ทำงานได้จริง; accessible-name partial evidence และ deployed source contract ยังไม่เพียงพอสำหรับ full PASS
- PWA/Offline/Install guidance ให้ตัดสินตาม platform support และบันทึก N/A เมื่อไม่รองรับจริง
- Browser/PWA deployment trace สำหรับ PR #79 ผ่านแล้ว แต่ไม่แทน device/assistive-tech evidence
- ห้ามปิดรอบจาก static review, PR CI, synthetic monitoring หรือ backend rejection probe เพียงอย่างเดียว
