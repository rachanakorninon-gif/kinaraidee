# กินอะไรดี — Premium Interview Response Sheet

Status: **RESEARCH CAPTURE TEMPLATE / NO REAL PARTICIPANT RECORDED / NO PAYMENT / NO CAMPAIGN ENTRY**

ใช้เอกสารนี้คู่กับ `PREMIUM-VALUE-VALIDATION-PLAN.md` และ Issue #363 เพื่อบันทึกผลสัมภาษณ์ Premium Round 1 แบบหนึ่ง record ต่อผู้เข้าร่วม โดยรักษาลำดับคำถามและ evidence boundary ให้ตรงกับ baseline ปัจจุบัน

## Current business baseline

- Premium Beta price ที่เจ้าของอนุมัติสำหรับการทดสอบ = **THB 59/month**
- Free Trial = **ไม่มี** สำหรับ Beta แรก
- Free ยังคง core `ไม่รู้เลย` / recommendation ที่ใช้งานได้
- THB 59 เป็น **approved business proposition** ไม่ใช่ willingness-to-pay result
- การสัมภาษณ์ไม่สร้าง payment, Premium entitlement, subscriber, MRR, revenue หรือ campaign eligibility
- Campaign 3,000 Premium ยัง **PRE-LAUNCH** และต้องไม่ถูกเปิดเผยก่อนคำถาม core value / THB 59 / no-prize ตาม protocol

## Participant record

> ใช้รหัส non-identifying เช่น `R001`. ห้ามใส่ชื่อจริง อีเมล เบอร์โทร user ID token หรือข้อมูลส่วนบุคคลที่ไม่จำเป็นลง repository

- research_id:
- interview_date:
- interviewer:
- segment: `solo / couple-family / friends-office / planner / other`
- consent_to_notes: `yes / no / not_applicable`
- recording_used: `no` by default; ถ้า `yes` ต้องมี consent และ retention/access decision แยกต่างหาก

## Protocol order guard

ทำเครื่องหมายเฉพาะเมื่อทำจริงกับ participant รายนี้

- [ ] 1. ถาม current meal-decision behavior/problem ก่อนแสดง Premium
- [ ] 2. ทดสอบ Smart Taste Profile
- [ ] 3. ทดสอบ Smart No-Repeat
- [ ] 4. ทดสอบ 3-/7-day Meal Planner
- [ ] 5. ให้ rank ทั้ง 3 feature
- [ ] 6. ถามราคาแบบ open-ended **ก่อนเปิดเผย THB 59**
- [ ] 7. เปิดเผยและทดสอบ THB 59/month แบบเป็นกลาง
- [ ] 8. ถาม no-Free-Trial reaction
- [ ] 9. ถาม mandatory **no-prize** subscription-intent question
- [ ] 10. ถ้าจำเป็น จึงทดสอบ comparative anchors 69/79/99 โดยระบุว่าไม่ใช่ราคาปัจจุบัน
- [ ] 11. หลังข้อทั้งหมดข้างบนจึงเปิดเผย campaign concept
- [ ] 12. บันทึก campaign incremental effect และ cancel-after-draw intent

ถ้าลำดับผิด ให้ระบุ `protocol_deviation` และห้ามตีความ record นั้นเหมือน record ที่ทำตาม protocol ครบ

## Phase 1 — Current problem / Free core

- meal_indecision_frequency:
- usual_decision_context:
- current_solution:
- uses_food_app_or_social_for_decision:
- repeated_meal_problem:
- plans_ahead_or_last_minute:
- core_concept_clarity_1_5:
- when_would_use_free_core:
- what_would_make_them_return:
- what_would_make_them_stop:

## Phase 2 — Smart Taste Profile

- taste_profile_value_1_5:
- taste_profile_clarity_1_5:
- taste_profile_privacy_concern_1_5:
- expected_behavior:
- data_expected_by_participant:
- control_or_reset_needed:
- concrete_use_case:
- notes:

## Phase 3 — Smart No-Repeat

- no_repeat_value_1_5:
- no_repeat_clarity_1_5:
- exact_vs_similar_food_preference:
- useful_lookback_period:
- override_need:
- concrete_use_case:
- notes:

## Phase 4 — Meal Planner

- meal_planner_value_1_5:
- meal_planner_clarity_1_5:
- preferred_horizon: `3-day / 7-day / neither / other`
- perceived_time_or_money_value:
- must_be_editable:
- reminder_preference:
- concrete_use_case:
- notes:

## Feature ranking

- feature_rank_1:
- feature_rank_2:
- feature_rank_3:
- minimum_paid_features_needed:
- ranking_reason:

## Price — open-ended before anchor

- open_price_thb:
- open_price_reason:
- confirmed_asked_before_59: `yes / no`

ห้ามเติม `59` ลงช่อง open-ended เพียงเพราะเป็นราคา baseline ถ้าผู้เข้าร่วมไม่ได้ตอบ 59 จริง

## THB 59 proposition

Standardized intent values:

- `definitely_would_consider`
- `probably_would_consider`
- `not_sure`
- `probably_would_not`
- `definitely_would_not`

Fields:

- intent_59:
- why_59_feels_worth_or_not:
- feature_needed_to_keep_paying_next_month:
- cancellation_reason_after_one_month:
- no_free_trial_reaction:

`intent_59` คือ stated research intent เท่านั้น **ไม่ใช่ paid conversion**

## Mandatory no-prize question

ถามคำถามนี้ก่อนเปิด campaign:

> ถ้าไม่มีแคมเปญลุ้น iPhone เลย คุณยังมองว่า Premium แบบนี้น่าสมัครและน่าใช้ต่อทุกเดือนไหม? เพราะอะไร?

- no_prize_subscription_intent:
- no_prize_reason:
- participant_describes_recurring_value: `yes / no / unclear`

ห้ามใช้คำตอบนี้เป็น observed retention; เป็นเพียง stated intent จนกว่าจะมีพฤติกรรมจริงในอนาคต

## Optional comparative price anchors

ใช้เฉพาะหลัง open-ended + THB 59 และระบุชัดว่าเป็น future research anchors ไม่ใช่ current offer

- intent_69_optional:
- intent_79_optional:
- intent_99_optional:
- anchor_order_used:
- notes:

## Campaign incremental test — only after no-prize

ก่อนถามให้ย้ำว่า campaign ยัง PRE-LAUNCH, ไม่มี prize entry ปัจจุบัน, final legal/payment/rules ยังไม่เปิด และ research ไม่สร้างสิทธิ์

- campaign_interest_delta: `more / unchanged / less / unclear`
- cancel_after_draw_intent:
- campaign_trust_concern:
- information_needed_before_participating:
- campaign_notes:

## Closing synthesis for this participant

- strongest_recurring_value:
- weakest_value:
- top_objection:
- privacy_or_control_requirement:
- key_quote_or_paraphrase:
- interviewer_observation:
- protocol_deviation: `none` or describe
- record_quality: `complete / partial / exclude_from_order-sensitive-analysis`

## Integrity checklist

- [ ] ไม่มีข้อมูล participant ที่ถูกแต่งขึ้น
- [ ] participant เป็นบุคคลจริง ไม่ใช่ repo owner/developer opinion ที่นำมานับเป็น research user
- [ ] open-ended price ถูกถามก่อน THB 59 หรือมี protocol deviation ระบุชัด
- [ ] campaign ถูกเปิดเผยหลัง no-prize question หรือมี protocol deviation ระบุชัด
- [ ] stated intent ไม่ถูกเรียกว่า conversion/retention/payment
- [ ] ไม่มี claim ว่า Campaign 3,000 เปิดรับ entry
- [ ] ไม่มี PII/credential/token/payment secret ใน record
- [ ] record นี้ไม่ถูกใช้ประกาศ Payment PASS / Legal PASS / Commercial GO

## Evidence boundary

การกรอก sheet นี้ด้วยผลสัมภาษณ์จริงสามารถเป็น **ACTUAL qualitative research evidence** ของ participant รายนั้นได้ แต่ยังไม่ใช่ ACTUAL payment, subscription, retention, CAC, LTV, revenue, campaign entry หรือ Commercial GO. จำนวน participant ต้องนับจาก record จริงที่ trace ได้เท่านั้น; template ว่างนี้สร้าง participant = 0.