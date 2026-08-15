---
title: "Novel Decision Modeling Techniques (DC2023 Notes Part 2)"
date: 2023-09-24
author: "decisionmanagementcommunity"
tags: ["Constraint Programming", "Decision Intelligence", "Decision Modeling", "Decision Optimization", "DecisionCAMP", "Knowledge Representation", "Reasoning", "Rule Violations"]
legacyPath: "/2023/09/24/novel-decision-modeling-techniques-dc2023-notes-part-2/"
---

<div class="wp-block-image">
<figure class="alignleft size-large is-resized"><a href="/news-media/2023/04/dc2023logo.png"><img data-recalc-dims="1" loading="lazy" decoding="async" width="544" height="175" data-attachment-id="11496" data-permalink="https://dmcommunity.org/2023/04/25/present-at-decisioncamp-2023/dc2023logo/" data-orig-file="/news-media/2023/04/dc2023logo.png" data-orig-size="544,175" data-comments-opened="1" data-image-meta="{&quot;aperture&quot;:&quot;0&quot;,&quot;credit&quot;:&quot;&quot;,&quot;camera&quot;:&quot;&quot;,&quot;caption&quot;:&quot;&quot;,&quot;created_timestamp&quot;:&quot;0&quot;,&quot;copyright&quot;:&quot;&quot;,&quot;focal_length&quot;:&quot;0&quot;,&quot;iso&quot;:&quot;0&quot;,&quot;shutter_speed&quot;:&quot;0&quot;,&quot;title&quot;:&quot;&quot;,&quot;orientation&quot;:&quot;0&quot;}" data-image-title="DC2023Logo" data-image-description="" data-image-caption="" data-large-file="/news-media/2023/04/dc2023logo.png" src="/news-media/2023/04/dc2023logo.png" alt="" class="wp-image-11496" style="width:173px;height:auto" /></a></figure>
</div>


<p class="wp-block-paragraph">There were two presentations at <a rel="noreferrer noopener" href="https://decisioncamp2023.wordpress.com/" target="_blank">DecisionCAMP</a>-2023 devoted to new ideas that&nbsp;<em>extend</em> traditional Decision Modeling and DMN-like tools in new directions: <strong>1) Probabilistic reasoning </strong>when a decision model deals with uncertain facts about which we know only their probability; <strong>2)</strong> <strong>Declarative decision modeling with rules and constraints</strong> defined on yet unknown decision variables. In this post I briefly describe these presentations and recommend you to watch their recordings from the <a rel="noreferrer noopener" href="https://decisioncamp2023.wordpress.com/program/" target="_blank">Program</a>.</p>



<!--more-->



<p class="wp-block-paragraph"><strong>Probabilistic Reasoning</strong>. <a rel="noreferrer noopener" href="https://youtu.be/vqDhfHeF7oo" target="_blank">Simon Vandevelde</a> presented a new probabilistic extension of DMN developed by KU Leuven researchers from Belgium called pDM<a rel="noreferrer noopener" href="https://cdmn.readthedocs.io/en/latest/pdmn.html" target="_blank">N</a>. While DMN-like tools deal only with precise facts, in real life, uncertainties are found almost everywhere, yet, DMN has no native support for probabilities. For example, you may easily see the value of this decision table:</p>



<figure class="wp-block-image size-large is-resized"><a href="/news-media/2023/09/probabilityofrain.png"><img data-recalc-dims="1" loading="lazy" decoding="async" width="480" height="145" data-attachment-id="12080" data-permalink="https://dmcommunity.org/2023/09/24/novel-decision-modeling-techniques-dc2023-notes-part-2/probabilityofrain/" data-orig-file="/news-media/2023/09/probabilityofrain.png" data-orig-size="480,145" data-comments-opened="1" data-image-meta="{&quot;aperture&quot;:&quot;0&quot;,&quot;credit&quot;:&quot;&quot;,&quot;camera&quot;:&quot;&quot;,&quot;caption&quot;:&quot;&quot;,&quot;created_timestamp&quot;:&quot;0&quot;,&quot;copyright&quot;:&quot;&quot;,&quot;focal_length&quot;:&quot;0&quot;,&quot;iso&quot;:&quot;0&quot;,&quot;shutter_speed&quot;:&quot;0&quot;,&quot;title&quot;:&quot;&quot;,&quot;orientation&quot;:&quot;0&quot;}" data-image-title="probabilityofrain" data-image-description="" data-image-caption="" data-large-file="/news-media/2023/09/probabilityofrain.png" src="/news-media/2023/09/probabilityofrain.png" alt="" class="wp-image-12080" style="width:213px;height:auto" /></a></figure>



<p class="wp-block-paragraph"></p>



<p class="wp-block-paragraph">pDMN decision tables may mix &amp; match regular decision variables with those whose values defined with probabilities. Then DMN-like models will be able to produce decisions with estimated probabilities. </p>



<p class="wp-block-paragraph">Simon provided an example of a Covid decision model that calculates infection probability to decide if a person should be allowed to entry a country. The following decision tables define probabilities of a person being infected based on their vaccine&#8217;s type a, b, or n (none): </p>



<figure class="wp-block-image size-large"><a href="/news-media/2023/09/probabilityofbeinginfected-2.png"><img data-recalc-dims="1" loading="lazy" decoding="async" width="562" height="121" data-attachment-id="12088" data-permalink="https://dmcommunity.org/2023/09/24/novel-decision-modeling-techniques-dc2023-notes-part-2/probabilityofbeinginfected-2/" data-orig-file="/news-media/2023/09/probabilityofbeinginfected-2.png" data-orig-size="562,121" data-comments-opened="1" data-image-meta="{&quot;aperture&quot;:&quot;0&quot;,&quot;credit&quot;:&quot;&quot;,&quot;camera&quot;:&quot;&quot;,&quot;caption&quot;:&quot;&quot;,&quot;created_timestamp&quot;:&quot;0&quot;,&quot;copyright&quot;:&quot;&quot;,&quot;focal_length&quot;:&quot;0&quot;,&quot;iso&quot;:&quot;0&quot;,&quot;shutter_speed&quot;:&quot;0&quot;,&quot;title&quot;:&quot;&quot;,&quot;orientation&quot;:&quot;0&quot;}" data-image-title="probabilityofbeinginfected-2" data-image-description="" data-image-caption="" data-large-file="/news-media/2023/09/probabilityofbeinginfected-2.png" src="/news-media/2023/09/probabilityofbeinginfected-2.png" alt="" class="wp-image-12088" /></a></figure>



<p class="wp-block-paragraph"></p>



<p class="wp-block-paragraph">For example, if Ann was infected and Bob contacted Ann, then the decision model can calculate the odds that Bob is infected now too.</p>



<p class="wp-block-paragraph">Internally, pDMN tables are translated to <strong><a rel="noreferrer noopener" href="https://en.wikipedia.org/wiki/ProbLog" target="_blank">ProbLog</a></strong>, a&nbsp;probabilistic logic&nbsp;programming package that extends&nbsp;<a href="https://en.wikipedia.org/wiki/Prolog">Prolog</a>&nbsp;with probabilities. ProbLog was developed also in KU Leuven ~15 years ago. pDMN can be seen as a user-friendly front-end for ProbLog. </p>



<p class="wp-block-paragraph">Adding probabilities to Decision Modeling tools will essentially extend their capabilities in many real-world cases.</p>



<p class="wp-block-paragraph">To be fair, it is not for the first time when probabilities were used within decision tables. At the DecisionCAMP-2014, <a rel="noreferrer noopener" href="http://www.decision-camp.com/2014---mark-proctor.html" target="_blank">Mark Proctor</a> explained how business rule conflicts could be addressed using the Defeasible Logic implemented within the Red Hat Drools. At the BBC-2014 I presented a similar <a rel="noreferrer noopener" href="https://openrules.com/pdf/BRForum2014.JacobFeldman.pdf" target="_blank">OpenRules approach</a> but more oriented to business analysts. Here is an example of a decision table with probabilities: </p>



<figure class="wp-block-image size-large"><a href="/news-media/2023/09/probabilityofbirdsflying.png"><img data-recalc-dims="1" loading="lazy" decoding="async" width="601" height="198" data-attachment-id="12096" data-permalink="https://dmcommunity.org/2023/09/24/novel-decision-modeling-techniques-dc2023-notes-part-2/probabilityofbirdsflying/" data-orig-file="/news-media/2023/09/probabilityofbirdsflying.png" data-orig-size="601,198" data-comments-opened="1" data-image-meta="{&quot;aperture&quot;:&quot;0&quot;,&quot;credit&quot;:&quot;&quot;,&quot;camera&quot;:&quot;&quot;,&quot;caption&quot;:&quot;&quot;,&quot;created_timestamp&quot;:&quot;0&quot;,&quot;copyright&quot;:&quot;&quot;,&quot;focal_length&quot;:&quot;0&quot;,&quot;iso&quot;:&quot;0&quot;,&quot;shutter_speed&quot;:&quot;0&quot;,&quot;title&quot;:&quot;&quot;,&quot;orientation&quot;:&quot;0&quot;}" data-image-title="probabilityofbirdsflying" data-image-description="" data-image-caption="" data-large-file="/news-media/2023/09/probabilityofbirdsflying.png" src="/news-media/2023/09/probabilityofbirdsflying.png" alt="" class="wp-image-12096" /></a></figure>



<p class="wp-block-paragraph"></p>



<p class="wp-block-paragraph">If interested, you may find more information about Drools and OpenRules implementations of defeasible logic <a rel="noreferrer noopener" href="https://openrules.blog/2013/08/14/solving-rule-conflicts-part-2/" target="_blank">here</a>.</p>



<p class="wp-block-paragraph"><strong>Declarative Decision Modeling with Rules and Constraints</strong>. On Sep 19 I presented a new approach that supports declarative decision modeling by integrating rule engines and constraint solvers within the same decision models. It allows business analysts to create a decision model using DMN-like decision tables (“WHAT”) and rely on predefined search strategies to come up with the proper decisions (“HOW”). </p>



<p class="wp-block-paragraph">The main idea of the proposed approach is to introduce new types of decision table columns that define constrained variables and their relationships. It allows a user to mix and match business rules with technical constraints within the <span style="text-decoration: underline">same</span> decision tables. This approach has been implemented in a new OpenRules <a rel="noreferrer noopener" href="http://RuleSolver.com" target="_blank">Rule Solver</a>. Here is simple example of a decision table with a business condition and a solver action:</p>



<figure class="wp-block-image size-large"><a href="/news-media/2023/09/rulesolver1.png"><img data-recalc-dims="1" loading="lazy" decoding="async" width="640" height="169" data-attachment-id="12100" data-permalink="https://dmcommunity.org/2023/09/24/novel-decision-modeling-techniques-dc2023-notes-part-2/rulesolver1/" data-orig-file="/news-media/2023/09/rulesolver1.png" data-orig-size="734,194" data-comments-opened="1" data-image-meta="{&quot;aperture&quot;:&quot;0&quot;,&quot;credit&quot;:&quot;&quot;,&quot;camera&quot;:&quot;&quot;,&quot;caption&quot;:&quot;&quot;,&quot;created_timestamp&quot;:&quot;0&quot;,&quot;copyright&quot;:&quot;&quot;,&quot;focal_length&quot;:&quot;0&quot;,&quot;iso&quot;:&quot;0&quot;,&quot;shutter_speed&quot;:&quot;0&quot;,&quot;title&quot;:&quot;&quot;,&quot;orientation&quot;:&quot;0&quot;}" data-image-title="rulesolver1" data-image-description="" data-image-caption="" data-large-file="/news-media/2023/09/rulesolver1.png" src="/news-media/2023/09/rulesolver1.png" alt="" class="wp-image-12100" /></a></figure>



<p class="wp-block-paragraph">Rule Solver extends DMN-like decision tables with predefined actions on collections such as &#8220;All Different&#8221; and predefined search methods. He is a complete simple decision model (with results) for the Map Coloring problem:</p>



<figure class="wp-block-image size-large"><a href="/news-media/2023/09/rulesolver2.png"><img data-recalc-dims="1" loading="lazy" decoding="async" width="640" height="494" data-attachment-id="12102" data-permalink="https://dmcommunity.org/2023/09/24/novel-decision-modeling-techniques-dc2023-notes-part-2/rulesolver2/" data-orig-file="/news-media/2023/09/rulesolver2.png" data-orig-size="908,701" data-comments-opened="1" data-image-meta="{&quot;aperture&quot;:&quot;0&quot;,&quot;credit&quot;:&quot;&quot;,&quot;camera&quot;:&quot;&quot;,&quot;caption&quot;:&quot;&quot;,&quot;created_timestamp&quot;:&quot;0&quot;,&quot;copyright&quot;:&quot;&quot;,&quot;focal_length&quot;:&quot;0&quot;,&quot;iso&quot;:&quot;0&quot;,&quot;shutter_speed&quot;:&quot;0&quot;,&quot;title&quot;:&quot;&quot;,&quot;orientation&quot;:&quot;0&quot;}" data-image-title="rulesolver2" data-image-description="" data-image-caption="" data-large-file="/news-media/2023/09/rulesolver2.png" src="/news-media/2023/09/rulesolver2.png" alt="" class="wp-image-12102" /></a></figure>



<p class="wp-block-paragraph">I used well-known decision modeling challenges to compare this new declarative approach to traditional procedural decision modeling. You may watch my entire presentation <a rel="noreferrer noopener" href="https://youtu.be/8u6B7PW1rxA" target="_blank">here</a> and download open-sourced <a rel="noreferrer noopener" href="http://RuleSolver.com" target="_blank">http://RuleSolver.com</a> with many complete declarative decision models.</p>
