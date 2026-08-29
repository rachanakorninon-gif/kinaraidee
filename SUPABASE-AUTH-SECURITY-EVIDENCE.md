# Supabase Auth Security Evidence

Evidence date: 2026-08-24; read-only plan/advisor re-verification: 2026-08-29

Purpose: record the current, externally verified state of Supabase Auth security configuration without treating plan-limited settings, screenshots, documentation, or configuration intent as a broader security PASS.

## Connected project

- Project: `Kinaraidee`
- Project ref: `cuspfvfzprlgtvtdyilh`
- Previously observed project status through the connected Supabase management surface: `ACTIVE_HEALTHY`
- Organization plan observed in the Supabase dashboard: `Free`

## Read-only re-verification — 2026-08-29

The connected Supabase organization/project was re-checked without changing billing, plan, Auth settings, users, credentials, or production data.

- Organization plan read-back: `Free`.
- Project status read-back: `ACTIVE_HEALTHY`.
- Security Advisor re-check at `2026-08-29T02:49Z` still reported `Leaked Password Protection Disabled` at `WARN` level.
- The remaining INFO-level RLS/no-policy notices are tracked as deny-by-default/service-role-only tables and must not be silenced by adding permissive policies without an approved use case.
- Current focused follow-up: Issue #372. Historical security tracker: Issue #11.

This re-verification confirms that the leaked-password production gate remains blocked by the current plan. It does not authorize a paid-plan upgrade and does not create an Auth test result or security PASS.

## Fresh Security Advisor result — 2026-08-24

A fresh Supabase Security Advisor check on project ref `cuspfvfzprlgtvtdyilh` reports:

- `auth_leaked_password_protection`
- Title: `Leaked Password Protection Disabled`
- Level: `WARN`

The other returned findings are `INFO`-level `rls_enabled_no_policy` notices on deny-by-default/server-side tables already tracked by the project. This evidence does not reinterpret those tables as requiring permissive policies.

Remediation reference: https://supabase.com/docs/guides/auth/password-security#password-strength-and-leaked-password-protection

## Dashboard configuration audit — 2026-08-24

The following values were read from the authorized Supabase dashboard during the live configuration review. No change was saved unless explicitly stated.

### Attack Protection

- `Enable Captcha protection`: OFF.
- `Prevent use of leaked passwords`: DISABLED.
- The leaked-password setting is shown by the dashboard as available only on Pro plan and above.
- Captcha was intentionally **not enabled** during this audit because current `member.html` calls Supabase `signUp`, `signInWithPassword`, and password-reset flows without a captcha widget/token integration. Enabling server-side captcha first could break signup/login/reset behavior.

### Email/password policy

- Minimum password length observed: `8` characters.
- No password-policy change was made during this audit.
- Existing client validation in `member.html` also requires at least 8 characters.

### Rate limits

Observed dashboard values:

- Sending emails: `2 emails/hour`.
- Sending SMS messages: `30 SMS/hour`.
- Token refreshes: `150 requests/5 min` per IP.
- Token verifications: `30 requests/5 min` per IP.
- Anonymous users: `30 requests/hour` per IP.
- Sign-ups and sign-ins: `30 requests/5 min` per IP.
- Web3 sign-ups and sign-ins: `30 requests/5 min` per IP.
- IP address forwarding: OFF.

No rate-limit values were changed because no approved real-traffic baseline exists yet.

### URL configuration

- Site URL: `https://rachanakorninon-gif.github.io/kinaraidee/`
- Allowed redirect URL: `https://rachanakorninon-gif.github.io/kinaraidee/`
- Allowed password-reset redirect URL: `https://rachanakorninon-gif.github.io/kinaraidee/reset-password.html`

No URL change was required.

### Sessions and tokens

- Single session per user: OFF.
- Time-box user sessions: `0 / never` and dashboard indicates session configuration is Pro-plan functionality.
- Inactivity timeout: `0 / never` under the same plan-limited session configuration area.
- Access token expiry: `3600 seconds`.
- Detect and revoke potentially compromised refresh tokens: ON.
- Refresh token reuse interval: `10 seconds`.

No session/token value was changed during this audit.

### Multi-Factor Authentication

- TOTP (Authenticator App): `Enabled`.
- Maximum per-user MFA factors: `10`.
- SMS MFA: `Disabled`; dashboard indicates SMS MFA is Pro-plan functionality.
- Enhanced MFA Security — Limit duration of AAL1 sessions: ON; dashboard recommendation is ON.

No MFA configuration change was required.

## Plan capability boundary

The Production Security Gate item requiring leaked-password protection cannot be satisfied on the currently observed Free plan merely by changing application source code or CI. A plan/configuration decision is required before this gate can become PASS.

Required evidence before closing that gate:

1. Move the Supabase organization/project to a plan that supports leaked-password protection.
2. Enable leaked-password protection through an authorized Supabase management surface.
3. Re-run Supabase Security Advisor after the configuration change.
4. Record evidence that the `auth_leaked_password_protection` WARN is no longer present.
5. Keep the tracked Auth leaked-password issues open until steps 1–4 have verifiable evidence.

## Captcha enablement boundary

Captcha should remain OFF until all applicable Auth entry points have an approved captcha provider integration and pass signup/login/password-reset regression tests. Current source evidence shows no `captchaToken` wiring in `member.html`.

## Evidence boundary

- Current leaked-password status: **BLOCKED BY VERIFIED FREE PLAN / CONFIGURATION — NOT PASS**.
- The dashboard audit and read-only re-verification verify observed configuration only; they are not a penetration test, real-device PASS, abuse-control completeness claim, or Commercial GO.
- This document does not authorize a paid-plan upgrade.
- It does not authorize enabling captcha without client integration and regression evidence.
- CI, GitHub Pages deployment, Edge Function parity, browser/PWA tests, static security checks, rate-limit defaults, MFA availability, or token settings do not replace the remaining Auth configuration evidence.
- No user count, password test result, revenue, conversion, payment, partner, legal approval, Public Beta PASS, or Commercial GO is inferred from this record.
