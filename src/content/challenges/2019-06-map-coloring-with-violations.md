---
title: "Map Coloring with Violations"
date: 2019-06-01
tags: [constraint-programming, optimization]
solutions:
  - title: JavaSolver
    author: Jacob Feldman
    url: https://javasolvers.wordpress.com/learn-by-examples/map-coloring-with-violations/
  - title: OPL CPLEX
    author: Alex Fleischer
    url: https://dmcommunity.org/wp-content/uploads/2019/06/dmcchallengejune2019.alexfleischer.pdf
  - title: SQL
    author: Damir Sudarevic
    url: https://dmcommunity.org/wp-content/uploads/2020/02/mapcoloringwithviolations.damirsudarevic.pdf
  - title: cDMN
    author: Simon Vandevelde
    url: https://cdmn.readthedocs.io/en/latest/Examples/map_coloring_advanced.html
  - title: RuleSolver
    author: Jacob Feldman
    url: https://rulesolver.wordpress.com/map-coloring-with-violations/
---

This is a harder follow-up to the [May-2019 Map Coloring challenge](/challenges/2019-05-map-coloring). The same six countries — Belgium, Denmark, France, Germany, Luxembourg, and the Netherlands — now need to be colored with only 3 colors (blue, red, green) instead of 4. That's not enough to avoid every same-colored border, so some violations are unavoidable — but each possible violation carries its own cost:

- France–Luxembourg: $257
- Luxembourg–Germany: $904
- Luxembourg–Belgium: $568

Find the coloring that minimizes total violation cost.

Send your solutions to [DecisionManagementCommunity@gmail.com](mailto:DecisionManagementCommunity@gmail.com), or [open a pull request](https://github.com/Decision-Management-Community/dm-community/blob/main/CONTRIBUTING.md) to add yours here.
