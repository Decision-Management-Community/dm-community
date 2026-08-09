---
title: Risky Stocks
date: 2025-05-01
tags: [business-rules]
solutions:
  - title: watsonx with Mistral
    author: Alex Fleischer
    affiliation: IBM
    url: https://dmcommunity.org/wp-content/uploads/2025/05/challenge2025may.watsonxalexfleischer.pdf
  - title: OpenRules Decision Manager
    author: Ian Detinich
    url: https://dmcommunity.org/wp-content/uploads/2025/06/challenge2025may.openrulesdecisionmanager.pdf
  - title: OpenRules Rule Solver
    author: Jacob Feldman
    affiliation: OpenRules
    url: https://openrules.blog/2025/06/21/solving-challenge-risky-stocks/
---

Build a decision service that decides whether to buy a given stock, based on guiding rules such as:

1. A stock in debt is considered risky.
2. A stock in fusion (merger) with another stock may be risky.
3. A stock in fusion with a strong stock is not risky.
4. Don't buy risky stocks unless they have a good price.

In practice these rules get refined over time — for example, Rule 3 might become "a stock not in debt and in fusion with a strong stock is not risky," and new rules about stocks involved in scalp and/or swing trading could be added later. How easy is it to extend your decision service with rules like these without breaking the existing ones?

Send your solutions to [DecisionManagementCommunity@gmail.com](mailto:DecisionManagementCommunity@gmail.com), or [open a pull request](https://github.com/Decision-Management-Community/dm-community/blob/main/CONTRIBUTING.md) to add yours here.
