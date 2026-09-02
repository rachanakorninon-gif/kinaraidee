# กินอะไรดี — Beta Results Review

ใช้เอกสารนี้สรุปผล **หลัง recruitment gate ใน Issue #3 เปิดและเริ่มมีผู้ทดสอบจริงแล้วเท่านั้น** ระหว่างที่ gate ยังปิด ให้ถือไฟล์นี้เป็น template เตรียมพร้อม ไม่ใช่ผล Beta และไม่ใช่หลักฐานว่ามี tester/session/conversion เกิดขึ้นแล้ว

กรอกเฉพาะข้อมูลที่วัดได้จริง ห้ามเติมตัวเลขสมมติ และห้ามใช้ `0`, `PASS` หรือ `N/A` แทนข้อมูลที่ยังไม่ได้เก็บ เว้นแต่มีหลักฐานจริงรองรับสถานะนั้น

## รอบการทดสอบ
- วันที่เริ่ม:
- วันที่สรุป:
- จำนวนผู้ทดสอบจริง:
- Android:
- iPhone:
- iPad:
- Desktop/อื่น ๆ:
- Browser/PWA mix:

## Core Flow
- จำนวน session:
- กด “ไม่รู้เลย — เลือกให้ฉันทันที”:
- ได้ recommendation สำเร็จ:
- กด “กินอันนี้”:
- เลือกใหม่/reroll:
- เปิดหาร้านใกล้ตัว:
- partner result shown:
- partner clicks:
- Google Maps fallback:
- feedback submitted:

## Surprise / Recovery / Accessibility
- double-tap protection ผ่านจริงกี่อุปกรณ์:
- พบปุ่มค้าง “กำลังเลือกให้…” หรือไม่:
- recovery หลังสลับแอป/ล็อกหน้าจอ:
- recovery หลังอินเทอร์เน็ตกลับมา:
- accessibility/aria state ที่ตรวจจริง:
- ปัญหาที่พบใน Surprise flow:

## PWA / Install
- Android/PWA install ที่ทดสอบจริง:
- เปิดจากไอคอน/standalone สำเร็จ:
- iPhone Add to Home Screen guidance:
- iPadOS Safari / Mac-like User Agent:
- ปุ่ม “เข้าใจแล้ว” ทำงานถูกต้อง:
- คำแนะนำไม่เด้งซ้ำในช่วงที่กำหนด:
- update จาก cache รุ่นเก่ามา Service Worker รุ่นปัจจุบัน:
- offline app shell:

## Real-device QA Gate
สรุปจาก `BETA-DEVICE-MATRIX.md` และ `BETA-RUN-LOG.md` เท่านั้น
- Android Chrome ที่ทดสอบจริง:
- iPhone Safari ที่ทดสอบจริง:
- iPadOS ที่ทดสอบจริง:
- TC-01–TC-15 PASS/FAIL/N/A:
- NF-01–NF-10 PASS/FAIL/N/A:
- Test Case ที่ยังไม่ได้ทดสอบ:

## คุณภาพ
- Blocker:
- Critical:
- Major:
- Minor:
- ปัญหาที่เกิดซ้ำมากที่สุด:
- อุปกรณ์/Browser ที่มีปัญหา:
- Defect ที่ต้องปิดก่อนเพิ่ม traffic:

## Feedback ผู้ใช้
อ้างอิงข้อมูลจาก `BETA-FEEDBACK-TEMPLATE.md` หรือ Feedback จริงในระบบ
- สิ่งที่ผู้ใช้ชอบมากที่สุด:
- จุดที่สับสน:
- ปุ่ม “ไม่รู้เลย” ช่วยตัดสินใจหรือไม่:
- เมนูที่อยากให้เพิ่ม:
- ฟีเจอร์ที่ขอเพิ่ม:
- ความอยากกลับมาใช้ในมื้อถัดไป:
- สิ่งที่ผู้ใช้ขอให้แก้มากที่สุด:

## Restaurant Demand
- เมนู demand สูง:
- พื้นที่ demand สูง:
- พื้นที่ที่ยังไม่มี partner:
- partner result shown:
- partner clicks:
- conversion ที่ตรวจสอบได้:

## Premium Validation
- ฟีเจอร์ที่ผู้ใช้ยอมจ่าย:
- ราคา/ช่วงราคาที่ทดสอบ:
- จำนวนผู้แสดงความสนใจ:
- ข้อกังวลก่อนสมัคร:

## การตัดสินใจรอบนี้
- [ ] เดินหน้ารับผู้ทดสอบเพิ่ม
- [ ] แก้ Core Flow ก่อนเพิ่ม traffic
- [ ] แก้ PWA/recovery ก่อนเพิ่ม traffic
- [ ] เริ่มหา restaurant partners จริง
- [ ] เริ่มทดลอง Premium
- [ ] พร้อมเข้าสู่ Commercial Release Checklist

## Go / No-Go Notes
สรุปเหตุผลโดยอ้างอิง `BETA-METRICS.md`, `BETA-CHECKLIST.md`, `BETA-DEVICE-MATRIX.md`, `BETA-RUN-LOG.md`, `BETA-FEEDBACK-TEMPLATE.md` และ `RELEASE-CHECKLIST.md`

ก่อนเปิดรับเงินจริง ต้องมี release-scoped defect evidence ยืนยัน `Blocker = 0` และ `Critical = 0`; การไม่มี defect report หรือมีเพียง CI/static/synthetic evidence ไม่เพียงพอให้ถือว่า gate นี้ผ่าน และห้ามถือว่า real-device gate ผ่านจาก static review หรือข้อมูลสมมติ
