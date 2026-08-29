# Kinaraidee — Premium Pricing & 3,000-Member Campaign Scenarios

Research/model date: **2026-08-29**

Status: **SCENARIO MODEL ONLY / PRICE NOT APPROVED / PROVIDER NOT SELECTED**

This document estimates first-month campaign economics for planning. It does not set the real Premium price, approve a payment provider, predict conversion, prove subscriber counts, authorize ad spend, or open prize entries.

## Current public inputs used

### Prize reference

Apple Thailand currently lists **iPhone 17 Pro Max 256GB at THB 48,900**.

Source:
- https://www.apple.com/th/shop/buy-iphone/iphone-17-pro/
- https://www.apple.com/th/newsroom/2025/09/apple-unveils-iphone-17-pro-and-iphone-17-pro-max-the-most-powerful-and-advanced-pro-models-ever/

### Tax sensitivity reserve

The current Thai legal preflight records a Revenue Department **5% prize withholding-tax signal** for prize/sweepstakes categories. The actual organizer/winner cash handling and taxable basis must be confirmed for the final campaign.

For a conservative sensitivity model only:
- prize reference value: THB 48,900
- 5% of reference value: THB 2,445
- conservative `prize + possible organizer-funded withholding reserve`: **THB 51,345**

This THB 51,345 figure is **not** a tax conclusion. If the approved tax treatment allocates withholding differently, the economics must be recalculated.

### Payment-fee illustrations

**Omise public example (Thailand):** 3.65% transaction fee, plus 7% VAT on the fee. The resulting illustrative effective deduction on the charge amount is approximately **3.9055%** before any account-specific terms or other costs.

Source:
- https://docs.omise.co/how-much-does-omise-cost

**Stripe Thailand public standard domestic-card price:** 3.65% + THB 10 per successful domestic-card transaction.

Source:
- https://stripe.com/th/pricing

Important:
- these are public reference prices, not merchant quotes
- Stripe Billing/subscription fees, if applicable to the actual Thai account, are not included here
- 2C2P is not modeled because an account-specific comparable public fee was not established in the shortlist research
- recurring-card/account-specific terms must be confirmed before provider selection

## First-month scenario at exactly 3,000 paying members

Assumptions:
- all 3,000 users pay the same monthly price once
- no refunds/chargebacks/payment failures
- domestic-card fee illustration only
- one prize reserve of THB 51,345
- no ad spend yet
- no corporate/income/VAT/accounting effects except the stated Omise fee-VAT illustration
- no hosting, support, legal, license, fulfillment, fraud, app-store, development or other operating costs

| Premium / month | Gross revenue | Omise-style processing | Net after processing + THB 51,345 prize reserve | Theoretical CAC headroom / member* | Stripe-card processing | Net after processing + THB 51,345 prize reserve | Theoretical CAC headroom / member* |
|---:|---:|---:|---:|---:|---:|---:|---:|
| THB 49 | 147,000 | ~5,741 | ~89,914 | ~29.97 | ~35,366 | ~60,290 | ~20.10 |
| THB 59 | 177,000 | ~6,913 | ~118,742 | ~39.58 | ~36,461 | ~89,195 | ~29.73 |
| THB 69 | 207,000 | ~8,084 | ~147,571 | ~49.19 | ~37,556 | ~118,100 | ~39.37 |
| THB 79 | 237,000 | ~9,256 | ~176,399 | ~58.80 | ~38,651 | ~147,005 | ~49.00 |
| THB 99 | 297,000 | ~11,599 | ~234,056 | ~78.02 | ~40,841 | ~204,815 | ~68.27 |

\* `Theoretical CAC headroom / member` = remaining first-month amount divided by 3,000 after only the illustrated processing fee and conservative prize reserve. It is **not** a recommended ad CAC because all other business costs are still excluded.

## What the table says

### THB 49

Very price-accessible, but first-month economics are tight once a per-transaction fixed fee exists. Under the Stripe domestic-card illustration, THB 10 alone is more than 20% of a THB 49 charge before the percentage fee.

This price could still work if:
- retention is strong enough that lifetime value comes from multiple months
- payment costs are lower than the Stripe-card illustration
- organic acquisition is high
- Premium operating/support costs stay low

It is not the safest price for a paid-acquisition launch tied to a THB 48,900 prize.

### THB 59

Improves headroom but remains sensitive to paid acquisition and fixed transaction fees. It may be useful as a low-price demand test, but should not be selected from campaign math alone.

### THB 69

A plausible **lower test band**. At 3,000 first-month payments, the conservative prize reserve consumes roughly 24.8% of gross revenue before ads/operations. Under the Omise public-fee illustration, about THB 49/member remains for every other first-month cost; under the Stripe domestic-card illustration, about THB 39/member remains.

### THB 79

A plausible **middle test band** with more room for paid acquisition. The conservative prize reserve is roughly 21.7% of first-month gross revenue. Illustrative remaining first-month headroom is about THB 59/member (Omise-style) or THB 49/member (Stripe domestic-card) before all other costs.

### THB 99

Produces the strongest campaign economics among the modeled values, but product-value willingness-to-pay may become the dominant risk. A higher price is not automatically better if conversion or retention falls materially.

## Current planning recommendation

For **pricing research only**, prioritize testing the user-value proposition around:

- **THB 69/month** — lower test anchor
- **THB 79/month** — primary economics test anchor
- **THB 99/month** — upper willingness-to-pay / feature-bundle anchor

Do **not** publish these as real prices yet.

Why THB 79 is a useful center scenario:
- materially better first-month CAC headroom than THB 49–59
- stays below the psychological THB 100/month level
- prize cost is not an overwhelming share of first-month gross at 3,000 members
- leaves room to learn whether Premium benefits can justify the price before locking the product into a low-price ceiling

This is a business-model hypothesis, not a validated willingness-to-pay result.

## Retention changes the campaign economics

The iPhone is a one-time campaign acquisition cost, while Premium revenue is recurring. If a real subscriber stays for multiple paid months, prize cost per paid month falls sharply.

For example, before processor/other costs and assuming all 3,000 members stayed:

| Price | 1 month gross | 3 months gross | 6 months gross | Prize reference / 6-month gross |
|---:|---:|---:|---:|---:|
| THB 69 | 207,000 | 621,000 | 1,242,000 | ~3.9% |
| THB 79 | 237,000 | 711,000 | 1,422,000 | ~3.4% |
| THB 99 | 297,000 | 891,000 | 1,782,000 | ~2.7% |

These are not forecasts. Real churn means fewer than 3,000 may remain after month one.

## Break-even logic for future ad planning

Before approving an ad budget, the model should use:

`Contribution LTV = collected subscription revenue - payment fees - refunds/chargebacks - variable Premium cost - support/operational variable cost - tax effects`

Then:

`Allowable CAC < Contribution LTV - allocated campaign prize/legal/fulfillment cost - safety margin`

Do not set CAC from gross subscription price alone.

### First-month safety check

If management wants the campaign to be approximately first-month contribution-positive before fixed business costs, ad CAC must be **well below** the theoretical headroom in the table, not equal to it.

A practical launch model should reserve additional margin for:
- failed/declined payments
- refunds/chargebacks
- legal/license/accounting costs
- prize shipping/fulfillment
- customer support
- hosting/backend/API usage
- fraud/abuse
- creative/media testing losses
- taxes and bookkeeping

## Feature-value gate before choosing price

Price should be approved only after Free vs Premium benefits are decided. Users must be able to understand what recurring value they receive beyond the chance-based campaign.

At minimum, the product decision should test whether Premium can credibly bundle recurring value such as:
- richer preference/personalization memory
- enhanced history/favorites insights
- advanced group-planning features
- convenience/priority features
- future Premium-specific personalization or partner benefits

The prize must not become the only reason to subscribe, because the business needs retention after the campaign ends.

## Recommended validation sequence

1. Finalize a proposed Free/Premium feature split.
2. User-test the value proposition at THB 69 / 79 / 99 without charging money.
3. Validate provider-specific real fees and recurring availability.
4. Estimate organic vs paid acquisition mix and realistic CAC.
5. Estimate 1-, 3- and 6-month retention scenarios.
6. Add refund/chargeback/support/backend/legal/tax assumptions.
7. Approve one real price in `PAYMENT-PREMIUM-DECISION.md` only after those inputs are reviewed.
8. Run provider sandbox lifecycle tests before any real-money acceptance.

## Boundary

Nothing in this model means:
- 3,000 Premium members exist
- users will pay these prices
- the campaign is licensed/approved
- a provider/merchant account is ready
- the prize tax treatment is finalized
- a payment has occurred
- revenue, MRR, conversion or CAC has been achieved

The public campaign remains PRE-LAUNCH, `entries_open=false`, and `eligible_count=0` until the explicit launch gates pass.
