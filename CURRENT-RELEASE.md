# Kinaraidee — Current Release State

เอกสารนี้เป็นจุดอ้างอิงหลักสำหรับสถานะ release ปัจจุบัน เพื่อป้องกัน release/evidence drift ระหว่าง runtime, QA, deployment, Supabase security และ Commercial Readiness

หลักการ: deployment, real-device result, accessibility, security configuration, ผู้ใช้, conversion, partner, payment หรือรายได้ จะถูกระบุว่า PASS/พร้อมใช้งานได้เมื่อมีหลักฐานจริงเท่านั้น

## Current source/runtime state

- Canonical reviewed `main` baseline: `bb9d3f308ea25a864267b9ab227e70d425388500` (PR #202 evidence-only merge recording the verified PR #201 deployment trace). This baseline is intentionally allowed to remain an ancestor of newer QA/workflow/documentation-only descendants; `Kinaraidee Release Baseline Regression` blocks guarded browser/API/schema drift after it, so a docs-only merge does not require baseline churn.
- Current browser/PWA runtime candidate: `f401ad758e40914a10245cfab08497f7cdb99f7d` (PR #499 referral/acquisition measurement readiness).
- Current runtime deployment status: **PENDING FOR CURRENT RUNTIME DEPLOYMENT**.
- Runtime merge/deployed SHA: `0cc3ec3ef4dda18f0d8e083d8ca0992ef77f844c` (last verified deployed browser/PWA descendant; current candidate is not yet deployed).
- PWA cache marker: `kinaraidee-beta-v16`.
- Current Group API source candidate: PR #93 / `fefc29322ac13f7066038a663bfeb7091d218b8f`; prior connected inspection verified Supabase ACTIVE version 6 source/deployment parity.
- Partner API source/deployment hardening is tracked separately in `PARTNER-API-HARDENING-EVIDENCE.md`; existing evidence records Supabase ACTIVE v15 parity and a verified rejection-only live contract on merged main, including run `32675596758`. This is not partner/commercial readiness evidence.
- `CURRENT-RUNTIME.md` is the canonical small browser/PWA runtime declaration and must stay consistent with this document.

PR #499 prepares first-touch acquisition/referral measurement for the first-3,000-user growth plan. It adds strict allowlisted UTM/referral capture, passes those coarse values into signup metadata, adds an authenticated referral-code/share/aggregate-summary UI, updates the privacy disclosure, stages an RLS-protected Supabase referral schema/RPC plus rollback SQL, and adds a regression contract. The referral UI is designed to degrade safely while the backend RPC is not deployed. This source change does not itself deploy the Supabase schema, create a referral signup, create a Campaign 3,000 prize entry, establish any user count/conversion, or alter the `kinaraidee-beta-v16` Service Worker generation.

The prior PR #373 Auth password-security UX runtime remains the last verified deployed browser/PWA runtime at descendant `0cc3ec3ef4dda18f0d8e083d8ca0992ef77f844c`. Its deployment and scoped physical Auth evidence remain historical/current evidence for the exact behaviors verified and are not generalized to the new referral/acquisition flow.

## Browser/PWA deployment evidence

Status: **PENDING FOR CURRENT RUNTIME DEPLOYMENT**

Current runtime evidence boundary:

- PR #499 source candidate is `f401ad758e40914a10245cfab08497f7cdb99f7d`.
- Current runtime deployment evidence is pending. PR #499 has not yet been merged/deployed to GitHub Pages, so no browser/PWA deployment PASS is claimed for the referral/acquisition runtime.
- The last verified deployed browser/PWA descendant remains `0cc3ec3ef4dda18f0d8e083d8ca0992ef77f844c` for the prior PR #373 Auth password-security runtime.
- The dedicated Referral acquisition regression workflow passed for PR #499 source/contract checks. That CI result does not prove public Pages deployment, Supabase schema/RPC deployment, a real referral signup, a user-count increase, paid-ad attribution, or Campaign 3,000 prize eligibility.

Historical verified deployment evidence remains valid for its original scope:

- PR #373 merged as source runtime `6cd98bf2a2020b86fe2ab05e263dd59f7e4fb387`.
- PR #374 is a docs-only post-merge descendant `0cc3ec3ef4dda18f0d8e083d8ca0992ef77f844c`; no guarded browser/PWA runtime files changed between the source candidate and that descendant.
- GitHub Pages run `33229525995` completed **success** for exact descendant SHA `0cc3ec3ef4dda18f0d8e083d8ca0992ef77f844c`.
- Auth Password Security Live Smoke run `33229548182` completed **success** against the public deployed `member.html` and `reset-password.html` markers without submitting credentials or changing Auth configuration.
- Main Kinaraidee Live Smoke run `33229548190` completed **success** after the same deployment and verified public pages/assets plus the live runtime contract.
- This historical PASS is scoped to the PR #373 browser/PWA deployment trace and static/live source markers. It does not prove Supabase leaked-password protection is enabled, a real weak/leaked password is rejected, the new referral/acquisition runtime is deployed, or any referral signup completed.
- PR #201 merged as `00bdcb7f432d542b732cf355336e9f08798e4320`.
- Pages workflow run `32802440796` completed **success** for exact merged-main SHA `00bdcb7f432d542b732cf355336e9f08798e4320`.
- Corresponding Live Smoke run `32802473505` completed **success** after that Pages deployment.
- Public Form Resilience Regression run `32802440775` completed **success** on the exact merged-main SHA and validates source recovery-state contracts only; it does not submit a form.
- Live public `release-meta.json` matched `00bdcb7f432d542b732cf355336e9f08798e4320` and `kinaraidee-beta-v16` for that historical PR #201 deployment trace.

Prior verified PR #179 v16 deployment evidence remains historical/scoped support: Pages `32752667752`, Live Smoke `32752716631` and diagnostic `32752782165` for merge `1d21613c3c7d3e62ed8f7e5c3f00700606129c58`.

The last verified deployment PASS does **not by itself** establish weak/leaked-password rejection or real-device account-flow acceptance. Separate physical evidence records scoped recovery/password-update/sign-in/new-signup/email-confirmation PASS on the traced OPPO Android Chrome session; that physical evidence is documented independently in `AUTH-INTERACTION-PHYSICAL-EVIDENCE.md`. None of that historical evidence is reused as referral/acquisition acceptance.

## Supabase security evidence

Existing live evidence remains valid unless superseded by a later schema/configuration change:

- least-privilege browser-facing grants and anonymous Data API SELECT-denial evidence are recorded in `SUPABASE-GRANT-HARDENING-EVIDENCE.md`;
- authenticated RLS read-isolation and cross-user negative mutation evidence are recorded in `SUPABASE-RLS-AUTHORIZATION-EVIDENCE.md` and `SUPABASE-RLS-NEGATIVE-EVIDENCE.md`;
- the private admin-owner RLS helper remediation removed the prior public `SECURITY DEFINER` warning;
- Supabase Auth leaked-password protection remains **BLOCKED BY VERIFIED FREE PLAN / CONFIGURATION — NOT PASS** and must not be inferred from code/CI/deployment or successful account-flow evidence.

The PR #499 referral/acquisition schema is staged in source only at this release state. Its RLS/revoke/RPC design and rollback contract are source evidence, not live Supabase deployment evidence; no referral table, trigger or RPC is considered live until deployment and post-deployment verification are explicitly recorded.

This scoped evidence does not prove every authenticated per-user JWT/RLS path, every mutation shape, external authenticated-session lifecycle, privileged-backend authorization path, Production Security PASS, Public Beta completion or Commercial GO.

No paid-plan upgrade is authorized or inferred.

## Real-device / accessibility status

Public Beta is still **NOT COMPLETE**. CI, source inspection and Live Smoke do not replace these gates:

- iPhone TC-08 / Issue #171 is **PASS and closed completed** for the tested physical iPhone/Safari v16 session. On 2026-08-25 Kinaraidee displayed a persistent successful Location state after `ใช้ตำแหน่งปัจจุบัน`, partner/no-partner status remained separate, and Google Maps received the menu name plus numeric coordinates rather than generic `ใกล้ฉัน`. Exact coordinate values are intentionally not retained in repository evidence. Exact iPhone model/iOS/Safari versions were not captured and are not guessed.
- The historical pre-fix v14 iPhone TC-08 failure remains historical evidence and is not rewritten as if it had passed.
- NF-05 is **PASS for iPhone/Safari #1** on deployed v16. Physical-device evidence on 2026-08-25 verified the install guidance in Safari, Add to Home Screen, launch from the installed Home Screen icon in standalone mode, no install hint in standalone mode, and no repeated install hint after pressing `เข้าใจแล้ว` and reloading Safari within the suppression window. This does not prove iPadOS or a second iPhone model.
- Android Favorite/History visual differentiation was verified and Issue #172 is closed.
- Issue #177 is closed completed and **PASS for the tested physical Android installed-PWA session**. A fresh favorite was created on v16, the app was fully closed from Recent Apps and reopened without clearing data, and the same favorite remained. This scoped result does not prove the full device matrix.
- NF-09 / Issue #57 is **PASS and closed completed for the tested physical iPhone/VoiceOver session on deployed PR #201/v16**. On 2026-08-26 the VoiceOver environment was validated first with external Calculator control activation; VoiceOver then focused and activated Surprise, announced `กำลังเลือกเมนูอาหารให้ กรุณารอสักครู่` once, reached a result, returned to ready state, and a second Surprise round started/completed successfully. Exact iPhone/iOS/Safari-or-PWA versions were not captured and are not guessed. The prior Android TalkBack follow-up remains INCONCLUSIVE / TEST ENVIRONMENT and this iPhone PASS does not create Android TalkBack or second-device PASS.
- visible keyboard focus must be verified with real keyboard/focus navigation on deployed pages.
- Reduced Motion canonical result is **PASS for the scoped OPPO Reno13 5G / Android 16 / Chrome 152.0.7977.64 physical session on 2026-09-04**. The browser received `prefers-reduced-motion=reduce`, the shipped accessibility rule was active with computed transition duration `1e-05s`, and the physical Surprise flow rendered `โจ๊กต้มยำหมู` and completed back to ready. Trace metadata and boundaries are recorded in `REAL-PLATFORM-UX-EVIDENCE.md` and Issue #133. This does not prove other device/browser combinations or full-matrix accessibility.
- The earlier 2026-08-31 iPhone Reduced Motion observation remains historical supporting evidence only because exact iPhone model/iOS/Safari-or-PWA metadata were not captured; it is not the basis of the canonical PASS and missing metadata are not inferred.
- NF-07 remains **NOT VERIFIED**. PR #481/#482 prepared and deployed a deterministic historical-v15 QA fixture/verifier with exact fixture SHA-256 `39eadd35eba67436ee41db17a119f0739dc5c7d9dda58dd951a13766572bf72c`; this setup/deployment evidence does not replace the still-required physical v15-baseline → normal close/reopen → v16 upgrade without clearing site data. Canonical boundary is `PWA-UPGRADE-PHYSICAL-EVIDENCE.md`.
- Android Chrome still requires at least 3 distinct device models total and iPhone Safari at least 2 device models total. The traced OPPO session is **not automatically counted as Android #2**, because the historical Android #1 model/version was not captured and distinct-model identity cannot be proved.
- Remaining TC-01–TC-15 / NF-01–NF-10 results must be scored only from actual device evidence.
- TC-11 Feedback and TC-12 Partner application physical acceptance are **PASS for the scoped OPPO Reno13 5G / Android 16 / Chrome 152.0.7977.64 session** recorded in `PUBLIC-FORM-PHYSICAL-EVIDENCE.md`, including duplicate-submit, airplane-mode failure recovery, direct `aria-busy` recovery observation, restored-network success and backend/privacy evidence. This does not satisfy the remaining Android/iPhone device-matrix minimum.
- Current PR #373 Auth account-flow interaction is **PASS for the scoped OPPO Reno13 5G / Android 16 / Chrome 152.0.7977.64 session** for the tested recovery request/mail/verify path, replacement-password update, sign-in with the new password, genuinely new signup, Gmail confirmation delivery, confirmation-link completion and resulting signed-in Member state, with backend corroboration recorded in `AUTH-INTERACTION-PHYSICAL-EVIDENCE.md`. The umbrella Auth/Security acceptance remains **PARTIAL / OPEN** because weak/leaked-password rejection is still NOT VERIFIED / blocked server-side and broader device/account-lifecycle coverage is incomplete.

Historical Android/iPhone observations remain scoped to the exact behaviors and runtime versions observed and are not automatically promoted to another runtime path or full-matrix PASS. No physical-device referral/acquisition acceptance is claimed for PR #499 at this pending deployment state.

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

Current PR #499 is the browser/PWA runtime candidate and its browser/PWA deployment trace is **PENDING**. No Referral/Acquisition deployment PASS, backend deployment PASS, real referral signup or user-count result is claimed yet. The prior PR #373 Auth browser/PWA deployment trace remains verified historical/current deployed evidence on descendant `0cc3ec3ef4dda18f0d8e083d8ca0992ef77f844c`; the separate traced OPPO physical session remains scoped account-flow evidence for recovery/password-update/sign-in/new-signup/email-confirmation. Historical PR #201 deployment/device evidence remains valid only for the exact scoped behaviors already recorded. TC-11/TC-12 public-form interaction acceptance and the canonical Reduced Motion result are also complete for their documented scoped Android Chrome sessions. Minimum open evidence still includes weak/leaked-password rejection/server-side protection, additional Android/iPhone distinct-model coverage, real keyboard-focus verification, NF-07 physical upgrade, remaining device-matrix coverage and Blocker/Critical closure appropriate to Beta acceptance. Issue #5 remains the primary technical/device QA tracker; Issue #1 remains Beta launch acceptance.

## Commercial Readiness impact

Commercial launch remains **NO-GO** while important gates remain incomplete, including:

- Public Beta technical/device/accessibility acceptance beyond the scoped physical evidence;
- current PR #499 referral/acquisition runtime deployment and any required backend/security verification before using it for paid acquisition at scale;
- broader Auth/Security lifecycle/device acceptance beyond the scoped OPPO recovery/sign-in/signup/confirmation flows; successful account flows do not establish leaked-password protection or Production Security PASS;
- broader Feedback/Partner device-matrix coverage beyond the scoped Android Chrome TC-11/TC-12 PASS where required by the Product/Beta scope;
- Supabase leaked-password protection gate (focused follow-up **Issue #372**; historical security tracker **Issue #11**), currently **BLOCKED BY VERIFIED FREE PLAN / CONFIGURATION — NOT PASS**;
- repository governance must remain enforced; Issue #35 is closed after verified required-check blocking evidence;
- remaining external authenticated API/JWT lifecycle and privileged-backend negative authorization evidence beyond currently scoped tests;
- Group API application-event observability, retention/deletion policy, complete anonymous abuse controls and monitoring ownership/baseline (#45);
- Partner API complete abuse-control/monitoring/retention and real partner-commercial evidence;
- Production Privacy/Terms/controller/contact/retention/legal decisions;
- Production owner/on-call, monitoring, backup/recovery and real rollback/restore drill evidence;
- Payment/Premium provider and real subscription lifecycle evidence;
- real restaurant/affiliate partner agreements and verified commercial reconciliation for any enabled model.

No user-count, conversion, referral-count, prize-entry, revenue, payment success, partner readiness, legal approval, full device-matrix PASS, full Public Beta PASS or Commercial GO is inferred from this document.

## Supersession rule

- Current browser/PWA runtime candidate = PR #499 source candidate `f401ad758e40914a10245cfab08497f7cdb99f7d`; deployment status = **PENDING FOR CURRENT RUNTIME DEPLOYMENT**; last verified deployed browser/PWA descendant remains `0cc3ec3ef4dda18f0d8e083d8ca0992ef77f844c` for prior PR #373.
- Current PWA cache marker = `kinaraidee-beta-v16`.
- Current Group API source candidate = merged PR #93 / `fefc29322ac13f7066038a663bfeb7091d218b8f` until another Group API source change occurs.
- Partner API source/deployment lineage and scoped live rejection evidence are tracked in `PARTNER-API-HARDENING-EVIDENCE.md`; Partner API evidence does not supersede browser/PWA or Group API candidates.
- PR #373 / `6cd98bf2a2020b86fe2ab05e263dd59f7e4fb387` with deployed descendant `0cc3ec3ef4dda18f0d8e083d8ca0992ef77f844c` remains historical verified browser/PWA deployment evidence for Auth password-security UX and does not replace current PR #499 pending deployment evidence.
- PR #201 / `00bdcb7f432598e2eb82e71dcf1a9ec804ff1c4b2` remains historical verified browser/PWA deployment evidence for the public-form resilience runtime and does not replace current PR #499 pending deployment evidence or the separate scoped Auth physical evidence.
- Historical PR #179 deployment and device evidence remains scoped historical/current support for the exact behaviors tested; it is not reused as PR #499 referral/acquisition physical evidence or as evidence for devices that were not actually tested.
- Supabase grants/RLS evidence is scoped security evidence, not blanket Auth/security PASS. The PR #499 referral schema remains source-only until explicitly deployed and verified.
- Governance enforcement evidence is scoped merge-rule evidence, not Product/Security/Commercial readiness evidence.
- Physical iPhone/VoiceOver evidence closes NF-09 only for the tested session; it does not close NF-07, second-device requirements, additional public-form device coverage, leaked-password rejection, broader Auth lifecycle/device coverage, keyboard-focus checks or the remaining full-device-matrix gates. Canonical Reduced Motion PASS is separately scoped to the traced OPPO Reno13 5G / Android 16 / Chrome 152 session.