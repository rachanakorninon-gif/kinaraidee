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

## Automated evidence ที่มีใน repository
Workflow ที่เกี่ยวข้อง:
- `.github/workflows/pages.yml` — deploy ไป GitHub Pages
- `.github/workflows/live-smoke.yml` — รันหลัง Pages deploy สำเร็จ และมี `workflow_dispatch` สำหรับรันเอง
- `.github/workflows/qa.yml` — static/QA checks
- `.github/workflows/beta-check.yml` — Beta readiness checks

`live-smoke.yml` ตรวจจาก Public URL จริง ไม่ใช่เฉพาะไฟล์ใน repository และครอบคลุม public pages/assets, SEO markers, PWA assets, Service Worker cache generation, Surprise flow markers, recovery markers และ iPhone/iPad install guidance

> สำคัญ: การมี workflow file ไม่เท่ากับ workflow run ผ่าน ต้องมี run/result หรือหลักฐาน live test จริงก่อนทำเครื่องหมาย PASS

## Live asset checks
ตรวจจาก Public URL จริง ไม่ใช่เฉพาะไฟล์ใน repository
- [ ] `/kinaraidee/` โหลดได้
- [ ] `index.html` โหลดได้
- [ ] `privacy.html` โหลดได้
- [ ] `feedback.html` โหลดได้
- [ ] `partner.html` โหลดได้
- [ ] `manifest.webmanifest` โหลดได้และข้อมูลสำคัญถูกต้อง
- [ ] `sw.js` โหลดได้และ cache generation ตรงกับ release candidate
- [ ] `404.html` ทำงานตาม recovery design
- [ ] `robots.txt` โหลดได้
- [ ] `sitemap.xml` โหลดได้
- [ ] `icon.svg` / PWA assets สำคัญไม่ 404
- [ ] `data/foods-expanded.js` โหลดได้
- [ ] `data/choice-rules.js` โหลดได้
- [ ] `data/nearby-restaurants.js` โหลดได้
- [ ] `data/group-mode.js` โหลดได้
- [ ] `data/pwa-install.js` โหลดได้
- [ ] `data/home-surprise.js` โหลดได้

## Automated marker checks
รายการนี้สามารถอ้างอิงผลจาก `live-smoke.yml` เมื่อ workflow run สำเร็จ:
- [ ] หน้า Live มีข้อความ/marker ของ “กินอะไรดี”
- [ ] หน้า Live อ้างอิง `manifest.webmanifest`
- [ ] หน้า Live register Service Worker
- [ ] Live `sw.js` ใช้ cache generation ที่คาดไว้ (ปัจจุบัน `kinaraidee-beta-v10`)
- [ ] Surprise flow live asset มี busy/accessibility marker ที่คาดไว้
- [ ] Recovery marker สำหรับ `visibilitychange` / `online` อยู่ใน live asset ที่เกี่ยวข้อง
- [ ] iPadOS/Mac-like detection และปุ่ม “เข้าใจแล้ว” อยู่ใน live PWA guidance asset
- [ ] `robots.txt` อ้างอิง sitemap
- [ ] `sitemap.xml` มี public pages ที่คาดไว้

## Core smoke test — ต้องใช้ browser/อุปกรณ์จริง
Automated curl/grep ไม่สามารถแทน interaction test ต่อไปนี้ได้:
- [ ] หน้าแรก render ไม่มี error ที่ทำให้ใช้งานต่อไม่ได้
- [ ] ปุ่ม “ไม่รู้เลย — เลือกให้ฉันทันที” ให้ recommendation
- [ ] double tap ไม่สร้าง flow ซ้อน
- [ ] busy state กลับสู่ปกติ
- [ ] เลือกเงื่อนไขเองแล้ว recommendation ทำงาน
- [ ] “กินอันนี้” / เลือกใหม่ / เมนูโปรด / แชร์ ทำงานตามกรณีที่รองรับ
- [ ] ร้านใกล้คุณทำงานเมื่ออนุญาต Location
- [ ] ปฏิเสธ Location แล้วมี fallback ที่ใช้งานต่อได้
- [ ] Google Maps fallback เปิดปลายทางที่คาดไว้

## PWA / recovery smoke test — ต้องใช้ platform จริง
- [ ] Service Worker register สำเร็จบน platform ที่รองรับ
- [ ] install/standalone flow ทำงานบน Android ที่รองรับ
- [ ] iPhone/iPad แสดง Add to Home Screen guidance ตามเงื่อนไข
- [ ] ปุ่ม “เข้าใจแล้ว” suppress guidance ตามช่วงที่ออกแบบ
- [ ] สลับแอป/ล็อกหน้าจอแล้วกลับมา ปุ่ม Surprise ไม่ค้าง
- [ ] offline shell ทำงานตามขอบเขตที่ออกแบบ
- [ ] กลับมา online แล้ว recovery ได้
- [ ] update จาก cache รุ่นก่อนหน้าไม่ต้องให้ผู้ใช้ล้างข้อมูลเอง

## Evidence
- Device / OS / Browser:
- Screenshot/Video:
- Pages workflow run:
- Live Smoke workflow run:
- QA/Beta workflow run:
- Commit verified:
- TC/NF ที่เกี่ยวข้อง:
- Defect/Issue:

## Result
- [ ] PASS — Live deployment ตรงกับ release candidate, automated evidence ที่จำเป็นผ่าน และ real-device smoke test ที่เกี่ยวข้องผ่าน
- [ ] FAIL — พบ defect; ห้ามตีความว่า deployment พร้อม
- [ ] BLOCKED — ยังไม่มีช่องทาง/อุปกรณ์/workflow result/หลักฐานเพียงพอ

### Interpretation rules
- `statuses: []` หรือไม่มี commit-status จาก API **ไม่ใช่ PASS และไม่ใช่ FAIL โดยอัตโนมัติ**; ให้ถือว่า automated run evidence ยังไม่ถูกยืนยันจากช่องทางนั้น
- Workflow file มีอยู่ = ยืนยันได้เฉพาะว่า automation ถูกกำหนดไว้ ไม่ได้ยืนยันผล run
- curl/grep smoke test ผ่าน = ยืนยัน asset/marker ระดับหนึ่ง แต่ไม่แทน TC/NF real-device interaction
- PASS ต้อง trace กลับไปยัง release candidate/commit และหลักฐานที่ตรวจสอบย้อนหลังได้
