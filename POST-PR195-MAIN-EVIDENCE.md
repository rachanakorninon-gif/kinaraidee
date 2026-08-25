# Post-PR195 Main Evidence

Reviewed `main` descendant: `d3dd2e975257ad53f70951cf220ad7c9a4c6b1ce` (PR #195 merge).

## Verified repository evidence

- PR #195 records the physical Android post-v16 Favorite restart acceptance captured on 2026-08-25.
- The tested installed-PWA session created a fresh favorite, observed the favorite count increase from 4 to 5, fully closed the PWA from Recent Apps, reopened without clearing data, and retained the same favorite with count 5.
- Issue #177 is closed completed for that tested Android session.
- PR-head `08816e1a8f96013eb5b8f92ceabb9747d625478c` completed successfully for Release Baseline Regression, Release Consistency, History Sync Regression, Device UX Regression, Real Device Contract Regression, Beta QA, Beta integrity, Security Hygiene, Runtime Lineage, PWA Cache Upgrade, Deployment Diagnostic Regression, Governance Required Checks Regression and the other triggered repository checks.

## Lineage boundary

PR #195 changes device/release evidence and evidence guards only. It does not supersede the browser/PWA runtime candidate, Group API source candidate, Partner API source candidate or Supabase runtime/schema state.

The browser/PWA runtime remains `kinaraidee-beta-v16` with deployed merge SHA `1d21613c3c7d3e62ed8f7e5c3f00700606129c58` and the previously verified Pages/Live Smoke trace.

## Evidence boundary

This is a scoped PASS only for the tested Android installed-PWA Favorite/History restart path. It does not create or infer:

- NF-07 old-cache upgrade PASS;
- NF-09 TalkBack/VoiceOver PASS;
- NF-05 iPhone/iPad install-hint/standalone PASS;
- iPhone TC-08 Location PASS or closure of Issue #171;
- full Android/iPhone device-matrix PASS;
- Supabase leaked-password protection PASS;
- payment, partner, conversion, revenue or legal approval;
- Public Beta completion or Commercial GO.

`CURRENT-RELEASE.md` and `CURRENT-RUNTIME.md` remain canonical. This evidence file exists to preserve the verified post-PR195 lineage without promoting unrelated gates.