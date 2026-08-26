# Recovery / Rollback Drill Decision

Status: **NOT APPROVED**

This document is the Commercial Readiness decision gate for Production backup/restore and rollback drills. It intentionally does **not** invent backup guarantees, restore success, RPO/RTO targets, owners, environments, provider capabilities, maintenance windows, or pass results.

## Existing evidence boundary

The repository already contains `supabase/recovery-integrity-check.sql` plus `Recovery Integrity Regression`. That SQL is read-only and aggregate-only and is suitable as a post-restore integrity check. Static regression success proves only that the verification query remains privacy-safe and non-mutating.

It does **not** prove that a usable backup exists, that a restore has completed, that rollback works, or that any RPO/RTO target has been met.

## Decision fields

- Decision owner: **UNSET**
- Operations approver: **UNSET**
- Security/Privacy reviewer: **UNSET**
- Production backup mechanism/provider: **UNSET**
- Restore target/environment: **UNSET**
- Rollback scope: **UNSET**
- Data included/excluded: **UNSET**
- Approved RPO target: **UNSET**
- Approved RTO target: **UNSET**
- Maintenance/customer-impact plan: **UNSET**
- Escalation/contact path: **UNSET**
- Evidence storage/location: **UNSET**
- Approved at: **UNSET**

## Approval rule

Do not change Status to **APPROVED** until every decision field above has a real reviewed value and the selected drill plan is safe for Production data and users.

After approval, Commercial readiness still requires executed evidence from an actual controlled drill. At minimum, that evidence must identify the exact backup/snapshot or rollback point used, the drill environment/scope, timestamps sufficient to measure elapsed recovery, the post-restore integrity-check result, any failure/deviation observed, and the reviewer/owner who accepted the result.

Do not infer RPO/RTO, restore success, rollback success, backup availability, or operational readiness from CI success, repository templates, provider marketing, static SQL, row counts, deployment success, or prior unrelated tests.

## Safety rule

A drill must not mutate or destroy Production data merely to produce evidence. If a Production-affecting exercise is ever selected, it requires an explicitly approved runbook, owner, rollback path, maintenance/customer-impact plan and stop conditions before execution.

## Evidence boundary

This decision record is governance/planning evidence only. It does not execute a backup, restore or rollback; does not prove backup availability, restore integrity, measured RPO/RTO, incident response, operational SLA, Public Beta completion or Commercial GO.
