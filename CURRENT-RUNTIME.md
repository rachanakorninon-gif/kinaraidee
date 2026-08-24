# Kinaraidee — Current Browser/PWA Runtime

This file is the canonical declaration for the browser/PWA runtime candidate. It is intentionally small so release workflows can validate runtime lineage without rewriting historical evidence.

- Current browser/PWA runtime candidate: `e5c19d048ae556153ebe66bdb4598ab0d168da97`
- PWA cache marker: `kinaraidee-beta-v14`
- Runtime change: member authentication/reset hardening — public member/reset pages use the Supabase-aligned 8-character minimum, no longer expose raw Supabase `error.message`, reset returns to `member.html`, and the clean Pages artifact/runtime lineage/Live Smoke contracts include both auth pages while keeping owner/admin pages private
- Deployment status: **PASS FOR CURRENT BROWSER/PWA DEPLOYMENT TRACE**
- Runtime merge/deployed SHA: `b6300e5458f17195c72a72ffa7ed0000fee40e24`
- Verified evidence-only deployed descendant SHA: `4314f622964c271d3fb8bcc56152be1c35565256`
- Latest repository evidence-only merge descendant: `a006a0462a870d44991b833b79930bc7396216db` (PR #169); compare from PR #168 merge `cf146f2c582a92d4a2a8972eaf8f2effcaccf880` to this merge changes only `CURRENT-RUNTIME.md`, so no browser/PWA runtime asset is superseded and this SHA is not promoted to the public deployment SHA without matching Pages + Live Smoke evidence
- PR #169 head `92e7dcfcdc53f9969ba8844d040f4bf9f64065b8` completed the relevant pull-request regression suite successfully, including Release Consistency, Release Baseline Regression, Beta QA, Beta integrity, Security Hygiene, Runtime Lineage, Real Device Contract, Release Metadata, Governance Required Checks, Commercial Release Checklist Consistency, PWA Cache Upgrade, iOS Install Hint, Surprise Accessibility, Group Result, Credential Scanner and History Sync; this is repository CI evidence only
- GitHub Pages run: `32739427482` — completed `success` for the verified evidence-only deployed descendant
- Corresponding Live Smoke run: `32739515806` — completed `success` on the same evidence-only descendant SHA
- Read-only diagnostic run: `32739705572` — confirmed exact Pages/Live Smoke run metadata and public-site state; temporary PR #167 was closed without merge
- Live public `release-meta.json` SHA = `4314f622964c271d3fb8bcc56152be1c35565256` with Service Worker cache `kinaraidee-beta-v14`
- The compare from runtime merge `b6300e5458f17195c72a72ffa7ed0000fee40e24` to deployed descendant `4314f622964c271d3fb8bcc56152be1c35565256` contains only workflow/release-evidence files; no browser/PWA runtime asset changed
- Live verification confirmed public `member.html` / `reset-password.html` use the 8-character minimum, do not expose raw Supabase `error.message`, reset returns to `member.html`, and public `admin.html` returned HTTP 404
- The Service Worker shell/cache marker remains v14 because no Service Worker/app-shell runtime change occurred
- Prior verified v14 deployment evidence remains historical and is not reused as current PASS except where the evidence-only descendant is explicitly verified as runtime-equivalent
- Public Beta is still **NOT COMPLETE**

## Evidence boundary

`PASS FOR CURRENT BROWSER/PWA DEPLOYMENT TRACE` is scoped to the merged-main GitHub Pages deployment lineage, public release metadata/assets and corresponding automated Live Smoke. `Runtime merge/deployed SHA` identifies the runtime-changing merge expected by cross-document release guards; the separately recorded evidence-only deployed descendant identifies the current verified public release metadata without creating a newer browser/PWA runtime candidate. A later evidence-only repository merge such as PR #169 may be recorded as lineage/CI evidence but must not be treated as the current public deployment SHA until a matching Pages + Live Smoke trace is verified.

It does **not** imply real keyboard/device interaction PASS, reduced-motion behavior on a physical platform, TalkBack/VoiceOver NF-09, NF-05/NF-07, the full Android/iPhone matrix, full Public Beta acceptance, payment/partner/legal readiness, leaked-password protection PASS or Commercial GO.
