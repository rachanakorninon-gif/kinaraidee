# Kinaraidee — First Paid Acquisition Test Plan

Status: **TEST DESIGN ONLY / BUDGET UNSET / NO SPEND AUTHORIZED**

Purpose: define the first small paid-media experiment before any billing or campaign launch is approved.

## Hard boundary

- Budget: **UNSET**
- Start date: **UNSET**
- Media account/billing approval: **NOT RECORDED HERE**
- Paid acquisition status: **NOT LAUNCHED**
- Premium conversion objective: **NOT AVAILABLE YET**
- Prize-entry objective: **BLOCKED / NOT LIVE**

This document never authorizes spend by itself.

## Phase 1 objective

Answer one question first:

> Which product-value message most efficiently gets a new visitor to experience a real recommendation result?

Do not optimize the first test around giveaway interest, Premium checkout or account signup alone.

## Initial test cells

| Cell | Creative | Primary hypothesis | Destination |
|---|---|---|---|
| A | C001 — วันนี้กินอะไรดี? | direct meal-decision pain is strongest | root app |
| B | C002 — อะไรก็ได้... | social decision friction improves attention | root app |
| C | C003 — product demo | showing `ไม่รู้เลย` directly improves qualified action | root app |
| D | C004 — budget utility | budget framing attracts useful intent | root app |

All cells should use equivalent destination quality and truthful current CTA.

## Platforms

Prepare for:
- TikTok
- Meta Reels
- YouTube Shorts

Do not assume all three must launch simultaneously. Platform selection, billing and budget require separate approval.

## Allocation rule

If a budget is later approved, start with a balanced exploratory allocation across active cells unless platform minimums or delivery constraints require otherwise.

Do not hard-code currency or amount before approval.

## Measurement requirement

Before optimization decisions rely on first-party product behavior, the approved measurement implementation must be deployed and privacy-reviewed.

Until then:
- platform impressions/clicks can be observed in platform reporting
- internal recommendation-result conversion must be `NOT MEASURED` unless a verified first-party source exists
- do not write zero for an unmeasured event

## KPI ladder

### Media diagnostics
- impressions
- reach
- spend
- CPM
- video-view metric according to platform definition
- link clicks
- CTR
- CPC

### Qualified product outcome
Preferred first-party metric when implemented:
- recommendation result reached

Supporting metrics:
- Surprise tap
- guided-choice start
- nearby-restaurant tap

### Later outcomes
Only after the relevant product/backend gates exist:
- account signup completed
- Premium entitlement active
- renewal
- campaign eligibility

## Winner rule

Do **not** select a winner from CTR alone.

Preferred decision order when trustworthy data exists:
1. cost per recommendation result
2. recommendation-result rate from landing sessions
3. quality/support signal (errors, bounce, misleading comments)
4. CTR/CPC as diagnostics

If only platform click data exists, label the result `MEDIA-ONLY / PRODUCT WINNER NOT DETERMINED`.

## Minimum interpretation safeguards

- High CTR + poor downstream use = not a product-value winner.
- Low CPM = not automatically better acquisition.
- Account created = not Premium.
- Checkout started = not payment success.
- Premium entitlement = not automatically prize eligibility.
- Interview willingness = not conversion.

## Creative stop conditions

Pause/remove a creative from the test if it:
- materially misrepresents current product behavior
- generates repeated confusion about App Store / Google Play availability
- implies Premium or prize entry is live when it is not
- has broken destination/link behavior
- has an accessibility/readability defect that materially blocks the message
- violates platform policy

Operational budget stop-loss thresholds remain **UNSET** until a real budget is approved.

## Technical preflight before launch

- [ ] root app destination returns successfully on mobile
- [ ] no public ad uses a specific group invitation room URL
- [ ] 9:16 creative preview checked on selected platform
- [ ] safe zones checked
- [ ] CTA is truthful for Web/PWA state
- [ ] no app-store badge unless actual listing is verified
- [ ] no live Premium/prize claim
- [ ] UTM naming reviewed
- [ ] measurement/privacy basis approved if first-party attribution is enabled
- [ ] support owner identified for campaign traffic
- [ ] budget/account/billing approval recorded separately

## Test result template

When a real test runs, record only observed values:

| Field | Value |
|---|---|
| Test date range | UNSET |
| Platforms | UNSET |
| Approved budget | UNSET |
| Spend | NOT RUN |
| Creative cells | A/B/C/D prepared |
| Impressions | NOT RUN |
| Clicks | NOT RUN |
| Recommendation results | NOT MEASURED / NOT RUN |
| Decision | NOT RUN |

Replace `NOT RUN` / `NOT MEASURED` only with traceable data from the appropriate source.

## Phase 2

Only after Phase 1 produces reliable product-value evidence should later tests consider:
- account-value messaging
- Premium value proposition after product/payment readiness
- prize-led incremental-lift test only after legal/payment/campaign GO

Keep a non-prize product-value control so giveaway-driven lift can be separated from genuine product demand.
