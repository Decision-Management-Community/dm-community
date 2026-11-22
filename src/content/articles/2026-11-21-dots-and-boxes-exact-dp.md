---
title: "Dots and Boxes: An Exact Decision Policy with Dynamic Programming"
date: 2026-11-21
author: "Adam DeJans Jr."
summary: "An executable exact minimax solution to the open Dots and Boxes challenge: a dependency-free playable 2-by-2 agent, a Bellman formulation that respects bonus turns, exhaustive state validation, and reproducible opponents."
challengeUrl: "/challenges/2022-10-dots-and-boxes/"
---

The [October 2022 Dots and Boxes challenge](/challenges/2022-10-dots-and-boxes/) asks for a decision model that can actually play the game. A deterministic, perfect-information game is a useful place to examine a fundamental distinction in decision science: a move that looks attractive locally can be inferior to a move that preserves better options later. Rather than hard-code a sequence of tactical rules, I constructed an exact decision policy for the board with **two rows and two columns of boxes** (a 3-by-3 grid of dots). The model searches over all future choices and accounts explicitly for the fact that a player who finishes a box keeps the turn.

The scope is deliberate. This is a completely solved, playable small-board version of the published challenge, not a claim to have solved arbitrarily large Dots and Boxes boards. The implementation uses only the Python standard library and provides a command-line interface, verification suite, and reproducible agent benchmarks. [Download the executable Python implementation](/challenge-solutions/dots-and-boxes-exact.py) and run it locally.

## The decision state and what must be optimized

There are 12 distinct edges around four boxes. Assign each edge an index and represent the drawn edges with a 12-bit integer. A bit of one means that the edge is already present. Each box is represented by the four edge bits surrounding it. We can therefore count how many boxes an action closes by comparing the number of fully enclosed boxes before and after drawing that edge. The current state has just 4,096 possible edge masks, and every drawn-edge subset is a valid reachable configuration under some sequence of play.

The optimization objective is the **final difference in boxes won by the player to move**, from the current position forward. We do not need to carry the entire move history or the running score in the dynamic-programming state. Scores already earned are fixed and cannot be changed by future moves; for comparing the remaining choices, the set of drawn edges is sufficient. In an ordinary turn-taking zero-sum game, a negamax recurrence changes the sign of the successor value after every move. Doing that here would be wrong whenever an edge completes one or two boxes: the scoring player gets another move.

Write `V(s)` for the maximum future score difference from the point of view of the player whose turn it is in edge-mask state `s`. For each legal undrawn edge `e`, let `k(s,e)` be the number of boxes completed by drawing it, and let `s'` be the new mask. The value of an action is:

```text
if k(s,e) > 0:  k(s,e) + V(s')     # same player moves again
if k(s,e) = 0: -V(s')              # turn passes to opponent

V(s) = max over legal e of the corresponding action value
V(all edges drawn) = 0
```

The recurrence is exact because drawing an edge is the only decision, captures are deterministic, and the board has finite depth. Computing these values once with memoization makes an optimal move available from every edge configuration. The same structure also illustrates a general modeling principle: the state must preserve enough information to determine **who controls the next decision**. Ignoring the bonus turn changes the game being optimized.

## Executed results and independent checks

Using the conventional rule that finishing a box awards an immediate extra move, the exact optimal-policy result on the 2-by-2-box board is **3 boxes for the first player and 1 for the second**, a first-player margin of **+2**. This conclusion assumes both players use the optimal policy; it is not an expected win rate or a result obtained by sampling. The implementation also solves the 1-by-1 and 1-by-2 cases as regression tests, returning respective first-player margins of -1 and 0.

I checked the 2-by-2 result in two directions: the production policy uses top-down memoized minimax, and a separate bottom-up dynamic program evaluates all 4,096 masks in reverse order. The two computations agree at **every state**. Additional assertions check that every proposed move is legal, each capture equals the change in the number of enclosed boxes, optimal-policy moves achieve the corresponding Bellman value, all 12 edges are eventually played once, and the final number of claimed boxes is exactly four. These checks are run with `--verify` and fail rather than merely printing a success message if any invariant is violated.

To make the difference between a policy and a tactical heuristic concrete, I also built a greedy opponent that first takes any available box and otherwise minimizes the number of three-sided boxes left exposed. Among the 4,095 nonterminal configurations, **556 states** have a strictly inferior greedy action compared with the exact policy. For example, from edge mask `4`, the optimal future value is `0`, while the deterministic greedy choice gives `-2`, a two-box loss in continuation value. It is therefore possible to validate a precise claim of local decision regret rather than assert vaguely that lookahead matters.

The included deterministic benchmark evaluates the exact policy against that greedy opponent and a randomly choosing opponent. With the supplied seed and 1,000 repetitions for each player position, the policy played first against the random opponent records **1,000 wins**, averaging **3.923 of four boxes**. When playing second against the random opponent, it records **678 wins, 284 ties, and 38 losses**, averaging **2.872 boxes**. Against the deterministic greedy policy it wins **3-1** when moving first and ties **2-2** when moving second. The greedy games replay the same deterministic matchup and should not be interpreted as 1,000 independent observations. These benchmarks describe this specific board and opponent definitions, not a performance guarantee on larger boards.

## Run the decision model

Download [dots-and-boxes-exact.py](/challenge-solutions/dots-and-boxes-exact.py) and execute one of the following commands with Python 3.10 or newer. No solver license, optimization library, training data, or network access is required.

```bash
python dots-and-boxes-exact.py --verify
python dots-and-boxes-exact.py --benchmark
python dots-and-boxes-exact.py --play
```

The `--play` option draws an ASCII board, shows each edge's number and endpoints, prompts the human for a legal edge, and chooses an optimal response. The two players alternate except when the last move completed a box. The implementation does not assume that the user plays optimally; the computer recomputes the exact continuation value after every human move, so it remains optimal against arbitrary legal play.

## What this tells us about building decision systems

The useful object here is the mapping from states to actions, not a single recommended opening move. A conventional static optimization can answer which move is best *now* if it has a correct evaluation of what follows. A decision policy supplies that evaluation for every reachable state, including states that only occur after an opponent makes an unexpected decision. That distinction becomes especially consequential in production systems where decisions repeat, resources evolve, and previous actions change the feasible choices at later dates.

Exact state enumeration is practical for this 12-edge board because there are only 4,096 configurations and at most 12 actions per configuration. It does not scale innocently: three rows and three columns of boxes have 24 edges and more than 16 million edge masks before tracking any larger strategic structure. For that setting, one could investigate symmetry reductions, limited lookahead with exact endgames, learned value approximations, or search heuristics, but none of those extensions are necessary to certify the results submitted here. Keeping the model's scope and verification boundary explicit is part of making a useful, trustworthy contribution.