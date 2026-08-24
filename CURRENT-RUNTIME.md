# Kinaraidee — Current Browser/PWA Runtime

This file is the canonical declaration for the browser/PWA runtime candidate. It is intentionally small so release workflows can validate runtime lineage without rewriting historical evidence.

- Current browser/PWA runtime candidate: `e5c19d048ae556153ebe66bdb4598ab0d168da97`
- PWA cache marker: `kinaraidee-beta-v14`
- Runtime change: member authentication/reset hardening — public member/reset pages use the Supabase-aligned 8-character minimum, no longer expose raw Supabase `error.message`, reset returns to `member.html`, and the clean Pages artifact/runtime lineage/Live Smoke contracts now include both auth pages while keeping owner/admin pages private
- Deployment status: **PENDING FOR CURRENT RUNTIME DEPLOYMENT**
- Current runtime deployment evidence is pending; no Pages or Live Smoke run is promoted to PASS for this candidate yet
- Prior verified v14 deployment evidence remains historical and is not reused as current PASS: original Pages `32673914310` + Live Smoke `32673939090` on `e30aa999f6277b221bf8dae85aa3b23521ad6f06`, plus later evidence-only descendant checks
- The Service Worker shell/cache marker remains v14 because this candidate does not change `sw.js` or the cached app shell
- Public Beta is still **NOT COMPLETE**

## Evidence boundary

`PENDING FOR CURRENT RUNTIME DEPLOYMENT` means source/CI/runtime-lineage preparation exists, but this candidate is not yet allowed to inherit the prior v14 deployment PASS.

A future `PASS FOR CURRENT BROWSER/PWA DEPLOYMENT TRACE` requires a successful GitHub Pages deployment and corresponding Live Smoke evidence that verifies the public `member.html` / `reset-password.html` contracts, release metadata, existing v14 PWA runtime, and non-public owner/admin paths on the same deployed lineage.

That automated deployment PASS, when obtained, does **not** imply real keyboard/device interaction PASS, reduced-motion behavior on a physical platform, TalkBack/VoiceOver NF-09, NF-05/NF-07, the full Android/iPhone matrix, full Public Beta acceptance, payment/partner/legal readiness or Commercial GO.
