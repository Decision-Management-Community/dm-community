---
title: "Reindeer Ordering"
date: 2017-12-01
tags: [constraint-programming, optimization]
solutions:
  - title: Python
    author: Bob Moore
    url: "/resources/articles/2017-12-01-reindeer-ordering-python/"
  - title: SQL
    author: Damir Sudarevic
    url: https://www.damirsystems.com/reindeer-ordering/
  - title: OpenRules
    author: Jacob Feldman
    url: https://openrules.wordpress.com/2017/12/09/openrules-solution-for-the-christmas-challenge/
  - title: Corticon
    author: Mike Parish
    url: "/resources/articles/2017-12-01-reindeer-ordering-corticon/"
  - title: Camunda/Groovy
    author: Robert Parker
    url: "/resources/articles/2017-12-01-reindeer-ordering-camunda-groovy/"
  - title: Drools/Java
    author: Bob Moore
    url: "/resources/articles/2017-12-01-reindeer-ordering-drools-java/"
  - title: Corticon Alternative
    author: Mike Parish
    url: "/resources/articles/2017-12-01-reindeer-ordering-corticon-alternative/"
  - title: ZIMPL/LPSolve
    author: Robert Parker
    url: "/resources/articles/2017-12-01-reindeer-ordering-zimpl-lpsolve/"
  - title: DMN
    author: Robert Parker
    url: https://blog.camunda.com/post/2019/07/solving-santas-sequencing-problem-using-dmn/
  - title: MiniZinc
    author: Hakan Kjellerstrand
    url: https://github.com/hakank/hakank/blob/master/minizinc/reindeer_ordering.mzn
---

Santa's elves need to line up nine reindeer — Rudolph, Prancer, Cupid, Comet, Blitzen, Donder, Vixen, Dancer, and Dasher — into a single order to pull the sleigh, following a set of "behind" / "in front of" constraints such as:

- Comet is behind Rudolph, Prancer, and Cupid
- Blitzen is behind Cupid, and in front of Donder, Vixen, and Dancer
- Cupid is in front of Comet, Blitzen, and Vixen, and also in front of Rudolph and Dancer
- Donder is behind Vixen, Dasher, and Prancer, and also behind Comet and Cupid
- Rudolph is behind Prancer, and in front of Donder, Dancer, and Dasher
- Vixen is in front of Dancer and Comet, and behind Rudolph, Prancer, and Dasher
- Dancer is behind Donder, Rudolph, and Blitzen
- Prancer is in front of Cupid, Donder, and Blitzen
- Dasher is behind Prancer, and in front of Vixen, Dancer, and Blitzen

Find a total ordering of all nine reindeer that satisfies every constraint above.

Send your solutions to [DecisionManagementCommunity@gmail.com](mailto:DecisionManagementCommunity@gmail.com), or [open a pull request](https://github.com/Decision-Management-Community/dm-community/blob/main/CONTRIBUTING.md) to add yours here.
