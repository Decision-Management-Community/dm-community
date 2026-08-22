# Contributors

Contributor profiles are rendered at `/contributors/` and `/contributors/<id>/`.

Use these pages for people who have contributed articles, challenge solutions, Q&A, talks, or other substantive work to the Decision Management Community. Profiles should remain factual and community-focused rather than promotional.

## Profile levels

Most profiles are intentionally lightweight community-directory records. They can be created from reliable public information such as the Advisory Board directory and then expanded by the person later.

`featured: true` is reserved for sustained or substantive contributors. The directory also automatically promotes a profile into the featured section once it has multiple indexed contributions. Featured cards are larger and sorted by indexed contribution count.

`structuredData: true` is opt-in and should be used only for intentionally enriched identity profiles. Bulk-created community profiles should leave it off.

## Schema

- `firstName`, `lastName`, optional `suffix`
- `image`: root-relative headshot path
- `headline`: concise area-of-work description
- `shortBio`: one or two sentence directory summary
- `website`, `linkedin`: optional profile links
- `affiliations`: organizations with optional URLs
- `expertise`: subject areas
- `availableFor`: optional advisory / consulting / speaking availability
- `engagementUrl`, `engagementNote`: optional independent engagement details
- `sameAs`: additional canonical identity URLs for structured data
- `featured`: intentionally highlight an established contributor
- `structuredData`: emit enriched Person JSON-LD for that profile

The profile page automatically surfaces authored articles, challenge solutions, Q&A, and news entries where the contributor is the named author.
