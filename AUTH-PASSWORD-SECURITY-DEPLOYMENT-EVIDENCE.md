# Auth Password-Security UX — Deployment Evidence

Status: **DEPLOYED STATIC UX VERIFIED / AUTH CONFIGURATION NOT VERIFIED**

Date: 2026-08-29

## Scope

This evidence records the deployed browser-side password-security UX introduced by PR #373. It deliberately does **not** claim that Supabase leaked-password protection is enabled and does not claim a real weak/leaked password was rejected.

## Runtime lineage

- Browser/PWA runtime source candidate: PR #373 merged-main SHA `6cd98bf2a2020b86fe2ab05e263dd59f7e4fb387`.
- PR #374 is a docs-only post-merge lineage descendant: `0cc3ec3ef4dda18f0d8e083d8ca0992ef77f844c`.
- No guarded browser/PWA runtime files changed between the candidate and the deployed descendant.
- Service Worker marker remained `kinaraidee-beta-v16`.

## Deployment trace

- GitHub Pages run `33229525995` completed **success** for exact head SHA `0cc3ec3ef4dda18f0d8e083d8ca0992ef77f844c`.
- The Pages predeploy runtime/lineage guard completed successfully.
- Earlier Pages run `33229416059` was blocked before deployment because the pre-squash branch SHA was not an ancestor of `main`; this was an evidence-lineage failure, not an Auth-runtime defect, and PR #374 corrected the declaration before the successful run above.

## Post-deploy automated evidence

### Auth Password Security Live Smoke

Run `33229548182` completed **success**.

Verified against public deployed `member.html` and `reset-password.html`:

- weak-password error recognition markers are present;
- signup/login password autocomplete switching is present;
- login failure wording remains generic rather than revealing whether an account exists;
- affected users are directed to the existing password-reset path;
- replacement-password weak-password guidance is present;
- member password reset remains separate from the private admin reset path.

This workflow submits no credentials and changes no Auth configuration.

### Main Kinaraidee Live Smoke

Run `33229548190` completed **success** after the same Pages deployment.

Verified:

- public pages/assets are reachable;
- live runtime contract remains internally consistent;
- development-only files checked by the workflow are not published.

## What this evidence proves

- The browser-side Auth password-security UX from PR #373 is present on the public Pages deployment represented by descendant SHA `0cc3ec3ef4dda18f0d8e083d8ca0992ef77f844c`.
- The deployed static UX preserves generic login failure messaging and includes weak-password recovery guidance.
- The runtime remains on PWA cache generation `kinaraidee-beta-v16`.

## What this evidence does NOT prove

- Supabase leaked-password protection is enabled.
- A real leaked/weak password is rejected by production Auth.
- A real signup, sign-in, reset-email delivery, reset-link session or password update completed successfully.
- Existing-user behavior after enabling leaked-password protection is accepted on a physical device/browser.
- Public Beta is complete.
- Production Security, Payment/Premium, Campaign LIVE, Privacy/Legal or Commercial GO is approved.

## Remaining gate

Issue #372 remains the authority for the actual Auth configuration follow-up:

1. confirm plan/configuration support;
2. enable leaked-password protection through the approved Supabase Auth configuration path;
3. perform controlled signup/sign-in/reset tests;
4. re-run the Supabase Security Advisor;
5. record real evidence before marking that security warning PASS.

Until those steps occur, leaked-password protection remains **NOT PASS** regardless of this deployment evidence.
