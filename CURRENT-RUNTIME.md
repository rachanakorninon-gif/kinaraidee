# Kinaraidee — Current Browser/PWA Runtime

This file is the canonical declaration for the browser/PWA runtime candidate. It is intentionally small so release workflows can validate runtime lineage without rewriting historical evidence.

- Current browser/PWA runtime candidate: `e5c19d048ae556153ebe66bdb4598ab0d168da97`
- PWA cache marker: `kinaraidee-beta-v14`
- Runtime change: member authentication/reset hardening — public member/reset pages use the Supabase-aligned 8-character minimum, no longer expose raw Supabase `error.message`, reset returns to `member.html`, and the clean Pages artifact/runtime lineage/Live Smoke contracts include both auth pages while keeping owner/admin pages private
- Deployment status: **PASS FOR CURRENT BROWSER/PWA DEPLOYMENT TRACE**
- Runtime merge/deployed SHA: `b6300e5458f17195c72a72ffa7ed0000fee40e24`
- GitHub Pages run: `32737240239` — completed `success` on exact deployed SHA
- Corresponding Live Smoke run: `32737301309` — completed `success` on the same SHA
- Read-only diagnostic run: `32738157335` — confirmed exact Pages/Live Smoke run metadata and public-site state; temporary PR #165 was closed without merge
- Live public `release-meta.json` SHA = `b6300e5458f17195c72a72ffa7ed0000fee40e24` with Service Worker cache `kinaraidee-beta-v14`
- Live verification confirmed public `member.html` / `reset-password.html` use the 8-character minimum, do not expose raw Supabase `error.message`, reset returns to `member.html`, and public `admin.html` returned HTTP 404
- The Service Worker shell/cache marker remains v14 because this runtime change does not modify `sw.js` or the cached app shell
- Prior verified v14 deployment evidence remains historical and is not reused as the current deployment proof
- Public Beta is still **NOT COMPLETE**

## Evidence boundary

`PASS FOR CURRENT BROWSER/PWA DEPLOYMENT TRACE` is scoped to the merged-main GitHub Pages deployment, public release metadata/assets and corresponding automated Live Smoke for this runtime lineage.

It does **not** imply real keyboard/device interaction PASS, reduced-motion behavior on a physical platform, TalkBack/VoiceOver NF-09, NF-05/NF-07, the full Android/iPhone matrix, full Public Beta acceptance, payment/partner/legal readiness, leaked-password protection PASS or Commercial GO.
