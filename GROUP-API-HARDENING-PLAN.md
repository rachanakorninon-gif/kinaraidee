# Kinaraidee Group API Hardening Plan

เอกสารนี้กำหนด baseline และลำดับงานสำหรับ Issue #45 โดยไม่ถือว่าค่า retention, rate limit, legal basis หรือ production traffic policy ใดได้รับอนุมัติจนกว่าจะมีการตัดสินใจจริง

## Verified implementation baseline — refreshed 2026-08-23

ตรวจ Edge Function `group-api` ที่ deploy อยู่จริงแล้ว:

- Function status: ACTIVE, version 6
- `verify_jwt=false` โดยตั้งใจเพื่อรองรับผู้ร่วมโหวตจาก invite โดยไม่ต้องมีบัญชี
- Supabase-reported deployed bundle SHA-256: `e389ae3a6d5da19f81b909df6616524391825bdaef2ca568b522fbb3d8da2e52`
- deployed `index.ts` ที่ inspect ตรงกับ repository `supabase/functions/group-api/index.ts` ปัจจุบัน (blob `04e7f595ef73b9fdbdf377ba3b8936a818a109be`)
- Current backend source candidate: PR #93 / `fefc29322ac13f7066038a663bfeb7091d218b8f`
- รับเฉพาะ `POST` / `OPTIONS`
- request-size contract = 8192 bytes: ใช้ `Content-Length` เป็น cheap early reject และใช้ bounded `ReadableStream` reader เป็น authoritative guard
- reader นับ `value.byteLength` ของแต่ละ chunk และ `reader.cancel()` ทันทีเมื่อเกิน byte budget แทนการ buffer body ใหญ่มากทั้งก้อนก่อน reject
- UTF-8 ถูก decode ด้วย `TextDecoder('utf-8',{fatal:true})`; JSON parse เกิดหลัง bounded read สำเร็จเท่านั้น
- direct `req.json()` และ full-body `req.text()` parsing ถูกห้ามด้วย static regression gate
- `create_room` validate meal / budget / room size (2–6)
- Host token สร้างจาก random UUID สองชุดและตรวจได้ว่าเป็น 64-hex shape
- `get_room` / `submit_vote` / host-only actions ตรวจ UUID-shaped `roomId` ก่อน query UUID column
- `get_votes` และ `close_room` ตรวจ 64-hex host-token shape ก่อน host-only DB lookup และตรวจ token จริงกับ room ก่อนอนุญาต
- `get_room` และ `submit_vote` ปฏิเสธ room ที่ closed/expired
- `submit_vote` จำกัด tags สูงสุด 3 และตรวจ allowlist
- `submit_vote` ปฏิเสธ voter ID ที่ยาวเกิน 120 characters แทนการ truncate แบบเงียบ
- `submit_vote` ป้องกันจำนวน voter เกิน room size และ upsert ด้วย `(room_id, voter_id)`
- Database access ใน function ใช้ service-role ฝั่ง server เท่านั้น
- Response ใช้ `Cache-Control: no-store` และ `X-Content-Type-Options: nosniff`
- source ปัจจุบันมี privacy-safe structured operational events สำหรับ create/read/vote/close success/rejection/failure outcomes
- event fields ถูกจำกัดไว้ที่ bounded operational fields เช่น `reason`, `size`, `voteCount`, `isUpdate`; source ที่ inspect ไม่ log room ID, host token, voter ID, tags, IP address, request headers/bodies หรือ user-supplied payload โดยตรง

Baseline นี้เป็น source/deployment inspection และ scoped live rejection verification เท่านั้น ไม่ใช่ real-device, load-test, complete abuse-test, approved retention, live application-event monitoring baseline หรือ privacy/legal PASS

### Current deployment/source parity after PR #93

PR #93 merge เข้า `main` ที่ `fefc29322ac13f7066038a663bfeb7091d218b8f` และเพิ่ม bounded streaming request-body enforcement พร้อม static regression guards โดยไม่เปลี่ยน accountless invite model

หลัง merge ได้ deploy repository source เดียวกันเป็น Supabase `group-api` ACTIVE version 6 และ fresh function inspection ยืนยัน deployed source ตรงกับ repository blob `04e7f595ef73b9fdbdf377ba3b8936a818a109be` ดังนั้น deployment/source parity สำหรับ v6 เป็น **VERIFIED**

PR #95 / `8eff6c10e9adb4bd78a2bd0526e4e03e7d4d06f3` ไม่เปลี่ยน backend source แต่ refresh canonical rejection-only live probe wording เพื่อ verify streamed guard ของ deployed v6

### Static source-contract regression gate

Repository มี `.github/workflows/group-api-regression.yml` เพื่อกัน regression ของ invariants ที่ตรวจจาก source ได้ เช่น POST/OPTIONS-only behavior, actual 8 KiB body limit, response hardening, allowlists, room size/tag limits, room state/expiry checks, host-token authorization, room-full guard และ `(room_id,voter_id)` upsert contract

Gate ปัจจุบันตรวจเพิ่ม:

- UUID-shaped room IDs ก่อน relevant DB lookups
- 64-hex host-token shape checks สำหรับ host-only actions
- voter ID >120 characters ต้องถูก reject
- `maxRequestBytes=8192`
- `req.body.getReader()` bounded stream path
- raw chunk-byte counting และ `reader.cancel()` เมื่อเกิน limit
- fatal UTF-8 decoder และ JSON parse หลัง bounded read เท่านั้น
- reject direct `req.json()` และ direct `req.text()` buffering
- structured operational event markers สำหรับ create/vote/read/close outcomes
- reject direct sensitive identifiers/request-body references ใน logging calls

Gate นี้เป็น **static source-contract evidence only** และไม่แทน Supabase deployment/version, application log ingestion, alerting, retention cleanup, complete abuse-control, production traffic, load/security testing หรือ real-device group flow

### Live v6 rejection regression evidence

Canonical `.github/workflows/group-api-live-observability-probe.yml` run `32632951668` บน exact `main` SHA `8eff6c10e9adb4bd78a2bd0526e4e03e7d4d06f3` จบ `success`.

PR #94 diagnostic ผ่าน rejection contract เดียวกันบน deployed v6 ก่อนถูกปิดโดยไม่ merge และ PR #96 ใช้ trace official workflow-run metadata ก่อนถูกปิดโดยไม่ mergeหลัง capture evidence.

Verified rejection contract:

- GET unsupported → 405 `method_not_allowed`
- malformed `get_room.roomId` → 400 `invalid_room_id`
- malformed `submit_vote.roomId` → 400 `invalid_vote`
- malformed host-only room/token shapes → 403 `forbidden`
- voter ID 121 characters → 400 `invalid_vote`
- HTTP/1.1 chunked body >8192 bytes → 413 `request_too_large`

Probe ไม่มี successful create/vote/update/close action จึงไม่สร้างหรือแก้ group data

Fresh Supabase platform logs ในช่วง canonical run แสดง version 6 invocations ด้วย 405/400/403/413 ตาม contract โดยมี POST 413 ที่ `2026-08-23T10:08:47.714000` บน deployment version 6 นี่เป็น **live endpoint + platform request-log evidence** ไม่ใช่หลักฐานว่า application `console.log` structured JSON event ถูก ingest แล้ว

### Retention diagnostic regression gate

Repository มี `.github/workflows/group-retention-regression.yml` เพื่อป้องกัน `supabase/group-retention-diagnostic.sql` จากการเปลี่ยนจาก read-only diagnostic ไปเป็น mutation/DDL โดยไม่ตั้งใจ และตรวจว่า `GROUP-API-RETENTION-SCHEMA-EVIDENCE.md` ยังคงระบุ evidence boundary เรื่อง policy, cleanup และ Commercial GO อย่างชัดเจน

Fresh read-only baseline วันที่ 2026-08-23 สังเกต 16 rooms (13 expired / 3 active), 14 joined votes (8 ใน expired rooms / 6 ใน active rooms), orphan votes 0. ค่านี้เป็น observation ณ เวลานั้น ไม่ใช่ approved retention period หรือ cleanup PASS. ค่า default `expires_at` ประมาณ 24 ชั่วโมงเป็น product expiry behavior ไม่ใช่ approved retention period.

## Open hardening gaps

### 1. Retention and deletion

ข้อเท็จจริงปัจจุบัน:

- room มี `expires_at` และ API ปฏิเสธ room ที่หมดอายุ
- expiration ไม่เท่ากับ deletion; expired room/vote rows ยังคงอยู่และต้องมี purge mechanism หาก policy ที่อนุมัติกำหนดให้ลบ
- schema evidence ยืนยันว่า `group_votes.room_id` อ้าง `group_rooms(id)` ด้วย `ON DELETE CASCADE`; นี่เป็น cleanup design invariant แต่ยังไม่ใช่ controlled cascade-deletion verification
- repository มี read-only `supabase/group-retention-diagnostic.sql` สำหรับเก็บ baseline จริงโดยไม่เลือก retention period และมี CI guard ป้องกัน mutation/DDL ในไฟล์ diagnostic
- `DATA-GOVERNANCE-DRAFT.md` ระบุ Group rooms/votes เป็น data class แยกและคง period/owner/legal basis เป็น TBD จนกว่าจะอนุมัติจริง

ก่อน implement cleanup ต้องมีการอนุมัติ:

- retention period หลัง `expires_at`
- exception/hold policy ถ้ามี
- owner ของ retention decision
- Privacy/Terms wording ที่สอดคล้องกัน

หลังอนุมัติจึง implement cleanup แบบ idempotent โดยมี guard ไม่ลบ active room และ verify vote cascade/FK behavior ด้วยข้อมูลทดสอบที่เหมาะสม

### 2. Anonymous abuse control

ข้อเท็จจริงปัจจุบัน:

- v6 ลด malformed-input/database-query abuse surface ต่อจากรุ่นก่อน และลด resource-abuse surface ของ oversized chunked/missing-length body ด้วย bounded streaming + early cancel
- room size, tag count/allowlist, request-size limit และ room-full guard ยังทำงานอยู่
- application code ยังไม่มี approved complete per-client quota/rate limiter สำหรับ `create_room` หรือ `submit_vote`

ดังนั้น PR #93/v6 เป็น **partial abuse hardening** ไม่ใช่ complete anonymous abuse-control PASS

ก่อนเลือก control ขั้นถัดไปต้องกำหนดอย่างน้อย:

- traffic envelope ที่ยอมรับได้สำหรับ Public Beta และ Production
- identifier ที่อนุญาตให้ใช้เพื่อ rate limiting โดยคำนึงถึง privacy/NAT/shared networks
- response behavior เมื่อเกิน quota
- bypass/recovery path สำหรับ false positive

ตัวเลือกที่ประเมินได้หลังมี requirement: edge/WAF/platform control, application-level quota, database-backed limiter หรือ combination ที่ไม่ทำลาย accountless invite flow

### 3. Monitoring

Current monitoring status: **V6 DEPLOYMENT + LIVE REJECTION/PLATFORM LOGGING VERIFIED / APPLICATION EVENT INGESTION + BASELINE NOT VERIFIED**

- privacy-safe operational event code อยู่ใน deployed v6 source
- canonical run `32632951668` ยืนยันว่า v6 endpoint ถูกเรียกจริง รวม streamed actual-body 413 path และ platform request logs ถูก ingest
- available Supabase log result แสดง method/status/execution/function/deployment/version แต่ไม่แสดง application `console.log` JSON payload ในผลที่ inspect
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
- actual request body >8192 bytes ต้องถูก reject แม้ `Content-Length` ไม่มี/ใช้ chunked transfer และ reader ต้องหยุดเมื่อเกิน budget ตาม v6 contract
- active rooms ต้องไม่ถูก cleanup โดย mistake
- input allowlists/room-size/tag limits ต้องไม่ถูกผ่อนโดยไม่มีเหตุผลและ test
- RLS/privilege model ต้องไม่ถูกขยายเพียงเพื่อให้ cleanup/rate limiting ทำงาน
- operational logs ต้องไม่บันทึก room IDs, host tokens, voter IDs, tags, IP addresses, request headers/bodies หรือ user-supplied payload โดยตรง

## Safe implementation sequence

1. ยืนยัน retention period / policy owner / privacy wording
2. เลือก abuse-control requirement จาก expected traffic และ privacy constraints
3. ทำ schema/function change ใน development-safe path
4. ทดสอบ positive + negative cases รวม active/expired/closed/full/invalid/forbidden/oversized-body
5. Re-run Supabase Security + Performance Advisors หลัง DDL/backend change ตามที่เกี่ยวข้อง
6. Commit migration/function source ที่ตรวจสอบได้เข้า repository
7. Deploy และบันทึก deployment/version/source evidence ใหม่ทุกครั้งที่ backend sourceเปลี่ยน
8. Verify privacy-safe application events จาก live function และเก็บ monitoring baseline จริงก่อนตั้ง alert threshold
9. ทำ real-device group regression หลัง backend behavior ที่เกี่ยวข้องเปลี่ยนตาม release gate โดยไม่ใช้ automated rejection probe แทน device evidence

## Current blockers / decisions required

ยังไม่ควร mark Issue #45 ผ่านจนมีอย่างน้อย:

- approved retention period
- cleanup implementation + controlled verification
- approved complete anonymous abuse-control strategy
- application structured-event ingestion verification + monitoring baseline จริงตามที่จำเป็น
- owner / alert channel / escalation path สำหรับ monitoring ที่ใช้งานจริง
- Privacy/Operations docs ที่สะท้อน policy จริง
- Security/Performance Advisor re-check หลัง future DDL/backend changes ตามขอบเขตที่เกี่ยวข้อง
- real-device regression ที่เหมาะสมหลัง backend changes เมื่อพร้อมทดสอบ

Current Group API v6 source/deployment parity และ rejection-only live contract ช่วยปิดเฉพาะ source/deployment/input-size/malformed-input/resource-read verification gaps ไม่ได้ปิด retention, complete abuse-control, application observability, Privacy/Legal, load/security, real-device หรือ Commercial GO gate

ไม่มีข้อความในเอกสารนี้ที่หมายถึง Production, privacy, security, load, complete abuse-control, application live monitoring, real-device หรือ Commercial PASS
