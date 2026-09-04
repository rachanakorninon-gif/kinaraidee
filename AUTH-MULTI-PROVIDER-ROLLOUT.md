# Kinaraidee — Multi-provider Auth Rollout

Status: **FOUNDATION + CONTROLLED LINE CONFIG / PRODUCTION PROVIDERS NOT ENABLED**

Purpose: add safer, lower-friction member sign-in options for Thai users while preserving the existing email/password path, account identity boundaries, referral/acquisition attribution, and current Public Beta evidence rules.

## Proposed sign-in order

1. **LINE Login** — primary social option for the Thailand-focused experience.
2. **Phone OTP** — SMS one-time password.
3. **Facebook Login** — secondary social option.
4. **Email + password** — existing fallback and recovery path.

No provider is considered production-ready merely because provider configuration or UI/client code exists.

## Current production facts

- Supabase project: `cuspfvfzprlgtvtdyilh` (`Kinaraidee`).
- Aggregate-only Auth read on 2026-09-05 after controlled LINE tests shows 7 `email` identities and 1 `custom:line` identity mapped to 1 Supabase user. No user identifiers, emails, phone numbers, tokens or social-provider subject IDs are retained in repository evidence.
- The controlled LINE identity has no email address, matching the intentionally email-optional initial LINE test path.
- Existing email/password signup, confirmation, recovery/password-update and sign-in have scoped physical evidence on OPPO Android Chrome. The separate leaked-password-protection gate remains OPEN and must not be reclassified by this work.
- The deployed member UI remains email/password only. The client prototype under `prototype/auth-multi-provider/` remains intentionally **not** wired into `member.html`, `data/`, the Service Worker cache or the deployed Pages runtime.
- Controlled LINE provider evidence is recorded in `LINE-AUTH-CONTROLLED-EVIDENCE.md` and does not authorize Production enablement.

## Supabase / provider model

### LINE

The configured Supabase custom provider identifier is `custom:line` with display name `LINE`.

Hosted OIDC auto-discovery was evaluated first but failed controlled interoperability during ID-token verification. The controlled provider was therefore recreated using **Manual OAuth2** configuration with:

- issuer: `https://access.line.me`
- authorization: `https://access.line.me/oauth2/v2.1/authorize`
- token: `https://api.line.me/oauth2/v2.1/token`
- userinfo: `https://api.line.me/oauth2/v2.1/userinfo`
- scopes: `openid, profile`
- email optional: enabled for the controlled test path
- Supabase callback URL registered at LINE: `https://cuspfvfzprlgtvtdyilh.supabase.co/auth/v1/callback`

No LINE email permission is claimed for the current controlled path. If email is requested later, Kinaraidee must first add an explicit product need, user-facing consent disclosure and privacy-policy handling rather than silently widening scopes.

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

Read-only backend inspection confirms current `member_profiles` and `member_food_history` RLS policies are scoped to `auth.uid() = user_id`; referral tables retain RLS and no direct `anon` / `authenticated` table grants. These are supporting structural safeguards only and do not replace physical cross-account isolation acceptance.

## Identity linking rule

Supabase can automatically link verified OAuth identities that return the same verified email. Manual OAuth identity linking is also available through `linkIdentity()` when enabled.

Kinaraidee must not auto-merge two existing application accounts based only on name, phone-like text, unverified email, LINE display name, Facebook display name, or client-supplied metadata.

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
- account/profile/history/favorite/referral access remains scoped to the authenticated user;
- referral/acquisition attribution parity verified for new-account creation;
- no provider access token, Auth token, OTP, phone number or provider subject identifier is stored in QA evidence;
- accessibility labels/focus and busy/error states reviewed;
- existing email/password/recovery flow regression still passes;
- Public Beta and Commercial status remain separate gates.

Current controlled LINE evidence has already established authorization reachability, cancel/return usability, one signed-out new LINE login, returning-user login to the same controlled LINE identity, and user-initiated logout. These scoped PASS items must not be generalized to the remaining gates.

Additional Phone OTP gates:
- SMS provider/cost owner defined;
- OTP resend/rate-limit behavior verified;
- abuse/captcha decision reviewed before meaningful public traffic.

Additional LINE gates still OPEN:
- physical cross-account profile/history/favorite/referral isolation acceptance;
- referral/acquisition attribution parity for LINE-created accounts;
- network/provider failure retry;
- accessibility review of the actual LINE button flow;
- existing email/password/recovery regression after LINE UI integration;
- Safari/Chrome coverage plus at least one LINE-app-installed context; in-app-browser behavior must be recorded separately from Safari/Chrome rather than generalized.

## What this foundation does not authorize

This document does not authorize purchasing an SMS service, enabling paid provider features, enabling any provider button in Production before its remaining gates close, enabling Captcha, merging duplicate accounts, opening Public Beta recruitment, or claiming Commercial readiness.
