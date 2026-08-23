# Kinaraidee — Current Release State

เอกสารนี้เป็นจุดอ้างอิงหลักสำหรับสถานะ release ปัจจุบัน เพื่อป้องกัน release/evidence drift ระหว่าง runtime, QA, deployment และ Commercial Readiness

หลักการ: deployment, real-device result, accessibility, ผู้ใช้, conversion, partner, payment หรือรายได้ จะถูกระบุว่า PASS/พร้อมใช้งานได้เมื่อมีหลักฐานจริงเท่านั้น

## Current source/runtime state

- Latest reviewed `main`: `1a4c23b3c93d2d0601056c487e057e402104316b` (merge PR #78; Pages predeploy secret-scan false-positive fix).
- Current browser/PWA runtime candidate: `fcab6fa5a2c81de434b203ff005792d26a444670` (PWA install-helper bridge runtime commit on the current fix branch; pending merge/deploy verification).
- Current Group API source candidate: `f683f8291e57501e0fde75b0e689324d0a65dfb4` (merge PR #63); Supabase inspection previously verified ACTIVE version 3 source/deployment parity for that candidate.
- PWA cache marker: `kinaraidee-beta-v13`.
- PR #67 persistent Surprise accessibility implementation remains present in the new browser/PWA candidate.
- The new runtime candidate wires `data/pwa-install.js` from the already-active `data/home-surprise.js` bootstrap. This closes a source-wiring gap discovered by Live Smoke; it does not create real iPhone/iPad NF-05 PASS.
- PR #71 adds synthetic old-cache activation coverage; this is not NF-07 real-device PASS.
- PR #75 adds synthetic iOS install-hint behavior coverage; the current branch additionally guards that the active app bootstrap actually loads that helper.

## Verified CI/static evidence

- PR #78 final head passed the main regression/security suites before merge, including Release Metadata Regression, Release Consistency, Runtime Lineage Regression, Beta QA, Beta integrity, Security Hygiene, Credential Scanner, Surprise Accessibility, PWA Cache Upgrade, iOS Install Hint, Group Result, Pages Source Diagnostic and History Sync.
- Pages predeploy failure on PR #76 was traced to a false-positive secret scan against safe server-side `Deno.env.get(...)` references. PR #78 aligned Pages scanning with the existing Beta QA safe-env contract while preserving blocking of credential-shaped payloads.
- Static source markers, workflow configuration, synthetic probes, and CI success do not replace real-device or live-deployment evidence.

## Deployment evidence

Status: **PARTIAL / DEPLOYMENT WORKFLOW TRACE STILL REQUIRED**

GitHub Actions Pages source and the artifact deployment path are now proven to work, and public release metadata is now present. One Live Smoke contract failure remains under active repair.

Confirmed evidence after PR #78:

- Pages Source Diagnostic reports `build_type: workflow` for the repository.
- PR #78 merged as `1a4c23b3c93d2d0601056c487e057e402104316b`.
- Pages workflow run `32621203074` completed **success** for that exact SHA.
- Public trace workflow run `32621219335` completed **success** and verified public `release-meta.json` SHA = `1a4c23b3c93d2d0601056c487e057e402104316b`, `pwa_cache` = `kinaraidee-beta-v13`, `pages-actions-source-v1` on the deployment probe, and the matching live Service Worker marker.
- Live Smoke run `32621221131` was triggered from the same successful Pages deployment but completed **failure**.
- A focused assertion diagnostic run `32621294450` found exactly one failing live assertion: the root HTML did not directly contain `pwa-install.js`; all other checked public release metadata, cache, group-result, Surprise accessibility source, partner/privacy, robots/sitemap and runtime markers passed.
- Source inspection confirms `index.html` directly loads `data/home-surprise.js` but not `data/pwa-install.js`. Therefore the iOS/Android install helper existed and had synthetic tests but was not actually wired into the active app bootstrap.
- The current runtime candidate `fcab6fa5a2c81de434b203ff005792d26a444670` fixes that gap by loading `data/pwa-install.js` from the active home bootstrap. A fresh Pages deployment and matching Live Smoke success are still required after merge.

Do not infer complete deployment-gate success until the current runtime candidate is merged, the new Pages deployment succeeds, public metadata points to that deployment, and the corresponding Live Smoke run passes.

## Real-device regression status

### Surprise accessibility — Issue #57 / NF-09

Status: **IMPLEMENTED + PUBLIC V2 SOURCE PROBE CONFIRMED / REAL ASSISTIVE-TECH RETEST BLOCKED BY TEST ENVIRONMENT**

- PR #67 fixed persistent live-region placement for the Surprise busy announcement.
- The only available Android TalkBack environment later became unsuitable for app PASS/FAIL because TalkBack double-tap activation also failed on Android Settings controls.
- Therefore the latest PR #67 NF-09 retest remains **BLOCKED / INCONCLUSIVE**, not PASS and not a new application FAIL.
- Issue #57 remains open until a functioning TalkBack/VoiceOver environment is available.

### Android device #1 evidence boundary

Issue #5 contains scoped same-device evidence for multiple core flows, including Group 2/2 result flow and selected PWA/recovery scenarios. Exact device model/OS/Chrome were not captured and must not be guessed. One device/session does not satisfy the full device matrix.

NF-07 has synthetic CI coverage only; real-device old-cache → `kinaraidee-beta-v13` upgrade remains unverified. NF-05 has synthetic iOS install-hint behavior coverage and now has active-bootstrap wiring under the current runtime candidate, but real iPhone/iPad Safari evidence remains required.

## Group API / operations evidence

- Current Group API source candidate remains PR #63 / `f683f8291e57501e0fde75b0e689324d0a65dfb4`.
- Privacy-safe structured operational events are implemented in source/deployed v3 evidence, but live application-event ingestion/monitoring baseline remains **NOT VERIFIED**.
- Retention policy remains **NOT APPROVED**. Existing schema expiry/defaults and read-only diagnostics must not be interpreted as an approved deletion schedule.
- Cleanup implementation/cascade verification and anonymous abuse controls remain open under Issue #45.

## Supabase security/performance evidence

- Connected Supabase organization is on the Free plan.
- Security Advisor still reports leaked-password protection disabled; Issue #11 remains open.
- INFO-only RLS/no-policy findings for deny-by-default tables are not a reason to make those tables permissive.

## Repository governance

Issue #35 remains a Commercial Governance blocker: `main` branch protection / required-check enforcement has not been verified as enabled. Latest GitHub branch evidence still showed protection disabled. Workflow success does not equal governance enforcement.

## Public Beta gate impact

Public Beta is still **NOT COMPLETE**.

Minimum open evidence includes:

- Issue #69: merge/deploy the current PWA-helper wiring candidate and obtain a corresponding successful Live Smoke trace with matching public release metadata;
- NF-09 assistive-tech acceptance on a functioning TalkBack/VoiceOver environment;
- NF-07 real-device old-cache → current-cache upgrade evidence;
- NF-05 real iPhone/iPad Safari install-hint evidence despite synthetic CI and source-wiring coverage;
- Android Chrome on at least 3 device models total;
- iPhone Safari on at least 2 device models total;
- remaining TC-01–TC-15 / NF-01–NF-10 evidence and Blocker/Critical closure appropriate to Beta acceptance.

Issue #5 remains the primary technical/device QA tracker. Issue #1 remains Beta launch acceptance.

## Commercial Readiness impact

Commercial launch remains **NO-GO** while important gates remain incomplete, including:

- Public Beta technical/device/accessibility acceptance and final deployment trace;
- Supabase leaked-password protection gate (#11);
- `main` branch protection / required checks (#35);
- Group API live observability, retention/deletion policy, abuse controls and monitoring baseline (#45);
- Production Privacy/Terms/controller/contact/retention/legal decisions;
- Production owner/on-call, monitoring, backup/recovery and real rollback/restore drill evidence;
- Payment/Premium provider and real subscription lifecycle evidence;
- real restaurant/affiliate partner commercial evidence for any model enabled.

No user-count, conversion, revenue, payment success, partner readiness, legal approval, complete deployment PASS, full device-matrix PASS, or Commercial GO is inferred from this document.

## Supersession rule

- Current browser/PWA runtime candidate = `fcab6fa5a2c81de434b203ff005792d26a444670` on the current PWA-helper wiring fix until merged/superseded; it contains PR #67 accessibility behavior plus active loading of `data/pwa-install.js`.
- Current Group API source candidate = PR #63 / `f683f8291e57501e0fde75b0e689324d0a65dfb4` until another Group API source change occurs.
- Latest reviewed `main` baseline = `1a4c23b3c93d2d0601056c487e057e402104316b`.
- The PR #78 Pages deployment/public metadata path is verified, but full deployment acceptance remains incomplete because its matching Live Smoke identified the PWA-helper wiring gap; the current candidate must pass a fresh matching deployment + Live Smoke trace.
- Retention policy remains **NOT APPROVED**.
- Public accessibility source probes and synthetic CI do not close NF-09, NF-07 or NF-05 real-device requirements.
