(function () {
  'use strict';
  var QS = window.QUESTOES || [];
  var FC = window.FLASH || [];
  var KEY = 'pmpe26.v1';
  var LET = 'ABCDE';
  var $ = function (id) { return document.getElementById(id); };
  var qsa = function (sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); };
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function pad(n) { return (n < 10 ? '0' : '') + n; }

  var DISC = [
    { k: 'lp', n: 'Língua Portuguesa', a: 'LP', b: 'I', c: 'var(--d-lp)' },
    { k: 'hpe', n: 'História de Pernambuco', a: 'HPE', b: 'I', c: 'var(--d-hpe)' },
    { k: 'rlm', n: 'Raciocínio Lógico', a: 'RLM', b: 'II', c: 'var(--d-rlm)' },
    { k: 'inf', n: 'Informática', a: 'INF', b: 'II', c: 'var(--d-inf)' },
    { k: 'dc', n: 'Direito Constitucional', a: 'DC', b: 'III', c: 'var(--d-dc)' },
    { k: 'dh', n: 'Direitos Humanos e Legislação Extravagante', a: 'DH', b: 'III', c: 'var(--d-dh)' }
  ];
  var discBy = {}; DISC.forEach(function (d) { discBy[d.k] = d; });

  // ---------- estado salvo ----------
  var state = { a: {}, r: {} };
  try {
    var raw = localStorage.getItem(KEY);
    if (raw) { var parsed = JSON.parse(raw); if (parsed && parsed.a) { state = parsed; state.r = state.r || {}; } }
  } catch (e) {}
  function save() { try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) {} }
  function pref(k, v) {
    try { if (v === undefined) return localStorage.getItem('pmpe26.' + k); localStorage.setItem('pmpe26.' + k, v); } catch (e) { return null; }
  }

  // ---------- normalização (mantém o comprimento para destacar trechos) ----------
  function normKeep(s) {
    var out = '';
    for (var i = 0; i < s.length; i++) {
      var d = s[i].normalize ? s[i].normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase() : s[i].toLowerCase();
      out += d.length === 1 ? d : (d.length ? d[0] : ' ');
    }
    return out;
  }
  function norm(s) { return normKeep(s).replace(/[º°ª]/g, '').replace(/\s+/g, ' ').trim(); }
  function toks(s) { return norm(s).split(/[^a-z0-9§]+/).filter(Boolean); }
  var ROMAN = /^(xc|xl|l?x{0,3})(ix|iv|v?i{0,3})$/;
  function isExactTok(t) { return /^\d+$/.test(t) || (t.length <= 7 && ROMAN.test(t)); }
  var STOP = { de: 1, da: 1, do: 1, das: 1, dos: 1, e: 1, a: 1, o: 1, as: 1, os: 1, em: 1, no: 1, na: 1, ao: 1, para: 1, com: 1, que: 1, artigo: 1, ir: 1 };

  // ---------- capítulos ----------
  var chapters = qsa('section.chapter').map(function (s) {
    return { id: s.id, disc: s.dataset.disc || 'dh', title: s.dataset.title, short: s.dataset.short, el: s };
  });
  var capById = {};
  var discCount = {};
  chapters.forEach(function (c) {
    discCount[c.disc] = (discCount[c.disc] || 0) + 1;
    c.num = discCount[c.disc];
    c.label = discBy[c.disc].a + ' ' + c.num;
    capById[c.id] = c;
  });
  function chapsOf(k) { return chapters.filter(function (c) { return c.disc === k; }); }

  // ---------- questões ----------
  QS = QS.filter(function (q) { return capById[q.c]; });
  var perCap = {};
  QS.forEach(function (q) { perCap[q.c] = (perCap[q.c] || 0) + 1; q.n = perCap[q.c]; q.id = q.c + '-' + q.n; q.disc = capById[q.c].disc; });
  function hash(s) { var h = 2166136261; for (var i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); } return h >>> 0; }
  function rng(seed) {
    return function () {
      seed = (seed + 0x6D2B79F5) | 0;
      var t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }
  QS.forEach(function (q) {
    if (q.e.indexOf('type="I"') >= 0 || q.fix) return;
    var r = rng(hash(q.id + ':' + q.e.length)), idx = q.o.map(function (_, i) { return i; });
    for (var i = idx.length - 1; i > 0; i--) { var j = Math.floor(r() * (i + 1)); var t = idx[i]; idx[i] = idx[j]; idx[j] = t; }
    q.o = idx.map(function (i) { return q.o[i]; });
    q.a = idx.indexOf(q.a);
  });
  var qById = {}; QS.forEach(function (q) { qById[q.id] = q; });
  function qsOf(capId) { return QS.filter(function (q) { return q.c === capId; }); }
  function stats(list) {
    var answered = 0, right = 0;
    list.forEach(function (q) { var v = state.a[q.id]; if (v !== undefined) { answered++; if (v === q.a) right++; } });
    return { total: list.length, answered: answered, right: right };
  }

  function qCard(q, opts) {
    opts = opts || {};
    var cap = capById[q.c];
    var art = document.createElement('article');
    art.className = 'q';
    art.dataset.id = q.id;
    var tag = q.b === 'AOCP' ? 'AOCP' : 'Estilo ' + q.b;
    art.innerHTML =
      '<div class="q-meta"><span class="qn">' + (opts.label || ('Questão ' + q.n)) + '</span>' +
      '<span class="tag ' + q.b.toLowerCase() + '">' + tag + '</span>' +
      '<span><span class="disc-dot" style="background:' + discBy[cap.disc].c + '"></span>' + cap.label + ' · ' + esc(cap.short) + '</span></div>' +
      '<div class="q-stem">' + q.e + '</div>' +
      '<ol class="q-opts">' + q.o.map(function (t, i) {
        return '<li><button type="button" class="opt" data-i="' + i + '"><span class="lt">' + LET[i] + '</span><span>' + t + '</span></button></li>';
      }).join('') + '</ol><div class="q-fb" hidden></div>';
    var buttons = art.querySelectorAll('.opt');
    Array.prototype.forEach.call(buttons, function (b) {
      b.addEventListener('click', function () {
        var i = +b.dataset.i;
        if (opts.mode === 'exam') {
          Array.prototype.forEach.call(buttons, function (x) { x.classList.toggle('sel', x === b); });
          if (opts.onPick) opts.onPick(q, i);
          return;
        }
        if (art.dataset.done) return;
        state.a[q.id] = i; save();
        reveal(art, q, i, opts);
        refreshProgress();
        if (opts.onAnswer) opts.onAnswer(q, i);
      });
    });
    if (opts.mode !== 'exam' && !opts.fresh && state.a[q.id] !== undefined) reveal(art, q, state.a[q.id], opts);
    return art;
  }
  function reveal(art, q, chosen, opts) {
    art.dataset.done = '1';
    qsa('.opt', art).forEach(function (b) {
      var i = +b.dataset.i;
      b.disabled = true; b.classList.remove('sel');
      if (i === q.a) b.classList.add('right'); else if (i === chosen) b.classList.add('wrong');
    });
    var fb = art.querySelector('.q-fb');
    var verdict = chosen === undefined || chosen === null
      ? '<p class="verdict no">Em branco. Gabarito: ' + LET[q.a] + '</p>'
      : chosen === q.a ? '<p class="verdict ok">Correta! Gabarito: ' + LET[q.a] + '</p>'
        : '<p class="verdict no">Errada. Você marcou ' + LET[chosen] + '; gabarito: ' + LET[q.a] + '</p>';
    fb.innerHTML = verdict + '<div class="q-exp">' + q.x + '</div>' +
      (opts && opts.mode === 'exam' ? '' : '<div class="q-actions"><button type="button" class="small-btn redo">Refazer esta questão</button><a class="small-btn" href="#' + q.c + '">Rever a teoria</a></div>');
    fb.hidden = false;
    var redo = fb.querySelector('.redo');
    if (redo) redo.addEventListener('click', function () {
      delete state.a[q.id]; save(); refreshProgress();
      art.replaceWith(qCard(q, Object.assign({}, opts, { fresh: true })));
    });
  }

  // ---------- montagem dos capítulos ----------
  var BIZ = [];      // {el, cap, type, text}
  var SECS = [];     // índice de navegação "Ir para"
  var BLOCKS = [];   // índice de busca no texto

  chapters.forEach(function (c, idx) {
    var sec = c.el, head = sec.querySelector('.ch-head'), theory = sec.querySelector('.theory');
    var kick = head.querySelector('.ch-kicker');
    if (kick && c.disc === 'dh') kick.textContent = 'Direitos Humanos e Legislação Extravagante · Capítulo ' + c.num;
    var list = qsOf(c.id);

    // ids e índices
    SECS.push({ k: 'Capítulo · ' + discBy[c.disc].n, t: c.label + ' – ' + c.title, cap: c, el: null, w: 3 });
    var h2s = qsa(':scope > h2', theory), mini = [];
    qsa('h2, h3', theory).forEach(function (h, i) {
      if (!h.id) h.id = c.id + '-s' + (i + 1);
      SECS.push({ k: (h.tagName === 'H2' ? 'Seção' : 'Subseção') + ' · ' + c.label + ' ' + c.short, t: h.textContent, cap: c, el: h, w: h.tagName === 'H2' ? 2 : 1.5 });
    });
    h2s.forEach(function (h) { mini.push('<li><a href="#' + c.id + '~' + h.id + '">' + esc(h.textContent) + '</a></li>'); });
    qsa('.lei', theory).forEach(function (L, i) {
      if (!L.id) L.id = c.id + '-L' + (i + 1);
      var lab = L.querySelector('.art'); if (!lab) return;
      var label = lab.textContent.trim();
      var src = c.disc === 'dh' && label.indexOf('·') < 0 ? c.short + ' · ' : '';
      SECS.push({ k: 'Artigo · ' + c.label + ' ' + c.short, t: src + label, cap: c, el: L, w: 2.2 });
      var base = (label.match(/Art(?:s)?\.?\s*\d+[º°]?(?:-[A-Z])?/i) || [label])[0];
      var prefix = label.indexOf('·') >= 0 ? label.split('·')[0].trim() + ' · ' : src;
      qsa('p', L).forEach(function (p, j) {
        var tx = p.textContent.trim();
        var m = tx.match(/^([IVXLC]+)\s*[–-]/) || tx.match(/^(§\s*\d+[º°]?(?:-[A-Z])?)/) || tx.match(/^(Parágrafo único)/i) || tx.match(/^(Art\.\s*\d+[º°]?(?:-[A-Z])?)/);
        if (!m || (j === 0 && /^Art\./.test(m[1]))) return;
        if (!p.id) p.id = L.id + '-p' + (j + 1);
        var lbl = /^Art\./.test(m[1]) ? m[1] : base + ', ' + m[1];
        SECS.push({ k: 'Dispositivo · ' + c.label + ' ' + c.short, t: prefix + lbl, sub: tx.slice(0, 140), cap: c, el: p, w: 1.6 });
      });
    });
    qsa('.tbl.filterable tr', theory).forEach(function (tr, i) {
      var td = tr.querySelector('td'); if (!td) return;
      if (!tr.id) tr.id = c.id + '-t' + i + '-' + Math.random().toString(36).slice(2, 6);
      SECS.push({ k: 'Tabela · ' + c.label + ' ' + c.short, t: td.textContent, sub: (tr.textContent.slice(td.textContent.length, td.textContent.length + 140)), cap: c, el: tr, w: 1.3 });
    });
    qsa('.bizu, .trap, .tip', theory).forEach(function (b, i) {
      if (!b.id) b.id = c.id + '-b' + (i + 1);
      var type = b.classList.contains('bizu') ? 'bizu' : b.classList.contains('trap') ? 'trap' : 'tip';
      var lab = b.querySelector('.bizu-label, .trap-label, .tip-label');
      BIZ.push({ el: b, cap: c, type: type, text: norm(b.textContent) });
      SECS.push({ k: (type === 'trap' ? 'Pegadinha' : type === 'bizu' ? 'Bizu' : 'Dica') + ' · ' + c.label + ' ' + c.short, t: lab ? lab.textContent : 'Bizu', sub: b.textContent.replace(lab ? lab.textContent : '', '').trim().slice(0, 140), cap: c, el: b, w: 1.2 });
    });
    qsa('p, li, td, th, h2, h3, h4, .formula, summary, dt, dd', theory).forEach(function (el) {
      if (el.tagName === 'LI' && el.querySelector('ul,ol')) return;
      var tx = el.textContent;
      if (tx.trim().length < 2) return;
      BLOCKS.push({ el: el, cap: c, raw: tx, n: normKeep(tx) });
    });

    // abas
    var tabs = document.createElement('div');
    tabs.className = 'ch-tabs'; tabs.setAttribute('role', 'tablist');
    var isLei = sec.classList.contains('lei-seca');
    tabs.innerHTML = '<button class="ch-tab" role="tab" aria-selected="true" data-t="t">' + (isLei ? 'Texto integral da lei' : 'Teoria') + '</button>' +
      (list.length ? '<button class="ch-tab" role="tab" aria-selected="false" data-t="q">Questões (' + list.length + ')</button>' : '');
    head.after(tabs);
    var miniBox = document.createElement('details');
    miniBox.className = 'ch-mini'; miniBox.open = window.innerWidth > 720;
    miniBox.innerHTML = '<summary>Neste capítulo (' + h2s.length + ' seções)</summary><ol>' + mini.join('') + '</ol>' +
      '<div class="read-row" style="padding:0 14px 12px"><button type="button" class="small-btn mark-read"></button><span class="q-exp"></span></div>';
    tabs.after(miniBox);
    var FULL = { c6: ['dh-eca', 'ECA'], c9: ['dh-mp', 'Lei Maria da Penha'] };
    if (FULL[c.id]) {
      var fl = document.createElement('div'); fl.className = 'read-row'; fl.style.padding = '0 14px 12px';
      fl.innerHTML = '<a class="btn" href="#' + FULL[c.id][0] + '">Ler o texto integral da ' + FULL[c.id][1] + ' →</a>';
      miniBox.appendChild(fl);
    }
    if (isLei) {
      var jb = document.createElement('div'); jb.className = 'read-row'; jb.style.padding = '0 14px 12px';
      jb.innerHTML = '<label class="q-exp" style="display:flex;gap:8px;align-items:center;flex-wrap:wrap">Ir para o artigo nº <input type="text" class="filter-in art-jump" style="width:110px" placeholder="ex.: 136 ou 12-C" aria-label="Número do artigo"> <button type="button" class="small-btn art-go">Ir</button><span class="art-msg"></span></label>';
      miniBox.appendChild(jb);
      var arts = {};
      qsa('.lei .art', theory).forEach(function (a) { var m = a.textContent.match(/Art\.\s*(\d+)[º°]?(-[A-Z]+)?/); if (m) arts[(m[1] + (m[2] || '')).toUpperCase()] = a.parentNode; });
      var ji = jb.querySelector('.art-jump'), jm = jb.querySelector('.art-msg');
      var goArt = function () {
        var k = ji.value.replace(/[^0-9a-z-]/gi, '').toUpperCase();
        if (arts[k]) { jm.textContent = ''; show(c.id, true, arts[k]); } else jm.textContent = k ? 'Artigo ' + k + ' não encontrado.' : '';
      };
      jb.querySelector('.art-go').addEventListener('click', goArt);
      ji.addEventListener('keydown', function (e) { if (e.key === 'Enter') { e.preventDefault(); goArt(); } });
    }
    var markBtn = miniBox.querySelector('.mark-read');
    function paintRead() { markBtn.textContent = state.r[c.id] ? '✓ Capítulo estudado (desmarcar)' : 'Marcar capítulo como estudado'; }
    paintRead();
    markBtn.addEventListener('click', function () { if (state.r[c.id]) delete state.r[c.id]; else state.r[c.id] = 1; save(); paintRead(); refreshProgress(); });

    var quiz = document.createElement('div');
    quiz.className = 'quiz'; quiz.hidden = true;
    theory.after(quiz);
    var cta = document.createElement('div');
    cta.className = 'panel';
    cta.innerHTML = '<h3>Terminou a teoria?</h3><p style="margin:0 0 10px;font-size:.94rem">Resolva as ' + list.length + ' questões deste capítulo.</p><button type="button" class="btn go-q">Ir para as questões</button>';
    if (list.length) theory.appendChild(cta);
    var foot = document.createElement('nav');
    foot.className = 'ch-foot';
    var prev = chapters[idx - 1], next = chapters[idx + 1];
    foot.innerHTML = (prev ? '<a class="btn ghost" href="#' + prev.id + '">← ' + prev.label + ' · ' + esc(prev.short) + '</a>' : '<a class="btn ghost" href="#inicio">← Início</a>') +
      (next ? '<a class="btn" href="#' + next.id + '">' + next.label + ' · ' + esc(next.short) + ' →</a>' : '<a class="btn" href="#simulado">Fazer simulado →</a>');
    sec.appendChild(foot);

    var filter = 'all';
    function renderQuiz() {
      quiz.innerHTML = '';
      var bar = document.createElement('div');
      bar.className = 'quiz-bar';
      var s = stats(list);
      bar.innerHTML = '<div class="seg" role="group" aria-label="Filtrar questões">' +
        ['all:Todas', 'new:Não respondidas', 'wrong:Erradas'].map(function (p) {
          var k = p.split(':');
          return '<button type="button" data-f="' + k[0] + '" aria-pressed="' + (filter === k[0]) + '">' + k[1] + '</button>';
        }).join('') + '</div><button type="button" class="small-btn reset-cap">Zerar capítulo</button>' +
        '<span class="count">' + s.answered + '/' + s.total + ' respondidas · ' + s.right + ' certas</span>';
      quiz.appendChild(bar);
      var confirm = document.createElement('div');
      confirm.className = 'confirm'; confirm.hidden = true;
      confirm.innerHTML = '<span>Apagar suas respostas deste capítulo?</span><button type="button" class="small-btn yes">Sim, zerar</button><button type="button" class="small-btn no">Cancelar</button>';
      quiz.appendChild(confirm);
      qsa('[data-f]', bar).forEach(function (b) { b.addEventListener('click', function () { filter = b.dataset.f; renderQuiz(); }); });
      bar.querySelector('.reset-cap').addEventListener('click', function () { confirm.hidden = false; });
      confirm.querySelector('.no').addEventListener('click', function () { confirm.hidden = true; });
      confirm.querySelector('.yes').addEventListener('click', function () {
        list.forEach(function (q) { delete state.a[q.id]; }); save(); refreshProgress(); renderQuiz();
      });
      var shown = list.filter(function (q) {
        var v = state.a[q.id];
        if (filter === 'new') return v === undefined;
        if (filter === 'wrong') return v !== undefined && v !== q.a;
        return true;
      });
      if (!shown.length) {
        var e = document.createElement('p'); e.className = 'empty';
        e.textContent = filter === 'wrong' ? 'Nenhum erro neste capítulo.' : filter === 'new' ? 'Você já respondeu todas. Use "Zerar capítulo" para refazer.' : 'Sem questões.';
        quiz.appendChild(e);
      }
      shown.forEach(function (q) {
        quiz.appendChild(qCard(q, { onAnswer: function () {
          var s2 = stats(list);
          bar.querySelector('.count').textContent = s2.answered + '/' + s2.total + ' respondidas · ' + s2.right + ' certas';
        } }));
      });
    }
    function setTab(t) {
      qsa('.ch-tab', tabs).forEach(function (b) { b.setAttribute('aria-selected', String(b.dataset.t === t)); });
      theory.hidden = t !== 't'; miniBox.hidden = t !== 't';
      quiz.hidden = t !== 'q';
      if (t === 'q') renderQuiz();
    }
    tabs.addEventListener('click', function (ev) { var b = ev.target.closest('.ch-tab'); if (b) { setTab(b.dataset.t); window.scrollTo(0, 0); } });
    cta.querySelector('.go-q').addEventListener('click', function () { setTab('q'); window.scrollTo(0, 0); });
    c.setTab = setTab;
    c.theory = theory;
  });

  // ---------- filtros de tabelas e linhas do tempo ----------
  qsa('.tbl.filterable, .timeline.filterable').forEach(function (t) {
    var wrap = document.createElement('div');
    wrap.className = 'filter-wrap';
    wrap.innerHTML = '<input type="search" class="filter-in" placeholder="Filtrar esta lista…" aria-label="Filtrar esta lista"><span></span>';
    var anchor = t.closest('.tbl-wrap') || t;
    anchor.before(wrap);
    var inp = wrap.querySelector('input'), cnt = wrap.querySelector('span');
    var rows = t.tagName === 'TABLE' ? qsa('tr', t).filter(function (r) { return r.querySelector('td'); }) : qsa(':scope > li', t);
    var nrows = rows.map(function (r) { return norm(r.textContent); });
    function run() {
      var q = toks(inp.value), n = 0;
      rows.forEach(function (r, i) {
        var ok = q.every(function (w) { return nrows[i].indexOf(w) >= 0; });
        r.hidden = !ok; if (ok) n++;
      });
      cnt.textContent = q.length ? n + '/' + rows.length : rows.length + ' itens';
    }
    inp.addEventListener('input', run); run();
  });

  // ---------- navegação lateral ----------
  var nav = $('nav');
  function navLink(id, num, label, prog) {
    return '<a class="nav-link" href="#' + id + '" data-v="' + id + '"><span class="nav-num">' + num + '</span><span>' + esc(label) + '</span><span class="nav-prog" data-p="' + (prog || id) + '"></span></a>';
  }
  var navOpen = {};
  try { navOpen = JSON.parse(pref('nav') || '{}') || {}; } catch (e) { navOpen = {}; }
  var h = navLink('inicio', '◆', 'Início') + navLink('bizus', '★', 'Mural de bizus', 'bz') + navLink('simulado', '▣', 'Simulado') + navLink('flashcards', '▤', 'Flashcards') + navLink('erros', '✕', 'Caderno de erros');
  DISC.forEach(function (d) {
    var cs = chapsOf(d.k); if (!cs.length) return;
    var open = navOpen[d.k] !== false;
    h += '<button type="button" class="nav-disc" data-d="' + d.k + '" aria-expanded="' + open + '"><span class="disc-dot" style="background:' + d.c + '"></span>' + esc(d.n) + '<span class="cnt">Bloco ' + d.b + '</span></button><div class="nav-sub">';
    cs.forEach(function (c) { h += navLink(c.id, d.a + ' ' + c.num, c.short); });
    h += '</div>';
  });
  h += '<div class="nav-group">Preferências</div><a class="nav-link" href="#" id="navTheme"><span class="nav-num">◐</span><span>Alternar tema claro/escuro</span><span></span></a>';
  nav.innerHTML = h;
  qsa('.nav-disc', nav).forEach(function (b) {
    b.addEventListener('click', function () {
      var open = b.getAttribute('aria-expanded') !== 'true';
      b.setAttribute('aria-expanded', String(open)); navOpen[b.dataset.d] = open; pref('nav', JSON.stringify(navOpen));
    });
  });

  // capa: cartões por disciplina
  $('discGrid').innerHTML = DISC.map(function (d) {
    var cs = chapsOf(d.k), nq = QS.filter(function (q) { return q.disc === d.k; }).length;
    return '<div class="disc-card" style="--c:' + d.c + '"><h3>' + esc(d.n) + '</h3><span class="meta">Bloco ' + d.b + ' · 10 questões na prova · ' + nq + ' aqui</span><ol>' +
      cs.map(function (c) { return '<li><a href="#' + c.id + '">' + esc(c.short) + '</a> <span class="nav-prog" data-p="' + c.id + '"></span></li>'; }).join('') + '</ol></div>';
  }).join('');

  // ---------- roteamento ----------
  var views = qsa('.view');
  var viewIds = views.map(function (v) { return v.id; });
  var titles = { inicio: 'Início', simulado: 'Simulado', flashcards: 'Flashcards', erros: 'Caderno de erros', bizus: 'Mural de bizus' };
  var current = null;
  function clearHits() {
    qsa('mark.hit').forEach(function (m) { var t = document.createTextNode(m.textContent); m.replaceWith(t); });
    qsa('.flash-target').forEach(function (e) { e.classList.remove('flash-target'); });
  }
  function show(id, push, target, words) {
    if (viewIds.indexOf(id) < 0) id = 'inicio';
    if (current !== id) {
      views.forEach(function (v) { v.hidden = v.id !== id; });
      qsa('.nav-link', nav).forEach(function (a) { if (a.dataset.v === id) a.setAttribute('aria-current', 'page'); else a.removeAttribute('aria-current'); });
      current = id;
    }
    var c = capById[id];
    $('where').textContent = c ? c.label + ' · ' + c.short : titles[id];
    if (c) {
      c.setTab('t');
      var dd = nav.querySelector('.nav-disc[data-d="' + c.disc + '"]');
      if (dd && dd.getAttribute('aria-expanded') !== 'true') dd.setAttribute('aria-expanded', 'true');
    }
    if (id === 'erros') renderErrors();
    if (id === 'flashcards') renderFC();
    if (id === 'bizus') renderBiz();
    closeMenu();
    clearHits();
    if (target) {
      var el = typeof target === 'string' ? document.getElementById(target) : target;
      if (el) {
        var d = el.closest('details'); while (d) { d.open = true; d = d.parentElement.closest('details'); }
        if (el.hidden || (el.closest('tr') && el.closest('tr').hidden)) {
          var fw = (el.closest('.tbl-wrap') || el).previousElementSibling;
          if (fw && fw.classList.contains('filter-wrap')) { var fi = fw.querySelector('input'); fi.value = ''; fi.dispatchEvent(new Event('input')); }
        }
        if (words && words.length) highlight(el, words);
        requestAnimationFrame(function () {
          var tall = el.getBoundingClientRect().height > window.innerHeight * 0.55;
          el.scrollIntoView({ block: tall ? 'start' : 'center', behavior: 'instant' });
          el.classList.add('flash-target');
          setTimeout(function () { el.classList.remove('flash-target'); }, 2400);
        });
      } else window.scrollTo(0, 0);
    } else window.scrollTo(0, 0);
    if (push) { try { history.pushState(null, '', '#' + id + (target && typeof target === 'string' ? '~' + target : (target && target.id ? '~' + target.id : ''))); } catch (e) {} }
  }
  function parseHash() {
    var hs = decodeURIComponent(location.hash.slice(1)), parts = hs.split('~');
    return { v: parts[0] || 'inicio', t: parts[1] || null };
  }
  document.addEventListener('click', function (ev) {
    var a = ev.target.closest('a[href^="#"]');
    if (!a) return;
    if (a.id === 'navTheme') { ev.preventDefault(); toggleTheme(); return; }
    var hs = a.getAttribute('href').slice(1).split('~');
    if (viewIds.indexOf(hs[0]) < 0) return;
    ev.preventDefault();
    show(hs[0], true, hs[1] || null);
  });
  window.addEventListener('popstate', function () { var p = parseHash(); show(p.v, false, p.t); });

  // ---------- destaque de palavras ----------
  function highlight(root, words) {
    var walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, null);
    var nodes = [], n;
    while ((n = walker.nextNode())) nodes.push(n);
    nodes.forEach(function (node) {
      var txt = node.nodeValue, nt = normKeep(txt), ranges = [];
      words.forEach(function (w) {
        if (!w) return;
        var i = nt.indexOf(w);
        while (i >= 0) { ranges.push([i, i + w.length]); i = nt.indexOf(w, i + w.length); }
      });
      if (!ranges.length) return;
      ranges.sort(function (a, b) { return a[0] - b[0]; });
      var merged = [];
      ranges.forEach(function (r) { var l = merged[merged.length - 1]; if (l && r[0] <= l[1]) l[1] = Math.max(l[1], r[1]); else merged.push(r.slice()); });
      var frag = document.createDocumentFragment(), pos = 0;
      merged.forEach(function (r) {
        if (r[0] > pos) frag.appendChild(document.createTextNode(txt.slice(pos, r[0])));
        var m = document.createElement('mark'); m.className = 'hit'; m.textContent = txt.slice(r[0], r[1]); frag.appendChild(m);
        pos = r[1];
      });
      if (pos < txt.length) frag.appendChild(document.createTextNode(txt.slice(pos)));
      node.parentNode.replaceChild(frag, node);
    });
  }

  // ---------- menu (celular) ----------
  var side = $('side'), scrim = $('scrim'), menuBtn = $('menuBtn');
  function closeMenu() { side.classList.remove('open'); scrim.classList.remove('open'); menuBtn.setAttribute('aria-expanded', 'false'); }
  menuBtn.addEventListener('click', function () {
    var open = !side.classList.contains('open');
    side.classList.toggle('open', open); scrim.classList.toggle('open', open);
    menuBtn.setAttribute('aria-expanded', String(open));
  });
  scrim.addEventListener('click', closeMenu);

  // ---------- tema ----------
  var root = document.documentElement;
  var th = pref('theme'); if (th) root.setAttribute('data-theme', th);
  function toggleTheme() {
    var cur = root.getAttribute('data-theme') || (window.matchMedia && matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    var next = cur === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next); pref('theme', next);
  }
  $('themeBtn').addEventListener('click', toggleTheme);

  // ---------- só bizus ----------
  function setOnlyBizu(on) {
    document.body.classList.toggle('only-bizu', on);
    $('bizuBtn').setAttribute('aria-pressed', String(on));
    pref('onlyBizu', on ? '1' : '0');
  }
  $('bizuBtn').addEventListener('click', function () { setOnlyBizu(!document.body.classList.contains('only-bizu')); });
  if (pref('onlyBizu') === '1') setOnlyBizu(true);

  // ---------- paleta "Ir para" + busca no texto ----------
  var pal = $('pal'), palIn = $('palIn'), palList = $('palList'), palHint = $('palHint'), palDisc = $('palDisc');
  palDisc.innerHTML += DISC.map(function (d) { return '<option value="' + d.k + '">' + esc(d.n) + '</option>'; }).join('');
  var palMode = 'go', palSel = 0, palItems = [];
  SECS.forEach(function (s) { s.nt = toks(s.t); s.ns = norm(s.t); s.nsub = s.sub ? norm(s.sub) : ''; });
  var EXTRA = [
    { k: 'Página', t: 'Início – raio-x do edital', v: 'inicio', w: 2 },
    { k: 'Página', t: 'Mural de bizus (todos os macetes e pegadinhas)', v: 'bizus', w: 2.5 },
    { k: 'Página', t: 'Simulado – prova PMPE com 60 questões', v: 'simulado', w: 2.5 },
    { k: 'Página', t: 'Flashcards', v: 'flashcards', w: 2 },
    { k: 'Página', t: 'Caderno de erros', v: 'erros', w: 2 }
  ];
  EXTRA.forEach(function (s) { s.nt = toks(s.t); s.ns = norm(s.t); s.nsub = ''; });

  function openPal(mode, q) {
    palMode = mode || 'go';
    qsa('.pal-tabs button', pal).forEach(function (b) { b.setAttribute('aria-selected', String(b.dataset.m === palMode)); });
    palIn.placeholder = palMode === 'go' ? 'Ex.: art 5 LXI, art. 144, crase, Nassau, backup, Maria da Penha' : 'Digite palavra ou frase (use "aspas" para frase exata)';
    pal.hidden = false;
    if (q !== undefined) palIn.value = q;
    palIn.focus(); palIn.select();
    runPal();
  }
  function closePal() { pal.hidden = true; }
  qsa('[data-open]').forEach(function (b) { b.addEventListener('click', function () { openPal(b.dataset.open); }); });
  $('goBtn').addEventListener('click', function () { openPal('go'); });
  $('findBtn').addEventListener('click', function () { openPal('find'); });
  qsa('.pal-tabs button', pal).forEach(function (b) { b.addEventListener('click', function () { openPal(b.dataset.m); }); });
  pal.addEventListener('click', function (ev) { if (ev.target === pal) closePal(); });
  palIn.addEventListener('input', function () { palSel = 0; runPal(); });
  palDisc.addEventListener('change', function () { palSel = 0; runPal(); palIn.focus(); });

  function scoreGo(s, qt, qn) {
    var score = 0;
    for (var i = 0; i < qt.length; i++) {
      var t = qt[i], hit = 0;
      if (t === 'art' || t === 'arts') { if (s.nt.indexOf('art') >= 0 || s.nt.indexOf('arts') >= 0) { score += 1; continue; } }
      if (s.nt.indexOf(t) >= 0) hit = 3;
      else if (!isExactTok(t)) {
        for (var j = 0; j < s.nt.length; j++) { if (s.nt[j].indexOf(t) === 0) { hit = 1.5; break; } }
        if (!hit && t.length >= 4 && s.nsub.indexOf(t) >= 0) hit = 0.6;
      }
      if (!hit) { if (STOP[t]) continue; return -1; }
      score += hit;
    }
    if (s.ns.indexOf(qn) >= 0) score += 2.5;
    if (s.ns.indexOf(qn) === 0) score += 1;
    if (qt.indexOf('art') >= 0 && s.w === 3) score *= 0.5;
    return score * s.w;
  }
  function snippet(raw, n, words) {
    var first = Infinity;
    words.forEach(function (w) { var i = n.indexOf(w); if (i >= 0 && i < first) first = i; });
    if (first === Infinity) first = 0;
    var a = Math.max(0, first - 70), b = Math.min(raw.length, first + 150);
    var s = raw.slice(a, b), ns = n.slice(a, b), out = '', pos = 0, ranges = [];
    words.forEach(function (w) { var i = ns.indexOf(w); while (i >= 0) { ranges.push([i, i + w.length]); i = ns.indexOf(w, i + w.length); } });
    ranges.sort(function (x, y) { return x[0] - y[0]; });
    ranges.forEach(function (r) { if (r[0] < pos) return; out += esc(s.slice(pos, r[0])) + '<mark>' + esc(s.slice(r[0], r[1])) + '</mark>'; pos = r[1]; });
    out += esc(s.slice(pos));
    return (a > 0 ? '…' : '') + out.replace(/\s+/g, ' ') + (b < raw.length ? '…' : '');
  }
  function findWords(q) {
    var phr = [], rest = q.replace(/"([^"]+)"/g, function (_, p) { phr.push(normKeep(p).trim()); return ' '; });
    return phr.concat(normKeep(rest).split(/\s+/).filter(function (w) { return w.length >= 1; })).filter(Boolean);
  }
  function runPal() {
    var q = palIn.value.trim(), dsel = palDisc.value;
    palItems = [];
    if (palMode === 'go') {
      if (!q) {
        palItems = chapters.filter(function (c) { return !dsel || c.disc === dsel; }).map(function (c) { return { k: 'Capítulo · ' + discBy[c.disc].n, t: c.label + ' – ' + c.title, cap: c }; });
        palItems = EXTRA.concat(palItems);
        palHint.textContent = 'Digite um assunto, capítulo ou artigo · ↑ ↓ · Enter · Esc';
      } else {
        var qt = toks(q), qn = norm(q);
        var res = [];
        EXTRA.concat(SECS).forEach(function (s) {
          if (dsel && (!s.cap || s.cap.disc !== dsel)) return;
          var sc = scoreGo(s, qt, qn); if (sc > 0) res.push({ s: s, sc: sc });
        });
        res.sort(function (a, b) { return b.sc - a.sc; });
        palItems = res.slice(0, 80).map(function (r) { return r.s; });
        palHint.textContent = res.length + ' resultado(s) · Enter abre o primeiro · dica: "art 5 LXIII", "art 144 § 5", "lei 11.340"';
      }
      palList.innerHTML = palItems.length ? palItems.map(function (s, i) {
        return '<button type="button" class="pal-item' + (i === palSel ? ' on' : '') + '" data-i="' + i + '"><span class="k">' + esc(s.k) + '</span><span class="t">' + esc(s.t) + '</span>' + (s.sub ? '<span class="s">' + esc(s.sub) + '</span>' : '') + '</button>';
      }).join('') : '<p class="pal-empty">Nada encontrado. Tente a aba "Buscar no texto".</p>';
    } else {
      if (q.length < 2) { palList.innerHTML = '<p class="pal-empty">Digite pelo menos 2 letras. A busca ignora acentos e maiúsculas; use "aspas" para frase exata.</p>'; palHint.textContent = BLOCKS.length + ' trechos indexados'; return; }
      var words = findWords(q);
      var hits = [];
      for (var i = 0; i < BLOCKS.length; i++) {
        var B = BLOCKS[i];
        if (dsel && B.cap.disc !== dsel) continue;
        var ok = true;
        for (var j = 0; j < words.length; j++) { if (B.n.indexOf(words[j]) < 0) { ok = false; break; } }
        if (ok) hits.push(B);
      }
      var seen = new Set();
      hits = hits.filter(function (B) {
        var p = B.el.parentElement.closest('li, td, p');
        if (p && hits.indexOf && seen.has(p)) return false;
        seen.add(B.el); return true;
      });
      palItems = hits.slice(0, 300).map(function (B) { return { blk: B, words: words }; });
      palHint.textContent = hits.length + ' trecho(s) encontrado(s)' + (hits.length > 300 ? ' (mostrando 300)' : '') + ' · clique para ir ao trecho destacado';
      palList.innerHTML = palItems.length ? palItems.map(function (it, i) {
        var B = it.blk;
        return '<button type="button" class="pal-item' + (i === palSel ? ' on' : '') + '" data-i="' + i + '"><span class="k">' + B.cap.label + ' · ' + esc(B.cap.short) + '</span><span class="s" style="color:var(--ink)">' + snippet(B.raw, B.n, words) + '</span></button>';
      }).join('') : '<p class="pal-empty">Nenhum trecho contém todos os termos.</p>';
    }
  }
  function pickPal(i) {
    var it = palItems[i]; if (!it) return;
    closePal();
    if (it.blk) { show(it.blk.cap.id, true, it.blk.el, it.words); return; }
    if (it.v) { show(it.v, true); return; }
    if (it.el) show(it.cap.id, true, it.el); else show(it.cap.id, true);
  }
  palList.addEventListener('click', function (ev) { var b = ev.target.closest('.pal-item'); if (b) pickPal(+b.dataset.i); });
  palIn.addEventListener('keydown', function (ev) {
    var n = palItems.length;
    if (ev.key === 'ArrowDown') { ev.preventDefault(); palSel = Math.min(n - 1, palSel + 1); paintSel(); }
    else if (ev.key === 'ArrowUp') { ev.preventDefault(); palSel = Math.max(0, palSel - 1); paintSel(); }
    else if (ev.key === 'Enter') { ev.preventDefault(); pickPal(palSel); }
    else if (ev.key === 'Tab' && !ev.shiftKey && ev.target === palIn && document.activeElement === palIn) { /* foco natural */ }
  });
  function paintSel() {
    qsa('.pal-item', palList).forEach(function (b, i) { b.classList.toggle('on', i === palSel); if (i === palSel) b.scrollIntoView({ block: 'nearest' }); });
  }

  document.addEventListener('keydown', function (ev) {
    var typing = /input|select|textarea/i.test(ev.target.tagName);
    if ((ev.ctrlKey || ev.metaKey) && (ev.key === 'k' || ev.key === 'K')) { ev.preventDefault(); openPal('go'); return; }
    if (ev.key === 'Escape') { if (!pal.hidden) closePal(); closeMenu(); return; }
    if (typing || !pal.hidden || ev.ctrlKey || ev.metaKey || ev.altKey) return;
    if (ev.key === '/') { ev.preventDefault(); openPal('find'); }
    else if (ev.key === 'b' || ev.key === 'B') { setOnlyBizu(!document.body.classList.contains('only-bizu')); }
    else if (ev.key === 'g' || ev.key === 'G') { ev.preventDefault(); openPal('go'); }
  });
  $('fabTop').addEventListener('click', function () { window.scrollTo(0, 0); });

  // ---------- mural de bizus ----------
  $('bzDisc').innerHTML += DISC.map(function (d) { return '<option value="' + d.k + '">' + esc(d.n) + '</option>'; }).join('');
  var bzTypes = { bizu: true, trap: true, tip: true }, bzBuilt = false;
  function renderBiz() {
    var box = $('bzList'), dsel = $('bzDisc').value, q = toks($('bzQ').value);
    if (!bzBuilt) {
      BIZ.forEach(function (b) {
        var card = document.createElement('div');
        card.className = 'biz-card';
        card.innerHTML = '<div class="from"><span class="disc-dot" style="background:' + discBy[b.cap.disc].c + '"></span>' + b.cap.label + ' · ' + esc(b.cap.short) + ' <a href="#' + b.cap.id + '~' + b.el.id + '">ver no capítulo →</a></div>';
        var clone = b.el.cloneNode(true); clone.removeAttribute('id');
        qsa('[id]', clone).forEach(function (x) { x.removeAttribute('id'); });
        card.appendChild(clone);
        b.card = card; box.appendChild(card);
      });
      bzBuilt = true;
    }
    var n = 0;
    BIZ.forEach(function (b) {
      var ok = bzTypes[b.type] && (!dsel || b.cap.disc === dsel) && q.every(function (w) { return b.text.indexOf(w) >= 0; });
      b.card.hidden = !ok; if (ok) n++;
    });
    $('bzCount').textContent = n + ' de ' + BIZ.length + ' quadros exibidos.';
  }
  $('bzDisc').addEventListener('change', renderBiz);
  $('bzQ').addEventListener('input', renderBiz);
  qsa('#bzTypes .chip-btn').forEach(function (b) {
    b.addEventListener('click', function () { bzTypes[b.dataset.t] = !bzTypes[b.dataset.t]; b.setAttribute('aria-pressed', String(bzTypes[b.dataset.t])); renderBiz(); });
  });

  // ---------- progresso ----------
  function refreshProgress() {
    var all = stats(QS);
    $('barFill').style.width = (all.total ? (all.answered / all.total * 100) : 0) + '%';
    $('barTxt').textContent = all.answered + '/' + all.total;
    $('cdQ').textContent = QS.length;
    $('cdB').textContent = BIZ.length;
    $('cdA').textContent = all.answered ? Math.round(all.right / all.answered * 100) + '%' : '–';
    chapters.forEach(function (c) {
      var s = stats(qsOf(c.id));
      qsa('[data-p="' + c.id + '"]').forEach(function (el) {
        el.innerHTML = (state.r[c.id] ? '<span class="read-ok">✓</span> ' : '') + (s.total ? s.answered + '/' + s.total : (c.el.classList.contains('lei-seca') ? 'lei' : ''));
      });
    });
    var errs = QS.filter(function (q) { var v = state.a[q.id]; return v !== undefined && v !== q.a; }).length;
    var pe = document.querySelector('[data-p="erros"]'); if (pe) pe.textContent = errs ? String(errs) : '';
    var pb = document.querySelector('[data-p="bz"]'); if (pb) pb.textContent = String(BIZ.length);
  }
  $('resetAll').addEventListener('click', function () { $('resetConfirm').hidden = false; });
  $('resetNo').addEventListener('click', function () { $('resetConfirm').hidden = true; });
  $('resetYes').addEventListener('click', function () { state = { a: {}, r: {} }; save(); refreshProgress(); $('resetConfirm').hidden = true; });

  // contagem regressiva (prova: 21/02/2027, horário de Recife)
  function tick() {
    var ms = new Date('2027-02-21T08:00:00-03:00').getTime() - Date.now();
    if (ms <= 0) { $('cdD').textContent = '0'; $('cdH').textContent = '0'; return; }
    $('cdD').textContent = Math.floor(ms / 864e5);
    $('cdH').textContent = Math.floor(ms % 864e5 / 36e5);
  }
  tick(); setInterval(tick, 60000);

  // ---------- caderno de erros ----------
  $('errDisc').innerHTML += DISC.map(function (d) { return '<option value="' + d.k + '">' + esc(d.n) + '</option>'; }).join('');
  $('errDisc').addEventListener('change', renderErrors);
  function renderErrors() {
    var box = $('errList'), dsel = $('errDisc').value;
    box.innerHTML = '';
    var list = QS.filter(function (q) { var v = state.a[q.id]; return v !== undefined && v !== q.a && (!dsel || q.disc === dsel); });
    if (!list.length) { box.innerHTML = '<p class="empty">Nenhum erro registrado. Resolva questões nos capítulos ou faça um simulado.</p>'; return; }
    list.forEach(function (q) { box.appendChild(qCard(q, { fresh: true, label: capById[q.c].label + ' · Questão ' + q.n })); });
  }

  // ---------- simulado ----------
  $('simCaps').innerHTML = DISC.map(function (d) {
    return '<div class="field" style="margin-top:8px"><label><span class="disc-dot" style="background:' + d.c + '"></span>' + esc(d.n) + '</label></div><div class="cap-checks">' +
      chapsOf(d.k).filter(function (c) { return qsOf(c.id).length; }).map(function (c) { return '<label><input type="checkbox" value="' + c.id + '" checked> <span>' + c.label + ' · ' + esc(c.short) + '</span></label>'; }).join('') + '</div>';
  }).join('');
  function capBoxes() { return qsa('#simCaps input'); }
  $('simAll').addEventListener('click', function () { capBoxes().forEach(function (b) { b.checked = true; }); });
  $('simNone').addEventListener('click', function () { capBoxes().forEach(function (b) { b.checked = false; }); });
  var sim = null, timer = null;
  function shuffle(arr) { for (var i = arr.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = arr[i]; arr[i] = arr[j]; arr[j] = t; } return arr; }
  function fmtTime(s) { var hh = Math.floor(s / 3600); return (hh ? hh + ':' : '') + pad(Math.floor(s % 3600 / 60)) + ':' + pad(s % 60); }
  function startSim(pool, prova) {
    sim = { list: pool, ans: {}, t0: Date.now(), prova: prova };
    $('simSetup').hidden = true; $('simResult').hidden = true; $('simRun').hidden = false;
    $('simRun').querySelector('.sim-sticky').hidden = false;
    var box = $('simList'); box.innerHTML = '';
    var lastBlock = null;
    pool.forEach(function (q, k) {
      if (prova) {
        var d = discBy[q.disc];
        if (d.b !== lastBlock) { var hb = document.createElement('h2'); hb.style.cssText = 'font-size:1.2rem;margin:26px 0 4px'; hb.textContent = 'Bloco ' + d.b; box.appendChild(hb); lastBlock = d.b; }
      }
      box.appendChild(qCard(q, { mode: 'exam', label: 'Questão ' + (k + 1) + ' de ' + pool.length, onPick: function (qq, i) { sim.ans[qq.id] = i; updCount(); } }));
    });
    updCount();
    clearInterval(timer);
    timer = setInterval(function () { $('simTime').textContent = fmtTime(Math.floor((Date.now() - sim.t0) / 1000)); }, 1000);
    $('simTime').textContent = '00:00';
    $('simQuit').textContent = 'Cancelar';
    window.scrollTo(0, 0);
  }
  function updCount() { $('simCount').textContent = Object.keys(sim.ans).length + '/' + sim.list.length + ' respondidas'; }
  $('simProva').addEventListener('click', function () {
    var onlyNew = $('simOnlyP').value === 'new', pool = [];
    DISC.forEach(function (d) {
      var all = shuffle(QS.filter(function (q) { return q.disc === d.k; }));
      if (onlyNew) all.sort(function (a, b) { return (state.a[a.id] !== undefined) - (state.a[b.id] !== undefined); });
      pool = pool.concat(all.slice(0, 10));
    });
    startSim(pool, true);
  });
  $('simStart').addEventListener('click', function () {
    var caps = capBoxes().filter(function (b) { return b.checked; }).map(function (b) { return b.value; });
    var only = $('simOnly').value, qtd = +$('simQtd').value;
    var pool = QS.filter(function (q) {
      if (caps.indexOf(q.c) < 0) return false;
      var v = state.a[q.id];
      if (only === 'new' && v !== undefined) return false;
      if (only === 'wrong' && (v === undefined || v === q.a)) return false;
      return true;
    });
    var msg = $('simMsg');
    if (!pool.length) { msg.hidden = false; msg.textContent = 'Nenhuma questão com esses filtros. Marque mais capítulos ou mude o filtro.'; return; }
    msg.hidden = true;
    startSim(shuffle(pool).slice(0, qtd), false);
  });
  $('simQuit').addEventListener('click', function () {
    if ($('simQuit').textContent === 'Cancelar') { $('simQuit').textContent = 'Confirmar cancelamento'; return; }
    clearInterval(timer); sim = null;
    $('simRun').hidden = true; $('simSetup').hidden = false;
  });
  $('simEnd').addEventListener('click', function () {
    if (!sim) return;
    clearInterval(timer);
    var secs = Math.floor((Date.now() - sim.t0) / 1000);
    var right = 0, byCap = {}, byDisc = {}, byBlock = {};
    sim.list.forEach(function (q) {
      var v = sim.ans[q.id];
      if (v !== undefined) state.a[q.id] = v;
      var ok = v === q.a; if (ok) right++;
      byCap[q.c] = byCap[q.c] || { t: 0, r: 0 }; byCap[q.c].t++; if (ok) byCap[q.c].r++;
      byDisc[q.disc] = byDisc[q.disc] || { t: 0, r: 0 }; byDisc[q.disc].t++; if (ok) byDisc[q.disc].r++;
      var b = discBy[q.disc].b; byBlock[b] = byBlock[b] || { t: 0, r: 0 }; byBlock[b].t++; if (ok) byBlock[b].r++;
    });
    save(); refreshProgress();
    qsa('#simList .q').forEach(function (art) { var q = qById[art.dataset.id]; reveal(art, q, sim.ans[q.id], { mode: 'exam' }); });
    var total = sim.list.length, pct = Math.round(right / total * 100);
    var html = '<div class="panel"><div class="score"><span class="score-big">' + right + '/' + total + '</span><div><p class="score-note"><b>' + pct + '% de acertos</b> · tempo ' + fmtTime(secs) + '</p>';
    if (sim.prova) {
      var elim = [];
      var blocks = ['I', 'II', 'III'].map(function (b) {
        var s = byBlock[b] || { t: 0, r: 0 }, min = Math.ceil(s.t * 0.3), ok = s.r >= min;
        if (!ok) elim.push('Bloco ' + b + ' abaixo de 30%');
        return '<div><span class="field"><label>Bloco ' + b + '</label></span><b>' + s.r + '/' + s.t + '</b><br><span class="' + (ok ? 'ok-t' : 'no-t') + '">' + (ok ? 'atingiu o mínimo (' + min + ')' : 'ELIMINADO: mínimo ' + min) + '</span></div>';
      }).join('');
      DISC.forEach(function (d) { var s = byDisc[d.k]; if (s && s.r === 0) elim.push(d.n + ' zerada'); });
      var minTot = Math.ceil(total * 0.3); if (right < minTot) elim.push('total abaixo de 30%');
      html += '<p class="score-note">' + (elim.length ? '<span class="no-t">Pelos critérios do edital você seria eliminado: ' + elim.join('; ') + '.</span>' : '<span class="ok-t">Você passou em todos os critérios eliminatórios da objetiva.</span> Agora é somar pontos: cada acerto conta na classificação.') + '</p></div></div>';
      html += '<div class="res-blocks">' + blocks + '</div>';
    } else {
      html += '<p class="score-note">' + (pct >= 80 ? 'Nível de aprovação. Revise só os erros.' : pct >= 60 ? 'Bom caminho. Volte à teoria dos capítulos com menor aproveitamento.' : 'Volte à teoria e ao Mural de bizus antes do próximo simulado.') + '</p></div></div>';
    }
    var rows = DISC.filter(function (d) { return byDisc[d.k]; }).map(function (d) {
      var s = byDisc[d.k];
      return '<tr><td><span class="disc-dot" style="background:' + d.c + '"></span>' + esc(d.n) + '</td><td>' + s.r + '/' + s.t + '</td><td>' + Math.round(s.r / s.t * 100) + '%</td></tr>';
    }).join('');
    var rowsC = Object.keys(byCap).map(function (k) {
      var c = capById[k], s = byCap[k];
      return '<tr><td>' + c.label + ' · ' + esc(c.short) + '</td><td>' + s.r + '/' + s.t + '</td><td>' + Math.round(s.r / s.t * 100) + '%</td></tr>';
    }).join('');
    html += '<div class="tbl-wrap"><table class="tbl"><tr><th>Disciplina</th><th>Acertos</th><th>%</th></tr>' + rows + '</table></div>' +
      '<details class="deep"><summary>Desempenho por capítulo</summary><div><div class="tbl-wrap"><table class="tbl"><tr><th>Capítulo</th><th>Acertos</th><th>%</th></tr>' + rowsC + '</table></div></div></details>' +
      '<div class="q-actions"><button type="button" class="btn" id="simNew">Novo simulado</button><a class="btn ghost" href="#erros">Ir ao caderno de erros</a></div>' +
      '<p class="q-exp" style="margin-top:10px">O gabarito comentado de cada questão está logo abaixo.</p></div>';
    var res = $('simResult'); res.innerHTML = html; res.hidden = false;
    $('simRun').querySelector('.sim-sticky').hidden = true;
    $('simNew').addEventListener('click', function () {
      $('simRun').hidden = true; $('simResult').hidden = true; $('simSetup').hidden = false; window.scrollTo(0, 0);
    });
    sim = null;
    res.scrollIntoView();
  });

  // ---------- flashcards ----------
  FC = FC.filter(function (f) { return capById[f.c]; });
  var fcSel = $('fcCap');
  fcSel.innerHTML += DISC.map(function (d) {
    var cs = chapsOf(d.k).filter(function (c) { return FC.some(function (f) { return f.c === c.id; }); });
    if (!cs.length) return '';
    return '<optgroup label="' + esc(d.n) + '"><option value="d:' + d.k + '">Toda a disciplina</option>' + cs.map(function (c) { return '<option value="' + c.id + '">' + c.label + ' · ' + esc(c.short) + '</option>'; }).join('') + '</optgroup>';
  }).join('');
  var fcList = FC.slice(), fcI = 0, fcBack = false;
  function fcFilter() {
    var v = fcSel.value;
    fcList = FC.filter(function (f) { return !v || f.c === v || (v.indexOf('d:') === 0 && capById[f.c].disc === v.slice(2)); });
    fcI = 0; fcBack = false; renderFC();
  }
  function renderFC() {
    var card = $('fcCard');
    if (!fcList.length) { $('fcText').textContent = 'Sem cartões.'; $('fcCount').textContent = '0/0'; return; }
    var f = fcList[fcI];
    card.classList.toggle('back', fcBack);
    $('fcSide').textContent = fcBack ? 'Resposta' : 'Pergunta · ' + capById[f.c].label + ' · ' + capById[f.c].short;
    $('fcText').innerHTML = fcBack ? f.b : f.f;
    $('fcCount').textContent = (fcI + 1) + '/' + fcList.length;
  }
  function fcGo(d) { if (!fcList.length) return; fcI = (fcI + d + fcList.length) % fcList.length; fcBack = false; renderFC(); }
  $('fcCard').addEventListener('click', function () { fcBack = !fcBack; renderFC(); });
  $('fcFlip').addEventListener('click', function () { fcBack = !fcBack; renderFC(); });
  $('fcNext').addEventListener('click', function () { fcGo(1); });
  $('fcPrev').addEventListener('click', function () { fcGo(-1); });
  $('fcShuffle').addEventListener('click', function () { shuffle(fcList); fcI = 0; fcBack = false; renderFC(); });
  fcSel.addEventListener('change', fcFilter);
  document.addEventListener('keydown', function (ev) {
    if ($('flashcards').hidden || /input|select|textarea/i.test(ev.target.tagName)) return;
    if (ev.key === 'ArrowRight') fcGo(1);
    if (ev.key === 'ArrowLeft') fcGo(-1);
  });

  // ---------- ferramentas: tabela-verdade ----------
  qsa('[data-tool="truth"]').forEach(function (box) {
    box.innerHTML = '<h4>Monte qualquer tabela-verdade</h4>' +
      '<p class="q-exp" style="margin:0 0 6px">Variáveis: letras (p, q, r, s, t). Operadores: <code>~</code> não · <code>^</code> e · <code>v</code> ou · <code>xor</code> ou exclusivo · <code>-&gt;</code> se...então · <code>&lt;-&gt;</code> se e somente se · parênteses.</p>' +
      '<div class="row"><input type="text" class="tt-in" style="flex:1" value="(p -> q) <-> (~q -> ~p)" aria-label="Fórmula"><button type="button" class="btn tt-go">Gerar</button></div>' +
      '<div class="row">' + ['p ^ q', 'p v q', 'p -> q', 'p <-> q', 'p xor q', '~(p ^ q) <-> (~p v ~q)', '(p -> q) <-> (~p v q)', 'p ^ ~p', '(p -> q) ^ p -> q'].map(function (e) { return '<button type="button" class="chip-btn tt-ex">' + esc(e) + '</button>'; }).join('') + '</div><div class="out"></div>';
    var inp = box.querySelector('.tt-in'), out = box.querySelector('.out');
    function go() { out.innerHTML = truthTable(inp.value); }
    box.querySelector('.tt-go').addEventListener('click', go);
    inp.addEventListener('keydown', function (e) { if (e.key === 'Enter') go(); });
    qsa('.tt-ex', box).forEach(function (b) { b.addEventListener('click', function () { inp.value = b.textContent; go(); }); });
    go();
  });
  function truthTable(src) {
    var s = src.replace(/<->|↔|<=>/g, ' ≡ ').replace(/->|→|=>/g, ' ⇒ ').replace(/\bxor\b|⊻/gi, ' ⊕ ').replace(/[¬!]/g, '~').replace(/[∧&]/g, '^').replace(/[∨|]/g, ' v ');
    var tk = [], i = 0;
    while (i < s.length) {
      var ch = s[i];
      if (/\s/.test(ch)) { i++; continue; }
      if ('~^()≡⇒⊕'.indexOf(ch) >= 0) { tk.push(ch); i++; continue; }
      if (ch === 'v' && (/[\s(]/.test(s[i + 1] || ' ')) && tk.length && tk[tk.length - 1] !== '(' && '~^≡⇒⊕v'.indexOf(tk[tk.length - 1]) < 0) { tk.push('v'); i++; continue; }
      if (/[a-zA-Z]/.test(ch) && ch !== 'v') { tk.push('$' + ch.toLowerCase()); i++; continue; }
      return '<p class="no-t">Símbolo não reconhecido: "' + esc(ch) + '"</p>';
    }
    var p = 0, vars = [];
    function peek() { return tk[p]; }
    function eat(t) { if (tk[p] === t) { p++; return true; } return false; }
    function atom() {
      var t = tk[p];
      if (t === '(') { p++; var e = bi(); if (!eat(')')) throw 'Falta fechar parêntese'; return e; }
      if (t && t[0] === '$') { p++; var v = t.slice(1); if (vars.indexOf(v) < 0) vars.push(v); return { v: v }; }
      throw 'Expressão incompleta';
    }
    function not() { if (eat('~')) return { op: '~', a: not() }; return atom(); }
    function and() { var l = not(); while (peek() === '^') { p++; l = { op: '∧', a: l, b: not() }; } return l; }
    function or() { var l = and(); while (peek() === 'v' || peek() === '⊕') { var o = tk[p++]; l = { op: o === 'v' ? '∨' : '⊻', a: l, b: and() }; } return l; }
    function cond() { var l = or(); if (eat('⇒')) return { op: '→', a: l, b: cond() }; return l; }
    function bi() { var l = cond(); while (eat('≡')) l = { op: '↔', a: l, b: cond() }; return l; }
    var tree;
    try { tree = bi(); if (p < tk.length) throw 'Sobrou algo após a expressão'; } catch (err) { return '<p class="no-t">' + esc(String(err)) + '</p>'; }
    if (vars.length > 5) return '<p class="no-t">Use no máximo 5 variáveis.</p>';
    function str(n, top) {
      if (n.v) return n.v;
      if (n.op === '~') return '~' + str(n.a);
      var x = str(n.a) + ' ' + n.op + ' ' + str(n.b);
      return top ? x : '(' + x + ')';
    }
    var cols = [], seenC = {};
    (function walk(n) { if (n.v) return; walk(n.a); if (n.b) walk(n.b); var k = str(n, true); if (!seenC[k]) { seenC[k] = 1; cols.push({ k: k, n: n }); } })(tree);
    function ev(n, env) {
      if (n.v) return env[n.v];
      var a = ev(n.a, env);
      if (n.op === '~') return !a;
      var b = ev(n.b, env);
      return n.op === '∧' ? a && b : n.op === '∨' ? a || b : n.op === '⊻' ? a !== b : n.op === '→' ? (!a || b) : a === b;
    }
    var rows = 1 << vars.length, html = '<div class="tbl-wrap"><table class="tbl"><tr>' + vars.map(function (v) { return '<th>' + v + '</th>'; }).join('') + cols.map(function (c) { return '<th>' + esc(c.k) + '</th>'; }).join('') + '</tr>';
    var nT = 0;
    for (var r = 0; r < rows; r++) {
      var env = {};
      vars.forEach(function (v, j) { env[v] = !((r >> (vars.length - 1 - j)) & 1); });
      html += '<tr>' + vars.map(function (v) { return '<td>' + (env[v] ? 'V' : 'F') + '</td>'; }).join('');
      cols.forEach(function (c, j) { var val = ev(c.n, env); if (j === cols.length - 1 && val) nT++; html += '<td class="' + (val ? 'tt-v' : 'tt-f') + '">' + (val ? 'V' : 'F') + '</td>'; });
      html += '</tr>';
    }
    html += '</table></div>';
    var cls = nT === rows ? '<span class="ok-t">TAUTOLOGIA</span> (sempre V)' : nT === 0 ? '<span class="no-t">CONTRADIÇÃO</span> (sempre F)' : '<b>CONTINGÊNCIA</b> (' + nT + ' V e ' + (rows - nT) + ' F)';
    return '<p>' + rows + ' linhas (2<sup>' + vars.length + '</sup>) · Classificação: ' + cls + '</p>' + html;
  }

  // ---------- ferramentas: contagem ----------
  qsa('[data-tool="comb"]').forEach(function (box) {
    box.innerHTML = '<h4>Calculadora de contagem</h4><div class="row"><label>n = <input type="number" class="cb-n" min="0" max="60" value="10" style="width:80px"></label><label>p = <input type="number" class="cb-p" min="0" max="60" value="3" style="width:80px"></label></div>' +
      '<div class="row"><label>Permutação com repetição: total <input type="number" class="cb-t" min="0" max="40" value="5" style="width:70px"> repetições <input type="text" class="cb-r" value="3,2" style="width:90px"></label></div><div class="out"></div>';
    var out = box.querySelector('.out');
    function fact(n) { var r = 1n; for (var i = 2n; i <= BigInt(n); i++) r *= i; return r; }
    function fmt(b) { return b.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.'); }
    function go() {
      var n = Math.max(0, Math.min(60, parseInt(box.querySelector('.cb-n').value, 10) || 0));
      var p = Math.max(0, Math.min(60, parseInt(box.querySelector('.cb-p').value, 10) || 0));
      var t = Math.max(0, Math.min(40, parseInt(box.querySelector('.cb-t').value, 10) || 0));
      var reps = box.querySelector('.cb-r').value.split(/[,;\s]+/).map(function (x) { return parseInt(x, 10); }).filter(function (x) { return x > 0; });
      var rows = [['n!', fmt(fact(n))], ['Pn = n!', fmt(fact(n))], ['Permutação circular (n−1)!', n ? fmt(fact(n - 1)) : '—']];
      if (p <= n) {
        rows.push(['A(n,p) = n!/(n−p)!  — ordem importa', fmt(fact(n) / fact(n - p))]);
        rows.push(['C(n,p) = n!/[p!(n−p)!]  — ordem não importa', fmt(fact(n) / (fact(p) * fact(n - p)))]);
      } else rows.push(['A e C', 'p não pode ser maior que n']);
      rows.push(['Arranjo com repetição nᵖ', fmt(BigInt(n) ** BigInt(p))]);
      var sum = reps.reduce(function (a, b) { return a + b; }, 0);
      if (sum <= t) { var den = reps.reduce(function (a, b) { return a * fact(b); }, 1n); rows.push(['Permutação com repetição ' + t + '!/(' + reps.map(function (r) { return r + '!'; }).join('·') + ')', fmt(fact(t) / den)]); }
      else rows.push(['Permutação com repetição', 'as repetições somam mais que o total']);
      out.innerHTML = '<div class="tbl-wrap"><table class="tbl"><tr><th>Cálculo</th><th>Resultado</th></tr>' + rows.map(function (r) { return '<tr><td>' + r[0] + '</td><td style="text-align:right;font-family:var(--f-mono)">' + r[1] + '</td></tr>'; }).join('') + '</table></div>';
    }
    qsa('input', box).forEach(function (i) { i.addEventListener('input', go); });
    go();
  });

  // ---------- início ----------
  refreshProgress();
  try { history.scrollRestoration = 'manual'; } catch (e) {}
  var ph = parseHash();
  show(ph.v, false, ph.t);
  function topNow() { if (!parseHash().t) window.scrollTo({ top: 0, behavior: 'instant' }); }
  setTimeout(topNow, 0);
  window.addEventListener('load', function () { setTimeout(topNow, 30); });
})();
