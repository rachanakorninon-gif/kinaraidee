# Partner API Rollback Reference

Status: **REFERENCE WRITTEN / NOT DRILL-VERIFIED**

เอกสารนี้เป็น reference สำหรับเตรียม rollback ของ Partner API เท่านั้น ไม่ใช่คำสั่งให้ rollback และไม่ถือว่า backup/restore/rollback drill ผ่านจนกว่าจะมี execution evidence จริง

## Current verified anchors

อ้างอิงจาก `PARTNER-API-HARDENING-EVIDENCE.md` และ repository source ปัจจุบัน:

- current Partner API source candidate: PR #126 / `3bc28e0eac80cf45cbb4b40f460dea95d616c830`
- current repository source blob: `3b4a1dfc7a61f321cd47c3fbe0ae650c0d088619`
- current inspected deployment: Supabase `partner-api` ACTIVE version 15
- current inspected bundle SHA-256: `8adde9353c1037db0a519b7f0cba6d949dd039d8b0346fd98e892389818439bb`
- canonical rejection-only live verification: run `32675596758` on `5ca280f4832e0d0fc1aa7057bb68f4df001d4067`

ค่าข้างต้นเป็น evidence anchors ณ เวลาที่ตรวจ ไม่ใช่ rollback target อัตโนมัติ ก่อน incident rollback จริงต้องตรวจ `CURRENT-RELEASE.md`, `PARTNER-API-HARDENING-EVIDENCE.md`, repository source ปัจจุบัน, Supabase deployed version/source และ incident scope ใหม่เสมอ

## Partner API rollback rules

1. บันทึก bad source SHA, current Supabase function version/status, source blob/bundle hash และ incident symptoms ก่อนเปลี่ยน Production
2. เลือก rollback source จาก repository commit ที่ trace ได้และมี contract/security evidence เหมาะสม ห้ามเลือกเพียงเพราะเลข version ต่ำกว่า
3. เปรียบเทียบ bad source → rollback source โดยตรวจ method/action contract, owner/admin authorization, bounded request-size handling, UTF-8/JSON rejection behavior, security headers, coordinate validation assumptions และ privacy-safe logging boundary
4. ถ้า rollback source เก่ากว่าจะไม่มี hardening ใหม่บางส่วน ให้บันทึก security trade-off ก่อน deploy
5. Deploy source ที่เลือกโดยห้ามนำ credential/service-role secret มาใส่ repository หรือ logs
6. หลัง deploy ต้อง inspect function status/version, repository/deployed source parity และ bundle/source hash ใหม่
7. เริ่ม verification ด้วย rejection-only/non-mutating checks ก่อน successful product-action tests
8. ถ้า incident scope กระทบ `find_partners`, `track_search`, `track_click`, owner/admin actions หรือ conversion paths ต้องใช้ controlled positive-flow evidence แยกต่างหาก และห้ามสร้าง partner/conversion/revenue evidence สมมติ
9. Re-run Security/Performance Advisor ตามขอบเขต backend/DDL change ที่เกี่ยวข้อง
10. อัปเดต canonical deployment/release evidence และ incident tracker โดยคง historical FAIL/PASS เดิมตามความจริง

## สิ่งที่ rollback ไม่แก้โดยอัตโนมัติ

- approved Partner retention/cleanup policy
- complete anonymous rate/quota/abuse-control strategy
- monitoring owner/channel/escalation/SLA decision
- actual alert-delivery verification
- leaked/compromised credentials
- incompatible database/schema changes
- partner agreement, conversion/reconciliation, payment หรือ revenue readiness
- Production Privacy/Legal approval

## Evidence required before calling a Partner API rollback successful

- bad source SHA และ selected rollback source SHA
- before/after Supabase version/status
- before/after repository source blob or bundle hash
- post-deploy source/deployment parity inspection
- scoped rejection-only probe result
- controlled positive-flow result เฉพาะเมื่อ incident scope ต้องใช้
- Security/Performance Advisor evidence ตามขอบเขต change
- incident/rollback record พร้อมผู้รับผิดชอบจริง

จนกว่าจะมีหลักฐาน execution ครบตาม incident scope ให้คงสถานะ Partner API rollback เป็น **NOT VERIFIED** และห้ามตีความ static CI/documentation เป็น Public Beta หรือ Commercial GO
