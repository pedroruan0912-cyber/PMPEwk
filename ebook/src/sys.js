// Sistema: camada de jogo sobre o estudo (XP, nível, rank, missão diária, masmorras, tropa, títulos).
// Fica em state.g, no mesmo armazenamento das respostas. O app chama os ganchos devolvidos por initSistema.
window.initSistema = function (api) {
  'use strict';
  var $ = api.$, QS = api.QS, chapters = api.chapters, pad = api.pad;
  var GOAL = { q: 10, vf: 5, fc: 5 };
  var XP = { right: 10, wrong: 2, soldier: 5, vfRight: 3, vfWrong: 1, flash: 1, daily: 50, boss: 50, simPass: 20, simEach: 2 };
  var RANKS = [[25, 'S'], [20, 'A'], [15, 'B'], [10, 'C'], [5, 'D'], [1, 'E']];
  var ATTRS = [
    { n: 'Fundamentos', d: 'Teoria geral e gerações', caps: [1, 2] },
    { n: 'Tratados', d: 'Incorporação, DUDH e Pacto de San José', caps: [3, 4, 5] },
    { n: 'Penal especial', d: 'Abuso, tortura, racismo, ambientais, hediondos e drogas', caps: [7, 8, 10, 11, 12, 13] },
    { n: 'Estatutos', d: 'ECA, Maria da Penha, PMPE, idoso e juventude', caps: [6, 9, 14, 15, 16] },
    { n: 'Jurisprudência', d: 'Súmulas e tribunais superiores', caps: [17] }
  ];
  var quiet = false;

  function dayKey(off) {
    var d = new Date(); d.setDate(d.getDate() + (off || 0));
    return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate());
  }
  function blank() { return { xp: 0, q: {}, v: {}, c: {}, tt: {}, ti: '', s: 0, best: 0, last: '', lost: 0, pen: false, d: null }; }

  // estado do jogo; na primeira vez, converte em XP o que já estava respondido
  function G() {
    var s = api.state();
    if (!s.g) {
      s.g = blank();
      quiet = true;
      QS.forEach(function (q) {
        var v = s.a[q.id];
        if (v === undefined) return;
        if (v === q.a) { s.g.q[q.id] = 2; s.g.xp += XP.right; } else { s.g.q[q.id] = 1; s.g.xp += XP.wrong; }
      });
      (window.VF || []).forEach(function (v, i, all) {
        var n = all.slice(0, i).filter(function (o) { return o.c === v.c; }).length, k = v.c + '-' + n;
        var ans = (s.vf || {})[k];
        if (ans === undefined) return;
        s.g.v[k] = 1; s.g.xp += ans === v.v ? XP.vfRight : XP.vfWrong;
      });
      roll(s.g); checkTitles(s.g);
      quiet = false;
    }
    roll(s.g);
    return s.g;
  }
  // virada do dia: zera a missão diária e, se ontem ficou sem missão, quebra a sequência
  function roll(g) {
    var today = dayKey(0);
    if (g.d && g.d.k === today) return;
    if (g.s > 0 && g.last !== today && g.last !== dayKey(-1)) { g.lost = g.s; g.s = 0; g.pen = true; }
    g.d = { k: today, q: 0, vf: 0, fc: {}, done: false };
  }

  function need(n) { return 40 + 20 * n; }
  function levelOf(xp) {
    var n = 1;
    while (xp >= need(n)) { xp -= need(n); n++; }
    return { n: n, into: xp, need: need(n) };
  }
  function rankOf(n) { for (var i = 0; i < RANKS.length; i++) if (n >= RANKS[i][0]) return RANKS[i][1]; return 'E'; }
  function soldiers(g) { var n = 0; for (var k in g.q) if (g.q[k] & 4) n++; return n; }
  function cleared(g) { return Object.keys(g.c).length; }
  function fcToday(g) { return Object.keys(g.d.fc).length; }

  function titles(g) {
    var lv = levelOf(g.xp).n, sol = soldiers(g), hits = 0, k;
    for (k in g.q) if (g.q[k] & 2) hits++;
    var list = [
      { id: 'first', n: 'Primeiro Acerto', d: 'Acerte a primeira questão', has: hits >= 1 },
      { id: 'h100', n: 'Cem Acertos', d: 'Acerte 100 questões diferentes', has: hits >= 100 },
      { id: 'h400', n: 'Meio Banco', d: 'Acerte 400 questões diferentes', has: hits >= 400 },
      { id: 's3', n: 'Constante', d: 'Sequência de 3 dias', has: g.best >= 3 },
      { id: 's7', n: 'Disciplinado', d: 'Sequência de 7 dias', has: g.best >= 7 },
      { id: 's30', n: 'Incansável', d: 'Sequência de 30 dias', has: g.best >= 30 },
      { id: 't10', n: 'Caçador de Erros', d: 'Tropa com 10 soldados', has: sol >= 10 },
      { id: 't50', n: 'Comandante', d: 'Tropa com 50 soldados', has: sol >= 50 },
      { id: 'rc', n: 'Rank C', d: 'Chegue ao nível 10', has: lv >= 10 },
      { id: 'ra', n: 'Rank A', d: 'Chegue ao nível 20', has: lv >= 20 },
      { id: 'rs', n: 'Rank S', d: 'Chegue ao nível 25', has: lv >= 25 },
      { id: 'all', n: 'Limpa-Masmorras', d: 'Limpe as 17 masmorras', has: cleared(g) >= chapters.length }
    ];
    chapters.forEach(function (c) {
      list.push({ id: 'c' + c.num, n: 'Domínio: ' + c.short, d: 'Vença o chefe do capítulo ' + c.num, has: !!g.c[c.id] });
    });
    return list;
  }
  function checkTitles(g) {
    titles(g).forEach(function (t) {
      if (!t.has || g.tt[t.id]) return;
      g.tt[t.id] = 1;
      g.ti = t.id;
      toast('Título conquistado', t.n, 'big');
    });
  }

  // ---------- avisos ----------
  var toasts = $('sysToasts');
  function toast(label, text, kind) {
    if (quiet || !toasts) return;
    var el = document.createElement('div');
    el.className = 'sys-toast' + (kind ? ' ' + kind : '');
    el.innerHTML = '<span class="sys-lbl"></span><b></b>';
    el.firstChild.textContent = label;
    el.lastChild.textContent = text;
    toasts.appendChild(el);
    while (toasts.children.length > 4) toasts.removeChild(toasts.firstChild);
    setTimeout(function () { if (el.parentNode) el.parentNode.removeChild(el); }, kind === 'big' ? 4200 : 1900);
  }

  function addXP(g, n, why) {
    if (!n) return;
    var before = levelOf(g.xp).n;
    g.xp += n;
    var after = levelOf(g.xp).n;
    if (why) toast(why, '+' + n + ' XP');
    if (after > before) {
      toast('Subiu de nível', 'Nível ' + after, 'big');
      if (rankOf(after) !== rankOf(before)) toast('Novo rank', 'Rank ' + rankOf(after), 'big');
    }
  }
  function checkDaily(g) {
    var d = g.d;
    if (d.done || d.q < GOAL.q || d.vf < GOAL.vf || fcToday(g) < GOAL.fc) return;
    d.done = true;
    if (g.last !== d.k) { g.s++; g.last = d.k; if (g.s > g.best) g.best = g.s; }
    toast('Missão diária concluída', 'Sequência: ' + g.s + (g.s === 1 ? ' dia' : ' dias'), 'big');
    addXP(g, XP.daily, 'Recompensa da missão');
  }
  function done(g) { checkDaily(g); checkTitles(g); api.save(); hud(g); if (!$('sistema').hidden) render(); }

  // ---------- ganchos chamados pelo app ----------
  function answer(q, chosen, silent) {
    if (chosen === undefined || chosen === null) return;
    var g = G(), m = g.q[q.id] || 0, gain = 0, why = '';
    if (chosen === q.a) {
      if (!(m & 2)) {
        m |= 2; gain = XP.right; why = 'Acerto';
        if (m & 1) { m |= 4; gain += XP.soldier; why = 'Erro vencido: novo soldado na tropa'; }
      }
    } else if (!(m & 1)) { m |= 1; gain = XP.wrong; why = 'Tentativa'; }
    g.q[q.id] = m;
    g.d.q++;
    addXP(g, gain, silent ? '' : why);
    if (!silent) done(g);
  }
  function vf(key, ok) {
    var g = G(), gain = 0;
    if (!g.v[key]) { g.v[key] = 1; gain = ok ? XP.vfRight : XP.vfWrong; }
    g.d.vf++;
    addXP(g, gain, ok ? 'Item certo' : 'Tentativa');
    done(g);
  }
  function flash(i) {
    var g = G();
    if (i < 0 || g.d.fc[i]) return;
    g.d.fc[i] = 1;
    addXP(g, XP.flash, 'Flashcard revisado');
    done(g);
  }
  // fim de simulado: devolve o trecho de HTML que entra no painel de resultado
  function simDone(r) {
    var g = G(), pct = r.total ? r.right / r.total * 100 : 0, pass = pct >= 70, html = '';
    var bonus = r.right * XP.simEach + (pass ? XP.simPass : 0);
    if (r.boss) {
      var c = api.capById[r.boss];
      if (pass && !g.c[r.boss]) {
        g.c[r.boss] = 1; bonus += XP.boss;
        html = '<b>Masmorra limpa.</b> Você venceu o chefe de "' + c.short + '" e ganhou o título "Domínio: ' + c.short + '".';
      } else if (pass) html = '<b>Chefe vencido de novo.</b> A masmorra "' + c.short + '" continua limpa.';
      else html = '<b>O chefe resistiu.</b> São precisos 7 acertos em 10 para limpar "' + c.short + '". Revise a teoria e tente outra vez.';
    } else if (r.pen) {
      if (r.right >= 3 && g.pen) {
        g.s += g.lost; if (g.s > g.best) g.best = g.s;
        if (g.last !== dayKey(0)) g.last = dayKey(-1);
        html = '<b>Penalidade cumprida.</b> Sequência recuperada: ' + g.s + (g.s === 1 ? ' dia.' : ' dias.');
        g.lost = 0; g.pen = false;
      } else html = '<b>Penalidade não cumprida.</b> São precisos 3 acertos em 5. Você pode tentar de novo pelo Sistema.';
    }
    addXP(g, bonus, 'Simulado entregue');
    done(g);
    return '<p class="score-note sys-note">' + (html ? html + ' ' : '') + 'Bônus do Sistema: +' + bonus + ' XP.</p>';
  }
  function reset() { api.state().g = blank(); var g = G(); api.save(); hud(g); if (!$('sistema').hidden) render(); }

  // ---------- painel do topo ----------
  function hud(g) {
    var lv = levelOf(g.xp);
    $('hudRank').textContent = rankOf(lv.n);
    $('hudLv').textContent = lv.n;
    $('hudFill').style.width = (lv.into / lv.need * 100) + '%';
    $('hud').setAttribute('aria-label', 'Sistema: rank ' + rankOf(lv.n) + ', nível ' + lv.n + ', ' + lv.into + ' de ' + lv.need + ' XP');
    var np = document.querySelector('[data-p="sistema"]');
    if (np) np.textContent = 'Nv ' + lv.n;
  }

  // ---------- tela do Sistema ----------
  function meter(val, max) { return '<span class="bar"><i style="width:' + Math.min(100, max ? val / max * 100 : 0) + '%"></i></span>'; }
  function render() {
    var g = G(), s = api.state(), lv = levelOf(g.xp), rank = rankOf(lv.n), sol = soldiers(g);
    var all = titles(g), active = all.filter(function (t) { return t.id === g.ti && t.has; })[0];
    var d = g.d, fc = fcToday(g);
    var h = '<div class="sys-win"><div class="sys-rank" aria-hidden="true">' + rank + '</div><div class="sys-id">' +
      '<span class="sys-lbl">Status do jogador</span>' +
      '<p class="sys-level">Nível ' + lv.n + ' <span>· Rank ' + rank + '</span></p>' +
      '<p class="sys-title">' + (active ? active.n : 'Sem título') + '</p>' +
      '<div class="sys-xp">' + meter(lv.into, lv.need) + '<span>' + lv.into + '/' + lv.need + ' XP</span></div></div>' +
      '<dl class="sys-facts"><div><dt>Sequência</dt><dd>' + g.s + (g.s === 1 ? ' dia' : ' dias') + '</dd></div>' +
      '<div><dt>Tropa</dt><dd>' + sol + '</dd></div>' +
      '<div><dt>Masmorras</dt><dd>' + cleared(g) + '/' + chapters.length + '</dd></div>' +
      '<div><dt>XP total</dt><dd>' + g.xp + '</dd></div></dl></div>';

    if (g.pen) {
      h += '<div class="panel sys-pen"><span class="sys-lbl">Missão de penalidade</span>' +
        '<p>Você deixou de concluir a missão diária e perdeu a sequência de ' + g.lost + (g.lost === 1 ? ' dia' : ' dias') +
        '. Para recuperá-la, acerte 3 de 5 questões do seu caderno de erros em até 5 minutos. É opcional: o ganho de XP continua normal.</p>' +
        '<div class="q-actions"><button type="button" class="btn" id="sysPen">Cumprir a penalidade</button>' +
        '<button type="button" class="small-btn" id="sysPenSkip">Dispensar e recomeçar a sequência</button></div></div>';
    }

    var rows = [['Questões respondidas', d.q, GOAL.q], ['Itens de verdadeiro ou falso', d.vf, GOAL.vf], ['Flashcards revisados', fc, GOAL.fc]];
    h += '<div class="panel"><h3>Missão diária</h3><ul class="sys-goals">' + rows.map(function (r) {
      var ok = r[1] >= r[2];
      return '<li class="' + (ok ? 'ok' : '') + '"><span>' + r[0] + '</span>' + meter(r[1], r[2]) + '<b>' + Math.min(r[1], r[2]) + '/' + r[2] + '</b></li>';
    }).join('') + '</ul><p class="sys-hint">' + (d.done
      ? 'Concluída hoje. Recompensa recebida: +' + XP.daily + ' XP. Volte amanhã para manter a sequência.'
      : 'Recompensa: +' + XP.daily + ' XP e um dia a mais na sequência. A missão zera à meia-noite.') + '</p></div>';

    h += '<div class="panel"><h3>Atributos</h3><ul class="sys-attrs">' + ATTRS.map(function (a) {
      var tot = 0, ans = 0, right = 0;
      QS.forEach(function (q) {
        if (a.caps.indexOf(api.capById[q.c].num) < 0) return;
        tot++;
        var v = s.a[q.id];
        if (v !== undefined) { ans++; if (v === q.a) right++; }
      });
      return '<li><span class="a-n">' + a.n + '<small>' + a.d + '</small></span>' + meter(right, tot) +
        '<b>' + Math.round(tot ? right / tot * 100 : 0) + '</b><small class="a-s">' + (ans ? Math.round(right / ans * 100) + '% de acerto em ' + ans : 'sem respostas') + '</small></li>';
    }).join('') + '</ul><p class="sys-hint">Cada atributo vai de 0 a 100: é a parte das questões do bloco que você já acertou.</p></div>';

    h += '<div class="panel"><h3>Masmorras</h3><p class="sys-hint">Cada capítulo é uma masmorra. O chefe é um mini-simulado de 10 questões do capítulo: com 7 acertos, ela fica limpa.</p><div class="sys-dungeons">' +
      chapters.map(function (c) {
        var st = api.stats(api.qsOf(c.id)), ok = !!g.c[c.id];
        return '<div class="sys-dg' + (ok ? ' ok' : '') + '"><span class="n">' + pad(c.num) + '</span><span class="t">' + c.short +
          '<small>' + (ok ? 'Limpa · ' : '') + st.right + '/' + st.total + ' acertos</small></span>' +
          '<button type="button" class="small-btn" data-boss="' + c.id + '">' + (ok ? 'Revanche' : 'Enfrentar o chefe') + '</button></div>';
      }).join('') + '</div></div>';

    var got = all.filter(function (t) { return t.has; }).length;
    h += '<div class="panel"><h3>Títulos (' + got + '/' + all.length + ')</h3><p class="sys-hint">Toque em um título conquistado para usá-lo.</p><ul class="sys-titles">' +
      all.map(function (t) {
        return '<li><button type="button" data-ti="' + t.id + '"' + (t.has ? '' : ' disabled') + ' aria-pressed="' + (t.has && t.id === g.ti) + '">' +
          '<b>' + t.n + '</b><small>' + t.d + '</small></button></li>';
      }).join('') + '</ul></div>';

    h += '<div class="panel"><h3>Tropa (' + sol + ')</h3><p class="sys-hint">Cada questão que você errou e depois acertou vira um soldado. ' +
      (sol ? '' : 'Refaça as questões do <a href="#erros">caderno de erros</a> para recrutar os primeiros.') + '</p>';
    if (sol) {
      h += '<ul class="sys-troop">' + chapters.map(function (c) {
        var n = api.qsOf(c.id).filter(function (q) { return g.q[q.id] & 4; }).length;
        return n ? '<li><span>' + pad(c.num) + ' · ' + c.short + '</span><b>' + n + '</b></li>' : '';
      }).join('') + '</ul>';
    }
    h += '</div>';

    var body = $('sysBody');
    body.innerHTML = h;
    body.querySelectorAll('[data-boss]').forEach(function (b) {
      b.addEventListener('click', function () { api.startBoss(b.dataset.boss); });
    });
    body.querySelectorAll('[data-ti]').forEach(function (b) {
      b.addEventListener('click', function () { g.ti = b.dataset.ti; api.save(); render(); });
    });
    var pen = $('sysPen');
    if (pen) pen.addEventListener('click', api.startPen);
    var skip = $('sysPenSkip');
    if (skip) skip.addEventListener('click', function () { g.pen = false; g.lost = 0; api.save(); render(); });
  }

  var g0 = G();
  api.save();
  hud(g0);
  return { answer: answer, vf: vf, flash: flash, simDone: simDone, reset: reset, render: render };
};
