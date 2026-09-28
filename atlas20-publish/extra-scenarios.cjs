// Extended user paths: selected organ, isolate/hide, bone pose and detail labels.
await sex('female');await choose('chest');
let selectedOrgan=await p.evaluate(()=>__ATLAS_FEMALE__.getVisibleCatalog().find(r=>r.system==='respiratory'&&/lung/i.test(r.sourceName))?.id);
ck('Female chest has a selectable sourced lung',!!selectedOrgan);
await p.evaluate(id=>__ATLAS_FEMALE__.select(id,false),selectedOrgan);await settle();
r=await read();ck('Selecting a female organ does not open an unrelated skin layer',!r.f.systems.surface.on&&r.f.selected===selectedOrgan);
await p.locator('#femaleIsolate').click();await settle();const isolatedFemale=await read();await sex('male');await sex('female');r=await read();
ck('Female selected-organ isolation restores after roundtrip',r.f.isolated&&r.f.selected===selectedOrgan&&JSON.stringify(r.actual)===JSON.stringify(isolatedFemale.actual));
await p.locator('#femaleHide').click();await settle();const hiddenFemale=await read();await sex('male');await sex('female');r=await read();ck('Female hidden-structure set restores after roundtrip',JSON.stringify(r.f.hidden)===JSON.stringify(hiddenFemale.f.hidden)&&!r.actual.some(n=>n.id===selectedOrgan));
await sex('male');await choose('chest');
selectedOrgan=await p.evaluate(()=>__ATLAS_TISSUES__.getVisibleCatalog().find(r=>r.system==='heart')?.id);ck('Male chest has a selectable sourced heart',!!selectedOrgan);
await p.evaluate(id=>__ATLAS_TISSUES__.choose(id,false),selectedOrgan);await p.locator('#tissueIsolate').click();await settle();const isolatedMale=await read();await sex('female');await sex('male');r=await read();
ck('Male selected-organ isolation and scope restore after roundtrip',r.t.isolated&&JSON.stringify(r.t.organView)===JSON.stringify(isolatedMale.t.organView)&&JSON.stringify(r.actual)===JSON.stringify(isolatedMale.actual));
await choose('bones');await p.evaluate(()=>__FOOT_ATLAS__.setExplode(25,false));await settle();const posed=await p.evaluate(()=>__FOOT_ATLAS__.captureBoneState());await sex('female');r=await read();ck('Male skeleton poses cannot leak into the female body',r.actual.every(n=>n.sex==='female'));await sex('male');const restoredPose=await p.evaluate(()=>__FOOT_ATLAS__.captureBoneState());ck('Male bone separation restores rather than moving female anatomy',restoredPose.explode===25&&JSON.stringify(restoredPose.poses)===JSON.stringify(posed.poses));await choose('surface');
