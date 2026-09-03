# กินอะไรดี — Beta Device Matrix

ใช้ตารางนี้บันทึกผลทดสอบจริงรายอุปกรณ์ โดยอ้างอิง `BETA-TEST-CASES.md` และ `BETA-NEW-FLOW-TESTS.md`

## Release trace สำหรับรอบนี้
- Current browser/PWA runtime candidate: PR #373 / `6cd98bf2a2020b86fe2ab05e263dd59f7e4fb387` — `kinaraidee-beta-v16`; verified deployed descendant `0cc3ec3ef4dda18f0d8e083d8ca0992ef77f844c`.
- Verified current deployment evidence: Pages `33229525995` = SUCCESS, Auth Password Security Live Smoke `33229548182` = SUCCESS and main Live Smoke `33229548190` = SUCCESS for the current deployed descendant. This deployment PASS is scoped to browser/PWA deployment lineage and source markers only; it does not create current Auth interaction acceptance or a new device PASS.
- Historical PR #201 / `a60318b432598e2eb82e71dcf1a9ec804ff1c4b2` — merged/deployed as `00bdcb7f432d542b732cf355336e9f08798e4320` — remains the exact runtime scope for the recorded PR #201 physical/form evidence below and is not promoted to the current PR #373 Auth acceptance scope.
- Historical PR #179 v16 deployment/device evidence remains scoped support for the member-history/favorite fixes; it is not reused as PR #201 form-submission acceptance.
- v15 physical Android evidence confirmed Favorite/History **visual differentiation PASS** after a full installed-PWA restart (#172 closed) but exposed a fresh-favorite restart persistence failure (#177 historical v15 FAIL).
- 2026-08-25 physical Android post-v16 evidence confirmed a new favorite survived a full Recent Apps close/reopen with the favorite count retained at 5; #177 is closed completed. This PASS is scoped to the tested Android installed-PWA session.
- 2026-08-25 physical iPhone/Safari post-fix evidence confirmed the current-v16 TC-08 Location path: Kinaraidee displayed a persistent successful Location state and Google Maps received the menu name plus numeric coordinates rather than generic `ใกล้ฉัน`; #171 is closed completed. Exact coordinates are intentionally not retained in repository evidence.
- 2026-08-25 physical iPhone/Safari NF-05 evidence confirmed Safari install guidance, Add to Home Screen, standalone launch from the installed icon, standalone hint suppression, and 7-day suppression after `เข้าใจแล้ว` + Safari reload. Scope is iPhone/Safari #1 only; exact device/iOS/Safari versions were not captured.
- 2026-08-26 physical iPhone/VoiceOver NF-09 evidence on deployed PR #201/v16 validated external control activation, Surprise activation, one understandable busy announcement, successful completion, ready-state recovery and a successful second round. Issue #57 is closed completed. Exact iPhone/iOS/Safari-or-PWA versions were not captured.
- Historical pre-fix browser/PWA evidence is retained only as scoped historical evidence and is not reused as a current device PASS where runtime behavior changed later.
- Current Group API source candidate: PR #93 / `fefc29322ac13f7066038a663bfeb7091d218b8f`, deployed as Supabase ACTIVE version 6 with source/deployment parity. Canonical rejection-only probe `32632951668` = SUCCESS. Backend evidence does **not** create a new device PASS by itself.
- `CURRENT-RUNTIME.md` and `CURRENT-RELEASE.md` are the canonical release-state references when older notes conflict.

> Android evidence below comes from the same physical device/session family only. Device model, Android version and Chrome version were not captured, so those fields remain `not captured` rather than being guessed.

> iPhone evidence below comes from one physical iPhone/Safari/installed-PWA session family. Exact iPhone model, iOS version and Safari/PWA version were not captured, so those fields remain `not captured` rather than being inferred from appearance.

> A PASS below means actual-device evidence was recorded for that scoped behavior. It must not be generalized to another device/browser or to runtime/backend behavior changed later. Empty cells remain untested/unverified.

## Android Chrome

| Device | Android | Chrome | TC-01 | TC-02 | TC-03 | TC-08 | TC-09 | TC-10 | TC-13 | TC-14 | NF-01 | NF-02 | NF-04 | NF-08 | NF-09 | NF-10 | SW/Cache | Notes |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Android #1 | not captured | not captured | PASS | PASS | PASS |  | PASS | PASS | PASS | PASS | PASS | PASS* |  | PASS | INCONCLUSIVE* | PASS | v16 deployed; favorite restart persistence PASS | 2026-08-24 member auth/reset, Surprise, Maps fallback and prior history/favorite behavior were exercised. v15 restart rendered `เมนูโปรด / ประวัติ`, summary counts and explicit Favorite/accepted badges = #172 PASS, while one freshly liked item disappeared across that v15 restart = historical #177 FAIL. On 2026-08-25 after verified v16 deployment, a new favorite `กล้วยปิ้งราดนม` increased favorites 4→5, the installed PWA was fully closed from Recent Apps and reopened without clearing data, and the item plus favorite count 5 remained = #177 post-v16 PASS. Earlier Android TalkBack NF-09 follow-up remains INCONCLUSIVE because that environment did not reliably activate external controls. |
| Android #2 |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
| Android #3 |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |

## iPhone Safari

| Device | iOS | Safari | TC-01 | TC-02 | TC-03 | TC-08 | TC-09 | TC-10 | TC-13 | TC-14 | NF-01 | NF-02 | NF-05 | NF-08 | NF-09 | NF-10 | Standalone | Notes |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| iPhone #1 | not captured | not captured | PASS | PASS |  | PASS (v16) |  | PASS |  |  | PASS |  | PASS (v16) |  | PASS (PR #201/v16) |  | PASS | 2026-08-24 physical Safari run: Home rendered; immediate Surprise returned a usable result; Nearby rendered; Google Maps fallback opened and produced nearby results; local single-device Group flow completed 2/2 and produced a scored group result; member login and logout both PASS. Historical TC-08 on pre-fix v14 failed after Location permission changes because Kinaraidee did not retain coordinates and Maps received a generic `ใกล้ฉัน` query. On 2026-08-25 against deployed v16, Kinaraidee showed a persistent successful Location state after `ใช้ตำแหน่งปัจจุบัน`, partner status did not overwrite it, and Google Maps received the menu name plus numeric coordinates = current-v16 TC-08 PASS; Issue #171 closed completed. Exact coordinates are intentionally not retained. NF-05 on the same physical iPhone/Safari session also PASS: install guidance rendered in Safari; Add to Home Screen created the Kinaraidee icon; launch from that icon opened standalone without Safari chrome and preserved account/history state; standalone mode did not show the install hint; after returning to Safari, pressing `เข้าใจแล้ว` and reloading within the suppression window did not show the hint again. On 2026-08-26 VoiceOver environment validation succeeded using Calculator external-control activation; VoiceOver then focused and activated Surprise, announced `กำลังเลือกเมนูอาหารให้ กรุณารอสักครู่` once, reached a result, recovered to ready and completed a second round = NF-09 PASS / Issue #57 closed completed. Exact iPhone/iOS/Safari/PWA versions remain `not captured`. |
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
| TC-11 Feedback | PASS | UI success observed and backend row independently confirmed during the historical session. This does not establish PR #201 failure-recovery acceptance. |
| TC-12 Partner application | PASS | Consent + submission succeeded; Supabase independently confirmed `privacy_notice_version='2026-08-21'` and non-null `privacy_acknowledged_at`. This does not establish PR #201 failure-recovery acceptance. |
| TC-15 404 recovery | PASS | Deliberately nonexistent Pages path recovered to usable Kinaraidee home instead of blank/dead 404. |
| NF-03 กลับหน้าแรกแล้วสุ่มใหม่ | PASS | Surprise/result flow was repeated successfully on the same device. |
| NF-06 Offline after update | PASS | Historical offline shell and recommendation worked after prior online use; this is not NF-07 or blanket v16 offline acceptance. |
| NF-07 Update จาก cache รุ่นก่อนหน้าไป `kinaraidee-beta-v16` |  | Still unverified as a full NF-07 acceptance case. The same installed PWA did traverse v15→v16 behavior without clearing data, but exact older-cache baseline marker was not independently captured on-device, so no NF-07 PASS is inferred. |
| NF-09 TalkBack (Android #1) | INCONCLUSIVE | Earlier TalkBack evidence covered accessible name + button role, but the later environment could not reliably prove external-control activation. This Android result remains INCONCLUSIVE and is not overwritten by the separate iPhone/VoiceOver PASS. |

## 2026-08-24 / 2026-08-26 focused cross-platform observations

- Android auth/reset chain: logout → login → forgot password → Supabase reset email → `reset-password.html` → new password (8+ chars) → return to `member.html` → logout → login with new password = **PASS** on the tested Android device.
- Android pre-v15 Favorite persistence: liked counter changed **3 → 4** and History retained the item during that session = scoped historical persistence PASS; it does not erase the later v15 restart failure.
- Android v15 Favorite/History visual differentiation after full PWA restart = **PASS**: heading, summary and `❤️ เมนูโปรด` / `👍 เลือกกิน` badges rendered; Issue #172 closed.
- Android v15 newly liked favorite across full installed-PWA restart = **FAIL** historically: `ข้าวกะเพราหมูสับ` was visible immediately before restart and absent after reopen; this failure led to #177 and the v16 durable outbox fix.
- Android v16 newly liked favorite across full installed-PWA restart = **PASS** on 2026-08-25: `กล้วยปิ้งราดนม` remained after full Recent Apps close/reopen and favorite count remained **5**; Issue #177 closed completed.
- Android Nearby/Maps: Google Maps query included numeric coordinates = fallback with acquired coordinates **PASS**; this does not by itself create a new TC-08 permission-allow PASS.
- iPhone Home + Surprise + Maps fallback + local 2-person Group result + member login/logout = **PASS** in the scopes observed.
- iPhone TC-08 allow path = **FAIL historically on pre-fix v14**, then **PASS on deployed v16 on 2026-08-25**: Kinaraidee obtained Location, preserved a persistent success state while partner search status remained separate, and Google Maps received the menu name plus numeric coordinates. Issue #171 closed completed; exact coordinates are intentionally not retained.
- iPhone NF-05 install guidance = **PASS on deployed v16 on 2026-08-25 for iPhone/Safari #1**: guidance appeared in Safari, Add to Home Screen succeeded, installed launch was standalone, the install hint was suppressed in standalone, and `เข้าใจแล้ว` suppression survived a Safari reload within the 7-day window.
- iPhone NF-09 VoiceOver = **PASS on deployed PR #201/v16 on 2026-08-26 for iPhone #1**: external Calculator control activation was confirmed first; VoiceOver focused/activated Surprise, announced one understandable busy message, the result completed, state recovered to ready and a second round started/completed. Issue #57 closed completed. This does not create Android TalkBack PASS.
- Historical observations remain scoped to their recorded runtime/device context; the explicit Android v16 favorite-restart, iPhone v16 Location, iPhone v16 NF-05 and iPhone PR #201/v16 NF-09 results above are the physical-device promotions in this matrix.

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
- New Flow NF-01–NF-10 ต้องมีผลตาม platform ที่เกี่ยวข้อง; NF-05 และ NF-09 ผ่านแล้วเฉพาะ iPhone #1 ใน scope ที่บันทึก และไม่แทน iPadOS/Android TalkBack/อุปกรณ์อื่น
- NF-07 ต้องตรวจ upgrade จาก cache รุ่นก่อนหน้าไป `kinaraidee-beta-v16` บนอุปกรณ์จริงอย่างน้อยหนึ่งเครื่องโดยมี baseline ที่ตรวจสอบได้; รอบ v15→v16 ที่มีอยู่ยังไม่ถูกนับเป็น NF-07 PASS เพราะไม่ได้จับ marker เก่าบนอุปกรณ์โดยตรง
- NF-09 assistive-technology acceptance = **PASS สำหรับ iPhone/VoiceOver #1 บน PR #201/v16**; Android TalkBack #1 ยังคง INCONCLUSIVE และ PASS นี้ไม่ขยายไปยังอุปกรณ์อื่น
- Current PR #373 browser/PWA deployment trace ผ่านแล้วในขอบเขต deployment/source-marker เท่านั้น; historical #177 Android restart persistence PASS, #171 iPhone Location PASS, NF-05 iPhone/Safari #1 PASS และ #57 iPhone/VoiceOver NF-09 PASS ยังคงถูกบันทึกตาม runtime/device scope เดิม และไม่ถูกเลื่อนเป็น current PR #373 Auth acceptance
- ยังต้องมี iPhone Safari เครื่องที่ 2 และ Android เพิ่มเพื่อครบ device-count gate; PASS ของ iPhone #1 ไม่ถูกขยายไปยังเครื่องอื่น
- PR #201 Feedback/Partner real interaction/recovery acceptance ยังต้องทดสอบแยก; deployment/static evidence ไม่แทน physical interaction
- `Blocker = 0` / `Critical = 0` ต้องมาจาก release-scoped defect evidence ก่อน Beta acceptance/เพิ่ม traffic; การไม่มี defect report หรือมีเพียง CI/static/synthetic evidence ไม่ใช่ zero-defect PASS
- ทุก FAIL ต้องมี defect/Issue หรือบันทึกเหตุผลที่ตามแก้ได้

ห้ามกรอก PASS จากการคาดเดา, CI/static review เพียงอย่างเดียว, synthetic monitoring, หรือผลของอุปกรณ์คนละเครื่อง