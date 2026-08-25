# Kinaraidee — Alert Delivery Self-Test Evidence

เอกสารนี้เป็น template สำหรับบันทึกหลักฐาน controlled alert-delivery self-test ของ Group API และ Partner API โดยห้ามกรอก PASS จากการมี workflow/configuration เพียงอย่างเดียว

## Evidence rule

สถานะ `Actual alert delivery` เปลี่ยนเป็น PASS ได้ก็ต่อเมื่อมีหลักฐานครบทั้ง workflow run จริงและ resulting GitHub issue/comment ที่ตรวจสอบย้อนกลับได้

Self-test ต้องออกจาก workflow ก่อนส่ง live API request และห้ามสร้าง room, vote, partner application, click, conversion, payment หรือ revenue action

## Group API alert-delivery self-test

Status: **NOT VERIFIED**

- Workflow: `.github/workflows/group-api-live-observability-probe.yml`
- Expected trigger: `workflow_dispatch` with `alert_self_test=true`
- Expected issue title: `Group API alert delivery self-test`
- Workflow run URL / run ID: **NOT CAPTURED**
- Repository SHA: **NOT CAPTURED**
- Trigger inputs: **NOT CAPTURED**
- Run conclusion: **NOT CAPTURED**
- Resulting issue/comment URL or ID: **NOT CAPTURED**
- Issue/comment timestamp: **NOT CAPTURED**
- Verified no live Group API request was sent: **NOT VERIFIED**
- Verified no room/vote mutation occurred: **NOT VERIFIED**

### PASS criteria

- [ ] exact workflow run is inspected and completed with the expected controlled self-test path
- [ ] repository SHA and `alert_self_test=true` input are captured
- [ ] resulting `Group API alert delivery self-test` issue/comment is inspected
- [ ] timestamps/conclusion are recorded
- [ ] logs prove the workflow exited before live API requests
- [ ] no room/vote mutation is inferred or fabricated

## Partner API alert-delivery self-test

Status: **NOT VERIFIED**

- Workflow: `.github/workflows/partner-api-live-probe.yml`
- Expected trigger: `workflow_dispatch` with `alert_self_test=true`
- Expected issue title: `Partner API alert delivery self-test`
- Workflow run URL / run ID: **NOT CAPTURED**
- Repository SHA: **NOT CAPTURED**
- Trigger inputs: **NOT CAPTURED**
- Run conclusion: **NOT CAPTURED**
- Resulting issue/comment URL or ID: **NOT CAPTURED**
- Issue/comment timestamp: **NOT CAPTURED**
- Verified no live Partner API request was sent: **NOT VERIFIED**
- Verified no application/click/conversion mutation occurred: **NOT VERIFIED**

### PASS criteria

- [ ] exact workflow run is inspected and completed with the expected controlled self-test path
- [ ] repository SHA and `alert_self_test=true` input are captured
- [ ] resulting `Partner API alert delivery self-test` issue/comment is inspected
- [ ] timestamps/conclusion are recorded
- [ ] logs prove the workflow exited before live API requests
- [ ] no application/click/conversion mutation is inferred or fabricated

## Evidence boundary

A successful controlled self-test proves only that the selected GitHub alert-delivery path produced the expected issue/comment for that run. It does not prove monitoring SLA/SLO, production owner/on-call, escalation readiness, application-event ingestion, retention approval, complete abuse controls, real-device acceptance, Public Beta completion, partner readiness, conversion/revenue, payment success or Commercial GO.

If any required evidence is missing, keep the relevant status as **NOT VERIFIED** and do not infer a PASS.
