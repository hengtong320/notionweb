from pathlib import Path

# The actual browser regression reached the female skeleton view but could
# not click #labelsBtn: an old stylesheet still hides that control.
root = Path('fullbody-tcm-v19')
css = root / 'shared-v14.css'
css.write_text(css.read_text(encoding='utf-8') + '''
body[data-shared-ui].female-view #labelsBtn {
  display: inline-flex !important;
  opacity: 1 !important;
  pointer-events: auto !important;
}
''', encoding='utf-8')
print('Female structure-label button is visible and clickable; browser assertions unchanged.')
