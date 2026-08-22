# กินอะไรดี — Live Deployment Verification

ใช้เอกสารนี้ยืนยันว่า Public Beta ที่ผู้ใช้เปิดจริงตรงกับ release candidate ใน repository โดยห้ามทำเครื่องหมาย PASS จากการคาดเดา, static review หรือ workflow configuration เพียงอย่างเดียว

## Release candidate ปัจจุบัน
- Runtime candidate: PR #25 (`security/partner-card-textcontent-v13`); ต้องบันทึก final merge SHA หลัง merge
- Historical v12 runtime baseline: `f08d069ab2e8a5c00f63cb3f16bf6ab58c2c1c3f`
- Expected Service Worker cache: `kinaraidee-beta-v13`
- วันที่ reset evidence: 2026-08-22 (Asia/Bangkok)
- Public URL: https://rachanakorninon-gif.github.io/kinaraidee/
- Runtime change จาก v12: partner/fallback cards เปลี่ยน data-driven rendering เป็น DOM nodes/`textContent` และ Service Worker cache generation bump เป็น v13

v12 และ evidence ที่อ้าง `f08d069a...` / `kinaraidee-beta-v12` เป็น historical evidence เท่านั้น ไม่ใช่หลักฐานของ v13 สำหรับ nearby partner rendering, PWA update หรือ flow ที่ได้รับผลกระทบ

## CI evidence
ก่อน merge PR #25 ต้องมี CI ปัจจุบันของ head ผ่านอย่างน้อย:
- `Beta integrity checks`
- `Kinaraidee Beta QA`
- `Kinaraidee Release Consistency`

CI ยืนยัน static/integrity/consistency checks เท่านั้น ไม่ยืนยัน Pages deployment, live endpoint หรือ real-device behavior

### Release-marker drift protection
กติกาที่ต้องรักษา:
- runtime/workflow/README ที่อธิบาย release ปัจจุบันต้องใช้ canonical marker เดียวกับ `sw.js`
- release-evidence docs ต้องอ้าง canonical markerปัจจุบัน แต่อนุญาต marker รุ่นเก่าที่เก็บไว้เป็น historical baseline พร้อมบริบท

## GitHub Pages / Live Smoke evidence
- [ ] GitHub Pages deployment ของ final v13 merge SHA หรือ non-runtime descendant ที่พิสูจน์ว่า payload เท่ากันมีสถานะสำเร็จ
- [ ] บันทึก Pages workflow run URL / ID และ deployed SHA
- [ ] Live Smoke run สำเร็จและ trace กลับไปยัง deployment เดียวกัน
- [ ] บันทึก Live Smoke workflow run URL / ID และ Job Summary ถ้ามี
- [ ] Public URL เสิร์ฟ runtime assets ของ release candidate ปัจจุบัน

> สถานะปัจจุบัน: **PENDING / BLOCKED FOR EVIDENCE** — ยังไม่มีหลักฐาน Pages/Live Smoke ของ v13 จึงห้ามตีความว่า deployment ผ่านหรือ fail

## Live asset checks
ต้องตรวจจาก Public URL จริงหรือผล `live-smoke.yml` ที่ trace ได้:
- [ ] `/kinaraidee/` และ `index.html` โหลดได้
- [ ] `privacy.html`, `feedback.html`, `partner.html` โหลดได้
- [ ] `manifest.webmanifest` โหลดได้และข้อมูลสำคัญถูกต้อง
- [ ] `sw.js` โหลดได้และมี `kinaraidee-beta-v13`
- [ ] `sw.js` ใช้ atomic shell install ด้วย `cache.addAll(SHELL)` และไม่มี `Promise.allSettled` ใน install path
- [ ] `404.html`, `robots.txt`, `sitemap.xml`, `icon.svg` โหลดได้ตาม design
- [ ] `data/nearby-restaurants.js` โหลดได้และมี `box.replaceChildren()` + `textContent` markers ของ safe partner renderer
- [ ] Surprise busy/recovery markers และ iPhone/iPad install-guidance markers ตรงกับ release candidate

## Real-device smoke — ต้องใช้เครื่องจริง
Automated workflow ไม่แทนรายการนี้:
- [ ] หน้าแรก render และ core recommendation flow ใช้งานได้
- [ ] ปุ่ม “ไม่รู้เลย — เลือกให้ฉันทันที” ทำงานและป้องกัน double tap
- [ ] busy state / interruption / online recovery ทำงานตาม design
- [ ] Location allow/deny และ Google Maps fallback ใช้งานได้
- [ ] nearby partner/fallback card render ถูกต้องบน Android/iPhone และไม่มี regression จากการเปลี่ยน renderer
- [ ] Feedback form และ Partner application ส่งได้จริง
- [ ] PWA install/standalone/offline shell ทำงานบน platform ที่รองรับ
- [ ] upgrade จาก cache รุ่นก่อนหน้าไป `kinaraidee-beta-v13` สำเร็จโดยไม่ต้องให้ผู้ใช้ล้างข้อมูลเอง

## Evidence record
- Runtime candidate SHA:
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
- PR CI success ไม่แทน Pages/Live Smoke
- Live Smoke success ไม่แทน real-device interaction
- ผล v12 / `f08d069a...` ห้ามถูกยกมาเป็นผล v13 โดยอัตโนมัติสำหรับ flow ที่ runtime เปลี่ยน
- หาก deployed SHA เป็น non-runtime descendant ต้องยืนยัน diff ว่า runtime payload เท่ากับ final v13 runtime SHA ก่อนใช้เป็น release evidence