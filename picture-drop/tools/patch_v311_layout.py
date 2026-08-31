from pathlib import Path
import re

ROOT = Path(__file__).resolve().parents[1]
GAME = ROOT / 'game.js'
SW = ROOT / 'sw.js'
VERSION = ROOT / 'VERSION'

text = GAME.read_text(encoding='utf-8')
old = '''    wrap.style.width = `${boardW}px`;
    wrap.style.height = `${boardH}px`;
    dom.deckArea.style.width = `${boardW}px`;
    const status = dom.board.closest('.game-area')?.querySelector('.status-row');
    if (status) status.style.width = `${boardW}px`;
    dom.board.style.setProperty('--live-board-w', `${boardW}px`);
    dom.board.style.setProperty('--live-board-h', `${boardH}px`);'''
new = '''    // CSS uses !important on the wrapper, so update the custom properties
    // that those rules consume instead of relying only on inline width/height.
    document.documentElement.style.setProperty('--board-w', `${boardW}px`);
    document.documentElement.style.setProperty('--board-h', `${boardH}px`);
    wrap.style.setProperty('width', `${boardW}px`, 'important');
    wrap.style.setProperty('height', `${boardH}px`, 'important');
    dom.deckArea.style.setProperty('width', `${boardW}px`, 'important');
    const status = dom.board.closest('.game-area')?.querySelector('.status-row');
    if (status) status.style.setProperty('width', `${boardW}px`, 'important');
    dom.board.style.setProperty('--live-board-w', `${boardW}px`);
    dom.board.style.setProperty('--live-board-h', `${boardH}px`);'''
if old not in text:
    raise SystemExit('updateBoardLayout sizing block not found')
text = text.replace(old, new, 1)
GAME.write_text(text, encoding='utf-8')

sw = SW.read_text(encoding='utf-8')
sw = re.sub(r"const CACHE='[^']+';", "const CACHE='jigsaw-drop-h5-v3.1.1';", sw, count=1)
SW.write_text(sw, encoding='utf-8')
VERSION.write_text('3.1.1\n', encoding='utf-8')
print('patched to 3.1.1 dynamic portrait layout')
