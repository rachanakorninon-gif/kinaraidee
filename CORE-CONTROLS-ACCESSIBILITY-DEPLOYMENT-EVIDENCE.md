# Core Controls Accessibility — Deployment Evidence

Date: 2026-09-09 (Asia/Bangkok)

Status: **DEPLOYMENT TRACE VERIFIED / PHYSICAL ASSISTIVE-TECH ACCEPTANCE NOT INFERRED**

## Scope

This record captures the deployment trace for the browser/PWA core-control accessibility remediation introduced through PR #579. The runtime change is intentionally narrow:

- icon-only Back controls have explicit Thai accessible names;
- the Result Share icon control has an explicit Thai accessible name;
- people-count decrement/increment controls have explicit Thai accessible names;
- the current people count is exposed as a polite, atomic live status.

The visible UI, recommendation logic, navigation destinations, auth, backend, payment, persistence and Product Event behavior were not intentionally changed by this remediation.

## Source / merge lineage

- Source runtime candidate: `062f8b08403918a9766995f814c0f9e99a06dc67`
- PR: #579 — `a11y: name icon-only core controls`
- PR exact head after regression guard addition: `102ae65aa8f314c5d3699fba8cd1e287875605a5`
- Merged-main descendant: `05d85b436bcc0da3e107c349d22a8315ad9c4acf`
- Later docs-only main descendant observed after deployment: `b5fb6c4c910820f8a59f3225825b4520b533b873`

The merge method intentionally preserved the source runtime candidate in main ancestry. No guarded browser/PWA runtime file changed between candidate `062f8b08403918a9766995f814c0f9e99a06dc67` and deployed descendant `05d85b436bcc0da3e107c349d22a8315ad9c4acf` other than the candidate change itself.

## Static / CI contract

`Device UX Regression` was extended to assert the accessible-name contract for the icon-only Back/Share controls, the people decrement/increment controls, and the people-count live status. The exact PR head passed the repository regression suite before merge, including the runtime-lineage and release-consistency guards.

Current shipped source on main contains the explicit Thai accessible names and the polite atomic people-count status in `index.html`.

## Exact deployment evidence

- GitHub Pages run `34378603648`
  - head SHA: `05d85b436bcc0da3e107c349d22a8315ad9c4acf`
  - workflow: `Deploy Kinaraidee to GitHub Pages`
  - conclusion: **SUCCESS**
- Main Live Smoke run `34378692026`
  - head SHA: `05d85b436bcc0da3e107c349d22a8315ad9c4acf`
  - workflow: `Kinaraidee Live Smoke Test`
  - conclusion: **SUCCESS**
- Auth Password Security Live Smoke run `34378691954`
  - head SHA: `05d85b436bcc0da3e107c349d22a8315ad9c4acf`
  - conclusion: **SUCCESS**
- Campaign 3000 Premium Live Smoke run `34378691959`
  - head SHA: `05d85b436bcc0da3e107c349d22a8315ad9c4acf`
  - conclusion: **SUCCESS**

This establishes a verified deployment trace for the PR #579 accessibility source on the exact deployed descendant above.

## Evidence boundary

This record is **deployment evidence**, not a new physical assistive-technology PASS. It does not establish VoiceOver, TalkBack, screen-reader focus/announcement quality, switch-control behavior, another-device acceptance, full accessibility conformance, Public Beta completion, Privacy/Legal approval, Payment/Premium readiness or Commercial GO.

Historical physical accessibility results retain only their recorded scope. In particular, the existing iPhone/VoiceOver PASS remains scoped to its recorded prior session; it is not automatically re-used as physical acceptance of this new deployed control-label remediation. Android TalkBack remains subject to its separately recorded evidence state and any fresh physical retest required by the QA matrix.

A later browser/PWA runtime candidate may supersede this deployment as the *current* runtime. If that occurs, this file remains valid as historical deployment evidence for PR #579 only and must not be used to claim that a later runtime is deployed or physically accepted.
