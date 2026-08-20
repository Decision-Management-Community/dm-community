---
title: A Brick Factory
date: 2026-07-31
tags: [scheduling, optimization]
solutions:
  - title: Rule Scheduler
    author: Jacob Feldman
    affiliation: OpenRules
    url: https://openrulesdecisionmanager.com/rule-scheduler-oven/
  - title: HiGHS Time-Indexed MILP
    author: Adam DeJans
    url: /resources/articles/2026-08-19-brick-factory-highs-time-indexed-milp/
---

A brick factory must schedule five orders (A, B, C, D, E) as single, uninterrupted activities within an 11-day planning horizon. Each order requires a specific number of batches per day for a set duration:

| Order | Batches/day | Duration |
|-------|-------------|----------|
| A | 2 | 1 day |
| B | 1 | 4 days |
| C | 1 | 4 days |
| D | 1 | 2 days |
| E | 2 | 4 days |

The oven's capacity varies by time period:

| Days | Capacity |
|-------|----------|
| 0–1 | 2 |
| 1–2 | 1 |
| 2–3 | 0 |
| 3–5 | 1 |
| 5–10 | 3 |
| 10–11 | 1 |

**Goal:** Find a start time for each of the five orders (within the 11-day horizon) so that the oven's time-varying capacity is never exceeded.

Send your solutions to [DecisionManagementCommunity@gmail.com](mailto:DecisionManagementCommunity@gmail.com), or [open a pull request](https://github.com/Decision-Management-Community/dm-community/blob/main/CONTRIBUTING.md) to add yours here.
