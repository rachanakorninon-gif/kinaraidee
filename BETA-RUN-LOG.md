# กินอะไรดี — Beta Run Log

ใช้ไฟล์นี้บันทึกรอบทดสอบจริงทีละอุปกรณ์ โดยอ้างอิง `BETA-TEST-CASES.md`, `BETA-NEW-FLOW-TESTS.md` และ `BETA-DEVICE-MATRIX.md`

## Release trace ที่ต้องบันทึกทุก run
- `CURRENT-RELEASE.md` และ `CURRENT-RUNTIME.md` เป็น canonical source สำหรับ browser/PWA runtime, deployed descendant และ Service Worker/cache marker ปัจจุบัน; ห้ามใช้ค่าจาก historical run ด้านล่างแทนสถานะปัจจุบัน
- ทุก run ใหม่ต้องบันทึก exact runtime/deployment trace ที่ตรวจได้ในเวลาทดสอบจริง โดยไม่คัดลอก SHA/cache จาก run เก่ามาเป็นผลของ run ใหม่
- Historical Android run ด้านล่างผูกกับ beta lineage เดิมซึ่งรวม PR #79 / `35fe4b7fbf201882ea2ebad8ffca2b8da668999b` และ `kinaraidee-beta-v13`; ข้อมูลนี้เป็นหลักฐานย้อนหลัง ไม่ใช่ current runtime declaration
- Current Group API source candidate และ Partner API deployment/security evidence ให้ยึดเอกสาร canonical ที่เกี่ยวข้อง; automated/deployment evidence ไม่แทน real-device Group/Partner interaction PASS
- Historical Partner privacy runtime `0624d7e4928e75d617137db0dba22825e7ba9f5a` (PR #28) และ Android #1 TC-12 evidence คงไว้เฉพาะขอบเขตที่บันทึกไว้เดิม

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
- The PR #79 / `35fe4b7fbf201882ea2ebad8ffca2b8da668999b` and `kinaraidee-beta-v13` references below describe the historical candidate/context used for this run family; they are not the current runtime/cache declaration.
- Do **not** retroactively label every historical Android PASS as a PR #79 device PASS if that exact behavior was not re-exercised after PR #79.
- Group API deployment/rejection evidence likewise does not retroactively create a post-deployment Group device PASS.
- Public URL: `https://rachanakorninon-gif.github.io/kinaraidee/`
- Historical expected SW/cache for this run family: `kinaraidee-beta-v13`

### Device
- วันที่/เวลา: 2026-08-22 to 2026-08-23 ICT
- ผู้ทดสอบ: user-assisted real-device session
- Device model: not captured
- OS / version: Android; exact version not captured
- Browser / version: Chrome; exact version not captured
- Installed PWA: Yes
- Service Worker / cache generation ที่สังเกตได้: v13 expected by source/deployment lineage for this historical run; offline shell behavior observed. Exact cache-storage inspection on device was not captured.
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
| NF-07 Upgrade from older cache |  | Still unverified for this historical run; requires an actual older-cache/device path. Synthetic CI coverage does not count as device PASS. |
| NF-08 Recovery after interruption | PASS | Result state survived background/resume + lock/unlock; same result remained visible. |
| NF-09 Accessibility state | INCONCLUSIVE | Earlier valid TalkBack evidence confirmed accessible name + button role. Historical pre-fix busy announcement was not heard and was tracked in Issue #57. Persistent live-region fix was deployed after this run, but the latest full Android TalkBack retest could not be scored because the available TalkBack activation environment became unreliable outside Kinaraidee as well. Preserve this historical Android result; later scoped iPhone/VoiceOver evidence is tracked canonically elsewhere and does not rewrite this Android run. |
| NF-10 Online recovery | PASS | After airplane mode was disabled, nearby online flow resumed without app restart. |

### Live-group focused regression
- Earlier Android session reached 2/2 votes but tapping `🎉 ดูผลโหวตกลุ่ม` returned home; this was the PR #42 defect.
- Later evidence on the same Android device/session records **group 2/2 final result + repeated reroll + handoff to normal result** working.
- The successful historical interaction remains a narrow Android #1 Group regression PASS for that tested session.
- Group API automated deployment/rejection evidence does **not** establish a newer Group device PASS.

### Defects / retest history
- Issue #38 `Invalid Date` after cloud sync: fixed and same-device retest recorded PASS.
- Issue #40 favorite loss after lock/resume: fixed and same-device retest recorded PASS.
- Pre-fix live-group final-result failure: fixed by PR #42 and later same-device final-result interaction observed working.
- Issue #57 Surprise busy announcement: preserve the historical Android INCONCLUSIVE result recorded above; later platform-specific evidence is tracked separately and must not be backfilled into this run.
- No device PASS is inferred from static/source/deployment checks alone.

### Final status for this device
- Core flow: **PARTIAL PASS** — substantial real-device coverage exists, but TC-08 exact allow-location evidence was unverified in this historical Android run and the full device gate was not closed by this run alone.
- New flow: **PARTIAL / INCONCLUSIVE** — NF-07 old-cache upgrade was unverified; Android NF-09 remained inconclusive; NF-04 update-specific evidence was incomplete.
- Device-matrix contribution: this run contributes evidence for **one Android device/session only**. Exact model/version was not captured. Do not use the historical iPhone coverage state from the time of this Android run as the current matrix; use `BETA-DEVICE-MATRIX.md` / `CURRENT-RELEASE.md` for current iPhone evidence.

---

## Gate สำหรับปิด Real-device Beta Round
- Android Chrome ต้องมีอย่างน้อย 3 qualifying device models และ iPhone Safari ต้องมีอย่างน้อย 2 qualifying device models ตาม canonical Beta/device-matrix policy; current coverage ให้ดู `BETA-DEVICE-MATRIX.md` / `CURRENT-RELEASE.md` แทนการ hard-code point-in-time count ใน historical run log
- `Blocker = 0` และ `Critical = 0` จะถือว่าผ่านได้เมื่อมี release-scoped defect evidence รองรับเท่านั้น; การไม่มี defect report หรือ CI/static/synthetic-only evidence ไม่ถือเป็นค่าศูนย์
- Core flow TC-01, TC-02, TC-03, TC-08/09 และ TC-10 ต้องผ่านบนอุปกรณ์จริงที่เกี่ยวข้อง; historical Android TC-08 ใน run นี้ไม่ใช่ current-platform PASS
- TC-11 Feedback และ TC-12 Partner application ใน run นี้เป็น historical Android #1 evidence เท่านั้น และห้าม generalize ไปยัง current runtime/platform/device อื่น
- New flow NF-01, NF-02, NF-03 และ recovery ที่เกี่ยวข้องใน run นี้เป็น evidence ตามขอบเขตที่บันทึกไว้ ไม่ใช่ blanket current-runtime PASS
- NF-07 ต้องครอบคลุมการ upgrade จาก cache รุ่นก่อนหน้าไปยัง **current canonical cache marker** ที่ระบุใน `CURRENT-RELEASE.md` บนอุปกรณ์จริง; historical `kinaraidee-beta-v13` ไม่ใช่ target ปัจจุบัน
- NF-09 ต้องตัดสินจาก qualifying assistive-tech evidence ของ platform/session ที่เกี่ยวข้อง; ผล historical Android ใน run นี้ไม่ถูก rewrite ด้วยผลจาก platform อื่น
- PWA/Offline/Install guidance ให้ตัดสินตาม platform support และบันทึก N/A เมื่อไม่รองรับจริง
- Browser/PWA deployment trace, PR CI, synthetic monitoring หรือ backend rejection probe ใช้เป็น deployment/security evidence ตามขอบเขตเท่านั้น และไม่แทน device/assistive-tech/form/Auth interaction evidence
- ห้ามปิดรอบจาก static review, PR CI, synthetic monitoring หรือ backend rejection probe เพียงอย่างเดียว
