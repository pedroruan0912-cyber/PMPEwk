import { test } from 'node:test';
import assert from 'node:assert/strict';
import { ATALHOS } from '../src/atalhos.mjs';

const TECLA = /^(Ctrl\+|Shift\+|Alt\+)*(F\d{1,2}|[A-Z0-9]|Enter|Espaço|Home|End|PgUp|PgDn|Esc|Tab|[=;.,*<>\[\]+-])$/;

test('toda ação tem nome, lugar e atalho em ao menos uma suíte', () => {
  for (const [chave, a] of Object.entries(ATALHOS)) {
    assert.ok(a.nome, `${chave} sem nome`);
    assert.ok(['geral', 'texto', 'planilha', 'slides'].includes(a.onde), `${chave} com onde inválido`);
    assert.ok(a.office || a.libre, `${chave} sem atalho`);
  }
});

test('toda tecla está escrita no formato Ctrl+Shift+S', () => {
  for (const [chave, a] of Object.entries(ATALHOS)) {
    for (const t of [a.office, a.libre]) {
      if (t !== null) assert.match(t, TECLA, `${chave}: ${t}`);
    }
  }
});

// As pegadinhas clássicas de prova: o mesmo comando com teclas diferentes nas duas suítes.
const PEGADINHAS = {
  negrito: ['Ctrl+N', 'Ctrl+B'],
  sublinhado: ['Ctrl+S', 'Ctrl+U'],
  salvar: ['Ctrl+B', 'Ctrl+S'],
  novo: ['Ctrl+O', 'Ctrl+N'],
  abrir: ['Ctrl+A', 'Ctrl+O'],
  selecionarTudo: ['Ctrl+T', 'Ctrl+A'],
  localizar: ['Ctrl+L', 'Ctrl+F'],
};

for (const [chave, [office, libre]] of Object.entries(PEGADINHAS)) {
  test(`${chave}: ${office} no Office e ${libre} no LibreOffice`, () => {
    assert.equal(ATALHOS[chave]?.office, office);
    assert.equal(ATALHOS[chave]?.libre, libre);
  });
}

test('a tabela cobre as quatro áreas', () => {
  const areas = new Set(Object.values(ATALHOS).map(a => a.onde));
  assert.deepEqual([...areas].sort(), ['geral', 'planilha', 'slides', 'texto']);
});

// Conferido na documentação: refazer não é igual em todo o Office em português.
test('refazer é Ctrl+R no Word, mas Ctrl+Y no Excel; no LibreOffice é sempre Ctrl+Y', () => {
  assert.deepEqual([ATALHOS.refazer.office, ATALHOS.refazer.libre, ATALHOS.refazer.onde], ['Ctrl+R', 'Ctrl+Y', 'texto']);
  assert.deepEqual([ATALHOS.refazerPlanilha.office, ATALHOS.refazerPlanilha.libre, ATALHOS.refazerPlanilha.onde], ['Ctrl+Y', 'Ctrl+Y', 'planilha']);
});

test('teclas de função que mudam de papel entre as suítes', () => {
  assert.deepEqual([ATALHOS.listaNumerada.office, ATALHOS.listaNumerada.libre], [null, 'F12']);
  assert.deepEqual([ATALHOS.graficoRapido.office, ATALHOS.graficoRapido.libre], ['F11', null]);
  assert.equal(ATALHOS.salvarComo.office, 'F12');
  assert.equal(ATALHOS.estilos.libre, 'F11');
});

test('tela preta e tela branca usam ponto e vírgula nas duas suítes', () => {
  assert.deepEqual([ATALHOS.telaPreta.office, ATALHOS.telaPreta.libre], ['.', '.']);
  assert.deepEqual([ATALHOS.telaBranca.office, ATALHOS.telaBranca.libre], [',', ',']);
});

// Conferido no arquivo de teclas do código-fonte do LibreOffice (Accelerators.xcu, ramos 7.0 a 7.6)
// e na página de atalhos do Word da Microsoft.
test('AutoSoma (Alt+=) é atalho do Excel, mas não do Calc 7', () => {
  assert.deepEqual([ATALHOS.autoSoma.office, ATALHOS.autoSoma.libre], ['Alt+=', null]);
});

test('registrar alterações com Ctrl+Shift+C só existe no LibreOffice 7.0 e 7.1, e a tabela diz isso', () => {
  assert.equal(ATALHOS.alteracoes.libre, 'Ctrl+Shift+C');
  assert.match(ATALHOS.alteracoes.nota ?? '', /7\.0 e 7\.1/);
});

test('o painel Estilos tem atalho no Word: Ctrl+Alt+Shift+S', () => {
  assert.equal(ATALHOS.estilos.office, 'Ctrl+Alt+Shift+S');
});

test('nota, quando existe, é um texto curto', () => {
  for (const [chave, a] of Object.entries(ATALHOS)) {
    if (a.nota !== undefined) assert.ok(typeof a.nota === 'string' && a.nota.length > 0 && a.nota.length <= 60, chave);
  }
});
