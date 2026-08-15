---
title: "Decision Modeling by Adam DeJans Jr."
date: 2026-03-04
author: "decisionmanagementcommunity"
tags: ["Decision Modeling", "Decision Optimization"]
legacyPath: "/2026/03/04/decision-modeling-by-adam-dejans-jr/"
---

<p class="wp-block-paragraph"><a href="https://www.linkedin.com/in/addejans/">Adam DeJans Jr</a>. describes the technical approach he uses, regardless of whether the tool is for optimization, ML, simulation, or even a rules engine:  <a href="https://www.linkedin.com/posts/aaron-lockhart-288487237_the-hardest-part-of-solving-a-problem-is-activity-7434647707945705473-4m_2?utm_source=share&amp;utm_medium=member_desktop&amp;rcm=ACoAAAAFIMoBtgF6zELsOiwFm0hGYH1dIteE6pQ" target="_blank" rel="noreferrer noopener">Link</a> </p>



<!--more-->



<p class="wp-block-paragraph">&#8220;<em>I start by modeling the decision, not the outcome.<br><br>That means explicitly writing down:<br>what is chosen, when it is chosen, what information is available at that moment, and what can be revised later. If you can’t answer those four questions cleanly, no amount of math will save you. Many systems silently assume perfect information and one-shot decisions, which is almost never true.<br><br>Next, I separate constraints into three classes: physical, policy, and preference.<br><br>Physical constraints are inviolable. Policy constraints are negotiable. Preferences are directional, not absolute. Most failures come from collapsing all three into hard constraints. The moment uncertainty hits, the system snaps. Introducing slack, penalties, and priority ordering is not “watering down” the model, it is acknowledging how decisions are actually made.<br><br>Then I intentionally stress the formulation.<br><br>I perturb inputs, loosen bounds, shift weights, and rerun. I’m not looking for a better answer; I’m looking for stability. If small changes in assumptions cause large swings in decisions, the formulation is overfit to a fictional world. A technically sound system should fail softly and predictably.<br><br>After that, I tune tolerances to meaning, not precision.<br><br>Numerical exactness is rarely the objective. What matters is whether two solutions are operationally different. If a system reacts violently to microunits, rounding, or noise, the issue is a mismatch between the mathematical surface and the business reality.<br><br>Finally, I design for iteration.<br><br>Any system that pretends it will be “right” the first time is already wrong. Decisions are revised, data improves, and incentives shift. The goal here is controllability over time. Systems that can be nudged outperform systems that demand obedience.<br><br>This approach applies whether you’re planning inventory, pricing products, allocating budgets, staffing teams, or tuning an ML pipeline.<br><br>The math matters. The algorithms matter.<br><br>But <strong>the dominant technical skill is learning how to build systems that survive contact with reality</strong>.<br><br>Welcome to engineering</em>.&#8221;</p>



<p class="wp-block-paragraph"></p>
