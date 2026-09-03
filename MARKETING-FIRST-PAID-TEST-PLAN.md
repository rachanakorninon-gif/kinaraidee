# Kinaraidee — First Paid Acquisition Test Plan

Status: **TEST DESIGN ONLY / ACCOUNT ATTRIBUTION DEPLOYED / BUDGET UNSET / NO SPEND AUTHORIZED**

Purpose: define the first small paid-media experiment before any billing or campaign launch is approved.

## Hard boundary

- Budget: **UNSET**
- Start date: **UNSET**
- Media account/billing approval: **NOT RECORDED HERE**
- Paid acquisition status: **NOT LAUNCHED**
- Premium conversion objective: **NOT AVAILABLE YET**
- Prize-entry objective: **BLOCKED / NOT LIVE**

This document never authorizes spend by itself.

## Measurement status — 2026-09-04

First-party account acquisition measurement is deployed and can observe:

- tagged signup by `utm_source`, `utm_campaign`, `utm_content`
- confirmed account
- attribution coverage
- referral signup / confirmed referral

Owner view:

`https://rachanakorninon-gif.github.io/kinaraidee/acquisition-dashboard.html`

The following preferred product events are still **NOT MEASURED** by the Acquisition KPI dashboard:

- landing session
- Surprise / `ไม่รู้เลย` tap
- guided-choice start
- recommendation result reached
- nearby-restaurant tap

Platform impressions/clicks/spend remain external platform truth until a reviewed ingestion/source exists. Do not write zero for an unavailable event.

## Phase 0 — organic baseline first

Before spending, execute `MARKETING-FIRST-100-ORGANIC-TEST.md` far enough to prove genuine tagged signup attribution and obtain an initial source/creative baseline.

Organic completion does not authorize paid media. Budget/account/billing approval remains separate.

## Phase 1 objective

Answer one question first:

> Which truthful core-product message most efficiently attracts useful users and produces downstream evidence we can actually measure?

Because recommendation-result events are not yet instrumented, the first paid run must distinguish:

- **media diagnostics** from platform reporting
- **observed account acquisition** from the first-party dashboard
- **product-result conversion = NOT MEASURED** until a verified product-event source exists

Do not optimize around giveaway interest, Premium checkout or prize entry.

## Initial test cells

| Cell | Creative | Primary hypothesis | Destination |
|---|---|---|---|
| A | C001 — วันนี้กินอะไรดี? | direct meal-decision pain is strongest | root app |
| B | C002 — อะไรก็ได้... | social decision friction improves attention | root app |
| C | C003 — product demo | showing `ไม่รู้เลย` directly improves useful acquisition | root app |
| D | C004 — budget utility | budget framing attracts useful intent | root app |

All cells should use equivalent destination quality and truthful current CTA.

Suggested paid campaign slug after paid GO:

`th_acq_core_test_202609`

Use `utm_medium=paid_social` only for traffic that is actually paid. Do not re-label organic posts as paid or vice versa.

Generate URLs through `tools/marketing-url-builder.mjs`.

## Platforms

Prepare for:
- TikTok
- Meta Reels
- YouTube Shorts

Do not assume all three must launch simultaneously. Platform selection, billing and budget require separate approval.

## Allocation rule

If a budget is later approved, start with a balanced exploratory allocation across active cells unless platform minimums or delivery constraints require otherwise.

Do not hard-code currency or amount before approval.

## KPI ladder

### Media diagnostics — external platform source
- impressions
- reach
- spend
- CPM
- video-view metric according to platform definition
- link clicks
- CTR
- CPC

### Product outcome — desired but not yet first-party measured
- recommendation result reached
- Surprise tap
- guided-choice start
- nearby-restaurant tap

Until implemented, label these `NOT MEASURED`; do not infer them from signup or clicks.

### Account acquisition — first-party measured now
- signup completed
- confirmed account
- signup confirmation rate
- attribution coverage
- confirmed accounts by source/campaign/content
- referral signup / confirmed referral

### Later outcomes
Only after the relevant product/backend gates exist:
- Premium entitlement active
- renewal
- campaign eligibility

## Winner rule

Do **not** select a product winner from CTR alone.

While product-result events remain unmeasured, use two separate labels:

1. **MEDIA LEADER** — based on real platform diagnostics such as CTR/CPC
2. **ACCOUNT-ACQUISITION LEADER** — based on observed confirmed accounts and, once spend is reconciled, cost per confirmed account

Do not call either one a **product-result winner** until recommendation-result behavior is actually measured.

When trustworthy product-event data later exists, preferred decision order becomes:
1. cost per recommendation result
2. recommendation-result rate from landing sessions
3. quality/support signal (errors, bounce, misleading comments)
4. account confirmation / downstream value
5. CTR/CPC as diagnostics

## Minimum interpretation safeguards

- High CTR + poor downstream account signal = not automatically useful acquisition.
- Low CPM = not automatically better acquisition.
- Signup = not proof a recommendation result was reached.
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
- causes attribution to fail for genuine tagged signup
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
- [ ] UTM naming generated/reviewed with `tools/marketing-url-builder.mjs`
- [ ] genuine tagged signup attribution has been proven in production
- [ ] Acquisition KPI dashboard is accessible to the Owner and returns observed data
- [ ] recommendation-result event is explicitly `NOT MEASURED` unless newly instrumented/verified
- [ ] support owner identified for paid traffic
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
| Signups | NOT RUN |
| Confirmed accounts | NOT RUN |
| Attribution coverage | NOT RUN |
| Recommendation results | NOT MEASURED |
| Decision | NOT RUN |

Replace `NOT RUN` / `NOT MEASURED` only with traceable data from the appropriate source.

## Phase 2

Only after Phase 1 produces reliable product/account evidence should later tests consider:
- account-value messaging
- product-event instrumentation for recommendation-result optimization
- Premium value proposition after product/payment readiness
- prize-led incremental-lift test only after legal/payment/campaign GO

Keep a non-prize product-value control so giveaway-driven lift can be separated from genuine product demand.
