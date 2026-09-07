# Home V3 deployment evidence

Date verified: 2026-09-07

## Source lineage

- Home V3 source was merged by PR #548.
- Current merged `main` SHA: `46136f5ca6322847545289c18233320139147aa2`.
- Merge commit message: `Merge pull request #548 from rachanakorninon-gif/design/home-v3-preview-20260906`.

## Deployment evidence

The following GitHub Actions runs are attached to the exact merged `main` SHA `46136f5ca6322847545289c18233320139147aa2` and completed successfully:

- GitHub Pages: run `34087987096` — SUCCESS.
- Kinaraidee Live Smoke Test: run `34088055637` — SUCCESS.
- Auth Password Security Live Smoke: run `34088055663` — SUCCESS.
- Campaign 3000 Premium Live Smoke: run `34088055657` — SUCCESS.

This establishes Deployment PASS for the Home V3 browser/PWA runtime lineage at the exact merged SHA above. It does not establish any physical-device acceptance.

## Acceptance boundaries

- Source PASS: PASS for the merged Home V3 source represented by PR #548 / merged `main` SHA above.
- CI PASS: PASS for the completed GitHub checks associated with the merged Home V3 change and current runtime lineage.
- Deployment PASS: PASS for GitHub Pages and post-deployment live-smoke evidence listed above on the exact merged SHA.
- Physical PASS: PENDING unless separately supported by real-device evidence for the current runtime and the specific test scope.

Historical physical sessions from earlier runtimes remain scoped historical evidence only. They must not be promoted to Home V3 physical PASS unless the relevant path was retested on the deployed Home V3 runtime.

## Release-status boundary

This evidence does **not** by itself establish Public Beta COMPLETE or Commercial GO. Device-matrix, accessibility, Auth/security, referral/acquisition, payment, partner, conversion, user-count, revenue, legal, and other release gates remain governed by their own evidence requirements.

## Documentation consistency note

`BETA-CHECKLIST.md` in the Home V3 merge still records the candidate as deployment-pending because that text was authored before the post-merge GitHub Pages and live-smoke runs completed. This file records the post-merge exact-SHA deployment evidence without reusing the previous Nearby runtime deployment as proof for Home V3.
