# Supabase Authenticated RLS Negative Evidence

Status: **SCOPED PASS / READ-ONLY EVIDENCE**

Evidence date: 2026-08-23
Repository baseline reviewed: `9c10da911fa6f960a486f87136deed38a27b6ac2`
Supabase project: Kinaraidee production project

## Purpose

Verify that current Supabase grants and Row Level Security policies prevent an authenticated user from reading another user's rows on the member/profile/history/feedback surfaces that are intended to be owner-scoped.

This record is deliberately limited to read-only authorization evidence. It does not create, update, delete, or expose user data.

## Documentation basis

Current Supabase guidance treats grants and RLS as separate layers: grants decide whether a Postgres role can reach an object, while RLS decides which rows that role may access. Tables in exposed schemas should have RLS enabled and public roles should receive only required privileges.

## Live metadata inspection

A read-only catalog query verified all current `public` base tables have RLS enabled.

For the owner-scoped tables exercised in the authenticated probe:

- `member_profiles`: authenticated SELECT/INSERT/UPDATE granted; policies scope SELECT/INSERT/UPDATE to `auth.uid() = user_id`.
- `member_food_history`: authenticated SELECT/INSERT/DELETE granted; policies scope those operations to `auth.uid() = user_id`.
- `user_food_history`: authenticated SELECT/INSERT/DELETE granted; policies scope those operations to `auth.uid() = user_id`.
- `beta_feedback`: authenticated SELECT/INSERT granted; SELECT permits the row owner or the existing private admin-owner check, and INSERT only permits an unowned row or the authenticated user's own `user_id`.

Server-side / deny-by-default tables including Group API storage and partner analytics/audit surfaces remain without direct anon/authenticated SELECT grants where direct browser access is not required.

## Live authenticated negative probe

A single existing member identity was selected internally only for the duration of the SQL session. The identity value was **not copied into this repository evidence**.

The probe then:

1. Began a transaction.
2. Switched the local Postgres role to `authenticated`.
3. Set request JWT claims for that one existing member identity.
4. Performed SELECT/count queries only.
5. Counted visible own rows and separately counted any visible rows whose `user_id` belonged to another user.
6. Rolled the transaction back.

Observed results:

| Surface | Own-scope rows visible | Other-user rows visible |
| --- | ---: | ---: |
| `member_profiles` | 1 | **0** |
| `member_food_history` | 4 | **0** |
| `user_food_history` | 0 | **0** |
| `beta_feedback` | 2 | **0** |

Result: **no cross-user rows were visible in the tested authenticated read paths**.

## Anonymous boundary already covered separately

The repository already contains `Supabase Anonymous Data API Access Probe`, which uses GET-only requests against the live Data API and requires HTTP 401/403 for relations that must not expose rows anonymously. That probe intentionally never prints response bodies.

This authenticated SQL probe complements that anonymous live boundary; it does not replace it.

## Evidence boundary

This scoped PASS means only:

- current read grants/RLS metadata match the reviewed owner-scoped design; and
- the tested authenticated identity could not SELECT another user's rows from the four tested surfaces at the time of the probe.

It does **not** prove:

- INSERT/UPDATE/DELETE negative paths end-to-end;
- every authenticated user/session or every future schema state;
- admin authorization behavior beyond the policy metadata review;
- Auth leaked-password protection;
- Group API application-event monitoring, retention cleanup, or complete abuse controls;
- real-device behavior, Public Beta completion, or Commercial GO.

Any future RLS/grant/authorization change should re-run an equivalent negative probe and Supabase Security Advisor before the evidence is treated as current.
