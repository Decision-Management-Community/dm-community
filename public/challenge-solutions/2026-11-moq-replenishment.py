#!/usr/bin/env python3
"""Reproducible MILP + independent integer dynamic-programming proof."""
from math import isclose
import numpy as np
from scipy.optimize import Bounds, LinearConstraint, milp

DEMAND=(8,22,9,23,12)
INITIAL=9
CAPACITY=35
HOLD=1
# supplier E same-week 5..20 units, supplier R next-week 12..30 units
SETUP_E=20; UNIT_E=8; MOQ_E=5; MAX_E=20
SETUP_R=55; UNIT_R=5; MOQ_R=12; MAX_R=30
T=len(DEMAND)


def solve_milp():
    # contiguous variable blocks: e[0..4], r[0..4], inv[0..4], be[0..4], br[0..4]
    idx=lambda name,t: {'e':0,'r':T,'inv':2*T,'be':3*T,'br':4*T}[name]+t
    n=5*T
    c=np.zeros(n); integ=np.ones(n); lower=np.zeros(n); upper=np.full(n,np.inf)
    for t in range(T):
        for name,unit in [('e',UNIT_E),('r',UNIT_R),('inv',HOLD),('be',SETUP_E),('br',SETUP_R)]:
            c[idx(name,t)] = unit
        upper[idx('e',t)]=MAX_E
        upper[idx('r',t)]=MAX_R if t<T-1 else 0
        upper[idx('inv',t)]=CAPACITY
        upper[idx('be',t)]=1
        upper[idx('br',t)]=1 if t<T-1 else 0
    rows=[]; low=[]; up=[]
    def add(pairs,l,u):
        row=np.zeros(n)
        for var,t,val in pairs: row[idx(var,t)]+=val
        rows.append(row); low.append(l); up.append(u)
    for t,dem in enumerate(DEMAND):
        # inv_t - inv_{t-1} - e_t - r_{t-1} = -demand_t
        balance=[('inv',t,1),('e',t,-1)]
        if t: balance.extend([('inv',t-1,-1),('r',t-1,-1)])
        add(balance,(INITIAL if t==0 else 0)-dem,(INITIAL if t==0 else 0)-dem)
        # MOQ*b <= q <= MAX*b
        add([('e',t,1),('be',t,-MOQ_E)],0,np.inf)
        add([('e',t,1),('be',t,-MAX_E)],-np.inf,0)
        add([('r',t,1),('br',t,-MOQ_R)],0,np.inf)
        add([('r',t,1),('br',t,-MAX_R)],-np.inf,0)
    result=milp(c,integrality=integ,bounds=Bounds(lower,upper),constraints=LinearConstraint(np.vstack(rows),low,up),options={'mip_rel_gap':0.0})
    if not result.success or result.status!=0: raise RuntimeError(f'MILP status={result.status} {result.message}')
    if not isclose(result.fun,result.mip_dual_bound,abs_tol=1e-5):raise RuntimeError(f'Unproved MILP: {result.mip_dual_bound} vs {result.fun}')
    x=np.rint(result.x).astype(int)
    assert np.max(np.abs(result.x-x)) < 1e-7
    e=tuple(int(x[idx('e',t)]) for t in range(T))
    r=tuple(int(x[idx('r',t)]) for t in range(T))
    inventory=tuple(int(x[idx('inv',t)]) for t in range(T))
    return int(round(result.fun)),e,r,inventory,float(result.mip_dual_bound),float(result.mip_gap)


def solve_dp():
    # State at start of week t: (inventory carried from previous week,
    # regular order placed last week and arriving now).
    layer={(INITIAL,0):(0,())}
    state_counts=[len(layer)]
    state_transitions=0
    for t,demand in enumerate(DEMAND):
        new={}
        regular_choices=[0] if t==T-1 else [0,*range(MOQ_R,MAX_R+1)]
        for (prev_inv,arrival),(cost,path) in layer.items():
            for e in [0,*range(MOQ_E,MAX_E+1)]:
                inv=prev_inv+arrival+e-demand
                if not 0<=inv<=CAPACITY:continue
                for r in regular_choices:
                    state_transitions+=1
                    new_cost=cost+(UNIT_E*e+(SETUP_E if e else 0))+(UNIT_R*r+(SETUP_R if r else 0))+HOLD*inv
                    nxt=(inv,r)
                    if nxt not in new or new_cost<new[nxt][0]:
                        new[nxt]=(new_cost,path+((e,r,inv),))
        if not new:raise RuntimeError('No feasible states')
        layer=new
        state_counts.append(len(layer))
    val,path=min(layer.values(),key=lambda x:x[0]);return val,path,state_counts,state_transitions


def check_solution(e,r,inv,claimed_cost):
    previous=INITIAL; prior_regular=0; total=0
    for t,demand in enumerate(DEMAND):
        assert isinstance(e[t],int) and isinstance(r[t],int) and isinstance(inv[t],int)
        assert e[t]==0 or MOQ_E<=e[t]<=MAX_E
        assert r[t]==0 or MOQ_R<=r[t]<=MAX_R
        if t==T-1:assert r[t]==0
        actual=previous+prior_regular+e[t]-demand
        assert actual==inv[t] and 0<=actual<=CAPACITY, (t,actual,inv[t])
        total+=UNIT_E*e[t]+(SETUP_E if e[t] else 0)+UNIT_R*r[t]+(SETUP_R if r[t] else 0)+HOLD*actual
        previous=actual;prior_regular=r[t]
    assert total==claimed_cost
    return total


if __name__=='__main__':
    opt,e,r,inv,bound,gap=solve_milp()
    dpval,path,counts,transitions=solve_dp()
    assert dpval==opt,(dpval,opt)
    check_solution(e,r,inv,opt)
    check_solution(tuple(p[0] for p in path),tuple(p[1] for p in path),tuple(p[2] for p in path),dpval)
    print('Optimal cost (MILP):',opt)
    print('MILP lower bound:',bound,'gap:',gap)
    print('Independent DP optimum:',dpval,'states per layer:',counts,'feasible transitions:',transitions)
    print('WEEK DEMAND E_ORDER R_ORDER R_ARRIVAL END_INVENTORY')
    for t in range(T):print(t+1,DEMAND[t],e[t],r[t],r[t-1] if t else 0,inv[t])
    print('Validated MILP and independent DP solution.')
