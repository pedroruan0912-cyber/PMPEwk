import { cena, pergunta } from './_cenas.mjs';

// Guias do Excel 2019 em português, com os grupos e comandos que aparecem nas telas desta aula.
const PAGINA_INICIAL = [
  { grupo: 'Área de Transferência', itens: ['Colar', 'Recortar', 'Copiar', 'Pincel de Formatação'] },
  { grupo: 'Fonte', itens: ['Negrito', 'Itálico', 'Sublinhado', 'Bordas', 'Cor de Preenchimento'] },
  { grupo: 'Alinhamento', itens: ['Quebrar Texto Automaticamente', 'Mesclar e Centralizar'] },
  { grupo: 'Número', itens: ['Formato de Número', 'Estilo de Porcentagem', 'Aumentar Casas Decimais'] },
  { grupo: 'Estilos', itens: ['Formatação Condicional', 'Formatar como Tabela'] },
  { grupo: 'Edição', itens: ['AutoSoma', 'Preencher', 'Classificar e Filtrar'] },
];
const INSERIR = [
  { grupo: 'Tabelas', itens: ['Tabela Dinâmica', 'Tabela'] },
  { grupo: 'Ilustrações', itens: ['Imagens', 'Formas'] },
  { grupo: 'Gráficos', itens: ['Gráficos Recomendados', 'Colunas', 'Linhas', 'Pizza', 'Barras'] },
  { grupo: 'Minigráficos', itens: ['Linha', 'Coluna'] },
  { grupo: 'Filtros', itens: ['Segmentação de Dados'] },
];
const LAYOUT = [
  { grupo: 'Temas', itens: ['Temas'] },
  { grupo: 'Configurar Página', itens: ['Margens', 'Orientação', 'Tamanho', 'Área de Impressão', 'Quebras', 'Imprimir Títulos'] },
  { grupo: 'Dimensionar para Ajustar', itens: ['Largura', 'Altura', 'Escala'] },
];
const FORMULAS = [
  { grupo: 'Biblioteca de Funções', itens: ['Inserir Função', 'AutoSoma', 'Financeira', 'Lógica', 'Texto', 'Data e Hora'] },
  { grupo: 'Nomes Definidos', itens: ['Gerenciador de Nomes', 'Definir Nome'] },
  { grupo: 'Auditoria de Fórmulas', itens: ['Rastrear Precedentes', 'Rastrear Dependentes', 'Mostrar Fórmulas'] },
  { grupo: 'Cálculo', itens: ['Calcular Agora'] },
];
const DADOS = [
  { grupo: 'Classificar e Filtrar', itens: ['Classificar', 'Filtro', 'Avançado'] },
  { grupo: 'Ferramentas de Dados', itens: ['Texto para Colunas', 'Remover Duplicatas', 'Validação de Dados'] },
  { grupo: 'Estrutura de Tópicos', itens: ['Agrupar', 'Subtotal'] },
];
const EXIBIR = [
  { grupo: 'Modos de Exibição de Pasta de Trabalho', itens: ['Normal', 'Visualização da Quebra de Página', 'Layout da Página'] },
  { grupo: 'Mostrar', itens: ['Linhas de Grade', 'Barra de Fórmulas', 'Títulos'] },
  { grupo: 'Janela', itens: ['Nova Janela', 'Congelar Painéis', 'Dividir', 'Ocultar'] },
];

const excel = (aba, itens, destaque, balao) => ({ tipo: 'janela', app: 'excel', aba, itens, ...(destaque ? { destaque } : {}), ...(balao ? { balao } : {}) });
const planilha = (dados) => ({ tipo: 'planilha', app: 'excel', ...dados });

export default {
  n: 4,
  slug: 'excel',
  titulo: 'Excel 2019',
  cenas: [
    cena('Aula quatro: o Excel 2019, a planilha eletrônica do Office. Você vai ver como a planilha é organizada, como escrever fórmulas, os tipos de referência, a alça de preenchimento, o que há em cada guia e os atalhos.',
      { tipo: 'capa', titulo: 'Excel 2019', subtitulo: 'Células, referências, fórmulas e os recursos mais cobrados da planilha do Office' }),

    cena('O caminho da aula. Primeiro, a estrutura: pasta de trabalho, planilha e célula. Depois, fórmulas e operadores. Em seguida, referências relativas e absolutas, que caem muito. E por fim as guias do Excel, as mensagens de erro e os atalhos.',
      { tipo: 'lista', titulo: 'O que você vai ver nesta aula', itens: ['Pasta de trabalho, planilha e célula', 'Fórmulas e operadores', 'Referências relativa, absoluta e mista', 'Alça de preenchimento', 'As guias do Excel', 'Mensagens de erro e atalhos'] }),

    // ---------- estrutura ----------
    cena('O arquivo do Excel se chama pasta de trabalho, e dentro dela ficam as planilhas. Cada planilha é uma grade. As colunas são identificadas por letras e as linhas, por números. O encontro de uma coluna com uma linha é a célula.',
      { tipo: 'secao', titulo: 'A estrutura da planilha', itens: ['Pasta de trabalho', 'Planilha', 'Coluna e linha', 'Célula'] }),

    cena('O endereço da célula é sempre a letra da coluna seguida do número da linha. Aqui, a célula selecionada está na coluna B e na linha 3: é a célula B3. Esse endereço aparece na caixa de nome, à esquerda da barra de fórmulas.',
      planilha({ celulas: { B3: 'aqui' }, em: 'B3', nota: 'Coluna B, linha 3: célula B3. A caixa de nome, acima da coluna A, mostra o endereço.' })),

    cena('Alguns números para guardar. Uma pasta nova do Excel 2019 abre com uma planilha. Cada planilha tem mais de um milhão de linhas e mais de dezesseis mil colunas, e a última coluna é a XFD. A extensão padrão do arquivo é .xlsx.',
      { tipo: 'lista', titulo: 'Números para guardar', itens: ['O arquivo é a pasta de trabalho, extensão .xlsx', 'Uma pasta nova do Excel 2019 abre com 1 planilha', '1.048.576 linhas em cada planilha', '16.384 colunas, da A até a XFD', 'Célula: letra da coluna e número da linha, como B3'] },
      'Alguns números para guardar. Uma pasta nova do Excel 2019 abre com uma planilha. Cada planilha tem mais de um milhão de linhas e mais de dezesseis mil colunas, e a última coluna é a xis efe dê. A extensão padrão do arquivo é .xlsx.'),

    cena('Intervalo é um conjunto de células. Os dois-pontos significam até: A1, dois-pontos, B3 vai de A1 até B3, e são seis células. O ponto e vírgula significa e: A1, ponto e vírgula, B3 são só duas células, a A1 e a B3.',
      planilha({ celulas: { A1: 1, A2: 2, A3: 3, B1: 4, B2: 5, B3: 6 }, em: 'D1', destaque: ['A1:B3'], nota: 'A1:B3 é de A1 até B3: seis células. A1;B3 é A1 e B3: duas células.' }),
      'Intervalo é um conjunto de células. Os dois-pontos significam até: á um, dois-pontos, bê três vai de á um até bê três, e são seis células. O ponto e vírgula significa e: á um, ponto e vírgula, bê três são só duas células, a á um e a bê três.'),

    // ---------- fórmulas e operadores ----------
    cena('Toda fórmula começa com o sinal de igual. Sem ele, o Excel entende o que você digitou como texto. Depois de confirmar com Enter, a célula mostra o resultado, e a barra de fórmulas mostra a fórmula.',
      { tipo: 'secao', titulo: 'Fórmulas e operadores', itens: ['Começam com =', 'Aritméticos', 'De comparação', 'Ordem de cálculo'] }),

    cena('Neste exemplo, a célula C1 tem a fórmula =A1+B1. Como A1 vale dez e B1 vale cinco, a célula mostra quinze. Se você mudar o valor de A1, o resultado em C1 é recalculado sozinho.',
      planilha({ celulas: { A1: 10, B1: 5 }, em: 'C1', formula: '=A1+B1', resultado: '15', destaque: ['A1:B1'], nota: 'A célula mostra o resultado. A fórmula aparece na barra de fórmulas.' })),

    cena('Os operadores aritméticos. Mais soma e menos subtrai. O asterisco multiplica e a barra divide. O acento circunflexo é a potência. O sinal de porcentagem divide por cem. E o e comercial junta dois textos, o que se chama concatenar.',
      { tipo: 'lista', titulo: 'Operadores aritméticos e de texto', itens: ['+ soma e - subtração', '* multiplicação e / divisão', '^ potência', '% porcentagem', '& concatenação: junta textos'] }),

    cena('Os operadores de comparação devolvem verdadeiro ou falso. São eles: igual, maior que, menor que, maior ou igual, menor ou igual e diferente. Atenção ao diferente, que no Excel se escreve com os sinais de menor e maior juntos.',
      { tipo: 'lista', titulo: 'Operadores de comparação', itens: ['= igual', '> maior que e < menor que', '>= maior ou igual', '<= menor ou igual', '<> diferente'] }),

    cena('A ordem de cálculo é a da matemática. Primeiro a potência, depois multiplicação e divisão, e por último soma e subtração. Por isso =2+3*4 dá catorze: o Excel faz três vezes quatro, doze, e só depois soma dois.',
      planilha({ celulas: {}, em: 'A1', formula: '=2+3*4', resultado: '14', nota: 'Ordem: parênteses, potência, multiplicação e divisão, soma e subtração.' })),

    cena('Os parênteses mudam essa ordem, porque o que está dentro deles é calculado primeiro. Com parênteses em volta da soma, a fórmula dá vinte: dois mais três, cinco, vezes quatro.',
      planilha({ celulas: {}, em: 'A1', formula: '=(2+3)*4', resultado: '20', nota: 'O que está entre parênteses é calculado primeiro.' })),

    // ---------- referências ----------
    cena('Agora o assunto mais cobrado de planilhas: as referências. Referência é o endereço de célula usado dentro da fórmula. Ela pode ser relativa, absoluta ou mista, e isso decide o que acontece quando a fórmula é copiada.',
      { tipo: 'secao', titulo: 'Referências', itens: ['Relativa: A1', 'Absoluta: $A$1', 'Mista: $A1 ou A$1'] },
      'Agora o assunto mais cobrado de planilhas: as referências. Referência é o endereço de célula usado dentro da fórmula. Ela pode ser relativa, absoluta ou mista, e isso decide o que acontece quando a fórmula é copiada.'),

    cena('Referência relativa é a comum, sem cifrão. Ao copiar a fórmula, ela se ajusta. A fórmula de C2 é =A2*B2. Copiada para a linha de baixo, em C3, ela vira =A3*B3: as referências acompanharam a mudança de linha.',
      planilha({ celulas: { A1: 'Preço', B1: 'Qtde', C1: 'Total', A2: 5, B2: 3, C2: 15, A3: 8, B3: 2 }, em: 'C3', formula: '=A3*B3', resultado: '16', destaque: ['C2'], nota: 'C2 tem =A2*B2. Copiada para C3, vira =A3*B3.' })),

    cena('Referência absoluta tem cifrão antes da letra e antes do número, e não muda quando a fórmula é copiada. Aqui, a taxa está em E1. A fórmula de B2 é =A2*$E$1. Copiada para B3, a parte relativa vira A3, mas $E$1 continua igual.',
      planilha({ celulas: { A1: 'Valor', B1: 'Taxa', D1: 'Taxa:', E1: '10%', A2: 100, B2: 10, A3: 200 }, em: 'B3', formula: '=A3*$E$1', resultado: '20', destaque: ['E1'], nota: 'O cifrão trava: $E$1 aponta para E1 em qualquer cópia.' })),

    cena('E há a referência mista, com um cifrão só. Cifrão antes da letra trava a coluna. Cifrão antes do número trava a linha. Para alternar entre os tipos enquanto digita a fórmula, use a tecla F4.',
      { tipo: 'lista', titulo: 'Os tipos de referência', itens: ['A1: relativa. Coluna e linha mudam na cópia', '$A$1: absoluta. Nada muda', '$A1: mista. A coluna fica travada', 'A$1: mista. A linha fica travada', 'A tecla F4 alterna entre os tipos'] }),

    cena('Uma fórmula pode buscar valor em outra planilha da mesma pasta. No Excel, escreve-se o nome da planilha, um ponto de exclamação e a célula. Guarde o ponto de exclamação, porque no Calc o separador é outro.',
      planilha({ celulas: {}, em: 'A1', formula: '=Planilha2!A1', nota: 'No Excel: nome da planilha, ponto de exclamação e a célula.' }),
      'Uma fórmula pode buscar valor em outra planilha da mesma pasta. No Excel, escreve-se o nome da planilha, um ponto de exclamação e a célula. Guarde o ponto de exclamação, porque no Calc o separador é outro.'),

    // ---------- alça de preenchimento ----------
    cena('Alça de preenchimento é o quadradinho no canto inferior direito da célula selecionada. Arrastando a alça, você copia o conteúdo ou continua uma sequência nas células vizinhas.',
      { tipo: 'secao', titulo: 'Alça de preenchimento', itens: ['Copia o conteúdo', 'Continua sequências', 'Ajusta as fórmulas'] }),

    cena('Veja três casos. Na coluna A, Janeiro arrastado continua os meses. Na coluna B, o número cinco sozinho é apenas copiado. Na coluna C, dois e quatro foram selecionados juntos, e o Excel continuou de dois em dois.',
      planilha({ celulas: { A1: 'Janeiro', A2: 'Fevereiro', A3: 'Março', A4: 'Abril', B1: 5, B2: 5, B3: 5, B4: 5, C1: 2, C2: 4, C3: 6, C4: 8 }, em: 'A1', destaque: ['A2:C4'], nota: 'A: meses continuam. B: um número sozinho é copiado. C: dois números selecionados definem o passo.' })),

    cena('Esta é a diferença para o Calc. No Excel, arrastar a alça de uma célula que tem só um número repete o número. Para obter um, dois, três, selecione duas células com um e dois, ou arraste com a tecla Ctrl apertada.',
      { tipo: 'pegadinha', titulo: 'No Excel, um número sozinho é copiado', texto: 'Arrastando a alça de uma célula com o número 1, o Excel repete 1, 1, 1. Para 1, 2, 3, selecione duas células (1 e 2) ou arraste com Ctrl apertado.' }),

    // ---------- guias ----------
    cena('Vamos às guias. O Excel 2019 tem Arquivo, Página Inicial, Inserir, Layout da Página, Fórmulas, Dados, Revisão e Exibir. Duas delas são exclusivas das planilhas: Fórmulas e Dados.',
      { tipo: 'secao', titulo: 'As guias do Excel 2019', itens: ['Página Inicial', 'Inserir', 'Layout da Página', 'Fórmulas', 'Dados', 'Revisão', 'Exibir'] }),

    cena('Na Página Inicial, o grupo Alinhamento tem o botão Mesclar e Centralizar. Ele junta as células selecionadas em uma só e centraliza o conteúdo. Cuidado: se havia dados em várias células, só o da célula superior esquerda é mantido.',
      excel('Página Inicial', PAGINA_INICIAL, 'Mesclar e Centralizar', 'Junta as células em uma só. Só o conteúdo da célula superior esquerda é mantido.')),

    cena('No mesmo grupo, Quebrar Texto Automaticamente faz um texto comprido aparecer em várias linhas dentro da própria célula, sem alargar a coluna.',
      excel('Página Inicial', PAGINA_INICIAL, 'Quebrar Texto Automaticamente', 'O texto ocupa várias linhas dentro da mesma célula; a largura da coluna não muda.')),

    cena('No grupo Estilos fica a Formatação Condicional. Ela muda a aparência da célula conforme o valor que está nela. Por exemplo: pintar de vermelho, sozinha, toda nota abaixo de sete.',
      excel('Página Inicial', PAGINA_INICIAL, 'Formatação Condicional', 'A aparência depende do valor: cores, barras de dados, escalas de cor e ícones.')),

    cena('O grupo Número define como o valor aparece: geral, moeda, contábil, porcentagem, data ou texto. O formato muda a aparência, não o valor guardado. A janela completa, Formatar Células, abre com Ctrl+1.',
      { tipo: 'lista', titulo: 'Formatos de número', itens: ['Geral: o formato padrão', 'Moeda e Contábil: R$ 1.234,50', 'Porcentagem: 0,25 aparece como 25%', 'Data e Hora', 'Texto: o número passa a ser tratado como texto', 'Ctrl+1 abre a janela Formatar Células'] }),

    cena('Na guia Inserir ficam as tabelas, as ilustrações e os gráficos. A Tabela Dinâmica resume grandes volumes de dados: ela agrupa, soma e conta sem que você escreva nenhuma fórmula.',
      excel('Inserir', INSERIR, 'Tabela Dinâmica', 'Resume muitos dados: agrupa, soma, conta e calcula médias sem fórmulas.')),

    cena('Os gráficos também ficam em Inserir. Colunas e barras comparam valores. Linhas mostram a evolução ao longo do tempo. E pizza mostra a parte de cada item no total. Os minigráficos são gráficos pequenos, dentro de uma única célula.',
      excel('Inserir', INSERIR, 'Pizza', 'Colunas e barras: comparação. Linhas: evolução no tempo. Pizza: parte de cada item no total.')),

    cena('A guia Layout da Página prepara a impressão: margens, orientação, tamanho do papel e a Área de Impressão, que define qual trecho da planilha vai para o papel. Imprimir Títulos repete a linha de cabeçalho em todas as páginas.',
      excel('Layout da Página', LAYOUT, 'Área de Impressão', 'Define qual parte da planilha será impressa.')),

    cena('A guia Fórmulas tem a Biblioteca de Funções, com as funções separadas por categoria, e o botão Inserir Função. No grupo Auditoria de Fórmulas, Mostrar Fórmulas exibe as fórmulas nas células, no lugar dos resultados.',
      excel('Fórmulas', FORMULAS, 'Mostrar Fórmulas', 'As células passam a mostrar as fórmulas, e não os resultados.')),

    cena('A guia Dados trabalha com listas. Classificar reordena as linhas, por exemplo de A a Z. Filtro mostra só as linhas que atendem a um critério. As outras linhas ficam escondidas, mas não são apagadas.',
      excel('Dados', DADOS, 'Filtro', 'Mostra só as linhas que atendem ao critério. As demais ficam ocultas, não são apagadas.')),

    cena('Ainda em Dados, a Validação de Dados restringe o que pode ser digitado numa célula: uma lista de opções, um número entre dois limites, uma data. E Remover Duplicatas apaga as linhas repetidas.',
      excel('Dados', DADOS, 'Validação de Dados', 'Limita o que a célula aceita: lista de opções, intervalo de números, datas.')),

    cena('Na guia Exibir, o destaque é Congelar Painéis. Ele mantém linhas ou colunas paradas na tela enquanto você rola o resto da planilha. É o que se usa para deixar a linha de títulos sempre à vista.',
      excel('Exibir', EXIBIR, 'Congelar Painéis', 'Mantém linhas e colunas visíveis durante a rolagem, como a linha de títulos.')),

    // ---------- erros ----------
    cena('As mensagens de erro começam com o sinal de cerquilha. Divisão por zero. Nome de função digitado errado. Valor de tipo errado, como texto numa conta. Referência a uma célula que foi apagada. E valor não encontrado numa busca.',
      { tipo: 'lista', titulo: 'Mensagens de erro', itens: ['#DIV/0!: divisão por zero', '#NOME?: função ou nome não reconhecido', '#VALOR!: tipo de dado errado, como texto numa conta', '#REF!: a célula referenciada não existe mais', '#N/D: valor não encontrado', '#####: coluna estreita demais para mostrar o número'] }),

    cena('O último da lista não é bem um erro. Uma célula cheia de cerquilhas indica só que a coluna está estreita demais para mostrar o número. Basta alargar a coluna, e o valor aparece.',
      { tipo: 'pegadinha', titulo: 'Cerquilhas na célula não são erro de fórmula', texto: 'A célula cheia de sinais # significa que a coluna está estreita demais. Alargue a coluna e o número aparece.' }),

    // ---------- atalhos ----------
    cena('Os atalhos próprios do Excel. F2 edita a célula. F4 alterna a referência. Ctrl+1 abre Formatar Células. Ctrl+; insere a data de hoje. Ctrl+Shift+L liga o filtro. E Alt+= insere a AutoSoma.',
      { tipo: 'teclas', titulo: 'Atalhos de planilha', acoes: ['editarCelula', 'refAbsoluta', 'formatarCelulas', 'dataAtual', 'filtro', 'autoSoma'] }),

    cena('Mais cinco. Shift+F3 abre Inserir Função. F9 recalcula as fórmulas. Ctrl+PgDn vai para a próxima planilha. F11 cria um gráfico em uma planilha nova. E, no Excel, refazer é Ctrl+Y.',
      { tipo: 'teclas', titulo: 'Mais atalhos do Excel', acoes: ['inserirFuncao', 'recalcular', 'proximaPlanilha', 'graficoRapido', 'refazerPlanilha'] }),

    cena('Os atalhos gerais do Office em português valem no Excel. Negrito é Ctrl+N. Salvar é Ctrl+B. Abrir é Ctrl+A. Novo é Ctrl+O. Selecionar tudo é Ctrl+T. E localizar é Ctrl+L.',
      { tipo: 'teclas', titulo: 'Os atalhos gerais também valem', acoes: ['negrito', 'salvar', 'abrir', 'novo', 'selecionarTudo', 'localizar'] }),

    cena('Uma exceção: refazer. No Word em português, refazer é Ctrl+R. No Excel, refazer é Ctrl+Y, e Ctrl+R faz outra coisa: preenche a célula com o conteúdo da célula à esquerda.',
      { tipo: 'pegadinha', titulo: 'Refazer não é igual no Word e no Excel', texto: 'Word em português: refazer é Ctrl+R. Excel: refazer é Ctrl+Y, e Ctrl+R preenche à direita.' }),

    cena('Resumo. Fórmula começa com igual. Dois-pontos é até, ponto e vírgula é e. O cifrão trava a referência, e F4 alterna os tipos. No Excel, um número sozinho arrastado pela alça é copiado. E Filtro e Classificar ficam na guia Dados.',
      { tipo: 'lista', titulo: 'Resumo da aula', itens: ['Fórmula começa com =', 'A1:B3 é de A1 até B3. A1;B3 é A1 e B3', '$ trava a referência; F4 alterna os tipos', 'Outra planilha no Excel: Planilha2!A1', 'Alça: no Excel, um número sozinho é copiado', 'Guia Dados: Classificar, Filtro e Validação de Dados'] },
      'Resumo. Fórmula começa com igual. Dois-pontos é até, ponto e vírgula é e. O cifrão trava a referência, e F4 alterna os tipos. No Excel, um número sozinho arrastado pela alça é copiado. E Filtro e Classificar ficam na guia Dados.'),

    // ---------- como cai na prova ----------
    cena('Agora três questões no estilo das bancas. Pause depois do enunciado, resolva com calma e confira a resposta.',
      { tipo: 'secao', titulo: 'Como cai na prova', itens: ['3 questões', 'Pause o vídeo antes de ver a resposta'] }),

    ...pergunta({
      enunciado: 'Em uma planilha do Excel 2019, a célula C1 contém a fórmula =A1*$B$1. Ao copiar essa fórmula para a célula C2, o conteúdo de C2 será:',
      alternativas: ['=A1*$B$1', '=A2*$B$2', '=A2*$B$1', '=B1*$B$1', '=A2*B2'],
      correta: 2,
      comentario: 'A1 é relativa e vira A2. $B$1 é absoluta e não muda.',
      falaPergunta: 'Primeira questão. A célula C1 contém a fórmula =A1*$B$1. Ao copiar essa fórmula para a célula C2, qual será o conteúdo de C2? Pause e resolva.',
      falaResposta: 'Resposta: letra C. A referência A1 é relativa e, descendo uma linha, vira A2. Já a referência com os dois cifrões é absoluta e continua apontando para B1.',
    }),

    ...pergunta({
      enunciado: 'No Excel 2019, o resultado da fórmula =10+2*3^2 é:',
      alternativas: ['28', '46', '108', '324', '1296'],
      correta: 0,
      comentario: 'Primeiro a potência (3^2 = 9), depois a multiplicação (2*9 = 18), por último a soma (10+18 = 28).',
      falaPergunta: 'Segunda questão. No Excel 2019, qual é o resultado da fórmula =10+2*3^2? Pause e faça a conta na ordem certa.',
      falaResposta: 'Resposta: letra A, vinte e oito. Primeiro a potência: três ao quadrado, nove. Depois a multiplicação: duas vezes nove, dezoito. Por último a soma: dez mais dezoito.',
    }),

    ...pergunta({
      enunciado: 'No Excel 2019, o recurso que mantém a linha de títulos visível enquanto o usuário rola a planilha para baixo é:',
      alternativas: [
        'Filtro, na guia Dados.',
        'Congelar Painéis, na guia Exibir.',
        'Mesclar e Centralizar, na guia Página Inicial.',
        'Área de Impressão, na guia Layout da Página.',
        'Validação de Dados, na guia Dados.',
      ],
      correta: 1,
      comentario: 'Congelar Painéis, na guia Exibir, mantém linhas e colunas paradas durante a rolagem.',
      falaPergunta: 'Terceira questão. No Excel 2019, que recurso mantém a linha de títulos visível enquanto o usuário rola a planilha para baixo? Pause e escolha.',
      falaResposta: 'Resposta: letra B, Congelar Painéis, na guia Exibir. O filtro esconde linhas, mesclar junta células e a área de impressão só vale para o papel.',
    }),

    cena('Fim da aula quatro. Na próxima, o Calc, a planilha do LibreOffice. Quase tudo o que você viu hoje vale lá, e é justamente nas poucas diferenças que as questões se concentram. Até lá!',
      { tipo: 'lista', titulo: 'Na próxima aula', itens: ['Aula 5: Calc 7', 'O que é igual ao Excel', 'Referência a outra planilha e alça de preenchimento', 'Menus Planilha e Dados'] }),
  ],
};
