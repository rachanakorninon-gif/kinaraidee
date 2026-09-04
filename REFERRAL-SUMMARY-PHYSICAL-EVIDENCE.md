# Kinaraidee — Referral Summary Physical Evidence

Status: **PASS — PHYSICAL SIGNED-IN EDGE ACCEPTED / POST-CUTOVER SECURITY FOLLOW-UP PENDING**

Purpose: canonical physical evidence for the changed signed-in Member referral-summary interaction. This record does not reopen or repeat already accepted OPPO Auth, TC-11, TC-12 or Reduced Motion flows.

## Accepted deployed runtime

- Browser/PWA source candidate exercised physically: `ea409cd02fc7744514b8c867a67f56ec0187de80`
- PWA cache marker: `kinaraidee-beta-v16`
- Merged/deployed main descendant: `adbb23c4f373ebfe6ed1d78e71ec051a3c05ed7a`
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

## Ordered post-acceptance security cutover

Physical acceptance permits the old fallback to be removed, but security follow-up is not complete until the ordered deployment/revocation verification finishes.

1. **SOURCE PREPARED:** browser source candidate `4e2e1789921aa6fd73b2677ac5def2bc35a8be73` removes the `get_my_referral_summary()` browser RPC fallback and retains only `member-referral-api` with privacy-safe `EDGE`/`UNAVAILABLE` QA trace states.
2. **PENDING:** deploy that Edge-only browser source and obtain fresh Pages + corresponding main Live Smoke evidence.
3. **PENDING UNTIL STEP 2:** revoke browser-role execute access on `public.get_my_referral_summary()`; do not revoke before the Edge-only browser runtime is live.
4. **PENDING:** rerun Supabase Security Advisor and verify the authenticated-callable SECURITY DEFINER warning for `get_my_referral_summary()` is gone.
5. **PENDING:** verify raw referral tables remain unavailable to `anon` and `authenticated` and verify the old RPC is not executable by those browser roles.
6. **PENDING:** sync Issue #511 and canonical release/security evidence to the completed post-cutover state.

The current Advisor warning is therefore an expected transitional state after physical acceptance and before the ordered runtime deployment + RPC privilege revocation.

## Evidence boundary

This PASS proves only the signed-in referral-summary retrieval/render interaction for the recorded device/session. It does not prove referral conversion, successful referred signup, Campaign 3,000 eligibility, user growth, broader Auth lifecycle, leaked-password protection, NF-07, Keyboard Focus on other platforms, Product Event real-user acceptance, the full device matrix, Public Beta completion or Commercial GO.

Pages/Live Smoke, CI, source inspection, Edge rejection smoke and Supabase grant inspection cannot substitute for this physical acceptance; conversely, this physical PASS does not substitute for the ordered post-cutover deployment and security verification.