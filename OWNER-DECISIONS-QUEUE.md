# กินอะไรดี — Owner Decisions Queue

เอกสารนี้รวมเรื่องที่ **ไม่ควรให้ระบบ/CI/ผู้ช่วยเดาแทนเจ้าของผลิตภัณฑ์หรือผู้อนุมัติภายนอก** ก่อน Public Beta/Commercial GO และแยกสิ่งที่เจ้าของอนุมัติแล้วออกจากสิ่งที่ยังต้องตัดสินใจ/มีหลักฐานจริง

> รายการนี้ไม่ใช่ Payment PASS, Legal PASS, Public Beta completion หรือ Commercial GO และไม่ใช่หลักฐาน User/Conversion/Payment/Partner/Revenue จริง

## 0. Business decisions ที่ปิดแล้ว — 2026-09-07

Canonical baseline: `BUSINESS-COMMERCIAL-BASELINE.md`

เจ้าของผลิตภัณฑ์อนุมัติแล้ว:
- Launch path แรก: **Web/PWA first**; native iOS/Android ไว้ phase หลังเมื่อมี Product/Funnel/Conversion/Retention evidence และตรวจ store policy ใหม่
- Premium Beta: **THB 59/month**
- Free trial: **ไม่มีใน Beta แรก**
- Free core: `ไม่รู้เลย` + basic recommendation ยังใช้ฟรีได้จริง
- Premium direction: enhanced personalization, Favorites/History ที่มาก/มีประโยชน์ขึ้น, advanced capabilities ตาม implementation และ ad-free หากมีโฆษณาในอนาคต
- Payment provider baseline: **Stripe Payments**
- Merchant form: **individual / natural person**
- Market/currency: **Thailand / THB**
- Card: เป้าหมาย **THB 59/month auto-renew** แต่ยังต้องพิสูจน์ provider/account-specific recurring-card path ใน Test Mode
- PromptPay: **THB 59 ต่อ paid period / customer re-pays each period / no auto-renew**
- Cancel: ยกเลิก renewal ได้ทุกเมื่อและใช้ Premium ต่อถึงจบรอบที่จ่ายแล้ว
- Payment fail: ไม่ต่อสิทธิ์
- Expire: กลับ Free โดยไม่ลบ Favorites/History/Preferences ทันทีเพียงเพราะ downgrade
- Refund baseline: ไม่ refund อัตโนมัติสำหรับรอบที่เริ่มบริการแล้ว แต่รองรับ duplicate/error/system-caused case และสิทธิที่กฎหมาย/provider rules กำหนด
- Privacy/Legal/Support contact: **rachanakorn.inon@gmail.com**
- Under-20 direction: Free ใช้ได้ตามกฎหมาย; paid Premium ต้องมี guardian/legal-representative consent เมื่อกฎหมายกำหนด
- Restaurant monetization direction: **affiliate/commission จาก verifiable action/transaction**; Sponsored Listing พิจารณาภายหลังเมื่อมี traffic จริง

สิ่งข้างบนคือ **owner-approved business baseline** เท่านั้น ไม่ใช่ execution evidence.

## A. ยังไม่ต้องตอบตอนนี้ — technical/Public Beta dependencies

### A1. Supabase paid-plan / leaked-password protection

**ยังเป็น owner decision ภายหลังถ้ายังจำเป็น:** อนุญาตหรือไม่อนุญาตค่าใช้จ่าย/plan upgrade ที่จำเป็นต่อ leaked-password protection ตาม provider state จริงในเวลานั้น

ก่อนมีคำตอบ:
- คงสถานะ `BLOCKED BY VERIFIED FREE PLAN / CONFIGURATION — NOT PASS` ถ้ายังเป็น dependency จริง
- ห้ามใช้ successful signup/sign-in/reset เป็นหลักฐานแทน leaked-password rejection
- ห้ามทำรายการชำระเงิน/อัปเกรดแทนเจ้าของ

### A2. Distribution path

**RESOLVED สำหรับ commercial path แรก:** Web/PWA first.

Native app เป็น phase หลังและต้องมีการ review ใหม่เรื่อง developer accounts, store policies, subscription/payment rules และ release requirements ก่อนเริ่ม distribution จริง

## B. Production Privacy / Legal — PARTIAL INPUTS CONFIRMED / NOT APPROVED

Canonical gate: `PRODUCTION-PRIVACY-LEGAL-DECISION.md`.

ยืนยันแล้ว:
- Production-facing contact: **rachanakorn.inon@gmail.com**
- Merchant form: individual / natural person
- Under-20 policy direction ตาม `BUSINESS-COMMERCIAL-BASELINE.md`

ยังต้องมี/ยืนยันก่อน Legal PASS:
1. ชื่อบุคคล/controller legal identity ที่จะเผยแพร่จริง
2. PDPA/legal reviewer/approver ตามที่ต้องใช้จริง
3. processing-purpose/legal-basis review ตาม implementation จริง
4. retention decision ของแต่ละ data class
5. data-rights owner/process ที่ใช้งานจริง
6. Production vendors/processors ที่ใช้จริงและ disclosure ที่ตรงกัน
7. final published Privacy Policy + Terms URL/version
8. payment/subscription/refund/cancellation disclosure review
9. under-20/guardian-consent UX + legal review ตาม flow จริง

ห้าม invent identity, retention, legal basis หรือประกาศ Legal PASS จาก draft/CI เพียงอย่างเดียว

## C. Payment / Premium — BUSINESS BASELINE RESOLVED / EXECUTION OPEN

Canonical records:
- `BUSINESS-COMMERCIAL-BASELINE.md`
- `PAYMENT-PREMIUM-DECISION.md`
- `PREMIUM-SUBSCRIPTION-ARCHITECTURE.md`

ไม่ต้องถามเจ้าของซ้ำเรื่อง provider baseline, merchant form, THB 59, Free/Premium principle, card-vs-PromptPay renewal model, cancellation/refund baseline เว้นแต่มี provider/legal/implementation evidence ใหม่ที่บังคับให้เปลี่ยน decision.

สิ่งที่ผู้ช่วย/ทีมทำต่อได้โดยไม่ต้องตัดสิน Business ใหม่:
- Stripe Test Mode proof สำหรับ first payment + recurring-card target path
- PromptPay provider-confirmed activation path
- backend-authoritative entitlement
- webhook signature/idempotency/out-of-order safety
- failure/authentication recovery
- cancel-at-period-end/expiry behavior
- refund/dispute test/runbook preparation
- provider ↔ transaction ↔ entitlement reconciliation
- Production controlled-acceptance checklist

ยังห้าม:
- รับเงินจริงก่อน gates ผ่าน
- อ้างว่า recurring card operational ก่อน provider/account-specific evidence
- ใช้ Browser redirect เป็น payment truth
- นับ mock/static/sandbox เป็น subscriber, conversion, MRR หรือ revenue

## D. Group / Partner data-governance decisions

### D1. Group data retention
Issue #45 ยังต้องมี approved retention period ก่อน cleanup จริง:
- expired `group_rooms` เก็บนานเท่าไรหลัง product expiry
- `group_votes` ใช้ retention เดียวกันหรือ policy อื่น
- legal/product rationale + approver

### D2. Partner/tracking retention
Issue #123/data-governance path ยังต้องกำหนด retention/anonymization ของ click/search/session/conversion ตาม schema จริงก่อน Production cleanup.

### D3. Anonymous API abuse controls
ต้องมี requirement จริงก่อนกำหนด rate/quota:
- expected traffic range / launch cap
- identifier/privacy constraints
- acceptable false-positive / availability tradeoff

ผู้ช่วยทำ design/implementation/test ต่อได้เมื่อ requirement เหล่านี้ชัด โดยไม่เดาตัวเลขแทนเจ้าของ

## E. Monitoring / Operations ownership

Technical monitor/probe preparation ไม่ใช่ Production ownership.

ยังต้องระบุเมื่อเข้าใกล้ Production:
1. primary monitoring owner
2. alert channel จริง
3. escalation/support path
4. deploy owner / emergency approver
5. backup/restore/rollback owner

Production contact email ที่อนุมัติแล้วช่วยเรื่อง customer-facing support contact แต่ **ไม่เท่ากับ** การกำหนด on-call/ops ownership ทั้งหมด

## F. Restaurant / affiliate commercial model — DIRECTION RESOLVED / AGREEMENT OPEN

Owner-approved direction:
- affiliate/commission เมื่อมี verifiable action/transaction
- Sponsored Listing ภายหลังเมื่อมี real traffic และต้อง disclose ชัด

ยังต้องมีเมื่อพร้อมเปิด revenue stream นี้:
- provider/restaurant agreement จริง
- commission terms
- conversion definition + attribution source of truth
- cancel/refund/dispute/reconciliation owner
- partner/tracking disclosures

ก่อนข้อตกลงและ confirmed commission จริง:
- Partner Beta form = QA only
- click/search = operational observations only
- partner count/conversion/revenue = NOT ESTABLISHED

## G. iPhone 17 Pro Max / 3,000-member campaign

Campaign remains **PRE-LAUNCH** และไม่ถูกอนุมัติจาก Business baseline รอบนี้

ก่อนเปิดจริงยังต้องมีอย่างน้อย:
- legal/promotion rules review
- eligibility/start/end/draw/winner-verification rules
- privacy disclosure
- Premium/payment linkage rules ถ้ามี
- trusted backend eligible-count source
- prize procurement/fulfillment owner
- explicit launch approval

Until then:
- keep `eligible_count=0` boundary ตาม canonical campaign state
- ordinary account use ไม่ใช่ prize entry
- ห้ามอ้าง achieved eligible-user count โดยไม่มี trusted evidence

## Recommended owner-decision timing

ไม่ต้องถามเจ้าของซ้ำเรื่อง Business baseline ที่ปิดแล้ว ให้กลับมาถามเฉพาะเมื่อมี dependency ที่ผู้ช่วยทำเองไม่ได้จริง เช่น:

**Technical/Beta:** paid-plan cost approval ถ้ายังจำเป็น

**Before Commercial build/Production:** controller legal identity, retention, operations ownership, final legal approvals, หรือ provider/account constraint ที่ทำให้ต้องเปลี่ยน payment baseline

**Before revenue/campaign:** restaurant agreement terms, controlled Production payment acceptance, campaign legal/fulfillment approval

## Current boundary

- Owner-approved Business baseline: **RECORDED**
- Payment execution/PASS: **PENDING**
- Production Privacy/Legal PASS: **PENDING**
- Public Beta: governed by canonical QA/release evidence
- Recruitment: governed by its existing gate
- Commercial: remains **NO-GO** until all applicable gates have real evidence
