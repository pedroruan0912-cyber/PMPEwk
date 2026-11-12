// Narração: decide o que precisa ser gravado (cache por conteúdo) e chama o voz.py.
import { createHash } from 'node:crypto';
import { existsSync, mkdirSync } from 'node:fs';
import { spawn } from 'node:child_process';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { falavel } from './pronuncia.mjs';
import { lerWav } from './wav.mjs';

export const VOZ = 'pf_dora';
const AQUI = dirname(fileURLToPath(import.meta.url));

export const textoFalado = (cena) => falavel(cena.voz ?? cena.fala);

// A chave depende só do que a voz vai dizer e de qual voz: mudou uma palavra, grava de novo.
export function chaveDaFala(cena, voz = VOZ) {
  return createHash('sha1').update(`${voz}\n${textoFalado(cena)}`).digest('hex').slice(0, 16);
}

// Gravador de verdade: uma chamada do Python para todas as falas que faltam (o modelo é carregado uma vez).
export function gravarComKokoro(lista, dirSaida, { voz = VOZ, modelos = join(dirSaida, '..', 'modelos') } = {}) {
  return new Promise((ok, falha) => {
    const p = spawn('python3', [join(AQUI, 'voz.py'), '--modelos', modelos, '--saida', dirSaida, '--voz', voz], { stdio: ['pipe', 'ignore', 'pipe'] });
    let erro = '';
    p.stderr.on('data', (d) => { erro += d; process.stderr.write(d); });
    p.on('error', falha);
    p.on('close', (codigo) => (codigo === 0 ? ok() : falha(new Error(`voz.py terminou com código ${codigo}: ${erro.trim().split('\n').slice(-3).join(' | ')}`))));
    p.stdin.end(JSON.stringify(lista));
  });
}

export async function gravarFalas(cenas, dirTrabalho, { gravar = gravarComKokoro, voz = VOZ } = {}) {
  const dirVoz = join(dirTrabalho, 'voz');
  mkdirSync(dirVoz, { recursive: true });
  const falas = cenas.map((cena) => ({ chave: chaveDaFala(cena, voz), texto: textoFalado(cena) }));
  const arquivo = (chave) => join(dirVoz, `${chave}.wav`);
  const faltam = new Map();
  for (const f of falas) if (!existsSync(arquivo(f.chave))) faltam.set(f.chave, f);
  if (faltam.size > 0) await gravar([...faltam.values()], dirVoz);
  return falas.map((f, i) => {
    const wav = arquivo(f.chave);
    if (!existsSync(wav)) throw new Error(`cena ${i + 1}: o áudio não foi gravado para a fala "${f.texto}"`);
    const { taxa, amostras } = lerWav(wav);
    return { wav, duracao: amostras.length / taxa };
  });
}
