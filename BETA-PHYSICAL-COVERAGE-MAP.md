# กินอะไรดี — Physical QA Coverage Map

เอกสารนี้เป็น **routing aid** สำหรับลดงานซ้ำตอนยืมอุปกรณ์ ไม่ใช่ source of truth ใหม่สำหรับ PASS. หากข้อความขัดกัน ให้ยึด `BETA-DEVICE-MATRIX.md`, `AUTH-INTERACTION-PHYSICAL-EVIDENCE.md`, `REAL-PLATFORM-UX-EVIDENCE.md`, `PWA-UPGRADE-PHYSICAL-EVIDENCE.md`, Issue #5 และ test-case definitions เป็นหลัก.

> คำว่า “scoped PASS exists” หมายถึงมีหลักฐานจริงใน session/device ที่บันทึกไว้เท่านั้น ไม่ได้ขยายไปยังอุปกรณ์ใหม่ และไม่ได้แปลว่า minimum device matrix หรือ Public Beta ผ่านแล้ว.

## สถานะการใช้งาน

- **NEW-DEVICE CORE** — ควรเก็บบน Android/iPhone รุ่นใหม่ตาม `BORROWED-DEVICE-QUICK-RUN.md` เพื่อสร้าง traceable distinct-model core-flow coverage.
- **SCOPED PASS / DO NOT AUTO-REPEAT** — มี physical evidence แล้ว; ไม่ต้องทำซ้ำทุกเครื่องยืม เว้นแต่ defect/release scope ต้องการ.
- **DEDICATED ONE-OFF** — ต้องใช้ setup เฉพาะ ไม่ควรเอาเวลาของเครื่องยืมสดไปทำโดยอัตโนมัติ.
- **OPEN / SEPARATE GATE** — ยังเปิด แต่ไม่ใช่เหตุให้ทำ test ซ้ำทุกเครื่อง.

## TC-01–TC-15

| Case | Existing physical evidence | Next action |
|---|---|---|
| TC-01 เปิดแอป | scoped historical Android/iPhone PASS exists; historical exact modelsไม่ครบ | **NEW-DEVICE CORE** — ทำบน Android/iPhone รุ่นใหม่ทุกเครื่องที่ต้องการนับ matrix |
| TC-02 ไม่รู้เลย | scoped historical Android/iPhone PASS exists | **NEW-DEVICE CORE** — ทำบนรุ่นใหม่เพื่อ current traceable core flow |
| TC-03 เลือกเงื่อนไข | scoped historical Android PASS exists | **NEW-DEVICE CORE** — ทำบนรุ่นใหม่ |
| TC-04 เลือกใหม่/reroll | scoped historical Android PASS exists | **SCOPED PASS / DO NOT AUTO-REPEAT**; ทำเพิ่มได้ใน Surprise session ถ้าไม่เพิ่มเวลา |
| TC-05 กินอันนี้/ประวัติ | scoped historical Android PASS exists | **SCOPED PASS / DO NOT AUTO-REPEAT**; persistence coverage แยกจาก device-count core flow |
| TC-06 เมนูโปรด | v16 restart scoped PASS exists on historical Android session | **SCOPED PASS / DO NOT AUTO-REPEAT**; historical v15 failure remains historical only |
| TC-07 แชร์ | scoped historical Android PASS exists | **SCOPED PASS / DO NOT AUTO-REPEAT** |
| TC-08 Location allow | scoped iPhone v16 PASS exists; exact historical model not captured | **NEW-DEVICE CORE** — trace prompt/state → Allow → nearby path on new models |
| TC-09 Location deny | scoped historical Android PASS exists | **NEW-DEVICE CORE** — trace Deny → usable fallback on new models |
| TC-10 Maps fallback | scoped historical Android/iPhone PASS exists | **NEW-DEVICE CORE** — include with nearby/location flow |
| TC-11 Feedback | **OPPO Reno13 5G / Android 16 / Chrome 152 scoped PASS** including duplicate guard, failure recovery, aria-busy recovery, retry and backend row | **SCOPED PASS / DO NOT AUTO-REPEAT** on borrowed devices |
| TC-12 Partner application | **OPPO Reno13 5G / Android 16 / Chrome 152 scoped PASS** including privacy metadata and backend row | **SCOPED PASS / DO NOT AUTO-REPEAT**; QA record is not commercial partner evidence |
| TC-13 PWA | scoped historical Android installed-PWA PASS; exact historical model not captured | **NEW-DEVICE CORE** — basic install/standalone/reopen on models used for matrix as supported |
| TC-14 Offline shell | scoped historical Android PASS exists | **NEW-DEVICE CORE** — online load → offline shell → online recovery on new models |
| TC-15 404 recovery | scoped historical Android PASS exists | **SCOPED PASS / DO NOT AUTO-REPEAT** unless current Pages routing defect is suspected |

## NF-01–NF-10

| Case | Existing physical evidence | Next action |
|---|---|---|
| NF-01 one-tap Surprise | scoped historical Android/iPhone PASS exists | **NEW-DEVICE CORE** — combine with TC-02 |
| NF-02 duplicate guard | scoped historical Android PASS exists | **NEW-DEVICE CORE** — quick rapid-tap check during Surprise |
| NF-03 กลับหน้าแรกแล้วสุ่มใหม่ | scoped historical Android PASS exists | **SCOPED PASS / DO NOT AUTO-REPEAT**; can be folded into a second Surprise if convenient |
| NF-04 Android PWA update | older-build transition evidence exists but strict older baseline was not independently captured | **DEDICATED ONE-OFF** — execute together with controlled NF-07 setup rather than fresh borrowed device |
| NF-05 iPhone/iPad install guidance | iPhone/Safari #1 v16 steps 1–7 scoped PASS; exact model/iOS/Safari not captured; iPad step remains untested | **NEW-DEVICE CORE on iPhone** for traceable model/install context; iPad remains optional/scope-dependent |
| NF-06 Offline after update | scoped historical Android PASS exists | **DEDICATED/SCOPED** — recheck with NF-07 controlled update session; no need every borrowed device |
| NF-07 old-cache → v16 | **NOT VERIFIED**; deterministic v15 fixture/probe deployed | **DEDICATED ONE-OFF** — controlled old-cache baseline → normal update/reopen, no clear data |
| NF-08 interrupted recovery | scoped historical Android PASS exists | **NEW-DEVICE CORE** — quick app-switch/lock during busy on borrowed devices |
| NF-09 Surprise accessibility | iPhone/VoiceOver #1 scoped PASS; Android TalkBack historical result INCONCLUSIVE | **SCOPED PASS / SEPARATE COVERAGE** — do not repeat on every borrowed phone; Android TalkBack remains separate if Android screen-reader coverage is required |
| NF-10 online recovery | scoped historical Android PASS exists | **NEW-DEVICE CORE** — combine with TC-14 offline/online round |

## Non-TC/NF physical gates

| Gate | Current state | Next action |
|---|---|---|
| Reduced Motion | **PASS** on OPPO Reno13 5G / Android 16 / Chrome 152 with complete trace metadata | **SCOPED PASS / DO NOT AUTO-REPEAT** |
| Keyboard Focus | **NOT VERIFIED**; trusted-event QA probe deployed | **DEDICATED ONE-OFF** with real keyboard/equivalent hardware navigation |
| Auth recovery/password update/sign-in/new signup/email confirmation | **scoped OPPO PASS** with backend corroboration | **SCOPED PASS / DO NOT AUTO-REPEAT** on borrowed devices |
| Weak/leaked-password rejection | **NOT VERIFIED / blocked by current Supabase plan/configuration** | **OPEN / SEPARATE SECURITY GATE**; physical-device repetition cannot close it |
| Android model count | OPPO is fully traceable; historical Android model is `not captured` | Need **2 additional distinct traceable Android models** with core-flow evidence |
| iPhone model count | historical iPhone physical evidence exists but exact model is `not captured` | Need traceable distinct iPhone models; one new iPhone does not prove the unknown historical model is a different model |
| Blocker/Critical = 0 | not established merely by no reports/CI | evaluate only from **release-scoped defect evidence** after physical runs; absence of reports or CI/static/synthetic evidence is insufficient |

## Fast execution order for borrowed devices

Use `qa-device-session-intake.html` first, then `BORROWED-DEVICE-QUICK-RUN.md`.

### Android borrowed device
1. metadata checkpoint
2. TC-01
3. TC-02 + NF-01 + NF-02
4. TC-03
5. TC-08 / TC-09 / TC-10
6. TC-13
7. TC-14 + NF-10
8. NF-08

Do not automatically spend borrowed-device time on TC-11, TC-12, Auth, NF-07, NF-09 or Keyboard Focus.

### iPhone borrowed device
1. exact model/iOS from Settings + Safari/context metadata
2. TC-01
3. TC-02 + NF-01 + NF-02
4. TC-03
5. TC-08 / TC-09 / TC-10
6. NF-05 install/standalone/suppression
7. TC-14 + NF-10
8. NF-08

Do not infer distinct-model count from historical unknown-model iPhone evidence.

## Evidence boundary

This map does not change any PASS/FAIL, device count, defect count, Public Beta, Recruitment or Commercial decision. A fresh device must produce its own traceable physical evidence. QA helpers, CI, source inspection and deployment artifacts are preparation/implementation evidence only. Every FAIL still requires device/OS/browser, steps, expected, actual, screenshot/video where available and severity.