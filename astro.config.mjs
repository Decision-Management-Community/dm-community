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
