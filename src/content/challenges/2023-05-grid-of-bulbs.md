---
title: Grid of Bulbs
date: 2023-05-01
tags: [optimization, logic-puzzle]
solutions:
  - title: OPL/CPLEX
    author: Alex Fleischer
    affiliation: IBM
    url: "/resources/articles/2023-05-01-grid-of-bulbs-opl-cplex/"
  - title: Python
    author: Julien Pradier
    affiliation: IBM
    url: "/resources/articles/2023-05-01-grid-of-bulbs-python/"
  - title: Constraint-Guided DFS / Python
    author: Adam DeJans Jr.
    affiliation: BitBros
    url: "/resources/articles/2026-08-22-grid-of-bulbs-guided-search/"
---

"Next best action" is a popular decision-making strategy, but how do you actually define the "best" next action? This challenge (adapted from an IBM Research "Ponder This" puzzle) demonstrates it. Consider an NxN grid of lightbulbs where some bulbs start on and some off. At every step, choose a bulb that is currently off: it turns on, and every other bulb in that bulb's row and column toggles (on becomes off, off becomes on). The goal is to reach a grid where every bulb is on — find the sequence of choices that gets there.

Send your solutions to [DecisionManagementCommunity@gmail.com](mailto:DecisionManagementCommunity@gmail.com), or [open a pull request](https://github.com/Decision-Management-Community/dm-community/blob/main/CONTRIBUTING.md) to add yours here.
