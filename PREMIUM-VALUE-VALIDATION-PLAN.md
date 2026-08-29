# Kinaraidee — Premium Value & Price Validation Plan

Status: **RESEARCH PLAN / NO PAYMENT / NO LIVE CAMPAIGN ENTRY**

Purpose: validate whether users see recurring value in Kinaraidee Premium **without relying on the iPhone campaign**, and narrow the product package/price before any payment implementation.

Related design inputs:
- `FREE-PREMIUM-FEATURE-SPLIT.md`
- `PREMIUM-PRICING-SCENARIOS.md`
- `PREMIUM-CAMPAIGN-ELIGIBILITY-CONTRACT.md`
- `PAYMENT-PREMIUM-DECISION.md`

## Research questions

The study must answer:

1. Is “ไม่รู้จะกินอะไร” frequent/painful enough for users to want ongoing help?
2. Which proposed Premium capability has the clearest recurring value?
3. Do users understand the difference between Free and Premium without explanation?
4. Would users consider keeping Premium if there were **no prize campaign**?
5. Which research price anchor (THB 69 / 79 / 99 per month) best balances stated demand and economics?
6. Which user segment shows the strongest natural fit?
7. Which privacy/control concerns appear when the app “learns” from history?
8. Does the prize campaign increase interest without becoming the only reason to subscribe?

## Critical anti-bias rule

**Do not show the iPhone campaign until after the core Premium value/price questions.**

Reason: if the prize is shown first, stated willingness to subscribe can reflect lottery/prize interest rather than recurring product value. The study needs two separate signals:

- `product_value_interest`
- `campaign_incremental_interest`

Never label campaign-driven stated intent as validated Premium retention.

## Suggested participant mix

Initial directional round: **12–20 participants** is sufficient for qualitative product-learning, not statistical proof.

Try to include a spread across the core use cases:

### Segment A — Solo indecision
People who regularly ask themselves “วันนี้กินอะไรดี?” and choose meals alone.

### Segment B — Couple/family compromise
People who frequently decide meals with a partner or family.

### Segment C — Friends/office group
People who often choose lunch/dinner with coworkers or friends.

### Segment D — Planner-oriented
People who sometimes plan meals/budget several days ahead.

Do not infer market size from the sample. The purpose is to discover value, objections and language.

## Screening questions

Before showing Kinaraidee:

1. In a normal week, how often do you feel stuck deciding what to eat?
2. Who do you usually decide meals with?
3. What do you currently do when you cannot decide?
4. Have you ever used an app/site/social media to help choose food?
5. Do repeated meals bother you?
6. Do you plan meals ahead or decide at the last minute?

Avoid leading questions such as “Would an AI food app be useful?” before hearing the user’s natural behavior.

## Test order

### Phase 1 — Current problem and Free core

Show/explain the current core concept only:

> “กินอะไรดีช่วยเลือกเมนูเมื่อคุณไม่รู้ว่าจะกินอะไร”

Ask:
- What do you think this app does?
- When would you use it?
- What would make you use it again tomorrow?
- What would make you stop using it?

Goal: establish whether the Free core is understandable before introducing Premium.

### Phase 2 — Premium concept A: Smart Taste Profile

Concept copy:

> **ยิ่งใช้ ยิ่งเลือกได้ตรงใจคุณ**  
> กินอะไรดีเรียนรู้จากเมนูที่คุณชอบ เลือก หรือข้าม เพื่อจัดอันดับเมนูให้เข้ากับรสนิยมของคุณมากขึ้น

Ask:
- What do you expect this to do?
- What data do you think it needs?
- What would make this feel useful rather than creepy?
- Would you want a reset/delete-personalization control?
- How often would this improve a real decision for you?

Record:
- value rating 1–5
- clarity rating 1–5
- privacy concern 1–5
- spontaneous concerns/comments

### Phase 3 — Premium concept B: Smart No-Repeat

Concept copy:

> **ไม่กินซ้ำจนเบื่อ**  
> แอปช่วยจำว่าเพิ่งกินอะไรไป หลีกเลี่ยงเมนูเดิมหรือเมนูคล้ายกัน และช่วยหมุนเวียนอาหารให้หลากหลายขึ้น

Ask:
- Is repeated food a real problem for you?
- Would 7-day / 30-day “พักเมนูนี้” be useful?
- Should the app avoid only exact dishes or similar cuisines too?
- When would you override the rule?

Record the same value/clarity ratings.

### Phase 4 — Premium concept C: Meal Planner

Concept copy:

> **วางแผนมื้อให้ล่วงหน้า**  
> ให้กินอะไรดีช่วยจัดแผนอาหาร 3 หรือ 7 วันตามงบและความชอบ แล้วเปลี่ยนเฉพาะมื้อที่ไม่ถูกใจได้

Ask:
- Would you use 3-day or 7-day planning?
- Would this save time, money, or neither?
- What must be editable?
- Would reminders be helpful or annoying?

Record the same value/clarity ratings.

## Feature ranking

After all three concepts, ask the participant to rank:

1. Smart Taste Profile
2. Smart No-Repeat
3. Meal Planner

Then ask:

> “ถ้าต้องจ่ายรายเดือน คุณต้องมีอย่างน้อยกี่ฟีเจอร์จากสามข้อนี้ถึงจะรู้สึกว่าคุ้ม?”

Do not force an answer that all three are valuable.

## Package test

Show the proposed Premium V1 bundle together:

- Smart Taste Profile
- Smart No-Repeat
- 3-/7-day Meal Planner

Free remains:
- basic “ไม่รู้เลย” recommendations
- basic preferences
- basic history/favorites
- basic Group mode
- nearby restaurant discovery

Ask the participant to explain the difference between Free and Premium in their own words.

### Comprehension signal

Good signal:
- user describes Premium as “more personalized / remembers / plans / avoids repetition”

Weak signal:
- user thinks Premium merely gives “more random spins” or is only for the prize

## Price research — order matters

First ask an **open-ended willingness-to-pay** question before showing anchors:

> “ถ้าฟีเจอร์ Premium ทำงานได้ตามนี้ คุณคิดว่าราคาต่อเดือนที่เหมาะสมควรประมาณเท่าไร?”

Record the raw answer.

Then show the research anchors in rotating/randomized order when practical:

- THB 69/month
- THB 79/month
- THB 99/month

For each price ask:
- definitely would consider
- probably would consider
- not sure
- probably would not
- definitely would not

Stated intent is research evidence only, not conversion.

## Price-sensitivity questions

Optionally use four simplified price-sensitivity questions after the direct test:

1. At what monthly price would Premium feel **so cheap that you might doubt its value/quality**?
2. At what price would it feel **good value**?
3. At what price would it start to feel **expensive but still worth considering**?
4. At what price would it be **too expensive to consider**?

With a small qualitative sample, use these answers directionally; do not claim a statistically valid market price.

## “No prize” retention question — mandatory

Before mentioning the campaign, ask exactly the core retention question:

> “ถ้าไม่มีแคมเปญลุ้น iPhone เลย คุณยังมองว่า Premium แบบนี้น่าสมัครและน่าใช้ต่อทุกเดือนไหม? เพราะอะไร?”

Capture the reason verbatim where possible.

This answer is more important for long-term business quality than initial prize-driven interest.

## Phase 5 — Campaign incremental test

Only now show:

> “ในช่วงเปิดตัว มีแนวคิดว่าเมื่อแคมเปญพร้อมตามกติกา สมาชิก Premium ที่เข้าเกณฑ์จะมีส่วนร่วมในแคมเปญ 3,000 Premium ลุ้น iPhone 17 Pro Max 256GB 1 เครื่อง”

Also state clearly during research:
- campaign is currently PRE-LAUNCH
- no entry is currently accepted
- final rules/legal/payment conditions are not yet live

Ask:
- Does the campaign make you more interested, less interested, or unchanged?
- Would you subscribe only for the campaign and cancel after it ends?
- Does the campaign make the product feel more attractive or less trustworthy?
- What information/rules would you need before participating?

Record separately:
- `campaign_interest_delta`
- `campaign_cancel_after_draw_intent`
- trust concerns

## Decision signals

Do not use a single arbitrary “pass percentage” from 12–20 people. Use converging evidence.

### Strong direction for a feature

A feature is promising when several signals agree:
- users understand it quickly
- users can name a real situation when they would use it
- it ranks near the top repeatedly
- participants describe concrete recurring value
- concerns are solvable without undermining the feature

### Weak direction

A feature should be reconsidered when:
- users require extensive explanation
- users say they can do it just as easily elsewhere
- value occurs rarely
- privacy concern outweighs convenience
- users rank it low even after understanding it

### Price direction

Favor a price band when:
- open-ended price responses cluster reasonably near it
- anchored intent does not collapse sharply there
- participants still see value without the prize
- the economics model leaves enough contribution headroom

Do not pick the lowest price just because it receives the least resistance.

## Research record schema

For each participant assign a non-identifying research ID such as `R001`.

Recommended fields:
- research_id
- segment
- meal_indecision_frequency
- current_solution
- core_concept_clarity_1_5
- taste_profile_value_1_5
- taste_profile_privacy_concern_1_5
- no_repeat_value_1_5
- meal_planner_value_1_5
- feature_rank_1
- feature_rank_2
- feature_rank_3
- open_price_thb
- intent_69
- intent_79
- intent_99
- no_prize_subscription_intent
- no_prize_reason
- campaign_interest_delta
- cancel_after_draw_intent
- top_objection
- key_quote
- notes

Avoid collecting unnecessary sensitive personal data.

## Research integrity rules

- Do not enter invented participant responses.
- Do not count the repo owner/developer’s opinion as a user test.
- Do not convert a prototype click into a paid conversion.
- Do not convert “sounds interesting” into willingness-to-pay proof.
- Do not include the iPhone campaign before the core-value questions.
- Do not promise a live prize entry during research.
- If interviews are recorded, obtain appropriate consent and define retention/access before recording.

## Output after first round

Produce a research summary containing:

1. participant mix and limitations
2. recurring pain patterns
3. feature ranking and reasons
4. strongest/weakest Premium value propositions
5. privacy/control requirements
6. price responses (open-ended + anchors)
7. no-prize subscription signal
8. incremental campaign effect
9. changes recommended before prototype implementation
10. unresolved questions for the next round

## Implementation gate

User research can narrow the product package and price hypothesis, but it does not by itself authorize payment implementation.

Production work still requires:
- Payment provider/merchant approval
- final Premium price/entitlements approval
- Privacy/Terms/payment disclosures
- backend schema/webhook/security implementation
- sandbox lifecycle acceptance
- legal campaign gates before prize entries

Until then:
- no real payment
- no live Premium entitlement
- no non-zero campaign eligible count
- no prize entry
- no revenue/conversion claims
