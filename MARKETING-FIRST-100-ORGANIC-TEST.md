# Kinaraidee — First 100 Organic Acquisition Test

Status: **READY FOR ORGANIC TEST / NO PAID SPEND AUTHORIZED**

Prepared: 2026-09-04

## Objective

Get the first trustworthy acquisition baseline without Influencer fees or paid media, using owned/community distribution and the first-party UTM/referral system that is already deployed.

Operational target for this pack: **100 newly confirmed accounts after the tracking start**.

Important: the public Web/PWA can be used before account creation. Privacy-minimal Product Funnel events are now measured separately for reviewed UTM traffic, but they are best-effort anonymous browser-session observations and are not authenticated account counts. Therefore `100 confirmed accounts` is a measurable acquisition milestone, **not a claim that total product users equal 100**.

## Truth boundary

This pack is core-product acquisition only.

- No paid media is authorized by this document.
- No Influencer/creator payment is authorized.
- No App Store / Google Play availability claim.
- No Premium-live claim.
- No Campaign 3,000 prize-entry claim.
- Ordinary signup/referral measurement is not prize eligibility.
- Product Funnel measurement is not authenticated identity, Premium/payment truth or Campaign 3,000 eligibility.
- Do not invent landing sessions, recommendation-result counts, installs, spend, CAC or CPI.

## Measurement that is available now

Owner dashboard:

`https://rachanakorninon-gif.github.io/kinaraidee/acquisition-dashboard.html`

Observed first-party account metrics currently available:

- new account signup
- confirmed account
- signup attribution coverage
- attributed/unattributed signup
- `utm_source`
- `utm_campaign`
- `utm_content`
- paid-social signup count when a real paid-social link is later used
- referral signup
- confirmed referral

Privacy-minimal Product Funnel measurement is deployed for reviewed UTM traffic and can observe unique browser-session stages:

- landing session
- Surprise / `ไม่รู้เลย` tap
- guided-choice start
- recommendation result reached
- nearby-restaurant tap where exposed by the current UI

Product Funnel telemetry uses a random browser-session UUID plus coarse reviewed UTM fields and remains separate from authenticated account identity. Production ingestion was verified by a controlled synthetic probe and the generated synthetic row was deleted after evidence capture. That probe proves endpoint behavior only; it does **not** establish any real-user funnel count, conversion rate or creative winner.

Do not substitute signup for product events or product events for signup/confirmed-account truth.

## UTM taxonomy for the first-100 test

Campaign:

`th_first100_core_202609`

Sources:

- `tiktok`
- `instagram`
- `youtube`
- `facebook`

Medium for owned organic posts:

`organic_social`

Creative/content IDs:

| Existing creative | UTM content | Core message |
|---|---|---|
| C001 | `c001_todayeat` | วันนี้กินอะไรดี? |
| C002 | `c002_anything` | “อะไรก็ได้...” |
| C003 | `c003_surprise_demo` | กด “ไม่รู้เลย” / product demo |
| C004 | `c004_budget` | งบ 100–200 กินอะไรดี? |

The names intentionally avoid prize/Premium terminology while those gates remain blocked.

## Reviewed organic URLs

### TikTok

C001  
`https://rachanakorninon-gif.github.io/kinaraidee/?utm_source=tiktok&utm_medium=organic_social&utm_campaign=th_first100_core_202609&utm_content=c001_todayeat`

C002  
`https://rachanakorninon-gif.github.io/kinaraidee/?utm_source=tiktok&utm_medium=organic_social&utm_campaign=th_first100_core_202609&utm_content=c002_anything`

C003  
`https://rachanakorninon-gif.github.io/kinaraidee/?utm_source=tiktok&utm_medium=organic_social&utm_campaign=th_first100_core_202609&utm_content=c003_surprise_demo`

C004  
`https://rachanakorninon-gif.github.io/kinaraidee/?utm_source=tiktok&utm_medium=organic_social&utm_campaign=th_first100_core_202609&utm_content=c004_budget`

### Instagram

C001  
`https://rachanakorninon-gif.github.io/kinaraidee/?utm_source=instagram&utm_medium=organic_social&utm_campaign=th_first100_core_202609&utm_content=c001_todayeat`

C002  
`https://rachanakorninon-gif.github.io/kinaraidee/?utm_source=instagram&utm_medium=organic_social&utm_campaign=th_first100_core_202609&utm_content=c002_anything`

C003  
`https://rachanakorninon-gif.github.io/kinaraidee/?utm_source=instagram&utm_medium=organic_social&utm_campaign=th_first100_core_202609&utm_content=c003_surprise_demo`

C004  
`https://rachanakorninon-gif.github.io/kinaraidee/?utm_source=instagram&utm_medium=organic_social&utm_campaign=th_first100_core_202609&utm_content=c004_budget`

### YouTube Shorts

C001  
`https://rachanakorninon-gif.github.io/kinaraidee/?utm_source=youtube&utm_medium=organic_social&utm_campaign=th_first100_core_202609&utm_content=c001_todayeat`

C002  
`https://rachanakorninon-gif.github.io/kinaraidee/?utm_source=youtube&utm_medium=organic_social&utm_campaign=th_first100_core_202609&utm_content=c002_anything`

C003  
`https://rachanakorninon-gif.github.io/kinaraidee/?utm_source=youtube&utm_medium=organic_social&utm_campaign=th_first100_core_202609&utm_content=c003_surprise_demo`

C004  
`https://rachanakorninon-gif.github.io/kinaraidee/?utm_source=youtube&utm_medium=organic_social&utm_campaign=th_first100_core_202609&utm_content=c004_budget`

### Facebook

C001  
`https://rachanakorninon-gif.github.io/kinaraidee/?utm_source=facebook&utm_medium=organic_social&utm_campaign=th_first100_core_202609&utm_content=c001_todayeat`

C002  
`https://rachanakorninon-gif.github.io/kinaraidee/?utm_source=facebook&utm_medium=organic_social&utm_campaign=th_first100_core_202609&utm_content=c002_anything`

C003  
`https://rachanakorninon-gif.github.io/kinaraidee/?utm_source=facebook&utm_medium=organic_social&utm_campaign=th_first100_core_202609&utm_content=c003_surprise_demo`

C004  
`https://rachanakorninon-gif.github.io/kinaraidee/?utm_source=facebook&utm_medium=organic_social&utm_campaign=th_first100_core_202609&utm_content=c004_budget`

All future variants should be generated through `tools/marketing-url-builder.mjs`, not hand-edited into a group-room or prize URL.

## Execution sequence

### Wave 0 — instrumentation sanity check

Before public distribution:

1. Open one reviewed UTM URL in a fresh browser profile/private session.
2. Use the core product before signup.
3. If a genuine tester chooses to create an account, use a real email and complete the normal confirmation flow.
4. Verify the Owner dashboard attributes the new confirmed account to the expected source/campaign/content.
5. Verify Product Funnel observations only when genuinely produced; never copy the controlled synthetic smoke result into a real-user baseline.
6. Do not create fake production users just to increase counts.

Because acquisition capture is first-touch and persists for up to 30 days, repeated testing in the same normal browser may preserve the first source. Use a fresh/private test context when validating another UTM cell. Do not clear attribution for real users.

### Wave 1 — 0 → 20 confirmed accounts

Publish/seed only the two clearest mechanisms first:

- C003 product demo / `ไม่รู้เลย`
- C001 direct pain / `วันนี้กินอะไรดี?`

Use owned social accounts and genuine community sharing where permitted. No spam and no paid boosting yet.

Goal: prove that real people can arrive, use the product and create/confirm accounts while attribution remains correct.

### Wave 2 — 20 → 50 confirmed accounts

Add:

- C002 social friction
- C004 budget utility

Compare **observed confirmed accounts by source and creative**, not likes/views alone. Product Funnel stages may be compared separately only after genuine reviewed-UTM observations exist with clear denominator semantics.

Do not label a creative a product-behavior winner from deployment or synthetic-probe evidence alone.

### Wave 3 — 50 → 100 confirmed accounts

Concentrate publishing effort on the source/content combinations that have produced the strongest observed confirmed-account signal while keeping at least one mechanism-focused control (`C003`).

Use natural referral sharing only. Referral counts are growth measurement and remain separate from Campaign 3,000 eligibility.

## Decision table

| Signal | Interpretation / action |
|---|---|
| UTM link produces no attribution row after a genuine signup | stop that link and investigate tracking before scaling |
| Attribution coverage is materially below expected tagged traffic | investigate browser flow/link handling before spend |
| High platform views but no confirmed accounts | attention signal only; do not call it an acquisition winner |
| Confirmed accounts repeatedly come from one source/content pair | prioritize more organic iterations of that pair |
| Genuine Product Funnel observations differ materially by source/content | inspect stage denominators and sample size before calling a product-behavior signal |
| Referral signups begin appearing | record as organic growth evidence; do not convert them into prize entries |
| No reliable signal by 100 confirmed accounts | improve message/product/account-value flow before paid scale |

No universal numeric winner threshold is asserted before a real baseline exists.

## Daily owner check

Record once per publishing day:

- measured signups
- confirmed signups
- attribution coverage
- top source
- top campaign (`th_first100_core_202609` expected for this test)
- top content
- referral signups / confirmed referrals
- genuine Product Funnel observations when present, kept separate from authenticated account counts
- broken-link or confusing-comment evidence

Platform-native views/clicks may be recorded separately when genuinely observed, but the current first-party dashboard is not the authority for those platform metrics.

## Exit criteria to consider a paid test

Organic first-100 completion does **not** automatically authorize paid media.

Before proposing spend, require:

- acquisition dashboard still returns trustworthy observed data
- tagged signup attribution has been proven with genuine users
- at least one truthful creative/source combination has produced observed confirmed accounts
- Product Funnel observations, if used in a decision, come from genuine reviewed-UTM traffic rather than synthetic smoke
- destination is stable on target mobile devices
- no unresolved high-severity signup/privacy issue
- budget/account/billing approval is recorded separately

Then use `MARKETING-FIRST-PAID-TEST-PLAN.md` for the paid experiment. Prize/Premium acquisition remains independently blocked until its own gates pass.
