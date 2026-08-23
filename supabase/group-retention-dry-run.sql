-- Kinaraidee Group retention dry-run contract
--
-- READ-ONLY BY DESIGN. This file must never delete, truncate, update or insert data.
-- It is intended to estimate the impact of a future approved retention period before
-- any cleanup mechanism is implemented.
--
-- Required runtime parameter when executed through psql:
--   retention_after_expiry
-- Example only (NOT an approved policy):
--   psql ... -v retention_after_expiry='7 days' -f supabase/group-retention-dry-run.sql
--
-- The value is deliberately not hard-coded because the production retention period
-- remains TBD pending owner/legal approval under Issues #31 and #45.

\if :{?retention_after_expiry}
\else
  \echo 'ERROR: retention_after_expiry must be supplied explicitly; no default is allowed.'
  \quit 2
\endif

\echo 'Group retention DRY RUN — no data will be mutated.'
\echo 'Candidate retention after expiry:' :retention_after_expiry

WITH params AS (
  SELECT :'retention_after_expiry'::interval AS retention_after_expiry,
         now() AS observed_at
),
eligible_rooms AS (
  SELECT r.id, r.expires_at
  FROM public.group_rooms r
  CROSS JOIN params p
  WHERE r.expires_at <= p.observed_at - p.retention_after_expiry
),
eligible_votes AS (
  SELECT v.room_id
  FROM public.group_votes v
  JOIN eligible_rooms e ON e.id = v.room_id
),
active_rooms AS (
  SELECT r.id
  FROM public.group_rooms r
  CROSS JOIN params p
  WHERE r.expires_at > p.observed_at
),
orphan_votes AS (
  SELECT v.room_id
  FROM public.group_votes v
  LEFT JOIN public.group_rooms r ON r.id = v.room_id
  WHERE r.id IS NULL
)
SELECT
  p.observed_at,
  p.retention_after_expiry,
  (SELECT count(*) FROM public.group_rooms) AS total_rooms,
  (SELECT count(*) FROM public.group_votes) AS total_votes,
  (SELECT count(*) FROM eligible_rooms) AS candidate_rooms,
  (SELECT count(*) FROM eligible_votes) AS candidate_votes_via_cascade,
  (SELECT count(*) FROM active_rooms) AS active_rooms,
  (SELECT count(*) FROM orphan_votes) AS orphan_votes
FROM params p;

-- Safety evidence: list age boundaries without exposing room IDs or voter IDs.
WITH params AS (
  SELECT :'retention_after_expiry'::interval AS retention_after_expiry,
         now() AS observed_at
),
eligible AS (
  SELECT r.expires_at
  FROM public.group_rooms r
  CROSS JOIN params p
  WHERE r.expires_at <= p.observed_at - p.retention_after_expiry
)
SELECT
  count(*) AS candidate_rooms,
  min(expires_at) AS oldest_candidate_expiry,
  max(expires_at) AS newest_candidate_expiry
FROM eligible;
