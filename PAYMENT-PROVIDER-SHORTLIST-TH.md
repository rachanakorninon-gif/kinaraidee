# Kinaraidee — Thailand Payment Provider Shortlist

Research date: **2026-08-29**
Public-doc re-check: **2026-08-29**

Status: **RESEARCH ONLY / PROVIDER NOT SELECTED / PAYMENT GATE STILL NOT APPROVED**

This document narrows the technical shortlist for a future monthly Kinaraidee Premium subscription. It does not select a provider, create a merchant account, approve pricing, authorize real-money acceptance, migrate payment schema, or change `PAYMENT-PREMIUM-DECISION.md` from **NOT APPROVED**.

## Product requirements used for screening

The provider path should support, or provide a credible documented path for:

- Thai merchant/business onboarding subject to real account approval
- THB collection/settlement appropriate to the final business setup
- recurring card/subscription billing
- server-side event/notification processing
- secure verification of provider-originated payment state
- test/sandbox mode before production
- cancellation and recurring-plan maintenance
- refund/dispute lifecycle needed by the Premium entitlement contract
- Web/PWA integration now
- reasonable migration path if native iOS/Android distribution is added later
- no payment secret in browser/public repository

## 2026-08-29 official-public-doc re-check

These are **public standard/documentation facts only**. They are not account-specific merchant approval, negotiated pricing, recurring-method enablement or production authorization.

### Omise / Opn public facts

- Thailand public pricing currently lists **3.65% per successful card transaction** and **1.65% per PromptPay transaction**, with displayed pricing subject to 7% VAT. This is public standard pricing, not a quote for the eventual Kinaraidee merchant account.
- Official recurring-payment documentation says recurring collection can be configured through the dashboard or Schedule API.
- Current Charge Schedule API documentation includes an important limitation: the documented Schedule API path cannot be used with an account that has 3-D Secure enabled. This must be clarified with Omise/Opn for the eventual account and intended recurring-card/MIT design before selection; do not infer that disabling 3DS is acceptable.
- Official retry documentation says a failed scheduled charge is retried on the next business day, up to two retries; after three consecutive failures the scheduled charge is suspended. Confirm that this remains the applicable behavior for the eventual merchant configuration and that it maps cleanly to Kinaraidee grace/failure entitlement states.

Official sources:

- Thailand pricing: https://www.omise.co/th/pricing/thailand
- Recurring payments: https://docs.omise.co/th/how-to-do-recurring-payments/thailand
- Charge Schedule API: https://docs.omise.co/th/charge-schedules-api/thailand
- Scheduled-charge retries: https://docs.omise.co/th/how-retries-work-for-scheduled-transactions/thailand

### Stripe public facts and unresolved availability conflict

- Stripe Thailand public pricing currently lists **3.65% + THB 10** per successful domestic-card charge and **1.65%** per successful PromptPay transfer.
- The same Thailand pricing page currently exposes Stripe Billing at **0.7% of Billing volume** and describes recurring/subscription tooling.
- Stripe Thailand product pages also describe recurring payments/subscriptions.
- However, the localized `en-th` Billing pricing page simultaneously surfaces **“Billing Not available in your country”** while still displaying Billing subscription features/pricing below that notice.
- Stripe support documentation for Thailand accounts confirms Thailand payment-method/currency support, but one-off payment-method availability must not be treated as recurring-method support.

Because the provider's own public pages remain internally inconsistent on Thailand Billing availability, **real-account or written provider confirmation remains mandatory before Stripe can be approved for Kinaraidee Premium**.

Official sources:

- Thailand pricing: https://stripe.com/th/pricing
- Thailand payment-method pricing: https://stripe.com/th/pricing/local-payment-methods
- Thailand payments: https://stripe.com/en-th/payments
- Thailand Billing pricing page showing the current conflict: https://stripe.com/en-th/billing/pricing
- Thailand account payment-method support: https://support.stripe.com/questions/supported-payment-methods-currencies-and-businesses-for-stripe-accounts-in-thailand

### 2C2P public facts

- Current 2C2P sandbox documentation provides a Thailand/THB demo path and explicitly distinguishes sandbox simulated transactions from production real-money transactions. Do not copy demo or production credentials into repository evidence.
- RPP (Recurring Payment Plan) documentation supports recurring schedules and maintenance operations to check, update and cancel plans.
- Current recurring-maintenance documentation uses server-to-server requests and documents JWE encryption plus JWS signing/key exchange for that interface.
- Current sandbox documentation also describes JWT-authenticated API calls, while newer documentation surfaces v4.3 endpoints. This reinforces that a new merchant should obtain 2C2P's recommended current integration/API path rather than choosing a version from old examples alone.
- Notification guidance requires verification of the signed/JWT payload before trusting transaction state.
- Public documentation confirms technical sandbox and recurring capability but does **not** establish Kinaraidee merchant approval, account-specific recurring channels or commercial fees.

Official sources:

- Sandbox setup: https://developer.2c2p.com/docs/sandbox-setup
- RPP recurring plan: https://developer.2c2p.com/docs/direct-api-rpp-recurring-payment-plan
- Recurring maintenance: https://developer.2c2p.com/docs/payment-maintenance-recurring-payment-guide
- Payment management / refunds / tokenization: https://developer.2c2p.com/docs/payment-maintenance-how-it-works

## Shortlist

### A. Omise (formerly/currently associated with Opn branding)

**Technical fit: strong candidate for Thailand-first evaluation, with recurring/3DS compatibility requiring explicit account-level clarification.**

Official documentation currently shows:

- recurring payments can be configured via dashboard or Schedule API
- webhook events exist for charges, refunds, customers and schedules
- test and live webhook endpoints are supported
- merchant systems are advised to verify charge state independently after webhook receipt
- Thailand integrations include client-side tokenization and server-side libraries
- Thailand-facing integrations list local payment methods including PromptPay alongside cards and wallets
- public Thailand standard pricing is available for common payment methods

Potential fit for Kinaraidee:

- strong Thailand/local-payment context
- recurring-card path is documented
- webhook/event model maps cleanly to the proposed `subscription_events` idempotency boundary
- test/live separation is explicit
- server-side secret-key use is compatible with Supabase Edge Functions if implemented carefully

Open items before selection:

- confirm current commercial pricing for the actual Kinaraidee business/account
- confirm which recurring methods are available for the approved Thai merchant account (do not assume every local payment method is recurring-capable)
- **resolve the documented Charge Schedule / 3-D Secure limitation for the intended account and MIT/card-on-file design**
- confirm card-on-file / MIT requirements and 3DS behavior for recurring billing
- confirm exact schedule cancellation/failure/retry semantics needed for entitlement states
- confirm settlement timing, refund/dispute terms and support SLA
- confirm any account-level feature enablement required for recurring schedules

Official sources:

- Recurring payments: https://docs.omise.co/th/how-to-do-recurring-payments/thailand
- Charge Schedule API: https://docs.omise.co/th/charge-schedules-api/thailand
- Scheduled-charge retries: https://docs.omise.co/th/how-retries-work-for-scheduled-transactions/thailand
- Webhooks: https://docs.opn.ooo/api-webhooks
- Thailand integrations: https://docs.opn.ooo/integrations/thailand
- Charges API / MIT-CIT indicator: https://docs.omise.co/charges-api/thailand
- Thailand pricing: https://www.omise.co/th/pricing/thailand

### B. Stripe

**Technical fit: very strong developer/subscription tooling, but Thailand Billing availability must be confirmed at account level before selection.**

Official Stripe pages currently show:

- Thailand Payments pricing and THB-local card pricing
- PromptPay pricing on the Thailand pricing page
- Stripe Billing / subscriptions tooling, including subscription creation and customer portal flows
- public Thailand pricing currently displays Billing at 0.7% of Billing volume
- webhook signature verification using the raw body + `Stripe-Signature` + endpoint secret
- retry/replay guidance and secure HTTPS webhook endpoint requirements

Potential fit for Kinaraidee:

- strong subscription lifecycle model
- hosted Checkout and customer portal can reduce custom billing UI/security surface
- mature webhook signature verification flow
- good developer tooling for test events and subscription state transitions
- relatively direct mapping into `subscriptions`, `subscription_events` and `member_entitlements`

Important verification item:

The localized Stripe Billing page currently surfaces **“Billing Not available in your country”** while other Thailand Stripe pricing/product pages display Billing/subscription capabilities and pricing. Because of that inconsistency, Kinaraidee must **not** treat Stripe Billing availability for the eventual Thai account as proven from public pages alone. Confirm availability in the real Thailand merchant account or directly with Stripe before provider approval.

Open items before selection:

- confirm Stripe Billing/subscriptions are enabled for the actual Thai merchant account/business type
- confirm available recurring payment methods (not merely one-off payment methods)
- confirm current Billing + Payments fees for the intended subscription model and actual account
- confirm tax/invoice/refund/dispute requirements for the business
- confirm settlement and support expectations

Official sources:

- Thailand pricing: https://stripe.com/th/pricing
- Thailand payment-method pricing: https://stripe.com/th/pricing/local-payment-methods
- Thailand payments: https://stripe.com/en-th/payments
- Thailand Billing pricing/availability-conflict page: https://stripe.com/en-th/billing/pricing
- Subscription integration: https://docs.stripe.com/billing/subscriptions/build-subscriptions
- Webhook verification: https://docs.stripe.com/webhooks
- Thailand payout information: https://support.stripe.com/questions/payout-schedule-and-currency-for-stripe-accounts-in-thailand?locale=th-TH

### C. 2C2P

**Technical fit: robust recurring-payment and Thailand/THB capability, with a heavier integration/security protocol.**

Official 2C2P documentation currently shows:

- Thailand/THB sandbox/demo capability with simulated transactions
- RPP (Recurring Payment Plan) with THB examples
- recurring plan creation with interval/count/next-charge parameters
- recurring maintenance APIs to inquire, update and cancel plans
- sandbox/demo and production endpoints
- backend payment response/notification flows to merchant systems
- JWT/JWE/JWS verification/encryption patterns across current interfaces
- transaction/refund and tokenization management APIs

Potential fit for Kinaraidee:

- explicit recurring-plan lifecycle
- strong server-to-server orientation
- clear backend notification and transaction identifiers
- THB recurring examples and regional payment infrastructure

Trade-off:

- integration is materially more complex than a simple hosted-subscription path because parts of the stack use JWT/JWE/JWS and merchant key exchange
- version/interface choice should be confirmed with 2C2P for a new merchant instead of being inferred from older examples
- this may increase implementation, key-management, testing and operational burden for the current Kinaraidee team size

Open items before selection:

- obtain actual merchant onboarding/commercial terms
- confirm recurring card/payment channel availability for the eventual account
- confirm recommended current API version/integration pattern for new merchants
- confirm retry/failure/grace semantics and reconciliation support
- confirm refund/dispute operational flow and support model
- assess whether the added cryptographic/key-management complexity is justified at current scale

Official sources:

- Sandbox setup: https://developer.2c2p.com/docs/sandbox-setup
- RPP recurring plan: https://developer.2c2p.com/docs/direct-api-rpp-recurring-payment-plan
- Recurring maintenance: https://developer.2c2p.com/docs/payment-maintenance-recurring-payment-guide
- Backend payment response: https://developer.2c2p.com/docs/api-payment-response-backend
- JWE/JWS with keys: https://developer.2c2p.com/docs/reference-jwt-with-key
- Payment management / refunds / tokenization: https://developer.2c2p.com/docs/payment-maintenance-how-it-works

## Current technical evaluation order

This is an **evaluation order, not a provider decision**:

1. **Omise** — first Thailand-fit validation candidate because recurring scheduling, webhooks and local integration are documented and closely match the current Web/PWA/Supabase shape, **subject to resolving the documented recurring Schedule/3DS compatibility question**.
2. **Stripe** — parallel validation candidate because its subscription lifecycle/customer portal/developer tooling could reduce implementation burden, subject to explicit confirmation that Billing is available for the real Thai merchant account despite conflicting localized public pages.
3. **2C2P** — strong fallback/enterprise-oriented candidate when recurring-plan and regional payment infrastructure outweigh the additional integration/key-management complexity.

Do not convert this ordering into `Payment provider: <name>` in `PAYMENT-PREMIUM-DECISION.md` until commercial/onboarding facts are obtained from the real account/provider.

## Provider validation questions to send / confirm

The same questions should be answered for each serious candidate so the comparison stays fair:

1. Can this exact Thailand business/merchant entity onboard today?
2. Can it sell a monthly digital Premium subscription in THB on the current Web/PWA distribution?
3. Which payment methods support recurring billing, specifically?
4. What are the current Payments + recurring/subscription fees for this account?
5. What settlement currency and payout schedule apply?
6. Is a sandbox/test merchant environment available before production?
7. What event/webhook or backend-notification authentication is required?
8. What event uniquely identifies duplicate delivery/idempotency?
9. How are renewal failure, retries, grace periods and final failure represented?
10. How are cancel-at-period-end and immediate cancel represented?
11. How are refund, dispute and chargeback states exposed?
12. Is there a hosted checkout/customer portal/cancel flow?
13. Are there account-level recurring/card-on-file/MIT features that require approval?
14. What support/SLA and production incident path is available?
15. What Thai tax/invoice/receipt tooling is included versus merchant responsibility?
16. For Omise/Opn specifically, how should recurring billing coexist with 3-D Secure for this account given the current Charge Schedule documentation?
17. For Stripe specifically, is Billing/subscriptions enabled for this exact Thailand account despite the conflicting localized public Billing page?
18. For 2C2P specifically, which current API/RPP integration version is recommended for a new Thailand merchant?

## Decision rule

Keep `PAYMENT-PREMIUM-DECISION.md` as **NOT APPROVED** until:

- one real provider/account path passes onboarding feasibility
- current fees and settlement terms are known
- recurring method support is confirmed for that account
- security/webhook design is reviewed
- lifecycle states can map to the Kinaraidee entitlement contract
- refund/dispute/cancellation policy is approved
- privacy/terms/payment disclosure dependencies are identified
- a real owner/approver records the decision with a timestamp

After provider selection, implementation should proceed in a separate schema/backend PR and still remain test/sandbox-only until lifecycle/security acceptance passes.
