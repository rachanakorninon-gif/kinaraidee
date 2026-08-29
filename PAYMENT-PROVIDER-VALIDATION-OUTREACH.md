# Kinaraidee — Payment Provider Validation Outreach Pack

Status: **DRAFT / READY TO SEND AFTER REAL BUSINESS FIELDS ARE FILLED / PROVIDER NOT SELECTED / PAYMENT NOT APPROVED**

Purpose: prepare consistent account-specific questions for Omise/Opn, Stripe and 2C2P so the answers can be compared fairly before Kinaraidee chooses a monthly Premium payment provider.

This pack does **not** create a merchant account, approve a provider, approve Premium pricing, authorize real-money collection, create a subscription, prove recurring availability for a real account, or create campaign eligibility/revenue evidence.

Related:
- `PAYMENT-PROVIDER-SHORTLIST-TH.md`
- `PAYMENT-PREMIUM-DECISION.md`
- Issue #357 — Payment provider validation
- Issue #366 — Premium backend implementation, provider-gated
- Issue #352 — 3,000 Premium campaign launch gate

---

## 1. Fill these real business fields before sending

Do not commit personal/private contact data back into this public repository. Fill these values only in the private message/email/contact form actually sent to the provider.

- Legal business / merchant name: `[LEGAL BUSINESS NAME]`
- Business type / registration status: `[BUSINESS TYPE / REGISTRATION STATUS]`
- Registered country: `Thailand`
- Business website / product URL: `[BUSINESS WEBSITE OR PUBLIC KINARAIDEE URL]`
- Contact name: `[REAL CONTACT NAME]`
- Work email: `[REAL WORK EMAIL]`
- Work phone, if provider requires it: `[REAL WORK PHONE]`
- Product: `Kinaraidee / กินอะไรดี — Web/PWA meal-decision application`
- Intended product: `Monthly digital Premium subscription`
- Intended billing currency: `THB`
- Target Premium price: `[TBD — DO NOT INVENT]`
- Estimated monthly subscription/payment volume: `[TBD — DO NOT INVENT]`
- Expected launch timing: `[TBD]`

If a provider requires company-registration, tax, bank-account, beneficial-owner or identity documents, submit them only through that provider's authorized/private onboarding channel. Never upload those documents to this public repository or a public GitHub issue.

---

## 2. Common message — English

**Subject:** Thailand monthly subscription / recurring-payment validation for Kinaraidee

Hello,

We are evaluating payment providers for **Kinaraidee (กินอะไรดี)**, a Thailand-focused Web/PWA application. We are considering a future **monthly digital Premium subscription billed in THB**.

Before choosing a provider or beginning production integration, we would like to confirm the following for our **actual Thailand merchant/business account**, not only general product availability:

1. Can our exact Thailand business/merchant entity onboard for this use case now?
2. Can the account sell a monthly digital Premium subscription in THB through a Web/PWA?
3. Which payment methods are supported for **recurring billing specifically** for this account? Please distinguish recurring-capable methods from one-time payment methods.
4. What are the current Payments + recurring/subscription fees that would apply to our account and intended model?
5. What settlement currency, payout timing and payout conditions would apply?
6. Is a sandbox/test merchant environment available before production activation?
7. How must webhook/backend-notification authenticity be verified?
8. What unique event/reference should be used for idempotency and duplicate-delivery protection?
9. How are renewal failures, retries, grace periods and final failures represented?
10. How are cancel-at-period-end and immediate cancellation represented?
11. How are refunds, disputes and chargebacks represented, and what operational actions are required from the merchant?
12. Is a hosted checkout and/or customer portal/cancel flow available for this use case?
13. Do recurring/card-on-file/MIT capabilities require account-level approval, feature flags or additional compliance steps?
14. What production support/SLA/incident escalation path is available for this merchant account?
15. What Thailand tax, invoice or receipt tooling is provided by the payment platform, and what remains the merchant's responsibility?

Our intended architecture is server-authoritative: payment notifications are verified on the backend, duplicate events are handled idempotently, and browser/local state will not grant Premium entitlement by itself.

Please let us know which documentation, account setup steps and commercial information you need from us to provide account-specific answers.

Thank you.

Business / merchant name: `[LEGAL BUSINESS NAME]`
Website: `[BUSINESS WEBSITE OR PUBLIC KINARAIDEE URL]`
Contact: `[REAL CONTACT NAME]`
Email: `[REAL WORK EMAIL]`

---

## 3. Common message — Thai

**หัวข้อ:** สอบถามการรองรับสมาชิก Premium รายเดือนในประเทศไทยสำหรับ Kinaraidee

สวัสดีครับ/ค่ะ

เรากำลังประเมินผู้ให้บริการชำระเงินสำหรับ **Kinaraidee (กินอะไรดี)** ซึ่งเป็น Web/PWA สำหรับผู้ใช้ในประเทศไทย และมีแผนพิจารณาเปิด **Premium แบบสมาชิกรายเดือน ชำระเป็นเงินบาท (THB)** ในอนาคต

ก่อนเลือกผู้ให้บริการหรือเริ่มเชื่อมต่อระบบจริง ต้องการยืนยันข้อมูลสำหรับ **บัญชีร้านค้า/นิติบุคคลไทยของเราจริง** ดังนี้

1. นิติบุคคล/ร้านค้าของเราสามารถสมัครใช้บริการสำหรับโมเดลนี้ได้ในปัจจุบันหรือไม่
2. บัญชีนี้สามารถขาย Premium ดิจิทัลแบบรายเดือนผ่าน Web/PWA และเรียกเก็บเป็น THB ได้หรือไม่
3. วิธีชำระเงินใดรองรับ **การเรียกเก็บซ้ำ/Recurring จริง** สำหรับบัญชีนี้ กรุณาแยกจากวิธีที่รองรับเฉพาะการชำระครั้งเดียว
4. ค่าธรรมเนียม Payments + Recurring/Subscription ที่ใช้กับบัญชีและโมเดลนี้จริงเป็นเท่าใด
5. สกุลเงินและรอบการโอนเงิน/Settlement/Payout เป็นอย่างไร
6. มี Sandbox/Test merchant environment ให้ทดสอบก่อน Production หรือไม่
7. Webhook/Backend notification ต้องตรวจสอบความถูกต้อง/ลายเซ็นอย่างไร
8. Event ID หรือ Reference ใดควรใช้ป้องกันการประมวลผล webhook ซ้ำ
9. Renewal fail, retry, grace period และ final failure ถูกแสดงเป็นสถานะอย่างไร
10. การยกเลิกเมื่อสิ้นสุดรอบบิล เทียบกับยกเลิกทันที มี semantics/API อย่างไร
11. Refund, dispute และ chargeback ถูกแจ้ง/จัดการอย่างไร
12. มี Hosted Checkout / Customer Portal / Cancel flow หรือไม่
13. Recurring, card-on-file หรือ MIT ต้องขออนุมัติหรือเปิด feature เพิ่มในระดับบัญชีหรือไม่
14. มีช่องทาง Support/SLA/Escalation สำหรับ Production อย่างไร
15. ระบบมีเครื่องมือด้านภาษี ใบเสร็จ หรือใบกำกับภาษีสำหรับประเทศไทยส่วนใด และส่วนใดเป็นหน้าที่ของร้านค้า

สถาปัตยกรรมที่ตั้งใจใช้จะให้ Backend เป็นผู้ยืนยันสถานะการชำระเงินและสิทธิ์ Premium, ตรวจสอบ webhook, ป้องกัน event ซ้ำ และจะไม่ให้ browser/local state เป็นแหล่งมอบสิทธิ์ Premium โดยตรง

รบกวนแจ้งเอกสาร/ขั้นตอนการสมัครและข้อมูลเพิ่มเติมที่ต้องการเพื่อให้คำตอบเฉพาะบัญชีได้ด้วยครับ/ค่ะ

ชื่อธุรกิจ/ร้านค้า: `[LEGAL BUSINESS NAME]`
เว็บไซต์: `[BUSINESS WEBSITE OR PUBLIC KINARAIDEE URL]`
ผู้ติดต่อ: `[REAL CONTACT NAME]`
อีเมล: `[REAL WORK EMAIL]`

---

## 4. Omise / Opn — add these provider-specific questions

Add these questions after the common questionnaire:

1. Current public Charge Schedule documentation states that the Schedule API path cannot be used with an account that has 3-D Secure enabled. For our intended monthly recurring-card subscription, what is the **currently recommended account/integration design** that preserves appropriate 3DS/card-on-file/MIT handling?
2. Please confirm whether recurring charges for our account would use Schedule API, another current recurring product, or an account-specific recommended flow.
3. Which Thailand payment methods available to our account are actually recurring-capable? We do not want to infer recurring support from one-time PromptPay/wallet availability.
4. Does the currently documented scheduled-charge retry behavior — retry next business day, up to two retries and suspension after three consecutive failures — apply to our intended account/configuration? If not, what is the current behavior?
5. What merchant/account approvals are required for card-on-file / merchant-initiated transactions (MIT)?

Official starting contact routes:
- Contact: https://www.omise.co/th/contact-us
- Sales: https://www.omise.co/th/contact-sales

Public research references are recorded separately in `PAYMENT-PROVIDER-SHORTLIST-TH.md`; provider/account confirmation must supersede public assumptions when documented and reviewed.

---

## 5. Stripe — add these provider-specific questions

Add these questions after the common questionnaire:

1. Please confirm whether **Stripe Billing / subscriptions are enabled for this exact Thailand merchant account/business type**. We are asking explicitly because Stripe's current localized public pages show conflicting availability signals.
2. If Billing is available, what total **Payments + Billing** fees would apply to the intended monthly THB subscription for this account?
3. Which payment methods in this Thailand account support recurring subscription collection, not merely one-off payments?
4. Can Stripe Checkout + Billing + Customer Portal support our intended signup/renewal/cancel flow for this account?
5. Are any card-on-file/MIT/3DS settings or approvals required for recurring renewals in Thailand?
6. What is the account-specific production support/escalation path after launch?

Official starting contact route:
- Sales: https://stripe.com/th/contact/sales

Do not treat public product-page visibility as proof of account-level Billing availability. Written/account-level confirmation should be retained privately and summarized in Issue #357 without publishing confidential commercial terms unless appropriate.

---

## 6. 2C2P — add these provider-specific questions

Add these questions after the common questionnaire:

1. For a **new Thailand merchant in 2026**, which current API/RPP integration version and recurring architecture does 2C2P recommend?
2. Which payment channels for our actual merchant account support recurring monthly collection?
3. Which interfaces require JWT, JWE/JWS and merchant public/private key exchange, and what key-rotation/custody process is recommended?
4. What backend notification/response field should be used as the stable idempotency key?
5. What are the current retry/failure/grace/cancel semantics for RPP or the recommended recurring product?
6. Which sandbox flow most closely matches the eventual Thailand production configuration?
7. What account-specific commercial fees, settlement schedule and support/SLA apply?

Official starting contact route:
- Contact: https://2c2p.com/contact-us/

Do not copy sandbox/demo/production credentials into GitHub issues or documentation.

---

## 7. Provider response record — private working copy

Keep confidential account-level/commercial replies outside the public repository when they contain private contact data, credentials, account IDs, negotiated rates or contract terms. Record only the minimum non-sensitive decision evidence in Issue #357 / `PAYMENT-PREMIUM-DECISION.md`.

Suggested private response template:

| Field | Answer | Evidence / date |
|---|---|---|
| Provider | `[Omise / Stripe / 2C2P]` | `[DATE]` |
| Exact Thailand entity can onboard | `[YES / NO / CONDITIONAL]` | `[PRIVATE PROVIDER REPLY / ACCOUNT SCREEN]` |
| Monthly digital Premium in THB | `[ANSWER]` | `[DATE/SOURCE]` |
| Recurring-capable payment methods | `[ANSWER]` | `[DATE/SOURCE]` |
| Payments fee | `[ACCOUNT-SPECIFIC ANSWER]` | `[DATE/SOURCE]` |
| Recurring/subscription fee | `[ACCOUNT-SPECIFIC ANSWER]` | `[DATE/SOURCE]` |
| Settlement/payout | `[ANSWER]` | `[DATE/SOURCE]` |
| Sandbox available | `[ANSWER]` | `[DATE/SOURCE]` |
| Webhook authentication | `[ANSWER]` | `[DATE/SOURCE]` |
| Idempotency/event reference | `[ANSWER]` | `[DATE/SOURCE]` |
| Renewal/retry/grace/failure | `[ANSWER]` | `[DATE/SOURCE]` |
| Cancellation semantics | `[ANSWER]` | `[DATE/SOURCE]` |
| Refund/dispute/chargeback | `[ANSWER]` | `[DATE/SOURCE]` |
| Hosted checkout/portal | `[ANSWER]` | `[DATE/SOURCE]` |
| Account feature flags/approvals | `[ANSWER]` | `[DATE/SOURCE]` |
| Support/SLA/escalation | `[ANSWER]` | `[DATE/SOURCE]` |
| Tax/invoice/receipt responsibility | `[ANSWER]` | `[DATE/SOURCE]` |
| Provider-specific open question resolved | `[ANSWER]` | `[DATE/SOURCE]` |
| Remaining blocker | `[ANSWER]` | `[DATE/SOURCE]` |

---

## 8. Decision-record rule

Only update `PAYMENT-PREMIUM-DECISION.md` from **NOT APPROVED** after:

- a real merchant/business path is accepted or confirmed feasible;
- account-specific recurring capability is confirmed;
- account-specific fees/settlement are known;
- webhook authenticity and idempotency design is reviewable;
- renewal/failure/cancel/refund/dispute lifecycle maps to Kinaraidee's backend entitlement contract;
- sandbox is available and the implementation plan is reviewed;
- Privacy/Terms/payment disclosure dependencies are identified;
- a real business owner/approver records the decision and date.

Provider outreach, public documentation, a sales reply or sandbox access alone does **not** create payment success, Premium subscribers, MRR, campaign entries or Commercial GO.
