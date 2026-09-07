# Production Privacy & Legal Decision

Status: **PARTIAL OWNER INPUTS CONFIRMED / NOT APPROVED / LEGAL PASS PENDING**

Business baseline reference: `BUSINESS-COMMERCIAL-BASELINE.md`

This document is the Commercial-readiness decision gate for Production Privacy/Legal. Owner-approved business inputs may be recorded here, but they do **not** constitute legal review or approval.

## Confirmed owner inputs — 2026-09-07

- Merchant/business form: **individual / natural person**.
- Production-facing Privacy / Legal / Customer Support contact: **rachanakorn.inon@gmail.com**.
- First commercial distribution path: **Web/PWA first**.
- Payment provider baseline for disclosure planning: **Stripe Payments**; final provider/account implementation disclosure remains pending actual Production integration.
- Paid product baseline: **Premium THB 59/month**; no Free Trial in the first Beta.
- Cancellation/refund business policy direction is recorded in `BUSINESS-COMMERCIAL-BASELINE.md` and `PAYMENT-PREMIUM-DECISION.md`.
- Under-20 policy direction: Free use may be allowed subject to applicable law and actual data-processing basis; paid Premium must obtain guardian/legal-representative consent wherever applicable law requires it.

The under-20 direction is **not** a legal conclusion. The final account, consent, payment, data-processing and guardian-verification UX must be reviewed against applicable Thai law and the implemented flow.

## Decision fields still open before Legal PASS

- Service/controller legal identity to publish: **UNSET**.
- Privacy Policy URL/version: **UNSET / final publication pending**.
- Terms of Service URL/version: **UNSET / final publication pending**.
- PDPA/legal reviewer or approver: **UNSET**.
- Processing-purpose/legal-basis review: **PENDING**.
- Approved retention decision reference: **PENDING**.
- Data-rights procedure owner/process: **PENDING**.
- Supabase/vendor disclosure review: **PENDING against Production implementation**.
- Maps/location disclosure review: **PENDING against Production implementation**.
- Payment-provider disclosure review: **PENDING against Production implementation and provider/account terms**.
- Partner-tracking disclosure/agreement review: **PENDING until a real partner/provider path exists**.
- Under-20/guardian-consent legal + UX review: **PENDING**.
- Subscription/cancellation/refund disclosure review: **PENDING**.
- Approved at: **UNSET**.

## Required Production policy scope

Final Privacy/Terms materials must match the actual implementation and, where applicable, cover:
- account/profile identifiers
- preferences, Favorites and History
- product usage/analytics and attribution
- device/technical/security logs
- location use when the user enables location-dependent features
- Premium/subscription/payment references retained by Kinaraidee
- support communications
- referral/partner/affiliate tracking if actually enabled
- vendor/processor disclosures and relevant cross-border/data-processing terms
- retention/deletion rules
- data-subject rights request path
- subscription price, renewal behavior by payment method, cancellation, expiry and refund/dispute process

Do not claim that Kinaraidee stores full card numbers. The final text must reflect the actual payment integration and data fields retained by the application.

## Payment disclosure consistency rule

For the approved Beta direction:
- Card: only describe **automatic monthly renewal** after the provider/account-specific recurring-card path is actually validated and approved for Production.
- PromptPay: disclose that the user pays **THB 59 per paid period** and must initiate payment again for the next period; do not describe PromptPay as auto-renew.
- Payment success and Premium entitlement must be backend/provider-authoritative, not browser redirect truth.

If the final provider/account path differs, update the legal/payment disclosures before launch.

## Approval rule

Do not change Status to **APPROVED / Legal PASS** until every applicable field above contains a real reviewed value and the corresponding Production documents are published or otherwise traceable as required.

If a field is genuinely not applicable, record the reviewed rationale explicitly rather than inventing a value. Retention approval must not be inferred from product expiry, current row ages, dry-run thresholds, database defaults, or generic legal templates.

## Evidence boundary

The following are planning/implementation evidence only and do not prove Legal PASS:
- owner-approved business baseline
- Beta privacy copy
- static Privacy/Terms drafts
- location minimization behavior
- Partner application privacy acknowledgement fields
- `DATA-GOVERNANCE-DRAFT.md`
- retention dry-run tooling
- CI PASS
- provider research

They do not prove final controller identity publication, legal-basis review, retention approval, data-rights execution, vendor/payment/partner legal review, Public Beta completion, or Commercial GO.
