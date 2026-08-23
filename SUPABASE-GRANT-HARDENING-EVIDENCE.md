# Kinaraidee — Supabase Grant Hardening Evidence

Date: 2026-08-23

This record captures scoped database/Data API hardening for the connected Kinaraidee Supabase project. It does not replace `CURRENT-RELEASE.md` or close the remaining Production Security / Commercial gates.

## Why this change was needed

A read-only inspection found the built-in `anon` and `authenticated` roles had broader public-relation privileges than the active RLS/application operation set required.

RLS still constrained rows, but least-privilege relation grants provide an additional Data API boundary and reduce accidental exposure if policy/configuration changes later.

## Applied live grant contract

Migration `20260823134036 / least_privilege_public_table_grants` reduced browser-facing grants for six tables:

| Relation | `anon` | `authenticated` |
| --- | --- | --- |
| `beta_feedback` | `INSERT` | `SELECT, INSERT` |
| `partner_applications` | `INSERT` | `INSERT` |
| `restaurant_requests` | `INSERT` | `INSERT` |
| `member_profiles` | none | `SELECT, INSERT, UPDATE` |
| `member_food_history` | none | `SELECT, INSERT, DELETE` |
| `user_food_history` | none | `SELECT, INSERT, DELETE` |

Migration `20260823135244 / revoke_public_partner_opportunity_summary_grants` then revoked all direct `anon` / `authenticated` grants from the analytics view `partner_opportunity_summary`.

Post-change inspection confirms:

- `partner_opportunity_summary` has `security_invoker=true`;
- `anon` SELECT on the view = false;
- `authenticated` SELECT on the view = false;
- `service_role` SELECT on the view = true;
- `anon` / `authenticated` SELECT on its source table `restaurant_search_demand` = false;
- `service_role` SELECT on `restaurant_search_demand` = true.

`service_role` privileges were not revoked. No table data, RLS policy, Edge Function, browser/PWA runtime asset, sequence or Auth setting was changed by these migrations.

## Live grant verification

A read-only expected-privilege matrix checked 50 table/view privilege assertions across `anon` and `authenticated`; result: **0 mismatches**.

The active policy commands remain aligned with the intended operations for the six browser-facing tables:

- public submission policies are INSERT-only for `beta_feedback`, `partner_applications` and `restaurant_requests`, with authenticated feedback SELECT retained for the authorized dashboard/own-row path;
- `member_profiles` policies are authenticated SELECT/INSERT/UPDATE own-row;
- `member_food_history` and `user_food_history` policies are authenticated SELECT/INSERT/DELETE own-row.

This verifies the live grant/policy shape but is not a complete authenticated JWT/RLS negative-test suite.

## Live anonymous Data API negative probe

PR #109 added `.github/workflows/supabase-anon-access-probe.yml` and merged at `f337d35cfa2fbe71719ec6fde022807d08ef7443`.

The workflow:

- runs every 12 hours, on its grant/workflow changes, and manually;
- uses GET only;
- first validates the public Supabase project/publishable-key path with a non-mutating Auth settings HTTP 200 positive control;
- then requires anonymous SELECT to return HTTP 401/403 for 16 public relations that must not expose rows directly;
- never prints response bodies, including on failure.

Canonical post-merge main evidence:

- workflow: `Supabase Anonymous Data API Access Probe`;
- run ID: `32643996631`;
- exact main SHA: `f337d35cfa2fbe71719ec6fde022807d08ef7443`;
- conclusion: **success**;
- job ID: `97205302130`;
- all 16 checked relations returned HTTP 401 for anonymous SELECT:
  - `admin_dashboard_owners`
  - `admin_dashboard_tokens`
  - `beta_feedback`
  - `group_rooms`
  - `group_votes`
  - `member_food_history`
  - `member_profiles`
  - `partner_applications`
  - `partner_audit_log`
  - `partner_clicks`
  - `partner_conversions`
  - `partner_opportunity_summary`
  - `partner_restaurants`
  - `restaurant_requests`
  - `restaurant_search_demand`
  - `user_food_history`

PR #110 was a temporary read-only Actions-metadata diagnostic used to trace the exact main run and was closed without merge after evidence capture.

## Advisor re-check after grant/view hardening

Security Advisor was re-run after the live changes:

- remaining WARN: `Leaked Password Protection Disabled`;
- visible RLS-enabled/no-policy findings are INFO-only deny-by-default tables;
- no new Security Advisor WARN was introduced by the grant/view hardening.

Performance Advisor was also re-run. Current visible findings are INFO-only unused-index notices; no index was dropped as part of this work.

## Repository contract

`supabase/least-privilege-public-table-grants.sql` records the current relation-grant contract, including the non-public analytics view. `.github/workflows/supabase-grant-contract-regression.yml` statically protects that contract and guards the live anonymous probe against mutating requests or response-body output.

## Evidence boundary

This establishes:

- live least-privilege relation grants for the named browser-facing tables/view;
- a live anonymous SELECT negative boundary across 16 public relations;
- advisor re-check evidence after the hardening.

It does **not** prove:

- every authenticated per-user RLS path or cross-user denial through a real JWT/Data API session;
- privileged backend authorization correctness beyond the inspected grants;
- Supabase Auth leaked-password protection;
- branch protection / required-check enforcement;
- Group API retention, full abuse controls, application-event ingestion or monitoring ownership;
- full Public Beta device/accessibility acceptance;
- Production legal/operations/payment/partner readiness;
- Commercial GO.

Any future schema/RLS/client-operation change should re-check both Postgres grants, live Data API negative probes and RLS policies before this evidence is reused.
