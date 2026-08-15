# Decision Management Community

Source for the [Decision Management Community](https://dmcommunity.org) website — a modern rebuild
of the community's site for practitioners of business rules, decision modeling, decision
optimization, machine learning, and agentic AI.

Built with [Astro](https://astro.build) and Markdown content collections, so most of the site's
content can be edited or added by anyone via a GitHub pull request — no build tooling required for
a simple content change. This project is intentionally run as an open collaboration: read on, or
see [CONTRIBUTING.md](./CONTRIBUTING.md) and the site's own [/contribute/](https://dmcommunity.org/contribute/)
page for the full picture.

## Contributing content

**Start with [CONTRIBUTING.md](./CONTRIBUTING.md)** — it explains the process and links to the
right folder for whatever you're adding.

Every content type lives under `src/content/<type>/`, and **each of those folders has its own
`README.md`** with the exact frontmatter schema and a copy-pasteable example for that type — open
the folder on GitHub and it renders right there. No need to reverse-engineer the format from
existing files.

## Local development

```bash
npm install
npm run dev       # http://localhost:4321
npm run build     # validates content + builds the static site to ./dist
npm run preview   # serve the built site locally
```

## Project structure

```
src/
  content.config.ts        # schemas for every content collection
  content/
    pages/                  # static prose pages (About, Terms, Standards, Contribute, ...)
    advisory-board/         # one file per board member — see its README.md
    sponsors/               # one file per sponsor — see its README.md
    case-studies/           # one file per case study — see its README.md
    articles/               # one file per article — see its README.md
    tools/                  # one file per tool/vendor listing — see its README.md
    decision-models/        # one file per decision model — see its README.md
    challenges/             # one file per monthly Challenge — see its README.md
    qa/                     # one file per Q&A post — see its README.md
    events/                 # one file per event — see its README.md
    decisioncamp/           # one file per DecisionCAMP/RulesFest edition — see its README.md
    minicamps/              # one file per MiniCamp session — see its README.md
    vendor-news/            # one file per Vendor's Corner announcement — see its README.md
    news/                   # one file per News post (commentary, interview, milestone) — see its README.md
  layouts/BaseLayout.astro
  components/Header.astro, Footer.astro
  pages/                    # route definitions
```

## Migration status

This is a rebuild of a long-running WordPress site. The historical archive has largely been
migrated at this point:

- The full Challenges archive (2014–present, ~85 monthly problems with their submitted solutions)
- The complete Q&A forum (the old site's forum only ever had a handful of threads — this covers
  all of them)
- Case studies, tools, and decision models, **with every link checked** — broken links from the
  original site were not silently carried over (they're listed separately, flagged as broken,
  rather than hidden or trusted)
- The RulesFest 2009–2011 presentation archives, **fully migrated with the actual slide PDFs
  hosted directly in this repo** (`public/decisioncamp/rulesfest-*/`) — not linked out to the old
  site, so they no longer depend on it staying online

The WordPress News archive is now fully migrated:

- **News** contains all 1,327 posts published from May 2014 through July 2026, with original dates,
  authors, categories/tags, body content, and legacy permalink redirects. Media referenced from the
  old site's upload library is packed under `archives/news-media/` and automatically extracted to
  `public/news-media/` for deployment wherever the source file still exists.

One area remains deliberately selective:

- **Vendor's Corner** covers the vendor/product announcements that were clearly tagged as such on
  the old site — not every post in its loosely-tagged "Products" category, several of which were
  actually sponsor announcements, analyst-report commentary, or general essays that belong in News
  instead.
What's intentionally *not* migrated: the old Tools catalogs specifically (~100+ listings hosted on now-dead third-party
infrastructure — rather than import broken links wholesale, the Tools list here was reseeded with a
small set of independently-verified, currently-live tools).

See [CONTRIBUTING.md#backfilling-the-historical-archive](./CONTRIBUTING.md#backfilling-the-historical-archive)
if you find a gap and want to help close it. The standing rule for any migration work: content and
files get copied into this repo, not linked back to the site being decommissioned.

## Deployment

Pushes to `main` build and deploy automatically to GitHub Pages via
`.github/workflows/deploy.yml`. Pull requests are validated by `.github/workflows/content-check.yml`,
which fails the check if any content file's frontmatter doesn't match its schema.

To go live on the real domain: enable GitHub Pages for this repo (Settings → Pages → Source:
GitHub Actions), point `dmcommunity.org`'s DNS at GitHub Pages, and add a `public/CNAME` file
containing `dmcommunity.org`.
