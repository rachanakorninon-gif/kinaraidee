# PWA Upgrade — Physical Evidence

Status: **NOT VERIFIED — NF-07 PHYSICAL CLOSE/REOPEN UPGRADE STILL REQUIRED**

Purpose: record only real-device evidence for NF-07 old-cache → current-cache upgrade. QA fixtures, source review and synthetic Service Worker tests are setup/implementation evidence only and must never be promoted to physical PASS by themselves.

## Current target

- Current PWA cache: `kinaraidee-beta-v16`
- Current production Service Worker: `sw.js`
- NF-07 definition: `BETA-NEW-FLOW-TESTS.md`

## Deterministic legacy fixture provenance

The QA fixture `qa-sw-v15.js` is intentionally guarded as a byte-for-byte copy of historical `sw.js` from commit:

- Historical commit: `46b494cc9430ee39c2322f9e0ae8b66149c0d3bf`
- Historical commit message: `Fix real-device Location and Favorite History UX; advance PWA to v15`
- Historical cache marker: `kinaraidee-beta-v15`
- Historical Git blob ID for `sw.js`: `175198a177fc1025a9c431ee90ebfc5b07d4d620`

`qa-nf07-old-cache.html` can temporarily register this historical Service Worker on the normal Kinaraidee scope and record a local persistence marker. This is test setup only. It does not itself establish that a normal user reopening path upgraded successfully.

## Required physical acceptance sequence

A qualifying NF-07 PASS must record all of the following from one traceable physical-device session:

1. Open the deployed NF-07 QA page online on the target device.
2. Use the QA setup action and verify before starting the acceptance run:
   - active Service Worker = `qa-sw-v15.js`;
   - page controller = `qa-sw-v15.js`;
   - Cache Storage includes `kinaraidee-beta-v15`;
   - the fixture provenance hash reports MATCH;
   - the site-data persistence marker is present.
3. Treat that verified v15 state as the baseline. Do **not** clear app/site data.
4. Close the browser/PWA through the normal physical close/recent-apps path.
5. Reopen Kinaraidee normally while online so the production `index.html` executes its normal `navigator.serviceWorker.register('./sw.js')` path.
6. Record the real reopen/reload count required before the current Service Worker becomes active.
7. Open the NF-07 verifier and confirm:
   - active Service Worker = `sw.js`;
   - page controller = `sw.js`;
   - Cache Storage includes `kinaraidee-beta-v16`;
   - `kinaraidee-beta-v15` is absent;
   - `release-meta.json` reports `kinaraidee-beta-v16`;
   - the same site-data persistence marker survived.
8. Confirm current app behavior is usable after the upgrade. At minimum verify the current home/Surprise path loads; if any old behavior persists, record exactly what was seen and the number of reopen/reload cycles.
9. Record device model, OS/version, browser or standalone-PWA context/version, screenshots/video and actual close/reopen steps.

## Evidence boundary

- The historical fixture provenance can be verified by CI, but CI is **not** NF-07 physical evidence.
- Programmatically registering the v15 fixture is test setup; the acceptance result begins only after the verified v15 baseline exists and the tester performs a normal physical close/reopen without clearing data.
- A fresh v16 install is not NF-07 PASS.
- Merely seeing `kinaraidee-beta-v16` without a traceable v15 baseline is not NF-07 PASS.
- A synthetic Cache Storage object or VM simulation is not NF-07 PASS.
- If the physical environment cannot establish the baseline or normal close/reopen behavior reliably, record `INCONCLUSIVE / TEST ENVIRONMENT` rather than PASS/FAIL.

No physical NF-07 result has been recorded in this document yet.
