# กินอะไรดี — Public Beta 30-Day Plan

แผนนี้ใช้สำหรับเดิน Public Beta ด้วยข้อมูลผู้ใช้จริง ห้ามกรอกผล PASS, metrics, conversion หรือรายได้จากการคาดเดา

## เป้าหมาย 30 วัน
- ยืนยันว่า core flow “ไม่รู้จะกินอะไร → ได้คำแนะนำ → ตัดสินใจ/หาร้านต่อ” มีคุณค่ากับผู้ใช้จริง
- ปิด Blocker/Critical จากอุปกรณ์จริง
- ตรวจ Android Chrome, iPhone Safari และ iPadOS เมื่อมีอุปกรณ์
- ตรวจ Surprise flow, recovery, PWA และ Service Worker update
- เริ่มเห็น demand ของเมนู/พื้นที่จากข้อมูลจริง
- รวบรวมหลักฐานสำหรับตัดสินใจเรื่อง restaurant partner และ Premium

## วัน 1–3 — Readiness Gate
- ตรวจ `BETA-CHECKLIST.md`
- เตรียม tester ด้วย `BETA-TESTER-RECRUITMENT.md`
- ส่ง `BETA-QUICK-START.md` / `BETA-TESTER-GUIDE.md`
- ทดสอบ TC-01–TC-15 และ NF-01–NF-10 บนอุปกรณ์จริงที่หาได้
- บันทึกทุกผลใน `BETA-DEVICE-MATRIX.md` และ `BETA-RUN-LOG.md`
- Blocker/Critical ต้องถูกเปิดเป็น defect และแก้ก่อนเพิ่ม traffic

## วัน 4–7 — Small Beta Cohort
- เริ่มผู้ทดสอบกลุ่มเล็กก่อน
- เก็บ Feedback ด้วย `BETA-FEEDBACK-TEMPLATE.md`
- เน้นปุ่ม “ไม่รู้เลย — เลือกให้ฉันทันที” และดูว่าผู้ใช้เข้าใจโดยไม่ต้องสอนหรือไม่
- ตรวจ double tap, busy state, recovery และ mobile usability
- ตรวจ Location, ร้านใกล้คุณ, partner result และ Google Maps fallback
- อย่าเพิ่มผู้ทดสอบจำนวนมากถ้ายังมีปัญหา core flow

## วัน 8–14 — Fix & Learn
- จัดกลุ่ม Feedback ซ้ำ: UX / Recommendation / Restaurant / PWA / Bug
- แก้ปัญหาที่กระทบการตัดสินใจหรือทำให้ flow ขาดก่อน
- retest defect บนอุปกรณ์จริง
- ตรวจ PWA update จาก cache รุ่นเก่ามารุ่นปัจจุบันโดยไม่บังคับล้างข้อมูล
- ตรวจ iPhone/iPad Add to Home Screen guidance และ suppression หลัง “เข้าใจแล้ว”
- ทบทวน `BETA-METRICS.md` โดยใช้เฉพาะข้อมูลที่ระบบวัดได้จริง

## วัน 15–21 — Controlled Expansion
ขยายผู้ทดสอบเมื่อ:
- Blocker = 0
- Critical = 0
- core flow ผ่านบน Android Chrome และ iPhone Safari จริง
- FAIL ที่เหลือมี owner/แผนแก้

จากนั้น:
- เพิ่มความหลากหลายของรุ่นมือถือ/Browser
- ดู repeat usage และ recommendation sessions
- ดูเมนู/พื้นที่ที่มี restaurant demand สูง
- เริ่มคุยกับร้านจริงในพื้นที่ที่มี demand โดยยังไม่สร้าง conversion สมมติ
- เก็บ Premium interest จากคำตอบผู้ใช้จริง

## วัน 22–27 — Monetization Validation
- ใช้ `MONETIZATION-PLAN.md` เป็นกรอบ
- ประเมิน restaurant partner model จากความสนใจจริง: per-click / percent / fixed-order / package
- ประเมิน Premium feature ที่ผู้ใช้บอกว่ายอมจ่าย
- ถ้ามีการทดลองราคา ให้บันทึกราคาและจำนวนผู้ตอบจริง
- ห้ามเปิดรับเงินจริงจน payment/privacy/security/commercial gate พร้อม

## วัน 28–30 — Beta Review
- กรอก `BETA-RESULTS-TEMPLATE.md`
- สรุป TC/NF จากผลจริง
- สรุป Blocker/Critical/Major/Minor
- สรุปสิ่งที่ผู้ใช้ชอบ จุดหลุด และ feature requests
- สรุป restaurant demand / partner click / verified conversion ถ้ามี
- ตัดสินใจ Go / Extend Beta / Fix First

## Gate สำหรับ Commercial Next Step
ก่อนเดินหน้าเชิงพาณิชย์:
- Blocker = 0 และ Critical = 0
- real-device core flow ผ่านตาม `RELEASE-CHECKLIST.md`
- privacy/security/RLS/secret handling ผ่านการตรวจอีกครั้ง
- มี merchant/payment provider จริงถ้าจะรับค่าสมาชิก
- มีข้อตกลงร้านจริงถ้าจะคิด commission
- Production policy/contact information พร้อม

## เอกสารอ้างอิงหลัก
`BETA-CHECKLIST.md`, `BETA-TESTER-GUIDE.md`, `BETA-TESTER-RECRUITMENT.md`, `BETA-QUICK-START.md`, `BETA-FEEDBACK-TEMPLATE.md`, `BETA-TEST-CASES.md`, `BETA-NEW-FLOW-TESTS.md`, `BETA-DEVICE-MATRIX.md`, `BETA-RUN-LOG.md`, `BETA-METRICS.md`, `BETA-RESULTS-TEMPLATE.md`, `MONETIZATION-PLAN.md`, `RELEASE-CHECKLIST.md`, `SECURITY.md`
