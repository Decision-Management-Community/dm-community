---
title: Find Duplicate Product Lines
date: 2015-08-01
tags: [business-rules, data-quality]
solutions:
  - title: OpenRules
    author: Jacob Feldman
    affiliation: OpenRules
    url: https://openrules.wordpress.com/2014/02/23/can-a-decision-model-define-uniqueness-of-objects-inside-a-collection/
  - title: Corticon
    author: Michael Parish
    affiliation: Progress Software
    url: "/resources/articles/2015-08-01-find-duplicate-product-lines-corticon/"
  - title: R
    author: Riccardo Hertel
    url: "/resources/articles/2015-08-01-find-duplicate-product-lines-r/"
---

A sales order contains a list of product lines. Build a decision model that identifies which product lines within an order are duplicates of each other, where "duplicate" is defined by a user-configurable similarity rule — for example, two product lines might be considered duplicates if they share the same SKU and price.

The interesting part is representing this kind of set/collection-level reasoning (comparing every item in a collection against every other item) in a decision model, rather than just in imperative code.

Send your solutions to [DecisionManagementCommunity@gmail.com](mailto:DecisionManagementCommunity@gmail.com), or [open a pull request](https://github.com/Decision-Management-Community/dm-community/blob/main/CONTRIBUTING.md) to add yours here.
