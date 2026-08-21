---
title: "Offering Donated Organs for Transplant"
date: 2019-03-01
tags: [healthcare, business-rules]
solutions:
  - title: RuleSpeak/SBVR
    author: Ronald G. Ross
    url: "/resources/articles/2019-03-01-offering-donated-organs-for-transplant-rulespeak-sbvr/"
  - title: BPMN/Trisotech
    author: Denis Gagné
    url: "/resources/articles/2019-03-01-offering-donated-organs-for-transplant-bpmn-trisotech/"
  - title: Drools
    author: Dr. Bob Moore
    url: "/resources/articles/2019-03-01-offering-donated-organs-for-transplant-drools/"
  - title: Drools — Part 2
    author: Dr. Bob Moore
    url: "/news-media/2019/03/challenge2019mar.bobmoore.part2_.pdf"
  - title: DT5GL
    author: Jack Jansonius
    url: "/resources/articles/2019-03-01-offering-donated-organs-for-transplant-dt5gl/"
  - title: DT5GL — Part 2
    author: Jack Jansonius
    url: "/news-media/2019/08/challenge2019mar.jansonius.part2_.pdf"
  - title: DT5GL — Part 3
    author: Jack Jansonius
    url: "/news-media/2023/11/challenge2019.march_.jjpart-3.pdf"
  - title: ALEF
    author: Marnix van Rij
    affiliation: Netherlands Tax Administration
    url: https://wendbarewetsuitvoering.pleio.nl/attachment/32863573-1863-4404-84f8-afeef7330b15
  - title: ALEF — Part 2
    author: Marnix van Rij
    affiliation: Netherlands Tax Administration
    url: "/news-media/2019/03/challenge2019mar.alef.part2.pdf"
---

This challenge, proposed by Dr. Bob Moore, is a simplified model of a real process used by the NHS Blood and Transplant service in the UK for allocating donated organs. When a heart and a pair of lungs become available, the register of waiting patients produces three ranked lists: a high-priority list of named candidates for the heart, a high-priority list of named candidates for the lungs, and a list of transplant centres that can also receive either organ on behalf of a patient they select.

Each organ is offered to the top candidate on its list; offers take real time to answer (surgeons must be consulted) and are frequently declined, in which case the organ moves to the next candidate. If *both* high-priority lists are exhausted without an accepted offer, the heart and lungs are combined into a single "heart-lung block" and offered, as a block, to transplant centres in turn — and a centre may accept the whole block, just the heart, or just the lungs, sending anything declined onward to the next centre.

The twist that makes this a stateful decisioning problem rather than a simple lookup: the heart and lung offer processes run independently and asynchronously, so a decision about "what to do next" depends on which offers are still outstanding, which have already been declined, and which have already been accepted elsewhere — the system has to track that state and decide correctly no matter which order responses arrive in. A satisfying solution should make clear where that state lives and how it's read and updated, and ideally show how the process would be triggered repeatedly (e.g. via a BPMN or CMMN flow) as responses come in over time.

Send your solutions to [DecisionManagementCommunity@gmail.com](mailto:DecisionManagementCommunity@gmail.com), or [open a pull request](https://github.com/Decision-Management-Community/dm-community/blob/main/CONTRIBUTING.md) to add yours here.
