import { cena, pergunta } from './_cenas.mjs';

// Planilha de notas usada na maior parte dos exemplos: B2:B6 = 8, 6, 10, 4, 7.
const NOTAS = { A1: 'Aluno', B1: 'Nota', A2: 'Ana', B2: 8, A3: 'Bia', B3: 6, A4: 'Caio', B4: 10, A5: 'Davi', B5: 4, A6: 'Eva', B6: 7 };
// Tabela de produtos para o PROCV.
const PRODUTOS = { A1: 'Código', B1: 'Produto', C1: 'Preço', A2: 10, B2: 'Caneta', C2: '2,50', A3: 20, B3: 'Caderno', C3: '18,00', A4: 30, B4: 'Lápis', C4: '1,20' };

const excel = (dados) => ({ tipo: 'planilha', app: 'excel', ...dados });
const calc = (dados) => ({ tipo: 'planilha', app: 'calc', ...dados });
const notas = (em, formula, resultado, destaque, nota, extra = {}) => excel({ celulas: { ...NOTAS, ...extra }, em, formula, resultado, destaque, nota });

export default {
  n: 6,
  slug: 'funcoes',
  titulo: 'Funções de planilha',
  cenas: [
    cena('Aula seis: as funções de planilha. Elas têm os mesmos nomes e funcionam do mesmo jeito no Excel e no Calc. Vamos resolver, uma por uma, as que mais aparecem em prova, sempre com um exemplo e a conta feita.',
      { tipo: 'capa', titulo: 'Funções de planilha', subtitulo: 'Soma, média, contagens, SE, PROCV e as outras funções mais cobradas, com exemplos resolvidos' }),

    cena('O caminho. Primeiro, como se escreve uma função. Depois, soma, média, máximo e mínimo. Em seguida, as contagens e as funções com condição. E, por fim, a busca com PROCV, os arredondamentos, os textos e as datas.',
      { tipo: 'lista', titulo: 'O que você vai ver nesta aula', itens: ['Como se escreve uma função', 'SOMA, MÉDIA, MÁXIMO e MÍNIMO', 'Contagens: CONT.NÚM, CONT.VALORES, CONT.SE', 'Lógicas: SE, E, OU', 'Busca: PROCV e PROCH', 'Arredondamento, texto e data'] },
      'O caminho. Primeiro, como se escreve uma função. Depois, soma, média, máximo e mínimo. Em seguida, as contagens e as funções com condição. E, por fim, a busca com proc vê, os arredondamentos, os textos e as datas.'),

    cena('Toda função tem a mesma forma. Sinal de igual, nome da função, abre parênteses, os argumentos e fecha parênteses. Quando há mais de um argumento, eles são separados por ponto e vírgula. Isso vale no Excel e no Calc em português.',
      { tipo: 'lista', titulo: 'Como se escreve uma função', itens: ['Sinal de igual', 'Nome da função', 'Argumentos entre parênteses', 'Ponto e vírgula separa os argumentos', 'Exemplo: =SOMA(B2:B6)', 'Mesmos nomes no Excel e no Calc'] },
      'Toda função tem a mesma forma. Sinal de igual, nome da função, abre parênteses, os argumentos e fecha parênteses. Quando há mais de um argumento, eles são separados por ponto e vírgula. Isso vale no Excel e no Calc em português.'),

    // ---------- soma, média, extremos ----------
    cena('Esta é a planilha dos exemplos: cinco alunos e suas notas, de B2 até B6. A função SOMA, com esse intervalo, soma os cinco valores. Oito, mais seis, mais dez, mais quatro, mais sete: trinta e cinco.',
      notas('B7', '=SOMA(B2:B6)', '35', ['B2:B6'], 'Soma todos os números do intervalo: 8 + 6 + 10 + 4 + 7 = 35.', { A7: 'Soma' })),

    cena('Agora troque os dois-pontos por ponto e vírgula. A soma passa a considerar só as duas células citadas, B2 e B6. Oito mais sete: quinze. O sinal entre as células muda completamente o resultado.',
      notas('B7', '=SOMA(B2;B6)', '15', ['B2', 'B6'], 'Com ponto e vírgula, só B2 e B6 entram: 8 + 7 = 15.', { A7: 'Soma' })),

    cena('É a questão mais clássica de planilhas. Dois-pontos significa até, e pega o intervalo inteiro. Ponto e vírgula significa e, e pega só as células citadas. Sempre olhe qual dos dois sinais está na fórmula.',
      { tipo: 'pegadinha', titulo: 'Dois-pontos não é ponto e vírgula', texto: 'SOMA(B2:B6) soma de B2 até B6: cinco células. SOMA(B2;B6) soma B2 e B6: duas células.' },
      'É a questão mais clássica de planilhas. Dois-pontos significa até, e pega o intervalo inteiro. Ponto e vírgula significa e, e pega só as células citadas. Sempre olhe qual dos dois sinais está na fórmula.'),

    cena('A função MÉDIA calcula a média aritmética: soma os valores e divide pela quantidade de números. Aqui, trinta e cinco dividido por cinco notas dá sete.',
      notas('B7', '=MÉDIA(B2:B6)', '7', ['B2:B6'], 'Média aritmética: 35 dividido por 5 notas = 7.', { A7: 'Média' })),

    cena('Três cuidados com a média. Células vazias e células com texto não entram na conta. Já uma célula com o número zero entra, e puxa a média para baixo. E média não é mediana: a mediana tem outra função, que você vai ver daqui a pouco.',
      { tipo: 'lista', titulo: 'Cuidados com a MÉDIA', itens: ['Soma os valores e divide pela quantidade de números', 'Célula vazia não entra na conta', 'Célula com texto não entra na conta', 'Célula com zero entra: é um número', 'MÉDIA não é MED: MED calcula a mediana'] },
      'Três cuidados com a média. Células vazias e células com texto não entram na conta. Já uma célula com o número zero entra, e puxa a média para baixo. E média não é mediana: a mediana tem outra função, que você vai ver daqui a pouco.'),

    cena('MÁXIMO devolve o maior valor do intervalo. Entre as cinco notas, o maior é dez.',
      notas('B7', '=MÁXIMO(B2:B6)', '10', ['B4'], 'O maior valor do intervalo: 10.', { A7: 'Máximo' })),

    cena('E MÍNIMO devolve o menor valor do intervalo. Entre as cinco notas, o menor é quatro.',
      notas('B7', '=MÍNIMO(B2:B6)', '4', ['B5'], 'O menor valor do intervalo: 4.', { A7: 'Mínimo' })),

    cena('A função MAIOR tem dois argumentos: o intervalo e a posição. Com a posição dois, ela devolve o segundo maior valor. As notas em ordem decrescente são dez, oito, sete, seis e quatro. O segundo maior é oito.',
      notas('B7', '=MAIOR(B2:B6;2)', '8', ['B2'], 'O segundo maior valor. Em ordem: 10, 8, 7, 6, 4.', { A7: '2º maior' })),

    cena('A função MENOR faz o mesmo no sentido contrário. Com a posição dois, devolve o segundo menor valor. Em ordem crescente: quatro, seis, sete, oito e dez. O segundo menor é seis.',
      notas('B7', '=MENOR(B2:B6;2)', '6', ['B3'], 'O segundo menor valor. Em ordem: 4, 6, 7, 8, 10.', { A7: '2º menor' })),

    cena('Não confunda. MÁXIMO e MÍNIMO recebem só o intervalo e devolvem o maior e o menor. MAIOR e MENOR pedem também a posição. Uma fórmula com MÁXIMO e um segundo argumento de posição não faz o que a alternativa diz.',
      { tipo: 'pegadinha', titulo: 'MÁXIMO não é MAIOR', texto: 'MÁXIMO(intervalo) devolve o maior valor. MAIOR(intervalo; 2) devolve o segundo maior. O mesmo vale para MÍNIMO e MENOR.' },
      'Não confunda. Máximo e mínimo recebem só o intervalo e devolvem o maior e o menor. Maior e menor pedem também a posição. Uma fórmula com máximo e um segundo argumento de posição não faz o que a alternativa diz.'),

    cena('A função MED calcula a mediana, que é o valor do meio quando os números estão em ordem. Quatro, seis, sete, oito e dez: o valor do meio é sete. Neste exemplo coincidiu com a média, mas são contas diferentes.',
      notas('B7', '=MED(B2:B6)', '7', ['B6'], 'Mediana: o valor do meio com os números em ordem. 4, 6, 7, 8, 10.', { A7: 'Mediana' })),

    cena('E a função MODO devolve a moda, o valor que mais se repete. Nesta outra lista, três, cinco, cinco, sete e nove, o número cinco aparece duas vezes. A moda é cinco.',
      calc({ celulas: { A1: 3, A2: 5, A3: 5, A4: 7, A5: 9 }, em: 'A6', formula: '=MODO(A1:A5)', resultado: '5', destaque: ['A2:A3'], nota: 'Moda: o valor que mais se repete. O 5 aparece duas vezes.' })),

    // ---------- contagens ----------
    cena('Agora as funções de contagem. Elas não somam: contam quantas células existem com determinada característica. São quatro que você precisa separar bem.',
      { tipo: 'secao', titulo: 'Contagens', itens: ['CONT.NÚM', 'CONT.VALORES', 'CONTAR.VAZIO', 'CONT.SE'] },
      'Agora as funções de contagem. Elas não somam: contam quantas células existem com determinada característica. São quatro que você precisa separar bem.'),

    cena('CONT.NÚM conta só as células que contêm números. No intervalo de A1 até B6 há doze células preenchidas, mas apenas cinco têm número: as notas. Os nomes e os títulos são texto e ficam de fora.',
      notas('D1', '=CONT.NÚM(A1:B6)', '5', ['B2:B6'], 'Conta só as células com números. Nomes e títulos são texto.')),

    cena('CONT.VALORES conta todas as células que não estão vazias, com número ou com texto. No mesmo intervalo, de A1 até B6, o resultado é doze.',
      notas('D1', '=CONT.VALORES(A1:B6)', '12', ['A1:B6'], 'Conta toda célula que não está vazia: 6 linhas vezes 2 colunas = 12.')),

    cena('CONT.SE conta as células que atendem a um critério. O critério vai entre aspas. Aqui, quantas notas são maiores ou iguais a sete? Oito, dez e sete: três notas.',
      notas('D1', '=CONT.SE(B2:B6;">=7")', '3', ['B2', 'B4', 'B6'], 'Conta as células que atendem ao critério: 8, 10 e 7.')),

    cena('SOMASE tem a mesma lógica, mas soma em vez de contar. Somando só as notas maiores ou iguais a sete: oito, mais dez, mais sete, vinte e cinco.',
      notas('D1', '=SOMASE(B2:B6;">=7")', '25', ['B2', 'B4', 'B6'], 'Soma só as células que atendem ao critério: 8 + 10 + 7 = 25.')),

    cena('Fixe a diferença. CONT.NÚM conta números. CONT.VALORES conta tudo o que não está vazio. CONTAR.VAZIO conta as células vazias. CONT.SE conta com condição. E SOMASE soma com condição.',
      { tipo: 'lista', titulo: 'Não confunda as contagens', itens: ['CONT.NÚM: conta as células com números', 'CONT.VALORES: conta as células não vazias', 'CONTAR.VAZIO: conta as células vazias', 'CONT.SE: conta as que atendem a um critério', 'SOMASE: soma as que atendem a um critério'] },
      'Fixe a diferença. Cont ponto núm conta números. Cont ponto valores conta tudo o que não está vazio. Contar ponto vazio conta as células vazias. Cont ponto se conta com condição. E soma se soma com condição.'),

    // ---------- lógicas ----------
    cena('As funções lógicas trabalham com verdadeiro e falso. A principal é a função SE, que decide entre dois resultados conforme um teste. É a função mais cobrada depois da soma.',
      { tipo: 'secao', titulo: 'Funções lógicas', itens: ['SE', 'E', 'OU'] },
      'As funções lógicas trabalham com verdadeiro e falso. A principal é a função se, que decide entre dois resultados conforme um teste. É a função mais cobrada depois da soma.'),

    cena('A função SE tem três argumentos: o teste, o valor se o teste for verdadeiro e o valor se for falso. Aqui o teste é: a nota de B2 é maior ou igual a sete? Como B2 vale oito, o teste é verdadeiro, e a célula mostra Aprovado.',
      notas('C2', '=SE(B2>=7;"Aprovado";"Reprovado")', 'Aprovado', ['B2'], 'Teste; valor se verdadeiro; valor se falso. B2 é 8: verdadeiro.', { C1: 'Situação' }),
      'A função se tem três argumentos: o teste, o valor se o teste for verdadeiro e o valor se for falso. Aqui o teste é: a nota de bê dois é maior ou igual a sete? Como bê dois vale oito, o teste é verdadeiro, e a célula mostra Aprovado.'),

    cena('Copiando a fórmula para a linha de baixo, a referência vira B3. A nota de B3 é seis. O teste, maior ou igual a sete, é falso. Por isso a função devolve o terceiro argumento: Reprovado.',
      notas('C3', '=SE(B3>=7;"Aprovado";"Reprovado")', 'Reprovado', ['B3'], 'B3 é 6: o teste é falso, e vale o terceiro argumento.', { C1: 'Situação', C2: 'Aprovado' })),

    cena('Guarde a ordem dos argumentos: teste, verdadeiro, falso. Os textos vão entre aspas. E é possível colocar uma função SE dentro de outra, para ter três ou mais resultados: é o chamado SE aninhado.',
      { tipo: 'lista', titulo: 'A função SE', itens: ['=SE(teste; valor se verdadeiro; valor se falso)', 'O teste usa os operadores de comparação', 'Textos vão entre aspas', 'SE aninhado: um SE dentro de outro'] },
      'Guarde a ordem dos argumentos: teste, verdadeiro, falso. Os textos vão entre aspas. E é possível colocar uma função se dentro de outra, para ter três ou mais resultados: é o chamado se aninhado.'),

    cena('A função E só devolve verdadeiro quando todos os testes são verdadeiros. A nota de B2 é oito, mas a de B3 é seis. O segundo teste falha, e o resultado é falso.',
      notas('D1', '=E(B2>=7;B3>=7)', 'FALSO', ['B2:B3'], 'E: todos os testes precisam ser verdadeiros. B3 é 6, então o resultado é FALSO.'),
      'A função é só devolve verdadeiro quando todos os testes são verdadeiros. A nota de bê dois é oito, mas a de bê três é seis. O segundo teste falha, e o resultado é falso.'),

    cena('A função OU devolve verdadeiro quando pelo menos um dos testes é verdadeiro. Com as mesmas células, basta B2 ser maior ou igual a sete para o resultado ser verdadeiro.',
      notas('D1', '=OU(B2>=7;B3>=7)', 'VERDADEIRO', ['B2:B3'], 'OU: basta um teste verdadeiro. B2 é 8, então o resultado é VERDADEIRO.'),
      'A função ou devolve verdadeiro quando pelo menos um dos testes é verdadeiro. Com as mesmas células, basta bê dois ser maior ou igual a sete para o resultado ser verdadeiro.'),

    // ---------- PROCV ----------
    cena('Agora a função de busca mais cobrada: PROCV. O V vem de vertical. Ela procura um valor na primeira coluna de uma tabela e devolve o que está na mesma linha, em outra coluna.',
      { tipo: 'secao', titulo: 'PROCV', itens: ['Procura na primeira coluna', 'Devolve um valor da mesma linha', 'Quatro argumentos'] },
      'Agora a função de busca mais cobrada: proc vê. O vê vem de vertical. Ela procura um valor na primeira coluna de uma tabela e devolve o que está na mesma linha, em outra coluna.'),

    cena('Nesta tabela de produtos, a fórmula procura o código vinte na primeira coluna. Achou na linha do Caderno. O terceiro argumento, três, manda devolver o valor da terceira coluna da tabela: o preço, dezoito reais.',
      excel({ celulas: { ...PRODUTOS }, em: 'E2', formula: '=PROCV(20;A2:C4;3;FALSO)', resultado: '18,00', destaque: ['A3:C3'], nota: 'Procura 20 na primeira coluna e devolve a coluna 3 da mesma linha.' })),

    cena('Mudando o terceiro argumento para dois, a função devolve a segunda coluna, que é o nome do produto. Procurando o código trinta, o resultado é Lápis.',
      excel({ celulas: { ...PRODUTOS }, em: 'E2', formula: '=PROCV(30;A2:C4;2;FALSO)', resultado: 'Lápis', destaque: ['A4:C4'], nota: 'Agora devolve a coluna 2 da linha do código 30.' })),

    cena('São quatro argumentos. Primeiro, o valor procurado. Segundo, a tabela. Terceiro, o número da coluna da resposta. Quarto, o tipo de busca: falso para correspondência exata e verdadeiro para aproximada.',
      { tipo: 'lista', titulo: 'Os quatro argumentos do PROCV', itens: ['1. O valor procurado', '2. A tabela onde procurar', '3. O número da coluna que tem a resposta', '4. FALSO: busca exata. VERDADEIRO: busca aproximada', 'A busca é sempre na primeira coluna da tabela'] },
      'São quatro argumentos. Primeiro, o valor procurado. Segundo, a tabela. Terceiro, o número da coluna da resposta. Quarto, o tipo de busca: falso para correspondência exata e verdadeiro para aproximada.'),

    cena('Existe também o PROCH, com H de horizontal. Ele procura na primeira linha da tabela e devolve um valor da mesma coluna, mais abaixo. E, se o valor procurado não existir, o resultado é o erro de valor não disponível.',
      { tipo: 'pegadinha', titulo: 'PROCV na vertical, PROCH na horizontal', texto: 'PROCV procura na primeira coluna e devolve da mesma linha. PROCH procura na primeira linha e devolve da mesma coluna. Valor não encontrado: erro #N/D.' },
      'Existe também o proc agá, com agá de horizontal. Ele procura na primeira linha da tabela e devolve um valor da mesma coluna, mais abaixo. E, se o valor procurado não existir, o resultado é o erro de valor não disponível.'),

    // ---------- arredondamento, texto, data ----------
    cena('Para fechar, três grupos menores: arredondamento, texto e data. Caem menos que os anteriores, mas costumam aparecer em uma alternativa ou outra.',
      { tipo: 'secao', titulo: 'Arredondamento, texto e data', itens: ['ARRED, TRUNCAR e INT', 'MOD', 'CONCATENAR', 'HOJE e AGORA'] },
      'Para fechar, três grupos menores: arredondamento, texto e data. Caem menos que os anteriores, mas costumam aparecer em uma alternativa ou outra.'),

    cena('ARRED arredonda um número para a quantidade de casas decimais indicada no segundo argumento. Com duas casas, o número três vírgula um quatro um cinco nove vira três vírgula catorze.',
      excel({ celulas: { A1: '3,14159' }, em: 'B1', formula: '=ARRED(A1;2)', resultado: '3,14', destaque: ['A1'], nota: 'Arredonda para 2 casas decimais.' }),
      'A função arred arredonda um número para a quantidade de casas decimais indicada no segundo argumento. Com duas casas, o número três vírgula um quatro um cinco nove vira três vírgula catorze.'),

    cena('TRUNCAR corta as casas decimais sem arredondar. Três vírgula noventa e nove, truncado, vira três. Se a função fosse ARRED com zero casas, o resultado seria quatro.',
      excel({ celulas: { A1: '3,99' }, em: 'B1', formula: '=TRUNCAR(A1)', resultado: '3', destaque: ['A1'], nota: 'Corta os decimais, sem arredondar. ARRED(A1;0) daria 4.' }),
      'A função truncar corta as casas decimais sem arredondar. Três vírgula noventa e nove, truncado, vira três. Se a função fosse arred com zero casas, o resultado seria quatro.'),

    cena('E a função INT arredonda para baixo, até o inteiro mais próximo. Com números positivos, dá o mesmo que truncar. A diferença aparece nos negativos: o inteiro de menos três vírgula cinco é menos quatro, e o truncado é menos três.',
      { tipo: 'lista', titulo: 'ARRED, TRUNCAR e INT', itens: ['ARRED(3,99;0) = 4: arredonda', 'TRUNCAR(3,99) = 3: corta os decimais', 'INT(3,99) = 3: arredonda para baixo', 'INT(-3,5) = -4, mas TRUNCAR(-3,5) = -3'] },
      'E a função int arredonda para baixo, até o inteiro mais próximo. Com números positivos, dá o mesmo que truncar. A diferença aparece nos negativos: o inteiro de menos três vírgula cinco é menos quatro, e o truncado é menos três.'),

    cena('MOD devolve o resto de uma divisão. Dez dividido por três dá três e sobra um. O resultado é um. Um uso comum é testar se um número é par: o resto da divisão por dois é zero.',
      calc({ celulas: {}, em: 'A1', formula: '=MOD(10;3)', resultado: '1', nota: 'Resto da divisão: 10 dividido por 3 dá 3 e sobra 1.' }),
      'A função mod devolve o resto de uma divisão. Dez dividido por três dá três e sobra um. O resultado é um. Um uso comum é testar se um número é par: o resto da divisão por dois é zero.'),

    cena('CONCATENAR junta textos. Aqui ela une o nome que está em A1, um espaço entre aspas e o sobrenome que está em B1. O mesmo resultado se consegue com o operador e comercial.',
      excel({ celulas: { A1: 'Ana', B1: 'Silva' }, em: 'C1', formula: '=CONCATENAR(A1;" ";B1)', resultado: 'Ana Silva', destaque: ['A1:B1'], nota: 'Junta textos. Com o operador &: =A1&" "&B1.' }),
      'A função concatenar junta textos. Aqui ela une o nome que está em á um, um espaço entre aspas e o sobrenome que está em bê um. O mesmo resultado se consegue com o operador e comercial.'),

    cena('Por fim, as funções de data. HOJE devolve a data atual. AGORA devolve a data e a hora atuais. Nenhuma das duas tem argumento, mas os parênteses são obrigatórios. E as duas se atualizam a cada recálculo da planilha.',
      { tipo: 'lista', titulo: 'HOJE e AGORA', itens: ['=HOJE() devolve a data atual', '=AGORA() devolve a data e a hora atuais', 'Sem argumentos, mas com os parênteses', 'Atualizam-se a cada recálculo da planilha'] },
      'Por fim, as funções de data. A função hoje devolve a data atual. A função agora devolve a data e a hora atuais. Nenhuma das duas tem argumento, mas os parênteses são obrigatórios. E as duas se atualizam a cada recálculo da planilha.'),

    cena('Resumo. Dois-pontos é até e ponto e vírgula é e. Média não é mediana. Máximo não é maior. Cada contagem conta uma coisa. A função SE segue a ordem teste, verdadeiro, falso. E o PROCV procura sempre na primeira coluna da tabela.',
      { tipo: 'lista', titulo: 'Resumo da aula', itens: ['SOMA(B2:B6) é intervalo; SOMA(B2;B6) são duas células', 'MÉDIA é a média; MED é a mediana; MODO é a moda', 'MÁXIMO e MÍNIMO: o extremo. MAIOR e MENOR: a posição', 'CONT.NÚM, CONT.VALORES, CONT.SE e SOMASE', 'SE(teste; verdadeiro; falso)', 'PROCV(valor; tabela; coluna; FALSO)'] },
      'Resumo. Dois-pontos é até e ponto e vírgula é e. Média não é mediana. Máximo não é maior. Cada contagem conta uma coisa. A função se segue a ordem teste, verdadeiro, falso. E o proc vê procura sempre na primeira coluna da tabela.'),

    // ---------- como cai na prova ----------
    cena('Três questões no estilo das bancas. Aqui vale fazer a conta no papel antes de olhar a resposta.',
      { tipo: 'secao', titulo: 'Como cai na prova', itens: ['3 questões', 'Pause o vídeo e faça a conta'] }),

    ...pergunta({
      enunciado: 'As células A1, A2, A3 e A4 de uma planilha contêm os valores 2, 4, 6 e 8. O resultado da fórmula =SOMA(A1;A4)+MÉDIA(A1:A4) é:',
      alternativas: ['10', '15', '20', '25', '30'],
      correta: 1,
      comentario: 'SOMA(A1;A4) soma só A1 e A4: 2 + 8 = 10. MÉDIA(A1:A4) é 20 dividido por 4 = 5. Total: 15.',
      falaPergunta: 'Primeira questão. As células A1, A2, A3 e A4 contêm os valores dois, quatro, seis e oito. Qual é o resultado da fórmula que soma A1 e A4, com ponto e vírgula, e depois soma a média de A1 até A4? Pause e calcule.',
      falaResposta: 'Resposta: letra B, quinze. A soma com ponto e vírgula pega só A1 e A4: dois mais oito, dez. A média do intervalo é vinte dividido por quatro, cinco. Dez mais cinco, quinze.',
    }),

    ...pergunta({
      enunciado: 'A célula B2 contém o valor 5. O resultado da fórmula =SE(B2>=7;"Aprovado";SE(B2>=5;"Recuperação";"Reprovado")) é:',
      alternativas: ['Aprovado', 'Recuperação', 'Reprovado', 'VERDADEIRO', '#VALOR!'],
      correta: 1,
      comentario: 'O primeiro teste (5 >= 7) é falso, então vale o segundo SE. Nele, 5 >= 5 é verdadeiro: Recuperação.',
      falaPergunta: 'Segunda questão. A célula B2 contém o valor cinco. A fórmula é um SE aninhado: se B2 for maior ou igual a sete, Aprovado; senão, outro SE: se B2 for maior ou igual a cinco, Recuperação; senão, Reprovado. Qual é o resultado? Pause e resolva.',
      falaResposta: 'Resposta: letra B, Recuperação. O primeiro teste, cinco maior ou igual a sete, é falso. Então vale o segundo teste: cinco maior ou igual a cinco é verdadeiro, e a função devolve Recuperação.',
    }),

    ...pergunta({
      enunciado: 'Na fórmula =PROCV(A1;C2:E10;3;FALSO), o número 3 indica:',
      alternativas: [
        'a linha da tabela em que está o valor procurado.',
        'a coluna da tabela de onde o resultado será devolvido.',
        'a quantidade de casas decimais do resultado.',
        'que a busca será feita na terceira planilha.',
        'que a correspondência deve ser aproximada.',
      ],
      correta: 1,
      comentario: 'O terceiro argumento do PROCV é o número da coluna da tabela que contém a resposta.',
      falaPergunta: 'Terceira questão. Numa fórmula com PROCV, os argumentos são: a célula A1, a tabela de C2 até E10, o número três e a palavra falso. O que o número três indica? Pause e escolha.',
      falaResposta: 'Resposta: letra B. O terceiro argumento é o número da coluna da tabela de onde vem a resposta. A busca exata ou aproximada é decidida pelo quarto argumento, que aqui é falso.',
    }),

    cena('Fim da aula seis, e fim do bloco de planilhas. Na próxima aula começam as apresentações, com o PowerPoint 2019: slides, layouts, slide mestre, transições, animações e atalhos. Até lá!',
      { tipo: 'lista', titulo: 'Na próxima aula', itens: ['Aula 7: PowerPoint 2019', 'Layouts e slide mestre', 'Transição e animação', 'Modos de exibição e atalhos'] }),
  ],
};
