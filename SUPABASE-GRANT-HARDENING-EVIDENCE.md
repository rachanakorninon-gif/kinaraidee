# Kinaraidee — Supabase Grant Hardening Evidence

Date: 2026-08-23

This record captures a scoped database hardening step for the connected Kinaraidee Supabase project. It does not replace `CURRENT-RELEASE.md` or close the remaining Production Security / Commercial gates.

## Why this change was needed

A read-only inspection found the built-in `anon` and `authenticated` roles still had broad table privileges (`SELECT`, `INSERT`, `UPDATE`, `DELETE`, `TRUNCATE`, `REFERENCES`, `TRIGGER`) on several public tables even though the active RLS policies permit only a much smaller operation set.

RLS still constrained rows, but least-privilege table grants provide an additional Data API boundary and reduce accidental exposure if policy/configuration changes later.

## Applied live grant contract

The connected project was changed only at the Postgres table-grant layer for these six tables:

| Table | `anon` | `authenticated` |
| --- | --- | --- |
| `beta_feedback` | `INSERT` | `SELECT, INSERT` |
| `partner_applications` | `INSERT` | `INSERT` |
| `restaurant_requests` | `INSERT` | `INSERT` |
| `member_profiles` | none | `SELECT, INSERT, UPDATE` |
| `member_food_history` | none | `SELECT, INSERT, DELETE` |
| `user_food_history` | none | `SELECT, INSERT, DELETE` |

The operation set mirrors the existing RLS-policy commands and intended app access paths. `service_role` privileges were not changed. No table data, RLS policy, Edge Function, browser/PWA runtime asset, sequence or Auth setting was changed.

## Verification performed

1. Before applying the change, the exact `REVOKE`/`GRANT` statements were executed inside a transaction and rolled back. The resulting temporary privilege matrix matched the target contract.
2. The same statements were then applied as the Supabase migration `least_privilege_public_table_grants`.
3. A post-change read-only query of `information_schema.role_table_grants` confirmed the live `anon` / `authenticated` privilege matrix matches the table above.
4. Security Advisor was re-run. The remaining WARN is `Leaked Password Protection Disabled`; the visible RLS-with-no-policy findings are INFO-only deny-by-default tables. No new Security Advisor warning was introduced by this grant hardening.
5. Performance Advisor was re-run. Visible findings are INFO-only unused-index notices; no index was dropped as part of this change.

## Repository contract

`supabase/least-privilege-public-table-grants.sql` records the applied grant contract. `.github/workflows/supabase-grant-contract-regression.yml` statically protects that contract from drifting back to `GRANT ALL` or mixing RLS-policy disablement into the same file.

## Evidence boundary

This establishes live table-grant least-privilege evidence for the six named tables only. It does **not** prove:

- negative authorization tests for every RLS path;
- Supabase Auth leaked-password protection;
- branch protection / required-check enforcement;
- Group API retention, full abuse controls, application-event ingestion or monitoring ownership;
- full Public Beta device/accessibility acceptance;
- Production legal/operations/payment/partner readiness;
- Commercial GO.

Any future schema/RLS/client-operation change should re-check both Postgres grants and RLS policies before this evidence is reused.
