# กินอะไรดี — Beta New Flow Tests

ใช้ทดสอบฟีเจอร์ที่เพิ่มล่าสุดบนอุปกรณ์จริงเท่านั้น

> **Evidence boundary:** test ชุดนี้ใช้ได้สำหรับ readiness verification ก่อนเปิด recruitment gate แต่ผลต้องคงขอบเขตตาม session/device จริง และ **ห้ามนับเป็น recruited Beta cohort evidence หรือหลักฐานว่า Public Beta เปิดแล้ว** จนกว่า Issue #3 จะไม่อยู่สถานะ `RECRUITMENT GATE NOT OPEN YET`

## NF-01 ปุ่ม “ไม่รู้เลย — เลือกให้ฉันทันที”
1. เปิดหน้าแรก
2. กดปุ่ม “🎲 ไม่รู้เลย — เลือกให้ฉันทันที”
3. ผลที่คาดหวัง: แสดงสถานะ “กำลังเลือกให้…” ชั่วคราว แล้วเข้าสู่ผลลัพธ์โดยไม่ต้องผ่านหน้าตั้งค่าหลายขั้น
4. เมนูควรสัมพันธ์กับช่วงเวลาของมื้อที่ระบบอนุมานได้

## NF-02 ป้องกันการกดซ้ำ
1. กดปุ่ม “ไม่รู้เลย — เลือกให้ฉันทันที” ติดกันเร็ว ๆ หลายครั้ง
2. ผลที่คาดหวัง: ปุ่มถูกล็อกระหว่างกำลังเลือก และไม่เกิดผลลัพธ์ซ้อนหลายรอบ

## NF-03 กลับหน้าแรกแล้วสุ่มใหม่
1. ใช้ NF-01 จนได้ผลลัพธ์
2. กลับหน้าแรก
3. กดปุ่มเดิมอีกครั้ง
4. ผลที่คาดหวัง: ระบบเริ่มรอบใหม่ได้ตามปกติ และค่าจากรอบก่อนหน้าไม่ทำให้ flow ค้าง

## NF-04 Android PWA update
1. ใช้ Android PWA ที่เคยติดตั้ง/เคยเปิด build ก่อน release ปัจจุบัน
2. เชื่อมต่ออินเทอร์เน็ตและเปิดแอปให้ Service Worker มีโอกาสตรวจ update
3. ปิดแล้วเปิดจากไอคอนอีกครั้งตามรอบ activation ที่ผู้ใช้ปกติทำได้
4. ผลที่คาดหวังสำหรับ release ปัจจุบัน: ได้ behavior ของ `kinaraidee-beta-v16` และเห็นปุ่ม “ไม่รู้เลย — เลือกให้ฉันทันที” โดยไม่ต้อง clear app/site data เอง
5. ถ้าไม่สามารถยืนยันว่าอุปกรณ์เริ่มจาก build ก่อนหน้า ให้เว้นผลไว้ ไม่ใช้การติดตั้ง v16 ใหม่เป็น NF-04 PASS

## NF-05 iPhone/iPad install guidance
1. เปิดด้วย Safari โดยยังไม่ได้ติดตั้งลงหน้าจอโฮม
2. ตรวจหน้าแรก
3. ผลที่คาดหวัง: มีคำแนะนำให้เปิดใน Safari → กด Share → “เพิ่มไปยังหน้าจอโฮม” ที่ผู้ใช้เข้าใจได้
4. กด “เข้าใจแล้ว”
5. reload/ปิดแล้วเปิดหน้าเว็บใหม่ภายใน 7 วัน
6. ผลที่คาดหวัง: คำแนะนำไม่ควรแสดงซ้ำในช่วงเวลานี้
7. เมื่อติดตั้งและเปิดแบบ standalone แล้ว คำแนะนำไม่ควรแสดง
8. ทดสอบบน iPadOS ที่รายงาน User Agent แบบ Mac ด้วยถ้ามีอุปกรณ์รองรับ

Current physical evidence: iPhone/Safari #1 on deployed v16 completed steps 1–7 on 2026-08-25. Exact iPhone model, iOS version and Safari version were not captured and remain `not captured`; iPadOS step 8 remains untested.

## NF-06 Offline after update
1. เปิดแอปออนไลน์หลังอัปเดตล่าสุดอย่างน้อยหนึ่งครั้ง
2. ปิดเครือข่าย
3. เปิดแอปอีกครั้ง
4. ผลที่คาดหวัง: app shell และไฟล์ `home-surprise.js` / `member-sync.js` ที่ cache ไว้เปิดได้ โดยไม่อ้างว่าข้อมูลออนไลน์ใหม่ยังพร้อมใช้งาน

## NF-07 Update จาก cache รุ่นก่อนหน้า
1. ใช้อุปกรณ์/installed PWA ที่ **ยืนยันได้ว่าเคยโหลด cache generation ก่อน `kinaraidee-beta-v16`** และยังไม่ได้ refresh/update เป็น v16 ก่อนเริ่ม test
2. บันทึกหลักฐาน baseline ก่อน update เท่าที่ตรวจได้ เช่น behavior/marker ของ build เก่า หรือประวัติการติดตั้งที่ trace ได้; ห้ามสร้าง PASS จากการเดาว่า cache เก่า
3. เปิดออนไลน์และรอให้หน้าโหลด/Service Worker update ตามพฤติกรรมปกติ
4. ปิดแอป/แท็บแล้วเปิดใหม่ตาม activation path ปกติ โดยไม่ clear app/site data
5. ผลที่คาดหวัง: behavior ล่าสุดของ `pwa-install.js`, `home-surprise.js`, `member-sync.js`, `nearby-restaurants.js` และ `history-ui.js` ทำงาน และ release ปัจจุบันใช้ `kinaraidee-beta-v16`
6. ถ้ายังเห็น behavior เก่า ให้บันทึกจำนวนรอบ reopen/reload ที่ต้องใช้, standalone/browser state และสิ่งที่เห็นจริง
7. Synthetic/cache regression CI เป็นหลักฐาน implementation เท่านั้น ไม่ใช่ NF-07 real-device PASS

## NF-08 Recovery หลังแอปถูกขัดจังหวะ
1. กด “ไม่รู้เลย — เลือกให้ฉันทันที”
2. ระหว่างสถานะ “กำลังเลือกให้…” ให้สลับแอป/ล็อกหน้าจอ/กลับเข้าแอป หรือทำให้การเชื่อมต่อขาดแล้วกลับมา
3. ผลที่คาดหวัง: เมื่อกลับมาหน้าแอป ปุ่มต้องไม่ค้าง disabled หรือค้างคำว่า “กำลังเลือกให้…” ถาวร
4. ผู้ใช้ต้องสามารถเริ่มรอบใหม่ได้โดยไม่ต้อง reload หน้า

## NF-09 Accessibility ของปุ่ม Surprise
1. ใช้ TalkBack/VoiceOver environment ที่ทำงานได้จริงบนอุปกรณ์ที่จะทดสอบ
2. ก่อนตัดสินผลของ Kinaraidee ให้ยืนยัน accessibility environment ด้วย control มาตรฐานนอกแอป: โฟกัส control, สั่ง activate ด้วย gesture ของ screen reader และยืนยันว่า **action เกิดจริง** เช่น หน้า/ค่าถูกเปิดหรือเปลี่ยน ไม่ใช่แค่ได้ยินชื่อ control
3. กลับ Kinaraidee และโฟกัสปุ่ม “ไม่รู้เลย — เลือกให้ฉันทันที”
4. ผลที่คาดหวัง: screen reader อ่านชื่อ/role ที่เข้าใจได้
5. Activate ปุ่มด้วย gesture ของ screen reader
6. ผลที่คาดหวังระหว่างกำลังทำงาน: ผู้ใช้ได้ยินสถานะ busy ที่เข้าใจได้ และ control ถูกสื่อว่าไม่พร้อมให้กดซ้ำในช่วงนั้น
7. หลังจบรอบ: สถานะต้องกลับเป็นพร้อมใช้งาน และผู้ใช้สามารถเริ่มรอบใหม่ได้
8. ถ้า external control activation ใช้งานไม่ได้หรือไม่สามารถยืนยัน actual action ได้ ให้บันทึก `INCONCLUSIVE / TEST ENVIRONMENT` แทน PASS/FAIL ของ Kinaraidee
9. Source/static/synthetic accessibility checks หรือการอ่าน accessible name อย่างเดียวไม่เพียงพอสำหรับ full NF-09 PASS

Current physical evidence: iPhone/VoiceOver #1 on deployed PR #201 / v16 completed NF-09 on 2026-08-26. The accessibility environment was validated first with Calculator external-control activation; VoiceOver then focused and activated Surprise, announced `กำลังเลือกเมนูอาหารให้ กรุณารอสักครู่` exactly once according to the physical tester, reached a result, returned to ready state, and a second Surprise round started/completed successfully. Issue #57 is closed completed. Exact iPhone model, iOS and Safari/PWA versions were not captured and remain `not captured`. This PASS does not establish Android TalkBack or other-device acceptance.

## NF-10 Online recovery
1. เปิดแอปขณะออฟไลน์หลังเคย cache app shell แล้ว
2. กลับมาออนไลน์โดยไม่ปิดหน้า
3. ผลที่คาดหวัง: ปุ่ม Surprise กลับสู่สถานะพร้อมใช้งาน และไม่ค้าง busy จากรอบก่อน
4. ถ้ามี member-history outbox ค้างจากการบันทึกก่อนเครือข่ายขาด ให้ sync retry หลังออนไลน์โดยไม่ทำรายการ local ที่ผู้ใช้เห็นว่าบันทึกแล้วหายไป

## การบันทึกผล
ทุก Fail ให้บันทึก device, OS, browser/version, ขั้นตอน, expected, actual, screenshot/video และ severity

ถ้า environment/tool ทำให้ไม่สามารถตัดสินพฤติกรรมของแอปได้อย่างน่าเชื่อถือ ให้ใช้ `INCONCLUSIVE` และบันทึกสาเหตุ แทนการบังคับเป็น PASS หรือ FAIL

หาก exact device/OS/browser version ไม่ได้ถูกเก็บจริง ให้ระบุ `not captured` แทนการเดา

ห้ามทำเครื่องหมาย Pass จาก static review, source markers, CI/synthetic checks หรือจากการอ่านโค้ดเพียงอย่างเดียว
