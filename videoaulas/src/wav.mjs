// Leitura e escrita de WAV no único formato que o projeto usa: PCM 16 bits, mono, 24 kHz.
import { readFileSync, writeFileSync } from 'node:fs';

export const TAXA = 24000;

export function lerWav(caminho) {
  const b = readFileSync(caminho);
  if (b.toString('latin1', 0, 4) !== 'RIFF' || b.toString('latin1', 8, 12) !== 'WAVE') throw new Error(`${caminho}: não é um arquivo WAV`);
  let pos = 12, fmt = null;
  while (pos + 8 <= b.length) {
    const id = b.toString('latin1', pos, pos + 4);
    const tam = b.readUInt32LE(pos + 4);
    const ini = pos + 8;
    if (id === 'fmt ') fmt = { formato: b.readUInt16LE(ini), canais: b.readUInt16LE(ini + 2), taxa: b.readUInt32LE(ini + 4), bits: b.readUInt16LE(ini + 14) };
    if (id === 'data') {
      if (!fmt || fmt.formato !== 1 || fmt.canais !== 1 || fmt.bits !== 16) throw new Error(`${caminho}: esperado PCM 16 bits mono`);
      // ffmpeg pode gravar 0xFFFFFFFF como tamanho quando escreve em fluxo; o dado vai até o fim do arquivo.
      const fim = Math.min(ini + tam, b.length);
      const n = Math.floor((fim - ini) / 2);
      const amostras = new Int16Array(n);
      for (let i = 0; i < n; i++) amostras[i] = b.readInt16LE(ini + i * 2);
      return { taxa: fmt.taxa, amostras };
    }
    pos = ini + tam + (tam % 2);
  }
  throw new Error(`${caminho}: WAV sem dados`);
}

export function escreverWav(caminho, amostras, taxa = TAXA) {
  const dados = Buffer.alloc(amostras.length * 2);
  for (let i = 0; i < amostras.length; i++) dados.writeInt16LE(amostras[i], i * 2);
  const cab = Buffer.alloc(44);
  cab.write('RIFF', 0, 'latin1'); cab.writeUInt32LE(36 + dados.length, 4); cab.write('WAVE', 8, 'latin1');
  cab.write('fmt ', 12, 'latin1'); cab.writeUInt32LE(16, 16); cab.writeUInt16LE(1, 20); cab.writeUInt16LE(1, 22);
  cab.writeUInt32LE(taxa, 24); cab.writeUInt32LE(taxa * 2, 28); cab.writeUInt16LE(2, 32); cab.writeUInt16LE(16, 34);
  cab.write('data', 36, 'latin1'); cab.writeUInt32LE(dados.length, 40);
  writeFileSync(caminho, Buffer.concat([cab, dados]));
}
