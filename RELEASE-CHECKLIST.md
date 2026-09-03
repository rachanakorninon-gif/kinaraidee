# Kinaraidee — Commercial Release Checklist

ใช้เอกสารนี้หลัง Public Beta ผ่าน เพื่อเตรียมเปิดใช้งานเชิงพาณิชย์อย่างเป็นระบบ

หลักสำคัญ: ทุกช่องที่ทำเครื่องหมายผ่านต้องมีหลักฐานจริง เช่น real-device run, transaction test, policy ที่เผยแพร่จริง, partner agreement หรือ security review ห้ามผ่านจากการคาดเดา

## Current runtime candidate
- Current browser/PWA runtime candidate: `6cd98bf2a2020b86fe2ab05e263dd59f7e4fb387` (PR #373 Auth password-security UX readiness)
- Current runtime deployment status: **PASS FOR CURRENT BROWSER/PWA DEPLOYMENT TRACE**
- Runtime merge/deployed SHA: `0cc3ec3ef4dda18f0d8e083d8ca0992ef77f844c`
- Current Group API source candidate: `fefc29322ac13f7066038a663bfeb7091d218b8f` (PR #93), deployed as Supabase `group-api` ACTIVE version 6 with source blob `04e7f595ef73b9fdbdf377ba3b8936a818a109be` and bundle SHA-256 `e389ae3a6d5da19f81b909df6616524391825bdaef2ca568b522fbb3d8da2e52`.
- Expected Service Worker cache: `kinaraidee-beta-v16`
- PR #373 prepares browser-side Auth UX to handle Supabase weak-password rejection safely in signup/sign-in/reset flows. It does not enable leaked-password protection, change Supabase Auth configuration, or create a new Service Worker cache generation.
- Current verified browser/PWA deployment trace: docs-only descendant `0cc3ec3ef4dda18f0d8e083d8ca0992ef77f844c` changed no guarded browser/PWA runtime files; Pages run `33229525995`, Auth Password Security Live Smoke `33229548182`, and main Live Smoke `33229548190` completed success. This is deployment/static evidence only, not Auth interaction or leaked-password configuration PASS.
- Historical verified browser/PWA deployment evidence remains PR #201: Pages run `32802440796` = success and Live Smoke run `32802473505` = success for deployed SHA `00bdcb7f432d542b732cf355336e9f08798e4320`; Public Form Resilience Regression run `32802440775` = success on that exact merged-main SHA.
- Historical live public `release-meta.json` matched deployed SHA `00bdcb7f432d542b732cf355336e9f08798e4320` and live Service Worker marker `kinaraidee-beta-v16`.
- Historical PR #179 v16 member-history deployment evidence remains valid historical/scoped support.
- Canonical Group API v6 rejection-only probe run `32632951668` = success on main SHA `8eff6c10e9adb4bd78a2bd0526e4e03e7d4d06f3`; matching Supabase platform logs include version-6 chunked >8 KiB POST 413. This is backend rejection/deployment evidence only, not device or complete monitoring evidence.
- Surprise busy-state accessibility has scoped physical iPhone/VoiceOver NF-09 PASS on deployed PR #201/v16; that historical result does not establish PR #373 Auth interaction acceptance. The prior Android TalkBack follow-up remains INCONCLUSIVE / TEST ENVIRONMENT and second-device/full-matrix accessibility coverage is still open.
- Regression guards include Public Form Resilience, Surprise accessibility, Group Result, History Sync, PWA cache upgrade, iOS install hint, release consistency, runtime lineage, real-device contracts, Device UX and Group API source-contract checks.

## Beta Exit Evidence
- [ ] `BETA-RESULTS-TEMPLATE.md` กรอกจากข้อมูลจริงและมี Go decision
- [ ] `BETA-DAILY-LOG.md` / `BETA-RUN-LOG.md` มีหลักฐานรอบทดสอบที่ใช้ตัดสินใจ
- [ ] Android Chrome เครื่องจริงอย่างน้อย 3 รุ่นผ่าน core flow ตามกรณีที่รองรับ
- [ ] iPhone Safari เครื่องจริงอย่างน้อย 2 รุ่นผ่าน core flow ตามกรณีที่รองรับ
- [ ] iPadOS ถูกตรวจเมื่อมีอุปกรณ์จริง และไม่ใช้ผลจำลองแทน
- [ ] TC-01–TC-15 และ NF-01–NF-10 มีผล PASS/FAIL/N/A ที่ trace กลับไปยังอุปกรณ์ได้
- [x] Live-group completed 2/2 vote → final-result path มี same-device Android post-fix evidence ว่าแสดงผลกลุ่ม + reroll + handoff สำเร็จหลัง PR #42; ข้อนี้ไม่แทน multi-device matrix และไม่ถือเป็น fresh v6 device regression
- [x] iPhone TC-08 Location allow path มี physical-device v16 evidence และ Issue #171 ปิด completed; exact model/OS/Safari version ไม่ได้ถูกบันทึกและไม่เดาเพิ่ม
- [x] Favorite/History differentiation (`❤️ เมนูโปรด` / `👍 เลือกกิน`) มี physical Android evidence และ Issue #172 ปิดแล้ว
- [x] Issue #177 มี post-v16 physical Android favorite → full restart → History retention PASS สำหรับ tested installed-PWA session และปิด completed; ข้อนี้ไม่แทน full device matrix
- [x] NF-09 Surprise busy-state accessibility มี physical iPhone/VoiceOver PASS บน deployed PR #201/v16 สำหรับ tested session และ Issue #57 ปิด completed; Android TalkBack เดิมยัง INCONCLUSIVE / TEST ENVIRONMENT และข้อนี้ไม่แทน second-device/full-matrix accessibility PASS
- [ ] Visible keyboard focus ถูกตรวจด้วย real keyboard/focus navigation บน deployed pages
- [ ] Reduced-motion behavior ถูกตรวจบน real platform ที่เปิด reduced-motion preference
- [ ] NF-07 ถูก retest จาก verifiable older-cache baseline ไป `kinaraidee-beta-v16`
- [x] NF-05 install guidance + suppression/standalone มี PASS สำหรับ physical iPhone/Safari #1 บน deployed v16; ยังไม่แทน iPadOS หรือ iPhone รุ่นที่สอง
- [x] TC-12 Partner application physical acceptance ตาม `PUBLIC-FORM-PHYSICAL-EVIDENCE.md`; scoped OPPO Reno13 5G / Android 16 / Chrome 152 session ผ่าน duplicate-submit, failure recovery, direct `aria-busy` recovery, retry success และ privacy/backend evidence; ข้อนี้ไม่แทน full device matrix
- [x] Android same-device regressions #38 (`Invalid Date`) และ #40 (favorite loss หลัง lock/resume) ถูก retest และบันทึกเป็น fixed ตาม `CURRENT-RELEASE.md`
- [ ] Member signup/login/password-reset interaction ผ่านบนอุปกรณ์จริงตาม scope; automated deployed-source checks ไม่แทนการสมัคร/เข้าสู่ระบบ/รับอีเมล reset และตั้งรหัสผ่านจริง
- [ ] Member cloud history / favorite persistence มี evidence ครบตาม device matrix ที่กำหนด; #177 ผ่านเฉพาะ tested Android session
- [ ] Blocker = 0 และ Critical = 0 จาก release-scoped defect evidence จริง; การไม่มี defect report หรือมีเพียง CI/static/synthetic evidence ห้ามตีความว่าเป็น zero-defect PASS
- [ ] FAIL ที่ยอมรับไว้มีเหตุผล/owner/แผนติดตามชัดเจน

## Deployment & Release Evidence
- [x] `CURRENT-RUNTIME.md` / `CURRENT-RELEASE.md` ระบุ current PR #373 runtime candidate และสถานะ **PASS FOR CURRENT BROWSER/PWA DEPLOYMENT TRACE** สอดคล้องกัน
- [x] Current PR #373 Auth runtime มี canonical descendant Pages deployment + corresponding live-check evidence ตาม release contract — deployed descendant `0cc3ec3ef4dda18f0d8e083d8ca0992ef77f844c`, Pages `33229525995`, Auth live smoke `33229548182`, main Live Smoke `33229548190`
- [x] Historical PR #201 GitHub Pages deployment ของ `00bdcb7f432d542b732cf355336e9f08798e4320` สำเร็จและ trace กลับไปยัง commit ได้ — run `32802440796`
- [x] Historical PR #201 public `release-meta.json` ถูกตรวจและมี deployed SHA `00bdcb7f432d542b732cf355336e9f08798e4320` กับ live Service Worker marker `kinaraidee-beta-v16`
- [x] Historical PR #201 corresponding Live Smoke สำเร็จ — run `32802473505`
- [x] Public Form Resilience Regression run `32802440775` ยืนยัน source recovery-state contracts บน exact PR #201 merged-main SHA โดยไม่ submit form จริง
- [x] Historical PR #201 public URL / `sw.js` / release metadata ใช้ cache generation `kinaraidee-beta-v16` ตรงกันตาม trace evidence
- [x] development-only files ที่ Live Smoke ตรวจไม่ถูกเผยแพร่ใน Pages artifact
- [x] real Feedback/Partner form submission acceptance มี physical Android Chrome + backend evidence ตาม `PUBLIC-FORM-PHYSICAL-EVIDENCE.md`; ข้อนี้เป็น scoped device/session PASS และไม่แทน full device matrix
- [ ] current PR #373 Auth interaction acceptance ยังต้องใช้หลักฐานจริงตาม scope; deployed static/live checks ห้ามใช้แทน weak/leaked-password rejection หรือ account-flow PASS
- [ ] automated smoke/static/synthetic regression test ไม่ถูกใช้แทน real-device interaction หรือ assistive-technology test ที่จำเป็น — ต้องยืนยันจาก evidence set ตอนตัดสิน Beta/Commercial จริง

## Product
- [ ] ปุ่ม “ไม่รู้เลย — เลือกให้ฉันทันที” และ recommendation flow ผ่าน real-device test ตาม matrix บน current v16 scope ที่เกี่ยวข้อง
- [ ] double-tap/busy state/recovery/accessibility ผ่านบนอุปกรณ์ที่เกี่ยวข้อง; NF-09 มี scoped iPhone/VoiceOver PASS แล้ว แต่ Android TalkBack/second-device/full-matrix accessibility ยังเปิดอยู่
- [ ] visible keyboard focus และ reduced-motion behavior ผ่าน real-platform acceptance ตาม scope ที่กำหนด
- [ ] Group mode room/create/share/join/vote/completed result ผ่าน real-device flow ตาม matrix; Android device/session แรกมี scoped post-fix 2/2 final-result evidence แล้ว แต่ Group API v6 ยังไม่มี fresh multi-device regression จาก automated probe
- [ ] Feedback rating/type/status semantics และ Partner form labels/autocomplete/live status ผ่านบน platform/assistive technology ที่ใช้ทดสอบ
- [x] iPhone/Safari #1 Location allow + Maps fallback มี scoped v16 PASS ตาม Issue #171; ยังไม่แทน device matrix ทั้งหมด
- [x] Favorite/History visual differentiation มี physical Android evidence (#172 closed)
- [x] favorite/history persistence ใหม่ของ v16 ผ่าน physical Android favorite → full restart → History retention สำหรับ tested installed-PWA session และ Issue #177 ปิด
- [ ] partner result/click flow ผ่านด้วยข้อมูลร้านทดสอบหรือร้านจริงที่ตรวจสอบได้
- [ ] partner/fallback cards render ถูกต้องบน Android/iPhone ที่ใช้ทดสอบ
- [x] Partner application ส่ง privacy acknowledgement evidence ได้จริงบน current changed-path acceptance scope; scoped Android Chrome physical/backend evidence ยืนยัน privacy notice version และ acknowledgement timestamp แล้ว แต่ full-matrix coverage ยังเปิดอยู่
- [x] Android same-device member-history defects #38/#40 ผ่าน retest หลัง fixes ตาม evidence ที่บันทึก
- [ ] Member history sync/write-race/restart-durability behavior ผ่านบน device matrix ที่จำเป็นและไม่มี regression หลัง release candidate ล่าสุด
- [ ] PWA install, standalone, offline shell และ update จาก cache รุ่นเก่ามา `kinaraidee-beta-v16` ผ่านการทดสอบตาม platform ที่กำหนด
- [x] iPhone/Safari #1 Add to Home Screen guidance และ suppression หลัง “เข้าใจแล้ว” มี NF-05 scoped PASS บน v16; ยังไม่แทน iPadOS/second iPhone
- [x] Feedback flow ใช้งานจริงได้ตาม device/platform scope ที่กำหนด; PR #201 recovery implementation/deployment evidence ไม่แทน successful form submission — scoped OPPO Reno13 5G / Android 16 / Chrome 152 physical acceptance is recorded separately
- [x] Partner application recovery path ใช้งานจริงได้หลัง network/submission failure ตาม device/platform scope; PR #201 static/deployment evidence ไม่แทน successful or failed real submission acceptance — scoped OPPO Reno13 5G / Android 16 / Chrome 152 physical acceptance is recorded separately
- [ ] ไม่มี regression ของ core flow หลัง release candidate ล่าสุด

## Accounts & Payments
- [ ] เลือก payment provider / merchant account จริง
- [ ] กำหนดราคา Premium จริงและเงื่อนไข Free/Premium ชัดเจน
- [ ] ทดสอบ subscribe / renew / cancel / payment failure ใน sandbox หรือ environment ที่ provider รองรับ
- [ ] กำหนด entitlement ระหว่าง Free และ Premium
- [ ] webhook/payment status handling ป้องกันการให้สิทธิ์จาก client อย่างเดียว
- [ ] มี transaction ID / audit trail / reconciliation ที่ตรวจสอบได้
- [ ] refund/cancel policy สอดคล้องกับ flow ที่ระบบรองรับ
- [ ] ห้ามเปิดรับเงินจริงหาก payment gate ข้อใดที่จำเป็นยังไม่ผ่าน

## Restaurant Partners
- [ ] มีร้านพาร์ตเนอร์จริงชุดแรกและข้อมูลติดต่อที่ตรวจสอบได้
- [ ] ร้านยอมรับเงื่อนไขค่าคอมมิชชัน/แพ็กเกจเป็นลายลักษณ์อักษรหรือหลักฐานที่เก็บได้
- [ ] ตรวจ destination URL / menu keywords / active status ของแต่ละร้าน
- [ ] partner click tracking ไม่สร้าง click ซ้ำผิดปกติจากการกดติดกัน
- [ ] conversion/commission มีวิธี verify ก่อนจ่าย/เรียกเก็บเงินจริง
- [ ] pending / confirmed / cancelled flow ถูกทดสอบ
- [ ] มีขั้นตอน dispute / cancel / refund ที่ชัดเจน

## Privacy & Legal
- [ ] Privacy Policy ฉบับ Production เผยแพร่จริง
- [ ] Terms of Service เผยแพร่จริง
- [ ] ช่องทางติดต่อเจ้าของบริการจริง
- [ ] ระบุวัตถุประสงค์การใช้ location / analytics / partner tracking / account data
- [ ] กำหนด retention/deletion ของข้อมูลและขั้นตอนคำขอของผู้ใช้
- [ ] ตรวจ consent/notice ที่จำเป็นก่อนเริ่ม analytics หรือ tracking ที่ต้องขอความยินยอม
- [x] Beta Partner application บันทึก Privacy notice version และ acknowledgement timestamp แล้ว; ข้อนี้เป็น implementation/observed beta evidence เท่านั้น ไม่แทน Production Privacy/PDPA review
- [x] Data-governance draft ระบุ Group rooms/votes, expiry/cascade schema facts และ anonymous data-rights caution แล้ว; retention period/owner/legal basis ยังเป็น TBD และข้อนี้ไม่ใช่ legal/retention PASS
- [ ] ตรวจข้อกำหนด PDPA และกฎหมาย/ข้อกำหนดที่เกี่ยวข้องก่อนรับข้อมูลเชิงพาณิชย์
- [ ] ข้อความราคา/ต่ออายุ/ยกเลิก Premium ไม่ทำให้ผู้ใช้เข้าใจผิด

## Security
- [ ] ตรวจ Supabase RLS ทุกตาราง Production ด้วย role ที่เกี่ยวข้อง
- [ ] เปิด Supabase Auth leaked-password protection และ re-run Security Advisor; ติดตามใน Issue #11 — current gate = **BLOCKED BY VERIFIED FREE PLAN / CONFIGURATION — NOT PASS**
- [ ] ไม่มี service-role/secret/private key อยู่ใน browser, repository หรือ public build
- [ ] rotate secret ที่เคยใช้ใน test หากจำเป็น
- [ ] ทดสอบ auth / sign-out / password recovery / session expiry
- [ ] ทดสอบ owner/admin authorization และ negative cases
- [ ] ตรวจ Edge Functions/partner endpoints ไม่ยอมรับสิทธิ์จากข้อมูล client ที่เชื่อถือไม่ได้
- [ ] ตรวจ location และข้อมูลส่วนบุคคลไม่ถูกเปิด public SELECT โดยไม่ตั้งใจ
- [x] Database boundary ป้องกัน HTML tag delimiters ใน public partner-card text แล้ว และ Security Advisor ไม่พบ regression ใหม่ใน scoped evidence
- [x] Partner-card renderer ใช้ DOM nodes/`textContent`; implementation evidence มีแล้ว แต่ยังต้องมี real-device evidence ก่อนถือว่า Product gate ผ่าน
- [x] Group API PR #93 source/deployment parity ถูกยืนยันที่ ACTIVE v6 และ canonical rejection-only probe `32632951668` ผ่าน streamed chunked >8 KiB → 413 พร้อม matching version-6 platform logs; ข้อนี้เป็น input/resource/deployment evidence ไม่ใช่ complete anonymous abuse-control หรือ application-event monitoring PASS
- [x] Group API retention schema ถูกตรวจแบบ read-only และบันทึกใน `GROUP-API-RETENTION-SCHEMA-EVIDENCE.md`; ข้อนี้เป็น schema evidence เท่านั้น ไม่ใช่ approved retention period, cleanup implementation หรือ cleanup PASS
- [ ] Group API retention period ถูกอนุมัติและ cleanup/purge mechanism ถูก implement + verify ว่าไม่ลบ active rooms และ cascade votes เฉพาะห้องที่เข้าเกณฑ์
- [ ] Group API application structured-event ingestion, monitoring baseline/owner และ complete anonymous rate/quota strategy ถูก verify ตาม Issue #45
- [ ] Partner API complete abuse-control / monitoring / retention controls ถูก verify นอกเหนือจาก scoped ACTIVE v15 rejection-only evidence
- [x] `main` branch protection/ruleset + required release/security checks ถูกเปิดและทดสอบว่า failing required check block merge ได้จริง — Issue #35 closed as completed
- [ ] ตรวจ dependency/security findings และ `SECURITY.md`; Critical findings ต้องปิดก่อน release

## Operations
- [ ] Production monitoring / error reporting พร้อมช่องทางตรวจ incident
- [ ] Backup/recovery plan สำหรับข้อมูลสำคัญและมีผู้รับผิดชอบ
- [ ] Owner dashboard ใช้งานได้จริงกับข้อมูล Production
- [ ] ขั้นตอนรับและตอบ bug/support พร้อมช่องทางติดต่อ
- [x] Browser/PWA synthetic monitor mechanism มี historical successful run จริงที่ตรวจย้อนหลังได้; ข้อนี้ไม่ทำให้ current v16 Production monitoring ผ่าน เพราะยังขาด fresh current-runtime monitoring/owner/baseline/alert/escalation ตาม scope จริง
- [x] Release rollback procedure ถูกเขียนไว้ใน `ROLLBACK-RUNBOOK.md` และมี traceable Group API/Supabase rollback evidence path
- [ ] Rollback procedure ถูกทดลองอย่างน้อยหนึ่งครั้งใน environment ที่ปลอดภัยและมี Evidence Record จริง
- [ ] ระบุผู้มีสิทธิ์ deploy/แก้ Production
- [ ] มีวิธีหยุด Premium/partner traffic ชั่วคราวหากเกิด incident

หมายเหตุ: การมี `ROLLBACK-RUNBOOK.md`, synthetic monitor หรือ rejection probe อย่างเดียวไม่ถือว่า Production operations/rollback readiness ผ่าน ต้องมี owner/channel/baseline และ drill จริงตามขอบเขตที่เปิดใช้งาน

## Store Distribution (ถ้าต้องการ native store)
- [ ] Google Play developer account
- [ ] Apple Developer account
- [ ] Store listing / screenshots / icon / description
- [ ] Privacy declarations ของ Store ตรงกับพฤติกรรมแอปจริง
- [ ] Billing implementation สอดคล้องกับข้อกำหนด Store ที่ใช้
- [ ] ผ่าน review ของแต่ละ Store

## Final Go / No-Go Record
- วันที่ตัดสินใจ:
- Release candidate / commit SHA:
- ผู้อนุมัติ:
- Beta evidence:
- Deployment/Live Smoke evidence:
- Payment evidence (ถ้ามี Premium):
- Partner evidence (ถ้ามี commission):
- Privacy/Legal review:
- Security review:
- Known accepted risks:
- Rollback owner/วิธี rollback:

### GO
เปิดรับเงินจริงได้เฉพาะเมื่อรายการที่จำเป็นต่อรูปแบบธุรกิจที่เปิดใช้ผ่านครบ, มีหลักฐานตรวจสอบย้อนหลังได้ และ Blocker/Critical ด้าน Product, Payment, Privacy, Security = 0

### NO-GO
ถ้ารายการจำเป็นข้อใดยังไม่มีหลักฐานจริง ให้คง Public Beta/ทดสอบต่อและห้ามตีความช่องว่างว่า “ผ่าน”