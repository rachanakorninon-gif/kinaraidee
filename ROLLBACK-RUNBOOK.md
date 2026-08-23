# Kinaraidee — Release Rollback Runbook

เอกสารนี้กำหนดขั้นตอน rollback สำหรับ GitHub Pages/Public Beta และ backend ที่เกี่ยวข้อง และใช้เป็นส่วนหนึ่งของ Commercial Readiness ด้าน Operations

> สถานะ: **PROCEDURE WRITTEN / NOT YET DRILL-VERIFIED**
>
> การมีเอกสารนี้ **ไม่ถือว่า rollback test ผ่าน** จนกว่าจะมีการทดลองจริงใน environment ที่ปลอดภัยและบันทึกหลักฐานตามหัวข้อ Evidence Record ด้านล่าง

## วัตถุประสงค์

ใช้เมื่อ release ล่าสุดทำให้ core flow, PWA, privacy/security behavior, backend contract หรือ public availability เกิด regression ที่มีผลกระทบมากกว่าการคง release ปัจจุบันไว้

## เงื่อนไขที่ควรพิจารณา rollback

- Public URL เปิดไม่ได้หรือ asset สำคัญ 404/5xx ต่อเนื่อง
- Core flow “ไม่รู้เลย” / recommendation / nearby restaurant ใช้งานไม่ได้ใน release ล่าสุด
- Service Worker ทำให้ผู้ใช้ค้างกับ app shell ที่เสียหรือ update ไม่สำเร็จ
- Group API/backend release ล่าสุดทำให้ create/join/vote/read/close contract เสีย หรือเพิ่ม privacy/security exposure
- พบการเผยแพร่ development-only file, secret หรือข้อมูลที่ไม่ควร public
- พบ privacy/security regression ที่ควรหยุดการกระจาย release ทันที
- Live smoke, backend probe หรือ real-device evidence พบ Blocker/Critical ที่เกิดจาก release ล่าสุด

## ห้ามทำ

- ห้ามทำเครื่องหมาย rollback ว่า PASS จากการอ่านโค้ดอย่างเดียว
- ห้ามแก้ประวัติ Git ด้วย force-push ไปที่ `main`
- ห้ามลบหลักฐาน release/incident เดิมเพื่อให้สถานะดูสะอาด
- ห้าม rollback database/schema แบบ destructive โดยไม่มี backup และแผน data migration แยกต่างหาก
- ห้ามเดา backend rollback target จากเลข version อย่างเดียว; ต้อง trace กลับไปยัง repository source/evidence ที่ตรวจได้
- ห้ามถือว่า GitHub Actions success = ผู้ใช้ทุกอุปกรณ์ได้รับ Service Worker ใหม่แล้ว

## ก่อน rollback

1. ระบุ **bad release SHA** ที่กำลังมีปัญหา
2. ระบุ **last known good SHA** จาก commit/release ที่มีหลักฐาน QA/Deploy/Live Smoke/backend verification ตามระดับที่เกี่ยวข้อง
3. บันทึกเหตุผล อาการ และ severity
4. ตรวจว่าปัญหาเป็น static app/release หรือมี backend/database change ร่วมด้วย
5. ถ้ามี secret exposure ให้ rotate/revoke secret ก่อนหรือพร้อมกับ rollback; การย้อนโค้ดอย่างเดียวไม่เพียงพอ
6. ถ้า backend มีหลาย source/version ให้บันทึก current deployed function version, repository source candidate, source blob/hash และ intended rollback source ก่อนเปลี่ยน Production

## วิธี rollback สำหรับ GitHub Pages

แนวทางหลักคือสร้าง commit ใหม่ที่ **revert** การเปลี่ยนแปลงที่ทำให้เกิดปัญหา แล้วให้ pipeline ปกติ deploy ใหม่ แทนการ force-reset `main`

1. สร้าง branch จาก `main` ปัจจุบัน เช่น `rollback/<bad-sha-short>`
2. Revert commit/ชุด commit ที่ก่อ regression โดยคงประวัติ Git ไว้
3. ตรวจ diff ว่ามีเฉพาะการย้อนการเปลี่ยนแปลงที่ตั้งใจ
4. รัน QA ที่ repository รองรับ (`qa.yml`, `beta-check.yml` และ predeploy checks ที่เกี่ยวข้อง)
5. merge rollback commit ผ่านวิธีปกติของ repository
6. รอ GitHub Pages deployment ของ rollback commit สำเร็จ
7. ให้ `live-smoke.yml` ตรวจ public assets/recovery/PWA markers หลัง deployment
8. ตรวจ Public URL และ core flow บนอุปกรณ์จริงอย่างน้อยตามระดับ incident ที่จำเป็น

## Service Worker / PWA หลัง rollback

การ rollback โค้ดเว็บไม่ได้หมายความว่า client ทุกเครื่องจะย้อน cache ทันที

- Service Worker ที่ deploy หลัง rollback ต้องมี cache generation ที่ชัดเจนและไม่ชนกับ bad release
- ห้ามนำ cache name เดิมกลับมาใช้กับ asset คนละชุด
- ตรวจ update path จาก bad release → rollback release บนอุปกรณ์จริง
- ตรวจ refresh/reopen/standalone/offline behavior ตามกรณีที่ incident กระทบ
- หากต้องใช้ emergency cache-bust ให้บันทึกเหตุผลและ generation ที่ใช้

## Backend / Supabase

ถ้า incident เกี่ยวข้องกับ Supabase/RLS/Edge Functions/database:

- rollback frontend อย่างเดียวอาจไม่แก้ปัญหา
- schema/data rollback ต้องมี backup และ migration plan เฉพาะ
- RLS/security regression ให้เลือกการเปลี่ยนแปลงที่ลด exposure ก่อน แล้วจึง restore functionality
- secret ที่สงสัยว่ารั่วต้อง revoke/rotate ไม่ใช่เพียงลบออกจาก commit ล่าสุด
- Edge Function rollback ต้องใช้ source ที่ trace กลับไปยัง repository commit ได้ และหลัง deploy ต้อง inspect deployed version/source parity ใหม่

### Group API Edge Function rollback path

Group API เป็น public Edge Function โดย `verify_jwt=false` เพื่อรองรับ accountless invited-friend voting ดังนั้น rollback ต้องคง product/security invariants ที่จำเป็นและห้ามแก้ configuration แบบสุ่มเพื่อให้ incident หายชั่วคราว

**Current reference evidence ณ 2026-08-23 (ใช้เพื่อเตรียมความพร้อม ไม่ใช่คำสั่งให้ rollback):**

- current Group API source candidate: PR #87 / `3b2375e50368add46e8b683111c30ed41be75715`
- current inspected source blob: `9f6cadc6dd9385f8b786aeec56c7d87134cb9e39`
- current inspected deployment: Supabase `group-api` ACTIVE version 5
- current inspected bundle SHA-256: `d2f70b4345ce05af1c4645764f4de205695593b79ba4f165a7fdd7aef52bf150`
- current v5 rejection-only live verification: run `32631490603` on `524c185517b27c55c56218c8331b2a2ecec0f949`
- historical v4 source candidate: PR #83 / `a4237ce6746478caa8f0b9da60d4456b6dce4758`; v4 had inspected source/deployment parity and rejection-only live verification run `32629629579`

เลข/version ข้างต้นเป็น evidence anchors เท่านั้น. ก่อน incident rollback จริงต้องตรวจ `CURRENT-RELEASE.md`, current Supabase deployment และ incident scope ใหม่เสมอ เพราะ source candidate อาจเปลี่ยนไปแล้ว.

**ขั้นตอน Group API rollback:**

1. บันทึก bad backend source commit, current Supabase function version/status, deployed source/bundle hash และ incident symptoms ก่อนแก้ไข
2. เลือก rollback source จาก repository commit ที่มีหลักฐานเหมาะกับ contract ที่ต้องกู้คืน; ห้ามเลือกเพียงเพราะเป็น version ก่อนหน้า
3. เปรียบเทียบ bad source → rollback source โดยตรวจอย่างน้อย method contract, input validation, room expiry/state, host-token authorization, request-size protection, response security headers และ privacy-safe logging boundary
4. หาก rollback source เก่ากว่าจะไม่มี hardening ใหม่บางส่วน ให้บันทึก security trade-off และใช้ rollback เฉพาะเมื่อ incident severity ทำให้การย้อนนั้นปลอดภัยกว่าการคง bad release
5. Deploy Edge Function source ที่เลือกโดยคง `verify_jwt`/environment configuration ตาม approved product/security model; ห้ามนำ credential มาใส่ใน repository หรือ logs
6. Inspect function หลัง deploy: status/version, source payload, bundle hash และ `verify_jwt` แล้วบันทึก source/deployment parity
7. ใช้ non-mutating live rejection checks ที่เหมาะกับ rollback sourceก่อนทำ successful write test; แยก platform request-log evidence ออกจาก application structured-event ingestion
8. ถ้า incident/rollback เปลี่ยน behavior ของ create/join/vote/read/close ให้ทำ controlled positive flow และ real-device Group regression ตามระดับความเสี่ยงก่อนถือว่ากู้คืนสำเร็จ
9. Re-run Supabase Security/Performance Advisors หลัง backend/DDL change ตามขอบเขตที่เกี่ยวข้อง
10. อัปเดต `CURRENT-RELEASE.md`, Group API deployment evidence และ incident/Issue tracker ด้วย source candidate/deployment ใหม่ โดยไม่แก้ผล evidence เก่าให้กลายเป็น PASS

**สิ่งที่ Group API rollback ไม่แก้โดยอัตโนมัติ:**

- database schema/data migration ที่ incompatible
- leaked/compromised credential
- retention cleanup policy
- complete anonymous rate/quota strategy
- application structured-event observability/monitoring baseline
- frontend/PWA regression หรืออุปกรณ์ที่ cache runtime เก่า

## Verification หลัง rollback

ต้องแยกหลักฐาน automated, backend และ real-device ออกจากกัน

### Automated evidence
- rollback commit SHA
- QA/Beta integrity results
- Pages deployment run (ถ้า frontend/PWA เกี่ยวข้อง)
- Live Smoke run (ถ้า frontend/PWA เกี่ยวข้อง)
- public `sw.js` cache generation (ถ้า PWA เกี่ยวข้อง)
- ตรวจว่า development-only files ไม่ public

### Backend evidence
- bad backend source SHA / rollback source SHA
- Supabase function name + before/after version/status
- before/after source blob or bundle hash
- post-deploy source/deployment parity inspection
- scoped live probe/result ที่ไม่ mutate ก่อน และ positive flow เมื่อ incident scope ต้องใช้
- Security/Performance Advisor evidence ตามขอบเขต change
- database/schema action แยกจาก Edge Function source rollback

### Real-device evidence
- device/browser/version
- bad release ที่อุปกรณ์เคยได้รับ (ถ้าทราบ)
- rollback release SHA/cache generation
- core flow ที่ตรวจ
- PWA update/reopen/offline behavior ตามกรณี
- backend/group flow ที่ได้รับผลกระทบตาม incident scope
- PASS/FAIL/N/A พร้อม defect link หาก FAIL

## Evidence Record

กรอกเมื่อมี rollback drill หรือ rollback จริง ห้ามกรอกผลสมมติ

- วันที่/เวลา:
- Incident/issue link:
- Bad browser release SHA (ถ้ามี):
- Bad backend source SHA / function version (ถ้ามี):
- Last known good browser SHA (ถ้ามี):
- Selected rollback backend source SHA (ถ้ามี):
- Rollback commit SHA:
- Supabase function before → after version/status/hash (ถ้ามี):
- เหตุผล rollback:
- Severity:
- QA evidence:
- Pages deployment evidence:
- Live Smoke evidence:
- Backend source/deployment parity evidence:
- Backend live probe/positive-flow evidence:
- Real-device evidence:
- Service Worker/cache generation หลัง rollback:
- Database/schema action (ถ้ามี):
- Security/Performance Advisor evidence (ถ้ามี):
- Secret rotation (ถ้ามี):
- ผลสุดท้าย: PASS / FAIL / BLOCKED
- ผู้ตรวจ/ผู้รับผิดชอบ:
- Follow-up defects/actions:

## เกณฑ์ถือว่า rollback drill ผ่าน

จะถือว่า checklist ข้อ “Release rollback procedure ถูกเขียนและทดลองอย่างน้อยหนึ่งครั้งใน environment ที่ปลอดภัย” ผ่านได้เมื่อ:

1. มี rollback drill จริงที่ trace กลับไปยัง commit/source ได้
2. pipeline/verification ที่จำเป็นไม่มี FAIL ที่ถูกละเลย
3. ถ้า drill ครอบคลุม frontend/PWA: public deployment หลัง rollback ถูกตรวจจริง
4. ถ้า drill ครอบคลุม Group API/backend: post-deploy source/version parity และ scoped live behavior ถูกตรวจจริง
5. ถ้า drill ครอบคลุม PWA ต้องมี real-device update evidence อย่างน้อยหนึ่งอุปกรณ์ที่เกี่ยวข้อง
6. มี Evidence Record ครบและไม่มีการเติม PASS จากการคาดเดา

จนกว่าจะครบทุกข้อ ให้คงสถานะ rollback drill เป็น **NOT VERIFIED** ใน `RELEASE-CHECKLIST.md`
