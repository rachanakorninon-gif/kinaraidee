# กินอะไรดี — Monetization Plan

สถานะ: **OWNER-APPROVED BUSINESS DIRECTION / PRODUCTION REVENUE NOT ESTABLISHED / COMMERCIAL NO-GO**

Canonical baseline: `BUSINESS-COMMERCIAL-BASELINE.md`.

เอกสารนี้กำหนดทิศทางรายได้หลัง Public Beta โดยแยก **แผน / สมมติฐาน / ผลจริง** ออกจากกัน และห้ามเปิดรับเงินจริงหรือนับ revenue จนกว่า Payment/Legal/Tracking/QA/Support/Security gates จะผ่านจริง

## 1) Premium Subscription — approved Beta baseline

- ราคา Beta: **59 บาท/เดือน**
- Free Trial: **ไม่มีใน Beta แรก**
- Core `ไม่รู้เลย` และ basic recommendation ต้องยังใช้ฟรีได้จริง
- Premium value direction:
  - enhanced personalization
  - Favorites/History ที่มากขึ้นหรือมีประโยชน์ขึ้น
  - advanced capabilities ตาม implementation จริง
  - ad-free หากมีโฆษณาในอนาคต

Payment direction:
- Card: 59 บาท/เดือน; auto-renew เป็น target หลัง provider/account-specific recurring-card Test Mode validation ผ่าน
- PromptPay: 59 บาทต่อ paid period; user จ่ายใหม่เองในรอบถัดไป; no auto-renew

รายละเอียด canonical: `PAYMENT-PREMIUM-DECISION.md`, `FREE-PREMIUM-FEATURE-SPLIT.md`, `PREMIUM-SUBSCRIPTION-ARCHITECTURE.md`.

ราคาที่เคยใช้เป็น research anchors เช่น 49/69/79/99 บาท **ไม่ใช่ launch price ปัจจุบัน**. หากจะทดสอบราคาใหม่ภายหลังให้สร้าง experiment ชัดเจนและห้ามแก้ launch price จาก spreadsheet margin อย่างเดียว

### หลักฐานก่อนเรียก Premium ว่า Commercial GO

- provider/account path ที่ใช้จริงผ่าน sandbox/Test Mode lifecycle
- backend-authoritative entitlement
- card renewal/failure/authentication/cancel/expiry ตาม path ที่อนุมัติ
- PromptPay provider-confirmed activation และ no-auto-renew disclosure
- refund/dispute/reconciliation process พร้อม
- Privacy/Terms/payment disclosure ผ่าน review/publish
- Production QA/Security/Support gates ผ่าน

### Business metrics หลังเปิดจริง

นับเฉพาะข้อมูล Production ที่เชื่อถือได้:
- Premium offer views
- checkout starts
- successful provider-backed payments
- backend-authoritative Premium activations
- renewal success/failure
- cancellation
- expiry
- refunds/disputes
- active Premium
- gross collected revenue
- payment fees จริง
- net/contribution revenue ตามนิยามบัญชีที่กำหนด

`checkout_start` ไม่ใช่ paid customer และ sandbox/mock ไม่ใช่ revenue.

## 2) Restaurant Affiliate / Commission — approved direction, not executed

Owner-approved direction แรกคือ **affiliate / commission จาก verifiable action หรือ transaction**.

รองรับ model ได้เมื่อมีข้อตกลงจริง เช่น:
- fixed amount per confirmed action/order
- percent of confirmed order value
- provider-defined affiliate payout

Restaurant click/search **ไม่ใช่ revenue**.

ทุก conversion ที่นำไปคิดเงินต้องมี:
- traceable conversion/reference ID หรือ evidence source
- pending / confirmed / cancelled/refunded state
- duplicate/fraud controls ตามความเสี่ยงจริง
- definition ที่ทั้งร้าน/provider และเจ้าของแอปเห็นตรงกัน
- reconciliation ทำซ้ำได้จาก source of truth

ก่อนมี provider/restaurant agreement และ confirmed commission จริง:
- Partner count = NOT ESTABLISHED
- Conversion = NOT ESTABLISHED
- Commission revenue = 0 / NOT ESTABLISHED ตามหลักฐานจริง

## 3) Sponsored Listing — later phase only

Sponsored placement พิจารณาภายหลังเมื่อมี real traffic และต้อง:
- ระบุ `โฆษณา` / `ผู้สนับสนุน` ชัดเจน
- ไม่ทำให้ผู้ใช้เข้าใจว่าเป็น organic recommendation
- รักษาความเกี่ยวข้องกับเมนู/พื้นที่/บริบทผู้ใช้
- แยก sponsored impression/click จาก organic metrics
- มี partner agreement + fulfillment/dispute path

ห้ามอ้างว่ามี sponsored partner หรือ sponsored revenue ก่อนมีข้อตกลง/การชำระเงินจริง

## 4) Restaurant Partner subscription plans — research only

แพ็กเกจแบบ Starter/Growth/Pro หรือ monthly partner fee ที่เคยเสนอไว้เป็น **research hypothesis** ไม่ใช่ approved launch model.

หากภายหลังจะทดสอบ ต้องมี:
- ร้านจริงยืนยันปัญหา/คุณค่า
- real traffic/impression/click evidence
- price/benefit research แยกจาก confirmed sales
- agreement, cancellation, refund/dispute, support และ reconciliation

Current priority is affiliate/commission direction, not publishing hypothetical partner subscription prices.

## 5) Advertising

ไม่ใช่รายได้หลักช่วงเริ่มต้น และไม่ควรเพิ่มโฆษณาจนกว่าจะมีฐานผู้ใช้/UX evidence เพียงพอ

ก่อนเปิด ads ใน Free tier ให้เปรียบเทียบอย่างน้อย:
- core-flow completion
- time-to-recommendation
- repeat usage / retention
- user complaints/support load

Premium สามารถสื่อสารว่า ad-free ได้เมื่อ Free tier มี advertising จริงและ implementation รองรับแล้วเท่านั้น

## 6) Aggregate Insights — future / legal-gated

อาจพิจารณา aggregate insights สำหรับ partner ภายหลัง โดย:
- ไม่ขาย raw personal data
- ไม่เปิดเผย precise individual location
- ใช้ aggregation/anonymization ที่มี threshold และ re-identification risk review
- สอดคล้องกับ Privacy/PDPA/legal review และ data-retention policy จริง

โมเดลนี้ยัง **ไม่อนุมัติให้เปิดขาย** ใน Beta baseline.

## 7) KPI / funnel evidence

ใช้ข้อมูล Production เท่านั้น และเชื่อมกับ canonical measurement docs.

Core product:
- landing/new user/session ตามนิยามที่อนุมัติ
- recommendation start/completion
- `ไม่รู้เลย` usage
- result engagement
- repeat usage / D1/D7/D30 เมื่อมี identity/cohort definition ที่ถูกต้อง

Premium funnel:
`premium_offer_view`
→ `premium_cta_click`
→ `checkout_start`
→ provider-backed `payment_success`
→ backend-authoritative `premium_activated`

Affiliate funnel:
`restaurant_click`
→ tracked action
→ confirmed conversion
→ approved commission
→ paid commission

ห้ามข้าม stage แล้วนับเป็นผลลัพธ์ทางธุรกิจที่ยังไม่เกิดจริง.

## 8) Revenue Experiment Record

ทุก experiment ต้องบันทึกแยก:
- Experiment ID
- วันที่เริ่ม/จบ
- version / cohort / traffic source
- hypothesis
- approved offer/price
- pre-declared primary metric
- exposure จริง
- activation/interest/checkout/paid/confirmed จริง
- cost/refund/fee ที่เกิดจริง
- qualitative feedback
- Decision: STOP / CONTINUE / SCALE
- evidence/Issue/Report reference

A/B testing ไม่ควรถูกใช้เมื่อ sample เล็กจนอ่านผลเกินจริง; เริ่มจาก one-version learning และเปลี่ยนเมื่อมีเหตุผลชัดเจน

## 9) ลำดับเปิดรายได้

1. ปิด technical/Public Beta gates ที่เกี่ยวข้อง
2. เก็บ organic Beta Product/Funnel evidence
3. Payment + Legal + Tracking + QA + Support + Security PASS ก่อน real-money Premium
4. เปิด Premium แบบ controlled acceptance ก่อน scale
5. ทดลอง affiliate/commission เมื่อมี partner/provider agreement จริง
6. Sponsored Listing หลังมี traffic จริง
7. Paid Ads scale หลัง Product/Funnel/Retention/Unit Economics มี evidence เพียงพอ
8. Advertising/aggregate insights เป็น phase หลังและต้องผ่าน UX/Privacy review

## 10) Go / No-Go ต่อโมเดลรายได้

- **Premium GO:** Payment + entitlement + cancellation/refund/dispute + Legal + Tracking + QA + Support + Security PASS
- **Affiliate/Commission GO:** real agreement + conversion truth + reconciliation + cancel/refund/dispute rules
- **Sponsored GO:** real traffic + agreement + labeling + relevance + metric separation + Privacy review
- **Partner subscription GO:** real restaurant demand + approved package/pricing + payment/agreement/support path
- **Advertising GO:** UX impact acceptable + measurement trustworthy + Privacy/ad disclosure ready
- **Insights GO:** aggregation/anonymization + retention + Privacy/legal review

ถ้า gate ใดยัง `FAIL`, `PENDING` หรือ `INCONCLUSIVE` ให้คงโมเดลนั้นเป็น **NO-GO / validation** และห้ามนับผลลัพธ์ที่ยังไม่มีหลักฐานจริง
