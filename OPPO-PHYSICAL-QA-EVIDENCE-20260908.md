# OPPO Reno13 5G — Physical QA Evidence — 2026-09-08

## Scope

This document records user-assisted real-device QA on the traced **OPPO Reno13 5G (CPH2689)** installed standalone PWA session on 2026-09-08 Asia/Bangkok.

Device/session context retained from the traced OPPO QA lineage:
- Device: OPPO Reno13 5G (CPH2689)
- OS: Android 16 / ColorOS 16.0.5
- Browser lineage: Chrome 152.0.7977.64 from the traced device context; the version screen was not reopened during this 2026-09-08 continuation
- App context: installed standalone PWA
- Current canonical browser/PWA runtime candidate: `d24824948c9df1808178b9bb5a78a8f885086fb4`
- Verified deployed descendant: `f6b8598597edd874e69cbfe1dae941c919aaa037`
- PWA cache marker: `kinaraidee-beta-v16`
- Pages `34161708724` and main Live Smoke `34161744258` are deployment evidence only; the results below come from physical interaction

Exact coordinates, contact names shown by Android Share Sheet, account identifiers, tokens and browser-storage payloads are intentionally not retained here.

## Physical results

### Issue #552 / TC-03 — soup/stew preference classification

Fresh affected-device retest after the deployed follow-up classification remediation:

1. `แกงฮังเล` — PASS as intended soup/curry-class result
2. `ต้มข่าไก่` — PASS as intended soup/boiled-class result
3. `คิมชีจีแก` — PASS as intended soup/stew-class result

All three Result screens showed the scoped reason `เลือกจากความชอบ: ซุป`. No recurrence of the prior false positives `ผัดพริกแกง...` or `ตำแตงไข่ต้ม` was observed in this retest.

Result: **TC-03 scoped Physical PASS; Issue #552 closed completed**.

Evidence boundary: three successful physical rounds establish the affected OPPO regression acceptance only. They do not prove every possible menu classification or another device/browser.

### TC-08 — Location Allow with fresh permission grant

The prior site permission was removed from Chrome site Location settings so the app had to request permission again.

Observed sequence:
1. Opening Nearby before requesting Location showed the normal no-partner / Maps fallback state.
2. Tapping `ใช้ตำแหน่งปัจจุบัน` produced a fresh Android/Chrome permission prompt for `rachanakorninon-gif.github.io`.
3. Precise Location was selected and `อนุญาตขณะเข้าชมเว็บไซต์` was granted.
4. The first acquisition attempt timed out and the app showed an understandable timeout/fallback message without crash or blank state.
5. A second `ใช้ตำแหน่งปัจจุบัน` attempt, with no permission/configuration change, succeeded and displayed `ได้ตำแหน่งแล้วและบันทึกคำขอเรียบร้อย — กำลังหาร้านใกล้คุณ...`.

Result: **TC-08 Location Allow = Physical PASS** for this traced OPPO scope.

The first timeout is retained as an observation, not a regression FAIL, because permission was granted correctly, fallback remained usable and an immediate retry acquired Location successfully.

### TC-10 — Google Maps fallback after successful Location

From the successful Nearby state for menu `ไก่ทอด`, tapping Google Maps opened the Android Google Maps app with the query `ไก่ทอด ใกล้ฉัน`.

Observed physical behavior:
- search results and map rendered
- a nearby restaurant result could be opened
- current position could be used as route origin
- driving directions calculated successfully
- no stuck loading state, app crash or blank handoff was observed

Result: **TC-10 Google Maps fallback = Physical PASS** for this OPPO scope.

This Android evidence does not close or broaden the separate affected-iPhone Issue #524 scope.

### Favorites / History persistence across full PWA restart

Baseline History screen initially showed `เมนูโปรด 0` and `เลือกกิน 0`.

Favorite persistence sequence:
- a fresh menu `น้ำตกหมู` was saved as Favorite
- History showed `เมนูโปรด 1`
- the installed PWA was fully dismissed from Recent Apps
- reopening from the PWA icon and returning to History still showed `เมนูโปรด 1` with `น้ำตกหมู` and the original timestamp

Accepted-meal persistence sequence:
- a fresh Surprise result `ข้าวยำไก่แซ่บ` was accepted with `กินอันนี้`
- History showed `เลือกกิน 1`
- the PWA was fully dismissed from Recent Apps again
- after reopening from the PWA icon, History still showed both `น้ำตกหมู` as Favorite and `ข้าวยำไก่แซ่บ` as accepted meal with their original timestamps

Result: **Favorite + History persistence across full installed-PWA restart = Physical PASS** for this OPPO scope.

### Local Group mode regression

A 2-person local Group flow was exercised on the same physical device.

Per-member state isolation:
- clean Group flow started with 2 people / lunch
- member 1 selected `ข้าว`
- after saving member 1, member 2 opened with no option preselected
- member 1 selection therefore did not leak into member 2 state

Result calculation:
- member 2 selected `เส้น`
- `รวมคะแนนแล้วเลือกเมนู` produced `ก๋วยเตี๋ยวหมูน้ำใส`
- Result showed 2 people and total preference score `1` from 2 members

Reroll:
- `เลือกอีกเมนูจากคะแนนเดิม` produced `ข้าวไข่ข้นจานเล็ก`
- 2-person context and score `1 จาก 2` remained intact without restarting member selection

History handoff:
- choosing `กินอันนี้` from the Group result opened the normal Result while preserving `2 คน` and `เมนูที่กลุ่มช่วยกันเลือก`
- accepting `กินอันนี้` from the normal Result added `ข้าวไข่ข้นจานเล็ก` to History and increased `เลือกกิน` from 1 to 2

Share / cancel recovery:
- a fresh Group result `ข้าวไข่ดาวไส้กรอก` opened Android Share Sheet successfully with a preview of the group result
- cancelling Share returned to the same Group result with 2-person context, score and controls intact
- contact names shown by the operating-system Share Sheet are not retained in repository evidence

Full restart recovery:
- after the Group flow, the installed PWA was fully dismissed from Recent Apps and reopened from its icon
- Home V3 opened normally rather than restoring a stale Group result/member-selection state

Result: **local single-device Group flow = scoped Physical PASS** for member-state isolation, result calculation, reroll, History handoff, Android Share Sheet opening/cancel recovery and post-restart Home recovery.

Evidence boundary: this does not establish remote/multi-device Group synchronization, another Android model, iPhone Group behavior or backend traffic/alerting readiness.

## Current OPPO scoped status after this run

Physical PASS evidence now includes, in the recorded OPPO lineage:
- Issue #551 Home bottom-nav remediation — PASS / closed (recorded earlier)
- TC-02 Surprise — PASS
- TC-03 guided `ซุป/ต้ม` remediation retest — PASS / #552 closed
- TC-08 Location Allow fresh permission — PASS
- TC-09 Location Deny — PASS
- TC-10 Google Maps fallback — PASS
- TC-13 PWA reopen — PASS
- TC-14 Offline shell — PASS
- NF-01 Surprise one-tap — PASS
- NF-02 duplicate guard — PASS
- NF-07 v15→v16 upgrade — historical scoped PASS
- NF-08 interrupted recovery — PASS
- NF-10 online recovery — PASS
- Favorite/History full-restart persistence — PASS
- local Group regression set described above — PASS

Android TalkBack NF-09 remains separate/inconclusive and is not promoted by this run.

## Release boundary

This evidence improves the traced OPPO physical-acceptance coverage only.

It does **not** close:
- the minimum distinct Android-device count gate
- the minimum distinct iPhone-device count gate
- affected iPhone Issues #524/#545
- remaining TC/NF matrix gaps on other devices/platforms
- leaked-password protection/security configuration gaps
- Public Beta completion
- Privacy/Legal approval
- Payment/Premium readiness
- Commercial GO

Public Beta remains **NOT COMPLETE** and Commercial remains **NO-GO** until their independent evidence gates are satisfied.
