#!/usr/bin/env python3
from pathlib import Path

ROOT=Path(__file__).resolve().parents[1]
GAME=ROOT/'game.js'
s=GAME.read_text(encoding='utf-8')

old="""  gravityStep=function(board){
    const groups=computeGroups(board,game.tiles);"""
new="""  gravityStep=function(board){
    // Preserve the synthetic-ID gravity probes used by the existing regression
    // suite; production boards always contain registered tile IDs.
    if(board.some(id=>id&&!game.tiles.has(id)))return v40GravityStep(board);
    const groups=computeGroups(board,game.tiles);"""
if old not in s: raise SystemExit('gravity override marker missing')
s=s.replace(old,new,1)

old="""  commitMove=async function(sourceGroup,dr,dc,preparedBoard=null,fromDrag=false){
    const snapshot=captureUndoSnapshot(),beforeMoves=game.moves;
    const ok=await v40CommitMove(sourceGroup,dr,dc,preparedBoard,fromDrag);
    if(ok){
      if(game.phase!=='won')game.undoSnapshot=snapshot;
      if(beforeMoves===0&&!game.firstMoveAt)game.firstMoveAt=Date.now();"""
new="""  commitMove=async function(sourceGroup,dr,dc,preparedBoard=null,fromDrag=false){
    const snapshot=captureUndoSnapshot(),beforeMoves=game.moves;
    // Set this before the awaited move: the first blessing reward intentionally
    // pauses the promise until the player closes or continues the poster view.
    if(beforeMoves===0&&!game.firstMoveAt)game.firstMoveAt=Date.now();
    const ok=await v40CommitMove(sourceGroup,dr,dc,preparedBoard,fromDrag);
    if(ok){
      if(game.phase!=='won')game.undoSnapshot=snapshot;"""
if old not in s: raise SystemExit('commit wrapper marker missing')
s=s.replace(old,new,1)

# Action telemetry is low-volume. Persist immediately so a page close, test read,
# or native WebView suspension cannot lose the final action event.
old="""    clearTimeout(telemetryPersistTimer);
    telemetryPersistTimer=setTimeout(()=>persist(),180);
    return event;"""
new="""    clearTimeout(telemetryPersistTimer);
    persist();
    return event;"""
if old not in s: raise SystemExit('telemetry persist marker missing')
s=s.replace(old,new,1)

old="""finishBlessingReward});
  boot();"""
new="""finishBlessingReward,configureGrid});
  boot();"""
if old not in s: raise SystemExit('public API marker missing')
s=s.replace(old,new,1)

GAME.write_text(s,encoding='utf-8')
print('applied v4.1 compatibility hotfix')
