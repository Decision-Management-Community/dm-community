---
title: Case Assignments
date: 2025-04-01
tags: [business-rules, optimization]
solutions:
  - title: cDMN
    author: Simon Vandevelde
    affiliation: KU Leuven
    url: https://cdmn.readthedocs.io/en/latest/Examples/case_assignment.html
  - title: OpenRules (with Rule Solver)
    author: Jacob Feldman
    affiliation: OpenRules
    url: https://openrules.blog/2025/04/04/assigning-cases-to-analysts/
  - title: OpenRules (rules only, no Rule Solver)
    author: Jacob Feldman
    affiliation: OpenRules
    url: https://openrules.blog/2025/04/06/trying-to-find-an-optimal-decision-without-an-optimization-engine/
  - title: OPL CPLEX
    author: Alex Fleischer
    affiliation: IBM
    url: "/resources/articles/2025-04-01-case-assignments-opl-cplex/"
  - title: Corticon
    author: Seth Meldon
    affiliation: Progress
    url: https://github.com/corticon/corticon-classic-samples/blob/main/Case%20Assignment/README.md
  - title: DT5GL/SQL
    author: Jack Jansonius
    url: "/resources/articles/2025-04-01-case-assignments-dt5gl-sql/"
  - title: Scarcity-First Heuristic + HiGHS
    author: Adam DeJans Jr.
    affiliation: BitBros
    url: "/resources/articles/2026-08-22-case-assignments-option-value/"
---

An analytical firm assigns cases to analysts using these rules:

1. A case must go to an analyst whose focus area matches the case type.
2. An analyst can't take a case whose dollar amount exceeds their maximum allowed case amount.
3. An analyst can't take a case that would push their total assigned dollar amount over their maximum.
4. Each analyst level corresponds to a case-complexity range: an analyst can only work on cases whose complexity falls within their minimum and maximum case complexity (inclusive).

Given a list of analysts (with their current caseload) and a list of new cases, decide which analyst should be assigned to each case. If there's a choice, the firm prefers to minimize "overqualification" — assigning analysts to cases below their level. Build a decision service that can handle this and similar case-assignment problems.

Send your solutions to [DecisionManagementCommunity@gmail.com](mailto:DecisionManagementCommunity@gmail.com), or [open a pull request](https://github.com/Decision-Management-Community/dm-community/blob/main/CONTRIBUTING.md) to add yours here.
