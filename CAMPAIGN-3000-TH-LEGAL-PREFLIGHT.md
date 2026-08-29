# Kinaraidee — 3,000 Premium Campaign Thailand Legal Preflight

Research date: **2026-08-29**

Status: **PREFLIGHT ONLY / NOT LEGAL ADVICE / CAMPAIGN NOT LIVE**

This document records current official Thai-government signals that must be resolved before the “3,000 Premium” prize campaign accepts entries. It is an operational launch gate, not a legal opinion and not a substitute for confirmation from the competent authority or qualified Thai counsel/accounting adviser for the exact final campaign mechanics and business entity.

## Current campaign concept being evaluated

Planned concept:

- a user becomes a qualifying paid Kinaraidee Premium member
- qualifying users contribute to a 3,000-person milestone/population
- one iPhone 17 Pro Max 256GB is planned as the prize
- winner selection is intended to involve chance/random selection unless the final mechanic is changed

Because the planned prize chance is connected to a commercial paid service, do **not** treat this as an ordinary free marketing announcement.

## 1. Department of Provincial Administration licensing gate

Thailand’s government service portal currently lists a procedure named:

> “การออกใบอนุญาตจัดให้มีการแถมพกหรือรางวัลด้วยการเสี่ยงโชค โดยวิธีใด ๆ ในการประกอบกิจการค้า หรืออาชีพ”

The portal identifies the Department of Provincial Administration (กรมการปกครอง) as the responsible authority and cites:

- Gambling Act B.E. 2478 (พระราชบัญญัติการพนัน พุทธศักราช 2478)
- Ministerial Regulation No. 17 B.E. 2503 (กฎกระทรวง ฉบับที่ 17 พ.ศ. 2503)

The official procedure describes in-person application channels including the Department of Provincial Administration public service location in Bangkok and district offices, with application/document review steps.

### Kinaraidee launch rule

Until the final mechanics are reviewed against the current official procedure:

- `entries_open` must remain `false`
- public eligible count must remain `0`
- no paid Premium purchase may create a prize entry
- no marketing copy may say the user “has received” or “has confirmed” a prize chance
- no drawing date may be promoted as final

Before LIVE, obtain a written/traceable determination of which authorization/license procedure applies to the exact final mechanic, and obtain the required approval/license before the first qualifying participation period begins if the authority confirms it is required.

Official source:

- Government Contact Center procedure: https://info.go.th/procedure/94e56d29-5ef8-4188-a429-a9c7f4ae614a/view

## 2. Application materials / rules must be final before filing

Current Department of Provincial Administration materials indicate that an application package for chance-based promotional prizes includes detailed information about the game/campaign rules, participation period, conditions, prizes and advertising materials.

Operational consequence:

Do not submit a “placeholder” campaign and later silently change material terms such as:

- who qualifies
- whether purchase/Premium status is required
- start/end dates
- eligibility checkpoint
- drawing method
- drawing date/place
- number/value/model of prizes
- treatment of cancelled/refunded subscriptions
- how winners are contacted
- claim deadline
- alternate winner procedure

Any material change must be checked against the approved filing/license and authority requirements before publication.

Department of Provincial Administration reference material:

- https://multi.dopa.go.th/service/official_letter/download/95

## 3. Lead-time gate

Current government procedure pages show multi-stage document examination and approval, not an instant online self-certification. Some published government service entries for this licensing family list sequential document-review, examination and approval stages extending well beyond a few days.

### Planning rule

- Do not announce a LIVE start date based on an assumption that authorization is immediate.
- Treat the licensing path as a schedule dependency.
- Confirm the current processing route and expected lead time with the competent DOPA/district office for the actual applicant entity before fixing launch dates in advertising or payment flows.

## 4. Prize withholding-tax preflight

The Thai Revenue Department currently states that payment of prizes from contests, competitions, sweepstakes or similar activities is subject to **5% withholding tax** under the cited withholding-tax rules.

Revenue Department materials also contain examples involving non-cash prizes where withholding obligations are determined from prize value.

### Kinaraidee launch rule

Before acquiring/publishing the final prize and rules, have the accountant/tax adviser for the actual campaign entity confirm at least:

- the taxable value used for the iPhone prize
- who legally bears/pays the withholding amount
- how withholding is collected/paid if the prize is non-cash
- which withholding return/certificate process applies to the final winner/entity
- whether VAT or other tax/accounting treatment arises from acquiring/transferring the prize
- what winner disclosure belongs in the official rules

Do not tell a winner “all taxes are covered” or “winner pays all taxes” until the exact treatment has been approved and written into the rules.

Official Revenue Department sources:

- Withholding rule summary: https://www.rd.go.th/3535.html
- Order ท.ป.4/2528: https://www.rd.go.th/3479.html
- Example involving promotional sweepstakes: https://www.rd.go.th/26556.html

## 5. Winner-selection integrity gate

Legal approval and technical integrity must meet at the same boundary.

Before LIVE, the final winner-selection procedure must define:

- the exact eligible population snapshot/checkpoint
- how unique people/accounts are handled
- exclusions (test/internal/refunded/revoked/fraud/disqualified accounts)
- the randomization/drawing method
- who witnesses/operates the draw if required
- evidence retained from the eligible snapshot and selection
- what happens if the first selected person is not finally eligible or does not claim the prize
- how and when results are announced

The implementation must never let an administrator type a winner directly into the public UI and call that the random draw.

## 6. Premium/payment gate remains separate

Even if a promotional-prize license/approval is obtained, the campaign must remain PRE-LAUNCH until the payment/Premium gates are also complete:

- provider and merchant account selected
- price/billing cadence approved
- real subscription backend implemented and reviewed
- webhook/provider authority verified
- sandbox lifecycle tests passed
- refund/cancellation/dispute effects approved
- production payment configuration accepted

Likewise, payment readiness alone does not authorize the chance-based prize campaign.

## 7. Consumer-facing rule checklist

Before any entry is accepted, publish final rules that clearly cover, as applicable to the approved campaign:

- organizer/legal entity and contact channel
- campaign eligibility
- excluded persons/accounts
- geographic/residency/age requirements if applicable
- participation start/end timestamps and timezone
- exact Premium/payment condition
- effect of cancellation, failed payment, refund or chargeback
- one-person/account rule
- prize description and value
- number of prizes
- drawing/selection date and method
- result publication/contact process
- winner verification
- claim deadline and alternate-winner process
- prize delivery method
- withholding tax/tax responsibility language approved by accountant/adviser
- privacy use for campaign administration
- fraud/abuse/disqualification rule
- force-majeure/operational changes only to the extent legally permitted
- Apple non-sponsorship/non-endorsement disclaimer
- license/approval information required to be displayed, if applicable

The rules displayed to users must match the approved campaign mechanics and backend eligibility logic.

## 8. Privacy preflight

Campaign administration may require winner identity/contact verification beyond ordinary app use. Before collecting additional data:

- identify the actual fields required
- define purpose and retention
- restrict access to campaign operations personnel
- avoid exposing eligible-member lists publicly
- publish/update privacy disclosures as required
- do not use payment references or authentication secrets as public campaign identifiers

Public progress should remain an aggregate count only.

## 9. Evidence required to change PRE-LAUNCH → LIVE

Do not switch `campaign_status` to `live` until repository/operations records contain traceable evidence for all applicable items:

- [ ] final campaign mechanic approved internally
- [ ] competent-authority/legal review completed
- [ ] required DOPA authorization/license obtained (if applicable to final mechanic)
- [ ] approved campaign dates and drawing procedure recorded
- [ ] final public rules match the approved filing/mechanics
- [ ] prize ownership/procurement/value documented
- [ ] withholding-tax/accounting treatment approved
- [ ] payment provider/merchant/Premium gates passed
- [ ] backend entitlement and unique-user eligibility count tested
- [ ] refund/cancellation/disqualification rules implemented
- [ ] winner-selection procedure tested/auditable
- [ ] privacy/support/incident owners ready
- [ ] public page/legal text reviewed
- [ ] kill switch tested

## 10. Alternative design option

If licensing timing or chance-based promotion constraints do not fit the business plan, the team may redesign the campaign **before launch** (for example, a non-random benefit or another mechanic), but the alternative must receive its own legal/tax review. Do not assume that changing wording alone changes the legal substance.

## Current conclusion

The existing PRE-LAUNCH implementation is the correct operational state. Based on current official Thai-government information, Kinaraidee should treat the chance-based paid-Premium prize concept as having a **hard legal/authorization and tax preflight dependency** before entries open.

No LIVE entry, non-zero campaign count, drawing or winner announcement is authorized by this document.
