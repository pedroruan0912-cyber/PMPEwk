// Seções de outras disciplinas (bancos em Markdown): treino, simulados e desempenho.
// Cada seção é descrita em BANCOS_CFG e montada por initBanco dentro de <section class="view" id="...">.
// Os dados vêm de *-data.js (gerados por ebook/gen-bancos.py). As respostas ficam em state[cfg.key],
// no mesmo armazenamento do e-book, e cada resposta rende XP no Sistema.
window.BANCOS_CFG = [
  {
    key: 'dc', sec: 'constitucional', nav: 'Direito Constitucional', data: 'DC',
    kicker: 'Bloco III · 10 questões na prova de Soldado', title: 'Direito Constitucional',
    lede: '165 questões de raciocínio sobre o conteúdo do edital, em cinco formatos, com gabarito comentado: o raciocínio passo a passo e o erro de cada alternativa. No treino, a correção aparece na hora; nos simulados, só quando você entrega.',
    grpLabel: 'Temas do edital', grpCol: 'Tema', bloco: true,
    provaNote: 'Na prova, estas 10 questões somam com as 10 de Direitos Humanos no Bloco III, que exige ao menos 6 acertos em 20 e nenhuma disciplina zerada. Para treinar o corte, faça o simulado do Bloco III completo.'
  },
  {
    key: 'hpe', sec: 'historia', nav: 'História de Pernambuco', data: 'HPE',
    kicker: 'Bloco I · 10 questões na prova de Soldado', title: 'História de Pernambuco',
    lede: '140 questões de raciocínio sobre os 8 itens do edital, da colonização à Pernambuco atual, em cinco formatos, com gabarito comentado. No treino, a correção aparece na hora; nos simulados, só quando você entrega.',
    grpLabel: 'Itens do edital', grpCol: 'Item do edital', bloco: false,
    provaNote: 'Na prova, estas 10 questões somam com as 10 de Língua Portuguesa no Bloco I, que exige ao menos 6 acertos em 20 e nenhuma disciplina zerada.'
  },
  {
    key: 'inf', sec: 'informatica', nav: 'Informática', data: 'INF',
    kicker: 'Bloco II · 10 questões na prova de Soldado', title: 'Informática',
    lede: '130 questões de raciocínio sobre os 7 itens do edital (internet e intranet, navegadores e nuvem, segurança, backup, arquivos e hardware, Windows 11 e Prompt de Comando, Office 2019 e LibreOffice 7), em cinco formatos, com gabarito comentado. No treino, a correção aparece na hora; nos simulados, só quando você entrega.',
    grpLabel: 'Itens do edital', grpCol: 'Item do edital', bloco: false,
    provaNote: 'Na prova, estas 10 questões somam com as 10 de Raciocínio Lógico no Bloco II, que exige ao menos 6 acertos em 20 e nenhuma disciplina zerada.'
  }
];

window.initBanco = function (api, cfg) {
  'use strict';
  var $ = api.$, pad = api.pad, shuffle = api.shuffle, P = cfg.key;
  var QS = window[cfg.data + '_QS'] || [], GR = window[cfg.data + '_GROUPS'] || [];
  var FMT = { 1: 'Cenário inédito', 2: 'Asserção e razão', 3: 'Múltipla escolha complexa', 4: 'Certo ou errado', 5: 'Melhor alternativa' };
  var FSHORT = { 1: 'Cenário', 2: 'Asserção', 3: 'Complexa', 4: 'Certo/Errado', 5: 'Melhor alternativa' };
  var grpName = {}, grpIdx = {};
  GR.forEach(function (g, i) { grpName[g.id] = g.n; grpIdx[g.id] = i; });
  QS.forEach(function (q) { q.id = P + '-' + q.n; q.L = q.f === 4 ? ['C', 'E'] : ['A', 'B', 'C', 'D', 'E']; });
  function el(id) { return $(P + id); }

  // ---------- estrutura da seção ----------
  var sec = $(cfg.sec);
  sec.innerHTML =
    '<header class="ch-head"><span class="ch-kicker">' + cfg.kicker + '</span><h1>' + cfg.title + '</h1><p class="lede">' + cfg.lede + '</p></header>' +
    '<div class="stats" id="' + P + 'Stats"></div>' +
    '<div class="ch-tabs" role="tablist" id="' + P + 'Tabs">' +
      '<button class="ch-tab" role="tab" aria-selected="true" data-t="sim" type="button">Simulados</button>' +
      '<button class="ch-tab" role="tab" aria-selected="false" data-t="tre" type="button">Treino</button>' +
      '<button class="ch-tab" role="tab" aria-selected="false" data-t="des" type="button">Desempenho</button></div>' +
    '<div id="' + P + 'Sim"><div class="dc-modes">' +
      '<div class="panel"><h3>Formato da prova</h3><p class="q-exp">10 questões de cinco alternativas, sorteadas entre os ' + GR.length + ' ' + cfg.grpLabel.toLowerCase() + ', misturando cenário, asserção e razão, múltipla escolha complexa e melhor alternativa.</p>' +
        '<div class="q-actions"><button class="btn" id="' + P + 'Prova" type="button">Iniciar 10 questões</button></div></div>' +
      (cfg.bloco ? '<div class="panel dc-bloco"><h3>Bloco III completo</h3><p class="q-exp">20 questões, como no bloco da prova: 10 de Direito Constitucional e 10 de Direitos Humanos e Legislação Extravagante (estilo AOCP). No fim, você vê se passaria no corte do bloco.</p>' +
        '<div class="q-actions"><button class="btn" id="' + P + 'Bloco" type="button">Iniciar 20 questões</button></div></div>' : '') +
    '</div><div class="panel"><h3>Montar simulado</h3>' +
      '<div class="field"><label>Formatos</label></div><div class="cap-checks" id="' + P + 'Fmts"></div>' +
      '<div class="field"><label>' + cfg.grpLabel + '</label></div><div class="cap-checks" id="' + P + 'Grps"></div>' +
      '<div class="form-row"><button class="small-btn" id="' + P + 'All" type="button">Marcar todos</button><button class="small-btn" id="' + P + 'None" type="button">Desmarcar todos</button></div>' +
      '<div class="form-row"><div class="field"><label for="' + P + 'Qtd">Questões</label><select id="' + P + 'Qtd"><option>10</option><option selected>20</option><option>28</option><option>50</option><option value="999">Todas</option></select></div>' +
        '<div class="field"><label for="' + P + 'Only">Filtro</label><select id="' + P + 'Only"><option value="all">Todas as questões</option><option value="new">Só as não respondidas</option><option value="wrong">Só as que errei</option></select></div>' +
        '<button class="btn" id="' + P + 'Start" type="button">Iniciar simulado</button></div>' +
      '<p id="' + P + 'Msg" class="q-exp" hidden></p></div>' +
    '<details class="deep"><summary>Como funciona cada formato</summary><div><ol class="dc-fmt-help">' +
      '<li><b>Cenário inédito:</b> um caso, documento ou situação nova pede o diagnóstico, a consequência ou a interpretação correta.</li>' +
      '<li><b>Asserção e razão:</b> julgue a asserção I, depois a II e, se as duas forem verdadeiras, se a II é a causa da I.</li>' +
      '<li><b>Múltipla escolha complexa:</b> julgue cada item sozinho e elimine as alternativas que contêm um item falso.</li>' +
      '<li><b>Certo ou errado:</b> uma assertiva densa testa o limite de uma regra, de uma data ou de uma exceção.</li>' +
      '<li><b>Melhor alternativa:</b> mais de uma opção pode ser verdadeira em tese; só uma cumpre a restrição em negrito.</li>' +
    '</ol></div></details></div>' +
    '<div id="' + P + 'Tre" hidden></div><div id="' + P + 'Des" hidden></div>' +
    '<div id="' + P + 'Run" hidden><div class="sim-sticky"><span id="' + P + 'Count">0/0 respondidas</span><span id="' + P + 'Time">00:00</span><span class="grow"></span>' +
      '<button class="small-btn" id="' + P + 'Quit" type="button">Cancelar</button><button class="btn" id="' + P + 'End" type="button">Entregar</button></div>' +
      '<div id="' + P + 'Result" hidden></div><div id="' + P + 'List"></div></div>';

  function st() { var s = api.state(); if (!s[P]) s[P] = {}; return s[P]; }
  function ans(q) { return st()[q.id]; }
  function stats(list) {
    var a = 0, r = 0;
    list.forEach(function (q) { var v = ans(q); if (v !== undefined) { a++; if (v === q.a) r++; } });
    return { total: list.length, answered: a, right: r };
  }
  function wrongList() { return QS.filter(function (q) { var v = ans(q); return v !== undefined && v !== q.a; }); }
  function pct(r, t) { return t ? Math.round(r / t * 100) : 0; }
  function fmtTime(s) { return pad(Math.floor(s / 60)) + ':' + pad(s % 60); }

  // ---------- card de questão ----------
  function card(q, opts) {
    opts = opts || {};
    var art = document.createElement('article');
    art.className = 'q';
    art.dataset.id = q.id;
    art.innerHTML =
      '<div class="q-meta"><span class="qn">' + (opts.label || ('Questão ' + q.n)) + '</span>' +
      '<span class="tag dc">' + FSHORT[q.f] + '</span><span>' + grpName[q.g] + ' · nº ' + q.n + '</span></div>' +
      '<div class="q-stem">' + q.e + '</div>' +
      '<ol class="q-opts' + (q.f === 4 ? ' ce' : '') + '">' + q.o.map(function (t, i) {
        return '<li><button type="button" class="opt" data-i="' + i + '"><span class="lt">' + q.L[i] + '</span><span>' + t + '</span></button></li>';
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
        st()[q.id] = i; api.save();
        reveal(art, q, i, opts);
        api.sys.answer(q, i);
        api.refresh(); updStats();
        if (opts.onAnswer) opts.onAnswer(q, i);
      });
    });
    if (opts.mode !== 'exam' && !opts.fresh && ans(q) !== undefined) reveal(art, q, ans(q), opts);
    return art;
  }

  function reveal(art, q, chosen, opts) {
    art.dataset.done = '1';
    Array.prototype.forEach.call(art.querySelectorAll('.opt'), function (b) {
      var i = +b.dataset.i;
      b.disabled = true;
      b.classList.remove('sel');
      if (i === q.a) b.classList.add('right');
      else if (i === chosen) b.classList.add('wrong');
    });
    var key = q.L[q.a] + (q.k ? ' (' + q.k + ')' : '');
    var blank = chosen === undefined || chosen === null;
    var verdict = blank ? '<p class="verdict no">Em branco. Gabarito: ' + key + '</p>'
      : chosen === q.a ? '<p class="verdict ok">Correta! Gabarito: ' + key + '</p>'
        : '<p class="verdict no">Errada. Você marcou ' + q.L[chosen] + '; gabarito: ' + key + '</p>';
    var fb = art.querySelector('.q-fb');
    fb.innerHTML = verdict + '<div class="q-exp">' + q.x + '</div>' +
      (opts && opts.mode === 'exam' ? '' : '<div class="q-actions"><button type="button" class="small-btn redo">Refazer esta questão</button></div>');
    fb.hidden = false;
    var redo = fb.querySelector('.redo');
    if (redo) redo.addEventListener('click', function () {
      delete st()[q.id]; api.save(); api.refresh(); updStats();
      art.replaceWith(card(q, Object.assign({}, opts, { fresh: true })));
    });
  }

  // ---------- cabeçalho, abas e navegação ----------
  function updStats() {
    var s = stats(QS), errs = wrongList().length;
    el('Stats').innerHTML =
      '<div class="stat"><b>' + QS.length + '</b><span>questões comentadas</span></div>' +
      '<div class="stat"><b>' + s.answered + '</b><span>respondidas</span></div>' +
      '<div class="stat"><b>' + (s.answered ? pct(s.right, s.answered) + '%' : '–') + '</b><span>seu aproveitamento</span></div>' +
      '<div class="stat"><b>' + errs + '</b><span>' + (errs ? '<a href="#erros">no caderno de erros</a>' : 'no caderno de erros') + '</span></div>';
    var np = document.querySelector('[data-p="' + cfg.sec + '"]');
    if (np) np.textContent = s.answered + '/' + s.total;
  }

  var tab = 'sim', run = null, timer = null;
  function setTab(t) {
    tab = t;
    el('Tabs').querySelectorAll('.ch-tab').forEach(function (b) { b.setAttribute('aria-selected', String(b.dataset.t === t)); });
    el('Sim').hidden = t !== 'sim';
    el('Tre').hidden = t !== 'tre';
    el('Des').hidden = t !== 'des';
    if (t === 'tre') renderTreino();
    if (t === 'des') renderDes();
  }
  el('Tabs').addEventListener('click', function (ev) {
    var b = ev.target.closest('.ch-tab');
    if (b) { setTab(b.dataset.t); window.scrollTo(0, 0); }
  });
  function showRun(on) {
    el('Tabs').hidden = on;
    el('Run').hidden = !on;
    if (on) { el('Sim').hidden = el('Tre').hidden = el('Des').hidden = true; } else setTab(tab);
  }

  // ---------- treino (correção na hora) ----------
  var tf = 0, tg = '', ts = 'all';
  function renderTreino() {
    var box = el('Tre');
    box.innerHTML = '';
    var bar = document.createElement('div');
    bar.className = 'quiz-bar';
    var fmts = [[0, 'Todos']].concat([1, 2, 3, 4, 5].map(function (f) { return [f, FSHORT[f]]; }));
    bar.innerHTML = '<div class="seg" role="group" aria-label="Filtrar por formato">' + fmts.map(function (f) {
      return '<button type="button" data-f="' + f[0] + '" aria-pressed="' + (tf === f[0]) + '">' + f[1] + '</button>';
    }).join('') + '</div>' +
      '<div class="seg" role="group" aria-label="Filtrar questões">' + [['all', 'Todas'], ['new', 'Não respondidas'], ['wrong', 'Erradas']].map(function (p) {
        return '<button type="button" data-s="' + p[0] + '" aria-pressed="' + (ts === p[0]) + '">' + p[1] + '</button>';
      }).join('') + '</div>' +
      '<select aria-label="' + cfg.grpCol + '" class="dc-tema"><option value="">' + (cfg.grpCol === 'Tema' ? 'Todos os temas' : 'Todos os itens') + '</option>' + GR.map(function (g) {
        return '<option value="' + g.id + '"' + (tg === g.id ? ' selected' : '') + '>' + g.n + '</option>';
      }).join('') + '</select><span class="count"></span>';
    box.appendChild(bar);
    var pool = QS.filter(function (q) { return (!tf || q.f === tf) && (!tg || q.g === tg); });
    var count = bar.querySelector('.count');
    function updCount() { var s = stats(pool); count.textContent = s.answered + '/' + s.total + ' respondidas · ' + s.right + ' certas'; }
    updCount();
    bar.querySelectorAll('[data-f]').forEach(function (b) { b.addEventListener('click', function () { tf = +b.dataset.f; renderTreino(); }); });
    bar.querySelectorAll('[data-s]').forEach(function (b) { b.addEventListener('click', function () { ts = b.dataset.s; renderTreino(); }); });
    bar.querySelector('.dc-tema').addEventListener('change', function (ev) { tg = ev.target.value; renderTreino(); });
    var shown = pool.filter(function (q) {
      var v = ans(q);
      if (ts === 'new') return v === undefined;
      if (ts === 'wrong') return v !== undefined && v !== q.a;
      return true;
    });
    if (!shown.length) {
      var e = document.createElement('p');
      e.className = 'empty';
      e.textContent = ts === 'wrong' ? 'Nenhum erro com esses filtros.' : ts === 'new' ? 'Você já respondeu todas as questões desses filtros.' : 'Sem questões com esses filtros.';
      box.appendChild(e);
    }
    shown.forEach(function (q) { box.appendChild(card(q, { onAnswer: updCount })); });
  }

  // ---------- desempenho ----------
  function renderDes() {
    var rowsG = GR.map(function (g) {
      var s = stats(QS.filter(function (q) { return q.g === g.id; }));
      return '<tr><td>' + g.n + '</td><td>' + s.answered + '/' + s.total + '</td><td>' + s.right + '</td><td>' + (s.answered ? pct(s.right, s.answered) + '%' : '–') + '</td></tr>';
    }).join('');
    var rowsF = [1, 2, 3, 4, 5].map(function (f) {
      var s = stats(QS.filter(function (q) { return q.f === f; }));
      return '<tr><td>' + f + ' · ' + FMT[f] + '</td><td>' + s.answered + '/' + s.total + '</td><td>' + s.right + '</td><td>' + (s.answered ? pct(s.right, s.answered) + '%' : '–') + '</td></tr>';
    }).join('');
    var head = '<tr><th>{t}</th><th>Feitas</th><th>Certas</th><th>Acerto</th></tr>';
    el('Des').innerHTML =
      '<div class="panel"><h3>Por ' + cfg.grpCol.toLowerCase() + '</h3><div class="tbl-wrap"><table class="tbl">' + head.replace('{t}', cfg.grpCol) + rowsG + '</table></div></div>' +
      '<div class="panel"><h3>Por formato</h3><div class="tbl-wrap"><table class="tbl">' + head.replace('{t}', 'Formato') + rowsF + '</table></div>' +
      '<p class="q-exp">Acerto baixo em um formato indica um erro de método, não de conteúdo: releia o quadro "Como funciona cada formato" na aba Simulados.</p></div>' +
      '<div class="panel"><h3>Recomeçar</h3><p class="q-exp">Apaga só as respostas de ' + cfg.title + ' (o XP já ganho fica).</p>' +
      '<div class="q-actions"><button type="button" class="small-btn" id="' + P + 'Reset">Apagar respostas de ' + cfg.title + '</button></div>' +
      '<div class="confirm" id="' + P + 'ResetC" hidden><span>Apagar as respostas das ' + QS.length + ' questões?</span><button type="button" class="small-btn" id="' + P + 'ResetY">Sim, apagar</button><button type="button" class="small-btn" id="' + P + 'ResetN">Cancelar</button></div></div>';
    el('Reset').addEventListener('click', function () { el('ResetC').hidden = false; });
    el('ResetN').addEventListener('click', function () { el('ResetC').hidden = true; });
    el('ResetY').addEventListener('click', function () { api.state()[P] = {}; api.save(); api.refresh(); updStats(); renderDes(); });
  }

  // ---------- montagem dos simulados ----------
  el('Fmts').innerHTML = [1, 2, 3, 4, 5].map(function (f) {
    return '<label><input type="checkbox" value="' + f + '" checked> <span>' + f + ' · ' + FMT[f] + '</span></label>';
  }).join('');
  el('Grps').innerHTML = GR.map(function (g) {
    var n = QS.filter(function (q) { return q.g === g.id; }).length;
    return '<label><input type="checkbox" value="' + g.id + '" checked> <span>' + g.n + ' (' + n + ')</span></label>';
  }).join('');
  function checked(id) { return Array.prototype.filter.call(document.querySelectorAll('#' + P + id + ' input'), function (b) { return b.checked; }).map(function (b) { return b.value; }); }
  el('All').addEventListener('click', function () { document.querySelectorAll('#' + P + 'Grps input').forEach(function (b) { b.checked = true; }); });
  el('None').addEventListener('click', function () { document.querySelectorAll('#' + P + 'Grps input').forEach(function (b) { b.checked = false; }); });

  // 10 questões de cinco alternativas: percorre os grupos sorteados (repetindo a volta se houver menos de 10),
  // equilibrando os formatos
  function prova10() {
    var cnt = { 1: 0, 2: 0, 3: 0, 5: 0 }, used = {}, pool = [];
    var order = shuffle(GR.map(function (g) { return g.id; }));
    for (var guard = 0; pool.length < 10 && guard < 50; guard++) {
      var g = order[guard % order.length];
      var c = shuffle(QS.filter(function (q) { return q.g === g && q.f !== 4 && !used[q.id]; }));
      if (!c.length) continue;
      c.sort(function (a, b) { return cnt[a.f] - cnt[b.f]; });
      cnt[c[0].f]++; used[c[0].id] = 1; pool.push(c[0]);
    }
    return pool.sort(function (a, b) { return grpIdx[a.g] - grpIdx[b.g] || a.n - b.n; });
  }
  // 10 questões AOCP de Direitos Humanos, uma por capítulo sorteado (como no simulado do e-book)
  function dh10() {
    var byCap = {};
    api.QS.forEach(function (q) { if (q.b === 'AOCP') (byCap[q.c] = byCap[q.c] || []).push(q); });
    return shuffle(Object.keys(byCap)).slice(0, 10)
      .sort(function (a, b) { return api.capById[a].num - api.capById[b].num; })
      .map(function (k) { var arr = byCap[k]; return arr[Math.floor(Math.random() * arr.length)]; });
  }

  el('Prova').addEventListener('click', function () {
    start(prova10().map(function (q) { return { k: 'own', q: q }; }), 'prova');
  });
  if (cfg.bloco) el('Bloco').addEventListener('click', function () {
    var items = prova10().map(function (q) { return { k: 'own', q: q }; })
      .concat(dh10().map(function (q) { return { k: 'dh', q: q }; }));
    start(items, 'bloco');
  });
  el('Start').addEventListener('click', function () {
    var fs = checked('Fmts').map(Number), gs = checked('Grps'), only = el('Only').value, qtd = +el('Qtd').value;
    var pool = QS.filter(function (q) {
      if (fs.indexOf(q.f) < 0 || gs.indexOf(q.g) < 0) return false;
      var v = ans(q);
      if (only === 'new' && v !== undefined) return false;
      if (only === 'wrong' && (v === undefined || v === q.a)) return false;
      return true;
    });
    var msg = el('Msg');
    if (!pool.length) { msg.hidden = false; msg.textContent = 'Nenhuma questão com esses filtros. Marque mais formatos ou ' + cfg.grpLabel.toLowerCase() + ', ou mude o filtro.'; return; }
    msg.hidden = true;
    start(shuffle(pool).slice(0, qtd).map(function (q) { return { k: 'own', q: q }; }), 'livre');
  });

  // ---------- execução ----------
  function start(items, kind) {
    run = { items: items, kind: kind, ans: {}, t0: Date.now() };
    showRun(true);
    el('Result').hidden = true;
    el('Run').querySelector('.sim-sticky').hidden = false;
    el('Quit').textContent = 'Cancelar';
    var box = el('List');
    box.innerHTML = '';
    items.forEach(function (it, k) {
      var label = 'Questão ' + (k + 1) + ' de ' + items.length + (kind === 'bloco' ? (it.k === 'own' ? ' · ' + cfg.title : ' · Direitos Humanos') : '');
      var onPick = function (q, i) { run.ans[q.id] = i; updCount(); };
      box.appendChild(it.k === 'own' ? card(it.q, { mode: 'exam', label: label, onPick: onPick }) : api.qCard(it.q, { mode: 'exam', label: label, onPick: onPick }));
    });
    updCount();
    clearInterval(timer);
    var tick = function () { if (run) el('Time').textContent = fmtTime(Math.floor((Date.now() - run.t0) / 1000)); };
    timer = setInterval(tick, 1000);
    tick();
    window.scrollTo(0, 0);
  }
  function updCount() { el('Count').textContent = Object.keys(run.ans).length + '/' + run.items.length + ' respondidas'; }
  function stop() { clearInterval(timer); run = null; showRun(false); }
  el('Quit').addEventListener('click', function () {
    if (el('Quit').textContent === 'Cancelar') { el('Quit').textContent = 'Confirmar cancelamento'; return; }
    stop(); window.scrollTo(0, 0);
  });

  el('End').addEventListener('click', function () {
    if (!run) return;
    clearInterval(timer);
    var secs = Math.floor((Date.now() - run.t0) / 1000), right = 0, byG = {}, byF = {}, disc = { own: { t: 0, r: 0 }, dh: { t: 0, r: 0 } };
    run.items.forEach(function (it) {
      var q = it.q, v = run.ans[q.id], ok = v === q.a;
      if (v !== undefined) {
        if (it.k === 'own') st()[q.id] = v; else api.state().a[q.id] = v;
        api.sys.answer(q, v, true);
      }
      if (ok) right++;
      disc[it.k].t++; if (ok) disc[it.k].r++;
      if (it.k === 'own') {
        (byG[q.g] = byG[q.g] || { t: 0, r: 0 }).t++; if (ok) byG[q.g].r++;
        (byF[q.f] = byF[q.f] || { t: 0, r: 0 }).t++; if (ok) byF[q.f].r++;
      }
    });
    api.save(); api.refresh(); updStats();
    var total = run.items.length, p = pct(right, total);
    var sysNote = api.sys.simDone({ right: right, total: total });
    el('List').querySelectorAll('.q').forEach(function (art, k) {
      var it = run.items[k];
      if (it.k === 'own') reveal(art, it.q, run.ans[it.q.id], { mode: 'exam' });
      else api.reveal(art, it.q, run.ans[it.q.id], { mode: 'exam' });
    });
    var note = p >= 80 ? 'Nível de aprovação. Revise só os erros.' : p >= 60 ? 'Bom caminho. Treine os ' + cfg.grpLabel.toLowerCase() + ' com menor acerto na tabela abaixo.' : 'Volte ao treino com correção na hora nos ' + cfg.grpLabel.toLowerCase() + ' com menor acerto antes do próximo simulado.';
    var extra = '';
    if (run.kind === 'bloco') {
      var c = disc.own.r, d = disc.dh.r, okBloco = right >= 6, okDisc = c >= 1 && d >= 1;
      extra = '<p class="score-note dc-corte ' + (okBloco && okDisc ? 'ok' : 'no') + '"><b>' + (okBloco && okDisc ? 'Passaria no corte do Bloco III.' : 'Não passaria no corte do Bloco III.') + '</b> ' +
        'O edital exige ao menos 6 acertos em 20 no bloco e pelo menos 1 acerto em cada disciplina. Você fez ' + c + ' em Constitucional e ' + d + ' em Direitos Humanos' +
        (!okDisc ? ': zerar uma disciplina elimina, mesmo com o bloco acima do mínimo.' : !okBloco ? ': faltaram ' + (6 - right) + ' acerto(s) para o mínimo do bloco.' : '.') +
        ' Lembre que também é preciso fazer 30% da prova toda (18 de 60).</p>';
    } else if (run.kind === 'prova') {
      extra = '<p class="score-note">' + cfg.provaNote + '</p>';
    }
    var row = function (label, s) { return '<tr><td>' + label + '</td><td>' + s.r + '/' + s.t + '</td><td>' + pct(s.r, s.t) + '%</td></tr>'; };
    var tables = '';
    if (run.kind === 'bloco') {
      tables += '<div class="tbl-wrap"><table class="tbl"><tr><th>Disciplina</th><th>Acertos</th><th>%</th></tr>' +
        row(cfg.title, disc.own) + row('Direitos Humanos e Legislação Extravagante', disc.dh) + row('Bloco III', { t: total, r: right }) + '</table></div>';
    }
    tables += '<div class="tbl-wrap"><table class="tbl"><tr><th>' + cfg.grpCol + '</th><th>Acertos</th><th>%</th></tr>' +
      Object.keys(byG).sort(function (a, b) { return grpIdx[a] - grpIdx[b]; }).map(function (g) { return row(grpName[g], byG[g]); }).join('') + '</table></div>';
    if (run.kind !== 'bloco') {
      tables += '<div class="tbl-wrap"><table class="tbl"><tr><th>Formato</th><th>Acertos</th><th>%</th></tr>' +
        Object.keys(byF).sort().map(function (f) { return row(f + ' · ' + FMT[f], byF[f]); }).join('') + '</table></div>';
    }
    var res = el('Result');
    res.innerHTML = '<div class="panel"><div class="score"><span class="score-big">' + p + '%</span><div><p class="score-note"><b>' + right + ' acertos em ' + total + ' questões</b> · tempo ' + fmtTime(secs) + '</p><p class="score-note">' + note + '</p>' + extra + sysNote + '</div></div>' +
      tables + '<div class="q-actions"><button type="button" class="btn" id="' + P + 'New">Novo simulado</button><a class="btn ghost" href="#erros">Ir ao caderno de erros</a></div>' +
      '<p class="q-exp" style="margin-top:10px">O gabarito comentado de cada questão está logo abaixo.</p></div>';
    res.hidden = false;
    el('Run').querySelector('.sim-sticky').hidden = true;
    el('New').addEventListener('click', function () { stop(); window.scrollTo(0, 0); });
    run.done = true;
    res.scrollIntoView();
  });

  // ---------- API para o app ----------
  function render() {
    updStats();
    if (!run) setTab(tab);
  }
  function renderErrors(box, heading) {
    var list = wrongList();
    if (!list.length) return;
    if (heading) {
      var h = document.createElement('h2');
      h.className = 'dc-err-h';
      h.textContent = cfg.title + ' (' + list.length + ')';
      box.appendChild(h);
    }
    list.forEach(function (q) { box.appendChild(card(q, { fresh: true, label: cfg.title + ' · Questão ' + q.n })); });
  }
  function reset() { if (run) stop(); updStats(); if (!sec.hidden) render(); }
  updStats();
  return { id: cfg.sec, title: cfg.title, render: render, renderErrors: renderErrors, errCount: function () { return wrongList().length; }, reset: reset };
};
