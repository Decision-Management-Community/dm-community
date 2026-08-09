---
title: Port Clearance Rules
date: 2016-03-01
tags: [business-rules, compliance]
solutions:
  - title: DecisionsFirst
    author: James Taylor
    affiliation: Decision Management Solutions
    url: https://dmcommunity.org/wp-content/uploads/2016/03/portexample-decisionsfirst.pdf
  - title: BiZZdesign
    author: Antonio Plais
    affiliation: CENTUS
    url: https://dmcommunity.org/wp-content/uploads/2016/03/port-clearance-centus.pdf
  - title: Corticon
    author: Michael Parish
    affiliation: Progress Software
    url: https://dmcommunity.org/wp-content/uploads/2016/03/corticon-solution-1-port-clearance-as-specified.pdf
  - title: Blueriq
    author: Maarten Schadd
    affiliation: Blueriq
    url: https://dmcommunity.org/wp-content/uploads/2016/03/port-clearance-blueriq.pdf
  - title: Trisotech
    author: Denis Gagné
    affiliation: Trisotech
    url: https://dmcommunity.org/wp-content/uploads/2016/03/port-clearance-trisotech.pdf
  - title: PSOA RuleML
    author: Gen Zou, Harold Boley, Dylan Wood, and Kieran Lea
    affiliation: University of New Brunswick
    url: http://ruleml.org/talks/PortClearanceRulesPSOARuleML-talk.pdf
---

Decide whether a ship may enter a Dutch port on a given date, based on rules inspired by the international Ship and Port Facility Security Code (originally developed for "The Game of Rules," a publication of the Business Rules Platform Netherlands by Silvie Spreeuwenberg, Charlotte Bouvy, and Martijn Zoet). The rule set isn't meant to be exhaustive, but it does chain through several layers of definitions:

- A ship's hold is "clean" if it has no remaining cargo residue.
- An unloaded ship may enter port only if it passes the "Inspection for unloaded ships," which requires (a) meeting safety requirements for unloaded ships, and (b) holding a valid certificate of registry.
- A ship is "large" if its total length is at least 80 meters, otherwise "small."
- A hold "contains remainders of cargo" if the residual-cargo measurement exceeds 0.5 mg dry weight per cm².
- Safety requirements for unloaded ships are met if the ship meets the safety requirements for its size class (small or large).
- Large unloaded ships meet safety requirements if they're categorized as large, and their hold is both clean and double-hulled.
- Small unloaded ships meet safety requirements if they're categorized as small and their hold is clean.
- A certificate of registry is "valid" if its expiration date is after the current date.

Send your solutions to [DecisionManagementCommunity@gmail.com](mailto:DecisionManagementCommunity@gmail.com), or [open a pull request](https://github.com/Decision-Management-Community/dm-community/blob/main/CONTRIBUTING.md) to add yours here.
