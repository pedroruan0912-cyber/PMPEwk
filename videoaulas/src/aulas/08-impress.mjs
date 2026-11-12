import { cena, pergunta } from './_cenas.mjs';

// Menus do LibreOffice Impress 7 em português, com os comandos que aparecem nas telas desta aula.
const ARQUIVO = ['Novo', 'Abrir...', 'Documentos recentes', 'Fechar', 'Modelos', 'Salvar', 'Salvar como...', 'Exportar...', 'Exportar como', 'Imprimir...', 'Propriedades...', 'Sair do LibreOffice'];
const EXIBIR = ['Normal', 'Estrutura de tópicos', 'Notas', 'Organizador de slides', 'Slide mestre', 'Notas mestre', 'Folheto mestre', 'Barras de ferramentas', 'Painel de slides', 'Réguas', 'Barra lateral', 'Transição de slides', 'Animação', 'Navegador', 'Zoom'];
const INSERIR = ['Figura...', 'Áudio ou vídeo...', 'Gráfico...', 'Tabela...', 'Forma', 'Fontwork...', 'Caixa de texto', 'Hiperlink...', 'Caractere especial...', 'Número do slide', 'Campo', 'Cabeçalho e rodapé...'];
const SLIDE = ['Novo slide', 'Duplicar slide', 'Layout', 'Excluir slide', 'Propriedades do slide...', 'Alterar slide mestre...', 'Novo mestre', 'Ocultar slide', 'Renomear slide', 'Ir para slide', 'Resumo de slides', 'Transição de slides'];
const APRESENTACAO = ['Iniciar no primeiro slide', 'Iniciar do slide atual', 'Cronometrar', 'Apresentação de slides personalizada...', 'Impress Remote', 'Configurações da apresentação de slides...'];
// Interação fica direto no menu Formatar; Animação e Transição de slides, em Exibir (menus do código-fonte do LibreOffice 7.6).
const FORMATAR = ['Texto', 'Espaçamento', 'Alinhar texto', 'Listas', 'Limpar formatação direta', 'Caractere...', 'Parágrafo...', 'Marcadores e numeração...', 'Tabela', 'Imagem', 'Interação...', 'Nome...', 'Espelhar', 'Dispor'];

const impress = (aba, itens, destaque, balao) => ({ tipo: 'janela', app: 'impress', aba, itens, ...(destaque ? { destaque } : {}), ...(balao ? { balao } : {}) });

export default {
  n: 8,
  slug: 'impress',
  titulo: 'Impress 7',
  cenas: [
    cena('Aula oito: o Impress, o programa de apresentações do LibreOffice. Os conceitos são os mesmos do PowerPoint: slide, layout, slide mestre, transição e animação. O que muda é onde ficam os comandos e como alguns deles se chamam.',
      { tipo: 'capa', titulo: 'Impress 7', subtitulo: 'As apresentações do LibreOffice: menus, barra lateral, nomes que mudam e atalhos' }),

    cena('O roteiro. Primeiro, o que é igual ao PowerPoint e como é a janela do Impress. Depois, os dois menus que só existem nele: Slide e Apresentação de slides. Em seguida, os modos de exibição, a transição, a animação e os atalhos.',
      { tipo: 'lista', titulo: 'O que você vai ver nesta aula', itens: ['O que é igual ao PowerPoint', 'A janela do Impress', 'Menu Slide', 'Modos de exibição e slide mestre', 'Transição e animação', 'Menu Apresentação de slides e atalhos'] }),

    cena('A base. O PowerPoint usa faixa de opções e salva em .pptx. O Impress usa barra de menus e barra lateral, e salva em .odp. O modelo do PowerPoint é .potx; o do Impress é .otp. E os atalhos gerais do Impress seguem o inglês.',
      { tipo: 'compara', titulo: 'PowerPoint e Impress: a base', office: ['Faixa de opções com guias', 'Extensão padrão: .pptx', 'Modelo: .potx', 'Atalhos adaptados ao português'], libre: ['Barra de menus e barra lateral', 'Extensão padrão: .odp', 'Modelo: .otp', 'Atalhos com iniciais do inglês'] }),

    cena('O que é igual. A apresentação é formada por slides. Cada slide tem um layout. Existe slide mestre. Transição é entre slides, e animação é nos objetos. E as teclas para apresentar e para inserir slide são as mesmas.',
      { tipo: 'lista', titulo: 'O que é igual nos dois', itens: ['A apresentação é formada por slides', 'Layouts com espaços reservados', 'Slide mestre para o que se repete', 'Transição entre slides; animação nos objetos', 'F5 e Shift+F5 iniciam a apresentação', 'Ctrl+M insere um novo slide'] }),

    cena('A janela do Impress tem três áreas. À esquerda, o painel de slides, com as miniaturas. No centro, o slide em edição. À direita, a barra lateral, com propriedades, transição e animação. Ao abrir o programa, ele já oferece a escolha de um modelo.',
      { tipo: 'lista', titulo: 'A janela do Impress', itens: ['Painel de slides, à esquerda: as miniaturas', 'Área de trabalho, no centro: o slide em edição', 'Barra lateral, à direita: propriedades, transição e animação', 'Barra de menus e barras de ferramentas, no alto', 'Ao abrir, o Impress oferece a escolha de um modelo'] }),

    // ---------- menu Slide ----------
    cena('O Impress tem dez menus. Oito você já conhece do Writer e do Calc. Dois são exclusivos das apresentações: o menu Slide e o menu Apresentação de slides. É neles que as questões se concentram.',
      { tipo: 'secao', titulo: 'Os menus do Impress', itens: ['Arquivo', 'Editar', 'Exibir', 'Inserir', 'Formatar', 'Slide', 'Apresentação de slides', 'Ferramentas'] }),

    cena('O menu Slide reúne tudo o que se faz com o slide inteiro. O primeiro comando é Novo slide, que insere um slide depois do atual. O atalho é o mesmo do PowerPoint: Ctrl+M.',
      impress('Slide', SLIDE, 'Novo slide', 'Insere um slide depois do slide atual. Atalho: Ctrl+M, igual ao do PowerPoint.')),

    cena('Duplicar slide cria uma cópia do slide selecionado, logo depois dele, com o mesmo conteúdo e a mesma formatação. É o caminho mais rápido quando o próximo slide é parecido com o atual.',
      impress('Slide', SLIDE, 'Duplicar slide', 'Cria uma cópia idêntica logo depois do slide selecionado.')),

    cena('Layout troca a disposição dos espaços reservados do slide, como no PowerPoint. Os mesmos layouts aparecem também na barra lateral, no painel Propriedades.',
      impress('Slide', SLIDE, 'Layout', 'A disposição de título, texto e objetos. Também está na barra lateral, em Propriedades.')),

    cena('Os layouts do Impress têm nomes um pouco diferentes dos do PowerPoint, mas a ideia é a mesma. Os mais usados são Slide de título, Título e conteúdo, Título e dois conteúdos, Somente título e Slide em branco.',
      { tipo: 'lista', titulo: 'Layouts mais usados no Impress', itens: ['Slide em branco', 'Slide de título', 'Título, conteúdo', 'Título e 2 conteúdos', 'Somente título', 'Texto centralizado'] }),

    cena('Ocultar slide deixa o slide no arquivo, mas ele é pulado na hora da apresentação. No PowerPoint, o comando com o mesmo nome fica na guia Apresentação de Slides. No Impress, fica no menu Slide.',
      impress('Slide', SLIDE, 'Ocultar slide', 'O slide continua no arquivo, mas não aparece na apresentação.')),

    cena('E Alterar slide mestre troca o mestre aplicado ao slide, mudando o visual sem mexer no conteúdo. No mesmo menu, Novo mestre cria outro slide mestre na apresentação.',
      impress('Slide', SLIDE, 'Alterar slide mestre...', 'Troca o slide mestre aplicado: muda o visual, mantém o conteúdo.')),

    // ---------- exibir ----------
    cena('Vamos ao menu Exibir, que tem os modos de exibição e o acesso ao slide mestre. Os conceitos são os do PowerPoint, mas dois nomes mudam, e são exatamente esses dois que caem.',
      { tipo: 'secao', titulo: 'Slide mestre e modos de exibição', itens: ['Normal', 'Estrutura de tópicos', 'Notas', 'Organizador de slides', 'Slide mestre'] }),

    cena('O slide mestre guarda o que se repete em todos os slides: plano de fundo, fontes, cores e elementos fixos. Para editá-lo, o caminho é Exibir, Slide mestre. Aqui o Impress e o PowerPoint coincidem: nos dois, o mestre fica em Exibir.',
      impress('Exibir', EXIBIR, 'Slide mestre', 'Edita o que se repete em todos os slides. Fica em Exibir, como no PowerPoint.')),

    cena('O Organizador de slides mostra as miniaturas de todos os slides, lado a lado, para reordenar, copiar e excluir. É o que o PowerPoint chama de Classificação de Slides.',
      impress('Exibir', EXIBIR, 'Organizador de slides', 'É a Classificação de Slides do PowerPoint.')),

    cena('O modo Notas mostra o slide com o espaço das notas do orador logo abaixo. No PowerPoint, o nome é Página de Anotações. Como lá, a plateia não vê essas notas.',
      impress('Exibir', EXIBIR, 'Notas', 'É a Página de Anotações do PowerPoint: o slide e as notas do orador.')),

    cena('Compare os nomes dos modos. Normal e Estrutura de tópicos são iguais. Classificação de Slides vira Organizador de slides. E Página de Anotações vira Notas.',
      { tipo: 'compara', titulo: 'Modos de exibição: os nomes', office: ['Normal', 'Estrutura de Tópicos', 'Classificação de Slides', 'Página de Anotações'], libre: ['Normal', 'Estrutura de tópicos', 'Organizador de slides', 'Notas'] }),

    // ---------- transição e animação ----------
    cena('Transição e animação têm o mesmo significado do PowerPoint. A diferença é o lugar. No PowerPoint, cada uma tem uma guia. No Impress, cada uma é um painel da barra lateral.',
      { tipo: 'secao', titulo: 'Transição e animação', itens: ['Transição: entre slides', 'Animação: nos objetos', 'Painéis da barra lateral'] }),

    cena('A barra lateral do Impress tem os painéis Propriedades, Transição de slides, Animação e Slides mestres, além de Estilos, Galeria e Navegador. Você troca de painel pelos botões na borda direita.',
      { tipo: 'lista', titulo: 'Painéis da barra lateral do Impress', itens: ['Propriedades: layout e formatação', 'Transição de slides', 'Animação', 'Slides mestres', 'Estilos, Galeria e Navegador'] }),

    cena('O comando Transição de slides, no menu Slide, abre o painel de transições na barra lateral. Lá você escolhe o efeito, a duração, o som e o avanço do slide. Há também o botão para aplicar a transição a todos os slides.',
      impress('Slide', SLIDE, 'Transição de slides', 'Abre o painel de transições na barra lateral. Lá fica Aplicar transição a todos os slides.')),

    cena('O comando Animação fica no menu Exibir e abre o painel de animação. Você seleciona um objeto, clica no botão de adicionar e escolhe o efeito. O painel lista as animações do slide na ordem em que acontecem.',
      impress('Exibir', EXIBIR, 'Animação', 'Menu Exibir. Abre o painel Animação na barra lateral, com a lista de efeitos do slide.')),

    cena('As categorias são as mesmas: entrada, ênfase, saída e caminhos de movimento, que o PowerPoint chama de trajetórias. E o início também: ao clicar, com o anterior ou após o anterior.',
      { tipo: 'lista', titulo: 'Categorias de animação no Impress', itens: ['Entrada: o objeto aparece', 'Ênfase: destaca o objeto', 'Saída: o objeto some', 'Caminhos de movimento: o objeto percorre um trajeto', 'Início: ao clicar, com o anterior ou após o anterior'] }),

    // ---------- Apresentação de slides ----------
    cena('O menu Apresentação de slides controla a exibição para a plateia. Os dois primeiros comandos iniciam a apresentação, e os nomes dizem exatamente de onde.',
      { tipo: 'secao', titulo: 'Menu Apresentação de slides', itens: ['Iniciar no primeiro slide', 'Iniciar do slide atual', 'Cronometrar', 'Configurações'] }),

    cena('Iniciar no primeiro slide é o equivalente ao Do Começo do PowerPoint, e o atalho é a tecla F5.',
      impress('Apresentação de slides', APRESENTACAO, 'Iniciar no primeiro slide', 'Equivale ao Do Começo do PowerPoint. Atalho: F5.')),

    cena('Iniciar do slide atual começa a apresentação no slide selecionado. O atalho é Shift+F5, o mesmo do PowerPoint.',
      impress('Apresentação de slides', APRESENTACAO, 'Iniciar do slide atual', 'Começa no slide selecionado. Atalho: Shift+F5.')),

    cena('As teclas da apresentação são iguais nas duas suítes. F5 inicia do primeiro slide. Shift+F5 inicia do slide atual. Esc encerra. A tecla ponto deixa a tela preta, e a tecla vírgula deixa a tela branca.',
      { tipo: 'teclas', titulo: 'Durante a apresentação', acoes: ['inicioApresentacao', 'slideAtual', 'encerrar', 'telaPreta', 'telaBranca'] }),

    cena('Cronometrar serve para ensaiar: você passa os slides e o Impress registra o tempo de cada um. No PowerPoint, o mesmo recurso se chama Testar Intervalos.',
      impress('Apresentação de slides', APRESENTACAO, 'Cronometrar', 'É o Testar Intervalos do PowerPoint: ensaia e registra o tempo de cada slide.')),

    cena('Fora deste menu, no menu Formatar, fica a Interação. Ela define o que acontece quando alguém clica em um objeto durante a apresentação: ir para outro slide, abrir um documento ou tocar um som. No PowerPoint, o nome é Ação.',
      impress('Formatar', FORMATAR, 'Interação...', 'Menu Formatar. É a Ação do PowerPoint: o que acontece ao clicar no objeto.')),

    cena('Em Configurações da apresentação de slides você define de qual slide começar, se a exibição é em tela cheia ou em janela, se ela se repete sozinha e em qual monitor aparece.',
      impress('Apresentação de slides', APRESENTACAO, 'Configurações da apresentação de slides...', 'Slide inicial, tela cheia ou janela, repetição automática e monitor.')),

    cena('Com dois monitores, o Impress mostra o console do apresentador na tela do orador: o slide atual, o próximo slide, as notas, um relógio e um cronômetro. É o equivalente ao Modo de Exibição do Apresentador.',
      { tipo: 'lista', titulo: 'Console do apresentador', itens: ['Equivale ao Modo de Exibição do Apresentador', 'Mostra o slide atual e o próximo', 'Mostra as notas do orador', 'Tem relógio e cronômetro', 'Aparece na tela do orador quando há dois monitores'] }),

    // ---------- inserir e arquivo ----------
    cena('No menu Inserir ficam figura, áudio ou vídeo, gráfico, tabela, forma e caixa de texto. O número do slide também está aqui, como no PowerPoint, onde fica na guia Inserir.',
      impress('Inserir', INSERIR, 'Número do slide', 'Menu Inserir. No PowerPoint: guia Inserir, grupo Texto.')),

    cena('E o Fontwork cria textos decorativos, com curvas, contornos e efeitos. É o equivalente ao WordArt do Office, e existe também no Writer e no Calc.',
      impress('Inserir', INSERIR, 'Fontwork...', 'É o WordArt do LibreOffice: texto decorativo.')),

    cena('No menu Arquivo, o Impress abre e salva apresentações do PowerPoint, no formato .pptx, mas por padrão salva em .odp. O PDF, como nos outros programas do LibreOffice, fica em Exportar como.',
      impress('Arquivo', ARQUIVO, 'Exportar como', 'Exportar como PDF fica aqui. O Impress também abre e salva .pptx.')),

    cena('Na impressão, o Impress oferece quatro tipos de documento. Slides, com um slide por folha. Folhetos, com vários slides por página. Notas, com o slide e as notas do orador. E Estrutura de tópicos, só com os textos.',
      { tipo: 'lista', titulo: 'O que se pode imprimir no Impress', itens: ['Slides: um slide por folha', 'Folhetos: vários slides por página', 'Notas: o slide e as notas do orador', 'Estrutura de tópicos: só os textos'] }),

    cena('Um quadro para fixar. Classificação de Slides vira Organizador de slides. Página de Anotações vira Notas. Testar Intervalos vira Cronometrar. Ação vira Interação. E Modo de Exibição do Apresentador vira Console do apresentador.',
      { tipo: 'compara', titulo: 'O mesmo recurso, nomes diferentes', office: ['Classificação de Slides', 'Página de Anotações', 'Testar Intervalos', 'Ação', 'Modo de Exibição do Apresentador'], libre: ['Organizador de slides', 'Notas', 'Cronometrar', 'Interação', 'Console do apresentador'] }),

    cena('Os atalhos de edição. Novo slide é Ctrl+M nas duas suítes. O resto segue a regra do LibreOffice: nova apresentação é Ctrl+N, abrir é Ctrl+O, salvar é Ctrl+S, negrito é Ctrl+B e selecionar tudo é Ctrl+A.',
      { tipo: 'teclas', titulo: 'Atalhos na edição', acoes: ['novoSlide', 'novo', 'abrir', 'salvar', 'negrito', 'selecionarTudo'] }),

    cena('Repare: nas apresentações, quase nada muda de uma suíte para a outra. F5, Shift+F5, Esc e Ctrl+M são iguais. O que muda são os atalhos gerais, como salvar, abrir, novo e negrito.',
      { tipo: 'pegadinha', titulo: 'Poucas teclas mudam nas apresentações', texto: 'F5, Shift+F5, Esc e Ctrl+M são iguais no PowerPoint e no Impress. Mudam os atalhos gerais: salvar, abrir, novo e negrito.' }),

    cena('Resumo. O Impress salva em .odp. Os comandos de slide ficam no menu Slide, e os de exibição para a plateia, no menu Apresentação de slides. Animação fica em Exibir, e Interação, em Formatar. E guarde os nomes: Organizador de slides, Notas, Cronometrar e Interação.',
      { tipo: 'lista', titulo: 'Resumo da aula', itens: ['Extensão .odp; modelo .otp', 'Menu Slide: novo, duplicar, layout, ocultar', 'Menu Apresentação de slides: iniciar e cronometrar', 'Animação: menu Exibir. Interação: menu Formatar', 'Organizador de slides, Notas e Slide mestre: menu Exibir', 'F5 e Shift+F5: iguais aos do PowerPoint'] }),

    // ---------- como cai na prova ----------
    cena('Três questões no estilo das bancas sobre o Impress. Repare que elas costumam testar justamente os nomes que mudam.',
      { tipo: 'secao', titulo: 'Como cai na prova', itens: ['3 questões', 'Pause o vídeo antes de ver a resposta'] }),

    ...pergunta({
      enunciado: 'No LibreOffice Impress 7, o modo de exibição que mostra as miniaturas de todos os slides, permitindo reordená-los, é chamado de:',
      alternativas: ['Classificação de Slides.', 'Organizador de slides.', 'Estrutura de tópicos.', 'Notas.', 'Slide mestre.'],
      correta: 1,
      comentario: 'No Impress, é o Organizador de slides. Classificação de Slides é o nome usado no PowerPoint.',
      falaPergunta: 'Primeira questão. No Impress 7, como se chama o modo de exibição que mostra as miniaturas de todos os slides e permite reordená-los? Pause e escolha.',
      falaResposta: 'Resposta: letra B, Organizador de slides. A letra A, Classificação de Slides, é o nome do mesmo recurso no PowerPoint. A banca conta com essa confusão.',
    }),

    ...pergunta({
      enunciado: 'No Impress 7, as teclas F5 e Shift+F5 servem, respectivamente, para:',
      alternativas: [
        'iniciar a apresentação no slide atual e no primeiro slide.',
        'iniciar a apresentação no primeiro slide e no slide atual.',
        'abrir o Navegador e iniciar a apresentação.',
        'inserir um novo slide e duplicar o slide atual.',
        'iniciar e encerrar a apresentação.',
      ],
      correta: 1,
      comentario: 'F5 inicia no primeiro slide; Shift+F5, no slide atual. É igual no PowerPoint.',
      falaPergunta: 'Segunda questão. No Impress 7, as teclas F5 e Shift+F5 servem, respectivamente, para quê? Pause e escolha.',
      falaResposta: 'Resposta: letra B. F5 inicia a apresentação no primeiro slide, e Shift+F5 inicia no slide atual. A letra C tenta confundir com o Writer, onde F5 abre o Navegador.',
    }),

    ...pergunta({
      enunciado: 'No Impress 7, o comando que permite ensaiar a apresentação registrando o tempo de exibição de cada slide é:',
      alternativas: [
        'Apresentação de slides > Cronometrar.',
        'Slide > Duplicar slide.',
        'Exibir > Notas.',
        'Formatar > Interação.',
        'Formatar > Clonar formatação.',
      ],
      correta: 0,
      comentario: 'Cronometrar, no menu Apresentação de slides, equivale ao Testar Intervalos do PowerPoint.',
      falaPergunta: 'Terceira questão. No Impress 7, qual comando permite ensaiar a apresentação registrando o tempo de exibição de cada slide? Pause e escolha.',
      falaResposta: 'Resposta: letra A, Apresentação de slides, Cronometrar. É o equivalente ao Testar Intervalos do PowerPoint. Interação, no menu Formatar, define o que acontece ao clicar em um objeto.',
    }),

    cena('Fim da aula oito. Você já percorreu os seis programas. Na última aula, vamos colocar todos os atalhos lado a lado, suíte contra suíte, e repassar as pegadinhas que mais derrubam candidatos. Até lá!',
      { tipo: 'lista', titulo: 'Na próxima aula', itens: ['Aula 9: atalhos lado a lado', 'Arquivo, edição e formatação', 'Teclas de função', 'As pegadinhas clássicas'] }),
  ],
};
