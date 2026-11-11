import { test } from 'node:test';
import assert from 'node:assert/strict';
import { validarAula, TIPOS, LIMITE_FALA } from '../src/roteiro.mjs';

const ATALHOS = { negrito: { nome: 'Negrito', office: 'Ctrl+N', libre: 'Ctrl+B', onde: 'geral' } };
const capa = { fala: 'Bem-vindo.', tela: { tipo: 'capa', titulo: 'Aula', subtitulo: 'Sub' } };
const aulaCom = (...cenas) => ({ n: 3, slug: 'x', titulo: 'T', cenas });
const erros = (...cenas) => validarAula(aulaCom(...cenas), ATALHOS);
const temErro = (lista, ...trechos) =>
  assert.ok(lista.some(e => trechos.every(t => e.includes(t))), `esperava erro com ${trechos.join(' + ')} em ${JSON.stringify(lista)}`);

test('aula mínima com uma capa é válida', () => {
  assert.deepEqual(erros(capa), []);
});

test('há nove tipos de tela e o limite de fala é 300', () => {
  assert.deepEqual(TIPOS, ['capa', 'secao', 'janela', 'planilha', 'teclas', 'compara', 'lista', 'pegadinha', 'questao']);
  assert.equal(LIMITE_FALA, 300);
});

test('cena sem fala é apontada com aula e número da cena', () => {
  const e = erros(capa, { tela: capa.tela });
  temErro(e, 'aula 3, cena 2', 'fala');
});

test('fala de 300 caracteres passa e de 301 não', () => {
  assert.deepEqual(erros({ ...capa, fala: 'a'.repeat(300) }), []);
  temErro(erros({ ...capa, fala: 'a'.repeat(301) }), 'cena 1', '300');
});

test('tipo de tela desconhecido é erro', () => {
  temErro(erros({ fala: 'x', tela: { tipo: 'video' } }), 'tipo', 'video');
});

test('cena sem tela é erro', () => {
  temErro(erros({ fala: 'x' }), 'cena 1', 'tela');
});

test('teclas com ação que não está na tabela é erro', () => {
  assert.deepEqual(erros({ fala: 'x', tela: { tipo: 'teclas', acoes: ['negrito'] } }), []);
  temErro(erros({ fala: 'x', tela: { tipo: 'teclas', acoes: ['negrito', 'inexistente'] } }), 'inexistente');
  temErro(erros({ fala: 'x', tela: { tipo: 'teclas', acoes: [] } }), 'acoes');
});

test('janela exige app conhecido, aba e itens, e o destaque precisa estar nos itens', () => {
  const j = (extra) => ({ fala: 'x', tela: { tipo: 'janela', app: 'word', aba: 'Página Inicial', itens: ['Negrito', 'Itálico'], ...extra } });
  assert.deepEqual(erros(j({})), []);
  assert.deepEqual(erros(j({ destaque: 'Negrito', balao: 'Deixa o texto mais forte.' })), []);
  temErro(erros(j({ destaque: 'Sublinhado' })), 'Sublinhado');
  temErro(erros(j({ app: 'outlook' })), 'outlook');
  temErro(erros(j({ aba: undefined })), 'aba');
  temErro(erros(j({ itens: [] })), 'itens');
});

test('janela aceita itens em grupos e acha o destaque dentro do grupo', () => {
  const tela = { tipo: 'janela', app: 'word', aba: 'Página Inicial', itens: [{ grupo: 'Fonte', itens: ['Negrito'] }, { grupo: 'Parágrafo', itens: ['Centralizar'] }] };
  assert.deepEqual(erros({ fala: 'x', tela: { ...tela, destaque: 'Centralizar' } }), []);
  temErro(erros({ fala: 'x', tela: { ...tela, destaque: 'Fonte' } }), 'Fonte');
});

test('questao exige cinco alternativas, correta de 0 a 4 e gabarito booleano', () => {
  const q = (extra) => ({ fala: 'x', tela: { tipo: 'questao', enunciado: 'E?', alternativas: ['a', 'b', 'c', 'd', 'e'], correta: 2, gabarito: false, ...extra } });
  assert.deepEqual(erros(q({})), []);
  temErro(erros(q({ alternativas: ['a', 'b', 'c', 'd'] })), 'alternativas');
  temErro(erros(q({ correta: 5 })), 'correta');
  temErro(erros(q({ gabarito: undefined })), 'gabarito');
  temErro(erros(q({ enunciado: '' })), 'enunciado');
});

test('planilha exige app de planilha e referências de célula válidas', () => {
  const p = (extra) => ({ fala: 'x', tela: { tipo: 'planilha', app: 'excel', celulas: { A1: 10, B2: 'Total' }, em: 'A4', ...extra } });
  assert.deepEqual(erros(p({})), []);
  assert.deepEqual(erros(p({ formula: '=SOMA(A1:A3)', resultado: '60', destaque: ['A1:A3', 'B2'] })), []);
  temErro(erros(p({ em: 'AA' })), 'AA');
  temErro(erros(p({ app: 'word' })), 'word');
  temErro(erros(p({ celulas: { '1A': 3 } })), '1A');
  temErro(erros(p({ celulas: { G1: 3 } })), 'G1');
  temErro(erros(p({ em: 'A9' })), 'A9');
  temErro(erros(p({ destaque: ['A1:Z3'] })), 'A1:Z3');
});

test('compara, lista, pegadinha, capa e secao exigem seus campos', () => {
  temErro(erros({ fala: 'x', tela: { tipo: 'compara', titulo: 'T', office: ['a'] } }), 'libre');
  temErro(erros({ fala: 'x', tela: { tipo: 'lista', titulo: 'T', itens: [] } }), 'itens');
  temErro(erros({ fala: 'x', tela: { tipo: 'pegadinha', titulo: 'T' } }), 'texto');
  temErro(erros({ fala: 'x', tela: { tipo: 'capa', titulo: 'T' } }), 'subtitulo');
  temErro(erros({ fala: 'x', tela: { tipo: 'secao' } }), 'titulo');
  assert.deepEqual(erros({ fala: 'x', tela: { tipo: 'secao', titulo: 'Bloco' } }), []);
});

test('aula sem cenas, sem número ou sem título é erro', () => {
  temErro(validarAula({ n: 3, slug: 'x', titulo: 'T' }, ATALHOS), 'aula 3', 'cenas');
  temErro(validarAula({ n: 3, slug: 'x', titulo: 'T', cenas: [] }, ATALHOS), 'cenas');
  temErro(validarAula({ slug: 'x', titulo: 'T', cenas: [capa] }, ATALHOS), 'n');
  temErro(validarAula({ n: 3, slug: 'x', cenas: [capa] }, ATALHOS), 'titulo');
});

test('todos os erros de uma aula são devolvidos, não só o primeiro', () => {
  const e = erros({ tela: capa.tela }, { fala: 'x', tela: { tipo: 'video' } });
  assert.equal(e.length, 2);
});
