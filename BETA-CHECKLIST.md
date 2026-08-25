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
- [x] Service Worker cache รุ่นปัจจุบัน: `kinaraidee-beta-v16`
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
- [x] Current browser/PWA runtime candidate = PR #201 / `a60318b432598e2eb82e71dcf1a9ec804ff1c4b2`
- [x] Runtime merge/deployed SHA = `00bdcb7f432d542b732cf355336e9f08798e4320`
- [x] Pages run `32802440796` = SUCCESS for exact merged-main SHA
- [x] Corresponding Live Smoke `32802473505` = SUCCESS after that Pages deployment
- [x] Public Form Resilience Regression `32802440775` = SUCCESS for source recovery-state contracts; it does not submit a form
- [x] Public `release-meta.json` / live Service Worker marker verified as `kinaraidee-beta-v16`
- [x] Latest verified evidence-only deployed descendant PR #215 / `5489cbbdc9ff618f1d32fa438ef91476dd350768`: Pages `32843512340` + Live Smoke `32843553479` = SUCCESS without superseding the PR #201 browser/PWA runtime candidate

หลักฐาน deployment/synthetic เหล่านี้ไม่ใช่ real-device, accessibility, payment, legal, partner หรือ Commercial PASS และไม่ใช่หลักฐาน real Feedback/Partner submission หลัง PR #201

## Real-device evidence ที่มีแล้ว — scoped sessions เท่านั้น
- [x] Android device/session #1: Home / Surprise / guided flow / reroll
- [x] Android device/session #1: History / favorite / account persistence ใน scoped session
- [x] Android device/session #1: Group 2/2 final result + repeated reroll + handoff หลัง PR #42 ใน historical tested session
- [x] Android device/session #1: Location-denied fallback + Google Maps fallback
- [x] Android device/session #1: PWA install/standalone reopen
- [x] Android device/session #1: Offline cold start + offline recommendation + offline→online recovery
- [x] Android device/session #1: Feedback submit + backend row confirmation เป็น historical evidence ก่อน PR #201 form-resilience runtime change
- [x] Android device/session #1: Partner application + privacy acknowledgement backend confirmation เป็น historical evidence ก่อน PR #201 form-resilience runtime change
- [x] Android device/session #1: 404 recovery
- [x] Android device/session #1: background/resume + lock/unlock result persistence
- [x] Android device/session #1: TalkBack accessible name + button role partial evidence for Surprise; NF-09 ยังไม่ PASS
- [x] Android installed-PWA v16 session: fresh favorite persisted after fully closing from Recent Apps and reopening without clearing data; Issue #177 closed completed for that tested session only
- [x] iPhone/Safari #1 v16: TC-08 Location allow path passed for the tested session; Issue #171 closed completed
- [x] iPhone/Safari #1 v16: NF-05 install guidance / Add to Home Screen / standalone launch / suppression after “เข้าใจแล้ว” passed for the tested session only

ขอบเขต: หลักฐานข้างต้นเป็น scoped physical sessions; exact model/OS/browser metadata บางรายการไม่ได้ถูกบันทึกและห้ามเดา ห้ามอนุมานเป็น PASS ของรุ่นอื่น, current PR #201 form-submission behavior หรือ full device matrix

## ต้องตรวจบนอุปกรณ์จริงก่อน Beta acceptance / เพิ่ม traffic ตาม gate
- [ ] Android Chrome อย่างน้อย 3 device models — ปัจจุบันยังไม่ครบจำนวนรุ่นและ exact model ของ historical Android session ไม่ถูกบันทึก
- [ ] iPhone Safari อย่างน้อย 2 device models — ปัจจุบันมี scoped evidence ของ iPhone #1 เท่านั้น
- [ ] iPadOS Safari อย่างน้อย 1 รุ่น ถ้ามีอุปกรณ์รองรับ
- [ ] TC-01–TC-15 ครบตามกรณีที่อุปกรณ์รองรับ
- [ ] NF-01–NF-10 ครบตามกรณีที่อุปกรณ์รองรับ
- [x] TC-08 Location allow มี scoped physical iPhone/Safari #1 PASS บน v16; ยังไม่ใช่ full-matrix PASS
- [ ] NF-04 Android PWA update-specific path มีหลักฐานจริงถ้ากำหนดเป็น gate
- [x] NF-05 iPhone install guidance + “เข้าใจแล้ว” suppression มี scoped physical iPhone/Safari #1 PASS บน v16; iPadOS/second-iPhone coverage ยังเปิด
- [ ] NF-07 upgrade จาก verifiable older-cache baseline ไป `kinaraidee-beta-v16` โดยไม่ต้องล้างข้อมูลเอง; ห้ามนับการเปลี่ยน runtime ทั่วไปเป็น PASS หากไม่มี older-cache marker ที่จับไว้ก่อนอัปเกรด
- [ ] NF-09 Surprise busy/ready accessibility ผ่านด้วย TalkBack/VoiceOver environment ที่ทำงานได้จริง; สถานะล่าสุดเป็น **INCONCLUSIVE / test-environment issue**, ไม่ใช่ PASS และไม่ใช่ new app FAIL
- [ ] visible keyboard focus/navigation ผ่าน real interaction บน deployed PR #201/v16
- [ ] reduced-motion behavior ผ่านบน real platform/browser ที่เปิด reduced-motion preference
- [ ] real Feedback submission/failure-recovery interaction สำหรับ PR #201 changed path พร้อม backend acceptance ตาม test scope ที่อนุมัติ
- [ ] real Partner application submission/failure-recovery interaction สำหรับ PR #201 changed path พร้อม backend acceptance ตาม test scope ที่อนุมัติ; ห้ามนับ test record เป็น partner-commercial evidence
- [ ] ติดตั้ง PWA และเปิดจากไอคอนบนทุกแพลตฟอร์มที่ใช้เป็น acceptance target
- [ ] geolocation allow/deny ครบตาม matrix
- [ ] Google Maps fallback ครบตาม matrix
- [ ] เก็บ feedback จากผู้ใช้จริงตาม Beta target ที่อนุมัติ; ห้ามกรอกจำนวนสมมติ
- [ ] ทุก FAIL มี defect ที่ตามแก้ได้
- [ ] Blocker = 0
- [ ] Critical = 0

## Backend / Security / Operations gates ที่ยังเปิด
- [x] Group API source candidate PR #93 deploy เป็น Supabase ACTIVE version 6 และตรวจ source/deployment parity แล้ว
- [x] Canonical rejection-only Group API probe `32632951668` = SUCCESS รวม chunked >8 KiB → HTTP 413
- [x] `main` repository governance ถูก enforce ผ่าน active `Protect main` ruleset; PR #159 positive merge path และ PR #160 failing-required-check block path ถูกพิสูจน์แล้ว และ Issue #35 ปิด completed
- [ ] Group API application structured-event ingestion / real monitoring baseline / owner-alert-escalation path — Issue #45
- [ ] Group API actual end-to-end alert delivery verification — controlled self-test mechanism/evidence guard มีแล้ว แต่ยังต้อง exact run + resulting issue/comment จริง
- [ ] อนุมัติ Group API retention period + implement/verify cleanup โดยไม่ลบ active rooms — Issue #45
- [ ] Complete anonymous Group API rate/quota/abuse-control strategy — Issue #45
- [ ] Partner API actual end-to-end alert delivery verification — controlled self-test mechanism/evidence guard มีแล้ว แต่ยังต้อง exact run + resulting issue/comment จริง
- [ ] เปิด Supabase Auth leaked-password protection และ re-run Security Advisor — Issue #11; สถานะปัจจุบัน blocked by plan/configuration, ไม่ใช่ PASS
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
**Beta acceptance / เพิ่ม traffic:** ทำได้เมื่อ core flow ผ่านบน device matrix ที่กำหนด, PWA/update/accessibility/form-interaction flow ที่เกี่ยวข้องผ่าน และ Blocker/Critical ตาม gate เป็น 0

**Production เชิงพาณิชย์:** สถานะปัจจุบันยัง **NO-GO** จนกว่า Payment, Privacy/Legal, Security, Group/Partner API operational hardening, Production monitoring/rollback และ business/partner requirements ที่เปิดใช้จริงจะมีหลักฐานครบ Repository governance ปัจจุบันถูก enforce แล้วแต่ไม่แทน gate เหล่านี้

ห้ามทำเครื่องหมาย PASS จาก static review, CI, synthetic monitoring, source markers หรือการคาดเดาแทน real-device/production/business evidence ที่รายการนั้นต้องการ
