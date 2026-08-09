---
title: "Balanced Assignment"
date: 2018-09-01
tags: [optimization, constraint-programming]
solutions:
  - title: AMPL
    author: Robert Fourer
    url: https://ampl.com/MEETINGS/TALKS/2018_08_Lille_Tutorial1.pdf
  - title: OPL
    author: Alex Fleischer
    url: https://dmcommunity.org/wp-content/uploads/2018/10/dmcseptember2018oplalexfleischer.pdf
  - title: CP Optimizer
    author: Philippe Laborie
    url: https://dmcommunity.org/wp-content/uploads/2019/04/dmcseptember2018.phillppelaborie.pdf
  - title: OpenRules with CP/LP Solvers
    author: Jacob Feldman
    url: https://openrules.files.wordpress.com/2019/04/balancedassignmentwithrulesandconstraints.pdf
---

This challenge, contributed by Prof. Robert Fourer, is about assigning people to groups fairly — the same underlying problem as assigning students to project teams or professors to shared offices.

210 people are split across 4 categories (in the original data set: a department code, a work location, a gender, and a job title). They must be assigned to 12 groups, each sized 16, 17, 18, or 19 people, with each person in exactly one group. The goal is "diversity": prefer assignments where people sharing the same category values end up spread across different groups rather than clustered together.

The interesting question the challenge poses: alongside specialized optimization tools like AMPL, can traditional business rules/decision management tools express and solve a combinatorial problem like this one?

Send your solutions to [DecisionManagementCommunity@gmail.com](mailto:DecisionManagementCommunity@gmail.com), or [open a pull request](https://github.com/Decision-Management-Community/dm-community/blob/main/CONTRIBUTING.md) to add yours here.
