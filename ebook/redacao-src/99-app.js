// ---------- armazenamento local (pode falhar em janela privada) ----------
const store = {
  get(k, d){ try{ const v = localStorage.getItem('red40:'+k); return v === null ? d : JSON.parse(v); }catch(e){ return d; } },
  set(k, v){ try{ localStorage.setItem('red40:'+k, JSON.stringify(v)); }catch(e){} }
};
const $ = (s, el) => (el || document).querySelector(s);
const $$ = (s, el) => Array.from((el || document).querySelectorAll(s));
const esc = s => String(s).replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
// segunda versão de uma redação-modelo (campo base = id da versão 1)
const v2Of = id => MODELOS.find(m => m.base === id);

// ---------- navegação ----------
const views = $$('.view');
const chapters = views.filter(v => v.id !== 'inicio');
let read = store.get('read', {});

function buildNav(){
  $('#nav').innerHTML = views.map((v, i) =>
    `<a href="#${v.id}" data-v="${v.id}" class="${read[v.id] ? 'done' : ''}"><span class="num">${i === 0 ? '··' : String(i).padStart(2, '0')}</span><span>${esc(v.dataset.title)}</span>${i === 0 ? '<span></span>' : '<span class="dot" aria-hidden="true"></span>'}</a>`
  ).join('');
  $('#readProg').textContent = `${chapters.filter(v => read[v.id]).length}/${chapters.length} lidos`;
}
function addPagers(){
  views.forEach((v, i) => {
    const prev = views[i - 1], next = views[i + 1];
    let html = '';
    if(v.id !== 'inicio') html += `<div class="mark-read"><button class="btn ghost" type="button" data-read="${v.id}"></button></div>`;
    html += '<nav class="pager" aria-label="Capítulos">';
    if(prev) html += `<a href="#${prev.id}"><small>Anterior</small>${esc(prev.dataset.title)}</a>`;
    if(next) html += `<a class="next" href="#${next.id}"><small>Próximo</small>${esc(next.dataset.title)}</a>`;
    html += '</nav>';
    v.insertAdjacentHTML('beforeend', html);
  });
  $$('[data-read]').forEach(b => b.addEventListener('click', () => {
    const id = b.dataset.read; read[id] = !read[id]; store.set('read', read); paintRead(); buildNav(); markCurrent();
  }));
  paintRead();
}
function paintRead(){
  $$('[data-read]').forEach(b => { b.textContent = read[b.dataset.read] ? '✓ Capítulo lido (desmarcar)' : 'Marcar capítulo como lido'; });
}
function markCurrent(){
  const id = current();
  $$('#nav a').forEach(a => a.dataset.v === id ? a.setAttribute('aria-current', 'page') : a.removeAttribute('aria-current'));
}
function current(){
  const h = location.hash.slice(1);
  return views.some(v => v.id === h) ? h : 'inicio';
}
function show(){
  const id = current();
  views.forEach(v => { v.hidden = v.id !== id; });
  const v = views.find(x => x.id === id);
  $('#where').textContent = v.dataset.title;
  markCurrent();
  closeMenu();
  window.scrollTo({top: 0, behavior: 'instant'});
  store.set('last', id);
}
window.addEventListener('hashchange', show);

// gaveta do sumário (celular)
const side = $('#side'), scrim = $('#scrim'), menuBtn = $('#menuBtn');
function closeMenu(){ side.classList.remove('open'); scrim.classList.remove('open'); menuBtn.setAttribute('aria-expanded', 'false'); }
menuBtn.addEventListener('click', () => {
  const open = !side.classList.contains('open');
  side.classList.toggle('open', open); scrim.classList.toggle('open', open); menuBtn.setAttribute('aria-expanded', String(open));
});
scrim.addEventListener('click', closeMenu);

// tema claro/escuro
(function(){
  const saved = store.get('theme', null);
  if(saved) document.documentElement.setAttribute('data-theme', saved);
  $('#themeBtn').addEventListener('click', () => {
    const cur = document.documentElement.getAttribute('data-theme') || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    const nxt = cur === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', nxt); store.set('theme', nxt);
  });
})();

// ---------- exercícios ----------
let answers = store.get('quiz', {});
function renderQuiz(boxId, key, items, scoreId){
  const box = document.getElementById(boxId); if(!box) return;
  box.innerHTML = items.map((q, i) =>
    `<div class="q" data-i="${i}"><span class="qn">${i + 1} de ${items.length}</span><p class="qe">${esc(q.e)}</p><div class="opts">${q.o.map((o, j) => `<button type="button" data-j="${j}">${esc(o)}</button>`).join('')}</div><div class="fb" hidden></div></div>`
  ).join('');
  const paint = () => {
    let ok = 0, done = 0;
    $$('.q', box).forEach(el => {
      const i = +el.dataset.i, q = items[i], a = answers[key + i];
      const fb = $('.fb', el);
      $$('button', el).forEach(b => b.classList.remove('right', 'wrong'));
      if(a === undefined){ fb.hidden = true; return; }
      done++; if(a === q.a) ok++;
      $$('button', el)[q.a].classList.add('right');
      if(a !== q.a) $$('button', el)[a].classList.add('wrong');
      fb.hidden = false; fb.classList.toggle('bad', a !== q.a);
      fb.innerHTML = `<b>${a === q.a ? 'Correto.' : 'Errado.'}</b> ${esc(q.x)}`;
    });
    if(scoreId){ const s = document.getElementById(scoreId); if(s) s.textContent = done ? `Acertos: ${ok}/${done}` : ''; }
  };
  box.addEventListener('click', e => {
    const b = e.target.closest('button[data-j]'); if(!b) return;
    const i = +b.closest('.q').dataset.i;
    answers[key + i] = +b.dataset.j; store.set('quiz', answers); paint();
  });
  paint();
}

// ---------- repertórios ----------
(function(){
  let tag = 'todos', tipo = 'todos', q = '';
  const tags = ['todos', ...Object.keys(TAGS)];
  $('#repFilters').innerHTML = tags.map(t => `<button type="button" data-t="${t}" aria-pressed="${t === tag}">${t === 'todos' ? 'Todos os temas' : esc(TAGS[t])}</button>`).join('');
  $('#repTypes').innerHTML = ['todos', ...REP_TIPOS].map(t => `<button type="button" data-k="${esc(t)}" aria-pressed="${t === tipo}">${t === 'todos' ? 'Todos os tipos' : esc(t)}</button>`).join('');
  const norm = s => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
  function render(){
    const list = REPS.filter(r => (tag === 'todos' || r.t.includes(tag)) && (tipo === 'todos' || r.w === tipo) && (!q || norm(r.n + ' ' + r.i + ' ' + r.u).includes(norm(q))));
    $('#repCount').textContent = `${list.length} de ${REPS.length} repertórios`;
    $('#repList').innerHTML = list.map(r =>
      `<article class="rep"><h4>${esc(r.n)} <span class="who">${esc(r.w)}</span>${r.t.includes('cor') ? '<span class="chip hot">Coringa</span>' : ''}</h4><p>${esc(r.i)}</p><p class="use">${esc(r.u)}</p><div class="tags">${r.t.filter(t => t !== 'cor').map(t => `<span class="chip">${esc(TAGS[t])}</span>`).join('')}</div></article>`
    ).join('') || '<p class="small">Nenhum repertório encontrado. Tente outra palavra ou limpe os filtros.</p>';
  }
  $('#repFilters').addEventListener('click', e => { const b = e.target.closest('button'); if(!b) return; tag = b.dataset.t; $$('#repFilters button').forEach(x => x.setAttribute('aria-pressed', String(x === b))); render(); });
  $('#repTypes').addEventListener('click', e => { const b = e.target.closest('button'); if(!b) return; tipo = b.dataset.k; $$('#repTypes button').forEach(x => x.setAttribute('aria-pressed', String(x === b))); render(); });
  $('#repSearch').addEventListener('input', e => { q = e.target.value.trim(); render(); });
  render();
})();

// ---------- temas ----------
(function(){
  let cat = 'todos';
  $('#temaFilters').innerHTML = ['todos', ...Object.keys(TEMA_CATS)].map(c => `<button type="button" data-c="${c}" aria-pressed="${c === cat}">${c === 'todos' ? 'Todos' : esc(TEMA_CATS[c])}</button>`).join('');
  function render(){
    const list = TEMAS.filter(t => cat === 'todos' || t.c === cat).sort((x, y) => (y.h === 'alta') - (x.h === 'alta'));
    $('#temaCount').textContent = `${list.length} temas`;
    $('#temaList').innerHTML = list.map(t =>
      `<details class="acc"><summary><span class="chip ${t.h === 'alta' ? 'hot' : ''}">${t.h === 'alta' ? 'chance alta' : 'chance média'}</span><span>${esc(t.t)}</span></summary><div class="acc-body">
        <h4>Tese</h4><p><span class="hl">${esc(t.tese)}</span></p>
        <h4>Argumento 1 · Desenvolvimento 1</h4><p>${esc(t.a1)}</p>
        <h4>Argumento 2 · Desenvolvimento 2</h4><p>${esc(t.a2)}</p>
        <h4>Repertórios</h4><p>${esc(t.r)}</p>
        <h4>Proposta (conclusão)</h4><p>${esc(t.p)}</p>
        <div class="box trap"><span class="tag">Cuidado</span><p>${esc(t.x)}</p></div>
        ${t.m ? `<p><a href="#modelos" data-mod="${t.m}">Ver a redação-modelo deste tema →</a>${v2Of(t.m) ? ` · <a href="#modelos" data-mod="${v2Of(t.m).id}">Ver a versão 2 →</a>` : ''}</p>` : ''}
      </div></details>`
    ).join('');
  }
  $('#temaList').addEventListener('click', e => { const a = e.target.closest('[data-mod]'); if(a) showModelo(a.dataset.mod); });
  $('#temaFilters').addEventListener('click', e => { const b = e.target.closest('button'); if(!b) return; cat = b.dataset.c; $$('#temaFilters button').forEach(x => x.setAttribute('aria-pressed', String(x === b))); render(); });
  render();
})();

// ---------- redações-modelo ----------
const CONECTIVOS = ['No entanto','Entretanto','Contudo','Todavia','Em primeiro lugar','Além disso','Portanto','Para isso','Sob essa ótica','Nesse sentido','Nesse contexto','Dessa forma','Desse modo','de modo que','a fim de','ou seja','pois','Embora','o que'];
const conRe = new RegExp('(?<![\\p{L}])(' + CONECTIVOS.map(c => c.replace(/ /g, '\\s')).join('|') + ')(?![\\p{L}])', 'gu');
function lineHTML(raw, state){
  // state.cls: classe aberta vinda da linha anterior
  let out = state.cls ? `<span class="t-${state.cls}">` : '';
  const parts = raw.split(/(\{[trp]\}|\{\/\})/);
  for(const part of parts){
    if(part === '{/}'){ out += '</span>'; state.cls = null; continue; }
    const m = part.match(/^\{([trp])\}$/);
    if(m){ const c = {t:'tese', r:'rep', p:'prop'}[m[1]]; out += `<span class="t-${c}">`; state.cls = c; continue; }
    const txt = esc(part);
    out += state.cls ? txt : txt.replace(conRe, '<span class="t-con">$1</span>');
  }
  if(state.cls) out += '</span>';
  return out;
}
function sheetHTML(paragraphs, annotate){
  const state = {cls:null};
  let n = 0;
  const lis = paragraphs.map((p, pi) => p.map((l, li) => { n++; return `<li class="p${pi + 1}"><span class="tx${li === 0 ? ' ind' : ''}">${lineHTML(l, state)}</span></li>`; }).join('')).join('');
  return `<div class="sheet${annotate ? ' annot' : ''}"><ol>${lis}</ol></div>`;
}
let showModelo = () => {};
(function(){
  let cur = Math.min(Math.max(+store.get('mod', 0) || 0, 0), MODELOS.length - 1), annot = store.get('annot', true);
  const sel = $('#modSel');
  const opt = (m, label) => `<option value="${MODELOS.indexOf(m)}">${esc(label)}</option>`;
  sel.innerHTML = `<optgroup label="Uma redação por tema">${MODELOS.filter(m => !m.base).map((m, i) => opt(m, `${i + 1}. ${m.curto}`)).join('')}</optgroup>`
    + `<optgroup label="Versão 2 · temas de chance alta">${MODELOS.filter(m => m.base).map(m => opt(m, `${m.curto} · versão 2`)).join('')}</optgroup>`;
  function render(){
    const m = MODELOS[cur];
    const counts = m.p.map(p => p.length).join(' + ');
    $('#modBox').innerHTML = `
      <h3>${esc(m.tema)}</h3>
      <p class="small">${esc(m.tipo)} · ${counts} = ${m.p.flat().length} linhas</p>
      ${m.base ? `<p class="small"><a href="#modelos" data-mod="${m.base}">← Ver a versão 1 deste tema</a></p>` : v2Of(m.id) ? `<p class="small"><a href="#modelos" data-mod="${v2Of(m.id).id}">Ver a versão 2 deste tema, com outra tese →</a></p>` : ''}
      <label class="small" style="display:inline-flex;gap:8px;align-items:center;cursor:pointer"><input type="checkbox" id="annotChk" ${annot ? 'checked' : ''}> Mostrar marcações</label>
      <div class="sheet-legend"><span><i class="sw" style="background:var(--hl-tese)"></i>Tese</span><span><i class="sw" style="background:var(--hl-rep)"></i>Repertório</span><span><i class="sw" style="background:var(--hl-con)"></i>Conectivo</span><span><i class="sw" style="background:var(--hl-prop)"></i>Proposta</span></div>
      ${sheetHTML(m.p, annot)}
      <h4>Por que esta redação pontua alto</h4>
      <ul>${m.notas.map(n => `<li>${esc(n)}</li>`).join('')}</ul>`;
    $('#annotChk').addEventListener('change', e => { annot = e.target.checked; store.set('annot', annot); $('#modBox .sheet').classList.toggle('annot', annot); });
  }
  function select(i){
    cur = Math.min(Math.max(i, 0), MODELOS.length - 1);
    sel.value = String(cur); $('#modPrev').disabled = cur === 0; $('#modNext').disabled = cur === MODELOS.length - 1;
    store.set('mod', cur); render();
  }
  showModelo = id => { const i = MODELOS.findIndex(m => m.id === id); if(i >= 0) select(i); };
  sel.addEventListener('change', () => select(+sel.value));
  $('#modBox').addEventListener('click', e => { const a = e.target.closest('[data-mod]'); if(!a) return; e.preventDefault(); showModelo(a.dataset.mod); $('.mod-nav').scrollIntoView({block: 'start'}); });
  $('#modPrev').addEventListener('click', () => select(cur - 1));
  $('#modNext').addEventListener('click', () => select(cur + 1));
  select(cur);
})();

// ---------- contador de 20 linhas ----------
const cText = $('#cText'), cpl = $('#cpl'), ind = $('#ind');
function wrap(par, width, indent){
  const words = par.split(/\s+/).filter(Boolean);
  const lines = []; let line = '', cap = width - indent;
  for(const w of words){
    if(!line){ line = w; continue; }
    if(line.length + 1 + w.length <= cap){ line += ' ' + w; }
    else { lines.push(line); line = w; cap = width; }
  }
  if(line) lines.push(line);
  return lines;
}
function count(){
  const W = Math.max(40, Math.min(110, +cpl.value || 68)), I = Math.max(0, Math.min(15, +ind.value || 0));
  const pars = cText.value.split(/\n+/).map(s => s.trim()).filter(Boolean);
  const wrapped = pars.map(p => wrap(p, W, I));
  const total = wrapped.reduce((s, l) => s + l.length, 0);
  const words = pars.join(' ').split(/\s+/).filter(Boolean).length;
  $('#cTotal').innerHTML = `${total}<small> / 20 linhas</small>`;
  $('#cWords').textContent = `${words} palavras · ${pars.length} parágrafo${pars.length === 1 ? '' : 's'}`;
  const st = $('#cStatus');
  let cls = 'warn', msg = 'Comece a escrever';
  if(total === 20) { cls = 'ok'; msg = 'Exatamente 20 linhas'; }
  else if(total > 20) { cls = 'bad'; msg = `${total - 20} linha${total - 20 > 1 ? 's' : ''} além da 20ª seria${total - 20 > 1 ? 'm' : ''} desconsiderada${total - 20 > 1 ? 's' : ''}`; }
  else if(total >= 15) { msg = `Dentro do edital, mas faltam ${20 - total} para 20`; }
  else if(total > 0) { cls = 'bad'; msg = `Abaixo de 15 linhas: risco de nota zero`; }
  if(total > 0 && pars.length !== 4) { msg += ` · use 4 parágrafos (você tem ${pars.length})`; if(cls === 'ok') cls = 'warn'; }
  st.className = 'pill ' + cls; st.textContent = msg;
  const target = [4, 6, 6, 4], names = ['Introdução', 'Desenv. 1', 'Desenv. 2', 'Conclusão'];
  $('#cBars').innerHTML = wrapped.map((l, i) => {
    const t = pars.length === 4 ? target[i] : null;
    const pct = Math.min(100, l.length / (t || 8) * 100);
    return `<div class="par-bar"><span>${pars.length === 4 ? names[i] : 'Parágrafo ' + (i + 1)}</span><span class="track"><i class="${t && l.length > t ? 'over' : ''}" style="width:${pct}%"></i></span><span class="v">${l.length}${t ? ' / ' + t : ''}</span></div>`;
  }).join('');
  let n = 0, lis = '';
  wrapped.forEach(ls => ls.forEach((l, j) => { n++; lis += `<li><span class="tx${j === 0 ? ' ind' : ''}"${n > 20 ? ' style="color:var(--red);text-decoration:line-through"' : ''}>${esc(l)}</span></li>`; }));
  for(; n < 20; n++) lis += '<li><span class="tx"></span></li>';
  $('#cSheet ol').innerHTML = lis;
  store.set('draft', {t: cText.value, w: cpl.value, i: ind.value});
}
(function(){
  const d = store.get('draft', null);
  if(d){ cText.value = d.t || ''; cpl.value = d.w || 68; ind.value = d.i || 6; }
  [cText, cpl, ind].forEach(el => el.addEventListener('input', count));
  count();
})();

// ---------- montador ----------
(function(){
  const ids = ['rep0','rep0i','prob','a1','a2','t1','r1','r1i','e1','c1','t2','r2','e2','c2','ag','ac','me','fi'];
  const ex = {
    rep0:'a Organização Mundial da Saúde', rep0i:'o trânsito é a principal causa de morte de jovens no mundo',
    prob:'o número de mortes nas vias brasileiras', a1:'da imprudência dos condutores', a2:'da fiscalização insuficiente',
    t1:'a imprudência dos condutores', r1:'a Lei Seca, de 2008', r1i:'há tolerância zero ao álcool na direção',
    e1:'muitos motoristas ainda bebem e dirigem por acreditarem que não serão flagrados', c1:'acidentes graves e mortes evitáveis',
    t2:'a fiscalização insuficiente nas rodovias e cidades', r2:'na baixa quantidade de blitze e radares em muitos municípios',
    e2:'a sensação de impunidade estimula o excesso de velocidade', c2:'as infrações se tornam rotina',
    ag:'o Detran, em parceria com as polícias,', ac:'ampliar a fiscalização e as campanhas educativas', me:'blitze com bafômetro e palestras em escolas', fi:'reduzir as mortes no trânsito'
  };
  const f = id => document.getElementById('m_' + id);
  const saved = store.get('mont', null);
  ids.forEach(id => { if(saved && saved[id]) f(id).value = saved[id]; f(id).addEventListener('input', save); });
  function save(){ const o = {}; ids.forEach(id => o[id] = f(id).value); store.set('mont', o); }
  const v = id => f(id).value.trim().replace(/[.\s]+$/, '') || `[${f(id).previousElementSibling.textContent.toLowerCase()}]`;
  const cap = s => s.charAt(0).toUpperCase() + s.slice(1);
  function build(){
    const p1 = `Segundo ${v('rep0')}, ${v('rep0i')}. No entanto, ${v('prob')} ainda preocupa o país, sobretudo em razão ${v('a1')} e ${v('a2')}.`;
    const p2 = `Em primeiro lugar, destaca-se ${v('t1')} como fator que agrava o problema. De acordo com ${v('r1')}, ${v('r1i')}. Sob essa ótica, ${v('e1')}, o que resulta em ${v('c1')}. Dessa forma, o problema se mantém.`;
    const p3 = `Além disso, cabe ressaltar ${v('t2')}. Esse fato pode ser observado ${v('r2')}. Nesse contexto, ${v('e2')}, de modo que ${v('c2')}. Assim, torna-se evidente a necessidade de mudança.`;
    const p4 = `Portanto, é necessário enfrentar esse problema. Para isso, ${v('ag')} deve ${v('ac')}, por meio de ${v('me')}, a fim de ${v('fi')}.`;
    return [p1, p2, p3, p4].map(cap).join('\n');
  }
  $('#mBuild').addEventListener('click', () => { $('#mOut').textContent = build(); });
  $('#mSend').addEventListener('click', () => { const t = build(); $('#mOut').textContent = t; cText.value = t; count(); $('#toolCount').scrollIntoView({behavior:'smooth'}); });
  $('#mExample').addEventListener('click', () => { ids.forEach(id => f(id).value = ex[id]); save(); $('#mOut').textContent = build(); });
  $('#mClear').addEventListener('click', () => { ids.forEach(id => f(id).value = ''); save(); $('#mOut').textContent = ''; });
  if(saved) $('#mOut').textContent = build();
})();

// ---------- cronômetro ----------
(function(){
  const total = 60 * 60;
  const phases = [[10, 'Ler e planejar'], [25, 'Rascunho'], [5, 'Ajustar para 20 linhas'], [5, 'Revisar gramática'], [15, 'Passar a limpo']];
  let left = total, timer = null;
  function phase(){
    let el = (total - left) / 60, acc = 0;
    for(const [m, n] of phases){ acc += m; if(el < acc) return n; }
    return 'Tempo esgotado';
  }
  function paint(){
    const m = Math.floor(left / 60), s = left % 60;
    $('#tClock').textContent = `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
    const p = $('#tPhase');
    p.textContent = timer ? phase() : (left === total ? 'Parado' : left === 0 ? 'Tempo esgotado' : 'Pausado · ' + phase());
    p.className = 'pill ' + (left === 0 ? 'bad' : timer ? 'ok' : 'warn');
  }
  $('#tStart').addEventListener('click', () => { if(timer || left === 0) return; timer = setInterval(() => { left--; if(left <= 0){ left = 0; clearInterval(timer); timer = null; } paint(); }, 1000); paint(); });
  $('#tPause').addEventListener('click', () => { clearInterval(timer); timer = null; paint(); });
  $('#tReset').addEventListener('click', () => { clearInterval(timer); timer = null; left = total; paint(); });
  paint();
})();

// ---------- autoavaliação ----------
(function(){
  const C = [
    ['Critério 1 · Tema, informatividade e argumentação', ['Usei as palavras-chave do tema na introdução e na conclusão','A tese está explícita no fim da introdução e anuncia 2 argumentos','Cada desenvolvimento tem um repertório (lei, autor, dado, obra ou fato)','Expliquei cada repertório e mostrei o que ele prova','A conclusão traz proposta com agente, ação, meio e finalidade']],
    ['Critério 2 · Coesão e coerência', ['Todos os parágrafos começam com conectivo adequado','Usei conectivos dentro dos parágrafos com o sentido certo','Não repeti as mesmas palavras; usei sinônimos e pronomes','Os desenvolvimentos tratam exatamente dos argumentos da tese','Não há contradição nem generalização ("todos", "nunca")']],
    ['Critério 3 · Estrutura e parágrafos', ['Tem 4 parágrafos: introdução, 2 desenvolvimentos e conclusão','Parágrafos com recuo e tamanho equilibrado (4-6-6-4)','Escrevi entre 15 e 20 linhas (meta: exatamente 20)','Texto dissertativo-argumentativo, em 3ª pessoa, sem narrar','Não pulei linhas nem escrevi fora das margens']],
    ['Critério 4 · Modalidade gramatical', ['Nenhuma vírgula entre sujeito e verbo','Concordância certa (haver, existir, tem/têm)','Crases revisadas','Acentos e grafia revisados (ideia, porque, mas/mais, mal/mau)','Linguagem formal, sem gírias, "a gente" ou abreviações']]
  ];
  let s = store.get('self', {});
  $('#sCrit').innerHTML = C.map(([t, items], ci) =>
    `<div class="crit-card"><h4><span>${esc(t)}</span><span class="mono" id="sc${ci}">0/10</span></h4><ul class="checks">${items.map((it, ii) => `<li><label><input type="checkbox" id="s_${ci}_${ii}" data-k="${ci}_${ii}"><span>${esc(it)}</span></label></li>`).join('')}</ul></div>`
  ).join('');
  function paint(){
    let tot = 0;
    C.forEach((c, ci) => { let n = 0; c[1].forEach((_, ii) => { const on = !!s[ci + '_' + ii]; document.getElementById(`s_${ci}_${ii}`).checked = on; if(on) n += 2; }); tot += n; $('#sc' + ci).textContent = `${n}/10`; });
    $('#sTotal').innerHTML = `${tot}<small> / 40</small>`;
    $('#sGauge').style.width = (tot / 40 * 100) + '%';
    const st = $('#sStatus');
    if(tot < 12){ st.className = 'pill bad'; st.textContent = 'Abaixo do mínimo de 12'; }
    else if(tot < 30){ st.className = 'pill warn'; st.textContent = 'Aprovado na redação · dá para subir'; }
    else if(tot < 40){ st.className = 'pill ok'; st.textContent = 'Nota competitiva'; }
    else { st.className = 'pill ok'; st.textContent = 'Todos os itens cumpridos'; }
  }
  $('#sCrit').addEventListener('change', e => { const k = e.target.dataset.k; if(!k) return; s[k] = e.target.checked; store.set('self', s); paint(); });
  $('#sReset').addEventListener('click', () => { s = {}; store.set('self', s); paint(); });
  paint();
})();

// ---------- plano e checklist ----------
(function(){
  const W = [
    ['Semana 1 · Base', ['Ler os capítulos 1 a 4','Calibrar a letra (capítulo 3)','Decorar os moldes de introdução e conclusão','Montar 1 redação no montador (tema: segurança pública)','Reescrever essa redação à mão em 20 linhas']],
    ['Semana 2 · Argumentação', ['Ler os capítulos 5 e 8','Decorar 8 repertórios coringa','Montar o kit de 3 temas (tese, 2 argumentos, repertórios)','Escrever 2 redações com cronômetro de 60 min','Fazer a autoavaliação das 2']],
    ['Semana 3 · Coesão e gramática', ['Fazer os exercícios dos capítulos 6 e 7','Escrever 2 redações sem o montador','Anotar os 5 erros que você mais repete','Reescrever o pior parágrafo da semana']],
    ['Semana 4 · Simulado', ['Copiar à mão uma redação-modelo','Escrever 3 redações em condição de prova (rascunho + definitiva)','Revisar os kits de todos os temas','Ler o checklist do dia da prova']]
  ];
  const F = ['Falei do recorte do tema, não só do assunto geral','Tese clara no fim da introdução','Exatamente 20 linhas, no mapa 4-6-6-4','Recuo em todos os parágrafos e nenhuma linha pulada','Nenhum nome, assinatura ou marca que identifique','Sem 1ª pessoa, gírias, perguntas ou exclamações','Revisei vírgulas, crases, acentos e concordância','Letra legível, com a caneta exigida','Transcrevi tudo para a folha definitiva'];
  let p = store.get('plan', {});
  $('#weeks').innerHTML = W.map(([t, items], wi) =>
    `<details class="acc" open><summary>${esc(t)}</summary><div class="acc-body"><ul class="checks">${items.map((it, ii) => `<li><label><input type="checkbox" id="w_${wi}_${ii}" data-k="w${wi}_${ii}"><span>${esc(it)}</span></label></li>`).join('')}</ul></div></details>`
  ).join('');
  $('#finalChecks').innerHTML = F.map((it, i) => `<li><label><input type="checkbox" id="f_${i}" data-k="f${i}"><span>${esc(it)}</span></label></li>`).join('');
  $$('#weeks input, #finalChecks input').forEach(el => { el.checked = !!p[el.dataset.k]; el.addEventListener('change', () => { p[el.dataset.k] = el.checked; store.set('plan', p); }); });
})();

// ---------- início ----------
renderQuiz('quizTese', 'tese', QUIZ.tese);
renderQuiz('quizFuga', 'fuga', QUIZ.fuga);
renderQuiz('quizCon', 'con', QUIZ.con, 'scoreCon');
renderQuiz('quizGram', 'gram', QUIZ.gram, 'scoreGram');
buildNav();
addPagers();
show();
