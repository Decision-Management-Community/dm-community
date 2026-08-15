import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { visit } from 'unist-util-visit';

// Until the community's real domain (dmcommunity.org) is pointed at this repo's
// GitHub Pages deployment, it's served under /dm-community/ instead of at the
// domain root. Presence of public/CNAME is what flips Pages over to a custom
// domain, so use that same signal here to switch the base path automatically —
// add public/CNAME when cutting over and this adjusts itself, no manual toggle.
const hasCustomDomain = existsSync(fileURLToPath(new URL('./public/CNAME', import.meta.url)));
const base = hasCustomDomain ? '/' : '/dm-community';
const basePrefix = base.endsWith('/') ? base.slice(0, -1) : base;

// Content-collection Markdown files (including community-contributed ones) can
// contain root-relative internal links like `/resources/`. Those don't go
// through Astro's asset pipeline, so without this they'd 404 under a subpath
// deployment. Prefixing at render time means contributors never have to think
// about the base path when writing links in their Markdown.
function rehypeBaseLinks() {
  return (tree) => {
    visit(tree, 'element', (node) => {
      if (node.tagName !== 'a' && node.tagName !== 'img') return;
      const attr = node.tagName === 'a' ? 'href' : 'src';
      const value = node.properties?.[attr];
      if (typeof value === 'string' && value.startsWith('/') && !value.startsWith('//')) {
        node.properties[attr] = `${basePrefix}${value}`;
      }
    });

    // WordPress content is preserved as raw HTML. Raw nodes bypass the
    // element visitor above, so their root-relative media URLs would resolve
    // against the GitHub Pages domain root instead of /dm-community/. Rewrite
    // URL-bearing attributes in those nodes too; this becomes a no-op when the
    // custom domain switches the site base back to `/`.
    visit(tree, 'raw', (node) => {
      node.value = node.value.replace(
        /(\b(?:href|src|poster|srcset|data-[\w:-]+)\s*=\s*)(["'])([\s\S]*?)\2/gi,
        (match, prefix, quote, value) => {
          if (/srcset\s*=/i.test(prefix)) {
            const prefixed = value.replace(/(^|,\s*)(\/(?!\/))/g, `$1${basePrefix}$2`);
            return `${prefix}${quote}${prefixed}${quote}`;
          }
          if (value.startsWith('/') && !value.startsWith('//')) {
            return `${prefix}${quote}${basePrefix}${value}${quote}`;
          }
          return match;
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
