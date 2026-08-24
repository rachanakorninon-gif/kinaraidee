# Kinaraidee — Current Browser/PWA Runtime

This file is the canonical declaration for the browser/PWA runtime candidate. It is intentionally small so release workflows can validate runtime lineage without rewriting historical evidence.

- Current browser/PWA runtime candidate: `0000000000000000000000000000000000000000`
- PWA cache marker: `kinaraidee-beta-v14`
- Runtime change: visible keyboard focus + reduced-motion accessibility hardening on the main app and public Feedback/Partner forms
- Deployment status: **PASS FOR CURRENT BROWSER/PWA DEPLOYMENT TRACE**
- Runtime merge/deployed SHA: `e30aa999f6277b221bf8dae85aa3b23521ad6f06`
- GitHub Pages run: `32673914310` — completed `success` on exact deployed SHA
- Corresponding Live Smoke run: `32673939090` — completed `success` on the same SHA
- Read-only diagnostic run: `32674078371` — confirmed exact Pages/Live Smoke run metadata; temporary PR #135 closed without merge
- Live Smoke verified public `release-meta.json` SHA = `e30aa999f6277b221bf8dae85aa3b23521ad6f06`, live Service Worker = `kinaraidee-beta-v14`, focus/reduced-motion deployed source contracts, persistent Surprise accessibility markers, Group-result bridge, Partner renderer/privacy wiring, and development-only paths returning non-200 (observed 404 for the guarded paths)
- Prior verified v13 deployment evidence remains historical and is not reused as v14 PASS
- Public Beta is still **NOT COMPLETE**

## Evidence boundary

`PASS FOR CURRENT BROWSER/PWA DEPLOYMENT TRACE` is scoped to Pages deployment, public metadata/assets and automated Live Smoke for the v14 runtime lineage.

It does **not** imply real keyboard/device interaction PASS, reduced-motion behavior on a physical platform, TalkBack/VoiceOver NF-09, NF-05/NF-07, the full Android/iPhone matrix, full Public Beta acceptance, payment/partner/legal readiness or Commercial GO.
