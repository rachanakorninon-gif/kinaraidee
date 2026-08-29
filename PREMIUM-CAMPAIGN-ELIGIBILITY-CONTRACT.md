# Kinaraidee — Premium Campaign Eligibility & Count Contract

Status: **DESIGN ONLY / NOT LIVE / NO REAL-MONEY AUTHORITY**

Purpose: define the backend truth contract for the “3,000 Premium” campaign without selecting a payment provider, merchant account, Premium price, final entitlement code, campaign dates, winner-selection method, or legal/permit status.

This document is subordinate to `PAYMENT-PREMIUM-DECISION.md`, `PREMIUM-SUBSCRIPTION-ARCHITECTURE.md`, `CAMPAIGN-3000-PREMIUM.md`, and the launch gate in Issue #352. It must not be used to claim that any commercial gate has passed.

## 1. Core rule

A user may count toward the public `eligible_count` only when the backend can prove that **one authenticated human account has one qualifying paid Premium entitlement under the approved campaign rules**.

Browser state, query strings, localStorage, UI buttons, free account creation, analytics events, referral clicks, manually typed IDs, or client-side JavaScript must never create or increase campaign eligibility.

## 2. Authority chain

When the campaign eventually becomes LIVE, the authoritative chain is:

1. Payment provider event / provider state
2. Verified server-side processing (signature + idempotency + reconciliation)
3. Internal `subscriptions` state
4. Internal `member_entitlements` state
5. Campaign eligibility evaluator
6. Aggregate public `eligible_count`

If any earlier authority is unavailable or untrusted, the later campaign result must fail closed rather than assume eligibility.

## 3. PRE-LAUNCH behavior

Before the Payment/Premium and campaign legal gates are approved:

- `campaign_status = prelaunch`
- `entries_open = false`
- `eligible_count = 0`
- `target = 3000`
- no user receives a campaign entry
- account signup alone returns no prize eligibility
- no database row should be created merely to simulate campaign progress

The public landing page may describe the planned mechanics but must not imply that the counter has started.

## 4. LIVE eligibility predicate — conceptual

The exact entitlement/plan values remain decision fields until commercial approval. Once approved, a user is campaign-eligible only if **all** applicable conditions are true at the campaign's approved eligibility checkpoint:

- authenticated Kinaraidee `user_id` exists
- qualifying Premium entitlement exists for that same `user_id`
- entitlement is active according to backend truth
- entitlement originates from a real provider-backed subscription/payment path, not test/local/manual client state
- subscription state is one of the states explicitly approved as eligible
- entitlement has not been revoked by refund, dispute, chargeback, fraud policy, administrative correction, or provider reconciliation
- user is inside the approved campaign participation window/checkpoint
- user is not an internal/test/sandbox account
- user has not already been counted under a duplicate account rule that the final campaign rules prohibit
- any age/residency/identity or other legal eligibility requirements in the final rules are satisfied

If a final rule cannot be evaluated automatically, the system must separate **provisional technical eligibility** from **final prize eligibility** rather than silently treating them as the same thing.

## 5. Counting semantics

### Public milestone count

`eligible_count` means:

> Number of unique `user_id` values that satisfy the approved technical campaign eligibility predicate at the evaluation time.

Required properties:

- unique by backend user identity
- never counts individual payment events
- never counts subscription rows directly if one user can have more than one row
- excludes sandbox/test/internal identities
- excludes revoked/refunded/disqualified entitlements according to the approved rule
- recomputable from authoritative data
- cannot be manually incremented from the browser

Conceptual aggregate only (not migration-ready SQL):

```sql
select count(distinct e.user_id)
from member_entitlements e
join subscriptions s
  on s.id = e.source_subscription_id
 and s.user_id = e.user_id
where e.entitlement_code = :approved_premium_entitlement
  and e.active = true
  and (e.valid_until is null or e.valid_until > :eligibility_checkpoint)
  and s.status = any(:approved_eligible_subscription_states)
  and :campaign_is_live = true
  and :entries_are_open = true;
```

The final implementation must add the approved test/internal/refund/disqualification rules before this aggregate can become public truth.

## 6. Public status endpoint contract

A future public/read-only campaign-status endpoint may expose aggregate campaign state only. It must not expose names, emails, user IDs, payment references, subscription references, IP addresses, device IDs, or entitlement rows.

Recommended response shape:

```json
{
  "campaign_code": "premium-3000",
  "status": "prelaunch",
  "target": 3000,
  "eligible_count": 0,
  "entries_open": false,
  "updated_at": "<server timestamp>"
}
```

### Fail-closed rules

- If the campaign is not LIVE: force `eligible_count` to `0` and `entries_open` to `false`.
- If the backend cannot evaluate trusted entitlement state: do not substitute account totals or cached marketing numbers.
- If the aggregate query fails: return a bounded unavailable/error state rather than a fabricated count.
- Never accept a client-supplied count.

## 7. Authenticated “my eligibility” contract

A future authenticated endpoint may return the requesting user’s own campaign state after verifying identity server-side.

Conceptual response:

```json
{
  "campaign_code": "premium-3000",
  "campaign_status": "prelaunch",
  "entries_open": false,
  "technical_eligibility": "not_started",
  "reason_code": "campaign_not_live"
}
```

When LIVE, bounded reason codes may include examples such as:

- `eligible`
- `no_qualifying_entitlement`
- `entitlement_expired`
- `subscription_not_eligible`
- `campaign_window_closed`
- `review_required`

Do not return raw provider errors or sensitive payment details to the client.

## 8. State separation

The system must keep these concepts distinct:

1. **Premium entitlement** — whether a user currently has the approved Premium capability.
2. **Campaign technical eligibility** — whether backend data satisfies the campaign's automated eligibility rule.
3. **Final prize eligibility** — whether all final legal/rules requirements are satisfied.
4. **Winner selection** — a separate auditable procedure applied only after the approved eligibility population is established.

Premium entitlement must not automatically mean a person is legally eligible to receive a prize unless the final rules explicitly make that true and the required conditions are verified.

## 9. Campaign controls

Before LIVE, backend design must include:

- `campaign_status` with at least `prelaunch`, `live`, `paused`, `closed`
- `entries_open` kill switch independent of marketing page visibility
- approved start/end/checkpoint timestamps
- immutable/auditable change history for campaign status or eligibility-rule configuration
- a safe way to pause new eligibility evaluation without deleting paid Premium entitlements
- no admin function that simply overwrites the public count

If an operational emergency occurs, pausing campaign entries must not revoke legitimate Premium service access.

## 10. Refund / dispute / cancellation boundary

The final approved policy must explicitly define campaign effects of:

- cancellation at period end
- immediate cancellation (if supported)
- payment failure / grace state
- refund before eligibility checkpoint
- refund after eligibility checkpoint
- chargeback/dispute
- provider reversal
- duplicate billing correction

Until those rules are approved, implementation must not guess which subscription states count.

## 11. Idempotency and reconciliation

The campaign evaluator relies on the subscription system’s provider-event idempotency. Replaying a provider event must not create additional entries or inflate `eligible_count`.

At minimum:

- unique `(provider, provider_event_ref)` processing boundary
- unique `(user_id, entitlement_code)` entitlement boundary
- reconciliation procedure between provider subscription truth and internal state
- count recomputation must be stable when the same source events are reprocessed

## 12. Privacy and abuse boundaries

- Public API returns aggregate count only.
- User-specific endpoint requires authenticated identity and returns only that user's bounded status.
- No public enumeration endpoint for eligible users.
- Do not log full webhook payloads, payment credentials, auth tokens, or card data.
- Apply reasonable rate limiting/caching to public status endpoints.
- Prevent cache behavior from exposing authenticated eligibility responses across users.
- Analytics may record campaign page/status interactions but must not be the authority for eligibility.

## 13. Test contract before LIVE

### PRE-LAUNCH

- public count remains exactly 0
- entries remain closed
- ordinary signup produces no campaign eligibility
- fake client values cannot change status/count

### Identity / authorization

- authenticated user can only read their own eligibility state
- user A cannot read user B’s campaign state
- anon cannot access authenticated eligibility details
- browser cannot mutate subscription/entitlement/campaign-count authority

### Count correctness

- one qualifying user with multiple provider events counts once
- duplicate webhook counts once
- two qualifying subscriptions for the same user still count once unless final policy explicitly says otherwise (default is one human/account contribution)
- revoked/refunded/test identities are excluded under approved policy
- recomputation from the same source data gives the same result

### Failure behavior

- database/provider reconciliation failure does not publish a guessed count
- paused/closed campaign does not accept new entries
- campaign pause does not remove Premium service entitlement

### Security

- forged provider event cannot grant entitlement or eligibility
- private payment/service credentials are absent from browser/public repository
- status endpoint exposes no PII

## 14. Implementation gate

This contract may be merged as design documentation now. The following must **not** be implemented as production authority until the relevant decisions are approved:

- provider-specific subscription schema details
- webhook verification logic
- real Premium entitlement creation
- LIVE campaign status
- non-zero public `eligible_count`
- prize-entry creation
- winner-selection execution

No Supabase migration is authorized by this document alone.

## 15. Exit criteria for backend implementation readiness

A future implementation PR can begin only after the minimum decision inputs are recorded and approved:

- real payment provider + merchant/account path
- currency/market and billing cadence
- Premium price
- qualifying entitlement/plan definition
- subscription states that count for campaign eligibility
- refund/dispute/cancellation effect on eligibility
- campaign participation dates/checkpoint
- final rules/legal requirements that affect automated eligibility
- support/reconciliation/incident owners

Even after implementation, the campaign remains PRE-LAUNCH until sandbox tests, security review, production configuration, legal/rules gates, and explicit Commercial/Campaign GO are complete.
