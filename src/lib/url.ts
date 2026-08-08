// Prefixes an internal, root-relative path with the site's configured base path
// (import.meta.env.BASE_URL), so links work whether the site is served at the
// domain root or under a subpath like /dm-community/. Only use this for internal
// links (starting with "/") — leave external URLs and mailto: links as-is.
export function url(path: string): string {
  const base = import.meta.env.BASE_URL;
  const cleanBase = base.endsWith('/') ? base.slice(0, -1) : base;
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${cleanBase}${cleanPath}` || '/';
}

// Strips the base path back off a resolved Astro.url.pathname, so canonical
// URLs always point at the eventual root domain rather than the current
// subpath deployment (e.g. /dm-community/resources/ -> /resources/).
export function canonicalPath(pathname: string): string {
  const base = import.meta.env.BASE_URL;
  const cleanBase = base.endsWith('/') ? base.slice(0, -1) : base;
  if (cleanBase && pathname.startsWith(cleanBase)) {
    return pathname.slice(cleanBase.length) || '/';
  }
  return pathname;
}
