# NF-07 Physical Upgrade Evidence

Status: **SCOPED PHYSICAL PASS — OPPO / v15 → v16**

Purpose: canonical evidence record for NF-07 real-device upgrade from a verifiably older Kinaraidee PWA cache/build to the current `kinaraidee-beta-v16` without clearing app/site data.

This PASS is based on one traceable real-device close/reopen sequence. Static review, CI, synthetic Service Worker activation, source markers, Pages, Live Smoke, or a fresh v16 install cannot create this result by themselves.

## Required trace metadata

- Device / model: OPPO Reno13 5G (CPH2689)
- OS / version: Android 16 / ColorOS 16.0.5
- Browser or installed-PWA context / version: Chrome 152.0.7977.64; baseline established in a normal Chrome browser tab, normal reopen routed to the installed/standalone Kinaraidee app, verifier viewed in Chrome
- Tester / session reference: scoped OPPO NF-07 physical session on 2026-09-05; no account/user/session identifier retained
- Evidence location: physical tester observations plus privacy-safe NF-07 QA/verifier state recorded in the acceptance session
- Test date/time: 2026-09-05 approximately 00:24–00:28 ICT (UTC+07:00)

## Required pre-update baseline

- Verifiably older Kinaraidee build/cache: VERIFIED — `qa-sw-v15.js` historical fixture controlled the normal Kinaraidee scope and established the legacy v15 state before the acceptance close/reopen
- Older cache/build marker or trace reference: `kinaraidee-beta-v15`; historical fixture commit `46b494cc9430ee39c2322f9e0ae8b66149c0d3bf`; fixture SHA-256 `39eadd35eba67436ee41db17a119f0739dc5c7d9dda58dd951a13766572bf72c`
- Proof that the app was not already refreshed/updated to v16 before test start: QA page returned exact prepared verdict `PREPARED: legacy v15 baseline verified — ยังไม่ใช่ NF-07 PASS` and the site-data persistence marker was present before the physical close
- Starting state (standalone/browser): normal Chrome browser tab on `qa-nf07-old-cache.html`, online

The QA fixture was setup evidence only. The acceptance result began after the verified v15 baseline existed and the tester physically closed Chrome without clearing site/app data.

## Required update path

- Normal online Service Worker update was allowed to occur: VERIFIED — Kinaraidee was reopened normally while online and production `sw.js`/v16 became current
- App/tab was closed and reopened through the normal activation path: VERIFIED — Chrome was closed through Android Recents and Kinaraidee was reopened normally
- App/site data was not cleared manually: VERIFIED — no site/app-data clear occurred between the v15 baseline and v16 verification; the persistence marker survived
- Reload/reopen count before current behavior appeared: 1 physical reopen cycle
- Final state (standalone/browser): normal reopen routed to installed/standalone Kinaraidee Home; verifier was subsequently opened in Chrome

## Required post-update verification

- Current cache/build marker is `kinaraidee-beta-v16`: VERIFIED by the state verifier after the physical reopen
- Current `pwa-install.js` behavior is present: N/A — not separately exercised in this focused NF-07 minimum-usability check
- Current `home-surprise.js` behavior is present: VERIFIED — current Home loaded and a physical Surprise action produced a usable recommendation result after the upgrade
- Current `member-sync.js` behavior is present: N/A — outside this focused NF-07 minimum-usability check
- Current `nearby-restaurants.js` behavior is present: N/A — outside this focused NF-07 minimum-usability check
- Current `history-ui.js` behavior is present: N/A — outside this focused NF-07 minimum-usability check
- App remains usable after the upgrade path without manual data clearing: VERIFIED — Home and Surprise were usable after the v15 → v16 transition

The verifier reported the privacy-safe state verdict: v15 baseline trace exists → current `sw.js`/v16 active → old cache removed → site-data marker survived. The legacy `kinaraidee-beta-v15` cache was absent in the verified current state.

## Result

NF-07 result: **PASS**

PASS rationale for this scoped session:

1. A verifiable pre-v16 baseline was captured before the update began.
2. A normal physical close/reopen allowed production Service Worker activation without manually clearing app/site data.
3. Required device/OS/browser/context metadata and the actual reopen count were captured.
4. The verifier established current `sw.js`/`kinaraidee-beta-v16`, removal of the legacy v15 cache, and survival of the same persistence marker.
5. Current Home + Surprise behavior remained usable after the upgrade.

If a future run cannot establish an old-cache baseline, it must be recorded as **INCONCLUSIVE / BASELINE NOT VERIFIED**, not promoted from assumptions.

Synthetic `PWA Cache Upgrade Regression` evidence remains implementation evidence only and does not establish this physical NF-07 result.

## Evidence boundary

This is a **scoped NF-07 physical PASS for the recorded OPPO Reno13 5G session only**. It does not establish the remaining Android/iPhone device matrix, Product Event acceptance, leaked-password protection, complete TC/NF coverage, Public Beta completion, recruitment readiness, or Commercial GO.
