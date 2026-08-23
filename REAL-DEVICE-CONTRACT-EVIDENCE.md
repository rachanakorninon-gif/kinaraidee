# Kinaraidee — Real-device acceptance contract evidence

This file records the repository-level guard that protects real-device evidence boundaries. It is documentation/CI evidence only and must not be used as a substitute for device testing.

## Current guard baseline

- Main commit `5ba2b7b9da4dacd1095684da6f8a64ce157ca77a` added `.github/workflows/real-device-contract-regression.yml`.
- PR #107 merged at `87fb95d40d228f2101764d076a17ee32f6e688cc` and refined the guard without changing browser/PWA runtime or Group API runtime source.
- The workflow protects TC-08 Location-allow evidence requirements, NF-04/NF-07 verifiable pre-current-cache upgrade baselines, NF-09 assistive-technology environment validation, and explicit anti-fabrication wording.
- The guard derives the current PWA cache marker from `sw.js` rather than hard-coding a stale generation.
- It requires the documentation to allow `INCONCLUSIVE / TEST ENVIRONMENT` for an assistive-technology environment whose activation cannot be validated.

## Verified CI evidence

- PR #107 head `db0f455c20989a84a87e9dbc571d80fa1d6788a6` has an inspected `Real Device Contract Regression` workflow run `32640086233` with conclusion `success`.
- The same inspected PR head also has successful Beta QA, Beta integrity, Release Consistency, Runtime Lineage, PWA Cache Upgrade, iOS Install Hint, Surprise Accessibility, Group Result, History Sync, Security Hygiene, Credential Scanner and Release Metadata regression runs.
- Repository comparison from PR #106 merge `ed0ddc6fae67238236ba7ae3e8516acd54af40e1` through PR #107 merge shows changes only in `.github/workflows/real-device-contract-regression.yml`, `CURRENT-RELEASE.md` and this evidence file; no browser/PWA runtime or Group API runtime source changed.

## Evidence boundary

Passing this workflow means the repository still contains the acceptance contracts and anti-fabrication boundaries. It does **not** mean any TC/NF case passed on a real device.

In particular, it does not create or replace:

- TC-08 traceable Location allow evidence;
- NF-05 real iPhone/iPad Safari install-hint evidence;
- NF-07 real-device old-cache → current-cache upgrade evidence;
- NF-09 TalkBack/VoiceOver busy/ready acceptance;
- Android/iPhone minimum device-matrix coverage;
- Public Beta completion or Commercial GO.

No device model, OS/browser version, user count, conversion, revenue, payment result or partner result may be inferred from this guard.
