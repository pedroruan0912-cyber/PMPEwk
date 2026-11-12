#!/usr/bin/env node
// Gera as videoaulas: roteiro -> fala (WAV) + tela (PNG) -> MP4.
//   node build.mjs            todas as aulas de src/aulas/
//   node build.mjs 1 4        só as aulas 1 e 4
//   node build.mjs 2 --texto  só mostra o que a voz vai ler em cada cena da aula 2
//   --sem-limite              não reprova duração fora de 8 a 12 minutos
// Use ./build.sh para instalar as dependências e baixar a voz antes.
import { existsSync, mkdirSync, readdirSync, renameSync, rmSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { ATALHOS } from './src/atalhos.mjs';
import { validarAula } from './src/roteiro.mjs';
import { gravarFalas, textoFalado } from './src/voz.mjs';
import { renderizarCenas } from './src/render.mjs';
import { linhaDoTempo, juntarWav } from './src/tempo.mjs';
import { montarAula, conferirMp4, problemasDoMp4 } from './src/montar.mjs';

const RAIZ = dirname(fileURLToPath(import.meta.url));
const AULAS = join(RAIZ, 'src', 'aulas');

const doisDigitos = (n) => String(n).padStart(2, '0');
export const nomeDoMp4 = (aula) => `aula-${doisDigitos(aula.n)}-${aula.slug}.mp4`;
export const minutos = (s) => {
  const total = Math.round(s); // arredonda antes de separar, para 539,6 s virar 9:00 e não 8:60
  return `${Math.floor(total / 60)}:${doisDigitos(total % 60)}`;
};

export async function gerarAula(aula, { dirTrabalho = join(RAIZ, '.trabalho'), dirSaida = RAIZ, gravar, semLimite = false, avisar = () => {} } = {}) {
  const erros = validarAula(aula, ATALHOS);
  if (erros.length > 0) throw new Error(`Roteiro inválido:\n  ${erros.join('\n  ')}`);
  mkdirSync(dirTrabalho, { recursive: true });

  // As telas primeiro: são rápidas e é nelas que um texto longo demais aparece.
  avisar(`aula ${aula.n}: desenhando ${aula.cenas.length} telas`);
  const pngs = await renderizarCenas(aula, dirTrabalho);
  avisar(`aula ${aula.n}: gravando a narração`);
  const falas = await gravarFalas(aula.cenas, dirTrabalho, gravar ? { gravar } : {});
  const linha = linhaDoTempo(falas.map((f) => f.duracao));
  const duracao = linha.reduce((s, c) => s + c.duracao, 0);

  const limites = semLimite ? { min: 0, max: Infinity } : {};
  const antes = problemasDoMp4({ duracao, bytes: 0, video: true, audio: true }, limites);
  if (antes.length > 0) throw new Error(`aula ${aula.n}: ${antes.join('; ')}`);

  const audio = join(dirTrabalho, `aula-${doisDigitos(aula.n)}.wav`);
  juntarWav(falas.map((f) => f.wav), linha.map((c) => c.duracao), audio);
  avisar(`aula ${aula.n}: montando o vídeo (${minutos(duracao)})`);
  const mp4 = join(dirSaida, nomeDoMp4(aula));
  const novo = join(dirTrabalho, nomeDoMp4(aula));
  await montarAula({ pngs, audio, linha, saida: novo });
  const info = await conferirMp4(novo);
  const problemas = problemasDoMp4(info, limites);
  if (problemas.length > 0) {
    rmSync(novo, { force: true });
    throw new Error(`aula ${aula.n}: ${problemas.join('; ')}`);
  }
  renameSync(novo, mp4);
  return { mp4, duracao, bytes: info.bytes, linha };
}

export async function carregarAulas(numeros = []) {
  const arquivos = existsSync(AULAS) ? readdirSync(AULAS).filter((f) => /^\d\d-.+\.mjs$/.test(f)).sort() : [];
  const aulas = [];
  for (const arq of arquivos) {
    const n = Number(arq.slice(0, 2));
    if (numeros.length > 0 && !numeros.includes(n)) continue;
    const aula = (await import(pathToFileURL(join(AULAS, arq)).href)).default;
    const esperado = `${doisDigitos(aula.n)}-${aula.slug}.mjs`;
    if (arq !== esperado) throw new Error(`${arq}: o arquivo deveria se chamar ${esperado} (n e slug do roteiro)`);
    aulas.push(aula);
  }
  for (const n of numeros) {
    if (!aulas.some((a) => a.n === n)) throw new Error(`aula ${n} não existe em src/aulas/`);
  }
  if (aulas.length === 0) throw new Error('nenhuma aula encontrada em src/aulas/');
  return aulas;
}

async function principal(args) {
  const opcoes = args.filter((a) => a.startsWith('--'));
  const desconhecida = opcoes.find((o) => !['--texto', '--sem-limite'].includes(o));
  if (desconhecida) throw new Error(`opção desconhecida: ${desconhecida}`);
  const numeros = args.filter((a) => !a.startsWith('--')).map((a) => {
    if (!/^\d+$/.test(a)) throw new Error(`"${a}" não é número de aula`);
    return Number(a);
  });
  const aulas = await carregarAulas(numeros);

  if (opcoes.includes('--texto')) {
    for (const aula of aulas) {
      const erros = validarAula(aula, ATALHOS);
      if (erros.length > 0) throw new Error(`Roteiro inválido:\n  ${erros.join('\n  ')}`);
      console.log(`\n# Aula ${aula.n} · ${aula.titulo}`);
      aula.cenas.forEach((cena, i) => console.log(`${String(i + 1).padStart(3)}  ${textoFalado(cena)}`));
      const letras = aula.cenas.reduce((s, c) => s + textoFalado(c).length, 0);
      console.log(`     (${aula.cenas.length} cenas, ${letras} caracteres falados)`);
    }
    return;
  }

  for (const aula of aulas) {
    const r = await gerarAula(aula, { semLimite: opcoes.includes('--sem-limite'), avisar: (m) => console.error(m) });
    console.log(`${nomeDoMp4(aula)}  ${minutos(r.duracao)}  ${(r.bytes / 1e6).toFixed(1)} MB  ${aula.cenas.length} cenas`);
  }
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  principal(process.argv.slice(2)).catch((e) => {
    console.error(`Erro: ${e.message}`);
    process.exit(1);
  });
}
