# กินอะไรดี — Public Beta Daily Log

Status: **TEMPLATE ONLY / USE AFTER RECRUITMENT GATE OPENS / REAL OBSERVATIONS ONLY**

ใช้ไฟล์นี้บันทึกสิ่งที่เกิดขึ้นจริงในแต่ละวันของ Public Beta **หลัง recruitment gate ใน Issue #3 เปิดแล้วเท่านั้น** ระหว่างที่ gate ยังปิด ให้ถือไฟล์นี้เป็น template เตรียมพร้อม ไม่ใช่หลักฐานว่ามี tester traffic หรือ Public Beta เริ่มแล้ว

> กรอกเฉพาะข้อมูลที่เกิดขึ้นจริงและระบุแหล่งข้อมูลที่เหมาะสม หากยังไม่มีข้อมูล ห้ามเติม `0`, `PASS`, เปอร์เซ็นต์ หรือจำนวนเพื่อแทนช่องว่าง

คำศัพท์มาตรฐาน:
- `0` = ตรวจ authoritative source แล้วพบศูนย์จริง
- `NOT MEASURED` = metric ไม่ได้ถูกเก็บจากแหล่งที่เหมาะสม
- `NOT AVAILABLE` = capability ยังไม่มี เช่น paid Premium ยังไม่เปิด
- `PENDING` = ต้องรอ evidence / physical test / cohort maturity
- `N/A` = ไม่เกี่ยวข้องจริงและมีเหตุผลรองรับ
- QA / owner / admin / synthetic traffic ต้องแยกออกจาก real-user metrics

## Daily entry template

### วันที่: YYYY-MM-DD

**Runtime / evidence scope**
- Production runtime / release SHA:
- PWA cache marker:
- Recruitment gate evidence/reference:
- Reporting window + timezone:
- Known QA/admin/synthetic traffic excluded:

**Acquisition**
- Landing sessions จาก Product Funnel:
- New account signups:
- Confirmed accounts:
- Attribution coverage:
- Source / campaign / content:
- Referral visit / signup / confirmed referral:
- Platform impressions/reach/clicks: `NOT MEASURED` ถ้าไม่มี platform-native evidence
- Paid spend: `NOT RUN` จนกว่าจะมี approved campaign จริง

อย่านับ impression/click เป็น user หรือ signup และอย่านับ account เป็น activated user โดยอัตโนมัติ

**Activation / Core flow**
- Eligible denominator ที่ใช้:
- Guided-choice / `selection_start`:
- `dont_know_click` / “ไม่รู้เลย”:
- Recommendation result reached:
- Recommendation errors:
- Activation Rate (เมื่อ numerator/denominator เชื่อถือได้):
- “กินอันนี้” / accept action:
- Reroll / เลือกใหม่:
- Favorite / History action:
- Nearby / Maps action:

การกด “ไม่รู้เลย” ไม่ได้พิสูจน์ว่าช่วยตัดสินใจมื้อจริง ต้องดู result/feedback/repeat behavior ประกอบ และ reroll เป็น signal กำกวม

**Repeat / Retention**
- ผู้ใช้/บัญชีที่กลับมา ตาม cohort definition:
- Repeat Recommendation Rate:
- D1 cohort ที่ mature:
- D7 cohort ที่ mature:
- D30 cohort ที่ mature:
- Recommendations per activated user:

ถ้า cohort ยังไม่ครบช่วงเวลา ให้ใช้ `PENDING` ไม่ใช่ `0%`

**QA / Physical evidence**
- อุปกรณ์/Browser ที่ทดสอบจริง:
- TC ที่ทดสอบวันนี้:
- NF ที่ทดสอบวันนี้:
- PASS:
- FAIL:
- N/A พร้อมเหตุผล:
- Blocker:
- Critical:
- Major:
- Minor:
- Physical FAIL Issue/defect reference:

CI/Deployment PASS ไม่เท่ากับ Physical PASS และการไม่มี defect report ไม่ใช่ `Blocker = 0` / `Critical = 0`

**PWA / Mobile**
- install / Add to Home Screen:
- standalone reopen:
- Service Worker/cache update:
- offline/recovery:
- iPhone/iPad guidance:
- accessibility / selected-state / Keyboard / VoiceOver/TalkBack evidence:

**Feedback ผู้ใช้จริง**
- Feedback ใหม่:
- สิ่งที่ผู้ใช้เข้าใจว่าแอปทำอะไร:
- สิ่งที่ชอบซ้ำ:
- จุดสับสนซ้ำ:
- recommendation ช่วยมื้อจริงหรือไม่:
- feature request ซ้ำ:
- stated intent กลับมาใช้:
- observed repeat behavior เมื่อมี:
- ปัญหาที่ควรแก้ก่อนเพิ่ม traffic:

แยกสิ่งที่ผู้ใช้ “บอกว่าจะทำ” ออกจาก behavior ที่ระบบ/การสังเกตยืนยันได้

**Restaurant / Affiliate signal**
- Restaurant/Nearby clicks:
- เมนู demand ที่เห็น:
- พื้นที่ demand:
- Partner result shown:
- Partner-tracked action:
- Confirmed transaction:
- Confirmed commission approved:
- Commission paid:

`restaurant click ≠ transaction ≠ commission ≠ revenue` จนกว่าจะมี partner/provider evidence จริง

**Premium research — ยังไม่ใช่ยอดขาย**
- Participants / source:
- Feature/value signal:
- Open-ended price signal:
- Intent at owner-approved THB 59/month:
- No-Free-Trial reaction:
- No-prize retention intent:
- Top objection:

THB 59 เป็น owner-approved Beta proposition แล้ว แต่ interview answer / CTA interest ไม่ใช่ paid conversion

**Premium / Payment actuals — future only**
ใช้ `NOT AVAILABLE` จนกว่า Payment/Legal/Tracking/QA/Support/Security gates อนุญาต controlled/real Premium flow

- Premium offer views:
- Checkout starts:
- Provider-backed successful payments:
- Backend-authoritative Premium activations:
- Renewal / PromptPay next-period repurchase:
- Cancellation / expiry:
- Refund / dispute:
- Payment ↔ entitlement mismatch:
- Gross collected revenue:
- Payment fees / refunds:

Browser redirect/checkout ไม่ใช่ payment truth และ Test Mode/sandbox ไม่ใช่ Production payment/revenue

**Paid acquisition — future only**
- Platform/campaign:
- Approved maximum budget:
- Actual reconciled spend:
- Impressions / clicks:
- Landing sessions:
- Recommendation results:
- Confirmed accounts:
- Actual paying customers:
- CAC = actual spend / actual paying customers:

CTR/CPC เป็น diagnostic; ห้ามเลือก SCALE จาก media metric เพียงอย่างเดียว

**Data quality check**
- [ ] QA/admin/synthetic traffic ถูกแยก
- [ ] session/account/user denominator ชัด
- [ ] UTM/source attribution ใช้งานตามที่ตั้งใจ
- [ ] duplicate/reload ไม่ inflate metric
- [ ] unavailable metric ไม่ถูกแทนด้วย zero
- [ ] payment/entitlement ใช้ trusted backend/provider truth เมื่อ applicable
- [ ] platform metrics มาจาก platform authority

ถ้า data quality ไม่น่าเชื่อถือ ให้ระบุ `INCONCLUSIVE` และห้ามใช้รอบนั้นเพื่อ SCALE

**งานที่ทำวันนี้**
- แก้ไข:
- Commit/PR/Issue ที่เกี่ยวข้อง:
- Retest:

**การตัดสินใจสำหรับวันถัดไป**
- [ ] `CONTINUE` — เดินต่อด้วย traffic/cohort เดิม
- [ ] `FIX FIRST` — หยุดเพิ่ม traffic เพื่อแก้ bottleneck/defect
- [ ] `PAUSE` — มี Critical/measurement/payment/security/legal issue
- [ ] `CHANGE` — เปลี่ยน hypothesis/product/copy/cohort และเริ่ม experiment ใหม่
- [ ] `SCALE` — ใช้ได้เมื่อ Product/Funnel/Tracking/Retention/economics + gates ที่เกี่ยวข้องมี evidence รองรับ
- [ ] Retest defect
- [ ] เก็บข้อมูลเพิ่มก่อนตัดสินใจ

ห้ามเลือก `SCALE` จาก CTR, views, signup หรือ stated intent เพียงอย่างเดียว

**หมายเหตุ:**

---

## Weekly checkpoint

เมื่อครบแต่ละ 7 วัน ให้สรุปจาก Daily Log + `BETA-RUN-LOG.md` + `BETA-FEEDBACK-TEMPLATE.md` + `BETA-METRICS.md` + metrics ที่วัดได้จริง

- Cohort/reporting window:
- Acquisition:
- Activation:
- Repeat/Retention (เฉพาะ matured cohorts):
- สิ่งที่ดีขึ้น:
- ปัญหาที่เกิดซ้ำ:
- Blocker/Critical ที่ยังเปิด:
- Core flow พร้อมเพิ่ม traffic หรือไม่:
- PWA/mobile พร้อมหรือไม่:
- Restaurant demand / verified affiliate stage:
- Premium research signal:
- Premium/payment actual: `NOT AVAILABLE` จน gate เปิด
- Paid acquisition actual: `NOT RUN` จนมี authorization/launch
- Data quality: TRUSTWORTHY / INCONCLUSIVE + เหตุผล
- การตัดสินใจสัปดาห์ถัดไป: CONTINUE / FIX FIRST / PAUSE / CHANGE / SCALE

ห้ามสร้างจำนวนผู้ใช้, PASS rate, conversion, retention, subscriber, partner, revenue, CAC หรือ LTV ขึ้นเองเพื่อเติมช่องว่าง

## Evidence boundary

Daily Log นี้เป็นแบบบันทึก ไม่สร้าง Public Beta traffic หรือผลธุรกิจเอง ทุกค่าต้องมาจาก evidence source จริงในช่วงเวลาที่ระบุ และต้องคงแยก QA/synthetic, real user, account, payment, Premium, partner, revenue และ paid-media evidence ออกจากกัน
