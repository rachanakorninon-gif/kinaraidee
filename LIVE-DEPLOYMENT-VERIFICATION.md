# กินอะไรดี — Live Deployment Verification

ใช้เอกสารนี้ยืนยันว่า Public Beta ที่ผู้ใช้เปิดจริงตรงกับ release candidate ใน repository โดยห้ามทำเครื่องหมาย PASS จากการคาดเดา, static review หรือ workflow configuration เพียงอย่างเดียว

## Release candidate ปัจจุบัน
- Runtime release SHA: `0624d7e4928e75d617137db0dba22825e7ba9f5a` (PR #28 merged)
- Current reviewed `main`: `0624d7e4928e75d617137db0dba22825e7ba9f5a`
- Pre-merge head: `e4bf276702be06baaf1c5abd41097f8122b4793b`
- Pre-merge CI: Release Consistency `32557712768` SUCCESS; Beta integrity `32557712762` SUCCESS; Beta QA `32557712761` SUCCESS
- Historical v13 renderer baseline: `83f8f36373f819fcaf3d5dde7f7ae830a1e4aea1`
- Historical v12 runtime baseline: `f08d069ab2e8a5c00f63cb3f16bf6ab58c2c1c3f`
- Expected Service Worker cache: `kinaraidee-beta-v13`
- วันที่ reset evidence: 2026-08-22 (Asia/Bangkok)
- Public URL: https://rachanakorninon-gif.github.io/kinaraidee/
- Runtime change จาก `83f8f363...`: Partner application submission เพิ่ม `privacy_notice_version='2026-08-21'` และ `privacy_acknowledged_at`; Service Worker cache generation ยังคง v13

ผลจาก v12 และผลจาก v13 runtime ก่อน `0624d7e4...` เป็น historical evidence เท่านั้นสำหรับ flow ที่เปลี่ยน โดยเฉพาะ TC-12 Partner application ห้ามยกผลเดิมมาเป็น PASS ของ candidate ปัจจุบันโดยไม่ retest

## CI evidence
PR #28 head `e4bf276702be06baaf1c5abd41097f8122b4793b` ผ่านก่อน merge:
- `Kinaraidee Release Consistency` run `32557712768` — **SUCCESS**
- `Beta integrity checks` run `32557712762` — **SUCCESS**
- `Kinaraidee Beta QA` run `32557712761` — **SUCCESS**
- merge เข้า `main` เป็น `0624d7e4928e75d617137db0dba22825e7ba9f5a`

CI ยืนยัน static/integrity/consistency checks เท่านั้น ไม่ยืนยัน Pages deployment, live endpoint หรือ real-device behavior

### Runtime lineage
GitHub compare ระหว่าง v13 renderer baseline `83f8f36373f819fcaf3d5dde7f7ae830a1e4aea1` และ current runtime `0624d7e4928e75d617137db0dba22825e7ba9f5a` แสดงว่า current runtime อยู่ข้างหน้า 13 commits / behind 0 และมี runtime change ที่ `partner.html` พร้อม workflow/release-evidence changes ดังนั้น `0624d7e4...` ต้องถือเป็น release candidate ใหม่สำหรับ TC-12 ไม่ใช่ non-runtime descendant ของ `83f8f363...`

### Release-marker drift protection
กติกาที่ต้องรักษา:
- runtime/workflow/README ที่อธิบาย release ปัจจุบันต้องใช้ canonical marker เดียวกับ `sw.js`
- release-evidence docs ต้องอ้าง canonical marker ปัจจุบัน แต่อนุญาต marker รุ่นเก่าที่เก็บไว้เป็น historical baseline พร้อมบริบท
- candidate ปัจจุบันยังใช้ `kinaraidee-beta-v13`; การเปลี่ยน partner privacy acknowledgement payload ไม่ได้ bump cache generation

## GitHub Pages / Live Smoke evidence
- [ ] GitHub Pages deployment ของ `0624d7e4...` หรือ descendant ที่พิสูจน์ว่า runtime payload เท่ากันมีสถานะสำเร็จ
- [ ] บันทึก Pages workflow run URL / ID และ deployed SHA
- [ ] Live Smoke run สำเร็จและ trace กลับไปยัง deployment เดียวกัน
- [ ] บันทึก Live Smoke workflow run URL / ID และ Job Summary ถ้ามี
- [ ] Public URL เสิร์ฟ runtime assets ของ release candidate ปัจจุบัน

> สถานะปัจจุบัน: **PENDING / BLOCKED FOR EVIDENCE** — pre-merge CI ของ PR #28 ผ่าน แต่ยังไม่มี Pages/Live Smoke evidence ที่ trace กลับมายัง deployed `0624d7e4...` ในเอกสารนี้ จึงห้ามตีความว่า deployment ผ่านหรือ fail

## Live asset checks
ต้องตรวจจาก Public URL จริงหรือผล `live-smoke.yml` ที่ trace ได้:
- [ ] `/kinaraidee/` และ `index.html` โหลดได้
- [ ] `privacy.html`, `feedback.html`, `partner.html` โหลดได้
- [ ] `manifest.webmanifest` โหลดได้และข้อมูลสำคัญถูกต้อง
- [ ] `sw.js` โหลดได้และมี `kinaraidee-beta-v13`
- [ ] `sw.js` ใช้ atomic shell install ด้วย `cache.addAll(SHELL)` และไม่มี `Promise.allSettled` ใน install path
- [ ] `404.html`, `robots.txt`, `sitemap.xml`, `icon.svg` โหลดได้ตาม design
- [ ] `data/nearby-restaurants.js` โหลดได้และมี `box.replaceChildren()` + `textContent` markers ของ safe partner renderer
- [ ] `partner.html` มี `PRIVACY_NOTICE_VERSION='2026-08-21'`, `privacy_notice_version:PRIVACY_NOTICE_VERSION` และ `privacy_acknowledged_at:new Date().toISOString()`
- [ ] Surprise busy/recovery markers และ iPhone/iPad install-guidance markers ตรงกับ release candidate

## Real-device smoke — ต้องใช้เครื่องจริง
Automated workflow ไม่แทนรายการนี้:
- [ ] หน้าแรก render และ core recommendation flow ใช้งานได้
- [ ] ปุ่ม “ไม่รู้เลย — เลือกให้ฉันทันที” ทำงานและป้องกัน double tap
- [ ] busy state / interruption / online recovery ทำงานตาม design
- [ ] Location allow/deny และ Google Maps fallback ใช้งานได้
- [ ] nearby partner/fallback card render ถูกต้องบน Android/iPhone และไม่มี regression จากการเปลี่ยน renderer
- [ ] Feedback form ส่งได้จริง
- [ ] Partner application ส่งได้จริงและ submission ใหม่มี privacy acknowledgement evidence ตาม design
- [ ] PWA install/standalone/offline shell ทำงานบน platform ที่รองรับ
- [ ] upgrade จาก cache รุ่นก่อนหน้าไป `kinaraidee-beta-v13` สำเร็จโดยไม่ต้องให้ผู้ใช้ล้างข้อมูลเอง

## Evidence record
- Runtime candidate SHA: `0624d7e4928e75d617137db0dba22825e7ba9f5a`
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
- ผลจาก runtime ก่อน `0624d7e4...` ห้ามถูกยกมาเป็นผล TC-12 ของ candidate ปัจจุบันโดยอัตโนมัติ
- หาก deployed SHA เป็น descendant ต้องยืนยัน diff ว่า runtime payload เท่ากับ `0624d7e4...` ก่อนใช้เป็น release evidence