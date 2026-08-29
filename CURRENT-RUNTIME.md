# Kinaraidee — Current Browser/PWA Runtime

This file is the canonical declaration for the browser/PWA runtime candidate. It is intentionally small so release workflows can validate runtime lineage without rewriting historical evidence.

- Current browser/PWA runtime candidate: `b1685a5962e64da19f7c84c42642ed8213b391e1`
- PWA cache marker: `kinaraidee-beta-v16`
- Runtime change: Auth password-security UX readiness. `member.html` now recognizes Supabase weak-password rejections during signup/sign-in, preserves generic login failure wording to avoid account enumeration, routes affected users to the existing password-reset flow, and switches password autocomplete correctly between signup and login. `reset-password.html` now gives clear weak-password guidance when a replacement password is rejected. Leaked-password protection itself is **not enabled by this runtime change**; Supabase Auth configuration remains separately gated in Issue #372. The Service Worker/app-shell generation remains `kinaraidee-beta-v16` because this change does not alter `sw.js`.
- Deployment status: **PENDING FOR CURRENT RUNTIME DEPLOYMENT**
- Current runtime deployment evidence is pending. PR #373 has source/regression evidence only until the exact merged-main descendant is deployed by GitHub Pages and the corresponding live checks succeed; no deployed PASS is claimed for the new Auth password-security UX yet.
- Historical runtime merge/deployed SHA: `00bdcb7f432598e2eb82e71dcf1a9ec804ff1c4b2`? No — do not use this line as current deployment evidence. The prior verified runtime source candidate remains `a60318b432598e2eb82e71dcf1a9ec804ff1c4b2`, and its historical merged/deployed SHA remains `00bdcb7f432d542b732cf355336e9f08798e4320`.
- Historical GitHub Pages run: `32802440796`.
- Historical GitHub Pages run `32802440796` completed **success** for exact merged-main SHA `00bdcb7f432d542b732cf355336e9f08798e4320`.
- Historical corresponding Live Smoke run: `32802473505`.
- Historical corresponding Live Smoke run `32802473505` completed **success** after that Pages deployment. It remains historical evidence for the prior browser/PWA runtime and does not prove the pending Auth password-security UX is deployed.
- Latest verified evidence-only deployed descendant before this pending candidate: `5489cbbdc9ff618f1d32fa438ef91476dd350768` (PR #215 merge). Pages run `32843512340` completed **success** for that SHA and corresponding Live Smoke run `32843553479` completed **success**. That evidence does not validate the pending Auth password-security UX.
- Read-only diagnostic run: `32752782165`.
- Read-only diagnostic run `32752782165` is historical PR #179 diagnostic evidence only; no new diagnostic result is invented for this pending runtime.
- Public Form Resilience Regression run `32802440775` completed **success** on the prior PR #201 merged-main SHA. This validates source recovery-state contracts only; it does not validate the pending Auth password-security UX.
- Physical Android post-v16 Favorite/History restart evidence remains scoped PASS for the tested installed-PWA session: the fresh favorite remained after the user fully closed the installed PWA from Recent Apps and reopened it without clearing data. Issue #177 is closed **completed** for that tested Android session.
- Physical iPhone/Safari Location #171 and NF-05 evidence remain scoped PASS for the tested iPhone session family.
- Physical iPhone/VoiceOver NF-09 acceptance on 2026-08-26 remains **PASS for the tested session** on deployed PR #201/v16. That historical evidence is not reused as Auth password-security acceptance.
- Prior verified deployment evidence remains historical and is not reused as current PASS beyond the exact scoped lineage/support explicitly identified here.
- Prior physical-device evidence remains scoped historical/current evidence only for the exact behaviors tested. It does not validate weak-password rejection behavior, leaked-password protection, or this pending runtime candidate.
- Public Beta is still **NOT COMPLETE**

## Evidence boundary

The pending runtime candidate changes only the browser-facing Auth error/recovery UX in `member.html` and `reset-password.html` plus its regression coverage. It deliberately preserves the current `kinaraidee-beta-v16` Service Worker contract. The new source behavior prepares the client to handle `WeakPasswordError` safely; it does not enable Supabase leaked-password protection, alter Auth password-strength configuration, prove a weak/leaked password was rejected in production, or create any new user/account result.

Current runtime deployment evidence is pending. Source and CI success may establish that the declared candidate is internally consistent, but they do not establish that GitHub Pages has deployed the exact merged-main descendant or that the public URLs have passed live smoke checks. Those deployment facts must be captured after merge and must not be inferred from historical v16 runs.

The historical diagnostic/deployment/device evidence above remains valid only for its original scope. It does not imply leaked-password protection PASS, Auth security configuration approval, real-device weak-password acceptance, full Public Beta acceptance, payment/partner/legal readiness or Commercial GO. No account, payment, Premium, campaign-entry, conversion or revenue evidence is created by this runtime declaration.