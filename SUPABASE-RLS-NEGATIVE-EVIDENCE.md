# Supabase Authenticated RLS Negative Evidence

Status: **SCOPED PASS / READ + CROSS-USER MUTATION NEGATIVE EVIDENCE**

Evidence date: 2026-08-23
Repository baseline reviewed: `670307f7ce87155768eb3afb60fdb9ee6bd8443a`
Supabase project: Kinaraidee production project

## Purpose

Verify that current Supabase grants and Row Level Security policies prevent an authenticated user from reading or mutating another user's rows on owner-scoped member/profile/history/feedback surfaces.

The member identity used for the probe is intentionally omitted from repository evidence. No row contents were copied into GitHub.

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

## Live authenticated read negative probe

A single existing member identity was selected internally only for the SQL session. The probe began a transaction, switched the local Postgres role to `authenticated`, set request JWT claims for that member, executed SELECT/count queries, and rolled back.

Observed results:

| Surface | Own-scope rows visible | Other-user rows visible |
| --- | ---: | ---: |
| `member_profiles` | 1 | **0** |
| `member_food_history` | 4 | **0** |
| `user_food_history` | 0 | **0** |
| `beta_feedback` | 2 | **0** |

Result: **no cross-user rows were visible in the tested authenticated read paths**.

## Cross-user mutation negative probe

A second transaction used the same authenticated identity and deliberately targeted only rows whose `user_id` belonged to another user.

The statements were constrained so a correct RLS policy must make the target set invisible before mutation. The transaction was rolled back after the checks.

Observed affected-row counts:

| Attempt | Other-user rows affected |
| --- | ---: |
| `member_profiles` UPDATE | **0** |
| `member_food_history` DELETE | **0** |
| `user_food_history` DELETE | **0** |

Result: **the tested authenticated identity could not update/delete another user's rows in the exercised mutation paths**.

No own-row UPDATE/DELETE was performed by this probe.

## Anonymous boundary already covered separately

The repository already contains `Supabase Anonymous Data API Access Probe`, which uses GET-only requests against the live Data API and requires HTTP 401/403 for relations that must not expose rows anonymously. That probe intentionally never prints response bodies.

This authenticated SQL evidence complements that anonymous live boundary; it does not replace it.

## Evidence boundary

This scoped PASS means only:

- current grants/RLS metadata match the reviewed owner-scoped design;
- the tested authenticated identity could not SELECT another user's rows from the four tested read surfaces; and
- the tested cross-user UPDATE/DELETE attempts affected zero rows on the three exercised mutation paths.

It does **not** prove:

- cross-user INSERT rejection or every mutation shape;
- every authenticated user/session or every future schema state;
- admin authorization behavior beyond the policy metadata review;
- Auth leaked-password protection;
- Group API application-event monitoring, retention cleanup, or complete abuse controls;
- real-device behavior, Public Beta completion, or Commercial GO.

Any future RLS/grant/authorization change should re-run equivalent negative probes and Supabase Security Advisor before this evidence is treated as current.
