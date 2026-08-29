# Kinaraidee — Current Browser/PWA Runtime

This file is the canonical declaration for the browser/PWA runtime candidate. It is intentionally small so release workflows can validate runtime lineage without rewriting historical evidence.

- Current browser/PWA runtime candidate: `6cd98bf2a2020b86fe2ab05e263dd59f7e4fb387`
- PWA cache marker: `kinaraidee-beta-v16`
- Runtime change: Auth password-security UX readiness. `member.html` recognizes Supabase weak-password rejections during signup/sign-in, preserves generic login failure wording to avoid account enumeration, routes affected users to the existing password-reset flow, and switches password autocomplete correctly between signup and login. `reset-password.html` gives clear weak-password guidance when a replacement password is rejected. Leaked-password protection itself is **not enabled by this runtime change**; Supabase Auth configuration remains separately gated in Issue #372. The Service Worker/app-shell generation remains `kinaraidee-beta-v16` because this change does not alter `sw.js`.
- Deployment status: **PASS FOR CURRENT BROWSER/PWA DEPLOYMENT TRACE**
- Runtime merge/deployed SHA: `0cc3ec3ef4dda18f0d8e083d8ca0992ef77f844c` (PR #374 post-merge lineage descendant of PR #373 runtime candidate).
- GitHub Pages run: `33229525995`.
- GitHub Pages run `33229525995` completed **success** for exact merged-main descendant SHA `0cc3ec3ef4dda18f0d8e083d8ca0992ef77f844c`. Predeploy verified that runtime candidate `6cd98bf2a2020b86fe2ab05e263dd59f7e4fb387` is an ancestor and that no browser/PWA runtime files changed after that candidate.
- Corresponding Live Smoke run: `33229548190`.
- Corresponding Live Smoke run `33229548190` completed **success** after that Pages deployment, including public pages/assets, current live runtime contract and non-publication of development files.
- Auth Password Security Live Smoke run: `33229548182`.
- Auth Password Security Live Smoke run `33229548182` completed **success** against the deployed public `member.html` and `reset-password.html`, verifying weak-password guidance markers, generic login-failure wording, signup/login autocomplete switching and separation from the private admin reset path.
- The Auth live smoke is static deployed-UX evidence only. It does **not** submit credentials, prove a real weak/leaked password rejection, or prove Supabase leaked-password protection is enabled.
- The earlier Pages run `33229416059` for exact PR #373 merge SHA was correctly blocked before deployment because the pre-merge branch candidate did not survive squash-merge ancestry. PR #374 corrected the declaration to the exact merged-main runtime candidate before successful deployment; that blocked run is not counted as a runtime failure.
- Historical prior runtime source candidate: `a60318b432598e2eb82e71dcf1a9ec804ff1c4b2`; historical merged/deployed SHA: `00bdcb7f432d542b732cf355336e9f08798e4320`.
- Historical GitHub Pages run `32802440796` and corresponding Live Smoke `32802473505` remain scoped evidence for that prior runtime only.
- Latest verified evidence-only deployed descendant for the current Auth runtime trace: `0cc3ec3ef4dda18f0d8e083d8ca0992ef77f844c` with Pages `33229525995`, Live Smoke `33229548190` and Auth Password Security Live Smoke `33229548182` all successful.
- Read-only diagnostic run: `32752782165`.
- Read-only diagnostic run `32752782165` is historical PR #179 diagnostic evidence retained for the release-metadata evidence contract; it does not prove Auth password behavior.
- Physical Android post-v16 Favorite/History restart evidence remains scoped PASS for the tested installed-PWA session only.
- Physical iPhone/Safari Location #171 and NF-05 evidence remain scoped PASS for the tested iPhone session family only.
- Physical iPhone/VoiceOver NF-09 acceptance on 2026-08-26 remains **PASS for the tested session** on the earlier deployed v16 runtime. That historical evidence is not reused as Auth password-security interaction acceptance.
- Prior physical-device evidence remains scoped only to the exact behaviors tested. It does not validate leaked-password protection or real Auth weak-password rejection.
- Public Beta is still **NOT COMPLETE**

## Evidence boundary

The current candidate changes only the browser-facing Auth error/recovery UX in `member.html` and `reset-password.html` plus regression/live-smoke coverage. Pages `33229525995`, Live Smoke `33229548190`, and Auth Password Security Live Smoke `33229548182` establish a scoped deployment trace for those static browser UX changes while preserving `kinaraidee-beta-v16`.

This PASS does **not** mean Supabase leaked-password protection is enabled. It does not alter Auth password-strength configuration, prove a real weak/leaked password was rejected, complete a real signup/reset interaction, or create a new account result. Issue #372 remains open for the actual Auth configuration change, controlled interaction tests, and Security Advisor re-check.

The deployment evidence above also does not imply full Public Beta acceptance, payment/Premium execution, campaign legal readiness, prize entry, partner-commercial readiness or Commercial GO. No account, payment, Premium subscriber, campaign-entry, conversion, revenue or winner evidence is created by this runtime declaration.