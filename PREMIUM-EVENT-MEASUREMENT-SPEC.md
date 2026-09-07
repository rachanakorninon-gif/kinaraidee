# Kinaraidee — Premium Event Measurement Specification v1

Status: **MEASUREMENT DESIGN READY / NOT IMPLEMENTED / NO PRODUCTION PREMIUM DATA / COMMERCIAL NO-GO**

Canonical business baseline: `BUSINESS-COMMERCIAL-BASELINE.md`  
Payment truth contract: `PREMIUM-SUBSCRIPTION-ARCHITECTURE.md`  
Existing core acquisition telemetry: `PRODUCT-EVENT-MEASUREMENT.md`

## 1. Purpose

Define the Premium/Payment analytics contract before implementation so Product, Frontend, Backend, QA and Business use the same event names and truth boundaries.

This specification does **not** alter the currently deployed Product Event measurement system, create a database table, enable analytics ingestion, process payment, or establish any Production metric.

## 2. Measurement principles

1. Interaction analytics and billing truth are separate systems.
2. Browser events may measure intent/UX but never prove payment or entitlement.
3. `checkout_start` is not a paid customer.
4. `payment_success` must come from provider/backend-authoritative truth.
5. `premium_activated` must come from backend-authoritative entitlement truth.
6. Refresh/retry/replayed provider events must not inflate business counts.
7. Sandbox/Test Mode traffic must be separable from Production traffic.
8. Internal QA/synthetic telemetry must not be mixed into real-user business results.
9. All dashboard metrics require explicit denominator/time-window definitions.
10. Missing or untrusted tracking means `INCONCLUSIVE`, not zero and not PASS.

## 3. Event taxonomy

### Client/product interaction events

These may originate in the browser after implementation:

| Event | Meaning | Authority level |
|---|---|---|
| `premium_offer_view` | Premium offer/pricing surface became meaningfully visible | Interaction only |
| `premium_cta_click` | User intentionally clicked the Premium CTA | Interaction only |
| `payment_method_selected` | User selected card or PromptPay | Interaction only |
| `checkout_start` | Backend/provider checkout/payment setup was successfully initiated | Intent only |
| `premium_continue_free` | User chose to continue using Free from the Premium surface | Interaction only |
| `subscription_manage_view` | User opened membership/subscription management | Interaction only |
| `subscription_cancel_requested` | User intentionally requested cancellation before authoritative processing completes | Intent only |

Browser events must never contain payment secrets, full card data, CVC, raw provider payloads, or sensitive authentication tokens.

### Backend/provider-authoritative events

These must be emitted/derived only after authoritative backend/provider state is established:

| Event | Required truth source |
|---|---|
| `payment_success` | Verified successful provider payment for a specific intended paid period |
| `payment_failed` | Provider/backend confirms payment attempt failed/declined |
| `payment_action_required` | Provider/backend confirms customer authentication/action is required |
| `premium_activated` | Backend entitlement is active for a paid period |
| `subscription_cancelled` | Backend records cancel-at-period-end / future renewal off according to approved policy |
| `premium_expired` | Backend entitlement actually became inactive at the paid-period end |
| `refund_confirmed` | Provider/backend confirms refund under approved runbook |
| `dispute_opened` | Provider/backend confirms dispute/chargeback case exists |
| `dispute_resolved` | Provider/backend confirms a final dispute outcome |

Do not emit `payment_success` merely because a success page loaded or a query parameter says `success=true`.

## 4. Payment-method semantics

### Card

When provider/account-specific auto-renew is enabled and validated:

`premium_offer_view`
→ `premium_cta_click`
→ `payment_method_selected(card)`
→ `checkout_start`
→ provider result
→ `payment_success`
→ `premium_activated`
→ future renewal attempt/result

A future renewal attempt that fails or requires action must be represented separately and must not be counted as a successful renewal.

### PromptPay

`premium_offer_view`
→ `premium_cta_click`
→ `payment_method_selected(promptpay)`
→ `checkout_start`
→ provider-confirmed transfer
→ `payment_success`
→ `premium_activated`

PromptPay has no automatic renewal in the approved Beta direction. A later period requires a new customer-initiated payment flow and a new authoritative successful payment.

## 5. Event identity / deduplication

Implementation must define stable identifiers so the same real action cannot be counted multiple times from refresh/retry/replay.

Recommended identifiers:

- analytics event ID: unique event UUID generated/accepted once by the ingestion boundary
- anonymous/browser session ID for pre-auth interaction analysis where appropriate
- authenticated user ID only where needed and privacy/legal review permits it
- internal subscription ID
- internal payment-attempt ID
- provider payment/event reference stored server-side
- environment: `test`, `production`, or another explicit controlled environment

Business-success events should be deduplicated primarily against authoritative backend/payment identifiers, not a browser session ID.

Examples:

- repeated success-page refresh must not create repeated `payment_success`
- duplicate Stripe webhook delivery must not create repeated `premium_activated`
- one paid period should not be counted twice because both synchronous API confirmation and webhook delivery arrive

## 6. Attribution contract

Where acquisition attribution is used, preserve reviewed UTM inputs without allowing them to mutate billing truth.

Recommended fields when available:

- `utm_source`
- `utm_medium`
- `utm_campaign`
- `utm_content`
- first-touch attribution snapshot
- last-touch attribution snapshot, if later implemented deliberately

Do not overwrite first-touch with a later campaign without preserving provenance.

Current Product Event telemetry has its own deployed privacy/data boundary and currently only records reviewed acquisition-stage fields under its existing contract. Do not silently add Premium/user/payment identifiers to that deployed table merely for convenience.

## 7. Recommended event properties

Only collect fields needed for the measurement question and approved Privacy/Legal scope.

### Common non-sensitive properties

- event timestamp from trusted server where feasible
- environment
- app/runtime version
- payment method type: `card` / `promptpay`
- plan code
- price/currency snapshot for the intended offer, e.g. THB 59 under the approved Beta baseline
- internal experiment/campaign slug where approved
- bounded status/reason code

### Do not collect in analytics payloads

- full card number
- CVC
- bank-account credentials
- Stripe secret/webhook secret
- auth access/refresh token
- raw provider webhook payload unless retained only inside a separately governed secure payment audit boundary
- unnecessary precise location
- arbitrary free-text provider errors that may leak sensitive details

## 8. Funnel definitions

### Premium interest funnel

- `Premium offer viewers`: unique users/sessions that satisfy the final `premium_offer_view` visibility rule
- `Premium CTA rate` = unique `premium_cta_click` / unique `premium_offer_view`
- `Checkout start rate` = unique `checkout_start` / unique `premium_offer_view`

These are intent metrics, not revenue.

### Payment funnel

- `Checkout completion rate` = successful authoritative first payments / valid checkout starts
- `Activation integrity` = backend Premium activations / successful authoritative first payments

Activation integrity should be investigated when it differs from 1:1 after allowing for deliberately documented timing/retry windows.

### Free → Paid conversion

The denominator must be defined before reporting, for example:

- eligible authenticated Free users exposed to the offer in a specified window, or
- activated Free users in a cohort

Do not alternate denominators between reports.

### Renewal / retention

For card auto-renew only after it is actually enabled:

- renewal due count
- renewal success count
- renewal action-required count
- renewal failure count
- cancellation-before-renewal count

For PromptPay, do not call repurchase a background auto-renewal. Report customer-initiated next-period repurchase separately if useful.

## 9. Business outcome definitions

### Paid customer

Count a paid customer only when:

1. provider-backed successful payment exists, and
2. backend entitlement is correctly activated for that paid period.

A person who only clicked CTA/started checkout is not a paid customer.

### Gross collected revenue

Sum only successfully collected Production payments that belong to the reporting scope. Exclude mock/Test Mode events.

### Refunds / disputes

Report separately and adjust the defined net/contribution view only according to the accounting/business definition being used.

### Active Premium

Count from backend entitlement/subscription truth at a defined observation time, not from historical `premium_activated` event count alone.

## 10. Data-quality checks before Tracking PASS

At minimum verify:

- no duplicate client event from a single intended action beyond documented UI behavior
- provider retries/webhook duplicates do not duplicate business events
- success-page refresh does not increase payment/revenue counts
- `payment_success` matches provider-backed payment truth
- `premium_activated` matches backend entitlement truth
- payment success without entitlement is detected
- entitlement without supporting payment is detected
- environment separation prevents Test Mode from entering Production dashboards
- UTM fields survive the intended flow where attribution is in scope
- internal QA traffic is identifiable/excludable under an approved method
- time-zone/reporting window is explicit

Until these checks pass on the implemented system, Premium tracking remains PENDING/INCONCLUSIVE.

## 11. QA acceptance matrix for measurement

QA should confirm the expected events for:

- Premium page view
- card selection
- PromptPay selection
- checkout initiation
- successful first payment
- abandoned/cancelled checkout
- card payment failure
- card action required
- PromptPay QR expiry
- Premium activation
- cancellation request and authoritative cancellation
- expiry/downgrade
- refund/dispute path when implemented
- browser refresh/reopen/relogin
- duplicate provider event delivery

Each test must distinguish:

- UI behavior
- event emitted/not emitted
- authoritative backend/payment state
- whether the event is synthetic/Test Mode or Production

## 12. Dashboard v1 requirements

A future Premium dashboard should separate:

### Acquisition / Product
- visitors/new users according to existing approved measurement definitions
- activated recommendation users
- repeat usage/retention when trustworthy

### Premium interest
- offer views
- CTA clicks
- checkout starts
- continue-Free actions

### Payments / Entitlement
- successful payments
- failed/action-required payments
- Premium activations
- active Premium
- cancellations
- expiries
- refunds/disputes

### Revenue
- gross collected revenue
- payment fees from actual settlement/reporting source where available
- refunds
- defined contribution/net view

Every dashboard tile must show reporting period and source/definition. `N/A`, `PENDING`, or `INCONCLUSIVE` is preferable to an invented zero.

## 13. Current status

- Event taxonomy: **DESIGN READY**
- Browser implementation: **NOT IMPLEMENTED by this document**
- Backend authoritative implementation: **NOT IMPLEMENTED by this document**
- Production Premium event data: **NOT ESTABLISHED**
- Paid conversion: **NOT ESTABLISHED**
- Revenue: **NOT ESTABLISHED**
- Tracking PASS for Premium: **PENDING**
- Commercial GO: **NO-GO**

This specification can be used by Frontend/Backend/QA as an implementation contract without claiming that any business result has occurred.
