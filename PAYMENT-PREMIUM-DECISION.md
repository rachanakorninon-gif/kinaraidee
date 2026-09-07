# Payment & Premium Commercial Decision

Status: **BUSINESS DECISIONS APPROVED / EXECUTION PENDING / COMMERCIAL NO-GO**

Owner decision timestamp: **2026-09-07T23:12:36+07:00**

Canonical business baseline: `BUSINESS-COMMERCIAL-BASELINE.md`.

This record captures the approved business choices for the first Web/PWA Premium Beta while preserving the stricter requirement for provider-backed implementation, legal review, QA, security, reconciliation, and Production evidence before real-money Commercial GO.

## Approved decision fields

- Payment provider baseline: **Stripe Payments**.
- Merchant/business form: **individual / natural person**.
- Supported market/currency: **Thailand / THB**.
- Premium price/billing cadence: **THB 59/month**.
- Free trial: **none for the first Beta**.
- Free vs Premium entitlement principle: **core `ไม่รู้เลย` and basic recommendation remain Free; Premium adds enhanced personalization, expanded/more useful Favorites/History, advanced capabilities as implemented, and ad-free experience if advertising is later introduced**.
- Card billing proposition: **THB 59/month with automatic renewal as the target behavior, conditional on provider/account-specific recurring-card Test Mode validation**.
- PromptPay billing proposition: **THB 59 per paid period, customer-initiated each period, no automatic renewal**.
- Cancellation: **cancel renewal at any time; retain Premium through the already-paid period**.
- Payment failure: **does not renew or extend Premium**.
- Expiry/downgrade: **return to Free without immediate deletion of user-owned Favorites/History/Preferences solely because of plan downgrade**.
- Refund baseline: **no automatic refund merely because an already-started service period is later cancelled; support review/refund for duplicate or erroneous charges, system-caused failures, and cases required by applicable law/provider rules**.
- Commercial owner/approver: **product owner**.
- Owner-approved business baseline at: **2026-09-07T23:12:36+07:00**.

## Selected technical direction — not yet Payment PASS

- Stripe Billing is **not** the selected architecture for the Thailand path. The time-bounded Stripe Thailand Billing page checked on 2026-09-07 states `Billing — Not available in your country`.
- Target architecture: **Stripe Payments + Kinaraidee-controlled subscription/entitlement lifecycle**.
- Card recurring/off-session collection remains **PENDING provider/account-specific validation**. Do not claim automatic renewal is operational until the exact Test Mode lifecycle, authentication recovery, consent/mandate requirements, and provider terms are proven for the real account path.
- PromptPay is customer-initiated and non-recurring; never represent it as auto-renew.
- Browser redirect/query-string state is never payment or entitlement authority.
- Premium entitlement must be backend-authoritative and traceable to provider-backed payment truth.

Time-bounded official references used for the provider baseline:
- https://stripe.com/th/pricing
- https://stripe.com/en-th/billing/pricing
- https://stripe.com/th/payment-method/promptpay

Public fee references checked 2026-09-07 are planning inputs only:
- domestic card: **3.65% + THB 10 per successful transaction**
- PromptPay: **1.65% per successful transfer**

Recheck fees, product availability, merchant eligibility, recurring-card terms, authentication, refunds and disputes immediately before implementation/Production acceptance.

## Implementation/evidence fields still open

- Provider-supported sandbox/test environment: **Stripe Test Mode planned; execution evidence PENDING**.
- Server-side entitlement/webhook verification: **architecture prepared in `PREMIUM-SUBSCRIPTION-ARCHITECTURE.md`; implementation/security evidence PENDING**.
- Card recurring lifecycle: **PENDING provider/account-specific proof**.
- PromptPay lifecycle: **PENDING provider-backed proof**.
- Refund/dispute/chargeback operational runbook and owner execution: **PENDING**.
- Transaction audit/reconciliation procedure and execution evidence: **PENDING**.
- Privacy/Terms/payment disclosure: **`PRODUCTION-PRIVACY-LEGAL-DECISION.md` remains the canonical Legal gate; final Legal PASS PENDING**.
- Production merchant/account activation and controlled real-money acceptance: **PENDING**.

## Minimum Payment PASS matrix

Before accepting this decision as Payment PASS, evidence must cover at least:

1. first card payment success and backend entitlement activation
2. recurring-card next-period collection only if the provider/account path validates it
3. required-authentication recovery path
4. failed payment does not extend entitlement
5. cancellation stops future renewal and keeps paid-period access
6. actual expiry downgrades to Free correctly
7. PromptPay success activates only after provider/backend confirmation
8. expired/abandoned PromptPay does not activate Premium
9. duplicate/out-of-order provider events are idempotent
10. browser refresh/reopen/relogin does not create duplicate charge or entitlement
11. provider payment truth reconciles with internal transactions and Premium entitlements
12. refund/dispute behavior follows the approved policy and is tested
13. forged/invalid webhook events are rejected
14. no payment secrets/full card data are exposed to the browser/public repository

## Approval vs execution rule

The **business decisions are approved**. This does not mean Payment PASS or Commercial GO.

Do not change the status to Payment PASS / Commercial GO until all applicable implementation, provider-backed sandbox/controlled evidence, legal, security, QA, support and reconciliation gates are actually satisfied.

## Evidence boundary

This record does **not** prove:
- a Production Stripe account is fully activated for the intended flows
- recurring-card collection works for the actual account
- a transaction occurred
- Premium entitlement implementation is correct
- any user converted or paid
- any subscriber, MRR or revenue exists
- Privacy/Terms are legally approved
- Public Beta is complete
- Commercial GO is authorized

Mock/static/sandbox preparation and owner approval remain separate from Production business outcomes.
