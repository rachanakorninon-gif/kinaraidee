# Payment & Premium Commercial Decision

Status: **NOT APPROVED**

This document is the strict Commercial-readiness decision gate for payment and Premium monetization. It intentionally remains **NOT APPROVED** until the repository's existing approval contract is satisfied, including Production Privacy/Legal approval and all required reviewed fields.

Owner-approved business inputs from the 2026-09-07 decision session are recorded separately in `BUSINESS-COMMERCIAL-BASELINE.md`. Those inputs are valid planning/implementation direction, but under this gate they do **not** populate or approve any field below automatically and do not authorize real-money acceptance.

## Decision inputs

- Owner-approved business baseline: `BUSINESS-COMMERCIAL-BASELINE.md` (2026-09-07).
- Time-bounded Thailand provider research: `PAYMENT-PROVIDER-RESEARCH-SNAPSHOT.md` (2026-09-04).
- Current Stripe official references are additionally recorded in the owner-approved baseline and must be rechecked before provider/account implementation.
- Provider research is research-only. Stripe/Omise/2C2P comparisons, public pricing, recurring capability and PromptPay notes must be rechecked at provider-selection/execution time and do **not** populate or approve any field below automatically.

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

## Why owner-approved inputs do not change this machine gate yet

The product owner has approved a Web/PWA Beta business direction including THB 59/month, Stripe Payments as the first provider baseline, individual/natural-person merchant form, card auto-renew as a conditional target, PromptPay manual per-period payment, Free/Premium principles, cancellation/refund policy direction, and related business inputs. See `BUSINESS-COMMERCIAL-BASELINE.md`.

This decision file intentionally keeps its machine-readable gate at `NOT APPROVED` because the repository contract requires a single all-fields approval state and ties that approval to Production Privacy/Legal approval. Recording those business inputs elsewhere prevents the repository from falsely promoting partial business decisions into Payment PASS or Commercial approval.

## Approval rule

Do not change Status to **APPROVED** until every applicable field above contains a real reviewed value and the selected provider/account and policy dependencies are traceable. If a field is genuinely not applicable, record the reviewed rationale explicitly rather than inventing a value.

When approved, `Approved at` must be a real timezone-qualified ISO-8601 timestamp (for example `2026-08-28T00:45:00+07:00` or a `Z`-suffixed UTC value) and must not be materially in the future. This timestamp records decision traceability only; it is not payment-execution evidence.

Approval of this decision record does not itself prove subscribe/renew/cancel/payment-failure execution, webhook integrity, entitlement correctness, reconciliation, refund handling, Public Beta completion, or Commercial GO. Those require separate provider-backed sandbox/controlled evidence before accepting real money.

## Evidence boundary

Repository architecture, UI concepts, static CI, draft pricing ideas, provider research, owner-approved business baseline, sandbox plans, issue comments, or this decision record are planning/governance evidence only. They do not prove a merchant account exists, a payment provider has been selected for Production execution, a transaction occurred, Premium entitlement works, a conversion happened, revenue exists, Privacy/Terms are approved, Public Beta is complete, or Commercial GO is authorized.
