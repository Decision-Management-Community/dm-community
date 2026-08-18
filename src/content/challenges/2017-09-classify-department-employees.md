---
title: "Classify Department Employees"
date: 2017-09-01
tags: [business-rules, dmn]
solutions:
  - title: DMN with Trisotech/Drools
    author: Bruce Silver
    url: "/resources/articles/2017-09-01-classify-department-employees-dmn-with-trisotech-drools/"
  - title: DMN with OpenRules
    author: Jacob Feldman
    url: https://openrules.wordpress.com/2017/09/07/calculating-aggregated-values-for-collections-of-business-objects/
  - title: Corticon
    author: Mike Parish
    url: "/resources/articles/2017-09-01-classify-department-employees-corticon/"
  - title: MiniZinc
    author: Hakan Kjellerstrand
    url: https://github.com/hakank/hakank/blob/master/minizinc/classify_department_employees.mzn
---

A human resources office holds records for every employee in every department — salary, marital status, age, and so on. Build a decision model that, for each department, computes the minimum, maximum, and average salary, along with a count of "high-paid" employees using a threshold rule such as "salary > 85,000."

The interesting part is representing aggregation over a collection (per-department roll-ups) alongside a simple per-employee classification rule, in whichever business rules or DMN tool you prefer.

Send your solutions to [DecisionManagementCommunity@gmail.com](mailto:DecisionManagementCommunity@gmail.com), or [open a pull request](https://github.com/Decision-Management-Community/dm-community/blob/main/CONTRIBUTING.md) to add yours here.
