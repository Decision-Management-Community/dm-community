---
title: "When Simulation Turns a Search Problem Into a Hill Climb"
date: 2026-08-21
author: "Adam DeJans Jr."
summary: "A practical example of using simulation data to discover exploitable structure in a noisy tuning problem, replacing repeated global searches with a much faster local search while preserving most of the value."
---

A lot of optimization work begins with the assumption that the hard part is the algorithm.

Sometimes it is. But sometimes the algorithm becomes much simpler once you understand the shape of the problem well enough.

I ran into exactly that situation while tuning a decision policy through simulation. The policy had a parameter that could take a range of discrete values, and evaluating any one setting was expensive because the objective was not available analytically. The only way to know whether a setting was good was to run the policy through a stochastic simulator, collect outcomes across Monte Carlo samples, and estimate its economic performance.

At first, the obvious solution was a broad search. Evaluate many candidate settings, spend enough simulation budget on each one to reduce noise, and choose the best observed result.

That works. It is also expensive.

The more interesting question was whether the expensive search was teaching us something that could make the next search cheaper.

It was.

## The simulator was not just an evaluator

Simulation is often treated as the final judge in an optimization loop. An optimizer proposes a candidate, the simulator scores it, and the optimizer uses that score to decide where to look next.

That framing is useful, but incomplete.

A simulator also produces **data about the structure of the objective function**.

Once enough candidate settings had been evaluated, I stopped looking only at which setting won. I started looking at the response surface itself.

For groups of items with similar operating characteristics, the objective was not jumping around randomly. Performance generally improved as the parameter moved toward a favorable region, reached a peak, and then deteriorated as we moved past it.

I would not call the underlying problem mathematically convex. In fact, because we were maximizing an economic objective, the more relevant idealized shape would be concave or, more generally, unimodal. The simulator was noisy, the policy contained discrete logic, and different item characteristics could shift the location of the best setting.

But the empirical shape was **close enough to single-peaked that a local search could exploit it**.

That distinction matters. You do not need to prove global convexity to exploit useful local structure.

## The expensive search became an experiment

The first large tuning exercise took a long time. That was acceptable because it was no longer just producing a parameter value. It was producing evidence.

I used the global search as an experiment to answer a few questions:

1. How often did the objective exhibit a clear single peak?
2. How far apart were neighboring settings in economic value?
3. How much apparent movement was caused by Monte Carlo noise rather than a real difference in policy quality?
4. Did the shape depend systematically on observable item characteristics?
5. If a local search started from a reasonable point, how often did it reach the same neighborhood as the global search?

That last question was the one that changed the implementation.

Across the data I cared about, a simple hill-climbing procedure was reaching solutions that captured roughly 95% of the value of the much more expensive tuning search, while reducing the runtime from something measured in weeks at full scale to something measured in tens of minutes.

That is a trade I will take all day when the remaining gap is economically small and the faster method can be rerun frequently as conditions change.

## The naive hill climb was not enough

There was one important complication: simulation noise.

Suppose the current setting is `k`, and we evaluate its two neighbors, `k-1` and `k+1`.

A deterministic hill climb would simply move to whichever neighbor has the highest objective value, provided that value is better than the current point.

With Monte Carlo estimates, that can be a terrible rule.

If the true values of two settings are almost identical, random sampling variation can make one look better in one run and worse in another. A hill climber can bounce around, chase noise, or move away from a perfectly good region because a neighboring estimate happened to be lucky.

So the move rule needs an **epsilon**.

Instead of moving whenever a neighbor looks slightly better, move only when the estimated improvement is large enough to be operationally meaningful.

A simplified version is:

```text
current = k

repeat:
    score_left    = MonteCarlo(k - 1)
    score_current = MonteCarlo(k)
    score_right   = MonteCarlo(k + 1)

    best_neighbor = argmax(score_left, score_right)

    if score(best_neighbor) >= score_current + epsilon:
        current = best_neighbor
    else:
        stop
```

The exact epsilon can be defined in several ways. It can be an absolute economic threshold, a relative improvement threshold, or something informed by the observed variance of the Monte Carlo estimator.

The important point is conceptual: **a noisy optimizer should not treat every measured difference as a real difference**.

## Compare decisions, not just means

There is another subtlety.

If the simulator is stochastic, a single estimated mean can hide a lot. Two candidate settings may have nearly identical expected value while producing very different tail behavior, volatility, service outcomes, or operational instability.

So the comparison between neighboring policies does not have to be based on a single scalar sample mean.

Depending on the application, I might compare candidates on:

- expected economic value,
- a risk-adjusted objective,
- confidence intervals around the estimated difference,
- the probability that one candidate beats another across common scenarios,
- or a lexicographic rule that protects an operational constraint before comparing economics.

Using **common random numbers** can help too. If neighboring policies are evaluated against the same simulated scenarios, much of the scenario-to-scenario noise cancels when we compare their difference. That can make local comparisons significantly more informative without increasing the number of simulations.

This is one of those small implementation choices that can matter more than swapping in a more sophisticated optimizer.

## The data told us where heuristics were safe

The hill climb was not equally reliable everywhere.

That was another useful lesson.

The shape of the response surface depended on the characteristics of what was being tuned. Some groups had a clean, strong peak. Others were flat across a wide range. A few had enough irregularity that a local method deserved less trust.

That suggests a hybrid architecture rather than one universal search strategy.

For example:

```text
if problem characteristics imply a stable single-peaked region:
    use fast hill climb
elif the response surface looks flat:
    use a conservative default or smallest-change policy
else:
    fall back to broader search
```

The heuristic is therefore not "hill climbing is good."

The heuristic is: **use empirical evidence to identify the subset of problems where hill climbing is good.**

That is a much stronger engineering position.

## Global optimization can be a teacher, not the permanent production system

There is a tendency in optimization to assume that if we once needed an expensive global method, we should keep paying for it forever.

I do not think that follows.

A large global search can be incredibly valuable even if it is ultimately removed from the recurring production loop. It gives us benchmark solutions, exposes sensitivity, reveals interactions, and shows us which parts of the search space actually matter.

Once that structure is visible, we can often compress the problem.

That compression may take the form of:

- tighter bounds,
- a better starting point,
- a reduced candidate set,
- a surrogate model,
- monotonicity assumptions that are empirically validated,
- hierarchical defaults based on item characteristics,
- or, in this case, a local search over neighboring parameter values.

The sophisticated part of the system may therefore be the **learning process that justifies a simple heuristic**.

The production algorithm can then be boring on purpose.

## Ninety-five percent can be better than one hundred percent

Optimization practitioners sometimes get uncomfortable when a method intentionally accepts less than the best known objective value.

That discomfort is healthy when the gap is arbitrary or poorly understood. But a measured approximation can be the better decision when the full optimization cost is substantial.

Imagine two systems.

The first can spend weeks performing a massive tuning exercise and return the best solution it can find for the current data.

The second can return a solution worth about 95% as much in tens of minutes and can be rerun frequently as inputs, forecasts, constraints, and economics move.

Which one is actually better?

The answer depends on the value of the final few percentage points, the cost of computation, and how quickly the environment changes. But in many operational systems, **freshness and adaptability are part of solution quality**.

A theoretically better parameter that takes too long to recompute can become practically worse than a slightly approximate parameter that is continuously refreshed.

The objective function usually does not include "time spent admiring the optimizer."

It should include the consequences of the decision.

## The workflow I would use again

The general pattern is reusable.

Start with a search method broad enough to explore the space credibly. Save every evaluation. Treat those evaluations as a dataset, not disposable solver exhaust.

Then analyze the response surface. Look for monotonic regions, plateaus, single peaks, dominant interactions, and relationships between problem characteristics and optimal settings.

Next, propose the simplest search rule that appears capable of exploiting those patterns. Backtest it against the expensive search. Measure not only average optimality gap, but also tail failures: where does the heuristic perform badly, and can those cases be detected before deployment?

Finally, keep the expensive method available as a periodic benchmark or fallback. The heuristic should earn trust continuously rather than being declared correct forever.

This creates a nice feedback loop:

**global search → simulation data → structural insight → simpler heuristic → validation → faster recurring decisions**

That is optimization work too.

## The broader lesson

The most valuable output of an optimization experiment is not always the optimizer's answer.

Sometimes it is the discovery that the problem has enough structure that you no longer need the optimizer you started with.

Simulation made that possible here. The initial search generated a large amount of expensive data, but that data exposed a pattern. Once the pattern was understood, the production search could be dramatically simplified.

The result was not a cleverer optimizer.

It was a better understanding of the decision landscape.

And once you understand the landscape, a hill climb can be exactly the right algorithm.