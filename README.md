# Decision Management Community

Source for the [Decision Management Community](https://dmcommunity.org) website — a modern rebuild
of the community's site for practitioners of business rules, decision modeling, decision
optimization, machine learning, and agentic AI.

Built with [Astro](https://astro.build) and Markdown content collections, so most of the site's
content can be edited or added by anyone via a GitHub pull request — no build tooling required for
a simple content change.

## Contributing content

See [CONTRIBUTING.md](./CONTRIBUTING.md) — you can add a case study, tool, decision model,
Challenge, Q&A post, or event by adding a Markdown file, no code required.

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
  content.config.ts       # schemas for every content collection
  content/
    pages/                 # static prose pages (About, Terms, Standards, ...)
    advisory-board/         # one file per board member
    sponsors/                # one file per sponsor
    case-studies/            # one file per case study (with linkStatus tracking)
    tools/                   # one file per tool/vendor listing
    decision-models/         # one file per decision model
    challenges/               # one file per monthly Challenge
    qa/                        # one file per Q&A post
    events/                     # one file per event
    decisioncamp/                 # one file per DecisionCAMP edition
  layouts/BaseLayout.astro
  components/Header.astro, Footer.astro
  pages/                    # route definitions
```

## Migration status

This is a rebuild of a long-running WordPress site. Rather than attempt a full 12+ year historical
migration in one pass, this rebuild ships:

- A modern platform with GitHub-based content contribution
- All current evergreen pages (About, Advisory Board, Sponsors, Resources, Terms)
- Case studies and resource links, **with every link checked** — broken links from the original
  site were not silently carried over (they're listed separately, flagged as broken, rather than
  hidden or trusted)
- A representative recent sample of Challenges and Q&A posts, establishing the content shape
- The RulesFest 2009–2011 presentation archives, **fully migrated with the actual slide PDFs
  hosted directly in this repo** (`public/decisioncamp/rulesfest-*/`) — not linked out to the old
  site, so they no longer depend on it staying online
- Every decision-model and case-study writeup that had real content (not just a link) is inlined
  as Markdown here, with any downloadable assets (PDFs, images) copied into `public/` rather than
  hotlinked to the old site

The rest of the historical archive (remaining years of monthly Challenges, other DecisionCAMP/RulesFest
editions, and the full Q&A forum) is **not yet migrated**. See
[CONTRIBUTING.md#backfilling-the-historical-archive](./CONTRIBUTING.md#backfilling-the-historical-archive)
if you'd like to help. The standing rule for any future migration work: content and files get copied
into this repo, not linked back to the site being decommissioned.

## Deployment

Pushes to `main` build and deploy automatically to GitHub Pages via
`.github/workflows/deploy.yml`. Pull requests are validated by `.github/workflows/content-check.yml`,
which fails the check if any content file's frontmatter doesn't match its schema.

To go live on the real domain: enable GitHub Pages for this repo (Settings → Pages → Source:
GitHub Actions), point `dmcommunity.org`'s DNS at GitHub Pages, and add a `public/CNAME` file
containing `dmcommunity.org`.
