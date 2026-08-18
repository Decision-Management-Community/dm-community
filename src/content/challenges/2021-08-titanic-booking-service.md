---
title: Titanic Booking Service
date: 2021-08-01
tags: [machine-learning]
solutions:
  - title: Scikit-Learn
    author: Dr. Bob Moore
    url: "/resources/articles/2021-08-01-titanic-booking-service-scikit-learn/"
  - title: RuleLearner
    author: Jacob Feldman
    affiliation: OpenRules
    url: https://openrules.wordpress.com/2021/09/11/titanic-booking-service/
  - title: s(CASP)
    author: Gopal Gupta
    url: "/resources/articles/2021-08-01-titanic-booking-service-s-casp/"
---

Kaggle's classic [Titanic competition](https://www.kaggle.com/c/titanic/overview) asks entrants to use machine learning to predict which passengers survived the shipwreck. It provides `train.csv` — 891 passengers with characteristics like age, sex, ticket class, and fare, plus whether they survived — and `test.csv`, 418 more passengers with the same characteristics but no outcome. Not every characteristic is known for every passenger (age, for instance, is sometimes missing).

For this challenge, use those same two files to build a "Titanic Booking Service": a decision model that produces one of three travel-advice outcomes for each passenger — "Bon Voyage," "Go at your own risk," or "Don't do it!"

You can create the rules with any ML tool, or manually from your own reading of the disaster (or even borrow rules published by past Kaggle competitors) — but you cannot train on the outcomes of the test passengers. Run your finished rules against all 418 test passengers, compare each "advice" against what actually happened, and report the total counts of good vs. bad advice.

Send your solutions to [DecisionManagementCommunity@gmail.com](mailto:DecisionManagementCommunity@gmail.com), or [open a pull request](https://github.com/Decision-Management-Community/dm-community/blob/main/CONTRIBUTING.md) to add yours here.
