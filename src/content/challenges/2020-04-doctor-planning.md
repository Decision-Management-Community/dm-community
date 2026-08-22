---
title: Doctor Planning
date: 2020-04-01
tags: [scheduling, healthcare]
solutions:
  - title: OPL
    author: Alex Fleischer
    affiliation: IBM
    url: "/resources/articles/2020-04-01-doctor-planning-opl/"
  - title: PostgreSQL
    author: Damir Sudarevic
    url: https://www.damirsystems.com/shift-scheduling/
  - title: ZIMPL
    author: Rob Parker
    url: "/resources/articles/2020-04-01-doctor-planning-zimpl/"
  - title: Prolog
    author: Matteo Redaelli
    url: https://www.mr70.eu/posts/doctor-planning-resolved-with-prolog/
  - title: OpenRules, JavaSolver, AWS Lambda
    author: Jacob Feldman
    affiliation: OpenRules
    url: https://openrules.wordpress.com/2020/04/22/building-a-live-worker-scheduler/
  - title: cDMN
    author: Simon Vandevelde
    affiliation: KU Leuven
    url: https://cdmn.readthedocs.io/en/latest/Examples/doctor_planning.html
  - title: HiGHS Shift-Scheduling MILP
    author: Adam DeJans Jr.
    affiliation: BitBros
    url: /resources/articles/2026-08-22-doctor-planning-highs-milp/
---

Based on a real-life use case offered by Simon Vandevelde (KU Leuven): a hospital needs a doctor present at all times. Build a 7-day schedule, starting on a Monday, that covers three shifts per day — early, late, and night — using 5 doctors, subject to these rules:

1. A doctor can only work one shift per day.
2. A doctor must be available for the shift they're assigned (see availability below).
3. If a doctor works the night shift, they either get the next day off or work the night shift again.
4. A doctor either works both weekend days or neither.

| Doctor | Availability |
|---|---|
| Fleming | Friday, Saturday, Sunday only |
| Freud | Every day, early or late shift, never night |
| Heimlich | Every day, but never the night shift on weekends |
| Eustachi | Every day, every shift |
| Golgi | Every day, every shift, but at most 2 night shifts total |

Produce a 7-day, 3-shift schedule that satisfies every doctor's requirements.

Send your solutions to [DecisionManagementCommunity@gmail.com](mailto:DecisionManagementCommunity@gmail.com), or [open a pull request](https://github.com/Decision-Management-Community/dm-community/blob/main/CONTRIBUTING.md) to add yours here.

> One submitted solution (Prolog, by Matteo Redaelli) was originally published as an external write-up whose link no longer resolves. If you're the author (or know a working link), please open a pull request adding the `url` field back.
