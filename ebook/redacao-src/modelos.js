// Redações-modelo: cada uma com exatamente 20 linhas no mapa 4-6-6-4.
// Marcações: {t}tese{/} · {r}repertório{/} · {p}proposta{/}. Conectivos são destacados automaticamente.
const MODELOS = [
{
  id:'m1',
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
  id:'m2',
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
  id:'m3',
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
  id:'m4',
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
}
];
