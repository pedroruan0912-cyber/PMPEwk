// Junta as imagens das cenas e o áudio da aula num MP4, e confere o resultado.
import { execFile } from 'node:child_process';
import { existsSync, renameSync, rmSync, statSync, writeFileSync } from 'node:fs';
import { promisify } from 'node:util';

const executar = promisify(execFile);

export const FPS = 10;

export async function conferirMp4(caminho) {
  const { stdout } = await executar('ffprobe', ['-v', 'error', '-show_entries', 'format=duration:stream=codec_type,width,height', '-of', 'json', caminho]);
  const dados = JSON.parse(stdout);
  const video = (dados.streams ?? []).find((s) => s.codec_type === 'video');
  return {
    duracao: Number(dados.format?.duration ?? 0),
    bytes: statSync(caminho).size,
    video: !!video,
    audio: (dados.streams ?? []).some((s) => s.codec_type === 'audio'),
    largura: video?.width ?? 0,
    altura: video?.height ?? 0,
  };
}

export function problemasDoMp4(info, { min = 480, max = 720, limite = 50e6 } = {}) {
  const p = [];
  if (!info.video) p.push('o arquivo não tem vídeo');
  if (!info.audio) p.push('o arquivo não tem áudio');
  if (info.duracao < min || info.duracao > max) p.push(`dura ${(info.duracao / 60).toFixed(1)} minutos; o combinado é de ${min / 60} a ${max / 60} minutos`);
  if (info.bytes > limite) p.push(`tem ${(info.bytes / 1e6).toFixed(1)} MB; o limite é ${limite / 1e6} MB`);
  return p;
}

// Grava primeiro num arquivo parcial; o MP4 antigo só é trocado depois que o novo passou na conferência.
export async function montarAula({ pngs, audio, linha, saida, ffmpeg = 'ffmpeg' }) {
  const total = linha.reduce((s, c) => s + c.duracao, 0);
  const lista = `${saida}.parcial.txt`;
  const parcial = `${saida}.parcial.mp4`;
  const aspas = (c) => `'${c.replace(/'/g, "'\\''")}'`;
  // O concat demuxer só respeita a duração do último arquivo se ele for repetido no fim.
  const linhas = pngs.map((png, i) => `file ${aspas(png)}\nduration ${linha[i].duracao.toFixed(3)}`).concat(`file ${aspas(pngs[pngs.length - 1])}`);
  writeFileSync(lista, `ffconcat version 1.0\n${linhas.join('\n')}\n`);
  try {
    try {
      await executar(ffmpeg, [
        '-y', '-v', 'error', '-f', 'concat', '-safe', '0', '-i', lista, '-i', audio,
        '-vf', `fps=${FPS},format=yuv420p`, '-c:v', 'libx264', '-tune', 'stillimage', '-crf', '23', '-g', String(FPS * 2),
        '-c:a', 'aac', '-b:a', '64k', '-ac', '1', '-t', total.toFixed(3), '-movflags', '+faststart', parcial,
      ], { maxBuffer: 16 * 1024 * 1024 });
    } catch (e) {
      throw new Error(`o ffmpeg falhou ao montar ${saida}: ${(e.stderr || e.message).trim().split('\n').slice(-3).join(' | ')}`);
    }
    const info = await conferirMp4(parcial);
    if (!info.video || !info.audio || Math.abs(info.duracao - total) > 0.5) {
      throw new Error(`o ffmpeg gerou um arquivo incompleto para ${saida} (duração ${info.duracao.toFixed(1)} s, esperado ${total.toFixed(1)} s)`);
    }
    renameSync(parcial, saida);
  } finally {
    rmSync(lista, { force: true });
    if (existsSync(parcial)) rmSync(parcial, { force: true });
  }
}
