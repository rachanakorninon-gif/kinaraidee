-- Kinaraidee Group API retention diagnostic
-- READ-ONLY: this file intentionally contains no DELETE/UPDATE/INSERT statements.
-- Purpose: inspect retention impact safely before any retention period or purge policy is approved.
-- Evidence from this query must be timestamped when executed and must not be treated as cleanup PASS.

-- 1) Current room lifecycle counts.
select
  count(*) filter (where expires_at <= now()) as expired_rooms,
  count(*) filter (where expires_at > now()) as active_rooms,
  count(*) as total_rooms
from public.group_rooms;

-- 2) Vote rows attached to expired vs active rooms.
select
  count(*) filter (where r.expires_at <= now()) as votes_in_expired_rooms,
  count(*) filter (where r.expires_at > now()) as votes_in_active_rooms,
  count(*) as total_joined_votes
from public.group_votes v
join public.group_rooms r on r.id = v.room_id;

-- 3) Orphan check. Expected result is 0 when the FK is intact.
select count(*) as orphan_votes
from public.group_votes v
left join public.group_rooms r on r.id = v.room_id
where r.id is null;

-- 4) Age distribution for expired rooms. This helps evaluate a future approved retention window
-- without choosing or implying a retention period here.
select
  min(now() - expires_at) as youngest_expired_age,
  max(now() - expires_at) as oldest_expired_age,
  count(*) as expired_room_count
from public.group_rooms
where expires_at <= now();

-- 5) Safety invariant for a future cleanup implementation: active rooms must never be candidates.
select count(*) as active_rooms_that_must_not_be_deleted
from public.group_rooms
where expires_at > now();
