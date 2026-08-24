# Kinaraidee — Current Release State

เอกสารนี้เป็นจุดอ้างอิงหลักสำหรับสถานะ release ปัจจุบัน เพื่อป้องกัน release/evidence drift ระหว่าง runtime, QA, deployment, Supabase security และ Commercial Readiness

หลักการ: deployment, real-device result, accessibility, security configuration, ผู้ใช้, conversion, partner, payment หรือรายได้ จะถูกระบุว่า PASS/พร้อมใช้งานได้เมื่อมีหลักฐานจริงเท่านั้น

## Current source/runtime state

- Latest reviewed `main` descendant: `b6300e5458f17195c72a72ffa7ed0000fee40e24` (PR #164 merged member-auth deployment lineage).
- Current browser/PWA deployment evidence was refreshed after PR #164; prior compare/evidence notes below remain historical context.
- PR #151 merged as `ca339234fc66396ba6b7ededfbb83a830334c0ad` to validate the Group API commercial-release consistency guard through pull-request CI after the guard was changed to derive the deployed version from recorded evidence instead of hard-coding it. The validation file is evidence-only and explicitly does not modify browser/PWA runtime, Group API source, Partner API source, Supabase schema/data/configuration, device results, user data, conversion data or revenue data. This is repository QA/evidence consistency only; it is not a new Group API deployment, device result, partner action, conversion, revenue, Public Beta completion or Commercial GO evidence.
- Current browser/PWA runtime candidate: `e5c19d048ae556153ebe66bdb4598ab0d168da97` (PR #164 member-auth runtime lineage).
- Runtime merge/deployed SHA: `b6300e5458f17195c72a72ffa7ed0000fee40e24` (PR #164 merged).
- PWA cache marker: `kinaraidee-beta-v14`.
- Current Group API source candidate: PR #93 / `fefc29322ac13f7066038a663bfeb7091d218b8f`; prior connected inspection verified Supabase ACTIVE version 6 source/deployment parity.
- Partner API source/deployment hardening is tracked separately in `PARTNER-API-HARDENING-EVIDENCE.md`; existing evidence records Supabase ACTIVE v15 parity and a verified rejection-only live contract on merged main. This is not partner/commercial readiness evidence.
- `CURRENT-RUNTIME.md` is the canonical small browser/PWA runtime declaration and must stay consistent with this document.

PR #134 changed browser/PWA runtime behavior by adding visible keyboard focus and reduced-motion accessibility hardening on the main app and public Feedback/Partner forms. Therefore historical PR #79 / v13 deployment evidence is no longer the current runtime deployment evidence.

PR #164 changed the browser/PWA runtime by hardening public member/reset error handling and password length, correcting reset return to `member.html`, and adding both auth pages to the clean Pages artifact, runtime-lineage guard and Live Smoke scope. The merged deployment trace is recorded below.

## Browser/PWA deployment evidence

Status: **PASS FOR CURRENT BROWSER/PWA DEPLOYMENT TRACE**

Verified v14 evidence:

- Current member-auth runtime: PR #164 merged as `b6300e5458f17195c72a72ffa7ed0000fee40e24`; the Service Worker remains `kinaraidee-beta-v14` because the cached shell did not change.
- Pages workflow run `32737240239` completed success for exact deployed SHA `b6300e5458f17195c72a72ffa7ed0000fee40e24`.
- Corresponding Live Smoke run `32737301309` completed success on the same SHA.
- Read-only diagnostic run `32738157335` confirmed exact Pages/Live Smoke metadata, public `release-meta.json` SHA/cache, deployed `member.html` / `reset-password.html` hardening, and public `admin.html` HTTP 404; temporary PR #165 closed without merge.
- Live public `release-meta.json` matched `b6300e5458f17195c72a72ffa7ed0000fee40e24` and `kinaraidee-beta-v14`.
- Prior PR #134/v14 focus and reduced-motion deployment evidence remains historical support for unchanged runtime portions and is not reused as proof of the member-auth deployment by itself.

- Pages workflow run `32673914310` completed success for deployed SHA `e30aa999f6277b221bf8dae85aa3b23521ad6f06`.
- Corresponding Live Smoke run `32673939090` completed success on the same SHA.
- Read-only diagnostic run `32674078371` confirmed exact Pages/Live Smoke run metadata; temporary PR #135 was closed without merge.
- Live public `release-meta.json` matched deployed SHA `e30aa999f6277b221bf8dae85aa3b23521ad6f06`.
- Live Service Worker marker matched `kinaraidee-beta-v14`.
- Live Smoke covered focus/reduced-motion deployed source contracts, persistent Surprise accessibility markers, Group-result bridge, Partner renderer/privacy wiring and guarded development-only paths.
- PR #136 merged the verified v14 deployment evidence into the canonical runtime declaration as `707d9a403d82a57e6736842a3fa74882d1722e8b`.
- That evidence-only descendant also has exact successful Pages run `32674271444` and Live Smoke run `32674298914`; read-only diagnostic run `32675047230` confirmed both records.
- Later main SHA `19626daf77778c6e51ba37193f09b24a7225c139` changes documentation only after `707d9a40...`; diagnostic run `32675123865` found no exact deployment run for it, which is expected because those documentation-only changes did not trigger browser/PWA deployment.
- The current deployed browser/PWA lineage is `b6300e5458f17195c72a72ffa7ed0000fee40e24`; older reviewed descendants below remain historical evidence only.

This deployment PASS is scoped to Pages/public metadata/assets/automated Live Smoke. It does not imply real keyboard interaction, physical reduced-motion behavior, TalkBack/VoiceOver, full device matrix, Public Beta completion or Commercial GO.

## Supabase security evidence

Existing live evidence remains valid unless superseded by a later schema/configuration change:

- least-privilege browser-facing grants and anonymous Data API SELECT-denial evidence are recorded in `SUPABASE-GRANT-HARDENING-EVIDENCE.md`;
- authenticated RLS read-isolation and cross-user negative mutation evidence are recorded in `SUPABASE-RLS-AUTHORIZATION-EVIDENCE.md` and `SUPABASE-RLS-NEGATIVE-EVIDENCE.md`;
- the private admin-owner RLS helper remediation removed the prior public `SECURITY DEFINER` warning;
- Supabase Auth leaked-password protection remains **BLOCKED BY PLAN/CONFIGURATION — NOT PASS** and must not be inferred from code/CI/deployment evidence.

This scoped evidence does not prove every authenticated per-user JWT/RLS path, every mutation shape, external authenticated-session lifecycle, privileged-backend authorization path, Production Security PASS, Public Beta completion or Commercial GO.

No paid-plan upgrade is authorized or inferred.

## Real-device / accessibility status

Public Beta remains **NOT COMPLETE**. CI, source inspection and Live Smoke do not replace these gates:

- NF-09 TalkBack/VoiceOver remains open until a functioning assistive-technology environment is validated and current v14 behavior is retested end-to-end.
- v14 visible focus must be verified with real keyboard/focus navigation on deployed pages.
- v14 reduced-motion behavior must be verified on a real platform with reduced-motion preference enabled.
- NF-07 now requires a verifiable older-cache baseline and real-device upgrade to `kinaraidee-beta-v14`.
- NF-05 still requires real iPhone/iPad Safari install-hint evidence.
- TC-08 requires traceable permission-allow evidence, not inference from Maps opening or coordinates alone.
- Android Chrome still requires at least 3 device models total and iPhone Safari at least 2 device models total.
- Remaining TC-01–TC-15 / NF-01–NF-10 results must be scored only from actual device evidence.

Historical same-device Android evidence for specific fixed defects remains scoped historical evidence and is not automatically promoted to v14 full-matrix PASS.

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
- PR #142 fixed an Actions workflow-validation defect that had caused the rejection probe to fail before job creation; the repaired workflow preserved rejection-only behavior and introduced no application-action payload.
- Merged-main Partner API Live Rejection Probe run `32675596758` completed **success** on exact SHA `5ca280f4832e0d0fc1aa7057bb68f4df001d4067`; job `97283018587` passed GET=405 with no-store/nosniff, malformed JSON=400 and oversized body=413.
- Read-only diagnostic run `32675626819` confirmed the exact push run/SHA, and PR #144 merged the scoped evidence/consistency guard as `cc3b08101a2f342e4f5e6c178c56f1b25aa0c67c`.
- PR #147 validated the Partner API release-consistency guard on its PR head; the observed Release Consistency, Beta QA/integrity, Security Hygiene and related regression runs completed successfully. This is static/cross-document guard evidence only and is not a new Partner API deployment or product-action PASS.
- PR #148 validated the hardened Partner API probe/regression contract through pull-request CI. The recorded PR-head runs include Partner API Regression `32694354792` plus Release Consistency, Beta QA/integrity, Security Hygiene, Runtime Lineage, Credential Scanner and Real Device Contract regression successes. This proves repository guard consistency only; it does not prove that the hardened scheduled/manual live probe has completed a new successful run.
- This is **VERIFIED PASS FOR REJECTION BEHAVIOR ONLY** based on the previously verified merged-main live rejection run. It does not establish successful product-action requests, production traffic baseline, complete abuse controls, recurring monitoring/alert SLA, approved retention, partner agreement, conversion/reconciliation, revenue or Commercial readiness.
- No user, click, conversion or revenue figure is inferred from API hardening/live-rejection evidence.

## Repository governance

Status: **ENFORCED FOR `main` THROUGH THE `Protect main` RULESET**. Repository evidence records that PR #159 passed the required checks and merged, while PR #160 had a failing `release-consistency` check and GitHub blocked the merge under the repository rule; Issue #35 is closed as completed.

This governance PASS is scoped to merge-rule enforcement. It does not replace runtime deployment, Supabase Auth, device, privacy/legal, payment or Commercial readiness evidence.

## Public Beta gate impact

Public Beta is still **NOT COMPLETE**.

Current v14 browser/PWA deployment trace is verified, but minimum open evidence includes real-device/accessibility acceptance, v14 keyboard/reduced-motion checks, remaining device-matrix coverage and Blocker/Critical closure appropriate to Beta acceptance. Issue #5 remains the primary technical/device QA tracker; Issue #1 remains Beta launch acceptance.

## Commercial Readiness impact

Commercial launch remains **NO-GO** while important gates remain incomplete, including:

- Public Beta technical/device/accessibility acceptance on the current v14 runtime;
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

- Current browser/PWA runtime candidate = PR #164 member-auth lineage `e5c19d048ae556153ebe66bdb4598ab0d168da97`; deployed merge SHA = `b6300e5458f17195c72a72ffa7ed0000fee40e24`.
- Current PWA cache marker = `kinaraidee-beta-v14`.
- Current Group API source candidate = merged PR #93 / `fefc29322ac13f7066038a663bfeb7091d218b8f` until another Group API source change occurs.
- Partner API source/deployment lineage and scoped live rejection evidence are tracked in `PARTNER-API-HARDENING-EVIDENCE.md`; Partner API evidence does not supersede browser/PWA or Group API candidates.
- PR #136 / `707d9a403d82a57e6736842a3fa74882d1722e8b` is evidence/runtime-declaration maintenance after the v14 deploy; it does not create a newer browser runtime than PR #134.
- Merged PR #164 / `b6300e5458f17195c72a72ffa7ed0000fee40e24` supersedes the earlier browser/PWA deployment candidate; later evidence-only descendants do not create a newer runtime unless browser/PWA assets change.
- Supabase grants/RLS evidence is scoped security evidence, not blanket Auth/security PASS.
- Governance runbook/check-contract evidence is preparation evidence, not enforcement PASS.
- Public accessibility/source/synthetic evidence does not close NF-09, NF-07, NF-05, TC-08 or new v14 keyboard/reduced-motion real-device requirements.
