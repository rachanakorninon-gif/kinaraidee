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

## Current browser/PWA runtime
- [x] Auth password-security UX candidate = PR #373 merged-main runtime `6cd98bf2a2020b86fe2ab05e263dd59f7e4fb387`; browser/PWA deployment trace verified through docs-only descendant `0cc3ec3ef4dda18f0d8e083d8ca0992ef77f844c`, Pages `33229525995`, Auth Password Security Live Smoke `33229548182`, and main Live Smoke `33229548190`. This is deployed static/live-source evidence only and does not itself establish account-flow or leaked-password protection PASS; separate scoped physical account-flow evidence is recorded below.
- [ ] Supabase leaked-password protection ยังไม่ได้เปิด; runtime นี้เตรียมเฉพาะ WeakPasswordError UX และ account-enumeration-safe messaging เท่านั้น — Issue #372

## Verified browser/PWA deployment evidence — historical scope before PR #373
- [x] Prior verified browser/PWA runtime candidate = PR #201 / `a60318b432598e2eb82e71dcf1a9ec804ff1c4b2`
- [x] Runtime merge/deployed SHA = `00bdcb7f432d542b732cf355336e9f08798e4320`
- [x] Pages run `32802440796` = SUCCESS for exact merged-main SHA
- [x] Corresponding Live Smoke `32802473505` = SUCCESS after that Pages deployment
- [x] Public Form Resilience Regression `32802440775` = SUCCESS for source recovery-state contracts; it does not submit a form
- [x] Public `release-meta.json` / live Service Worker marker verified as `kinaraidee-beta-v16`
- [x] Latest verified evidence-only deployed descendant PR #215 / `5489cbbdc9ff618f1d32fa438ef91476dd350768`: Pages `32843512340` + Live Smoke `32843553479` = SUCCESS without superseding the PR #201 browser/PWA runtime candidate at that time

หลักฐาน deployment/synthetic เหล่านี้ไม่ใช่ real-device, accessibility, payment, legal, partner หรือ Commercial PASS และไม่ใช่หลักฐานที่ใช้ปิด real Feedback/Partner หรือ Auth interaction; scoped physical evidence สำหรับพฤติกรรมเหล่านั้นถูกบันทึกแยกด้านล่าง ขณะที่ weak/leaked-password rejection ยัง OPEN

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
- [x] Android device/session #1: TalkBack accessible name + button role partial evidence for Surprise; later Android TalkBack follow-up remains **INCONCLUSIVE / TEST ENVIRONMENT**, not a new app FAIL and not an NF-09 PASS
- [x] Android installed-PWA v16 session: fresh favorite persisted after fully closing from Recent Apps and reopening without clearing data; Issue #177 closed completed for that tested session only
- [x] iPhone/Safari #1 v16: TC-08 Location allow path passed for the tested session; Issue #171 closed completed
- [x] iPhone/Safari #1 v16: NF-05 install guidance / Add to Home Screen / standalone launch / suppression after “เข้าใจแล้ว” passed for the tested session only
- [x] iPhone/VoiceOver #1 on deployed PR #201/v16: NF-09 Surprise busy/ready accessibility passed for the tested physical session; VoiceOver activated Surprise, announced the busy state once, reached a result, returned to ready state and completed a second round. This does not create Android TalkBack, second-iPhone or full-matrix PASS.
- [x] OPPO Reno13 5G / Android 16 / Chrome 152.0.7977.64: canonical Reduced Motion physical PASS on 2026-09-04; browser received `prefers-reduced-motion=reduce`, shipped rule reduced transition to `1e-05s`, and the physical Surprise flow rendered a result and returned ready. Scope is this traced session only.
- [x] OPPO Reno13 5G / Android 16 / Chrome 152.0.7977.64: TC-11 Feedback + TC-12 Partner scoped physical PASS, including duplicate-submit, airplane-mode failure recovery, direct `aria-busy` recovery observation, restored-network retry success and backend/privacy corroboration. This is Beta QA evidence only and does not create commercial-partner evidence or full-matrix PASS.
- [x] OPPO Reno13 5G / Android 16 / Chrome 152.0.7977.64: current PR #373 Auth account-flow scoped physical PASS for recovery request/mail/verification-link, replacement-password update, sign-in, genuinely new signup, Gmail confirmation delivery, confirmation-link completion and resulting signed-in Member state, with backend corroboration. Weak/leaked-password rejection remains NOT VERIFIED / OPEN.

ขอบเขต: หลักฐานข้างต้นเป็น scoped physical sessions; exact model/OS/browser metadata บาง historical รายการไม่ได้ถูกบันทึกและห้ามเดา ห้ามขยาย scoped OPPO TC-11/TC-12/Auth/Reduced-Motion PASS ไปเป็น PASS ของรุ่นอื่น, full device matrix, blanket Auth/Security PASS หรือ Commercial GO

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
- [x] NF-09 มี scoped physical iPhone/VoiceOver #1 PASS บน deployed PR #201/v16; Android TalkBack follow-up ยังเป็น **INCONCLUSIVE / TEST ENVIRONMENT** และ second-device/full-matrix accessibility coverage ยังเปิด
- [ ] visible keyboard focus/navigation ผ่าน real interaction บน deployed pages
- [x] reduced-motion behavior ผ่านบน real platform/browser ที่เปิด reduced-motion preference — scoped PASS: OPPO Reno13 5G / Android 16 / Chrome 152.0.7977.64, 2026-09-04; ไม่ใช่ full-matrix PASS
- [x] real Feedback submission/failure-recovery interaction สำหรับ PR #201 changed path พร้อม backend acceptance — scoped PASS บน OPPO Reno13 5G / Android 16 / Chrome 152.0.7977.64 ตาม `PUBLIC-FORM-PHYSICAL-EVIDENCE.md`; broader device-matrix coverage ยังเปิด
- [x] real Partner application submission/failure-recovery interaction สำหรับ PR #201 changed path พร้อม backend/privacy acceptance — scoped PASS บน OPPO Reno13 5G / Android 16 / Chrome 152.0.7977.64 ตาม `PUBLIC-FORM-PHYSICAL-EVIDENCE.md`; ห้ามนับ Beta test record เป็น partner-commercial evidence และ broader device-matrix coverage ยังเปิด
- [x] Auth recovery/password-update/sign-in/new-signup/email-confirmation ของ PR #373 ผ่าน real deployed browser/device interaction — scoped OPPO Reno13 5G / Android 16 / Chrome 152.0.7977.64 ตาม `AUTH-INTERACTION-PHYSICAL-EVIDENCE.md`; Pages/Live Smoke ไม่ใช่หลักฐานที่ใช้ปิดข้อนี้
- [ ] Auth weak/leaked-password rejection/protection ของ PR #373 ผ่านบน production Auth service; current server-side protection ยัง **BLOCKED BY VERIFIED FREE PLAN / CONFIGURATION — NOT PASS** และ successful account-flow evidence ห้ามใช้แทน rejection evidence
- [ ] ติดตั้ง PWA และเปิดจากไอคอนบนทุกแพลตฟอร์มที่ใช้เป็น acceptance target
- [ ] geolocation allow/deny ครบตาม matrix
- [ ] Google Maps fallback ครบตาม matrix
- [ ] เก็บ feedback จากผู้ใช้จริงตาม Beta target ที่อนุมัติ; ห้ามกรอกจำนวนสมมติ
- [ ] ทุก FAIL มี defect ที่ตามแก้ได้
- [ ] Blocker = 0 จาก release-scoped defect evidence จริง; การไม่มี defect report หรือ CI/synthetic-only evidence ไม่ถือเป็นค่าศูนย์
- [ ] Critical = 0 จาก release-scoped defect evidence จริง; การไม่มี defect report หรือ CI/synthetic-only evidence ไม่ถือเป็นค่าศูนย์

## Backend / Security / Operations gates ที่ยังเปิด
- [x] Group API source candidate PR #93 deploy เป็น Supabase ACTIVE version 6 และตรวจ source/deployment parity แล้ว
- [x] Canonical rejection-only Group API probe `32632951668` = SUCCESS รวม chunked >8 KiB → HTTP 413
- [x] Partner API source/deployment hardening ตรวจ Supabase ACTIVE version 15 และ source/deployment parity แล้วตาม `PARTNER-API-HARDENING-EVIDENCE.md`
- [x] Partner API merged-main rejection-only probe `32675596758` = SUCCESS: GET=405, malformed JSON=400, oversized body=413 โดยไม่สร้าง successful product action
- [x] `main` repository governance ถูก enforce ผ่าน active `Protect main` ruleset; PR #159 positive merge path และ PR #160 failing-required-check block path ถูกพิสูจน์แล้ว และ Issue #35 ปิด completed
- [ ] Group API application structured-event ingestion / real monitoring baseline / owner-alert-escalation path — Issue #45
- [ ] Group API actual end-to-end alert delivery verification — controlled self-test mechanism/evidence guard มีแล้ว แต่ยังต้อง exact run + resulting issue/comment จริง
- [ ] อนุมัติ Group API retention period + implement/verify cleanup โดยไม่ลบ active rooms — Issue #45
- [ ] Complete anonymous Group API rate/quota/abuse-control strategy — Issue #45
- [ ] Partner API monitoring baseline / owner / alert channel / escalation / support path — Issue #123
- [ ] Partner API actual end-to-end alert delivery verification — controlled self-test mechanism/evidence guard มีแล้ว แต่ยังต้อง exact run + resulting issue/comment จริง
- [ ] อนุมัติ Partner API retention สำหรับ click/search/session/conversion data + cleanup/anonymization verification — Issue #123
- [ ] Complete anonymous Partner API rate/quota/abuse-control strategy — Issue #123
- [ ] เปิด Supabase Auth leaked-password protection และ re-run Security Advisor — Issue #372; สถานะปัจจุบันยังไม่เปิดและไม่ใช่ PASS
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
**Beta acceptance / เพิ่ม traffic:** ทำได้เมื่อ core flow ผ่านบน device matrix ที่กำหนด, PWA/update/accessibility/form-interaction flow ที่เกี่ยวข้องผ่าน และ Blocker/Critical = 0 มี release-scoped defect evidence รองรับจริง; การไม่มีรายงานหรือ CI/synthetic-only evidence ไม่เพียงพอให้เปิด gate

**Production เชิงพาณิชย์:** สถานะปัจจุบันยัง **NO-GO** จนกว่า Payment, Privacy/Legal, Security, Group/Partner API operational hardening, Production monitoring/rollback และ business/partner requirements ที่เปิดใช้จริงจะมีหลักฐานครบ Repository governance ปัจจุบันถูก enforce แล้วแต่ไม่แทน gate เหล่านี้

ห้ามทำเครื่องหมาย PASS จาก static review, CI, synthetic monitoring, source markers หรือการคาดเดาแทน real-device/production/business evidence ที่รายการนั้นต้องการ
