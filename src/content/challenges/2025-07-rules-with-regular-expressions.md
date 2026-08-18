---
title: Rules with Regular Expressions
date: 2025-07-01
tags: [business-rules]
solutions:
  - title: Progress Corticon
    author: Seth Meldon
    affiliation: Progress
    url: "/resources/articles/2025-07-01-rules-with-regular-expressions-progress-corticon/"
  - title: OpenRules
    author: Jacob Feldman
    affiliation: OpenRules
    url: https://openrules.blog/2025/07/18/business-rules-with-regular-expressions/
  - title: RulesMatix
    author: Baljeet Singh Kandhari
    affiliation: RulesMatix
    url: "/resources/articles/2025-07-01-rules-with-regular-expressions-rulesmatix/"
  - title: DT5GL/SQL/Python
    author: Jack Jansonius
    url: "/resources/articles/2025-07-01-rules-with-regular-expressions-dt5gl-sql-python/"
  - title: IBM ODM
    author: Andrew Macdonald
    affiliation: IBM
    url: "/resources/articles/2025-07-01-rules-with-regular-expressions-ibm-odm/"
---

A university is building a system to help students choose courses toward a degree. Each course has a unique code such as "MA523" or "CS38251". Create a decision service that splits a set of courses into "allowed" and "not allowed" lists using pattern-based rules like these:

1. If the Degree Code is "MA Single" and the Course Code matches the pattern `MA52#` or `MA62#` (where `#` is any single character), add the course to the allowed list.
2. If the Degree Code is not "CS%" and the Course Code matches the pattern `CS%288%` or `CS%289%` (where `%` is any run of characters), add the course to the not-allowed list.

Send your solutions to [DecisionManagementCommunity@gmail.com](mailto:DecisionManagementCommunity@gmail.com), or [open a pull request](https://github.com/Decision-Management-Community/dm-community/blob/main/CONTRIBUTING.md) to add yours here.
