---
title: "Holiday Gift Assignment: Turn the Budget Into a Price"
date: 2026-08-22
author: "Adam DeJans Jr."
summary: "A Lagrangian-relaxation solution to the Holiday Gift Assignment challenge that decomposes the budgeted assignment by person, produces a tight upper bound, and certifies the optimal happiness of 24."
challengeUrl: "/challenges/2023-01-holiday-gift-assignment/"
---

The January 2023 **Holiday Gift Assignment** challenge is a small multiple-choice knapsack problem. Five people each receive exactly one gift. Gifts have different costs, every person values them differently, and the total spend cannot exceed 50.

A solver can handle this immediately, but the structure is more interesting than the size. The only thing coupling the five people is the **shared budget**. If we can put an economic price on that budget, the problem decomposes into five independent decisions.

That is exactly what **Lagrangian relaxation** does.

![Lagrangian relaxation turns the shared budget into a shadow price and decomposes the gift decisions.](/articles/holiday-gift-lagrangian.svg)

The final answer is:

| Person | Gift | Happiness | Cost |
|---|---|---:|---:|
| Alice | Flowers | 4 | 7 |
| Bob | Wine | 5 | 15 |
| Carol | Book | 5 | 10 |
| Dave | Chocolate | 5 | 5 |
| Eve | Flowers | 5 | 7 |
| **Total** |  | **24** | **44** |

The interesting part is that we can certify **24 is globally optimal** without relying only on enumeration.

## Formulation

For each person `p` and gift `g`, define:

```text
x[p,g] = 1 if person p receives gift g
```

The objective is to maximize total happiness:

```text
max sum_p sum_g happiness[p,g] x[p,g]
```

Every person receives exactly one gift:

```text
sum_g x[p,g] = 1       for every person p
```

and the budget is:

```text
sum_p sum_g cost[g] x[p,g] <= 50
```

with binary `x[p,g]`.

This is a perfectly ordinary integer program. But relaxing the budget reveals the useful structure.

## Price the shared constraint

Introduce a nonnegative multiplier `lambda` on the budget constraint. For a maximization problem, the relaxed objective is:

```text
happiness + lambda * (50 - cost)
```

or:

```text
50 lambda
+ sum_p sum_g (happiness[p,g] - lambda * cost[g]) x[p,g]
```

Once the budget constraint is removed, each person can choose independently:

```text
best gift for p = argmax_g {
    happiness[p,g] - lambda * cost[g]
}
```

The shared resource has been converted into a **price**.

That is the useful idea: a coupling constraint can sometimes be moved into the objective so that a hard global problem becomes a set of small local decisions.

## A particularly useful multiplier

Take:

```text
lambda = 1 / 13
```

At this price, the independent subproblems choose:

| Person | Best relaxed choice |
|---|---|
| Alice | Toy **or** Flowers (tie) |
| Bob | Wine |
| Carol | Book |
| Dave | Chocolate |
| Eve | Flowers |

Alice is exactly indifferent between:

```text
Toy:     5 - 20/13 = 45/13
Flowers: 4 -  7/13 = 45/13
```

Choosing Toy gives happiness 25 but costs 57, so it violates the original budget.

Choosing Flowers instead gives:

```text
happiness = 24
cost      = 44
```

which is feasible.

## The relaxation gives a proof-quality bound

The Lagrangian value at `lambda = 1/13` is:

```text
318 / 13 = 24.461538...
```

For any feasible solution, the Lagrangian value is at least its original happiness, so this is a valid **upper bound** on the original maximization problem:

```text
optimal happiness <= 24.461538...
```

But total happiness is integer-valued. Therefore:

```text
optimal happiness <= 24
```

We already have a feasible solution with happiness 24.

So:

```text
optimal happiness = 24
```

The relaxation did not merely suggest a good answer. The bound plus integrality **certified the optimum**.

## Independent validation

I also enumerated every possible assignment. Because gifts may be reused, there are only:

```text
5^5 = 3,125
```

possible gift combinations.

Of those, **993** satisfy the budget. The exhaustive check found exactly **one** feasible assignment with happiness 24: the same assignment above.

So the result was validated two ways:

1. Lagrangian upper bound + feasible incumbent proves optimality.
2. Exhaustive enumeration independently confirms the unique optimum.

The published cDMN solution for the challenge reports the same assignment and totals.

## Executed validation code

```python
from fractions import Fraction
from itertools import product

people = ["Alice", "Bob", "Carol", "Dave", "Eve"]
gifts = ["Book", "Toy", "Chocolate", "Wine", "Flowers"]

cost = {
    "Book": 10,
    "Toy": 20,
    "Chocolate": 5,
    "Wine": 15,
    "Flowers": 7,
}

happiness = {
    "Alice": {"Book": 3, "Toy": 5, "Chocolate": 1, "Wine": 2, "Flowers": 4},
    "Bob":   {"Book": 2, "Toy": 2, "Chocolate": 3, "Wine": 5, "Flowers": 3},
    "Carol": {"Book": 5, "Toy": 4, "Chocolate": 4, "Wine": 3, "Flowers": 1},
    "Dave":  {"Book": 1, "Toy": 3, "Chocolate": 5, "Wine": 4, "Flowers": 2},
    "Eve":   {"Book": 4, "Toy": 1, "Chocolate": 2, "Wine": 1, "Flowers": 5},
}

# Lagrangian bound at lambda = 1/13.
lam = Fraction(1, 13)
bound = Fraction(50, 1) * lam

for p in people:
    best = max(
        Fraction(happiness[p][g], 1) - lam * cost[g]
        for g in gifts
    )
    bound += best

print(bound)        # 318/13
print(float(bound)) # 24.461538...

# Independent exhaustive verification.
best = None
feasible_count = 0
best_count = 0

for choices in product(gifts, repeat=len(people)):
    total_cost = sum(cost[g] for g in choices)
    if total_cost > 50:
        continue

    feasible_count += 1
    total_happiness = sum(
        happiness[p][g]
        for p, g in zip(people, choices)
    )

    candidate = (total_happiness, total_cost, choices)
    if best is None or total_happiness > best[0]:
        best = candidate
        best_count = 1
    elif total_happiness == best[0]:
        best_count += 1

print(feasible_count) # 993
print(best)
# (24, 44, ('Flowers', 'Wine', 'Book', 'Chocolate', 'Flowers'))
print(best_count)      # 1
```

## Why this pattern matters

This tiny challenge illustrates something that scales far beyond gifts.

Many real optimization problems become difficult because otherwise-separable decisions compete for one shared resource: budget, labor, capacity, inventory, emissions, cash, or machine time.

A Lagrangian multiplier assigns an economic value to that scarce resource. The resulting subproblems can often be solved independently, in parallel, or with specialized local logic. The relaxation also produces a bound that tells us how much room remains between a candidate and the best theoretically possible answer.

That is a much more useful way to think about decomposition than simply asking whether a problem is "too big for a solver."

The real question is: **what creates the coupling, and can we price it?**

---

Solution, executed validation, and independent optimality check by [Adam DeJans Jr.](https://www.adamdejans.com).