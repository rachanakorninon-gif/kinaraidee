# Kinaraidee — Current Release State

เอกสารนี้เป็นจุดอ้างอิงหลักสำหรับสถานะ release ปัจจุบัน เพื่อป้องกัน release/evidence drift ระหว่าง runtime, QA, deployment, Supabase security และ Commercial Readiness

หลักการ: deployment, real-device result, accessibility, security configuration, ผู้ใช้, conversion, partner, payment หรือรายได้ จะถูกระบุว่า PASS/พร้อมใช้งานได้เมื่อมีหลักฐานจริงเท่านั้น

## Current source/runtime state

- Canonical reviewed `main` baseline: `bb9d3f308ea25a864267b9ab227e70d425388500` (PR #202 evidence-only merge recording the verified PR #201 deployment trace). This baseline is intentionally allowed to remain an ancestor of newer QA/workflow/documentation-only descendants; `Kinaraidee Release Baseline Regression` blocks guarded browser/API/schema drift after it, so a docs-only merge does not require baseline churn.
- Current browser/PWA runtime candidate: `4e2e1789921aa6fd73b2677ac5def2bc35a8be73` (PR #520 post-acceptance Member referral-summary Edge-only cutover).
- Current runtime deployment status: **PASS FOR CURRENT BROWSER/PWA DEPLOYMENT TRACE**.
- Runtime merge/deployed SHA: `aa470986589d83dd95b4efd6e4a4d68a9f55965d`.
- PWA cache marker: `kinaraidee-beta-v16`.
- Current Group API source candidate: PR #518 / `8ab5fc9dd506740b48b245469421518381bbe079`; production migration `20260904161702 / group_api_event_observability_v1` is deployed and Supabase `group-api` is ACTIVE version 7 with `verify_jwt=false`. Repository/deployment source parity and scoped privacy-safe application-owned rejection-event ingestion are verified. This does not establish a production traffic/error-rate baseline, alerting, approved retention, complete abuse controls, device PASS, Public Beta completion or Commercial GO.
- Partner API source/deployment hardening is tracked separately in `PARTNER-API-HARDENING-EVIDENCE.md`; existing evidence records Supabase ACTIVE v15 parity and a verified rejection-only live contract on merged main, including run `32675596758`. This is not partner/commercial readiness evidence.
- `CURRENT-RUNTIME.md` is the canonical small browser/PWA runtime declaration and must stay consistent with this document.

PR #520 completed the ordered post-acceptance Member referral-summary browser cutover. After the recorded signed-in physical OPPO session returned the privacy-safe QA source label `EDGE` and satisfied the canonical render checks, `member.html` removed the temporary `get_my_referral_summary()` RPC fallback and retained the deployed JWT-verified `member-referral-api` as the only browser retrieval path. The Edge-only runtime then deployed successfully as `aa470986589d83dd95b4efd6e4a4d68a9f55965d`; only after that deployment and live-smoke verification was RPC execute revoked from `PUBLIC`, `anon`, and `authenticated`. Post-cutover privilege checks are negative for browser roles and the former Supabase Advisor warning for the authenticated-callable SECURITY DEFINER RPC is no longer present. The separate leaked-password-protection warning remains OPEN.

PR #509 remains historical deployed Product Event Measurement evidence: privacy-minimal best-effort unique-session funnel telemetry for reviewed UTM traffic, with no account identity, email, menu, budget or precise-location fields. Its deployment/source and controlled-ingress evidence remain valid in scope. A later scoped OPPO Android Chrome physical QA run independently verified the browser hooks for Surprise, Guided and conditional Nearby against production ingestion and then removed the controlled QA telemetry; that scoped result does not prove real-user funnel traction, conversion, retention, paid-ad performance, Campaign 3,000 eligibility or revenue.

PR #499 remains historical deployed evidence for referral/acquisition measurement readiness: allowlisted coarse UTM/referral capture, signup metadata, authenticated referral-summary/share UI and an explicit Campaign 3,000 non-eligibility boundary. Its Supabase referral schema/RPC and subsequent referral-code privacy correction remain deployed. Those facts do not by themselves prove a successful referral signup, user growth, campaign entry, conversion or revenue.

The prior PR #373 Auth password-security runtime remains historical deployed evidence for the Auth UX and the scoped physical account-flow tests already recorded. It is superseded as the current browser/PWA runtime candidate; those prior physical/Auth results are not rewritten or generalized to referral/acquisition, referral-summary Edge cutover or Product Event acceptance.

## Browser/PWA deployment evidence

Status: **PASS FOR CURRENT BROWSER/PWA DEPLOYMENT TRACE**

Current runtime evidence boundary:

- PR #520 source runtime candidate is `4e2e1789921aa6fd73b2677ac5def2bc35a8be73`.
- PR #520 merged to main as descendant `aa470986589d83dd95b4efd6e4a4d68a9f55965d`.
- GitHub Pages run `33898258213` completed **success** for exact merged-main SHA `aa470986589d83dd95b4efd6e4a4d68a9f55965d`.
- Main Live Smoke run `33898314400` completed **success** for the same deployed SHA.
- This deployment PASS proves browser/PWA source/deployment lineage and live source markers only. The separate canonical referral-summary evidence records a scoped signed-in physical `EDGE` PASS and the ordered post-cutover security verification; neither the deployment trace nor that scoped physical result proves referral conversion, Product Event real-user traction, Campaign 3,000 eligibility, user-count increase, paid-ad conversion or revenue. The separate scoped Product Event physical QA PASS is recorded independently in `PRODUCT-EVENT-PHYSICAL-EVIDENCE.md`.

Historical verified deployment evidence remains valid for its original scope:

- PR #514 source runtime `ea409cd02fc7744514b8c867a67f56ec0187de80` merged/deployed through descendant `adbb23c4f373ebfe6ed1d78e71ec051a3c05ed7a`; Pages `33838629999` and main Live Smoke `33838665915` completed **success** for that historical pre-cutover referral-summary trace.
- PR #509 source runtime `0bd5acfb9946e10ed5624205165123eabc8035b4` merged/deployed through descendant `75f95dd95b0b480f3cf3ebb668d62f7cb45345ba`; Pages `33823701475` and main Live Smoke `33823746430` completed **success** for that historical Product Event trace. Product Event API Live Smoke `33824058988` separately completed **success** for controlled production ingestion; the exact synthetic `landing` row was deleted after evidence capture and a follow-up query confirmed 0 matching rows remain.
- PR #499 source runtime `f401ad758e40914a10245cfab08497f7cdb99f7d` merged/deployed through descendant `02540bb61c3c62de4cfba34e92a876503765847d`; Pages `33811511793` and Referral acquisition regression `33811512053` completed **success** for that historical acquisition-measurement trace.
- PR #373 source runtime `6cd98bf2a2020b86fe2ab05e263dd59f7e4fb387` was verified through descendant `0cc3ec3ef4dda18f0d8e083d8ca0992ef77f844c`; Pages `33229525995`, Auth Password Security Live Smoke `33229548182` and main Live Smoke `33229548190` completed **success** for that historical scoped trace.
- PR #201 merged as `00bdcb7f432598e2eb82e71dcf1a9ec804ff1c4b2` source through deployed descendant `00bdcb7f432d542b732cf355336e9f08798e4320`.
- Pages workflow run `32802440796` completed **success** for exact merged-main SHA `00bdcb7f432d542b732cf355336e9f08798e4320`.
- Corresponding Live Smoke run `32802473505` completed **success** after that Pages deployment.
- Public Form Resilience Regression run `32802440775` completed **success** on the exact merged-main SHA and validates source recovery-state contracts only; it does not submit a form.
- Live public `release-meta.json` matched `00bdcb7f432d542b732cf355336e9f08798e4320` and `kinaraidee-beta-v16` for that historical PR #201 deployment trace.

Prior verified PR #179 v16 deployment evidence remains historical/scoped support: Pages `32752667752`, Live Smoke `32752716631` and diagnostic `32752782165` for merge `1d21613c3c7d3e62ed8f7e5c3f00700606129c58`.

Current deployment PASS is scoped to exact runtime lineage and checks identified above. It does **not by itself** establish Product Event real-user interaction/traction, referral conversion, weak/leaked-password rejection or any new real-device account-flow acceptance. Separate physical evidence records scoped referral-summary `EDGE`, Product Event QA, recovery/password-update/sign-in/new-signup/email-confirmation and other behavior-specific passes; those results remain documented independently and must not be generalized.

## Supabase security evidence

Existing live evidence remains valid unless superseded by a later schema/configuration change:

- least-privilege browser-facing grants and anonymous Data API SELECT-denial evidence are recorded in `SUPABASE-GRANT-HARDENING-EVIDENCE.md`;
- authenticated RLS read-isolation and cross-user negative mutation evidence are recorded in `SUPABASE-RLS-AUTHORIZATION-EVIDENCE.md` and `SUPABASE-RLS-NEGATIVE-EVIDENCE.md`;
- the private admin-owner RLS helper remediation removed the prior public `SECURITY DEFINER` warning;
- referral/acquisition schema/RPC migration `20260903220832 / referral_acquisition_v1` is deployed;
- referral-code privacy migration `20260903221043 / referral_code_privacy_fix_20260904` is deployed. It changed referral-code generation from an account-derived identifier fragment to a random public identifier using `gen_random_uuid()` and rotated legacy codes only before referral/acquisition usage existed;
- scoped post-fix verification retained no literal codes/account identifiers: 7 referral-code rows existed, all 7 were unique/random-format, referral rows = 0 and acquisition-attribution rows = 0. These are backend integrity observations only and must not be interpreted as active-user/referral/campaign counts;
- Product Event Measurement schema is deployed with RLS enabled and no direct `anon`/`authenticated` table access; `product-event-api` is ACTIVE v1 and `acquisition-api` is ACTIVE v2. Product tracking start is recorded as `2026-09-04 00:55:19 UTC` (`2026-09-04 07:55:19 Asia/Bangkok`). Product telemetry is best-effort and not identity, payment, Premium or Campaign 3,000 eligibility truth;
- `member-referral-api` is ACTIVE v1 with `verify_jwt=true`; deployed source parity was verified and GitHub-hosted missing/malformed-JWT rejection-only smoke passed without using a real account token. The separate canonical physical session verified a successful signed-in `EDGE` retrieval/render interaction. Raw referral tables remain unavailable to browser roles;
- post-cutover migration `referral_summary_edge_cutover_revoke_rpc_20260904` is deployed after the Edge-only browser runtime deployment. Read-only privilege verification reports `anon_execute=false` and `authenticated_execute=false` for `get_my_referral_summary()` and no browser-role table grants on `member_referral_codes` or `member_referrals`;
- Group API observability migration `20260904161702 / group_api_event_observability_v1` is deployed. `group_api_event_observations` has RLS enabled, only `bucket_date,event_name,reason`, no direct `anon`/`authenticated` SELECT, and `observe_group_api_event(...)` is `SECURITY INVOKER` with execute unavailable to browser roles. Post-v7 Security Advisor introduced no observability WARN; the table's `RLS Enabled No Policy` notice is INFO and reflects deliberate deny-by-default server-only access.
- Supabase Security Advisor no longer reports the former authenticated-callable `SECURITY DEFINER` warning for `get_my_referral_summary()` after the ordered execute revocation. The function may remain defined for historical/rollback purposes but is not browser/public executable;
- Supabase Auth leaked-password protection remains **BLOCKED BY VERIFIED FREE PLAN / CONFIGURATION — NOT PASS** and must not be inferred from code/CI/deployment or successful account-flow evidence.

This scoped evidence does not prove every authenticated per-user JWT/RLS path, every mutation shape, external authenticated-session lifecycle, privileged-backend authorization path, a successful referred signup/referral conversion, real-user acquisition behavior beyond the scoped Product Event QA run, Production Security PASS, Public Beta completion or Commercial GO.

No paid-plan upgrade is authorized or inferred.

## Real-device / accessibility status

Public Beta is still **NOT COMPLETE**. CI, source inspection and Live Smoke do not replace these gates:

- iPhone TC-08 / Issue #171 is **PASS and closed completed** for the tested physical iPhone/Safari v16 session. On 2026-08-25 Kinaraidee displayed a persistent successful Location state after `ใช้ตำแหน่งปัจจุบัน`, partner/no-partner status remained separate, and Google Maps received the menu name plus numeric coordinates rather than generic `ใกล้ฉัน`. Exact coordinate values are intentionally not retained in repository evidence. Exact iPhone model/iOS/Safari versions were not captured and are not guessed.
- The historical pre-fix v14 iPhone TC-08 failure remains historical evidence and is not rewritten as if it had passed.
- NF-05 is **PASS for iPhone/Safari #1** on deployed v16. Physical-device evidence on 2026-08-25 verified the install guidance in Safari, Add to Home Screen, launch from the installed Home Screen icon in standalone mode, no install hint in standalone mode, and no repeated install hint after pressing `เข้าใจแล้ว` and reloading Safari within the suppression window. This does not prove iPadOS or a second iPhone model.
- Android Favorite/History visual differentiation was verified and Issue #172 is closed.
- Issue #177 is closed completed and **PASS for the tested physical Android installed-PWA session**. A fresh favorite was created on v16, the app was fully closed from Recent Apps and reopened without clearing data, and the same favorite remained. This scoped result does not prove the full device matrix.
- NF-09 / Issue #57 is **PASS and closed completed for the tested physical iPhone/VoiceOver session on deployed PR #201/v16**. On 2026-08-26 the VoiceOver environment was validated first with external Calculator control activation; VoiceOver then focused and activated Surprise, announced `กำลังเลือกเมนูอาหารให้ กรุณารอสักครู่` once, reached a result, returned to ready state, and a second Surprise round started/completed successfully. Exact iPhone/iOS/Safari-or-PWA versions were not captured and are not guessed. The prior Android TalkBack follow-up remains INCONCLUSIVE / TEST ENVIRONMENT and this iPhone PASS does not create Android TalkBack or second-device PASS.
- Visible Keyboard Focus canonical result is **PASS for the scoped Lenovo system model 83DV / Windows 11 Version 25H2 (OS Build 26200.9168) / Chrome 152.0.7977.82 physical session on 2026-09-04** using the built-in notebook hardware keyboard. Trusted Tab and Shift+Tab reached actionable controls in logical forward/reverse order, multiple controls showed a visibly clear `:focus-visible` outline, Space activated the Home primary action and Enter activated the back control. No focus trap or lost-focus state was observed in the tested Home → meal-selection → back flow. Trace metadata and boundaries are recorded in `REAL-PLATFORM-UX-EVIDENCE.md` and Issue #133. This does not prove other devices, full accessibility or the full device matrix.
- Reduced Motion canonical result is **PASS for the scoped OPPO Reno13 5G / Android 16 / Chrome 152.0.7977.64 physical session on 2026-09-04**. The browser received `prefers-reduced-motion=reduce`, the shipped accessibility rule was active with computed transition duration `1e-05s`, and the physical Surprise flow rendered a result and completed back to ready. Trace metadata and boundaries are recorded in `REAL-PLATFORM-UX-EVIDENCE.md` and Issue #133. This does not prove other device/browser combinations or full-matrix accessibility.
- The earlier 2026-08-31 iPhone Reduced Motion observation remains historical supporting evidence only because exact iPhone model/iOS/Safari-or-PWA metadata were not captured; it is not the basis of the canonical PASS and missing metadata are not inferred.
- NF-07 is **PASS for the scoped OPPO Reno13 5G / Android 16 / Chrome 152.0.7977.64 session on 2026-09-05**. A deterministic historical-v15 baseline was verified before a normal physical Chrome close through Android Recents; one normal online reopen reached production v16 without clearing site/app data, the verifier confirmed the old v15 cache was removed while the persistence marker survived, and current Home + Surprise remained usable. Canonical evidence is `NF07-PHYSICAL-UPGRADE-EVIDENCE.md` with supporting detail in `PWA-UPGRADE-PHYSICAL-EVIDENCE.md`. This does not prove the remaining device matrix or full Public Beta acceptance.
- Product Event Measurement interaction is **PASS for the scoped OPPO Reno13 5G / Android 16 / Chrome 152.0.7977.64 QA session on 2026-09-05**. Surprise and Guided were physically exercised in separate fresh Chrome Incognito sessions under the dedicated QA campaign; Nearby was physically activated because the result exposed it. Production corroboration found the expected seven stage rows across two distinct sessions, no attribution mismatch or duplicate `(session,event)` rows, and the exact controlled QA rows were deleted with follow-up count 0. Canonical evidence is `PRODUCT-EVENT-PHYSICAL-EVIDENCE.md`. This is not real-user funnel traction, First-100 baseline, conversion or full-matrix PASS.
- Android Chrome still requires at least 3 distinct device models total and iPhone Safari at least 2 device models total. The traced OPPO session is **not automatically counted as Android #2**, because the historical Android #1 model/version was not captured and distinct-model identity cannot be proved.
- Remaining TC-01–TC-15 / NF-01–NF-10 results must be scored only from actual device evidence.
- TC-11 Feedback and TC-12 Partner application physical acceptance are **PASS for the scoped OPPO Reno13 5G / Android 16 / Chrome 152.0.7977.64 session** recorded in `PUBLIC-FORM-PHYSICAL-EVIDENCE.md`, including duplicate-submit, airplane-mode failure recovery, direct `aria-busy` recovery observation, restored-network success and backend/privacy evidence. This does not satisfy the remaining Android/iPhone device-matrix minimum.
- Auth account-flow interaction rooted in PR #373 is **PASS for the scoped OPPO Reno13 5G / Android 16 / Chrome 152.0.7977.64 session** for the tested recovery request/mail/verify path, replacement-password update, sign-in with the new password, genuinely new signup, Gmail confirmation delivery, confirmation-link completion and resulting signed-in Member state, with backend corroboration recorded in `AUTH-INTERACTION-PHYSICAL-EVIDENCE.md`. The umbrella Auth/Security acceptance remains **PARTIAL / OPEN** because weak/leaked-password rejection is still NOT VERIFIED / blocked server-side and broader device/account-lifecycle coverage is incomplete.
- Referral-summary signed-in Edge interaction is **PASS for the scoped OPPO Reno13 5G / Android 16 / Chrome 152.0.7977.64 session on 2026-09-04 Asia/Bangkok** recorded in `REFERRAL-SUMMARY-PHYSICAL-EVIDENCE.md`: privacy-safe QA source label `EDGE`, summary rendered, both aggregate fields rendered as numbers, and Share/Copy became enabled. No numeric aggregates or sensitive referral/account/token payloads were retained. The subsequent Edge-only deployment and RPC execute revocation are separately verified and this PASS does not prove referral conversion or referred signup.
- No real-device referral/acquisition signup/attribution acceptance is inferred from PR #499 deployment or backend schema deployment.

Historical Android/iPhone observations remain scoped to the exact behaviors and runtime versions observed and are not automatically promoted to another runtime path or full-matrix PASS.

## Group API / operations evidence

- Group API source candidate is PR #518 / `8ab5fc9dd506740b48b245469421518381bbe079`; Supabase `group-api` is ACTIVE version 7 with `verify_jwt=false`, bundle SHA-256 `363f7f547f8b773bec46e211a59c380e276f1fbf2fcc2852471dfd1608730887`, and deployed payload parity with repository blob `93d5d4afe9436e23ac5a9af3567349bedd8b73af` is verified.
- Production migration `20260904161702 / group_api_event_observability_v1` is applied. The server-only daily presence bucket stores only allowlisted `event_name` / `reason` plus UTC bucket date, with no room/token/voter/tags/IP/request body/account identifier and no request/event count; browser roles receive no table/RPC access.
- Canonical `Group API Live Observability Probe` run `32632951668` was re-run against production v7; attempt-2 job `101112482238` completed success and remained rejection-only/non-mutating.
- Post-probe read-back on UTC `2026-09-04` found six privacy-safe presence buckets covering `method_not_allowed`, `request_too_large`, `invalid_room_id`, `invalid_vote`, and host-only `forbidden` rejection categories. This verifies application-owned event ingestion **IN SCOPE**; it does not measure request volume, error rate, unique users or traffic distribution.
- Rejection-only probes and bounded-body behavior remain backend security/availability evidence only.
- Group retention policy remains **NOT APPROVED**. Operational/application-log retention remains separately **NOT APPROVED**; PR #518 does not invent a purge duration or automatic deletion policy.
- Read-only retention/dry-run contracts and cleanup-design documents do not execute deletion and do not establish Privacy/Legal approval.
- Application-event live ingestion is **VERIFIED IN THE SCOPED REJECTION-ONLY PRESENCE PATH**. Monitoring owner/baseline, thresholds, alert channel/escalation, actual alert delivery, complete anonymous abuse controls and production retention cleanup remain incomplete.
- Operations evidence templates, recovery-integrity contracts and rollback/runbook preparation do not constitute backup restore or rollback drill PASS until executed evidence exists.

## Partner API evidence

- Partner API request-body handling, coordinate validation, no-store/nosniff and rejection-only probe mechanisms are documented in `PARTNER-API-HARDENING-EVIDENCE.md`.
- Supabase ACTIVE v15 source/deployment parity remains the scoped deployment evidence for the Partner API source candidate.
- Merged-main Partner API Live Rejection Probe run `32675596758` completed **success** on exact SHA `5ca280f4832e0fc1aa7057bb68f4df001d4067`; job `97283018587` passed GET=405 with no-store/nosniff, malformed JSON=400 and oversized body=413.
- Read-only diagnostic run `32675626819` confirmed the exact push run/SHA.
- This is **VERIFIED PASS FOR REJECTION BEHAVIOR ONLY**. It does not establish successful product-action requests, production traffic baseline, complete abuse controls, recurring monitoring/alert SLA, approved retention, partner agreement, conversion/reconciliation, revenue or Commercial readiness.
- No user, click, conversion or revenue figure is inferred from API hardening/live-rejection evidence.

## Repository governance

Status: **ENFORCED FOR `main` THROUGH THE `Protect main` RULESET**. Repository evidence records that PR #159 passed the required checks and merged, while PR #160 had a failing `release-consistency` check and GitHub blocked the merge under the repository rule; Issue #35 is closed as completed.

This governance PASS is scoped to merge-rule enforcement. It does not replace runtime deployment, Supabase Auth, device, privacy/legal, payment or Commercial readiness evidence.

## Public Beta gate impact

Public Beta remains **NOT COMPLETE**.

Current PR #520 is the browser/PWA runtime candidate and its browser/PWA deployment trace is verified PASS on merged-main descendant `aa470986589d83dd95b4efd6e4a4d68a9f55965d` with Pages `33898258213` and main Live Smoke `33898314400`. The changed referral-summary signed-in interaction has a scoped physical `EDGE` PASS, the browser fallback is removed, post-deployment RPC execute revocation is verified for browser roles, and the former referral-summary SECURITY DEFINER Advisor warning is no longer present. Historical PR #509 Product Event backend ingress retains its separate controlled synthetic PASS, and the later OPPO Android Chrome physical QA run provides scoped interaction acceptance with controlled QA cleanup; this still does not establish real-user funnel traction, conversion or First-100 evidence. Group API PR #518 is deployed as ACTIVE v7 with source/deployment parity and scoped privacy-safe application-owned rejection-event ingestion verified; this does not establish a production monitoring baseline, alert delivery, retention/cleanup approval, complete abuse controls or any real-device Group PASS. These deployment/backend facts do not prove a real referral conversion, Campaign 3,000 eligibility, user growth or conversion. Separate traced OPPO physical evidence provides scoped account-flow, TC-11/TC-12, Reduced Motion, NF-07, Product Event and referral-summary `EDGE` results for the behaviors actually tested, and the traced Lenovo session provides scoped Keyboard Focus PASS. Historical PR #201/PR #373/PR #499 deployment/device/Auth/acquisition evidence remains valid only for the exact scopes already recorded. Minimum open evidence still includes weak/leaked-password rejection/server-side protection, additional Android/iPhone distinct-model coverage, remaining device-matrix coverage and Blocker/Critical closure appropriate to Beta acceptance. Issue #5 remains the primary technical/device QA tracker; Issue #1 remains Beta launch acceptance.

## Commercial Readiness impact

Commercial launch remains **NO-GO** while important gates remain incomplete, including:

- Public Beta technical/device/accessibility acceptance beyond the scoped physical evidence;
- successful referral/acquisition signup/attribution and broader real-user acquisition evidence where required; the scoped referral-summary `EDGE` PASS and completed RPC cutover do not prove referral conversion or campaign eligibility;
- broader Auth/Security lifecycle/device acceptance beyond the scoped OPPO recovery/sign-in/signup/confirmation flows; successful account flows do not establish leaked-password protection or Production Security PASS;
- broader Feedback/Partner device-matrix coverage beyond the scoped Android Chrome TC-11/TC-12 PASS where required by the Product/Beta scope;
- Supabase leaked-password protection gate (focused follow-up **Issue #372**; historical security tracker **Issue #11**), currently **BLOCKED BY VERIFIED FREE PLAN / CONFIGURATION — NOT PASS**;
- repository governance must remain enforced; Issue #35 is closed after verified required-check blocking evidence;
- remaining external authenticated API/JWT lifecycle and privileged-backend negative authorization evidence beyond currently scoped tests;
- Group API retention/deletion policy and cleanup verification, complete anonymous abuse controls, monitoring ownership/baseline/thresholds, alert channel/escalation and actual alert-delivery evidence (#45); scoped application-event ingestion is verified but does not close these remaining gates;
- Partner API complete abuse-control/monitoring/retention and real partner-commercial evidence;
- Production Privacy/Terms/controller/contact/retention/legal decisions;
- Production owner/on-call, monitoring, backup/recovery and real rollback/restore drill evidence;
- Payment/Premium provider and real subscription lifecycle evidence;
- real restaurant/affiliate partner agreements and verified commercial reconciliation for any enabled model.

No user-count, conversion, revenue, payment success, partner readiness, legal approval, full device-matrix PASS, full Public Beta PASS or Commercial GO is inferred from this document.

## Supersession rule

- Current browser/PWA runtime candidate = PR #520 source runtime `4e2e1789921aa6fd73b2677ac5def2bc35a8be73`; deployment status = **PASS FOR CURRENT BROWSER/PWA DEPLOYMENT TRACE**; deployed descendant = `aa470986589d83dd95b4efd6e4a4d68a9f55965d`.
- Current PWA cache marker = `kinaraidee-beta-v16`.
- Current Group API source candidate = PR #518 / `8ab5fc9dd506740b48b245469421518381bbe079`; production status = **ACTIVE version 7 / SOURCE PARITY VERIFIED / SCOPED APPLICATION-EVENT INGESTION VERIFIED**. Prior PR #93 / ACTIVE version 6 remains historical deployment evidence only.
- Partner API source/deployment lineage and scoped live rejection evidence are tracked in `PARTNER-API-HARDENING-EVIDENCE.md`; Partner API evidence does not supersede browser/PWA or Group API candidates.
- PR #514 / `ea409cd02fc7744514b8c867a67f56ec0187de80` with deployed descendant `adbb23c4f373ebfe6ed1d78e71ec051a3c05ed7a` remains historical verified pre-cutover referral-summary browser/PWA deployment evidence and does not replace current PR #520 runtime.
- PR #509 / `0bd5acfb9946e10ed5624205165123eabc8035b4` with deployed descendant `75f95dd95b0b480f3cf3ebb668d62f7cb45345ba` remains historical verified Product Event browser/PWA deployment evidence and does not replace current PR #520 runtime. The later scoped physical Product Event QA PASS is independent of this deployment evidence and is not real-user traction.
- PR #499 / `f401ad758e40914a10245cfab08497f7cdb99f7d` with deployed descendant `02540bb61c3c62de4cfba34e92a876503765847d` remains historical verified referral/acquisition browser/PWA deployment evidence and does not replace current PR #520 runtime or create referral conversion acceptance.
- PR #373 / `6cd98bf2a2020b86fe2ab05e263dd59f7e4fb387` with deployed descendant `0cc3ec3ef4dda18f0d8e083d8ca0992ef77f844c` remains historical verified Auth browser/PWA deployment evidence and does not replace the current runtime or create referral/Product Event acceptance.
- PR #201 / `00bdcb7f432598e2eb82e71dcf1a9ec804ff1c4b2` remains historical verified browser/PWA deployment evidence for the public-form resilience runtime and does not replace current PR #520 deployment evidence.
- Historical PR #179 deployment and device evidence remains scoped historical/current support for the exact behaviors tested; it is not reused as referral/acquisition physical evidence or as evidence for devices that were not actually tested.
- Supabase grants/RLS/referral-schema/Product-Event evidence is scoped backend security/integrity/ingestion evidence, not blanket Auth/security, referral-success, real-user Product Funnel or campaign PASS.
- Governance enforcement evidence is scoped merge-rule evidence, not Product/Security/Commercial readiness evidence.
- Physical iPhone/VoiceOver evidence closes NF-09 only for the tested session; it does not close second-device requirements, additional public-form device coverage, leaked-password rejection, broader Auth lifecycle/device coverage or the remaining full-device-matrix gates. Canonical NF-07 PASS is separately scoped to the traced OPPO v15→v16 upgrade session, canonical Product Event physical QA PASS is separately scoped to the traced OPPO Incognito sessions, canonical Reduced Motion PASS is separately scoped to the traced OPPO Reno13 5G / Android 16 / Chrome 152 session, canonical Keyboard Focus PASS is separately scoped to the traced Lenovo 83DV / Windows 11 / Chrome 152.0.7977.82 session, and canonical referral-summary `EDGE` PASS is separately scoped to the traced OPPO signed-in session with its completed post-cutover security verification.