# Partner API Abuse-Control Decision

Status: **NOT APPROVED**

This document is the decision gate for anonymous abuse controls on the public Partner API. It intentionally does **not** invent traffic volumes, rate limits, identifiers, block windows, monitoring thresholds, privacy terms, owners, or approvers.

## Product/runtime facts

The current public Partner API intentionally exposes anonymous product actions including:

- `find_partners`
- `track_search`
- `track_click`

Owner/admin actions remain separately authorization-gated. Existing bounded request-body handling, field-length validation, coordinate constraints, rejection-only probes and scheduled monitoring are partial hardening only. They are not a complete anonymous abuse-control strategy.

## Decision fields

- Decision owner: **UNSET**
- Operations/Security approver: **UNSET**
- Privacy/Legal reviewer: **UNSET**
- Public Beta traffic envelope: **UNSET**
- Production traffic envelope: **UNSET**
- Allowed anonymous client/session identifier: **UNSET**
- `find_partners` limit/window: **UNSET**
- `track_search` limit/window: **UNSET**
- `track_click` limit/window: **UNSET**
- Other protected anonymous actions/limits: **UNSET**
- Over-limit response behavior: **UNSET**
- False-positive bypass/recovery path: **UNSET**
- Shared-network/NAT handling: **UNSET**
- Data retained for abuse control: **UNSET**
- Abuse-control data retention period: **UNSET**
- Privacy/Terms reference: **UNSET**
- Monitoring/alert dependency: **UNSET**
- Approved at: **UNSET**

## Approval rule

Do not change Status to **APPROVED** until every decision field above has a real reviewed value and the selected controls preserve legitimate anonymous discovery/click flows or an explicitly approved product change replaces that requirement.

Do not infer limits from current database row counts, live-probe cadence, request-size limits, field truncation, coordinate validation, CI success, Partner monitoring readiness, retention planning, or commercial assumptions.

After approval, implementation still requires separate evidence appropriate to the chosen mechanism, including safe regression coverage, deployed source/version parity, over-limit rejection behavior, false-positive/recovery behavior, privacy review of any identifier/data used, monitoring ownership, and real-device regression if user-visible product behavior changes.

## Evidence boundary

This decision record is governance/planning evidence only. It does not implement a rate limiter or quota. It does not prove abuse resistance, load/security testing, monitoring SLA, retention approval, Privacy/Legal approval, successful partner actions, real-device acceptance, partner agreements, conversion/reconciliation, revenue, Public Beta completion, or Commercial GO.
