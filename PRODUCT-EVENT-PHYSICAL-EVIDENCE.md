# Kinaraidee — Product Event Physical Acceptance Evidence

Status: **SCOPED PHYSICAL PASS — OPPO ANDROID CHROME / QA TELEMETRY CLEANED**

Prepared: 2026-09-04

Accepted: 2026-09-05

## Purpose

Use one traceable physical-device acceptance run to verify that the deployed browser interaction hooks for Product Event Measurement reach the production Product Event backend with the expected reviewed UTM values.

This is a **Beta QA acceptance record**, not a growth campaign and not First-100 acquisition evidence.

## Current deployment boundary

- Canonical browser/PWA runtime candidate for Product Event hooks: PR #509 / `0bd5acfb9946e10ed5624205165123eabc8035b4`.
- Verified deployed descendant: `75f95dd95b0b480f3cf3ebb668d62f7cb45345ba`.
- PR #510 / main descendant `15ec0c6bd838f58981f5e0e109e612b8429f110d` verified production ingestion and synchronized release/docs/CI evidence; it does not replace the guarded PR #509 browser runtime candidate.
- Production Product Event API contract was already verified by controlled GitHub-hosted smoke. That synthetic probe is endpoint/deployment evidence only and did not establish the physical interaction acceptance recorded here.
- The physical tester observed public release SHA `aa470986589d83dd95b4efd6e4a4d68a9f55965d` with PWA cache marker `kinaraidee-beta-v16` at intake time. Repository `main` may advance after the traced session; later docs-only descendants do not retroactively change the observed device release.

## QA telemetry isolation

Do **not** use `th_first100_core_202609` or any real organic/paid campaign for this acceptance run.

The physical QA URLs were generated from the canonical public root with the reviewed builder contract:

- `utm_source=qr`
- `utm_medium=qr`
- `utm_campaign=qa_product_event_physical_202609`
- unique lower-case `utm_content` per fresh private browser session

The exact controlled QA contents used were:

- Surprise: `physical_oppo_surprise_20260905_01`
- Guided: `physical_oppo_guided_20260905_01`

No Group room, prize, Premium or First-100 parameter was added.

### First-touch storage caution

`data/acquisition.js` preserves first-touch UTM values in browser local storage for up to 30 days. Therefore this QA run used fresh/private browser storage contexts that did not contain real acquisition attribution.

During this QA run:

- do not create a new member account;
- do not submit signup metadata;
- do not reuse the QA browser context for a later real signup;
- close/discard the private QA context after evidence capture.

Both controlled Incognito contexts were physically closed after their respective paths. This prevents physical QA UTM values from becoming account-attribution evidence.

## Pre-run capture — completed

- Device manufacturer/model: OPPO Reno13 5G (CPH2689)
- OS/version: Android 16 / ColorOS 16.0.5
- Browser + exact version: Chrome 152.0.7977.64
- Browser/PWA context: Chrome Incognito browser tab; separate fresh private contexts for Surprise and Guided
- Session date/time + timezone: 2026-09-05 approximately 00:31–00:49 ICT (UTC+07:00)
- `qa-device-session-intake.html` release/cache checkpoint: release SHA readable; `kinaraidee-beta-v16`; browser context = `browser tab`
- Public release SHA observed: `aa470986589d83dd95b4efd6e4a4d68a9f55965d`
- QA UTM URL used for Surprise: canonical public root with `utm_source=qr&utm_medium=qr&utm_campaign=qa_product_event_physical_202609&utm_content=physical_oppo_surprise_20260905_01`
- QA UTM URL used for Guided: canonical public root with `utm_source=qr&utm_medium=qr&utm_campaign=qa_product_event_physical_202609&utm_content=physical_oppo_guided_20260905_01`
- Unique QA `utm_content`: the two values listed above

No account identifier, email, raw session UUID, menu, budget, preference or precise location is retained in this evidence record.

## Physical execution

### A. Surprise path — PASS

In the first fresh/private QA context using the reviewed QA UTM URL:

1. Public Kinaraidee Home loaded and became interactive.
2. The tester physically tapped `ไม่รู้เลย — เลือกให้ฉันทันที` once.
3. A recommendation result became visible and ready.
4. The result exposed the normal nearby-restaurant action, which was physically activated once.

Expected backend stages for this browser session were met:

- `landing` = 1
- `surprise_tap` = 1
- `recommendation_result` = 1
- `nearby_tap` = 1

No menu name, budget, location or personal data is recorded here.

### B. Guided path — PASS

A **second fresh/private QA browser session** used the same QA campaign and a different unique `utm_content`.

1. Home loaded from the reviewed Guided QA UTM URL.
2. The tester started the normal guided-choice flow.
3. The tester physically progressed through meal, people-count, budget and preference choices.
4. A recommendation result screen was reached.

Expected backend stages for the second browser session were met:

- `landing` = 1
- `guided_start` = 1
- `recommendation_result` = 1

### C. Nearby path — scoped PASS

The current Surprise result UI exposed the normal nearby-restaurant action during the traced physical session. The tester physically activated it once and production corroboration showed:

- `nearby_tap` = 1 for that Surprise session.

No API call was fabricated to create this event.

## Supabase corroboration — PASS

Production was queried using only the exact QA campaign/content values and a narrow time window covering the controlled physical run.

Privacy-safe aggregate corroboration before cleanup:

- matching controlled Product Event rows: **7**
- distinguishable browser sessions: **2**
- unexpected event rows: **0**
- attribution mismatch rows: **0**
- maximum rows for any `(session,event)` pair: **1**
- Surprise stage set: `landing`, `surprise_tap`, `recommendation_result`, `nearby_tap`
- Guided stage set: `landing`, `guided_start`, `recommendation_result`

The production table schema used for this evidence stores only the random browser session UUID, event stage, reviewed UTM fields and server-side occurrence time. It does not store email, account/User ID, menu, budget, food preference or precise location.

Raw session identifiers were not copied into this document or public issue text.

## Cleanup — PASS

After evidence capture, only Product Event rows whose `utm_campaign='qa_product_event_physical_202609'`, exact two QA content values, and narrow controlled-run time scope matched this physical run were deleted.

QA Product Event rows must be deleted after evidence capture so they do not contaminate the Owner Product Funnel dashboard or First-100 baseline.

Do not delete real organic/user telemetry.

Follow-up production count for that exact controlled QA scope:

- Matching QA rows before cleanup: **7**
- Matching QA rows deleted: **YES — exact controlled campaign/content/time scope only**
- Matching QA rows remaining after cleanup: **0**

## Evidence record

### Surprise session

- Device/session metadata complete: PASS
- Physical Home load: PASS
- Physical `ไม่รู้เลย` tap: PASS
- Physical recommendation result: PASS
- Backend `landing`: PASS / one row
- Backend `surprise_tap`: PASS / one row
- Backend `recommendation_result`: PASS / one row
- Duplicate stage rows absent: PASS

### Guided session

- Device/session metadata complete: PASS
- Physical Guided start: PASS
- Physical recommendation result: PASS
- Backend `landing`: PASS / one row
- Backend `guided_start`: PASS / one row
- Backend `recommendation_result`: PASS / one row
- Duplicate stage rows absent: PASS

### Nearby session/state

- Physical nearby action: PASS / action exposed and tapped once
- Backend `nearby_tap`: PASS / one row

### Cleanup

- Matching QA rows before cleanup: **7**
- Matching QA rows deleted: **PASS — exact controlled scope only**
- Matching QA rows remaining after cleanup: **0**

## PASS boundary

This document is promoted from `NOT VERIFIED` because physical interaction evidence and matching production backend corroboration exist for the required Surprise and Guided paths, the conditional Nearby action was exercised because it was exposed, and QA-row cleanup verification reached zero remaining controlled rows.

This scoped PASS establishes only:

- physical browser interaction hooks fired on the recorded OPPO Android Chrome device/session pair;
- expected Product Event stages reached production ingestion;
- Surprise and Guided used distinct browser sessions;
- stage deduplication and reviewed UTM attribution matched the traced QA run;
- the controlled QA telemetry was removed after evidence capture.

It does **not** establish:

- First-100 traction, a real-user funnel baseline or conversion rate;
- Android/iPhone minimum device-matrix completion;
- account signup/confirmation acceptance beyond separately recorded Auth evidence;
- paid acquisition, CAC/CPI or ad-spend evidence;
- Premium/payment readiness;
- Campaign 3,000 eligibility or prize-entry truth;
- Public Beta completion or Commercial GO.

Synthetic/API smoke, CI, source inspection, Pages deployment and Owner-dashboard availability cannot substitute for this physical acceptance.
