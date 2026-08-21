# กินอะไรดี (Kinaraidee)

เว็บแอปช่วยตัดสินใจว่าแต่ละมื้อควรกินอะไร โดยเน้นประสบการณ์ที่ง่ายสำหรับคนที่คิดไม่ออกว่า “กินอะไรดี” และต่อยอดจากคำแนะนำเมนูไปสู่การค้นหาร้านใกล้ตัว

## สถานะปัจจุบัน — Public Beta MVP

แกนหลักสำหรับ Beta ทำงานแล้ว: เลือกเมนู → ดูร้านใกล้ตัว → ใช้ตำแหน่ง (เมื่อผู้ใช้อนุญาต) → ค้นหาร้านพาร์ตเนอร์ → fallback ไป Google Maps → เก็บ demand ของเมนูเพื่อวิเคราะห์ว่าควรเพิ่มร้านพาร์ตเนอร์ใด

Beta: https://rachanakorninon-gif.github.io/kinaraidee/

## ฟีเจอร์ผู้ใช้

- ปุ่มหลัก “🎲 ไม่รู้เลย — เลือกให้ฉันทันที” เพื่อข้ามการตั้งค่าหลายขั้นและเข้าสู่คำแนะนำทันที
- ปุ่ม Surprise มีการป้องกัน double tap, busy state, recovery หลังสลับแอป/ล็อกหน้าจอ/กลับมาออนไลน์ และ accessibility state
- เลือกมื้อ จำนวนคน งบประมาณ และประเภทอาหารแบบปกติได้
- แนะนำเมนูตามเงื่อนไขและเลือกใหม่ได้
- ชอบเมนู / กินอันนี้ / ประวัติและสถิติบนอุปกรณ์
- แชร์เมนู
- ค้นหาร้านใกล้ตัวด้วยตำแหน่ง
- แสดงร้านพาร์ตเนอร์ที่ตรงกับเมนูและเรียงตามระยะทางเมื่อมีพิกัด
- fallback ไป Google Maps เมื่อยังไม่มีร้านพาร์ตเนอร์
- ป้องกันการบันทึก demand ซ้ำจากการกดติดกันในช่วงสั้น
- ลดความละเอียดพิกัดที่จัดเก็บเพื่อวิเคราะห์ demand
- มีหน้านโยบายความเป็นส่วนตัวสำหรับช่วง Beta
- ติดตั้งเป็น PWA บนอุปกรณ์ที่รองรับและมี offline app shell
- iPhone/iPad Safari มีคำแนะนำติดตั้งแบบ Add to Home Screen พร้อมปุ่ม “เข้าใจแล้ว”; รองรับ iPadOS ที่รายงาน User Agent แบบ Mac

## ระบบสมาชิกและข้อมูลกลาง

- Supabase Authentication / โปรไฟล์สมาชิก
- ประวัติอาหารของสมาชิกพร้อม RLS แยกข้อมูลตามผู้ใช้
- Password recovery
- Beta feedback

## ระบบร้านพาร์ตเนอร์และรายได้

- แบบฟอร์มสมัครร้านพาร์ตเนอร์
- Owner review / approve / reject / contacted
- จัดการร้าน active / inactive
- menu keywords และ destination URL
- ติดตาม partner click
- รองรับ commission แบบ per-click / percent / fixed-order
- บันทึก conversion และสถานะ pending / confirmed / cancelled
- Owner dashboard / reports / conversion management
- Audit log การแก้ไขร้านพาร์ตเนอร์

## Backend / Security

- Supabase PostgreSQL + Row Level Security
- Edge Functions สำหรับ group API และ partner API
- `restaurant_requests` เปิดเฉพาะ INSERT ที่เป็น `source=app` และ `status=pending`; ไม่มี public SELECT ของพิกัดผู้ใช้
- Publishable key ใช้ฝั่ง browser; secret/service role อยู่ฝั่ง backend เท่านั้น
- ดู `SECURITY.md` สำหรับแนวทางรายงานช่องโหว่และข้อกำหนดก่อน Production

## Deployment / QA

- GitHub Pages deploy จาก branch `main` อัตโนมัติผ่าน GitHub Actions
- Static QA ตรวจโครงสร้างและไฟล์สำคัญก่อน/ระหว่างการพัฒนา
- Live smoke test ตรวจหน้า public, PWA assets, recovery route และ SEO discovery files หลัง deploy
- Service Worker ปัจจุบันใช้ cache generation `kinaraidee-beta-v10`
- `404.html` เป็น recovery route สำหรับ GitHub Pages
- `robots.txt` และ `sitemap.xml` รองรับการค้นพบหน้า Public Beta
- GitHub Issue #1 ใช้ติดตาม real-device Beta test round
- GitHub Issue #5 ใช้เป็น QA gate สำหรับ TC-01–TC-15 และ NF-01–NF-10
- `.github/ISSUE_TEMPLATE/` มีแบบฟอร์ม bug report และ beta feedback

## Public Beta Operations

เอกสารหลักสำหรับเดิน Beta แบบใช้ข้อมูลจริง:

- `BETA-CHECKLIST.md` — เกณฑ์ readiness ก่อน/ระหว่าง Beta
- `BETA-TESTER-GUIDE.md` — คู่มือส่งให้ผู้ทดสอบจริง
- `BETA-TESTER-RECRUITMENT.md` — ชุดข้อความและแนวทางรับผู้ทดสอบ
- `BETA-QUICK-START.md` — คู่มือสั้นสำหรับผู้ทดสอบรอบแรก
- `BETA-FEEDBACK-TEMPLATE.md` — แบบเก็บ Feedback/UX/Product insight/Bug จากผู้ทดสอบจริงอย่างเป็นระบบ
- `BETA-TEST-CASES.md` — Test Case TC-01 ถึง TC-15 สำหรับอุปกรณ์จริง
- `BETA-NEW-FLOW-TESTS.md` — Test Case NF-01 ถึง NF-10 สำหรับ Surprise/PWA/recovery/accessibility
- `BETA-DEVICE-MATRIX.md` — ตาราง Android/iPhone/iPadOS และผล PASS/FAIL/N/A
- `BETA-RUN-LOG.md` — บันทึกการทดสอบจริงรายเครื่องและ defect
- `BETA-METRICS.md` — ตัวชี้วัด Product/Retention/Demand/Quality
- `BETA-30-DAY-PLAN.md` — แผนดำเนิน Public Beta 30 วัน
- `BETA-RESULTS-TEMPLATE.md` — แบบสรุปผลจากข้อมูลผู้ใช้จริง
- `MONETIZATION-PLAN.md` — ลำดับทดลองรายได้และ KPI
- `RELEASE-CHECKLIST.md` — เกณฑ์ก่อนเปิดเชิงพาณิชย์
- `SECURITY.md` — แนวทาง Security และการรายงานช่องโหว่

หลักการสำคัญ: ห้ามเติมตัวเลข Beta, conversion หรือรายได้สมมติแทนข้อมูลที่วัดได้จริง และห้ามทำเครื่องหมาย Test Case ผ่านโดยไม่ได้ทดสอบบนอุปกรณ์จริง

## Gate ก่อนเพิ่มผู้ทดสอบ/Traffic

- Android Chrome เครื่องจริงอย่างน้อย 3 รุ่น
- iPhone Safari เครื่องจริงอย่างน้อย 2 รุ่น
- TC-01–TC-15 และ NF-01–NF-10 ผ่านตามกรณีที่รองรับ
- ตรวจ iPadOS Safari เพิ่มเมื่อมีอุปกรณ์จริง โดยเฉพาะกรณี User Agent แบบ Mac
- ตรวจ PWA update จาก cache รุ่นเก่ามา v10 โดยไม่บังคับผู้ใช้ล้างข้อมูลเอง
- ทุก FAIL มี defect ที่ตามแก้ได้
- Blocker = 0 และ Critical = 0

## เกณฑ์ก่อน Go-Live เชิงพาณิชย์

- ไม่มี Blocker/Critical ที่ยังเปิดอยู่
- flow หลักผ่านการทดสอบบน Android Chrome และ iPhone Safari จริง
- geolocation และ Google Maps fallback ผ่านการทดสอบจริง
- PWA ติดตั้ง/เปิดจากไอคอนได้บนแพลตฟอร์มที่รองรับ
- Feedback และ Partner application ส่งข้อมูลได้จริง
- ตรวจ RLS / secret handling / privacy อีกครั้งก่อนรับข้อมูลและเงินจริง

## สิ่งที่ต้องมีจากภายนอกก่อน Production เชิงพาณิชย์

ส่วนเหล่านี้ไม่ควรสร้างข้อมูลสมมติแทนของจริง:

1. ร้านพาร์ตเนอร์จริงและความยินยอม/ข้อตกลงค่าคอมมิชชัน
2. Merchant / payment provider สำหรับสมาชิก Premium
3. ข้อกำหนดทางกฎหมาย/นโยบายฉบับ Production และช่องทางติดต่อเจ้าของบริการ
4. บัญชี App Store / Google Play หากจะเผยแพร่เป็น native app

จนกว่าจะมีรายการเหล่านี้ ระบบเหมาะสำหรับ Public Beta เพื่อทดสอบผู้ใช้จริง เก็บ feedback และวัด demand ของเมนู/ร้านก่อนเปิดเชิงพาณิชย์
