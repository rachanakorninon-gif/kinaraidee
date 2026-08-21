# กินอะไรดี — Live Deployment Verification

ใช้เอกสารนี้ยืนยันว่า Public Beta ที่ผู้ใช้เปิดจริงตรงกับ release candidate ใน repository โดยห้ามทำเครื่องหมาย PASS จากการคาดเดา

## Release candidate
- Commit SHA:
- วันที่ตรวจ:
- ผู้ตรวจ:
- Public URL: https://rachanakorninon-gif.github.io/kinaraidee/

## GitHub Pages deployment evidence
- [ ] GitHub Pages เปิดใช้งาน
- [ ] deployment ที่อ้างอิง commit นี้มีสถานะสำเร็จ หรือมีหลักฐานเทียบเท่า
- [ ] `index.html` ถูกเผยแพร่จาก publishing source ที่ตั้งใจ
- [ ] ไม่มี deployment error ที่ยังไม่ได้แก้

## Live asset checks
ตรวจจาก Public URL จริง ไม่ใช่เฉพาะไฟล์ใน repository
- [ ] `/kinaraidee/` โหลดได้
- [ ] `manifest.webmanifest` โหลดได้และข้อมูลสำคัญถูกต้อง
- [ ] `sw.js` โหลดได้และ cache generation ตรงกับ release candidate
- [ ] `404.html` ทำงานตาม recovery design
- [ ] `robots.txt` โหลดได้
- [ ] `sitemap.xml` โหลดได้
- [ ] icon/PWA assets สำคัญไม่ 404

## Core smoke test
- [ ] หน้าแรก render ไม่มี error ที่ทำให้ใช้งานต่อไม่ได้
- [ ] ปุ่ม “ไม่รู้เลย — เลือกให้ฉันทันที” ให้ recommendation
- [ ] double tap ไม่สร้าง flow ซ้อน
- [ ] busy state กลับสู่ปกติ
- [ ] เลือกเงื่อนไขเองแล้ว recommendation ทำงาน
- [ ] “กินอันนี้” / เลือกใหม่ / เมนูโปรด / แชร์ ทำงานตามกรณีที่รองรับ
- [ ] ร้านใกล้คุณทำงานเมื่ออนุญาต Location
- [ ] ปฏิเสธ Location แล้วมี fallback ที่ใช้งานต่อได้
- [ ] Google Maps fallback เปิดปลายทางที่คาดไว้

## PWA / recovery smoke test
- [ ] Service Worker register สำเร็จบน platform ที่รองรับ
- [ ] install/standalone flow ทำงานบน Android ที่รองรับ
- [ ] iPhone/iPad แสดง Add to Home Screen guidance ตามเงื่อนไข
- [ ] สลับแอป/ล็อกหน้าจอแล้วกลับมา ปุ่ม Surprise ไม่ค้าง
- [ ] offline shell ทำงานตามขอบเขตที่ออกแบบ
- [ ] กลับมา online แล้ว recovery ได้
- [ ] update จาก cache รุ่นก่อนหน้าไม่ต้องให้ผู้ใช้ล้างข้อมูลเอง

## Evidence
- Device / OS / Browser:
- Screenshot/Video:
- Workflow/deployment run:
- Commit verified:
- TC/NF ที่เกี่ยวข้อง:
- Defect/Issue:

## Result
- [ ] PASS — Live deployment ตรงกับ release candidate และ smoke test ที่จำเป็นผ่าน
- [ ] FAIL — พบ defect; ห้ามตีความว่า deployment พร้อม
- [ ] BLOCKED — ยังไม่มีช่องทาง/อุปกรณ์/หลักฐานเพียงพอ

### Notes

GitHub Pages รองรับ custom `404.html`; entry file `index.html` ต้องอยู่ใน publishing source ที่ถูกต้อง และเมื่อใช้ GitHub Actions สำหรับ Pages ควรตรวจ deployment artifact/run ที่สัมพันธ์กับ release candidate ด้วย
