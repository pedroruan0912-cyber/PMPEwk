/* ===== Episódios: item 6 do edital (Pernambuco durante o período republicano) ===== */
const ARRAES={c:'#3d5a80',c2:'#3d5a80',hc:'#5a5f66',beard:'mustache',bc:'#5a5f66'};
function casarao(x,y,t1,t2,c){return `<g transform="translate(${x},${y})"><rect x="0" y="-250" width="250" height="250" fill="${c||'#f7d06a'}" ${ST}/><path d="M-8,-250 L125,-300 L258,-250Z" fill="#b5532f" ${ST}/><rect x="12" y="-222" width="226" height="50" fill="#fdf8ea" ${ST3}/><text x="125" y="-189" text-anchor="middle" font-size="${Math.min(24,Math.floor(300/t1.length))}" fill="${OL}">${t1}</text>${t2?`<text x="125" y="-146" text-anchor="middle" font-size="19" fill="${OL}">${t2}</text>`:''}<rect x="26" y="-120" width="46" height="60" fill="#fff" ${ST3}/><rect x="178" y="-120" width="46" height="60" fill="#fff" ${ST3}/><path d="M96,0 V-78 a29,29 0 0 1 58,0 V0Z" fill="#5a3a22" ${ST}/></g>`}

S({id:'republica-velha',g:6,item:6,year:'1889–1930',title:'Coronéis, oligarquias e cangaço',
  art:()=>sky('sertao')+sun(1110,110,56,'#fff3b0')+hill(320,520,420,130,'#c9924a','#b07c3a')+hill(1000,530,460,120,'#cf9a52','#b07c3a')
    +`<rect x="-10" y="500" width="1300" height="230" fill="#dba659"/><path d="M-10,500 H1290" stroke="#b07c3a" stroke-width="5"/>`
    +church(190,500,.6)+sobrados(330,500,3,.55,['#fdf8ea','#f7d06a','#8ecae6'])+cactus(990,530,1)+cactus(1190,580,1.2)+cactus(830,520,.7)
    +act('urna',520,690,urna(),{h:0})
    +act('cor',300,690,P('coronel',{propR:'cajado'}))+act('ele',700,690,P('campones',{propR:'papel'}),{f:1})
    +act('rosa',420,690,P('doutor',{beard:'full',c:'#1d1d28'}),{o:0})+act('dan',1420,690,P('militar',{hat:'quepe',hatc:'#4f6b3a',propR:'espada'}),{f:1})
    +act('lamp',880,690,P('cangaceiro',{propR:'mosquete',glasses:1}),{o:0,f:1})+act('mb',1030,694,P('escrava',{sk:'mi',c:'#b9853f',c2:'#5e3b1a',hat:'couro',hair:'long'}),{o:0,f:1})
    +act('gf',480,690,P('politico',{propR:'livro',glasses:1,c:'#6b4a2b',c2:'#6b4a2b',book:'#1f6b3a'}),{o:0})+act('fr',660,690,P('passista',{propR:'sombrinha',up:1}),{o:0})
    +sg('s1',640,80,'CORONELISMO · VOTO DE CABRESTO',{bg:Y})+sg('s2',640,80,'OLIGARQUIA DE ROSA E SILVA · ATÉ 1911',{fs:26,bg:BL})
    +sk2('s3',640,70,['1911 · “POLÍTICA DAS SALVAÇÕES”','O GENERAL DANTAS BARRETO VENCE ROSA E SILVA'],{fs:24,bg:RD})
    +sk2('s4',640,70,['CANGAÇO · LAMPIÃO, DE SERRA TALHADA','MORTO EM 1938, EM ANGICO (SERGIPE)'],{fs:24,bg:Y})+sk2('s5',640,70,['1926 · MOVIMENTO REGIONALISTA','GILBERTO FREYRE'],{fs:26,bg:GR}),
  beats:[
    {t:'Com a República, mandava quem controlava os votos. No interior, os coronéis usavam o voto de cabresto: o eleitor votava em quem o chefe mandasse.',do(){show('s1');walk('ele',{x:600},2)},say:['cor','Vote em quem eu mandar.']},
    {t:'Em Pernambuco, a máquina política era de Rosa e Silva, conselheiro do Império que chegou a vice-presidente da República e dominou o estado até 1911.',do(){hide('s1');hide('ele');show('s2');show('rosa')}},
    {t:'Em 1911, na política das salvações do presidente Hermes da Fonseca, o general Dantas Barreto derrotou Rosa e Silva, numa eleição que terminou em tiroteio nas ruas do Recife.',do(){hide('s2');show('s3');walk('dan',{x:780},2.4);later(2500,()=>{booms([[600,580,1,'PÁ'],[520,560,.9]],420);go('rosa',{f:-1},.1);walk('rosa',{x:-160},2.4)})}},
    {t:'No Sertão, a seca, a miséria e as brigas de família alimentaram o cangaço. O cangaceiro mais famoso, Virgulino Ferreira, o Lampião, nasceu em Serra Talhada e foi morto em 1938, em Angico, Sergipe.',do(){hide('s3');hide('cor');hide('urna');go('dan',{x:1500},1.5);show('s4');show('lamp');show('mb')},say:['lamp','Olê, mulher rendeira!']},
    {t:'Enquanto isso, no Recife, o frevo ganhava as ruas, e em 1926 Gilberto Freyre lançava o Movimento Regionalista, em defesa das tradições do Nordeste.',do(){hide('s4');hide('lamp');hide('mb');show('s5');show('gf');show('fr');cls('fr','dance')}}
  ],
  facts:['Coronelismo e voto de cabresto. Oligarquia de Rosa e Silva, até 1911.','1911: o general Dantas Barreto vence, na “política das salvações”.','Cangaço: Lampião nasceu em Serra Talhada e foi morto em 1938, em Angico, Sergipe.','1926: Movimento Regionalista, de Gilberto Freyre.'],
  trap:'O cangaço é chamado de banditismo social: nasceu da miséria e do mandonismo do Sertão. Não era um movimento político organizado.'});

S({id:'1930',g:6,item:6,year:'1930–1945',title:'Revolução de 1930 e Estado Novo',
  art:()=>sky('day')+clouds()+pave(520,'#d9cba8')+sobrados(30,520,5,.7)+casarao(420,520,'CONFEITARIA GLÓRIA','RECIFE')+sobrados(700,520,4,.7)
    +act('moc',1110,530,`<path d="M-70,0 V-40 M70,0 V-40 M0,0 V-40" stroke="${OL}" stroke-width="7"/><rect x="-84" y="-104" width="168" height="66" fill="#a9843f" ${ST}/><path d="M-98,-104 L0,-150 L98,-104Z" fill="#c9983f" ${ST}/><rect x="-14" y="-84" width="28" height="46" fill="#4a3018" ${ST3}/>`,{h:0})
    +act('casa',1110,530,`<rect x="-84" y="-100" width="168" height="100" fill="#fdf8ea" ${ST}/><path d="M-98,-100 L0,-150 L98,-100Z" fill="#b5532f" ${ST}/><rect x="-16" y="-60" width="32" height="60" fill="#7a4a24" ${ST3}/><rect x="-66" y="-70" width="30" height="30" fill="#3a6fa5" ${ST3}/><rect x="36" y="-70" width="30" height="30" fill="#3a6fa5" ${ST3}/>`,{o:0,h:0})
    +act('jp',540,690,P('coronel',{propR:null,beard:null,hc:'#2b1b12'}))
    +act('gv',300,690,P('politico',{c:'#3a3a48',c2:'#3a3a48'}),{o:0})+act('lc',440,694,P('politico',{c:'#6b4a2b',c2:'#6b4a2b',glasses:1}),{o:0})
    +act('reb1',700,690,P('militar',{hat:'quepe',hatc:'#4f6b3a',propR:'bandeira',flag:'red'}),{o:0})+act('reb2',850,694,P('militar',{propR:'mosquete'}),{o:0})
    +act('ag',620,690,P('politico',{c:'#1d1d28',c2:'#1d1d28',glasses:1,hc:'#1d120b'}),{o:0})
    +act('dem',760,690,P('politico',{fit:'camisa',c:'#fdf8ea',c2:'#3a3a48',propR:'bandeira',flag:'br'}),{o:0})
    +sk2('s1',640,70,['26 DE JULHO DE 1930','JOÃO PESSOA É ASSASSINADO NO RECIFE'],{fs:26,bg:RD})+sk2('s2',640,70,['REVOLUÇÃO DE 1930 · VARGAS NO PODER','INTERVENTOR: CARLOS DE LIMA CAVALCANTI'],{fs:24,bg:Y})
    +sk2('s3',640,70,['NOVEMBRO DE 1935 · LEVANTE COMUNISTA','RECIFE, NATAL E RIO DE JANEIRO'],{fs:25,bg:RD})+sk2('s4',640,70,['ESTADO NOVO (1937–1945)','INTERVENTOR: AGAMENON MAGALHÃES'],{fs:26,bg:BL})
    +sg('s4b',1040,330,'LIGA SOCIAL CONTRA O MOCAMBO',{fs:20})+sk2('s5',640,70,['3 DE MARÇO DE 1945','MORRE O ESTUDANTE DEMÓCRITO DE SOUZA FILHO'],{fs:24,bg:RD}),
  beats:[
    {t:'Em 26 de julho de 1930, João Pessoa, presidente da Paraíba e candidato a vice de Getúlio Vargas, foi assassinado na Confeitaria Glória, no Recife. O crime foi o estopim da Revolução de 1930.',do(){show('s1');later(2600,()=>{boom(600,600,1,'PÁ');go('jp',{r:-82,o:.3},.7)})}},
    {t:'Vargas tomou o poder. O governador Estácio Coimbra foi deposto, e Carlos de Lima Cavalcanti assumiu Pernambuco como interventor.',do(){hide('s1');hide('jp');show('s2');show('gv');show('lc')},say:['gv','A Revolução venceu!']},
    {t:'Em novembro de 1935, militares ligados à Aliança Nacional Libertadora se rebelaram no Recife, em Natal e no Rio de Janeiro. A chamada Intentona Comunista foi sufocada em poucos dias.',do(){hide('s2');hide('gv');hide('lc');show('s3');show('reb1');show('reb2');later(2600,()=>{booms([[780,560,1,'PÁ'],[900,590,.9]],420);go('reb1',{o:.3});go('reb2',{o:.3})})}},
    {t:'Em 1937, Vargas deu o golpe do Estado Novo e nomeou Agamenon Magalhães interventor. Seu governo combateu os mocambos, mas também censurou a imprensa e perseguiu os terreiros de xangô.',do(){hide('s3');hide('reb1');hide('reb2');show('s4');show('ag');show('s4b');later(2400,()=>{hide('moc');show('casa')})},say:['ag','Ordem! E a imprensa, calada.']},
    {t:'Em março de 1945, num comício pela democracia, a polícia matou o estudante Demócrito de Souza Filho, na Praça da Independência. A ditadura de Vargas estava no fim.',do(){hide('s4');hide('s4b');hide('ag');show('s5');show('dem');later(3000,()=>{boom(790,580,1,'PÁ');go('dem',{o:.35})})}}
  ],
  facts:['O assassinato de João Pessoa, no Recife, em 1930, foi o estopim da Revolução de 1930.','Interventores: Carlos de Lima Cavalcanti, de 1930 a 1937, e Agamenon Magalhães, de 1937 a 1945.','Levante de 1935 no Recife: a Intentona Comunista.','Estado Novo: Liga Social contra o Mocambo, censura e repressão aos cultos afro-brasileiros.'],
  trap:'João Pessoa governava a Paraíba, mas foi morto no Recife. A banca troca o lugar do crime.'});

S({id:'ligas',g:6,item:6,year:'1945–1964',title:'Ligas Camponesas e Miguel Arraes',
  art:()=>sky('day')+sun(1150,96)+clouds()+hill(300,520,460,180,'#5aa84a')+hill(980,530,500,170,'#4f9f44')+field(490,'#7cc15a','#5a9a3e')+casaGrande(1010,470,.6)+canefield(0,1280,580,.9,38)
    +act('c3',170,696,P('escrava',{sk:'mi',c:'#d9c8a0',hatc:'#3a86ff'}))+act('c1',300,696,P('campones',{propR:'enxada'}))+act('c2',430,700,P('campones',{sk:'af',propR:'facao',hc:'#1d120b'}))
    +act('jul',600,696,P('politico',{c:'#3a3a48',c2:'#3a3a48',propR:'papel'}),{o:0})
    +ins('sud',620,290,460,240,`<rect width="460" height="240" fill="#8ecae6"/><rect y="200" width="460" height="40" fill="#cdbf9f"/>`+predio(70,204,100,150,'#b5c4d6')+predio(190,204,130,186,'#9fb4cc')+predio(340,204,80,120,'#8fa6c2')+`<rect x="196" y="24" width="118" height="30" fill="#f6c21c" stroke="${OL}" stroke-width="3"/><text x="255" y="46" text-anchor="middle" font-size="21" fill="${OL}">SUDENE</text>`,'SUDENE · 1959 · SEDE NO RECIFE')+act('cf',940,696,P('politico',{glasses:1,propR:'livro'}),{o:0,f:1})
    +act('quadro',740,590,`<path d="M-90,-10 V70 M90,-10 V70" stroke="${OL}" stroke-width="8" stroke-linecap="round"/><rect x="-130" y="-160" width="260" height="150" fill="#2f5f3a" ${ST}/><text x="0" y="-92" text-anchor="middle" font-size="44" fill="#ffffff">TI-JO-LO</text><text x="0" y="-42" text-anchor="middle" font-size="28" fill="#f6c21c">tijolo</text>`,{o:0,h:0})
    +act('pf',960,696,P('politico',{c:'#6b4a2b',c2:'#6b4a2b',glasses:1,beard:'full',propR:'livro'}),{o:0,f:1})
    +act('arr',640,696,P('politico',ARRAES),{o:0})+act('usi',860,696,P('coronel',{}),{o:0,f:1})
    +scr('acordo',640,330,'ACORDO DO CAMPO · 1963',['salário mínimo para','os trabalhadores da cana'],440)
    +sk2('s1',640,70,['1955 · ENGENHO GALILEIA','VITÓRIA DE SANTO ANTÃO'],{fs:26,bg:GR})+sk2('s2',640,70,['LIGAS CAMPONESAS · FRANCISCO JULIÃO','“REFORMA AGRÁRIA NA LEI OU NA MARRA”'],{fs:24,bg:Y})
    +sk2('s4',640,70,['MOVIMENTO DE CULTURA POPULAR (MCP) · 1960','PAULO FREIRE E A ALFABETIZAÇÃO DE ADULTOS'],{fs:23,bg:BL})+sg('s5',640,80,'MIGUEL ARRAES · GOVERNADOR ELEITO EM 1962',{fs:25,bg:Y}),
  beats:[
    {t:'Na Zona da Mata, os trabalhadores da cana viviam na miséria. Em 1955, os moradores do Engenho Galileia, em Vitória de Santo Antão, criaram uma associação para se defender.',do(){show('s1')}},
    {t:'Nasciam as Ligas Camponesas, com o advogado e deputado Francisco Julião. O lema era: reforma agrária na lei ou na marra. Em 1959, o Engenho Galileia foi desapropriado.',do(){hide('s1');show('s2');show('jul')},say:['jul','Na lei ou na marra!']},
    {t:'No mesmo ano de 1959, o governo federal criou a Sudene, com sede no Recife, idealizada pelo economista Celso Furtado para desenvolver o Nordeste.',do(){hide('s2');hide('jul');show('sud');show('cf')}},
    {t:'No Recife, o Movimento de Cultura Popular levava arte e educação aos bairros pobres. Nele, o educador Paulo Freire começou a criar o seu método de alfabetização de adultos.',do(){hide('sud');hide('cf');show('s4');show('quadro');show('pf')},say:['pf','A leitura do mundo precede a leitura da palavra.']},
    {t:'Miguel Arraes, prefeito do Recife e, a partir de 1963, governador, mediou o Acordo do Campo, que garantiu o salário mínimo aos cortadores de cana.',do(){hide('s4');hide('quadro');hide('pf');show('s5');show('arr');show('usi');later(1500,()=>show('acordo'))}}
  ],
  facts:['Ligas Camponesas: Engenho Galileia, em Vitória de Santo Antão, 1955. Líder: Francisco Julião.','Sudene: criada em 1959, com sede no Recife. Idealizador: Celso Furtado.','Movimento de Cultura Popular e Paulo Freire: educação popular.','Miguel Arraes: eleito governador em 1962. Acordo do Campo, em 1963.'],
  trap:'As Ligas Camponesas surgiram na Zona da Mata, região da cana, e não no Sertão.'});

S({id:'ditadura',g:6,item:6,year:'1964–1985',title:'O golpe de 1964 e a ditadura',
  art:()=>sky('storm')+cloud(260,110,1.2,'#dfe6ee')+cloud(940,120,1.3,'#dfe6ee')+pave(520,'#bdb39a')+teatro(640,520,1.1,'#f1ead9')+`<text x="640" y="342" text-anchor="middle" font-size="19" fill="${OL}">PALÁCIO DO CAMPO DAS PRINCESAS</text>`+palm(150,560,.9)+palm(1130,560,.9)
    +act('tq',-280,696,tanque(),{h:0})
    +act('m2',-210,696,P('militar',{propR:'mosquete'}))+act('m1',-100,696,P('militar',{propR:'mosquete'}))+act('arr',640,696,P('politico',ARRAES))
    +act('greg',540,696,P('escravo',{sk:'mi',hc:'#dddddd',c2:'#6b5a3a'}),{o:0})
    +act('povo',0,0,crowd(700,1240,704,8,.7),{o:0,h:0})
    +dark('noite')
    +act('hel',700,696,P('frei',{c:'#efe4c9',hair:'short',hc:'#dddddd',cord:0,propR:'cruz'}),{o:0})
    +ins('aer',640,300,480,230,`<rect width="480" height="230" fill="#8ecae6"/><rect y="170" width="480" height="60" fill="#8f959c"/><path d="M0,200 H480" stroke="#fff" stroke-width="5" stroke-dasharray="30 22"/>`+at(170,160,aviao(),.8)+`<polygon points="${starPts(370,130,56,9,.55)}" fill="#ffd23f" stroke="#e8590c" stroke-width="6"/>`,'AEROPORTO DOS GUARARAPES · 1966')
    +ins('sua',420,320,400,220,`<rect width="400" height="220" fill="#8ecae6"/><rect y="150" width="400" height="70" fill="#2f93da"/><rect x="250" y="130" width="150" height="90" fill="#bdb39a"/><path d="M300,130 V40 H370 M300,60 L350,40" stroke="${OL}" stroke-width="7" fill="none"/>`+at(130,182,boat(),.9)+crate(330,130),'COMPLEXO DE SUAPE · ANOS 1970')
    +act('ari',900,696,P('politico',{c:'#f1ead9',c2:'#f1ead9',propR:'livro',hc:'#5a5f66',book:'#b3261e'}),{o:0,f:1})
    +act('conf',0,0,confetti(40),{o:0,h:0})
    +sk2('s1',640,70,['1º DE ABRIL DE 1964 · GOLPE MILITAR','ARRAES É DEPOSTO E PRESO'],{fs:26,bg:RD})+sg('s2',640,80,'GREGÓRIO BEZERRA É ARRASTADO EM CASA FORTE',{fs:24,bg:RD})
    +sk2('s3',640,70,['DOM HELDER CÂMARA','ARCEBISPO DE OLINDA E RECIFE · 1964–1985'],{fs:25,bg:Y})+sg('s5',900,440,'MOVIMENTO ARMORIAL · 1970',{fs:21,bg:GR})+sk2('s6',640,70,['1979 · ANISTIA','ARRAES VOLTA DO EXÍLIO'],{fs:28,bg:GR}),
  beats:[
    {t:'Em 1º de abril de 1964, o golpe militar chegou ao Palácio do Campo das Princesas. Miguel Arraes se recusou a renunciar. Foi preso, levado a Fernando de Noronha e depois exilado na Argélia.',do(){show('s1');go('tq',{x:230},2.6);walk('m1',{x:460},2.6);walk('m2',{x:350},2.6);later(4200,()=>{go('arr',{f:1},.1);walk('arr',{x:1450},2.6);walk('m1',{x:1340},2.8)})},say:['arr','Não renuncio!']},
    {t:'O líder comunista Gregório Bezerra foi amarrado e arrastado pelas ruas de Casa Forte. Francisco Julião e Paulo Freire também foram presos e seguiram para o exílio.',do(){hide('s1');show('s2');show('greg');go('m2',{x:430},1.5)}},
    {t:'A voz contra a violência foi a de Dom Helder Câmara, arcebispo de Olinda e Recife de 1964 a 1985. Censurado no Brasil, era ouvido no mundo inteiro. Em 1969, seu auxiliar, o padre Henrique, foi assassinado.',do(){hide('s2');hide('greg');hide('m2');hide('tq');go('noite',{o:.6},1.5);show('hel');show('s3')},say:['hel','Quando pergunto por que eles são pobres, chamam-me de comunista.']},
    {t:'Em 1966, uma bomba explodiu no Aeroporto dos Guararapes, num atentado contra o general Costa e Silva. Os governadores passaram a ser escolhidos de forma indireta.',do(){hide('s3');show('aer')}},
    {t:'Na economia, o regime investiu no Complexo Industrial Portuário de Suape, iniciado nos anos 1970. E, na cultura, Ariano Suassuna lançou o Movimento Armorial.',do(){hide('aer');show('sua');show('ari');show('s5')}},
    {t:'Com a anistia de 1979, Arraes voltou do exílio e foi recebido por uma multidão no Recife.',do(){hide('sua');hide('ari');hide('s5');hide('hel');go('noite',{o:0},1.2);go('arr',{x:-120,o:1,f:1},.05);later(300,()=>walk('arr',{x:520},2.6));show('povo');show('conf');show('s6')},say:['arr','Voltei!',520,470]}
  ],
  facts:['1964: Arraes é deposto e preso, e depois se exila na Argélia.','Dom Helder Câmara, arcebispo de Olinda e Recife: voz dos direitos humanos.','Atentado do Aeroporto dos Guararapes, em 1966.','Suape é um projeto dos anos 1970. A anistia veio em 1979.'],
  trap:'Arraes foi governador três vezes: eleito em 1962 e deposto em 1964, eleito de novo em 1986 e em 1994.'});

S({id:'redemocratizacao',g:6,item:6,year:'1982 até hoje',title:'Redemocratização e Pernambuco atual',
  art:()=>sky('day')+sun(120,110)+clouds()+pave(470,'#cdbf9f')+skyline(470)
    +`<rect x="-10" y="540" width="1300" height="74" fill="#2f93da"/><path d="M-10,540 H1290 M-10,614 H1290" stroke="#1f6fb0" stroke-width="5"/>`+bridge(370,574,540)+`<rect x="-10" y="616" width="1300" height="114" fill="#cdbf9f"/>`
    +act('urna',250,696,urna(),{h:0})+act('el',440,696,P('politico',{fit:'camisa',c:'#3a86ff',c2:'#3a3a48',propR:'papel'}),{f:1})
    +act('raq',560,696,P('dama',{c:'#b3261e',c2:'#7a1f1f',hair:'long'}),{o:0})
    +ins('fn',380,310,420,230,`<rect width="420" height="230" fill="#8ecae6"/><rect y="150" width="420" height="80" fill="#2f93da"/><path d="M60,160 Q120,120 200,130 L240,50 L270,128 Q340,120 380,160Z" fill="#63b04d" stroke="${OL}" stroke-width="4"/><path d="M60,160 H380" stroke="#f4e0a1" stroke-width="8"/>`,'FERNANDO DE NORONHA · 1988')
    +sk2('ga',950,70,['1982 · ROBERTO MAGALHÃES','1986 · MIGUEL ARRAES'],{fs:21,bg:Y})+sk2('gb',950,208,['1990 · JOAQUIM FRANCISCO','1994 · MIGUEL ARRAES','1998 E 2002 · JARBAS VASCONCELOS','2006 E 2010 · EDUARDO CAMPOS'],{fs:21,bg:Y})+sk2('gc',950,412,['2014 E 2018 · PAULO CÂMARA','2022 · RAQUEL LYRA'],{fs:21,bg:Y})
    +act('eco',0,0,sign(330,150,'SUAPE: PORTO E INDÚSTRIA',{fs:22,bg:BL})+sign(330,205,'PORTO DIGITAL · 2000',{fs:22,bg:'#f3d9ff'})+sign(330,260,'PETROLINA: FRUTAS IRRIGADAS',{fs:22,bg:GR})+sign(330,315,'AGRESTE: POLO DE CONFECÇÕES',{fs:22,bg:'#ffe0a8'}),{o:0,h:0}),
  beats:[
    {t:'Em 1982, os pernambucanos voltaram a eleger o governador pelo voto direto: venceu Roberto Magalhães. Em 1986, Arraes voltou ao governo.',do(){show('ga');walk('el',{x:330},2)}},
    {t:'A Constituição de 1988 devolveu Fernando de Noronha a Pernambuco, como distrito estadual.',do(){show('fn')}},
    {t:'Vieram os governos de Joaquim Francisco, de novo Arraes, Jarbas Vasconcelos e Eduardo Campos, neto de Arraes, que morreu em 2014 num acidente aéreo, em plena campanha para presidente.',do(){hide('fn');show('gb')}},
    {t:'Depois de Paulo Câmara, Raquel Lyra, eleita em 2022, tornou-se a primeira mulher eleita governadora de Pernambuco.',do(){show('gc');show('raq')},say:['raq','A primeira mulher eleita governadora.']},
    {t:'A economia se diversificou: o porto de Suape; o Porto Digital, criado em 2000 no Bairro do Recife; as frutas irrigadas do vale do São Francisco, em Petrolina; e o polo de confecções do Agreste.',do(){hide('raq');show('eco')}}
  ],
  facts:['Governadores eleitos desde 1982: Roberto Magalhães, Arraes, Joaquim Francisco, Arraes, Jarbas, Eduardo Campos, Paulo Câmara e Raquel Lyra.','Fernando de Noronha foi reincorporado a Pernambuco em 1988.','Nova economia: Suape, Porto Digital, fruticultura em Petrolina e confecções no Agreste.'],
  trap:'Raquel Lyra foi a primeira mulher eleita governadora. Na colônia, Dona Brites governou a capitania, mas não foi eleita.'});
