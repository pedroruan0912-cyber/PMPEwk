import { cena, pergunta } from './_cenas.mjs';

// Guias do Word 2019 em português, com os grupos e comandos que aparecem nas telas desta aula.
const PAGINA_INICIAL = [
  { grupo: 'Área de Transferência', itens: ['Colar', 'Recortar', 'Copiar', 'Pincel de Formatação'] },
  { grupo: 'Fonte', itens: ['Negrito', 'Itálico', 'Sublinhado', 'Tachado', 'Subscrito', 'Sobrescrito', 'Maiúsculas e Minúsculas', 'Cor do Realce do Texto', 'Cor da Fonte', 'Limpar Toda a Formatação'] },
  { grupo: 'Parágrafo', itens: ['Marcadores', 'Numeração', 'Mostrar Tudo', 'Alinhar à Esquerda', 'Centralizar', 'Alinhar à Direita', 'Justificar', 'Espaçamento de Linha e Parágrafo', 'Bordas'] },
  { grupo: 'Estilos', itens: ['Normal', 'Título 1', 'Título 2'] },
  { grupo: 'Edição', itens: ['Localizar', 'Substituir', 'Selecionar'] },
];
const INSERIR = [
  { grupo: 'Páginas', itens: ['Folha de Rosto', 'Página em Branco', 'Quebra de Página'] },
  { grupo: 'Tabelas', itens: ['Tabela'] },
  { grupo: 'Ilustrações', itens: ['Imagens', 'Formas', 'Ícones', 'SmartArt', 'Gráfico'] },
  { grupo: 'Cabeçalho e Rodapé', itens: ['Cabeçalho', 'Rodapé', 'Número de Página'] },
  { grupo: 'Texto', itens: ['Caixa de Texto', 'WordArt', 'Letra Capitular'] },
  { grupo: 'Símbolos', itens: ['Equação', 'Símbolo'] },
];
const DESIGN = [
  { grupo: 'Formatação do Documento', itens: ['Temas', 'Cores', 'Fontes', 'Espaçamento entre Parágrafos'] },
  { grupo: 'Plano de Fundo da Página', itens: ["Marca-d'água", 'Cor da Página', 'Bordas de Página'] },
];
const LAYOUT = [
  { grupo: 'Configurar Página', itens: ['Margens', 'Orientação', 'Tamanho', 'Colunas', 'Quebras', 'Números de Linha', 'Hifenização'] },
  { grupo: 'Parágrafo', itens: ['Recuar', 'Espaçamento'] },
  { grupo: 'Organizar', itens: ['Posição', 'Quebra de Texto Automática', 'Alinhar'] },
];
const REFERENCIAS = [
  { grupo: 'Sumário', itens: ['Sumário', 'Adicionar Texto', 'Atualizar Sumário'] },
  { grupo: 'Notas de Rodapé', itens: ['Inserir Nota de Rodapé', 'Inserir Nota de Fim'] },
  { grupo: 'Citações e Bibliografia', itens: ['Inserir Citação', 'Bibliografia'] },
  { grupo: 'Legendas', itens: ['Inserir Legenda', 'Referência Cruzada'] },
  { grupo: 'Índice', itens: ['Marcar Entrada', 'Inserir Índice'] },
];
const CORRESPONDENCIAS = [
  { grupo: 'Criar', itens: ['Envelopes', 'Etiquetas'] },
  { grupo: 'Iniciar Mala Direta', itens: ['Iniciar Mala Direta', 'Selecionar Destinatários', 'Editar Lista de Destinatários'] },
  { grupo: 'Gravar e Inserir Campos', itens: ['Bloco de Endereço', 'Linha de Saudação', 'Inserir Campo de Mesclagem'] },
  { grupo: 'Visualizar Resultados', itens: ['Visualizar Resultados'] },
  { grupo: 'Concluir', itens: ['Concluir e Mesclar'] },
];
const REVISAO = [
  { grupo: 'Revisão de Texto', itens: ['Ortografia e Gramática', 'Dicionário de Sinônimos', 'Contagem de Palavras'] },
  { grupo: 'Comentários', itens: ['Novo Comentário', 'Excluir'] },
  { grupo: 'Controle', itens: ['Controlar Alterações', 'Mostrar Marcações'] },
  { grupo: 'Alterações', itens: ['Aceitar', 'Rejeitar'] },
  { grupo: 'Proteger', itens: ['Restringir Edição'] },
];
const EXIBIR = [
  { grupo: 'Modos de Exibição', itens: ['Modo de Leitura', 'Layout de Impressão', 'Layout da Web', 'Estrutura de Tópicos', 'Rascunho'] },
  { grupo: 'Mostrar', itens: ['Régua', 'Linhas de Grade', 'Painel de Navegação'] },
  { grupo: 'Zoom', itens: ['Zoom', '100%', 'Uma Página', 'Largura da Página'] },
  { grupo: 'Janela', itens: ['Nova Janela', 'Organizar Tudo', 'Dividir'] },
];
const ARQUIVO = ['Informações', 'Novo', 'Abrir', 'Salvar', 'Salvar como', 'Imprimir', 'Compartilhar', 'Exportar', 'Fechar', 'Conta', 'Opções'];

const word = (aba, itens, destaque, balao) => ({ tipo: 'janela', app: 'word', aba, itens, ...(destaque ? { destaque } : {}), ...(balao ? { balao } : {}) });

export default {
  n: 2,
  slug: 'word',
  titulo: 'Word 2019',
  cenas: [
    cena('Bem-vindo à aula dois. Agora vamos abrir o Word 2019 e percorrer a faixa de opções guia por guia. Em cada guia, você vai ver os comandos que mais aparecem em prova e, no fim, os atalhos do Word em português.',
      { tipo: 'capa', titulo: 'Word 2019', subtitulo: 'A faixa de opções guia por guia, os recursos mais cobrados e os atalhos em português' }),

    cena('O Word 2019 tem nove guias principais, nesta ordem: Arquivo, Página Inicial, Inserir, Design, Layout, Referências, Correspondências, Revisão e Exibir. Saber em qual guia fica cada comando é o tipo de pergunta mais comum sobre o Word.',
      { tipo: 'lista', titulo: 'As guias do Word 2019', itens: ['Arquivo e Página Inicial', 'Inserir', 'Design e Layout', 'Referências', 'Correspondências', 'Revisão e Exibir'] }),

    // ---------- Página Inicial ----------
    cena('Comece pela guia Página Inicial. Ela reúne o que você mais usa para formatar o texto, em cinco grupos: Área de Transferência, Fonte, Parágrafo, Estilos e Edição.',
      { tipo: 'secao', titulo: 'Guia Página Inicial', itens: ['Área de Transferência', 'Fonte', 'Parágrafo', 'Estilos', 'Edição'] }),

    cena('No grupo Área de Transferência ficam Colar, Recortar e Copiar, e também o Pincel de Formatação. O pincel copia só a formatação de um trecho, como fonte, cor e tamanho, e aplica em outro. Ele não copia o texto.',
      word('Página Inicial', PAGINA_INICIAL, 'Pincel de Formatação', 'Copia a formatação, não o texto. Um clique aplica uma vez; dois cliques mantêm o pincel ligado até você apertar Esc.')),

    cena('O grupo Fonte muda a aparência das letras: tipo de fonte, tamanho, negrito, itálico, sublinhado, tachado, subscrito, sobrescrito, cor e realce. No Word 2019, a fonte padrão de um documento novo é Calibri, tamanho 11.',
      word('Página Inicial', PAGINA_INICIAL, 'Limpar Toda a Formatação', 'Remove negrito, cores e tamanhos aplicados e devolve o texto ao estilo Normal.')),

    cena('Os atalhos do grupo Fonte. No Word em português, negrito é Ctrl+N, itálico é Ctrl+I e sublinhado é Ctrl+S. Subscrito, como o dois de H2O, é Ctrl+=. Sobrescrito, como o expoente de metro quadrado, é Ctrl+Shift++. E Shift+F3 alterna maiúsculas e minúsculas.',
      { tipo: 'teclas', titulo: 'Grupo Fonte', acoes: ['negrito', 'italico', 'sublinhado', 'subscrito', 'sobrescrito', 'maiusculas'] },
      'Os atalhos do grupo Fonte. No Word em português, negrito é Ctrl+N, itálico é Ctrl+I e sublinhado é Ctrl+S. Subscrito, como o dois de agá dois ó, é Ctrl+=. Sobrescrito, como o expoente de metro quadrado, é Ctrl+Shift++. E Shift+F3 alterna maiúsculas e minúsculas.'),

    cena('O grupo Parágrafo cuida de marcadores, numeração, recuos, alinhamento, espaçamento entre linhas e bordas. O botão Mostrar Tudo exibe as marcas de parágrafo e os outros símbolos de formatação que ficam ocultos. Essas marcas aparecem na tela, mas não são impressas.',
      word('Página Inicial', PAGINA_INICIAL, 'Mostrar Tudo', 'Mostra as marcas de parágrafo, espaços e tabulações. Elas não saem na impressão.')),

    cena('São quatro alinhamentos. No Word em português: Ctrl+Q alinha à esquerda, Ctrl+E centraliza, Ctrl+G alinha à direita e Ctrl+J justifica. Justificar é alinhar o texto nas duas margens ao mesmo tempo.',
      { tipo: 'teclas', titulo: 'Alinhamento do parágrafo', acoes: ['esquerda', 'centralizar', 'direita', 'justificar'] }),

    cena('O grupo Estilos guarda conjuntos prontos de formatação, como Normal, Título 1 e Título 2. A vantagem é dupla: mudando o estilo, todos os trechos que o usam mudam juntos. E os estilos de título são a base do sumário automático.',
      { tipo: 'lista', titulo: 'Estilos', itens: ['Um estilo é um conjunto de formatações com nome', 'Normal é o estilo padrão do texto', 'Título 1, Título 2 e Título 3 marcam os títulos do documento', 'Alterou o estilo: muda todo texto que usa aquele estilo', 'O sumário automático é montado com os estilos de título'] }),

    cena('O último grupo é Edição, com Localizar, Substituir e Selecionar. No Word em português, localizar é Ctrl+L, substituir é Ctrl+U e selecionar tudo é Ctrl+T. O T vem de tudo.',
      { tipo: 'teclas', titulo: 'Grupo Edição', acoes: ['localizar', 'substituir', 'selecionarTudo'] },
      'O último grupo é Edição, com Localizar, Substituir e Selecionar. No Word em português, localizar é Ctrl+L, substituir é Ctrl+U e selecionar tudo é Ctrl+T. O tê vem de tudo.'),

    cena('Seleção com o mouse também é cobrada. Dois cliques selecionam a palavra. Três cliques selecionam o parágrafo. Com a tecla Ctrl apertada, um clique seleciona a frase. Na margem esquerda, um clique seleciona a linha e três cliques selecionam o documento inteiro.',
      { tipo: 'lista', titulo: 'Selecionar com o mouse', itens: ['Dois cliques na palavra: seleciona a palavra', 'Três cliques no parágrafo: seleciona o parágrafo', 'Ctrl apertado e um clique: seleciona a frase', 'Um clique na margem esquerda: seleciona a linha', 'Três cliques na margem esquerda: seleciona tudo'] }),

    // ---------- Inserir ----------
    cena('Segunda guia: Inserir. A lógica é simples: tudo o que você acrescenta ao documento além do texto digitado fica aqui. Tabela, imagem, forma, gráfico, link, cabeçalho, rodapé, número de página, caixa de texto e símbolo.',
      { tipo: 'secao', titulo: 'Guia Inserir', itens: ['Páginas', 'Tabelas', 'Ilustrações', 'Links', 'Cabeçalho e Rodapé', 'Texto', 'Símbolos'] }),

    cena('O grupo Tabelas tem um botão só: Tabela. Com ele você monta a grade escolhendo o número de linhas e de colunas. Quando o cursor está dentro de uma tabela, aparecem duas guias extras, Design e Layout, das Ferramentas de Tabela.',
      word('Inserir', INSERIR, 'Tabela', 'Com o cursor dentro da tabela, surgem as guias Design e Layout das Ferramentas de Tabela.')),

    cena('No grupo Ilustrações ficam imagens, formas, ícones, SmartArt e gráfico. SmartArt é um diagrama pronto, como um organograma ou um ciclo, em que você só preenche os textos.',
      word('Inserir', INSERIR, 'SmartArt', 'Diagrama pronto: organograma, ciclo, processo, pirâmide. Você só preenche os textos.')),

    cena('Cabeçalho é a área da margem de cima da página, e rodapé, a da margem de baixo. O que você coloca ali se repete em todas as páginas. É onde costuma ficar o número de página, que tem um botão próprio neste mesmo grupo.',
      word('Inserir', INSERIR, 'Cabeçalho', 'Cabeçalho: margem superior. Rodapé: margem inferior. Para editar, dê dois cliques na margem da página.')),

    cena('No grupo Texto ficam a caixa de texto, o WordArt, que é um texto decorativo, e a letra capitular, aquela letra grande que abre o parágrafo. Ao lado, no grupo Símbolos, ficam a equação e o símbolo, para caracteres que não estão no teclado.',
      word('Inserir', INSERIR, 'Letra Capitular', 'A letra grande que abre o parágrafo, comum em jornais e livros.')),

    cena('Atenção à quebra de página. Ela aparece em duas guias: em Inserir, no grupo Páginas, e em Layout, no botão Quebras. O atalho é Ctrl+Enter. Já a quebra de seção só existe na guia Layout.',
      { tipo: 'pegadinha', titulo: 'Quebra de página fica em duas guias', texto: 'Inserir > Páginas > Quebra de Página, ou Layout > Configurar Página > Quebras. Atalho: Ctrl+Enter. Quebra de seção, só em Layout.' }),

    // ---------- Design e Layout ----------
    cena('Agora duas guias que as provas adoram confundir: Design e Layout. Design cuida da aparência geral do documento. Layout cuida da página: margens, orientação, tamanho do papel e colunas.',
      { tipo: 'lista', titulo: 'Design e Layout não são a mesma coisa', itens: ["Design: temas, cores e fontes do documento", "Design: marca-d'água, cor da página e bordas de página", 'Layout: margens, orientação, tamanho do papel e colunas', 'Layout: quebras, recuos e espaçamento'] }),

    cena('Na guia Design ficam os temas, que trocam de uma vez as cores e as fontes do documento. No grupo Plano de Fundo da Página estão a marca-d\'água, a cor da página e as bordas de página. Marca-d\'água é um texto ou imagem esmaecido atrás do texto, como a palavra Confidencial.',
      word('Design', DESIGN, "Marca-d'água", "Fica na guia Design, não em Inserir. Exemplos prontos: Confidencial, Rascunho, Urgente.")),

    cena('Na guia Layout, o grupo Configurar Página tem Margens, Orientação, Tamanho, Colunas, Quebras e Hifenização. A orientação pode ser retrato, com a folha em pé, ou paisagem, com a folha deitada.',
      word('Layout', LAYOUT, 'Orientação', 'Retrato: folha em pé. Paisagem: folha deitada. Tamanho é o do papel, como A4 e Carta.')),

    cena('O botão Quebras tem dois tipos. A quebra de página só empurra o texto para a página seguinte. A quebra de seção divide o documento em partes independentes. Com seções, o mesmo arquivo pode ter páginas em retrato e em paisagem, margens e cabeçalhos diferentes.',
      { tipo: 'lista', titulo: 'Quebra de página e quebra de seção', itens: ['Quebra de página: o texto continua na página seguinte', 'Quebra de coluna: o texto continua na coluna seguinte', 'Quebra de seção: divide o documento em partes independentes', 'Cada seção pode ter orientação, margens e cabeçalho próprios'] }),

    // ---------- Referências ----------
    cena('A guia Referências serve para trabalhos longos. Nela ficam o sumário, as notas de rodapé e de fim, as citações com bibliografia, as legendas de figuras e o índice.',
      { tipo: 'secao', titulo: 'Guia Referências', itens: ['Sumário', 'Notas de Rodapé', 'Citações e Bibliografia', 'Legendas', 'Índice'] }),

    cena('O sumário automático lista os títulos do documento com o número da página. Ele é montado a partir dos estilos de título: o que estiver com Título 1, Título 2 e Título 3 entra no sumário. Se o texto mudar, use Atualizar Sumário.',
      word('Referências', REFERENCIAS, 'Sumário', 'Montado a partir dos estilos Título 1, 2 e 3. Não é atualizado sozinho: use Atualizar Sumário.')),

    cena('Nota de rodapé e nota de fim são diferentes. A nota de rodapé aparece no pé da mesma página em que está a chamada. A nota de fim aparece no final do documento. As duas ficam na guia Referências, e não em Inserir.',
      word('Referências', REFERENCIAS, 'Inserir Nota de Rodapé', 'Nota de rodapé: no pé da mesma página. Nota de fim: no final do documento.')),

    // ---------- Correspondências ----------
    cena('A guia Correspondências faz a mala direta. A ideia: você escreve um documento modelo, liga esse documento a uma lista de destinatários, e o Word gera uma cópia personalizada para cada pessoa da lista.',
      { tipo: 'secao', titulo: 'Guia Correspondências', itens: ['Mala direta', 'Envelopes', 'Etiquetas'] }),

    cena('Os grupos seguem a ordem do trabalho. Iniciar Mala Direta escolhe o tipo de documento. Selecionar Destinatários aponta a lista, que pode ser uma planilha do Excel. Inserir Campo de Mesclagem coloca nome ou endereço no texto. E Concluir e Mesclar gera os documentos.',
      word('Correspondências', CORRESPONDENCIAS, 'Inserir Campo de Mesclagem', 'Campo de mesclagem é o espaço que o Word troca pelo dado de cada destinatário, como o nome.')),

    cena('Guarde os quatro passos da mala direta, nesta ordem: iniciar a mala direta, selecionar os destinatários, inserir os campos de mesclagem e, por último, concluir e mesclar.',
      { tipo: 'lista', titulo: 'Mala direta em quatro passos', itens: ['1. Iniciar Mala Direta: cartas, e-mails, envelopes ou etiquetas', '2. Selecionar Destinatários: a lista com os dados', '3. Inserir Campo de Mesclagem: nome, endereço...', '4. Concluir e Mesclar: gera um documento para cada pessoa'] }),

    // ---------- Revisão ----------
    cena('A guia Revisão reúne as ferramentas de conferência do texto: ortografia e gramática, dicionário de sinônimos, contagem de palavras, tradução, comentários, controle de alterações, comparação de documentos e proteção.',
      { tipo: 'secao', titulo: 'Guia Revisão', itens: ['Revisão de Texto', 'Idioma', 'Comentários', 'Controle', 'Alterações', 'Comparar', 'Proteger'] }),

    cena('Controlar Alterações é o mais cobrado desta guia. Com ele ligado, o Word marca tudo o que for incluído, apagado ou formatado. Depois, quem revisa usa os botões Aceitar e Rejeitar para decidir sobre cada alteração.',
      word('Revisão', REVISAO, 'Controlar Alterações', 'Registra inclusões, exclusões e mudanças de formatação. Cada uma pode ser aceita ou rejeitada depois.')),

    cena('Na verificação do texto, o sublinhado ondulado vermelho indica possível erro de ortografia, e o sublinhado duplo azul indica possível erro de gramática. A tecla F7 abre a verificação. E Ctrl+Shift+E liga e desliga o controle de alterações.',
      { tipo: 'teclas', titulo: 'Guia Revisão', acoes: ['ortografia', 'alteracoes'] }),

    cena('Ainda em Revisão: Comentário é uma anotação na margem, que não altera o texto. Contagem de Palavras informa páginas, palavras, caracteres, parágrafos e linhas. E Restringir Edição limita o que outras pessoas podem mudar no documento.',
      word('Revisão', REVISAO, 'Restringir Edição', 'Limita a formatação e a edição do documento, com senha se você quiser.')),

    // ---------- Exibir ----------
    cena('A guia Exibir muda a forma de ver o documento na tela, sem alterar o conteúdo. Nela ficam os modos de exibição, a régua, o painel de navegação, o zoom e os comandos para trabalhar com mais de uma janela.',
      { tipo: 'secao', titulo: 'Guia Exibir', itens: ['Modos de Exibição', 'Mostrar', 'Zoom', 'Janela'] }),

    cena('São cinco modos de exibição. O padrão é o Layout de Impressão, que mostra a página como ela vai sair no papel, com margens, cabeçalho e rodapé. Os outros são Modo de Leitura, Layout da Web, Estrutura de Tópicos e Rascunho.',
      word('Exibir', EXIBIR, 'Layout de Impressão', 'É o modo padrão: mostra a página como será impressa.')),

    cena('O que cada modo faz. Modo de Leitura esconde a faixa de opções para facilitar a leitura. Layout da Web mostra como o texto ficaria numa página de internet. Estrutura de Tópicos organiza por níveis de título. Rascunho mostra só o texto, sem cabeçalho nem rodapé.',
      { tipo: 'lista', titulo: 'Os cinco modos de exibição', itens: ['Modo de Leitura: leitura em tela cheia', 'Layout de Impressão: a página como será impressa (padrão)', 'Layout da Web: como ficaria numa página de internet', 'Estrutura de Tópicos: o documento por níveis de título', 'Rascunho: só o texto, sem cabeçalho nem rodapé'] }),

    // ---------- Arquivo e atalhos ----------
    cena('Por fim, a guia Arquivo, que abre o Backstage. Ali ficam Novo, Abrir, Salvar, Salvar como, Imprimir, Compartilhar, Exportar e Opções. Em Imprimir, você escolhe impressora, cópias e páginas, e já vê a visualização de impressão.',
      word('Arquivo', ARQUIVO, 'Imprimir', 'No Word 2019, a visualização de impressão fica dentro de Arquivo > Imprimir.')),

    cena('Os atalhos de arquivo no Word em português: Ctrl+O cria um documento novo, Ctrl+A abre, Ctrl+B salva e F12 abre o Salvar como. Ctrl+P imprime e Ctrl+W fecha o documento.',
      { tipo: 'teclas', titulo: 'Arquivo', acoes: ['novo', 'abrir', 'salvar', 'salvarComo', 'imprimir', 'fechar'] }),

    cena('Mais cinco para fechar. Ctrl+Z desfaz e, no Word em português, Ctrl+R refaz. Ctrl+Enter insere quebra de página. Ctrl+K insere um link. E Ctrl+* mostra ou esconde as marcas de formatação, o mesmo que o botão Mostrar Tudo.',
      { tipo: 'teclas', titulo: 'Edição do documento', acoes: ['desfazer', 'refazer', 'quebraPagina', 'hiperlink', 'marcas'] }),

    cena('Cuidado: o Word em português não segue o inglês. Aqui, Ctrl+B salva, e não aplica negrito. Ctrl+S sublinha, e não salva. Ctrl+A abre, e não seleciona tudo. Quem estudou pelos atalhos em inglês erra essas três.',
      { tipo: 'pegadinha', titulo: 'O Word em português não segue o inglês', texto: 'Ctrl+B salva (não é negrito). Ctrl+S sublinha (não salva). Ctrl+A abre (não seleciona tudo). Selecionar tudo é Ctrl+T.' }),

    cena('Resumo da aula. Página Inicial formata. Inserir acrescenta objetos. Design cuida de temas e marca-d\'água. Layout cuida da página. Referências tem sumário e notas. Correspondências faz mala direta. Revisão confere o texto. E Exibir muda o modo de ver.',
      { tipo: 'lista', titulo: 'Resumo: o que fica em cada guia', itens: ['Página Inicial: fonte, parágrafo, estilos, localizar', 'Inserir: tabela, imagem, cabeçalho, rodapé, número de página', "Design: temas e marca-d'água. Layout: margens, orientação, quebras", 'Referências: sumário e notas. Correspondências: mala direta', 'Revisão: ortografia e controle de alterações. Exibir: modos e zoom'] }),

    // ---------- como cai na prova ----------
    cena('Hora de treinar com três questões no estilo das bancas. Eu leio o enunciado, você pausa o vídeo, escolhe a alternativa e depois confere a resposta.',
      { tipo: 'secao', titulo: 'Como cai na prova', itens: ['3 questões', 'Pause o vídeo antes de ver a resposta'] }),

    ...pergunta({
      enunciado: 'No Word 2019, para criar um sumário automático com os títulos do documento, o usuário deve usar o botão Sumário, localizado na guia:',
      alternativas: ['Inserir.', 'Design.', 'Layout.', 'Referências.', 'Revisão.'],
      correta: 3,
      comentario: 'O sumário fica na guia Referências e é montado a partir dos estilos de título.',
      falaPergunta: 'Primeira questão. No Word 2019, para criar um sumário automático com os títulos do documento, o usuário deve usar o botão Sumário. Em qual guia ele fica? Pause e escolha.',
      falaResposta: 'Resposta: letra D, Referências. O sumário fica no primeiro grupo dessa guia e usa os estilos de título. A alternativa Inserir é a armadilha, porque parece que tudo o que se insere fica lá.',
    }),

    ...pergunta({
      enunciado: 'No Word 2019 em português, as teclas Ctrl+T, Ctrl+L e Ctrl+U servem, respectivamente, para:',
      alternativas: [
        'selecionar tudo, localizar e substituir.',
        'criar tabela, alinhar à esquerda e sublinhar.',
        'selecionar tudo, alinhar à esquerda e sublinhar.',
        'criar tabela, localizar e substituir.',
        'abrir, localizar e desfazer.',
      ],
      correta: 0,
      comentario: 'No Word em português: Ctrl+T seleciona tudo, Ctrl+L localiza e Ctrl+U substitui.',
      falaPergunta: 'Segunda questão. No Word 2019 em português, as teclas Ctrl+T, Ctrl+L e Ctrl+U servem, respectivamente, para quê? Pause e escolha.',
      falaResposta: 'Resposta: letra A. Ctrl+T seleciona tudo, Ctrl+L localiza e Ctrl+U substitui. As alternativas com alinhar à esquerda e sublinhar descrevem os atalhos do Writer, que seguem o inglês.',
    }),

    ...pergunta({
      enunciado: 'No Word 2019, um documento precisa ter uma única página em paisagem, e as demais em retrato. O recurso que permite isso é:',
      alternativas: ['a quebra de página.', 'a quebra de seção.', 'o controle de alterações.', "a marca-d'água.", 'o modo Rascunho.'],
      correta: 1,
      comentario: 'Só a quebra de seção cria partes com formatação de página independente, como a orientação.',
      falaPergunta: 'Terceira questão. Um documento do Word 2019 precisa ter uma única página em paisagem, e as demais em retrato. Que recurso permite isso? Pause e escolha.',
      falaResposta: 'Resposta: letra B, a quebra de seção. A quebra de página só muda o texto de página. É a quebra de seção, na guia Layout, que cria partes com orientação, margens e cabeçalho próprios.',
    }),

    cena('Fim da aula dois. Na próxima, vamos ao Writer, o editor de texto do LibreOffice, para ver os mesmos recursos espalhados pelos menus e os atalhos, que são bem diferentes dos do Word. Até lá!',
      { tipo: 'lista', titulo: 'Na próxima aula', itens: ['Aula 3: Writer 7, menu por menu', 'Barra lateral, Navegador e estilos', 'Exportar como PDF e registrar alterações', 'Atalhos do Writer'] }),
  ],
};
