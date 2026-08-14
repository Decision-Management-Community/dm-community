---
title: "Dynamic Loan Evaluation"
date: 2019-08-01
tags: [business-rules, financial-services]
solutions:
  - title: OpenRules
    author: Jacob Feldman
    url: https://openrules.wordpress.com/2020/07/13/stateful-loan-approval-process-with-aws-lambdaeventbridgesnssqs/
  - title: SparklingLogic
    author: Carole-Ann Berlioz
    url: https://www.sparklinglogic.com/dm-challenge-dynamic-loan-evaluation/
---

Modern decision applications increasingly need to do more than execute one rules-based transaction and forget it — they need to evaluate new facts as they arrive and update earlier conclusions accordingly. This challenge revives a mostly-unresolved [Dec-2016 loan approval challenge](https://dmcommunity.org/challenge/challenge-dec-2016/) and asks: how would you build this as a genuinely stateful, perpetually-running service today?

The scenario: a loan is approved once the borrower's accumulated equity (across all known securities pledged) exceeds their accumulated debt plus the requested loan amount ($50,000). Borrower equity is computed as monthly income × 0.8 × loan term (in months); each pledged security contributes its own (equity − debt) to the running total. Peter's monthly income is $4,000, his monthly debt is $2,500, and he's requesting a 36-month loan — but the securities backing the loan may be reported incrementally rather than all at once, so the decision needs to be re-evaluated as each new piece of collateral information comes in.

Send your solutions to [DecisionManagementCommunity@gmail.com](mailto:DecisionManagementCommunity@gmail.com), or [open a pull request](https://github.com/Decision-Management-Community/dm-community/blob/main/CONTRIBUTING.md) to add yours here.
