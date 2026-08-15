---
title: "Large Language Models as Optimizers"
date: 2023-09-15
author: "decisionmanagementcommunity"
tags: ["Algortithms", "LLM", "Optimization"]
legacyPath: "/2023/09/15/large-language-models-as-optimizers/"
---

<div class="wp-block-image">
<figure class="alignleft size-large is-resized"><a href="/news-media/2023/09/llmasoptimizer.png"><img data-recalc-dims="1" loading="lazy" decoding="async" width="362" height="202" data-attachment-id="12013" data-permalink="https://dmcommunity.org/2023/09/15/large-language-models-as-optimizers/llmasoptimizer/" data-orig-file="/news-media/2023/09/llmasoptimizer.png" data-orig-size="362,202" data-comments-opened="1" data-image-meta="{&quot;aperture&quot;:&quot;0&quot;,&quot;credit&quot;:&quot;&quot;,&quot;camera&quot;:&quot;&quot;,&quot;caption&quot;:&quot;&quot;,&quot;created_timestamp&quot;:&quot;0&quot;,&quot;copyright&quot;:&quot;&quot;,&quot;focal_length&quot;:&quot;0&quot;,&quot;iso&quot;:&quot;0&quot;,&quot;shutter_speed&quot;:&quot;0&quot;,&quot;title&quot;:&quot;&quot;,&quot;orientation&quot;:&quot;0&quot;}" data-image-title="llmasoptimizer" data-image-description="" data-image-caption="" data-large-file="/news-media/2023/09/llmasoptimizer.png" src="/news-media/2023/09/llmasoptimizer.png" alt="" class="wp-image-12013" style="width:179px;height:auto" /></a></figure>
</div>


<p class="wp-block-paragraph">The <a href="https://arxiv.org/pdf/2309.03409.pdf">article</a> with this title was published on Sep 7, 2023. &#8220;<em>In this work, we propose Optimization by PROmpting (OPRO), a simple and effective approach to leverage large language models (LLMs) as optimizers, where the optimization task is described in natural language. In each optimization step, the LLM generates new solutions from the prompt that contains previously generated solutions with their values, then the new solutions are evaluated and added to the prompt for the next optimization step. We first showcase OPRO on linear regression and traveling salesman problems, then move on to prompt optimization where the goal is to find instructions that maximize the task accuracy. With a variety of LLMs, we demonstrate that the best prompts optimized by OPRO outperform human-designed prompts by up to 8% on GSM8K, and by up to 50% on Big-Bench Hard tasks.</em>&#8221; <a rel="noreferrer noopener" href="https://arxiv.org/pdf/2309.03409.pdf" target="_blank">Link</a></p>
