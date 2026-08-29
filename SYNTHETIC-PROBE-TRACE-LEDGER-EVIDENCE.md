# Kinaraidee — Synthetic Probe Trace Ledger Evidence

This document records the verified trace-ledger mechanism for the scheduled Group API and Partner API synthetic rejection probes. It is an evidence-index document only; it does not upgrade Public Beta or Commercial readiness by itself.

## Current ledger implementation

- Ledger workflow: `.github/workflows/synthetic-probe-trace-ledger.yml`
- Metadata-preservation fix: PR #400
- PR #400 merge SHA: `48df5d885801182997a522108cd11bd519f6d5f0`
- Post-merge ledger refresh run: `33255741766`
- Ledger refresh event: `push`
- Ledger refresh status/conclusion: `completed / success`
- Ledger refresh head SHA: `48df5d885801182997a522108cd11bd519f6d5f0`

The post-merge run is the evidence that the repaired ledger renderer executed successfully on `main`. The workflow fix prevents dynamic run metadata from being lost during Markdown rendering and validates required rendered fields before issue updates are written.

## Group API scheduled-probe ledger

Canonical issue ledger: #397 — `Trace ledger: Group API scheduled synthetic probe`

Latest recorded scheduled source run in the ledger:

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

## Partner API scheduled-probe ledger

Canonical issue ledger: #398 — `Trace ledger: Partner API scheduled synthetic probe`

Latest recorded scheduled source run in the ledger:

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

## Evidence boundary

The trace ledgers prove only that concrete scheduled synthetic rejection runs can be traced to their GitHub Actions metadata and that the current ledger renderer preserved that metadata after PR #400.

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

This evidence strengthens traceability for the existing synthetic monitoring mechanism and supports Operations/Commercial readiness documentation. It does not close the remaining monitoring gate: actual alert-delivery evidence, production owner/on-call, application-event observability where required, real traffic/error/latency baseline, approved retention/cleanup, and complete abuse controls remain separate open requirements.
