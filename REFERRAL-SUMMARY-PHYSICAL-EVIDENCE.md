# Kinaraidee — Referral Summary Physical Evidence

Status: **PASS — PHYSICAL SIGNED-IN EDGE ACCEPTED / POST-CUTOVER SECURITY FOLLOW-UP VERIFIED**

Purpose: canonical physical evidence for the changed signed-in Member referral-summary interaction and the ordered security follow-up performed only after the Edge-only browser runtime was deployed successfully. This record does not reopen or repeat already accepted OPPO Auth, TC-11, TC-12 or Reduced Motion flows.

## Accepted physical runtime

- Browser/PWA source candidate exercised physically: `ea409cd02fc7744514b8c867a67f56ec0187de80`
- PWA cache marker: `kinaraidee-beta-v16`
- Merged/deployed main descendant exercised in the physical acceptance session: `adbb23c4f373ebfe6ed1d78e71ec051a3c05ed7a`
- GitHub Pages run `33838629999`: **success**
- Main `Kinaraidee Live Smoke Test` run `33838665915`: **success**
- Backend prerequisite: `member-referral-api` ACTIVE v1 with `verify_jwt=true`; source/deployment parity and missing/malformed-JWT rejection-only smoke were already verified through PR #513.

## Privacy-safe physical session

- Device manufacturer/model: OPPO Reno13 5G
- OS/version: Android 16
- Browser/version/context: Google Chrome 152.0.7977.64, normal browser tab
- Test date/time + timezone: 2026-09-04 23:40–23:45 Asia/Bangkok
- Session reference: `referral-edge-session-20260904-oppo-chrome`
- Evidence location/reference: this canonical record plus the same physical QA conversation; Issue #511 is the security/cutover tracker
- QA source label shown: **`EDGE`**
- Referral summary rendered without an unavailable message: **PASS**
- Total-referral field rendered as a number: **PASS**
- Confirmed-referral field rendered as a number: **PASS**
- Share button enabled after load: **PASS**
- Copy button enabled after load: **PASS**

No numeric aggregate values were retained. No referral code, referral URL, email address, account/user identifier, access/refresh token, browser storage/session payload, or raw authenticated request/response body was retained in repository/chat evidence.

## PASS rule and result

The same traceable signed-in physical session satisfied every acceptance requirement:

- the exercised browser runtime had a verified Pages + main Live Smoke deployment trace;
- the privacy-safe QA source label was exactly **`EDGE`**;
- the referral summary rendered successfully;
- both aggregate fields rendered as numbers;
- Share and Copy controls became enabled;
- no credential, PII, account identifier, referral identifier, token, or raw authenticated payload was captured in evidence.

Result: **SCOPED PHYSICAL PASS** for the signed-in referral-summary Edge retrieval/render interaction on the recorded OPPO / Android / Chrome session.

## Ordered post-acceptance security cutover — VERIFIED

The old browser fallback was retired only after physical acceptance, and database execute access was revoked only after the replacement browser path had fresh successful deployment evidence.

1. **SOURCE COMPLETE:** browser source candidate `4e2e1789921aa6fd73b2677ac5def2bc35a8be73` removes the `get_my_referral_summary()` browser RPC fallback and retains only `member-referral-api` with privacy-safe `EDGE`/`UNAVAILABLE` QA trace states.
2. **DEPLOYMENT VERIFIED:** PR #520 merged as `aa470986589d83dd95b4efd6e4a4d68a9f55965d`; GitHub Pages run `33898258213` = **success** and corresponding main Live Smoke `33898314400` = **success** for the same deployed runtime lineage.
3. **RPC EXECUTE REVOKED:** Supabase migration `referral_summary_edge_cutover_revoke_rpc_20260904` revoked execute on `public.get_my_referral_summary()` from `PUBLIC`, `anon`, and `authenticated` after step 2 completed.
4. **FUNCTION PRIVILEGES VERIFIED:** post-migration read-only check reported `anon_execute=false` and `authenticated_execute=false` for `get_my_referral_summary()`.
5. **RAW TABLE BOUNDARY VERIFIED:** post-migration read-only grant inspection returned no `anon`/`authenticated` table grants for `member_referral_codes` or `member_referrals`.
6. **SECURITY ADVISOR VERIFIED:** the post-migration Security Advisor no longer reports the former authenticated-callable SECURITY DEFINER warning for `get_my_referral_summary()`. The separate `auth_leaked_password_protection` WARN remains OPEN and is not part of this PASS.

The function may remain defined as `SECURITY DEFINER` for historical/rollback purposes, but it is no longer executable by browser/public roles. The rollback companion in the repository is emergency-only and must be paired with an intentional browser runtime rollback that restores the caller-scoped fallback; it is not part of normal operation.

## Evidence boundary

This PASS proves only the signed-in referral-summary retrieval/render interaction for the recorded physical session and completion of the ordered Edge-only browser/RPC-privilege cutover. It does not prove referral conversion, successful referred signup, Campaign 3,000 eligibility, user growth, broader Auth lifecycle, leaked-password protection, NF-07, Keyboard Focus on other platforms, Product Event real-user acceptance, the full device matrix, Public Beta completion or Commercial GO.

Pages/Live Smoke, CI, source inspection, Edge rejection smoke and Supabase grant inspection cannot substitute for the physical acceptance; conversely, the physical PASS alone did not substitute for the post-cutover deployment and security verification, which are recorded separately above.