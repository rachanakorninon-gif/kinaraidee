# Kinaraidee Premium API Contract — DESIGN ONLY

Status: **NOT IMPLEMENTED / NOT PRODUCTION AUTHORITY**

This contract describes the intended server boundary after provider/merchant/pricing approval. It creates no payment, entitlement, campaign entry, or winner.

## General rules

- Browser state never grants Premium.
- Authenticated user identity comes from verified Supabase Auth session on the trusted server side.
- Payment-provider events must be authenticated before state mutation.
- Duplicate provider event identifiers are idempotent.
- Out-of-order/older events must not resurrect a newer canceled/refunded/disputed/revoked state.
- If trusted entitlement/count data is unavailable, fail closed rather than inventing Premium or campaign eligibility.
- Public campaign endpoints return aggregate data only, never participant identities.

## `GET /premium/me`

Purpose: return the authenticated user's backend-derived Premium state.

Auth: required.

Successful response fields:

- `entitlement_code`: e.g. `premium_monthly`
- `status`: `active | grace | inactive | revoked`
- `valid_until`: timestamp or null
- `is_premium`: boolean derived by backend

Failure behavior:

- invalid/missing session → unauthorized
- entitlement authority unavailable → service unavailable, UI must fail closed

## `GET /campaign/3000/status`

Purpose: public aggregate campaign state.

Auth: not required.

Response fields:

- `campaign_code`: `premium_3000_iphone`
- `lifecycle_status`: `PRE_LAUNCH | LIVE | PAUSED | CLOSED | ARCHIVED`
- `entries_open`: boolean
- `target_count`: always 3000 for this campaign
- `eligible_count`: integer aggregate only
- `count_as_of`: timestamp or null
- `rules_version`: approved rules version or null

Required truth behavior:

- PRE_LAUNCH → `entries_open=false`, `eligible_count=0`
- PAUSED / kill switch active → `entries_open=false`; no new eligibility may be created
- unavailable trusted count → do not replace with cached/invented growth numbers
- never return emails, user IDs, payment references or participant list

## `GET /campaign/3000/me`

Purpose: authenticated user's **technical** campaign eligibility.

Auth: required.

Response fields:

- `campaign_code`
- `entries_open`
- `technically_eligible`
- `exclusion_reason` or null
- `evaluated_at`
- `final_legal_eligibility_confirmed`: must remain false until the approved final validation process exists

Technical eligibility is not winner selection and not final legal eligibility.

## `POST /premium/checkout-session`

Purpose: create a provider-hosted checkout/session after all payment gates are approved.

Auth: required.

Request:

- `plan_code`: approved plan code only

Hard gate:

This operation must remain disabled until the provider, merchant account, price, recurring method, refund/cancel policy and commercial approval are recorded.

Response may include only the provider session/checkout destination and expiry metadata. A checkout response **never grants Premium**; entitlement changes only after verified provider truth.

## Provider webhook boundary

Purpose: ingest payment-provider events through a server-only endpoint.

Required algorithm:

1. capture raw request safely for signature verification requirements
2. verify provider signature/authentication before mutation
3. reject malformed/unauthenticated events
4. insert event inbox row using provider + provider event ID unique key
5. if duplicate, return successful idempotent acknowledgement without applying twice
6. normalize provider event into internal subscription state
7. compare provider occurrence/version time to current state
8. ignore stale events that would roll state backward incorrectly
9. update subscription record transactionally
10. recompute entitlement from normalized subscription truth
11. recompute campaign technical eligibility only if campaign state allows it
12. commit
13. record redacted operational evidence; never expose secrets to clients

## Client UX boundary

The client may display Premium/campaign state returned by trusted endpoints but must not:

- accept query-string/local-browser flags as authority
- optimistically unlock Premium after checkout redirect alone
- increment the 3,000 counter locally
- claim prize entry while `entries_open=false`
- infer winner/legal eligibility from Premium status

## Rate limiting / abuse

Before production:

- apply sensible rate limits to public status and authenticated self endpoints
- webhook endpoints rely on provider authentication plus replay/idempotency controls
- admin mutation paths must require stronger authorization and audit every state change

## Observability

Track operational metrics without sensitive payloads:

- verified webhook received / processed / ignored / failed
- duplicate event count
- reconciliation drift count
- entitlement recompute failures
- campaign status endpoint availability
- kill-switch activation/resume events

No metric label should contain email, full provider payload, card/payment secret, auth token or participant identity.
