-- Rollback for Issue #638 covering index only.
-- Does not alter the foreign key, RLS, Auth, grants, or other indexes.

drop index if exists public.member_referrals_referral_code_idx;
