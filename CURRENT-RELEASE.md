# Kinaraidee — Current Release State

เอกสารนี้เป็นจุดอ้างอิงหลักสำหรับสถานะ release ปัจจุบัน เพื่อป้องกัน release/evidence drift ระหว่าง runtime, QA, deployment และเอกสาร

หลักการ: deployment, real-device result, ผู้ใช้, conversion, partner, payment หรือรายได้ จะถูกระบุว่า PASS/พร้อมใช้งานได้เมื่อมีหลักฐานจริงเท่านั้น

## Current source/runtime state

- Latest reviewed `main` SHA: `a7e93997c136fb3b2dcb3510fd21e28f42cd7429` (merge PR #54; QA evidence synchronization). A later documentation-only `main` commit `96ae5f0b7fc9a6235c266d8e562915a76cb8c199` refreshed this release document through PR #53 state.
- Current core browser/PWA runtime candidate: `6fadf04fdf647680b60df2ada9cb43f4659816dd` (merge PR #42).
- PWA cache marker: `kinaraidee-beta-v13`.
- PR #42 เป็น core runtime change ล่าสุด: restore completed live-group result bridge หลัง Android 2/2-vote final-result failure โดยคืน `useRemoteVotes(votes,setup)`, `window.KINARAIDEE_GROUP_MODE.showRemoteResult` และ deterministic group module loading.
- PR #37 แก้ member cloud-history timestamp mapping/fallback; PR #41 เพิ่ม stale-snapshot/write-race protection. Same-device Android regressions #38 และ #40 มี recorded retest evidence แล้ว.
- Group API source/deployment lineage แยกจาก browser runtime; `GROUP-API-DEPLOYMENT-EVIDENCE.md` บันทึก scoped source parity สำหรับ deployed `group-api` v2 ที่ตรวจในเวลานั้นเท่านั้น.

### PR #53 deployment probe

PR #53 (`ef1cdee9...`) เพิ่ม public diagnostic asset `deployment-check.html` และ wiring ใน Pages/Live Smoke เพื่อให้ผู้ทดสอบตรวจได้ว่า deployed site มี group-result bridge และ PWA v13 markers โดยไม่เขียนข้อมูลผู้ใช้. PR นี้ไม่ได้เปลี่ยน core app behavior, Service Worker generation, database, auth หรือ Group API behavior แต่เพิ่ม public deployment-observability asset.

`deployment-check.html` เป็น diagnostic evidence helper เท่านั้น: การที่ source file มีอยู่หรือ static CI ผ่าน ไม่เท่ากับยืนยันว่า GitHub Pages deploy สำเร็จหรือ real-device group flow ผ่าน.

### PR #54 QA evidence synchronization

PR #54 (`a7e93997...`) อัปเดต `BETA-DEVICE-MATRIX.md` และ `BETA-RUN-LOG.md` จากหลักฐาน Android จริงที่บันทึกไว้ใน Issue #5 โดยไม่เดา device model / OS / browser version และคงช่องที่หลักฐานไม่พอไว้เป็น unverified.

## Verified CI/static evidence

### PR #42 runtime-fix head

PR #42 head `d0afde6a6c6b819bfd078ebb4222738a7dad878b` มี recorded successful CI สำหรับ Beta integrity, Beta QA, Security Hygiene, Group Result Regression, History Sync Regression และ Release Consistency ตาม run IDs ที่บันทึกไว้ก่อนหน้า.

### PR #53 deployment-probe head

PR #53 head `f3c6d6f7d905b39e99b92ae181b3175de5761ad1` มีผลสำเร็จที่ตรวจได้สำหรับ:
- Credential Scanner Regression — run `32589443114`
- Kinaraidee Beta QA — run `32589443133`
- Kinaraidee Security Hygiene — run `32589443121`
- Kinaraidee Release Metadata Regression — run `32589443150`
- Kinaraidee Release Consistency — run `32589443112`
- Group Result Regression — run `32589443111`
- Kinaraidee History Sync Regression — run `32589443118`
- Beta integrity checks — run `32589443151`

### PR #54 evidence-sync head

PR #54 head `839b8517e2d96aa3de25674b5f22a9503c2e47b2` มีผลสำเร็จที่ตรวจได้สำหรับ:
- Security Hygiene — run `32591528640`
- Beta integrity — run `32591528593`
- Credential Scanner Regression — run `32591528503`
- Group Result Regression — run `32591528512`
- Release Metadata Regression — run `32591528637`
- Release Consistency — run `32591528534`
- Beta QA — run `32591528504`
- History Sync Regression — run `32591528516`

หลักฐานข้างต้นเป็น PR/CI/static evidence เท่านั้น ไม่แทน push-triggered GitHub Pages deployment, corresponding Live Smoke, Public URL verification หรือ real-device interaction testing.

## Deployment evidence

Status: **PARTIAL / DEPLOYMENT WORKFLOW TRACE STILL REQUIRED**

Deployment observability ปัจจุบันประกอบด้วย:
- Pages สร้าง `release-meta.json` ที่มี deployed SHA และ PWA cache marker.
- Live Smoke ตรวจ deployed SHA/cache marker และ group-result bridge markers.
- PR #53 เพิ่ม `deployment-check.html`, publish ผ่าน Pages artifact และบังคับ Live Smoke ให้ตรวจ probe/bridge markers บน public site.
- Release Metadata Regression ตรวจ contract ของ metadata/deployment-trace wiring แบบ static.

ยังห้ามสรุป deployment gate ว่า PASS จนกว่าจะมี inspectable successful Pages run และ corresponding Live Smoke run ที่ trace กลับไปยัง deployment เดียวกัน. Source/PR CI success ไม่ใช่หลักฐานแทนสองรายการนี้.

Do not infer complete deployment-gate success from source lineage, PR CI, workflow configuration, or repository file presence alone.

## Real-device regression status

### Group live result — completed 2/2 vote path

Status: **POST-FIX ANDROID #1 REAL-DEVICE PASS RECORDED / MULTI-DEVICE + DEPLOYMENT TRACE STILL REQUIRED**

Android session เดิมก่อน PR #42 ยืนยัน room creation, invite sharing, participant sync และ 2/2 vote completion แต่ final-result step FAIL เพราะกด `🎉 ดูผลโหวตกลุ่ม` แล้วกลับหน้าแรก. PR #42 แก้ source path และมี regression CI แล้ว.

หลักฐาน Android ล่าสุดใน Issue #5 และที่ sync เข้า `BETA-RUN-LOG.md` / `BETA-DEVICE-MATRIX.md` บันทึกว่าบนอุปกรณ์/session เดียวกันภายหลังมี **group 2/2 final result + repeated reroll + handoff to normal result** ทำงานสำเร็จ. ดังนั้น narrow Android #1 final-result regression ไม่ควรแสดงว่า “รอ retest” อีกต่อไป.

ขอบเขต: PASS นี้ใช้กับ Android device/session ที่บันทึกไว้เท่านั้น และไม่พิสูจน์ deployed Pages SHA, Android รุ่นอื่น หรือ iPhone Safari.

### Member-history regressions

- Issue #38 `Invalid Date`: **FIXED / SAME-DEVICE RETEST RECORDED**.
- Issue #40 favorite loss after lock/resume: **FIXED / SAME-DEVICE RETEST RECORDED**.

### Other Android #1 evidence

Issue #5 / PR #54 records scoped real-device evidence for Surprise, guided flow, reroll, History/Favorite, denied-location fallback + Maps, PWA install/standalone reopen, offline cold start + offline recommendation + online recovery, Feedback, Partner privacy submission/backend confirmation, 404 recovery, and background/resume + lock/unlock result-state persistence.

ยังไม่ถือว่าครบสำหรับ TC-08 exact allow-location evidence, NF-04 update-specific evidence, NF-07 pre-v13 cache upgrade และ NF-09 accessibility/semantics.

## Public Beta gate impact

Public Beta is still **NOT COMPLETE**.

ขั้นต่ำที่ยังต้องมีหลักฐานจริง:
- successful Pages deployment trace สำหรับ runtime lineage ปัจจุบันและ public diagnostic assets,
- corresponding successful Live Smoke trace,
- Android Chrome อย่างน้อย 3 device models; ปัจจุบันมี evidence จาก Android device/session เดียวและ exact model/version ไม่ได้ capture,
- iPhone Safari อย่างน้อย 2 device models,
- TC-01–TC-15 / NF-01–NF-10 ที่เหลือพร้อม trace กลับไปยัง device/run,
- NF-07 upgrade จาก cache รุ่นก่อนหน้าไป `kinaraidee-beta-v13`,
- NF-09 accessibility/semantics evidence,
- Blocker/Critical ที่เกี่ยวข้องกับ Beta = 0 ก่อน Beta acceptance.

Issue #5 เป็น primary Beta QA execution tracker.

## Commercial Readiness impact

Commercial launch ยัง **NO-GO** ขณะหลักฐาน/การตัดสินใจสำคัญยังไม่ครบ ได้แก่:
- Public Beta technical/device acceptance + Pages/Live Smoke trace,
- Supabase Auth leaked-password protection follow-up (Issue #11),
- `main` branch protection / required-check governance (Issue #35),
- Group API retention/deletion policy, anonymous abuse-control strategy, monitoring baseline และ Privacy/Operations decisions (Issue #45 / `GROUP-API-HARDENING-PLAN.md`),
- Production Privacy/Terms/controller/contact/retention/legal decisions,
- Production monitoring/support/backup/recovery/rollback drill evidence,
- Payment/Premium และ partner commercial evidence เฉพาะโมเดลที่เลือกเปิดจริง.

`main` protection ยังต้องถือเป็น blocker จนกว่าจะมี enforcement จริง; การมี workflow files โดยไม่มี required-check enforcement ไม่เท่ากับ repository governance PASS.

No user-count, conversion, revenue, payment success, partner readiness, legal approval, complete deployment PASS, full device-matrix PASS หรือ Commercial GO ถูกอนุมานจากเอกสารนี้.

## Supersession rule

- Core browser/PWA runtime candidate = PR #42 / `6fadf04f...` จนกว่าจะมี core runtime change ใหม่.
- Deployment-observability baseline = PR #53 / `ef1cdee9...`.
- QA evidence synchronization baseline = PR #54 / `a7e93997...`.
- Group API backend deployment/source evidence ต้องติดตามแยกจาก browser/PWA deployment.
- เมื่อมี commit ใหม่ ให้ใช้ repository diff/PR files แยกว่าเป็น core runtime, diagnostic/deployment asset, workflow/docs หรือ backend change ก่อนย้าย candidate/evidence state.
