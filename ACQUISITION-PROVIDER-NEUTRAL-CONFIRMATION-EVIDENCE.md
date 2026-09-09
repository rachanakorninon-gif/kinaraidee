# Acquisition Dashboard — Provider-neutral Confirmation Evidence

Date: 2026-09-09

Status: **SOURCE PREPARED / DEPLOYMENT EVIDENCE PENDING**

Scope: correct the owner-only Acquisition KPI so `confirmed` means a verified authentication method rather than email confirmation only. This is a reporting correction. It does **not** enable any social provider in Production and does not establish Public Beta, conversion, payment, partner or Commercial readiness.

## Root cause

The deployed Acquisition API v2 currently builds `confirmedIds` only from `auth.users.email_confirmed_at`. That preserves the email/password rule but undercounts verified email-optional OAuth accounts.

The provider-neutral Auth/referral contract accepted under Issue #529 defines:

- email/password: confirmed after `email_confirmed_at`;
- phone: confirmed after `phone_confirmed_at` / verified OTP session;
- approved OAuth social account: confirmed from an authenticated approved provider identity (`custom:line`, later `facebook` when independently configured/accepted).

The Acquisition Dashboard must use the same provider-neutral account-verification meaning when it labels a signup as confirmed.

## Aggregate pre-change evidence

A privacy-safe aggregate Auth read before this source change found:

| Provider | Identities | Distinct users | Email-confirmed users | Phone-confirmed users |
|---|---:|---:|---:|---:|
| `custom:line` | 1 | 1 | 0 | 0 |
| `email` | 7 | 7 | 4 | 0 |

This demonstrates the reporting gap without retaining any user ID, email, provider subject, token or other account-level identifier: the controlled verified LINE identity cannot be counted by an email-only predicate.

## Source correction

`supabase/functions/acquisition-api/index.ts` now uses an explicit provider-neutral helper:

- `email_confirmed_at` => confirmed;
- `phone_confirmed_at` => confirmed;
- an Auth identity whose provider is in the explicit approved social allowlist `custom:line` / `facebook` => confirmed;
- arbitrary provider profile fields, display names, emails or client payloads are not used as confirmation evidence.

The helper is applied to both:

- account-window `confirmedSignups` / source-campaign-content confirmation rates;
- product-window confirmed-attributed signup calculations.

The API also returns a non-sensitive confirmation-definition label. The owner dashboard wording changes from email-only `ยืนยันอีเมล` to `ยืนยันวิธีเข้าสู่ระบบ` and explains the provider-neutral definition.

## Security and truth boundaries preserved

- Owner access remains authenticated and allowlisted through `admin_dashboard_owners`.
- The service-role credential remains server-side only and is not placed in browser HTML.
- Raw account rows are not returned to the dashboard.
- Campaign 3,000 eligibility remains explicitly excluded.
- Ad spend remains excluded.
- First-party account/acquisition/referral/product tables remain the reporting source alongside Supabase Auth.
- This reporting definition does not broaden provider rollout authorization.

**Production LINE remains disabled** until the separate physical account-isolation, network/failure, accessibility, post-integration email/recovery regression and supported-device gates close. Facebook and Phone remain independently gated.

## Deployment verification still required

After source CI passes and the change is merged, the controlled deployment follow-up must record:

1. the new `acquisition-api` deployed version and bundle SHA;
2. that the deployment preserves the existing custom bearer/Owner authorization boundary;
3. aggregate provider-neutral confirmation corroboration from Auth data without retaining PII;
4. whether an authenticated Owner dashboard runtime session was directly exercised; if no Owner token/session is available to this work session, that item remains explicitly not tested rather than inferred.

No deployment or runtime PASS is claimed by this source-preparation status.
