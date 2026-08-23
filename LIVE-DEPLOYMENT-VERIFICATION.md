# กินอะไรดี — Live Deployment Verification

ใช้เอกสารนี้ยืนยันว่า Public Beta ที่ผู้ใช้เปิดจริงตรงกับ release candidate ใน repository โดยห้ามทำเครื่องหมาย PASS จากการคาดเดา, static review หรือ workflow configuration เพียงอย่างเดียว

## Release candidate ปัจจุบัน
- Runtime candidate SHA: `96b405460f29d0f410f255cc48c68c58e4621784` (PR #67 squash-merged)
- Latest reviewed source descendant: `4568c731d3957d88373db914cc47fd66ec0ad24b` (release-evidence documentation descendant; compare lineage confirms browser/PWA runtime remains PR #67)
- Expected Service Worker cache: `kinaraidee-beta-v13`
- Public URL: https://rachanakorninon-gif.github.io/kinaraidee/
- Runtime change ล่าสุด: PR #67 ย้าย Surprise screen-reader live region ไปไว้ใต้ `document.body` เพื่อไม่ให้ถูกซ่อนเมื่อ screen container เปลี่ยนเป็น `display:none` และคง busy announcement ไว้นานพอให้ assistive technology รับรู้
- `deployment-check.html` ปัจจุบันตรวจ persistent live-region markers (`document.body.appendChild(status)` และ `clearStatusLater(status)`) พร้อม probe `surprise-a11y-v2`
- PR #58 / `75d467cb...` เป็น historical first accessibility fix; real-device TalkBack retest หลัง deployment ของ fix แรกยังไม่ประกาศ busy state จึงไม่ใช่ NF-09 PASS
- Historical live-group result runtime: `6fadf04fdf647680b60df2ada9cb43f4659816dd` (PR #42 merged)
- Historical member-history race-hardening runtime: `d2b8dc08d908fb6034a1958d2260c8886ad96804` (PR #41 merged)
- Historical member-history timestamp runtime: `21c56f2e84760fada6cebfa464be767facb56b34` (PR #37 merged)

ผล Pages/Live Smoke หรือ real-device จาก candidate ก่อน PR #67 ห้ามยกมาเป็นผลของ PR #67 โดยอัตโนมัติ ต้อง trace deployment ใหม่หรือพิสูจน์ descendant/runtime equivalence ตามชนิดหลักฐานนั้น

## Repository evidence
ตรวจจาก `main` lineage ปัจจุบัน:
- `sw.js` ใช้ `kinaraidee-beta-v13` และ atomic `cache.addAll(SHELL)`
- `data/home-surprise.js` มี persistent Surprise accessibility live-region implementation จาก PR #67
- `.github/workflows/surprise-accessibility-regression.yml` ตรวจ static contract ของ implementation และ real TalkBack/VoiceOver ยังต้อง retest
- `deployment-check.html` ตรวจ `homeSurpriseStatus`, `aria-live='assertive'`, busy-message marker, `document.body.appendChild(status)` และ `clearStatusLater(status)`
- PR #67 final PR head มี CI checks ที่บันทึกใน `CURRENT-RELEASE.md`; static/CI evidence ไม่แทน deployment หรือ real-device evidence
- compare จาก PR #67 ถึง reviewed descendant `4568c731...` มีเฉพาะ release/evidence documentation changes และไม่มี browser/PWA runtime asset change
- live-group result bridge จาก PR #42 และ member-history fixes จาก PR #37/#41 ยังคงอยู่ใน lineage

Repository/static evidence ยืนยัน implementation และ guard wiring เท่านั้น ไม่ยืนยัน Pages deployment, Public URL ปัจจุบัน หรือ assistive-technology behavior จริง

## GitHub Pages / Live Smoke evidence
- [ ] GitHub Pages deployment ของ `96b405460f29d0f410f255cc48c68c58e4621784` หรือ runtime-equivalent descendant สำเร็จและ trace กลับไปยัง commit ได้
- [ ] บันทึก Pages workflow run URL / ID และ deployed SHA
- [ ] Live Smoke run สำเร็จและ trace กลับไปยัง deployment เดียวกัน
- [ ] บันทึก Live Smoke workflow run URL / ID และ Job Summary ถ้ามี
- [ ] Public `release-meta.json` มี SHA ตรงกับ deployment และ `pwa_cache` เป็น `kinaraidee-beta-v13`
- [ ] Public `/deployment-check.html` แสดง probe `surprise-a11y-v2`
- [ ] Public `data/home-surprise.js` มี PR #67 markers: `homeSurpriseStatus`, `aria-live='assertive'`, `document.body.appendChild(status)`, `clearStatusLater(status)` และ busy message
- [ ] Live group bridge markers จาก PR #42 และ member-history markers จาก PR #37/#41 ยังอยู่ครบ

> สถานะปัจจุบัน: **PARTIAL / BLOCKED FOR PR #67 DEPLOYMENT TRACE** — implementation, static guard และ public deployment probe มีใน source แล้ว แต่ยังไม่มี Pages + Live Smoke run evidence ที่บันทึกครบสำหรับ PR #67/descendant จึงยังห้ามตีความว่า deployment gate ผ่าน

## Real-device evidence
Automated workflow และ public source probe ไม่แทนรายการนี้

### Surprise accessibility — PR #67
- [ ] TalkBack บนอุปกรณ์ Android ที่กำหนดประกาศ busy state เมื่อกด “ไม่รู้เลย” หลัง PR #67 ถูกยืนยันว่า deploy แล้ว
- [ ] VoiceOver บน iPhone ที่กำหนดประกาศ/รับรู้ state ตาม acceptance criteria
- [ ] double tap ไม่สร้าง action ซ้ำและ busy/recovery state กลับสู่ ready อย่างถูกต้อง
- [ ] บันทึก Device / OS / Browser / Assistive Technology / ผลจริง / defect ถ้ามี

Source marker หรือ static regression guard **ห้ามถูกนับเป็น NF-09 PASS**

### Recorded Android same-device evidence ก่อน PR #67
- Issue #38 `Invalid Date`: fixed / same-device retest recorded
- Issue #40 favorite loss หลัง lock/resume: fixed / same-device retest recorded
- live-group 2/2 final result + reroll + handoff มี scoped same-device evidence หลัง PR #42 ตาม `CURRENT-RELEASE.md`
- PR #58 TalkBack busy-state retest หลัง verified deployment ถูกบันทึกว่าไม่ประกาศ busy state; นี่เป็นหลักฐาน FAIL ของ implementation แรก ไม่ใช่ PASS ของ PR #67

หลักฐานเหล่านี้ใช้ได้เฉพาะ scope ที่บันทึกไว้ และไม่พิสูจน์ PR #67 accessibility behavior หรือ full device matrix

### Remaining real-device matrix
- [ ] Android Chrome อย่างน้อย 3 device models ตาม Beta gate
- [ ] iPhone Safari อย่างน้อย 2 device models ตาม Beta gate
- [ ] TC-01–TC-15 / NF-01–NF-10 ที่ยังเปิด โดยเฉพาะ NF-07 และ NF-09
- [ ] location allow/deny, partner/fallback render, member history, feedback/partner submission, PWA install/offline/update ตาม matrix

## Evidence record
- Runtime candidate SHA: `96b405460f29d0f410f255cc48c68c58e4621784`
- Latest reviewed source descendant: `4568c731d3957d88373db914cc47fd66ec0ad24b` (release/evidence docs only; runtime unchanged from PR #67)
- Deployed SHA:
- `release-meta.json` observed SHA / PWA cache:
- Pages workflow run URL / ID:
- Live Smoke workflow run URL / ID:
- Public URL checked:
- Observed Surprise accessibility source markers:
- TalkBack/VoiceOver device evidence:
- Device / OS / Browser:
- Screenshot / video:
- TC/NF results:
- Defect / Issue:

## Result
- [ ] PASS — deployment/live evidence trace ได้และ real-device smoke/assistive-tech evidence ที่จำเป็นผ่าน
- [ ] FAIL — พบ defect หรือ deployment mismatch
- [x] BLOCKED — PR #67 deployment trace, accessibility real-device evidence และ full device matrix ยังไม่ครบ

## Interpretation rules
- workflow file มีอยู่ ไม่เท่ากับ workflow run ผ่าน
- `deployment-check.html` พบ source marker ไม่เท่ากับ TalkBack/VoiceOver ทำงานจริง
- PR/static QA success ไม่แทน Pages/Live Smoke
- Live Smoke success ไม่แทน real-device interaction
- Android same-device regression success ไม่เท่ากับ full Android/iPhone matrix PASS
- ผล candidate ก่อน PR #67 ห้ามถูกยกมาเป็น accessibility/deployment result ของ PR #67 โดยอัตโนมัติ
- หาก deployed SHA เป็น descendant ต้องยืนยัน diff ว่า runtime payload ที่เกี่ยวข้องเท่ากับ PR #67 ก่อนใช้เป็น release evidence
