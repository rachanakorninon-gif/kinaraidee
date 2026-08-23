# กินอะไรดี — Live Deployment Verification

ใช้เอกสารนี้ยืนยันว่า Public Beta ที่ผู้ใช้เปิดจริงตรงกับ release candidate ใน repository โดยห้ามทำเครื่องหมาย PASS จากการคาดเดา, static review หรือ workflow configuration เพียงอย่างเดียว

## Release candidate ปัจจุบัน

- Runtime candidate SHA: `35fe4b7fbf201882ea2ebad8ffca2b8da668999b` (PR #79 merged)
- Expected Service Worker cache: `kinaraidee-beta-v13`
- Public URL: https://rachanakorninon-gif.github.io/kinaraidee/
- PR #79 wires `data/pwa-install.js` into the active app bootstrap while retaining the PR #67 persistent Surprise accessibility implementation.
- This runtime has a matching successful Pages deployment and matching successful Live Smoke trace.

## Verified deployment evidence — 2026-08-23

GitHub Pages source and deployment trace are now **VERIFIED** for the current browser/PWA runtime candidate.

Confirmed evidence:

- GitHub Pages Source reports `build_type: workflow`.
- PR #79 merged as `35fe4b7fbf201882ea2ebad8ffca2b8da668999b`.
- Pages workflow run `32621529715` completed **success** for head SHA `35fe4b7fbf201882ea2ebad8ffca2b8da668999b`.
- Public Pages Trace Check run `32621547307` completed **success** and verified public `release-meta.json` for the same deployment lineage, including deployed SHA `35fe4b7fbf201882ea2ebad8ffca2b8da668999b`, PWA cache `kinaraidee-beta-v13`, the `pages-actions-source-v1` probe marker and the matching live Service Worker marker.
- Corresponding Live Smoke run `32621549478` completed **success** with head SHA `35fe4b7fbf201882ea2ebad8ffca2b8da668999b`.
- Live Smoke covered public pages/assets, latest live app markers, accessibility/group/PWA source contracts, development-file exclusion and traceable automated evidence recording.
- Issue #69 is closed as completed for the browser/PWA deployment-trace scope.

The earlier PR #78 deployment established the Pages artifact path but exposed one live contract failure: the PWA install helper existed but was not actively bootstrapped. PR #79 fixed that runtime wiring and the fresh matching deployment/Live Smoke trace passed.

## Deployment acceptance checklist

- [x] GitHub Pages Source reports `build_type: workflow`
- [x] Pages artifact deployment run for the current runtime candidate completed successfully
- [x] Public `release-meta.json` is available and traceable to the deployed runtime
- [x] Public metadata contains a valid 40-character deployed SHA
- [x] Public metadata deployed SHA is `35fe4b7fbf201882ea2ebad8ffca2b8da668999b`
- [x] Public metadata `pwa_cache` is `kinaraidee-beta-v13`
- [x] Public deployment probe contains the expected current release markers
- [x] Public `sw.js` cache marker matches the metadata
- [x] Corresponding Live Smoke run succeeds against the same runtime SHA
- [x] Pages run ID and Live Smoke run ID are recorded
- [x] development-only paths checked by Live Smoke are not exposed by the Pages artifact

## Scope boundary

Deployment trace status: **PASS FOR BROWSER/PWA DEPLOYMENT + AUTOMATED LIVE SMOKE**.

This PASS does **not** mean Public Beta is complete and does not replace real-device interaction or assistive-technology evidence. In particular it does not create NF-05, NF-07 or NF-09 PASS, full device-matrix PASS, payment/partner readiness, legal approval, Production Security PASS or Commercial GO.

## Real-device evidence still required

### Surprise accessibility / NF-09

- [ ] TalkBack on a functioning Android assistive-technology environment announces the required busy state on the deployed current runtime
- [ ] VoiceOver on iPhone provides the required state/interaction behavior
- [ ] double tap does not create duplicate action and recovery returns to ready
- [ ] Device / OS / Browser / Assistive Technology / actual result are recorded

The latest available Android TalkBack environment was itself malfunctioning for activation, including Android Settings controls, so NF-09 remains BLOCKED/INCONCLUSIVE rather than PASS or a new application FAIL.

### Remaining matrix

- [ ] Android Chrome on at least 3 device models
- [ ] iPhone Safari on at least 2 device models
- [ ] NF-07 real-device old-cache → `kinaraidee-beta-v13` upgrade
- [ ] NF-05 real iPhone/iPad Safari install-hint behavior despite deployed wiring and synthetic CI coverage
- [ ] remaining TC-01–TC-15 / NF-01–NF-10 evidence appropriate to the Beta gate

## Evidence record

- Runtime candidate SHA: `35fe4b7fbf201882ea2ebad8ffca2b8da668999b`
- Pages run: `32621529715` — success
- Public Pages Trace Check: `32621547307` — success
- Live Smoke run: `32621549478` — success
- Service Worker cache: `kinaraidee-beta-v13`
- Deployment trace issue: #69 — closed/completed
- TalkBack/VoiceOver acceptance: not complete
- Full Android/iPhone matrix: not complete

## Result

- [x] PASS — browser/PWA deployment trace + matching automated Live Smoke
- [ ] PASS — complete Public Beta real-device/accessibility gate
- [ ] FAIL — release candidate mismatch or confirmed runtime defect

## Interpretation rules

- workflow file มีอยู่ ไม่เท่ากับ workflow run ผ่าน
- Pages Source = GitHub Actions ไม่เท่ากับ artifact deployment ผ่าน
- PR/static QA success ไม่แทน Pages/Live Smoke
- Live Smoke ไม่แทน real-device interaction
- synthetic PWA/iOS regressions ไม่แทน NF-07/NF-05 real-device evidence
- Android same-device evidence ไม่เท่ากับ full Android/iPhone matrix PASS
- deployment PASS ไม่เท่ากับ Public Beta PASS หรือ Commercial GO
