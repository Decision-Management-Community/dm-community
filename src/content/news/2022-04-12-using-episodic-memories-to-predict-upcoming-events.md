---
title: "Using Episodic Memories to Predict Upcoming Events"
date: 2022-04-12
author: "decisionmanagementcommunity"
tags: ["Decision Making", "Decision Modeling", "Event-driven", "Knowledge Representation", "Machine Learning"]
legacyPath: "/2022/04/12/using-episodic-memories-to-predict-upcoming-events/"
---

<div class="wp-block-image">
<figure class="alignleft size-large is-resized"><a href="/news-media/2022/04/episodicmemody.png"><img data-recalc-dims="1" loading="lazy" decoding="async" data-attachment-id="10498" data-permalink="https://dmcommunity.org/episodicmemody/" data-orig-file="/news-media/2022/04/episodicmemody.png" data-orig-size="395,282" data-comments-opened="1" data-image-meta="{&quot;aperture&quot;:&quot;0&quot;,&quot;credit&quot;:&quot;&quot;,&quot;camera&quot;:&quot;&quot;,&quot;caption&quot;:&quot;&quot;,&quot;created_timestamp&quot;:&quot;0&quot;,&quot;copyright&quot;:&quot;&quot;,&quot;focal_length&quot;:&quot;0&quot;,&quot;iso&quot;:&quot;0&quot;,&quot;shutter_speed&quot;:&quot;0&quot;,&quot;title&quot;:&quot;&quot;,&quot;orientation&quot;:&quot;0&quot;}" data-image-title="episodicmemody" data-image-description="" data-image-caption="" data-large-file="/news-media/2022/04/episodicmemody.png" src="/news-media/2022/04/episodicmemody.png" alt="" class="wp-image-10498" width="174" height="124" /></a></figure>
</div>


<p class="wp-block-paragraph">This <a rel="noreferrer noopener" href="https://elifesciences.org/articles/74445" target="_blank">paper</a> addresses an important problem in control of episodic memory to be used to predict upcoming states in an environment where past situations sometimes reoccur. One of the key benefits is reducing the risk of retrieving irrelevant memories. Read <a rel="noreferrer noopener" href="https://elifesciences.org/articles/74445" target="_blank">more</a></p>



<!--more-->



<p class="wp-block-paragraph">To simulate the task of event processing, they define an&nbsp;<em>event</em>&nbsp;as a sequence of states, sampled from an underlying graph that represents the&nbsp;<em>event schema</em>.&nbsp;Figure below&nbsp;shows a ‘coffee shop visit’ event schema graph with three time points; each time point has two possible states. Each instance of an event (here, each visit to the coffee shop) is associated with a&nbsp;<em>situation</em>&nbsp;– a collection of features set to particular values; importantly, the features of the current situation deterministically control the transitions between states within the event.</p>



<figure class="wp-block-image size-large"><a href="/news-media/2022/04/episodicmemodysample.png"><img data-recalc-dims="1" loading="lazy" decoding="async" width="640" height="804" data-attachment-id="10501" data-permalink="https://dmcommunity.org/episodicmemodysample/" data-orig-file="/news-media/2022/04/episodicmemodysample.png" data-orig-size="799,1004" data-comments-opened="1" data-image-meta="{&quot;aperture&quot;:&quot;0&quot;,&quot;credit&quot;:&quot;&quot;,&quot;camera&quot;:&quot;&quot;,&quot;caption&quot;:&quot;&quot;,&quot;created_timestamp&quot;:&quot;0&quot;,&quot;copyright&quot;:&quot;&quot;,&quot;focal_length&quot;:&quot;0&quot;,&quot;iso&quot;:&quot;0&quot;,&quot;shutter_speed&quot;:&quot;0&quot;,&quot;title&quot;:&quot;&quot;,&quot;orientation&quot;:&quot;0&quot;}" data-image-title="episodicmemodysample" data-image-description="" data-image-caption="" data-large-file="/news-media/2022/04/episodicmemodysample.png" src="/news-media/2022/04/episodicmemodysample.png" alt="" class="wp-image-10501" /></a></figure>
