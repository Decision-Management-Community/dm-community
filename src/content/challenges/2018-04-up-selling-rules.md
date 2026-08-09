---
title: "Up-Selling Rules"
date: 2018-04-01
tags: [business-rules, retail]
solutions:
  - title: DT5GL
    author: Jack Jansonius
    url: https://dmcommunity.org/wp-content/uploads/2018/04/challengeapr2018-jackjansonius.pdf
  - title: Corticon
    author: Mike Parish
    url: https://dmcommunity.org/wp-content/uploads/2018/04/challengeapr2018-mikeparish.pdf
  - title: OpenRules
    author: Jacob Feldman
    url: https://openrules.wordpress.com/2018/04/30/dmcommunity-challenge-april-2018-up-selling-rules/
---

Up-selling means offering a customer new products based on their profile and what they already own. This challenge asks for different implementations of the following two-step rule set.

**Step 1 — classify the customer** by their combined balance:

| Combined Balance | Customer Profile |
|---|---|
| \$500 – \$1,999 | Bronze |
| \$2,000 – \$4,999 | Silver |
| \$5,000 – \$14,999 | Gold |
| ≥ \$15,000 | Platinum |

**Step 2 — offer products** based on profile and current holdings:

| Profile | Already has | Does NOT have | Offer |
|---|---|---|---|
| Bronze or Silver | Product 1 | Product 2 | Products 2, 4, 5 |
| Bronze or Silver | Products 1, 3 | Products 6, 7, 8 | Products 6, 7, 8 |
| Bronze or Silver | Products 1, 2 | Products 6, 7, 8 | Products 9, 7, 8, 4, 5 |
| Gold | Product 1 | Products 6, 7, 8, 5 | Products 9, 7, 8, 4, 5, 10 ("Gold Package") |
| Platinum | Products 1, 2 | Products 6, 7, 8, 5 | Products 9, 7, 8 (no annual fee), 4, 5 (no charge), 10 ("Platinum Package") |

The interesting part is sequencing: the customer profile must be derived first, before the up-sell offers (which key off that profile) can be evaluated — submissions are compared partly on how naturally each tool expresses that ordering dependency.

Send your solutions to [DecisionManagementCommunity@gmail.com](mailto:DecisionManagementCommunity@gmail.com), or [open a pull request](https://github.com/Decision-Management-Community/dm-community/blob/main/CONTRIBUTING.md) to add yours here.
