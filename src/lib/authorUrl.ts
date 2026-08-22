const ADAM_CANONICAL_NAME = 'Adam DeJans Jr.';
const ADAM_PROFILE_URL = '/contributors/adam-dejans-jr/';
const adamAuthorNames = new Set([
  'Adam DeJans',
  'Adam DeJans Jr',
  'Adam DeJans Jr.',
]);

export function canonicalAuthorName(name?: string) {
  if (!name) return name;
  return adamAuthorNames.has(name.trim()) ? ADAM_CANONICAL_NAME : name;
}

export function authorUrl(name?: string, fallback?: string) {
  const canonicalName = canonicalAuthorName(name);
  if (!canonicalName) return fallback;
  return canonicalName === ADAM_CANONICAL_NAME ? ADAM_PROFILE_URL : fallback;
}
