# Kinaraidee — Current Browser/PWA Runtime

This file is the canonical declaration for the browser/PWA runtime candidate. It is intentionally small so release workflows can validate runtime lineage without rewriting historical evidence.

- Current browser/PWA runtime candidate: `f7783199ba9bbcfae6bbfe18f01006123b7f1b4b`
- PWA cache marker: `kinaraidee-beta-v16`
- Runtime change: Google Maps fallback query remediation for Issue #524. `data/nearby-restaurants.js` no longer embeds raw numeric latitude/longitude in the Google Maps free-text `query` parameter and instead opens a natural nearby query (`<menu> ใกล้ฉัน`). Kinaraidee partner search and privacy-scoped demand/search tracking continue to receive the existing location coordinates unchanged.
- Deployment status: **PENDING FOR CURRENT RUNTIME DEPLOYMENT**
- Runtime merge/deployed SHA: **PENDING**.
- Last verified deployed browser/PWA descendant: `d7dd3a550b9a0d583cd7f3269a357b0187377d50`.
- Current runtime deployment evidence is pending; no current deployed SHA or live-smoke PASS is claimed for this candidate.
- Physical verification of the Issue #524 Maps fallback remediation: **PENDING / NOT PASS / NOT FAIL**. Issue #524 records the pre-fix real-device iPhone 15 Pro Max / iOS 26.6.1 Safari regression; this source candidate must be deployed and physically retested before that issue can be accepted as fixed.
- Historical prior runtime source candidate: `35cdf74b1c845ba61e46b86ec9e3c0e16e16eb72`; verified deployed descendant: `d7dd3a550b9a0d583cd7f3269a357b0187377d50`, Pages `33975327442`, main Live Smoke `33975353656`, Auth Password Security Live Smoke `33975353718`.
- Prior verified deployment evidence remains historical and is not reused as current PASS.
- The password-recovery initialization fix in that historical deployed runtime retains only its separately recorded physical evidence scope and is not generalized by this Maps fallback remediation.
- Historical referral-summary physical acceptance remains **PASS for the scoped OPPO Reno13 5G / Android 16 / Chrome 152.0.7977.64 signed-in session on 2026-09-04 Asia/Bangkok**. The privacy-safe QA source label was `EDGE`; the referral summary rendered, both aggregate fields rendered as numbers, and Share/Copy controls became enabled. No aggregate values, referral code/link, email, account identifier, token, browser storage/session payload or raw authenticated request/response were retained in evidence.
- `member-referral-api` remains ACTIVE v1 with `verify_jwt=true`; source/deployment parity and missing/malformed-JWT rejection-only smoke remain verified through the prior backend evidence.
- Post-deployment database cutover remains complete: migration `referral_summary_edge_cutover_revoke_rpc_20260904` revoked execute on `public.get_my_referral_summary()` from `PUBLIC`, `anon`, and `authenticated` after the Edge-only browser runtime was deployed and live-smoke verified.
- Post-cutover privilege verification remains historical verified evidence: `anon_execute=false`, `authenticated_execute=false` for `get_my_referral_summary()`; raw `member_referral_codes` and `member_referrals` expose no table grants to `anon` or `authenticated`.
- Supabase Security Advisor was rerun after the referral revocation. The former authenticated-callable SECURITY DEFINER warning for `get_my_referral_summary()` was no longer present. The separate `auth_leaked_password_protection` WARN remains OPEN and is not affected by this Maps fallback source remediation.
- NF-07 has a scoped physical v15→v16 PASS on OPPO Reno13 5G / Android 16 / Chrome 152.0.7977.64, and Product Event has a separate scoped physical QA PASS on that same recorded device. Those accepted sessions remain scoped; Product Event real-user traction/acceptance, the remaining device matrix, and other open Beta gates are unchanged by this runtime candidate.
- Issue #177 is closed **completed** for the tested physical Android installed-PWA session: the fresh favorite remained after the user fully closed the installed PWA from Recent Apps and reopened it without clearing data.
- Historical Auth/public-form/Reduced-Motion/Keyboard-Focus physical evidence and Android Favorite/History restart evidence retain only their recorded scope and are not generalized by this Maps fallback remediation.
- Public Beta is still **NOT COMPLETE**

## Evidence boundary

This runtime candidate has source-side remediation only. Current runtime deployment evidence is pending. Deployment trace, live smoke and physical retest for the Issue #524 Maps fallback change are all still **PENDING**. No CI/static/source result may be substituted for the required deployed physical-device retest.

Historical referral/security/device evidence remains valid only for its recorded scope. No synthetic/backend/static test substitutes for remaining physical-device requirements, Product Event real-user acceptance, or Commercial evidence. Campaign 3,000 remains PRE-LAUNCH. Paid acquisition remains NOT LAUNCHED. Premium is not approved/active. This source remediation does not prove Public Beta completion, Privacy/Legal approval or Commercial GO.