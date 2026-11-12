// Formato de uma aula e a validação que roda antes de gravar qualquer coisa.
// Aula: { n, slug, titulo, cenas: [{ fala, voz?, tela: { tipo, ... } }] }

export const TIPOS = ['capa', 'secao', 'janela', 'planilha', 'teclas', 'compara', 'lista', 'pegadinha', 'questao'];
export const LIMITE_FALA = 300;

export const APPS = ['word', 'excel', 'powerpoint', 'writer', 'calc', 'impress'];
export const APPS_PLANILHA = ['excel', 'calc'];

// Guias da faixa de opções (Office 2019) e menus (LibreOffice 7), em português, na ordem em que aparecem.
export const ABAS = {
  word: ['Arquivo', 'Página Inicial', 'Inserir', 'Design', 'Layout', 'Referências', 'Correspondências', 'Revisão', 'Exibir', 'Ajuda'],
  excel: ['Arquivo', 'Página Inicial', 'Inserir', 'Layout da Página', 'Fórmulas', 'Dados', 'Revisão', 'Exibir', 'Ajuda'],
  powerpoint: ['Arquivo', 'Página Inicial', 'Inserir', 'Design', 'Transições', 'Animações', 'Apresentação de Slides', 'Revisão', 'Exibir', 'Ajuda'],
  writer: ['Arquivo', 'Editar', 'Exibir', 'Inserir', 'Formatar', 'Estilos', 'Tabela', 'Formulário', 'Ferramentas', 'Janela', 'Ajuda'],
  calc: ['Arquivo', 'Editar', 'Exibir', 'Inserir', 'Formatar', 'Estilos', 'Planilha', 'Dados', 'Ferramentas', 'Janela', 'Ajuda'],
  impress: ['Arquivo', 'Editar', 'Exibir', 'Inserir', 'Formatar', 'Slide', 'Apresentação de slides', 'Ferramentas', 'Janela', 'Ajuda'],
};
export const COLUNAS = 'ABCDEF';
export const LINHAS = 8;

const texto = (v) => typeof v === 'string' && v.trim() !== '';
const listaDeTextos = (v) => Array.isArray(v) && v.length > 0 && v.every(texto);

// A grade desenhada vai de A1 a F8; fora disso a célula não apareceria na tela.
export function celulaValida(ref) {
  const m = /^([A-Z])([1-9]\d*)$/.exec(ref);
  return !!m && COLUNAS.includes(m[1]) && Number(m[2]) <= LINHAS;
}

const intervaloValido = (ref) => typeof ref === 'string' && ref.split(':').length <= 2 && ref.split(':').every(celulaValida);

// Itens de uma janela podem vir soltos ou em grupos; devolve a lista plana dos itens clicáveis.
export function itensDaJanela(itens) {
  if (!Array.isArray(itens)) return [];
  return itens.flatMap((i) => (typeof i === 'string' ? [i] : Array.isArray(i?.itens) ? i.itens : []));
}

const REGRAS = {
  capa: (t, erro) => {
    if (!texto(t.titulo)) erro('capa sem titulo');
    if (!texto(t.subtitulo)) erro('capa sem subtitulo');
  },
  secao: (t, erro) => {
    if (!texto(t.titulo)) erro('secao sem titulo');
    if (t.itens !== undefined && !listaDeTextos(t.itens)) erro('secao com itens vazios');
  },
  janela: (t, erro) => {
    if (!APPS.includes(t.app)) erro(`janela com app desconhecido: ${t.app}`);
    if (!texto(t.aba)) erro('janela sem aba');
    else if (ABAS[t.app] && !ABAS[t.app].includes(t.aba)) erro(`"${t.aba}" não é guia nem menu do ${t.app}`);
    const itens = itensDaJanela(t.itens);
    const gruposOk = Array.isArray(t.itens) && t.itens.every((i) => texto(i) || (texto(i?.grupo) && listaDeTextos(i.itens)));
    if (itens.length === 0 || !gruposOk) erro('janela sem itens válidos');
    if (t.destaque !== undefined && !itens.includes(t.destaque)) erro(`destaque "${t.destaque}" não está nos itens da janela`);
    if (t.balao !== undefined && !texto(t.balao)) erro('janela com balao vazio');
  },
  planilha: (t, erro) => {
    if (!APPS_PLANILHA.includes(t.app)) erro(`planilha com app que não é de planilha: ${t.app}`);
    if (!t.celulas || typeof t.celulas !== 'object') erro('planilha sem celulas');
    for (const ref of Object.keys(t.celulas ?? {})) {
      if (!celulaValida(ref)) erro(`célula fora da grade A1:F8: ${ref}`);
    }
    if (!celulaValida(t.em ?? '')) erro(`célula ativa (em) inválida: ${t.em}`);
    for (const ref of t.destaque ?? []) {
      if (!intervaloValido(ref)) erro(`destaque de planilha inválido: ${ref}`);
    }
  },
  teclas: (t, erro, atalhos) => {
    if (!Array.isArray(t.acoes) || t.acoes.length === 0) erro('teclas sem acoes');
    for (const a of t.acoes ?? []) {
      if (!atalhos[a]) erro(`ação que não existe na tabela de atalhos: ${a}`);
    }
  },
  compara: (t, erro) => {
    if (!texto(t.titulo)) erro('compara sem titulo');
    if (!listaDeTextos(t.office)) erro('compara sem a coluna office');
    if (!listaDeTextos(t.libre)) erro('compara sem a coluna libre');
  },
  lista: (t, erro) => {
    if (!texto(t.titulo)) erro('lista sem titulo');
    if (!listaDeTextos(t.itens)) erro('lista sem itens');
  },
  pegadinha: (t, erro) => {
    if (!texto(t.titulo)) erro('pegadinha sem titulo');
    if (!texto(t.texto)) erro('pegadinha sem texto');
  },
  questao: (t, erro) => {
    if (!texto(t.enunciado)) erro('questao sem enunciado');
    if (!listaDeTextos(t.alternativas) || t.alternativas.length !== 5) erro('questao precisa de 5 alternativas');
    if (!Number.isInteger(t.correta) || t.correta < 0 || t.correta > 4) erro('questao com correta fora de 0 a 4');
    if (typeof t.gabarito !== 'boolean') erro('questao sem gabarito (true ou false)');
  },
};

export function validarAula(aula, atalhos) {
  const erros = [];
  const onde = `aula ${aula?.n ?? '?'}`;
  if (!Number.isInteger(aula?.n)) erros.push(`${onde}: falta o número da aula (n)`);
  if (!texto(aula?.slug)) erros.push(`${onde}: falta o slug`);
  if (!texto(aula?.titulo)) erros.push(`${onde}: falta o titulo`);
  if (!Array.isArray(aula?.cenas) || aula.cenas.length === 0) {
    erros.push(`${onde}: sem cenas`);
    return erros;
  }
  aula.cenas.forEach((cena, i) => {
    const erro = (msg) => erros.push(`${onde}, cena ${i + 1}: ${msg}`);
    if (!texto(cena?.fala)) erro('sem fala');
    else if (cena.fala.length > LIMITE_FALA) erro(`fala com ${cena.fala.length} caracteres (máximo ${LIMITE_FALA})`);
    if (cena?.voz !== undefined && !texto(cena.voz)) erro('voz vazia');
    const tela = cena?.tela;
    if (!tela || typeof tela !== 'object') return erro('sem tela');
    if (!TIPOS.includes(tela.tipo)) return erro(`tipo de tela desconhecido: ${tela.tipo}`);
    REGRAS[tela.tipo](tela, erro, atalhos);
  });
  return erros;
}
