# Kinaraidee — Current Browser/PWA Runtime

This file is the canonical declaration for the browser/PWA runtime candidate. It is intentionally small so release workflows can validate runtime lineage without rewriting historical evidence.

- Current browser/PWA runtime candidate: `a7ca994be76541af57b224c57f267843113df941`
- Runtime merge/deployed SHA: `1d21613c3c7d3e62ed8f7e5c3f00700606129c58`
- PWA cache marker: `kinaraidee-beta-v16`
- Runtime change: member-history restart durability hardening after physical Android v15 retest. `data/member-sync.js` records member liked/picked actions in a durable localStorage outbox before cloud reconciliation, keeps cloud snapshots from replacing local history while durable/in-flight writes remain, retries pending writes after restart/online recovery, and deduplicates recent server rows before retry. `data/home-surprise.js` starts member sync early from the directly loaded home helper. Service Worker cache is bumped because both helpers are app-shell assets.
- Deployment status: **PASS FOR CURRENT BROWSER/PWA DEPLOYMENT TRACE**
- GitHub Pages run: `32752667752` — **success** for exact merged-main SHA `1d21613c3c7d3e62ed8f7e5c3f00700606129c58`.
- Corresponding Live Smoke run: `32752716631` — **success** on the same deployed SHA.
- Read-only diagnostic run: `32752782165` — **success** on temporary PR #180; the PR was closed without merge after evidence capture.
- Public `release-meta.json` matched `1d21613c3c7d3e62ed8f7e5c3f00700606129c58` and `kinaraidee-beta-v16`.
- Live `sw.js` used v16 and included `data/member-sync.js` plus `data/home-surprise.js`; live member sync contained the durable outbox/cloud-snapshot guard/online retry and the home helper contained early member-sync bootstrap.
- Prior verified deployment evidence remains historical and is not reused as current PASS. The prior verified browser/PWA deployment was v15 runtime merge `367162286d1e1452151df11dca805ed629bb5466`, Pages `32748690413`, Live Smoke `32748752875`, diagnostic `32749016604`.
- Physical Android post-v15 evidence verified Favorite/History visual differentiation (#172) but exposed restart persistence defect #177. A focused physical Android post-v16 retest on 2026-08-25 then created a new favorite, confirmed the count changed 4 → 5, fully closed the installed PWA from Recent Apps, reopened without clearing data, and confirmed the new favorite plus count 5 were retained. Issue #177 is closed **completed** for that tested Android session.
- iPhone Location issue #171 remains open and independent of this member-history fix.
- Public Beta is still **NOT COMPLETE**

## Evidence boundary

`PASS FOR CURRENT BROWSER/PWA DEPLOYMENT TRACE` means the merged-main GitHub Pages deployment, public release metadata, live Service Worker v16 marker and relevant live assets were verified for the current runtime. The additional Android evidence above is a separate physical-device PASS scoped only to Favorite/History visual differentiation and fresh-favorite retention across one full installed-PWA restart on the tested Android session.

It does **not** imply iPhone Location PASS, NF-07 old-cache acceptance, real keyboard interaction PASS, reduced-motion behavior on a physical platform, TalkBack/VoiceOver NF-09, NF-05, the full Android/iPhone matrix, full Public Beta acceptance, payment/partner/legal readiness, leaked-password protection PASS or Commercial GO.
