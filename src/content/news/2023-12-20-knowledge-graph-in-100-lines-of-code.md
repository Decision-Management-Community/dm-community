---
title: "Knowledge Graph in 100 Lines of Code"
date: 2023-12-20
author: "decisionmanagementcommunity"
tags: ["Knowledge Representation", "LLM"]
legacyPath: "/2023/12/20/knowledge-graph-in-100-lines-of-code/"
---

<div class="wp-block-image">
<figure class="alignleft size-large is-resized"><a href="/news-media/2021/08/threelevelsknowledge.png"><img data-recalc-dims="1" loading="lazy" decoding="async" width="601" height="355" data-attachment-id="9768" data-permalink="https://dmcommunity.org/threelevelsknowledge/" data-orig-file="/news-media/2021/08/threelevelsknowledge.png" data-orig-size="601,355" data-comments-opened="1" data-image-meta="{&quot;aperture&quot;:&quot;0&quot;,&quot;credit&quot;:&quot;&quot;,&quot;camera&quot;:&quot;&quot;,&quot;caption&quot;:&quot;&quot;,&quot;created_timestamp&quot;:&quot;0&quot;,&quot;copyright&quot;:&quot;&quot;,&quot;focal_length&quot;:&quot;0&quot;,&quot;iso&quot;:&quot;0&quot;,&quot;shutter_speed&quot;:&quot;0&quot;,&quot;title&quot;:&quot;&quot;,&quot;orientation&quot;:&quot;0&quot;}" data-image-title="threelevelsknowledge" data-image-description="" data-image-caption="" data-large-file="/news-media/2021/08/threelevelsknowledge.png" src="/news-media/2021/08/threelevelsknowledge.png" alt="" class="wp-image-9768" style="width:166px;height:auto" /></a></figure>
</div>


<p class="wp-block-paragraph"><a href="https://en.wikipedia.org/wiki/Knowledge_graph" target="_blank" rel="noreferrer noopener">Knowledge graphs</a> are getting lots of attention at the moment, as they are the natural&nbsp;Yin&nbsp;to the&nbsp;Yang&nbsp;of LLMs, providing structured data to chat interfaces, and powering Retrieval Augmented Generation. In this article <a href="https://www.linkedin.com/in/dselman/" target="_blank" rel="noreferrer noopener">Dan Selman</a> demonstrates how to create your own custom&nbsp;Knowledge Graph&nbsp;using Typescript, Open Source tools and the Neo4J database. </p>



<p class="wp-block-paragraph">His graph represents nodes and edges for a simple movie database including nodes for movies, actors, directors and users who have rated movies. His demo using Open AI retrieves three top-rated movies semantically similar to the search query <em>‘Working in a boring job and looking for love&#8217;</em> though that exact text doesn’t appear in the summary of the movie. <a href="https://blog.selman.org/2023/12/19/knowledge-graph-in-100-lines-of-code/" target="_blank" rel="noreferrer noopener">Link</a></p>
