# กินอะไรดี — Beta Run Log

ใช้ไฟล์นี้บันทึกรอบทดสอบจริงทีละอุปกรณ์ โดยอ้างอิง `BETA-TEST-CASES.md` และ `BETA-DEVICE-MATRIX.md`

## วิธีใช้
1. สร้างหัวข้อใหม่ต่อหนึ่งอุปกรณ์/Browser
2. กรอกข้อมูลอุปกรณ์จริง
3. รันทดสอบ TC-01 ถึง TC-15 เท่าที่อุปกรณ์รองรับ
4. บันทึก PASS / FAIL / N/A เท่านั้น
5. ทุก FAIL ต้องสร้าง Bug Issue หรือบันทึกรายละเอียด defect พร้อมหลักฐานถ้ามี
6. ห้ามกรอกผลจากการคาดเดา

---

## Run Template

### Device
- วันที่/เวลา:
- ผู้ทดสอบ:
- Device model:
- OS / version:
- Browser / version:
- Network: Wi-Fi / Mobile / Offline test

### Results
| Test Case | Result | Notes / Issue |
|---|---|---|
| TC-01 เปิดแอป |  |  |
| TC-02 ไม่รู้เลย |  |  |
| TC-03 เลือกเงื่อนไข |  |  |
| TC-04 เลือกใหม่ |  |  |
| TC-05 กินอันนี้ / ประวัติ |  |  |
| TC-06 เมนูโปรด |  |  |
| TC-07 แชร์ |  |  |
| TC-08 Location อนุญาต |  |  |
| TC-09 Location ปฏิเสธ |  |  |
| TC-10 Google Maps fallback |  |  |
| TC-11 Feedback |  |  |
| TC-12 Partner application |  |  |
| TC-13 PWA |  |  |
| TC-14 Offline shell |  |  |
| TC-15 404 recovery |  |  |

### Defects found
- Blocker:
- Critical:
- Major:
- Minor:

### Final status for this device
- [ ] PASS core flow
- [ ] FAIL core flow
- [ ] Needs retest after fix

### Notes

---

## Gate สำหรับปิด Real-device Beta Round
- Android Chrome ผ่านอย่างน้อย 3 รุ่น
- iPhone Safari ผ่านอย่างน้อย 2 รุ่น
- ไม่มี Blocker/Critical ที่ยังเปิดอยู่
- Core flow TC-01, TC-02, TC-03, TC-08/09 และ TC-10 ผ่านบนอุปกรณ์จริงที่เกี่ยวข้อง
- PWA/Offline ให้ตัดสินตาม platform support และบันทึก N/A เมื่อไม่รองรับจริง
