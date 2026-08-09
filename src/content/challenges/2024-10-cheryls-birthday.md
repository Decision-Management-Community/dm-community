---
title: Cheryl's Birthday
date: 2024-10-01
tags: [logic-puzzle]
solutions:
  - title: Python
    author: Peter Norvig
    url: https://github.com/norvig/pytudes/blob/main/ipynb/Cheryl-and-Eve.ipynb
  - title: CPLEX
    author: Alex Fleischer
    affiliation: IBM
    url: https://dmcommunity.org/wp-content/uploads/2024/10/challenge2024oct.cplexalexfleischer.pdf
---

This month's challenge is the well-known "Cheryl's Birthday" logic puzzle from Singapore. Cheryl gives her friends Albert and Bernard a list of 10 possible dates for her birthday: May 15, 16, 19; June 17, 18; July 14, 16; August 14, 15, 17. She tells Albert only the month and Bernard only the day. They then have this exchange:

- Albert: "I don't know when Cheryl's birthday is, but I know that Bernard doesn't know too."
- Bernard: "At first I didn't know when Cheryl's birthday is, but I know now."
- Albert: "Then I also know when Cheryl's birthday is."

When is Cheryl's birthday?

Peter Norvig previously asked nine LLM chatbots to solve this problem and found that most recalled the correct answer (July 16) from having seen it before, but none could write a program that actually derives it — they failed to model how each character's knowledge changes over time. Can your decision model do better?

Send your solutions to [DecisionManagementCommunity@gmail.com](mailto:DecisionManagementCommunity@gmail.com), or [open a pull request](https://github.com/Decision-Management-Community/dm-community/blob/main/CONTRIBUTING.md) to add yours here.
