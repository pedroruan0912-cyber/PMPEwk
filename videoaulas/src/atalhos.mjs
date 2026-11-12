// Tabela única de atalhos. Os roteiros citam a chave da ação; as teclas saem daqui,
// para nenhuma aula mostrar um atalho diferente de outra.
// office = Microsoft Office 2019 em português do Brasil; libre = LibreOffice 7.
// null = não há atalho padrão para a ação naquela suíte.
// nota = ressalva curta, mostrada na tela embaixo do nome da ação.
//
// Conferência (novembro de 2026):
// - LibreOffice: ajuda oficial 7.6 em português (help.libreoffice.org, páginas de teclas de atalho gerais,
//   do Writer, do Calc e do Impress) e a configuração de teclas de uma instalação do LibreOffice.
//   Depois, todas as teclas do LibreOffice foram conferidas no arquivo de teclas do código-fonte
//   (officecfg/.../Accelerators.xcu, ramos 7.0 a 7.6): Ctrl+Shift+C registra alterações só no 7.0 e no 7.1
//   (sai no 7.2), e Alt+= nunca foi atalho da AutoSoma no Calc 7.
// - Office: páginas "Atalhos de teclado" do suporte da Microsoft em português (Word, Excel, PowerPoint).
//   Essas páginas misturam teclas da versão em inglês com as da versão em português (na mesma tabela, Ctrl+A
//   aparece como "abrir" e como "selecionar tudo"). Confirmadas ali: novo, abrir, salvar, salvarComo, imprimir,
//   fechar, sair, desfazer, negrito, italico, sublinhado, esquerda, centralizar, justificar, quebraPagina, marcas,
//   maiusculas, sobrescrito, alteracoes, hiperlink, ortografia, ajuda, colarEspecial, estilos (Ctrl+Alt+Shift+S)
//   e todas as de planilha e de slides.
//   A página mostra a tecla da versão em inglês, e a tabela mantém a da versão em português (a que as provas
//   cobram), em: selecionarTudo (Ctrl+T), refazer no Word (Ctrl+R), localizar (Ctrl+L), substituir (Ctrl+U),
//   direita (Ctrl+G) e subscrito (Ctrl+=).

const a = (nome, office, libre, onde, nota) => ({ nome, office, libre, onde, ...(nota ? { nota } : {}) });

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
  refazer: a('Refazer (Word e Writer)', 'Ctrl+R', 'Ctrl+Y', 'texto'),
  esquerda: a('Alinhar à esquerda', 'Ctrl+Q', 'Ctrl+L', 'texto'),
  centralizar: a('Centralizar', 'Ctrl+E', 'Ctrl+E', 'texto'),
  direita: a('Alinhar à direita', 'Ctrl+G', 'Ctrl+R', 'texto'),
  justificar: a('Justificar', 'Ctrl+J', 'Ctrl+J', 'texto'),
  quebraPagina: a('Quebra de página', 'Ctrl+Enter', 'Ctrl+Enter', 'texto'),
  marcas: a('Mostrar marcas de formatação', 'Ctrl+*', 'Ctrl+F10', 'texto'),
  maiusculas: a('Alternar maiúsculas e minúsculas', 'Shift+F3', 'Shift+F3', 'texto'),
  sobrescrito: a('Sobrescrito', 'Ctrl+Shift++', 'Ctrl+Shift+P', 'texto'),
  subscrito: a('Subscrito', 'Ctrl+=', 'Ctrl+Shift+B', 'texto'),
  alteracoes: a('Controlar ou registrar alterações', 'Ctrl+Shift+E', 'Ctrl+Shift+C', 'texto', 'No LibreOffice, só nas versões 7.0 e 7.1'),
  navegador: a('Navegador', null, 'F5', 'texto'),
  estilos: a('Painel de estilos', 'Ctrl+Alt+Shift+S', 'F11', 'texto'),
  inserirTabela: a('Inserir tabela', null, 'Ctrl+F12', 'texto'),
  limparFormatacao: a('Limpar formatação direta', null, 'Ctrl+M', 'texto'),
  listaNumerada: a('Lista numerada', null, 'F12', 'texto'),

  // ---- planilhas: Excel e Calc ----
  editarCelula: a('Editar a célula', 'F2', 'F2', 'planilha'),
  refAbsoluta: a('Alternar referência relativa e absoluta', 'F4', 'F4', 'planilha'),
  formatarCelulas: a('Formatar células', 'Ctrl+1', 'Ctrl+1', 'planilha'),
  dataAtual: a('Inserir a data de hoje', 'Ctrl+;', 'Ctrl+;', 'planilha'),
  filtro: a('Filtro ou Autofiltro', 'Ctrl+Shift+L', 'Ctrl+Shift+L', 'planilha'),
  autoSoma: a('AutoSoma', 'Alt+=', null, 'planilha'),
  inserirFuncao: a('Inserir função ou Assistente de funções', 'Shift+F3', 'Ctrl+F2', 'planilha'),
  recalcular: a('Recalcular', 'F9', 'F9', 'planilha'),
  proximaPlanilha: a('Próxima planilha', 'Ctrl+PgDn', 'Ctrl+PgDn', 'planilha'),
  refazerPlanilha: a('Refazer (Excel e Calc)', 'Ctrl+Y', 'Ctrl+Y', 'planilha'),
  graficoRapido: a('Criar gráfico em uma planilha nova', 'F11', null, 'planilha'),

  // ---- apresentações: PowerPoint e Impress ----
  inicioApresentacao: a('Apresentar desde o primeiro slide', 'F5', 'F5', 'slides'),
  slideAtual: a('Apresentar a partir do slide atual', 'Shift+F5', 'Shift+F5', 'slides'),
  novoSlide: a('Novo slide', 'Ctrl+M', 'Ctrl+M', 'slides'),
  encerrar: a('Encerrar a apresentação', 'Esc', 'Esc', 'slides'),
  telaPreta: a('Tela preta durante a apresentação', '.', '.', 'slides'),
  telaBranca: a('Tela branca durante a apresentação', ',', ',', 'slides'),
};
