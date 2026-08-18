---
title: "Tax Decision Table"
date: 2018-02-01
tags: [business-rules, dmn]
solutions:
  - title: Corticon
    author: Mike Parish
    url: "/resources/articles/2018-02-01-tax-decision-table-corticon/"
  - title: Camunda
    author: Bob Moore
    url: "/resources/articles/2018-02-01-tax-decision-table-camunda/"
  - title: OpenRules
    author: Jacob Feldman
    url: https://openrules.wordpress.com/2018/03/02/dmcommunity-org-challenge-feb-2018/
  - title: DT5GL
    author: Jack Jansonius
    url: "/resources/articles/2018-02-01-tax-decision-table-dt5gl/"
  - title: Trisotech/RapidGen
    author: Jan Purchase
    url: "/resources/articles/2018-02-01-tax-decision-table-trisotech-rapidgen/"
  - title: IBM ODM/Decide4AI
    author: Daniel Rodriguez and Alberto Grande Gómez
    url: https://decidesoluciones.es/en/resolution-dm-community-challenge-tax-decision-table/
---

This challenge takes a real decision table drawn up by a tax agency's business analyst and asks readers to re-implement it in their tool of choice, so the results can be compared side by side.

The original spreadsheet-style table has nine input conditions (e.g. whether the filing's document code is 7, 8, or 28; whether taxable income is under $50,000; whether interest income is under $400; whether taxable pension is zero; whether the filer is under 65; whether AGI is under $25,000; whether the ZIP code is valid) spread across twelve rule columns, each of which determines which of several tax forms (1040EZ Telefile, 1040EZ, 1040A with Schedule 1/2, 1040A with Schedule R, and others) should be mailed to the taxpayer next year. Several columns leave some conditions as "don't care," which is part of what makes it an interesting table to compare across tools — how does each one represent, validate, and detect gaps or overlaps in that kind of table?

Send your solutions to [DecisionManagementCommunity@gmail.com](mailto:DecisionManagementCommunity@gmail.com), or [open a pull request](https://github.com/Decision-Management-Community/dm-community/blob/main/CONTRIBUTING.md) to add yours here.
