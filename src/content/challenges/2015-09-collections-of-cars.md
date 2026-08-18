---
title: Collections of Cars
date: 2015-09-01
tags: [business-rules]
solutions:
  - title: R
    author: Riccardo Hertel
    url: "/resources/articles/2015-09-01-collections-of-cars-r/"
  - title: Blueriq
    author: Maarten Schadd
    affiliation: Blueriq
    url: "/resources/articles/2015-09-01-collections-of-cars-blueriq/"
  - title: DMN FEEL
    author: Gary Hallmark
    affiliation: Oracle
    url: "/resources/articles/2015-09-01-collections-of-cars-dmn-feel/"
  - title: Corticon
    author: Michael Parish
    affiliation: Progress Software
    url: "/resources/articles/2015-09-01-collections-of-cars-corticon/"
  - title: FlexRule
    author: Arash Aghlara
    affiliation: FlexRule
    url: "/resources/articles/2015-09-01-collections-of-cars-flexrule/"
---

Given an arbitrary number of collections of cars (each car identified by make and model), build a decision model that:

1. Finds the set of cars common to *all* the collections.
2. Identifies cars that exist in only one collection and no others.

Start by solving it for just two collections, then see if your approach generalizes to any number of collections.

**Optional extension**: give each car a price attribute, and for each collection, keep only the most expensive instance of each make/model combination (eliminating cheaper duplicates).

Send your solutions to [DecisionManagementCommunity@gmail.com](mailto:DecisionManagementCommunity@gmail.com), or [open a pull request](https://github.com/Decision-Management-Community/dm-community/blob/main/CONTRIBUTING.md) to add yours here.
