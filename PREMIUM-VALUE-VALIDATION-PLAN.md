# Kinaraidee — Premium Value & Price Validation Plan

Status: **RESEARCH PLAN / THB 59 BETA BUSINESS PRICE APPROVED / NO PAYMENT / NO LIVE CAMPAIGN ENTRY**

Purpose: validate whether users see recurring value in Kinaraidee Premium **without relying on the iPhone campaign**, test comprehension and willingness to keep Premium at the owner-approved Beta proposition of **THB 59/month**, and discover product/package changes before payment execution.

This research plan does not reopen the current Beta business price decision by itself. `BUSINESS-COMMERCIAL-BASELINE.md` is the canonical owner-approved Business baseline. Research may create evidence for a future change proposal, but no participant answer silently changes the approved price or any Payment/Legal gate.

Related inputs:
- `BUSINESS-COMMERCIAL-BASELINE.md`
- `FREE-PREMIUM-FEATURE-SPLIT.md`
- `PREMIUM-PRICING-SCENARIOS.md`
- `PREMIUM-CAMPAIGN-ELIGIBILITY-CONTRACT.md`
- `PAYMENT-PREMIUM-DECISION.md`
- Issue #363 — Premium value interviews Round 1

## Current business truth

Owner-approved planning inputs as of 2026-09-07:

- Web/PWA first
- Premium Beta price: **THB 59/month**
- no Free Trial for the first Beta
- Free retains the core `ไม่รู้เลย` / recommendation value
- Premium should add recurring convenience/intelligence rather than manufacture conversion by crippling Free
- first provider baseline: Stripe Payments, subject to strict account/provider validation
- payment implementation and Production authority remain pending
- the iPhone campaign remains separate PRE-LAUNCH work; it is not a reason to classify Premium value as validated

## Research questions

The first real-participant round should answer:

1. Is “ไม่รู้จะกินอะไร” frequent/painful enough for users to want ongoing help?
2. Which proposed Premium capability has the clearest recurring value?
3. Do users understand the difference between Free and Premium without explanation?
4. Would users consider keeping Premium if there were **no prize campaign**?
5. After an open-ended price question, how do users react to the current **THB 59/month** Beta proposition?
6. What reasons make THB 59 feel clearly worth it, marginal, or not worth it?
7. Which user segment shows the strongest natural fit?
8. Which privacy/control concerns appear when the app learns from history?
9. Does the prize campaign increase interest without becoming the only reason to subscribe?

## Critical anti-bias rules

1. **Do not show the iPhone campaign until after the core Premium value and price questions.**
2. **Ask open-ended willingness-to-pay before revealing THB 59.**
3. Do not tell participants that THB 59 is “cheap”, “special” or “good value”.
4. Do not count stated intent as paid conversion or retention.

The study needs distinct signals:

- `product_value_interest`
- `open_price_thb`
- `intent_59`
- `no_prize_subscription_intent`
- `campaign_incremental_interest`

Never label campaign-driven stated intent as validated Premium retention.

## Suggested participant mix

Initial directional round: **12–20 real participants** is sufficient for qualitative product learning, not statistical proof.

Try to include a spread across the core use cases:

### Segment A — Solo indecision
People who regularly ask themselves “วันนี้กินอะไรดี?” and choose meals alone.

### Segment B — Couple/family compromise
People who frequently decide meals with a partner or family.

### Segment C — Friends/office group
People who often choose lunch/dinner with coworkers or friends.

### Segment D — Planner-oriented
People who sometimes plan meals/budget several days ahead.

Do not infer market size from this sample.

## Screening questions

Before showing Kinaraidee:

1. In a normal week, how often do you feel stuck deciding what to eat?
2. Who do you usually decide meals with?
3. What do you currently do when you cannot decide?
4. Have you ever used an app/site/social media to help choose food?
5. Do repeated meals bother you?
6. Do you plan meals ahead or decide at the last minute?

Avoid leading questions such as “Would an AI food app be useful?” before hearing the participant's natural behavior.

## Test order

### Phase 1 — Current problem and Free core

Show/explain only the current core concept:

> “กินอะไรดีช่วยเลือกเมนูเมื่อคุณไม่รู้ว่าจะกินอะไร”

Ask:
- What do you think this app does?
- When would you use it?
- What would make you use it again tomorrow?
- What would make you stop using it?

Goal: establish whether Free core value is understandable before Premium is introduced.

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

Show the proposed Premium V1 direction together:

- Smart Taste Profile
- Smart No-Repeat
- 3-/7-day Meal Planner

Free remains conceptually useful, including:
- basic `ไม่รู้เลย` recommendations
- basic preferences
- basic history/favorites
- basic Group mode where implemented
- nearby restaurant discovery where implemented

Ask the participant to explain the difference between Free and Premium in their own words.

### Comprehension signal

Good signal:
- user describes Premium as more personalized / remembers / plans / avoids repetition

Weak signal:
- user thinks Premium merely gives more random spins or exists only for the prize

## Price research — order matters

### Step 1 — open-ended price before any anchor

Ask:

> “ถ้าฟีเจอร์ Premium ทำงานได้ตามนี้ คุณคิดว่าราคาต่อเดือนที่เหมาะสมควรประมาณเท่าไร?”

Record the raw numeric/text answer before revealing THB 59.

### Step 2 — test the approved THB 59 Beta proposition

Then show neutrally:

> “ถ้า Premium ชุดนี้ราคา 59 บาทต่อเดือน และไม่มี Free Trial คุณรู้สึกอย่างไร?”

Capture one standardized intent response:
- definitely would consider
- probably would consider
- not sure
- probably would not
- definitely would not

Then ask:
- What makes THB 59 feel worth it or not worth it?
- Which feature would you need to use regularly to keep paying the next month?
- What would make you cancel after one month?
- Does no Free Trial materially change your willingness to try it, given that Free still exposes the core product?

Stated intent is research evidence only, not conversion.

### Optional comparative price sensitivity

Only after the open-ended answer and THB 59 response may the interviewer explore future price/package sensitivity. If useful, higher historical research anchors such as **THB 69 / 79 / 99** may be tested in rotating/randomized order.

These are **comparative research anchors only**. They are not the current Beta price and must not be presented as current offers.

For each optional anchor capture the same standardized intent scale. Do not overwrite the THB 59 result with the higher-anchor response.

## Price-sensitivity questions

Optionally use four simplified questions:

1. At what monthly price would Premium feel so cheap that you might doubt its value/quality?
2. At what price would it feel good value?
3. At what price would it start to feel expensive but still worth considering?
4. At what price would it be too expensive to consider?

With a small qualitative sample, use these answers directionally; do not claim a statistically valid market price.

## “No prize” retention question — mandatory

Before mentioning the campaign, ask:

> “ถ้าไม่มีแคมเปญลุ้น iPhone เลย คุณยังมองว่า Premium แบบนี้น่าสมัครและน่าใช้ต่อทุกเดือนไหม? เพราะอะไร?”

Capture the reason verbatim where practical.

This signal is more important for long-term product quality than initial prize-driven interest.

## Phase 5 — Campaign incremental test

Only after the full core-value, THB 59 and no-prize sequence may the interviewer show the campaign concept:

> “มีแนวคิดแคมเปญแยกต่างหากว่า เมื่อแคมเปญพร้อมตามกติกา สมาชิก Premium ที่เข้าเกณฑ์อาจมีส่วนร่วมในแคมเปญ 3,000 Premium ลุ้น iPhone 17 Pro Max 256GB 1 เครื่อง”

State clearly during research:
- campaign is currently PRE-LAUNCH
- no prize entry is currently accepted
- final rules/legal/payment conditions are not yet live
- subscribing in a research scenario is not a prize entry

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

Do not use a single arbitrary pass percentage from 12–20 people. Use converging evidence.

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

### THB 59 proposition signal

The current Beta proposition is supported directionally when:
- open-ended responses are not systematically far below THB 59
- THB 59 intent does not collapse after the package is understood
- participants can name concrete recurring value that justifies another paid month
- no-prize intent remains meaningful
- objections point to fixable product/package issues rather than prize dependence
- the commercial cost model still has adequate contribution headroom

Research may recommend **KEEP / CHANGE PACKAGE / RE-TEST PRICE / STOP PREMIUM TEST**. A recommendation to change price is an input for a new owner decision; it does not automatically modify the THB 59 baseline.

## Research record schema

Assign each participant a non-identifying research ID such as `R001`.

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
- intent_59
- no_trial_reaction
- intent_69_optional
- intent_79_optional
- intent_99_optional
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
- Do not count the repo owner/developer's opinion as a user test.
- Do not convert a prototype click into a paid conversion.
- Do not convert “sounds interesting” into willingness-to-pay proof.
- Do not show THB 59 before the open-ended price question.
- Do not include the iPhone campaign before core-value, THB 59 and no-prize questions.
- Do not promise a live prize entry during research.
- Do not treat research intent as Payment PASS, Premium activation, campaign eligibility, conversion, MRR or revenue.
- If interviews are recorded, obtain appropriate consent and define retention/access before recording.

## Output after first round

Produce a research summary containing:

1. participant mix and limitations
2. recurring pain patterns
3. feature ranking and reasons
4. strongest/weakest Premium value propositions
5. privacy/control requirements
6. open-ended price responses
7. THB 59 intent and objections
8. no-Free-Trial reaction
9. no-prize subscription signal
10. incremental campaign effect
11. optional comparative price-sensitivity results, clearly labeled non-current anchors
12. changes recommended before Premium implementation/launch
13. unresolved questions for the next round

## Implementation and evidence gate

Research can improve the product/package and create evidence around the THB 59 proposition, but it does not by itself authorize payment implementation or Production Premium.

Production work still requires, as applicable:
- real provider/merchant-account validation
- strict Payment decision/execution gate satisfaction
- Privacy/Terms/subscription/cancellation/refund disclosures
- backend schema/webhook/security implementation
- Test Mode lifecycle acceptance
- controlled Production payment acceptance
- QA/support/security readiness
- separate legal/tax/campaign gates before any prize entries

Until those gates pass:
- no real payment is inferred from research
- no live Premium entitlement is inferred from research
- campaign remains PRE-LAUNCH
- `entries_open=false`
- `eligible_count=0`
- no prize entry
- no paid conversion/MRR/revenue claim