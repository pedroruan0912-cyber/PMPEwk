#!/usr/bin/env python3
"""Gera projeto-casa-9x30/index.html: estudo preliminar de um sobrado moderno
em lote de 9 x 30 m (plantas, fachada, perspectiva, quadro de áreas e memorial).

Coordenadas de projeto (em metros):
  x = largura do lote (0 = divisa esquerda, 9 = divisa direita, olhando da rua)
  y = profundidade   (0 = alinhamento da rua, 30 = fundo do lote)
  z = altura

Para mudar o projeto, edite as listas de ambientes, paredes e aberturas e rode:
  python3 projeto-casa-9x30/gerar_projeto.py
"""
import math
from pathlib import Path

AQUI = Path(__file__).resolve().parent

# ---------------------------------------------------------------- utilidades
S = 34            # px por metro nas plantas
MX, MY = 110, 104   # margens da planta
PLAN_W = MX + 30 * S + 46
PLAN_H = MY + 9 * S + 64

COR = {
    "soc": "#f4ece0", "int": "#e6edf4", "wet": "#dcefeb", "circ": "#f1f1ef",
    "serv": "#ece8f1", "ext": "#efe3cf", "deck": "#d8bb8e", "grama": "#d8ead0",
    "pisc": "#9fd4e8", "piso": "#e1e2dc", "parede": "#2b2b2b", "linha": "#4a4a4a",
}


def f(v):
    return f"{v:.1f}"


def P(x, y):
    """Ponto do projeto -> ponto da planta (rua à esquerda)."""
    return (MX + y * S, MY + x * S)


def attrs(a):
    return " ".join(f'{k.replace("_", "-")}="{v}"' for k, v in a.items())


def R(x0, x1, y0, y1, **a):
    sx, sy = P(x0, y0)
    return (f'<rect x="{f(sx)}" y="{f(sy)}" width="{f((y1 - y0) * S)}" '
            f'height="{f((x1 - x0) * S)}" {attrs(a)}/>')


def L(x0, y0, x1, y1, **a):
    a.setdefault("stroke", COR["linha"])
    a.setdefault("stroke_width", 1)
    (ax, ay), (bx, by) = P(x0, y0), P(x1, y1)
    return f'<line x1="{f(ax)}" y1="{f(ay)}" x2="{f(bx)}" y2="{f(by)}" {attrs(a)}/>'


def C(x, y, r, **a):
    sx, sy = P(x, y)
    return f'<circle cx="{f(sx)}" cy="{f(sy)}" r="{f(r * S)}" {attrs(a)}/>'


def T(x, y, txt, size=11, weight=400, fill="#222", anchor="middle", rot=0, **a):
    sx, sy = P(x, y)
    tr = f' transform="rotate({rot} {f(sx)} {f(sy)})"' if rot else ""
    return (f'<text x="{f(sx)}" y="{f(sy)}" font-size="{size}" font-weight="{weight}" '
            f'fill="{fill}" text-anchor="{anchor}"{tr} {attrs(a)}>{txt}</text>')


def poly(pts, **a):
    s = " ".join(f"{f(px)},{f(py)}" for px, py in (P(x, y) for x, y in pts))
    return f'<polygon points="{s}" {attrs(a)}/>'


def polyline(pts, **a):
    s = " ".join(f"{f(px)},{f(py)}" for px, py in (P(x, y) for x, y in pts))
    return f'<polyline points="{s}" fill="none" {attrs(a)}/>'


def area(rects):
    return sum((x1 - x0) * (y1 - y0) for x0, x1, y0, y1 in rects)


def br(v):
    return f"{v:.2f}".replace(".", ",")


# ------------------------------------------------------------ paredes/vãos
def parede(x0, y0, x1, y1, t=0.15):
    if x0 == x1:  # parede em x constante (corre ao longo da profundidade)
        return R(x0 - t / 2, x0 + t / 2, y0 - t / 2, y1 + t / 2, fill=COR["parede"])
    return R(x0 - t / 2, x1 + t / 2, y0 - t / 2, y0 + t / 2, fill=COR["parede"])


def abertura(tipo, eixo, c, a, b, t=0.2, dobradica="a", lado=1):
    """eixo 'x': parede em x=c, vão de y=a a y=b; eixo 'y': parede em y=c, vão de x=a a x=b."""
    out = []
    e = t / 2 + 0.02
    if eixo == "x":
        out.append(R(c - e, c + e, a, b, fill="#fff"))
    else:
        out.append(R(a, b, c - e, c + e, fill="#fff"))
    fino = dict(stroke="#333", stroke_width=0.9)
    if tipo == "janela":
        for d in (-t / 2, 0, t / 2):
            if eixo == "x":
                out.append(L(c + d, a, c + d, b, **fino))
            else:
                out.append(L(a, c + d, b, c + d, **fino))
    elif tipo == "correr":
        m = (a + b) / 2
        for d, (p0, p1) in ((-0.05, (a, m + 0.08)), (0.05, (m - 0.08, b))):
            if eixo == "x":
                out.append(L(c + d, p0, c + d, p1, stroke="#333", stroke_width=2))
            else:
                out.append(L(p0, c + d, p1, c + d, stroke="#333", stroke_width=2))
        if eixo == "x":
            out.append(L(c - t / 2, a, c - t / 2, b, stroke="#333", stroke_width=0.6))
            out.append(L(c + t / 2, a, c + t / 2, b, stroke="#333", stroke_width=0.6))
        else:
            out.append(L(a, c - t / 2, b, c - t / 2, stroke="#333", stroke_width=0.6))
            out.append(L(a, c + t / 2, b, c + t / 2, stroke="#333", stroke_width=0.6))
    elif tipo == "porta":
        w = b - a
        h, o = (a, b) if dobradica == "a" else (b, a)
        if eixo == "y":
            hinge, tip, other = (h, c), (h, c + lado * w), (o, c)
        else:
            hinge, tip, other = (c, h), (c + lado * w, h), (c, o)
        out.append(L(*hinge, *tip, stroke="#333", stroke_width=1.6))
        a1 = math.atan2(tip[1] - hinge[1], tip[0] - hinge[0])
        a2 = math.atan2(other[1] - hinge[1], other[0] - hinge[0])
        d = (a2 - a1 + math.pi) % (2 * math.pi) - math.pi
        pts = [(hinge[0] + w * math.cos(a1 + d * i / 16),
                hinge[1] + w * math.sin(a1 + d * i / 16)) for i in range(17)]
        out.append(polyline(pts, stroke="#777", stroke_width=0.8, stroke_dasharray="3 2"))
    return "".join(out)


# --------------------------------------------------------------- mobiliário
M = dict(fill="#fff", stroke="#555", stroke_width=0.9)


def carro(x0, y0):
    s = [R(x0, x0 + 1.8, y0, y0 + 4.4, rx=8, fill="#f7f7f7", stroke="#555", stroke_width=1)]
    s.append(R(x0 + 0.2, x0 + 1.6, y0 + 1.25, y0 + 3.2, rx=5, fill="#e4e8ec", stroke="#777", stroke_width=0.8))
    return "".join(s)


def cama(x0, x1, y0, y1, cabeceira="x1"):
    s = [R(x0, x1, y0, y1, **M)]
    w = y1 - y0
    if cabeceira == "x1":
        s.append(R(x1 - 0.45, x1 - 0.1, y0 + 0.1, y0 + w / 2 - 0.05, rx=3, **M))
        s.append(R(x1 - 0.45, x1 - 0.1, y0 + w / 2 + 0.05, y1 - 0.1, rx=3, **M))
        s.append(L(x0 + 0.5, y0, x0 + 0.5, y1, stroke="#999", stroke_width=0.7))
    else:
        s.append(R(x0 + 0.1, x0 + 0.45, y0 + 0.1, y0 + w / 2 - 0.05, rx=3, **M))
        s.append(R(x0 + 0.1, x0 + 0.45, y0 + w / 2 + 0.05, y1 - 0.1, rx=3, **M))
        s.append(L(x1 - 0.5, y0, x1 - 0.5, y1, stroke="#999", stroke_width=0.7))
    return "".join(s)


def vaso(x, y, rot="y-"):
    # bacia sanitária: caixa encostada na parede + louça
    if rot == "y+":
        return R(x - 0.2, x + 0.2, y - 0.2, y, **M) + C(x, y - 0.42, 0.2, **M)
    if rot == "x+":
        return R(x - 0.2, x, y - 0.2, y + 0.2, **M) + C(x - 0.42, y, 0.2, **M)
    if rot == "x-":
        return R(x, x + 0.2, y - 0.2, y + 0.2, **M) + C(x + 0.42, y, 0.2, **M)
    return R(x - 0.2, x + 0.2, y, y + 0.2, **M) + C(x, y + 0.42, 0.2, **M)


def pia(x0, x1, y0, y1):
    cx, cy = (x0 + x1) / 2, (y0 + y1) / 2
    return R(x0, x1, y0, y1, **M) + C(cx, cy, min(x1 - x0, y1 - y0) * 0.3, **M)


def box(x0, x1, y0, y1):
    return (R(x0, x1, y0, y1, fill="#f4fbfd", stroke="#555", stroke_width=0.9)
            + L(x0, y0, x1, y1, stroke="#9bb", stroke_width=0.7)
            + L(x0, y1, x1, y0, stroke="#9bb", stroke_width=0.7))


def mesa(x0, x1, y0, y1, cad_y=3):
    s = []
    step = (y1 - y0) / cad_y
    for i in range(cad_y):
        yc = y0 + step * (i + 0.5)
        s.append(R(x0 - 0.42, x0 - 0.05, yc - 0.2, yc + 0.2, rx=3, **M))
        s.append(R(x1 + 0.05, x1 + 0.42, yc - 0.2, yc + 0.2, rx=3, **M))
    xc = (x0 + x1) / 2
    s.append(R(xc - 0.2, xc + 0.2, y0 - 0.42, y0 - 0.05, rx=3, **M))
    s.append(R(xc - 0.2, xc + 0.2, y1 + 0.05, y1 + 0.42, rx=3, **M))
    s.append(R(x0, x1, y0, y1, fill="#efe2cc", stroke="#555", stroke_width=1))
    return "".join(s)


def arvore(x, y, r=0.9):
    return (C(x, y, r, fill="#b9d8a6", stroke="#7da86a", stroke_width=1, opacity=0.95)
            + C(x, y, r * 0.45, fill="none", stroke="#7da86a", stroke_width=0.7))


# ------------------------------------------------------------------- cotas
def cota_y(x, y0, y1, txt):
    s = [L(x, y0, x, y1, stroke="#666", stroke_width=0.8)]
    for y in (y0, y1):
        s.append(L(x - 0.12, y - 0.12, x + 0.12, y + 0.12, stroke="#666", stroke_width=1))
        s.append(L(x - 0.25, y, x + 0.25, y, stroke="#666", stroke_width=0.6))
    s.append(T(x - 0.15, (y0 + y1) / 2, txt, size=10, fill="#444"))
    return "".join(s)


def cota_x(y, x0, x1, txt):
    s = [L(x0, y, x1, y, stroke="#666", stroke_width=0.8)]
    for x in (x0, x1):
        s.append(L(x - 0.12, y - 0.12, x + 0.12, y + 0.12, stroke="#666", stroke_width=1))
        s.append(L(x, y - 0.25, x, y + 0.25, stroke="#666", stroke_width=0.6))
    sx, sy = P((x0 + x1) / 2, y - 0.18)
    s.append(f'<text x="{f(sx)}" y="{f(sy)}" font-size="10" fill="#444" text-anchor="middle" '
             f'transform="rotate(-90 {f(sx)} {f(sy)})">{txt}</text>')
    return "".join(s)


def escala_grafica(x, y):
    s = []
    for i in range(5):
        s.append(R(x, x + 0.18, y + i, y + i + 1, fill="#333" if i % 2 == 0 else "#fff",
                   stroke="#333", stroke_width=0.6))
    s.append(T(x + 0.62, y, "0", size=9, fill="#444"))
    s.append(T(x + 0.62, y + 5, "5 m", size=9, fill="#444"))
    return "".join(s)


# =====================================================================
#                              PROJETO
# =====================================================================
# Ambientes: (nome, [retângulos (x0, x1, y0, y1)], cor, posição do rótulo, tamanho da fonte)
TERREO = [
    ("Sala de estar", [(1.5, 9, 5, 9.8)], "soc", (2.9, 7.7), 12),
    ("Lavabo", [(1.5, 3.1, 9.8, 11.6)], "wet", (2.55, 10.35), 9),
    ("Sala de jantar", [(3.1, 7.8, 9.8, 11.6), (1.5, 7.8, 11.6, 14)], "soc", (2.6, 12.9), 11),
    ("Escada", [(7.8, 9, 9.8, 12.2)], "circ", None, 9),
    ("Despensa", [(7.8, 9, 12.2, 14)], "serv", (8.3, 13.1), 8),
    ("Cozinha", [(1.5, 9, 14, 18.2)], "soc", (3.4, 15.4), 12),
    ("Lavanderia", [(1.5, 4, 18.2, 20.4)], "wet", (2.55, 19.3), 9),
    ("Banheiro", [(1.5, 4, 20.4, 22.6)], "wet", (2.95, 21.3), 9),
    ("Depósito", [(1.5, 4, 22.6, 24)], "serv", (2.75, 23.15, True), 8),
    ("Área gourmet", [(4, 9, 18.2, 24)], "ext", (4.8, 22.9), 12),
]

SUPERIOR = [
    ("Varanda", [(4.2, 9, 4, 5)], "ext", (7.4, 4.45, True), 9),
    ("Suíte master", [(4.2, 9, 5, 9.8)], "int", (4.9, 6.9), 12),
    ("Closet", [(1.5, 4.2, 5, 7.2)], "int", (3.1, 6.1), 10),
    ("Banho master", [(1.5, 4.2, 7.2, 9.8)], "wet", (2.75, 8.5), 9),
    ("Sala íntima / office", [(1.5, 6.4, 9.8, 14)], "soc", (4.0, 12.0), 11),
    ("Circulação", [(6.4, 7.8, 9.8, 14), (3.2, 9, 14, 15.2)], "circ", (4.35, 14.6), 9),
    ("Escada", [(7.8, 9, 9.8, 14)], "circ", None, 9),
    ("Banho 2", [(1.5, 3.2, 14, 17.2)], "wet", (2.3, 15.8), 9),
    ("Suíte 2", [(3.2, 5.2, 15.2, 17.2), (1.5, 5.2, 17.2, 21)], "int", (2.5, 18.6), 11),
    ("Banho 3", [(7, 9, 15.2, 17.2)], "wet", (7.8, 15.55), 8),
    ("Suíte 3", [(5.2, 7, 15.2, 17.2), (5.2, 9, 17.2, 21)], "int", (6.3, 18.0), 11),
]

EXT, INT = 0.2, 0.12
PAREDES_T = [
    (1.5, 5, 9, 5, EXT), (1.5, 5, 1.5, 24, EXT), (9, 5, 9, 24, EXT), (1.5, 24, 4, 24, EXT),
    (1.5, 9.8, 3.1, 9.8, INT), (3.1, 9.8, 3.1, 11.6, INT), (1.5, 11.6, 3.1, 11.6, INT),
    (7.8, 9.8, 7.8, 14, 0.1), (7.8, 12.2, 9, 12.2, INT), (7.8, 14, 9, 14, INT),
    (1.5, 18.2, 4, 18.2, INT), (4, 18.2, 9, 18.2, 0.1), (4, 18.2, 4, 24, INT),
    (1.5, 20.4, 4, 20.4, INT), (1.5, 22.6, 4, 22.6, INT),
]
VAOS_T = [
    ("porta", "y", 5, 1.95, 3.15, EXT, "a", 1),        # porta pivotante de entrada
    ("janela", "y", 5, 3.5, 8.7, EXT),                  # pano de vidro da sala
    ("janela", "x", 1.5, 6.2, 8.6, EXT),
    ("janela", "x", 1.5, 10.3, 11.1, EXT),
    ("porta", "x", 3.1, 10.85, 11.5, INT, "a", -1),
    ("janela", "x", 1.5, 12.0, 13.6, EXT),
    ("porta", "y", 14, 8.15, 8.85, INT, "b", -1),
    ("janela", "x", 1.5, 14.8, 17.6, EXT),
    ("porta", "y", 18.2, 2.0, 2.8, INT, "a", 1),
    ("porta", "x", 1.5, 19.3, 20.1, EXT, "b", 1),
    ("janela", "x", 1.5, 21.1, 21.9, EXT),
    ("porta", "x", 4, 20.8, 21.5, INT, "b", -1),
    ("porta", "y", 24, 2.2, 3.0, EXT, "a", -1),
    ("correr", "y", 18.2, 4.3, 8.7, 0.1),
]

PAREDES_S = [
    (1.5, 5, 9, 5, EXT), (1.5, 5, 1.5, 21, EXT), (9, 5, 9, 21, EXT), (1.5, 21, 9, 21, EXT),
    (4.2, 5, 4.2, 9.8, INT), (1.5, 7.2, 4.2, 7.2, INT), (1.5, 9.8, 9, 9.8, INT),
    (7.8, 9.8, 7.8, 14, 0.08), (1.5, 14, 3.2, 14, INT),
    (3.2, 14, 3.2, 17.2, INT), (1.5, 17.2, 3.2, 17.2, INT),
    (3.2, 15.2, 9, 15.2, INT), (5.2, 15.2, 5.2, 21, INT),
    (7, 15.2, 7, 17.2, INT), (7, 17.2, 9, 17.2, INT),
]
VAOS_S = [
    ("correr", "y", 5, 4.5, 8.8, EXT),
    ("janela", "y", 5, 2.0, 3.8, EXT),
    ("janela", "x", 1.5, 8.0, 9.2, EXT),
    ("vao", "x", 4.2, 5.4, 6.6, INT),
    ("porta", "y", 7.2, 2.4, 3.1, INT, "a", 1),
    ("porta", "y", 9.8, 6.55, 7.3, INT, "b", -1),
    ("janela", "x", 1.5, 10.6, 13.2, EXT),
    ("janela", "x", 1.5, 15.0, 16.0, EXT),
    ("porta", "x", 3.2, 15.9, 16.6, INT, "b", -1),
    ("porta", "y", 15.2, 3.6, 4.4, INT, "a", 1),
    ("porta", "y", 15.2, 5.5, 6.3, INT, "b", 1),
    ("porta", "x", 7, 15.9, 16.6, INT, "b", 1),
    ("janela", "y", 21, 2.2, 4.6, EXT),
    ("janela", "x", 1.5, 18.2, 19.6, EXT),
    ("janela", "y", 21, 5.8, 8.4, EXT),
]


def defs():
    return """<defs>
  <pattern id="concregrama" width="10" height="10" patternUnits="userSpaceOnUse">
    <rect width="10" height="10" fill="#cfd5c6"/><rect x="1.5" y="1.5" width="7" height="7" fill="#e7e9e2"/>
  </pattern>
  <pattern id="grama" width="8" height="8" patternUnits="userSpaceOnUse">
    <rect width="8" height="8" fill="#d8ead0"/><path d="M2 6 l1 -2 M5 3 l1 -2" stroke="#a9cc98" stroke-width="0.8"/>
  </pattern>
  <pattern id="deck" width="6" height="6" patternUnits="userSpaceOnUse">
    <rect width="6" height="6" fill="#dcc29a"/><line x1="0" y1="0" x2="0" y2="6" stroke="#c4a679" stroke-width="1"/>
  </pattern>
  <pattern id="hachura" width="7" height="7" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
    <rect width="7" height="7" fill="#f2f2f0"/><line x1="0" y1="0" x2="0" y2="7" stroke="#cfcfca" stroke-width="1.2"/>
  </pattern>
  <marker id="seta" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
    <path d="M0,0 L8,4 L0,8 z" fill="#333"/>
  </marker>
</defs>"""


def lote_base(titulo):
    s = []
    s.append(R(0, 9, 0, 30, fill="url(#grama)"))
    # muros de divisa
    s.append(R(-0.07, 0.07, 0, 30, fill="#8d8d88"))
    s.append(R(8.93, 9.07, 0, 30, fill="#8d8d88"))
    s.append(R(0, 9, 29.93, 30.07, fill="#8d8d88"))
    # rua e calçada
    s.append(R(-0.4, 9.4, -1.25, -0.05, fill="#ecebe7"))
    s.append(T(4.5, -0.5, "CALÇADA / RUA", size=10, weight=700, fill="#888", rot=-90, letter_spacing=2))
    sx, sy = P(-2.4, -2.9)
    s.append(f'<text x="{f(sx)}" y="{f(sy)}" font-size="15" font-weight="700" fill="#222">{titulo}</text>')
    return "".join(s)


def desenhar_ambientes(lista):
    s = []
    for nome, rects, cor, pos, fs in lista:
        for r in rects:
            s.append(R(*r, fill=COR[cor]))
    return "".join(s)


def rotulos(lista):
    s = []
    for nome, rects, cor, pos, fs in lista:
        if not pos:
            continue
        x, y, *rot = pos
        if rot:
            s.append(T(x, y, nome, size=fs, weight=600, fill="#222", rot=-90))
            s.append(T(x, y + fs * 0.033, f"{br(area(rects))} m²", size=fs - 2, fill="#555", rot=-90, dy="1.1em"))
            continue
        s.append(T(x, y, nome, size=fs, weight=600, fill="#222"))
        s.append(T(x + fs * 0.033, y, f"{br(area(rects))} m²", size=fs - 2, fill="#555", dy="1.1em"))
    return "".join(s)


def escada(subindo=True):
    s = []
    fim = 12.2 if subindo else 14.0
    n = 9 if subindo else 16
    for i in range(n):
        y = 9.8 + i * 0.28
        s.append(L(7.8, y, 9, y, stroke="#666", stroke_width=0.8))
    if subindo:
        s.append(L(7.8, 12.3, 9, 11.9, stroke="#333", stroke_width=1.2))
    s.append(f'<line x1="{f(P(8.4, 10.0)[0])}" y1="{f(P(8.4, 10.0)[1])}" '
             f'x2="{f(P(8.4, fim - 0.35)[0])}" y2="{f(P(8.4, fim - 0.35)[1])}" stroke="#333" '
             f'stroke-width="1.2" marker-end="url(#seta)"/>')
    s.append(C(8.4, 10.0, 0.06, fill="#333"))
    s.append(T(8.15, 10.95 if subindo else 11.9, "SOBE" if subindo else "DESCE", size=8, weight=700, fill="#333"))
    return "".join(s)


def planta_terreo():
    s = [defs(), lote_base("PLANTA BAIXA — TÉRREO")]
    # recuo frontal: garagem descoberta (piso drenante) + acesso social
    s.append(R(3.6, 9, 0, 5, fill="url(#concregrama)"))
    s.append(R(1.5, 3.5, 0, 5, fill="#e9e5dc"))
    for i in range(4):
        s.append(R(1.75, 3.25, 0.35 + i * 0.95, 0.95 + i * 0.95, fill="#d7d0c2", rx=2))
    s.append(L(6.3, 0.2, 6.3, 4.9, stroke="#fff", stroke_width=2))
    s.append(carro(4.05, 0.3) + carro(6.75, 0.3))
    s.append(T(5.0, 2.55, "VAGA 1", size=9, weight=700, fill="#555"))
    s.append(T(7.7, 2.55, "VAGA 2", size=9, weight=700, fill="#555"))
    # muro frontal com portões
    s.append(R(-0.07, 9.07, -0.07, 0.07, fill="#8d8d88"))
    for a, b in ((0.15, 1.35), (1.6, 3.4), (3.6, 8.9)):
        s.append(R(a, b, -0.09, 0.09, fill="#fff"))
        s.append(L(a, 0, b, 0, stroke="#333", stroke_width=1.2, stroke_dasharray="4 2"))
    s.append(T(0.75, 0.55, "serviço", size=7, fill="#555", rot=-90))
    s.append(T(2.5, 0.55, "social", size=7, fill="#555", rot=-90))
    # corredor lateral (recuo de 1,50 m) com pisantes
    for i in range(18):
        y = 5.6 + i * 1.3
        s.append(R(0.35, 1.15, y, y + 0.6, fill="#e2ddd2", stroke="#c9c2b3", stroke_width=0.6, rx=2))
    s.append(T(0.75, 13.0, "CORREDOR LATERAL — RECUO 1,50 m", size=8, fill="#5a7a4c", weight=600))
    # quintal: deck, piscina, jardim
    s.append(R(1.5, 9, 24, 28.6, fill="url(#deck)"))
    s.append(R(2.5, 8.5, 25.0, 27.6, fill=COR["pisc"], stroke="#5aa9c4", stroke_width=1.5, rx=4))
    s.append(T(5.5, 26.3, "PISCINA 6,00 × 2,60", size=10, weight=700, fill="#1f5f78"))
    s.append(T(5.5, 26.3, "prof. 1,40 m · prainha", size=8, fill="#1f5f78", dy="1.3em"))
    s.append(T(4.6, 29.35, "JARDIM", size=9, weight=600, fill="#5a7a4c", rot=-90))
    for x, y, r in ((0.8, 2.6, 0.75), (8.0, 29.1, 0.8), (1.2, 29.0, 0.8), (0.75, 25.5, 0.6)):
        s.append(arvore(x, y, r))
    # ambientes
    s.append(desenhar_ambientes(TERREO))
    # beiral / laje da área gourmet
    s.append(L(4, 24, 9, 24, stroke="#777", stroke_width=1, stroke_dasharray="6 3"))
    s.append(R(3.9, 4.1, 23.9, 24.1, fill=COR["parede"]))
    s.append(R(8.8, 9.0, 23.8, 24.1, fill=COR["parede"]))
    # mobiliário — sala
    s.append(R(4.55, 5.45, 5.9, 8.7, rx=4, **M))
    s.append(R(4.55, 4.85, 5.9, 8.7, rx=3, **M))
    s.append(R(5.45, 6.6, 5.9, 6.7, rx=4, **M))
    s.append(C(6.7, 7.4, 0.45, fill="#f3f0ea", stroke="#555", stroke_width=0.8))
    s.append(R(8.65, 8.85, 6.2, 8.4, fill="#444"))
    s.append(T(8.5, 7.3, "TV", size=7, fill="#555"))
    s.append(R(1.7, 2.3, 5.6, 6.1, rx=3, **M))
    # jantar
    s.append(mesa(4.75, 5.75, 11.0, 12.9))
    s.append(R(7.25, 7.7, 10.2, 13.6, **M))
    # lavabo
    s.append(vaso(1.56, 11.15, "x-"))
    s.append(pia(1.56, 2.0, 9.95, 10.45))
    # cozinha
    s.append(R(8.3, 9.0, 14.05, 14.85, fill="#f0f0f0", stroke="#555", stroke_width=0.9))
    s.append(T(8.72, 14.45, "GEL", size=6, fill="#555"))
    s.append(R(8.35, 9.0, 14.9, 18.1, **M))
    s.append(pia(8.45, 8.95, 15.2, 16.0))
    for yy in (16.75, 17.2):
        for xx in (8.55, 8.8):
            s.append(C(xx, yy, 0.09, fill="none", stroke="#555", stroke_width=0.8))
    s.append(R(5.6, 6.6, 15.0, 17.6, fill="#efe2cc", stroke="#555", stroke_width=1))
    for yy in (15.4, 16.3, 17.2):
        s.append(C(5.2, yy, 0.18, **M))
    s.append(R(1.6, 2.2, 14.2, 14.6, **M))
    # lavanderia
    s.append(R(3.3, 3.95, 18.4, 19.0, **M))
    s.append(R(3.3, 3.95, 19.1, 19.75, **M) + C(3.62, 19.42, 0.2, **M))
    # banheiro
    s.append(box(1.5, 2.4, 21.65, 22.55))
    s.append(vaso(3.6, 22.6 - 0.06, "y+"))
    s.append(pia(1.56, 2.0, 20.5, 21.05))
    # área gourmet
    s.append(R(8.3, 9.0, 18.6, 19.9, fill="#6b6b6b"))
    s.append(T(8.72, 19.25, "churrasq.", size=6, fill="#fff"))
    s.append(R(8.4, 9.0, 19.9, 23.4, **M))
    s.append(pia(8.5, 8.95, 21.0, 21.8))
    s.append(mesa(5.7, 6.7, 19.6, 22.0))
    # escada
    s.append(escada(True))
    # paredes e vãos
    for p in PAREDES_T:
        s.append(parede(*p))
    for v in VAOS_T:
        tipo, eixo, c, a, b, t, *rest = v
        s.append(abertura(tipo, eixo, c, a, b, t, *rest))
    s.append(rotulos(TERREO))
    s.append(T(2.2, 4.45, "entrada", size=8, fill="#555"))
    # cotas
    s.append(cota_y(-0.75, 0, 5, "5,00 recuo frontal"))
    s.append(cota_y(-0.75, 5, 24, "19,00 construção térreo"))
    s.append(cota_y(-0.75, 24, 30, "6,00 quintal"))
    s.append(cota_x(-1.85, 0, 1.5, "1,50"))
    s.append(cota_x(-1.85, 1.5, 9, "7,50"))
    s.append(cota_x(-2.6, 0, 9, "9,00"))
    s.append(cota_y(9.75, 0, 30, "30,00"))
    s.append(escala_grafica(9.55, 23.5))
    return svg(PLAN_W, PLAN_H, "".join(s), "Planta baixa do pavimento térreo")


def planta_superior():
    s = [defs(), lote_base("PLANTA BAIXA — 1º ANDAR")]
    s.append(R(3.6, 9, 0, 5, fill="#ecece8"))
    s.append(R(1.5, 9, 24, 28.6, fill="#eee6d8"))
    s.append(R(2.5, 8.5, 25.0, 27.6, fill="#d3eaf3", rx=4))
    s.append(T(5.5, 26.3, "piscina (térreo)", size=9, fill="#5c8797"))
    # cobertura do térreo (laje da área gourmet / serviço)
    s.append(R(1.5, 9, 21, 24, fill="url(#hachura)", stroke="#999", stroke_width=0.8))
    s.append(T(5.25, 22.3, "LAJE DO TÉRREO", size=8, weight=700, fill="#666", rot=-90))
    s.append(T(5.25, 22.75, "telhado verde + condensadoras", size=7, fill="#777", rot=-90, dy="0.9em"))
    s.append(desenhar_ambientes(SUPERIOR))
    # mobiliário — suíte master
    s.append(cama(6.95, 9.0, 6.4, 8.35, "x1"))
    s.append(R(8.55, 9.0, 5.85, 6.3, **M) + R(8.55, 9.0, 8.45, 8.9, **M))
    s.append(C(5.0, 5.75, 0.35, **M))
    s.append(R(4.3, 4.75, 7.6, 9.6, **M))
    # closet
    s.append(R(1.5, 2.1, 5.1, 7.1, **M) + R(2.1, 3.9, 5.05, 5.6, **M))
    s.append(T(1.88, 6.1, "armários", size=6, fill="#555"))
    # banho master
    s.append(box(1.5, 2.5, 8.75, 9.8))
    s.append(R(3.65, 4.15, 7.4, 8.9, **M) + C(3.9, 7.8, 0.15, **M) + C(3.9, 8.5, 0.15, **M))
    s.append(vaso(3.0, 9.8 - 0.06, "y+"))
    # sala íntima / office
    s.append(R(1.55, 2.15, 10.3, 13.4, **M))
    s.append(C(2.5, 11.1, 0.22, **M) + C(2.5, 12.6, 0.22, **M))
    s.append(R(4.95, 5.85, 10.5, 12.9, rx=4, **M) + R(5.55, 5.85, 10.5, 12.9, rx=3, **M))
    # banho 2
    s.append(box(1.5, 2.4, 14.0, 14.9))
    s.append(vaso(2.0, 17.2 - 0.06, "y+"))
    s.append(pia(2.6, 3.12, 14.06, 14.55))
    # suíte 2
    s.append(cama(3.2, 5.2, 18.4, 20.0, "x1"))
    s.append(R(4.6, 5.2, 15.3, 17.1, **M))
    s.append(T(4.98, 16.2, "armário", size=6, fill="#555"))
    # banho 3
    s.append(box(8.1, 9.0, 16.3, 17.2))
    s.append(vaso(9.0 - 0.06, 15.7, "x+"))
    s.append(pia(7.08, 7.5, 16.72, 17.14))
    # suíte 3
    s.append(cama(7.0, 9.0, 18.4, 20.0, "x1"))
    s.append(R(5.2, 5.8, 15.3, 17.1, **M))
    s.append(T(5.58, 16.2, "armário", size=6, fill="#555"))
    # escada + claraboia
    s.append(escada(False))
    s.append(R(7.88, 8.92, 10.1, 13.7, fill="none", stroke="#5a8f5a", stroke_width=1, stroke_dasharray="5 3"))
    s.append(T(8.75, 12.75, "claraboia", size=7, fill="#3d6e3d", weight=600))
    # guarda-corpo de vidro da varanda
    s.append(R(4.2, 9, 3.97, 4.03, fill="#7fb0c4"))
    s.append(R(4.17, 4.23, 4, 5, fill="#7fb0c4"))
    s.append(R(5.0, 5.6, 4.15, 4.8, rx=3, **M))
    for p in PAREDES_S:
        s.append(parede(*p))
    for v in VAOS_S:
        tipo, eixo, c, a, b, t, *rest = v
        s.append(abertura(tipo, eixo, c, a, b, t, *rest))
    s.append(rotulos(SUPERIOR))
    s.append(T(2.85, 5.45, "ripado", size=7, fill="#8a5a2b", weight=600))
    # cotas
    s.append(cota_y(-0.75, 4, 5, "1,00"))
    s.append(cota_y(-0.75, 5, 21, "16,00 pavimento superior"))
    s.append(cota_y(-0.75, 21, 30, "9,00 afastamento de fundos"))
    s.append(cota_x(-1.85, 0, 1.5, "1,50"))
    s.append(cota_x(-1.85, 1.5, 9, "7,50"))
    s.append(cota_x(-2.6, 0, 9, "9,00"))
    s.append(T(4.6, 2.0, "projeção: vagas descobertas", size=8, fill="#888", rot=-90))
    s.append(escala_grafica(9.55, 23.5))
    return svg(PLAN_W, PLAN_H, "".join(s), "Planta baixa do primeiro andar")


def svg(w, h, conteudo, titulo):
    return (f'<svg viewBox="0 0 {w} {h}" xmlns="http://www.w3.org/2000/svg" role="img" '
            f'aria-label="{titulo}" font-family="Inter, Segoe UI, Arial, sans-serif">'
            f'<rect width="{w}" height="{h}" fill="#fff"/>{conteudo}</svg>')


# ------------------------------------------------------------------ fachada
def fachada():
    E, ox, base = 50, 80, 420
    W, H = ox + 10 * E + 120, base + 80

    def X(x):
        return ox + x * E

    def Z(z):
        return base - z * E

    def r(x0, x1, z0, z1, **a):
        return (f'<rect x="{f(X(x0))}" y="{f(Z(z1))}" width="{f((x1 - x0) * E)}" '
                f'height="{f((z1 - z0) * E)}" {attrs(a)}/>')

    def ln(x0, z0, x1, z1, **a):
        a.setdefault("stroke", "#333")
        a.setdefault("stroke_width", 1)
        return f'<line x1="{f(X(x0))}" y1="{f(Z(z0))}" x2="{f(X(x1))}" y2="{f(Z(z1))}" {attrs(a)}/>'

    def tx(x, z, t, size=11, anchor="middle", **a):
        return (f'<text x="{f(X(x))}" y="{f(Z(z))}" font-size="{size}" text-anchor="{anchor}" '
                f'{attrs(a)}>{t}</text>')

    s = ['<defs><linearGradient id="vidro" x1="0" y1="0" x2="1" y2="1">'
         '<stop offset="0" stop-color="#cfe3ec"/><stop offset="1" stop-color="#8fb4c6"/>'
         '</linearGradient><linearGradient id="ceu" x1="0" y1="0" x2="0" y2="1">'
         '<stop offset="0" stop-color="#eef5f9"/><stop offset="1" stop-color="#ffffff"/>'
         '</linearGradient></defs>']
    s.append(f'<rect width="{W}" height="{H}" fill="url(#ceu)"/>')
    # divisas
    s.append(r(-0.15, 0, 0, 2.0, fill="#cfcac0"))
    s.append(r(9, 9.15, 0, 2.0, fill="#cfcac0"))
    # térreo — revestimento em pedra
    s.append(r(1.5, 9, 0, 3.0, fill="#b8b1a5"))
    for i in range(1, 10):
        z = i * 0.3
        s.append(ln(1.5, z, 9, z, stroke="#a59d90", stroke_width=0.6))
    s.append(r(1.95, 3.15, 0, 2.75, fill="#9c6a3a", stroke="#6e4823", stroke_width=1))
    for i in range(1, 8):
        xx = 1.95 + i * 0.15
        s.append(ln(xx, 0.05, xx, 2.7, stroke="#87582c", stroke_width=0.6))
    s.append(ln(2.95, 0.9, 2.95, 1.9, stroke="#e8e2d6", stroke_width=3))
    s.append(r(3.5, 8.7, 0.05, 2.75, fill="url(#vidro)", stroke="#222", stroke_width=2))
    for xx in (4.8, 6.1, 7.4):
        s.append(ln(xx, 0.05, xx, 2.75, stroke="#222", stroke_width=2))
    # laje/viga de transição
    s.append(r(1.5, 9, 2.85, 3.05, fill="#7a7874"))
    # pavimento superior — caixa branca com moldura em concreto
    s.append(r(1.5, 9, 3.05, 6.6, fill="#f6f4ef"))
    s.append(r(1.5, 4.2, 3.05, 6.0, fill="#a46d3b"))
    n = int((4.2 - 1.5) / 0.11)
    for i in range(n):
        xx = 1.55 + i * 0.11
        s.append(r(xx, xx + 0.05, 3.08, 5.97, fill="#7d4f25"))
    s.append(r(4.5, 8.8, 3.1, 5.65, fill="url(#vidro)", stroke="#222", stroke_width=2))
    for xx in (5.55, 6.65, 7.75):
        s.append(ln(xx, 3.1, xx, 5.65, stroke="#222", stroke_width=1.5))
    s.append(r(4.2, 9.0, 2.82, 3.05, fill="#5f5d59"))
    s.append(r(4.2, 9.0, 3.05, 4.1, fill="#9cc4d4", opacity=0.45, stroke="#5f8796", stroke_width=1))
    s.append(r(1.5, 9, 6.0, 6.6, fill="#8b8985"))
    s.append(r(1.4, 9.0, 2.82, 6.6, fill="none", stroke="#6e6c68", stroke_width=6))
    # chão, árvore, pessoa (escala)
    s.append(ln(-0.6, 0, 9.8, 0, stroke="#333", stroke_width=2.5))
    s.append(ln(0.75, 0, 0.75, 1.9, stroke="#6b4e2e", stroke_width=4))
    s.append(f'<circle cx="{f(X(0.75))}" cy="{f(Z(2.9))}" r="{f(1.05 * E)}" fill="#9cc78a" opacity="0.9"/>')
    s.append(f'<circle cx="{f(X(0.45))}" cy="{f(Z(3.4))}" r="{f(0.65 * E)}" fill="#b5d6a5" opacity="0.9"/>')
    px = 3.85
    s.append(f'<circle cx="{f(X(px))}" cy="{f(Z(1.62))}" r="{f(0.11 * E)}" fill="#555"/>')
    s.append(r(px - 0.17, px + 0.17, 0.85, 1.5, fill="#555", rx=4))
    s.append(r(px - 0.14, px - 0.02, 0, 0.86, fill="#555"))
    s.append(r(px + 0.02, px + 0.14, 0, 0.86, fill="#555"))
    # níveis
    for z, t in ((0, "±0,00"), (3.0, "+3,00"), (6.0, "+6,00"), (6.6, "+6,60")):
        s.append(ln(9.25, z, 9.7, z, stroke="#555", stroke_width=0.8))
        s.append(f'<path d="M{f(X(9.4))},{f(Z(z) - 7)} l6,7 l6,-7 z" fill="#555"/>')
        s.append(tx(9.78, z - 0.02, t, size=11, anchor="start", fill="#333", dy="-0.25em"))
    # cotas de largura
    s.append(ln(0, -0.55, 9, -0.55, stroke="#666", stroke_width=0.8))
    for xx in (0, 1.5, 9):
        s.append(ln(xx, -0.4, xx, -0.7, stroke="#666", stroke_width=0.8))
    s.append(tx(0.75, -0.95, "1,50", size=11, fill="#444"))
    s.append(tx(5.25, -0.95, "7,50", size=11, fill="#444"))
    # legendas
    leg = [(2.85, 6.35, "ripado de madeira"), (6.65, 6.85, "platibanda — laje impermeabilizada"),
           (6.65, 3.45, "guarda-corpo de vidro"), (6.1, 1.4, "pano de vidro")]
    for x, z, t in leg:
        s.append(tx(x, z, t, size=10, fill="#222", font_weight="600"))
    s.append(tx(5.25, 7.4, "FACHADA FRONTAL", size=14, fill="#222", font_weight="700"))
    return (f'<svg viewBox="0 0 {W} {H}" xmlns="http://www.w3.org/2000/svg" role="img" '
            f'aria-label="Fachada frontal" font-family="Inter, Segoe UI, Arial, sans-serif">'
            + "".join(s) + "</svg>")


# --------------------------------------------------------------- perspectiva
def perspectiva():
    K, ang, fat = 30, math.radians(35), 0.5
    ox, oy = 430, 520
    W, H = 760, 560

    def Q(x, y, z):
        return (ox + (x - y * fat * math.cos(ang)) * K, oy - (y * fat * math.sin(ang) + z) * K)

    def pg(pts, **a):
        s = " ".join(f"{f(px)},{f(py)}" for px, py in (Q(*p) for p in pts))
        return f'<polygon points="{s}" {attrs(a)}/>'

    def chao(x0, x1, y0, y1, **a):
        return pg([(x0, y0, 0), (x1, y0, 0), (x1, y1, 0), (x0, y1, 0)], **a)

    def caixa(x0, x1, y0, y1, z0, z1, frente, lado, topo, sw=1):
        st = dict(stroke="#555", stroke_width=sw, stroke_linejoin="round")
        return (pg([(x0, y0, z1), (x1, y0, z1), (x1, y1, z1), (x0, y1, z1)], fill=topo, **st)
                + pg([(x0, y0, z0), (x0, y1, z0), (x0, y1, z1), (x0, y0, z1)], fill=lado, **st)
                + pg([(x0, y0, z0), (x1, y0, z0), (x1, y0, z1), (x0, y0, z1)], fill=frente, **st))

    def na_frente(y, x0, x1, z0, z1, **a):
        y -= 0.01
        return pg([(x0, y, z0), (x1, y, z0), (x1, y, z1), (x0, y, z1)], **a)

    def no_lado(x, y0, y1, z0, z1, **a):
        x -= 0.01
        return pg([(x, y0, z0), (x, y1, z0), (x, y1, z1), (x, y0, z1)], **a)

    vid = dict(fill="#9fc2d2", stroke="#2f3a40", stroke_width=1)
    s = ['<defs><linearGradient id="ceu2" x1="0" y1="0" x2="0" y2="1">'
         '<stop offset="0" stop-color="#e7f1f7"/><stop offset="1" stop-color="#ffffff"/></linearGradient></defs>',
         f'<rect width="{W}" height="{H}" fill="url(#ceu2)"/>']
    s.append(chao(-0.4, 9.4, -2.5, 0, fill="#dddcd6"))
    s.append(chao(0, 9, 0, 30, fill="#cfe3c0", stroke="#9fb98f", stroke_width=1))
    s.append(chao(3.6, 9, 0, 5, fill="#cdd1c7"))
    s.append(chao(1.5, 3.5, 0, 5, fill="#e6e0d3"))
    s.append(chao(1.5, 9, 24, 28.6, fill="#d2b183"))
    s.append(chao(2.5, 8.5, 25, 27.6, fill="#7cc4de", stroke="#4f9ab5", stroke_width=1))
    # muros de divisa (direita e fundos)
    s.append(caixa(0, 9.15, 30, 30.15, 0, 2.0, "#c9c4ba", "#bdb8ae", "#d6d2c9"))
    s.append(caixa(9, 9.15, 0, 30, 0, 2.0, "#c9c4ba", "#b3aea4", "#d6d2c9"))
    def arv(x, y, h, r):
        (bx, by), (tx_, ty) = Q(x, y, 0), Q(x, y, h)
        return (f'<line x1="{f(bx)}" y1="{f(by)}" x2="{f(tx_)}" y2="{f(ty)}" stroke="#6b4e2e" stroke-width="4"/>'
                f'<circle cx="{f(tx_)}" cy="{f(ty)}" r="{f(r * K)}" fill="#8fbf7c" opacity="0.92"/>'
                f'<circle cx="{f(tx_ - r * K * 0.35)}" cy="{f(ty - r * K * 0.3)}" r="{f(r * K * 0.55)}" fill="#a9d196" opacity="0.9"/>')
    s.append(arv(8.0, 29.1, 3.0, 1.0) + arv(0.75, 26, 2.8, 0.9))
    # térreo
    s.append(caixa(1.5, 9, 5, 24, 0, 3.0, "#b8b1a5", "#ece9e2", "#d9d6cf"))
    s.append(na_frente(5, 1.95, 3.15, 0, 2.75, fill="#9c6a3a", stroke="#6e4823", stroke_width=1))
    s.append(na_frente(5, 3.5, 8.7, 0.05, 2.75, **vid))
    for y0, y1, z0, z1 in ((6.2, 8.6, 1.0, 2.4), (10.3, 11.1, 1.6, 2.3), (12.0, 13.6, 1.0, 2.4),
                           (14.8, 17.6, 1.1, 2.3), (21.1, 21.9, 1.6, 2.3)):
        s.append(no_lado(1.5, y0, y1, z0, z1, **vid))
    s.append(no_lado(1.5, 19.3, 20.1, 0, 2.1, fill="#8d8a84", stroke="#555", stroke_width=1))
    # superior
    s.append(caixa(1.5, 9, 5, 21, 3.0, 6.6, "#f6f4ef", "#e3dfd7", "#eeebe5"))
    s.append(na_frente(5, 1.5, 4.2, 3.05, 6.0, fill="#9a6435", stroke="#6e4823", stroke_width=1))
    for i in range(24):
        xx = 1.6 + i * 0.11
        s.append(na_frente(5, xx, xx + 0.045, 3.1, 5.95, fill="#6f4520"))
    s.append(na_frente(5, 4.5, 8.8, 3.1, 5.65, **vid))
    s.append(na_frente(5, 1.5, 9, 6.0, 6.6, fill="#8b8985", stroke="#555", stroke_width=1))
    s.append(no_lado(1.5, 5, 21, 6.0, 6.6, fill="#a3a19c", stroke="#555", stroke_width=1))
    for y0, y1, z0, z1 in ((8.0, 9.2, 4.6, 5.4), (10.6, 13.2, 3.9, 5.6), (15.0, 16.0, 4.6, 5.4),
                           (18.2, 19.6, 3.9, 5.6)):
        s.append(no_lado(1.5, y0, y1, z0, z1, **vid))
    # placas solares sobre a laje
    for i in range(4):
        for j in range(2):
            x0, y0 = 2.3 + i * 1.6, 14.0 + j * 2.6
            s.append(pg([(x0, y0, 6.62), (x0 + 1.4, y0, 6.62), (x0 + 1.4, y0 + 2.2, 6.62),
                         (x0, y0 + 2.2, 6.62)], fill="#33475b", stroke="#9fb0c0", stroke_width=0.8))
    s.append(pg([(7.9, 10.1, 6.62), (8.9, 10.1, 6.62), (8.9, 13.7, 6.62), (7.9, 13.7, 6.62)],
                fill="#bfe0ea", stroke="#6b97a6", stroke_width=0.8))
    # varanda em balanço
    s.append(caixa(4.2, 9, 4, 5, 2.82, 3.05, "#5f5d59", "#6f6d69", "#8a8884"))
    s.append(pg([(4.2, 4, 3.05), (9, 4, 3.05), (9, 4, 4.1), (4.2, 4, 4.1)],
                fill="#9cc4d4", opacity=0.45, stroke="#5f8796", stroke_width=1))
    s.append(pg([(4.2, 4, 3.05), (4.2, 5, 3.05), (4.2, 5, 4.1), (4.2, 4, 4.1)],
                fill="#9cc4d4", opacity=0.35, stroke="#5f8796", stroke_width=1))
    # árvores
    s.append(arv(0.8, 2.6, 3.2, 1.1))
    s.append(f'<text x="24" y="36" font-size="15" font-weight="700" fill="#222">PERSPECTIVA</text>')
    s.append(f'<text x="24" y="56" font-size="11" fill="#555">vista da rua, lado do recuo lateral</text>')
    return (f'<svg viewBox="0 0 {W} {H}" xmlns="http://www.w3.org/2000/svg" role="img" '
            f'aria-label="Perspectiva da casa" font-family="Inter, Segoe UI, Arial, sans-serif">'
            + "".join(s) + "</svg>")


# ----------------------------------------------------------------- página
def tabela(lista, titulo):
    linhas = []
    tot = 0
    for nome, rects, *_ in lista:
        a = area(rects)
        tot += a
        linhas.append(f"<tr><td>{nome}</td><td>{br(a)} m²</td></tr>")
    return (f'<table><caption>{titulo}</caption><tbody>{"".join(linhas)}</tbody>'
            f'<tfoot><tr><td>Total</td><td>{br(tot)} m²</td></tr></tfoot></table>'), tot


def pagina():
    tab_t, a_t = tabela(TERREO, "Térreo")
    tab_s, a_s = tabela(SUPERIOR, "1º andar")
    varanda = area(SUPERIOR[0][1])
    a_total = a_t + a_s
    lote = 9 * 30
    to = a_t / lote * 100
    ca = (a_total - varanda) / lote
    # área permeável: vagas em concregrama (50%), corredor lateral gramado com
    # pisantes (80%) e faixa de jardim no fundo do lote (100%)
    perm = 0.5 * (5.4 * 5) + 0.8 * (1.5 * 30) + 7.5 * 1.4
    perm_pct = perm / lote * 100
    with open(AQUI / "modelo.html", encoding="utf-8") as fh:
        modelo = fh.read()
    subs = {
        "{{PLANTA_TERREO}}": planta_terreo(),
        "{{PLANTA_SUPERIOR}}": planta_superior(),
        "{{FACHADA}}": fachada(),
        "{{PERSPECTIVA}}": perspectiva(),
        "{{TABELA_TERREO}}": tab_t,
        "{{TABELA_SUPERIOR}}": tab_s,
        "{{AREA_TERREO}}": br(a_t),
        "{{AREA_SUPERIOR}}": br(a_s),
        "{{AREA_TOTAL}}": br(a_total),
        "{{AREA_TOTAL_NUM}}": f"{a_total:.2f}",
        "{{TO}}": f"{to:.1f}".replace(".", ","),
        "{{CA}}": f"{ca:.2f}".replace(".", ","),
        "{{PERM}}": f"{perm_pct:.0f}",
        "{{PERM_M2}}": br(perm),
    }
    for k, v in subs.items():
        modelo = modelo.replace(k, v)
    (AQUI / "index.html").write_text(modelo, encoding="utf-8")
    print(f"index.html gerado — térreo {a_t:.2f} m², superior {a_s:.2f} m², total {a_total:.2f} m²")
    print(f"TO {to:.1f}%  CA {ca:.2f}  permeável ≈ {perm:.1f} m² ({perm_pct:.0f}%)")


if __name__ == "__main__":
    pagina()
