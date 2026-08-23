# Kinaraidee Group API Hardening Plan

เอกสารนี้กำหนด baseline และลำดับงานสำหรับ Issue #45 โดยไม่ถือว่าค่า retention, rate limit, legal basis หรือ production traffic policy ใดได้รับอนุมัติจนกว่าจะมีการตัดสินใจจริง

## Verified implementation baseline — refreshed 2026-08-23

ตรวจ Edge Function `group-api` ที่ deploy อยู่จริงแล้ว:

- Function status: ACTIVE, version 4
- `verify_jwt=false` โดยตั้งใจเพื่อรองรับผู้ร่วมโหวตจาก invite โดยไม่ต้องมีบัญชี
- Supabase-reported deployed bundle SHA-256: `cec4b0678645b49266ed0cd0b826c05ff58e5a751466c0c2ff0899ebf161023c`
- deployed `index.ts` ที่ inspect ตรงกับ repository `supabase/functions/group-api/index.ts` ปัจจุบัน (blob `90de51709db9634fa4c396c9cd27bbe6de8619de`)
- Current backend source candidate: PR #83 / `a4237ce6746478caa8f0b9da60d4456b6dce4758`
- รับเฉพาะ `POST` / `OPTIONS`
- จำกัด request body จาก `content-length` ที่มากกว่า 8192 bytes
- `create_room` validate meal / budget / room size (2–6)
- Host token สร้างจาก random UUID สองชุดและ existing token rows ตรวจได้ว่าเป็น 64-hex shape
- `get_room` / `submit_vote` / host-only actions ตรวจ UUID-shaped `roomId` ก่อน query UUID column
- `get_votes` และ `close_room` ตรวจ 64-hex host-token shape ก่อน host-only DB lookup และตรวจ token จริงกับ room ก่อนอนุญาต
- `get_room` และ `submit_vote` ปฏิเสธ room ที่ closed/expired
- `submit_vote` จำกัด tags สูงสุด 3 และตรวจ allowlist
- `submit_vote` ปฏิเสธ voter ID ที่ยาวเกิน 120 characters แทนการ truncate แบบเงียบ
- `submit_vote` ป้องกันจำนวน voter เกิน room size และ upsert ด้วย `(room_id, voter_id)`
- Database access ใน function ใช้ service-role ฝั่ง server เท่านั้น
- Response ใช้ `Cache-Control: no-store` และ `X-Content-Type-Options: nosniff`
- source ปัจจุบันมี privacy-safe structured operational events สำหรับ create/read/vote/close success/rejection/failure outcomes
- event fields ถูกจำกัดไว้ที่ bounded operational fields เช่น `reason`, `size`, `voteCount`, `isUpdate`; source ที่ inspect ไม่ log room ID, host token, voter ID, tags, IP address, request headers หรือ request bodies โดยตรง

Baseline นี้เป็น source/deployment inspection และ scoped live rejection verification เท่านั้น ไม่ใช่ real-device, load-test, complete abuse-test, approved retention, live application-event monitoring baseline หรือ privacy/legal PASS

### Current deployment/source parity after PR #83

PR #83 ถูก squash-merge เข้า `main` ที่ `a4237ce6746478caa8f0b9da60d4456b6dce4758` และเพิ่ม identifier-shape/input hardening พร้อม static regression guards โดยไม่เปลี่ยน accountless invite model

หลัง merge ได้ deploy repository source เดียวกันเป็น Supabase `group-api` ACTIVE version 4 และ fresh function inspection ยืนยัน deployed source ตรงกับ repository blob `90de51709db9634fa4c396c9cd27bbe6de8619de` ดังนั้น deployment/source parity สำหรับ v4 เป็น **VERIFIED**

PR #84 / `1bec99be1dbdf253bed67610b354973897af253f` ไม่เปลี่ยน backend source แต่เพิ่ม rejection-only live probe เพื่อ verify deployed v4 behavior

### Static source-contract regression gate

Repository มี `.github/workflows/group-api-regression.yml` เพื่อกัน regression ของ invariants ที่ตรวจจาก source ได้ เช่น POST/OPTIONS-only behavior, 8 KiB body limit, response hardening, allowlists, room size/tag limits, room state/expiry checks, host-token authorization, room-full guard และ `(room_id,voter_id)` upsert contract

หลัง PR #83 gate เดียวกันตรวจเพิ่ม:

- UUID-shaped room IDs ก่อน relevant DB lookups
- 64-hex host-token shape checks สำหรับ host-only actions
- voter ID >120 characters ต้องถูก reject
- structured operational event markers สำหรับ create/vote/read/close outcomes
- reject direct sensitive identifiers/payload references ใน logging calls

Gate นี้เป็น **static source-contract evidence only** และไม่แทน Supabase deployment/version, application log ingestion, alerting, retention cleanup, complete abuse-control, production traffic, load/security testing หรือ real-device group flow

### Live v4 rejection regression evidence

PR #84 เพิ่ม `.github/workflows/group-api-live-observability-probe.yml` เพื่อเรียกเฉพาะ rejection paths ที่ไม่ mutate ข้อมูล

Run `32629629579` บน exact `main` SHA `1bec99be1dbdf253bed67610b354973897af253f` จบ `success` และ verify:

- GET unsupported → 405 `method_not_allowed`
- malformed `get_room.roomId` → 400 `invalid_room_id`
- malformed `submit_vote.roomId` → 400 `invalid_vote`
- malformed host-only room/token shapes → 403 `forbidden`
- voter ID 121 characters → 400 `invalid_vote`

Probe ไม่มี successful create/vote/update/close action จึงไม่สร้างหรือแก้ group data

Fresh Supabase platform logs ในช่วงเดียวกันแสดง version 4 GET/POST rejection invocations ด้วย 405/400/403 ตาม contract. นี่เป็น **live endpoint + platform request-log evidence** ไม่ใช่หลักฐานว่า application `console.log` structured JSON event ถูก ingest แล้ว

### Retention diagnostic regression gate

Repository มี `.github/workflows/group-retention-regression.yml` เพื่อป้องกัน `supabase/group-retention-diagnostic.sql` จากการเปลี่ยนจาก read-only diagnostic ไปเป็น mutation/DDL โดยไม่ตั้งใจ และตรวจว่า `GROUP-API-RETENTION-SCHEMA-EVIDENCE.md` ยังคงระบุ evidence boundary เรื่อง policy, cleanup และ Commercial GO อย่างชัดเจน

Fresh read-only baseline วันที่ 2026-08-23 สังเกต 16 rooms (13 expired / 3 active), 14 joined votes (8 ใน expired rooms / 6 ใน active rooms), orphan votes 0. ค่านี้เป็น observation ณ เวลานั้น ไม่ใช่ approved retention period หรือ cleanup PASS

## Open hardening gaps

### 1. Retention and deletion

ข้อเท็จจริงปัจจุบัน:

- room มี `expires_at` และ API ปฏิเสธ room ที่หมดอายุ
- expiration ไม่เท่ากับ deletion; expired room/vote rows ยังคงอยู่และต้องมี purge mechanism หาก policy ที่อนุมัติกำหนดให้ลบ
- schema evidence ยืนยันว่า `group_votes.room_id` อ้าง `group_rooms(id)` ด้วย `ON DELETE CASCADE`; นี่เป็น cleanup design invariant แต่ยังไม่ใช่ controlled cascade-deletion verification
- repository มี read-only `supabase/group-retention-diagnostic.sql` สำหรับเก็บ baseline จริงโดยไม่เลือก retention period และมี CI guard ป้องกัน mutation/DDL ในไฟล์ diagnostic

ก่อน implement cleanup ต้องมีการอนุมัติ:

- retention period หลัง `expires_at`
- exception/hold policy ถ้ามี
- owner ของ retention decision
- Privacy/Terms wording ที่สอดคล้องกัน

หลังอนุมัติจึง implement cleanup แบบ idempotent โดยมี guard ไม่ลบ active room และ verify vote cascade/FK behavior ด้วยข้อมูลทดสอบที่เหมาะสม

### 2. Anonymous abuse control

ข้อเท็จจริงปัจจุบัน:

- v4 ลด malformed-input/database-query abuse surface ด้วย UUID/token shape checks และ reject overlong voter IDs
- room size, tag count/allowlist, request-size limit และ room-full guard ยังทำงานอยู่
- inbound anonymous calls ไป Edge Function ไม่ได้รับผลจาก Supabase nested Edge Function rate limit ที่ประกาศสำหรับ function-to-function calls ภายใน request chain
- application code ยังไม่มี explicit per-client quota/rate limiter สำหรับ `create_room` หรือ `submit_vote`

ดังนั้น PR #83/v4 เป็น **partial abuse hardening** ไม่ใช่ complete anonymous abuse-control PASS

ก่อนเลือก control ขั้นถัดไปต้องกำหนดอย่างน้อย:

- traffic envelope ที่ยอมรับได้สำหรับ Public Beta และ Production
- identifier ที่อนุญาตให้ใช้เพื่อ rate limiting โดยคำนึงถึง privacy/NAT/shared networks
- response behavior เมื่อเกิน quota
- bypass/recovery path สำหรับ false positive

ตัวเลือกที่ประเมินได้หลังมี requirement: edge/WAF/platform control, application-level quota, database-backed limiter หรือ combination ที่ไม่ทำลาย accountless invite flow

### 3. Monitoring

Current monitoring status: **V4 DEPLOYMENT + LIVE REJECTION/PLATFORM LOGGING VERIFIED / APPLICATION EVENT INGESTION + BASELINE NOT VERIFIED**

- privacy-safe operational event code อยู่ใน deployed v4 source
- controlled PR #84 probe ยืนยันว่า v4 endpoint ถูกเรียกจริงและ platform request logs ถูก ingest
- available `get_logs` result แสดง method/status/execution/function/deployment/version แต่ไม่แสดง application `console.log` JSON payload ในผลที่ inspect
- จึงยังห้าม mark exact `component=group-api` application structured-event ingestion ว่าผ่าน
- probe latency ที่เห็นเป็น controlled rejection sequence เท่านั้น ไม่ใช่ production traffic baseline และห้ามนำไปตั้ง SLA/error budget โดยตรง

ขั้นต่อไปของ monitoring ต้องมี:

- observability surface ที่อ่าน application structured events ได้จริง หรือวิธีอื่นที่พิสูจน์ ingestion โดยไม่เปิด sensitive identifiers
- เก็บ traffic/error baseline จริงก่อนกำหนด threshold
- ระบุ owner, alert channel และ escalation/support path ที่ใช้งานจริง
- สร้าง deployment/version/source evidence ใหม่ทุกครั้งที่ backend source เปลี่ยน

### 4. Security invariants to preserve

ทุก implementation รอบถัดไปต้องคง invariants เหล่านี้:

- anonymous friend voting ยังทำงานได้ตาม product requirement
- service-role key ไม่ออกสู่ client/public artifact/log
- host-only actions ยัง require high-entropy host token
- malformed room/token identifiers ต้องไม่ถูกส่งเข้า relevant DB lookups โดยไม่ validate shape
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
8. Verify privacy-safe application events จาก live function และเก็บ monitoring baseline จริงก่อนตั้ง alert threshold
9. ทำ real-device group regression หลัง backend behavior ที่เกี่ยวข้องเปลี่ยน โดยเฉพาะ create → join → vote → 2/2 → final result

## Current blockers / decisions required

ยังไม่ควร mark Issue #45 ผ่านจนมีอย่างน้อย:

- approved retention period
- cleanup implementation + controlled verification
- approved complete anonymous abuse-control strategy
- application structured-event ingestion verification + monitoring baseline จริงตามที่จำเป็น
- owner / alert channel / escalation path สำหรับ monitoring ที่ใช้งานจริง
- Privacy/Operations docs ที่สะท้อน policy จริง
- Security/Performance Advisor re-check หลัง backend/DDL changes ตามขอบเขตที่เกี่ยวข้อง
- real-device regression ที่เหมาะสมหลัง backend changes เมื่อพร้อมทดสอบ

Current Group API v4 source/deployment parity และ rejection-only live contract ช่วยปิดเฉพาะ source/deployment/malformed-input verification gaps ไม่ได้ปิด retention, complete abuse-control, application observability, Privacy/Legal, load/security, real-device หรือ Commercial GO gate

ไม่มีข้อความในเอกสารนี้ที่หมายถึง Production, privacy, security, load, complete abuse-control, application live monitoring, real-device หรือ Commercial PASS
