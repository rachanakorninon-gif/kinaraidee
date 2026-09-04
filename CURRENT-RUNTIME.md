# Kinaraidee — Current Browser/PWA Runtime

This file is the canonical declaration for the browser/PWA runtime candidate. It is intentionally small so release workflows can validate runtime lineage without rewriting historical evidence.

- Current browser/PWA runtime candidate: `4e2e1789921aa6fd73b2677ac5def2bc35a8be73`
- PWA cache marker: `kinaraidee-beta-v16`
- Runtime change: post-acceptance Member referral-summary cutover. After a traced signed-in physical session returned privacy-safe source label `EDGE` and satisfied the canonical referral-summary render checks, `member.html` now uses the deployed JWT-verified `member-referral-api` as the only referral-summary browser path. The temporary browser RPC fallback has been removed. The opt-in `qa_referral_trace` marker now exposes only `EDGE` after success or `UNAVAILABLE` after failure and never exposes a token/account identifier. The Service Worker/app-shell generation remains `kinaraidee-beta-v16`.
- Deployment status: **PENDING FOR CURRENT RUNTIME DEPLOYMENT**
- Last verified deployed browser/PWA descendant: `adbb23c4f373ebfe6ed1d78e71ec051a3c05ed7a`.
- Last verified GitHub Pages run `33838629999` completed **success** for `adbb23c4f373ebfe6ed1d78e71ec051a3c05ed7a`.
- Last verified main Live Smoke run `33838665915` completed **success** for the same prior deployed descendant.
- Current runtime deployment evidence is pending for source candidate `4e2e1789921aa6fd73b2677ac5def2bc35a8be73`; the prior Pages/Live Smoke trace does not prove deployment of this new Edge-only browser source.
- Referral-summary physical acceptance is **PASS for the scoped OPPO Reno13 5G / Android 16 / Chrome 152.0.7977.64 signed-in session on 2026-09-04 Asia/Bangkok**. The privacy-safe QA source label was `EDGE`; the referral summary rendered, both aggregate fields rendered as numbers, and Share/Copy controls became enabled. No aggregate values, referral code/link, email, account identifier, token, browser storage/session payload or raw authenticated request/response were retained in evidence.
- `member-referral-api` remains ACTIVE v1 with `verify_jwt=true`; source/deployment parity and missing/malformed-JWT rejection-only smoke remain verified through the prior backend evidence.
- The old caller-scoped `get_my_referral_summary()` database execute path is no longer used by this browser candidate. Database execute revocation is a post-deployment security follow-up and must not be applied until the Edge-only browser source is deployed successfully, so the currently live Security Advisor warning is expected to remain until that ordered cutover step completes.
- Raw `member_referral_codes` and `member_referrals` tables remain unavailable to browser roles; the Edge Function keeps raw referral access server-side.
- Supabase Auth leaked-password protection remains a separate WARN / OPEN gate and is not affected by referral cutover acceptance.
- Product Event real-user interaction acceptance, NF-07 physical cache upgrade, the remaining Android/iPhone device matrix, and other open Beta gates are unchanged.
- Historical Auth/public-form/Reduced-Motion/Keyboard-Focus physical evidence retains only its recorded scope and is not generalized by this referral result.
- Public Beta is still **NOT COMPLETE**

## Evidence boundary

The physical `EDGE` PASS proves only the signed-in referral-summary retrieval/render interaction observed in the traced OPPO session. It does not prove referral conversion, successful referred signup, Campaign 3,000 eligibility, user growth, paid acquisition, payment, Premium state or revenue.

The new browser candidate removes the already-accepted temporary RPC fallback but is not yet deployed. Deployment must be verified through a fresh Pages run and corresponding main Live Smoke before database execute access for the old RPC is revoked. After revocation, Security Advisor and browser-role table/function privileges must be re-checked before the security follow-up is called complete.

No synthetic/backend test substitutes for Product Event real-user acceptance or remaining physical-device requirements. Campaign 3,000 remains PRE-LAUNCH. Paid acquisition remains NOT LAUNCHED. Premium is not approved/active. This pending runtime does not prove Public Beta completion, Privacy/Legal approval or Commercial GO.