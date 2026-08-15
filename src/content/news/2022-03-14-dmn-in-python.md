---
title: "DMN in Python"
date: 2022-03-14
author: "decisionmanagementcommunity"
tags: ["DMN", "Products"]
legacyPath: "/2022/03/14/dmn-in-python/"
---

<div class="wp-block-image">
<figure class="alignleft size-large is-resized"><a href="/news-media/2022/03/dmninpython.png"><img data-recalc-dims="1" loading="lazy" decoding="async" data-attachment-id="10467" data-permalink="https://dmcommunity.org/dmninpython/" data-orig-file="/news-media/2022/03/dmninpython.png" data-orig-size="195,175" data-comments-opened="1" data-image-meta="{&quot;aperture&quot;:&quot;0&quot;,&quot;credit&quot;:&quot;&quot;,&quot;camera&quot;:&quot;&quot;,&quot;caption&quot;:&quot;&quot;,&quot;created_timestamp&quot;:&quot;0&quot;,&quot;copyright&quot;:&quot;&quot;,&quot;focal_length&quot;:&quot;0&quot;,&quot;iso&quot;:&quot;0&quot;,&quot;shutter_speed&quot;:&quot;0&quot;,&quot;title&quot;:&quot;&quot;,&quot;orientation&quot;:&quot;0&quot;}" data-image-title="dmninpython" data-image-description="" data-image-caption="" data-large-file="/news-media/2022/03/dmninpython.png" src="/news-media/2022/03/dmninpython.png" alt="" class="wp-image-10467" width="137" height="123" /></a></figure>
</div>


<p class="wp-block-paragraph">We received this email from <a href="mailto:russell.mcdonell@c-cost.com">Russell McDonell</a>: &#8220;As a Python developer, I was interested in using DMN within my Python applications. Specifically I wanted to use DMN in clinical decisions using FHIR and cds-hooks. So I developed <a href="https://pypi.org/project/pyDMNrules/">pyDMNrules</a> (<a href="https://github.com/russellmcdonell/pyDMNrules">gitHub repository</a>) which is based upon a Python implementation of FEEL &#8211; <a href="https://pypi.org/project/pySFeel/">pySFeel</a> (<a href="https://github.com/russellmcdonell/pySFeel">gitHub repository</a>). Its rule input is an Excel workbook where the rules tables have to &#8216;look&#8217; like the examples in the DMN specification (double line borders).&#8221; </p>



<!--more-->



<p class="wp-block-paragraph">I built on that, creating&nbsp;<a href="https://github.com/russellmcdonell/DecisionCentral">DecisionCentral</a>&nbsp;&#8211; source code for a website with no content, but you can upload Excel workbooks and it creates APIs for each workbook. There&#8217;s everything needed to run this in a Docker container. There&#8217;s also a version (<a href="https://github.com/russellmcdonell/DecisionCentralAzure">DecisionCentralAzure</a>) which stands this up as an App Service on Microsoft Azure.</p>



<p class="wp-block-paragraph">I believe pyDMNrules complies with DMN 1.3 and asked the OMG &#8220;How can I test this?&#8221; and they suggested I contact the Decision Management community. They pointed me at one group, but all their tests are Maven and Java and I suspect I would have to develop uploading an XML definition for the rules. Seems a lot of effort for no immediate benefit.</p>
