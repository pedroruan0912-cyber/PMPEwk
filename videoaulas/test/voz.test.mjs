import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, existsSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { chaveDaFala, gravarFalas } from '../src/voz.mjs';
import { lerWav, escreverWav } from '../src/wav.mjs';

const cena = (fala, voz) => ({ fala, ...(voz ? { voz } : {}), tela: { tipo: 'capa', titulo: 't', subtitulo: 's' } });
const pasta = () => mkdtempSync(join(tmpdir(), 'voz-'));

// Gravador de mentira: escreve um WAV de silêncio cujo tamanho depende do texto, e anota o que pediram.
function gravadorFalso() {
  const pedidos = [];
  const gravar = async (lista, dirSaida) => {
    pedidos.push(lista.map((f) => f.texto));
    for (const f of lista) escreverWav(join(dirSaida, `${f.chave}.wav`), new Int16Array(f.texto.length * 2400));
  };
  return { gravar, pedidos };
}

test('WAV gravado e lido de volta mantém taxa e amostras', () => {
  const arq = join(pasta(), 'a.wav');
  escreverWav(arq, Int16Array.from([0, 1000, -1000, 32767]));
  const w = lerWav(arq);
  assert.equal(w.taxa, 24000);
  assert.deepEqual([...w.amostras], [0, 1000, -1000, 32767]);
});

test('a chave da fala tem 16 hexadecimais e não muda entre chamadas', () => {
  const k = chaveDaFala(cena('O negrito deixa o texto forte.'));
  assert.match(k, /^[0-9a-f]{16}$/);
  assert.equal(chaveDaFala(cena('O negrito deixa o texto forte.')), k);
});

test('mudar uma palavra da fala muda a chave', () => {
  assert.notEqual(chaveDaFala(cena('O negrito deixa o texto forte.')), chaveDaFala(cena('O negrito deixa o texto grosso.')));
});

test('mudar a voz muda a chave', () => {
  const c = cena('O negrito deixa o texto forte.');
  assert.notEqual(chaveDaFala(c, 'pf_dora'), chaveDaFala(c, 'pm_alex'));
  assert.equal(chaveDaFala(c), chaveDaFala(c, 'pf_dora'));
});

test('o campo voz substitui a fala no áudio', () => {
  assert.equal(chaveDaFala(cena('Tecle =SOMA(A1:A3)', 'Tecle a fórmula da soma')), chaveDaFala(cena('Tecle a fórmula da soma')));
});

test('duas escritas com o mesmo texto falável têm a mesma chave', () => {
  assert.equal(chaveDaFala(cena('Use Ctrl+N')), chaveDaFala(cena('Use control ene')));
});

test('grava só o que falta e devolve caminho e duração na ordem das cenas', async () => {
  const dir = pasta();
  const { gravar, pedidos } = gravadorFalso();
  const cenas = [cena('dez letras'), cena('vinte letras em fala')];
  const r = await gravarFalas(cenas, dir, { gravar });
  assert.deepEqual(pedidos, [['dez letras', 'vinte letras em fala']]);
  assert.equal(r.length, 2);
  assert.ok(existsSync(r[0].wav) && existsSync(r[1].wav));
  assert.equal(r[0].duracao, 1.0);
  assert.equal(r[1].duracao, 2.0);
});

test('segunda execução sem mudanças não chama o gravador', async () => {
  const dir = pasta();
  const { gravar, pedidos } = gravadorFalso();
  const cenas = [cena('dez letras')];
  await gravarFalas(cenas, dir, { gravar });
  await gravarFalas(cenas, dir, { gravar });
  assert.equal(pedidos.length, 1);
});

test('mudar uma palavra regrava só a cena mudada', async () => {
  const dir = pasta();
  const { gravar, pedidos } = gravadorFalso();
  await gravarFalas([cena('fala um'), cena('fala dois')], dir, { gravar });
  await gravarFalas([cena('fala um'), cena('fala três')], dir, { gravar });
  assert.deepEqual(pedidos[1], ['fala três']);
});

test('falas repetidas na mesma aula são gravadas uma vez', async () => {
  const dir = pasta();
  const { gravar, pedidos } = gravadorFalso();
  const r = await gravarFalas([cena('igual'), cena('igual')], dir, { gravar });
  assert.deepEqual(pedidos, [['igual']]);
  assert.equal(r[0].wav, r[1].wav);
});

test('o gravador recebe o texto falável, não o escrito', async () => {
  const { gravar, pedidos } = gravadorFalso();
  await gravarFalas([cena('Use Ctrl+N')], pasta(), { gravar });
  assert.deepEqual(pedidos, [['Use control ene']]);
});

test('se o gravador não produzir o áudio de uma cena, o erro diz qual', async () => {
  const gravar = async () => {};
  await assert.rejects(gravarFalas([cena('primeira'), cena('segunda')], pasta(), { gravar }), /cena 1.*primeira/s);
});
