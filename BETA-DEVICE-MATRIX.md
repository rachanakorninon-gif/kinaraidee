# กินอะไรดี — Beta Device Matrix

ใช้ตารางนี้บันทึกผลทดสอบจริงรายอุปกรณ์ โดยอ้างอิง `BETA-TEST-CASES.md` และ `BETA-NEW-FLOW-TESTS.md`

## Release trace สำหรับรอบนี้
- Current runtime release: `0624d7e4928e75d617137db0dba22825e7ba9f5a` (PR #28 merged)
- Expected Service Worker cache: `kinaraidee-beta-v13`
- Pre-merge CI ของ head `e4bf276702be06baaf1c5abd41097f8122b4793b`: Release Consistency `32557712768` SUCCESS; Beta integrity `32557712762` SUCCESS; Beta QA `32557712761` SUCCESS
- Historical v13 renderer baseline: `83f8f36373f819fcaf3d5dde7f7ae830a1e4aea1`
- Historical v12 runtime baseline: `f08d069ab2e8a5c00f63cb3f16bf6ab58c2c1c3f` / `kinaraidee-beta-v12`
- Earlier baseline: `bb7b979421275995a6fee12f84b118d0c942037a` / `kinaraidee-beta-v11`
- Deployed SHA:
- GitHub Pages run URL / ID:
- Live Smoke run URL / ID:
- Runtime diff vs app release: None / Present / Not yet verified

> v13 renderer baseline `83f8f363...` เปลี่ยน partner/fallback card renderer จาก data-driven `innerHTML` เป็น DOM nodes/`textContent` และ bump Service Worker cache generation ดังนั้นผล v12 ห้ามถูกยกมาเป็นผล v13 โดยอัตโนมัติสำหรับ TC-10/nearby partner rendering, NF-07 และ PWA/update flow ที่ได้รับผลกระทบ

> runtime `0624d7e4...` เพิ่ม privacy acknowledgement evidence ใน Partner application โดยไม่เปลี่ยน cache generation ดังนั้น TC-12 ต้อง retest บน candidate นี้และตรวจว่า submission ใหม่ส่ง `privacy_notice_version` และ `privacy_acknowledged_at` ตาม design

> หาก `main` หรือ deployed SHA เป็น evidence/workflow-only descendant ให้บันทึก SHA จริงและยืนยันว่าไม่มี runtime app file เปลี่ยนจาก `0624d7e4...` ก่อนใช้ผลจาก matrix นี้เป็น release evidence

## Android Chrome

| Device | Android | Chrome | TC-01 | TC-02 | TC-03 | TC-08 | TC-09 | TC-10 | TC-13 | TC-14 | NF-01 | NF-02 | NF-04 | NF-08 | NF-09 | NF-10 | SW/Cache | Notes |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Android #1 |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
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

## Shared functional cases

ให้ทดสอบอย่างน้อยหนึ่งอุปกรณ์ต่อแพลตฟอร์ม:

- TC-04 เลือกใหม่/reroll
- TC-05 กินอันนี้ / ประวัติ
- TC-06 เมนูโปรด
- TC-07 แชร์
- TC-10 Google Maps / nearby partner flow — ต้องมี evidence บน v13 payload
- TC-11 Feedback
- TC-12 Partner application — ต้อง retest บน `0624d7e4...` และตรวจ privacy acknowledgement evidence
- TC-15 404 recovery
- NF-03 กลับหน้าแรกแล้วสุ่มใหม่
- NF-06 Offline after update
- NF-07 Update จาก cache รุ่นก่อนหน้าไป `kinaraidee-beta-v13`

## สถานะที่ใช้
- `PASS` = ทดสอบจริงและผ่าน
- `FAIL` = ทดสอบจริงและไม่ผ่าน
- `N/A` = อุปกรณ์/browser ไม่รองรับกรณีนั้นจริง
- เว้นว่าง = ยังไม่ได้ทดสอบ

## กฎการปล่อย Beta รอบถัดไป
- Android Chrome อย่างน้อย 3 รุ่นต้องผ่าน core flow
- iPhone Safari อย่างน้อย 2 รุ่นต้องผ่าน core flow
- New Flow NF-01–NF-10 ต้องมีผลทดสอบตาม platform ที่เกี่ยวข้อง
- Service Worker/PWA update ต้องตรวจจาก cache รุ่นก่อนหน้าไป v13 อย่างน้อยหนึ่งอุปกรณ์จริง
- ต้องมี Pages/Live Smoke evidence ที่ trace ไปยัง deployed SHA ของ release ปัจจุบัน
- ต้องยืนยัน deployed SHA ว่าตรงกับ app release baseline หรือเป็น non-runtime descendant ที่ payload เท่ากัน
- Blocker/Critical ต้องเป็น 0 ก่อนเพิ่ม traffic
- ทุก FAIL ต้องมี defect/Issue หรือบันทึกเหตุผลที่ตามแก้ได้

ห้ามกรอก PASS จากการคาดเดาหรือจากผลของอุปกรณ์คนละเครื่อง