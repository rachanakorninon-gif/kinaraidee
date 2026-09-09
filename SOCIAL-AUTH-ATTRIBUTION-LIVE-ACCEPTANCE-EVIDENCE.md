# Social Auth Attribution Live Acceptance Evidence

Date: 2026-09-09

Status: **PASS — ATTRIBUTION / IDEMPOTENCY / NEGATIVE GUARDS / EMAIL REGRESSION ACCEPTED / PROVIDER UI STILL DISABLED**

Scope: canonical acceptance evidence for the controlled social-auth acquisition/referral path tracked in Issue #529. This closes the attribution-specific acceptance work only. It does **not** authorize Production provider UI enablement, Public Beta completion or Commercial GO.

## Source and deployment lineage

- PR #531 prepared the reviewed atomic database claim + authenticated Edge source.
- PR #532 recorded Production migration `20260905125841 / social_auth_attribution_claim_v1` and `member-acquisition-claim` ACTIVE v1 with `verify_jwt=true`.
- PR #572 added the noindex controlled LINE attribution QA page.
- PR #574 added QA-page Pages deployment plumbing without Production wiring or Service Worker caching.
- PR #575 fixed QA-only OAuth callback-state persistence/resume after the fresh external LINE round trip.
- PR #576 added the authenticated Edge negative-guard probe for forged `user_id` and malformed acquisition input.
- PR #573 added a non-mutating deployed-endpoint live smoke for missing/malformed bearer-token rejection and synchronized the deployment-status guards.

Production `member.html` remains email/password only; LINE/Facebook/Phone rollout flags remain disabled.

## Controlled fresh and returning LINE acceptance

Aggregate-only evidence from the controlled run established:

- exactly one controlled `custom:line` Auth user and one `custom:line` identity;
- exactly one original first-touch attribution row with the isolated QA source `qa_line`;
- returning LINE login/claim returned `already_claimed`;
- no `qa_line_return` first-touch row was created;
- the original first-touch attribution remained unchanged.

Result: **Fresh exactly-once attribution PASS / Returning first-touch preservation PASS**.

No account ID, email, provider subject, bearer token, IP address or raw referral code is retained in this evidence.

## Negative acceptance

Authenticated Edge request-boundary evidence:

- forged client-supplied `user_id` -> `unknown_field`;
- malformed acquisition input -> `invalid_input`;
- controlled repeat claim -> `already_claimed`.

Rollback-only live DB/RPC negative probes against the controlled LINE path additionally established:

- self-referral -> `claimed_self_referral_rejected`, no referral relation recorded;
- syntactically valid but unresolved referral -> `claimed_referral_unresolved`, no referral relation recorded;
- the original first-touch row remained intact and no persistent test mutation remained after rollback.

Result: **Negative acceptance PASS** for the Issue #529 attribution contract.

## Email/password attribution regression

A rollback-only synthetic `auth.users` trigger exercise after the social-claim rollout verified the existing email/password path still:

- captures the reviewed allowlisted UTM + referral first-touch metadata on signup;
- generates the normal random referral-code row;
- creates the referral as `pending` before email confirmation;
- transitions the referral to `confirmed` only after `email_confirmed_at` becomes non-null;
- leaves zero persistent synthetic QA users and zero persistent `qa_email` attribution rows after rollback.

Result: **Email/password attribution regression PASS**.

## Final privilege and security re-check

The post-acceptance read-back confirmed:

- `anon` EXECUTE on `public.claim_member_acquisition_internal(...)` = false;
- `authenticated` EXECUTE on the internal claim RPC = false;
- direct browser-role access to the raw acquisition/referral growth tables remains denied;
- controlled LINE identity/user counts remain one/one;
- original `qa_line` first-touch row remains one and `qa_line_return` remains zero;
- persistent synthetic `qa_email` rows remain zero.

Fresh Supabase Security Advisor still reports the separate `Leaked Password Protection Disabled` warning. That warning is tracked independently and is not reclassified by this acceptance. No new claim-function security warning was introduced.

## Production rollout boundary

Attribution parity is accepted for the controlled LINE path, but **Production LINE remains disabled**. The following provider-rollout gates remain separate:

- physical cross-account profile/history/favorite/referral isolation;
- network/provider failure and retry UX;
- accessibility of the actual integrated LINE button flow;
- existing email/password/recovery regression after eventual LINE UI integration;
- Safari/Chrome coverage plus at least one LINE-app-installed context, with in-app-browser behavior recorded separately where applicable.

Phone OTP and Facebook remain independently gated by their own provider configuration, cost/external prerequisites and acceptance evidence.

This document does not establish real-user growth, referral conversion, Campaign 3,000 eligibility, payment readiness, paid subscribers, partner outcomes, revenue, Public Beta completion or Commercial GO.
