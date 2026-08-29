# กินอะไรดี — Social Publishing Evidence Tracker

Status: **TEMPLATE / NO CHANNEL OR POST EVIDENCE RECORDED**

Purpose: keep real channel setup, publishing and performance evidence separate from prepared copy.

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

## Paid-media linkage — future only

When a real ad exists, record separately:

| Platform | Campaign ID | Ad set/group ID | Ad/creative ID | Approved budget reference | UTM campaign/content | Spend source | Status |
|---|---|---|---|---|---|---|---|
| NONE | — | — | — | UNSET | — | NOT RUN | NOT LAUNCHED |

Do not store card/bank/payment instrument details.

## First-party conversion linkage — future only

Only after approved measurement is implemented:

| Reporting period | Measurement source | Landing sessions | Recommendation results | Signups | Premium entitlements | Campaign eligible users | Evidence boundary |
|---|---|---:|---:|---:|---:|---:|---|
| NONE | NOT IMPLEMENTED | NOT MEASURED | NOT MEASURED | NOT MEASURED | NOT AVAILABLE | 0 / ENTRIES CLOSED | No production attribution implemented |

Truth hierarchy remains:
1. payment provider/backend entitlement for Premium
2. trusted backend campaign truth for eligibility
3. Supabase Auth/account truth for signup/account
4. approved first-party product events for product actions
5. platform reporting for media delivery/clicks

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

## Evidence boundary

This template itself creates no channel, ownership, followers, publishing, paid media, traffic, conversion, Premium, partner or prize-entry evidence. Replace placeholders only from real platform/backend records.
