# Kinaraidee — Current Release State

เอกสารนี้เป็นจุดอ้างอิงหลักสำหรับสถานะ release ปัจจุบัน เพื่อป้องกัน release/evidence drift ระหว่าง runtime, QA, deployment และ Commercial Readiness

หลักการ: deployment, real-device result, accessibility, ผู้ใช้, conversion, partner, payment หรือรายได้ จะถูกระบุว่า PASS/พร้อมใช้งานได้เมื่อมีหลักฐานจริงเท่านั้น

## Current source/runtime state

- Latest reviewed `main`: `1bec99be1dbdf253bed67610b354973897af253f` (PR #84 live Group API v4 rejection-probe descendant).
- Current browser/PWA runtime candidate: `35fe4b7fbf201882ea2ebad8ffca2b8da668999b` (PR #79; deployed and trace-verified on GitHub Pages).
- Browser/PWA runtime assets have not changed after `35fe4b7fbf201882ea2ebad8ffca2b8da668999b`; later commits through the reviewed baseline are workflow/evidence/backend changes.
- Current Group API source candidate: `a4237ce6746478caa8f0b9da60d4456b6dce4758` (PR #83); Supabase inspection verifies ACTIVE version 4 source/deployment parity for that source.
- PR #84 / `1bec99be1dbdf253bed67610b354973897af253f` changes only the non-mutating live rejection probe for deployed Group API v4; it does not supersede the backend source candidate from PR #83.
- PWA cache marker: `kinaraidee-beta-v13`.
- PR #67 persistent Surprise accessibility implementation remains present in the deployed browser/PWA candidate.
- PR #79 wires `data/pwa-install.js` from the already-active `data/home-surprise.js` bootstrap. This closes the source-wiring gap discovered by Live Smoke; it does not create real iPhone/iPad NF-05 PASS.
- PR #71 adds synthetic old-cache activation coverage; this is not NF-07 real-device PASS.
- PR #75 adds synthetic iOS install-hint behavior coverage; PR #79 additionally guards that the active app bootstrap actually loads that helper.

## Verified CI/static evidence

- Browser/PWA release lineage for PR #79 remains protected by Release Metadata, Release Consistency, Runtime Lineage, Beta QA/integrity, Security Hygiene, Credential Scanner, Surprise Accessibility, PWA Cache Upgrade, iOS Install Hint, Group Result and History Sync regression suites.
- PR #83 added Group API identifier-shape hardening: UUID-shaped room IDs before UUID-column queries, 64-hex host-token shape checks for host-only actions, and rejection of voter IDs longer than 120 characters instead of silent truncation. Its relevant PR checks completed successfully before merge.
- PR #84 added a non-mutating live rejection probe and its PR checks completed successfully before merge.
- `SECURITY.md` treats production merge governance, leaked-password protection, anonymous API retention/abuse-control/monitoring, and rollback drill evidence as Production Security gates. This is policy/gate hardening only; it does not make unchecked gates PASS.
- Static source markers, workflow configuration, synthetic probes, policy text, and CI success do not replace real-device or production-security evidence.

## Deployment evidence

Status: **PASS FOR CURRENT BROWSER/PWA DEPLOYMENT TRACE**

The current browser/PWA runtime candidate has a matching successful Pages deployment, public release metadata and corresponding successful Live Smoke run.

Confirmed evidence for PR #79 / `35fe4b7fbf201882ea2ebad8ffca2b8da668999b`:

- Pages Source Diagnostic reports `build_type: workflow` for the repository.
- Pages workflow run `32621529715` completed **success** for that exact SHA.
- Public Pages Trace Check run `32621547307` completed **success** and verified public `release-meta.json` SHA = `35fe4b7fbf201882ea2ebad8ffca2b8da668999b`, `pwa_cache` = `kinaraidee-beta-v13`, `pages-actions-source-v1` on the deployment probe, and the matching live Service Worker marker.
- Corresponding Live Smoke run `32621549478` completed **success**. Public pages/assets, latest live app markers and accessibility/group/PWA contracts, development-file exclusion, and traceable automated evidence all passed.
- Issue #69 is closed as completed for the browser/PWA deployment-trace scope.

This deployment PASS is scoped to browser/PWA deployment trace and automated live smoke only. It does not imply real-device, assistive-technology, payment, partner, legal, full Public Beta or Commercial PASS.

## Real-device regression status

### Surprise accessibility — Issue #57 / NF-09

Status: **IMPLEMENTED + DEPLOYED SOURCE CONTRACT VERIFIED / REAL ASSISTIVE-TECH RETEST BLOCKED BY TEST ENVIRONMENT**

- PR #67 fixed persistent live-region placement for the Surprise busy announcement and that implementation remains in the deployed PR #79 runtime.
- The available Android TalkBack environment later became unsuitable for app PASS/FAIL because TalkBack double-tap activation also failed on Android Settings controls.
- Therefore the latest NF-09 retest remains **BLOCKED / INCONCLUSIVE**, not PASS and not a new application FAIL.
- Issue #57 remains open until a functioning TalkBack/VoiceOver environment is available.

### Android device #1 evidence boundary

Issue #5 contains scoped same-device evidence for multiple core flows, including Group 2/2 result flow and selected PWA/recovery scenarios. Exact device model/OS/Chrome were not captured and must not be guessed. One device/session does not satisfy the full device matrix.

NF-07 has synthetic CI coverage only; real-device old-cache → `kinaraidee-beta-v13` upgrade remains unverified. NF-05 has synthetic iOS install-hint behavior coverage and active-bootstrap wiring in the deployed runtime, but real iPhone/iPad Safari evidence remains required.

## Group API / operations evidence

- Current Group API source candidate is PR #83 / `a4237ce6746478caa8f0b9da60d4456b6dce4758`.
- Supabase `group-api` is ACTIVE version 4 with `verify_jwt=false`; deployed source inspection matches repository blob `90de51709db9634fa4c396c9cd27bbe6de8619de` for the PR #83 source and reports bundle SHA-256 `cec4b0678645b49266ed0cd0b826c05ff58e5a751466c0c2ff0899ebf161023c`.
- Group API v4 preserves privacy-safe structured operational event code and adds malformed identifier/token input rejection before relevant database lookups.
- PR #84 live probe run `32629629579` completed **success** on exact main SHA `1bec99be1dbdf253bed67610b354973897af253f`. It exercised rejection-only cases and did not create/update/close rooms or submit a successful vote.
- Supabase platform Edge Function logs show matching version 4 rejection invocations during the probe window, including GET 405 and POST 400/403 responses. This verifies deployed v4 endpoint invocation/platform logging for the controlled probe.
- The available Supabase log surface still does not expose the application `console.log` structured JSON payload. Therefore exact application-event ingestion for `component=group-api` remains **NOT VERIFIED** and must not be promoted to monitoring-baseline PASS.
- Fresh read-only retention baseline on 2026-08-23 observed 16 rooms total (13 expired / 3 active), 14 joined votes (8 attached to expired rooms / 6 to active rooms), and 0 orphan votes. These counts are observations only, not an approved retention policy or cleanup PASS.
- Retention policy remains **NOT APPROVED**. Cleanup implementation/cascade execution verification and a complete anonymous rate-limit/quota strategy remain open under Issue #45.

## Supabase security/performance evidence

- Connected Supabase organization is on the Free plan.
- Fresh Security Advisor re-check still reports leaked-password protection disabled; Issue #11 remains open.
- Other current security findings are INFO-only RLS/no-policy findings on deny-by-default tables and are not a reason to make those tables permissive.
- Fresh Performance Advisor findings are INFO-only unused-index notices; no Performance Advisor WARN was observed in the latest read-only check.

## Repository governance

Issue #35 remains a Commercial Governance blocker: fresh branch evidence still reports `main` protection disabled and required-status-check enforcement off. Workflow success does not equal governance enforcement. `SECURITY.md` requires production merge governance with required release/security checks and evidence that a failing required check actually blocks merge before Commercial GO.

## Public Beta gate impact

Public Beta is still **NOT COMPLETE**.

The browser/PWA deployment-trace blocker from Issue #69 is satisfied for PR #79. Minimum open evidence still includes:

- NF-09 assistive-tech acceptance on a functioning TalkBack/VoiceOver environment;
- NF-07 real-device old-cache → current-cache upgrade evidence;
- NF-05 real iPhone/iPad Safari install-hint evidence despite synthetic CI and deployed source-wiring coverage;
- Android Chrome on at least 3 device models total;
- iPhone Safari on at least 2 device models total;
- remaining TC-01–TC-15 / NF-01–NF-10 evidence and Blocker/Critical closure appropriate to Beta acceptance.

Issue #5 remains the primary technical/device QA tracker. Issue #1 remains Beta launch acceptance.

## Commercial Readiness impact

Commercial launch remains **NO-GO** while important gates remain incomplete, including:

- Public Beta technical/device/accessibility acceptance;
- Supabase leaked-password protection gate (#11);
- `main` branch protection / required checks (#35);
- Group API application-event observability, retention/deletion policy, complete anonymous abuse controls and monitoring baseline (#45);
- Production Privacy/Terms/controller/contact/retention/legal decisions;
- Production owner/on-call, monitoring, backup/recovery and real rollback/restore drill evidence;
- Payment/Premium provider and real subscription lifecycle evidence;
- real restaurant/affiliate partner commercial evidence for any model enabled.

No user-count, conversion, revenue, payment success, partner readiness, legal approval, full device-matrix PASS, full Public Beta PASS, or Commercial GO is inferred from this document.

## Supersession rule

- Current browser/PWA runtime candidate = merged PR #79 / `35fe4b7fbf201882ea2ebad8ffca2b8da668999b` until another browser/PWA runtime change occurs.
- Current Group API source candidate = merged PR #83 / `a4237ce6746478caa8f0b9da60d4456b6dce4758` until another Group API source change occurs.
- Latest reviewed `main` baseline = PR #84 / `1bec99be1dbdf253bed67610b354973897af253f`; later evidence-document changes do not supersede browser/PWA or Group API runtime candidates unless runtime source changes.
- PR #79 Pages deployment/public metadata/Live Smoke trace is verified for the current browser/PWA runtime candidate.
- Supabase version 4 source/deployment parity and the scoped non-mutating v4 rejection probe are verified for the Group API candidate; application structured-event ingestion remains unverified in the available log surface.
- Retention policy remains **NOT APPROVED**.
- Public accessibility source probes and synthetic CI do not close NF-09, NF-07 or NF-05 real-device requirements.
