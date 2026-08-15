#!/usr/bin/env node
// Crawls the built dist/ output for broken links: internal links that don't
// resolve to a file in dist, legacy-domain links that would break after the
// WordPress site is retired, and optionally external links that fail to load.
// Run after `npm run build`. Exits non-zero if anything is broken.
//
// Usage: node scripts/check-links.mjs [--external] [--concurrency=8]

import { readdir, readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.join(root, '..', 'dist');
const base = '/dm-community';
const legacyHosts = new Set(['dmcommunity.org', 'www.dmcommunity.org']);

function stripBase(href) {
  if (base !== '/' && href.startsWith(base)) {
    const stripped = href.slice(base.length);
    return stripped.startsWith('/') ? stripped : `/${stripped}`;
  }
  return href;
}

function isLegacyLink(href) {
  try {
    return legacyHosts.has(new URL(href).hostname.toLowerCase());
  } catch {
    return false;
  }
}

const args = process.argv.slice(2);
const checkExternal = args.includes('--external');
const concurrencyArg = args.find((a) => a.startsWith('--concurrency='));
const concurrency = concurrencyArg ? Number(concurrencyArg.split('=')[1]) : 8;

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

function extractLinks(html) {
  // Canonical and preconnect tags are metadata rather than navigable content
  // links, so exclude them from the crawler.
  const cleaned = html
    .replace(/<link[^>]*rel="canonical"[^>]*>/g, '')
    .replace(/<link[^>]*rel="preconnect"[^>]*>/g, '');
  const links = [];
  const attrPattern = /(?:href|src|poster)="([^"]+)"/g;
  let match;
  while ((match = attrPattern.exec(cleaned))) links.push(match[1]);
  return links;
}

async function internalTargetExists(linkPath) {
  const clean = stripBase(linkPath.split('#')[0].split('?')[0]);
  if (!clean) return true;
  const candidates = clean.endsWith('/')
    ? [path.join(distDir, clean, 'index.html')]
    : [path.join(distDir, clean), path.join(distDir, `${clean}.html`), path.join(distDir, clean, 'index.html')];
  for (const candidate of candidates) {
    try {
      await stat(candidate);
      return true;
    } catch {
      // try next candidate
    }
  }
  return false;
}

async function checkExternalLink(href) {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10_000);
    let res;
    try {
      res = await fetch(href, { method: 'HEAD', redirect: 'follow', signal: controller.signal });
      if (!res.ok) {
        res = await fetch(href, { method: 'GET', redirect: 'follow', signal: controller.signal });
      }
    } finally {
      clearTimeout(timeout);
    }
    return res.ok;
  } catch {
    return false;
  }
}

async function mapLimit(items, limit, fn) {
  const results = [];
  let i = 0;
  async function worker() {
    while (i < items.length) {
      const idx = i++;
      results[idx] = await fn(items[idx]);
    }
  }
  await Promise.all(Array.from({ length: Math.min(limit, items.length) }, worker));
  return results;
}

async function main() {
  try {
    await stat(distDir);
  } catch {
    console.error('dist/ not found — run `npm run build` first.');
    process.exit(1);
  }

  const files = await walk(distDir);
  const internalBroken = [];
  const legacyLinks = [];
  const externalLinksByHref = new Map();

  for (const file of files) {
    const html = await readFile(file, 'utf-8');
    const relFile = path.relative(distDir, file);
    for (const href of extractLinks(html)) {
      if (href.startsWith('mailto:') || href.startsWith('tel:') || href.startsWith('#') || href.startsWith('//')) continue;
      if (href.startsWith('http://') || href.startsWith('https://')) {
        if (isLegacyLink(href)) {
          legacyLinks.push({ href, file: relFile });
          continue;
        }
        if (!externalLinksByHref.has(href)) externalLinksByHref.set(href, []);
        externalLinksByHref.get(href).push(relFile);
        continue;
      }
      if (!(await internalTargetExists(href))) {
        internalBroken.push({ href, file: relFile });
      }
    }
  }

  console.log(`Checked ${files.length} pages, ${externalLinksByHref.size} unique external links.`);

  if (legacyLinks.length > 0) {
    console.log(`\n${legacyLinks.length} rendered link(s) still depend on dmcommunity.org:`);
    for (const { href, file } of legacyLinks) console.log(`  ${href}  (in ${file})`);
  } else {
    console.log('No rendered links depend on dmcommunity.org.');
  }

  if (internalBroken.length > 0) {
    console.log(`\n${internalBroken.length} broken internal link(s):`);
    for (const { href, file } of internalBroken) console.log(`  ${href}  (in ${file})`);
  } else {
    console.log('No broken internal links.');
  }

  let externalBroken = [];
  if (checkExternal) {
    const hrefs = [...externalLinksByHref.keys()];
    const results = await mapLimit(hrefs, concurrency, checkExternalLink);
    externalBroken = hrefs.filter((_, i) => !results[i]);
    if (externalBroken.length > 0) {
      console.log(`\n${externalBroken.length} unreachable external link(s):`);
      for (const href of externalBroken) {
        console.log(`  ${href}`);
        for (const file of externalLinksByHref.get(href)) console.log(`    in ${file}`);
      }
      console.log(
        '\nNote: some sites (LinkedIn especially) block automated HEAD/GET requests and will show up ' +
          'here even when the link works fine in a browser — spot-check manually before treating one of ' +
          "these as truly broken. If links to this repo's own CONTRIBUTING.md show up here, check whether " +
          'the repo is still private — private repos 404 for anyone without access.',
      );
    } else {
      console.log('All external links reachable.');
    }
  } else {
    console.log('Skipped external link checks (pass --external to include them).');
  }

  if (legacyLinks.length > 0 || internalBroken.length > 0 || externalBroken.length > 0) process.exit(1);
}

main();
