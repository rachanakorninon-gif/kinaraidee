# Kinaraidee — Product Event Measurement v1

Status: **IMPLEMENTATION CANDIDATE / NOT PRODUCTION UNTIL MERGED + DEPLOYED**

Prepared: 2026-09-04

## Purpose

Measure the reviewed UTM acquisition funnel before account creation without changing the core recommendation logic.

Event stages:

1. `landing`
2. `guided_start`
3. `surprise_tap`
4. `recommendation_result`
5. `nearby_tap`

Each stage is stored at most once per browser session UUID.

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

## Production deployment order

1. Merge only after all PR checks pass.
2. Apply `supabase/product-acquisition-events-v1.sql` to production.
3. Run Supabase security/performance advisors and verify RLS/grants.
4. Deploy `product-event-api` with custom origin validation.
5. Deploy the merged `acquisition-api` source.
6. Allow GitHub Pages to publish the merged PWA / dashboard / privacy updates.
7. Run a synthetic UTM smoke using a dedicated non-production-count campaign/content slug or remove the synthetic row after verification.
8. Confirm Owner aggregate output and raw-table access boundaries.
9. Update acquisition/readiness docs from NOT MEASURED to MEASURED only after the live checks pass.

## Rollback

Frontend first:

- revert the runtime commit or remove `ensureProductEvents()` / `data/product-events.js` from the PWA cache.

Backend:

- leave stored rows intact if only ingestion must stop; undeploy/replace the ingestion function.
- if schema rollback is explicitly required, use `supabase/product-acquisition-events-v1-rollback.sql` after preserving any evidence required for incident analysis.

Do not drop product-event tables merely because the dashboard has a display defect.
