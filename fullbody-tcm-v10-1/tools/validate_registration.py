#!/usr/bin/env python3
"""Check the completeness of a model-specific acupoint registration record.
This validates DATA CONTRACTS only. It cannot certify medical correctness,
identity/qualification of reviewers, or the authenticity of an uploaded review.
No field is promoted to clinical approval by running this program.
"""
from __future__ import annotations
import argparse, json, math, re
from pathlib import Path
from typing import Any

def errors_for(r: dict[str, Any]) -> list[str]:
    errors: list[str] = []
    required = ('code', 'side', 'standardEdition', 'standardSection', 'sourceURL',
                'posture', 'landmarkIDs', 'skinModelSHA256', 'triangleIndex',
                'barycentric', 'reviewRecords', 'measurementProtocol', 'measuredError')
    for key in required:
        if key not in r or r[key] is None or r[key] == '': errors.append('missing: '+key)
    if r.get('side') not in ('right', 'left', 'midline'): errors.append('side must be explicit')
    if not re.fullmatch(r'[0-9a-f]{64}', str(r.get('skinModelSHA256', ''))): errors.append('invalid skin model SHA256')
    if not isinstance(r.get('triangleIndex'), int) or r.get('triangleIndex', -1) < 0: errors.append('invalid triangle index')
    weights = r.get('barycentric')
    if not (isinstance(weights,list) and len(weights)==3 and all(isinstance(x,(int,float)) and math.isfinite(x) and 0<=x<=1 for x in weights) and abs(sum(weights)-1)<1e-6): errors.append('barycentric coordinates must be finite, inside triangle and sum to 1')
    if not isinstance(r.get('landmarkIDs'),list) or not r.get('landmarkIDs'): errors.append('landmarks required')
    reviews = r.get('reviewRecords', [])
    if not isinstance(reviews,list) or len(reviews)<2: errors.append('two independent external review records required')
    else:
        ids = {x.get('reviewerID') for x in reviews if isinstance(x,dict)}
        if len(ids- {None,''})<2: errors.append('reviewer IDs must be distinct')
        for review in reviews:
            if not all(review.get(x) for x in ('reviewerID','qualificationReference','reviewedAt','evidenceReference')): errors.append('incomplete review provenance')
    e = r.get('measuredError')
    if not isinstance(e,dict) or not all(isinstance(e.get(k),(int,float)) and math.isfinite(e[k]) and e[k]>=0 for k in ('median','p95','maximum')): errors.append('measured errors must not be empty or invented')
    elif not e['median']<=e['p95']<=e['maximum']: errors.append('inconsistent error distribution')
    if isinstance(e,dict) and e.get('units') != 'mm': errors.append('measurement units must be explicit mm')
    # Rendering lift is deliberately not used in surface localization.
    if r.get('positionSource') in ('legacy-navigation','interpolated-ordinal','uniform-curve-spacing'): errors.append('illustrative source is not registration')
    return errors

def main() -> int:
    ap=argparse.ArgumentParser(description=__doc__);ap.add_argument('input',type=Path);ap.add_argument('--output',type=Path);args=ap.parse_args()
    try:
        data=json.loads(args.input.read_text(encoding='utf-8'));rows=data if isinstance(data,list) else data.get('points',[])
        if not isinstance(rows,list): raise ValueError('points must be a list')
        result={'kind':'data-contract validation only','clinicalCertification':False,'records':[{'code':r.get('code'), 'errors':errors_for(r)} for r in rows]}
        result['structurallyComplete']=sum(not r['errors'] for r in result['records']);result['total']=len(rows)
        text=json.dumps(result,ensure_ascii=False,indent=2)
        if args.output: args.output.write_text(text,encoding='utf-8')
        else: print(text)
        return 0 if rows and result['structurallyComplete']==len(rows) else 1
    except (OSError,ValueError,TypeError) as exc:
        print('Invalid registration data:',exc);return 2
if __name__=='__main__': raise SystemExit(main())
