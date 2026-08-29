# Kinaraidee — 3,000 Premium Campaign

สถานะ: **PRE-LAUNCH / NOT ACCEPTING PRIZE ENTRIES**

เป้าหมายทางธุรกิจ: ใช้แคมเปญรางวัลเพื่อเพิ่มแรงจูงใจให้ผู้ใช้ดาวน์โหลด/ติดตั้ง “กินอะไรดี” และเปลี่ยนเป็นสมาชิก Premium เมื่อระบบชำระเงินจริงพร้อม โดยตั้ง milestone ที่สมาชิก Premium ที่มีสิทธิ์ครบ 3,000 คน

## Prize concept

- รางวัล: iPhone 17 Pro Max 256GB จำนวน 1 เครื่อง
- Milestone: ผู้ใช้ Premium ที่เข้าเกณฑ์ 3,000 คน
- ห้ามใช้ยอดสมมติใน UI/โฆษณา
- ก่อนระบบ Premium จริงเปิดใช้งาน UI ต้องแสดง PRE-LAUNCH และ `0 / 3,000` พร้อมคำว่า “ยังไม่เริ่มนับสิทธิ์”
- ไม่ใช้โลโก้ Apple หรือทำให้สื่อดูเหมือน Apple เป็นผู้สนับสนุน

## Eligibility contract — ต้องอนุมัติก่อนเปิดจริง

ผู้มีสิทธิ์ต้องผ่านเงื่อนไขทั้งหมดตามกติกาฉบับเต็ม เช่น:

1. มีบัญชี Kinaraidee ที่ยืนยันตัวตนตาม flow ที่ใช้งานจริง
2. มี Premium entitlement ที่ active และมาจาก backend/payment truth เท่านั้น
3. ผ่านช่วงเวลาร่วมกิจกรรมและวันตรวจสิทธิ์ตามกติกา
4. หนึ่งบัญชี/หนึ่งบุคคลใช้สิทธิ์ตามข้อกำหนดที่อนุมัติ
5. ไม่ถูก refund/revoke/fraud ตาม policy ที่อนุมัติ

Browser/localStorage/query string ห้ามเป็น authority ของสิทธิ์

## Counting contract

ตัวนับจริงต้องมาจาก backend aggregate ที่ตรวจสอบได้ เช่นจำนวน unique user ที่มี entitlement code ที่อนุมัติและ active ตาม campaign rule ณ เวลานั้น

ห้าม:
- hard-code ยอดจริงที่ไม่มาจาก backend
- ใช้จำนวนบัญชีฟรีแทนจำนวน Premium ถ้าโฆษณาระบุ Premium
- นับ test/sandbox/internal accounts เป็นยอดสาธารณะ
- นับบัญชีซ้ำหรือ entitlement ที่ถูก revoke

## Launch gates

แคมเปญเปลี่ยนจาก PRE-LAUNCH เป็น LIVE ได้ต่อเมื่อครบทุกข้อ:

- [ ] Payment provider/merchant account ถูกเลือกและใช้งานจริงได้
- [ ] Premium price และ entitlement ถูกอนุมัติ
- [ ] subscription schema/backend/webhook ถูก implement + security reviewed
- [ ] sandbox lifecycle tests ผ่าน
- [ ] production payment acceptance ผ่าน
- [ ] กติกาฉบับเต็มของกิจกรรมได้รับอนุมัติ
- [ ] ข้อกำหนด/ใบอนุญาตที่เกี่ยวข้องกับวิธีคัดเลือกผู้ได้รับรางวัลพร้อมก่อนเริ่มรับสิทธิ์
- [ ] วันเริ่ม/วันสิ้นสุด/วันตรวจสิทธิ์/วันประกาศผลถูกกำหนด
- [ ] วิธีคัดเลือกผู้ได้รับรางวัลถูกกำหนดและตรวจสอบได้
- [ ] ภาษี/การส่งมอบรางวัล/ผู้รับผิดชอบค่าใช้จ่ายถูกระบุในกติกา
- [ ] มี support/contact และ incident owner
- [ ] UI แสดงกติกาฉบับเต็มและ disclaimer ว่า Apple ไม่ใช่ sponsor
- [ ] Campaign counter ใช้ข้อมูลจริงจาก backend

## Product UX

### Home
แสดง card สั้น:
- “3,000 Premium ลุ้นรางวัลใหญ่”
- ชื่อรางวัล
- สถานะ PRE-LAUNCH หรือยอดจริงเมื่อ LIVE
- CTA ไป `campaign-3000-premium.html`

### Campaign page
PRE-LAUNCH:
- แสดงเป้าหมาย 3,000
- แสดง `0 / 3,000` พร้อมคำอธิบายว่ายังไม่เริ่มนับสิทธิ์
- อนุญาตให้สร้างบัญชีทั่วไปได้ แต่ต้องบอกชัดว่ายังไม่ใช่สิทธิ์รางวัล

LIVE (อนาคต):
- ดึง `eligible_count` จาก trusted backend endpoint
- แสดง progress แบบ real-time/near-real-time
- แสดงสถานะสิทธิ์เฉพาะผู้ใช้หลังตรวจ entitlement จาก backend
- แสดงกติกาฉบับเต็ม

## Analytics events — หลังอนุมัติ analytics contract

- `campaign_3000_banner_view`
- `campaign_3000_detail_view`
- `campaign_3000_member_cta_click`
- `campaign_3000_premium_cta_click`
- `campaign_3000_rules_view`
- `campaign_3000_eligibility_view`

ห้ามส่ง email, auth token, payment reference หรือข้อมูลส่วนบุคคลละเอียดเป็น event property

## Safety / integrity

- Rate limit endpoint ที่เปิดเผย count ตามความเหมาะสม
- Public endpoint ต้องคืน aggregate เท่านั้น ไม่คืนรายชื่อสมาชิก
- Admin override ของ campaign status/count ต้องมี audit trail ถ้าจำเป็นต้องมี
- ต้องมี kill switch เพื่อปิด CTA/การรับสิทธิ์หาก payment, legal หรือ campaign integrity มีปัญหา

## Current implementation

- `campaign-3000-premium.html`: หน้า PRE-LAUNCH ที่ไม่รับสิทธิ์รางวัล
- `data/home-surprise.js`: inject banner บนหน้า Home
- `sw.js`: cache campaign page สำหรับ PWA shell

การมีหน้า/แบนเนอร์นี้ **ไม่ถือว่าแคมเปญ LIVE** และ **ไม่ถือว่า Premium/payment gate ผ่าน**
