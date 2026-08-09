---
title: Dots and Boxes
date: 2022-10-01
tags: [game-theory, machine-learning]
solutions: []
---

Build a decision model that can play the classic pencil-and-paper game "[Dots and Boxes](https://www.youtube.com/watch?v=hQdQWxQk8_A&t=13s)," with rules borrowed from Ben Orlin's book *Math Games with Bad Drawings*: players take turns drawing one line — horizontal or vertical — between two adjacent dots on a grid. Whoever draws the line that completes the fourth side of a 1×1 box claims that box (and, when a single move completes two boxes at once, claims both). Once the grid is full, whoever claimed the most boxes wins.

You can implement any strategy documented in the book or found elsewhere online, or try something more ambitious — a decision model that learns from its own wins and losses, the way Dr. Bob Moore's earlier solution did for the NIM challenge. It would be a nice touch to wrap your model in a simple interface so readers can actually play against it.

Send your solutions to [DecisionManagementCommunity@gmail.com](mailto:DecisionManagementCommunity@gmail.com), or [open a pull request](https://github.com/Decision-Management-Community/dm-community/blob/main/CONTRIBUTING.md) to add yours here.
