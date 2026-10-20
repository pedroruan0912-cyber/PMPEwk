// Redações-modelo: cada uma com exatamente 20 linhas no mapa 4-6-6-4.
// Marcações: {t}tese{/} · {r}repertório{/} · {p}proposta{/}. Conectivos são destacados automaticamente.
const MODELOS = [
{
  id:'m1', curto:'Segurança pública',
  tema:'Os desafios da segurança pública no Brasil contemporâneo',
  tipo:'Tema de "desafios" → dois obstáculos',
  p:[
    [
      '{r}Segundo o filósofo Thomas Hobbes, o Estado existe para garantir a',
      'segurança e evitar a "guerra de todos contra todos"{/}. No entanto, os',
      'altos índices de violência no Brasil mostram que essa função não se',
      'cumpre, {t}sobretudo devido à impunidade e à desigualdade social{/}.'
    ],[
      'Em primeiro lugar, a sensação de impunidade estimula novos crimes.',
      '{r}De acordo com o jurista Cesare Beccaria, em "Dos Delitos e das Penas",',
      'a certeza da punição é mais eficaz do que a severidade da pena{/}. Sob',
      'essa ótica, quando inquéritos não são concluídos e processos duram',
      'anos, o infrator acredita que não será punido, o que favorece a',
      'reincidência e enfraquece a confiança da população nas instituições.'
    ],[
      'Além disso, a desigualdade social amplia a vulnerabilidade dos',
      'jovens das periferias. {r}Conforme o Atlas da Violência, do Ipea, a',
      'maioria das vítimas de homicídio no país é jovem e negra{/}. Nesse',
      'contexto, a falta de escola de qualidade, emprego e lazer deixa essa',
      'parcela da população exposta ao aliciamento do tráfico, de modo que',
      'a criminalidade se renova a cada geração nas comunidades carentes.'
    ],[
      'Portanto, é necessário enfrentar os desafios da segurança pública.',
      'Para isso, {p}o Governo Federal e os estados devem integrar polícias,',
      'Judiciário e escolas, por meio do Sistema Único de Segurança Pública,',
      'a fim de reduzir a impunidade e proteger os jovens vulneráveis{/}.'
    ]
  ],
  notas:[
    'Repertório de abertura (Hobbes) ligado ao papel do Estado, e não solto.',
    'A tese anuncia os dois argumentos na ordem dos parágrafos: impunidade (D1) e desigualdade (D2).',
    'Cada desenvolvimento tem tópico frasal, repertório, explicação e consequência.',
    'A conclusão retoma o tema e traz agente, ação, meio e finalidade.'
  ]
},
{
  id:'m2', curto:'Violência contra a mulher',
  tema:'Os desafios para combater a violência contra a mulher no Brasil',
  tipo:'Tema de "desafios" → duas causas',
  p:[
    [
      '{r}A Lei Maria da Penha, de 2006, criou mecanismos para coibir a',
      'violência doméstica e familiar contra a mulher{/}. Entretanto, os casos',
      'de agressão e feminicídio ainda são frequentes no Brasil, {t}sobretudo',
      'devido à cultura machista e à fragilidade da rede de proteção{/}.'
    ],[
      'Em primeiro lugar, a cultura machista naturaliza a violência.',
      '{r}Segundo a filósofa Simone de Beauvoir, "ninguém nasce mulher: torna-se',
      'mulher"{/}, ou seja, os papéis de gênero são construídos pela sociedade.',
      'Nesse sentido, a ideia de que o homem tem posse sobre a companheira,',
      'transmitida por gerações, faz com que agressões sejam vistas como',
      'assunto privado, o que dificulta a denúncia e perpetua o ciclo.'
    ],[
      'Além disso, a rede de proteção às vítimas ainda é insuficiente.',
      '{r}Embora a lei preveja medidas protetivas de urgência{/}, muitas cidades',
      'não têm delegacias especializadas nem abrigos para acolher vítimas.',
      'Desse modo, a mulher que depende financeiramente do agressor teme',
      'denunciar, pois não sabe para onde ir, de modo que permanece em',
      'risco e, em muitos casos, torna-se mais uma vítima de feminicídio.'
    ],[
      'Portanto, é urgente combater a violência contra a mulher. Para',
      'isso, {p}o Ministério da Educação deve incluir o tema nas escolas, e os',
      'estados devem ampliar delegacias e abrigos, por meio de verbas',
      'federais, a fim de garantir a proteção prevista na Lei Maria da Penha{/}.'
    ]
  ],
  notas:[
    'Abre com a lei mais importante do tema, citando o ano.',
    'D1 trata da causa cultural com repertório filosófico; D2 trata da causa estrutural com a própria lei.',
    '"Embora" + subjuntivo ("preveja") e "têm" no plural: atenção ao critério 4.',
    'A conclusão tem dois agentes, cada um ligado a um desenvolvimento, e retoma a lei da introdução.'
  ]
},
{
  id:'m3', curto:'Crimes cibernéticos',
  tema:'Caminhos para combater os crimes cibernéticos no Brasil',
  tipo:'Tema de "caminhos" → duas causas + solução na conclusão',
  p:[
    [
      '{r}O Pix, criado pelo Banco Central em 2020, tornou os pagamentos',
      'instantâneos{/} e facilitou a vida dos brasileiros. No entanto, essa',
      'agilidade também favoreceu o avanço dos crimes cibernéticos, {t}que',
      'persistem devido à falta de educação digital e ao anonimato virtual{/}.'
    ],[
      'Em primeiro lugar, grande parte da população não sabe se proteger',
      'no ambiente virtual. {r}Embora a Lei Geral de Proteção de Dados, de 2018,',
      'regule o uso de informações pessoais{/}, golpes como o do falso parente',
      'exploram a confiança e a pressa das vítimas, sobretudo dos idosos.',
      'Nesse sentido, sem orientação sobre senhas, links e dados pessoais,',
      'o cidadão torna-se alvo fácil e perde economias de toda uma vida.'
    ],[
      'Além disso, a sensação de anonimato estimula os criminosos. {r}De',
      'acordo com o sociólogo Zygmunt Bauman, as relações na modernidade',
      'líquida são frágeis e distantes{/}, o que facilita enganar estranhos.',
      'Sob essa ótica, o golpista age de outro estado ou país, usa contas',
      'de terceiros e acredita que não será identificado, de modo que a',
      'investigação se torna lenta e muitas vítimas desistem de denunciar.'
    ],[
      'Portanto, é necessário enfrentar os crimes cibernéticos. Para isso,',
      '{p}o Governo Federal deve promover campanhas de educação digital, em',
      'parceria com bancos e escolas, e ampliar delegacias especializadas,',
      'a fim de proteger os cidadãos e punir os autores desses golpes{/}.'
    ]
  ],
  notas:[
    'Abertura com fato concreto e atual (o Pix) que leva ao problema.',
    'Tese com duas causas claras: falta de educação digital (D1) e anonimato (D2).',
    'O D1 usa uma lei (LGPD) e um exemplo do cotidiano; o D2 usa um sociólogo.',
    'A proposta responde às duas causas: educação digital e investigação especializada.'
  ]
},
{
  id:'m4', curto:'Polícia comunitária',
  tema:'A importância da aproximação entre a polícia e a comunidade',
  tipo:'Tema de "importância" → dois benefícios',
  p:[
    [
      '{r}Em 1829, o britânico Robert Peel afirmou que "a polícia é o público',
      'e o público é a polícia"{/}, ideia que inspira o policiamento comunitário.',
      'Essa aproximação é essencial no Brasil, {t}sobretudo por fortalecer a',
      'confiança da população e por tornar a prevenção do crime mais eficaz{/}.'
    ],[
      'Em primeiro lugar, {r}a Constituição de 1988 define, no artigo 144, a',
      'segurança pública como "dever do Estado, direito e responsabilidade',
      'de todos"{/}. Sob essa ótica, quando o mesmo policial atua no bairro',
      'por longo tempo, moradores e comerciantes passam a vê-lo como aliado',
      'e colaboram com informações, o que agiliza investigações e reduz o',
      'espaço para o domínio de grupos criminosos sobre a comunidade.'
    ],[
      'Além disso, o policiamento comunitário torna a prevenção eficaz.',
      '{r}No Japão, os "kobans", pequenos postos policiais de bairro, são',
      'apontados como um dos fatores dos baixos índices de violência{/} do',
      'país. Nesse contexto, o policial próximo identifica conflitos, brigas',
      'e pontos de risco antes que se tornem crimes, de modo que muitas',
      'ocorrências são evitadas e a sensação de segurança cresce no bairro.'
    ],[
      'Portanto, aproximar polícia e comunidade é indispensável. Para isso,',
      '{p}a Secretaria de Defesa Social de Pernambuco deve ampliar as bases',
      'comunitárias, por meio de policiais fixos nos bairros e reuniões com',
      'moradores, a fim de fortalecer a confiança e a segurança de todos{/}.'
    ]
  ],
  notas:[
    'Tema positivo ("importância"): os argumentos são benefícios, não problemas.',
    'Citação com autor e data, um repertório clássico da atividade policial.',
    'O D1 usa a Constituição; o D2 usa um exemplo internacional (Japão).',
    'A proposta é local (SDS-PE), concreta e detalhada.'
  ]
},
{
  id:'m5', curto:'Trânsito',
  tema:'Os desafios para reduzir as mortes no trânsito brasileiro',
  tipo:'Tema de "desafios" → dois obstáculos',
  p:[
    [
      '{r}Segundo a Organização Mundial da Saúde, os acidentes de trânsito',
      'são a principal causa de morte de crianças e jovens de 5 a 29 anos{/}.',
      'No Brasil, esse cenário persiste, {t}sobretudo devido à imprudência',
      'dos condutores e à fiscalização insuficiente nas vias{/}.'
    ],[
      'Em primeiro lugar, a imprudência transforma o veículo em arma.',
      '{r}Embora a Lei Seca, de 2008, tenha estabelecido tolerância zero ao',
      'álcool na direção{/}, muitos motoristas ainda bebem, usam o celular e',
      'excedem a velocidade. Isso ocorre porque prevalece a ideia de que',
      '"comigo não acontece", o que leva a colisões graves e a mortes que',
      'poderiam ser evitadas com atitudes simples de respeito às leis.'
    ],[
      'Além disso, a fiscalização insuficiente reforça a impunidade. {r}A ONU',
      'definiu 2021-2030 como a Década de Ação pela Segurança no Trânsito,',
      'com a meta de reduzir as mortes pela metade{/}. Contudo, quando blitze',
      'e radares são raros, o condutor infrator não teme ser flagrado e',
      'repete o erro, de modo que as regras perdem força e as infrações se',
      'tornam rotina, especialmente entre os motociclistas, os mais expostos.'
    ],[
      'Portanto, reduzir as mortes no trânsito exige ação conjunta. Para',
      'isso, {p}o Detran e as polícias devem ampliar a fiscalização e as',
      'campanhas do Maio Amarelo, por meio de blitze e aulas nas escolas, a',
      'fim de formar condutores conscientes e preservar vidas{/}.'
    ]
  ],
  notas:[
    'Abre com um dado da OMS, citando a fonte, sem inventar números.',
    'D1 (comportamento) usa uma lei; D2 (fiscalização) usa uma meta internacional da ONU.',
    '"Isso ocorre porque" introduz a explicação, a parte que mais pesa no critério 1.',
    'A proposta liga escola e fiscalização, respondendo aos dois argumentos.'
  ]
},
{
  id:'m6', curto:'Saúde mental do policial',
  tema:'A importância do cuidado com a saúde mental dos policiais',
  tipo:'Tema de "importância" → dois benefícios',
  p:[
    [
      '{r}A Lei 14.531, de 2023, instituiu ações de promoção da saúde mental e',
      'de prevenção do suicídio entre profissionais de segurança pública{/}.',
      'Esse cuidado é indispensável, {t}pois protege a vida de quem protege a',
      'sociedade e melhora a qualidade do serviço prestado à população{/}.'
    ],[
      'Em primeiro lugar, a rotina policial expõe o profissional a traumas.',
      'Confrontos, mortes e escalas exaustivas geram estresse contínuo, e o',
      '{r}filósofo Byung-Chul Han, em "Sociedade do Cansaço", alerta que a',
      'cobrança excessiva por desempenho produz esgotamento e depressão{/}.',
      'Sob essa ótica, sem apoio psicológico, muitos policiais adoecem em',
      'silêncio, o que eleva os casos de afastamento e até de suicídio.'
    ],[
      'Além disso, a saúde mental do agente reflete no serviço prestado.',
      'Um profissional esgotado tem mais dificuldade de controlar emoções,',
      'decidir sob pressão e dialogar com o cidadão em uma ocorrência. Nesse',
      'contexto, {r}a Constituição, no artigo 196, define a saúde como direito',
      'de todos{/}, inclusive de quem veste a farda, de modo que cuidar dela é',
      'também uma forma de garantir uma atuação policial técnica e segura.'
    ],[
      'Portanto, a saúde mental do policial deve ser prioridade. Para isso,',
      '{p}o Governo do Estado deve garantir atendimento psicológico periódico',
      'e sigiloso, por meio de núcleos de apoio nas unidades, a fim de',
      'prevenir o adoecimento e fortalecer a segurança de toda a sociedade{/}.'
    ]
  ],
  notas:[
    'Tema "da casa": abre com a lei específica sobre a saúde mental do profissional de segurança.',
    'Os dois benefícios da tese viram os dois desenvolvimentos: proteger o policial (D1) e melhorar o serviço (D2).',
    'O D2 liga o tema ao cidadão, mostrando que cuidar do policial também é cuidar da sociedade.',
    'Proposta concreta: atendimento periódico e sigiloso, que responde ao estigma de pedir ajuda.'
  ]
},
{
  id:'m7', curto:'Tráfico e juventude',
  tema:'O aliciamento de jovens pelo tráfico de drogas',
  tipo:'Tema de problema → duas causas',
  p:[
    [
      '{r}O filme "Cidade de Deus" retrata crianças que, sem escola e sem',
      'perspectiva, são atraídas pelo tráfico em uma comunidade carioca{/}.',
      'Essa realidade ainda se repete no Brasil, {t}sobretudo pela falta de',
      'oportunidades para os jovens e pela ausência do Estado nas periferias{/}.'
    ],[
      'Em primeiro lugar, a falta de oportunidades torna o crime atraente.',
      '{r}A Constituição determina, no artigo 227, que o jovem deve receber',
      '"absoluta prioridade" da família, da sociedade e do Estado{/}. Contudo,',
      'a evasão escolar e o desemprego deixam muitos adolescentes sem renda',
      'e sem perspectiva, de modo que a promessa de dinheiro rápido feita',
      'pelo tráfico parece, para eles, o único caminho possível.'
    ],[
      'Além disso, a ausência do Estado abre espaço para o tráfico.',
      '{r}Segundo o sociólogo Émile Durkheim, quando as normas perdem força,',
      'instala-se a anomia{/}, o que favorece o desvio de conduta. Nesse',
      'sentido, em bairros sem praças, cultura e serviços públicos, o',
      'traficante passa a impor as próprias regras e a oferecer falsa',
      'proteção, o que transforma crianças em mão de obra para o crime.'
    ],[
      'Portanto, é preciso afastar os jovens do tráfico. Para isso, {p}os',
      'estados e os municípios devem ampliar escolas em tempo integral e',
      'programas como o Proerd, por meio de esporte, cultura e cursos',
      'profissionalizantes, a fim de oferecer um futuro longe do crime{/}.'
    ]
  ],
  notas:[
    'Abertura com obra cultural (filme), descrita em uma frase e ligada ao tema.',
    'D1 usa a Constituição para mostrar a distância entre a lei e a realidade.',
    'D2 usa um conceito sociológico (anomia) e explica como ele aparece no bairro.',
    'A proposta cita o Proerd, programa que a própria PM executa nas escolas.'
  ]
},
{
  id:'m8', curto:'Notícias falsas',
  tema:'Os impactos das notícias falsas na sociedade brasileira',
  tipo:'Tema de "impactos" → duas consequências',
  p:[
    [
      '{r}Em 2016, o Dicionário Oxford elegeu "pós-verdade" como a palavra do',
      'ano, termo que indica o predomínio da emoção sobre os fatos{/}. No',
      'Brasil, as notícias falsas {t}provocam pânico e violência e enfraquecem a',
      'confiança da população nas instituições públicas{/}.'
    ],[
      'Em primeiro lugar, boatos difundidos nas redes geram violência.',
      'Mensagens falsas sobre supostos criminosos já motivaram linchamentos',
      'de pessoas inocentes, confundidas com suspeitos por desconhecidos.',
      '{r}Segundo o sociólogo Zygmunt Bauman, a modernidade líquida é marcada',
      'por medos difusos{/}, e a desinformação explora esse medo, de modo que',
      'parte da população reage com fúria antes de verificar a verdade.'
    ],[
      'Além disso, a desinformação enfraquece a confiança nas instituições.',
      '{r}O documentário "O Dilema das Redes" mostra que os algoritmos',
      'privilegiam conteúdos que geram engajamento, ainda que falsos{/}.',
      'Nesse contexto, notícias inventadas sobre a polícia, a saúde ou as',
      'eleições se espalham mais rápido que os desmentidos, o que reduz a',
      'credibilidade de órgãos essenciais para a vida em sociedade.'
    ],[
      'Portanto, é necessário combater as notícias falsas. Para isso, {p}o',
      'Ministério da Educação deve incluir a educação midiática nas escolas,',
      'por meio de aulas sobre checagem de fontes, a fim de formar cidadãos',
      'capazes de identificar a desinformação antes de compartilhá-la{/}.'
    ]
  ],
  notas:[
    'Tema de "impactos": os desenvolvimentos são consequências, e não causas.',
    'O D1 traz um exemplo concreto (linchamentos) antes do repertório, o que deixa o argumento palpável.',
    'O D2 usa uma obra (documentário) para explicar o mecanismo dos algoritmos.',
    'A proposta aposta em educação, e não em censura, o tom mais seguro para o tema.'
  ]
},
{
  id:'m9', curto:'Câmeras corporais',
  tema:'O uso de câmeras corporais na atividade policial',
  tipo:'Tema com dois lados → posição favorável com condições',
  p:[
    [
      '{r}Para o sociólogo Max Weber, o Estado detém o monopólio do uso',
      'legítimo da força{/}, que deve ser exercido dentro da lei. Nesse sentido,',
      '{t}as câmeras corporais são aliadas da atividade policial, pois',
      'protegem cidadãos e policiais e qualificam a produção de provas{/}.'
    ],[
      'Em primeiro lugar, as câmeras protegem os dois lados da abordagem.',
      '{r}Estudos sobre a Polícia Militar de São Paulo associaram o uso do',
      'equipamento à redução de mortes em intervenções policiais{/}. Isso',
      'ocorre porque o registro estimula condutas técnicas e inibe agressões',
      'contra os agentes, além de afastar denúncias falsas, de modo que a',
      'confiança entre a população e a corporação tende a crescer.'
    ],[
      'Além disso, as gravações qualificam a produção de provas. Imagens de',
      'uma prisão em flagrante, por exemplo, reforçam o depoimento policial',
      'e reduzem dúvidas no processo judicial. {r}Como defendia Cesare',
      'Beccaria, a certeza da punição é mais eficaz que a severidade da pena{/},',
      'e provas sólidas aumentam essa certeza, o que diminui a impunidade e',
      'valoriza o trabalho de quem atua nas ruas.'
    ],[
      'Portanto, o uso de câmeras corporais deve ser ampliado. Para isso,',
      '{p}a Secretaria de Defesa Social deve adotar protocolos claros de',
      'uso e armazenamento das imagens, por meio de treinamento e respeito à',
      'LGPD, a fim de garantir transparência e segurança a todos{/}.'
    ]
  ],
  notas:[
    'Tema que divide opiniões: a tese escolhe um lado e mostra que ele beneficia também o policial.',
    'O D1 usa um estudo real sem inventar porcentagens.',
    'O D2 mostra o benefício jurídico (provas) e liga ao combate à impunidade.',
    'A proposta inclui limites (protocolos e LGPD), o que mostra equilíbrio.'
  ]
},
{
  id:'m10', curto:'Ressocialização',
  tema:'Os desafios para a ressocialização de presos no Brasil',
  tipo:'Tema de "desafios" → dois obstáculos',
  p:[
    [
      '{r}A Lei de Execução Penal determina que a pena deve proporcionar',
      'condições para a harmônica integração social do condenado{/}. Entretanto,',
      'a ressocialização ainda é rara no país, {t}sobretudo devido à',
      'superlotação dos presídios e à falta de estudo e trabalho no cárcere{/}.'
    ],[
      'Em primeiro lugar, a superlotação transforma prisões em escolas do',
      'crime. {r}O Brasil possui uma das maiores populações carcerárias do',
      'mundo{/}, e celas lotadas facilitam o domínio de facções sobre os',
      'detentos. {r}Michel Foucault, em "Vigiar e Punir", já apontava que a',
      'prisão pode produzir delinquência em vez de recuperar{/}. Desse modo,',
      'muitos presos saem mais ligados ao crime do que quando entraram.'
    ],[
      'Além disso, a falta de estudo e trabalho dificulta o recomeço. {r}Como',
      'afirmou o educador Paulo Freire, a educação muda pessoas, e pessoas',
      'transformam o mundo{/}. Contudo, sem qualificação e com o estigma de',
      'ex-detento, o egresso encontra portas fechadas no mercado, de modo',
      'que muitos voltam ao crime e a violência continua a atingir a',
      'população que deveria ser protegida pelo sistema penal.'
    ],[
      'Portanto, a ressocialização precisa sair do papel. Para isso, {p}os',
      'governos estaduais devem ampliar vagas e oferecer estudo e trabalho',
      'nos presídios, por meio de parcerias com escolas e empresas, a fim',
      'de reduzir a reincidência e aumentar a segurança da sociedade{/}.'
    ]
  ],
  notas:[
    'Abre com a lei que define o objetivo da pena e mostra o contraste com a realidade.',
    'O D1 combina um dado e um pensador no mesmo parágrafo, sem perder o tamanho de 6 linhas.',
    'O D2 usa Paulo Freire, pernambucano, ligado à solução (educação).',
    'A conclusão deixa claro que ressocializar é uma medida de segurança pública, e não de benevolência.'
  ]
},
{
  id:'m11', curto:'Educação e prevenção',
  tema:'A educação como ferramenta de prevenção da violência',
  tipo:'Tema de "importância" → dois benefícios',
  p:[
    [
      '{r}Segundo Nelson Mandela, "a educação é a arma mais poderosa que você',
      'pode usar para mudar o mundo"{/}. No contexto da segurança pública,',
      '{t}a escola é essencial, pois amplia as oportunidades dos jovens e',
      'forma cidadãos que respeitam direitos e deveres{/}.'
    ],[
      'Em primeiro lugar, a educação abre caminhos longe do crime. {r}O',
      'Atlas da Violência mostra que a maioria das vítimas de homicídio no',
      'país é jovem{/}, grupo em que a evasão escolar é frequente. Nesse',
      'sentido, o jovem que conclui os estudos e se qualifica tem mais',
      'chances de conseguir emprego, o que reduz a atração exercida pelo',
      'tráfico e por outras atividades ilegais nas periferias.'
    ],[
      'Além disso, a escola forma valores de convivência e respeito. {r}O',
      'artigo 205 da Constituição afirma que a educação deve preparar a',
      'pessoa para o exercício da cidadania{/}. Sob essa ótica, aulas que',
      'tratam de diálogo, tolerância e respeito às leis ajudam a prevenir',
      'conflitos, bullying e violência doméstica, de modo que a escola atua',
      'antes que o problema chegue às delegacias.'
    ],[
      'Portanto, investir em educação é investir em segurança. Para isso,',
      '{p}os estados devem ampliar as escolas em tempo integral e manter',
      'parcerias com a Polícia Militar, por meio de programas como o',
      'Proerd, a fim de afastar os jovens da violência e das drogas{/}.'
    ]
  ],
  notas:[
    'Citação famosa e curta na abertura, ligada logo em seguida ao recorte (segurança pública).',
    'O D1 trata do benefício econômico (oportunidades); o D2, do benefício social (valores).',
    'O fechamento do D2 ("antes que o problema chegue às delegacias") reforça a ideia de prevenção.',
    'A conclusão começa com uma frase de efeito curta e depois traz a proposta completa.'
  ]
},
{
  id:'m12', curto:'Maioridade penal',
  tema:'A redução da maioridade penal como solução para a violência',
  tipo:'Tema polêmico → posição contrária, fundamentada na Constituição',
  p:[
    [
      '{r}A Constituição Federal, no artigo 228, determina que os menores de',
      '18 anos são penalmente inimputáveis{/}. Embora a proposta de reduzir',
      'essa idade ganhe apoio diante da violência, {t}ela não resolve o',
      'problema, pois ignora suas causas sociais e a falência das prisões{/}.'
    ],[
      'Em primeiro lugar, a medida não ataca as causas da criminalidade',
      'juvenil. {r}No livro "Capitães da Areia", Jorge Amado retrata meninos',
      'abandonados que entram no crime por falta de família e de escola{/}.',
      'Nesse sentido, o adolescente infrator costuma ser, antes, vítima da',
      'evasão escolar e do aliciamento, de modo que puni-lo mais cedo não',
      'impede que outros jovens sejam recrutados pelo crime organizado.'
    ],[
      'Além disso, o sistema prisional não recupera nem os adultos. {r}O',
      'Brasil possui uma das maiores populações carcerárias do mundo{/}, com',
      'celas superlotadas e dominadas por facções. Sob essa ótica, colocar',
      'adolescentes nesse ambiente os aproximaria de criminosos experientes,',
      'o que tende a aumentar a reincidência e a violência, em vez de',
      'garantir a segurança desejada pela população.'
    ],[
      'Portanto, a redução da maioridade penal não é a solução. Em vez',
      'disso, {p}o Estado deve aplicar com rigor as medidas socioeducativas',
      'do ECA e ampliar a educação integral, por meio de investimento',
      'contínuo, a fim de responsabilizar o infrator e prevenir novos crimes{/}.'
    ]
  ],
  notas:[
    'Tema polêmico: a introdução reconhece o outro lado ("ganhe apoio diante da violência") antes da tese.',
    'A posição escolhida é a que tem base constitucional, a mais segura para uma prova de carreira policial.',
    'Os dois argumentos atacam a eficácia da medida, sem minimizar a violência.',
    'A proposta não é "não fazer nada": defende responsabilizar o infrator pelo ECA.'
  ]
}
];
