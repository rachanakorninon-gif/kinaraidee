# Kinaraidee — Free vs Premium Feature Split

Status: **OWNER-APPROVED BETA V1 PRINCIPLE / EXACT CAPABILITY IMPLEMENTATION PENDING / NO PAYWALL OR PAYMENT PASS IMPLIED**

Owner decision date: **2026-09-07**  
Canonical business baseline: `BUSINESS-COMMERCIAL-BASELINE.md`.

## Product principle

The core promise remains:

> “ไม่รู้จะกินอะไร — ให้กินอะไรดีช่วยเลือกให้”

The core product must remain genuinely usable for Free users. Premium should add recurring intelligence, convenience and personalization rather than make the basic product unusable without payment.

## Approved Free baseline

Free retains at least:
- basic `ไม่รู้เลย` / Surprise recommendation
- basic food recommendation flow
- basic meal/category/budget/preferences that are part of the core experience
- a genuinely useful account/product experience
- enough basic Favorites/History functionality for the core product to remain useful
- basic restaurant discovery when that feature is available

Do **not** introduce a forced paywall after a small number of uses merely to manufacture conversion during the first Beta.

## Approved Premium value direction — THB 59/month

Premium should add recurring value such as:
1. **Enhanced personalization** — the product can learn from user-owned preference/history signals more deeply where implemented.
2. **More useful / expanded Favorites & History** — richer or longer-lived utility than the Free baseline, without promising `unlimited` before a real technical contract exists.
3. **Advanced capabilities** — Premium-only features that are implemented, tested and clearly disclosed before charging.
4. **Ad-free experience if advertising is introduced later** — do not advertise an ad-free advantage as a current difference if the Free product has no ads yet.

The user-facing proposition should remain understandable as “กินอะไรดีรู้จักคุณมากขึ้น” rather than “จ่ายเงินเพื่อปลดล็อกฟีเจอร์หลักที่เคยใช้ได้”.

## Capability matrix — current decision boundary

| Capability | Free | Premium | Current decision |
|---|---|---|---|
| Basic `ไม่รู้เลย` recommendation | Yes | Yes | **Approved** |
| Basic food recommendation | Yes | Yes | **Approved** |
| Basic meal/category/budget preferences | Yes | Yes | **Approved principle** |
| Basic Favorites/History | Yes | Yes | **Approved principle** |
| Enhanced personalization | Basic | Enhanced | **Approved value direction; implementation pending** |
| Expanded/richer Favorites/History | Basic | Enhanced | **Approved value direction; exact limits pending** |
| Advanced Premium capabilities | No/basic | Yes where implemented | **Package direction approved; individual features require implementation validation** |
| Ads if introduced in future | May exist later | Ad-free | **Future conditional benefit** |
| Basic nearby restaurant discovery | Yes where available | Yes | Keep core/affiliate actionability free by default |
| Partner Premium perks | No | Future/conditional | Requires real partner agreement before advertising |

## Candidate advanced capabilities — not guaranteed Beta V1 promises

The following research concepts remain useful candidates but are **not automatically approved as launch commitments** until implementation/product validation confirms them:
- Smart Taste Profile
- Smart No-Repeat / variety ranking
- 3-/7-day Meal Planner
- richer preference memory
- household/group memory
- Premium insights
- partner-specific Premium perks

These should be prioritized by user value and implementation cost, not by the desire to increase the number of Premium bullets.

## Exact-limit rule

Do not publish words such as `unlimited`, a specific Favorites quota, a specific History retention period, or a specific planner capacity until:
- the backend/storage/entitlement contract supports it
- QA can verify it
- Privacy/retention policy is consistent with it
- pricing copy matches the implemented behavior

A temporary product experiment can use a limit, but it must be identified as an experiment rather than silently changing the approved Free core.

## Entitlement/security rule

Do not implement paid access as a browser-only `isPremium=true` switch.

Where Premium capability requires authoritative access control:
- user identity must be verified
- backend/controlled data boundary must verify active entitlement
- browser may render UI state but is not billing truth
- expiry/cancellation/payment-failure behavior must follow `PAYMENT-PREMIUM-DECISION.md`

Capability-level entitlement concepts are preferred where useful so packaging can evolve without one fragile global client flag.

## Upgrade UX rule

Show Premium when its added value is understandable, not as constant interruption.

Before payment, the user must be able to see:
- exact THB 59 price
- billing/renewal behavior for the selected payment method
- included benefits that actually exist
- cancellation behavior
- Privacy/Terms/refund disclosure links

PromptPay must not be described as auto-renew. Card auto-renew must not be described as operational until provider/account-specific recurring-card validation passes.

## Validation / metrics boundary

Useful product questions include:
- Do users understand the Free core quickly?
- Do they return to use `ไม่รู้เลย` again?
- Does enhanced personalization improve repeat usage or satisfaction?
- Which Premium capability produces meaningful interest?
- Do real users complete a THB 59 payment when Production payment is legally/technically ready?
- Do paid users renew and retain?

Survey intent, prototype clicks and sandbox payments are not paid conversion or revenue.

## Boundary

This approved feature-split principle does **not**:
- prove the Premium features are implemented
- enable a paywall
- prove entitlement security
- prove willingness to pay
- prove a transaction, subscriber, conversion, MRR or revenue
- open any prize campaign
- authorize Commercial GO

Implementation, Payment, Legal, QA, Security and Production evidence gates remain separate and mandatory.
