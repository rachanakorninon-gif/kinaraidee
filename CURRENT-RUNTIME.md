# Kinaraidee — Current Browser/PWA Runtime

This file is the canonical declaration for the browser/PWA runtime candidate. It is intentionally small so release workflows can validate runtime lineage without rewriting historical evidence.

- Current browser/PWA runtime candidate: `f401ad758e40914a10245cfab08497f7cdb99f7d`
- PWA cache marker: `kinaraidee-beta-v16`
- Runtime change: Referral/acquisition measurement readiness for the first-3,000-user growth plan. `data/acquisition.js` captures only allowlisted coarse UTM fields plus an optional referral code with strict slug/code validation and a bounded local-storage lifetime; `data/home-surprise.js` captures that context before member navigation; `member.html` passes the coarse first-touch values into Supabase Auth signup metadata, exposes an authenticated referral-summary/share UI, and clearly states that referral measurement is not Campaign 3,000 prize eligibility. `privacy.html` now discloses this measurement. The browser UI is designed to fail closed/gracefully while the corresponding Supabase referral schema/RPC is not deployed. The Service Worker/app-shell generation remains `kinaraidee-beta-v16` because this change does not alter `sw.js`.
- Deployment status: **PENDING FOR CURRENT RUNTIME DEPLOYMENT**
- Runtime merge/deployed SHA: **PENDING — no current deployed SHA**
- Last verified deployed browser/PWA descendant: `0cc3ec3ef4dda18f0d8e083d8ca0992ef77f844c` for the prior PR #373 Auth password-security runtime.
- Current runtime deployment evidence is pending. PR #499 source candidate `f401ad758e40914a10245cfab08497f7cdb99f7d` has not yet been merged/deployed to GitHub Pages.
- Prior verified deployment evidence remains historical and is not reused as current PASS.
- The referral/acquisition source and its CI contract do **not** prove that the Supabase referral schema/RPC is deployed, that a referral signup has completed, that any user count increased, that any paid-ad conversion occurred, or that any Campaign 3,000 prize entry exists.
- Historical prior runtime source candidate: `6cd98bf2a2020b86fe2ab05e263dd59f7e4fb387`; historical merged/deployed SHA: `0cc3ec3ef4dda18f0d8e083d8ca0992ef77f844c`.
- Historical Auth deployment trace: PR #373 merged as runtime source `6cd98bf2a2020b86fe2ab05e263dd59f7e4fb387`; docs-only descendant `0cc3ec3ef4dda18f0d8e083d8ca0992ef77f844c` changed no guarded browser/PWA runtime files. GitHub Pages run `33229525995`, Auth Password Security Live Smoke run `33229548182`, and main Live Smoke run `33229548190` completed **success** for that historical scoped trace.
- Historical PR #201 merged/deployed SHA: `00bdcb7f432d542b732cf355336e9f08798e4320`; GitHub Pages run `32802440796` and corresponding Live Smoke run `32802473505` completed **success** for that historical public-form runtime.
- Read-only diagnostic run `32752782165` remains historical PR #179 diagnostic evidence only.
- Physical Android post-v16 Favorite/History restart evidence remains scoped PASS for the tested installed-PWA session: the fresh favorite remained after the user fully closed the installed PWA from Recent Apps and reopened it without clearing data. Issue #177 is closed **completed** for that tested Android session.
- Physical iPhone/Safari Location #171 and NF-05 evidence remain scoped PASS for the tested iPhone session family.
- Physical iPhone/VoiceOver NF-09 acceptance on 2026-08-26 remains **PASS for the tested session** on deployed PR #201/v16. That historical evidence is not reused as referral/acquisition acceptance.
- Prior physical-device evidence remains scoped historical/current evidence only for the exact behaviors tested. It does not validate the new referral/acquisition flow, referral counting, backend deployment, prize eligibility or current runtime deployment.
- Public Beta is still **NOT COMPLETE**

## Evidence boundary

The current source candidate `f401ad758e40914a10245cfab08497f7cdb99f7d` contains the guarded browser/PWA changes for acquisition capture, member referral UI and the updated privacy disclosure, plus the referral/acquisition regression contract. Its dedicated source/contract workflow passed on PR #499, but current browser/PWA deployment evidence remains pending until the candidate is merged and the resulting Pages/runtime trace is verified.

The last verified deployed browser/PWA descendant remains `0cc3ec3ef4dda18f0d8e083d8ca0992ef77f844c` for the prior Auth password-security runtime. No current Referral deployment PASS is inferred from that historical trace.

The referral schema/RPC SQL is staged in source and intentionally not counted as live backend evidence until an explicit Supabase deployment and post-deployment verification are executed. This runtime declaration does not create a user, referral, campaign entry, payment, Premium state, conversion or revenue result, and it does not imply Commercial GO or change the existing Privacy/Legal and Commercial NO-GO gates.