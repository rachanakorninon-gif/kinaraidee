# Kinaraidee — Current Browser/PWA Runtime

This file is the canonical declaration for the browser/PWA runtime candidate. It is intentionally small so release workflows can validate runtime lineage without rewriting historical evidence.

- Current browser/PWA runtime candidate: `35cdf74b1c845ba61e46b86ec9e3c0e16e16eb72`
- PWA cache marker: `kinaraidee-beta-v16`
- Runtime change: password-recovery initialization ordering fix. `reset-password.html` now waits for the recovery URL/session initialization promise to finish before checking `sb.auth.getSession()` in the save action, preventing the save path from classifying the recovery session as missing while `exchangeCodeForSession` / recovery-session setup is still in progress.
- Deployment status: **PENDING FOR CURRENT RUNTIME DEPLOYMENT**
- Last verified deployed browser/PWA descendant: `aa470986589d83dd95b4efd6e4a4d68a9f55965d`.
- Current runtime deployment evidence is pending. This candidate must pass protected PR checks, merge through `main`, deploy through the normal Pages path, and receive deployment/live-smoke verification before it can be promoted to a deployment PASS.
- Physical verification of this fix is also pending. The first observed Android recovery attempt reached the reset page but reported missing recovery authorization; a fresh recovery attempt then completed and the new password authenticated while the old password no longer did. This fix addresses the source-level initialization race but is not physically verified until a deployed retest confirms the erroneous first-attempt state no longer occurs.
- Historical prior runtime source candidate: `4e2e1789921aa6fd73b2677ac5def2bc35a8be73`; verified deployed descendant: `aa470986589d83dd95b4efd6e4a4d68a9f55965d`, Pages `33898258213`, main Live Smoke `33898314400`.
- Prior verified deployment evidence remains historical and is not reused as current PASS.
- Historical referral-summary physical acceptance remains **PASS for the scoped OPPO Reno13 5G / Android 16 / Chrome 152.0.7977.64 signed-in session on 2026-09-04 Asia/Bangkok**. The privacy-safe QA source label was `EDGE`; the referral summary rendered, both aggregate fields rendered as numbers, and Share/Copy controls became enabled. No aggregate values, referral code/link, email, account identifier, token, browser storage/session payload or raw authenticated request/response were retained in evidence.
- `member-referral-api` remains ACTIVE v1 with `verify_jwt=true`; source/deployment parity and missing/malformed-JWT rejection-only smoke remain verified through the prior backend evidence.
- Post-deployment database cutover remains complete: migration `referral_summary_edge_cutover_revoke_rpc_20260904` revoked execute on `public.get_my_referral_summary()` from `PUBLIC`, `anon`, and `authenticated` after the Edge-only browser runtime was deployed and live-smoke verified.
- Post-cutover privilege verification remains historical verified evidence: `anon_execute=false`, `authenticated_execute=false` for `get_my_referral_summary()`; raw `member_referral_codes` and `member_referrals` expose no table grants to `anon` or `authenticated`.
- Supabase Security Advisor was rerun after the referral revocation. The former authenticated-callable SECURITY DEFINER warning for `get_my_referral_summary()` was no longer present. The separate `auth_leaked_password_protection` WARN remains OPEN and is not affected by this password-recovery UI fix.
- NF-07 has a scoped physical v15→v16 PASS on OPPO Reno13 5G / Android 16 / Chrome 152.0.7977.64, and Product Event has a separate scoped physical QA PASS on that same recorded device. Those accepted sessions remain scoped; Product Event real-user traction/acceptance, the remaining device matrix, and other open Beta gates are unchanged by this runtime candidate.
- Issue #177 is closed **completed** for the tested physical Android installed-PWA session: the fresh favorite remained after the user fully closed the installed PWA from Recent Apps and reopened it without clearing data.
- Historical Auth/public-form/Reduced-Motion/Keyboard-Focus physical evidence and Android Favorite/History restart evidence retain only their recorded scope and are not generalized by this password-recovery fix.
- Public Beta is still **NOT COMPLETE**

## Evidence boundary

This candidate is implementation/static-regression evidence only until protected CI, merge, deployment trace, live-smoke verification, and the scoped physical recovery retest are complete. It does not convert the earlier reset failure into a clean physical PASS and does not expand any device-matrix result.

Historical referral/security evidence remains valid only for its recorded scope. No synthetic/backend/static test substitutes for remaining physical-device requirements, Product Event real-user acceptance, or Commercial evidence. Campaign 3,000 remains PRE-LAUNCH. Paid acquisition remains NOT LAUNCHED. Premium is not approved/active. This pending runtime does not prove Public Beta completion, Privacy/Legal approval or Commercial GO.