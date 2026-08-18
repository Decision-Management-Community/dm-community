---
title: Rebooking Passengers from Cancelled Flights
date: 2016-10-01
tags: [business-rules, optimization]
solutions:
  - title: Corticon
    author: Michael Parish
    affiliation: Progress Software
    url: "/resources/articles/2016-10-01-rebooking-passengers-from-cancelled-flights-corticon/"
  - title: DMN
    author: Bruce Silver
    affiliation: Method & Style
    url: "/resources/articles/2016-10-01-rebooking-passengers-from-cancelled-flights-dmn/"
  - title: Drools with DMN
    author: Edson Tirelli
    affiliation: Red Hat
    url: https://raw.githubusercontent.com/kiegroup/drools/main/kie-dmn/kie-dmn-core/src/test/resources/org/kie/dmn/core/0019-flight-rebooking.pdf
  - title: Java
    author: Alex Goldin
    url: http://openrules.com/Java/FlightRebooking/RebookingEngine.java
  - title: OpenRules
    author: Jacob Feldman
    affiliation: OpenRules
    url: https://openrules.wordpress.com/2017/04/24/solving-flight-rebooking-challenge-with-and-without-programming-constructs/
  - title: Model-based optimal solution
    author: Jacob Feldman
    affiliation: OpenRules
    url: "/resources/articles/2016-10-01-rebooking-passengers-from-cancelled-flights-model-based-optimal-solution/"
  - title: DT5GL with SQL
    author: Jack Jansonius
    url: "/resources/articles/2016-10-01-rebooking-passengers-from-cancelled-flights-dt5gl-with-sql/"
  - title: RuleSolver
    author: Jacob Feldman
    affiliation: OpenRules
    url: https://rulesolver.wordpress.com/sample-decision-model/flight-rebooking/
---

Proposed by Michael Parish: a flight has been cancelled, and its passengers need to be re-booked onto other flights. The rebooking decision has to take into account each passenger's frequent-flyer status, accumulated miles, and the seat availability on candidate replacement flights.

This one turned out to have real staying power — it kept attracting new solutions (including an optimization-based approach and a declarative rule-solver version) for years after it was first posted.

Send your solutions to [DecisionManagementCommunity@gmail.com](mailto:DecisionManagementCommunity@gmail.com), or [open a pull request](https://github.com/Decision-Management-Community/dm-community/blob/main/CONTRIBUTING.md) to add yours here.
