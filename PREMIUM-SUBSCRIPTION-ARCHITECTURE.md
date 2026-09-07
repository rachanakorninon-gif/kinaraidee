# Kinaraidee — Premium / Subscription Architecture

สถานะ: **BUSINESS BASELINE APPROVED / STRIPE PAYMENTS SELECTED / IMPLEMENTATION & PROVIDER-BACKED EVIDENCE PENDING / COMMERCIAL NO-GO**

Canonical business decision: `BUSINESS-COMMERCIAL-BASELINE.md`  
Payment decision gate: `PAYMENT-PREMIUM-DECISION.md`

เอกสารนี้กำหนด architecture สำหรับ Premium Beta 59 บาท/เดือน โดยรองรับ 2 payment behaviors:
- **Card** — เป้าหมาย auto-renew รายเดือนผ่าน Stripe Payments + Kinaraidee-controlled lifecycle หลัง provider/account-specific Test Mode validation ผ่าน
- **PromptPay** — customer-initiated payment 59 บาทต่อ paid period และผู้ใช้ต้องจ่ายใหม่เองในรอบถัดไป; no auto-renew

Stripe Billing ไม่ถูกใช้เป็น assumption สำหรับ Thailand path และ architecture นี้ยังไม่ใช่หลักฐานว่า recurring card ใช้งานจริงได้จนกว่าจะมี Test Mode evidence ของ account/path จริง

## 1. Security / truth principles

1. Browser/client ห้ามเป็น authority ของ payment หรือ Premium entitlement
2. Payment success ต้องมาจาก provider-backed/server-verified truth
3. Entitlement ต้องคำนวณ/เขียนจาก controlled backend เท่านั้น
4. ห้ามเก็บ secret key, webhook secret, service-role key หรือ full card data ใน public repository/browser
5. Provider webhook/event processing ต้อง verify signature ตาม integration จริง, idempotent และรองรับ duplicate/out-of-order
6. Cancelled-at-period-end ต้องแยกจาก Expired
7. Payment failure / action-required ห้ามต่อสิทธิ์จนกว่าจะมี successful payment truth
8. Payment event และ entitlement change ต้อง trace กลับไปยัง provider reference/audit record ได้

## 2. Business lifecycle contract

### Card

`free`
→ first successful card payment
→ `active`
→ next-period card collection attempt
→ success: extend period
→ failure/action-required: do not extend next period until resolved
→ cancel request: `cancel_at_period_end`
→ period end without successful renewal: `expired` → Free

Automatic renewal is a **target contract**, not operational proof. Exact Stripe PaymentIntent/SetupIntent/off-session/mandate/authentication details must follow provider documentation and account-specific validation at implementation time.

### PromptPay

`free`
→ create customer-initiated PromptPay payment
→ provider confirms success
→ `active` until paid period end
→ no automatic debit
→ user may initiate a new PromptPay payment for next period
→ no successful next-period payment by expiry: `expired` → Free

Do not set `auto_renew=true` for PromptPay.

## 3. Internal states

Minimum subscription/entitlement-facing states:
- `free`
- `active`
- `cancel_at_period_end`
- `payment_action_required`
- `payment_failed`
- `expired`
- `revoked` only when an approved refund/dispute/security policy explicitly requires entitlement revocation

No trial state is required for Beta v1 because Free Trial is not approved.

Provider-specific statuses may be stored separately, but UI/business logic should map them through reviewed internal states rather than expose raw provider semantics everywhere.

## 4. Proposed data model — implementation design, not yet migration evidence

### `billing_customers`
- `user_id uuid primary key`
- `provider text not null`
- `provider_customer_ref text not null`
- `created_at timestamptz not null`
- unique `(provider, provider_customer_ref)`

No card number/CVC/full payment credential is stored here.

### `premium_subscriptions`
Internal subscription contract; do not require a Stripe Billing subscription object.
- `id uuid primary key`
- `user_id uuid not null`
- `provider text not null`
- `plan_code text not null`
- `payment_method_type text not null` (`card` / `promptpay` in Beta v1)
- `status text not null`
- `auto_renew boolean not null default false`
- `current_period_start timestamptz`
- `current_period_end timestamptz`
- `cancel_at_period_end boolean not null default false`
- `cancel_requested_at timestamptz`
- `ended_at timestamptz`
- `created_at timestamptz not null`
- `updated_at timestamptz not null`

Business invariant:
- PromptPay rows must have `auto_renew=false`.
- Card rows may have `auto_renew=true` only after the recurring-card path is validated and enabled.

### `payment_attempts`
One record per attempted charge/payment lifecycle.
- `id uuid primary key`
- `subscription_id uuid not null`
- `provider text not null`
- `provider_payment_ref text`
- `payment_method_type text not null`
- `amount_minor integer not null` (THB 59.00 => 5900 if provider/internal convention uses satang)
- `currency text not null` (`THB`)
- `period_start timestamptz`
- `period_end timestamptz`
- `status text not null`
- `failure_code text` bounded/non-sensitive
- `requires_customer_action boolean not null default false`
- `created_at timestamptz not null`
- `confirmed_at timestamptz`
- unique `(provider, provider_payment_ref)` where provider reference exists

Never treat a locally-created `payment_attempts` row as payment success until provider-backed confirmation is verified.

### `payment_provider_events`
Idempotency/audit boundary.
- `provider text not null`
- `provider_event_ref text not null`
- `event_type text not null`
- `provider_created_at timestamptz`
- `received_at timestamptz not null`
- `processed_at timestamptz`
- `processing_status text not null`
- `error_code text` bounded/non-sensitive
- unique `(provider, provider_event_ref)`

### `member_entitlements`
แยกสิทธิ์ออกจาก payment implementation.
- `user_id uuid not null`
- `entitlement_code text not null`
- `active boolean not null`
- `valid_until timestamptz`
- `source_subscription_id uuid`
- `updated_at timestamptz not null`
- unique `(user_id, entitlement_code)`

Premium capability checks that matter for access control must use this controlled truth (or an equivalent backend-derived source), not a browser flag.

## 5. Authorization / RLS contract

- normal browser user may read only their own approved account/subscription/entitlement projection as needed
- browser must not directly INSERT/UPDATE/DELETE authoritative payment attempts, provider events or entitlements
- payment/provider webhook/server jobs use privileged server-side path only
- admin/operator reads require explicit owner/admin authorization
- cross-user reads and writes must be denied
- if a Premium capability is server-backed, server verifies user identity + active entitlement before returning protected capability/data

## 6. Provider event / webhook safety

Implementation must:
- use the exact Stripe-supported signature verification path for the selected endpoint
- enforce bounded request/body behavior
- reject unsupported methods/content types where applicable
- deduplicate by provider event reference
- survive repeated event delivery
- survive out-of-order delivery by evaluating provider timestamps/current payment truth rather than arrival order alone
- avoid logging secrets, full raw sensitive payloads, card data or auth tokens
- return bounded errors that do not reveal database/internal secrets

Do not invent Stripe event names before the concrete integration is selected and tested; map exact provider events during implementation review.

## 7. Entitlement activation rules

### First payment
Premium becomes active only after the backend has verified a successful provider payment and recorded the paid period.

### Renewal
Extend `current_period_end` / entitlement only after a successful next-period provider payment. A scheduled attempt, browser redirect, client callback or pending provider state is insufficient.

### Customer action required
If the recurring-card attempt requires authentication/customer action:
- mark bounded internal state such as `payment_action_required`
- do not extend the next paid period yet
- surface a safe recovery action to the user
- activate/extend only after provider-backed success

### Failure
`payment_failed` does not extend entitlement.

### Cancellation
Cancel request stops future renewal but preserves the already-paid entitlement until `current_period_end`.

### Expiry
At period end without valid next-period payment:
- entitlement becomes inactive
- account/UI returns to Free
- do not delete Favorites/History/Preferences solely because of plan downgrade

### Refund/dispute
Behavior must follow the final approved policy/runbook. Do not automatically revoke historical user data. If access revocation is required, it must be explicit, auditable and tied to provider/payment truth.

## 8. PromptPay-specific contract

- amount shown before payment: THB 59
- no auto-renew disclosure
- QR/payment expiry must not activate Premium
- browser saying `paid` is not evidence
- only provider/backend-confirmed success activates the paid period
- when nearing expiry, UI may invite the user to initiate a new payment; it must not imply an automatic debit will occur

## 9. Card-specific recurring validation gate

Before enabling `auto_renew=true` in Production, Test Mode/provider-account evidence must verify at least:
1. first payment + future-payment consent/setup path
2. provider payment method/customer reference stored without card data in Kinaraidee
3. next-period off-session/recurring attempt path
4. success extends exactly one period
5. authentication-required recovery
6. decline/failure does not extend
7. cancel-at-period-end stops future collection
8. duplicate retry/event does not double-charge/extend twice
9. provider terms/account eligibility permit the intended recurring model

If this gate cannot be satisfied, card auto-renew must remain disabled and the business/payment decision must be revisited rather than silently emulating an unsupported subscription.

## 10. Checkout / account UX contract

Before real money, UI must show:
- `THB 59` price and billing period
- exact benefits that are implemented
- card renewal behavior only if actually enabled
- PromptPay `no auto-renew` behavior
- cancellation path
- period-end date from backend truth
- Privacy/Terms/refund disclosure links
- safe loading/pending/failure/retry behavior
- backend-confirmed status after redirect/reopen/relogin

Do not use success-page query parameters to unlock Premium.

## 11. Reconciliation contract

At minimum, operations must be able to reconcile:

`provider successful payments`
↔ `internal payment_attempts`
↔ `premium_subscriptions paid periods`
↔ `member_entitlements`

Critical anomalies include:
- provider success without entitlement
- entitlement without supporting successful payment
- duplicate successful charges for one intended period
- period extended twice from duplicate events

Reconciliation procedure, alerting and owner execution evidence are required before Commercial GO.

## 12. Required test matrix before Payment PASS

- card first payment success
- card recurring success if auto-renew is enabled
- card authentication-required recovery
- card payment failure
- card cancellation at period end
- actual expiry → Free
- PromptPay success
- PromptPay expired/abandoned payment
- browser closed after payment then relogin
- refresh/reopen does not duplicate payment/entitlement
- duplicate provider event idempotency
- out-of-order event safety
- invalid/forged webhook rejection
- normal user cannot mutate authoritative billing/entitlement state
- cross-user read blocked
- refund/dispute behavior per approved runbook
- reconciliation detects deliberate mismatch in controlled test

CI/static tests alone do not equal provider-backed Payment PASS or physical/Production PASS.

## 13. Operations requirements before Commercial GO

Must have:
- payment/incident owner
- support path (customer-facing contact baseline: `rachanakorn.inon@gmail.com`)
- webhook/job failure monitoring
- reconciliation runbook
- refund/dispute runbook
- emergency switch to stop new checkout/renewal attempts safely without corrupting existing entitlements
- rollback procedure that does not overwrite billing truth incorrectly

## 14. Native-store boundary

The first commercial path is Web/PWA. If native iOS/Android later sells digital subscription, re-check current Apple/Google store policies and payment rules before implementation. Do not copy the Web payment architecture into native distribution by assumption.

## 15. Commercial gate

Architecture/design work may be reviewed/merged without implying Commercial GO.

Payment/Premium remains **NOT PASS** until:
- real provider/account path is configured and eligible
- schema/backend/jobs/webhooks are implemented and security-reviewed
- card recurring target path is provider-backed validated if enabled
- PromptPay lifecycle is provider-backed validated
- cancel/failure/expiry/refund/dispute tests pass
- reconciliation/monitoring/support are operational
- Privacy/Terms/payment disclosures are legally approved/published as required
- controlled Production acceptance is explicitly authorized

Never create or report synthetic subscriber count, MRR, conversion or revenue as real business evidence.
