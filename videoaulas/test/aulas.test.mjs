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
const TECLA_DE_FUNCAO = /(?<![A-Za-zÀ-ú0-9+$])F(?:[1-9]|1[0-2])(?![A-Za-zÀ-ú0-9])/g;

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
