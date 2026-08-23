# Kinaraidee — Supabase Backup / Recovery Capability Evidence

Evidence date: 2026-08-23

Status: **PLAN CAPABILITY VERIFIED / BACKUP EXECUTION + RESTORE DRILL NOT VERIFIED**

This record captures the backup/recovery capability that can be established from the connected project plan, current database inspection and current Supabase documentation. It does not claim that a usable off-site backup exists or that restoration has been tested.

## Connected project state

Previously connected management evidence for the Kinaraidee Supabase organization records the current plan as **Free**.

A fresh read-only database inspection on 2026-08-23 observed:

- current database size: approximately **11 MB** (`12,012,691` bytes at observation time);
- migration records: **33**;
- latest applied migration at observation time: `20260823141156`.

These values are sizing/recovery-baseline observations only. Database size and row contents can change after this evidence was captured.

## Provider capability for the observed plan

Current Supabase `Database Backups` documentation states:

- automatic daily backups are provided for **Pro, Team and Enterprise** projects;
- Pro can access the last 7 days of daily backups, Team 14 days, Enterprise up to 30 days;
- Free tier projects are recommended to regularly export their data with `supabase db dump` and keep off-site backups;
- PITR is an add-on for Pro, Team and Enterprise and requires at least Small compute.

Reference: `https://supabase.com/docs/guides/platform/backups`

Therefore the current Free-plan project must **not** rely on an assumed provider daily-backup retention window for the Commercial recovery gate. The safe current interpretation is that an explicit logical-export/off-site-backup process is required unless the plan/configuration is deliberately changed and then re-verified.

## Commercial-ready choices

Before Commercial GO, choose and verify one of these paths:

### Path A — remain on Free for the relevant stage

- define an authorized environment that can run `supabase db dump` / PostgreSQL logical dump without exposing credentials;
- define an actual schedule and off-site destination;
- encrypt/protect backup material according to the data it contains;
- record retention and deletion for backup files;
- verify at least one produced backup artifact;
- restore that artifact into a safe non-production target and measure recovery duration/data validation.

### Path B — move to a paid backup capability

- authorize the plan/configuration change separately;
- verify the actual project plan after change;
- inspect the Dashboard/Management surface for available backup recovery points and retention;
- if PITR is selected, verify the enabled recovery window and billing/compute configuration;
- perform a safe restore/recovery drill and record measured evidence.

No paid-plan change is authorized by this document.

## Minimum recovery validation after a real backup exists

A restore drill should verify at least:

- expected schema/migration lineage;
- important constraints and RLS remain present;
- non-sensitive row-count/smoke checks for critical data classes;
- application read paths in the safe recovery environment;
- measured start-to-ready recovery time;
- actual backup age at drill start so an observed recovery-point loss window can be recorded rather than guessed.

Do not publish backup contents, database credentials, access tokens or personal data in GitHub evidence.

## Current gap

The project now has plan-aware backup capability evidence, but still lacks:

- a verified current backup artifact/off-site schedule;
- approved backup-file retention;
- a real restore/recovery drill;
- measured recovery duration and observed data-loss window;
- confirmed Production recovery owner.

Accordingly, Operations readiness remains **PROCEDURE/CAPABILITY PREPARED — EXECUTION NOT VERIFIED**.
