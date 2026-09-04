# Kinaraidee — Social Auth Attribution Parity Design

Status: **DESIGN APPROVED FOR SOURCE PREPARATION / NOT DEPLOYED**

Related: Issue #529, Issue #526, PR #525, PR #528.

## Problem statement

Email/password signup can attach the reviewed first-touch acquisition fields directly through Supabase `signUp(... data: metadata)`, so the existing `auth.users` insert trigger sees those fields when the account row is created.

OAuth/social signup is different: the external provider callback creates the Supabase Auth user before Kinaraidee can attach the browser-captured first-touch metadata. Controlled LINE evidence demonstrates the resulting gap without retaining user-level data:

- one `custom:line` identity / one Supabase user exists;
- one `member_acquisition_attribution` row exists from the normal new-user trigger;
- that row has no populated reviewed UTM/referral field;
- one random referral-code row exists for the LINE user;
- no referred-user relationship exists.

Therefore a working provider login is not attribution parity.

## Required invariants

Any implementation must preserve all of these:

1. **Authenticated subject only.** The server derives the target user from the verified Supabase bearer token. The request must not accept a user ID.
2. **Reviewed first-touch allowlist only.** Accepted fields are exactly `utm_source`, `utm_medium`, `utm_campaign`, `utm_content`, and `referral_code`, with the same format/length bounds already used by `data/acquisition.js` and the database schema.
3. **Exactly-once first touch.** A returning login must not overwrite an existing populated attribution row.
4. **No provider-profile trust.** LINE/Facebook display name, email, subject, picture or other provider metadata is never acquisition input.
5. **Server-side referral resolution.** The browser supplies at most the reviewed public referral code; the server resolves its owner and rejects invalid/self referral.
6. **No raw growth-table browser access.** Existing RLS/revokes remain unchanged; the browser uses an authenticated Edge endpoint only.
7. **Campaign boundary.** Acquisition/referral measurement remains separate from Campaign 3,000 eligibility truth.
8. **No token/identity evidence.** QA evidence remains aggregate-only and excludes Auth/provider tokens, subject IDs, account IDs, email, phone and raw referral codes.
9. **Provider rollout stays disabled.** The implementation can be prepared and deployed behind a non-user-visible path, but the Production LINE/Facebook/Phone buttons remain disabled until the full provider acceptance gate closes.

## Provider-neutral confirmation rule

For attribution/referral measurement, `confirmed` means **the referred account has completed verification of at least one authentication method**, not specifically that an email address has been confirmed.

Application of that rule:

- Email/password account: confirmed only after `email_confirmed_at` becomes non-null, preserving current behavior.
- OAuth social account (LINE/Facebook): the post-auth attribution claim executes only from an already authenticated OAuth session; a referral created by that successful claim may be created as `confirmed` with `confirmed_at = now()`.
- Phone OTP account: the post-auth claim executes only after OTP verification produced an authenticated session; a referral created by that successful claim may likewise be created as `confirmed` with `confirmed_at = now()`.

This rule is narrower than “any `auth.users` row is confirmed” and avoids relying on `auth.users.confirmed_at`, which is not populated for the controlled email-optional LINE account.

The acquisition dashboard must eventually use the same provider-neutral definition when reporting confirmed signups. Until that change is implemented and verified, existing dashboard confirmation metrics must not be interpreted as complete social-auth confirmation metrics.

## Proposed authenticated Edge contract

Candidate function name: `member-acquisition-claim`.

### Request

`POST` with bearer Auth token and JSON body containing only optional reviewed fields:

```json
{
  "utm_source": "...",
  "utm_medium": "...",
  "utm_campaign": "...",
  "utm_content": "...",
  "referral_code": "..."
}
```

The endpoint must reject unknown action/user/provider fields rather than silently storing them.

### Server steps

1. Enforce method/origin/content-size limits.
2. Verify bearer token with Supabase Auth and derive `user.id` server-side.
3. Normalize and validate each allowlisted acquisition field with the existing regex/length limits.
4. Read the user's existing `member_acquisition_attribution` row.
5. If any reviewed attribution field is already populated, return an idempotent `already_claimed` result and make no mutation.
6. Otherwise populate only currently-empty first-touch attribution fields for that user. Never replace a non-null reviewed field.
7. If no referral code was supplied, finish successfully.
8. If a referral code was supplied, resolve it server-side from `member_referral_codes`.
9. Ignore/reject an invalid referral and reject self-referral; do not expose the referral owner.
10. Insert one `member_referrals` row with `referred_user_id = authenticated user`, using `ON CONFLICT (referred_user_id) DO NOTHING`.
11. Determine referral confirmation from the authenticated method:
    - email identity without confirmed email => `pending`;
    - verified social/phone session claim => `confirmed` at claim time;
    - existing email-confirmation trigger continues to promote pending email referrals.
12. Return only a minimal result such as `claimed`, `already_claimed`, `referral_recorded`, never raw attribution/referral rows.

## Concurrency and idempotency

A simple read-then-update is not sufficient by itself because two callback tabs could race. The live implementation must use a database-side atomic contract, for example an RPC available only to `service_role`, that:

- locks or conditionally updates the user's attribution row only if all reviewed attribution columns are still null;
- resolves/inserts the referral relationship in the same transaction;
- returns only a small status enum;
- is safe to retry after network interruption.

The Edge Function should authenticate/origin-bound the request and call this service-role-only atomic database contract.

## Negative acceptance cases

Before deployment, automated tests must prove:

- forged `user_id` in the JSON body is rejected/ignored and cannot target another account;
- unknown fields are not persisted;
- malformed/overlong UTM/referral values are rejected or normalized to null according to the approved contract;
- invalid referral does not create a relationship;
- self referral does not create a relationship;
- repeat claim cannot overwrite first-touch attribution;
- concurrent repeat claims create at most one referral relationship;
- raw referral/acquisition tables remain inaccessible to `anon` and `authenticated`;
- the endpoint does not log request body, token, user ID or referral code;
- existing email signup trigger behavior remains unchanged.

## Controlled live acceptance plan

After source review and deployment behind the disabled provider UI:

1. Use a fresh controlled browser context with reviewed synthetic UTM/referral data that is isolated from marketing/campaign measurement.
2. Complete one new LINE signup through the controlled direct provider path.
3. Invoke the post-auth claim from the authenticated session.
4. Verify aggregate-only backend evidence: one LINE identity, one populated acquisition row for that controlled account, at most one referral relation, no duplicate on repeat login/claim.
5. Repeat returning-user login and claim; verify attribution does not change and no second referral relation appears.
6. Clean up only the controlled QA acquisition/referral rows if the existing evidence policy calls for cleanup; never delete the Auth account merely to manufacture a PASS unless an explicit test-account cleanup procedure authorizes it.
7. Re-run existing email/password signup attribution regression.

## Production enablement boundary

Closing Issue #529 alone is not sufficient to turn on LINE/Facebook/Phone buttons. The per-provider rollout document still requires physical account isolation, network/failure UX, accessibility, email-auth regression after UI integration and broader supported-device coverage.

Public Beta and Commercial readiness remain separate gates.
