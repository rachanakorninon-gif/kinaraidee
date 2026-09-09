# Acquisition Dashboard — Provider-neutral Confirmation Evidence

Date: 2026-09-09

Status: **DEPLOYED / PROVIDER-NEUTRAL CONFIRMATION VERIFIED**

Scope: correct the owner-only Acquisition KPI so `confirmed` means a verified authentication method rather than email confirmation only. This is a reporting correction. It does **not** enable any social provider in Production and does not establish Public Beta, conversion, payment, partner or Commercial readiness.

## Root cause

The prior deployed Acquisition API v2 built `confirmedIds` only from `auth.users.email_confirmed_at`. That preserved the email/password rule but undercounted verified email-optional OAuth accounts.

The provider-neutral Auth/referral contract accepted under Issue #529 defines:

- email/password: confirmed after `email_confirmed_at`;
- phone: confirmed after `phone_confirmed_at` / verified OTP session;
- approved OAuth social account: confirmed from an authenticated approved provider identity (`custom:line`, later `facebook` when independently configured/accepted).

The Acquisition Dashboard now uses the same provider-neutral account-verification meaning when it labels a signup as confirmed.

## Aggregate pre-change evidence

A privacy-safe aggregate Auth read before this source change found:

| Provider | Identities | Distinct users | Email-confirmed users | Phone-confirmed users |
|---|---:|---:|---:|---:|
| `custom:line` | 1 | 1 | 0 | 0 |
| `email` | 7 | 7 | 4 | 0 |

This demonstrates the reporting gap without retaining any user ID, email, provider subject, token or other account-level identifier: the controlled verified LINE identity cannot be counted by an email-only predicate.

## Source correction and merge

PR #587 (`fix: make acquisition confirmation provider-neutral`) passed its regression suite and was squash-merged as:

- merge commit: `757e222b3ced5d3cf4c8fcf943bb30eff878a940`

`supabase/functions/acquisition-api/index.ts` now uses an explicit provider-neutral helper:

- `email_confirmed_at` => confirmed;
- `phone_confirmed_at` => confirmed;
- an Auth identity whose provider is in the explicit approved social allowlist `custom:line` / `facebook` => confirmed;
- arbitrary provider profile fields, display names, emails or client payloads are not used as confirmation evidence.

The helper is applied to both:

- account-window `confirmedSignups` / source-campaign-content confirmation rates;
- product-window confirmed-attributed signup calculations.

The API also returns a non-sensitive confirmation-definition label. The owner dashboard wording changed from email-only `ยืนยันอีเมล` to `ยืนยันวิธีเข้าสู่ระบบ` and explains the provider-neutral definition.

## GitHub Pages deployment

The merged owner-dashboard shell was deployed from the same merge commit:

- GitHub Pages run `34379810008` = **success**
- deployed source commit = `757e222b3ced5d3cf4c8fcf943bb30eff878a940`

This proves the noindex owner-login shell deployment lineage. It does not prove an authenticated Owner dashboard session by itself.

## Supabase Edge deployment

The merged `acquisition-api` source was deployed as:

- function: `acquisition-api`
- status: **ACTIVE**
- version: **3**
- deployed bundle SHA-256: `e61cd930adb771560a43c2f810c35b18f094642c4d8afedafce64a31725999bc`
- `verify_jwt=false` retained intentionally because this function performs its existing custom bearer verification with `sb.auth.getUser(token)` and then checks the `admin_dashboard_owners` allowlist before serving data.

Post-deploy source read-back confirms version 3 contains the provider-neutral helper, explicit `custom:line` / `facebook` allowlist, phone confirmation support and the non-sensitive confirmation-definition field.

## Aggregate post-deploy semantic corroboration

A privacy-safe aggregate query using the dashboard account-measurement start (`2026-09-03T22:08:32Z`) returned:

| Metric | Count |
|---|---:|
| Measured users | 1 |
| Email-confirmed only | 0 |
| Provider-neutral confirmed | 1 |
| Confirmed via approved OAuth only | 1 |

This is the expected semantic delta for the current measured window: the verified controlled OAuth account is no longer excluded solely because it has no confirmed email. No account ID, email, provider subject, token or raw referral code is retained in this evidence.

## Security and truth boundaries preserved

- Owner access remains authenticated and allowlisted through `admin_dashboard_owners`.
- The service-role credential remains server-side only and is not placed in browser HTML.
- Raw account rows are not returned to the dashboard.
- Campaign 3,000 eligibility remains explicitly excluded.
- Ad spend remains excluded.
- First-party account/acquisition/referral/product tables remain the reporting source alongside Supabase Auth.
- This reporting definition does not broaden provider rollout authorization.

**Production LINE remains disabled** until the separate physical account-isolation, network/failure, accessibility, post-integration email/recovery regression and supported-device gates close. Facebook and Phone remain independently gated.

## Runtime acceptance boundary

An authenticated Owner dashboard runtime session was **not directly exercised in this work session** because no Owner browser token/session was available to this execution context. That item is not inferred from source, deployment or SQL evidence.

What is verified here is narrower and traceable:

- source regression PASS;
- Pages deployment PASS;
- Supabase Edge v3 deployment/read-back PASS;
- provider-neutral Auth semantics corroborated by aggregate live database truth.

This does not establish user growth, conversion, Campaign 3,000 eligibility, payment readiness, revenue, Public Beta completion or Commercial GO.
