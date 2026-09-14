# Kinaraidee — Release Checklist

ใช้เอกสารนี้เป็น release gate ก่อนเปิด Public Beta / Production

## Current runtime candidate
- Current browser/PWA runtime candidate: `91cdf79d221c68ca54e5f874aebe421846264821` (Issue #635 persistent bottom-navigation current-state accessibility remediation merged through PR #636)
- Current runtime deployment status: **PASS FOR CURRENT BROWSER/PWA DEPLOYMENT TRACE**
- Runtime merge/deployed SHA: `ff975076a643d123081da8ab3e3baf399fdc5f6d`.
- Last verified deployed browser/PWA descendant: `ff975076a643d123081da8ab3e3baf399fdc5f6d`.
- Current Group API source candidate: `8ab5fc9dd506740b48b245469421518381bbe079` (PR #518); Supabase production `group-api` ACTIVE v7 with repository/deployment source parity and scoped application-owned privacy-safe rejection-event ingestion verified. This does not establish traffic/error-rate baseline, retention approval, alert delivery, complete abuse controls, Public Beta completion or Commercial GO.
- Partner API source/deployment hardening: Supabase ACTIVE v15, source/deployment parity and rejection-only live probe evidence are recorded in `PARTNER-API-HARDENING-EVIDENCE.md`; this does not establish successful product requests, partner agreements, revenue or Commercial readiness.
- Expected Service Worker cache: `kinaraidee-beta-v16`
- Current browser/PWA deployment evidence is **PASS for the deployment trace only**: Issue #635 runtime candidate `91cdf79d221c68ca54e5f874aebe421846264821` is verified through exact deployed descendant `ff975076a643d123081da8ab3e3baf399fdc5f6d`; Pages `34854825324`, main Live Smoke `34854891192`, Auth Password Security Live Smoke `34854891245`, Campaign 3000 Premium Live Smoke `34854891441`, Toast Accessibility Live Smoke `34854891055`, and Premium Research Preview Live Smoke `34854891061` succeeded for that trace. The Pages predeploy guard confirmed no guarded browser/PWA runtime drift after the declared candidate; live `release-meta.json` matched the exact deployed SHA and cache `kinaraidee-beta-v16`. This Deployment PASS does not create VoiceOver/TalkBack/keyboard Physical PASS, another-device PASS, full accessibility conformance, Public Beta completion or Commercial GO. Issues #524/#545 remain physically PENDING for their affected iPhone scopes.
- Historical Issue #585 PR #627 deployment remains valid in its original scope: candidate `0b6352af081f51ad9df2343022d0683b109d93a4`, deployed `af329c471c0335fd6e0812a8d5f75066ffb335cd`, Pages `34676035335`, main Live Smoke `34676056521`, Auth Password Security Live Smoke `34676056466`, Campaign 3000 Premium Live Smoke `34676056536`, Toast Accessibility Live Smoke `34676056553`, Premium Research Preview Live Smoke `34676056518` = SUCCESS.
- Historical PR #596 deployment remains valid in its original scope: source `de18711695bb94617c3cffa7767cb3943c0d2c05`, deployed descendant `ca6a1c1bcb622ff241101a9c40aabfcd2a4b9793`, Pages `34382130901`, main Live Smoke `34382207087`, Auth Password Security Live Smoke `34382207152`, Campaign 3000 Premium Live Smoke `34382207209` = SUCCESS. Separate fresh 2026-09-10 OPPO physical evidence closed Issues #592/#593 only for that affected-device scope.
- Historical Home V3 deployment remains valid in its original scope: source `d24824948c9df1808178b9bb5a78a8f885086fb4`, deployed descendant `f6b8598597edd874e69cbfe1dae941c919aaa037`, Pages `34161708724`, main Live Smoke `34161744258` = SUCCESS.
- Historical PR #554 remediation deployment remains valid in its original scope: source `6f7d56f0b68551c731d88d69e34286a8f2ecca70`, deployed descendant `0f96414295f2a5f5abd7da346aa8a58d47c10f63`, Pages `34137902178`, main Live Smoke `34137949343`, Auth Password Security Live Smoke `34137949293`, Campaign 3000 Premium Live Smoke `34137949307` = SUCCESS.
- Historical PR #548 Home V3 deployment remains valid in its original scope: source `6eac2ce642a907414260518d0435263b3e54f425`, deployed descendant `46136f5ca6322847545289c18233320139147aa2`, Pages `34087987096`, main Live Smoke `34088055637`, Auth Password Security Live Smoke `34088055663`, Campaign 3000 Premium Live Smoke `34088055657` = SUCCESS.
- Historical PR #546 Nearby deployment remains valid in its original scope: source `e0523e6cab49b09e910ba66f2ad18351f491d19a`, deployed descendant `a6db511e0bbd6be9038bbc63a06fb5e1702006d3`, Pages `34013867862`, main Live Smoke `34013888880`, Auth Password Security Live Smoke `34013888842` = SUCCESS. Issues #524/#545 remain physically pending.
- Historical PR #537 password-recovery initialization deployment remains valid in its original scope: source `35cdf74b1c845ba61e46b86ec9e3c0e16e16eb72`, deployed descendant `d7dd3a550b9a0d583cd7f3269a357b0187377d50`, Pages `33975327442`, main Live Smoke `33975353656`, Auth Password Security Live Smoke `33975353718` = SUCCESS. Its physical retest remains PENDING because fresh recovery-email issuance was blocked by the observed Supabase Auth rate limit.
- Historical PR #520 referral-summary Edge-only deployment remains valid in its original scope: source `4e2e1789921aa6fd73b2677ac5def2bc35a8be73`, deployed descendant `aa470986589d83dd95b4efd6e4a4d68a9f55965d`, Pages `33898258213`, main Live Smoke `33898314400` = SUCCESS. Separate scoped physical `EDGE` acceptance and subsequent RPC privilege revocation remain documented independently.
- Historical PR #509 Product Event deployment remains valid in its original scope and does not establish real-user traction or conversion.
- Historical PR #499 referral/acquisition deployment remains valid in its original scope and does not establish a referred signup, referral conversion, Campaign 3,000 eligibility or revenue.
- Historical PR #373 Auth deployment remains valid in its original scope and does not replace current Issue #635 runtime/device acceptance.

## Source / Static
- [x] HTML/CSS/JS source baseline is committed
- [x] PWA manifest exists
- [x] Service Worker exists
- [x] robots.txt exists
- [x] sitemap.xml exists
- [x] 404.html exists
- [x] Feedback / Partner / Privacy pages exist
- [x] Static syntax / JSON checks exist
- [x] Security hygiene checks exist
- [x] PWA cache/update regression checks exist
- [x] Release consistency guard exists

## Deployment & Release Evidence
- [x] Current Issue #635 browser/PWA runtime candidate `91cdf79d221c68ca54e5f874aebe421846264821` is verified through exact deployed descendant `ff975076a643d123081da8ab3e3baf399fdc5f6d`; Pages `34854825324`, main Live Smoke `34854891192`, Auth Password Security Live Smoke `34854891245`, Campaign 3000 Premium Live Smoke `34854891441`, Toast Accessibility Live Smoke `34854891055`, and Premium Research Preview Live Smoke `34854891061` succeeded. The current deployment PASS is limited to exact static deployment/live-source evidence and does not create Physical/Public-Beta/Commercial acceptance.
- [x] Historical PR #596 remediation deployment: source `de18711695bb94617c3cffa7767cb3943c0d2c05`, deployed descendant `ca6a1c1bcb622ff241101a9c40aabfcd2a4b9793`, Pages `34382130901`, main Live Smoke `34382207087`, Auth Password Security Live Smoke `34382207152`, Campaign 3000 Premium Live Smoke `34382207209` = SUCCESS.
- [x] Historical Home V3 deployment: source `d24824948c9df1808178b9bb5a78a8f885086fb4`, deployed descendant `f6b8598597edd874e69cbfe1dae941c919aaa037`, Pages `34161708724`, main Live Smoke `34161744258` = SUCCESS.
- [x] Historical OPPO remediation deployment: source `6f7d56f0b68551c731d88d69e34286a8f2ecca70`, deployed descendant `0f96414295f2a5f5abd7da346aa8a58d47c10f63`, Pages `34137902178`, main Live Smoke `34137949343`, Auth Password Security Live Smoke `34137949293`, Campaign 3000 Premium Live Smoke `34137949307` = SUCCESS.
- [x] Historical Home V3 deployment: source `6eac2ce642a907414260518d0435263b3e54f425`, deployed descendant `46136f5ca6322847545289c18233320139147aa2`, Pages `34087987096`, main Live Smoke `34088055637`, Auth Password Security Live Smoke `34088055663`, Campaign 3000 Premium Live Smoke `34088055657` = SUCCESS.
- [x] Historical Nearby remediation deployment: source `e0523e6cab49b09e910ba66f2ad18351f491d19a`, deployed descendant `a6db511e0bbd6be9038bbc63a06fb5e1702006d3`, Pages `34013867862`, main Live Smoke `34013888880`, Auth Password Security Live Smoke `34013888842` = SUCCESS; Issues #524/#545 remain physically pending.
- [x] Historical password-recovery initialization deployment: source `35cdf74b1c845ba61e46b86ec9e3c0e16e16eb72`, deployed descendant `d7dd3a550b9a0d583cd7f3269a357b0187377d50`, Pages `33975327442`, main Live Smoke `33975353656`, Auth Password Security Live Smoke `33975353718` = SUCCESS; physical retest remains pending due observed Auth email-rate limit.
- [x] Historical Edge-only referral-summary deployment: source `4e2e1789921aa6fd73b2677ac5def2bc35a8be73`, deployed descendant `aa470986589d83dd95b4efd6e4a4d68a9f55965d`, Pages `33898258213`, main Live Smoke `33898314400` = SUCCESS.
- [x] Historical pre-cutover referral-summary deployment: source `ea409cd02fc7744514b8c867a67f56ec0187de80`, deployed descendant `adbb23c4f373ebfe6ed1d78e71ec051a3c05ed7a`, Pages `33838629999`, main Live Smoke `33838665915` = SUCCESS.
- [x] Historical Product Event deployment: source `0bd5acfb9946e10ed5624205165123eabc8035b4`, deployed descendant `75f95dd95b0b480f3cf3ebb668d62f7cb45345ba`, Pages `33823701475`, main Live Smoke `33823746430`, Product Event API Live Smoke `33824058988` = SUCCESS in scope.
- [x] Historical referral/acquisition deployment: source `f401ad758e40914a10245cfab08497f7cdb99f7d`, deployed descendant `02540bb61c3c62de4cfba34e92a876503765847d`, Pages `33811511793`, Referral acquisition regression `33811512053` = SUCCESS in scope.
- [x] Historical Auth password-security deployment: source `6cd98bf2a2020b86fe2ab05e263dd59f7e4fb387`, deployed descendant `0cc3ec3ef4dda18f0d8e083d8ca0992ef77f844c`, Pages `33229525995`, Auth Password Security Live Smoke `33229548182`, main Live Smoke `33229548190` = SUCCESS in scope.
- [x] Historical PR #201 public-form deployment: source `a60318b432598e2eb82e71dcf1a9ec804ff1c4b2`, merged/deployed SHA `00bdcb7f432d542b732cf355336e9f08798e4320`, Pages `32802440796`, corresponding Live Smoke `32802473505` = SUCCESS.

## Physical / Device acceptance
- [x] OPPO Reno13 5G / Android 16 / installed standalone PWA — scoped Issues #592/#593 fresh affected-device regression PASS/CLOSED on 2026-09-10; Preference Surprise one-tap flow and Nearby Location-success terminal-state behavior accepted for that device scope only.
- [x] OPPO Reno13 5G / Android 16 / installed standalone PWA — scoped TC-05 History and TC-06 Favorite accepted on 2026-09-10 continuation; does not complete device matrix.
- [x] OPPO Reno13 5G / Android 16 / installed standalone PWA — Issue #551 scoped Home-nav physical PASS/CLOSED.
- [x] OPPO Reno13 5G / Android 16 / installed standalone PWA — Issue #552 / TC-03 scoped fresh affected-device physical PASS/CLOSED on 2026-09-08.
- [x] OPPO Reno13 5G / Android 16 / installed standalone PWA — TC-08 fresh Location Allow scoped physical PASS on 2026-09-08 after permission reset/prompt/grant and successful retry acquisition; TC-10 Maps path revalidated in same continuation.
- [x] OPPO Reno13 5G / Android 16 / installed standalone PWA — fresh Favorite + accepted History persisted across full Recent Apps close/reopen; local 2-person Group flow covered state isolation, result/reroll, History handoff, Android Share Sheet cancel recovery and clean Home recovery after restart on 2026-09-08.
- [ ] Issue #635 assistive-technology/keyboard acceptance for bottom-navigation current-state semantics remains separate from deployment evidence; current deployment does not itself establish VoiceOver/TalkBack/keyboard Physical PASS.
- [ ] Issue #524 affected-iPhone Maps fallback retest remains PENDING / NOT PASS / NOT FAIL.
- [ ] Issue #545 affected-iPhone location-deny remediation retest remains PENDING / NOT PASS / NOT FAIL.
- [x] NF-09 scoped iPhone/VoiceOver physical PASS on deployed PR #201/v16; does not create current Issue #635 or other-device PASS.
- [x] Keyboard Focus scoped physical PASS on Lenovo 83DV / Windows 11 / Chrome 152.0.7977.82.
- [x] Reduced Motion scoped physical PASS on OPPO Reno13 5G / Android 16 / Chrome 152.0.7977.64.
- [x] NF-07 scoped v15→v16 PWA upgrade PASS on OPPO Reno13 5G / Android 16 / Chrome 152.0.7977.64.
- [x] Product Event scoped physical QA PASS on OPPO Reno13 5G / Android 16 / Chrome 152.0.7977.64; not real-user traction.
- [x] Referral-summary signed-in `EDGE` scoped physical PASS on OPPO Reno13 5G / Android 16 / Chrome 152.0.7977.64; not referral conversion.
- [x] Public Feedback + Partner form scoped physical PASS on OPPO Reno13 5G / Android 16 / Chrome 152.0.7977.64.
- [x] Auth recovery/password-update/sign-in/new-signup/email-confirmation scoped physical PASS on OPPO Reno13 5G / Android 16 / Chrome 152.0.7977.64.
- [ ] Android Chrome ≥3 distinct device models still incomplete.
- [ ] iPhone Safari ≥2 distinct device models still incomplete.
- [ ] iPadOS target remains pending if required by Beta scope.

## Backend / Security / Operations
- [x] Group API v7 source/deployment parity and scoped rejection-event ingestion verified.
- [x] Partner API v15 source/deployment parity and rejection-only live probe verified.
- [x] Main repository governance enforced through required checks/ruleset evidence.
- [x] Referral-summary Edge-only browser cutover deployed before RPC execute revocation; post-cutover browser-role execute/grant checks are negative.
- [x] Product Event schema/function deployment and controlled-ingress evidence verified in scope.
- [x] Referral/acquisition schema and referral-code privacy migration deployed.
- [ ] Supabase leaked-password protection remains **BLOCKED BY VERIFIED FREE PLAN / CONFIGURATION — NOT PASS** — Issue #372.
- [ ] Group API monitoring baseline/owner/alert channel/escalation/actual alert delivery remain incomplete.
- [ ] Group API retention period + cleanup verification remain unapproved/incomplete.
- [ ] Complete Group API anonymous abuse controls remain incomplete.
- [ ] Partner API monitoring/retention/complete abuse controls remain incomplete.
- [ ] Real rollback/restore/recovery drill evidence remains incomplete.

## Public Beta gate
- [ ] Public Beta remains **NOT COMPLETE**.
- [ ] Remaining device-matrix coverage must be satisfied with real-device evidence.
- [ ] Blocker/Critical closure must be supported by release-scoped defect evidence; CI/synthetic-only absence of reports is not enough.
- [ ] Issue #635 accessibility remediation requires any assistive-technology/device acceptance specified by the physical QA matrix; deployment evidence alone does not close it.
- [ ] Issues #524/#545 affected-iPhone paths remain pending.
- [ ] Weak/leaked-password rejection/protection remains open and cannot be inferred from successful account flows.

## Commercial / Production gate
- [ ] Commercial launch remains **NO-GO**.
- [ ] ห้ามเปิดรับเงินจริง จนกว่า payment/provider/merchant lifecycle, Privacy/Legal, production monitoring/rollback and business/partner requirements have real approved evidence.
- [ ] Production Privacy/Terms/controller/contact/retention/user-rights decisions remain incomplete.
- [ ] Payment/Premium provider and real subscribe/renew/cancel/failure/reconciliation evidence remain incomplete.
- [ ] Real restaurant/affiliate partner agreement/reconciliation evidence remains incomplete.
- [ ] Production monitoring/incident owner/on-call and rollback/restore drill evidence remain incomplete.

ห้ามทำเครื่องหมาย PASS จาก static review, CI, synthetic monitoring, source markers หรือ deployment แทน real-device/production/business evidence ที่รายการนั้นต้องการ