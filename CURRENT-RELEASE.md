# Kinaraidee — Current Release State

เอกสารนี้เป็นจุดอ้างอิงหลักสำหรับสถานะ release ปัจจุบัน เพื่อป้องกัน release/evidence drift ระหว่าง runtime, QA, deployment และเอกสาร

หลักการ: deployment, real-device result, ผู้ใช้, conversion, partner, payment หรือรายได้ จะถูกระบุว่า PASS/พร้อมใช้งานได้เมื่อมีหลักฐานจริงเท่านั้น

## Current source/runtime state

- Latest reviewed `main`: `77bbffd5f77723aacb9153891c019877c71b5944` (merge PR #62; QA/workflow-only runtime-lineage regression coverage; no browser/PWA runtime change).
- Current browser/PWA runtime candidate: `75d467cb1118ff88a948a2be6bbc15dbc755779f` (merge PR #58).
- PWA cache marker: `kinaraidee-beta-v13`.
- PR #58 เป็น runtime change ล่าสุด: เพิ่ม accessible busy-state announcement ให้ปุ่ม Surprise ผ่าน hidden `role=status` / `aria-live=assertive`, dynamic `aria-label`, `aria-disabled` และยืด busy interval เพื่อให้ assistive technology มีโอกาสประกาศสถานะ.
- PR #58 เพิ่ม `.github/workflows/surprise-accessibility-regression.yml` เป็น static contract guard; static PASS ไม่แทน TalkBack/VoiceOver real-device evidence.
- PR #59 `d20529a9...` เปลี่ยนเฉพาะ `deployment-check.html` เพื่อให้ public probe ตรวจ marker ของ Surprise accessibility fix; ไม่เปลี่ยน core app behavior เพิ่มจาก PR #58.
- PR #60 `984e5d8c...` เพิ่ม Pages predeploy/Live Smoke checks สำหรับ Surprise accessibility source contract และคืน explicit Public Beta incomplete invariant; ไม่เปลี่ยน browser/PWA runtime behavior.
- PR #61 `557010fb...` harden Public Beta synthetic monitor ให้ deployed SHA ต้องมี runtime candidate ปัจจุบันอยู่ใน lineage และตรวจ Surprise accessibility source markers บน live assets; เป็น monitoring/workflow evidence ไม่ใช่ runtime change หรือ device PASS.
- `d258cb49...` เพิ่ม Release Consistency guard ที่ fail เมื่อ `CURRENT-RELEASE.md` ประกาศ runtime candidate เก่าแต่มี browser/PWA runtime files เปลี่ยนหลัง candidate.
- `be1288b99...` เพิ่ม Pages predeploy guard แบบเดียวกัน เพื่อ block deployment หาก declared runtime candidate stale เมื่อเทียบกับ browser/PWA runtime files.
- PR #62 `77bbffd5...` เพิ่ม `.github/workflows/runtime-lineage-regression.yml` เพื่อ self-test ว่า candidate ปัจจุบัน clean, docs-only descendant ไม่ถูกนับเป็น runtime drift, synthetic runtime change ถูกตรวจจับ และ production lineage guards ยัง wired อยู่; ไม่เปลี่ยน browser/PWA runtime.
- Guards เหล่านี้ใช้ full git history (`fetch-depth: 0`) และตรวจ ancestry/diff ก่อนยอมรับ release lineage; การมี guard ไม่เท่ากับ successful deployment evidence.
- PR #42 `6fadf04f...` ยังคงเป็น historical live-group result bridge baseline.
- PR #37 แก้ member cloud-history timestamp mapping/fallback; PR #41 เพิ่ม stale-snapshot/write-race protection.
- PR #53 เพิ่ม public diagnostic `deployment-check.html`; PR #54 sync Android real-device evidence ที่มีจริง.
- Group API source/deployment lineage แยกจาก browser runtime; `GROUP-API-DEPLOYMENT-EVIDENCE.md` เป็น scoped evidence สำหรับ deployed `group-api` payload ที่ตรวจในเวลานั้นเท่านั้น.

## Verified CI/static evidence

หลักฐาน CI/static ที่บันทึกไว้ก่อนหน้า (เช่น PR #42, PR #53, PR #54) ยังเป็น evidence เฉพาะ commit/head นั้น ๆ และไม่ถูกยกมาเป็น PASS ของ PR #58 โดยอัตโนมัติ.

PR #58 มี static accessibility regression guard อยู่ใน source และตรวจ contract ของ `data/home-surprise.js`; อย่างไรก็ตาม workflow file/implementation ไม่เท่ากับ successful run evidence จนกว่าจะมี run result ที่ตรวจย้อนกลับได้.

PR #62 head `76e6e47672c4fdec3e1772b9e6eb0a87adc52e3a` มี inspectable pull-request workflow evidence: `Runtime Lineage Regression`, `Kinaraidee Beta QA`, `Beta integrity checks`, `Kinaraidee Release Consistency`, `Kinaraidee Security Hygiene`, `Credential Scanner Regression`, `Surprise Accessibility Regression`, `Group Result Regression`, `Kinaraidee Release Metadata Regression` และ `Kinaraidee History Sync Regression` จบด้วย `success`. ขอบเขต evidence นี้ยืนยันเฉพาะ CI/static/workflow contract ของ PR #62 ไม่ใช่ Pages deploy, Live Smoke, Public URL หรือ real-device PASS.

Release-lineage guards หลัง PR #61/PR #62 ป้องกัน stale declared runtime candidate ใน source/workflow configuration และมี regression self-test สำหรับ guard behavior แล้ว แต่ยังไม่ถือว่า Pages deploy หรือ Live Smoke ผ่านจนกว่าจะมีผล run ที่ตรวจได้.

CI/static evidence ไม่แทน push-triggered GitHub Pages deployment, corresponding Live Smoke, Public URL verification หรือ real-device interaction/assistive-technology testing.

## Deployment evidence

Status: **PARTIAL / DEPLOYMENT WORKFLOW TRACE STILL REQUIRED**

Deployment observability ปัจจุบันประกอบด้วย:

- Pages สร้าง `release-meta.json` ที่มี deployed SHA และ PWA cache marker.
- Live Smoke ตรวจ deployed SHA/cache marker และ runtime markers ที่กำหนด.
- `deployment-check.html` ตรวจ live-group bridge และตั้งแต่ PR #59 ตรวจ Surprise accessibility source markers เพิ่ม.
- PR #60 เพิ่ม predeploy/live checks ที่บังคับ Surprise accessibility source markers ก่อน/หลัง deploy แต่ workflow configuration หรือ source contract ยังไม่เท่ากับ successful deployment evidence.
- PR #61 เพิ่ม synthetic monitor lineage requirement ว่า deployed SHA ต้องเป็น descendant ของ current runtime candidate และอยู่ใน current `main` history.
- Release Consistency และ Pages predeploy ปัจจุบัน block stale declared runtime candidate เมื่อ browser/PWA runtime files เปลี่ยนหลัง candidate.
- PR #62 เพิ่ม regression self-test สำหรับ runtime-lineage guard logic; ไม่ใช่ deployment evidence.
- Release Metadata Regression ตรวจ contract ของ metadata/deployment-trace wiring แบบ static.

Do not infer complete deployment-gate success from source, PR/CI success, workflow guards, or the presence of deployment observability files alone.

ยังห้ามสรุป deployment gate ว่า PASS จนกว่าจะมี inspectable successful Pages run และ corresponding Live Smoke run ที่ trace กลับไปยัง deployment เดียวกันของ PR #58 หรือ descendant ที่พิสูจน์ว่า runtime-equivalent.

## Real-device regression status

### Surprise accessibility — PR #58

Status: **IMPLEMENTED / STATIC-GUARDED / REAL ASSISTIVE-TECH RETEST REQUIRED**

Implementation มี busy announcement contract แล้ว แต่ยังต้องมีผลจริงจาก TalkBack และ/หรือ VoiceOver ตาม test scope ก่อนปิด accessibility defect/gate. ห้ามนับ source markers, deployment probe หรือ synthetic monitor ว่าเป็น accessibility PASS.

### Group live result — completed 2/2 vote path

Status: **POST-FIX SAME-DEVICE RETEST RECORDED PASS / FULL MATRIX STILL OPEN**

Android session เดิมมี evidence จริงว่า 2/2 final result + repeated reroll + handoff to normal result สำเร็จหลัง PR #42 บน device/session เดียวกัน. หลักฐานนี้ไม่เท่ากับ full matrix PASS.

### Member-history regressions

- Issue #38 `Invalid Date`: **FIXED / SAME-DEVICE RETEST RECORDED**.
- Issue #40 favorite loss after lock/resume: **FIXED / SAME-DEVICE RETEST RECORDED**.

### Android device #1 evidence boundary

PR #54/Issue #5 บันทึก scoped same-device evidence สำหรับหลาย core flows. Device model, Android version และ Chrome version ไม่ได้ capture จึงห้ามเดาเติม และผลนี้ไม่เท่ากับ full device matrix PASS. NF-07 old-cache upgrade และ NF-09 accessibility/assistive-technology evidence ยังเปิดอยู่.

## Public Beta gate impact

Public Beta is still **NOT COMPLETE**.

Public Beta ยัง **NOT COMPLETE**. ขั้นต่ำที่ยังต้องมีหลักฐานจริง:

- successful GitHub Pages deployment trace สำหรับ PR #58 หรือ runtime-equivalent descendant,
- corresponding successful Live Smoke trace และ deployed SHA/release metadata ที่ตรวจย้อนหลังได้,
- public `/deployment-check.html` / live asset verification ที่เห็น Surprise accessibility markers ของ PR #58,
- Android Chrome อย่างน้อย 3 device models,
- iPhone Safari อย่างน้อย 2 device models,
- TC-01–TC-15 / NF-01–NF-10 ที่เหลือ; โดยเฉพาะ NF-07 และ NF-09,
- TalkBack/VoiceOver retest สำหรับ Surprise busy announcement ก่อน accessibility acceptance,
- Blocker/Critical ที่เกี่ยวข้องกับ Beta = 0 ก่อน Beta acceptance.

Issue #5 เป็น primary Beta QA execution tracker และเป็นแหล่ง evidence ล่าสุดสำหรับ device QA.

## Commercial Readiness impact

Commercial launch ยัง **NO-GO** ขณะหลักฐาน/การตัดสินใจสำคัญยังไม่ครบ ได้แก่:

- Public Beta technical/device/accessibility acceptance + Pages/Live Smoke trace,
- Supabase Auth leaked-password protection follow-up,
- `main` branch protection / required-check governance,
- Group API retention/deletion policy, anonymous abuse-control strategy, monitoring baseline และ Privacy/Operations decisions,
- Production Privacy/Terms/controller/contact/retention/legal decisions,
- Production monitoring/support/backup/recovery/rollback drill evidence,
- Payment/Premium และ partner commercial evidence เฉพาะโมเดลที่เลือกเปิดจริง.

Repository `main` protection ยังต้องถือเป็น blocker จนกว่าจะมี enforcement จริง; การมี workflow files โดยไม่มี required-check enforcement ไม่เท่ากับ repository governance PASS.

No user-count, conversion, revenue, payment success, partner readiness, legal approval, complete deployment PASS, full device-matrix PASS หรือ Commercial GO ถูกอนุมานจากเอกสารนี้.

## Supersession rule

- Current browser/PWA runtime candidate = PR #58 / `75d467cb...` จนกว่าจะมี runtime app change ใหม่.
- Latest reviewed source baseline = `77bbffd5...`; PR #62 เป็น QA/workflow-only descendant และไม่ supersede runtime behavior ของ PR #58. Commit ที่อัปเดตเอกสารนี้เองเป็น docs-only descendant ของ baseline ดังกล่าว.
- Historical group-result runtime baseline = PR #42 / `6fadf04f...`.
- Deployment-observability baseline เริ่มจาก PR #53, ถูกขยายโดย PR #59/#60/#61 และ stale-runtime deployment guards ล่าสุด.
- Latest QA evidence-sync baseline = PR #54 / `a7e93997...`.
- Group API backend deployment/source evidence ต้องติดตามแยกจาก browser/PWA deployment.
- เมื่อมี commit ใหม่ ให้ใช้ repository diff/PR files แยกว่าเป็น runtime app, diagnostic/deployment asset, QA evidence, workflow/docs หรือ backend change ก่อนย้าย candidate/evidence state.
