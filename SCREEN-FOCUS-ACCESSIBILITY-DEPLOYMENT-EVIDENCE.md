# Screen Focus Accessibility — Deployment Evidence

## Scope

This record reconciles the deployed browser/PWA lineage for Issue #584 / PR #614. It is deployment evidence only and must not be promoted to assistive-technology Physical PASS.

## Source and deployment lineage

- Issue: #584 — `A11y: manage focus when SPA screens change`
- PR: #614 — `fix(a11y): manage focus across SPA screens`
- Source candidate: `bde1bfed79696f6982852ca67d3ee4c8120c0c54`
- Merged/deployed main SHA: `2896748584a1058e9ba1bbc939f49f3b6faf4baf`
- PWA cache marker: `kinaraidee-beta-v16`

## Exact deployment checks

- GitHub Pages run `34560369925`: **SUCCESS**
- Kinaraidee Live Smoke run `34560396807`: **SUCCESS**
- Auth Password Security Live Smoke run `34560396831`: **SUCCESS**
- Campaign 3000 Premium Live Smoke run `34560396804`: **SUCCESS**

## Implemented source contract

- Core SPA destinations have deterministic programmatic focus targets.
- Programmatic non-interactive focus targets use `tabindex="-1"` and stay out of normal Tab order.
- Destination focus is applied after the target screen is active.
- Back/bottom-nav paths use the same screen-transition path rather than leaving focus in hidden content.
- The transient Loading screen intentionally does not steal focus from the existing Surprise busy live region; Result receives destination focus after recommendation completion.
- Existing visible focus styling and product behavior remain guarded by CI/regression coverage.

## Evidence boundary

This deployment trace proves only that the reviewed Issue #584 source reached the live browser/PWA deployment and the listed exact-lineage checks succeeded. It does **not** prove VoiceOver, TalkBack, hardware-keyboard Physical PASS, another-device PASS, complete accessibility conformance, Issues #524/#545, Public Beta completion, Privacy/Legal approval, Payment/Premium readiness, or Commercial GO. Any required assistive-technology acceptance must be captured separately on the deployed runtime and scoped to the tested device/session.
