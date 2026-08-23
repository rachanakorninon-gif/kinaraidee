# Kinaraidee — Current Release State

เอกสารนี้เป็นจุดอ้างอิงหลักสำหรับสถานะ release ปัจจุบัน เพื่อป้องกัน release/evidence drift ระหว่าง runtime, QA, deployment และเอกสาร

หลักการ: deployment, real-device result, ผู้ใช้, conversion, partner, payment หรือรายได้ จะถูกระบุว่า PASS/พร้อมใช้งานได้เมื่อมีหลักฐานจริงเท่านั้น

## Current source/runtime state

- Latest reviewed `main`: `96b405460f29d0f410f255cc48c68c58e4621784` (squash merge PR #67; persistent Surprise live-region runtime follow-up plus accessibility regression/deployment-probe/release-state updates).
- Current browser/PWA runtime candidate: `96b405460f29d0f410f255cc48c68c58e4621784` (merge PR #67).
- Current Group API source candidate: `f683f8291e57501e0fde75b0e689324d0a65dfb4` (merge PR #63); Supabase deployment/source parity was re-verified after deploying this source as `group-api` version 3.
- PWA cache marker: `kinaraidee-beta-v13`.
- PR #67 changes `data/home-surprise.js` so the screen-reader live region is appended to `document.body`, outside screen containers that become `display:none`, and keeps the busy announcement available long enough for assistive technology to receive it.
- PR #67 also strengthens the Surprise accessibility regression guard and advances `deployment-check.html` to `surprise-a11y-v2`; these source/probe checks do not replace real TalkBack/VoiceOver verification.
- PR #58 / `75d467cb...` remains the historical first accessibility fix. Real-device TalkBack retest after verified public deployment still did not announce the busy state, so Issue #57 remains open and PR #67 is the current runtime candidate.
- `GROUP-API-RETENTION-DECISION.md` records the retention gate explicitly as **NOT APPROVED** with approval fields **UNSET**; `.github/workflows/group-retention-regression.yml` guards against silently inferring a retention window and keeps cleanup verification as a separate gate.
- PR #59 `d20529a9...` added the first Surprise accessibility deployment probe; PR #60 `984e5d8c...` added Pages/Live Smoke source-contract checks; PR #61 `557010fb...` hardened Public Beta synthetic runtime-lineage monitoring.
- PR #62 `77bbffd5...` added runtime-lineage regression self-tests.
- PR #63 `f683f829...` added privacy-safe Group API observability and was deployed as Supabase `group-api` version 3 with source parity re-verified.
- Retention schema inspection confirms `group_rooms.expires_at DEFAULT now()+24h` and `group_votes.room_id -> group_rooms(id) ON DELETE CASCADE`; this is schema evidence only, not an approved retention policy or cleanup PASS.
- PR #42 `6fadf04f...` remains the historical live-group result bridge baseline.
- PR #37 fixed member cloud-history timestamp mapping/fallback; PR #41 added stale-snapshot/write-race protection.
- PR #53 added public diagnostic `deployment-check.html`; PR #54 synchronized actual Android real-device evidence.

## Verified CI/static evidence

CI/static evidence is scoped to the commit/head that produced it and never replaces Pages deployment, Live Smoke, public URL verification, or real-device interaction/assistive-technology testing.

PR #58 static checks passed and added a Surprise Accessibility Regression guard, but real-device TalkBack later proved that the first implementation still did not announce the busy state after deployment.

PR #67 final PR head passed all 10 triggered checks before merge: Credential Scanner Regression, Security Hygiene, Beta integrity, History Sync Regression, Group Result Regression, Runtime Lineage Regression, Release Consistency, Surprise Accessibility Regression, Beta QA, and Release Metadata Regression.

PR #67 was squash-merged to `main` as `96b405460f29d0f410f255cc48c68c58e4621784`. Because squash merge rewrites branch history, the canonical runtime candidate is the merge commit itself rather than the pre-merge branch runtime commit.

Static source markers, regression guards, deployment probes, and CI success do not constitute NF-09 PASS. A real TalkBack/VoiceOver retest is still required after PR #67 is confirmed deployed.

Retention decision regression guards are static governance checks only; they do not constitute Privacy/Legal approval or deletion/cleanup evidence.

## Deployment evidence

Status: **PARTIAL / PR #67 BROWSER DEPLOYMENT TRACE STILL REQUIRED**

Deployment observability includes:

- Pages creates `release-meta.json` containing deployed SHA and PWA cache marker.
- Live Smoke checks deployed SHA/cache marker and required runtime markers.
- `deployment-check.html` checks the live-group bridge and Surprise accessibility source markers; PR #67 advances the Surprise probe to `surprise-a11y-v2`.
- Pages predeploy and Live Smoke require the declared Surprise accessibility contract, but workflow/source configuration is not deployment evidence by itself.
- Public Beta monitor requires the deployed SHA to be within the current runtime lineage.
- Release Consistency and Pages predeploy block stale declared browser/PWA runtime candidates.
- Group API source candidate from PR #63 is deployed as Supabase `group-api` version 3 with source parity re-verified; live operational-event ingestion/alerting remains a separate gate.

Do not infer complete deployment-gate success from source, PR/CI success, workflow guards, or the presence of deployment observability files alone.

For PR #67, browser deployment remains pending until there is an inspectable successful Pages run, corresponding Live Smoke trace, public `surprise-a11y-v2` probe evidence, and then a new real-device TalkBack retest.

## Real-device regression status

### Surprise accessibility — Issue #57 / NF-09

Status: **PR #58 DEPLOYED SOURCE CONFIRMED / REAL TALKBACK RETEST FAILED / PR #67 MERGED, DEPLOYMENT + RETEST REQUIRED**

Actual Android/TalkBack evidence:

- accessible name/role was announced correctly: `ไม่รู้เลย ให้ระบบเลือกอาหารให้ทันที ปุ่ม`;
- first busy-state test produced no announcement;
- PR #58 was implemented and public `deployment-check.html` later showed the Surprise accessibility source marker as PASS with `kinaraidee-beta-v13`;
- real-device TalkBack retest after that verified deployment still produced **no busy-state announcement**;
- therefore NF-09 remains FAIL/open on this device/session and Issue #57 must stay open;
- PR #67 addresses the likely accessibility-tree lifetime problem by keeping the live region outside hidden screen containers.

No PASS may be recorded for PR #67 until its runtime is deployed, public probe evidence confirms `surprise-a11y-v2`, and TalkBack/VoiceOver actually announces a clear busy state on a real device.

### Group live result — completed 2/2 vote path

Status: **POST-FIX SAME-DEVICE RETEST RECORDED PASS / FULL MATRIX STILL OPEN**

Android device/session #1 has actual evidence for completed 2/2 group result, repeated reroll, handoff to normal result, saving to History, stats update, logout/login persistence, and history persistence. This does not equal full matrix PASS.

### Member-history regressions

- Issue #38 `Invalid Date`: **FIXED / SAME-DEVICE RETEST RECORDED**.
- Issue #40 favorite loss after lock/resume: **FIXED / SAME-DEVICE RETEST RECORDED**.

### Android device #1 evidence boundary

Issue #5 records scoped same-device evidence for core flows including Surprise, guided selection, Group, History/Favorite, Feedback, Partner, location/Maps fallback, PWA install/reopen, offline cold start/recommendation, offline→online recovery, 404 recovery, rapid-tap observation, and background/lock recovery.

Exact device model, Android version, and Chrome version were not captured and must not be guessed. This remains one Android device/session only. NF-07 old-cache upgrade remains open, and NF-09 remains open after the second real-device TalkBack failure.

## Public Beta gate impact

Public Beta is still **NOT COMPLETE**.

Minimum evidence still required includes:

- successful GitHub Pages deployment trace for PR #67 or a proven runtime-equivalent descendant;
- corresponding successful Live Smoke trace and deployed SHA/release metadata;
- public `/deployment-check.html` / live asset verification showing `surprise-a11y-v2`;
- successful TalkBack/VoiceOver retest for the Surprise busy announcement;
- Android Chrome on at least 3 device models total;
- iPhone Safari on at least 2 device models total;
- remaining TC-01–TC-15 / NF-01–NF-10 evidence, especially NF-07 and NF-09;
- Blocker/Critical related to Beta = 0 before Beta acceptance.

Issue #5 remains the primary Beta QA execution tracker and source of actual device evidence.

## Commercial Readiness impact

Commercial launch remains **NO-GO** while important evidence/decisions remain incomplete, including:

- Public Beta technical/device/accessibility acceptance and Pages/Live Smoke trace;
- Supabase Auth leaked-password protection follow-up;
- `main` branch protection / required-check governance;
- Group API live observability ingestion, retention/deletion policy, anonymous abuse-control strategy, monitoring baseline, and Privacy/Operations decisions;
- Production Privacy/Terms/controller/contact/retention/legal decisions;
- Production monitoring/support/backup/recovery/rollback drill evidence;
- Payment/Premium and partner commercial evidence for any model actually enabled.

Repository `main` protection remains a blocker until enforcement is real; workflow files without required-check enforcement are not repository-governance PASS.

No user-count, conversion, revenue, payment success, partner readiness, legal approval, complete deployment PASS, full device-matrix PASS, or Commercial GO is inferred from this document.

## Supersession rule

- Current browser/PWA runtime candidate = PR #67 / `96b405460f29d0f410f255cc48c68c58e4621784` until another browser/PWA runtime app change occurs.
- Current Group API source candidate = PR #63 / `f683f829...`; Supabase `group-api` version 3 parity is re-verified for that source.
- Latest reviewed `main` baseline = PR #67 / `96b405460f29d0f410f255cc48c68c58e4621784`; subsequent docs-only descendants do not supersede browser/PWA runtime behavior.
- Retention policy remains **NOT APPROVED**; schema defaults must not be treated as approved deletion/retention policy.
- Historical group-result runtime baseline = PR #42 / `6fadf04f...`.
- Deployment-observability baseline began with PR #53 and was extended by PR #59/#60/#61 and PR #67's v2 probe.
- Latest QA evidence-sync baseline = PR #54 / `a7e93997...` plus subsequent Issue #5 comments for real-device evidence.
- Group API backend deployment/source evidence is tracked separately from browser/PWA deployment.
- When a new commit appears, use repository diff/PR files to classify it as browser runtime, diagnostic/deployment asset, QA evidence, workflow/docs, or backend change before moving the declared candidate/evidence state.
