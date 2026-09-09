# Kinaraidee — Social Auth Attribution Parity Design

Status: **SERVER-SIDE DEPLOYED / ATTRIBUTION LIVE ACCEPTED / PROVIDER UI DISABLED**

Related: Issue #529, Issue #526, PR #525, PR #528, PR #530, PR #531, PR #532, PR #572, PR #573, PR #574, PR #575, PR #576.

Deployment evidence: `SOCIAL-AUTH-ATTRIBUTION-DEPLOYMENT-EVIDENCE.md`.

Live acceptance evidence: `SOCIAL-AUTH-ATTRIBUTION-LIVE-ACCEPTANCE-EVIDENCE.md`.

## Problem statement

Email/password signup can attach the reviewed first-touch acquisition fields directly through Supabase `signUp(... data: metadata)`, so the existing `auth.users` insert trigger sees those fields when the account row is created.

OAuth/social signup is different: the external provider callback creates the Supabase Auth user before Kinaraidee can attach the browser-captured first-touch metadata. Controlled LINE evidence originally demonstrated the resulting gap without retaining user-level data. The reviewed post-auth claim path now closes that gap for the controlled LINE acceptance flow while keeping provider rollout disabled.

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
9. **Provider rollout stays disabled.** The server-side claim path may be deployed and attribution-accepted behind a non-user-visible boundary, but the Production LINE/Facebook/Phone buttons remain disabled until the full provider acceptance gate closes.
10. **Signup-time claim only.** Social/phone attribution may be claimed only in the immediate post-auth signup handoff, not retroactively on an old account's later campaign login.

## Provider-neutral confirmation rule

For attribution/referral measurement, `confirmed` means **the referred account has completed verification of at least one authentication method**, not specifically that an email address has been confirmed.

Application of that rule:

- Email/password account: confirmed only after `email_confirmed_at` becomes non-null, preserving current behavior.
- OAuth social account (LINE/Facebook): the post-auth attribution claim executes only from an already authenticated OAuth session; a referral created by that successful claim may be created as `confirmed` with `confirmed_at = now()`.
- Phone OTP account: the post-auth claim executes only after OTP verification produced an authenticated session; a referral created by that successful claim may likewise be created as `confirmed` with `confirmed_at = now()`.

This rule is narrower than “any `auth.users` row is confirmed” and avoids relying on `auth.users.confirmed_at`, which is not populated for the controlled email-optional LINE account.

The acquisition dashboard must eventually use the same provider-neutral definition when reporting confirmed signups. Until that change is implemented and verified, existing dashboard confirmation metrics must not be interpreted as complete social-auth confirmation metrics.

## Deployed server-side contract

Prepared in PR #531 and deployed/configuration-evidenced in PR #532:

- database source: `supabase/social-auth-attribution-claim-v1.sql`
- rollback: `supabase/social-auth-attribution-claim-v1-rollback.sql`
- Edge source: `supabase/functions/member-acquisition-claim/index.ts`
- deployment evidence: `SOCIAL-AUTH-ATTRIBUTION-DEPLOYMENT-EVIDENCE.md`
- controlled live acceptance evidence: `SOCIAL-AUTH-ATTRIBUTION-LIVE-ACCEPTANCE-EVIDENCE.md`

Current production read-back on 2026-09-09 confirms the reviewed server-side boundary remains deployed: `member-acquisition-claim` is ACTIVE v1 with `verify_jwt=true`; `public.claim_member_acquisition_internal(...)` is `SECURITY INVOKER` with empty `search_path`; browser roles have no EXECUTE on the internal RPC and no direct access to the raw acquisition/referral tables. Deployment/configuration alone did not establish acceptance; the separate live evidence records the controlled fresh/returning LINE, negative and email/password regression acceptance.

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

A simple read-then-update is not sufficient because two callback tabs can race. The deployed database function therefore performs the row lock, first-touch update, referral resolution and referral insert in one database transaction.

The implementation is designed to be safe to retry after a network interruption:

- first successful claim populates the row;
- later/repeated claim observes a populated row and returns `already_claimed`;
- the referral table primary key on `referred_user_id` plus `ON CONFLICT DO NOTHING` prevents duplicate referred-user relationships.

## Acceptance cases and evidence boundary

Source/static checks must preserve these contracts:

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
- Production `member.html` and Service Worker remain unwired while provider UI rollout is disabled.

A rejection-only live smoke additionally proves that the deployed endpoint rejects missing and malformed bearer tokens without using a valid account token. That workflow remains non-mutating; the authenticated and rollback-only acceptance evidence is recorded separately in `SOCIAL-AUTH-ATTRIBUTION-LIVE-ACCEPTANCE-EVIDENCE.md`.

## Controlled live acceptance result

The Issue #529 attribution-specific acceptance work is now recorded as PASS for the controlled LINE path:

1. A fresh controlled LINE signup produced exactly one isolated first-touch `qa_line` attribution row.
2. The immediate post-auth claim was bound to the authenticated Supabase session server-side.
3. A returning LINE login/claim returned `already_claimed` and did not create `qa_line_return` attribution.
4. Authenticated Edge negatives rejected forged `user_id` and malformed acquisition input.
5. Rollback-only live DB/RPC negatives rejected self-referral and unresolved referral without persistent mutation.
6. Browser-role execute/direct raw growth-table access remained denied.
7. The post-rollout email/password attribution regression preserved UTM/referral capture, random referral-code generation and pending-to-confirmed email semantics, with no persistent synthetic QA rows.
8. The separate Supabase `Leaked Password Protection Disabled` warning remains open and is not reclassified by this acceptance.

The acquisition-dashboard provider-neutral confirmation calculation remains a separate reporting task. Controlled attribution acceptance must not be generalized into complete social-auth dashboard metrics until that reporting path is updated and verified.

## Production enablement boundary

Attribution parity acceptance does **not** authorize Production provider UI wiring. Issue #529 remains OPEN because physical/account-isolation/failure/accessibility/device rollout gates are still unresolved even though its attribution-specific acceptance items are complete.

Turning on LINE/Facebook/Phone buttons still requires the per-provider rollout gates, including physical account isolation, network/failure UX, accessibility, email-auth regression after UI integration and broader supported-device coverage.

Public Beta and Commercial readiness remain separate gates.
