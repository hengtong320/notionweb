#!/usr/bin/env python3
from pathlib import Path
p=Path(__file__).resolve().parents[1]/'game.js'
s=p.read_text(encoding='utf-8')
old="""        locateAndSwapIntoDeckSlot(ids[1],anchor[1]+1,0);
"""
new="""        if(stage===1){
          locateAndSwapIntoDeckSlot(ids[1],anchor[1]+1,0);
        }else{
          // The third chain's missing top-right quarter waits above the shared
          // B/C cell. When B clears, gravity—not an arbitrary extra deal—drops it
          // through the two cleared cells into C's final position.
          const feederCell=rcToIdx(0,anchor[1]+1);
          locateAndSwapIntoCell(ids[1],feederCell);protectedCells.add(feederCell);
        }
"""
if old not in s: raise SystemExit('three-chain feeder marker not found')
s=s.replace(old,new,1)
p.write_text(s,encoding='utf-8')
print('fixed v3.8 seeded three-chain feeder')
