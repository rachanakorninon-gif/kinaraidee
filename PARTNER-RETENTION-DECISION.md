# Partner API Retention Decision

Status: **NOT APPROVED**

This document is the policy decision gate for Partner API retention. It intentionally does **not** choose production retention periods and must not be treated as cleanup or Commercial GO evidence.

## Decision fields

- Decision owner: **UNSET**
- Privacy/Legal approver: **UNSET**
- Operations owner: **UNSET**
- `partner_clicks` retention period: **UNSET**
- `partner_conversions` retention period: **UNSET**
- `restaurant_search_demand` retention period: **UNSET**
- Privacy/Terms reference: **UNSET**
- Approved at: **UNSET**

## Approval rule

Do not change Status to **APPROVED** until every decision field above has a real, reviewed value. The three retention periods may differ and must be explicit; no default interval is implied by current timestamps, row counts, dry-run examples, database schema, or application behavior.

After approval, cleanup still requires separate implementation and evidence: read-only dry-run review, idempotent purge logic, active/business-critical data safeguards, controlled execution, post-run verification, rollback/incident handling, and reconciliation checks where applicable.

## Evidence boundary

The existing `supabase/partner-retention-dry-run.sql`, production row-count/timestamp observations, Partner API v15 deployment parity, rejection-only live probes, CI/static checks, and this decision record are planning/governance evidence only. They do not prove retention approval, deletion, anonymization, partner agreement, conversion/revenue reconciliation, Privacy/Legal approval, monitoring SLA, Public Beta completion, or Commercial GO.