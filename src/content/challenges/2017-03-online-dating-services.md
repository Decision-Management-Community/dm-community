---
title: "Online Dating Services"
date: 2017-03-01
tags: [business-rules, matching]
solutions:
  - title: Executable English
    author: Adrian Walker
    affiliation: Reengineering LLC
    url: https://dmcommunity.org/wp-content/uploads/2017/05/onlinedatingchallenge-adrianwalker.pdf
  - title: InteliOps
    author: Dr. Vijay Bandekar
    url: https://dmcommunity.org/wp-content/uploads/2017/05/online-dating-decision-intelliops.pdf
  - title: DMN with Drools
    author: Edson Tirelli
    affiliation: Red Hat
    url: https://github.com/kiegroup/drools/blob/master/kie-dmn/kie-dmn-core/src/test/resources/org/kie/dmn/core/dmcommunity_challenge_2017_03.pdf
  - title: Corticon
    author: Mike Parish
    url: https://dmcommunity.org/wp-content/uploads/2017/11/online-dating-corticon-mike-parish.pdf
  - title: MiniZinc
    author: Hakan Kjellerstrand
    url: https://github.com/hakank/hakank/blob/master/minizinc/online_dating_service.mzn
---

An online dating service wants a rules engine to help match its members. Each profile records a name, gender, city, age, a list of interests, an acceptable age range for matches, acceptable genders, and a minimum number of shared interests required.

Two people are a potential match only if, for both of them: the other's gender is acceptable, the other's age falls in the acceptable range, the cities match exactly, and the other's interests overlap by at least the minimum required. Among valid matches, higher scores go to smaller age gaps and more shared interests.

**Example:** Jane (26, Seattle, interests: skydiving, knitting, reading) wants a man aged 28–32 sharing at least one interest. Jim (29, Seattle, interests: skydiving, soccer, knitting) wants a woman aged 24–29 sharing at least two interests. Build a decision model that determines whether they match, and produces a score if so.

Send your solutions to [DecisionManagementCommunity@gmail.com](mailto:DecisionManagementCommunity@gmail.com), or [open a pull request](https://github.com/Decision-Management-Community/dm-community/blob/main/CONTRIBUTING.md) to add yours here.
