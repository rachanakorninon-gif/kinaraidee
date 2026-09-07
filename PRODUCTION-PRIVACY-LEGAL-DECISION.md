# Production Privacy & Legal Decision

Status: **NOT APPROVED**

This document is the strict Commercial-readiness decision gate for Production Privacy/Legal. It intentionally does **not** publish or approve a Production Privacy Policy, Terms of Service, controller identity, legal basis, retention schedule, vendor disclosure, or legal review result.

Owner-confirmed business/contact inputs from the 2026-09-07 decision session are recorded in `BUSINESS-COMMERCIAL-BASELINE.md`, including the individual/natural-person merchant form, Production-facing contact `rachanakorn.inon@gmail.com`, Web/PWA-first direction, payment/business-policy direction, and the under-20 policy direction. Those inputs are implementation/planning inputs only and do not automatically populate or approve the strict Legal gate below.

## Decision fields

- Service/controller legal identity: **UNSET**
- Production contact channel: **UNSET**
- Privacy Policy URL/version: **UNSET**
- Terms of Service URL/version: **UNSET**
- PDPA/legal reviewer or approver: **UNSET**
- Processing-purpose/legal-basis review: **UNSET**
- Approved retention decision reference: **UNSET**
- Data-rights procedure owner: **UNSET**
- Supabase/vendor disclosure review: **UNSET**
- Maps/location disclosure review: **UNSET**
- Payment-provider disclosure review: **UNSET**
- Partner-tracking disclosure/agreement review: **UNSET**
- Approved at: **UNSET**

## Confirmed planning inputs that remain below Legal approval

The owner-approved business baseline provides useful drafting inputs, but each must still be mapped to the actual Production implementation and reviewed under this gate before publication/approval. In particular:
- customer-facing support/privacy/legal contact is intended to be `rachanakorn.inon@gmail.com`
- first commercial distribution path is Web/PWA
- Premium Beta business price is THB 59/month with no Free Trial
- PromptPay is planned as customer-initiated per paid period rather than auto-renew
- card auto-renew remains conditional on provider/account-specific recurring-card validation
- under-20 Free/Premium handling remains subject to applicable law and final guardian/legal-representative consent UX where required

None of the above is a legal conclusion or Legal PASS.

## Approval rule

Do not change Status to **APPROVED** until every applicable field above contains a real reviewed value and the corresponding Production documents are actually published or otherwise traceable as required. Beta notices, implementation behavior, policy-neutral retention drafts, dry-run SQL, static CI, issue comments, or owner-approved business direction must not be promoted to Production Privacy/Legal approval.

If a field is genuinely not applicable, record the reviewed rationale explicitly rather than inventing a value. Retention approval remains dependent on the canonical data-retention decisions and must not be inferred from product expiry, current row ages, dry-run thresholds, or database defaults.

## Evidence boundary

Existing Beta privacy notices, owner-confirmed planning inputs, location minimization behavior, Partner application privacy acknowledgement fields, `DATA-GOVERNANCE-DRAFT.md`, retention dry-run tooling, vendor implementation details, and this decision record are planning/implementation evidence only. They do not prove Production Privacy Policy publication, Terms acceptance, controller/contact disclosure under the final legal identity, PDPA/legal approval, approved retention, data-rights execution, vendor/payment/partner legal review, Public Beta completion, or Commercial GO.
