import { test, after } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, readFileSync, statSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { renderizarCenas, abrirPalco } from '../src/render.mjs';
import { ATALHOS } from '../src/atalhos.mjs';
import { ABAS, validarAula } from '../src/roteiro.mjs';

const pasta = () => mkdtempSync(join(tmpdir(), 'png-'));
const aula = (...cenas) => ({ n: 1, slug: 'teste', titulo: 'Aula de teste', cenas });
const FALA = 'Aqui a narradora explica o comando com calma.';
const cena = (tela, fala = FALA) => ({ fala, tela });
const meta = (extra = {}) => ({ n: 1, titulo: 'Aula de teste', indice: 1, total: 1, atalhos: ATALHOS, abas: ABAS, ...extra });

const tamanhoPng = (arq) => {
  const b = readFileSync(arq);
  assert.equal(b.toString('latin1', 1, 4), 'PNG');
  return [b.readUInt32BE(16), b.readUInt32BE(20)];
};

const UMA_DE_CADA = [
  { tipo: 'capa', titulo: 'Visão geral', subtitulo: 'Office 2019 e LibreOffice 7' },
  { tipo: 'secao', titulo: 'Extensões de arquivo', itens: ['Texto', 'Planilha', 'Apresentação'] },
  { tipo: 'janela', app: 'word', aba: 'Página Inicial', itens: [{ grupo: 'Fonte', itens: ['Negrito', 'Itálico', 'Sublinhado'] }, { grupo: 'Parágrafo', itens: ['Centralizar', 'Justificar'] }], destaque: 'Negrito', balao: 'Deixa o texto selecionado mais forte.' },
  { tipo: 'planilha', app: 'excel', celulas: { A1: 10, A2: 20, A3: 30, B1: 'Total' }, em: 'A4', formula: '=SOMA(A1:A3)', resultado: '60', destaque: ['A1:A3'], nota: 'Os dois-pontos significam "até".' },
  { tipo: 'teclas', titulo: 'Formatação', acoes: ['negrito', 'italico', 'sublinhado'] },
  { tipo: 'compara', titulo: 'Onde ficam os comandos', office: ['Faixa de opções', 'Guias e grupos'], libre: ['Barra de menus', 'Barras de ferramentas'] },
  { tipo: 'lista', titulo: 'O que vamos ver', itens: ['As duas suítes', 'Extensões', 'Atalhos'] },
  { tipo: 'pegadinha', titulo: 'Negrito não é igual nas duas', texto: 'No Word em português é Ctrl+N; no Writer é Ctrl+B.' },
  { tipo: 'questao', enunciado: 'No Writer, o atalho para negrito é:', alternativas: ['Ctrl+N', 'Ctrl+B', 'Ctrl+S', 'Ctrl+G', 'Ctrl+T'], correta: 1, gabarito: true, comentario: 'No LibreOffice os atalhos seguem o inglês: B de bold.' },
];

let palco;
const p = async () => (palco ??= await abrirPalco());
after(async () => { await palco?.fechar(); });

test('uma cena de cada tipo vira PNG de 1280×720 sem texto sobrando', async () => {
  const cenas = UMA_DE_CADA.map((t) => cena(t));
  assert.deepEqual(validarAula(aula(...cenas), ATALHOS), []);
  const pngs = await renderizarCenas(aula(...cenas), pasta());
  assert.equal(pngs.length, 9);
  for (const arq of pngs) assert.deepEqual(tamanhoPng(arq), [1280, 720]);
});

test('balão longo demais interrompe a geração dizendo aula e cena', async () => {
  const tela = { ...UMA_DE_CADA[2], balao: 'Explicação comprida demais. '.repeat(22) };
  await assert.rejects(renderizarCenas(aula(cena(UMA_DE_CADA[0]), cena(tela)), pasta()), /aula 1, cena 2: texto não cabe/);
});

test('alternativas longas demais interrompem a geração', async () => {
  const tela = { ...UMA_DE_CADA[8], alternativas: [0, 1, 2, 3, 4].map((i) => `${i} ` + 'alternativa comprida demais '.repeat(9)) };
  await assert.rejects(renderizarCenas(aula(cena(tela)), pasta()), /aula 1, cena 1: texto não cabe/);
});

test('uma fala no limite de 300 caracteres cabe no rodapé', async () => {
  const fala = 'No Word em português o negrito é Ctrl+N e o sublinhado é Ctrl+S; no Writer, negrito é Ctrl+B. '.repeat(4).slice(0, 300);
  assert.equal(fala.length, 300);
  const r = await (await p()).desenhar(cena(UMA_DE_CADA[6], fala), meta());
  assert.deepEqual(r.transbordou, []);
});

test('a tela mostra a fala, o número e o título da aula e a posição da cena', async () => {
  const palco = await p();
  await palco.desenhar(cena(UMA_DE_CADA[6]), meta({ n: 4, titulo: 'Excel 2019', indice: 7, total: 52 }));
  const texto = await palco.pagina.evaluate(() => document.body.innerText);
  assert.ok(texto.includes(FALA));
  assert.ok(texto.includes('Aula 4'));
  assert.ok(texto.includes('Excel 2019'));
  assert.ok(texto.includes('7/52'));
});

test('teclas mostra os atalhos das duas suítes e marca só as linhas em que diferem', async () => {
  const palco = await p();
  await palco.desenhar(cena({ tipo: 'teclas', acoes: ['negrito', 'italico'] }), meta());
  const r = await palco.pagina.evaluate(() => ({
    linhas: [...document.querySelectorAll('.linha-tecla')].map((l) => ({ difere: l.classList.contains('difere'), teclas: [...l.querySelectorAll('.atalho')].map((a) => a.dataset.teclas) })),
  }));
  assert.deepEqual(r.linhas, [
    { difere: true, teclas: ['Ctrl+N', 'Ctrl+B'] },
    { difere: false, teclas: ['Ctrl+I', 'Ctrl+I'] },
  ]);
});

test('ação sem atalho numa suíte aparece com travessão', async () => {
  const palco = await p();
  await palco.desenhar(cena({ tipo: 'teclas', acoes: ['navegador'] }), meta());
  const colunas = await palco.pagina.evaluate(() => [...document.querySelectorAll('.linha-tecla .atalho')].map((a) => a.innerText.trim()));
  assert.equal(colunas[0], '—');
  assert.equal(colunas[1], 'F5');
});

test('Ctrl+Shift++ vira três teclas, a última sendo o sinal de mais', async () => {
  const palco = await p();
  await palco.desenhar(cena({ tipo: 'teclas', acoes: ['sobrescrito'] }), meta());
  const teclas = await palco.pagina.evaluate(() => [...document.querySelector('.linha-tecla .atalho').querySelectorAll('kbd')].map((k) => k.textContent));
  assert.deepEqual(teclas, ['Ctrl', 'Shift', '+']);
});

for (const app of ['word', 'excel', 'powerpoint']) {
  test(`janela do ${app}: todas as guias aparecem, a ativa e o destaque ficam marcados`, async () => {
    const palco = await p();
    const aba = ABAS[app][2];
    const r = await palco.desenhar(cena({ tipo: 'janela', app, aba, itens: [{ grupo: 'Grupo um', itens: ['Primeiro', 'Segundo'] }], destaque: 'Segundo', balao: 'Explica o segundo.' }), meta());
    assert.deepEqual(r.transbordou, []);
    const d = await palco.pagina.evaluate(() => ({
      abas: [...document.querySelectorAll('.janela .aba')].map((a) => a.textContent),
      ativa: document.querySelector('.janela .aba.ativa')?.textContent,
      destaque: [...document.querySelectorAll('.janela .destaque')].map((e) => e.textContent.trim()),
      grupo: document.querySelector('.janela .grupo-nome')?.textContent,
      balao: document.querySelector('.balao')?.innerText,
    }));
    assert.deepEqual(d.abas, ABAS[app]);
    assert.equal(d.ativa, aba);
    assert.deepEqual(d.destaque, ['Segundo']);
    assert.equal(d.grupo, 'Grupo um');
    assert.ok(d.balao.includes('Explica o segundo.'));
  });
}

for (const app of ['writer', 'calc', 'impress']) {
  test(`janela do ${app}: o menu aberto lista os itens e marca o destaque`, async () => {
    const palco = await p();
    const aba = ABAS[app][4];
    const itens = ['Texto', 'Parágrafo...', 'Listas', 'Caractere...', 'Página...', 'Colunas...', 'Limpar formatação direta'];
    const r = await palco.desenhar(cena({ tipo: 'janela', app, aba, itens, destaque: 'Parágrafo...' }), meta());
    assert.deepEqual(r.transbordou, []);
    const d = await palco.pagina.evaluate(() => ({
      menus: [...document.querySelectorAll('.janela .aba')].map((a) => a.textContent),
      aberto: document.querySelector('.janela .aba.ativa')?.textContent,
      itens: [...document.querySelectorAll('.janela .menu-aberto .item')].map((e) => e.textContent.trim()),
      destaque: [...document.querySelectorAll('.janela .destaque')].map((e) => e.textContent.trim()),
    }));
    assert.deepEqual(d.menus, ABAS[app]);
    assert.equal(d.aberto, aba);
    assert.deepEqual(d.itens, itens);
    assert.deepEqual(d.destaque, ['Parágrafo...']);
  });
}

test('planilha mostra a fórmula na barra, o resultado na célula ativa e pinta o intervalo', async () => {
  const palco = await p();
  const r = await palco.desenhar(cena(UMA_DE_CADA[3]), meta());
  assert.deepEqual(r.transbordou, []);
  const d = await palco.pagina.evaluate(() => ({
    nome: document.querySelector('.caixa-nome').textContent,
    formula: document.querySelector('.barra-formula').textContent,
    ativa: document.querySelector('.celula.ativa').textContent,
    ativaRef: document.querySelector('.celula.ativa').dataset.ref,
    pintadas: [...document.querySelectorAll('.celula.pintada')].map((c) => c.dataset.ref),
    a2: document.querySelector('.celula[data-ref="A2"]').textContent,
    colunas: [...document.querySelectorAll('.cab-coluna')].map((c) => c.textContent).join(''),
    linhas: document.querySelectorAll('.cab-linha').length,
  }));
  assert.deepEqual(d, { nome: 'A4', formula: '=SOMA(A1:A3)', ativa: '60', ativaRef: 'A4', pintadas: ['A1', 'A2', 'A3'], a2: '20', colunas: 'ABCDEF', linhas: 8 });
});

test('planilha sem resultado mostra a fórmula sendo digitada na célula', async () => {
  const palco = await p();
  await palco.desenhar(cena({ tipo: 'planilha', app: 'calc', celulas: { A1: 5 }, em: 'B1', formula: '=A1*2' }), meta());
  assert.equal(await palco.pagina.evaluate(() => document.querySelector('.celula.ativa').textContent), '=A1*2');
});

test('questão só revela a resposta quando gabarito é verdadeiro', async () => {
  const palco = await p();
  const ler = () => palco.pagina.evaluate(() => ({
    letras: [...document.querySelectorAll('.alternativa .letra')].map((l) => l.textContent).join(''),
    correta: [...document.querySelectorAll('.alternativa.correta .letra')].map((l) => l.textContent),
    comentario: document.querySelector('.comentario')?.innerText ?? null,
  }));
  await palco.desenhar(cena({ ...UMA_DE_CADA[8], gabarito: false }), meta());
  assert.deepEqual(await ler(), { letras: 'ABCDE', correta: [], comentario: null });
  await palco.desenhar(cena(UMA_DE_CADA[8]), meta());
  const com = await ler();
  assert.deepEqual(com.correta, ['B']);
  assert.ok(com.comentario.includes('B de bold'));
});

test('texto do roteiro com sinais de HTML aparece como texto, não como marcação', async () => {
  const palco = await p();
  await palco.desenhar(cena({ tipo: 'lista', titulo: 'Operadores', itens: ['Menor que: <', 'Diferente: <>', 'E comercial: &'] }, 'Use <b>com cuidado</b>.'), meta());
  const d = await palco.pagina.evaluate(() => ({ texto: document.body.innerText, negritos: document.querySelectorAll('#fala b').length }));
  assert.ok(d.texto.includes('Diferente: <>'));
  assert.ok(d.texto.includes('Use <b>com cuidado</b>.'));
  assert.equal(d.negritos, 0);
});

test('renderizar de novo a mesma cena reaproveita o arquivo', async () => {
  const dir = pasta();
  const a = aula(cena(UMA_DE_CADA[0]));
  const [um] = await renderizarCenas(a, dir);
  const quando = statSync(um).mtimeMs;
  const [dois] = await renderizarCenas(a, dir);
  assert.equal(dois, um);
  assert.equal(statSync(dois).mtimeMs, quando);
});

test('mudar o texto da cena gera outro arquivo', async () => {
  const dir = pasta();
  const [um] = await renderizarCenas(aula(cena(UMA_DE_CADA[0])), dir);
  const [dois] = await renderizarCenas(aula(cena(UMA_DE_CADA[0], 'Outra fala.')), dir);
  assert.notEqual(um, dois);
});

test('fórmulas aparecem sem ligaduras: ">=" não vira "≥"', async () => {
  const palco = await p();
  await palco.desenhar(cena({ tipo: 'planilha', app: 'calc', celulas: { A1: 7 }, em: 'B1', formula: '=SE(A1>=7;"Sim";"Não")' }), meta());
  const estilos = await palco.pagina.evaluate(() => ['.barra-formula', '.celula.ativa span', 'kbd'].map((s) => {
    const e = document.querySelector(s) ?? document.body.appendChild(document.createElement(s));
    return getComputedStyle(e).fontVariantLigatures;
  }));
  assert.deepEqual(estilos, ['none', 'none', 'none']);
});

test('fórmula mais larga que a célula aparece inteira, sem alargar a coluna', async () => {
  const palco = await p();
  const formula = '=SE(A1>=7;"Aprovado";"Reprovado")';
  const r = await palco.desenhar(cena({ tipo: 'planilha', app: 'calc', celulas: { A1: 7 }, em: 'B1', formula }), meta());
  assert.deepEqual(r.transbordou, []);
  const d = await palco.pagina.evaluate(() => {
    const larg = (ref) => document.querySelector(`.celula[data-ref="${ref}"]`).getBoundingClientRect().width;
    const texto = document.querySelector('.celula.ativa span');
    return { b: larg('B1'), c: larg('C1'), cortado: texto.scrollWidth > texto.clientWidth, larguraTexto: texto.getBoundingClientRect().width };
  });
  assert.equal(d.b, d.c);
  assert.equal(d.cortado, false);
  assert.ok(d.larguraTexto > d.b, 'a fórmula deve passar por cima das células vizinhas');
});

test('a guia Arquivo do Office aparece como Backstage: lista vertical no lugar da faixa de opções', async () => {
  const palco = await p();
  const itens = ['Informações', 'Novo', 'Abrir', 'Salvar', 'Salvar como', 'Imprimir', 'Compartilhar', 'Exportar', 'Fechar', 'Conta', 'Opções'];
  const r = await palco.desenhar(cena({ tipo: 'janela', app: 'word', aba: 'Arquivo', itens, destaque: 'Exportar', balao: 'Aqui se gera o PDF.' }), meta());
  assert.deepEqual(r.transbordou, []);
  const d = await palco.pagina.evaluate(() => {
    const itens = [...document.querySelectorAll('.janela .backstage .item')];
    return {
      itens: itens.map((e) => e.textContent.trim()),
      faixa: document.querySelectorAll('.janela .faixa').length,
      destaque: [...document.querySelectorAll('.janela .destaque')].map((e) => e.textContent.trim()),
      // empilhados: o segundo fica abaixo do primeiro, na mesma coluna
      empilhado: itens[1].getBoundingClientRect().top > itens[0].getBoundingClientRect().top && itens[1].getBoundingClientRect().left === itens[0].getBoundingClientRect().left,
    };
  });
  assert.deepEqual(d, { itens, faixa: 0, destaque: ['Exportar'], empilhado: true });
});

test('as outras guias do Office continuam com a faixa de opções', async () => {
  const palco = await p();
  await palco.desenhar(cena({ tipo: 'janela', app: 'excel', aba: 'Dados', itens: ['Classificar', 'Filtro'] }), meta());
  const d = await palco.pagina.evaluate(() => [document.querySelectorAll('.janela .faixa').length, document.querySelectorAll('.janela .backstage').length]);
  assert.deepEqual(d, [1, 0]);
});

test('comparação e lista com pouco texto usam letra maior para ocupar a tela', async () => {
  const palco = await p();
  const tamanho = () => palco.pagina.evaluate(() => parseFloat(getComputedStyle(document.querySelector('#conteudo li')).fontSize));
  await palco.desenhar(cena({ tipo: 'compara', titulo: 'Texto', office: ['Word', 'Documentos'], libre: ['Writer', 'Documentos'] }), meta());
  const comparaCurta = await tamanho();
  const r1 = await palco.desenhar(cena({ tipo: 'compara', titulo: 'Licença', office: ['a', 'b', 'c', 'd', 'e'], libre: ['a', 'b', 'c', 'd', 'e'] }), meta());
  const comparaLonga = await tamanho();
  await palco.desenhar(cena({ tipo: 'lista', titulo: 'Curta', itens: ['um', 'dois', 'três'] }), meta());
  const listaCurta = await tamanho();
  const r2 = await palco.desenhar(cena({ tipo: 'lista', titulo: 'Longa', itens: ['1', '2', '3', '4', '5', '6', '7'] }), meta());
  const listaLonga = await tamanho();
  assert.ok(comparaCurta > comparaLonga, `${comparaCurta} x ${comparaLonga}`);
  assert.ok(listaCurta > listaLonga, `${listaCurta} x ${listaLonga}`);
  assert.deepEqual([r1.transbordou, r2.transbordou], [[], []]);
});

// Faixa de opções cheia: como no Office em janela estreita, os grupos fora de foco recolhem e mostram só o nome.
const FAIXA_CHEIA = [
  { grupo: 'Área de Transferência', itens: ['Colar', 'Recortar', 'Copiar', 'Pincel de Formatação'] },
  { grupo: 'Fonte', itens: ['Negrito', 'Itálico', 'Sublinhado', 'Tachado', 'Subscrito', 'Sobrescrito', 'Maiúsculas e Minúsculas', 'Cor do Realce do Texto', 'Cor da Fonte', 'Limpar Toda a Formatação'] },
  { grupo: 'Parágrafo', itens: ['Marcadores', 'Numeração', 'Aumentar Recuo', 'Mostrar Tudo', 'Alinhar à Esquerda', 'Centralizar', 'Alinhar à Direita', 'Justificar', 'Espaçamento de Linha', 'Bordas'] },
  { grupo: 'Estilos', itens: ['Normal', 'Título 1', 'Título 2'] },
  { grupo: 'Edição', itens: ['Localizar', 'Substituir', 'Selecionar'] },
];
const lerFaixa = (palco) => palco.pagina.evaluate(() => [...document.querySelectorAll('.janela .grupo')].map((g) => {
  const visivel = (e) => e && getComputedStyle(e).display !== 'none' && e.getBoundingClientRect().width > 0;
  return {
    nome: [...g.querySelectorAll('.grupo-nome, .botao-recolhido')].filter(visivel).map((e) => e.textContent.replace('▾', '').trim())[0],
    recolhido: g.classList.contains('recolhido'),
    itens: [...g.querySelectorAll('.item')].filter(visivel).map((e) => e.textContent.trim()),
  };
}));

test('faixa de opções cheia: o grupo do destaque fica aberto e os outros recolhem até caber', async () => {
  const palco = await p();
  const r = await palco.desenhar(cena({ tipo: 'janela', app: 'word', aba: 'Página Inicial', itens: FAIXA_CHEIA, destaque: 'Mostrar Tudo', balao: 'Mostra as marcas de parágrafo, espaços e tabulações. Elas não saem na impressão.' }), meta());
  assert.deepEqual(r.transbordou, []);
  const grupos = await lerFaixa(palco);
  assert.deepEqual(grupos.map((g) => g.nome), ['Área de Transferência', 'Fonte', 'Parágrafo', 'Estilos', 'Edição'], 'todos os nomes de grupo continuam na tela');
  const paragrafo = grupos[2];
  assert.equal(paragrafo.recolhido, false);
  assert.deepEqual(paragrafo.itens, FAIXA_CHEIA[2].itens);
  assert.ok(grupos.some((g) => g.recolhido), 'algum grupo precisa recolher');
  for (const g of grupos) if (g.recolhido) assert.deepEqual(g.itens, [], `${g.nome} recolhido não mostra botões`);
});

test('faixa de opções cheia sem destaque: recolhe da direita para a esquerda', async () => {
  const palco = await p();
  const r = await palco.desenhar(cena({ tipo: 'janela', app: 'word', aba: 'Página Inicial', itens: FAIXA_CHEIA }), meta());
  assert.deepEqual(r.transbordou, []);
  const grupos = await lerFaixa(palco);
  assert.equal(grupos[0].recolhido, false);
  const primeiroRecolhido = grupos.findIndex((g) => g.recolhido);
  assert.ok(primeiroRecolhido > 0);
  assert.ok(grupos.slice(primeiroRecolhido).every((g) => g.recolhido), 'depois do primeiro recolhido, todos à direita também estão');
});

test('faixa de opções que cabe inteira não recolhe nenhum grupo', async () => {
  const palco = await p();
  await palco.desenhar(cena(UMA_DE_CADA[2]), meta());
  assert.ok((await lerFaixa(palco)).every((g) => !g.recolhido));
});

test('um grupo sozinho grande demais continua sendo erro de texto que não cabe', async () => {
  const palco = await p();
  const itens = [{ grupo: 'Enorme', itens: Array.from({ length: 40 }, (_, i) => `Comando número ${i + 1}`) }];
  const r = await palco.desenhar(cena({ tipo: 'janela', app: 'word', aba: 'Inserir', itens, destaque: 'Comando número 3' }), meta());
  assert.ok(r.transbordou.includes('faixa de opções'));
});

// ---------- texto cortado dentro da planilha e da capa (achado da revisão final) ----------
const planilhaCom = (extra) => ({ tipo: 'planilha', app: 'excel', celulas: {}, em: 'A1', ...extra });

test('texto comprido numa célula comum é texto que não cabe', async () => {
  const r = await (await p()).desenhar(cena(planilhaCom({ celulas: { B2: 'Texto comprido demais para a célula' } })), meta());
  assert.ok(r.transbordou.includes('planilha'), JSON.stringify(r.transbordou));
});

test('resultado mais largo que a célula passa por cima das vizinhas vazias e aparece inteiro', async () => {
  const palco = await p();
  const r = await palco.desenhar(cena(planilhaCom({ celulas: { A1: 8 }, em: 'D1', formula: '=OU(A1>=7;A2>=7)', resultado: 'VERDADEIRO' })), meta());
  assert.deepEqual(r.transbordou, []);
  const d = await palco.pagina.evaluate(() => {
    const s = document.querySelector('.celula.ativa span');
    return { texto: s?.textContent, cortado: s ? s.scrollWidth > s.clientWidth : true };
  });
  assert.deepEqual(d, { texto: 'VERDADEIRO', cortado: false });
});

test('resultado largo com a célula vizinha ocupada é texto que não cabe', async () => {
  const r = await (await p()).desenhar(cena(planilhaCom({ celulas: { E1: 'ocupada' }, em: 'D1', formula: '=1', resultado: 'VERDADEIRO' })), meta());
  assert.ok(r.transbordou.includes('planilha'), JSON.stringify(r.transbordou));
});

test('fórmula digitada na última coluna que passa da grade é texto que não cabe', async () => {
  const r = await (await p()).desenhar(cena(planilhaCom({ em: 'F1', formula: '=SE(A1>=7;"Aprovado";"Reprovado")' })), meta());
  assert.ok(r.transbordou.includes('planilha'), JSON.stringify(r.transbordou));
});

test('título de capa comprido demais é texto que não cabe', async () => {
  const r = await (await p()).desenhar(cena({ tipo: 'capa', titulo: 'Um título muito comprido '.repeat(8), subtitulo: 'Sub' }), meta());
  assert.ok(r.transbordou.length > 0);
});

test('a nota de um atalho aparece embaixo do nome da ação', async () => {
  const palco = await p();
  const atalhos = { ...ATALHOS, teste: { nome: 'Ação de teste', office: 'Ctrl+N', libre: 'Ctrl+B', onde: 'geral', nota: 'Só em algumas versões' } };
  const r = await palco.desenhar(cena({ tipo: 'teclas', acoes: ['teste'] }), meta({ atalhos }));
  assert.deepEqual(r.transbordou, []);
  assert.equal(await palco.pagina.evaluate(() => document.querySelector('.linha-tecla .nota-atalho')?.textContent), 'Só em algumas versões');
});

test('mudar a lista de guias ou menus gera outra imagem para a janela', async () => {
  const dir = pasta();
  const a = aula(cena(UMA_DE_CADA[2]));
  const [um] = await renderizarCenas(a, dir);
  const abas = { ...ABAS, word: ABAS.word.map((x) => (x === 'Ajuda' ? 'Ajuda e Suporte' : x)) };
  const [dois] = await renderizarCenas(a, dir, { abas });
  assert.notEqual(um, dois);
});

test('sem o Playwright, a mensagem diz o que falta e como resolver', () => {
  const env = { ...process.env, NODE_PATH: '' };
  const r = spawnSync(process.execPath, ['--input-type=module', '-e', `await import(${JSON.stringify(new URL('../src/render.mjs', import.meta.url).href)})`], { encoding: 'utf8', env, cwd: tmpdir() });
  assert.notEqual(r.status, 0);
  assert.match(r.stderr, /Playwright não encontrado/);
});

test('atalho de quatro teclas cabe na própria coluna, sem invadir a vizinha', async () => {
  const palco = await p();
  const r = await palco.desenhar(cena({ tipo: 'teclas', acoes: ['estilos', 'inserirFuncao'] }), meta());
  assert.deepEqual(r.transbordou, []);
  // O fim visível das teclas do Office não pode passar do começo da coluna do LibreOffice.
  const linhas = await palco.pagina.evaluate(() => [...document.querySelectorAll('.linha-tecla')].map((l) => {
    const [office, libre] = l.querySelectorAll('.atalho');
    const fim = Math.max(...[...office.children].map((c) => c.getBoundingClientRect().right), office.getBoundingClientRect().left);
    return [fim, libre.getBoundingClientRect().left];
  }));
  // Folga mínima de 24 px: coladas, as duas colunas parecem um atalho só.
  for (const [fim, inicio] of linhas) assert.ok(fim + 24 <= inicio, `as teclas do Office terminam em ${fim}, a menos de 24 px da coluna seguinte (${inicio})`);
});

test('atalho comprido demais para a coluna é texto que não cabe', async () => {
  const palco = await p();
  const atalhos = { ...ATALHOS, enorme: { nome: 'Enorme', office: 'Ctrl+Shift+Alt+Ctrl+Shift+Alt+F12', libre: null, onde: 'geral' } };
  const r = await palco.desenhar(cena({ tipo: 'teclas', acoes: ['enorme'] }), meta({ atalhos }));
  assert.ok(r.transbordou.includes('teclas'), JSON.stringify(r.transbordou));
});
