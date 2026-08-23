# Kinaraidee — Group Retention Cleanup Design

เอกสารนี้กำหนด design contract สำหรับ cleanup ของ `group_rooms` / `group_votes` หลัง retention period ได้รับอนุมัติแล้วเท่านั้น

> สถานะ: DESIGN ONLY / NO CLEANUP EXECUTED
>
> ไม่มี retention period เริ่มต้นในเอกสารนี้ และห้ามนำ product expiry 24 ชั่วโมงไปใช้เป็น retention period โดยอัตโนมัติ

## 1. Preconditions
ก่อนเปิด cleanup จริงต้องมีครบ:
- approved retention period + trigger
- approved owner / legal-business exception
- `group-retention-dry-run.sql` รันด้วย threshold ที่อนุมัติ
- backup/rollback path ที่เหมาะสม
- controlled verification environment หรือ execution plan ที่จำกัด blast radius

## 2. Eligibility invariant
Candidate room ต้อง:
- หมดอายุแล้วตาม `expires_at`
- เก่ากว่า approved retention threshold
- ไม่อยู่ใน exception/hold ที่ได้รับอนุมัติ

ห้าม target active/non-eligible room และห้ามใช้ row count อย่างเดียวเป็นตัวเลือกข้อมูล

## 3. Dry-run first
ทุก cleanup batch ต้องมี dry-run evidence ก่อน mutation โดยบันทึกอย่างน้อย:
- threshold ที่ได้รับอนุมัติ
- query/version/SHA
- candidate room count
- linked vote count ที่คาดว่าจะ cascade
- active room count
- orphan vote count
- execution timestamp

Dry-run ห้าม expose room ID, host token, voter ID หรือ user payload ใน GitHub evidence

## 4. Controlled mutation design
เมื่อได้รับอนุมัติให้ implement จริง ควรมีคุณสมบัติ:
- explicit threshold parameter; no hidden default
- bounded batch size
- idempotent retry behavior
- transaction boundary ที่เหมาะสม
- eligibility predicate ซ้ำใน mutation ไม่พึ่ง dry-run result เพียงอย่างเดียว
- no-active-delete guard
- rely on verified FK `group_votes.room_id -> group_rooms(id) ON DELETE CASCADE` only after controlled test
- structured operational result counts โดยไม่ log identifiers

เอกสารนี้ไม่อนุมัติ SQL DELETE implementation ใด ๆ ใน production

## 5. Post-cleanup verification
หลัง controlled cleanup ต้องตรวจ:
- deleted room count ตรงกับ eligible batch ที่อนุมัติ
- linked vote cascade ตามที่คาด
- active/non-eligible rooms ยังอยู่
- orphan votes = 0 หรือ investigate ทันที
- Group API behavior สำหรับ active rooms ไม่ regress
- Supabase Security/Performance Advisor ไม่มี regression ที่เกี่ยวข้อง

## 6. Stop conditions
หยุด cleanup และเปิด incident/review หาก:
- active room ถูก target/deleted
- candidate count เปลี่ยนผิดคาดอย่างมีนัยสำคัญระหว่าง dry-run กับ execution
- orphan votes เกิดขึ้น
- transaction/constraint error
- rollback/backup evidence ไม่พร้อม

## 7. Cleanup Evidence Record
- Approved retention decision/reference:
- Owner/approver:
- Repository SHA:
- Dry-run timestamp/result:
- Execution environment:
- Batch limit:
- Mutation start/end:
- Eligible rooms before:
- Rooms deleted:
- Linked votes expected/deleted:
- Active rooms before/after:
- Orphan votes after:
- Advisor re-check:
- Result: PASS / FAIL / NOT EXECUTED
- Evidence links:

## 8. Evidence boundary
Design/dry-run evidence ไม่เท่ากับ approved retention policy, cleanup PASS, legal/PDPA approval, backup/restore PASS, monitoring readiness, real-device acceptance หรือ Commercial GO
