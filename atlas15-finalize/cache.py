from pathlib import Path
import re
for name in ['index.html','evidence.html']:
    p=Path('fullbody-tcm-v15')/name
    text=p.read_text()
    text=re.sub(r'(?P<attr>src|href)="(?P<file>[^"/:?#]+\.(?:js|css))(?:\?[^"#]*)?"',lambda m:m.group('attr')+'="'+m.group('file')+'?v=15.0.2"',text)
    p.write_text(text)
print('Runtime CSS and JavaScript requests identify V15.0.2; unchanged models retain their caches')
