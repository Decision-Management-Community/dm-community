---
title: Contribute
description: How to contribute content or code to the Decision Management Community site.
order: 2
---

This site is open source and community-run. Anyone can propose an addition or a fix — you don't
need to be a developer, and you don't need permission before you start. The whole point of
rebuilding it this way is to make it as easy as possible for practitioners to pitch in, rather than
routing everything through a single gatekeeper.

## The short version

1. **Fork this repository** (or create a branch, if you already have write access):
   [github.com/Decision-Management-Community/dm-community](https://github.com/Decision-Management-Community/dm-community)
2. **Add or edit a Markdown file.** Most contributions — a case study, a tool listing, a Challenge
   solution, a Q&A post — are just a `.md` file with a bit of frontmatter. No build step required to
   propose one; you can even create the file directly in the GitHub web UI.
3. **Open a pull request.** An automated check builds the site and validates your file against its
   schema, so you'll know right away if something's missing before a human ever looks at it.
4. **A maintainer reviews it.** Right now that's Adam DeJans Jr. or Jacob Feldman — one of us reads
   every pull request and either merges it, asks a quick question, or explains why it doesn't fit.
   We'd rather merge something imperfect and iterate than leave a good contribution stuck in review.

See **[CONTRIBUTING.md](https://github.com/Decision-Management-Community/dm-community/blob/main/CONTRIBUTING.md)**
for the exact frontmatter schema and a worked example for each content type.

## What's worth contributing

- A **case study**, **tool**, or **decision model** we're missing from the Resources library
- A solution to a past **Challenge**, or a new Challenge idea
- A question or discussion topic for **Q&A**
- An **event** the community should know about
- A **Vendor's Corner** announcement, if you work at a vendor
- Corrections — a dead link, an outdated detail, a typo. Small fixes are welcome and usually merge fast.
- Site or code improvements — this is an ordinary Astro codebase; see the repository's `README.md`
  to run it locally.

If you're not sure whether something fits, open an issue or a draft pull request and ask — that's a
completely normal way to start a contribution, not a prerequisite you need to clear first.

## Why this matters

Twelve-plus years of community knowledge lived on the old site, spread across a lot of infrastructure
only one or two people could touch. Moving to a plain Git repository means anyone can read the entire
history, propose a change with full transparency about what it does, and see it reviewed in the open.
That's the goal here — not a smaller version of the old site, but a more collaborative one.

Questions? Email [DecisionManagementCommunity@gmail.com](mailto:DecisionManagementCommunity@gmail.com).
