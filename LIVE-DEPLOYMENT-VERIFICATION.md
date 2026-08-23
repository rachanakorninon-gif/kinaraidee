# กินอะไรดี — Live Deployment Verification

ใช้เอกสารนี้ยืนยันว่า Public Beta ที่ผู้ใช้เปิดจริงตรงกับ release candidate ใน repository โดยห้ามทำเครื่องหมาย PASS จากการคาดเดา, static review หรือ workflow configuration เพียงอย่างเดียว

## Release candidate ปัจจุบัน

- Canonical runtime candidate SHA: `db539c75f87683a4225baeb5601509fe3bb26f6f` (PR #134 runtime lineage)
- Runtime merge/deployed SHA: `e30aa999f6277b221bf8dae85aa3b23521ad6f06` (PR #134 merged)
- Expected Service Worker cache: `kinaraidee-beta-v14`
- Public URL: https://rachanakorninon-gif.github.io/kinaraidee/
- PR #134 adds visible keyboard focus and reduced-motion accessibility hardening on the main app and public Feedback/Partner forms.
- This runtime has matching successful Pages deployment and Live Smoke evidence recorded by PR #136.

## Verified deployment evidence — 2026-08-24

GitHub Pages source and deployment trace are **VERIFIED** for the current browser/PWA v14 runtime lineage.

Confirmed evidence:

- GitHub Pages Source remains workflow-based.
- PR #134 merged as `e30aa999f6277b221bf8dae85aa3b23521ad6f06`.
- Pages workflow run `32673914310` completed **success** for exact deployed SHA `e30aa999f6277b221bf8dae85aa3b23521ad6f06`.
- Corresponding Live Smoke run `32673939090` completed **success** on the same SHA.
- Read-only diagnostic run `32674078371` confirmed the exact Pages/Live Smoke workflow-run metadata; temporary PR #135 was closed without merge.
- Live Smoke verified public `release-meta.json` SHA = `e30aa999f6277b221bf8dae85aa3b23521ad6f06` and live Service Worker cache = `kinaraidee-beta-v14`.
- Live Smoke also covered the deployed focus/reduced-motion source contracts, persistent Surprise accessibility markers, Group-result bridge, Partner renderer/privacy wiring and development-only path exclusion.
- PR #136 merged the scoped v14 deployment evidence into the canonical runtime declaration.

### Evidence-only deployed descendant

PR #136 merged as `707d9a403d82a57e6736842a3fa74882d1722e8b`. This commit changes the runtime declaration/evidence contract only and does **not** create a newer browser/PWA runtime than PR #134.

A later read-only diagnostic confirmed that this evidence-only descendant was also deployed successfully:

- Pages workflow run `32674271444` completed **success** for exact SHA `707d9a403d82a57e6736842a3fa74882d1722e8b`.
- Corresponding Live Smoke run `32674298914` completed **success** on the same SHA.
- Read-only diagnostic run `32675047230` confirmed both exact run records; temporary PR #138 was closed without merge.

Subsequent main SHA `19626daf77778c6e51ba37193f09b24a7225c139` is a documentation-only descendant of `707d9a40...`: compare changes only `CURRENT-RELEASE.md`, `LIVE-DEPLOYMENT-VERIFICATION.md` and `README.md`. Read-only diagnostic run `32675123865` found no exact Pages/Live Smoke run for `19626daf...`, which is expected because those documentation-only commits did not trigger a browser/PWA deployment. Therefore the latest verified deployed evidence descendant remains `707d9a40...`, while the browser runtime candidate remains PR #134 / `db539c75...` with v14 assets.

Historical PR #79 / v13 deployment evidence remains valid historical evidence only and is not reused as v14 PASS.

## Deployment acceptance checklist

- [x] GitHub Pages Source uses the workflow deployment path
- [x] Pages artifact deployment run for the current v14 runtime completed successfully
- [x] Public `release-meta.json` is available and traceable to the deployed runtime
- [x] Public metadata contains a valid deployed SHA
- [x] Public metadata deployed SHA is traceable to the current v14 deployment lineage
- [x] Public metadata `pwa_cache` is `kinaraidee-beta-v14`
- [x] Public `sw.js` cache marker matches the metadata
- [x] Corresponding Live Smoke succeeds against the same deployed SHA
- [x] Pages run ID and Live Smoke run ID are recorded
- [x] focus/reduced-motion deployed source contracts are present in Live Smoke scope
- [x] development-only paths checked by Live Smoke are not exposed by the Pages artifact

## Scope boundary

Deployment trace status: **PASS FOR BROWSER/PWA DEPLOYMENT + AUTOMATED LIVE SMOKE**.

This PASS does **not** mean Public Beta is complete and does not replace real keyboard/device interaction, reduced-motion behavior on a physical platform or assistive-technology evidence. In particular it does not create NF-05, NF-07 or NF-09 PASS, full device-matrix PASS, payment/partner readiness, legal approval, Production Security PASS or Commercial GO.

## Real-device evidence still required

### Accessibility / NF-09 and new v14 hardening

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
- [ ] NF-07 real-device old-cache → `kinaraidee-beta-v14` upgrade from a verifiable older cache baseline
- [ ] NF-05 real iPhone/iPad Safari install-hint behavior
- [ ] remaining TC-01–TC-15 / NF-01–NF-10 evidence appropriate to the Beta gate

## Evidence record

- Canonical runtime candidate SHA: `db539c75f87683a4225baeb5601509fe3bb26f6f`
- Runtime merge/deployed SHA: `e30aa999f6277b221bf8dae85aa3b23521ad6f06`
- Original v14 Pages run: `32673914310` — success
- Original v14 Live Smoke run: `32673939090` — success
- Original v14 read-only diagnostic run: `32674078371` — success
- Evidence-only descendant SHA: `707d9a403d82a57e6736842a3fa74882d1722e8b`
- Evidence-only descendant Pages run: `32674271444` — success
- Evidence-only descendant Live Smoke run: `32674298914` — success
- Evidence-only descendant diagnostic run: `32675047230` — success
- Documentation-only current-main diagnostic: `32675123865` — no exact deployment run expected for `19626daf...`
- Service Worker cache: `kinaraidee-beta-v14`
- TalkBack/VoiceOver acceptance: not complete
- real keyboard/reduced-motion acceptance: not complete
- Full Android/iPhone matrix: not complete

## Result

- [x] PASS — browser/PWA v14 deployment trace + matching automated Live Smoke
- [ ] PASS — complete Public Beta real-device/accessibility gate
- [ ] FAIL — release candidate mismatch or confirmed runtime defect

## Interpretation rules

- workflow file มีอยู่ ไม่เท่ากับ workflow run ผ่าน
- Pages Source = GitHub Actions ไม่เท่ากับ artifact deployment ผ่าน
- PR/static QA success ไม่แทน Pages/Live Smoke
- documentation-only main descendants may legitimately have no deployment run when deployment paths are not triggered
- Live Smoke ไม่แทน real-device interaction
- source/static focus/reduced-motion checks ไม่แทน keyboard/motion-preference device evidence
- synthetic PWA/iOS regressions ไม่แทน NF-07/NF-05 real-device evidence
- Android same-device evidence ไม่เท่ากับ full Android/iPhone matrix PASS
- deployment PASS ไม่เท่ากับ Public Beta PASS หรือ Commercial GO
