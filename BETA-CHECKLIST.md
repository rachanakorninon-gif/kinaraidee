# กินอะไรดี — Beta Launch Checklist

## พร้อมแล้ว
- [x] Flow เลือกเมนูหลัก
- [x] ปุ่ม “ไม่รู้เลย — เลือกให้ฉันทันที”
- [x] ป้องกัน double tap และมี busy/recovery state
- [x] ประวัติและเมนูโปรด
- [x] โหมดกลุ่ม
- [x] ร้านใกล้คุณ + Google Maps fallback
- [x] Supabase demand tracking
- [x] Privacy + Feedback + Partner application
- [x] PWA manifest + install helper + offline shell
- [x] iPhone/iPad install guidance พร้อม suppression หลัง “เข้าใจแล้ว”
- [x] รองรับ iPadOS ที่รายงาน User Agent แบบ Mac
- [x] Service Worker cache รุ่นปัจจุบัน: `kinaraidee-beta-v10`
- [x] GitHub Pages deploy workflow
- [x] Static QA workflow
- [x] Live smoke test workflow
- [x] robots.txt + sitemap.xml
- [x] 404 recovery page
- [x] `BETA-TEST-CASES.md` TC-01–TC-15
- [x] `BETA-NEW-FLOW-TESTS.md` NF-01–NF-10
- [x] `BETA-DEVICE-MATRIX.md` และ `BETA-RUN-LOG.md`

## ต้องตรวจบนอุปกรณ์จริงก่อนเพิ่ม traffic
- [ ] Android Chrome อย่างน้อย 3 รุ่น
- [ ] iPhone Safari อย่างน้อย 2 รุ่น
- [ ] iPadOS Safari อย่างน้อย 1 รุ่น ถ้ามีอุปกรณ์รองรับ
- [ ] TC-01–TC-15 ตามกรณีที่อุปกรณ์รองรับ
- [ ] NF-01–NF-10 ตามกรณีที่อุปกรณ์รองรับ
- [ ] ปุ่ม Surprise ไม่ค้างหลังสลับแอป/ล็อกหน้าจอ/เน็ตหลุด
- [ ] online recovery ทำงานโดยไม่ต้อง reload
- [ ] accessibility state ของปุ่ม (`aria-label`, `aria-busy`, disabled) ถูกต้อง
- [ ] upgrade จาก cache รุ่นเก่าไป v10 โดยไม่ต้องล้างข้อมูลเอง
- [ ] ติดตั้ง PWA และเปิดจากไอคอนบนแพลตฟอร์มที่รองรับ
- [ ] geolocation อนุญาต/ปฏิเสธ
- [ ] Google Maps fallback
- [ ] feedback form จริง
- [ ] partner application form จริง
- [ ] เก็บ feedback จากผู้ใช้จริงอย่างน้อย 20 คน
- [ ] ทุก FAIL มี defect ที่ตามแก้ได้
- [ ] Blocker = 0
- [ ] Critical = 0

## ก่อนเปิดรับเงินจริง
- [ ] เลือกแพ็กเกจ Premium และราคาโดยอ้างอิงข้อมูล Beta จริง
- [ ] เชื่อม payment provider / merchant account
- [ ] เตรียมข้อกำหนดการใช้บริการ Production
- [ ] ตรวจ Privacy Policy ฉบับ Production
- [ ] กำหนดเงื่อนไขร้านพาร์ตเนอร์และค่าคอมมิชชัน
- [ ] เตรียมบัญชีรับเงิน/ภาษี/เอกสารธุรกิจที่เกี่ยวข้อง
- [ ] ตรวจ security/RLS/secret handling รอบ Production
- [ ] เตรียม monitoring และ incident response

## เกณฑ์ Go / No-Go
**เพิ่มผู้ทดสอบ/traffic:** ทำได้เมื่อ core flow ผ่านบนอุปกรณ์จริงที่กำหนด, PWA/update flow ที่เกี่ยวข้องผ่าน และไม่มี Blocker/Critical ที่ยังเปิดอยู่

**Production เชิงพาณิชย์:** ทำได้เมื่อ payment, เอกสารกฎหมาย, partner terms, security และ monitoring พร้อมครบ และมีหลักฐานจาก Beta ว่าผู้ใช้ได้รับคุณค่าจริง

ห้ามทำเครื่องหมาย PASS จาก static review หรือจากการคาดเดา ต้องอ้างอิงผลทดสอบจริงใน `BETA-RUN-LOG.md` / `BETA-DEVICE-MATRIX.md`
