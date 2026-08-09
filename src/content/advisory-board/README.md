# Advisory Board

One file per board member, rendered at `/advisory-board/`.

**New members are board-managed** — open an issue rather than a pull request if you'd like to
nominate someone or join yourself. This folder's PR path is for existing members updating their own
entry (affiliation, headshot, contact info).

## Schema

| Field | Type | Required | Notes |
|---|---|---|---|
| `firstName` | string | yes | |
| `lastName` | string | yes | |
| `suffix` | string | no | e.g. `"Jr."` — kept separate so it doesn't affect last-name sorting |
| `image` | string | no | Root-relative path under `public/advisory-board/`, e.g. `/advisory-board/jane-doe.jpg`. Falls back to an initials avatar if unset |
| `affiliation` | string | no | |
| `linkedin` | string (URL) | no | |
| `email` | string (email) | no | |

## Adding or updating your headshot

1. Add your photo under `public/advisory-board/your-name.jpg` (square, at least 200×200px, cropped
   so your face fills most of the frame — see any existing photo in that folder for the target crop).
2. Point `image` at it in your entry.

Only add your own photo, or one you have explicit permission to publish — don't add a photo of
someone else on their behalf.

See [CONTRIBUTING.md](../../../CONTRIBUTING.md) for how to open the pull request itself.
