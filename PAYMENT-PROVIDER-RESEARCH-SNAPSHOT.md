# กินอะไรดี — Payment Provider Research Snapshot (Thailand)

Research date: **2026-09-04**

เอกสารนี้เป็น research-only สำหรับเตรียม Round 2 owner decision. **Provider selection = UNSET**, merchant account = not opened/verified, Premium price/cadence/entitlements = UNSET, และไม่มี payment/revenue/conversion evidence ถูกสร้างจากเอกสารนี้.

Canonical decision gate: `PAYMENT-PREMIUM-DECISION.md`.

## Project requirement assumed for comparison

- Web/PWA-first remains the current recommended first distribution path unless owner decides otherwise.
- Premium is expected to need a monthly/recurring subscription path, server-authoritative entitlement, authenticated/idempotent webhook handling, cancel/failure/refund/dispute/reconciliation evidence, and THB/Thailand merchant support.
- PromptPay is desirable for Thai users, but a payment method that cannot auto-renew must not be treated as a recurring subscription rail.

## Preliminary shortlist

| Provider | Thailand / THB | Public recurring capability | PromptPay | Public pricing snapshot | Webhook/server verification fit | Preliminary project fit |
|---|---|---|---|---|---|---|
| **Stripe** | Thailand accounts supported; PromptPay is THB-only | Stripe Billing supports recurring subscriptions; PromptPay itself explicitly says recurring payments = **No** | Yes | Domestic cards **3.65% + ฿10**; international cards **4.75% + ฿10**; PromptPay **1.65%**; Billing pay-as-you-go **0.7% of Billing volume**; standard Payments page says no setup/monthly fee | Strong documented API/Checkout/Billing/webhook ecosystem; exact production design still requires provider-specific implementation/testing | **Shortlist** — likely lowest engineering friction for a small Web/PWA subscription; automatic monthly Premium should use a recurring-capable rail such as card/Billing, not PromptPay auto-renew |
| **Omise (Opn)** | Thailand-focused docs/pricing; THB examples | Schedule API supports automatic recurring charge schedules, including membership-fee examples; Events/Webhooks available | Yes | Cards **3.65%** per transaction; PromptPay **1.65%**; mobile banking **฿10**; Direct Debit **฿10**; listed prices exclude VAT 7%; transfer fee **฿20** up to ฿2M / **฿150** above | Schedule/Charge/Event APIs + webhooks provide a credible recurring/server verification path; exact account capabilities and 3DS/schedule constraints must be confirmed for the merchant configuration | **Shortlist** — strong Thailand-local payment breadth and native recurring schedule support; merits side-by-side sandbox/merchant review with Stripe |
| **2C2P** | Thailand merchant/product presence; RPP examples use THB | RPP explicitly supports recurring payment schedules after first card payment; tokenization and recurring instructions supported | Payment-channel support exists broadly, but exact Premium rail/merchant configuration must be confirmed | **Comparable standard gateway MDR not found as a public fixed pricing table in this research.** Do not substitute Qwik pricing for main gateway pricing. Merchant agreement/public materials indicate merchant-specific fee structures and an inactivity maintenance condition in some agreements | Robust RPP/tokenization/reconciliation documentation; likely suitable where enterprise/merchant requirements favor it | **Alternate** — technically capable recurring platform, but current project should obtain merchant quote/capability confirmation before scoring cost or choosing it over Stripe/Omise |

## Provider notes

### Stripe

Official sources checked:
- Pricing Thailand: https://stripe.com/th/pricing
- PromptPay product page: https://stripe.com/th/payment-method/promptpay
- Thailand payment-method support: https://support.stripe.com/questions/supported-payment-methods-currencies-and-businesses-for-stripe-accounts-in-thailand?locale=th-TH

Current public facts observed on 2026-09-04:
- domestic card pricing: 3.65% + ฿10 per successful transaction
- international card pricing: 4.75% + ฿10
- PromptPay: 1.65% per successful transfer; PromptPay refunds have a listed additional ฿10 fee on the pricing page
- Stripe Billing pay-as-you-go: 0.7% of Billing volume
- standard Payments pricing page states no setup fee/monthly fee for the standard pay-as-you-go Payments pricing
- PromptPay page explicitly lists `Recurring payments: No`
- PromptPay customer location = Thailand, transaction currency = THB, real-time method, refunds/partial refunds supported, Connect supported

Project implication:
- PromptPay can be offered as a Thai one-time/manual-renewal option if product policy later wants it, but **must not be modeled as automatic monthly renewal** from the public capability above.
- For automatic monthly Premium, card + Stripe Billing is the obvious Stripe research path to validate in sandbox after provider/account approval.

### Omise (Opn)

Official sources checked:
- Thailand pricing: https://www.omise.co/th/pricing/thailand
- Schedule API: https://docs.omise.co/th/schedules-api/thailand
- Charge Schedule API: https://docs.omise.co/th/charge-schedules-api/thailand
- Automate/recurring overview: https://docs.omise.co/th/automate/thailand
- Events API: https://docs.omise.co/th/events-api/thailand
- PromptPay: https://docs.omise.co/th/promptpay-solution/thailand

Current public facts observed on 2026-09-04:
- cards: 3.65% per transaction
- Direct Debit: ฿10 per transaction
- supported mobile-banking app payment listing: ฿10 per transaction
- PromptPay: 1.65% per transaction
- listed Thailand pricing excludes VAT 7%
- Schedule API supports day/week/month schedules; official example includes recurring `Membership fee`
- scheduled-charge docs expose test/live objects and customer/card based scheduled charges
- Events API/webhooks expose account events
- Automate page describes weekly/monthly/date-based automatic charges for recurring fees such as monthly service or annual membership

Important integration caveat from current docs:
- Charge Schedule documentation states Schedule API cannot currently be used with accounts that have 3-D Secure enabled. This must be confirmed against the exact merchant/account configuration and current provider guidance before selection; do not assume a production recurring design until the provider confirms the applicable path.

### 2C2P

Official sources checked:
- Redirect API payment features / RPP: https://developer.2c2p.com/v4.5.0/docs/redirect-api-payment-features
- Recurring Payment Plan: https://developer.2c2p.com/docs/sdk-recurring-payment-plan
- Reconciliation docs: https://developer.2c2p.com/v4.5.0/docs/batch-services-reconcile-report-non-ipp
- Thailand merchant agreement material found on 2C2P public site during research; provider-specific commercial terms must be confirmed with 2C2P before selection.

Current public facts observed on 2026-09-04:
- RPP lets a merchant create a recurring schedule from the first card payment plus recurring instructions
- RPP examples include THB and recurring interval/count/next-charge parameters
- tokenization/customer-token flows are documented
- reconciliation reports include transaction/service fee fields, VAT/service-fee information and settlement data
- a standard public fixed MDR table comparable to Stripe/Omise was **not established** in this research; therefore 2C2P cost remains `QUOTE / VERIFY`

Do not use Qwik by 2C2P's separate public fee article as the standard gateway MDR for this comparison; it is a different product/service context.

## Preliminary engineering recommendation — not an owner/provider decision

For the current Kinaraidee Web/PWA + monthly Premium direction:

1. **Keep Stripe and Omise as the Round 2 primary shortlist.**
2. **Keep 2C2P as an alternate** pending merchant quote and exact feature/account fit.
3. When owner is ready, compare actual merchant onboarding eligibility, settlement, tax/VAT documents, recurring-account constraints, refund/dispute handling and sandbox behavior before choosing.
4. Do not finalize Premium price until provider fees + VAT/tax/accounting treatment + refund/dispute assumptions are reviewed.
5. Regardless of provider, Premium entitlement must remain backend-authoritative; client UI/payment-return success alone must never grant durable Premium.

### Why Stripe is the preliminary implementation lead

- clear Thailand public pricing
- explicit Billing subscription product
- Web/PWA-friendly Checkout/API path
- fewer moving parts for a small first commercial build

This is an engineering-fit recommendation only. It does **not** mean Stripe is selected.

### Why Omise remains a strong co-finalist

- Thailand-local payment breadth
- public recurring Schedule API and webhook/Event APIs
- same public card rate percentage as Stripe before Stripe's fixed ฿10 card component, while exact total economics still depend on VAT, transaction mix, settlement/transfer fees, account terms and selected features

Do not reduce provider selection to headline MDR alone.

## Questions to verify only when Round 2 opens

For each shortlisted provider:
- merchant eligibility for the real service/controller entity
- exact live payment methods enabled for that account
- recurring card/subscription path and 3DS/SCA behavior
- sandbox/test mode coverage for subscribe/renew/cancel/failure/refund/dispute
- webhook signing/authentication and retry semantics
- settlement cadence, withdrawal/transfer fees and bank account requirements
- refund/dispute/chargeback fees
- VAT/tax invoice/WHT treatment relevant to the real entity
- prohibited/restricted-business review
- account review/onboarding time and documents
- production support/escalation path

## Evidence boundary

This snapshot is time-bounded public-provider research. Public pricing/docs may change and must be rechecked at provider-selection time. It does not establish merchant approval, contractual pricing, payment availability on the eventual account, successful sandbox/live payment, subscriber count, conversion, revenue, Premium entitlement, refund/dispute handling, legal/tax approval, Public Beta completion or Commercial GO.
