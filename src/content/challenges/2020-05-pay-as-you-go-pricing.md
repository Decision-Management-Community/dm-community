---
title: Pay-As-You-Go Pricing
date: 2020-05-01
tags: [business-rules, pricing]
solutions:
  - title: Excel/Python
    author: Dr. Bob Moore
    url: "/resources/articles/2020-05-01-pay-as-you-go-pricing-excel-python/"
  - title: SparklingLogic
    author: Carole-Ann Berlioz
    affiliation: SparklingLogic
    url: https://www.sparklinglogic.com/dm-challenge-pricing-demo/
  - title: Rulesmatix
    author: Baljeet Singh
    affiliation: Rulesmatix
    url: "/resources/articles/2020-05-01-pay-as-you-go-pricing-rulesmatix/"
  - title: OpenRules
    author: Jacob Feldman
    affiliation: OpenRules
    url: https://openrules.wordpress.com/2020/06/24/solution-for-dmcommunity-challenge-pay-as-you-go-pricing-rules/
  - title: DT5GL
    author: Jack Jansonius
    url: "/resources/articles/2020-05-01-pay-as-you-go-pricing-dt5gl/"
  - title: Relational Rule Base
    author: Leonid Nisenboym
    url: "/resources/articles/2020-05-01-pay-as-you-go-pricing-relational-rule-base/"
---

SaaS vendors typically bill on a pay-as-you-go, tiered-usage basis:

| Tier | Units | Cost |
|---|---|---|
| Free Tier | first 10,000 units/month | $0/unit |
| Tier 1 | up to 20,000 units/month | $0.050/unit |
| Tier 2 | 20,000–50,000 units/month | $0.030/unit |
| Tier 3 | above 50,000 units/month | $0.010/unit |

Cloud platforms like AWS require each SaaS vendor to report metered usage per customer every hour. Your pricing decision service is called at the start of each hour with three numbers: total units ever used, units used so far this month, and units used in just the last hour. It must return how many of the last hour's units fall into Tier 1, Tier 2, and Tier 3 (Free Tier units aren't billed). A few example rows (all-units / month-units / last-hour-units → Tier 1, Tier 2, Tier 3):

| All units | This month | Last hour | Tier 1 | Tier 2 | Tier 3 |
|---|---|---|---|---|---|
| 2,000 | 2,000 | 160 | 0 | 0 | 0 |
| 10,200 | 10,200 | 350 | 200 | 0 | 0 |
| 25,600 | 8,678 | 1,234 | 1,234 | 0 | 0 |
| 22,000 | 22,000 | 20,500 | 10,000 | 2,000 | 0 |
| 32,500 | 32,500 | 10,500 | 0 | 10,500 | 0 |
| 120,258 | 60,390 | 2,350 | 0 | 0 | 2,350 |
| 120,000 | 120,000 | 120,000 | 10,000 | 30,000 | 70,000 |

Implement this pricing decision service, test it against the examples above, and report your results.

Send your solutions to [DecisionManagementCommunity@gmail.com](mailto:DecisionManagementCommunity@gmail.com), or [open a pull request](https://github.com/Decision-Management-Community/dm-community/blob/main/CONTRIBUTING.md) to add yours here.
