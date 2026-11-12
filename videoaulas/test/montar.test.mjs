import { test } from 'node:test';
import assert from 'node:assert/strict';
import { execFileSync, spawnSync } from 'node:child_process';
import { existsSync, mkdtempSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { montarAula, conferirMp4, problemasDoMp4 } from '../src/montar.mjs';
import { gerarAula, nomeDoMp4 } from '../build.mjs';
import { escreverWav } from '../src/wav.mjs';

const RAIZ = join(dirname(fileURLToPath(import.meta.url)), '..');
const pasta = () => mkdtempSync(join(tmpdir(), 'mp4-'));
const bom = { duracao: 600, bytes: 12e6, video: true, audio: true };

// Voz de mentira: um tom de 440 Hz cuja duração depende do tamanho do texto.
const tom = async (lista, dirSaida) => {
  for (const f of lista) {
    const n = 12000 + f.texto.length * 300;
    escreverWav(join(dirSaida, `${f.chave}.wav`), Int16Array.from({ length: n }, (_, i) => Math.round(8000 * Math.sin((2 * Math.PI * 440 * i) / 24000))));
  }
};

const aulaCurta = () => ({
  n: 7, slug: 'teste', titulo: 'Aula de teste',
  cenas: [
    { fala: 'Primeira cena da aula de teste.', tela: { tipo: 'capa', titulo: 'Teste', subtitulo: 'Três cenas' } },
    { fala: 'Segunda cena, com uma lista.', tela: { tipo: 'lista', titulo: 'Lista', itens: ['um', 'dois'] } },
    { fala: 'Terceira e última cena.', tela: { tipo: 'pegadinha', titulo: 'Cuidado', texto: 'Só um teste.' } },
  ],
});

test('um MP4 de 10 minutos e 12 MB com vídeo e áudio é aprovado', () => {
  assert.deepEqual(problemasDoMp4(bom), []);
});

test('duração fora de 8 a 12 minutos é reprovada', () => {
  assert.equal(problemasDoMp4({ ...bom, duracao: 7 * 60 }).length, 1);
  assert.equal(problemasDoMp4({ ...bom, duracao: 13 * 60 }).length, 1);
  assert.deepEqual(problemasDoMp4({ ...bom, duracao: 480 }), []);
  assert.deepEqual(problemasDoMp4({ ...bom, duracao: 720 }), []);
  assert.deepEqual(problemasDoMp4({ ...bom, duracao: 30 }, { min: 0, max: Infinity }), []);
});

test('arquivo acima de 50 MB, sem áudio ou sem vídeo é reprovado', () => {
  assert.match(problemasDoMp4({ ...bom, bytes: 51e6 })[0], /MB/);
  assert.match(problemasDoMp4({ ...bom, audio: false })[0], /áudio/);
  assert.match(problemasDoMp4({ ...bom, video: false })[0], /vídeo/);
  assert.equal(problemasDoMp4({ duracao: 60, bytes: 60e6, video: false, audio: false }).length, 4);
});

test('se o ffmpeg falhar, o MP4 anterior fica intacto e não sobra arquivo parcial', async () => {
  const dir = pasta();
  const saida = join(dir, 'aula.mp4');
  writeFileSync(saida, 'vídeo bom de antes');
  const png = join(dir, 'a.png'), audio = join(dir, 'a.wav');
  writeFileSync(png, 'x');
  escreverWav(audio, new Int16Array(24000));
  await assert.rejects(montarAula({ pngs: [png], audio, linha: [{ inicio: 0, duracao: 1 }], saida, ffmpeg: 'false' }), /ffmpeg/);
  assert.equal(readFileSync(saida, 'utf8'), 'vídeo bom de antes');
  assert.deepEqual(readdirSync(dir).filter((f) => f.includes('parcial')), []);
});

test('da aula ao MP4: 1280×720, com áudio, e duração igual à da linha do tempo', async () => {
  const dir = pasta();
  const r = await gerarAula(aulaCurta(), { dirTrabalho: join(dir, 'trabalho'), dirSaida: dir, gravar: tom, semLimite: true });
  assert.equal(r.mp4, join(dir, 'aula-07-teste.mp4'));
  const info = await conferirMp4(r.mp4);
  assert.equal(info.video, true);
  assert.equal(info.audio, true);
  assert.deepEqual([info.largura, info.altura], [1280, 720]);
  assert.ok(Math.abs(info.duracao - r.duracao) < 0.15, `${info.duracao} x ${r.duracao}`);
  assert.ok(r.duracao > 3 && r.duracao < 8);
  const fluxos = JSON.parse(execFileSync('ffprobe', ['-v', 'error', '-show_entries', 'stream=codec_name,pix_fmt,r_frame_rate,channels', '-of', 'json', r.mp4])).streams;
  const video = fluxos.find((f) => f.codec_name === 'h264'), audio = fluxos.find((f) => f.codec_name === 'aac');
  assert.equal(video.pix_fmt, 'yuv420p');
  assert.equal(video.r_frame_rate, '10/1');
  assert.equal(audio.channels, 1);
});

test('aula curta demais é reprovada pela duração e não substitui o MP4 que já existia', async () => {
  const dir = pasta();
  const saida = join(dir, nomeDoMp4(aulaCurta()));
  writeFileSync(saida, 'vídeo bom de antes');
  await assert.rejects(gerarAula(aulaCurta(), { dirTrabalho: join(dir, 'trabalho'), dirSaida: dir, gravar: tom }), /aula 7.*minutos/s);
  assert.equal(readFileSync(saida, 'utf8'), 'vídeo bom de antes');
});

test('roteiro inválido para antes de gravar e lista todos os erros com aula e cena', async () => {
  const dir = pasta();
  const aula = aulaCurta();
  delete aula.cenas[0].fala;
  aula.cenas[2].tela.tipo = 'video';
  let gravou = false;
  await assert.rejects(
    gerarAula(aula, { dirTrabalho: join(dir, 'trabalho'), dirSaida: dir, gravar: async () => { gravou = true; }, semLimite: true }),
    (e) => /aula 7, cena 1/.test(e.message) && /aula 7, cena 3/.test(e.message),
  );
  assert.equal(gravou, false);
  assert.equal(existsSync(join(dir, 'aula-07-teste.mp4')), false);
});

test('linha de comando: pedir uma aula que não existe termina com erro e diz qual', () => {
  const r = spawnSync('node', [join(RAIZ, 'build.mjs'), '99'], { encoding: 'utf8' });
  assert.notEqual(r.status, 0);
  assert.match(r.stderr, /aula 99/);
});

test('a duração é mostrada em minutos e segundos, sem "8:60"', async () => {
  const { minutos } = await import('../build.mjs');
  assert.equal(minutos(539.6), '9:00');
  assert.equal(minutos(604.3), '10:04');
  assert.equal(minutos(59.4), '0:59');
  assert.equal(minutos(480), '8:00');
});
