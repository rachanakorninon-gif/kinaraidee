# กินอะไรดี — Live Deployment Verification

ใช้เอกสารนี้ยืนยันว่า Public Beta ที่ผู้ใช้เปิดจริงตรงกับ release candidate ใน repository โดยห้ามทำเครื่องหมาย PASS จากการคาดเดา, static review หรือ workflow configuration เพียงอย่างเดียว

## Release candidate ปัจจุบัน
- Runtime candidate SHA: `6fadf04fdf647680b60df2ada9cb43f4659816dd` (PR #42 merged)
- Current non-runtime descendant: `907ea6b1b44ae3d7ec0bc82323ac96716b46cae0` (PR #44 merged)
- Expected Service Worker cache: `kinaraidee-beta-v13`
- วันที่ reset evidence: 2026-08-22 (Asia/Bangkok)
- Public URL: https://rachanakorninon-gif.github.io/kinaraidee/
- Runtime change ล่าสุด: PR #42 restores the completed live-group result bridge after the Android 2/2-vote final-result failure โดยคืน `useRemoteVotes(votes,setup)`, `window.KINARAIDEE_GROUP_MODE.showRemoteResult` และ deterministic loading ของ group modules
- PR #41 ก่อนหน้านี้เพิ่ม member-history write/read race hardening; PR #37 แก้ cloud-history timestamp mapping เพื่อป้องกัน `Invalid Date`
- PR #44 ไม่เปลี่ยน public runtime payload แต่เพิ่ม Pages `release-meta.json` และ Live Smoke checks ที่ trace deployed SHA + group-result bridge
- Historical partner/privacy runtime: `0624d7e4928e75d617137db0dba22825e7ba9f5a` (PR #28 merged)
- Historical member-history timestamp runtime: `21c56f2e84760fada6cebfa464be767facb56b34` (PR #37 merged)
- Historical member-history race-hardening runtime: `d2b8dc08d908fb6034a1958d2260c8886ad96804` (PR #41 merged)
- Historical renderer runtime: `83f8f36373f819fcaf3d5dde7f7ae830a1e4aea1`
- Historical v12 baseline: `f08d069ab2e8a5c00f63cb3f16bf6ab58c2c1c3f`

ผล Pages/Live Smoke จาก candidate ก่อน `6fadf04f...` ห้ามยกมาเป็นผลของ PR #42 โดยอัตโนมัติ ต้อง trace deployment ใหม่หรือพิสูจน์ runtime-equivalent descendant ก่อน

## Repository evidence
ตรวจจาก `main` lineage ปัจจุบัน:
- `sw.js` ใช้ `kinaraidee-beta-v13`
- `sw.js` ใช้ atomic `cache.addAll(SHELL)`
- PR #42 เปลี่ยน group runtime และเพิ่ม dedicated `Group Result Regression` workflow
- `data/group-mode.js` export remote-result bridge และโหลด `group-sync.js`/`group-remote.js` ตามลำดับที่กำหนด
- `data/group-remote.js` ส่ง completed remote votes กลับเข้า group result renderer
- `data/member-sync.js` ยังคง timestamp mapping/fallback จาก PR #37 และ stale-snapshot/write-race protection จาก PR #41
- PR #44 เพิ่ม deployment observability ด้วย generated `release-meta.json` ซึ่งบันทึก deployed SHA และ PWA cache marker และ Live Smoke จะตรวจ SHA กับ Pages workflow-run head เมื่อ trigger จาก deployment
- Partner privacy acknowledgement wiring จาก PR #28 ยังคงอยู่ใน lineage เดียวกัน

Repository/static evidence ยืนยัน implementation และ guard wiring เท่านั้น ไม่ยืนยัน Pages deployment หรือ Public URL ปัจจุบัน

### Verified CI evidence for PR #42 head
`CURRENT-RELEASE.md` บันทึก PR #42 head `d0afde6a6c6b819bfd078ebb4222738a7dad878b` ว่ามีผลสำเร็จสำหรับ Beta integrity, Beta QA, Security Hygiene, Group Result Regression, History Sync Regression และ Release Consistency พร้อม run IDs ที่ trace ได้

หลักฐาน CI เหล่านี้ไม่แทน GitHub Pages deployment, Live Smoke หรือ full real-device matrix

### Release-marker / deployment-trace protection
- runtime/workflow/README ที่อธิบาย release ปัจจุบันต้องใช้ canonical marker เดียวกับ `sw.js`
- release-evidence docs ต้องอ้าง canonical marker ปัจจุบัน แต่ marker รุ่นเก่าเก็บได้เฉพาะเมื่อระบุเป็น historical baseline ชัดเจน
- Pages artifact จาก PR #44 สร้าง `release-meta.json` เพื่อให้ deployed SHA ตรวจย้อนกลับได้
- Live Smoke จาก PR #44 ตรวจ group bridge บน deployed assets และตรวจ `release-meta.json`; workflow configuration นี้ยังไม่เท่ากับ run PASS

## GitHub Pages / Live Smoke evidence
- [ ] GitHub Pages deployment ของ `6fadf04f...` หรือ descendant ที่พิสูจน์ว่า runtime payload เท่ากัน (เช่น `907ea6b1...` หาก compare แล้วไม่เปลี่ยน runtime) มีสถานะสำเร็จ
- [ ] บันทึก Pages workflow run URL / ID และ deployed SHA
- [ ] Live Smoke run สำเร็จและ trace กลับไปยัง deployment เดียวกัน
- [ ] บันทึก Live Smoke workflow run URL / ID และ Job Summary ถ้ามี
- [ ] Public `release-meta.json` มี SHA ตรงกับ deployment ที่กำลังยืนยันและ `pwa_cache` เป็น `kinaraidee-beta-v13`
- [ ] Public URL เสิร์ฟ runtime assets ของ release candidate ปัจจุบัน
- [ ] Live group bridge markers จาก PR #42 อยู่ครบใน `data/group-mode.js` และ `data/group-remote.js`
- [ ] Live `data/member-sync.js` มี timestamp mapping จาก PR #37 และ write/read race hardening จาก PR #41
- [ ] Live `partner.html` ยังมี partner privacy acknowledgement wiring ของ PR #28

> สถานะปัจจุบัน: **PARTIAL / BLOCKED FOR DEPLOYMENT TRACE** — มี CI/static evidence และ deployment-trace implementation แล้ว แต่ยังไม่มี Pages + Live Smoke run evidence ที่บันทึกครบสำหรับ `6fadf04f...` หรือ runtime-equivalent descendant จึงยังห้ามตีความว่า deployment gate ผ่าน

## Live asset checks
ต้องตรวจจาก Public URL จริงหรือผล `live-smoke.yml` ที่ trace ได้:
- [ ] `/kinaraidee/` และ `index.html` โหลดได้
- [ ] `privacy.html`, `feedback.html`, `partner.html` โหลดได้
- [ ] `manifest.webmanifest` โหลดได้และข้อมูลสำคัญถูกต้อง
- [ ] `release-meta.json` โหลดได้และมี SHA/PWA marker ที่ trace ได้
- [ ] `sw.js` โหลดได้และมี `kinaraidee-beta-v13`
- [ ] `sw.js` ใช้ atomic shell install ด้วย `cache.addAll(SHELL)` และไม่มี `Promise.allSettled` ใน install path
- [ ] `404.html`, `robots.txt`, `sitemap.xml`, `icon.svg` โหลดได้ตาม design
- [ ] `data/nearby-restaurants.js` โหลดได้และมี safe partner renderer markers
- [ ] `data/group-mode.js` / `data/group-remote.js` มี completed live-group result bridge ของ PR #42
- [ ] `data/member-sync.js` มี numeric timestamp mapping/fallback และ write/read race guard ของ PR #41
- [ ] `partner.html` มี `PRIVACY_NOTICE_VERSION='2026-08-21'`
- [ ] `partner.html` ส่ง `privacy_notice_version` และ `privacy_acknowledged_at` ตาม implementation
- [ ] Surprise busy/recovery markers และ iPhone/iPad install-guidance markers ตรงกับ release candidate

## Real-device evidence
Automated workflow ไม่แทนรายการนี้

### Recorded Android same-device evidence — 2026-08-22
ตาม `CURRENT-RELEASE.md` และ defect records:
- Issue #38 `Invalid Date` หลัง cloud sync: **fixed / same-device retest recorded**
- Issue #40 favorite loss หลัง lock/resume: **fixed / same-device retest recorded** หลัง PR #41
- session เดียวกันยังมี evidence สำหรับ offline → online recovery, Google Maps round-trip, favorite/history persistence, logout/login persistence, standalone close/reopen และ denied-location fallback
- live-group room creation, invite sharing, participant sync และ 2/2 vote completion ถูกสังเกตบน Android แต่ final-result step **FAIL ก่อน PR #42** และยังต้อง retest หลัง fix

หลักฐานข้างต้นใช้ได้เฉพาะ device/session ที่บันทึกไว้ ไม่เท่ากับ full matrix PASS

### Remaining real-device matrix
- [ ] Retest live-group final-result path หลัง PR #42 บน Android เครื่องที่พบ defect เดิม และบันทึกผลจริง
- [ ] หน้าแรกและ core recommendation flow มี evidence ครบตาม device matrix
- [ ] ปุ่ม “ไม่รู้เลย — เลือกให้ฉันทันที” / double tap / busy state มี evidence ครบตาม platform ที่กำหนด
- [ ] Location allow/deny และ Google Maps fallback มี evidence ครบตาม matrix
- [ ] nearby partner/fallback card render มี evidence บน Android/iPhone ตามเกณฑ์
- [ ] Member cloud history regression มี evidence เพิ่มตาม matrix ที่กำหนด ไม่อาศัย Android session เดียว
- [ ] Feedback form ส่งได้จริงตาม release/deployment ที่ trace ได้
- [ ] Partner application ส่งได้จริงและ consent/privacy acknowledgement path ถูก retest ตาม release ที่ trace ได้
- [ ] PWA install/standalone/offline shell ทำงานบน platform ที่รองรับ
- [ ] upgrade จาก cache รุ่นก่อนหน้าไป `kinaraidee-beta-v13` สำเร็จโดยไม่ต้องให้ผู้ใช้ล้างข้อมูลเอง

## Evidence record
- Runtime candidate SHA: `6fadf04fdf647680b60df2ada9cb43f4659816dd`
- Runtime-equivalent descendant (ถ้ามี):
- Deployed SHA:
- `release-meta.json` observed SHA / PWA cache:
- Pages workflow run URL / ID:
- Live Smoke workflow run URL / ID:
- Live Smoke release commit / source deployment run:
- Public URL checked:
- Observed SW/cache generation:
- Observed group final-result behavior:
- Observed member-history behavior:
- Observed partner privacy notice version:
- Device / OS / Browser:
- Screenshot / video:
- TC/NF results:
- Defect / Issue:

## Result
- [ ] PASS — deployment/live evidence trace ได้และ real-device smoke ที่จำเป็นผ่าน
- [ ] FAIL — พบ defect หรือ deployment mismatch
- [x] BLOCKED — deployment trace, group-result retest และ full device-matrix evidence ยังไม่ครบสำหรับ candidate ปัจจุบัน

## Interpretation rules
- workflow file มีอยู่ ไม่เท่ากับ workflow run ผ่าน
- `release-meta.json` generation code มีอยู่ ไม่เท่ากับ deployed file ถูกตรวจแล้ว
- PR/static QA success ไม่แทน Pages/Live Smoke
- Live Smoke success ไม่แทน real-device interaction
- Android same-device regression success ไม่เท่ากับ full Android/iPhone matrix PASS
- pre-fix 2/2 group completion ไม่เท่ากับ post-PR #42 final-result PASS
- static history sync checks ไม่เท่ากับ cloud sync บนอุปกรณ์จริงทุก platform ผ่าน
- form wiring อยู่ใน source ไม่เท่ากับ form submission จริงสำเร็จ
- ผล candidate ก่อน PR #42 ห้ามถูกยกมาเป็น deployment result ของ `6fadf04f...` โดยอัตโนมัติ
- หาก deployed SHA เป็น descendant ต้องยืนยัน diff ว่า runtime payload ที่เกี่ยวข้องเท่ากับ `6fadf04f...` ก่อนใช้เป็น release evidence
