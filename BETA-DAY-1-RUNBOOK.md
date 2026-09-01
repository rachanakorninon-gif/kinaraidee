# กินอะไรดี — Public Beta Day 1 Runbook

Runbook นี้ใช้ในวันเริ่มทดสอบจริง **หลัง recruitment gate ใน Issue #3 เปิดแล้วเท่านั้น** ระหว่างที่ Issue #3 ยังระบุ `RECRUITMENT GATE NOT OPEN YET` ให้ถือไฟล์นี้เป็นเอกสารเตรียมพร้อม ห้ามส่งลิงก์ให้ tester cohort หรือใช้ checklist ในไฟล์นี้เป็นหลักฐานว่า Public Beta เปิดแล้ว

ใช้ Runbook นี้เพื่อไม่ให้ข้าม Gate สำคัญหรือกรอกผลจากการคาดเดา

## 1. ก่อนส่งลิงก์ให้ผู้ทดสอบ
- [ ] เปิด Beta URL จากมือถือจริง
- [ ] หน้าแรกโหลดสำเร็จ
- [ ] ปุ่ม **“🎲 ไม่รู้เลย — เลือกให้ฉันทันที”** มองเห็นและกดได้
- [ ] ได้ recommendation โดยไม่มี error
- [ ] ลองกดซ้ำเร็ว ๆ แล้วไม่มี recommendation ซ้อนผิดปกติ
- [ ] “ร้านใกล้คุณ” เปิดได้
- [ ] Google Maps fallback เปิดได้เมื่อไม่มี partner ที่ตรง
- [ ] Feedback flow เปิดได้
- [ ] Partner application เปิดได้

## 2. Mobile sanity check
### Android Chrome
- [ ] Core flow ใช้งานได้
- [ ] Location allow/deny ไม่ทำให้แอปค้าง
- [ ] PWA install/open from icon ถ้าอุปกรณ์รองรับ
- [ ] สลับแอปแล้วกลับมา ปุ่ม Surprise ไม่ค้าง

### iPhone Safari
- [ ] Core flow ใช้งานได้
- [ ] Location allow/deny ไม่ทำให้แอปค้าง
- [ ] Add to Home Screen guidance แสดงเมื่อเหมาะสม
- [ ] กด “เข้าใจแล้ว” แล้วข้อความไม่เด้งซ้ำทันที

### iPadOS (เมื่อมีอุปกรณ์)
- [ ] ตรวจกรณี Safari รายงาน User Agent แบบ Mac
- [ ] Install guidance ยังทำงานถูกต้อง

## 3. QA Gate
ใช้ผลจริงจาก:
- `BETA-TEST-CASES.md` — TC-01–TC-15
- `BETA-NEW-FLOW-TESTS.md` — NF-01–NF-10
- `BETA-DEVICE-MATRIX.md`
- `BETA-RUN-LOG.md`

ห้ามติ๊ก PASS ใน Runbook นี้แทนการทดสอบ Test Case จริง

## 4. เมื่อพบ Bug
1. หยุดขยายผู้ทดสอบถ้าเป็น Blocker/Critical
2. บันทึกอุปกรณ์, OS, Browser, ขั้นตอน, Expected, Actual
3. แนบ Screenshot/Video ถ้ามี
4. เปิด defect ที่ติดตามได้
5. แก้แล้วต้อง retest บนอุปกรณ์จริง

Severity:
- Blocker — flow หลักไปต่อไม่ได้
- Critical — ฟีเจอร์หลักเสีย/ข้อมูลสำคัญผิด
- Major — ใช้ต่อได้แต่มีผลกระทบชัดเจน
- Minor — UI/ข้อความ/ความลื่นไหล

## 5. ส่งให้ผู้ทดสอบกลุ่มแรก — หลัง recruitment gate เปิดแล้วเท่านั้น
ส่ง:
- Beta URL
- `BETA-QUICK-START.md`
- `BETA-TESTER-GUIDE.md` เมื่อผู้ทดสอบต้องการรายละเอียด

เริ่มกลุ่มเล็กก่อน และอย่าเพิ่ม traffic ถ้ายังมี Blocker/Critical

## 6. สิ่งที่ต้องเก็บจากผู้ทดสอบ
ใช้ `BETA-FEEDBACK-TEMPLATE.md` และข้อมูลจริงในระบบ โดยเน้น:
- ปุ่ม “ไม่รู้เลย” ช่วยตัดสินใจจริงหรือไม่
- recommendation เข้าใจง่าย/น่ากินหรือไม่
- จุดที่ผู้ใช้สับสน
- ผู้ใช้ไปต่อหาร้านหรือไม่
- จะกลับมาใช้ในมื้อถัดไปหรือไม่
- ปัญหา PWA/recovery/mobile

## 7. สิ้นวันแรก
- [ ] รวม Bug และ Feedback ที่เกิดจริง
- [ ] ตรวจ Blocker/Critical
- [ ] อัปเดต `BETA-RUN-LOG.md`
- [ ] อัปเดต `BETA-DEVICE-MATRIX.md`
- [ ] จัดกลุ่ม Feedback ซ้ำ
- [ ] ตัดสินใจ: เดินหน้ากลุ่มถัดไป / Fix First

## กฎสำคัญ
- ห้ามสร้างจำนวนผู้ใช้, PASS rate, conversion หรือรายได้สมมติ
- ห้ามถือว่า static review เท่ากับ real-device test
- ก่อนรับเงินจริงต้องผ่าน Commercial/Privacy/Security/Payment Gate แยกต่างหาก
