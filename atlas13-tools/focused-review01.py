from pathlib import Path
p=Path('fullbody-tcm-v13')
f=p/'app.js';s=f.read_text()
a="function captureCamera(){cameraTween=null;learningEnhancements?.cancelPendingFocus?.();return"
b="function stopResidualCameraMotion(){if(!controls)return;controls._sphericalDelta?.set(0,0,0);controls._panOffset?.set(0,0,0);controls._scale=1;}\nfunction captureCamera(){cameraTween=null;stopResidualCameraMotion();learningEnhancements?.cancelPendingFocus?.();return"
assert a in s;s=s.replace(a,b)
a='const d=controls.enableDamping;controls.enableDamping=false;controls.update();camera.position.fromArray(v.position);';assert a in s;s=s.replace(a,'const d=controls.enableDamping;stopResidualCameraMotion();controls.enableDamping=false;controls.update();camera.position.fromArray(v.position);')
a="if(changed&&state.ready){if(femaleViewer?.active)femaleViewer.focus();else if(learningEnhancements?.hasNavigationFocus?.())learningEnhancements.restoreNavigationFocus();else if(tissueLayer?.getState().organView){const b=tissueLayer.getState().organView;focusBounds(new THREE.Box3(new THREE.Vector3(...b[0]),new THREE.Vector3(...b[1])),{direction:camera.position.clone().sub(controls.target).normalize().toArray()});}else fitToContent(false);}needsLabelRebuild=true;"
assert a in s;s=s.replace(a,"// A resize changes projection dimensions, never ownership of the chosen camera target.\n needsLabelRebuild=true;")
f.write_text(s)
f=p/'shared-v13.js';s=f.read_text();a="function showSection(s){section=s;";assert a in s;s=s.replace(a,"function showSection(s){const held=captureCamera();section=s;");a="document.body.classList.remove('detail-open');}}";assert a in s;s=s.replace(a,"document.body.classList.remove('detail-open');}restoreCamera(held);}",1);f.write_text(s)
f=p/'README.md';s=f.read_text().replace('长强、大椎、龈交、郄门、阴郄、膻中生成专项消歧合成音频','长强、大椎、龈交、郄门、阴郄使用五条专项消歧合成音频');f.write_text(s)
f=Path('atlas13-tools/verify.cjs');s=f.read_text();a="same(first,await cam(page)));";assert a in s;s=s.replace(a,"same(first,await cam(page)),{before:first,after:await cam(page)});");f.write_text(s)
print('CAMERA_LAYOUT_GUARD_READY')
