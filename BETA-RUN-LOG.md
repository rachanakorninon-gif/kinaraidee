# กินอะไรดี — Beta Run Log

ใช้ไฟล์นี้บันทึกรอบทดสอบจริงทีละอุปกรณ์ โดยอ้างอิง `BETA-TEST-CASES.md`, `BETA-NEW-FLOW-TESTS.md` และ `BETA-DEVICE-MATRIX.md`

## Release trace ที่ต้องบันทึกทุก run
- Current runtime release: `0624d7e4928e75d617137db0dba22825e7ba9f5a` (PR #28 merged)
- Expected Service Worker cache: `kinaraidee-beta-v13`
- Pre-merge CI ของ head `e4bf276702be06baaf1c5abd41097f8122b4793b`: Release Consistency `32557712768` SUCCESS; Beta integrity `32557712762` SUCCESS; Beta QA `32557712761` SUCCESS
- Runtime change จาก `83f8f363...`: Partner application submission เพิ่ม `privacy_notice_version='2026-08-21'` และ `privacy_acknowledged_at`; cache generation ไม่เปลี่ยนจาก v13
- Historical v13 renderer baseline: `83f8f36373f819fcaf3d5dde7f7ae830a1e4aea1`; TC-10 renderer evidence จาก baseline นี้ยังต้อง trace ให้ตรง deployed payload แต่ TC-12 ต้อง retest บน `0624d7e4...`
- Historical v12 runtime baseline: `f08d069ab2e8a5c00f63cb3f16bf6ab58c2c1c3f` / `kinaraidee-beta-v12`; ห้ามนำผล v12 มาแทน v13 สำหรับ nearby partner rendering, PWA update หรือ flow ที่ได้รับผลกระทบโดยไม่ retest
- หาก SHA ที่ deploy เป็น non-runtime descendant ให้บันทึก SHA จริงและยืนยัน runtime payload เทียบกับ `0624d7e4...`

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
- App release SHA: `0624d7e4928e75d617137db0dba22825e7ba9f5a`
- Deployed SHA:
- GitHub Pages run URL / ID:
- Live Smoke run URL / ID:
- Public URL: https://rachanakorninon-gif.github.io/kinaraidee/
- Expected SW/cache: `kinaraidee-beta-v13`
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
| TC-12 Partner application |  | ตรวจ privacy acknowledgement evidence สำหรับ runtime `0624d7e4...` |
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
- TC-10/nearby partner rendering ต้องมี evidence บน v13 payload ที่ deploy จริง
- TC-11 Feedback และ TC-12 Partner application ต้องมีหลักฐานจาก release candidate ที่ deploy จริง
- TC-12 ต้อง retest บน `0624d7e4...` เพราะ submission payload เพิ่ม privacy acknowledgement evidence fields
- New flow NF-01, NF-02, NF-03 และ recovery ที่เกี่ยวข้องต้องผ่านบนอุปกรณ์จริงที่รองรับ
- NF-07 ต้องครอบคลุมการ update จาก cache รุ่นก่อนหน้าไป `kinaraidee-beta-v13`
- NF-09 ต้องตรวจ state ของ Surprise และ public forms ที่เกี่ยวข้องบน assistive technology/semantics ที่ platform รองรับ
- PWA/Offline/Install guidance ให้ตัดสินตาม platform support และบันทึก N/A เมื่อไม่รองรับจริง
- ต้องมี Pages/Live Smoke evidence ที่ trace กลับไปยัง deployed SHA
- ต้องบันทึก deployed SHA และยืนยันความสัมพันธ์กับ app release baseline
- ห้ามปิดรอบจาก static review อย่างเดียว