#!/usr/bin/env python3
"""Grava a narração do desenho com voz neural (Kokoro, licença Apache 2.0) e gera ebook/historia-voz/<episodio>.js.

Preparo (uma vez):
    pip install kokoro-onnx soundfile num2words
    baixe kokoro-v1.0.onnx e voices-v1.0.bin de https://github.com/thewh1teagle/kokoro-onnx/releases (model-files-v1.0)
Uso:
    node falas.js > falas.json
    python gerar_voz.py falas.json --modelos PASTA_DOS_MODELOS [--voz pf_dora] [--so abertura,povos]
Só regrava as falas cujo texto mudou (compara o código de cada fala com o que já está gravado). Precisa do ffmpeg.
"""
import argparse, base64, json, os, re, subprocess, sys, tempfile
from num2words import num2words

RAIZ = os.path.dirname(os.path.abspath(__file__))
SAIDA = os.path.normpath(os.path.join(RAIZ, '..', '..', 'historia-voz'))

# como dizer em voz alta o que a escrita não mostra
ORDINAIS = {'I': 'primeiro', 'II': 'segundo', 'III': 'terceiro', 'IV': 'quarto', 'V': 'quinto', 'VI': 'sexto'}
SECULOS = {'XVI': 'dezesseis', 'XVII': 'dezessete', 'XVIII': 'dezoito', 'XIX': 'dezenove', 'XX': 'vinte', 'XXI': 'vinte e um'}
LEXICO = [  # (escrita, pronúncia aproximada em português)
    (r'\bWIC\b', 'dáblio i cê'), (r'\bPMPE\b', 'pê eme pê é'), (r'\bMCP\b', 'eme cê pê'), (r'\bAOCP\b', 'a ó cê pê'),
    (r'\bHendrick Lonck\b', 'Rêndric Lônc'), (r'\bJames Lancaster\b', 'Djêimes Lancáster'), (r'\bLancaster\b', 'Lancáster'),
    (r'\bFrans Post\b', 'Frâns Pôst'), (r'\bAlbert Eckhout\b', 'Álbert Écraut'), (r'\bMarcgraf\b', 'Marcgrave'),
    (r'\bKahal Zur Israel\b', 'Carrál Zur Israel'), (r'\bLord Cochrane\b', 'Lórde Cócrane'), (r'\bTyphis\b', 'Tífis'),
    (r'\bYaathe\b', 'Iatê'), (r'\bXukuru\b', 'Xucurú'), (r'\bPankararu\b', 'Pancararú'), (r'\bFulni-ô\b', 'Fulniô'),
    (r'\bPinzón\b', 'Pinzôn'), (r'\bhip-hop\b', 'rípi rópi'), (r'\brock\b', 'róqui'), (r'\bmanguebeat\b', 'mângue bíti'),
    (r'\bChico Science\b', 'Chico Sáiens'), (r'\bLyra\b', 'Lira'), (r'\bArraes\b', 'Arráis'), (r'\bHelder\b', 'Élder'),
    (r'\bFreyre\b', 'Freire'), (r'\bparanã-puka\b', 'paranã púca'), (r'\bJ\. Borges\b', 'Jota Borges'), (r'\bExu\b', 'Echú'),
    (r'\bafoxé\b', 'afoché'), (r'\bHaia\b', 'Áia'), (r'\bUnesco\b', 'Unésco'), (r'\bSuape\b', 'Suápe'),
    (r'\bItem\b', 'Ítem'), (r'\bitens\b', 'ítens'),
]

def numero(m):
    return num2words(int(m.group(0)), lang='pt_BR').replace(',', '')

def falavel(t):
    t = re.sub(r'[“”"‘’]', '', t)
    t = t.replace('→', ', depois, ').replace('×', ' contra ').replace(' = ', ' é igual a ')
    t = re.sub(r'\s*\(([^)]*)\)', r', \1,', t)
    t = re.sub(r'(\d{4})\s*[–-]\s*(\d{2,4})', r'\1 a \2', t)
    t = re.sub(r'\b1º', 'primeiro', t)
    t = re.sub(r'\b(séculos?) (X[XVI]*)\b', lambda m: m.group(1) + ' ' + SECULOS.get(m.group(2), m.group(2)), t, flags=re.I)
    t = re.sub(r'\b(João|Pedro|Filipe) (I{1,3}|IV|VI?)\b', lambda m: m.group(1) + ' ' + ORDINAIS[m.group(2)], t)
    for pad, fala in LEXICO:
        t = re.sub(pad, fala, t, flags=re.I if pad.islower() else 0)
    t = re.sub(r'\d+', numero, t)
    t = re.sub(r',\s*([.,;:!?])', r'\1', t)
    return re.sub(r'\s+', ' ', t).strip()

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('falas'); ap.add_argument('--modelos', required=True); ap.add_argument('--voz', default='pf_dora')
    ap.add_argument('--so', default=''); ap.add_argument('--velocidade', type=float, default=1.0); ap.add_argument('--kbps', type=int, default=32)
    ap.add_argument('--saida', default=SAIDA); ap.add_argument('--texto', action='store_true', help='só mostra o texto falável')
    a = ap.parse_args()
    falas = json.load(open(a.falas, encoding='utf-8'))
    if a.texto:
        for f in falas: print(f['id'], f['key'], '|', falavel(f['text']))
        return
    import numpy as np, soundfile as sf
    from kokoro_onnx import Kokoro
    tts = Kokoro(os.path.join(a.modelos, 'kokoro-v1.0.onnx'), os.path.join(a.modelos, 'voices-v1.0.bin'))
    os.makedirs(a.saida, exist_ok=True)
    so = set(filter(None, a.so.split(',')))
    eps = {}
    for f in falas: eps.setdefault(f['id'], []).append(f)
    total = 0.0
    for ep, lista in eps.items():
        if so and ep not in so: continue
        arq = os.path.join(a.saida, ep + '.js'); velho = {}
        if os.path.exists(arq):
            try: velho = json.loads(re.search(r'VOZ_LOAD\("[^"]+",(\{.*\})\);?\s*$', open(arq, encoding='utf-8').read(), re.S).group(1))
            except Exception: velho = {}
        novo = {'v': a.voz}
        for f in lista:
            ant = velho.get(f['key'])
            if ant and ant[0] == f['hash'] and velho.get('v') == a.voz:
                novo[f['key']] = ant; continue
            amostras, taxa = tts.create(falavel(f['text']), voice=a.voz, speed=a.velocidade, lang='pt-br')
            amostras = np.concatenate([np.zeros(int(taxa * .06), dtype=amostras.dtype), amostras, np.zeros(int(taxa * .12), dtype=amostras.dtype)])
            total += len(amostras) / taxa
            with tempfile.TemporaryDirectory() as tmp:
                wav, mp3 = os.path.join(tmp, 'a.wav'), os.path.join(tmp, 'a.mp3')
                sf.write(wav, amostras, taxa)
                subprocess.run(['ffmpeg', '-v', 'error', '-y', '-i', wav, '-af', 'loudnorm=I=-17:TP=-1.5:LRA=11', '-ac', '1', '-ar', '24000', '-c:a', 'libmp3lame', '-b:a', f'{a.kbps}k', mp3], check=True)
                novo[f['key']] = [f['hash'], base64.b64encode(open(mp3, 'rb').read()).decode()]
        with open(arq, 'w', encoding='utf-8') as o:
            o.write('VOZ_LOAD(' + json.dumps(ep) + ',' + json.dumps(novo, separators=(',', ':')) + ');\n')
        print(f'{ep}: {len(lista)} falas, {os.path.getsize(arq) // 1024} KB', flush=True)
    print(f'gravado agora: {total / 60:.1f} min')

if __name__ == '__main__':
    main()
