# กินอะไรดี — Distribution Research Snapshot

Date: 2026-09-04 (Asia/Bangkok)

Status: **RESEARCH ONLY / DISTRIBUTION PATH UNSET / NO DEVELOPER-ACCOUNT PURCHASE AUTHORIZED**

เอกสารนี้เตรียมข้อมูลสำหรับ owner decision ว่า first commercial distribution จะคง Web/PWA-only หรือเดิน native store เพิ่มภายหลัง ไม่ใช่การอนุมัติ App Store/Google Play account, store submission, subscription billing, price, Commercial GO หรือค่าใช้จ่ายใด ๆ

## Current project boundary

- Browser/PWA runtime ปัจจุบันมี deployed lineage และ physical evidence หลาย flow แล้ว แต่ Public Beta technical/device gates ยังเปิดตาม Issue #5.
- Commercial Launch Gate Issue #2 ยังเป็น NO-GO.
- Payment provider / merchant / Premium price / entitlement decisions ยังไม่อนุมัติ.
- Native distribution ไม่จำเป็นต่อการปิด Web/PWA physical device matrix ปัจจุบัน.

## Option A — Web/PWA first

### Advantages for current Kinaraidee state
- ใช้ runtime ที่มีอยู่และ evidence lineage เดิม ไม่สร้าง native build/review track ใหม่ก่อน Public Beta gate ปิด.
- สามารถแยก payment-provider decision สำหรับเว็บออกจาก store billing policy ได้.
- ลด account-verification/store-metadata/review/testing dependencies ใน first launch path.
- เหมาะกับการพิสูจน์ demand, retention, Premium willingness-to-pay และ restaurant/affiliate model ก่อนรับ native operational overhead.

### Limits
- ไม่มี App Store / Google Play discovery surface โดยตรง.
- iOS install UX ยังเป็น Add to Home Screen/PWA guidance ไม่ใช่ App Store install.
- Native-only integrations/notifications/OS capabilities ต้องประเมินใหม่ถ้ากลายเป็น product requirement.

## Option B — Native stores in first commercial release

ต้องเพิ่ม decision/work อย่างน้อย: developer account ownership, legal seller identity, native packaging/build pipeline, store metadata/privacy disclosures, policy review, subscription implementation/reconciliation, store review/test track และ release operations สำหรับ native artifacts.

### Apple

Official public facts checked 2026-09-04:
- Apple Developer Program membership: **US$99 per membership year**, local currency where available; price can vary by region.
- Organization enrollment uses a D-U-N-S Number to verify legal entity status; individual enrollment does not require D-U-N-S.
- Standard App Store terms historically include 30% commission for licensed-app sales and 15% for qualifying auto-renewing subscription renewals after more than one year of paid service within a subscription group.
- App Store Small Business Program can reduce commission to 15% for approved qualifying developers under its terms/thresholds; eligibility must be confirmed for the actual account and associated developer accounts.

Official sources:
- https://developer.apple.com/help/account/membership/program-enrollment
- https://developer.apple.com/programs/enroll/
- https://developer.apple.com/help/account/membership/D-U-N-S
- https://developer.apple.com/support/downloads/terms/schedules/Schedule-2-and-3-20251008-English.pdf

Boundary: these are public program terms, not confirmation that Kinaraidee is eligible for Small Business Program, has an Apple account, has paid membership, or has an approved app/subscription.

### Google Play

Official public facts checked 2026-09-04:
- Play Console developer registration: **US$25 one-time** fee for a full developer account.
- New personal developer accounts created after 13 Nov 2023 must complete a closed test with at least **12 testers continuously opted in for at least 14 days** before applying for production access.
- Organization/business accounts require identity/business verification; Google documentation states D-U-N-S is the normal organization verification requirement, with support paths for certain exceptions.
- For subscription products, Google Play documentation lists a **15% subscription service fee** under the standard service-fee model; actual fee treatment can vary by program, market, alternative billing/external offers and policy in force at transaction time.

Official sources:
- https://support.google.com/googleplay/android-developer/answer/6112435
- https://support.google.com/googleplay/android-developer/answer/14151465
- https://support.google.com/googleplay/android-developer/answer/13634885
- https://support.google.com/googleplay/android-developer/answer/112622

Boundary: these are public platform terms, not confirmation of account type, production access, billing eligibility, tax profile, merchant status or final fee for Kinaraidee.

## Native subscription consequence

If Premium digital access is sold inside a native app, store payments/policy cannot be treated as interchangeable with the Web/PWA payment-provider shortlist. Native implementation must separately verify the currently applicable Apple/Google payment rules for the target storefront and app design before submission.

Therefore:
1. `PAYMENT-PROVIDER-RESEARCH-SNAPSHOT.md` remains a Web/PWA payment research input.
2. A later native decision requires store-billing/policy review specific to Apple/Google and the actual account/storefront.
3. Do not combine Stripe/Omise transaction fees with App Store/Play service fees as if both necessarily apply to the same transaction path.

## Project-specific decision framing

### A — Web/PWA first (current preparation recommendation)
Use current browser/PWA runtime to finish Public Beta technical/device gates, validate product demand and choose Premium/payment architecture before adding native store obligations.

### B — Native first/parallel
Choose only if App Store/Google Play presence is itself a first-release requirement worth adding account verification, store testing/review, native build/release operations and store subscription policy work before commercial launch.

This recommendation is **not owner approval**. `OWNER-ROUND-1-DECISION-BRIEF.md` remains the decision surface.

## What must be verified after an owner chooses native

- [ ] Apple/Google account owner identity and account type selected.
- [ ] Developer-account enrollment/fee explicitly approved and paid by the owner.
- [ ] Legal seller/developer display identity confirmed.
- [ ] D-U-N-S/business verification handled if organization account is chosen.
- [ ] Native technical approach/build pipeline selected and reviewed.
- [ ] Store privacy/data-safety metadata mapped to actual Production behavior.
- [ ] Current store payment/subscription policy re-checked at submission time.
- [ ] Sandbox/test purchase, renewal, cancellation, failure, refund and entitlement reconciliation verified.
- [ ] Store review/test-track requirements completed with evidence.
- [ ] Production submission/release explicitly approved.

## Evidence boundary

Public documentation, account-fee research, policy summaries, static native planning, existing Web/PWA physical evidence or CI do not establish native account availability, production access, store review approval, subscription execution, paid users, revenue, Public Beta completion or Commercial GO.