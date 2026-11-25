// Direito Constitucional: treino, simulados e Bloco III completo.
// Os dados vêm de dc-data.js (gerado do banco em Markdown). As respostas ficam em state.dc,
// no mesmo armazenamento do e-book, e cada resposta rende XP no Sistema.
window.initDC = function (api) {
  'use strict';
  var $ = api.$, pad = api.pad, shuffle = api.shuffle;
  var QS = window.DC_QS || [], GR = window.DC_GROUPS || [];
  var FMT = { 1: 'Cenário inédito', 2: 'Asserção e razão', 3: 'Múltipla escolha complexa', 4: 'Certo ou errado', 5: 'Melhor alternativa' };
  var FSHORT = { 1: 'Cenário', 2: 'Asserção', 3: 'Complexa', 4: 'Certo/Errado', 5: 'Melhor alternativa' };
  var grpName = {}, grpIdx = {};
  GR.forEach(function (g, i) { grpName[g.id] = g.n; grpIdx[g.id] = i; });
  QS.forEach(function (q) { q.id = 'dc-' + q.n; q.L = q.f === 4 ? ['C', 'E'] : ['A', 'B', 'C', 'D', 'E']; });
  var byId = {};
  QS.forEach(function (q) { byId[q.id] = q; });

  function st() { var s = api.state(); if (!s.dc) s.dc = {}; return s.dc; }
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
    $('dcStats').innerHTML =
      '<div class="stat"><b>' + QS.length + '</b><span>questões comentadas</span></div>' +
      '<div class="stat"><b>' + s.answered + '</b><span>respondidas</span></div>' +
      '<div class="stat"><b>' + (s.answered ? pct(s.right, s.answered) + '%' : '–') + '</b><span>seu aproveitamento</span></div>' +
      '<div class="stat"><b>' + errs + '</b><span>' + (errs ? '<a href="#erros">no caderno de erros</a>' : 'no caderno de erros') + '</span></div>';
    var np = document.querySelector('[data-p="constitucional"]');
    if (np) np.textContent = s.answered + '/' + s.total;
  }

  var tab = 'sim', run = null, timer = null;
  function setTab(t) {
    tab = t;
    $('dcTabs').querySelectorAll('.ch-tab').forEach(function (b) { b.setAttribute('aria-selected', String(b.dataset.t === t)); });
    $('dcSim').hidden = t !== 'sim';
    $('dcTre').hidden = t !== 'tre';
    $('dcDes').hidden = t !== 'des';
    if (t === 'tre') renderTreino();
    if (t === 'des') renderDes();
  }
  $('dcTabs').addEventListener('click', function (ev) {
    var b = ev.target.closest('.ch-tab');
    if (b) { setTab(b.dataset.t); window.scrollTo(0, 0); }
  });
  function showRun(on) {
    $('dcTabs').hidden = on;
    $('dcRun').hidden = !on;
    if (on) { $('dcSim').hidden = $('dcTre').hidden = $('dcDes').hidden = true; } else setTab(tab);
  }

  // ---------- treino (correção na hora) ----------
  var tf = 0, tg = '', ts = 'all';
  function renderTreino() {
    var box = $('dcTre');
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
      '<select aria-label="Tema" class="dc-tema"><option value="">Todos os temas</option>' + GR.map(function (g) {
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
    $('dcDes').innerHTML =
      '<div class="panel"><h3>Por tema do edital</h3><div class="tbl-wrap"><table class="tbl">' + head.replace('{t}', 'Tema') + rowsG + '</table></div></div>' +
      '<div class="panel"><h3>Por formato</h3><div class="tbl-wrap"><table class="tbl">' + head.replace('{t}', 'Formato') + rowsF + '</table></div>' +
      '<p class="q-exp">Acerto baixo em um formato indica um erro de método, não de conteúdo: releia o quadro "Como funciona cada formato" na aba Simulados.</p></div>' +
      '<div class="panel"><h3>Recomeçar</h3><p class="q-exp">Apaga só as respostas de Direito Constitucional (o XP já ganho fica).</p>' +
      '<div class="q-actions"><button type="button" class="small-btn" id="dcReset">Apagar respostas de Constitucional</button></div>' +
      '<div class="confirm" id="dcResetC" hidden><span>Apagar as respostas das 165 questões?</span><button type="button" class="small-btn" id="dcResetY">Sim, apagar</button><button type="button" class="small-btn" id="dcResetN">Cancelar</button></div></div>';
    $('dcReset').addEventListener('click', function () { $('dcResetC').hidden = false; });
    $('dcResetN').addEventListener('click', function () { $('dcResetC').hidden = true; });
    $('dcResetY').addEventListener('click', function () { api.state().dc = {}; api.save(); api.refresh(); updStats(); renderDes(); });
  }

  // ---------- montagem dos simulados ----------
  $('dcFmts').innerHTML = [1, 2, 3, 4, 5].map(function (f) {
    return '<label><input type="checkbox" value="' + f + '" checked> <span>' + f + ' · ' + FMT[f] + '</span></label>';
  }).join('');
  $('dcGrps').innerHTML = GR.map(function (g) {
    var n = QS.filter(function (q) { return q.g === g.id; }).length;
    return '<label><input type="checkbox" value="' + g.id + '" checked> <span>' + g.n + ' (' + n + ')</span></label>';
  }).join('');
  function checked(id) { return Array.prototype.filter.call(document.querySelectorAll('#' + id + ' input'), function (b) { return b.checked; }).map(function (b) { return b.value; }); }
  $('dcAll').addEventListener('click', function () { document.querySelectorAll('#dcGrps input').forEach(function (b) { b.checked = true; }); });
  $('dcNone').addEventListener('click', function () { document.querySelectorAll('#dcGrps input').forEach(function (b) { b.checked = false; }); });

  // 10 questões de cinco alternativas, uma por tema sorteado, equilibrando os formatos
  function prova10() {
    var cnt = { 1: 0, 2: 0, 3: 0, 5: 0 };
    var pool = shuffle(GR.map(function (g) { return g.id; })).slice(0, 10).map(function (g) {
      var c = shuffle(QS.filter(function (q) { return q.g === g && q.f !== 4; }));
      c.sort(function (a, b) { return cnt[a.f] - cnt[b.f]; });
      cnt[c[0].f]++;
      return c[0];
    });
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

  $('dcProva').addEventListener('click', function () {
    start(prova10().map(function (q) { return { k: 'dc', q: q }; }), 'prova');
  });
  $('dcBloco').addEventListener('click', function () {
    var items = prova10().map(function (q) { return { k: 'dc', q: q }; })
      .concat(dh10().map(function (q) { return { k: 'dh', q: q }; }));
    start(items, 'bloco');
  });
  $('dcStart').addEventListener('click', function () {
    var fs = checked('dcFmts').map(Number), gs = checked('dcGrps'), only = $('dcOnly').value, qtd = +$('dcQtd').value;
    var pool = QS.filter(function (q) {
      if (fs.indexOf(q.f) < 0 || gs.indexOf(q.g) < 0) return false;
      var v = ans(q);
      if (only === 'new' && v !== undefined) return false;
      if (only === 'wrong' && (v === undefined || v === q.a)) return false;
      return true;
    });
    var msg = $('dcMsg');
    if (!pool.length) { msg.hidden = false; msg.textContent = 'Nenhuma questão com esses filtros. Marque mais formatos ou temas, ou mude o filtro.'; return; }
    msg.hidden = true;
    start(shuffle(pool).slice(0, qtd).map(function (q) { return { k: 'dc', q: q }; }), 'livre');
  });

  // ---------- execução ----------
  function start(items, kind) {
    run = { items: items, kind: kind, ans: {}, t0: Date.now() };
    showRun(true);
    $('dcResult').hidden = true;
    $('dcRun').querySelector('.sim-sticky').hidden = false;
    $('dcQuit').textContent = 'Cancelar';
    var box = $('dcList');
    box.innerHTML = '';
    items.forEach(function (it, k) {
      var label = 'Questão ' + (k + 1) + ' de ' + items.length + (kind === 'bloco' ? (it.k === 'dc' ? ' · Direito Constitucional' : ' · Direitos Humanos') : '');
      var onPick = function (q, i) { run.ans[q.id] = i; updCount(); };
      box.appendChild(it.k === 'dc' ? card(it.q, { mode: 'exam', label: label, onPick: onPick }) : api.qCard(it.q, { mode: 'exam', label: label, onPick: onPick }));
    });
    updCount();
    clearInterval(timer);
    var tick = function () { if (run) $('dcTime').textContent = fmtTime(Math.floor((Date.now() - run.t0) / 1000)); };
    timer = setInterval(tick, 1000);
    tick();
    window.scrollTo(0, 0);
  }
  function updCount() { $('dcCount').textContent = Object.keys(run.ans).length + '/' + run.items.length + ' respondidas'; }
  function stop() { clearInterval(timer); run = null; showRun(false); }
  $('dcQuit').addEventListener('click', function () {
    if ($('dcQuit').textContent === 'Cancelar') { $('dcQuit').textContent = 'Confirmar cancelamento'; return; }
    stop(); window.scrollTo(0, 0);
  });

  $('dcEnd').addEventListener('click', function () {
    if (!run) return;
    clearInterval(timer);
    var secs = Math.floor((Date.now() - run.t0) / 1000), right = 0, byG = {}, byF = {}, disc = { dc: { t: 0, r: 0 }, dh: { t: 0, r: 0 } };
    run.items.forEach(function (it) {
      var q = it.q, v = run.ans[q.id], ok = v === q.a;
      if (v !== undefined) {
        if (it.k === 'dc') st()[q.id] = v; else api.state().a[q.id] = v;
        api.sys.answer(q, v, true);
      }
      if (ok) right++;
      disc[it.k].t++; if (ok) disc[it.k].r++;
      if (it.k === 'dc') {
        (byG[q.g] = byG[q.g] || { t: 0, r: 0 }).t++; if (ok) byG[q.g].r++;
        (byF[q.f] = byF[q.f] || { t: 0, r: 0 }).t++; if (ok) byF[q.f].r++;
      }
    });
    api.save(); api.refresh(); updStats();
    var total = run.items.length, p = pct(right, total);
    var sysNote = api.sys.simDone({ right: right, total: total });
    document.querySelectorAll('#dcList .q').forEach(function (art, k) {
      var it = run.items[k];
      if (it.k === 'dc') reveal(art, it.q, run.ans[it.q.id], { mode: 'exam' });
      else api.reveal(art, it.q, run.ans[it.q.id], { mode: 'exam' });
    });
    var note = p >= 80 ? 'Nível de aprovação. Revise só os erros.' : p >= 60 ? 'Bom caminho. Treine os temas com menor acerto na tabela abaixo.' : 'Volte ao treino com correção na hora nos temas com menor acerto antes do próximo simulado.';
    var extra = '';
    if (run.kind === 'bloco') {
      var c = disc.dc.r, d = disc.dh.r, okBloco = right >= 6, okDisc = c >= 1 && d >= 1;
      extra = '<p class="score-note dc-corte ' + (okBloco && okDisc ? 'ok' : 'no') + '"><b>' + (okBloco && okDisc ? 'Passaria no corte do Bloco III.' : 'Não passaria no corte do Bloco III.') + '</b> ' +
        'O edital exige ao menos 6 acertos em 20 no bloco e pelo menos 1 acerto em cada disciplina. Você fez ' + c + ' em Constitucional e ' + d + ' em Direitos Humanos' +
        (!okDisc ? ': zerar uma disciplina elimina, mesmo com o bloco acima do mínimo.' : !okBloco ? ': faltaram ' + (6 - right) + ' acerto(s) para o mínimo do bloco.' : '.') +
        ' Lembre que também é preciso fazer 30% da prova toda (18 de 60).</p>';
    } else if (run.kind === 'prova') {
      extra = '<p class="score-note">Na prova, estas 10 questões somam com as 10 de Direitos Humanos no Bloco III, que exige ao menos 6 acertos em 20 e nenhuma disciplina zerada. Para treinar o corte, faça o simulado do Bloco III completo.</p>';
    }
    var row = function (label, s) { return '<tr><td>' + label + '</td><td>' + s.r + '/' + s.t + '</td><td>' + pct(s.r, s.t) + '%</td></tr>'; };
    var tables = '';
    if (run.kind === 'bloco') {
      tables += '<div class="tbl-wrap"><table class="tbl"><tr><th>Disciplina</th><th>Acertos</th><th>%</th></tr>' +
        row('Direito Constitucional', disc.dc) + row('Direitos Humanos e Legislação Extravagante', disc.dh) + row('Bloco III', { t: total, r: right }) + '</table></div>';
    }
    tables += '<div class="tbl-wrap"><table class="tbl"><tr><th>Tema (Constitucional)</th><th>Acertos</th><th>%</th></tr>' +
      Object.keys(byG).sort(function (a, b) { return grpIdx[a] - grpIdx[b]; }).map(function (g) { return row(grpName[g], byG[g]); }).join('') + '</table></div>';
    if (run.kind !== 'bloco') {
      tables += '<div class="tbl-wrap"><table class="tbl"><tr><th>Formato</th><th>Acertos</th><th>%</th></tr>' +
        Object.keys(byF).sort().map(function (f) { return row(f + ' · ' + FMT[f], byF[f]); }).join('') + '</table></div>';
    }
    var res = $('dcResult');
    res.innerHTML = '<div class="panel"><div class="score"><span class="score-big">' + p + '%</span><div><p class="score-note"><b>' + right + ' acertos em ' + total + ' questões</b> · tempo ' + fmtTime(secs) + '</p><p class="score-note">' + note + '</p>' + extra + sysNote + '</div></div>' +
      tables + '<div class="q-actions"><button type="button" class="btn" id="dcNew">Novo simulado</button><a class="btn ghost" href="#erros">Ir ao caderno de erros</a></div>' +
      '<p class="q-exp" style="margin-top:10px">O gabarito comentado de cada questão está logo abaixo.</p></div>';
    res.hidden = false;
    $('dcRun').querySelector('.sim-sticky').hidden = true;
    $('dcNew').addEventListener('click', function () { stop(); window.scrollTo(0, 0); });
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
      h.textContent = 'Direito Constitucional (' + list.length + ')';
      box.appendChild(h);
    }
    list.forEach(function (q) { box.appendChild(card(q, { fresh: true, label: 'Constitucional · Questão ' + q.n })); });
  }
  function reset() { if (run) stop(); updStats(); if (!$('constitucional').hidden) render(); }
  updStats();
  return { render: render, renderErrors: renderErrors, errCount: function () { return wrongList().length; }, reset: reset };
};
