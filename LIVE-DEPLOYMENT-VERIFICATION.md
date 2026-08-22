# กินอะไรดี — Live Deployment Verification

ใช้เอกสารนี้ยืนยันว่า Public Beta ที่ผู้ใช้เปิดจริงตรงกับ release candidate ใน repository โดยห้ามทำเครื่องหมาย PASS จากการคาดเดา, static review หรือ workflow configuration เพียงอย่างเดียว

## Release candidate ปัจจุบัน
- Runtime candidate SHA: `21c56f2e84760fada6cebfa464be767facb56b34` (PR #37 merged)
- Expected Service Worker cache: `kinaraidee-beta-v13`
- วันที่ reset evidence: 2026-08-22 (Asia/Bangkok)
- Public URL: https://rachanakorninon-gif.github.io/kinaraidee/
- Runtime change ล่าสุด: `data/member-sync.js` แก้ cloud-history mapping ให้มี local timestamp field `at` และ fallback timestamp เพื่อป้องกัน `Invalid Date` ใน history renderer
- มี regression workflow `.github/workflows/history-sync-regression.yml` ตรวจ syntax, cloud-to-local history schema และ renderer timestamp contract
- Historical partner/privacy runtime: `0624d7e4928e75d617137db0dba22825e7ba9f5a` (PR #28 merged)
- Historical renderer runtime: `83f8f36373f819fcaf3d5dde7f7ae830a1e4aea1`
- Historical v12 baseline: `f08d069ab2e8a5c00f63cb3f16bf6ab58c2c1c3f`

ผล Pages/Live Smoke/real-device จาก candidate ก่อน `21c56f2e...` ห้ามยกมาเป็นผลของ member-history sync regression fix โดยอัตโนมัติ

## Repository evidence
ตรวจจาก `main` ปัจจุบัน:
- `sw.js` ใช้ `kinaraidee-beta-v13`
- `sw.js` ใช้ atomic `cache.addAll(SHELL)`
- compare `0624d7e4...` → `21c56f2e...` พบ runtime asset ที่เปลี่ยนคือ `data/member-sync.js`; จึงต้องยกระดับ `21c56f2e...` เป็น runtime candidate ปัจจุบัน
- `data/member-sync.js` map `created_at` ไป `at` แบบ numeric timestamp และ fallback เมื่อ parse ไม่สำเร็จ
- `.github/workflows/history-sync-regression.yml` ตรวจ contract นี้แบบ static regression gate
- Partner privacy acknowledgement wiring จาก PR #28 ยังคงอยู่ใน lineage เดียวกัน

Repository/static evidence ยืนยัน implementation และ guard wiring เท่านั้น ไม่ยืนยัน Pages deployment, live endpoint, cloud data behavior จริง หรือ real-device behavior

### Release-marker drift protection
กติกาที่ต้องรักษา:
- runtime/workflow/README ที่อธิบาย release ปัจจุบันต้องใช้ canonical marker เดียวกับ `sw.js`
- release-evidence docs ต้องอ้าง canonical marker ปัจจุบัน แต่ marker รุ่นเก่าเก็บได้เฉพาะเมื่อระบุเป็น historical baseline ชัดเจน

## GitHub Pages / Live Smoke evidence
- [ ] GitHub Pages deployment ของ `21c56f2e...` หรือ descendant ที่พิสูจน์ว่า runtime payload เท่ากันมีสถานะสำเร็จ
- [ ] บันทึก Pages workflow run URL / ID และ deployed SHA
- [ ] Live Smoke run สำเร็จและ trace กลับไปยัง deployment เดียวกัน
- [ ] บันทึก Live Smoke workflow run URL / ID และ Job Summary ถ้ามี
- [ ] Public URL เสิร์ฟ runtime assets ของ release candidate ปัจจุบัน
- [ ] Live `data/member-sync.js` มี timestamp mapping ของ PR #37
- [ ] Live `partner.html` ยังมี partner privacy acknowledgement wiring ของ PR #28

> สถานะปัจจุบัน: **PENDING / BLOCKED FOR EVIDENCE** — ยังไม่มีหลักฐาน Pages/Live Smoke/real-device ของ candidate `21c56f2e...` ที่ตรวจสอบได้ครบ จึงห้ามตีความว่า deployment ผ่านหรือ fail

## Live asset checks
ต้องตรวจจาก Public URL จริงหรือผล `live-smoke.yml` ที่ trace ได้:
- [ ] `/kinaraidee/` และ `index.html` โหลดได้
- [ ] `privacy.html`, `feedback.html`, `partner.html` โหลดได้
- [ ] `manifest.webmanifest` โหลดได้และข้อมูลสำคัญถูกต้อง
- [ ] `sw.js` โหลดได้และมี `kinaraidee-beta-v13`
- [ ] `sw.js` ใช้ atomic shell install ด้วย `cache.addAll(SHELL)` และไม่มี `Promise.allSettled` ใน install path
- [ ] `404.html`, `robots.txt`, `sitemap.xml`, `icon.svg` โหลดได้ตาม design
- [ ] `data/nearby-restaurants.js` โหลดได้และมี safe partner renderer markers
- [ ] `data/member-sync.js` มี `Date.parse(r.created_at)` และกำหนด `at` เป็น numeric timestamp/fallback
- [ ] `partner.html` มี `PRIVACY_NOTICE_VERSION='2026-08-21'`
- [ ] `partner.html` ส่ง `privacy_notice_version` และ `privacy_acknowledged_at` ตาม implementation
- [ ] Surprise busy/recovery markers และ iPhone/iPad install-guidance markers ตรงกับ release candidate

## Real-device smoke — ต้องใช้เครื่องจริง
Automated workflow ไม่แทนรายการนี้:
- [ ] หน้าแรก render และ core recommendation flow ใช้งานได้
- [ ] ปุ่ม “ไม่รู้เลย — เลือกให้ฉันทันที” ทำงานและป้องกัน double tap
- [ ] busy state / interruption / online recovery ทำงานตาม design
- [ ] Location allow/deny และ Google Maps fallback ใช้งานได้
- [ ] nearby partner/fallback card render ถูกต้องบน Android/iPhone
- [ ] Member cloud history แสดงวันที่ถูกต้อง ไม่มี `Invalid Date` และ liked/picked state ถูกต้องหลัง sign-in/sync
- [ ] Feedback form ส่งได้จริง
- [ ] Partner application ส่งได้จริงและ consent/privacy acknowledgement path ทำงานตามที่ออกแบบ
- [ ] PWA install/standalone/offline shell ทำงานบน platform ที่รองรับ
- [ ] upgrade จาก cache รุ่นก่อนหน้าไป `kinaraidee-beta-v13` สำเร็จโดยไม่ต้องให้ผู้ใช้ล้างข้อมูลเอง

## Evidence record
- Runtime candidate SHA: `21c56f2e84760fada6cebfa464be767facb56b34`
- Deployed SHA:
- Pages workflow run URL / ID:
- Live Smoke workflow run URL / ID:
- Live Smoke release commit / source deployment run:
- Public URL checked:
- Observed SW/cache generation:
- Observed member-history timestamp behavior:
- Observed partner privacy notice version:
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
- PR/static QA success ไม่แทน Pages/Live Smoke
- Live Smoke success ไม่แทน real-device interaction
- static history schema check ไม่เท่ากับ cloud sync บนอุปกรณ์จริงผ่าน
- form wiring อยู่ใน source ไม่เท่ากับ form submission จริงสำเร็จ
- ผล candidate ก่อน PR #37 ห้ามถูกยกมาเป็นผลของ member-history fix บน `21c56f2e...` โดยอัตโนมัติ
- หาก deployed SHA เป็น descendant ต้องยืนยัน diff ว่า runtime payload ที่เกี่ยวข้องเท่ากับ `21c56f2e...` ก่อนใช้เป็น release evidence
