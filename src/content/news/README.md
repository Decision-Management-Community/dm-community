# News

The complete 2014–2026 news and blog archive imported from the original WordPress site, plus new
community commentary, opinion pieces, interviews, and notable milestones. Rendered at `/news/` and
pulled into the homepage activity feed and RSS feed. One file per post.

Distinct from **Vendor's Corner** (dated product/company announcements) and **Q&A** (a specific
question with a discussion-style answer) — News is for everything else: essays, interviews with
practitioners, retrospectives, industry-report commentary, and similar community-editorial content.

## Schema

| Field | Type | Required | Notes |
|---|---|---|---|
| `title` | string | yes | |
| `date` | date (`YYYY-MM-DD`) | yes | |
| `author` | string | no | Who wrote it, if known |
| `tags` | array of strings | no | Free-form topic tags, e.g. `["AI", "Standards"]` |
| `sourceUrl` | string (URL) | no | External source being discussed; do not use the retired community site as a source |
| `directLink` | boolean | no | Set to `true` when cards and feeds should open `sourceUrl` directly |
| `legacyPath` | string | no | Original `/YYYY/MM/DD/slug/` WordPress path retained as migration metadata |

## Adding a post

File name: `src/content/news/YYYY-MM-DD-short-slug.md`

```markdown
---
title: "Why X matters for decision management"
date: 2026-09-01
author: "Your Name"
tags: ["AI", "Standards"]
sourceUrl: "https://example.com/the-article-being-discussed"
directLink: false
---

A few paragraphs in your own words — commentary, an interview writeup, or a summary of something
worth the community's attention. Link out to the full source rather than reproducing it wholesale.
```

See [CONTRIBUTING.md](../../../CONTRIBUTING.md) for how to open the pull request itself.

## WordPress migration tooling

The one-time importer is retained at `scripts/import-wordpress-news.py` for migration provenance.
It generated the Markdown archive, downloaded referenced uploads into `public/news-media/`, rewrote
internal post links, and recorded missing media. The deployed site does not call the old WordPress
API and does not require the legacy site to remain online.

The packed files under `archives/news-media/` are committed to Git. The site build automatically
extracts them into `public/news-media/`, keeping the deployed archive self-contained without
requiring hundreds of binary GitHub API writes.
