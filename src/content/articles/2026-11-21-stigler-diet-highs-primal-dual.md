---
title: "Stigler's Diet with HiGHS: Certify the Answer and Price the Constraints"
date: 2026-11-21
author: "Adam DeJans Jr."
summary: "An executed 77-food LP for the October 2026 Stigler Diet challenge: HiGHS primal and dual solutions, feasibility and complementary-slackness checks, and a sensitivity experiment showing where shadow prices stop being reliable."
challengeUrl: "/challenges/2026-10-stigler-diet-problem/"
---

The Stigler diet is often presented as a small linear-programming exercise: find the least expensive combination of 77 historical food commodities that meets nine minimum nutrient requirements. It is a good example, but reporting an optimum is only the first useful step. The more interesting questions are whether we can **certify** the answer from both sides of the optimization problem, identify which requirements actually drive the cost, and determine when a marginal value can be trusted for a changed decision.

I reconstructed the model from the [Google OR-Tools Stigler dataset](https://developers.google.com/optimization/lp/stigler_diet), solved the primal with the HiGHS dual-simplex algorithm, and solved the explicitly constructed dual separately with the HiGHS interior-point algorithm. The complete, self-checking [Python implementation is available here](/challenges/stigler-diet-highs-primal-dual.py). It requires only NumPy and SciPy, whose `linprog` interface bundles HiGHS. It prints the solution and **raises an assertion if a certificate or benchmark check fails**.

## Model and units

Let `x[i]` be the number of **1939 US dollars spent per day** on food `i`, not the number of servings purchased. Google's food matrix gives each nutrient *per dollar of expenditure*, so the unit cost of every `x[i]` is one dollar. The objective is to minimize the sum of those expenditures. For each nutrient, the sum of its contributions across all 77 foods must meet the minimum daily requirement, and food expenditures must be nonnegative.

In matrix notation the primal is `min 1ᵀx` subject to `Aᵀx ≥ b` and `x ≥ 0`, with a 77-by-9 nutrient matrix `A`. There is a small but important source-data convention: the calories column is in **thousands of kilocalories per dollar**. Its minimum of 3 represents 3,000 kcal per day; reading the column as individual kilocalories would produce a serious unit error. Similarly, the vitamin A column is in thousands of international units. This is a historical mathematical model, **not a contemporary diet recommendation**.

## Computed optimum

Both optimization algorithms return optimal status. The least-cost plan is **$0.1086622782 per day**, or **$39.66173155 for 365 days**, using the dataset's 1939 dollar values. The nonzero expenditures are:

| Commodity | Expenditure per day | Expenditure per year |
|---|---:|---:|
| Wheat flour (enriched) | $0.02951906 | $10.7745 |
| Beef liver | $0.00189256 | $0.6908 |
| Cabbage | $0.01121444 | $4.0933 |
| Spinach | $0.00500766 | $1.8278 |
| Dried navy beans | $0.06102856 | $22.2754 |

Only five of the 77 commodities are used by this optimum. That sparsity is not especially surprising: there are nine nutrient inequalities and a linear objective, and an extreme-point solution can typically have relatively few positive variables. The five selected commodities should not be mistaken for a sensible meal plan. The model contains no requirements for palatability, variety, realistic portion sizes, or many aspects of nutrition.

## A numerical optimality certificate

The dual assigns a nonnegative value `y[j]` to each minimum nutrient requirement. Its objective maximizes `bᵀy`, subject to the requirement that the total imputed nutrient value of any one dollar's worth of any commodity cannot exceed one dollar: `Ay ≤ 1`. Any dual-feasible vector provides a valid **lower bound** on the cheapest possible diet. Any primal-feasible food plan provides an **upper bound**. When the two objectives agree, we have a certificate of global optimality, apart from numerical tolerance.

The separately solved dual returned **$0.1086622782 per day**, equal to the primal value to displayed precision. Direct matrix multiplication, performed outside the solver's reported objective values, gave a primal-dual gap of approximately `-1.39e-17` dollars per day; maximum primal nutrient shortfall was zero to numerical precision, and maximum dual constraint violation was approximately `2.22e-16`. Complementary-slackness residuals were also below `1e-18`. The independently implemented checks enforce a tolerance of `1e-7`, and the annual cost is checked against the published approximately $39.6617 historical LP benchmark. This is a reproducible numerical certificate, not a claim of exact rational arithmetic.

The binding nutrient requirements are calories, calcium, vitamin A, vitamin B2, and vitamin C. Protein, iron, vitamin B1, and niacin exceed their minimums; the dual assigns them zero marginal value at the reported solution. In plain language, increasing a nonbinding minimum slightly does not change the current optimal cost, while increasing a binding minimum can.

## What the marginal values reveal

The dual multipliers have economic units: additional 1939 dollars **per day per unit increase in the corresponding daily requirement**. For example, calcium has a marginal value of approximately **$0.031737713 per additional gram of required calcium**, vitamin B2 has **$0.016358033 per additional milligram**, and calories have **$0.008765147 per additional 1,000 kcal**. The vitamin A and vitamin C values are approximately $0.000400233 per additional 1,000 IU and $0.000144118 per additional milligram, respectively.

Raw multiplier magnitudes are not a sensible ranking of constraints because the units differ. A unit-normalized comparison is more interpretable. A one-percent increase in the vitamin B2 requirement increases the daily optimum by approximately $0.000441667, compared with $0.000262954 for a one-percent increase in calories and $0.000253902 for a one-percent increase in calcium. These quantities describe **local cost sensitivity in the specified model**, rather than intrinsic biological importance or a universal priority order.

That local qualification matters. I raised the calorie minimum and re-solved the complete 77-food model rather than extrapolating indefinitely from the original dual. At **one percent more calories**, the predicted and actual daily cost increases both equal **$0.0002629544**. At **ten percent more calories**, the original multiplier predicts only **$0.0026295442**, while reoptimization produces **$0.0047408825**. The chosen-food basis changes. This is a concrete case where a shadow price is correct locally and materially misleading as a forecast of a larger policy change.

## Reproduce and verify

Download the [self-contained implementation](/challenges/stigler-diet-highs-primal-dual.py) and run:

```bash
python -m pip install numpy scipy
python stigler-diet-highs-primal-dual.py
```

The script checks the dimensions and column totals against the 77-food source table, separately solves the primal and dual, recomputes all nine nutrient totals, verifies nonnegativity and dual feasibility, tests complementary slackness and the primal-dual gap, compares the objective with the published historical benchmark, and re-solves the one-percent and ten-percent calorie scenarios. Both solution methods must return HiGHS optimal status before the script declares success.

The most useful lesson from this challenge is broader than diet optimization. Optimization models are collections of decisions, assumptions, and prices. A solver status is valuable, but a feasible incumbent, an independent bound, constraint residuals, and a deliberate sensitivity test provide a much better explanation of what was established and how far that result is likely to travel. The five foods are the answer to this *model*; the dual and the perturbation tests explain why that answer emerges and where its interpretation stops.

**Sources:** [Google OR-Tools Stigler problem and original commodity data](https://developers.google.com/optimization/lp/stigler_diet) and [Google's open-source sample implementation](https://github.com/google/or-tools/blob/stable/ortools/linear_solver/samples/stigler_diet.py) (Apache 2.0). All numerical claims above were computed with the linked HiGHS script and checked before submission.
