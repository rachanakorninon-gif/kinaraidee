# Kinaraidee — Current Browser/PWA Runtime

This file is the canonical declaration for the browser/PWA runtime candidate. It is intentionally small so release workflows can validate runtime lineage without rewriting historical evidence.

- Current browser/PWA runtime candidate: `1d424bf27142deb3c27f6b8ce3208f35a27a2cd0`
- PWA cache marker: `kinaraidee-beta-v16`
- Runtime change: Issue #635 accessibility remediation for the persistent bottom navigation. The active core SPA destination now exposes exactly one `aria-current="page"` state and a visible high-contrast current-state hook. Home is current on initial load; Meal/People/Budget/Preference/Loading/Result map to เลือกเมนู; History maps to ประวัติ. Synchronization runs after the existing `show(id)` activation path and does not move focus or add a live-region announcement. The change reuses `data/toast-accessibility.js`; the PWA cache generation remains `kinaraidee-beta-v16`.
- Deployment status: **PENDING FOR CURRENT RUNTIME DEPLOYMENT**
- Runtime merge/deployed SHA: **PENDING**
- Last verified deployed browser/PWA descendant: `af329c471c0335fd6e0812a8d5f75066ffb335cd`.
- Current runtime deployment evidence is pending. Source/static/CI evidence for candidate `1d424bf27142deb3c27f6b8ce3208f35a27a2cd0` must not be treated as deployment, assistive-technology, keyboard, or Physical PASS.
- The last verified deployed browser/PWA trace remains Issue #585 PR #627: source candidate `0b6352af081f51ad9df2343022d0683b109d93a4`, merged/deployed as `af329c471c0335fd6e0812a8d5f75066ffb335cd`; GitHub Pages run `34676035335`, Kinaraidee Live Smoke run `34676056521`, Auth Password Security Live Smoke run `34676056466`, Campaign 3000 Premium Live Smoke run `34676056536`, Toast Accessibility Live Smoke run `34676056553`, and Premium Research Preview Live Smoke run `34676056518` completed successfully on that exact deployed SHA.
- The previous Issue #585 core toast trace remains historical verified evidence only: source `f9b5f137375e9d30d1053d9cad814d636cb88821`, merged/deployed through PR #623 as `11c27167965c63ba60218d6ec216e503b334b4ca`.
- The previous Issue #584 focus-management trace remains historical verified evidence only: source `bde1bfed79696f6982852ca67d3ee4c8120c0c54`, merged/deployed as `2896748584a1058e9ba1bbc939f49f3b6faf4baf`.
- Issues #592 and #593 retain their separate scoped Physical PASS / CLOSED evidence on the recorded OPPO Reno13 5G / Android 16 installed-PWA sessions. Those observations do not broaden to other devices or flows.
- Physical verification of Issue #524 Maps fallback remains **PENDING / NOT PASS / NOT FAIL** for the affected traced iPhone 15 Pro Max scope.
- Physical verification of Issue #545 location-deny remediation remains **PENDING / NOT PASS / NOT FAIL** for the affected iPhone scope.
- Supabase `auth_leaked_password_protection` remains OPEN and is not affected by this runtime candidate.
- Historical Auth/public-form/Reduced-Motion/Keyboard-Focus/VoiceOver, Favorite/History, referral/security, monitoring and device evidence retain only their recorded scope and are not generalized by this runtime candidate.
- Public Beta is still **NOT COMPLETE**

## Evidence boundary

The current browser/PWA runtime candidate `1d424bf27142deb3c27f6b8ce3208f35a27a2cd0` is **not yet verified deployed**. It establishes a source/static/CI candidate for Issue #635 bottom-navigation current-state semantics only. The last verified deployed browser/PWA descendant remains `af329c471c0335fd6e0812a8d5f75066ffb335cd` from the prior Issue #585 PR #627 trace. This pending runtime cannot become Deployment PASS until it is merged and an exact descendant Pages deployment plus corresponding live checks succeeds.

Source/static/CI evidence cannot substitute for VoiceOver/TalkBack/keyboard Physical PASS, another-device PASS, the remaining Android/iPhone device matrix, affected-iPhone Issues #524/#545, Product Event real-user acceptance, Privacy/Legal approval, Payment/Premium readiness, or Commercial GO. Campaign 3,000 remains PRE-LAUNCH. Paid acquisition remains NOT LAUNCHED. Premium is not approved/active. Public Beta remains NOT COMPLETE.
