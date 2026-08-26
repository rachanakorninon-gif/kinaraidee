# Group API Abuse-Control Decision

Status: **NOT APPROVED**

This document is the decision gate for anonymous abuse controls on the public Group API. It intentionally does **not** invent a traffic envelope, client identifier, quota, rate limit, block duration, bypass path, privacy basis, owner, or approver.

## Product invariant

Anonymous friend voting through invite links must remain available. Do not solve this gate by requiring every participant to create an account unless the product requirement is intentionally changed and approved separately.

## Decision fields

- Decision owner: **UNSET**
- Operations/Security approver: **UNSET**
- Privacy/Legal reviewer: **UNSET**
- Public Beta traffic envelope: **UNSET**
- Production traffic envelope: **UNSET**
- Allowed rate-limit/quota identifier: **UNSET**
- `create_room` limit/window: **UNSET**
- `submit_vote` limit/window: **UNSET**
- Other protected actions/limits: **UNSET**
- Over-limit response behavior: **UNSET**
- False-positive bypass/recovery path: **UNSET**
- Shared-network/NAT handling: **UNSET**
- Data retained for abuse control: **UNSET**
- Abuse-control data retention period: **UNSET**
- Privacy/Terms reference: **UNSET**
- Monitoring/alert dependency: **UNSET**
- Approved at: **UNSET**

## Approval rule

Do not change Status to **APPROVED** until every decision field above has a real reviewed value and the selected mechanism preserves the anonymous invite flow or an explicitly approved product change replaces that requirement.

Existing request-size limits, identifier-shape validation, room-size/tag limits, room-full checks, rejection-only live probes, platform logs, monitoring workflows, or successful CI runs are partial hardening/evidence only. They do not determine the production traffic envelope or complete abuse-control policy automatically.

After approval, implementation still requires separate evidence appropriate to the chosen control, including safe regression coverage, deployed source/version parity, rejection behavior, false-positive/recovery behavior, privacy review of any identifier/data used, and real-device regression if product behavior changes.

## Evidence boundary

This decision record is governance/planning evidence only. It does not implement a rate limiter or quota. It does not prove abuse resistance, load/security testing, monitoring SLA, retention approval, Privacy/Legal approval, successful Group API product actions, real-device acceptance, Public Beta completion, or Commercial GO.
