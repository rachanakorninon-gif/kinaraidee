# กินอะไรดี — Growth / Paid Acquisition Experiment Runbook

Status: **PLAN / TEMPLATE ONLY — NO AD SPEND AUTHORIZED — PAID ACQUISITION LOCKED FROM SCALE**

Canonical references:
- `BUSINESS-COMMERCIAL-BASELINE.md`
- `COMMERCIAL-READINESS-MATRIX.md`
- `BETA-METRICS.md`
- `BETA-DAILY-LOG.md`
- `BETA-RESULTS-TEMPLATE.md`
- `MONETIZATION-PLAN.md`
- Issue #2 — Commercial readiness
- Issue #3 — Public Beta recruitment gate

เอกสารนี้เตรียมขั้นตอน Growth / Paid Acquisition ไว้ล่วงหน้า แต่ **ไม่ใช่คำอนุมัติให้เปิดโฆษณา ใช้งบ เพิ่ม traffic หรือ SCALE** และไม่สร้าง user, conversion, CAC, LTV, payment หรือ revenue ใด ๆ

## 1. Evidence language

ใช้คำต่อไปนี้ให้แยกกันเสมอ:

- **PLAN** — สิ่งที่เตรียมจะทำเมื่อ gate เปิด
- **HYPOTHESIS** — สิ่งที่ต้องทดลอง ไม่ใช่ผลลัพธ์หรือ benchmark ที่ยืนยันแล้ว
- **ACTUAL** — ค่าที่มาจาก Production/platform/provider source of truth จริงในช่วงที่กำหนด
- **PENDING** — ต้องรอ gate / cohort / evidence
- **INCONCLUSIVE** — มีข้อมูลแต่ยังเชื่อถือ/ตีความไม่ได้พอ
- **STOP / CONTINUE / SCALE** — decision หลังอ่าน evidence ตามกติกาในเอกสารนี้

ห้ามนำ PLAN หรือ HYPOTHESIS ไปกรอกเป็น ACTUAL แม้ตัวเลขจะดูสมเหตุสมผลก็ตาม

## 2. Current launch authority

สถานะปัจจุบัน:

- Public Beta recruitment: **NOT OPEN**
- Paid acquisition: **NO LAUNCH AUTHORITY / LOCKED FROM SCALE**
- Commercial GO: **NO-GO**

ดังนั้นสิ่งที่ทำได้ตอนนี้คือเตรียม campaign taxonomy, UTM, creative hypotheses, experiment design, reporting template และ CI/evidence guard เท่านั้น

สิ่งที่ต้องมี **owner explicit approval** ก่อนดำเนินการจริง:

- เปิด campaign / boost / ad set
- ใส่หรือเพิ่ม budget
- เชื่อม billing/payment method เพื่อ spend
- เปลี่ยน spend cap
- SCALE campaign
- เริ่มโฆษณา Premium ที่รับเงินจริงก่อน Payment/Legal/QA/Support/Security path ที่เกี่ยวข้องพร้อม

การมี account, pixel, creative, UTM หรือ dashboard พร้อมไม่เท่ากับได้รับอนุญาตให้ spend

## 3. Acquisition phases — planning targets, not actual users

จำนวนด้านล่างเป็น **planning ranges / hypotheses** เท่านั้น ห้ามรายงานว่าเป็นจำนวนผู้ใช้จริงจนมี evidence:

### Phase A — Closed Beta

- planning range: **10–20 testers**
- paid ads: **OFF**
- focus: comprehension, core flow, obvious defects, real-meal usefulness

### Phase B — Controlled Beta

- planning range: **30–50 testers**
- paid ads: **OFF**
- focus: activation, repeat behavior, instrumentation/data quality, Premium proposition research

### Phase C — Wider Beta

- planning range: **100–200 testers**
- organic/referral first
- focus: funnel stability, matured retention signal, device diversity, restaurant demand

### Phase D — Paid Experiment

เปิดได้เฉพาะเมื่อ Paid Experiment Gate ด้านล่างผ่านและเจ้าของอนุมัติงบ/แพลตฟอร์มจริง

## 4. Paid Experiment Gate

ทุกข้อที่เกี่ยวข้องต้องมี evidence ก่อนเปิด paid traffic:

### Product

- [ ] core path จาก entry → selection/`ไม่รู้เลย` → recommendation/result ใช้งานจริงได้บน release ที่จะรับ traffic
- [ ] recurring user-facing defect ที่ทำให้ core flow ขาดได้รับการจัดการ
- [ ] Blocker/Critical status อ้างอิง **release-scoped defect evidence** ไม่ใช่การไม่มีรายงาน

### Tracking / data quality

- [ ] landing/source attribution ทำงานตาม intended Production flow
- [ ] `utm_source`, `utm_medium`, `utm_campaign`, `utm_content` ถูกเก็บ/ส่งต่ออย่างสม่ำเสมอใน scope ที่ตั้งใจวัด
- [ ] first-touch / last-touch definition ถูกระบุชัดเมื่อใช้
- [ ] QA/admin/synthetic/owner traffic แยกจาก real-user metrics
- [ ] reload/duplicate event ไม่ inflate conversion/revenue
- [ ] session/user/account denominator ถูกกำหนดชัด
- [ ] reporting period/timezone ถูกระบุ

### Funnel

- [ ] landing/session → activation/recommendation result สามารถคำนวณจาก trusted source ได้
- [ ] event definitions สอดคล้องกับ `BETA-METRICS.md`
- [ ] unknown/unavailable metric ไม่ถูกแทนด้วย zero

### Retention / product evidence

- [ ] มี organic/controlled Beta evidence มากพอให้เห็นปัญหา Product/Funnel ก่อนซื้อ traffic
- [ ] D1/D7/D30 ใช้เฉพาะ cohort ที่ mature ตามช่วงเวลา
- [ ] stated intent ถูกแยกจาก observed repeat behavior

### Premium-specific gate — เฉพาะถ้า creative/landing สื่อสาร Premium หรือราคา

- [ ] Payment path ที่เกี่ยวข้องผ่าน evidence gate ตาม scope
- [ ] backend-authoritative entitlement พร้อมตาม scope
- [ ] Privacy/Terms/subscription disclosure พร้อมตาม flow จริง
- [ ] cancellation/refund/dispute/support path พร้อม
- [ ] QA/Security relevant to payment flow ผ่านตาม scope

ถ้า Premium gate ยังไม่ผ่าน โฆษณาทดลองควรทดสอบ **core free product/value** เท่านั้น และต้องไม่ทำให้ผู้ใช้เข้าใจว่าชำระเงินได้แล้ว

### Spend authority

- [ ] เจ้าของระบุ platform ที่อนุมัติ
- [ ] เจ้าของระบุ maximum budget / spend cap
- [ ] เจ้าของระบุช่วงเวลา test
- [ ] billing action ที่จำเป็นได้รับ explicit approval

ถ้าข้อใดที่จำเป็นยัง FAIL / PENDING / INCONCLUSIVE → **NO PAID LAUNCH**

## 5. Proposed channel order — hypothesis, not commitment

ลำดับที่เตรียมไว้สำหรับทดสอบเมื่อ gate เปิด:

1. **Meta / Facebook** — proposed first paid channel
2. **TikTok** — proposed second channel after learning from first experiment
3. **YouTube** — proposed later channel

นี่เป็น **channel-order hypothesis** ไม่ใช่คำอนุมัติให้ spend และอาจเปลี่ยนเมื่อ organic Beta evidence หรือ audience behavior จริงชี้ว่าควรเปลี่ยน

หลักการ: เริ่ม **หนึ่ง platform ต่อหนึ่ง learning cycle** เพื่อไม่ทำให้สาเหตุของผลลัพธ์ปะปนกัน

## 6. Budget example — hypothesis only

ตัวอย่างกรอบที่เคยใช้เพื่อคิด experiment:

- **300–500 THB/day**
- **3–5 days**

นี่คือ **planning example / hypothesis เท่านั้น** ไม่ใช่ budget approval, commitment หรือ recommendation ให้เริ่ม spend โดยอัตโนมัติ

ก่อน launch จริงต้องสร้าง approved maximum budget ใหม่จากเจ้าของ และ platform billing/reporting เป็นแหล่ง ACTUAL spend เท่านั้น

## 7. Campaign / UTM taxonomy

เป้าหมายคือให้หนึ่ง click สามารถ trace กลับไปยัง platform/campaign/creative ได้โดยไม่ใช้ PII ใน UTM

### Required UTM fields

- `utm_source` — ตัวอย่าง `facebook`, `instagram`, `tiktok`, `youtube`
- `utm_medium` — ตัวอย่าง `paid_social`, `organic_social`, `referral`
- `utm_campaign` — campaign/experiment key ที่คงที่ตลอดรอบ
- `utm_content` — creative/angle/version key

ห้ามใส่ email, phone, user ID, referral secret, token หรือข้อมูลส่วนบุคคลใน UTM

### Recommended naming pattern

`utm_campaign=exp_<experiment-id>_<yyyy-mm>`

`utm_content=<angle>_<format>_<version>`

ตัวอย่างเชิงโครงสร้างเท่านั้น:

- `exp_e8_2026-10`
- `pain_short_v1`
- `social_short_v1`
- `speed_short_v1`

ตัวอย่างข้างต้นไม่แปลว่า E8 หรือเดือนนั้นถูกอนุมัติให้ launch แล้ว

## 8. Creative hypotheses

เริ่มจาก message ไม่กี่แบบเพื่อให้ sample ไม่แตกจนอ่านผลไม่ได้

### Hypothesis A — Pain / decision friction

แนวคิด: `วันนี้กินอะไรดี?`

สิ่งที่ต้องพิสูจน์: pain นี้ทำให้ target audience สนใจและไปถึง recommendation result จริงหรือไม่

### Hypothesis B — Relationship / social friction

แนวคิด: สถานการณ์ `ถามว่าจะกินอะไร แล้วตอบว่าอะไรก็ได้`

สิ่งที่ต้องพิสูจน์: social-relatable framing ดึงคนที่มี problem จริงหรือเพียงสร้าง engagement บน platform

### Hypothesis C — Speed / immediate help

แนวคิด: `ไม่ต้องคิดนาน กด “ไม่รู้เลย” แล้วให้เราช่วยเลือก`

สิ่งที่ต้องพิสูจน์: speed/value message เพิ่ม activated sessions โดยไม่ดึง low-intent traffic

Views/likes/comments ไม่พิสูจน์ Product value; ต้องตามไปถึง Product Funnel และ repeat behavior ตาม scope

## 9. One-experiment rule

แต่ละ paid cycle ต้อง pre-declare อย่างน้อย:

- Experiment ID
- owner-approved platform
- approved maximum budget
- start/end rule
- one primary hypothesis
- primary metric
- secondary diagnostics
- target landing/runtime SHA หรือ release reference
- campaign/UTM keys
- audience definition
- creative versions
- stop conditions
- decision rule

ห้ามเปลี่ยน primary metric หลังเห็นผลเพียงเพื่อให้ experiment ดูสำเร็จ

เมื่อ sample ยังเล็ก อย่าแตก audience/creative/ad-set มากเกินไปจนแต่ละ cell ไม่มีข้อมูลพออ่าน

## 10. Metric hierarchy

### Level 1 — Media diagnostics

มาจาก platform-native authority:

- actual spend
- impressions
- reach
- link clicks
- CTR
- CPC

ใช้วินิจฉัย creative/media delivery; **ไม่ใช่ Product success**

### Level 2 — Product / funnel

มาจาก trusted Product/analytics source:

- landing sessions
- selection/core start
- `dont_know_click`
- recommendation generated/result reached
- activated users/sessions ตาม definition
- result engagement
- repeat recommendation behavior

### Level 3 — Retention

- D1 / D7 / D30 เมื่อ cohort mature
- repeat recommendation rate
- recommendations per activated user

### Level 4 — Premium monetization — future only when gate permits

- `premium_offer_view`
- `premium_cta_click`
- `checkout_start`
- provider-backed successful payment
- backend-authoritative `premium_activated`
- cancellation / expiry / refund / dispute

`checkout_start` ไม่ใช่ paying customer

### Level 5 — Unit economics

- CAC = **actual paid acquisition spend / actual paying customers attributed under the declared rule**
- contribution per paid customer = actual collected revenue − actual refunds − actual payment/variable costs under declared accounting definition
- observed LTV ต้องใช้ paid lifetime/retention/cost evidence จริง

ห้ามใช้ click, signup, checkout หรือ Premium interest เป็น denominator ของ CAC เมื่อรายงาน `cost per paying customer`

## 11. STOP / CONTINUE / SCALE

### STOP

หยุด traffic เพิ่ม/experiment เมื่อพบอย่างน้อยหนึ่งข้อ:

- Critical core-flow defect ใน release ที่กำลังรับ traffic
- tracking/attribution/denominator ไม่น่าเชื่อถือจนอ่าน experiment ไม่ได้
- payment/legal/security issue ใน offer ที่โฆษณา
- creative/landing ทำให้ผู้ใช้เข้าใจผิดเกี่ยวกับ feature/price/payment availability
- spend เกิน approved cap หรือ platform delivery ผิด scope

STOP ไม่ได้แปลว่า Product ล้มเหลวเสมอไป; อาจเป็น data-quality/operations stop

### CONTINUE

ใช้เมื่อ:

- Product/Tracking ไม่มี critical issue ตาม scope
- hypothesis ยังไม่ชัดเพราะ sample/time/cohort ยังไม่พอ
- spend ยังอยู่ใน approved cap
- ไม่มีเหตุผลด้าน safety/legal/payment ที่ต้องหยุด

CONTINUE ต้องไม่ถูกใช้เพื่อไล่ spend ต่อไปเรื่อย ๆ โดยไม่มี stop/date/budget boundary

### SCALE

SCALE ได้เมื่อมี evidence ที่เหมาะสมพร้อมกัน ไม่ใช่เพียง media metric ดี:

- Product core flow stable ใน traffic ที่เกี่ยวข้อง
- Funnel conversion มี denominator ที่เชื่อถือได้
- Tracking attribution/data quality ผ่าน
- Retention/repeat signal ของ cohort ที่ mature สนับสนุนการกลับมาใช้
- ถ้ามี paid conversion: provider payment ↔ backend entitlement reconciliation ถูกต้อง
- unit economics ใช้ actual spend และ actual customers/costs
- owner ให้ explicit approval สำหรับ budget ใหม่

**ห้ามเลือก SCALE จาก CTR, CPC, views, likes, signup หรือ checkout อย่างเดียว**

## 12. Experiment report template

### Identity

- Experiment ID:
- Platform:
- Reporting timezone:
- Start:
- End:
- Runtime/release:
- Approved max budget:
- Primary hypothesis:
- Primary metric:
- Stop rule:

### Media ACTUAL — platform authority

- Actual spend:
- Impressions:
- Reach:
- Link clicks:
- CTR:
- CPC:
- Platform report/reference:

### Product ACTUAL — trusted Product source

- Landing sessions:
- Eligible sessions/users:
- Activated sessions/users:
- Recommendation results:
- Activation Rate:
- `ไม่รู้เลย` usage:
- Result engagement:
- Repeat usage:
- Data exclusions (QA/admin/synthetic):

### Retention

- D1 matured cohort:
- D7 matured cohort:
- D30 matured cohort:
- PENDING cohorts:

### Premium — only when available/authorized

- Premium offer views:
- Checkout starts:
- Provider-backed successful payments:
- Backend Premium activations:
- Payment↔entitlement mismatches:
- Refunds/disputes:

### Economics

- Cost per landing session:
- Cost per activated user:
- CAC per actual paying customer:
- Contribution/customer:
- Observed LTV: `PENDING` until evidence supports it

### Qualitative

- Top user feedback:
- Top drop-off/friction:
- Creative misconception/complaint:
- Support incidents:

### Decision

- `STOP / CONTINUE / SCALE`
- Evidence supporting decision:
- What changes next cycle:
- New budget approval reference if SCALE:

ถ้า data quality ไม่ผ่าน ให้ Decision = **INCONCLUSIVE / FIX FIRST** และห้ามสร้างตัวเลขทดแทน

## 13. First paid-cycle acceptance

หลัง owner อนุมัติ experiment จริง รอบแรกควรพิสูจน์เพียงว่าเราสามารถซื้อ traffic แบบควบคุมและวัด end-to-end ได้ ไม่ใช่พิสูจน์ว่าธุรกิจ scale ได้ในรอบเดียว

Acceptance ที่ต้องการ:

- platform spend ไม่เกิน cap
- UTM/source attribution ตรงกับ campaign จริง
- landing → Product Funnel มี data ที่อ่านได้
- QA/synthetic traffic แยกออก
- ไม่มี Critical core defect จาก traffic ที่เข้ามา
- support/complaint ถูกจับได้
- report สามารถ reconcile media metrics กับ Product metrics โดยไม่ปั้น conversion

การผ่าน first paid-cycle acceptance ยัง **ไม่ใช่ SCALE approval**

## 14. Current decision

ณ สถานะเอกสารนี้:

- Paid launch: **NO-GO / not authorized**
- Paid scale: **LOCKED**
- Actual spend: **NOT RUN unless later platform evidence proves otherwise**
- Actual CAC: **NOT AVAILABLE**
- Observed LTV: **NOT AVAILABLE / PENDING real paid lifetime evidence**
- User/conversion/payment/revenue result from this runbook: **NONE CREATED**

เมื่อ recruitment/readiness/evidence เปลี่ยน ให้ update canonical issue/gate ก่อน แล้วจึงใช้ runbook นี้เปิด experiment ผ่าน owner approval ที่เฉพาะเจาะจง
