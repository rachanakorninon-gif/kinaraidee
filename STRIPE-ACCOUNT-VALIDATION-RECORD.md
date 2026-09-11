# กินอะไรดี — Stripe Account Validation Record

Status: **TEMPLATE ONLY / NOT CONTACTED OR VALIDATED BY THIS FILE / PAYMENT NO-GO**

Use this record only after an owner-authorized Stripe contact/account validation actually occurs. Until then, leave factual result fields blank or mark them `PENDING`; do not convert public documentation, planning assumptions or sandbox examples into account-specific approval.

Canonical references:
- `BUSINESS-COMMERCIAL-BASELINE.md`
- `PREMIUM-EXTERNAL-VALIDATION-PACK.md`
- `PAYMENT-PREMIUM-DECISION.md`
- `PREMIUM-SUBSCRIPTION-ARCHITECTURE.md`
- Issue #357 — payment-provider validation
- Issue #366 — provider-gated Premium backend implementation

## 1. Contact / evidence metadata

- Validation date/timezone:
- Contact channel: `sales / support / dashboard / ticket / other`
- Stripe team/representative:
- Evidence reference: `email/ticket/dashboard/provider-doc reference`
- Evidence reviewed by:
- Review date/timezone:

Do **not** commit private merchant IDs, API keys, webhook secrets, KYC/identity documents, bank details, full support transcripts containing sensitive information, or card/customer data.

## 2. Merchant / account facts

Owner-approved planning baseline to describe accurately:
- merchant form intended: **individual / natural person**
- market: **Thailand**
- currency: **THB**
- product: Web/PWA digital Premium for Kinaraidee
- current Premium Beta proposition: **THB 59/month**
- no Free Trial in first Beta

Record the actual account-specific answer:

- Individual/natural-person onboarding for this use case: `PENDING / CONFIRMED / REJECTED / CONDITIONAL`
- Condition/details:
- Account/KYC prerequisites:
- Production activation prerequisites:
- THB 59 card charge supported: `PENDING / CONFIRMED / REJECTED / CONDITIONAL`
- PromptPay supported for this account/use case: `PENDING / CONFIRMED / REJECTED / CONDITIONAL`
- Other account restrictions relevant to the flow:

## 3. Card recurring / off-session validation

The project does **not** assume Stripe Billing is available for this Thailand path. Record only the exact Stripe Payments path that Stripe confirms for this account/use case.

- First-payment object/path:
- Future-payment consent/setup path:
- Customer/payment-method storage reference model:
- Future recurring/off-session charge path:
- Card-on-file / MIT classification or requirement:
- Account-level approval/enablement required: `PENDING / YES / NO / CONDITIONAL`
- Mandate/consent wording requirements:
- 3DS/SCA handling on first payment:
- 3DS/SCA/customer-action handling on future off-session attempt:
- Authoritative success object/event:
- Authoritative failure object/event:
- Authoritative action-required state/event:
- Recommended retry/recovery behavior:
- Cancel-at-period-end compatibility with Kinaraidee-controlled lifecycle:
- Explicit confirmation that this path is permitted for the intended merchant/account/use case:

### Account-specific recurring decision

- Recurring/off-session path result: `PENDING / SUPPORTED / NOT SUPPORTED / CONDITIONAL`
- If conditional, list every condition:
- Evidence reference:

Do not enable or advertise card auto-renew as operational while this result remains `PENDING`, `NOT SUPPORTED`, or has unmet conditions.

## 4. PromptPay validation

- PromptPay payment creation path:
- Authoritative success event/reference:
- Expiry/abandoned state/event:
- Refund support/process:
- Settlement behavior:
- Account-specific fee:
- Confirmation that next paid period is customer-initiated rather than automatic recurring debit: `PENDING / CONFIRMED / CONTRADICTED`
- Evidence reference:

If provider evidence contradicts the current non-recurring baseline, do not silently change the product. Escalate for a reviewed business/payment decision update.

## 5. Fees / settlement / reserves

Record actual account-specific commercial terms, with effective date where possible:

- Domestic card fee:
- PromptPay fee:
- International card fee:
- Currency conversion fee if applicable:
- Refund fee treatment:
- Dispute/chargeback fee:
- Other platform/recurring-related fee:
- Settlement currency:
- Payout schedule:
- Minimum payout:
- Hold/reserve terms:
- Fee quote effective/reference date:
- Evidence reference:

Public website pricing may be noted as context but must not be labeled account-specific settlement evidence unless Stripe explicitly confirms it applies to the actual account.

## 6. Webhook / provider truth

- Signature verification method:
- Endpoint secret management requirement:
- Provider event/reference used for deduplication:
- Duplicate delivery behavior:
- Out-of-order delivery guidance:
- Event replay/retrieval capability:
- Recommended provider truth lookup/reconciliation method:
- Webhook retry behavior:
- Evidence reference:

No browser redirect/query parameter may be recorded as authoritative payment success.

## 7. Cancellation / refund / dispute / reconciliation

- Cancel-at-period-end provider interaction required, if any:
- Immediate-cancel behavior, if any:
- Refund API/process:
- Partial refund support:
- Dispute/chargeback state/event:
- Evidence required for reconciliation:
- Receipt/invoice functions supplied by Stripe:
- Merchant responsibilities for receipt/invoice/tax handling:
- Support/escalation route after Production launch:

## 8. Test Mode acceptance prerequisites

Do not mark these PASS until the real intended account/path is testable and the corresponding provider-backed evidence exists.

- [ ] first card payment success
- [ ] first card payment failure
- [ ] future-payment setup/consent path
- [ ] off-session recurring success, if supported
- [ ] off-session authentication/action-required recovery
- [ ] off-session decline/failure does not extend Premium
- [ ] cancel-at-period-end stops future collection
- [ ] duplicate event does not double-extend entitlement
- [ ] out-of-order event handling remains correct
- [ ] PromptPay success
- [ ] PromptPay expiry/abandonment
- [ ] PromptPay next-period customer-initiated repurchase behavior
- [ ] refund lifecycle
- [ ] dispute/chargeback lifecycle
- [ ] provider payment ↔ internal transaction ↔ Premium entitlement reconciliation
- [ ] browser/client tampering cannot grant Premium

Test Mode PASS is still not Production revenue or Commercial GO.

## 9. Validation outcome

Complete only from traceable account-specific evidence.

- Merchant/account path: `PENDING / ACCEPTABLE / BLOCKED / CONDITIONAL`
- Card first-payment path: `PENDING / ACCEPTABLE / BLOCKED / CONDITIONAL`
- Card recurring/off-session path: `PENDING / ACCEPTABLE / BLOCKED / CONDITIONAL`
- PromptPay path: `PENDING / ACCEPTABLE / BLOCKED / CONDITIONAL`
- Fees/settlement acceptable for current Beta proposition: `PENDING / YES / NO / CONDITIONAL`
- Critical unresolved questions:
- Fallback-provider evaluation required under Issue #357 rule: `NO / YES — reason`
- Recommended next action:

## 10. Handoff rule

Only after the account-specific evidence is reviewed:

1. update Issue #357 with non-sensitive evidence/result;
2. if the path is acceptable, hand confirmed facts to Issue #366 for reviewed Test Mode implementation;
3. keep `PAYMENT-PREMIUM-DECISION.md` strict gate separate until all required decision fields and Legal dependencies are actually satisfied;
4. require provider-backed lifecycle acceptance before Payment PASS;
5. require separately authorized controlled Production acceptance before normal real-money traffic.

## Evidence boundary

This template, a Stripe email/ticket, public provider documentation, Test Mode transaction or implementation design does **not** by itself establish Production payment acceptance, paid subscriber, conversion, MRR, revenue, Legal PASS, Public Beta completion, prize eligibility or Commercial GO.
