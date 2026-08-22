---
title: Change-Making Decision
date: 2015-02-01
tags: [optimization, constraint-solving]
solutions:
  - title: JSR331
    author: Jacob Feldman
    affiliation: JSR331
    url: http://www.jsr331.org
  - title: Corticon
    author: Michael Parish
    affiliation: Progress Software
    url: "/resources/articles/2015-02-01-change-making-decision-corticon/"
  - title: PROIV
    author: Sadie Geen
    affiliation: PROIV
  - title: cDMN
    author: Simon Vandevelde
    url: https://cdmn.readthedocs.io/en/latest/Examples/change_making.html
  - title: HiGHS Integer MILP
    author: Adam DeJans Jr.
    affiliation: BitBros
    url: /resources/articles/2026-08-22-change-making-highs-milp/
---

Given a target sum and a set of coin denominations, find the way to make that sum using the fewest coins.

Example: make 123 cents using denominations of 1, 10, 25, and 100 cents.

This is easy to solve by hand for a specific case (the classic "change-making problem"), but the challenge is to build a decision model that solves it *generically* for any sum and any set of denominations, and — ideally — that finds a provably optimal (minimum-coin) answer rather than just any feasible one. Note that the simple greedy strategy (always take the largest coin that fits) isn't guaranteed to be optimal for arbitrary denominations: with coins of 1, 3, and 4, making 6 greedily takes three coins (4+1+1), but the optimal answer is two (3+3).

Send your solutions to [DecisionManagementCommunity@gmail.com](mailto:DecisionManagementCommunity@gmail.com), or [open a pull request](https://github.com/Decision-Management-Community/dm-community/blob/main/CONTRIBUTING.md) to add yours here.
