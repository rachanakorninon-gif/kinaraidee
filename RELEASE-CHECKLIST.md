# Kinaraidee — Commercial Release Checklist

ใช้เอกสารนี้หลัง Public Beta ผ่าน เพื่อเตรียมเปิดใช้งานเชิงพาณิชย์อย่างเป็นระบบ

หลักสำคัญ: ทุกช่องที่ทำเครื่องหมายผ่านต้องมีหลักฐานจริง เช่น real-device run, transaction test, policy ที่เผยแพร่จริง, partner agreement หรือ security review ห้ามผ่านจากการคาดเดา

## Current runtime candidate
- Current browser/PWA runtime candidate: `46b494cc9430ee39c2322f9e0ae8b66149c0d3bf` (PR #174 v15 runtime lineage)
- Runtime merge/deployed SHA: `367162286d1e1452151df11dca805ed629bb5466` (PR #174 merged)
- Current Group API source candidate: `fefc29322ac13f706603bfeb7091d218b8f` (PR #93), deployed as Supabase `group-api` ACTIVE version 6 with source blob `04e7f595ef73b9fdbdf377ba3b8936a818a109be` and bundle SHA-256 `e389ae3a6d5da19f81b909df6616524391825bdaef2ca568b522fbb3d8da2e52`.
- Expected Service Worker cache: `kinaraidee-beta-v15`
- PR #174 hardens real-device follow-up UX: separated Location/partner-search status, actionable geolocation errors, 15-second low-accuracy mobile timeout, explicit Favorite/History differentiation, and `data/history-ui.js` in the atomic PWA shell.
- Verified browser/PWA deployment evidence: Pages run `32748690413` = success and Live Smoke run `32748752875` = success for deployed SHA `367162286d1e1452151df11dca805ed629bb5466`; read-only diagnostic run `32749016604` confirmed exact run metadata and public v15 assets, and temporary PR #175 was closed without merge.
- Live public `release-meta.json` matched deployed SHA `367162286d1e1452151df11dca805ed629bb5466` and live Service Worker marker `kinaraidee-beta-v15`.
- Diagnostic verification confirmed live Nearby separated Location status + `timeout:15000` and live Favorite/History helper badges.
- Historical v14 deployment/auth/accessibility evidence remains historical support only and is not reused as post-v15 device PASS.
- Canonical Group API v6 rejection-only probe run `32632951668` = success on main SHA `8eff6c10e9adb4bd78a2bd0526e4e03e7d4d06f3`; matching Supabase platform logs include version-6 chunked >8 KiB POST 413. This is backend rejection/deployment evidence only, not device or complete monitoring evidence.
- Historical persistent Surprise accessibility implementation remains present, but real TalkBack/VoiceOver acceptance is still required on the current v15 runtime.
- Regression guards include Surprise accessibility, Group Result, History Sync, PWA cache upgrade, iOS install hint, release consistency, runtime lineage, real-device contracts, Device UX and Group API source-contract checks.

## Beta Exit Evidence
- [ ] `BETA-RESULTS-TEMPLATE.md` กรอกจากข้อมูลจริงและมี Go decision
- [ ] `BETA-DAILY-LOG.md` / `BETA-RUN-LOG.md` มีหลักฐานรอบทดสอบที่ใช้ตัดสินใจ
- [ ] Android Chrome เครื่องจริงอย่างน้อย 3 รุ่นผ่าน core flow ตามกรณีที่รองรับ
- [ ] iPhone Safari เครื่องจริงอย่างน้อย 2 รุ่นผ่าน core flow ตามกรณีที่รองรับ
- [ ] iPadOS ถูกตรวจเมื่อมีอุปกรณ์จริง และไม่ใช้ผลจำลองแทน
- [ ] TC-01–TC-15 และ NF-01–NF-10 มีผล PASS/FAIL/N/A ที่ trace กลับไปยังอุปกรณ์ได้
- [x] Live-group completed 2/2 vote → final-result path มี same-device Android post-fix evidence ว่าแสดงผลกลุ่ม + reroll + handoff สำเร็จหลัง PR #42; ข้อนี้ไม่แทน multi-device matrix และไม่ถือเป็น fresh v6 device regression
- [ ] iPhone TC-08 Location allow path ถูก retest บน deployed v15 และ Issue #171 ปิดด้วย physical-device evidence; pre-fix v14 FAIL ห้ามใช้เป็น v15 result
- [ ] Favorite/History differentiation (`❤️ เมนูโปรด` / `👍 เลือกกิน`) ถูก retest บน deployed v15 และ Issue #172 ปิดด้วย physical-device evidence
- [ ] Surprise busy-state accessibility ถูก retest ด้วย TalkBack และ/หรือ VoiceOver บน deployed current v15 runtime พร้อมบันทึก evidence จริง
- [ ] Visible keyboard focus ถูกตรวจด้วย real keyboard/focus navigation บน deployed pages
- [ ] Reduced-motion behavior ถูกตรวจบน real platform ที่เปิด reduced-motion preference
- [ ] NF-07 ถูก retest จาก verifiable older-cache baseline ไป `kinaraidee-beta-v15`
- [ ] NF-05 iPhone/iPad install guidance + suppression/standalone ถูกตรวจบนอุปกรณ์จริง
- [x] TC-12 Partner application มี Android same-device evidence หลังเพิ่ม privacy acknowledgement fields และ backend fields ถูกยืนยัน; ยังไม่แทน cross-platform/full-matrix evidence
- [x] Android same-device regressions #38 (`Invalid Date`) และ #40 (favorite loss หลัง lock/resume) ถูก retest และบันทึกเป็น fixed ตาม `CURRENT-RELEASE.md`
- [ ] Member signup/login/password-reset interaction ผ่านบนอุปกรณ์จริงตาม scope; automated deployed-source checks ไม่แทนการสมัคร/เข้าสู่ระบบ/รับอีเมล reset และตั้งรหัสผ่านจริง
- [ ] Member cloud history / favorite persistence มี evidence ครบตาม device matrix ที่กำหนด ไม่อาศัย Android session เดียว
- [ ] Blocker = 0 และ Critical = 0
- [ ] FAIL ที่ยอมรับไว้มีเหตุผล/owner/แผนติดตามชัดเจน

## Deployment & Release Evidence
- [x] `LIVE-DEPLOYMENT-VERIFICATION.md` ระบุ current v15 runtime candidate / deployed commit SHA และ matching deployment evidence
- [x] GitHub Pages deployment ของ `367162286d1e1452151df11dca805ed629bb5466` สำเร็จและ trace กลับไปยัง commit ได้ — run `32748690413`
- [x] Public `release-meta.json` ถูกตรวจและมี deployed SHA `367162286d1e1452151df11dca805ed629bb5466` กับ live Service Worker marker `kinaraidee-beta-v15`
- [x] Corresponding Live Smoke ของ runtime SHA เดียวกันสำเร็จ — run `32748752875`
- [x] Read-only diagnostic run `32749016604` ยืนยัน exact Pages/Live Smoke run metadata, public `release-meta.json`, `sw.js` v15, Nearby v15 asset และ Favorite/History helper; temporary PR #175 closed without merge
- [x] Public URL / `sw.js` / release metadata ใช้ cache generation `kinaraidee-beta-v15` ตรงกันตาม trace evidence
- [x] Live deployed assets contain separated Location status, 15-second timeout and explicit Favorite/History badges
- [x] development-only files ที่ Live Smoke ตรวจไม่ถูกเผยแพร่ใน Pages artifact
- [ ] automated smoke/static/synthetic regression test ไม่ถูกใช้แทน real-device interaction หรือ assistive-technology test ที่จำเป็น — ต้องยืนยันจาก evidence set ตอนตัดสิน Beta/Commercial จริง

## Product
- [ ] ปุ่ม “ไม่รู้เลย — เลือกให้ฉันทันที” และ recommendation flow ผ่าน real-device test ตาม matrix บน current v15 scope ที่เกี่ยวข้อง
- [ ] double-tap/busy state/recovery/accessibility ผ่านบนอุปกรณ์ที่เกี่ยวข้อง; Surprise busy announcement ต้องมี post-deployment TalkBack/VoiceOver evidence
- [ ] visible keyboard focus และ reduced-motion behavior ผ่าน real-platform acceptance ตาม scope ที่กำหนด
- [ ] Group mode room/create/share/join/vote/completed result ผ่าน real-device flow ตาม matrix; Android device/session แรกมี scoped post-fix 2/2 final-result evidence แล้ว แต่ Group API v6 ยังไม่มี fresh multi-device regression จาก automated probe
- [ ] Feedback rating/type/status semantics และ Partner form labels/autocomplete/live status ผ่านบน platform/assistive technology ที่ใช้ทดสอบ
- [ ] ร้านใกล้ตัว / Location allow-deny / Maps fallback ผ่าน real-device test ตาม matrix; iPhone TC-08 pre-fix v14 FAIL ต้อง retest บน v15
- [ ] Favorite/History differentiation ใหม่ของ v15 ผ่าน physical-device retest; persistence evidence ก่อนหน้าไม่แทน visual acceptance
- [ ] partner result/click flow ผ่านด้วยข้อมูลร้านทดสอบหรือร้านจริงที่ตรวจสอบได้
- [ ] partner/fallback cards render ถูกต้องบน Android/iPhone ที่ใช้ทดสอบ
- [ ] Partner application ส่ง privacy acknowledgement evidence ได้จริงบน release candidate ล่าสุด; Android same-device/backend evidence มีแล้วแต่ full-matrix ยังเปิด
- [x] Android same-device member-history defects #38/#40 ผ่าน retest หลัง fixes ตาม evidence ที่บันทึก
- [ ] Member history sync/write-race behavior ผ่านบน device matrix ที่จำเป็นและไม่มี regression หลัง release candidate ล่าสุด
- [ ] PWA install, standalone, offline shell และ update จาก cache รุ่นเก่ามา `kinaraidee-beta-v15` ผ่านการทดสอบตาม platform ที่กำหนด
- [ ] iPhone/iPad Add to Home Screen guidance และ suppression หลัง “เข้าใจแล้ว” ทำงานตามที่ออกแบบ; synthetic implementation evidence ไม่แทน NF-05 device PASS
- [ ] Feedback flow ใช้งานจริงได้ตาม device/platform scope ที่กำหนด
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
- [ ] เปิด Supabase Auth leaked-password protection และ re-run Security Advisor; ติดตามใน Issue #11 — fresh advisor evidence ยังรายงาน WARN และ gate นี้ถูกบันทึกเป็น blocked by plan/configuration
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
- [x] Browser/PWA synthetic monitor mechanism มี historical successful run จริงที่ตรวจย้อนหลังได้; ข้อนี้ไม่ทำให้ current v15 Production monitoring ผ่าน เพราะยังขาด fresh current-runtime monitoring/owner/baseline/alert/escalation ตาม scope จริง
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
