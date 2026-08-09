---
title: Compressing Decision Tables
date: 2020-09-01
tags: [decision-tables, optimization]
solutions:
  - title: Rule Learner
    author: Jacob Feldman
    affiliation: OpenRules
    url: https://openrules.wordpress.com/2020/10/05/compressing-decision-tables/
  - title: DT5GL
    author: Jack Jansonius
    url: https://dmcommunity.org/wp-content/uploads/2020/10/challenge2020sep.jackjansonius.pdf
  - title: Alternative Heuristics
    author: Dr. Bob Moore
    url: https://dmcommunity.org/wp-content/uploads/2020/10/challenge2020sep.bobmoore.pdf
---

Using common sense, people can often compress a larger decision table into a smaller one that produces identical results — an 18-rule table might collapse to just 6 rules once the redundant conditions are spotted. But once a table has more attributes (columns), doing this compression by hand becomes difficult or impossible, even allowing for some margin of error — you generally need a tool.

This challenge asks you to compress the following multi-hit decision table (18 rules, including the default). Each row applies to a "Type," tests either an upper or lower bound on an "Adjustment" value and a "Loss" value, and classifies the case as TOP or BOTTOM:

| Type | Adjustment | Loss | Classified As |
|---|---|---|---|
| (no match) | | | NONE |
| 31 | > 200 | < -150 | TOP |
| 31 | < 200 | ≥ -189 | BOTTOM |
| 32 | > 500 | < -1000 | TOP |
| 32 | < 500 | ≥ -99 | BOTTOM |
| 33 | > 500 | < -1000 | TOP |
| 33 | < 500 | ≥ -100 | BOTTOM |
| 34 | > 500 | < -1000 | TOP |
| 34 | < 500 | ≥ -100 | BOTTOM |
| 35 | > 500 | < -800 | TOP |
| 35 | < 500 | ≥ -100 | BOTTOM |
| 36 | > 500 | < -800 | TOP |
| 36 | < 500 | ≥ -100 | BOTTOM |
| 37 | > 500 | < -2000 | TOP |
| 37 | < 500 | ≥ 0 | BOTTOM |

Try to compress this table into fewer rules while preserving exactly the same classification behavior for every possible input.

Send your solutions to [DecisionManagementCommunity@gmail.com](mailto:DecisionManagementCommunity@gmail.com), or [open a pull request](https://github.com/Decision-Management-Community/dm-community/blob/main/CONTRIBUTING.md) to add yours here.
