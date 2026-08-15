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

const SECTION_FALLBACKS = [
  ['/decisioncamp/minicamps/', '/decisioncamp/minicamps/'],
  ['/challenge', '/challenges/'],
  ['/decisioncamp', '/decisioncamp/'],
  ['/event', '/events/'],
  ['/resource', '/resources/'],
  ['/sponsor', '/sponsors/'],
  ['/vendor', '/vendors-corner/'],
  ['/qa', '/qa/'],
  ['/about', '/about/'],
];

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

  const direct = DIRECT_PATHS.get(normalizedPath);
  if (direct) return direct;

  // WordPress also used many one-off slugs for challenge pages, DecisionCAMP
  // registrations, resource pages, and similar section content. Those slugs do
  // not map one-to-one to the migrated IDs, so preserve useful navigation by
  // sending them to the corresponding local section archive.
  for (const [legacyPrefix, localPath] of SECTION_FALLBACKS) {
    if (normalizedPath.startsWith(legacyPrefix)) return localPath;
  }

  // Any remaining navigable URL on the retired WordPress host is historical
  // content with no exact route mapping. The local News archive is the safest
  // self-contained fallback and prevents a runtime dependency on that host.
  return '/news/';
}
