import { cena, pergunta } from './_cenas.mjs';

// Menus do LibreOffice Writer 7 em português, com os comandos que aparecem nas telas desta aula.
const ARQUIVO = ['Novo', 'Abrir...', 'Documentos recentes', 'Fechar', 'Modelos', 'Salvar', 'Salvar como...', 'Salvar uma cópia...', 'Exportar...', 'Exportar como', 'Visualizar impressão', 'Imprimir...', 'Propriedades...', 'Sair do LibreOffice'];
const EDITAR = ['Desfazer', 'Refazer', 'Cortar', 'Copiar', 'Colar', 'Colar especial', 'Selecionar tudo', 'Localizar...', 'Localizar e substituir...', 'Registrar alterações', 'Anotação...', 'Hiperlink...'];
const EXIBIR = ['Normal', 'Web', 'Interface do usuário', 'Barras de ferramentas', 'Barra de status', 'Réguas', 'Marcas de formatação', 'Barra lateral', 'Estilos', 'Galeria', 'Navegador', 'Tela inteira', 'Zoom'];
const INSERIR = ['Quebra de página', 'Figura...', 'Gráfico...', 'Forma', 'Caixa de texto', 'Anotação', 'Hiperlink...', 'Caractere especial...', 'Nota de rodapé e nota de fim', 'Sumário e índice', 'Número da página', 'Campo', 'Cabeçalho e rodapé'];
const FORMATAR = ['Texto', 'Espaçamento', 'Alinhar', 'Listas', 'Clonar formatação', 'Limpar formatação direta', 'Caractere...', 'Parágrafo...', 'Marcadores e numeração...', 'Estilo de página...', 'Colunas...', "Marca d'água..."];
const ESTILOS = ['Estilo de parágrafo padrão', 'Corpo de texto', 'Título', 'Título 1', 'Título 2', 'Citações', 'Editar estilo...', 'Atualizar estilo selecionado', 'Novo estilo a partir da seleção', 'Gerenciar estilos'];
const TABELA = ['Inserir tabela...', 'Inserir', 'Excluir', 'Selecionar', 'Mesclar células', 'Dividir células', 'Dividir tabela', 'Converter', 'Fórmula', 'Ordenar...', 'Propriedades...'];
const FERRAMENTAS = ['Ortografia...', 'Verificação ortográfica automática', 'Dicionário de sinônimos', 'Idioma', 'Contagem de palavras...', 'Autocorreção', 'Autotexto...', 'Assistente de mala direta...', 'Macros', 'Personalizar...', 'Opções...'];

const writer = (aba, itens, destaque, balao) => ({ tipo: 'janela', app: 'writer', aba, itens, ...(destaque ? { destaque } : {}), ...(balao ? { balao } : {}) });

export default {
  n: 3,
  slug: 'writer',
  titulo: 'Writer 7',
  cenas: [
    cena('Aula três: o Writer, editor de texto do LibreOffice. Ele faz o mesmo trabalho do Word, mas os comandos ficam em menus, e os atalhos são outros. Vamos percorrer os menus e marcar cada diferença que costuma virar questão.',
      { tipo: 'capa', titulo: 'Writer 7', subtitulo: 'O editor de texto do LibreOffice: menus, barra lateral, estilos e atalhos' }),

    cena('O Writer tem onze menus, nesta ordem: Arquivo, Editar, Exibir, Inserir, Formatar, Estilos, Tabela, Formulário, Ferramentas, Janela e Ajuda. Repare que Estilos e Tabela têm menu próprio, o que não acontece no Word.',
      { tipo: 'lista', titulo: 'Os onze menus do Writer', itens: ['Arquivo, Editar e Exibir', 'Inserir e Formatar', 'Estilos e Tabela', 'Formulário e Ferramentas', 'Janela e Ajuda'] }),

    cena('Antes dos menus, quatro diferenças de base. O Word usa faixa de opções; o Writer, menus e barras de ferramentas. A fonte padrão do Word é Calibri 11; a do Writer é Liberation Serif 12. O Word salva em .docx; o Writer, em .odt. E os atalhos do Writer seguem o inglês.',
      { tipo: 'compara', titulo: 'Word e Writer: o que muda', office: ['Faixa de opções com guias', 'Fonte padrão: Calibri, tamanho 11', 'Extensão padrão: .docx', 'Atalhos adaptados ao português'], libre: ['Barra de menus e barras de ferramentas', 'Fonte padrão: Liberation Serif, tamanho 12', 'Extensão padrão: .odt', 'Atalhos com iniciais do inglês'] }),

    // ---------- Arquivo ----------
    cena('O menu Arquivo cuida do documento como um todo: criar, abrir, fechar, salvar, exportar e imprimir. É também onde ficam os modelos e as propriedades do documento.',
      { tipo: 'secao', titulo: 'Menu Arquivo', itens: ['Novo e Abrir', 'Salvar e Salvar como', 'Exportar como PDF', 'Imprimir'] }),

    cena('Guarde o comando Exportar como. É nele que estão Exportar como PDF e Exportar diretamente como PDF. No Writer, o PDF não aparece na janela Salvar como. O Writer abre e salva arquivos .docx, mas o formato padrão dele é o .odt.',
      writer('Arquivo', ARQUIVO, 'Exportar como', 'Aqui ficam Exportar como PDF e Exportar diretamente como PDF. O PDF não está em Salvar como.')),

    cena('Os atalhos de arquivo do Writer: Ctrl+N cria um documento novo, Ctrl+O abre, Ctrl+S salva e Ctrl+Shift+S abre o Salvar como. Ctrl+P imprime e Ctrl+Q sai do LibreOffice. Compare com a coluna do Office: quase tudo é diferente.',
      { tipo: 'teclas', titulo: 'Menu Arquivo', acoes: ['novo', 'abrir', 'salvar', 'salvarComo', 'imprimir', 'sair'] }),

    // ---------- Editar e Exibir ----------
    cena('O menu Editar reúne desfazer e refazer, cortar, copiar e colar, selecionar tudo, localizar e substituir. Repare na palavra: o LibreOffice diz Cortar, e o Office diz Recortar.',
      { tipo: 'secao', titulo: 'Menus Editar e Exibir', itens: ['Editar: desfazer, colar, localizar', 'Exibir: barras, barra lateral, zoom'] }),

    cena('No menu Editar fica também Registrar alterações, que é o controle de alterações do Writer. Com ele ligado, cada inclusão e cada exclusão fica marcada, para ser aceita ou rejeitada depois. Nas versões 7.0 e 7.1, o atalho era Ctrl+Shift+C; da 7.2 em diante, não há atalho padrão.',
      writer('Editar', EDITAR, 'Registrar alterações', 'Equivale ao Controlar Alterações do Word. No Word fica na guia Revisão; no Writer, no menu Editar.')),

    cena('Os atalhos do menu Editar. Desfazer é Ctrl+Z e refazer é Ctrl+Y. Selecionar tudo é Ctrl+A. Localizar é Ctrl+F e localizar e substituir é Ctrl+H. Colar especial é Ctrl+Shift+V.',
      { tipo: 'teclas', titulo: 'Menu Editar', acoes: ['desfazer', 'refazer', 'selecionarTudo', 'localizar', 'substituir', 'colarEspecial'] }),

    cena('O menu Exibir controla o que aparece na janela: barras de ferramentas, barra de status, réguas, marcas de formatação, barra lateral e zoom. Os modos de exibição são só dois: Normal e Web. Há ainda a Tela inteira.',
      writer('Exibir', EXIBIR, 'Navegador', 'Lista títulos, tabelas, figuras e outros elementos do documento. Dois cliques num item levam até ele.')),

    cena('A barra lateral fica à direita da janela e tem quatro painéis principais. Propriedades formata o texto selecionado. Estilos lista os estilos. Galeria guarda imagens prontas. E o Navegador mostra a estrutura do documento.',
      { tipo: 'lista', titulo: 'Barra lateral', itens: ['Propriedades: fonte, parágrafo e página', 'Estilos: aplica e gerencia estilos', 'Galeria: imagens e formas prontas', 'Navegador: títulos, tabelas e figuras do documento'] }),

    cena('Três teclas do menu Exibir. F5 abre e fecha o Navegador. F11 abre o painel de Estilos. E Ctrl+F10 mostra as marcas de formatação, aquelas que no Word aparecem com Ctrl+*.',
      { tipo: 'teclas', titulo: 'Menu Exibir', acoes: ['navegador', 'estilos', 'marcas'] }),

    cena('Cuidado com a tecla F5. No Writer, ela abre o Navegador. No PowerPoint e no Impress, a mesma tecla inicia a apresentação de slides. A questão costuma perguntar o que a tecla faz em um programa específico.',
      { tipo: 'pegadinha', titulo: 'F5 muda de papel conforme o programa', texto: 'No Writer, F5 abre o Navegador. No PowerPoint e no Impress, F5 inicia a apresentação de slides.' }),

    // ---------- Inserir ----------
    cena('O menu Inserir acrescenta elementos ao documento: quebra de página, figura, gráfico, forma, caixa de texto, hiperlink, caractere especial, campo, cabeçalho e rodapé. Até aqui, parecido com a guia Inserir do Word.',
      { tipo: 'secao', titulo: 'Menu Inserir', itens: ['Quebras', 'Figura e gráfico', 'Nota de rodapé', 'Sumário e índice', 'Cabeçalho e rodapé'] }),

    cena('A diferença importante: no Writer, o sumário e as notas de rodapé e de fim também ficam no menu Inserir. No Word, esses dois recursos estão na guia Referências. O Writer não tem um menu chamado Referências.',
      writer('Inserir', INSERIR, 'Sumário e índice', 'No Writer, sumário e nota de rodapé ficam no menu Inserir. No Word, ficam na guia Referências.')),

    cena('Veja lado a lado onde fica cada recurso. Sumário e nota de rodapé: guia Referências no Word, menu Inserir no Writer. Cabeçalho e rodapé: Inserir nos dois. Marca-d\'água: guia Design no Word, menu Formatar no Writer.',
      { tipo: 'compara', titulo: 'Onde fica: Word e Writer', office: ['Sumário: guia Referências', 'Nota de rodapé: guia Referências', 'Cabeçalho e rodapé: guia Inserir', "Marca-d'água: guia Design"], libre: ['Sumário: menu Inserir', 'Nota de rodapé: menu Inserir', 'Cabeçalho e rodapé: menu Inserir', "Marca d'água: menu Formatar"] }),

    // ---------- Formatar ----------
    cena('O menu Formatar muda a aparência do texto e da página. Os dois comandos centrais abrem janelas completas: Caractere, para fonte, tamanho e efeitos, e Parágrafo, para alinhamento, recuos e espaçamento.',
      { tipo: 'secao', titulo: 'Menu Formatar', itens: ['Caractere', 'Parágrafo', 'Marcadores e numeração', 'Estilo de página', 'Colunas'] }),

    cena('Clonar formatação é o pincel do Writer. Ele copia a formatação de um trecho e aplica em outro, sem copiar o texto. Faz o mesmo que o Pincel de Formatação do Word; só o nome é outro.',
      writer('Formatar', FORMATAR, 'Clonar formatação', 'É o Pincel de Formatação do Word com outro nome. Dois cliques no botão mantêm a ferramenta ligada.')),

    cena('Limpar formatação direta remove o que foi aplicado à mão, como negrito, cor e tamanho, e devolve o texto ao estilo do parágrafo. O atalho é Ctrl+M. No Word, o botão parecido se chama Limpar Toda a Formatação.',
      writer('Formatar', FORMATAR, 'Limpar formatação direta', 'Formatação direta é a que você aplica à mão, sem usar estilo. Atalho: Ctrl+M.')),

    cena('Os atalhos de caractere no Writer seguem o inglês. Negrito é Ctrl+B, de bold. Itálico é Ctrl+I. Sublinhado é Ctrl+U, de underline. Sobrescrito é Ctrl+Shift+P e subscrito é Ctrl+Shift+B.',
      { tipo: 'teclas', titulo: 'Formatação de caractere', acoes: ['negrito', 'italico', 'sublinhado', 'sobrescrito', 'subscrito'] },
      'Os atalhos de caractere no Writer seguem o inglês. Negrito é Ctrl+B, de bôld. Itálico é Ctrl+I. Sublinhado é Ctrl+U, de anderláine. Sobrescrito é Ctrl+Shift+P e subscrito é Ctrl+Shift+B.'),

    cena('Os alinhamentos também. Ctrl+L alinha à esquerda, de left. Ctrl+E centraliza. Ctrl+R alinha à direita, de right. E Ctrl+J justifica. Centralizar e justificar são iguais no Word; os outros dois mudam.',
      { tipo: 'teclas', titulo: 'Alinhamento do parágrafo', acoes: ['esquerda', 'centralizar', 'direita', 'justificar'] },
      'Os alinhamentos também. Ctrl+L alinha à esquerda, de léft. Ctrl+E centraliza. Ctrl+R alinha à direita, de ráit. E Ctrl+J justifica. Centralizar e justificar são iguais no Word; os outros dois mudam.'),

    cena('Aqui mora uma troca perigosa. Ctrl+L no Writer alinha à esquerda; no Word em português, localiza. Ctrl+R no Writer alinha à direita; no Word, refaz. Sempre leia qual é o programa antes de marcar a alternativa.',
      { tipo: 'pegadinha', titulo: 'Ctrl+L e Ctrl+R mudam de papel', texto: 'Ctrl+L: alinhar à esquerda no Writer, localizar no Word. Ctrl+R: alinhar à direita no Writer, refazer no Word.' }),

    cena('Margens, orientação e tamanho do papel ficam em Estilo de página. No Writer, a formatação da página pertence a um estilo de página. Para ter uma página em paisagem no meio do documento, você aplica outro estilo de página naquele trecho.',
      writer('Formatar', FORMATAR, 'Estilo de página...', 'Margens, orientação, tamanho do papel, cabeçalho, rodapé e colunas são definidos no estilo de página.')),

    // ---------- Estilos ----------
    cena('O Writer é todo baseado em estilos, e por isso eles têm um menu próprio. Estilo é um conjunto de formatações com nome. O texto comum nasce com o Estilo de parágrafo padrão, e os títulos usam Título 1, Título 2 e assim por diante.',
      { tipo: 'secao', titulo: 'Menu Estilos', itens: ['Parágrafo', 'Caractere', 'Quadro', 'Página', 'Lista', 'Tabela'] }),

    cena('São seis tipos de estilo: de parágrafo, de caractere, de quadro, de página, de lista e de tabela. O Word não tem estilo de página; essa é uma característica do Writer que as bancas gostam de explorar.',
      { tipo: 'lista', titulo: 'Os seis tipos de estilo do Writer', itens: ['Parágrafo: alinhamento, recuo, espaçamento e fonte do parágrafo', 'Caractere: formatação de um trecho dentro do parágrafo', 'Quadro: molduras de texto e de figuras', 'Página: margens, orientação, cabeçalho e rodapé', 'Lista: marcadores e numeração', 'Tabela: aparência das tabelas'] }),

    cena('No menu Estilos você aplica os estilos mais usados e encontra Editar estilo, Atualizar estilo selecionado e Novo estilo a partir da seleção. O último item, Gerenciar estilos, abre o painel completo na barra lateral, o mesmo da tecla F11.',
      writer('Estilos', ESTILOS, 'Gerenciar estilos', 'Abre o painel Estilos na barra lateral. É o mesmo que apertar F11.')),

    // ---------- Tabela e Ferramentas ----------
    cena('Faltam dois menus importantes. Tabela, que no Word é apenas um botão da guia Inserir, aqui é um menu inteiro. E Ferramentas, que reúne ortografia, idioma, contagem de palavras, mala direta e as opções do programa.',
      { tipo: 'secao', titulo: 'Menus Tabela e Ferramentas', itens: ['Tabela: inserir, mesclar, converter', 'Ferramentas: ortografia, mala direta, opções'] }),

    cena('No menu Tabela ficam Inserir tabela, mesclar e dividir células, converter texto em tabela e tabela em texto, ordenar e até fórmula. O atalho para inserir uma tabela é Ctrl+F12.',
      writer('Tabela', TABELA, 'Inserir tabela...', 'No Writer, tabela tem menu próprio. No Word, o botão Tabela fica na guia Inserir.')),

    cena('No menu Ferramentas ficam a ortografia, o dicionário de sinônimos, a contagem de palavras, a autocorreção e o Assistente de mala direta. No Word, ortografia fica na guia Revisão e mala direta, na guia Correspondências.',
      writer('Ferramentas', FERRAMENTAS, 'Assistente de mala direta...', 'A mala direta do Writer é um assistente no menu Ferramentas. No Word, é a guia Correspondências.')),

    cena('Mais seis atalhos do Writer. Ctrl+Enter insere quebra de página. Ctrl+K insere hiperlink. Shift+F3 alterna maiúsculas e minúsculas. Ctrl+F12 insere tabela. F7 verifica a ortografia. E F12 liga a lista numerada.',
      { tipo: 'teclas', titulo: 'Outros atalhos do Writer', acoes: ['quebraPagina', 'hiperlink', 'maiusculas', 'inserirTabela', 'ortografia', 'listaNumerada'] }),

    cena('A seleção com o mouse tem uma diferença. No Writer, dois cliques selecionam a palavra, três cliques selecionam a frase e quatro cliques selecionam o parágrafo. No Word, três cliques já selecionam o parágrafo inteiro.',
      { tipo: 'lista', titulo: 'Selecionar com o mouse no Writer', itens: ['Dois cliques: seleciona a palavra', 'Três cliques: seleciona a frase', 'Quatro cliques: seleciona o parágrafo', 'No Word, três cliques selecionam o parágrafo'] }),

    cena('Por isso, se a questão disser que três cliques sobre uma palavra selecionam o parágrafo, a resposta depende do programa. No Word, está certo. No Writer, está errado: três cliques selecionam só a frase.',
      { tipo: 'pegadinha', titulo: 'Três cliques não fazem o mesmo nos dois', texto: 'Três cliques: parágrafo no Word, frase no Writer. Para o parágrafo inteiro no Writer, são quatro cliques.' }),

    cena('Resumo da aula. O Writer organiza os comandos em onze menus. PDF fica em Arquivo, Exportar como. Registrar alterações fica em Editar. Sumário e nota de rodapé ficam em Inserir. Mala direta e ortografia ficam em Ferramentas. E os atalhos seguem o inglês.',
      { tipo: 'lista', titulo: 'Resumo: onde fica cada coisa no Writer', itens: ['Arquivo: Exportar como PDF', 'Editar: Registrar alterações, Localizar e substituir', 'Inserir: sumário, nota de rodapé, cabeçalho e rodapé', "Formatar: Clonar formatação, Estilo de página, Marca d'água", 'Ferramentas: ortografia e Assistente de mala direta'] }),

    // ---------- como cai na prova ----------
    cena('Vamos às três questões no estilo das bancas. Pause o vídeo depois de cada enunciado, escolha a sua alternativa e só então confira a resposta.',
      { tipo: 'secao', titulo: 'Como cai na prova', itens: ['3 questões', 'Pause o vídeo antes de ver a resposta'] }),

    ...pergunta({
      enunciado: 'No LibreOffice Writer 7, o comando que gera um arquivo PDF a partir do documento aberto fica em:',
      alternativas: ['Arquivo > Salvar como.', 'Arquivo > Exportar como.', 'Ferramentas > Opções.', 'Inserir > Campo.', 'Formatar > Estilo de página.'],
      correta: 1,
      comentario: 'Exportar como PDF fica em Arquivo > Exportar como. No Writer, o PDF não aparece em Salvar como.',
      falaPergunta: 'Primeira questão. No Writer 7, o comando que gera um arquivo PDF a partir do documento aberto fica em qual caminho? Pause e escolha.',
      falaResposta: 'Resposta: letra B, Arquivo, Exportar como. A letra A é a armadilha: no Word o PDF aparece no Salvar como, mas no Writer não.',
    }),

    ...pergunta({
      enunciado: 'No Writer 7, na configuração padrão, as teclas Ctrl+B, Ctrl+S e Ctrl+O servem, respectivamente, para:',
      alternativas: [
        'salvar, sublinhar e criar um novo documento.',
        'aplicar negrito, salvar e abrir um documento.',
        'aplicar negrito, sublinhar e abrir um documento.',
        'salvar, sublinhar e abrir um documento.',
        'aplicar negrito, salvar e criar um novo documento.',
      ],
      correta: 1,
      comentario: 'No Writer: Ctrl+B é negrito, Ctrl+S salva e Ctrl+O abre. A letra A descreve o Word em português.',
      falaPergunta: 'Segunda questão. No Writer 7, na configuração padrão, as teclas Ctrl+B, Ctrl+S e Ctrl+O servem, respectivamente, para quê? Pause e escolha.',
      falaResposta: 'Resposta: letra B. No Writer, Ctrl+B aplica negrito, Ctrl+S salva e Ctrl+O abre um documento. A letra A é o que essas mesmas teclas fazem no Word em português: salvar, sublinhar e criar um novo.',
    }),

    ...pergunta({
      enunciado: 'No Writer 7, para que as inclusões e exclusões feitas em um texto fiquem marcadas e possam ser aceitas ou rejeitadas depois, usa-se o comando:',
      alternativas: ['Editar > Registrar alterações.', 'Ferramentas > Autocorreção.', 'Exibir > Navegador.', 'Formatar > Clonar formatação.', 'Arquivo > Propriedades.'],
      correta: 0,
      comentario: 'Registrar alterações, no menu Editar, é o equivalente ao Controlar Alterações do Word.',
      falaPergunta: 'Terceira questão. No Writer 7, que comando faz as inclusões e exclusões ficarem marcadas no texto, para serem aceitas ou rejeitadas depois? Pause e escolha.',
      falaResposta: 'Resposta: letra A, Editar, Registrar alterações. É o equivalente ao Controlar Alterações do Word. A autocorreção troca erros de digitação sozinha, e o Navegador só mostra a estrutura do documento.',
    }),

    cena('Fim da aula três. Você já conhece os dois editores de texto. Na próxima aula, vamos às planilhas, começando pelo Excel 2019: células, referências, fórmulas e os recursos mais cobrados. Até lá!',
      { tipo: 'lista', titulo: 'Na próxima aula', itens: ['Aula 4: Excel 2019', 'Célula, intervalo e referências', 'Operadores e alça de preenchimento', 'Classificar, filtrar e gráficos'] }),
  ],
};
