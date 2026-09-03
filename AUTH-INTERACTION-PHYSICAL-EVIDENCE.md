# Auth Interaction — Physical Evidence

Status: **PARTIAL PASS — RECOVERY REQUEST/MAIL-SEND/VERIFY-LINK + PASSWORD UPDATE + SIGN-IN VERIFIED / SIGNUP + LEAKED-PASSWORD REJECTION NOT VERIFIED**

Purpose: record only the real-device Auth interactions actually observed for the current PR #373 browser/PWA runtime UX, with privacy-preserving backend corroboration where available. This evidence is intentionally split by path so one observed success cannot be promoted into a blanket Auth/Security PASS.

## Session metadata

- Device / model: OPPO Reno13 5G (CPH2689)
- OS / version: Android 16 / ColorOS 16.0.5
- Browser context / version: Google Chrome 152.0.7977.64, normal browser tab
- Test date: 2026-09-03/04 Asia/Bangkok QA session
- Physical screenshot interaction clock time: NOT CAPTURED for the Auth screenshots
- Backend corroboration window: 2026-09-03 23:05–23:12 Asia/Bangkok (2026-09-03 16:05–16:12 UTC)
- Tester/session: owner-operated physical QA session
- Evidence location: physical screenshots captured in the QA conversation for this same OPPO/Chrome test session plus read-only Supabase Auth logs for the same recovery/update/sign-in sequence
- Current browser/PWA runtime candidate under acceptance: PR #373 / `6cd98bf2a2020b86fe2ab05e263dd59f7e4fb387`
- Verified deployed descendant for the PR #373 browser/PWA runtime: `0cc3ec3ef4dda18f0d8e083d8ca0992ef77f844c`
- PWA cache marker: `kinaraidee-beta-v16`

Sensitive account identifiers, email addresses, IP addresses, request IDs, reset tokens and password values are intentionally not stored in repository evidence.

## Backend corroboration summary

Read-only Supabase Auth logs for the tested recovery sequence show, without retaining account-identifying fields in this evidence file:

- 2026-09-03 23:05:16 Asia/Bangkok: recovery request accepted (`POST /recover`, HTTP 200) and a recovery `mail.send` event emitted;
- 2026-09-03 23:06:22 Asia/Bangkok: the recovery verification link was exercised successfully (`GET /verify`, HTTP 303) and established the recovery/login context used by the deployed reset-password page;
- 2026-09-03 23:09:41 Asia/Bangkok: authenticated user modification completed (`PUT /user`, HTTP 200), corroborating the observed replacement-password update;
- 2026-09-03 23:12:04 Asia/Bangkok: password-grant sign-in completed (`POST /token`, HTTP 200), corroborating the observed sign-in with the newly set password.

These server logs corroborate the physical flow. They do not replace physical interaction evidence, do not prove every email provider delivery path, and do not establish leaked-password protection.

## Path results

### Recovery request / recovery mail / verification-link path

Result: **PASS — SCOPED TESTED RECOVERY PATH**

Observed/corroborated sequence:

- a recovery request was accepted by Supabase Auth;
- Supabase emitted a recovery `mail.send` event;
- the recovery verification link was subsequently exercised successfully and reached the deployed Kinaraidee reset-password flow.

Boundary:

- this proves the tested recovery request → mail-send event → verification-link path completed for this QA account/session;
- it does not establish a general email-delivery SLA, delivery for every provider/account, or inbox placement quality;
- no email address, token or provider mailbox content is retained in repository evidence.

### Replacement-password update

Result: **PASS — SCOPED PHYSICAL INTERACTION + BACKEND CORROBORATION**

Observed/corroborated sequence:

- the password-reset/recovery session reached the deployed Kinaraidee replacement-password page;
- a replacement password was entered and submitted;
- the UI completed the update path and returned to the member/account flow rather than remaining stuck in an error or loading state;
- the corresponding authenticated user-modification request completed with HTTP 200 in Supabase Auth logs.

Boundary:

- this proves the tested replacement-password update interaction completed on the traced Android Chrome session;
- it does **not** prove leaked-password protection is enabled or that any weak/leaked password was rejected.

### Sign-in using the new password

Result: **PASS — SCOPED PHYSICAL INTERACTION + BACKEND CORROBORATION**

Observed/corroborated sequence:

- after the replacement-password update, the member sign-in flow was opened;
- the tested account signed in successfully using the newly set password;
- the member/account state was reached successfully on the same physical Android Chrome QA session;
- Supabase Auth logs show a successful password-grant token request with HTTP 200 for the corresponding sign-in sequence.

Boundary:

- this proves the tested sign-in-after-reset interaction completed;
- it does not prove signup acceptance, every login failure path, session persistence across all devices, or full Auth lifecycle acceptance.

### Signup with an acceptable password

Result: **NOT VERIFIED**

No qualifying physical signup interaction is recorded in this evidence set.

### Weak/leaked-password rejection

Result: **NOT VERIFIED / SERVER-SIDE BLOCKER REMAINS OPEN**

Supabase leaked-password protection remains blocked by the verified Free-plan/configuration constraint tracked in Issue #372. The deployed PR #373 browser UX recognizes weak-password errors, but source/deployment behavior and the successful recovery flow cannot be used as proof that the production Auth service rejected a weak/leaked password.

## Acceptance impact

This evidence closes these scoped interaction sub-results for the traced OPPO Android Chrome session:

- recovery request / recovery mail-send / verification-link path: PASS for the tested QA sequence;
- replacement-password update interaction: PASS;
- sign-in with the newly set password: PASS.

The umbrella current PR #373 Auth acceptance remains **PARTIAL / OPEN**. Signup with an acceptable password is still unverified. Weak/leaked-password rejection remains a separate server-side security blocker and must not be inferred from this recovery/sign-in evidence.

This partial PASS does not establish Public Beta completion, full device-matrix PASS, Production Security PASS, paid-plan authorization, user counts, payment readiness, partner readiness or Commercial GO.
