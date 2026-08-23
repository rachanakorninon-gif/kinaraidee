# Group API retention schema evidence

Evidence captured from the current Kinaraidee Supabase production project on 2026-08-23 to support Issue #45 retention/cleanup planning.

## What was inspected

Read-only PostgreSQL catalog queries were used. No rows, policies, functions, schedules, or schema objects were changed.

### `group_rooms`

- primary key: `id uuid`
- `created_at timestamptz NOT NULL DEFAULT now()`
- `expires_at timestamptz NOT NULL DEFAULT (now() + interval '24 hours')`
- current room status constraint allows `open` and `closed`
- room size constraint remains 2–6

The 24-hour default is a room-expiry behavior, **not an approved data-retention period**. Expiry and deletion remain separate decisions.

### `group_votes`

- `room_id uuid NOT NULL`
- unique `(room_id, voter_id)`
- foreign key `group_votes_room_id_fkey` is `FOREIGN KEY (room_id) REFERENCES group_rooms(id) ON DELETE CASCADE`
- tags remain constrained to the existing allowlist and maximum cardinality 3

## Retention implications

The schema provides a useful cleanup invariant: deleting an eligible `group_rooms` row should cascade its related `group_votes` rows at the database FK layer.

This evidence does **not** prove a cleanup implementation is safe or complete. Before Issue #45 can mark cleanup verified, the project still needs:

1. an approved retention period after `expires_at` and aligned Privacy/Operations wording;
2. an idempotent cleanup mechanism that targets only rows older than that approved threshold;
3. a guard proving active/non-eligible rooms are not deleted;
4. a controlled verification that eligible room deletion cascades its votes while preserving active rooms;
5. Security/Performance Advisor re-check after any DDL/function/scheduling change, as applicable.

## Evidence boundary

This file records current schema/catalog facts only. It is not evidence of an approved retention policy, executed purge, cleanup PASS, privacy/legal approval, production monitoring, abuse-control readiness, Public Beta completion, or Commercial GO.
