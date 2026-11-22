#!/usr/bin/env python3
"""Stigler's 77-food diet LP: independent primal and dual HiGHS certificates.

Data: Google OR-Tools Stigler diet example, Apache License 2.0.
https://github.com/google/or-tools/blob/stable/ortools/linear_solver/samples/stigler_diet.py
https://developers.google.com/optimization/lp/stigler_diet

Values in each row are *nutrient quantities per 1939 US dollar spent*.
The first nutrient's unit is thousands of kcal (so the daily requirement 3
means 3,000 kcal). This is a historical optimization exercise, not dietary advice.

Requires: numpy and scipy (with bundled HiGHS).  Run: python stigler_diet_highs.py
"""

from __future__ import annotations

import numpy as np
from scipy.optimize import linprog

# Each row: food | calories (1000 kcal), protein (g), calcium (g), iron (mg),
# vitamin A (1000 IU), B1 (mg), B2 (mg), niacin (mg), vitamin C (mg) per $1.
DATA = """\
Wheat Flour (Enriched)|44.7,1411,2,365,0,55.4,33.3,441,0
Macaroni|11.6,418,0.7,54,0,3.2,1.9,68,0
Wheat Cereal (Enriched)|11.8,377,14.4,175,0,14.4,8.8,114,0
Corn Flakes|11.4,252,0.1,56,0,13.5,2.3,68,0
Corn Meal|36,897,1.7,99,30.9,17.4,7.9,106,0
Hominy Grits|28.6,680,0.8,80,0,10.6,1.6,110,0
Rice|21.2,460,0.6,41,0,2,4.8,60,0
Rolled Oats|25.3,907,5.1,341,0,37.1,8.9,64,0
White Bread (Enriched)|15,488,2.5,115,0,13.8,8.5,126,0
Whole Wheat Bread|12.2,484,2.7,125,0,13.9,6.4,160,0
Rye Bread|12.4,439,1.1,82,0,9.9,3,66,0
Pound Cake|8,130,0.4,31,18.9,2.8,3,17,0
Soda Crackers|12.5,288,0.5,50,0,0,0,0,0
Milk|6.1,310,10.5,18,16.8,4,16,7,177
Evaporated Milk (can)|8.4,422,15.1,9,26,3,23.5,11,60
Butter|10.8,9,0.2,3,44.2,0,0.2,2,0
Oleomargarine|20.6,17,0.6,6,55.8,0.2,0,0,0
Eggs|2.9,238,1,52,18.6,2.8,6.5,1,0
Cheese (Cheddar)|7.4,448,16.4,19,28.1,0.8,10.3,4,0
Cream|3.5,49,1.7,3,16.9,0.6,2.5,0,17
Peanut Butter|15.7,661,1,48,0,9.6,8.1,471,0
Mayonnaise|8.6,18,0.2,8,2.7,0.4,0.5,0,0
Crisco|20.1,0,0,0,0,0,0,0,0
Lard|41.7,0,0,0,0.2,0,0.5,5,0
Sirloin Steak|2.9,166,0.1,34,0.2,2.1,2.9,69,0
Round Steak|2.2,214,0.1,32,0.4,2.5,2.4,87,0
Rib Roast|3.4,213,0.1,33,0,0,2,0,0
Chuck Roast|3.6,309,0.2,46,0.4,1,4,120,0
Plate|8.5,404,0.2,62,0,0.9,0,0,0
Liver (Beef)|2.2,333,0.2,139,169.2,6.4,50.8,316,525
Leg of Lamb|3.1,245,0.1,20,0,2.8,3.9,86,0
Lamb Chops (Rib)|3.3,140,0.1,15,0,1.7,2.7,54,0
Pork Chops|3.5,196,0.2,30,0,17.4,2.7,60,0
Pork Loin Roast|4.4,249,0.3,37,0,18.2,3.6,79,0
Bacon|10.4,152,0.2,23,0,1.8,1.8,71,0
Ham, smoked|6.7,212,0.2,31,0,9.9,3.3,50,0
Salt Pork|18.8,164,0.1,26,0,1.4,1.8,0,0
Roasting Chicken|1.8,184,0.1,30,0.1,0.9,1.8,68,46
Veal Cutlets|1.7,156,0.1,24,0,1.4,2.4,57,0
Salmon, Pink (can)|5.8,705,6.8,45,3.5,1,4.9,209,0
Apples|5.8,27,0.5,36,7.3,3.6,2.7,5,544
Bananas|4.9,60,0.4,30,17.4,2.5,3.5,28,498
Lemons|1,21,0.5,14,0,0.5,0,4,952
Oranges|2.2,40,1.1,18,11.1,3.6,1.3,10,1998
Green Beans|2.4,138,3.7,80,69,4.3,5.8,37,862
Cabbage|2.6,125,4,36,7.2,9,4.5,26,5369
Carrots|2.7,73,2.8,43,188.5,6.1,4.3,89,608
Celery|0.9,51,3,23,0.9,1.4,1.4,9,313
Lettuce|0.4,27,1.1,22,112.4,1.8,3.4,11,449
Onions|5.8,166,3.8,59,16.6,4.7,5.9,21,1184
Potatoes|14.3,336,1.8,118,6.7,29.4,7.1,198,2522
Spinach|1.1,106,0,138,918.4,5.7,13.8,33,2755
Sweet Potatoes|9.6,138,2.7,54,290.7,8.4,5.4,83,1912
Peaches (can)|3.7,20,0.4,10,21.5,0.5,1,31,196
Pears (can)|3,8,0.3,8,0.8,0.8,0.8,5,81
Pineapple (can)|2.4,16,0.4,8,2,2.8,0.8,7,399
Asparagus (can)|0.4,33,0.3,12,16.3,1.4,2.1,17,272
Green Beans (can)|1,54,2,65,53.9,1.6,4.3,32,431
Pork and Beans (can)|7.5,364,4,134,3.5,8.3,7.7,56,0
Corn (can)|5.2,136,0.2,16,12,1.6,2.7,42,218
Peas (can)|2.3,136,0.6,45,34.9,4.9,2.5,37,370
Tomatoes (can)|1.3,63,0.7,38,53.2,3.4,2.5,36,1253
Tomato Soup (can)|1.6,71,0.6,43,57.9,3.5,2.4,67,862
Peaches, Dried|8.5,87,1.7,173,86.8,1.2,4.3,55,57
Prunes, Dried|12.8,99,2.5,154,85.7,3.9,4.3,65,257
Raisins, Dried|13.5,104,2.5,136,4.5,6.3,1.4,24,136
Peas, Dried|20,1367,4.2,345,2.9,28.7,18.4,162,0
Lima Beans, Dried|17.4,1055,3.7,459,5.1,26.9,38.2,93,0
Navy Beans, Dried|26.9,1691,11.4,792,0,38.4,24.6,217,0
Coffee|0,0,0,0,0,4,5.1,50,0
Tea|0,0,0,0,0,0,2.3,42,0
Cocoa|8.7,237,3,72,0,2,11.9,40,0
Chocolate|8,77,1.3,39,0,0.9,3.4,14,0
Sugar|34.9,0,0,0,0,0,0,0,0
Corn Syrup|14.7,0,0.5,74,0,0,0,5,0
Molasses|9,0,10.3,244,0,1.9,7.5,146,0
Strawberry Preserves|6.4,11,0.4,7,0.2,0.2,0.4,3,0
"""

NAMES = (
    "Calories (1000 kcal)", "Protein (g)", "Calcium (g)",
    "Iron (mg)", "Vitamin A (1000 IU)", "Vitamin B1 (mg)",
    "Vitamin B2 (mg)", "Niacin (mg)", "Vitamin C (mg)",
)
REQUIREMENTS = np.array([3, 70, 0.8, 12, 5, 1.8, 2.7, 18, 75], dtype=float)


def main() -> None:
    rows = [line.split("|", 1) for line in DATA.strip().splitlines()]
    foods = [name for name, _ in rows]
    a = np.array([[float(v) for v in vals.split(",")] for _, vals in rows])
    assert a.shape == (77, 9) and len(set(foods)) == 77
    # Independent column-total comparison with the upstream 77-row dataset.
    assert np.allclose(a.sum(axis=0),
                       [741.7, 20382, 164.8, 5952, 2520.3, 509, 457.2, 5027, 25323])
    assert np.isfinite(a).all() and np.all(a >= 0)

    # Primal: min 1'x, subject to A'x >= b, x >= 0.
    # x_i is dollars per day spent on food i (not servings or pounds).
    primal = linprog(np.ones(77), A_ub=-a.T, b_ub=-REQUIREMENTS,
                     bounds=(0, None), method="highs-ds")
    assert primal.success, (primal.status, primal.message)

    # Independently solve the explicit dual: max b'y,
    # subject to Ay <= 1 and y >= 0. Use HiGHS interior point.
    dual = linprog(-REQUIREMENTS, A_ub=a, b_ub=np.ones(77),
                   bounds=(0, None), method="highs-ipm")
    assert dual.success, (dual.status, dual.message)

    x, y = primal.x, dual.x
    p_obj, d_obj = float(np.sum(x)), float(REQUIREMENTS @ y)
    supply = a.T @ x
    reduced_cost = np.ones(77) - a @ y
    primal_violation = max(0.0, float(np.max(REQUIREMENTS - supply)))
    dual_violation = max(0.0, float(np.max(-reduced_cost)))
    complementarity_x = float(np.max(np.abs(x * reduced_cost)))
    complementarity_y = float(np.max(np.abs(y * (supply - REQUIREMENTS))))
    gap = p_obj - d_obj
    assert primal_violation < 1e-7, primal_violation
    assert dual_violation < 1e-7, dual_violation
    assert abs(gap) < 1e-7, gap
    assert complementarity_x < 1e-7 and complementarity_y < 1e-7
    assert abs(p_obj * 365 - 39.6617) < 0.001  # historic published LP benchmark

    print("STIGLER DIET / TWO INDEPENDENT HIGHS OPTIMIZATIONS")
    print(f"Primal solver: {primal.message} | Dual solver: {dual.message}")
    print(f"Foods={len(foods)}, nutrient constraints={len(NAMES)}")
    print(f"Primal min cost: ${p_obj:.10f} / day = ${365*p_obj:.8f} / 365-day year")
    print(f"Dual max value:  ${d_obj:.10f} / day; primal-dual gap={gap:.3e}")
    print(f"Max primal shortfall={primal_violation:.3e}; max dual violation={dual_violation:.3e}")
    print(f"Max complementarity residuals: x*r={complementarity_x:.3e}; y*slack={complementarity_y:.3e}")
    print("\nSelected foods (dollars spent per day):")
    for name, cost in zip(foods, x):
        if cost > 1e-8:
            print(f"  {name:28} ${cost:.8f} per day  (${cost*365:.4f} per year)")
    print("\nNutrients: minimum / achieved / dual marginal $ per day per nutrient unit")
    for name, b, got, shadow in zip(NAMES, REQUIREMENTS, supply, y):
        print(f"  {name:25} {b:11.5f} / {got:11.5f} / ${shadow:.9f}")
    # Shadow prices describe local sensitivity, not arbitrary scenario changes.
    cal = 0
    local_b = REQUIREMENTS.copy()
    local_b[cal] *= 1.01
    local = linprog(np.ones(77), A_ub=-a.T, b_ub=-local_b,
                    bounds=(0, None), method="highs-ds")
    assert local.success
    predicted = float(y[cal] * (local_b[cal] - REQUIREMENTS[cal]))
    actual = float(local.fun - p_obj)
    assert abs(predicted - actual) < 1e-9
    far_b = REQUIREMENTS.copy()
    far_b[cal] *= 1.10
    far = linprog(np.ones(77), A_ub=-a.T, b_ub=-far_b,
                  bounds=(0, None), method="highs-ds")
    assert far.success
    far_actual = float(far.fun - p_obj)
    far_linear = float(y[cal] * (far_b[cal] - REQUIREMENTS[cal]))
    assert far_actual > far_linear + 1e-5
    print("\nCalories sensitivity:")
    print(f"  +1%: predicted ${predicted:.10f}/day, re-solved ${actual:.10f}/day")
    print(f"  +10%: linear prediction ${far_linear:.10f}/day, re-solved ${far_actual:.10f}/day")
    print("\nPASS: input checks, primal/dual feasibility, duality, complementarity, benchmark, sensitivity")


if __name__ == "__main__":
    main()
