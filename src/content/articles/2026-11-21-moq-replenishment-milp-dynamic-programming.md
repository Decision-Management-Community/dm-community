---
title: "The MOQ Replenishment Trap: A MILP and Exact Dynamic Programming Solution"
date: 2026-11-21
author: "Adam DeJans Jr."
linkedin: "https://www.linkedin.com/in/addejans/"
summary: "A reproducible five-week replenishment problem demonstrates why a low unit price can produce a worse buying policy. A HiGHS MILP and an independent exact dynamic program both certify the $487 global optimum."
challengeUrl: "/challenges/2026-11-moq-replenishment-trap/"
---

The tempting policy in the [MOQ Replenishment Trap challenge](/challenges/2026-11-moq-replenishment-trap/) is to buy everything from the supplier charging five dollars per unit rather than eight dollars. That conclusion ignores the decision's consequences across the planning horizon. The less expensive supplier imposes a fifty-five-dollar fixed ordering fee, requires at least twelve units per order, and delivers one week later. The more expensive supplier charges a smaller setup fee, allows a five-unit order, and delivers immediately. The difference becomes consequential late in the horizon, when the remaining shortage is small and an additional Regular order creates setup expense, excess inventory, or both.

This deliberately small example is useful because we can solve it with a mixed-integer linear program and **independently prove the same result using exact finite-horizon dynamic programming**. The purpose is not to showcase a difficult benchmark. It is to make the complete decision process auditable: orders affect inventory states, lead times couple adjacent periods, setup decisions create discontinuities in cost, and an apparently cheaper purchasing alternative is not necessarily better as part of the complete plan.

## The global optimum

The verified minimum total cost is **$487**. Both methods return that objective. The MILP solver reports an optimal termination with a **$487 lower bound and zero relative MIP gap**; a separate dynamic program using integer arithmetic returns the same optimum after enumerating **370,941 feasible state transitions**, retaining only the least expensive path to each state. A direct balance-and-cost checker also validates both returned plans independently of the optimization formulations.

| Week | Demand | Express order (same-week receipt) | Regular order (arrives next week) | Regular receipt | Ending inventory |
| --- | ---: | ---: | ---: | ---: | ---: |
| 1 | 8 | 0 | 30 | 0 | 1 |
| 2 | 22 | 0 | 0 | 30 | 9 |
| 3 | 9 | 0 | 30 | 0 | 0 |
| 4 | 23 | 0 | 0 | 30 | 7 |
| 5 | 12 | 5 | 0 | 0 | 0 |

The cost accounting is transparent. Two Regular orders purchase sixty units at five dollars each, for **$300** in variable cost plus **$110** in fixed charges. One Express order buys five units at eight dollars each, for **$40** in variable cost plus **$20** in fixed charges. Ending inventories total seventeen unit-weeks, for **$17** in carrying cost. Their sum is **$487**. Every order meets the relevant MOQ and capacity bounds, every demand quantity is satisfied on time, ending inventory remains between zero and thirty-five, and there are no Regular orders that would arrive after week 5.

## Why the simpler buying rules lose

For a controlled comparison, the best feasible plan restricted to the Regular supplier costs **$500**, as determined by resolving the same optimization problem with Express purchases disabled. That plan orders thirty units in week 1, twenty-three in week 3, and twelve in week 4. Its sixty-five purchased units cost $325, its three fixed charges cost $165, and ten unit-weeks of holding cost $10. The total is $500, thirteen dollars more expensive than the mixed-supplier optimum. A feasible Express-only plan can also serve all five weeks; when optimized under the same restrictions, its best cost is **$629**.

The economic mechanism is especially clear in the fifth week. After using the Regular supplier efficiently in earlier periods, the preferred joint plan carries seven units into the final week and needs only five more to satisfy demand. A five-unit Express order is feasible and costs sixty dollars, including its fixed charge. A new Regular order would have to be placed in the preceding week and would carry a larger minimum quantity and a higher fixed charge. This is why comparing supplier unit prices alone gives an incomplete answer. In a multiperiod decision problem, the marginal cost of meeting an additional requirement includes the order constraints, timing, and inventory consequences induced by the decision.

## A tight mixed-integer formulation

Let each week's Express and Regular order quantities be nonnegative integer variables, and let ending inventory be a nonnegative integer variable. Add one binary order indicator per supplier per week, which activates the associated fixed charge. The Express order quantity lies between five times its binary indicator and twenty times that indicator; the Regular quantity lies between twelve and thirty times its indicator. These are **tight, instance-derived bounds**, rather than arbitrary large constants. Fix the final-week Regular order and its indicator to zero.

For each week, ending inventory equals previous ending inventory plus the Regular order placed one week earlier plus the current week's Express order, less current demand. The first week's previous inventory is nine units, and there is no Regular receipt in that week. Constrain ending inventory to the interval from zero to thirty-five. The objective minimizes the sum over all weeks of the two suppliers' unit purchase expenditures, their active fixed ordering charges, and the dollar-per-unit holding charges on ending inventory. The formulation has twenty-five variables, including ten order indicators, and it retains the time coupling exactly through the shifted Regular receipts.

The use of a mixed-integer model matters because costs and feasible quantities change discontinuously when an order switches from zero to positive. The linear relaxation can allow fractional setup indicators; the integrality requirements prevent that. The final result is accompanied by a solver lower bound, so the zero-gap claim relates to the complete model rather than a locally improved candidate.

## An independent dynamic-programming certificate

The dynamic program was written separately from the MILP, using ordinary integer states and explicit enumeration of admissible weekly actions. At the start of a week, its state is the pair consisting of **inventory carried forward** and the **Regular order arriving this week**. The action is a legal Express order for the current week, together with a Regular order for the next week. The state transition subtracts that week's demand after adding the arriving Regular units and current Express units. Only transitions leaving ending inventory between zero and thirty-five survive. Each transition adds the current purchase expenditures, setup fees, and holding charge, and the next state becomes the ending inventory and newly placed Regular order.

The program starts from the state with nine units of inventory and zero incoming Regular units. For each state in each week, it keeps the least-cost history reaching that state, because all future feasible actions and costs depend only on that state and the current week. That is the Bellman principle in a directly auditable finite setting: discarding a more expensive history to the same state cannot discard a better complete plan. In the fifth week, Regular ordering is disabled. The least expensive terminal state is the global optimum. For this instance the algorithm visits 340, 720, 720, 720, and 36 distinct post-week states, examining **370,941** feasible transitions in total. The optimum is exactly **$487** without relying on MILP tolerances or solver bounds.

Agreement between two independently implemented algorithms does not make every possible software defect impossible. It does, however, provide strong evidence: the MILP lower bound certifies the optimum under the mathematical formulation, the dynamic program proves the same value through exact finite-state recursion, and a separate checker validates the actual purchases, balances, capacities, lead-time semantics, and reported costs.

## Reproduce the result

Download the [complete runnable Python implementation](/challenge-solutions/2026-11-moq-replenishment.py). It uses Python, NumPy, and SciPy's `milp` interface to HiGHS. After installing the dependencies, execute `python 2026-11-moq-replenishment.py`. The script solves the MILP, checks its dual bound and integrality, independently executes the dynamic program, independently checks the returned schedules, asserts that both optimal objectives agree, and prints the purchase plan, bound, gap, and dynamic-programming state counts. The synthetic challenge instance is defined at the top of the file, so readers can adjust demand, costs, lead times within the model structure, or capacities to explore related cases.

For a practitioner, the broader lesson is that procurement policies, inventory outcomes, and time-dependent constraints must be evaluated **together**. Component-level comparisons remain valuable as controlled experiments, but the decision to place a small Express order should be scored against its actual opportunity cost in the full replenishment system. The cheapest supplier in isolation need not participate in every optimal decision, even when its unit-price advantage is substantial.