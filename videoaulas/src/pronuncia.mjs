// Converte o texto escrito de uma fala no texto que a voz deve ler.
// A tela mostra o texto original; só o áudio usa o resultado daqui.
// Algarismos ficam como estão: o voz.py os escreve por extenso.

const LETRAS = {
  A: 'á', B: 'bê', C: 'cê', D: 'dê', E: 'é', F: 'efe', G: 'gê', H: 'agá', I: 'i', J: 'jota', K: 'cá', L: 'éle', M: 'eme',
  N: 'ene', O: 'ó', P: 'pê', Q: 'quê', R: 'érre', S: 'esse', T: 'tê', U: 'u', V: 'vê', W: 'dáblio', X: 'xis', Y: 'ípsilon', Z: 'zê',
};

const TECLAS = {
  Ctrl: 'control', Shift: 'xift', Alt: 'alt', Enter: 'ênter', 'Espaço': 'espaço', Home: 'rôume', End: 'ênd',
  PgUp: 'pêige âp', PgDn: 'pêige dáun', Esc: 'esc', Tab: 'tab',
  '=': 'igual', ';': 'ponto e vírgula', '.': 'ponto', ',': 'vírgula', '*': 'asterisco', '<': 'menor', '>': 'maior',
  '[': 'abre colchete', ']': 'fecha colchete', '+': 'mais', '-': 'menos',
};

const EXTENSOES = {
  docx: 'doc xis', doc: 'doc', dotx: 'dót xis', odt: 'ó dê tê', ott: 'ó tê tê',
  xlsx: 'xis éle esse xis', xls: 'xis éle esse', xltx: 'xis éle tê xis', ods: 'ó dê esse', ots: 'ó tê esse',
  pptx: 'pê pê tê xis', ppt: 'pê pê tê', ppsx: 'pê pê esse xis', potx: 'pót xis', odp: 'ó dê pê', otp: 'ó tê pê',
  pdf: 'pê dê efe', csv: 'cê esse vê', txt: 'tê xis tê', rtf: 'érre tê efe',
};

// Funções de planilha que a voz deve ler como palavra (e não soletrar).
const FUNCOES = ['SOMA', 'MÉDIA', 'MÁXIMO', 'MÍNIMO', 'MAIOR', 'MENOR', 'SE', 'OU', 'CONCATENAR', 'ARRED', 'TRUNCAR', 'INT', 'MOD', 'HOJE', 'AGORA', 'MED', 'MODO', 'CONT'];

// (escrita, pronúncia aproximada em português). A ordem importa: o mais específico vem antes.
const LEXICO = [
  ['PROCV', 'proc vê'], ['PROCH', 'proc agá'], ['SOMASES', 'soma ses'], ['SOMASE', 'soma se'], ['MÉDIASE', 'média se'], ['SEERRO', 'se erro'],
  ['The Document Foundation', 'dê dóquiument faundêichon'], ['OpenDocument', 'ôupen dóquiument'], ['Open XML', 'ôupen xis eme éle'],
  ['LibreOffice', 'libre ófice'], ['Microsoft', 'máicrossóft'], ['PowerPoint', 'páuer póint'], ['WordArt', 'uôrd árt'], ['SmartArt', 'ismárt árt'],
  ['Office', 'ófice'], ['Word', 'uôrd'], ['Excel', 'ecsséu'], ['Writer', 'ráiter'], ['Calc', 'cálqui'], ['Impress', 'imprés'],
  ['Access', 'ácsses'], ['Outlook', 'áutluc'], ['Publisher', 'páblixer'], ['Draw', 'dró'], ['Math', 'méf'], ['macOS', 'méc ó esse'], ['spreadsheet', 'ispréd xit'], ['software', 'sóftuér'], ['Calibri', 'calíbri'],
  ['Windows', 'uíndous'], ['Backstage', 'béc stêidj'], ['Layout', 'leiáute'], ['layout', 'leiáute'], ['layouts', 'leiáutes'], ['Design', 'dizáin'],
  ['slides', 'isláides'], ['slide', 'isláide'], ['Slides', 'isláides'], ['Slide', 'isláide'],
  ['hiperlink', 'hiperlínque'], ['Hiperlink', 'hiperlínque'], ['mouse', 'máuze'], ['AutoSoma', 'auto soma'], ['Autofiltro', 'auto filtro'], ['AutoFiltro', 'auto filtro'],
  ['Ctrl', 'control'], ['Shift', 'xift'], ['Enter', 'ênter'], ['Delete', 'delíti'], ['Backspace', 'béc spêice'], ['Caps Lock', 'cáps lóc'],
  ['PgUp', 'pêige âp'], ['PgDn', 'pêige dáun'], ['Home', 'rôume'],
  ['AOCP', 'a ó cê pê'], ['PMPE', 'pê eme pê é'], ['PDF', 'pê dê efe'], ['ODF', 'ó dê efe'], ['XML', 'xis eme éle'], ['MP4', 'eme pê 4'],
];

const ANTES = '(?<![A-Za-zÀ-ú0-9])';
const DEPOIS = '(?![A-Za-zÀ-ú0-9])';
const esc = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const palavra = (s, flags = 'g') => new RegExp(ANTES + esc(s) + DEPOIS, flags);

const REF = /(?<![A-Za-zÀ-ú0-9$])(\$?)([A-Z])(\$?)(\d+)(?![A-Za-zÀ-ú0-9])/g;
const DOIS_PONTOS_DE_INTERVALO = /(?<=(?<![A-Za-zÀ-ú0-9])\$?[A-Z]\$?\d+):(?=\$?[A-Z]\$?\d)/g;
const dizRef = (_, d1, letra, d2, num) => `${d1 ? 'cifrão ' : ''}${LETRAS[letra]} ${d2 ? 'cifrão ' : ''}${num}`;

const FUNCAO_COM_PONTO = /(?<![A-Za-zÀ-ú0-9])([A-ZÀ-Ú]{2,})\.([A-ZÀ-Ú]{2,})(?![A-Za-zÀ-ú0-9])/g;

function nomesDeFuncao(t) {
  for (const [escrita, fala] of LEXICO.slice(0, 6)) t = t.replace(palavra(escrita), fala);
  t = t.replace(FUNCAO_COM_PONTO, (_, a, b) => `${a.toLowerCase()} ponto ${b.toLowerCase()}`);
  for (const f of FUNCOES) t = t.replace(palavra(f), f.toLowerCase());
  return t;
}

const OPERADORES = [
  ['>=', ' maior ou igual a '], ['<=', ' menor ou igual a '], ['<>', ' diferente de '], ['>', ' maior que '], ['<', ' menor que '],
  ['=', ' igual a '], ['+', ' mais '], ['-', ' menos '], ['*', ' vezes '], ['/', ' dividido por '], ['^', ' elevado a '],
  ['&', ' concatenado com '], ['%', ' por cento '], ['!', ' exclamação '], ['.', ' ponto '],
  ['(', ', abre parênteses, '], [')', ', fecha parênteses, '], [';', ', ponto e vírgula, '], [':', ' dois pontos '],
];

function dizFormula(corpo) {
  let t = nomesDeFuncao(corpo);
  t = t.replace(/(\d),(\d)/g, '$1 vírgula $2');
  t = t.replace(DOIS_PONTOS_DE_INTERVALO, ' até ').replace(REF, dizRef);
  const sinais = new RegExp(OPERADORES.map(([s]) => esc(s)).join('|'), 'g');
  const fala = Object.fromEntries(OPERADORES);
  t = t.replace(sinais, (s) => fala[s]).toLowerCase();
  t = t.replace(/\s+/g, ' ').replace(/\s+,/g, ',').replace(/,(\s*,)+/g, ',').replace(/^[\s,]+|[\s,]+$/g, '');
  return `igual ${t}`;
}

const FORMULA = /=(?=[A-Za-zÀ-ú0-9$(])\S*/g;
const MODIFICADOR = '(?:Ctrl|Shift|Alt)';
const TECLA_FINAL = '(?:F\\d{1,2}|Enter|Espaço|Home|End|PgUp|PgDn|Esc|Tab|[A-Z0-9]|[=;.,*<>\\[\\]+-])';
const COMBINACAO = new RegExp(`${ANTES}${MODIFICADOR}(?:\\+${MODIFICADOR})*\\+${TECLA_FINAL}`, 'g');

function dizTecla(tecla) {
  if (TECLAS[tecla]) return TECLAS[tecla];
  const f = /^F(\d{1,2})$/.exec(tecla);
  if (f) return `efe ${f[1]}`;
  return LETRAS[tecla] ?? tecla;
}

function dizCombinacao(combo) {
  // "Ctrl+Shift++": o último "+" é a própria tecla.
  const partes = combo.endsWith('++') ? [...combo.slice(0, -2).split('+'), '+'] : combo.split('+');
  return partes.map(dizTecla).join(' ');
}

export function falavel(texto) {
  let t = texto.replace(/[“”"‘’]/g, '');
  t = t.replace(FORMULA, (m) => {
    const sobra = /[.,!?;:]+$/.exec(m)?.[0] ?? '';
    const corpo = m.slice(1, m.length - sobra.length);
    return `${dizFormula(corpo)},${sobra}`;
  });
  t = t.replace(COMBINACAO, dizCombinacao);
  t = t.replace(DOIS_PONTOS_DE_INTERVALO, ' até ').replace(REF, dizRef);
  t = t.replace(new RegExp(`(?<![A-Za-zÀ-ú0-9])\\.(${Object.keys(EXTENSOES).join('|')})${DEPOIS}`, 'g'), (_, e) => `ponto ${EXTENSOES[e]}`);
  t = nomesDeFuncao(t);
  for (const [escrita, fala] of LEXICO.slice(6)) t = t.replace(palavra(escrita), fala);
  t = t.replace(/(\d),(\d)/g, '$1 vírgula $2');
  t = t.replace(/→/g, ', depois, ').replace(/ = /g, ' é igual a ');
  t = t.replace(/\s*\(([^)]*)\)/g, ', $1,');
  t = t.replace(/,\s*([.,;:!?])/g, '$1');
  // "Planilha2" -> "Planilha 2": o número vai ser escrito por extenso e não pode grudar na palavra.
  t = t.replace(/([A-Za-zÀ-ú])(\d)/g, '$1 $2').replace(/(\d)([A-Za-zÀ-ú])/g, '$1 $2');
  return t.replace(/\s+/g, ' ').replace(/[\s,]+$/, '').trim();
}
