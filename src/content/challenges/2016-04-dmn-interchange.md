---
title: DMN Interchange Challenge
date: 2016-04-01
tags: [dmn, standards]
solutions:
  - title: XSLT/XPath
    author: Bruce Silver
    url: "/resources/articles/2016-04-01-dmn-interchange-challenge-xslt-xpath/"
  - title: OpenRules
    author: Jacob Feldman
    affiliation: OpenRules
    url: https://openrules.wordpress.com/2016/05/15/dmn-interchange/
---

One of the big promises of decision-modeling standardization is that a decision model built in one DMN-compliant tool should be interchangeable with another. DMN 1.1 introduced an XML interchange format for exactly this purpose — but at the time of this challenge, no one had actually demonstrated a decision model authored in DMN XML being loaded and executed by more than one tool.

This challenge picked the simplest possible target: the "Vacation Days" decision model from the January 2016 challenge (which by then had 19 independent implementations). Bruce Silver provided a DMN XML representation of it, based on Trisotech's submission, plus a second XML file based on Gary Hallmark's more complex FEEL-formula version. The challenge: can your DMN-compliant tool load and correctly execute either XML file?

Send your solutions to [DecisionManagementCommunity@gmail.com](mailto:DecisionManagementCommunity@gmail.com), or [open a pull request](https://github.com/Decision-Management-Community/dm-community/blob/main/CONTRIBUTING.md) to add yours here.
