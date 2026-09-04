# Kinaraidee — Current Browser/PWA Runtime

This file is the canonical declaration for the browser/PWA runtime candidate. It is intentionally small so release workflows can validate runtime lineage without rewriting historical evidence.

- Current browser/PWA runtime candidate: `0bd5acfb9946e10ed5624205165123eabc8035b4`
- PWA cache marker: `kinaraidee-beta-v16`
- Runtime change: Privacy-minimal Product Event Measurement for reviewed UTM traffic. `data/home-surprise.js` dynamically loads the isolated `data/product-events.js` helper after acquisition capture; the helper records only allowlisted funnel stages (`landing`, `guided_start`, `surprise_tap`, `recommendation_result`, `nearby_tap`) with a random browser-session UUID and coarse UTM fields. Core recommendation logic is unchanged and continues if telemetry is unavailable. `privacy.html` discloses the Product Funnel measurement. The Service Worker/app-shell generation remains `kinaraidee-beta-v16`; this deployment does not promote or rewrite prior physical v16 evidence.
- Deployment status: **PASS FOR CURRENT BROWSER/PWA DEPLOYMENT TRACE**
- Runtime merge/deployed SHA: `75f95dd95b0b480f3cf3ebb668d62f7cb45345ba`
- Current GitHub Pages run `33823701475` completed **success** for exact merged-main SHA `75f95dd95b0b480f3cf3ebb668d62f7cb45345ba`.
- Current main Live Smoke run `33823746430` completed **success** for the same deployed SHA.
- Product Event API Live Smoke run `33824058988` completed **success** from a GitHub-hosted runner against the production ingestion endpoint: first allowed-origin insert succeeded, duplicate submission was idempotent, and wrong-origin submission was rejected. The exact synthetic trace (`utm_campaign=internal_product_event_smoke_20260904`, `utm_content=smoke_33824058988`) created one `landing` row; that one row was deleted after evidence capture and a follow-up query confirmed 0 matching rows remain.
- Product Event Measurement backend is deployed: the production product-event schema is present with RLS enabled and no direct `anon`/`authenticated` table access; `product-event-api` is ACTIVE v1 and `acquisition-api` is ACTIVE v2. Product tracking start is recorded as `2026-09-04 00:55:19 UTC` (`2026-09-04 07:55:19 Asia/Bangkok`).
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

Current deployment PASS is scoped to the browser/PWA static deployment trace and live source markers only.

The source candidate `0bd5acfb9946e10ed5624205165123eabc8035b4` is contained in merged/deployed SHA `75f95dd95b0b480f3cf3ebb668d62f7cb45345ba`, with successful Pages and main Live Smoke evidence. The separate production API live smoke verifies scoped ingestion behavior for the synthetic trace only. These checks establish deployment and endpoint behavior; they do not establish real-user interaction acceptance, conversion performance, retention, or marketing effectiveness.

The Product Event Measurement schema/functions are live backend facts. Product telemetry is best-effort and unique-session oriented; it is not an identity system and is not prize eligibility truth. The synthetic API-smoke row was removed after verification so Owner aggregates are not intentionally contaminated by that test.

Campaign 3,000 remains PRE-LAUNCH. Paid acquisition remains NOT LAUNCHED. Premium is not approved/active. Referral/acquisition/Product Funnel measurement is not prize eligibility truth. This deployment does not prove a campaign entry, eligible-user count, payment, Premium state, ad conversion, revenue, Public Beta completion, Privacy/Legal approval or Commercial GO.