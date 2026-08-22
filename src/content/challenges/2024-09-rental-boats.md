---
title: Rental Boats
date: 2024-09-01
tags: [optimization]
solutions:
  - title: OR-Tools with Python
    author: Alireza Soroudi
    url: https://colab.research.google.com/drive/1HcErChMAiuFZ7QfWwFrK4p1bOebFWaLk?usp=sharing
  - title: Copilot/Pyomo
    author: SolverMax
    url: https://github.com/SolverMax/Random/tree/main/DMC/2024-09
  - title: Copilot
    author: Jacob Feldman
    affiliation: OpenRules
    url: "/resources/articles/2024-09-01-rental-boats-copilot/"
  - title: OpenRules/RuleSolver
    author: Ian Detinich
    url: "/resources/articles/2024-09-01-rental-boats-openrules-rulesolver/"
  - title: cDMN
    author: Simon Vandevelde
    affiliation: KU Leuven
    url: https://cdmn.readthedocs.io/en/latest/Examples/boats.html
  - title: OPL/CPLEX
    author: Alex Fleischer
    affiliation: IBM
    url: "/resources/articles/2024-09-01-rental-boats-opl-cplex/"
  - title: Llama/CPLEX
    author: Alex Fleischer
    affiliation: IBM
    url: "/resources/articles/2024-09-01-rental-boats-llama-cplex/"
  - title: CPLEX/Java
    author: Guillaume Chagneau
    url: "/resources/articles/2024-09-01-rental-boats-cplex-java/"
  - title: Excel Solver
    author: Guillaume Chagneau
    url: "/resources/articles/2024-09-01-rental-boats-excel-solver/"
  - title: Seeker
    author: Meinolf Sellmann
    authorUrl: https://www.linkedin.com/in/meinolf-sellmann-a349636/
    url: https://colab.research.google.com/drive/1_HbGO-R80v5uH5Tu1_nH39sfBV-u81Vi?usp=sharing
---

Floataway Tours has $420,000 to purchase new rental boats for the summer, from two manufacturers. Floataway wants to purchase at least 50 boats total, wants to purchase the same number from each manufacturer (to maintain goodwill), and wants a total seating capacity of at least 200. Data about the available boats:

| Boat | Manufacturer | Cost | Seating capacity | Expected daily profit |
|---|---|---|---|---|
| Speedhawk | Sleekboat | $6,000 | 3 | $70 |
| Silverbird | Sleekboat | $7,000 | 5 | $80 |
| Catman | Racer | $5,000 | 2 | $50 |
| Classy | Racer | $9,000 | 6 | $110 |

Create a decision model that helps Floataway purchase boats while satisfying the above requirements and maximizing profit.

Send your solutions to [DecisionManagementCommunity@gmail.com](mailto:DecisionManagementCommunity@gmail.com), or [open a pull request](https://github.com/Decision-Management-Community/dm-community/blob/main/CONTRIBUTING.md) to add yours here.
