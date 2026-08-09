# Vendor's Corner

Dated vendor product announcements, rendered at `/vendors-corner/` and pulled automatically into the
homepage activity feed and the RSS feed. One file per announcement.

## Schema

| Field | Type | Required | Notes |
|---|---|---|---|
| `title` | string | yes | A punchy one-line headline |
| `vendor` | string | yes | The company the announcement is about |
| `date` | date (`YYYY-MM-DD`) | yes | |
| `url` | string (URL) | no | |

## Adding an announcement

File name: `src/content/vendor-news/YYYY-MM-DD-short-slug.md`

```markdown
---
title: "Product X now supports DMN 1.5"
vendor: "Example Vendor"
date: 2026-09-01
url: "https://example.com/announcement"
---

One to three sentences summarizing the announcement, in your own words.
```

Vendors can submit their own announcement this way — you don't need to be a maintainer.

See [CONTRIBUTING.md](../../../CONTRIBUTING.md) for how to open the pull request itself.
