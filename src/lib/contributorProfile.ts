import { canonicalAuthorName } from './authorUrl';
import { decisionCampPresentations, type DecisionCampPresentation } from '../data/decisionCampPresentations';

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

/**
 * The archived conference programs record presenters in profile copy rather
 * than a separate structured collection. Extract the documented DecisionCAMP
 * years so those presentations can appear alongside other contributions.
 */
export function decisionCampPresentationYears(content?: string) {
  if (!content || !/\b(?:presented|delivered)\b/i.test(content)) return [];

  const years = new Set<number>();
  for (const phrase of content.matchAll(/\bDecisionCAMP\b[^.\n]*/gi)) {
    const listedYears = [...phrase[0].matchAll(/\b(20\d{2})\b/g)].map((match) => Number(match[1]));
    listedYears.forEach((year) => years.add(year));

    if (listedYears.length === 2 && /[–-]/.test(phrase[0])) {
      const [start, end] = listedYears;
      for (let year = start; year <= end; year += 1) years.add(year);
    }
  }

  return [...years].sort((a, b) => b - a);
}

export type ContributorPresentation = DecisionCampPresentation & { detailed: boolean };

/**
 * Match a profile to the detailed program catalog.  A historical profile that
 * records a year but has no matching program item is kept as a year-level
 * contribution, so the catalog never discards the records restored in #129.
 */
export function decisionCampPresentationsForContributor(name: string, content?: string): ContributorPresentation[] {
  const canonicalName = canonicalAuthorName(name);
  const detailed = decisionCampPresentations.filter((presentation) =>
    presentation.presenters.some((presenter) => canonicalAuthorName(presenter) === canonicalName),
  );
  const detailedYears = new Set(detailed.map((presentation) => presentation.year));
  const historical = decisionCampPresentationYears(content)
    .filter((year) => !detailedYears.has(year))
    .map((year) => ({
      year,
      title: `DecisionCAMP ${year}`,
      presenters: [name],
      programUrl: `/decisioncamp/${year}/`,
      detailed: false,
    }));

  return [...detailed.map((presentation) => ({ ...presentation, detailed: true })), ...historical]
    .sort((a, b) => b.year - a.year || a.title.localeCompare(b.title));
}
