# กินอะไรดี — Production Readiness Control Board

เอกสารนี้เป็นหน้าควบคุมกลางสำหรับดูว่าอะไร “พร้อม”, “ต้องพิสูจน์”, หรือ “ติด dependency ภายนอก” ก่อนเปิดใช้งานเชิงพาณิชย์

> สถานะต้องอิงหลักฐานจริง ห้ามเปลี่ยนเป็น READY จากการคาดเดา

## Current Commercial status

**NO-GO**

สถานะนี้เป็น summary gate เท่านั้น และต้องคงเป็น **NO-GO** ตราบใดที่ Commercial decision records ที่จำเป็นยัง `NOT APPROVED`, Public Beta ยังไม่ complete หรือ execution evidence ที่จำเป็นยังไม่ครบ การเปลี่ยน decision record เป็น `APPROVED` เป็นเพียง governance approval และไม่ใช่หลักฐานว่ามี payment, conversion, partner, legal execution หรือ revenue เกิดขึ้นจริง

## สถานะที่ใช้
- **READY** — มีหลักฐานจริงและ gate ที่เกี่ยวข้องผ่าน
- **VALIDATE** — ระบบ/เอกสารมีแล้ว แต่ยังต้องพิสูจน์กับอุปกรณ์ ผู้ใช้ ร้าน หรือ environment จริง
- **EXTERNAL** — ต้องใช้บัญชี/ข้อตกลง/ข้อมูลจากภายนอก
- **BLOCKED** — มี Blocker/Critical หรือ dependency ที่ทำให้เปิดไม่ได้
- **N/A** — ไม่ใช้กับ release model รอบนี้

## Control Board

| Area | Current status | Evidence / source | Exit condition |
|---|---|---|---|
| Core recommendation | VALIDATE | `BETA-RUN-LOG.md`, `BETA-DEVICE-MATRIX.md` | real-device gate ผ่าน |
| Surprise / recovery / accessibility | VALIDATE | NF-01–NF-10 | ผลจริงบนอุปกรณ์ที่เกี่ยวข้อง |
| PWA / iPhone / iPad | VALIDATE | `BETA-NEW-FLOW-TESTS.md` | install/update/recovery ผ่านจริง |
| Location / restaurant fallback | VALIDATE | TC + Beta run | allow/deny/Maps ผ่านจริง |
| Feedback / Beta operations | VALIDATE | Beta docs | มี submission/feedback จริง |
| Supabase auth / RLS | VALIDATE | `SECURITY.md` | production negative tests ผ่าน |
| Partner tracking / conversion | VALIDATE | backend + `MONETIZATION-PLAN.md` | verified click/conversion/reconciliation |
| Restaurant partners | EXTERNAL | partner applications/agreements | มีร้านจริงและข้อตกลงจริง |
| Premium payment | EXTERNAL | payment provider | merchant + sandbox/production gate ผ่าน |
| Production Privacy / Terms | EXTERNAL | policy/legal review | policy/contact/notice พร้อมจริง |
| Monitoring / support / rollback | VALIDATE | `RELEASE-CHECKLIST.md` | procedure + safe rehearsal ผ่าน |
| Native stores | N/A | release decision | เปลี่ยนเมื่อเลือก native distribution |

## Immediate Beta Exit Gate
ก่อนขยับจาก Public Beta ไป commercial preparation:
- [ ] Android Chrome เครื่องจริงอย่างน้อย 3 รุ่น
- [ ] iPhone Safari เครื่องจริงอย่างน้อย 2 รุ่น
- [ ] TC-01–TC-15 และ NF-01–NF-10 มีผล trace ได้
- [ ] Blocker = 0 จาก release-scoped defect evidence
- [ ] Critical = 0 จาก release-scoped defect evidence
- [ ] การไม่มี defect report หรือมีเพียง CI/static/synthetic evidence ห้ามตีความเป็น Blocker/Critical = 0
- [ ] PWA update/recovery ผ่านจริง
- [ ] Location/Maps fallback ผ่านจริง
- [ ] Feedback/Partner application ส่งจริงได้
- [ ] `BETA-RESULTS-TEMPLATE.md` มี Go/Extend/Fix decision จากข้อมูลจริง

## Commercial Dependency Gate
รายการต่อไปนี้ต้องมีของจริงก่อนเปิดโมเดลที่เกี่ยวข้อง:

### Premium
- merchant/payment provider
- ราคาและ entitlement ที่ตัดสินใจแล้ว
- subscribe/renew/cancel/failure/refund test
- transaction/audit/reconciliation
- Production Privacy/Terms

### Restaurant revenue
- ร้านจริง
- agreement/commission terms
- destination/menu mapping ที่ตรวจแล้ว
- verified conversion rule
- dispute/cancel/refund/reconciliation

### Sponsored / Ads / Insights
- labeling และ metric separation
- privacy/legal review
- aggregation/anonymization สำหรับ insights
- UX impact validation สำหรับ ads

## Security Stop Conditions
ให้เปลี่ยนสถานะ release เป็น **BLOCKED** ทันทีเมื่อพบ:
- service-role/private secret ใน public client/repository
- auth/RLS/admin bypass ที่ยืนยันได้
- public exposure ของข้อมูลตำแหน่ง/ข้อมูลส่วนบุคคลที่ไม่ควรเปิด
- payment/entitlement ที่ client ปลอมได้โดยไม่มี server verification
- conversion/commission confirmed จาก client โดยไม่มี verification
- Blocker/Critical ที่ยังไม่ retest หลังแก้

## Release Decision Record
- วันที่:
- Release candidate commit:
- Beta result:
- Areas READY:
- Areas VALIDATE:
- Areas EXTERNAL:
- Areas BLOCKED:
- โมเดลรายได้ที่จะเปิด:
- Known accepted risks:
- Decision: GO / LIMITED GO / EXTEND BETA / NO-GO
- ผู้อนุมัติ:
- หลักฐานที่อ้างอิง:

## Source of truth
ใช้เอกสารนี้เป็น dashboard แต่รายละเอียด gate ต้องอ้างอิง:
`BETA-CHECKLIST.md`, `BETA-DEVICE-MATRIX.md`, `BETA-RUN-LOG.md`, `BETA-DAILY-LOG.md`, `BETA-RESULTS-TEMPLATE.md`, `MONETIZATION-PLAN.md`, `SECURITY.md`, `RELEASE-CHECKLIST.md`, `COMMERCIAL-EXECUTION-EVIDENCE.md`
