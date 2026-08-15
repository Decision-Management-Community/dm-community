---
title: "Is SQL for Business or for IT?"
date: 2021-09-02
author: "decisionmanagementcommunity"
tags: ["Decision Modeling"]
legacyPath: "/2021/09/02/is-sql-for-business-or-it/"
---

<div class="wp-block-image"><figure class="alignleft size-thumbnail"><a href="/news-media/2017/11/sql.png"><img data-recalc-dims="1" loading="lazy" decoding="async" width="206" height="245" data-attachment-id="3569" data-permalink="https://dmcommunity.org/2017/11/29/reaffirming-the-power-of-sql-for-decision-management/sql/" data-orig-file="/news-media/2017/11/sql.png" data-orig-size="206,245" data-comments-opened="1" data-image-meta="{&quot;aperture&quot;:&quot;0&quot;,&quot;credit&quot;:&quot;&quot;,&quot;camera&quot;:&quot;&quot;,&quot;caption&quot;:&quot;&quot;,&quot;created_timestamp&quot;:&quot;0&quot;,&quot;copyright&quot;:&quot;&quot;,&quot;focal_length&quot;:&quot;0&quot;,&quot;iso&quot;:&quot;0&quot;,&quot;shutter_speed&quot;:&quot;0&quot;,&quot;title&quot;:&quot;&quot;,&quot;orientation&quot;:&quot;0&quot;}" data-image-title="SQL" data-image-description="" data-image-caption="" data-large-file="/news-media/2017/11/sql.png" src="/news-media/2017/11/sql.png" alt="" class="wp-image-3569" /></a></figure></div>



<p class="wp-block-paragraph"><a rel="noreferrer noopener" href="mailto:j.jansonius@home.nl" target="_blank">Jack Jansonius</a> shared the following article in which he argues that SQL combined with decision tables gives us a friendly 5GL language oriented to the business audience. Recently he provided a <a rel="noreferrer noopener" href="/news-media/2021/08/challengeoct2016.jackjansonius.pdf" target="_blank">solution</a> for our <a rel="noreferrer noopener" href="https://dmcommunity.org/challenge/challenge-oct-2016/" target="_blank">Oct-2016 Challenge &#8220;Flight Rebooking&#8221;</a> that demonstrates his point. Below is his article:</p>



<!--more-->



<p class="wp-block-paragraph">SQL is the most popular example of a pure 4GL language focused on the WHAT contrary to 3GL languages focused on HOW.</p>



<p class="wp-block-paragraph">Which brings up the question: is 4GL such as SQL a language for business or for IT?</p>



<p class="wp-block-paragraph">My answer is simple:</p>



<ul class="wp-block-list"><li>If you supplement SQL with 3GL programming constructs (like PL/SQL or Transact-SQL) it is a language for IT people</li><li>If you supplement SQL with 5GL decision tables, it&#8217;s a language for the business.</li></ul>



<p class="wp-block-paragraph">But this distinction is there even if you use SQL as a pure query language (and thus 4GL):</p>



<ul class="wp-block-list"><li>simple queries are easy to follow and create by business employees</li><li>complicated queries can only be made by IT people.</li></ul>



<p class="wp-block-paragraph">The good news is that even complicated queries can be made much more straightforward when combined with decision tables!</p>



<p class="wp-block-paragraph">Recently I came across the following evolution of programming languages:</p>



<p class="has-text-align-center wp-block-paragraph"><strong>3GL &#8211; 4GL &#8211; Lowcode &#8211; Nocode</strong></p>



<p class="wp-block-paragraph">But if Low/Nocode mainly plays a role in the area of sequential processes (or orchestration), in terms of business functionality you remain dependent on the obscure algorithms of a 3GL and/or machine learning code. Thus, you continue to mess with the infamous Business-IT alignment.</p>



<p class="wp-block-paragraph">In this regard, Lowcode and Nocode is only <em>complementary</em> to 3GL and 4GL.</p>



<p class="wp-block-paragraph">Lowcode/nocode is all about speeding up application building &#8211; the underlying database structure and/or language is hardly relevant there, if at all.</p>



<p class="wp-block-paragraph">In my view, however, the evolution of programming languages should be:</p>



<p class="has-text-align-center wp-block-paragraph"><strong>3GL &#8211; 4GL &#8211; 5GL</strong></p>



<p class="wp-block-paragraph">where these 3 generations address different questions:</p>



<p class="wp-block-paragraph">3GL: <strong>HOW</strong> &#8211; Procedural/Algorithmic and Data-Driven. Java, Python, etc.</p>



<p class="wp-block-paragraph">4GL: <strong>WHAT</strong> &#8211; Declarative. Database query languages (SQL).</p>



<p class="wp-block-paragraph">5GL: <strong>WHY</strong> &#8211;  Declarative and Goal-Driven. DT (Decision Tables)</p>



<p class="wp-block-paragraph">5GL is used for describing functionality (<em>replacing</em> 3GL and <em>complementing</em> &#8211; possibly already existing &#8211; 4GL databases) as well as the end-to-end application flow.</p>



<p class="wp-block-paragraph">I believe 5GL will replace 3GL as 3GL once replaced 1GL/2GL (machine language/Assembler).</p>



<p class="wp-block-paragraph">As an example, I provided my  <a rel="noreferrer noopener" href="/news-media/2021/08/challengeoct2016.jackjansonius.pdf" target="_blank">solution</a> for the <a rel="noreferrer noopener" href="https://dmcommunity.org/challenge/challenge-oct-2016/" target="_blank">Oct-2016 Challenge &#8220;Rebooking Passengers from Cancelled Flights&#8221;</a> that use SQL and decision tables. And I&#8217;d like to finish with the <strong>question</strong>: are there DMN-compliant tools that can provide solutions based on business rules in decision tables combined with a relational database of their choice? </p>
