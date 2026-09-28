from pathlib import Path
p=Path('fullbody-tcm-v21')
f=p/'female-v12.js';s=f.read_text();assert 'selected=id;isolated=keepIsolated;' in s;s=s.replace('selected=id;isolated=keepIsolated;','selected=id;isolated=keepIsolated||!!row.nativeDetail;',1);f.write_text(s)
f=p/'layers-ui-v21.js';s=f.read_text();s=s.replace("const b=audit?.systems;","const b=audit?.systems,mc=api.getModelCounts();");s=s.replace('<td>683</td>',"<td>'+(mc.muscular||'读取中')+'</td>").replace('<td>550</td>',"<td>'+(mc.nervous||'读取中')+'</td>");f.write_text(s)
print('Native details isolate on selection; model counts read from actual catalogs')
