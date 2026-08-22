---
title: "Balanced Assignment with Simulated Annealing: When a Heuristic Reaches the Proven Optimum"
date: 2026-08-22
author: "Adam DeJans Jr."
summary: "A pair-swap simulated annealing solution to the 210-person Balanced Assignment challenge that reaches a mathematically derived lower bound of 3,370, turning a heuristic result into a proven global optimum."
challengeUrl: "/challenges/2018-09-balanced-assignment/"
---

The September 2018 **Balanced Assignment** challenge is exactly the kind of problem where I like heuristics. There are 210 people, four categorical attributes, and 12 groups. Every person must be assigned once, each group must contain between 16 and 19 people, and the goal is to spread people with similar characteristics across the groups rather than clustering them together.

An exact optimizer can solve this problem. But the interesting question is different: **how much machinery do we actually need once we understand the structure of the objective?**

I used a simple pair-swap **simulated annealing** search. On the public 210-person instance, the search reached a pairwise-sameness score of **3,370**. I then independently derived a lower bound of **3,370** from the marginal category counts alone. Because the heuristic found a feasible solution equal to a valid global lower bound, the returned assignment is not merely good. It is **globally optimal for this objective**.

![Simulated annealing convergence to the proven lower bound for Balanced Assignment.](/articles/balanced-assignment-sa-convergence.svg)

The input and the exact assignment used for the validation are available here:

- [210-person input data](/articles/balanced-assignment-data.csv)
- [validated simulated-annealing assignment](/articles/balanced-assignment-sa-solution.csv)

## The objective

I used the pairwise-sameness interpretation that has historically been used for this challenge. For every pair of people assigned to the same group, add one penalty point for each characteristic they share.

If two people in the same group share department, location, and title, but not the fourth category, that pair contributes three penalty points. The total objective is the sum over all within-group pairs.

For one category value with `m` people distributed among `G = 12` groups, the contribution from a group containing `n_g` of those people is:

```text
C(n_g, 2) = n_g (n_g - 1) / 2
```

Therefore the best possible distribution for that one category value is as even as possible across the 12 groups. If

```text
m = qG + r
```

then `r` groups must contain `q + 1` people with that value and the other `G-r` groups contain `q`. The resulting unavoidable penalty is:

```text
r * C(q + 1, 2) + (G - r) * C(q, 2)
```

Apply that calculation independently to every value of every characteristic and sum the results. For this data set, the lower-bound contributions are:

| Characteristic | Minimum unavoidable pair penalty |
|---|---:|
| Department | 792 |
| Location | 668 |
| Third binary category | 1,310 |
| Title | 600 |
| **Total lower bound** | **3,370** |

No assignment can score below 3,370, regardless of the search algorithm or group-size pattern.

## The search

I fixed a valid group-size pattern of six groups of 18 and six groups of 17. That totals 210 and stays inside the permitted 16–19 range.

The neighborhood is intentionally simple: choose two people from different groups and swap them. Every move automatically preserves all group-size constraints, so the search spends its time improving diversity rather than repairing feasibility.

For a proposed swap, only the category counts in the two affected groups can change. The objective delta can therefore be calculated locally rather than recomputing all pair penalties from scratch.

Improving moves are always accepted. Worsening moves are accepted with the usual simulated-annealing probability:

```text
P(accept) = exp(-delta / temperature)
```

That allows the search to cross small local barriers early and become increasingly selective as the temperature cools.

## Executed result

Using seed `0`, the run started at a randomly balanced assignment with objective **3,554** and reached **3,370 after 95,308 swap proposals**. On the environment where I ran the experiment, that took about **0.32 seconds**.

I repeated the experiment for seeds 0 through 9. All ten runs reached 3,370. The observed runs took roughly 0.29–0.37 seconds and between about 91,000 and 114,000 swap proposals. Runtime will vary by machine, but the more important point is that the same tiny neighborhood repeatedly reached the theoretical floor.

## Independent validation

I did not use the incremental objective calculation as the final validator. After the heuristic returned its assignment, I recomputed the objective from scratch by iterating through every pair of people within every group and counting matching attributes.

The checks were:

```text
People assigned:                     210 / 210
Group sizes:                         18,18,18,18,18,18,17,17,17,17,17,17
All group sizes within 16..19:       yes
Direct pairwise objective:           3370
Independent lower bound:             3370
Gap to lower bound:                  0
```

That last line is what changes the interpretation. Simulated annealing itself does **not** provide an optimality proof. The lower bound does. The heuristic finds a feasible solution; the independent bound certifies that nothing better exists.

This is a pattern I find useful in practice: a heuristic and a proof mechanism do not have to be the same algorithm.

## Core implementation

The full data is in the CSV linked above. The core search is small:

```python
import csv
import math
import random
from collections import Counter

G = 12
GROUP_SIZES = [18] * 6 + [17] * 6

with open("balanced-assignment-data.csv", newline="") as f:
    rows = list(csv.DictReader(f))

attrs = [
    (r["department"], r["location"], r["rate"], r["title"])
    for r in rows
]


def random_assignment(seed):
    rng = random.Random(seed)
    people = list(range(len(attrs)))
    rng.shuffle(people)
    assignment = [-1] * len(attrs)
    p = 0
    for g, size in enumerate(GROUP_SIZES):
        for i in people[p:p + size]:
            assignment[i] = g
        p += size
    return assignment


def build_counts(assignment):
    counts = [[Counter() for _ in range(4)] for _ in range(G)]
    members = [[] for _ in range(G)]
    for i, g in enumerate(assignment):
        members[g].append(i)
        for k, value in enumerate(attrs[i]):
            counts[g][k][value] += 1
    return counts, members


def choose2(n):
    return n * (n - 1) // 2


def objective(counts):
    return sum(
        choose2(n)
        for group in counts
        for category in group
        for n in category.values()
    )


def swap_delta(i, j, assignment, counts):
    gi, gj = assignment[i], assignment[j]
    delta = 0
    for k in range(4):
        ai, aj = attrs[i][k], attrs[j][k]
        if ai == aj:
            continue

        # Removing i from gi and adding j.
        delta -= counts[gi][k][ai] - 1
        delta += counts[gi][k][aj]

        # Removing j from gj and adding i.
        delta -= counts[gj][k][aj] - 1
        delta += counts[gj][k][ai]
    return delta


def apply_swap(i, j, assignment, counts, members):
    gi, gj = assignment[i], assignment[j]
    for k in range(4):
        ai, aj = attrs[i][k], attrs[j][k]
        if ai != aj:
            counts[gi][k][ai] -= 1
            counts[gi][k][aj] += 1
            counts[gj][k][aj] -= 1
            counts[gj][k][ai] += 1

    members[gi].remove(i)
    members[gj].remove(j)
    members[gi].append(j)
    members[gj].append(i)
    assignment[i], assignment[j] = gj, gi


def anneal(seed=0, iterations=250_000, t0=5.0, alpha=0.99997):
    rng = random.Random(seed)
    assignment = random_assignment(seed)
    counts, members = build_counts(assignment)
    score = objective(counts)
    best_score, best = score, assignment.copy()
    temperature = t0

    for _ in range(iterations):
        if best_score == 3370:       # independently derived lower bound
            break

        ga, gb = rng.sample(range(G), 2)
        i = rng.choice(members[ga])
        j = rng.choice(members[gb])
        delta = swap_delta(i, j, assignment, counts)

        if delta <= 0 or rng.random() < math.exp(-delta / max(temperature, 1e-9)):
            apply_swap(i, j, assignment, counts, members)
            score += delta
            if score < best_score:
                best_score, best = score, assignment.copy()

        temperature = max(0.02, temperature * alpha)

    return best_score, best
```

## Why this fits the problem

This is not an argument that metaheuristics should replace exact optimization. The exact model is valuable precisely because it helps us understand the structure and benchmark the result.

The lesson is that **once structure is exposed, the recurring search may be much simpler than the model that originally revealed it**. A swap neighborhood preserves feasibility. The objective delta is local. The category marginals give us a clean lower bound. Together, those facts turn an enormous assignment space into a very manageable search process.

A solver, a heuristic, and a mathematical bound are not competing religions. They are tools that can work together.

---

Solution and validation by [Adam DeJans Jr.](https://www.adamdejans.com).