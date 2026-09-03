# Auth Interaction — Physical Evidence

Status: **PARTIAL PASS — PASSWORD UPDATE + SIGN-IN VERIFIED / SIGNUP + RESET-EMAIL DELIVERY + LEAKED-PASSWORD REJECTION NOT VERIFIED**

Purpose: record only the real-device Auth interactions actually observed for the current PR #373 browser/PWA runtime UX. This evidence is intentionally split by path so one observed success cannot be promoted into a blanket Auth/Security PASS.

## Session metadata

- Device / model: OPPO Reno13 5G (CPH2689)
- OS / version: Android 16 / ColorOS 16.0.5
- Browser context / version: Google Chrome 152.0.7977.64, normal browser tab
- Test date: 2026-09-04 Asia/Bangkok
- Exact Auth interaction clock time: NOT CAPTURED
- Tester/session: owner-operated physical QA session
- Evidence location: physical screenshots captured in the QA conversation for this same OPPO/Chrome test session; repository issue/comment references may summarize the observation but do not contain passwords or account identifiers
- Current browser/PWA runtime candidate under acceptance: PR #373 / `6cd98bf2a2020b86fe2ab05e263dd59f7e4fb387`
- Verified deployed descendant for the PR #373 browser/PWA runtime: `0cc3ec3ef4dda18f0d8e083d8ca0992ef77f844c`
- PWA cache marker: `kinaraidee-beta-v16`

Sensitive account identifiers, email addresses, reset tokens and password values are intentionally not stored in repository evidence.

## Path results

### Replacement-password update

Result: **PASS — SCOPED PHYSICAL INTERACTION**

Observed sequence:

- a password-reset/recovery session reached the deployed Kinaraidee replacement-password page;
- a replacement password was entered and submitted;
- the UI completed the update path and returned to the member/account flow rather than remaining stuck in an error or loading state.

Boundary:

- this proves the tested replacement-password update interaction completed on the traced Android Chrome session;
- it does **not** by itself prove the reset email was delivered, because email-delivery evidence was not separately captured;
- it does **not** prove leaked-password protection is enabled or that any weak/leaked password was rejected.

### Sign-in using the new password

Result: **PASS — SCOPED PHYSICAL INTERACTION**

Observed sequence:

- after the replacement-password update, the member sign-in flow was opened;
- the tested account signed in successfully using the newly set password;
- the member/account state was reached successfully on the same physical Android Chrome QA session.

Boundary:

- this proves the tested sign-in-after-reset interaction completed;
- it does not prove signup acceptance, reset-email delivery, leaked-password rejection, every login failure path, session persistence across all devices, or full Auth lifecycle acceptance.

### Signup with an acceptable password

Result: **NOT VERIFIED**

No qualifying physical signup interaction is recorded in this evidence set.

### Reset-email delivery

Result: **NOT VERIFIED AS A SEPARATE STEP**

The replacement-password page/session was reached, but the actual email-delivery step was not separately captured as physical evidence and is therefore not promoted to PASS.

### Weak/leaked-password rejection

Result: **NOT VERIFIED / SERVER-SIDE BLOCKER REMAINS OPEN**

Supabase leaked-password protection remains blocked by the verified Free-plan/configuration constraint tracked in Issue #372. The deployed PR #373 browser UX recognizes weak-password errors, but source/deployment behavior cannot be used as proof that the production Auth service rejected a weak/leaked password.

## Acceptance impact

This evidence closes only these scoped interaction sub-results for the traced OPPO Android Chrome session:

- replacement-password update interaction: PASS;
- sign-in with the newly set password: PASS.

The umbrella current PR #373 Auth acceptance remains **PARTIAL / OPEN** until the required remaining paths are either physically verified or explicitly declared not applicable for the Beta acceptance scope. At minimum, signup remains unverified; reset-email delivery remains unverified as a separate step; leaked-password protection remains a separate server-side security blocker and must not be inferred from this physical UI evidence.

This partial PASS does not establish Public Beta completion, full device-matrix PASS, Production Security PASS, paid-plan authorization, user counts, payment readiness, partner readiness or Commercial GO.
