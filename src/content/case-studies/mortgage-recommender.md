---
title: Mortgage Recommender
organization: "—"
industry: Financial Services
linkStatus: ok
summary: A decision model for recommending, pricing, and ranking mortgage loans, contributed by Gil Ronen.
---

This decision model addresses the complex problem of mortgage loan recommendations. Based on an
applicant's objectives and preferences, it generates, prices, and ranks best-fit loan
recommendations. A [case study describing the process of building this decision model](/case-studies/mortgage-recommender-case-study.pdf)
(hosted directly in this repo) was contributed by [Gil Ronen](https://www.linkedin.com/in/gilronen).
It uses the OMG standards BPMN 2.0 and DMN 1.0. The executable implementation was built with
[OpenRules](http://openrules.com/dmn_primer.htm).

**Implementation files:**

- [Main.xls](http://openrules.com/xls/MortgageRecommender/Decision.xls) — main decisions with a Business Process and Decision Requirements Diagrams
- [Glossary.xls](http://openrules.com/xls/MortgageRecommender/Glossary.xls) — a business glossary
- [Data.xls](http://openrules.com/xls/MortgageRecommender/Data.xls) — test cases

**Decisions and Decision Tables:**

- [LoanConstraintsGenerationRules.xls](http://openrules.com/xls/MortgageRecommender/LoanConstraintsGenerationRules.xls)
- [ProductRules.xls](http://openrules.com/xls/MortgageRecommender/ProductRules.xls)
- [PricingRules.xls](http://openrules.com/xls/MortgageRecommender/PricingRules.xls)
- [PaymentRules.xls](http://openrules.com/xls/MortgageRecommender/PaymentRules.xls)
- [RankingRules.xls](http://openrules.com/xls/MortgageRecommender/RankingRules.xls)

**Supporting Java classes:**

- [Main.java](http://openrules.com/xls/MortgageRecommender/Main.java)
- [LoanOption.java](http://openrules.com/xls/MortgageRecommender/LoanOption.java)
- [LoanOptions.java](http://openrules.com/xls/MortgageRecommender/LoanOptions.java)
- [Result.java](http://openrules.com/xls/MortgageRecommender/Result.java)
- [RankComparator.java](http://openrules.com/xls/MortgageRecommender/RankComparator.java)

**Execution results:**

- [Report1.html](http://openrules.com/xls/MortgageRecommender/Report1.html)
- [Report2.html](http://openrules.com/xls/MortgageRecommender/Report2.html)
