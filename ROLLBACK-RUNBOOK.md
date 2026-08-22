# Kinaraidee — Release Rollback Runbook

เอกสารนี้กำหนดขั้นตอน rollback สำหรับ GitHub Pages/Public Beta และใช้เป็นส่วนหนึ่งของ Commercial Readiness ด้าน Operations

> สถานะ: **PROCEDURE WRITTEN / NOT YET DRILL-VERIFIED**
>
> การมีเอกสารนี้ **ไม่ถือว่า rollback test ผ่าน** จนกว่าจะมีการทดลองจริงใน environment ที่ปลอดภัยและบันทึกหลักฐานตามหัวข้อ Evidence Record ด้านล่าง

## วัตถุประสงค์

ใช้เมื่อ release ล่าสุดทำให้ core flow, PWA, privacy/security behavior หรือ public availability เกิด regression ที่มีผลกระทบมากกว่าการคง release ปัจจุบันไว้

## เงื่อนไขที่ควรพิจารณา rollback

- Public URL เปิดไม่ได้หรือ asset สำคัญ 404/5xx ต่อเนื่อง
- Core flow “ไม่รู้เลย” / recommendation / nearby restaurant ใช้งานไม่ได้ใน release ล่าสุด
- Service Worker ทำให้ผู้ใช้ค้างกับ app shell ที่เสียหรือ update ไม่สำเร็จ
- พบการเผยแพร่ development-only file, secret หรือข้อมูลที่ไม่ควร public
- พบ privacy/security regression ที่ควรหยุดการกระจาย release ทันที
- Live smoke หรือ real-device evidence พบ Blocker/Critical ที่เกิดจาก release ล่าสุด

## ห้ามทำ

- ห้ามทำเครื่องหมาย rollback ว่า PASS จากการอ่านโค้ดอย่างเดียว
- ห้ามแก้ประวัติ Git ด้วย force-push ไปที่ `main`
- ห้ามลบหลักฐาน release/incident เดิมเพื่อให้สถานะดูสะอาด
- ห้าม rollback database/schema แบบ destructive โดยไม่มี backup และแผน data migration แยกต่างหาก
- ห้ามถือว่า GitHub Actions success = ผู้ใช้ทุกอุปกรณ์ได้รับ Service Worker ใหม่แล้ว

## ก่อน rollback

1. ระบุ **bad release SHA** ที่กำลังมีปัญหา
2. ระบุ **last known good SHA** จาก commit/release ที่มีหลักฐาน QA/Deploy/Live Smoke ตามระดับที่เกี่ยวข้อง
3. บันทึกเหตุผล อาการ และ severity
4. ตรวจว่าปัญหาเป็น static app/release หรือมี backend/database change ร่วมด้วย
5. ถ้ามี secret exposure ให้ rotate/revoke secret ก่อนหรือพร้อมกับ rollback; การย้อนโค้ดอย่างเดียวไม่เพียงพอ

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

## Verification หลัง rollback

ต้องแยกหลักฐาน automated กับ real-device ออกจากกัน

### Automated evidence
- rollback commit SHA
- QA/Beta integrity results
- Pages deployment run
- Live Smoke run
- public `sw.js` cache generation
- ตรวจว่า development-only files ไม่ public

### Real-device evidence
- device/browser/version
- bad release ที่อุปกรณ์เคยได้รับ (ถ้าทราบ)
- rollback release SHA/cache generation
- core flow ที่ตรวจ
- PWA update/reopen/offline behavior ตามกรณี
- PASS/FAIL/N/A พร้อม defect link หาก FAIL

## Evidence Record

กรอกเมื่อมี rollback drill หรือ rollback จริง ห้ามกรอกผลสมมติ

- วันที่/เวลา:
- Incident/issue link:
- Bad release SHA:
- Last known good SHA:
- Rollback commit SHA:
- เหตุผล rollback:
- Severity:
- QA evidence:
- Pages deployment evidence:
- Live Smoke evidence:
- Real-device evidence:
- Service Worker/cache generation หลัง rollback:
- Backend/database action (ถ้ามี):
- Secret rotation (ถ้ามี):
- ผลสุดท้าย: PASS / FAIL / BLOCKED
- ผู้ตรวจ/ผู้รับผิดชอบ:
- Follow-up defects/actions:

## เกณฑ์ถือว่า rollback drill ผ่าน

จะถือว่า checklist ข้อ “Release rollback procedure ถูกเขียนและทดลองอย่างน้อยหนึ่งครั้งใน environment ที่ปลอดภัย” ผ่านได้เมื่อ:

1. มี rollback drill จริงที่ trace กลับไปยัง commit ได้
2. pipeline ที่จำเป็นไม่มี FAIL ที่ถูกละเลย
3. public deployment หลัง rollback ถูกตรวจจริง
4. ถ้า drill ครอบคลุม PWA ต้องมี real-device update evidence อย่างน้อยหนึ่งอุปกรณ์ที่เกี่ยวข้อง
5. มี Evidence Record ครบและไม่มีการเติม PASS จากการคาดเดา

จนกว่าจะครบทุกข้อ ให้คงสถานะ rollback drill เป็น **NOT VERIFIED** ใน `RELEASE-CHECKLIST.md`
