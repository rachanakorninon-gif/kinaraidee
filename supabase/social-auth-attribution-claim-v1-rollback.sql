-- Rollback companion for social-auth-attribution-claim-v1.sql
-- Removes only the internal claim RPC. It does not alter existing attribution rows.

drop function if exists public.claim_member_acquisition_internal(uuid,text,text,text,text,text,text);
