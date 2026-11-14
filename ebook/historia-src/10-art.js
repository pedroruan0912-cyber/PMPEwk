'use strict';
/* ===== Biblioteca de desenho: tudo é SVG gerado por funções (palco 1280 x 720) ===== */
const NS='http://www.w3.org/2000/svg';
const OL='#2b1b12';
const ST=`stroke="${OL}" stroke-width="4" stroke-linejoin="round" stroke-linecap="round"`;
const ST3=`stroke="${OL}" stroke-width="3" stroke-linejoin="round" stroke-linecap="round"`;
const SCENES=[];
let REG={},UID=0,SEED=7;
function R(){SEED=(SEED*16807)%2147483647;return (SEED%10000)/10000}
function pick(a){return a[Math.floor(R()*a.length)]}
function tfs(a){return `translate(${a.x}px,${a.y}px) rotate(${a.r}deg) scale(${a.s*a.f},${a.s})`}
/* ator: grupo com id, que os episódios movem, mostram e escondem */
function act(id,x,y,inner,o={}){
  const a=REG[id]={x,y,s:o.s||1,f:o.f?-1:1,o:o.o==null?1:o.o,r:o.r||0,h:o.h==null?205:o.h};
  return `<g id="a-${id}" class="act${o.cls?' '+o.cls:''}" style="transform:${tfs(a)};opacity:${a.o}">${inner}</g>`;
}
function at(x,y,inner,s=1,f=0){return `<g transform="translate(${x},${y}) scale(${f?-s:s},${s})">${inner}</g>`}
function ln(d,c,w){return `<path d="${d}" fill="none" stroke="${OL}" stroke-width="${w+5}" stroke-linecap="round" stroke-linejoin="round"/><path d="${d}" fill="none" stroke="${c}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round"/>`}
function starPts(cx,cy,r,n=5,k=.42){let p='';for(let i=0;i<n*2;i++){const a=Math.PI*i/n-Math.PI/2,q=i%2?r*k:r;p+=`${(cx+q*Math.cos(a)).toFixed(1)},${(cy+q*Math.sin(a)).toFixed(1)} `}return p}
function star(cx,cy,r,c='#f6c21c',n=5){return `<polygon points="${starPts(cx,cy,r,n)}" fill="${c}"/>`}

/* ---------- céu, mar, chão ---------- */
function sky(k='day'){
  const P={day:['#69c6f2','#d6f1ff'],dawn:['#ff9e6b','#ffe7bd'],sunset:['#ef5d3a','#ffd07a'],night:['#0d1640','#3b3f8f'],storm:['#566273','#a9b5c0'],sertao:['#f6bd4a','#fdeab0'],room:['#e9d7b0','#f6ead0'],paper:['#f3e3b8','#f8eed3']}[k];
  const id='sk'+(UID++);
  return `<defs><linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${P[0]}"/><stop offset="1" stop-color="${P[1]}"/></linearGradient></defs><rect width="1280" height="720" fill="url(#${id})"/>`;
}
function sun(x,y,r=58,c='#ffd23f'){
  let rays='';for(let i=0;i<12;i++){const a=i*30;rays+=`<path d="M0,${-r-14} L7,${-r-42} L-7,${-r-42}Z" fill="${c}" transform="rotate(${a})"/>`}
  return `<g transform="translate(${x},${y})"><g class="rays">${rays}</g><circle r="${r}" fill="${c}" stroke="#e8950c" stroke-width="5"/></g>`;
}
function moon(x,y,r=46){return `<g transform="translate(${x},${y})"><circle r="${r}" fill="#fff6c9" stroke="#d9c873" stroke-width="4"/><circle cx="${-r*.3}" cy="${-r*.2}" r="${r*.16}" fill="#e9dc9a"/><circle cx="${r*.25}" cy="${r*.3}" r="${r*.12}" fill="#e9dc9a"/></g>`}
function stars(n=40){let s='';for(let i=0;i<n;i++)s+=`<circle class="tw" style="animation-delay:${(R()*2).toFixed(2)}s" cx="${Math.round(R()*1280)}" cy="${Math.round(R()*330)}" r="${(1.5+R()*2).toFixed(1)}" fill="#fff"/>`;return s}
function cloud(x,y,s=1,c='#ffffff'){return `<g transform="translate(${x},${y}) scale(${s})"><g class="drift" style="animation-duration:${30+Math.round(R()*30)}s"><ellipse cx="0" cy="0" rx="60" ry="26" fill="${c}"/><ellipse cx="-44" cy="10" rx="40" ry="20" fill="${c}"/><ellipse cx="46" cy="10" rx="44" ry="20" fill="${c}"/><ellipse cx="10" cy="-18" rx="36" ry="22" fill="${c}"/></g></g>`}
function clouds(){return cloud(180,110,1)+cloud(620,70,.8)+cloud(980,150,1.1)}
function wave(y,c,dur,amp=10){let d=`M-160,${y}`;for(let x=-160;x<1440;x+=80)d+=` q20,${-amp} 40,0 t40,0`;d+=` V760 H-160 Z`;return `<path class="wv" style="animation-duration:${dur}s" d="${d}" fill="${c}"/>`}
function sea(y=440){return wave(y,'#2f93da',7)+wave(y+38,'#1f7fc6',5,8)+wave(y+84,'#186db2',6,9)+wave(y+140,'#135f9f',4.5,8)}
function land(d,c,c2){return `<path d="${d}" fill="${c}" stroke="${c2||OL}" stroke-width="4" stroke-linejoin="round"/>`}
function beach(y=560){return land(`M-10,${y+10} Q200,${y-34} 480,${y-6} T900,${y-10} T1290,${y-26} V730 H-10Z`,'#f4e0a1','#d9bf74')}
function field(y=470,c='#63b04d',c2='#4a913a'){return land(`M-10,${y+8} Q320,${y-22} 640,${y} T1290,${y-8} V730 H-10Z`,c,c2)}
function hill(cx,cy,rx,ry,c='#4f9f44',c2='#3c8234'){return `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="${c}" stroke="${c2}" stroke-width="4"/>`}
function pave(y=500,c='#cdbf9f'){return `<rect x="-10" y="${y}" width="1300" height="${730-y}" fill="${c}"/><path d="M-10,${y} H1290" stroke="#a8996f" stroke-width="5"/>`}
function dark(id='noite',c='#0a1030'){return act(id,0,0,`<rect width="1280" height="720" fill="${c}"/>`,{o:0,h:0})}

/* ---------- plantas ---------- */
function palm(x,y,s=1){
  const lf=a=>`<path d="M0,0 Q55,-58 128,-6 Q58,-24 0,0Z" fill="#2f9e44" ${ST3} transform="rotate(${a})"/>`;
  return `<g transform="translate(${x},${y}) scale(${s})">${ln('M0,0 Q-16,-100 10,-196','#9a6a35',13)}<g transform="translate(10,-196)"><g class="sway" style="animation-delay:${(-R()*4).toFixed(1)}s">${[-205,-165,-120,-55,-15,28].map(lf).join('')}<circle cx="-6" cy="8" r="9" fill="#6b4423" ${ST3}/><circle cx="12" cy="10" r="9" fill="#6b4423" ${ST3}/></g></g></g>`;
}
function tree(x,y,s=1,c='#2f8f3f',tr='#7a4a24'){return `<g transform="translate(${x},${y}) scale(${s})"><rect x="-11" y="-110" width="22" height="112" rx="6" fill="${tr}" ${ST}/><g class="sway" style="animation-duration:6s;animation-delay:${(-R()*5).toFixed(1)}s"><circle cx="-34" cy="-128" r="42" fill="${c}" ${ST}/><circle cx="36" cy="-132" r="44" fill="${c}" ${ST}/><circle cx="0" cy="-176" r="50" fill="${c}" ${ST}/><circle cx="0" cy="-136" r="36" fill="${c}"/></g></g>`}
function trees(list,c){return list.map(t=>tree(t[0],t[1],t[2]||1,c)).join('')}
function cactus(x,y,s=1){return `<g transform="translate(${x},${y}) scale(${s})">${ln('M0,0 V-150','#3e9b4f',22)}${ln('M0,-70 H-40 V-120','#3e9b4f',17)}${ln('M0,-95 H42 V-150','#3e9b4f',17)}</g>`}
function cane(x,y,s=1){return `<g transform="translate(${x},${y}) scale(${s})"><g class="sway" style="animation-duration:${(2.6+R()*1.6).toFixed(1)}s;animation-delay:${(-R()*3).toFixed(1)}s"><path d="M0,0 V-120" stroke="#8fbf3f" stroke-width="9" stroke-linecap="round"/><path d="M0,-40 h0 M0,-78 h0" stroke="#5f8f1f" stroke-width="12" stroke-linecap="round"/><path d="M0,-118 Q-34,-150 -58,-124 M0,-118 Q30,-158 60,-128 M0,-110 Q-10,-164 14,-176" fill="none" stroke="#3f9a3a" stroke-width="8" stroke-linecap="round"/></g></g>`}
function canefield(x0,x1,y,s=1,step=34){let o='';for(let x=x0;x<=x1;x+=step)o+=cane(x+Math.round(R()*12),y+Math.round(R()*14),s*(.85+R()*.3));return o}
function cotton(x,y,s=1){return `<g transform="translate(${x},${y}) scale(${s})"><path d="M0,0 V-60 M0,-30 L-24,-56 M0,-36 L26,-62" stroke="#6b8f3a" stroke-width="6" stroke-linecap="round" fill="none"/><circle cx="0" cy="-70" r="15" fill="#fff" ${ST3}/><circle cx="-26" cy="-62" r="13" fill="#fff" ${ST3}/><circle cx="28" cy="-68" r="13" fill="#fff" ${ST3}/></g>`}

/* ---------- construções ---------- */
function oca(x,y,s=1){return `<g transform="translate(${x},${y}) scale(${s})"><path d="M-80,0 Q-76,-112 0,-120 Q76,-112 80,0Z" fill="#c9983f" ${ST}/><path d="M-50,-70 Q0,-90 50,-70 M-66,-36 Q0,-56 66,-36" fill="none" stroke="#9a6f25" stroke-width="4"/><path d="M-18,0 V-44 Q0,-60 18,-44 V0Z" fill="#4a3018" ${ST3}/></g>`}
function church(x,y,s=1,o={}){const c=o.c||'#fdf8ea';return `<g transform="translate(${x},${y}) scale(${s})">
  <rect x="56" y="-212" width="62" height="212" fill="${c}" ${ST}/><path d="M50,-212 L87,-268 L124,-212Z" fill="#b5532f" ${ST}/><path d="M87,-268 V-300 M74,-288 H100" stroke="${OL}" stroke-width="6" stroke-linecap="round"/><path d="M76,-170 a11,11 0 0 1 22,0 v24 h-22z" fill="#3a6fa5" ${ST3}/>
  <rect x="-80" y="-138" width="140" height="138" fill="${c}" ${ST}/><path d="M-88,-138 L-10,-204 L68,-138Z" fill="${c}" ${ST}/><circle cx="-10" cy="-160" r="13" fill="#3a6fa5" ${ST3}/><path d="M-32,0 V-56 a22,22 0 0 1 44,0 V0Z" fill="#7a4a24" ${ST}/><rect x="-66" y="-104" width="20" height="34" rx="9" fill="#3a6fa5" ${ST3}/><rect x="26" y="-104" width="20" height="34" rx="9" fill="#3a6fa5" ${ST3}/></g>`}
function sobrados(x,y,n=5,s=1,pal){
  pal=pal||['#f2a65a','#f7d06a','#8ecae6','#f28482','#b8e0a8','#e8c2f0','#fdf8ea'];let o='',cx=0;
  for(let i=0;i<n;i++){const w=66+Math.round(R()*18),h=150+Math.round(R()*70),c=pal[(i*3+Math.floor(R()*2))%pal.length];
    o+=`<g transform="translate(${cx},0)"><rect x="0" y="${-h}" width="${w}" height="${h}" fill="${c}" ${ST}/><path d="M-6,${-h} L${w/2},${-h-30} L${w+6},${-h}Z" fill="#b5532f" ${ST}/>`;
    for(let f=0;f<Math.floor((h-70)/58);f++)o+=`<rect x="${w*.16}" y="${-h+20+f*58}" width="${w*.24}" height="34" rx="4" fill="#fff" ${ST3}/><rect x="${w*.6}" y="${-h+20+f*58}" width="${w*.24}" height="34" rx="4" fill="#fff" ${ST3}/>`;
    o+=`<path d="M${w*.34},0 V-46 a${w*.16},${w*.16} 0 0 1 ${w*.32},0 V0Z" fill="#5a3a22" ${ST3}/></g>`;cx+=w;}
  return `<g transform="translate(${x},${y}) scale(${s})">${o}</g>`;
}
function casaGrande(x,y,s=1){let col='';for(let i=0;i<6;i++)col+=`<rect x="${-150+i*58}" y="-92" width="12" height="92" fill="#fdf8ea" ${ST3}/>`;
  return `<g transform="translate(${x},${y}) scale(${s})"><rect x="-150" y="-150" width="302" height="150" fill="#fdf8ea" ${ST}/><path d="M-176,-150 L-110,-216 H112 L178,-150Z" fill="#b5532f" ${ST}/><path d="M-176,-92 H178 L160,-112 H-158Z" fill="#c9683f" ${ST3}/>${[-110,-52,52,110].map(v=>`<rect x="${v-14}" y="-72" width="28" height="44" fill="#3a6fa5" ${ST3}/>`).join('')}<rect x="-18" y="-66" width="36" height="66" fill="#7a4a24" ${ST3}/>${col}<path d="M-60,0 h120 l14,16 h-148z" fill="#d9cfb8" ${ST3}/></g>`}
function senzala(x,y,s=1){return `<g transform="translate(${x},${y}) scale(${s})"><rect x="-130" y="-58" width="260" height="58" fill="#c9a26b" ${ST}/><path d="M-144,-58 L-118,-96 H118 L144,-58Z" fill="#a9843f" ${ST}/>${[-96,-32,32,96].map(v=>`<rect x="${v-12}" y="-40" width="24" height="40" fill="#4a3018" ${ST3}/>`).join('')}</g>`}
function smoke(x,y,s=1,c='#e6e6e6'){return `<g transform="translate(${x},${y}) scale(${s})">${[0,1,2].map(i=>`<circle class="puff" style="animation-delay:${-i}s" cx="${i*6-6}" cy="0" r="18" fill="${c}"/>`).join('')}</g>`}
function fire(x,y,s=1){return `<g transform="translate(${x},${y}) scale(${s})"><g class="flick"><path d="M0,0 Q-44,-30 -18,-72 Q-14,-48 -2,-58 Q-10,-96 14,-124 Q16,-84 34,-66 Q52,-36 0,0Z" fill="#f2681c" stroke="#b3261e" stroke-width="4" stroke-linejoin="round"/><path d="M2,-4 Q-20,-24 -4,-48 Q4,-36 8,-62 Q30,-32 2,-4Z" fill="#ffd23f"/></g></g>`}
function moenda(x,y,s=1){let sp='';for(let i=0;i<8;i++)sp+=`<path d="M0,0 V-62" stroke="${OL}" stroke-width="5" transform="rotate(${i*45})"/><rect x="-9" y="-76" width="18" height="16" fill="#8a5a2b" ${ST3} transform="rotate(${i*45})"/>`;
  return `<g transform="translate(${x},${y}) scale(${s})"><rect x="-40" y="-190" width="30" height="190" fill="#b9735a" ${ST}/>${smoke(-25,-196,1)}<rect x="-70" y="-100" width="200" height="100" fill="#e8d5a8" ${ST}/><path d="M-86,-100 L30,-150 L146,-100Z" fill="#b5532f" ${ST}/><g transform="translate(150,-64)"><g class="spin"><circle r="62" fill="none" stroke="#8a5a2b" stroke-width="12"/><circle r="62" fill="none" stroke="${OL}" stroke-width="3"/>${sp}<circle r="12" fill="#5e3b1a" ${ST3}/></g></g><rect x="-30" y="-60" width="50" height="60" fill="#4a3018" ${ST3}/></g>`}
function fort(x,y,s=1,c='#b9b2a5'){let bt='';for(let i=0;i<7;i++)bt+=`<rect x="${-140+i*42}" y="-128" width="26" height="24" fill="${c}" ${ST3}/>`;
  return `<g transform="translate(${x},${y}) scale(${s})"><path d="M-160,0 L-140,-106 H140 L160,0Z" fill="${c}" ${ST}/>${bt}<path d="M-26,0 V-52 a26,26 0 0 1 52,0 V0Z" fill="#4a3018" ${ST}/><path d="M-110,-60 h30 M60,-70 h34 M-70,-30 h26 M84,-28 h30" stroke="#8f887b" stroke-width="4" stroke-linecap="round"/></g>`}
function palisade(x,y,w=260,hh=70){let o='';for(let i=0;i<w/20;i++)o+=`<path d="M${i*20},0 V${-hh+6} l9,-14 9,14 V0Z" fill="#a9743f" ${ST3}/>`;return `<g transform="translate(${x},${y})">${o}</g>`}
function palace(x,y,s=1){const tw=px=>`<rect x="${px}" y="-250" width="62" height="250" fill="#fdf8ea" ${ST}/><path d="M${px-8},-250 L${px+31},-330 L${px+70},-250Z" fill="#3a6fa5" ${ST}/>${[0,1,2].map(i=>`<rect x="${px+20}" y="${-226+i*62}" width="22" height="34" rx="10" fill="#3a6fa5" ${ST3}/>`).join('')}`;
  return `<g transform="translate(${x},${y}) scale(${s})">${tw(-150)}${tw(88)}<rect x="-90" y="-150" width="180" height="150" fill="#fdf8ea" ${ST}/><path d="M-100,-150 L0,-200 L100,-150Z" fill="#b5532f" ${ST}/>${[-62,-20,22,62].map(v=>`<rect x="${v-10}" y="-124" width="20" height="36" rx="9" fill="#3a6fa5" ${ST3}/>`).join('')}<path d="M-22,0 V-50 a22,22 0 0 1 44,0 V0Z" fill="#7a4a24" ${ST}/></g>`}
function teatro(x,y,s=1,c='#f6d7c4'){let col='';for(let i=0;i<6;i++)col+=`<rect x="${-128+i*48}" y="-130" width="16" height="130" fill="#fdf8ea" ${ST3}/>`;
  return `<g transform="translate(${x},${y}) scale(${s})"><rect x="-170" y="-150" width="340" height="150" fill="${c}" ${ST}/><path d="M-150,-134 L0,-210 L150,-134Z" fill="#fdf8ea" ${ST}/><rect x="-150" y="-140" width="300" height="14" fill="#fdf8ea" ${ST3}/>${col}<path d="M-190,0 h380 l-14,-14 h-352z" fill="#d9cfb8" ${ST3}/></g>`}
function bridge(x,y,w=460){let a='';const n=Math.round(w/115);for(let i=0;i<n;i++)a+=`<path d="M${i*w/n+12},40 V16 a${w/n/2-12},30 0 0 1 ${w/n-24},0 V40Z" fill="#2a6da8"/>`;
  return `<g transform="translate(${x},${y})"><rect x="0" y="-18" width="${w}" height="58" fill="#c9b99a" ${ST}/>${a}<path d="M0,-18 H${w}" stroke="${OL}" stroke-width="6"/>${Array.from({length:n+1},(_,i)=>`<rect x="${i*w/n-6}" y="-40" width="12" height="24" fill="#c9b99a" ${ST3}/>`).join('')}</g>`}
function usina(x,y,s=1){return `<g transform="translate(${x},${y}) scale(${s})"><rect x="70" y="-260" width="38" height="260" fill="#b5532f" ${ST}/>${smoke(89,-266,1.2,'#bdbdbd')}<rect x="-130" y="-110" width="230" height="110" fill="#c9683f" ${ST}/><path d="M-130,-110 l40,-34 v34 l40,-34 v34 l40,-34 v34 l40,-34 v34" fill="#c9683f" ${ST}/>${[-100,-50,0,50].map(v=>`<rect x="${v}" y="-72" width="28" height="34" fill="#ffe9a8" ${ST3}/>`).join('')}</g>`}
function predio(x,y,w=90,h=260,c='#9fb4cc'){let wn='';for(let r=0;r<Math.floor(h/36)-1;r++)for(let k=0;k<Math.floor(w/28);k++)wn+=`<rect x="${10+k*28}" y="${-h+14+r*36}" width="16" height="20" fill="#e9f4ff"/>`;return `<g transform="translate(${x},${y})"><rect x="0" y="${-h}" width="${w}" height="${h}" fill="${c}" ${ST}/>${wn}</g>`}
function skyline(y=470){return predio(40,y,90,230,'#8fa6c2')+predio(140,y,70,300,'#b5c4d6')+predio(230,y,110,190,'#9fb4cc')+predio(900,y,80,280,'#b5c4d6')+predio(990,y,110,210,'#8fa6c2')+predio(1110,y,90,320,'#9fb4cc')}
function pelourinho(){return `<rect x="-26" y="-14" width="52" height="14" fill="#b9b2a5" ${ST3}/><rect x="-9" y="-150" width="18" height="138" fill="#d9d2c5" ${ST}/><circle cx="0" cy="-162" r="15" fill="#d9d2c5" ${ST}/><path d="M-30,-128 h60" stroke="${OL}" stroke-width="6" stroke-linecap="round"/>`}
function cannon(){return `<circle cx="0" cy="-22" r="22" fill="#6b4423" ${ST}/><circle cx="0" cy="-22" r="6" fill="${OL}"/><path d="M-10,-40 L92,-66 L98,-44 L-4,-20Z" fill="#4a4f57" ${ST}/>`}
function cart(){return `<rect x="-70" y="-64" width="140" height="40" fill="#a9743f" ${ST}/><g transform="translate(0,-22)"><g class="spin" style="animation-duration:3s"><circle r="24" fill="#6b4423" ${ST}/><path d="M-24,0 H24 M0,-24 V24" stroke="${OL}" stroke-width="4"/></g></g>${[-44,-16,12,40].map(v=>`<path d="M${v},-64 v-34" stroke="#8fbf3f" stroke-width="9" stroke-linecap="round"/>`).join('')}`}
function sugarLoaf(x,y,s=1){return `<path transform="translate(${x},${y}) scale(${s})" d="M-22,0 Q-20,-56 0,-66 Q20,-56 22,0Z" fill="#fffdf5" ${ST3}/>`}
function crate(x,y,t){return `<g transform="translate(${x},${y})"><rect x="-34" y="-50" width="68" height="50" fill="#b9853f" ${ST}/><path d="M-34,-25 H34" stroke="${OL}" stroke-width="3"/>${t?`<text x="0" y="-30" text-anchor="middle" font-size="15" fill="${OL}">${t}</text>`:''}</g>`}
function easel(){return `<path d="M-30,0 L0,-120 L30,0 M0,-120 V6" stroke="#7a4a24" stroke-width="7" stroke-linecap="round" fill="none"/><rect x="-44" y="-128" width="88" height="68" fill="#fdf8ea" ${ST}/><rect x="-40" y="-88" width="80" height="24" fill="#63b04d"/><rect x="-40" y="-124" width="80" height="36" fill="#8ecae6"/><path d="M-6,-70 v-40 q16,-12 30,2" stroke="#2f9e44" stroke-width="5" fill="none"/>`}
function urna(){return `<rect x="-38" y="-70" width="76" height="70" fill="#3a6fa5" ${ST}/><rect x="-22" y="-78" width="44" height="10" rx="4" fill="${OL}"/><text x="0" y="-26" text-anchor="middle" font-size="22" fill="#fff">VOTO</text>`}
function trem(){return `<rect x="-150" y="-70" width="120" height="52" fill="#7a2f2f" ${ST}/><rect x="-140" y="-60" width="26" height="22" fill="#ffe9a8" ${ST3}/><rect x="-100" y="-60" width="26" height="22" fill="#ffe9a8" ${ST3}/><rect x="-24" y="-64" width="110" height="46" rx="20" fill="#33363d" ${ST}/><rect x="52" y="-104" width="20" height="42" fill="#33363d" ${ST}/>${smoke(62,-112,1,'#d9d9d9')}<rect x="-30" y="-96" width="44" height="78" fill="#33363d" ${ST}/><rect x="-22" y="-86" width="26" height="24" fill="#ffe9a8" ${ST3}/>${[-124,-68,-8,40,74].map(v=>`<g transform="translate(${v},-14)"><g class="spin" style="animation-duration:1.2s"><circle r="15" fill="#b3261e" ${ST3}/><path d="M-15,0 H15" stroke="${OL}" stroke-width="3"/></g></g>`).join('')}<path d="M86,-24 l28,10 v-6 l-28,-18z" fill="#b3261e" ${ST3}/>`}
function tanque(){return `<rect x="-90" y="-44" width="180" height="44" rx="22" fill="#4f6b3a" ${ST}/>${[-60,-20,20,60].map(v=>`<circle cx="${v}" cy="-22" r="13" fill="#33472a" ${ST3}/>`).join('')}<rect x="-58" y="-84" width="110" height="44" rx="10" fill="#5f7f47" ${ST}/><path d="M50,-66 H140" stroke="${OL}" stroke-width="14" stroke-linecap="round"/><path d="M50,-66 H138" stroke="#5f7f47" stroke-width="8" stroke-linecap="round"/>`}
function aviao(){return `<path d="M-120,0 Q-130,-26 -90,-28 H70 Q124,-24 132,-4 Q110,8 70,8 H-100Z" fill="#f4f6f8" ${ST}/><path d="M-20,-10 L-70,50 H-30 L30,-6Z" fill="#c9d3dd" ${ST}/><path d="M-96,-26 L-124,-70 H-98 L-66,-28Z" fill="#b3261e" ${ST}/>${[-40,-10,20,50].map(v=>`<circle cx="${v}" cy="-12" r="6" fill="#3a6fa5"/>`).join('')}`}
function bunting(x0,x1,y){let o=`<path d="M${x0},${y} Q${(x0+x1)/2},${y+50} ${x1},${y}" fill="none" stroke="${OL}" stroke-width="3"/>`;const cs=['#e63946','#f6c21c','#2a9d8f','#3a86ff','#ff7f11'];const n=Math.floor((x1-x0)/46);for(let i=1;i<n;i++){const t=i/n,x=x0+(x1-x0)*t,yy=y+200*t*(1-t);o+=`<path d="M${x-14},${yy} h28 l-14,30z" fill="${cs[i%5]}" ${ST3}/>`}return o}
function confetti(n=46){let o='';const cs=['#e63946','#f6c21c','#2a9d8f','#3a86ff','#ff7f11','#ff66c4'];for(let i=0;i<n;i++)o+=`<g transform="translate(${Math.round(R()*1280)},0)"><rect class="fall" style="animation-duration:${(3.5+R()*4).toFixed(1)}s;animation-delay:${(-R()*6).toFixed(1)}s" width="11" height="7" fill="${cs[i%6]}"/></g>`;return o}
function notes(x,y){return `<g transform="translate(${x},${y})">${[0,1,2].map(i=>`<g transform="translate(${i*34-34},${i%2*-14})"><text class="float" style="animation-delay:${-i*.9}s" font-size="44" fill="${OL}">♪</text></g>`).join('')}</g>`}
function table(w=700){return `<rect x="${-w/2}" y="-90" width="${w}" height="26" rx="8" fill="#a9743f" ${ST}/><rect x="${-w/2+30}" y="-64" width="22" height="64" fill="#8a5a2b" ${ST}/><rect x="${w/2-52}" y="-64" width="22" height="64" fill="#8a5a2b" ${ST}/><path d="M${-w/2+10},-90 q30,40 60,0 q30,40 60,0" fill="#fdf8ea" ${ST3}/>`}

/* ---------- navio e bandeiras ---------- */
function flag(k,w=96,h=64){
  const r=(x,y,ww,hh,c)=>`<rect x="${x}" y="${y}" width="${ww}" height="${hh}" fill="${c}"/>`;let i='';
  if(k==='pt')i=r(0,0,w,h,'#fdf8ea')+`<path d="M${w*.36},${h*.18} h${w*.28} v${h*.36} q0,${h*.2} ${-w*.14},${h*.28} q${-w*.14},${-h*.08} ${-w*.14},${-h*.28}z" fill="#d42a2a" stroke="#c9a227" stroke-width="2"/><rect x="${w*.44}" y="${h*.3}" width="${w*.12}" height="${h*.24}" fill="#fdf8ea"/>`;
  else if(k==='nl')i=r(0,0,w,h/3,'#d4581a')+r(0,h/3,w,h/3,'#fdf8ea')+r(0,2*h/3,w,h/3,'#21468b');
  else if(k==='es')i=r(0,0,w,h,'#fdf8ea')+`<path d="M5,5 L${w-5},${h-5} M${w-5},5 L5,${h-5}" stroke="#b3261e" stroke-width="${h*.13}"/>`;
  else if(k==='en')i=r(0,0,w,h,'#fdf8ea')+r(w*.42,0,w*.16,h,'#c8102e')+r(0,h*.38,w,h*.24,'#c8102e');
  else if(k==='fr')i=r(0,0,w,h,'#2a4b9b')+[.2,.5,.8].map(a=>`<circle cx="${w*a}" cy="${h*.5}" r="${h*.1}" fill="#f6c21c"/>`).join('');
  else if(k==='pe'||k==='pe17'){const cy=h*.66,cx=w/2,R0=h*.44,sw=h*.07;
    i=r(0,0,w,cy,'#0b3fa8')+r(0,cy,w,h-cy,'#fdf8ea');
    ['#d42a2a','#f6c21c','#1f9a4d'].forEach((c,n)=>{const q=R0-n*sw;i+=`<path d="M${cx-q},${cy} A${q},${q} 0 0 1 ${cx+q},${cy}" fill="none" stroke="${c}" stroke-width="${sw}"/>`});
    i+=`<circle cx="${cx}" cy="${cy-h*.11}" r="${h*.075}" fill="#f6c21c"/>`;
    i+=k==='pe'?star(cx,h*.1,h*.085):star(cx,h*.09,h*.07)+star(cx-w*.2,h*.14,h*.07)+star(cx+w*.2,h*.14,h*.07);
    i+=r(cx-h*.03,cy+h*.05,h*.06,h*.24,'#d42a2a')+r(cx-h*.09,cy+h*.12,h*.18,h*.06,'#d42a2a');}
  else if(k==='ce')i=r(0,0,w,h,'#7cc4ee')+r(w*.3,h*.16,w*.4,h*.68,'#f6c21c')+`<circle cx="${w/2}" cy="${h/2}" r="${h*.24}" fill="#fdf8ea" stroke="#0b3fa8" stroke-width="2"/>`+r(w/2-h*.03,h*.34,h*.06,h*.32,'#d42a2a')+r(w/2-h*.13,h*.45,h*.26,h*.06,'#d42a2a');
  else if(k==='imp')i=r(0,0,w,h,'#1f9a4d')+`<path d="M${w/2},${h*.1} L${w*.9},${h/2} L${w/2},${h*.9} L${w*.1},${h/2}Z" fill="#f6c21c"/><circle cx="${w/2}" cy="${h/2}" r="${h*.15}" fill="#1f9a4d" stroke="#c9a227" stroke-width="2"/>`;
  else if(k==='br')i=r(0,0,w,h,'#1f9a4d')+`<path d="M${w/2},${h*.1} L${w*.9},${h/2} L${w/2},${h*.9} L${w*.1},${h/2}Z" fill="#f6c21c"/><circle cx="${w/2}" cy="${h/2}" r="${h*.2}" fill="#0b3fa8"/><path d="M${w/2-h*.19},${h*.47} Q${w/2},${h*.4} ${w/2+h*.19},${h*.56}" stroke="#fdf8ea" stroke-width="3" fill="none"/>`;
  else if(k==='red')i=r(0,0,w,h,'#d42a2a');
  else i=r(0,0,w,h,'#fdf8ea');
  return `<g class="flap">${i}<rect width="${w}" height="${h}" fill="none" ${ST3}/></g>`;
}
function pole(k,hh=220,w=96,h=64){return `${ln(`M0,0 V${-hh}`,'#c9a227',4)}<g transform="translate(3,${-hh})">${flag(k,w,h)}</g>`}
function ship(o={}){
  const cross=o.cross?`<path d="M-22,-196 v54 M-46,-170 h48" stroke="#d42a2a" stroke-width="11"/>`:'';
  return `<g class="rock"><path d="M-22,-22 V-262 M-88,-40 V-176 M56,-22 V-196" stroke="${OL}" stroke-width="7" stroke-linecap="round"/>
  <path d="M-74,-232 Q-22,-246 30,-232 L36,-122 Q-22,-106 -80,-122Z" fill="#fdf8ea" ${ST}/>${cross}<path d="M-78,-110 Q-22,-96 34,-110 L38,-42 Q-22,-30 -82,-42Z" fill="#fdf8ea" ${ST}/>
  <path d="M26,-178 Q56,-188 88,-178 L92,-58 Q56,-46 22,-58Z" fill="#fdf8ea" ${ST}/><path d="M-88,-174 L-124,-58 L-58,-68Z" fill="#f1e6c8" ${ST}/>
  <path d="M-134,-34 L-108,36 Q-104,46 -92,46 H88 Q100,46 106,36 L142,-38 L72,-24 H-80 Z" fill="#8a5a2b" ${ST}/><path d="M-134,-34 L-80,-24 V-58 H-128Z" fill="#a9743f" ${ST}/><path d="M-116,0 H122" stroke="#5e3b1a" stroke-width="5"/>
  <g transform="translate(-20,-262)">${flag(o.flag||'pt',56,36)}</g></g>`;
}
function boat(){return `<g class="rock"><path d="M-70,-10 Q-60,26 -40,28 H44 Q62,26 74,-12Z" fill="#8a5a2b" ${ST}/><path d="M0,-10 V-110" stroke="${OL}" stroke-width="6"/><path d="M4,-106 L58,-24 H4Z" fill="#fdf8ea" ${ST}/></g>`}

/* ---------- placas e papéis ---------- */
function sign(x,y,t,o={}){if(y<100&&!o._s)y+=36;const fs=o.fs||28,w=t.length*fs*.67+38,h=fs+22;return `<g transform="translate(${x},${y})"><rect x="${-w/2}" y="${-h/2}" width="${w}" height="${h}" rx="${h/2}" fill="${o.bg||'#fff8e1'}" ${ST3}/><text x="0" y="${fs*.35}" text-anchor="middle" font-size="${fs}" fill="${o.fg||OL}">${t}</text></g>`}
function stack(x,y,list,o={}){const fs=o.fs||28,q=Object.assign({_s:1},o);if(y<100)y+=36;return list.map((t,i)=>sign(x,y+i*(fs+30),t,q)).join('')}
function scroll(title,lines=[],w=360){const h=78+lines.length*36;return `<g><rect x="${-w/2}" y="${-h/2}" width="${w}" height="${h}" rx="8" fill="#f6e7bf" ${ST}/><rect x="${-w/2-12}" y="${-h/2-12}" width="${w+24}" height="24" rx="12" fill="#e2c98a" ${ST3}/><rect x="${-w/2-12}" y="${h/2-12}" width="${w+24}" height="24" rx="12" fill="#e2c98a" ${ST3}/><text x="0" y="${-h/2+54}" text-anchor="middle" font-size="26" class="tt" fill="#7a1f1f">${title}</text>${lines.map((l,i)=>`<text x="0" y="${-h/2+94+i*36}" text-anchor="middle" font-size="23" fill="${OL}">${l}</text>`).join('')}</g>`}
function inset(w,h,inner,title){return `<rect x="${-w/2-9}" y="${-h/2-9}" width="${w+18}" height="${h+18}" rx="16" fill="#fff8e1" ${ST}/><svg x="${-w/2}" y="${-h/2}" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">${inner}</svg>`+(title?sign(0,-h/2-10,title,{fs:22,bg:'#f6c21c',_s:1}):'')}

/* ---------- gente ---------- */
const SK={eu:'#f3cfa6',in:'#bb7a4c',af:'#74482c',mi:'#d19c6c'};
const PROP={
  espada:()=>ln('M0,8 V-84','#dfe4ea',6)+`<path d="M-14,-4 h28" stroke="${OL}" stroke-width="10" stroke-linecap="round"/><path d="M-13,-4 h26" stroke="#c9a227" stroke-width="5" stroke-linecap="round"/>`,
  mosquete:()=>ln('M-26,26 L64,-58','#7a4a24',8)+`<path d="M20,-17 L72,-66" stroke="#5a5f66" stroke-width="5" stroke-linecap="round"/>`,
  lanca:()=>ln('M0,44 V-150','#a9743f',6)+`<path d="M-11,-146 L0,-186 L11,-146Z" fill="#dfe4ea" ${ST3}/>`,
  lancaFita:()=>ln('M0,44 V-170','#a9743f',6)+`<path d="M-11,-166 L0,-206 L11,-166Z" fill="#dfe4ea" ${ST3}/>`+['#e63946','#f6c21c','#2a9d8f','#3a86ff'].map((c,i)=>`<path d="M0,${-150+i*30} q${16+i*4},10 ${8+i*2},34" stroke="${c}" stroke-width="7" fill="none" stroke-linecap="round"/>`).join(''),
  arco:()=>`<path d="M6,60 Q52,0 6,-64" fill="none" stroke="${OL}" stroke-width="9" stroke-linecap="round"/><path d="M6,60 Q52,0 6,-64" fill="none" stroke="#a9743f" stroke-width="4" stroke-linecap="round"/><path d="M6,60 V-64" stroke="${OL}" stroke-width="2"/>`,
  bandeira:o=>pole(o.flag||'pe',170,84,56),
  papel:()=>`<rect x="-16" y="-44" width="36" height="48" rx="3" fill="#fdf8ea" ${ST3}/><path d="M-8,-32 h20 M-8,-22 h20 M-8,-12 h14" stroke="${OL}" stroke-width="2.5"/>`,
  jornal:()=>`<rect x="-24" y="-52" width="52" height="58" rx="3" fill="#fdf8ea" ${ST3}/><rect x="-18" y="-46" width="40" height="10" fill="${OL}"/><path d="M-18,-28 h40 M-18,-18 h40 M-18,-8 h30" stroke="${OL}" stroke-width="2.5"/>`,
  livro:o=>`<rect x="-18" y="-40" width="40" height="46" rx="4" fill="${o.book||'#8a2f6b'}" ${ST3}/><path d="M-10,-40 v46" stroke="${OL}" stroke-width="2.5"/>`,
  cruz:()=>ln('M0,30 V-70 M-22,-40 H22','#a9743f',7),
  enxada:()=>ln('M0,44 V-110','#a9743f',6)+`<path d="M-2,-112 h34 v20 h-34z" fill="#8f959c" ${ST3}/>`,
  facao:()=>`<path d="M-4,4 L8,-78 L22,-70 L8,4Z" fill="#dfe4ea" ${ST3}/><rect x="-6" y="0" width="16" height="16" rx="4" fill="#5e3b1a" ${ST3}/>`,
  machado:()=>ln('M0,30 V-70','#a9743f',6)+`<path d="M2,-74 h30 q10,14 0,28 h-30z" fill="#8f959c" ${ST3}/>`,
  tora:()=>`<rect x="-64" y="-26" width="120" height="26" rx="12" fill="#b3261e" ${ST}/><ellipse cx="54" cy="-13" rx="7" ry="12" fill="#e8a07a" ${ST3}/>`,
  sombrinha:()=>ln('M0,10 V-64','#5a5f66',4)+`<path d="M-46,-62 A46,40 0 0 1 46,-62Z" fill="#e63946" ${ST3}/><path d="M-23,-62 A23,40 0 0 1 0,-102 V-62Z" fill="#f6c21c"/><path d="M0,-102 A23,40 0 0 1 23,-62 H0Z" fill="#2a9d8f"/><path d="M23,-62 A46,40 0 0 0 0,-102 A23,40 0 0 1 23,-62" fill="#3a86ff"/><path d="M-46,-62 A46,40 0 0 1 46,-62Z" fill="none" ${ST3}/>`,
  saco:()=>`<path d="M-22,6 Q-34,-34 -10,-44 L-14,-58 H16 L10,-44 Q36,-34 24,6Z" fill="#c9a86b" ${ST}/><text x="0" y="-10" text-anchor="middle" font-size="26" fill="${OL}">$</text>`,
  tocha:()=>ln('M0,20 V-40','#7a4a24',7)+fire(0,-40,.45),
  mic:()=>ln('M0,10 V-26','#33363d',5)+`<circle cx="0" cy="-36" r="11" fill="#8f959c" ${ST3}/>`,
  luneta:()=>`<path d="M-8,0 L60,-46" stroke="${OL}" stroke-width="16" stroke-linecap="round"/><path d="M-8,0 L60,-46" stroke="#c9a227" stroke-width="9" stroke-linecap="round"/>`,
  pincel:()=>ln('M0,8 L26,-40','#a9743f',5)+`<circle cx="29" cy="-45" r="7" fill="#e63946" ${ST3}/>`,
  cajado:()=>ln('M0,56 V-90','#7a4a24',6),
  baquetas:()=>ln('M-4,0 L-34,26','#a9743f',5),
  trombone:()=>`<path d="M-10,-4 H70 M-10,12 H52 a8,8 0 0 0 0,-16" fill="none" stroke="${OL}" stroke-width="10" stroke-linecap="round"/><path d="M-10,-4 H70 M-10,12 H52 a8,8 0 0 0 0,-16" fill="none" stroke="#e8b923" stroke-width="5" stroke-linecap="round"/><path d="M66,-4 l26,-18 v36z" fill="#e8b923" ${ST3}/>`,
  calunga:()=>`<path d="M-12,-10 L0,-44 L12,-10Z" fill="#fdf8ea" ${ST3}/><circle cx="0" cy="-52" r="10" fill="#3b2416" ${ST3}/><path d="M-8,-60 l4,-8 4,6 4,-6 4,8z" fill="#f6c21c" stroke="${OL}" stroke-width="2"/>`,
  balanca:()=>ln('M0,10 V-60 M-34,-60 H34','#8f959c',5)+`<path d="M-48,-30 h28 l-14,-30z M20,-30 h28 l-14,-30z" fill="#c9a227" ${ST3}/>`,
  cana:()=>ln('M0,30 V-90','#8fbf3f',8)+`<path d="M0,-88 Q-22,-110 -34,-92 M0,-88 Q20,-114 34,-96" stroke="#3f9a3a" stroke-width="6" fill="none" stroke-linecap="round"/>`,
  rabeca:()=>`<ellipse cx="6" cy="-16" rx="16" ry="24" fill="#b9733f" ${ST3}/><path d="M6,-38 V-78" stroke="${OL}" stroke-width="6" stroke-linecap="round"/>`
};
function hat(k,o){const c=o.hatc;
  switch(k){
    case 'cocar':return [-66,-44,-22,0,22,44,66].map((a,i)=>`<ellipse cx="0" cy="-222" rx="9" ry="30" fill="${['#e63946','#f6c21c','#2a9d8f','#3a86ff'][i%4]}" ${ST3} transform="rotate(${a} 0 -168)"/>`).join('')+`<path d="M-31,-166 Q0,-184 31,-166" fill="none" stroke="${OL}" stroke-width="13" stroke-linecap="round"/><path d="M-31,-166 Q0,-184 31,-166" fill="none" stroke="#f6c21c" stroke-width="7" stroke-linecap="round"/>`;
    case 'morion':return `<path d="M-34,-170 Q0,-236 34,-170Z" fill="${c||'#aeb6bf'}" ${ST}/><path d="M-50,-166 Q0,-184 50,-166" fill="none" stroke="${OL}" stroke-width="12" stroke-linecap="round"/><path d="M-50,-166 Q0,-184 50,-166" fill="none" stroke="${c||'#aeb6bf'}" stroke-width="6" stroke-linecap="round"/><path d="M0,-204 v-18" stroke="${OL}" stroke-width="6" stroke-linecap="round"/>`;
    case 'plume':return `<path d="M-26,-172 Q-24,-214 0,-214 Q24,-214 26,-172Z" fill="${c||'#2a2333'}" ${ST}/><ellipse cx="0" cy="-172" rx="52" ry="11" fill="${c||'#2a2333'}" ${ST}/><path d="M14,-196 Q60,-250 84,-196 Q56,-214 26,-184Z" fill="${o.fc||'#e63946'}" ${ST3}/>`;
    case 'tricorn':return `<path d="M-50,-170 Q-30,-196 0,-204 Q30,-196 50,-170 Q0,-184 -50,-170Z" fill="${c||'#1d1d28'}" ${ST}/><path d="M-50,-170 Q0,-184 50,-170" fill="none" stroke="#c9a227" stroke-width="4"/>`;
    case 'cartola':return `<rect x="-24" y="-232" width="48" height="60" rx="5" fill="${c||'#1d1d28'}" ${ST}/><rect x="-42" y="-178" width="84" height="12" rx="6" fill="${c||'#1d1d28'}" ${ST}/><rect x="-24" y="-190" width="48" height="9" fill="${o.fc||'#b3261e'}"/>`;
    case 'palha':return `<path d="M-26,-172 Q-22,-206 0,-206 Q22,-206 26,-172Z" fill="${c||'#e8c96b'}" ${ST}/><ellipse cx="0" cy="-172" rx="56" ry="12" fill="${c||'#e8c96b'}" ${ST}/>`;
    case 'couro':return `<path d="M-58,-170 Q0,-244 58,-170 Q0,-194 -58,-170Z" fill="#a9743f" ${ST}/>${star(0,-198,10)}${star(-30,-184,6)}${star(30,-184,6)}`;
    case 'vaqueiro':return `<path d="M-26,-172 Q-24,-204 0,-204 Q24,-204 26,-172Z" fill="#8a5a2b" ${ST}/><ellipse cx="0" cy="-172" rx="42" ry="9" fill="#8a5a2b" ${ST}/>`;
    case 'quepe':return `<path d="M-30,-174 Q-30,-204 0,-204 Q30,-204 30,-174Z" fill="${c||'#1f3a6b'}" ${ST}/><path d="M-30,-174 H42" stroke="${OL}" stroke-width="9" stroke-linecap="round"/><circle cx="0" cy="-188" r="5" fill="#f6c21c"/>`;
    case 'capacete':return `<path d="M-36,-164 Q-36,-212 0,-212 Q36,-212 36,-164Z" fill="${c||'#4f6b3a'}" ${ST}/>`;
    case 'mitra':return `<path d="M-26,-174 L-20,-212 L0,-240 L20,-212 L26,-174Z" fill="#fdf8ea" ${ST}/><path d="M0,-226 v36 M-10,-210 h20" stroke="#c9a227" stroke-width="5"/>`;
    case 'coroa':return `<path d="M-30,-172 L-34,-212 L-16,-194 L0,-220 L16,-194 L34,-212 L30,-172Z" fill="#f6c21c" ${ST}/><circle cx="0" cy="-186" r="5" fill="#d42a2a"/>`;
    case 'lenco':return `<path d="M-33,-158 Q-34,-196 0,-194 Q34,-196 33,-158 Q0,-178 -33,-158Z" fill="${c||'#e63946'}" ${ST}/><circle cx="30" cy="-170" r="8" fill="${c||'#e63946'}" ${ST3}/>`;
    case 'solideo':return `<path d="M-24,-176 Q0,-200 24,-176Z" fill="${c||'#7a1f6b'}" ${ST3}/>`;
    case 'kipa':return `<path d="M-30,-170 Q-28,-204 0,-204 Q28,-204 30,-170Z" fill="#1d1d28" ${ST}/><ellipse cx="0" cy="-170" rx="44" ry="8" fill="#1d1d28" ${ST}/>`;
    case 'tinsel':return [-78,-58,-38,-18,0,18,38,58,78].map((a,i)=>`<path d="M0,-176 V-256" stroke="${['#e63946','#f6c21c','#2a9d8f','#3a86ff','#ff66c4'][i%5]}" stroke-width="9" stroke-linecap="round" transform="rotate(${a} 0 -168)"/>`).join('')+`<path d="M-34,-168 Q0,-196 34,-168Z" fill="#f6c21c" ${ST}/>`;
    case 'bicorn':return `<path d="M-52,-168 Q0,-246 52,-168 Q0,-186 -52,-168Z" fill="${c||'#1d1d28'}" ${ST}/><circle cx="0" cy="-198" r="6" fill="#f6c21c"/>`;
  }return '';
}
function person(o={}){
  const sk=SK[o.sk]||o.sk||SK.eu,c=o.c||'#c0392b',c2=o.c2||'#4a3b32',hc=o.hc||'#2b1b12',fit=o.fit||'camisa';
  const long=fit==='batina'||fit==='vestido'||fit==='gola';
  let b='';
  if(!long){const lc=fit==='tanga'?sk:c2,ft=(fit==='tanga'||o.barefoot)?'':`<rect x="-3" y="-10" width="22" height="10" rx="4" fill="${o.boot||OL}"/>`;
    b+=`<g class="lgA"><rect x="-19" y="-60" width="16" height="60" rx="7" fill="${lc}" ${ST}/><g transform="translate(-19,0)">${ft}</g></g><g class="lgB"><rect x="3" y="-60" width="16" height="60" rx="7" fill="${lc}" ${ST}/><g transform="translate(3,0)">${ft}</g></g>`;}
  if(fit==='gola')b+=`<path d="M-20,-122 Q0,-130 20,-122 L30,-2 Q0,6 -30,-2Z" fill="${c2}" ${ST}/><path d="M-74,-50 Q-80,-128 0,-132 Q80,-128 74,-50 Q0,-22 -74,-50Z" fill="${c}" ${ST}/>`+[[-46,-70,'#f6c21c'],[-20,-96,'#2a9d8f'],[10,-64,'#fdf8ea'],[40,-88,'#3a86ff'],[-10,-48,'#ff66c4'],[50,-58,'#f6c21c'],[-52,-100,'#fdf8ea']].map(d=>`<circle cx="${d[0]}" cy="${d[1]}" r="8" fill="${d[2]}" stroke="${OL}" stroke-width="2"/>`).join('');
  else if(long)b+=`<path d="M-23,-124 Q0,-134 23,-124 L${fit==='vestido'?42:36},-2 Q0,7 ${fit==='vestido'?-42:-36},-2Z" fill="${c}" ${ST}/>`;
  else if(fit==='tanga')b+=`<rect x="-23" y="-126" width="46" height="72" rx="15" fill="${sk}" ${ST}/><path d="M-23,-72 h46 l-5,26 h-36z" fill="${c}" ${ST}/>`;
  else b+=`<rect x="-24" y="-126" width="48" height="78" rx="15" fill="${c}" ${ST}/>`;
  if(fit==='farda')b+=`<path d="M-21,-120 L21,-60 M21,-120 L-21,-60" stroke="${o.belt||'#fdf8ea'}" stroke-width="7" fill="none"/><circle cx="0" cy="-90" r="6" fill="#f6c21c" stroke="${OL}" stroke-width="2"/><path d="M-24,-58 h48" stroke="${OL}" stroke-width="5"/>`;
  if(fit==='terno')b+=`<path d="M-11,-126 L0,-98 L11,-126Z" fill="#fdf8ea" ${ST3}/><path d="M0,-116 l-5,26 5,9 5,-9z" fill="${o.tie||'#b3261e'}"/>`;
  if(fit==='gibao')b+=`<path d="M0,-108 V-52" stroke="${OL}" stroke-width="3"/><path d="M-28,-128 Q0,-104 28,-128 L22,-112 Q0,-94 -22,-112Z" fill="#fdf8ea" ${ST3}/>`;
  if(fit==='casaca')b+=`<path d="M-12,-126 L0,-96 L12,-126Z" fill="#fdf8ea" ${ST3}/><circle cx="0" cy="-84" r="3.5" fill="#f6c21c"/><circle cx="0" cy="-70" r="3.5" fill="#f6c21c"/><path d="M-24,-52 l-6,34 h14z M24,-52 l6,34 h-14z" fill="${c}" ${ST3}/>`;
  if(fit==='batina'){b+=`<path d="M-11,-125 h22" stroke="#fdf8ea" stroke-width="7" stroke-linecap="round"/>`;if(o.cord)b+=`<path d="M-28,-80 Q0,-70 28,-80 M10,-76 v36" stroke="#f1e6c8" stroke-width="5" fill="none" stroke-linecap="round"/>`;if(o.sash)b+=`<path d="M-30,-70 Q0,-60 30,-70" stroke="${o.sash}" stroke-width="9" fill="none"/>`;}
  if(fit==='vestido')b+=`<path d="M-27,-86 Q0,-76 27,-86" stroke="${c2}" stroke-width="7" fill="none"/><path d="M-40,-6 Q0,6 40,-6" stroke="${c2}" stroke-width="6" fill="none"/>`;
  if(fit==='camisa'&&o.stripe)b+=`<path d="M-24,-100 h48 M-24,-80 h48" stroke="${o.stripe}" stroke-width="8"/>`;
  if(o.drum)b+=`<rect x="-34" y="-84" width="68" height="46" rx="6" fill="#b9733f" ${ST}/><path d="M-34,-84 L-22,-38 L-10,-84 L2,-38 L14,-84 L26,-38 L34,-84" fill="none" stroke="#fdf8ea" stroke-width="3"/><ellipse cx="0" cy="-84" rx="34" ry="7" fill="#f1e6c8" ${ST3}/>`;
  if(o.sanfona)b+=`<rect x="-40" y="-110" width="24" height="56" rx="5" fill="#b3261e" ${ST3}/><rect x="16" y="-110" width="24" height="56" rx="5" fill="#b3261e" ${ST3}/><path d="M-16,-106 h32 v48 h-32z" fill="#fdf8ea" ${ST3}/><path d="M-8,-106 v48 M0,-106 v48 M8,-106 v48" stroke="${OL}" stroke-width="2.5"/>`;
  const ac=fit==='tanga'?sk:(o.sleeve||(fit==='gola'?c2:c));
  const arm=(x,ang,pr)=>`<g transform="translate(${x},-116) rotate(${ang})"><rect x="-7.5" y="-5" width="15" height="54" rx="7.5" fill="${ac}" ${ST}/>${pr?`<g transform="translate(0,52) rotate(${-ang})">${pr}</g>`:''}<circle cx="0" cy="52" r="8.5" fill="${sk}" ${ST}/></g>`;
  const pL=o.propL&&PROP[o.propL]?PROP[o.propL](o):'',pR=o.propR&&PROP[o.propR]?PROP[o.propR](o):'';
  b+=arm(-28,o.armL!=null?o.armL:(o.upL?150:(pL?48:9)),pL);
  b+=arm(28,o.armR!=null?o.armR:(o.up?-150:(pR?-52:-9)),pR);
  // cabeça
  let h='';
  if(o.hair==='afro')h+=`<circle cx="0" cy="-162" r="42" fill="${hc}" ${ST}/>`;
  if(o.hair==='long'||o.hair==='wig')h+=`<path d="M-33,-168 Q-46,-120 -34,-102 L-18,-110 V-170Z M33,-168 Q46,-120 34,-102 L18,-110 V-170Z" fill="${hc}" ${ST}/>`;
  h+=`<circle cx="0" cy="-152" r="31" fill="${sk}" ${ST}/>`;
  if(o.beard==='full')h+=`<path d="M-30,-150 Q-32,-112 0,-110 Q32,-112 30,-150 Q16,-128 0,-130 Q-16,-128 -30,-150Z" fill="${o.bc||hc}" ${ST3}/>`;
  if(o.hair==='short'||o.hair==='bun'||o.hair==='long'||!o.hair)h+=`<path d="M-31,-156 Q-34,-190 0,-188 Q34,-190 31,-156 Q14,-174 0,-172 Q-14,-174 -31,-156Z" fill="${hc}" ${ST3}/>`;
  if(o.hair==='wig')h+=`<path d="M-33,-152 Q-40,-196 0,-192 Q40,-196 33,-152 Q10,-178 -33,-152Z" fill="${hc}" ${ST3}/>`;
  if(o.hair==='indio')h+=`<path d="M-32,-146 Q-36,-190 0,-188 Q36,-190 32,-146 L26,-164 H-26Z" fill="${hc}" ${ST3}/>`;
  if(o.hair==='tonsura')h+=`<path d="M-31,-156 Q-30,-176 -14,-180 M31,-156 Q30,-176 14,-180" fill="none" stroke="${hc}" stroke-width="9" stroke-linecap="round"/>`;
  if(o.hair==='bun')h+=`<circle cx="0" cy="-194" r="13" fill="${hc}" ${ST3}/>`;
  if(o.mask)h+=`<circle cx="0" cy="-152" r="31" fill="${o.mask}" ${ST}/><path d="M-20,-166 l12,8 M20,-166 l-12,8" stroke="${OL}" stroke-width="4" stroke-linecap="round"/>`;
  h+=`<g class="eyes"><circle cx="-11" cy="-155" r="4.2" fill="${OL}"/><circle cx="11" cy="-155" r="4.2" fill="${OL}"/></g>`;
  if(o.glasses)h+=`<circle cx="-11" cy="-155" r="10" fill="${o.shades?OL:'rgba(255,255,255,.35)'}" stroke="${OL}" stroke-width="3"/><circle cx="11" cy="-155" r="10" fill="${o.shades?OL:'rgba(255,255,255,.35)'}" stroke="${OL}" stroke-width="3"/><path d="M-1,-155 h2" stroke="${OL}" stroke-width="3"/>`;
  if(o.angry)h+=`<path d="M-20,-168 l14,6 M20,-168 l-14,6" stroke="${OL}" stroke-width="4" stroke-linecap="round"/>`;
  h+=o.angry?`<path class="m1" d="M-9,-134 q9,-7 18,0" fill="none" stroke="${OL}" stroke-width="3.5" stroke-linecap="round"/>`:`<path class="m1" d="M-9,-139 q9,9 18,0" fill="none" stroke="${OL}" stroke-width="3.5" stroke-linecap="round"/>`;
  h+=`<ellipse class="m2" cx="0" cy="-136" rx="7.5" ry="7" fill="#5a1d1d" stroke="${OL}" stroke-width="2"/>`;
  if(o.beard==='mustache'||o.beard==='goatee')h+=`<path d="M-15,-143 q7.5,-8 15,0 q7.5,-8 15,0" fill="none" stroke="${o.bc||hc}" stroke-width="6" stroke-linecap="round"/>`;
  if(o.beard==='goatee')h+=`<path d="M-7,-128 L0,-112 L7,-128Z" fill="${o.bc||hc}" ${ST3}/>`;
  if(o.hat)h+=hat(o.hat,o);
  return `<g class="pp" style="animation-delay:${(-R()*2.5).toFixed(2)}s">${b}${h}</g>`;
}
/* figurinos prontos */
const C={
  indio:{sk:'in',fit:'tanga',c:'#c0392b',hair:'indio'},
  cacique:{sk:'in',fit:'tanga',c:'#c0392b',hair:'indio',hat:'cocar'},
  india:{sk:'in',fit:'vestido',c:'#d98b2b',c2:'#8a3b12',hair:'long'},
  port:{sk:'eu',fit:'gibao',c:'#3d5a80',c2:'#3a2a20',hat:'morion',beard:'full',hc:'#5a3a22'},
  nobre:{sk:'eu',fit:'gibao',c:'#7b1e2b',c2:'#2c2c3a',hat:'plume',beard:'goatee',hc:'#5a3a22'},
  dama:{sk:'eu',fit:'vestido',c:'#5e3a87',c2:'#e2c36b',hair:'bun',hc:'#5a3a22'},
  senhor:{sk:'eu',fit:'gibao',c:'#f1ead9',c2:'#6b4a2b',hat:'palha',beard:'mustache',hc:'#4a3018'},
  escravo:{sk:'af',fit:'camisa',c:'#efe4c9',c2:'#b9a888',hair:'short',barefoot:1,hc:'#1d120b'},
  escrava:{sk:'af',fit:'vestido',c:'#efe4c9',c2:'#b9552b',hat:'lenco',hatc:'#e63946',hair:'bald'},
  holandes:{sk:'eu',fit:'farda',c:'#e07b1a',c2:'#2c3e50',hat:'morion',beard:'goatee',hc:'#c98a2b'},
  mercador:{sk:'eu',fit:'casaca',c:'#6b4a2b',c2:'#3a2a20',hat:'tricorn',beard:'mustache',hc:'#4a3018'},
  padre:{sk:'eu',fit:'batina',c:'#2a2333',hair:'short',hc:'#4a3018'},
  frei:{sk:'eu',fit:'batina',c:'#7a5230',hair:'tonsura',cord:1,hc:'#4a3018'},
  soldadoRei:{sk:'eu',fit:'farda',c:'#b3261e',c2:'#fdf8ea',hat:'bicorn',hc:'#4a3018'},
  soldadoAzul:{sk:'mi',fit:'farda',c:'#1f3a6b',c2:'#fdf8ea',hat:'bicorn',hc:'#2b1b12'},
  doutor:{sk:'eu',fit:'casaca',c:'#1d1d28',c2:'#3a3a48',hat:'cartola',beard:'mustache',hc:'#2b1b12'},
  povo:{sk:'mi',fit:'camisa',c:'#efe4c9',c2:'#8a6f4a',hat:'palha',barefoot:1},
  campones:{sk:'mi',fit:'camisa',c:'#d9c8a0',c2:'#6b5a3a',hat:'palha',barefoot:1},
  coronel:{sk:'eu',fit:'terno',c:'#fdf8ea',c2:'#fdf8ea',hat:'palha',hatc:'#fdf8ea',beard:'mustache',tie:'#1d1d28',hc:'#5a5f66'},
  politico:{sk:'eu',fit:'terno',c:'#2c3e50',c2:'#2c3e50',hair:'short',hc:'#2b1b12'},
  militar:{sk:'mi',fit:'farda',c:'#4f6b3a',c2:'#4f6b3a',hat:'capacete',belt:'#33472a'},
  cangaceiro:{sk:'mi',fit:'farda',c:'#b9853f',c2:'#8a5a2b',hat:'couro',belt:'#5e3b1a'},
  passista:{sk:'mi',fit:'camisa',c:'#f6c21c',c2:'#e63946',hair:'short',stripe:'#3a86ff'},
  batuqueiro:{sk:'af',fit:'camisa',c:'#fdf8ea',c2:'#fdf8ea',hat:'palha',drum:1,propR:'baquetas',hc:'#1d120b'}
};
function P(base,extra){return person(Object.assign({},C[base]||{},extra||{}))}
function crowd(x0,x1,y,n,s=.6){let o='';const sks=['eu','mi','af','in','mi','af'],cs=['#e63946','#3a86ff','#f6c21c','#2a9d8f','#fdf8ea','#ff7f11','#8a2f6b'];for(let i=0;i<n;i++){const x=x0+(x1-x0)*(i+R()*.6)/n,sk=SK[pick(sks)],c=pick(cs);o+=`<g transform="translate(${Math.round(x)},${y+Math.round(R()*16)}) scale(${s})"><g class="pp" style="animation-delay:${(-R()*2.5).toFixed(2)}s"><rect x="-24" y="-126" width="48" height="126" rx="15" fill="${c}" ${ST}/><circle cx="0" cy="-152" r="31" fill="${sk}" ${ST}/><path d="M-31,-156 Q-34,-190 0,-188 Q34,-190 31,-156 Q0,-176 -31,-156Z" fill="${OL}"/></g></g>`}return o}

/* ---------- bichos e mascote ---------- */
function quad(k='boi',c){const col=c||{boi:'#b98250',cavalo:'#7a4a24',bode:'#efe7d6'}[k];
  let s=`<g class="lgA"><rect x="-54" y="-52" width="14" height="52" rx="6" fill="${col}" ${ST}/><rect x="28" y="-52" width="14" height="52" rx="6" fill="${col}" ${ST}/></g><g class="lgB"><rect x="-32" y="-52" width="14" height="52" rx="6" fill="${col}" ${ST}/><rect x="48" y="-52" width="14" height="52" rx="6" fill="${col}" ${ST}/></g>`;
  s+=`<path d="M-70,-84 q-24,8 -18,44" fill="none" ${ST}/><ellipse cx="0" cy="-76" rx="74" ry="36" fill="${col}" ${ST}/>`;
  if(k==='cavalo')s+=`<path d="M46,-96 L74,-158 L104,-146 L84,-70Z" fill="${col}" ${ST}/><ellipse cx="104" cy="-156" rx="31" ry="17" fill="${col}" ${ST} transform="rotate(22 104 -156)"/><path d="M58,-134 L76,-170" stroke="${OL}" stroke-width="11" stroke-linecap="round"/><circle cx="108" cy="-162" r="4" fill="${OL}"/><path d="M84,-174 l4,-18 9,13z" fill="${col}" ${ST3}/>`;
  else s+=(k==='boi'?`<path d="M66,-124 q-12,-26 8,-36 M98,-126 q16,-22 0,-36" fill="none" stroke="${OL}" stroke-width="12" stroke-linecap="round"/><path d="M66,-124 q-12,-26 8,-36 M98,-126 q16,-22 0,-36" fill="none" stroke="#f4ecd8" stroke-width="6" stroke-linecap="round"/>`:`<path d="M72,-122 l-10,-24 M96,-124 l10,-24" stroke="${OL}" stroke-width="8" stroke-linecap="round"/>`)+`<ellipse cx="84" cy="-100" rx="32" ry="26" fill="${col}" ${ST}/><circle cx="92" cy="-106" r="4" fill="${OL}"/><ellipse cx="106" cy="-92" rx="12" ry="9" fill="#efd0b0" ${ST3}/>`+(k==='bode'?`<path d="M98,-76 q4,16 -2,24" stroke="${OL}" stroke-width="5" fill="none" stroke-linecap="round"/>`:'');
  return `<g class="pp">${s}</g>`;
}
function rider(o,hc){return at(-4,-66,person(o))+quad('cavalo',hc)}
function lion(){let m='';for(let i=0;i<12;i++){const a=i*Math.PI/6;m+=`<circle cx="${(56*Math.cos(a)).toFixed(1)}" cy="${(-118+56*Math.sin(a)).toFixed(1)}" r="19" fill="#c26a1c" ${ST3}/>`}
  return `<g class="pp"><path d="M36,-20 q46,-4 40,-56" fill="none" stroke="${OL}" stroke-width="13" stroke-linecap="round"/><path d="M36,-20 q46,-4 40,-56" fill="none" stroke="#f2b632" stroke-width="7" stroke-linecap="round"/><circle cx="76" cy="-80" r="11" fill="#c26a1c" ${ST3}/>
  <ellipse cx="0" cy="-42" rx="42" ry="42" fill="#f2b632" ${ST}/><ellipse cx="-22" cy="-5" rx="17" ry="10" fill="#f7c948" ${ST}/><ellipse cx="22" cy="-5" rx="17" ry="10" fill="#f7c948" ${ST}/>
  ${m}<circle cx="0" cy="-118" r="54" fill="#c26a1c"/><circle cx="-34" cy="-156" r="13" fill="#f7c948" ${ST3}/><circle cx="34" cy="-156" r="13" fill="#f7c948" ${ST3}/><circle cx="0" cy="-116" r="41" fill="#f7c948" ${ST}/>
  <g class="eyes"><circle cx="-15" cy="-124" r="5" fill="${OL}"/><circle cx="15" cy="-124" r="5" fill="${OL}"/></g><path d="M-8,-108 h16 l-8,9z" fill="#7a3b12" ${ST3}/><path class="m1" d="M-14,-94 q7,8 14,0 q7,8 14,0" fill="none" stroke="${OL}" stroke-width="3.5" stroke-linecap="round"/><ellipse class="m2" cx="0" cy="-92" rx="9" ry="8" fill="#5a1d1d" stroke="${OL}" stroke-width="2"/></g>`;
}
function galo(){return `<g class="pp"><path d="M-60,-150 Q-150,-250 -120,-90 Q-110,-150 -60,-110Z" fill="#3a86ff" ${ST}/><path d="M-60,-160 Q-130,-300 -80,-110Z" fill="#e63946" ${ST}/><path d="M-50,-170 Q-90,-320 -40,-120Z" fill="#f6c21c" ${ST}/>
  <path d="M-16,0 v-50 M22,0 v-50" stroke="${OL}" stroke-width="12" stroke-linecap="round"/><path d="M-16,0 v-50 M22,0 v-50" stroke="#f6c21c" stroke-width="6" stroke-linecap="round"/>
  <path d="M-70,-110 Q-70,-40 10,-40 Q80,-44 70,-150 Q70,-210 40,-230 Q20,-150 -70,-110Z" fill="#fdf8ea" ${ST}/><path d="M-30,-96 Q10,-60 44,-104" fill="none" stroke="#2a9d8f" stroke-width="12" stroke-linecap="round"/>
  <circle cx="48" cy="-250" r="34" fill="#fdf8ea" ${ST}/><path d="M26,-278 q6,-26 20,-8 q8,-24 20,-2 q14,-12 10,14Z" fill="#e63946" ${ST}/><path d="M78,-252 l34,8 -32,12z" fill="#f6c21c" ${ST}/><circle cx="56" cy="-256" r="5" fill="${OL}"/><path d="M62,-224 q6,22 -8,22z" fill="#e63946" ${ST3}/></g>`}
function crab(){return `<g class="pp">${ln('M-34,-18 l-28,18 M-30,-26 l-34,-2 M34,-18 l28,18 M30,-26 l34,-2','#c0392b',6)}<ellipse cx="0" cy="-26" rx="40" ry="24" fill="#e0452f" ${ST}/><path d="M-30,-44 L-52,-74 M30,-44 L52,-74" stroke="${OL}" stroke-width="7" stroke-linecap="round"/><path d="M-66,-92 a16,16 0 1 1 22,10 l-8,-12z M66,-92 a16,16 0 1 0 -22,10 l8,-12z" fill="#e0452f" ${ST3}/><circle cx="-12" cy="-50" r="6" fill="#fff" ${ST3}/><circle cx="12" cy="-50" r="6" fill="#fff" ${ST3}/></g>`}
function antena(){return ln('M0,0 V-120','#8f959c',6)+`<path d="M-56,-150 Q0,-90 56,-150 Q0,-128 -56,-150Z" fill="#dfe4ea" ${ST}/><path d="M0,-124 L0,-176" stroke="${OL}" stroke-width="4"/><circle cx="0" cy="-178" r="6" fill="#e63946" ${ST3}/>`}
function drum(){return `<rect x="-26" y="-70" width="52" height="70" rx="8" fill="#b9733f" ${ST}/><ellipse cx="0" cy="-70" rx="26" ry="8" fill="#f1e6c8" ${ST3}/><path d="M-26,-50 h52 M-26,-22 h52" stroke="${OL}" stroke-width="3"/>`}
function bonfire(){return `<path d="M-50,0 L40,-22 M50,0 L-40,-22" stroke="${OL}" stroke-width="18" stroke-linecap="round"/><path d="M-50,0 L40,-22 M50,0 L-40,-22" stroke="#7a4a24" stroke-width="11" stroke-linecap="round"/>${fire(0,-12,1.1)}`}
/* comidas (prato com rótulo) */
function dish(kind,label){let f='';
  if(kind==='rolo')f=`<circle cx="0" cy="-30" r="28" fill="#f2d28a" ${ST3}/><path d="M0,-30 m-20,0 a20,20 0 1 1 20,20 a14,14 0 1 1 -14,-14 a8,8 0 1 1 8,8" fill="none" stroke="#b3261e" stroke-width="5"/>`;
  else if(kind==='souza')f=`<path d="M-32,-8 L-24,-48 H24 L32,-8Z" fill="#f2b632" ${ST3}/><path d="M-24,-48 H24" stroke="#b9733f" stroke-width="7"/>`;
  else if(kind==='cartola')f=`<rect x="-34" y="-30" width="68" height="20" rx="10" fill="#f6c21c" ${ST3}/><rect x="-28" y="-44" width="56" height="16" rx="6" fill="#fdf8ea" ${ST3}/>${[-16,-4,8,18].map(v=>`<circle cx="${v}" cy="-38" r="2.5" fill="#7a4a24"/>`).join('')}`;
  else if(kind==='tapioca')f=`<path d="M-34,-12 A34,30 0 0 1 34,-12Z" fill="#fdf8ea" ${ST3}/><path d="M-22,-14 q22,-12 44,0" stroke="#e8dcc2" stroke-width="5" fill="none"/>`;
  else if(kind==='mandioca')f=`<path d="M-36,-14 Q-10,-40 36,-24 Q10,-4 -36,-14Z" fill="#8a5a2b" ${ST3}/><path d="M-10,-30 Q14,-58 40,-48 Q20,-30 -10,-30Z" fill="#a06a35" ${ST3}/>`;
  else if(kind==='milho')f=`<path d="M-10,-10 Q-16,-50 0,-62 Q16,-50 10,-10Z" fill="#f6c21c" ${ST3}/><path d="M-12,-10 Q-30,-30 -20,-48 M12,-10 Q30,-30 20,-48" stroke="#3f9a3a" stroke-width="7" fill="none" stroke-linecap="round"/>`;
  else if(kind==='inhame')f=`<ellipse cx="0" cy="-26" rx="34" ry="20" fill="#b89a7a" ${ST3}/><path d="M-14,-30 h6 M4,-22 h8" stroke="${OL}" stroke-width="3"/>`;
  else if(kind==='quiabo')f=`<path d="M-30,-12 Q0,-36 34,-40 Q8,-12 -30,-12Z" fill="#4f9f44" ${ST3}/><path d="M-22,-30 Q6,-50 36,-58 Q14,-30 -22,-30Z" fill="#63b04d" ${ST3}/>`;
  else if(kind==='dende')f=`<rect x="-14" y="-52" width="28" height="44" rx="8" fill="#e8590c" ${ST3}/><rect x="-7" y="-66" width="14" height="16" fill="#c9a227" ${ST3}/>`;
  else if(kind==='doce')f=`<circle cx="-16" cy="-22" r="13" fill="#f6c21c" ${ST3}/><circle cx="12" cy="-22" r="13" fill="#f6c21c" ${ST3}/><circle cx="-2" cy="-42" r="13" fill="#f6c21c" ${ST3}/>`;
  else if(kind==='carne')f=`<path d="M-34,-14 Q-30,-46 6,-44 Q38,-40 32,-14Z" fill="#a8452f" ${ST3}/><path d="M-14,-30 h20" stroke="#fdf8ea" stroke-width="4"/>`;
  else if(kind==='coalho')f=`<path d="M-40,-28 H40" stroke="#a9743f" stroke-width="5"/><rect x="-24" y="-40" width="44" height="24" rx="4" fill="#fdf8ea" ${ST3}/><path d="M-14,-40 v24 M0,-40 v24" stroke="#b9733f" stroke-width="3"/>`;
  else if(kind==='peixe')f=`<path d="M-34,-28 Q0,-54 30,-28 L44,-42 V-14 L30,-28 Q0,-4 -34,-28Z" fill="#8ecae6" ${ST3}/><circle cx="-18" cy="-30" r="3" fill="${OL}"/>`;
  else if(kind==='panela')f=`<path d="M-34,-46 H34 L28,-8 H-28Z" fill="#5a5f66" ${ST3}/><ellipse cx="0" cy="-46" rx="34" ry="8" fill="#7a4a24" ${ST3}/>`;
  return `<ellipse cx="0" cy="-6" rx="50" ry="12" fill="#fdf8ea" ${ST3}/>${f}${label?sign(0,34,label,{fs:17,_s:1}):''}`;
}
