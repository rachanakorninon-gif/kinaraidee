# Auth Interaction — Physical Evidence

Status: **PARTIAL PASS — RECOVERY REQUEST/MAIL-SEND/VERIFY-LINK + PASSWORD UPDATE + SIGN-IN + NEW SIGNUP + EMAIL CONFIRMATION VERIFIED / LEAKED-PASSWORD REJECTION NOT VERIFIED**

Purpose: record only the real-device Auth interactions actually observed for the current PR #373 browser/PWA runtime UX, with privacy-preserving backend corroboration where available. This evidence is intentionally split by path so one observed success cannot be promoted into a blanket Auth/Security PASS.

## Session metadata

- Device / model: OPPO Reno13 5G (CPH2689)
- OS / version: Android 16 / ColorOS 16.0.5
- Browser context / version: Google Chrome 152.0.7977.64, normal browser tab
- Test date: 2026-09-03/04 Asia/Bangkok QA session
- Physical screenshot interaction clock time: 2026-09-04 02:11–02:12 Asia/Bangkok for the repeated-signup UI probe and 02:23–02:24 Asia/Bangkok for the new-account signup / confirmation screenshots; prior Auth screenshots were not timestamp-captured in this evidence file
- Backend corroboration window: 2026-09-03 23:05–23:12 and 2026-09-04 02:11, 02:23–02:24 Asia/Bangkok
- Tester/session: owner-operated physical QA session
- Evidence location: physical screenshots captured in the QA conversation for this same OPPO/Chrome test session plus mailbox evidence for the confirmation message and read-only Supabase Auth logs for the same recovery/update/sign-in/signup/confirmation sequences
- Current browser/PWA runtime candidate under acceptance: PR #373 / `6cd98bf2a2020b86fe2ab05e263dd59f7e4fb387`
- Verified deployed descendant for the PR #373 browser/PWA runtime: `0cc3ec3ef4dda18f0d8e083d8ca0992ef77f844c`
- PWA cache marker: `kinaraidee-beta-v16`

Sensitive account identifiers, email addresses, IP addresses, request IDs, confirmation/reset tokens and password values are intentionally not stored in repository evidence.

## Backend corroboration summary

Read-only Supabase Auth logs for the tested sequences show, without retaining account-identifying fields in this evidence file:

- 2026-09-03 23:05:16 Asia/Bangkok: recovery request accepted (`POST /recover`, HTTP 200) and a recovery `mail.send` event emitted;
- 2026-09-03 23:06:22 Asia/Bangkok: the recovery verification link was exercised successfully (`GET /verify`, HTTP 303) and established the recovery/login context used by the deployed reset-password page;
- 2026-09-03 23:09:41 Asia/Bangkok: authenticated user modification completed (`PUT /user`, HTTP 200), corroborating the observed replacement-password update;
- 2026-09-03 23:12:04 Asia/Bangkok: password-grant sign-in completed (`POST /token`, HTTP 200), corroborating the observed sign-in with the newly set password;
- 2026-09-04 02:11:44 Asia/Bangkok: an earlier physical signup request completed at `POST /signup` with HTTP 200 but logged `user_repeated_signup`, so that earlier request was retained only as scoped UI-path evidence and not as new-account evidence;
- 2026-09-04 02:23:41 Asia/Bangkok: a separate physical signup using a genuinely unused QA address completed at `POST /signup` with HTTP 200, logged `user_confirmation_requested`, and emitted a confirmation `mail.send` event;
- the corresponding confirmation message was observed in the intended Gmail inbox on the physical device;
- 2026-09-04 02:24:52 Asia/Bangkok: the confirmation link was exercised successfully (`GET /verify`, HTTP 303), Supabase logged `user_signedup`, and an implicit login was established in the same second;
- 2026-09-04 02:24:53–02:24:54 Asia/Bangkok: subsequent authenticated `/user` requests returned HTTP 200, corroborating the physical Member UI showing an active signed-in account after confirmation.

These server logs corroborate the physical flows. They do not replace physical interaction evidence, do not establish a general email-delivery SLA for every provider/account, and do not establish leaked-password protection.

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
- it does not prove every login failure path, session persistence across all devices, or full Auth lifecycle acceptance.

### New account signup / confirmation email / confirmation-link completion

Result: **PASS — SCOPED PHYSICAL INTERACTION + MAILBOX DELIVERY + BACKEND CORROBORATION**

Observed/corroborated sequence:

- on the same OPPO Android Chrome session, a genuinely unused QA email address was submitted through the deployed Member signup UI;
- the Member UI displayed `สมัครแล้วครับ กรุณาเปิดอีเมลเพื่อยืนยันบัญชี`, the QA Auth probe showed `disabled=false`, account UI state `signed-out`, and a green `PASS (UI interaction)` verdict;
- Supabase Auth logged the signup as `user_confirmation_requested` at `POST /signup` with HTTP 200 and emitted a confirmation `mail.send` event;
- the confirmation message was physically observed in the intended Gmail inbox;
- the user opened that message and activated `Confirm email address`;
- Supabase Auth then logged `user_signedup` on `GET /verify` with HTTP 303 and established an implicit login;
- the deployed Member page physically showed `เข้าสู่ระบบแล้ว` for the newly confirmed account;
- subsequent authenticated `/user` requests returned HTTP 200.

Boundary:

- this proves the tested new-account signup → confirmation-mail delivery → confirmation-link → signed-in Member flow completed on this traced OPPO Android Chrome session;
- it does not establish delivery or rendering behavior for every email provider, every device/browser, every expired/invalid confirmation-link case, or full account/session lifecycle acceptance across the device matrix;
- the earlier `user_repeated_signup` attempt is retained as historical UI-path evidence only and does not weaken the later successful new-account acceptance sequence.

### Weak/leaked-password rejection

Result: **NOT VERIFIED / SERVER-SIDE BLOCKER REMAINS OPEN**

Supabase leaked-password protection remains blocked by the verified Free-plan/configuration constraint tracked in Issue #372. The deployed PR #373 browser UX recognizes weak-password errors, but source/deployment behavior and the successful recovery/sign-in/signup/confirmation flows cannot be used as proof that the production Auth service rejected a weak/leaked password.

## Acceptance impact

This evidence closes these scoped interaction sub-results for the traced OPPO Android Chrome session:

- recovery request / recovery mail-send / verification-link path: PASS for the tested QA sequence;
- replacement-password update interaction: PASS;
- sign-in with the newly set password: PASS;
- new-account signup request reaching confirmation-required state: PASS;
- confirmation message delivery to the tested Gmail inbox: PASS;
- confirmation-link completion and resulting signed-in Member state: PASS.

The umbrella current PR #373 Auth acceptance remains **PARTIAL / OPEN** only because weak/leaked-password rejection remains a separate server-side security blocker and broader device-matrix/account-lifecycle coverage is still incomplete. The successful signup/confirmation evidence must not be promoted into blanket Production Security PASS.

This partial PASS does not establish Public Beta completion, full device-matrix PASS, Production Security PASS, paid-plan authorization, user counts, payment readiness, partner readiness or Commercial GO.
