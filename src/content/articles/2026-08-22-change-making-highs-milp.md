---
title: "Solving Change-Making with HiGHS: A Minimal Integer Program"
date: 2026-08-22
author: "Adam DeJans Jr."
summary: "A compact integer linear programming formulation for the generic change-making problem, with the 123-cent example solved to a six-coin optimum by HiGHS."
challengeUrl: "/challenges/2015-02-change-making/"
---

The February 2015 **Change-Making Decision** challenge asks for a generic model that makes a target amount using the fewest coins. The example is 123 cents with denominations of 1, 10, 25, and 100 cents.

This is one of the smallest useful integer-programming models you can write. It also illustrates why a generic optimization formulation is safer than relying on a greedy rule: greedy happens to work for many familiar currency systems, but it is not guaranteed to work for arbitrary denominations.

I solved the example with **HiGHS** through SciPy's `milp` interface.

## Optimal change for 123 cents

HiGHS returns:

| Denomination | Number of coins | Value contributed |
|---:|---:|---:|
| 100¢ | 1 | 100¢ |
| 25¢ | 0 | 0¢ |
| 10¢ | 2 | 20¢ |
| 1¢ | 3 | 3¢ |
| **Total** | **6 coins** | **123¢** |

![Optimal 123-cent change-making solution from HiGHS.](/articles/change-making-highs-solution.svg)

So the minimum-coin solution is:

```text
100 + 10 + 10 + 1 + 1 + 1 = 123
```

with **six coins**.

## Integer programming formulation

For each denomination `d_i`, define a nonnegative integer variable `x_i` equal to the number of coins of that denomination.

Minimize the total number of coins:

```text
min sum_i x_i
```

subject to exact value conservation:

```text
sum_i d_i x_i = target
```

and:

```text
x_i integer, x_i >= 0
```

For the 123-cent example:

```text
min x_1 + x_10 + x_25 + x_100

s.t.
    1 x_1 + 10 x_10 + 25 x_25 + 100 x_100 = 123

    x_1, x_10, x_25, x_100 >= 0 and integer
```

That is the full model.

## Solving it with HiGHS

```python
import numpy as np
from scipy.optimize import milp, LinearConstraint, Bounds

denominations = np.array([1, 10, 25, 100], dtype=float)
target = 123

result = milp(
    c=np.ones(len(denominations)),
    integrality=np.ones(len(denominations)),
    bounds=Bounds(
        np.zeros(len(denominations)),
        np.full(len(denominations), np.inf),
    ),
    constraints=LinearConstraint(
        denominations.reshape(1, -1),
        np.array([target], dtype=float),
        np.array([target], dtype=float),
    ),
)

print(result.x)
print(result.fun)
```

The verified solver output is:

```text
Coin counts [1¢, 10¢, 25¢, 100¢] = [3, 2, 0, 1]
Minimum number of coins = 6
MIP gap = 0.0
Branch-and-bound nodes = 1
```

HiGHS therefore proves that no combination of five or fewer coins from these denominations can total exactly 123 cents.

## Why not just use a greedy rule?

For the U.S.-style denominations in the example, repeatedly taking the largest coin that fits happens to produce the optimum. But the challenge correctly asks for a generic solution.

Consider denominations `1, 3, 4` and a target of `6`:

```text
Greedy: 4 + 1 + 1 = 3 coins
Optimal: 3 + 3     = 2 coins
```

The integer model does not care whether the coin system is "friendly" to greedy logic. The denomination vector is simply data, and the solver proves the optimum for whatever system it is given.

## Extending the model

The same formulation can handle limited coin inventories by adding upper bounds:

```text
x_i <= available_i
```

It can also support weighted handling costs, preferences for certain denominations, multiple simultaneous transactions, or penalties for depleting scarce coins. At that point the tiny textbook model becomes a practical cash-management problem, but the modeling structure is unchanged.

---

Solution by [Adam DeJans Jr.](https://www.adamdejans.com) using HiGHS.