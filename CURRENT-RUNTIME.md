# Kinaraidee — Current Browser/PWA Runtime

This file is the canonical declaration for the browser/PWA runtime candidate. It is intentionally small so release workflows can validate runtime lineage without rewriting historical evidence.

- Current browser/PWA runtime candidate: `a7ca994be76541af57b224c57f267843113df941`
- Runtime merge/deployed SHA: `1d21613c3c7d3e62ed8f7e5c3f00700606129c58`
- PWA cache marker: `kinaraidee-beta-v16`
- Runtime change: member-history restart durability hardening after physical Android v15 retest. `data/member-sync.js` records member liked/picked actions in a durable localStorage outbox before cloud reconciliation, keeps cloud snapshots from replacing local history while durable/in-flight writes remain, retries pending writes after restart/online recovery, and deduplicates recent server rows before retry. `data/home-surprise.js` starts member sync early from the directly loaded home helper. Service Worker cache is bumped because both helpers are app-shell assets.
- Deployment status: **PASS FOR CURRENT BROWSER/PWA DEPLOYMENT TRACE**
- Pages workflow run `32752667752` completed **success** for exact merged-main SHA `1d21613c3c7d3e62ed8f7e5c3f00700606129c58`.
- Corresponding Live Smoke run `32752716631` completed **success** on the same SHA.
- Read-only diagnostic PR #180 verified public `release-meta.json` matched the exact SHA and `kinaraidee-beta-v16`, live Service Worker used v16 and included member/home helpers, live `member-sync.js` contained the durable outbox/cloud-snapshot guard/online retry, and live `home-surprise.js` contained early member-sync bootstrap. PR #180 was closed without merge.
- Physical Android post-v15 evidence on 2026-08-24 verified the Favorite/History visual differentiation fix (#172), but the same restart exposed persistence defect #177. The v16 deployment evidence above does **not** close #177; a physical Android favorite → full restart → History retention retest is still required.
- iPhone Location issue #171 remains open and independent of this member-history fix.
- Public Beta is still **NOT COMPLETE**

## Evidence boundary

`PASS FOR CURRENT BROWSER/PWA DEPLOYMENT TRACE` means the merged-main GitHub Pages deployment, public release metadata, live Service Worker v16 marker and relevant live assets were verified for the current runtime.

It does **not** imply Issue #177 device PASS, iPhone Location PASS, real keyboard interaction PASS, reduced-motion behavior on a physical platform, TalkBack/VoiceOver NF-09, NF-05/NF-07, the full Android/iPhone matrix, full Public Beta acceptance, payment/partner/legal readiness, leaked-password protection PASS or Commercial GO.
