---
title: Agentic Medical Services
date: 2026-04-01
tags: [agentic-ai, business-rules, healthcare]
solutions:
  - title: OpenRules
    author: Jacob Feldman
    affiliation: OpenRules
  - title: Novus-Forge
    author: Jeremiah Connelly
    affiliation: Novus-Forge
  - title: Aletyx
    author: Alex Porcelli
    affiliation: Aletyx
  - title: Trisotech
    author: Dr. John Svirbely
    affiliation: Trisotech
  - title: Claude Skills and Python
    author: Gene Weng
  - title: DT5GL/SQL/Python
    author: Jack Jansonius
---

This challenge aims to explore how LLMs orchestrate rule-based decision services. Consider the following three loosely coupled medical services that should be used by an LLM to help a doctor determine a therapy for a patient with Acute Sinusitis.

**1. Determine Medication and Dosing**

If the patient is 18 years old or older, the therapy of choice is Amoxicillin. If the patient is younger than 18, the therapy of choice is Cefuroxime. If the patient is penicillin-allergic, the therapy of choice is Levofloxacin.

For patients between 15 and 60, the dose is 500 mg every 24 hours for 14 days. For patients younger than 15 or older than 60, the dose is 200 mg every 24 hours for 14 days. If the patient's creatinine level (PCr) > 1.4 and creatinine clearance (CCr) < 50, the dose is 200 mg every 24 hours for 14 days.

**2. Determine Creatinine Clearance**

CCr [ml/min] = ((140 − age) × Lean Body Weight [kg]) / (PCr × 72)

**3. Drug Interaction Rules**

Check if the patient is on active medications. If so, check for possible conflicts between recommended and active medications using the file `ConflictingMedications.csv`. All detected conflicts should generate the appropriate warnings.

**Example patient:** 58 years old, 78 kg, creatinine 1.85, penicillin-allergic, currently on Coumadin.

> Several solutions were submitted as external write-ups (e.g. LinkedIn articles) — see the Solutions list below. The original external links weren't reliably resolvable during migration and are omitted rather than republished as possibly-broken links. If you're one of the authors (or know a working link to your write-up), please [open a pull request](https://github.com/addejans/dm-community/blob/main/CONTRIBUTING.md) adding the `url` field back to your solution entry.
