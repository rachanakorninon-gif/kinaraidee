# Payment & Premium Commercial Decision

Status: **NOT APPROVED**

This document is the Commercial-readiness decision gate for payment and Premium monetization. It intentionally does **not** select a provider, merchant account, price, entitlement model, refund policy, webhook contract, reconciliation process, or authorize real-money acceptance.

## Decision inputs

- Time-bounded Thailand provider research: `PAYMENT-PROVIDER-RESEARCH-SNAPSHOT.md` (2026-09-04).
- That snapshot is research-only. Stripe/Omise/2C2P comparisons, public pricing, recurring capability and PromptPay notes must be rechecked at provider-selection time and do **not** populate or approve any field below automatically.

## Decision fields

- Payment provider: **UNSET**
- Merchant/business account: **UNSET**
- Supported currency/market: **UNSET**
- Premium price/billing cadence: **UNSET**
- Free vs Premium entitlement definition: **UNSET**
- Provider-supported sandbox/test environment: **UNSET**
- Server-side entitlement/webhook verification design: **UNSET**
- Renewal/cancel/payment-failure behavior: **UNSET**
- Refund/dispute/chargeback process: **UNSET**
- Transaction audit/reconciliation owner: **UNSET**
- Privacy/Terms/payment disclosure reference: **UNSET**
- Commercial owner/approver: **UNSET**
- Approved at: **UNSET**

## Approval rule

Do not change Status to **APPROVED** until every applicable field above contains a real reviewed value and the selected provider/account and policy dependencies are traceable. If a field is genuinely not applicable, record the reviewed rationale explicitly rather than inventing a value.

When approved, `Approved at` must be a real timezone-qualified ISO-8601 timestamp (for example `2026-08-28T00:45:00+07:00` or a `Z`-suffixed UTC value) and must not be materially in the future. This timestamp records decision traceability only; it is not payment-execution evidence.

Approval of this decision record does not itself prove subscribe/renew/cancel/payment-failure execution, webhook integrity, entitlement correctness, reconciliation, refund handling, Public Beta completion, or Commercial GO. Those require separate provider-backed sandbox/controlled evidence before accepting real money.

## Evidence boundary

Repository architecture, UI concepts, static CI, draft pricing ideas, provider research, sandbox plans, issue comments, or this decision record are planning/governance evidence only. They do not prove a merchant account exists, a payment provider has been selected, a transaction occurred, Premium entitlement works, a conversion happened, revenue exists, Privacy/Terms are approved, Public Beta is complete, or Commercial GO is authorized.
