# กินอะไรดี — Live Deployment Verification

ใช้เอกสารนี้ยืนยันว่า Public Beta ที่ผู้ใช้เปิดจริงตรงกับ release candidate ใน repository โดยห้ามทำเครื่องหมาย PASS จากการคาดเดา, static review หรือ workflow configuration เพียงอย่างเดียว

## Release candidate ปัจจุบัน
- Runtime commit SHA: `f08d069ab2e8a5c00f63cb3f16bf6ab58c2c1c3f`
- Last reviewed non-runtime descendant: `23a0e4fb83593b9d0217aa6576b711d3b96340de`
- Expected Service Worker cache: `kinaraidee-beta-v12`
- วันที่ reset evidence: 2026-08-22 (Asia/Bangkok)
- Public URL: https://rachanakorninon-gif.github.io/kinaraidee/
- Runtime change จาก candidate ก่อนหน้า: Feedback/Partner accessibility semantics + Service Worker cache generation v12

`23a0e4fb...` เป็น non-runtime descendant ที่ merge PR #19 และเปลี่ยนเฉพาะ `.github/workflows/qa.yml` เพื่อเพิ่ม release-marker drift gate; ไม่มี runtime asset ของ Public Beta เปลี่ยนใน commit นี้ ดังนั้น runtime candidate ยังคงเป็น `f08d069a...`

คำว่า **Last reviewed non-runtime descendant** เป็นจุดอ้างอิงที่ตรวจ diff แล้ว ไม่ได้หมายความว่าเป็น HEAD ปัจจุบันของ `main` เสมอไป เพราะ evidence/workflow/docs-only commits ใหม่อาจตามหลังได้โดยไม่เปลี่ยน runtime payload ก่อนใช้ descendant ใดเป็น release evidence ต้องตรวจ diff จาก runtime candidate และบันทึก **Deployed SHA** จริงด้านล่าง

## CI evidence ที่ยืนยันแล้วสำหรับ candidate นี้
PR #14 head `397100eec329bf4b1744e5c7a829a575d94fdb17` ผ่านก่อน merge:
- `Beta integrity checks` run `32537715302` — **SUCCESS**
- `Kinaraidee Beta QA` run `32537715337` — **SUCCESS**
- PR #14 squash-merge เข้า `main` เป็น `f08d069ab2e8a5c00f63cb3f16bf6ab58c2c1c3f`

CI ข้างต้นยืนยัน static/integrity checks เท่านั้น ไม่ยืนยัน Pages deployment, live endpoint หรือ real-device behavior

### Release-marker drift protection
PR #19 ถูก merge เข้า `main` เป็น `23a0e4fb83593b9d0217aa6576b711d3b96340de` และเพิ่ม QA step ที่ derive canonical PWA release marker จาก `sw.js` ต่อมา commit `afa4fde5eba03d402c88a957a23dd2d3da71c02e` ขยาย gate ให้ครอบคลุม release-evidence docs ด้วย ปัจจุบัน gate บังคับให้ไฟล์ต่อไปนี้อ้าง marker เดียวกัน:
- `.github/workflows/qa.yml`
- `.github/workflows/beta-check.yml`
- `.github/workflows/pages.yml`
- `.github/workflows/live-smoke.yml`
- `README.md`
- `LIVE-DEPLOYMENT-VERIFICATION.md`
- `BETA-RUN-LOG.md`
- `BETA-DEVICE-MATRIX.md`
- `RELEASE-CHECKLIST.md`

รายการนี้เป็น preventive QA evidence เท่านั้น ไม่ใช่หลักฐานว่า Pages/Live Smoke/real-device ผ่าน

## GitHub Pages / Live Smoke evidence
- [ ] GitHub Pages deployment ของ `f08d069a...` หรือ non-runtime descendant ที่พิสูจน์ว่า payload เท่ากัน มีสถานะสำเร็จ
- [ ] บันทึก Pages workflow run URL / ID และ deployed SHA
- [ ] Live Smoke run สำเร็จและ trace กลับไปยัง deployment เดียวกัน
- [ ] บันทึก Live Smoke workflow run URL / ID และ Job Summary ถ้ามี
- [ ] Public URL เสิร์ฟ runtime assets ของ release candidate ปัจจุบัน

> สถานะปัจจุบัน: **PENDING / BLOCKED FOR EVIDENCE** — connector ที่ใช้ในรอบนี้ยังไม่ยืนยัน push-triggered Pages/Live Smoke run ของ candidate หรือ descendant ล่าสุด จึงห้ามตีความว่า deployment ผ่านหรือ fail

## Live asset checks
ต้องตรวจจาก Public URL จริงหรือผล `live-smoke.yml` ที่ trace ได้:
- [ ] `/kinaraidee/` และ `index.html` โหลดได้
- [ ] `privacy.html` โหลดได้
- [ ] `feedback.html` โหลดได้และมี public-form accessibility markers ของ release ปัจจุบัน
- [ ] `partner.html` โหลดได้และมี public-form accessibility markers ของ release ปัจจุบัน
- [ ] `manifest.webmanifest` โหลดได้และข้อมูลสำคัญถูกต้อง
- [ ] `sw.js` โหลดได้และมี `kinaraidee-beta-v12`
- [ ] `sw.js` ใช้ atomic shell install ด้วย `cache.addAll(SHELL)` และไม่มี `Promise.allSettled` ใน install path
- [ ] `404.html`, `robots.txt`, `sitemap.xml`, `icon.svg` โหลดได้ตาม design
- [ ] `data/foods-expanded.js`, `data/choice-rules.js`, `data/nearby-restaurants.js`, `data/group-mode.js`, `data/pwa-install.js`, `data/home-surprise.js` โหลดได้
- [ ] Surprise busy/recovery markers และ iPhone/iPad install-guidance markers ตรงกับ release candidate

## Real-device smoke — ต้องใช้เครื่องจริง
Automated workflow ไม่แทนรายการนี้:
- [ ] หน้าแรก render และ core recommendation flow ใช้งานได้
- [ ] ปุ่ม “ไม่รู้เลย — เลือกให้ฉันทันที” ทำงานและป้องกัน double tap
- [ ] busy state / interruption / online recovery ทำงานตาม design
- [ ] Location allow/deny และ Google Maps fallback ใช้งานได้
- [ ] Feedback form ส่งได้จริงบน release `f08d069a...`
- [ ] Feedback rating/type/status semantics ถูกอ่าน/เปลี่ยนสถานะเหมาะสมบน assistive technology ที่ทดสอบ
- [ ] Partner application ส่งได้จริงบน release `f08d069a...`
- [ ] Partner form labels/autocomplete/live status ทำงานตาม platform ที่ทดสอบ
- [ ] PWA install/standalone/offline shell ทำงานบน platform ที่รองรับ
- [ ] upgrade จาก cache รุ่นก่อนหน้าไป `kinaraidee-beta-v12` สำเร็จโดยไม่ต้องให้ผู้ใช้ล้างข้อมูลเอง

## Evidence record
- Runtime candidate SHA: `f08d069ab2e8a5c00f63cb3f16bf6ab58c2c1c3f`
- Last reviewed non-runtime descendant: `23a0e4fb83593b9d0217aa6576b711d3b96340de`
- Deployed SHA:
- Pages workflow run URL / ID:
- Live Smoke workflow run URL / ID:
- Live Smoke release commit / source deployment run:
- Public URL checked:
- Observed SW/cache generation:
- Device / OS / Browser:
- Screenshot / video:
- TC/NF results:
- Defect / Issue:

## Result
- [ ] PASS — deployment/live evidence trace ได้และ real-device smoke ที่จำเป็นผ่าน
- [ ] FAIL — พบ defect หรือ deployment mismatch
- [x] BLOCKED — ยังไม่มี evidence เพียงพอสำหรับ candidate ปัจจุบัน

## Interpretation rules
- workflow file มีอยู่ ไม่เท่ากับ workflow run ผ่าน
- `statuses: []` หรือ API มองไม่เห็น push-run ไม่ใช่ PASS และไม่ใช่ FAIL โดยอัตโนมัติ
- PR CI success ไม่แทน Pages/Live Smoke
- Live Smoke success ไม่แทน real-device interaction
- ผล v11 / `bb7b9794...` ห้ามถูกยกมาเป็นผล v12 โดยอัตโนมัติสำหรับ flow ที่ runtime เปลี่ยน
- หาก deployed SHA เป็น non-runtime descendant ต้องยืนยัน diff ว่า runtime payload เท่ากับ `f08d069a...` ก่อนใช้เป็น release evidence
- ห้ามอัปเดตช่อง descendant เพียงเพื่อให้ตรงกับ HEAD ของ `main`; อัปเดตเมื่อมีการตรวจ diff จริงหรือเมื่อบันทึก deployment evidence ใหม่
