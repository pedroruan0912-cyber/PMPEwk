#!/usr/bin/env python3
"""Grava falas com voz neural (Kokoro, licença Apache 2.0), uma por arquivo WAV.

Entrada (stdin): JSON [{"chave": "...", "texto": "..."}]
Saída: <saida>/<chave>.wav (24 kHz, mono, PCM 16 bits) e, no stdout, um JSON {chave: segundos}.
Mesma voz e mesmo volume do desenho de História (ebook/historia-src/voz/gerar_voz.py).
"""
import argparse, json, os, re, subprocess, sys, tempfile


def por_extenso(texto):
    from num2words import num2words
    return re.sub(r'\d+', lambda m: num2words(int(m.group(0)), lang='pt_BR').replace(',', ''), texto)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--modelos', required=True)
    ap.add_argument('--saida', required=True)
    ap.add_argument('--voz', default='pf_dora')
    ap.add_argument('--velocidade', type=float, default=1.0)
    a = ap.parse_args()

    modelo, vozes = os.path.join(a.modelos, 'kokoro-v1.0.onnx'), os.path.join(a.modelos, 'voices-v1.0.bin')
    if not (os.path.isfile(modelo) and os.path.isfile(vozes)):
        print(f'Modelos de voz não encontrados em {a.modelos}. Rode videoaulas/build.sh com internet.', file=sys.stderr)
        return 2

    falas = json.load(sys.stdin)
    import numpy as np, soundfile as sf
    from kokoro_onnx import Kokoro
    tts = Kokoro(modelo, vozes)
    os.makedirs(a.saida, exist_ok=True)
    duracoes = {}
    for i, f in enumerate(falas, 1):
        amostras, taxa = tts.create(por_extenso(f['texto']), voice=a.voz, speed=a.velocidade, lang='pt-br')
        amostras = np.concatenate([np.zeros(int(taxa * .06), dtype=amostras.dtype), amostras, np.zeros(int(taxa * .12), dtype=amostras.dtype)])
        destino = os.path.join(a.saida, f['chave'] + '.wav')
        with tempfile.TemporaryDirectory() as tmp:
            bruto, pronto = os.path.join(tmp, 'bruto.wav'), os.path.join(tmp, 'pronto.wav')
            sf.write(bruto, amostras, taxa)
            subprocess.run(['ffmpeg', '-v', 'error', '-y', '-i', bruto, '-af', 'loudnorm=I=-17:TP=-1.5:LRA=11',
                            '-ac', '1', '-ar', '24000', '-c:a', 'pcm_s16le', pronto], check=True)
            os.replace(pronto, destino)  # só aparece no cache quando está inteiro
        duracoes[f['chave']] = sf.info(destino).duration
        print(f'  voz {i}/{len(falas)}', file=sys.stderr, flush=True)
    json.dump(duracoes, sys.stdout)
    return 0


if __name__ == '__main__':
    sys.exit(main())
