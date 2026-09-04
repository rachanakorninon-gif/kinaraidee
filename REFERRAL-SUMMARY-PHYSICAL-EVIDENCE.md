# Kinaraidee — Referral Summary Physical Evidence

Status: **NOT VERIFIED / PHYSICAL SIGNED-IN ACCEPTANCE REQUIRED**

Purpose: record only the changed Member referral-summary interaction after the browser starts preferring the authenticated `member-referral-api` boundary. This record must not reopen or repeat already accepted OPPO Auth, TC-11, TC-12 or Reduced Motion flows.

## Runtime under test

- Browser/PWA source candidate: `ea409cd02fc7744514b8c867a67f56ec0187de80`
- PWA cache marker: `kinaraidee-beta-v16`
- Deployment status at preparation time: **PENDING FOR CURRENT RUNTIME DEPLOYMENT**
- Last verified prior browser/PWA deployment remains PR #509 descendant `75f95dd95b0b480f3cf3ebb668d62f7cb45345ba`; it is not reused as acceptance for this changed path.
- Backend prerequisite: `member-referral-api` ACTIVE v1 with `verify_jwt=true`; source/deployment parity and missing/malformed-JWT rejection-only smoke are already verified through PR #513.

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

Use a real signed-in Member session only after the current candidate has a successful Pages + main Live Smoke deployment trace.

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

- current candidate has verified Pages + main Live Smoke deployment evidence
- QA source label is exactly **`EDGE`**
- referral summary renders successfully
- both aggregate fields render as numbers
- share and copy controls become enabled
- no credential/PII/referral identifier is captured in evidence

`FALLBACK` means user-facing continuity worked but the Edge cutover is **NOT PASS**. `UNAVAILABLE` is **FAIL / investigate** for the changed path.

## Evidence boundary

A scoped PASS here proves only the signed-in referral-summary retrieval/render interaction for the recorded device/session. It does not prove referral conversion, successful referral signup, Campaign 3,000 eligibility, broader Auth lifecycle, leaked-password protection, NF-07, Keyboard Focus, Product Event real-user acceptance, full device matrix, Public Beta completion or Commercial GO.

After scoped `EDGE` PASS is recorded, software work may remove the temporary RPC fallback, revoke/remediate authenticated execute on `get_my_referral_summary()`, rerun Supabase Security Advisor, and update canonical release/security evidence. Those later backend/configuration actions remain separate evidence steps.