# กินอะไรดี — Beta Run Log

ใช้ไฟล์นี้บันทึกรอบทดสอบจริงทีละอุปกรณ์ โดยอ้างอิง `BETA-TEST-CASES.md`, `BETA-NEW-FLOW-TESTS.md` และ `BETA-DEVICE-MATRIX.md`

## Release trace ที่ต้องบันทึกทุก run
- Current runtime release: `83f8f36373f819fcaf3d5dde7f7ae830a1e4aea1` (PR #26 merged)
- Expected Service Worker cache: `kinaraidee-beta-v13`
- Pre-merge CI ของ head `4d79b19e68f35efc599de7482cdd933b9812ae45`: Release Consistency `32555118263` SUCCESS; Beta integrity `32555118264` SUCCESS; Beta QA `32555118259` SUCCESS
- Runtime change จาก v12: partner/fallback cards เปลี่ยน data-driven rendering เป็น DOM nodes/`textContent` เพื่อ defense-in-depth ต่อ stored DOM XSS และ bump PWA cache generation
- Historical v12 runtime baseline: `f08d069ab2e8a5c00f63cb3f16bf6ab58c2c1c3f` / `kinaraidee-beta-v12`; ห้ามนำผล v12 มาแทน v13 สำหรับ nearby partner rendering, PWA update หรือ flow ที่ได้รับผลกระทบโดยไม่ retest
- หาก SHA ที่ deploy เป็น non-runtime descendant ให้บันทึก SHA จริงและยืนยัน runtime payload เทียบกับ `83f8f363...`

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
- App release SHA: `83f8f36373f819fcaf3d5dde7f7ae830a1e4aea1`
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
- TC-10/nearby partner rendering ต้อง retest บน v13 เพราะ renderer เปลี่ยนจาก v12
- TC-11 Feedback และ TC-12 Partner application ต้องมีหลักฐานจาก release candidate ที่ deploy จริง
- New flow NF-01, NF-02, NF-03 และ recovery ที่เกี่ยวข้องต้องผ่านบนอุปกรณ์จริงที่รองรับ
- NF-07 ต้องครอบคลุมการ update จาก cache รุ่นก่อนหน้าไป `kinaraidee-beta-v13`
- NF-09 ต้องตรวจ state ของ Surprise และ public forms ที่เกี่ยวข้องบน assistive technology/semantics ที่ platform รองรับ
- PWA/Offline/Install guidance ให้ตัดสินตาม platform support และบันทึก N/A เมื่อไม่รองรับจริง
- ต้องมี Pages/Live Smoke evidence ที่ trace กลับไปยัง deployed SHA
- ต้องบันทึก deployed SHA และยืนยันความสัมพันธ์กับ app release baseline
- ห้ามปิดรอบจาก static review อย่างเดียว