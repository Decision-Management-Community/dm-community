---
title: "The Decision You Can Actually Make"
date: 2026-08-22
author: "Adam DeJans Jr."
linkedin: "https://www.linkedin.com/in/addejans/"
summary: "In large organizations, the decision that appears on a slide is often not the decision anyone can actually make. Real decision sets are shaped by timing, ownership, infrastructure, and operational constraints long before an optimizer sees them."
---

Decision models often start with a clean question: what decision are we trying to make?

That is the right question, but in a large organization it is rarely enough.

The decision written on a slide might be *set safety stock*, *choose an inventory policy*, *select a forecast*, *allocate capacity*, or *change a planning horizon*. Those are useful conceptual labels. They help us organize a problem. But they can also create the illusion that somebody in the organization is sitting at a desk with all of those choices available.

Usually, they are not.

The real decision is often much narrower. A planner may be allowed to move a horizon by three to five weeks in either direction, but the change must be committed two weeks in advance because of an operations process. A science team may nominally "choose the forecast," but only from models that an engineering platform can deploy and maintain. A business owner may want a new inventory policy, but the production system may expose only two configurable parameters without a six-month software project.

The decision that matters is therefore not the abstract business concept. It is the **action that is actually available to a specific decision-maker, at a specific time, given the organizational and technical state of the system**.

That distinction matters because a mathematically elegant model can optimize the wrong feasible set.

## The feasible set is organizational too

Optimization practitioners are trained to think carefully about feasibility. Capacity, balance equations, budgets, minimum order quantities, logical constraints, service requirements, and physical limits all define what the model is allowed to do.

In production organizations, there is another layer of feasibility that is just as real:

- what the current software exposes as configurable;
- what another team owns;
- what must be decided days or weeks before execution;
- what can be reversed later and what cannot;
- what data is available at the actual decision time;
- what an operations process can absorb without breaking;
- what engineering can support reliably;
- and what approvals, interfaces, or downstream commitments have already been made.

These are not implementation details that can be postponed until after the model is built. They define the decision space.

A model that recommends a decision nobody has the authority, interface, timing, or infrastructure to execute is not solving the business problem. It is solving a nearby fictional problem.

## "Who decides?" changes "what is the decision?"

It is common to ask who owns a decision after listing the decisions a business makes. In practice, I often find that identifying the owner changes the decision itself.

Suppose a workshop produces a row called **Safety Stock**.

Who chooses it?

The answer may be: nobody, at least not directly.

One team owns a forecasting service. Another team owns an ordering policy. A planner can adjust a planning horizon within a bounded range. An operations team imposes a two-week freeze window. Engineering controls which parameters are exposed. Finance sets a budget constraint. A central science team determines which model families are approved for production.

Once those facts are written down, "choose safety stock" dissolves into several smaller and more concrete decisions distributed across people and time.

That is much closer to reality.

This is also why organizational decision-making does not decompose as cleanly as a matrix sometimes suggests. The decision rights are coupled. One team's decision changes another team's feasible set. A platform decision made six months ago may dominate a planner's available choices today. A technical limitation can become a business constraint simply because changing it is too expensive within the current planning cycle.

## A practical way to define the real decision

Before optimizing anything, I like to push the decision definition one level lower than feels comfortable.

For each proposed decision, ask:

**Who can actually change it?** Not who is accountable for the outcome, but who can physically or digitally alter the variable.

**When can it be changed?** A decision made at execution time is different from one that must be locked two weeks earlier.

**What values are genuinely available?** The theoretical domain may be continuous while the production interface exposes five choices.

**What information exists at that moment?** If a forecast revision arrives after the commitment point, it is not part of the information state for that decision.

**What has already been fixed elsewhere?** Policies, platform architecture, contracts, upstream commitments, and other teams' decisions can all remove options.

**What can be revised later?** Reversible controls should be modeled differently from commitments that create path dependence.

**What does changing it require?** If changing a variable requires a quarter of engineering work, it is not the same class of decision as changing a configuration tomorrow morning.

Once those questions are answered, the optimization problem often looks different. Sometimes it becomes smaller. Sometimes it becomes multi-stage. Sometimes the most important decision is not the operational value at all, but whether to invest in expanding the future feasible set.

## Infrastructure is part of the policy

This is especially important when building automated decision systems.

It is tempting to describe a policy only in mathematical terms: given state \(S_t\), choose action \(a_t\). But the production policy is really closer to:

> Given the information available at the permitted decision time, choose an action from the controls exposed by the current organization and technical system.

That is less elegant, but more useful.

The infrastructure determines what state can be observed, what actions can be executed, how quickly a new decision can be deployed, and what happens when something fails. The organization determines who is allowed to change which part of the system. Operations determines the cadence. Engineering determines what is reliable enough to run repeatedly.

Those are part of the policy whether the modeler acknowledges them or not.

## The important tradeoff is often one level down

At senior levels, we talk in categories: inventory policy, forecast strategy, network design, capacity allocation, pricing, replenishment.

The decisions people make every day are often lower-level implementation choices with uncomfortable tradeoffs.

Do we change the horizon from 26 weeks to 30? Do we accept a slightly worse objective because the policy is more stable? Do we use the model with better offline accuracy or the one the production platform can retrain safely? Do we wait for an infrastructure improvement or deploy a constrained heuristic now? Do we lock the decision earlier for operational stability or later for better information?

These are not lesser decisions. They are where much of the economic value is actually won or lost.

A strong decision system therefore needs two models at once: a model of the business and a model of the **decision-making machinery** through which the business can act.

The second one is easy to ignore because it is messy. It contains ownership, timing, APIs, deployment constraints, organizational boundaries, exceptions, and human processes. But that mess is often the difference between a model that looks intelligent and a system that creates value.

The question is not merely, "What should the company decide?"

The more useful question is:

**What decision can this person or system actually make, right now, with the information and controls that really exist?**

That is the decision worth optimizing.
