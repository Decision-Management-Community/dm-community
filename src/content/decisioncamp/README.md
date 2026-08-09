# DecisionCAMP

One file per year/edition of the conference (DecisionCAMP, or its predecessors RulesFest and
IntelliFest), rendered at `/decisioncamp/`.

## Schema

| Field | Type | Required | Notes |
|---|---|---|---|
| `year` | number | yes | |
| `title` | string | yes | e.g. `"DecisionCAMP 2026"` or `"RulesFest 2011"` |
| `location` | string | no | |
| `url` | string (URL) | no | The edition's own website, or a flyer/announcement if no site survives |

## Adding or backfilling an edition

File name: `src/content/decisioncamp/YYYY.md`

```markdown
---
year: 2027
title: "DecisionCAMP 2027"
location: "Online"
url: "https://decisioncamp.org/"
---

Optional body: organizers, program committee, links to presentations. If you have the actual
presentation files (PDFs, slides) rather than just links to the old site, host them under
`public/decisioncamp/<edition-slug>/` and link to the local copy — see the existing RulesFest
2009-2011 entries for the pattern.
```

Most editions from 2013 onward just link out to that year's own conference website rather than
inlining a session list — that's fine; only go to the trouble of downloading and hosting a full
presentation archive for older/historical editions whose original site might disappear.

See [CONTRIBUTING.md](../../../CONTRIBUTING.md) for how to open the pull request itself.
