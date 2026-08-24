# Group API Commercial Release Guard Validation

Purpose: exercise the current `main` Group API commercial-release consistency guard through pull-request CI after direct commits `eb585e72e151ede40fa19a68c13ba6bd5974ee12`, `d6d441c2aaf0c3e5613540d335717e916454b561`, and release-baseline sync `adbab6e514bddbed403bdf2ce39d2abbf17cfe4f`.

This file is evidence-only. It does not modify browser/PWA runtime, Group API source, Partner API source, Supabase schema/data/configuration, device results, user data, conversion data, or revenue data.

Expected validation scope:

- `Commercial Release Checklist Consistency` parses Group API source candidate and deployed version from the recorded deployment evidence.
- The recorded Group API candidate must be an ancestor of the PR head.
- No source under `supabase/functions/group-api` may have changed after the recorded deployed candidate without refreshed evidence.
- The Group API deployment/source parity phrase must be checked using the recorded deployed version rather than a hard-coded version.
- Existing Partner API, runtime, Public Beta incomplete, and Commercial NO-GO consistency checks must continue to pass.

Passing CI confirms the guard logic can validate the current repository state. It does not prove branch-protection enforcement, new Group API deployment, real-device acceptance, monitoring/alert delivery, retention approval/cleanup, Public Beta completion, or Commercial GO.
