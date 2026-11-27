// Confere os roteiros de verdade (src/aulas/): o que vale para toda aula, qualquer que seja o assunto.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { carregarAulas } from '../build.mjs';
import { validarAula } from '../src/roteiro.mjs';
import { ATALHOS } from '../src/atalhos.mjs';

const aulas = await carregarAulas().catch(() => []);

// Todo texto que aparece na tela ou é falado numa cena.
function textosDaCena(cena) {
  const achados = [cena.fala, cena.voz];
  const varrer = (v) => {
    if (typeof v === 'string') achados.push(v);
    else if (Array.isArray(v)) v.forEach(varrer);
    else if (v && typeof v === 'object') Object.values(v).forEach(varrer);
  };
  varrer(cena.tela);
  return achados.filter(Boolean);
}

const TECLAS_DA_TABELA = new Set(Object.values(ATALHOS).flatMap((a) => [a.office, a.libre]).filter(Boolean));
const COMBINACAO = /(?<![A-Za-zÀ-ú0-9])(?:Ctrl|Shift|Alt)(?:\+(?:Ctrl|Shift|Alt))*\+(?:F\d{1,2}|Enter|Espaço|Home|End|PgUp|PgDn|Esc|Tab|[A-Z0-9](?![A-Za-zÀ-ú0-9])|[=;*<>\[\]+-])/g;
// Dentro de uma fórmula, F10 é uma célula (D2:F10), não a tecla: por isso os vizinhos ":", ";" e "(" ficam de fora.
const TECLA_DE_FUNCAO = /(?<![A-Za-zÀ-ú0-9+$:;(])F(?:[1-9]|1[0-2])(?![A-Za-zÀ-ú0-9:;)])/g;

test('existe ao menos uma aula em src/aulas/', () => {
  assert.ok(aulas.length >= 1);
});

for (const aula of aulas) {
  const nome = `aula ${aula.n}`;

  test(`${nome}: o roteiro passa na validação`, () => {
    assert.deepEqual(validarAula(aula, ATALHOS), []);
  });

  test(`${nome}: começa com a capa`, () => {
    assert.equal(aula.cenas[0].tela.tipo, 'capa');
  });

  test(`${nome}: tem de 2 a 3 perguntas, cada uma mostrada sem e depois com a resposta`, () => {
    const q = aula.cenas.map((c, i) => ({ ...c.tela, i })).filter((t) => t.tipo === 'questao');
    assert.equal(q.length % 2, 0, 'cada pergunta precisa de duas cenas');
    assert.ok(q.length / 2 >= 2 && q.length / 2 <= 3, `${q.length / 2} perguntas`);
    for (let k = 0; k < q.length; k += 2) {
      const [sem, com] = [q[k], q[k + 1]];
      assert.equal(com.i, sem.i + 1, 'a resposta vem logo depois da pergunta');
      assert.equal(sem.gabarito, false);
      assert.equal(com.gabarito, true);
      assert.equal(com.enunciado, sem.enunciado);
      assert.deepEqual(com.alternativas, sem.alternativas);
      assert.equal(com.correta, sem.correta);
      assert.ok(com.comentario, 'a resposta precisa de comentário');
    }
  });

  test(`${nome}: a fala da resposta diz a mesma letra que a tela marca`, () => {
    for (const cena of aula.cenas) {
      if (cena.tela.tipo !== 'questao' || !cena.tela.gabarito) continue;
      const letra = 'ABCDE'[cena.tela.correta];
      assert.match(cena.fala, new RegExp(`letra ${letra}\\b`), cena.fala);
    }
  });

  test(`${nome}: nenhum texto fala em edital nem atribui questão a uma prova`, () => {
    for (const cena of aula.cenas) {
      for (const t of textosDaCena(cena)) assert.doesNotMatch(t, /edital|\bAOCP\b|\bPMPE\b/i, t);
    }
  });

  test(`${nome}: todo atalho citado em fala ou tela existe na tabela de atalhos`, () => {
    aula.cenas.forEach((cena, i) => {
      for (const t of textosDaCena(cena)) {
        for (const combo of t.match(COMBINACAO) ?? []) assert.ok(TECLAS_DA_TABELA.has(combo), `cena ${i + 1}: ${combo} não está na tabela ("${t}")`);
        if (cena.tela.tipo === 'planilha') continue; // em planilha, F5 pode ser uma célula
        for (const f of t.match(TECLA_DE_FUNCAO) ?? []) assert.ok(TECLAS_DA_TABELA.has(f), `cena ${i + 1}: ${f} não está na tabela ("${t}")`);
      }
    });
  });

  test(`${nome}: numa tela de teclas, a fala só cita teclas das ações mostradas`, () => {
    aula.cenas.forEach((cena, i) => {
      if (cena.tela.tipo !== 'teclas') return;
      const mostradas = new Set(cena.tela.acoes.flatMap((a) => [ATALHOS[a].office, ATALHOS[a].libre]).filter(Boolean));
      for (const combo of [...(cena.fala.match(COMBINACAO) ?? []), ...(cena.fala.match(TECLA_DE_FUNCAO) ?? [])]) {
        assert.ok(mostradas.has(combo), `cena ${i + 1}: a fala cita ${combo}, que não está na tela`);
      }
    });
  });
}

// ---------- as contas mostradas nas planilhas estão certas? ----------
// Recalcula, de forma independente do roteiro, o resultado das fórmulas que este pequeno avaliador entende.
const numero = (v) => {
  if (typeof v === 'number') return v;
  if (typeof v !== 'string') return NaN;
  const t = v.trim();
  if (!/^-?\d+(\.\d{3})*(,\d+)?%?$/.test(t)) return NaN;
  const n = Number(t.replace('%', '').replace(/\./g, '').replace(',', '.'));
  return t.endsWith('%') ? n / 100 : n;
};
const celulasDo = (trecho) => {
  const [a, b = a] = trecho.replace(/\$/g, '').split(':');
  const cols = 'ABCDEF', lista = [];
  for (let c = cols.indexOf(a[0]); c <= cols.indexOf(b[0]); c++) for (let l = Number(a.slice(1)); l <= Number(b.slice(1)); l++) lista.push(cols[c] + l);
  return lista;
};
const criterio = (texto) => {
  const m = /^(>=|<=|<>|>|<|=)?(.+)$/.exec(texto.replace(/"/g, ''));
  const alvo = numero(m[2]);
  return { '>=': (v) => v >= alvo, '<=': (v) => v <= alvo, '<>': (v) => v !== alvo, '>': (v) => v > alvo, '<': (v) => v < alvo, '=': (v) => v === alvo, undefined: (v) => v === alvo }[m[1]];
};
function recalcular(formula, celulas) {
  const corpo = formula.slice(1);
  if (/^[\d+\-*/^() ,]+$/.test(corpo)) return Function(`"use strict"; return (${corpo.replace(/,/g, '.').replace(/\^/g, '**')});`)();
  const conta = /^(\$?[A-F]\$?\d)([+\-*/])(\$?[A-F]\$?\d)$/.exec(corpo);
  const valor = (ref) => numero(celulas[ref.replace(/\$/g, '')]);
  if (conta) {
    const [a, b] = [valor(conta[1]), valor(conta[3])];
    return { '+': a + b, '-': a - b, '*': a * b, '/': a / b }[conta[2]];
  }
  const f = /^([A-ZÀ-Ú.]+)\((.*)\)$/.exec(corpo);
  if (!f) return undefined;
  const args = f[2].split(';');
  const ehFaixa = (a) => /^\$?[A-F]\$?\d(:\$?[A-F]\$?\d)?$/.test(a);
  const brutos = (a) => celulasDo(a).map((r) => celulas[r]).filter((v) => v !== undefined && v !== '');
  const nums = (lista) => lista.flatMap((a) => (ehFaixa(a) ? brutos(a).map(numero) : [numero(a)])).filter((n) => !Number.isNaN(n));
  const ordenados = (lista) => nums(lista).sort((x, y) => x - y);
  switch (f[1]) {
    case 'SOMA': return nums(args).reduce((s, n) => s + n, 0);
    case 'MÉDIA': return nums(args).reduce((s, n) => s + n, 0) / nums(args).length;
    case 'MÁXIMO': return Math.max(...nums(args));
    case 'MÍNIMO': return Math.min(...nums(args));
    case 'CONT.NÚM': return nums(args).length;
    case 'CONT.VALORES': return args.flatMap(brutos).length;
    case 'MED': { const o = ordenados(args); return o.length % 2 ? o[(o.length - 1) / 2] : (o[o.length / 2 - 1] + o[o.length / 2]) / 2; }
    case 'MODO': { const o = nums(args); return o.sort((x, y) => o.filter((v) => v === y).length - o.filter((v) => v === x).length)[0]; }
    case 'MAIOR': return ordenados([args[0]]).reverse()[Number(args[1]) - 1];
    case 'MENOR': return ordenados([args[0]])[Number(args[1]) - 1];
    case 'CONT.SE': return nums([args[0]]).filter(criterio(args[1])).length;
    case 'SOMASE': return nums([args[0]]).filter(criterio(args[1])).reduce((s, n) => s + n, 0);
    case 'MOD': return numero(args[0]) % numero(args[1]);
    default: return undefined;
  }
}

test('o avaliador de conferência acerta contas feitas à mão', () => {
  const c = { A1: 2, A2: 4, A3: 6, A4: 8, B1: 'texto', B2: '2,50', B3: '10%' };
  assert.equal(recalcular('=SOMA(A1:A4)', c), 20);
  assert.equal(recalcular('=SOMA(A1;A4)', c), 10);
  assert.equal(recalcular('=MÉDIA(A1:A4)', c), 5);
  assert.equal(recalcular('=CONT.NÚM(A1:B3)', c), 5);
  assert.equal(recalcular('=CONT.VALORES(A1:B3)', c), 6);
  assert.equal(recalcular('=CONT.SE(A1:A4;">=4")', c), 3);
  assert.equal(recalcular('=SOMASE(A1:A4;">4")', c), 14);
  assert.equal(recalcular('=MAIOR(A1:A4;2)', c), 6);
  assert.equal(recalcular('=MED(A1:A4)', c), 5);
  assert.equal(recalcular('=10+2*3^2', c), 28);
  assert.equal(recalcular('=A2*$B$3', c), 0.4);
  assert.equal(recalcular('=PROCV(1;A1:B3;2;FALSO)', c), undefined);
});

for (const aula of aulas) {
  test(`aula ${aula.n}: os resultados mostrados nas planilhas conferem com a conta refeita`, () => {
    aula.cenas.forEach((cena, i) => {
      const t = cena.tela;
      if (t.tipo !== 'planilha' || !t.formula || t.resultado === undefined) return;
      const esperado = recalcular(t.formula, t.celulas);
      if (esperado === undefined) return; // fórmula que o avaliador não cobre
      assert.ok(Math.abs(esperado - numero(String(t.resultado))) < 1e-9, `cena ${i + 1}: ${t.formula} dá ${esperado}, mas a tela mostra ${t.resultado}`);
    });
  });
}

test('aula 6: pelo menos 12 fórmulas de função têm o resultado refeito pelo avaliador', () => {
  const aula = aulas.find((a) => a.n === 6);
  if (!aula) return; // a aula ainda não foi escrita
  const conferidas = aula.cenas.filter((c) => c.tela.tipo === 'planilha' && c.tela.formula && c.tela.resultado !== undefined && recalcular(c.tela.formula, c.tela.celulas) !== undefined);
  assert.ok(conferidas.length >= 12, `${conferidas.length} conferidas`);
});

test('aula 9: toda ação da tabela de atalhos aparece em alguma tela de teclas', () => {
  const aula = aulas.find((a) => a.n === 9);
  assert.ok(aula, 'a aula 9 precisa existir');
  const mostradas = new Set(aula.cenas.filter((c) => c.tela.tipo === 'teclas').flatMap((c) => c.tela.acoes));
  const faltam = Object.keys(ATALHOS).filter((k) => !mostradas.has(k));
  assert.deepEqual(faltam, []);
});

// ---------- fatos corrigidos depois da revisão final ----------
// Conferidos nos menus do código-fonte do LibreOffice 7 (menubar.xml) e na ajuda da Microsoft em português.
const janelas = (app) => aulas.flatMap((a) => a.cenas.map((c, i) => ({ n: a.n, i: i + 1, t: c.tela }))).filter((x) => x.t.tipo === 'janela' && x.t.app === app);
const itensDe = (t) => t.itens.flatMap((i) => (typeof i === 'string' ? [i] : i.itens));

test('Impress: Animação fica em Exibir e Interação fica em Formatar, não no menu Apresentação de slides', () => {
  for (const { n, i, t } of janelas('impress')) {
    if (t.aba !== 'Apresentação de slides') continue;
    for (const item of itensDe(t)) assert.ok(!/^Animação|^Interação/.test(item), `aula ${n}, cena ${i}: ${item}`);
  }
});

test('Calc: Proteger planilha fica em Ferramentas, não no menu Planilha', () => {
  for (const { n, i, t } of janelas('calc')) {
    if (t.aba === 'Planilha') assert.ok(!itensDe(t).includes('Proteger planilha...'), `aula ${n}, cena ${i}`);
  }
});

test('nenhum texto ensina frases já desmentidas', () => {
  const proibidas = [/Duplicadas/, /só têm função no Writer/, /Apresentação de slides, Interação/, /menu Apresentação de slides: iniciar, cronometrar, interação/i];
  for (const aula of aulas) aula.cenas.forEach((cena, i) => {
    for (const t of textosDaCena(cena)) for (const p of proibidas) assert.doesNotMatch(t, p, `aula ${aula.n}, cena ${i + 1}`);
  });
});

test('no Calc, o PDF é Arquivo > Exportar como PDF, sem o submenu Exportar como', () => {
  const aula = aulas.find((a) => a.n === 5);
  aula.cenas.forEach((cena, i) => {
    for (const t of textosDaCena(cena)) assert.doesNotMatch(t, /Exportar como >|Exportar como, Exportar como PDF/, `cena ${i + 1}: ${t}`);
  });
});

test('tela de teclas com "Iguais" no título só mostra atalhos iguais nas duas suítes', () => {
  for (const aula of aulas) aula.cenas.forEach((cena, i) => {
    const t = cena.tela;
    if (t.tipo !== 'teclas' || !/Iguais/.test(t.titulo ?? '')) return;
    for (const a of t.acoes) assert.equal(ATALHOS[a].office, ATALHOS[a].libre, `aula ${aula.n}, cena ${i + 1}: ${a}`);
  });
});
