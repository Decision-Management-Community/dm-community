---
title: "The MOQ Replenishment Trap"
date: 2026-11-21
tags: [inventory, supply-chain, mixed-integer-programming, dynamic-programming]
solutions:
  - title: "MILP and Exact Dynamic Programming"
    author: "Adam DeJans Jr."
    affiliation: "Bit Bros LLC"
    url: "/resources/articles/2026-11-21-moq-replenishment-milp-dynamic-programming/"
---

A supplier can have the lowest price per unit and still be the wrong choice for a particular replenishment decision. Fixed ordering charges, minimum order quantities (MOQs), and lead times interact across periods. This challenge asks you to find the least-cost purchase plan for a small warehouse that serves deterministic weekly demand, but orders from suppliers on different terms.

## Planning instance

A warehouse must satisfy demand over **five weeks**. Demand is known for this exercise, every unit is indivisible, and backorders, lost sales, and unmet demand are prohibited. There are **9 units on hand** at the start of week 1, with no outstanding orders. End-of-week warehouse inventory may never exceed **35 units**, and it may never be negative.

| Week | 1 | 2 | 3 | 4 | 5 |
| --- | ---: | ---: | ---: | ---: | ---: |
| Demand (units) | 8 | 22 | 9 | 23 | 12 |

You can order from either or both suppliers at the **start** of a week. Deliveries that arrive in a week are available to satisfy that week's demand before ending inventory is measured.

| Supplier | Unit price | Fixed cost for each nonzero order | MOQ for a nonzero order | Maximum units per weekly order | Lead time |
| --- | ---: | ---: | ---: | ---: | --- |
| Express (E) | $8 | $20 | 5 | 20 | Same week |
| Regular (R) | $5 | $55 | 12 | 30 | One week (order in week *t* arrives in week *t + 1*) |

The Regular supplier cannot be ordered from in week 5, because delivery would occur outside the planning horizon. A supplier's weekly order quantity must be **zero** or an **integer** between its MOQ and maximum, inclusive. Orders incur their unit and fixed purchase costs when they are *placed*. Ending inventory incurs a charge of **$1 per unit per week**, including at the end of week 5. Leftover ending inventory is allowed, but has no salvage value. No other costs or constraints apply. The storage limit is explicitly measured on **end-of-week** inventory, after demand has been served.

## Your challenge

Find a globally minimum-cost feasible purchase plan, identifying each week's Express orders, Regular orders, Regular receipts, and ending inventory. Include all variable purchasing costs, fixed order charges, and holding costs. Explain why purchasing everything from the lower-priced Regular supplier may not be optimal, and provide a credible optimality argument rather than just a feasible schedule.

For extra credit, implement two independent methods, such as a mixed-integer linear program and a finite-horizon dynamic program. Compare the optimal joint-supplier policy against the best feasible **Regular-only** and **Express-only** plans, and discuss what the result teaches us about evaluating decisions over time.

This is an original, deliberately small teaching instance with synthetic data, so solutions can be checked exactly. Other solution approaches are welcome; see the [contribution instructions](https://github.com/Decision-Management-Community/dm-community/blob/main/CONTRIBUTING.md).