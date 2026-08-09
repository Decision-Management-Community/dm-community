---
title: Medical Claim Processing
date: 2022-05-01
tags: [healthcare, business-rules]
solutions:
  - title: OpenRules
    author: Jacob Feldman
    affiliation: OpenRules
    url: https://openrules.wordpress.com/2022/06/22/decision-model-for-medical-claim-processing/
  - title: Java
    author: Dr. Bob Moore
    url: https://dmcommunity.org/wp-content/uploads/2022/08/challenge2022may.bobmoore.pdf
  - title: DT5GL
    author: Jack Jansonius
    url: https://dmcommunity.org/wp-content/uploads/2022/09/challenge2022may.jj_.pdf
---

Insurance claim validation is a classic use case for rules engines. This challenge works from a real reference file, `ICD10Codes.csv` (roughly 70,000 rows), whose two columns list pairs of [ICD-10](https://en.wikipedia.org/wiki/International_Statistical_Classification_of_Diseases_and_Related_Health_Problems) diagnosis codes that cannot legitimately be reported together on the same claim (e.g. A48.5/A05.1, K75.0/A06.4, K75.0/K83.09, ...).

Given a claim's set of diagnosis codes — e.g. `{M43.6, F45.8}` — your decision service must flag every incompatible pair with an error like *"Diagnosis Code [XXX] cannot be reported together with [YYY]"*, checking both columns in both directions. Some diagnoses appear in both columns, so your service must avoid producing duplicate errors.

Test your service against these sample claims and report the errors produced, how your rules and data are represented, and your performance results:

1. `{D47.02, C94.32}`
2. `{E71.313, E72.3}`
3. `{R29.891, M43.6, F45.8}`
4. `{D75.81, C94.42}`

Send your solutions to [DecisionManagementCommunity@gmail.com](mailto:DecisionManagementCommunity@gmail.com), or [open a pull request](https://github.com/Decision-Management-Community/dm-community/blob/main/CONTRIBUTING.md) to add yours here.
