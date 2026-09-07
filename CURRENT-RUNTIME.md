# Kinaraidee — Current Browser/PWA Runtime

This file is the canonical declaration for the browser/PWA runtime candidate. It is intentionally small so release workflows can validate runtime lineage without rewriting historical evidence.

- Current browser/PWA runtime candidate: `6eac2ce642a907414260518d0435263b3e54f425`
- PWA cache marker: `kinaraidee-beta-v16`
- Runtime change: Home V3 presentation treatment on the existing Kinaraidee home shell. The implementation preserves the existing recommendation flow, instant “ไม่รู้เลย” behavior, group/member/history/stats entries, Supabase/Auth logic, location behavior, history persistence, service-worker code, accessibility focus contract, and reduced-motion contract. The change is limited to presentation-layer styling/decorative home composition in `data/home-surprise.js`; the decorative food orbit is hidden from accessibility APIs.
- Deployment status: **PENDING FOR CURRENT RUNTIME DEPLOYMENT**
- Runtime merge/deployed SHA: **PENDING**.
- Last verified deployed browser/PWA descendant: `a6db511e0bbd6be9038bbc63a06fb5e1702006d3`.
- Last verified deployed browser/PWA trace: GitHub Pages `34013867862`, main Live Smoke `34013888880`, and Auth Password Security Live Smoke `34013888842`, all successful for exact merged-main SHA `a6db511e0bbd6be9038bbc63a06fb5e1702006d3`.
- Current runtime deployment evidence is pending; the prior Nearby deployment trace is retained only as the last verified deployed runtime and is not reused as current PASS for this Home V3 candidate.
- Prior verified deployment evidence remains historical and is not reused as current PASS.
- Physical verification of the Issue #524 Maps fallback remediation remains **PENDING / NOT PASS / NOT FAIL** for the affected traced iPhone 15 Pro Max scope. A separate iPhone 17 Pro Max / iOS 26.6 session observed Maps fallback success, which is scoped NON-REPRO evidence only and does not close #524.
- Physical verification of the Issue #545 location-deny remediation remains **PENDING / NOT PASS / NOT FAIL**. The pre-fix iPhone 17 Pro Max / iOS 26.6 session showed a success-style location state after Safari Websites Location was changed to Never; source/static checks cannot replace a deployed deny-path retest.
- Historical prior runtime source candidate: `e0523e6cab49b09e910ba66f2ad18351f491d19a`; its verified deployed descendant is `a6db511e0bbd6be9038bbc63a06fb5e1702006d3` with the scoped deployment/live-smoke trace above, but that evidence is not promoted to current PASS by this UI candidate.
- The password-recovery initialization fix in the last verified deployed runtime retains only its separately recorded physical evidence scope and is not generalized by this UI change.
- Historical referral-summary physical acceptance remains **PASS for the scoped OPPO Reno13 5G / Android 16 / Chrome 152.0.7977.64 signed-in session on 2026-09-04 Asia/Bangkok**. The privacy-safe QA source label was `EDGE`; the referral summary rendered, both aggregate fields rendered as numbers, and Share/Copy controls became enabled. No aggregate values, referral code/link, email, account identifier, token, browser storage/session payload or raw authenticated request/response were retained in evidence.
- `member-referral-api` remains ACTIVE v1 with `verify_jwt=true`; source/deployment parity and missing/malformed-JWT rejection-only smoke remain verified through the prior backend evidence.
- Post-deployment database cutover remains complete: migration `referral_summary_edge_cutover_revoke_rpc_20260904` revoked execute on `public.get_my_referral_summary()` from `PUBLIC`, `anon`, and `authenticated` after the Edge-only browser runtime was deployed and live-smoke verified.
- Post-cutover privilege verification remains historical verified evidence: `anon_execute=false`, `authenticated_execute=false` for `get_my_referral_summary()`; raw `member_referral_codes` and `member_referrals` expose no table grants to `anon` or `authenticated`.
- Supabase Security Advisor was rerun after the referral revocation. The former authenticated-callable SECURITY DEFINER warning for `get_my_referral_summary()` was no longer present. The separate `auth_leaked_password_protection` WARN remains OPEN and is not affected by this UI change.
- NF-07 has a scoped physical v15→v16 PASS on OPPO Reno13 5G / Android 16 / Chrome 152.0.7977.64, and Product Event has a separate scoped physical QA PASS on that same recorded device. Those accepted sessions remain scoped; Product Event real-user traction/acceptance, the remaining device matrix, and other open Beta gates are unchanged by this runtime candidate.
- Issue #177 is closed **completed** for the tested physical Android installed-PWA session: the fresh favorite remained after the user fully closed the installed PWA from Recent Apps and reopened it without clearing data.
- Historical Auth/public-form/Reduced-Motion/Keyboard-Focus/VoiceOver and Favorite/History evidence retain only their recorded scope and are not generalized by this UI change.
- Public Beta is still **NOT COMPLETE**

## Evidence boundary

This runtime candidate contains a presentation-layer home-screen change plus the previously inherited runtime behavior. Current deployment evidence for this candidate is pending. Source/CI success can establish structural compatibility only; it does not establish deployed visual acceptance, physical-device acceptance, or Public Beta completion. The V3 preview/reference and automated checks must not be relabeled as user preference, conversion improvement, or real-device PASS.

Historical referral/security/device evidence remains valid only for its recorded scope. No synthetic/backend/static test substitutes for remaining physical-device requirements, Product Event real-user acceptance, or Commercial evidence. Campaign 3,000 remains PRE-LAUNCH. Paid acquisition remains NOT LAUNCHED. Premium is not approved/active. This UI change does not prove Public Beta completion, Privacy/Legal approval or Commercial GO.