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
},
{
  id:'m13', curto:'Apostas on-line',
  tema:'Os impactos das apostas on-line na sociedade brasileira',
  tipo:'Tema de "impactos" → duas consequências',
  p:[
    [
      '{r}A Lei 14.790, de 2023, regulamentou as apostas de quota fixa, as',
      'chamadas "bets"{/}, que se popularizaram com a promessa de lucro fácil.',
      'Esse crescimento preocupa, {t}pois as apostas provocam endividamento',
      'e vício e podem ser usadas pelo crime para lavar dinheiro{/}.'
    ],[
      'Em primeiro lugar, as apostas levam famílias ao endividamento.',
      'A publicidade constante, inclusive com celebridades, vende a ideia de',
      'que é possível enriquecer com poucos cliques. {r}Para o filósofo',
      'Byung-Chul Han, a sociedade do desempenho produz sujeitos ansiosos e',
      'esgotados{/}, o que torna o apostador vulnerável à compulsão, de modo',
      'que salários e até benefícios sociais são consumidos pelo jogo.'
    ],[
      'Além disso, as plataformas podem servir ao crime organizado. Sites',
      'sem autorização movimentam dinheiro sem controle, o que facilita a',
      'lavagem de recursos do tráfico e de golpes. {r}Segundo Émile Durkheim,',
      'quando as normas perdem força, instala-se a anomia{/}, e o ambiente',
      'virtual pouco fiscalizado favorece fraudes, como a manipulação de',
      'resultados esportivos, que prejudica apostadores e o próprio esporte.'
    ],[
      'Portanto, é preciso conter os danos das apostas on-line. Para isso,',
      '{p}o Ministério da Fazenda deve bloquear os sites ilegais e limitar a',
      'publicidade, em parceria com as polícias, a fim de proteger as',
      'famílias e impedir que o setor seja usado para lavar dinheiro{/}.'
    ]
  ],
  notas:[
    'Tema atual: a introdução já apresenta a lei que regulamentou o setor.',
    'O D1 trata do dano social (dívidas e vício); o D2 liga o tema à segurança pública (lavagem de dinheiro).',
    'Os repertórios filosóficos são explicados e aplicados ao apostador e ao ambiente virtual.',
    'A proposta tem dois focos, um para cada argumento: proteger as famílias e asfixiar o crime.'
  ]
},
{
  id:'m14', curto:'Inteligência artificial',
  tema:'Os riscos da inteligência artificial para a segurança e a privacidade',
  tipo:'Tema de "riscos" → duas ameaças',
  p:[
    [
      '{r}No romance "1984", George Orwell descreve uma sociedade vigiada o',
      'tempo todo pelo "Grande Irmão"{/}. Com a inteligência artificial, parte',
      'dessa ficção se aproxima da realidade, {t}sobretudo pela facilidade de',
      'criar fraudes digitais e pela ameaça à privacidade dos cidadãos{/}.'
    ],[
      'Em primeiro lugar, a IA facilita a criação de fraudes convincentes.',
      'Vídeos e áudios falsos, os chamados "deepfakes", imitam a voz e o',
      'rosto de pessoas reais e já são usados em golpes e extorsões. {r}Embora',
      'a Lei 14.155, de 2021, tenha endurecido as penas das fraudes eletrônicas{/},',
      'a vítima dificilmente percebe a farsa, e a investigação depende de',
      'perícia especializada, o que torna a punição lenta e rara.'
    ],[
      'Além disso, a coleta massiva de dados ameaça a privacidade. Sistemas',
      'de IA dependem de grandes volumes de informações pessoais, muitas',
      'vezes coletadas sem que o usuário saiba. {r}A Lei Geral de Proteção de',
      'Dados, de 2018, exige transparência no uso dessas informações{/}, mas',
      'a fiscalização ainda é limitada, de modo que dados vazados alimentam',
      'golpes e expõem a intimidade de milhões de brasileiros.'
    ],[
      'Portanto, a inteligência artificial requer cautela. Para isso,',
      '{p}o Congresso Nacional deve regulamentar a tecnologia e responsabilizar',
      'as plataformas, e as polícias devem investir em perícia digital, a',
      'fim de proteger os cidadãos sem impedir o avanço tecnológico{/}.'
    ]
  ],
  notas:[
    'Abertura com obra literária clássica ligada à ideia de vigilância.',
    'O D1 explica o que é deepfake antes de usar o termo, como deve ser feito com palavras técnicas.',
    'Os dois desenvolvimentos usam leis brasileiras recentes, sem números inventados.',
    'A conclusão reconhece o valor da tecnologia ("sem impedir o avanço"), o que mostra equilíbrio.'
  ]
},
{
  id:'m15', curto:'Telas na infância',
  tema:'O uso excessivo de celulares e telas por crianças e adolescentes',
  tipo:'Tema de problema → duas consequências',
  p:[
    [
      '{r}Em 2025, a Lei 15.100 restringiu o uso de celulares nas escolas de',
      'educação básica{/}, reconhecendo um problema que vai além da sala de aula.',
      'O uso excessivo de telas {t}prejudica a saúde mental e o aprendizado',
      'dos jovens e os expõe a riscos no ambiente virtual{/}.'
    ],[
      'Em primeiro lugar, o excesso de telas afeta a mente e os estudos.',
      'Horas diante do celular reduzem o sono, a concentração e o convívio',
      'com a família. {r}Para o filósofo Byung-Chul Han, o excesso de',
      'estímulos gera uma atenção dispersa e cansada{/}. Nesse sentido, a',
      'criança troca a leitura e as brincadeiras pela rolagem infinita, o',
      'que compromete o aprendizado e favorece a ansiedade.'
    ],[
      'Além disso, a internet sem supervisão expõe os jovens a perigos.',
      'Crianças e adolescentes acessam conteúdos violentos, sofrem ataques',
      'de colegas e podem ser abordados por criminosos que se passam por',
      'amigos. {r}Desde 2024, a Lei 14.811 tipifica o cyberbullying como',
      'crime{/}, mas muitos pais desconhecem o que os filhos fazem on-line, de',
      'modo que os casos só são descobertos quando o dano já ocorreu.'
    ],[
      'Portanto, o uso das telas na infância precisa de limites. Para isso,',
      '{p}as escolas devem oferecer educação digital, e as famílias devem',
      'usar controle parental e horários definidos, por meio de orientação',
      'das próprias escolas, a fim de garantir uma infância saudável e segura{/}.'
    ]
  ],
  notas:[
    'A introdução usa uma lei de 2025, mostrando que o candidato acompanha o noticiário.',
    'O D1 trata da saúde e do aprendizado; o D2, da segurança no ambiente virtual.',
    'O D2 descreve riscos concretos antes de citar a lei, o que deixa o argumento claro.',
    'A proposta divide responsabilidades entre escola e família, sem demonizar a tecnologia.'
  ]
},
{
  id:'m16', curto:'Valorização do policial',
  tema:'A valorização do profissional de segurança pública',
  tipo:'Tema de "importância" → dois benefícios',
  p:[
    [
      '{r}O artigo 144 da Constituição define a segurança pública como',
      '"dever do Estado, direito e responsabilidade de todos"{/}. Para cumprir',
      'esse dever, {t}valorizar o policial é essencial, pois melhora o serviço',
      'prestado e protege a saúde de quem protege a sociedade{/}.'
    ],[
      'Em primeiro lugar, a valorização torna o serviço mais eficiente.',
      'Formação continuada, equipamentos modernos e salário digno permitem',
      'que o policial atue com técnica e segurança. {r}A Lei Orgânica Nacional',
      'das Polícias Militares, de 2023, reforçou a importância de garantir',
      'direitos e condições de trabalho a esses profissionais{/}, de modo que',
      'a qualidade do atendimento ao cidadão depende desse investimento.'
    ],[
      'Além disso, valorizar o policial é cuidar de quem arrisca a vida.',
      'Escalas exaustivas e a exposição constante à violência adoecem muitos',
      'agentes. {r}Embora a Lei 14.531, de 2023, preveja ações de saúde mental',
      'para esses profissionais{/}, o atendimento ainda é insuficiente. Nesse',
      'contexto, cresce o número de afastamentos, o que reduz o efetivo nas',
      'ruas e prejudica a segurança de toda a sociedade.'
    ],[
      'Portanto, valorizar o policial é investir em segurança. Para isso,',
      '{p}o Governo do Estado deve garantir formação, equipamentos, salário',
      'digno e apoio psicológico, por meio de um plano de carreira claro,',
      'a fim de oferecer à população um serviço policial eficiente e humano{/}.'
    ]
  ],
  notas:[
    'Tema "da casa": mostra conhecimento da carreira sem soar como reclamação.',
    'A tese liga o policial ao cidadão: valorizar o agente melhora o serviço para todos.',
    'Os dois desenvolvimentos usam leis de 2023 sobre a carreira e a saúde do profissional.',
    'O fechamento do D2 transforma o problema individual (afastamentos) em problema coletivo (menos efetivo).'
  ]
},
{
  id:'m17', curto:'Violência nas escolas',
  tema:'A violência nas escolas e o bullying',
  tipo:'Tema de problema → duas causas',
  p:[
    [
      '{r}Segundo o educador Paulo Freire, a educação muda pessoas, e pessoas',
      'transformam o mundo{/}. No entanto, a violência nas escolas brasileiras',
      'compromete essa missão, {t}sobretudo pela intolerância naturalizada',
      'entre os alunos e pela falta de apoio psicológico nas instituições{/}.'
    ],[
      'Em primeiro lugar, a intolerância é tratada como brincadeira.',
      'Apelidos ofensivos, exclusão e humilhações, presenciais ou virtuais,',
      'muitas vezes são ignorados por colegas e adultos. {r}Desde 2024, a',
      'Lei 14.811 tipifica o bullying e o cyberbullying como crimes{/}, o que',
      'mostra a gravidade do problema, já que a vítima pode adoecer ou',
      'reagir com violência, ampliando o ciclo de agressões na escola.'
    ],[
      'Além disso, faltam profissionais para acolher os estudantes. Muitas',
      'escolas não contam com psicólogos nem assistentes sociais, embora',
      '{r}a Lei 13.935, de 2019, preveja esses serviços na rede pública{/}.',
      'Nesse sentido, sinais de sofrimento passam despercebidos, de modo que',
      'conflitos simples evoluem para agressões e, em casos extremos, para',
      'ataques que chocam o país.'
    ],[
      'Portanto, é urgente combater a violência nas escolas. Para isso, {p}as',
      'secretarias de educação devem contratar psicólogos e assistentes',
      'sociais e promover rodas de diálogo, com apoio da ronda escolar, a',
      'fim de transformar a escola em um espaço seguro e acolhedor{/}.'
    ]
  ],
  notas:[
    'Abertura com o educador pernambucano, ligada ao papel da escola.',
    'D1 (causa cultural) e D2 (causa estrutural) seguem a ordem anunciada na tese.',
    'O D2 cita uma lei pouco conhecida (13.935/2019), o que impressiona o corretor se usada com precisão.',
    'A proposta combina acolhimento (psicólogos) e segurança (ronda escolar), sem exageros.'
  ]
},
{
  id:'m18', curto:'Direitos humanos',
  tema:'Direitos humanos e atividade policial',
  tipo:'Tema de relação → dois motivos para conciliar',
  p:[
    [
      '{r}Segundo Norberto Bobbio, o desafio atual dos direitos humanos não é',
      'justificá-los, mas protegê-los{/}. Nesse cenário, a polícia ocupa papel',
      'central, e {t}respeitar esses direitos fortalece a atividade policial,',
      'pois garante legitimidade à corporação e protege o próprio policial{/}.'
    ],[
      'Em primeiro lugar, a atuação legal gera confiança da população.',
      '{r}Max Weber afirma que o Estado detém o monopólio do uso legítimo',
      'da força{/}, ou seja, a força só é aceita quando segue a lei. Desse modo,',
      'abordagens técnicas e proporcionais aproximam o cidadão da polícia, o',
      'que aumenta as denúncias e a colaboração, enquanto abusos afastam a',
      'comunidade e favorecem o domínio de criminosos sobre os bairros.'
    ],[
      'Além disso, os direitos humanos também protegem quem veste a farda.',
      '{r}A Declaração Universal dos Direitos Humanos, de 1948, garante a todo',
      'ser humano o direito à vida e à segurança pessoal{/}, inclusive aos',
      'policiais. Nesse sentido, condições dignas de trabalho, equipamentos',
      'de proteção e atenção à saúde mental são direitos desses agentes, de',
      'modo que a defesa dos direitos humanos não se opõe à polícia.'
    ],[
      'Portanto, direitos humanos e polícia caminham juntos. Para isso,',
      '{p}as academias de polícia devem reforçar a formação em uso progressivo',
      'da força e direitos humanos, por meio de cursos contínuos, a fim de',
      'garantir uma atuação legal, eficiente e segura{/}.'
    ]
  ],
  notas:[
    'O tema mais delicado para um futuro policial: a tese mostra que direitos humanos fortalecem a polícia.',
    'O D1 usa Weber para explicar por que a força precisa ser legal para ser aceita.',
    'O D2 vira o jogo: os direitos humanos também protegem o próprio policial.',
    'A proposta fala em uso progressivo da força, termo técnico da formação policial.'
  ]
},
{
  id:'m19', curto:'Chuvas e desastres',
  tema:'Os desafios para prevenir desastres causados pelas chuvas',
  tipo:'Tema de "desafios" → duas causas',
  p:[
    [
      '{r}Em maio de 2022, chuvas intensas causaram deslizamentos no Recife e',
      'na Região Metropolitana, com mais de cem mortes{/}. Tragédias como essa',
      'se repetem no Brasil, {t}sobretudo pela ocupação irregular de áreas de',
      'risco e pela falta de planejamento urbano nas cidades{/}.'
    ],[
      'Em primeiro lugar, a falta de moradia empurra famílias para o risco.',
      'Sem renda para pagar aluguel em áreas seguras, muitas pessoas ocupam',
      'morros e margens de rios. {r}O geógrafo Milton Santos chamou de',
      '"cidadania mutilada" a condição de quem tem direitos só no papel{/}.',
      'Sob essa ótica, o direito à moradia, previsto na Constituição, não',
      'chega a essas famílias, que ficam expostas a deslizamentos e enchentes.'
    ],[
      'Além disso, o poder público investe pouco em prevenção. Drenagem',
      'precária, obras de contenção inacabadas e sistemas de alerta pouco',
      'conhecidos agravam os efeitos das chuvas. {r}O artigo 225 da Constituição',
      'impõe ao poder público o dever de preservar o meio ambiente{/}, e o',
      'desmatamento das encostas aumenta o risco, de modo que cada temporal',
      'se transforma em uma ameaça à vida da população.'
    ],[
      'Portanto, é preciso agir antes das chuvas. Para isso, {p}as prefeituras',
      'e o governo do estado devem fazer obras de contenção e ampliar os',
      'alertas por SMS, por meio da Defesa Civil, e criar programas de',
      'moradia, a fim de retirar famílias das áreas de risco com dignidade{/}.'
    ]
  ],
  notas:[
    'Repertório local e recente (Recife, 2022): mostra que o candidato conhece a realidade de Pernambuco.',
    'O D1 trata da causa social (moradia); o D2, da causa estrutural (falta de prevenção).',
    'Milton Santos e a Constituição dão base aos dois argumentos.',
    'A proposta tem medidas imediatas (alertas, contenção) e de longo prazo (moradia).'
  ]
},
{
  id:'m20', curto:'Pessoa idosa',
  tema:'A violência contra a pessoa idosa',
  tipo:'Tema de problema → duas causas',
  p:[
    [
      '{r}O Estatuto da Pessoa Idosa, de 2003, determina que nenhuma pessoa',
      'idosa será objeto de negligência, violência ou opressão{/}. Entretanto,',
      'essa garantia é desrespeitada no Brasil, {t}sobretudo pela dependência',
      'dos idosos em relação aos familiares e pela falta de fiscalização{/}.'
    ],[
      'Em primeiro lugar, grande parte das agressões ocorre dentro de casa.',
      'Muitos idosos dependem dos filhos ou netos para cuidados e renda e,',
      'por isso, sofrem maus-tratos, abandono e abuso financeiro em silêncio.',
      '{r}Hannah Arendt chamou de "banalidade do mal" a naturalização de atos',
      'cruéis{/}, e é o que ocorre quando a família trata a violência como',
      'assunto privado, o que dificulta a denúncia e prolonga o sofrimento.'
    ],[
      'Além disso, a fiscalização e os canais de denúncia são falhos.',
      'Vizinhos, médicos e bancos nem sempre sabem como agir ao perceber',
      'sinais de abuso, e muitos idosos desconhecem o Disque 100. {r}Golpes',
      'digitais, como o do falso parente, também exploram essa população{/},',
      'de modo que a violência ganha novas formas e a proteção prevista em',
      'lei não alcança quem mais precisa dela.'
    ],[
      'Portanto, é necessário proteger a pessoa idosa. Para isso, {p}os',
      'municípios devem ampliar visitas da assistência social e centros de',
      'convivência, por meio de parcerias com as polícias, a fim de identificar',
      'os abusos cedo e garantir um envelhecimento digno{/}.'
    ]
  ],
  notas:[
    'Abre com a lei específica do tema, com o ano.',
    'O D1 usa um conceito filosófico (banalidade do mal) para explicar o silêncio da família.',
    'O D2 cita um canal real de denúncia (Disque 100) e liga o tema aos golpes digitais.',
    'A proposta aposta em identificação precoce, com assistência social e polícia trabalhando juntas.'
  ]
},
{
  id:'m21', curto:'Crime organizado',
  tema:'O avanço do crime organizado e das facções criminosas no Brasil',
  tipo:'Tema de problema → duas causas',
  p:[
    [
      '{r}O filme "Tropa de Elite" retrata o poder do tráfico e a pressão',
      'que o crime organizado exerce sobre comunidades e instituições{/}. Essa',
      'realidade persiste no Brasil, {t}sobretudo pelo controle das facções',
      'dentro dos presídios e pelo combate insuficiente ao seu dinheiro{/}.'
    ],[
      'Em primeiro lugar, os presídios se tornaram centros de comando.',
      '{r}O Brasil possui uma das maiores populações carcerárias do mundo{/}, e',
      'a superlotação permite que facções recrutem presos e imponham suas',
      'regras. Nesse sentido, celulares que entram nas celas permitem que',
      'líderes ordenem crimes de dentro da prisão, de modo que a pena não',
      'interrompe a atividade criminosa, mas a fortalece.'
    ],[
      'Além disso, o dinheiro do crime circula sem controle. As facções',
      'lavam recursos do tráfico em empresas de fachada, imóveis e até',
      'apostas on-line. {r}Segundo Cesare Beccaria, a certeza da punição é',
      'mais eficaz do que a severidade da pena{/}, e, enquanto as prisões de',
      'integrantes não atingirem o patrimônio do grupo, novos membros',
      'ocuparão os lugares vagos e a organização seguirá ativa.'
    ],[
      'Portanto, é preciso enfraquecer o crime organizado. Para isso, {p}as',
      'polícias, a Receita Federal e o Ministério Público devem integrar a',
      'inteligência financeira e bloquear celulares nos presídios, a fim de',
      'cortar o comando e o dinheiro das facções{/}.'
    ]
  ],
  notas:[
    'Não cita nomes de facções: o texto fala do fenômeno, como recomenda o kit do tema.',
    'O D1 mostra o presídio como causa; o D2, o dinheiro. Cada um vira uma parte da proposta.',
    'O D2 conecta o tema a outro assunto atual (apostas on-line), o que enriquece a informatividade.',
    'A proposta é técnica: inteligência financeira e bloqueio de comunicação, sem soluções extremas.'
  ]
},
{
  id:'m22', curto:'Racismo',
  tema:'O combate ao racismo na sociedade brasileira',
  tipo:'Tema de problema → duas causas',
  p:[
    [
      '{r}O Brasil foi o último país das Américas a abolir a escravidão, em',
      '1888{/}, e a abolição não veio acompanhada de terra, escola ou trabalho.',
      'Por isso, o racismo persiste, {t}sobretudo pela herança desigual da',
      'escravidão e pela impunidade dos crimes de discriminação{/}.'
    ],[
      'Em primeiro lugar, a desigualdade criada pela escravidão permanece.',
      'Sem políticas de inclusão após 1888, a população negra foi empurrada',
      'para as periferias e para os empregos mais precários. {r}O Atlas da',
      'Violência mostra que a maioria das vítimas de homicídio no país é',
      'negra{/}, o que revela como essa herança ainda define quem vive e quem',
      'morre nas cidades brasileiras.'
    ],[
      'Além disso, a discriminação ainda é pouco punida. {r}Embora a Lei',
      '14.532, de 2023, tenha equiparado a injúria racial ao racismo{/}, muitas',
      'vítimas não denunciam por descrença na justiça, e ofensas são tratadas',
      'como "brincadeira". Nesse contexto, a impunidade naturaliza o',
      'preconceito, de modo que ele se repete nas escolas, no trabalho e',
      'nas redes sociais.'
    ],[
      'Portanto, combater o racismo exige ação contínua. Para isso, {p}as',
      'escolas devem aplicar o ensino da história afro-brasileira, e as',
      'polícias devem reforçar a formação em direitos humanos, a fim de',
      'garantir igualdade de tratamento a todos os cidadãos{/}.'
    ]
  ],
  notas:[
    'Abertura histórica com data precisa (1888), que explica a origem do problema.',
    'O D1 liga a história a um dado atual; o D2 usa uma lei de 2023 e mostra por que ela não basta.',
    'O tom é firme e respeitoso, sem acusar instituições inteiras.',
    'A proposta inclui a própria polícia, o que mostra maturidade para a carreira.'
  ]
},
{
  id:'m23', curto:'Armas de fogo',
  tema:'A ampliação do acesso às armas de fogo pela população',
  tipo:'Tema polêmico → posição contrária, com dados e lei',
  p:[
    [
      '{r}O Estatuto do Desarmamento, de 2003, estabeleceu regras rígidas',
      'para a posse e o porte de armas de fogo no Brasil{/}. Ampliar o acesso',
      'a elas, porém, {t}não garante segurança, pois torna fatais conflitos',
      'banais e favorece o desvio de armas para o crime organizado{/}.'
    ],[
      'Em primeiro lugar, a arma em casa transforma brigas em tragédias.',
      'Discussões de trânsito, desentendimentos entre vizinhos e episódios',
      'de violência doméstica podem terminar em morte quando há uma arma ao',
      'alcance. {r}Hobbes já afirmava que, sem o controle do Estado, os',
      'conflitos tendem à "guerra de todos contra todos"{/}, de modo que mais',
      'armas nas mãos da população aumentam o risco de mortes evitáveis.'
    ],[
      'Além disso, armas legais podem abastecer o crime. Armas roubadas ou',
      'desviadas de residências e empresas acabam nas mãos de criminosos,',
      'que as usam em assaltos e ataques. {r}Segundo o Atlas da Violência, a',
      'maior parte dos homicídios no país é cometida com armas de fogo{/}.',
      'Nesse sentido, quanto mais armas circulam, maior é a chance de que',
      'parte delas sirva ao crime organizado.'
    ],[
      'Portanto, ampliar o acesso às armas não é a solução. Em vez disso,',
      '{p}o Governo Federal deve manter o controle rigoroso de registros e',
      'fortalecer o rastreamento de armas, por meio da integração de dados',
      'entre as polícias, a fim de tirar armas ilegais de circulação{/}.'
    ]
  ],
  notas:[
    'Tema polêmico: a tese escolhe um lado e o defende com lei e dado, sem ironizar quem pensa diferente.',
    'O D1 usa exemplos do cotidiano policial (trânsito, vizinhos, violência doméstica).',
    'O D2 explica o caminho da arma legal até o crime, ligando o tema à segurança pública.',
    'A conclusão usa "Em vez disso" para propor uma alternativa concreta.'
  ]
},
{
  id:'m24', curto:'Violência contra crianças',
  tema:'A violência contra crianças e adolescentes',
  tipo:'Tema de problema → duas causas',
  p:[
    [
      '{r}A Constituição determina, no artigo 227, que crianças e adolescentes',
      'devem receber "absoluta prioridade" da família, da sociedade e do Estado{/}.',
      'Na prática, a violência infantil persiste, {t}sobretudo porque ocorre',
      'dentro de casa e porque a rede de proteção é falha{/}.'
    ],[
      'Em primeiro lugar, grande parte das agressões acontece no lar.',
      'O agressor costuma ser alguém próximo, e a criança, por medo ou',
      'dependência, não consegue contar o que sofre. {r}Como mostra Gilberto',
      'Dimenstein em "O Cidadão de Papel", muitos direitos existem só na lei{/}.',
      'Nesse sentido, sem alguém atento aos sinais, o abuso pode durar anos',
      'e deixar marcas físicas e emocionais profundas.'
    ],[
      'Além disso, a rede de proteção não consegue atender à demanda.',
      'Conselhos tutelares sobrecarregados e professores sem preparo para',
      'identificar sinais de abuso atrasam as denúncias. {r}O Estatuto da',
      'Criança e do Adolescente adota a doutrina da proteção integral{/}, mas, sem',
      'estrutura, essa garantia não se cumpre, de modo que muitas vítimas',
      'só recebem ajuda quando a violência já se agravou.'
    ],[
      'Portanto, proteger a infância é urgente. Para isso, {p}as escolas devem',
      'capacitar professores para identificar sinais de violência, e os',
      'municípios devem fortalecer os conselhos tutelares, a fim de',
      'garantir a prioridade absoluta prevista na Constituição{/}.'
    ]
  ],
  notas:[
    'A citação literal ("absoluta prioridade") dá força à introdução.',
    'O D1 explica por que a violência fica escondida; o D2, por que a ajuda demora.',
    'O ECA e Dimenstein mostram a distância entre a lei e a realidade, ideia central do texto.',
    'A conclusão retoma a Constituição da introdução, fechando o texto em círculo.'
  ]
},
{
  id:'m25', curto:'Assédio no transporte',
  tema:'O assédio sexual contra mulheres no transporte público',
  tipo:'Tema de problema → duas causas',
  p:[
    [
      '{r}Desde 2018, a Lei 13.718 considera crime a importunação sexual{/},',
      'prática comum em ônibus, metrôs e terminais. Ainda assim, o assédio',
      'persiste, {t}sobretudo pela cultura que objetifica o corpo feminino e',
      'pela dificuldade de denunciar no momento do crime{/}.'
    ],[
      'Em primeiro lugar, o assédio é naturalizado como algo normal.',
      '"Cantadas", olhares insistentes e toques indesejados ainda são vistos',
      'como parte da rotina das mulheres. {r}Segundo Pierre Bourdieu, a',
      'violência simbólica é a dominação aceita como natural pelos costumes{/}.',
      'Sob essa ótica, muitas vítimas mudam de horário, de roupa ou de trajeto',
      'para evitar o abuso, enquanto o agressor segue sem ser incomodado.'
    ],[
      'Além disso, denunciar no momento do crime é difícil. Em veículos',
      'lotados, a vítima sente medo e vergonha, e nem sempre há câmeras,',
      'agentes ou canais rápidos para pedir ajuda. {r}A Agenda 2030 da ONU,',
      'em seu Objetivo 5, propõe eliminar a violência contra as mulheres{/}.',
      'Contudo, sem estrutura para registrar a ocorrência, o agressor desce',
      'na parada seguinte e o crime fica impune.'
    ],[
      'Portanto, é preciso garantir a segurança das mulheres no transporte.',
      'Para isso, {p}as empresas e as polícias devem instalar câmeras nos',
      'veículos e criar canais de denúncia por aplicativo, além de campanhas',
      'educativas, a fim de punir os agressores e proteger as passageiras{/}.'
    ]
  ],
  notas:[
    'A introdução cita a lei específica e o ano, sem copiar o texto legal.',
    'O D1 mostra o efeito injusto do assédio: a vítima muda a rotina, o agressor não.',
    'O D2 descreve a cena concreta (veículo lotado, agressor que desce) para explicar a impunidade.',
    'A proposta tem tecnologia, denúncia e educação, ligadas aos dois argumentos.'
  ]
},
{
  id:'m26', curto:'Dependência química',
  tema:'Os desafios no combate à dependência química',
  tipo:'Tema de "desafios" → dois obstáculos',
  p:[
    [
      '{r}A Lei 13.840, de 2019, reforçou o acolhimento e o tratamento dos',
      'usuários de drogas no país{/}. Mesmo assim, a dependência química segue',
      'como desafio, {t}sobretudo pelo estigma que recai sobre o usuário e pela',
      'falta de tratamento acessível na rede pública{/}.'
    ],[
      'Em primeiro lugar, o estigma afasta o dependente da ajuda. Muitos',
      'veem o usuário apenas como criminoso ou como alguém "sem força de',
      'vontade", e a família esconde o problema por vergonha. {r}A Lei de',
      'Drogas, de 2006, diferencia o usuário do traficante{/}, mas esse',
      'preconceito persiste, de modo que o dependente só procura ajuda',
      'quando já perdeu emprego, laços familiares e saúde.'
    ],[
      'Além disso, o tratamento ainda é difícil de acessar. Os Centros de',
      'Atenção Psicossocial especializados em álcool e drogas são poucos',
      'diante da demanda, e as filas são longas. {r}A Constituição, no artigo',
      '196, define a saúde como direito de todos e dever do Estado{/}. Nesse',
      'contexto, quem não consegue tratamento volta às ruas e, muitas vezes,',
      'ao ciclo de dívidas com o tráfico, que alimenta a violência.'
    ],[
      'Portanto, a dependência química deve ser tratada como questão de',
      'saúde. Para isso, {p}o Ministério da Saúde deve ampliar os CAPS AD,',
      'por meio de verbas e equipes especializadas, e as escolas devem',
      'manter o Proerd, a fim de tratar quem adoeceu e prevenir novos casos{/}.'
    ]
  ],
  notas:[
    'Separa com clareza o usuário (saúde) do traficante (crime), como faz a Lei de Drogas.',
    'O D1 trata do preconceito; o D2, da falta de estrutura, cada um com uma base legal.',
    'O fechamento do D2 liga o tema à segurança pública (dívidas com o tráfico).',
    'A proposta combina tratamento (CAPS AD) e prevenção (Proerd).'
  ]
},
{
  id:'m27', curto:'Ética e corrupção',
  tema:'Ética e corrupção no serviço público',
  tipo:'Tema de problema → duas causas',
  p:[
    [
      '{r}O artigo 37 da Constituição impõe à administração pública os',
      'princípios da legalidade, impessoalidade, moralidade, publicidade e',
      'eficiência{/}. A corrupção, porém, ainda desafia o país, {t}sobretudo',
      'pela cultura de privilégios e pela impunidade{/}.'
    ],[
      'Em primeiro lugar, a cultura de privilégios favorece desvios.',
      '{r}Em "Raízes do Brasil", Sérgio Buarque de Holanda descreve o "homem',
      'cordial", que mistura o público e o privado{/}. Sob essa ótica, o',
      '"jeitinho", o favor ao conhecido e a troca de vantagens são vistos',
      'como normais, de modo que pequenas desonestidades preparam o terreno',
      'para esquemas maiores dentro das instituições.'
    ],[
      'Além disso, a impunidade estimula novos casos de corrupção.',
      'Processos longos, recursos sucessivos e penas raramente cumpridas',
      'passam a mensagem de que o crime compensa. {r}Para Rousseau, o pacto',
      'social existe para garantir o bem comum{/}, e a corrupção impune rompe',
      'esse acordo, de modo que a população perde a confiança no Estado e',
      'nos próprios agentes públicos.'
    ],[
      'Portanto, a ética deve guiar o serviço público. Para isso, {p}as',
      'corregedorias e o Ministério Público devem fortalecer a fiscalização,',
      'e os cursos de formação devem tratar de ética, a fim de garantir',
      'servidores, inclusive policiais, comprometidos com o interesse público{/}.'
    ]
  ],
  notas:[
    'Os cinco princípios do art. 37 (LIMPE) também caem na prova objetiva: vale decorar.',
    'O D1 usa um clássico da sociologia brasileira para explicar o "jeitinho".',
    'O D2 mostra a consequência mais grave: a perda de confiança no Estado.',
    'Não cita políticos nem partidos, e a proposta inclui a própria polícia.'
  ]
},
{
  id:'m28', curto:'Seca no Sertão',
  tema:'Os desafios da convivência com a seca no Sertão',
  tipo:'Tema de "desafios" → dois obstáculos',
  p:[
    [
      '{r}Em "Vidas Secas", Graciliano Ramos retrata a família de Fabiano,',
      'obrigada a fugir da seca em busca de sobrevivência{/}. Décadas depois, o',
      'sertanejo ainda sofre com a estiagem, {t}sobretudo pela má distribuição',
      'da água e pela falta de políticas permanentes para o semiárido{/}.'
    ],[
      'Em primeiro lugar, a água ainda é mal distribuída no semiárido.',
      'Muitas comunidades rurais dependem de carros-pipa e de açudes que',
      'secam nos meses mais quentes. {r}A transposição do Rio São Francisco',
      'levou água a regiões de Pernambuco e de outros estados do Nordeste{/},',
      'mas os ramais e as adutoras ainda não chegam a muitas localidades, de',
      'modo que famílias inteiras seguem sem acesso regular à água.'
    ],[
      'Além disso, o poder público age mais na emergência do que na',
      'prevenção. {r}O pernambucano Josué de Castro mostrou que a fome é',
      'resultado de escolhas sociais, e não da natureza{/}. Sob essa ótica,',
      'a seca só vira tragédia quando faltam cisternas, apoio técnico ao',
      'agricultor e crédito para culturas adaptadas, o que mantém o ciclo',
      'de perdas, endividamento e migração para as grandes cidades.'
    ],[
      'Portanto, é preciso conviver com o semiárido de forma permanente.',
      'Para isso, {p}os governos devem concluir as obras hídricas e ampliar',
      'o programa de cisternas, por meio de assistência técnica rural, a',
      'fim de garantir água e dignidade ao povo sertanejo{/}.'
    ]
  ],
  notas:[
    'Tema de Pernambuco, com dois repertórios nordestinos (Graciliano Ramos e Josué de Castro).',
    'Usa a expressão "convivência com o semiárido", vocabulário atual sobre o tema.',
    'O D1 trata da infraestrutura; o D2, da forma como o Estado age.',
    'A proposta tem obras e apoio ao agricultor, um para cada argumento.'
  ]
},
{
  id:'m29', curto:'Crimes ambientais',
  tema:'Os desafios para combater os crimes ambientais',
  tipo:'Tema de "desafios" → dois obstáculos',
  p:[
    [
      '{r}O artigo 225 da Constituição garante a todos o direito ao meio',
      'ambiente ecologicamente equilibrado{/}. Contudo, desmatamentos e',
      'queimadas ilegais persistem no Brasil, {t}sobretudo pela fiscalização',
      'insuficiente e pela busca por lucro imediato{/}.'
    ],[
      'Em primeiro lugar, a fiscalização não acompanha o tamanho do país.',
      'Grandes áreas de mata são vigiadas por poucos agentes, e muitas multas',
      'aplicadas nunca são pagas. {r}A Lei de Crimes Ambientais, de 1998,',
      'prevê sanções penais e administrativas para essas condutas{/}, mas, sem',
      'presença do Estado, o infrator aposta na impunidade, de modo que',
      'florestas e rios continuam sendo destruídos.'
    ],[
      'Além disso, o lucro imediato estimula a destruição. Madeira ilegal,',
      'garimpo e tráfico de animais movimentam muito dinheiro e atraem o',
      'crime organizado. {r}A Agenda 2030 da ONU, em seu Objetivo 13, pede',
      'ação urgente contra a mudança do clima{/}. Nesse sentido, cada área',
      'devastada agrava secas, enchentes e ondas de calor, o que mostra que',
      'o crime ambiental ameaça também a vida nas cidades.'
    ],[
      'Portanto, proteger o meio ambiente é uma questão de segurança. Para',
      'isso, {p}os governos devem ampliar o policiamento ambiental e o uso de',
      'satélites e drones, além da educação ambiental nas escolas, a fim de',
      'punir os infratores e preservar a natureza para as próximas gerações{/}.'
    ]
  ],
  notas:[
    'Abre com o artigo da Constituição dedicado ao meio ambiente.',
    'O D1 trata da fiscalização; o D2 liga o tema ao crime organizado e ao clima.',
    'O fechamento do D2 aproxima o problema do leitor urbano ("a vida nas cidades").',
    'A proposta inclui o policiamento ambiental, papel da própria PM.'
  ]
},
{
  id:'m30', curto:'Violência e desigualdade',
  tema:'A violência urbana e a desigualdade social',
  tipo:'Tema de relação → duas causas',
  p:[
    [
      '{r}O geógrafo Milton Santos usou a expressão "cidadania mutilada" para',
      'descrever quem tem direitos apenas no papel{/}. Nas periferias brasileiras,',
      'essa realidade alimenta a violência, {t}sobretudo pela exclusão dos',
      'jovens e pela ausência de serviços públicos nesses territórios{/}.'
    ],[
      'Em primeiro lugar, a exclusão deixa os jovens sem perspectiva.',
      'Escolas precárias, falta de emprego e ausência de lazer reduzem as',
      'oportunidades de quem nasce nas periferias. {r}Segundo o Atlas da',
      'Violência, a maioria das vítimas de homicídio no país é jovem{/}, o que',
      'mostra que a desigualdade expõe essa parcela da população tanto ao',
      'aliciamento do crime quanto ao risco de morte precoce.'
    ],[
      'Além disso, a ausência do Estado abre espaço para o crime.',
      'Em bairros sem saneamento, iluminação e policiamento regular, grupos',
      'criminosos impõem regras e cobram "taxas" dos moradores. {r}Para Émile',
      'Durkheim, quando as normas perdem força, instala-se a anomia{/}. Sob',
      'essa ótica, o vazio deixado pelo poder público é ocupado pela',
      'violência, de modo que a comunidade vive sob medo constante.'
    ],[
      'Portanto, reduzir a desigualdade é também reduzir a violência. Para',
      'isso, {p}os governos devem levar escolas, empregos e policiamento',
      'comunitário às periferias, por meio de políticas integradas, a fim de',
      'devolver a esses territórios a presença do Estado e a cidadania plena{/}.'
    ]
  ],
  notas:[
    'Não diz que "pobreza gera criminoso": diz que a exclusão aumenta a vulnerabilidade.',
    'O D1 trata das pessoas (jovens); o D2, do território (bairros sem Estado).',
    'A conclusão retoma o conceito da introdução ("cidadania plena" × "cidadania mutilada").',
    'A proposta junta política social e policiamento comunitário.'
  ]
},
{
  id:'m31', curto:'Violência entre torcidas',
  tema:'A violência entre torcidas organizadas',
  tipo:'Tema de problema → duas causas',
  p:[
    [
      '{r}A Lei Geral do Esporte, de 2023, manteve como crime promover tumulto',
      'e praticar violência em eventos esportivos{/}. Ainda assim, confrontos',
      'entre torcidas persistem, {t}sobretudo pela rivalidade transformada em',
      'ódio e pela punição insuficiente dos agressores{/}.'
    ],[
      'Em primeiro lugar, a rivalidade esportiva vira ódio entre grupos.',
      'O pertencimento à torcida passa a definir a identidade do jovem, e o',
      'rival se torna inimigo. {r}Para Thomas Hobbes, sem a força do Estado,',
      'os homens tendem à "guerra de todos contra todos"{/}, e é o que ocorre',
      'quando brigas são combinadas pelas redes sociais longe dos estádios,',
      'atingindo inclusive torcedores comuns e moradores.'
    ],[
      'Além disso, os agressores raramente são punidos. Em meio à multidão,',
      'é difícil identificar quem começou a briga, e muitos banidos voltam',
      'aos estádios sem fiscalização. {r}Segundo a Teoria das Janelas',
      'Quebradas, a desordem não corrigida estimula delitos maiores{/}. Logo,',
      'a tolerância com pequenas agressões abre caminho para confrontos',
      'graves a cada clássico.'
    ],[
      'Portanto, é preciso devolver a paz aos estádios. Para isso, {p}as',
      'polícias e os clubes devem identificar os torcedores na entrada e',
      'usar inteligência para impedir brigas combinadas, a fim de punir os',
      'violentos e proteger quem vai ao estádio para torcer{/}.'
    ]
  ],
  notas:[
    'Fala da minoria violenta, e não das torcidas em geral.',
    'O D1 explica a origem do ódio; o D2, por que ele não é contido.',
    'A Teoria das Janelas Quebradas é usada no contexto certo: pequenas desordens toleradas.',
    'A proposta é técnica (identificação e inteligência), dentro da atuação policial.'
  ]
},
{
  id:'m32', curto:'Pessoas desaparecidas',
  tema:'Os desafios na busca por pessoas desaparecidas',
  tipo:'Tema de "desafios" → dois obstáculos',
  p:[
    [
      '{r}A Lei 13.812, de 2019, determina que a busca por pessoas',
      'desaparecidas seja prioridade com caráter de urgência{/}. Na prática,',
      'muitas famílias seguem sem respostas, {t}sobretudo pela demora em',
      'comunicar o desaparecimento e pela falta de integração dos órgãos{/}.'
    ],[
      'Em primeiro lugar, ainda há demora no registro da ocorrência.',
      'Muitas famílias acreditam no mito de que é preciso esperar 24 horas',
      'para procurar a polícia. {r}O Estatuto da Criança e do Adolescente,',
      'porém, determina que o desaparecimento seja investigado de imediato{/}.',
      'Nesse sentido, as primeiras horas são decisivas para localizar',
      'crianças e idosos, e cada atraso reduz as chances de um reencontro.'
    ],[
      'Além disso, os órgãos públicos ainda trabalham de forma isolada.',
      'Polícias, hospitais, abrigos e institutos de medicina legal nem',
      'sempre compartilham informações, e uma pessoa pode estar internada',
      'ou sem identificação em outro município. {r}A mesma lei criou um',
      'cadastro nacional de desaparecidos{/}, mas, sem alimentação constante,',
      'ele perde eficácia, de modo que buscas se arrastam por anos.'
    ],[
      'Portanto, é preciso agilizar a busca por desaparecidos. Para isso,',
      '{p}o Governo Federal deve integrar o cadastro nacional a polícias,',
      'hospitais e IML, além de divulgar que o registro é imediato, a fim',
      'de devolver respostas e esperança às famílias{/}.'
    ]
  ],
  notas:[
    'Desfaz um mito comum (esperar 24 horas), o que mostra conhecimento da atividade policial.',
    'Cada desenvolvimento usa uma base legal diferente: o ECA e o cadastro nacional.',
    'O D2 descreve um caso concreto (pessoa internada em outro município) para explicar a falta de integração.',
    'A proposta responde aos dois argumentos: integração de dados e divulgação do registro imediato.'
  ]
},
{
  id:'m33', curto:'Suicídio entre jovens',
  tema:'A prevenção ao suicídio entre jovens',
  tipo:'Tema de prevenção → dois fatores de risco',
  p:[
    [
      '{r}A Lei 13.819, de 2019, criou a Política Nacional de Prevenção da',
      'Automutilação e do Suicídio{/}. Entre os jovens, essa prevenção exige',
      'atenção, {t}sobretudo pelo tabu em falar sobre saúde mental e pela',
      'pressão intensificada pelas redes sociais{/}.'
    ],[
      'Em primeiro lugar, o silêncio impede que o sofrimento seja notado.',
      'Em muitas famílias, tristeza profunda e isolamento são vistos como',
      '"frescura" ou fase passageira. {r}A campanha Setembro Amarelo mostra',
      'que falar sobre o tema salva vidas{/}. Nesse sentido, quando pais e',
      'professores não sabem reconhecer sinais de alerta, o jovem deixa de',
      'receber ajuda no momento em que mais precisa dela.'
    ],[
      'Além disso, as redes sociais ampliam a pressão sobre os jovens.',
      'A comparação constante com vidas aparentemente perfeitas e os ataques',
      'virtuais afetam a autoestima. {r}Para o filósofo Byung-Chul Han, a',
      'sociedade do desempenho produz sujeitos esgotados e deprimidos{/}.',
      'Sob essa ótica, o adolescente cobrado por padrões inalcançáveis',
      'sente-se fracassado, o que agrava quadros de ansiedade e depressão.'
    ],[
      'Portanto, prevenir o suicídio entre jovens é responsabilidade de',
      'todos. Para isso, {p}as escolas devem contar com psicólogos e treinar',
      'professores, além de divulgar o CVV (188), a fim de acolher quem',
      'sofre e garantir ajuda antes que seja tarde{/}.'
    ]
  ],
  notas:[
    'Tema sensível: o texto fala de prevenção e acolhimento, sem descrever métodos.',
    'O D1 trata do ambiente próximo (família e escola); o D2, do ambiente virtual.',
    'Setembro Amarelo e Byung-Chul Han são usados como prova, com explicação.',
    'A proposta cita um canal real de ajuda (CVV, 188).'
  ]
},
{
  id:'m34', curto:'LGBTfobia',
  tema:'O combate à LGBTfobia no Brasil',
  tipo:'Tema de problema → duas causas',
  p:[
    [
      '{r}Em 2019, o Supremo Tribunal Federal decidiu que a homofobia e a',
      'transfobia devem ser punidas como crimes de racismo{/}. Mesmo assim,',
      'a violência contra pessoas LGBTQIA+ persiste, {t}sobretudo pelo',
      'preconceito naturalizado e pela subnotificação dos crimes{/}.'
    ],[
      'Em primeiro lugar, o preconceito ainda é tratado como normal.',
      'Piadas, exclusão familiar e discursos de ódio nas redes sociais',
      'reforçam a ideia de que essas pessoas valem menos. {r}A Declaração',
      'Universal dos Direitos Humanos afirma que todos nascem livres e iguais',
      'em dignidade e direitos{/}, mas, quando a discriminação é aceita, ela',
      'abre caminho para agressões físicas e até assassinatos.'
    ],[
      'Além disso, muitos crimes nem chegam às estatísticas. Por medo de',
      'nova violência ou de exposição, vítimas deixam de denunciar, e muitos',
      'registros não indicam a motivação do crime. {r}Hannah Arendt chamou',
      'de "banalidade do mal" a naturalização de atos cruéis{/}. Nesse',
      'sentido, sem dados confiáveis, o problema fica invisível, de modo que',
      'faltam políticas públicas para enfrentá-lo.'
    ],[
      'Portanto, é necessário combater a LGBTfobia. Para isso, {p}as polícias',
      'devem capacitar agentes para registrar a motivação dos crimes, e as',
      'escolas devem trabalhar o respeito à diversidade, a fim de garantir',
      'segurança e dignidade a todos os cidadãos{/}.'
    ]
  ],
  notas:[
    'Linguagem respeitosa e técnica, sem opinião moral ou religiosa sobre ninguém.',
    'A introdução usa uma decisão do STF, repertório jurídico forte.',
    'O D2 explica a subnotificação, ponto que liga o tema ao trabalho policial (registro de ocorrência).',
    'A proposta envolve a polícia e a escola.'
  ]
},
{
  id:'m35', curto:'Intolerância religiosa',
  tema:'O combate à intolerância religiosa',
  tipo:'Tema de problema → duas causas',
  p:[
    [
      '{r}A Constituição garante, no artigo 5º, que é inviolável a liberdade',
      'de consciência e de crença{/}. Ainda assim, a intolerância religiosa',
      'persiste no Brasil, {t}sobretudo pelo desconhecimento das outras',
      'crenças e pela impunidade dos ataques{/}.'
    ],[
      'Em primeiro lugar, o desconhecimento alimenta o preconceito.',
      'Religiões de matriz africana, como o candomblé e a umbanda, são',
      'frequentemente associadas a estereótipos negativos, o que revela',
      'também a força do racismo. {r}A Declaração Universal dos Direitos',
      'Humanos garante a liberdade de manifestar a própria religião{/}, mas',
      'essa garantia perde força quando o diferente é visto como ameaça.'
    ],[
      'Além disso, os ataques raramente são punidos. Terreiros depredados,',
      'ofensas e agressões muitas vezes não são registrados como crime de',
      'intolerância. {r}A Lei 7.716, de 1989, pune a discriminação por',
      'religião{/}, mas a falta de investigação faz com que a lei pareça',
      'distante, de modo que os agressores se sentem livres para repetir',
      'os ataques.'
    ],[
      'Portanto, a liberdade religiosa precisa ser protegida. Para isso,',
      '{p}as escolas devem abordar a diversidade de crenças, e as polícias',
      'devem investigar com prioridade os crimes de intolerância, a fim de',
      'garantir a todos o direito de professar sua fé em paz{/}.'
    ]
  ],
  notas:[
    'Não defende nem ataca nenhuma religião: o foco é a liberdade de crença.',
    'O D1 liga a intolerância ao racismo, mostrando relação entre temas.',
    'O D2 usa a lei de 1989, que também pune a discriminação por religião.',
    'A proposta tem prevenção (escola) e repressão (investigação).'
  ]
},
{
  id:'m36', curto:'Trabalho escravo',
  tema:'O trabalho análogo à escravidão no Brasil contemporâneo',
  tipo:'Tema de problema → duas causas',
  p:[
    [
      '{r}A Lei Áurea aboliu a escravidão no Brasil em 1888{/}. Mais de um',
      'século depois, porém, trabalhadores ainda são resgatados em condições',
      'degradantes, {t}sobretudo pela vulnerabilidade social das vítimas e',
      'pela busca de lucro sem fiscalização eficiente{/}.'
    ],[
      'Em primeiro lugar, a pobreza torna os trabalhadores vulneráveis.',
      'Pessoas com baixa escolaridade aceitam falsas promessas de emprego e',
      'acabam presas a dívidas com o patrão. {r}O artigo 149 do Código Penal',
      'considera crime submeter alguém a jornada exaustiva, condições',
      'degradantes ou restrição de locomoção por dívida{/}. Assim, a escravidão',
      'moderna não depende de correntes, mas da falta de alternativas.'
    ],[
      'Além disso, a fiscalização não alcança toda a cadeia produtiva.',
      'Fazendas, carvoarias, oficinas de costura e até trabalhos domésticos',
      'escondem casos que só são descobertos por denúncias. {r}Para Kant, o',
      'ser humano deve ser tratado como fim, e nunca apenas como meio{/}.',
      'Nesse sentido, quem lucra com a exploração trata pessoas como',
      'mercadoria, e a impunidade estimula a repetição do crime.'
    ],[
      'Portanto, é urgente erradicar o trabalho escravo. Para isso, {p}os',
      'auditores do trabalho, com apoio policial, devem ampliar as',
      'fiscalizações e divulgar a "Lista Suja" de empregadores, a fim de',
      'punir os exploradores e libertar os trabalhadores{/}.'
    ]
  ],
  notas:[
    'A abertura histórica (1888) cria contraste com a realidade atual.',
    'O D1 explica o que caracteriza a escravidão moderna, segundo o Código Penal.',
    'O D2 usa Kant para mostrar por que a exploração fere a dignidade.',
    'A proposta cita um instrumento real de combate (a "Lista Suja").'
  ]
},
{
  id:'m37', curto:'Trabalho infantil',
  tema:'O trabalho infantil no Brasil',
  tipo:'Tema de problema → duas causas',
  p:[
    [
      '{r}A Constituição proíbe qualquer trabalho a menores de 16 anos, salvo',
      'na condição de aprendiz, a partir dos 14{/}. Ainda assim, o trabalho',
      'infantil persiste no país, {t}sobretudo pela pobreza das famílias e',
      'pela ideia de que "trabalhar cedo forma o caráter"{/}.'
    ],[
      'Em primeiro lugar, a pobreza empurra crianças para o trabalho.',
      'Em famílias de baixa renda, o dinheiro ganho por crianças nas ruas,',
      'nas feiras ou no campo complementa o orçamento doméstico. {r}Em',
      '"Capitães da Areia", Jorge Amado retrata meninos que sobrevivem sem',
      'proteção nas ruas de Salvador{/}, e essa realidade se repete quando',
      'a escola é trocada pelo trabalho, o que perpetua a pobreza.'
    ],[
      'Além disso, a cultura brasileira ainda naturaliza essa exploração.',
      'Muitos adultos acreditam que trabalhar cedo afasta a criança das',
      'drogas, sem perceber os danos à saúde e aos estudos. {r}O Estatuto da',
      'Criança e do Adolescente garante o direito de brincar, estudar e se',
      'desenvolver{/}. Nesse sentido, a exploração rouba a infância e reduz',
      'as chances de um futuro digno.'
    ],[
      'Portanto, é preciso erradicar o trabalho infantil. Para isso, {p}o',
      'governo deve ampliar a transferência de renda condicionada à',
      'frequência escolar e a fiscalização do trabalho, a fim de garantir',
      'que lugar de criança seja na escola{/}.'
    ]
  ],
  notas:[
    'A introdução diferencia o trabalho infantil (proibido) da aprendizagem legal.',
    'O D1 trata da causa econômica; o D2, da causa cultural.',
    'O fechamento do D1 mostra o ciclo: trabalho infantil gera mais pobreza.',
    'A proposta ataca a causa econômica (renda) e exige frequência escolar.'
  ]
},
{
  id:'m38', curto:'População de rua',
  tema:'A população em situação de rua no Brasil',
  tipo:'Tema de problema → duas causas',
  p:[
    [
      '{r}A Constituição inclui, no artigo 6º, a moradia entre os direitos',
      'sociais{/}. Contudo, cresce o número de pessoas em situação de rua nas',
      'grandes cidades, {t}sobretudo pela crise de moradia e renda e pela',
      'falta de acolhimento contínuo{/}.'
    ],[
      'Em primeiro lugar, a falta de renda e moradia leva muitos às ruas.',
      'Desemprego, aluguéis caros e o rompimento de vínculos familiares',
      'deixam pessoas sem alternativa. {r}Como mostra Gilberto Dimenstein em',
      '"O Cidadão de Papel", muitos direitos existem apenas na lei{/}. Sob',
      'essa ótica, quem dorme nas calçadas é a face mais visível da',
      'distância entre o que a lei garante e o que o Estado entrega.'
    ],[
      'Além disso, o acolhimento oferecido é insuficiente e temporário.',
      'Faltam vagas em abrigos, e muitos não aceitam animais, casais ou',
      'pertences, o que afasta quem precisa. {r}Desde 2009, uma política',
      'nacional prevê saúde, moradia e trabalho para essa população{/}, mas,',
      'sem tratamento para dependência química e saúde mental, muitas',
      'pessoas voltam às ruas logo depois de acolhidas.'
    ],[
      'Portanto, é preciso garantir dignidade a quem vive nas ruas. Para',
      'isso, {p}os municípios devem ampliar abrigos e programas de moradia,',
      'com acompanhamento de saúde e qualificação profissional, a fim de',
      'oferecer uma saída real das ruas{/}.'
    ]
  ],
  notas:[
    'Trata o tema como questão social e de direitos, sem associar essas pessoas ao crime.',
    'O D1 explica como a pessoa chega à rua; o D2, por que ela não consegue sair.',
    'O D2 traz detalhes concretos dos abrigos (animais, casais, pertences), o que dá informatividade.',
    'A proposta combina moradia, saúde e trabalho.'
  ]
},
{
  id:'m39', curto:'Fome',
  tema:'O combate à fome e à insegurança alimentar no Brasil',
  tipo:'Tema de problema → duas causas',
  p:[
    [
      '{r}Em "Geografia da Fome", o pernambucano Josué de Castro mostrou que',
      'a fome é produto de escolhas sociais, e não da natureza{/}. Décadas',
      'depois, ela ainda atinge brasileiros, {t}sobretudo pela desigualdade',
      'de renda e pelo desperdício de alimentos{/}.'
    ],[
      'Em primeiro lugar, a desigualdade impede o acesso à comida.',
      'O Brasil é um dos maiores produtores de alimentos do mundo, mas',
      'milhões de famílias não têm renda para comprá-los. {r}O país saiu do',
      'Mapa da Fome da ONU em 2014 e voltou a ele anos depois{/}, o que mostra',
      'que, sem emprego e políticas contínuas, a conquista não se sustenta',
      'e a mesa vazia volta a fazer parte da rotina dos mais pobres.'
    ],[
      'Além disso, o desperdício agrava a insegurança alimentar. Muitos',
      'alimentos se perdem na colheita, no transporte e nos supermercados,',
      'enquanto pessoas passam fome a poucos metros. {r}A Constituição inclui',
      'a alimentação entre os direitos sociais, no artigo 6º{/}. Nesse',
      'sentido, desperdiçar comida em um país com fome é negar esse direito',
      'a quem mais precisa dele.'
    ],[
      'Portanto, acabar com a fome exige ação permanente. Para isso, {p}o',
      'governo deve manter a transferência de renda e a alimentação escolar',
      'e apoiar bancos de alimentos, a fim de garantir comida na mesa de',
      'todos os brasileiros{/}.'
    ]
  ],
  notas:[
    'Repertório pernambucano clássico, citado com a obra e a ideia central.',
    'A tese desfaz um senso comum: a fome não é falta de produção.',
    'O D1 usa um fato histórico recente (Mapa da Fome) para mostrar que a conquista não é permanente.',
    'A proposta responde aos dois argumentos: renda e combate ao desperdício.'
  ]
},
{
  id:'m40', curto:'Pessoa com deficiência',
  tema:'A inclusão da pessoa com deficiência na sociedade brasileira',
  tipo:'Tema de problema → dois obstáculos',
  p:[
    [
      '{r}O Estatuto da Pessoa com Deficiência, de 2015, assegura direitos',
      'como acessibilidade, educação inclusiva e trabalho{/}. Na prática, a',
      'inclusão ainda é limitada, {t}sobretudo pelas barreiras físicas e de',
      'comunicação e pelo preconceito conhecido como capacitismo{/}.'
    ],[
      'Em primeiro lugar, as barreiras impedem o exercício de direitos.',
      'Calçadas irregulares, ônibus sem elevador e a falta de intérpretes de',
      'Libras dificultam o acesso à escola, ao trabalho e aos serviços.',
      '{r}O artigo 5º da Constituição garante a igualdade de todos perante a',
      'lei{/}, mas, sem acessibilidade, essa igualdade fica no papel, de modo',
      'que muitas pessoas deixam de sair de casa.'
    ],[
      'Além disso, o capacitismo limita oportunidades. Muitos ainda duvidam',
      'da capacidade da pessoa com deficiência e a tratam com pena ou',
      'exclusão. {r}A Lei de Cotas, de 1991, obriga empresas com cem ou mais',
      'empregados a reservar vagas para esses profissionais{/}, mas muitas',
      'não cumprem a cota, o que reforça a exclusão e reduz a autonomia',
      'dessas pessoas.'
    ],[
      'Portanto, incluir a pessoa com deficiência é dever de todos. Para',
      'isso, {p}o poder público deve fiscalizar a acessibilidade e o',
      'cumprimento das cotas, além de capacitar servidores em Libras, a fim',
      'de garantir autonomia e cidadania a essa população{/}.'
    ]
  ],
  notas:[
    'Usa os termos corretos: "pessoa com deficiência" e "capacitismo".',
    'O D1 trata das barreiras físicas; o D2, das barreiras de atitude.',
    'O D2 cita a Lei de Cotas com a regra exata (empresas com cem ou mais empregados).',
    'A proposta inclui capacitar servidores em Libras, o que vale também para a polícia.'
  ]
},
{
  id:'m41', curto:'Mobilidade urbana',
  tema:'Os desafios da mobilidade urbana nas grandes cidades',
  tipo:'Tema de "desafios" → dois obstáculos',
  p:[
    [
      '{r}Desde 2015, a Constituição inclui o transporte entre os direitos',
      'sociais{/}. Nas grandes cidades, porém, deslocar-se ainda é um desafio,',
      '{t}sobretudo pela priorização do transporte individual e pela baixa',
      'qualidade do transporte público{/}.'
    ],[
      'Em primeiro lugar, as cidades foram planejadas para o carro.',
      'O excesso de veículos provoca congestionamentos, poluição e acidentes.',
      '{r}A Política Nacional de Mobilidade Urbana, de 2012, determina que o',
      'transporte coletivo tenha prioridade sobre o individual{/}, mas a',
      'maior parte do espaço das vias ainda é ocupada por automóveis, de',
      'modo que o trânsito se torna mais lento e mais perigoso.'
    ],[
      'Além disso, o transporte público não atende bem à população.',
      'Ônibus lotados, atrasos e paradas sem iluminação tornam a viagem',
      'cansativa e insegura, sobretudo à noite. {r}O geógrafo Milton Santos',
      'mostrou que o acesso à cidade é desigual entre ricos e pobres{/}.',
      'Nesse sentido, o trabalhador da periferia gasta horas no trajeto e',
      'fica mais exposto a assaltos, o que reduz sua qualidade de vida.'
    ],[
      'Portanto, a mobilidade urbana precisa ser repensada. Para isso, {p}as',
      'prefeituras devem ampliar faixas exclusivas de ônibus e ciclovias,',
      'com policiamento e iluminação nas paradas, a fim de garantir',
      'deslocamentos rápidos e seguros a todos{/}.'
    ]
  ],
  notas:[
    'A introdução lembra que o transporte é direito social desde 2015.',
    'O D1 usa a lei de mobilidade para mostrar a distância entre a regra e a rua.',
    'O D2 aproxima o tema da segurança pública (assaltos e paradas escuras).',
    'A proposta junta transporte e policiamento, um para cada argumento.'
  ]
},
{
  id:'m42', curto:'Maus-tratos a animais',
  tema:'O combate aos maus-tratos e ao abandono de animais',
  tipo:'Tema de problema → duas causas',
  p:[
    [
      '{r}O filósofo Immanuel Kant afirmou que quem é cruel com os animais',
      'endurece também no trato com as pessoas{/}. No Brasil, os maus-tratos',
      'persistem, {t}sobretudo pela visão do animal como objeto e pela',
      'fiscalização insuficiente{/}.'
    ],[
      'Em primeiro lugar, muitos ainda veem o animal como um objeto.',
      'Cães e gatos são comprados por impulso e abandonados quando adoecem,',
      'envelhecem ou dão trabalho. {r}A Lei Sansão, de 2020, aumentou a pena',
      'para maus-tratos a cães e gatos para até cinco anos de reclusão{/}, mas',
      'a mudança de mentalidade é mais lenta que a da lei, de modo que o',
      'abandono segue comum nas ruas das cidades.'
    ],[
      'Além disso, a fiscalização e as denúncias são insuficientes.',
      'Muitos casos acontecem dentro de casas e quintais, longe dos olhos',
      'das autoridades. {r}O artigo 225 da Constituição veda práticas que',
      'submetam os animais a crueldade{/}. Nesse sentido, sem canais de',
      'denúncia conhecidos e sem equipes para atender, a lei não chega a',
      'quem precisa de proteção.'
    ],[
      'Portanto, é preciso combater os maus-tratos a animais. Para isso,',
      '{p}os municípios devem ampliar castração e adoção responsável, e o',
      'policiamento ambiental deve atender às denúncias, a fim de proteger',
      'os animais e construir uma sociedade menos violenta{/}.'
    ]
  ],
  notas:[
    'A citação de Kant liga o tema à violência entre pessoas, aproximando-o da segurança pública.',
    'O D1 trata da mentalidade; o D2, da fiscalização.',
    'Usa duas bases legais: a Lei Sansão e o art. 225 da Constituição.',
    'A conclusão retoma Kant ("uma sociedade menos violenta"), fechando o texto em círculo.'
  ]
}
];
