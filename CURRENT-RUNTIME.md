# Kinaraidee — Current Browser/PWA Runtime

This file is the canonical declaration for the browser/PWA runtime candidate. It is intentionally small so release workflows can validate runtime lineage without rewriting historical evidence.

- Current browser/PWA runtime candidate: `f401ad758e40914a10245cfab08497f7cdb99f7d`
- PWA cache marker: `kinaraidee-beta-v16`
- Runtime change: Referral/acquisition measurement readiness for the first-3,000-user growth plan. `data/acquisition.js` captures only allowlisted coarse UTM fields plus an optional referral code with strict validation and a bounded local-storage lifetime; `data/home-surprise.js` captures that context before member navigation; `member.html` passes coarse first-touch values into Supabase Auth signup metadata, exposes an authenticated referral-summary/share UI, and states that referral measurement is not Campaign 3,000 prize eligibility. `privacy.html` discloses this measurement. The Service Worker/app-shell generation remains `kinaraidee-beta-v16` because this runtime did not alter `sw.js`.
- Deployment status: **PASS FOR CURRENT BROWSER/PWA DEPLOYMENT TRACE**
- Runtime merge/deployed SHA: `02540bb61c3c62de4cfba34e92a876503765847d`
- Last verified deployed browser/PWA descendant: `02540bb61c3c62de4cfba34e92a876503765847d` for the PR #499 referral/acquisition runtime.
- GitHub Pages run `33811511793` completed **success** for exact merged-main SHA `02540bb61c3c62de4cfba34e92a876503765847d`; Referral acquisition regression run `33811512053` also completed **success** on that exact push SHA.
- Supabase referral/acquisition schema/RPC is deployed: migration `20260903220832 / referral_acquisition_v1`. A follow-up privacy correction is also deployed: migration `20260903221043 / referral_code_privacy_fix_20260904` rotates pre-usage referral codes away from account-derived values and makes future referral codes random public identifiers.
- Post-fix read-only verification retained no identifiers: 7 referral-code rows were present, all 7 were unique and in the random-code format, while referral rows = 0 and acquisition-attribution rows = 0 at verification time. These row counts are backend integrity observations only; they are not active-user, campaign-entry, conversion or revenue counts.
- Current live trigger uses `gen_random_uuid()` for referral-code generation and does not derive referral codes from account UUIDs.
- Historical prior runtime source candidate: `6cd98bf2a2020b86fe2ab05e263dd59f7e4fb387`; historical merged/deployed SHA: `0cc3ec3ef4dda18f0d8e083d8ca0992ef77f844c`.
- Historical Auth deployment trace: PR #373 merged as runtime source `6cd98bf2a2020b86fe2ab05e263dd59f7e4fb387`; docs-only descendant `0cc3ec3ef4dda18f0d8e083d8ca0992ef77f844c` changed no guarded browser/PWA runtime files. GitHub Pages run `33229525995`, Auth Password Security Live Smoke run `33229548182`, and main Live Smoke run `33229548190` completed **success** for that historical scoped trace.
- Historical PR #201 merged/deployed SHA: `00bdcb7f432d542b732cf355336e9f08798e4320`; GitHub Pages run `32802440796` and corresponding Live Smoke run `32802473505` completed **success** for that historical public-form runtime.
- Read-only diagnostic run `32752782165` remains historical PR #179 diagnostic evidence only.
- Physical Android post-v16 Favorite/History restart evidence remains scoped PASS for the tested installed-PWA session; physical iPhone/Safari Location/NF-05 and iPhone/VoiceOver NF-09 evidence remain scoped to their recorded historical sessions; the traced OPPO Reduced Motion, TC-11/TC-12 and Auth account-flow evidence remain scoped to those exact tested behaviors. None of those physical results is automatically promoted to referral/acquisition interaction acceptance.
- Public Beta is still **NOT COMPLETE**

## Evidence boundary

The current source candidate `f401ad758e40914a10245cfab08497f7cdb99f7d` contains the guarded browser/PWA acquisition/referral changes, and merged-main descendant `02540bb61c3c62de4cfba34e92a876503765847d` has a successful Pages deployment trace. This establishes current browser/PWA deployment lineage only.

The Supabase schema and referral-code privacy migration are live backend facts, but no successful real referral signup has been claimed from them. At the scoped post-fix verification point, referral rows and acquisition-attribution rows were both zero. The existence of seven generated referral-code rows for existing accounts must not be interpreted as seven active users, seven referrals, Campaign 3,000 entries or any conversion result.

Campaign 3,000 remains PRE-LAUNCH. Referral/acquisition measurement is not prize eligibility truth. This runtime declaration does not create or prove a campaign entry, eligible-user count, payment, Premium state, ad conversion, revenue, Public Beta completion, Privacy/Legal approval or Commercial GO.