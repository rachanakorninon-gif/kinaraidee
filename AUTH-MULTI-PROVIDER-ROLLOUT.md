# Kinaraidee — Multi-provider Auth Rollout

Status: **FOUNDATION ONLY / PROVIDERS NOT ENABLED**

Purpose: add safer, lower-friction member sign-in options for Thai users while preserving the existing email/password path, account identity boundaries, referral/acquisition attribution, and current Public Beta evidence rules.

## Proposed sign-in order

1. **LINE Login** — primary social option for the Thailand-focused experience.
2. **Phone OTP** — SMS one-time password.
3. **Facebook Login** — secondary social option.
4. **Email + password** — existing fallback and recovery path.

No provider is considered production-ready merely because UI/client code exists.

## Current production facts

- Supabase project: `cuspfvfzprlgtvtdyilh` (`Kinaraidee`).
- Current Auth identities observed by an aggregate-only read on 2026-09-05: provider `email` only. No user identifiers, emails, phone numbers, tokens or social-provider subject IDs were retained in evidence.
- Existing email/password signup, confirmation, recovery/password-update and sign-in have scoped physical evidence on OPPO Android Chrome. The separate leaked-password-protection gate remains OPEN and must not be reclassified by this work.
- Current browser/PWA runtime remains PR #520 Edge-only referral-summary runtime. This branch must not supersede that runtime until provider configuration, regression and physical acceptance are complete.

## Supabase / provider model

### LINE

Use a Supabase **Custom OAuth/OIDC Provider** identifier `custom:line` only after a LINE Login channel exists and the callback is registered.

Preferred OIDC inputs if accepted by the hosted Supabase provider setup:
- identifier: `custom:line`
- name: `LINE`
- issuer: `https://access.line.me`
- scopes: `openid profile email`
- Supabase callback URL to register at LINE: `https://cuspfvfzprlgtvtdyilh.supabase.co/auth/v1/callback`

LINE Login documentation identifies `https://access.line.me` as the ID-token issuer, uses the v2.1 authorization/token flow, supports PKCE, and exposes the OpenID userinfo endpoint at `https://api.line.me/oauth2/v2.1/userinfo`.

If hosted OIDC auto-discovery does not interoperate cleanly with LINE, configure a manual OAuth2 custom provider instead and verify the resulting ID/userinfo mapping before enabling the browser button.

### Facebook

Use Supabase's built-in `facebook` provider only after a Facebook/Meta app has been created, its Client ID/secret are configured in Supabase Auth, and the Supabase callback URL is registered with the provider.

### Phone OTP

Use `signInWithOtp({ phone })` + `verifyOtp({ phone, token, type: 'sms' })` only after:
- Phone Auth is enabled in Supabase;
- a supported SMS provider is configured;
- SMS spend/abuse controls are reviewed;
- resend/rate-limit UX is defined;
- the Auth Captcha decision is revisited if traffic/risk justifies it.

Phone OTP has a direct external-message cost and must not be switched on merely by merging client code.

## Account identity rule

The canonical account identity remains the Supabase Auth user UUID. Email, phone, Facebook identity and LINE identity are login methods, not application primary keys.

Do not invent or derive application account IDs from provider identifiers. Existing member tables continue to scope by `auth.uid()` / `user_id`.

## Identity linking rule

Supabase can automatically link verified OAuth identities that return the same verified email. Manual OAuth identity linking is also available through `linkIdentity()` when enabled.

Kinaraidee must **not** auto-merge two existing application accounts based only on name, phone-like text, unverified email, LINE display name, Facebook display name, or client-supplied metadata.

Before exposing a user-facing "เชื่อมบัญชี" action:
- require an authenticated current session;
- reauthenticate when the risk level requires it;
- verify the new identity through the provider flow;
- handle conflicts explicitly;
- preserve history/favorites/referrals under one verified Supabase user only;
- add unlink safeguards so a user cannot remove their final usable login method unintentionally.

## Referral / acquisition boundary

The existing email signup flow attaches reviewed acquisition/referral metadata during `signUp(...)`. Social and phone onboarding must not silently bypass referral attribution.

Before LINE/Facebook/Phone are enabled for new account creation, add and verify an attribution-safe post-auth path that:
- consumes only reviewed allowlisted acquisition fields;
- binds attribution to the authenticated Supabase user server-side;
- does not trust a provider display name/email/subject from arbitrary browser payload;
- remains separate from Campaign 3,000 eligibility truth;
- prevents duplicate attribution on repeated login.

Until that parity exists, new provider buttons may be implemented behind disabled rollout flags but must not be enabled in Production.

## UI flow

Signed-out member screen:

1. `ดำเนินการต่อด้วย LINE`
2. `ดำเนินการต่อด้วยเบอร์โทร`
3. `ดำเนินการต่อด้วย Facebook`
4. divider `หรือ`
5. existing email/password signup/login tabs

Phone flow:
- ask for Thai phone number;
- normalize `0xxxxxxxxx` to `+66xxxxxxxxx` only after validation;
- send OTP;
- show six-digit OTP field;
- verify OTP;
- on success render the normal signed-in Member state;
- never display/log the OTP or Auth token.

Social flow:
- user taps the provider button;
- redirect to the provider through Supabase Auth;
- return only to an allowlisted Kinaraidee member URL;
- on successful session, render the same existing Member state;
- provider access/refresh tokens are not needed by Kinaraidee and must not be persisted by app code.

## Rollout flags

Initial client implementation must default all new methods to disabled:

```js
{
  line: false,
  phone: false,
  facebook: false
}
```

A provider flag may switch to `true` only after its external configuration and acceptance gates below are satisfied.

## Acceptance gates before enabling a provider

For each provider independently:

- provider/app/channel configured with no secrets committed to the repository;
- redirect/callback allowlists reviewed;
- successful new-account flow on a real supported device;
- successful returning-user login flow;
- cancel/deny flow returns usable UI;
- network/failure retry does not trap the user;
- logout works;
- account/profile/history/favorite access remains scoped to the authenticated user;
- referral/acquisition attribution parity verified for new-account creation;
- no provider access token, Auth token, OTP, phone number or provider subject identifier is stored in QA evidence;
- accessibility labels/focus and busy/error states reviewed;
- existing email/password/recovery flow regression still passes;
- Public Beta and Commercial status remain separate gates.

Additional Phone OTP gates:
- SMS provider/cost owner defined;
- OTP resend/rate-limit behavior verified;
- abuse/captcha decision reviewed before meaningful public traffic.

Additional LINE gate:
- verify behavior from Safari/Chrome and at least one context where the LINE app is installed; in-app-browser behavior must be recorded separately from Safari/Chrome rather than generalized.

## What this foundation does not authorize

This document does not authorize purchasing an SMS service, enabling paid provider features, creating external LINE/Meta developer assets on the user's behalf, changing Supabase Auth provider configuration, enabling Captcha, merging duplicate accounts, opening Public Beta recruitment, or claiming Commercial readiness.
