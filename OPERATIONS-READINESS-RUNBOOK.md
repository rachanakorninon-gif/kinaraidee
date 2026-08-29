# Kinaraidee — Operations Readiness Runbook

เอกสารนี้เตรียมขั้นตอน Incident Response, Backup/Recovery, Emergency Traffic Stop และ Production Access Review ก่อน Commercial Launch

> สถานะ: PROCEDURE PREPARED / EXECUTION NOT VERIFIED
>
> การมีเอกสารนี้ไม่ใช่หลักฐานว่า monitoring, backup restore, rollback drill หรือ traffic stop ผ่านจริง ต้องมี Evidence Record จากการทดลองหรือเหตุการณ์จริงก่อนติ๊ก Commercial Gate

## 1. Incident severity

### SEV-1 — Critical
- ผู้ใช้จำนวนมากเข้าแอปไม่ได้ หรือ core recommendation ใช้งานไม่ได้
- เกิดความเสี่ยงข้อมูลส่วนบุคคล/credential รั่ว
- payment entitlement ผิดพลาดจนให้สิทธิ์หรือเรียกเงินจริงไม่ถูกต้อง
- partner traffic/conversion ผิดพลาดในวงกว้าง

เป้าหมายการตอบสนอง: หยุดผลกระทบก่อน แล้วค่อยวิเคราะห์ root cause ห้าม deploy การแก้ที่ไม่มี rollback path

### SEV-2 — Major
- ฟีเจอร์สำคัญบางส่วนเสีย แต่ core flow ยังใช้งานได้
- Feedback/Partner submission, Maps fallback หรือ PWA update มี regression ที่กระทบผู้ใช้จริง

### SEV-3 — Minor
- ปัญหาการแสดงผล/ข้อความ/UX ที่มี workaround และไม่กระทบข้อมูลหรือธุรกรรม

## 2. Incident flow

1. **Detect** — บันทึกเวลา, release SHA, public URL, browser/device (ถ้ามี), error/log evidence
2. **Triage** — จัด severity และระบุระบบที่เกี่ยวข้อง: GitHub Pages / Supabase Auth / Database / Edge Function / Payment / Partner
3. **Contain** — เลือกวิธีที่กระทบน้อยที่สุด: rollback release, disable traffic, revoke credential, pause feature/provider integration
4. **Recover** — ยืนยัน core flow และ data integrity หลังแก้
5. **Verify** — รัน automated checks ที่เกี่ยวข้อง + live smoke + real-device เมื่อ incident กระทบ client/runtime
6. **Document** — บันทึก timeline, root cause, remediation, follow-up owner และ evidence URL/SHA

## 3. Emergency traffic stop

ใช้เมื่อ Premium หรือ partner production flow ถูกเปิดจริงเท่านั้น

### Partner traffic
- ระบุ mechanism ที่ใช้จริงก่อน launch เช่น `active=false`, provider-side disable, feature flag หรือ routing disable
- ห้ามใช้วิธีที่ลบข้อมูลเพื่อหยุด traffic ถ้ามี reversible option
- หลังหยุด ให้ตรวจ public UI ว่าไม่ส่งผู้ใช้ไป destination ที่ปิดใช้งาน

### Premium/payment traffic
- ระบุ provider-side switch/maintenance mode/feature flag ก่อนเปิดรับเงินจริง
- การหยุดขายใหม่ต้องไม่ทำให้ entitlement ของลูกค้าที่ชำระแล้วหายโดยไม่ได้ตั้งใจ
- ห้ามแก้ entitlement จาก client-only state

### Evidence Record
- วันที่/เวลา:
- เหตุผล:
- Mechanism ที่ใช้:
- ผู้ดำเนินการ:
- Release SHA:
- ผลตรวจหลังหยุด:
- วิธีเปิดกลับ:

## 4. Backup / recovery readiness

ก่อน Commercial GO ต้องยืนยัน capability ตาม Supabase plan และ configuration จริง ห้ามสมมติ retention/RPO/RTO

### Current Supabase plan boundary — verified 2026-08-29

Connected read-only organization inspection confirmed the current Kinaraidee Supabase organization is on the **Free plan**.

Current official Supabase documentation states:

- Free Plan projects do **not** include Automatic Backups.
- Free Plan projects do **not** include Point-in-Time Recovery (PITR).
- Supabase recommends that free-tier projects regularly create logical exports with `supabase db dump` and keep off-site backups.
- Pro projects receive daily backups with the last 7 days available; Team/Enterprise have longer daily-backup windows.
- PITR is a paid add-on for supported paid plans and must not be enabled without explicit billing approval.
- Free projects may be paused for inactivity, which is an availability concern separate from database backup/recovery.

Official references:

- Database backups: https://supabase.com/docs/guides/platform/backups
- Pricing / plan features: https://supabase.com/pricing
- Production checklist: https://supabase.com/docs/guides/deployment/going-into-prod
- Free project pausing: https://supabase.com/docs/guides/platform/free-project-pausing

Therefore current status is **BACKUP/RECOVERY PRODUCTION GATE NOT PASS**. The project cannot claim provider-managed automatic backup or PITR protection while it remains on the verified Free plan.

Before Commercial GO, choose and approve one real recovery posture, for example:

1. move to an approved paid-plan backup capability and verify its real project configuration/history; or
2. maintain a controlled independent logical-backup process with an approved off-site destination, encryption/access controls, schedule, retention and restore test.

This runbook does **not** choose between those options and does not authorize a paid plan.

### Safety rule for manual logical backups

- Never commit a production data dump to this repository.
- Never upload a production dump as a public CI artifact.
- Do not create a production dump until its secure destination, access owner, encryption handling and retention period are approved.
- A successful `db dump` command alone is not recovery PASS; restore integrity must be tested in a safe environment.
- Keep auth/payment/partner/user data handling aligned with the approved Privacy/retention policy.

### Pre-flight
- ระบุข้อมูลสำคัญที่ต้องกู้คืน: accounts/auth references, feedback, partner applications, partner restaurants, partner clicks/conversions, analytics ที่จำเป็น
- ระบุสิ่งที่สร้างใหม่ได้จาก source control และไม่ต้อง backup แยก เช่น static web assets/workflows/migrations ที่อยู่ใน repository
- บันทึก backup mechanism ที่เปิดใช้จริงและ retention จริง
- ระบุ Production recovery owner จริง
- ถ้าใช้ manual logical backup ให้บันทึก approved off-site destination, encryption/access control, schedule และ retention โดยไม่เก็บ secret/PII ใน issue/repository

### Recovery drill
1. เลือก safe/non-production environment หรือวิธีที่ไม่ทำลาย production
2. บันทึก backup/source snapshot ที่ใช้
3. กู้คืนตามวิธีที่ provider รองรับหรือจาก approved logical backup
4. ตรวจ schema/migrations ที่คาดไว้
5. ตรวจ row counts/constraints/RLS สำหรับตารางสำคัญแบบไม่เปิดเผยข้อมูลส่วนบุคคลใน evidence
6. รัน smoke query/read path ที่ปลอดภัย
7. วัดเวลาจริงตั้งแต่เริ่มจนพร้อมใช้งาน
8. บันทึก measured RPO/RTO จาก drill จริงแทนค่าที่คาดเดา

### Recovery Evidence Record
- Drill date:
- Environment:
- Backup/snapshot identifier:
- Restore method:
- Start time:
- Recovery verified time:
- Measured recovery duration:
- Measured data-loss window / RPO:
- Data validation performed:
- Result: PASS / FAIL
- Known gaps:
- Owner:

## 5. Monitoring / error reporting readiness

ก่อน Commercial GO ต้องระบุช่องทางที่ใช้งานจริงอย่างน้อยสำหรับ:
- GitHub Pages deployment failure
- Live Smoke failure
- Supabase Auth/API/Database errors ที่สำคัญ
- payment/partner processing failure เมื่อเปิดใช้จริง

Evidence ต้องเป็น dashboard/log/run URL หรือ alert test ที่ตรวจย้อนหลังได้ ไม่ใช่เพียงรายการว่าจะ monitor อะไร

## 6. Production deploy/access review

ก่อนเปิด Commercial:
- บันทึก GitHub accounts/teams ที่มี push/admin/Actions-deploy permission
- บันทึก Supabase accounts/roles ที่เปลี่ยน schema/Auth/config ได้
- ใช้ least privilege เท่าที่ระบบรองรับ
- ระบุ deploy owner และ emergency approver จริง
- กำหนดวิธี revoke access เมื่อเปลี่ยนผู้รับผิดชอบ
- ห้ามบันทึก secret/token ลง runbook หรือ issue

## 7. Emergency change rule

Emergency change ต้องมีอย่างน้อย:
- incident/reference
- exact base SHA และ resulting SHA
- สิ่งที่เปลี่ยนและเหตุผล
- rollback path
- checks ที่รัน
- follow-up หลัง incident

ถ้าเปลี่ยน runtime/PWA ต้อง reset evidence ที่ได้รับผลกระทบและ retest ตาม release gate ห้ามยกผลจาก release ก่อนหน้ามา PASS อัตโนมัติ

## 8. Commercial Gate status

สิ่งที่เอกสารนี้ทำให้ **พร้อมด้าน procedure**:
- Incident classification/response flow
- Backup/recovery drill checklist
- Current Free-plan backup capability boundary
- Manual-backup safety requirements
- Traffic-stop checklist
- Production access review checklist

สิ่งที่ยัง **NOT VERIFIED** จนกว่าจะมีหลักฐานจริง:
- Monitoring channel ใช้งานจริง
- Approved backup mechanism/schedule/history/retention for the real Production posture
- Recovery drill / measured RPO-RTO
- Traffic stop test
- Production deploy owner/access review

Current verified constraint: the Supabase organization is on the **Free plan**, so provider-managed Automatic Backups and PITR must not be claimed as available for current Production readiness.
