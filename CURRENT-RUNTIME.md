# Kinaraidee — Current Browser/PWA Runtime

This file is the canonical declaration for the browser/PWA runtime candidate. It is intentionally small so release workflows can validate runtime lineage without rewriting historical evidence.

- Current browser/PWA runtime candidate: `6cd98bf2a2020b86fe2ab05e263dd59f7e4fb387`
- PWA cache marker: `kinaraidee-beta-v16`
- Runtime change: Auth password-security UX readiness. `member.html` now recognizes Supabase weak-password rejections during signup/sign-in, preserves generic login failure wording to avoid account enumeration, routes affected users to the existing password-reset flow, and switches password autocomplete correctly between signup and login. `reset-password.html` now gives clear weak-password guidance when a replacement password is rejected. Leaked-password protection itself is **not enabled by this runtime change**; Supabase Auth configuration remains separately gated in Issue #372. The Service Worker/app-shell generation remains `kinaraidee-beta-v16` because this change does not alter `sw.js`.
- Deployment status: **DEPLOYED STATIC UX VERIFIED / AUTH CONFIGURATION NOT VERIFIED**
- Current runtime deployment evidence is recorded in `AUTH-PASSWORD-SECURITY-DEPLOYMENT-EVIDENCE.md`: PR #373 merged as `6cd98bf2a2020b86fe2ab05e263dd59f7e4fb387`; docs-only descendant `0cc3ec3ef4dda18f0d8e083d8ca0992ef77f844c` changed no guarded browser/PWA runtime files, GitHub Pages run `33229525995` completed **success**, Auth Password Security Live Smoke run `33229548182` completed **success**, and main Live Smoke run `33229548190` completed **success**. This proves the deployed static Auth UX only; it does not prove leaked-password protection is enabled or that a real weak/leaked password was rejected.
- Historical prior runtime source candidate: `a60318b432598e2eb82e71dcf1a9ec804ff1c4b2`; historical merged/deployed SHA: `00bdcb7f432d542b732cf355336e9f08798e4320`.
- Historical GitHub Pages run: `32802440796`.
- Historical GitHub Pages run `32802440796` completed **success** for exact merged-main SHA `00bdcb7f432d542b732cf355336e9f08798e4320`.
- Historical corresponding Live Smoke run: `32802473505`.
- Historical corresponding Live Smoke run `32802473505` completed **success** after that Pages deployment. It remains historical evidence for the prior browser/PWA runtime and is not reused as current Auth password-security evidence.
- Latest verified evidence-only deployed descendant before this Auth UX deployment: `5489cbbdc9ff618f1d32fa438ef91476dd350768` (PR #215 merge). Pages run `32843512340` completed **success** for that SHA and corresponding Live Smoke run `32843553479` completed **success**. That evidence remains historical and is not reused as Auth password-security evidence.
- Read-only diagnostic run: `32752782165`.
- Read-only diagnostic run `32752782165` is historical PR #179 diagnostic evidence only; no new diagnostic result is invented for this runtime.
- Public Form Resilience Regression run `32802440775` completed **success** on the prior PR #201 merged-main SHA. This validates source recovery-state contracts only; it does not validate the Auth password-security UX.
- Physical Android post-v16 Favorite/History restart evidence remains scoped PASS for the tested installed-PWA session: the fresh favorite remained after the user fully closed the installed PWA from Recent Apps and reopened it without clearing data. Issue #177 is closed **completed** for that tested Android session.
- Physical iPhone/Safari Location #171 and NF-05 evidence remain scoped PASS for the tested iPhone session family.
- Physical iPhone/VoiceOver NF-09 acceptance on 2026-08-26 remains **PASS for the tested session** on deployed PR #201/v16. That historical evidence is not reused as Auth password-security acceptance.
- Prior verified deployment evidence remains historical and is not reused as current PASS beyond the exact scoped lineage/support explicitly identified here.
- Prior physical-device evidence remains scoped historical/current evidence only for the exact behaviors tested. It does not validate weak-password rejection behavior, leaked-password protection, or this runtime candidate.
- Public Beta is still **NOT COMPLETE**

## Evidence boundary

The current runtime candidate changes only the browser-facing Auth error/recovery UX in `member.html` and `reset-password.html` plus its regression coverage. It deliberately preserves the current `kinaraidee-beta-v16` Service Worker contract. The source behavior prepares the client to handle `WeakPasswordError` safely; it does not enable Supabase leaked-password protection, alter Auth password-strength configuration, prove a weak/leaked password was rejected in production, or create any new user/account result.

Deployment of the static Auth UX is verified only through the exact scoped lineage recorded in `AUTH-PASSWORD-SECURITY-DEPLOYMENT-EVIDENCE.md`: descendant SHA `0cc3ec3ef4dda18f0d8e083d8ca0992ef77f844c`, Pages run `33229525995`, Auth Password Security Live Smoke `33229548182`, and main Live Smoke `33229548190`. Those checks submit no credentials and do not establish Supabase leaked-password protection PASS, real Auth interaction, or physical-device weak-password acceptance.

The historical diagnostic/deployment/device evidence above remains valid only for its original scope. It does not imply leaked-password protection PASS, Auth security configuration approval, real-device weak-password acceptance, full Public Beta acceptance, payment/partner/legal readiness or Commercial GO. No account, payment, Premium, campaign-entry, conversion or revenue evidence is created by this runtime declaration.
