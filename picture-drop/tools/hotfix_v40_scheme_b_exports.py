#!/usr/bin/env python3
from pathlib import Path

root = Path(__file__).resolve().parents[1]
game = root / 'game.js'
s = game.read_text(encoding='utf-8')

if 'function isRealisticBlessingIndex' not in s:
    marker = "  const ALL_BLESSING_INDICES=BLESSING_CARDS.map((_,i)=>BLESSING_START+i);\n"
    if marker not in s:
        raise SystemExit('ALL_BLESSING_INDICES marker missing')
    s = s.replace(
        marker,
        marker + "  function isRealisticBlessingIndex(index){return Number.isInteger(index)&&index>=BLESSING_START&&index<BLESSING_START+REALISTIC_BLESSING_COUNT;}\n",
        1,
    )

export_marker = 'pictureCount:PICTURE_PATHS.length'
export_payload = 'realisticBlessingCount:REALISTIC_BLESSING_COUNT,isRealisticBlessingIndex'
if export_payload not in s:
    if export_marker not in s:
        raise SystemExit('window export marker missing')
    s = s.replace(export_marker, export_marker + ',' + export_payload, 1)

game.write_text(s, encoding='utf-8')
print('v4.0 Scheme B runtime exports verified')
