// Tabela única de atalhos. Os roteiros citam a chave da ação; as teclas saem daqui,
// para nenhuma aula mostrar um atalho diferente de outra.
// office = Microsoft Office 2019 em português do Brasil; libre = LibreOffice 7.
// null = não há atalho padrão para a ação naquela suíte.

const a = (nome, office, libre, onde) => ({ nome, office, libre, onde });

export const ATALHOS = {
  // ---- comuns a todos os programas ----
  novo: a('Novo documento', 'Ctrl+O', 'Ctrl+N', 'geral'),
  abrir: a('Abrir', 'Ctrl+A', 'Ctrl+O', 'geral'),
  salvar: a('Salvar', 'Ctrl+B', 'Ctrl+S', 'geral'),
  salvarComo: a('Salvar como', 'F12', 'Ctrl+Shift+S', 'geral'),
  imprimir: a('Imprimir', 'Ctrl+P', 'Ctrl+P', 'geral'),
  fechar: a('Fechar documento', 'Ctrl+W', 'Ctrl+W', 'geral'),
  sair: a('Sair do programa', 'Alt+F4', 'Ctrl+Q', 'geral'),
  desfazer: a('Desfazer', 'Ctrl+Z', 'Ctrl+Z', 'geral'),
  refazer: a('Refazer', 'Ctrl+R', 'Ctrl+Y', 'geral'),
  selecionarTudo: a('Selecionar tudo', 'Ctrl+T', 'Ctrl+A', 'geral'),
  copiar: a('Copiar', 'Ctrl+C', 'Ctrl+C', 'geral'),
  recortar: a('Recortar', 'Ctrl+X', 'Ctrl+X', 'geral'),
  colar: a('Colar', 'Ctrl+V', 'Ctrl+V', 'geral'),
  colarEspecial: a('Colar especial', 'Ctrl+Alt+V', 'Ctrl+Shift+V', 'geral'),
  negrito: a('Negrito', 'Ctrl+N', 'Ctrl+B', 'geral'),
  italico: a('Itálico', 'Ctrl+I', 'Ctrl+I', 'geral'),
  sublinhado: a('Sublinhado', 'Ctrl+S', 'Ctrl+U', 'geral'),
  localizar: a('Localizar', 'Ctrl+L', 'Ctrl+F', 'geral'),
  substituir: a('Localizar e substituir', 'Ctrl+U', 'Ctrl+H', 'geral'),
  ortografia: a('Ortografia e gramática', 'F7', 'F7', 'geral'),
  hiperlink: a('Inserir hiperlink', 'Ctrl+K', 'Ctrl+K', 'geral'),
  ajuda: a('Ajuda', 'F1', 'F1', 'geral'),

  // ---- editores de texto: Word e Writer ----
  esquerda: a('Alinhar à esquerda', 'Ctrl+Q', 'Ctrl+L', 'texto'),
  centralizar: a('Centralizar', 'Ctrl+E', 'Ctrl+E', 'texto'),
  direita: a('Alinhar à direita', 'Ctrl+G', 'Ctrl+R', 'texto'),
  justificar: a('Justificar', 'Ctrl+J', 'Ctrl+J', 'texto'),
  quebraPagina: a('Quebra de página', 'Ctrl+Enter', 'Ctrl+Enter', 'texto'),
  marcas: a('Mostrar marcas de formatação', 'Ctrl+*', 'Ctrl+F10', 'texto'),
  maiusculas: a('Alternar maiúsculas e minúsculas', 'Shift+F3', 'Shift+F3', 'texto'),
  sobrescrito: a('Sobrescrito', 'Ctrl+Shift++', 'Ctrl+Shift+P', 'texto'),
  subscrito: a('Subscrito', 'Ctrl+=', 'Ctrl+Shift+B', 'texto'),
  alteracoes: a('Controlar ou registrar alterações', 'Ctrl+Shift+E', 'Ctrl+Shift+C', 'texto'),
  navegador: a('Navegador', null, 'F5', 'texto'),
  estilos: a('Painel de estilos', null, 'F11', 'texto'),
  inserirTabela: a('Inserir tabela', null, 'Ctrl+F12', 'texto'),
  limparFormatacao: a('Limpar formatação direta', null, 'Ctrl+M', 'texto'),

  // ---- planilhas: Excel e Calc ----
  editarCelula: a('Editar a célula', 'F2', 'F2', 'planilha'),
  refAbsoluta: a('Alternar referência relativa e absoluta', 'F4', 'F4', 'planilha'),
  formatarCelulas: a('Formatar células', 'Ctrl+1', 'Ctrl+1', 'planilha'),
  dataAtual: a('Inserir a data de hoje', 'Ctrl+;', 'Ctrl+;', 'planilha'),
  filtro: a('Filtro ou Autofiltro', 'Ctrl+Shift+L', 'Ctrl+Shift+L', 'planilha'),
  autoSoma: a('AutoSoma', 'Alt+=', 'Alt+=', 'planilha'),
  inserirFuncao: a('Inserir função ou Assistente de funções', 'Shift+F3', 'Ctrl+F2', 'planilha'),
  recalcular: a('Recalcular', 'F9', 'F9', 'planilha'),
  proximaPlanilha: a('Próxima planilha', 'Ctrl+PgDn', 'Ctrl+PgDn', 'planilha'),

  // ---- apresentações: PowerPoint e Impress ----
  inicioApresentacao: a('Apresentar desde o primeiro slide', 'F5', 'F5', 'slides'),
  slideAtual: a('Apresentar a partir do slide atual', 'Shift+F5', 'Shift+F5', 'slides'),
  novoSlide: a('Novo slide', 'Ctrl+M', 'Ctrl+M', 'slides'),
  encerrar: a('Encerrar a apresentação', 'Esc', 'Esc', 'slides'),
};
