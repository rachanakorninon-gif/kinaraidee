# Auth Captcha Integration Decision

Status: **NOT APPROVED**

This record governs whether Kinaraidee should enable Supabase Auth Captcha for public authentication flows. It exists to prevent enabling server-side Captcha before the browser client is wired to obtain and submit a valid Captcha token.

## Decision fields
- Decision owner: **UNSET**
- Security reviewer/approver: **UNSET**
- Captcha provider: **UNSET**
- Approved environment: **UNSET**
- Public site-key/config reference: **UNSET**
- Signup integration plan: **UNSET**
- Login integration plan: **UNSET**
- Password-recovery integration plan: **UNSET**
- Accessibility/fallback plan: **UNSET**
- Abuse-risk rationale: **UNSET**
- Privacy/Terms disclosure reference: **UNSET**
- Real-device acceptance evidence location: **UNSET**
- Approved at: **UNSET**

## Current state
- Captcha is intentionally not treated as ready for enablement while the client lacks Captcha widget/token wiring.
- Existing Auth rate limits, MFA/session settings, RLS evidence, repository CI, and deployment evidence do not prove Captcha integration readiness.
- Enabling Captcha server-side before client support can break signup/login/password-recovery flows.

## Approval requirements
Changing this record to **APPROVED** requires every decision field above to be resolved with real, reviewable values. Approval only authorizes implementation and controlled validation. It does not prove Captcha works on real devices and does not establish Public Beta completion or Commercial GO.

## Execution evidence requirements
Before enabling Captcha in Production, implementation evidence must show that each applicable auth flow obtains and submits the provider token correctly and that failure/retry behavior is usable. Real-device acceptance must include supported mobile browsers and accessibility/fallback behavior. After server-side enablement, auth regression must be re-run and evidence captured separately.

## Evidence boundary
No Captcha provider, site key, user result, device result, security PASS, Public Beta completion, or Commercial GO is asserted by this decision document. Secrets must never be committed to the repository.
