import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { linhaDoTempo, juntarWav } from '../src/tempo.mjs';
import { lerWav, escreverWav } from '../src/wav.mjs';

const perto = (a, b) => assert.ok(Math.abs(a - b) < 1e-9, `${a} ≠ ${b}`);

test('cada cena dura o áudio mais a pausa, arredondado para cima ao décimo de segundo', () => {
  const l = linhaDoTempo([1.23, 2.0, 0.07]);
  [1.7, 2.4, 0.5].forEach((d, i) => perto(l[i].duracao, d));
  [0, 1.7, 4.1].forEach((s, i) => perto(l[i].inicio, s));
});

test('pausa e quadros por segundo são configuráveis', () => {
  const l = linhaDoTempo([1.0, 1.0], { pausa: 0, fps: 25 });
  perto(l[0].duracao, 1.0);
  perto(l[1].inicio, 1.0);
  perto(linhaDoTempo([1.01], { pausa: 0, fps: 25 })[0].duracao, 1.04);
});

test('em 600 cenas nenhuma duração foge do décimo de segundo e os inícios somam sem folga', () => {
  let semente = 12345;
  const sorteio = () => (semente = (semente * 1103515245 + 12345) % 2147483648) / 2147483648;
  const duracoes = Array.from({ length: 600 }, () => 0.3 + sorteio() * 25);
  const l = linhaDoTempo(duracoes);
  let soma = 0;
  l.forEach((c, i) => {
    const quadros = c.duracao * 10;
    assert.ok(Math.abs(quadros - Math.round(quadros)) < 1e-6, `cena ${i}: ${c.duracao}`);
    assert.ok(c.duracao >= duracoes[i] + 0.4 - 1e-9, 'a cena não pode ser mais curta que o áudio com a pausa');
    assert.ok(c.duracao < duracoes[i] + 0.4 + 0.1, 'a cena não pode sobrar mais que um quadro');
    perto(c.inicio, soma);
    soma = Math.round((soma + c.duracao) * 10) / 10;
  });
});

test('juntar dois áudios completa cada um com silêncio até a duração exata da cena', () => {
  const dir = mkdtempSync(join(tmpdir(), 'wav-'));
  const a = join(dir, 'a.wav'), b = join(dir, 'b.wav'), saida = join(dir, 'tudo.wav');
  escreverWav(a, new Int16Array(6000).fill(1000));   // 0,25 s
  escreverWav(b, new Int16Array(7440).fill(-2000));  // 0,31 s
  juntarWav([a, b], [0.7, 0.8], saida);
  const { taxa, amostras } = lerWav(saida);
  assert.equal(taxa, 24000);
  assert.equal(amostras.length, 36000);
  assert.equal(amostras[0], 1000);
  assert.equal(amostras[5999], 1000);
  assert.equal(amostras[6000], 0);
  assert.equal(amostras[16799], 0);
  assert.equal(amostras[16800], -2000);   // a segunda cena começa em 0,7 s exatos
  assert.equal(amostras[16800 + 7439], -2000);
  assert.equal(amostras[35999], 0);
});

test('áudio mais longo que a cena é erro, não corte silencioso', () => {
  const dir = mkdtempSync(join(tmpdir(), 'wav-'));
  const a = join(dir, 'a.wav');
  escreverWav(a, new Int16Array(24000));
  assert.throws(() => juntarWav([a], [0.5], join(dir, 'x.wav')), /cena 1/);
});
