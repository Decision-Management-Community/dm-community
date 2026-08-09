---
title: Spatial Business Rules
date: 2020-07-01
tags: [business-rules, spatial]
solutions:
  - title: OpenRules
    author: Jacob Feldman
    affiliation: OpenRules
    url: https://openrules.wordpress.com/2020/07/26/using-templates-to-create-domain-specific-decision-tables
---

Companies with sophisticated GIS systems often still want their business subject-matter experts — not GIS engineers — to define and maintain spatial rules. This challenge (rules extracted from a DecisionCAMP-2014 presentation) works with concepts like Airports, Hospitals, HRR (Hospital Referral Region), and HSA (Hospital Service Area), combined into a "Spatial Significance Score" (SSS):

- If an HRR has at least 5 HSAs in it, increase SSS by 2; if fewer than 5, decrease SSS by 1.
- If an HRR overlaps at least two counties, increase SSS by 1.
- If an HRR contains an HSA within 5 km, increase SSS by 2; if it merely touches an HSA, increase SSS by 1.
- If at least one hospital is within 5 km of the airport, increase SSS by 5; if no hospital is within 10 km, increase SSS by 1.
- If between 5 and 15 hospitals are within 25 km of the airport, increase SSS by 3.
- If the HRR is among the 25 closest to the hospital, increase SSS by 1.
- If more than 1,200 residences are within 15 km of the hospital, increase SSS by 2.
- If the facility is part of a university, increase SSS by 1.

What mechanism would you offer business users so they can create and maintain rules like these without becoming GIS API experts? How might DMN-like decision tables represent this kind of spatial logic?

Send your solutions to [DecisionManagementCommunity@gmail.com](mailto:DecisionManagementCommunity@gmail.com), or [open a pull request](https://github.com/Decision-Management-Community/dm-community/blob/main/CONTRIBUTING.md) to add yours here.
