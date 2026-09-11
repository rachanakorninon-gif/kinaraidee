# กินอะไรดี — Restaurant Partner Outreach & Qualification Pack

Status: **PREPARATION ONLY — NO OUTREACH AUTHORIZED — NO COMMERCIAL PARTNER ESTABLISHED**

Canonical references:
- `BUSINESS-COMMERCIAL-BASELINE.md`
- `MONETIZATION-PLAN.md`
- `COMMERCIAL-READINESS-MATRIX.md`
- `RESTAURANT-AFFILIATE-COMMERCIAL-EVIDENCE-TEMPLATE.md`
- Issue #2 — Commercial readiness
- Issue #123 — Partner API technical tracker

Owner-approved commercial direction: **affiliate / commission tied to a verifiable action or transaction**. Sponsored Listing remains a later phase after real traffic and separate approval/review.

เอกสารนี้เตรียมคำถาม, qualification, outreach copy และ handoff ไว้ล่วงหน้าเท่านั้น การส่งข้อความ โทร ติดต่อร้าน ตกลงราคา เซ็นสัญญา หรือยืนยัน partner ต้องได้รับ owner authorization ตามบริบทจริงก่อน

## 1. Evidence vocabulary

- **PROSPECT** — ร้าน/provider ที่อาจเหมาะ แต่ยังไม่มี commercial relationship
- **CONTACTED** — มี outreach จริงและมี evidence ว่าส่ง/ติดต่อแล้ว
- **RESPONDED** — มีคำตอบจริงจาก prospect
- **QUALIFIED** — ผ่านเกณฑ์ที่กำหนดจากข้อมูลจริง แต่ยังไม่เท่ากับ partner
- **NEGOTIATING** — กำลังคุย terms จริง
- **AGREED** — มีข้อตกลง/หลักฐาน authority ที่ชัดเจน
- **INTEGRATED** — technical path พร้อมตาม scope; ยังไม่เท่ากับมี transaction
- **LIVE PARTNER** — agreement + launched integration ตาม approved scope
- **CONFIRMED TRANSACTION** — provider/backend evidence ยืนยัน transaction ตามนิยาม contract
- **PAID COMMISSION** — มี settlement evidence จริง

ห้ามเปลี่ยน PROSPECT / form submission / click / QA fixture เป็น partner หรือ revenue โดยอัตโนมัติ

## 2. When partner outreach should start

Outreach อาจเตรียมไว้ได้ก่อน แต่การเริ่มจริงควรมีเหตุผลจาก Product/Beta evidence มากกว่าการเดาพื้นที่หรือเมนู

Preferred evidence before broad outreach:

- real restaurant/Nearby intent จากผู้ใช้จริง เมื่อ recruitment gate เปิดแล้ว
- เมนู/category demand ที่เกิดซ้ำจาก trusted data
- พื้นที่ demand ที่พอระบุได้โดยไม่ใช้ precise personal location ในเอกสารสาธารณะ
- core recommendation → restaurant continuation flow ที่ใช้งานได้ตาม scope
- partner proposition ที่อธิบายได้โดยไม่อ้าง traffic/conversion ที่ยังไม่มี

ถ้ายังไม่มี real demand evidence สามารถทำ discovery interview แบบไม่สัญญายอดขาย/traffic ได้เมื่อ owner อนุมัติ แต่ต้องติดป้ายว่า **research**, ไม่ใช่ partner acquisition result

## 3. Prospect qualification — facts only

บันทึก prospect แต่ละรายในระบบ/เอกสารที่เหมาะสมโดยใช้ข้อมูลสาธารณะหรือข้อมูลที่ผู้ติดต่อให้มาอย่างถูกต้อง หลีกเลี่ยง PII เกินจำเป็น

### Basic fit

- ร้าน/provider name:
- ประเภทธุรกิจ:
- พื้นที่ให้บริการ:
- เมนู/category ที่เกี่ยวข้องกับ demand จริง:
- ช่องทาง order/reservation/action ที่ตรวจสอบได้:
- online destination/deep-link available?:
- ผู้มีอำนาจคุย commercial terms ระบุได้หรือไม่?:

### Conversion verifiability

- มี order/action reference ที่ provider/backend ตรวจสอบได้หรือไม่?
- มี status confirmed / cancelled / refunded หรือไม่?
- มี API/webhook/report/export หรือ source of truth สำหรับ reconciliation หรือไม่?
- ป้องกัน duplicate/fraud ได้อย่างไร?
- attribution window กำหนดได้หรือไม่?

หาก conversion ยืนยันได้เฉพาะจาก client/browser claim ให้ถือว่า **commercial verification risk สูง** และ Affiliate GO ยังไม่พร้อม

### Operational fit

- menu/location availability เปลี่ยนบ่อยเพียงใด?
- order/action fulfillment ใครรับผิดชอบ?
- cancellation/refund/support route ชัดเจนหรือไม่?
- settlement/payout process ชัดเจนหรือไม่?
- มีข้อจำกัดด้าน trademark/creative/deep link หรือไม่?

### Privacy / legal fit

- integration ต้องส่งข้อมูลผู้ใช้ส่วนบุคคลหรือไม่?
- ต้องส่ง precise location หรือไม่?
- provider ต้องการ tracking identifier แบบใด?
- มี data-retention / DPA / privacy terms ที่ต้อง review หรือไม่?
- disclosure `พาร์ทเนอร์` / `โฆษณา` / affiliate ต้องแสดงอย่างไร?

## 4. Qualification decision

ใช้ decision นี้โดยไม่สร้าง score ปลอม:

- `RESEARCH ONLY` — น่าสนใจแต่ยังไม่มี demand/verification/authority พอ
- `QUALIFY FOR OUTREACH` — fit + verifiability พอให้ owner พิจารณาติดต่อ
- `TECHNICAL REVIEW REQUIRED` — conversion/provider integration ต้องตรวจเพิ่ม
- `LEGAL/PRIVACY REVIEW REQUIRED` — data/disclosure/terms มีประเด็นที่ต้อง review
- `HOLD` — ยังไม่เหมาะใน phase ปัจจุบัน
- `NEGOTIATION CANDIDATE` — มี response/authority จริงและมี commercial path ให้คุยต่อ

คำว่า `QUALIFY` ไม่เท่ากับ partner และไม่เพิ่ม Partner count

## 5. Value proposition for partner — evidence-safe version

ใช้แนวทางนี้ก่อนมี traffic/revenue proof:

> “กินอะไรดี” เป็นแอปช่วยผู้ใช้ตัดสินใจว่าแต่ละมื้อจะกินอะไร และมีเส้นทางต่อไปยังการหาร้าน/ช่องทางที่เกี่ยวข้องกับเมนูนั้น เรากำลังทดสอบโมเดลพาร์ทเนอร์ที่คิดค่าตอบแทนจาก action/transaction ที่ตรวจสอบได้ แทนการขาย traffic ที่ยังพิสูจน์ไม่ได้

ห้ามใช้ข้อความเช่น:

- “เรามีผู้ใช้จำนวนมาก” ถ้ายังไม่มี evidence
- “conversion สูง” ถ้ายังไม่มี trusted Production result
- “ช่วยเพิ่มยอดขายแน่นอน”
- “ร้านจะได้ลูกค้า X คน/เดือน” จาก forecast
- “มี partner แล้วหลายร้าน” หากยังไม่จริง

สามารถบอกได้ว่าอยู่ช่วง Beta/validation หากตรงกับสถานะจริงในเวลาที่ติดต่อ

## 6. Outreach draft — first contact

**ใช้หลัง owner อนุมัติ outreach จริงเท่านั้น**

หัวข้อ/เปิดบทสนทนา:

> สวัสดีครับ ผมดูแลโปรเจกต์ “กินอะไรดี” แอปที่ช่วยผู้ใช้เลือกเมนูเวลาคิดไม่ออกครับ ตอนนี้เรากำลังศึกษาความร่วมมือกับร้าน/ผู้ให้บริการ โดยอยากเน้นรูปแบบที่วัดผลจาก action หรือ transaction ที่ตรวจสอบได้ ไม่ใช่การคิดจากยอดคลิกอย่างเดียว

คำถามต่อ:

> อยากทราบว่าทางร้านมีช่องทางสั่งซื้อ/จอง/ทำรายการออนไลน์ที่สามารถติดตาม reference หรือสถานะรายการได้หรือไม่ และถ้าจะทดลอง affiliate/commission ทางร้านมีผู้ดูแลด้าน partnership หรือ e-commerce ที่สามารถคุยรายละเอียดได้ไหมครับ

Boundary:

> ตอนนี้เป็นช่วง validation จึงยังไม่ขอรับรองจำนวนผู้ใช้ ยอดขาย หรือ conversion จนกว่าจะมีข้อมูลจริงรองรับครับ

อย่าใส่ราคา commission, traffic forecast หรือ commitment ที่ยังไม่ได้รับอนุมัติ

## 7. Discovery call / chat questions

ถามเฉพาะที่จำเป็นและบันทึกเป็นคำตอบจริง:

1. ลูกค้าปัจจุบันสั่งซื้อ/จอง/ทำ action ผ่านช่องทางใดบ้าง?
2. ช่องทางใดมี transaction/reference ID ที่ตรวจสอบย้อนหลังได้?
3. ร้านเห็นสถานะ paid / confirmed / cancelled / refunded ได้จากอะไร?
4. ร้านเคยทำ affiliate/commission กับ platform อื่นหรือไม่? ใช้โมเดลแบบใด?
5. ถ้าทดลองกับเรา ร้านสะดวก fixed amount, percentage หรือ provider-defined payout แบบใด—โดยยังไม่ถือว่าเป็น terms ที่ตกลงแล้ว?
6. attribution ที่ร้าน/provider รองรับมีข้อจำกัดอะไร?
7. refund/cancel/fraud ทำให้ commission เปลี่ยนอย่างไร?
8. settlement/payout ปกติเป็นรอบใด และมีเอกสารอะไร?
9. ใครมี authority อนุมัติ commercial terms?
10. มีข้อกำหนดเรื่อง logo/brand/menu image/deep link/disclosure หรือไม่?
11. มี data/privacy requirement ใดที่ต้อง review ก่อน integration?
12. ถ้าจะเริ่ม controlled test ร้านต้องการอะไรจาก “กินอะไรดี” ก่อน?

คำตอบจาก discovery เป็น **research evidence** จนกว่าจะมี agreement/acceptance จริง

## 8. Negotiation preparation — no preset fictional terms

ก่อนเสนอ term จริง ให้กำหนดจาก evidence ที่มีและ owner approval:

- commission basis: confirmed action/order only
- amount/rate:
- attribution window:
- excluded/cancelled/refunded states:
- fraud/duplicate handling:
- payout schedule:
- settlement evidence:
- taxes/withholding/VAT as legally applicable and reviewed:
- data exchange:
- trademark/creative rights:
- termination:
- dispute/support path:
- pilot start/end:
- max scope/locations:

อย่าใช้ pricing example จาก planning spreadsheet เป็นข้อเสนอจริงโดยอัตโนมัติ

## 9. Controlled partner pilot gate

ก่อนเปิด real partner traffic:

- [ ] owner approves named partner/provider and commercial terms
- [ ] authority/agreement evidence exists
- [ ] conversion source of truth is provider/backend-verifiable
- [ ] duplicate/idempotency strategy exists
- [ ] cancel/refund/dispute semantics defined
- [ ] reconciliation process repeatable
- [ ] privacy/data-sharing reviewed
- [ ] required affiliate/partner/sponsored disclosure published
- [ ] destination/deep-link/menu mapping QA passed at stated scope
- [ ] support/escalation owner known
- [ ] Production rollout/rollback path defined

ถ้าข้อใด critical ยัง PENDING / FAIL / INCONCLUSIVE → **NO LIVE PARTNER PILOT**

## 10. Partner pilot reporting

รายงานแต่ละ stage แยกกัน:

### Traffic / intent

- restaurant result shown:
- restaurant clicks:
- tracked partner actions:

### Transaction

- confirmed transactions:
- cancelled/refunded transactions:
- unmatched/mismatch records:

### Commission

- approved commission count/value:
- reversed/adjusted commission:
- paid commission:
- settlement reference:

### Quality

- broken destinations:
- menu/availability mismatches:
- duplicate/fraud flags:
- support incidents:
- reconciliation discrepancies:

ห้ามใช้ `restaurant clicks × assumed conversion × assumed commission` เป็น actual revenue

## 11. Pilot decision

- `STOP` — commercial/technical/legal/data-quality issue ทำให้ pilot ไม่ควรเดินต่อ
- `FIX FIRST` — มีปัญหาแก้ได้แต่ยังไม่ควรเพิ่ม traffic
- `CONTINUE` — integration ใช้งานได้แต่ sample/evidence ยังไม่พอ
- `EXPAND` — named-partner pilot มี evidence เพียงพอและ owner อนุมัติ scope เพิ่ม

`EXPAND` ของ partner pilot ไม่เท่ากับ paid-media SCALE และไม่เท่ากับ Commercial GO ทั้งระบบ

## 12. Handoff after real agreement

เมื่อมี agreement จริง:

1. กรอก `RESTAURANT-AFFILIATE-COMMERCIAL-EVIDENCE-TEMPLATE.md`
2. sync Issue #2 commercial tracker ด้วย non-sensitive evidence
3. sync Issue #123 เฉพาะ technical/API/retention/abuse-control work ที่เกี่ยวข้อง
4. update Privacy/Terms/disclosure ตาม actual data/integration
5. QA conversion/reconciliation flow
6. เปิด pilot เฉพาะหลัง required gates ผ่าน
7. นับ partner/transaction/commission/revenue เมื่อแต่ละ stage มี authoritative evidence เท่านั้น

## 13. Current actual status

ณ ตอนที่สร้างเอกสารนี้:

- outreach launched by this file: **NO**
- contacted prospects created by this file: **0**
- qualified partners created by this file: **0**
- real commercial agreements created by this file: **0**
- confirmed transactions created by this file: **0**
- approved/paid commission created by this file: **0**
- affiliate revenue created by this file: **0**

ค่าศูนย์ข้างต้นหมายถึง **เอกสารนี้ไม่ได้สร้างเหตุการณ์เหล่านั้น** ไม่ใช่การยืนยันจากทุก source of truth ว่ายอดรวมของระบบตลอดกาลเท่ากับศูนย์

## Evidence boundary

Outreach copy, prospect list, research interview, Partner form submission, API integration, click, QA fixture หรือ proposed commercial term ไม่ใช่หลักฐานของ live commercial partner, confirmed transaction, approved commission, paid commission, revenue หรือ Commercial GO จนกว่าจะมี authoritative evidence ตาม stage นั้นจริง
