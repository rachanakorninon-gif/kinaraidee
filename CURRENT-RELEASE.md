# Kinaraidee — Current Release State

เอกสารนี้เป็นจุดอ้างอิงหลักสำหรับสถานะ release ปัจจุบัน เพื่อป้องกัน release/evidence drift ระหว่าง runtime, QA, deployment, Supabase security และ Commercial Readiness

หลักการ: deployment, real-device result, accessibility, security configuration, ผู้ใช้, conversion, partner, payment หรือรายได้ จะถูกระบุว่า PASS/พร้อมใช้งานได้เมื่อมีหลักฐานจริงเท่านั้น

## Current source/runtime state

- Latest reviewed `main` descendant: `bb9d3f308ea25a864267b9ab227e70d425388500` (PR #202 release-evidence merge after the verified PR #201 deployment trace; the PR #202 merge itself changes evidence only and does not supersede browser/PWA runtime behavior).
- Current browser/PWA runtime candidate: `a60318b432598e2eb82e71dcf1a9ec804ff1c4b2` (PR #201 public Feedback/Partner form recovery runtime lineage).
- Runtime merge/deployed SHA: `00bdcb7f432d542b732cf355336e9f08798e4320` (PR #201 merged).
- PWA cache marker: `kinaraidee-beta-v16`.
- Current Group API source candidate: PR #93 / `fefc29322ac13f7066038a663bfeb7091d218b8f`; prior connected inspection verified Supabase ACTIVE version 6 source/deployment parity.
- Partner API source/deployment hardening is tracked separately in `PARTNER-API-HARDENING-EVIDENCE.md`; existing evidence records Supabase ACTIVE v15 parity and a verified rejection-only live contract on merged main, including run `32675596758`. This is not partner/commercial readiness evidence.
- `CURRENT-RUNTIME.md` is the canonical small browser/PWA runtime declaration and must stay consistent with this document.

PR #201 hardens public Feedback and Partner application submission recovery so duplicate activation is guarded, submission paths restore disabled/`aria-busy` state after failures through `try/catch/finally`, and generic user-facing error hygiene remains intact. This runtime keeps the existing `kinaraidee-beta-v16` Service Worker generation because the changed public form pages are not being promoted as a new cached-shell generation.

PR #179 remains the durability baseline inside the current v16 lineage: it added the durable member-history outbox, protected local history from stale cloud snapshots, retried pending writes after restart/online recovery, and advanced the atomic PWA shell to v16. Physical Android restart evidence for Issue #177 remains scoped evidence for that tested path and is not invalidated by the later public-form hardening.

Historical v15 deployment/device observations remain historical scoped evidence. They are not reused as post-v16 physical-device acceptance except where a distinct current-v16 retest is explicitly recorded below.

## Browser/PWA deployment evidence

Status: **PASS FOR CURRENT BROWSER/PWA DEPLOYMENT TRACE**

Verified current v16 evidence:

- PR #201 merged as `00bdcb7f432d542b732cf355336e9f08798e4320`.
- Pages workflow run `32802440796` completed **success** for exact merged-main SHA `00bdcb7f432d542b732cf355336e9f08798e4320`.
- Corresponding Live Smoke run `32802473505` completed **success** after that Pages deployment and verifies public `feedback.html`, `partner.html`, `release-meta.json` and `sw.js`, requires the public release-meta SHA to equal the successful Pages head SHA, and requires the live Service Worker/release metadata cache marker to match `kinaraidee-beta-v16`.
- Public Form Resilience Regression run `32802440775` completed **success** on exact merged-main SHA `00bdcb7f432d542b732cf355336e9f08798e4320`. This validates source recovery-state contracts only and does not submit either public form.
- The verified PR #179 deployment trace remains historical/current lineage support for the durable member-history v16 shell: Pages `32752667752`, Live Smoke `32752716631` and diagnostic `32752782165` for merge `1d21613c3c7d3e62ed8f7e5c3f00700606129c58`.
- Prior verified v15 deployment evidence remains historical: Pages `32748690413`, Live Smoke `32748752875` and diagnostic `32749016604` for merge `367162286d1e1452151df11dca805ed629bb5466`. It is not reused as current deployment PASS.

This current deployment PASS is scoped to Pages/public metadata/assets/automated Live Smoke and source recovery-state contracts. It does **not** establish successful real Feedback or Partner form submission, backend insert acceptance, or physical-device interaction for the changed submission paths. Separate current-v16 physical-device evidence below remains scoped to the exact Android/iPhone behaviors tested and may not be generalized to the full device matrix.

## Supabase security evidence

Existing live evidence remains valid unless superseded by a later schema/configuration change:

- least-privilege browser-facing grants and anonymous Data API SELECT-denial evidence are recorded in `SUPABASE-GRANT-HARDENING-EVIDENCE.md`;
- authenticated RLS read-isolation and cross-user negative mutation evidence are recorded in `SUPABASE-RLS-AUTHORIZATION-EVIDENCE.md` and `SUPABASE-RLS-NEGATIVE-EVIDENCE.md`;
- the private admin-owner RLS helper remediation removed the prior public `SECURITY DEFINER` warning;
- Supabase Auth leaked-password protection remains **BLOCKED BY PLAN/CONFIGURATION — NOT PASS** and must not be inferred from code/CI/deployment evidence.

This scoped evidence does not prove every authenticated per-user JWT/RLS path, every mutation shape, external authenticated-session lifecycle, privileged-backend authorization path, Production Security PASS, Public Beta completion or Commercial GO.

No paid-plan upgrade is authorized or inferred.

## Real-device / accessibility status

Public Beta is still **NOT COMPLETE**. CI, source inspection and Live Smoke do not replace these gates:

- iPhone TC-08 / Issue #171 is **PASS and closed completed** for the tested physical iPhone/Safari v16 session. On 2026-08-25 Kinaraidee displayed a persistent successful Location state after `ใช้ตำแหน่งปัจจุบัน`, partner/no-partner status remained separate, and Google Maps received the menu name plus numeric coordinates rather than generic `ใกล้ฉัน`. Exact coordinate values are intentionally not retained in repository evidence. Exact iPhone model/iOS/Safari versions were not captured and are not guessed.
- The historical pre-fix v14 iPhone TC-08 failure remains historical evidence and is not rewritten as if it had passed.
- NF-05 is **PASS for iPhone/Safari #1** on deployed v16. Physical-device evidence on 2026-08-25 verified the install guidance in Safari, Add to Home Screen, launch from the installed Home Screen icon in standalone mode, no install hint in standalone mode, and no repeated install hint after pressing `เข้าใจแล้ว` and reloading Safari within the suppression window. This does not prove iPadOS or a second iPhone model.
- Android Favorite/History visual differentiation was verified on the physical v15 restart retest and Issue #172 is closed.
- The same v15 restart exposed Issue #177 when a newly liked item disappeared after reopen. On 2026-08-25 a physical Android post-v16 retest created a fresh favorite, observed favorite count **4 → 5**, fully closed the installed PWA from Recent Apps, reopened without clearing data, and confirmed the same favorite remained with count **5**. Issue #177 is closed completed for that tested Android session.
- Real Feedback/Partner form submission acceptance for the PR #201 paths remains open; source/CI/Pages/Live Smoke do not create a submission PASS.
- NF-09 TalkBack/VoiceOver remains open until a functioning assistive-technology environment is validated and current v16 behavior is retested end-to-end.
- visible keyboard focus must be verified with real keyboard/focus navigation on deployed pages.
- reduced-motion behavior must be verified on a real platform with reduced-motion preference enabled.
- NF-07 requires a verifiable older-cache baseline and real-device upgrade to `kinaraidee-beta-v16`; the observed v15→v16 installed-PWA transition is not promoted to NF-07 PASS because the exact older-cache marker was not independently captured on-device.
- Android Chrome still requires at least 3 device models total and iPhone Safari at least 2 device models total; the current iPhone TC-08/NF-05 PASS covers only iPhone #1.
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

The current v16 browser/PWA deployment trace for PR #201 is verified; Issue #177's focused Android restart persistence acceptance, Issue #171's focused iPhone/Safari Location acceptance and NF-05 on iPhone/Safari #1 remain complete for the tested sessions. Real Feedback/Partner form submission acceptance remains separate. Minimum open evidence still includes additional Android/iPhone device-count coverage, real-device/accessibility acceptance, keyboard/reduced-motion checks, NF-07/NF-09, remaining device-matrix coverage and Blocker/Critical closure appropriate to Beta acceptance. Issue #5 remains the primary technical/device QA tracker; Issue #1 remains Beta launch acceptance.

## Commercial Readiness impact

Commercial launch remains **NO-GO** while important gates remain incomplete, including:

- Public Beta technical/device/accessibility acceptance on the current v16 runtime;
- real Feedback/Partner form submission acceptance where required by Beta scope;
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

- Current browser/PWA runtime candidate = PR #201 public-form recovery lineage `a60318b432598e2eb82e71dcf1a9ec804ff1c4b2`; deployed merge SHA = `00bdcb7f432d542b732cf355336e9f08798e4320`.
- Current PWA cache marker = `kinaraidee-beta-v16`.
- Current Group API source candidate = merged PR #93 / `fefc29322ac13f7066038a663bfeb7091d218b8f` until another Group API source change occurs.
- Partner API source/deployment lineage and scoped live rejection evidence are tracked in `PARTNER-API-HARDENING-EVIDENCE.md`; Partner API evidence does not supersede browser/PWA or Group API candidates.
- Merged PR #201 / `00bdcb7f432d542b732cf355336e9f08798e4320` supersedes PR #179 as the current browser/PWA deployment trace while retaining `kinaraidee-beta-v16`.
- PR #179 / `1d21613c3c7d3e62ed8f7e5c3f00700606129c58` remains historical/current-lineage support for the durable member-history v16 implementation and its scoped physical Android restart evidence.
- Historical v15 evidence remains historical support only; current-v16 physical-device promotions in this document are explicitly limited to Android fresh-favorite full-restart PASS for #177 and iPhone/Safari #1 Location + NF-05 PASS.
- Supabase grants/RLS evidence is scoped security evidence, not blanket Auth/security PASS.
- Governance enforcement evidence is scoped merge-rule evidence, not Product/Security/Commercial readiness evidence.
- Public accessibility/source/synthetic/deployment evidence does not close NF-09, NF-07, second-device requirements or the remaining full-device-matrix gates.
