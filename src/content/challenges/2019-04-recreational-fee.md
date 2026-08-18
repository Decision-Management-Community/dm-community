---
title: "Recreational Fee"
date: 2019-04-01
tags: [business-rules, dmn]
solutions:
  - title: Camunda
    author: Dr. Bob Moore
    url: "/resources/articles/2019-04-01-recreational-fee-camunda/"
  - title: DMN DRD
    author: Martin de Villiers
    url: "/resources/articles/2019-04-01-recreational-fee-dmn-drd/"
  - title: DMN DRD
    author: Gary Hallmark
    url: "/resources/articles/2019-04-01-recreational-fee-dmn-drd-2/"
  - title: OpenRules
    author: Jacob Feldman
    url: https://openrules.files.wordpress.com/2019/04/challenge2019apr.jacobfeldman-1.pdf
  - title: OpenRules (revised, addressing Ron Ross's concerns)
    author: Jacob Feldman
    url: https://openrules.wordpress.com/2019/10/16/another-solution-for-dmcommunity-challenge-recreational-fee/
  - title: Microsoft Flow and Trisotech
    author: Nick Broom
    url: https://youtu.be/2zuEk2EIitI
  - title: DT5GL
    author: Jack Jansonius
    url: "/resources/articles/2019-04-01-recreational-fee-dt5gl/"
---

A city has a decision table that sets usage fees for its recreational facilities based on how long a facility is used and when the usage occurs. On top of that decision table sits a separate behavioral business rule: *a senior citizen must not be charged a recreational fee for use of facilities.*

The challenge looks simple, but it's deliberately borrowed from Ron Ross's article "What Happens When Behavioral Business Rules and Decision Logic Collide?" — the point is to see how cleanly different tools let a blanket behavioral rule override or interact with a decision table's computed result, rather than requiring the exception to be woven back into the table itself. After several solutions came in, Ron Ross reviewed them and published his own commentary on how well each approach handled that collision.

Send your solutions to [DecisionManagementCommunity@gmail.com](mailto:DecisionManagementCommunity@gmail.com), or [open a pull request](https://github.com/Decision-Management-Community/dm-community/blob/main/CONTRIBUTING.md) to add yours here.
