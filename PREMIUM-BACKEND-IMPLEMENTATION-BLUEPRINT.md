# Premium backend implementation blueprint

Status: **DESIGN READY FROM OWNER-APPROVED BUSINESS BASELINE / NOT APPROVED FOR PAYMENT EXECUTION / COMMERCIAL NO-GO**

Canonical business baseline: `BUSINESS-COMMERCIAL-BASELINE.md`  
Strict Payment gate: `PAYMENT-PREMIUM-DECISION.md`  
Architecture contract: `PREMIUM-SUBSCRIPTION-ARCHITECTURE.md`

This blueprint translates the owner-approved Web/PWA Premium Beta direction into an implementation-ready backend shape while preserving the repository's strict execution boundary. It does **not** apply a database migration, configure Stripe, enable a webhook, charge money, grant Premium, create campaign entries, or turn the strict Payment/Legal gates to APPROVED.

## 1. Approved planning inputs vs execution authority

Owner-approved planning inputs from 2026-09-07:

- first commercial path: Web/PWA
- Premium Beta: THB 59/month
- no Free Trial
- first provider baseline: Stripe Payments
- merchant form: individual / natural person
- Thailand / THB
- card: THB 59/month with auto-renew as a target only after provider/account-specific recurring-card Test Mode validation
- PromptPay: THB 59 per paid period; user initiates payment again each period; no auto-renew
- cancel-at-period-end policy
- failed payment does not extend entitlement
- expiry returns to Free without immediate plan-triggered deletion of Favorites/History/Preferences
- refund review path for duplicate/error/system-caused cases and rights required by applicable law/provider rules

These inputs may guide design and sandbox preparation. They do **not** create Payment PASS because the strict canonical gate remains `NOT APPROVED` until its existing full approval contract is satisfied.

## 2. Hard preconditions before real payment execution

Do not enable Production charging until all applicable gates are satisfied:

- strict Payment/Premium decision gate approved under its canonical contract
- Production Privacy/Legal gate approved/published as required
- real Stripe merchant account/path eligible for the intended payment methods
- exact recurring-card setup/off-session/authentication model validated for the account if auto-renew is enabled
- exact Stripe webhook/event contracts selected and signature verification implemented
- cancellation/refund/dispute/chargeback operations defined
- reconciliation/monitoring/support ownership operational
- sandbox/Test Mode lifecycle acceptance passed
- Security/QA/Tracking/Support gates passed
- explicit controlled Production payment acceptance authorized

Until then, Payment/Premium execution remains PENDING and Commercial remains NO-GO.

## 3. Campaign separation boundary

The iPhone / 3,000-member campaign is **not** part of the approved Premium launch baseline and remains PRE-LAUNCH under its own gates.

Any campaign tables or eligibility logic must be treated as a separate downstream consumer of validated Premium entitlement only after campaign legal/rules/fulfillment approval exists.

Current campaign truth remains fail-closed:

- `status = PRE_LAUNCH`
- `entries_open = false`
- `eligible_count = 0`

Premium payment success must never automatically open campaign entries or create legal prize eligibility.

## 4. Trust boundary

The browser must never be authoritative for payment, Premium, campaign eligibility, public counts, or revenue.

Authority chain for Premium:

1. authenticated backend creates a provider-side payment/setup action under an approved flow
2. Stripe/provider returns server-verifiable payment state and/or server-to-server event
3. backend verifies authenticity before mutating authoritative state
4. event/payment reference is persisted idempotently
5. backend normalizes provider truth into Kinaraidee payment/subscription state
6. backend derives Premium entitlement from a successful paid-period state
7. browser reads only an approved projection of the user's backend-derived status

No query string, local storage flag, client analytics event, UI success page, signup event, or manually edited row may grant Premium.

## 5. Data model proposal

Names below are implementation proposals only. Final migration requires backend/security review.

### `premium_payment_accounts`

Purpose: map one Kinaraidee user to provider-side customer identity without storing card data.

Suggested fields:

- `id uuid primary key`
- `user_id uuid not null`
- `provider text not null`
- `provider_customer_id text not null`
- `created_at timestamptz not null`
- `updated_at timestamptz not null`

Constraints:

- unique `(provider, provider_customer_id)`
- normal users cannot write provider identifiers directly

### `premium_subscriptions`

Purpose: internal Premium paid-period/lifecycle record. It must **not require a Stripe Billing subscription object** because the approved Thailand planning architecture is Stripe Payments + Kinaraidee-controlled lifecycle.

Suggested fields:

- `id uuid primary key`
- `user_id uuid not null`
- `provider text not null`
- `plan_code text not null`
- `payment_method_type text not null`
- `normalized_status text not null`
- `auto_renew boolean not null default false`
- `current_period_start timestamptz`
- `current_period_end timestamptz`
- `cancel_at_period_end boolean not null default false`
- `cancel_requested_at timestamptz`
- `ended_at timestamptz`
- `created_at timestamptz not null`
- `updated_at timestamptz not null`

Optional provider reference fields may be added only if the actual Stripe object used by the implemented flow requires them. Do not invent a mandatory `provider_subscription_id` if no provider subscription object exists.

Business invariants:

- `payment_method_type = 'promptpay'` implies `auto_renew = false`
- `auto_renew = true` for card is allowed only after the recurring-card validation gate passes
- period extension occurs only after successful provider-backed next-period payment

### `premium_payment_attempts`

Purpose: one record per intended payment/charge attempt, including first payment, card renewal attempt, PromptPay payment, retry, refund-related linkage where appropriate.

Suggested fields:

- `id uuid primary key`
- `subscription_id uuid not null`
- `provider text not null`
- `provider_payment_id text`
- `payment_method_type text not null`
- `amount_minor integer not null`
- `currency text not null`
- `period_start timestamptz`
- `period_end timestamptz`
- `status text not null`
- `requires_customer_action boolean not null default false`
- `failure_code text` bounded/non-sensitive
- `created_at timestamptz not null`
- `confirmed_at timestamptz`
- `updated_at timestamptz not null`

Recommended invariants:

- THB 59.00 is represented consistently according to the provider/internal minor-unit convention selected during implementation
- provider payment reference is unique where provider guarantees uniqueness
- locally-created attempt is never interpreted as successful collection without provider-backed confirmation

### `premium_provider_events`

Purpose: idempotent audit/event inbox for server-to-server provider events.

Suggested fields:

- `id uuid primary key`
- `provider text not null`
- `provider_event_id text not null`
- `provider_event_type text not null`
- `provider_occurred_at timestamptz`
- `received_at timestamptz not null`
- `payload_sha256 text`
- `verification_status text not null`
- `processing_status text not null`
- `processing_error_code text`
- `processed_at timestamptz`
- `related_payment_attempt_id uuid`
- `related_subscription_id uuid`

Constraints:

- unique `(provider, provider_event_id)`
- raw provider payload must not be exposed to browser users
- retention period remains a separate approved data-governance decision

### `premium_entitlements`

Purpose: backend-authoritative access state independent of payment-provider object shape.

Suggested fields:

- `user_id uuid primary key`
- `entitlement_status text not null`
- `valid_from timestamptz`
- `valid_until timestamptz`
- `source_subscription_id uuid`
- `entitlement_version bigint not null`
- `revoked_reason text`
- `updated_at timestamptz not null`

Suggested states for Beta v1:

- `none`
- `active`
- `expired`
- `revoked` only when an approved refund/dispute/security rule requires it

Do not introduce an undefined `grace` entitlement merely because some subscription products use grace periods. If grace is later desired, it requires an explicit business/operations decision and test contract.

## 6. Internal lifecycle state machine

Recommended normalized lifecycle states:

- `pending`
- `active`
- `payment_action_required`
- `payment_failed`
- `cancel_at_period_end`
- `expired`
- `refunded`
- `disputed`
- `revoked`

Rules:

- `pending` never grants Premium
- first successful provider-backed payment may create an active paid period
- next-period card attempt extends entitlement only after successful provider-backed collection
- `payment_action_required` does not extend the next paid period until resolved successfully
- `payment_failed` does not extend entitlement
- `cancel_at_period_end` retains entitlement only through the already-paid `current_period_end`
- actual period end without a successful next-period payment becomes `expired`
- refund/dispute/revocation behavior follows the final approved operational/legal policy, not a generic provider default

## 7. Card flow — validation-gated auto-renew

Before Production `auto_renew=true`, prove in Stripe Test Mode/account-specific path:

1. first card payment succeeds
2. future-payment consent/setup is captured using the exact provider-supported flow
3. Kinaraidee stores only provider references needed for future collection, not card number/CVC
4. next-period server-side recurring/off-session attempt can be created under allowed provider/account terms
5. successful attempt extends exactly one paid period
6. authentication/action-required state returns the user to a safe recovery flow
7. failed attempt does not extend Premium
8. cancellation prevents future collection after the paid period
9. duplicate retry/event cannot double-charge or extend twice
10. reconciliation can recover from a missed event

If any required capability is unsupported for the actual account/path, keep card auto-renew disabled and reopen the payment architecture decision rather than silently simulating an unsupported subscription.

## 8. PromptPay flow — customer-initiated only

Contract:

1. user explicitly selects PromptPay
2. UI shows THB 59 and states there is no automatic renewal
3. backend/provider creates the payment/QR under the approved flow
4. browser may display pending status but cannot grant Premium
5. provider-backed successful payment activates one paid period
6. abandoned/expired QR remains unpaid and grants nothing
7. near period end, UI may invite the user to pay again
8. a new provider-backed successful payment activates/extends the next intended paid period

Never set `auto_renew=true` for PromptPay and never describe a scheduled reminder as a recurring debit.

## 9. Webhook/event processing algorithm

Provider adapter should:

1. read the request body exactly as required by Stripe/provider verification
2. verify the signature/authenticity using the provider-supported method
3. reject unverifiable events before authoritative mutation
4. extract provider event/payment/customer references and occurrence time
5. insert the event idempotently using unique provider event ID
6. return safe acknowledgement for already-processed duplicate events without replaying side effects
7. resolve the referenced payment attempt/current provider truth
8. normalize state transition
9. update payment/subscription/entitlement transactionally where practical
10. record processed state and bounded failure codes

For out-of-order events, compare provider timestamps/current authoritative payment state rather than trusting arrival order.

Do not hard-code event names in this design document. The implementation PR must enumerate the exact Stripe events used and add regression tests for them.

## 10. Reconciliation path

Webhooks/events are not the only recovery mechanism. The backend must have a controlled reconciliation process that can compare:

`provider payment truth`
↔ `premium_payment_attempts`
↔ `premium_subscriptions paid periods`
↔ `premium_entitlements`

Reconciliation must detect at least:

- provider success with no entitlement
- entitlement with no supporting successful payment
- duplicate successful charges for one intended period
- period extended twice from duplicate/replayed events
- missed cancellation/expiry state

Repair must be idempotent, auditable, and must never trust browser claims.

## 11. Access control / RLS intent

Production policy should enforce:

- ordinary authenticated users cannot directly write payment accounts, payment attempts, provider events, subscription truth or entitlements
- users may read only their own approved subscription/entitlement projection
- provider IDs are exposed only when genuinely needed for user-facing support/management
- server/webhook/reconciliation paths use controlled privileged access
- cross-user reads/writes are denied
- Premium-only server capabilities verify user identity + active entitlement at the controlled backend boundary

## 12. Analytics separation

Business analytics events do not create billing truth.

Examples:
- `premium_offer_view` = client interaction evidence
- `checkout_start` = intent, not payment
- `payment_success` = emitted only from provider/backend-authoritative state
- `premium_activated` = emitted only after backend entitlement is active

Canonical measurement design should live in `PREMIUM-EVENT-MEASUREMENT-SPEC.md`.

## 13. Required sandbox / QA matrix before Payment PASS

At minimum:

- card first payment success
- card recurring success if auto-renew will be enabled
- card action/authentication-required recovery
- card failure/decline
- cancel-at-period-end
- actual expiry → Free
- PromptPay success
- PromptPay expired/abandoned payment
- browser closed after payment → relogin sees correct backend status
- refresh/reopen does not duplicate payment or entitlement
- duplicate provider event idempotency
- out-of-order event safety
- forged/invalid webhook rejection
- normal user cannot mutate authoritative billing/entitlement state
- cross-user reads blocked
- refund/dispute behavior according to final runbook
- controlled reconciliation detects a deliberately introduced mismatch

Static CI success alone is not provider-backed Payment PASS or physical/Production PASS.

## 14. Operations requirements

Before Commercial GO, identify and verify:

- payment/incident owner
- customer support path; current contact baseline is `rachanakorn.inon@gmail.com`
- webhook/job failure monitoring and alert delivery
- reconciliation procedure
- refund/dispute procedure
- emergency switch to stop new checkout/renewal attempts safely without corrupting existing paid entitlements
- rollback procedure that does not overwrite billing truth

## 15. Evidence boundary

This blueprint does **not** prove:

- a Stripe merchant account is Production-ready for the intended flows
- card recurring/off-session charging works on the actual account
- PromptPay has been integrated
- a schema/migration has been applied
- webhook signature handling is implemented
- a payment occurred
- Premium entitlement is active
- a subscriber/conversion/revenue exists
- campaign entries are open
- Legal/Payment/Commercial gates are approved

All real business outcomes remain `NOT ESTABLISHED` until supported by the corresponding Production evidence.
