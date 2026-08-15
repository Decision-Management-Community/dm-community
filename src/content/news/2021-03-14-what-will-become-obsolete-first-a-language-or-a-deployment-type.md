---
title: "What will become obsolete first: a language or a deployment type?"
date: 2021-03-14
author: "jacobfeldman"
tags: ["Cloud Platforms", "Containers", "Languages", "Microservices", "Trends"]
legacyPath: "/2021/03/14/what-will-become-obsolete-first-a-language-or-a-deployment-type/"
---

<p class="wp-block-paragraph"><a href="/news-media/2021/03/javavsdocker.png"><img data-recalc-dims="1" loading="lazy" decoding="async" data-attachment-id="9192" data-permalink="https://dmcommunity.org/2021/03/14/what-will-become-obsolete-first-a-language-or-a-deployment-type/javavsdocker/" data-orig-file="/news-media/2021/03/javavsdocker.png" data-orig-size="660,372" data-comments-opened="1" data-image-meta="{&quot;aperture&quot;:&quot;0&quot;,&quot;credit&quot;:&quot;&quot;,&quot;camera&quot;:&quot;&quot;,&quot;caption&quot;:&quot;&quot;,&quot;created_timestamp&quot;:&quot;0&quot;,&quot;copyright&quot;:&quot;&quot;,&quot;focal_length&quot;:&quot;0&quot;,&quot;iso&quot;:&quot;0&quot;,&quot;shutter_speed&quot;:&quot;0&quot;,&quot;title&quot;:&quot;&quot;,&quot;orientation&quot;:&quot;0&quot;}" data-image-title="JavaVsDocker" data-image-description="" data-image-caption="" data-large-file="/news-media/2021/03/javavsdocker.png" class="alignleft size-thumbnail wp-image-9192" src="/news-media/2021/03/javavsdocker.png" alt="" width="150" height="85" /></a>In the new article “<a href="https://medium.com/star-gazers/java-and-c-is-obsolete-in-the-age-of-docker-39fb0d28f8b6" target="_blank" rel="noopener">Java and C# are Obsolete in the Age of Docker</a>” Erik Engheim states: “<em>Languages running on virtual machines were developed to make deployment on any platform easy. But this ability no longer matters when your software runs in a container</em>.” He apologizes saying he does not mean “<em>there is no point in learning Java or C# anymore</em>” but still pushes a language like Go as their natural replacement. This article provoked the following discussion between me (JF) and a colleague of mine (IK) this morning. I decided to share it and get comments from DM Community. Here it is:<!--more--></p>



<p class="wp-block-paragraph">IK: The author makes strange points, docker is just a way to deploy an application but how deployment type is related to the application semantic expressed in a particular language? Go is a good language for system utilities but it is not well suitable for business apps.</p>



<p class="wp-block-paragraph">JF: It seems his article is not about languages as his main point is that virtual machines become unnecessary overhead when run inside containers.</p>



<p class="wp-block-paragraph">IK: Well, more than half of his article is about obsolete languages because there is Go which is &#8220;Java for Docker”.  The guy sounds like a super excited neophyte who discovered a new way of doing things and claims that everything else is obsolete. He does not make any valid points why Java or C# are obsolete. Because of Go?  He does not like JVM, but there is <a href="https://www.graalvm.org/" target="_blank" rel="noopener">GraalVM</a> that can deploy the same java app as a native application. JVM is not only about running the same code on different OS, but also about polyglot programming environment which has nothing to do with docker or linux or windows. </p>



<p class="wp-block-paragraph">Java may become obsolete one day, but there is Scala, Closure, Kotlin that run on JVM as well. Besides, Java itself is evolving…</p>



<p class="wp-block-paragraph">JF: As we discussed yesterday, an AWS Lambda function is a small computer that executes one specialized function for different requests.</p>



<p class="wp-block-paragraph">IK: Exactly, and it’s written in Java. There is no special language for Lambda.</p>



<p class="wp-block-paragraph">JF: Or in another suitable language that allows a user to describe business logic.</p>



<p class="wp-block-paragraph">IK: Soon the docker will be obsolete too but programming languages will stay there much longer.  He compares apples and not even oranges but crates.</p>



<p class="wp-block-paragraph">JF: Lambda, Docker, or something new that will come after them are different implementations of specialized computers that execute one particular business function. How to create such a computer? It needs two different components:</p>
<ol>
<li>a deployment mechanism that is not so important.</li>
<li>the logic (semantic) of this function &#8211; here languages from Java to DMN with Decision Tables play and will continue to play an important role.</li>
</ol>
<p>IK: Yep, exactly, the guy confused content with its packaging.</p>
<p>

</p>
<p class="wp-block-paragraph">JF: or did this intentionally to bring a controversy</p>
<p>

</p>
<p class="wp-block-paragraph">IK: Does not matter, the entire approach is based on misunderstanding. Deployment type is obsolete, it becomes a commodity. There are already tools that let you deploy running code on aws, azure, or google without any changes to the function code.</p>
<p>

</p>
<p class="wp-block-paragraph">By the way, OpenRules does that to some degree by providing &#8220;click and deploy&#8221; to java api, aws lambda, or docker. If there is another &#8220;NextDocker&#8221;, does it mean java or openrules become obsolete? It’d be just another crate to ship the product.</p>
<p>

</p>
<p class="wp-block-paragraph">JF: A crate or a package. I like you calling a Lambda function a specialized computer. Moving from a universal general-purpose computer (&#8220;main/monolithic frame&#8221;) to specialized computers (&#8220;microservices&#8221;) is the apparent latest trend.</p>
<p>

</p>
<p class="wp-block-paragraph">IK: Yes, it is true, and we will move more and more in that direction. The entire internet will be a &#8220;computer&#8221; that runs those small &#8220;functions&#8221; integrating data, processing and decision endpoints as a some kind of global, always running app ( SkyNet <a href="/news-media/2021/03/smiley.png"><img data-recalc-dims="1" loading="lazy" decoding="async" data-attachment-id="9193" data-permalink="https://dmcommunity.org/2021/03/14/what-will-become-obsolete-first-a-language-or-a-deployment-type/smiley/" data-orig-file="/news-media/2021/03/smiley.png" data-orig-size="24,23" data-comments-opened="1" data-image-meta="{&quot;aperture&quot;:&quot;0&quot;,&quot;credit&quot;:&quot;&quot;,&quot;camera&quot;:&quot;&quot;,&quot;caption&quot;:&quot;&quot;,&quot;created_timestamp&quot;:&quot;0&quot;,&quot;copyright&quot;:&quot;&quot;,&quot;focal_length&quot;:&quot;0&quot;,&quot;iso&quot;:&quot;0&quot;,&quot;shutter_speed&quot;:&quot;0&quot;,&quot;title&quot;:&quot;&quot;,&quot;orientation&quot;:&quot;0&quot;}" data-image-title="smiley" data-image-description="" data-image-caption="" data-large-file="/news-media/2021/03/smiley.png" class="alignnone size-full wp-image-9193" src="/news-media/2021/03/smiley.png" alt="" width="24" height="23" /></a>).</p>
<p>

</p>
<p class="wp-block-paragraph">Feel free to add your comments.</p>
<p></p>
<p>&nbsp;</p>
<p></p>
<p class="wp-block-paragraph">&nbsp;</p>
<p></p>
