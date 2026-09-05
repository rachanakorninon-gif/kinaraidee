# iOS PWA Physical Evidence — 2026-09-05

Status: **SCOPED PASS FOR CORE/OFFLINE PWA BEHAVIOR; AUTH REOPEN TRACE INCONCLUSIVE DUE TO BROWSER-CONTEXT MISMATCH**

This file records only the physical behavior actually observed on 2026-09-05. It does not create or infer user counts, conversions, revenue, partner/payment readiness, or blanket launch readiness.

## Session metadata

- Device: iPhone 17 Pro Max
- OS: iOS 26.6
- Test date: 2026-09-05
- Primary context: installed Home Screen PWA / standalone launch
- Tester: owner-operated physical QA
- Evidence source: physical screenshots captured during the QA conversation
- Sensitive values intentionally excluded: email address, password, account identifier, token, referral code, raw storage/session content

## Scoped results

### Core recommendation/result flow

Result: **PASS — SCOPED PHYSICAL INTERACTION**

Observed on the physical device:

- recommendation result UI rendered and remained usable;
- result actions including choose-again / like / accept were present and interactable;
- the tested recommendation was saved into the visible history/favorite surface.

This is a physical interaction PASS for the tested iPhone session only; it is not a complete device-matrix result.

### Favorite/history persistence

Result: **PASS — SCOPED LOCAL PERSISTENCE**

A menu marked as favorite in the tested flow subsequently appeared in the Favorite/History screen with a timestamp after leaving and returning to the app flow. This supports persistence of the tested local favorite/history state for this physical session.

This does not establish account/cloud synchronization or persistence across device reinstall/data-clear scenarios.

### Offline standalone reopen + cached core flow

Result: **PASS — SCOPED OFFLINE PWA ACCEPTANCE**

Observed sequence:

1. Airplane Mode was enabled on the iPhone.
2. Kinaraidee was closed from the App Switcher.
3. Kinaraidee was reopened from the Home Screen icon.
4. The app reopened without Safari browser chrome.
5. The core recommendation/result flow remained usable offline and produced a result.

This supports cached standalone reopen and the tested offline core path on this device. It does not prove every route/API feature works offline.

### Auth / Member render and sign-in

Result: **PARTIAL — UI + SIGN-IN OBSERVED, REOPEN PERSISTENCE NOT YET VALIDLY CLASSIFIED**

Observed facts:

- Member signup/login UI rendered on the physical iPhone.
- Signup ↔ sign-in tab interaction worked.
- An existing controlled account successfully reached the signed-in Member view.
- The successful signed-in screenshot visibly contained Safari bottom browser chrome.
- A later reopen from the Home Screen PWA showed the Member page signed out without Safari chrome.

Because the successful sign-in and the later signed-out reopen were captured in different visible browser contexts, the trace is insufficient to classify Supabase/Auth session persistence itself as PASS or FAIL. Safari and the Home Screen standalone app may use different storage/session contexts, or the flow may have escaped standalone mode.

Follow-up is tracked in Issue #534. The next valid acceptance trace must keep the entire sign-in → signed-in state → App Switcher close → Home Screen reopen sequence inside one confirmed standalone context before judging persistence.

## Readiness impact

What this evidence adds:

- scoped iPhone standalone/core physical coverage;
- scoped favorite/history persistence coverage;
- scoped offline PWA reopen + cached core-flow coverage;
- Member/Auth UI and successful controlled sign-in evidence.

What remains open:

- valid same-context iOS Auth session-persistence classification;
- broader iOS/device/accessibility matrix;
- remaining Public Beta gates already tracked elsewhere;
- social/phone provider rollout gates;
- Commercial readiness gates including measured traction, payment/partner readiness, and other evidence that cannot be manufactured.

Public Beta remains **NOT COMPLETE** and Commercial remains **NO-GO**.