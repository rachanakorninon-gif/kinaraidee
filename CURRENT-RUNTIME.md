# Kinaraidee — Current Browser/PWA Runtime

This file is the canonical declaration for the browser/PWA runtime candidate. It is intentionally small so release workflows can validate runtime lineage without rewriting historical evidence.

- Current browser/PWA runtime candidate: `a60318b432598e2eb82e71dcf1a9ec804ff1c4b2`
- Runtime merge/deployed SHA: `1d21613c3c7d3e62ed8f7e5c3f00700606129c58`
- PWA cache marker: `kinaraidee-beta-v16`
- Runtime change: public Feedback and Partner application submission recovery hardening. `feedback.html` and `partner.html` now guard duplicate activation, wrap submission paths in `try/catch/finally`, restore disabled/`aria-busy` state after failures, and keep generic user-facing network error hygiene. The Service Worker app-shell generation is unchanged because these public forms are not being promoted as a new cached-shell generation by this change.
- Deployment status: **PENDING FOR CURRENT RUNTIME DEPLOYMENT**
- Current runtime deployment evidence is pending for candidate `a60318b432598e2eb82e71dcf1a9ec804ff1c4b2`; prior v16 deployment evidence must not be reused as PASS for the changed Feedback/Partner form runtime.
- Last verified browser/PWA deployment remains runtime merge `1d21613c3c7d3e62ed8f7e5c3f00700606129c58`, Pages `32752667752`, Live Smoke `32752716631`, diagnostic `32752782165`, with public `release-meta.json` matching `kinaraidee-beta-v16` before this candidate.
- Prior physical-device evidence remains scoped historical/current evidence only for the exact behaviors tested: Android Favorite/History restart #177, iPhone/Safari Location #171, and iPhone/Safari #1 NF-05. It does not validate the changed public form submission paths.
- Public Beta is still **NOT COMPLETE**

## Evidence boundary

The pending candidate contains source hardening for public form failure recovery plus a static regression guard. CI success can validate source/contract consistency only. A merged-main Pages/Live Smoke/public deployment trace is still required before the changed form runtime can be marked deployed, and real form-submission acceptance remains a separate device/Beta gate.

It does **not** create feedback submissions, partner applications, user/device results, conversion, payment or revenue evidence; it does not imply NF-07 old-cache acceptance, real keyboard interaction PASS, reduced-motion behavior on a physical platform, TalkBack/VoiceOver NF-09, a second iPhone model, the full Android/iPhone matrix, full Public Beta acceptance, payment/partner/legal readiness, leaked-password protection PASS or Commercial GO.
