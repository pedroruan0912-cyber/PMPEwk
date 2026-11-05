(function () {
  'use strict';
  var QS = window.QUESTOES || [];
  var FC = window.FLASH || [];
  var KEY = 'dhpmpe.v1';
  var LET = 'ABCDE';
  var $ = function (id) { return document.getElementById(id); };

  // ---------- estado salvo (só neste navegador) ----------
  var state = { a: {} };
  try {
    var raw = localStorage.getItem(KEY);
    if (raw) { var parsed = JSON.parse(raw); if (parsed && parsed.a) state = parsed; }
  } catch (e) { /* armazenamento indisponível: segue sem salvar */ }
  function save() { try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) {} }
  if (!state.vf) state.vf = {};
  var bancaPref = 'AOCP';
  try { var bp = localStorage.getItem('dhpmpe.banca'); if (bp !== null) bancaPref = bp; } catch (e) {}

  // ---------- capítulos e ids das questões ----------
  var chapters = Array.prototype.map.call(document.querySelectorAll('section.chapter'), function (s) {
    return { id: s.id, num: +s.dataset.num, title: s.dataset.title, short: s.dataset.short, el: s };
  });
  var capById = {};
  chapters.forEach(function (c) { capById[c.id] = c; });
  var perCap = {};
  QS.forEach(function (q) { perCap[q.c] = (perCap[q.c] || 0) + 1; q.n = perCap[q.c]; q.id = q.c + '-' + q.n; });

  // embaralha as alternativas de forma estável (mesma ordem em toda visita);
  // questões de assertivas I, II, III mantêm a ordem original, como na prova
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
    if (q.e.indexOf('type="I"') >= 0) return;
    var r = rng(hash(q.id + ':' + q.e.length)), idx = q.o.map(function (_, i) { return i; });
    for (var i = idx.length - 1; i > 0; i--) { var j = Math.floor(r() * (i + 1)); var t = idx[i]; idx[i] = idx[j]; idx[j] = t; }
    q.o = idx.map(function (i) { return q.o[i]; });
    q.a = idx.indexOf(q.a);
  });
  function qsOf(capId) { return QS.filter(function (q) { return q.c === capId; }); }
  function pad(n) { return (n < 10 ? '0' : '') + n; }

  function stats(list) {
    var answered = 0, right = 0;
    list.forEach(function (q) {
      var v = state.a[q.id];
      if (v !== undefined) { answered++; if (v === q.a) right++; }
    });
    return { total: list.length, answered: answered, right: right };
  }

  // ---------- card de questão ----------
  function qCard(q, opts) {
    opts = opts || {};
    var cap = capById[q.c];
    var art = document.createElement('article');
    art.className = 'q';
    art.dataset.id = q.id;
    art.innerHTML =
      '<div class="q-meta"><span class="qn">' + (opts.label || ('Questão ' + q.n)) + '</span>' +
      '<span class="tag ' + q.b.toLowerCase() + '">' + q.b + '</span>' +
      '<span>Cap. ' + cap.num + ' · ' + cap.short + '</span></div>' +
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
    var buttons = art.querySelectorAll('.opt');
    Array.prototype.forEach.call(buttons, function (b) {
      var i = +b.dataset.i;
      b.disabled = true;
      b.classList.remove('sel');
      if (i === q.a) b.classList.add('right');
      else if (i === chosen) b.classList.add('wrong');
    });
    var fb = art.querySelector('.q-fb');
    var ok = chosen === q.a;
    var verdict = chosen === undefined || chosen === null
      ? '<p class="verdict no">Em branco. Gabarito: ' + LET[q.a] + '</p>'
      : ok ? '<p class="verdict ok">Correta! Gabarito: ' + LET[q.a] + '</p>'
           : '<p class="verdict no">Errada. Você marcou ' + LET[chosen] + '; gabarito: ' + LET[q.a] + '</p>';
    fb.innerHTML = verdict + '<div class="q-exp">' + q.x + '</div>' +
      (opts && opts.mode === 'exam' ? '' : '<div class="q-actions"><button type="button" class="small-btn redo">Refazer esta questão</button></div>');
    fb.hidden = false;
    var redo = fb.querySelector('.redo');
    if (redo) redo.addEventListener('click', function () {
      delete state.a[q.id]; save(); refreshProgress();
      var fresh = qCard(q, Object.assign({}, opts, { fresh: true }));
      art.replaceWith(fresh);
    });
  }

  // ---------- montagem dos capítulos ----------
  chapters.forEach(function (c, idx) {
    var sec = c.el;
    var head = sec.querySelector('.ch-head');
    var theory = sec.querySelector('.theory');
    var list = qsOf(c.id);
    var tabs = document.createElement('div');
    tabs.className = 'ch-tabs';
    tabs.setAttribute('role', 'tablist');
    tabs.innerHTML = '<button class="ch-tab" role="tab" aria-selected="true" data-t="t">Teoria</button>' +
      '<button class="ch-tab" role="tab" aria-selected="false" data-t="q">Questões (' + list.length + ')</button>';
    head.after(tabs);
    var quiz = document.createElement('div');
    quiz.className = 'quiz';
    quiz.hidden = true;
    theory.after(quiz);
    var cap = (window.AOCP_CAP || {})[c.id];
    var vfList = (window.VF || []).filter(function (v) { return v.c === c.id; });
    var vfBox = null;
    if (vfList.length) {
      vfBox = document.createElement('section');
      vfBox.className = 'vf-train';
      vfBox.setAttribute('aria-label', 'Treino de verdadeiro ou falso');
      var renderVF = function () {
        var done = 0, right = 0;
        vfList.forEach(function (v, i) {
          var ans = state.vf[c.id + '-' + i];
          if (ans !== undefined) { done++; if (ans === v.v) right++; }
        });
        vfBox.innerHTML = '<h2>Treino V/F no estilo AOCP</h2>' +
          '<p class="vf-intro">Marque verdadeiro ou falso. Na prova, a AOCP junta quatro itens como estes em uma sequência ("V – F – V – F"): acertando cada item, você acerta a questão.</p>' +
          '<p class="vf-score">' + done + '/' + vfList.length + ' respondidos · ' + right + ' certos</p>' +
          '<ol class="vf-list">' + vfList.map(function (v, i) {
            var ans = state.vf[c.id + '-' + i];
            var answered = ans !== undefined;
            var ok = answered && ans === v.v;
            return '<li class="vf-item' + (answered ? (ok ? ' ok' : ' no') : '') + '"><p class="vf-t">' + v.t + '</p>' +
              '<div class="vf-btns">' +
              '<button type="button" data-i="' + i + '" data-v="1"' + (answered ? ' disabled' : '') + (answered && ans === true ? ' class="picked"' : '') + ' aria-label="Verdadeiro">V</button>' +
              '<button type="button" data-i="' + i + '" data-v="0"' + (answered ? ' disabled' : '') + (answered && ans === false ? ' class="picked"' : '') + ' aria-label="Falso">F</button></div>' +
              (answered ? '<p class="vf-fb"><b>' + (ok ? 'Certo' : 'Errado') + ': é ' + (v.v ? 'VERDADEIRO' : 'FALSO') + '.</b> ' + v.x + '</p>' : '') + '</li>';
          }).join('') + '</ol>' +
          '<div class="q-actions"><button type="button" class="small-btn vf-reset">Refazer o treino</button></div>';
        vfBox.querySelectorAll('.vf-btns button').forEach(function (b) {
          b.addEventListener('click', function () {
            state.vf[c.id + '-' + b.dataset.i] = b.dataset.v === '1';
            save(); renderVF();
          });
        });
        vfBox.querySelector('.vf-reset').addEventListener('click', function () {
          vfList.forEach(function (v, i) { delete state.vf[c.id + '-' + i]; });
          save(); renderVF();
        });
      };
      renderVF();
      theory.appendChild(vfBox);
    }
    if (cap) {
      var box = document.createElement('aside');
      box.className = 'aocp-box';
      box.innerHTML = '<span class="aocp-label">Na prova da AOCP · Edital Soldado PMPE 2026</span>' +
        '<p class="aocp-item"><b>O que o edital pede:</b> ' + cap.item + '</p>' +
        '<div class="aocp-cols"><div><h4>Como a AOCP cobra</h4><ul>' + cap.cobra.map(function (t) { return '<li>' + t + '</li>'; }).join('') + '</ul></div>' +
        '<div><h4>Pares para o "relacione as colunas"</h4><dl class="aocp-pares">' + cap.pares.map(function (p) { return '<dt>' + p[0] + '</dt><dd>' + p[1] + '</dd>'; }).join('') + '</dl></div></div>' +
        '<p class="aocp-foco"><b>Foco:</b> ' + cap.foco + '</p>' +
        '<div class="q-actions">' + (vfBox ? '<button type="button" class="small-btn go-vf">Ir ao treino V/F</button>' : '') +
        '<button type="button" class="small-btn go-aocp">Questões AOCP deste capítulo</button></div>';
      theory.insertBefore(box, theory.firstChild);
      if (vfBox) box.querySelector('.go-vf').addEventListener('click', function () { vfBox.scrollIntoView(); });
    }
    var nA = list.filter(function (q) { return q.b === 'AOCP'; }).length;
    var cta = document.createElement('div');
    cta.className = 'panel';
    cta.innerHTML = '<h3>Terminou a teoria?</h3><p style="margin:0 0 10px;font-size:.94rem">Resolva as questões deste capítulo: ' + nA + ' no estilo AOCP (banca do edital) e ' + (list.length - nA) + ' no estilo FCC e Vunesp, para treino extra.</p><button type="button" class="btn go-q">Ir para as questões</button>';
    theory.appendChild(cta);
    var foot = document.createElement('nav');
    foot.className = 'ch-foot';
    var prev = chapters[idx - 1], next = chapters[idx + 1];
    foot.innerHTML = (prev ? '<a class="btn ghost" href="#' + prev.id + '">← Cap. ' + prev.num + ' · ' + prev.short + '</a>' : '<a class="btn ghost" href="#inicio">← Início</a>') +
      (next ? '<a class="btn" href="#' + next.id + '">Cap. ' + next.num + ' · ' + next.short + ' →</a>' : '<a class="btn" href="#simulado">Fazer simulado →</a>');
    sec.appendChild(foot);

    var filter = 'all';
    function renderQuiz() {
      quiz.innerHTML = '';
      var bar = document.createElement('div');
      bar.className = 'quiz-bar';
      var s = stats(list);
      var bancas = [['AOCP', 'AOCP'], ['', 'Todas as bancas'], ['FCC', 'FCC'], ['Vunesp', 'Vunesp']];
      bar.innerHTML = '<div class="seg" role="group" aria-label="Filtrar por banca">' +
        bancas.map(function (b) {
          return '<button type="button" data-b="' + b[0] + '" aria-pressed="' + (bancaPref === b[0]) + '">' + b[1] + '</button>';
        }).join('') + '</div>' +
        '<div class="seg" role="group" aria-label="Filtrar questões">' +
        ['all:Todas', 'new:Não respondidas', 'wrong:Erradas'].map(function (p) {
          var k = p.split(':');
          return '<button type="button" data-f="' + k[0] + '" aria-pressed="' + (filter === k[0]) + '">' + k[1] + '</button>';
        }).join('') + '</div>' +
        '<button type="button" class="small-btn reset-cap">Zerar capítulo</button>' +
        '<span class="count">' + s.answered + '/' + s.total + ' respondidas · ' + s.right + ' certas</span>';
      quiz.appendChild(bar);
      var confirm = document.createElement('div');
      confirm.className = 'confirm';
      confirm.hidden = true;
      confirm.innerHTML = '<span>Apagar suas respostas deste capítulo?</span><button type="button" class="small-btn yes">Sim, zerar</button><button type="button" class="small-btn no">Cancelar</button>';
      quiz.appendChild(confirm);
      bar.querySelectorAll('[data-f]').forEach(function (b) {
        b.addEventListener('click', function () { filter = b.dataset.f; renderQuiz(); });
      });
      bar.querySelectorAll('[data-b]').forEach(function (b) {
        b.addEventListener('click', function () {
          bancaPref = b.dataset.b;
          try { localStorage.setItem('dhpmpe.banca', bancaPref); } catch (e) {}
          renderQuiz();
        });
      });
      bar.querySelector('.reset-cap').addEventListener('click', function () { confirm.hidden = false; });
      confirm.querySelector('.no').addEventListener('click', function () { confirm.hidden = true; });
      confirm.querySelector('.yes').addEventListener('click', function () {
        list.forEach(function (q) { delete state.a[q.id]; });
        save(); refreshProgress(); renderQuiz();
      });
      var shown = list.filter(function (q) {
        var v = state.a[q.id];
        if (bancaPref && q.b !== bancaPref) return false;
        if (filter === 'new') return v === undefined;
        if (filter === 'wrong') return v !== undefined && v !== q.a;
        return true;
      });
      if (!shown.length) {
        var e = document.createElement('p');
        e.className = 'empty';
        e.textContent = filter === 'wrong' ? 'Nenhum erro neste capítulo' + (bancaPref ? ' nas questões ' + bancaPref : '') + '.' : filter === 'new' ? 'Você já respondeu todas' + (bancaPref ? ' as questões ' + bancaPref : '') + '. Use "Zerar capítulo" para refazer.' : 'Sem questões.';
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
      tabs.querySelectorAll('.ch-tab').forEach(function (b) { b.setAttribute('aria-selected', String(b.dataset.t === t)); });
      theory.hidden = t !== 't';
      quiz.hidden = t !== 'q';
      if (t === 'q') renderQuiz();
    }
    tabs.addEventListener('click', function (ev) {
      var b = ev.target.closest('.ch-tab');
      if (b) { setTab(b.dataset.t); window.scrollTo(0, 0); }
    });
    cta.querySelector('.go-q').addEventListener('click', function () { setTab('q'); window.scrollTo(0, 0); });
    var goA = sec.querySelector('.go-aocp');
    if (goA) goA.addEventListener('click', function () {
      bancaPref = 'AOCP';
      try { localStorage.setItem('dhpmpe.banca', bancaPref); } catch (e) {}
      setTab('q'); window.scrollTo(0, 0);
    });
    c.setTab = setTab;
  });

  // ---------- navegação ----------
  var nav = $('nav');
  function navLink(id, num, label) {
    return '<a class="nav-link" href="#' + id + '" data-v="' + id + '"><span class="nav-num">' + num + '</span><span>' + label + '</span><span class="nav-prog" data-p="' + id + '"></span></a>';
  }
  var h = navLink('inicio', '◆', 'Início');
  h += '<div class="nav-group">Parte geral</div>';
  chapters.slice(0, 5).forEach(function (c) { h += navLink(c.id, pad(c.num), c.short); });
  h += '<div class="nav-group">Legislação especial</div>';
  chapters.slice(5, 16).forEach(function (c) { h += navLink(c.id, pad(c.num), c.short); });
  h += '<div class="nav-group">Revisão</div>';
  chapters.slice(16).forEach(function (c) { h += navLink(c.id, pad(c.num), c.short); });
  h += navLink('simulado', '▣', 'Simulado') + navLink('flashcards', '▤', 'Flashcards') + navLink('erros', '✕', 'Caderno de erros');
  nav.innerHTML = h;

  $('tocGrid').innerHTML = chapters.map(function (c) {
    return '<a class="toc-card" href="#' + c.id + '"><span class="n">' + pad(c.num) + '</span><span class="t">' + c.title + '<span class="s" data-p="' + c.id + '"></span></span></a>';
  }).join('');

  var views = Array.prototype.slice.call(document.querySelectorAll('.view'));
  var viewIds = views.map(function (v) { return v.id; });
  var titles = { inicio: 'Início', simulado: 'Simulado', flashcards: 'Flashcards', erros: 'Caderno de erros' };

  function show(id, push) {
    if (viewIds.indexOf(id) < 0) id = 'inicio';
    views.forEach(function (v) { v.hidden = v.id !== id; });
    nav.querySelectorAll('.nav-link').forEach(function (a) {
      if (a.dataset.v === id) a.setAttribute('aria-current', 'page'); else a.removeAttribute('aria-current');
    });
    var c = capById[id];
    $('where').textContent = c ? 'Cap. ' + c.num + ' · ' + c.short : titles[id];
    if (c) c.setTab('t');
    if (id === 'erros') renderErrors();
    if (id === 'flashcards') renderFC();
    closeMenu();
    window.scrollTo(0, 0);
    if (push) { try { history.pushState(null, '', '#' + id); } catch (e) {} }
  }
  document.addEventListener('click', function (ev) {
    var a = ev.target.closest('a[href^="#"]');
    if (!a) return;
    var id = a.getAttribute('href').slice(1);
    if (viewIds.indexOf(id) < 0) return;
    ev.preventDefault();
    show(id, true);
  });
  window.addEventListener('popstate', function () { show(location.hash.slice(1)); });
  window.addEventListener('hashchange', function () { show(location.hash.slice(1)); });

  // ---------- menu (celular) ----------
  var side = $('side'), scrim = $('scrim'), menuBtn = $('menuBtn');
  function closeMenu() { side.classList.remove('open'); scrim.classList.remove('open'); menuBtn.setAttribute('aria-expanded', 'false'); }
  menuBtn.addEventListener('click', function () {
    var open = !side.classList.contains('open');
    side.classList.toggle('open', open); scrim.classList.toggle('open', open);
    menuBtn.setAttribute('aria-expanded', String(open));
  });
  scrim.addEventListener('click', closeMenu);
  document.addEventListener('keydown', function (ev) { if (ev.key === 'Escape') closeMenu(); });

  // ---------- tema ----------
  var root = document.documentElement;
  try { var th = localStorage.getItem('dhpmpe.theme'); if (th) root.setAttribute('data-theme', th); } catch (e) {}
  $('themeBtn').addEventListener('click', function () {
    var cur = root.getAttribute('data-theme') || (window.matchMedia && matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    var next = cur === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    try { localStorage.setItem('dhpmpe.theme', next); } catch (e) {}
  });

  // ---------- progresso ----------
  function refreshProgress() {
    var all = stats(QS);
    $('barFill').style.width = (all.total ? (all.answered / all.total * 100) : 0) + '%';
    $('barTxt').textContent = all.answered + '/' + all.total;
    $('statQ').textContent = QS.length;
    $('statFC').textContent = FC.length;
    $('statAcc').textContent = all.answered ? Math.round(all.right / all.answered * 100) + '%' : '–';
    chapters.forEach(function (c) {
      var s = stats(qsOf(c.id));
      document.querySelectorAll('[data-p="' + c.id + '"]').forEach(function (el) {
        el.textContent = el.classList.contains('s') ? (s.total + ' questões · ' + s.answered + ' feitas') : (s.answered + '/' + s.total);
      });
    });
    var errs = QS.filter(function (q) { var v = state.a[q.id]; return v !== undefined && v !== q.a; }).length;
    var pe = document.querySelector('[data-p="erros"]');
    if (pe) pe.textContent = errs ? String(errs) : '';
  }

  $('resetAll').addEventListener('click', function () { $('resetConfirm').hidden = false; });
  $('resetNo').addEventListener('click', function () { $('resetConfirm').hidden = true; });
  $('resetYes').addEventListener('click', function () {
    state = { a: {} }; save(); refreshProgress(); $('resetConfirm').hidden = true;
  });

  // ---------- caderno de erros ----------
  function renderErrors() {
    var box = $('errList');
    box.innerHTML = '';
    var list = QS.filter(function (q) { var v = state.a[q.id]; return v !== undefined && v !== q.a; });
    if (!list.length) {
      box.innerHTML = '<p class="empty">Nenhum erro registrado. Resolva questões nos capítulos ou faça um simulado.</p>';
      return;
    }
    list.forEach(function (q) { box.appendChild(qCard(q, { fresh: true, label: 'Cap. ' + capById[q.c].num + ' · Questão ' + q.n })); });
  }

  // ---------- simulado ----------
  $('simCaps').innerHTML = chapters.map(function (c) {
    return '<label><input type="checkbox" value="' + c.id + '" checked> <span>' + pad(c.num) + ' · ' + c.short + '</span></label>';
  }).join('');
  function capBoxes() { return Array.prototype.slice.call(document.querySelectorAll('#simCaps input')); }
  $('simAll').addEventListener('click', function () { capBoxes().forEach(function (b) { b.checked = true; }); });
  $('simNone').addEventListener('click', function () { capBoxes().forEach(function (b) { b.checked = false; }); });

  var sim = null, timer = null;
  function shuffle(arr) {
    for (var i = arr.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = arr[i]; arr[i] = arr[j]; arr[j] = t; }
    return arr;
  }
  function fmtTime(s) { return pad(Math.floor(s / 60)) + ':' + pad(s % 60); }
  function startSim(pool, pmpe) {
    sim = { list: pool, ans: {}, t0: Date.now(), pmpe: !!pmpe };
    $('simSetup').hidden = true; $('simResult').hidden = true; $('simRun').hidden = false;
    document.querySelector('.sim-pmpe').hidden = true;
    var box = $('simList'); box.innerHTML = '';
    pool.forEach(function (q, k) {
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
  $('simBanca').value = 'AOCP';
  function startPMPE() {
    var byCap = {};
    QS.forEach(function (q) { if (q.b === 'AOCP') (byCap[q.c] = byCap[q.c] || []).push(q); });
    var picked = shuffle(Object.keys(byCap)).slice(0, 10).sort(function (a, b) { return capById[a].num - capById[b].num; });
    var pool = picked.map(function (k) { var arr = byCap[k]; return arr[Math.floor(Math.random() * arr.length)]; });
    $('simMsg').hidden = true;
    startSim(pool, true);
  }
  $('simPMPE').addEventListener('click', startPMPE);
  var coverPMPE = $('coverPMPE');
  if (coverPMPE) coverPMPE.addEventListener('click', function () { show('simulado', true); startPMPE(); });
  $('simStart').addEventListener('click', function () {
    var caps = capBoxes().filter(function (b) { return b.checked; }).map(function (b) { return b.value; });
    var banca = $('simBanca').value, only = $('simOnly').value, qtd = +$('simQtd').value;
    var pool = QS.filter(function (q) {
      if (caps.indexOf(q.c) < 0) return false;
      if (banca && q.b !== banca) return false;
      var v = state.a[q.id];
      if (only === 'new' && v !== undefined) return false;
      if (only === 'wrong' && (v === undefined || v === q.a)) return false;
      return true;
    });
    var msg = $('simMsg');
    if (!pool.length) { msg.hidden = false; msg.textContent = 'Nenhuma questão com esses filtros. Marque mais capítulos ou mude o filtro.'; return; }
    msg.hidden = true;
    startSim(shuffle(pool).slice(0, qtd));
  });
  $('simQuit').addEventListener('click', function () {
    if ($('simQuit').textContent === 'Cancelar') { $('simQuit').textContent = 'Confirmar cancelamento'; return; }
    clearInterval(timer); sim = null;
    $('simRun').hidden = true; $('simSetup').hidden = false;
    document.querySelector('.sim-pmpe').hidden = false;
  });
  $('simEnd').addEventListener('click', function () {
    if (!sim) return;
    clearInterval(timer);
    var secs = Math.floor((Date.now() - sim.t0) / 1000);
    var right = 0, byCap = {};
    sim.list.forEach(function (q) {
      var v = sim.ans[q.id];
      if (v !== undefined) state.a[q.id] = v;
      var ok = v === q.a;
      if (ok) right++;
      byCap[q.c] = byCap[q.c] || { t: 0, r: 0 };
      byCap[q.c].t++; if (ok) byCap[q.c].r++;
    });
    save(); refreshProgress();
    document.querySelectorAll('#simList .q').forEach(function (art) {
      var q = QS.filter(function (x) { return x.id === art.dataset.id; })[0];
      reveal(art, q, sim.ans[q.id], { mode: 'exam' });
    });
    var pct = Math.round(right / sim.list.length * 100);
    var pmpeNote = sim.pmpe ? '<p class="score-note">Na prova, estas 10 questões somam com as 10 de Direito Constitucional no Bloco III: são exigidos ao menos 6 acertos em 20 no bloco, sem zerar a disciplina. ' + (right >= 6 ? 'Com ' + right + ' acertos aqui, você já cobriria sozinho o mínimo do bloco.' : right >= 1 ? 'Com ' + right + ' acerto(s), você não zera a disciplina, mas precisaria completar o bloco com Constitucional.' : 'Zerar a disciplina elimina: revise a teoria antes do próximo simulado.') + '</p>' : '';
    var note = pct >= 80 ? 'Nível de aprovação. Revise só os erros.' : pct >= 60 ? 'Bom caminho. Volte à teoria dos capítulos com menor aproveitamento.' : 'Volte à teoria e aos quadros de pegadinhas antes do próximo simulado.';
    var rows = Object.keys(byCap).sort(function (a, b) { return capById[a].num - capById[b].num; }).map(function (k) {
      var c = capById[k], s = byCap[k];
      return '<tr><td>' + pad(c.num) + ' · ' + c.short + '</td><td>' + s.r + '/' + s.t + '</td><td>' + Math.round(s.r / s.t * 100) + '%</td></tr>';
    }).join('');
    var res = $('simResult');
    res.innerHTML = '<div class="panel"><div class="score"><span class="score-big">' + pct + '%</span><div><p class="score-note"><b>' + right + ' acertos em ' + sim.list.length + ' questões</b> · tempo ' + fmtTime(secs) + '</p><p class="score-note">' + note + '</p>' + pmpeNote + '</div></div>' +
      '<div class="tbl-wrap"><table class="tbl"><tr><th>Capítulo</th><th>Acertos</th><th>%</th></tr>' + rows + '</table></div>' +
      '<div class="q-actions"><button type="button" class="btn" id="simNew">Novo simulado</button><a class="btn ghost" href="#erros">Ir ao caderno de erros</a></div>' +
      '<p class="q-exp" style="margin-top:10px">O gabarito comentado de cada questão está logo abaixo.</p></div>';
    res.hidden = false;
    $('simRun').querySelector('.sim-sticky').hidden = true;
    $('simNew').addEventListener('click', function () {
      $('simRun').hidden = true; $('simResult').hidden = true; $('simSetup').hidden = false;
      document.querySelector('.sim-pmpe').hidden = false;
      $('simRun').querySelector('.sim-sticky').hidden = false;
      window.scrollTo(0, 0);
    });
    sim = null;
    res.scrollIntoView();
  });

  // ---------- flashcards ----------
  var fcSel = $('fcCap');
  fcSel.innerHTML += chapters.filter(function (c) { return FC.some(function (f) { return f.c === c.id; }); })
    .map(function (c) { return '<option value="' + c.id + '">' + pad(c.num) + ' · ' + c.short + '</option>'; }).join('');
  var fcList = FC.slice(), fcI = 0, fcBack = false;
  function fcFilter() {
    var v = fcSel.value;
    fcList = FC.filter(function (f) { return !v || f.c === v; });
    fcI = 0; fcBack = false; renderFC();
  }
  function renderFC() {
    var card = $('fcCard');
    if (!fcList.length) { $('fcText').textContent = 'Sem cartões.'; $('fcCount').textContent = '0/0'; return; }
    var f = fcList[fcI];
    card.classList.toggle('back', fcBack);
    $('fcSide').textContent = fcBack ? 'Resposta' : 'Pergunta · Cap. ' + capById[f.c].num;
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

  // ---------- início ----------
  refreshProgress();
  show(location.hash.slice(1) || 'inicio');
})();
