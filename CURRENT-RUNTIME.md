# Kinaraidee — Current Browser/PWA Runtime

This file is the canonical declaration for the browser/PWA runtime candidate. It is intentionally small so release workflows can validate runtime lineage without rewriting historical evidence.

- Current browser/PWA runtime candidate: `ea409cd02fc7744514b8c867a67f56ec0187de80`
- PWA cache marker: `kinaraidee-beta-v16`
- Runtime change: Member referral-summary security cutover. `member.html` now attempts the deployed JWT-verified `member-referral-api` first for the signed-in member's random referral code and aggregate referral counts. The existing caller-scoped `get_my_referral_summary` RPC remains a temporary fallback until the changed signed-in referral interaction has physical acceptance; no raw referral-table client grants are added. An opt-in `qa_referral_trace` marker exposes only `EDGE`, `FALLBACK` or `UNAVAILABLE` source state for evidence capture and never exposes a token/account identifier. The Service Worker/app-shell generation remains `kinaraidee-beta-v16`.
- Deployment status: **PASS FOR CURRENT BROWSER/PWA DEPLOYMENT TRACE**
- Runtime merge/deployed SHA: `adbb23c4f373ebfe6ed1d78e71ec051a3c05ed7a`.
- GitHub Pages run `33838629999` completed **success** for exact merged-main SHA `adbb23c4f373ebfe6ed1d78e71ec051a3c05ed7a`.
- Main `Kinaraidee Live Smoke Test` run `33838665915` completed **success** after the same merged-main deployment.
- This deployment PASS proves source/deployment lineage for the Edge-first + temporary-RPC-fallback browser runtime only. It does **not** prove that a real signed-in browser session used the Edge path successfully.
- Historical prior runtime source candidate: `0bd5acfb9946e10ed5624205165123eabc8035b4`; historical merged/deployed SHA: `75f95dd95b0b480f3cf3ebb668d62f7cb45345ba`.
- The historical PR #509 Product Event runtime remains verified for its original browser/PWA deployment scope: Pages run `33823701475` and main Live Smoke run `33823746430` completed success for deployed descendant `75f95dd95b0b480f3cf3ebb668d62f7cb45345ba`. Product Event real-user interaction acceptance remains separate and OPEN.
- Product Event API Live Smoke run `33824058988` remains scoped production-ingestion evidence for the prior Product Event runtime; its controlled synthetic row was removed after evidence capture.
- Member referral backend replacement boundary is deployed: PR #513 merged as `01a3b79df0c0f95bed83725c60264ea285b4bbd7`; `member-referral-api` is ACTIVE v1 with `verify_jwt=true`, deployed source matches repository source, and GitHub-hosted rejection-only smoke verifies missing/malformed JWT rejection without using a real account token. This backend evidence does not establish successful signed-in interaction acceptance.
- `REFERRAL-SUMMARY-PHYSICAL-EVIDENCE.md` remains **NOT VERIFIED / PHYSICAL SIGNED-IN ACCEPTANCE REQUIRED**. A scoped PASS requires a traceable signed-in session to show `Referral API: EDGE` and render the referral summary correctly. `FALLBACK` preserves continuity but is not Edge acceptance.
- Supabase referral/acquisition schema/RPC migration `20260903220832 / referral_acquisition_v1` and privacy correction `20260903221043 / referral_code_privacy_fix_20260904` remain deployed. Referral codes remain random public identifiers generated with `gen_random_uuid()` rather than account-derived values.
- Last aggregate backend integrity verification retained no literal identifiers: 7 referral-code rows were present, all 7 were unique/random-format, while referral rows = 0, confirmed referral rows = 0 and acquisition-attribution rows = 0 at verification time. These counts are integrity observations only, not active-user, campaign-entry, conversion or revenue counts.
- Supabase Security Advisor still reports the authenticated-callable `SECURITY DEFINER` warning for `get_my_referral_summary()` because the fallback RPC has intentionally not been revoked before physical cutover acceptance. Direct browser-role SELECT on `member_referral_codes` and `member_referrals` remains unavailable. Leaked-password protection remains a separate WARN / OPEN gate.
- Historical Auth deployment trace remains scoped to PR #373 and its recorded OPPO account-flow evidence. Historical PR #201 physical/public-form evidence remains scoped to the behaviors and sessions originally recorded.
- Issue #177 is closed **completed** for the tested physical Android installed-PWA session: the fresh favorite remained after the user fully closed the installed PWA from Recent Apps and reopened it without clearing data.
- Physical Android Favorite/History restart, iPhone Location/NF-05, iPhone/VoiceOver NF-09, and traced OPPO Reduced Motion, TC-11/TC-12 and Auth account-flow PASS results retain their exact historical scope. None is automatically promoted to the changed referral-summary interaction.
- Public Beta is still **NOT COMPLETE**

## Evidence boundary

The current referral-summary browser candidate has verified Pages + main Live Smoke deployment evidence on merged-main descendant `adbb23c4f373ebfe6ed1d78e71ec051a3c05ed7a`. This is deployment evidence only, not physical signed-in acceptance.

The new browser path is deliberately reversible: Edge Function first, caller-scoped RPC fallback second. Automated source checks and anonymous/malformed-JWT rejection prove implementation/negative authorization contracts, while deployment checks prove the changed code reached production. They do not prove that a real signed-in browser session successfully receives its own referral summary through the Edge Function. The fallback must remain available until that changed interaction is physically accepted; only then may the old RPC execute path be revoked/remediated and Security Advisor re-checked.

Product Event telemetry, referral/acquisition measurement and referral-summary aggregates remain separate from identity/public campaign eligibility truth. No synthetic/backend test is a campaign entry, eligible-user count, payment, Premium state, ad conversion or revenue event.

Campaign 3,000 remains PRE-LAUNCH. Paid acquisition remains NOT LAUNCHED. Premium is not approved/active. This deployment trace does not prove Public Beta completion, Privacy/Legal approval or Commercial GO.