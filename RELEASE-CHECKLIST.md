# Kinaraidee — Commercial Release Checklist

ใช้เอกสารนี้หลัง Public Beta ผ่าน เพื่อเตรียมเปิดใช้งานเชิงพาณิชย์อย่างเป็นระบบ

หลักสำคัญ: ทุกช่องที่ทำเครื่องหมายผ่านต้องมีหลักฐานจริง เช่น real-device run, transaction test, policy ที่เผยแพร่จริง, partner agreement หรือ security review ห้ามผ่านจากการคาดเดา

## Current runtime candidate
- Current browser/PWA runtime candidate: `e5c19d048ae556153ebe66bdb4598ab0d168da97` (PR #164 member-auth runtime lineage)
- Runtime merge/deployed SHA: `b6300e5458f17195c72a72ffa7ed0000fee40e24` (PR #164 merged)
- Current Group API source candidate: `fefc29322ac13f7066038a663bfeb7091d218b8f` (PR #93), deployed as Supabase `group-api` ACTIVE version 6 with source blob `04e7f595ef73b9fdbdf377ba3b8936a818a109be` and bundle SHA-256 `e389ae3a6d5da19f81b909df6616524391825bdaef2ca568b522fbb3d8da2e52`.
- Expected Service Worker cache: `kinaraidee-beta-v14`
- PR #164 hardens public member/reset auth pages and Pages deployment scope; prior PR #134 visible-focus/reduced-motion hardening remains present in the unchanged v14 shell/runtime.
- Verified browser/PWA deployment evidence: Pages run `32737240239` = success and Live Smoke run `32737301309` = success for deployed SHA `b6300e5458f17195c72a72ffa7ed0000fee40e24`; read-only diagnostic run `32738157335` confirmed the exact run metadata and public auth-page state.
- Live public `release-meta.json` matched deployed SHA `b6300e5458f17195c72a72ffa7ed0000fee40e24` and live Service Worker marker `kinaraidee-beta-v14`; deployed member/reset pages passed the error-hygiene/8-character/reset-return contract and public `admin.html` returned 404.
- Historical scheduled Public Beta synthetic monitor run `32626732416` = success on repository SHA `058c41790970be91a397f01870210849e5a792c1`; it observed the then-current v13 deployment. This proves the monitor mechanism had a successful run historically, not that the current v14 runtime has a fresh scheduled-monitor PASS.
- Canonical Group API v6 rejection-only probe run `32632951668` = success on main SHA `8eff6c10e9adb4bd78a2bd0526e4e03e7d4d06f3`; matching Supabase platform logs include version-6 chunked >8 KiB POST 413. This is backend rejection/deployment evidence only, not device or complete monitoring evidence.
- Issue #69 is closed for the browser/PWA deployment-trace scope.
- Historical persistent Surprise accessibility runtime: `96b405460f29d0f410f255cc48c68c58e4621784` (PR #67); the implementation remains present in the current v14 runtime but real TalkBack/VoiceOver acceptance is still required.
- Historical first accessibility runtime: `75d467cb1118ff88a948a2be6bbc15dbc755779f` (PR #58 merged); real-device TalkBack retest of that implementation was recorded as FAIL for busy announcement.
- Historical live-group result bridge runtime: `6fadf04fdf647680b60df2ada9cb43f4659816dd` (PR #42 merged).
- PR #41 added member-history write/read race hardening; PR #37 fixed cloud-history timestamp shape (`created_at` → numeric `at` + fallback) to prevent `Invalid Date`.
- Regression guards include Surprise accessibility, Group Result, History Sync, PWA cache upgrade, iOS install hint, release consistency, runtime-lineage and Group API source-contract checks.
- Android same-device regression evidence for Issues #38/#40 and narrow live-group 2/2 final-result path is recorded in `CURRENT-RELEASE.md`; this does not equal a full device-matrix PASS and is not automatically re-scored by later browser/PWA or Group API changes.

## Beta Exit Evidence
- [ ] `BETA-RESULTS-TEMPLATE.md` กรอกจากข้อมูลจริงและมี Go decision
- [ ] `BETA-DAILY-LOG.md` / `BETA-RUN-LOG.md` มีหลักฐานรอบทดสอบที่ใช้ตัดสินใจ
- [ ] Android Chrome เครื่องจริงอย่างน้อย 3 รุ่นผ่าน core flow ตามกรณีที่รองรับ
- [ ] iPhone Safari เครื่องจริงอย่างน้อย 2 รุ่นผ่าน core flow ตามกรณีที่รองรับ
- [ ] iPadOS ถูกตรวจเมื่อมีอุปกรณ์จริง และไม่ใช้ผลจำลองแทน
- [ ] TC-01–TC-15 และ NF-01–NF-10 มีผล PASS/FAIL/N/A ที่ trace กลับไปยังอุปกรณ์ได้
- [x] Live-group completed 2/2 vote → final-result path มี same-device Android post-fix evidence ว่าแสดงผลกลุ่ม + reroll + handoff สำเร็จหลัง PR #42; ข้อนี้ไม่แทน multi-device matrix และไม่ถือเป็น fresh v6 device regression
- [ ] Surprise busy-state accessibility ถูก retest ด้วย TalkBack และ/หรือ VoiceOver บน deployed current v14 runtime พร้อมบันทึก evidence จริง
- [ ] Visible keyboard focus ของ v14 ถูกตรวจด้วย real keyboard/focus navigation บน deployed pages
- [ ] Reduced-motion behavior ของ v14 ถูกตรวจบน real platform ที่เปิด reduced-motion preference
- [ ] TC-10/nearby partner rendering และ NF-07 ถูก retest บน v14 ตาม device matrix ที่กำหนด
- [x] TC-12 Partner application มี Android same-device evidence หลังเพิ่ม privacy acknowledgement fields และ backend fields ถูกยืนยัน; ยังไม่แทน cross-platform/full-matrix evidence
- [x] Android same-device regressions #38 (`Invalid Date`) และ #40 (favorite loss หลัง lock/resume) ถูก retest และบันทึกเป็น fixed ตาม `CURRENT-RELEASE.md`
- [ ] Member signup/login/password-reset interaction ผ่านบนอุปกรณ์จริงตาม scope; automated deployed-source checks ไม่แทนการสมัคร/เข้าสู่ระบบ/รับอีเมล reset และตั้งรหัสผ่านจริง
- [ ] Member cloud history / favorite persistence มี evidence ครบตาม device matrix ที่กำหนด ไม่อาศัย Android session เดียว
- [ ] Blocker = 0 และ Critical = 0
- [ ] FAIL ที่ยอมรับไว้มีเหตุผล/owner/แผนติดตามชัดเจน

## Deployment & Release Evidence
- [x] `LIVE-DEPLOYMENT-VERIFICATION.md` ระบุ current v14 runtime candidate / deployed commit SHA และบันทึก matching deployment evidence
- [x] GitHub Pages deployment ของ `b6300e5458f17195c72a72ffa7ed0000fee40e24` สำเร็จและ trace กลับไปยัง commit ได้ — run `32737240239`
- [x] Public `release-meta.json` ถูกตรวจและมี deployed SHA `b6300e5458f17195c72a72ffa7ed0000fee40e24` กับ live Service Worker marker `kinaraidee-beta-v14`
- [x] Corresponding Live Smoke ของ runtime SHA เดียวกันสำเร็จ — run `32737301309`
- [x] Read-only diagnostic run `32738157335` ยืนยัน exact Pages/Live Smoke run metadata, public member/reset auth contract และ `admin.html` = 404 ของ deployment ปัจจุบัน
- [x] Public URL / `sw.js` / release metadata ใช้ cache generation `kinaraidee-beta-v14` ตรงกันตาม trace evidence
- [x] Live Smoke ตรวจ public assets, current live markers, v14 focus/reduced-motion source contracts, accessibility/group/PWA contracts, member/reset auth deployment contract, development-file exclusion และ traceable automated evidenceสำเร็จ
- [x] development-only files ที่ Live Smoke ตรวจไม่ถูกเผยแพร่ใน Pages artifact
- [x] Public Beta Monitor mechanism มี historical scheduled-run evidence (`32626732416` = success) แต่เป็นหลักฐานจาก v13; ห้ามใช้แทน fresh v14 monitor, Production monitoring หรือ Group API v6 monitoring evidence
- [ ] automated smoke/static/synthetic regression test ไม่ถูกใช้แทน real-device interaction หรือ assistive-technology test ที่จำเป็น — ต้องยืนยันจาก evidence set ตอนตัดสิน Beta/Commercial จริง

## Product
- [ ] ปุ่ม “ไม่รู้เลย — เลือกให้ฉันทันที” และ recommendation flow ผ่าน real-device test ตาม matrix
- [ ] double-tap/busy state/recovery/accessibility ผ่านบนอุปกรณ์ที่เกี่ยวข้อง; Surprise busy announcement ต้องมี post-deployment TalkBack/VoiceOver evidence บน current v14 runtime
- [ ] visible keyboard focus และ reduced-motion behavior ของ v14 ผ่าน real-platform acceptance ตาม scope ที่กำหนด
- [ ] Group mode room/create/share/join/vote/completed result ผ่าน real-device flow ตาม matrix; Android device/session แรกมี scoped post-fix 2/2 final-result evidence แล้ว แต่ Group API v6 ยังไม่มี fresh device regression จาก automated probe
- [ ] Feedback rating/type/status semantics และ Partner form labels/autocomplete/live status ผ่านบน platform/assistive technology ที่ใช้ทดสอบ
- [ ] ร้านใกล้ตัว / Location allow-deny / Maps fallback ผ่าน real-device test ตาม matrix
- [ ] partner result/click flow ผ่านด้วยข้อมูลร้านทดสอบหรือร้านจริงที่ตรวจสอบได้
- [ ] partner/fallback cards render ถูกต้องหลังเปลี่ยนเป็น DOM nodes/`textContent` บน Android/iPhone ที่ใช้ทดสอบ
- [ ] Partner application ส่ง privacy acknowledgement evidence ได้จริงบน release candidate ล่าสุด; Android same-device/backend evidence มีแล้วแต่ full-matrix ยังเปิด
- [x] Android same-device member-history defects #38/#40 ผ่าน retest หลัง fixes ตาม evidence ที่บันทึก
- [ ] Member history sync/write-race behavior ผ่านบน device matrix ที่จำเป็นและไม่มี regression หลัง release candidate ล่าสุด
- [ ] PWA install, standalone, offline shell และ update จาก cache รุ่นเก่ามา v14 ผ่านการทดสอบตาม platform ที่กำหนด
- [ ] iPhone/iPad Add to Home Screen guidance และ suppression หลัง “เข้าใจแล้ว” ทำงานตามที่ออกแบบ; deployed bootstrap wiring มีแล้วแต่ NF-05 real-device evidence ยังต้องเก็บ
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
- [x] Beta Partner application บันทึก Privacy notice version และ acknowledgement timestamp แล้วใน runtime lineage จาก `0624d7e4...`; ข้อนี้เป็น implementation/observed beta evidence เท่านั้น ไม่แทน Production Privacy/PDPA review
- [x] Data-governance draft ระบุ Group rooms/votes, expiry/cascade schema facts และ anonymous data-rights caution แล้วผ่าน PR #92; retention period/owner/legal basis ยังเป็น TBD และข้อนี้ไม่ใช่ legal/retention PASS
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
- [x] Database boundary ป้องกัน HTML tag delimiters ใน public partner-card text แล้วด้วย migration `guard_partner_public_text_against_html`; pre-check ไม่พบข้อมูลเดิมที่ละเมิด constraint และ Security Advisor ไม่พบ regression ใหม่
- [x] Partner-card renderer เปลี่ยนเป็น DOM nodes/`textContent` ตั้งแต่ v13 และ implementation ยังคงอยู่ใน current v14 lineage; static/implementation evidence มีแล้ว แต่ยังต้องมี real-device evidence ก่อนถือว่า Product gate ผ่าน
- [x] Group API PR #93 source/deployment parity ถูกยืนยันที่ ACTIVE v6 และ canonical rejection-only probe `32632951668` ผ่าน streamed chunked >8 KiB → 413 พร้อม matching version-6 platform logs; ข้อนี้เป็น input/resource/deployment evidence ไม่ใช่ complete anonymous abuse-control หรือ application-event monitoring PASS
- [x] Group API retention schema ถูกตรวจแบบ read-only และบันทึกใน `GROUP-API-RETENTION-SCHEMA-EVIDENCE.md`: `group_rooms.expires_at` default 24h และ `group_votes.room_id` ใช้ `ON DELETE CASCADE`; ข้อนี้เป็น schema evidence เท่านั้น ไม่ใช่ approved retention period, cleanup implementation หรือ cleanup PASS
- [ ] Group API retention period ถูกอนุมัติและ cleanup/purge mechanism ถูก implement + verify ว่าไม่ลบ active rooms และ cascade votes เฉพาะห้องที่เข้าเกณฑ์
- [ ] Group API application structured-event ingestion, monitoring baseline/owner และ complete anonymous rate/quota strategy ถูก verify ตาม Issue #45
- [ ] Partner API complete abuse-control / monitoring / retention controls ถูก verify นอกเหนือจาก scoped ACTIVE v15 rejection-only evidence
- [ ] `main` branch protection/ruleset + required release/security checks ถูกเปิดและทดสอบว่า failing required check block merge ได้จริง — Issue #35
- [ ] ตรวจ dependency/security findings และ `SECURITY.md`; Critical findings ต้องปิดก่อน release

## Operations
- [ ] Production monitoring / error reporting พร้อมช่องทางตรวจ incident
- [ ] Backup/recovery plan สำหรับข้อมูลสำคัญและมีผู้รับผิดชอบ
- [ ] Owner dashboard ใช้งานได้จริงกับข้อมูล Production
- [ ] ขั้นตอนรับและตอบ bug/support พร้อมช่องทางติดต่อ
- [x] Browser/PWA synthetic monitor mechanism มี historical run จริงที่ตรวจย้อนหลังได้ (`32626732416` success on v13); ข้อนี้ไม่ทำให้ current v14 scheduled monitoring หรือ Production monitoring ผ่าน เพราะยังขาด fresh v14 scheduled evidence และ backend application observability/baseline/owner/alert/escalation ตาม scope จริง
- [x] Release rollback procedure ถูกเขียนไว้ใน `ROLLBACK-RUNBOOK.md` และ PR #91 เพิ่ม traceable Group API/Supabase rollback evidence path
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
