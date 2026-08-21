# Kinaraidee — Public Beta Metrics

เอกสารนี้กำหนดตัวชี้วัดสำหรับตัดสินว่า Public Beta พร้อมขยับไปสู่ Commercial Launch หรือยัง โดยไม่ใช้ตัวเลขสมมติแทนข้อมูลผู้ใช้จริง

## North-star behavior
ผู้ใช้เข้ามาเพราะ “ไม่รู้จะกินอะไร” → ได้คำแนะนำ → ตัดสินใจกิน/หาร้านต่อได้

## Product funnel
เก็บและทบทวนอย่างน้อย:
- จำนวน session / ผู้ใช้ Beta
- จำนวนครั้งที่กด “ไม่รู้เลย”
- recommendation generated
- recommendation reroll / เลือกใหม่
- “กินอันนี้” / save/favorite
- nearby restaurant intent
- partner result shown
- partner click
- Google Maps fallback
- feedback submitted

## Retention
- ผู้ใช้กลับมาใช้อีกหรือไม่
- จำนวนวันใช้งานต่อผู้ใช้ในช่วง Beta
- repeat recommendation sessions

## Restaurant demand
- เมนูที่มี demand สูง
- พื้นที่ที่มี demand แต่ยังไม่มี partner
- จำนวนครั้งที่ต้อง fallback ไป Maps
- partner click-through เมื่อมีร้านตรงกับเมนู

## Quality
- Blocker/Critical bugs = ต้องเป็น 0 ก่อน commercial go-live
- Major bugs: ต้องมี owner/แผนแก้และไม่กระทบ core flow อย่างรุนแรง
- อัตรา flow สำเร็จจากเริ่มเลือกจนถึง recommendation
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
3. เมนู/พื้นที่ใดควรหา partner เพิ่ม
4. bug ใดต้องแก้ก่อนเพิ่ม traffic
5. feature ใดควรอยู่ Free หรือ Premium

## Go / No-Go
Commercial launch ควรเกิดเมื่อ core flow เสถียร, ไม่มี Blocker/Critical, privacy/security/payment ที่เกี่ยวข้องพร้อม และมีหลักฐานจาก Beta ว่าผู้ใช้ได้รับคุณค่าจากการช่วยตัดสินใจเรื่องอาหารจริง
