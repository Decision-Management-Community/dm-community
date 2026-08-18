---
title: Soldier Payment Rules
date: 2023-08-01
tags: [business-rules, scheduling]
solutions:
  - title: Corticon
    author: Michael Parish
    url: "/resources/articles/2017-11-01-soldier-payment-rules-corticon/"
  - title: SQL
    author: Bob Moore
    url: "/resources/articles/2017-11-01-soldier-payment-rules-sql/"
  - title: DT5GL with SQL
    author: Jack Jansonius
    url: "/resources/articles/2023-08-01-soldier-payment-rules-dt5gl-with-sql/"
  - title: DT5GL with SQL (revised)
    author: Jack Jansonius
    url: "/resources/articles/2023-08-01-soldier-payment-rules-dt5gl-with-sql-revised/"
  - title: OpenRules Decision Manager
    author: Alex Mirtsyn
    affiliation: OpenRules
    url: "/resources/articles/2023-08-01-soldier-payment-rules-openrules-decision-manager/"
  - title: OpenRules RuleDB
    author: Jacob Feldman
    affiliation: OpenRules
    url: https://openrules.blog/2023/10/13/solutions-for-challenge-soldier-payment-rules/
---

This challenge brings back "Soldier Payment Rules," which only received two solutions when it originally ran in 2017 — a good opportunity to show off the expressive power of your DMN or other decision management tool.

During different service periods a soldier may have several overlapping characteristics: rank (private, corporal, sergeant, lieutenant, captain — these must not overlap each other), profession (fighter, driver, cook, officer), service type (active, reserve, retired), unit (HQ, paratroopers, marines, infantry), and combat status (yes/no). The hourly pay rate aggregates a base rate of $1/hr plus amounts for each characteristic: private $1, corporal $2, sergeant $3, lieutenant $4, captain $5; fighter $2, driver $1, cook $1, officer $3; active $2, reserve $1; HQ $1, other units $2; combat $5, non-combat $0.

For example, a private who is a fighter, on active duty, at HQ, in combat, earns 1+1+2+2+1+5 = $12/hr.

The challenge: assemble a single timeline for a soldier over a given service period that shows the hourly pay rate at any given time, flagging any conflicting/overlapping rank assignments. Additional challenge: identify all the distinct aggregated pay rates that apply and the periods during which each applies.

Send your solutions to [DecisionManagementCommunity@gmail.com](mailto:DecisionManagementCommunity@gmail.com), or [open a pull request](https://github.com/Decision-Management-Community/dm-community/blob/main/CONTRIBUTING.md) to add yours here.
