# Contributing to the Decision Management Community site

This site is built from plain Markdown files in this repository. You don't need to run any code
to contribute content — you can add or edit a Markdown file directly in the GitHub web UI and open
a pull request. A maintainer (or CI) will review it and merge it in.

If you'd rather preview your change locally first:

```bash
npm install
npm run dev      # http://localhost:4321
```

## What you can contribute

| Content type | Where it lives | Add one by... |
|---|---|---|
| Case study | `src/content/case-studies/*.md` | Copying an existing file, filling in the frontmatter |
| Tool listing | `src/content/tools/*.md` | Same as above |
| Decision model | `src/content/decision-models/*.md` | Same as above |
| Monthly Challenge | `src/content/challenges/*.md` | Same as above |
| Q&A post | `src/content/qa/*.md` | Same as above |
| Sponsor | `src/content/sponsors/*.md` | Same as above (sponsorship terms still go through the board) |
| Advisory Board member | `src/content/advisory-board/*.md` | Board-managed — open an issue instead of a PR |
| Event | `src/content/events/*.md` | Same as above |
| Vendor's Corner announcement | `src/content/vendor-news/*.md` | Copying an existing file, filling in the frontmatter |

Each content type is validated by a schema in `src/content.config.ts` — if your frontmatter is
missing a required field or has the wrong type, the build will fail with a clear error telling you
what to fix.

### Adding a case study

Create a new file at `src/content/case-studies/your-case-study-slug.md`:

```markdown
---
title: "Example Insurer Automates Claims Triage"
organization: "Example Insurance Co."
industry: "Insurance"
vendor: "OpenRules"
url: "https://example.com/case-study"
linkStatus: "ok"
summary: "Short one-sentence summary of the case study."
---

Longer description of the case study goes here as regular Markdown.
```

**Please set `linkStatus` honestly**: `ok` if you've verified the URL loads, `unverified` if you
haven't checked, or omit `url` entirely if there isn't a working link (a summary-only entry is
still useful). Part of this rebuild was cleaning up dead case-study links that had accumulated on
the old site — help us keep it that way.

### Adding a tool

Same idea, in `src/content/tools/`:

```markdown
---
name: "Example Rules Engine"
category: "Rules Engines"   # one of: DMN Tools, Rules Engines, Constraint Solvers, Optimization Solvers, Decision Intelligence Platforms
url: "https://example.com"
linkStatus: "ok"
summary: "One sentence describing what it does."
---
```

### Adding an Advisory Board member photo

Board membership itself is board-managed (open an issue, don't PR a new member in), but if you're
already listed and want to add or update your headshot:

1. Add your photo under `public/advisory-board/your-name.jpg` (square, at least 200×200px works well).
2. Add an `image` field to your entry in `src/content/advisory-board/your-name.md` pointing at it:

```yaml
image: "/advisory-board/your-name.jpg"
```

If no `image` is set, the site shows an initials avatar instead — so this is optional, not required.
Please only add your own photo (or one you have explicit permission to publish); don't add a photo
of someone else on their behalf.

### Adding a Challenge

`src/content/challenges/YYYY-MM-short-title.md`:

```markdown
---
title: "Your Challenge Title"
date: 2026-09-01
tags: [scheduling]
solutions: []
---

Problem description in Markdown (tables, lists, etc. all work).
```

To add a solution to an existing challenge, edit its `solutions` list:

```yaml
solutions:
  - title: "My Solution"
    author: "Your Name"
    affiliation: "Your Company"
    url: "https://link-to-your-writeup.com"   # optional
```

### Adding a Q&A post

`src/content/qa/short-title.md`:

```markdown
---
title: "Your Question"
date: 2026-09-01
category: "Business Rules"   # one of: Agentic AI, Business Rules, Decision Intelligence Platforms, Decision Optimization, Machine Learning, DMN, BPMN, CMMN
author: "Your Name"
---

Your question or discussion prompt, in Markdown.
```

### Adding a Vendor's Corner announcement

`src/content/vendor-news/YYYY-MM-DD-short-title.md`:

```markdown
---
title: "Product X now supports DMN 1.5"
vendor: "Example Vendor"
date: 2026-09-01
url: "https://example.com/announcement"   # optional
---
```

Dated announcements here automatically show up in the homepage activity feed and the RSS feed —
no need to edit those separately. (The undated 2025-and-earlier summary on the Vendor's Corner page
was carried over from the pre-rebuild site without exact dates, which is why it's kept as static text
instead of dated entries.)

## Backfilling the historical archive

This rebuild intentionally migrated a modern platform plus a small set of representative content
first, rather than trying to move twelve-plus years of monthly Challenges, DecisionCAMP editions,
and forum Q&A in one pass. The original site (a WordPress install) is still the source of truth for
that historical archive until it's migrated.

If you want to help backfill it:

1. Pick a year/section that hasn't been migrated (check `src/content/challenges/`,
   `src/content/qa/`, and `src/content/decisioncamp/` for what already exists).
2. Pull the content from the original site, convert it to the Markdown format shown above.
3. **Copy it in, don't link out.** If the source page has real body content (a write-up, a
   presentation list, a decision-model description), inline it as Markdown in the new file. If it
   references a downloadable file (PDF, image, spreadsheet) that's only hosted on the old
   WordPress site, download it and commit it under `public/` (see `public/decisioncamp/rulesfest-*/`
   for the pattern), then link to the local copy — don't point back at dmcommunity.org. The whole
   point of this migration is that the new site doesn't depend on the old one staying online.
4. **Check every outbound link before including it** and set `linkStatus` accordingly — several
   case-study and resource links on the original site were dead. Don't propagate broken links into
   the new site. Links to *other* third-party sites (e.g. a vendor's own docs) are fine to keep as
   external links — it's specifically the old dmcommunity.org site's own pages/files that should be
   copied in rather than linked to.
5. Open a PR with a batch of files (a handful at a time is easier to review than hundreds at once).

## Opening the PR

1. Fork this repo (or create a branch if you have write access).
2. Add/edit your Markdown file(s).
3. Open a pull request. The `content-check` GitHub Action will build the site and fail the check if
   your frontmatter doesn't validate — fix and push again if so.
4. A maintainer will review and merge.

Questions? Email [DecisionManagementCommunity@gmail.com](mailto:DecisionManagementCommunity@gmail.com).
