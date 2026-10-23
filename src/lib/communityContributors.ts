import { canonicalAuthorNames } from './authorUrl';

const nonCommunityAuthors = new Set([
  'ChatGPT',
  'Microsoft Copilot',
  'Your Name',
]);

/**
 * Build the community contributor roster from curated profiles and article
 * bylines. Profiles provide the directory details, while article bylines make
 * new authors count immediately even before a profile is created for them.
 */
export function communityContributorNames(profileNames: string[], articleAuthors: Array<string | undefined>) {
  const names = new Set(profileNames.flatMap((name) => canonicalAuthorNames(name)));

  for (const author of articleAuthors) {
    for (const name of canonicalAuthorNames(author)) {
      if (!nonCommunityAuthors.has(name)) names.add(name);
    }
  }

  return [...names];
}
