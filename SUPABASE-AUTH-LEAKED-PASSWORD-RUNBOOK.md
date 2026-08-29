# Supabase Auth Leaked-Password Protection Runbook

Status: **PREPARED / NOT EXECUTED**

Issue: #372

This runbook prepares a controlled production configuration change. It does **not** authorize or prove the setting has been enabled.

## Current verified state — 2026-08-29

- Supabase Security Advisor reports `auth_leaked_password_protection` = **WARN / disabled**.
- Current deployed browser Auth UX understands `weak_password` / WeakPasswordError-style failures and keeps login failure wording generic.
- Deployment evidence is recorded separately in `AUTH-PASSWORD-SECURITY-DEPLOYMENT-EVIDENCE.md` once that evidence PR is merged.
- Existing server-side RLS/no-policy INFO notices are not a reason to add permissive client policies.

## Current Supabase behavior to account for

Supabase documentation states:

- leaked-password protection checks passwords against HaveIBeenPwned;
- the setting is available on Pro Plan and above;
- strengthened password requirements can affect new signup and password changes;
- an existing user may still encounter a weak-password error during password sign-in when their current password does not meet strengthened requirements;
- `weak_password` / AuthWeakPasswordError is the error family clients should handle;
- password-reset email APIs intentionally avoid revealing whether an account exists.

These are platform expectations, not proof of the Kinaraidee project configuration.

## Hard preconditions

Do not enable the setting until all checked:

- [ ] confirm the Kinaraidee project plan exposes leaked-password protection
- [ ] capture the current Auth password policy/configuration screen or equivalent trace
- [ ] confirm an owner is available to roll back the setting if login impact is unexpectedly high
- [x] deployed signup/login/reset UX handles weak-password rejection without raw Supabase error leakage
- [x] generic login/reset wording avoids account-enumeration messages in the browser source regression
- [ ] choose non-production test identities; never use a real user's password
- [ ] define the exact test window and incident owner

## Activation procedure

The actual configuration mutation must be performed through an approved Supabase Auth configuration surface that exposes the current setting. The connected toolset in this ChatGPT session does not expose an Auth-configuration mutation action, so this runbook does not invent an API call or SQL command.

1. Open the Kinaraidee project Auth password-security settings.
2. Confirm current password minimum/required-character settings before changing anything.
3. Enable **Leaked Password Protection** only.
4. Do not change unrelated Auth controls in the same change window unless separately reviewed.
5. Record who changed it, UTC timestamp, previous state and resulting state.
6. Re-run Supabase Security Advisor immediately.
7. If the warning remains, stop and investigate rather than assuming propagation.

## Controlled interaction tests

Use dedicated test identities and avoid storing test passwords in GitHub, issue comments, screenshots or logs.

### A. New signup — acceptable password

Expected:
- signup follows the current configured email-confirmation/session behavior;
- no raw provider error is displayed;
- no unrelated member/history regression.

Evidence:
- timestamp
- browser/device class
- result PASS/FAIL
- no password value retained

### B. New signup — known leaked/weak test password

Expected:
- Supabase rejects the password through the weak-password error family;
- Kinaraidee shows the safe Thai guidance;
- no account/Premium/campaign state is inferred from rejection.

Never commit the test password itself.

### C. Existing-user password sign-in

Use a controlled test account whose password-state behavior is understood before the test.

Expected if Supabase identifies the current password as weak:
- sign-in produces the weak-password error family described by Supabase;
- Kinaraidee directs the user to the reset flow;
- generic login behavior does not reveal account existence to unauthenticated observers.

If the provider behavior differs, record actual evidence and update the client contract instead of forcing the expected result.

### D. Reset-email request

Expected:
- user can request password reset;
- public response does not disclose whether the email exists;
- reset link returns to `reset-password.html`, not the private admin flow.

### E. Replacement password — weak

Expected:
- update is rejected;
- safe Thai weak-password guidance appears;
- no raw auth error is shown.

### F. Replacement password — acceptable

Expected:
- password update succeeds for the controlled test identity;
- subsequent sign-in succeeds;
- member profile/history access remains scoped to that identity.

## Regression / smoke checks after activation

- [ ] Auth password-security browser regression passes
- [ ] GitHub Pages / main Live Smoke remain green if no browser release changed
- [ ] Supabase Security Advisor no longer reports `auth_leaked_password_protection` warning
- [ ] no new high-severity Security Advisor finding appears
- [ ] test member can still reach owned profile/history only
- [ ] password-reset route remains separate from `admin.html`

## Rollback trigger

Consider rollback if any of the following occurs and cannot be explained/fixed quickly within the controlled window:

- valid controlled users are unexpectedly unable to recover access;
- the client cannot safely distinguish the new error behavior;
- Security Advisor/configuration state is inconsistent with the intended change;
- a significant Auth incident or unexpected provider behavior appears.

## Rollback procedure

1. Record the observed problem and timestamp.
2. Restore **only** the leaked-password setting to its prior state through the same approved Auth configuration surface.
3. Do not loosen unrelated password requirements as an emergency shortcut.
4. Repeat the acceptable signup/sign-in/reset smoke subset.
5. Re-run Security Advisor and record that the warning is expected to return if the feature was disabled.
6. Open/attach a defect with sanitized evidence before attempting activation again.

## Evidence template

```
Change owner: <TBD>
Project: Kinaraidee / cuspfvfzprlgtvtdyilh
Changed at UTC: <TBD>
Previous leaked-password state: disabled
New state: <TBD>
Security Advisor before: WARN auth_leaked_password_protection
Security Advisor after: <TBD>
Acceptable signup: <PASS/FAIL + trace>
Weak signup rejection: <PASS/FAIL + trace; no password>
Existing-user sign-in behavior: <PASS/FAIL/N/A + trace>
Reset request: <PASS/FAIL + trace>
Weak replacement rejection: <PASS/FAIL + trace; no password>
Acceptable replacement + sign-in: <PASS/FAIL + trace>
Rollback required: <yes/no>
Reviewer: <TBD>
```

## Completion rule

Issue #372 may be marked completed only when the actual project setting is verified, controlled interaction tests are recorded, and Security Advisor is re-run. Source code, this runbook, CI, or deployed static UX alone can never mark leaked-password protection PASS.
