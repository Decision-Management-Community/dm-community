---
title: Stable Marriage Problem
date: 2024-06-01
tags: [optimization, constraint-solving]
solutions:
  - title: OPL/CPLEX
    author: Alex Fleischer
    affiliation: IBM
    url: "/resources/articles/2024-06-01-stable-marriage-problem-opl-cplex/"
  - title: Prolog
    author: Matteo Redaelli
    url: https://www.mr70.eu/posts/dmcommunity_org_challenge-jun-2024/
  - title: Python
    author: Alireza Soroudi
    url: https://www.linkedin.com/pulse/optimal-marriage-using-alireza-soroudi-hc8xe/
  - title: OpenRules RuleSolver (with Java)
    author: Jacob Feldman
    affiliation: OpenRules
    url: "/resources/articles/2024-06-01-stable-marriage-problem-openrules-rulesolver-with-java/"
  - title: OpenRules RuleSolver (no Java)
    author: Jacob Feldman
    affiliation: OpenRules
    url: "/resources/articles/2024-06-01-stable-marriage-problem-openrules-rulesolver-no-java/"
  - title: watsonx
    author: Alex Fleischer
    affiliation: IBM
    url: "/resources/articles/2024-06-01-stable-marriage-problem-watsonx/"
---

This challenge is the classic stable marriage problem: given _n_ men and _n_ women, where each person has ranked every member of the opposite sex in order of preference, pair everyone up so that there's no man and woman who would both rather have each other than their current partners. A pairing with no such pair is called stable.

Example preferences:

**How men rank women** (1 = most preferred):

| | Alice | Barbara | Claire | Doris | Elsie |
|---|---|---|---|---|---|
| Adam | 5 | 1 | 2 | 4 | 3 |
| Bob | 4 | 1 | 3 | 2 | 5 |
| Charlie | 5 | 3 | 2 | 4 | 1 |
| Dave | 1 | 5 | 4 | 3 | 2 |
| Edgar | 4 | 3 | 2 | 1 | 5 |

**How women rank men** (1 = most preferred):

| | Adam | Bob | Charlie | Dave | Edgar |
|---|---|---|---|---|---|
| Alice | 1 | 2 | 4 | 3 | 5 |
| Barbara | 3 | 5 | 1 | 2 | 4 |
| Claire | 5 | 4 | 2 | 1 | 3 |
| Doris | 1 | 4 | 3 | 2 | 5 |
| Elsie | 4 | 2 | 3 | 5 | 1 |

Find a stable pairing for this example, and build a decision model general enough to handle any such preference table.

Send your solutions to [DecisionManagementCommunity@gmail.com](mailto:DecisionManagementCommunity@gmail.com), or [open a pull request](https://github.com/Decision-Management-Community/dm-community/blob/main/CONTRIBUTING.md) to add yours here.
