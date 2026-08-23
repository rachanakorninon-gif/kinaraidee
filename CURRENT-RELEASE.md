# Kinaraidee — Current Release State

เอกสารนี้เป็นจุดอ้างอิงหลักสำหรับสถานะ release ปัจจุบัน เพื่อป้องกัน release/evidence drift ระหว่าง runtime, QA, deployment และ Commercial Readiness

หลักการ: deployment, real-device result, accessibility, ผู้ใช้, conversion, partner, payment หรือรายได้ จะถูกระบุว่า PASS/พร้อมใช้งานได้เมื่อมีหลักฐานจริงเท่านั้น

## Current source/runtime state

- Latest reviewed `main`: `11bef92e9cda7e7fa3170e3c7666a99534c8ac8a` (PR #102; documentation-only descendant after current browser/PWA and Group API runtime candidates).
- Current browser/PWA runtime candidate: `35fe4b7fbf201882ea2ebad8ffca2b8da668999b` (PR #79; deployed and trace-verified on GitHub Pages).
- Browser/PWA runtime assets have not changed after `35fe4b7fbf201882ea2ebad8ffca2b8da668999b`; later reviewed commits are workflow/evidence/backend/documentation changes.
- Current Group API source candidate: PR #93 / `fefc29322ac13f7066038a663bfeb7091d218b8f`; Supabase inspection verifies ACTIVE version 6 source/deployment parity against repository blob `04e7f595ef73b9fdbdf377ba3b8936a818a109be`.
- PR #95 / `8eff6c10e9adb4bd78a2bd0526e4e03e7d4d06f3` changes only the non-mutating live-probe workflow wording for deployed Group API v6; it does not supersede the backend source candidate from PR #93.
- PR #97 synchronized Group API v6 release/monitoring evidence, PR #99 captured a successful scheduled browser/PWA synthetic monitor run, PR #100 synchronized beta device/run/checklist evidence boundaries, and PR #102 clarified Beta readiness acceptance gates. These are evidence/documentation changes only.
- PWA cache marker: `kinaraidee-beta-v13`.
- PR #67 persistent Surprise accessibility implementation remains present in the deployed browser/PWA candidate.
- PR #79 wires `data/pwa-install.js` from the already-active `data/home-surprise.js` bootstrap. This closes the source-wiring gap discovered by Live Smoke; it does not create real iPhone/iPad NF-05 PASS.
- PR #71 adds synthetic old-cache activation coverage; this is not NF-07 real-device PASS.
- PR #75 adds synthetic iOS install-hint behavior coverage; PR #79 additionally guards that the active app bootstrap actually loads that helper.

## Verified CI/static evidence

- Browser/PWA release lineage for PR #79 remains protected by Release Metadata, Release Consistency, Runtime Lineage, Beta QA/integrity, Security Hygiene, Credential Scanner, Surprise Accessibility, PWA Cache Upgrade, iOS Install Hint, Group Result and History Sync regression suites.
- PR #83 added Group API identifier-shape hardening: UUID-shaped room IDs before UUID-column queries, 64-hex host-token shape checks for host-only actions, and rejection of voter IDs longer than 120 characters instead of silent truncation.
- PR #87 added actual request-body byte enforcement at the same 8 KiB contract even when `Content-Length` is absent/chunked.
- PR #93 hardened the body-read path further: it uses a bounded `ReadableStream` reader, counts incoming chunk bytes, cancels the reader as soon as the 8 KiB budget is exceeded, decodes UTF-8 with a fatal decoder, and parses JSON only after a successful bounded read. Its regression gate rejects a return to direct `req.json()` or full-body `req.text()` buffering.
- PR #95 refreshed the canonical non-mutating live probe wording for the streamed v6 guard without changing successful product behavior.
- PR #91 extended the rollback runbook with traceable Group API/Supabase evidence requirements; PR #92 extended the data-governance draft with verified Group room/vote schema boundaries. These are procedure/evidence preparation, not rollback-drill or retention-policy PASS.
- PR #100 beta evidence documents now consistently use the current PR #79 deployment trace, v13 cache marker, Group API v6 evidence boundary, and NF-09 INCONCLUSIVE state without creating new device PASS.
- PR #102 clarifies that a technical Beta build being available is not equivalent to Public Beta completion, and keeps real-device/accessibility/commercial acceptance gates explicit without creating new PASS evidence.
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
- Scheduled `Kinaraidee Public Beta Monitor` run `32626732416` completed **success** on repository SHA `058c41790970be91a397f01870210849e5a792c1`; it independently observed deployed SHA `35fe4b7fbf201882ea2ebad8ffca2b8da668999b`, `kinaraidee-beta-v13`, public availability/release lineage and non-public development-only paths. This is historical browser/PWA synthetic evidence only and does not cover Group API v6 or current-main full-system monitoring.
- Issue #69 is closed as completed for the browser/PWA deployment-trace scope.

This deployment PASS is scoped to browser/PWA deployment trace and automated live smoke only. It does not imply real-device, assistive-technology, payment, partner, legal, full Public Beta or Commercial PASS.

## Real-device regression status

### Surprise accessibility — Issue #57 / NF-09

Status: **IMPLEMENTED + DEPLOYED SOURCE CONTRACT VERIFIED / REAL ASSISTIVE-TECH RETEST BLOCKED BY TEST ENVIRONMENT**

- PR #67 fixed persistent live-region placement for the Surprise busy announcement and that implementation remains in the deployed PR #79 runtime.
- Earlier valid TalkBack evidence confirmed the Surprise accessible name and button role.
- Historical pre-persistent-fix evidence recorded that the busy announcement was not heard.
- During later follow-up, the user reported TalkBack double-tap activation was not working reliably across apps, not only in Kinaraidee. A later Android Settings control was successfully focused/announced (`เปิดการตั้งค่า WiFi ปุ่ม`), but actual control activation/page transition was not confirmed from that observation alone.
- Therefore the latest full NF-09 acceptance attempt remains **BLOCKED / INCONCLUSIVE**, not PASS and not a new application FAIL.
- Issue #57 remains open until a functioning TalkBack/VoiceOver environment is verified and the busy/ready behavior can be retested end-to-end.

### Android device #1 evidence boundary

Issue #5 contains scoped same-device evidence for multiple core flows, including Group 2/2 result flow and selected PWA/recovery scenarios. Exact device model/OS/Chrome were not captured and must not be guessed. One device/session does not satisfy the full device matrix.

PR #100 synchronizes `BETA-DEVICE-MATRIX.md`, `BETA-RUN-LOG.md` and `BETA-CHECKLIST.md` so historical same-device PASS evidence stays scoped and current deployment/backend/static evidence is not promoted to a device PASS.

NF-07 has synthetic CI coverage only; real-device old-cache → `kinaraidee-beta-v13` upgrade remains unverified. NF-05 has synthetic iOS install-hint behavior coverage and active-bootstrap wiring in the deployed runtime, but real iPhone/iPad Safari evidence remains required.

The Group API v6 streaming change has source/deployment/live rejection evidence but does not by itself create a new real-device Group-flow PASS. Previous Android Group evidence remains scoped to the runtime/backend session in which it was observed.

## Group API / operations evidence

- Current Group API source candidate is PR #93 / `fefc29322ac13f7066038a663bfeb7091d218b8f`.
- Supabase `group-api` is ACTIVE version 6 with `verify_jwt=false`; deployed source inspection matches repository blob `04e7f595ef73b9fdbdf377ba3b8936a818a109be` and reports bundle SHA-256 `e389ae3a6d5da19f81b909df6616524391825bdaef2ca568b522fbb3d8da2e52`.
- Group API v6 preserves the earlier identifier/token/input hardening and enforces the 8 KiB request-body contract with a bounded stream reader that stops consuming oversized chunked/missing-length requests rather than buffering the full body first.
- Canonical `Group API Live Observability Probe` run `32632951668` completed **success** on exact main SHA `8eff6c10e9adb4bd78a2bd0526e4e03e7d4d06f3`.
- The v6 probe is rejection-only: unsupported method, malformed room/token shapes, overlong voter ID and a chunked >8 KiB POST expected to return HTTP 413 / `request_too_large`; it does not create/update/close rooms or submit a successful vote.
- PR #94 provided an independent deployed-v6 rejection diagnostic and was closed without merge. PR #96 independently traced canonical run `32632951668` and was closed without merge after evidence capture.
- Fresh Supabase platform logs show matching ACTIVE version 6 requests for canonical run `32632951668`, including GET 405, POST 400/403 and POST 413. The visible 413 invocation occurred at `2026-08-23T10:08:47.714000` on deployment version 6.
- The available Supabase log surface still does not expose the application `console.log` structured JSON payload. Therefore exact application-event ingestion for `component=group-api` remains **NOT VERIFIED** and must not be promoted to monitoring-baseline PASS.
- Fresh read-only retention baseline on 2026-08-23 observed 16 rooms total (13 expired / 3 active), 14 joined votes (8 attached to expired rooms / 6 to active rooms), and 0 orphan votes. These counts are observations only, not an approved retention policy or cleanup PASS.
- Retention policy remains **NOT APPROVED**. Cleanup implementation/cascade execution verification and a complete anonymous rate-limit/quota strategy remain open under Issue #45.

## Supabase security/performance evidence

- Connected Supabase organization is on the Free plan.
- Fresh Security Advisor re-check after the v6 deployment still reports leaked-password protection disabled; Issue #11 remains open.
- Other current security findings are INFO-only RLS/no-policy findings on deny-by-default tables and are not a reason to make those tables permissive.
- Fresh Performance Advisor findings are INFO-only unused-index notices; no Performance Advisor WARN was observed in the latest read-only check.

## Repository governance

Issue #35 remains a Commercial Governance blocker: latest reviewed documentation baseline is main `11bef92e9cda7e7fa3170e3c7666a99534c8ac8a`; the most recently verified branch-governance evidence remains `protected=false`, protection disabled and required-status-check enforcement off. Workflow success does not equal governance enforcement. `SECURITY.md` requires production merge governance with required release/security checks and evidence that a failing required check actually blocks merge before Commercial GO.

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
- Current Group API source candidate = merged PR #93 / `fefc29322ac13f7066038a663bfeb7091d218b8f` until another Group API source change occurs.
- Latest reviewed `main` baseline = PR #102 / `11bef92e9cda7e7fa3170e3c7666a99534c8ac8a`; later evidence/documentation descendants do not supersede browser/PWA or Group API runtime candidates unless runtime source changes.
- PR #79 Pages deployment/public metadata/Live Smoke trace is verified for the current browser/PWA runtime candidate.
- Scheduled Public Beta Monitor run `32626732416` is additional scoped synthetic browser/PWA evidence for the unchanged PR #79 runtime lineage; it does not prove Group API v6/current-main/full-system Production monitoring.
- Supabase version 6 source/deployment parity and canonical non-mutating v6 rejection probe, including streamed chunked >8 KiB rejection, are verified for the Group API candidate; application structured-event ingestion remains unverified in the available log surface.
- Retention policy remains **NOT APPROVED**.
- Public accessibility source probes and synthetic CI do not close NF-09, NF-07 or NF-05 real-device requirements.
