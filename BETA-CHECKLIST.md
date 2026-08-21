# กินอะไรดี — Beta Launch Checklist

## พร้อมแล้ว
- [x] Flow เลือกเมนูหลัก
- [x] ปุ่ม “ไม่รู้เลย”
- [x] ประวัติและเมนูโปรด
- [x] โหมดกลุ่ม
- [x] ร้านใกล้คุณ + Google Maps fallback
- [x] Supabase demand tracking
- [x] Privacy + Feedback + Partner application
- [x] PWA manifest + install helper + offline shell
- [x] GitHub Pages deploy workflow
- [x] Static QA workflow
- [x] Live smoke test workflow
- [x] robots.txt + sitemap.xml
- [x] 404 recovery page

## ต้องตรวจด้วยผู้ใช้จริงก่อน Production
- [ ] ทดสอบบน Android Chrome อย่างน้อย 3 รุ่น
- [ ] ทดสอบบน iPhone Safari อย่างน้อย 2 รุ่น
- [ ] ทดสอบติดตั้ง PWA และเปิดจากไอคอน
- [ ] ทดสอบ geolocation อนุญาต/ปฏิเสธ
- [ ] ทดสอบ Google Maps fallback
- [ ] ทดสอบ feedback form จริง
- [ ] ทดสอบ partner application form จริง
- [ ] เก็บ feedback จากผู้ใช้จริงอย่างน้อย 20 คน
- [ ] ปิด defect ระดับ blocker/critical ทั้งหมด

## ก่อนเปิดรับเงินจริง
- [ ] เลือกแพ็กเกจ Premium และราคา
- [ ] เชื่อม payment provider
- [ ] เตรียมข้อกำหนดการใช้บริการ Production
- [ ] ตรวจ Privacy Policy ฉบับ Production
- [ ] กำหนดเงื่อนไขร้านพาร์ตเนอร์และค่าคอมมิชชัน
- [ ] เตรียมบัญชีรับเงิน/ภาษี/เอกสารธุรกิจที่เกี่ยวข้อง

## เกณฑ์ Go/No-Go
เปิด Public Beta ได้เมื่อ flow หลัก, ร้านใกล้คุณ, feedback และ PWA ผ่านการทดสอบมือถือจริงโดยไม่มี blocker/critical defect.

เปิด Production เชิงพาณิชย์เมื่อ payment, เอกสารกฎหมาย, partner terms และ monitoring พร้อมครบ.
