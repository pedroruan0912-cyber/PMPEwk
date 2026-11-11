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
