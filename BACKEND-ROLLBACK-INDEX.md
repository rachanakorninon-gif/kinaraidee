# Kinaraidee — Backend Rollback Evidence Index

Status: **REFERENCE INDEX WRITTEN / NOT DRILL-VERIFIED**

เอกสารนี้เป็น index สำหรับหา rollback evidence ของ backend อย่างรวดเร็วใน incident จริงเท่านั้น ไม่ใช่หลักฐานว่า backup, restore หรือ rollback drill ผ่านแล้ว

## Group API

- Main procedure: `ROLLBACK-RUNBOOK.md` → `Group API Edge Function rollback path`
- Canonical deployment evidence: `GROUP-API-DEPLOYMENT-EVIDENCE.md`
- Current verified source/deployment anchors ต้อง derive จาก canonical evidence ก่อน incident ทุกครั้ง
- Current rollback readiness: **PROCEDURE WRITTEN / NOT YET DRILL-VERIFIED**

## Partner API

- Rollback reference: `PARTNER-API-ROLLBACK-REFERENCE.md`
- Canonical source/deployment evidence: `PARTNER-API-HARDENING-EVIDENCE.md`
- Current verified source/deployment/live-rejection anchors ต้อง derive จาก canonical evidence ก่อน incident ทุกครั้ง
- Current rollback readiness: **REFERENCE WRITTEN / NOT DRILL-VERIFIED**
- Partner API rollback success remains **NOT VERIFIED** until executed evidence exists.

## Shared recovery decision gate

- `RECOVERY-DRILL-DECISION.md` remains the canonical Production recovery decision record.
- While that record is `NOT APPROVED`, owner/provider/environment/RPO/RTO/escalation/approval fields must not be invented.
- `RELEASE-CHECKLIST.md` backup/recovery and controlled rollback-drill gates must remain open until real approved/executed evidence exists.

## Incident use

1. Identify affected surface: browser/PWA, Group API, Partner API, database/schema, credential, or combination.
2. Record bad SHA/function version/status before any Production change.
3. Open the matching canonical evidence above and re-check current repository/deployed source parity; never choose a rollback target from version number alone.
4. Record security/privacy trade-offs if the selected rollback source predates newer hardening.
5. Execute only through approved operational access; do not place secrets in repository or logs.
6. Re-inspect deployed source/version/hash after rollback.
7. Start with scoped non-mutating/rejection checks; run controlled positive-flow checks only when incident scope requires them.
8. Record real Evidence Record and keep PASS/FAIL/BLOCKED truthful.

## Evidence boundary

Static documentation or CI success for this index is **not** backup availability, restore integrity, measured RPO/RTO, rollback execution, real-device acceptance, Public Beta completion, payment/partner/conversion/revenue evidence, or Commercial GO.
