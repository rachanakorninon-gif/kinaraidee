#!/usr/bin/env node

const BASE = 'https://rachanakorninon-gif.github.io/kinaraidee/';
const allowedSources = new Set(['facebook', 'instagram', 'tiktok', 'youtube', 'organic_social', 'qr']);
const allowedMediums = new Set(['paid_social', 'organic_social', 'video', 'qr', 'referral']);
const slugPattern = /^[a-z0-9][a-z0-9_-]{0,79}$/;

function fail(message) {
  console.error(`marketing-url-builder: ${message}`);
  process.exit(2);
}

function parseArgs(argv) {
  const out = {};
  for (let i = 0; i < argv.length; i += 2) {
    const key = argv[i];
    const value = argv[i + 1];
    if (!key?.startsWith('--') || value == null || value.startsWith('--')) {
      fail('arguments must be provided as --key value pairs');
    }
    out[key.slice(2)] = value;
  }
  return out;
}

function cleanSlug(label, value, { required = true } = {}) {
  if (!value) {
    if (required) fail(`${label} is required`);
    return null;
  }
  if (!slugPattern.test(value)) fail(`${label} must be a lower-case ASCII slug (max 80 chars)`);
  if (value.includes('groupinvite') || value.includes('room')) fail(`${label} contains a reserved group-invite term`);
  return value;
}

const args = parseArgs(process.argv.slice(2));
const source = cleanSlug('source', args.source);
const medium = cleanSlug('medium', args.medium);
const campaign = cleanSlug('campaign', args.campaign);
const content = cleanSlug('content', args.content);
const term = cleanSlug('term', args.term, { required: false });

if (!allowedSources.has(source)) fail(`unsupported or not-yet-approved source: ${source}`);
if (!allowedMediums.has(medium)) fail(`unsupported or not-yet-approved medium: ${medium}`);
if (medium === 'referral' && source !== 'qr') fail('referral medium is reserved until a real reviewed referral/partner channel exists');
if (campaign.includes('prize') || campaign.includes('premium_3000')) {
  fail('prize/Premium-3000 campaign links remain blocked while the campaign is PRE-LAUNCH');
}

const url = new URL(BASE);
url.searchParams.set('utm_source', source);
url.searchParams.set('utm_medium', medium);
url.searchParams.set('utm_campaign', campaign);
url.searchParams.set('utm_content', content);
if (term) url.searchParams.set('utm_term', term);

if (url.origin !== 'https://rachanakorninon-gif.github.io' || url.pathname !== '/kinaraidee/') {
  fail('destination escaped the canonical public root');
}
if (url.searchParams.has('groupInvite') || url.searchParams.has('room')) {
  fail('public acquisition URL must never include group-invite room parameters');
}

console.log(url.toString());
