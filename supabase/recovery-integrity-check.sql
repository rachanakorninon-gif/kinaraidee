-- Kinaraidee recovery integrity check
-- READ-ONLY evidence contract for post-restore verification.
-- Do not add identifiers, row contents, mutation, DDL, secrets or retention assumptions.

with critical_tables as (
  select c.relname as table_name, c.relrowsecurity as rls_enabled
  from pg_class c
  join pg_namespace n on n.oid = c.relnamespace
  where n.nspname = 'public'
    and c.relkind = 'r'
    and c.relname in (
      'beta_feedback',
      'partner_applications',
      'partner_restaurants',
      'group_rooms',
      'group_votes',
      'member_profiles',
      'member_food_history',
      'user_food_history'
    )
),
group_fk as (
  select pg_get_constraintdef(oid) as definition
  from pg_constraint
  where conrelid = 'public.group_votes'::regclass
    and contype = 'f'
),
group_vote_health as (
  select count(*)::bigint as orphan_group_votes
  from public.group_votes gv
  left join public.group_rooms gr on gr.id = gv.room_id
  where gr.id is null
)
select
  now() as checked_at,
  (select count(*) from critical_tables) as critical_tables_found,
  (select count(*) from critical_tables where rls_enabled) as critical_tables_with_rls,
  exists(
    select 1
    from group_fk
    where definition ilike '%REFERENCES group_rooms(id) ON DELETE CASCADE%'
  ) as group_vote_cascade_present,
  (select orphan_group_votes from group_vote_health) as orphan_group_votes;

-- Expected structural baseline for current schema:
-- critical_tables_found = 8
-- critical_tables_with_rls = 8
-- group_vote_cascade_present = true
-- orphan_group_votes = 0
-- These are integrity assertions, not backup/restore PASS by themselves.
