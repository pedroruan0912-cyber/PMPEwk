// Fotografa cada cena no Chromium: cena -> PNG de 1280×720, com cache por conteúdo.
import { createHash } from 'node:crypto';
import { createRequire } from 'node:module';
import { existsSync, mkdirSync, readFileSync, renameSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { ATALHOS } from './atalhos.mjs';
import { ABAS } from './roteiro.mjs';

// O Playwright está instalado globalmente; o import de ESM não o encontra, o require sim.
function carregarPlaywright() {
  try {
    return createRequire(import.meta.url)('playwright');
  } catch (e) {
    if (e.code !== 'MODULE_NOT_FOUND') throw e;
    throw new Error('Playwright não encontrado. Instale o Playwright e o Chromium (npm install -g playwright && npx playwright install chromium) ou aponte NODE_PATH para a pasta node_modules onde ele está.');
  }
}
const { chromium } = carregarPlaywright();

const TELAS = join(dirname(fileURLToPath(import.meta.url)), 'telas');
const ARQUIVOS_DE_TELA = ['tela.html', 'tela.css', 'tela.js'];

export const LARGURA = 1280;
export const ALTURA = 720;

// Abre a página das telas. Quem chama precisa fechar.
export async function abrirPalco() {
  const navegador = await chromium.launch();
  const pagina = await navegador.newPage({ viewport: { width: LARGURA, height: ALTURA }, deviceScaleFactor: 1 });
  await pagina.goto(pathToFileURL(join(TELAS, 'tela.html')).href);
  await pagina.evaluate(() => document.fonts.ready);
  return {
    pagina,
    async desenhar(cena, meta) {
      const r = await pagina.evaluate(([c, m]) => window.desenhar(c, m), [cena, meta]);
      await pagina.evaluate(() => document.fonts.ready);
      // Fontes que chegam depois do desenho podem mudar a quebra de linha: mede de novo.
      return pagina.evaluate(([c, m]) => window.desenhar(c, m), [cena, meta]).then((r2) => r2 ?? r);
    },
    fechar: () => navegador.close(),
  };
}

export function metaDaCena(aula, indice, { atalhos = ATALHOS, abas = ABAS } = {}) {
  return { n: aula.n, titulo: aula.titulo, indice: indice + 1, total: aula.cenas.length, atalhos, abas };
}

function assinaturaDasTelas() {
  const h = createHash('sha1');
  for (const arq of ARQUIVOS_DE_TELA) h.update(readFileSync(join(TELAS, arq)));
  return h.digest('hex');
}

export async function renderizarCenas(aula, dirTrabalho, opcoes = {}) {
  const dirPng = join(dirTrabalho, 'png');
  mkdirSync(dirPng, { recursive: true });
  const telas = assinaturaDasTelas();
  const trabalhos = aula.cenas.map((cena, i) => {
    const meta = metaDaCena(aula, i, opcoes);
    // A voz não muda a imagem; o resto da cena e o cabeçalho, sim.
    const visivel = { fala: cena.fala, tela: cena.tela, n: meta.n, titulo: meta.titulo, indice: meta.indice, total: meta.total };
    const atalhosUsados = cena.tela.tipo === 'teclas' ? cena.tela.acoes.map((a) => meta.atalhos[a]) : null;
    const abasUsadas = cena.tela.tipo === 'janela' ? meta.abas[cena.tela.app] : null; // a janela desenha a lista inteira
    const hash = createHash('sha1').update(JSON.stringify([telas, visivel, atalhosUsados, abasUsadas])).digest('hex').slice(0, 16);
    return { cena, meta, i, png: join(dirPng, `${hash}.png`) };
  });
  const faltam = trabalhos.filter((t) => !existsSync(t.png));
  if (faltam.length > 0) {
    const palco = await abrirPalco();
    try {
      for (const t of faltam) {
        if (existsSync(t.png)) continue; // cena repetida na mesma aula
        const { transbordou } = await palco.desenhar(t.cena, t.meta);
        if (transbordou.length > 0) throw new Error(`aula ${aula.n}, cena ${t.i + 1}: texto não cabe em ${transbordou.join(', ')}`);
        const parcial = `${t.png}.parcial.png`;
        await palco.pagina.screenshot({ path: parcial, type: 'png' });
        renameSync(parcial, t.png);
      }
    } finally {
      await palco.fechar();
    }
  }
  return trabalhos.map((t) => t.png);
}
