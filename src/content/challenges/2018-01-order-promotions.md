---
title: "Order Promotions"
date: 2018-01-01
tags: [business-rules, retail]
solutions:
  - title: OpenRules
    author: Jacob Feldman
    url: https://openrules.wordpress.com/2018/01/03/decision-model-for-sales-order-promotions/
  - title: Corticon
    author: Mike Parish
    url: "/resources/articles/2018-01-01-order-promotions-corticon/"
  - title: Drools/Java
    author: Bob Moore
    url: "/resources/articles/2018-01-01-order-promotions-drools-java/"
  - title: DMN FEEL
    author: Bruce Silver
    url: "/resources/articles/2018-01-01-order-promotions-dmn-feel/"
---

Merchants want to define promotions for sales orders and have a decision model automatically determine which orders qualify. An order consists of line items, each with a known price and quantity; a promotion specifies the minimum quantities of particular items an order must contain to be eligible.

**Example promotion:** reduce the order total by $3.50 if it contains at least 5 units of item 1108 and at least 4 units of item 2639.

Submit a decision model that determines order-promotion eligibility given an arbitrary list of promotions and an arbitrary order. This challenge was proposed by Jesse Rey of Goya Foods, and turns out to be a good test of how well a tool compares lists of objects against each other.

Send your solutions to [DecisionManagementCommunity@gmail.com](mailto:DecisionManagementCommunity@gmail.com), or [open a pull request](https://github.com/Decision-Management-Community/dm-community/blob/main/CONTRIBUTING.md) to add yours here.
