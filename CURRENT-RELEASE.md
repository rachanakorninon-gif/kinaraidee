# Kinaraidee — Current Release State

เอกสารนี้เป็นจุดอ้างอิงหลักสำหรับสถานะ release ปัจจุบัน เพื่อป้องกัน release/evidence drift ระหว่าง runtime, QA, deployment และ Commercial Readiness

หลักการ: deployment, real-device result, accessibility, ผู้ใช้, conversion, partner, payment หรือรายได้ จะถูกระบุว่า PASS/พร้อมใช้งานได้เมื่อมีหลักฐานจริงเท่านั้น

## Current source/runtime state

- Latest reviewed `main`: `ed0ddc6fae67238236ba7ae3e8516acd54af40e1` (PR #106; documentation/test-contract-only descendant after current browser/PWA and Group API runtime candidates).
- Current browser/PWA runtime candidate: `35fe4b7fbf201882ea2ebad8ffca2b8da668999b` (PR #79; deployed and trace-verified on GitHub Pages).
- Browser/PWA runtime assets have not changed after `35fe4b7fbf201882ea2ebad8ffca2b8da668999b`; compare through PR #106 shows later changes are workflows, Group API backend source/evidence and documentation/test contracts, with no browser/PWA runtime asset change.
- Current Group API source candidate: PR #93 / `fefc29322ac13f7066038a663bfeb7091d218b8f`; Supabase inspection verifies ACTIVE version 6 source/deployment parity against repository blob `04e7f595ef73b9fdbdf377ba3b8936a818a109be`.
- PR #95 / `8eff6c10e9adb4bd78a2bd0526e4e03e7d4d06f3` changes only the non-mutating live-probe workflow wording for deployed Group API v6; it does not supersede the backend source candidate from PR #93.
- PR #103 adds a six-hour rejection-only Group API live probe schedule while retaining manual/workflow-file triggers; PR #105 records a verified post-enable run. These improve monitoring mechanism/evidence coverage without changing Group API runtime source.
- PR #106 tightens real-device acceptance contracts for TC-08 Location allow, NF-04/NF-07 PWA upgrade and NF-09 assistive technology. It changes no existing device result and creates no new PASS.
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
- PR #103 adds recurring rejection-only Group API probing every six hours and regression guards that reject an expected 2xx request in that probe.
- PR #106 head `42790273c9db385e61ac8a03969e0c5ce487c056` has inspected successful PR runs for Beta QA, Beta integrity, Security Hygiene, Credential Scanner, Release Consistency, Release Metadata, Runtime Lineage, PWA Cache Upgrade, iOS Install Hint, Surprise Accessibility, Group Result, History Sync and Pages Source Diagnostic. These are CI/static/workflow evidence only and do not replace real-device acceptance.
- `SECURITY.md` treats production merge governance, leaked-password protection, anonymous API retention/abuse-control/monitoring, and rollback drill evidence as Production Security gates. This is policy/gate hardening only; it does not make unchecked gates PASS.
- Static source markers, workflow configuration, synthetic probes, policy text, and CI success do not replace real-device or production-security evidence.

## Deployment evidence

Status: **PASS FOR CURRENT BROWSER/PWA DEPLOYMENT TRACE**

Confirmed evidence for PR #79 / `35fe4b7fbf201882ea2ebad8ffca2b8da668999b`:

- Pages Source Diagnostic reports `build_type: workflow` for the repository.
- Pages workflow run `32621529715` completed **success** for that exact SHA.
- Public Pages Trace Check run `32621547307` completed **success** and verified public `release-meta.json` SHA = `35fe4b7fbf201882ea2ebad8ffca2b8da668999b`, `pwa_cache` = `kinaraidee-beta-v13`, `pages-actions-source-v1` on the deployment probe, and the matching live Service Worker marker.
- Corresponding Live Smoke run `32621549478` completed **success**.
- Scheduled `Kinaraidee Public Beta Monitor` run `32626732416` completed **success** on repository SHA `058c41790970be91a397f01870210849e5a792c1`; it is scoped browser/PWA synthetic evidence for the unchanged runtime lineage.
- Issue #69 is closed as completed for the browser/PWA deployment-trace scope.

This deployment PASS is scoped to browser/PWA deployment trace and automated live smoke only. It does not imply real-device, assistive-technology, payment, partner, legal, full Public Beta or Commercial PASS.

## Real-device regression status

### Surprise accessibility — Issue #57 / NF-09

Status: **IMPLEMENTED + DEPLOYED SOURCE CONTRACT VERIFIED / REAL ASSISTIVE-TECH RETEST INCONCLUSIVE**

- PR #67 fixed persistent live-region placement for the Surprise busy announcement and that implementation remains in the deployed PR #79 runtime.
- Earlier valid TalkBack evidence confirmed the Surprise accessible name and button role.
- Historical pre-persistent-fix evidence recorded that the busy announcement was not heard.
- Latest full NF-09 acceptance remains **INCONCLUSIVE**, not PASS and not a new application FAIL, because reliable screen-reader activation was not yet demonstrated end-to-end in the available test environment.
- PR #106 now requires validating the assistive-tech environment first with a normal external control whose action/page change can be observed before scoring Kinaraidee; accessible-name-only evidence and source/static/synthetic checks are insufficient for full NF-09 PASS.
- Issue #57 remains open until a functioning TalkBack/VoiceOver environment is verified and busy/ready behavior is retested end-to-end.

### Android device #1 evidence boundary

Issue #5 contains scoped same-device evidence for multiple core flows. Exact device model/OS/Chrome were not captured and must not be guessed. One device/session does not satisfy the full device matrix.

- TC-08 Location allow remains unverified because historical evidence did not isolate a traceable permission-allow path. PR #106 now requires permission-state/prompt plus continuous post-allow evidence; Maps opening or coordinates alone are not enough.
- NF-07 has synthetic CI coverage only. PR #106 requires a verifiable pre-v13 cache baseline before a real-device upgrade can be scored PASS; fresh v13 install/use cannot substitute.
- NF-05 has synthetic iOS install-hint behavior coverage and active-bootstrap wiring in the deployed runtime, but real iPhone/iPad Safari evidence remains required.
- The Group API v6 streaming change has source/deployment/live rejection evidence but does not by itself create a new real-device Group-flow PASS.

## Group API / operations evidence

- Current Group API source candidate is PR #93 / `fefc29322ac13f7066038a663bfeb7091d218b8f`.
- Supabase `group-api` is ACTIVE version 6 with `verify_jwt=false`; deployed source inspection matches repository blob `04e7f595ef73b9fdbdf377ba3b8936a818a109be` and reports bundle SHA-256 `e389ae3a6d5da19f81b909df6616524391825bdaef2ca568b522fbb3d8da2e52`.
- Canonical earlier `Group API Live Observability Probe` run `32632951668` completed **success** and verified rejection-only deployed behavior including chunked >8 KiB → HTTP 413 / `request_too_large`.
- PR #103 enables the same rejection-only probe every six hours at minute 23 UTC, plus manual/workflow-file triggers, with regression guards preventing expected 2xx requests.
- Verified post-schedule activation run `32634589593` completed **success** on exact PR #103 merge SHA `1d3bc0cbd736693077838a57a5272734481ded9b`; its job records unsupported method, malformed identifier/token, overlong voter ID and chunked >8 KiB rejection paths and explicitly states no successful create/vote/update/close action was performed.
- The available Supabase log surface still does not expose the application `console.log` structured JSON payload. Exact application-event ingestion for `component=group-api` remains **NOT VERIFIED**.
- Execution times from controlled rejection probes are not a production traffic baseline, SLA/SLO or alert threshold.
- Retention policy remains **NOT APPROVED**. Cleanup implementation/cascade execution verification and a complete anonymous rate-limit/quota strategy remain open under Issue #45.

## Supabase security/performance evidence

- Connected Supabase organization is on the Free plan.
- Latest recorded Security Advisor re-check still reports leaked-password protection disabled; Issue #11 remains open.
- Other recorded security findings are INFO-only RLS/no-policy findings on deny-by-default tables and are not a reason to make those tables permissive.
- Recorded Performance Advisor findings are INFO-only unused-index notices; no Performance Advisor WARN was observed in the latest read-only check.

## Repository governance

Issue #35 remains a Commercial Governance blocker. The most recently verified branch-governance evidence reports `protected=false`, protection disabled and required-status-check enforcement off. Workflow success does not equal governance enforcement. `SECURITY.md` requires production merge governance with required release/security checks and evidence that a failing required check actually blocks merge before Commercial GO.

## Public Beta gate impact

Public Beta is still **NOT COMPLETE**.

The browser/PWA deployment-trace blocker from Issue #69 is satisfied for PR #79. Minimum open evidence still includes:

- NF-09 assistive-tech acceptance on a functioning TalkBack/VoiceOver environment using the PR #106 environment-validation contract;
- NF-07 real-device old-cache → `kinaraidee-beta-v13` upgrade evidence from a verifiable pre-v13 baseline;
- NF-05 real iPhone/iPad Safari install-hint evidence;
- TC-08 traceable real-device Location allow evidence;
- Android Chrome on at least 3 device models total;
- iPhone Safari on at least 2 device models total;
- remaining TC-01–TC-15 / NF-01–NF-10 evidence and Blocker/Critical closure appropriate to Beta acceptance.

Issue #5 remains the primary technical/device QA tracker. Issue #1 remains Beta launch acceptance.

## Commercial Readiness impact

Commercial launch remains **NO-GO** while important gates remain incomplete, including:

- Public Beta technical/device/accessibility acceptance;
- Supabase leaked-password protection gate (#11);
- `main` branch protection / required checks (#35);
- Group API application-event observability, retention/deletion policy, complete anonymous abuse controls and production monitoring baseline/owner/alert/escalation (#45);
- Production Privacy/Terms/controller/contact/retention/legal decisions;
- Production owner/on-call, monitoring, backup/recovery and real rollback/restore drill evidence;
- Payment/Premium provider and real subscription lifecycle evidence;
- real restaurant/affiliate partner commercial evidence for any model enabled.

No user-count, conversion, revenue, payment success, partner readiness, legal approval, full device-matrix PASS, full Public Beta PASS, or Commercial GO is inferred from this document.

## Supersession rule

- Current browser/PWA runtime candidate = merged PR #79 / `35fe4b7fbf201882ea2ebad8ffca2b8da668999b` until another browser/PWA runtime change occurs.
- Current Group API source candidate = merged PR #93 / `fefc29322ac13f7066038a663bfeb7091d218b8f` until another Group API source change occurs.
- Latest reviewed `main` baseline = PR #106 / `ed0ddc6fae67238236ba7ae3e8516acd54af40e1`; later evidence/documentation/workflow descendants do not supersede browser/PWA or Group API runtime candidates unless runtime source changes.
- PR #79 Pages deployment/public metadata/Live Smoke trace is verified for the current browser/PWA runtime candidate.
- Recurring Group API probe mechanism and verified post-enable run strengthen operational evidence only; they do not close application-event ingestion, alerting/baseline, retention, complete abuse-control or Commercial gates.
- Retention policy remains **NOT APPROVED**.
- Public accessibility/source/synthetic evidence does not close NF-09, NF-07, NF-05 or TC-08 real-device requirements.
