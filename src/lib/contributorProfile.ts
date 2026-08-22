import { canonicalAuthorName } from './authorUrl';

type ContributorIdentity = {
  firstName: string;
  lastName: string;
  suffix?: string;
};

type ContributorEntry<T extends ContributorIdentity = ContributorIdentity> = {
  id: string;
  data: T;
};

export function contributorFullName(data: ContributorIdentity) {
  return `${data.firstName} ${data.lastName}${data.suffix ? ` ${data.suffix}` : ''}`;
}

export function findContributorByName<T extends ContributorIdentity>(
  name: string | undefined,
  contributors: ContributorEntry<T>[],
) {
  const canonicalName = canonicalAuthorName(name);
  if (!canonicalName) return undefined;
  return contributors.find((entry) => contributorFullName(entry.data) === canonicalName);
}

export function contributorPath(id: string) {
  return `/contributors/${id}/`;
}
