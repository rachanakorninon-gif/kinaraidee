# Kinaraidee — Current Release State

เอกสารนี้เป็นจุดอ้างอิงหลักสำหรับสถานะ release ปัจจุบัน เพื่อป้องกัน release/evidence drift ระหว่าง runtime, QA, deployment, Supabase security และ Commercial Readiness

หลักการ: deployment, real-device result, accessibility, security configuration, ผู้ใช้, conversion, partner, payment หรือรายได้ จะถูกระบุว่า PASS/พร้อมใช้งานได้เมื่อมีหลักฐานจริงเท่านั้น

## Current source/runtime state

- Latest reviewed `main` descendant: `1d21613c3c7d3e62ed8f7e5c3f00700606129c58` (PR #179 merged v16 member-history durability runtime).
- Current browser/PWA runtime candidate: `a7ca994be76541af57b224c57f267843113df941` (PR #179 v16 runtime lineage).
- Runtime merge/deployed SHA: `1d21613c3c7d3e62ed8f7e5c3f00700606129c58` (PR #179 merged).
- PWA cache marker: `kinaraidee-beta-v16`.
- Current Group API source candidate: PR #93 / `fefc29322ac13f7066038a663bfeb7091d218b8f`; prior connected inspection verified Supabase ACTIVE version 6 source/deployment parity.
- Partner API source/deployment hardening is tracked separately in `PARTNER-API-HARDENING-EVIDENCE.md`; existing evidence records Supabase ACTIVE v15 parity and a verified rejection-only live contract on merged main, including run `32675596758`. This is not partner/commercial readiness evidence.
- `CURRENT-RUNTIME.md` is the canonical small browser/PWA runtime declaration and must stay consistent with this document.

PR #179 addresses Issue #177 discovered during the physical Android v15 restart retest. It adds a durable member-history outbox, prevents cloud snapshots from replacing local history while durable/in-flight writes remain, retries pending writes after restart/online recovery, deduplicates recent server rows before retry, starts member sync early from the directly loaded home helper, and advances the atomic PWA shell to v16.

Historical v15 deployment/device observations remain historical scoped evidence. They are not reused as post-v16 physical-device acceptance.

## Browser/PWA deployment evidence

Status: **PASS FOR CURRENT BROWSER/PWA DEPLOYMENT TRACE**

Verified v16 evidence:

- PR #179 merged as `1d21613c3c7d3e62ed8f7e5c3f00700606129c58`.
- Pages workflow run `32752667752` completed **success** for exact merged-main SHA `1d21613c3c7d3e62ed8f7e5c3f00700606129c58`.
- Corresponding Live Smoke run `32752716631` completed **success** on the same deployed SHA.
- Read-only diagnostic run `32752782165` completed **success** on temporary PR #180, which was closed without merge after evidence capture.
- Live public `release-meta.json` matched `1d21613c3c7d3e62ed8f7e5c3f00700606129c58` and `kinaraidee-beta-v16`.
- Live `sw.js` used `kinaraidee-beta-v16` and included `data/member-sync.js` plus `data/home-surprise.js` in the app shell.
- Live `data/member-sync.js` contained the durable outbox/cloud-snapshot guard/online retry contract and live `data/home-surprise.js` contained early member-sync bootstrap.

Prior verified v15 deployment evidence remains historical: Pages `32748690413`, Live Smoke `32748752875` and diagnostic `32749016604` for merge `367162286d1e1452151df11dca805ed629bb5466`. It is not reused as current PASS.

This v16 deployment PASS is scoped to Pages/public metadata/assets/automated Live Smoke. It does not imply Issue #177 device PASS, iPhone Location acceptance, real keyboard interaction, physical reduced-motion behavior, TalkBack/VoiceOver, full device matrix, Public Beta completion or Commercial GO.

## Supabase security evidence

Existing live evidence remains valid unless superseded by a later schema/configuration change:

- least-privilege browser-facing grants and anonymous Data API SELECT-denial evidence are recorded in `SUPABASE-GRANT-HARDENING-EVIDENCE.md`;
- authenticated RLS read-isolation and cross-user negative mutation evidence are recorded in `SUPABASE-RLS-AUTHORIZATION-EVIDENCE.md` and `SUPABASE-RLS-NEGATIVE-EVIDENCE.md`;
- the private admin-owner RLS helper remediation removed the prior public `SECURITY DEFINER` warning;
- Supabase Auth leaked-password protection remains **BLOCKED BY PLAN/CONFIGURATION — NOT PASS** and must not be inferred from code/CI/deployment evidence.

This scoped evidence does not prove every authenticated per-user JWT/RLS path, every mutation shape, external authenticated-session lifecycle, privileged-backend authorization path, Production Security PASS, Public Beta completion or Commercial GO.

No paid-plan upgrade is authorized or inferred.

## Real-device / accessibility status

Public Beta is still **NOT COMPLETE**; Public Beta remains **NOT COMPLETE**. CI, source inspection and Live Smoke do not replace these gates:

- iPhone TC-08 remains open in Issue #171. The observed physical Safari failure predates the v15 Location UX fix and must be retested on the current deployed v16 runtime; automated deployment/source evidence does not prove browser geolocation success.
- Android Favorite/History visual differentiation was verified on the physical v15 restart retest and Issue #172 is closed. The same restart exposed Issue #177: a newly liked item disappeared after reopen. Issue #177 remains open until a post-v16 physical Android favorite → full restart → History retention retest passes.
- NF-09 TalkBack/VoiceOver remains open until a functioning assistive-technology environment is validated and current v16 behavior is retested end-to-end.
- visible keyboard focus must be verified with real keyboard/focus navigation on deployed pages.
- reduced-motion behavior must be verified on a real platform with reduced-motion preference enabled.
- NF-07 requires a verifiable older-cache baseline and real-device upgrade to `kinaraidee-beta-v16`.
- NF-05 still requires real iPhone/iPad Safari install-hint suppression/standalone evidence.
- Android Chrome still requires at least 3 device models total and iPhone Safari at least 2 device models total.
- Remaining TC-01–TC-15 / NF-01–NF-10 results must be scored only from actual device evidence.

Historical Android/iPhone observations remain scoped to the exact behaviors and runtime versions observed and are not automatically promoted to v16 full-matrix PASS.

## Group API / operations evidence

- Group API source candidate remains PR #93 / Supabase ACTIVE version 6 according to prior verified deployment/source evidence.
- Rejection-only probes and bounded-body behavior are backend security/availability evidence only.
- Group retention policy remains **NOT APPROVED**.
- Read-only retention/dry-run contracts and cleanup-design documents do not execute deletion and do not establish Privacy/Legal approval.
- Application-event observability, monitoring owner/baseline, complete anonymous abuse controls and production retention cleanup remain incomplete.
- Operations evidence templates, recovery-integrity contracts and rollback/runbook preparation do not constitute backup restore or rollback drill PASS until executed evidence exists.

## Partner API evidence

- Partner API request-body handling, coordinate validation, no-store/nosniff and rejection-only probe mechanisms are documented in `PARTNER-API-HARDENING-EVIDENCE.md`.
- Supabase ACTIVE v15 source/deployment parity remains the scoped deployment evidence for the Partner API source candidate.
- Merged-main Partner API Live Rejection Probe run `32675596758` completed **success** on exact SHA `5ca280f4832e0d0fc1aa7057bb68f4df001d4067`; job `97283018587` passed GET=405 with no-store/nosniff, malformed JSON=400 and oversized body=413.
- Read-only diagnostic run `32675626819` confirmed the exact push run/SHA.
- This is **VERIFIED PASS FOR REJECTION BEHAVIOR ONLY**. It does not establish successful product-action requests, production traffic baseline, complete abuse controls, recurring monitoring/alert SLA, approved retention, partner agreement, conversion/reconciliation, revenue or Commercial readiness.
- No user, click, conversion or revenue figure is inferred from API hardening/live-rejection evidence.

## Repository governance

Status: **ENFORCED FOR `main` THROUGH THE `Protect main` RULESET**. Repository evidence records that PR #159 passed the required checks and merged, while PR #160 had a failing `release-consistency` check and GitHub blocked the merge under the repository rule; Issue #35 is closed as completed.

This governance PASS is scoped to merge-rule enforcement. It does not replace runtime deployment, Supabase Auth, device, privacy/legal, payment or Commercial readiness evidence.

## Public Beta gate impact

Public Beta remains **NOT COMPLETE**.

Current v16 browser/PWA deployment trace is verified. Minimum open evidence still includes the post-v16 physical Android persistence retest for Issue #177, physical iPhone Location retest for Issue #171, real-device/accessibility acceptance, keyboard/reduced-motion checks, NF-05/NF-07/NF-09, remaining device-matrix coverage and Blocker/Critical closure appropriate to Beta acceptance. Issue #5 remains the primary technical/device QA tracker; Issue #1 remains Beta launch acceptance.

## Commercial Readiness impact

Commercial launch remains **NO-GO** while important gates remain incomplete, including:

- Public Beta technical/device/accessibility acceptance on the current v16 runtime;
- Supabase leaked-password protection gate (#11), currently blocked by plan/configuration;
- repository governance must remain enforced; Issue #35 is closed after verified required-check blocking evidence;
- remaining external authenticated API/JWT lifecycle and privileged-backend negative authorization evidence beyond currently scoped tests;
- Group API application-event observability, retention/deletion policy, complete anonymous abuse controls and monitoring ownership/baseline (#45);
- Partner API complete abuse-control/monitoring/retention and real partner-commercial evidence;
- Production Privacy/Terms/controller/contact/retention/legal decisions;
- Production owner/on-call, monitoring, backup/recovery and real rollback/restore drill evidence;
- Payment/Premium provider and real subscription lifecycle evidence;
- real restaurant/affiliate partner agreements and verified commercial reconciliation for any enabled model.

No user-count, conversion, revenue, payment success, partner readiness, legal approval, full device-matrix PASS, full Public Beta PASS or Commercial GO is inferred from this document.

## Supersession rule

- Current browser/PWA runtime candidate = PR #179 v16 runtime lineage `a7ca994be76541af57b224c57f267843113df941`; deployed merge SHA = `1d21613c3c7d3e62ed8f7e5c3f00700606129c58`.
- Current PWA cache marker = `kinaraidee-beta-v16`.
- Current Group API source candidate = merged PR #93 / `fefc29322ac13f7066038a663bfeb7091d218b8f` until another Group API source change occurs.
- Partner API source/deployment lineage and scoped live rejection evidence are tracked in `PARTNER-API-HARDENING-EVIDENCE.md`; Partner API evidence does not supersede browser/PWA or Group API candidates.
- Merged PR #179 / `1d21613c3c7d3e62ed8f7e5c3f00700606129c58` supersedes the prior v15 browser/PWA deployment trace.
- Historical v15 evidence remains historical support only and does not create post-v16 device PASS.
- Supabase grants/RLS evidence is scoped security evidence, not blanket Auth/security PASS.
- Governance enforcement evidence is scoped merge-rule evidence, not Product/Security/Commercial readiness evidence.
- Public accessibility/source/synthetic/deployment evidence does not close NF-09, NF-07, NF-05, TC-08 or Issue #177 physical-device requirements.
