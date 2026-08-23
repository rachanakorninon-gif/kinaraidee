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

การตรวจ lineage นี้ยอมรับกรณี `main` มี workflow/documentation commits หลัง runtime deployment ได้ ตราบใดที่ deployed SHA ยังอยู่ในประวัติของ `main`; จึงไม่ตีความว่า docs-only descendant ต้องถูก redeploy เป็น runtime ใหม่

## สิ่งที่ workflow นี้ไม่พิสูจน์

ผล SUCCESS ของ synthetic monitor **ห้าม** ใช้แทน:

- real-device TC-01–TC-15 / NF-01–NF-10
- การทดสอบ PWA install/update/offline บนอุปกรณ์จริง
- iPhone/iPad Safari install-hint behavior หรือ Android install prompt interaction บนอุปกรณ์จริง
- accessibility test บนอุปกรณ์/assistive technology จริง
- Payment, entitlement, webhook หรือ reconciliation
- Partner conversion/commission verification
- Privacy/Legal review หรือ consent correctness
- Production Security gate / RLS / authorization negative tests
- GitHub Pages deployment workflow และ Live Smoke trace ของ release candidate หากยังไม่ได้ตรวจ run จริงโดยตรง

## Evidence ที่ใช้ได้

เมื่อ workflow รันจริง ให้เก็บอย่างน้อย:

- Workflow run URL / run ID
- repository commit SHA ที่ run อ้างอิง
- deployed SHA ที่อ่านจาก `release-meta.json`
- live Service Worker cache marker
- วันที่/เวลา run
- conclusion จริง (`success` / `failure` / `cancelled`)
- Job Summary หรือ logs ที่ trace กลับไปยัง run ได้

ห้ามกรอก SUCCESS หรือ PASS ลง release evidence หากยังไม่ได้ตรวจ run จริง

## เมื่อ monitor FAIL

1. อย่าตีความทันทีว่าเป็น runtime defect; แยก transient network/GitHub Pages propagation ออกจาก defect จริง
2. ตรวจ path/homepage wiring/manifest/PWA-helper bridge/marker/release-meta/deployed-SHA lineage ที่ fail จาก logs
3. ถ้า Public Beta กระทบผู้ใช้จริง ให้เปิด defect/incident ที่ trace กลับไปยัง run
4. ถ้าเป็น release regression ให้ใช้ `ROLLBACK-RUNBOOK.md`
5. หลังแก้ ให้รัน monitor ใหม่และบันทึก run ใหม่เป็น evidence; ห้ามแก้ไขผล run เก่าให้เป็น PASS

## Commercial monitoring gate

การมี workflow และ runbook นี้หมายถึง **monitoring mechanism exists** เท่านั้น ยังไม่ถือว่า Operations gate ผ่าน จนกว่าจะมี:

- อย่างน้อยหนึ่ง run จริงที่ตรวจสอบย้อนหลังได้
- ผู้รับผิดชอบ incident/alert ที่ระบุจริง
- ช่องทางรับรู้ failure ที่ใช้งานจริง
- ขั้นตอน escalation/support ที่ทดสอบหรือยืนยันการเข้าถึงได้
- monitoring/error reporting ที่ครอบคลุมส่วน Production ที่เปิดใช้จริง (เช่น payment/backend เมื่อเปิดใช้งาน)

ดังนั้น `RELEASE-CHECKLIST.md` ต้องคง Production monitoring เป็นรายการที่ยังไม่ผ่านจนกว่าหลักฐานเหล่านี้ครบ
