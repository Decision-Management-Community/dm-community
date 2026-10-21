---
title: "Stigler's Diet Problem - OpenRules Rule Solver without Java"
date: 2026-10-21
author: "Jacob Feldman"
authorEmail: "jacobfeldman@openrules.com"
affiliation: "OpenRules"
summary: "A no-Java OpenRules Rule Solver solution for the October 2026 Stigler's Diet Problem challenge, implemented entirely with Excel decision tables."
challengeUrl: "/challenges/2026-10-stigler-diet-problem/"
documentUrl: "/news-media/2026/10/stigler-diet-rule-solver-no-java.pdf"
---

This solution implements the October 2026 [Stigler's Diet Problem challenge](/challenges/2026-10-stigler-diet-problem/) with the latest OpenRules Rule Solver. The model uses Excel decision tables only and requires no Java code.

## Test data

The classical OR-Tools data set was copied into Excel. It contains the nine required nutrients and 77 foods, with each food's price, unit, and nutrient quantities represented as decision data.

## Decision-table model

The optimization model is defined in three steps:

1. **Create the food variables.** For every food, the model creates a nonnegative real decision variable and adds it to the `AllFoodVariables` array.
2. **Post the nutrient constraints.** For every nutrient, the model calculates the quantity supplied by each food and requires the annual total to be at least the daily allowance multiplied by 365.
3. **Set the objective.** `TotalAnnualCost` is defined as the sum of all food variables and is selected as the minimization objective.

The standard `SolverMinimize` action finds the optimum. A final decision table copies positive solution values into each food's `AnnualCost` output and prints the selected foods.

## Solvers and result

The same decision-table model was tested with SCIP, CLP, and ojAlgo. All three produced the same minimum annual cost of approximately **$39.66**, selecting wheat flour, beef liver, cabbage, spinach, and dried navy beans.

[View the complete Rule Solver solution without Java (PDF)](/news-media/2026/10/stigler-diet-rule-solver-no-java.pdf)
