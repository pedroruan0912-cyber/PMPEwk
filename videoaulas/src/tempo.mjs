// Linha do tempo de uma aula: quanto dura cada cena e onde ela começa.
// Toda duração é um número inteiro de quadros, e o áudio é completado com silêncio até
// exatamente a mesma duração; assim imagem e som não se afastam ao longo da aula.
import { lerWav, escreverWav, TAXA } from './wav.mjs';

export function linhaDoTempo(duracoes, { pausa = 0.4, fps = 10 } = {}) {
  let quadroInicial = 0;
  return duracoes.map((d) => {
    // O 1e-9 evita que 2,4 s vire 25 quadros por erro de ponto flutuante.
    const quadros = Math.max(1, Math.ceil((d + pausa) * fps - 1e-9));
    const cena = { inicio: quadroInicial / fps, duracao: quadros / fps };
    quadroInicial += quadros;
    return cena;
  });
}

export function juntarWav(wavs, duracoes, saida) {
  const total = duracoes.reduce((s, d) => s + Math.round(d * TAXA), 0);
  const tudo = new Int16Array(total);
  let pos = 0;
  wavs.forEach((arq, i) => {
    const { taxa, amostras } = lerWav(arq);
    if (taxa !== TAXA) throw new Error(`cena ${i + 1}: áudio em ${taxa} Hz, esperado ${TAXA}`);
    const espaco = Math.round(duracoes[i] * TAXA);
    if (amostras.length > espaco) throw new Error(`cena ${i + 1}: o áudio (${(amostras.length / TAXA).toFixed(2)} s) é mais longo que a cena (${duracoes[i]} s)`);
    tudo.set(amostras, pos);
    pos += espaco;
  });
  escreverWav(saida, tudo);
}
