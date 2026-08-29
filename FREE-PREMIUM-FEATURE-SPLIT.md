# Kinaraidee — Free vs Premium Feature Split

Status: **PRODUCT DESIGN PROPOSAL / NOT APPROVED / NO PAYWALL ENABLED**

Purpose: define a sustainable recurring-value hypothesis for Kinaraidee Premium so users have reasons to stay subscribed after the 3,000-member campaign ends. This document does not change the current Public Beta behavior, create Premium entitlements, set a price, or authorize payment.

## Product principle

The core promise of Kinaraidee is simple:

> “ไม่รู้จะกินอะไร — ให้กินอะไรดีช่วยเลือกให้”

That core value should remain usable for free. Premium should make the answer **more personal, more useful over time, and more convenient**, rather than making the basic product unusable without payment.

This supports two business goals at the same time:

1. Free users can discover the product, share it and create organic growth.
2. Premium users pay for recurring intelligence/convenience that improves with continued use.

## What should NOT become Premium-only by default

Do not automatically paywall features already central to the current Public Beta experience:

- basic “ไม่รู้เลย” / Surprise recommendation
- basic meal/budget/type selection
- basic single-user food recommendation flow
- basic Group mode needed for the product’s social/family use case
- basic nearby restaurant discovery where the business may also earn partner/affiliate value
- ordinary account signup/login
- campaign/rules/status information

A future approved limit may exist, but any restriction must be deliberately user-tested rather than introduced only to force subscription conversion.

## Proposed Free tier

### 1. Core choice engine

Free users can:
- use “ไม่รู้เลย” to get a menu suggestion
- choose meal timing/category/budget/basic preferences
- rerun a recommendation
- use the general menu catalogue

Reason: this is the acquisition loop and the clearest expression of the product promise.

### 2. Basic account

Free authenticated users can retain the account functionality already available in the product. Existing Public Beta behavior should not be silently removed merely to create Premium scarcity.

### 3. Basic history/favorites

Keep enough history/favorite utility for users to understand and trust the app. Premium can add **intelligence over history**, not necessarily take away the basic record itself.

### 4. Basic Group mode

Friends/family can still use the basic group decision flow. Premium can later add persistent group/household memory and smarter compromise ranking.

### 5. Nearby restaurants / partner discovery

Keep basic restaurant discovery free because it can support a separate partner/affiliate revenue stream and makes recommendations actionable.

## Proposed Premium value pillars

Premium should have at least three clearly understandable recurring benefits before payment launches.

### Pillar A — “รู้ใจฉันมากขึ้น” (Smart Taste Profile)

Candidate capabilities:
- learn from liked/picked/skipped food history
- weight cuisines/menu types the user repeatedly prefers
- remember disliked patterns
- remember budget tendencies by meal/time
- adapt suggestion ranking rather than only filtering manually

User-facing promise:

> “ยิ่งใช้ ยิ่งเลือกได้ตรงใจคุณ”

Server/security boundary:
- if Premium-only logic depends on protected profile data or server-side computation, verify Premium entitlement at the controlled backend boundary
- browser flags alone must not unlock authoritative Premium behavior

### Pillar B — “ไม่กินซ้ำจนเบื่อ” (Smart No-Repeat)

Candidate capabilities:
- avoid recently selected meals for configurable periods
- recognize similar dishes/cuisines, not only exact string matches
- allow “พักเมนูนี้ 7/30 วัน”
- balance variety across recent meals

User-facing promise:

> “ช่วยจำให้ว่าเพิ่งกินอะไรไป แล้วหาอะไรใหม่ให้”

Why it matters:
This turns history into recurring utility and directly addresses a common everyday choice problem.

### Pillar C — “วางแผนมื้อให้ล่วงหน้า” (Meal Planner)

Candidate capabilities:
- generate a simple 3-day or 7-day meal plan from taste/budget preferences
- regenerate an individual meal without replacing the whole plan
- save upcoming meals
- optionally remind the user at meal time later (separate notification permission/implementation)

User-facing promise:

> “ไม่ต้องคิดใหม่ทุกมื้อ — วางไว้ให้ล่วงหน้า”

This is stronger recurring value than a one-off randomizer and can justify monthly subscription more credibly.

### Pillar D — “บ้านเรา/กลุ่มเรา” (Household & Group Memory)

Candidate future capabilities:
- saved household/group profiles
- remember each person’s likes/dislikes
- smarter compromise ranking across members
- reusable family/friend groups rather than recreating preferences each session

User-facing promise:

> “จำได้ว่าแต่ละคนชอบอะไร แล้วช่วยหาจุดลงตัวให้”

This is promising but more complex than the first Premium release; treat as V2 unless implementation cost proves small.

### Pillar E — Premium insights

Candidate future capabilities:
- favorite cuisine trends
- spending/budget tendency summaries
- diversity/rotation insights
- “ช่วงนี้กินอะไรบ่อย”

Use only if the insight is actually useful; avoid analytics screens that look impressive but do not improve meal decisions.

### Pillar F — Partner benefits (future, conditional)

Possible benefits only after real partner agreements exist:
- Premium-only restaurant offers
- partner perks
- priority deal discovery

Do not advertise a guaranteed discount/perk until a real partner contract and fulfillment path exist.

## Recommended Premium V1 scope

To keep implementation and support manageable, the first paid Premium should focus on **three concrete recurring-value features**:

1. **Smart Taste Profile** — recommendations learn from the user over time.
2. **Smart No-Repeat** — avoid recent/repetitive suggestions intelligently.
3. **3-/7-day Meal Planner** — turn daily decisions into a reusable plan.

Optional V1.1:
- richer preference controls if user testing shows demand
- expanded history insights

Defer to V2:
- persistent household/group profiles
- complex shared personalization
- partner perks that depend on signed commercial relationships

## Proposed capability matrix

| Capability | Free | Premium candidate | Enforcement / truth boundary |
|---|---|---|---|
| Basic “ไม่รู้เลย” recommendation | Yes | Yes | Public/core logic |
| Basic meal/budget/type preferences | Yes | Yes | Client/basic backend as appropriate |
| Basic history/favorites | Yes | Yes | Existing authenticated ownership rules |
| Basic Group mode | Yes | Yes | Existing group API rules |
| Basic nearby restaurant discovery | Yes | Yes | Public/partner discovery contract |
| Smart Taste Profile | No | Yes | Entitlement-aware controlled logic if server-backed |
| Smart No-Repeat / variety ranking | Limited/basic | Full | Premium capability flag + protected history logic |
| 3-/7-day Meal Planner | No | Yes | Premium entitlement before persistent/server features |
| Advanced preference memory | Basic | Enhanced | Premium entitlement if protected/server-backed |
| Household/group memory | No | Future Premium | Server entitlement + per-user/group authorization |
| Premium insights | No | Future Premium | User-owned history + entitlement |
| Partner Premium perks | No | Future/conditional | Real partner + eligibility contract |

## Why not make “unlimited random picks” the main Premium benefit

A quota such as “Free gets 3 random picks/day, Premium unlimited” is easy to build but weak as the primary subscription story:

- it punishes the core product loop
- it can reduce organic discovery before the brand has scale
- users can perceive the subscription as removing an artificial limitation rather than adding intelligence
- client-only quotas are easy to bypass unless server enforced

A quota could be tested later if backend/API costs justify it, but it should not replace a strong Premium value proposition.

## Why the iPhone campaign must not be the Premium product

The campaign can accelerate acquisition, but the subscription must stand on its own after the prize is awarded.

A healthy user reason is:

> “ฉันจ่ายเพราะกินอะไรดีช่วยเลือกได้ตรงใจและช่วยวางแผนทุกวัน”

not only:

> “ฉันจ่ายเพราะอยากลุ้น iPhone”

If campaign-driven users cancel immediately after the drawing, the business has acquired prize participants rather than retained Premium customers.

## Pricing compatibility hypothesis

The separate pricing scenario document tests THB 69 / 79 / 99 as research anchors. Before any of those values can be approved, Premium V1 must demonstrate enough perceived monthly value.

Suggested value-testing questions:
- Would Smart Taste Profile alone make users pay monthly?
- Does Smart No-Repeat solve a frequent enough pain point?
- Does a 3-/7-day plan save meaningful time?
- Which combination feels worth THB 69, 79 or 99/month?
- Would users keep Premium if there were no prize campaign?

The last question is the most important retention test.

## Entitlement design principle

Do not code the entire paid tier as a single visual `isPremium=true` switch in the browser.

Prefer capability-level concepts such as:
- `smart_taste_profile`
- `smart_no_repeat`
- `meal_planner`
- `household_profiles`
- `premium_insights`

The final schema/code names must be approved during implementation, but capability-level design makes future packaging and experiments safer.

## Upgrade UX proposal

Free user experience should show Premium at moments where value is understandable, not as constant interruption.

Examples:
- after enough history exists: “ให้กินอะไรดีเรียนรู้รสชาติของคุณไหม?”
- after repeated dishes: “เปิด Smart No-Repeat เพื่อช่วยหลีกเลี่ยงเมนูซ้ำ”
- when planning ahead: “สร้างแผนอาหาร 7 วันด้วย Premium”

Before payment:
- show exact recurring price/currency
- show the specific included benefits
- explain renewal/cancel terms
- link approved Privacy/Terms/refund disclosures
- do not imply prize eligibility unless campaign entries are actually LIVE and the user satisfies the approved campaign rules

## Product validation plan before implementation

### Stage 1 — concept validation without payment

Test three value concepts separately:
- Smart Taste Profile
- Smart No-Repeat
- Meal Planner

Measure qualitative preference and intent; do not call an intent survey a real conversion rate.

### Stage 2 — package test

Show a proposed package with all three benefits at research price anchors:
- THB 69
- THB 79
- THB 99

Record which price/benefit combination users say they prefer. This is willingness-to-pay research, not revenue evidence.

### Stage 3 — prototype usability

Prototype the winning Premium features without real payment and verify that users understand:
- what became smarter
- how to control/reset personalization
- how the planner works
- what is stored/synced

### Stage 4 — implementation only after decisions

After provider, price, entitlements, privacy/legal and payment lifecycle decisions are approved:
- implement server-side capability/entitlement boundary
- implement Premium features
- sandbox subscription lifecycle
- test revoke/expire/refund behavior
- only then consider production real-money acceptance

## Success criteria for Premium V1

Before Commercial GO, the product should be able to answer:

1. What recurring problem does Premium solve that Free does not?
2. Can users explain the Premium benefits in their own words?
3. Does Premium still make sense without the iPhone campaign?
4. Which price/package has the strongest validated demand signal?
5. Can access be enforced from backend entitlement truth?
6. Does cancellation/refund correctly remove future paid capability without corrupting user-owned data?

## Boundary

This proposal does **not**:
- remove current Free/Public Beta functionality
- set a usage quota
- approve a Premium price
- create payment/entitlement rows
- enable any paywall
- prove users want or will pay for Premium
- open campaign entries
- change `eligible_count` from 0
- authorize Commercial GO

All current Payment, Premium, legal and campaign gates remain open until separately approved and evidenced.
