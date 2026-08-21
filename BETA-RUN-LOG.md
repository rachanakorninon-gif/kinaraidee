# กินอะไรดี — Beta Run Log

ใช้ไฟล์นี้บันทึกรอบทดสอบจริงทีละอุปกรณ์ โดยอ้างอิง `BETA-TEST-CASES.md`, `BETA-NEW-FLOW-TESTS.md` และ `BETA-DEVICE-MATRIX.md`

## Release trace ที่ต้องบันทึกทุก run
- App release baseline: `f08d069ab2e8a5c00f63cb3f16bf6ab58c2c1c3f`
- Expected Service Worker cache: `kinaraidee-beta-v12`
- Runtime change จาก baseline ก่อนหน้า `bb7b979421275995a6fee12f84b118d0c942037a`: public Feedback/Partner accessibility semantics + PWA cache generation; ห้ามนำผล real-device ของ v11 มาแทน v12 โดยไม่ retest กรณีที่ได้รับผลกระทบ
- หาก SHA ที่ deploy เป็น non-runtime descendant (เช่น evidence/workflow-only commit) ให้บันทึก SHA จริงและยืนยันว่า runtime app payload ไม่เปลี่ยนจาก `f08d069a...`

## วิธีใช้
1. สร้างหัวข้อใหม่ต่อหนึ่งอุปกรณ์/Browser
2. กรอกข้อมูลอุปกรณ์จริงและ release/deployment trace
3. รันทดสอบ TC-01 ถึง TC-15 และ NF-01 ถึง NF-10 เท่าที่อุปกรณ์รองรับ
4. บันทึก PASS / FAIL / N/A เท่านั้น
5. ทุก FAIL ต้องสร้าง Bug Issue หรือบันทึกรายละเอียด defect พร้อมหลักฐานถ้ามี
6. ห้ามกรอกผลจากการคาดเดา

---

## Run Template

### Release / deployment evidence
- App release SHA: `f08d069ab2e8a5c00f63cb3f16bf6ab58c2c1c3f`
- Deployed SHA:
- GitHub Pages run URL / ID:
- Live Smoke run URL / ID:
- Public URL: https://rachanakorninon-gif.github.io/kinaraidee/
- Expected SW/cache: `kinaraidee-beta-v12`
- Runtime diff vs app release: None / Present / Not yet verified

### Device
- วันที่/เวลา:
- ผู้ทดสอบ:
- Device model:
- OS / version:
- Browser / version:
- Installed PWA: Yes / No / N/A
- Service Worker / cache generation ที่สังเกตได้:
- Network: Wi-Fi / Mobile / Offline test
- Screenshot / video evidence:

### Core Results
| Test Case | Result | Notes / Issue |
|---|---|---|
| TC-01 เปิดแอป |  |  |
| TC-02 ไม่รู้เลย |  |  |
| TC-03 เลือกเงื่อนไข |  |  |
| TC-04 เลือกใหม่ |  |  |
| TC-05 กินอันนี้ / ประวัติ |  |  |
| TC-06 เมนูโปรด |  |  |
| TC-07 แชร์ |  |  |
| TC-08 Location อนุญาต |  |  |
| TC-09 Location ปฏิเสธ |  |  |
| TC-10 Google Maps fallback |  |  |
| TC-11 Feedback |  |  |
| TC-12 Partner application |  |  |
| TC-13 PWA |  |  |
| TC-14 Offline shell |  |  |
| TC-15 404 recovery |  |  |

### New Flow Results
| Test Case | Result | Notes / Issue |
|---|---|---|
| NF-01 Surprise one-tap |  |  |
| NF-02 Double-tap protection |  |  |
| NF-03 Start new surprise round |  |  |
| NF-04 Android PWA update |  |  |
| NF-05 iPhone/iPad install guidance |  |  |
| NF-06 Offline after update |  |  |
| NF-07 Upgrade from older cache |  |  |
| NF-08 Recovery after interruption |  |  |
| NF-09 Accessibility state |  |  |
| NF-10 Online recovery |  |  |

### Defects found
- Blocker:
- Critical:
- Major:
- Minor:

### Final status for this device
- [ ] PASS core flow
- [ ] PASS new flow
- [ ] FAIL core flow
- [ ] FAIL new flow
- [ ] Needs retest after fix

### Notes

---

## Gate สำหรับปิด Real-device Beta Round
- Android Chrome ผ่านอย่างน้อย 3 รุ่น
- iPhone Safari ผ่านอย่างน้อย 2 รุ่น
- ไม่มี Blocker/Critical ที่ยังเปิดอยู่
- Core flow TC-01, TC-02, TC-03, TC-08/09 และ TC-10 ผ่านบนอุปกรณ์จริงที่เกี่ยวข้อง
- TC-11 Feedback และ TC-12 Partner application ต้อง retest บน release `f08d069a...` เพราะ public form runtime เปลี่ยนจาก v11
- New flow NF-01, NF-02, NF-03 และ recovery ที่เกี่ยวข้องต้องผ่านบนอุปกรณ์จริงที่รองรับ
- NF-07 ต้องครอบคลุมการ update จาก cache รุ่นก่อนหน้าไป `kinaraidee-beta-v12`
- NF-09 ต้องตรวจ state ของ Surprise และ public forms ที่เกี่ยวข้องบน assistive technology/semantics ที่ platform รองรับ
- PWA/Offline/Install guidance ให้ตัดสินตาม platform support และบันทึก N/A เมื่อไม่รองรับจริง
- ต้องมี Pages/Live Smoke evidence ที่ trace กลับไปยัง deployed SHA
- ต้องบันทึก deployed SHA และยืนยันความสัมพันธ์กับ app release baseline
- ห้ามปิดรอบจาก static review อย่างเดียว
