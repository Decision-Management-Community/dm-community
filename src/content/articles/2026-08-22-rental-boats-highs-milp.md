---
title: "Solving Rental Boats with HiGHS: A Small Integer Programming Model"
date: 2026-08-22
author: "Adam DeJans Jr."
summary: "A four-variable integer programming solution to the September 2024 Rental Boats challenge, solved to proven optimality with HiGHS."
challengeUrl: "/challenges/2024-09-rental-boats/"
---

The September 2024 **Rental Boats** challenge is almost a textbook integer-programming model. Floataway Tours has a fixed capital budget, must buy enough boats and seats, wants to split purchases evenly across two manufacturers, and wants to maximize expected daily profit.

Because boats are indivisible, the natural decision variables are integer counts. I modeled the problem directly and solved it with **HiGHS** through SciPy's `milp` interface.

## Optimal purchase plan

HiGHS returned this solution:

| Boat | Manufacturer | Units | Cost per boat | Seats | Daily profit |
|---|---|---:|---:|---:|---:|
| Speedhawk | Sleekboat | 28 | $6,000 | 3 | $70 |
| Silverbird | Sleekboat | 0 | $7,000 | 5 | $80 |
| Catman | Racer | 0 | $5,000 | 2 | $50 |
| Classy | Racer | 28 | $9,000 | 6 | $110 |

The resulting totals are:

- **56 boats** purchased, exceeding the minimum of 50.
- **28 boats from Sleekboat and 28 from Racer**, satisfying the goodwill constraint exactly.
- **252 seats**, exceeding the minimum of 200.
- **$420,000 total cost**, using the full budget.
- **$5,040 expected daily profit**.

![Optimal Rental Boats purchase mix from HiGHS.](/articles/rental-boats-highs-solution.svg)

The solution is intuitive after the solver shows it. Within each manufacturer, the most profitable use of the limiting budget is Speedhawk for Sleekboat and Classy for Racer. The equality between manufacturer totals then couples the two sides of the decision.

## MILP formulation

Let

- `x_SH` = number of Speedhawks,
- `x_SB` = number of Silverbirds,
- `x_CM` = number of Catmans,
- `x_CL` = number of Classys.

All four variables are nonnegative integers.

Maximize expected daily profit:

```text
max 70 x_SH + 80 x_SB + 50 x_CM + 110 x_CL
```

subject to the capital budget:

```text
6000 x_SH + 7000 x_SB + 5000 x_CM + 9000 x_CL <= 420000
```

at least 50 boats:

```text
x_SH + x_SB + x_CM + x_CL >= 50
```

equal purchases from the two manufacturers:

```text
x_SH + x_SB = x_CM + x_CL
```

and at least 200 seats:

```text
3 x_SH + 5 x_SB + 2 x_CM + 6 x_CL >= 200
```

That is the entire model: **four integer variables and four business constraints**.

## Solving it with HiGHS

SciPy minimizes by convention, so I negate the profit coefficients.

```python
import numpy as np
from scipy.optimize import milp, LinearConstraint, Bounds

cost = np.array([6000, 7000, 5000, 9000], dtype=float)
seats = np.array([3, 5, 2, 6], dtype=float)
profit = np.array([70, 80, 50, 110], dtype=float)

A = np.vstack([
    cost,
    np.ones(4),
    np.array([1, 1, -1, -1], dtype=float),
    seats,
])

lower = np.array([-np.inf, 50, 0, 200], dtype=float)
upper = np.array([420000, np.inf, 0, np.inf], dtype=float)

result = milp(
    c=-profit,
    integrality=np.ones(4),
    bounds=Bounds(np.zeros(4), np.full(4, np.inf)),
    constraints=LinearConstraint(A, lower, upper),
)

print(result.x)
print(-result.fun)
```

The verified result is:

```text
[28, 0, 0, 28]
Optimal daily profit = 5040
MIP gap = 0.0
Branch-and-bound nodes = 1
```

HiGHS therefore did not merely find a good purchase plan; it **proved that no feasible integer purchase plan produces more than $5,040 of expected daily profit**.

## Why MILP is the right tool here

This challenge is a clean example of where a solver should be the default rather than a custom search procedure. Every business rule is linear, the only discreteness comes from whole boats, and the objective is linear. There is no need to enumerate purchase combinations or build a domain-specific heuristic.

The formulation also scales naturally. More boat models, manufacturer minimums, fleet-mix rules, financing limits, storage constraints, or multiple objectives can all be added without changing the basic modeling pattern.

---

Solution by [Adam DeJans Jr.](https://www.adamdejans.com) using HiGHS.