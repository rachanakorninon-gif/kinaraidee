# กินอะไรดี — Live Deployment Verification

ใช้เอกสารนี้ยืนยันว่า Public Beta ที่ผู้ใช้เปิดจริงตรงกับ release candidate ใน repository โดยห้ามทำเครื่องหมาย PASS จากการคาดเดา, static review หรือ workflow configuration เพียงอย่างเดียว

## Release candidate ปัจจุบัน

- Runtime candidate SHA: `96b405460f29d0f410f255cc48c68c58e4621784` (PR #67 squash-merged)
- Latest reviewed source descendant: `95034bce89853fe87a4b399ca0a4a58c3e9e93d0` (PR #76 deployment-probe/observability descendant; browser/PWA runtime unchanged from PR #67)
- Expected Service Worker cache: `kinaraidee-beta-v13`
- Public URL: https://rachanakorninon-gif.github.io/kinaraidee/
- PR #67 remains the browser/PWA runtime candidate for the persistent Surprise accessibility live-region fix.
- PR #76 adds `pages-actions-source-v1` to `deployment-check.html` after the repository Pages Source was changed to GitHub Actions.

## Repository/static evidence

- `sw.js` uses `kinaraidee-beta-v13` and atomic `cache.addAll(SHELL)`.
- `data/home-surprise.js` contains the PR #67 persistent Surprise live-region implementation.
- deployment/static regression guards remain present.
- PR #77 static/regression suites completed successfully, but its dedicated public Pages trace check failed; successful CI/static checks do not substitute for deployment evidence.

## GitHub Pages source evidence

Pages source migration is now **VERIFIED**:

- Pages Source Diagnostic run `32620743913`, job `97148434798`, on 2026-08-23 reported `build_type: workflow`.
- It also reported source branch `main`, source path `/`, and site `https://rachanakorninon-gif.github.io/kinaraidee/`.
- Therefore the former requirement for a repository admin to switch Pages Source from legacy branch publishing to GitHub Actions is resolved.

This setting result alone is not deployment PASS.

## Public Pages trace evidence after PR #76

PR #76 merged as `95034bce89853fe87a4b399ca0a4a58c3e9e93d0` to modify the watched `deployment-check.html` path and trigger the normal Pages deployment path.

PR #77 was created only to verify the resulting public deployment and was not intended to merge.

Observed result:

- Public Pages Trace Check run: `32620743936`
- Job: `97148434823`
- Expected deployed SHA: `95034bce89853fe87a4b399ca0a4a58c3e9e93d0`
- Expected cache marker: `kinaraidee-beta-v13`
- Attempts: 18
- Window: 2026-08-23T05:35:51Z through 05:38:52Z
- Result: **FAIL**
- Failure observed on every attempt: HTTP 404 while fetching public `/release-meta.json`

PR #77 was closed without merge after this diagnostic result was recorded, consistent with its evidence-only purpose.

### Interpretation

- Pages Source migration: **VERIFIED / RESOLVED**
- Public workflow-generated `release-meta.json`: **NOT VERIFIED / observed 404**
- Traceable Pages deployment of PR #76: **NOT VERIFIED**
- Matching Live Smoke evidence: **NOT VERIFIED**
- Complete deployment gate: **BLOCKED**

Do not infer Pages/Live Smoke PASS from `build_type: workflow`, successful PR checks, source markers, or the existence of `.github/workflows/pages.yml`.

## Deployment acceptance checklist

- [x] GitHub Pages Source reports `build_type: workflow`
- [ ] A Pages artifact deployment run for PR #76/runtime-equivalent descendant is identified and completed successfully
- [ ] Public `release-meta.json` returns HTTP 200
- [ ] Public metadata contains a valid 40-character deployed SHA
- [ ] Public metadata `pwa_cache` is `kinaraidee-beta-v13`
- [ ] Public `deployment-check.html` contains the expected release/deployment probe markers
- [ ] Public `sw.js` cache marker matches the metadata
- [ ] Corresponding Live Smoke run succeeds against the same deployment
- [ ] Pages run ID/URL and Live Smoke run ID/URL are recorded

## Real-device evidence

Automated workflows and public source probes do not replace real-device testing.

### Surprise accessibility — PR #67 / NF-09

- [ ] TalkBack on a functioning Android assistive-technology environment announces the busy state after the deployed PR #67-equivalent runtime is confirmed
- [ ] VoiceOver on iPhone provides the required state/interaction behavior
- [ ] double tap does not create duplicate action and recovery returns to ready
- [ ] Device / OS / Browser / Assistive Technology / actual result are recorded

The latest available Android TalkBack environment was itself malfunctioning for activation, including Android Settings controls, so NF-09 remains BLOCKED/INCONCLUSIVE rather than PASS or a new application FAIL.

### Remaining matrix

- [ ] Android Chrome on at least 3 device models
- [ ] iPhone Safari on at least 2 device models
- [ ] NF-07 real-device old-cache → `kinaraidee-beta-v13` upgrade
- [ ] NF-05 real iPhone/iPad Safari install-hint behavior despite synthetic CI coverage
- [ ] remaining TC-01–TC-15 / NF-01–NF-10 evidence appropriate to the Beta gate

## Evidence record

- Runtime candidate SHA: `96b405460f29d0f410f255cc48c68c58e4621784`
- Latest reviewed source descendant: `95034bce89853fe87a4b399ca0a4a58c3e9e93d0`
- Pages source diagnostic run/job: `32620743913` / `97148434798`
- Pages source result: `build_type: workflow`
- Public trace check run/job: `32620743936` / `97148434823`
- Public trace result: **FAIL — release-meta.json HTTP 404 across 18 attempts**
- Deployed SHA observed from public metadata: not available
- Matching Live Smoke run: not recorded
- TalkBack/VoiceOver acceptance: not complete

## Result

- [ ] PASS — deployment/live evidence trace ได้และ real-device evidence ที่จำเป็นผ่าน
- [ ] FAIL — release candidate mismatch หรือ runtime defect ที่ยืนยันแล้ว
- [x] BLOCKED — source migration สำเร็จแล้ว แต่ workflow-generated public deployment trace + matching Live Smoke และ real-device matrix ยังไม่ครบ

## Interpretation rules

- workflow file มีอยู่ ไม่เท่ากับ workflow run ผ่าน
- Pages Source = GitHub Actions ไม่เท่ากับ artifact deployment ผ่าน
- PR/static QA success ไม่แทน Pages/Live Smoke
- `deployment-check.html` source marker ไม่แทน `release-meta.json` deployed-SHA evidence
- Live Smoke ไม่แทน real-device interaction
- synthetic PWA/iOS regressions ไม่แทน NF-07/NF-05 real-device evidence
- Android same-device evidence ไม่เท่ากับ full Android/iPhone matrix PASS
