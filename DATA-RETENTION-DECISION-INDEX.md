# Kinaraidee — Data Retention Decision Index

Status: **DECISIONS INCOMPLETE / COMMERCIAL PRIVACY GATE NOT PASSED**

This document is a cross-system index for retention decisions. It does not choose retention periods, approve Privacy/Legal wording, authorize cleanup, or prove Commercial readiness.

## Current decision records

| Scope | Canonical decision record | Current status | Cleanup status |
| --- | --- | --- | --- |
| Group rooms / votes | `GROUP-API-RETENTION-DECISION.md` | **NOT APPROVED** | **NOT IMPLEMENTED / NOT VERIFIED** |
| Partner clicks / conversions / restaurant search demand | `PARTNER-RETENTION-DECISION.md` | **NOT APPROVED** | **NOT IMPLEMENTED / NOT VERIFIED** |
| Operational / platform logs | `OPERATIONAL-LOG-RETENTION-DECISION.md` | **NOT APPROVED** | **CONFIGURATION / EXPORT-DELETE NOT VERIFIED** |
| Other data classes in `DATA-GOVERNANCE-DRAFT.md` | No approved per-class decision record yet | **NOT APPROVED / TBD** | **NOT VERIFIED** |

## Decision boundary

- The current Group room `expires_at` behavior is a product-expiry implementation fact, not an approved retention period.
- Group `get_votes` returning `410 room_closed` after expiry is current implementation behavior, not approved long-term retention/privacy policy.
- Partner production row counts, timestamps and retention dry-runs are planning evidence only and do not imply retention periods.
- Operational/platform request logs and application structured events are separate evidence layers; observed logs, provider defaults, scheduled probes or source logging guards do not establish an approved retention period or configurable deletion behavior.
- A read-only dry-run, candidate count, schema cascade, CI success, deployment parity or synthetic monitoring run does not authorize deletion/anonymization.
- No assistant inference, example interval, historical timestamp range or schema/provider default may populate an approval field.

## Required before Production retention can be described as approved

For each applicable data class, the canonical decision record must contain real reviewed values for its required owner/approver, retention period, scope/exceptions and Privacy/Terms reference. Operational/platform logs additionally require verified provider/configuration evidence appropriate to the selected retention/access/export-delete policy. Any cleanup/anonymization/export-delete mechanism then requires separate implementation or provider-configuration verification, safe execution where applicable and post-run evidence.

The broader Production Privacy/Legal gate also remains separate and requires the service/controller identity, official contact, final Privacy Policy/Terms and appropriate legal/PDPA review.

## Evidence boundary

Current state is **DECISIONS INCOMPLETE / CLEANUP NOT VERIFIED / COMMERCIAL PRIVACY GATE NOT PASSED**.

This index asserts no user count, deletion count, log count, retention duration, legal approval, partner readiness, conversion, revenue, test result, Public Beta completion or Commercial GO.
