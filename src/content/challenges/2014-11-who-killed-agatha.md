---
title: Who Killed Agatha?
date: 2014-11-01
tags: [logic-puzzle, constraint-solving]
solutions:
  - title: Corticon
    author: Mike Parish
    affiliation: Progress Software
    url: https://dmcommunity.org/wp-content/uploads/2014/10/who-killed-aunt-agatha-corticon.pdf
  - title: MiniZinc and 22 other solvers
    author: Hakan Kjellerstrand
  - title: OpenRules Rule Solver and Excel
    author: Jacob Feldman
    affiliation: OpenRules
    url: http://openrules.wordpress.com/2014/11/08/decision-determine-a-killer-of-aunt-agatha/
  - title: IBM ODM
    author: Charo Álvarez
    affiliation: DECIDE
    url: http://www.decidesoluciones.es/en/challenge-nov014-who-killed-agatha-2/
  - title: SQL
    author: Damir Sudarevic
    url: https://www.damirsystems.com/murder-mystery/
  - title: CPLEX
    author: Alex Fleischer
    url: https://dmcommunity.org/wp-content/uploads/2021/06/challenge2014nov.alexfleischer.pdf
---

This is the classic "Dreadsbury Mansion" murder-mystery puzzle (problem #55 in Pelletier's 1986 collection of automated-theorem-proving test problems), proposed by Len Schubert.

Someone in Dreadsbury Mansion killed Aunt Agatha. Agatha, the butler, and Charles live there, and are the only ones who do. Given:

- A killer always hates, and is never richer than, their victim.
- Charles hates no one that Agatha hates.
- Agatha hates everyone except the butler.
- The butler hates everyone who is not richer than Agatha.
- The butler hates everyone Agatha hates.
- No one hates everyone.

Who killed Agatha?

Send your solutions to [DecisionManagementCommunity@gmail.com](mailto:DecisionManagementCommunity@gmail.com), or [open a pull request](https://github.com/Decision-Management-Community/dm-community/blob/main/CONTRIBUTING.md) to add yours here.
