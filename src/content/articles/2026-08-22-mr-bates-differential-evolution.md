---
title: "Mr Bates vs The Post Office: Use the Metaheuristic to Search, Then Prove the Answer"
date: 2026-08-22
author: "Adam DeJans Jr."
summary: "Differential evolution finds a box with 9,000 cubic inches of volume and only 99.058 inches of strap measure; an independent analytical derivation then proves the continuous optimum."
challengeUrl: "/challenges/2025-02-mr-bates-vs-the-post-office/"
---

The February 2025 **Mr Bates vs The Post Office** challenge asks a simple feasibility question with a nonlinear constraint.

A comforter needs **9,000 cubic inches** of box volume. The flat-rate shipping rule requires the box's strap measure to be no more than **100 inches**, where strap measure is:

```text
longest side + 2 × (the other two sides)
```

A feasible answer is easy to state once you see it: a **30 × 20 × 15 inch** box has exactly 9,000 cubic inches of volume and exactly 100 inches of strap measure.

But I wanted to use the challenge to make a broader optimization point. I first treated the dimensions as continuous variables and used **differential evolution** to minimize strap measure subject to the required volume. Then I validated the metaheuristic's result analytically.

![Box dimensions discovered by differential evolution and validated analytically.](/articles/mr-bates-differential-evolution.svg)

The result is a useful distinction: **a metaheuristic is excellent for discovering a candidate and exposing structure, but the metaheuristic itself is not an optimality proof.**

## The search problem

Let the box dimensions be ordered:

```text
x >= y >= z > 0
```

so `x` is the longest side. I solved:

```text
minimize    x + 2y + 2z

subject to  xyz >= 9000
            x >= y >= z > 0
```

Using SciPy's constrained `differential_evolution`, with seed `42`, the executed run returned approximately:

```text
x = 33.01926816
y = 16.50964668
z = 16.50962797

volume = 9000.00000001 in³
strap  = 99.05781747 in
```

The search therefore finds a box that fits the comforter with roughly **0.9422 inches of spare strap allowance**.

## The analytical validation

The numerical result strongly suggests:

```text
y = z
x = 2y
```

There is a clean global proof using AM-GM. For any positive dimensions,

```text
x + 2y + 2z
    >= 3 * (x * 2y * 2z)^(1/3)
    =  3 * (4xyz)^(1/3)
```

and every feasible box has `xyz >= 9000`, so:

```text
strap >= 3 * (4 * 9000)^(1/3)
      =  3 * 36000^(1/3)
      ≈ 99.05781747 inches
```

Equality in AM-GM occurs exactly when:

```text
x = 2y = 2z
```

and equality in the volume inequality requires:

```text
xyz = 9000
```

Let `y = z = a` and `x = 2a`. Then:

```text
2a^3 = 9000

a = 4500^(1/3) ≈ 16.50963624
x = 2a          ≈ 33.01927249
```

That gives:

```text
minimum strap = 6a ≈ 99.05781747 inches
```

So the differential-evolution result is not just close to a plausible stationary point. The independent inequality establishes a **global lower bound**, and the candidate attains it. The continuous optimum is proved.

## A second check: maximize volume at the 100-inch boundary

We can reverse the question. At the most volume-efficient proportions, `x = 2a` and `y = z = a`. If the strap limit binds at 100:

```text
6a = 100

a = 16.66666667
x = 33.33333333
```

The corresponding volume is:

```text
2a^3 ≈ 9,259.259 cubic inches
```

Since 9,259.259 is above the required 9,000, feasibility is not marginal.

## The practical answer is simpler

The continuous optimizer is mathematically interesting, but nobody needs to manufacture a box to eight decimal places.

A clean integer-dimension solution is:

```text
30 × 20 × 15 = 9000 cubic inches
```

with:

```text
30 + 2(20 + 15) = 100 inches
```

So the direct answer to the challenge is **yes**: Mr. Bates can use the flat-rate service.

## Executed code

```python
import numpy as np
from scipy.optimize import differential_evolution, NonlinearConstraint


def strap(v):
    x, y, z = v
    return x + 2 * (y + z)


constraints = [
    NonlinearConstraint(lambda v: v[0] * v[1] * v[2], 9000, np.inf),
    NonlinearConstraint(lambda v: v[0] - v[1], 0, np.inf),
    NonlinearConstraint(lambda v: v[1] - v[2], 0, np.inf),
]

result = differential_evolution(
    strap,
    bounds=[(1, 100), (1, 100), (1, 100)],
    constraints=constraints,
    seed=42,
    popsize=20,
    tol=1e-10,
    maxiter=2000,
    polish=True,
)

print(result.x)
print(result.fun)
print(np.prod(result.x))
```

The run completed successfully and returned the values above.

## Why I like this workflow

It would be easy to stop when differential evolution prints `99.05781747` and declare victory. I think that misses the best part of the exercise.

The search algorithm found the pattern. The pattern suggested a hypothesis. The independent bound converted that hypothesis into a proof. Finally, a simple integer-dimension box converted the mathematical answer into an operational decision.

Those are different jobs:

- **search** finds promising decisions;
- **mathematics** establishes what is actually possible;
- **engineering judgment** chooses a solution that is usable in the real world.

Metaheuristics are powerful. They become much more powerful when we do not ask them to pretend to be proof engines.

---

Solution, executed search, and independent validation by [Adam DeJans Jr.](https://www.adamdejans.com).