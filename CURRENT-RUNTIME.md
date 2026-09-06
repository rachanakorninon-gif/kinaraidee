# Kinaraidee — Current Browser/PWA Runtime

This file is the canonical declaration for the browser/PWA runtime candidate. It is intentionally small so release workflows can validate runtime lineage without rewriting historical evidence.

- Current browser/PWA runtime candidate: `e0523e6cab49b09e910ba66f2ad18351f491d19a`
- PWA cache marker: `kinaraidee-beta-v16`
- Runtime change: Nearby iOS remediation for Issues #524 and #545. The Google Maps fallback keeps the natural nearby query (`<menu> ใกล้ฉัน`) without raw numeric coordinates in the external free-text query, and the explicit `ใช้ตำแหน่งปัจจุบัน` action now clears in-memory coordinates before requesting geolocation with `maximumAge:0` so a prior cached coordinate is not accepted as a fresh location result after permission/state changes. Partner search and privacy-scoped demand/search tracking contracts remain unchanged.
- Deployment status: **PENDING FOR CURRENT RUNTIME DEPLOYMENT**
- Runtime merge/deployed SHA: **PENDING**.
- Last verified deployed browser/PWA descendant: `d7dd3a550b9a0d583cd7f3269a357b0187377d50`.
- Current runtime deployment evidence is pending; no current deployed SHA or live-smoke PASS is claimed for this candidate.
- Physical verification of the Issue #524 Maps fallback remediation remains **PENDING / NOT PASS / NOT FAIL** for the affected traced iPhone 15 Pro Max scope. A separate iPhone 17 Pro Max / iOS 26.6 session observed Maps fallback success, which is scoped NON-REPRO evidence only and does not close #524.
- Physical verification of the Issue #545 location-deny remediation remains **PENDING / NOT PASS / NOT FAIL**. The pre-fix iPhone 17 Pro Max / iOS 26.6 session showed a success-style location state after Safari Websites Location was changed to Never; source/static checks cannot replace a deployed deny-path retest.
- Historical prior runtime source candidate: `f7783199ba9bbcfae6bbfe18f01006123b7f1b4b`; merge descendant: `ab8a6cfbe747a48f16afe977cb6418acd1d02697`. Deployment/live-smoke verification for that short-lived candidate was not promoted to current PASS before this newer source candidate was prepared.
- Prior verified deployment evidence remains historical and is not reused as current PASS.
- The password-recovery initialization fix in the last verified deployed runtime retains only its separately recorded physical evidence scope and is not generalized by these Nearby remediations.
- Historical referral-summary physical acceptance remains **PASS for the scoped OPPO Reno13 5G / Android 16 / Chrome 152.0.7977.64 signed-in session on 2026-09-04 Asia/Bangkok**. The privacy-safe QA source label was `EDGE`; the referral summary rendered, both aggregate fields rendered as numbers, and Share/Copy controls became enabled. No aggregate values, referral code/link, email, account identifier, token, browser storage/session payload or raw authenticated request/response were retained in evidence.
- `member-referral-api` remains ACTIVE v1 with `verify_jwt=true`; source/deployment parity and missing/malformed-JWT rejection-only smoke remain verified through the prior backend evidence.
- Post-deployment database cutover remains complete: migration `referral_summary_edge_cutover_revoke_rpc_20260904` revoked execute on `public.get_my_referral_summary()` from `PUBLIC`, `anon`, and `authenticated` after the Edge-only browser runtime was deployed and live-smoke verified.
- Post-cutover privilege verification remains historical verified evidence: `anon_execute=false`, `authenticated_execute=false` for `get_my_referral_summary()`; raw `member_referral_codes` and `member_referrals` expose no table grants to `anon` or `authenticated`.
- Supabase Security Advisor was rerun after the referral revocation. The former authenticated-callable SECURITY DEFINER warning for `get_my_referral_summary()` was no longer present. The separate `auth_leaked_password_protection` WARN remains OPEN and is not affected by these Nearby source remediations.
- NF-07 has a scoped physical v15→v16 PASS on OPPO Reno13 5G / Android 16 / Chrome 152.0.7977.64, and Product Event has a separate scoped physical QA PASS on that same recorded device. Those accepted sessions remain scoped; Product Event real-user traction/acceptance, the remaining device matrix, and other open Beta gates are unchanged by this runtime candidate.
- Issue #177 is closed **completed** for the tested physical Android installed-PWA session: the fresh favorite remained after the user fully closed the installed PWA from Recent Apps and reopened it without clearing data.
- Historical Auth/public-form/Reduced-Motion/Keyboard-Focus/VoiceOver and Favorite/History evidence retain only their recorded scope and are not generalized by these Nearby remediations.
- Public Beta is still **NOT COMPLETE**

## Evidence boundary

This runtime candidate has source-side remediation only. Current runtime deployment evidence is pending. Deployment trace, live smoke and physical retests for Issues #524/#545 are all still **PENDING**. The new static guard requiring `maximumAge:0` proves only the source contract and must not be relabeled as TC-09 physical PASS.

Historical referral/security/device evidence remains valid only for its recorded scope. No synthetic/backend/static test substitutes for remaining physical-device requirements, Product Event real-user acceptance, or Commercial evidence. Campaign 3,000 remains PRE-LAUNCH. Paid acquisition remains NOT LAUNCHED. Premium is not approved/active. These source remediations do not prove Public Beta completion, Privacy/Legal approval or Commercial GO.