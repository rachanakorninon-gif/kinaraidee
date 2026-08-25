# Kinaraidee — Current Browser/PWA Runtime

This file is the canonical declaration for the browser/PWA runtime candidate. It is intentionally small so release workflows can validate runtime lineage without rewriting historical evidence.

- Current browser/PWA runtime candidate: `a60318b432598e2eb82e71dcf1a9ec804ff1c4b2`
- PWA cache marker: `kinaraidee-beta-v16`
- Runtime change: public Feedback and Partner application submission recovery hardening. `feedback.html` and `partner.html` guard duplicate activation, wrap submission paths in `try/catch/finally`, restore disabled/`aria-busy` state after failures, and keep generic user-facing network error hygiene. The Service Worker app-shell generation is unchanged because these public forms are not promoted as a new cached-shell generation by this change.
- Deployment status: **PASS FOR CURRENT BROWSER/PWA DEPLOYMENT TRACE**
- Runtime merge/deployed SHA: `00bdcb7f432d542b732cf355336e9f08798e4320` (PR #201 merged).
- Pages workflow run `32802440796` completed **success** for exact merged-main SHA `00bdcb7f432d542b732cf355336e9f08798e4320`.
- Corresponding Live Smoke run `32802473505` completed **success** after that Pages deployment. The workflow verifies public `feedback.html`, `partner.html`, `release-meta.json` and `sw.js`, requires the public release-meta SHA to equal the successful Pages head SHA, and requires the live Service Worker/release metadata cache marker to match `kinaraidee-beta-v16`.
- Public Form Resilience Regression run `32802440775` completed **success** on the exact merged-main SHA. This validates source recovery-state contracts only; it does not submit a form.
- Physical Android post-v16 Favorite/History restart evidence remains scoped PASS for the tested installed-PWA session: the app was fully closed from Recent Apps and reopened without clearing data, with the fresh favorite retained. Issue #177 is closed **completed** for that tested Android session.
- Prior physical-device evidence remains scoped historical/current evidence only for the exact behaviors tested: Android Favorite/History restart #177, iPhone/Safari Location #171, and iPhone/Safari #1 NF-05. It does not validate real Feedback/Partner form submission behavior.
- Public Beta is still **NOT COMPLETE**

## Evidence boundary

The current candidate contains source hardening for public form failure recovery plus a static regression guard. Merged-main Pages and Live Smoke now establish a scoped deployment trace for the exact PR #201 merge SHA, including public release metadata/cache consistency. They do **not** establish successful real Feedback or Partner form submission, backend insert acceptance, or device interaction for the changed submission paths.

This deployment PASS does **not** imply real form-submission PASS, NF-07 old-cache acceptance, real keyboard interaction PASS, reduced-motion behavior on a physical platform, TalkBack/VoiceOver NF-09, a second iPhone model, the full Android/iPhone matrix, full Public Beta acceptance, payment/partner/legal readiness, leaked-password protection PASS or Commercial GO. It also creates no feedback submissions, partner applications, user/device results, conversion, payment or revenue evidence.
