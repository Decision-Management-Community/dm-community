---
title: "Determine Booking Fraud"
date: 2017-02-01
tags: [fraud-detection, business-rules]
solutions:
  - title: Corticon
    author: Mike Parish
    url: https://dmcommunity.org/wp-content/uploads/2017/03/fraudchallenge-corticon.pdf
  - title: Oracle DMN
    author: Arun Pareek
    affiliation: Rubicon Red
    url: https://dmcommunity.org/wp-content/uploads/2017/05/determine-booking-fraud-solution-by-arun-pareek-using-oracle-process-cloud-service.pdf
---

Build a decision model that flags potential fraud during an online product-booking process, based on an automatically calculated Fraud Rating Score. A booking is allowed to proceed automatically only if the score stays below 200. The score accumulates as follows:

- Booked product is a post-paid hotel: +5
- Booked product is an internal flight: +100
- Booked product is an international flight: +25
- Booked product is a car: +10
- Booked product is a pre-paid hotel: +5
- Customer has no previous orders: +100
- Customer has 1–10 previous orders: + (100 − number of orders × 10)
- Customer has previous disputes: +190

Naturally, a real fraud model would layer in many more factors — this is meant as a minimal starting point for comparing how different tools express the scoring logic.

Send your solutions to [DecisionManagementCommunity@gmail.com](mailto:DecisionManagementCommunity@gmail.com), or [open a pull request](https://github.com/Decision-Management-Community/dm-community/blob/main/CONTRIBUTING.md) to add yours here.
