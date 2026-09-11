# กินอะไรดี — Premium Customer Support & Payment Incident Runbook

Status: **PREPARATION ONLY — SUPPORT PASS NOT ESTABLISHED — REAL-MONEY PREMIUM NOT OPENED BY THIS FILE**

Canonical references:
- `BUSINESS-COMMERCIAL-BASELINE.md`
- `PAYMENT-PREMIUM-DECISION.md`
- `PREMIUM-SUBSCRIPTION-ARCHITECTURE.md`
- `PRODUCTION-PRIVACY-LEGAL-DECISION.md`
- `COMMERCIAL-READINESS-MATRIX.md`
- Issue #2 — Commercial readiness
- Issue #357 — provider/account validation
- Issue #366 — Premium provider-gated implementation

Owner-approved customer-facing contact baseline: **rachanakorn.inon@gmail.com**

เอกสารนี้เตรียม support workflow สำหรับอนาคตเท่านั้น ไม่ได้ยืนยันว่ามี Premiumเงินจริง, subscriber, charge, refund, dispute, staffed support rotation หรือ Support PASS แล้ว

## 1. Support truth hierarchy

เมื่อมีเรื่อง payment/Premium ให้ตรวจตามลำดับแหล่งข้อมูล ไม่ใช้ข้อความจาก browser เป็น payment truth:

1. provider-authoritative payment / refund / dispute record
2. backend-authoritative transaction/subscription/entitlement state
3. application/account state visible to customer
4. browser/client message or screenshot as supporting context only

ถ้า provider กับ backend ไม่ตรงกัน ให้จัดเป็น **reconciliation incident** ไม่ใช่สรุปจากฝั่งใดฝั่งหนึ่งโดยเดา

## 2. Privacy / security boundary for support

Support ไม่ควรขอหรือรับข้อมูลเกินจำเป็น

ห้ามขอให้ผู้ใช้ส่ง:
- full card number
- CVV/CVC
- password
- OTP
- access token / refresh token
- API key / secret
- full KYC/identity document ผ่านช่อง support ปกติ เว้นแต่มี reviewed secure process ที่จำเป็นจริง

ข้อมูลที่อาจขอได้เมื่อจำเป็น:
- email/account identifier ที่ใช้กับบริการ
- วันที่/เวลาโดยประมาณของรายการ
- amount/currency ที่ผู้ใช้เห็น
- last safe reference fragment หรือ provider-safe transaction/reference ID ตาม implementation จริง
- screenshot ที่ปกปิด sensitive data
- อุปกรณ์/OS/Browser และขั้นตอนที่เกิดปัญหา

อย่านำข้อมูล payment/customer PII ที่ไม่จำเป็นไปใส่ GitHub issue สาธารณะ

## 3. Ticket classification

### S0 — Security / privacy critical

ตัวอย่าง:
- data exposure
- unauthorized Premium/charge pattern ที่อาจเป็น systemic
- secret/token leak
- account takeover concern

Action:
- หยุด risky flow ตาม incident authority ที่มี
- preserve minimal evidence
- escalate Security/Privacy owner
- ห้ามตอบแบบเดาว่า “ปลอดภัยแล้ว” จนมี evidence

### S1 — Payment / entitlement critical

ตัวอย่าง:
- provider says successful payment but Premium not activated
- Premium activated without trusted payment
- duplicate confirmed charge
- cancellation did not stop future renewal as designed
- multiple users affected by payment state bug

Action:
- mark as reconciliation/payment incident
- stop broad traffic/real-money acceptance if systemic risk exists
- compare provider truth ↔ backend transaction ↔ entitlement
- do not manually fabricate entitlement or revenue records without an approved remediation path

### S2 — Individual billing/support issue

ตัวอย่าง:
- payment declined
- action required/authentication needed
- refund request
- user asks how to cancel
- PromptPay expired/abandoned
- expected Premium period unclear

Action:
- resolve from authoritative state
- explain current state without promising unsupported timing/outcome
- escalate if provider/backend mismatch appears

### S3 — General product/support

ตัวอย่าง:
- how to use Premium feature
- Favorites/History behavior
- login/session issue not involving money
- feature request

Route to normal product/support workflow and preserve payment separation if no payment issue exists

## 4. Minimum support record

For each real case, record only what is needed in the approved private/appropriate system:

- support case ID
- received timestamp/timezone
- category/severity
- customer/account reference in privacy-safe form
- affected runtime/release if relevant
- payment/provider reference in safe form if applicable
- observed provider state
- observed backend entitlement state
- observed client state
- actions taken
- refund/cancel/dispute action reference if any
- resolution
- follow-up required
- evidence source

A GitHub issue may contain technical defect facts but should exclude private payment/customer data.

## 5. Cancellation support

Approved business baseline:
- monthly recurring card path is a target only after account-specific validation
- cancellation stops future renewal
- already-paid Premium continues to paid-period end
- failed payment must not extend Premium
- downgrade to Free must not delete user-owned Favorites/History/Preferences solely because the plan changed

Support workflow after a real card subscription path exists:

1. authenticate/identify the account through the actual app/support process
2. read backend-authoritative current entitlement and renewal state
3. if cancellation already scheduled, communicate actual period-end date from source of truth
4. if cancellation action is available and authorized, perform through the reviewed system/provider path
5. verify future-renewal state is stopped
6. verify Premium remains only through the paid period as designed
7. record cancellation evidence/reference

Do not promise a calendar date by guessing a 30-day period; use the actual paid-period end stored by the authoritative system.

## 6. Payment decline / action required

Expected rule:
- decline or failed payment ≠ successful renewal
- action-required ≠ successful renewal until provider confirms completion
- client redirect alone cannot grant Premium

Support response logic:

1. read provider payment state
2. read backend transaction/entitlement state
3. if payment failed: explain Premium was not renewed/activated from that attempt according to actual state
4. if customer action is required: direct the user only through the reviewed secure payment continuation path
5. never request card secrets in email/chat
6. if backend incorrectly extended entitlement, escalate as S1 reconciliation incident

## 7. Duplicate charge report

Treat as S1 until ruled out.

Check:
- are there two distinct provider-confirmed charges?
- are they for the same customer/account and intended paid period?
- did retry/idempotency logic create duplicates?
- did one charge later reverse/refund automatically?
- does backend show one or multiple transaction records?
- was entitlement extended more than intended?

If duplicate charge is confirmed:
- follow the approved refund/remediation rule
- record provider refund reference
- ensure refund does not incorrectly delete already-authorized entitlement unless policy/transaction state requires it
- open technical defect if caused by system behavior

Do not count refunded/reversed duplicate amounts as clean net revenue.

## 8. Refund request

Approved policy direction:
- no automatic refund merely because a billing period has already begun/been used
- duplicate/incorrect charges, system problems, and rights required by law/provider rules must be handled appropriately
- no blanket “no refund under any circumstance” claim

Before deciding a real refund:

- identify the actual transaction
- determine payment state
- determine reason category
- check duplicate/system-error evidence
- check actual provider/legal policy applicable at that time
- determine whether entitlement impact is required
- record decision and evidence

Outcome values:
- `REFUND APPROVED`
- `REFUND NOT APPROVED`
- `MORE EVIDENCE REQUIRED`
- `ESCALATED FOR LEGAL/PROVIDER REVIEW`

This runbook does not itself authorize a refund transaction.

## 9. Dispute / chargeback

When provider reports a dispute/chargeback:

1. record provider dispute reference and deadline privately/appropriately
2. verify linked transaction/account
3. preserve permitted evidence of consent/service delivery/payment state
4. do not fabricate usage evidence
5. follow provider submission requirements
6. review entitlement state according to approved policy and legal/provider constraints
7. record outcome: won/lost/withdrawn/other provider state
8. reconcile revenue/refund/fee impact only from provider evidence

Dispute created ≠ refund; dispute lost ≠ ordinary refund. Keep accounting stages separate.

## 10. Payment success but Premium missing

Treat as S1.

Required reconciliation:

`provider successful payment`
↔ `internal transaction/payment record`
↔ `backend Premium entitlement`
↔ `client/account display`

Actions:
- confirm provider success first
- find/match internal transaction idempotently
- verify webhook/event delivery and signature validation evidence
- verify entitlement mutation/audit record
- verify client is reading authoritative entitlement
- restore correct state only through reviewed idempotent remediation
- do not create a second charge to “fix” missing entitlement

If multiple users may be affected, escalate to incident and consider stopping payment traffic until contained.

## 11. Premium shown without trusted payment

Treat as S1/S0 depending on cause.

Actions:
- determine whether entitlement came from client spoofing, backend bug, test fixture, admin/manual action or stale state
- preserve evidence
- prevent further unauthorized grants
- do not count affected account as paying customer
- reconcile analytics/business metrics to exclude false activation/payment claims
- open Security review if trust boundary was bypassed

## 12. PromptPay support — future flow

Approved planning baseline:
- PromptPay = customer-initiated payment per paid period
- no automatic next-period renewal

Common cases:
- QR/session expired before payment
- customer paid but client did not update
- customer expected auto-renew
- next paid period needs a new customer-initiated payment

Rules:
- provider-confirmed success controls payment truth
- abandoned/expired QR is not payment
- do not promise auto-renew
- if provider success exists but entitlement is missing, use the S1 reconciliation path

## 13. Entitlement expiry / downgrade questions

Support should verify actual backend period-end/expiry state.

Expected business behavior:
- after paid entitlement ends, account returns to Free
- user-owned Favorites/History/Preferences are not immediately deleted solely because of downgrade
- Premium-only capability availability follows implemented Free/Premium rules

Do not claim specific retention periods unless published/reviewed policy and implementation agree.

## 14. Receipt / invoice / tax document requests

Current state remains provider/legal dependent.

Before real-money launch, define:
- what receipt/payment confirmation Stripe/provider supplies
- what document the individual merchant must issue under applicable Thai rules
- whether tax/VAT/withholding requirements apply to the actual setup
- delivery channel
- correction/reissue process
- retained evidence

Until Legal/Payment review resolves this, support must not invent tax-document commitments.

## 15. Privacy/data-rights requests

Requests such as access, correction, deletion, objection or privacy inquiry should be routed to the Privacy/Legal process at the approved contact.

Support may acknowledge receipt but must not promise completion timing or deletion scope beyond the reviewed policy/system capability.

Do not delete payment/account evidence needed for legal/accounting/security obligations merely because a general deletion request arrived; Legal/Privacy process decides the applicable scope.

## 16. Incident stop conditions

Consider stopping new payment traffic / disabling risky Premium entry when one or more occur:

- duplicate confirmed charges caused by system behavior
- entitlement can be granted without trusted payment
- widespread payment-success / entitlement mismatch
- webhook/signature trust broken
- wrong amount/currency charged
- cancellation systematically fails to stop renewal
- privacy/security exposure involving payment/account data
- reconciliation cannot determine provider vs backend truth reliably

Stopping payment traffic is an operational safety action, not evidence that every existing customer state is wrong.

## 17. Recovery / reopen conditions

Do not reopen normal payment traffic merely because code was changed or CI passed.

Require evidence appropriate to the incident, for example:
- root cause identified
- source fix reviewed
- provider-backed Test Mode regression PASS
- backend reconciliation verifies affected records
- deployment/live smoke as applicable
- Physical QA where user-facing flow is affected
- support messaging/remediation prepared
- Security/Legal review if incident scope requires it

Then record explicit reopen authority/evidence.

## 18. Support metrics — future ACTUAL only

Once real support exists, possible metrics include:
- cases received by category
- first response time
- time to resolution
- payment-entitlement mismatches
- confirmed duplicate charges
- refund requests / approved refunds
- disputes/chargebacks
- cancellation support cases
- repeated product confusion

Do not pre-fill SLA or support performance numbers. If no authoritative support system measures a metric, use `NOT MEASURED`, not an invented zero.

## 19. Support readiness checklist

Preparation can be marked as document-ready, but **Support PASS** requires operational evidence.

Before Commercial GO:

- [ ] public support contact published where required
- [ ] owner/responsible operator for inbound support is known
- [ ] access to provider/backend truth available securely to authorized operator
- [ ] cancellation workflow verified
- [ ] refund decision/execution workflow verified
- [ ] dispute/chargeback workflow verified
- [ ] payment↔entitlement reconciliation workflow verified
- [ ] escalation path for S0/S1 incidents verified
- [ ] privacy request routing verified
- [ ] no-sensitive-data guidance in support process
- [ ] incident stop/reopen authority defined
- [ ] support path physically/operationally exercised on launched scope

Until these are supported by evidence: **Support = PARTIAL / PENDING**, not PASS.

## 20. Response templates — future use after launch

### Payment not completed

> ตรวจสอบสถานะรายการแล้ว การชำระเงินครั้งนี้ยังไม่สำเร็จตามสถานะจากระบบชำระเงิน จึงยังไม่มีการเปิด/ต่ออายุ Premium จากรายการนี้ หากระบบระบุว่าต้องยืนยันเพิ่มเติม กรุณาดำเนินการผ่านหน้าชำระเงินที่ปลอดภัยของบริการเท่านั้น และไม่ต้องส่งข้อมูลบัตรหรือ OTP ให้ทีมงาน

Use only when actual authoritative state supports it.

### Cancellation scheduled

> ระบบบันทึกการยกเลิกการต่ออายุแล้ว Premium จะยังใช้งานได้ถึงวันสิ้นสุดรอบที่ชำระไว้ตามสถานะในบัญชี หลังจากนั้นบัญชีจะกลับเป็น Free โดยการเปลี่ยนแผนอย่างเดียวจะไม่ลบ Favorites/History/Preferences ของคุณทันที

Insert/confirm actual period-end from backend; do not guess.

### Need more evidence

> ตอนนี้ข้อมูลจากการชำระเงินและสถานะ Premium ยังไม่เพียงพอให้สรุปได้อย่างปลอดภัย เรากำลังตรวจสอบ reference ของรายการกับสถานะบัญชี โดยจะไม่ขอรหัสผ่าน OTP หรือข้อมูลบัตรเต็มจากคุณ

Do not promise response time unless an actual support SLA has been approved and can be met.

## 21. Current actual status

- support contact baseline: **APPROVED PLANNING INPUT**
- real-money Premium support flow: **NOT OPENED BY THIS FILE**
- staffed support operation: **NOT ESTABLISHED BY THIS FILE**
- refund/dispute cases: **NO CASE CREATED BY THIS FILE**
- Support PASS: **NOT ESTABLISHED / PENDING OPERATIONAL EVIDENCE**
- Commercial GO: **NO-GO remains until all required gates pass**

## Evidence boundary

This runbook is preparation/governance only. It does not perform cancellation, refund, dispute response, entitlement repair, customer contact, provider action, payment acceptance or legal determination, and it does not create subscriber/revenue/support-performance evidence or Support PASS.
