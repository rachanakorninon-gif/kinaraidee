# กินอะไรดี — Beta Results Review

Status: **TEMPLATE ONLY / USE AFTER PUBLIC BETA RECRUITMENT GATE OPENS / REAL DATA ONLY**

ใช้เอกสารนี้สรุปผล **หลัง recruitment gate ใน Issue #3 เปิดและเริ่มมีผู้ทดสอบจริงแล้วเท่านั้น** ระหว่างที่ gate ยังปิด ให้ถือไฟล์นี้เป็น template เตรียมพร้อม ไม่ใช่ผล Beta และไม่ใช่หลักฐานว่ามี tester/session/conversion/payment/partner/revenue เกิดขึ้นแล้ว

กรอกเฉพาะข้อมูลที่วัดได้จริงและระบุแหล่งข้อมูลให้ชัด ห้ามเติมตัวเลขสมมติ ห้ามใช้ `0`, `PASS`, `N/A` หรือเปอร์เซ็นต์แทนข้อมูลที่ยังไม่ได้เก็บ เว้นแต่มีหลักฐานจริงรองรับสถานะนั้น

คำศัพท์ที่ใช้ในรายงานนี้:
- `0` = ตรวจจากแหล่ง authoritative แล้วพบศูนย์จริง
- `NOT MEASURED` = ระบบ/แหล่งข้อมูลไม่ได้วัด metric นั้น
- `NOT AVAILABLE` = capability ยังไม่มี เช่น Premium payment ยังไม่เปิด
- `PENDING` = ต้องรอหลักฐาน/ระยะเวลา cohort/การทดสอบจริง
- QA / synthetic / owner / admin traffic ต้องแยกออกจาก real-user metrics เสมอ

## 1. รอบการทดสอบ / Runtime

- วันที่เริ่ม:
- วันที่สรุป:
- Production runtime / release SHA:
- PWA cache marker:
- Recruitment gate opened evidence:
- จำนวนผู้ทดสอบจริง:
- Android:
- iPhone:
- iPad:
- Desktop/อื่น ๆ:
- Browser/PWA mix:
- Known QA/admin/synthetic traffic excluded:

## 2. Acquisition — คนเข้ามาจากไหน

ใช้ first-party acquisition dashboard สำหรับ account attribution และใช้ platform-native reporting สำหรับ impressions/reach/clicks/spend ที่แพลตฟอร์มเป็นผู้วัด

- Reporting period:
- Reviewed UTM campaign/source/content ที่ใช้จริง:
- Landing sessions จาก Product Funnel:
- New account signups:
- Confirmed accounts:
- Signup attribution coverage:
- Referral visits/signups/confirmed referrals:
- Platform impressions/reach/link clicks: `NOT MEASURED` หากไม่มีข้อมูลจาก platform จริง
- Paid spend: `NOT RUN` จนกว่าจะมี paid campaign ที่อนุมัติและเกิดค่าใช้จ่ายจริง

ห้ามใช้ impression/click เป็น user, signup หรือ activated user โดยอัตโนมัติ

## 3. Activation / Core Product

กำหนด denominator ให้ชัดก่อนคำนวณเปอร์เซ็นต์

- Eligible new users/sessions entering measured flow:
- `selection_start` / guided-choice start:
- `dont_know_click` / Surprise usage:
- Recommendation completed / result reached:
- Recommendation errors:
- Activation definition used:
- Activation Rate (เฉพาะเมื่อ numerator/denominator มีหลักฐานจริง):
- Source/campaign/content breakdown ที่ sample เพียงพอ:

ห้ามตีความ `dont_know_click` เพียงอย่างเดียวว่าแก้ปัญหาให้ผู้ใช้สำเร็จ ต้องดู recommendation outcome และ feedback/behavior ต่อเนื่องร่วมด้วย

## 4. Result / Engagement

- กด “กินอันนี้” / accept action ที่วัดจริง:
- เลือกใหม่ / reroll:
- Favorites added:
- History use:
- Nearby / restaurant action:
- Google Maps fallback:
- Feedback submitted:
- ปัญหาที่ทำให้ผู้ใช้ละทิ้ง flow:

Reroll เป็นสัญญาณกำกวม อาจหมายถึงผลไม่ตรงใจหรือผู้ใช้กำลังสำรวจ ห้ามสรุปคุณค่าของ recommendation จาก reroll count อย่างเดียว

## 5. Repeat Usage / Retention

ระบุ cohort definition และรอให้ช่วงเวลา mature ก่อนรายงาน

- Repeat Recommendation Rate:
- D1 retention:
- D7 retention:
- D30 retention:
- Recommendations per activated user:
- Cohort start/end dates:
- Matured cohorts only?:

ห้ามรายงาน D7/D30 เป็น `0%` ถ้า cohort ยังมีอายุไม่ถึง 7/30 วัน ให้ใช้ `PENDING`

## 6. Core Flow / Recovery / Accessibility

- double-tap protection ผ่านจริงกี่อุปกรณ์:
- พบปุ่มค้าง “กำลังเลือกให้…” หรือไม่:
- recovery หลังสลับแอป/ล็อกหน้าจอ:
- recovery หลังอินเทอร์เน็ตกลับมา:
- accessibility / aria selected-state ที่ตรวจจริง:
- Keyboard focus:
- Screen reader / VoiceOver / TalkBack ที่ตรวจจริง:
- ปัญหาที่พบใน Surprise flow:

## 7. PWA / Install

- Android/PWA install ที่ทดสอบจริง:
- เปิดจากไอคอน/standalone สำเร็จ:
- iPhone Add to Home Screen guidance:
- iPadOS Safari / Mac-like User Agent:
- ปุ่ม “เข้าใจแล้ว” ทำงานถูกต้อง:
- คำแนะนำไม่เด้งซ้ำในช่วงที่กำหนด:
- update จาก cache รุ่นเก่ามา Service Worker รุ่นปัจจุบัน:
- offline app shell:

## 8. Real-device QA Gate

สรุปจาก `BETA-DEVICE-MATRIX.md` และ `BETA-RUN-LOG.md` เท่านั้น

- Android Chrome distinct models ที่ทดสอบจริง:
- iPhone Safari distinct models ที่ทดสอบจริง:
- iPadOS ที่ทดสอบจริง:
- TC-01–TC-15 PASS/FAIL/N/A:
- NF-01–NF-10 PASS/FAIL/N/A:
- Test Case ที่ยังไม่ได้ทดสอบ:
- Physical FAIL ที่มี Issue/defect link:

CI/Deployment PASS ไม่เท่ากับ Physical PASS และ historical scoped PASS ห้ามขยาย scope ไปยังรุ่น/อุปกรณ์อื่นโดยไม่มีหลักฐาน

## 9. Quality / Defects

- Blocker:
- Critical:
- Major:
- Minor:
- ปัญหาที่เกิดซ้ำมากที่สุด:
- อุปกรณ์/Browser ที่มีปัญหา:
- Defect ที่ต้องปิดก่อนเพิ่ม traffic:

`Blocker = 0` และ `Critical = 0` ใช้ได้เมื่อมี release-scoped measured defect evidence เท่านั้น การไม่มีรายงาน defect หรือ CI/static/synthetic PASS ไม่เพียงพอ

## 10. Feedback ผู้ใช้จริง

อ้างอิง `BETA-FEEDBACK-TEMPLATE.md` หรือ Feedback จริงในระบบ

- สิ่งที่ผู้ใช้คิดว่าแอปทำอะไร:
- สิ่งที่ผู้ใช้ชอบมากที่สุด:
- จุดที่สับสน:
- ปุ่ม “ไม่รู้เลย” ช่วยตัดสินใจมื้อจริงหรือไม่:
- recommendation ถูกนำไปใช้กับมื้อจริงหรือไม่:
- เมนูที่อยากให้เพิ่ม:
- ฟีเจอร์ที่ขอเพิ่ม:
- ตั้งใจกลับมาใช้ในมื้อถัดไปหรือไม่:
- กลับมาใช้จริงหรือไม่ (เมื่อวัดได้):
- สิ่งที่ผู้ใช้ขอให้แก้มากที่สุด:

แยก stated intent ออกจาก observed behavior เสมอ

## 11. Restaurant Demand / Affiliate

- Restaurant/Nearby clicks:
- เมนู demand สูง:
- พื้นที่ demand สูง:
- พื้นที่ที่ยังไม่มี partner:
- Partner result shown:
- Partner-tracked action:
- Confirmed transaction:
- Confirmed commission approved:
- Commission paid:

กฎ: `restaurant click ≠ transaction ≠ commission ≠ revenue` จนกว่าจะมี provider/partner evidence รองรับแต่ละขั้น

## 12. Premium Research — ยังไม่ใช่ยอดขาย

ใช้เฉพาะผลวิจัย/สัมภาษณ์จริง เช่น Issue #363

- จำนวน participants จริง:
- Smart Taste Profile value signal:
- Smart No-Repeat value signal:
- Meal Planner value signal:
- Feature ranking:
- Open-ended monthly price signal:
- Intent at owner-approved THB 59/month:
- No-Free-Trial reaction:
- No-prize retention intent:
- Top objections:

คำตอบว่า “59 บาทโอเค” หรือการกด CTA เป็น research/intent evidence เท่านั้น **ไม่ใช่ paid conversion, subscriber, MRR หรือ revenue**

## 13. Premium / Payment Actuals — future only

กรอกส่วนนี้ได้เมื่อ Payment/Legal/Tracking/QA/Support/Security gates อนุญาตให้มี controlled/real Premium flow แล้วเท่านั้น ก่อนหน้านั้นใช้ `NOT AVAILABLE` ไม่ใช่ `0`

- `premium_offer_view`:
- `premium_cta_click`:
- `checkout_start`:
- Provider-backed successful payments:
- Backend-authoritative `premium_activated`:
- Active Premium users:
- Card renewals due / success / action-required / failed:
- PromptPay next-period customer-initiated repurchase:
- Cancellations:
- Expired:
- Refunds:
- Disputes/chargebacks:
- Payment ↔ entitlement reconciliation mismatches:

กฎ:
- checkout ไม่ใช่ payment
- browser success redirect ไม่ใช่ payment truth
- payment success ต้องมาจาก provider/backend authority
- Premium entitlement ต้องมาจาก backend authority
- payment success แต่ entitlement ไม่ตรงกัน = Incident ไม่ใช่ clean conversion
- Test Mode / sandbox ห้ามนับเป็น Production payment หรือ revenue

## 14. Revenue / Unit Economics Actuals — future only

- Gross collected revenue:
- Refunds:
- Payment fees:
- Other variable Premium costs:
- Net/contribution definition used:
- Net/contribution actual:
- Active paid customers in denominator:
- Average paid lifetime: `PENDING` จน cohort mature
- Contribution LTV: `PENDING` จนมี retention/cost evidence

ห้ามคำนวณ revenue จาก `THB 59 × Premium CTA clicks/checkouts`

## 15. Paid Acquisition Actuals — future only

กรอกเมื่อมีงบที่เจ้าของอนุมัติและ campaign ถูกเปิดจริง

- Platform:
- Campaign/ad-set/ad IDs:
- Approved maximum budget:
- Actual spend from platform billing/reporting:
- Impressions:
- Link clicks:
- Landing sessions:
- Recommendation results:
- Confirmed accounts:
- Provider-backed paid customers:
- Cost per recommendation result:
- Cost per confirmed account:
- CAC = actual spend / actual paying customers:

ห้ามใช้ clicks/signups/checkouts เป็น denominator ของ CAC หากนิยาม CAC คือ cost per paying customer และห้ามใช้ assumed/hypothetical LTV เป็น observed economics

## 16. Data Quality Gate

ก่อนใช้ dashboard/ตัวเลขตัดสินใจ ให้ตรวจ:

- [ ] QA/admin/synthetic traffic ถูกแยกออกจาก real-user result
- [ ] duplicate/reload ไม่ทำให้ payment/revenue/funnel inflated
- [ ] UTM attribution อยู่ครบใน flow ที่ตั้งใจวัด
- [ ] account/session/user denominator ถูกกำหนดชัด
- [ ] provider payment truth ตรงกับ backend transaction
- [ ] backend Premium entitlement ตรงกับ trusted payment state
- [ ] unavailable metric ไม่ถูกแทนด้วย zero
- [ ] platform media metrics มาจาก platform authority

ถ้า tracking/data quality ไม่น่าเชื่อถือ ให้สถานะรายงานเป็น `INCONCLUSIVE` และห้ามใช้เพื่อ SCALE

## 17. การตัดสินใจรอบนี้

เลือกจากหลักฐานจริงของรอบนี้:

- [ ] `CONTINUE` — ระบบทำงานและควรเก็บ evidence เพิ่ม
- [ ] `FIX FIRST` — พบ bottleneck/defect ต้องแก้ก่อนเพิ่ม traffic
- [ ] `PAUSE` — มี Critical/measurement/payment/security/legal issue ที่ต้องหยุด
- [ ] `CHANGE` — เปลี่ยน product/copy/cohort/hypothesis และเริ่ม experiment ใหม่
- [ ] `SCALE` — ใช้ได้เฉพาะเมื่อ Product/Funnel/Tracking/Retention และ economics/gates ที่เกี่ยวข้องมีหลักฐานรองรับ

ห้ามเลือก `SCALE` จาก CTR, views, signup หรือ stated intent เพียงอย่างเดียว

## 18. Go / No-Go Notes

สรุปเหตุผลโดยอ้างอิง `BETA-METRICS.md`, `BETA-CHECKLIST.md`, `BETA-DEVICE-MATRIX.md`, `BETA-RUN-LOG.md`, `BETA-FEEDBACK-TEMPLATE.md`, `MARKETING-FIRST-100-ORGANIC-TEST.md`, `BETA-GROWTH-EXPERIMENT-PLAN.md`, `BUSINESS-COMMERCIAL-BASELINE.md` และ `RELEASE-CHECKLIST.md`

ก่อนเปิดรับเงินจริง ต้องมี release-scoped defect evidence ยืนยัน `Blocker = 0` และ `Critical = 0` พร้อม Payment/Legal/Tracking/QA/Support/Security gates ที่เกี่ยวข้องผ่านจริง การไม่มี defect report หรือมีเพียง CI/static/synthetic evidence ไม่เพียงพอให้ถือว่า gate ผ่าน

## Evidence boundary

Template นี้ไม่สร้างหรือพิสูจน์ tester, user, session, conversion, retention, payment, subscriber, partner, affiliate transaction, commission, revenue, CAC, LTV, Public Beta PASS หรือ Commercial GO ใด ๆ ตัวเลขทุกค่าต้องมาจากแหล่ง authoritative และช่วงเวลาที่ระบุไว้จริง
