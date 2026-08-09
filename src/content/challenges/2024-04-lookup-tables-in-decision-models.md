---
title: Lookup Tables in Decision Models
date: 2024-04-01
tags: [business-rules]
solutions:
  - title: OpenRules
    author: Jacob Feldman
    affiliation: OpenRules
    url: https://dmcommunity.org/wp-content/uploads/2024/05/challenge2024april.openrules.pdf
  - title: ChatGPT
    author: Jack Jansonius
    url: https://chatgpt.com/share/1adacab7-5234-4d18-8632-4543f3d2ed6c
  - title: DT5GL
    author: Jack Jansonius
    url: https://dmcommunity.org/wp-content/uploads/2024/07/challenge2024.april_.jackjansonius.pdf
---

Business decision models often rely on lookup tables that can hold thousands of rows, which raises two practical issues: users need to be able to edit the table data without touching the decision model, and the tables may have hundreds of thousands of rows while still needing to stay fast in production.

This challenge is set in medical claim processing. Each claim includes lists of procedures and diagnoses, each with a type and code. The decision model must validate each claim's procedure/diagnosis pairs against two standard reference lists:

- If a procedure has type X or Y, check that the [procedure, diagnosis] pair appears in a "compatible codes" list of about 260,000 rows (by ICD-10 codes). Report any procedure that has no compatible diagnosis.
- If a procedure has type Z, check it against an "incompatible codes" list of only 83 ranges ([procedure code min/max, diagnosis code min/max]). Report any pair that falls in a forbidden range, without duplicates.

The decision service needs to stay flexible as the reference lists change, and fast enough to process millions of claims a day.

Send your solutions to [DecisionManagementCommunity@gmail.com](mailto:DecisionManagementCommunity@gmail.com), or [open a pull request](https://github.com/Decision-Management-Community/dm-community/blob/main/CONTRIBUTING.md) to add yours here.
