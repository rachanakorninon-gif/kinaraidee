# OPPO remediation deployment evidence — Issues #551 / #552

Status: **DEPLOYMENT PASS / PHYSICAL RETEST PENDING**

This file records the exact browser/PWA deployment lineage for the remediations derived from the 2026-09-07 traced OPPO physical QA session. It is deployment evidence only and does not replace post-fix physical-device verification.

## Source and merge lineage

- Source runtime candidate declared by PR #554: `6f7d56f0b68551c731d88d69e34286a8f2ecca70`.
- PR #554 reviewed head: `43260f25f203ea2ae484ec5440162d2fc6d71c66`.
- PR #554 merged to `main` as exact merge SHA: `0f96414295f2a5f5abd7da346aa8a58d47c10f63`.
- Runtime scope:
  - Issue #551: raise the fixed Home V3 bottom navigation above decorated Home content to address the recorded OPPO standalone-PWA clipping/occlusion failure.
  - Issue #552: narrow derived `ซุป/ต้ม` classification so names such as `ผัดพริกแกง...` and `ข้าวแกง...` are not classified as soup merely because they contain `แกง`, while true curry names beginning with `แกง` remain eligible.

## CI evidence

PR #554 exact reviewed head completed the repository release, runtime-lineage, metadata, device-UX, Beta, security and governance regression set successfully before merge. No test or release guard was weakened to obtain this result.

## Exact deployment evidence

The merged runtime `0f96414295f2a5f5abd7da346aa8a58d47c10f63` has a new exact-SHA deployment trace; historical Home V3 deployment evidence is not reused for this remediation.

- GitHub Pages run `34137902178` — **SUCCESS** on exact merged-main SHA `0f96414295f2a5f5abd7da346aa8a58d47c10f63`.
- Kinaraidee Live Smoke Test run `34137949343` — **SUCCESS** on the same exact SHA after the Pages deployment.
- Auth Password Security Live Smoke run `34137949293` — **SUCCESS** on the same exact SHA.
- Campaign 3000 Premium Live Smoke run `34137949307` — **SUCCESS** on the same exact SHA.
- Premium Research Preview Live Smoke run `34137949294` — **SUCCESS** on the same exact SHA.

Therefore the browser/PWA deployment trace for the merged Issue #551/#552 remediation is **PASS**.

## Physical evidence boundary

Deployment PASS does **not** create Physical PASS.

- Issue #551 remains **OPEN / PHYSICAL RETEST PENDING**. The pre-fix OPPO Reno13 5G / Android 16 standalone-PWA evidence remains a scoped FAIL until the newly deployed runtime is retested on the affected device/session class and the Home bottom navigation is observed without clipping/occlusion.
- Issue #552 remains **OPEN / PHYSICAL RETEST PENDING**. The pre-fix TC-03 OPPO evidence remains a scoped FAIL until the newly deployed runtime is retested and the `ซุป/ต้ม` flow no longer returns the recorded false-positive `ผัดพริกแกง...` behavior.
- Existing physical results for other cases retain only their recorded scope and are not broadened by this deployment.
- Issues #524 and #545 retain their independently recorded pending physical scopes.

## Release boundary

- Source PASS: **PASS** for the merged remediation lineage.
- CI PASS: **PASS** for PR #554 / merged-main guarded checks.
- Deployment PASS: **PASS** for exact merged-main SHA `0f96414295f2a5f5abd7da346aa8a58d47c10f63`.
- Physical PASS for Issues #551/#552: **PENDING**.
- Public Beta: **NOT COMPLETE**.
- Commercial launch: **NO-GO**.

This evidence does not prove real-user adoption, conversion, payment, partner activity, revenue, Privacy/Legal approval, Public Beta completion or Commercial GO.

## Canonical-document follow-up

At the time this evidence was recorded, `CURRENT-RUNTIME.md`, `CURRENT-RELEASE.md` and `BETA-DEVICE-MATRIX.md` still retained the pre-deployment/past-runtime declaration and therefore require a coordinated metadata-only sync. The existing release guards intentionally require those canonical declarations to advance together. This evidence file does not bypass or weaken those guards and must not be treated as a substitute for that canonical sync.
