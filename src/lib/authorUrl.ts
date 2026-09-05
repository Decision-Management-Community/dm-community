const canonicalNames = new Map([
  ['Adam DeJans', 'Adam DeJans Jr.'],
  ['Adam DeJans Jr', 'Adam DeJans Jr.'],
  ['Adam DeJans Jr.', 'Adam DeJans Jr.'],
  ['Baljeet Singh', 'Baljeet Singh Kandhari'],
  ['Carole-Ann Matignon', 'Carole-Ann Berlioz'],
  ['Denis Gagné', 'Denis Gagne'],
  ['Daniel Selman', 'Dan Selman'],
  ['Dr. Bob Moore', 'Bob Moore'],
  ['Dr. John Svirbely', 'John Svirbely'],
  ['Dr. Vijay Bandekar', 'Vijay Bandekar'],
  ['J Jansonius', 'Jack Jansonius'],
  ['Kurth Wilfried', 'Wilfried Kurth'],
  ['Michael Parish', 'Mike Parish'],
  ['Prof. Jan Vanthienen', 'Jan Vanthienen'],
  ['Robert Parker', 'Rob Parker'],
]);

const profileUrls = new Map([
  ['Adam DeJans Jr.', '/contributors/adam-dejans-jr/'],
  ['Roderich Wallrath', 'https://www.linkedin.com/in/roderichwallrath/overlay/background-photo/'],
]);

export function canonicalAuthorName(name?: string) {
  if (!name) return name;
  return canonicalNames.get(name.trim()) ?? name.trim();
}

export function canonicalAuthorNames(name?: string) {
  if (!name) return [];

  return [...new Set(
    name
      .split(/\s*(?:&|\band\b|,)\s*/i)
      .map(canonicalAuthorName)
      .filter((value): value is string => Boolean(value)),
  )];
}

export function authorUrl(name?: string, fallback?: string) {
  const canonicalName = canonicalAuthorName(name);
  if (!canonicalName) return fallback;
  return profileUrls.get(canonicalName) ?? fallback;
}
