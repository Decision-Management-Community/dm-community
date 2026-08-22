---
title: "Advanced Website Design: Build the Pareto Frontier Before You Pick the Weights"
date: 2026-08-22
author: "Adam DeJans Jr."
summary: "An exhaustive Pareto-frontier solution to the Advanced Website Design challenge showing that five nondominated cost-value tradeoffs are missed by a simple weighted-sum objective."
challengeUrl: "/challenges/2025-11-advanced-website-design/"
---

The November 2025 **Advanced Website Design** challenge is a nice reminder that multi-objective optimization is not finished when somebody says, "just put weights on the objectives."

The developer has ten candidate website features. Each feature has a cost and value, the client has a $10,000 budget, and several business rules create nonlinear-looking interactions:

- features 3 and 4 must be selected together;
- feature 2 cannot be combined with feature 3;
- selecting two or more of features 8, 9, and 10 adds a 10% surcharge to each selected premium feature;
- selecting at least five features gives a 5% discount on total cost.

The two objectives are to **maximize value** and **minimize cost**.

For ten binary decisions there are only `2^10 = 1,024` possible feature sets, so I enumerated the entire decision space rather than hiding the tradeoff behind an arbitrary weight.

![The exact Pareto frontier for the Advanced Website Design challenge.](/articles/advanced-web-design-pareto-frontier.svg)

The result is more interesting than a single "optimal" answer.

## Exact enumeration

Using the feature data published in the [cDMN walkthrough](https://cdmn.readthedocs.io/en/latest/Examples/advanced_web_design.html):

| Feature | Cost | Value |
|---:|---:|---:|
| 1 | $5,000 | 7 |
| 2 | $4,000 | 6 |
| 3 | $3,000 | 5 |
| 4 | $2,000 | 4 |
| 5 | $1,000 | 3 |
| 6 | $1,000 | 2 |
| 7 | $1,000 | 1 |
| 8 | $1,000 | 1 |
| 9 | $1,000 | 1 |
| 10 | $1,000 | 1 |

I evaluated all 1,024 subsets, applied the dependency, incompatibility, surcharge, discount, and budget rules, and retained **262 feasible designs**.

From those 262 designs there are **12 unique nondominated cost-value outcomes**:

| Discounted cost | Value | Representative feature set | Weighted-sum supported? |
|---:|---:|---|---|
| $0 | 0 | — | Yes |
| $1,000 | 3 | 5 | Yes |
| $2,000 | 5 | 5, 6 | Yes |
| $3,000 | 6 | 5, 6, 7 | **No** |
| $4,000 | 7 | 5, 6, 7, 8 | **No** |
| $4,940 | 8 | 5, 6, 7, 8, 9 | **No** |
| $5,000 | 9 | 2, 5 | **No** |
| $6,000 | 12 | 3, 4, 5 | **No** |
| $7,000 | 14 | 3, 4, 5, 6 | Yes |
| $7,600 | 15 | 3, 4, 5, 6, 7 | Yes |
| $8,550 | 16 | 3, 4, 5, 6, 7, 8 | Yes |
| $9,690 | 17 | 3, 4, 5, 6, 7, 8, 9 | Yes |

The reproducibility data are available here: [Pareto frontier CSV](/articles/advanced-web-design-pareto-frontier.csv).

## The maximum-value answer

The highest possible value is:

```text
17
```

The cheapest designs reaching value 17 cost:

```text
$9,690
```

One such design is:

```text
{3, 4, 5, 6, 7, 8, 9}
```

The base cost is:

```text
3,000 + 2,000 + 1,000 + 1,000 + 1,000 + 1,100 + 1,100
= 10,200
```

because features 8 and 9 receive the 10% premium surcharge.

Seven features are selected, so the 5% volume discount applies:

```text
10,200 × 0.95 = 9,690
```

This exactly matches the best-value solution reported by the cDMN implementation. There are three equivalent minimum-cost value-17 designs: choose features 3–7 plus any two of 8, 9, and 10.

## Why a weighted sum is not the Pareto frontier

A common approach to two objectives is:

```text
maximize value - lambda * cost
```

and then vary `lambda`.

That is useful, but in a discrete problem it does **not necessarily recover every Pareto-efficient solution**.

For each of the 12 frontier points, I checked whether there exists any nonnegative `lambda` for which that point maximizes `value - lambda × cost` over all 262 feasible designs.

Only **7 of the 12** frontier outcomes are supported by some weighted sum.

The five outcomes at:

```text
($3,000, 6)
($4,000, 7)
($4,940, 8)
($5,000, 9)
($6,000, 12)
```

are Pareto-efficient but **unsupported**. No choice of a single linear weight between value and cost makes any of them the winner.

That happens because the feasible objective set is discrete and non-convex. A weighted sum finds points on the supported convex envelope. It can jump directly over legitimate tradeoffs.

## Executed enumeration

```python
from itertools import combinations

cost = {
    1: 5000, 2: 4000, 3: 3000, 4: 2000, 5: 1000,
    6: 1000, 7: 1000, 8: 1000, 9: 1000, 10: 1000,
}

value = {
    1: 7, 2: 6, 3: 5, 4: 4, 5: 3,
    6: 2, 7: 1, 8: 1, 9: 1, 10: 1,
}


def evaluate(selected):
    selected = set(selected)

    # 3 and 4 are all-or-nothing.
    if (3 in selected) != (4 in selected):
        return None

    # 2 cannot coexist with 3 (and therefore 4).
    if 2 in selected and 3 in selected:
        return None

    premium_count = len(selected & {8, 9, 10})

    base_cost = 0.0
    for f in selected:
        multiplier = 1.1 if f in {8, 9, 10} and premium_count >= 2 else 1.0
        base_cost += cost[f] * multiplier

    discounted_cost = base_cost * 0.95 if len(selected) >= 5 else base_cost
    total_value = sum(value[f] for f in selected)

    if discounted_cost > 10000:
        return None

    return discounted_cost, total_value, tuple(sorted(selected))


feasible = []
for mask in range(1 << 10):
    selected = [f for f in range(1, 11) if mask & (1 << (f - 1))]
    result = evaluate(selected)
    if result is not None:
        feasible.append(result)

print(len(feasible))  # 262

pareto = []
for candidate in feasible:
    c, v, _ = candidate
    dominated = any(
        c2 <= c and v2 >= v and (c2 < c or v2 > v)
        for c2, v2, _ in feasible
    )
    if not dominated:
        pareto.append(candidate)

frontier = sorted(set((c, v) for c, v, _ in pareto))
print(len(frontier))  # 12
print(frontier)
```

## Checking whether a frontier point is supported

For a frontier point `(c_i, v_i)` to be optimal for some weighted sum, there must be a `lambda >= 0` satisfying:

```text
v_i - lambda c_i >= v_j - lambda c_j
```

for **every feasible outcome** `j`.

Each comparison gives either an upper or lower bound on `lambda`. Intersecting all those bounds tells us whether such a weight exists.

I performed that check against all feasible outcomes. Five Pareto points have an empty multiplier interval: they are genuinely nondominated, but no linear scalarization can select them.

## The decision lesson

There is nothing wrong with weighted objectives. The problem is treating a weight as if it were a neutral modeling choice.

A weight encodes a preference. In a discrete decision problem it can also quietly remove options from consideration.

When the objective tradeoff is economically meaningful, I would rather expose the Pareto frontier first and let the decision-maker see the choices:

```text
What does another $1,000 actually buy us?
Where does marginal value flatten?
Which tradeoffs disappear if we scalarize too early?
```

The optimization model should help reveal the decision, not bury it inside a coefficient.

---

Solution and exhaustive validation by [Adam DeJans Jr.](https://www.adamdejans.com).