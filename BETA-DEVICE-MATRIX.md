# กินอะไรดี — Beta Device Matrix

ใช้ตารางนี้บันทึกผลทดสอบจริงรายอุปกรณ์ โดยอ้างอิง `BETA-TEST-CASES.md` และ `BETA-NEW-FLOW-TESTS.md`

## Release trace สำหรับรอบนี้
- Current browser/PWA runtime candidate: `a7ca994be76541af57b224c57f267843113df941` — `kinaraidee-beta-v16`; merged/deployed SHA `1d21613c3c7d3e62ed8f7e5c3f00700606129c58`.
- Verified v16 deployment evidence: Pages `32752667752` = SUCCESS, Live Smoke `32752716631` = SUCCESS and read-only diagnostic `32752782165` = SUCCESS.
- Public `release-meta.json` matched SHA `1d21613c3c7d3e62ed8f7e5c3f00700606129c58` with `kinaraidee-beta-v16`; live SW/member-sync/home-surprise v16 contracts were independently confirmed before device acceptance.
- v15 physical Android evidence confirmed Favorite/History **visual differentiation PASS** after a full installed-PWA restart (#172 closed) but exposed a fresh-favorite restart persistence failure (#177 historical v15 FAIL).
- 2026-08-25 physical Android post-v16 evidence confirmed a new favorite survived a full Recent Apps close/reopen with the favorite count retained at 5; #177 is closed completed. This PASS is scoped to the tested Android installed-PWA session.
- iPhone TC-08 pre-fix v14 FAIL remains open in #171; current-v16 physical iPhone retest is still required because deployment/source evidence does not prove Safari geolocation acceptance.
- Historical pre-fix browser/PWA evidence is retained only as scoped historical evidence and is not reused as a current device PASS where runtime behavior changed.
- Current Group API source candidate: PR #93 / `fefc29322ac13f706603bfeb7091d218b8f`, deployed as Supabase ACTIVE version 6 with source/deployment parity. Canonical rejection-only probe `32632951668` = SUCCESS. Backend evidence does **not** create a new device PASS by itself.
- `CURRENT-RUNTIME.md` and `CURRENT-RELEASE.md` are the canonical release-state references when older notes conflict.

> Android evidence below comes from the same physical device/session family only. Device model, Android version and Chrome version were not captured, so those fields remain `not captured` rather than being guessed.

> iPhone evidence below comes from one physical iPhone/Safari session. Exact iPhone model, iOS version and Safari version were not captured, so those fields remain `not captured` rather than being inferred from appearance.

> A PASS below means actual-device evidence was recorded for that scoped behavior. It must not be generalized to another device/browser or to runtime/backend behavior changed later. Empty cells remain untested/unverified.

## Android Chrome

| Device | Android | Chrome | TC-01 | TC-02 | TC-03 | TC-08 | TC-09 | TC-10 | TC-13 | TC-14 | NF-01 | NF-02 | NF-04 | NF-08 | NF-09 | NF-10 | SW/Cache | Notes |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Android #1 | not captured | not captured | PASS | PASS | PASS |  | PASS | PASS | PASS | PASS | PASS | PASS* |  | PASS | INCONCLUSIVE* | PASS | v16 deployed; favorite restart persistence PASS | 2026-08-24 member auth/reset, Surprise, Maps fallback and prior history/favorite behavior were exercised. v15 restart rendered `เมนูโปรด / ประวัติ`, summary counts and explicit Favorite/accepted badges = #172 PASS, while one freshly liked item disappeared across that v15 restart = historical #177 FAIL. On 2026-08-25 after verified v16 deployment, a new favorite `กล้วยปิ้งราดนม` increased favorites 4→5, the installed PWA was fully closed from Recent Apps and reopened without clearing data, and the item plus favorite count 5 remained = #177 post-v16 PASS. |
| Android #2 |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
| Android #3 |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |

## iPhone Safari

| Device | iOS | Safari | TC-01 | TC-02 | TC-03 | TC-08 | TC-09 | TC-10 | TC-13 | TC-14 | NF-01 | NF-02 | NF-05 | NF-08 | NF-09 | NF-10 | Standalone | Notes |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| iPhone #1 | not captured | not captured | PASS | PASS |  | FAIL |  | PASS |  |  | PASS |  |  |  |  |  |  | 2026-08-24 physical Safari run: Home rendered; immediate Surprise returned a usable result; Nearby rendered; Google Maps fallback opened and produced nearby results; local single-device Group flow completed 2/2 and produced a scored group result; member login and logout both PASS. Install guidance was visibly present, but NF-05 suppression/standalone steps were not completed, so NF-05 remains blank. For TC-08, Safari Websites Location was first observed as Never, then changed to While Using; the per-site Location setting was changed from Ask to Allow; after returning/retrying, Kinaraidee still did not retain coordinates and Maps received `ซุปไก่ใส ใกล้ฉัน` rather than numeric coordinates. This is a scoped pre-fix v14 FAIL and current-v16 device retest is still required. |
| iPhone #2 |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |

## iPadOS Safari (ถ้ามีอุปกรณ์)

ใช้ตรวจกรณี Safari รายงานตัวเป็น Mac โดยเฉพาะ NF-05

| Device | iPadOS | Safari | NF-05 | Standalone | Install hint | “เข้าใจแล้ว” suppression | Notes |
|---|---|---|---|---|---|---|---|
| iPad #1 |  |  |  |  |  |  |  |

## Shared functional cases — Android #1 evidence

| Case | Result | Evidence boundary |
|---|---|---|
| TC-04 เลือกใหม่/reroll | PASS | Same-device repeated reroll completed with healthy result UI; exact intermediate count was not independently visible in the final screenshot. |
| TC-05 กินอันนี้ / ประวัติ | PASS | Historical History/stat persistence observed on the same Android session and current v16 restart retained the newly liked row; accepted-meal restart was not separately repeated in the v16 focused retest. |
| TC-06 เมนูโปรด | PASS (v16 restart) | Historical v15 restart FAIL remains recorded. On deployed v16, a fresh favorite was visible immediately, count changed 4→5, then after full installed-PWA close/reopen the same item remained and count stayed 5. Issue #177 closed completed. |
| TC-07 แชร์ | PASS | Share/invite flow was exercised during live-group testing on this Android session family. |
| TC-10 Google Maps / nearby flow | PASS | No-partner fallback continued to Google Maps; the focused Android run showed a menu query carrying numeric coordinates. |
| TC-11 Feedback | PASS | UI success observed and backend row independently confirmed during the historical session. |
| TC-12 Partner application | PASS | Consent + submission succeeded; Supabase independently confirmed `privacy_notice_version='2026-08-21'` and non-null `privacy_acknowledged_at`. |
| TC-15 404 recovery | PASS | Deliberately nonexistent Pages path recovered to usable Kinaraidee home instead of blank/dead 404. |
| NF-03 กลับหน้าแรกแล้วสุ่มใหม่ | PASS | Surprise/result flow was repeated successfully on the same device. |
| NF-06 Offline after update | PASS | Historical offline shell and recommendation worked after prior online use; this is not NF-07 or blanket v16 offline acceptance. |
| NF-07 Update จาก cache รุ่นก่อนหน้าไป `kinaraidee-beta-v16` |  | Still unverified as a full NF-07 acceptance case. The same installed PWA did traverse v15→v16 behavior without clearing data, but exact older-cache baseline marker was not independently captured on-device, so no NF-07 PASS is inferred. |
| NF-09 TalkBack/VoiceOver | INCONCLUSIVE | Earlier TalkBack evidence covered accessible name + button role. Full current assistive-technology acceptance remains open because the test environment did not reliably support external control activation. |

## 2026-08-24 / 2026-08-25 focused cross-platform observations

- Android auth/reset chain: logout → login → forgot password → Supabase reset email → `reset-password.html` → new password (8+ chars) → return to `member.html` → logout → login with new password = **PASS** on the tested Android device.
- Android pre-v15 Favorite persistence: liked counter changed **3 → 4** and History retained the item during that session = scoped historical persistence PASS; it does not erase the later v15 restart failure.
- Android v15 Favorite/History visual differentiation after full PWA restart = **PASS**: heading, summary and `❤️ เมนูโปรด` / `👍 เลือกกิน` badges rendered; Issue #172 closed.
- Android v15 newly liked favorite across full installed-PWA restart = **FAIL** historically: `ข้าวกะเพราหมูสับ` was visible immediately before restart and absent after reopen; this failure led to #177 and the v16 durable outbox fix.
- Android v16 newly liked favorite across full installed-PWA restart = **PASS** on 2026-08-25: `กล้วยปิ้งราดนม` remained after full Recent Apps close/reopen and favorite count remained **5**; Issue #177 closed completed.
- Android Nearby/Maps: Google Maps query included numeric coordinates = fallback with acquired coordinates **PASS**; this does not by itself create a new TC-08 permission-allow PASS.
- iPhone Home + Surprise + Maps fallback + local 2-person Group result + member login/logout = **PASS** in the scopes observed.
- iPhone TC-08 allow path = **FAIL on the pre-fix v14 runtime** after OS/Safari and per-site Location settings were set to allow but Kinaraidee still supplied no numeric coordinates to Maps. Current-v16 physical retest remains required in #171.
- Historical observations remain scoped to their recorded runtime/device context; only the explicit Android v16 favorite-restart result above is promoted to current-v16 device PASS.

## Live-group focused regression — Android #1

- Pre-fix session reached 2/2 votes but final-result button returned home; this was the defect fixed by PR #42.
- Later same-device/session evidence recorded in Issue #5 shows **group 2/2 final result + repeated reroll + handoff to normal result** working.
- Current Group API v6 has source/deployment/rejection-probe evidence, but no new post-v6 real-device Group run is inferred from those automated checks.
- The recorded PASS remains scoped to the tested interaction session and does **not** prove other Android models or iPhone remote/multi-device group behavior.

## สถานะที่ใช้
- `PASS` = ทดสอบจริงและผ่านในขอบเขตที่บันทึก
- `FAIL` = ทดสอบจริงและไม่ผ่าน
- `INCONCLUSIVE` = มีการพยายามทดสอบจริง แต่สภาพแวดล้อม/เครื่องมือทดสอบไม่อนุญาตให้สรุป PASS หรือ FAIL ของแอปอย่างน่าเชื่อถือ
- `N/A` = อุปกรณ์/browser ไม่รองรับกรณีนั้นจริง
- เว้นว่าง = ยังไม่ได้ทดสอบ / หลักฐานไม่พอ

## กฎการปล่อย Beta รอบถัดไป
- Android Chrome อย่างน้อย 3 รุ่นต้องผ่าน core flow — ตอนนี้มีหลักฐาน Android เพียง 1 เครื่อง/session family และ exact model/version ไม่ถูกบันทึก
- iPhone Safari อย่างน้อย 2 รุ่นต้องผ่าน core flow — ตอนนี้มีหลักฐาน iPhone 1 เครื่อง และ exact model/iOS/Safari version ไม่ถูกบันทึก
- New Flow NF-01–NF-10 ต้องมีผลตาม platform ที่เกี่ยวข้อง
- NF-07 ต้องตรวจ upgrade จาก cache รุ่นก่อนหน้าไป `kinaraidee-beta-v16` บนอุปกรณ์จริงอย่างน้อยหนึ่งเครื่องโดยมี baseline ที่ตรวจสอบได้; รอบ v15→v16 นี้ยังไม่ถูกนับเป็น NF-07 PASS เพราะไม่ได้จับ marker เก่าบนอุปกรณ์โดยตรง
- NF-09 ต้องผ่านบน TalkBack/VoiceOver environment ที่ทำงานได้จริง; source/static/synthetic evidence ไม่แทน assistive-tech device acceptance
- v16 merged-main Pages + Live Smoke deployment trace ผ่านแล้ว และ #177 post-v16 Android restart persistence ผ่านแล้วในขอบเขตเครื่องที่ทดสอบ
- iPhone TC-08/#171 ต้องมี focused device retest บน verified deployed v16 ก่อนปิด
- Blocker/Critical ต้องเป็น 0 ก่อน Beta acceptance/เพิ่ม traffic ตาม gate ที่กำหนด
- ทุก FAIL ต้องมี defect/Issue หรือบันทึกเหตุผลที่ตามแก้ได้

ห้ามกรอก PASS จากการคาดเดา, CI/static review เพียงอย่างเดียว, synthetic monitoring, หรือผลของอุปกรณ์คนละเครื่อง
