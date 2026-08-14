---
title: Card Approval Decision
date: 2021-10-01
tags: [finance, business-rules]
solutions:
  - title: Red Hat DMN
    author: Sadhana Nandakumar
    affiliation: Red Hat
    url: https://blog.kie.org/2021/09/handling-effective-date-and-expiry-date-with-dmn-decisions.html
  - title: OpenRules
    author: Jacob Feldman
    affiliation: OpenRules
    url: https://openrules.wordpress.com/2021/10/21/a-simple-decision-model-dealing-with-dates/
  - title: Camunda
    author: Vedavyas Etikala
    url: https://dmcommunity.org/wp-content/uploads/2021/11/challenge2021oct.camunda.pdf
---

Build a decision model that produces a credit card approval decision. A "Standard Card Score" is computed from Annual Income and Assets, and the application is auto-approved once that score clears a threshold of 350. The score table itself depends on today's date — some scores changed as of January 1, 2022:

| Annual Income | Assets | Standard Card Score |
|---|---|---|
| < 50 | < 100 | 312 before 2022-01-01, 350 on/after |
| < 50 | 100–350 | 458 |
| < 50 | > 350 | 603 |
| 50–80 | < 100 | 416 |
| 50–80 | 100–350 | 562 |
| 50–80 | > 350 | 707 |
| 80–100 | < 100 | 468 |
| 80–100 | 100–350 | 614 |
| 80–100 | > 350 | 759 |
| ≥ 100 | < 100 | 520 |
| ≥ 100 | 100–350 | 645 |
| ≥ 100 | > 350 | 811 |

Model the decision requirements — a "Date Validity" input feeds the score calculation, which together with Annual Income and Assets drives the automatic approval decision — and implement the approval logic, paying particular attention to how the score table itself depends on the current date. This problem and a DMN-based solution were originally proposed in a Red Hat blog post about handling effective and expiry dates in DMN decisions.

Send your solutions to [DecisionManagementCommunity@gmail.com](mailto:DecisionManagementCommunity@gmail.com), or [open a pull request](https://github.com/Decision-Management-Community/dm-community/blob/main/CONTRIBUTING.md) to add yours here.
