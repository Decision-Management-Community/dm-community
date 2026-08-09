---
title: COVID-19 Testing
date: 2021-05-01
tags: [healthcare, business-rules]
solutions:
  - title: cDMN
    author: Simon Vandevelde
    affiliation: KU Leuven
    url: https://cdmn.readthedocs.io/en/latest/Examples/covid_testing.html#covid-testing
  - title: DT5GL
    author: Jack Jansonius
    url: https://dmcommunity.org/wp-content/uploads/2021/05/challenge2021may.jj_.pdf
---

At the outset of the COVID-19 pandemic, with case counts rising faster than testing capacity, the Belgian government used a triage procedure to decide which patients should get a PCR test:

1. A patient's self-reported symptoms (anamnesis) capture whether they have sneezing and/or coughing.
2. Temperature is measured. The default fever threshold is 38°C, except for patients younger than 10, where it's 37.2°C (due to differences in measurement method and accuracy for young children).
3. If a patient presents at least two of these symptoms, they proceed to PCR testing; otherwise, standard quarantine guidance applies.

Model this triage logic — as decision tables or otherwise — keeping in mind that the pandemic was an ongoing crisis with expertise evolving in real time. In particular, make sure your model could gracefully absorb: (1) additional symptoms becoming recognized, such as loss of smell or taste, and (2) a change to the number-of-symptoms threshold that triggers testing.

This challenge was proposed by Matthias van der Hallen (KU Leuven — DTAI).

Send your solutions to [DecisionManagementCommunity@gmail.com](mailto:DecisionManagementCommunity@gmail.com), or [open a pull request](https://github.com/Decision-Management-Community/dm-community/blob/main/CONTRIBUTING.md) to add yours here.
