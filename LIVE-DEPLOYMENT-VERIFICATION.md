# กินอะไรดี — Live Deployment Verification

ใช้เอกสารนี้ยืนยันว่า Public Beta ที่ผู้ใช้เปิดจริงตรงกับ release candidate ใน repository โดยห้ามทำเครื่องหมาย PASS จากการคาดเดา, static review หรือ workflow configuration เพียงอย่างเดียว

## Release candidate ปัจจุบัน

- Canonical runtime candidate SHA: `46b494cc9430ee39c2322f9e0ae8b66149c0d3bf` (PR #174 v15 runtime lineage)
- Runtime merge/deployed SHA: `367162286d1e1452151df11dca805ed629bb5466` (PR #174 merged)
- Expected Service Worker cache: `kinaraidee-beta-v15`
- Public URL: https://rachanakorninon-gif.github.io/kinaraidee/
- Current runtime changes: separated Nearby Location status/error UX, 15-second low-accuracy mobile geolocation timeout, explicit Favorite/History differentiation and `data/history-ui.js` in the atomic PWA shell.
- Matching successful Pages run: `32748690413`
- Matching successful Live Smoke run: `32748752875`
- Read-only deployment diagnostic run: `32749016604`

## Verified deployment evidence — 2026-08-24

GitHub Pages source and deployment trace are **VERIFIED** for the current browser/PWA v15 runtime lineage.

Confirmed evidence:

- PR #174 merged as `367162286d1e1452151df11dca805ed629bb5466`.
- Pages workflow run `32748690413` completed **success** for exact deployed SHA `367162286d1e1452151df11dca805ed629bb5466`.
- Corresponding Live Smoke run `32748752875` completed **success** on the same SHA.
- Read-only diagnostic run `32749016604` completed **success**; temporary PR #175 queried Actions metadata and the public Pages site, recorded the evidence, and was closed without merge.
- Live public `release-meta.json` matched SHA `367162286d1e1452151df11dca805ed629bb5466` with `kinaraidee-beta-v15`.
- Live `sw.js` used `kinaraidee-beta-v15` and included `./data/history-ui.js` in the shell.
- Live `data/nearby-restaurants.js` contained `nearbyLocationStatus` and `timeout:15000`.
- Live `data/history-ui.js` contained the explicit `❤️ เมนูโปรด` and `👍 เลือกกิน` badges.
- GitHub Pages Source remains workflow-based.

Historical v14 deployment evidence remains valid historical evidence for the older runtime only. It is not reused as v15 deployment or post-v15 device acceptance evidence.

## Deployment acceptance checklist

- [x] GitHub Pages Source uses the workflow deployment path
- [x] Pages artifact deployment run for the current v15 runtime completed successfully
- [x] Public `release-meta.json` is available and traceable to the deployed runtime
- [x] Public metadata deployed SHA = `367162286d1e1452151df11dca805ed629bb5466`
- [x] Public metadata `pwa_cache` = `kinaraidee-beta-v15`
- [x] Public `sw.js` cache marker matches the metadata
- [x] Corresponding Live Smoke succeeds against the same deployed SHA
- [x] Pages run ID and Live Smoke run ID are recorded
- [x] Diagnostic run independently verified the exact Actions records and public v15 assets
- [x] new Favorite/History helper is in the atomic PWA shell
- [x] deployed Nearby asset contains the separated Location-status path and 15-second timeout
- [x] development-only paths checked by Live Smoke are not exposed by the Pages artifact

## Scope boundary

Deployment trace status: **PASS FOR BROWSER/PWA DEPLOYMENT + AUTOMATED LIVE SMOKE**.

This PASS does **not** mean Public Beta is complete and does not replace physical-device interaction, keyboard/reduced-motion behavior or assistive-technology evidence. In particular it does not create post-v15 TC-08 Location PASS, Favorite/History device PASS, NF-05, NF-07 or NF-09 PASS, full device-matrix PASS, payment/partner readiness, legal approval, Production Security PASS or Commercial GO.

## Real-device evidence still required

### v15 focused retests

- [ ] iPhone Safari TC-08 Location allow path is retested on the deployed v15 runtime; Issue #171 remains open until physical-device evidence exists
- [ ] Favorite/History visual differentiation is retested on a physical device; Issue #172 remains open until physical-device evidence exists
- [ ] previous pre-fix v14 PASS/FAIL observations are not relabeled as v15 results

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
- [ ] NF-07 real-device old-cache → `kinaraidee-beta-v15` upgrade from a verifiable older-cache baseline
- [ ] NF-05 real iPhone/iPad Safari install-hint suppression/standalone behavior
- [ ] remaining TC-01–TC-15 / NF-01–NF-10 evidence appropriate to the Beta gate

## Evidence record

- Current Pages run: `32748690413` — success on `367162286d1e1452151df11dca805ed629bb5466`
- Current Live Smoke run: `32748752875` — success on `367162286d1e1452151df11dca805ed629bb5466`
- Current read-only diagnostic run: `32749016604` — success; PR #175 closed without merge
- Canonical runtime candidate SHA: `46b494cc9430ee39c2322f9e0ae8b66149c0d3bf`
- Runtime merge/deployed SHA: `367162286d1e1452151df11dca805ed629bb5466`
- Service Worker cache: `kinaraidee-beta-v15`
- Live Nearby v15 marker: separated Location status + `timeout:15000` confirmed
- Live Favorite/History helper marker: explicit Favorite/accepted badges confirmed
- iPhone TC-08 post-v15 acceptance: not complete
- Favorite/History post-v15 physical-device acceptance: not complete
- TalkBack/VoiceOver acceptance: not complete
- real keyboard/reduced-motion acceptance: not complete
- Full Android/iPhone matrix: not complete

## Result

- [x] PASS — browser/PWA v15 deployment trace + matching automated Live Smoke
- [ ] PASS — complete Public Beta real-device/accessibility gate
- [ ] FAIL — release candidate mismatch or confirmed current-runtime defect

## Interpretation rules

- workflow file มีอยู่ ไม่เท่ากับ workflow run ผ่าน
- Pages Source = GitHub Actions ไม่เท่ากับ artifact deployment ผ่าน
- PR/static QA success ไม่แทน Pages/Live Smoke
- Live Smoke ไม่แทน real-device interaction
- source/static focus/reduced-motion checks ไม่แทน keyboard/motion-preference device evidence
- synthetic PWA/iOS regressions ไม่แทน NF-07/NF-05 real-device evidence
- Android/iPhone pre-fix evidence ไม่เท่ากับ post-v15 defect retest PASS
- deployment PASS ไม่เท่ากับ Public Beta PASS หรือ Commercial GO
