# Events

Conferences and events relevant to the community, rendered at `/events/` (split into Upcoming and
Past automatically based on `startDate`). One file per event.

## Schema

| Field | Type | Required | Notes |
|---|---|---|---|
| `title` | string | yes | |
| `startDate` | date (`YYYY-MM-DD`) | yes | |
| `endDate` | date (`YYYY-MM-DD`) | no | |
| `location` | string | no | e.g. `"Online"` or `"Toronto, Canada"` |
| `url` | string (URL) | no | |

## Adding an event

File name: `src/content/events/kebab-case-slug.md`

```markdown
---
title: "DecisionCAMP 2027"
startDate: 2027-08-24
endDate: 2027-08-26
location: "Online"
url: "https://decisioncamp.org/"
---
```

See [CONTRIBUTING.md](../../../CONTRIBUTING.md) for how to open the pull request itself.
