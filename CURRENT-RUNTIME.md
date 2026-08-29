# Kinaraidee — Current Browser/PWA Runtime

This file is the canonical declaration for the browser/PWA runtime candidate. It is intentionally small so release workflows can validate runtime lineage without rewriting historical evidence.

- Current browser/PWA runtime candidate: `f3ff4f5f7a903480cdb9d5001eef631ecf727497`
- PWA cache marker: `kinaraidee-beta-v16`
- Runtime change: add a truthful PRE-LAUNCH “3,000 Premium” campaign banner to Home via `data/home-surprise.js`. The campaign advertises the planned iPhone 17 Pro Max 256GB prize and target of 3,000 eligible paid Premium members, while explicitly keeping prize-entry counting disabled until real Premium/payment/legal gates are ready. The Service Worker remains on v16 and the campaign detail page is not promoted into the offline app shell in this candidate.
- Deployment status: **PENDING FOR CURRENT RUNTIME DEPLOYMENT**
- Current runtime deployment evidence is pending. This PR has source/CI evidence only until the exact merged-main descendant is deployed by GitHub Pages and the corresponding live checks succeed; no deployed PASS is claimed for the campaign banner yet.
- Historical runtime merge/deployed SHA: `00bdcb7f432d542b732cf355336e9f08798e4320` (PR #201 merged).
- Historical GitHub Pages run: `32802440796`.
- Historical GitHub Pages run `32802440796` completed **success** for exact merged-main SHA `00bdcb7f432d542b732cf355336e9f08798e4320`.
- Historical corresponding Live Smoke run: `32802473505`.
- Historical corresponding Live Smoke run `32802473505` completed **success** after that Pages deployment. This remains v16 evidence for the prior deployed runtime and does not prove the new campaign banner is live.
- Latest verified evidence-only deployed descendant before this pending runtime candidate: `5489cbbdc9ff618f1d32fa438ef91476dd350768` (PR #215 merge). Pages run `32843512340` completed **success** for that SHA and corresponding Live Smoke run `32843553479` completed **success**. PR #215 changes the Pages diagnostic predeploy contract only and does not prove this pending campaign runtime.
- Read-only diagnostic run: `32752782165`.
- Read-only diagnostic run `32752782165` is historical PR #179 diagnostic evidence only; no new diagnostic result is invented for this pending runtime.
- Public Form Resilience Regression run `32802440775` completed **success** on the prior PR #201 merged-main SHA. This validates source recovery-state contracts only; it does not validate the pending campaign runtime.
- Physical Android post-v16 Favorite/History restart evidence remains scoped PASS for the tested installed-PWA session: the fresh favorite remained after the user fully closed the installed PWA from Recent Apps and reopened it without clearing data. Issue #177 is closed **completed** for that tested Android session.
- Physical iPhone/Safari Location #171 and NF-05 evidence remain scoped PASS for the tested iPhone session family.
- Physical iPhone/VoiceOver NF-09 acceptance on 2026-08-26 remains **PASS for the tested session** on deployed PR #201/v16. That historical evidence is not reused as campaign UI acceptance.
- Prior verified deployment evidence remains historical and is not reused as current PASS beyond the exact scoped lineage/support explicitly identified here.
- Prior physical-device evidence remains scoped historical/current evidence only for the exact behaviors tested. It does not validate the new campaign banner, real Feedback/Partner form submission behavior, Premium payment, prize eligibility, or campaign conversion.
- Public Beta is still **NOT COMPLETE**

## Evidence boundary

The current pending candidate adds only the PRE-LAUNCH campaign surface to the existing Home runtime while deliberately preserving the current v16 Service Worker contract. The new campaign page itself is a normal network-first navigation and is not claimed as a new offline-shell generation. Campaign entry is disabled: there is no real paid Premium entitlement, no prize-entry count, no winner selection, and no commercial/payment GO created by this change.

Current runtime deployment evidence is pending. Source and CI success may establish that the declared candidate is internally consistent, but it does not establish that GitHub Pages has deployed the exact merged-main descendant or that the public URL has passed live smoke checks. Those deployment facts must be captured after merge and must not be inferred from the historical v16 runs above.

The historical diagnostic run is retained only because release-metadata regression contracts require an explicit diagnostic evidence field for a prior PASS state. It is historical PR #179 evidence and does not prove the campaign runtime or create a fresh diagnostic result.

Existing physical-device evidence remains valid only for the exact earlier behaviors and sessions recorded. It does not imply campaign UI acceptance, Android TalkBack or second-device PASS, full Public Beta acceptance, payment/partner/legal readiness, leaked-password protection PASS, Commercial GO, prize eligibility, user/device totals, conversion, payment, revenue, or giveaway participation.