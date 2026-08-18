---
title: Greeting a Customer with Unknown Data
date: 2016-08-01
tags: [business-rules, dmn]
solutions:
  - title: OpenRules
    author: Jacob Feldman
    affiliation: OpenRules
    url: "/resources/articles/2016-08-01-greeting-a-customer-with-unknown-data-openrules/"
---

The "Hello World" of business rules is usually a decision model that generates a greeting like "Good morning, Mrs. Robinson!" for an IVR system, based on known facts about the caller. That's easy when all the facts are known — but real-world data is rarely complete. This challenge asks: what happens to your greeting logic when some of the inputs are missing?

The rules need to account for:

- **Current Hour**, derived from the customer's location (inferred from caller ID, or from the customer's address if the phone number is unrecognized and the location can't otherwise be determined).
- **Customer's Season** (Summer Time vs. Winter Time), also derived from location — this shifts the hour thresholds used to pick "Good Morning" / "Good Afternoon" / "Good Evening" (11/17/22 in summer, 12/16/21 in winter).
- If the current hour or season can't be determined at all, fall back to a plain "Hello."
- **Salutation**: use "Ms." if gender is known-female and marital status is unknown; skip the salutation entirely if gender itself is unknown.

DMN recommends representing unknown values as "null." Is that enough — is a decision model that's littered with null-checks still readable by a business user? Build a working model that handles all these missing-data cases gracefully.

Send your solutions to [DecisionManagementCommunity@gmail.com](mailto:DecisionManagementCommunity@gmail.com), or [open a pull request](https://github.com/Decision-Management-Community/dm-community/blob/main/CONTRIBUTING.md) to add yours here.
