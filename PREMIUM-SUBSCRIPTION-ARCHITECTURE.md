# Kinaraidee — Premium / Subscription Architecture

สถานะ: **DESIGN PREPARED / PROVIDER NOT SELECTED / NO REAL MONEY FLOW ENABLED**

เอกสารนี้เตรียมสถาปัตยกรรมสำหรับ Premium แบบรายเดือนโดยไม่ผูกกับผู้ให้บริการชำระเงินรายใดก่อนมีการตัดสินใจทางธุรกิจจริง และห้ามใช้เอกสารนี้เป็นหลักฐานว่า Payment/Commercial gate ผ่านแล้ว

## หลักการสำคัญ

1. Browser/client ห้ามเป็น authority ของสถานะ Premium
2. สถานะ entitlement ต้องมาจาก backend ที่ตรวจสอบ event จาก payment provider แล้วเท่านั้น
3. ห้ามเก็บ secret key / webhook secret / service-role key ใน public repository หรือ browser bundle
4. Payment webhook ต้อง idempotent และตรวจ signature ตาม provider ที่เลือก
5. การให้สิทธิ์ต้องแยกจาก UI: ซ่อนปุ่มอย่างเดียวไม่ใช่ access control
6. ต้องรองรับ subscribe, renew, grace/past-due, cancel-at-period-end, expire, refund/revoke และ duplicate/out-of-order webhook
7. ทุก payment event ที่มีผลต่อ entitlement ต้อง trace กลับไปยัง provider event/reference ได้โดยไม่เก็บข้อมูลบัตร

## Proposed data model — ยังไม่ migrate จนกว่าจะเลือก provider

### `subscription_accounts`
- `user_id uuid primary key` → Supabase Auth user
- `provider text not null`
- `provider_customer_ref text not null`
- `created_at timestamptz`
- unique `(provider, provider_customer_ref)`

### `subscriptions`
- `id uuid primary key`
- `user_id uuid not null`
- `provider text not null`
- `provider_subscription_ref text not null`
- `plan_code text not null`
- `status text not null`
- `current_period_start timestamptz`
- `current_period_end timestamptz`
- `cancel_at_period_end boolean`
- `ended_at timestamptz`
- `updated_at timestamptz`
- unique `(provider, provider_subscription_ref)`

### `subscription_events`
ใช้เป็น idempotency/audit boundary
- `provider text not null`
- `provider_event_ref text not null`
- `event_type text not null`
- `received_at timestamptz`
- `processed_at timestamptz`
- `processing_status text`
- `error_code text` แบบ bounded/non-sensitive
- unique `(provider, provider_event_ref)`

### `member_entitlements`
แยกผลลัพธ์สิทธิ์ออกจากรายละเอียด billing
- `user_id uuid not null`
- `entitlement_code text not null`
- `active boolean not null`
- `valid_until timestamptz`
- `source_subscription_id uuid`
- `updated_at timestamptz`
- unique `(user_id, entitlement_code)`

## RLS / authorization contract

- browser user อ่าน entitlement ของตนเองได้เท่านั้น
- browser ห้าม INSERT/UPDATE/DELETE subscription, billing event หรือ entitlement โดยตรง
- webhook/backend ใช้ privileged server-side path เท่านั้น
- admin read path ต้องผ่าน owner/admin authorization ที่ตรวจได้ ไม่เปิด public table policy เพื่อความสะดวก
- entitlement check สำหรับ Premium feature ต้องยืนยัน user identity + active entitlement ที่ backend/controlled data boundary

## Payment lifecycle state contract

สถานะจริงต้อง map จาก provider ที่เลือกเข้าสู่ internal states อย่างน้อย:

- `trialing` ถ้าใช้ trial จริง
- `active`
- `past_due` หรือ grace state
- `cancel_at_period_end`
- `cancelled`
- `expired`
- `refunded/revoked` เมื่อ policy ต้องถอนสิทธิ์

ห้ามตีความ `checkout_completed` เพียง event เดียวว่าเป็น Premium ถาวร ต้องยืนยันสถานะ subscription/payment ตาม contract ของ provider

## Webhook safety contract

- verify signature ก่อน parse/process business action ตามวิธีของ provider
- กำหนด body-size limit
- reject unsupported methods/content types
- insert provider event reference แบบ unique ก่อน/ระหว่าง processing เพื่อกัน duplicate
- รองรับ event out-of-order โดยคำนวณ state จาก provider timestamps/status ไม่ใช่ arrival order อย่างเดียว
- response ไม่เผย internal database/backend errors
- logging ห้ามมี payment secret, full webhook payload, card details หรือ sensitive auth tokens

## Free vs Premium — decision template

ยังไม่กำหนดสิทธิ์จริงจนกว่าจะอนุมัติ product/pricing แต่ทุก feature ต้องถูกจัดกลุ่มก่อนเปิดเงินจริง:

| Capability | Free | Premium | Server enforcement required? | Decision |
|---|---|---|---|---|
| Core “ไม่รู้เลย” recommendation | TBD | TBD | ถ้ามี limit | TBD |
| History sync | TBD | TBD | Yes if Premium-only | TBD |
| Favorites | TBD | TBD | Yes if Premium-only | TBD |
| Group mode | TBD | TBD | Yes if Premium-only/limited | TBD |
| Nearby partner discovery | TBD | TBD | Usually no | TBD |
| Advanced personalization | TBD | TBD | Yes | TBD |

หลักการ: Public Beta core value ต้องไม่ถูกเปลี่ยนเป็น paywall โดยอัตโนมัติจากเอกสารนี้

## Checkout / account UX contract

ก่อนเปิด flow จริง UI ต้องมีอย่างน้อย:
- ราคา/รอบบิล/สกุลเงินที่ชัดเจน
- สิทธิ์ที่ได้รับ
- เงื่อนไขต่ออายุอัตโนมัติถ้ามี
- ช่องทางยกเลิก
- ลิงก์ Privacy/Terms/refund policy ที่ใช้จริง
- สถานะหลัง redirect/reopen ที่ตรวจจาก backend ไม่เชื่อ query string ฝั่ง client
- loading/error/retry ที่ไม่ทำให้ charge ซ้ำ

## Required test matrix before real money

### Happy path
- create checkout/session
- payment success
- webhook verified
- entitlement active
- app sees Premium after refresh/relogin

### Renewal
- renewal success keeps entitlement
- duplicate renewal webhook is idempotent

### Failure / grace
- payment failure does not silently grant permanent Premium
- grace-period behavior follows approved policy
- recovery payment restores correct state

### Cancellation
- cancel immediately vs cancel-at-period-end follows chosen policy
- entitlement end time matches policy/provider state

### Refund / dispute
- refund/chargeback handling explicitly tested
- entitlement revoke/retain rule documented

### Security
- forged webhook rejected
- duplicate/out-of-order events safe
- normal user cannot mutate subscription/entitlement tables
- cross-user read blocked
- public repository/browser bundle contains no private payment credentials

## Operations requirements

ก่อน Commercial GO ต้องระบุ:
- payment owner
- incident/support contact
- reconciliation procedure ระหว่าง provider กับ database
- refund/dispute owner
- webhook failure monitoring/alert channel
- emergency switch เพื่อหยุด checkout/new Premium traffic โดยไม่ทำลายสิทธิ์ผู้ใช้เดิม
- rollback procedure ที่ไม่ย้อน billing truth ผิดสถานะ

## Provider selection checklist

เมื่อพร้อมเลือก provider ให้เปรียบเทียบอย่างน้อย:
- รองรับธุรกิจ/merchant ในประเทศไทยตามสถานะจริงของเจ้าของบริการ
- recurring subscription support
- THB/ภาษี/ใบเสร็จตาม requirement จริง
- webhook quality + idempotency/reference model
- customer portal/cancel flow
- refund/dispute handling
- fee structure
- PDPA/data-processing terms
- integration path สำหรับ Web/PWA และ native store ในอนาคต

## Native-store boundary

หากภายหลังขาย digital subscription ใน native iOS/Android app ต้องตรวจ Apple/Google store policy ณ เวลานั้นก่อน implementation จริง ห้ามสมมติว่า Web payment flow สามารถใช้เหมือนเดิมใน native distribution ทุกกรณี

## Commercial gate

Architecture preparation จะถือว่าเสร็จเมื่อเอกสารนี้ผ่าน repository CI/review แต่ Payment/Premium gate ยัง **ไม่ผ่าน** จนกว่า:
- provider/merchant account ถูกเลือกจริง
- ราคาและ Free/Premium entitlements ถูกอนุมัติ
- schema/backend/webhook ถูก implement และ security-reviewed
- sandbox/test-mode lifecycle ผ่าน
- production configuration ถูกยืนยัน
- real-money flow ผ่าน acceptance ตามขอบเขตที่ได้รับอนุมัติ
- refund/dispute/support/monitoring พร้อมใช้งานจริง

ห้ามสร้าง payment success, subscriber count, MRR, conversion หรือ revenue สมมติแทนหลักฐานจริง
