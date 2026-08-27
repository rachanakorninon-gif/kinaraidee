# Supabase Plan Decision

Status: **NOT APPROVED**

Purpose: record the explicit business/security decision required before changing the Supabase paid plan or treating plan-gated Auth features as Production Security evidence.

## Decision fields

- Decision owner: **UNSET**
- Security reviewer/approver: **UNSET**
- Billing owner/approver: **UNSET**
- Current plan evidence: **UNSET**
- Target plan: **UNSET**
- Approved monthly/annual cost boundary: **UNSET**
- Required capability: **UNSET**
- Upgrade execution owner: **UNSET**
- Rollback/downgrade consideration: **UNSET**
- Post-change verification plan: **UNSET**
- Evidence location: **UNSET**
- Approved at: **UNSET**

## Current observed blocker

Canonical security evidence currently records the project/organization on the Free plan and `auth_leaked_password_protection` as `Leaked Password Protection Disabled` / WARN. The dashboard evidence states that leaked-password protection requires Pro plan or above.

This record does **not** authorize a paid upgrade and does not authorize changing Supabase Auth configuration.

## Approval requirements

Before changing Status to **APPROVED**:

1. Name a real decision owner, security reviewer, and billing approver.
2. Record the currently observed plan and the explicitly approved target plan.
3. Record an approved cost boundary; do not infer price or budget from documentation or previous conversation.
4. Name the required capability being purchased. For the current blocker this must include leaked-password protection if that remains the reason for the upgrade.
5. Define who is authorized to execute the plan change and what downgrade/rollback considerations apply.
6. Define post-change verification: enable the intended feature through an authorized surface, re-run Security Advisor, and capture evidence that the relevant WARN is gone.
7. Record a traceable evidence location and approval timestamp.

## Evidence boundary

- **APPROVED** would authorize the plan/configuration change only; it would not by itself establish Security PASS.
- Security PASS for leaked-password protection still requires the setting to be enabled and a fresh Security Advisor result showing the WARN removed.
- CI, documentation, GitHub Pages, API deployment parity, Captcha decisions, MFA/rate-limit observations, or repository governance do not replace the post-change Auth evidence.
- No paid-plan purchase, user result, password test, device result, conversion, payment, revenue, Public Beta completion, or Commercial GO is inferred from this decision record.
