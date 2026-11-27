#!/usr/bin/env python3
"""Gera os dados do e-book a partir dos bancos de questões em Markdown.

Fontes únicas (edite o .md, nunca o .js gerado):
  direito-constitucional/questoes-direito-constitucional-pmpe-2026.md  -> ebook/src/dc-data.js
  direitos-humanos-legislacao/questoes-abuso-de-autoridade.md         -> ebook/src/q-abu.js (capítulo 7)
  direitos-humanos-legislacao/questoes-lei-de-tortura.md              -> ebook/src/q-tor.js (capítulo 8)
  direitos-humanos-legislacao/questoes-lei-maria-da-penha.md          -> ebook/src/q-lmp.js (capítulo 9)
  direitos-humanos-legislacao/questoes-crimes-de-preconceito.md       -> ebook/src/q-pre.js (capítulo 10)
  direitos-humanos-legislacao/questoes-crimes-ambientais.md           -> ebook/src/q-amb.js (capítulo 11)
  direitos-humanos-legislacao/questoes-crimes-hediondos.md            -> ebook/src/q-hed.js (capítulo 12)
  direitos-humanos-legislacao/questoes-lei-de-drogas.md               -> ebook/src/q-drg.js (capítulo 13)
  historia-pernambuco/questoes-historia-de-pernambuco.md              -> ebook/src/hpe-data.js
  informatica/questoes-informatica-pmpe-2026.md                       -> ebook/src/inf-data.js
  lingua-portuguesa/questoes-reescrita-pmpe-2026.md                   -> ebook/src/lp-data.js

Uso: python3 ebook/gen-bancos.py   (o build.sh chama este script quando há python3)
"""
import html
import json
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent

AR_OPTS = [
    'As asserções I e II são verdadeiras, e a II justifica corretamente a I.',
    'As asserções I e II são verdadeiras, mas a II não justifica corretamente a I.',
    'A asserção I é verdadeira, e a II é falsa.',
    'A asserção I é falsa, e a II é verdadeira.',
    'As asserções I e II são falsas.',
]
FMT_SHORT = {1: 'Cenário', 2: 'Asserção', 3: 'Complexa', 4: 'Certo/Errado', 5: 'Melhor alternativa'}

# grupos do conteúdo programático de Direito Constitucional (ordem do edital); vale a primeira regra que casar
DC_GROUPS = [
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
DC_RULES = [
    (r'^Princípios', 'pf'),
    (r'^Militares dos Estados', 'mi'),
    (r'^Direitos sociais', 'ds'),
    (r'^Remédios|^Habeas corpus', 'rc'),
    (r'^Nacionalidade', 'na'),
    (r'^Direitos políticos|^Partidos', 'dp'),
    (r'segurança pública', 'sp'),
    (r'^Defesa do Estado', 'de'),
    (r'^Administração Pública|^Servidores|^Devido processo administrativo', 'ap'),
    (r'^Repartição|^Organização|^Estados \(|^Municípios', 'oe'),
    (r'^Poder Legislativo|^Processo legislativo', 'le'),
    (r'^Poder Executivo', 'ex'),
    (r'^Poder Judiciário|^Tribunal do Júri', 'ju'),
    (r'^Funções Essenciais', 'fe'),
    (r'.', 'di'),
]


# grupos de História de Pernambuco: os 8 itens do edital; vale a primeira regra que casar
HPE_GROUPS = [
    ('h1', 'Ocupação e colonização'),
    ('h2', 'O açúcar na economia'),
    ('h3', 'Olinda e Recife'),
    ('h4', 'Holandeses e Nassau'),
    ('h5', 'Resistência e movimentos emancipacionistas'),
    ('h6', 'Fim do Império e República'),
    ('h7', 'Cultura popular'),
    ('h8', 'Aspectos afro-brasileiros'),
]
HPE_RULES = [
    (r'Xangô|Herança afro|Irmandades negras|Abolicionismo|Clube do Cupim|Maracatu e irmandades', 'h8'),
    (r'Frevo|frevo|Maracatu|Festas|Ciclo junino|Nova Jerusalém|Culinária|Doçaria|Bolo de rolo|Matriz indígena|Movimentos culturais|Freyre', 'h7'),
    (r'Nassau|Calabar|holandes|[Ii]nvasão|Tolerância|Reativar', 'h4'),
    (r'Insurreição|Guararapes|Brancos, negros|Palmares|Zumbi|Quilombos|Mascates|1817|Beberibe|Confederação|Frei Caneca|Comarca|Cabanos|Praieira|Manifesto ao Mundo|Conspirações|1824|PMPE|[Pp]unição|mapa de Pernambuco|território de Pernambuco', 'h5'),
    (r'Olinda|Recife', 'h3'),
    (r'Contatos|Capitanias|donatário|[Cc]oloniza|Povos indígenas|Duarte Coelho', 'h1'),
    (r'cana|[Aa]çúcar|engenho|Depois', 'h2'),
    (r'.', 'h6'),
]


# grupos de Informática: os 7 itens do edital. Dentro de cada formato (26 questões),
# as questões seguem a ordem dos itens: 2, 4, 5, 3, 4, 4 e 4 questões.
INF_GROUPS = [
    ('i1', 'Internet e intranet'),
    ('i2', 'Navegadores, serviços e nuvem'),
    ('i3', 'Segurança da informação'),
    ('i4', 'Armazenamento e backup'),
    ('i5', 'Arquivos, pastas e hardware'),
    ('i6', 'Windows 11 e Prompt de Comando'),
    ('i7', 'Office 2019 e LibreOffice 7'),
]
INF_SIZES = [2, 4, 5, 3, 4, 4, 4]


def by_position(groups, sizes):
    """Grupo pela posição da questão dentro do formato (os formatos seguem a mesma ordem de itens)."""
    def group(q):
        pos = (q['n'] - 1) % sum(sizes)
        for (g, _), size in zip(groups, sizes):
            if pos < size:
                return g
            pos -= size
    return group


inf_group = by_position(INF_GROUPS, INF_SIZES)

# grupos de Língua Portuguesa (reescrita): os 5 eixos; em cada formato (44 questões): 9, 9, 9, 9 e 8.
LP_GROUPS = [
    ('p1', 'Conectivos e modo verbal'),
    ('p2', 'Vozes verbais e redução de orações'),
    ('p3', 'Pontuação'),
    ('p4', 'Regência e crase'),
    ('p5', 'Concordância e colocação pronominal'),
]
lp_group = by_position(LP_GROUPS, [9, 9, 9, 9, 8])

# grupos de Raciocínio Lógico: os tópicos do caderno, em blocos contínuos de questões
# (cada tópico traz os cinco formatos em sequência).
RL_GROUPS = [
    ('r1', 'Estruturas lógicas e quantificadores'),
    ('r2', 'Argumentação, equivalência e implicação'),
    ('r3', 'Diagramas lógicos'),
    ('r4', 'Contagem, casa dos pombos e inclusão-exclusão'),
    ('r5', 'Permutações, arranjos e combinações'),
    ('r6', 'Probabilidade'),
]
RL_LAST = [20, 45, 60, 80, 105, 130]


def rl_group(q):
    for (g, _), last in zip(RL_GROUPS, RL_LAST):
        if q['n'] <= last:
            return g


def group_by(rules, topic):
    for pat, g in rules:
        if re.search(pat, topic):
            return g
    return rules[-1][1]


def dc_group(topic):
    for pat, g in DC_RULES:
        if re.search(pat, topic, re.I):
            return g
    return 'di'


def inline(s):
    s = html.escape(s, quote=False)
    return re.sub(r'\*\*(.+?)\*\*', r'<b>\1</b>', s)


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


def parse(path):
    """Lê um banco no formato padrão: Parte I com as questões, Parte II com o gabarito comentado."""
    text = path.read_text(encoding='utf-8')
    qpart, gpart = text.split('# PARTE II · GABARITO COMENTADO')
    data, fmt = [], 0
    # o formato vem do último título "## Formato N" antes de cada questão
    pieces = re.split(r'^(## Formato (\d) .*|### Questão (\d+) · (.+))$', qpart, flags=re.M)
    i = 1
    while i < len(pieces):
        if pieces[i + 1]:
            fmt = int(pieces[i + 1])
        else:
            n, topic, block = int(pieces[i + 2]), pieces[i + 3].strip(), pieces[i + 4]
            lines = cut(block)
            opts = [m.group(2) for m in (OPT.match(l.strip()) for l in lines) if m]
            stem = [l for l in lines if not OPT.match(l.strip())]
            if fmt == 2:
                opts = AR_OPTS
            elif fmt == 4:
                opts = ['Certo', 'Errado']
            if len(opts) != (2 if fmt == 4 else 5):
                sys.exit('%s, questão %d: %d alternativas' % (path.name, n, len(opts)))
            data.append({'n': n, 'f': fmt, 't': topic, 'e': stem_html(stem, fmt), 'o': [inline(o) for o in opts]})
        i += 5

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
            sys.exit('%s, gabarito %d: cabeçalho inesperado: %s' % (path.name, n, head))
        keys[n] = (a, combo, body_html(cut(block)))

    if sorted(keys) != [q['n'] for q in data] or [q['n'] for q in data] != list(range(1, len(data) + 1)):
        sys.exit('%s: questões e gabarito não batem' % path.name)
    for q in data:
        a, combo, x = keys[q['n']]
        q['a'], q['x'] = a, x
        if combo:
            q['k'] = combo
    return data


def header(src):
    return ('// Gerado por ebook/gen-bancos.py a partir de %s.\n'
            '// Não edite à mão: edite o .md e rode o build.\n' % src)


def gen_dc():
    src = 'direito-constitucional/questoes-direito-constitucional-pmpe-2026.md'
    data = parse(ROOT / src)
    for q in data:
        q['g'] = dc_group(q['t'])
    out = ROOT / 'ebook' / 'src' / 'dc-data.js'
    out.write_text(header(src) +
                   'window.DC_GROUPS = ' + json.dumps([{'id': g, 'n': name} for g, name in DC_GROUPS], ensure_ascii=False) + ';\n'
                   'window.DC_QS = ' + json.dumps(data, ensure_ascii=False, separators=(',', ':')) + ';\n', encoding='utf-8')
    print('ok: %s (%d questões)' % (out.relative_to(ROOT), len(data)))


def gen_chapter_bank(src, chapter, out_name):
    """Banco de um capítulo do e-book de DH: entra em QUESTOES com a banca "Raciocínio", sem embaralhar."""
    data = parse(ROOT / src)
    items = []
    for q in data:
        it = {'c': chapter, 'b': 'Raciocínio', 'e': q['e'], 'o': q['o'], 'a': q['a'], 'x': q['x'],
              'fix': 1, 'fmt': FMT_SHORT[q['f']], 'src': q['n']}
        if q['f'] == 4:
            it['L'] = ['C', 'E']
        if q.get('k'):
            it['k'] = q['k']
        items.append(it)
    out = ROOT / 'ebook' / 'src' / out_name
    out.write_text(header(src) +
                   'window.QUESTOES = window.QUESTOES || [];\n'
                   'QUESTOES.push.apply(QUESTOES, ' + json.dumps(items, ensure_ascii=False, separators=(',', ':')) + ');\n',
                   encoding='utf-8')
    print('ok: %s (%d questões no %s)' % (out.relative_to(ROOT), len(items), chapter))


def gen_section_bank(src, prefix, groups, rules, out_name):
    """Banco de uma seção própria do e-book (como Direito Constitucional), com grupos do edital."""
    data = parse(ROOT / src)
    for q in data:
        q['g'] = rules(q) if callable(rules) else group_by(rules, q['t'])
    out = ROOT / 'ebook' / 'src' / out_name
    out.write_text(header(src) +
                   'window.%s_GROUPS = ' % prefix + json.dumps([{'id': g, 'n': name} for g, name in groups], ensure_ascii=False) + ';\n'
                   'window.%s_QS = ' % prefix + json.dumps(data, ensure_ascii=False, separators=(',', ':')) + ';\n', encoding='utf-8')
    counts = {}
    for q in data:
        counts[q['g']] = counts.get(q['g'], 0) + 1
    print('ok: %s (%d questões; por item: %s)' % (out.relative_to(ROOT), len(data),
          ', '.join('%s %d' % (g, counts.get(g, 0)) for g, _ in groups)))


if __name__ == '__main__':
    gen_dc()
    gen_section_bank('historia-pernambuco/questoes-historia-de-pernambuco.md', 'HPE', HPE_GROUPS, HPE_RULES, 'hpe-data.js')
    gen_section_bank('informatica/questoes-informatica-pmpe-2026.md', 'INF', INF_GROUPS, inf_group, 'inf-data.js')
    gen_section_bank('lingua-portuguesa/questoes-reescrita-pmpe-2026.md', 'LP', LP_GROUPS, lp_group, 'lp-data.js')
    gen_section_bank('raciocinio-logico/questoes-raciocinio-logico-pmpe-2026.md', 'RL', RL_GROUPS, rl_group, 'rl-data.js')
    gen_chapter_bank('direitos-humanos-legislacao/questoes-abuso-de-autoridade.md', 'c7', 'q-abu.js')
    gen_chapter_bank('direitos-humanos-legislacao/questoes-lei-de-tortura.md', 'c8', 'q-tor.js')
    gen_chapter_bank('direitos-humanos-legislacao/questoes-lei-maria-da-penha.md', 'c9', 'q-lmp.js')
    gen_chapter_bank('direitos-humanos-legislacao/questoes-crimes-de-preconceito.md', 'c10', 'q-pre.js')
    gen_chapter_bank('direitos-humanos-legislacao/questoes-crimes-ambientais.md', 'c11', 'q-amb.js')
    gen_chapter_bank('direitos-humanos-legislacao/questoes-crimes-hediondos.md', 'c12', 'q-hed.js')
    gen_chapter_bank('direitos-humanos-legislacao/questoes-lei-de-drogas.md', 'c13', 'q-drg.js')
