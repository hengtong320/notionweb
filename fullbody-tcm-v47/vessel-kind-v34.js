// Classify model metadata, never infer physiological oxygen content from color.
export function vesselKind(row){
 if(['artery','vein'].includes(row.category))return row.category;
 const text=[row.name,row.en,row.english,row.sourceName,row.sourceNode].join(' ').replace(/_/g,' ').toLowerCase();
 if(/valve|瓣/.test(text))return 'other';
 if(/\bveins?\b|\bvena\b|\bvenous\b|静脉/.test(text))return 'vein';
 if(/\barter(?:y|ies|ial)\b|\baorta\b|\baortic\b|动脉/.test(text))return 'artery';
 return 'other';
}
export function validVesselFilter(value){return ['all','artery','vein'].includes(value)?value:'all';}
export function vesselMatches(row,filter){return filter==='all'||!['heart','vascular','vessels'].includes(row.system)||vesselKind(row)===filter;}
