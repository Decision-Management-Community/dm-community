---
title: "Numerical Haikus"
date: 2019-11-01
tags: [constraint-programming, puzzles]
solutions:
  - title: Python 3.x
    author: Nathan Brixius
    url: https://github.com/natebrix/csp_haiku
  - title: JavaSolver
    author: Jacob Feldman
    url: https://openrules.wordpress.com/2019/10/23/creating-numerical-haiku-and-tanka-with-javasolver/
---

A traditional Japanese haiku is three lines with a 5/7/5 syllable count. Robert Bosch (known for his "Domino Art") proposed a numerical variant: an equation "haiku" where the English-language reading of each part follows the same 5/7/5 pattern. For example:

```
      77    ("seventy seven" = 5 syllables)
+   123    ("plus one hundred twenty three" = 7 syllables)
=   200    ("equals two hundred" = 5 syllables)
```

Nathan Brixius wrote about framing this as a constraint-satisfaction problem in his article "Creating Equation Haikus using Constraint Programming," which finds all such A + B = C haikus and poses a further challenge: modify the model to search for *other* forms of numerical poems (e.g. a five-line "tanka" with a 5/7/5/7/7 pattern).

Send your solutions — equation haikus, tankas, or anything in between — to [DecisionManagementCommunity@gmail.com](mailto:DecisionManagementCommunity@gmail.com), or [open a pull request](https://github.com/Decision-Management-Community/dm-community/blob/main/CONTRIBUTING.md) to add yours here.
