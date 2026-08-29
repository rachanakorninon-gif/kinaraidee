# Campaign 3,000 Premium — rules draft template

Status: **DRAFT FOR LEGAL / COMPETENT-AUTHORITY REVIEW ONLY**

This template is not final campaign rules, is not a permit/application, and does not open prize entries. All `TBD` fields must be completed from real provider/business/legal/tax facts and reviewed before publication.

Public truth remains `PRE_LAUNCH / NOT ACCEPTING PRIZE ENTRIES / eligible_count = 0` until the master launch gate is explicitly approved.

---

## 1. Organizer

- Legal organizer name: **TBD**
- Registered/business address: **TBD**
- Contact/support route: **TBD**
- Campaign owner: **TBD**

Do not publish an individual developer name as the legal organizer unless that is the reviewed/approved actual organizer.

## 2. Campaign name

Working title: **Kinaraidee Premium — 3,000-member iPhone campaign**

Final Thai campaign name: **TBD / legal review required**

## 3. Campaign status

Before official launch, the campaign is PRE-LAUNCH and no prize entries are accepted.

The campaign may become LIVE only after payment, legal/permit, tax, security, operational and rules gates are complete.

## 4. Campaign period

- Start date/time: **TBD**
- End date/time: **TBD**
- Timezone: **Asia/Bangkok unless legal review requires otherwise**
- Eligibility cutoff: **TBD**
- Result/selection date: **TBD**
- Result announcement date/window: **TBD**
- Prize-fulfilment window: **TBD**

All dates must match the backend campaign state and any filed/approved legal documents.

## 5. Who may participate

Final eligibility criteria are **TBD and require legal review**.

Potential categories that must be explicitly decided rather than assumed:

- age requirement
- Thailand residency/geographic requirement
- account ownership requirement
- whether employees/contractors/organizer-related persons are excluded
- whether one person may hold multiple app accounts
- whether one person may hold multiple qualifying subscriptions
- treatment of duplicate identities/accounts

Do not publish or enforce criteria that have not been reviewed for the actual campaign.

## 6. Qualifying Premium requirement

Proposed technical concept only:

A participant must have a backend-verified qualifying Kinaraidee Premium entitlement under the approved merchant/payment path and satisfy the final campaign rules at the required cutoff.

The following must never qualify by themselves:

- app signup
- ordinary free app use
- clicking an ad or campaign page
- research-preview participation
- local browser state
- query-string flags
- analytics events
- screenshots of payment UI
- sandbox/test/internal transactions

Final treatment of renewal failure, grace periods, cancellation, refunds, partial refunds, disputes and chargebacks: **TBD after provider/business/legal review**.

## 7. Number of entries / unique-person rule

Proposed direction: **one unique technically eligible user/person should not be multiplied by duplicate subscriptions or duplicate provider events**.

Final legal entry rule: **TBD**.

If the final approved mechanic uses a different entry structure, backend implementation and public wording must be updated before LIVE.

## 8. Prize

- Prize: **TBD exact iPhone model/specification**
- Quantity: **TBD / current working concept is one prize**
- Approximate retail value: **TBD at procurement/approval time**
- Color/storage selection rules: **TBD**
- Cash alternative: **TBD**
- Substitution/equivalent-prize rule: **TBD legal review**
- Warranty/receipt handling: **TBD**

Do not promise a specific prize configuration that has not been procurement-approved.

## 9. Apple disclaimer

Apple Inc. is not a sponsor, endorser, operator or administrator of this campaign unless a future written agreement proves otherwise.

Final wording should be reviewed before publication.

## 10. Technical eligibility vs final prize eligibility

Kinaraidee backend may determine a **technical eligible set** from payment/entitlement/campaign-state data.

Being in the technical set does not automatically mean final legal prize eligibility.

A selected provisional winner must still pass the final eligibility checks required by these rules and applicable legal/permit conditions.

## 11. Campaign count

Public `eligible_count` must come from a trusted backend aggregate of unique technically eligible users after approved exclusions.

The organizer must not manually type or fabricate the count.

Before LIVE, `eligible_count` remains 0.

## 12. Campaign pause / kill switch

The organizer may pause the campaign when necessary to protect fairness, payment truth, security/privacy, prize availability or compliance, subject to the final reviewed rules.

When paused:

- new technical eligibility stops
- `entries_open` becomes false
- public status reflects that the campaign is paused/reviewing
- the reason and administrative action are audited

Final authority/consumer-notice wording: **TBD legal review**.

## 13. Eligibility cutoff and population freeze

At campaign close/cutoff, the organizer will freeze the backend-derived qualifying population under the approved rules and reconciliation process.

The freeze evidence should include:

- rules version
- cutoff timestamp/timezone
- unique eligible count
- backend/release/query version
- tamper-evident population digest or equivalent evidence
- operator/reviewer audit record

Personal data must not be published as part of this evidence.

## 14. Winner-selection method

**TBD — must match the actual competent-authority/legal/permit-approved mechanism.**

The final procedure must state:

- exact selection method
- selection date/time/location if applicable
- frozen population used
- operator(s)
- witness/official presence if required
- whether alternates are selected and how many
- how reruns/reselections are prevented or documented
- what evidence is retained

Do not finalize a randomization/draw implementation until the legal path is confirmed.

## 15. Provisional winner validation

A selected candidate is provisional until all required conditions are validated.

Final validation fields may include only what is required by the approved rules/law, such as:

- identity/account ownership
- age/residency if required
- qualifying Premium state/cutoff
- exclusion status
- required tax/prize documents
- response/acceptance deadline

Only the minimum necessary personal information should be collected.

## 16. Contacting a provisional winner

- Contact channel(s): **TBD**
- Number/timing of contact attempts: **TBD**
- Response deadline: **TBD**
- How identity is verified safely: **TBD**

The organizer should never ask the winner to send passwords, OTPs, payment secrets or unrelated sensitive information.

## 17. Alternate / invalid provisional winner

Final rules must define what happens if a provisional winner:

- cannot be contacted
- misses the response deadline
- refuses the prize
- fails eligibility validation
- cannot provide required documents

Alternate/reselection method: **TBD legal review**.

Every invalidation/reselection must be audited. No silent redraw.

## 18. Prize delivery

- Delivery/handoff method: **TBD**
- Delivery geographic scope: **TBD**
- Responsible party: **TBD**
- Identity verification at handoff: **TBD**
- Failed-delivery handling: **TBD**
- Proof-of-delivery retention: **TBD**

## 19. Tax and withholding

Organizer-specific tax/withholding treatment is **TBD pending written accountant/tax-adviser confirmation**.

Final rules must clearly state:

- applicable tax/withholding treatment
- who bears/remits it
- prize valuation basis
- required winner documents/certificates
- what happens if the winner cannot/will not complete required tax documentation

Do not rely on a generic public tax rate as final organizer-specific advice.

## 20. Refunds, disputes and cancellation

Final eligibility treatment is **TBD** and must align with:

- provider-confirmed subscription semantics
- approved business policy
- final legal rules
- eligibility cutoff

At minimum, the backend must not treat browser state as payment truth.

## 21. Fraud, abuse and duplicate accounts

The organizer may review suspected fraud/abuse under the final reviewed rules.

Final rules should define:

- duplicate-account treatment
- fabricated/unauthorized payment behavior
- abuse that can affect eligibility
- review/appeal path if any

Enforcement must be based on evidence and applied consistently.

## 22. Technical/operational incident

If an incident could affect fairness or eligibility truth, the organizer may pause the campaign and investigate under the final rules.

Examples:

- payment/webhook outage
- eligible-count mismatch
- security/privacy incident
- rules/backend mismatch
- prize availability issue

Final consumer communication/remedy language: **TBD legal review**.

## 23. Participant support and disputes

Support route: **TBD before LIVE**.

Participants should be able to ask about:

- Premium payment/entitlement status
- campaign technical eligibility
- refunds/cancellation interaction with campaign eligibility
- campaign status/pauses
- result announcement

Support staff must not grant eligibility manually from screenshots or verbal claims.

## 24. Privacy

Final rules/privacy notice must explain, as applicable:

- what data is used to determine technical eligibility
- what additional information is collected only from a provisional winner
- purpose and lawful basis as reviewed
- retention/deletion
- recipients/processors where relevant
- participant rights/contact route

Do not collect winner identity documents from all participants unnecessarily.

## 25. Public result announcement

Final publication fields: **TBD privacy/legal review**.

Only a fully validated winner may be announced.

The public result should disclose no more personal data than approved/necessary.

## 26. Rule changes

Final legal wording: **TBD**.

Any permitted change must be:

- legally allowed
- versioned
- reflected consistently in public rules and backend behavior
- communicated as required
- unable to retroactively manipulate a frozen selection population outside the approved correction procedure

## 27. Governing law / competent authority

**TBD after legal review.**

Do not publish a jurisdiction/authority clause from this draft without confirmation.

## 28. Final publication gate

This template may become final rules only after all required evidence exists:

- [ ] legal organizer details
- [ ] real provider/merchant/payment model
- [ ] approved Premium price/cadence
- [ ] final eligibility criteria
- [ ] exact prize and procurement
- [ ] dates/cutoff
- [ ] competent-authority/legal/permit path complete as applicable
- [ ] exact approved winner-selection procedure
- [ ] tax/accounting treatment
- [ ] support/contact route
- [ ] privacy review
- [ ] backend trusted count/eligibility implementation and tests
- [ ] campaign owner final approval timestamp

Until then this file remains a **draft template only**.