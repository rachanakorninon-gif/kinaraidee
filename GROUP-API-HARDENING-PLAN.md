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

### Static source-contract regression gate

Repository มี `.github/workflows/group-api-regression.yml` เพื่อกัน regression ของ invariants ที่ตรวจจาก source ได้ เช่น POST/OPTIONS-only behavior, 8 KiB body limit, response hardening, allowlists, room size/tag limits, room state/expiry checks, host-token authorization, room-full guard และ `(room_id,voter_id)` upsert contract

Gate นี้เป็น **static source-contract evidence only** ไม่ยืนยันว่า Supabase Edge Function เวอร์ชันใดถูก deploy จริง และไม่แทน retention cleanup, abuse-control, production traffic, load/security testing หรือ real-device group flow

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

สามารถออกแบบได้โดยไม่ต้องสร้างผลสมมติ แต่การตั้ง threshold ต้องอาศัย traffic จริง

เหตุการณ์ขั้นต่ำที่ควรสังเกต:

- room creation success/reject
- vote success/reject
- `room_full`
- `room_closed` / expired access
- `forbidden` host-token attempts
- `db_error`
- request-too-large / invalid payload

ห้ามเติม count, rate, latency, error budget หรือ alert threshold จนกว่าจะวัดจริง

### 4. Security invariants to preserve

ทุก implementation รอบถัดไปต้องคง invariants เหล่านี้:

- anonymous friend voting ยังทำงานได้ตาม product requirement
- service-role key ไม่ออกสู่ client/public artifact/log
- host-only actions ยัง require high-entropy host token
- active rooms ต้องไม่ถูก cleanup โดย mistake
- input allowlists/room-size/tag limits ต้องไม่ถูกผ่อนโดยไม่มีเหตุผลและ test
- RLS/privilege model ต้องไม่ถูกขยายเพียงเพื่อให้ cleanup/rate limiting ทำงาน

## Safe implementation sequence

1. ยืนยัน retention period / policy owner / privacy wording
2. เลือก abuse-control requirement จาก expected traffic และ privacy constraints
3. ทำ schema/function change ใน development-safe path
4. ทดสอบ positive + negative cases รวม active/expired/closed/full/invalid/forbidden
5. Re-run Supabase Security + Performance Advisors หลัง DDL change
6. Commit migration/function source ที่ตรวจสอบได้เข้า repository
7. Deploy และบันทึก deployment/version evidence จริง
8. ทำ real-device group regression โดยเฉพาะ create → join → vote → 2/2 → final result
9. เก็บ monitoring baseline จาก traffic จริงก่อนตั้ง alert threshold

## Current blockers / decisions required

ยังไม่ควร mark Issue #45 ผ่านจนมีอย่างน้อย:

- approved retention period
- cleanup implementation + verification
- approved anonymous abuse-control strategy
- monitoring/metrics implementation และ baseline จริงตามที่จำเป็น
- Privacy/Operations docs ที่สะท้อน policy จริง
- Security/Performance Advisor re-check หลัง backend changes

ไม่มีข้อความในเอกสารนี้ที่หมายถึง Production, privacy, security, load, abuse-control หรือ real-device PASS
