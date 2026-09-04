# Kinaraidee — Referral Summary Physical Evidence

Status: **NOT VERIFIED / PHYSICAL SIGNED-IN ACCEPTANCE REQUIRED**

Purpose: record only the changed Member referral-summary interaction after the browser starts preferring the authenticated `member-referral-api` boundary. This record must not reopen or repeat already accepted OPPO Auth, TC-11, TC-12 or Reduced Motion flows.

## Runtime under test

- Browser/PWA source candidate: `ea409cd02fc7744514b8c867a67f56ec0187de80`
- PWA cache marker: `kinaraidee-beta-v16`
- Deployment status: **PASS FOR CURRENT BROWSER/PWA DEPLOYMENT TRACE**.
- Merged/deployed main descendant: `adbb23c4f373ebfe6ed1d78e71ec051a3c05ed7a`.
- GitHub Pages run `33838629999`: **success** for the exact merged-main SHA.
- Main `Kinaraidee Live Smoke Test` run `33838665915`: **success** for the same deployed runtime lineage.
- This deployment trace does **not** create physical signed-in acceptance for the changed referral-summary path.
- Backend prerequisite: `member-referral-api` ACTIVE v1 with `verify_jwt=true`; source/deployment parity and missing/malformed-JWT rejection-only smoke are already verified through PR #513.
- Temporary fallback remains intentionally available: `get_my_referral_summary()` is still executable by `authenticated` until a physical session proves the Edge path. Direct browser-role SELECT on raw referral tables remains unavailable.

## Privacy-safe test contract

The test must never record or paste any of the following into GitHub/chat evidence:

- referral code
- referral URL
- email address
- account/user identifier
- access/refresh token
- browser storage/session payload
- raw authenticated request or response body

Permitted evidence fields are limited to device/platform/browser metadata, date/time, the non-sensitive QA source label (`EDGE`, `FALLBACK`, `UNAVAILABLE`), whether the referral summary rendered, whether aggregate count fields rendered as numbers, and whether share/copy controls became enabled.

## Physical interaction to verify

Use a real signed-in Member session against deployed main descendant `adbb23c4f373ebfe6ed1d78e71ec051a3c05ed7a` or a later descendant that preserves the same `member.html` referral-summary runtime.

Open the deployed Member page with the opt-in query parameter `qa_referral_trace=1`. The trace is designed to reveal only the source path and no account/referral identifier.

Record:

- Device manufacturer/model:
- OS/version:
- Browser/version/context:
- Test date/time + timezone:
- Deployed merged SHA:
- Pages run:
- Main Live Smoke run:
- QA source label shown: `EDGE` / `FALLBACK` / `UNAVAILABLE`
- Referral summary rendered without the unavailable message: PASS / FAIL
- Total-referral field rendered as a number: PASS / FAIL
- Confirmed-referral field rendered as a number: PASS / FAIL
- Share button enabled after load: PASS / FAIL
- Copy button enabled after load: PASS / FAIL

Do not record the numeric count values themselves unless a future evidence requirement explicitly needs them; for this acceptance, only numeric rendering is relevant.

## PASS rule

Scoped physical PASS requires all of the following in the same traceable signed-in session:

- deployed runtime lineage is verified through Pages + main Live Smoke
- QA source label is exactly **`EDGE`**
- referral summary renders successfully
- both aggregate fields render as numbers
- share and copy controls become enabled
- no credential/PII/referral identifier is captured in evidence

`FALLBACK` means user-facing continuity worked but the Edge cutover is **NOT PASS**. `UNAVAILABLE` is **FAIL / investigate** for the changed path.

## Security follow-up after physical EDGE PASS

Do **not** execute these steps before the physical PASS rule above is satisfied:

1. remove the temporary browser RPC fallback;
2. revoke/remediate `authenticated` execute access on `get_my_referral_summary()` or retire the function as appropriate;
3. rerun Supabase Security Advisor and verify the authenticated-callable SECURITY DEFINER warning is gone;
4. verify raw referral tables remain unavailable to browser roles;
5. update Issue #511 and canonical release/security evidence from temporary-fallback state to the verified post-cutover state.

The current Advisor warning is therefore intentional/open evidence, not permission to bypass the physical gate.

## Evidence boundary

A scoped PASS here proves only the signed-in referral-summary retrieval/render interaction for the recorded device/session. It does not prove referral conversion, successful referral signup, Campaign 3,000 eligibility, broader Auth lifecycle, leaked-password protection, NF-07, Keyboard Focus, Product Event real-user acceptance, full device matrix, Public Beta completion or Commercial GO.

Pages/Live Smoke, CI, source inspection, Edge rejection smoke and Supabase grant inspection cannot substitute for this physical signed-in acceptance.