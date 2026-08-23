# Group API Retention Decision Record

Status: **NOT APPROVED**

This record exists to prevent implementation from silently turning the current room-expiry default into a data-retention policy. It is a decision gate, not evidence that retention, cleanup, Privacy/Legal, Security, or Commercial readiness has passed.

## Verified technical facts

- `group_rooms.expires_at` currently defaults to approximately 24 hours after room creation.
- Expiry controls product/API participation; expiry is not deletion.
- `group_votes.room_id` references `group_rooms(id)` with `ON DELETE CASCADE`.
- `supabase/group-retention-diagnostic.sql` is read-only and may be used to measure the current expired/active baseline without deleting data.
- No purge implementation may be treated as approved merely because these schema facts exist.

## Required decision before cleanup implementation

Complete this section only from an explicit product/privacy/operations decision and supporting legal/privacy review as appropriate.

- Decision owner: **UNSET**
- Decision date: **UNSET**
- Approved retention period after `expires_at`: **UNSET**
- Scope: **UNSET**
- Exception / legal-hold policy: **UNSET**
- Privacy Policy / Terms wording reference: **UNSET**
- Operations owner for cleanup: **UNSET**
- Review / reapproval date or trigger: **UNSET**

## Approval rule

The status above may change to **APPROVED** only after all required decision fields are populated from a real approved decision. Repository automation, schema defaults, historical row counts, synthetic test data, or assistant inference must not populate approval values.

Until status is APPROVED:

- do not implement or schedule destructive production cleanup based on an assumed retention window;
- do not mark Issue #45 retention items complete;
- do not describe room expiry as a deletion policy;
- do not mark Privacy/Legal, Operations, Public Beta completion, or Commercial GO as passed because of this document.

## Implementation evidence required after approval

Approval alone is not cleanup PASS. A later cleanup implementation must separately demonstrate:

1. Idempotent selection of records older than the approved retention boundary.
2. A hard guard that active/unexpired rooms are not cleanup candidates.
3. Verified deletion/cascade behavior for expired room votes.
4. Repeat-run safety.
5. Failure/rollback behavior appropriate to the chosen mechanism.
6. Updated Privacy/Operations documentation matching the approved policy.
7. Supabase Security/Performance Advisor re-check after relevant DDL/backend changes.
8. Deployment/source/version evidence for any changed backend function or scheduled job.

## Evidence boundary

Current status remains **NOT APPROVED / CLEANUP NOT IMPLEMENTED / CLEANUP NOT VERIFIED**.

No user count, deletion count, traffic level, retention duration, legal approval, test result, or production outcome is asserted by this record.
