import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { visit } from 'unist-util-visit';
import { migrateLegacyUrl } from './src/lib/legacyUrl.mjs';

// DMCommunity.org is the canonical production domain. GitHub Pages remains the
// deployment backend, but the custom domain serves the site from the root.
const base = '/';
const basePrefix = base.endsWith('/') ? base.slice(0, -1) : base;
const adamProfileUrl = '/contributors/adam-dejans-jr/';
const canonicalAdamName = 'Adam DeJans Jr.';
const adamNameSplitPattern = /(Adam DeJans Jr\.?|Adam DeJans)/g;
const adamNameExactPattern = /^(Adam DeJans Jr\.?|Adam DeJans)$/;
const profileLinkBlockedTags = new Set(['a', 'code', 'pre', 'script', 'style', 'textarea']);

function prefixInternalUrl(value) {
  const migrated = migrateLegacyUrl(value);
  if (typeof migrated === 'string' && migrated.startsWith('/') && !migrated.startsWith('//')) {
    return `${basePrefix}${migrated}`;
  }
  return migrated;
}

function rewriteSrcset(value) {
  return value
    .split(',')
    .map((candidate) => {
      const trimmed = candidate.trim();
      const firstSpace = trimmed.search(/\s/);
      const rawUrl = firstSpace === -1 ? trimmed : trimmed.slice(0, firstSpace);
      const descriptor = firstSpace === -1 ? '' : trimmed.slice(firstSpace);
      return `${prefixInternalUrl(rawUrl)}${descriptor}`;
    })
    .join(', ');
}

function adamProfileLink() {
  return {
    type: 'element',
    tagName: 'a',
    properties: {
      href: adamProfileUrl,
      'data-person-profile': 'adam-dejans',
    },
    children: [{ type: 'text', value: canonicalAdamName }],
  };
}

function linkAdamNamesInTree(node, blocked = false) {
  if (!Array.isArray(node.children)) return;

  const currentBlocked = blocked ||
    (node.type === 'element' && profileLinkBlockedTags.has(node.tagName));
  const children = [];

  for (const child of node.children) {
    if (!currentBlocked && child.type === 'text' && /Adam DeJans/.test(child.value)) {
      for (const part of child.value.split(adamNameSplitPattern)) {
        if (!part) continue;
        children.push(
          adamNameExactPattern.test(part)
            ? adamProfileLink()
            : { type: 'text', value: part },
        );
      }
      continue;
    }

    linkAdamNamesInTree(child, currentBlocked);
    children.push(child);
  }

  node.children = children;
}

function linkAdamNamesInRawHtml(value) {
  const tokens = value.split(/(<[^>]+>)/g);
  let blockedDepth = 0;

  return tokens
    .map((token) => {
      if (!token.startsWith('<')) {
        if (blockedDepth > 0 || !/Adam DeJans/.test(token)) return token;
        return token.replace(
          adamNameSplitPattern,
          () => `<a href="${adamProfileUrl}" data-person-profile="adam-dejans">${canonicalAdamName}</a>`,
        );
      }

      const closing = token.match(/^<\/\s*([a-z0-9-]+)/i)?.[1]?.toLowerCase();
      if (closing && profileLinkBlockedTags.has(closing)) {
        blockedDepth = Math.max(0, blockedDepth - 1);
        return token;
      }

      const opening = token.match(/^<\s*([a-z0-9-]+)/i)?.[1]?.toLowerCase();
      if (opening && profileLinkBlockedTags.has(opening) && !/\/>\s*$/.test(token)) {
        blockedDepth += 1;
      }
      return token;
    })
    .join('');
}

// Content-collection Markdown can contain root-relative links as well as
// absolute links copied from the legacy WordPress site. Normalize both at
// render time so migrated content never depends on the retired WordPress host.
// At the same render stage, canonicalize visible Adam DeJans / Adam DeJans Jr.
// mentions to Adam DeJans Jr. and link them to the community contributor profile
// without touching code, scripts, or existing links.
function rehypeBaseLinks() {
  return (tree) => {
    linkAdamNamesInTree(tree);

    visit(tree, 'element', (node) => {
      if (node.tagName !== 'a' && node.tagName !== 'img' && node.tagName !== 'video' && node.tagName !== 'source') return;

      for (const attr of ['href', 'src', 'poster', 'srcset']) {
        const value = node.properties?.[attr];
        if (typeof value !== 'string') continue;
        node.properties[attr] = attr === 'srcset' ? rewriteSrcset(value) : prefixInternalUrl(value);
      }
    });

    // WordPress bodies are preserved as raw HTML. Raw nodes bypass the element
    // visitor, so link profile-name text outside existing anchors/code first,
    // then rewrite URL-bearing attributes. Inert migration metadata such as
    // data-permalink is intentionally left untouched.
    visit(tree, 'raw', (node) => {
      node.value = linkAdamNamesInRawHtml(node.value);
      node.value = node.value.replace(
        /(\b(?:href|src|poster|srcset)\s*=\s*)(["'])([\s\S]*?)\2/gi,
        (match, prefix, quote, value) => {
          const rewritten = /srcset\s*=/i.test(prefix) ? rewriteSrcset(value) : prefixInternalUrl(value);
          return `${prefix}${quote}${rewritten}${quote}`;
        },
      );
    });
  };
}

export default defineConfig({
  site: 'https://dmcommunity.org',
  base,
  markdown: {
    rehypePlugins: [rehypeBaseLinks],
  },
  integrations: [mdx(), sitemap()],
});
