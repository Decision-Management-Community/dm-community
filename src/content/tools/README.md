# Tools

The tool catalog at `/resources/tools/`, grouped by category. One file per tool.

## Schema

| Field | Type | Required | Notes |
|---|---|---|---|
| `name` | string | yes | |
| `category` | enum | yes | One of: `DMN Tools`, `Rules Engines`, `Constraint Solvers`, `Optimization Solvers`, `Decision Intelligence Platforms` |
| `url` | string (URL) | no | |
| `linkStatus` | enum | no | `ok`, `broken`, or `unverified` (default) |
| `summary` | string | no | One sentence describing what it does |

## Adding a tool

File name: `src/content/tools/kebab-case-name.md`

```markdown
---
name: "Example Rules Engine"
category: "Rules Engines"
url: "https://example.com"
linkStatus: "ok"
summary: "One sentence describing what it does."
---
```

**Set `linkStatus` honestly**: `ok` only once you've actually checked the URL loads, `unverified` if
you haven't, or omit `url` entirely if there isn't a working link. The old site's tool catalogs were
mostly dead links by the time of this rebuild — don't repeat that.

See [CONTRIBUTING.md](../../../CONTRIBUTING.md) for how to open the pull request itself.
