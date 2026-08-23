# กินอะไรดี — Beta Launch Checklist

## Implementation / deployment ที่พร้อมแล้ว
- [x] Flow เลือกเมนูหลัก
- [x] ปุ่ม “ไม่รู้เลย — เลือกให้ฉันทันที”
- [x] มี implementation สำหรับ double-tap/busy/recovery state; full assistive-tech acceptance ยังแยกอยู่ใน NF-09
- [x] ประวัติและเมนูโปรด
- [x] โหมดกลุ่ม
- [x] ร้านใกล้คุณ + Google Maps fallback
- [x] Supabase demand tracking
- [x] Privacy + Feedback + Partner application สำหรับ Beta
- [x] PWA manifest + install helper + offline shell
- [x] iPhone/iPad install guidance พร้อม suppression หลัง “เข้าใจแล้ว” ใน source/synthetic coverage
- [x] รองรับ iPadOS ที่รายงาน User Agent แบบ Mac ใน source/synthetic coverage
- [x] Service Worker cache รุ่นปัจจุบัน: `kinaraidee-beta-v13`
- [x] GitHub Pages deploy workflow
- [x] Static QA / regression workflows
- [x] Live Smoke workflow
- [x] Public Beta synthetic monitor workflow
- [x] robots.txt + sitemap.xml
- [x] 404 recovery page
- [x] `BETA-TEST-CASES.md` TC-01–TC-15
- [x] `BETA-NEW-FLOW-TESTS.md` NF-01–NF-10
- [x] `BETA-DEVICE-MATRIX.md` และ `BETA-RUN-LOG.md`

## Verified browser/PWA deployment evidence
- [x] Current browser/PWA runtime candidate = PR #79 / `35fe4b7fbf201882ea2ebad8ffca2b8da668999b`
- [x] Pages run `32621529715` = SUCCESS for exact runtime SHA
- [x] Public Pages Trace Check `32621547307` = SUCCESS; public `release-meta.json` + `kinaraidee-beta-v13` + live SW marker verified
- [x] Corresponding Live Smoke `32621549478` = SUCCESS
- [x] Scheduled Public Beta synthetic monitor run `32626732416` = SUCCESS for the same unchanged browser/PWA runtime lineage

หลักฐาน deployment/synthetic เหล่านี้ไม่ใช่ real-device, accessibility, payment, legal, partner หรือ Commercial PASS

## Real-device evidence ที่มีแล้ว — Android device/session #1
- [x] Home / Surprise / guided flow / reroll
- [x] History / favorite / account persistence ใน scoped session
- [x] Group 2/2 final result + repeated reroll + handoff หลัง PR #42 ใน historical tested session
- [x] Location-denied fallback + Google Maps fallback
- [x] PWA install/standalone reopen
- [x] Offline cold start + offline recommendation + offline→online recovery
- [x] Feedback submit + backend row confirmation
- [x] Partner application + privacy acknowledgement backend confirmation
- [x] 404 recovery
- [x] background/resume + lock/unlock result persistence
- [x] TalkBack accessible name + button role partial evidence for Surprise

ขอบเขต: เป็นหลักฐานจาก Android device/session เดียว; exact model/Android/Chrome version ไม่ได้ถูกบันทึก และห้ามอนุมานเป็น PASS ของรุ่นอื่นหรือพฤติกรรมที่เปลี่ยนภายหลัง

## ต้องตรวจบนอุปกรณ์จริงก่อน Beta acceptance / เพิ่ม traffic ตาม gate
- [ ] Android Chrome อย่างน้อย 3 device models — ปัจจุบันมีหลักฐานเพียง 1 device/session และ exact model ไม่ถูกบันทึก
- [ ] iPhone Safari อย่างน้อย 2 device models
- [ ] iPadOS Safari อย่างน้อย 1 รุ่น ถ้ามีอุปกรณ์รองรับ
- [ ] TC-01–TC-15 ครบตามกรณีที่อุปกรณ์รองรับ
- [ ] NF-01–NF-10 ครบตามกรณีที่อุปกรณ์รองรับ
- [ ] TC-08 Location allow มีหลักฐานแยกชัดเจนบนอุปกรณ์จริง
- [ ] NF-04 Android PWA update-specific path มีหลักฐานจริงถ้ากำหนดเป็น gate
- [ ] NF-05 iPhone/iPad install guidance + “เข้าใจแล้ว” suppression มี real Safari evidence
- [ ] NF-07 upgrade จาก cache รุ่นก่อนหน้าไป `kinaraidee-beta-v13` โดยไม่ต้องล้างข้อมูลเอง
- [ ] NF-09 Surprise busy/ready accessibility ผ่านด้วย TalkBack/VoiceOver environment ที่ทำงานได้จริง; สถานะล่าสุดเป็น **INCONCLUSIVE / test-environment issue**, ไม่ใช่ PASS และไม่ใช่ new app FAIL
- [ ] ติดตั้ง PWA และเปิดจากไอคอนบนทุกแพลตฟอร์มที่ใช้เป็น acceptance target
- [ ] geolocation allow/deny ครบตาม matrix
- [ ] Google Maps fallback ครบตาม matrix
- [ ] Feedback/Partner form ครบตาม platform/assistive-tech scope ที่กำหนด
- [ ] เก็บ feedback จากผู้ใช้จริงตาม Beta target ที่อนุมัติ; ห้ามกรอกจำนวนสมมติ
- [ ] ทุก FAIL มี defect ที่ตามแก้ได้
- [ ] Blocker = 0
- [ ] Critical = 0

## Backend / Security / Operations gates ที่ยังเปิด
- [x] Group API source candidate PR #93 deploy เป็น Supabase ACTIVE version 6 และตรวจ source/deployment parity แล้ว
- [x] Canonical rejection-only Group API probe `32632951668` = SUCCESS รวม chunked >8 KiB → HTTP 413
- [ ] Group API application structured-event ingestion / real monitoring baseline / owner-alert-escalation path — Issue #45
- [ ] อนุมัติ Group API retention period + implement/verify cleanup โดยไม่ลบ active rooms — Issue #45
- [ ] Complete anonymous Group API rate/quota/abuse-control strategy — Issue #45
- [ ] เปิด Supabase Auth leaked-password protection และ re-run Security Advisor — Issue #11
- [ ] เปิด branch protection/ruleset + required release/security checks บน `main` และทดสอบ enforcement — Issue #35
- [ ] Rollback/restore/recovery drill จริงพร้อม evidence

## ก่อนเปิดรับเงินจริง
- [ ] เลือกแพ็กเกจ Premium และราคาจริงจาก product/business decision ที่อนุมัติ
- [ ] เชื่อม payment provider / merchant account
- [ ] ทดสอบ subscribe / renew / cancel / payment failure / entitlement / reconciliation ตาม provider จริง
- [ ] เตรียม Terms of Service ฉบับ Production
- [ ] ตรวจ Privacy Policy ฉบับ Production / controller / contact / retention / user-rights procedure
- [ ] ตรวจ PDPA/ฐานการประมวลผล/consent กับผู้เชี่ยวชาญที่เหมาะสม
- [ ] กำหนดเงื่อนไขร้านพาร์ตเนอร์และค่าคอมมิชชันจากคู่ค้าจริง
- [ ] เตรียมบัญชีรับเงิน/ภาษี/เอกสารธุรกิจที่เกี่ยวข้อง
- [ ] Production monitoring / incident response / owner-on-call พร้อมจริง
- [ ] Backup/recovery และ rollback drill ผ่านตาม scope Production

## เกณฑ์ Go / No-Go
**Beta acceptance / เพิ่ม traffic:** ทำได้เมื่อ core flow ผ่านบน device matrix ที่กำหนด, PWA/update/accessibility flow ที่เกี่ยวข้องผ่าน และ Blocker/Critical ตาม gate เป็น 0

**Production เชิงพาณิชย์:** สถานะปัจจุบันยัง **NO-GO** จนกว่า Payment, Privacy/Legal, Security/Governance, Group API operational hardening, Production monitoring/rollback และ business/partner requirements ที่เปิดใช้จริงจะมีหลักฐานครบ

ห้ามทำเครื่องหมาย PASS จาก static review, CI, synthetic monitoring, source markers หรือการคาดเดาแทน real-device/production/business evidence ที่รายการนั้นต้องการ
