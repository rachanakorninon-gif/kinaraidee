# Kinaraidee — Current Browser/PWA Runtime

This file is the canonical declaration for the browser/PWA runtime candidate. It is intentionally small so release workflows can validate runtime lineage without rewriting historical evidence.

- Current browser/PWA runtime candidate: `ea409cd02fc7744514b8c867a67f56ec0187de80`
- PWA cache marker: `kinaraidee-beta-v16`
- Runtime change: Member referral-summary security cutover. `member.html` now attempts the deployed JWT-verified `member-referral-api` first for the signed-in member's random referral code and aggregate referral counts. The existing caller-scoped `get_my_referral_summary` RPC remains a temporary fallback until the changed signed-in referral interaction has physical acceptance; no raw referral-table client grants are added. An opt-in `qa_referral_trace` marker exposes only `EDGE`, `FALLBACK` or `UNAVAILABLE` source state for evidence capture and never exposes a token/account identifier. The Service Worker/app-shell generation remains `kinaraidee-beta-v16`.
- Deployment status: **PENDING FOR CURRENT RUNTIME DEPLOYMENT**
- Last verified deployed browser/PWA descendant: `75f95dd95b0b480f3cf3ebb668d62f7cb45345ba`
- Current runtime deployment evidence is pending. No current merged/deployed SHA, Pages run or main Live Smoke is claimed for candidate `ea409cd02fc7744514b8c867a67f56ec0187de80` yet.
- Prior verified deployment evidence remains historical and is not reused as current PASS.
- Last verified browser/PWA source candidate remains `0bd5acfb9946e10ed5624205165123eabc8035b4` (PR #509 Product Event Measurement), deployed as descendant `75f95dd95b0b480f3cf3ebb668d62f7cb45345ba`; Pages run `33823701475` and main Live Smoke run `33823746430` completed success for that prior verified runtime.
- Product Event API Live Smoke run `33824058988` remains scoped production-ingestion evidence for the prior Product Event runtime; its controlled synthetic row was removed after evidence capture. Product Event real-user interaction acceptance remains separate and OPEN.
- Member referral backend replacement boundary is deployed: PR #513 merged as `01a3b79df0c0f95bed83725c60264ea285b4bbd7`; `member-referral-api` is ACTIVE v1 with `verify_jwt=true`, deployed source matches repository source, and GitHub-hosted rejection-only smoke verifies missing/malformed JWT rejection without using a real account token. This backend evidence does not establish successful signed-in interaction acceptance.
- Supabase referral/acquisition schema/RPC migration `20260903220832 / referral_acquisition_v1` and privacy correction `20260903221043 / referral_code_privacy_fix_20260904` remain deployed. Referral codes remain random public identifiers generated with `gen_random_uuid()` rather than account-derived values.
- Last aggregate backend integrity verification retained no literal identifiers: 7 referral-code rows were present, all 7 were unique/random-format, while referral rows = 0, confirmed referral rows = 0 and acquisition-attribution rows = 0 at verification time. These counts are integrity observations only, not active-user, campaign-entry, conversion or revenue counts.
- Supabase Security Advisor still reports the authenticated-callable `SECURITY DEFINER` warning for `get_my_referral_summary()` because the fallback RPC has intentionally not been revoked before physical cutover acceptance. Leaked-password protection remains a separate WARN / OPEN gate.
- Historical Auth deployment trace remains scoped to PR #373 and its recorded OPPO account-flow evidence. Historical PR #201 physical/public-form evidence remains scoped to the behaviors and sessions originally recorded.
- Physical Android Favorite/History restart, iPhone Location/NF-05, iPhone/VoiceOver NF-09, and traced OPPO Reduced Motion, TC-11/TC-12 and Auth account-flow PASS results retain their exact historical scope. None is automatically promoted to the changed referral-summary interaction.
- Public Beta is still **NOT COMPLETE**

## Evidence boundary

The current referral-summary browser candidate is **pending deployment evidence**. The existing PR #509 deployment trace remains the last verified browser/PWA deployment and is not reused as a PASS for candidate `ea409cd02fc7744514b8c867a67f56ec0187de80`.

The new browser path is deliberately reversible: Edge Function first, caller-scoped RPC fallback second. Automated source checks and anonymous/malformed-JWT rejection prove only implementation/negative authorization contracts. They do not prove that a real signed-in browser session successfully receives its own referral summary through the Edge Function. The fallback must remain available until that changed interaction is physically accepted; only then may the old RPC execute path be revoked/remediated and Security Advisor re-checked.

Product Event telemetry, referral/acquisition measurement and referral-summary aggregates remain separate from identity/public campaign eligibility truth. No synthetic/backend test is a campaign entry, eligible-user count, payment, Premium state, ad conversion or revenue event.

Campaign 3,000 remains PRE-LAUNCH. Paid acquisition remains NOT LAUNCHED. Premium is not approved/active. This pending runtime does not prove Public Beta completion, Privacy/Legal approval or Commercial GO.