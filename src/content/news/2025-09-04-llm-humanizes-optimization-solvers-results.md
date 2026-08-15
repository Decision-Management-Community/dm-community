---
title: "LLM humanizes Optimization Solver’s results"
date: 2025-09-04
author: "decisionmanagementcommunity"
tags: ["LLM", "Optimization"]
legacyPath: "/2025/09/04/llm-humanizes-optimization-solvers-results/"
---

<p class="wp-block-paragraph"><a href="https://www.linkedin.com/in/tiago-montanher-phd-cap?miniProfileUrn=urn%3Ali%3Afsd_profile%3AACoAAAUhTFIBty2821hQo_jc0_EpeQZio3eXpd4&amp;lipi=urn%3Ali%3Apage%3Ad_flagship3_detail_base%3BGjO%2BO51fQ4SYsXiwxtH2QA%3D%3D" target="_blank" rel="noreferrer noopener">Tiago de Morais Montanher</a> altered the data for the classic transportation problem to render the problem infeasible. Then he called the conflict refiner from CPLEX to obtain a list with 5 points like the one below:<br><br>_TConflictConstraint(name=&#8217;capacity_seattle&#8217;, element=docplex.mp.LinearConstraint[capacity_seattle](quantity_seattle_new_york+quantity_seattle_chicago+quantity_seattle_topeka,LE,350), status=&lt;ConflictStatus.Member: 3&gt;)<br><br>Finally, he asked Perplexity to clarify these conflicts for decision-makers and propose actions to rectify the formulation. The results were impressive: <a href="https://www.linkedin.com/posts/tiago-montanher-phd-cap_inspired-by-a-post-from-adam-dejans-jr-on-activity-7368407112147701761-BIy6?utm_source=share&amp;utm_medium=member_desktop&amp;rcm=ACoAAAAFIMoBtgF6zELsOiwFm0hGYH1dIteE6pQ" target="_blank" rel="noreferrer noopener">Link</a>. Also see Adam DeJons&#8217;s <a href="https://www.linkedin.com/feed/update/urn:li:activity:7368611597306449920/" target="_blank" rel="noreferrer noopener">post</a></p>



<!--more-->



<p class="wp-block-paragraph">&#8220;The plan cannot be implemented because the locations (Seattle and San Diego) cannot collectively provide enough goods to satisfy all the quantity needs at the destinations (New York, Chicago, Topeka) given the declared supply and demand requirements. This is reflected in the conflicting constraints identified by CPLEX.<br>Actions to Make the Plan Feasible<br>To resolve the issue, consider one or more of the following actions:<br>Increase Supply: Raise the capacities at Seattle and/or San Diego so the total meets or exceeds the demand (at least 900 units total).<br>Decrease Demand: Lower the requirement at one or more destinations so the total demand does not exceed available supply.<br>Add Additional Sources: Introduce another supply point to increase total available quantity.&#8221;<br><br>This integration showcases how the integration between MILP solvers with LLMs can enhance decision-making explainability.</p>
