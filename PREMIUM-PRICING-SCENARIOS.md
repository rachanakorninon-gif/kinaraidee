# Kinaraidee — Premium Pricing Scenarios / Approved Beta Price

Original scenario-model date: **2026-08-29**  
Owner price decision: **2026-09-07**

Status: **THB 59/MONTH BETA PRICE APPROVED / OTHER PRICES RETAINED AS RESEARCH ONLY / NO REVENUE EVIDENCE**

Canonical business baseline: `BUSINESS-COMMERCIAL-BASELINE.md`.

## Current owner-approved Beta price

- Premium: **THB 59/month**.
- Free trial: **none for the first Beta**.
- Card: THB 59/month with auto-renew as a **target behavior only after provider/account-specific recurring-card validation passes**.
- PromptPay: THB 59 per paid period; customer initiates payment again each period; **no auto-renew**.

The previous THB 69 / 79 / 99 values in pricing research are **not current launch prices**. They may be reused later as willingness-to-pay or packaging experiment anchors only if a new experiment is deliberately approved.

## Time-bounded payment-fee references

Official Stripe Thailand public pricing checked 2026-09-07:
- domestic cards: **3.65% + THB 10 per successful transaction**
- PromptPay: **1.65% per successful transfer**

References:
- https://stripe.com/th/pricing
- https://stripe.com/th/pricing/local-payment-methods

Provider fees are public planning references, not merchant settlement evidence. Recheck immediately before Production acceptance.

## THB 59 unit-economics illustration

These calculations are scenarios only and exclude refunds, disputes, tax/accounting effects, hosting, support, legal, fraud, development, advertising, partner costs, and all other operating costs.

### Domestic-card illustration

`THB 59 × 3.65% + THB 10 = THB 12.1535` processing reference.

Approximate remainder before other costs:

`THB 59 - THB 12.1535 = THB 46.8465`.

The fixed THB 10 component makes a THB 59 card charge relatively fee-sensitive. This is an economics observation, not a reason to change the owner-approved Beta price without Production demand/retention evidence.

### PromptPay illustration

`THB 59 × 1.65% = THB 0.9735` processing reference.

Approximate remainder before other costs:

`THB 59 - THB 0.9735 = THB 58.0265`.

PromptPay has lower public processing cost in this illustration but is customer-initiated and non-recurring. Lower fee does not make it equivalent to an automatic monthly subscription.

## Historical price research

Earlier scenario work considered THB 49 / 59 / 69 / 79 / 99 and used THB 69 / 79 / 99 as research anchors to explore willingness-to-pay and campaign economics. That work remains useful only as historical sensitivity analysis.

It is superseded for the first Beta launch decision by the approved **THB 59/month** baseline.

Future price changes should use Production evidence such as:
- activated-user → Premium-interest behavior
- checkout completion
- paid conversion
- renewal/retention
- refund/dispute rate
- contribution margin
- paid acquisition CAC
- qualitative value perception

Do not change price merely because a higher scenario has better spreadsheet margin.

## LTV / CAC rule

Use contribution economics, not gross price:

`Contribution LTV = collected revenue - payment fees - refunds/chargebacks - variable Premium cost - support/operational variable cost - relevant tax/accounting effects`

Then evaluate paid acquisition with a safety margin rather than assuming the whole THB 59 is available for CAC.

Until real retention exists, LTV is **UNKNOWN**. Until real paid acquisition and real paid customers exist, CAC is **UNKNOWN**.

## 3,000-member / prize-campaign boundary

Any previous 3,000-member/iPhone scenario remains **campaign modeling only**. The Business baseline approval on 2026-09-07 did not launch or legally approve that campaign.

Do not infer from this pricing decision that:
- 3,000 Premium members exist
- prize eligibility is open
- a prize has been procured
- campaign tax/legal treatment is approved
- any user has paid
- revenue, MRR, conversion, retention, LTV or CAC has been achieved

## Decision boundary

Approved:
- THB 59/month Beta price
- no Free Trial
- card-vs-PromptPay billing proposition direction

Still evidence-gated:
- provider/account recurring-card implementation
- Production payment acceptance
- exact fees/settlement on the real merchant account
- user willingness to pay
- retention/LTV
- CAC
- revenue
- campaign economics/execution

Commercial GO remains governed by `PAYMENT-PREMIUM-DECISION.md`, `PRODUCTION-PRIVACY-LEGAL-DECISION.md`, QA/security/release gates, and real provider-backed evidence.
