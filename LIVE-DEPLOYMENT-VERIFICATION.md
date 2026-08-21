# กินอะไรดี — Live Deployment Verification

ใช้เอกสารนี้ยืนยันว่า Public Beta ที่ผู้ใช้เปิดจริงตรงกับ release candidate ใน repository โดยห้ามทำเครื่องหมาย PASS จากการคาดเดา

## Release candidate
- Commit SHA: `bb7b979421275995a6fee12f84b118d0c942037a`
- วันที่ตรวจ: 2026-08-22 (Asia/Bangkok)
- ผู้ตรวจ: GitHub Actions + release evidence review
- Public URL: https://rachanakorninon-gif.github.io/kinaraidee/

## GitHub Pages deployment evidence
- [ ] GitHub Pages เปิดใช้งาน
- [ ] deployment ที่อ้างอิง commit นี้มีสถานะสำเร็จ หรือมีหลักฐานเทียบเท่า
- [ ] `index.html` ถูกเผยแพร่จาก publishing source ที่ตั้งใจ
- [ ] ไม่มี deployment error ที่ยังไม่ได้แก้

> สถานะปัจจุบัน: **PENDING / BLOCKED FOR EVIDENCE** — ยังไม่พบ Pages push-triggered run / Live Smoke run ของ release commit นี้จากช่องทางตรวจที่เข้าถึงได้ จึงห้ามตีความว่า PASS หรือ FAIL

## Automated evidence ที่มีใน repository
Workflow ที่เกี่ยวข้อง:
- `.github/workflows/pages.yml` — deploy ไป GitHub Pages
- `.github/workflows/live-smoke.yml` — รันหลัง Pages deploy สำเร็จ และมี `workflow_dispatch` สำหรับรันเอง
- `.github/workflows/qa.yml` — static/QA checks
- `.github/workflows/beta-check.yml` — Beta readiness checks

### CI evidence ที่ยืนยันแล้วก่อน merge
- PR #6 head commit: `f4b6d1dc9dbe95a11efe600c8a237bfb2783ee9b`
- `Kinaraidee Beta QA` run `32534087192` — **SUCCESS**
- `Beta integrity checks` run `32534087149` — **SUCCESS**
- PR #6 ถูก squash-merge เข้า `main` เป็น release commit `bb7b979421275995a6fee12f84b118d0c942037a`
- Release commit เพิ่ม `data/home-surprise.js` เข้า app shell และแก้ secret-scan self-match ใน QA/Beta workflows

`live-smoke.yml` ตรวจจาก Public URL จริง ไม่ใช่เฉพาะไฟล์ใน repository และครอบคลุม public pages/assets, SEO markers, PWA assets, Service Worker cache generation, atomic app-shell install marker, Surprise flow markers, recovery markers และ iPhone/iPad install guidance

เมื่อ `live-smoke.yml` ผ่านครบทุก verification step จะเขียน **Kinaraidee automated live evidence** ลง GitHub Actions Job Summary โดยบันทึก release commit ที่ตรวจ, trigger, source Pages deployment run, Public URL, cache generation และ app-shell strategy เพื่อให้ trace กลับไปยัง release candidate ได้ง่ายขึ้น

> สำคัญ: Job Summary นี้เป็น automated live-asset evidence เท่านั้น ไม่แทน real-device TC/NF interaction test และไม่ใช่ Commercial GO approval

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
- [ ] Live `sw.js` ใช้ cache generation ที่คาดไว้ (ปัจจุบัน `kinaraidee-beta-v11`)
- [ ] Live `sw.js` ใช้ atomic app-shell install ด้วย `cache.addAll(SHELL)`
- [ ] Live `sw.js` ไม่มี `Promise.allSettled` ใน install path ที่อาจปล่อย partial shell cache
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
- [ ] update จาก cache รุ่นก่อนหน้าไป `v11` ไม่ต้องให้ผู้ใช้ล้างข้อมูลเอง

## Evidence
- Device / OS / Browser: **PENDING — ต้องใช้ real device**
- Screenshot/Video: **PENDING**
- Pages workflow run: **PENDING — ยังยืนยัน push-triggered run ของ `bb7b9794...` ไม่ได้**
- Live Smoke workflow run: **PENDING**
- Live Smoke Job Summary / release commit: **PENDING**
- QA/Beta workflow run: QA `32534087192` SUCCESS; Beta `32534087149` SUCCESS
- Commit verified: `bb7b979421275995a6fee12f84b118d0c942037a`
- TC/NF ที่เกี่ยวข้อง: **PENDING real-device evidence**
- Defect/Issue: ไม่มี defect ใหม่จาก PR CI รอบที่ผ่าน; deployment/live evidence ยังไม่ครบ

## Result
- [ ] PASS — Live deployment ตรงกับ release candidate, automated evidence ที่จำเป็นผ่าน และ real-device smoke test ที่เกี่ยวข้องผ่าน
- [ ] FAIL — พบ defect; ห้ามตีความว่า deployment พร้อม
- [x] BLOCKED — ยังไม่มีช่องทาง/อุปกรณ์/workflow result/หลักฐานเพียงพอ

### Interpretation rules
- `statuses: []` หรือไม่มี commit-status จาก API **ไม่ใช่ PASS และไม่ใช่ FAIL โดยอัตโนมัติ**; ให้ถือว่า automated run evidence ยังไม่ถูกยืนยันจากช่องทางนั้น
- Workflow file มีอยู่ = ยืนยันได้เฉพาะว่า automation ถูกกำหนดไว้ ไม่ได้ยืนยันผล run
- GitHub Actions Job Summary ที่เกิดหลัง live-smoke verification ผ่าน = ใช้เป็น traceable automated evidence ของ live assets ได้ แต่ไม่แทน real-device evidence
- curl/grep smoke test ผ่าน = ยืนยัน asset/marker ระดับหนึ่ง แต่ไม่แทน TC/NF real-device interaction
- PASS ต้อง trace กลับไปยัง release candidate/commit และหลักฐานที่ตรวจสอบย้อนหลังได้
