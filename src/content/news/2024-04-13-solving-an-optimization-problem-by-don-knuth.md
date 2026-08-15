---
title: "Solving an Optimization Problem by Don Knuth"
date: 2024-04-13
author: "decisionmanagementcommunity"
tags: ["Algortithms", "Optimization"]
legacyPath: "/2024/04/13/solving-an-optimization-problem-by-don-knuth/"
---

<div class="wp-block-image">
<figure class="alignleft size-thumbnail"><a href="/news-media/2024/04/image-3.png"><img data-recalc-dims="1" loading="lazy" decoding="async" width="302" height="300" data-attachment-id="12695" data-permalink="https://dmcommunity.org/2024/04/13/solving-an-optimization-problem-by-don-knuth/image-3-4/" data-orig-file="/news-media/2024/04/image-3.png" data-orig-size="302,300" data-comments-opened="1" data-image-meta="{&quot;aperture&quot;:&quot;0&quot;,&quot;credit&quot;:&quot;&quot;,&quot;camera&quot;:&quot;&quot;,&quot;caption&quot;:&quot;&quot;,&quot;created_timestamp&quot;:&quot;0&quot;,&quot;copyright&quot;:&quot;&quot;,&quot;focal_length&quot;:&quot;0&quot;,&quot;iso&quot;:&quot;0&quot;,&quot;shutter_speed&quot;:&quot;0&quot;,&quot;title&quot;:&quot;&quot;,&quot;orientation&quot;:&quot;0&quot;}" data-image-title="image-3" data-image-description="" data-image-caption="" data-large-file="/news-media/2024/04/image-3.png" src="/news-media/2024/04/image-3.png" alt="" class="wp-image-12695" /></a></figure>
</div>


<p class="wp-block-paragraph">In 1960, the famed computer scientist Don Knuth wrote <a href="https://dl.acm.org/doi/10.1145/321062.321063">a technical paper in which he considered an integer programming model for minimizing memory access latency of an IBM 650</a>. It included 51 variables and 43 constraints. Knuth ran Gomory’s algorithm on an IBM 650 with less than 10K of memory, but was unable to find an optimal solution. In 1995 Dimitris Alevras successfully found the optimum value of 22,996 using CPLEX on a SPARCstation 5 and it took hours. These days open source MIP solvers are able to find an optimal solution in tenths of a second. <a href="https://nathanbrixius.wordpress.com/2024/04/13/don-knuths-mip-64-years-later/" target="_blank" rel="noreferrer noopener">Link</a></p>
