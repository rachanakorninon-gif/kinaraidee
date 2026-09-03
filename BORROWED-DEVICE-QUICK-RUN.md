# กินอะไรดี — Borrowed-device Quick Run

เอกสารนี้ใช้สำหรับรอบที่ต้องยืมโทรศัพท์คนอื่นและต้องการเก็บหลักฐาน Beta device-matrix ให้สั้นที่สุด โดยไม่ลด evidence boundary ของ `BETA-TEST-CASES.md`, `BETA-NEW-FLOW-TESTS.md`, `BETA-DEVICE-MATRIX.md` หรือ `REAL-PLATFORM-UX-EVIDENCE.md`.

> เป้าหมายคือประหยัดเวลาบนอุปกรณ์ที่ยืมมา ไม่ใช่ย่อเกณฑ์ acceptance. PASS ต้องมาจากสิ่งที่เกิดจริงบนเครื่อง/session นั้นเท่านั้น และห้ามเอาหลักฐานจากคนละเครื่องมารวมเป็น PASS เดียวโดยไม่ระบุขอบเขต.

## 0. เก็บ metadata ก่อนเปิด Kinaraidee — ห้ามข้าม

ถ่าย screenshot/บันทึกจากหน้าระบบของเครื่องให้เห็นข้อมูลที่ตรวจได้จริง:

- ผู้ผลิต + รุ่นเครื่อง
- OS + version
- Browser + version/context ที่ใช้ทดสอบ
- วัน/เวลา session
- ถ้าเป็น installed PWA ให้แยก Browser tab กับ Home-screen/standalone context

ถ้าข้อมูลใดไม่ได้เก็บจริงให้เขียน `not captured`; ห้ามเดาจากหน้าตาเครื่องหรือ User-Agent.

## Tier A — ต้องทำบน Android รุ่นใหม่ทุกเครื่อง

เป้าหมายเวลาประมาณ 12–18 นาที/เครื่องเมื่อเครือข่ายและ permission ปกติ.

1. **TC-01 เปิดแอป** — เปิด deployed URL ใน Chrome; หน้า Home ต้องครบและกดได้.
2. **TC-02 + NF-01 Surprise** — กด `ไม่รู้เลย`; ต้องเห็น busy ชั่วคราวและได้ผลลัพธ์.
3. **NF-02 duplicate guard** — กด Surprise รัวระหว่าง busy; ต้องไม่เกิดผลซ้อน.
4. **TC-03 conditions** — เลือกมื้อ/คน/งบ/ประเภท แล้วขอ recommendation ให้ flow จบ.
5. **TC-08 Location allow** — เริ่มจาก permission state ที่ trace ได้, กดหาร้าน, อนุญาต Location และยืนยันว่า flow เดินต่อ. Maps เปิดได้อย่างเดียวไม่พอถ้า trace allow-path ไม่ได้.
6. **TC-09 Location deny** — reset permission ให้ถามใหม่ถ้าจำเป็น, ปฏิเสธ แล้วตรวจ fallback ที่ยังใช้งานได้.
7. **TC-10 Maps fallback** — เปิด Maps/search fallback จากเมนูที่ไม่มี partner ที่ตรงกันเมื่อเกิดขึ้นจริง.
8. **TC-13 PWA smoke** — ติดตั้ง/เพิ่มแอปตาม browser flow, เปิดจาก icon และปิด/เปิดใหม่อย่างน้อย 1 รอบ.
9. **TC-14 + NF-10 offline/online recovery** — หลัง online load แล้ว ปิด network, เปิด/กลับแอปให้ shell ยังใช้ได้, เปิด network กลับโดยไม่ล้าง data และยืนยันว่า Surprise พร้อมใช้งาน.
10. **NF-08 interrupted recovery** — เริ่ม Surprise แล้วสลับแอป/ล็อกหน้าจอระหว่าง busy จากนั้นกลับมา; ปุ่มต้องไม่ค้างและเริ่มรอบใหม่ได้.

### Android: ไม่ต้องทำซ้ำทุกเครื่องถ้าเวลาเจ้าของเครื่องจำกัด

- Auth recovery/signup, TC-11 Feedback และ TC-12 Partner มี scoped OPPO physical evidence แล้ว; ไม่ใช้เวลายืมเครื่องทำซ้ำโดยอัตโนมัติ.
- NF-07 old-cache → v16 ใช้ deterministic fixture/ขั้นตอนเฉพาะและควรทำบนเครื่องที่จัดไว้ ไม่ควรเสียเวลาบน Android ยืมใหม่ที่เริ่มจาก v16.
- NF-09 TalkBack เป็น accessibility acceptance แยก; ทำเฉพาะเมื่อ environment พร้อมและมีเวลา ไม่ใช้การอ่าน accessible name อย่างเดียวเป็น PASS.

## Tier A — ต้องทำบน iPhone รุ่นใหม่

เป้าหมายเวลาประมาณ 15–22 นาที/เครื่องเมื่อ Safari/permission ปกติ.

1. **TC-01 เปิดแอปใน Safari** — Home โหลดครบและกดได้.
2. **TC-02 + NF-01 Surprise** — busy → recommendation จบรอบ.
3. **NF-02 duplicate guard** — กดรัวระหว่าง busy แล้วไม่เกิดผลซ้อน.
4. **TC-03 conditions** — ตั้งมื้อ/คน/งบ/ประเภทแล้วได้ recommendation.
5. **TC-08 Location allow** — trace permission prompt/state → Allow → nearby flow เดินต่อ.
6. **TC-09 Location deny** — reset permission ให้เกิด decision ใหม่ถ้าจำเป็น → Deny → fallback ยังใช้ได้.
7. **TC-10 Maps fallback** — Safari ส่งต่อ Maps/search ได้ตาม flow จริง.
8. **NF-05 install guidance / Home Screen** — ตรวจคำแนะนำ Safari, Add to Home Screen, เปิดจาก icon เป็น standalone, standalone ไม่แสดง install hint; ถ้ากด `เข้าใจแล้ว` ให้ reload Safari และยืนยัน suppression ตาม flow.
9. **TC-14 + NF-10 offline/online recovery** — online load → offline shell → online กลับโดยไม่ล้าง data และ Surprise พร้อมอีกครั้ง.
10. **NF-08 interrupted recovery** — สลับแอประหว่าง Surprise busy แล้วกลับมาโดยไม่ค้าง.

### iPhone: ขอบเขตสำคัญ

- Historical iPhone #1 มีหลาย PASS แต่ exact model/iOS/Safari ไม่ถูกเก็บ ดังนั้น iPhone ใหม่ที่เก็บ metadata ครบ **ไม่ได้พิสูจน์โดยอัตโนมัติว่าเป็น “รุ่นที่ 2” ที่แตกต่างจาก historical unknown model**. ต้องมี distinct-model identity ที่ trace ได้จริงก่อนปิด minimum 2-model gate.
- NF-09 VoiceOver historical PASS ยัง scoped กับ iPhone session เก่า; ไม่ต้องทำซ้ำบนโทรศัพท์ที่ยืมมาทุกเครื่อง เว้นแต่ต้องการเพิ่ม accessibility device coverage.

## หลักฐานขั้นต่ำที่เก็บระหว่าง Quick Run

เพื่อไม่เสียเวลาถ่ายทุกหน้าจอ ให้เก็บ checkpoint ที่ trace flow ได้:

1. metadata รุ่น/OS/browser ก่อนเริ่ม
2. Home + Surprise result
3. Location permission/state + nearby/Maps outcome
4. installed/standalone หรือ PWA smoke outcome
5. offline/online หรือ interrupted-recovery outcome

ถ้าเกิด FAIL ให้หยุดถ่ายหลักฐานเพิ่มทันที: ขั้นตอนก่อนเกิดปัญหา, actual, expected, screenshot/video และ severity ตาม `BETA-TEST-CASES.md`.

## การนับ device-matrix

- Android minimum = อย่างน้อย 3 **distinct models** ที่มี traceable physical core-flow evidence.
- iPhone minimum = อย่างน้อย 2 **distinct models** ที่มี traceable physical Safari core-flow evidence.
- เครื่องที่ model/version `not captured` ห้ามใช้พิสูจน์ distinct-model identity ด้วยการเดา.
- PASS จาก OPPO Reno13 5G หรือ historical sessions ไม่ถูกขยายไปยังเครื่องที่ยืมมาโดยอัตโนมัติ.

## หลังคืนเครื่อง

ผู้ดูแล evidence ต้องนำผลจริงไปซิงก์ `BETA-DEVICE-MATRIX.md`, Issue #5 และ defect tracker. การจบ Quick Run ไม่ได้ทำให้ Public Beta หรือ Commercial status เป็น GO โดยอัตโนมัติ; gate อื่น เช่น NF-07, Keyboard Focus, leaked-password protection, remaining TC/NF coverage, Blocker/Critical closure และ Commercial dependencies ยังคงเป็นอิสระจาก device-count gate.
