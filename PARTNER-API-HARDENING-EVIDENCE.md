# Partner API Hardening Evidence

Status: **SOURCE/DEPLOYMENT HARDENING + LIVE REJECTION CONTRACT VERIFIED**

This document records the current evidence boundary for the public Partner API without inferring partner readiness, conversion, revenue, retention approval, complete abuse control, or Commercial GO.

## Current source/deployment state

- PR #126 merged as `3bc28e0eac80cf45cbb4b40f460dea95d616c830`.
- Canonical source exists at `supabase/functions/partner-api/index.ts`.
- The source uses bounded streaming with `maxRequestBytes=32768`, early `Content-Length` rejection, reader cancellation on overflow, fatal UTF-8 decoding and JSON parsing only after the bounded read completes.
- Generic responses include `Cache-Control: no-store` and `X-Content-Type-Options: nosniff`.
- The existing public action and owner/admin authorization contracts were intentionally preserved.
- Connected Supabase inspection after PR #126 verified `partner-api` ACTIVE version 15 with bundle SHA-256 `8adde9353c1037db0a519b7f0cba6d949dd039d8b0346fd98e892389818439bb` and source markers matching the repository hardening contract.

## CI/static evidence

Visible PR #126 workflows completed success, including Partner API Regression run `32670266259`, Security Hygiene `32670266217`, Beta QA `32670266272`, Beta integrity `32670266247`, Release Consistency `32670266380`, and Governance Required Checks Regression `32670266185`.

PR #127 merged as `509675e0bbe7edc8873691a9b1ccd089afa1dc61` and added `.github/workflows/partner-api-live-probe.yml` for non-mutating rejection checks.

PR #128 merged as `a66884bf7633d9b154d92f2f1e64471e07ef20a8` and fixed the original probe mutation guard. Later Actions inspection found the workflow itself was still failing before job creation: recent runs had zero jobs and GitHub displayed the workflow path rather than its declared name. Those historical failures are not counted as endpoint failures or PASS evidence.

PR #142 reconstructed the live rejection workflow with the same non-mutating contract and removed unnecessary self-scanning complexity. Its PR-head workflow was parsed normally by GitHub Actions; Partner API Regression and the live rejection probe both completed success before merge.

PR #142 merged as `5ca280f4832e0d0fc1aa7057bb68f4df001d4067`.

## Live rejection contract — VERIFIED

The probe verifies only rejection paths against the deployed Partner API:

- GET → HTTP 405
- malformed JSON POST → HTTP 400
- request body over 32 KiB → HTTP 413
- GET rejection response includes `no-store` and `nosniff`

The workflow deliberately avoids JSON application-action payloads, and `Partner API Regression` guards the probe against introducing JSON application actions or expected 2xx assertions. It therefore does not intentionally generate partner search, click, conversion, or similar product events.

Confirmed merged-main evidence:

- Partner API Live Rejection Probe run `32675596758` completed **success** on exact merge SHA `5ca280f4832e0d0fc1aa7057bb68f4df001d4067`.
- Job `97283018587` completed **success**.
- The live contract step passed GET=405 with `no-store`/`nosniff`, malformed JSON=400, and oversized body=413.
- Read-only diagnostic run `32675626819` independently found the exact push-triggered run and SHA; temporary PR #143 was closed without merge.
- Earlier PR-head live probe run `32675546536`, job `97282880288`, also completed success, but the merged-main push run above is the canonical live evidence.

Status of this specific live rejection contract: **VERIFIED PASS — REJECTION BEHAVIOR ONLY**.

This does not prove successful product-action requests, end-user authorization flows, complete anonymous abuse controls, alert delivery, retention compliance, partner readiness, conversion/reconciliation, revenue, or Commercial GO. The six-hour schedule is configured, but one successful main push run does not by itself prove an operational recurring-monitoring history or alerting SLA.

## Coordinate validation evidence

Before PR #126, a read-only data pre-check found 0 out-of-range coordinate rows in `restaurant_search_demand` and `partner_restaurants`. The live `guard_partner_coordinate_ranges` migration added latitude [-90, 90] and longitude [-180, 180] CHECK constraints. PR #125 records and guards this narrow database contract.

This coordinate validation does not establish TC-08 real-device location acceptance or full Partner API input/abuse-control completeness.

## Release-consistency guard validation

A post-PR #146 direct `main` commit (`75965769d6f83d48197f1e218d50476878c6081b`) extended `Commercial Release Checklist Consistency` so Partner API candidate ancestry, source drift, deployed version, canonical live-rejection run and evidence-boundary language are checked together.

This document-only change intentionally triggers that workflow through a pull request so the new guard is exercised by PR CI rather than being treated as valid merely because the workflow file exists on `main`. It introduces no new Partner API source, deployment, endpoint, user, partner, conversion or revenue evidence.

## Still-open Commercial/Security work

The following remain open and must not be inferred from source/deployment/live-rejection hardening:

- complete anonymous rate/quota/abuse-control strategy;
- approved retention policy for partner search/click/session data and verified cleanup behavior;
- production monitoring baseline, owner, alert channel, escalation path and recurring scheduled-run history;
- real partner agreement/commercial evidence;
- real conversion/reconciliation evidence for any enabled commission model;
- Production Privacy/Legal approval and Commercial GO.

## Evidence rule

Source parity, deployment version, static CI, coordinate constraints and live rejection behavior are separate evidence classes. The live rejection PASS above is scoped to the stated 4xx/header behavior only. None may be promoted into user/device, successful product-action, partner, conversion, revenue, retention, legal, monitoring-SLA, or Commercial PASS without their own real evidence.
