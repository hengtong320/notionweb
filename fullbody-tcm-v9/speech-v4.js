import voiceData from './voice-map.json';
import {speechHint,requiresReadingGuard,TERMS} from './pronunciation-v5.js';
export function initSpeech(toast){
 const get=(k,d)=>{try{return localStorage.getItem(k)||d;}catch{return d;}},put=(k,v)=>{try{localStorage.setItem(k,v);}catch{}};
 const audio=new Audio();audio.preload='none';let serial=0,lastName='',lastEngine='',lastError='',spokenText='',utterance=null;
 let voice=get('atlas-voice-v5','reading'),rate=Number(get('atlas-voice-rate','0.95'))||.95;
 const canonical=s=>String(s).replace(/^(右侧|左侧|右|左)/,'');
 function stop(){serial++;audio.pause();utterance=null;window.speechSynthesis?.cancel();}
 function available(){return (window.speechSynthesis?.getVoices()||[]).filter(v=>/^zh[-_]?/i.test(v.lang)&&!/^zh[-_](HK|TW)/i.test(v.lang));}
 function systemSpeak(text){
  const synth=window.speechSynthesis;if(!synth||!window.SpeechSynthesisUtterance){lastError='no-speech-engine';toast('当前设备没有中文语音；可直接看带声调拼音');return false;}
  const list=available(),selected=list.find(v=>v.voiceURI===voice)||list.find(v=>/Natural|Neural|Premium|Enhanced|Online|高质量|晓晓|云希/i.test(v.name))||list.find(v=>/^zh[-_]CN/i.test(v.lang))||list[0];
  if(!selected&&synth.getVoices().length){lastError='no-mandarin-voice';toast('未找到普通话音色，已停止朗读，避免用其他语言读错');return false;}
  spokenText=speechHint(text);const u=new SpeechSynthesisUtterance(spokenText);utterance=u;u.lang='zh-CN';u.voice=selected||null;u.rate=rate;u.pitch=1;
  u.onend=()=>{utterance=null;};u.onerror=e=>{utterance=null;if(!['interrupted','canceled'].includes(e.error)){lastError=e.error;toast('中文语音不可用，请查看拼音或选择设备中的普通话音色');}};
  synth.speak(u);lastEngine=(selected?.name||'设备普通话')+' · 术语读音提示';return true;
 }
 function speak(text){if(!text)return false;stop();lastName=text;lastError='';spokenText='';const ticket=serial;
  // Do not re-use known unreviewed recordings for words with ambiguous readings.
  const guarded=requiresReadingGuard(text),key=voiceData.mapping?.[text]||voiceData.mapping?.[canonical(text)];
  if(voice==='neural'&&key&&!guarded){lastEngine='旧预制合成音频（未逐词审听）';spokenText=text;audio.playbackRate=rate;audio.src=window.ATLAS_VOICE_INLINE?.[key]?'data:audio/mpeg;base64,'+window.ATLAS_VOICE_INLINE[key]:'./voice/'+key;audio.play().catch(e=>{if(ticket!==serial)return;lastError=String(e);systemSpeak(text);});return true;}
  return systemSpeak(text);
 }
 function mount(container){
  const field=document.createElement('section');field.className='voice-settings';field.innerHTML='<h3>术语朗读</h3><label>声音<select id="voiceChoice" aria-label="朗读音色"></select></label><label>语速<input id="voiceSpeed" type="range" min="0.65" max="1.15" step="0.05"><output id="voiceRate"></output></label><div class="v4-button-row"><button id="voiceSample">试听大椎</button><button id="voiceStop">停止</button></div><p class="reading-example">大椎 <b>dà zhuī</b>　龈交 <b>yín jiāo</b><br>攒竹 <b>cuán zhú</b>　郄门 <b>xì mén</b></p><small>读音优先使用普通话设备音色和术语提示；多音字不再复用旧版未核音录音。不同设备仍可能读错，带声调拼音用于核对。本版未重新生成或逐条审听全部音频。</small>';container.append(field);
  const refresh=()=>{const select=field.querySelector('#voiceChoice');select.replaceChildren(new Option('读音优先 · 设备普通话','reading'),new Option('旧预制音频 · 易错词回退普通话','neural'));for(const v of available())select.add(new Option(v.name+' · '+v.lang,v.voiceURI));select.value=[...select.options].some(o=>o.value===voice)?voice:'reading';};refresh();window.speechSynthesis?.addEventListener('voiceschanged',refresh);
  field.querySelector('#voiceChoice').onchange=e=>{voice=e.target.value;put('atlas-voice-v5',voice);stop();};const range=field.querySelector('#voiceSpeed');range.value=rate;field.querySelector('#voiceRate').textContent=rate.toFixed(2)+'×';range.oninput=()=>{rate=Number(range.value);field.querySelector('#voiceRate').textContent=rate.toFixed(2)+'×';put('atlas-voice-rate',String(rate));};field.querySelector('#voiceSample').onclick=()=>speak('大椎');field.querySelector('#voiceStop').onclick=stop;
 }
 window.addEventListener('pagehide',stop);
 return {speak,stop,mount,getState:()=>({voice,rate,lastName,spokenText,lastEngine,lastError,playing:!audio.paused||!!utterance,currentTime:audio.currentTime,recordings:voiceData.uniqueRecordings||0,synthetic:true,readingGuard:true,allAudioHumanReviewed:false})};
}
