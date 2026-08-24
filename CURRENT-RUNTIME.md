# Kinaraidee — Current Browser/PWA Runtime

This file is the canonical declaration for the browser/PWA runtime candidate. It is intentionally small so release workflows can validate runtime lineage without rewriting historical evidence.

- Current browser/PWA runtime candidate: `a7ca994be76541af57b224c57f267843113df941`
- PWA cache marker: `kinaraidee-beta-v16`
- Runtime change: member-history restart durability hardening after physical Android v15 retest. `data/member-sync.js` now records member liked/picked actions in a durable localStorage outbox before cloud reconciliation, keeps cloud snapshots from replacing local history while durable/in-flight writes remain, retries pending writes after restart/online recovery, and deduplicates recent server rows before retry. `data/home-surprise.js` starts member sync as early as the directly loaded home helper can so member actions are wrapped before the common immediate-Surprise path. Service Worker cache is bumped because both helpers are app-shell assets.
- Deployment status: **PENDING FOR CURRENT RUNTIME DEPLOYMENT**
- Current runtime deployment evidence is pending. Do not reuse v15 Pages/Live Smoke run IDs, public metadata or device observations as deployment PASS for this v16 candidate.
- Prior verified deployment evidence remains historical and is not reused as current PASS. The latest verified browser/PWA deployment is v15 runtime merge `367162286d1e1452151df11dca805ed629bb5466`, Pages run `32748690413`, Live Smoke run `32748752875`, diagnostic run `32749016604`.
- Physical Android post-v15 evidence on 2026-08-24 verified the Favorite/History visual differentiation fix (#172) after fully restarting the installed PWA: heading `เมนูโปรด / ประวัติ`, summary counts, and explicit Favorite/accepted badges rendered. In the same update-boundary session, a freshly liked `ข้าวกะเพราหมูสับ` visible before restart disappeared after reopening; that persistence regression is tracked in #177 and is the defect addressed by this v16 candidate.
- The v16 cache bump is required because `data/member-sync.js` and `data/home-surprise.js` are app-shell assets.
- iPhone Location issue #171 remains open and is independent of this member-history fix.
- Public Beta is still **NOT COMPLETE**

## Evidence boundary

`PENDING FOR CURRENT RUNTIME DEPLOYMENT` means the source/runtime candidate and cache generation are declared, but the merged-main GitHub Pages deployment, public `release-meta.json`, live Service Worker v16 marker and corresponding Live Smoke have not yet been verified for this candidate.

It does **not** imply Issue #177 device PASS, iPhone Location PASS, real keyboard interaction PASS, reduced-motion behavior on a physical platform, TalkBack/VoiceOver NF-09, NF-05/NF-07, the full Android/iPhone matrix, full Public Beta acceptance, payment/partner/legal readiness, leaked-password protection PASS or Commercial GO.
