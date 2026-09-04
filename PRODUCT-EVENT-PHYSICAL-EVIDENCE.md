# Kinaraidee — Product Event Physical Acceptance Evidence

Status: **READY FOR PHYSICAL EXECUTION / NOT VERIFIED**

Prepared: 2026-09-04

## Purpose

Use one traceable physical-device session to verify that the deployed browser interaction hooks for Product Event Measurement reach the production Product Event backend with the expected reviewed UTM values.

This is a **Beta QA acceptance record**, not a growth campaign and not First-100 acquisition evidence.

## Current deployment boundary

- Canonical browser/PWA runtime candidate: PR #509 / `0bd5acfb9946e10ed5624205165123eabc8035b4`.
- Verified deployed descendant: `75f95dd95b0b480f3cf3ebb668d62f7cb45345ba`.
- PR #510 / main descendant `15ec0c6bd838f58981f5e0e109e612b8429f110d` verified production ingestion and synchronized release/docs/CI evidence; it does not replace the guarded PR #509 browser runtime candidate.
- Production Product Event API contract is already verified by controlled GitHub-hosted smoke. That synthetic probe is endpoint/deployment evidence only and does not establish physical interaction acceptance.

## QA telemetry isolation

Do **not** use `th_first100_core_202609` or any real organic/paid campaign for this acceptance run.

Generate the physical QA URL with `tools/marketing-url-builder.mjs` using:

- `utm_source=qr`
- `utm_medium=qr`
- `utm_campaign=qa_product_event_physical_202609`
- a unique lower-case `utm_content` for the device/session, for example `physical_oppo_01`

Example builder command:

```bash
node tools/marketing-url-builder.mjs \
  --source qr \
  --medium qr \
  --campaign qa_product_event_physical_202609 \
  --content physical_oppo_01
```

The exact URL used must be recorded below. Do not hand-edit it into a Group room, prize, Premium or First-100 URL.

### First-touch storage caution

`data/acquisition.js` preserves first-touch UTM values in browser local storage for up to 30 days. Therefore this QA run must use a fresh/private browser storage context that does not contain a real user's acquisition attribution.

During this QA run:

- do not create a new member account;
- do not submit signup metadata;
- do not reuse the QA browser context for a later real signup;
- close/discard the private QA context after evidence capture.

This prevents physical QA UTM values from becoming account-attribution evidence.

## Pre-run capture — required

Record before touching the Product Event flow:

- Device manufacturer/model:
- OS/version:
- Browser + exact version:
- Browser/PWA context:
- Session date/time + timezone:
- `qa-device-session-intake.html` release/cache checkpoint:
- Public release SHA observed:
- QA UTM URL used:
- Unique QA `utm_content`:

If an exact value was not captured, write `not captured`; do not infer it from appearance or User-Agent.

## Physical execution

### A. Surprise path — required

In a fresh/private QA context using the reviewed QA UTM URL:

1. Load the public Kinaraidee page and wait until Home is interactive.
2. Physically tap `ไม่รู้เลย — เลือกให้ฉันทันที` once.
3. Wait for a recommendation result to become visible and the button to return to ready.
4. Record the visible outcome only as interaction evidence; do not record menu name, budget, location or personal data in this evidence file.

Expected backend stages for one browser session:

- `landing` = 1
- `surprise_tap` = 1
- `recommendation_result` = 1

### B. Guided path — required

Use a **second fresh/private QA browser session** with the same QA campaign and a different unique `utm_content`.

1. Load Home from the reviewed QA UTM URL.
2. Start the normal guided-choice flow.
3. Complete enough choices to reach a recommendation result.

Expected backend stages for that second session:

- `landing` = 1
- `guided_start` = 1
- `recommendation_result` = 1

### C. Nearby path — conditional scoped check

If the current result UI exposes the normal nearby-restaurant action during the traced physical session, physically activate it and expect:

- `nearby_tap` = 1 for that session.

If the action is not exposed for the tested result/state, record `N/A — action not exposed in traced state`; do not fabricate the event or call the API manually to make this physical check pass.

## Supabase corroboration — required before PASS

After the physical interactions, query production read-only using the exact QA campaign/content values and the narrow session time window.

Acceptance requires:

- rows exist only for the stages physically exercised;
- each `(session_id,event_name)` appears at most once;
- source/medium/campaign/content match the reviewed QA URL;
- Surprise and Guided runs are distinguishable as separate browser sessions;
- no email, account/User ID, menu, budget, preference or precise location is stored in Product Event telemetry.

Record only privacy-safe aggregate/session-stage evidence. Do not copy raw identifiers into public issue text when a count/stage summary is sufficient.

## Cleanup — required

After evidence capture, delete **only** Product Event rows whose `utm_campaign='qa_product_event_physical_202609'` and whose exact QA content/time scope belongs to this controlled run.

Then run a follow-up count and record that matching QA rows remaining = `0`.

QA Product Event rows must be deleted after evidence capture so they do not contaminate the Owner Product Funnel dashboard or First-100 baseline.

Do not delete real organic/user telemetry.

## Evidence record

### Surprise session

- Device/session metadata complete: NOT RUN
- Physical Home load: NOT RUN
- Physical `ไม่รู้เลย` tap: NOT RUN
- Physical recommendation result: NOT RUN
- Backend `landing`: NOT RUN
- Backend `surprise_tap`: NOT RUN
- Backend `recommendation_result`: NOT RUN
- Duplicate stage rows absent: NOT RUN

### Guided session

- Device/session metadata complete: NOT RUN
- Physical Guided start: NOT RUN
- Physical recommendation result: NOT RUN
- Backend `landing`: NOT RUN
- Backend `guided_start`: NOT RUN
- Backend `recommendation_result`: NOT RUN
- Duplicate stage rows absent: NOT RUN

### Nearby session/state

- Physical nearby action: NOT RUN / N/A only if not exposed
- Backend `nearby_tap`: NOT RUN / N/A only if not exposed

### Cleanup

- Matching QA rows before cleanup: NOT RUN
- Matching QA rows deleted: NOT RUN
- Matching QA rows remaining after cleanup: NOT RUN

## PASS boundary

This document may be promoted from `NOT VERIFIED` only after physical interaction evidence and matching production backend corroboration exist for the required Surprise and Guided paths, followed by QA-row cleanup verification.

A future scoped PASS would establish only:

- physical browser interaction hooks fired on the recorded device/session;
- expected Product Event stages reached production ingestion;
- stage deduplication and reviewed UTM attribution matched the traced QA run.

It would **not** establish:

- First-100 traction, a real-user funnel baseline or conversion rate;
- Android/iPhone minimum device-matrix completion;
- account signup/confirmation acceptance;
- paid acquisition, CAC/CPI or ad-spend evidence;
- Premium/payment readiness;
- Campaign 3,000 eligibility or prize-entry truth;
- Public Beta completion or Commercial GO.

Synthetic/API smoke, CI, source inspection, Pages deployment and Owner-dashboard availability cannot substitute for this physical acceptance.
