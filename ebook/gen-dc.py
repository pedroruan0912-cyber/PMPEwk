#!/usr/bin/env python3
"""Gera ebook/src/dc-data.js a partir do banco de questões de Direito Constitucional.

Fonte única: direito-constitucional/questoes-direito-constitucional-pmpe-2026.md
Uso: python3 ebook/gen-dc.py   (o build.sh chama este script quando há python3)
"""
import html
import json
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / 'direito-constitucional' / 'questoes-direito-constitucional-pmpe-2026.md'
OUT = ROOT / 'ebook' / 'src' / 'dc-data.js'

AR_OPTS = [
    'As asserções I e II são verdadeiras, e a II justifica corretamente a I.',
    'As asserções I e II são verdadeiras, mas a II não justifica corretamente a I.',
    'A asserção I é verdadeira, e a II é falsa.',
    'A asserção I é falsa, e a II é verdadeira.',
    'As asserções I e II são falsas.',
]

# grupos do conteúdo programático (ordem do edital); a primeira regra que casar vale
GROUPS = [
    ('pf', 'Princípios fundamentais'),
    ('di', 'Direitos e deveres individuais e coletivos'),
    ('ds', 'Direitos sociais'),
    ('na', 'Nacionalidade'),
    ('dp', 'Direitos políticos e partidos'),
    ('rc', 'Remédios constitucionais'),
    ('oe', 'Organização do Estado e competências'),
    ('ap', 'Administração Pública e servidores'),
    ('mi', 'Militares dos Estados'),
    ('le', 'Poder Legislativo'),
    ('ex', 'Poder Executivo'),
    ('ju', 'Poder Judiciário'),
    ('fe', 'Funções Essenciais à Justiça'),
    ('de', 'Defesa do Estado'),
    ('sp', 'Segurança pública'),
]
RULES = [
    (r'^Princípios', 'pf'),
    (r'^Militares dos Estados', 'mi'),
    (r'^Direitos sociais', 'ds'),
    (r'^Remédios|^Habeas corpus', 'rc'),
    (r'^Nacionalidade', 'na'),
    (r'^Direitos políticos|^Partidos', 'dp'),
    (r'segurança pública', 'sp'),
    (r'^Segurança pública', 'sp'),
    (r'^Defesa do Estado', 'de'),
    (r'^Administração Pública|^Servidores|^Devido processo administrativo', 'ap'),
    (r'^Repartição|^Organização|^Estados \(|^Municípios', 'oe'),
    (r'^Poder Legislativo|^Processo legislativo', 'le'),
    (r'^Poder Executivo', 'ex'),
    (r'^Poder Judiciário|^Tribunal do Júri', 'ju'),
    (r'^Funções Essenciais', 'fe'),
    (r'.', 'di'),
]


def group_of(topic):
    for pat, g in RULES:
        if re.search(pat, topic, re.I):
            return g
    return 'di'


def inline(s):
    s = html.escape(s, quote=False)
    return re.sub(r'\*\*(.+?)\*\*', r'<b>\1</b>', s)


def fmt_of(n):
    return 1 if n <= 33 else 2 if n <= 66 else 3 if n <= 99 else 4 if n <= 132 else 5


def cut(block):
    """Corta o bloco no separador ou no próximo título de formato."""
    out = []
    for line in block.split('\n'):
        if line.startswith('---') or line.startswith('## ') or line.startswith('# '):
            break
        out.append(line)
    return out


ROMAN = re.compile(r'^(I|II|III|IV)\. (.+)$')
OPT = re.compile(r'^([A-E])\) (.+)$')


def stem_html(lines, f):
    parts, items = [], []

    def flush():
        if items:
            parts.append('<ol type="I">' + ''.join('<li>' + inline(t) + '</li>' for t in items) + '</ol>')
            items.clear()

    for line in lines:
        line = line.strip()
        if not line:
            continue
        m = ROMAN.match(line)
        if m and f == 3:
            items.append(m.group(2))
            continue
        flush()
        if m and f == 2:
            parts.append('<p><b>' + m.group(1) + '.</b> ' + inline(m.group(2)) + '</p>')
        elif line == '**PORQUE**':
            parts.append('<p class="porque">PORQUE</p>')
        else:
            parts.append('<p>' + inline(line) + '</p>')
    flush()
    return ''.join(parts)


def body_html(lines):
    parts, lis = [], []

    def flush():
        if lis:
            parts.append('<ul>' + ''.join('<li>' + inline(t) + '</li>' for t in lis) + '</ul>')
            lis.clear()

    for line in lines:
        line = line.rstrip()
        if not line.strip():
            flush()
            continue
        if line.startswith('- '):
            lis.append(line[2:])
            continue
        flush()
        parts.append('<p>' + inline(line.strip()) + '</p>')
    flush()
    return ''.join(parts)


def main():
    text = SRC.read_text(encoding='utf-8')
    qpart, gpart = text.split('# PARTE II · GABARITO COMENTADO')
    qs = re.split(r'^### Questão (\d+) · (.+)$', qpart, flags=re.M)
    data = []
    for i in range(1, len(qs), 3):
        n, topic, block = int(qs[i]), qs[i + 1].strip(), qs[i + 2]
        f = fmt_of(n)
        lines = cut(block)
        opts = [m.group(2) for m in (OPT.match(l.strip()) for l in lines) if m]
        stem = [l for l in lines if not OPT.match(l.strip())]
        if f == 2:
            opts = AR_OPTS
        elif f == 4:
            opts = ['Certo', 'Errado']
        if len(opts) != (2 if f == 4 else 5):
            sys.exit('questão %d: %d alternativas' % (n, len(opts)))
        data.append({'n': n, 'f': f, 't': topic, 'g': group_of(topic),
                     'e': stem_html(stem, f), 'o': [inline(o) for o in opts]})

    gs = re.split(r'^### Questão (\d+) · (.+)$', gpart, flags=re.M)
    keys = {}
    for i in range(1, len(gs), 3):
        n, head, block = int(gs[i]), gs[i + 1].strip(), gs[i + 2]
        m = re.match(r'Resposta: ([A-E])(?: \(([^)]+)\))?$', head)
        if m:
            a, combo = 'ABCDE'.index(m.group(1)), m.group(2) or ''
        elif head in ('Certo', 'Errado'):
            a, combo = (0 if head == 'Certo' else 1), ''
        else:
            sys.exit('gabarito %d: cabeçalho inesperado: %s' % (n, head))
        keys[n] = (a, combo, body_html(cut(block)))

    if sorted(keys) != [q['n'] for q in data] or len(data) != 165:
        sys.exit('questões e gabarito não batem')
    for q in data:
        a, combo, x = keys[q['n']]
        q['a'], q['x'] = a, x
        if combo:
            q['k'] = combo

    js = ('// Gerado por ebook/gen-dc.py a partir de direito-constitucional/questoes-direito-constitucional-pmpe-2026.md.\n'
          '// Não edite à mão: edite o .md e rode o build.\n'
          'window.DC_GROUPS = ' + json.dumps([{'id': g, 'n': name} for g, name in GROUPS], ensure_ascii=False) + ';\n'
          'window.DC_QS = ' + json.dumps(data, ensure_ascii=False, separators=(',', ':')) + ';\n')
    OUT.write_text(js, encoding='utf-8')
    counts = {}
    for q in data:
        counts[q['g']] = counts.get(q['g'], 0) + 1
    print('ok: %s (%d questões; por tema: %s)' % (OUT.relative_to(ROOT), len(data),
          ', '.join('%s %d' % (g, counts.get(g, 0)) for g, _ in GROUPS)))


if __name__ == '__main__':
    main()
