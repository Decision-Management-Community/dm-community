---
title: "Soldier Payment Rules"
date: 2017-11-01
tags: [business-rules, temporal-reasoning]
solutions:
  - title: Corticon
    author: Michael Parish
    url: https://dmcommunity.org/wp-content/uploads/2017/11/soldier-decision-modeling-challenge-corticon-mike-parish.pdf
  - title: SQL
    author: Dr. Bob Moore
    url: https://dmcommunity.org/wp-content/uploads/2017/11/bobmoore-nov2017challenge.pdf
---

A soldier's pay rate is built up from several time-varying, independently-tracked characteristics, each with its own effective date range:

- **Rank** {private, corporal, sergeant, lieutenant, captain} — ranks never overlap in time
- **Profession** {fighter, driver, cook, officer}
- **Service type** {active, reserve, retired}
- **Unit** {HQ, paratroopers, marines, infantry}
- **Combat** {yes, no}

The base rate is $1/hr, and each characteristic adds its own hourly amount: private +$1, corporal +$2, sergeant +$3, lieutenant +$4, captain +$5; fighter +$2, driver +$1, cook +$1, officer +$3; active +$2, reserve +$1; HQ +$1, any other unit +$2; combat +$5, non-combat +$0.

**Example:** on June 1, 2015, a soldier is a private, a fighter, on active duty, at HQ, and in combat — pay rate = 1+1+2+2+1+5 = $12/hr.

The challenge: given a soldier's full set of overlapping characteristic periods over a service window, assemble a single timeline of hourly pay rates, flagging any conflicting dates (e.g. simultaneously a sergeant and a lieutenant). As a bonus, determine every distinct aggregated pay rate that occurs and the periods during which each applies.

Send your solutions to [DecisionManagementCommunity@gmail.com](mailto:DecisionManagementCommunity@gmail.com), or [open a pull request](https://github.com/Decision-Management-Community/dm-community/blob/main/CONTRIBUTING.md) to add yours here.
