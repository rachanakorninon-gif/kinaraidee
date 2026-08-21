# Kinaraidee — Commercial Release Checklist

ใช้เอกสารนี้หลัง Public Beta ผ่าน เพื่อเตรียมเปิดใช้งานเชิงพาณิชย์อย่างเป็นระบบ

## Product
- [ ] Core flow ไม่มี Blocker/Critical
- [ ] ปุ่ม “ไม่รู้เลย” และ recommendation flow ผ่าน real-device test
- [ ] ร้านใกล้ตัว / Maps fallback ผ่าน real-device test
- [ ] PWA install และ update flow ผ่านการทดสอบ
- [ ] Feedback flow ใช้งานจริงได้

## Accounts & Payments
- [ ] เลือก payment provider / merchant account
- [ ] กำหนดราคา Premium จริง
- [ ] ทดสอบ subscribe / renew / cancel / payment failure
- [ ] กำหนด entitlement ระหว่าง Free และ Premium
- [ ] มีหลักฐาน transaction และ reconciliation ที่ตรวจสอบได้

## Restaurant Partners
- [ ] มีร้านพาร์ตเนอร์จริงชุดแรก
- [ ] ร้านยอมรับเงื่อนไขค่าคอมมิชชัน
- [ ] ตรวจ destination URL ของร้าน
- [ ] conversion/commission มีวิธี verify ก่อนจ่าย/เรียกเก็บเงินจริง
- [ ] มีขั้นตอน dispute / cancel / refund ที่ชัดเจน

## Privacy & Legal
- [ ] Privacy Policy ฉบับ Production
- [ ] Terms of Service
- [ ] ช่องทางติดต่อเจ้าของบริการจริง
- [ ] ระบุวัตถุประสงค์การใช้ location / analytics / partner tracking
- [ ] กำหนด retention/deletion ของข้อมูล
- [ ] ตรวจข้อกำหนด PDPA ที่เกี่ยวข้องก่อนรับข้อมูลเชิงพาณิชย์

## Security
- [ ] ตรวจ Supabase RLS ทุกตาราง Production
- [ ] ไม่มี service-role/secret อยู่ใน browser หรือ repository
- [ ] rotate secret ที่เคยใช้ใน test หากจำเป็น
- [ ] ทดสอบ auth/password recovery
- [ ] ทดสอบ owner/admin authorization
- [ ] ตรวจ SECURITY.md และปิด Critical findings

## Operations
- [ ] Production monitoring / error reporting
- [ ] Backup/recovery plan สำหรับข้อมูลสำคัญ
- [ ] Owner dashboard ใช้งานได้จริง
- [ ] ขั้นตอนรับและตอบ bug/support
- [ ] Release rollback procedure

## Store Distribution (ถ้าต้องการ native store)
- [ ] Google Play developer account
- [ ] Apple Developer account
- [ ] Store listing / screenshots / icon / description
- [ ] Privacy declarations ของ Store
- [ ] ผ่าน review ของแต่ละ Store

## Go / No-Go
เปิดรับเงินจริงเมื่อรายการที่เกี่ยวข้องกับรูปแบบธุรกิจที่เลือกผ่านครบ และไม่มี Blocker/Critical ด้าน Product, Payment, Privacy หรือ Security
