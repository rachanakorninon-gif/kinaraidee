# Supabase Auth Security Evidence

Evidence date: 2026-08-23

Purpose: record the current, externally verified state of the Supabase Auth leaked-password protection gate without treating configuration intent or documentation as a PASS.

## Connected project

- Project: `Kinaraidee`
- Project ref: `cuspfvfzprlgtvtdyilh`
- Project status observed through the connected Supabase management surface: `ACTIVE_HEALTHY`
- Organization plan observed through the connected Supabase management surface: `free`

## Security Advisor result

A fresh Supabase Security Advisor check on 2026-08-23 reports:

- `auth_leaked_password_protection`
- Title: `Leaked Password Protection Disabled`
- Level: `WARN`

The other findings returned in the same check are `INFO`-level `rls_enabled_no_policy` notices for deny-by-default tables already tracked by the project. This document does not reinterpret those tables as requiring permissive policies.

## Plan capability boundary

Current Supabase documentation states that leaked-password protection is available on the **Pro Plan and above**. The connected Kinaraidee organization is currently on the **Free** plan.

Reference: https://supabase.com/docs/guides/auth/password-security#password-strength-and-leaked-password-protection

Therefore the Production Security Gate item requiring leaked-password protection cannot be satisfied on the currently observed plan merely by changing application source code or CI. A plan/configuration decision is required before this gate can become PASS.

## Required evidence before closing the gate

1. Move the Supabase organization/project to a plan that supports leaked-password protection.
2. Enable leaked-password protection in Supabase Auth settings using an authorized management surface.
3. Re-run Supabase Security Advisor after the configuration change.
4. Record evidence that the `auth_leaked_password_protection` WARN is no longer present.
5. Keep Issue #11 open until steps 1–4 have verifiable evidence.

## Evidence boundary

- Current status: **BLOCKED BY PLAN/CONFIGURATION — NOT PASS**.
- This document does not authorize a paid-plan upgrade and does not claim that the setting has been enabled.
- CI, GitHub Pages deployment, Edge Function parity, browser/PWA tests, and static security checks do not replace this Auth configuration evidence.
- No user result, password test result, revenue, conversion, payment, partner, legal approval, Public Beta PASS, or Commercial GO is inferred from this record.
