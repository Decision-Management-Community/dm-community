import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { visit } from 'unist-util-visit';
import { migrateLegacyUrl } from './src/lib/legacyUrl.mjs';

// The GitHub Pages deployment is the canonical site. Keep a fixed base path so
// canonical URLs, sitemaps, internal links, and migrated WordPress content all
// resolve independently of the legacy dmcommunity.org domain.
const base = '/dm-community';
const basePrefix = base.endsWith('/') ? base.slice(0, -1) : base;

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

// Content-collection Markdown can contain root-relative links as well as
// absolute links copied from the legacy WordPress site. Normalize both at
// render time so migrated content never depends on dmcommunity.org staying up.
function rehypeBaseLinks() {
  return (tree) => {
    visit(tree, 'element', (node) => {
      if (node.tagName !== 'a' && node.tagName !== 'img' && node.tagName !== 'video' && node.tagName !== 'source') return;

      for (const attr of ['href', 'src', 'poster', 'srcset']) {
        const value = node.properties?.[attr];
        if (typeof value !== 'string') continue;
        node.properties[attr] = attr === 'srcset' ? rewriteSrcset(value) : prefixInternalUrl(value);
      }
    });

    // WordPress bodies are preserved as raw HTML. Raw nodes bypass the element
    // visitor, so rewrite the URL-bearing attributes that can trigger browser
    // navigation or asset requests. Inert migration metadata such as
    // data-permalink is intentionally left untouched.
    visit(tree, 'raw', (node) => {
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
  site: 'https://decision-management-community.github.io',
  base,
  markdown: {
    rehypePlugins: [rehypeBaseLinks],
  },
  integrations: [mdx(), sitemap()],
});
