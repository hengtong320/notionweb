// Terminology-specific readings. Original orthography is never changed in labels.
// "spoken" is a Mandarin homophone hint for device TTS, not a replacement name.
export const TERMS={
 '督脉':{pinyin:'dū mài',spoken:'督脉'},'任脉':{pinyin:'rèn mài',spoken:'任脉'},
 '大椎':{pinyin:'dà zhuī',spoken:'大锥'},'龈交':{pinyin:'yín jiāo',spoken:'银交'},
 '攒竹':{pinyin:'cuán zhú',spoken:'攒竹穴'},
 '阴郄':{pinyin:'yīn xì',spoken:'阴隙'},'郄门':{pinyin:'xì mén',spoken:'隙门'},
 '浮郄':{pinyin:'fú xì',spoken:'浮隙'},'蠡沟':{pinyin:'lǐ gōu',spoken:'里沟'},
 '太冲':{pinyin:'tài chōng',spoken:'太冲'},
 '骰骨':{pinyin:'tóu gǔ',spoken:'头骨'},'髂骨':{pinyin:'qià gǔ',spoken:'恰骨'},
 '跖骨':{pinyin:'zhí gǔ',spoken:'直骨'},'跗骨':{pinyin:'fū gǔ',spoken:'夫骨'},
 '桡骨':{pinyin:'ráo gǔ',spoken:'饶骨'},'肱骨':{pinyin:'gōng gǔ',spoken:'公骨'},
 '髌骨':{pinyin:'bìn gǔ',spoken:'殡骨'},'腓骨':{pinyin:'féi gǔ',spoken:'肥骨'},
 '骶骨':{pinyin:'dǐ gǔ',spoken:'底骨'},'颞骨':{pinyin:'niè gǔ',spoken:'涅骨'},
 '砧骨':{pinyin:'zhēn gǔ',spoken:'真骨'},'镫骨':{pinyin:'dèng gǔ',spoken:'凳骨'},
 '寰椎':{pinyin:'huán zhuī',spoken:'环锥'},'枢椎':{pinyin:'shū zhuī',spoken:'书锥'},
 '颈椎':{pinyin:'jǐng zhuī',spoken:'颈锥'},'胸椎':{pinyin:'xiōng zhuī',spoken:'胸锥'},
 '腰椎':{pinyin:'yāo zhuī',spoken:'腰锥'},'膻中':{pinyin:'dàn zhōng',spoken:'淡中'}
};
export function correctedPinyin(name,old=''){
 let result=String(old);const clean=String(name).replace(/[()（）]/g,'');
 const key=Object.keys(TERMS).sort((a,b)=>b.length-a.length).find(k=>clean===k);
 if(key)return TERMS[key].pinyin;
 if(clean.includes('椎'))result=result.replace(/chuí/g,'zhuī');
 if(clean.includes('郄'))result=result.replace(/qiè/g,'xì');
 // No blanket polyphone substitution: unreviewed phrases retain their recorded spelling.
 return result;
}
export function speechHint(name){
 let text=String(name).replace(/[CLT]\d+/g,'').replace(/[·（）()]/g,' ').trim();
 // Full phrase hints take priority over single-character default readings.
 for(const k of Object.keys(TERMS).sort((a,b)=>b.length-a.length))text=text.split(k).join(TERMS[k].spoken);
 text=text.replace(/椎/g,'锥').replace(/郄/g,'隙').replace(/髂/g,'恰').replace(/骰/g,'头');
 return text.replace(/\s+/g,' ').trim();
}
export function requiresReadingGuard(name){return /椎|郄|俞|髂|骰|龈|攒竹|蠡沟|太冲|跖|跗|膻/.test(name);}
