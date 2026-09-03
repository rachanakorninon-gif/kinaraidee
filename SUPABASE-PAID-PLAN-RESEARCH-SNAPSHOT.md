# กินอะไรดี — Supabase Paid-Plan Research Snapshot

Date checked: 2026-09-04 (Asia/Bangkok)

Status: **RESEARCH ONLY / CURRENT PROJECT REMAINS FREE / NO BILLING OR CONFIG CHANGE AUTHORIZED**

เอกสารนี้ใช้ประกอบ Round 1 owner decision เรื่อง paid-plan dependency สำหรับ Supabase Auth leaked-password protection เท่านั้น ไม่ใช่ invoice/quote สำหรับบัญชีจริง และไม่อนุมัติการอัปเกรด plan, PITR หรือ production Auth configuration.

## Current project boundary

- Current Kinaraidee organization/project plan has previously been verified as **Free** in the current security evidence path / Issue #372.
- Leaked-password protection remains **NOT PASS / BLOCKED BY CURRENT FREE PLAN** until a supported paid plan is explicitly approved, enabled and physically/backend verified.
- Successful signup/sign-in/reset/email-confirmation evidence does not establish leaked-password rejection.

## Official public pricing/capability snapshot

Supabase public pricing and Auth documentation checked on 2026-09-04 state:

### Free
- $0/month.
- 50,000 MAUs included.
- Automatic backups: not included.
- Leaked password protection: not included.

### Pro
- Starts from **US$25/month**.
- First project included.
- Public pricing states paid plans include **US$10/month compute credits**, enough to cover one Micro instance in the published example.
- 100,000 MAUs included, then $0.00325 per MAU under the published pricing table.
- Daily backups stored for 7 days.
- 7-day API/database log retention.
- Leaked password protection: included.
- Supabase pricing states the Pro spend cap is enabled by default for cost control; actual post-upgrade setting must still be verified on the real organization.

For the public calculator example with one Micro project, Supabase shows: Pro $25 + Micro compute $10 - $10 compute credit = **$25 total before usage overages/add-ons/tax**. This is a public pricing example, not a Kinaraidee invoice or guaranteed final charge.

## Leaked-password feature dependency

Supabase Auth documentation states leaked-password protection uses the HaveIBeenPwned Pwned Passwords API and is available on **Pro Plan and above**.

Therefore the current minimum planning implication is:
- A Pro-level plan is the published feature tier required to make the setting available.
- Paying for Pro alone does **not** create a security PASS.
- After any explicitly authorized upgrade, the setting must be enabled through the supported Auth configuration path and verified with acceptable-password success plus leaked/weak-password rejection and a fresh Security Advisor/configuration check.

## Backups: benefit but separate evidence gate

Pro public pricing includes daily backups with 7-day retention. This improves the provider-managed backup capability relative to the current Free-plan boundary, but an upgrade alone does not establish restore/recovery PASS. Operations still requires an approved backup posture and an actual restore/recovery drill with measured evidence.

## PITR is a separate optional cost

Point-in-Time Recovery is **not required merely to enable leaked-password protection**.

Current Supabase public pricing shows PITR as an add-on starting around:
- 7-day retention: ~$100/month
- 14-day retention: ~$200/month
- 28-day retention: ~$400/month

Supabase docs also state PITR projects must use at least a Small compute add-on. A published billing example for one Pro project with Small compute and 7-day PITR shows $25 Pro + $15 Small compute + $100 PITR - $10 compute credit = **$130/month** before other usage/tax.

Do not treat this PITR example as required for the Auth blocker. PITR remains a separate Operations/backup decision requiring explicit approval.

## Owner decision framing

### A — Keep Free through Beta (current recommendation)
- Current device QA, NF-07 and Keyboard Focus can continue without paid-plan change.
- Keep leaked-password protection visibly blocked/not passed.
- Revisit paid plan before Commercial security sign-off if the requirement remains.

### B — Authorize paid-plan work earlier
- Published minimum plan tier for leaked-password protection is Pro.
- Public plan pricing starts at $25/month, but actual invoice can change with compute choice, usage, add-ons, taxes and currency/card treatment.
- Before any change: capture current Auth password-strength/configuration state.
- After change: enable the feature and rerun scoped Auth/security verification.

This document does not choose A or B. Owner approval remains required.

## Official sources checked

- https://supabase.com/pricing
- https://supabase.com/docs/guides/auth/password-security
- https://supabase.com/docs/guides/platform/backups
- https://supabase.com/docs/guides/platform/manage-your-usage/point-in-time-recovery

## Evidence boundary

Public pricing/docs do not establish the actual Kinaraidee invoice, billing approval, plan change, spend-cap state, PITR configuration, backup restore success, leaked-password setting, rejection behavior, Security Advisor PASS, Public Beta completion or Commercial GO. No paid-plan or production configuration action may be taken without explicit owner authorization.