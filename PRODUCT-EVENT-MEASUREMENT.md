# Kinaraidee — Product Event Measurement v1

Status: **PRODUCTION MEASUREMENT DEPLOYED / SCOPED REAL-DEVICE ACCEPTANCE PASS**

Prepared: 2026-09-04

Physical acceptance recorded: 2026-09-05

## Purpose

Measure the reviewed UTM acquisition funnel before account creation without changing the core recommendation logic.

Event stages:

1. `landing`
2. `guided_start`
3. `surprise_tap`
4. `recommendation_result`
5. `nearby_tap`

Each stage is stored at most once per browser session UUID.

## Current production status

- Canonical browser/PWA runtime candidate for the Product Event hooks: PR #509 / `0bd5acfb9946e10ed5624205165123eabc8035b4`.
- Verified deployed descendant: `75f95dd95b0b480f3cf3ebb668d62f7cb45345ba` with Pages `33823701475` and main Live Smoke `33823746430` successful.
- Product Event schema/RLS/grant boundary and production Edge Functions are deployed.
- PR #510 / main descendant `15ec0c6bd838f58981f5e0e109e612b8429f110d` added controlled production-ingestion verification and synchronized canonical release/marketing evidence without superseding the guarded PR #509 browser runtime candidate.
- Product Event API live smoke verified allowed-origin insert, same-session/stage duplicate handling and wrong-origin rejection from a GitHub-hosted runner.
- Controlled smoke telemetry was removed after evidence capture; production follow-up confirmed no matching synthetic rows remained.
- A later scoped OPPO Android Chrome physical QA run exercised Surprise, Guided and the conditional Nearby action through the deployed browser hooks, corroborated the expected production stages, verified two distinct private browser sessions and no duplicate session/stage rows, then deleted only the controlled QA telemetry and confirmed zero matching rows remained.

Scoped physical interaction acceptance is recorded in `PRODUCT-EVENT-PHYSICAL-EVIDENCE.md`.

These facts establish deployment/API readiness plus one scoped physical interaction PASS. They do **not** establish real-user funnel counts, First-100 traction, conversion, paid acquisition performance, Public Beta completion or Commercial GO.

## Data boundary

Stored in product telemetry:

- random session UUID
- event stage
- `utm_source`
- `utm_medium`
- `utm_campaign`
- `utm_content`
- server-side occurrence time

Not stored in product telemetry:

- email
- account/User ID
- name/phone
- selected menu name
- budget
- food preferences
- precise location
- Campaign 3,000 eligibility

The browser cannot query raw event rows. Public ingestion goes through `product-event-api`; Owner reporting is aggregate-only through `acquisition-api`.

## Runtime isolation

`data/product-events.js` observes DOM interactions and the result-screen state. It does not replace or modify the recommendation algorithm. `data/home-surprise.js` only loads the telemetry helper. If telemetry network calls fail, meal selection continues normally.

Product telemetry runs only when all four reviewed UTM fields are present.

## Security / abuse boundary

- Edge ingestion accepts only the GitHub Pages browser origin.
- Event names, sources, mediums, campaign/content slugs and request size are allow-listed/validated.
- PRE-LAUNCH prize/Premium-3000 campaign labels are rejected.
- Database rows are unique by `(session_id, event_name)`.
- RLS is enabled and `anon` / `authenticated` direct table access is revoked.
- This is best-effort acquisition telemetry, not a fraud-proof identity system. Origin and session IDs can be spoofed by a determined non-browser client, so these metrics must never be used as prize eligibility authority.

## Production deployment order — completed for v1

1. Merge only after all PR checks pass.
2. Apply `supabase/product-acquisition-events-v1.sql` to production.
3. Run Supabase security/performance advisors and verify RLS/grants.
4. Deploy `product-event-api` with custom origin validation.
5. Deploy the merged `acquisition-api` source.
6. Allow GitHub Pages to publish the merged PWA / dashboard / privacy updates.
7. Run a controlled synthetic UTM smoke using a dedicated QA campaign/content and remove the synthetic row after verification.
8. Confirm Owner aggregate output and raw-table access boundaries.
9. Update acquisition/readiness docs from NOT MEASURED to MEASURED only after the live checks pass.

The above deployment/API sequence is complete for v1.

## Physical acceptance — scoped PASS recorded

The traced 2026-09-05 OPPO Reno13 5G / Android 16 / Chrome 152.0.7977.64 run followed the required isolation contract:

1. Used `PRODUCT-EVENT-PHYSICAL-EVIDENCE.md` on a traceable real device/session.
2. Kept the QA UTM campaign separate from `th_first100_core_202609` and from all paid/prize/Premium campaigns.
3. Physically exercised required Surprise and Guided paths in two separate fresh Incognito contexts.
4. Physically exercised the Nearby action because it was exposed in the Surprise result state.
5. Corroborated the resulting stages against production Supabase telemetry using the exact QA campaign/content values and narrow time window.
6. Verified two distinct browser sessions, zero attribution mismatch rows, zero unexpected stages and at most one row per `(session,event)`.
7. Deleted only the controlled QA Product Event rows after evidence capture and verified matching rows remaining = `0`.

This scoped physical PASS is not a real acquisition campaign and must not be copied into a real-user funnel baseline.

## Rollback

Frontend first:

- revert the runtime commit or remove `ensureProductEvents()` / `data/product-events.js` from the PWA cache.

Backend:

- leave stored rows intact if only ingestion must stop; undeploy/replace the ingestion function.
- if schema rollback is explicitly required, use `supabase/product-acquisition-events-v1-rollback.sql` after preserving any evidence required for incident analysis.

Do not drop product-event tables merely because the dashboard has a display defect.
