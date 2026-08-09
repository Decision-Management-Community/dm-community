---
title: "Classify Department Employees"
date: 2017-09-01
tags: [business-rules, dmn]
solutions:
  - title: DMN with Trisotech/Drools
    author: Bruce Silver
    url: https://dmcommunity.org/wp-content/uploads/2017/09/challengesep2017-brucesilver2.pdf
  - title: DMN with OpenRules
    author: Jacob Feldman
    url: https://openrules.wordpress.com/2017/09/07/calculating-aggregated-values-for-collections-of-business-objects/
  - title: Corticon
    author: Mike Parish
    url: https://dmcommunity.org/wp-content/uploads/2017/12/challengesep2017-mikeparish.pdf
  - title: MiniZinc
    author: Hakan Kjellerstrand
---

A human resources office holds records for every employee in every department — salary, marital status, age, and so on. Build a decision model that, for each department, computes the minimum, maximum, and average salary, along with a count of "high-paid" employees using a threshold rule such as "salary > 85,000."

The interesting part is representing aggregation over a collection (per-department roll-ups) alongside a simple per-employee classification rule, in whichever business rules or DMN tool you prefer.

Send your solutions to [DecisionManagementCommunity@gmail.com](mailto:DecisionManagementCommunity@gmail.com), or [open a pull request](https://github.com/Decision-Management-Community/dm-community/blob/main/CONTRIBUTING.md) to add yours here.
