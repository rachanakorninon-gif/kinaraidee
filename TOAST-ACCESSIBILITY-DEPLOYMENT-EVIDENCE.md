# Toast Accessibility — Deployment Evidence

## Scope

This record reconciles the deployed browser/PWA lineage for Issue #585, including the core toast runtime in PR #623 and the offline/PWA app-shell parity follow-up in PR #627. It is deployment evidence only and must not be promoted to assistive-technology Physical PASS.

## Source and deployment lineage

- Issue: #585 — `A11y: announce toast validation and confirmation messages`
- PR: #623 — `fix(a11y): announce ordinary toast feedback reliably`
- Source candidate: `f9b5f137375e9d30d1053d9cad814d636cb88821`
- Merged/deployed main SHA: `11c27167965c63ba60218d6ec216e503b334b4ca`
- PWA cache marker: `kinaraidee-beta-v16`

## Exact deployment checks

- GitHub Pages run `34571331729`: **SUCCESS**
- Kinaraidee Live Smoke run `34571373301`: **SUCCESS**
- Auth Password Security Live Smoke run `34571373282`: **SUCCESS**
- Campaign 3000 Premium Live Smoke run `34571373303`: **SUCCESS**

The exact merged-main SHA also completed the triggered post-merge check set without a recorded failure in the verified snapshot.

## Implemented source contract

- Ordinary `#toast` feedback is exposed as a polite atomic status live region.
- Repeated identical toast text is cleared and announced again on a fresh animation frame.
- Existing visible toast timing remains 2200 ms.
- Toast announcements do not move keyboard focus.
- Meal/Budget validation and Favorite/save/share/Nearby confirmation/progress messages continue using the ordinary toast surface.
- The Surprise-specific busy live region remains separate and is not duplicated by the ordinary-toast controller.
- Existing navigation, recommendation, history, share, Nearby, analytics and PWA behavior remain protected by the repository regression suite.

## Offline/PWA app-shell parity follow-up

- Follow-up PR: #627 — `fix(pwa): preserve toast accessibility in offline app shell`
- Follow-up source candidate: `0b6352af081f51ad9df2343022d0683b109d93a4`
- Merged/deployed main SHA: `af329c471c0335fd6e0812a8d5f75066ffb335cd`
- PWA cache marker: `kinaraidee-beta-v16` (unchanged)
- GitHub Pages run `34676035335`: **SUCCESS**
- Kinaraidee Live Smoke run `34676056521`: **SUCCESS**
- Auth Password Security Live Smoke run `34676056466`: **SUCCESS**
- Campaign 3000 Premium Live Smoke run `34676056536`: **SUCCESS**
- Toast Accessibility Live Smoke run `34676056553`: **SUCCESS**
- Premium Research Preview Live Smoke run `34676056518`: **SUCCESS**

The dedicated Toast Accessibility Live Smoke checked the deployed `data/toast-accessibility.js`, polite atomic status semantics, repeated-message controller marker, absence of focus movement, Service Worker `SHELL` inclusion, cache marker parity, and exact equality between public `release-meta.json` SHA and the successful Pages head SHA `af329c471c0335fd6e0812a8d5f75066ffb335cd` / run `34676035335`.

Current deployment PASS is scoped to the browser/PWA static deployment trace and live source markers only. It does not create or broaden VoiceOver/TalkBack/keyboard Physical PASS, another-device PASS, complete accessibility conformance, Public Beta completion, or Commercial GO.

## Evidence boundary

This deployment trace proves only that the reviewed Issue #585 source reached the live browser/PWA deployment and the listed exact-lineage checks succeeded. It does **not** prove VoiceOver, TalkBack, hardware-keyboard Physical PASS, another-device PASS, complete accessibility conformance, Issues #524/#545, Public Beta completion, Privacy/Legal approval, Payment/Premium readiness, user/conversion/payment/partner/revenue evidence, or Commercial GO. Any required assistive-technology acceptance must be captured separately on the deployed runtime and scoped to the tested device/session.
