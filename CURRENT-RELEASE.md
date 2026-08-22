# Kinaraidee — Current Release State

เอกสารนี้เป็นจุดอ้างอิงหลักสำหรับสถานะ release ปัจจุบัน เพื่อป้องกัน release/evidence drift ระหว่าง runtime, QA, deployment และเอกสาร

หลักการ: deployment, real-device result, ผู้ใช้, conversion, partner, payment หรือรายได้ จะถูกระบุว่า PASS/พร้อมใช้งานได้เมื่อมีหลักฐานจริงเท่านั้น

## Current source/runtime state

- Latest reviewed `main`: `d20529a924305636a62e19960de453227555bfee` (merge PR #59).
- Current browser/PWA runtime candidate: `75d467cb1118ff88a948a2be6bbc15dbc755779f` (merge PR #58).
- PWA cache marker: `kinaraidee-beta-v13`.
- PR #58 เป็น runtime change ล่าสุด: เพิ่ม accessible busy-state announcement ให้ปุ่ม Surprise ผ่าน hidden `role=status` / `aria-live=assertive`, dynamic `aria-label`, `aria-disabled` และยืด busy interval เพื่อให้ assistive technology มีโอกาสประกาศสถานะ.
- PR #58 เพิ่ม `.github/workflows/surprise-accessibility-regression.yml` เป็น static contract guard; static PASS ไม่แทน TalkBack/VoiceOver real-device evidence.
- PR #59 `d20529a9...` เปลี่ยนเฉพาะ `deployment-check.html` เพื่อให้ public probe ตรวจ marker ของ Surprise accessibility fix; ไม่เปลี่ยน core app behavior เพิ่มจาก PR #58.
- PR #42 `6fadf04f...` ยังคงเป็น historical live-group result bridge baseline.
- PR #37 แก้ member cloud-history timestamp mapping/fallback; PR #41 เพิ่ม stale-snapshot/write-race protection.
- PR #53 เพิ่ม public diagnostic `deployment-check.html`; PR #54 sync Android real-device evidence ที่มีจริง.
- Group API source/deployment lineage แยกจาก browser runtime; `GROUP-API-DEPLOYMENT-EVIDENCE.md` เป็น scoped evidence สำหรับ deployed `group-api` payload ที่ตรวจในเวลานั้นเท่านั้น.

## Verified CI/static evidence

หลักฐาน CI/static ที่บันทึกไว้ก่อนหน้า (เช่น PR #42, PR #53, PR #54) ยังเป็น evidence เฉพาะ commit/head นั้น ๆ และไม่ถูกยกมาเป็น PASS ของ PR #58 โดยอัตโนมัติ.

PR #58 มี static accessibility regression guard อยู่ใน source และตรวจ contract ของ `data/home-surprise.js`; อย่างไรก็ตาม workflow file/implementation ไม่เท่ากับ successful run evidence จนกว่าจะมี run result ที่ตรวจย้อนกลับได้.

CI/static evidence ไม่แทน push-triggered GitHub Pages deployment, corresponding Live Smoke, Public URL verification หรือ real-device interaction/assistive-technology testing.

## Deployment evidence

Status: **PARTIAL / DEPLOYMENT WORKFLOW TRACE STILL REQUIRED**

Deployment observability ปัจจุบันประกอบด้วย:

- Pages สร้าง `release-meta.json` ที่มี deployed SHA และ PWA cache marker.
- Live Smoke ตรวจ deployed SHA/cache marker และ runtime markers ที่กำหนด.
- `deployment-check.html` ตรวจ live-group bridge และตั้งแต่ PR #59 ตรวจ Surprise accessibility source markers เพิ่ม.
- Release Metadata Regression ตรวจ contract ของ metadata/deployment-trace wiring แบบ static.

Do not infer complete deployment-gate success from source, PR/CI success, or the presence of deployment observability files alone.

ยังห้ามสรุป deployment gate ว่า PASS จนกว่าจะมี inspectable successful Pages run และ corresponding Live Smoke run ที่ trace กลับไปยัง deployment เดียวกันของ PR #58 หรือ descendant ที่พิสูจน์ว่า runtime-equivalent.

## Real-device regression status

### Surprise accessibility — PR #58

Status: **IMPLEMENTED / STATIC-GUARDED / REAL ASSISTIVE-TECH RETEST REQUIRED**

Implementation มี busy announcement contract แล้ว แต่ยังต้องมีผลจริงจาก TalkBack และ/หรือ VoiceOver ตาม test scope ก่อนปิด accessibility defect/gate. ห้ามนับ source markers หรือ deployment probe ว่าเป็น accessibility PASS.

### Group live result — completed 2/2 vote path

Status: **POST-FIX SAME-DEVICE RETEST RECORDED PASS / FULL MATRIX STILL OPEN**

Android session เดิมมี evidence จริงว่า 2/2 final result + repeated reroll + handoff to normal result สำเร็จหลัง PR #42 บน device/session เดียวกัน. หลักฐานนี้ไม่เท่ากับ full matrix PASS.

### Member-history regressions

- Issue #38 `Invalid Date`: **FIXED / SAME-DEVICE RETEST RECORDED**.
- Issue #40 favorite loss after lock/resume: **FIXED / SAME-DEVICE RETEST RECORDED**.

### Android device #1 evidence boundary

PR #54/Issue #5 บันทึก scoped same-device evidence สำหรับหลาย core flows. Device model, Android version และ Chrome version ไม่ได้ capture จึงห้ามเดาเติม และผลนี้ไม่เท่ากับ full device matrix PASS. NF-07 old-cache upgrade และ NF-09 accessibility/assistive-technology evidence ยังเปิดอยู่.

## Public Beta gate impact

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
- Current source descendant = PR #59 / `d20529a9...`; PR #59 เป็น deployment-probe change และไม่ supersede runtime behavior ของ PR #58.
- Historical group-result runtime baseline = PR #42 / `6fadf04f...`.
- Deployment-observability baseline เริ่มจาก PR #53 และถูกขยายโดย PR #59.
- Latest QA evidence-sync baseline = PR #54 / `a7e93997...`.
- Group API backend deployment/source evidence ต้องติดตามแยกจาก browser/PWA deployment.
- เมื่อมี commit ใหม่ ให้ใช้ repository diff/PR files แยกว่าเป็น runtime app, diagnostic/deployment asset, QA evidence, workflow/docs หรือ backend change ก่อนย้าย candidate/evidence state.
