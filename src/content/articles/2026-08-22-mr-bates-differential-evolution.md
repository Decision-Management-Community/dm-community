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

The numerical result strongly suggests two structural facts:

```text
y = z
x = 2y
```

We can prove them directly.

At the minimum, the volume constraint must bind. If `xyz` were larger than 9,000, we could shrink a dimension and reduce the strap measure. So:

```text
xyz = 9000
```

Consider the Lagrangian:

```text
L = x + 2y + 2z + lambda(9000 - xyz)
```

The first-order conditions are:

```text
1  = lambda yz
2  = lambda xz
2  = lambda xy
```

Dividing the second and third equations gives:

```text
y = z
```

Comparing the first and second gives:

```text
x = 2y
```

Let `y = z = a`. Then:

```text
(2a)(a)(a) = 9000
2a^3 = 9000
a^3 = 4500
```

so:

```text
a = 4500^(1/3) ≈ 16.50963624
x = 2a          ≈ 33.01927249
```

and the minimum strap measure is:

```text
x + 2y + 2z
= 2a + 2a + 2a
= 6a
≈ 99.05781747 inches
```

That independently matches the differential-evolution result to numerical precision.

## A second check: maximize volume at the 100-inch boundary

We can reverse the question. If the strap limit is exactly 100 and the same optimal proportions hold, then:

```text
6a = 100

a = 16.66666667
x = 33.33333333
```

The maximum continuous volume at the strap boundary is then:

```text
2a^3 ≈ 9,259.259 cubic inches
```

Since 9,259.259 is comfortably above the required 9,000, feasibility is not marginal.

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
    # Required volume.
    NonlinearConstraint(lambda v: v[0] * v[1] * v[2], 9000, np.inf),

    # Keep x as the longest side and y >= z.
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

The search algorithm found the pattern. The pattern suggested a hypothesis. The analytical derivation then converted that hypothesis into a proof. Finally, a simple integer-dimension box converted the mathematical answer into an operational decision.

Those are different jobs:

- **search** finds promising decisions;
- **mathematics** can establish what is actually possible;
- **engineering judgment** chooses a solution that is usable in the real world.

Metaheuristics are powerful. They become much more powerful when we do not ask them to pretend to be proof engines.

---

Solution, executed search, and independent validation by [Adam DeJans Jr.](https://www.adamdejans.com).