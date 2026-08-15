# Articles

Long-form essays on decision management, rendered at `/resources/articles/`. One file per article.

News posts should stay short and link here (or elsewhere) rather than reproducing the full piece.

## Schema

| Field | Type | Required | Notes |
|---|---|---|---|
| `title` | string | yes | |
| `date` | date (`YYYY-MM-DD`) | yes | |
| `author` | string | no | Who wrote it |
| `linkedin` | string (URL) | no | Author LinkedIn profile |
| `originalUrl` | string (URL) | no | Where the piece was originally published, if elsewhere |
| `summary` | string | no | One or two sentences for the listing card |

## Adding an article

File name: `src/content/articles/YYYY-MM-DD-short-slug.md`

```markdown
---
title: "What the title actually is"
date: 2026-09-01
author: "Your Name"
linkedin: "https://www.linkedin.com/in/your-handle/"
originalUrl: "https://example.com/original-post"
summary: "A short teaser for the listing page."
---

The full essay goes here as regular Markdown.
```

See [CONTRIBUTING.md](../../../CONTRIBUTING.md) for how to open the pull request itself.
