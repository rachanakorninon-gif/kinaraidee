# Kinaraidee — Current Browser/PWA Runtime

This file is the canonical declaration for the browser/PWA runtime candidate. It is intentionally small so release workflows can validate runtime lineage without rewriting historical evidence.

- Current browser/PWA runtime candidate: `46b494cc9430ee39c2322f9e0ae8b66149c0d3bf`
- PWA cache marker: `kinaraidee-beta-v15`
- Runtime change: real-device follow-up hardening — Nearby now keeps Location state separate from partner-search state, exposes actionable geolocation permission/unavailable/timeout outcomes without the message being overwritten, gives mobile geolocation a longer low-accuracy acquisition window, and keeps Google Maps fallback available; Favorite/History now adds explicit `❤️ เมนูโปรด` / `👍 เลือกกิน` differentiation and summary counts through `data/history-ui.js`; the new UI helper is part of the atomic PWA shell.
- Deployment status: **PENDING FOR CURRENT RUNTIME DEPLOYMENT**
- Current runtime deployment evidence is pending. Do not reuse v14 Pages/Live Smoke run IDs, public metadata or device observations as deployment PASS for this v15 candidate.
- Latest pre-v15 repository evidence-only merge descendant: `a006a0462a870d44991b833b79930bc7396216db` (PR #169); PR #169 records PR #168 lineage only and does not change browser/PWA assets.
- Earlier evidence-only merge descendant `cf146f2c582a92d4a2a8972eaf8f2effcaccf880` (PR #168) likewise remains repository CI/lineage evidence rather than a promoted public deployment SHA without matching Pages + Live Smoke evidence.
- The v15 cache bump is required because `data/nearby-restaurants.js` is an app-shell asset and `data/history-ui.js` is newly added to the shell.
- Focused physical-device evidence collected immediately before this fix remains diagnostic/historical: Android exercised member auth/reset, Surprise, history/favorite persistence and coordinate-bearing Maps fallback; iPhone Safari exercised Home, Surprise, local Group flow, Google Maps fallback and login/logout, while the Kinaraidee geolocation allow path did not yield coordinates even after Safari/website Location settings were changed to allow. Those observations do not constitute v15 post-fix device PASS.
- Prior verified v14 deployment evidence remains historical and is not reused as current PASS.
- Public Beta is still **NOT COMPLETE**

## Evidence boundary

`PENDING FOR CURRENT RUNTIME DEPLOYMENT` means source/runtime lineage is declared but the merged-main GitHub Pages deployment, public `release-meta.json`, Service Worker v15 marker and corresponding Live Smoke have not yet been verified for this candidate. Evidence-only repository descendants before the v15 runtime change remain historical lineage and cannot be promoted into v15 deployment evidence.

It does **not** imply real keyboard/device interaction PASS, post-fix Android/iPhone Location PASS, post-fix Favorite/History UX PASS, reduced-motion behavior on a physical platform, TalkBack/VoiceOver NF-09, NF-05/NF-07, the full Android/iPhone matrix, full Public Beta acceptance, payment/partner/legal readiness, leaked-password protection PASS or Commercial GO.
