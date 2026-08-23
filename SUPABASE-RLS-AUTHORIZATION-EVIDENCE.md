# Kinaraidee — Supabase RLS Authorization Evidence

Evidence date: 2026-08-23

This record captures database-side authorization verification for the connected Kinaraidee Supabase project after the least-privilege relation-grant hardening. It is intentionally scoped and does not replace real authenticated client/session tests or the remaining Production Security gates.

## Defect found

The existing `beta_feedback` authenticated SELECT policy allowed either an own-row match or an admin-owner lookup. The admin-owner branch referenced `public.admin_dashboard_owners` directly. Browser-facing roles intentionally have no direct SELECT privilege on that table, so a normal authenticated feedback read could fail with a permission error while evaluating the policy instead of simply returning the user's permitted rows.

## Live remediation

Two connected-project migrations were applied:

1. `20260823140943 / fix_beta_feedback_admin_select_rls_helper`
   - introduced `is_admin_dashboard_owner()` as a `STABLE SECURITY DEFINER` helper with `search_path=''`;
   - changed `feedback_select_authenticated` to use the helper rather than directly query the protected admin table.
2. `20260823141156 / move_feedback_admin_rls_helper_private`
   - moved the helper from the API-exposed `public` schema to `private`;
   - revoked anonymous access, retained only the authenticated usage/execute needed for RLS evaluation;
   - dropped the public helper after the policy was repointed.

The second migration was required because Security Advisor correctly warned that an authenticated-callable `SECURITY DEFINER` function in the public API schema was externally executable. Moving the helper to `private` removed that warning while preserving the intended policy behavior.

## Current live contract verified

Connected read-only inspection after the final migration confirms:

- `feedback_select_authenticated` applies to `authenticated` SELECT and resolves as own row OR `private.is_admin_dashboard_owner()`;
- the helper exists only in schema `private`;
- the helper is `SECURITY DEFINER`, `STABLE`, owned by the database owner role and has `search_path=''`;
- `anon` cannot execute the helper;
- `authenticated` can execute the helper as required by the RLS policy;
- the public-schema helper no longer exists;
- `anon` has no usage on the private schema;
- the protected `admin_dashboard_owners` table still has no direct browser-role SELECT grant.

## Database-side RLS simulations

The connected database was tested with role/JWT-claim simulation without retaining test mutations or exposing user identifiers in repository evidence.

Normal authenticated-user simulation returned all of the following as true:

- selected identity was present;
- `member_profiles` own-row scope matched exactly and cross-user rows were denied;
- `member_food_history` own-row scope matched exactly and cross-user rows were denied;
- `user_food_history` own-row scope matched exactly and cross-user rows were denied;
- the simulated normal user was not an admin dashboard owner;
- `beta_feedback` own-row scope matched exactly;
- cross-user and unowned feedback rows were denied to the normal user.

Admin-owner simulation returned all of the following as true:

- the private admin helper recognized the authorized dashboard-owner claim;
- the admin feedback SELECT scope matched the full feedback row set expected for that policy path.

These checks validate the live database policy semantics under simulated authenticated claims. They are not evidence of an external browser token/session, password flow, or device behavior.

## Security Advisor after remediation

A fresh Security Advisor check after moving the helper to `private` no longer reports the `authenticated_security_definer_function_executable` warning introduced by the intermediate public helper.

The remaining WARN is still:

- `auth_leaked_password_protection` — `Leaked Password Protection Disabled`.

Visible `rls_enabled_no_policy` findings remain INFO-level deny-by-default/server-side-table notices already tracked by the project.

## Repository guard

The final desired policy/helper state is recorded in:

- `supabase/beta-feedback-admin-rls-contract.sql`

and statically guarded by:

- `.github/workflows/supabase-feedback-rls-contract-regression.yml`

The guard rejects a return to a public helper, a direct browser-role admin-table grant, or direct admin-table evaluation from the feedback SELECT policy.

## Evidence boundary

This evidence supports the scoped database-side authenticated/RLS paths described above. It does **not** prove:

- every authenticated API operation or JWT/session lifecycle end-to-end;
- privileged backend/service-role authorization beyond the inspected boundaries;
- leaked-password protection;
- branch protection / required-check enforcement;
- Group API retention/abuse/monitoring completeness;
- real-device accessibility or full device-matrix acceptance;
- Production legal/operations/payment/partner readiness;
- full Public Beta PASS or Commercial GO.
