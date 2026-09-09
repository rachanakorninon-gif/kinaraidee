# PWA Cache Namespace Deployment Evidence — 2026-09-09

Status: **DEPLOYMENT TRACE PASS / PHYSICAL EVIDENCE UNCHANGED**

This record captures the verified deployment trace for PR #578 (`fix(pwa): scope Service Worker cache cleanup`). It is deployment/live-source evidence only and does not create or broaden Physical PASS, Public Beta completion, user traction, payment readiness, or Commercial GO.

## Runtime lineage

- Browser/PWA source candidate: `443be601c36ab89b14c8bf05e226bd1c2ca04c23`
- PR #578 merged-main descendant: `1966839c38d8da3d48fde24f3e4ddf0f8d2cbf22`
- Service Worker cache marker remains: `kinaraidee-beta-v16`
- Scope: Service Worker activation removes only older Kinaraidee-owned `kinaraidee-beta-v*` caches and preserves unrelated Cache Storage entries on the same origin. This is not a cache-generation bump.

## Exact deployment evidence

- GitHub Pages run `34378941715` completed **SUCCESS** for deployed merge SHA `1966839c38d8da3d48fde24f3e4ddf0f8d2cbf22`.
- Corresponding `Kinaraidee Live Smoke Test` run `34379025067` completed **SUCCESS**.
- The live-smoke job recorded `DEPLOY_HEAD_SHA=1966839c38d8da3d48fde24f3e4ddf0f8d2cbf22` and `DEPLOY_RUN_ID=34378941715`, directly tying the live verification to that Pages deployment even though the workflow-run checkout SHA had advanced with later documentation merges.
- The live smoke read public `release-meta.json` and reported deployed SHA `1966839c38d8da3d48fde24f3e4ddf0f8d2cbf22`.
- The live Service Worker cache marker and release metadata both matched `kinaraidee-beta-v16`.
- Public pages/assets and the current runtime contract passed the live checks; development-only paths checked by the workflow were not publicly exposed.

## Evidence boundary

This establishes **Deployment PASS for the PR #578 browser/PWA deployment trace**. It does not establish a Service Worker upgrade Physical PASS on any new device/session and does not replace existing scoped NF-07 evidence.

Existing physical results retain only their documented scopes. In particular, affected-iPhone Issues #524 and #545 remain pending until their required physical retests are completed, and the newer core-control accessibility behavior still requires the applicable physical/assistive-technology verification. Public Beta remains incomplete until all independent release gates are satisfied.
