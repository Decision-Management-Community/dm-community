---
title: "Zebra Puzzle - A MILP Formulation"
date: 2026-09-14
author: "Adam DeJans Jr."
summary: "A Mixed-Integer Linear Programming solution to the September 2026 Zebra Puzzle challenge, using an assignment-problem encoding instead of constraint programming."
challengeUrl: "/challenges/2026-09-zebra-puzzle/"
---

The other solutions to this challenge use constraint programming: integer variables that hold a house number for each attribute, tied together with `allDifferent` and `abs()` relations. That's the natural way to model this puzzle, but it's worth showing the Mixed-Integer Linear Programming version too, since it's a genuinely different formulation, not just a different solver for the same model.

## The MILP formulation

MILP doesn't have a native "all houses are different" primitive the way CP does, so instead of house-number variables, this model uses **binary assignment variables**: for every attribute value and every house, a 0/1 variable saying whether that value is assigned to that house.

```
x[category, value, house] ∈ {0, 1}
```

for each of the five categories (nationality, color, drink, smoke, pet), each of their five values, and each of the five houses.

**Assignment constraints** (the linear-programming textbook encoding of "all-different"): every value goes to exactly one house, and every house gets exactly one value per category.

```
for each category, value:      sum over houses  x[category, value, house] == 1
for each category, house:      sum over values   x[category, value, house] == 1
```

**Direct clues** ("coffee is drunk in the green house") become an equality between two assignment variables for every house — the two attributes must land in the same house:

```
for each house h:  x[drink, Coffee, h] == x[color, Green, h]
```

**Fixed-position clues** ("the Norwegian lives in the first house") fix a single variable to 1.

**Relative-position clues** are where MILP and CP diverge the most. "The green house is immediately to the right of the ivory house" links house *h* to house *h-1* directly on the binary variables, with no house numbered 0:

```
x[color, Green, 1] == 0
for h in 2..5:  x[color, Green, h] == x[color, Ivory, h-1]
```

"Kools are smoked in the house next to the horse" is a same-or-adjacent relation, encoded per house against its actual neighbors:

```
for each house h:  x[smoke, Kools, h] <= sum of x[pet, Horse, h'] for h' adjacent to h
```

Because the house domain is small and fixed (five houses, so at most two neighbors each), this stays a plain linear inequality on binaries — no big-M constants or auxiliary indicator variables needed, which is often how these "next to" clues get modeled in bigger MILPs.

## Solving it

Built and solved with [PuLP](https://coin-or.github.io/pulp/) and its bundled CBC solver:

```python
import pulp

houses = range(1, 6)
categories = {
    "nationality": ["Englishman", "Spaniard", "Ukrainian", "Norwegian", "Japanese"],
    "color": ["Red", "Green", "Ivory", "Yellow", "Blue"],
    "drink": ["Coffee", "Tea", "Milk", "OrangeJuice", "Water"],
    "smoke": ["OldGold", "Kools", "Chesterfield", "LuckyStrike", "Parliaments"],
    "pet": ["Dog", "Snails", "Fox", "Horse", "Zebra"],
}

prob = pulp.LpProblem("zebra_puzzle_milp", pulp.LpMinimize)
x = {
    (cat, v, h): pulp.LpVariable(f"x_{cat}_{v}_{h}", cat="Binary")
    for cat, values in categories.items() for v in values for h in houses
}
prob += 0  # satisfaction problem, no objective

for cat, values in categories.items():
    for v in values:
        prob += pulp.lpSum(x[cat, v, h] for h in houses) == 1
    for h in houses:
        prob += pulp.lpSum(x[cat, v, h] for v in values) == 1

# ... the fourteen clues, each a handful of linear constraints as shown above ...

prob.solve(pulp.PULP_CBC_CMD(msg=0))
```

This is a genuine assignment-style MILP: linear equalities and inequalities over binary variables, no disjunctions solved via branching on an `allDifferent` global constraint the way a CP solver would.

## Result

CBC solves it instantly:

| House | Nationality | Color | Drink | Smoke | Pet |
|---|---|---|---|---|---|
| 1 | Norwegian | Yellow | Water | Kools | Fox |
| 2 | Ukrainian | Blue | Tea | Chesterfield | Horse |
| 3 | Englishman | Red | Milk | Old Gold | Snails |
| 4 | Spaniard | Ivory | Orange Juice | Lucky Strike | Dog |
| 5 | Japanese | Green | Coffee | Parliaments | **Zebra** |

**The Japanese resident in house 5 owns the zebra** — matching the other three published solutions to this challenge exactly. Excluding this exact assignment and re-solving returns infeasible, confirming it's the only solution.
