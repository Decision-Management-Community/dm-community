---
title: "From Knowledge Sources to Executable Decision Models (DC2023 Notes Part 1)"
date: 2023-09-22
author: "jacobfeldman"
tags: ["Artificial Intelligence", "ChatGPT", "CI/CD", "Decision Intelligence", "Decision Modeling", "Decision Models", "DecisionCAMP"]
legacyPath: "/2023/09/22/from-knowledge-sources-to-executable-decision-models-dc2023-notes-part-1/"
---

<div class="wp-block-image">
<figure class="alignleft size-large is-resized"><a href="/news-media/2023/04/dc2023logo.png"><img data-recalc-dims="1" loading="lazy" decoding="async" width="544" height="175" data-attachment-id="11496" data-permalink="https://dmcommunity.org/2023/04/25/present-at-decisioncamp-2023/dc2023logo/" data-orig-file="/news-media/2023/04/dc2023logo.png" data-orig-size="544,175" data-comments-opened="1" data-image-meta="{&quot;aperture&quot;:&quot;0&quot;,&quot;credit&quot;:&quot;&quot;,&quot;camera&quot;:&quot;&quot;,&quot;caption&quot;:&quot;&quot;,&quot;created_timestamp&quot;:&quot;0&quot;,&quot;copyright&quot;:&quot;&quot;,&quot;focal_length&quot;:&quot;0&quot;,&quot;iso&quot;:&quot;0&quot;,&quot;shutter_speed&quot;:&quot;0&quot;,&quot;title&quot;:&quot;&quot;,&quot;orientation&quot;:&quot;0&quot;}" data-image-title="DC2023Logo" data-image-description="" data-image-caption="" data-large-file="/news-media/2023/04/dc2023logo.png" src="/news-media/2023/04/dc2023logo.png" alt="" class="wp-image-11496" style="width:173px;height:auto" /></a></figure>
</div>


<p class="wp-block-paragraph">Considering the current explosive nature of Generative AI, it was only natural to expect that words such as LLMs, ChatGPT, OpenAI will be dominant at <a rel="noreferrer noopener" href="https://decisioncamp2023.wordpress.com/" target="_blank">DecisionCAMP</a>-2023 as well. In the world of Decision Modeling, it means that these new GenAI tools can be used to automate the less automated process of auto-generation of business rules and test cases from various knowledge sources. In this post I will briefly describe only the related presentations and discussions.</p>



<!--more-->



<p class="wp-block-paragraph">If we follow an intentionally simplified definition of DMN as “3 shapes and two lines” offered by <a href="https://decisioncamp2023.files.wordpress.com/2023/09/decisioncamp2023.jamestaylor-1.pdf">James Taylor</a>, we may present the decision modeling and execution process as in the following picture:</p>



<figure class="wp-block-image size-large"><a href="/news-media/2023/09/dc2023notes1-1.png"><img data-recalc-dims="1" loading="lazy" decoding="async" width="640" height="146" data-attachment-id="12049" data-permalink="https://dmcommunity.org/2023/09/22/from-knowledge-sources-to-executable-decision-models-dc2023-notes-part-1/dc2023notes1-1/" data-orig-file="/news-media/2023/09/dc2023notes1-1.png" data-orig-size="752,171" data-comments-opened="1" data-image-meta="{&quot;aperture&quot;:&quot;0&quot;,&quot;credit&quot;:&quot;&quot;,&quot;camera&quot;:&quot;&quot;,&quot;caption&quot;:&quot;&quot;,&quot;created_timestamp&quot;:&quot;0&quot;,&quot;copyright&quot;:&quot;&quot;,&quot;focal_length&quot;:&quot;0&quot;,&quot;iso&quot;:&quot;0&quot;,&quot;shutter_speed&quot;:&quot;0&quot;,&quot;title&quot;:&quot;&quot;,&quot;orientation&quot;:&quot;0&quot;}" data-image-title="dc2023notes1-1" data-image-description="" data-image-caption="" data-large-file="/news-media/2023/09/dc2023notes1-1.png" src="/news-media/2023/09/dc2023notes1-1.png" alt="" class="wp-image-12049" /></a></figure>



<p class="wp-block-paragraph"></p>



<p class="wp-block-paragraph">While the second line from “Business Rules” to “Decisions” is well-automated by different BR&amp;DM tools, many presentations with GenAI in mind concentrated on the first line from “Knowledge Sources” to “Business Rules and Test Cases”. To talk about these presentations and related discussion, let’s expand the above simplified schema with more details:</p>



<figure class="wp-block-image size-large"><a href="/news-media/2023/09/dc2023notes1-2.png"><img data-recalc-dims="1" loading="lazy" decoding="async" width="640" height="296" data-attachment-id="12052" data-permalink="https://dmcommunity.org/2023/09/22/from-knowledge-sources-to-executable-decision-models-dc2023-notes-part-1/dc2023notes1-2/" data-orig-file="/news-media/2023/09/dc2023notes1-2.png" data-orig-size="753,348" data-comments-opened="1" data-image-meta="{&quot;aperture&quot;:&quot;0&quot;,&quot;credit&quot;:&quot;&quot;,&quot;camera&quot;:&quot;&quot;,&quot;caption&quot;:&quot;&quot;,&quot;created_timestamp&quot;:&quot;0&quot;,&quot;copyright&quot;:&quot;&quot;,&quot;focal_length&quot;:&quot;0&quot;,&quot;iso&quot;:&quot;0&quot;,&quot;shutter_speed&quot;:&quot;0&quot;,&quot;title&quot;:&quot;&quot;,&quot;orientation&quot;:&quot;0&quot;}" data-image-title="dc2023notes1-2" data-image-description="" data-image-caption="" data-large-file="/news-media/2023/09/dc2023notes1-2.png" src="/news-media/2023/09/dc2023notes1-2.png" alt="" class="wp-image-12052" /></a></figure>



<p class="wp-block-paragraph"></p>



<p class="wp-block-paragraph">We split Knowledge Sources into 3 types:</p>



<ul class="wp-block-list">
<li><span style="text-decoration: underline">Expert Knowledge</span> in minds of subject matter experts (SMEs)</li>



<li><span style="text-decoration: underline">Historical Data</span> available from Excel or CSV files, and from databases</li>



<li><span style="text-decoration: underline">PDF/Word/Excel Documents</span> and <span style="text-decoration: underline">Human Prompts</span>.</li>
</ul>



<p class="wp-block-paragraph"><strong>Expert Knowledge.</strong> Until recently, the creation of Rules Repositories remained mainly a prerogative of humans (usually subject matter experts). Different <a rel="noreferrer noopener" href="https://dmcommunity.org/tools/" target="_blank">DMN-like tools</a> offer great graphical interfaces to assist SMEs in the creation of rules, tests, and testing/debugging decision models, with the consecutive deployment of them on cloud or on premises. This is the area where <a rel="noreferrer noopener" href="https://www.brcommunity.com/" target="_blank">Rules</a> and <a href="//DMCommunity.org" target="_blank" rel="noreferrer noopener">Decision Management Communities</a> spent the last 20 years producing good practical results.</p>



<p class="wp-block-paragraph"><strong>Historical Data.</strong> Different Machine Learning (ML) methods and tools are being used to discover business rules from historical data and to automatically generate rules in executable formats. <a href="https://www.youtube.com/watch?v=kikWPnoKmUw">Guilhem Molines</a> presentation was devoted to this topic with a nice demo that utilized <a href="https://slideslive.com/38975489/aimee-interactive-model-maintenance-with-rulebased-surrogates?ref=recommended">AIMEE (AI Model Explorer and Editor tool)</a>. &nbsp;During the discussions, people mentioned similar tools and approaches from FICO, OpenRules, Sparkling Logic, and others. <a href="https://youtu.be/z85S-l9nEAI">James Taylor</a> described how DMN helps to migrate from frequently failed stand-alone Machine Learning projects by using the above schema and starting with Decisions.</p>



<p class="wp-block-paragraph"><strong>PDF, Word, Excel Documents and Human Prompts.</strong> After GenAI tools such as ChatGPT were introduced in Nov-2022, it became possible to use natural language documents to generate business rules in DMN or JSON formats and/or even the corresponding executable code in Python/Java. First, <a href="https://youtu.be/edYI-DUba6M">Gary Hallmark</a> did a demo that generated an executable decision model for the well-known Loan Approval problem described in the DMN Chapter 11. To avoid limitations of the current versions of GenAI tools such as ChatGPT-4, Gary actively used <strong>human prompts</strong>. Gary managed to generate a working decision model and pointed to problems he faced doing it. Gary brought important questions to be discussed:</p>



<figure class="wp-block-image size-large"><a href="/news-media/2023/09/dc2023notes1-3.png"><img data-recalc-dims="1" loading="lazy" decoding="async" width="488" height="98" data-attachment-id="12054" data-permalink="https://dmcommunity.org/2023/09/22/from-knowledge-sources-to-executable-decision-models-dc2023-notes-part-1/dc2023notes1-3/" data-orig-file="/news-media/2023/09/dc2023notes1-3.png" data-orig-size="488,98" data-comments-opened="1" data-image-meta="{&quot;aperture&quot;:&quot;0&quot;,&quot;credit&quot;:&quot;&quot;,&quot;camera&quot;:&quot;&quot;,&quot;caption&quot;:&quot;&quot;,&quot;created_timestamp&quot;:&quot;0&quot;,&quot;copyright&quot;:&quot;&quot;,&quot;focal_length&quot;:&quot;0&quot;,&quot;iso&quot;:&quot;0&quot;,&quot;shutter_speed&quot;:&quot;0&quot;,&quot;title&quot;:&quot;&quot;,&quot;orientation&quot;:&quot;0&quot;}" data-image-title="dc2023notes1-3" data-image-description="" data-image-caption="" data-large-file="/news-media/2023/09/dc2023notes1-3.png" src="/news-media/2023/09/dc2023notes1-3.png" alt="" class="wp-image-12054" /></a></figure>



<p class="wp-block-paragraph"></p>



<p class="wp-block-paragraph">Then <a href="https://youtu.be/gCRLLJ40Jic">Denis Gagne</a> provided an interesting classification of Symbolic and Sub-Symbolic AI approaches:</p>



<figure class="wp-block-image size-large"><a href="/news-media/2023/09/dc2023notes1-4.png"><img data-recalc-dims="1" loading="lazy" decoding="async" width="640" height="186" data-attachment-id="12056" data-permalink="https://dmcommunity.org/2023/09/22/from-knowledge-sources-to-executable-decision-models-dc2023-notes-part-1/dc2023notes1-4/" data-orig-file="/news-media/2023/09/dc2023notes1-4.png" data-orig-size="722,210" data-comments-opened="1" data-image-meta="{&quot;aperture&quot;:&quot;0&quot;,&quot;credit&quot;:&quot;&quot;,&quot;camera&quot;:&quot;&quot;,&quot;caption&quot;:&quot;&quot;,&quot;created_timestamp&quot;:&quot;0&quot;,&quot;copyright&quot;:&quot;&quot;,&quot;focal_length&quot;:&quot;0&quot;,&quot;iso&quot;:&quot;0&quot;,&quot;shutter_speed&quot;:&quot;0&quot;,&quot;title&quot;:&quot;&quot;,&quot;orientation&quot;:&quot;0&quot;}" data-image-title="dc2023notes1-4" data-image-description="" data-image-caption="" data-large-file="/news-media/2023/09/dc2023notes1-4.png" src="/news-media/2023/09/dc2023notes1-4.png" alt="" class="wp-image-12056" /></a></figure>



<p class="wp-block-paragraph"></p>



<p class="wp-block-paragraph">He also demonstrated the integrated use of ChatGPT and <strong>Prompt Engineering</strong> within Trisotech decision modeling framework showing how to use PDF-based knowledge sources. Later, <a href="https://youtu.be/4-CEkLttOjA">Tom DeBevoise and Denis</a> did a very interesting live demonstration of how they used GenAI for automatic analysis of regulatory PDF documents to extract elements of the business glossary and use them in business rules. They had shown that such knowledge sources may become an essential part of decision models included in the version control system and how they plan to utilize upcoming GenAI capabilities.</p>



<p class="wp-block-paragraph"><a href="https://www.youtube.com/watch?v=1H_KlSdZXPU">Jan Vanthienen&nbsp;and Alexandre Goossens</a>&nbsp;from<strong> </strong>KU Leuven concentrated on questions:&nbsp;</p>



<ul class="wp-block-list">
<li>Can GPT build Decision Models from text?</li>



<li>Can GPT build Decision Requirements Diagrams (DRDs)?</li>



<li>Can GPT build Decision Logic Tables (DTs)?</li>



<li>Can GPT make decisions and provide explainability to decisions?</li>
</ul>



<p class="wp-block-paragraph">Their answers were only partially optimistic and you may find more information in their <a href="https://decisioncamp2023.files.wordpress.com/2023/09/ruleml.gptfordecisionlogic.pdf">RuleML paper</a>.</p>



<p class="wp-block-paragraph">During the <a href="https://youtu.be/2EEPAyLrnP0">Q&amp;A Session</a> on Sep 18 we discussed all these questions plus</p>



<ul class="wp-block-list">
<li><strong>What does represent the source code now?</strong></li>



<li>Should PDF documents and human prompts be included in the source code and saved in GitHub?</li>



<li>Can decision model learn from its own decisions? (see the yellow arrow from “Decisions” to “Knowledge Sources” on the above schema)</li>
</ul>



<p class="wp-block-paragraph">I also <a href="https://youtu.be/2EEPAyLrnP0" target="_blank" rel="noreferrer noopener">pointed out</a> that our Decision Management Community is better positioned to produce practical results from GenAI technology because we concentrate on very specific problems in different vertical domains such as Health Care or Financial services. We may utilize the Natural Language processors coming from Large Language Models (<strong>LLM</strong>s) but at the same time we may produce domain-specific Small Language Models (<strong>SLM</strong>s) based on trusted sets of documents and predefined concepts and their relationships. &nbsp;</p>



<p class="wp-block-paragraph">There were two presentations about foundational concepts such as a rule, a decision, and a process in the modern AI-Sceptic and/or AI-Optimistic world. <a href="https://youtu.be/e_1oUd_doFs">Alan Fish</a> talked about Human Values and the business intervention model. <a href="https://youtu.be/iRdWQtcgVjQ">Ron Ross</a> presented his “anatomy” of a rule:</p>


<div class="wp-block-image">
<figure class="aligncenter size-large is-resized"><a href="/news-media/2023/09/dc2023notes1-5.png"><img data-recalc-dims="1" loading="lazy" decoding="async" width="564" height="364" data-attachment-id="12058" data-permalink="https://dmcommunity.org/2023/09/22/from-knowledge-sources-to-executable-decision-models-dc2023-notes-part-1/dc2023notes1-5/" data-orig-file="/news-media/2023/09/dc2023notes1-5.png" data-orig-size="564,364" data-comments-opened="1" data-image-meta="{&quot;aperture&quot;:&quot;0&quot;,&quot;credit&quot;:&quot;&quot;,&quot;camera&quot;:&quot;&quot;,&quot;caption&quot;:&quot;&quot;,&quot;created_timestamp&quot;:&quot;0&quot;,&quot;copyright&quot;:&quot;&quot;,&quot;focal_length&quot;:&quot;0&quot;,&quot;iso&quot;:&quot;0&quot;,&quot;shutter_speed&quot;:&quot;0&quot;,&quot;title&quot;:&quot;&quot;,&quot;orientation&quot;:&quot;0&quot;}" data-image-title="dc2023notes1-5" data-image-description="" data-image-caption="" data-large-file="/news-media/2023/09/dc2023notes1-5.png" src="/news-media/2023/09/dc2023notes1-5.png" alt="" class="wp-image-12058" style="width:430px;height:auto" /></a></figure>
</div>


<p class="wp-block-paragraph">Those concepts should be taken into consideration by tools that deal with rules, decision, and process intelligence.</p>



<p class="wp-block-paragraph">Naturally, the use of Generative AI in the Decision Management context was in the center of discussions during our <a href="https://decisioncamp2023.wordpress.com/panel-discussion/"><strong>Interactive Panel</strong></a> on Sep 19. There were many important statements from our experts, e.g. “<em>You cannot put over there an automated decisioning system that cannot explain its decisions</em>.” But you better <a href="https://youtu.be/B0sp-rH43qU">listen</a> to their opinions and the recommended dos and don’ts. </p>



<p class="wp-block-paragraph">Here I just want to stress several points about the “friendly enough” language for decision modeling. Gary Hallmark, the author of FEEL, remembered spirited debates in the early days of DMN when people argued if DMN even needed an expression language. </p>



<p class="wp-block-paragraph">“<em>Of course, no formal language is going to be friendly-enough</em>”, said Gary. “<em>I didn’t see a way out of that until the world flipped on its head almost a year ago and we got these LLMs&#8230; You describe your decision logic in natural language… and what could be friendlier than that? However, we need to deal with hallucinations, all sorts of gibberish, and the necessity of independent verification</em>.” </p>



<p class="wp-block-paragraph">Then Carlos Serrano-Morales said: </p>



<p class="wp-block-paragraph">“<em>Natural language is ambiguous, that’s why nobody does mathematics in English. There has to be formalism. I do think we will see a rise of LLM-based tools that are going to try to explain the things but they all will go back to how you explain the logic in the first place.</em>” </p>



<p class="wp-block-paragraph">Ron Ross tried to defend the natural language and posted this question at the very end of the panel: “<em>If formal models are required for the interpretation of laws, contracts, regulation, etc. then why aren&#8217;t these things written in formal models in the first place? (It will never happen. Natural language, for its shortcomings, is essential for groups and communities of people.</em>)” Unfortunately, Ron’s question remained unanswered while people resolve ambiguities in legal documents by issuing clarifications, and this process seems to be similar to ChatGPT prompts. I hope with Generative AI advancing so fast, we will see real progress in this direction sooner than we might expect today.</p>



<p class="wp-block-paragraph">In my <a href="https://www.youtube.com/watch?v=3AgKS_Oqx4A">Closing Remarks</a> on Sep 20, I tried to put together an architectural schema that summarized how the design of modern Decision Intelligence Services is influenced by the Generative AI:</p>



<figure class="wp-block-image size-large"><a href="/news-media/2023/09/dc2023notes1-6-1.png"><img data-recalc-dims="1" loading="lazy" decoding="async" width="640" height="417" data-attachment-id="12063" data-permalink="https://dmcommunity.org/2023/09/22/from-knowledge-sources-to-executable-decision-models-dc2023-notes-part-1/dc2023notes1-6-1/" data-orig-file="/news-media/2023/09/dc2023notes1-6-1.png" data-orig-size="758,494" data-comments-opened="1" data-image-meta="{&quot;aperture&quot;:&quot;0&quot;,&quot;credit&quot;:&quot;&quot;,&quot;camera&quot;:&quot;&quot;,&quot;caption&quot;:&quot;&quot;,&quot;created_timestamp&quot;:&quot;0&quot;,&quot;copyright&quot;:&quot;&quot;,&quot;focal_length&quot;:&quot;0&quot;,&quot;iso&quot;:&quot;0&quot;,&quot;shutter_speed&quot;:&quot;0&quot;,&quot;title&quot;:&quot;&quot;,&quot;orientation&quot;:&quot;0&quot;}" data-image-title="dc2023notes1-6-1" data-image-description="" data-image-caption="" data-large-file="/news-media/2023/09/dc2023notes1-6-1.png" src="/news-media/2023/09/dc2023notes1-6-1.png" alt="" class="wp-image-12063" /></a></figure>
