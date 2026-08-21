# กินอะไรดี — Monetization Plan

เอกสารนี้ใช้กำหนดทิศทางรายได้หลัง Public Beta โดยยังไม่เปิดรับเงินจริงจนกว่ารายการที่เกี่ยวข้องใน `RELEASE-CHECKLIST.md` จะพร้อม

หลักสำคัญ: ตัวเลขราคาด้านล่างเป็น **สมมติฐานสำหรับทดสอบ** ไม่ใช่ราคาที่พิสูจน์แล้ว และห้ามบันทึกรายได้/conversion สมมติเป็นผลจริง

## เสาหลักรายได้

### 1) Premium Subscription
สมมติฐานราคาที่นำไปทดสอบกับผู้ใช้จริงได้:
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

**หลักฐานก่อนเลือกราคา Production**
- จำนวนผู้ทดสอบแต่ละราคา
- จำนวนผู้สนใจ/เริ่ม checkout/ชำระสำเร็จ (เมื่อ payment พร้อม)
- เหตุผลที่ไม่สมัคร
- retention ของกลุ่มที่สนใจ Premium
- feature ที่ผู้ใช้ระบุว่ายอมจ่ายจริง

### 2) Restaurant Partner Plans
สมมติฐานแพ็กเกจสำหรับสัมภาษณ์/ทดลองกับร้านจริง:
- Starter 299 บาท/เดือน
- Growth 599 บาท/เดือน
- Pro 999 บาท/เดือน

สิ่งที่ร้านอาจได้รับ:
- แสดงในผลร้านที่ตรงกับเมนู
- Dashboard จำนวนการแสดง/คลิก
- เมนูและ keyword targeting
- โปรโมชันหรือ sponsored placement ที่มีป้ายกำกับชัดเจน

**หลักฐานก่อนขายแพ็กเกจจริง**
- ร้านจริงยืนยันปัญหา/คุณค่าที่ต้องการ
- จำนวน impression/click ที่วัดได้จริง
- ราคา/รูปแบบที่ร้านยอมรับ
- ข้อตกลงและช่องทางติดต่อที่ตรวจสอบได้
- วิธีหยุด/ยกเลิกแพ็กเกจและแก้ dispute

### 3) Commission / Conversion Revenue
รองรับโมเดล:
- per-click
- fixed amount per confirmed order
- percent of confirmed order value

ทุก conversion ต้องมีวิธีตรวจสอบก่อนเรียกเก็บ/จ่ายเงินจริง และมีสถานะ pending / confirmed / cancelled

**Gate ก่อนคิด commission จริง**
- click/conversion มี ID หรือหลักฐาน trace ได้
- ป้องกัน duplicate/fraud ขั้นพื้นฐาน
- ร้านและเจ้าของแอปเห็นตรงกันว่าอะไรนับเป็น confirmed conversion
- cancellation/refund ไม่ถูกนับเป็นรายได้ถ้าเงื่อนไขไม่อนุญาต
- reconciliation ทำซ้ำได้จากข้อมูลต้นทาง

### 4) Sponsored Placement
อนุญาตเฉพาะเมื่อ:
- ระบุว่าเป็น “โฆษณา” หรือ “ผู้สนับสนุน” ชัดเจน
- ไม่ทำให้ผู้ใช้เข้าใจผิดว่าเป็นผลแนะนำออร์แกนิก
- ยังรักษาความเกี่ยวข้องกับเมนู/ตำแหน่ง/งบของผู้ใช้
- มีวิธีแยก sponsored impression/click จาก organic result ใน metrics

### 5) Advertising
ไม่ใช่รายได้หลักในช่วงเริ่มต้น ควรพิจารณาหลังมี active users เพียงพอ และห้ามทำให้ flow ตัดสินใจช้าหรือรก

ก่อนเพิ่มโฆษณา ให้เปรียบเทียบ core-flow completion, เวลาไปถึง recommendation และ repeat usage ก่อน/หลัง เพื่อดูว่ารายได้โฆษณาแลกกับ UX มากเกินไปหรือไม่

### 6) Aggregate Insights for Partners
ระยะถัดไปอาจขาย dashboard ข้อมูลรวม เช่น demand ตามช่วงเวลา/พื้นที่/ประเภทอาหาร โดย:
- ไม่ขายข้อมูลส่วนบุคคล
- ไม่เปิดเผยพิกัดรายบุคคล
- ใช้ aggregated/anonymized data
- กำหนด threshold ป้องกันกลุ่มข้อมูลที่เล็กจนย้อนระบุตัวบุคคลได้
- ต้องสอดคล้อง Privacy Policy/PDPA และ Production review

## KPI ที่ควรวัดใน Public Beta
ใช้ `BETA-METRICS.md`, `BETA-DAILY-LOG.md` และ `BETA-RESULTS-TEMPLATE.md` เป็นแหล่งสรุป โดยใช้เฉพาะข้อมูลจริง

- จำนวนผู้ใช้/session ที่เริ่ม flow เลือกเมนู
- completion rate ถึงผลลัพธ์
- อัตรากด “กินอันนี้” และ reroll
- อัตรากดร้านใกล้คุณ
- partner result shown / click-through rate
- repeat usage 7 วัน / 30 วัน เมื่อระบบวัดได้จริง
- feedback score และเหตุผลเชิงคุณภาพ
- Premium interest / checkout / paid conversion ตาม maturity ของระบบ
- partner conversion/commission ที่ verify ได้

## Revenue Experiment Record
สร้าง record แยกสำหรับทุกการทดลอง เพื่อไม่ปน “สมมติฐาน” กับ “ผลจริง”

- Experiment ID:
- วันที่เริ่ม/จบ:
- กลุ่มผู้ใช้/ร้าน:
- สมมติฐาน:
- ราคา/ข้อเสนอ:
- จำนวน exposure จริง:
- จำนวน interested/click/checkout/paid/confirmed จริง:
- ต้นทุนหรือส่วนลด:
- Feedback/เหตุผลปฏิเสธ:
- ผลลัพธ์:
- Decision: Continue / Change / Stop
- หลักฐาน/Issue/Report ที่อ้างอิง:

## ลำดับเปิดรายได้
1. Public Beta ฟรีและวัด retention/demand
2. ร้านพาร์ตเนอร์จริงชุดแรก + track click/conversion
3. ทดลอง Partner Plan แบบกลุ่มเล็กโดยบันทึก Revenue Experiment Record
4. เปิด Premium price validation แบบ cohort/A-B เมื่อ payment/privacy gate พร้อม
5. Sponsored placement หลังมี traffic เพียงพอและแยก label/metrics ได้
6. Advertising/aggregate insights เมื่อฐานผู้ใช้โตและผ่าน Privacy review

## Go / No-Go ต่อโมเดลรายได้
แต่ละโมเดลต้องผ่าน gate ของตัวเอง ไม่จำเป็นต้องเปิดพร้อมกันทั้งหมด

- **Premium GO:** Payment + entitlement + cancellation/refund + Privacy/Security พร้อม และมีหลักฐาน demand จริง
- **Partner Plan GO:** มีร้านจริงยอมรับข้อเสนอ + tracking/reporting ที่ตรวจสอบได้ + agreement พร้อม
- **Commission GO:** conversion verification + reconciliation + dispute/cancel rules พร้อม
- **Sponsored GO:** labeling + relevance + metric separation + Privacy review พร้อม
- **Insights GO:** aggregation/anonymization + privacy/legal review พร้อม

หาก gate ของโมเดลใดยังไม่ผ่าน ให้คงโมเดลนั้นในสถานะ validation และห้ามนับรายได้ที่ยังไม่เกิดจริง
