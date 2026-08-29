#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';

const file = process.argv[2] || 'marketing/core-product-copy-th.json';
const raw = fs.readFileSync(path.resolve(file), 'utf8');
const data = JSON.parse(raw);

function fail(message) {
  console.error(`marketing-copy-lint: ${message}`);
  process.exit(2);
}

if (data.status !== 'PRE_LAUNCH_CORE_ONLY') fail('status must remain PRE_LAUNCH_CORE_ONLY');
if (data.locale !== 'th-TH') fail('locale must remain th-TH');
if (data.product !== 'กินอะไรดี') fail('unexpected product name');
if (data.destination !== 'https://rachanakorninon-gif.github.io/kinaraidee/') {
  fail('destination must be the canonical public root PWA');
}

const allowedCtas = new Set(['ลองใช้เลย', 'เปิดกินอะไรดี']);
if (!Array.isArray(data.allowed_ctas) || data.allowed_ctas.length === 0) fail('allowed_ctas is required');
for (const cta of data.allowed_ctas) {
  if (!allowedCtas.has(cta)) fail(`unapproved CTA: ${cta}`);
}

const sections = ['headlines', 'captions', 'short_overlays'];
for (const section of sections) {
  if (!Array.isArray(data[section]) || data[section].length === 0) fail(`${section} must be non-empty`);
}

const ids = new Set();
for (const section of ['headlines', 'captions']) {
  for (const item of data[section]) {
    if (!item || typeof item.id !== 'string' || typeof item.text !== 'string') {
      fail(`${section} entries must contain string id/text`);
    }
    if (!/^[a-z][a-z0-9]{3,15}$/.test(item.id)) fail(`invalid copy id: ${item.id}`);
    if (ids.has(item.id)) fail(`duplicate copy id: ${item.id}`);
    ids.add(item.id);
    if (!item.text.trim()) fail(`empty copy text: ${item.id}`);
  }
}

if (!Array.isArray(data.forbidden_terms) || data.forbidden_terms.length === 0) {
  fail('forbidden_terms must be non-empty');
}

const requiredForbidden = [
  'ดาวน์โหลด', 'โหลดเลย', 'App Store', 'Google Play', 'Premium', 'iPhone',
  'ลุ้น', 'รางวัล', '3,000', 'สมัครสมาชิก', 'ฟรี', 'groupInvite', 'room='
];
for (const term of requiredForbidden) {
  if (!data.forbidden_terms.includes(term)) fail(`missing required forbidden term: ${term}`);
}

const publishableTexts = [
  ...data.allowed_ctas,
  ...data.headlines.map((x) => x.text),
  ...data.captions.map((x) => x.text),
  ...data.short_overlays
];

for (const text of publishableTexts) {
  const lower = text.toLocaleLowerCase('en-US');
  for (const term of data.forbidden_terms) {
    if (lower.includes(String(term).toLocaleLowerCase('en-US'))) {
      fail(`publishable copy contains forbidden term "${term}": ${text}`);
    }
  }
}

const combined = publishableTexts.join('\n');
for (const required of ['วันนี้กินอะไรดี?', 'กด “ไม่รู้เลย”', 'ลองใช้เลย', 'เปิดกินอะไรดี']) {
  if (!combined.includes(required)) fail(`missing required core copy marker: ${required}`);
}

if (combined.includes('http://') || combined.includes('https://')) {
  fail('URLs must not be embedded in publishable copy; use the canonical destination field');
}

console.log(`marketing-copy-lint: PASS (${data.headlines.length} headlines, ${data.captions.length} captions)`);
