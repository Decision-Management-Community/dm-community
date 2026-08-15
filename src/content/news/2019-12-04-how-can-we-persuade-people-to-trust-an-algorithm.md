---
title: "How can we persuade people to trust an algorithm?"
date: 2019-12-04
author: "decisionmanagementcommunity"
tags: ["Artificial Intelligence", "Explanations"]
legacyPath: "/2019/12/04/how-can-we-persuade-people-to-trust-an-algorithm/"
---

<p><a href="/news-media/2019/12/ai-trust.png"><img data-recalc-dims="1" loading="lazy" decoding="async" data-attachment-id="7429" data-permalink="https://dmcommunity.org/2019/12/04/how-can-we-persuade-people-to-trust-an-algorithm/ai-trust/" data-orig-file="/news-media/2019/12/ai-trust.png" data-orig-size="286,187" data-comments-opened="1" data-image-meta="{&quot;aperture&quot;:&quot;0&quot;,&quot;credit&quot;:&quot;&quot;,&quot;camera&quot;:&quot;&quot;,&quot;caption&quot;:&quot;&quot;,&quot;created_timestamp&quot;:&quot;0&quot;,&quot;copyright&quot;:&quot;&quot;,&quot;focal_length&quot;:&quot;0&quot;,&quot;iso&quot;:&quot;0&quot;,&quot;shutter_speed&quot;:&quot;0&quot;,&quot;title&quot;:&quot;&quot;,&quot;orientation&quot;:&quot;0&quot;}" data-image-title="AI-Trust" data-image-description="" data-image-caption="" data-large-file="/news-media/2019/12/ai-trust.png" class="alignleft size-thumbnail wp-image-7429" src="/news-media/2019/12/ai-trust.png" alt="" width="150" height="98" /></a>On Dec. 4 Andrew Ng listed <a href="https://blog.deeplearning.ai/blog/google-ai-explains-itself-neural-net-fights-bias-ai-demoralizes-champions-solar-power-heats-up" target="_blank" rel="noopener">several important techniques</a>  that can persuade people to trust an algorithm. &#8220;<em>Trust isn’t just about convincing others that our solution works. I use techniques like these because I find it at least as important to convince myself that a solution works, before I ask a customer to rely on it.</em>&#8221; Here they are:<!--more--></p>
<ul>
<li style="list-style-type:none;">
<ul>
<li style="list-style-type:none;">
<ul>
<li><em><strong>Explainability</strong>. If an AI can explain its decisions, this helps to build trust or identify problems before they can impinge on trust. For instance, the New York State Department of Financial Services is <a href="https://info.deeplearning.ai/e2t/c/*W4-HqXw7QmCNjW8wRWc71sDT1z0/*W5q-cBz7j_ZjKW8jcM831zhz_s0/5/f18dQhb0S1Xq2WJLfhVWlP0X2xsm9hW24xNrb2GyKL8W5zJ0vC60Z5wMW7Xd1mT5JdDSNW6XfR0D4n9MT2W7tlzZx8WMr04W54j-0H2z0nJrW2WCHVK6F3dNyVLXXjS1wWNBwW9kvvC78smKGfN7ZkPX9RzH9JW55WMLh5qBq5BVwW8NC753bSVW2BmjxC8t4SLfW5qkT9V7Mqbz_W5yQywN6xjS4FW1vBCfc5stfpjV7JCwQ6cb20sV37xzq2T9mnHW5dBrXt196BjMW4tP5dN1QN7N5W5s1d0384nPbLW2hmngN8HC9FsW5dNTZD87bvfwVkbGf754yRZ2W7BXJBT1V_d4mW4LN9cR3NChgrW88gn3s8K2jG0V38mX76qHrzNN1L7nb_Pz_q6W1N8gmc2BXwlZW87T36n6c8sKmW7zqtpJ5_Fxd7W6fvqY45HWlDmW8k5KkL2xTyt3W7_2n9H8JtvyJW8h6-V-27-M9JW84fQ2r4Q1sLdW4R1nCX43vXhJW911KbL5bhTW7W2VcZVk2QsSjdW51N4nk42rDKNW2bVCr992fpppW5T7LrH6XflfpW3SZwth8yLZGZW4P3pJC2q2_lYW1TV1131BgD-YW1KLfGB9h7x97W893Rd98F_QXJW2gQfFk97_CdRN4zzwsfzyS81W2BFmsW9h9rp3f1yQBYD02">investigating</a> whether the Apple/Goldman Sachs credit card exhibits gender bias in setting credit limits. If the algorithm could explain its decisions, we could determine whether such bias was driving them.</em></li>
<li><em><strong>Testing</strong>. Many of us are willing to take medicinal drugs whose biochemical effects no one fully understands. We trust these drugs because they have passed randomized clinical trials and received FDA approval. Similarly, black-box AI algorithms might gain our trust by undergoing rigorous testing. </em></li>
<li><em><strong>Boundary conditions</strong>. Clearly specifying boundary conditions (where the AI is expected to work) also helps. For instance, machine learning engineers developing systems to read medical images may specify the allowable range of inputs (for instance, X-rays must be this bright, and with a certain resolution) and so we can test against these conditions.</em></li>
<li><strong><em>Gradual rollou</em><em>t.</em></strong> Rather than having AI make fully automated decisions on Day One, we can start by allowing it merely to assist humans. For example, an AI trained to read X-rays might assist radiologists in making diagnoses rather than replacing doctors outright. Over time, having collected enough data and improved image readers sufficiently, we would come to trust higher and higher levels of automation, perhaps even full automation.</li>
<li><em><strong>Auditing</strong>. Third-party audits would build trust that our algorithms have minimal or no gender, race, or other bias, and that they meet certain performance standards.</em></li>
<li><em><strong>Monitors and alarms.</strong> Even after deploying a system, we can make sure we receive alerts if something goes wrong. By designing mechanisms that escalate serious issues, we can ensure that problems are fixed in a timely way.</em></li>
</ul>
</li>
</ul>
</li>
</ul>
<p>&nbsp;</p>
