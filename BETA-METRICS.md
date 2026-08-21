# Kinaraidee — Public Beta Metrics

เอกสารนี้กำหนดตัวชี้วัดสำหรับตัดสินว่า Public Beta พร้อมขยับไปสู่ Commercial Launch หรือยัง โดยไม่ใช้ตัวเลขสมมติแทนข้อมูลผู้ใช้จริง

## North-star behavior
ผู้ใช้เข้ามาเพราะ “ไม่รู้จะกินอะไร” → กด **“ไม่รู้เลย — เลือกให้ฉันทันที”** หรือเลือกเงื่อนไขเอง → ได้คำแนะนำ → ตัดสินใจกิน/หาร้านต่อได้

## Product funnel
เก็บและทบทวนอย่างน้อย:
- จำนวน session / ผู้ใช้ Beta
- จำนวนครั้งที่กด “ไม่รู้เลย — เลือกให้ฉันทันที”
- surprise flow success / fail / interrupted
- recommendation generated
- recommendation reroll / เลือกใหม่
- “กินอันนี้” / save/favorite
- nearby restaurant intent
- partner result shown
- partner click
- Google Maps fallback
- feedback submitted

## New flow / PWA health
เก็บจากสิ่งที่วัดได้จริงเท่านั้น:
- จำนวนครั้งที่ปุ่ม Surprise ค้างหรือ recovery ไม่สำเร็จ
- double-tap / repeated-tap defect reports
- จำนวน defect หลังสลับแอป/ล็อกหน้าจอ/กลับมาออนไลน์
- PWA install attempts / installs เมื่อระบบเก็บ event ได้จริง
- เปิดจาก standalone/PWA ได้หรือไม่บนอุปกรณ์ที่ทดสอบ
- iPhone/iPad install guidance แสดงถูกต้องหรือไม่
- จำนวนครั้งที่คำแนะนำ iOS/iPadOS แสดงซ้ำผิดปกติหลังผู้ใช้กด “เข้าใจแล้ว”
- Service Worker/cache update defect reports หลัง upgrade
- Accessibility defect ของปุ่ม Surprise เช่น label/busy/disabled state

ห้ามสร้าง event หรือเปอร์เซ็นต์สมมติถ้ายังไม่มีระบบเก็บข้อมูลนั้นจริง ให้ใช้ QA log / feedback / issue เป็นหลักฐานแทนจนกว่าจะมี instrumentation ที่ตรวจสอบได้

## Retention
- ผู้ใช้กลับมาใช้อีกหรือไม่
- จำนวนวันใช้งานต่อผู้ใช้ในช่วง Beta
- repeat recommendation sessions
- ผู้ใช้กลับมาใช้ปุ่ม Surprise ในมื้อถัดไปหรือไม่

## Restaurant demand
- เมนูที่มี demand สูง
- พื้นที่ที่มี demand แต่ยังไม่มี partner
- จำนวนครั้งที่ต้อง fallback ไป Maps
- partner click-through เมื่อมีร้านตรงกับเมนู

## Quality
- Blocker/Critical bugs = ต้องเป็น 0 ก่อน commercial go-live
- Major bugs: ต้องมี owner/แผนแก้และไม่กระทบ core flow อย่างรุนแรง
- อัตรา flow สำเร็จจากเริ่มเลือกจนถึง recommendation เมื่อมี instrumentation ที่เชื่อถือได้
- TC-01–TC-15 และ NF-01–NF-10 ต้องมีผลจากอุปกรณ์จริงตาม Gate ที่กำหนด
- feedback เชิงลบที่เกิดซ้ำต้องถูกจัดกลุ่มและแก้ก่อน scale traffic

## Monetization validation
ก่อนตั้งราคา/คาดการณ์รายได้จริง ให้ใช้ข้อมูล Beta เพื่อดู:
- ผู้ใช้ต้องการฟีเจอร์ Premium ใดจริง
- ร้านสนใจรูปแบบ commission / package ใด
- partner click และ conversion ที่ verify ได้
- ต้นทุน acquisition เมื่อเริ่มทดลองแคมเปญจริง

## Review cadence
ช่วง Public Beta ให้สรุป metrics เป็นรอบ ๆ และบันทึกการตัดสินใจว่า:
1. อะไรทำงานดี
2. จุดใดทำให้ผู้ใช้หลุด
3. Surprise flow ช่วยลดเวลาตัดสินใจจริงหรือไม่
4. PWA/install/recovery มี defect ซ้ำบนแพลตฟอร์มใด
5. เมนู/พื้นที่ใดควรหา partner เพิ่ม
6. bug ใดต้องแก้ก่อนเพิ่ม traffic
7. feature ใดควรอยู่ Free หรือ Premium

## Go / No-Go
Commercial launch ควรเกิดเมื่อ core flow และ Surprise flow เสถียร, ไม่มี Blocker/Critical, real-device QA ผ่านตาม Gate, privacy/security/payment ที่เกี่ยวข้องพร้อม และมีหลักฐานจาก Beta ว่าผู้ใช้ได้รับคุณค่าจากการช่วยตัดสินใจเรื่องอาหารจริง
