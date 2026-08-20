#!/usr/bin/env node

import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.join(root, '..', 'dist');
const canonicalOrigin = 'https://dmcommunity.org';
const failures = [];

function annotate(message) {
  if (process.env.GITHUB_ACTIONS === 'true') {
    const escaped = message.replace(/%/g, '%25').replace(/\r/g, '%0D').replace(/\n/g, '%0A');
    console.log(`::error title=Invalid site metadata::${escaped}`);
  }
}

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) files.push(...(await walk(full)));
    else if (entry.name.endsWith('.html')) files.push(full);
  }
  return files;
}

function hasCorrectOrigin(value) {
  try {
    return new URL(value).origin === canonicalOrigin;
  } catch {
    return false;
  }
}

for (const file of await walk(distDir)) {
  const html = await readFile(file, 'utf-8');
  const relFile = path.relative(distDir, file);
  const canonical = html.match(/<link[^>]*rel="canonical"[^>]*href="([^"]+)"[^>]*>/i)?.[1];
  if (canonical && !hasCorrectOrigin(canonical)) {
    failures.push(`Canonical URL ${canonical} is outside ${canonicalOrigin}/ (in ${relFile})`);
  }
}

const rssPath = path.join(distDir, 'rss.xml');
const rss = await readFile(rssPath, 'utf-8');
const rssUrls = [...rss.matchAll(/https:\/\/dmcommunity\.org[^<\s]*/g)].map((m) => m[0]);
if (rssUrls.length === 0) failures.push(`RSS feed contains no ${canonicalOrigin} URLs`);
for (const value of rssUrls) {
  if (!hasCorrectOrigin(value)) failures.push(`RSS URL ${value} is outside ${canonicalOrigin}/`);
}

if (failures.length > 0) {
  console.error(`${failures.length} site metadata issue(s) found:`);
  for (const failure of failures) {
    console.error(`  ${failure}`);
    annotate(failure);
  }
  process.exit(1);
}

console.log(`Canonical and RSS URLs use ${canonicalOrigin}/.`);
