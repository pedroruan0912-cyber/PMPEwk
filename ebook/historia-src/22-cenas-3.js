/* ===== Episódios: item 5 do edital (resistência e movimentos emancipacionistas) ===== */
const DPEDRO={sk:'eu',fit:'farda',c:'#1f6b3a',c2:'#fdf8ea',beard:'mustache',belt:'#f6c21c',hc:'#4a3018'};

S({id:'palmares',g:5,item:5,year:'c. 1597–1695',title:'A formação dos quilombos: Palmares',
  art:()=>sky('sunset')+sun(200,150,50,'#ffe08a')
    +land(`M-10,540 Q200,310 520,260 Q700,240 860,290 Q1100,370 1290,540 V730 H-10Z`,'#4a913a','#3c8234')
    +palm(300,440,.7)+palm(990,430,.75)+palm(1160,520,.8)+palm(110,560,.9)
    +at(540,412,oca(0,0,.7))+at(700,408,oca(0,0,.75))+palisade(440,420,360,56)
    +act('fogo',620,410,smoke(0,-110,1.6,'#555')+fire(-100,-20,1)+fire(60,-30,1.2),{o:0,h:0})
    +field(610,'#5aa84a','#3f8f3a')
    +act('fug',-90,678,P('escravo'))+act('q1',430,678,P('escrava'))+act('gz',540,674,P('nobre',{sk:'af',c:'#b3261e',hat:'coroa',hc:'#1d120b',beard:'full',bc:'#dddddd'}))+act('q2',860,678,P('indio',{propR:'arco'}),{f:1})
    +act('gov',-110,676,P('mercador',{propR:'papel',c:'#3d5a80'}))+act('can',-220,678,cannon(),{h:0})+act('djv',-130,676,P('senhor',{c:'#6b4a2b',c2:'#4a3018',hatc:'#8a5a2b',beard:'full',propR:'mosquete',angry:1}))
    +dark('noite')
    +act('zu',710,674,P('escravo',{c2:'#8a5a2b',propR:'lanca'}))
    +sg('s1',640,80,'QUILOMBO = COMUNIDADE DE RESISTÊNCIA',{bg:Y})+sk2('s2',640,70,['QUILOMBO DOS PALMARES · SERRA DA BARRIGA','NA ÉPOCA: PERNAMBUCO · HOJE: ALAGOAS'],{fs:24,bg:GR})
    +sg('s3',620,300,'CAPITAL: CERCA REAL DO MACACO',{fs:23})+sg('s4',640,80,'1678: GANGA ZUMBA ACEITA A PAZ · ZUMBI RECUSA',{fs:24,bg:BL})
    +sg('s5',640,80,'1694: DOMINGOS JORGE VELHO DESTRÓI O MACACO',{fs:24,bg:RD})+sg('s6',640,80,'20 DE NOVEMBRO DE 1695',{fs:34,bg:Y})+sg('s7',640,160,'QUILOMBO DO CATUCÁ · MALUNGUINHO · SÉC. XIX',{fs:24,bg:GR}),
  beats:[
    {t:'Onde houve escravidão, houve resistência: fugas, revoltas e quilombos, comunidades formadas por pessoas que escapavam do cativeiro.',do(){show('s1');walk('fug',{x:320},3)}},
    {t:'O maior quilombo das Américas foi Palmares, na Serra da Barriga. A região pertencia à capitania de Pernambuco e hoje fica em Alagoas.',do(){hide('s1');show('s2')}},
    {t:'Palmares era uma confederação de mocambos, com capital na Cerca Real do Macaco. Cresceu muito durante a guerra contra os holandeses, quando os engenhos ficaram desorganizados, e chegou a reunir milhares de pessoas: negros, indígenas e brancos pobres.',do(){show('s3')}},
    {t:'Em 1678, o líder Ganga Zumba aceitou um acordo de paz com o governador de Pernambuco. Seu sobrinho Zumbi recusou: liberdade só para alguns não era liberdade. Zumbi assumiu o comando.',do(){hide('s2');hide('s3');show('s4');hide('fug');hide('q1');walk('gov',{x:230},2.4);go('gz',{f:-1},.1);walk('gz',{x:380},2.4)},say:['zu','Liberdade para todos, ou para ninguém!']},
    {t:'Depois de muitas expedições fracassadas, o governo contratou o bandeirante paulista Domingos Jorge Velho. Em 1694, com canhões, ele destruiu o Macaco.',do(){hide('s4');hide('gz');hide('gov');show('s5');walk('djv',{x:270},2.2);go('can',{x:130},2.2);later(2400,()=>{booms([[560,360,1,'BUM'],[690,340,.9],[620,390,1.1,'BUM']],500);show('fogo')})}},
    {t:'Zumbi escapou, mas foi traído e morto em 20 de novembro de 1695. A data é hoje o Dia Nacional de Zumbi e da Consciência Negra.',do(){hide('s5');hide('djv');hide('can');go('noite',{o:.62},1.5);show('s6')}},
    {t:'E Palmares não foi o único. No século dezenove, o Quilombo do Catucá, nas matas entre o Recife e Goiana, liderado por Malunguinho, assustou os senhores por décadas.',do(){hide('fogo');go('noite',{o:.3},1.5);show('s7')}}
  ],
  facts:['Palmares ficava na Serra da Barriga: na época, capitania de Pernambuco; hoje, Alagoas. Capital: Macaco.','Ganga Zumba fez o acordo de paz de 1678. Zumbi recusou e seguiu resistindo.','Destruído por Domingos Jorge Velho em 1694. Zumbi foi morto em 20 de novembro de 1695.','Quilombo do Catucá, de Malunguinho: século XIX, perto do Recife.'],
  trap:'Palmares faz parte da história de Pernambuco. Se a questão disser que não, porque hoje a serra fica em Alagoas, está errada.'});

S({id:'insurreicao',g:5,item:5,year:'1645–1654',title:'Insurreição Pernambucana',
  art:()=>sky('day')+sun(1150,100)+clouds()+hill(240,540,360,210,'#63b04d')+hill(650,560,380,240,'#5aa84a')+hill(1060,540,380,210,'#63b04d')+field(520,'#7cc15a','#5a9a3e')
    +act('nlp',1230,676,pole('nl',270,96,64),{h:0})+act('whp',1230,676,pole('white',270,96,64),{o:0,h:0})
    +act('jfv',170,674,P('senhor',{hat:'plume',fc:'#e63946',propR:'espada'}))+act('vid',310,678,P('port',{propR:'espada',c:'#2f6b4f'}),{o:0})
    +act('cam',450,674,P('port',{sk:'in',hair:'indio',hat:'cocar',beard:null,propR:'mosquete',hc:'#2b1b12'}),{o:0})+act('hd',590,678,P('nobre',{sk:'af',c:'#b3261e',fc:'#f6c21c',hc:'#1d120b',beard:null,propR:'espada'}),{o:0})
    +act('wic',900,676,P('holandes',{propR:'saco',hat:'plume',fc:'#1d1d28',angry:1}),{f:1})+act('h1',1030,672,P('holandes',{propR:'mosquete'}),{f:1})+act('h2',1140,678,P('holandes',{propR:'lanca',hc:'#5a3a22'}),{f:1})
    +act('sac',300,640,at(0,0,PROP.saco(),1.5),{o:0,h:0})
    +act('nm',0,0,sign(180,356,'FERNANDES VIEIRA',{fs:19})+sign(330,400,'VIDAL DE NEGREIROS',{fs:19})+sign(480,356,'FELIPE CAMARÃO',{fs:19})+sign(620,400,'HENRIQUE DIAS',{fs:19}),{o:0,h:0})
    +sg('s1',640,80,'1640: FIM DA UNIÃO IBÉRICA · TRÉGUA COM A HOLANDA',{fs:24,bg:BL})+sg('s2',640,80,'1645: COMEÇA A INSURREIÇÃO PERNAMBUCANA',{fs:26,bg:Y})
    +sk2('s4',640,70,['MONTE DAS TABOCAS · 1645','GUARARAPES · 1648 E 1649'],{bg:Y})+sg('s5',640,80,'19 DE ABRIL: DIA DO EXÉRCITO BRASILEIRO',{fs:26,bg:GR})
    +sk2('s6',640,70,['RENDIÇÃO: CAMPINA DO TABORDA','26 DE JANEIRO DE 1654'],{bg:Y})+sg('s7',640,80,'TRATADO DE HAIA · 1661 · 4 MILHÕES DE CRUZADOS',{fs:24,bg:BL})+sk2('s8',640,70,['AÇÚCAR DAS ANTILHAS → CRISE','NASCE O SENTIMENTO NATIVISTA'],{bg:RD}),
  beats:[
    {t:'Em 1640, Portugal se separou da Espanha: era o fim da União Ibérica. Mas a nova coroa portuguesa, enfraquecida, assinou uma trégua com a Holanda. Os pernambucanos teriam de lutar por conta própria.',do(){show('s1')}},
    {t:'Sem Nassau, a WIC cobrou as dívidas dos senhores de engenho, confiscou propriedades e endureceu com os católicos. Em 1645, estourou a Insurreição Pernambucana.',do(){hide('s1');show('s2');walk('wic',{x:340},2)},say:['wic','Paguem, ou perdem o engenho!']},
    {t:'Os líderes representavam os grupos da colônia: o senhor de engenho João Fernandes Vieira, o paraibano André Vidal de Negreiros, o indígena potiguar Felipe Camarão e o negro Henrique Dias.',do(){go('wic',{f:1},.1);walk('wic',{x:920},1.6);later(1700,()=>go('wic',{f:-1},.1));show('vid');show('cam');show('hd');show('nm')}},
    {t:'A primeira grande vitória foi no Monte das Tabocas, em 1645. Depois vieram as duas Batalhas dos Guararapes, em 1648 e 1649, em que os luso-brasileiros, em menor número, venceram o exército holandês.',do(){hide('nm');hide('s2');show('s4');walk('jfv',{x:400},2.2);walk('vid',{x:520},2.2);walk('cam',{x:640},2.2);walk('hd',{x:760},2.2);later(1800,()=>booms([[860,560,1,'ZÁS'],[960,520,.9],[900,600,1,'PÁ'],[1010,560,.9]],420))}},
    {t:'Por reunir brancos, indígenas e negros contra o invasor, Guararapes é considerada o berço do Exército Brasileiro. O 19 de abril, data da primeira batalha, é o Dia do Exército.',do(){hide('s4');show('s5')}},
    {t:'Cercados no Recife, e com a Holanda em guerra contra a Inglaterra, os holandeses se renderam em 26 de janeiro de 1654, na Campina do Taborda.',do(){hide('s5');show('s6');hide('nlp');show('whp')},say:['h1','Nós nos rendemos!']},
    {t:'A paz definitiva veio em 1661, com o Tratado de Haia: Portugal pagou à Holanda uma indenização de 4 milhões de cruzados.',do(){hide('s6');show('s7');show('sac');go('sac',{x:960},2.6)}},
    {t:'Consequências: os holandeses levaram a técnica do açúcar para as Antilhas, a concorrência derrubou os preços e Pernambuco entrou em crise. Mas ficou o orgulho de ter vencido quase sozinho. Nascia o sentimento nativista.',do(){hide('s7');hide('sac');show('s8');['wic','h1','h2'].forEach((k,i)=>{go(k,{f:1},.1);walk(k,{x:1420+i*90},3)})}}
  ],
  facts:['De 1645 a 1654. Líderes: Fernandes Vieira, Vidal de Negreiros, Felipe Camarão e Henrique Dias.','Monte das Tabocas, em 1645. Guararapes, em 1648 e 1649: berço do Exército Brasileiro.','Rendição na Campina do Taborda, em 1654. Tratado de Haia, em 1661, com indenização à Holanda.','Depois: concorrência do açúcar das Antilhas, crise e sentimento nativista.'],
  trap:'O edital marca a Insurreição com o ano de 1654, que é o da expulsão dos holandeses. A luta começou em 1645.'});

S({id:'mascates',g:5,item:5,year:'1710–1711',title:'Guerra dos Mascates',
  art:()=>sky('day')+clouds()+pave(560,'#d9cba8')
    +land(`M-10,566 Q140,310 340,300 Q520,310 600,566Z`,'#63b04d','#4a913a')+church(300,322,.55)+sobrados(70,480,3,.5)+sobrados(380,490,3,.46)
    +sobrados(720,560,8,.68,['#e8d5a8','#f2a65a','#d9c8a0','#8ecae6','#efe4c9'])
    +act('pel',800,678,pelourinho(),{o:0,h:0})
    +act('nob',180,678,P('nobre',{propR:'espada'}))+act('bvm',330,682,P('nobre',{c:'#2f6b4f',fc:'#f6c21c',beard:'full'}))
    +act('gov',610,678,P('mercador',{c:'#b3261e',c2:'#fdf8ea'}))
    +act('mas',920,678,P('mercador',{propR:'saco'}),{f:1})+act('mas2',1060,682,P('mercador',{c:'#3d5a80',propR:'papel',hc:'#5a5f66'}),{f:1})
    +act('fm',1420,678,P('soldadoRei',{propR:'espada',hat:'tricorn'}),{f:1})+act('sol',1520,682,P('soldadoRei',{propR:'mosquete'}),{f:1})
    +act('lab',0,0,sign(290,110,'OLINDA: SENHORES DE ENGENHO',{fs:22,bg:GR})+sign(290,162,'DEVEM',{fs:22,bg:RD})+sign(970,110,'RECIFE: COMERCIANTES (MASCATES)',{fs:22,bg:BL})+sign(970,162,'EMPRESTAM',{fs:22,bg:Y}),{o:0,h:0})
    +sg('s3',640,240,'1710: O RECIFE VIRA VILA · PELOURINHO',{fs:25,bg:Y})+sg('s4',640,240,'O GOVERNADOR FOGE PARA A BAHIA',{fs:25,bg:RD})
    +sg('s5',640,240,'1711: OS MASCATES REAGEM',{fs:25,bg:BL})+sg('s6',640,240,'VITÓRIA DOS MASCATES · O RECIFE SEGUE VILA',{fs:25,bg:Y}),
  beats:[
    {t:'Depois da guerra, o açúcar valia menos, e os senhores de engenho de Olinda viviam endividados. Seus credores eram os comerciantes portugueses do Recife, apelidados com desprezo de mascates.',do(){show('lab')},say:[['nob','Devo, não nego...'],['mas','Então pague!']]},
    {t:'Os mascates tinham o dinheiro, mas não o poder político: o Recife dependia da Câmara de Olinda, controlada pela chamada nobreza da terra.',say:['nob','Na Câmara, quem manda somos nós.']},
    {t:'Em 1709, o rei atendeu os comerciantes e elevou o Recife a vila. Em 1710, ergueu-se o pelourinho, símbolo da autonomia.',do(){show('s3');show('pel')},say:['mas','Agora temos a nossa Câmara!']},
    {t:'Os olindenses reagiram: invadiram o Recife e derrubaram o pelourinho. O governador Castro e Caldas, ferido num atentado, fugiu para a Bahia.',do(){hide('s3');show('s4');walk('nob',{x:690},2);walk('bvm',{x:560},2);later(1900,()=>{boom(800,580,1,'CRAC');go('pel',{r:88},.5)});go('gov',{f:1},.1);walk('gov',{x:1450},2.4)}},
    {t:'No calor da revolta, Bernardo Vieira de Melo teria proposto fazer de Pernambuco uma república, como Veneza. Em 1711, os mascates contra-atacaram.',do(){hide('s4');show('s5');later(2600,()=>booms([[760,560,.9],[860,590,1,'PÁ']],450))},say:['bvm','Uma república, como a de Veneza!']},
    {t:'A coroa mandou um novo governador, Félix Machado, que prendeu os líderes de Olinda. O Recife continuou vila, e o poder econômico dos comerciantes venceu.',do(){hide('s5');show('s6');go('pel',{r:0},.8);walk('fm',{x:640},2.4);walk('sol',{x:760},2.6);later(2500,()=>{go('nob',{o:.3});go('bvm',{o:.3})})}}
  ],
  facts:['Olinda, dos senhores de engenho devedores, contra o Recife, dos comerciantes portugueses credores.','Estopim: a elevação do Recife a vila e o pelourinho, em 1710.','Bernardo Vieira de Melo teria proposto uma república “como Veneza”.','Resultado: vitória dos mascates. O Recife manteve a autonomia.'],
  trap:'É uma revolta nativista, não separatista: um conflito entre elites locais, sem projeto de independência do Brasil.'});

S({id:'luzes',g:5,item:5,year:'1759–1801',title:'As ideias de liberdade chegam a Pernambuco',
  art:()=>sky('night')+stars(50)+moon(1090,120)+hill(640,680,820,220,'#2f5f3a','#234a2c')+church(620,530,1.1,{c:'#e8dcc2'})+field(530,'#2f6b3f','#234a2c')
    +act('alg',0,0,cotton(980,680,1.2)+cotton(1080,690,1)+cotton(1170,676,1.3),{o:0,h:0})
    +act('pom',220,678,P('doutor',{hat:'tricorn',hair:'wig',hc:'#dddddd',beard:null,propR:'papel',c:'#3d5a80'}),{o:0})
    +act('p1',470,678,P('padre',{propR:'livro',book:'#b3261e'}),{o:0})+act('p2',800,678,P('frei',{propR:'tocha'}),{o:0})
    +act('su1',360,682,P('doutor',{hat:'tricorn',c:'#6b4a2b',propR:'tocha'}),{o:0})+act('su2',920,682,P('doutor',{hat:'tricorn',c:'#2f6b4f'}),{o:0,f:1})
    +act('sold',1420,680,P('soldadoRei',{propR:'mosquete'}),{f:1})
    +sk2('s1',640,70,['1759 · COMPANHIA GERAL DE PERNAMBUCO E PARAÍBA','MONOPÓLIO CRIADO PELO MARQUÊS DE POMBAL'],{fs:24,bg:BL})+sg('s2',1080,480,'ALGODÃO',{bg:'#ffffff'})
    +sk2('s3',640,70,['AREÓPAGO DE ITAMBÉ · 1796','SEMINÁRIO DE OLINDA · 1800'],{fs:26,bg:Y})+sg('s4',640,80,'CONSPIRAÇÃO DOS SUASSUNAS · 1801',{fs:26,bg:RD})+sg('s5',640,80,'PADRES + MAÇONS + SENHORES DE ENGENHO → 1817',{fs:24,bg:Y}),
  beats:[
    {t:'No século dezoito, o Marquês de Pombal criou a Companhia Geral de Pernambuco e Paraíba, em 1759. Ela tinha o monopólio do comércio e irritou produtores e comerciantes locais.',do(){show('pom');show('s1')},say:['pom','O comércio agora é da Companhia.']},
    {t:'O algodão, plantado no Agreste e no Sertão, cresceu com a Revolução Industrial inglesa e passou a dividir espaço com o açúcar.',do(){hide('s1');hide('pom');show('alg');show('s2')}},
    {t:'As ideias do Iluminismo chegaram com estudantes e padres. O Areópago de Itambé, de 1796, foi uma sociedade secreta de inspiração maçônica. O Seminário de Olinda, de 1800, formou padres de ideias liberais.',do(){hide('s2');show('s3');show('p1');show('p2')},say:['p1','Liberdade! Igualdade!']},
    {t:'Em 1801, a Conspiração dos Suassunas, dos irmãos Cavalcanti de Albuquerque, teria planejado uma república sob a proteção de Napoleão. Foi denunciada antes de sair do papel.',do(){hide('s3');show('s4');show('su1');show('su2');later(3000,()=>walk('sold',{x:1120},2));later(4600,()=>{go('su1',{o:.25});go('su2',{o:.25})})},say:['su1','Psiu... e se fosse uma república?']},
    {t:'Guarde esta mistura: padres, maçons e senhores de engenho descontentes. É ela que vai explodir em 1817.',do(){hide('s4');go('sold',{x:1500},1.5);go('su1',{o:1});go('su2',{o:1});show('s5')}}
  ],
  facts:['Companhia Geral de Pernambuco e Paraíba, de 1759: monopólio pombalino.','Areópago de Itambé, de 1796, e Seminário de Olinda, de 1800: difusão das ideias liberais.','Conspiração dos Suassunas, de 1801: ficou só na conspiração.'],
  trap:'A dos Suassunas não passou de conspiração. A primeira revolta a tomar o poder de fato foi a Revolução de 1817.'});

S({id:'1817',g:5,item:5,year:'1817',title:'Revolução Pernambucana',
  art:()=>sky('day')+clouds()+pave(520,'#d9cba8')+fort(170,520,.8)+sobrados(360,520,9,.66)+church(1140,520,.7)
    +act('ban',640,520,pole('pe17',340,240,160),{o:0,h:0})
    +act('pe1',430,680,P('doutor',{hat:'tricorn',c:'#6b4a2b',angry:1}),{f:1})+act('col',250,678,P('soldadoRei',{propR:'saco',hat:'tricorn'}),{o:0})
    +act('brig',860,678,P('soldadoRei',{propR:'papel',angry:1}),{o:0,f:1})+act('leo',640,678,P('soldadoAzul',{propR:'espada',angry:1}),{o:0})
    +act('gov',1050,678,P('mercador',{c:'#b3261e',c2:'#fdf8ea'}),{o:0})
    +act('g1',380,678,P('padre',{propR:'cruz'}),{o:0})+act('g2',500,682,P('doutor',{hat:'tricorn',c:'#2f6b4f'}),{o:0})+act('g3',620,678,P('doutor',{c:'#1d1d28',hat:'tricorn',propR:'papel'}),{o:0})+act('g4',740,682,P('senhor',{hat:'tricorn'}),{o:0})+act('g5',860,678,P('soldadoAzul',{propR:'espada'}),{o:0})
    +act('r1',1420,678,P('soldadoRei',{propR:'mosquete'}),{f:1})+act('r2',1520,682,P('soldadoRei',{propR:'mosquete',hc:'#2b1b12'}),{f:1})+act('r3',1620,678,P('soldadoRei',{propR:'espada'}),{f:1})
    +scr('lei',640,300,'LEI ORGÂNICA',['✔ liberdade de imprensa','✔ liberdade de consciência','✘ a escravidão foi mantida'],420)
    +sg('s1',640,80,'1808: A CORTE NO RIO · IMPOSTOS E SECA',{fs:26,bg:RD})+sg('s2',640,80,'6 DE MARÇO DE 1817',{fs:34,bg:Y})+sg('s3',640,80,'REPÚBLICA · GOVERNO PROVISÓRIO DE 5 MEMBROS',{fs:24,bg:GR})
    +sg('s5',640,80,'“REVOLUÇÃO DOS PADRES” · NASCE A BANDEIRA',{fs:25,bg:BL})+sk2('s6',640,70,['ADESÃO: PARAÍBA E RIO GRANDE DO NORTE','CRUZ CABUGÁ → EUA · PADRE ROMA → BAHIA'],{fs:24,bg:Y})
    +sg('s7',640,80,'DUROU 75 DIAS',{fs:34,bg:RD})+sk2('s8',640,70,['PUNIÇÃO: PERNAMBUCO PERDE ALAGOAS','6 DE MARÇO = DATA MAGNA DE PERNAMBUCO'],{fs:25,bg:Y}),
  beats:[
    {t:'Em 1808, a corte portuguesa se instalou no Rio de Janeiro, e Pernambuco passou a pagar impostos pesados para sustentá-la. Somem-se a seca de 1816, a queda do açúcar e do algodão e os privilégios dos portugueses.',do(){show('s1');show('col')},say:['col','Imposto para a corte!']},
    {t:'O governador mandou prender os conspiradores. Em 6 de março de 1817, o capitão José de Barros Lima, o Leão Coroado, reagiu à ordem de prisão e matou o brigadeiro português que vinha prendê-lo.',do(){hide('s1');hide('col');hide('pe1');show('s2');show('leo');show('brig');later(2200,()=>{boom(750,560,1,'ZÁS');go('brig',{r:80,o:.3},.6)})},say:['leo','Eu não me entrego!']},
    {t:'A revolta tomou o Recife. O governador Caetano Pinto se rendeu, e os rebeldes proclamaram a República, com um governo provisório de cinco membros, entre eles Domingos José Martins e o padre João Ribeiro.',do(){hide('s2');hide('leo');hide('brig');show('gov');later(500,()=>walk('gov',{x:1460},2.4));show('s3');['g1','g2','g3','g4','g5'].forEach(k=>show(k))}},
    {t:'A Lei Orgânica garantiu liberdade de imprensa e de consciência e tolerância religiosa. Mas, para não perder o apoio dos senhores de engenho, a escravidão foi mantida.',do(){hide('s3');show('lei')}},
    {t:'Havia tantas batinas entre os líderes que ela ficou conhecida como a Revolução dos Padres. Nasceu aí a bandeira que Pernambuco usa até hoje.',do(){hide('lei');show('s5');show('ban')},say:['g1','Viva a pátria! Viva a liberdade!']},
    {t:'A revolução ganhou a adesão da Paraíba e do Rio Grande do Norte e mandou emissários: Cruz Cabugá aos Estados Unidos e o Padre Roma à Bahia, onde foi preso e fuzilado.',do(){hide('s5');show('s6')}},
    {t:'Durou 75 dias. Com o bloqueio naval e as tropas vindas da Bahia, o Recife caiu em maio. Os líderes foram executados, e Frei Caneca foi preso.',do(){hide('s6');show('s7');walk('r1',{x:990},2.4);walk('r2',{x:1100},2.6);walk('r3',{x:1210},2.8);later(2600,()=>{booms([[900,560,1,'PÁ'],[760,540,.9],[620,580,1]],420);['g1','g2','g3','g4','g5'].forEach(k=>go(k,{o:.3}))})}},
    {t:'Como punição, Pernambuco perdeu a comarca de Alagoas, que virou capitania independente. E o 6 de março tornou-se a Data Magna de Pernambuco.',do(){hide('s7');show('s8')}}
  ],
  facts:['Começou em 6 de março de 1817, hoje a Data Magna de Pernambuco, e durou 75 dias.','Republicana e separatista: a única revolta do período colonial que tomou o poder.','Manteve a escravidão. Ficou conhecida como “Revolução dos Padres”. Dela vem a bandeira de Pernambuco.','Punição: a perda da comarca de Alagoas.'],
  trap:'Em 1817 o Brasil ainda não era independente. A revolução foi contra o governo de Dom João VI, e não contra Dom Pedro I.'});

S({id:'beberibe',g:5,item:5,year:'1821–1822',title:'Convenção de Beberibe e Independência',
  art:()=>sky('day')+sun(1130,100)+clouds()+hill(300,520,460,200,'#5aa84a')+hill(1000,530,500,190,'#4f9f44')+field(480)
    +trees([[100,520,.9],[1190,520,1],[990,500,.7]])+palm(250,540,.8)
    +`<path d="M-10,566 Q320,530 640,576 T1290,566 V640 Q960,652 640,642 T-10,644Z" fill="#2f93da" stroke="#1f7fc6" stroke-width="4"/>`
    +act('imp',1060,704,pole('imp',290,116,78),{o:0,h:0})
    +act('j1',290,704,P('doutor',{c:'#2f6b4f'}))+act('j2',410,708,P('doutor',{c:'#6b4a2b',propR:'papel',hc:'#5a5f66'}))
    +act('rego',860,704,P('soldadoRei',{angry:1}),{f:1})+act('sp',980,708,P('soldadoRei',{propR:'mosquete'}),{f:1})
    +act('ger',560,704,P('doutor',{c:'#3d5a80'}),{o:0})+act('dp',900,704,P('doutor',Object.assign({},DPEDRO,{hat:'bicorn',propR:'espada',up:1})),{o:0})
    +scr('conv',640,290,'CONVENÇÃO DE BEBERIBE',['5 de outubro de 1821','saem as tropas portuguesas'],440)
    +sg('s1',640,80,'1821: JUNTA DE GOIANA × GOVERNADOR PORTUGUÊS',{fs:24,bg:BL})+sk2('s3',640,70,['JUNTA DE GERVÁSIO PIRES FERREIRA','1822: INDEPENDÊNCIA DO BRASIL'],{fs:26,bg:Y}),
  beats:[
    {t:'Em 1821, quando o Brasil ainda pertencia a Portugal, uma junta formada em Goiana enfrentou o governador português Luís do Rego Barreto.',do(){show('s1')},say:[['j1','Fora, Luís do Rego!'],['rego','Insolentes!']]},
    {t:'Em 5 de outubro de 1821, a Convenção de Beberibe selou a saída do governador e das tropas portuguesas. Pernambuco se livrou do domínio português onze meses antes do Sete de Setembro.',do(){hide('s1');show('conv');later(2600,()=>{go('rego',{f:1},.1);go('sp',{f:1},.1);walk('rego',{x:1420},2.6);walk('sp',{x:1520},2.6)})}},
    {t:'Uma junta presidida por Gervásio Pires Ferreira passou a governar a província. Em 1822, veio a Independência do Brasil, com Dom Pedro I.',do(){hide('conv');show('ger');show('s3');show('dp');show('imp')},say:['dp','Independência ou morte!']}
  ],
  facts:['Convenção de Beberibe, em 5 de outubro de 1821: saída do governador e das tropas portuguesas.','Junta de Goiana contra Luís do Rego Barreto. Depois, junta de Gervásio Pires Ferreira.','Aconteceu onze meses antes da Independência do Brasil.'],
  trap:'A Convenção de Beberibe é de 1821, anterior ao Sete de Setembro de 1822. Não é consequência da Independência.'});

S({id:'confederacao',g:5,item:5,year:'1824',title:'Confederação do Equador',
  art:()=>sky('day')+clouds()+pave(520,'#d9cba8')+sobrados(50,520,7,.66)+fort(1040,520,.95,'#c9c2b5')
    +act('cef',660,520,pole('ce',330,228,152),{o:0,h:0})
    +act('dp',170,678,P('doutor',Object.assign({},DPEDRO,{hat:'coroa',propR:'papel'})))+act('pais',520,678,P('doutor',{c:'#3d5a80'}))
    +act('bar',860,682,P('doutor',{c:'#6b4a2b',propR:'jornal',hat:null,hair:'short',hc:'#dddddd',beard:'full'}),{o:0,f:1})
    +act('i1',-200,678,P('soldadoAzul',{c:'#1f6b3a',propR:'mosquete'}))+act('i2',-320,682,P('soldadoAzul',{c:'#1f6b3a',propR:'espada'}))
    +ins('coch',640,290,480,230,`<rect width="480" height="230" fill="#8ecae6"/><rect y="150" width="480" height="80" fill="#2f93da"/>`+at(140,180,ship({flag:'imp'}),.5)+at(340,186,ship({flag:'imp'}),.42),'LORD COCHRANE: BLOQUEIO NAVAL')
    +dark('noite')
    +act('car',800,682,P('povo',{c:'#3a2a20',c2:'#3a2a20',hat:null,hair:'short'}),{o:0})+act('can',700,678,P('frei',{propR:'jornal'}))
    +act('pm',660,678,P('soldadoAzul',{hat:'quepe',propR:'espada'}),{o:0})
    +sk2('s1',640,70,['1823: A CONSTITUINTE É FECHADA','1824: CONSTITUIÇÃO OUTORGADA · PODER MODERADOR'],{fs:24,bg:RD})+sg('s2',640,80,'O IMPERADOR TROCA O PRESIDENTE DA PROVÍNCIA',{fs:24,bg:RD})
    +sk2('s3',640,70,['FREI CANECA · TYPHIS PERNAMBUCANO','CIPRIANO BARATA · SENTINELA DA LIBERDADE'],{fs:24,bg:BL})+sk2('s4',640,70,['2 DE JULHO DE 1824','CONFEDERAÇÃO DO EQUADOR'],{fs:30,bg:Y})
    +sg('s5',640,80,'ADESÕES: PARAÍBA · RIO GRANDE DO NORTE · CEARÁ',{fs:24,bg:GR})+sk2('s7',640,70,['FREI CANECA: FUZILADO EM 13/01/1825','FORTE DAS CINCO PONTAS'],{fs:26,bg:Y})
    +sk2('s8',640,70,['PUNIÇÃO: PERDE A COMARCA DO SÃO FRANCISCO','11/06/1825: CORPO DE POLÍCIA → PMPE'],{fs:25,bg:Y}),
  beats:[
    {t:'Em 1823, Dom Pedro I fechou a Assembleia Constituinte. Em 1824, outorgou uma Constituição centralizadora, com o Poder Moderador. As províncias ficaram sem autonomia.',do(){show('s1')},say:['dp','Quem modera sou eu!']},
    {t:'Em Pernambuco, o imperador ainda trocou o presidente da província: afastou Manuel de Carvalho Pais de Andrade, escolhido pelos pernambucanos, e nomeou um aliado seu.',do(){hide('s1');show('s2')},say:['pais','Quem me escolheu foi Pernambuco!']},
    {t:'No jornal Typhis Pernambucano, Frei Caneca atacava o autoritarismo do imperador. Cipriano Barata fazia o mesmo no Sentinela da Liberdade.',do(){hide('s2');show('s3');show('bar')},say:['can','O imperador não pode tudo!']},
    {t:'Em 2 de julho de 1824, Pais de Andrade proclamou a Confederação do Equador: uma república federativa, inspirada nos Estados Unidos, que chamou as províncias do Norte a se unirem.',do(){hide('s3');show('s4');show('cef');go('dp',{x:-150},1.5)},say:['pais','Viva a Confederação!']},
    {t:'Aderiram a Paraíba, o Rio Grande do Norte e o Ceará. Mas, quando se falou em suspender o tráfico de escravizados, parte da elite abandonou o movimento.',do(){hide('s4');show('s5')}},
    {t:'Dom Pedro contratou o almirante Lord Cochrane para bloquear o Recife e mandou tropas por terra, com o brigadeiro Lima e Silva. Em poucos meses, a Confederação foi esmagada.',do(){hide('s5');show('coch');walk('i1',{x:300},2.4);walk('i2',{x:190},2.4);later(2600,()=>{booms([[470,560,1,'PÁ'],[600,540,.9],[760,580,1]],420);hide('cef')})}},
    {t:'Frei Caneca foi condenado à forca, mas nenhum carrasco aceitou enforcá-lo. Acabou fuzilado em 13 de janeiro de 1825, no Forte das Cinco Pontas.',do(){hide('coch');hide('pais');hide('bar');go('noite',{o:.62},1.5);walk('can',{x:980},2.4);show('car');show('s7')},say:['car','Eu não enforco o frei!']},
    {t:'A punição foi dura: Pernambuco perdeu a Comarca do Rio São Francisco, que hoje é o oeste da Bahia. E em 11 de junho de 1825, um decreto de Dom Pedro I criou o Corpo de Polícia do Recife, origem da Polícia Militar de Pernambuco.',do(){go('noite',{o:0},1.2);hide('s7');hide('car');hide('i1');hide('i2');go('can',{o:.3});show('s8');show('pm')},say:['pm','Corpo de Polícia, às ordens!']}
  ],
  facts:['2 de julho de 1824: reação à Constituição outorgada e ao centralismo de Dom Pedro I.','Republicana, federalista e separatista. Líder: Pais de Andrade. Mártir: Frei Caneca.','Adesões: Paraíba, Rio Grande do Norte e Ceará.','Punição: perda da Comarca do São Francisco. Em 11 de junho de 1825 nasce o Corpo de Polícia, origem da PMPE.'],
  trap:'1817: perdeu Alagoas. 1824: perdeu a Comarca do São Francisco. A banca gosta de trocar as duas punições.'});

S({id:'mapa',g:5,item:5,year:'1817 · 1824 · 1988',title:'Como o mapa de Pernambuco mudou',
  art:()=>sky('paper')+`<path d="M1050,0 Q1000,360 1090,720 H1280 V0Z" fill="#8ecae6"/><text x="1264" y="706" text-anchor="end" font-size="18" fill="#7a6a4a">mapa esquemático, fora de escala</text>`
    +act('csf',0,0,`<path d="M300,362 L420,382 L560,372 L600,470 L520,600 L380,640 L260,560 L240,440Z" fill="#e8a05a" ${ST}/><text x="420" y="492" text-anchor="middle" font-size="21" fill="${OL}">COMARCA DO</text><text x="420" y="520" text-anchor="middle" font-size="21" fill="${OL}">SÃO FRANCISCO</text>`,{h:0})
    +act('al',0,0,`<path d="M860,352 L1040,332 L1012,424 L900,412Z" fill="#f28482" ${ST}/><text x="952" y="388" text-anchor="middle" font-size="19" fill="${OL}">ALAGOAS</text>`,{h:0})
    +`<path d="M300,300 L520,270 L760,280 L1000,250 L1040,330 L860,350 L640,360 L420,380 L300,360Z" fill="#63b04d" ${ST}/><text x="660" y="328" text-anchor="middle" font-size="30" fill="#ffffff" stroke="${OL}" stroke-width="1.2">PERNAMBUCO</text>`
    +act('fn',1180,180,`<circle r="16" fill="#63b04d" ${ST}/><circle cx="26" cy="12" r="7" fill="#63b04d" ${ST3}/>`,{o:.25,h:0})
    +act('leao',110,690,lion(),{s:1,h:190})
    +sg('s2',1000,540,'1817: PERDE ALAGOAS',{bg:RD,fs:26})+sk2('s3',620,70,['1824: PERDE A COMARCA DO SÃO FRANCISCO','PRIMEIRO PARA MINAS · EM 1827, PARA A BAHIA'],{fs:23,bg:'#ffe0a8'})+sg('s4',1020,250,'NORONHA VOLTA EM 1988',{fs:22,bg:GR}),
  beats:[
    {t:'Pausa para o mapa! A capitania de Pernambuco já foi muito maior do que o estado de hoje.',say:['leao','Olha só o tamanho que eu tinha!']},
    {t:'Em 1817, como castigo pela Revolução Pernambucana, Pernambuco perdeu a comarca de Alagoas.',do(){go('al',{x:40,y:70},2);show('s2')}},
    {t:'Em 1824, como castigo pela Confederação do Equador, perdeu a Comarca do São Francisco, entregue primeiro a Minas Gerais e, em 1827, à Bahia.',do(){go('csf',{x:-20,y:70},2);show('s3')}},
    {t:'Em compensação, Fernando de Noronha, que tinha virado território federal em 1942, voltou para Pernambuco com a Constituição de 1988.',do(){go('fn',{o:1,s:1.6},1.5);show('s4')}}
  ],
  facts:['1817: perda de Alagoas, castigo pela Revolução Pernambucana.','1824: perda da Comarca do São Francisco, castigo pela Confederação do Equador.','1988: Fernando de Noronha é reincorporado a Pernambuco.'],
  trap:'A Comarca do São Francisco não foi direto para a Bahia: passou primeiro a Minas Gerais, em 1824, e só em 1827 à Bahia.'});

S({id:'cabanos',g:5,item:5,year:'1832–1835',title:'Guerra dos Cabanos',
  art:()=>sky('storm')+cloud(300,100,1.2,'#dfe6ee')+cloud(900,130,1.3,'#dfe6ee')+hill(300,560,500,230,'#3f7f3a','#2f6b30')+hill(1000,580,520,210,'#3a7a36','#2f6b30')+field(530,'#4f9a45','#3a7a36')
    +trees([[60,540,1],[200,520,.9],[1080,520,1],[1230,540,1.1],[940,510,.8],[330,510,.7]],'#2a7a35')+oca(520,590,.8)+oca(770,580,.7)
    +act('c3',350,682,P('campones',{propR:'enxada'}),{o:0})+act('c1',480,680,P('indio',{propR:'arco'}),{o:0})+act('vp',640,678,P('campones',{propR:'mosquete',c:'#b9853f'}),{o:0})+act('c2',800,682,P('escravo',{propR:'facao'}),{o:0,f:1})
    +act('sen',1120,680,P('senhor',{propR:'saco'}),{o:0,f:1})+tree(1190,716,1.1,'#2a7a35')
    +act('bis',1420,680,P('padre',{c:'#7a1f6b',hat:'mitra',propR:'cruz'}),{f:1})
    +ins('ab',640,290,520,260,`<rect width="520" height="260" fill="#8ecae6"/><rect y="170" width="520" height="90" fill="#2f93da"/><rect x="300" y="150" width="220" height="110" fill="#f4e0a1"/>`+at(150,196,ship({flag:'imp'}),.5)+at(410,244,P('nobre',{c:'#1f6b3a',hat:'coroa',beard:null,hc:'#c98a2b'}),.55)+`<text x="150" y="34" text-anchor="middle" font-size="19" fill="${OL}">D. PEDRO I ABDICA (1831)</text><text x="410" y="120" text-anchor="middle" font-size="19" fill="${OL}">PEDRO II: 5 ANOS</text>`,'PERÍODO REGENCIAL · 1831–1840')
    +sg('s2',640,480,'SETEMBRIZADA · NOVEMBRADA · ABRILADA',{fs:25,bg:RD})
    +sk2('s3',640,70,['GUERRA DOS CABANOS (CABANADA) · 1832–1835','SUL DE PERNAMBUCO E NORTE DE ALAGOAS'],{fs:24,bg:Y})+sg('s4',640,80,'RESTAURADORA: QUERIA A VOLTA DE D. PEDRO I',{fs:24,bg:BL})+sk2('s5',640,70,['1834: MORRE D. PEDRO I','1835: FIM DA CABANADA'],{bg:Y}),
  beats:[
    {t:'Em 1831, Dom Pedro I abdicou e voltou para Portugal. Como o herdeiro tinha só cinco anos, o Brasil passou a ser governado por regentes, e as revoltas se espalharam.',do(){show('ab')}},
    {t:'No Recife, quartéis se rebelaram na Setembrizada e na Novembrada, de 1831, e na Abrilada, de 1832.',do(){show('s2')}},
    {t:'Nas matas do sul de Pernambuco e do norte de Alagoas começou, em 1832, a Guerra dos Cabanos, ou Cabanada. Os rebeldes eram gente pobre, que morava em cabanas: lavradores, indígenas e escravizados fugidos.',do(){hide('ab');hide('s2');show('s3');['c1','c2','c3','vp'].forEach(k=>show(k))}},
    {t:'Curiosamente, lutavam pela volta de Dom Pedro I ao trono e em defesa da religião católica. Por isso a Cabanada é chamada de revolta restauradora. Por trás dela havia também senhores de engenho e comerciantes portugueses descontentes com a Regência.',do(){hide('s3');show('s4');show('sen')},say:['vp','Queremos Dom Pedro de volta!']},
    {t:'O líder popular foi Vicente de Paula. Com a morte de Dom Pedro I, em 1834, a causa perdeu o sentido. Com a mediação do bispo de Olinda, a revolta terminou em 1835.',do(){hide('s4');hide('sen');show('s5');walk('bis',{x:980},2.6)},say:['bis','Paz, meus filhos.']}
  ],
  facts:['De 1832 a 1835, no período regencial, no sul de Pernambuco e no norte de Alagoas.','Rebeldes pobres, os “cabanos”: lavradores, indígenas e escravizados. Líder: Vicente de Paula.','Revolta restauradora: queria a volta de Dom Pedro I ao trono.'],
  trap:'Cabanada é de Pernambuco e Alagoas, e era restauradora. Cabanagem é do Pará, de 1835 a 1840. A banca troca os nomes.'});

S({id:'praieira',g:5,item:5,year:'1848–1850',title:'Revolução Praieira',
  art:()=>sky('day')+clouds()+pave(520,'#d9cba8')+sobrados(30,520,5,.7)
    +`<g transform="translate(456,520)"><rect x="0" y="-250" width="240" height="250" fill="#f7d06a" ${ST}/><path d="M-8,-250 L120,-300 L248,-250Z" fill="#b5532f" ${ST}/><rect x="14" y="-222" width="212" height="50" fill="#fdf8ea" ${ST3}/><text x="120" y="-187" text-anchor="middle" font-size="27" fill="${OL}">DIÁRIO NOVO</text><text x="120" y="-144" text-anchor="middle" font-size="19" fill="${OL}">RUA DA PRAIA</text><rect x="26" y="-120" width="44" height="60" fill="#fff" ${ST3}/><rect x="170" y="-120" width="44" height="60" fill="#fff" ${ST3}/><path d="M92,0 V-78 a28,28 0 0 1 56,0 V0Z" fill="#5a3a22" ${ST}/></g>`
    +sobrados(730,520,7,.7)
    +act('banca',1150,680,crate(0,0,'LOJA')+crate(72,0)+crate(36,-50),{o:0,h:0})+act('lus',1050,680,P('mercador',{propR:'saco'}),{o:0,f:1})
    +act('cav',-220,680,rider(Object.assign({},C.doutor,{c:'#7b1e2b',beard:'full'})),{h:290})
    +act('pov',760,680,P('povo'))
    +act('ivo',290,680,P('soldadoAzul',{propR:'espada',hat:'quepe'}),{o:0})+act('bor',420,684,P('doutor',{c:'#6b4a2b',propR:'papel',hat:null,hair:'short'}),{o:0})+act('nun',550,680,P('doutor',{c:'#3d5a80'}),{o:0})
    +act('gua',930,680,P('doutor',{c:'#1d1d28',angry:1,propR:'cajado'}),{o:0,f:1})
    +act('t1',1420,680,P('soldadoAzul',{c:'#1f6b3a',propR:'mosquete'}),{f:1})+act('t2',1520,684,P('soldadoAzul',{c:'#1f6b3a',propR:'mosquete'}),{f:1})
    +scr('man',640,300,'MANIFESTO AO MUNDO · 1849',['voto livre e universal','liberdade de imprensa','comércio a retalho só para brasileiros','fim do Poder Moderador'],540)
    +sg('s1',640,80,'“OU HÁ DE SER CAVALCANTI, OU HÁ DE SER CAVALGADO”',{fs:22,bg:Y})+sg('s2',640,80,'TERRA: GRANDES SENHORES · COMÉRCIO: PORTUGUESES',{fs:23,bg:RD})
    +sg('s3',640,80,'PRAIEIROS (LIBERAIS) × GUABIRUS (CONSERVADORES)',{fs:23,bg:BL})+sg('s4',640,80,'NOVEMBRO DE 1848: A REVOLTA COMEÇA EM OLINDA',{fs:24,bg:Y})
    +sk2('s6',640,70,['2/2/1849: O ATAQUE AO RECIFE FRACASSA','MORRE NUNES MACHADO · PEDRO IVO RESISTE ATÉ 1850'],{fs:23,bg:RD})+sg('s7',640,80,'ÚLTIMA GRANDE REVOLTA DO IMPÉRIO',{fs:28,bg:Y}),
  beats:[
    {t:'Em meados do século dezenove, Pernambuco era dominado por poucas famílias. Dizia a quadrinha: quem viver em Pernambuco há de estar desenganado; ou há de ser Cavalcanti, ou há de ser cavalgado.',do(){show('s1');walk('cav',{x:300},3)},say:['pov','E eu sou o cavalgado...']},
    {t:'As terras estavam nas mãos dos grandes senhores, e o comércio a retalho, nas mãos dos portugueses. Faltava trabalho para os brasileiros pobres.',do(){hide('s1');go('cav',{f:-1},.1);walk('cav',{x:-260},2.4);show('s2');show('lus');show('banca')}},
    {t:'Os liberais radicais formaram o Partido da Praia, que tinha esse nome porque seu jornal, o Diário Novo, ficava na Rua da Praia. Seus adversários conservadores eram chamados de guabirus.',do(){hide('s2');hide('lus');hide('banca');show('s3');show('ivo');show('bor');show('nun');show('gua')}},
    {t:'Em 1848, o imperador demitiu o governo liberal e nomeou um presidente conservador para a província. Os praieiros pegaram em armas, a partir de Olinda.',do(){hide('s3');show('s4')},say:['gua','Por ordem do imperador, agora mando eu!']},
    {t:'No Manifesto ao Mundo, de 1849, escrito por Borges da Fonseca, pediam voto livre e universal, liberdade de imprensa, trabalho como garantia de vida, comércio a retalho só para brasileiros e o fim do Poder Moderador.',do(){hide('s4');show('man')}},
    {t:'Em fevereiro de 1849, atacaram o Recife e foram derrotados. O deputado Nunes Machado morreu no combate. Pedro Ivo ainda resistiu no interior até 1850.',do(){hide('man');show('s6');walk('t1',{x:1010},2.2);walk('t2',{x:1120},2.4);later(2400,()=>{booms([[820,560,1,'PÁ'],[660,540,.9],[560,580,1]],420);go('nun',{r:-80,o:.3},.8)})}},
    {t:'A Praieira foi a última grande revolta provincial do Império. Depois dela, o Segundo Reinado viveu décadas de estabilidade.',do(){hide('s6');show('s7');hide('bor');go('ivo',{f:-1},.1);walk('ivo',{x:-160},3)}}
  ],
  facts:['De 1848 a 1850: liberais, os praieiros, contra conservadores, os guabirus.','Manifesto ao Mundo: voto universal, liberdade de imprensa, comércio a retalho para brasileiros e fim do Poder Moderador.','Líderes: Pedro Ivo, Nunes Machado e Borges da Fonseca.','Foi a última grande revolta do período imperial.'],
  trap:'A Praieira teve influência das revoluções de 1848 na Europa, mas o Manifesto ao Mundo não pediu o fim da escravidão.'});

S({id:'segundo-reinado',g:5,item:5,year:'1850–1889',title:'Bacharéis, trilhos e abolição',
  art:()=>sky('day')+sun(1150,96)+clouds()+pave(520,'#d9cba8')+teatro(250,520,.9,'#f6c7b0')+teatro(690,520,.8,'#f7e3a8')+usina(1090,520,.9)
    +`<path d="M-10,606 H1290" stroke="#5a5f66" stroke-width="7"/>`+Array.from({length:33},(_,i)=>`<rect x="${i*40}" y="606" width="12" height="10" fill="#7a4a24"/>`).join('')
    +act('trem',-280,604,trem(),{h:0})
    +act('br',980,692,pole('br',300,130,88),{o:0,h:0})
    +act('tob',620,690,P('doutor',{sk:'mi',propR:'livro',hat:null,hair:'short'}),{o:0})+act('qq',420,690,P('campones',{propR:'balanca',angry:1}),{o:0})
    +act('nab',500,690,P('doutor',{c:'#3d5a80',hat:null,hair:'short',propR:'papel'}),{o:0})+act('mar',660,694,P('doutor',{c:'#2f6b4f',propR:'tocha'}),{o:0})+act('lib',820,690,P('escravo'),{o:0})
    +sg('s1',270,240,'TEATRO DE SANTA ISABEL · 1850',{fs:22,bg:BL})+sk2('s2',640,60,['FACULDADE DE DIREITO','OLINDA (1827) → RECIFE (1854)','ESCOLA DO RECIFE · TOBIAS BARRETO'],{fs:24,bg:Y})
    +sk2('s3',640,70,['1858: 2ª FERROVIA DO BRASIL (RECIFE–CABO)','USINAS NO LUGAR DOS ENGENHOS BANGUÊS'],{fs:24,bg:GR})+sk2('s4',640,70,['RONCO DA ABELHA · 1851','QUEBRA-QUILOS · 1874'],{bg:RD})
    +sk2('s5',640,70,['ABOLICIONISMO: JOAQUIM NABUCO','JOSÉ MARIANO E O CLUBE DO CUPIM'],{fs:26,bg:BL})+sk2('s6',640,70,['1888: LEI ÁUREA','1889: REPÚBLICA'],{fs:30,bg:Y}),
  beats:[
    {t:'Na calmaria do Segundo Reinado, o Recife se modernizou. Desde o governo do Conde da Boa Vista vieram pontes, estradas e o Teatro de Santa Isabel, inaugurado em 1850.',do(){show('s1')}},
    {t:'A Faculdade de Direito, criada em Olinda em 1827 e transferida para o Recife em 1854, formou a elite do país. Dela saiu a Escola do Recife, de Tobias Barreto.',do(){hide('s1');show('s2');show('tob')}},
    {t:'Em 1858, saiu do Recife a segunda ferrovia do Brasil, rumo ao Cabo. E as usinas, com máquinas a vapor, começaram a substituir os velhos engenhos banguês.',do(){hide('s2');hide('tob');show('s3');go('trem',{x:1600},7)}},
    {t:'No Agreste e no Sertão, o povo se rebelou contra novidades do governo: o Ronco da Abelha, de 1851, contra o registro civil, e o Quebra-Quilos, de 1874, contra o sistema métrico e os impostos.',do(){hide('s3');show('s4');show('qq')},say:['qq','Abaixo os quilos e os impostos!']},
    {t:'O Recife virou capital do abolicionismo. Joaquim Nabuco discursava no parlamento, e José Mariano, com o Clube do Cupim, ajudava escravizados a fugir para o Ceará, onde a abolição veio em 1884.',do(){hide('s4');hide('qq');show('s5');show('nab');show('mar');show('lib');later(900,()=>walk('lib',{x:1380},3.5))},say:['nab','A escravidão é um crime!']},
    {t:'Em 1888, a Lei Áurea acabou com a escravidão. Em 1889, caiu a monarquia: começava a República.',do(){hide('s5');show('s6');show('br')}}
  ],
  facts:['Faculdade de Direito: Olinda, 1827; Recife, 1854. Escola do Recife, com Tobias Barreto.','Quebra-Quilos, de 1874: contra o sistema métrico e os impostos.','Abolicionismo: Joaquim Nabuco, José Mariano e o Clube do Cupim.','As usinas substituíram os engenhos banguês.'],
  trap:'O Diário de Pernambuco, de 1825, é o jornal mais antigo em circulação na América Latina. Não confunda com o Diário Novo, dos praieiros.'});
