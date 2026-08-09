---
title: Determine the Risk of Meeting a Werewolf
date: 2014-09-01
tags: [business-rules, risk-scoring]
solutions:
  - title: OpenRules
    author: Jacob Feldman
    affiliation: OpenRules
    url: http://openrules.wordpress.com/2013/04/05/determine-the-risk-of-meeting-a-werewolf/
  - title: Sparkling Logic
    author: Carole-Ann Matignon
    affiliation: Sparkling Logic
  - title: BiZZdesign
    author: Antonio Plais
    affiliation: CENTUS
  - title: IBM ODM
    author: Francisco Manso
    affiliation: DECIDE
    url: http://www.decidesoluciones.es/en/el-riesgo-de-encontrarse-a-un-hombre-lobo/
---

Score the risk of encountering a werewolf using two weighted factors: the phase of the moon and the distance from the nearest graveyard.

**Phase of the Moon risk**

| Phase | Risk |
|---|---|
| New Moon | 0.01 |
| Half Moon | 0.25 |
| Three-Quarter Moon | 0.50 |
| Full Moon | 0.75 |

**Distance from Graveyard risk**

| Distance | Risk |
|---|---|
| < 5 miles | 0.75 |
| 5–25 miles | 0.25 |
| > 25 miles | 0.01 |

Combine the two using weights of 0.75 for the Phase of the Moon and 0.5 for the Distance from Graveyard:

`Werewolf Risk = (0.75 × Phase of the Moon Risk) + (0.5 × Distance from Graveyard Risk)`

Build a decision model that computes this score for any combination of inputs. (Spoiler from the original solvers: staying home on a full-moon night is your safest bet.)

Send your solutions to [DecisionManagementCommunity@gmail.com](mailto:DecisionManagementCommunity@gmail.com), or [open a pull request](https://github.com/Decision-Management-Community/dm-community/blob/main/CONTRIBUTING.md) to add yours here.
