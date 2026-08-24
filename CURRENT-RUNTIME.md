# Kinaraidee — Current Browser/PWA Runtime

This file is the canonical declaration for the browser/PWA runtime candidate. It is intentionally small so release workflows can validate runtime lineage without rewriting historical evidence.

- Current browser/PWA runtime candidate: `46b494cc9430ee39c2322f9e0ae8b66149c0d3bf`
- PWA cache marker: `kinaraidee-beta-v15`
- Runtime change: real-device follow-up hardening — Nearby keeps Location state separate from partner-search state, exposes actionable geolocation permission/unavailable/timeout outcomes without the message being overwritten, gives mobile geolocation a longer low-accuracy acquisition window, and keeps Google Maps fallback available; Favorite/History adds explicit `❤️ เมนูโปรด` / `👍 เลือกกิน` differentiation and summary counts through `data/history-ui.js`; the new UI helper is part of the atomic PWA shell.
- Deployment status: **PASS FOR CURRENT BROWSER/PWA DEPLOYMENT TRACE**
- Runtime merge/deployed SHA: `367162286d1e1452151df11dca805ed629bb5466`
- GitHub Pages run: `32748690413` — completed `success` for exact merged-main SHA `367162286d1e1452151df11dca805ed629bb5466`.
- Corresponding Live Smoke run: `32748752875` — completed `success` for the same deployed SHA.
- Read-only diagnostic run: `32749016604` — completed `success`; temporary PR #175 verified exact Actions metadata and public-site state, then closed without merge.
- Live public `release-meta.json` SHA = `367162286d1e1452151df11dca805ed629bb5466` with Service Worker cache `kinaraidee-beta-v15`.
- Live verification confirmed `sw.js` uses `kinaraidee-beta-v15` and includes `data/history-ui.js`; `data/nearby-restaurants.js` exposes the separated Location-status path and `timeout:15000`; `data/history-ui.js` exposes explicit Favorite/accepted badges.
- The v15 cache bump is required because `data/nearby-restaurants.js` is an app-shell asset and `data/history-ui.js` is newly added to the shell.
- Focused physical-device evidence collected immediately before this fix remains diagnostic/historical: Android exercised member auth/reset, Surprise, history/favorite persistence and coordinate-bearing Maps fallback; iPhone Safari exercised Home, Surprise, local Group flow, Google Maps fallback and login/logout, while the Kinaraidee geolocation allow path did not yield coordinates even after Safari/website Location settings were changed to allow. Those observations do not constitute v15 post-fix device PASS.
- Prior verified v14 deployment evidence remains historical and is not reused as current PASS.
- Public Beta is still **NOT COMPLETE**

## Evidence boundary

`PASS FOR CURRENT BROWSER/PWA DEPLOYMENT TRACE` is scoped to merged-main GitHub Pages deployment lineage, public `release-meta.json`, live Service Worker/app assets and the corresponding automated Live Smoke. It proves that the v15 runtime assets reached the public site with matching deployment metadata.

It does **not** imply real keyboard/device interaction PASS, post-fix Android/iPhone Location PASS, post-fix Favorite/History UX PASS, reduced-motion behavior on a physical platform, TalkBack/VoiceOver NF-09, NF-05/NF-07, the full Android/iPhone matrix, full Public Beta acceptance, payment/partner/legal readiness, leaked-password protection PASS or Commercial GO.
