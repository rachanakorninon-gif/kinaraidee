# Toast Accessibility — Deployment Evidence

## Scope

This record reconciles the deployed browser/PWA lineage for Issue #585 across the core toast remediation (PR #623) and the installed/offline app-shell parity follow-up (PR #627). It is deployment evidence only and must not be promoted to assistive-technology Physical PASS.

## Current source and deployment lineage

- Issue: #585 — `A11y: announce toast validation and confirmation messages`
- Current PR: #627 — `fix(pwa): preserve toast accessibility in offline app shell`
- Current source candidate: `0b6352af081f51ad9df2343022d0683b109d93a4`
- Current merged/deployed main SHA: `af329c471c0335fd6e0812a8d5f75066ffb335cd`
- PWA cache marker: `kinaraidee-beta-v16`

## Current exact deployment checks

- GitHub Pages run `34676035335`: **SUCCESS**
- Toast Accessibility Live Smoke run `34676056553`: **SUCCESS**
- Kinaraidee Live Smoke run `34676056521`: **SUCCESS**
- Auth Password Security Live Smoke run `34676056466`: **SUCCESS**
- Campaign 3000 Premium Live Smoke run `34676056536`: **SUCCESS**
- Premium Research Preview Live Smoke run `34676056518`: **SUCCESS**

## Implemented source contract

- Ordinary `#toast` feedback remains a polite atomic status live region.
- Repeated identical toast text is cleared and announced again on a fresh animation frame.
- Existing visible toast timing remains 2200 ms.
- Toast announcements do not move keyboard focus.
- `data/toast-accessibility.js` is now included in the Service Worker `SHELL`, preserving the same toast accessibility controller for fresh installed/offline app-shell launches.
- Dedicated Toast Accessibility regression coverage guards both the live-region behavior and the Service Worker offline-shell parity contract.
- The Surprise-specific busy live region remains separate and is not duplicated by the ordinary-toast controller.
- The PWA cache generation remains `kinaraidee-beta-v16`.

## Historical core-toast deployment

- PR #623 — `fix(a11y): announce ordinary toast feedback reliably`
- Source candidate: `f9b5f137375e9d30d1053d9cad814d636cb88821`
- Merged/deployed main SHA: `11c27167965c63ba60218d6ec216e503b334b4ca`
- GitHub Pages `34571331729`, Kinaraidee Live Smoke `34571373301`, Auth Password Security Live Smoke `34571373282`, Campaign 3000 Premium Live Smoke `34571373303`, and Premium Research Preview Live Smoke `34571373350`: **SUCCESS** in that historical trace.

## Evidence boundary

The current PR #627 deployment trace proves only that the reviewed Issue #585 offline/PWA parity source reached the live browser/PWA deployment and the listed exact-lineage checks succeeded. It does **not** prove VoiceOver, TalkBack, hardware-keyboard Physical PASS, another-device PASS, complete accessibility conformance, Issues #524/#545, Public Beta completion, Privacy/Legal approval, Payment/Premium readiness, user/conversion/payment/partner/revenue evidence, or Commercial GO. Any required assistive-technology acceptance must be captured separately on the deployed runtime and scoped to the tested device/session.
