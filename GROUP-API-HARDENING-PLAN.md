# Kinaraidee Group API Hardening Plan

เอกสารนี้กำหนด baseline และลำดับงานสำหรับ Issue #45 โดยไม่ถือว่าค่า retention, rate limit, legal basis หรือ production traffic policy ใดได้รับอนุมัติจนกว่าจะมีการตัดสินใจจริง

## Verified implementation baseline — 2026-08-22

ตรวจ Edge Function `group-api` ที่ deploy อยู่จริงแล้ว:

- Function status: ACTIVE, version 2
- `verify_jwt=false` โดยตั้งใจเพื่อรองรับผู้ร่วมโหวตจาก invite โดยไม่ต้องมีบัญชี
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

Baseline นี้เป็น source/runtime inspection เท่านั้น ไม่ใช่ real-device, load-test, abuse-test หรือ privacy/legal PASS

### Historical deployment/source parity — re-verification required after PR #63

PR #52 เคยบันทึกหลักฐานว่า Supabase `group-api` ซึ่งอยู่สถานะ ACTIVE version 2 ณ เวลาตรวจ ตรงกับ source mirror `supabase/functions/group-api/index.ts` ที่ตรวจใน repository โดย Supabase รายงาน deployed SHA-256 `4f12e48c55a782dbc00b13d739a2a4c72e22e751e9d16dc8e87fd89d4c5cb7bd` และ merge evidence อยู่ที่ `0caa8dd283dcb404f80f0296e92b8c4b652cb95e`.

PR #63 ถูก merge เข้า `main` ที่ `f683f8291e57501e0fde75b0e689324d0a65dfb4` และเปลี่ยน backend source โดยเพิ่ม privacy-safe structured operational events สำหรับ create/read/vote/close success/rejection/failure outcomes พร้อม regression guard ที่ห้าม event logging อ้าง room ID, host token, voter ID, tags, request headers หรือ request payloads โดยตรง

ดังนั้น parity evidence ของ v2 ก่อน PR #63 เป็น **historical evidence เท่านั้น** และต้องสร้าง deployment/version/source evidence ใหม่ก่อนอ้างว่าฟังก์ชันที่ ACTIVE อยู่มี observability source ล่าสุดนี้จริง

PR #63 head `527cfa0c0fc11d026f549132004b04d71f400662` มี inspectable PR CI evidence ว่า workflow สำคัญ รวม `Kinaraidee Group API Regression`, `Kinaraidee Security Hygiene`, Beta QA/integrity, Release Consistency และ regression suites ที่เกี่ยวข้อง จบด้วย `success`. ขอบเขตนี้เป็น source/CI evidence เท่านั้น ไม่ใช่ Supabase deploy, live log ingestion หรือ alerting evidence

### Static source-contract regression gate

Repository มี `.github/workflows/group-api-regression.yml` เพื่อกัน regression ของ invariants ที่ตรวจจาก source ได้ เช่น POST/OPTIONS-only behavior, 8 KiB body limit, response hardening, allowlists, room size/tag limits, room state/expiry checks, host-token authorization, room-full guard และ `(room_id,voter_id)` upsert contract

หลัง PR #63 gate เดียวกันตรวจ observability contract เพิ่ม: ต้องมี structured operational event markers สำหรับ create/vote/read/close outcomes และ reject direct sensitive identifiers/payload references ใน logging calls

Gate นี้เป็น **static source-contract evidence only** และไม่แทน Supabase deployment/version, live log ingestion, alerting, retention cleanup, abuse-control, production traffic, load/security testing หรือ real-device group flow

## Open hardening gaps

### 1. Retention and deletion

ข้อเท็จจริงปัจจุบัน:

- room มี `expires_at` และ API ปฏิเสธ room ที่หมดอายุ
- expiration ไม่เท่ากับ deletion; expired room/vote rows ยังต้องมี purge mechanism หาก policy กำหนดให้ลบ

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

PR #63 เพิ่ม implementation ระดับ source สำหรับ privacy-safe operational events แล้ว แต่สถานะยังเป็น **SOURCE IMPLEMENTED / LIVE INGESTION + BASELINE NOT VERIFIED**

เหตุการณ์ที่ source ปัจจุบันครอบคลุมรวม create/read/vote/close success, rejection/failure, `room_full`, `room_closed`, forbidden host-token attempts, `db_error`, request-too-large, invalid JSON/payload และ unknown action โดย payload จำกัดไว้ที่ bounded operational fields เช่น reason, size, voteCount และ isUpdate

ห้ามเติม count, rate, latency, error budget หรือ alert threshold จนกว่าจะวัดจริง และห้ามนับ PR/CI/static marker ว่าเป็น live monitoring evidence

ขั้นต่อไปของ monitoring ต้องมี:

- deploy current backend source และบันทึก version/source parity ใหม่
- verify ว่า structured events เข้า log/observability destination จริงโดยไม่เปิดเผย sensitive identifiers
- เก็บ traffic/error baseline จริงก่อนกำหนด threshold
- ระบุ owner, alert channel และ escalation/support path ที่ใช้งานจริง

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
7. Deploy และบันทึก deployment/version/source evidence ใหม่ทุกครั้งที่ backend source เปลี่ยน; parity evidence ก่อน PR #63 ห้ามใช้แทน current deployment proof
8. Verify privacy-safe operational events จาก live function และเก็บ monitoring baseline จริงก่อนตั้ง alert threshold
9. ทำ real-device group regression โดยเฉพาะ create → join → vote → 2/2 → final result

## Current blockers / decisions required

ยังไม่ควร mark Issue #45 ผ่านจนมีอย่างน้อย:

- approved retention period
- cleanup implementation + verification
- approved anonymous abuse-control strategy
- current Group API deployment/version/source parity หลัง PR #63
- live monitoring/log-ingestion verification + baseline จริงตามที่จำเป็น
- Privacy/Operations docs ที่สะท้อน policy จริง
- Security/Performance Advisor re-check หลัง backend changes ตามขอบเขตที่เกี่ยวข้อง

Observability implementation และ PR CI ของ PR #63 ช่วยปิดเฉพาะช่องว่างด้าน source instrumentation/static guard ไม่ได้ปิด deployment, monitoring baseline, retention, abuse-control, Privacy/Legal, load/security, real-device หรือ Commercial GO gate

ไม่มีข้อความในเอกสารนี้ที่หมายถึง Production, privacy, security, load, abuse-control, live monitoring หรือ real-device PASS
