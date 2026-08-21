# CI Verification

This file exists to provide a reviewable, traceable trigger for pull-request CI without changing production behavior.

## Purpose
- Trigger `pull_request` validation for `qa.yml` and `beta-check.yml`.
- Capture an auditable CI run against the current release-candidate code.
- Keep production deployment on `main` unchanged until CI evidence is reviewed.

## Release candidate
- Base branch: `main`
- Expected Service Worker cache generation: `kinaraidee-beta-v11`
- CI results must come from actual GitHub Actions runs; do not mark PASS from static inspection alone.
