# กินอะไรดี — Owner Decision Brief: Round 1

เอกสารนี้เตรียมตัวเลือกไว้ล่วงหน้าเพื่อให้เจ้าของผลิตภัณฑ์ตอบได้สั้นที่สุด **หลัง device/Beta technical gate ใกล้ปิด**. ยังไม่ใช่การตัดสินใจ/อนุมัติ และไม่เปลี่ยน Public Beta, Recruitment, Security, Billing หรือ Commercial status.

Canonical queue: `OWNER-DECISIONS-QUEUE.md`.

## Decision 1 — Distribution รอบเชิงพาณิชย์แรก

### A — Web/PWA first — **ข้อเสนอแนะสำหรับรอบแรก**

ใช้เว็บ/PWA ที่มีอยู่เป็นช่องทางเปิดรอบแรก และค่อยพิจารณา native App Store / Google Play หลัง product/retention/monetization evidence แข็งแรงขึ้น.

**เหตุผลที่เหมาะกับสถานะปัจจุบัน**
- browser/PWA runtime, GitHub Pages, service worker, offline/install flow และ device QA pipeline มีอยู่แล้ว
- ลด dependency เพิ่มจาก Apple/Google developer accounts, store review, store metadata และ native-specific subscription/policy work
- ช่วยให้ทีมโฟกัส gate ที่ยังเปิดจริง: device matrix, NF-07, Keyboard Focus, leaked-password/security, Privacy/Legal, Payment/Premium และ Operations
- ไม่ขัดกับการทำ native ภายหลัง

**ข้อแลกเปลี่ยน**
- discovery/distribution ผ่าน app stores ยังไม่ได้ใช้ในรอบแรก
- native-only integrations/UX บางอย่างต้องรอรอบถัดไป

### B — Web/PWA + native ตั้งแต่รอบแรก

เพิ่ม App Store/Google Play work ก่อน Commercial launch.

**เหมาะเมื่อ**
- มีเหตุผลทางธุรกิจชัดว่าต้องมี native distribution ตั้งแต่วันแรก
- developer accounts/policy/metadata/subscription requirements พร้อม
- ยอมรับเวลา QA/release/compliance เพิ่ม

**ข้อแลกเปลี่ยน**
- เพิ่ม external dependencies และ test surface ก่อน commercial gates ปัจจุบันปิด
- ต้องแยก native acceptance จาก browser/PWA acceptance; ห้ามถือว่า PWA PASS = native PASS

### คำตอบที่ต้องการเมื่อถึงเวลา
`Distribution: A` หรือ `Distribution: B`

หากไม่มี requirement ใหม่ก่อนถึงจุดตัดสินใจ ค่าแนะนำยังเป็น **A — Web/PWA first**.

---

## Decision 2 — Supabase paid-plan dependency สำหรับ leaked-password protection

สถานะปัจจุบัน: leaked-password protection = **NOT PASS / blocked by verified current Free-plan/configuration dependency**. Successful signup/sign-in/reset ไม่แทน rejection protection.

### A — คง Free ระหว่าง Beta แล้วค่อยอนุมัติ paid plan ก่อน Commercial security sign-off — **ข้อเสนอแนะตอนนี้**

**เหตุผล**
- device QA, NF-07 และ Keyboard Focus ไม่ต้องใช้ paid-plan change เพื่อทำต่อ
- ไม่สร้างค่าใช้จ่ายก่อน technical Beta gate ใกล้ปิด
- เก็บ blocker ไว้อย่างโปร่งใสโดยไม่อ้าง Security PASS เกินจริง

**เงื่อนไขก่อน Commercial GO**
- ถ้า leaked-password protection ยังเป็น required security gate และยังต้อง paid plan ให้ขอ explicit billing approval
- หลังเปลี่ยน plan/config ต้องเปิด setting ผ่าน provider-supported path
- ทดสอบ acceptable password และ leaked/weak-password rejection แยกกัน
- re-check Supabase Security Advisor/configuration

### B — อนุมัติ paid-plan change เร็วขึ้นเมื่อพร้อม เพื่อปิด leaked-password gate ก่อน

**เหมาะเมื่อ**
- เจ้าของต้องการปิด server-side Auth security blocker ก่อน device/Beta work จบ
- ยอมรับค่าใช้จ่าย/การเปลี่ยน production Auth configuration

**ข้อแลกเปลี่ยน**
- เป็น billing/configuration change ที่ต้องมี explicit approval
- หลังเปลี่ยนต้องทำ Auth regression จริง; การจ่ายเงินหรือเปิด settingอย่างเดียวไม่ใช่ PASS

### คำตอบที่ต้องการเมื่อถึงเวลา
`Supabase: A` หรือ `Supabase: B`

หากไม่มีเหตุผลให้เร่งค่าใช้จ่าย ค่าแนะนำตอนนี้คือ **A — คง Free ระหว่าง Beta แล้วตัดสินใจก่อน Commercial security sign-off**.

---

## Owner interaction target

เมื่อถึง Round 1 ผู้ช่วยควรถามเพียงครั้งเดียว:

- `Distribution: A (Web/PWA first) หรือ B (Web/PWA + native now)`
- `Supabase: A (Free through Beta, decide paid before Commercial) หรือ B (authorize paid-plan work earlier)`

เจ้าของสามารถตอบสั้น เช่น `A / A`.

## Evidence boundary

คำแนะนำใน brief นี้เป็น project-planning recommendation ไม่ใช่ legal/payment/provider approval. ห้ามอ้างว่า native distribution, paid plan, leaked-password protection, store approval, billing, Public Beta หรือ Commercial GO เกิดขึ้นจนกว่าจะมี decision + execution evidence ที่เกี่ยวข้องจริง.