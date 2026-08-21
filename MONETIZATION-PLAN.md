# กินอะไรดี — Monetization Plan

เอกสารนี้ใช้กำหนดทิศทางรายได้หลัง Public Beta โดยยังไม่เปิดรับเงินจริงจนกว่ารายการใน `RELEASE-CHECKLIST.md` จะพร้อม

## เสาหลักรายได้

### 1) Premium Subscription
แนวทางทดสอบราคาเริ่มต้น:
- 49 บาท/เดือน
- 59 บาท/เดือน
- 79 บาท/เดือน

ฟีเจอร์ที่เหมาะกับ Premium:
- ไม่มีโฆษณา
- ระบบเรียนรู้ความชอบส่วนบุคคลขั้นสูง
- ประวัติและสถิติแบบละเอียด
- โหมดกลุ่ม/ครอบครัวขั้นสูง
- ตัวกรองเพิ่มเติมและคำแนะนำเฉพาะบุคคล

หลักการ: Core flow “ช่วยฉันเลือก / ไม่รู้เลย” ต้องยังใช้งานได้ฟรี เพื่อไม่ทำลายคุณค่าหลักของแอป

### 2) Restaurant Partner Plans
แนวทางแพ็กเกจทดลอง:
- Starter 299 บาท/เดือน
- Growth 599 บาท/เดือน
- Pro 999 บาท/เดือน

สิ่งที่ร้านอาจได้รับ:
- แสดงในผลร้านที่ตรงกับเมนู
- Dashboard จำนวนการแสดง/คลิก
- เมนูและ keyword targeting
- โปรโมชันหรือ sponsored placement ที่มีป้ายกำกับชัดเจน

### 3) Commission / Conversion Revenue
รองรับโมเดล:
- per-click
- fixed amount per confirmed order
- percent of confirmed order value

ทุก conversion ต้องมีวิธีตรวจสอบก่อนเรียกเก็บ/จ่ายเงินจริง และมีสถานะ pending / confirmed / cancelled

### 4) Sponsored Placement
อนุญาตเฉพาะเมื่อ:
- ระบุว่าเป็น “โฆษณา” หรือ “ผู้สนับสนุน” ชัดเจน
- ไม่ทำให้ผู้ใช้เข้าใจผิดว่าเป็นผลแนะนำออร์แกนิก
- ยังรักษาความเกี่ยวข้องกับเมนู/ตำแหน่ง/งบของผู้ใช้

### 5) Advertising
ไม่ใช่รายได้หลักในช่วงเริ่มต้น ควรพิจารณาหลังมี active users เพียงพอ และห้ามทำให้ flow ตัดสินใจช้าหรือรก

### 6) Aggregate Insights for Partners
ระยะถัดไปอาจขาย dashboard ข้อมูลรวม เช่น demand ตามช่วงเวลา/พื้นที่/ประเภทอาหาร โดย:
- ไม่ขายข้อมูลส่วนบุคคล
- ไม่เปิดเผยพิกัดรายบุคคล
- ใช้ aggregated/anonymized data
- ต้องสอดคล้อง Privacy Policy/PDPA

## KPI ที่ควรวัดใน Public Beta
- จำนวนผู้ใช้ที่เริ่ม flow เลือกเมนู
- completion rate ถึงผลลัพธ์
- อัตรากด “กินอันนี้”
- อัตรากดร้านใกล้คุณ
- partner click-through rate
- repeat usage 7 วัน / 30 วัน
- feedback score
- conversion จาก Free → Premium เมื่อเริ่มทดลองราคา

## ลำดับเปิดรายได้ที่แนะนำ
1. Public Beta ฟรีและวัด retention/demand
2. ร้านพาร์ตเนอร์จริงชุดแรก + track click/conversion
3. ทดลอง Partner Plan แบบกลุ่มเล็ก
4. เปิด Premium แบบทดลองราคา A/B หรือ cohort
5. Sponsored placement หลังมี traffic เพียงพอ
6. Advertising/aggregate insights เมื่อฐานผู้ใช้โต

## หลัก Go/No-Go
ยังไม่เปิดรับเงินจริงจนกว่า Payment, Partner Terms, Privacy/Legal และ Security ที่เกี่ยวข้องจะผ่านเกณฑ์ใน `RELEASE-CHECKLIST.md`
