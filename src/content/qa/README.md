# Q&A

Discussion questions and prompts, rendered at `/qa/`. One file per question.

## Schema

| Field | Type | Required | Notes |
|---|---|---|---|
| `title` | string | yes | The question itself, as a short title |
| `date` | date (`YYYY-MM-DD`) | yes | |
| `category` | enum | yes | One of: `Agentic AI`, `Business Rules`, `Decision Intelligence Platforms`, `Decision Optimization`, `Machine Learning`, `DMN, BPMN, CMMN` |
| `author` | string | no | |

## Adding a Q&A post

File name: `src/content/qa/short-title.md`

```markdown
---
title: "Your Question"
date: 2026-09-01
category: "Business Rules"
author: "Your Name"
---

Your question or discussion prompt, in Markdown.
```

See [CONTRIBUTING.md](../../../CONTRIBUTING.md) for how to open the pull request itself.
