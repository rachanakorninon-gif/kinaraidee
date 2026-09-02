# กินอะไรดี — Public Beta Daily Log

ใช้ไฟล์นี้บันทึกสิ่งที่เกิดขึ้นจริงในแต่ละวันของ Public Beta **หลัง recruitment gate ใน Issue #3 เปิดแล้วเท่านั้น** ระหว่างที่ Issue #3 ยังระบุ `RECRUITMENT GATE NOT OPEN YET` ให้ถือไฟล์นี้เป็น template เตรียมพร้อม ไม่ใช่หลักฐานว่ามี tester traffic หรือ Public Beta เริ่มแล้ว

> กรอกเฉพาะข้อมูลที่เกิดขึ้นจริง หากยังไม่มีข้อมูลให้เว้นว่าง ห้ามเติม `0`, `PASS` หรือ `N/A` เพื่อแทนข้อมูลที่ยังไม่ได้วัด; ใช้ `N/A` ได้เฉพาะเมื่อ test/applicability นั้นไม่เกี่ยวข้องจริงและมีหลักฐานรองรับเหตุผลนั้น

## Daily entry template

### วันที่: YYYY-MM-DD

**Traffic / testers**
- ผู้ทดสอบใหม่:
- ผู้ทดสอบที่กลับมา:
- อุปกรณ์ใหม่ที่ได้ทดสอบ:
- Android / iPhone / iPad / Desktop:

**Core flow**
- ปุ่ม “ไม่รู้เลย — เลือกให้ฉันทันที”:
- recommendation:
- “กินอันนี้” / reroll:
- ร้านใกล้คุณ / partner / Maps fallback:

**QA**
- TC ที่ทดสอบวันนี้:
- NF ที่ทดสอบวันนี้:
- PASS:
- FAIL:
- N/A:
- Blocker:
- Critical:
- Major:
- Minor:

**PWA / Mobile**
- install / Add to Home Screen:
- Service Worker/cache update:
- offline/recovery:
- iPhone/iPad guidance:

**Feedback**
- Feedback ใหม่:
- สิ่งที่ชอบซ้ำ:
- จุดสับสนซ้ำ:
- feature request ซ้ำ:
- ปัญหาที่ควรแก้ก่อนเพิ่ม traffic:

**Restaurant / Monetization signal**
- เมนู demand ที่เห็น:
- พื้นที่ demand:
- partner click/conversion ที่ verify ได้:
- Premium interest:

**งานที่ทำวันนี้**
- แก้ไข:
- Commit/Issue ที่เกี่ยวข้อง:
- Retest:

**การตัดสินใจสำหรับวันถัดไป**
- [ ] เดินหน้าต่อเท่าเดิม
- [ ] เพิ่มผู้ทดสอบ
- [ ] หยุดเพิ่ม traffic เพื่อแก้ปัญหา
- [ ] Retest defect
- [ ] ติดต่อ restaurant partner จริง
- [ ] เก็บข้อมูลเพิ่มก่อนตัดสินใจ

**หมายเหตุ:**

---

## Weekly checkpoint
เมื่อครบแต่ละ 7 วัน ให้สรุปจาก Daily Log + `BETA-RUN-LOG.md` + `BETA-FEEDBACK-TEMPLATE.md` + metrics ที่วัดได้จริง

- สิ่งที่ดีขึ้น:
- ปัญหาที่เกิดซ้ำ:
- Blocker/Critical ที่ยังเปิด:
- Core flow พร้อมเพิ่ม traffic หรือไม่:
- PWA/mobile พร้อมหรือไม่:
- Restaurant demand ที่เริ่มชัด:
- Premium signal ที่เริ่มชัด:
- การตัดสินใจสัปดาห์ถัดไป:

ห้ามสร้างจำนวนผู้ใช้, PASS rate, conversion, retention หรือรายได้ขึ้นเองเพื่อเติมช่องว่าง
