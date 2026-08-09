# Case Studies

Real-world write-ups of decision management in production, rendered at `/resources/case-studies/`.
One file per case study.

## Schema

| Field | Type | Required | Notes |
|---|---|---|---|
| `title` | string | yes | |
| `organization` | string | no | Use `"—"` if you don't want to name the org |
| `industry` | string | no | |
| `vendor` | string | no | |
| `url` | string | no | A full URL, or a root-relative path to a file hosted under `public/` (e.g. `/case-studies/foo.pdf`) |
| `linkStatus` | enum | no | `ok`, `broken`, or `unverified` (default) |
| `summary` | string | no | One sentence |

## Adding a case study

File name: `src/content/case-studies/kebab-case-slug.md`

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

**Set `linkStatus` honestly**: `ok` if you've verified the URL loads, `unverified` if you haven't
checked, or omit `url` entirely if there isn't a working link (a summary-only entry is still
useful). If you have the source document (a PDF, etc.) rather than just a link, host it directly
under `public/case-studies/` and point `url` at that instead — that way this entry survives even if
the original link dies later.

See [CONTRIBUTING.md](../../../CONTRIBUTING.md) for how to open the pull request itself.
