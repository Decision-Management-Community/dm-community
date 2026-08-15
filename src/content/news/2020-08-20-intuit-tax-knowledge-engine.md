---
title: "Intuit Tax Knowledge Engine"
date: 2020-08-20
author: "decisionmanagementcommunity"
tags: ["Artificial Intelligence", "Business Rules", "Explanations", "Human-Machine Interaction", "Knowledge Representation", "Logic and AI"]
legacyPath: "/2020/08/20/intuit-tax-knowledge-engine/"
---

<p><a href="/news-media/2020/08/taxknowledgeengine.png"><img data-recalc-dims="1" loading="lazy" decoding="async" data-attachment-id="8430" data-permalink="https://dmcommunity.org/2020/08/20/intuit-tax-knowledge-engine/taxknowledgeengine/" data-orig-file="/news-media/2020/08/taxknowledgeengine.png" data-orig-size="585,293" data-comments-opened="1" data-image-meta="{&quot;aperture&quot;:&quot;0&quot;,&quot;credit&quot;:&quot;&quot;,&quot;camera&quot;:&quot;&quot;,&quot;caption&quot;:&quot;&quot;,&quot;created_timestamp&quot;:&quot;0&quot;,&quot;copyright&quot;:&quot;&quot;,&quot;focal_length&quot;:&quot;0&quot;,&quot;iso&quot;:&quot;0&quot;,&quot;shutter_speed&quot;:&quot;0&quot;,&quot;title&quot;:&quot;&quot;,&quot;orientation&quot;:&quot;0&quot;}" data-image-title="TaxKnowledgeEngine" data-image-description="" data-image-caption="" data-large-file="/news-media/2020/08/taxknowledgeengine.png" class="alignleft size-thumbnail wp-image-8430" src="/news-media/2020/08/taxknowledgeengine.png" alt="" width="150" height="75" /></a>Intuit just published a technical overview of their new <a href="https://www.intuit.com/blog/technology/intuit-tax-knowledge-engine-practical-ai-for-a-smarter-and-more-personalized-turbotax/" target="_blank" rel="noopener">Tax Knowledge Engine</a>, the key innovation to make TurboTax smarter and more personalized for 37M+ consumers. First they listed key limitations for the traditional approach that are common for many rules-based systems. Then they describe a <b><i>fundamental paradigm shift </i></b>in representing complicated tax compliance calculations and rules at scale via <b><i>knowledge graphs</i></b> and connect associated user data together, instead of hard-coding tax logic in procedural programming code. <a href="https://www.intuit.com/blog/technology/intuit-tax-knowledge-engine-practical-ai-for-a-smarter-and-more-personalized-turbotax/" target="_blank" rel="noopener">Link</a> <!--more--> The key limitations for the traditional approach:</p>
<ul>
<li style="list-style-type:none;">
<ul>
<li>Procedural programming – done by <b>programmers </b>who rely on tax domain experts for the logic spec.</li>
<li>Tops-down sequential execution – have to <b>re-calculate the entire return </b>even with a single input change.</li>
<li>All inputs required for complete calc – need to <b>collect all information upfront.</b></li>
<li>Implicit explainability hidden in code – <b>cost prohibitive to explain</b> calc logic explicitly for each customer.</li>
</ul>
</li>
</ul>
<p>The key innovation of the Tax Knowledge Engine is to capture expert knowledge on tax domain into the following two knowledge graphs:</p>
<ul>
<li><b>Calc Graph</b>: a comprehensive graph with tens of thousands calculation statements represented as interconnected calc modules, with each as a calc function node connecting input and output data nodes together.</li>
<li><b>Completeness Graph</b>: a special type of graph to represent complicated decision tree logic to determine applicability of specific tax topics, such as eligibility of earned income credit, based on user data.</li>
</ul>
<p><a href="/news-media/2020/08/taxknowledgeengine.png"><img data-recalc-dims="1" loading="lazy" decoding="async" data-attachment-id="8430" data-permalink="https://dmcommunity.org/2020/08/20/intuit-tax-knowledge-engine/taxknowledgeengine/" data-orig-file="/news-media/2020/08/taxknowledgeengine.png" data-orig-size="585,293" data-comments-opened="1" data-image-meta="{&quot;aperture&quot;:&quot;0&quot;,&quot;credit&quot;:&quot;&quot;,&quot;camera&quot;:&quot;&quot;,&quot;caption&quot;:&quot;&quot;,&quot;created_timestamp&quot;:&quot;0&quot;,&quot;copyright&quot;:&quot;&quot;,&quot;focal_length&quot;:&quot;0&quot;,&quot;iso&quot;:&quot;0&quot;,&quot;shutter_speed&quot;:&quot;0&quot;,&quot;title&quot;:&quot;&quot;,&quot;orientation&quot;:&quot;0&quot;}" data-image-title="TaxKnowledgeEngine" data-image-description="" data-image-caption="" data-large-file="/news-media/2020/08/taxknowledgeengine.png" class="aligncenter wp-image-8430 size-full" src="/news-media/2020/08/taxknowledgeengine.png" alt="" width="585" height="293" /></a></p>
