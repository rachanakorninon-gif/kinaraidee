# Post-f460 Main PR CI Validation

Status: **REPOSITORY QA / EVIDENCE VALIDATION ONLY**

Baseline routed through pull-request CI: `04aed7b1f83302d0298d147d513459c047fe6bb0`
Prior canonical reviewed descendant: `ca339234fc66396ba6b7ededfbb83a830334c0ad`

## Why this validation exists

The current `main` branch is not protected, so repository/documentation/security-contract changes can enter `main` without enforced pull-request checks. The range after the prior canonical reviewed descendant contains evidence/security-contract changes including the Partner retention dry-run contract, Supabase RLS negative-evidence regression updates, data-governance updates and recurring backend monitoring evidence.

This file routes the exact current-main baseline through pull-request CI so the repository guards can evaluate that state together.

## Compared range

Repository compare from `ca339234fc66396ba6b7ededfbb83a830334c0ad` to `04aed7b1f83302d0298d147d513459c047fe6bb0` is 15 commits ahead and changes:

- Partner retention dry-run SQL and regression workflow;
- Supabase RLS negative-evidence workflow/evidence;
- data-governance and monitoring documents;
- release/evidence documents.

The compared range does not contain browser/PWA runtime assets, Group API function source or Partner API function source changes.

## Evidence boundaries

This validation does **not** create or infer:

- a real-device or accessibility PASS;
- Public Beta completion;
- partner searches, clicks or conversions;
- user counts, conversion rates or revenue;
- an approved retention period or executed deletion;
- alert delivery, monitoring ownership or production SLA/SLO;
- branch-protection enforcement;
- Commercial GO.

The Partner retention dry-run contract remains policy-neutral and read-only; it is not retention-policy approval or cleanup execution evidence.

The recurring Group/Partner scheduled-run history remains synthetic rejection-monitor evidence only and must not be promoted to successful product-action, traffic, conversion or revenue evidence.
