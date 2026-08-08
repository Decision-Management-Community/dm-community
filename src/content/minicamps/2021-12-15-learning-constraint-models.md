---
title: Learning Executable Constraint Models from Positive and Negative Examples
date: 2021-12-15
speaker: Helmut Simonis
affiliation: Insight Research Centre for Data Analytics
recordingUrl: https://youtu.be/GsBDkPyZkDg
---

We discuss how to learn constraint models for combinatorial problems from positive and negative
example solutions. The constraints learned are either structural, coming from the perceived
problem structure of the model, or based on input data which provide parameters and index sets.
The learning process uses information about global constraints from the Global Constraint
Catalogue, and defines a set of constraint patterns to discover conjunctions of similar
constraints over common data structures. The CAT tool generates constraint models in MiniZinc,
which can then be run by a variety of back-end solvers; it also produces a human-readable
description of the generated constraint model. It was tested on the benchmark problems of the
PTHG21 Challenge.
