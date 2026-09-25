// One terminology source for the 3D viewer, search, evidence, speech hints and export.
// Consistency is machine-checked; pronunciation/clinical review remains a separate task.
import {BONES as RAW_BONES,GROUPS,SOURCES} from './bones-data.js';
import {BONE_PINYIN} from './bone-pinyin.js';
import {ACUPOINTS,MERIDIANS} from './acupoints-data.js';
import {REFERENCES} from './reference-data.js';
import RAW_DATA from './evidence-data-v9.json';
import {correctedPinyin,speechHint,requiresReadingGuard} from './pronunciation-v5.js';
export {GROUPS,SOURCES};
export const normalizeTerm=s=>String(s??'').normalize('NFD').replace(/[\u0300-\u036f\s·]/g,'').toLowerCase();
const EXACT={GV1:{pinyin:'cháng qiáng',spokenText:'常强',aliases:['长强穴']},GV14:{pinyin:'dà zhuī',spokenText:'大锥'},GV28:{pinyin:'yín jiāo',spokenText:'银交'},BL2:{pinyin:'cuán zhú',spokenText:'攒竹穴'},PC4:{pinyin:'xì mén',spokenText:'隙门'},HT6:{pinyin:'yīn xì',spokenText:'阴隙'},BL38:{pinyin:'fú xì',spokenText:'浮隙'},LR5:{pinyin:'lǐ gōu',spokenText:'里沟'},CV17:{pinyin:'dàn zhōng',spokenText:'淡中'},KI27:{pinyin:'shū fǔ',spokenText:'书府'}};
const ALL={};
const makeTerm=(id,name,pinyin,kind,extra={})=>{const override=EXACT[id]||{};return {id,name,kind,pinyin:override.pinyin||correctedPinyin(name,pinyin||''),aliases:extra.aliases||[],spokenText:override.spokenText||speechHint(name),readingGuard:!!override.spokenText||requiresReadingGuard(name),audioHumanReviewed:false,terminologyReview:'consistent-catalog; not fully human-audited',...extra,...override};};
export const BONES=RAW_BONES.map(b=>{const t=makeTerm(b.id,b.name,BONE_PINYIN[b.id]||b.pinyin,'bone');ALL[b.id]=t;return {...b,pinyin:t.pinyin};});
export const BY_ID=Object.fromEntries(BONES.map((b,i)=>[b.id,{...b,index:i+1}]));
export const POINT_TERMS=Object.fromEntries(ACUPOINTS.map(p=>{const r=RAW_DATA.points[p.code]||p,t=makeTerm(p.code,r.name||p.name,r.pinyin||p.pinyin,'point',{meridian:p.meridian,aliases:r.aliases||[]});ALL[p.code]=t;return[p.code,t];}));
for(const p of REFERENCES.filter(p=>p.meridian==='EX'))ALL[p.code]=makeTerm(p.code,p.name,p.pinyin,'point',{meridian:'EX'});
for(const m of MERIDIANS)ALL[m.id]=makeTerm(m.id,m.name,m.pinyin,'meridian');
export const ALL_TERMS=ALL;
export function lookupTerm(value){if(ALL[value])return ALL[value];return Object.values(ALL).find(t=>t.name===value||t.aliases.includes(value));}
export function canonicalPoint(p){const t=POINT_TERMS[p.code]||ALL[p.code];return t?{...p,name:t.name,pinyin:t.pinyin,aliases:t.aliases,spokenText:t.spokenText}:p;}
export const evidenceData={...RAW_DATA,points:Object.fromEntries(Object.entries(RAW_DATA.points).map(([id,p])=>[id,{...p,...{name:POINT_TERMS[id]?.name||p.name,pinyin:POINT_TERMS[id]?.pinyin||p.pinyin}}]))};
export const termAudit={version:'11.0.0',source:'catalog-v10',boneCount:BONES.length,pointCount:Object.keys(POINT_TERMS).length,changes:Object.entries(evidenceData.points).filter(([id,p])=>RAW_DATA.points[id].pinyin!==p.pinyin||RAW_DATA.points[id].name!==p.name).map(([id,p])=>({id,name:p.name,before:RAW_DATA.points[id].pinyin,after:p.pinyin})),allAudioHumanReviewed:false,clinicalCalibration:false};
