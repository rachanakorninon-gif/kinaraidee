# Kinaraidee — Premium External Validation Pack

Research refresh: **2026-08-29**

Status: **READY-TO-CONTACT PACK / NO COMMERCIAL OR LEGAL APPROVAL IMPLIED**

Purpose: give the project owner a single ready-to-use checklist and outreach copy for the remaining external facts that cannot be truthfully manufactured inside the repository: real payment-provider merchant facts, DOPA guidance/authorization path, and organizer-specific Thai tax/accounting treatment.

Related trackers:
- Issue #352 — 3,000 Premium campaign launch gate
- Issue #357 — Thailand payment-provider validation
- Issue #363 — Premium value interviews Round 1

## 1. Payment-provider outreach

Use the same core questions for each candidate so the comparison stays fair. Do not commit to a provider during the first conversation.

### Core business description to send

> Kinaraidee (กินอะไรดี) is a Thailand-focused web/PWA food-decision product. We are evaluating a future monthly digital Premium subscription in THB. No real-money flow is live yet. We need a recurring billing path with sandbox testing, secure server-side payment status, cancellation/refund/dispute lifecycle support and webhook/backend notification suitable for a Supabase-based backend.

### Core questions

1. Can the exact Thai merchant/business entity onboard for this digital subscription use case?
2. Can the account charge a recurring monthly Premium subscription in THB on Web/PWA?
3. Which payment methods on this account support recurring billing specifically?
4. What are the current transaction + recurring/subscription platform fees for this account?
5. Settlement currency, payout schedule and minimum/hold rules?
6. Is a sandbox/test merchant environment available before production?
7. How must webhook/backend notifications be authenticated or verified?
8. What provider event/reference should be used for idempotency and duplicate deliveries?
9. How are renewal failure, retry, grace and terminal failure represented?
10. How are cancel-at-period-end and immediate cancellation represented?
11. How are refunds, disputes and chargebacks represented and reconciled?
12. Is a hosted checkout/customer portal/cancel flow available?
13. Does recurring/card-on-file/MIT require an account-level approval or feature enablement?
14. What support/SLA/escalation path applies after production launch?
15. Which Thai receipt/invoice/tax functions are supplied by the provider versus merchant responsibility?

### Omise/Opn first-contact copy

> สวัสดีครับ ทีม Omise
>
> ผมกำลังพัฒนา “กินอะไรดี” (Kinaraidee) ซึ่งเป็น Web/PWA สำหรับช่วยตัดสินใจเลือกอาหาร และกำลังประเมินระบบสมาชิก Premium รายเดือนในประเทศไทย โดยยังไม่ได้เปิดรับเงินจริงในขณะนี้
>
> ต้องการสอบถามความเหมาะสมของ Omise สำหรับ recurring monthly subscription ใน THB โดยเฉพาะเรื่อง merchant onboarding, payment methods ที่รองรับ recurring จริง, Schedule/recurring lifecycle, card-on-file/MIT/3DS, webhook verification, sandbox, refund/dispute/cancellation และค่าธรรมเนียมของบัญชีจริง
>
> รบกวนช่วยตอบคำถามตามรายการด้านล่าง หรือแนะนำทีม Sales/Technical ที่เหมาะสมให้ด้วยครับ
>
> [วาง Core questions 1–15]
>
> ขอบคุณครับ

Current official routes found during the 2026-08-29 refresh:
- Sales/contact hub: https://www.omise.co/th/contact-us
- Partnership/sales form: https://www.omise.co/en/contact-partner
- Support reference: support@omise.co / +66 2 252 8777

Source references:
- https://docs.omise.co/th/how-to-contact-omise/thailand
- https://www.omise.co/th/contact-us

### Stripe first-contact copy

> Hello Stripe Sales,
>
> We are evaluating Stripe for Kinaraidee, a Thailand-focused Web/PWA food-decision product that may introduce a monthly digital Premium subscription charged in THB. No live payments are enabled yet.
>
> Before selecting a provider, we need account-specific confirmation that Stripe Billing/subscriptions are available for our actual Thailand merchant/entity and use case, plus the recurring payment methods, total Payments + Billing fees, webhook verification, sandbox/test lifecycle, cancellation, refund/dispute and settlement details.
>
> Please help us validate the questions below for a Thailand account:
>
> [insert Core questions 1–15]
>
> A key item for us is explicit confirmation of Billing/subscription availability inside the real Thailand account because public localized availability signals are not sufficient for us to treat this as approved.

Current official route found during the 2026-08-29 refresh:
- Thailand Sales form: https://stripe.com/th/contact/sales
- The official Sales page also currently exposes `sales@stripe.com` as a fallback contact when the form has an error.

### 2C2P first-contact copy

> Hello 2C2P Sales,
>
> We are evaluating 2C2P for Kinaraidee, a Thailand-focused Web/PWA product that may offer a monthly THB Premium subscription. No live payments are enabled yet.
>
> We would like to validate the recommended current recurring/RPP integration for a new Thailand merchant, including merchant onboarding, recurring card/payment-channel availability, current commercial fees, sandbox, backend payment notifications, JWE/JWS/JWT/key-management requirements, retry/cancel/refund/dispute lifecycle and reconciliation.
>
> Please help us confirm the questions below:
>
> [insert Core questions 1–15]

Current official Thailand contact route found during the 2026-08-29 refresh:
- Contact/Sales page: https://2c2p.com/contact-us/
- Thailand office listed there: Empire Tower, South Sathorn Road, Bangkok
- Phone: +66 2 116 7000
- Support email listed: support@2c2p.com

## 2. Provider answer record

Do not summarize a provider answer as “PASS” unless the actual account/business facts are explicit. For each candidate record:

- contact date
- contact channel
- provider representative/team
- actual Thai legal/business entity tested for onboarding
- recurring subscription availability: confirmed / rejected / conditional
- qualifying recurring payment methods
- account-specific fee quote/date
- settlement terms
- sandbox availability
- webhook verification method
- lifecycle state mapping
- cancellation behavior
- refund/dispute/chargeback behavior
- hosted checkout/portal availability
- account feature approvals required
- support/escalation path
- tax/invoice responsibilities
- unresolved questions
- evidence/reference (email, ticket, dashboard screenshot or provider document)

Do not commit private credentials, API secrets, private merchant IDs or sensitive provider correspondence to the public repository.

## 3. DOPA preflight contact

### Purpose of the first contact

Do **not** ask only “ต้องขอใบอนุญาตไหม?” without describing the mechanic. Ask the competent authority to confirm the correct procedure for the actual planned structure.

### Mechanic description to use

> โครงการ “กินอะไรดี” กำลังวางแผนสมาชิก Premium รายเดือนแบบชำระเงินจริง โดยมีแนวคิดกิจกรรมส่งเสริมการขายว่า เมื่อเปิดกิจกรรมตามกติกาแล้ว ผู้ใช้ที่เป็นสมาชิก Premium และผ่านเงื่อนไขที่กำหนดจะอยู่ในกลุ่มผู้มีสิทธิ์สำหรับการสุ่ม/จับรางวัล iPhone 17 Pro Max 256GB จำนวน 1 เครื่อง โดยระบบยังไม่เปิดรับสิทธิ์ ไม่รับเงินจริงเพื่อกิจกรรม และยังไม่ได้กำหนดวันเริ่มกิจกรรม

### Questions for DOPA / competent district office

1. กลไกข้างต้นเข้าข่าย “การแถมพกหรือรางวัลด้วยการเสี่ยงโชคโดยวิธีใด ๆ ในการประกอบกิจการค้าหรืออาชีพ” ตามขั้นตอนใบอนุญาตที่กรมการปกครองเผยแพร่หรือไม่?
2. ผู้ยื่นต้องเป็นนิติบุคคล/บุคคลใด และต้องใช้เอกสารสถานะผู้จัดอะไรบ้าง?
3. หากผู้จัดอยู่กรุงเทพมหานคร ต้องยื่นที่หน่วยงาน/ส่วนงานใด; หากอยู่นอกกรุงเทพฯ ต้องยื่นที่อำเภอใด?
4. ต้องยื่นก่อนเริ่มประชาสัมพันธ์ หรือก่อนเริ่มรับสิทธิ์ หรือทั้งสองอย่าง?
5. ต้องยื่นล่วงหน้าอย่างน้อยกี่วันตามกระบวนการปัจจุบัน?
6. ต้องแนบกติกา สื่อโฆษณา ตัวอย่างหน้าเว็บ วิธีสุ่ม วัน/สถานที่จับรางวัล และรายการรางวัลอะไรบ้าง?
7. การกำหนด “ครบสมาชิก Premium ที่เข้าเกณฑ์ 3,000 คน” เป็น milestone มีข้อกำหนดเฉพาะหรือไม่?
8. หากวันจับรางวัลขึ้นกับวันที่ยอดเข้าเกณฑ์ครบ 3,000 คน สามารถกำหนดแบบมีเงื่อนไขได้หรือจำเป็นต้องระบุวันแน่นอน?
9. ต้องมีพยาน/เจ้าหน้าที่/สถานที่จับรางวัลหรือวิธีบันทึกหลักฐานอย่างไร?
10. การประกาศผลออนไลน์และการเลือกผู้สำรองต้องระบุ/ขออนุมัติอย่างไร?
11. หากแก้ไขกติกาหรือรางวัลหลังยื่น ต้องขอแก้ไขใบอนุญาตอย่างไร?
12. มีข้อความ/เลขที่ใบอนุญาตใดที่ต้องแสดงในโฆษณา/หน้าเว็บหรือไม่?
13. มีค่าธรรมเนียมหรือเอกสารอื่นใดที่ควรเตรียมสำหรับกลไกนี้?
14. ขอช่องทาง/ชื่อส่วนงานที่สามารถยืนยันคำตอบเป็นลายลักษณ์อักษรหรือใช้เป็นหลักฐานการดำเนินการได้

### Current official DOPA contact signals found

Official DOPA material for this licensing family states that applications can be submitted at the Bureau of Investigation and Legal Affairs (วังไชยา), Nakhon Sawan Road, Dusit, Bangkok, or district offices nationwide according to jurisdiction. Current DOPA materials list contact numbers around the relevant public-order/legal unit including `02-356-9575`; an official DOPA page also lists `02-356-9643` for the responsible law area.

Sources:
- https://multi.dopa.go.th/tspd/tpad/assets/modules/work_manual/uploads/80c4bda320f323f3c5654da85c9f612f661615c7b518e0102882367325518845.pdf
- https://www.dopa.go.th/news/preview/7894
- https://multi.dopa.go.th/omd4/official_letter/download/14

Before relying on a phone number for filing, verify the current responsible unit when calling; organizational contact details can change.

## 4. Accountant / Thai tax adviser preflight

### Facts to provide

- organizer legal entity (once known)
- planned monthly Premium price (still unapproved today)
- prize: iPhone 17 Pro Max 256GB, one unit
- current Apple Thailand reference price used in planning: THB 48,900 (must be replaced by actual procurement/value evidence when acquired)
- chance-based campaign connected to qualifying paid Premium status
- proposed campaign window/checkpoint/draw procedure once finalized
- whether organizer intends to bear any winner withholding cash amount or require winner handling, still undecided

### Questions to obtain written answers for

1. For this exact non-cash prize, what value is used to determine withholding tax?
2. Does the current 5% prize/sweepstakes withholding rule apply to this final mechanic and organizer/payee relationship?
3. Who is legally responsible for remitting the withholding amount?
4. If the organizer bears the cash withholding amount for a non-cash prize, is gross-up required and how should it be calculated/accounted for?
5. Which withholding return/certificate must be filed/issued and by what deadline?
6. What winner identification information is actually required for tax documentation?
7. What wording should the public rules use regarding tax responsibility?
8. How should the organizer book purchase and transfer of the iPhone prize?
9. Does VAT or another tax consequence arise from purchasing/transferring the prize?
10. What receipt/tax-invoice obligations arise from the monthly Premium subscription itself for the selected provider/business structure?
11. What records should be retained and for how long for prize/payment audit purposes?
12. Are there additional tax consequences if the winner cannot be contacted and a reserve winner is used?

### Evidence rule

Record the adviser/accountant name/firm, consultation date, organizer/entity assumed, exact mechanic assumed, written conclusion/reference and any filing owner. Do not treat a generic web article as organizer-specific tax approval.

## 5. External validation completion rule

Payment/provider and legal/tax external validation is complete only when the actual business/entity facts are documented and the open decision files can be updated truthfully.

Minimum evidence before payment implementation:
- provider merchant/account onboarding path confirmed
- recurring subscription availability confirmed for that account
- account-specific commercial terms known
- secure notification/lifecycle model confirmed

Minimum evidence before campaign LIVE:
- competent-authority/legal route for exact mechanic resolved
- any required DOPA authorization/license obtained
- accountant/tax treatment recorded
- final public rules align with approved mechanic
- payment/Premium backend passed sandbox and production-readiness gates

Until then:
- Payment/Premium remains NOT APPROVED
- campaign remains PRE-LAUNCH
- `entries_open=false`
- `eligible_count=0`
- no prize entry, payment, conversion, MRR or revenue should be claimed from preparation work alone
