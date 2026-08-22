# Challenges

One monthly decision-modeling problem per file. Rendered at `/challenges/`, grouped by year, newest
first. This is one of the easiest content types to contribute to — either a brand-new Challenge, or
a solution to an existing one.

## Schema

| Field | Type | Required | Notes |
|---|---|---|---|
| `title` | string | yes | The challenge's name, e.g. `"A Brick Factory"` |
| `date` | date (`YYYY-MM-DD`) | yes | Usually the 1st of the month, or the actual publish date |
| `tags` | string[] | no | Short kebab-case tags, e.g. `[scheduling, optimization]` |
| `solutions` | array of objects | no | See below |

Each item in `solutions` is:

| Field | Type | Required |
|---|---|---|
| `title` | string | yes (e.g. `"OpenRules"`, `"IBM CPLEX"` — the tool/approach used) |
| `author` | string | yes |
| `affiliation` | string | no |
| `url` | string (URL) | no — omit if there's no working link, don't include a broken one |

For migrated solutions, the submitter's historical email link is restored automatically where the
legacy Challenge page supplied one. Do not add personal email addresses to new solutions unless the
submitter has explicitly agreed to publish them.

## Adding a new Challenge

File name: `src/content/challenges/YYYY-MM-short-slug.md`

```markdown
---
title: "Your Challenge Title"
date: 2026-09-01
tags: [scheduling]
solutions: []
---

Problem description in Markdown — tables and lists all work fine.
```

## Adding a solution to an existing Challenge

Edit that Challenge's file and append to its `solutions` list:

```yaml
solutions:
  - title: "My Solution"
    author: "Your Name"
    affiliation: "Your Company"
    url: "https://link-to-your-writeup.com"   # optional
```

**Verify your `url` actually resolves before including it.** If you don't have a working link, omit
the field and keep `title`/`author` — a broken link is worse than no link.

See [CONTRIBUTING.md](../../../CONTRIBUTING.md) for how to open the pull request itself.
