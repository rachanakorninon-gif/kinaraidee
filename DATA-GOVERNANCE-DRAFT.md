# Kinaraidee — Data Governance Readiness Draft

เอกสารนี้เป็น implementation/governance draft สำหรับเตรียม Commercial Launch ไม่ใช่ Production Privacy Policy และไม่ใช่คำแนะนำทางกฎหมาย

> สถานะ: DRAFT / LEGAL REVIEW REQUIRED
>
> ห้ามกำหนด retention period หรือฐานกฎหมายแบบเดา ต้องได้รับการยืนยันจากเจ้าของบริการ/ผู้รับผิดชอบและผู้เชี่ยวชาญที่เหมาะสมก่อนใช้งานจริง

## 1. Data inventory to confirm

รายการชนิดข้อมูลที่ต้องทบทวนกับ schema/runtime ปัจจุบันอย่างน้อย:
- account/authentication records
- user food history / favorites / group activity ที่เก็บบน backend
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

## 2. Retention schedule template

| Data class | Purpose | Retention trigger | Period | Deletion/anonymization | Exception | Owner | Approved? |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Account/Auth | TBD | Account closure / inactivity / legal trigger | TBD | TBD | TBD | TBD | No |
| Feedback | Product improvement/support | Submission date / case closure | TBD | Delete or anonymize as approved | TBD | TBD | No |
| Partner application | Partner onboarding | Application closure / contract lifecycle | TBD | TBD | Contract/legal hold TBD | TBD | No |
| Privacy acknowledgement evidence | Audit of notice acknowledgement | Related record lifecycle | TBD | TBD | Legal requirement TBD | TBD | No |
| Partner click/conversion | Commission/audit | Event/settlement date | TBD | Delete/anonymize as approved | Accounting/dispute TBD | TBD | No |
| Search demand / coarse location | Product/partner demand analytics | Event date | TBD | Aggregate/anonymize/delete | TBD | TBD | No |
| Operational logs | Reliability/security | Event date | TBD | Provider/log retention settings | Security incident hold TBD | TBD | No |

`TBD` หมายถึงยังไม่ได้อนุมัติ ห้ามนำตารางนี้ไปอ้างว่า Production retention ถูกกำหนดแล้ว

## 3. Data-rights request procedure

### Intake
- รับคำขอผ่านช่องทางติดต่อทางการที่ต้องกำหนดก่อน Commercial GO
- บันทึก request ID, วันที่รับ, ประเภทคำขอ และ scope
- หลีกเลี่ยงการขอข้อมูลเพิ่มเกินจำเป็น

### Identity verification
- ใช้วิธีที่เหมาะสมกับความเสี่ยงของข้อมูล
- ห้ามส่งข้อมูล account/partner ให้ผู้ขอเพียงเพราะรู้ email/name โดยไม่มี verification ที่เหมาะสม
- ไม่บันทึก credential/password เป็นหลักฐาน

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
4. ตรวจผลหลังดำเนินการ
5. บันทึก completion evidence โดยไม่เก็บข้อมูลส่วนบุคคลเกินจำเป็นใน GitHub issue/repository

### Evidence Record
- Request ID:
- Received date:
- Verified date/method category:
- Systems checked:
- Action performed:
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

## 5. Partner/privacy evidence

Partner application runtime ปัจจุบันบันทึก privacy notice version และ acknowledgement timestamp สำหรับ submission ใหม่ แต่ evidence นี้ไม่แทน Production legal basis, retention policy หรือ Terms/Privacy review

ก่อน Commercial GO ต้องยืนยัน:
- controller/service-owner identity และ official contact
- final Production Privacy Policy/Terms
- retention period ของ partner application/acknowledgement
- disclosure กับ provider/partner/payment ที่ใช้จริง
- process สำหรับ correction/deletion/withdrawal ที่ตรงกับระบบจริง

## 6. Approval gate

เอกสารนี้ถือว่า **procedure draft prepared** เมื่อ inventory/template/request workflow ถูกเขียนครบ

Commercial legal/privacy gate ยัง **NOT PASSED** จนกว่า:
- retention periods ถูกอนุมัติจริง
- data controller/contact ถูกระบุ
- legal/PDPA review เสร็จตามความเหมาะสม
- deletion/export procedure ถูกทดลองอย่างปลอดภัย
- Production Privacy Policy และ Terms ถูกเผยแพร่จริง
