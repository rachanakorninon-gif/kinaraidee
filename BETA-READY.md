# กินอะไรดี — Beta Readiness

สถานะปัจจุบัน: **TECHNICAL BETA BUILD AVAILABLE / PUBLIC BETA NOT COMPLETE**

เอกสารนี้สรุปสิ่งที่ตัวระบบมีอยู่แล้ว แต่ไม่ใช้แทน `CURRENT-RELEASE.md`, `BETA-CHECKLIST.md`, `BETA-DEVICE-MATRIX.md` หรือ `BETA-RUN-LOG.md` สำหรับการตัดสิน PASS/GO

## เส้นทางหลักที่มีอยู่ในตัวระบบ

- เลือกมื้อ จำนวนคน งบ และความชอบ
- โหมด “ไม่รู้เลย” ให้ระบบเลือกเมนู
- แสดงผลเมนู เลือกใหม่ ชอบ และบันทึกประวัติ
- ค้นหาร้านใกล้ตัวตามเมนู
- ขอสิทธิ์ตำแหน่งเมื่อผู้ใช้กดใช้งานเท่านั้น
- บันทึก demand ของเมนูไปยัง Supabase
- ค้นหาร้านพาร์ตเนอร์ และ fallback ไป Google Maps เมื่อยังไม่มีร้าน
- ติดตามการค้นหา/คลิกร้านสำหรับระบบพาร์ตเนอร์
- หน้า feedback สำหรับผู้ทดสอบ
- หน้า Privacy Policy สำหรับช่วง Beta
- PWA/offline/update/install flows ตาม platform support

รายการข้างต้นหมายถึง implementation มีอยู่ ไม่ได้หมายความว่าทุก flow ผ่าน real-device acceptance ครบทุก platform แล้ว

## หลักฐาน deployment ปัจจุบัน

- Browser/PWA runtime candidate ปัจจุบันมี GitHub Pages deployment trace และ corresponding automated Live Smoke ที่ยืนยันแล้วตาม `CURRENT-RELEASE.md`
- Automated/static/deployment evidence ไม่แทน real-device, assistive-technology หรือ commercial acceptance

## Gate ที่ยังต้องผ่านก่อนถือว่า Public Beta complete

- Android Chrome ให้ครบอย่างน้อย 3 device models ตามเกณฑ์ปัจจุบัน
- iPhone Safari ให้ครบอย่างน้อย 2 device models ตามเกณฑ์ปัจจุบัน; NF-05 มี PASS แบบ scoped แล้วเฉพาะ iPhone/Safari #1 และห้ามขยายผลเป็น iPadOS หรือ second-iPhone coverage
- NF-07 old-cache → current-cache upgrade บนอุปกรณ์จริง
- visible keyboard focus บน deployed pages ด้วย real keyboard/focus navigation
- Reduced Motion บน real platform ที่เปิด reduced-motion preference พร้อม device/OS/browser-or-PWA trace metadata ครบ
- current Auth signup/sign-in/reset interaction acceptance สำหรับ runtime ปัจจุบันตาม scope ที่เกี่ยวข้อง
- real Feedback/Partner submission interaction สำหรับ changed paths ที่ยังเปิดอยู่
- TC-01–TC-15 และ NF-01–NF-10 ตาม platform/device scope ที่เกี่ยวข้อง โดยคง scoped PASS เดิมไว้เฉพาะ session ที่มีหลักฐานจริง
- Blocker/Critical ต้องเป็น 0 ตาม acceptance scope

NF-09 มี **PASS แบบ scoped สำหรับ tested physical iPhone/VoiceOver session** ตาม `CURRENT-RELEASE.md`; Android TalkBack follow-up เดิมยังเป็น INCONCLUSIVE / TEST ENVIRONMENT และไม่ถูกสร้างเป็น Android PASS จากหลักฐาน iPhone

ห้ามกรอก PASS จาก CI, static review, source contract หรือผลจากอุปกรณ์คนละเครื่องแทนหลักฐานจริง

## ความปลอดภัยที่ตั้งไว้แล้วบางส่วน

- หน้าเว็บใช้เฉพาะ Supabase publishable key
- ไม่มี secret/service-role credential ถูกตั้งใจให้ฝังใน public browser runtime
- public table access ใช้ RLS/deny-by-default ตาม schema ที่เกี่ยวข้อง
- พิกัด demand ที่จัดเก็บลดความละเอียดก่อนบันทึก
- Group API มี source/deployment parity และ input/request hardening ที่บันทึกไว้ใน `CURRENT-RELEASE.md`

หัวข้อนี้ไม่เท่ากับ Production Security PASS

## Gate ก่อน Commercial / Production

- Public Beta technical/device/accessibility acceptance
- Supabase leaked-password protection gate
- `main` branch protection + required checks enforcement พร้อมหลักฐานว่า failing required check block merge ได้จริง
- Group API retention/deletion policy, abuse controls, application-event observability และ monitoring baseline
- Terms of Service / Privacy Policy / controller-contact / retention decisions ฉบับ Production
- owner/on-call, monitoring, backup/recovery และ rollback/restore drill evidence
- payment provider / merchant account และ subscription lifecycle evidence ก่อนรับค่าสมาชิกจริง
- restaurant/affiliate partner commercial terms และหลักฐานจริงก่อนเปิด revenue model ที่เกี่ยวข้อง

## เกณฑ์จบ Beta เชิงผลิตภัณฑ์

เมื่อ technical acceptance ผ่านแล้ว จึงใช้ข้อมูลผู้ใช้จริงเพื่อประเมินต่อ เช่น:

1. ผู้ใช้ใหม่ทำ flow เลือกเมนูจนถึงผลลัพธ์ได้โดยไม่ต้องมีคนสอน
2. การค้นหาร้านและ Google Maps ใช้งานได้บนมือถือจริง
3. demand ถูกบันทึกโดยไม่เปิดเผยข้อมูลตำแหน่งต่อผู้ใช้ทั่วไป
4. feedback จากผู้ใช้จริงถูกเก็บและนำมาแก้ defect สำคัญ
5. ประเมิน partner/Premium จากข้อมูลจริงเท่านั้น โดยไม่สร้าง user count, conversion, revenue หรือ willingness-to-pay สมมติ

สถานะ Go/No-Go ล่าสุดให้ยึด `CURRENT-RELEASE.md` เป็น source of truth
