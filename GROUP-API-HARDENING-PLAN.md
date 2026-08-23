# Kinaraidee Group API Hardening Plan

เอกสารนี้กำหนด baseline และลำดับงานสำหรับ Issue #45 โดยไม่ถือว่าค่า retention, rate limit, legal basis หรือ production traffic policy ใดได้รับอนุมัติจนกว่าจะมีการตัดสินใจจริง

## Verified implementation baseline — refreshed 2026-08-23

ตรวจ Edge Function `group-api` ที่ deploy อยู่จริงแล้ว:

- Function status: ACTIVE, version 3
- `verify_jwt=false` โดยตั้งใจเพื่อรองรับผู้ร่วมโหวตจาก invite โดยไม่ต้องมีบัญชี
- Supabase-reported deployed bundle SHA-256: `3b4253c1ff9af3750d787b3cdb63b8c3547caf64cf3304d7b285534e1d5b2a07`
- deployed `index.ts` ที่ inspect ตรงกับ repository `supabase/functions/group-api/index.ts` ปัจจุบัน (blob `ca048e8513f2f4a16bc86838c940c74340a719f5`)
- รับเฉพาะ `POST` / `OPTIONS`
- จำกัด request body จาก `content-length` ที่มากกว่า 8192 bytes
- `create_room` validate meal / budget / room size (2–6)
- Host token สร้างจาก random UUID สองชุดและใช้กับ host-only actions
- `get_room` และ `submit_vote` ปฏิเสธ room ที่ closed/expired
- `submit_vote` จำกัด tags สูงสุด 3 และตรวจ allowlist
- `submit_vote` ป้องกันจำนวน voter เกิน room size และ upsert ด้วย `(room_id, voter_id)`
- `get_votes` และ `close_room` ตรวจ `hostToken`
- Database access ใน function ใช้ service-role ฝั่ง server เท่านั้น
- Response ใช้ `Cache-Control: no-store` และ `X-Content-Type-Options: nosniff`
- source ปัจจุบันมี privacy-safe structured operational events สำหรับ create/read/vote/close success/rejection/failure outcomes
- event fields ถูกจำกัดไว้ที่ bounded operational fields เช่น `reason`, `size`, `voteCount`, `isUpdate`; source ที่ inspect ไม่ log room ID, host token, voter ID, tags, IP address, request headers หรือ request bodies โดยตรง

Baseline นี้เป็น source/deployment inspection เท่านั้น ไม่ใช่ real-device, load-test, abuse-test, live-monitoring baseline หรือ privacy/legal PASS

### Current deployment/source parity after PR #63

PR #63 ถูก merge เข้า `main` ที่ `f683f8291e57501e0fde75b0e689324d0a65dfb4` และเปลี่ยน backend source โดยเพิ่ม privacy-safe structured operational events พร้อม regression guard ที่ห้าม event logging อ้าง sensitive identifiers/payloads โดยตรง

การ inspect วันที่ 2026-08-23 พบ Supabase `group-api` ACTIVE version 3 และ deployed `index.ts` ตรงกับ repository source หลัง PR #63 ดังนั้น deployment/source parity สำหรับ payload ที่ inspect เป็น **VERIFIED** แล้ว ส่วนหลักฐาน v2 ก่อนหน้านี้เก็บไว้เป็น historical evidence เท่านั้น

PR #63 head `527cfa0c0fc11d026f549132004b04d71f400662` มี inspectable PR CI evidence ว่า workflow สำคัญ รวม `Kinaraidee Group API Regression`, `Kinaraidee Security Hygiene`, Beta QA/integrity, Release Consistency และ regression suites ที่เกี่ยวข้อง จบด้วย `success`. ขอบเขตนี้เป็น source/CI evidence ไม่ใช่ live log ingestion หรือ alerting evidence

### Static source-contract regression gate

Repository มี `.github/workflows/group-api-regression.yml` เพื่อกัน regression ของ invariants ที่ตรวจจาก source ได้ เช่น POST/OPTIONS-only behavior, 8 KiB body limit, response hardening, allowlists, room size/tag limits, room state/expiry checks, host-token authorization, room-full guard และ `(room_id,voter_id)` upsert contract

หลัง PR #63 gate เดียวกันตรวจ observability contract เพิ่ม: ต้องมี structured operational event markers สำหรับ create/vote/read/close outcomes และ reject direct sensitive identifiers/payload references ใน logging calls

Gate นี้เป็น **static source-contract evidence only** และไม่แทน Supabase deployment/version, live log ingestion, alerting, retention cleanup, abuse-control, production traffic, load/security testing หรือ real-device group flow

### Retention diagnostic regression gate

Repository มี `.github/workflows/group-retention-regression.yml` เพื่อป้องกัน `supabase/group-retention-diagnostic.sql` จากการเปลี่ยนจาก read-only diagnostic ไปเป็น mutation/DDL โดยไม่ตั้งใจ และตรวจว่า `GROUP-API-RETENTION-SCHEMA-EVIDENCE.md` ยังคงระบุ evidence boundary เรื่อง policy, cleanup และ Commercial GO อย่างชัดเจน

Gate นี้เป็น **static repository evidence only** ไม่ใช่การอนุมัติ retention period, ไม่ได้ execute cleanup, ไม่ได้ verify cascade deletion และไม่ใช่ Privacy/Legal หรือ Commercial PASS

## Open hardening gaps

### 1. Retention and deletion

ข้อเท็จจริงปัจจุบัน:

- room มี `expires_at` และ API ปฏิเสธ room ที่หมดอายุ
- expiration ไม่เท่ากับ deletion; expired room/vote rows ยังต้องมี purge mechanism หาก policy กำหนดให้ลบ
- schema evidence ยืนยันว่า `group_votes.room_id` อ้าง `group_rooms(id)` ด้วย `ON DELETE CASCADE`; นี่เป็น cleanup design invariant แต่ยังไม่ใช่ cascade verification
- repository มี read-only `supabase/group-retention-diagnostic.sql` สำหรับเก็บ baseline จริงโดยไม่เลือก retention period และมี CI guard ป้องกัน mutation/DDL ในไฟล์ diagnostic

ก่อน implement ต้องมีการอนุมัติ:

- retention period หลัง `expires_at`
- exception/hold policy ถ้ามี
- owner ของ retention decision
- Privacy/Terms wording ที่สอดคล้องกัน

หลังอนุมัติจึง implement cleanup แบบ idempotent โดยมี guard ไม่ลบ active room และ verify vote cascade/FK behavior ด้วยข้อมูลทดสอบที่เหมาะสม

### 2. Anonymous abuse control

ข้อเท็จจริงปัจจุบัน:

- inbound anonymous calls ไป Edge Function ไม่ได้รับผลจาก Supabase nested Edge Function rate limit ที่ประกาศ 2026-03-11; limit ดังกล่าวใช้กับ function-to-function calls ภายใน request chain
- application code ปัจจุบันยังไม่มี explicit per-client quota/rate limiter สำหรับ `create_room` หรือ `submit_vote`

ก่อนเลือก control ต้องกำหนดอย่างน้อย:

- traffic envelope ที่ยอมรับได้สำหรับ Public Beta และ Production
- identifier ที่อนุญาตให้ใช้เพื่อ rate limiting โดยคำนึงถึง privacy/NAT/shared networks
- response behavior เมื่อเกิน quota
- bypass/recovery path สำหรับ false positive

ตัวเลือกที่ประเมินได้หลังมี requirement: edge/WAF/platform control, application-level quota, database-backed limiter หรือ combination ที่ไม่ทำลาย accountless invite flow

### 3. Monitoring

PR #63 เพิ่ม implementation ระดับ source สำหรับ privacy-safe operational events และ active v3 deployment/source parity ถูกตรวจแล้ว แต่สถานะ monitoring ยังเป็น **DEPLOYED SOURCE VERIFIED / LIVE INGESTION + BASELINE NOT VERIFIED**

เหตุการณ์ที่ source ปัจจุบันครอบคลุมรวม create/read/vote/close success, rejection/failure, `room_full`, `room_closed`, forbidden host-token attempts, `db_error`, request-too-large, invalid JSON/payload และ unknown action โดย payload จำกัดไว้ที่ bounded operational fields เช่น reason, size, voteCount และ isUpdate

การ query Edge Function logs ล่าสุดที่ตรวจในรอบเดียวกันยังไม่คืน v3 invocation/application-event record ที่ใช้พิสูจน์ live structured-event ingestion ได้; entries ที่เห็นเป็น request-level logs ของ v1/v2 ก่อนหน้า ดังนั้นห้าม mark live monitoring ว่าผ่านจาก deployment parity เพียงอย่างเดียว

ห้ามเติม count, rate, latency, error budget หรือ alert threshold จนกว่าจะวัดจริง และห้ามนับ PR/CI/static marker ว่าเป็น live monitoring evidence

ขั้นต่อไปของ monitoring ต้องมี:

- verify ว่า structured events จาก ACTIVE v3 เข้า log/observability destination จริงโดยไม่เปิดเผย sensitive identifiers
- เก็บ traffic/error baseline จริงก่อนกำหนด threshold
- ระบุ owner, alert channel และ escalation/support path ที่ใช้งานจริง
- สร้าง deployment/version/source evidence ใหม่ทุกครั้งที่ backend source เปลี่ยน

### 4. Security invariants to preserve

ทุก implementation รอบถัดไปต้องคง invariants เหล่านี้:

- anonymous friend voting ยังทำงานได้ตาม product requirement
- service-role key ไม่ออกสู่ client/public artifact/log
- host-only actions ยัง require high-entropy host token
- active rooms ต้องไม่ถูก cleanup โดย mistake
- input allowlists/room-size/tag limits ต้องไม่ถูกผ่อนโดยไม่มีเหตุผลและ test
- RLS/privilege model ต้องไม่ถูกขยายเพียงเพื่อให้ cleanup/rate limiting ทำงาน
- operational logs ต้องไม่บันทึก room IDs, host tokens, voter IDs, tags, IP addresses, request headers/bodies หรือ user-supplied payload โดยตรง

## Safe implementation sequence

1. ยืนยัน retention period / policy owner / privacy wording
2. เลือก abuse-control requirement จาก expected traffic และ privacy constraints
3. ทำ schema/function change ใน development-safe path
4. ทดสอบ positive + negative cases รวม active/expired/closed/full/invalid/forbidden
5. Re-run Supabase Security + Performance Advisors หลัง DDL/backend change ตามที่เกี่ยวข้อง
6. Commit migration/function source ที่ตรวจสอบได้เข้า repository
7. Deploy และบันทึก deployment/version/source evidence ใหม่ทุกครั้งที่ backend source เปลี่ยน
8. Verify privacy-safe operational events จาก live function และเก็บ monitoring baseline จริงก่อนตั้ง alert threshold
9. ทำ real-device group regression โดยเฉพาะ create → join → vote → 2/2 → final result

## Current blockers / decisions required

ยังไม่ควร mark Issue #45 ผ่านจนมีอย่างน้อย:

- approved retention period
- cleanup implementation + verification
- approved anonymous abuse-control strategy
- live monitoring/log-ingestion verification + baseline จริงตามที่จำเป็น
- owner / alert channel / escalation path สำหรับ monitoring ที่ใช้งานจริง
- Privacy/Operations docs ที่สะท้อน policy จริง
- Security/Performance Advisor re-check หลัง backend/DDL changes ตามขอบเขตที่เกี่ยวข้อง

Current Group API v3 deployment/source parity ช่วยปิดเฉพาะ deployment-parity gap หลัง PR #63 ไม่ได้ปิด monitoring baseline, retention, abuse-control, Privacy/Legal, load/security, real-device หรือ Commercial GO gate

ไม่มีข้อความในเอกสารนี้ที่หมายถึง Production, privacy, security, load, abuse-control, live monitoring หรือ real-device PASS
