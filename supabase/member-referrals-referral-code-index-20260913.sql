-- Issue #638: cover member_referrals.referral_code foreign key.
-- Additive performance hardening only; no RLS/Auth/grant changes.

create index if not exists member_referrals_referral_code_idx
  on public.member_referrals (referral_code);
