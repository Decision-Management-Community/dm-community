---
title: Borrowing PASS/FAIL Decision with Mitigation Criteria
date: 2014-10-01
tags: [business-rules, financial-services]
solutions:
  - title: Oracle Policy Automation
    author: Martijn Tromm
    affiliation: Oracle
    url: https://dmcommunity.org/wp-content/uploads/2014/09/decision-management-challenge-oct-2014-solution-oracle-policy-automation.pdf
  - title: OpenL Tablets
    author: Hanna Peravalava
    affiliation: EIS Group
  - title: Corticon Studio
    author: Maria Jesus Garcia
    affiliation: DECIDE
    url: http://www.decidesoluciones.es/en/challenge-oct014-borrowing-passfail-decision-with-mitigation-criteria-corticon-studio/
  - title: IBM ODM 8.6
    author: Andrea Di Placido
    affiliation: DECIDE
    url: http://www.decidesoluciones.es/en/challenge-oct014-borrowing-passfail-decision-with-mitigation-criteria-ibm-odm-8-6-2/
  - title: OpenRules with DMN
    author: Jacob Feldman
    affiliation: OpenRules
    url: http://openrules.wordpress.com/2014/10/30/decisions-with-mitigation-criteria/
  - title: IDIOM
    author: Mark Norton
    affiliation: Idiom Software
  - title: Sparkling Logic
    author: Carole-Ann Matignon
    affiliation: Sparkling Logic
    url: http://www2.sparklinglogic.com/dmblog/2015/11/17/mitigation-rules/
---

A bank needs a PASS/FAIL decision for new borrowings, with mitigating criteria that can turn a FAIL into a PASS.

**Rule 1**: New borrowings cannot exceed 30% of total assets — unless the executive committee flag is "Y" and the committee's exposure override percentage is higher than the new-borrowings-to-total-assets ratio, in which case it PASSes anyway.

**Rule 2**: New borrowings cannot exceed the "1-4 Threshold" — unless the new borrowing amount is less than the customer's available non-repo collateral, in which case it PASSes anyway.

**Test data**

| Customer | Total Assets | Exec. Committee Flag | Exec. Committee Override | 1-4 Threshold | Non-Repo Collateral |
|---|---|---|---|---|---|
| #200 ABC Bank | 20,000,000 | Y | 35% | 1,000,000 | 2,500,000 |
| #500 Bank One | 50,000,000 | N | 0% | 3,000,000 | 3,250,000 |

Build a decision model that evaluates both customers correctly, and show what would need to change in the mitigation rules to flip a FAILing transaction to PASS.

Send your solutions to [DecisionManagementCommunity@gmail.com](mailto:DecisionManagementCommunity@gmail.com), or [open a pull request](https://github.com/Decision-Management-Community/dm-community/blob/main/CONTRIBUTING.md) to add yours here.
