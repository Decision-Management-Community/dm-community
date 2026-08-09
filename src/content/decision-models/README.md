# Decision Models

Named, citable decision models (DMN, BPMN+DMN, or similar), rendered at `/resources/decision-models/`.
One file per model. This is *not* the place for a general blog post about decision modeling — it's
for a specific, distinct model with a real artifact behind it (a spreadsheet, a repo, a written
walkthrough), the same way a case study is a specific write-up rather than an opinion piece.

## Schema

| Field | Type | Required | Notes |
|---|---|---|---|
| `title` | string | yes | |
| `industry` | enum | yes | One of: `Financial Services`, `Insurance`, `Healthcare`, `Other` |
| `url` | string (URL) | no | |
| `linkStatus` | enum | no | `ok`, `broken`, or `unverified` (default) |
| `summary` | string | no | One to two sentences |

## Adding a decision model

File name: `src/content/decision-models/kebab-case-slug.md`

```markdown
---
title: "Loan Pre-Qualification"
industry: "Financial Services"
url: "https://example.com/model"
linkStatus: "ok"
summary: "A decision model for pre-qualifying loan applicants based on income, credit, and debt ratios."
---

Longer description of the model as Markdown — what it decides, what standard it uses (DMN, BPMN),
and what's distinctive about it.
```

**Set `linkStatus` honestly** — same rule as case studies and tools. If you have the actual model
files (an `.xlsx`, `.dmn`, or similar) rather than just a link, consider hosting them directly under
`public/` so this entry doesn't depend on an external link staying alive.

See [CONTRIBUTING.md](../../../CONTRIBUTING.md) for how to open the pull request itself.
