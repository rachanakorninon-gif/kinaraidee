# Real Platform UX Evidence

Status: **PARTIAL — REDUCED MOTION PASS / KEYBOARD FOCUS NOT VERIFIED**

Purpose: canonical physical-platform evidence record for the remaining Public Beta UX gates covering visible keyboard focus and reduced-motion behavior on the currently deployed Kinaraidee runtime.

This document must not be converted to PASS from source review, CI, screenshots without interaction trace, Pages, Live Smoke, browser emulation, or CSS/media-query inspection alone.

The two acceptance results are independent and may be exercised on different devices, operating systems, browsers/PWA contexts, testers, dates, or sessions. Each result therefore keeps its own trace metadata; do not reuse or overwrite one result's metadata to imply evidence for the other.

## Keyboard focus acceptance

Keyboard focus result: **NOT VERIFIED**

### Keyboard trace metadata

- Keyboard device / model: NOT CAPTURED
- Keyboard OS / version: NOT CAPTURED
- Keyboard browser or installed-PWA context / version: NOT CAPTURED
- Keyboard tester / session reference: NOT CAPTURED
- Keyboard evidence location: NOT CAPTURED
- Keyboard test date/time: NOT CAPTURED
- Keyboard verified deployed runtime / release marker: NOT CAPTURED

Required physical interaction evidence:

- Keyboard navigation was performed with a real hardware keyboard or equivalent platform keyboard navigation path: NOT VERIFIED
- Interactive controls can be reached in a logical sequence without pointer/touch-only interaction: NOT VERIFIED
- A visible focus indicator is present on focused actionable controls: NOT VERIFIED
- Focus is not visually lost during the tested core flow: NOT VERIFIED
- Activation with keyboard controls works for the tested actionable elements: NOT VERIFIED
- Any unreachable, trapped, hidden, or ambiguous focus state is recorded: NOT CAPTURED

PASS requires one traceable physical-platform keyboard session with complete keyboard metadata and all required keyboard interaction checks verified. Static CSS inspection or automated focus-style regression does not establish this result.

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

PASS is scoped to this traceable real-platform reduced-motion session only. It does not establish keyboard-focus PASS, NF-07 PASS, full accessibility/device-matrix PASS, Public Beta completion, or Commercial GO.

### Supporting physical observation — 2026-08-31 (non-canonical historical support)

Issue #133 records an earlier scoped physical iPhone observation in which Reduce Motion was shown OFF and then ON in Settings, Kinaraidee rendered with the preference enabled, and the tested Surprise flow remained understandable through busy and completed-result states. The submitted observation also showed no prolonged/non-essential visible transition during that tested flow.

That earlier observation remains useful supporting evidence only because exact iPhone model, iOS version, Safari-versus-installed-PWA context/version, and complete canonical trace metadata were not captured. It is not the basis of the canonical PASS above and must not be used to infer missing iPhone metadata.

## Result boundary

These two results are independent. A PASS for keyboard focus does not imply reduced-motion PASS, and a reduced-motion PASS does not imply keyboard-focus PASS, NF-07 PASS, full accessibility/device-matrix PASS, Public Beta completion, or Commercial GO.

If the physical test context or evidence trace cannot be established, keep the affected result **NOT VERIFIED** or record an appropriately scoped **INCONCLUSIVE / TEST ENVIRONMENT** outcome rather than guessing PASS/FAIL.
