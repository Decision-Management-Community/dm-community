// Prefixes an internal, root-relative path with the site's configured base path
// (import.meta.env.BASE_URL), so links work when the site is served under the
// GitHub Pages project path (/dm-community/). Only use this for internal links
// (starting with "/") — leave external URLs and mailto: links as-is.
export function url(path: string): string {
  const base = import.meta.env.BASE_URL;
  const cleanBase = base.endsWith('/') ? base.slice(0, -1) : base;
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${cleanBase}${cleanPath}` || '/';
}
