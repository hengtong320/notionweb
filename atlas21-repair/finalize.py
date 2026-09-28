from pathlib import Path
p=Path('fullbody-tcm-v21')
f=p/'female-v12.js';s=f.read_text();assert 'selected=id;isolated=keepIsolated;' in s;s=s.replace('selected=id;isolated=keepIsolated;','selected=id;isolated=keepIsolated||!!row.nativeDetail;',1);s=s.replace("root.name='HRA Female Reference (separate source)'","root.name='Female teaching body (native HRA plus attributed shared reference)'");s=s.replace("organs:['respiratory','vascular','digestive','urinary','reproductive','skeletal']","organs:['respiratory','vascular','digestive','urinary','reproductive','lymphatic','skeletal']");f.write_text(s)
f=p/'layers-ui-v21.js';s=f.read_text();s=s.replace("const b=audit?.systems;","const b=audit?.systems,mc=api.getModelCounts();");s=s.replace('<td>683</td>',"<td>'+(mc.muscular||'读取中')+'</td>").replace('<td>550</td>',"<td>'+(mc.nervous||'读取中')+'</td>")
# Attach the destination before moving existing controls, so getElementById
# can still resolve them while initialization continues.
s=s.replace("actions.className='v21-mixer-actions';actions.append(","actions.className='v21-mixer-actions';custom.querySelector('h3').after(actions);actions.append(")
f.write_text(s)
f=p/'app.js';s=f.read_text();assert 'function displayError(error){' in s;s=s.replace('function displayError(error){','function displayError(error){window.__ATLAS_STARTUP_ERROR__=String(error?.stack||error);',1);f.write_text(s)
f=Path('atlas21-repair/verify.cjs');s=f.read_text();s=s.replace("await p.waitForFunction(()=>window.__ATLAS_LAYERS_V21__&&__FOOT_ATLAS__.getState().ready);","await p.waitForFunction(()=>window.__ATLAS_STARTUP_ERROR__||(window.__ATLAS_LAYERS_V21__&&__FOOT_ATLAS__.getState().ready));const startup=await p.evaluate(()=>window.__ATLAS_STARTUP_ERROR__||null);ck('Application initializes without a caught startup error',!startup,startup);")
f.write_text(s)
print('Native detail isolation, live model counts and attached save/load controls installed')
