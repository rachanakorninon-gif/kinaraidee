# กินอะไรดี — Live Deployment Verification

ใช้เอกสารนี้ยืนยันว่า Public Beta ที่ผู้ใช้เปิดจริงตรงกับ release candidate ใน repository โดยห้ามทำเครื่องหมาย PASS จากการคาดเดา, static review หรือ workflow configuration เพียงอย่างเดียว

## Release candidate ปัจจุบัน

- Canonical runtime candidate SHA: `a7ca994be76541af57b224c57f267843113df941` (PR #179 v16 runtime lineage)
- Runtime merge/deployed SHA: `1d21613c3c7d3e62ed8f7e5c3f00700606129c58` (PR #179 merged)
- Expected Service Worker cache: `kinaraidee-beta-v16`
- Public URL: https://rachanakorninon-gif.github.io/kinaraidee/
- Current runtime changes: durable member-history outbox, cloud-snapshot protection while writes remain, restart/online retry, recent-row dedupe, early member-sync bootstrap and v16 atomic PWA shell.
- Matching successful Pages run: `32752667752`
- Matching successful Live Smoke run: `32752716631`
- Read-only deployment diagnostic run: `32752782165`

## Verified deployment evidence — 2026-08-24

GitHub Pages source and deployment trace are **VERIFIED** for the current browser/PWA v16 runtime lineage.

Confirmed evidence:

- PR #179 merged as `1d21613c3c7d3e62ed8f7e5c3f00700606129c58`.
- Pages workflow run `32752667752` completed **success** for exact deployed SHA `1d21613c3c7d3e62ed8f7e5c3f00700606129c58`.
- Corresponding Live Smoke run `32752716631` completed **success** on the same SHA.
- Read-only diagnostic run `32752782165` completed **success**; temporary PR #180 queried Actions metadata and the public Pages site, recorded the evidence, and was closed without merge.
- Live public `release-meta.json` matched SHA `1d21613c3c7d3e62ed8f7e5c3f00700606129c58` with `kinaraidee-beta-v16`.
- Live `sw.js` used `kinaraidee-beta-v16` and included `./data/member-sync.js` and `./data/home-surprise.js` in the shell.
- Live `data/member-sync.js` contained the durable outbox/cloud-snapshot guard/online retry contract.
- Live `data/home-surprise.js` contained the early member-sync bootstrap.
- GitHub Pages Source remains workflow-based.

Historical v15 deployment evidence remains valid historical evidence for the older runtime only. It is not reused as v16 deployment or post-v16 device acceptance evidence.

## Deployment acceptance checklist

- [x] GitHub Pages Source uses the workflow deployment path
- [x] Pages artifact deployment run for the current v16 runtime completed successfully
- [x] Public `release-meta.json` is available and traceable to the deployed runtime
- [x] Public metadata deployed SHA = `1d21613c3c7d3e62ed8f7e5c3f00700606129c58`
- [x] Public metadata `pwa_cache` = `kinaraidee-beta-v16`
- [x] Public `sw.js` cache marker matches the metadata
- [x] Corresponding Live Smoke succeeds against the same deployed SHA
- [x] Pages run ID and Live Smoke run ID are recorded
- [x] Diagnostic run independently verified the exact Actions records and public v16 assets
- [x] `data/member-sync.js` and `data/home-surprise.js` are in the atomic PWA shell
- [x] deployed member sync contains the v16 durable restart-recovery contract
- [x] development-only paths checked by Live Smoke are not exposed by the Pages artifact

## Scope boundary

Deployment trace status: **PASS FOR BROWSER/PWA DEPLOYMENT + AUTOMATED LIVE SMOKE**.

This PASS does **not** mean Public Beta is complete and does not replace physical-device interaction, keyboard/reduced-motion behavior or assistive-technology evidence. In particular it does not create Issue #177 device PASS, TC-08 Location PASS, NF-05, NF-07 or NF-09 PASS, full device-matrix PASS, payment/partner readiness, legal approval, Production Security PASS or Commercial GO.

## Real-device evidence still required

### Current v16 focused retests

- [ ] Physical Android favorite → full installed-PWA restart → History retention passes on v16; Issue #177 remains open until this evidence exists
- [ ] iPhone Safari TC-08 Location allow path is retested on the deployed v16 runtime; Issue #171 remains open until physical-device evidence exists
- [x] Favorite/History visual differentiation had physical Android v15 restart evidence and Issue #172 is closed; this historical scoped PASS is not a v16 persistence PASS
- [ ] previous pre-v16 PASS/FAIL observations are not relabeled as v16 results

### Accessibility / platform acceptance

- [ ] TalkBack on a functioning Android assistive-technology environment announces the required Surprise busy state on the deployed current runtime
- [ ] VoiceOver on iPhone provides the required state/interaction behavior
- [ ] visible focus indicators are verified with real keyboard/focus navigation on relevant deployed pages
- [ ] reduced-motion behavior is verified on a real platform with reduced-motion preference enabled
- [ ] double tap does not create duplicate action and recovery returns to ready
- [ ] Device / OS / Browser / Assistive Technology / actual result are recorded

The latest available Android TalkBack environment evidence remains insufficient for NF-09 acceptance; source/static/live deployment checks do not promote NF-09 to PASS.

### Remaining matrix

- [ ] Android Chrome on at least 3 device models
- [ ] iPhone Safari on at least 2 device models
- [ ] NF-07 real-device old-cache → `kinaraidee-beta-v16` upgrade from a verifiable older-cache baseline
- [ ] NF-05 real iPhone/iPad Safari install-hint suppression/standalone behavior
- [ ] remaining TC-01–TC-15 / NF-01–NF-10 evidence appropriate to the Beta gate

## Evidence record

- Current Pages run: `32752667752` — success on `1d21613c3c7d3e62ed8f7e5c3f00700606129c58`
- Current Live Smoke run: `32752716631` — success on `1d21613c3c7d3e62ed8f7e5c3f00700606129c58`
- Current read-only diagnostic run: `32752782165` — success; PR #180 closed without merge
- Canonical runtime candidate SHA: `a7ca994be76541af57b224c57f267843113df941`
- Runtime merge/deployed SHA: `1d21613c3c7d3e62ed8f7e5c3f00700606129c58`
- Service Worker cache: `kinaraidee-beta-v16`
- Live member-history durability markers: outbox + cloud-snapshot guard + online retry confirmed
- Live early member-sync bootstrap marker: confirmed
- Issue #177 post-v16 physical Android persistence acceptance: not complete
- iPhone TC-08 post-v16 acceptance: not complete
- TalkBack/VoiceOver acceptance: not complete
- real keyboard/reduced-motion acceptance: not complete
- Full Android/iPhone matrix: not complete

## Result

- [x] PASS — browser/PWA v16 deployment trace + matching automated Live Smoke
- [ ] PASS — complete Public Beta real-device/accessibility gate
- [ ] FAIL — release candidate mismatch or confirmed current-runtime defect

## Interpretation rules

- workflow file มีอยู่ ไม่เท่ากับ workflow run ผ่าน
- Pages Source = GitHub Actions ไม่เท่ากับ artifact deployment ผ่าน
- PR/static QA success ไม่แทน Pages/Live Smoke
- Live Smoke ไม่แทน real-device interaction
- source/static focus/reduced-motion checks ไม่แทน keyboard/motion-preference device evidence
- synthetic PWA/iOS regressions ไม่แทน NF-07/NF-05 real-device evidence
- pre-v16 Android/iPhone evidence ไม่เท่ากับ post-v16 defect retest PASS
- deployment PASS ไม่เท่ากับ Public Beta PASS หรือ Commercial GO
