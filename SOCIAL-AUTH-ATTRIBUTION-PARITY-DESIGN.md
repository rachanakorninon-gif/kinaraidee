# Kinaraidee — Social Auth Attribution Parity Design

Status: **SOURCE PREPARED / NOT APPLIED OR DEPLOYED**

Related: Issue #529, Issue #526, PR #525, PR #528, PR #530.

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
9. **Provider rollout stays disabled.** Source may be prepared and later deployed behind a non-user-visible path, but the Production LINE/Facebook/Phone buttons remain disabled until the full provider acceptance gate closes.
10. **Signup-time claim only.** Social/phone attribution may be claimed only in the immediate post-auth signup handoff, not retroactively on an old account's later campaign login.

## Provider-neutral confirmation rule

For attribution/referral measurement, `confirmed` means **the referred account has completed verification of at least one authentication method**, not specifically that an email address has been confirmed.

Application of that rule:

- Email/password account: confirmed only after `email_confirmed_at` becomes non-null, preserving current behavior.
- OAuth social account (LINE/Facebook): the post-auth attribution claim executes only from an already authenticated OAuth session; a referral created by that successful claim may be created as `confirmed` with `confirmed_at = now()`.
- Phone OTP account: the post-auth claim executes only after OTP verification produced an authenticated session; a referral created by that successful claim may likewise be created as `confirmed` with `confirmed_at = now()`.

This rule is narrower than “any `auth.users` row is confirmed” and avoids relying on `auth.users.confirmed_at`, which is not populated for the controlled email-optional LINE account.

The acquisition dashboard must eventually use the same provider-neutral definition when reporting confirmed signups. Until that change is implemented and verified, existing dashboard confirmation metrics must not be interpreted as complete social-auth confirmation metrics.

## Prepared source contract

Prepared but not applied/deployed:

- database source: `supabase/social-auth-attribution-claim-v1.sql`
- rollback: `supabase/social-auth-attribution-claim-v1-rollback.sql`
- Edge source: `supabase/functions/member-acquisition-claim/index.ts`

The database contract is an internal `public.claim_member_acquisition_internal(...)` RPC with `SECURITY INVOKER`; execute is revoked from `public`, `anon` and `authenticated` and granted only to `service_role`. The public schema placement is solely so the service-role Edge client can call the RPC through the configured PostgREST API surface; browser roles receive no execute grant.

The Edge source verifies the bearer token with Supabase Auth, derives the user and approved auth method server-side, accepts only LINE/Facebook OAuth or Phone, and calls the internal RPC. It does not accept `user_id`, provider, token or arbitrary metadata fields in the JSON body.

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

The endpoint rejects unknown action/user/provider fields rather than silently storing them.

### Server steps

1. Enforce exact Kinaraidee Pages origin, POST-only behavior and a 4 KiB request-body limit.
2. Verify bearer token with Supabase Auth and derive `user.id` server-side.
3. Derive `oauth` only from current approved social provider identities (`custom:line`, `facebook`) or `phone` from a verified Phone identity; email-only sessions are not accepted by this endpoint.
4. Normalize and validate each allowlisted acquisition field with the existing regex/length limits.
5. Require the Auth account to be no older than **1 hour**. This is an explicit retry window for the immediate post-signup handoff and prevents an old account from being retroactively attributed on a later campaign login.
6. Ensure the user's `member_acquisition_attribution` row exists, then lock it with `FOR UPDATE` so competing callback/retry tabs serialize.
7. If any reviewed attribution field is already populated, return `already_claimed` and make no mutation.
8. Otherwise populate the reviewed first-touch fields exactly once.
9. If no referral code was supplied, finish successfully.
10. If a referral code was supplied, resolve it server-side from `member_referral_codes`.
11. Invalid/unresolved or self referral does not create a relationship and does not expose the referral owner.
12. Insert at most one `member_referrals` row with `ON CONFLICT (referred_user_id) DO NOTHING`.
13. Since this endpoint only accepts already-verified social/phone sessions, a referral successfully created through the claim is `confirmed` at claim time under the provider-neutral rule.
14. Return only a minimal status plus a boolean indicating whether a referral relation was inserted; never return raw attribution/referral rows.

## Concurrency and idempotency

A simple read-then-update is not sufficient because two callback tabs can race. The prepared database function therefore performs the row lock, first-touch update, referral resolution and referral insert in one database transaction.

The implementation is designed to be safe to retry after a network interruption:

- first successful claim populates the row;
- later/repeated claim observes a populated row and returns `already_claimed`;
- the referral table primary key on `referred_user_id` plus `ON CONFLICT DO NOTHING` prevents duplicate referred-user relationships.

## Negative acceptance cases

Before deployment, automated/source checks must prove:

- forged `user_id` in the JSON body cannot target another account because `user_id` is not an accepted body key;
- unknown fields are rejected;
- malformed/overlong UTM/referral values are rejected;
- invalid referral does not create a relationship;
- self referral does not create a relationship;
- repeat claim cannot overwrite first-touch attribution;
- concurrent repeat claims create at most one referral relationship;
- a claim from an account older than the one-hour signup window is rejected;
- an email-only session cannot use the social/phone claim endpoint;
- raw referral/acquisition tables remain inaccessible to `anon` and `authenticated`;
- the internal RPC is executable only by `service_role`;
- the endpoint does not log request body, token, user ID or referral code;
- existing email signup trigger behavior remains unchanged;
- Production `member.html` and Service Worker remain unwired from this source during the source-only phase.

## Controlled live acceptance plan

After source review, explicit migration application and Edge deployment behind the disabled provider UI:

1. Use a fresh controlled browser context with reviewed synthetic UTM/referral data that is isolated from marketing/campaign measurement.
2. Complete one new LINE signup through the controlled direct provider path.
3. Invoke the post-auth claim from the authenticated session.
4. Verify aggregate-only backend evidence: one LINE identity, one populated acquisition row for that controlled account, at most one referral relation, no duplicate on repeat login/claim.
5. Repeat returning-user login and claim; verify attribution does not change and no second referral relation appears.
6. Exercise invalid referral, self referral, malformed field, old-account claim and retry/concurrent claim negatives without retaining PII in evidence.
7. Re-run existing raw-table privilege checks and Security Advisor after migration/deployment.
8. Re-run existing email/password signup attribution regression.
9. Update acquisition-dashboard confirmation calculation to the same provider-neutral definition before interpreting social-auth confirmation metrics as complete.

## Production enablement boundary

Source preparation does not authorize migration application, Edge deployment or Production provider UI wiring. Issue #529 remains OPEN until live controlled attribution/retry/negative evidence and email regression are verified.

Closing Issue #529 alone is still not sufficient to turn on LINE/Facebook/Phone buttons. The per-provider rollout document also requires physical account isolation, network/failure UX, accessibility, email-auth regression after UI integration and broader supported-device coverage.

Public Beta and Commercial readiness remain separate gates.
