import { cena, pergunta } from './_cenas.mjs';

// Menus do LibreOffice Calc 7 em português, com os comandos que aparecem nas telas desta aula.
const PLANILHA = ['Inserir células...', 'Inserir linhas', 'Inserir colunas', 'Excluir células...', 'Preencher células', 'Limpar células...', 'Intervalos nomeados e expressões', 'Inserir planilha...', 'Excluir planilha...', 'Mover ou copiar planilha...', 'Renomear planilha...', 'Proteger planilha...'];
const DADOS = ['Ordenar...', 'Ordenar crescente', 'Ordenar decrescente', 'Autofiltro', 'Mais filtros', 'Tabela dinâmica', 'Validação...', 'Subtotais...', 'Texto para colunas...', 'Consolidar...', 'Esquema'];
const FORMATAR = ['Texto', 'Alinhar', 'Formato numérico', 'Clonar formatação', 'Limpar formatação direta', 'Células...', 'Linhas', 'Colunas', 'Mesclar células', 'Intervalos de impressão', 'Condicional', 'Estilos de autoformatação...'];
const EXIBIR = ['Normal', 'Quebra de página', 'Barra de fórmulas', 'Barra de status', 'Linhas de grade', 'Realce de valor', 'Mostrar fórmula', 'Congelar linhas e colunas', 'Dividir janela', 'Barra lateral', 'Navegador', 'Zoom'];
const INSERIR = ['Figura...', 'Gráfico...', 'Tabela dinâmica...', 'Forma', 'Função...', 'Caixa de texto', 'Anotação', 'Hiperlink...', 'Caractere especial...', 'Data', 'Hora', 'Cabeçalhos e rodapés...'];
const FERRAMENTAS = ['Ortografia...', 'Idioma', 'Opções de autocorreção...', 'Atingir meta...', 'Solver...', 'Detetive', 'Cenários...', 'Proteger planilha...', 'Macros', 'Opções...'];

const calc = (aba, itens, destaque, balao) => ({ tipo: 'janela', app: 'calc', aba, itens, ...(destaque ? { destaque } : {}), ...(balao ? { balao } : {}) });
const planilha = (dados) => ({ tipo: 'planilha', app: 'calc', ...dados });

export default {
  n: 5,
  slug: 'calc',
  titulo: 'Calc 7',
  cenas: [
    cena('Aula cinco: o Calc, a planilha do LibreOffice. A boa notícia é que quase tudo o que você aprendeu no Excel vale aqui. Por isso, esta aula mostra rápido o que é igual e gasta o tempo nas diferenças, que são o que as bancas cobram.',
      { tipo: 'capa', titulo: 'Calc 7', subtitulo: 'A planilha do LibreOffice: o que é igual ao Excel e as diferenças que viram questão' }),

    cena('O roteiro. Primeiro, o que é igual ao Excel. Depois, três diferenças que caem: o tamanho da planilha, a referência a outra planilha e a alça de preenchimento. Em seguida, os menus do Calc, com os nomes que mudam, e os atalhos.',
      { tipo: 'lista', titulo: 'O que você vai ver nesta aula', itens: ['O que é igual ao Excel', 'Tamanho da planilha', 'Referência a outra planilha', 'Alça de preenchimento', 'Menus Planilha, Dados e Formatar', 'Atalhos do Calc'] }),

    cena('A base. O arquivo do Excel é a pasta de trabalho, com extensão .xlsx. O arquivo do Calc é um documento de planilha, com extensão .ods. O Excel usa faixa de opções; o Calc, barra de menus. E os atalhos gerais do Calc seguem o inglês.',
      { tipo: 'compara', titulo: 'Excel e Calc: a base', office: ['Arquivo: pasta de trabalho', 'Extensão padrão: .xlsx', 'Faixa de opções com guias', 'Atalhos adaptados ao português'], libre: ['Arquivo: documento de planilha', 'Extensão padrão: .ods', 'Barra de menus e barras de ferramentas', 'Atalhos com iniciais do inglês'] }),

    cena('O que é igual. As células têm os mesmos endereços. A fórmula começa com o sinal de igual. Os operadores são os mesmos. Dois-pontos forma intervalo e ponto e vírgula separa argumentos. O cifrão trava a referência. E os nomes das funções são em português.',
      { tipo: 'lista', titulo: 'O que é igual nos dois', itens: ['Endereço de célula: letra da coluna e número da linha', 'Fórmula começa com =', 'Mesmos operadores aritméticos e de comparação', 'A1:B3 é intervalo; ponto e vírgula separa argumentos', '$ trava a referência; F4 alterna os tipos', 'Funções em português: SOMA, MÉDIA, SE...'] },
      'O que é igual. As células têm os mesmos endereços. A fórmula começa com o sinal de igual. Os operadores são os mesmos. Dois-pontos forma intervalo e ponto e vírgula separa argumentos. O cifrão trava a referência. E os nomes das funções são em português.'),

    cena('Veja: a mesma fórmula do Excel funciona no Calc sem mudar nada. A célula C1 tem =A1+B1 e mostra quinze. A caixa de nome, a barra de fórmulas e a grade têm o mesmo papel.',
      planilha({ celulas: { A1: 10, B1: 5 }, em: 'C1', formula: '=A1+B1', resultado: '15', destaque: ['A1:B1'], nota: 'A mesma fórmula, o mesmo resultado. A estrutura da planilha é a do Excel.' })),

    // ---------- três diferenças ----------
    cena('Agora as três diferenças. A primeira é o tamanho. O número de linhas é o mesmo do Excel, mais de um milhão. Já as colunas: nas versões 7.0 a 7.3 do Calc são mil e vinte e quatro, até a coluna AMJ. A partir da versão 7.4, passaram a ser dezesseis mil, como no Excel.',
      { tipo: 'lista', titulo: 'Tamanho da planilha no Calc', itens: ['1.048.576 linhas, como no Excel', 'Versões 7.0 a 7.3: 1.024 colunas, até a coluna AMJ', 'A partir da versão 7.4: 16.384 colunas, até a XFD', 'Um documento novo abre com 1 planilha'] },
      'Agora as três diferenças. A primeira é o tamanho. O número de linhas é o mesmo do Excel, mais de um milhão. Já as colunas: nas versões sete ponto zero a sete ponto três do Calc são mil e vinte e quatro, até a coluna á eme jota. A partir da versão sete ponto quatro, passaram a ser dezesseis mil, como no Excel.'),

    cena('A segunda diferença é a referência a outra planilha do mesmo arquivo. No Calc, escreve-se o nome da planilha, um ponto e a célula. No Excel, você viu, o separador é o ponto de exclamação.',
      planilha({ celulas: {}, em: 'A1', formula: '=Planilha2.A1', nota: 'No Calc: nome da planilha, ponto e a célula.' }),
      'A segunda diferença é a referência a outra planilha do mesmo arquivo. No Calc, escreve-se o nome da planilha, um ponto e a célula. No Excel, você viu, o separador é o ponto de exclamação.'),

    cena('Guarde assim: Excel, exclamação; Calc, ponto. A banca costuma colocar as duas formas nas alternativas e perguntar qual vale em cada programa.',
      { tipo: 'compara', titulo: 'Referência a outra planilha', office: ['=Planilha2!A1', 'Separador: ponto de exclamação'], libre: ['=Planilha2.A1', 'Separador: ponto'] },
      'Guarde assim: Excel, exclamação; Calc, ponto. A banca costuma colocar as duas formas nas alternativas e perguntar qual vale em cada programa.'),

    cena('A terceira diferença é a alça de preenchimento. No Calc, arrastar a alça de uma célula que tem só um número já cria a sequência: um, dois, três, quatro. Um texto comum é copiado, e os meses continuam, como no Excel.',
      planilha({ celulas: { A1: 1, A2: 2, A3: 3, A4: 4, B1: 'Texto', B2: 'Texto', B3: 'Texto', B4: 'Texto', C1: 'Janeiro', C2: 'Fevereiro', C3: 'Março', C4: 'Abril' }, em: 'A1', destaque: ['A2:C4'], nota: 'A: um número sozinho vira sequência. B: texto é copiado. C: meses continuam.' })),

    cena('E para repetir o mesmo número no Calc? Arraste a alça com a tecla Ctrl apertada. É exatamente o contrário do Excel, onde arrastar copia o número e o Ctrl é que faz a sequência.',
      { tipo: 'compara', titulo: 'Alça de preenchimento com um número só', office: ['Arrastar: copia. 1, 1, 1', 'Arrastar com Ctrl: sequência. 1, 2, 3'], libre: ['Arrastar: sequência. 1, 2, 3', 'Arrastar com Ctrl: copia. 1, 1, 1'] }),

    cena('Esta é uma das questões mais repetidas sobre planilhas. Leia com atenção qual é o programa. Número um na célula, alça arrastada para baixo, nenhuma tecla apertada: no Calc aparece dois; no Excel aparece um.',
      { tipo: 'pegadinha', titulo: 'A alça faz o contrário em cada programa', texto: 'Célula com o número 1, alça arrastada sem apertar tecla: no Calc vem 2, 3, 4. No Excel vem 1, 1, 1.' }),

    // ---------- menus ----------
    cena('Vamos aos menus. O Calc tem os mesmos onze menus do Writer, com duas trocas: no lugar de Tabela e Formulário entram Planilha e Dados. É neles que está a maior parte do que é próprio das planilhas.',
      { tipo: 'secao', titulo: 'Os menus do Calc', itens: ['Arquivo', 'Editar', 'Exibir', 'Inserir', 'Formatar', 'Estilos', 'Planilha', 'Dados', 'Ferramentas'] }),

    cena('O menu Planilha trata das células e das planilhas do arquivo. Nele você insere e exclui células, linhas e colunas, e também insere, exclui, move, copia, renomeia e protege planilhas inteiras.',
      calc('Planilha', PLANILHA, 'Inserir planilha...', 'Tudo o que se faz com a planilha inteira fica aqui: inserir, excluir, mover, copiar, renomear e proteger.')),

    cena('O menu Dados é o equivalente à guia Dados do Excel. O Autofiltro coloca setas nos títulos das colunas e mostra só as linhas que atendem ao critério escolhido. No Excel, o mesmo recurso se chama Filtro.',
      calc('Dados', DADOS, 'Autofiltro', 'É o Filtro do Excel. As linhas que não atendem ao critério ficam ocultas, não são apagadas.')),

    cena('Ordenar reordena as linhas, em ordem crescente ou decrescente. É o que o Excel chama de Classificar. Os dois programas fazem a mesma coisa, com nomes diferentes.',
      calc('Dados', DADOS, 'Ordenar...', 'É o Classificar do Excel: reordena as linhas por uma ou mais colunas.')),

    cena('A tabela dinâmica também existe no Calc, com a mesma função: resumir muitos dados sem escrever fórmulas. Ela fica no menu Dados e aparece também no menu Inserir.',
      calc('Dados', DADOS, 'Tabela dinâmica', 'Mesma função da Tabela Dinâmica do Excel. No Calc, fica no menu Dados e no menu Inserir.')),

    cena('Validação restringe o que pode ser digitado na célula, como uma lista de opções ou um número entre dois limites. No Excel, o nome completo é Validação de Dados.',
      calc('Dados', DADOS, 'Validação...', 'Limita o que a célula aceita. No Excel: Validação de Dados, na guia Dados.')),

    cena('No menu Formatar ficam os recursos de aparência. Mesclar células reúne as opções de mesclar e centralizar. Como no Excel, ao mesclar células com dados você precisa decidir o que fazer com o conteúdo das células que somem.',
      calc('Formatar', FORMATAR, 'Mesclar células', 'Aqui fica Mesclar e centralizar células. No Excel, o botão está na guia Página Inicial.')),

    cena('A formatação condicional do Calc está em Formatar, Condicional. Ela muda a aparência da célula conforme o valor, com cores, barras de dados e conjuntos de ícones.',
      calc('Formatar', FORMATAR, 'Condicional', 'É a Formatação Condicional. No Excel: guia Página Inicial, grupo Estilos.')),

    cena('Intervalos de impressão define qual parte da planilha vai para o papel. É o que o Excel chama de Área de Impressão, na guia Layout da Página.',
      calc('Formatar', FORMATAR, 'Intervalos de impressão', 'É a Área de Impressão do Excel.')),

    cena('E o comando Células abre a janela Formatar células, com as abas de números, fonte, alinhamento, bordas e plano de fundo. O atalho é o mesmo do Excel: Ctrl+1.',
      calc('Formatar', FORMATAR, 'Células...', 'Abre a janela Formatar células: números, fonte, alinhamento e bordas. Atalho: Ctrl+1.')),

    cena('No menu Exibir, o recurso mais cobrado é Congelar linhas e colunas. Ele mantém os títulos parados enquanto você rola a planilha. No Excel, o nome é Congelar Painéis.',
      calc('Exibir', EXIBIR, 'Congelar linhas e colunas', 'É o Congelar Painéis do Excel: mantém linhas e colunas visíveis durante a rolagem.')),

    cena('Ainda em Exibir, Mostrar fórmula troca os resultados pelas fórmulas em todas as células, para conferência. É o mesmo que o botão Mostrar Fórmulas da guia Fórmulas do Excel.',
      calc('Exibir', EXIBIR, 'Mostrar fórmula', 'As células passam a exibir as fórmulas, e não os resultados. No Excel: Mostrar Fórmulas.')),

    cena('No menu Inserir ficam gráfico, figura, tabela dinâmica e função. O comando Função abre o Assistente de funções, que guia o preenchimento de cada argumento. No Excel, o botão equivalente é Inserir Função.',
      calc('Inserir', INSERIR, 'Função...', 'Abre o Assistente de funções. No Excel: Inserir Função.')),

    cena('E no menu Ferramentas ficam Atingir meta, Solver, Cenários e o Detetive. O Detetive rastreia quais células alimentam uma fórmula e quais dependem dela. No Excel, isso é a Auditoria de Fórmulas.',
      calc('Ferramentas', FERRAMENTAS, 'Detetive', 'Rastreia precedentes e dependentes. No Excel: Auditoria de Fórmulas, na guia Fórmulas.')),

    cena('Atingir meta faz a conta de trás para a frente. Você informa o resultado que quer numa fórmula, e o Calc descobre que valor uma das células precisa ter para chegar nele. O Excel tem o mesmo recurso, com o mesmo nome, na guia Dados.',
      calc('Ferramentas', FERRAMENTAS, 'Atingir meta...', 'Você diz o resultado desejado; o Calc encontra o valor de entrada que leva a ele.')),

    cena('Proteger planilha impede que as células sejam alteradas, com senha se você quiser. O comando aparece no menu Ferramentas e também no menu Planilha. No Excel, Proteger Planilha fica na guia Revisão.',
      calc('Ferramentas', FERRAMENTAS, 'Proteger planilha...', 'Bloqueia a edição das células, com ou sem senha. No Excel: guia Revisão.')),

    cena('Sobre arquivos. O Calc abre e salva planilhas do Excel, no formato .xlsx, mas por padrão salva em .ods. E, como no Writer, o PDF não está em Salvar como: fica em Arquivo, Exportar como, Exportar como PDF.',
      { tipo: 'lista', titulo: 'Arquivos no Calc', itens: ['Formato padrão: .ods', 'Abre e salva .xlsx, o formato do Excel', 'Modelo de planilha: .ots', 'PDF: Arquivo > Exportar como > Exportar como PDF'] }),

    cena('Um quadro para fixar os nomes. Classificar vira Ordenar. Filtro vira Autofiltro. Congelar Painéis vira Congelar linhas e colunas. Área de Impressão vira Intervalos de impressão. E Auditoria de Fórmulas vira Detetive.',
      { tipo: 'compara', titulo: 'O mesmo recurso, nomes diferentes', office: ['Classificar', 'Filtro', 'Congelar Painéis', 'Área de Impressão', 'Auditoria de Fórmulas'], libre: ['Ordenar', 'Autofiltro', 'Congelar linhas e colunas', 'Intervalos de impressão', 'Detetive'] }),

    cena('As mensagens de erro são parecidas com as do Excel: divisão por zero, nome não reconhecido, valor de tipo errado e referência inválida. O Calc tem ainda códigos próprios, que começam com E R R, e mostra cerquilhas quando a coluna está estreita.',
      { tipo: 'lista', titulo: 'Mensagens de erro no Calc', itens: ['#DIV/0!: divisão por zero', '#NOME?: função ou nome não reconhecido', '#VALOR!: tipo de dado errado', '#REF!: referência inválida', '#N/DISP: valor não disponível', 'Err:502 e parecidos: códigos de erro do Calc', '###: coluna estreita demais para o número'] },
      'As mensagens de erro são parecidas com as do Excel: divisão por zero, nome não reconhecido, valor de tipo errado e referência inválida. O Calc tem ainda códigos próprios, que começam com as letras é, érre, érre, e mostra cerquilhas quando a coluna está estreita.'),

    // ---------- atalhos ----------
    cena('Os atalhos de planilha são, em boa parte, os mesmos do Excel. F2 edita a célula. F4 alterna a referência. Ctrl+1 abre Formatar células. Ctrl+; insere a data. Ctrl+Shift+L liga o Autofiltro. E Alt+= insere a soma.',
      { tipo: 'teclas', titulo: 'Iguais no Excel e no Calc', acoes: ['editarCelula', 'refAbsoluta', 'formatarCelulas', 'dataAtual', 'filtro', 'autoSoma'] }),

    cena('Agora os que mudam. O Assistente de funções abre com Ctrl+F2; no Excel, Inserir Função é Shift+F3. E a tecla F11: no Excel, cria um gráfico em uma planilha nova; no Calc, abre o painel de Estilos. F9 recalcula nos dois.',
      { tipo: 'teclas', titulo: 'O que muda do Excel para o Calc', acoes: ['inserirFuncao', 'graficoRapido', 'estilos', 'recalcular'] }),

    cena('E os atalhos gerais são os do LibreOffice. Negrito é Ctrl+B, salvar é Ctrl+S, abrir é Ctrl+O, novo é Ctrl+N, selecionar tudo é Ctrl+A e localizar é Ctrl+F. Na coluna do Office, estão os do Excel em português.',
      { tipo: 'teclas', titulo: 'Atalhos gerais', acoes: ['negrito', 'salvar', 'abrir', 'novo', 'selecionarTudo', 'localizar'] }),

    cena('Cuidado com Ctrl+B dentro de uma planilha. No Calc, aplica negrito na célula. No Excel em português, salva a pasta de trabalho. É a mesma troca que você viu entre o Writer e o Word.',
      { tipo: 'pegadinha', titulo: 'Ctrl+B na planilha', texto: 'No Calc, Ctrl+B aplica negrito. No Excel em português, Ctrl+B salva. Negrito no Excel é Ctrl+N.' }),

    cena('Resumo. O Calc salva em .ods. Referência a outra planilha usa ponto, e não exclamação. Um número sozinho arrastado pela alça vira sequência. E os nomes mudam: Ordenar, Autofiltro, Congelar linhas e colunas, Intervalos de impressão e Detetive.',
      { tipo: 'lista', titulo: 'Resumo da aula', itens: ['Documento de planilha, extensão .ods', 'Outra planilha: Planilha2.A1 (com ponto)', 'Alça com um número: o Calc faz sequência; com Ctrl, copia', 'Ordenar, Autofiltro e Tabela dinâmica: menu Dados', 'Mesclar, Condicional e Intervalos de impressão: menu Formatar', 'Congelar linhas e colunas: menu Exibir'] },
      'Resumo. O Calc salva em .ods. Referência a outra planilha usa ponto, e não exclamação. Um número sozinho arrastado pela alça vira sequência. E os nomes mudam: Ordenar, Autofiltro, Congelar linhas e colunas, Intervalos de impressão e Detetive.'),

    // ---------- como cai na prova ----------
    cena('Três questões no estilo das bancas. Em todas, a primeira coisa a fazer é conferir de qual programa o enunciado está falando.',
      { tipo: 'secao', titulo: 'Como cai na prova', itens: ['3 questões', 'Pause o vídeo antes de ver a resposta'] }),

    ...pergunta({
      enunciado: 'No LibreOffice Calc 7, a fórmula que soma o valor da célula A1 da planilha chamada Planilha2 com o valor da célula B1 da planilha atual é:',
      alternativas: ['=Planilha2!A1+B1', '=Planilha2.A1+B1', '=Planilha2:A1+B1', '=Planilha2;A1+B1', '=[Planilha2]A1+B1'],
      correta: 1,
      comentario: 'No Calc, o nome da planilha é separado da célula por um ponto. O ponto de exclamação é do Excel.',
      falaPergunta: 'Primeira questão. No Calc 7, qual fórmula soma o valor da célula A1 da planilha chamada Planilha dois com o valor da célula B1 da planilha atual? Pause e escolha.',
      falaResposta: 'Resposta: letra B, a que usa o ponto entre o nome da planilha e a célula. A letra A, com o ponto de exclamação, é a forma do Excel.',
    }),

    ...pergunta({
      enunciado: 'No Calc 7, a célula A1 contém o número 5. O usuário seleciona A1 e arrasta a alça de preenchimento até A3, sem pressionar nenhuma tecla. Os valores de A2 e A3 serão, respectivamente:',
      alternativas: ['5 e 5', '6 e 7', '10 e 15', '5 e 6', '0 e 0'],
      correta: 1,
      comentario: 'No Calc, um número sozinho arrastado pela alça vira sequência: 5, 6, 7. No Excel, seria 5, 5, 5.',
      falaPergunta: 'Segunda questão. No Calc 7, a célula A1 contém o número cinco. O usuário arrasta a alça de preenchimento até A3, sem apertar nenhuma tecla. Quais serão os valores de A2 e A3? Pause e escolha.',
      falaResposta: 'Resposta: letra B, seis e sete. No Calc, um número sozinho arrastado pela alça vira sequência. A letra A, cinco e cinco, seria a resposta se o programa fosse o Excel.',
    }),

    ...pergunta({
      enunciado: 'No Calc 7, o recurso que coloca setas nos títulos das colunas e exibe apenas as linhas que atendem a um critério é acessado em:',
      alternativas: ['Dados > Autofiltro.', 'Dados > Ordenar.', 'Formatar > Condicional.', 'Exibir > Congelar linhas e colunas.', 'Ferramentas > Detetive.'],
      correta: 0,
      comentario: 'Autofiltro, no menu Dados, é o equivalente ao Filtro do Excel.',
      falaPergunta: 'Terceira questão. No Calc 7, onde fica o recurso que coloca setas nos títulos das colunas e exibe apenas as linhas que atendem a um critério? Pause e escolha.',
      falaResposta: 'Resposta: letra A, Dados, Autofiltro. Ordenar só muda a ordem das linhas. Condicional muda a aparência. Congelar mantém os títulos parados. E o Detetive rastreia fórmulas.',
    }),

    cena('Fim da aula cinco. Você já sabe montar fórmulas nas duas planilhas. Na próxima aula, vamos às funções: soma, média, máximo, mínimo, contagens, SE, PROCV e as outras que mais aparecem em prova. Até lá!',
      { tipo: 'lista', titulo: 'Na próxima aula', itens: ['Aula 6: funções de planilha', 'SOMA, MÉDIA, MÁXIMO e MÍNIMO', 'CONT.SE e SOMASE', 'SE, E, OU e PROCV'] },
      'Fim da aula cinco. Você já sabe montar fórmulas nas duas planilhas. Na próxima aula, vamos às funções: soma, média, máximo, mínimo, contagens, se, proc vê e as outras que mais aparecem em prova. Até lá!'),
  ],
};
