const canonicalAuthorUrls = new Map<string, string>([
  ['Adam DeJans', 'https://adamdejans.com'],
  ['Adam DeJans Jr.', 'https://adamdejans.com'],
  ['Adam DeJans Jr', 'https://adamdejans.com'],
]);

export function authorUrl(name?: string, fallback?: string) {
  if (!name) return fallback;
  return canonicalAuthorUrls.get(name) ?? fallback;
}
