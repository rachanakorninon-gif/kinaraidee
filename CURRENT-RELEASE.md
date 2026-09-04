# Kinaraidee — Current Release State

เอกสารนี้เป็นจุดอ้างอิงหลักสำหรับสถานะ release ปัจจุบัน เพื่อป้องกัน release/evidence drift ระหว่าง runtime, QA, deployment, Supabase security และ Commercial Readiness

หลักการ: deployment, real-device result, accessibility, security configuration, ผู้ใช้, conversion, partner, payment หรือรายได้ จะถูกระบุว่า PASS/พร้อมใช้งานได้เมื่อมีหลักฐานจริงเท่านั้น

## Current source/runtime state

- Canonical reviewed `main` baseline: `bb9d3f308ea25a864267b9ab227e70d425388500` (PR #202 evidence-only merge recording the verified PR #201 deployment trace). This baseline is intentionally allowed to remain an ancestor of newer QA/workflow/documentation-only descendants; `Kinaraidee Release Baseline Regression` blocks guarded browser/API/schema drift after it, so a docs-only merge does not require baseline churn.
- Current browser/PWA runtime candidate: `ea409cd02fc7744514b8c867a67f56ec0187de80` (PR #514 referral-summary Edge-first cutover with temporary RPC fallback).
- Current runtime deployment status: **PASS FOR CURRENT BROWSER/PWA DEPLOYMENT TRACE**.
- Runtime merge/deployed SHA: `adbb23c4f373ebfe6ed1d78e71ec051a3c05ed7a`.
- PWA cache marker: `kinaraidee-beta-v16`.
- Current Group API source candidate: PR #93 / `fefc29322ac13f7066038a663bfeb7091d218b8f`; prior connected inspection verified Supabase ACTIVE version 6 source/deployment parity.
- Partner API source/deployment hardening is tracked separately in `PARTNER-API-HARDENING-EVIDENCE.md`; existing evidence records Supabase ACTIVE v15 parity and a verified rejection-only live contract on merged main, including run `32675596758`. This is not partner/commercial readiness evidence.
- `CURRENT-RUNTIME.md` is the canonical small browser/PWA runtime declaration and must stay consistent with this document.

PR #514 changes only the signed-in Member referral-summary retrieval path: `member.html` now attempts the deployed JWT-verified `member-referral-api` first and keeps the existing caller-scoped `get_my_referral_summary()` RPC as a temporary fallback. The opt-in `qa_referral_trace=1` evidence switch reveals only `EDGE`, `FALLBACK` or `UNAVAILABLE`; it does not expose a token/account identifier. The changed runtime is deployed, but real signed-in Edge-path acceptance remains **NOT VERIFIED** and the fallback must remain until a traceable physical session satisfies `REFERRAL-SUMMARY-PHYSICAL-EVIDENCE.md`.

PR #509 remains historical verified Product Event Measurement deployment evidence for reviewed UTM traffic while preserving `kinaraidee-beta-v16`: a random browser-session UUID and coarse allowlisted UTM fields are used to record unique-session funnel stages without account identity, email, menu, budget or precise-location fields. Core recommendation behavior remains independent of telemetry availability. Product Event schema and Edge Functions remain deployed, but deployment does not by itself prove any real-user Product Funnel interaction, conversion, retention, paid-ad performance, Campaign 3,000 eligibility or revenue.

PR #499 remains historical deployed evidence for referral/acquisition measurement readiness: allowlisted coarse UTM/referral capture, signup metadata, authenticated referral-summary/share UI and an explicit Campaign 3,000 non-eligibility boundary. Its Supabase referral schema/RPC and subsequent referral-code privacy correction remain deployed. Those facts do not by themselves prove a successful referral signup, user growth, campaign entry, conversion or revenue.

The prior PR #373 Auth password-security runtime remains historical deployed evidence for the Auth UX and the scoped physical account-flow tests already recorded. It is superseded as the current browser/PWA runtime candidate; those prior physical/Auth results are not rewritten or generalized to referral/acquisition, referral-summary Edge cutover or Product Event acceptance.

## Browser/PWA deployment evidence

Status: **PASS FOR CURRENT BROWSER/PWA DEPLOYMENT TRACE**

Current runtime evidence boundary:

- PR #514 source runtime candidate is `ea409cd02fc7744514b8c867a67f56ec0187de80`.
- PR #514 merged to main as descendant `adbb23c4f373ebfe6ed1d78e71ec051a3c05ed7a`.
- GitHub Pages run `33838629999` completed **success** for exact merged-main SHA `adbb23c4f373ebfe6ed1d78e71ec051a3c05ed7a`.
- Main Live Smoke run `33838665915` completed **success** after that deployment for the same merged-main runtime lineage.
- `member-referral-api` remains ACTIVE v1 with `verify_jwt=true`; PR #513 already verified source/deployment parity and missing/malformed-JWT rejection without a real account token.
- The browser now attempts the authenticated Edge Function first and retains the caller-scoped RPC only as a temporary fallback. Deployment checks do not prove a real signed-in session receives its referral summary through the Edge path.
- `REFERRAL-SUMMARY-PHYSICAL-EVIDENCE.md` remains **NOT VERIFIED / PHYSICAL SIGNED-IN ACCEPTANCE REQUIRED**. `EDGE` is required for scoped PASS; `FALLBACK` proves continuity only and is not cutover acceptance.
- The Supabase Security Advisor warning for authenticated execution of the SECURITY DEFINER `get_my_referral_summary()` remains intentionally OPEN until physical Edge acceptance allows fallback removal/remediation.
- This deployment PASS proves browser/PWA source/deployment lineage and scoped production availability only. It does not prove referral conversion, successful referral signup, Product Event real-user behavior, Campaign 3,000 eligibility, user-count increase, paid-ad conversion or revenue.

Historical verified deployment evidence remains valid for its original scope:

- PR #509 source runtime `0bd5acfb9946e10ed5624205165123eabc8035b4` merged/deployed through descendant `75f95dd95b0b480f3cf3ebb668d62f7cb45345ba`; Pages `33823701475` and main Live Smoke `33823746430` completed **success** for that Product Event browser/PWA trace. Product Event API Live Smoke run `33824058988` completed **success** against production ingestion; the exact controlled synthetic row was removed after evidence capture and follow-up verification found no matching row.
- PR #499 source runtime `f401ad758e40914a10245cfab08497f7cdb99f7d` merged/deployed through descendant `02540bb61c3c62de4cfba34e92a876503765847d`; Pages `33811511793` and Referral acquisition regression `33811512053` completed **success** for that historical acquisition-measurement trace.
- PR #373 source runtime `6cd98bf2a2020b86fe2ab05e263dd59f7e4fb387` was verified through descendant `0cc3ec3ef4dda18f0d8e083d8ca0992ef77f844c`; Pages `33229525995`, Auth Password Security Live Smoke `33229548182` and main Live Smoke `33229548190` completed **success** for that historical scoped trace.
- PR #201 merged as `00bdcb7f432598e2eb82e71dcf1a9ec804ff1c4b2` source through deployed descendant `00bdcb7f432d542b732cf355336e9f08798e4320`.
- Pages workflow run `32802440796` completed **success** for exact merged-main SHA `00bdcb7f432d542b732cf355336e9f08798e4320`.
- Corresponding Live Smoke run `32802473505` completed **success** after that Pages deployment.
- Public Form Resilience Regression run `32802440775` completed **success** on the exact merged-main SHA and validates source recovery-state contracts only; it does not submit a form.
- Live public `release-meta.json` matched `00bdcb7f432d542b732cf355336e9f08798e4320` and `kinaraidee-beta-v16` for that historical PR #201 deployment trace.

Prior verified PR #179 v16 deployment evidence remains historical/scoped support: Pages `32752667752`, Live Smoke `32752716631` and diagnostic `32752782165` for merge `1d21613c3c7d3e62ed8f7e5c3f00700606129c58`.

Current deployment PASS is scoped to exact runtime lineage and checks identified above. It does **not by itself** establish referral-summary physical Edge acceptance, Product Event real-user acceptance, successful referral signup, weak/leaked-password rejection or any new real-device account-flow acceptance. Separate physical evidence records scoped recovery/password-update/sign-in/new-signup/email-confirmation PASS on the traced OPPO Android Chrome session; that evidence remains documented independently in `AUTH-INTERACTION-PHYSICAL-EVIDENCE.md`.

## Supabase security evidence

Existing live evidence remains valid unless superseded by a later schema/configuration change:

- least-privilege browser-facing grants and anonymous Data API SELECT-denial evidence are recorded in `SUPABASE-GRANT-HARDENING-EVIDENCE.md`;
- authenticated RLS read-isolation and cross-user negative mutation evidence are recorded in `SUPABASE-RLS-AUTHORIZATION-EVIDENCE.md` and `SUPABASE-RLS-NEGATIVE-EVIDENCE.md`;
- the private admin-owner RLS helper remediation removed the prior public `SECURITY DEFINER` warning;
- referral/acquisition schema/RPC migration `20260903220832 / referral_acquisition_v1` is deployed;
- referral-code privacy migration `20260903221043 / referral_code_privacy_fix_20260904` is deployed. It changed referral-code generation from an account-derived identifier fragment to a random public identifier using `gen_random_uuid()` and rotated legacy codes only before referral/acquisition usage existed;
- scoped post-fix verification retained no literal codes/account identifiers: 7 referral-code rows existed, all 7 were unique/random-format, referral rows = 0 and acquisition-attribution rows = 0. These are backend integrity observations only and must not be interpreted as active-user/referral/campaign counts;
- `member-referral-api` is ACTIVE v1 with `verify_jwt=true`; raw referral-table SELECT remains unavailable to `anon` and `authenticated`. The caller-scoped `get_my_referral_summary()` RPC remains executable by `authenticated` only as a temporary fallback pending physical Edge acceptance, so the related Security Advisor WARN remains **OPEN / NOT REMEDIATED YET** rather than being suppressed or generalized into Production Security PASS;
- Product Event Measurement schema is deployed with RLS enabled and no direct `anon`/`authenticated` table access; `product-event-api` is ACTIVE v1 and `acquisition-api` is ACTIVE v2. Product tracking start is recorded as `2026-09-04 00:55:19 UTC` (`2026-09-04 07:55:19 Asia/Bangkok`). Product telemetry is best-effort and not identity, payment, Premium or Campaign 3,000 eligibility truth;
- Supabase Auth leaked-password protection remains **BLOCKED BY VERIFIED FREE PLAN / CONFIGURATION — NOT PASS** and must not be inferred from code/CI/deployment or successful account-flow evidence.

This scoped evidence does not prove every authenticated per-user JWT/RLS path, every mutation shape, external authenticated-session lifecycle, privileged-backend authorization path, a successful referral signup, real-user Product Event behavior, Production Security PASS, Public Beta completion or Commercial GO.

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
- Auth account-flow interaction rooted in PR #373 is **PASS for the scoped OPPO Reno13 5G / Android 16 / Chrome 152.0.7977.64 session** for the tested recovery request/mail/verify path, replacement-password update, sign-in with the new password, genuinely new signup, Gmail confirmation delivery, confirmation-link completion and resulting signed-in Member state, with backend corroboration recorded in `AUTH-INTERACTION-PHYSICAL-EVIDENCE.md`. The umbrella Auth/Security acceptance remains **PARTIAL / OPEN** because weak/leaked-password rejection is still NOT VERIFIED / blocked server-side and broader device/account-lifecycle coverage is incomplete.
- No real-device referral/acquisition acceptance is inferred from PR #499 deployment or backend schema deployment.
- No real-device referral-summary Edge acceptance is inferred from PR #514 deployment, Pages/Live Smoke, or the backend rejection-only smoke. Physical `EDGE` evidence remains required.
- No real-device Product Event Measurement interaction acceptance is inferred from PR #509 deployment, Pages/Live Smoke, or the synthetic production API probe.

Historical Android/iPhone observations remain scoped to the exact behaviors and runtime versions observed and are not automatically promoted to another runtime path or full-matrix PASS.

## Group API / operations evidence

- Group API source candidate remains PR #93 / Supabase ACTIVE version 6 according to prior verified deployment/source evidence.
- Rejection-only probes and bounded-body behavior are backend security/availability evidence only.
- The scheduled Group API live rejection probe is active and current Supabase Edge Function logs expose platform request-level records (method/status/function version) for those production probe calls. This establishes request-log visibility only; the connected log surface still does not expose the custom privacy-safe application-event payloads, so application-event ingestion remains **NOT VERIFIED**.
- Group retention policy remains **NOT APPROVED**.
- Read-only retention/dry-run contracts and cleanup-design documents do not execute deletion and do not establish Privacy/Legal approval.
- Application-event observability beyond platform request logs, monitoring owner/baseline, complete anonymous abuse controls and production retention cleanup remain incomplete.
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

Current PR #514 is the browser/PWA runtime candidate and its browser/PWA deployment trace is verified PASS on merged-main descendant `adbb23c4f373ebfe6ed1d78e71ec051a3c05ed7a`. The changed signed-in referral-summary path remains physically **NOT VERIFIED**: a traceable real signed-in session must report `EDGE` and satisfy `REFERRAL-SUMMARY-PHYSICAL-EVIDENCE.md` before the temporary RPC fallback may be removed or its Advisor warning remediated. Historical Product Event backend ingress retains its separate controlled synthetic PASS with generated rows cleaned after verification, but Product Event real-device acceptance remains OPEN. Separate traced OPPO physical evidence continues to provide scoped account-flow, TC-11/TC-12 and Reduced Motion results for the behaviors actually tested. Historical PR #201/PR #373/PR #499/PR #509 deployment/device/Auth/acquisition/Product-Event evidence remains valid only for the exact scopes already recorded. Minimum open evidence still includes weak/leaked-password rejection/server-side protection, additional Android/iPhone distinct-model coverage, real keyboard-focus verification, NF-07 physical upgrade, Product Event physical interaction, referral-summary physical Edge interaction, remaining device-matrix coverage and Blocker/Critical closure appropriate to Beta acceptance. Issue #5 remains the primary technical/device QA tracker; Issue #1 remains Beta launch acceptance.

## Commercial Readiness impact

Commercial launch remains **NO-GO** while important gates remain incomplete, including:

- Public Beta technical/device/accessibility acceptance beyond the scoped physical evidence;
- broader Auth/Security lifecycle/device acceptance beyond the scoped OPPO recovery/sign-in/signup/confirmation flows; successful account flows do not establish leaked-password protection or Production Security PASS;
- referral-summary signed-in Edge acceptance and the subsequent safe removal/remediation of the temporary SECURITY DEFINER RPC fallback;
- broader Feedback/Partner device-matrix coverage beyond the scoped Android Chrome TC-11/TC-12 PASS where required by the Product/Beta scope;
- Supabase leaked-password protection gate (focused follow-up **Issue #372**; historical security tracker **Issue #11**), currently **BLOCKED BY VERIFIED FREE PLAN / CONFIGURATION — NOT PASS**;
- repository governance must remain enforced; Issue #35 is closed after verified required-check blocking evidence;
- remaining external authenticated API/JWT lifecycle and privileged-backend negative authorization evidence beyond currently scoped tests;
- Group API application-event observability beyond platform request logs, retention/deletion policy, complete anonymous abuse controls and monitoring ownership/baseline (#45);
- Partner API complete abuse-control/monitoring/retention and real partner-commercial evidence;
- Production Privacy/Terms/controller/contact/retention/legal decisions;
- Production owner/on-call, monitoring, backup/recovery and real rollback/restore drill evidence;
- Payment/Premium provider and real subscription lifecycle evidence;
- real restaurant/affiliate partner agreements and verified commercial reconciliation for any enabled model.

No user-count, conversion, revenue, payment success, partner readiness, legal approval, full device-matrix PASS, full Public Beta PASS or Commercial GO is inferred from this document.

## Supersession rule

- Current browser/PWA runtime candidate = PR #514 source runtime `ea409cd02fc7744514b8c867a67f56ec0187de80`; deployment status = **PASS FOR CURRENT BROWSER/PWA DEPLOYMENT TRACE**; deployed descendant = `adbb23c4f373ebfe6ed1d78e71ec051a3c05ed7a`.
- Current PWA cache marker = `kinaraidee-beta-v16`.
- Current Group API source candidate = merged PR #93 / `fefc29322ac13f7066038a663bfeb7091d218b8f` until another Group API source change occurs.
- Partner API source/deployment lineage and scoped live rejection evidence are tracked in `PARTNER-API-HARDENING-EVIDENCE.md`; Partner API evidence does not supersede browser/PWA or Group API candidates.
- PR #509 / `0bd5acfb9946e10ed5624205165123eabc8035b4` with deployed descendant `75f95dd95b0b480f3cf3ebb668d62f7cb45345ba` remains historical verified Product Event browser/PWA deployment evidence and does not replace current PR #514 runtime or create Product Event/referral-summary physical acceptance.
- PR #499 / `f401ad758e40914a10245cfab08497f7cdb99f7d` with deployed descendant `02540bb61c3c62de4cfba34e92a876503765847d` remains historical verified referral/acquisition browser/PWA deployment evidence and does not replace current PR #514 runtime or create Product Event/referral acceptance.
- PR #373 / `6cd98bf2a2020b86fe2ab05e263dd59f7e4fb387` with deployed descendant `0cc3ec3ef4dda18f0d8e083d8ca0992ef77f844c` remains historical verified Auth browser/PWA deployment evidence and does not replace the current runtime or create referral/Product Event acceptance.
- PR #201 / `00bdcb7f432d542b732cf355336e9f08798e4320` remains historical verified browser/PWA deployment evidence for the public-form resilience runtime and does not replace current PR #514 deployment evidence.
- Historical PR #179 deployment and device evidence remains scoped historical/current support for the exact behaviors tested; it is not reused as referral/acquisition physical evidence or as evidence for devices that were not actually tested.
- Supabase grants/RLS/referral-schema/Product-Event/member-referral-API evidence is scoped backend security/integrity/ingestion evidence, not blanket Auth/security, referral-success, real-user Product Funnel, physical Edge cutover or campaign PASS.
- Governance enforcement evidence is scoped merge-rule evidence, not Product/Security/Commercial readiness evidence.
- Physical iPhone/VoiceOver evidence closes NF-09 only for the tested session; it does not close NF-07, second-device requirements, additional public-form device coverage, leaked-password rejection, referral-summary Edge acceptance, Product Event physical interaction, broader Auth lifecycle/device coverage, keyboard-focus checks or the remaining full-device-matrix gates. Canonical Reduced Motion PASS is separately scoped to the traced OPPO Reno13 5G / Android 16 / Chrome 152 session.