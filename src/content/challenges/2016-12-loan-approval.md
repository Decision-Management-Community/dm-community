---
title: Loan Approval
date: 2016-12-01
tags: [business-rules, financial-services]
solutions:
  - title: OpenRules
    author: Jacob Feldman
    affiliation: OpenRules
    url: https://openrules.wordpress.com/2017/02/06/openrules-implementation-of-the-loan-approval-challenge/
---

Implement the following loan-approval scenario: a loan is approved if the borrower's accumulated equity — measured across all of their known securities — exceeds their accumulated debt plus the requested loan amount.

**Example**: Peter requests a $50,000 loan with a 36-month term. His monthly income is $4,000 and his monthly debt is $2,500. His total equity is calculated as `Monthly Income × 0.8 × Loan Term`. Each security he holds contributes its own `(equity − debt)` to the overall evaluation of the loan.

The harder question the challenge poses: how should your solution handle new "but" events arriving after the fact — i.e., new information that should cause the decision to be re-evaluated? (The original write-up demonstrated one approach: a decision engine wired into a pub/sub message broker so re-evaluation happens automatically as new facts arrive.)

Send your solutions to [DecisionManagementCommunity@gmail.com](mailto:DecisionManagementCommunity@gmail.com), or [open a pull request](https://github.com/Decision-Management-Community/dm-community/blob/main/CONTRIBUTING.md) to add yours here.
