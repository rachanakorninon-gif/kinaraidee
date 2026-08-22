# Kinaraidee — Current Release State

เอกสารนี้เป็นจุดอ้างอิงหลักสำหรับสถานะ release ปัจจุบัน เพื่อป้องกัน release/evidence drift ระหว่าง runtime, QA, deployment และเอกสาร

หลักการ: deployment, real-device result, ผู้ใช้, conversion, partner, payment หรือรายได้ จะถูกระบุว่า PASS/พร้อมใช้งานได้เมื่อมีหลักฐานจริงเท่านั้น

## Current source/runtime state

- Latest reviewed `main` lineage includes PR #54 `a7e93997c136fb3b2dcb3510fd21e28f42cd7429` (sync Android real-device evidence) followed by docs-only release-state synchronization.
- Current core browser/PWA runtime candidate: `6fadf04fdf647680b60df2ada9cb43f4659816dd` (merge PR #42).
- PWA cache marker: `kinaraidee-beta-v13`.
- PR #42 เป็น core runtime change ล่าสุด: restore completed live-group result bridge หลัง Android 2/2-vote final-result failure โดยคืน `useRemoteVotes(votes,setup)`, `window.KINARAIDEE_GROUP_MODE.showRemoteResult` และ deterministic group module loading.
- PR #37 แก้ member cloud-history timestamp mapping/fallback; PR #41 เพิ่ม stale-snapshot/write-race protection.
- PR #53 `ef1cdee9e5dd60677a544e36be02bb7d003ae6a6` เพิ่ม public diagnostic `deployment-check.html` และ Pages/Live Smoke wiring โดยไม่เปลี่ยน core app behavior, Service Worker generation, database, auth หรือ Group API behavior.
- PR #54 อัปเดต `BETA-DEVICE-MATRIX.md` และ `BETA-RUN-LOG.md` จาก evidence จริงใน Issue #5; unknown device model/OS/Chrome versions ถูกเก็บเป็น `not captured` ไม่ได้เดาเติม.
- Group API source/deployment lineage แยกจาก browser runtime; `GROUP-API-DEPLOYMENT-EVIDENCE.md` เป็น scoped evidence สำหรับ deployed `group-api` v2 payload ที่ตรวจในเวลานั้นเท่านั้น.

## Verified CI/static evidence

### PR #42 runtime-fix head

PR #42 head `d0afde6a6c6b819bfd078ebb4222738a7dad878b` มี recorded successful CI สำหรับ Beta integrity, Beta QA, Security Hygiene, Group Result Regression, History Sync Regression และ Release Consistency.

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

PR #54 head `839b8517e2d96aa3de25674b5f22a9503c2e47b2` มีผลสำเร็จที่บันทึกใน Issue #5 สำหรับ 8 PR checks: Security Hygiene `32591528640`, Beta integrity `32591528593`, Credential Scanner Regression `32591528503`, Group Result Regression `32591528512`, Release Metadata Regression `32591528637`, Release Consistency `32591528534`, Beta QA `32591528504`, History Sync Regression `32591528516`.

หลักฐาน CI/static ไม่แทน push-triggered GitHub Pages deployment, corresponding Live Smoke, Public URL verification หรือ real-device interaction testing.

## Deployment evidence

Status: **PARTIAL / DEPLOYMENT WORKFLOW TRACE STILL REQUIRED**

Deployment observability ปัจจุบันประกอบด้วย:

- Pages สร้าง `release-meta.json` ที่มี deployed SHA และ PWA cache marker.
- Live Smoke ตรวจ deployed SHA/cache marker และ completed group-result bridge markers.
- PR #53 เพิ่ม `deployment-check.html`, publish ผ่าน Pages artifact และบังคับ Live Smoke ให้ตรวจ probe/bridge markers บน public site.
- Release Metadata Regression ตรวจ contract ของ metadata/deployment-trace wiring แบบ static.

Do not infer complete deployment-gate success from source, PR/CI success, or the presence of deployment observability files alone.

ยังห้ามสรุป deployment gate ว่า PASS จนกว่าจะมี inspectable successful Pages run และ corresponding Live Smoke run ที่ trace กลับไปยัง deployment เดียวกัน. PR/CI success หรือการมี `deployment-check.html` ใน source ไม่ใช่หลักฐานแทนสองรายการนี้.

## Real-device regression status

### Group live result — completed 2/2 vote path

Status: **POST-FIX SAME-DEVICE RETEST RECORDED PASS / FULL MATRIX STILL OPEN**

Android session เดิมเคยถึง 2/2 votes แล้ว final-result button กลับหน้าแรกก่อน PR #42. หลัง fix มี evidence จริงใน Issue #5 และถูก sync เข้า PR #54 ว่า Android device #1 สามารถทำ **2/2 final result + repeated reroll + handoff to normal result** ได้สำเร็จบน session เดียวกัน.

หลักฐานนี้ปิด narrow interaction regression บน Android device #1 เท่านั้น. ยังไม่พิสูจน์ deployed Pages SHA, Android รุ่นอื่น หรือ iPhone behavior.

### Member-history regressions

- Issue #38 `Invalid Date`: **FIXED / SAME-DEVICE RETEST RECORDED**.
- Issue #40 favorite loss after lock/resume: **FIXED / SAME-DEVICE RETEST RECORDED**.

### Android device #1 evidence boundary

PR #54/Issue #5 บันทึก scoped same-device PASS evidence สำหรับ core recommendation flow, reroll/history/favorite, share/group invite, denied-location + Maps fallback, standalone/offline/recovery, Feedback submit + backend row confirmation, Partner validation/submission + privacy evidence fields, 404 recovery, background/lock state persistence และ live-group post-fix final result.

Device model, Android version และ Chrome version ไม่ได้ถูก capture จึงห้ามเดาเติม และผลนี้ไม่เท่ากับ full device matrix PASS. NF-07 old-cache upgrade และ NF-09 accessibility/assistive-technology evidence ยังเปิดอยู่.

## Public Beta gate impact

Public Beta is still **NOT COMPLETE** while required deployment and device evidence remains open.

Public Beta ยัง **NOT COMPLETE**. ขั้นต่ำที่ยังต้องมีหลักฐานจริง:

- successful GitHub Pages deployment trace สำหรับ current runtime หรือ runtime-equivalent descendant,
- corresponding successful Live Smoke trace และ deployed SHA/release metadata ที่ตรวจย้อนหลังได้,
- public `/deployment-check.html` / live asset verification สำหรับ deployed release,
- Android Chrome อย่างน้อย 3 device models — ปัจจุบันมี scoped evidence 1 device/model เท่านั้นและ exact model ยังไม่ captured,
- iPhone Safari อย่างน้อย 2 device models — ยังต้องมี evidence,
- TC-01–TC-15 / NF-01–NF-10 ที่เหลือ; โดยเฉพาะ TC-08 exact allow-location, NF-07 cache upgrade และ NF-09 accessibility/semantics,
- Blocker/Critical ที่เกี่ยวข้องกับ Beta = 0 ก่อน Beta acceptance.

Issue #5 เป็น primary Beta QA execution tracker และเป็นแหล่ง evidence ล่าสุดสำหรับ device QA.

## Commercial Readiness impact

Commercial launch ยัง **NO-GO** ขณะหลักฐาน/การตัดสินใจสำคัญยังไม่ครบ ได้แก่:

- Public Beta technical/device acceptance + Pages/Live Smoke trace,
- Supabase Auth leaked-password protection follow-up (Issue #11),
- `main` branch protection / required-check governance (Issue #35),
- Group API retention/deletion policy, anonymous abuse-control strategy, monitoring baseline และ Privacy/Operations decisions (Issue #45 / `GROUP-API-HARDENING-PLAN.md`),
- Production Privacy/Terms/controller/contact/retention/legal decisions,
- Production monitoring/support/backup/recovery/rollback drill evidence,
- Payment/Premium และ partner commercial evidence เฉพาะโมเดลที่เลือกเปิดจริง.

Repository `main` protection ยังต้องถือเป็น blocker จนกว่าจะมี enforcement จริง; การมี workflow files โดยไม่มี required-check enforcement ไม่เท่ากับ repository governance PASS.

No user-count, conversion, revenue, payment success, partner readiness, legal approval, complete deployment PASS, full device-matrix PASS หรือ Commercial GO ถูกอนุมานจากเอกสารนี้.

## Supersession rule

- Core browser/PWA runtime candidate = PR #42 / `6fadf04f...` จนกว่าจะมี core runtime change ใหม่.
- Deployment-observability baseline = PR #53 / `ef1cdee9...`.
- Latest QA evidence-sync baseline = PR #54 / `a7e93997...`.
- PR #53 เปลี่ยน diagnostic public asset + deployment workflows แต่ไม่เปลี่ยน core app behavior.
- PR #54 เปลี่ยน QA evidence documents จากผล actual-device ที่มีอยู่ ไม่สร้าง device result ใหม่.
- Group API backend deployment/source evidence ต้องติดตามแยกจาก browser/PWA deployment.
- เมื่อมี commit ใหม่ ให้ใช้ repository diff/PR files แยกว่าเป็น core runtime, diagnostic/deployment asset, QA evidence, workflow/docs หรือ backend change ก่อนย้าย candidate/evidence state.
