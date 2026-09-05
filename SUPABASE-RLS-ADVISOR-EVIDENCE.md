# Supabase RLS Advisor Evidence

Date: 2026-09-06 (Asia/Bangkok)
Project: Kinaraidee

## Scope

Read-only verification of current Supabase Security Advisor findings. This record does not change schema, grants, RLS policies, Auth configuration, browser runtime, or production behavior.

## Advisor observation

Security Advisor currently reports `rls_enabled_no_policy` INFO findings for these public tables:

- `admin_dashboard_owners`
- `admin_dashboard_tokens`
- `group_api_event_observations`
- `group_rooms`
- `group_votes`
- `member_acquisition_attribution`
- `member_referral_codes`
- `member_referrals`
- `partner_audit_log`
- `partner_clicks`
- `partner_conversions`
- `partner_restaurants`
- `product_acquisition_events`
- `product_measurement_meta`
- `restaurant_search_demand`

The same Advisor check still reports `auth_leaked_password_protection` as WARN. That Auth warning remains OPEN and is not reclassified by this evidence.

## Read-only grant verification

A direct catalog/privilege query verified, for every table listed above:

- RLS is enabled.
- `anon` has no SELECT, INSERT, UPDATE, or DELETE table privilege.
- `authenticated` has no SELECT, INSERT, UPDATE, or DELETE table privilege.

Therefore the current `rls_enabled_no_policy` INFO findings are consistent with an intentional deny-by-default table boundary for browser roles. This evidence does not prove that every privileged server-side path is correct and does not replace Edge Function/API authorization tests.

## Evidence boundary

This record supports only the statement that the listed tables are not directly granted CRUD access to `anon` or `authenticated` at the time of verification. It must not be used to claim:

- blanket Supabase Security PASS;
- full RLS/security review completion;
- leaked-password protection PASS;
- Public Beta completion;
- Commercial GO;
- partner/payment/user-growth evidence.

No production mutation was performed during this verification.
