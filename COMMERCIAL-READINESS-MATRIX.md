# กินอะไรดี — Commercial Readiness Matrix

Status: **COMMERCIAL NO-GO / BUSINESS BASELINE APPROVED / EXECUTION EVIDENCE INCOMPLETE**

Canonical business baseline: `BUSINESS-COMMERCIAL-BASELINE.md`  
Strict payment gate: `PAYMENT-PREMIUM-DECISION.md`  
Strict legal gate: `PRODUCTION-PRIVACY-LEGAL-DECISION.md`  
Commercial tracker: Issue #2  
Public Beta/recruitment trackers: Issues #1, #3, #5

เอกสารนี้เป็น **routing / evidence matrix** เพื่อแยกสิ่งที่เจ้าของอนุมัติเป็นแผนธุรกิจแล้ว ออกจากสิ่งที่ยังต้องมี provider / Production / real-device / legal / operational evidence ก่อนเปิดเชิงพาณิชย์

เอกสารนี้ไม่สร้าง Payment PASS, Legal PASS, Public Beta PASS, user, conversion, partner, subscriber, revenue, CAC, LTV หรือ Commercial GO ใด ๆ

## 1. Current gate summary

| Gate | Current status | What is already true | What still blocks PASS |
|---|---|---|---|
| Business baseline | **APPROVED** | Web/PWA first, Premium THB 59/month, no Free Trial, Free core retained, Stripe Payments first-provider baseline, individual/natural-person merchant direction, card conditional auto-renew target, PromptPay manual per paid period, cancellation/refund direction, affiliate/commission direction | No additional business decision needed unless provider/legal/implementation evidence forces a change |
| Public Beta recruitment | **NOT OPEN** | Recruitment kit, measurement templates and evidence rules prepared | Issue #3 remains gated by Issues #1/#5, required physical-device coverage, measured defect closure and other Beta gates |
| Payment | **PENDING / NO-GO** | Architecture and lifecycle contracts prepared; price/provider direction approved | Account-specific Stripe validation in #357, merchant onboarding/KYC through owner-authorized path, implementation in #366, provider-backed Test Mode lifecycle, idempotent verified webhook/event handling, reconciliation, controlled Production acceptance |
| Legal / Privacy | **PENDING / NO-GO** | Business/contact inputs and policy drafts exist | Final controller legal identity, Production Privacy/Terms publication/review, PDPA/legal review, retention approvals, data-rights operation, vendor/payment/partner disclosure review |
| Tracking / measurement | **PREPARED / PRODUCTION QUALITY PENDING** | `BETA-METRICS.md`, `BETA-DAILY-LOG.md`, `BETA-RESULTS-TEMPLATE.md` and business-evidence CI guards distinguish real results from QA/synthetic/planning data | Recruitment must open, real traffic must exist, event/data-quality checks must be validated on Production data before metrics drive SCALE decisions |
| QA / physical acceptance | **PENDING** | Multiple scoped physical PASS records exist and are preserved at their exact scope | Issues #1/#5 still require broader distinct-device matrix, remaining TC/NF coverage, measured Blocker/Critical closure and other release-scope acceptance |
| Support | **PARTIAL / PENDING** | Customer-facing contact baseline = `rachanakorn.inon@gmail.com`; support/runbook preparation exists | Production support ownership/escalation, payment cancellation/refund/dispute handling and actual operational path must be verified before Commercial GO |
| Security | **NOT PASS** | Repository/security hardening and scoped backend negative/physical evidence exist | Supabase leaked-password protection remains blocked/not-pass in Issue #372; payment/entitlement security cannot pass before the real payment implementation exists and is reviewed |
| Operations | **PENDING** | Incident/rollback/monitoring preparation and synthetic probes exist | Production owner/on-call, alert delivery, real traffic baseline, approved backup posture, restore/rollback drills and launched-flow traffic-stop evidence remain open |
| Restaurant affiliate/commission | **VALIDATION ONLY** | Owner-approved direction = verifiable affiliate/commission | No real commercial partner/provider agreement, commission terms, verified conversion/reconciliation or paid commission evidence yet |
| Paid acquisition / ads | **LOCKED FROM SCALE** | UTM/measurement and experiment discipline prepared | No real Beta funnel/retention/unit-economics evidence; CAC/LTV remain unknown; paid media must not scale before Product/Funnel/Tracking readiness supports it |
| Commercial GO | **NO-GO** | Business preparation is materially advanced | Any applicable critical gate above at `FAIL`, `PENDING`, `NOT PASS` or `INCONCLUSIVE` keeps Commercial GO closed |

## 2. Business decisions that must not be reopened accidentally

The following are owner-approved planning inputs and should not be reset to “undecided” merely because strict execution gates remain open:

- first commercial distribution path: **Web/PWA first**
- Premium Beta price: **THB 59/month**
- Free Trial: **none for first Beta**
- Free core keeps `ไม่รู้เลย` and basic recommendation usable
- first-provider baseline: **Stripe Payments**
- merchant form baseline: **individual / natural person, Thailand / THB**
- card: automatic monthly renewal is a **target only after provider/account-specific recurring/off-session validation**
- PromptPay: **customer-initiated per paid period / no auto-renew**
- cancellation: stop future renewal; already-paid Premium continues to paid-period end
- failed payment: must not extend Premium
- downgrade: return to Free without deleting user-owned Favorites/History/Preferences solely because of the plan change
- restaurant monetization direction: **affiliate/commission from verifiable action/transaction**
- Sponsored Listing: later phase only after real traffic and clear disclosure

These are **plans/decisions**, not successful execution or business results.

## 3. Payment truth hierarchy

The intended evidence chain is:

`Premium offer view`
→ `checkout start`
→ provider-authoritative successful payment
→ backend-authoritative Premium entitlement
→ renewal/cancel/expiry/refund/dispute lifecycle
→ reconciliation

Rules:

- checkout is not payment
- browser redirect is not payment truth
- provider success without matching entitlement is an incident, not a clean conversion
- entitlement without trusted payment support is an incident
- Test Mode/sandbox is not Production revenue
- card auto-renew must remain disabled/not-promised until the account-specific recurring/off-session gate passes
- PromptPay must remain non-recurring unless future provider-backed evidence and a new reviewed decision change that fact

## 4. Growth / acquisition gate

Paid acquisition is not authorized to scale from creative/media metrics alone.

Before increasing paid spend materially, require trustworthy evidence across:

1. Product — core recommendation flow works and solves the intended decision problem for real users
2. Funnel — acquisition → activation → result/engagement is measured with clear denominators
3. Tracking — UTM/event/user/account definitions are reliable and QA/synthetic traffic is excluded
4. Retention — repeat usage / matured D1/D7/D30 cohorts are interpreted correctly
5. Monetization — if Premium is advertised, the Payment/Legal/QA/Support/Security path relevant to the offer is ready
6. Unit economics — actual spend and actual paying customers are available before claiming CAC; real paid lifetime/cost evidence is required before observed LTV exists

`CTR`, impressions, views, signup intent, Premium CTA clicks or checkout starts alone are not SCALE evidence.

## 5. Restaurant monetization truth hierarchy

Use the following stages separately:

`restaurant click`
→ tracked partner action
→ confirmed transaction
→ approved commission
→ paid commission

A click/search does not establish a transaction, partner revenue or commission. Beta Partner form/QA evidence does not create a commercial partner.

## 6. Work that can continue autonomously now

Without opening real-money, legal authority, ad spend or external-owner actions, repository work may continue on:

- documentation/CI consistency and evidence-boundary guards
- Beta measurement/reporting templates and data-quality checks
- Test Mode acceptance cases and reconciliation specifications that do not require merchant authority
- payment/entitlement schema and security design preparation while executable provider-gated work remains blocked by #357/#366 prerequisites
- support/refund/dispute/incident runbook preparation
- affiliate conversion/reconciliation contracts without inventing a partner agreement
- organic/paid experiment plans, UTM conventions and reporting definitions without launching/spending
- legal/privacy inventory and draft mapping without declaring Legal PASS

## 7. Actions that still require owner/external/physical authority

Do not perform or claim these autonomously:

- merchant onboarding/KYC, identity-document submission, provider term acceptance or Production payment activation
- spending money, changing paid plans or starting ad campaigns
- contacting legal/competent authorities as though authorization has been granted
- approving final controller identity/legal basis/retention policy or declaring Legal PASS
- opening Public Beta recruitment before Issue #3 gate actually opens
- claiming physical-device PASS without real-device evidence
- signing restaurant/affiliate agreements or counting partners/commission without real evidence
- opening the 3,000-Premium prize campaign or creating prize eligibility from planning/Test Mode data

## 8. Decision vocabulary

Use these meanings consistently:

- **APPROVED PLAN / BASELINE** — owner decision exists; execution may still be absent
- **PENDING** — required evidence/action has not yet completed
- **INCONCLUSIVE** — evidence exists but is insufficient/unreliable
- **PASS** — the specific defined gate has traceable evidence at its stated scope
- **NO-GO** — at least one required gate is not PASS
- **SCALE** — only after the pre-declared Product/Funnel/Tracking/Retention/economics conditions are supported by real evidence

Never promote a plan, design, CI run, synthetic probe, sandbox transaction, survey intent or scoped QA observation into a broader business result.

## 9. Current commercial conclusion

- Business baseline: **APPROVED**
- Public Beta recruitment: **NOT OPEN**
- Payment: **PENDING / NO-GO**
- Legal: **PENDING / NO-GO**
- Tracking: **PREPARED; real-user Production evidence pending**
- QA: **PENDING**
- Support: **PARTIAL / PENDING**
- Security: **NOT PASS**
- Operations: **PENDING**
- Restaurant monetization: **VALIDATION ONLY / no real commercial result established**
- Paid acquisition: **NO SCALE authority**
- Commercial GO: **NO-GO**

When evidence changes, update the canonical gate/issue first and then synchronize this matrix. A newer runtime/CI commit alone must not silently change Payment, Legal, user, partner, revenue or Commercial status.
