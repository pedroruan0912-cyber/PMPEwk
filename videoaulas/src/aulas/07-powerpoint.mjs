import { cena, pergunta } from './_cenas.mjs';

// Guias do PowerPoint 2019 em português, com os grupos e comandos que aparecem nas telas desta aula.
const PAGINA_INICIAL = [
  { grupo: 'Área de Transferência', itens: ['Colar', 'Recortar', 'Copiar', 'Pincel de Formatação'] },
  { grupo: 'Slides', itens: ['Novo Slide', 'Layout', 'Redefinir', 'Seção'] },
  { grupo: 'Fonte', itens: ['Negrito', 'Itálico', 'Sublinhado', 'Sombra'] },
  { grupo: 'Parágrafo', itens: ['Marcadores', 'Numeração', 'Centralizar'] },
  { grupo: 'Desenho', itens: ['Formas', 'Organizar', 'Estilos Rápidos'] },
  { grupo: 'Edição', itens: ['Localizar', 'Substituir', 'Selecionar'] },
];
const INSERIR = [
  { grupo: 'Slides', itens: ['Novo Slide'] },
  { grupo: 'Tabelas', itens: ['Tabela'] },
  { grupo: 'Imagens', itens: ['Imagens', 'Instantâneo', 'Álbum de Fotografias'] },
  { grupo: 'Ilustrações', itens: ['Formas', 'Ícones', 'SmartArt', 'Gráfico'] },
  { grupo: 'Links', itens: ['Zoom', 'Link', 'Ação'] },
  { grupo: 'Texto', itens: ['Caixa de Texto', 'Cabeçalho e Rodapé', 'WordArt', 'Número do Slide'] },
  { grupo: 'Mídia', itens: ['Vídeo', 'Áudio', 'Gravação de Tela'] },
];
const DESIGN = [
  { grupo: 'Temas', itens: ['Temas'] },
  { grupo: 'Variantes', itens: ['Variantes'] },
  { grupo: 'Personalizar', itens: ['Tamanho do Slide', 'Formatar Plano de Fundo'] },
];
const TRANSICOES = [
  { grupo: 'Visualização', itens: ['Visualizar'] },
  { grupo: 'Transição para este Slide', itens: ['Nenhuma', 'Transformar', 'Esmaecer', 'Empurrão', 'Revelar', 'Opções de Efeito'] },
  { grupo: 'Intervalo', itens: ['Som', 'Duração', 'Aplicar a Todos', 'Ao Clicar com o Mouse', 'Após'] },
];
const ANIMACOES = [
  { grupo: 'Animação', itens: ['Aparecer', 'Esmaecer', 'Surgir', 'Opções de Efeito'] },
  { grupo: 'Animação Avançada', itens: ['Adicionar Animação', 'Painel de Animação', 'Disparar', 'Pincel de Animação'] },
  { grupo: 'Intervalo', itens: ['Iniciar', 'Duração', 'Atraso', 'Reordenar Animação'] },
];
const APRESENTACAO = [
  { grupo: 'Iniciar Apresentação de Slides', itens: ['Do Começo', 'Do Slide Atual', 'Apresentação de Slides Personalizada'] },
  { grupo: 'Configurar', itens: ['Configurar Apresentação de Slides', 'Ocultar Slide', 'Testar Intervalos', 'Gravar Apresentação de Slides'] },
  { grupo: 'Monitores', itens: ['Usar Modo de Exibição do Apresentador'] },
];
const EXIBIR = [
  { grupo: 'Modos de Exibição de Apresentação', itens: ['Normal', 'Estrutura de Tópicos', 'Classificação de Slides', 'Página de Anotações', 'Modo de Exibição de Leitura'] },
  { grupo: 'Modos de Exibição Mestres', itens: ['Slide Mestre', 'Folheto Mestre', 'Anotações Mestras'] },
  { grupo: 'Mostrar', itens: ['Régua', 'Linhas de Grade', 'Guias'] },
];

const ppt = (aba, itens, destaque, balao) => ({ tipo: 'janela', app: 'powerpoint', aba, itens, ...(destaque ? { destaque } : {}), ...(balao ? { balao } : {}) });

export default {
  n: 7,
  slug: 'powerpoint',
  titulo: 'PowerPoint 2019',
  cenas: [
    cena('Aula sete: o PowerPoint 2019, o programa de apresentações do Office. Você vai ver o que é slide, layout e slide mestre, a diferença entre transição e animação, os modos de exibição, como iniciar a apresentação e os atalhos.',
      { tipo: 'capa', titulo: 'PowerPoint 2019', subtitulo: 'Slides, layouts, slide mestre, transições, animações, modos de exibição e atalhos' }),

    cena('O roteiro. Primeiro os conceitos e os tipos de arquivo. Depois as guias, na ordem: Página Inicial, Inserir, Design, Transições, Animações, Apresentação de Slides e Exibir. O PowerPoint tem três guias que só existem nele.',
      { tipo: 'lista', titulo: 'O que você vai ver nesta aula', itens: ['Slide, layout e tipos de arquivo', 'Página Inicial e Inserir', 'Design e slide mestre', 'Transições e animações', 'Apresentação de Slides', 'Modos de exibição e atalhos'] }),

    // ---------- conceitos ----------
    cena('O arquivo do PowerPoint é a apresentação, formada por slides. Cada slide tem um layout, que é a disposição dos espaços reservados: as caixas pontilhadas onde entram o título, o texto, a imagem ou o gráfico.',
      { tipo: 'secao', titulo: 'Conceitos', itens: ['Apresentação', 'Slide', 'Layout', 'Espaço reservado'] }),

    cena('As extensões. A padrão é .pptx, que abre para edição. A .ppsx abre direto no modo de apresentação. A .potx é o modelo. E a .ppt é o formato antigo, até a versão 2003. O PowerPoint também exporta para PDF e para vídeo.',
      { tipo: 'lista', titulo: 'Os arquivos do PowerPoint', itens: ['.pptx: a apresentação, abre para editar', '.ppsx: abre direto no modo de apresentação', '.potx: modelo de apresentação', '.ppt: formato antigo, até a versão 2003', 'Exporta também para PDF e para vídeo'] }),

    // ---------- Página Inicial ----------
    cena('Na guia Página Inicial, o grupo que só existe no PowerPoint é o grupo Slides. O botão Novo Slide insere um slide logo depois do slide selecionado. O atalho é Ctrl+M.',
      ppt('Página Inicial', PAGINA_INICIAL, 'Novo Slide', 'Insere um slide depois do slide selecionado. Atalho: Ctrl+M.')),

    cena('O botão Layout troca a disposição do slide selecionado. O conteúdo que já existe é mantido e se reorganiza nos novos espaços reservados.',
      ppt('Página Inicial', PAGINA_INICIAL, 'Layout', 'Layout é a disposição dos espaços reservados: onde ficam o título, o texto e as imagens.')),

    cena('Os layouts mais usados. Slide de Título, com título e subtítulo, é o do primeiro slide. Título e Conteúdo é o mais comum. Há ainda Duas Partes de Conteúdo, Comparação, Somente Título e Em Branco.',
      { tipo: 'lista', titulo: 'Layouts mais usados', itens: ['Slide de Título: título e subtítulo', 'Título e Conteúdo: o mais comum', 'Duas Partes de Conteúdo', 'Comparação', 'Somente Título', 'Em Branco'] }),

    cena('Redefinir devolve os espaços reservados do slide à posição, ao tamanho e à formatação originais do layout. É o que se usa quando alguém arrastou as caixas e bagunçou o slide.',
      ppt('Página Inicial', PAGINA_INICIAL, 'Redefinir', 'Volta posição, tamanho e formatação dos espaços reservados ao padrão do layout.')),

    cena('E Seção agrupa os slides em blocos com nome, como capítulos. Serve para organizar apresentações longas. As seções aparecem no painel de miniaturas e podem ser recolhidas.',
      ppt('Página Inicial', PAGINA_INICIAL, 'Seção', 'Agrupa slides em blocos com nome, para organizar apresentações longas.')),

    // ---------- Inserir ----------
    cena('A guia Inserir tem o que você já conhece do Word, como tabela, imagens, formas, SmartArt e gráfico, e mais três coisas próprias de apresentações: ações, número do slide e mídia.',
      { tipo: 'secao', titulo: 'Guia Inserir', itens: ['Tabelas e imagens', 'Ilustrações', 'Links e ações', 'Texto e número do slide', 'Mídia'] }),

    cena('O número do slide fica na guia Inserir, no grupo Texto, ao lado de Cabeçalho e Rodapé. Ele não fica na guia Design nem na guia Apresentação de Slides, que são as alternativas erradas mais comuns.',
      ppt('Inserir', INSERIR, 'Número do Slide', 'Guia Inserir, grupo Texto, junto com Cabeçalho e Rodapé.')),

    cena('No grupo Links, o botão Ação faz um objeto reagir ao clique do mouse: ir para outro slide, abrir um arquivo ou uma página da internet. É com ele que se cria um botão de navegação.',
      ppt('Inserir', INSERIR, 'Ação', 'Define o que acontece ao clicar no objeto: ir a outro slide, abrir arquivo ou site.')),

    cena('E o grupo Mídia insere vídeo, áudio e gravação de tela no slide. A gravação de tela grava o que você faz no computador e já coloca o vídeo dentro da apresentação.',
      ppt('Inserir', INSERIR, 'Vídeo', 'Grupo Mídia: vídeo, áudio e gravação de tela.')),

    // ---------- Design e mestre ----------
    cena('A guia Design cuida da aparência geral. Tema é um conjunto de cores, fontes e efeitos. Ao aplicar um tema, todos os slides mudam de uma vez. As variantes são versões de cor do mesmo tema.',
      { tipo: 'secao', titulo: 'Guia Design e slide mestre', itens: ['Temas', 'Variantes', 'Tamanho do Slide', 'Slide Mestre'] }),

    cena('No grupo Personalizar ficam o tamanho do slide e o plano de fundo. O tamanho pode ser padrão, na proporção quatro por três, ou widescreen, dezesseis por nove. No PowerPoint 2019, uma apresentação nova já nasce em widescreen.',
      ppt('Design', DESIGN, 'Tamanho do Slide', 'Padrão (4:3) ou Widescreen (16:9). No PowerPoint 2019, o padrão é Widescreen.'),
      'No grupo Personalizar ficam o tamanho do slide e o plano de fundo. O tamanho pode ser padrão, na proporção quatro por três, ou uaidscrín, dezesseis por nove. No PowerPoint 2019, uma apresentação nova já nasce em uaidscrín.'),

    cena('O slide mestre guarda tudo o que se repete nos slides: fontes, cores, plano de fundo, posição dos espaços reservados e elementos fixos, como um logotipo. Mudou o mestre, mudam todos os slides baseados nele.',
      ppt('Exibir', EXIBIR, 'Slide Mestre', 'Guarda o que se repete em todos os slides: fontes, cores, plano de fundo e logotipo.')),

    cena('Atenção ao lugar. O Slide Mestre fica na guia Exibir, no grupo Modos de Exibição Mestres, e não na guia Design. No mesmo grupo estão o Folheto Mestre e as Anotações Mestras.',
      { tipo: 'pegadinha', titulo: 'O Slide Mestre fica na guia Exibir', texto: 'Exibir > Modos de Exibição Mestres > Slide Mestre. Não fica em Design. Para pôr um logotipo em todos os slides de uma vez, é nele.' }),

    cena('A guia Exibir também troca o modo de exibição. A Classificação de Slides mostra todos os slides em miniatura, lado a lado. É o modo mais prático para reordenar, copiar e excluir slides.',
      ppt('Exibir', EXIBIR, 'Classificação de Slides', 'Miniaturas lado a lado, para reordenar, copiar e excluir slides.')),

    cena('São cinco modos. Normal é o de edição, com as miniaturas à esquerda. Estrutura de Tópicos mostra só o texto. Classificação de Slides mostra as miniaturas. Página de Anotações mostra o slide com as notas do orador. E o Modo de Leitura apresenta dentro da janela.',
      { tipo: 'lista', titulo: 'Os modos de exibição', itens: ['Normal: miniaturas à esquerda e o slide no centro', 'Estrutura de Tópicos: só o texto dos slides', 'Classificação de Slides: miniaturas para reordenar', 'Página de Anotações: o slide e as notas do orador', 'Modo de Exibição de Leitura: apresenta dentro da janela'] }),

    // ---------- transições e animações ----------
    cena('Agora a diferença mais cobrada do PowerPoint. Transição é o efeito na passagem de um slide para o outro. Animação é o efeito aplicado a um objeto dentro do slide, como um texto ou uma imagem. Cada uma tem a sua guia.',
      { tipo: 'lista', titulo: 'Transição não é animação', itens: ['Transição: efeito na troca de um slide por outro', 'Animação: efeito em um objeto dentro do slide', 'Transição se aplica ao slide inteiro', 'Animação se aplica a texto, imagem, forma ou gráfico', 'Cada uma tem a sua própria guia'] }),

    cena('Na guia Transições, você escolhe o efeito na galeria e ajusta som e duração. O botão Aplicar a Todos copia a transição do slide atual para todos os slides da apresentação.',
      ppt('Transições', TRANSICOES, 'Aplicar a Todos', 'Copia a transição do slide atual para todos os slides.')),

    cena('Ainda no grupo Intervalo fica o avanço do slide. Ao Clicar com o Mouse é o avanço manual. A opção Após define um tempo, e o slide passa sozinho quando ele termina. As duas podem ficar marcadas juntas.',
      ppt('Transições', TRANSICOES, 'Após', 'Avanço automático depois do tempo marcado. Ao Clicar com o Mouse é o avanço manual.')),

    cena('Na guia Animações, você seleciona um objeto e escolhe o efeito. O Painel de Animação lista todas as animações do slide, na ordem em que acontecem, e permite mudar essa ordem.',
      ppt('Animações', ANIMACOES, 'Painel de Animação', 'Lista as animações do slide na ordem em que acontecem e permite reordenar.')),

    cena('São quatro tipos de animação. Entrada faz o objeto aparecer. Ênfase chama a atenção para um objeto que já está no slide. Saída faz o objeto sumir. E a trajetória faz o objeto percorrer um caminho.',
      { tipo: 'lista', titulo: 'Os quatro tipos de animação', itens: ['Entrada: o objeto aparece no slide', 'Ênfase: destaca um objeto que já está no slide', 'Saída: o objeto some do slide', 'Trajetórias de Animação: o objeto percorre um caminho'] }),

    cena('O Pincel de Animação copia a animação de um objeto para outro, do mesmo jeito que o Pincel de Formatação copia a formatação. E Adicionar Animação coloca mais de um efeito no mesmo objeto.',
      ppt('Animações', ANIMACOES, 'Pincel de Animação', 'Copia a animação de um objeto para outro.')),

    cena('O campo Iniciar define quando a animação começa. Ao Clicar espera o clique. Com o Anterior começa junto com a animação de antes. E Após o Anterior começa quando a de antes termina.',
      ppt('Animações', ANIMACOES, 'Iniciar', 'Ao Clicar, Com o Anterior ou Após o Anterior.')),

    // ---------- Apresentação de Slides ----------
    cena('A guia Apresentação de Slides controla a exibição para a plateia. No primeiro grupo você escolhe por onde começar: do primeiro slide ou do slide que está selecionado.',
      { tipo: 'secao', titulo: 'Guia Apresentação de Slides', itens: ['Do Começo', 'Do Slide Atual', 'Ocultar Slide', 'Testar Intervalos', 'Modo do Apresentador'] }),

    cena('Do Começo inicia a apresentação no primeiro slide. Do Slide Atual inicia no slide selecionado. Esta dupla, com os seus atalhos, é a pergunta mais comum sobre o PowerPoint.',
      ppt('Apresentação de Slides', APRESENTACAO, 'Do Slide Atual', 'Começa no slide selecionado. Do Começo sempre parte do primeiro slide.')),

    cena('As teclas. F5 inicia do primeiro slide. Shift+F5 inicia do slide atual. Esc encerra a apresentação. Durante a exibição, a tecla ponto deixa a tela preta e a tecla vírgula deixa a tela branca.',
      { tipo: 'teclas', titulo: 'Durante a apresentação', acoes: ['inicioApresentacao', 'slideAtual', 'encerrar', 'telaPreta', 'telaBranca'] }),

    cena('Ocultar Slide mantém o slide no arquivo, mas ele não aparece durante a apresentação. O slide não é excluído. Na edição, ele continua lá, com o número riscado.',
      ppt('Apresentação de Slides', APRESENTACAO, 'Ocultar Slide', 'O slide fica no arquivo, mas é pulado durante a apresentação.')),

    cena('Testar Intervalos serve para ensaiar. Você passa a apresentação, e o PowerPoint grava quanto tempo ficou em cada slide. Depois, esses tempos podem ser usados para o avanço automático.',
      ppt('Apresentação de Slides', APRESENTACAO, 'Testar Intervalos', 'Ensaia a apresentação e grava o tempo gasto em cada slide.')),

    cena('No Modo de Exibição do Apresentador, com dois monitores, a plateia vê só o slide. Na tela do orador aparecem o slide atual, o próximo slide, as anotações e um cronômetro.',
      ppt('Apresentação de Slides', APRESENTACAO, 'Usar Modo de Exibição do Apresentador', 'O orador vê o slide atual, o próximo, as anotações e o tempo. A plateia vê só o slide.')),

    cena('Anotações são o texto de apoio do orador, digitado abaixo do slide. A plateia não vê. E folheto é a impressão com vários slides por página, para distribuir. O folheto é escolhido na hora de imprimir.',
      { tipo: 'lista', titulo: 'Anotações e folhetos', itens: ['Anotações: texto de apoio do orador, abaixo do slide', 'A plateia não vê as anotações', 'Folheto: impressão com vários slides por página', 'O folheto é escolhido em Arquivo > Imprimir'] }),

    cena('Na guia Arquivo, o comando Exportar transforma a apresentação em outros formatos. Dá para criar um PDF, criar um vídeo com as transições, as animações e os tempos gravados, e criar folhetos no Word.',
      ppt('Arquivo', ['Informações', 'Novo', 'Abrir', 'Salvar', 'Salvar como', 'Imprimir', 'Compartilhar', 'Exportar', 'Fechar', 'Opções'], 'Exportar', 'Criar PDF, criar um vídeo da apresentação ou criar folhetos no Word.')),

    cena('E em Arquivo, Imprimir, você escolhe o que vai para o papel. Slides em página inteira, um por folha. Anotações, com o slide e as notas do orador. Estrutura de tópicos, só com os textos. Ou folhetos, com vários slides por página.',
      { tipo: 'lista', titulo: 'O que se pode imprimir', itens: ['Slides em Página Inteira: um slide por folha', 'Anotações: o slide e as notas do orador', 'Estrutura de Tópicos: só os textos', 'Folhetos: de 1 a 9 slides por página'] }),

    cena('Os atalhos gerais do Office em português valem aqui. Novo slide é Ctrl+M. Nova apresentação é Ctrl+O. Abrir é Ctrl+A. Salvar é Ctrl+B. Negrito é Ctrl+N. E selecionar tudo é Ctrl+T.',
      { tipo: 'teclas', titulo: 'Atalhos na edição', acoes: ['novoSlide', 'novo', 'abrir', 'salvar', 'negrito', 'selecionarTudo'] }),

    cena('Resumo. Layout é a disposição do slide. Slide mestre fica na guia Exibir. Transição é entre slides, e animação é dentro do slide. F5 começa do início e Shift+F5 começa do slide atual. E número do slide fica na guia Inserir.',
      { tipo: 'lista', titulo: 'Resumo da aula', itens: ['.pptx edita; .ppsx abre apresentando', 'Layout: disposição dos espaços reservados', 'Slide Mestre: guia Exibir', 'Transição: entre slides. Animação: objetos do slide', 'F5: do começo. Shift+F5: do slide atual', 'Número do Slide: guia Inserir, grupo Texto'] }),

    // ---------- como cai na prova ----------
    cena('Três questões no estilo das bancas sobre o PowerPoint. Pause depois de cada enunciado e escolha a sua alternativa.',
      { tipo: 'secao', titulo: 'Como cai na prova', itens: ['3 questões', 'Pause o vídeo antes de ver a resposta'] }),

    ...pergunta({
      enunciado: 'No PowerPoint 2019, durante a edição, o usuário seleciona o slide 5 e pressiona Shift+F5. Nesse caso:',
      alternativas: [
        'a apresentação é iniciada no primeiro slide.',
        'a apresentação é iniciada no slide 5.',
        'um novo slide é inserido depois do slide 5.',
        'o slide 5 é ocultado da apresentação.',
        'a apresentação é salva.',
      ],
      correta: 1,
      comentario: 'Shift+F5 inicia a apresentação no slide atual. F5, sozinha, inicia no primeiro slide.',
      falaPergunta: 'Primeira questão. No PowerPoint 2019, durante a edição, o usuário seleciona o slide cinco e pressiona Shift+F5. O que acontece? Pause e escolha.',
      falaResposta: 'Resposta: letra B. Shift+F5 inicia a apresentação no slide atual, que aqui é o slide cinco. A letra A descreve a tecla F5 sozinha.',
    }),

    ...pergunta({
      enunciado: 'No PowerPoint 2019, o efeito visual que ocorre na passagem de um slide para o slide seguinte é chamado de:',
      alternativas: ['animação de entrada.', 'transição.', 'layout.', 'slide mestre.', 'tema.'],
      correta: 1,
      comentario: 'Transição é o efeito entre slides. Animação é o efeito em um objeto dentro do slide.',
      falaPergunta: 'Segunda questão. No PowerPoint 2019, como se chama o efeito visual que ocorre na passagem de um slide para o slide seguinte? Pause e escolha.',
      falaResposta: 'Resposta: letra B, transição. A animação de entrada, da letra A, é um efeito aplicado a um objeto dentro do slide, e não à troca de slides.',
    }),

    ...pergunta({
      enunciado: 'No PowerPoint 2019, para inserir de uma só vez o logotipo de uma instituição em todos os slides de uma apresentação, o recurso mais indicado é:',
      alternativas: [
        'o Slide Mestre, na guia Exibir.',
        'o Pincel de Animação, na guia Animações.',
        'a Classificação de Slides, na guia Exibir.',
        'o comando Ocultar Slide, na guia Apresentação de Slides.',
        'o comando Redefinir, na guia Página Inicial.',
      ],
      correta: 0,
      comentario: 'O que é colocado no slide mestre aparece em todos os slides baseados nele.',
      falaPergunta: 'Terceira questão. No PowerPoint 2019, qual é o recurso mais indicado para inserir, de uma só vez, o logotipo de uma instituição em todos os slides? Pause e escolha.',
      falaResposta: 'Resposta: letra A, o Slide Mestre, na guia Exibir. Tudo o que você coloca no slide mestre aparece em todos os slides baseados nele.',
    }),

    cena('Fim da aula sete. Na próxima, o Impress, o programa de apresentações do LibreOffice. Os conceitos são os mesmos; mudam os menus, alguns nomes e pouquíssimos atalhos. Até lá!',
      { tipo: 'lista', titulo: 'Na próxima aula', itens: ['Aula 8: Impress 7', 'Menus Slide e Apresentação de slides', 'Slide mestre, transição e animação', 'O que é igual e o que muda'] }),
  ],
};
