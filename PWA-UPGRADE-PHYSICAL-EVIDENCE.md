# PWA Upgrade — Physical Evidence

Status: **SCOPED PHYSICAL PASS — NF-07 v15 → v16**

Purpose: supporting real-device evidence for NF-07 old-cache → current-cache upgrade. QA fixtures, source review and synthetic Service Worker tests remain setup/implementation evidence only and cannot create physical PASS by themselves.

## Current target

- Current PWA cache: `kinaraidee-beta-v16`
- Current production Service Worker: `sw.js`
- NF-07 definition: `BETA-NEW-FLOW-TESTS.md`
- Canonical result record: `NF07-PHYSICAL-UPGRADE-EVIDENCE.md`

## Deterministic legacy fixture provenance

The QA fixture `qa-sw-v15.js` is a guarded copy of historical `sw.js` from:

- Historical commit: `46b494cc9430ee39c2322f9e0ae8b66149c0d3bf`
- Historical cache marker: `kinaraidee-beta-v15`
- Expected SHA-256: `39eadd35eba67436ee41db17a119f0739dc5c7d9dda58dd951a13766572bf72c`

The fixture established only the old-cache baseline. The qualifying acceptance began after the baseline existed and required a normal physical close/reopen without clearing site/app data.

## Scoped physical session — 2026-09-05

- Device: OPPO Reno13 5G (CPH2689)
- OS: Android 16 / ColorOS 16.0.5
- Browser: Chrome 152.0.7977.64
- Baseline context: normal Chrome browser tab, online
- Physical close: Chrome closed through Android Recents
- Physical reopen: normal Kinaraidee reopen while online; Android routed the reopen into installed/standalone app context
- Actual reopen count before current behavior appeared: **1**
- No manual site/app-data clear occurred

### Verified pre-update baseline

The deployed QA setup produced the exact prepared verdict `PREPARED: legacy v15 baseline verified — ยังไม่ใช่ NF-07 PASS`, with the site-data persistence marker present. This established the traceable v15 baseline before the physical close.

### Verified post-reopen state

The verifier produced the privacy-safe state verdict that the v15 baseline trace existed, current production `sw.js`/v16 was active, the old cache was removed, and the same site-data marker survived.

The verified current state included:

- current Service Worker: `sw.js`
- current cache marker: `kinaraidee-beta-v16`
- legacy `kinaraidee-beta-v15` cache: absent
- site-data persistence marker: survived

### Post-upgrade usability

After the normal reopen, current Kinaraidee Home appeared in the installed/standalone context. A physical Surprise action was then exercised and produced a usable recommendation result. This satisfies the minimum current Home + Surprise usability check for the scoped NF-07 run.

## Result

**NF-07 scoped physical PASS** for the recorded OPPO Reno13 5G / Android 16 / Chrome 152.0.7977.64 session.

The PASS is based on the complete chronology: verified historical-v15 baseline → normal physical close → one normal online reopen → production v16 state verifier → Home + Surprise usable, with no manual data clearing.

## Evidence boundary

This result is limited to the recorded device/session and NF-07 upgrade path. It does not establish the remaining device matrix, Product Event acceptance, leaked-password protection, complete TC/NF coverage, Public Beta completion, recruitment readiness, or Commercial GO.
