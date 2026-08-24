# Kinaraidee — Current Browser/PWA Runtime

This file is the canonical declaration for the browser/PWA runtime candidate. It is intentionally small so release workflows can validate runtime lineage without rewriting historical evidence.

- Current browser/PWA runtime candidate: `e5c19d048ae556153ebe66bdb4598ab0d168da97`
- PWA cache marker: `kinaraidee-beta-v14`
- Runtime change: member authentication/reset hardening — public member/reset pages use the Supabase-aligned 8-character minimum, no longer expose raw Supabase `error.message`, reset returns to `member.html`, and the clean Pages artifact/runtime lineage/Live Smoke contracts include both auth pages while keeping owner/admin pages private
- Deployment status: **PASS FOR CURRENT BROWSER/PWA DEPLOYMENT TRACE**
- Runtime merge SHA: `b6300e5458f17195c72a72ffa7ed0000fee40e24`
- Verified evidence-only deployed descendant SHA: `4314f622964c271d3fb8bcc56152be1c35565256`
- GitHub Pages run for the evidence-only descendant: `32739427482` — completed `success` on exact SHA
- Corresponding Live Smoke run: `32739515806` — completed `success` on the same SHA
- Read-only diagnostic run: `32739705572` — confirmed exact Pages/Live Smoke run metadata and public-site state; temporary PR #167 was closed without merge
- Live public `release-meta.json` SHA = `4314f622964c271d3fb8bcc56152be1c35565256` with Service Worker cache `kinaraidee-beta-v14`
- The compare from runtime merge `b6300e5458f17195c72a72ffa7ed0000fee40e24` to deployed descendant `4314f622964c271d3fb8bcc56152be1c35565256` contains only workflow/release-evidence files; no browser/PWA runtime asset changed
- Live verification confirmed public `member.html` / `reset-password.html` use the 8-character minimum, do not expose raw Supabase `error.message`, reset returns to `member.html`, and public `admin.html` returned HTTP 404
- The Service Worker shell/cache marker remains v14 because no Service Worker/app-shell runtime change occurred
- Public Beta is still **NOT COMPLETE**

## Evidence boundary

`PASS FOR CURRENT BROWSER/PWA DEPLOYMENT TRACE` is scoped to the merged-main GitHub Pages deployment lineage, public release metadata/assets and corresponding automated Live Smoke. An evidence-only deployed descendant does not create a newer browser/PWA runtime candidate.

It does **not** imply real keyboard/device interaction PASS, reduced-motion behavior on a physical platform, TalkBack/VoiceOver NF-09, NF-05/NF-07, the full Android/iPhone matrix, full Public Beta acceptance, payment/partner/legal readiness, leaked-password protection PASS or Commercial GO.
