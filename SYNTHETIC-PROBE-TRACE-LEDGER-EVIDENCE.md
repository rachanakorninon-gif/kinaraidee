# Kinaraidee — Synthetic Probe Trace Ledger Evidence

This document records the verified trace-ledger mechanism for the scheduled Group API and Partner API synthetic rejection probes. It is an evidence-index document only; it does not upgrade Public Beta or Commercial readiness by itself.

The run metadata below is an **immutable verified snapshot captured by PR #401**. Issues #397 and #398 are the canonical rolling ledgers for the newest scheduled probe metadata and may advance after this repository snapshot without making the historical evidence below invalid.

## Current ledger implementation

- Ledger workflow: `.github/workflows/synthetic-probe-trace-ledger.yml`
- Metadata-preservation fix: PR #400
- PR #400 merge SHA: `48df5d885801182997a522108cd11bd519f6d5f0`
- Scheduled-probe refresh integration: PR #403
- PR #403 merge SHA: `f1651d98f08d3caa57248594b1fd972b54b2f429`
- Current refresh triggers include the existing repository refresh paths plus `workflow_run` completion from the scheduled Group API and Partner API rejection probes; the workflow-run path is constrained to source runs whose trigger is `schedule`.
- Post-PR #403 Partner scheduled source run verified in rolling Issue #398: `33269265156`, `completed / success`, exact repository SHA `f1651d98f08d3caa57248594b1fd972b54b2f429`.
- Post-PR #403 ledger refresh run recorded by rolling Issues #397/#398: `33269833183`.
- The PR #401 snapshot below remains immutable and continues to identify the earlier post-PR #400 `push` refresh run `33255741766`.

PR #400 is the evidence that the repaired ledger renderer preserves dynamic run metadata and validates required rendered fields before issue updates are written. PR #403 improves freshness by allowing a completed scheduled Group/Partner source probe to trigger the rolling-ledger refresh directly. This implementation change does not alter the evidence boundary: a successful synthetic rejection probe or ledger refresh is not production traffic, a successful product action, application-event ingestion, alert-delivery PASS, monitoring SLA, Public Beta completion, or Commercial GO.

## Group API scheduled-probe ledger

Canonical rolling issue ledger: #397 — `Trace ledger: Group API scheduled synthetic probe`

Verified PR #401 snapshot from the ledger:

- Source workflow: `Group API Live Observability Probe`
- Source run ID: `33252433049`
- Run number / attempt: `26 / 1`
- Repository SHA: `a1f5854996282d7d6b8a2ed093395ceaa6f09b8d`
- Branch: `main`
- Trigger: `schedule`
- Status / conclusion: `completed / success`
- GitHub created / updated: `2026-08-29T12:24:48Z / 2026-08-29T12:24:57Z`
- Expected rejection contract: GET 405 followed by POST rejection sequence 400,400,403,403,400,413; no successful room/vote mutation
- Ledger refreshed by run `33255741766`

Do not interpret this fixed snapshot as the newest run forever. Read Issue #397 for the current rolling ledger state.

## Partner API scheduled-probe ledger

Canonical rolling issue ledger: #398 — `Trace ledger: Partner API scheduled synthetic probe`

Verified PR #401 snapshot from the ledger:

- Source workflow: `Partner API Live Rejection Probe`
- Source run ID: `33253452104`
- Run number / attempt: `90 / 1`
- Repository SHA: `4e4cc762d50445dda790882761e01579d672a69a`
- Branch: `main`
- Trigger: `schedule`
- Status / conclusion: `completed / success`
- GitHub created / updated: `2026-08-29T12:48:59Z / 2026-08-29T12:51:34Z`
- Expected rejection contract: GET 405, malformed JSON POST 400, oversized-body POST 413; no click/search/conversion creation
- Ledger refreshed by run `33255741766`

Do not interpret this fixed snapshot as the newest run forever. Read Issue #398 for the current rolling ledger state.

## Evidence boundary

The trace ledgers prove only that concrete scheduled synthetic rejection runs can be traced to their GitHub Actions metadata and that the current ledger renderer preserves that metadata. The rolling issues may be refreshed from later scheduled source-run completion events without rewriting this immutable snapshot.

They do **not** prove:

- production traffic or a production traffic baseline;
- successful room/vote/search/click/conversion product actions;
- structured application-event ingestion;
- monitoring owner, alert channel, escalation, SLA/SLO, or actual alert delivery;
- approved retention or cleanup execution;
- complete anonymous abuse controls;
- real-device acceptance, Auth interaction acceptance, or Public Beta completion;
- partner agreement, payment, Premium subscription, conversion, reconciliation, revenue, or Commercial GO.

No user count, conversion, payment, subscription, partner-readiness, revenue, or real-device result is created or inferred by this evidence record.

## Current release impact

This evidence strengthens traceability for the existing synthetic monitoring mechanism and supports Operations/Commercial readiness documentation. The repository snapshot is historical evidence; Issues #397/#398 remain the rolling source for newer scheduled-run metadata. Neither the snapshot nor later ledger refreshes close the remaining monitoring gate: actual alert-delivery evidence, production owner/on-call, application-event observability where required, real traffic/error/latency baseline, approved retention/cleanup, and complete abuse controls remain separate open requirements.
