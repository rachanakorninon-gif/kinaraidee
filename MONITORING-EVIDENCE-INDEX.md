# Kinaraidee — Monitoring Evidence Index

เอกสารนี้เป็นดัชนีสำหรับ routing หลักฐาน monitoring/operations โดยไม่ยกระดับสถานะจาก configuration, synthetic probe หรือเอกสารเพียงอย่างเดียว

## Canonical sources

- `CURRENT-RELEASE.md` — release-level status และ evidence boundaries ปัจจุบัน
- `MONITORING-RUNBOOK.md` — monitoring mechanisms, failure handling และ Production monitoring gate
- `ALERT-DELIVERY-SELF-TEST-EVIDENCE.md` — template/canonical record สำหรับ controlled alert-delivery self-test; คง `NOT VERIFIED` จนกว่าจะมี exact workflow run + resulting issue/comment ที่ตรวจจริง
- `SYNTHETIC-PROBE-TRACE-LEDGER-EVIDENCE.md` — immutable verified snapshot ของ synthetic-probe ledger evidence และคำอธิบาย implementation ปัจจุบัน
- `SUPABASE-GRANT-HARDENING-EVIDENCE.md` — canonical security evidence สำหรับ least-privilege grants และ live anonymous Data API negative boundary; ไม่ใช่ Production monitoring PASS
- Issue #397 — rolling Group scheduled-probe trace ledger
- Issue #398 — rolling Partner scheduled-probe trace ledger
- Issue #45 — Group API operations/privacy/abuse-control tracker
- Issue #123 — Partner API operations/privacy/abuse-control tracker
- Issue #30 — Operations readiness tracker
- Issue #2 — Commercial launch gate

## Current trace-ledger implementation

PR #403 / merge `f1651d98f08d3caa57248594b1fd972b54b2f429` added event-driven rolling-ledger refresh after completed scheduled Group/Partner probes while keeping the six-hour fallback refresh. PR #404 / merge `0110a10a601104504d1c237415adc702155b94cf` aligned the synthetic-ledger evidence documentation with that implementation.

Verified post-PR #403 examples already recorded in the rolling ledgers include:

- Group scheduled source run `33268194101` (`schedule`, `completed/success`)
- Partner scheduled source run `33269265156` (`schedule`, `completed/success`)
- ledger refresh run `33269833183` (`completed/success`)

These runs prove only the scoped scheduled rejection-probe execution and trace-ledger refresh path represented by their inspected metadata. They do not prove production traffic, successful product actions, application structured-event ingestion, monitoring SLA/SLO, owner/on-call, escalation, actual alert delivery, approved retention, complete abuse controls, Public Beta completion or Commercial GO.

## Supabase anonymous Data API probe routing

`.github/workflows/supabase-anon-access-probe.yml` is a separate scheduled security-boundary probe. It performs GET-only checks: a public Auth settings connectivity control plus anonymous SELECT-denial checks for 16 public relations. Its canonical hardening scope and original verified evidence belong in `SUPABASE-GRANT-HARDENING-EVIDENCE.md`, not in the Group/Partner rolling trace ledgers.

A currently inspected scheduled example on `main` is run `33283941056`, event `schedule`, exact repository SHA `8d6b3dd934a06abeeb24e6f8db236ef8e3206117`, conclusion `success` (2026-08-30 UTC). This confirms only that the scoped live anonymous Data API negative probe completed successfully for that run. It does not establish authenticated per-user RLS behavior, leaked-password protection, production traffic, application-event observability, alert delivery, monitoring SLA/SLO, device/Auth acceptance, Public Beta completion or Commercial GO.

## Evidence routing rules

1. Scheduled Group/Partner rejection probe metadata belongs in rolling Issues #397/#398 and may be summarized in immutable evidence snapshots only when explicitly scoped.
2. Supabase anonymous Data API negative-probe results belong to the Supabase security/grant evidence class; do not route them into Group/Partner ledgers or promote them to Production monitoring PASS.
3. `workflow_dispatch` controlled alert self-test evidence belongs in `ALERT-DELIVERY-SELF-TEST-EVIDENCE.md` only after the exact run and resulting issue/comment are both inspected.
4. Platform request logs must not be promoted to application structured-event ingestion unless the application event itself is observable and inspected.
5. Real production baseline, alert threshold, owner/on-call, channel, escalation and retention/access policy require separate approved/observed evidence.
6. Real-device QA, Auth interaction, Feedback/Partner form acceptance, payment, partner agreement, conversion and revenue remain separate evidence classes.

## Current monitoring gate

Status remains **NOT COMPLETE FOR PRODUCTION / COMMERCIAL READINESS**.

Known scoped mechanisms and traceability are functioning, but actual alert delivery remains `NOT VERIFIED`, live structured application-event ingestion remains incomplete where required, and owner/on-call/escalation, real baseline/thresholds, retention/access policy and other Production operational evidence remain open.

This index is documentation/evidence routing only. It does not create a monitoring PASS, Public Beta PASS, user, conversion, payment, partner, revenue or Commercial GO result.
