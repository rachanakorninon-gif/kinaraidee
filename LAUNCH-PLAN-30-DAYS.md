# Kinaraidee — 30-Day Public Beta Launch Plan

เป้าหมาย: เปิด Public Beta แบบควบคุมความเสี่ยง เก็บข้อมูลจริง และเตรียมหลักฐานสำหรับการตัดสินใจเชิงพาณิชย์

## Week 1 — Real-device validation
- ทดสอบ Android Chrome อย่างน้อย 3 รุ่น
- ทดสอบ iPhone Safari อย่างน้อย 2 รุ่น
- ปิด Blocker/Critical ทั้งหมด โดยต้องมี release-scoped defect evidence รองรับค่าศูนย์จริง; การไม่มี defect report หรือมีเพียง CI/static/synthetic evidence ห้ามตีความว่าเป็น 0
- ยืนยัน PWA install / update flow
- ยืนยัน geolocation + Maps fallback
- ทดสอบ Feedback / Partner application จริง

## Week 2 — Small beta cohort
- เชิญผู้ใช้ชุดแรกแบบจำกัด
- เก็บ feedback เชิงคุณภาพ
- ตรวจ funnel จาก “ไม่รู้เลย” → recommendation → กินอันนี้/หาร้าน
- แก้ Major bugs ที่กระทบ conversion หรือความเข้าใจ

## Week 3 — Demand & partner validation
- วิเคราะห์เมนูและพื้นที่ที่ demand สูง
- หา candidate ร้านพาร์ตเนอร์ชุดแรกจากข้อมูลจริง
- ตรวจ partner click / Maps fallback rate
- ทดสอบ onboarding ร้านพาร์ตเนอร์แบบไม่รับเงินจริงก่อน

## Week 4 — Commercial readiness review
- สรุป retention / completion / repeat usage
- ตัดสิน feature Free vs Premium จากพฤติกรรมจริง
- เลือก payment provider ที่เหมาะสม
- ตรวจ Privacy / Terms / PDPA readiness
- ประเมิน Go/No-Go สำหรับการเปิดรายได้ชุดแรก

## Decision gates
### Gate A — Public Beta stable
ผ่านเมื่อ core flow ผ่านอุปกรณ์จริง และ Blocker = 0 / Critical = 0 มี release-scoped defect evidence รองรับจริง; การไม่มีรายงาน defect หรือ CI/static/synthetic-only evidence ไม่เพียงพอให้เปิด gate

### Gate B — Product value validated
ผ่านเมื่อมีหลักฐานว่าผู้ใช้กลับมาใช้และ core flow ช่วยให้ตัดสินใจอาหารได้จริง

### Gate C — Monetization ready
ผ่านเมื่อ Payment, Partner Terms, Privacy/Security และการตรวจ conversion พร้อมสำหรับเงินจริง

## สิ่งที่ไม่ควรเร่ง
- ไม่ควรเปิดโฆษณาหนักก่อน retention ดี
- ไม่ควรตั้งราคา Premium จากการเดาอย่างเดียว
- ไม่ควรรับเงินจริงจากร้านก่อนมีวิธี verify click/conversion
- ไม่ควร scale traffic จนกว่า Blocker = 0 / Critical = 0 จะมี release-scoped defect evidence รองรับจริง
