---
title: Make a Good Burger
date: 2015-06-01
tags: [optimization, constraint-solving]
solutions:
  - title: Corticon
    author: Michael Parish
    affiliation: Progress Software
    url: "/resources/articles/2015-06-01-make-a-good-burger-corticon/"
  - title: OpenRules
    author: Jacob Feldman
    affiliation: OpenRules
    url: https://openrules.wordpress.com/2015/06/08/decision-make-a-good-burger/
  - title: DMN FEEL prototype
    author: Gary Hallmark
    affiliation: Oracle
    url: "/resources/articles/2015-06-01-make-a-good-burger-dmn-feel-prototype/"
  - title: cDMN
    author: Simon Vandevelde
    url: https://cdmn.readthedocs.io/en/latest/Examples/change_making.html
  - title: CPLEX
    author: Alex Fleischer
    url: "/resources/articles/2015-06-01-make-a-good-burger-cplex/"
---

Another PuzzlOR-inspired problem: design a burger recipe out of a fixed list of available ingredients, each with its own cost, sodium, fat, and calorie content per serving.

**Constraints:**
- Include at least one and at most five servings of each ingredient (whole servings only — no half-servings).
- The finished burger must have less than 3000 mg of sodium, less than 150 g of fat, and less than 3000 calories.
- To keep the taste balanced, the number of ketchup servings must equal the number of lettuce servings, and the number of pickle servings must equal the number of tomato servings.

**Question**: What's the cheapest burger you can build that satisfies all the constraints? What's the most expensive one?

Send your solutions to [DecisionManagementCommunity@gmail.com](mailto:DecisionManagementCommunity@gmail.com), or [open a pull request](https://github.com/Decision-Management-Community/dm-community/blob/main/CONTRIBUTING.md) to add yours here.
