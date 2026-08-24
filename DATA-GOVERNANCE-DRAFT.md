# Kinaraidee — Data Governance Readiness Draft

เอกสารนี้เป็น implementation/governance draft สำหรับเตรียม Commercial Launch ไม่ใช่ Production Privacy Policy และไม่ใช่คำแนะนำทางกฎหมาย

> สถานะ: DRAFT / LEGAL REVIEW REQUIRED
>
> ห้ามกำหนด retention period หรือฐานกฎหมายแบบเดา ต้องได้รับการยืนยันจากเจ้าของบริการ/ผู้รับผิดชอบและผู้เชี่ยวชาญที่เหมาะสมก่อนใช้งานจริง

## 1. Data inventory to confirm

รายการชนิดข้อมูลที่ต้องทบทวนกับ schema/runtime ปัจจุบันอย่างน้อย:
- account/authentication records
- user food history / favorites
- Group rooms / anonymous friend-vote activity ที่เก็บบน backend
- beta feedback
- partner applications และ privacy acknowledgement evidence
- partner restaurants/public listing data
- partner clicks/conversions/audit records
- restaurant search demand / coarse location analytics
- logs/operational evidence ที่อาจมี identifier

สำหรับแต่ละ data class ให้ระบุ:
- purpose
- source
- table/system
- personal-data sensitivity
- access roles
- retention trigger
- retention period
- deletion/anonymization method
- legal/business exception
- owner

### Verified Group-data implementation facts — 2026-08-24

ข้อมูลต่อไปนี้เป็น implementation/schema evidence เพื่อช่วยการตัดสินใจภายหลัง ไม่ใช่ retention/legal approval:

- `group_rooms.id` เป็น UUID และ `expires_at` มี default `now() + interval '24 hours'`
- API ปฏิเสธ room ที่ closed/expired สำหรับ flow ที่เกี่ยวข้อง แต่ **expiry ไม่เท่ากับ deletion**
- `group_votes.room_id` อ้าง `group_rooms(id)` ด้วย `ON DELETE CASCADE`
- `(room_id, voter_id)` เป็น unique contract; current API จำกัด voter ID สูงสุด 120 characters และ tags สูงสุด 3 จาก allowlist
- Group API ปัจจุบันเป็น Supabase Edge Function `group-api` ACTIVE v6 และ intentionally `verify_jwt=false` เพื่อรองรับ accountless invited-friend voting; database access ใช้ service-role ฝั่ง server
- current source มี privacy-safe operational event code แต่ available Supabase log surface ที่ตรวจได้แสดง platform request rows และยังไม่พิสูจน์ exact application structured-event ingestion
- canonical/recurrent rejection-only probes ของ v6 มี successful evidence รวม scheduled runs ที่ตรวจได้ 4 ครั้ง; นี่เป็น synthetic availability/rejection evidence ไม่ใช่ monitoring SLA หรือ real traffic baseline
- read-only baseline วันที่ 2026-08-24 สังเกต 16 rooms ทั้งหมด expired, 14 linked votes ทั้งหมดอยู่ใน expired rooms, active rooms/votes 0 และ orphan votes 0; query ไม่ได้ลบข้อมูลและตัวเลขนี้ไม่ใช่ retention target
- `supabase/group-retention-dry-run.sql` เป็น read-only/policy-neutral contract และบังคับให้ระบุ `retention_after_expiry` ตอน execute โดยไม่มี Production default

รายละเอียด schema/evidence boundary ถูกแยกไว้ใน `GROUP-API-RETENTION-SCHEMA-EVIDENCE.md`, `GROUP-API-DEPLOYMENT-EVIDENCE.md`, `GROUP-RETENTION-CLEANUP-DESIGN.md` และ Issue #45.

### Verified Partner/analytics planning facts — 2026-08-24

ข้อมูลต่อไปนี้เป็น implementation/read-only planning evidence ไม่ใช่ approved retention, conversion/revenue หรือ partner-commercial evidence:

- Partner API ปัจจุบันเป็น Supabase Edge Function `partner-api` ACTIVE v15; repository/deployment hardening evidence ถูกเก็บใน `PARTNER-API-HARDENING-EVIDENCE.md`
- Partner rejection-only probe มี merged-main live PASS และมี successful `event=schedule` runs ที่ตรวจได้ 2 ครั้ง; scheduled history ไม่พิสูจน์ monitoring owner, alert delivery, SLA หรือ successful product actions
- read-only baseline ล่าสุดสังเกต `partner_clicks=1`, `partner_conversions=0`, `restaurant_search_demand=12`; timestamp boundaries ถูกเก็บเพื่อช่วย retention planning เท่านั้น
- `supabase/partner-retention-dry-run.sql` แยก threshold สำหรับ clicks, conversions และ search demand และบังคับให้ส่งค่าทั้งสาม explicit ตอน execute โดยไม่มี Production default
- Partner retention dry-run ถูก guard ด้วย `Partner Retention Dry-Run Regression` เพื่อห้าม mutation/DDL และหลีกเลี่ยง projection ของ session, restaurant, location, food และ financial fields ที่ไม่จำเป็นต่อ impact planning

รายละเอียด Partner evidence boundary ติดตามใน Issue #123 และ `PARTNER-API-HARDENING-EVIDENCE.md`.

## 2. Retention schedule template

| Data class | Purpose | Retention trigger | Period | Deletion/anonymization | Exception | Owner | Approved? |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Account/Auth | Authentication/account lifecycle | Account closure / inactivity / legal trigger | TBD | TBD | TBD | TBD | No |
| User food history/favorites | User product history/preferences | Event date / account lifecycle / approved product trigger | TBD | Delete/anonymize as approved | TBD | TBD | No |
| Group rooms/votes | Temporary group meal-voting flow | `expires_at` / room lifecycle; exact deletion trigger requires approval | TBD | Candidate design may delete eligible `group_rooms` with FK cascade to votes after approved threshold; active rooms must be protected | Hold/exception TBD | TBD | No |
| Feedback | Product improvement/support | Submission date / case closure | TBD | Delete or anonymize as approved | TBD | TBD | No |
| Partner application | Partner onboarding | Application closure / contract lifecycle | TBD | TBD | Contract/legal hold TBD | TBD | No |
| Privacy acknowledgement evidence | Audit of notice acknowledgement | Related record lifecycle | TBD | TBD | Legal requirement TBD | TBD | No |
| Partner click | Partner click/audit | Click/event date | TBD | Delete/anonymize as approved | Accounting/dispute/attribution TBD | TBD | No |
| Partner conversion | Commission/reconciliation/audit | Conversion/settlement date | TBD | Delete/anonymize as approved | Accounting/dispute/refund TBD | TBD | No |
| Search demand / coarse location | Product/partner demand analytics | Event date | TBD | Aggregate/anonymize/delete | TBD | TBD | No |
| Operational/platform logs | Reliability/security | Event date | TBD | Provider/log retention settings / approved export-delete process if applicable | Security incident hold TBD | TBD | No |

`TBD` หมายถึงยังไม่ได้อนุมัติ ห้ามนำตารางนี้ไปอ้างว่า Production retention ถูกกำหนดแล้ว. ค่า Group room `expires_at` 24 ชั่วโมงเป็น product expiry behavior ปัจจุบัน ไม่ใช่ approved data-retention period. ค่า threshold ที่ใช้กับ Group/Partner dry-run ต้องมาจาก policy ที่อนุมัติภายหลัง ไม่ใช่จากตัวอย่างหรือค่า default ใน repository.

## 3. Data-rights request procedure

### Intake
- รับคำขอผ่านช่องทางติดต่อทางการที่ต้องกำหนดก่อน Commercial GO
- บันทึก request ID, วันที่รับ, ประเภทคำขอ และ scope
- หลีกเลี่ยงการขอข้อมูลเพิ่มเกินจำเป็น

### Identity verification
- ใช้วิธีที่เหมาะสมกับความเสี่ยงของข้อมูล
- ห้ามส่งข้อมูล account/partner ให้ผู้ขอเพียงเพราะรู้ email/name โดยไม่มี verification ที่เหมาะสม
- ไม่บันทึก credential/password เป็นหลักฐาน
- สำหรับ anonymous/group identifiers ต้องกำหนดวิธีพิสูจน์สิทธิ์/ความเชื่อมโยงที่เหมาะสมก่อนเปิด procedure จริง; ห้ามสมมติว่า room ID หรือ voter ID เพียงอย่างเดียวพิสูจน์ตัวบุคคลได้
- สำหรับ Partner click/search/session identifiers ต้องกำหนดว่า identifier ใดสามารถเชื่อมโยงกับบุคคลได้จริงและใช้ verification/aggregation ที่เหมาะสม ห้ามตีความ session ID เพียงอย่างเดียวเป็นตัวตนที่ยืนยันแล้ว

### Request types
- Access / copy
- Correction
- Deletion
- Withdrawal/objection เมื่อ applicable
- Restriction หรือคำขออื่นตามนโยบาย/กฎหมายที่ใช้จริง

### Processing
1. ตรวจระบบ/ตารางที่เกี่ยวข้อง
2. ตรวจ legal/business exception ที่ได้รับอนุมัติจริง
3. ทำ export/correction/deletion ด้วยวิธีที่ trace ได้
4. ตรวจ dependency/cascade impact โดยเฉพาะ Group room → vote relation และ Partner accounting/dispute dependencies ก่อน mutation
5. ตรวจผลหลังดำเนินการ
6. บันทึก completion evidence โดยไม่เก็บข้อมูลส่วนบุคคลเกินจำเป็นใน GitHub issue/repository

### Evidence Record
- Request ID:
- Received date:
- Verified date/method category:
- Systems checked:
- Data classes checked:
- Action performed:
- Dependency/cascade check (if applicable):
- Completed date:
- Exceptions applied (if any):
- Owner:
- Review notes:

## 4. Deletion safety

ก่อนเปิด production deletion flow:
- ระบุ foreign-key/dependency impact
- ทดสอบกับ production-like data ใน safe environment
- แยกข้อมูลที่ต้อง delete จากข้อมูลที่ต้อง anonymize/retain ตามข้อยกเว้นที่ได้รับอนุมัติ
- ตรวจว่า cached/public artifact ไม่คงข้อมูลที่ควรถูกลบ
- ห้ามใช้ direct destructive SQL แบบไม่มี transaction/backup/rollback plan สำหรับคำขอทั่วไป
- สำหรับ Group data ต้องพิสูจน์ว่า cleanup/deletion target เฉพาะ row ที่เข้า approved threshold, ไม่ลบ active room โดยผิดพลาด และ related votes cascade ตาม FK จริงใน controlled verification
- สำหรับ Partner data ต้องแยก click, conversion และ search-demand policy/exception ชัดเจน และพิสูจน์ cleanup/anonymization หลัง approval โดยไม่ทำลาย accounting, refund, dispute หรือ reconciliation obligation ที่ได้รับอนุมัติจริง
- ห้ามนำ read-only baseline, dry-run candidate count หรือ schema `ON DELETE CASCADE` ไปตีความว่า cleanup ถูก implement/verified แล้ว

## 5. Logging / operational evidence boundary

Operational evidence ต้องแยกอย่างน้อยสองชั้น:

1. **Platform request logs** — เช่น method/status/execution/function version ที่ provider แสดง
2. **Application structured events** — payload ที่ application สร้างเอง เช่น `component=group-api`

การเห็น platform request row หรือ scheduled synthetic rejection run ไม่พิสูจน์ว่า application structured event ถูก ingest, ไม่พิสูจน์ production traffic baseline และไม่พิสูจน์ alert delivery/SLA. Retention/access rights ของ log แต่ละชั้นต้องยืนยันจาก provider/configuration ที่ใช้งานจริงก่อนกำหนด Production schedule.

Current Group API source contract ห้าม operational event logging อ้าง room IDs, host tokens, voter IDs, tags, IP addresses, request headers/bodies หรือ raw user-supplied payload โดยตรง. นี่เป็น source/privacy hardening เท่านั้น ไม่ใช่ legal basis หรือ final log-retention approval.

## 6. Partner/privacy evidence

Partner application runtime ปัจจุบันบันทึก privacy notice version และ acknowledgement timestamp สำหรับ submission ใหม่ แต่ evidence นี้ไม่แทน Production legal basis, retention policy หรือ Terms/Privacy review.

Partner API source/deployment/live rejection และ retention dry-run evidence เป็น technical/planning evidence เท่านั้น ไม่ยืนยัน partner agreement, real conversion, commission reconciliation, revenue, monitoring SLA หรือ approved retention.

ก่อน Commercial GO ต้องยืนยัน:
- controller/service-owner identity และ official contact
- final Production Privacy Policy/Terms
- retention period ของ partner application/acknowledgement, clicks, conversions และ search demand
- accounting/dispute/refund exception สำหรับ conversion/commission records หากโมเดลนั้นถูกเปิดใช้จริง
- disclosure กับ provider/partner/payment ที่ใช้จริง
- process สำหรับ correction/deletion/withdrawal ที่ตรงกับระบบจริง

## 7. Approval gate

เอกสารนี้ถือว่า **procedure draft prepared** เมื่อ inventory/template/request workflow ถูกเขียนครบและ implementation facts ที่ยืนยันได้ถูกแยกจาก policy decision ชัดเจน

Commercial legal/privacy gate ยัง **NOT PASSED** จนกว่า:
- retention periods ถูกอนุมัติจริง รวม Group rooms/votes, Partner click/conversion/search-demand และ logs
- data controller/contact ถูกระบุ
- legal/PDPA review เสร็จตามความเหมาะสม
- deletion/export procedure ถูกทดลองอย่างปลอดภัย
- Group cleanup/cascade/no-active-delete behavior ถูก verify หลังมี approved policy
- Partner cleanup/anonymization/exception behavior ถูก verify หลังมี approved policy
- Production Privacy Policy และ Terms ถูกเผยแพร่จริง
