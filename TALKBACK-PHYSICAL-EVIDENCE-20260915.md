# TalkBack Physical QA Evidence — 2026-09-15

## Scope

This record captures a fresh, user-observed physical TalkBack session for Issue #585 (`A11y: announce toast validation and confirmation messages`).

Evidence is scoped to the exact tested session only. It does not establish another-device PASS, full accessibility conformance, Public Beta completion, affected-iPhone #524/#545 acceptance, Production policy/legal approval, Payment/Premium readiness, or Commercial GO.

## Device / context

- Device: OPPO Reno13 5G
- OS skin/version directly shown in device information during the session: ColorOS 16.0.5
- App context: installed Home Screen PWA
- Assistive technology: TalkBack enabled for the test and disabled again after completion
- Test date: 2026-09-15 Asia/Bangkok
- Browser/PWA runtime lineage at test time: current guarded browser/PWA candidate `91cdf79d221c68ca54e5f874aebe421846264821`, verified deployed descendant `ff975076a643d123081da8ab3e3baf399fdc5f6d`, cache marker `kinaraidee-beta-v16`

The TalkBack spoken-output evidence below is a contemporaneous manual observation reported by the tester during the physical session. No audio/video recording was attached to this repository record. Device information was visually confirmed during the session; exact personal identifiers, serial numbers, precise location, and other unrelated device data are intentionally not retained.

## Observed acceptance sequence

### 1. Entry / accessible control naming

- Home action focused as `ช่วยฉันเลือก ปุ่ม`.
- Activating it opened the Meal step.
- The Meal `ต่อไป` control was exposed as `ต่อไป ปุ่ม`.

This is supporting navigation context only; it is not by itself the Issue #585 acceptance result.

### 2. Meal validation toast

Precondition: no meal selected.

Action: activate `ต่อไป`.

Observed TalkBack announcement:

- `เลือกมื้อก่อนนะครับ`

Focus observation:

- TalkBack focus remained on the `ต่อไป` button.
- No unexpected focus movement was observed.

Result: **PASS** for understandable Meal validation announcement + no unexpected focus movement.

### 3. Repeated identical Meal validation

After the first announcement completed, the tester activated the same `ต่อไป` control again without selecting a meal.

Observed TalkBack announcement:

- `เลือกมื้อก่อนนะครับ สถานะ`

The same validation was announced again as a fresh status announcement.

Result: **PASS** for repeated-identical-toast fresh announcement in this TalkBack session.

### 4. Selection-state supporting observations

- `มื้อกลางวัน` was exposed as a switch-like control.
- After activation, TalkBack announced `เลือกไว้ ... มื้อกลางวัน ... สวิตช์`.
- People-step values and controls were reachable by swipe navigation; selected `1 คน` state was announced.
- A pronunciation observation occurred where Thai `คน` was occasionally heard like `คอนอ`; later values such as `2 คน` / `3 คน` were understandable. This is recorded as a TTS pronunciation observation, not an application accessibility FAIL.

These observations are supporting context and do not broaden the Issue #585 acceptance scope.

### 5. Budget validation toast

Precondition: Meal selected, People step completed, no budget selected.

Action: activate Budget-step `ต่อไป`.

Observed TalkBack announcement:

- `เลือกงบประมาณก่อนนะครับ สถานะ` followed by the `ต่อไป` button context.

Focus observation:

- TalkBack focus remained on the `ต่อไป` button.
- No unexpected focus movement was observed.

Result: **PASS** for understandable Budget validation announcement + no unexpected focus movement.

### 6. Preference-step `ไม่รู้เลย` observation — not the Home Surprise busy-live-region acceptance

The tester focused and activated `ไม่รู้เลย — เลือกให้ฉัน` from the **Preference step**.

Observed result-side speech:

- TalkBack reached the Result screen and announced the Result heading/status context.
- The tester did **not** hear a `กำลังเลือก…` busy utterance in this run.
- The tester did **not** hear a duplicate ordinary-toast announcement during this Preference-step transition.

Post-session source review established an important boundary: the Preference shortcut is bound by `bindPreferenceSurprise()` and calls `startRecommend()` directly. The Home Surprise-specific busy feedback is owned by the separate `runSurprise()` / `setBusy()` / `homeSurpriseStatus` path on `homeSurpriseBtn`.

Therefore this Preference-step observation is **supporting evidence only**. It does not exercise the Home Surprise busy live region and cannot satisfy the remaining Issue #585 criterion requiring the Surprise busy feedback to be checked for duplication against the ordinary toast surface.

Result: **OBSERVED / NOT ACCEPTANCE FOR THE HOME SURPRISE SEPARATION CRITERION**.

Remaining physical check: with TalkBack enabled, activate the actual Home `ไม่รู้เลย — เลือกให้ฉันทันที` control and record whether the Home busy announcement is heard and whether any duplicate ordinary-toast announcement is also heard.

### 7. Representative confirmation toast — Favorite

On Result, TalkBack exposed the Favorite control as `ชอบเมนูนี้ ปุ่ม`.

Action: activate Favorite.

Observed TalkBack announcement:

- `บันทึกเมนูโปรดแล้ว ... สถานะ`
- TalkBack then returned to the `ชอบเมนูนี้` button context.

Result: **PASS** for a representative confirmation toast being announced understandably.

## Issue #585 acceptance summary

- [x] Meal validation toast announced understandably.
- [x] Meal validation did not move focus unexpectedly.
- [x] Budget validation toast announced understandably.
- [x] Budget validation did not move focus unexpectedly.
- [x] Representative Favorite confirmation announced understandably.
- [x] Repeating the same Meal validation produced a fresh announcement.
- [ ] Actual Home Surprise `homeSurpriseBtn` / `homeSurpriseStatus` busy-feedback separation still requires TalkBack physical verification.
- [x] Device/context/assistive-technology mode recorded.

Overall scoped result: **PARTIAL TALKBACK PHYSICAL ACCEPTANCE FOR ISSUE #585 — MEAL/BUDGET/REPEAT/FAVORITE PASS; HOME SURPRISE SEPARATION PENDING**.

## Evidence correction note

An earlier version of this file incorrectly promoted the Preference-step `ไม่รู้เลย` observation to the Issue #585 Surprise-separation PASS. Source review showed that the tested shortcut did not invoke the Home Surprise busy-live-region path. Issue #585 was reopened and this record was corrected rather than preserving an over-broad PASS claim.

## Evidence boundary

This record must not be used to infer:

- TalkBack PASS on another Android device or browser context;
- VoiceOver PASS from this session;
- full WCAG/accessibility conformance;
- Issue #585 complete Physical PASS until the actual Home Surprise separation check is performed;
- Issue #635 screen-reader Physical PASS unless separately tested and recorded;
- affected-iPhone #524/#545 acceptance;
- completion of the broader Android/iPhone device matrix;
- Supabase leaked-password protection PASS;
- Public Beta completion, Payment/Legal readiness, partner/revenue evidence, or Commercial GO.
