#!/usr/bin/env python3
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
GAME = ROOT / 'game.js'
s = GAME.read_text(encoding='utf-8')

function_marker = "  function isBlessingIndex(index){return Number.isInteger(index)&&index>=BLESSING_START&&index<BLESSING_START+BLESSING_CARDS.length;}\n"
function_code = function_marker + "  function isRealisticBlessingIndex(index){return Number.isInteger(index)&&index>=BLESSING_START&&index<BLESSING_START+REALISTIC_BLESSING_COUNT;}\n"
if 'function isRealisticBlessingIndex' not in s:
    if function_marker not in s:
        raise SystemExit('isBlessingIndex marker missing')
    s = s.replace(function_marker, function_code, 1)

stage_old = "stage?.classList.toggle('is-hard',hard);stage?.classList.toggle('is-blessing',game.mode==='blessing');"
stage_new = stage_old + "stage?.classList.toggle('is-realistic-blessing',game.mode==='blessing');"
if "stage?.classList.toggle('is-realistic-blessing'" not in s:
    if stage_old not in s:
        raise SystemExit('stage class marker missing')
    s = s.replace(stage_old, stage_new, 1)

export_old = 'renderBlessingPoster,openBlessingWorks,blessingMeta,isBlessingIndex,blessingCount:'
export_new = 'renderBlessingPoster,openBlessingWorks,blessingMeta,isBlessingIndex,isRealisticBlessingIndex,blessingCount:'
if export_new not in s:
    if export_old not in s:
        raise SystemExit('window export marker missing')
    s = s.replace(export_old, export_new, 1)

GAME.write_text(s, encoding='utf-8')
print('v4.0 idempotent compatibility hotfix applied')
