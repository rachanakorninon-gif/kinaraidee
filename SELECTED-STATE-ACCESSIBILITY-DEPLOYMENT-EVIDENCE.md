# Selected-State Accessibility — Deployment Evidence

Date: 2026-09-11 (Asia/Bangkok)

Status: **DEPLOYMENT TRACE VERIFIED / PHYSICAL ASSISTIVE-TECH ACCEPTANCE NOT INFERRED**

## Scope

This record captures the exact browser/PWA deployment trace for Issue #583 / PR #602. The remediation exposes the existing visual choice state to assistive technology by keeping `aria-pressed` synchronized with the `.on` state for Meal, People, Budget, Preference, and the `ไม่รู้เลย` choice control.

The existing product interaction model, recommendation behavior, navigation destinations, persistence, auth, backend, analytics and PWA cache generation were not intentionally changed by this remediation.

## Source / merge lineage

- Source runtime candidate: `0968f7cf7f1559f48837172e9a1b3a28b9877b5a`
- PR: #602 — `fix(a11y): expose selected state for core choice controls`
- Final reviewed PR head: `96f0a01375bdb3c87477975d143907f7078a9170`
- Merged-main/deployed descendant: `969d9f4241d3ff5d8d2c1749d66516a72d3d582d`
- PWA cache marker: `kinaraidee-beta-v16`

The merge commit preserves the reviewed PR head as a parent, so the declared source candidate remains in the deployed main ancestry.

## Source / CI contract

`Device UX Regression` guards the selected-state contract. The reviewed PR head passed the repository regression suite, including runtime-lineage, release-baseline, release-consistency and deployment-status guards, before merge.

The selected-state behavior remains scoped to the existing choice controls. Visual `.on` state remains the product source of truth and `aria-pressed` mirrors it for programmatic exposure.

## Exact deployment evidence

- GitHub Pages run `34559056400`
  - head SHA: `969d9f4241d3ff5d8d2c1749d66516a72d3d582d`
  - conclusion: **SUCCESS**
- Kinaraidee Live Smoke run `34559096757`
  - head SHA: `969d9f4241d3ff5d8d2c1749d66516a72d3d582d`
  - conclusion: **SUCCESS**
- Auth Password Security Live Smoke run `34559096658`
  - head SHA: `969d9f4241d3ff5d8d2c1749d66516a72d3d582d`
  - conclusion: **SUCCESS**
- Campaign 3000 Premium Live Smoke run `34559096690`
  - head SHA: `969d9f4241d3ff5d8d2c1749d66516a72d3d582d`
  - conclusion: **SUCCESS**

This establishes verified browser/PWA deployment lineage for the Issue #583 source candidate through the exact deployed merged-main descendant.

## Evidence boundary

This is source/CI/deployment evidence only. It is **not** a new VoiceOver, TalkBack, keyboard, switch-control or other physical assistive-technology PASS. It does not establish another-device acceptance, full accessibility conformance, Public Beta completion, Privacy/Legal approval, Payment/Premium readiness or Commercial GO.

Existing historical physical accessibility evidence remains scoped to the exact sessions in which it was captured and must not be reused as physical acceptance of this remediation. Any required assistive-technology verification for Issue #583 must be performed after this exact deployment and recorded separately.
