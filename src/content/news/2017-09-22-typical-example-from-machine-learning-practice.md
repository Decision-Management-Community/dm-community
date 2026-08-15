---
title: "Typical Example from Machine Learning Practice"
date: 2017-09-22
author: "decisionmanagementcommunity"
tags: ["Business Analytics", "Machine Learning"]
legacyPath: "/2017/09/22/typical-example-from-machine-learning-practice/"
---

<p><img data-recalc-dims="1" loading="lazy" decoding="async" data-attachment-id="2530" data-permalink="https://dmcommunity.org/2016/10/28/the-error-in-predictive-analytics/oops2/" data-orig-file="/news-media/2016/10/oops2.jpg" data-orig-size="160,132" data-comments-opened="1" data-image-meta="{&quot;aperture&quot;:&quot;0&quot;,&quot;credit&quot;:&quot;&quot;,&quot;camera&quot;:&quot;&quot;,&quot;caption&quot;:&quot;&quot;,&quot;created_timestamp&quot;:&quot;0&quot;,&quot;copyright&quot;:&quot;&quot;,&quot;focal_length&quot;:&quot;0&quot;,&quot;iso&quot;:&quot;0&quot;,&quot;shutter_speed&quot;:&quot;0&quot;,&quot;title&quot;:&quot;&quot;,&quot;orientation&quot;:&quot;0&quot;}" data-image-title="oops2" data-image-description="" data-image-caption="" data-large-file="/news-media/2016/10/oops2.jpg" class=" size-full wp-image-2530 alignleft" src="/news-media/2016/10/oops2.jpg" alt="oops2" width="160" height="132" />&#8220;<em>I was asked to help sell machine learning to a bank. They asked us to have a look at predicting failures of their payment system.  They had previous attempts with various technologies and various consulting companies, but they all failed.  Training data would be transactions processed in the past.  </em><br />
<em>My dialog with the client team went like this: </em><!--more--></p>
<p><em>&#8211; (me) Do we know which transactions failed among all the training data transactions? </em><br />
<em>&#8211; Yes</em><br />
<em>&#8211; Do we have enough data? </em><br />
<em>&#8211; Yes, we have millions in our training data set. </em><br />
<em>&#8211; Perfect, can I get access to data?</em><br />
<em>It took a while to get access because of security concerns, as is often the case in regulated industries like banking, but I finally got access to a file of million transactions.  I looked at it, there were hundreds of features, but I could not find where the target values were (whether a given transaction is considered as a failure or not).  When I asked about it, I was pointed to a second file where the target values where.  True, the values were there, and all I needed to do was to join it with the other data set. </em><br />
<em>There was an issue though: the target file contained only 1,700 transactions or so, and only 8 failures out of these 1,700 transactions.  No wonder no machine learning approach would work: how can you learn from 8 examples only?</em><br />
<em>I suggested they spent time labeling other transactions.  Assuming 10 transaction labels per minute, a one man week effort would yield more than 10 times more examples to learn from.</em><br />
<em>Yet, the client team refused to do that, and guess what, they still have no success with machine learning</em>.&#8221;     Read more at this <a href="https://www.ibm.com/developerworks/community/blogs/jfp/entry/Just_label_data?lang=en" target="_blank" rel="noopener">Jean-Francois Puget</a> post.<!--more--><!--more--><!--more--></p>
