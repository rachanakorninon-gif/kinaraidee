# กินอะไรดี — Social Publishing Evidence Tracker

Status: **TEMPLATE / NO CHANNEL OR POST EVIDENCE RECORDED**

Purpose: keep real channel setup, publishing and performance evidence separate from prepared copy, repository readiness, QA/synthetic activity and first-party measurement capability.

## Current gate boundary

- Public Beta recruitment remains closed until the canonical recruitment gate explicitly opens.
- Prepared social copy/channel setup does not authorize external acquisition publishing.
- First-party acquisition/referral measurement is deployed for its documented account scope.
- Privacy-minimal Product Funnel measurement is deployed for reviewed UTM traffic.
- Measurement capability does **not** mean a social post has been published, a campaign has run, or a real organic conversion exists.
- Internal/admin/QA/synthetic activity must never be copied into real social users, conversion, traction, retention or creative-performance totals.

## Security rule

Never store any of these in this repository:
- passwords
- OTPs
- recovery codes
- access/refresh tokens
- session cookies
- API secrets
- private billing details
- private phone/email credentials

Only public channel/post URLs and non-sensitive operational evidence belong in this tracker.

## Channel registry

Fill only after the real platform/account action succeeds.

| Platform | Final display name | Final handle | Public channel URL | Created/claimed at | Owner/admin evidence | MFA/recovery reviewed | Status |
|---|---|---|---|---|---|---|---|
| Facebook | NOT VERIFIED | NOT VERIFIED | NOT VERIFIED | NOT VERIFIED | PRIVATE / NOT RECORDED HERE | NOT VERIFIED | NOT CREATED/VERIFIED |
| LINE OA | NOT VERIFIED | NOT VERIFIED | NOT VERIFIED | NOT VERIFIED | PRIVATE / NOT RECORDED HERE | NOT VERIFIED | NOT CREATED/VERIFIED |
| TikTok | NOT VERIFIED | NOT VERIFIED | NOT VERIFIED | NOT VERIFIED | PRIVATE / NOT RECORDED HERE | NOT VERIFIED | NOT CREATED/VERIFIED |
| YouTube | NOT VERIFIED | NOT VERIFIED | NOT VERIFIED | NOT VERIFIED | PRIVATE / NOT RECORDED HERE | NOT VERIFIED | NOT CREATED/VERIFIED |

`NOT VERIFIED` must not be replaced by a guessed handle/URL.

## Publishing log

Add one row per actual published item. Prepared drafts do not belong here.

| Internal content ID | Platform | Public post/video ID or URL | Published timestamp + timezone | Copy/creative source | Destination/UTM | Publish status | Evidence note |
|---|---|---|---|---|---|---|---|
| NONE | — | — | — | — | — | NOT PUBLISHED | No real post recorded yet |

Allowed publish status vocabulary:
- `PUBLISHED`
- `SCHEDULED` only when the platform itself confirms a scheduled item
- `REMOVED`
- `FAILED`

Do not use `PUBLISHED` for a local file, draft, upload-in-progress or prepared caption.

## Organic metric snapshot

Record platform-native observed metrics only, with source timestamp.

| Post ID | Observed at | Platform source | Views/impressions | Reach | Likes | Comments | Shares | Link clicks | Notes |
|---|---|---|---:|---:|---:|---:|---:|---:|---|
| NONE | — | — | NOT MEASURED | NOT MEASURED | NOT MEASURED | NOT MEASURED | NOT MEASURED | NOT MEASURED | No published post evidence |

Rules:
- `0` means a real query/read showed zero.
- `NOT MEASURED` means unavailable/not collected.
- Never convert a view, reach or click into a user/signup/Premium count.
- Preserve platform metric definitions; metrics across platforms may not be directly comparable.
- Platform-native metrics are the authority for platform impressions/reach/views/clicks/spend; first-party telemetry is not a substitute for those metrics.

## Paid-media linkage — future only

When a real ad exists, record separately:

| Platform | Campaign ID | Ad set/group ID | Ad/creative ID | Approved budget reference | UTM campaign/content | Spend source | Status |
|---|---|---|---|---|---|---|---|
| NONE | — | — | — | UNSET | — | NOT RUN | NOT LAUNCHED |

Do not store card/bank/payment instrument details.

## First-party conversion linkage — measurement deployed, no social result recorded here

Current measurement authority is split by source:

- Supabase/Auth + acquisition backend: account signup/confirmation and acquisition/referral attribution.
- Product Event backend: privacy-minimal reviewed-UTM browser-session Product Funnel stages.
- Payment provider/backend entitlement: future Premium payment/entitlement truth only after implementation.
- Campaign backend: future prize eligibility truth only after the campaign gate is lawfully LIVE.

Current first-party linkage template:

| Reporting period | Traffic/campaign scope | Measurement source | Landing sessions | Recommendation results | Signups | Confirmed accounts | Premium entitlements | Campaign eligible users | Evidence boundary |
|---|---|---|---:|---:|---:|---:|---:|---:|---|
| NONE | NO EXTERNAL SOCIAL CAMPAIGN RECORDED | Account acquisition + reviewed-UTM Product Funnel are deployed | NOT MEASURED | NOT MEASURED | NOT MEASURED | NOT MEASURED | NOT AVAILABLE | 0 / ENTRIES CLOSED | Measurement exists, but no published social campaign cohort/result is recorded in this tracker |

Truth hierarchy remains:
1. payment provider/backend entitlement for Premium
2. trusted backend campaign truth for eligibility
3. Supabase Auth/account truth for signup/account
4. approved first-party product events for product actions
5. platform reporting for media delivery/clicks

Important interpretation rules:
- Deployed measurement is a **capability**, not a result.
- A controlled synthetic ingress/QA probe is not a real social landing/session/conversion.
- Product browser-session telemetry is not authenticated account identity.
- Signup is not proof of a recommendation result.
- Recommendation result is not signup.
- Confirmed account is not Premium.
- Premium planning/offer view/checkout start is not payment success.
- Premium entitlement is not automatically prize eligibility.

## Incident/correction log

Use when a public post must be corrected/removed.

| Timestamp | Platform/post | Reason | Action | Public correction needed? | Owner evidence | Resolution |
|---|---|---|---|---|---|---|
| NONE | — | — | — | — | PRIVATE / TBD | No incident recorded |

Examples of reasons:
- broken link
- accidental Store availability claim
- accidental Premium/prize LIVE claim
- wrong price/date/count
- accessibility/readability problem
- platform policy issue

## Launch readiness checklist per channel

These items may be completed only from real platform evidence and only when the canonical recruitment gate permits the intended external acquisition action.

- [ ] Public Beta/recruitment gate permits external acquisition publishing
- [ ] real account/channel exists
- [ ] final handle/public URL captured from platform
- [ ] ownership/admin/recovery reviewed privately
- [ ] MFA enabled where available/appropriate
- [ ] profile copy matches `SOCIAL-CHANNEL-LAUNCH-PACK-TH.md` current truth
- [ ] canonical root or safe UTM destination tested
- [ ] no store badge unless listing verified
- [ ] no Premium/prize LIVE claim
- [ ] first post published and public URL recorded
- [ ] comments/replies have a moderation owner before higher traffic
- [ ] first-party account/Product Funnel measurement is checked for the intended UTM cohort without using synthetic/internal data as real results

## Evidence boundary

This template itself creates no channel, ownership, followers, publishing, paid media, traffic, conversion, Premium, partner or prize-entry evidence. Measurement deployment creates no social result by itself. Replace placeholders only from real platform/backend records after the corresponding gate permits the activity.
