#!/usr/bin/env python3
"""Gera a videoaula (2 partes em MP4) a partir dos dois PDFs de slides.

Uso:  python3 gerar.py PARTE1.pdf PARTE2.pdf [pasta_de_trabalho]

Precisa de: poppler-utils (pdftotext, pdftoppm), ffmpeg, Pillow, numpy e do
sintetizador RHVoice com a voz brasileira
(apt install rhvoice rhvoice-brazilian-portuguese).
"""
import hashlib
import os
import subprocess
import sys
import wave
from concurrent.futures import ThreadPoolExecutor

import numpy as np
from PIL import Image, ImageDraw, ImageFont

import roteiro

AQUI = os.path.dirname(os.path.abspath(__file__))
W, H, ESC = 1280, 720, 1280 / 960  # pontos do PDF -> pixels
TAXA = 24000
OURO, BRANCO, CINZA = (233, 187, 83), (247, 245, 240), (200, 198, 192)
VOZ = "Leticia-F123"
FONTE = "/usr/share/fonts/truetype/liberation/LiberationSans-%s.ttf"

# Resolução da questão 60: o PDF termina no enunciado, então esta foi escrita para a videoaula.
R60 = {
    "sub": "Jellinek e status activus · Resolução elaborada para a videoaula",
    "gab": "E",
    "gabtxt": "O acesso à função pública pode integrar o cidadão ao exercício de atribuições estatais.",
    "alts": [
        "Exigir prestação do Estado é próprio do status positivo, ou civitatis. O acesso ao cargo envolve "
        "participar da atuação estatal, e não apenas receber um serviço.",
        "A abstenção estatal na esfera privada caracteriza o status negativo. O concurso dá acesso a uma função "
        "pública e está fora desse campo.",
        "Deveres e sujeição compõem o status passivo. Ter deveres funcionais não transforma o direito de acesso "
        "ao cargo em mera sujeição.",
        "A remuneração é consequência do vínculo funcional. O status activus diz respeito à participação do "
        "cidadão na atividade do Estado.",
        "No status activus, o cidadão participa da formação e do exercício da vontade estatal. Votar, ser votado "
        "e ocupar cargo público são exemplos, o que explica a ligação com a acessibilidade aos cargos.",
    ],
}

ABERTURA = [
    "Olá! Esta é a videoaula de Direitos Humanos da Turma Avançada, preparatória para a Polícia Militar de Pernambuco. "
    "Vamos resolver, uma a uma, as sessenta questões comentadas do material do professor Daniel Cândido. "
    "Esta é a parte um, com as questões de um a trinta. "
    "Em cada questão, eu leio o enunciado e as alternativas. Você pausa o vídeo, marca a sua resposta, "
    "e em seguida comentamos letra por letra, começando pelo gabarito. Vamos lá.",
    "Parte dois da videoaula de Direitos Humanos da Turma Avançada, preparatória para a Polícia Militar de Pernambuco. "
    "Agora vamos resolver as questões de trinta e um a sessenta, no mesmo formato: "
    "enunciado, alternativas, uma pausa para você responder, e o comentário letra por letra. Vamos lá.",
]
FECHO = [
    "Com isso, fechamos a parte um, com as trinta primeiras questões. "
    "Anote as que você errou e revise o tema de cada uma. Na parte dois, seguimos da questão trinta e um até a sessenta. Até lá.",
    "E assim terminamos as sessenta questões. Revise os temas das questões que você errou, "
    "refaça essas questões daqui a alguns dias, e bons estudos.",
]


def rodar(*cmd, **kw):
    subprocess.run(cmd, check=True, **kw)


# ---------------------------------------------------------------- voz

def sintetizar(txt, pasta):
    arq = os.path.join(pasta, hashlib.sha1(txt.encode()).hexdigest()[:16] + ".wav")
    if not os.path.exists(arq):
        rodar("RHVoice-test", "-p", VOZ, "-R", str(TAXA), "-o", arq + ".tmp", input=txt.encode(), stderr=subprocess.DEVNULL)
        os.rename(arq + ".tmp", arq)
    return arq


def amostras(arq):
    with wave.open(arq) as w:
        assert (w.getframerate(), w.getnchannels(), w.getsampwidth()) == (TAXA, 1, 2), arq
        return np.frombuffer(w.readframes(w.getnframes()), dtype=np.int16)


# ---------------------------------------------------------------- imagens

def fonte(negrito, tam):
    return ImageFont.truetype(FONTE % ("Bold" if negrito else "Regular"), tam)


def destacar(img, box):
    """Realça a caixa (em pontos do PDF) com fundo dourado translúcido e barra lateral."""
    if box is None:
        return img
    x0, y0, x1, y1 = box
    r = [int(40 * ESC), int((y0 - 5) * ESC), int(622 * ESC), int((y1 + 5) * ESC)]
    camada = Image.new("RGBA", img.size, (0, 0, 0, 0))
    d = ImageDraw.Draw(camada)
    d.rounded_rectangle(r, radius=8, fill=OURO + (38,), outline=OURO + (150,), width=2)
    d.rounded_rectangle([r[0] - 9, r[1], r[0] - 4, r[3]], radius=2, fill=OURO + (255,))
    return Image.alpha_composite(img.convert("RGBA"), camada).convert("RGB")


def quebrar(d, txt, fnt, largura):
    linhas, atual = [], ""
    for p in txt.split():
        if atual and d.textlength(atual + " " + p, font=fnt) > largura:
            linhas.append(atual)
            atual = p
        else:
            atual = (atual + " " + p).strip()
    return linhas + [atual]


def slide_r60(resolucoes):
    """Monta o slide 'RESOLUÇÃO 60' no mesmo visual: o fundo é o que há de comum entre os slides de resolução."""
    pilha = np.stack([np.asarray(Image.open(a).convert("RGB")) for a in resolucoes])
    img = Image.fromarray(np.percentile(pilha, 10, axis=0).astype(np.uint8))
    d = ImageDraw.Draw(img)
    for r in ((296, 124, 420, 174), (176, 212, 222, 248), (56, 264, 140, 282)):  # restos de número, letra e filete
        d.rectangle(r, fill=(6, 6, 6))
    d.line((64, 273, 131, 273), fill=OURO, width=1)
    d.text((304, 127), "60", font=fonte(True, 37), fill=OURO)
    d.text((64, 181), R60["sub"], font=fonte(False, 17), fill=CINZA)
    d.text((180, 214), R60["gab"], font=fonte(True, 22), fill=OURO)
    corpo, alt = fonte(False, 20), 23.5
    y = 217
    for l in quebrar(d, R60["gabtxt"], corpo, 588):
        d.text((230, y), l, font=corpo, fill=BRANCO)
        y += alt
    gabbox = (48, 217 / ESC, 613, y / ESC)
    y = 290
    alts = []
    for L, t in zip(roteiro.LETRAS, R60["alts"]):
        y0 = y
        d.text((64, y), L + ")", font=fonte(True, 20), fill=OURO)
        for l in quebrar(d, t, corpo, 715):
            d.text((103, y), l, font=corpo, fill=BRANCO)
            y += alt
        alts.append({"txt": t, "box": (48, y0 / ESC, 613, (y - 2) / ESC)})
        y += 12
    return img, {"tipo": "r", "n": 60, "sub": R60["sub"].split(" · ")[0], "gab": "E", "gabbox": gabbox, "alts": alts}


# ---------------------------------------------------------------- montagem

def main():
    pdfs = sys.argv[1:3]
    trab = sys.argv[3] if len(sys.argv) > 3 else os.path.join(AQUI, ".trabalho")
    for sub in ("pag", "voz", "quadros"):
        os.makedirs(os.path.join(trab, sub), exist_ok=True)

    # 1. páginas -> imagens + estrutura
    itens = []  # (imagem, página analisada)
    for k, pdf in enumerate(pdfs):
        base = os.path.join(trab, "pag", "ab"[k])
        if not os.path.exists(base + "-60.png"):
            rodar("pdftoppm", "-png", "-scale-to-x", str(W), "-scale-to-y", str(H), pdf, base)
        for i, linhas in enumerate(roteiro.paginas(pdf)):
            itens.append((f"{base}-{i + 1:02d}.png", roteiro.analisar(linhas)))
    capa = itens[0][0]
    itens = [it for it in itens if it[1]["tipo"] != "capa"]
    if not any(p["tipo"] == "r" and p["n"] == 60 for _, p in itens):
        img, p = slide_r60([a for a, q in itens if q["tipo"] == "r"])
        arq = os.path.join(trab, "pag", "r60.png")
        img.save(arq)
        itens.append((arq, p))
    assert sorted((p["n"], p["tipo"]) for _, p in itens) == [(n, t) for n in range(1, 61) for t in "qr"]

    # 2. lista de cenas de cada parte: (imagem, caixa, narração, pausa, capítulo)
    partes = [[(capa, None, ABERTURA[k], 0.8, "Abertura")] for k in (0, 1)]
    for arq, p in itens:
        k = 0 if p["n"] <= 30 else 1
        for j, (txt, box, pausa) in enumerate(roteiro.cenas(p)):
            cap = f"Questão {p['n']:02d}" if p["tipo"] == "q" and j == 0 else None
            partes[k].append((arq, box, txt, pausa, cap))
    for k in (0, 1):
        partes[k].append((capa, None, FECHO[k], 1.5, "Encerramento"))

    # 3. voz
    textos = sorted({c[2] for parte in partes for c in parte})
    with ThreadPoolExecutor(os.cpu_count()) as ex:
        wavs = dict(zip(textos, ex.map(lambda t: sintetizar(t, os.path.join(trab, "voz")), textos)))

    # 4. quadros, áudio e vídeo de cada parte
    for k, parte in enumerate(partes):
        nome = f"direitos-humanos-pmpe-parte{k + 1}"
        audio, lista, caps, t = [], [], [], 0.0
        for i, (arq, box, txt, pausa, cap) in enumerate(parte):
            som = amostras(wavs[txt])
            som = np.concatenate([som, np.zeros(int(pausa * TAXA), np.int16)])
            quadro = os.path.join(trab, "quadros", f"p{k + 1}-{i:04d}.png")
            destacar(Image.open(arq).convert("RGB"), box).save(quadro, compress_level=1)
            if cap:
                caps.append((t, cap))
            lista.append((quadro, len(som) / TAXA))
            audio.append(som)
            t += len(som) / TAXA
        wav = os.path.join(trab, nome + ".wav")
        with wave.open(wav, "wb") as w:
            w.setparams((1, 2, TAXA, 0, "NONE", "NONE"))
            w.writeframes(np.concatenate(audio).tobytes())
        with open(os.path.join(trab, nome + ".txt"), "w") as f:
            for quadro, dur in lista:
                f.write(f"file '{quadro}'\nduration {dur:.6f}\n")
            f.write(f"file '{lista[-1][0]}'\n")
        meta = os.path.join(trab, nome + ".meta")
        with open(meta, "w") as f:
            f.write(f";FFMETADATA1\ntitle=Direitos Humanos PMPE - Turma Avançada - 60 questões comentadas (parte {k + 1})\n")
            for (ini, cap), fim in zip(caps, [c[0] for c in caps[1:]] + [t]):
                f.write(f"[CHAPTER]\nTIMEBASE=1/1000\nSTART={int(ini * 1000)}\nEND={int(fim * 1000)}\ntitle={cap}\n")
        with open(os.path.join(AQUI, nome + "-capitulos.txt"), "w") as f:
            for ini, cap in caps:
                s = int(ini)
                f.write(f"{s // 3600}:{s % 3600 // 60:02d}:{s % 60:02d} {cap}\n")
        rodar("ffmpeg", "-y", "-loglevel", "error", "-f", "concat", "-safe", "0", "-i", os.path.join(trab, nome + ".txt"),
              "-i", wav, "-i", meta, "-map", "0:v", "-map", "1:a", "-map_metadata", "2", "-map_chapters", "2",
              "-vf", "fps=5,format=yuv420p", "-c:v", "libx264", "-preset", "medium", "-tune", "stillimage", "-crf", "29",
              "-g", "150", "-c:a", "aac", "-b:a", "32k", "-ar", str(TAXA), "-movflags", "+faststart", "-shortest",
              os.path.join(AQUI, nome + ".mp4"))
        print(f"{nome}.mp4  {int(t) // 60} min {int(t) % 60} s  ({len(parte)} cenas)")


if __name__ == "__main__":
    main()
