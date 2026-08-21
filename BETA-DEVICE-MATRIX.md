# กินอะไรดี — Beta Device Matrix

ใช้ตารางนี้บันทึกผลทดสอบจริงรายอุปกรณ์ โดยอ้างอิง `BETA-TEST-CASES.md` และ `BETA-NEW-FLOW-TESTS.md`

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
- TC-11 Feedback
- TC-12 Partner application
- TC-15 404 recovery
- NF-03 กลับหน้าแรกแล้วสุ่มใหม่
- NF-06 Offline after update
- NF-07 Update จาก cache รุ่นก่อนหน้า

## สถานะที่ใช้
- `PASS` = ทดสอบจริงและผ่าน
- `FAIL` = ทดสอบจริงและไม่ผ่าน
- `N/A` = อุปกรณ์/browser ไม่รองรับกรณีนั้นจริง
- เว้นว่าง = ยังไม่ได้ทดสอบ

## กฎการปล่อย Beta รอบถัดไป
- Android Chrome อย่างน้อย 3 รุ่นต้องผ่าน core flow
- iPhone Safari อย่างน้อย 2 รุ่นต้องผ่าน core flow
- New Flow NF-01–NF-10 ต้องมีผลทดสอบตาม platform ที่เกี่ยวข้อง
- Service Worker/PWA update ต้องตรวจจาก cache รุ่นก่อนหน้าอย่างน้อยหนึ่งอุปกรณ์จริง
- Blocker/Critical ต้องเป็น 0 ก่อนเพิ่ม traffic
- ทุก FAIL ต้องมี defect/Issue หรือบันทึกเหตุผลที่ตามแก้ได้

ห้ามกรอก PASS จากการคาดเดาหรือจากผลของอุปกรณ์คนละเครื่อง
