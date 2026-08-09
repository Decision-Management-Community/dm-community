## What does this PR add or change?

<!-- e.g. "Adds a case study for Example Insurance Co." or "Fixes broken link in the FlexRule tool listing" -->

## Content type

- [ ] Case study
- [ ] Tool listing
- [ ] Decision model
- [ ] Challenge
- [ ] Q&A post
- [ ] Event
- [ ] Sponsor
- [ ] Vendor's Corner announcement
- [ ] Advisory Board photo/update
- [ ] Site code / design change

## Contributing guide

New here? See [CONTRIBUTING.md](../CONTRIBUTING.md) for the frontmatter schema, file location, and
worked example for each content type above before opening this PR. A few things worth knowing:

- Each content type lives under `src/content/<type>/*.md` and is validated against a schema in
  `src/content.config.ts` — the `content-check` CI job fails with a specific error if your
  frontmatter is missing a required field or has the wrong type.
- Set `linkStatus: "ok"` only once you've verified the URL loads; use `"unverified"` if you haven't
  checked, or omit `url` entirely if there isn't a working link.
- New Advisory Board members are board-managed — open an issue instead of a PR. Adding/updating your
  own headshot (once you're already listed) is fine as a PR.

## Checklist

- [ ] I ran `npm run build` locally (or will let the `content-check` CI job verify it)
- [ ] Any outbound links I added have been checked and `linkStatus` is set accordingly
- [ ] Frontmatter matches the schema described in [CONTRIBUTING.md](../CONTRIBUTING.md)
