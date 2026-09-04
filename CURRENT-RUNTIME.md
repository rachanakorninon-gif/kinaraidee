# Kinaraidee — Current Browser/PWA Runtime

This file is the canonical declaration for the browser/PWA runtime candidate. It is intentionally small so release workflows can validate runtime lineage without rewriting historical evidence.

- Current browser/PWA runtime candidate: `4e2e1789921aa6fd73b2677ac5def2bc35a8be73`
- PWA cache marker: `kinaraidee-beta-v16`
- Runtime change: post-acceptance Member referral-summary cutover. After a traced signed-in physical session returned privacy-safe source label `EDGE` and satisfied the canonical referral-summary render checks, `member.html` now uses the deployed JWT-verified `member-referral-api` as the only referral-summary browser path. The temporary browser RPC fallback has been removed. The opt-in `qa_referral_trace` marker exposes only `EDGE` after success or `UNAVAILABLE` after failure and never exposes a token/account identifier.
- Deployment status: **PASS FOR CURRENT BROWSER/PWA DEPLOYMENT TRACE**
- Runtime merge/deployed SHA: `aa470986589d83dd95b4efd6e4a4d68a9f55965d`.
- GitHub Pages run `33898258213` completed **success** for exact merged-main SHA `aa470986589d83dd95b4efd6e4a4d68a9f55965d`.
- Corresponding main `Kinaraidee Live Smoke Test` run `33898314400` completed **success** for the same deployed runtime lineage.
- Current deployment PASS is scoped to the browser/PWA static deployment trace and live source markers only.
- Historical prior runtime source candidate: `ea409cd02fc7744514b8c867a67f56ec0187de80`; prior verified deployed descendant: `adbb23c4f373ebfe6ed1d78e71ec051a3c05ed7a`, Pages `33838629999`, main Live Smoke `33838665915`. Prior deployment evidence remains historical and is not reused as current PASS.
- Referral-summary physical acceptance is **PASS for the scoped OPPO Reno13 5G / Android 16 / Chrome 152.0.7977.64 signed-in session on 2026-09-04 Asia/Bangkok**. The privacy-safe QA source label was `EDGE`; the referral summary rendered, both aggregate fields rendered as numbers, and Share/Copy controls became enabled. No aggregate values, referral code/link, email, account identifier, token, browser storage/session payload or raw authenticated request/response were retained in evidence.
- `member-referral-api` remains ACTIVE v1 with `verify_jwt=true`; source/deployment parity and missing/malformed-JWT rejection-only smoke remain verified through the prior backend evidence.
- Post-deployment database cutover is complete: migration `referral_summary_edge_cutover_revoke_rpc_20260904` revoked execute on `public.get_my_referral_summary()` from `PUBLIC`, `anon`, and `authenticated` after the Edge-only browser runtime was deployed and live-smoke verified.
- Post-cutover privilege verification: `anon_execute=false`, `authenticated_execute=false` for `get_my_referral_summary()`; raw `member_referral_codes` and `member_referrals` expose no table grants to `anon` or `authenticated`.
- Supabase Security Advisor was rerun after revocation. The former authenticated-callable SECURITY DEFINER warning for `get_my_referral_summary()` is no longer present. The separate `auth_leaked_password_protection` WARN remains OPEN and is not affected by this referral cutover.
- Product Event real-user interaction acceptance, NF-07 physical cache upgrade, the remaining Android/iPhone device matrix, and other open Beta gates are unchanged.
- Issue #177 is closed **completed** for the tested physical Android installed-PWA session: the fresh favorite remained after the user fully closed the installed PWA from Recent Apps and reopened it without clearing data.
- Historical Auth/public-form/Reduced-Motion/Keyboard-Focus physical evidence and Android Favorite/History restart evidence retain only their recorded scope and are not generalized by this referral result.
- Public Beta is still **NOT COMPLETE**

## Evidence boundary

The physical `EDGE` PASS plus completed post-cutover security verification proves only the signed-in referral-summary retrieval/render interaction and retirement of the old browser-executable RPC path for this deployed runtime. It does not prove referral conversion, successful referred signup, Campaign 3,000 eligibility, user growth, paid acquisition, payment, Premium state or revenue.

No synthetic/backend test substitutes for Product Event real-user acceptance or remaining physical-device requirements. Campaign 3,000 remains PRE-LAUNCH. Paid acquisition remains NOT LAUNCHED. Premium is not approved/active. This deployment/security PASS does not prove Public Beta completion, Privacy/Legal approval or Commercial GO.