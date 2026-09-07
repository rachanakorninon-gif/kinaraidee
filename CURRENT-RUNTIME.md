# Kinaraidee — Current Browser/PWA Runtime

This file is the canonical declaration for the browser/PWA runtime candidate. It is intentionally small so release workflows can validate runtime lineage without rewriting historical evidence.

- Current browser/PWA runtime candidate: `c6d1f0721c8966b13c6028ac361100aaaff261ac`
- PWA cache marker: `kinaraidee-beta-v16`
- Runtime change: TC-03 recommendation-classification remediation for Issue #552. `data/choice-rules.js` now prevents stir-fried curry names matching the `ผัด…แกง` pattern from inheriting the derived `ซุป` preference solely because the name contains the broad keyword `แกง`, while preserving intended soup/stew/curry matches such as ต้ม, ซุป, แกงเขียวหวาน, แกงมัสมั่น, แกงส้ม, ราเมน and related existing soup keywords.
- Deployment status: **PENDING FOR CURRENT RUNTIME DEPLOYMENT**
- Runtime merge/deployed SHA: **PENDING**.
- Last verified deployed browser/PWA descendant: `46136f5ca6322847545289c18233320139147aa2`.
- Current runtime deployment evidence is pending; the Home V3 Pages/live-smoke PASS at `46136f5ca6322847545289c18233320139147aa2` remains historical for this newer source candidate and is not reused as deployment evidence for the TC-03 remediation.
- Physical verification of the Issue #552 recommendation-classification remediation is **PENDING / NOT PASS / NOT FAIL**. The pre-fix OPPO Reno13 5G / Android 16 standalone-PWA session recorded a scoped TC-03 FAIL where selecting `ซุป/ต้ม` recommended `ผัดพริกแกงหมู`; source/static/CI checks cannot replace a deployed physical retest.
- Issue #551 remains a separate **OPEN scoped physical FAIL** for Home V3 bottom-navigation clipping on the recorded OPPO standalone-PWA session. This TC-03 source candidate does not remediate or close #551.
- Physical verification of the Issue #524 Maps fallback remediation remains **PENDING / NOT PASS / NOT FAIL** for the affected traced iPhone 15 Pro Max scope. A separate iPhone 17 Pro Max / iOS 26.6 session observed Maps fallback success, which is scoped NON-REPRO evidence only and does not close #524.
- Physical verification of the Issue #545 location-deny remediation remains **PENDING / NOT PASS / NOT FAIL**. The pre-fix iPhone 17 Pro Max / iOS 26.6 session showed a success-style location state after Safari Websites Location was changed to Never; source/static/deployment checks cannot replace a deployed deny-path retest.
- Historical Home V3 source candidate: `6eac2ce642a907414260518d0435263b3e54f425`; its verified deployed descendant is `46136f5ca6322847545289c18233320139147aa2` with Pages `34087987096`, main Live Smoke `34088055637`, Auth Password Security Live Smoke `34088055663`, and Campaign 3000 Premium Live Smoke `34088055657`. That evidence remains historical and is not promoted to the newer TC-03 source candidate.
- Prior verified deployment evidence remains historical and is not reused as current PASS.
- The password-recovery initialization fix in the verified deployed runtime lineage retains only its separately recorded physical evidence scope and is not generalized by this TC-03 remediation.
- Historical referral-summary physical acceptance remains **PASS for the scoped OPPO Reno13 5G / Android 16 / Chrome 152.0.7977.64 signed-in session on 2026-09-04 Asia/Bangkok**. The privacy-safe QA source label was `EDGE`; the referral summary rendered, both aggregate fields rendered as numbers, and Share/Copy controls became enabled. No aggregate values, referral code/link, email, account identifier, token, browser storage/session payload or raw authenticated request/response were retained in evidence.
- `member-referral-api` remains ACTIVE v1 with `verify_jwt=true`; source/deployment parity and missing/malformed-JWT rejection-only smoke remain verified through the prior backend evidence.
- Post-deployment database cutover remains complete: migration `referral_summary_edge_cutover_revoke_rpc_20260904` revoked execute on `public.get_my_referral_summary()` from `PUBLIC`, `anon`, and `authenticated` after the Edge-only browser runtime was deployed and live-smoke verified.
- Post-cutover privilege verification remains historical verified evidence: `anon_execute=false`, `authenticated_execute=false` for `get_my_referral_summary()`; raw `member_referral_codes` and `member_referrals` expose no table grants to `anon` or `authenticated`.
- Supabase Security Advisor was rerun after the referral revocation. The former authenticated-callable SECURITY DEFINER warning for `get_my_referral_summary()` was no longer present. The separate `auth_leaked_password_protection` WARN remains OPEN and is not affected by this recommendation-classification change.
- NF-07 has a scoped physical v15→v16 PASS on OPPO Reno13 5G / Android 16 / Chrome 152.0.7977.64, and Product Event has a separate scoped physical QA PASS on that same recorded device. Those accepted sessions remain scoped; Product Event real-user traction/acceptance, the remaining device matrix, and other open Beta gates are unchanged by this runtime candidate.
- Issue #177 is closed **completed** for the tested physical Android installed-PWA session: the fresh favorite remained after the user fully closed the installed PWA from Recent Apps and reopened it without clearing data.
- Historical Auth/public-form/Reduced-Motion/Keyboard-Focus/VoiceOver and Favorite/History evidence retain only their recorded scope and are not generalized by this recommendation-classification change.
- Public Beta is still **NOT COMPLETE**

## Evidence boundary

This runtime candidate has source-side remediation only. Current runtime deployment evidence is pending. The focused choice-rules regression can establish only the source classification contract: it must not be relabeled as deployed TC-03 PASS or physical-device PASS. Issue #552 requires the remediated runtime to be merged, deployed and physically retested before its recorded failure can be accepted as fixed. Issue #551 remains open independently.

Historical referral/security/device evidence remains valid only for its recorded scope. No synthetic/backend/static/deployment test substitutes for remaining physical-device requirements, Product Event real-user acceptance, or Commercial evidence. Campaign 3,000 remains PRE-LAUNCH. Paid acquisition remains NOT LAUNCHED. Premium is not approved/active. This source remediation does not prove Public Beta completion, Privacy/Legal approval or Commercial GO.
