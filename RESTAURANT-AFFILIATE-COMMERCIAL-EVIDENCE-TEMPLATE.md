# กินอะไรดี — Restaurant Affiliate / Commission Commercial Evidence Template

Status: **TEMPLATE ONLY / NO COMMERCIAL PARTNER OR REVENUE ESTABLISHED**

Use this file only to record a real restaurant/affiliate-provider commercial relationship after actual owner-authorized contact/agreement activity occurs. Do not pre-fill partner counts, conversion, commission or revenue from Beta forms, clicks, search demand, QA records or synthetic data.

Canonical direction:
- `BUSINESS-COMMERCIAL-BASELINE.md`
- `MONETIZATION-PLAN.md`
- `COMMERCIAL-READINESS-MATRIX.md`
- Issue #2 — Commercial launch gate
- Issue #123 — Partner API technical/retention/abuse-control tracker

Owner-approved direction: **affiliate / commission from a verifiable action or transaction**. Sponsored Listing is a later phase and is not covered by this template unless separately approved.

## 1. Partner / provider identity and authority

- Evidence date/timezone:
- Partner/provider legal/business name:
- Brand/display name:
- Contact channel:
- Authorized representative/team:
- Agreement/reference ID:
- Agreement effective date:
- Agreement end/renewal date:
- Owner approval reference:

Do not commit private bank details, personal identity documents, private API keys/secrets, confidential contract attachments or unnecessary PII to the public repository.

## 2. Commercial model

Record the actual agreed model:

- Model: `fixed confirmed action / fixed confirmed order / percentage of confirmed order / provider-defined affiliate payout / other`
- Currency:
- Commission amount/rate:
- Tax/VAT/withholding handling as reviewed:
- Minimum payout threshold:
- Payout schedule:
- Hold/reserve rules:
- Refund/cancel clawback rule:
- Dispute rule:
- Fraud/invalid-transaction rule:
- Attribution window:
- Duplicate conversion rule:
- Cross-device/cross-session attribution rule, if any:
- Eligible menus/locations/channels:
- Exclusions:

A proposed rate in a negotiation draft is not an approved commercial term until the agreement/evidence confirms it.

## 3. Conversion source of truth

Define every stage separately:

`restaurant click`
→ `tracked partner action`
→ `confirmed transaction`
→ `approved commission`
→ `paid commission`

### Restaurant click
- Source/event:
- Required fields:
- Privacy boundary:
- Does **not** count as transaction/revenue: **YES**

### Tracked partner action
- Provider/partner reference:
- Server/provider-verifiable?:
- Client-only state prohibited?:
- Deduplication key:

### Confirmed transaction
- Authoritative source:
- Confirmation timing:
- Transaction reference format:
- Cancellation/refund state source:
- Amount source:
- Currency source:

### Approved commission
- Approval source:
- Rate/amount calculation:
- Adjustment/clawback handling:
- Reconciliation reference:

### Paid commission
- Payout evidence source:
- Payout period:
- Paid amount:
- Settlement reference:

No earlier stage may be reported as a later one without the required authoritative evidence.

## 4. Tracking / technical contract

- Entry URL/deep-link format:
- Required attribution parameters:
- Provider click/reference ID:
- Server callback/webhook/API path:
- Authentication/signature method:
- Idempotency/deduplication method:
- Duplicate callback behavior:
- Out-of-order update behavior:
- Retry/replay method:
- Conversion lookup/reconciliation endpoint/report:
- Failure/timeout handling:
- Retention/privacy constraints:

If the relationship depends only on browser/client claims with no provider/backend-verifiable conversion truth, Commercial Affiliate GO remains blocked.

## 5. Destination / menu mapping acceptance

- Supported geographic area:
- Supported restaurant locations:
- Menu/category mapping source:
- Out-of-stock/unavailable behavior:
- Deep-link destination tested:
- Fallback behavior:
- User-facing partner/sponsored disclosure required:
- QA evidence reference:

A technically rendered partner result is not evidence of a commercial partner unless the real agreement exists.

## 6. Privacy / Terms / disclosure review

- Data sent to partner/provider:
- Data received from partner/provider:
- Personal data involved?:
- Location precision involved?:
- Tracking identifiers involved?:
- Privacy Policy disclosure reviewed/published?:
- Terms/Affiliate disclosure reviewed/published?:
- Sponsored label required?:
- Data retention approved?:
- Data-rights handling mapped?:
- Legal/PDPA reviewer reference:

If these are unresolved for the launched flow, Legal/Commercial GO remains pending.

## 7. Reconciliation test matrix

Do not mark PASS without real agreement/provider-backed test evidence appropriate to the integration.

- [ ] one tracked action maps to one provider reference
- [ ] duplicate click does not create duplicate confirmed transaction
- [ ] duplicate callback does not duplicate commission
- [ ] out-of-order status update resolves correctly
- [ ] cancelled order/action is not counted as confirmed revenue
- [ ] refunded order/action applies agreed clawback/adjustment
- [ ] invalid/fraudulent transaction is excluded according to rule
- [ ] provider report/API matches internal confirmed-transaction records
- [ ] approved commission matches contract rate/amount
- [ ] paid commission matches settlement evidence
- [ ] reconciliation mismatch is surfaced for review
- [ ] client tampering cannot manufacture confirmed conversion/commission

## 8. Commercial acceptance record

Complete only when supported by real evidence.

- Real agreement confirmed: `PENDING / YES / NO`
- Commercial terms approved: `PENDING / YES / NO`
- Conversion truth backend/provider-verifiable: `PENDING / YES / NO`
- Refund/cancel/dispute rules verified: `PENDING / YES / NO`
- Privacy/Terms disclosure matches actual flow: `PENDING / YES / NO`
- Reconciliation path verified: `PENDING / YES / NO`
- First controlled real conversion accepted: `PENDING / YES / NO`
- First approved commission: `PENDING / YES / NO`
- First commission actually paid: `PENDING / YES / NO`
- Affiliate/Commission GO: `NO-GO / CONDITIONAL / GO`
- Evidence references:
- Open blockers:

## 9. Reporting rules

Until evidence exists:

- Partner count: **NOT ESTABLISHED**
- Confirmed transaction: **NOT ESTABLISHED**
- Approved commission: **NOT ESTABLISHED**
- Paid commission: **NOT ESTABLISHED**
- Restaurant revenue: **NOT ESTABLISHED**

When real data exists, report each stage separately. Never compute affiliate revenue as `clicks × assumed conversion × assumed commission` and label it actual.

## Evidence boundary

This template, a Beta Partner form submission, restaurant click, Maps fallback, provider demo, technical integration, proposed commission rate or synthetic reconciliation test does **not** by itself establish a real commercial partner, confirmed transaction, approved commission, paid commission, revenue, Legal PASS, Public Beta completion or Commercial GO.
