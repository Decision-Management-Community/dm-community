---
title: "Challenge Apr-2024: Lookup Tables in Decision Models"
date: 2024-04-05
author: "decisionmanagementcommunity"
tags: ["Algortithms", "Case Studies", "Challenges", "Decision Modeling"]
legacyPath: "/2024/04/05/challenge-apr-2024-lookup-tables-in-decision-models/"
---

<div class="wp-block-image">
<figure class="alignleft size-thumbnail"><a href="/news-media/2024/03/icd.png"><img data-recalc-dims="1" loading="lazy" decoding="async" width="379" height="249" data-attachment-id="12627" data-permalink="https://dmcommunity.org/challenge/challenge-april-2024/icd/" data-orig-file="/news-media/2024/03/icd.png" data-orig-size="379,249" data-comments-opened="1" data-image-meta="{&quot;aperture&quot;:&quot;0&quot;,&quot;credit&quot;:&quot;&quot;,&quot;camera&quot;:&quot;&quot;,&quot;caption&quot;:&quot;&quot;,&quot;created_timestamp&quot;:&quot;0&quot;,&quot;copyright&quot;:&quot;&quot;,&quot;focal_length&quot;:&quot;0&quot;,&quot;iso&quot;:&quot;0&quot;,&quot;shutter_speed&quot;:&quot;0&quot;,&quot;title&quot;:&quot;&quot;,&quot;orientation&quot;:&quot;0&quot;}" data-image-title="ICD" data-image-description="" data-image-caption="" data-large-file="/news-media/2024/03/icd.png" src="/news-media/2024/03/icd.png" alt="" class="wp-image-12627" /></a></figure>
</div>


<p class="wp-block-paragraph">Business decision models frequently use lookup tables that may contain thousands of data rows. There are at least two issues to be addressed when representing lookup tables: 1) users need to be able to modify the table data without modifications in the decision model; 2) the tables may contain hundreds of thousands of rows and still should be highly efficient when used by decision services. So, this month’s challenge provides a concrete example of lookup tables from the claim processing domain. Each claim includes lists of  procedures and diagnoses with their types, codes, and other information. Your decision model needs to validate each claim against the standard lists of compatible and incompatible pairs of procedures and diagnoses represented as ICD-10 codes. <a href="https://dmcommunity.org/challenge/challenge-april-2024/">Link</a></p>
