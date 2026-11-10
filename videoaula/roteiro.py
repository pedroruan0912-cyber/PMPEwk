#!/usr/bin/env python3
"""Lê os dois PDFs de slides (60 questões + resoluções) e monta o roteiro da videoaula.

Cada página vira uma lista de "cenas": um trecho de narração e, quando houver,
o retângulo do slide que deve ficar em destaque enquanto o trecho é falado.
"""
import re
import subprocess
import xml.etree.ElementTree as ET

LETRAS = "ABCDE"

# ---------------------------------------------------------------- leitura do PDF


def paginas(pdf):
    """Devolve, para cada página, a lista de linhas; cada linha é uma lista de palavras
    (texto, x0, y0, x1, y1) em pontos (página 960 x 540)."""
    xml = subprocess.run(["pdftotext", "-bbox", pdf, "-"], capture_output=True, text=True, check=True).stdout
    xml = re.sub(r"<!DOCTYPE[^>]*>", "", xml).replace(' xmlns="http://www.w3.org/1999/xhtml"', "")
    out = []
    for pg in ET.fromstring(xml).iter("page"):
        ws = [(w.text or "", float(w.get("xMin")), float(w.get("yMin")), float(w.get("xMax")), float(w.get("yMax")))
              for w in pg.iter("word")]
        ws.sort(key=lambda w: (w[2], w[1]))
        linhas = []
        for w in ws:
            if linhas and abs(linhas[-1][0][2] - w[2]) < 4:
                linhas[-1].append(w)
            else:
                linhas.append([w])
        for l in linhas:
            l.sort(key=lambda w: w[1])
        out.append(linhas)
    return out


def texto(linha):
    return " ".join(w[0] for w in linha)


def caixa(linhas):
    ws = [w for l in linhas for w in l]
    return (min(w[1] for w in ws), min(w[2] for w in ws), max(w[3] for w in ws), max(w[4] for w in ws))


def analisar(linhas):
    """Classifica a página e separa enunciado, alternativas e comentários."""
    linhas = [l for l in linhas if texto(l) not in ("cppem.com.br", "PMPE · TURMA AVANÇADA")
              and not texto(l).startswith("Consultar a questão")]
    titulo = texto(linhas[0])
    m = re.match(r"(QUESTÃO|RESOLUÇÃO) (\d+)", titulo)
    if not m:
        return {"tipo": "capa"}
    p = {"tipo": "q" if m.group(1) == "QUESTÃO" else "r", "n": int(m.group(2)), "sub": texto(linhas[1])}
    corpo = linhas[2:]
    ini = [i for i, l in enumerate(corpo) if re.fullmatch(r"[A-E]\)", l[0][0]) and l[0][1] < 55]
    assert [corpo[i][0][0][0] for i in ini] == list(LETRAS), (titulo, [texto(corpo[i]) for i in ini])
    cab = corpo[:ini[0]]
    p["alts"] = []
    for k, i in enumerate(ini):
        bloco = corpo[i:(ini[k + 1] if k < 4 else len(corpo))]
        p["alts"].append({"txt": " ".join(texto(l) for l in bloco)[2:].strip(), "box": caixa(bloco)})
    if p["tipo"] == "q":
        p["linhas"] = [texto(l) for l in cab]
    else:
        g = texto(cab[0]).split()
        assert g[0] == "GABARITO" and g[1] in LETRAS, titulo
        p["gab"] = g[1]
        p["gabbox"] = caixa(cab)
    return p


# ---------------------------------------------------------------- texto -> fala

UNID = "zero um dois três quatro cinco seis sete oito nove dez onze doze treze quatorze quinze dezesseis dezessete dezoito dezenove".split()
DEZ = "_ _ vinte trinta quarenta cinquenta sessenta setenta oitenta noventa".split()
CEN = "_ cento duzentos trezentos quatrocentos quinhentos seiscentos setecentos oitocentos novecentos".split()
ORD_M = {1: "primeiro", 2: "segundo", 3: "terceiro", 4: "quarto", 5: "quinto", 6: "sexto", 7: "sétimo", 8: "oitavo", 9: "nono"}
ORD_F = {1: "primeira", 2: "segunda", 3: "terceira", 4: "quarta", 5: "quinta"}
ROM = {"I": 1, "V": 5, "X": 10, "L": 50, "C": 100}


def extenso(n):
    if n < 20:
        return UNID[n]
    if n < 100:
        return DEZ[n // 10] + (" e " + UNID[n % 10] if n % 10 else "")
    if n == 100:
        return "cem"
    if n < 1000:
        return CEN[n // 100] + (" e " + extenso(n % 100) if n % 100 else "")
    mil, r = divmod(n, 1000)
    s = ("mil" if mil == 1 else extenso(mil) + " mil")
    if r:
        s += (" e " if r < 100 or r % 100 == 0 else " ") + extenso(r)
    return s


def romano(s):
    v = [ROM[c] for c in s]
    return sum(-x if i + 1 < len(v) and v[i + 1] > x else x for i, x in enumerate(v))


FIXOS = [
    (r" \(DUDH\)", ""), (r"\bDUDH\b", "Declaração Universal"), (r"\bOIT\b", "ó i tê"), (r"\bTPI\b", "Tribunal Penal Internacional"),
    (r"\bRE (?=\d)", "Recurso Extraordinário "), (r"\bAfonso IX\b", "Afonso nono"), (r"\bséculo XVIII\b", "século dezoito"),
    (r"\bsoft law\b", "sóft ló"), (r"\bopinio juris\b", "opínio iúris"), (r"\bBill of Rights\b", "Bíl óv Ráits"),
    (r"\bPetition of Right\b", "Petíchon óv Ráit"), (r"\bHabeas Corpus Act\b", "Ábeas Córpus Áct"),
    (r"\bAct of Settlement\b", "Áct óv Sétolment"), (r"\bSettlement\b", "Sétolment"), (r"\bJellinek\b", "Iélinek"),
    (r"\bstatus activus\b", "státus ativus"), (r"\b[Ss]tatus\b", "státus"), (r"\bcivitatis\b", "civitátis"),
    (r"\bDonnelly\b", "Dóneli"), (r"\bParekh\b", "Parék"), (r"\bBhikhu\b", "Bíku"), (r"An-\s*Na’im", "An Naím"),
    (r"\bAbdullahi\b", "Abdulárri"), (r"\bBobbio\b", "Bóbio"), (r"\bGouges\b", "Gúje"), (r"\bOlympe\b", "Olémp"),
    (r"\bLocke\b", "Lóque"), (r"\bWeimar\b", "Váimar"), (r"\bGrotius\b", "Grócius"), (r"\bRousseau\b", "Russô"),
    (r"\bMontesquieu\b", "Montesquiê"), (r"\bAmartya\b", "Amártia"), (r"\bkelseniana\b", "kelseniâna"),
    (r"\bDecreta\b", "Decréta"), (r"\bpólis\b", "pólis"),
]


def falar(s, vf=False):
    """Converte o texto do slide em texto para o sintetizador de voz."""
    s = re.sub(r"\s+", " ", s).strip()
    for a, b in FIXOS:
        s = re.sub(a, b, s)
    s = re.sub(r"\((V|F)\)", "", s)
    if vf:  # sequências "V, F, V" das questões de verdadeiro ou falso
        s = re.sub(r"\b[VF](, [VF])+\b", lambda m: m.group(0).replace("V", "verdadeiro").replace("F", "falso"), s)
    s = re.sub(r"\b([IVX]+)–(\d)\b", lambda m: f"{extenso(romano(m.group(1)))} com {extenso(int(m.group(2)))}", s)
    s = re.sub(r"\barts\. ", "artigos ", s)
    s = re.sub(r"\bart\. ", "artigo ", s)
    s = s.replace("§", "parágrafo")
    # "art. 1º, III" -> "artigo primeiro, inciso três"
    s = re.sub(r"(artigo \d+º?, )(?=[IVXL]+\b)", r"\1inciso ", s)
    s = re.sub(r"\b(\d)º", lambda m: ORD_M[int(m.group(1))], s)
    s = re.sub(r"\b(\d)ª", lambda m: ORD_F[int(m.group(1))], s)
    s = re.sub(r"\b(\d{1,3})\.(\d{3})\b", r"\1\2", s)
    s = re.sub(r"\d+", lambda m: extenso(int(m.group(0))), s)
    s = re.sub(r"\b[IVXL]+\b", lambda m: extenso(romano(m.group(0))) if m.group(0) != "L" else "L", s)
    s = s.replace(" · ", ", ").replace("–", ", ").replace("INCORRETA", "incorreta")
    return s


FONTES = {
    "PMPE": "Polícia Militar de Pernambuco,", "PMPR": "Polícia Militar do Paraná,", "PMES": "Polícia Militar do Espírito Santo,",
    "PMDF": "Polícia Militar do Distrito Federal,", "PC-PA": "Polícia Civil do Pará,", "SEJUSP-MG": "Sejúsp de Minas Gerais,",
    "SEJUS-CE": "Sejús do Ceará,", "DEPPEN-PR": "Departamento de Polícia Penal do Paraná,",
    "TRF2": "Tribunal Regional Federal da segunda região,", "Polícia Penal DF": "Polícia Penal do Distrito Federal,",
}


def fonte(sub):
    if sub.startswith("Questão autoral"):
        return "Questão autoral."
    cargo = sub.split(" · ")[1]
    for a, b in FONTES.items():
        cargo = cargo.replace(a, b)
    ano = re.search(r"\b(20\d\d)\b", cargo).group(1)
    cargo = re.sub(r",? ?\b20\d\d\b", "", cargo).replace(", Contabilidade", "").strip()
    return falar(f"Questão adaptada do Instituto a ó cê pê, {cargo}, prova de {ano}.")


def enunciado(linhas, vf):
    """Junta as linhas do enunciado, anunciando os itens I, II, III... e 1, 2, 3."""
    partes = []
    for l in linhas:
        m = re.match(r"([IVX]+)\. (.*)", l)
        n = re.match(r"(\d)\. (.*)", l)
        if m:
            partes.append(f". Item {extenso(romano(m.group(1)))}: {m.group(2)}")
        elif n:
            partes.append(f". Número {extenso(int(n.group(1)))}: {n.group(2)}")
        else:
            partes.append(" " + l)
    return falar(re.sub(r"\.\s*\.", ".", "".join(partes)), vf)


def cenas(p):
    """Lista de (narração, caixa em destaque ou None, pausa depois em segundos)."""
    n = extenso(p["n"])
    vf = p["tipo"] != "capa" and any(re.fullmatch(r"[VF](, [VF])+\.", a["txt"]) for a in p.get("alts", []))
    if p["tipo"] == "q":
        c = [(f"Questão {n}. {fonte(p['sub'])} {enunciado(p['linhas'], vf)}", None, 0.5)]
        c += [(f"Letra {L}. {falar(a['txt'], vf)}", a["box"], 0.35) for L, a in zip(LETRAS, p["alts"])]
        c.append(("Se quiser, pause o vídeo e marque a sua resposta.", None, 2.5))
        return c
    tema = p["sub"].split(" · ")
    aviso = " Atenção: o enunciado pede a alternativa incorreta." if len(tema) > 1 else ""
    g = p["gab"]
    c = [(f"Resolução da questão {n}. Tema: {falar(tema[0])}.{aviso} O gabarito é a letra {g}.", p["gabbox"], 0.5)]
    for L, a in zip(LETRAS, p["alts"]):
        rot = f"Letra {L}, o nosso gabarito." if L == g else f"Letra {L}."
        c.append((f"{rot} {falar(a['txt'], vf)}", a["box"], 0.4))
    c[-1] = (c[-1][0], c[-1][1], 1.2)
    return c


if __name__ == "__main__":
    import sys
    for pdf in sys.argv[1:]:
        for linhas in paginas(pdf):
            p = analisar(linhas)
            if p["tipo"] == "capa":
                continue
            print(f"\n=== {p['tipo'].upper()} {p['n']:02d}" + (f"  gabarito {p['gab']}" if p["tipo"] == "r" else ""))
            for t, box, _ in cenas(p):
                print("  ", t)
