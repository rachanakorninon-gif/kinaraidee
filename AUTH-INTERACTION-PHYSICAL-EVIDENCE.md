# Auth Interaction — Physical Evidence

Status: **PARTIAL PASS — RECOVERY REQUEST/MAIL-SEND/VERIFY-LINK + PASSWORD UPDATE + SIGN-IN + SIGNUP UI INTERACTION VERIFIED / NEW ACCOUNT CREATION + LEAKED-PASSWORD REJECTION NOT VERIFIED**

Purpose: record only the real-device Auth interactions actually observed for the current PR #373 browser/PWA runtime UX, with privacy-preserving backend corroboration where available. This evidence is intentionally split by path so one observed success cannot be promoted into a blanket Auth/Security PASS.

## Session metadata

- Device / model: OPPO Reno13 5G (CPH2689)
- OS / version: Android 16 / ColorOS 16.0.5
- Browser context / version: Google Chrome 152.0.7977.64, normal browser tab
- Test date: 2026-09-03/04 Asia/Bangkok QA session
- Physical screenshot interaction clock time: 2026-09-04 02:11–02:12 Asia/Bangkok for the signup screenshots; prior Auth screenshots were not timestamp-captured in this evidence file
- Backend corroboration window: 2026-09-03 23:05–23:12 and 2026-09-04 02:11 Asia/Bangkok
- Tester/session: owner-operated physical QA session
- Evidence location: physical screenshots captured in the QA conversation for this same OPPO/Chrome test session plus read-only Supabase Auth logs for the same recovery/update/sign-in/signup-request sequences
- Current browser/PWA runtime candidate under acceptance: PR #373 / `6cd98bf2a2020b86fe2ab05e263dd59f7e4fb387`
- Verified deployed descendant for the PR #373 browser/PWA runtime: `0cc3ec3ef4dda18f0d8e083d8ca0992ef77f844c`
- PWA cache marker: `kinaraidee-beta-v16`

Sensitive account identifiers, email addresses, IP addresses, request IDs, reset tokens and password values are intentionally not stored in repository evidence.

## Backend corroboration summary

Read-only Supabase Auth logs for the tested sequences show, without retaining account-identifying fields in this evidence file:

- 2026-09-03 23:05:16 Asia/Bangkok: recovery request accepted (`POST /recover`, HTTP 200) and a recovery `mail.send` event emitted;
- 2026-09-03 23:06:22 Asia/Bangkok: the recovery verification link was exercised successfully (`GET /verify`, HTTP 303) and established the recovery/login context used by the deployed reset-password page;
- 2026-09-03 23:09:41 Asia/Bangkok: authenticated user modification completed (`PUT /user`, HTTP 200), corroborating the observed replacement-password update;
- 2026-09-03 23:12:04 Asia/Bangkok: password-grant sign-in completed (`POST /token`, HTTP 200), corroborating the observed sign-in with the newly set password;
- 2026-09-04 02:11:44 Asia/Bangkok: the physical signup request completed at `POST /signup` with HTTP 200, but the Auth event is `user_repeated_signup`, so this request does **not** prove creation of a new account.

These server logs corroborate the physical flows. They do not replace physical interaction evidence, do not prove every email provider delivery path, and do not establish leaked-password protection. The repeated-signup event also means the observed confirmation-required UI state cannot be promoted to proof of new-account creation.

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

### Signup request / confirmation-required UI state

Result: **PASS — SCOPED PHYSICAL UI INTERACTION / NEW ACCOUNT CREATION NOT VERIFIED**

Observed/corroborated sequence:

- on the same OPPO Android Chrome session, the deployed QA Auth probe tracked the real member signup button;
- after submit, the member UI displayed the confirmation-required message `สมัครแล้วครับ กรุณาเปิดอีเมลเพื่อยืนยันบัญชี`;
- the QA probe showed `disabled=false`, account UI state `signed-out`, and a green `PASS (UI interaction)` verdict for the signup request reaching the confirmation-required/success UI state;
- read-only Supabase Auth logs show the corresponding `POST /signup` completed with HTTP 200;
- however, the Auth action is `user_repeated_signup`, meaning this tested address already had an Auth account and this request is not evidence of a newly created account.

Boundary:

- this proves the deployed signup UI request path completed cleanly and recovered to an enabled signed-out confirmation-required state on the traced physical Android Chrome session;
- it does **not** prove new-account creation, confirmation email issuance for a new account, confirmation-link completion, or first sign-in of a newly confirmed account;
- a separate signup using a genuinely unused address plus backend `user_signedup`/equivalent creation evidence and confirmation-link evidence is still required before the new-account-creation path can be accepted.

### Weak/leaked-password rejection

Result: **NOT VERIFIED / SERVER-SIDE BLOCKER REMAINS OPEN**

Supabase leaked-password protection remains blocked by the verified Free-plan/configuration constraint tracked in Issue #372. The deployed PR #373 browser UX recognizes weak-password errors, but source/deployment behavior and the successful recovery/sign-in/signup-UI flows cannot be used as proof that the production Auth service rejected a weak/leaked password.

## Acceptance impact

This evidence closes these scoped interaction sub-results for the traced OPPO Android Chrome session:

- recovery request / recovery mail-send / verification-link path: PASS for the tested QA sequence;
- replacement-password update interaction: PASS;
- sign-in with the newly set password: PASS;
- signup request reaching confirmation-required UI state with button re-enabled and signed-out state: PASS.

The umbrella current PR #373 Auth acceptance remains **PARTIAL / OPEN**. New-account creation + email-confirmation completion is still unverified because the observed backend signup event was `user_repeated_signup`. Weak/leaked-password rejection remains a separate server-side security blocker and must not be inferred from this evidence.

This partial PASS does not establish Public Beta completion, full device-matrix PASS, Production Security PASS, paid-plan authorization, user counts, payment readiness, partner readiness or Commercial GO.
