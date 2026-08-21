# กินอะไรดี — Beta Device Matrix

ใช้ตารางนี้บันทึกผลทดสอบจริงรายอุปกรณ์ โดยอ้างอิง `BETA-TEST-CASES.md`

## Android Chrome

| Device | Android | Chrome | TC-01 | TC-02 | TC-03 | TC-08 | TC-09 | TC-10 | TC-13 | TC-14 | Notes |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Android #1 |  |  |  |  |  |  |  |  |  |  |  |
| Android #2 |  |  |  |  |  |  |  |  |  |  |  |
| Android #3 |  |  |  |  |  |  |  |  |  |  |  |

## iPhone Safari

| Device | iOS | Safari | TC-01 | TC-02 | TC-03 | TC-08 | TC-09 | TC-10 | TC-13 | TC-14 | Notes |
|---|---|---|---|---|---|---|---|---|---|---|---|
| iPhone #1 |  |  |  |  |  |  |  |  |  |  |  |
| iPhone #2 |  |  |  |  |  |  |  |  |  |  |  |

## Shared functional cases

ให้ทดสอบอย่างน้อยหนึ่งอุปกรณ์ต่อแพลตฟอร์ม:

- TC-04 เลือกใหม่/reroll
- TC-05 กินอันนี้ / ประวัติ
- TC-06 เมนูโปรด
- TC-07 แชร์
- TC-11 Feedback
- TC-12 Partner application
- TC-15 404 recovery

## สถานะที่ใช้
- `PASS` = ทดสอบจริงและผ่าน
- `FAIL` = ทดสอบจริงและไม่ผ่าน
- `N/A` = อุปกรณ์/browser ไม่รองรับกรณีนั้นจริง
- เว้นว่าง = ยังไม่ได้ทดสอบ

## กฎการปล่อย Beta รอบถัดไป
- Android Chrome อย่างน้อย 3 รุ่นต้องผ่าน core flow
- iPhone Safari อย่างน้อย 2 รุ่นต้องผ่าน core flow
- Blocker/Critical ต้องเป็น 0 ก่อนเพิ่ม traffic
- ทุก FAIL ต้องมี defect/Issue หรือบันทึกเหตุผลที่ตามแก้ได้

ห้ามกรอก PASS จากการคาดเดาหรือจากผลของอุปกรณ์คนละเครื่อง
