# Campaign 3,000 Premium — operations blueprint

Status: **DESIGN ONLY / PRE-LAUNCH / NOT ACCEPTING PRIZE ENTRIES**

This document prepares the operational control plane for the planned 3,000-Premium iPhone campaign. It does not approve the campaign mechanic, open entries, set final dates, select a winner, grant a prize, or replace advice/approval from the competent Thai authority, legal counsel or tax/accounting adviser.

The exact winner-selection mechanism and published rules must match the final approved legal/permit path.

## 1. Non-negotiable public truth

Until all launch gates are complete:

- `status = PRE_LAUNCH`
- `entries_open = false`
- `eligible_count = 0`
- ordinary signup/app usage is not a prize entry
- Premium research intent is not a prize entry
- sandbox/test payments are not prize entries
- no winner exists

## 2. Roles required before LIVE

Names/contacts are intentionally **TBD** until real owners are assigned.

### Campaign owner

Accountable for final GO/NO-GO, published rules, dates, prize availability and cross-functional coordination.

Required before LIVE:

- named person
- primary contact channel
- backup/delegate

### Technical owner

Accountable for backend eligibility truth, payment/entitlement reconciliation, kill switch and campaign-status operations.

Required before LIVE:

- named person
- incident channel
- rollback/runbook access

### Support owner

Accountable for participant questions, eligibility disputes and escalation.

Required before LIVE:

- public support route
- internal escalation path
- response expectations

### Legal/permit owner or adviser

Accountable for confirming the actual competent-authority path, approved mechanic and final published terms.

Required before LIVE:

- written review/approval evidence appropriate to the organizer
- filed/approved documents retained in the controlled evidence location

### Accounting/tax owner or adviser

Accountable for prize tax/withholding, documentation, accounting treatment and winner communication.

Required before LIVE:

- organizer-specific written treatment
- responsible party for withholding/payment/documentation

### Draw/selection witness or verifier

Required only in the form demanded by the final approved rules/permit. Do not invent witness requirements from this blueprint.

## 3. Campaign lifecycle

Proposed operational states:

1. `PRE_LAUNCH`
2. `LIVE`
3. `PAUSED`
4. `CLOSED_PENDING_SELECTION`
5. `SELECTION_IN_PROGRESS`
6. `PROVISIONAL_WINNER_REVIEW`
7. `WINNER_CONFIRMED`
8. `PRIZE_FULFILLED`
9. `ARCHIVED`

The public UI may use simpler language, but backend/audit evidence should preserve the exact operational state.

### PRE_LAUNCH

- entries closed
- public count fixed at zero unless/until backend LIVE implementation is approved
- research pages may exist but do not create eligibility

### LIVE

May be entered only after an explicit GO checklist is signed off and server-side state is changed through an audited administrative path.

### PAUSED

Use when a condition may compromise fairness, payment truth, legal compliance, security or public accuracy. New eligibility must stop immediately.

### CLOSED_PENDING_SELECTION

- no new entries
- eligibility cutoff is final
- reconciliation/freeze begins

### SELECTION_IN_PROGRESS

- frozen eligible population only
- no mutation of the selection population except through documented legal/rules correction procedure

### PROVISIONAL_WINNER_REVIEW

A selected candidate is not yet publicly confirmed. Validate against final published rules and required identity/eligibility evidence.

### WINNER_CONFIRMED

Only after final eligibility validation and any required legal/tax steps.

### PRIZE_FULFILLED

Prize handoff/delivery evidence completed according to approved privacy/retention rules.

## 4. Dates that must be approved before LIVE

No placeholder date may silently become production truth.

Required fields:

- campaign start date/time + timezone
- campaign end date/time + timezone
- payment/entitlement eligibility cutoff
- refund/dispute treatment cutoff if applicable
- selection/draw date
- provisional-winner response deadline
- alternate-winner sequence/deadline if applicable
- public result announcement date/window
- prize-fulfilment deadline/window

All public copy, backend campaign state and approved/filed legal documents must agree.

## 5. Entry/eligibility freeze procedure

The freeze procedure should produce reproducible evidence without publishing personal information.

Before freeze:

1. stop new eligibility by moving campaign out of LIVE or by applying the approved cutoff atomically
2. ensure kill switch and state are visible to backend eligibility evaluation
3. reconcile payment/subscription state through the approved provider path
4. resolve known webhook/reconciliation failures that could materially affect eligibility
5. apply approved refund/dispute/revocation rules

Freeze evidence should record:

- campaign identifier/version
- rules version
- eligibility-query/version identifier
- cutoff timestamp + timezone
- total unique technically eligible users
- excluded counts by approved reason category where safe/useful
- backend code/release identifier
- database snapshot or immutable query evidence appropriate to the system
- cryptographic digest/hash of the canonical frozen population or equivalent tamper-evident evidence
- operator identity
- reviewer identity if required
- timestamp

The public should receive only aggregate information permitted by the final rules/privacy design.

## 6. Canonical selection population

The selection population must derive from the frozen backend eligibility set—not from a spreadsheet manually assembled from screenshots or client analytics.

Canonical record should use a stable internal campaign-entry/eligibility identifier. Personal contact/identity information should be separated from selection mechanics as far as practical.

Required invariants:

- one eligible person is represented according to the approved one-person/one-entry or other final rule
- duplicates are resolved before selection
- test/internal accounts are excluded
- refunded/revoked/disputed cases follow the approved rules
- no late additions after cutoff except through a documented correction procedure permitted by the final rules/legal path

## 7. Winner-selection procedure — design requirements

**The exact method is TBD until the legal/permit path is approved.**

Whatever method is approved must be:

- consistent with the published/filed rules
- run only against the frozen canonical population
- auditable after the fact
- protected against operator substitution or undocumented reruns
- able to explain why a particular candidate was selected
- able to record alternates if the approved rules require them
- executed with the required witness/authority presence, if any

### Required evidence packet

At minimum, subject to legal review:

- campaign/rules version
- frozen population evidence and count
- selection method/version
- date/time/timezone
- operator(s)
- witness/verifier information if required
- selection output
- reason for any invalidation/reselection
- alternate sequence if permitted/required
- final confirmation record

No public announcement should occur from an unvalidated provisional result.

## 8. Provisional winner validation

After selection, validate only the fields required by the approved rules/law.

Possible categories to confirm, subject to final rules:

- correct person/account ownership
- age/residency/geographic eligibility if required
- valid qualifying Premium/eligibility state at the relevant cutoff
- no excluded internal/test status
- required acceptance/contact response within deadline
- tax/identity documentation required for prize fulfilment

Privacy principle:

- collect additional identity information only after selection when required
- do not collect unnecessary identity documents from the entire participant population
- define retention/deletion before collection

## 9. Alternate/reselection handling

Final rules must say what happens when a provisional winner:

- cannot be contacted
- does not respond by deadline
- refuses the prize
- fails eligibility validation
- cannot satisfy required documentation

Do not silently rerun selection. Every invalidation and next-candidate action requires an audit reason and must follow the approved rules.

## 10. Prize procurement and custody

Before LIVE, confirm:

- exact prize model/specification or approved equivalent language
- procurement budget
- responsible purchaser/entity
- proof of purchase/invoice handling
- secure custody location before handoff
- warranty/receipt handling
- delivery/handoff method
- failed-delivery procedure

Do not advertise a prize that the organizer cannot reasonably procure under the published terms.

## 11. Tax/accounting handoff

The repository preflight notes a Thai prize-withholding signal, but organizer-specific treatment must be confirmed before LIVE and before winner fulfilment.

Required written decisions:

- applicable withholding rate/treatment for the actual mechanic and organizer
- who bears/remits the tax
- prize valuation basis
- required forms/certificates
- accounting entries
- winner-facing explanation
- treatment if winner refuses tax/document obligations

This blueprint does not resolve those questions.

## 12. Campaign kill switch

### Kill-switch authority

Only approved server-side/admin identities may activate/deactivate it. Browser state is never authoritative.

### Triggers to PAUSE / kill switch

Examples that should trigger immediate review:

- payment provider outage or webhook verification failure affecting entitlement truth
- eligible-count drift/reconciliation mismatch
- duplicate or unexplained entitlement grants
- security/privacy incident
- public rules differing from backend behavior
- legal/permit concern or instruction from adviser/authority
- prize unavailability or fulfilment risk
- incorrect campaign dates/cutoff
- suspected fraud/abuse that could affect fairness
- inability to reproduce the trusted eligible population

### Required behavior

When active:

- new eligibility stops
- public `entries_open` becomes false
- state change is audited
- support/public messaging uses approved incident copy
- technical investigation begins

Deactivation requires a documented reason and evidence that the triggering risk is resolved.

## 13. Admin audit trail

Every material administrative action should record:

- actor
- action
- timestamp
- previous state
- new state
- reason
- linked incident/change/ticket if available

Material actions include:

- PRE_LAUNCH -> LIVE
- LIVE -> PAUSED
- PAUSED -> LIVE
- campaign close/cutoff
- kill-switch toggle
- eligibility override if final design permits one
- winner invalidation/reselection
- result confirmation

Avoid direct database edits that bypass audit unless emergency break-glass procedure is explicitly designed and itself audited.

## 14. Eligibility dispute process

Before LIVE, define participant-facing support behavior for claims such as:

- “I paid but Premium is not active”
- “My payment succeeded but I am not counted”
- “I canceled/refunded; am I still eligible?”
- “My account was duplicated/changed”
- “The campaign page shows a different status/count”

Support must not manually promise eligibility from screenshots. The technical owner should reconcile backend/provider truth and respond according to the published rules.

Record dispute resolution without exposing payment secrets.

## 15. Incident severity for campaign operations

### SEV-1

Potentially compromises fairness, payment truth, participant privacy/security, or legal compliance.

Default response: activate/consider kill switch immediately; stop new eligibility; escalate to campaign + technical + legal/permit owner.

### SEV-2

Material user-impacting issue with reliable backend truth still intact.

Default response: investigate quickly; pause if uncertainty spreads to eligibility/count fairness.

### SEV-3

Cosmetic/non-material issue that cannot change eligibility or campaign truth.

May be fixed without pause after review.

## 16. Public communication rules

Do not publish:

- “LIVE” before audited server state is LIVE
- fabricated member/entry totals
- a winner before final validation
- payment success inferred from client UI alone
- legal approval that has not actually been obtained

If paused, public copy should state the campaign is temporarily paused/reviewing eligibility as appropriate, without speculating or exposing sensitive incident details.

## 17. Privacy/security review checklist

Before LIVE:

- [ ] public campaign endpoint exposes only necessary aggregate state
- [ ] authenticated eligibility endpoint returns only the current user's state
- [ ] no payment secret/service credential in browser/repo
- [ ] raw webhook payload access restricted
- [ ] admin state changes authenticated + audited
- [ ] rate/abuse controls reviewed
- [ ] logs avoid unnecessary payment/identity data
- [ ] winner identity collection has defined purpose and retention
- [ ] public announcement data minimized to approved fields
- [ ] incident response includes credential/privacy escalation

## 18. Dry-run before LIVE

Conduct a non-production rehearsal with synthetic/test identities only.

Rehearse:

1. PRE_LAUNCH state
2. sandbox Premium entitlements
3. public count remains protected from sandbox/test identities
4. mock LIVE transition in non-production environment
5. technical eligibility evaluation
6. kill switch
7. campaign close/cutoff
8. population freeze and hash/evidence generation
9. mock selection using a method explicitly labeled as rehearsal only
10. provisional validation
11. alternate handling
12. support dispute
13. incident pause/resume
14. audit export

A successful rehearsal is not legal/payment authorization and does not create real entries.

## 19. Final GO/NO-GO packet

Before PRE_LAUNCH -> LIVE, one evidence packet should link:

- approved provider + merchant account
- approved Premium price/cadence
- sandbox lifecycle PASS
- production acceptance PASS
- final rules
- competent-authority/legal/permit evidence
- organizer-specific tax/accounting decision
- prize procurement confirmation
- campaign dates/cutoff
- support + incident owners
- backend eligibility/count security review
- kill-switch drill
- winner-selection procedure approved for the actual legal mechanic
- prize-delivery procedure
- explicit campaign owner GO with timestamp

Missing required evidence means **NO-GO**.

## 20. Non-execution boundary

This document is not evidence that:

- the campaign is legally approved
- the campaign is LIVE
- entries are open
- the exact draw method is approved
- a prize has been purchased
- tax treatment is finalized
- a winner exists

It is operations preparation only.