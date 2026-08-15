const LEGACY_HOSTS = new Set(['dmcommunity.org', 'www.dmcommunity.org']);

const DIRECT_PATHS = new Map([
  ['/', '/'],
  ['/about/', '/about/'],
  ['/challenges/', '/challenges/'],
  ['/decisioncamp/', '/decisioncamp/'],
  ['/events/', '/events/'],
  ['/qa/', '/qa/'],
  ['/resources/', '/resources/'],
  ['/sponsors/', '/sponsors/'],
  ['/vendors-corner/', '/vendors-corner/'],
]);

export function isLegacyDmCommunityUrl(value) {
  if (typeof value !== 'string') return false;
  try {
    return LEGACY_HOSTS.has(new URL(value).hostname.toLowerCase());
  } catch {
    return false;
  }
}

export function migrateLegacyUrl(value) {
  if (typeof value !== 'string') return value;

  let parsed;
  try {
    parsed = new URL(value);
  } catch {
    return value;
  }

  if (!LEGACY_HOSTS.has(parsed.hostname.toLowerCase())) return value;

  const uploadPrefix = '/wp-content/uploads/';
  if (parsed.pathname.startsWith(uploadPrefix)) {
    return `/news-media/${parsed.pathname.slice(uploadPrefix.length)}`;
  }

  // The complete WordPress post archive is now available under /news/ using
  // YYYY-MM-DD-slug IDs, so legacy dated permalinks can be mapped exactly.
  const datedPost = parsed.pathname.match(/^\/(\d{4})\/(\d{2})\/(\d{2})\/([^/]+)\/?$/);
  if (datedPost) {
    return `/news/${datedPost[1]}-${datedPost[2]}-${datedPost[3]}-${datedPost[4]}/`;
  }

  const normalizedPath = parsed.pathname === '/'
    ? '/'
    : `${parsed.pathname.replace(/\/+$/, '')}/`;
  return DIRECT_PATHS.get(normalizedPath) ?? value;
}
