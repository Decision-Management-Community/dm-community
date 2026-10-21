---
title: "Stigler's Diet Problem - OpenRules Rule Solver without Java"
date: 2026-10-21
author: "Jacob Feldman"
authorEmail: "jacobfeldman@openrules.com"
affiliation: "OpenRules"
summary: "A complete no-Java OpenRules Rule Solver solution for the October 2026 Stigler's Diet Problem challenge, implemented entirely with Excel decision tables."
challengeUrl: "/challenges/2026-10-stigler-diet-problem/"
---

This article presents a solution to the October 2026 [Stigler's Diet Problem challenge](/challenges/2026-10-stigler-diet-problem/) using OpenRules Rule Solver without any Java code.

Stigler's Diet Problem is one of the classical problems in Operational Research. The problem finds its origin in the work of Nobel laureate George Stigler (1944), who posed this as a mathematical exercise, not as eating recommendations:

> For a moderately active man weighing 154 pounds, how much of each of 77 foods should be eaten on a daily basis so that the man's intake of nine nutrients will be at least equal to the [recommended dietary allowances](https://en.wikipedia.org/wiki/Recommended_dietary_allowance) in 1943, with the cost of the diet being minimal?

The nutrients, commodities, and an alternative implementation are described on the [OR-Tools Stigler diet page](https://developers.google.com/optimization/lp/stigler_diet).

## Glossary

| Variable | Business concept | Attribute or expression | Type | Used as |
| --- | --- | --- | --- | --- |
| Nutrients | DietProblem | nutrients | Nutrient[] | in |
| Foods | DietProblem | foods | Food[] | in |
| TotalAnnualCost | DietProblem | totalAnnualCost | double | out |
| NutrientName | Nutrient | name | String | in |
| NutrientId | Nutrient | id | int | in |
| DailyIntake | Nutrient | dailyIntake | double | in |
| FoodId | Food | foodId | String | in |
| Commodity | Food | commodity | String | in |
| Units | Food | units | String | in |
| Price | Food | price | double | in |
| NutrientQuantities | Food | nutrientQuantities | double[] | in |
| AnnualCost | Food | annualCost | double | out |
| NumberOfNutrients | calculated | Nutrients.length | int | - |
| NutrientQuantity | calculated | NutrientQuantities[NutrientId - 1] | double | - |

## Test data

We copied the OR-Tools data to Excel and added two lines to the headers. The nutrient decision data is:

| Nutrient ID | Nutrient name | Daily intake |
| ---: | --- | ---: |
| 1 | Calories (calories) | 3 |
| 2 | Protein (grams) | 70 |
| 3 | Calcium (grams) | 0.8 |
| 4 | Iron (milligrams) | 12 |
| 5 | Vitamin A (IU) | 5 |
| 6 | Thiamine (Vitamin B1) (milligrams) | 1.8 |
| 7 | Riboflavin (Vitamin B2) (milligrams) | 2.7 |
| 8 | Niacin (milligrams) | 18 |
| 9 | Ascorbic Acid (Vitamin C) (milligrams) | 75 |

The food decision data contains all 77 commodities from the OR-Tools data set. Each food row supplies a food ID, commodity name, units, price, and an array of the nine nutrient quantities. A single test case passes the named **nutrients** and **foods** decision-data tables to the model.

## Business logic

The solution uses the newest version of [OpenRules Rule Solver](https://openrules.com/rule-solver/) and only OpenRules decision tables - no Java code.

### Problem definition

The **Define** decision table executes three tables in order:

| Decision tables |
| --- |
| CreateVariables |
| PostConstraints |
| SetObjective |

### Step 1: Create the main constraint variables

For every food in the **Foods** array, **CreateVariables** calls **SolverCreateReal**:

| Variable name | Domain | Array name |
| --- | --- | --- |
| {{FoodId}} | 0..1000000 | AllFoodVariables |

This creates an unknown real decision variable between 0 and 1,000,000 for every food and adds it to the **AllFoodVariables** array, which is later used to define the **TotalAnnualCost** objective.

### Step 2: Post the daily intake constraints

For every nutrient in the **Nutrients** array, **PostConstraints** executes these tables:

| Tables |
| --- |
| CreateConsumedNutrientArray |
| PostDailyIntakeConstraints |

For every food, **CreateConsumedNutrientArray** calls **SolverDefineReal**:

| Variable name | Variable expression | Array name |
| --- | --- | --- |
| Consumed_{{NutrientId}}_{{FoodId}} | {{FoodId}} * {{NutrientQuantity}} | Consumed{{NutrientId}} |

**PostDailyIntakeConstraints** then calls **SolverPost** with this constraint:

    Sum(Consumed{{NutrientId}}) >= ({{DailyIntake of Nutrient}} * 365.0)

### Step 3: Set the optimization objective

**SetObjective** defines the annual cost and selects it as the real-valued objective:

| Variable name | Expression | Objective |
| --- | --- | --- |
| TotalAnnualCost | Sum(AllFoodVariables) | TotalAnnualCost |

The constrained variable **TotalAnnualCost** is therefore the sum of every variable in **AllFoodVariables**, and the solver minimizes it.

## Problem resolution

The standard **Solve** decision table executes:

| Actions |
| --- |
| SolverMinimize |
| AssignSolution |

After an optimal solution is found, **AssignSolution** runs for every food. If the food's solution value is greater than zero, **SolverAssignSolutionReal** assigns it to the food's **AnnualCost** output and prints the commodity and its annual cost.

| Solver variable | Condition | Business variable | Printed text |
| --- | --- | --- | --- |
| {{FoodId}} | > 0 | AnnualCost | {{Commodity}} = $ {{AnnualCost}} |

## Applied linear solvers

We tested different linear/MIP solvers by changing the **SOLVER** property in **test.bat**:

    @echo off
    cd %~dp0
    set SOLVER=Scip
    rem set SOLVER=CLP
    rem set SOLVER=ojAlgo
    call mvn clean test -e

SCIP, CLP, and ojAlgo all produced the same optimum. A representative run returned:

    TotalAnnualCost[39.66173222461947]
    *** Execution Profile ***
    Execution time: 1089 msec
    SolverSaveSolution
    Wheat Flour (Enriched) = $ 10.7744567645
    Liver (Beef) = $ 0.6907836618
    Cabbage = $ 4.0932688874
    Spinach = $ 1.8277959785
    Navy Beans, Dried = $ 22.2754269323
    'testCases-1' succeeded. Elapsed time 1590.03 ms

The minimum annual cost is approximately **$39.66**, using wheat flour, beef liver, cabbage, spinach, and dried navy beans.
