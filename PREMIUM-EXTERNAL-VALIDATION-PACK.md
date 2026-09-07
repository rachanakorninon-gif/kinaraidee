# Kinaraidee — Premium External Validation Pack

Research refresh: **2026-09-07**

Status: **READY-TO-CONTACT PACK / NO COMMERCIAL OR LEGAL APPROVAL IMPLIED**

Purpose: give the project owner a single ready-to-use checklist and outreach copy for external facts that cannot be truthfully manufactured inside the repository: real payment-provider/account capability, competent-authority guidance for any prize campaign, and organizer-specific Thai tax/accounting treatment.

Canonical business baseline: `BUSINESS-COMMERCIAL-BASELINE.md`.

Related trackers:
- Issue #352 — 3,000 Premium campaign launch gate
- Issue #357 — Thailand payment-provider validation
- Issue #363 — Premium value interviews Round 1

## 1. Current business inputs already decided

Owner-approved planning inputs as of 2026-09-07:

- first commercial path: Web/PWA
- Premium Beta: **THB 59/month**
- Free Trial: none in first Beta
- provider baseline: **Stripe Payments**
- merchant form: **individual / natural person**
- market/currency: Thailand / THB
- card: THB 59/month with auto-renew as a target only after provider/account-specific recurring-card validation
- PromptPay: THB 59 per paid period; customer initiates payment again each period; no auto-renew
- cancellation: cancel renewal any time and keep paid-period access through period end
- failed payment does not extend Premium

These are business decisions, not provider/account approval or Payment PASS.

## 2. Payment-provider validation — Stripe first

Stripe Payments is the first-provider baseline. The first external task is therefore to validate the actual Thailand account path rather than run a generic provider bake-off.

Time-bounded official Stripe public references checked on 2026-09-07 are recorded in `BUSINESS-COMMERCIAL-BASELINE.md` / `PAYMENT-PREMIUM-DECISION.md`. They indicate:

- Stripe Payments is available for the Thailand path
- the Thailand Billing page states `Billing — Not available in your country`
- PromptPay is customer-initiated/non-recurring
- public Thailand pricing is a planning input only, not merchant-specific settlement evidence

Therefore the current technical target is **Stripe Payments + Kinaraidee-controlled subscription/entitlement lifecycle**, not an assumption that Stripe Billing is enabled.

### Core business description to send

> Kinaraidee (กินอะไรดี) is a Thailand-focused Web/PWA food-decision product. The product owner has approved a first-Beta Premium business price of THB 59 per month, but no real-money flow is live and our strict Payment/Legal gates remain closed. The merchant form is intended to be an individual/natural-person Thailand account. We are validating Stripe Payments for (1) card payment with a provider-permitted future recurring/off-session monthly collection path and (2) PromptPay as a customer-initiated payment each paid period. We need Test Mode validation, secure server-side payment truth, cancellation/refund/dispute lifecycle support, reconciliation and authenticated webhooks suitable for a Supabase-based backend.

### Core Stripe/account questions

1. Can an **individual/natural-person Thailand merchant** onboard for this Web/PWA digital Premium use case?
2. Is THB 59 card payment supported for this account/use case?
3. For a monthly card plan implemented without Stripe Billing, what exact Stripe-supported setup should be used to capture consent/store the PaymentMethod and make future recurring/off-session charges?
4. Does the intended recurring/card-on-file/MIT path require account-level approval, feature enablement, mandate wording or additional merchant terms?
5. What authentication/SCA/3DS/customer-action behavior must be handled on first payment and on future off-session attempts for Thai-issued cards?
6. Which exact API objects/events should be treated as authoritative success/failure/action-required truth for this design?
7. What webhook signature-verification method and event/reference should be used for idempotency and duplicate/out-of-order delivery?
8. How should a failed recurring attempt and customer-authentication-required recovery be implemented?
9. What is the recommended cancel-at-period-end pattern when Kinaraidee controls the subscription lifecycle rather than Stripe Billing?
10. How should refunds, disputes and chargebacks be represented and reconciled for this account?
11. Is PromptPay available for this individual Thailand account/use case, and what provider event is authoritative for QR payment success/expiry?
12. Please confirm PromptPay cannot be used as an automatic recurring debit for the next paid period under this intended flow.
13. What are the actual merchant-account fees/settlement terms for domestic cards, PromptPay, refunds, disputes, international cards and any other relevant charges?
14. What payout schedule, minimum/hold/reserve rules apply to this account?
15. What receipt/invoice/tax functions are supplied by Stripe versus the merchant's own responsibility?
16. What Production activation/KYC requirements must be completed before accepting real money?
17. What support/escalation path applies after Production launch?

### Stripe first-contact copy

> Hello Stripe Sales / Support,
>
> We are preparing Kinaraidee (กินอะไรดี), a Thailand-focused Web/PWA food-decision product. The product owner has approved a first-Beta Premium business price of THB 59/month, but no live payments are enabled yet and our internal Payment/Legal gates remain closed.
>
> Our intended merchant form is an individual/natural-person Thailand account. We are using Stripe Payments as the first-provider baseline. We understand from the current Thailand Billing page that Stripe Billing is not available in our country path, so we are **not** asking to assume Stripe Billing/subscriptions are enabled.
>
> Instead, we need account-specific confirmation of the supported Stripe Payments architecture for:
> 1. a first card payment plus a permitted future recurring/off-session monthly charge path, including consent/setup, card-on-file/MIT, 3DS/customer-action handling and any account approval requirements; and
> 2. PromptPay as a customer-initiated payment for one paid period, with no automatic renewal.
>
> We also need the real account fees, settlement terms, Test Mode path, webhook verification/event truth, cancellation/refund/dispute behavior and Production activation requirements.
>
> Please help us validate the questions below for this Thailand account/use case:
>
> [insert Core Stripe/account questions 1–17]
>
> Thank you.

Current route reference from prior research:
- Thailand Sales form: https://stripe.com/th/contact/sales

Do not put private merchant IDs, API keys, webhook secrets or sensitive account correspondence in the public repository.

## 3. Fallback-provider outreach — only if Stripe validation creates a blocker

Do not switch provider merely because a fallback has a marketing page for recurring billing. Reopen the provider decision only if the actual Stripe account/path cannot satisfy an approved critical requirement, pricing/risk becomes unacceptable, or the owner deliberately authorizes a new provider experiment.

### Shared fallback questions

1. Can the exact individual/natural-person Thai merchant onboard for this digital subscription use case?
2. Can the account charge THB 59 recurring monthly card payments on Web/PWA?
3. Which payment methods support recurring billing specifically?
4. Which Thai local methods are customer-initiated only?
5. What are the account-specific transaction/recurring/platform fees?
6. Settlement currency, payout schedule, minimum/hold/reserve rules?
7. Is a sandbox/test merchant environment available before Production?
8. How are backend notifications/webhooks authenticated and deduplicated?
9. How are renewal failure, action-required/retry and terminal failure represented?
10. How are cancel-at-period-end and immediate cancellation represented?
11. How are refunds, disputes and chargebacks represented/reconciled?
12. Is a hosted checkout/customer portal/cancel flow available?
13. Does card-on-file/MIT/recurring require account approval or enablement?
14. What support/SLA/escalation path applies?
15. Which receipt/invoice/tax functions are provider-supplied versus merchant responsibility?

### Omise/Opn fallback contact copy

> สวัสดีครับ ทีม Omise
>
> ผมกำลังพัฒนา “กินอะไรดี” (Kinaraidee) ซึ่งเป็น Web/PWA สำหรับช่วยตัดสินใจเลือกอาหาร โดย Business baseline ของ Beta กำหนด Premium 59 บาท/เดือน แต่ยังไม่ได้เปิดรับเงินจริง
>
> ขณะนี้ Stripe Payments เป็น provider baseline แรกของโครงการ และเรากำลังเก็บข้อมูล fallback เฉพาะกรณีที่ actual account/path ไม่รองรับ requirement สำคัญ จึงต้องการยืนยันว่า Omise รองรับ individual/natural-person Thai merchant สำหรับ recurring monthly card payment ใน THB หรือไม่ รวมทั้ง recurring lifecycle, card-on-file/MIT/3DS, webhook verification, sandbox, refund/dispute/cancellation และค่าธรรมเนียมของบัญชีจริง
>
> รบกวนช่วยตอบคำถามตามรายการ Shared fallback questions 1–15 หรือแนะนำทีม Sales/Technical ที่เหมาะสมครับ
>
> ขอบคุณครับ

Prior research routes; verify before use:
- https://www.omise.co/th/contact-us
- https://www.omise.co/en/contact-partner

### 2C2P fallback contact copy

> Hello 2C2P Sales,
>
> We are preparing Kinaraidee, a Thailand-focused Web/PWA product with an owner-approved Beta business price of THB 59/month, but no live payments are enabled.
>
> Stripe Payments is our first provider baseline; we are collecting fallback facts only in case the actual Stripe account/path cannot meet a critical requirement. Please confirm whether an individual/natural-person Thai merchant can onboard for this digital Premium use case and whether the account can use your current recurring/RPP card integration in THB, including commercial fees, sandbox, secure backend notifications, retry/action-required/cancel/refund/dispute lifecycle and reconciliation.
>
> [insert Shared fallback questions 1–15]

Prior research route; verify before use:
- https://2c2p.com/contact-us/

## 4. Provider answer record

Do not summarize a provider answer as `PASS` unless the actual account/business facts are explicit. For each provider/contact record:

- contact date/timezone
- contact channel
- provider representative/team
- actual Thai merchant form tested: individual/natural person unless the Business baseline changes
- onboarding: confirmed / rejected / conditional
- exact use case described
- card first-payment availability
- recurring/off-session availability: confirmed / rejected / conditional
- exact recurring architecture/object/approval requirements
- customer-authentication/action-required behavior
- PromptPay availability and non-recurring behavior
- account-specific fee quote/date
- settlement/payout/hold/reserve terms
- Test Mode/sandbox availability
- webhook verification method
- authoritative event/payment references
- idempotency/out-of-order guidance
- lifecycle state mapping
- cancellation behavior
- refund/dispute/chargeback behavior
- hosted checkout/portal availability if relevant
- support/escalation path
- tax/invoice responsibilities
- Production activation/KYC requirements
- unresolved questions
- evidence/reference (email, ticket, dashboard screenshot or provider document)

Do not commit private credentials, API secrets, private merchant IDs, personal identity documents or sensitive provider correspondence to the public repository.

## 5. DOPA / competent-authority preflight — prize campaign only

The 3,000-member/iPhone campaign remains PRE-LAUNCH and is **not** part of the approved first Premium launch baseline. Perform this contact only when the owner is preparing to revive/launch that campaign.

### Purpose of the first contact

Do **not** ask only “ต้องขอใบอนุญาตไหม?” without describing the mechanic. Ask the competent authority to confirm the correct procedure for the actual planned structure.

### Mechanic description to use

> โครงการ “กินอะไรดี” กำลังวางแผนสมาชิก Premium 59 บาท/เดือนบน Web/PWA โดยมีแนวคิดกิจกรรมส่งเสริมการขายแยกต่างหากว่า เมื่อเปิดกิจกรรมตามกติกาแล้ว ผู้ใช้ที่เป็นสมาชิก Premium และผ่านเงื่อนไขที่กำหนดจะอยู่ในกลุ่มผู้มีสิทธิ์สำหรับการสุ่ม/จับรางวัล iPhone 17 Pro Max 256GB จำนวน 1 เครื่อง ขณะนี้กิจกรรมยัง PRE-LAUNCH, entries ยังไม่เปิด, eligible_count ยังเป็น 0 ตาม gate และยังไม่ได้รับอนุญาตให้ใช้ Business/Premium approval เป็นการเปิดกิจกรรม

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

### Prior official DOPA contact references

Prior research found official DOPA material for this licensing family describing filing at the Bureau of Investigation and Legal Affairs (วังไชยา), Nakhon Sawan Road, Dusit, Bangkok, or district offices according to jurisdiction, with contact references around the responsible public-order/legal units.

Sources from the prior research pack:
- https://multi.dopa.go.th/tspd/tpad/assets/modules/work_manual/uploads/80c4bda320f323f3c5654da85c9f612f661615c7b518e0102882367325518845.pdf
- https://www.dopa.go.th/news/preview/7894
- https://multi.dopa.go.th/omd4/official_letter/download/14

Re-verify the current responsible unit, procedure, phone number and filing instructions immediately before contact; organizational details may change.

## 6. Accountant / Thai tax adviser preflight

### Current facts to provide

- merchant/business form baseline: individual / natural person
- final published service/controller legal identity: still subject to the strict Production Privacy/Legal gate
- Premium Beta business price: **THB 59/month**
- payment direction: Stripe Payments first; card recurring target conditional on validation; PromptPay customer-initiated per paid period
- no Production Premium revenue established yet
- prize campaign: separate PRE-LAUNCH concept only
- prize concept if revived: iPhone 17 Pro Max 256GB, one unit
- any old Apple Thailand reference price is planning history only and must be replaced by actual current procurement/value evidence if a prize is acquired
- campaign chance-based mechanic and final rules remain unapproved
- campaign window/checkpoint/draw procedure remain unapproved until final rules exist
- who bears any winner withholding amount remains undecided unless separately approved

### Questions to obtain written answers for

For Premium/payment operations:

1. What tax registration/receipt/tax-invoice obligations apply to an individual/natural-person Thai operator charging THB 59/month for this Web/PWA digital service?
2. How should Stripe settlement, payment fees, refunds, disputes and PromptPay/card receipts be recorded?
3. What records should be retained and for how long for subscription/payment audit and tax purposes?
4. At what revenue/other thresholds, if any, would additional registrations or obligations arise for this actual operator/use case?
5. Which taxes/accounting treatments apply to the provider fees and customer receipts under the actual merchant setup?

If the prize campaign is revived, additionally ask:

6. For the exact non-cash prize, what value is used to determine withholding tax?
7. Does any current prize/sweepstakes withholding rule apply to the final mechanic and organizer/payee relationship, and at what rate?
8. Who is legally responsible for remitting the withholding amount?
9. If the organizer bears a cash withholding amount for a non-cash prize, is gross-up required and how should it be calculated/accounted for?
10. Which withholding return/certificate must be filed/issued and by what deadline?
11. What winner identification information is actually required for tax documentation?
12. What wording should the public rules use regarding tax responsibility?
13. How should the organizer book purchase and transfer of the prize?
14. Does VAT or another tax consequence arise from purchasing/transferring the prize?
15. Are there additional consequences if the winner cannot be contacted and a reserve winner is used?

### Evidence rule

Record the adviser/accountant name/firm, consultation date, operator/entity assumed, exact Premium/campaign mechanic assumed, written conclusion/reference and any filing owner. Do not treat a generic web article as operator-specific tax approval.

## 7. External validation completion rule

Payment/provider external validation is complete only when actual account facts are documented and the strict decision/execution gates can be updated truthfully under their existing repository contract.

Minimum external evidence before enabling Production card auto-renew:
- individual Thailand merchant/account onboarding path confirmed
- exact recurring/off-session card architecture permitted for the account/use case
- consent/setup/authentication/MIT requirements confirmed
- Test Mode lifecycle demonstrated
- account-specific commercial/settlement terms known
- secure webhook/event truth and reconciliation model confirmed
- cancellation/refund/dispute/chargeback behavior confirmed
- Production activation/KYC requirements completed

Minimum external evidence before relying on PromptPay:
- actual account PromptPay eligibility confirmed
- provider-backed QR success/expiry truth demonstrated
- no-auto-renew disclosure matches provider behavior
- fees/settlement/refund behavior confirmed

Minimum evidence before any prize campaign LIVE:
- competent-authority/legal route for the exact mechanic resolved
- any required authorization/license obtained
- accountant/tax treatment recorded
- final public rules align with the approved mechanic
- payment/Premium backend passed all sandbox/Production-readiness gates
- campaign-specific eligibility/count/kill-switch/fulfillment gates pass

Until the applicable gates pass:
- strict Payment/Premium execution remains NOT APPROVED
- Production Privacy/Legal remains NOT APPROVED
- campaign remains PRE-LAUNCH
- `entries_open=false`
- `eligible_count=0`
- no payment, subscriber, paid conversion, partner, MRR, revenue or prize entry should be claimed from preparation work alone

## 8. Action ownership boundary

This pack is ready for the owner/team to use when external contact is authorized. Preparing outreach copy is safe repository work; **sending external messages, submitting merchant onboarding/KYC, accepting provider terms, supplying identity documents, creating a merchant account, approving spend, or committing to a provider is an external action and must be explicitly authorized by the owner at execution time.**
