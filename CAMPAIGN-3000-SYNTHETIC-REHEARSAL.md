# Campaign 3,000 Premium — synthetic operations rehearsal

Status: **SYNTHETIC CI ONLY / PRE-LAUNCH / NO REAL PRIZE ENTRIES**

This document records the non-production rehearsal contract for the planned 3,000-Premium campaign. It exercises operational controls with synthetic identities only and intentionally creates no payment, Premium entitlement, campaign entry, eligible-member count, winner, legal approval or Commercial GO evidence.

## Purpose

The rehearsal validates that the operations design can fail closed before any provider, merchant, final rules, permit, tax treatment or production eligibility backend is approved.

It complements:

- `CAMPAIGN-3000-OPERATIONS-BLUEPRINT.md`
- `PREMIUM-CAMPAIGN-ELIGIBILITY-CONTRACT.md`
- `.github/workflows/premium-campaign-model-regression.yml`

The executable rehearsal is `.github/workflows/campaign-operations-rehearsal-regression.yml`.

## Synthetic-only identities

The workflow uses identifiers such as `syn-user-001`. They are not Supabase users, customer IDs, payment IDs or real participants.

No network request, database connection, provider SDK, Supabase mutation, email, phone number or personal identity is used by the rehearsal.

## Rehearsal coverage

The workflow must prove all of the following with ephemeral in-memory data:

1. `PRE_LAUNCH` has `entries_open=false` and public eligibility is empty.
2. A mock non-production transition to `LIVE` is audited.
3. Only synthetic active/allowed identities appear in technical eligibility; test/internal/refunded/disputed/revoked identities are excluded.
4. Kill-switch activation moves the rehearsal to a paused/fail-closed condition, stops new public eligibility and records actor/reason/time/order in the audit trail.
5. Resume is a separate audited action and cannot silently erase the pause record.
6. Close/cutoff prevents new public eligibility and creates a frozen synthetic population.
7. The frozen population is canonicalized and hashed with SHA-256; recomputing the same population reproduces the same digest.
8. Post-cutoff mutations to the working synthetic dataset cannot change the already-frozen population/digest.
9. Mock selection runs only against the frozen synthetic population and is explicitly marked `REHEARSAL_ONLY`.
10. A provisional-candidate invalidation requires a recorded reason before an alternate rehearsal selection may occur; no silent reselection is allowed.
11. A synthetic eligibility dispute records the server-authoritative resolution source rather than trusting screenshots/client claims.
12. Material state/admin actions appear in an ordered audit export.

## Mock selection boundary

The rehearsal uses a deterministic local algorithm solely to prove that an operational selection step consumes the frozen population and produces auditable evidence.

**It is not the approved production winner-selection mechanic.** The final mechanic remains TBD until the competent-authority/legal/permit path and published rules are approved. Passing this CI workflow must never be cited as permission to conduct a real draw or select a real winner.

## Evidence produced by CI

A successful run may establish only that the synthetic operational model passed its assertions, including:

- PRE_LAUNCH fail-closed behavior
- synthetic test/internal/refund/dispute exclusion
- audited pause/resume/close transitions
- kill-switch precedence
- reproducible synthetic population freeze digest
- frozen-population immutability in the rehearsal model
- rehearsal-only selection/alternate traceability
- synthetic dispute/audit-export traceability

The run output must state that it creates **no real eligibility, payment, prize entry, winner or Commercial GO evidence**.

## What remains external/real before LIVE

This rehearsal does not close any requirement for:

- real campaign owner/backup/contact assignment
- real technical/support/legal/tax owners
- final dates/cutoff
- approved Premium provider/merchant/price
- production subscription/entitlement backend
- sandbox provider lifecycle testing
- production payment acceptance
- final rules and competent-authority/permit path
- organizer-specific tax/withholding decision
- prize procurement/custody confirmation
- production support/contact route
- production security/privacy review
- real kill-switch drill against the eventual production backend
- final approved winner-selection procedure

## Promotion rule

Issue #368 may record the synthetic rehearsal items as prepared only when this workflow passes on the merged repository lineage. The issue itself must remain open while real legal/payment/ownership/prize/production gates are incomplete.
