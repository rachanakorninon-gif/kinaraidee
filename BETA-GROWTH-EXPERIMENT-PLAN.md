# Kinaraidee — Beta Growth Experiment Plan v1

Status: **PLANNING READY / RECRUITMENT & PAID ACQUISITION GATED / NO REAL GROWTH RESULT ESTABLISHED**

Canonical business baseline: `BUSINESS-COMMERCIAL-BASELINE.md`  
Public Beta sequencing: `BETA-30-DAY-PLAN.md`  
Monetization: `MONETIZATION-PLAN.md`  
Premium measurement: `PREMIUM-EVENT-MEASUREMENT-SPEC.md`

## 1. Purpose

Define the order of Growth experiments so Kinaraidee learns whether the product creates real meal-decision value before spending materially on acquisition.

This plan does **not** open the recruitment gate, invite testers, launch an ad campaign, spend money, create users, or establish conversion/retention/revenue.

## 2. Gate hierarchy

Do not skip gates because a later experiment is more exciting.

### Before any tester recruitment

Follow the canonical Public Beta/recruitment gate. If the repository still says recruitment is not open, this document remains planning only.

### Before expanding organic traffic

Require evidence that:
- core flow is usable for the intended cohort
- Blocker/Critical defect status is supported by release-scoped evidence
- tracking for the experiment is trustworthy enough for its metric
- support/feedback path is operational

### Before paid acquisition

Require at minimum:
- Product/core flow stable enough for external traffic
- Tracking PASS for the funnel being optimized
- critical Legal/Privacy/Support/Security disclosures appropriate for the landing/product experience
- Payment PASS as well if the paid campaign promotes/optimizes Premium purchase
- real organic/controlled Beta behavior sufficient to define what an activated user is

Paid Acquisition stays **NO-GO** when the funnel is broken or measurement is untrusted.

## 3. Experiment framework

Every experiment record should declare before launch:

- Experiment ID
- hypothesis
- target cohort
- exact version/runtime
- acquisition source
- primary metric
- secondary guardrail metrics
- start/stop condition
- expected duration/sample approach
- evidence source
- result
- decision: `STOP`, `CONTINUE`, `CHANGE`, or `SCALE`

Do not change the success metric after seeing results without recording that change as a new experiment.

## 4. E1 — First-use comprehension / Activation

### Hypothesis

A new user can understand what Kinaraidee does and reach a useful recommendation without needing personal instruction.

### Experience

`Home`
→ choose a guided path or `ไม่รู้เลย`
→ recommendation generated
→ Result visible

### Primary metric

`Activation Rate = unique new users who reach a valid recommendation / eligible new users entering the measured flow`

The denominator must be fixed by the implemented measurement definition before reporting.

### Qualitative evidence

Ask/observe:
- what did the user think the app was for?
- where did they hesitate?
- could they reach a result without explanation?
- did the recommendation help a real meal decision?

### Decision

Fix comprehension/core-flow failures before increasing traffic.

## 5. E2 — `ไม่รู้เลย` real-value test

### Hypothesis

The `ไม่รู้เลย` experience solves a real “I cannot decide what to eat” moment rather than functioning only as entertainment/randomization.

### Primary evidence

- real `ไม่รู้เลย` usage in a controlled cohort
- user states whether the recommendation influenced the actual meal decision
- repeat usage in later meal-decision moments

### Guardrail

Do not infer value from button clicks alone. A click proves interaction, not that the user chose/evaluated the food positively.

## 6. E3 — Result usefulness

### Hypothesis

The recommendation result is actionable enough that users accept it or take a relevant next action instead of repeatedly rerolling because the recommendation is unsuitable.

### Candidate signals

- accept/“กินอันนี้” action where measured
- Favorites
- restaurant/nearby action
- reroll/try-again
- qualitative reason for rejecting the result

Reroll is ambiguous: it can mean poor relevance or playful exploration. Combine behavior with qualitative evidence.

## 7. E4 — Repeat usage / Retention

### Hypothesis

Kinaraidee becomes useful across multiple meal occasions.

### Metrics when trustworthy

- Repeat Recommendation Rate
- D1 / D7 / D30 retention under a declared cohort definition
- recommendations per activated user over a declared period

For this product, D7/meal-occasion repeat behavior may be more informative than assuming daily use is mandatory.

Do not call an absent D30 metric `0%` before the cohort has had 30 days to mature.

## 8. E5 — Premium proposition comprehension

### Hypothesis

Users understand why Premium at THB 59/month is better without believing the core Free product has been intentionally crippled.

Approved proposition direction:

- “กินอะไรดีรู้จักคุณมากขึ้น”
- enhanced personalization
- expanded/richer Favorites/History
- advanced capabilities that actually exist
- future ad-free benefit only when applicable

### Funnel

`premium_offer_view`
→ `premium_cta_click`
→ `checkout_start`

### Interpretation

Premium page interaction measures interest/intent, not willingness-to-pay proof.

## 9. E6 — Willingness to pay

Only after real payment gates permit controlled acceptance.

### Strong evidence

`provider-backed successful payment`
+ `backend-authoritative premium_activated`
= a real paid customer for the reporting definition

Survey answers such as “59 บาทโอเค” are useful research but not paid conversion.

### Metrics

- offer → checkout rate
- checkout → paid rate
- Free/activated → paid conversion under a fixed denominator
- payment failure/action-required rate
- refund/dispute rate

## 10. E7 — Premium retention / renewal

Only after paid users exist and cohorts mature.

### Card

If auto-renew is actually validated/enabled:
- renewal due
- successful renewal
- action-required
- failed renewal
- cancellation before renewal

### PromptPay

Measure next-period customer-initiated repurchase separately. Do not label it automatic renewal.

### Business question

Does paid lifetime/contribution support the acquisition cost required to grow?

Do not estimate LTV from one billing period and present it as established.

## 11. E8 — Referral quality

### Hypothesis

Users who receive a recommendation they value are willing to introduce the product to another person who also activates.

### Initial design

Start with non-cash/simple referral mechanics before introducing financial rewards unless a separate incentive experiment is approved.

### Funnel

`referral share/link`
→ visit
→ activated user
→ repeat usage
→ Premium interest/paid only when later applicable

A shared link is not a successful referral unless the declared downstream outcome occurs.

## 12. E9 — Organic content acquisition

After recruitment/traffic gates permit external acquisition, test small, traceable content sources before Paid Ads scale.

Candidate message angles:

### Pain
“วันนี้กินอะไรดี?”

### Social friction
“ถามกันว่าจะกินอะไร แล้วลงเอยที่ ‘อะไรก็ได้’”

### Fast solution
“ไม่ต้องคิดนาน กด ‘ไม่รู้เลย’ แล้วให้เราช่วยเลือก”

Candidate channels may include community posts and short-form organic social content where platform/community rules permit it.

Use traceable UTM/source definitions and compare activation/retention, not views alone.

## 13. E10 — Paid Acquisition pilot

Paid Ads remain a later controlled experiment, not a launch prerequisite.

### Platform sequencing direction

Test **one channel at a time first** rather than Meta + TikTok + YouTube simultaneously, so attribution and learning remain interpretable.

Initial planning priority may start with Meta, then TikTok, then YouTube, but this is a test sequence rather than a permanent channel ranking.

### Creative test

Use a small number of materially different concepts, for example:
- Pain
- Social friction
- Direct solution

Do not split a very small audience into many variants and over-interpret noise.

### Primary optimization target

Prefer cost per **activated user** before payment maturity, then cost per **real paid customer** only when the Payment/Commercial funnel is ready.

CTR/CPC are diagnostic metrics, not sufficient scale criteria.

## 14. Paid spend control

No ad budget is approved by this plan.

When a pilot is eventually authorized:
- declare maximum spend before launch
- declare platform, campaign, dates and creative set
- validate UTM/event routing first
- use a kill condition for broken landing/core/payment flow
- never increase spend because CTR looks good while activation/retention is weak

A prior planning idea such as THB 300–500/day for a few days is a scenario only and must not be treated as approved spend without a new explicit owner/budget decision at launch time.

## 15. STOP / CONTINUE / CHANGE / SCALE

### STOP

Stop adding traffic when:
- Critical/product/payment/security incident exists
- tracking cannot answer the experiment question
- landing/core flow is materially broken
- paid spend is running without reliable attribution/activation truth

### CONTINUE

Continue collecting evidence when:
- implementation is stable
- data is trustworthy but cohort/sample is still immature
- no material harm/incident is present

### CHANGE

Change product/copy/targeting when:
- evidence identifies a plausible bottleneck
- new version/hypothesis is recorded before the next cohort

### SCALE

Use `SCALE` only when:
- product/funnel is stable
- tracking is reliable
- retention quality is demonstrated for the stage
- unit economics are supported by actual cost/retention evidence
- relevant Payment/Legal/Support/Security gates pass
- acquisition cost remains within an approved contribution/LTV safety boundary

High CTR alone is never SCALE evidence.

## 16. Small-sample discipline

During early Beta:
- prefer one clear version/cohort over many tiny A/B cells
- read confidence qualitatively and quantitatively without pretending statistical certainty
- record raw counts alongside percentages
- wait for retention windows to mature before declaring success/failure
- separate QA/synthetic traffic from real users

## 17. Dashboard / daily decision view

When real Beta traffic exists, a compact decision report should separate:

### Acquisition
- visitors/new users
- source/campaign

### Activation
- recommendation completion
- `ไม่รู้เลย` usage

### Engagement/Retention
- result actions
- repeat usage
- D1/D7/D30 as cohorts mature

### Premium
- offer views
- CTA
- checkout
- authoritative paid
- active Premium
- cancellation/expiry

### Economics
- spend
- cost per activated user
- CAC after paid conversion exists
- actual payment fees/refunds
- contribution/LTV only when supported

Every section must show `N/A`/`PENDING` when evidence does not yet exist.

## 18. Current truth

- Growth experiment sequence: **DESIGN READY**
- Recruitment gate: governed by canonical Public Beta state; this plan does not open it
- Organic campaign results: **NOT ESTABLISHED by this plan**
- Paid Ads: **NOT LAUNCHED by this plan**
- Ad spend: **0 approved by this document**
- Paid CAC: **NOT ESTABLISHED**
- Paid conversion: **NOT ESTABLISHED**
- Retention/LTV: **NOT ESTABLISHED**
- Revenue: **NOT ESTABLISHED**

Use this file to decide what to test next only after the preceding gates permit the experiment.
