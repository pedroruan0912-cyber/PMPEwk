/* ===== Motor do desenho: toca os episódios passo a passo (abertura, falas, quadro "Cai na prova") ===== */
const $=id=>document.getElementById(id);
const stage=$('stage'),wrap=$('wrap'),player=$('player');
let cur=0,step=-1,steps=[],playing=false,token=0,timer=null,laters=[],speed=1,voiceOn=true,voice=null,started=false,finished=false,wake=null,lastU=null,voiceFails=0;
const SPEEDS=[1,1.25,1.5,2];
const store={get(k,d){try{const v=localStorage.getItem('pe-desenho-'+k);return v==null?d:JSON.parse(v)}catch(e){return d}},set(k,v){try{localStorage.setItem('pe-desenho-'+k,JSON.stringify(v))}catch(e){}}};
let seen=store.get('seen',[]);

/* ---- funções que os episódios usam ---- */
function go(id,p,dur=1.6){const a=REG[id],el=$('a-'+id);if(!a||!el)return;if(p.f!=null)p.f=p.f<0?-1:1;Object.assign(a,p);el.style.transition=`transform ${dur/speed}s ease-in-out, opacity ${Math.min(dur,.8)/speed}s ease`;el.style.transform=tfs(a);el.style.opacity=a.o}
function show(id,dur=.8){go(id,{o:1},dur)}
function hide(id,dur=.6){go(id,{o:0},dur)}
function cls(id,name,on=true){const el=$('a-'+id);if(el)el.classList.toggle(name,on)}
function later(ms,fn){const my=cur;laters.push(setTimeout(()=>{if(my===cur)fn()},ms/speed))}
function walk(id,p,dur=2.4){cls(id,'walk',true);go(id,p,dur);later(dur*1000,()=>cls(id,'walk',false))}
function boom(x,y,s=1,t=''){const g=document.createElementNS(NS,'g');g.setAttribute('transform',`translate(${x},${y}) scale(${s})`);g.innerHTML=`<g class="boom"><polygon points="${starPts(0,0,70,9,.55)}" fill="#ffd23f" stroke="#e8590c" stroke-width="6" stroke-linejoin="round"/><polygon points="${starPts(0,0,36,9,.55)}" fill="#fff"/>${t?`<text x="0" y="12" text-anchor="middle" font-size="30" fill="#b3261e">${t}</text>`:''}</g>`;stage.appendChild(g);setTimeout(()=>g.remove(),900)}
function booms(list,gap=380){list.forEach((b,i)=>later(i*gap,()=>boom(b[0],b[1],b[2]||1,b[3]||'')))}

/* ---- balões ---- */
function clearBubbles(){$('bubbles').innerHTML='';stage.querySelectorAll('.talk').forEach(e=>e.classList.remove('talk'))}
function say(id,text,x,y){const a=REG[id];if(x==null&&!a)return;const bx=x!=null?x:a.x,by=y!=null?y:a.y-a.h*a.s-10;
  const d=document.createElement('div');d.className='bub';d.textContent=text;d.style.left=Math.max(18,Math.min(82,bx/12.8))+'%';d.style.top=Math.max(15,by/7.2)+'%';$('bubbles').appendChild(d);cls(id,'talk',true)}

/* ---- voz ----
   1º: gravação com voz neural (pasta historia-voz/, um arquivo por episódio, carregado sob demanda);
   2º: se a gravação não existir ou não tocar, a voz do próprio navegador; 3º: só a legenda, no mesmo ritmo. */
const VOZ={},vozSt={},VOZ_DIR='historia-voz/';
window.VOZ_LOAD=function(id,d){VOZ[id]=d};
function hash(s){let h=5381;for(let i=0;i<s.length;i++)h=(((h<<5)+h)^s.charCodeAt(i))>>>0;return h.toString(36)}
function loadVoz(id){
  if(vozSt[id])return vozSt[id].p;
  const st=vozSt[id]={s:'load'};
  st.p=new Promise(res=>{const el=st.el=document.createElement('script');el.src=VOZ_DIR+id+'.js';el.async=true;
    el.onload=()=>{st.s=VOZ[id]?'ok':'fail';res()};el.onerror=()=>{st.s='fail';res()};document.head.appendChild(el)});
  return st.p;
}
function keepVoz(ids){Object.keys(vozSt).forEach(id=>{if(ids.includes(id))return;const st=vozSt[id];if(st.el)st.el.remove();delete vozSt[id];delete VOZ[id]})}
function clip(id,key,text){const p=VOZ[id],c=p&&p[key];return c&&c[0]===hash(text)?c[1]:null}

const au=new Audio();au.preload='auto';
const SIL='data:audio/mpeg;base64,SUQzBAAAAAAAI1RTU0UAAAAPAAADTGF2ZjYwLjE2LjEwMAAAAAAAAAAAAAAA//OEwAAAAAAAAAAAAEluZm8AAAAPAAAABgAAAwAAYGBgYGBgYGBgYGBgYGBgYICAgICAgICAgICAgICAgICAoKCgoKCgoKCgoKCgoKCgoMDAwMDAwMDAwMDAwMDAwMDA4ODg4ODg4ODg4ODg4ODg4OD/////////////////////AAAAAExhdmM2MC4zMQAAAAAAAAAAAAAAACQDwAAAAAAAAAMArPq/AQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//NExAAAAANIAAAAAExBTUUzLjEwMFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVTEFNRTMu//NExFMAAANIAAAAADEwMFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVTEFNRTMu//NExKYAAANIAAAAADEwMFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVTEFNRTMu//NExKwAAANIAAAAADEwMFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV//NExKwAAANIAAAAAFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV//NExKwAAANIAAAAAFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV';
let vol=1,unlocked=false,actx=null,gain=null,useBuf=false,bufSrc=null,noAudioTold=false;
function ctx(){if(actx)return actx;const AC=window.AudioContext||window.webkitAudioContext;if(!AC)return null;actx=new AC();gain=actx.createGain();gain.gain.value=vol;gain.connect(actx.destination);return actx}
function unlock(){
  if(unlocked){if(actx&&actx.state==='suspended')actx.resume().catch(()=>{});return}
  unlocked=true;
  /* no iPhone o volume do elemento de áudio é fixo: lá o som passa por um nó de ganho, que obedece à barra */
  try{au.volume=.5;const fixo=au.volume===1;au.volume=1;if(fixo&&ctx()){actx.createMediaElementSource(au).connect(gain);au._gain=true}}catch(e){}
  setVol(vol);
  try{au.src=SIL;const p=au.play();if(p&&p.catch)p.catch(()=>{})}catch(e){}
}
function setVol(v){vol=Math.max(0,Math.min(1,v));if(gain)gain.gain.value=vol;if(!au._gain){try{au.volume=vol}catch(e){}}}
function stopBuf(){if(bufSrc){const s=bufSrc;bufSrc=null;try{s.onended=null;s.stop()}catch(e){}}}
function playBuf(b64,my,fin,fail){
  try{
    if(!ctx()){fail();return}
    if(actx.state==='suspended')actx.resume().catch(()=>{});
    const bin=atob(b64),buf=new Uint8Array(bin.length);for(let i=0;i<bin.length;i++)buf[i]=bin.charCodeAt(i);
    const ok=ab=>{if(my!==token)return;stopBuf();const s=bufSrc=actx.createBufferSource();s.buffer=ab;s.playbackRate.value=speed;s.connect(gain);s.onended=()=>{if(bufSrc===s){bufSrc=null;if(my===token)fin()}};s.start()};
    const p=actx.decodeAudioData(buf.buffer,ok,()=>{if(my===token)fail()});if(p&&p.catch)p.catch(()=>{});
  }catch(e){fail()}
}
function playClip(b64,my,fin,fail){
  if(useBuf){playBuf(b64,my,fin,fail);return}
  const outro=()=>{if(my!==token)return;useBuf=true;playBuf(b64,my,fin,fail)};
  au.onended=()=>{if(my===token)fin()};au.onerror=outro;
  try{
    au.src='data:audio/mpeg;base64,'+b64;au.defaultPlaybackRate=speed;au.playbackRate=speed;
    if(actx&&actx.state==='suspended')actx.resume().catch(()=>{});
    const p=au.play();if(p&&p.catch)p.catch(e=>{if(my!==token||(e&&e.name==='AbortError'))return;if(e&&e.name==='NotAllowedError')fail();else outro()});
  }catch(e){outro()}
}
function pickVoice(){
  if(!('speechSynthesis' in window))return;
  const pts=v=>(/pt[-_]BR/i.test(v.lang)?10:0)+(/natural|neural|online/i.test(v.name)?8:0)+(/google/i.test(v.name)?5:0)+(/premium|enhanced|aprimorad/i.test(v.name)?4:0)+(/francisca|thalita|luciana/i.test(v.name)?2:0);
  voice=speechSynthesis.getVoices().filter(v=>/^pt/i.test(v.lang)).sort((a,b)=>pts(b)-pts(a))[0]||null;
}
function paintVoice(){const b=$('bVoice');b.setAttribute('aria-pressed',String(voiceOn));b.textContent=voiceOn?'Voz ligada':'Voz desligada'}
const FIX=[[/\bWIC\b/g,'W I C'],[/\bPMPE\b/g,'P M P E'],[/\bMCP\b/g,'M C P'],[/\bAOCP\b/g,'A O C P'],[/[“”"‘’']/g,''],[/→/g,', depois, '],[/×/g,' contra '],[/\((\d{4})[–-](\d{2,4})\)/g,'($1 a $2)'],[/(\d{4})[–-](\d{2,4})/g,'$1 a $2'],[/\bséc\. /gi,'século '],[/ = /g,' é igual a ']];
function speakable(t){FIX.forEach(f=>t=t.replace(f[0],f[1]));return t}
function browserSpeak(text,my,fin,est){
  if(my!==token)return;clearTimeout(timer);
  if(!voice){if(!noAudioTold){noAudioTold=true;$('note').textContent='A narração gravada não carregou aqui e este navegador não tem voz em português: o desenho segue pela legenda.'}timer=setTimeout(fin,est);return}
  try{
    const u=lastU=new SpeechSynthesisUtterance(speakable(text));let began=false;
    u.voice=voice;u.lang=voice.lang.replace('_','-');u.rate=Math.min(2,1.04*speed);u.volume=vol;
    u.onstart=()=>{began=true};u.onend=fin;u.onerror=()=>{if(my===token&&!began)voiceBroke();fin()};
    const sp=()=>{if(my!==token)return;speechSynthesis.speak(u)};
    if(speechSynthesis.speaking||speechSynthesis.pending){speechSynthesis.cancel();setTimeout(sp,90)}else sp();
    /* se a voz não começar (navegador bloqueou), segue só com a legenda */
    setTimeout(()=>{if(my===token&&!began){voiceBroke();try{speechSynthesis.cancel()}catch(e){}clearTimeout(timer);timer=setTimeout(fin,est)}},2600);
    timer=setTimeout(fin,est*2.4+3500);
  }catch(e){timer=setTimeout(fin,est)}
}
function narrate(text,done,key){
  const my=++token;let fired=false;clearTimeout(timer);
  const est=Math.max(2600,text.length*70)/speed;
  const fin=()=>{if(fired||my!==token)return;fired=true;clearTimeout(timer);timer=setTimeout(()=>{if(my===token&&playing)done()},380/speed)};
  if(!voiceOn){timer=setTimeout(fin,est);return}
  const id=SCENES[cur].id,st=vozSt[id];
  const viaTTS=()=>browserSpeak(text,my,fin,est);
  const viaClip=()=>{if(my!==token)return;const c=clip(id,key,text);if(!c){viaTTS();return}timer=setTimeout(fin,est*3+6000);playClip(c,my,fin,viaTTS)};
  if(st&&st.s==='load'){let desistiu=false;timer=setTimeout(()=>{desistiu=true;viaTTS()},7000);st.p.then(()=>{if(desistiu||my!==token)return;clearTimeout(timer);viaClip()})}
  else viaClip();
}
function voiceBroke(){if(++voiceFails<2)return;voice=null}
function hush(){token++;clearTimeout(timer);try{speechSynthesis.cancel()}catch(e){}try{au.pause()}catch(e){}stopBuf()}

/* ---- episódio ---- */
function epLabel(i){return i===0?'Abertura':'Episódio '+i+' de '+(SCENES.length-1)}
function itemLabel(sc){return sc.item?'Edital · item '+sc.item:(sc.tag||'')}
function loadScene(i){
  hush();laters.forEach(clearTimeout);laters=[];cur=i;step=-1;REG={};UID=0;SEED=7+i*13;clearBubbles();
  const sc=SCENES[i];stage.innerHTML=sc.art();
  steps=[{k:'title'}].concat(sc.beats.map(b=>({k:'beat',b})),sc.facts.map((f,n)=>({k:'fact',n})),sc.trap?[{k:'trap'}]:[]);
  $('hudItem').textContent=sc.item?'Item '+sc.item:(sc.tag||'');$('hudYear').textContent=sc.year||'';
  $('card').hidden=true;$('title').classList.add('off');
  $('cardEp').textContent=sc.title;$('cardFacts').innerHTML=sc.facts.map(f=>'<li></li>').join('');[...$('cardFacts').children].forEach((li,n)=>li.textContent=sc.facts[n]);
  $('cardTrapTxt').textContent=sc.trap||'';$('cardTrap').hidden=!sc.trap;$('cardTrap').classList.remove('on');
  $('now').textContent=epLabel(i)+' · '+sc.title;
  paintNav();store.set('last',i);
  const prox=SCENES[i+1]?SCENES[i+1].id:null;keepVoz(prox?[sc.id,prox]:[sc.id]);loadVoz(sc.id).then(()=>{if(cur===i&&prox)loadVoz(prox)});
}
function speech(){
  const sc=SCENES[cur],s=steps[step];
  if(s.k==='title')return{t:(cur?'Episódio '+cur+'. ':'')+sc.title+'.',k:'t',done:()=>{$('title').classList.add('off');next()}};
  if(s.k==='beat')return{t:s.b.t,k:'b'+(step-1),done:next};
  if(s.k==='fact')return{t:(s.n===0?'Cai na prova. ':'')+sc.facts[s.n],k:'f'+s.n,done:next};
  return{t:'Pegadinha da banca. '+sc.trap,k:'p',done:next};
}
function setSub(t){$('subTxt').textContent=t}
function runStep(){
  const sc=SCENES[cur],s=steps[step],sp=speech();paintBar();
  if(s.k==='title'){
    $('tItem').textContent=itemLabel(sc);$('tItem').hidden=!itemLabel(sc);$('tYear').textContent=sc.year||'';$('tName').textContent=sc.title;$('tEp').textContent=epLabel(cur);
    $('title').classList.remove('off');setSub(sc.title+'.');
    narrate(sp.t,sp.done,sp.k);
  }else if(s.k==='beat'){
    $('title').classList.add('off');clearBubbles();
    try{if(s.b.do)s.b.do()}catch(e){console.error('cena',sc.id,e)}
    if(s.b.say){const l=Array.isArray(s.b.say[0])?s.b.say:[s.b.say];l.forEach(a=>say.apply(null,a))}
    setSub(s.b.t);narrate(sp.t,sp.done,sp.k);
  }else if(s.k==='fact'){
    clearBubbles();$('card').hidden=false;const li=$('cardFacts').children[s.n];li.classList.add('on');
    setSub('Cai na prova: '+sc.facts[s.n]);narrate(sp.t,sp.done,sp.k);
  }else{
    $('card').hidden=false;[...$('cardFacts').children].forEach(li=>li.classList.add('on'));$('cardTrap').classList.add('on');
    setSub('Pegadinha da AOCP: '+sc.trap);narrate(sp.t,sp.done,sp.k);
  }
}
function next(){
  if(step+1<steps.length){step++;runStep();return}
  if(!seen.includes(SCENES[cur].id)){seen.push(SCENES[cur].id);store.set('seen',seen)}
  if(cur+1<SCENES.length){loadScene(cur+1);step=0;runStep()}
  else{pause();finished=true;setSub('Fim! Escolha um episódio na lista para rever. Boa prova!');$('bigplayTxt').textContent='Ver de novo';$('bigplay').hidden=false;paintNav()}
}
function play(){
  if(playing)return;unlock();if(finished){finished=false;loadScene(0)}
  playing=true;started=true;player.classList.remove('paused');$('bigplay').hidden=true;paintPlay();
  if(step<0){step=0;runStep()}else resume();
  try{navigator.wakeLock&&navigator.wakeLock.request('screen').then(w=>wake=w).catch(()=>{})}catch(e){}
}
function resume(){const sp=speech();narrate(sp.t,sp.done,sp.k)}
function pause(){if(!playing)return;playing=false;hush();player.classList.add('paused');paintPlay();try{wake&&wake.release();wake=null}catch(e){}}
function toggle(){playing?pause():play()}
function jump(i){i=Math.max(0,Math.min(SCENES.length-1,i));const was=playing;playing=false;finished=false;loadScene(i);if(was)play();else{player.classList.add('paused');paintPlay();setSub(SCENES[i].title+'. Aperte para assistir.')}}
function prev(){jump(step>1?cur:cur-1)}

/* ---- pintura da interface ---- */
function paintPlay(){$('icPlay').setAttribute('d',playing?'M6 4h4.5v16H6zM13.5 4H18v16h-4.5z':'M6 3.5v17l14-8.5z');$('bPlayTxt').textContent=playing?'Pausar':(started?'Continuar':'Assistir')}
function paintBar(){const bs=$('bar').children;for(let i=0;i<bs.length;i++){bs[i].className=i===cur?'cur':(seen.includes(SCENES[i].id)?'done':'');bs[i].firstChild.style.width=i===cur?Math.round(100*Math.max(0,step)/Math.max(1,steps.length))+'%':'0'}}
function paintNav(){document.querySelectorAll('#eps button').forEach(b=>{const i=+b.dataset.i;b.classList.toggle('cur',i===cur);b.classList.toggle('seen',seen.includes(SCENES[i].id));if(i===cur)b.setAttribute('aria-current','true');else b.removeAttribute('aria-current')});paintBar()}
function buildNav(){
  const eps=$('eps'),bar=$('bar');let lastG=null;
  SCENES.forEach((sc,i)=>{
    const g=sc.group||'';if(g!==lastG){const h=document.createElement('h3');h.textContent=g;eps.appendChild(h);lastG=g}
    const b=document.createElement('button');b.type='button';b.dataset.i=i;
    const n=document.createElement('span');n.className='n';n.textContent=i===0?'▶':String(i).padStart(2,'0');
    const t=document.createElement('span');t.className='t';t.textContent=sc.title;
    if(sc.year){const y=document.createElement('span');y.className='y';y.textContent=sc.year;t.appendChild(y)}
    b.append(n,t);b.addEventListener('click',()=>{playing=false;finished=false;loadScene(i);play();if(window.innerWidth<1021)wrap.scrollIntoView({behavior:'smooth',block:'start'})});eps.appendChild(b);
    const s=document.createElement('button');s.type='button';s.title=(i?i+'. ':'')+sc.title;s.setAttribute('aria-label',s.title);s.appendChild(document.createElement('i'));s.addEventListener('click',()=>{playing=false;finished=false;loadScene(i);play()});bar.appendChild(s);
  });
}
function fit(){document.documentElement.style.setProperty('--u',(stage.getBoundingClientRect().width/1280)+'px')}
function fsToggle(){const el=document.fullscreenElement;if(el){document.exitFullscreen();return}const p=player.requestFullscreen?player.requestFullscreen():null;if(p&&p.catch)p.catch(()=>{$('note').textContent='A tela cheia não está disponível aqui. Vire o celular de lado para ver maior.'})}

/* ---- início ---- */
buildNav();
speed=store.get('speed',1);if(!SPEEDS.includes(speed))speed=1;$('bSpeed').textContent=String(speed).replace('.',',')+'×';
voiceOn=store.get('voice',true);paintVoice();
setVol(store.get('vol',1));$('vol').value=Math.round(vol*100);
loadScene(Math.min(store.get('last',0),SCENES.length-1));
if(cur>0){$('bigplayTxt').textContent='Continuar do episódio '+cur;setSub('Você parou em “'+SCENES[cur].title+'”. Aperte para continuar, ou escolha outro episódio na lista.')}
$('resumo').textContent=(SCENES.length-1)+' episódios com toda a História de Pernambuco, na ordem dos 8 itens do edital de Soldado PMPE 2026 (Instituto AOCP).';
fit();new ResizeObserver(fit).observe(wrap);
if('speechSynthesis' in window){pickVoice();speechSynthesis.addEventListener('voiceschanged',pickVoice)}
$('vol').addEventListener('input',e=>{setVol(e.target.value/100);store.set('vol',vol);e.target.title='Volume: '+e.target.value+'%'});
$('bigplay').addEventListener('click',play);
$('bPlay').addEventListener('click',toggle);
$('bPrev').addEventListener('click',prev);
$('bNext').addEventListener('click',()=>jump(cur+1));
$('bVoice').addEventListener('click',()=>{voiceOn=!voiceOn;voiceFails=0;store.set('voice',voiceOn);paintVoice();if(playing){hush();resume()}});
$('bSpeed').addEventListener('click',()=>{speed=SPEEDS[(SPEEDS.indexOf(speed)+1)%SPEEDS.length];store.set('speed',speed);$('bSpeed').textContent=String(speed).replace('.',',')+'×';if(playing){hush();resume()}});
$('bFs').addEventListener('click',fsToggle);
document.addEventListener('fullscreenchange',()=>{const on=document.fullscreenElement===player;player.classList.toggle('fs',on);$('bFs').textContent=on?'Sair da tela cheia':'Tela cheia';fit()});
stage.addEventListener('click',()=>{if(started)toggle()});
document.addEventListener('keydown',e=>{if(e.target.closest('input,textarea'))return;if(e.key===' '||e.code==='Space'){if(e.target.closest('button'))return;e.preventDefault();toggle()}else if(e.key==='ArrowRight')jump(cur+1);else if(e.key==='ArrowLeft')prev();else if(e.key==='f'||e.key==='F')fsToggle()});
document.addEventListener('visibilitychange',()=>{if(document.hidden)pause()});
window.addEventListener('pagehide',hush);
