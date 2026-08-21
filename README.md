# กินอะไรดี (Kinaraidee)

เว็บแอปช่วยตัดสินใจว่าแต่ละมื้อควรกินอะไร โดยเน้นประสบการณ์ที่ง่ายสำหรับคนที่คิดไม่ออกว่า “กินอะไรดี” และต่อยอดจากคำแนะนำเมนูไปสู่การค้นหาร้านใกล้ตัว

## สถานะปัจจุบัน — Beta MVP

แกนหลักสำหรับ Beta ทำงานแล้ว: เลือกเมนู → ดูร้านใกล้ตัว → ใช้ตำแหน่ง (เมื่อผู้ใช้อนุญาต) → ค้นหาร้านพาร์ตเนอร์ → fallback ไป Google Maps → เก็บ demand ของเมนูเพื่อวิเคราะห์ว่าควรเพิ่มร้านพาร์ตเนอร์ใด

## ฟีเจอร์ผู้ใช้

- ปุ่ม “ไม่รู้เลย” สำหรับให้ระบบช่วยตัดสินใจ
- เลือกมื้อ จำนวนคน งบประมาณ และประเภทอาหาร
- แนะนำเมนูตามเงื่อนไขและเลือกใหม่ได้
- ชอบเมนู / กินอันนี้ / ประวัติและสถิติบนอุปกรณ์
- แชร์เมนู
- ค้นหาร้านใกล้ตัวด้วยตำแหน่ง
- แสดงร้านพาร์ตเนอร์ที่ตรงกับเมนูและเรียงตามระยะทางเมื่อมีพิกัด
- fallback ไป Google Maps เมื่อยังไม่มีร้านพาร์ตเนอร์
- ป้องกันการบันทึก demand ซ้ำจากการกดติดกันในช่วงสั้น
- ลดความละเอียดพิกัดที่จัดเก็บเพื่อวิเคราะห์ demand
- มีหน้านโยบายความเป็นส่วนตัวสำหรับช่วง Beta

## ระบบสมาชิกและข้อมูลกลาง

- Supabase Authentication / โปรไฟล์สมาชิก
- ประวัติอาหารของสมาชิกพร้อม RLS แยกข้อมูลตามผู้ใช้
- Password recovery
- Beta feedback

## ระบบร้านพาร์ตเนอร์และรายได้

- แบบฟอร์มสมัครร้านพาร์ตเนอร์
- Owner review / approve / reject / contacted
- จัดการร้าน active / inactive
- menu keywords และ destination URL
- ติดตาม partner click
- รองรับ commission แบบ per-click / percent / fixed-order
- บันทึก conversion และสถานะ pending / confirmed / cancelled
- Owner dashboard / reports / conversion management
- Audit log การแก้ไขร้านพาร์ตเนอร์

## Backend / Security

- Supabase PostgreSQL + Row Level Security
- Edge Functions สำหรับ group API และ partner API
- `restaurant_requests` เปิดเฉพาะ INSERT ที่เป็น `source=app` และ `status=pending`; ไม่มี public SELECT ของพิกัดผู้ใช้
- Publishable key ใช้ฝั่ง browser; secret/service role อยู่ฝั่ง backend เท่านั้น

## Deployment

GitHub Pages deploy จาก branch `main` อัตโนมัติผ่าน GitHub Actions

## สิ่งที่ต้องมีจากภายนอกก่อน Production เชิงพาณิชย์

ส่วนเหล่านี้ไม่ควรสร้างข้อมูลสมมติแทนของจริง:

1. ร้านพาร์ตเนอร์จริงและความยินยอม/ข้อตกลงค่าคอมมิชชัน
2. Merchant / payment provider สำหรับสมาชิก Premium
3. ข้อกำหนดทางกฎหมาย/นโยบายฉบับ Production และช่องทางติดต่อเจ้าของบริการ
4. บัญชี App Store / Google Play หากจะเผยแพร่เป็น native app

จนกว่าจะมีรายการเหล่านี้ ระบบเหมาะสำหรับ Beta เพื่อทดสอบผู้ใช้จริง เก็บ feedback และวัด demand ของเมนู/ร้านก่อนเปิดเชิงพาณิชย์
