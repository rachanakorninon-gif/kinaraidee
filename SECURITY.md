# Security Policy — กินอะไรดี

โครงการนี้อยู่ในช่วง Public Beta และให้ความสำคัญกับการปกป้องข้อมูลผู้ใช้ ข้อมูลตำแหน่ง บัญชีสมาชิก และข้อมูลร้านพาร์ตเนอร์

## ถ้าพบช่องโหว่
อย่าโพสต์ข้อมูลที่ทำให้ผู้อื่นนำช่องโหว่ไปใช้ซ้ำได้ทันที เช่น token, key, password, session, ข้อมูลส่วนบุคคล, พิกัดละเอียด หรือขั้นตอนโจมตีแบบครบถ้วน

หากยังไม่มี private security-reporting channel ให้เปิด GitHub Issue โดยระบุหัวข้อว่า `Security report` และใส่ **เฉพาะข้อมูลขั้นต่ำที่ปลอดภัยต่อการเปิดเผย** เช่น
- ส่วนของระบบที่ได้รับผลกระทบ
- ผลกระทบที่คาดว่าจะเกิดขึ้น
- เบราว์เซอร์/อุปกรณ์ที่ใช้
- เวลาที่พบโดยประมาณ
- ขั้นตอนแบบย่อที่ไม่เผย credential/PII

หากรายละเอียดจำเป็นต้องมี credential, token, key, personal data, raw request ที่มีข้อมูลลับ หรือหลักฐานจากผู้ใช้จริง **ห้ามใส่ข้อมูลนั้นใน Issue สาธารณะ** ให้รอช่องทาง private ที่เจ้าของโครงการกำหนด

## Severity
- **Blocker:** มีความเสี่ยงร้ายแรงต่อผู้ใช้/ข้อมูล/ระบบ และควรหยุดเพิ่ม traffic หรือปิด flow ที่ได้รับผลกระทบทันที
- **Critical:** เข้าถึง/แก้ข้อมูลสำคัญโดยไม่ได้รับอนุญาต, secret รั่ว, auth/admin bypass หรือผลกระทบสูงที่ทำซ้ำได้
- **Major:** ช่องโหว่มีผลจริงแต่ขอบเขตจำกัดหรือมีเงื่อนไขเฉพาะ
- **Minor:** hardening/configuration issue ที่ความเสี่ยงต่ำแต่ควรแก้

Blocker/Critical ที่ยังเปิดอยู่ = NO-GO สำหรับ Commercial Release

## ขอบเขตสำคัญ
ให้ความสำคัญกับปัญหาประเภทต่อไปนี้เป็นพิเศษ
- การอ่าน/สร้าง/แก้/ลบข้อมูลที่ควรถูกจำกัดด้วย Supabase RLS
- auth/session/password recovery ที่ทำให้เข้าบัญชีอื่นได้
- owner/admin authorization bypass
- การเข้าถึงข้อมูลร้านพาร์ตเนอร์ ใบสมัคร conversion หรือ audit log โดยไม่ได้รับอนุญาต
- การรั่วไหลของ service-role key, private key, provider secret หรือ credential
- การปลอม request เพื่อสร้างข้อมูล, conversion, commission, click หรือสแปมระบบ
- XSS, injection, unsafe HTML, open redirect หรือ destination URL ที่นำผู้ใช้ไปปลายทางไม่คาดคิด
- การเปิดเผยตำแหน่งผู้ใช้ละเอียดเกินนโยบาย หรือ public SELECT ของข้อมูล location
- CORS/endpoint configuration ที่เปิด write/admin operation เกินจำเป็น
- public anonymous endpoint ที่ไม่มี retention, abuse-control หรือ monitoring strategy ที่เหมาะสมกับ traffic จริง
- dependency หรือ third-party compromise ที่กระทบ public build/backend

## หลักการสำหรับ repository สาธารณะ
- ห้าม commit service-role key, private key, password, access token หรือ credential อื่น ๆ
- publishable/anon key ใช้ได้เฉพาะเมื่อ backend/RLS policy ถูกออกแบบให้ public client ใช้งานได้อย่างปลอดภัย
- secret ต้องอยู่ใน provider secret store/environment ฝั่ง backend ที่เหมาะสม
- ทุก endpoint ที่แก้ข้อมูลสำคัญต้องตรวจ authorization และ validate payload ฝั่ง server/database
- client-side role, price, commission, entitlement หรือ conversion status ห้ามถือเป็นข้อมูลที่เชื่อถือได้โดยลำพัง
- log และ error message ไม่ควรเปิด token, secret, session หรือ PII
- production branch ต้องมี merge governance ที่บังคับ release/security checks จริง ไม่ใช่เพียงมี workflow อยู่ใน repository

## Production Security Gate
ก่อนเปิดรับเงินจริง ให้มีหลักฐานตรวจอย่างน้อย:
- [ ] RLS ทุก Production table ด้วย anonymous/authenticated/owner role ตามที่เกี่ยวข้อง
- [ ] negative test ว่าผู้ใช้ A อ่าน/แก้ข้อมูลผู้ใช้ B ไม่ได้
- [ ] owner/admin endpoints ปฏิเสธผู้ใช้ทั่วไป
- [ ] password recovery/session expiry/sign-out ทำงานตามที่ออกแบบ
- [ ] Supabase Auth leaked-password protection ถูกเปิดและ Security Advisor ถูกตรวจซ้ำ
- [ ] หากจะเปิด Auth Captcha ต้องมี reviewed client token wiring, failure/retry behavior และ real-device/accessibility evidence ก่อนเปิด server-side
- [ ] repository/public build ไม่มี secret และ credential-scanner regression ยังทำงาน
- [ ] `main` มี branch protection/ruleset + required release/security checks และมีหลักฐานว่า failing check block merge ได้จริง
- [ ] Edge Functions/API validate auth + payload สำหรับ operation สำคัญ
- [ ] public anonymous APIs มี retention/deletion policy, abuse-control strategy และ monitoring baseline ที่ได้รับอนุมัติและตรวจสอบได้
- [ ] location/restaurant request data ไม่มี public read ที่ไม่ตั้งใจ
- [ ] partner click/conversion ไม่สามารถตั้ง confirmed/commission จาก browser โดยไม่มี server verification
- [ ] dependency/security findings ระดับ Critical ถูกปิด
- [ ] rollback/disable path สำหรับ flow ที่มีความเสี่ยงพร้อมใช้งานและผ่าน drill ตาม scope ที่ใช้จริง

บันทึกผลไว้กับ `RELEASE-CHECKLIST.md` และอ้างอิง commit/issue/test evidence ที่ตรวจสอบย้อนหลังได้

## Evidence boundary
- CI/static review ยืนยันได้เฉพาะ source/configuration contract ที่มันตรวจจริง
- Deployment trace ยืนยันได้เฉพาะ artifact/version ที่เผยแพร่ ไม่แทน RLS/auth negative tests หรือ real-device behavior
- Source/deployment parity ของ Edge Function ไม่แทน live monitoring, retention cleanup, abuse-control หรือ production traffic evidence
- เอกสาร policy/runbook ไม่ใช่ PASS จนกว่าจะมีการตั้งค่า/ทดสอบ/อนุมัติจริงตาม gate นั้น
- Auth Captcha decision/configuration evidence ไม่แทน client integration, real-device/accessibility หรือ auth-flow regression evidence
- ห้ามใช้ historical PASS กับ runtime/backend ที่เปลี่ยน behavior ที่เกี่ยวข้องโดยอัตโนมัติ

## Incident Response ขั้นต่ำ
เมื่อพบเหตุที่อาจกระทบข้อมูลหรือเงินจริง:
1. จำกัดผลกระทบก่อน เช่น หยุด deploy/traffic/partner/payment flow ที่เกี่ยวข้อง
2. เก็บหลักฐานที่จำเป็นโดยไม่เผย secret หรือข้อมูลผู้ใช้เพิ่ม
3. ประเมินขอบเขต: ระบบ/ผู้ใช้/ช่วงเวลา/ข้อมูลที่อาจได้รับผลกระทบ
4. rotate/revoke credential ที่สงสัยว่ารั่ว
5. แก้ root cause และทำ regression/negative test
6. บันทึก incident, commit ที่แก้, วิธีตรวจ และ known residual risk
7. ประเมินหน้าที่แจ้งผู้ใช้/คู่ค้า/หน่วยงานตามกฎหมายและนโยบายที่ใช้จริงก่อน Production

## การตอบสนองในช่วง Beta
รายงานความเสี่ยงสูงต้องถูกจัดลำดับก่อน feature work ที่ไม่จำเป็น และ Blocker/Critical ต้องแก้ + retest ก่อนเพิ่มผู้ทดสอบหรือ traffic

ห้ามทำเครื่องหมาย security test ผ่านจาก static review เพียงอย่างเดียวเมื่อ test นั้นต้องพิสูจน์ authorization, RLS หรือ behavior ของระบบจริง
