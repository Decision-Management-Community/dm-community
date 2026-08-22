---
title: "Grid of Bulbs: Why the Next Best Action Can Be the Wrong Search Strategy"
date: 2026-08-22
author: "Adam DeJans Jr."
summary: "A validated 280-move constraint-guided depth-first search for the 24×24 Grid of Bulbs instance, contrasted with a greedy next-best-action policy that fails to finish."
challengeUrl: "/challenges/2023-05-grid-of-bulbs/"
---

The May 2023 **Grid of Bulbs** challenge is framed around a deceptively simple idea: if you can score the immediate result of every available action, why not always take the next best one?

On a 24×24 grid, each move selects a bulb that is currently off. That bulb turns on, while every other bulb in the same row and column toggles. The goal is to reach the all-on state.

I used the difficult 24×24 instance from the original challenge archive and compared two approaches:

1. a myopic greedy policy that repeatedly chooses the legal move leaving the fewest bulbs off immediately afterward;
2. a constraint-guided depth-first search that is willing to make locally unattractive moves when they are part of a promising sequence.

The greedy policy failed to finish. The guided search found a valid **280-move sequence** after exploring only **1,805 unique states**.

![Initial and final Grid of Bulbs states with search validation statistics.](/articles/grid-of-bulbs-guided-search.svg)

For reproducibility:

- [24×24 starting grid](/articles/grid-of-bulbs-24x24.txt)
- [validated 280-move solution path](/articles/grid-of-bulbs-guided-dfs-path.csv)

## The greedy baseline

The most obvious heuristic is to score every legal move by the number of bulbs that would remain off and select the best immediate result.

I implemented that policy with cycle avoidance. After **1,000 legal moves**, it still had **206 bulbs off**. The best state it encountered during those 1,000 actions still had **199 bulbs off**.

That is a useful failure. The action with the best immediate score is not necessarily on a path to the desired state. A decision can look better one step ahead while making the future sequence harder.

This is the same reason a good forecast, local KPI, or one-period objective can produce a bad policy: the quality of an action depends on what it makes possible later.

## Constraint-guided depth-first search

The community already had a Python solution by **Julien Pradier**. His archived write-up points to a useful structural pruning idea: when considering an off bulb at `(row, column)`, branch only when the current number of on bulbs in that row equals the current number of on bulbs in that column.

I reimplemented that idea from scratch using a single 576-bit integer to represent the grid, then replayed and validated the resulting sequence independently.

The bitset representation matters because each move becomes a handful of integer XOR operations rather than hundreds of Python object updates.

For a selected off bulb `(r,c)`:

```text
next_state = state XOR row_mask[r] XOR column_mask[c] XOR selected_bit
```

The row and column masks toggle their cells. The selected cell appears in both masks, so it would otherwise be toggled twice; the final XOR changes that selected off bulb to on exactly once, matching the challenge rule.

The pruning condition does not claim that the retained move is locally optimal. It simply throws away a large amount of branching while preserving a route that works well on this instance.

## Executed result

The exact reimplementation produced:

```text
Grid size:                         24 × 24
Bulbs initially off:              316
Unique states explored:           1,805
Moves in returned path:           280
Observed runtime:                 ~0.16 seconds
Illegal selected-on moves:        0
Bulbs off after replay:           0
Final state equals all-on state:  yes
```

The first ten moves, using one-based row and column indices, were:

```text
(21,20), (24,19), (24,21), (20,23), (23,16),
(23,20), (23,3),  (23,13), (21,23), (21,18)
```

The final ten were:

```text
(2,14), (2,5), (6,5), (2,11), (1,20),
(13,12), (5,20), (3,12), (3,3), (1,12)
```

The CSV linked above contains all 280 moves.

## Independent validation

Search code can lie to you in subtle ways, especially when the state transition itself is compact and clever. So I validated the returned path with a separate replay pass.

For every move I checked that:

- the selected bulb was off before the action;
- the selected bulb became on;
- every other bulb in its row toggled;
- every other bulb in its column toggled.

After all 280 moves, the replayed 576-bit state was exactly:

```text
2^576 - 1
```

which is the all-on grid. No move violated the rule that the selected bulb must be off.

## Core search

Here is the compact implementation used for the search. `binary_string` is the 576-character input from the text file linked above.

```python
import math
import time


def guided_dfs(binary_string, max_nodes=5_000_000):
    n = math.isqrt(len(binary_string))
    N = n * n
    start = int(binary_string, 2)
    goal = (1 << N) - 1

    row_masks = [
        ((1 << n) - 1) << (n * (n - r - 1))
        for r in range(n)
    ]
    col_masks = [
        sum(1 << ((n - r - 1) * n + (n - c - 1)) for r in range(n))
        for c in range(n)
    ]

    visited = set()
    stack = [(start, [])]
    nodes = 0

    while stack:
        state, path = stack.pop()

        if state == goal:
            return path, nodes
        if state in visited:
            continue

        visited.add(state)
        nodes += 1
        if nodes >= max_nodes:
            return None, nodes

        for r in range(n):
            row_ones = (state & row_masks[r]).bit_count()

            for c in range(n):
                bit = 1 << ((n - r - 1) * n + (n - c - 1))

                # The challenge only allows selecting a bulb that is off.
                if state & bit:
                    continue

                col_ones = (state & col_masks[c]).bit_count()

                # Structural pruning condition.
                if row_ones != col_ones:
                    continue

                next_state = state ^ row_masks[r] ^ col_masks[c] ^ bit
                if next_state not in visited:
                    stack.append((next_state, path + [(r, c)]))

    return None, nodes
```

## Why this is a decision problem, not just a puzzle

What I like about this challenge is that it exposes the weakness of **next-best-action thinking** in a tiny, observable system.

A one-step score answers:

> Which action makes the state look best immediately?

But the real question is:

> Which action puts me on a sequence that reaches a valuable future state?

Those are different questions.

Sometimes the right answer is dynamic programming, model predictive control, tree search, reinforcement learning, a mathematical program, or a domain-specific heuristic. The implementation depends on the structure. The principle does not: **evaluate decisions in the context of the policy or sequence they create, not only by their immediate effect.**

That is the broader lesson I take from a grid of lightbulbs.

---

Reimplementation, comparison, and validation by [Adam DeJans Jr.](https://www.adamdejans.com). Structural pruning inspired by the existing community solution from Julien Pradier.