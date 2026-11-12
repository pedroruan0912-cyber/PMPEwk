import { test } from 'node:test';
import assert from 'node:assert/strict';
import { falavel } from '../src/pronuncia.mjs';

const casos = (nome, pares) =>
  test(nome, () => {
    for (const [escrito, falado] of pares) assert.equal(falavel(escrito), falado, `entrada: ${escrito}`);
  });

casos('combinações de teclas dizem o nome de cada tecla', [
  ['Ctrl+N', 'control ene'],
  ['Ctrl+Shift+S', 'control xift esse'],
  ['Alt+F4', 'alt efe 4'],
  ['Ctrl+Enter', 'control ênter'],
  ['Ctrl+;', 'control ponto e vírgula'],
  ['Ctrl+Shift++', 'control xift mais'],
  ['Ctrl+=', 'control igual'],
  ['Ctrl+*', 'control asterisco'],
  ['Ctrl+PgDn', 'control pêige dáun'],
  ['Ctrl+1', 'control 1'],
  ['Ctrl+A', 'control á'],
]);

casos('teclas de função soltas', [
  ['F12', 'efe 12'],
  ['F5', 'efe 5'],
  ['Shift+F5', 'xift efe 5'],
]);

casos('pontuação depois de um atalho continua sendo pontuação', [
  ['No Word é Ctrl+N; no Writer, Ctrl+B.', 'No uôrd é control ene; no ráiter, control bê.'],
  ['Aperte Ctrl+B.', 'Aperte control bê.'],
]);

casos('extensões de arquivo', [
  ['.docx', 'ponto doc xis'],
  ['.odt', 'ponto ó dê tê'],
  ['.xlsx', 'ponto xis éle esse xis'],
  ['.ods', 'ponto ó dê esse'],
  ['.pptx', 'ponto pê pê tê xis'],
  ['.odp', 'ponto ó dê pê'],
  ['PDF', 'pê dê efe'],
  ['O arquivo termina em .odt.', 'O arquivo termina em ponto ó dê tê.'],
]);

casos('referências de célula e intervalos', [
  ['A1:B3', 'á 1 até bê 3'],
  ['$A$1', 'cifrão á cifrão 1'],
  ['A célula C4 soma B2 e B3.', 'A célula cê 4 soma bê 2 e bê 3.'],
]);

casos('fórmulas são lidas sinal por sinal', [
  ['=SOMA(A1;A3)', 'igual soma, abre parênteses, á 1, ponto e vírgula, á 3, fecha parênteses'],
  ['=SOMA(A1:A3)', 'igual soma, abre parênteses, á 1 até á 3, fecha parênteses'],
  ['=A1+B1*2', 'igual á 1 mais bê 1 vezes 2'],
  ['=SE(A1>=7;"Aprovado";"Reprovado")', 'igual se, abre parênteses, á 1 maior ou igual a 7, ponto e vírgula, aprovado, ponto e vírgula, reprovado, fecha parênteses'],
  ['=$A$1*B2', 'igual cifrão á cifrão 1 vezes bê 2'],
  ['=Planilha2.A1', 'igual planilha 2 ponto á 1'],
  ['=Planilha2!A1', 'igual planilha 2 exclamação á 1'],
  ['=ARRED(MÉDIA(A1:A3);1)', 'igual arred, abre parênteses, média, abre parênteses, á 1 até á 3, fecha parênteses, ponto e vírgula, 1, fecha parênteses'],
  ['A fórmula =SOMA(A1;A3) devolve 60.', 'A fórmula igual soma, abre parênteses, á 1, ponto e vírgula, á 3, fecha parênteses, devolve 60.'],
  ['Digite =A1/2.', 'Digite igual á 1 dividido por 2.'],
]);

casos('nomes de função', [
  ['PROCV', 'proc vê'],
  ['PROCH', 'proc agá'],
  ['CONT.SE', 'cont ponto se'],
  ['CONT.NÚM', 'cont ponto núm'],
  ['SOMASE', 'soma se'],
  ['A função SOMA', 'A função soma'],
  ['MÁXIMO e MÍNIMO', 'máximo e mínimo'],
]);

casos('nomes de programas e siglas', [
  ['Writer', 'ráiter'],
  ['Calc', 'cálqui'],
  ['Impress', 'imprés'],
  ['Excel', 'ecsséu'],
  ['PowerPoint', 'páuer póint'],
  ['LibreOffice', 'libre ófice'],
  ['Office', 'ófice'],
  ['Word', 'uôrd'],
  ['AOCP', 'a ó cê pê'],
  ['PMPE', 'pê eme pê é'],
]);

casos('texto comum, aspas e parênteses', [
  ['O negrito deixa o texto mais forte.', 'O negrito deixa o texto mais forte.'],
  ['A guia “Página Inicial” reúne os comandos.', 'A guia Página Inicial reúne os comandos.'],
  ['O Writer (editor de texto) é livre.', 'O ráiter, editor de texto, é livre.'],
  ['Use 0,5 ponto.', 'Use 0 vírgula 5 ponto.'],
  ['  dois   espaços  ', 'dois espaços'],
]);

// Respelling escolhido olhando a transcrição fonética que o Kokoro gera para cada palavra.
casos('nomes em inglês que a voz leria errado', [
  ['The Document Foundation', 'dê dóquiument faundêichon'],
  ['OpenDocument', 'ôupen dóquiument'],
  ['Office Open XML', 'ófice ôupen xis eme éle'],
  ['Access', 'ácsses'],
  ['Outlook', 'áutluc'],
  ['Publisher', 'páblixer'],
  ['Draw', 'dró'],
  ['Math', 'méf'],
  ['macOS', 'méc ó esse'],
  ['spreadsheet', 'ispréd xit'],
  ['É software livre.', 'É sóftuér livre.'],
  ['ODF', 'ó dê efe'],
  ['a base do documento', 'a base do documento'],
  ['Calibri, tamanho 11', 'calíbri, tamanho 11'],
]);

// O voz.py escreve os números por extenso; grudado numa palavra, "Planilha2" viraria "planilhadois".
casos('número grudado em palavra é separado para a voz', [
  ['A aba Planilha2 fica ao lado.', 'A aba Planilha 2 fica ao lado.'],
  ['Título 1 e Título 2', 'Título 1 e Título 2'],
  ['25% de 200', '25% de 200'],
]);
