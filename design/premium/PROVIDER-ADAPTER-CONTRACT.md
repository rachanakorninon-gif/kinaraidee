# Premium Payment Provider Adapter Contract — DESIGN ONLY

Status: **provider-neutral / not implemented**

This adapter boundary lets Omise/Opn, Stripe or 2C2P be selected later without changing the internal Premium/campaign truth model.

## Required adapter operations

### `createCustomer(user)`
Returns provider customer reference for the authenticated Kinaraidee user.

Rules:
- idempotent for the same Kinaraidee user/provider
- never store provider secrets in browser-visible data
- no Premium entitlement is granted

### `createCheckoutSession(user, plan)`
Returns provider-hosted checkout/session metadata.

Rules:
- only approved plan/currency may be used
- disabled until merchant/provider/price approval exists
- a returned checkout/session is not payment success
- no Premium entitlement is granted until verified provider event/reconciliation confirms truth

### `cancelSubscription(subscriptionRef, mode)`
Normalizes provider cancellation into one of:
- immediate cancel
- cancel at period end

The exact policy is provider/account-specific and must be approved before enabling.

### `refundPayment(reference, amount?)`
Provider-specific refund action. Operational ownership and partial/full-refund rules are TBD until provider approval.

### `getSubscription(subscriptionRef)`
Fetches authoritative current provider state for reconciliation.

### `verifyWebhook(request)`
Verifies authenticity using the provider-required signature/JWS/JWE/shared-secret mechanism.

Must return a normalized verified envelope only after successful authentication.

### `normalizeEvent(verifiedEnvelope)`
Returns an internal event object with:
- `provider`
- `provider_event_ref`
- `event_type`
- `occurred_at`
- `provider_customer_ref`
- `provider_subscription_ref`
- `normalized_subscription_status`
- period start/end where available
- cancel-at-period-end flag where available
- refund/dispute/revoke markers
- test/live environment marker

## Normalized subscription status vocabulary

Provider-specific states map to:

- `incomplete`
- `trialing`
- `active`
- `past_due`
- `grace`
- `cancel_at_period_end`
- `canceled`
- `unpaid`
- `refunded`
- `disputed`
- `revoked`

No provider adapter may invent a second entitlement vocabulary.

## Event ordering / idempotency

The processing layer owns idempotency. Adapter must expose a stable provider event reference when the provider supplies one.

If a provider lacks a stable event ID, the adapter design must define a deterministic replay key approved before production.

Older events must not roll back a newer terminal state such as refunded/disputed/revoked unless the provider's documented lifecycle explicitly supports a later recovery event and that behavior is reviewed.

## Environment separation

Adapter must distinguish sandbox/test from production events.

Test events/accounts must never:
- grant production Premium
- contribute to `eligible_count`
- create public prize entries
- create revenue/MRR evidence

## Secret handling

Secrets belong only in approved server-side secret storage. Never commit:
- API secret keys
- webhook signing secrets
- private encryption/signing keys
- merchant credentials
- raw card/payment credentials

Provider payload logging must be redacted/minimized according to the approved retention/privacy policy.

## Reconciliation contract

A scheduled/manual reconciliation path must be able to:

1. list local subscriptions needing verification
2. fetch provider subscription truth
3. compare normalized state
4. record drift
5. update local subscription state transactionally
6. recompute entitlement
7. recompute campaign technical eligibility if allowed
8. audit any change

Reconciliation must fail closed on provider/network uncertainty rather than grant new Premium from stale browser state.

## Candidate-specific fields to resolve after provider selection

### Omise/Opn
- recurring schedule/subscription API used for the approved merchant
- supported recurring payment methods
- webhook event IDs/authentication method
- MIT/card-on-file/3DS requirements

### Stripe
- actual Thailand account Billing availability
- Checkout/Billing/Customer Portal path
- event types and webhook signature verification
- total Payments + Billing cost

### 2C2P
- approved RPP/API version
- JWE/JWS/key-management model
- notification/authentication contract
- recurring payment state mapping

## Acceptance gate

Provider adapter implementation cannot be marked production-ready until:
- #357 has account-specific written answers
- sandbox lifecycle matrix passes
- duplicate/out-of-order/refund/dispute tests pass
- reconciliation drill passes
- security review passes
- controlled production payment acceptance test passes
