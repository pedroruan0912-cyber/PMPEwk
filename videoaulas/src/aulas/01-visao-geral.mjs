import { cena, pergunta } from './_cenas.mjs';

export default {
  n: 1,
  slug: 'visao-geral',
  titulo: 'Visão geral das duas suítes',
  cenas: [
    cena('Olá! Esta é a primeira de nove aulas sobre o Microsoft Office 2019 e o LibreOffice 7. Aqui você vai ter a visão geral: o que é cada suíte, quais programas se equivalem, quais são os formatos de arquivo e como a tela de cada uma é organizada.',
      { tipo: 'capa', titulo: 'Office 2019 e LibreOffice 7', subtitulo: 'Visão geral: as duas suítes, os programas equivalentes, os formatos de arquivo e a interface' }),

    cena('Guarde este roteiro. Primeiro, o que é uma suíte de escritório e qual é a licença de cada uma. Depois, os programas equivalentes e as extensões de arquivo, que são campeãs de cobrança. Por fim, a interface e os comandos básicos de arquivo.',
      { tipo: 'lista', titulo: 'O que você vai ver nesta aula', itens: ['O que é uma suíte de escritório', 'Licença: proprietária e livre', 'Programas equivalentes', 'Formatos e extensões de arquivo', 'Faixa de opções e barra de menus', 'Novo, abrir, salvar, imprimir e exportar'] }),

    // ---------- as duas suítes ----------
    cena('Suíte de escritório é um conjunto de programas que trabalham juntos: um editor de texto, uma planilha eletrônica, um programa de apresentações e outros. As provas costumam cobrar duas: o Microsoft Office e o LibreOffice.',
      { tipo: 'secao', titulo: 'As duas suítes', itens: ['Microsoft Office 2019', 'LibreOffice 7'] }),

    cena('O Office é da Microsoft. É software proprietário: o código é fechado e você paga pela licença. O LibreOffice é mantido pela fundação The Document Foundation. É software livre, de código aberto e gratuito, e roda em Windows, Linux e macOS.',
      { tipo: 'compara', titulo: 'Quem faz e como é a licença', office: ['Feito pela Microsoft', 'Software proprietário, de código fechado', 'Pago', 'Windows e macOS'], libre: ['Mantido pela The Document Foundation', 'Software livre, de código aberto', 'Gratuito', 'Windows, Linux e macOS'] }),

    cena('Atenção a uma diferença. O Office 2019 é uma versão de compra única: você paga uma vez e usa aquela versão, sem receber recursos novos. Já o Microsoft 365 é o serviço por assinatura, sempre atualizado. Nesta série, a referência é o Office 2019.',
      { tipo: 'lista', titulo: 'Office 2019 não é Microsoft 365', itens: ['Office 2019: compra única, sem assinatura', 'Recebe correções, mas não ganha recursos novos', 'Microsoft 365: assinatura mensal ou anual, sempre atualizado', 'Nesta série, a referência é sempre o Office 2019'] }),

    // ---------- programas equivalentes ----------
    cena('Agora, os pares de programas. Esta é uma das perguntas mais comuns: qual programa do LibreOffice faz o papel de tal programa do Office? Vamos ver um par de cada vez.',
      { tipo: 'secao', titulo: 'Programas equivalentes', itens: ['Texto', 'Planilha', 'Apresentação', 'Banco de dados'] }),

    cena('Para textos, o Office tem o Word e o LibreOffice tem o Writer. Os dois servem para criar e formatar documentos, como ofícios, relatórios e contratos.',
      { tipo: 'compara', titulo: 'Editor de texto', office: ['Word', 'Ofícios, relatórios, contratos'], libre: ['Writer', 'Mesma função: criar e formatar textos'] }),

    cena('Para planilhas, o Office tem o Excel e o LibreOffice tem o Calc. Neles você organiza dados em linhas e colunas, faz cálculos com fórmulas e funções, e cria gráficos.',
      { tipo: 'compara', titulo: 'Planilha eletrônica', office: ['Excel', 'Cálculos, tabelas e gráficos'], libre: ['Calc', 'Mesma função: fórmulas, funções e gráficos'] }),

    cena('Para apresentações, o Office tem o PowerPoint e o LibreOffice tem o Impress. Os dois montam slides com textos, imagens, transições e animações.',
      { tipo: 'compara', titulo: 'Apresentação de slides', office: ['PowerPoint', 'Slides, transições e animações'], libre: ['Impress', 'Mesma função: apresentações de slides'] }),

    cena('Há outros programas. No Office, o Access é o banco de dados e o Outlook cuida de e-mail e agenda. No LibreOffice, o Base é o banco de dados, o Draw faz desenhos vetoriais e o Math edita fórmulas matemáticas. Repare: o LibreOffice não traz programa de e-mail.',
      { tipo: 'compara', titulo: 'Os outros programas', office: ['Access: banco de dados', 'Outlook: e-mail e agenda', 'Publisher: publicações'], libre: ['Base: banco de dados', 'Draw: desenho vetorial', 'Math: fórmulas matemáticas'] }),

    cena('Pegadinha clássica: trocar os pares. Writer é texto, como o Word. Calc é planilha, como o Excel. Impress é apresentação, como o PowerPoint. E Base é banco de dados, como o Access. Se a alternativa disser que o Impress é a planilha, está errada.',
      { tipo: 'pegadinha', titulo: 'Não troque os pares', texto: 'Writer é texto. Calc é planilha. Impress é apresentação. Base é banco de dados. Draw e Math não são editor de texto nem planilha.' }),

    // ---------- formatos ----------
    cena('Vamos aos formatos de arquivo. Cada suíte tem um formato padrão, e a extensão, aquelas letras depois do ponto no nome do arquivo, muda de um programa para outro. Decorar estas extensões vale ponto.',
      { tipo: 'secao', titulo: 'Formatos e extensões de arquivo', itens: ['Office Open XML', 'OpenDocument (ODF)'] }),

    cena('O formato padrão do Office se chama Office Open XML, e as extensões terminam com a letra X. O formato padrão do LibreOffice é o OpenDocument, conhecido pela sigla ODF. É um formato aberto, e as extensões começam com as letras O e D.',
      { tipo: 'compara', titulo: 'O formato padrão de cada suíte', office: ['Office Open XML', 'Criado pela Microsoft', 'Padrão desde o Office 2007', 'Extensões terminam em x'], libre: ['OpenDocument Format (ODF)', 'Formato aberto', 'Padrão do LibreOffice', 'Extensões começam com od'] },
      'O formato padrão do Office se chama Office Open XML, e as extensões terminam com a letra xis. O formato padrão do LibreOffice é o OpenDocument, conhecido pela sigla ODF. É um formato aberto, e as extensões começam com as letras ó e dê.'),

    cena('Documento de texto. No Word, a extensão padrão é .docx. Nas versões antigas, até o Word 2003, era .doc, sem o X. No Writer, a extensão é .odt: o T vem de texto.',
      { tipo: 'compara', titulo: 'Texto', office: ['Word: .docx', 'Até o Word 2003: .doc'], libre: ['Writer: .odt', 'O t vem de texto'] },
      'Documento de texto. No Word, a extensão padrão é .docx. Nas versões antigas, até o Word 2003, era .doc, sem o xis. No Writer, a extensão é .odt: o tê vem de texto.'),

    cena('Planilha. No Excel, a extensão padrão é .xlsx, e nas versões antigas era .xls. No Calc, a extensão é .ods. O S vem de spreadsheet, que é planilha em inglês.',
      { tipo: 'compara', titulo: 'Planilha', office: ['Excel: .xlsx', 'Até o Excel 2003: .xls'], libre: ['Calc: .ods', 'O s vem de spreadsheet, planilha em inglês'] },
      'Planilha. No Excel, a extensão padrão é .xlsx, e nas versões antigas era .xls. No Calc, a extensão é .ods. O esse vem de spreadsheet, que é planilha em inglês.'),

    cena('Apresentação. No PowerPoint, a extensão padrão é .pptx, e a antiga era .ppt. Existe também a .ppsx, que já abre direto no modo de apresentação. No Impress, a extensão é .odp: o P vem de apresentação.',
      { tipo: 'compara', titulo: 'Apresentação', office: ['PowerPoint: .pptx', 'Até o PowerPoint 2003: .ppt', 'Abre direto na apresentação: .ppsx'], libre: ['Impress: .odp', 'O p vem de presentation, apresentação'] },
      'Apresentação. No PowerPoint, a extensão padrão é .pptx, e a antiga era .ppt. Existe também a .ppsx, que já abre direto no modo de apresentação. No Impress, a extensão é .odp: o pê vem de apresentação.'),

    cena('Modelo é um arquivo que serve de base para criar outros. No Office, os modelos são .dotx no Word, .xltx no Excel e .potx no PowerPoint. No LibreOffice, a letra D vira T: .ott, .ots e .otp.',
      { tipo: 'compara', titulo: 'Modelos de documento', office: ['Word: .dotx', 'Excel: .xltx', 'PowerPoint: .potx'], libre: ['Writer: .ott', 'Calc: .ots', 'Impress: .otp'] },
      'Modelo é um arquivo que serve de base para criar outros. No Office, os modelos são .dotx no Word, .xltx no Excel e .potx no PowerPoint. No LibreOffice, a letra dê vira tê: .ott, .ots e .otp.'),

    cena('Um jeito de memorizar. Terminou em X, é do Office. Começou com O e D, é do LibreOffice. E a última letra do LibreOffice entrega o programa: T de texto, S de planilha e P de apresentação.',
      { tipo: 'lista', titulo: 'Como memorizar', itens: ['Terminou em x: é do Office (docx, xlsx, pptx)', 'Começou com od: é do LibreOffice (odt, ods, odp)', 'Última letra no LibreOffice: t de texto, s de planilha, p de apresentação', 'Modelo no LibreOffice: troque o d por t (ott, ots, otp)'] },
      'Um jeito de memorizar. Terminou em xis, é do Office. Começou com ó e dê, é do LibreOffice. E a última letra do LibreOffice entrega o programa: tê de texto, esse de planilha e pê de apresentação.'),

    cena('E uma suíte abre o arquivo da outra? Abre. O LibreOffice abre e salva os formatos do Office, e o Office 2019 abre e salva os formatos OpenDocument. A formatação pode sofrer pequenas mudanças, mas dizer que os formatos são incompatíveis está errado.',
      { tipo: 'lista', titulo: 'Uma suíte abre o arquivo da outra?', itens: ['O LibreOffice abre e salva .docx, .xlsx e .pptx', 'O Office 2019 abre e salva .odt, .ods e .odp', 'A formatação pode mudar um pouco na conversão', 'Por padrão, cada suíte salva no seu próprio formato'] }),

    cena('As duas suítes geram PDF sem precisar de outro programa. No Office, vá em Arquivo, Exportar, ou use Salvar como e escolha o tipo PDF. No LibreOffice, o caminho é Arquivo, Exportar como, Exportar como PDF. Há também um botão na barra de ferramentas.',
      { tipo: 'compara', titulo: 'Gerar um PDF', office: ['Arquivo > Exportar > Criar Documento PDF/XPS', 'Ou Arquivo > Salvar como, escolhendo o tipo PDF'], libre: ['Arquivo > Exportar como > Exportar como PDF', 'Ou o botão Exportar diretamente como PDF'] }),

    cena('Cuidado com esta. No LibreOffice, o PDF não está na janela Salvar como. Ele fica em Exportar como PDF, no menu Arquivo. No Word é diferente: o PDF aparece tanto em Exportar quanto na lista de tipos do Salvar como.',
      { tipo: 'pegadinha', titulo: 'No LibreOffice, PDF é em Exportar', texto: 'No LibreOffice, o PDF não aparece na lista de tipos do Salvar como. O comando certo é Arquivo > Exportar como > Exportar como PDF.' }),

    // ---------- interface ----------
    cena('Agora, a interface, que é a organização da tela. Aqui está a maior diferença visual entre as duas suítes: o Office usa a faixa de opções, e o LibreOffice, por padrão, usa barra de menus e barras de ferramentas.',
      { tipo: 'secao', titulo: 'A interface', itens: ['Office: faixa de opções', 'LibreOffice: menus e barras de ferramentas'] }),

    cena('Esta é a faixa de opções do Word. Ela é dividida em guias, como Página Inicial, Inserir e Layout. Cada guia é dividida em grupos, como Fonte e Parágrafo. E dentro de cada grupo ficam os comandos, que são os botões.',
      { tipo: 'janela', app: 'word', aba: 'Página Inicial', itens: [
        { grupo: 'Área de Transferência', itens: ['Colar', 'Recortar', 'Copiar', 'Pincel de Formatação'] },
        { grupo: 'Fonte', itens: ['Negrito', 'Itálico', 'Sublinhado', 'Cor da Fonte'] },
        { grupo: 'Parágrafo', itens: ['Marcadores', 'Numeração', 'Centralizar', 'Justificar'] },
        { grupo: 'Edição', itens: ['Localizar', 'Substituir', 'Selecionar'] },
      ] }),

    cena('Guarde a ordem: guia, grupo, comando. Quando a questão descreve um caminho, ela segue essa ordem. Por exemplo: guia Página Inicial, grupo Fonte, comando Negrito. Se a alternativa trocar guia por grupo, desconfie.',
      { tipo: 'janela', app: 'word', aba: 'Página Inicial', itens: [
        { grupo: 'Área de Transferência', itens: ['Colar', 'Recortar', 'Copiar', 'Pincel de Formatação'] },
        { grupo: 'Fonte', itens: ['Negrito', 'Itálico', 'Sublinhado', 'Cor da Fonte'] },
        { grupo: 'Parágrafo', itens: ['Marcadores', 'Numeração', 'Centralizar', 'Justificar'] },
        { grupo: 'Edição', itens: ['Localizar', 'Substituir', 'Selecionar'] },
      ], destaque: 'Negrito', balao: 'Guia Página Inicial, grupo Fonte, comando Negrito. A ordem é sempre guia, grupo, comando.' }),

    cena('A guia Arquivo é especial. Ela não mostra botões na faixa: abre uma tela inteira chamada modo de exibição Backstage. É ali que ficam Novo, Abrir, Salvar, Salvar como, Imprimir, Exportar e Opções.',
      { tipo: 'janela', app: 'word', aba: 'Arquivo', itens: ['Informações', 'Novo', 'Abrir', 'Salvar', 'Salvar como', 'Imprimir', 'Compartilhar', 'Exportar', 'Fechar', 'Conta', 'Opções'], balao: 'A guia Arquivo abre o modo de exibição Backstage, que ocupa a janela inteira.' }),

    cena('Outras partes da janela. No alto, à esquerda, fica a Barra de Ferramentas de Acesso Rápido, com Salvar, Desfazer e Refazer. No canto de alguns grupos há uma setinha, o iniciador de caixa de diálogo, que abre todas as opções daquele grupo. Embaixo fica a barra de status.',
      { tipo: 'lista', titulo: 'Outras partes da janela do Office', itens: ['Barra de Ferramentas de Acesso Rápido: Salvar, Desfazer e Refazer', 'Barra de título: nome do arquivo e do programa', 'Iniciador de caixa de diálogo: a setinha no canto do grupo', 'Barra de status: página, número de palavras, idioma e zoom'] }),

    cena('Agora o LibreOffice Writer. No alto fica a barra de menus: Arquivo, Editar, Exibir, Inserir, Formatar e os demais. Cada menu abre uma lista de comandos. No menu Arquivo estão Novo, Abrir, Salvar, Salvar como, Exportar como e Imprimir.',
      { tipo: 'janela', app: 'writer', aba: 'Arquivo', itens: ['Novo', 'Abrir...', 'Documentos recentes', 'Fechar', 'Modelos', 'Salvar', 'Salvar como...', 'Salvar uma cópia...', 'Exportar...', 'Exportar como', 'Visualizar impressão', 'Imprimir...', 'Propriedades...', 'Sair do LibreOffice'] }),

    cena('Abaixo dos menus ficam as barras de ferramentas. A barra Padrão tem os comandos gerais, como novo, abrir, salvar e imprimir. A barra Formatação cuida de fonte, tamanho e alinhamento. À direita fica a barra lateral, com Propriedades, Estilos, Galeria e Navegador.',
      { tipo: 'lista', titulo: 'A janela do LibreOffice', itens: ['Barra de menus: Arquivo, Editar, Exibir, Inserir...', 'Barra de ferramentas Padrão: novo, abrir, salvar, imprimir', 'Barra de ferramentas Formatação: fonte, tamanho, negrito, alinhamento', 'Barra lateral: Propriedades, Estilos, Galeria e Navegador', 'Barra de status: página, número de palavras, idioma e zoom'] }),

    cena('Resumindo a interface. No Office: faixa de opções, com guias, grupos e comandos, e a guia Arquivo abrindo o Backstage. No LibreOffice: barra de menus, barras de ferramentas e barra lateral. Os nomes guia e grupo são do Office; menu e barra de ferramentas, do LibreOffice.',
      { tipo: 'compara', titulo: 'Onde ficam os comandos', office: ['Faixa de opções', 'Guias, grupos e comandos', 'A guia Arquivo abre o Backstage', 'Barra de Ferramentas de Acesso Rápido'], libre: ['Barra de menus', 'Barras de ferramentas Padrão e Formatação', 'O menu Arquivo abre uma lista', 'Barra lateral'] }),

    cena('Um detalhe. O LibreOffice 7 permite trocar a aparência em Exibir, Interface do usuário, e uma das opções, chamada Em abas, lembra a faixa de opções. Mas a questão costuma falar da configuração padrão, que é barra de menus com barras de ferramentas.',
      { tipo: 'pegadinha', titulo: 'O LibreOffice também pode ter abas', texto: 'Em Exibir > Interface do usuário, o LibreOffice 7 oferece o modo Em abas, parecido com a faixa de opções. O padrão continua sendo barra de menus com barras de ferramentas.' }),

    // ---------- comandos de arquivo ----------
    cena('Para fechar, os comandos básicos de arquivo. Eles existem nas duas suítes e ficam no mesmo lugar: na guia Arquivo do Office e no menu Arquivo do LibreOffice. O que muda, e muito, são as teclas de atalho.',
      { tipo: 'secao', titulo: 'Comandos básicos de arquivo', itens: ['Novo', 'Abrir', 'Salvar', 'Salvar como', 'Imprimir'] }),

    cena('Salvar grava as alterações no mesmo arquivo. Salvar como cria outro arquivo, com outro nome, em outra pasta ou em outro formato, e o original fica como estava. Num documento novo, que nunca foi salvo, o Salvar abre a mesma janela do Salvar como.',
      { tipo: 'lista', titulo: 'Salvar e Salvar como', itens: ['Salvar: grava as alterações no mesmo arquivo', 'Salvar como: cria outro arquivo, com outro nome, pasta ou formato', 'O arquivo original fica como estava', 'Em documento novo, Salvar abre a janela do Salvar como'] }),

    cena('Veja as teclas. No Office em português: Ctrl+O cria um novo, Ctrl+A abre e Ctrl+B salva. No LibreOffice: Ctrl+N cria um novo, Ctrl+O abre e Ctrl+S salva. Repare que Ctrl+O faz coisas diferentes: novo no Office, abrir no LibreOffice.',
      { tipo: 'teclas', titulo: 'Novo, abrir e salvar', acoes: ['novo', 'abrir', 'salvar'] }),

    cena('Por que muda? O Office em português adaptou vários atalhos: A de abrir, N de negrito, S de sublinhado. O LibreOffice manteve as iniciais do inglês: N de new, O de open, S de save, B de bold. Por isso a mesma tecla faz coisas diferentes.',
      { tipo: 'pegadinha', titulo: 'A mesma tecla, comandos diferentes', texto: 'Ctrl+O: novo no Office, abrir no LibreOffice. Ctrl+B: salvar no Office, negrito no LibreOffice. Ctrl+N: negrito no Office, novo no LibreOffice.' },
      'Por que muda? O Office em português adaptou vários atalhos: á de abrir, ene de negrito, esse de sublinhado. O LibreOffice manteve as iniciais do inglês: ene de niú, ó de ôupen, esse de sêiv, bê de bôld. Por isso a mesma tecla faz coisas diferentes.'),

    cena('E o Salvar como? No Office é a tecla F12. No LibreOffice é Ctrl+Shift+S. Guarde bem o F12, porque no Writer essa mesma tecla faz outra coisa: liga a lista numerada.',
      { tipo: 'teclas', titulo: 'Salvar como e a tecla F12', acoes: ['salvarComo', 'listaNumerada'] }),

    cena('Agora as que são iguais ou quase. Imprimir é Ctrl+P nas duas. Fechar o documento é Ctrl+W nas duas. Desfazer é Ctrl+Z e a ajuda é F1. Para sair do programa, o Office usa Alt+F4 e o LibreOffice usa Ctrl+Q.',
      { tipo: 'teclas', titulo: 'Imprimir, fechar, desfazer e sair', acoes: ['imprimir', 'fechar', 'desfazer', 'ajuda', 'sair'] }),

    cena('Resumo. Office é proprietário e pago; LibreOffice é livre e gratuito. Os pares são Word e Writer, Excel e Calc, PowerPoint e Impress. As extensões do Office terminam em X e as do LibreOffice começam com O e D. E a interface: faixa de opções de um lado, menus do outro.',
      { tipo: 'lista', titulo: 'Resumo da aula', itens: ['Office: proprietário e pago. LibreOffice: livre e gratuito', 'Word e Writer, Excel e Calc, PowerPoint e Impress, Access e Base', 'Office: docx, xlsx, pptx. LibreOffice: odt, ods, odp', 'Office: faixa de opções. LibreOffice: menus e barras de ferramentas', 'Novo, abrir e salvar têm teclas diferentes em cada suíte'] },
      'Resumo. Office é proprietário e pago; LibreOffice é livre e gratuito. Os pares são Word e Writer, Excel e Calc, PowerPoint e Impress. As extensões do Office terminam em xis e as do LibreOffice começam com ó e dê. E a interface: faixa de opções de um lado, menus do outro.'),

    // ---------- como cai na prova ----------
    cena('Vamos treinar com três questões no estilo das bancas. Em cada uma, eu leio o enunciado. Pause o vídeo, leia as alternativas, escolha a sua e só depois continue para ver a resposta.',
      { tipo: 'secao', titulo: 'Como cai na prova', itens: ['3 questões', 'Pause o vídeo antes de ver a resposta'] }),

    ...pergunta({
      enunciado: 'No LibreOffice 7, o programa equivalente ao Microsoft Excel e a extensão padrão dos arquivos que ele cria são, respectivamente:',
      alternativas: ['Writer e .odt', 'Calc e .ods', 'Impress e .odp', 'Calc e .xlsx', 'Base e .odb'],
      correta: 1,
      comentario: 'O Calc é a planilha do LibreOffice e salva, por padrão, em .ods. O .xlsx é o padrão do Excel.',
      falaPergunta: 'Primeira questão. No LibreOffice 7, o programa equivalente ao Microsoft Excel e a extensão padrão dos arquivos que ele cria são, respectivamente... Pause e escolha.',
      falaResposta: 'Resposta: letra B, Calc e .ods. O Calc é a planilha do LibreOffice e salva em .ods por padrão. A letra D mistura as suítes: .xlsx é o padrão do Excel, embora o Calc também consiga abrir e salvar nesse formato.',
    }),

    ...pergunta({
      enunciado: 'No Word 2019 em português, na configuração padrão, as teclas Ctrl+B servem para:',
      alternativas: ['aplicar negrito ao texto selecionado.', 'salvar o documento.', 'abrir um documento.', 'criar um novo documento.', 'localizar um texto.'],
      correta: 1,
      comentario: 'No Word em português, Ctrl+B salva e Ctrl+N aplica negrito. É no Writer que Ctrl+B aplica negrito.',
      falaPergunta: 'Segunda questão. No Word 2019 em português, na configuração padrão, as teclas Ctrl+B servem para quê? Pause e escolha.',
      falaResposta: 'Resposta: letra B, salvar o documento. No Word em português, negrito é Ctrl+N. É no Writer que Ctrl+B aplica negrito. As bancas adoram essa troca.',
    }),

    ...pergunta({
      enunciado: 'Sobre a interface padrão do Word 2019 e do LibreOffice Writer 7, é correto afirmar:',
      alternativas: [
        'No Word 2019, os comandos ficam em menus suspensos, sem guias nem grupos.',
        'No Writer 7, a guia Arquivo abre o modo de exibição Backstage.',
        'No Word 2019, a faixa de opções é organizada em guias, grupos e comandos.',
        'O LibreOffice 7 não possui barra lateral.',
        'No Word 2019, só é possível gerar PDF com um programa instalado à parte.',
      ],
      correta: 2,
      comentario: 'Guias, grupos e comandos formam a faixa de opções do Office. Backstage é do Office; a barra lateral existe no LibreOffice.',
      falaPergunta: 'Terceira questão. Sobre a interface padrão do Word 2019 e do Writer 7, qual afirmação está correta? Pause, leia as cinco alternativas com calma e escolha.',
      falaResposta: 'Resposta: letra C. A faixa de opções do Office é organizada em guias, grupos e comandos. Backstage é nome do Office, não do Writer. O LibreOffice tem, sim, barra lateral. E o Word gera PDF sozinho.',
    }),

    cena('Você terminou a primeira aula. Na próxima, vamos abrir o Word 2019 e percorrer a faixa de opções guia por guia, com os recursos mais cobrados e os atalhos em português. Até lá, e bons estudos!',
      { tipo: 'lista', titulo: 'Na próxima aula', itens: ['Aula 2: Word 2019, guia por guia', 'Fonte, parágrafo e estilos', 'Cabeçalho, rodapé, sumário e revisão', 'Atalhos do Word em português'] }),
  ],
};
