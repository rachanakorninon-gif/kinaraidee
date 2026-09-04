# Kinaraidee — Current Browser/PWA Runtime

This file is the canonical declaration for the browser/PWA runtime candidate. It is intentionally small so release workflows can validate runtime lineage without rewriting historical evidence.

- Current browser/PWA runtime candidate: `0bd5acfb9946e10ed5624205165123eabc8035b4`
- PWA cache marker: `kinaraidee-beta-v16`
- Runtime change: Privacy-minimal Product Event Measurement for reviewed UTM traffic. `data/home-surprise.js` dynamically loads the isolated `data/product-events.js` helper after acquisition capture; the helper records only allowlisted funnel stages (`landing`, `guided_start`, `surprise_tap`, `recommendation_result`, `nearby_tap`) with a random browser-session UUID and coarse UTM fields. Core recommendation logic is unchanged and continues if telemetry is unavailable. `privacy.html` discloses the Product Funnel measurement. The Service Worker/app-shell generation remains `kinaraidee-beta-v16`; this candidate does not promote or rewrite prior physical v16 evidence.
- Deployment status: **PENDING FOR CURRENT RUNTIME DEPLOYMENT**
- Last verified deployed browser/PWA descendant: `02540bb61c3c62de4cfba34e92a876503765847d` for the PR #499 referral/acquisition runtime.
- Current runtime deployment evidence is pending. Do not treat PR/CI success as live Product Funnel measurement until the merged runtime has successful Pages/live deployment evidence and the required Supabase schema/functions are deployed and verified.
- Historical verified GitHub Pages run `33811511793` completed **success** for exact merged-main SHA `02540bb61c3c62de4cfba34e92a876503765847d`; main Live Smoke run `33811548157` completed **success** for the same deployed SHA; Referral acquisition regression run `33811512053` also completed **success** on that exact push SHA.
- Supabase referral/acquisition schema/RPC is deployed: migration `20260903220832 / referral_acquisition_v1`. A follow-up privacy correction is also deployed: migration `20260903221043 / referral_code_privacy_fix_20260904` rotates pre-usage referral codes away from account-derived values and makes future referral codes random public identifiers.
- Post-fix read-only verification retained no identifiers: 7 referral-code rows were present, all 7 were unique and in the random-code format, while referral rows = 0 and acquisition-attribution rows = 0 at verification time. These row counts are backend integrity observations only; they are not active-user, campaign-entry, conversion or revenue counts.
- Current live trigger uses `gen_random_uuid()` for referral-code generation and does not derive referral codes from account UUIDs.
- Historical prior runtime source candidate: `6cd98bf2a2020b86fe2ab05e263dd59f7e4fb387`; historical merged/deployed SHA: `0cc3ec3ef4dda18f0d8e083d8ca0992ef77f844c`.
- Historical Auth deployment trace: PR #373 merged as runtime source `6cd98bf2a2020b86fe2ab05e263dd59f7e4fb387`; docs-only descendant `0cc3ec3ef4dda18f0d8e083d8ca0992ef77f844c` changed no guarded browser/PWA runtime files. GitHub Pages run `33229525995`, Auth Password Security Live Smoke run `33229548182`, and main Live Smoke run `33229548190` completed **success** for that historical scoped trace.
- Historical PR #201 merged/deployed SHA: `00bdcb7f432d542b732cf355336e9f08798e4320`; GitHub Pages run `32802440796` and corresponding Live Smoke run `32802473505` completed **success** for that historical public-form runtime.
- Read-only diagnostic run `32752782165` remains historical PR #179 diagnostic evidence only.
- Issue #177 is closed **completed** for the tested physical Android installed-PWA session: the fresh favorite remained after the user fully closed the installed PWA from Recent Apps and reopened it without clearing data.
- Physical Android post-v16 Favorite/History restart evidence remains scoped PASS for the tested installed-PWA session; physical iPhone/Safari Location/NF-05 and iPhone/VoiceOver NF-09 evidence remain scoped to their recorded historical sessions; the traced OPPO Reduced Motion, TC-11/TC-12 and Auth account-flow evidence remain scoped to those exact tested behaviors. None of those physical results is automatically promoted to Product Event Measurement interaction acceptance.
- Public Beta is still **NOT COMPLETE**

## Evidence boundary

Current Product Event Measurement is a pending browser/PWA runtime candidate. CI/source inspection can prove the implementation contract but not live delivery or real user behavior.

The current source candidate `0bd5acfb9946e10ed5624205165123eabc8035b4` contains the guarded browser/PWA Product Event Measurement changes. The last verified deployed browser/PWA descendant remains `02540bb61c3c62de4cfba34e92a876503765847d` from PR #499 until a merged descendant of the new candidate receives successful Pages/live evidence. This preserves deployment lineage without claiming that Product Funnel events are live prematurely.

The existing Supabase referral schema and referral-code privacy migration remain live backend facts, but no successful real referral signup is inferred from them. Product Event Measurement schema/function deployment is not claimed by this pending runtime declaration.

Campaign 3,000 remains PRE-LAUNCH. Referral/acquisition/Product Funnel measurement is not prize eligibility truth. This runtime declaration does not create or prove a campaign entry, eligible-user count, payment, Premium state, ad conversion, revenue, Public Beta completion, Privacy/Legal approval or Commercial GO.