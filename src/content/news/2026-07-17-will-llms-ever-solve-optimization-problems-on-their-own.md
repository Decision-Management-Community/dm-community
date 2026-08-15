---
title: "Will LLMs ever solve optimization problems on their own?"
date: 2026-07-17
author: "decisionmanagementcommunity"
tags: ["Artificial Intelligence", "Optimization"]
legacyPath: "/2026/07/17/will-llms-ever-solve-optimization-problems-on-their-own/"
---

<p class="wp-block-paragraph">Adam DeJans Jr. answers: &#8220;<em>Eventually, yes. However, I suspect optimization solvers themselves will remain specialized numerical engines for a very long time.</em></p>



<!--more-->



<p class="wp-block-paragraph"><em>An LLM can already generate mathematical formulations. The next step is tool orchestration: write a model, call a solver such as <a href="https://www.linkedin.com/company/gurobi-optimization/" target="_blank" rel="noopener">Gurobi Optimization</a>, analyze the results, revise the formulation, and repeat.</em></p>



<p class="wp-block-paragraph"><em>The solver is not the bottleneck. Solving LPs and MILPs is already highly automated. The difficult part is deciding what should be modeled, which constraints matter, and whether the resulting decisions make economic sense.</em></p>



<p class="wp-block-paragraph"><em>Thus, I do not expect LLMs to replace optimization solvers. I expect them to become users of optimization solvers.</em></p>



<p class="wp-block-paragraph"><em>The interesting question is not whether an LLM can call Gurobi. The interesting question is whether it can recognize that the model itself is wrong even when the solver has proven it &#8216;optimal</em>&#8216;.&#8221; <a href="https://www.linkedin.com/posts/addejans_eventually-yes-however-i-suspect-optimization-share-7483662863988064256-M69Y/?utm_source=share&amp;utm_medium=member_desktop&amp;rcm=ACoAAAAFIMoBtgF6zELsOiwFm0hGYH1dIteE6pQ" target="_blank" rel="noopener">Link</a></p>
