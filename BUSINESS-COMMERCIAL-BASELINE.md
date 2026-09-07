# Kinaraidee — Owner-Approved Business / Commercial Baseline

Decision session completed: **2026-09-07T23:12:36+07:00**

Status: **OWNER-APPROVED BUSINESS BASELINE / IMPLEMENTATION & COMMERCIAL EVIDENCE PENDING / COMMERCIAL NO-GO**

This document records product-owner business decisions for the first Web/PWA Premium Beta. It is a decision record, not evidence that payment, Premium entitlement, legal review, Production traffic, conversion, partner activity, or revenue exists.

## 1. Launch / platform

- First commercial path: **Web/PWA first**.
- Native iOS/Android distribution: later phase, only after Product/Funnel/Conversion/Retention evidence justifies it and current store policies are reviewed.

## 2. Premium price and billing proposition

- Beta Premium price: **THB 59 per month**.
- Free trial: **none during the first Beta** because the Free tier exposes the core product value.
- Card proposition: **THB 59/month**, with automatic renewal as the target behavior only after provider/account-specific recurring-card validation passes.
- PromptPay proposition: **THB 59 per paid period**, customer-initiated each period; **no automatic renewal**.
- Cancellation: user may cancel renewal at any time; paid Premium remains usable until the end of the already-paid period.
- Failed renewal/payment: does **not** count as a successful renewal and must not extend Premium entitlement.
- Expiry/downgrade: account returns to Free; the plan change alone must not immediately delete user-owned Favorites/History/Preferences.

## 3. Payment provider / merchant baseline

- Selected first provider baseline: **Stripe Payments**.
- Merchant form: **individual / natural person**.
- Market/currency: **Thailand / THB**.
- Stripe Billing is **not** treated as available for the Thailand account path. The Thailand Billing pricing page currently states `Billing — Not available in your country`.
- Therefore the target architecture is **Stripe Payments + Kinaraidee-controlled subscription/entitlement lifecycle**, not a claim that Stripe Billing is enabled.
- Card recurring/off-session execution remains **PENDING** until provider/account-specific Test Mode evidence proves the exact lifecycle and required authentication handling.
- PromptPay is a customer-initiated payment method and is **not recurring**; it must not be labeled auto-renew.

Time-bounded provider references checked 2026-09-07:
- Stripe Thailand pricing: https://stripe.com/th/pricing
- Stripe Billing Thailand page: https://stripe.com/en-th/billing/pricing
- Stripe PromptPay: https://stripe.com/th/payment-method/promptpay

Public fee references at the time of this decision are planning inputs only, not merchant-specific settlement evidence:
- domestic cards: **3.65% + THB 10 per successful transaction**
- PromptPay: **1.65% per successful transfer**

Recheck provider availability, fees, merchant terms, recurring-card requirements, authentication, refund/dispute rules, and account eligibility immediately before Production implementation/acceptance.

## 4. Free vs Premium Beta v1

### Free must retain the core product value

- `ไม่รู้เลย` / Surprise recommendation remains usable.
- Basic food recommendation remains usable.
- Free must remain a genuinely useful product; do not introduce a forced paywall after a small number of uses merely to manufacture conversion.

### Premium value direction

Premium at THB 59/month adds recurring convenience/intelligence rather than removing the Free core:
- enhanced personalization / learning from preferences and history
- more useful or expanded Favorites/History capability
- advanced Premium capabilities where implemented and clearly disclosed
- ad-free experience if advertising is introduced in the future

Exact storage/history limits and individual advanced features may be implementation-tested later; do not promise `unlimited` unless the implemented contract actually supports it.

## 5. Subscription / refund policy baseline

- Monthly subscription continues until cancellation for a successfully validated auto-renew card path.
- Cancellation is cancel-at-period-end by default for the Beta proposition.
- Refunds are not automatically granted for an already-started service period, but duplicate charges, erroneous charges, system-caused failures, and cases required by applicable law/provider rules must have a supported review/refund path.
- Chargeback/dispute handling must be operationally defined before Commercial GO.
- Browser redirect/query parameters are never authoritative payment or Premium proof.

## 6. Privacy / legal / support inputs

- Production-facing contact for Privacy / Legal / Customer Support: **rachanakorn.inon@gmail.com**.
- Merchant form is individual/natural person, but the final published controller/legal identity and all mandatory legal wording still require the canonical Production Privacy/Legal decision and review.
- Under-20 policy direction:
  - Free use is allowed subject to applicable law and the implemented data-processing basis.
  - Paid Premium for a user under 20 must obtain guardian/legal-representative consent wherever applicable law requires it.
- This age direction is a product/legal baseline, **not legal approval**. The final consent/account/payment UX must be reviewed against the implemented flow and applicable Thai law before Commercial GO.

## 7. Restaurant / affiliate revenue baseline

- Primary future restaurant monetization direction: **affiliate / commission from a verifiable action or transaction**.
- Restaurant click/search alone is not revenue.
- Sponsored Listing may be considered later only after real traffic exists and sponsored placement is clearly disclosed.
- Until a real provider/restaurant agreement and confirmed conversion/commission exist: Partner count, conversion, commission, and restaurant revenue remain **NOT ESTABLISHED**.

## 8. Analytics / evidence boundary

The intended Premium funnel includes at minimum:

`premium_offer_view`
→ `premium_cta_click`
→ `checkout_start`
→ provider-authoritative payment result
→ `payment_success`
→ backend-authoritative `premium_activated`

Lifecycle events should distinguish at least payment failure, cancellation request/cancellation, and actual expiry.

Rules:
- `checkout_start` is not a customer.
- `payment_success` must be provider/backend-authoritative.
- Premium entitlement must be backend-authoritative.
- Payment/entitlement reconciliation must detect mismatches in either direction.
- No mock/static/sandbox count may be reported as Production users, conversion, payment, partner, MRR, or revenue.

## 9. Commercial GO gate

Commercial GO requires all applicable critical gates to be evidenced as PASS:

1. **Payment PASS** — approved provider/account path; subscribe/pay, renewal where applicable, cancel, failure/authentication recovery, expiry, refund/dispute handling, idempotency, reconciliation.
2. **Legal PASS** — published/reviewed Privacy, Terms, subscription/cancellation/refund disclosure and applicable youth/consent handling.
3. **Tracking PASS** — Production event integrity and payment/entitlement truth boundaries verified.
4. **QA PASS** — required Production/physical-device flows evidenced.
5. **Support PASS** — reachable support path and operational handling verified.
6. **Security PASS** — no unresolved Critical blocker for Auth, payment, entitlement, secrets, or user data.

If any applicable critical gate is `FAIL`, `PENDING`, or `INCONCLUSIVE`, status remains **Commercial NO-GO**.

## 10. Current truth at this decision point

- Business baseline: **APPROVED by product owner**.
- Payment implementation: **PENDING**.
- Provider-backed recurring-card Test Mode evidence: **PENDING**.
- PromptPay Production evidence: **PENDING**.
- Production Legal approval: **PENDING**.
- Production users/conversion/payments/partners/revenue attributable to this baseline: **NOT ESTABLISHED**.
- Commercial GO: **NO-GO** until the required evidence gates pass.

## 11. Canonical sync targets

The following records must stay consistent with this baseline while preserving their stricter execution/evidence gates:
- `PAYMENT-PREMIUM-DECISION.md`
- `PREMIUM-SUBSCRIPTION-ARCHITECTURE.md`
- `FREE-PREMIUM-FEATURE-SPLIT.md`
- `PREMIUM-PRICING-SCENARIOS.md`
- `PRODUCTION-PRIVACY-LEGAL-DECISION.md`
- `OWNER-DECISIONS-QUEUE.md`

Approval of this baseline does not override any stricter technical, legal, security, QA, release, or Commercial evidence requirement in those documents.
