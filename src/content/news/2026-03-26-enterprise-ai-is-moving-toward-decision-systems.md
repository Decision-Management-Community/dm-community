---
title: "Enterprise AI is moving toward Decision Systems"
date: 2026-03-26
author: "decisionmanagementcommunity"
tags: ["Architecture", "Decision Modeling", "Decision Optimization", "Decision Tracing", "Uncertainty"]
legacyPath: "/2026/03/26/enterprise-ai-is-moving-toward-decision-systems/"
---

<p class="wp-block-paragraph">Adam DeJans Jr <a href="https://www.linkedin.com/feed/update/urn:li:activity:7436931681955196928/?utm_source=share&amp;utm_medium=member_desktop&amp;rcm=ACoAAAAFIMoBtgF6zELsOiwFm0hGYH1dIteE6pQ" target="_blank" rel="noreferrer noopener">describes</a> how to think about decision systems through the lens of sequential decision problems. &#8220;<em>Most operational environments are not one-time optimization problems. They are ongoing processes where decisions must be made repeatedly as the state of the world evolves.</em></p>



<p class="wp-block-paragraph"><em>Consider a transportation network. At any given moment, there is a current state of the system: trucks are located in different regions, orders are arriving, drivers have hours-of-service constraints, weather conditions are changing, and new information is constantly entering the system. Any decision we make (dispatching a truck, accepting a load, repositioning inventory) changes that state and affects the options available in the future.</em> <em>From a technical perspective, these systems usually revolve around a few core components.</em>&#8221; <a href="https://www.linkedin.com/feed/update/urn:li:activity:7436931681955196928/?utm_source=share&amp;utm_medium=member_desktop&amp;rcm=ACoAAAAFIMoBtgF6zELsOiwFm0hGYH1dIteE6pQ" target="_blank" rel="noreferrer noopener">Link</a></p>



<!--more-->



<p class="wp-block-paragraph"><em><strong>First is the state representation</strong>. This is the structured description of the operational world at a given moment. It might include the location of resources, current commitments, outstanding demand, capacity limits, and other constraints that define what actions are feasible.</em></p>



<p class="wp-block-paragraph"><em><strong>Second is the decision policy.</strong> This is the mechanism used to determine the next action. In practice this might involve mathematical optimization, heuristics, simulation models, reinforcement learning policies, or some hybrid of these approaches. The key point is that the policy maps the current state of the system to a decision.</em></p>



<p class="wp-block-paragraph"><em><strong>Third is the state transition</strong>. Once a decision is executed, the system evolves. Trucks move, orders are fulfilled, inventory levels change, and new external information arrives. The next decision must then be made based on this updated state</em>.</p>



<p class="wp-block-paragraph"><em>What makes real-world decision systems challenging is that <strong>this loop operates continuously under uncertainty</strong>. Demand forecasts are imperfect. Travel times fluctuate. Equipment fails. Competitors react. The system must adapt as new information arrives.</em></p>
