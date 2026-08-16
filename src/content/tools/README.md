# Tools

The tool catalog at `/resources/tools/`, filterable by functional category. One file per tool.

## Schema

| Field | Type | Required | Notes |
|---|---|---|---|
| `name` | string | yes | |
| `categories` | array | yes | One or more of: `BR`, `ML`, `OPT`, `LLM` |
| `url` | string (URL) | no | |
| `linkStatus` | enum | no | `ok`, `broken`, or `unverified` (default) |

## Adding a tool

File name: `src/content/tools/kebab-case-name.md`

```markdown
---
name: "Example Rules Engine"
categories: ["BR", "LLM"]
url: "https://example.com"
linkStatus: "ok"
---
```

**Set `linkStatus` honestly**: `ok` only once you've actually checked the URL loads, `unverified` if
you haven't, or omit `url` entirely if there isn't a working link. The old site's tool catalogs were
mostly dead links by the time of this rebuild — don't repeat that.

Category abbreviations: `BR` = Business Rules, `ML` = Machine Learning, `OPT` = Optimization,
and `LLM` = Agentic AI.

See [CONTRIBUTING.md](../../../CONTRIBUTING.md) for how to open the pull request itself.
