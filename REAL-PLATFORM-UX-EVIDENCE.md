# Real Platform UX Evidence

Status: **PASS — REDUCED MOTION PASS / KEYBOARD FOCUS PASS**

Purpose: canonical physical-platform evidence record for the remaining Public Beta UX gates covering visible keyboard focus and reduced-motion behavior on the currently deployed Kinaraidee runtime.

This document must not be converted to PASS from source review, CI, screenshots without interaction trace, Pages, Live Smoke, browser emulation, or CSS/media-query inspection alone.

The two acceptance results are independent and may be exercised on different devices, operating systems, browsers/PWA contexts, testers, dates, or sessions. Each result therefore keeps its own trace metadata; do not reuse or overwrite one result's metadata to imply evidence for the other.

## Keyboard focus acceptance

Keyboard focus result: **PASS**

### Keyboard trace metadata

- Keyboard device / model: Built-in Lenovo notebook keyboard / Lenovo system model 83DV
- Keyboard OS / version: Windows 11 Version 25H2 / OS Build 26200.9168
- Keyboard browser or installed-PWA context / version: Google Chrome 152.0.7977.82, normal browser tab
- Keyboard tester / session reference: owner-operated physical QA session, 2026-09-04 22:42–23:15 Asia/Bangkok; Issue #133 accessibility follow-up and Issue #5 Beta QA follow-up
- Keyboard evidence location: Issue #133 keyboard-focus physical QA follow-up; Issue #5 keyboard-focus QA follow-up; physical screenshots captured in the QA conversation for the same traced session
- Keyboard test date/time: 2026-09-04 22:42–23:15 Asia/Bangkok
- Keyboard verified deployed runtime / release marker: live `qa-keyboard-focus-state.html` exercised the same-origin shipped app on the declared browser/PWA runtime candidate `ea409cd02fc7744514b8c867a67f56ec0187de80`, cache `kinaraidee-beta-v16`; canonical deployed descendant `adbb23c4f373ebfe6ed1d78e71ec051a3c05ed7a`, Pages `33838629999` and main Live Smoke `33838665915` remain the current browser/PWA deployment trace. Later documentation/Group-API descendants do not supersede this browser/PWA runtime declaration.

Required physical interaction evidence:

- Keyboard navigation was performed with a real hardware keyboard or equivalent platform keyboard navigation path: VERIFIED — the tester explicitly confirmed use of the notebook's built-in Lenovo hardware keyboard.
- Interactive controls can be reached in a logical sequence without pointer/touch-only interaction: VERIFIED — trusted Tab moved through the primary Home action, back control and meal options; trusted Shift+Tab reversed the sequence from dinner → lunch → breakfast → back.
- A visible focus indicator is present on focused actionable controls: VERIFIED — the live probe reported `:focus-visible=true` with `2.5px solid rgb(11, 107, 203)` outline and `2.5px` offset on multiple controls, and the indicator was visually apparent in the physical screenshots.
- Focus is not visually lost during the tested core flow: VERIFIED — visible focus remained trackable through the tested Home → meal-selection path and during reverse navigation; no focus trap or lost-focus state was observed.
- Activation with keyboard controls works for the tested actionable elements: VERIFIED — Space activated the primary `ช่วยฉันเลือก` action and Enter activated the back control, returning the app to Home as expected; both activations were recorded as trusted keyboard activations by the probe.
- Any unreachable, trapped, hidden, or ambiguous focus state is recorded: NONE OBSERVED IN THE TESTED HOME → MEAL-SELECTION → BACK CORE FLOW.

PASS requires one traceable physical-platform keyboard session with complete keyboard metadata and all required keyboard interaction checks verified. Static CSS inspection or automated focus-style regression does not establish this result.

This PASS is scoped to the traced Lenovo / Windows 11 / Chrome physical keyboard session and tested Home → meal-selection → back interaction only. It does not establish full accessibility coverage, the Android/iPhone device matrix, NF-07, referral-summary Edge acceptance, Product Event real-user acceptance, leaked-password protection, Public Beta completion or Commercial GO.

## Reduced-motion acceptance

Reduced-motion result: **PASS**

### Reduced-motion trace metadata

- Reduced-motion device / model: OPPO Reno13 5G (CPH2689)
- Reduced-motion OS / version: Android 16 / ColorOS 16.0.5
- Reduced-motion browser or installed-PWA context / version: Google Chrome 152.0.7977.64, normal browser tab
- Reduced-motion tester / session reference: owner-operated physical QA session, 2026-09-04 01:13–01:16 Asia/Bangkok; Issue #133 follow-up comment and Issue #5 QA comment
- Reduced-motion evidence location: Issue #133 comment `5530154002`; Issue #5 comment `5530152334`; physical screenshots captured in the QA conversation for the same traced session
- Reduced-motion test date/time: 2026-09-04 01:13–01:16 Asia/Bangkok
- Reduced-motion verified deployed runtime / release marker: `qa-reduced-motion-state.html` from PR #469 / merge `eec4569d976acddf3072cb50f4ada69df7439f1d`, deployed by Pages run `33786610833`; the probe exercises the shipped live app flow and does not itself replace the declared browser/PWA runtime candidate

Required physical interaction evidence:

- Platform/browser reduced-motion preference was enabled before the tested interaction: VERIFIED — Android Accessibility `Remove animations` was ON before opening the QA session.
- The active page/session was confirmed to receive the reduced-motion preference: VERIFIED — live probe reported `prefers-reduced-motion = reduce`.
- The tested core interaction remains usable with reduced motion enabled: VERIFIED — physical Surprise interaction completed and rendered the menu result `โจ๊กต้มยำหมู`, with actionable result controls visible.
- Non-essential animation/motion covered by the current implementation is reduced or removed as intended: VERIFIED — the shipped accessibility style reported loaded and computed transition duration was `1e-05s` under the deployed reduced-motion rule.
- No new blocking, unreadable, or timing-dependent behavior appears under reduced motion: VERIFIED — probe reported PASS and the Surprise flow completed back to ready after the rendered result.
- Any remaining motion that appears necessary or unexpected is recorded: NONE OBSERVED THAT BLOCKED OR OBSCURED THE TESTED SURPRISE FLOW IN THIS SESSION.

Source markers, `prefers-reduced-motion` CSS inspection, browser emulation, or CI do not establish this result. PASS is scoped to this traceable real-platform reduced-motion session only. It does not establish keyboard-focus PASS, NF-07 PASS, full accessibility/device-matrix PASS, Public Beta completion, or Commercial GO.

### Supporting physical observation — 2026-08-31 (non-canonical historical support)

Issue #133 records an earlier scoped physical iPhone observation in which Reduce Motion was shown OFF and then ON in Settings, Kinaraidee rendered with the preference enabled, and the tested Surprise flow remained understandable through busy and completed-result states. The submitted observation also showed no prolonged/non-essential visible transition during that tested flow.

That earlier observation remains useful supporting evidence only because exact iPhone model, iOS version, Safari-versus-installed-PWA context/version, and complete canonical trace metadata were not captured. It is not the basis of the canonical PASS above and must not be used to infer missing iPhone metadata.

## Result boundary

These two results are independent. A PASS for keyboard focus does not imply reduced-motion PASS, and a reduced-motion PASS does not imply keyboard-focus PASS, NF-07 PASS, full accessibility/device-matrix PASS, Public Beta completion, or Commercial GO.

If the physical test context or evidence trace cannot be established, keep the affected result **NOT VERIFIED** or record an appropriately scoped **INCONCLUSIVE / TEST ENVIRONMENT** outcome rather than guessing PASS/FAIL.
