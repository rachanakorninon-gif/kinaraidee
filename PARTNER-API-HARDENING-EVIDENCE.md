# Partner API Hardening Evidence

Status: **SOURCE/DEPLOYMENT HARDENING VERIFIED — LIVE REJECTION RUN NOT YET PROMOTED TO PASS**

This document records the current evidence boundary for the public Partner API without inferring partner readiness, conversion, revenue, retention approval, complete abuse control, or Commercial GO.

## Current source/deployment state

- PR #126 merged as `3bc28e0eac80cf45cbb4b40f460dea95d616c830`.
- Canonical source now exists at `supabase/functions/partner-api/index.ts`.
- The source uses bounded streaming with `maxRequestBytes=32768`, early `Content-Length` rejection, reader cancellation on overflow, fatal UTF-8 decoding and JSON parsing only after the bounded read completes.
- Generic responses include `Cache-Control: no-store` and `X-Content-Type-Options: nosniff`.
- The existing public action and owner/admin authorization contracts were intentionally preserved.
- Connected Supabase inspection after PR #126 verified `partner-api` ACTIVE version 15 with bundle SHA-256 `8adde9353c1037db0a519b7f0cba6d949dd039d8b0346fd98e892389818439bb` and source markers matching the repository hardening contract.

## CI/static evidence

Visible PR #126 workflows completed success, including Partner API Regression run `32670266259`, Security Hygiene `32670266217`, Beta QA `32670266272`, Beta integrity `32670266247`, Release Consistency `32670266380`, and Governance Required Checks Regression `32670266185`.

PR #127 merged as `509675e0bbe7edc8873691a9b1ccd089afa1dc61` and added `.github/workflows/partner-api-live-probe.yml` for non-mutating rejection checks.

PR #128 merged as `a66884bf7633d9b154d92f2f1e64471e07ef20a8` and fixed the probe mutation guard so it does not self-match. The inspected PR-head workflow set for `8e6f9e7c9c957f85d11b7f1cc0d78a43ebc016aa` completed success for the normal repository regression workflows. This does not by itself establish that the Partner API live rejection job executed successfully.

## Live rejection contract

The probe is designed to verify only rejection paths against the deployed Partner API:

- GET → HTTP 405
- malformed JSON POST → HTTP 400
- request body over 32 KiB → HTTP 413
- GET rejection response includes `no-store` and `nosniff`

The workflow deliberately avoids JSON application-action payloads so it cannot generate partner search, click, conversion, or similar product events by accident.

Status of this specific live rejection contract: **NOT YET PROMOTED TO VERIFIED PASS FROM THE CURRENT EVIDENCE SURFACE**.

Reason: the available connector view does not expose a confirmed Partner API live-probe run/result for the current main merge. A successful static/PR workflow set is not used as a substitute for the live rejection run.

## Coordinate validation evidence

Before PR #126, a read-only data pre-check found 0 out-of-range coordinate rows in `restaurant_search_demand` and `partner_restaurants`. The live `guard_partner_coordinate_ranges` migration added latitude [-90, 90] and longitude [-180, 180] CHECK constraints. PR #125 records and guards this narrow database contract.

This coordinate validation does not establish TC-08 real-device location acceptance or full Partner API input/abuse-control completeness.

## Still-open Commercial/Security work

The following remain open and must not be inferred from source/deployment hardening:

- complete anonymous rate/quota/abuse-control strategy;
- approved retention policy for partner search/click/session data and verified cleanup behavior;
- production monitoring baseline, owner, alert channel and escalation path;
- explicit successful live rejection-run evidence for v15;
- real partner agreement/commercial evidence;
- real conversion/reconciliation evidence for any enabled commission model;
- Production Privacy/Legal approval and Commercial GO.

## Evidence rule

Source parity, deployment version, static CI, coordinate constraints and rejection-probe design are separate evidence classes. None may be promoted into user/device, partner, conversion, revenue, retention, legal, or Commercial PASS without their own real evidence.
