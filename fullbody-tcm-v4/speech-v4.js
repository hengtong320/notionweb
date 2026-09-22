import voiceData from './voice-map.json';
export function initSpeech(toast){
 const get=(k,d)=>{try{return localStorage.getItem(k)||d;}catch{return d;}},put=(k,v)=>{try{localStorage.setItem(k,v);}catch{}};
 const audio=new Audio();audio.preload='none';let serial=0,lastName='',lastEngine='',lastError='';
 let voice=get('atlas-voice-v4','neural'),rate=Number(get('atlas-voice-rate','1'))||1;
 const canonical=s=>String(s).replace(/^(右侧|左侧|右|左)/,'');
 function stop(){serial++;audio.pause();window.speechSynthesis?.cancel();}
 function available(){return (window.speechSynthesis?.getVoices()||[]).filter(v=>/^zh/i.test(v.lang));}
 function systemSpeak(text){const synth=window.speechSynthesis;if(!synth||!window.SpeechSynthesisUtterance){toast('当前没有可用中文语音，拼音仍可查看');return false;}const list=available(),selected=list.find(v=>v.voiceURI===voice)||list.find(v=>/Natural|Neural|Premium|Enhanced|Online|高质量|晓晓|云希/i.test(v.name))||list.find(v=>/^zh[-_]CN/i.test(v.lang))||list[0];const u=new SpeechSynthesisUtterance(text);u.lang=selected?.lang||'zh-CN';u.voice=selected||null;u.rate=rate;u.pitch=1;u.onerror=e=>{if(!['interrupted','canceled'].includes(e.error)){lastError=e.error;toast('中文语音未就绪，请选其他音色或查看拼音');}};synth.speak(u);lastEngine=selected?.name||'设备中文语音';return true;}
 function speak(text){if(!text)return false;stop();lastName=text;const ticket=serial;const key=voiceData.mapping?.[text]||voiceData.mapping?.[canonical(text)];
  if(voice==='neural'&&key){lastEngine='Kokoro 神经语音（合成）';audio.playbackRate=rate;audio.src=window.ATLAS_VOICE_INLINE?.[key]?'data:audio/mpeg;base64,'+window.ATLAS_VOICE_INLINE[key]:'./voice/'+key;audio.play().catch(e=>{if(ticket!==serial)return;lastError=String(e);toast('预制音频未能播放，改用设备中文语音');systemSpeak(text);});return true;}
  return systemSpeak(text);
 }
 function mount(container){const field=document.createElement('section');field.className='voice-settings';field.innerHTML='<h3>清晰朗读</h3><label>音色<select id="voiceChoice" aria-label="朗读音色"></select></label><label>语速<input id="voiceSpeed" type="range" min="0.75" max="1.25" step="0.05"><output id="voiceRate"></output></label><div class="v4-button-row"><button id="voiceSample">试听「寰椎」</button><button id="voiceStop">停止</button></div><small>神经语音为预制合成音频，不上传你的输入。术语读音仍以拼音核对；设备音色取决于系统。</small>';container.append(field);
 const refresh=()=>{const select=field.querySelector('#voiceChoice');select.replaceChildren();const opt=new Option(voiceData.mapping?'神经语音 · 中文女声（合成）':'设备中文语音','neural');select.add(opt);for(const v of available())select.add(new Option(v.name+' · '+v.lang,v.voiceURI));select.value=[...select.options].some(o=>o.value===voice)?voice:'neural';};refresh();window.speechSynthesis?.addEventListener('voiceschanged',refresh);field.querySelector('#voiceChoice').onchange=e=>{voice=e.target.value;put('atlas-voice-v4',voice);stop();};const range=field.querySelector('#voiceSpeed');range.value=rate;field.querySelector('#voiceRate').textContent=rate.toFixed(2)+'×';range.oninput=()=>{rate=Number(range.value);field.querySelector('#voiceRate').textContent=rate.toFixed(2)+'×';put('atlas-voice-rate',String(rate));};field.querySelector('#voiceSample').onclick=()=>speak('寰椎');field.querySelector('#voiceStop').onclick=stop;
 }
 window.addEventListener('pagehide',stop);
 return {speak,stop,mount,getState:()=>({voice,rate,lastName,lastEngine,lastError,playing:!audio.paused,currentTime:audio.currentTime,recordings:voiceData.uniqueRecordings||0,synthetic:true})};
}
