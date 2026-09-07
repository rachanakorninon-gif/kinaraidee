# Kinaraidee — Commercial Cost Model v1

Model date: **2026-09-07**

Status: **PLANNING MODEL / OWNER-APPROVED THB 59 PRICE / ACTUAL COSTS & REVENUE NOT ESTABLISHED / COMMERCIAL NO-GO**

Canonical baseline: `BUSINESS-COMMERCIAL-BASELINE.md`.

## 1. Purpose

Provide a transparent unit-economics and cost framework for the first Web/PWA Premium Beta without mixing hypothetical scenarios with real Production results.

This model is not an accounting statement, tax conclusion, merchant quote, ad-budget approval, revenue forecast, or Commercial GO.

## 2. Approved commercial input

- Premium Beta price: **THB 59/month**
- Free Trial: none in first Beta
- Card: auto-renew target only after provider/account-specific validation
- PromptPay: customer-initiated THB 59 per paid period, no auto-renew
- First provider baseline: Stripe Payments

## 3. Time-bounded public payment-fee references

Checked against public Stripe Thailand pages on 2026-09-07:

- domestic card: **3.65% + THB 10 per successful transaction**
- PromptPay: **1.65% per successful transfer**

References:
- https://stripe.com/th/pricing
- https://stripe.com/th/pricing/local-payment-methods

These are public planning references. The actual merchant account, settlement statement, taxes on provider fees, special pricing, refunds, disputes, international cards, FX, or future provider changes may produce different real costs. Recheck before Production acceptance.

## 4. Unit economics at THB 59 — fee-only illustration

### Domestic card

Formula:

`processing fee = 59 × 3.65% + 10`

Result:

- percentage portion = **THB 2.1535**
- fixed portion = **THB 10.0000**
- illustrated processing fee = **THB 12.1535**
- remainder before every other cost = **THB 46.8465**
- illustrated processing share of price ≈ **20.60%**

### PromptPay

Formula:

`processing fee = 59 × 1.65%`

Result:

- illustrated processing fee = **THB 0.9735**
- remainder before every other cost = **THB 58.0265**
- illustrated processing share of price = **1.65%**

The lower PromptPay fee does not make PromptPay equivalent to auto-renew. The approved PromptPay experience requires user-initiated payment each paid period.

## 5. Blended payment-method scenario

If both payment methods are offered, actual payment cost depends on the real mix.

Planning formula:

`blended fee per successful paid period = card_share × 12.1535 + promptpay_share × 0.9735`

where `card_share + promptpay_share = 1` for this simplified two-method model.

Illustrative scenarios:

| Card share | PromptPay share | Blended fee / paid period | Remainder before other costs |
|---:|---:|---:|---:|
| 100% | 0% | THB 12.1535 | THB 46.8465 |
| 75% | 25% | THB 9.3585 | THB 49.6415 |
| 50% | 50% | THB 6.5635 | THB 52.4365 |
| 25% | 75% | THB 3.7685 | THB 55.2315 |
| 0% | 100% | THB 0.9735 | THB 58.0265 |

These scenarios exclude the behavioral effect that PromptPay users must return and pay again each period. Lower transaction fees may be offset by lower repurchase/retention; only Production data can answer that.

## 6. Cost taxonomy

Do not call `THB 59 - payment fee` net profit. A real contribution model must include all relevant costs.

### Variable / usage-linked costs

Potential categories:

- payment processing
- refunds/chargebacks/dispute fees where applicable
- email/OTP/message delivery
- database/storage/egress
- Edge Functions/server/API usage
- maps/location/provider API usage
- analytics/event ingestion
- fraud/abuse controls
- customer support workload or outsourced support
- partner/affiliate payout or revenue-share cost where applicable
- taxes/accounting effects that belong in the selected business definition

### Fixed / semi-fixed costs

Potential categories:

- Supabase plan/base fee if upgraded
- domain/hosting/CDN paid tiers
- monitoring/alerting tools
- legal/privacy/accounting review
- business registration/compliance costs if later applicable
- creative tooling/software subscriptions
- developer/store accounts only if native distribution is later chosen
- administrative/operations overhead

Actual current values for these categories must be populated from invoices/provider dashboards before using the model for a financial decision.

## 7. Contribution definitions

Recommended reporting layers:

### Gross collected revenue

`sum of successful Production payments actually collected`

Do not use Premium page views, checkout starts, Test Mode charges, mock records, or failed payments.

### Payment-net revenue view

`gross collected revenue - actual payment processing fees - actual refunds`

This is still not operating profit.

### Contribution before fixed costs

`gross collected revenue - payment fees - refunds/chargebacks - variable Premium/service costs - other approved variable costs`

### Operating result

Requires contribution minus applicable fixed/semi-fixed operating costs plus the final accounting/tax treatment. This document does not define statutory accounting profit.

## 8. Break-even illustrations

Using the **card-only public-fee illustration** of THB 46.8465 remainder per successful paid period before other variable costs:

| Monthly fixed-cost scenario | Paid periods required just to cover that fixed cost* |
|---:|---:|
| THB 1,000 | ~22 |
| THB 3,000 | ~65 |
| THB 5,000 | ~107 |
| THB 10,000 | ~214 |
| THB 20,000 | ~427 |

`* ceiling(fixed cost / 46.8465)` and still excludes all other variable costs, refunds, taxes, support, failed payments, acquisition spend, and churn.

Using PromptPay-only fee math would reduce payment processing but would not prove the same renewal rate, so do not compare break-even counts without retention behavior.

## 9. LTV model

Until real retention exists, LTV is **UNKNOWN**.

Planning formula:

`Contribution LTV = sum of collected paid-period contribution over the customer's observed paid lifetime`

For a simplified stable monthly contribution assumption:

`Contribution LTV ≈ contribution per paid month × average paid lifetime months`

Card-fee-only illustration, before all other variable costs:

| Assumed paid lifetime | Fee-only remainder illustration |
|---:|---:|
| 1 month | THB 46.85 |
| 3 months | THB 140.54 |
| 6 months | THB 281.08 |
| 12 months | THB 562.16 |

These values are not forecasts and should not be used to approve ad spend as if retention were proven.

## 10. CAC model

After real paid acquisition launches:

`CAC = attributable acquisition spend / number of real new paid customers under the declared attribution rule`

Example structure only:

- ad spend = THB X
- clicks = informational
- activated users = product metric
- checkout starts = intent metric
- successful paid customers = CAC denominator

Never divide by clicks or signups and label the result `Paid CAC`.

### Scale safety

A future scale rule may compare contribution LTV with CAC and require a safety margin. A common planning heuristic such as LTV:CAC ≥ 3:1 may be used as an experiment threshold only after both values are based on sufficiently trustworthy real data; it is not a guaranteed business rule.

## 11. Organic vs paid acquisition

The first Beta should identify the acquisition mix:

- direct/organic
- referral
- community/social organic
- paid social when authorized
- other attributable channels

Organic users are not literally cost-free: product, support, content, community and referral operations can still have costs. If material, include them in the chosen acquisition-cost definition.

## 12. Restaurant / affiliate economics

Keep restaurant economics separate from Premium subscription economics.

Affiliate revenue sequence:

`restaurant click`
→ `tracked action`
→ `confirmed conversion`
→ `approved commission`
→ `paid/receivable commission under agreed accounting rule`

Do not count clicks as affiliate revenue.

Future model fields should include:

- provider/restaurant
- commission basis
- confirmed conversion value
- cancellation/refund adjustment
- fraud/duplicate adjustment
- payment/settlement date
- reconciliation status

No current partner or commission should be entered without real agreement/evidence.

## 13. Cost inputs still required before a real business forecast

Populate from actual sources when available:

| Cost / metric | Current status |
|---|---|
| Stripe real merchant fee/settlement | PENDING actual account evidence |
| Supabase monthly cost | ACTUAL VALUE NOT RECORDED IN THIS MODEL |
| Hosting/CDN/domain | ACTUAL VALUE NOT RECORDED IN THIS MODEL |
| Email/OTP | ACTUAL VALUE NOT RECORDED IN THIS MODEL |
| Maps/location API | ACTUAL VALUE NOT RECORDED IN THIS MODEL |
| Monitoring | ACTUAL VALUE NOT RECORDED IN THIS MODEL |
| Legal/accounting | ACTUAL VALUE NOT RECORDED IN THIS MODEL |
| Support cost | NOT ESTABLISHED |
| Refund/dispute rate | NOT ESTABLISHED |
| Paid conversion | NOT ESTABLISHED |
| Renewal/retention | NOT ESTABLISHED |
| CAC | NOT ESTABLISHED |
| LTV | NOT ESTABLISHED |
| Affiliate revenue | NOT ESTABLISHED |
| Premium revenue | NOT ESTABLISHED |

`NOT RECORDED` means the model has not been given a validated actual value; it must not be silently interpreted as zero.

## 14. Decision rules

Before increasing paid acquisition materially:

- Product/core flow stable
- Tracking trustworthy
- Payment/entitlement lifecycle passed
- Legal/Support/Security ready
- real activation/retention observed
- contribution economics calculated from actual costs rather than only public fee assumptions
- CAC target derived from real retention/contribution evidence with safety margin

If any critical input is unknown, keep the decision `CONTINUE LEARNING` rather than `SCALE`.

## 15. Evidence boundary

Current approved facts:

- THB 59 Beta business price
- card/PromptPay payment proposition direction
- public provider fee references as of the stated date

Not established by this model:

- merchant settlement cost
- Production payments
- subscribers
- MRR/revenue
- refunds/disputes
- retention/LTV
- CAC
- partner/affiliate income
- tax/accounting treatment
- profitability
- Commercial GO

Update this file from real evidence only when the source and time period can be traced.
