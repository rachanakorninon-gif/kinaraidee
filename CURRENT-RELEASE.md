# Kinaraidee — Current Release State

เอกสารนี้เป็นจุดอ้างอิงสั้น ๆ สำหรับสถานะ release ปัจจุบัน เพื่อป้องกันการตีความเอกสาร QA/Commercial ที่ล้าสมัย

หลักการ: deployment, real-device result, ผู้ใช้, conversion, partner, revenue หรือ commercial readiness จะถูกระบุว่า PASS/พร้อมใช้งานได้เมื่อมีหลักฐานจริงเท่านั้น

## Current source/runtime state

- Latest reviewed source SHA: `a7e93997c136fb3b2dcb3510fd21e28f42cd7429` (merge of PR #54).
- Current browser runtime candidate: `6fadf04fdf647680b60df2ada9cb43f4659816dd` (merge of PR #42).
- PWA cache marker: `kinaraidee-beta-v13`.
- PR #42 restores the completed live-group result bridge (`useRemoteVotes`, `showRemoteResult`, deterministic group module loading) and adds Group Result Regression CI.
- PR #37 fixes cloud-history timestamp/action mapping; PR #41 hardens member-history write/read races.
- PR #44 adds deployed SHA / `release-meta.json` tracing and deployed group-bridge checks.
- PR #47 adds static release-metadata regression coverage.
- PR #53 adds human-readable `deployment-check.html` plus Pages/Live Smoke probe wiring. It changes deployment diagnostics/workflows, not core browser behavior.
- PR #54 synchronizes `BETA-DEVICE-MATRIX.md` and `BETA-RUN-LOG.md` with actual Android evidence already recorded in Issue #5; it is documentation/evidence only.
- Supabase `group-api` v2 source/deployment parity was separately verified and recorded in `GROUP-API-DEPLOYMENT-EVIDENCE.md`; that evidence is backend-specific and does not prove browser deployment, real-device behavior, abuse-control readiness, retention readiness, or Commercial GO.

Later workflow/docs/backend-source descendants must not be treated as browser runtime changes without a repository diff showing public app assets changed.

## Verified CI evidence

### PR #42 runtime fix
Head `d0afde6a6c6b819bfd078ebb4222738a7dad878b` completed successfully for Beta integrity `32566703357`, Beta QA `32566703324`, Security Hygiene `32566703331`, Group Result Regression `32566703337`, History Sync Regression `32566703316`, and Release Consistency `32566703318`.

### PR #53 deployment probe
Head `f3c6d6f7d905b39e99b92ae181b3175de5761ad1` completed successfully for:
- Security Hygiene `32589443121`
- Release Metadata Regression `32589443150`
- Release Consistency `32589443112`
- Group Result Regression `32589443111`
- History Sync Regression `32589443118`
- Beta integrity `32589443151`
- Credential Scanner Regression `32589443114`
- Beta QA `32589443133`

### PR #54 QA evidence synchronization
Head `839b8517e2d96aa3de25674b5f22a9503c2e47b2` completed successfully for:
- Security Hygiene `32591528640`
- Beta integrity `32591528593`
- Credential Scanner Regression `32591528503`
- Group Result Regression `32591528512`
- Release Metadata Regression `32591528637`
- Release Consistency `32591528534`
- Beta QA `32591528504`
- History Sync Regression `32591528516`

These are CI/static evidence only. They do not replace GitHub Pages deployment evidence, Live Smoke evidence, Edge Function deployment evidence, or real-device testing.

## Browser deployment evidence

Status: **PARTIAL / BROWSER DEPLOYMENT WORKFLOW TRACE STILL REQUIRED**

PR #44 and PR #53 provide the plumbing to verify deployed SHA, cache marker, and live group-result bridge markers. The Android deployment recheck that directly navigated to `/release-meta.json` fell through the custom Pages recovery path, so public deployed SHA was not independently confirmed from that attempt. PR #53 therefore added `/deployment-check.html` as a human-readable diagnostic.

Still required:
- successful GitHub Pages deployment workflow evidence for the current runtime or runtime-equivalent descendant,
- Pages workflow run URL / ID and deployed SHA,
- public `/deployment-check.html` observed on the deployed site with the PR #42 bridge markers and `kinaraidee-beta-v13`,
- corresponding Live Smoke success traced to the same deployment,
- public `data/member-sync.js` trace confirming the PR #37 + PR #41 lineage.

Do not infer complete deployment-gate success from source lineage, PR CI, workflow configuration, or the existence of the diagnostic page in the repository alone.

## Real-device regression status

### Android device #1

Actual-device evidence recorded in Issue #5 and synchronized to `BETA-DEVICE-MATRIX.md` / `BETA-RUN-LOG.md` includes scoped PASS observations for:
- home/app shell, Surprise one-tap, guided flow, reroll,
- History and Favorite persistence, including focused #38 / #40 retests,
- denied-location fallback and Google Maps fallback,
- PWA install/standalone reopen,
- offline cold start, offline recommendation, and offline→online recovery,
- Feedback submit with backend row confirmation,
- Partner validation + privacy consent submit with backend `privacy_notice_version` and `privacy_acknowledged_at` confirmation,
- 404 recovery,
- background/resume + lock/unlock result-state persistence,
- post-fix live-group **2/2 final result + repeated reroll + handoff to normal result** on the same Android session.

The narrow Android #1 live-group final-result regression is therefore no longer listed as awaiting device retest. This does **not** satisfy the multi-device matrix and does not prove the deployed Pages SHA.

Items still unverified/incomplete on Android #1 include exact isolated TC-08 allow-location evidence, NF-04 update-specific evidence, NF-07 upgrade from a pre-v13 cache, and NF-09 assistive accessibility/semantics evidence.

## Public Beta gate impact

Public Beta is still **NOT COMPLETE**.

Remaining minimum gates include:
- GitHub Pages + Live Smoke deployed-SHA trace for the runtime/runtime-equivalent descendant,
- Android Chrome coverage on at least 3 device models; current evidence represents only one Android device/session and its exact model/version was not captured,
- iPhone Safari coverage on at least 2 device models,
- remaining TC-01–TC-15 / NF-01–NF-10 platform-specific evidence,
- NF-07 upgrade from an older cache to `kinaraidee-beta-v13`,
- NF-09 accessibility/semantics evidence,
- no unresolved Blocker/Critical release defect.

Issue #5 remains the primary Beta QA execution tracker.

## Commercial Readiness impact

Commercial launch remains **NO-GO** while required evidence or decisions are outstanding, including at minimum:
- Public Beta technical/device acceptance and deployment/live trace,
- Supabase Auth leaked-password protection follow-up (Issue #11),
- `main` branch protection / required-check governance (Issue #35),
- Group API retention/deletion policy, anonymous abuse/rate controls, monitoring baseline, and related Privacy/Operations decisions (Issue #45),
- Production Privacy/Terms/controller/contact/retention/legal review decisions,
- Production operations ownership, monitoring, backup/recovery drill evidence,
- Payment/Premium and partner commercial terms only if/when those business flows are actually enabled.

No user-count, conversion, revenue, payment success, partner readiness, legal approval, complete browser deployment PASS, full device-matrix PASS, or commercial GO is implied by this document.

## Supersession rule

Older release traces that name PR #28, PR #37, or PR #41 as the current browser candidate are historical baselines. The browser runtime candidate is PR #42 (`6fadf04f...`) while later reviewed descendants through PR #54 are QA/deployment diagnostics/docs/backend-source evidence unless a repository diff shows public app runtime files changed. Use this file together with Issue #5, `BETA-DEVICE-MATRIX.md`, `BETA-RUN-LOG.md`, `GROUP-API-DEPLOYMENT-EVIDENCE.md`, and the open Commercial Readiness issues until the remaining gates are closed.
