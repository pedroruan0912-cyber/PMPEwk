import { cena, pergunta } from './_cenas.mjs';

const teclas = (titulo, acoes) => ({ tipo: 'teclas', titulo, acoes });

export default {
  n: 9,
  slug: 'atalhos',
  titulo: 'Atalhos lado a lado',
  cenas: [
    cena('Última aula da série. Aqui estão, lado a lado, todos os atalhos que você viu nas oito aulas: de um lado o Office 2019 em português, do outro o LibreOffice 7. É a aula para rever na véspera da prova.',
      { tipo: 'capa', titulo: 'Atalhos lado a lado', subtitulo: 'Office 2019 em português e LibreOffice 7: todas as teclas da série e as pegadinhas clássicas' }),

    cena('Como estudar. Não tente decorar tudo de uma vez. Comece pelos atalhos que mudam de uma suíte para a outra, porque são eles que viram questão. Nas telas desta aula, as linhas amarelas são as que mudam, e as brancas são as iguais.',
      { tipo: 'lista', titulo: 'Como estudar atalhos', itens: ['Decore primeiro os que mudam de uma suíte para a outra', 'Linha amarela na tela: o atalho é diferente', 'Linha branca na tela: o atalho é igual', 'Leia sempre qual é o programa citado na questão', 'Entenda a lógica das letras, que vem a seguir'] }),

    // ---------- lógica ----------
    cena('A lógica ajuda muito. O Office em português trocou várias teclas para iniciais de palavras em português. O LibreOffice manteve as iniciais das palavras em inglês, em qualquer idioma. Sabendo isso, metade das teclas você deduz.',
      { tipo: 'secao', titulo: 'A lógica das letras', itens: ['Office: palavras em português', 'LibreOffice: palavras em inglês'] }),

    cena('No Office em português: A de abrir, N de negrito, S de sublinhado, T de tudo e L de localizar. Duas não seguem inicial nenhuma e precisam ser decoradas: Ctrl+B salva e Ctrl+O cria um documento novo.',
      { tipo: 'lista', titulo: 'Office em português', itens: ['A de Abrir: Ctrl+A', 'N de Negrito: Ctrl+N', 'S de Sublinhado: Ctrl+S', 'T de Tudo: Ctrl+T seleciona tudo', 'L de Localizar: Ctrl+L', 'Sem inicial: Ctrl+B salva e Ctrl+O cria novo'] },
      'No Office em português: á de abrir, ene de negrito, esse de sublinhado, tê de tudo e éle de localizar. Duas não seguem inicial nenhuma e precisam ser decoradas: Ctrl+B salva e Ctrl+O cria um documento novo.'),

    cena('No LibreOffice, pense em inglês. N de new, novo. O de open, abrir. S de save, salvar. B de bold, negrito. U de underline, sublinhado. F de find, localizar. E A de all, tudo.',
      { tipo: 'lista', titulo: 'LibreOffice: iniciais do inglês', itens: ['N de New: Ctrl+N cria novo', 'O de Open: Ctrl+O abre', 'S de Save: Ctrl+S salva', 'B de Bold: Ctrl+B negrito', 'U de Underline: Ctrl+U sublinha', 'F de Find: Ctrl+F localiza', 'A de All: Ctrl+A seleciona tudo'] },
      'No LibreOffice, pense em inglês. Ene de niú, novo. Ó de ôupen, abrir. Esse de sêiv, salvar. Bê de bôld, negrito. U de anderláine, sublinhado. Efe de fáind, localizar. E á de ól, tudo.'),

    // ---------- arquivo ----------
    cena('Comece pelos atalhos de arquivo. Valem para os três programas de cada suíte: texto, planilha e apresentação.',
      { tipo: 'secao', titulo: 'Arquivo', itens: ['Novo', 'Abrir', 'Salvar', 'Salvar como', 'Imprimir', 'Fechar e sair'] }),

    cena('Novo: Ctrl+O no Office, Ctrl+N no LibreOffice. Abrir: Ctrl+A no Office, Ctrl+O no LibreOffice. Salvar: Ctrl+B no Office, Ctrl+S no LibreOffice. Salvar como: F12 no Office, Ctrl+Shift+S no LibreOffice. Imprimir e fechar são iguais: Ctrl+P e Ctrl+W.',
      teclas('Arquivo', ['novo', 'abrir', 'salvar', 'salvarComo', 'imprimir', 'fechar'])),

    cena('Para sair do programa, o Office usa Alt+F4 e o LibreOffice usa Ctrl+Q. E a ajuda é igual nas duas suítes: a tecla F1.',
      teclas('Sair e ajuda', ['sair', 'ajuda'])),

    cena('A primeira armadilha é a tecla O. Ctrl+O cria um documento novo no Office e abre um documento existente no LibreOffice. Se a alternativa disser que Ctrl+O abre um arquivo no Word em português, está errada.',
      { tipo: 'pegadinha', titulo: 'Ctrl+O: novo ou abrir?', texto: 'No Office em português, Ctrl+O cria um documento novo. No LibreOffice, Ctrl+O abre um documento. Abrir, no Office, é Ctrl+A.' }),

    // ---------- edição ----------
    cena('Agora os atalhos de edição: desfazer, refazer, selecionar, copiar, colar, localizar e substituir.',
      { tipo: 'secao', titulo: 'Edição', itens: ['Desfazer e refazer', 'Selecionar tudo', 'Copiar, recortar e colar', 'Localizar e substituir'] }),

    cena('Desfazer é Ctrl+Z nas duas suítes. Refazer muda: no Word em português é Ctrl+R; no Excel e em todo o LibreOffice é Ctrl+Y. E selecionar tudo é Ctrl+T no Office e Ctrl+A no LibreOffice.',
      teclas('Desfazer, refazer e selecionar', ['desfazer', 'refazer', 'refazerPlanilha', 'selecionarTudo'])),

    cena('Copiar, recortar e colar são iguais em qualquer programa: Ctrl+C, Ctrl+X e Ctrl+V. Só o colar especial muda: Ctrl+Alt+V no Office e Ctrl+Shift+V no LibreOffice.',
      teclas('Área de transferência', ['copiar', 'recortar', 'colar', 'colarEspecial'])),

    cena('Localizar é Ctrl+L no Office e Ctrl+F no LibreOffice. Localizar e substituir é Ctrl+U no Office e Ctrl+H no LibreOffice. Já a ortografia, com F7, e o hiperlink, com Ctrl+K, são iguais.',
      teclas('Localizar, substituir e conferir', ['localizar', 'substituir', 'ortografia', 'hiperlink'])),

    cena('Duas teclas mudam de papel aqui. Ctrl+A abre um arquivo no Office e seleciona tudo no LibreOffice. E Ctrl+U substitui no Word, mas sublinha no Writer.',
      { tipo: 'pegadinha', titulo: 'Ctrl+A e Ctrl+U mudam de papel', texto: 'Ctrl+A: abrir no Office, selecionar tudo no LibreOffice. Ctrl+U: substituir no Word, sublinhar no Writer.' }),

    // ---------- formatação ----------
    cena('Os atalhos de formatação de texto são os campeões de cobrança, principalmente o negrito e o sublinhado.',
      { tipo: 'secao', titulo: 'Formatação de texto', itens: ['Negrito, itálico e sublinhado', 'Sobrescrito e subscrito', 'Alinhamentos', 'Quebras e marcas'] }),

    cena('Negrito: Ctrl+N no Office, Ctrl+B no LibreOffice. Itálico é igual: Ctrl+I. Sublinhado: Ctrl+S no Office, Ctrl+U no LibreOffice. Sobrescrito e subscrito também mudam. E Shift+F3, que alterna maiúsculas e minúsculas, é igual.',
      teclas('Caractere', ['negrito', 'italico', 'sublinhado', 'sobrescrito', 'subscrito', 'maiusculas'])),

    cena('Guarde este trio. Ctrl+B salva no Office e é negrito no LibreOffice. Ctrl+N é negrito no Office e cria novo no LibreOffice. Ctrl+S sublinha no Office e salva no LibreOffice. As três teclas existem nas duas suítes, com papéis trocados.',
      { tipo: 'pegadinha', titulo: 'O trio B, N e S', texto: 'Ctrl+B: salvar no Office, negrito no LibreOffice. Ctrl+N: negrito no Office, novo no LibreOffice. Ctrl+S: sublinhado no Office, salvar no LibreOffice.' }),

    cena('Alinhamentos. Centralizar, com Ctrl+E, e justificar, com Ctrl+J, são iguais. À esquerda é Ctrl+Q no Word e Ctrl+L no Writer. À direita é Ctrl+G no Word e Ctrl+R no Writer.',
      teclas('Alinhamento do parágrafo', ['esquerda', 'centralizar', 'direita', 'justificar'])),

    cena('Por isso Ctrl+L e Ctrl+R enganam. No Writer, alinham à esquerda e à direita. No Word em português, Ctrl+L localiza e Ctrl+R refaz a última ação.',
      { tipo: 'pegadinha', titulo: 'Ctrl+L e Ctrl+R', texto: 'No Writer: alinhar à esquerda e alinhar à direita. No Word em português: localizar e refazer.' }),

    cena('Mais cinco dos editores de texto. Quebra de página é Ctrl+Enter nos dois. As marcas de formatação aparecem com Ctrl+* no Word e Ctrl+F10 no Writer. Controlar alterações é Ctrl+Shift+E no Word; no Writer, Ctrl+Shift+C só no 7.0 e 7.1. E limpar formatação e inserir tabela só têm atalho no Writer.',
      teclas('Documento de texto', ['quebraPagina', 'marcas', 'alteracoes', 'limparFormatacao', 'inserirTabela'])),

    // ---------- teclas de função ----------
    cena('As teclas de função, de F1 a F12, rendem muita pegadinha, porque a mesma tecla faz coisas diferentes em cada programa.',
      { tipo: 'secao', titulo: 'Teclas de função', itens: ['F2, F4, F7 e F9', 'F5', 'F11 e F12'] }),

    cena('Primeiro as que são iguais nas duas suítes. F2 edita a célula da planilha. F4 alterna a referência entre relativa e absoluta. F7 verifica a ortografia. E F9 recalcula as fórmulas.',
      teclas('Iguais nas duas suítes', ['editarCelula', 'refAbsoluta', 'ortografia', 'recalcular'])),

    cena('A tecla F5 depende do programa. No Writer, abre o Navegador. No PowerPoint e no Impress, inicia a apresentação do primeiro slide. E Shift+F5 inicia do slide atual, nos dois programas de apresentação.',
      teclas('A tecla F5', ['navegador', 'inicioApresentacao', 'slideAtual'])),

    cena('Completando: no Word, a tecla F5 abre a janela Ir para, que leva a uma página específica. São três papéis para a mesma tecla, conforme o programa: ir para, Navegador e apresentação.',
      { tipo: 'pegadinha', titulo: 'F5 tem três papéis', texto: 'Word: abre Ir para. Writer: abre o Navegador. PowerPoint e Impress: inicia a apresentação no primeiro slide.' }),

    cena('F11 e F12 também trocam. F11 cria um gráfico em nova planilha no Excel e abre o painel de Estilos no LibreOffice. F12 abre o Salvar como no Office e liga a lista numerada no Writer.',
      teclas('F11 e F12', ['graficoRapido', 'estilos', 'salvarComo', 'listaNumerada'])),

    // ---------- planilhas ----------
    cena('Nas planilhas, a boa notícia é que os atalhos próprios são quase todos iguais no Excel e no Calc.',
      { tipo: 'secao', titulo: 'Planilhas', itens: ['Editar e referência', 'Formatar células', 'Data, filtro e soma', 'Funções'] }),

    cena('Todos estes são iguais. F2 edita a célula. F4 alterna a referência. Ctrl+1 abre Formatar células. Ctrl+; insere a data de hoje. Ctrl+Shift+L liga o filtro. E F9 recalcula.',
      teclas('Iguais no Excel e no Calc', ['editarCelula', 'refAbsoluta', 'formatarCelulas', 'dataAtual', 'filtro', 'recalcular'])),

    cena('A diferença está em inserir função: Shift+F3 no Excel e Ctrl+F2 no Calc. A AutoSoma, Alt+=, só tem atalho no Excel. Ctrl+PgDn vai para a próxima planilha nos dois. E o negrito segue a suíte: Ctrl+N no Excel e Ctrl+B no Calc.',
      teclas('O que muda nas planilhas', ['inserirFuncao', 'autoSoma', 'proximaPlanilha', 'negrito'])),

    // ---------- apresentações ----------
    cena('Nas apresentações, é mais simples ainda: as teclas próprias são todas iguais no PowerPoint e no Impress.',
      { tipo: 'secao', titulo: 'Apresentações', itens: ['Iniciar', 'Novo slide', 'Encerrar', 'Tela preta e tela branca'] }),

    cena('F5 inicia do primeiro slide e Shift+F5 inicia do slide atual. Ctrl+M insere um novo slide. Esc encerra a apresentação. Durante a exibição, a tecla ponto deixa a tela preta e a tecla vírgula deixa a tela branca.',
      teclas('PowerPoint e Impress', ['inicioApresentacao', 'slideAtual', 'novoSlide', 'encerrar', 'telaPreta', 'telaBranca'])),

    // ---------- revisão ----------
    cena('Vamos fechar com três quadros de revisão. O primeiro: o que é igual nas duas suítes. Se a questão troca uma dessas teclas de um programa para o outro, ela está tentando confundir você.',
      { tipo: 'lista', titulo: 'O que é igual nas duas suítes', itens: ['Copiar, recortar, colar: Ctrl+C, Ctrl+X, Ctrl+V', 'Desfazer: Ctrl+Z. Imprimir: Ctrl+P. Fechar: Ctrl+W', 'Itálico: Ctrl+I. Centralizar: Ctrl+E. Justificar: Ctrl+J', 'Hiperlink: Ctrl+K. Quebra de página: Ctrl+Enter', 'F1 ajuda, F2 edita célula, F4 referência, F7 ortografia', 'F5 e Shift+F5 nas apresentações; Ctrl+M novo slide'] }),

    cena('O segundo quadro: as sete trocas que mais caem. Negrito, salvar, novo, abrir, selecionar tudo, localizar e sublinhado. Em cada linha, primeiro a tecla do Office em português, depois a do LibreOffice.',
      { tipo: 'lista', titulo: 'As sete trocas que mais caem', itens: ['Negrito: Ctrl+N no Office, Ctrl+B no LibreOffice', 'Salvar: Ctrl+B no Office, Ctrl+S no LibreOffice', 'Novo: Ctrl+O no Office, Ctrl+N no LibreOffice', 'Abrir: Ctrl+A no Office, Ctrl+O no LibreOffice', 'Selecionar tudo: Ctrl+T no Office, Ctrl+A no LibreOffice', 'Localizar: Ctrl+L no Office, Ctrl+F no LibreOffice', 'Sublinhado: Ctrl+S no Office, Ctrl+U no LibreOffice'] }),

    cena('O terceiro quadro: como resolver uma questão de atalho. Ache o nome do programa no enunciado. Veja se é Office em português ou LibreOffice. Lembre a lógica das letras. E desconfie da alternativa que estaria certa no outro programa.',
      { tipo: 'lista', titulo: 'Como resolver a questão de atalho', itens: ['1. Ache o nome do programa no enunciado', '2. É Office em português ou LibreOffice?', '3. Lembre a lógica: palavra em português ou em inglês', '4. Desconfie da alternativa que valeria no outro programa'] }),

    // ---------- revisão geral da série ----------
    cena('Antes das questões, uma revisão rápida do que não é atalho, mas cai junto. São cinco quadros com as diferenças entre as suítes que apareceram ao longo das aulas.',
      { tipo: 'secao', titulo: 'Revisão geral da série', itens: ['Extensões', 'Nomes que mudam', 'Planilhas', 'PDF', 'Seleção com o mouse'] }),

    cena('As extensões. No Office, terminam em X: .docx, .xlsx e .pptx. No LibreOffice, começam com O e D: .odt, .ods e .odp. E a última letra entrega o tipo: T de texto, S de planilha e P de apresentação.',
      { tipo: 'compara', titulo: 'Extensões padrão', office: ['Word: .docx', 'Excel: .xlsx', 'PowerPoint: .pptx', 'Modelos: .dotx, .xltx, .potx'], libre: ['Writer: .odt', 'Calc: .ods', 'Impress: .odp', 'Modelos: .ott, .ots, .otp'] },
      'As extensões. No Office, terminam em xis: .docx, .xlsx e .pptx. No LibreOffice, começam com ó e dê: .odt, .ods e .odp. E a última letra entrega o tipo: tê de texto, esse de planilha e pê de apresentação.'),

    cena('Os nomes que mudam. Pincel de Formatação vira Clonar formatação. Controlar Alterações vira Registrar alterações. Classificar vira Ordenar. Filtro vira Autofiltro. E Classificação de Slides vira Organizador de slides.',
      { tipo: 'compara', titulo: 'O mesmo recurso, nomes diferentes', office: ['Pincel de Formatação', 'Controlar Alterações', 'Classificar', 'Filtro', 'Classificação de Slides'], libre: ['Clonar formatação', 'Registrar alterações', 'Ordenar', 'Autofiltro', 'Organizador de slides'] }),

    cena('Nas planilhas, duas diferenças. Para citar uma célula de outra planilha, o Excel usa o ponto de exclamação e o Calc usa o ponto. E, ao arrastar a alça de uma célula com um número só, o Excel copia e o Calc faz a sequência.',
      { tipo: 'compara', titulo: 'Excel e Calc: as duas diferenças', office: ['Outra planilha: =Planilha2!A1', 'Alça com um número: copia (1, 1, 1)'], libre: ['Outra planilha: =Planilha2.A1', 'Alça com um número: sequência (1, 2, 3)'] },
      'Nas planilhas, duas diferenças. Para citar uma célula de outra planilha, o Excel usa o ponto de exclamação e o Calc usa o ponto. E, ao arrastar a alça de uma célula com um número só, o Excel copia e o Calc faz a sequência.'),

    cena('O PDF. No Office, ele aparece em Arquivo, Exportar, e também na lista de tipos do Salvar como. No Writer e no Impress, fica em Arquivo, Exportar como, Exportar como PDF; no Calc, direto em Arquivo, Exportar como PDF. Nunca no Salvar como.',
      { tipo: 'compara', titulo: 'Gerar um PDF', office: ['Arquivo > Exportar', 'Arquivo > Salvar como, tipo PDF'], libre: ['Writer e Impress: Arquivo > Exportar como > Exportar como PDF', 'Calc: Arquivo > Exportar como PDF', 'Não aparece em Salvar como'] }),

    cena('E a seleção com o mouse nos editores de texto. Dois cliques selecionam a palavra nos dois programas. Três cliques selecionam o parágrafo no Word, mas só a frase no Writer. No Writer, o parágrafo pede quatro cliques.',
      { tipo: 'compara', titulo: 'Selecionar com o mouse', office: ['Word: dois cliques, a palavra', 'Word: três cliques, o parágrafo'], libre: ['Writer: dois cliques, a palavra', 'Writer: três cliques, a frase', 'Writer: quatro cliques, o parágrafo'] }),

    // ---------- como cai na prova ----------
    cena('As três últimas questões da série, no estilo das bancas, todas sobre atalhos. Pause depois de cada enunciado.',
      { tipo: 'secao', titulo: 'Como cai na prova', itens: ['3 questões', 'Pause o vídeo antes de ver a resposta'] }),

    ...pergunta({
      enunciado: 'Assinale a alternativa em que o atalho realiza a mesma ação no Word 2019 em português e no LibreOffice Writer 7, nas configurações padrão.',
      alternativas: ['Ctrl+B', 'Ctrl+N', 'Ctrl+S', 'Ctrl+I', 'Ctrl+A'],
      correta: 3,
      comentario: 'Ctrl+I aplica itálico nos dois. As outras quatro teclas mudam de papel entre o Word e o Writer.',
      falaPergunta: 'Primeira questão. Qual destes atalhos realiza a mesma ação no Word 2019 em português e no Writer 7? Pause e escolha.',
      falaResposta: 'Resposta: letra D. Ctrl+I aplica itálico nos dois programas. Todas as outras mudam: Ctrl+B, Ctrl+N, Ctrl+S e Ctrl+A fazem uma coisa no Word e outra no Writer.',
    }),

    ...pergunta({
      enunciado: 'No Word 2019 em português e no LibreOffice Writer 7, a ação de salvar o documento é realizada, respectivamente, pelas teclas:',
      alternativas: ['Ctrl+S e Ctrl+B', 'Ctrl+B e Ctrl+S', 'Ctrl+B e Ctrl+B', 'Ctrl+S e Ctrl+S', 'Ctrl+A e Ctrl+O'],
      correta: 1,
      comentario: 'Salvar é Ctrl+B no Word em português e Ctrl+S no Writer.',
      falaPergunta: 'Segunda questão. No Word 2019 em português e no Writer 7, quais teclas salvam o documento, respectivamente? Pause e escolha.',
      falaResposta: 'Resposta: letra B. Ctrl+B salva no Word em português, e Ctrl+S salva no Writer. A letra A inverte a ordem, e é a alternativa em que mais gente cai.',
    }),

    ...pergunta({
      enunciado: 'A tecla F12, pressionada no Word 2019 e no LibreOffice Writer 7, nas configurações padrão, respectivamente:',
      alternativas: [
        'abre o Salvar como e ativa a lista numerada.',
        'ativa a lista numerada e abre o Salvar como.',
        'abre o Salvar como nos dois programas.',
        'verifica a ortografia nos dois programas.',
        'abre o Navegador e abre o Salvar como.',
      ],
      correta: 0,
      comentario: 'F12 abre o Salvar como no Word. No Writer, F12 ativa a lista numerada; Salvar como é Ctrl+Shift+S.',
      falaPergunta: 'Terceira questão. O que faz a tecla F12 no Word 2019 e no Writer 7, respectivamente? Pause e escolha.',
      falaResposta: 'Resposta: letra A. No Word, F12 abre o Salvar como. No Writer, F12 ativa a lista numerada, e o Salvar como é Ctrl+Shift+S.',
    }),

    cena('Você concluiu as nove aulas. Viu as duas suítes, os dois editores de texto, as duas planilhas com as funções, os dois programas de apresentação e todos os atalhos. Reveja as pegadinhas de cada aula antes da prova. Bons estudos, e boa prova!',
      { tipo: 'lista', titulo: 'A série completa', itens: ['Aula 1: visão geral das duas suítes', 'Aulas 2 e 3: Word e Writer', 'Aulas 4, 5 e 6: Excel, Calc e funções', 'Aulas 7 e 8: PowerPoint e Impress', 'Aula 9: atalhos lado a lado', 'Antes da prova: reveja as pegadinhas de cada aula'] }),
  ],
};
