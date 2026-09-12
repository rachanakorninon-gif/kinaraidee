# กินอะไรดี — Premium Payment UX & Pricing Disclosure Spec

Status: **DRAFT UX/COPY SPEC / OWNER-APPROVED BUSINESS BASELINE ALIGNED / PAYMENT NOT APPROVED / LEGAL NOT APPROVED / DO NOT OPEN REAL-MONEY FLOW**

Canonical inputs:
- `BUSINESS-COMMERCIAL-BASELINE.md`
- `PAYMENT-PREMIUM-DECISION.md`
- `PREMIUM-SUBSCRIPTION-ARCHITECTURE.md`
- `PREMIUM-CUSTOMER-SUPPORT-RUNBOOK.md`
- `PRODUCTION-PRIVACY-LEGAL-DECISION.md`
- Issues #357 and #366

เอกสารนี้กำหนด UX/copy ที่ Frontend/Backend/QA สามารถใช้เตรียม flow ได้โดยไม่ทำให้ผู้ใช้เข้าใจว่าระบบรับเงินจริงพร้อมแล้ว และไม่เปลี่ยน Payment/Legal gate ให้เป็น PASS

## 1. Business facts that are approved for copy preparation

ข้อมูลด้านล่างเป็น **owner-approved business baseline**:

- Web/PWA first
- Premium Beta proposition = **59 บาท/เดือน**
- ไม่มี Free Trial ใน Beta แรก
- Free ยังคงใช้ core `ไม่รู้เลย` / recommendation ได้
- card: เป้าหมายคือ auto-renew 59 บาท/เดือน **เฉพาะหลัง provider/account-specific recurring/off-session validation ผ่าน**
- PromptPay: **59 บาทต่อ paid period**, ผู้ใช้ต้องเริ่มชำระเองแต่ละรอบ, **ไม่ต่ออายุอัตโนมัติ**
- ยกเลิก renewal ได้; Premium ที่ชำระแล้วใช้ต่อจนจบรอบที่ชำระ
- การชำระ/renewal ล้มเหลวไม่ต่ออายุ Premium
- downgrade กลับ Free ไม่ลบ Favorites/History/Preferences ทันทีเพียงเพราะเปลี่ยนแผน

สิ่งเหล่านี้เป็น business decisions ไม่ใช่หลักฐานว่า provider/account/payment path พร้อมใช้งานจริง

## 2. Current pre-launch truth

จนกว่า strict Payment + Legal + QA + Support + Security gates ที่เกี่ยวข้องจะผ่าน:

- ห้ามเปิดปุ่มรับเงินจริงแบบใช้งานได้ต่อสาธารณะ
- ห้ามแสดง copy ที่บอกหรือทำให้เข้าใจว่า card auto-renew พร้อมใช้งานแล้ว
- ห้ามแสดง PromptPay QR จริงเพื่อรับเงิน
- ห้ามให้ browser redirect/query string เปลี่ยนผู้ใช้เป็น Premium
- ห้ามใช้ Test Mode/sandbox เป็น Production payment/revenue
- ถ้ามี pricing preview ให้ระบุว่าเป็น preview/coming soon ตาม runtime ที่ใช้งานจริง

## 3. Pricing page — launch-ready content contract

ส่วนนี้เป็น **copy contract สำหรับวันที่ gate พร้อมแล้ว** ไม่ใช่การอนุญาตให้ publish ตอนนี้

### Header

**กินอะไรดี Premium**

**59 บาท / เดือน**

ข้อความ value proposition ที่ปลอดภัยกับ baseline:

> ให้ “กินอะไรดี” รู้จักคุณมากขึ้น ช่วยจำสิ่งที่คุณชอบ และเพิ่มความสะดวกในการเลือกมื้อถัดไป

อย่าใช้ `ไม่จำกัด`, `ดีที่สุด`, `แม่นยำ 100%`, จำนวนผู้ใช้, conversion หรือ social proof ที่ยังไม่มี implementation/evidence รองรับ

### Premium value bullets

แสดงเฉพาะ feature ที่ implementation ปัจจุบันรองรับจริง ณ เวลาปล่อย เช่น:

- การปรับคำแนะนำให้เข้ากับความชอบมากขึ้น
- Favorites/History ที่มากขึ้นตาม contract จริง
- Premium capabilities ที่ implement แล้วและ QA ผ่าน
- ไม่มีโฆษณา **เฉพาะเมื่อ product มีโฆษณาจริงและ Premium ad-free ถูก implement แล้ว**

Feature ที่ยังไม่ implement ให้ตัดออกจากหน้าขาย ห้ามใช้ roadmap เป็น current entitlement

### CTA

Primary:

> สมัคร Premium — 59 บาท/เดือน

Secondary:

> ใช้แบบ Free ต่อ

Free CTA ต้องยังเข้าถึง core product ได้ตาม baseline และไม่ใช้ dark pattern ทำให้ Free ดูเหมือนใช้งานไม่ได้

## 4. Pre-checkout disclosure — common fields

ก่อนออกจาก Kinaraidee ไป payment surface หรือก่อนสร้าง payment intent ที่มีผลต่อผู้ใช้ ต้องแสดงอย่างน้อย:

- ราคา: **59 บาท**
- cadence/paid period ที่ใช้จริง
- วิธีชำระเงินที่เลือก
- automatic renewal = yes/no ตาม method และ provider/account evidence จริง
- cancellation behavior
- สิทธิ์ Premium ถึงวัน/รอบใดเมื่อยกเลิก
- link/reference ไป Terms และ Privacy ที่ได้รับการอนุมัติ/เผยแพร่จริง
- support contact ที่ operational แล้ว
- refund/dispute summary ที่ตรงกับ final reviewed policy

ถ้า legal/payment field ที่ต้องใช้ยังไม่มี reviewed value → flow ยังไม่พร้อมเปิดรับเงินจริง

## 5. Card UX — only after recurring-card gate passes

### Availability rule

Card subscription UI แบบ auto-renew เปิดได้เฉพาะเมื่อ #357/#366/provider-backed Test Mode evidence ยืนยัน account-specific recurring/off-session path แล้ว และ strict gate ที่เกี่ยวข้องอนุญาต

ก่อนหน้านั้นให้ card recurring CTA disabled/hidden ตาม reviewed runtime; ห้ามเขียนว่า `ต่ออายุอัตโนมัติ` ในลักษณะ current capability

### Launch-ready disclosure when gate has passed

> ชำระ 59 บาทวันนี้ และต่ออายุอัตโนมัติทุกเดือนจนกว่าจะยกเลิก

> ยกเลิกการต่ออายุได้ทุกเมื่อ โดย Premium ที่ชำระแล้วจะใช้ได้จนถึงวันสิ้นสุดรอบปัจจุบัน

หน้าจอต้องแสดง `next renewal date` จาก backend-authoritative subscription state เมื่อมีค่า authoritative แล้ว ไม่คำนวณเดาเองจาก client clock หาก backend contract มีวันสิ้นสุดจริง

### Card first-payment result

Browser return/redirect ไม่ใช่ source of truth

สถานะระหว่างรอยืนยัน:

> กำลังยืนยันการชำระเงิน
> กรุณารอสักครู่ ระบบจะเปิด Premium หลังได้รับการยืนยันจากระบบชำระเงิน

ห้ามแสดง `Premium สำเร็จแล้ว` จน backend-authoritative entitlement ยืนยัน

### Card success

เมื่อ provider/backend ยืนยันจริง:

> เปิดใช้งาน Premium แล้ว

แสดง:
- current Premium status
- paid-period end / next renewal date จาก backend
- manage/cancel entry point
- support route

### Card failed / declined

> การชำระเงินยังไม่สำเร็จ และ Premium ยังไม่ถูกเปิดใช้งาน

ถ้า renewal fail:

> การต่ออายุยังไม่สำเร็จ ระบบยังไม่ขยายรอบ Premium กรุณาตรวจสอบวิธีชำระเงินหรือทำขั้นตอนยืนยันเพิ่มเติมตามที่ระบบแจ้ง

ห้ามบันทึก failure เป็น revenue/payment success

### Authentication/action required

ถ้า provider ระบุว่าต้องให้ลูกค้ากลับมายืนยัน:

> ต้องยืนยันการชำระเงินเพิ่มเติม
> กรุณาดำเนินการตามขั้นตอนของผู้ให้บริการชำระเงินเพื่อให้การต่ออายุสำเร็จ

ห้ามพยายาม bypass authentication

## 6. PromptPay UX — manual per paid period

PromptPay ต้องไม่ถูกวางใน UI เดียวกับคำว่า `ต่ออายุอัตโนมัติ`

### Method label

> PromptPay — 59 บาท / 1 รอบ Premium

Supporting copy:

> ชำระผ่าน QR PromptPay สำหรับรอบนี้ การชำระเงินจะไม่ต่ออายุอัตโนมัติ หากต้องการใช้ Premium ต่อในรอบถัดไป คุณต้องชำระใหม่อีกครั้ง

### QR pending

> กำลังรอการยืนยันการชำระเงิน

ผู้ใช้กด `จ่ายแล้ว` หรือกลับจากแอปธนาคารไม่ใช่ payment truth; backend ต้องรอ authoritative provider confirmation

### QR expired/unpaid

> QR นี้หมดอายุหรือยังไม่พบการชำระเงิน Premium จึงยังไม่ถูกเปิดใช้งาน

ให้สร้าง payment attempt/QR ใหม่ตาม provider contract เท่านั้น ห้าม reuse reference ที่หมดอายุแบบทำให้ reconciliation สับสน

### PromptPay success

เมื่อ provider/backend ยืนยันจริง:

> ชำระสำเร็จ เปิดใช้งาน Premium สำหรับรอบนี้แล้ว

แสดง `Premium until` จาก backend-authoritative value และบอกชัดว่าไม่มี auto-renew

### Near-expiry reminder

เมื่อ implementation รองรับและ user communication policy อนุญาต:

> Premium ของคุณจะสิ้นสุดวันที่ [actual backend date]
> หากต้องการใช้ต่อ สามารถชำระรอบถัดไปด้วย PromptPay ได้อีกครั้ง

การแจ้งเตือนต้องอาศัยวันจริงจาก backend ไม่ใช้วันที่สมมติ

## 7. Cancel renewal UX — card recurring path only

คำว่า `ยกเลิก` ต้องแยกจาก `หมดอายุ`

ก่อนยืนยัน cancel:

> ยกเลิกการต่ออายุ Premium?
> หลังยกเลิก คุณยังใช้ Premium ได้จนถึง [actual period-end date] และจะไม่มีการเรียกเก็บรอบถัดไปตามสถานะการยกเลิกที่ระบบยืนยัน

หลัง backend/provider state ยืนยัน:

> ยกเลิกการต่ออายุแล้ว
> Premium ใช้ได้ถึง [actual period-end date]

ห้าม downgrade ทันทีถ้ายังอยู่ใน paid period ตาม baseline

## 8. Expiry / downgrade UX

เมื่อ backend-authoritative paid period สิ้นสุดโดยไม่มี successful renewal/payment:

> Premium สิ้นสุดแล้ว ตอนนี้บัญชีของคุณกลับมาใช้แผน Free

> Favorites, History และ Preferences ของคุณจะไม่ถูกลบทันทีเพียงเพราะเปลี่ยนเป็น Free ทั้งนี้การเก็บข้อมูลระยะยาวเป็นไปตาม Privacy/retention policy ที่ได้รับอนุมัติและใช้งานจริง

อย่าสัญญาว่าข้อมูลจะถูกเก็บ `ตลอดไป`

## 9. Refund / duplicate / dispute wording boundary

Pricing/checkout ไม่ควรใช้ blanket claim เช่น `ไม่คืนเงินทุกกรณี`

Safe summary ก่อน final Legal review:

> การคืนเงินและการแก้ไขรายการเรียกเก็บจะพิจารณาตามกรณี เช่น รายการซ้ำ รายการผิดพลาด ปัญหาที่เกิดจากระบบ และสิทธิ์ที่กฎหมายหรือผู้ให้บริการชำระเงินกำหนด

ข้อความนี้ยังต้องผ่าน final Legal/Provider review ก่อน publish เป็น Terms/checkout disclosure

Support flow ต้องอ้าง provider/backend transaction truth ตาม `PREMIUM-CUSTOMER-SUPPORT-RUNBOOK.md`

## 10. Manage Premium states

Frontend ต้อง render จาก backend-authoritative state อย่างน้อยตามความหมายต่อไปนี้:

| State | User-facing meaning |
|---|---|
| `free` | ไม่มี active paid entitlement |
| `active` | Premium active; renewal behavior depends on payment method |
| `cancel_at_period_end` | renewal cancelled but Premium still active to paid-period end |
| `payment_action_required` | payment/renewal awaiting user authentication/action; do not extend unless success confirmed |
| `payment_failed` | payment attempt failed; no successful extension from that attempt |
| `expired` | paid entitlement ended; Free state applies |

ชื่อ technical state อาจเปลี่ยนตาม implementation แต่ความหมาย evidence boundary ต้องไม่เปลี่ยนแบบทำให้ client grant Premium เอง

## 11. Analytics / funnel copy alignment

UI event hierarchy:

`premium_offer_view`
→ `premium_cta_click`
→ `payment_method_selected`
→ `checkout_start`
→ provider/backend-authoritative `payment_success`
→ backend-authoritative `premium_activated`

Rules:
- CTA click ≠ checkout completion
- checkout start ≠ payment
- browser return ≠ payment
- provider payment success without matching entitlement = reconciliation incident
- entitlement without trusted payment basis = security/commercial incident
- Test Mode events must not enter Production paid customer/revenue totals

## 12. Youth / consent UX boundary

Owner-approved direction allows Free use subject to applicable law and requires guardian/legal-representative consent for paid Premium under 20 **where applicable law requires it**.

Exact age gate, consent text, verification mechanism and who can legally contract/pay remain **Legal/implementation review items**. Do not invent a checkbox and label it Legal PASS.

## 13. Accessibility and failure recovery

Payment UX must:
- expose validation/status/error messages programmatically and visibly
- not rely on color alone for success/failure
- retain understandable focus order after returning from provider/payment surface
- avoid duplicate submission on repeated tap/reload
- survive browser close/reopen by reading backend truth again
- provide a support route when provider and entitlement appear mismatched

Physical/device acceptance remains separate from source/static CI

## 14. QA acceptance scenarios before Payment PASS

At minimum verify with provider-backed Test Mode and applicable physical-browser/device scope:

1. card initial success
2. card initial failure
3. authentication/action-required path
4. recurring/off-session success
5. recurring/off-session failure + recovery
6. cancel at period end
7. expiry → Free
8. logout/login and refresh preserve correct entitlement
9. duplicate click/reload/webhook does not duplicate payment/entitlement
10. payment succeeds but browser closes → later login still reflects backend entitlement
11. PromptPay success
12. PromptPay QR expiry/unpaid
13. PromptPay next-period manual payment behavior
14. provider payment count reconciles with backend transactions and Premium entitlements

Any required critical scenario `PENDING / FAIL / INCONCLUSIVE` keeps Payment gate closed

## 15. Release / publication gate

This spec may merge as preparation while Commercial status remains NO-GO.

Do not turn the payment CTA live until the exact launch scope has:
- provider/account evidence
- reviewed executable backend/payment implementation
- Payment gate evidence
- Production Privacy/Terms/subscription/cancellation/refund disclosures
- QA/Support/Security readiness
- controlled Production acceptance where required

## Evidence boundary

This document defines **draft UX/copy behavior derived from the approved business baseline**. It is not final legal wording and creates no merchant account, payment, Premium subscriber, conversion, renewal, refund, revenue, Payment PASS, Legal PASS or Commercial GO.