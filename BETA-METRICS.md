# Kinaraidee — Public Beta Metrics

Status: **METRIC DEFINITIONS READY / RECRUITMENT GATE REQUIRED / NO REAL BETA RESULT IMPLIED**

เอกสารนี้กำหนดตัวชี้วัดสำหรับตัดสินว่า Public Beta สร้างคุณค่าจริงและพร้อมขยับไปสู่ Commercial Launch หรือยัง โดยไม่ใช้ตัวเลขสมมติแทนข้อมูลผู้ใช้จริง

> **Measurement gate:** ขณะที่ Issue #3 ยังไม่เปิด recruitment gate รายการด้านล่างเป็น metric definitions / instrumentation-readiness เท่านั้น ไม่ใช่ผล Beta ที่วัดแล้ว ห้ามกรอก `0`, เปอร์เซ็นต์, user/session count, conversion หรือค่าอื่นเพื่อแทน “ยังไม่มีข้อมูล” การเริ่มรายงาน cohort metrics ต้องเกิดหลัง recruitment gate เปิดและมี trusted measurement source จริง

คำศัพท์มาตรฐาน:
- `0` = authoritative source ถูกตรวจแล้วและพบศูนย์จริง
- `NOT MEASURED` = metric นั้นไม่ได้ถูกเก็บจากแหล่งที่เหมาะสม
- `NOT AVAILABLE` = capability ยังไม่มี เช่น paid Premium ยังไม่เปิด
- `PENDING` = ต้องรอ evidence หรือรอ cohort window mature
- QA / owner / admin / synthetic traffic ต้องแยกออกจาก real-user business metrics

## North-star behavior

ผู้ใช้เข้ามาเพราะ “ไม่รู้จะกินอะไร” → กด **“ไม่รู้เลย — เลือกให้ฉันทันที”** หรือเลือกเงื่อนไขเอง → ได้คำแนะนำ → ตัดสินใจกิน/หาร้านต่อได้

การกดปุ่มหรือได้ recommendation เพียงอย่างเดียวเป็น interaction/activation signal; หลักฐานว่าช่วยมื้อจริงควรดู behavior ต่อเนื่องและ feedback ผู้ใช้จริงร่วมด้วย

## Measurement authority / denominator

แยกแหล่งข้อมูลก่อนคำนวณ metric:

- Product Funnel สำหรับ reviewed UTM traffic = best-effort anonymous browser-session observations ตาม contract ปัจจุบัน
- Supabase Auth/account truth = signup / confirmed account ตาม scope ที่ระบบเก็บจริง
- Platform-native reporting = impressions, reach, clicks, spend ของแพลตฟอร์มโฆษณา/โซเชียล
- Future payment provider + backend entitlement = payment success และ Premium activation เมื่อระบบเงินจริงได้รับอนุญาต
- Partner/provider backend evidence = confirmed affiliate transaction / commission เมื่อมี agreement และ tracking จริง

ห้ามนำ session, account, click, checkout, Premium entitlement หรือ partner transaction มาแทนกันโดยไม่ประกาศ denominator/source ให้ชัด

## Acquisition

เมื่อ recruitment gate เปิดและมี traffic จริง ให้ติดตามเท่าที่วัดได้:

- landing sessions จาก Product Funnel
- new account signups
- confirmed accounts
- attribution coverage
- source / campaign / content
- referral visit / signup / confirmed referral ตาม trusted source
- platform impressions/reach/link clicks เมื่อมี public publishing จริง
- paid spend เมื่อมี budget authorization และ campaign ถูกเปิดจริง

Impression/click ไม่ใช่ user หรือ signup โดยอัตโนมัติ และ signup ไม่พิสูจน์ว่า user ได้ recommendation สำเร็จ

## Activation / Product funnel

เก็บและทบทวนอย่างน้อย:

- eligible session/user denominator ตาม experiment definition
- guided-choice / `selection_start`
- `dont_know_click` / Surprise usage
- recommendation generated / result reached
- recommendation error/failure
- result action เช่น “กินอันนี้”, save/favorite, reroll เมื่อ instrumentation รองรับ
- nearby restaurant intent / Maps action
- feedback submitted

`Activation Rate` รายงานได้เมื่อ numerator และ denominator ถูกนิยามล่วงหน้าและมาจาก measurement source ที่เชื่อถือได้เท่านั้น

ห้ามสรุปว่า `dont_know_click` แก้ปัญหาได้จริงจาก click count เพียงอย่างเดียว และ reroll เป็น signal กำกวมที่ต้องอ่านร่วมกับ feedback/result behavior

## New flow / PWA health

เก็บจากสิ่งที่วัดได้จริงเท่านั้น:

- จำนวนครั้งที่ปุ่ม Surprise ค้างหรือ recovery ไม่สำเร็จ
- double-tap / repeated-tap defect reports
- defect หลังสลับแอป/ล็อกหน้าจอ/กลับมาออนไลน์
- PWA install attempts / installs เมื่อระบบเก็บ event ได้จริง
- standalone/PWA behavior บนอุปกรณ์ที่ทดสอบ
- iPhone/iPad install guidance
- Service Worker/cache update defect หลัง upgrade
- accessibility defect เช่น label/busy/selected state, Keyboard focus, VoiceOver/TalkBack ตาม evidence จริง

ห้ามสร้าง event หรือเปอร์เซ็นต์สมมติถ้ายังไม่มี instrumentation จริง ให้ใช้ QA log / feedback / Issue เป็นหลักฐานแทน

## Retention / Repeat usage

ใช้ cohort definition ที่ประกาศไว้และรอให้ cohort mature:

- Repeat Recommendation Rate
- D1 retention
- D7 retention
- D30 retention
- recommendations per activated user ในช่วงเวลาที่กำหนด
- repeat Surprise/recommendation usage ในมื้อถัดไป

ถ้า cohort ยังไม่ครบ 7/30 วัน ห้ามรายงาน D7/D30 เป็น `0%`; ให้ใช้ `PENDING`

สำหรับผลิตภัณฑ์นี้ repeat meal occasions / D7 อาจมีความหมายมากกว่าการบังคับตีความว่าผู้ใช้ต้องกลับมาทุกวัน

## Restaurant demand / Affiliate

- Restaurant/Nearby clicks
- เมนูที่มี demand สูง
- พื้นที่ที่มี demand แต่ยังไม่มี partner
- Maps fallback
- partner result shown
- partner-tracked action
- confirmed transaction
- confirmed commission approved
- commission paid

กฎ: `restaurant click ≠ transaction ≠ commission ≠ revenue` จนกว่าจะมี provider/partner evidence รองรับแต่ละขั้น

## Quality

- Blocker/Critical bugs = ต้องเป็น 0 ก่อน commercial go-live โดย `0` ต้องมาจาก release-scoped defect evidence จริง ไม่ใช่ค่าเริ่มต้นหรือ placeholder
- `Blocker = 0` และ `Critical = 0` ใน checklist ต้องคง unchecked จนมี evidence รองรับค่าศูนย์จริง
- Major bugs ต้องมี owner/แผนแก้และไม่กระทบ core flow อย่างรุนแรง
- TC/NF ต้องใช้ผลจากอุปกรณ์จริงตาม Gate ที่กำหนด
- feedback เชิงลบที่เกิดซ้ำต้องถูกจัดกลุ่มและแก้ก่อน scale traffic

CI/Deployment PASS ไม่เท่ากับ Physical PASS และการไม่มี defect report ไม่ได้พิสูจน์ defect = 0

## Premium validation — THB 59 baseline already approved

Business baseline ปัจจุบันกำหนด Premium Beta **THB 59/month** และ no Free Trial แล้ว การทำ Beta research จึงมีเป้าหมายเพื่อ **validate value/willingness-to-pay และอาจเสนอการเปลี่ยนแปลงในอนาคต** ไม่ใช่ตีความว่าราคายังไม่มีการตัดสินใจ

ก่อน payment execution:

- feature/value ranking จาก participants จริง
- open-ended price signal ก่อน reveal THB 59 ตาม research protocol
- intent at THB 59
- no-Free-Trial reaction
- no-prize retention intent
- objections/privacy/control concerns

Research answer, CTA click หรือ checkout intent **ไม่ใช่ paid conversion, subscriber, MRR หรือ revenue**

เมื่อ Payment/Legal/Tracking/QA/Support/Security gates อนุญาตให้มี controlled payment flow จึงค่อยวัด:

- `premium_offer_view`
- `premium_cta_click`
- `checkout_start`
- provider/backend-authoritative `payment_success`
- backend-authoritative `premium_activated`
- renewal/next-period repurchase ตาม payment method
- cancellation / expiry / refund / dispute
- payment ↔ entitlement reconciliation mismatch

ก่อน capability นี้มีจริงให้ใช้ `NOT AVAILABLE` ไม่ใช่ zero

## Paid acquisition / Economics — future only

ก่อนมี approved paid campaign:

- Paid CAC = `NOT AVAILABLE` / `NOT ESTABLISHED`
- Paid conversion = `NOT AVAILABLE` / `NOT ESTABLISHED`
- LTV = `PENDING` จนมี paid retention/cost evidence
- Revenue = `NOT AVAILABLE` จนมี provider-backed real payment

เมื่อมี paid test จริง:

`CAC = actual reconciled acquisition spend / actual paying customers`

ห้ามใช้ click, signup หรือ checkout เป็น paying-customer denominator หากกำลังรายงาน CAC แบบ paid-customer และห้ามใช้ hypothetical LTV เป็น observed LTV

CTR/CPC/CPM เป็น media diagnostics ไม่ใช่เหตุผลเพียงพอสำหรับ `SCALE`

## Data Quality Gate

ก่อนใช้ metrics ตัดสินใจ:

- QA/admin/synthetic traffic ถูกแยกจาก real users
- denominator ของ session/account/user/cohort ระบุชัด
- UTM อยู่ครบใน flow ที่ต้องวัด
- duplicate/reload ไม่ inflate funnel/payment/revenue
- unavailable metric ไม่ถูกแทนด้วย zero
- payment truth ตรงกับ provider/backend และ entitlement
- platform media metrics มาจาก platform authority

ถ้า data quality ไม่น่าเชื่อถือ ให้ผลรอบนั้นเป็น `INCONCLUSIVE` และห้ามใช้เพื่อ SCALE

## Review cadence

ช่วง Public Beta ให้สรุปจากข้อมูลจริงเป็นรอบ ๆ และบันทึกว่า:

1. ผู้ใช้เข้าใจผลิตภัณฑ์และไปถึง recommendation ได้หรือไม่
2. ปุ่ม Surprise ช่วยมื้อจริงหรือเป็นเพียง interaction
3. จุดใดทำให้ผู้ใช้หลุด
4. repeat usage / retention เป็นอย่างไรเมื่อ cohort mature
5. PWA/install/recovery มี defect ซ้ำบนแพลตฟอร์มใด
6. เมนู/พื้นที่ใดมี restaurant demand จริง
7. Premium value / THB 59 proposition มี signal อย่างไรโดยไม่เรียก stated intent ว่ายอดขาย
8. bug/gate ใดต้องแก้ก่อนเพิ่ม traffic

ใช้ `BETA-DAILY-LOG.md` สำหรับ daily evidence และ `BETA-RESULTS-TEMPLATE.md` สำหรับ review summary

## Go / No-Go

Commercial launch ควรเกิดเมื่อ core flow เสถียร, ไม่มี Blocker/Critical จาก release-scoped evidence, real-device QA ผ่านตาม Gate, Tracking/Privacy/Legal/Support/Security พร้อมตาม scope, Payment PASS ถ้าจะเปิด Premiumเงินจริง และมีหลักฐานจาก Beta ว่าผู้ใช้ได้รับคุณค่าจากการช่วยตัดสินใจเรื่องอาหารจริง

ถ้า critical gate ใด `FAIL`, `PENDING` หรือ `INCONCLUSIVE` ตาม requirement ของ Commercial release ให้คง **NO-GO**

## Evidence boundary

เอกสารนี้กำหนด metric contract เท่านั้น ไม่สร้างหรือพิสูจน์ user, activation, retention, partner, payment, subscriber, revenue, CAC, LTV, Public Beta PASS หรือ Commercial GO ใด ๆ
