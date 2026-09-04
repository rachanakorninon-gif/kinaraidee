# Kinaraidee — LINE Auth Controlled Evidence

Status: **CONTROLLED CONFIGURATION VERIFIED / PRODUCTION BUTTON DISABLED**

Date: 2026-09-05 (Thailand local session)

## Scope

This file records privacy-minimal evidence for the LINE Login provider setup and controlled authentication checks. It does **not** authorize wiring the LINE button into the deployed member page or changing Public Beta / Commercial readiness.

## External/provider configuration verified

- LINE Login channel exists for Kinaraidee and remains in Developing status during controlled verification.
- Web callback is registered to the Supabase Auth callback URL.
- A previously exposed LINE Channel secret was rotated; the replacement secret is not recorded in repository evidence.
- Supabase custom provider identifier is `custom:line`.
- Hosted OIDC auto-discovery was tested first and failed interoperability during ID-token verification because the observed LINE token algorithm did not match the algorithm expected from discovery metadata.
- The provider was therefore recreated using Supabase **Manual OAuth2** configuration.
- Manual OAuth2 endpoints used:
  - issuer: `https://access.line.me`
  - authorization: `https://access.line.me/oauth2/v2.1/authorize`
  - token: `https://api.line.me/oauth2/v2.1/token`
  - userinfo: `https://api.line.me/oauth2/v2.1/userinfo`
- Initial controlled scopes: `openid, profile`.
- Email is optional for this controlled LINE path. No LINE email permission is claimed.

## Controlled authentication evidence

The controlled Android Chrome session established the following scoped results:

- **Authorization reachability PASS:** Supabase `custom:line` redirects to the LINE authorization surface.
- **Cancel/return usability PASS:** cancel/return exits the provider flow and leaves the Kinaraidee public app usable.
- **New LINE login PASS:** after starting from an explicitly signed-out Kinaraidee session, LINE authentication completed and Supabase Auth recorded a `custom:line` login.
- **Returning LINE login PASS:** repeating authentication with the same LINE account returned to the same existing Supabase Auth account rather than creating another controlled LINE identity.
- **User-initiated logout PASS:** logout after the controlled login returned the app to the signed-out member state.
- Aggregate-only backend verification after the controlled runs shows one `custom:line` identity mapped to one Supabase user. The existing email identities remain seven. No user IDs, provider subjects, emails, tokens, IP addresses, or secrets are retained here.
- Aggregate-only backend verification also shows the controlled LINE user currently has no email address, matching the intended email-optional test path.

## Supporting isolation checks completed without user data

Read-only database inspection confirms:

- `member_profiles` has authenticated-user RLS policies that scope SELECT/INSERT/UPDATE to `auth.uid() = user_id`.
- `member_food_history` has authenticated-user RLS policies that scope SELECT/INSERT/DELETE to `auth.uid() = user_id`.
- `member_referral_codes` and `member_referrals` have RLS enabled.
- `anon` / `authenticated` have no direct table grants on `member_referral_codes` or `member_referrals`; referral summary remains behind the authenticated Edge API.

These are structural safeguards only. They do **not** replace the required physical cross-account isolation acceptance test.

## Remaining blockers before Production LINE button enablement

The following gates remain OPEN:

- referral/acquisition attribution parity for a LINE-created account;
- physical cross-account profile/history/favorite/referral isolation acceptance;
- network/provider failure and retry UX;
- accessibility labels/focus/busy/error review on the actual LINE button flow;
- existing email/password/signup/recovery regression after LINE UI integration;
- supported-device coverage beyond the current controlled Android Chrome run, including Safari/Chrome coverage and at least one LINE-app-installed context, with in-app-browser behavior recorded separately;
- review of the user-facing privacy/consent implications if LINE email permission is ever requested later.

## Production boundary

- `prototype/auth-multi-provider/member-auth-multi-provider.js` remains outside the deployed browser/PWA runtime.
- All rollout flags must remain disabled by default.
- `member.html` and `sw.js` must not load/cache the prototype until the remaining LINE gates are explicitly closed with evidence.
- Existing email/password remains the Production member authentication path.
- Public Beta remains separate and must not be inferred from this controlled provider evidence.
