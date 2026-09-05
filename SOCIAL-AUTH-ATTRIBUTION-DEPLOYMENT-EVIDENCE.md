# Social Auth Attribution Claim Deployment Evidence

Date: 2026-09-05

Scope: deployment-only evidence for the server-side social/phone acquisition claim path prepared by PR #531. This does **not** enable any Production login provider or close live acceptance gates.

## Source lineage

- Repository `main` before evidence commit: `f08149d019045feae7779a3ff2bf24cdca87681e` (merge of PR #531).
- Database source: `supabase/social-auth-attribution-claim-v1.sql` from that lineage.
- Edge source: `supabase/functions/member-acquisition-claim/index.ts` from that lineage.

## Applied database migration

- Supabase project: Kinaraidee production project.
- Migration version: `20260905125841`.
- Migration name: `social_auth_attribution_claim_v1`.
- Apply result: success.
- Pre-apply read-only check confirmed `claim_member_acquisition_internal(uuid,text,text,text,text,text,text)` did not exist.
- Post-apply privilege inspection showed EXECUTE only for `postgres` and `service_role`; browser roles were not granted EXECUTE.
- Post-apply catalog inspection showed `security_definer = false` and `search_path=""`, preserving the reviewed `SECURITY INVOKER` boundary.

## Edge deployment

- Function: `member-acquisition-claim`.
- Status: ACTIVE.
- Version: 1.
- `verify_jwt`: true.
- Bundle SHA-256: `d6badfe96a8b71cf3b141bc7c949dd62c60ce47b413e7ad801c43e6b7fd80162`.
- Production `member.html` remains unwired by the PR #531 source contract; provider rollout flags remain disabled.

## Security Advisor after deployment

A fresh Security Advisor run reported only the existing deny-by-default `RLS enabled / no policy` INFO entries and the existing leaked-password-protection WARN. No new function-related security WARN was introduced by this deployment.

## Acceptance boundary

This evidence completes only the Issue #529 item "apply the reviewed database/Edge pieces in a controlled environment with rollback trace" at the deployment/configuration layer. The rollback source remains `supabase/social-auth-attribution-claim-v1-rollback.sql`.

Still OPEN and **not** claimed by this document:

- negative authenticated live tests for malformed input, repeat claim, self-referral and invalid referral;
- controlled fresh LINE signup proving exactly-once first-touch attribution without PII evidence;
- returning LINE login first-touch immutability;
- post-deployment email/password signup attribution regression;
- physical cross-account isolation, failure, accessibility and remaining device gates;
- Production LINE/Facebook/Phone UI enablement;
- Public Beta completion or Commercial GO;
- any user-growth, conversion, revenue, partner or campaign-eligibility claim.

No test user, conversion, revenue, payment, partner result, referral code, email, token, provider subject or user identifier is created or recorded by this evidence commit.
