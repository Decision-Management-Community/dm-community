import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const pages = defineCollection({
  loader: glob({ pattern: ['**/*.md', '!README.md'], base: './src/content/pages' }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    order: z.number().default(0),
  }),
});

const advisoryBoard = defineCollection({
  loader: glob({ pattern: ['**/*.md', '!README.md'], base: './src/content/advisory-board' }),
  schema: z.object({
    firstName: z.string(),
    lastName: z.string(),
    // Generational suffix (Jr., Sr., III, ...), kept separate from lastName
    // so sorting by last name isn't thrown off by it.
    suffix: z.string().optional(),
    // Root-relative path to a self-hosted headshot under public/advisory-board/,
    // e.g. "/advisory-board/jane-doe.jpg". Optional — falls back to an initials avatar.
    image: z.string().optional(),
    affiliation: z.string().optional(),
    linkedin: z.string().url().optional(),
    email: z.string().email().optional(),
  }),
});

const contributors = defineCollection({
  loader: glob({ pattern: ['**/*.md', '!README.md'], base: './src/content/contributors' }),
  schema: z.object({
    firstName: z.string(),
    lastName: z.string(),
    suffix: z.string().optional(),
    image: z.string().optional(),
    headline: z.string(),
    shortBio: z.string(),
    website: z.string().url().optional(),
    linkedin: z.string().url().optional(),
    affiliations: z
      .array(
        z.object({
          name: z.string(),
          url: z.string().url().optional(),
        }),
      )
      .default([]),
    expertise: z.array(z.string()).default([]),
    availableFor: z.array(z.string()).default([]),
    engagementUrl: z.string().url().optional(),
    engagementNote: z.string().optional(),
    sameAs: z.array(z.string().url()).default([]),
    // Featured profiles are reserved for sustained/substantive community contributors.
    // Basic directory profiles intentionally render more compactly.
    featured: z.boolean().default(false),
    // Rich identity markup is opt-in. Bulk/community profiles stay intentionally simple.
    structuredData: z.boolean().default(false),
  }),
});

const sponsors = defineCollection({
  loader: glob({ pattern: ['**/*.md', '!README.md'], base: './src/content/sponsors' }),
  schema: z.object({
    name: z.string(),
    url: z.string().url(),
    logo: z.string().optional(),
    active: z.boolean().default(true),
    order: z.number().default(0),
  }),
});

const caseStudies = defineCollection({
  loader: glob({ pattern: ['**/*.md', '!README.md'], base: './src/content/case-studies' }),
  schema: z.object({
    title: z.string(),
    organization: z.string().optional(),
    industry: z.string().optional(),
    vendor: z.string().optional(),
    // Either a full external URL, or a root-relative path to a self-hosted
    // file under public/ (e.g. "/case-studies/foo.pdf").
    url: z
      .string()
      .refine((v) => v.startsWith('/') || /^https?:\/\//.test(v), 'must be a URL or a root-relative path')
      .optional(),
    // Original site had several dead links mixed into its case-study list.
    // Track link health explicitly instead of silently dropping or trusting it.
    linkStatus: z.enum(['ok', 'broken', 'unverified']).default('unverified'),
    summary: z.string().optional(),
  }),
});

const tools = defineCollection({
  loader: glob({ pattern: ['**/*.md', '!README.md'], base: './src/content/tools' }),
  schema: z.object({
    name: z.string(),
    categories: z.array(z.enum(['BR', 'ML', 'OPT', 'LLM'])).min(1),
    url: z.string().url().optional(),
    linkStatus: z.enum(['ok', 'broken', 'unverified']).default('unverified'),
  }),
});

const decisionModels = defineCollection({
  loader: glob({ pattern: ['**/*.md', '!README.md'], base: './src/content/decision-models' }),
  schema: z.object({
    title: z.string(),
    industry: z.enum(['Financial Services', 'Insurance', 'Healthcare', 'Other']),
    url: z.string().url().optional(),
    linkStatus: z.enum(['ok', 'broken', 'unverified']).default('unverified'),
    summary: z.string().optional(),
  }),
});

const challenges = defineCollection({
  loader: glob({ pattern: ['**/*.md', '!README.md'], base: './src/content/challenges' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    tags: z.array(z.string()).default([]),
    solutions: z
      .array(
        z.object({
          title: z.string(),
          author: z.string(),
          affiliation: z.string().optional(),
          // Historical contact links are stored per solution when they differ
          // from the submitter's link on another Challenge.
          email: z.string().email().optional(),
          authorUrl: z.string().url().optional(),
          // Solutions may link to external sources or to migrated local article pages.
          url: z
            .string()
            .refine((v) => v.startsWith('/') || /^https?:\/\//.test(v), 'must be a URL or a root-relative path')
            .optional(),
        }),
      )
      .default([]),
  }),
});

const qa = defineCollection({
  loader: glob({ pattern: ['**/*.md', '!README.md'], base: './src/content/qa' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    category: z.enum([
      'Agentic AI',
      'Business Rules',
      'Decision Intelligence Platforms',
      'Decision Optimization',
      'Machine Learning',
      'DMN, BPMN, CMMN',
    ]),
    author: z.string().optional(),
  }),
});

const events = defineCollection({
  loader: glob({ pattern: ['**/*.md', '!README.md'], base: './src/content/events' }),
  schema: z.object({
    title: z.string(),
    startDate: z.coerce.date(),
    endDate: z.coerce.date().optional(),
    location: z.string().optional(),
    url: z.string().url().optional(),
  }),
});

const decisioncamp = defineCollection({
  loader: glob({ pattern: ['**/*.md', '!README.md'], base: './src/content/decisioncamp' }),
  schema: z.object({
    year: z.number(),
    title: z.string(),
    location: z.string().optional(),
    url: z.string().url().optional(),
  }),
});

const minicamps = defineCollection({
  loader: glob({ pattern: ['**/*.md', '!README.md'], base: './src/content/minicamps' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    speaker: z.string(),
    affiliation: z.string().optional(),
    recordingUrl: z.string().url().optional(),
    // Either an external URL or a root-relative path to a self-hosted file.
    slidesUrl: z
      .string()
      .refine((v) => v.startsWith('/') || /^https?:\/\//.test(v), 'must be a URL or a root-relative path')
      .optional(),
  }),
});

const vendorNews = defineCollection({
  loader: glob({ pattern: ['**/*.md', '!README.md'], base: './src/content/vendor-news' }),
  schema: z.object({
    title: z.string(),
    vendor: z.string(),
    date: z.coerce.date(),
    url: z.string().url().optional(),
  }),
});

const news = defineCollection({
  loader: glob({ pattern: ['**/*.md', '!README.md'], base: './src/content/news' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    author: z.string().optional(),
    tags: z.array(z.string()).default([]),
    // Link to the original source (e.g. the pre-rebuild site, or an external
    // article being discussed) — most entries here are commentary about, or a
    // pointer to, something published elsewhere.
    sourceUrl: z.string().url().optional(),
    // Original WordPress permalink. Used to emit a static redirect when the
    // dmcommunity.org domain is cut over to this site.
    legacyPath: z.string().regex(/^\/\d{4}\/\d{2}\/\d{2}\/[^/]+\/$/).optional(),
  }),
});

const articles = defineCollection({
  loader: glob({ pattern: '[0-9][0-9][0-9][0-9]-[0-9][0-9]-[0-9][0-9]-*.md', base: './src/content/articles' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    author: z.string().optional(),
    linkedin: z.string().url().optional(),
    originalUrl: z.string().url().optional(),
    summary: z.string().optional(),
    challengeUrl: z.string().regex(/^\/challenges\/[^/]+\/$/).optional(),
    documentUrl: z.string().regex(/^\/news-media\/.+/).optional(),
  }),
});

export const collections = {
  pages,
  advisoryBoard,
  contributors,
  sponsors,
  caseStudies,
  tools,
  decisionModels,
  challenges,
  qa,
  events,
  decisioncamp,
  minicamps,
  vendorNews,
  news,
  articles,
};
