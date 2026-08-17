---
title: Benchmark "Medical Services"
date: 2021-02-01
tags: [healthcare, decision-tables, performance]
solutions:
  - title: Prolog
    author: Matteo Redaelli
    url: https://www.mr70.eu/posts/dmcommunity_org_challenge-feb-2021/
  - title: Camunda
    author: Rob Parker
    url: https://dmcommunity.org/wp-content/uploads/2021/02/challenge2021feb.robparker-2.pdf
  - title: Java
    author: Pradeep Venkat
    url: https://dmcommunity.org/wp-content/uploads/2021/02/challenge2021feb.java_.pdf
  - title: Corticon
    author: Seth Meldon
    affiliation: Progress Corticon
    url: https://dmcommunity.org/wp-content/uploads/2021/03/challenge2021feb.corticon.pdf
  - title: IBM ODM
    author: Azahara Talavera, Thomas Follon, Lorena Roa, Facundo López
    affiliation: decide4AI
    url: https://decidesoluciones.es/resolucion-challenge-feb-2021-benchmark-medical-services/
  - title: OpenRules
    author: Jacob Feldman
    affiliation: OpenRules
    url: https://openrules.wordpress.com/2021/04/12/benchmarking-decision-service/
  - title: Java (custom HashMap engine)
    author: Dr. Bob Moore
    url: https://dmcommunity.org/wp-content/uploads/2021/05/challenge2021feb.bobmoore.pdf
  - title: Drools 7.50
    author: Dr. Bob Moore
    url: https://dmcommunity.org/wp-content/uploads/2021/05/challenge2021feb.bobmoore.pdf
---

Unlike most challenges here, this one is about *speed*, not just correctness. It asks DM practitioners to implement the same decision service using their favorite BR&DM tool and report its actual execution time.

**The problem.** A company that used SQL against a database for its medical services decided to migrate to a serverless architecture. The first microservice, "Determine Medical Service Coverage," looks up coverage attributes for a medical service using a single (large) decision table with **16,369 rules** covering combinations of medical-service characteristics.

**Expected solution.** Build a RESTful decision service that accepts a medical service description in JSON and fills in its coverage attributes. Run it against 10 provided JSON test cases and report the average execution time per request, excluding network overhead — ideally by deploying the service so anyone can call it directly (e.g. from Postman) to reproduce the numbers.

Send your solutions to [DecisionManagementCommunity@gmail.com](mailto:DecisionManagementCommunity@gmail.com), or [open a pull request](https://github.com/Decision-Management-Community/dm-community/blob/main/CONTRIBUTING.md) to add yours here.

> One submitted solution (Prolog, by Matteo Redaelli) was originally published as an external write-up whose link no longer resolves. If you're the author (or know a working link), please open a pull request adding the `url` field back.
