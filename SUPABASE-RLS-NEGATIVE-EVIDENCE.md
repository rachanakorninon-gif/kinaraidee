# Supabase Authenticated RLS Negative Evidence

Status: **SCOPED PASS / READ + CROSS-USER MUTATION NEGATIVE EVIDENCE**

Evidence date: 2026-08-24
Repository baseline reviewed before the new live probe: `a4087cd6d52e49168a1b49f3b066766a6a4d83d2`

Supabase project: Kinaraidee production project

## Purpose

Verify that current Supabase grants and Row Level Security policies prevent an authenticated user from reading or mutating another user's rows on owner-scoped member/profile/history/feedback surfaces.

The member identities used for the probes are intentionally omitted from repository evidence. No row contents or UUIDs were copied into GitHub.

## Documentation basis

Current Supabase guidance treats grants and RLS as separate layers: grants decide whether a Postgres role can reach an object, while RLS decides which rows that role may access. Tables in exposed schemas should have RLS enabled and public roles should receive only required privileges.

## Live metadata inspection

A read-only catalog query verified the reviewed `public` owner-scoped tables have RLS enabled and the expected role grants/policies remain present.

For the exercised tables:

- `member_profiles`: authenticated SELECT/INSERT/UPDATE granted; policies scope SELECT/INSERT/UPDATE to `auth.uid() = user_id`.
- `member_food_history`: authenticated SELECT/INSERT/DELETE granted; policies scope those operations to `auth.uid() = user_id`.
- `user_food_history`: authenticated SELECT/INSERT/DELETE granted; policies scope those operations to `auth.uid() = user_id`.
- `beta_feedback`: authenticated SELECT/INSERT granted; SELECT permits the row owner or the private admin-owner check, while INSERT permits an unowned row or the authenticated user's own `user_id`.

Server-side / deny-by-default tables remain outside direct browser access where direct access is not required.

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

## Cross-user UPDATE/DELETE negative probe

A second transaction used the same authenticated identity and deliberately targeted only rows whose `user_id` belonged to another user. The transaction was rolled back after the checks.

Observed affected-row counts:

| Attempt | Other-user rows affected |
| --- | ---: |
| `member_profiles` UPDATE | **0** |
| `member_food_history` DELETE | **0** |
| `user_food_history` DELETE | **0** |

Result: **the tested authenticated identity could not update/delete another user's rows in the exercised mutation paths**.

No own-row UPDATE/DELETE was performed by this probe.

## Cross-user INSERT negative probe — 2026-08-24

A fresh transaction selected two existing member identities internally: one as the authenticated actor and one as the target `user_id`. The identities were stored only in transaction-local settings and were not emitted in the query result or repository evidence.

The transaction then set the local Postgres role to `authenticated`, supplied request JWT claims for the actor, and attempted inserts whose `user_id` was the other member. Each attempt was wrapped so the exact SQLSTATE could be recorded without committing a row. The entire transaction was rolled back at the end.

Observed results:

| Attempt | SQLSTATE | RLS denial observed |
| --- | --- | --- |
| `member_profiles` INSERT with another member's `user_id` | `42501` | **YES** |
| `member_food_history` INSERT with another member's `user_id` | `42501` | **YES** |
| `user_food_history` INSERT with another member's `user_id` | `42501` | **YES** |
| `beta_feedback` INSERT with another member's `user_id` | `42501` | **YES** |

Result: **all four exercised cross-user INSERT attempts were rejected by Row Level Security**.

No probe row was intentionally retained; the transaction ended with `ROLLBACK`.

## Anonymous boundary already covered separately

The repository also contains `Supabase Anonymous Data API Access Probe`, which uses GET-only requests against the live Data API and requires denial for relations that must not expose rows anonymously. That probe intentionally never prints response bodies.

This authenticated SQL evidence complements that anonymous live boundary; it does not replace it.

## Evidence boundary

This scoped PASS means only:

- current grants/RLS metadata match the reviewed owner-scoped design;
- the tested authenticated identity could not SELECT another user's rows from the four tested read surfaces;
- the tested cross-user UPDATE/DELETE attempts affected zero rows on the three exercised paths; and
- the four exercised cross-user INSERT attempts were rejected with SQLSTATE `42501`.

It does **not** prove:

- every INSERT payload/mutation shape or every owner-scoped table;
- a real browser/mobile authenticated-session lifecycle or token refresh/revocation behavior;
- every authenticated user/session or every future schema state;
- privileged-backend/service-role authorization behavior;
- admin authorization behavior beyond the current policy/helper review;
- Auth leaked-password protection;
- Group API application-event monitoring, retention cleanup, or complete abuse controls;
- real-device behavior, Public Beta completion, or Commercial GO.

Any future RLS/grant/authorization change should re-run equivalent negative probes and Supabase Security Advisor before this evidence is treated as current.
