---
title: "Vacation Days Advanced"
date: 2018-11-01
tags: [business-rules, optimization]
solutions:
  - title: Blaze Advisor
    author: Bob Moore
    url: https://dmcommunity.org/wp-content/uploads/2018/11/challengenov2018-bobmoore.pdf
  - title: OpenRules with JSR331
    author: Jacob Feldman
    url: https://dmcommunity.org/wp-content/uploads/2018/12/OpenRules-Solutions-for-Vacation-Days-Advanced.pdf
  - title: DT5GL
    author: Jack Jansonius
    url: https://dmcommunity.org/wp-content/uploads/2018/11/challengenov2018-jansonius.pdf
  - title: cDMN
    author: Simon Vandevelde
    url: https://cdmn.readthedocs.io/en/latest/Examples/vacation_days_advanced.html
---

The original "Vacation Days" problem (proposed by Prof. Jan Vanthienen, and previously run as a challenge in 2016) gets an advanced twist here. Every employee starts with 22 vacation days, and can qualify for extra days under several overlapping rules:

- Under 18, 60 or older, or at least 30 years of service: +5 days
- At least 30 years of service **and** age 60+: +3 more days, on top of any already given
- 15–29 years of service, or age 45+: +2 days
- A college student: +1 day
- A veteran: +2 days

The total, however it's formed, is capped at 29 days. Unlike the original 2016 version, these rules don't have "only apply this if that other rule didn't fire" dependencies — instead they combine as an optimization: maximize the total vacation days awarded to each employee subject to the 29-day cap.

Send your solutions to [DecisionManagementCommunity@gmail.com](mailto:DecisionManagementCommunity@gmail.com), or [open a pull request](https://github.com/Decision-Management-Community/dm-community/blob/main/CONTRIBUTING.md) to add yours here.
