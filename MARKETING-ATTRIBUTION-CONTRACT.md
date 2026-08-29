# Kinaraidee — Marketing Attribution Contract

Status: **DESIGN ONLY / MEASUREMENT NOT IMPLEMENTED BY THIS DOCUMENT**

Purpose: define a minimal, privacy-conscious campaign attribution vocabulary before any advertising spend is used for optimization.

## Principles

1. Never fabricate marketing events or conversion counts.
2. Campaign attribution is not payment truth.
3. Payment provider/backend remains the only authority for paid Premium.
4. Campaign technical eligibility remains separate from Premium activation.
5. Do not put personal data in UTM values or event properties.
6. Do not use email, phone, auth token, provider customer/subscription ID, payment reference or full IP address as marketing labels.
7. Measurement implementation requires privacy/legal review appropriate to the actual collection/storage behavior.

## Destination policy

### Core product ads

Base destination:
`https://rachanakorninon-gif.github.io/kinaraidee/`

Do not use a specific `groupInvite=1&room=...` URL for public advertising. A group-room link represents a specific invitation context rather than a public campaign landing page.

### Prize/Premium campaign ads

PRE-LAUNCH information destination:
`https://rachanakorninon-gif.github.io/kinaraidee/campaign-3000-premium.html`

This page is informational while entries are closed. Do not use a PRE-LAUNCH click as an entry or Premium conversion.

### Research recruitment

Destination:
`https://rachanakorninon-gif.github.io/kinaraidee/premium-research-preview.html`

This page is research-only and intentionally does not collect participant responses itself.

## UTM vocabulary

Use lower-case ASCII slugs for stable machine grouping.

### `utm_source`
Allowed initial values:
- `facebook`
- `instagram`
- `tiktok`
- `youtube`
- `organic_social`
- `qr`
- `direct_partner` only after a real partner channel exists

### `utm_medium`
- `paid_social`
- `organic_social`
- `video`
- `creator` only when a real creator placement exists
- `qr`
- `referral`

### `utm_campaign`
Recommended pattern:
`th_<objective>_<concept>_<yyyymm>`

Examples:
- `th_acq_surprise_202609`
- `th_acq_group_202609`
- `th_research_premium_202609`

Prize campaign LIVE naming is reserved until legal/payment GO:
- `th_premium_3000_prize_<yyyymm>`

### `utm_content`
Recommended pattern:
`<format>_<hook>_<variant>`

Examples:
- `v15_todayeat_a`
- `v15_anything_b`
- `v06_surprise_a`
- `img45_budget_a`

### `utm_term`
Leave empty unless a platform/search use case has a reviewed purpose. Never put a person's name/contact detail in it.

## Example core-product URL

`https://rachanakorninon-gif.github.io/kinaraidee/?utm_source=tiktok&utm_medium=paid_social&utm_campaign=th_acq_surprise_202609&utm_content=v15_todayeat_a`

This is a naming example only; it does not prove the current app stores or reports these fields.

## Event taxonomy — future implementation

### Acquisition/session
- `landing_view`
- `surprise_tap`
- `guided_choice_start`
- `recommendation_result_view`
- `nearby_restaurant_tap`
- `pwa_install_help_view`

### Account
- `member_signup_start`
- `member_signup_success`
- `member_login_success`

### Premium — future only
- `premium_offer_view`
- `premium_checkout_start`
- `premium_entitlement_active`

`premium_entitlement_active` may only be emitted/confirmed from backend-authoritative entitlement truth or a downstream analytics job based on that truth. Client checkout redirect is not sufficient.

### Campaign — future only
- `campaign_3000_view`
- `campaign_rules_view`
- `campaign_eligibility_view`

Do not emit a client-side `campaign_entry_created` event as the source of truth. Any reporting of entries/eligible users must derive from the trusted backend campaign model.

## Minimum event properties

Where measurement is approved, prefer:
- event name
- timestamp
- coarse campaign fields (`source`, `medium`, `campaign`, `content`)
- application release/runtime identifier if useful and privacy-approved
- anonymous session/event identifier only if its collection/retention basis is reviewed

Avoid by default:
- full URL with arbitrary sensitive query values
- email/phone/display name
- precise location
- raw user agent unless operationally required and retained appropriately
- authentication/session tokens
- payment identifiers

## Attribution windows

Do not hard-code a business attribution window before campaign objectives and platform reporting are agreed.

For internal product analytics, define separately:
- same-session product-value conversion
- signup conversion
- Premium activation conversion
- renewal/retention cohorts

Platform-reported attributed conversions and first-party product events are not automatically identical and should be labeled separately in reporting.

## Truth hierarchy

For any dashboard/report:

1. **Payment/Premium:** provider + backend entitlement truth
2. **Campaign eligibility:** trusted backend campaign truth
3. **Account:** Supabase Auth/account truth
4. **Product actions:** approved first-party product event collection
5. **Media delivery/clicks:** platform reporting

Never overwrite a higher-authority truth with a lower-authority click/event.

## Creative experiment IDs

Maintain a simple registry before spending:

| ID | Platform | Concept | Format | Hook | Destination | Status |
|---|---|---|---|---|---|---|
| C001 | TikTok | Surprise | 9:16 / 15s | วันนี้กินอะไรดี? | core app | prepared |
| C002 | Meta | Social friction | 9:16 / 15s | อะไรก็ได้… | core app | prepared |
| C003 | YouTube | Surprise | 9:16 / 15s | กดไม่รู้เลย | core app | prepared |

Add actual ad IDs/spend/results only when real campaigns exist.

## Reporting safeguards

A weekly acquisition report must label:
- real date range
- source system for each metric
- spend currency
- whether a metric is observed, modeled, or unavailable
- missing tracking rather than filling gaps with estimates

Until measurement is implemented and verified, use `NOT MEASURED` rather than zero for unknown event counts. Zero means a real query found no qualifying events; it is not a synonym for “we did not measure it.”

## Implementation gate

Before adding event collection to production:
- approve the actual analytics/measurement stack
- review privacy notice and retention impact
- define opt-out/consent behavior where required
- verify no secrets/PII leak into event payloads
- add rate/error handling
- test events against a non-production/controlled campaign
- document data deletion/retention path

This contract alone creates no tracking and no conversion evidence.
