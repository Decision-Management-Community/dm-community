---
title: "Decision analytics: What is AI?"
date: 2020-07-25
author: "decisionmanagementcommunity"
tags: ["Artificial Intelligence", "Decision Making", "Decision Optimization", "Machine Learning"]
legacyPath: "/2020/07/25/decision-analytics-what-is-ai/"
---

<p class="wp-block-paragraph">Prof. Warren B Powell from Princeton University: &#8220;<em>The most common types of AI come in three flavors: rules, machine learning, and making decisions (“optimization”). Rules are used for guiding computers to identify patterns or make recommendations, and have to be designed by people. This is how AI was done in the 1970’s. Learning involves using an external dataset to fit a statistical model</em>.&#8221; <a href="https://castlelab.princeton.edu/what-is-ai/" target="_blank" rel="noopener">Link</a><!--more-->There are three approaches computers can use to exhibit intelligence:</p>



<p class="wp-block-paragraph">1) <strong>Rule-based logic</strong> – This was the original form of “artificial intelligence” in the 1960’s and 70’s, but it is still used today. “If furniture has four legs and a seat, it is a chair” or “if the credit score is over 600, grant the loan” are simple examples. In a health context, the attributes of a patient are more complicated (“if patient is male, and if a smoker, and if over 50, and if … and if … then order treatment X”). If the input data (for the “if” statements) has more than three or four dimensions, the rule becomes quickly intractable. This is the reason that “rule-based AI” failed, but we note that simple business rules remain widely used today in virtually all systems.</p>
<p>2) <strong>Making estimates using data from the environment</strong> – This is the domain of machine learning, also known as statistics, statistical learning and, more broadly, data sciences. It helps to divide this into two broad classes:</p>
<ul>
<li>Supervised learning – This is the domain of “big data” where a large training dataset consisting of input-response (such as, faces with names – the machine learning community refers to the “response” as labels) is used to train a machine learning model.</li>
<li>Unsupervised learning – Here we cluster input data (such as attributes of patients or customers) but without access to labels/responses.</li>
</ul>
<p>3) <strong>Making decisions that interact with the environment</strong> – Decisions involve a controllable quantity, and a metric that evaluates the performance of the decision. These arise in both static and sequential settings. Algorithmic strategies for making decisions are quite rich, but for this discussion it is useful to identify the following classes of methods:</p>
<ul>
<li>Rule-based logic – We can use rules to make decisions, such as “if a patient has these symptoms, then apply this treatment.”</li>
<li>Deterministic optimization – Powerful solvers for high-dimensional problems known as linear programs (where quantities can be continuous) emerged in the 1990s, followed by breakthroughs for integer programs ~2000. These are widely used in static planning problems such as airline scheduling.</li>
<li>Reinforcement learning – These methods emerged in the 1980’s in the context of describing how a mouse finds its way out of a maze, and was ultimately applied to the Chinese game of Go. It has been primarily applied to “single entity” problems such as controlling robots, playing games, or guiding a physician, as opposed to more complex resource allocation problems.</li>
<li>Stochastic optimization – This is an umbrella term for a wide range of modeling and algorithmic strategies for solving decision problems in the presence of uncertainty. The problem domain is so rich it has been studied by over 15 distinct research communities, spanning problems from optimal stopping to high-dimensional resource allocation problems. Recently, we have pulled these together into a single, unified framework that draws on the tools of deterministic optimization, machine learning and simulation.</li>
</ul>
