# Contributing to the Decision Management Community site

This site is built from plain Markdown files in this repository. You don't need to run any code to
contribute content — you can add or edit a Markdown file directly in the GitHub web UI and open a
pull request. Adam DeJans Jr. or Jacob Feldman reviews every pull request and either merges it, asks
a quick question, or explains why it doesn't fit.

## The short version

1. **Fork this repository** (or create a branch if you already have write access):
   [github.com/Decision-Management-Community/dm-community](https://github.com/Decision-Management-Community/dm-community)
2. **Find the right folder** under `src/content/` for what you're adding (a table is below), and
   **read that folder's own `README.md`** — each one has the exact frontmatter schema, a
   copy-pasteable example, and the filename convention for that content type.
3. **Add or edit a Markdown file.** No build step required to propose one — you can create the file
   directly in the GitHub web UI if you'd rather not clone the repo.
4. **Open a pull request.** An automated check (`content-check`) builds the site and validates your
   file against its schema, so you'll know right away if something's missing before a human ever
   looks at it.
5. **A maintainer reviews it.**

If you'd rather preview your change locally first:

```bash
npm install
npm run dev      # http://localhost:4321
```

## Where things live

| Content type | Folder | Board-managed? |
|---|---|---|
| Monthly Challenge | [`src/content/challenges/`](./src/content/challenges/README.md) | No |
| Q&A post | [`src/content/qa/`](./src/content/qa/README.md) | No |
| Tool listing | [`src/content/tools/`](./src/content/tools/README.md) | No |
| Case study | [`src/content/case-studies/`](./src/content/case-studies/README.md) | No |
| Decision model | [`src/content/decision-models/`](./src/content/decision-models/README.md) | No |
| Event | [`src/content/events/`](./src/content/events/README.md) | No |
| Vendor's Corner announcement | [`src/content/vendor-news/`](./src/content/vendor-news/README.md) | No |
| News post (commentary, interview, milestone) | [`src/content/news/`](./src/content/news/README.md) | No |
| DecisionCAMP edition | [`src/content/decisioncamp/`](./src/content/decisioncamp/README.md) | No |
| MiniCamp session | [`src/content/minicamps/`](./src/content/minicamps/README.md) | No |
| Advisory Board member | [`src/content/advisory-board/`](./src/content/advisory-board/README.md) | New members: yes — open an issue. Updating your own entry: no |
| Sponsor | [`src/content/sponsors/`](./src/content/sponsors/README.md) | New sponsors: yes — terms go through the board. Updating your own logo/summary: no |

Every content type is validated by a schema in [`src/content.config.ts`](./src/content.config.ts) —
if your frontmatter is missing a required field or has the wrong type, the `content-check` CI job
fails with a specific error telling you what to fix.

## House rules that apply across all content types

- **Set `linkStatus` honestly**, wherever a content type has that field: `ok` only once you've
  actually verified the URL loads, `unverified` if you haven't checked, or omit `url` entirely if
  there isn't a working link. A missing link is better than a broken one. Several content types on
  the pre-rebuild site had accumulated dead links — don't reintroduce that.
- **Host files you have, don't hotlink files you don't control.** If you have the actual PDF, image,
  or spreadsheet behind an entry, commit it under `public/` (see `public/decisioncamp/rulesfest-*/`
  for the pattern) and link to your local copy rather than an external URL that might disappear.
- **Write summaries in your own words.** Don't paste large verbatim blocks from wherever the content
  originated — a short, accurate restatement is both more useful to readers and keeps the licensing
  situation clean.
- **Site or code changes** (not content) are ordinary pull requests against this Astro codebase — see
  the root [`README.md`](./README.md) for local dev setup. No special process beyond running
  `npm run build` locally before you push.

## Backfilling the historical archive

This rebuild intentionally migrated a modern platform plus a growing set of historical content,
rather than trying to move twelve-plus years of the old WordPress site in one pass. The original
site (dmcommunity.org's WordPress install) is still the source of truth for whatever hasn't been
migrated yet.

If you want to help backfill more of it:

1. Check what's already migrated for the year/section you're looking at (the relevant folder under
   `src/content/` and its README will tell you the schema; just look at what's already there for
   coverage).
2. **Copy content in, don't link out.** If the source page has real body content (a write-up, a
   presentation list, a decision-model description), inline it as Markdown in the new file, in your
   own words. If it references a downloadable file only hosted on the old site, download it and
   commit it under `public/`, then link to the local copy.
3. **Check every outbound link before including it** and set `linkStatus` accordingly.
4. Open a PR with a batch of files — a handful at a time is easier to review than hundreds at once.

## Opening the PR

1. Fork this repo (or create a branch if you have write access).
2. Add/edit your Markdown file(s).
3. Open a pull request. The `content-check` GitHub Action will build the site and fail the check if
   your frontmatter doesn't validate — fix and push again if so.
4. A maintainer will review and merge.

Questions? Email [DecisionManagementCommunity@gmail.com](mailto:DecisionManagementCommunity@gmail.com).
