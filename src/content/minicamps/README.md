# MiniCamps

Short online sessions held between annual DecisionCAMP editions, rendered at
`/decisioncamp/minicamps/`. One file per session.

## Schema

| Field | Type | Required | Notes |
|---|---|---|---|
| `title` | string | yes | |
| `date` | date (`YYYY-MM-DD`) | yes | |
| `speaker` | string | yes | |
| `affiliation` | string | no | |
| `recordingUrl` | string (URL) | no | |
| `slidesUrl` | string | no | A full URL, or a root-relative path to a file hosted under `public/` |

## Adding a MiniCamp session

File name: `src/content/minicamps/YYYY-MM-DD-short-slug.md`

```markdown
---
title: "Explainability in Agentic Decisioning"
date: 2026-09-15
speaker: "Jane Doe"
affiliation: "Example Corp"
recordingUrl: "https://youtube.com/watch?v=..."
slidesUrl: "/decisioncamp/minicamps/jane-doe-explainability.pdf"
---
```

See [CONTRIBUTING.md](../../../CONTRIBUTING.md) for how to open the pull request itself.
