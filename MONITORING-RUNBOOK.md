# Kinaraidee — Monitoring Runbook

เอกสารนี้กำหนดขอบเขต monitoring สำหรับ Public Beta และหลักฐานที่ต้องมี ก่อนนับ Operations monitoring เป็นพร้อมใช้งานเชิงพาณิชย์

## Automated synthetic monitoring

Workflow: `.github/workflows/public-beta-monitor.yml`

ตรวจทุก 6 ชั่วโมงและสั่งรันเองได้ โดยตรวจเฉพาะสิ่งที่พิสูจน์อัตโนมัติได้:

- Public Beta URL และหน้า/asset สำคัญตอบ HTTP สำเร็จ
- Homepage ออนไลน์ยังมี app identity และ wiring หลักของ manifest, Service Worker, Surprise flow และ nearby restaurants
- `manifest.webmanifest` ออนไลน์ parse เป็น JSON ได้และมี `name`, `start_url`, `display`
- Surprise bootstrap ออนไลน์ยังมี active bridge ที่โหลด `data/pwa-install.js`, มี duplicate-load protection และเรียก helper จริงตาม source contract ของ PR #79
- `data/pwa-install.js` ออนไลน์ยังมี iOS install-hint suppression state และ compatibility bridge กลับไปยัง Surprise flow
- `sw.js` ออนไลน์ใช้ release marker เดียวกับ `main`
- `release-meta.json` ออนไลน์มี deployed SHA รูปแบบถูกต้องและ PWA cache marker ตรงกับ `sw.js`
- deployed SHA จาก `release-meta.json` trace กลับมาเป็น ancestor ของ `main` ปัจจุบันได้ เพื่อป้องกัน metadata ที่ชี้ไปยัง commit นอก release lineage
- Service Worker ใช้ atomic app-shell install (`cache.addAll(SHELL)`)
- ไม่พบ `Promise.allSettled` ใน live Service Worker
- development-only paths ที่กำหนดไม่ตอบ HTTP 200

การตรวจ lineage นี้ยอมรับกรณี `main` มี workflow/documentation/backend commits หลัง browser runtime deployment ได้ ตราบใดที่ deployed SHA ยังอยู่ในประวัติของ `main` และไม่มี browser/PWA runtime asset change ที่ทำให้ candidate stale

### Captured browser/PWA synthetic evidence

Scheduled `Kinaraidee Public Beta Monitor` run `32626732416` completed `success` on repository SHA `058c41790970be91a397f01870210849e5a792c1` at 2026-08-23T07:52Z.

The run captured:

- deployed SHA from public `release-meta.json`: `35fe4b7fbf201882ea2ebad8ffca2b8da668999b`
- expected browser/PWA runtime candidate: `35fe4b7fbf201882ea2ebad8ffca2b8da668999b`
- live Service Worker marker: `kinaraidee-beta-v13`
- public availability checks for home, 404, privacy, feedback, partner, deployment probe, manifest, Service Worker, release metadata, Surprise asset and nearby-restaurants asset
- deployed-SHA ancestry/runtime-candidate lineage verification
- development-only path checks where `/README.md`, `/SECURITY.md`, `/RELEASE-CHECKLIST.md`, `/.github/workflows/pages.yml` and `/supabase/config.toml` returned HTTP 404

PR #98 was a temporary read-only diagnostic used to retrieve this run metadata and logs and was closed without merge after evidence capture.

Evidence boundary: run `32626732416` is historical synthetic browser/PWA evidence for the unchanged PR #79 runtime candidate. Later Group API/workflow/documentation commits do not make it a Group API v6 monitor or a current-main full-system monitor. It does not replace real-device, accessibility, payment, privacy/legal, partner, backend application-event, owner/alert/escalation or Commercial acceptance evidence.

Earlier scheduled monitor failures remain historical evidence and are not rewritten as success; the captured successful run above is a later run with its own immutable run ID/conclusion.

## Group API live monitoring evidence

Current Group API source candidate: PR #93 / `fefc29322ac13f7066038a663bfeb7091d218b8f`, deployed as Supabase `group-api` ACTIVE version 6.

Current repository source blob: `04e7f595ef73b9fdbdf377ba3b8936a818a109be`.

Supabase-reported deployed bundle SHA-256: `e389ae3a6d5da19f81b909df6616524391825bdaef2ca568b522fbb3d8da2e52`.

A controlled, rejection-only workflow `.github/workflows/group-api-live-observability-probe.yml` verifies selected public endpoint rejection contracts without creating/updating/closing rooms or submitting a successful vote.

Latest canonical verified v6 run:

- run ID: `32632951668`
- exact `main` SHA: `8eff6c10e9adb4bd78a2bd0526e4e03e7d4d06f3`
- conclusion: `success`
- tested non-mutating rejection paths: unsupported method, malformed room IDs, malformed host-only token/id shapes, overlong voter ID, and HTTP/1.1 chunked request body >8 KiB
- chunked oversized-body contract: HTTP 413 / `request_too_large`
- source contract behind deployed v6 uses a bounded stream reader and cancels once the 8192-byte budget is exceeded rather than buffering an arbitrarily large body first

PR #94 was a temporary read-only deployed-v6 diagnostic and was closed without merge after independently passing the rejection contract. PR #96 was a temporary read-only workflow-run metadata diagnostic; it traced canonical run `32632951668` as `success` on the exact SHA above and was closed without merge as intended.

Fresh Supabase Edge Function logs for the canonical run window show ACTIVE version 6 request-level platform entries with expected 405/400/403/413 status classes. The inspected platform rows expose method, status, execution time, function/deployment identifiers and function version. A matching canonical-run POST 413 entry is visible at `2026-08-23T10:08:47.714000` on version 6.

Important boundary: the available log surface still does **not** expose the application `console.log` JSON payload generated by `logEvent()`. Therefore this evidence verifies deployed endpoint behavior and platform request-log ingestion, but exact `component=group-api` application structured-event ingestion is still **NOT VERIFIED**.

Execution times in this controlled v6 rejection sequence are diagnostic observations only and are **not** a production traffic latency baseline, SLA, SLO, error budget or alert threshold.

## สิ่งที่ workflow/monitoring evidence นี้ไม่พิสูจน์

ผล SUCCESS ของ synthetic monitor หรือ Group API rejection probe **ห้าม** ใช้แทน:

- real-device TC-01–TC-15 / NF-01–NF-10
- การทดสอบ PWA install/update/offline บนอุปกรณ์จริง
- iPhone/iPad Safari install-hint behavior หรือ Android install prompt interaction บนอุปกรณ์จริง
- accessibility test บนอุปกรณ์/assistive technology จริง
- Payment, entitlement, webhook หรือ reconciliation
- Partner conversion/commission verification
- Privacy/Legal review หรือ consent correctness
- Production Security gate / RLS / authorization negative tests ทั้งหมด
- complete anonymous API rate-limit/quota/abuse-control strategy
- approved Group API retention/deletion policy หรือ cleanup execution
- Group API application structured-event ingestion ถ้าเห็นเพียง platform request logs
- production traffic/error/latency baseline หรือ alert threshold

## Evidence ที่ใช้ได้

สำหรับ browser/PWA synthetic monitoring เมื่อ workflow รันจริง ให้เก็บอย่างน้อย:

- Workflow run URL / run ID
- repository commit SHA ที่ run อ้างอิง
- deployed SHA ที่อ่านจาก `release-meta.json`
- live Service Worker cache marker
- วันที่/เวลา run
- conclusion จริง (`success` / `failure` / `cancelled`)
- Job Summary หรือ logs ที่ trace กลับไปยัง run ได้

สำหรับ Group API ให้เก็บเพิ่มตามชนิดหลักฐาน:

- source candidate commit
- repository source blob SHA
- Supabase deployed function version/status/bundle hash/source parity
- controlled probe run ID/SHA/conclusion ถ้ามี
- Supabase platform log version/status/timestamp สำหรับ matching probe window
- แยก `platform request log` ออกจาก `application structured event` อย่างชัดเจน
- เมื่อมี body-limit implementation change ให้แยก static source guard, deployed source parity และ live chunked actual-body evidence ออกจากกัน

ห้ามกรอก SUCCESS หรือ PASS ลง release evidence หากยังไม่ได้ตรวจ run/log จริง หรือถ้าหลักฐานคนละชั้นถูกนำมาปนกัน

## เมื่อ monitor FAIL

1. อย่าตีความทันทีว่าเป็น runtime defect; แยก transient network/Pages propagation/platform logging ออกจาก defect จริง
2. สำหรับ browser/PWA ตรวจ path/homepage wiring/manifest/PWA-helper bridge/marker/release-meta/deployed-SHA lineage ที่ fail จาก logs
3. สำหรับ Group API แยก endpoint response regression, deployment/source mismatch, platform-log absence และ application-event ingestion gap ออกจากกัน
4. ถ้า Public Beta กระทบผู้ใช้จริง ให้เปิด defect/incident ที่ trace กลับไปยัง run
5. ถ้าเป็น browser release regression ให้ใช้ `ROLLBACK-RUNBOOK.md`; backend rollback ต้อง trace source/deployment version/blob/bundle hash แยกตาม backend runbook/evidence
6. หลังแก้ ให้รัน monitor/probe ใหม่และบันทึก run ใหม่เป็น evidence; ห้ามแก้ไขผล run เก่าให้เป็น PASS

## Commercial monitoring gate

การมี workflow, probe และ runbook นี้หมายถึง **monitoring mechanisms/evidence paths exist** เท่านั้น ยังไม่ถือว่า Operations monitoring gate ผ่าน จนกว่าจะมีตาม production scope ที่เปิดจริง:

- run จริงที่ตรวจสอบย้อนหลังได้สำหรับ monitors ที่ใช้เป็น gate
- observability surface สำหรับ application/backend events ที่ต้องใช้ operationally
- baseline จริงก่อนกำหนด threshold
- ผู้รับผิดชอบ incident/alert ที่ระบุจริง
- ช่องทางรับรู้ failure ที่ใช้งานจริง
- ขั้นตอน escalation/support ที่ทดสอบหรือยืนยันการเข้าถึงได้
- monitoring/error reporting ที่ครอบคลุม Production components ที่เปิดใช้จริง เช่น payment/backend เมื่อเปิดใช้งาน

ดังนั้นการมี successful scheduled browser/PWA run `32626732416` และ canonical Group API rejection probe `32632951668` ช่วยเติมหลักฐาน mechanism/run ได้บางส่วน แต่ **Production monitoring gate ยังไม่ผ่าน** จนกว่ารายการข้างต้นครบตาม production scope จริง.
