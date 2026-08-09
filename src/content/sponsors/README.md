# Sponsors

One file per sponsor, rendered at `/sponsors/`.

**Becoming a sponsor is board-managed** — the $600/year sponsorship terms go through the board, not
a pull request. This folder's PR path is mainly for an existing sponsor updating their own logo,
summary, or URL.

## Schema

| Field | Type | Required | Notes |
|---|---|---|---|
| `name` | string | yes | |
| `url` | string (URL) | yes | |
| `logo` | string | no | Root-relative path under `public/sponsors/`, e.g. `/sponsors/example.svg`. Shown at up to 48px tall — an SVG or a PNG with a transparent background works best |
| `active` | boolean | no | Defaults to `true`; set to `false` to stop showing an expired sponsor without deleting the record |
| `order` | number | no | Lower numbers show first; defaults to `0` |

## Adding or updating a sponsor logo

1. Add the logo file under `public/sponsors/your-company.svg` (or `.png`).
2. Point `logo` at it in your entry.

Use the company's own official logo file — don't recolor or redraw someone else's logo without
their say-so; if their logo doesn't work well on a white card at small size (e.g. it's a
light/white-only wordmark), ask them for a version made for light backgrounds rather than editing
their brand asset yourself.

See [CONTRIBUTING.md](../../../CONTRIBUTING.md) for how to open the pull request itself.
