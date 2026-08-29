# Premium backend implementation blueprint

Status: **DESIGN ONLY / NOT APPROVED FOR PAYMENT EXECUTION**

This document turns the existing Premium/campaign eligibility contract into an implementation-ready backend shape without selecting a payment provider, applying a database migration, enabling a webhook endpoint, granting Premium, accepting money, or creating prize entries.

## 1. Hard preconditions before implementation authority

Do not move this blueprint into executable production payment authority until all of the following are explicitly approved:

- real payment provider and merchant account
- monthly Premium price and billing cadence
- actual recurring-payment methods available to that merchant account
- webhook authentication/signature method
- provider event identifiers and retry semantics
- cancellation/refund/dispute policy
- organizer-specific legal/tax path for the prize campaign
- campaign rules and dates

Until then, public campaign truth stays:

- `status = PRE_LAUNCH`
- `entries_open = false`
- `eligible_count = 0`

## 2. Trust boundary

The browser must never be authoritative for payment, Premium, campaign eligibility or public counts.

Authority chain:

1. payment provider sends a server-to-server notification
2. backend verifies authenticity before accepting the event
3. verified event is written idempotently to an event inbox
4. backend normalizes provider-specific state into Kinaraidee subscription state
5. backend derives Premium entitlement from normalized subscription state
6. campaign eligibility is evaluated separately from Premium entitlement
7. public endpoints expose only approved aggregate or the authenticated user's own backend-derived state

No query string, local browser storage, client flag, UI button, signup event, analytics event or manually edited public counter may grant entitlement or prize eligibility.

## 3. Provider-neutral data model

Names below are implementation proposals, not applied schema.

### `premium_payment_accounts`

Purpose: map one Kinaraidee user to provider-side customer identity.

Suggested fields:

- `id` UUID primary key
- `user_id` UUID, references authenticated user
- `provider` text
- `provider_customer_id` text
- `created_at` timestamptz
- `updated_at` timestamptz

Constraints:

- unique `(provider, provider_customer_id)`
- one active provider customer mapping per user/provider unless migration policy explicitly allows otherwise

### `premium_subscriptions`

Purpose: normalized subscription record.

Suggested fields:

- `id` UUID primary key
- `user_id` UUID
- `provider` text
- `provider_subscription_id` text
- `provider_plan_or_price_id` text nullable
- `normalized_status` enum/text
- `current_period_start` timestamptz nullable
- `current_period_end` timestamptz nullable
- `cancel_at_period_end` boolean default false
- `canceled_at` timestamptz nullable
- `ended_at` timestamptz nullable
- `last_provider_event_id` text nullable
- `last_provider_event_at` timestamptz nullable
- `created_at` timestamptz
- `updated_at` timestamptz

Constraints:

- unique `(provider, provider_subscription_id)`
- provider identifiers are data, never browser authority

### `premium_webhook_events`

Purpose: immutable-ish idempotent event inbox and audit trail.

Suggested fields:

- `id` UUID primary key
- `provider` text
- `provider_event_id` text
- `provider_event_type` text
- `provider_occurred_at` timestamptz nullable
- `received_at` timestamptz
- `payload_sha256` text
- `verification_status` text (`verified`, `rejected`)
- `processing_status` text (`pending`, `processed`, `ignored`, `failed`)
- `processed_at` timestamptz nullable
- `processing_error_code` text nullable
- `normalized_subscription_id` UUID nullable

Constraints:

- unique `(provider, provider_event_id)` for idempotency
- do not expose raw payload publicly
- retention period must be approved before production

### `premium_entitlements`

Purpose: backend-authoritative user access state.

Suggested fields:

- `user_id` UUID primary key
- `entitlement_status` text
- `valid_from` timestamptz nullable
- `valid_until` timestamptz nullable
- `source_subscription_id` UUID nullable
- `entitlement_version` bigint
- `revoked_reason` text nullable
- `updated_at` timestamptz

Entitlement states:

- `none`
- `active`
- `grace`
- `revoked`
- `expired`

The exact meaning of `grace` requires provider/business approval. It must not be invented from generic assumptions.

### `campaign_state`

Purpose: single backend source of truth for operational campaign state.

Suggested fields:

- singleton key
- `status` (`PRE_LAUNCH`, `LIVE`, `PAUSED`, `CLOSED`)
- `entries_open` boolean
- `kill_switch` boolean
- `eligibility_cutoff_at` timestamptz nullable
- `campaign_start_at` timestamptz nullable
- `campaign_end_at` timestamptz nullable
- `updated_at` timestamptz
- `updated_by` UUID/service identity

Fail-closed invariant:

`entries_open` must never become true when `status != LIVE` or `kill_switch = true`.

### `campaign_eligibility`

Purpose: technical eligibility derived from a valid Premium entitlement plus campaign rules.

Suggested fields:

- `user_id` UUID primary key
- `eligible` boolean
- `eligibility_reason_code` text
- `entitlement_version` bigint
- `evaluated_at` timestamptz
- `eligible_since` timestamptz nullable
- `ineligible_since` timestamptz nullable

This is still not a declaration of final legal prize eligibility. Final winner validation remains a separate step under the published rules.

### `campaign_admin_audit`

Purpose: auditable record of manual campaign-state changes.

Suggested fields:

- `id` UUID primary key
- `actor_id` UUID/service identity
- `action` text
- `before_state` jsonb
- `after_state` jsonb
- `reason` text
- `created_at` timestamptz

No silent direct edit of campaign status should be treated as acceptable production operations.

## 4. Normalized subscription state machine

Provider-specific states must map into a small Kinaraidee vocabulary. Proposed normalized states:

- `pending`
- `active`
- `past_due`
- `canceled_period_end`
- `canceled_immediate`
- `expired`
- `refunded`
- `disputed`
- `revoked`

Important rules:

- `active` may grant `premium_entitlements.active` only after a verified provider event or verified server-side reconciliation.
- `pending` never grants Premium.
- `past_due` behavior is a business decision: either immediate revoke or approved grace. Do not guess.
- cancel-at-period-end can retain entitlement only until the provider-confirmed paid period end.
- immediate cancellation/refund/dispute behavior must follow the approved provider/business policy.
- a later out-of-order provider event must not incorrectly overwrite a newer authoritative state.

## 5. Webhook processing algorithm

Provider adapter responsibilities:

1. read raw request body exactly as required by provider verification
2. authenticate signature/JWS/JWE/shared-secret mechanism
3. reject unverifiable events before state mutation
4. extract provider event ID, type, occurrence time and referenced customer/subscription IDs
5. compute payload hash for audit without exposing raw payload publicly
6. insert into `premium_webhook_events` using unique `(provider, provider_event_id)`
7. if duplicate, return the provider-appropriate successful acknowledgement without reapplying state
8. normalize event into Kinaraidee subscription transition
9. perform subscription + entitlement update in one database transaction where practical
10. evaluate campaign eligibility from the resulting entitlement and current campaign state
11. mark event processed

On processing failure after verification:

- retain the verified event as `failed`
- do not fabricate success state
- rely on provider retry and/or controlled reconciliation
- surface an operational alert without leaking payment secrets or personal data

## 6. Reconciliation path

Webhooks are primary event delivery but should not be the only recovery mechanism.

After provider selection, implement a server-side reconciliation job capable of:

- fetching the authoritative provider subscription state for known subscriptions
- detecting missed/out-of-order events
- repairing normalized state idempotently
- recording reconciliation source and timestamp
- never granting entitlement based solely on browser claims

Frequency and API-rate assumptions require provider-specific approval.

## 7. Access control / RLS intent

Production policy should enforce:

- ordinary authenticated users cannot write payment accounts, subscriptions, webhook events, entitlements, campaign eligibility or campaign state
- users may read only their own approved entitlement/eligibility projection
- raw provider IDs and raw webhook payloads should not be exposed through normal client APIs unless strictly required
- public campaign endpoint exposes aggregate fields only, e.g. status, entries-open flag, target and trusted eligible count
- admin/service mutations require server-side privileged identity and audit logging

Do not ship a service-role key or payment secret to browser code.

## 8. Trusted eligible count

Public `eligible_count` must be computed server-side from unique eligible users, not incremented by the client.

Conceptually:

`count(distinct user_id)` where all required technical conditions are true and exclusions are applied.

At minimum exclude:

- test/internal identities
- revoked entitlements
- refunded/disputed subscriptions when policy requires exclusion
- duplicate provider subscriptions for one user
- users outside campaign dates/cutoff
- users excluded by the final approved rules

Before LIVE, validate that the count is reproducible from an auditable backend query.

## 9. Campaign kill switch

Required behavior:

- kill switch is server-authoritative
- when enabled, `entries_open` evaluates false immediately regardless of UI cache
- no new eligibility should be created while kill switch is active
- public status should communicate paused/prelaunch state truthfully
- every manual toggle creates an audit record with actor/reason/timestamp

## 10. Sandbox lifecycle test matrix

Do not mark the sandbox gate complete until the selected provider's real sandbox/test account passes all applicable cases.

Required cases:

1. first successful monthly subscription -> one active entitlement
2. duplicate webhook -> no duplicate entitlement/count
3. event delivered out of order -> final state remains correct
4. renewal success -> period advances once
5. renewal failure -> approved past-due/grace behavior
6. retry success after failure -> entitlement recovers correctly
7. cancel at period end -> access remains only through paid end date
8. immediate cancellation -> approved behavior applied
9. full refund -> entitlement/eligibility policy applied
10. partial refund -> explicit approved policy, not guessed
11. dispute/chargeback -> explicit approved policy
12. webhook signature failure -> no state mutation
13. unknown subscription/customer -> safely quarantined/ignored with evidence
14. provider replay -> idempotent acknowledgement
15. reconciliation repairs missed event
16. user owns two provider subscriptions accidentally -> unique-user count stays one
17. campaign PRE_LAUNCH -> eligible count remains public zero even with sandbox entitlement
18. campaign kill switch -> no new eligibility
19. revoked entitlement -> removed from technical eligible set according to approved rules
20. no browser-only action can grant Premium or increment public count

## 11. Production acceptance gate

A production payment test must use the approved merchant account and approved low-risk test procedure. Evidence should include:

- transaction/reference identifier stored privately
- verified webhook receipt
- normalized subscription transition
- entitlement transition
- cancellation/refund cleanup as applicable
- reconciliation result
- no secrets in repository or screenshots

One successful payment does not by itself authorize campaign LIVE.

## 12. Rollout sequence after approvals

Recommended implementation order:

1. approve provider/merchant facts in `PAYMENT-PREMIUM-DECISION.md`
2. translate this blueprint into reviewed migration + rollback scripts
3. implement provider adapter in sandbox only
4. implement verified webhook inbox/idempotency
5. implement normalized subscription state
6. implement Premium entitlement projection
7. implement authenticated self-status endpoint
8. pass sandbox lifecycle matrix
9. perform production payment acceptance test
10. complete campaign legal/rules/operations gates
11. implement campaign eligibility projection + trusted aggregate
12. security/privacy review
13. explicit PRE_LAUNCH -> LIVE approval

## 13. Non-execution boundary

This blueprint must not be cited as evidence that:

- a payment provider has been selected
- a merchant account is approved
- Premium is purchasable
- a user has paid
- a user is Premium
- campaign entries are open
- `eligible_count` is non-zero
- legal/tax approval exists

It is implementation preparation only.