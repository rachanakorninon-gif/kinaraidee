# Kinaraidee — Current Browser/PWA Runtime

This file is the canonical declaration for the browser/PWA runtime candidate. It is intentionally small so release workflows can validate runtime lineage without rewriting historical evidence.

- Current browser/PWA runtime candidate: `6cd98bf2a2020b86fe2ab05e263dd59f7e4fb387`
- PWA cache marker: `kinaraidee-beta-v16`
- Runtime change: Auth password-security UX readiness. `member.html` now recognizes Supabase weak-password rejections during signup/sign-in, preserves generic login failure wording to avoid account enumeration, routes affected users to the existing password-reset flow, and switches password autocomplete correctly between signup and login. `reset-password.html` now gives clear weak-password guidance when a replacement password is rejected. Leaked-password protection itself is **not enabled by this runtime change**; Supabase Auth configuration remains separately gated in Issue #372. The Service Worker/app-shell generation remains `kinaraidee-beta-v16` because this change does not alter `sw.js`.
- Deployment status: **PASS FOR CURRENT BROWSER/PWA DEPLOYMENT TRACE**
- Runtime merge/deployed SHA: `0cc3ec3ef4dda18f0d8e083d8ca0992ef77f844c`
- Current deployment trace: PR #373 merged as runtime source `6cd98bf2a2020b86fe2ab05e263dd59f7e4fb387`; docs-only descendant `0cc3ec3ef4dda18f0d8e083d8ca0992ef77f844c` changed no guarded browser/PWA runtime files. GitHub Pages run `33229525995` completed **success** for that exact descendant, Auth Password Security Live Smoke run `33229548182` completed **success**, and main Live Smoke run `33229548190` completed **success** after the deployment.
- Current deployment PASS is scoped to the browser/PWA static deployment trace and live source markers only. It does not prove Supabase leaked-password protection is enabled, a real weak/leaked password was rejected, or any signup/sign-in/reset interaction completed.
- Historical prior runtime source candidate: `a60318b432598e2eb82e71dcf1a9ec804ff1c4b2`; historical merged/deployed SHA: `00bdcb7f432d542b732cf355336e9f08798e4320`.
- Historical GitHub Pages run: `32802440796`.
- Historical GitHub Pages run `32802440796` completed **success** for exact merged-main SHA `00bdcb7f432d542b732cf355336e9f08798e4320`.
- Historical corresponding Live Smoke run: `32802473505`.
- Historical corresponding Live Smoke run `32802473505` completed **success** after that Pages deployment. It remains historical evidence for the prior browser/PWA runtime.
- Latest verified evidence-only deployed descendant before the current Auth trace: `5489cbbdc9ff618f1d32fa438ef91476dd350768` (PR #215 merge). Pages run `32843512340` completed **success** for that SHA and corresponding Live Smoke run `32843553479` completed **success**.
- Read-only diagnostic run: `32752782165`.
- Read-only diagnostic run `32752782165` is historical PR #179 diagnostic evidence only; no new diagnostic result is invented for the current runtime.
- Public Form Resilience Regression run `32802440775` completed **success** on the prior PR #201 merged-main SHA. This validates source recovery-state contracts only; it does not validate Auth password-security interaction.
- Physical Android post-v16 Favorite/History restart evidence remains scoped PASS for the tested installed-PWA session: the fresh favorite remained after the user fully closed the installed PWA from Recent Apps and reopened it without clearing data. Issue #177 is closed **completed** for that tested Android session.
- Physical iPhone/Safari Location #171 and NF-05 evidence remain scoped PASS for the tested iPhone session family.
- Physical iPhone/VoiceOver NF-09 acceptance on 2026-08-26 remains **PASS for the tested session** on deployed PR #201/v16. That historical evidence is not reused as Auth password-security acceptance.
- Prior physical-device evidence remains scoped historical/current evidence only for the exact behaviors tested. It does not validate weak-password rejection behavior, leaked-password protection, or current Auth interaction acceptance.
- Public Beta is still **NOT COMPLETE**

## Evidence boundary

The current deployment trace verifies that the browser-facing Auth error/recovery UX introduced by PR #373 is present on the public Pages deployment represented by descendant SHA `0cc3ec3ef4dda18f0d8e083d8ca0992ef77f844c`. No guarded browser/PWA runtime files changed between the source candidate and that deployed descendant, and the Service Worker contract remains `kinaraidee-beta-v16`.

This PASS is deliberately limited to deployment lineage and static/live source checks. It does not enable Supabase leaked-password protection, alter Auth password-strength configuration, prove a weak/leaked password was rejected in production, prove signup/sign-in/reset-email/reset-link/password-update interaction, or create any new user/account result.

The historical diagnostic/deployment/device evidence above remains valid only for its original scope. It does not imply leaked-password protection PASS, Auth security configuration approval, real-device weak-password acceptance, full Public Beta acceptance, payment/partner/legal readiness or Commercial GO. No account, payment, Premium, campaign-entry, conversion or revenue evidence is created by this runtime declaration.