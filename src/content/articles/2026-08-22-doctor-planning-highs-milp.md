---
title: "Solving Doctor Planning with HiGHS: A Binary Shift-Scheduling MILP"
date: 2026-08-22
author: "Adam DeJans Jr."
summary: "A binary shift-scheduling model for the April 2020 Doctor Planning challenge, covering all 21 weekly shifts while respecting availability, night-shift recovery, weekend, and night-limit rules."
challengeUrl: "/challenges/2020-04-doctor-planning/"
---

The April 2020 **Doctor Planning** challenge asks for a seven-day hospital roster covering an early, late, and night shift every day with five doctors. The rules combine ordinary availability with temporal logic: one shift per doctor per day, recovery after night work, weekend coupling, and a limit on Golgi's total night shifts.

This is a natural binary mixed-integer linear programming model. Each yes/no assignment becomes a binary variable, and the scheduling rules become linear constraints.

I solved the model with **HiGHS** through SciPy's `milp` interface.

## A feasible schedule returned by HiGHS

| Day | Early | Late | Night |
|---|---|---|---|
| Monday | Eustachi | Golgi | Heimlich |
| Tuesday | Eustachi | Freud | Golgi |
| Wednesday | Eustachi | Heimlich | Golgi |
| Thursday | Freud | Heimlich | Eustachi |
| Friday | Fleming | Freud | Eustachi |
| Saturday | Golgi | Freud | Fleming |
| Sunday | Freud | Golgi | Fleming |

![HiGHS schedule for the Doctor Planning challenge.](/articles/doctor-planning-highs-schedule.svg)

The schedule covers all **21 shifts** exactly once.

A quick rule check:

- **Fleming** works only Friday through Sunday.
- **Freud** never works a night shift.
- **Heimlich** does not work a weekend night shift.
- **Golgi** works exactly two night shifts, satisfying the at-most-two rule.
- Whenever a doctor works a night shift, the next day is either another night shift or a day off from early/late duty.
- Every doctor either works both Saturday and Sunday or works neither weekend day.
- No doctor works more than one shift on any day.

## MILP formulation

Define a binary variable:

```text
x[d,t,s] = 1 if doctor d works shift s on day t
           0 otherwise
```

There are five doctors, seven days, and three shifts, giving **105 binary assignment variables**.

Every shift must be covered exactly once:

```text
sum_d x[d,t,s] = 1          for every day t and shift s
```

A doctor can work at most one shift per day:

```text
sum_s x[d,t,s] <= 1         for every doctor d and day t
```

Unavailable assignments are fixed to zero. For example:

```text
x[Fleming,t,s] = 0          Monday through Thursday
x[Freud,t,Night] = 0        every day
x[Heimlich,Sat,Night] = 0
x[Heimlich,Sun,Night] = 0
```

The night-shift recovery rule can be written without a big-M. If a doctor works night on day `t`, they cannot work early or late the next day:

```text
x[d,t,Night] + x[d,t+1,Early] <= 1
x[d,t,Night] + x[d,t+1,Late]  <= 1
```

Because each doctor can work at most one shift per day, this leaves exactly the allowed alternatives: another night shift or no shift the next day.

The weekend rule is simply:

```text
sum_s x[d,Sat,s] = sum_s x[d,Sun,s]
```

and Golgi's night limit is:

```text
sum_t x[Golgi,t,Night] <= 2
```

The challenge asks only for a feasible roster, so the objective can be zero.

## Solving it with HiGHS

```python
import numpy as np
from scipy.optimize import milp, LinearConstraint, Bounds

DOCTORS = ["Fleming", "Freud", "Heimlich", "Eustachi", "Golgi"]
DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
SHIFTS = ["Early", "Late", "Night"]

idx = {
    (d, t, s): k
    for k, (d, t, s) in enumerate(
        (d, t, s)
        for d in DOCTORS
        for t in range(7)
        for s in range(3)
    )
}

n = len(idx)
rows, lower, upper = [], [], []

# Cover every shift exactly once.
for t in range(7):
    for s in range(3):
        row = np.zeros(n)
        for d in DOCTORS:
            row[idx[d, t, s]] = 1
        rows.append(row)
        lower.append(1)
        upper.append(1)

# At most one shift per doctor per day.
for d in DOCTORS:
    for t in range(7):
        row = np.zeros(n)
        for s in range(3):
            row[idx[d, t, s]] = 1
        rows.append(row)
        lower.append(-np.inf)
        upper.append(1)

# Helper for forbidden assignments.
def forbid(d, t, s):
    row = np.zeros(n)
    row[idx[d, t, s]] = 1
    rows.append(row)
    lower.append(0)
    upper.append(0)

# Availability rules.
for t in range(4):
    for s in range(3):
        forbid("Fleming", t, s)

for t in range(7):
    forbid("Freud", t, 2)

for t in [5, 6]:
    forbid("Heimlich", t, 2)

# Night today => no early or late tomorrow.
for d in DOCTORS:
    for t in range(6):
        for next_shift in [0, 1]:
            row = np.zeros(n)
            row[idx[d, t, 2]] = 1
            row[idx[d, t + 1, next_shift]] = 1
            rows.append(row)
            lower.append(-np.inf)
            upper.append(1)

# Work both weekend days or neither.
for d in DOCTORS:
    row = np.zeros(n)
    for s in range(3):
        row[idx[d, 5, s]] += 1
        row[idx[d, 6, s]] -= 1
    rows.append(row)
    lower.append(0)
    upper.append(0)

# Golgi: at most two nights.
row = np.zeros(n)
for t in range(7):
    row[idx["Golgi", t, 2]] = 1
rows.append(row)
lower.append(-np.inf)
upper.append(2)

result = milp(
    c=np.zeros(n),
    integrality=np.ones(n),
    bounds=Bounds(np.zeros(n), np.ones(n)),
    constraints=LinearConstraint(
        np.vstack(rows), np.array(lower), np.array(upper)
    ),
)
```

The model I executed contains **105 binary variables and 143 linear constraints** before presolve. HiGHS returned an optimal status with a **0.0 MIP gap** and processed one branch-and-bound node. With a zero objective, "optimal" means it found an integer-feasible roster and proved there is no objective improvement to seek.

## Why MILP fits this problem well

The scheduling rules sound procedural in English, but nearly all of them are relationships between binary choices. That is exactly the structure MILP handles well.

The important modeling trick is to avoid inventing unnecessary state. For example, the night-recovery rule does not require a separate recovery variable. Two pairwise inequalities against the next day's early and late assignments encode the rule directly.

The same model can be extended with preferences, fairness penalties, maximum weekly workloads, coverage by specialty, overtime, soft availability, or an objective minimizing undesirable assignments.

---

Solution by [Adam DeJans Jr.](https://www.adamdejans.com) using HiGHS.