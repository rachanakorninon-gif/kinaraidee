# กินอะไรดี — Owner Decisions Queue

เอกสารนี้รวมเฉพาะเรื่องที่ **ไม่ควรให้ระบบ/CI/ผู้ช่วยเดาแทนเจ้าของผลิตภัณฑ์หรือผู้อนุมัติภายนอก** ก่อน Public Beta/Commercial GO เพื่อให้ขอข้อมูลจากเจ้าของเป็นรอบสั้น ๆ แทนการถามกระจัดกระจายหลายครั้ง

> การมีรายการนี้ไม่ใช่การอนุมัติ ไม่ใช่ legal advice ไม่ใช่ payment/partner execution evidence และไม่เปลี่ยน Public Beta, Recruitment หรือ Commercial status.

## A. ยังไม่ต้องตอบตอนนี้ — ปิด device/Beta technical gate ก่อน

### A1. Supabase paid-plan / leaked-password protection
**ต้องตัดสินใจภายหลัง:** อนุญาตหรือไม่อนุญาตการอัปเกรดแผน/ค่าใช้จ่ายที่จำเป็นเพื่อเปิด leaked-password protection (ถ้ายังเป็น paid-plan dependency ณ เวลานั้น)

ก่อนมีคำตอบ:
- คงสถานะ `BLOCKED BY VERIFIED FREE PLAN / CONFIGURATION — NOT PASS`.
- ห้ามใช้ successful signup/sign-in/reset เป็นหลักฐานแทน leaked-password rejection.
- ห้ามทำรายการชำระเงิน/อัปเกรดแทนเจ้าของ.

หลังอนุมัติและ dependency พร้อม:
- เปิด setting ตาม provider-supported path.
- ทดสอบ weak/leaked-password rejection จริงแบบแยกจาก acceptable-password success.
- re-check Security Advisor/configuration และบันทึก evidence.

### A2. Distribution path
**ต้องตัดสินใจ:** รอบเชิงพาณิชย์แรกเป็น Web/PWA เท่านั้น หรือจะเพิ่ม native App Store / Google Play.

ผลกระทบ:
- Web/PWA-only: ไม่ต้องรอ developer-store account สำหรับ launch path นี้.
- Native: ต้องมี Apple/Google developer accounts, store policies/metadata และ subscription rules ที่เกี่ยวข้องก่อน submission.

## B. Production Privacy / Legal — ต้องใช้ข้อมูลจริงจากเจ้าของ/ผู้ตรวจ

Canonical gate: `PRODUCTION-PRIVACY-LEGAL-DECISION.md` — ปัจจุบัน `NOT APPROVED`.

ข้อมูลขั้นต่ำที่ต้องมีภายหลัง:
1. ชื่อบุคคล/นิติบุคคลที่เป็น service/controller ตามที่ใช้จริง
2. ช่องทางติดต่อ Production ที่เผยแพร่ได้
3. ผู้ตรวจ/ผู้อนุมัติด้าน PDPA/กฎหมาย (ถ้ามี/ตามที่ต้องใช้จริง)
4. retention decision ที่อนุมัติสำหรับแต่ละ data class
5. การตัดสินใจเรื่อง data-rights owner/process
6. provider/vendor ที่ใช้จริงตอน Production: Supabase, Maps/location, payment, partner/affiliate/tracking
7. URL/version ของ Privacy Policy และ Terms หลัง review/publish

ผู้ช่วยทำต่อได้หลังได้รับข้อมูล:
- เติม/จัดโครง Privacy Policy + Terms draft ให้สอดคล้อง implementation จริง
- ทำ data-flow/vendor disclosure consistency review
- ทำ retention/cleanup test plan ตาม period ที่อนุมัติ
- ทำ data-rights procedure/runbook และ evidence checklist

ห้ามทำก่อนข้อมูลจริง:
- invent controller identity/contact/legal basis
- อ้างว่า PDPA/legal approved
- เลือก retention period เป็น Production policy โดยเดา

## C. Payment / Premium — owner/commercial decisions

Canonical gate: `PAYMENT-PREMIUM-DECISION.md` — ปัจจุบัน `NOT APPROVED`.

ข้อมูลขั้นต่ำที่ต้องตัดสินใจ:
1. Payment provider
2. Merchant/business account ที่จะใช้จริง
3. Market/currency
4. ราคา Premium + billing cadence
5. Free vs Premium entitlement ที่ชัดเจน
6. Refund/dispute/chargeback policy/owner
7. Commercial approver/owner

หลังข้อมูลครบ ผู้ช่วยทำต่อได้:
- provider-specific server webhook verification
- idempotency + backend-authoritative entitlement
- sandbox subscribe/renew/cancel/failure/refund test suite
- audit/reconciliation evidence path
- Production payment controlled acceptance checklist

ห้ามทำก่อน decision:
- รับเงินจริง
- เลือก provider/merchant account แทนเจ้าของ
- publish ราคา/สิทธิ์เป็น final โดยไม่มี approval
- นับ payment/conversion/revenue จาก mock/static/sandbox preparation

## D. Group / Partner API operations decisions

### D1. Group data retention
Issue #45 ต้องการ **approved retention period** ก่อน cleanup จริง.

ต้องตัดสินใจ:
- expired `group_rooms` เก็บกี่วัน/ชั่วโมงหลัง product expiry
- `group_votes` ใช้ retention เดียวกันหรือ policy อื่น
- legal/product rationale และผู้อนุมัติ

หลังตัดสินใจ ผู้ช่วยทำได้:
- implement safe purge after approved retention
- verify FK cascade removes linked votes
- prove active rooms are not deleted
- rerun advisors/regressions and update Privacy/Operations evidence

### D2. Partner/tracking retention
Issue #123 / data-governance path ต้องกำหนด retention ของข้อมูลที่เกี่ยวข้อง เช่น click/search/session/conversion ตาม schema จริง ณ เวลาทำ Production decision.

หลังตัดสินใจ ผู้ช่วยทำได้:
- execute policy-bounded dry-run
- implement cleanup/anonymization as approved
- verify no unintended rows/data classes are affected

### D3. Anonymous API abuse controls
Group/Partner public actions intentionally support anonymous usage. Complete rate/quota controls therefore require a real requirement rather than an arbitrary number.

ต้องตัดสินใจ/ระบุ requirement:
- expected traffic range หรือ launch traffic cap
- privacy constraints ของ identifier ที่อนุญาตให้ใช้เพื่อ rate-limit
- acceptable false-positive/availability tradeoff

หลัง requirement ชัด ผู้ช่วยทำได้:
- design/implement bounded rate/quota strategy
- add non-mutating/negative tests
- verify anonymous friend voting/public discovery behavior is not broken

## E. Monitoring / Operations ownership

Technical monitor/probe preparation exists, but Production ownership cannot be invented.

ต้องระบุภายหลัง:
1. Primary monitoring owner
2. Alert channel ที่ใช้งานจริง
3. Escalation/support path
4. Deploy owner / emergency approver
5. Backup/restore/rollback owner

หลังระบุ ผู้ช่วยทำได้:
- wire supported alert/self-test paths where available
- perform actual alert-delivery verification
- establish real traffic/error/latency baseline after traffic exists
- run controlled restore/recovery/rollback rehearsal and capture evidence

## F. Restaurant / affiliate commercial model

ต้องตัดสินใจเมื่อพร้อมเปิดโมเดลนี้:
- จะเริ่มจาก direct restaurant agreement, affiliate provider หรือยังไม่เปิดรายได้ส่วนนี้
- commission/affiliate terms
- conversion definition ที่ตรวจสอบได้
- cancel/refund/dispute/reconciliation owner
- partner/tracking disclosures

ก่อนมีร้าน/provider/ข้อตกลงจริง:
- Partner Beta form records = QA only
- click/search counts = operational observations only
- conversion/revenue/partner readiness = NOT ESTABLISHED

## G. iPhone 17 Pro Max / 3,000-member campaign

Campaign remains **PRE-LAUNCH**.

ก่อนเปิดจริงต้องมีอย่างน้อย:
- legal/promotion rules review
- eligibility/start/end/draw/winner-verification rules
- privacy disclosure
- Premium/payment linkage rules if applicable
- trusted backend eligible-count source
- inventory/prize procurement + fulfillment owner
- explicit launch approval

Until then:
- keep `0 / 3,000` pre-launch boundary
- ordinary account use is not prize entry
- do not publish achieved eligible-user count without trusted evidence

## Recommended owner-decision timing

เพื่อไม่รบกวนการปิด Beta QA ให้ขอคำตอบเป็น 3 รอบเท่านั้น:

**Round 1 — หลัง device/Beta technical gate ใกล้ปิด**
- Web/PWA vs native
- อนุญาต/ไม่อนุญาต Supabase paid-plan dependency ถ้ายังจำเป็น

**Round 2 — ก่อน Commercial build/integration**
- controller/contact/legal-review inputs
- retention decisions
- monitoring/operations owners
- payment provider/merchant/price/entitlements

**Round 3 — ก่อนเปิด revenue/campaign จริง**
- restaurant/affiliate agreement model
- controlled Production payment acceptance
- final Privacy/Terms approval
- campaign legal/fulfillment approval (ถ้าจะเปิด)

## Current boundary

จนกว่ารายการที่เกี่ยวข้องจะได้รับคำตอบและ execution evidence จริง:
- Public Beta = governed by Issue #5 + Issue #1
- Recruitment = Issue #3 gate remains closed
- Commercial = Issue #2 / `PRODUCTION-READINESS.md` remains **NO-GO**
- Payment/Privacy decision records remain `NOT APPROVED`
