# Kinaraidee — Acquisition Readiness Plan

Status: **PREPARED / PAID ACQUISITION NOT YET LAUNCHED**

Date checked: 2026-08-29

## Objective

Prepare a truthful acquisition funnel for “กินอะไรดี” that can start with the free core product and later add Premium/campaign conversion only after the corresponding product, payment and legal gates are real.

## Current truth boundary

- Public product is currently a Web/PWA experience on GitHub Pages.
- Do **not** use App Store / Google Play badges or “ดาวน์โหลดจาก App Store/Google Play” until actual store availability is verified.
- Safe current CTA: **“ลองใช้เลย”**, **“เปิดกินอะไรดี”**, or, where the PWA install guidance is relevant, **“เพิ่มไว้ที่หน้าจอโฮม”**.
- Public campaign page is PRE-LAUNCH only.
- Paid Premium is not approved/active.
- Prize entries are not open and public eligible count remains 0.
- Ordinary account signup is not a prize entry.

## Funnel stages

### Stage A — Core product acquisition (can be prepared now)

Ad promise:
- “วันนี้กินอะไรดี?”
- “ไม่ต้องคิด ให้เราช่วยเลือก”
- “🎲 ไม่รู้เลย — เลือกให้ฉัน”

Landing destination:
- root application URL with campaign attribution parameters once the attribution contract is implemented/approved.

Primary product action:
1. open app
2. tap Surprise or complete guided choice
3. receive a menu result

Do not require account creation before the user experiences the core value.

### Stage B — Account value (after core value is experienced)

Account benefits may include cloud-backed history/favorites and future personalization where implemented/verified.

CTA should describe the real benefit, not the iPhone campaign.

### Stage C — Premium value research / validation

Use the already published research preview and Round-1 interview protocol.

Required order:
1. test meal-choice pain and Premium feature value
2. ask open-ended price
3. test research anchors
4. ask “would you subscribe without the prize?”
5. only then reveal the prize concept

No synthetic participant answers count as research.

### Stage D — Paid Premium acquisition

Blocked until:
- real provider + merchant account selected
- real monthly price approved
- sandbox lifecycle passed
- controlled production payment acceptance passed
- backend-authoritative entitlement is deployed
- cancellation/refund/support terms are ready

Ads can then optimize toward a real Premium activation event, not checkout-page visits alone.

### Stage E — iPhone prize campaign

Blocked until all Campaign gates pass, including competent-authority/legal path, final rules, tax/prize delivery, trusted eligibility/count, kill switch, support and payment readiness.

Only after LIVE:
- public messaging may say entries are open
- counter may display trusted backend aggregate
- creative may use the approved campaign rules/prize wording

## Campaign families to prepare

### C1 — “ไม่รู้จะกินอะไร” problem/solution
Audience insight: decision fatigue at meal time.

Creative hook examples:
- “วันนี้กินอะไรดี?”
- “ถามกัน 10 นาที ยังไม่ได้กินสักที?”
- “คิดไม่ออก กด ‘ไม่รู้เลย’”

Destination: core app.

### C2 — Couple/family/friends decision friction

Hook examples:
- “กินอะไร?” / “อะไรก็ได้…”
- “เลิกเถียงเรื่องมื้อเย็น ให้ระบบช่วยเลือก”

Destination: core/group experience where the actual flow supports the claim.

### C3 — Budget-led choice

Hook:
- “มีงบเท่านี้ มื้อนี้กินอะไรดี?”

Only claim budget behavior that is present in the actual UI.

### C4 — Premium value

Blocked for paid conversion until Premium is real. Research creative can describe concept testing, not sell a subscription.

### C5 — 3,000 Premium prize

PRE-LAUNCH creative must not imply entry is open. LIVE creative requires final legal/rules approval.

## First paid-test structure — when acquisition gate is approved

Start with product-value ads before prize-led ads so conversion quality can be measured independently of the giveaway.

Suggested initial creative cells:

| Cell | Hook | Format | Core variable |
|---|---|---|---|
| A | วันนี้กินอะไรดี? | 9:16 video | direct pain |
| B | อะไรก็ได้…อีกแล้ว? | 9:16 video | social friction |
| C | กด “ไม่รู้เลย” | 9:16 screen-led video | product mechanism |
| D | งบ 100–200 กินอะไรดี? | 9:16 video | budget utility |
| E | วันนี้กินอะไรดี? | 4:5 static/video | Meta feed adaptation |
| F | ไม่ต้องคิด ให้เราช่วยเลือก | 1:1 static/video | reusable control |

Do not declare a winner from impressions/CTR alone. Core success should include downstream product-value behavior.

## KPI hierarchy

### Level 1 — media
- impressions
- reach
- video starts / qualified views where platform-defined
- link clicks
- spend

### Level 2 — landing/product
- landing session
- Surprise tap or guided-choice start
- recommendation result reached
- nearby-restaurant action where relevant
- PWA install prompt/help interaction where implemented

### Level 3 — account
- signup completed
- confirmed/usable account according to actual Auth behavior

### Level 4 — Premium (future)
- checkout initiated
- payment confirmed by trusted provider/backend
- Premium entitlement active
- renewal retained
- cancellation/refund/dispute

### Level 5 — campaign (future)
- technically eligible paid Premium member
- trusted unique eligible count

Never substitute:
- click for signup
- checkout redirect for payment
- account for Premium
- Premium for prize eligibility
- stated interview intent for conversion

## Decision metrics

When real data exists, evaluate creative on:

- cost per qualified product session
- cost per recommendation result
- signup rate after core-value exposure
- Premium activation rate after product/price approval
- first renewal / early cancellation signal
- no-prize retention signal from research

Prize campaign should be evaluated as incremental lift vs a product-value control, not only by gross signup volume.

## Creative production rules

- Design master video at 1080 × 1920 (9:16) for vertical-first reuse.
- Keep important text/UI inside platform-safe zones and preview in each ad manager before launch.
- Make the first 1–2 seconds communicate the meal-choice problem immediately.
- Show actual Kinaraidee UI/mechanism rather than implying unavailable capabilities.
- Use social-first motion/audio for TikTok/Shorts rather than a static poster held on screen.
- Use current CTA “ลองใช้เลย” while the product is Web/PWA only.
- No Apple logo or store badges in prize/product creative unless use is separately approved and truthful.

## Platform-source policy

Platform UI/specs change over time. Re-check official platform creative guidance immediately before trafficking creative. The current production matrix is tracked in `MARKETING-CREATIVE-PRODUCTION-MATRIX.md`.

## Launch gate

Paid acquisition can be split into two approvals:

**Core-product acquisition GO**
- public app runtime stable enough for intended traffic
- required privacy/measurement basis approved
- destination links and creative truthful
- budget owner approved
- media account/billing ready

**Premium/prize acquisition GO**
- requires all additional payment and campaign legal gates

A Core-product GO must never be interpreted as Premium or prize-campaign GO.
