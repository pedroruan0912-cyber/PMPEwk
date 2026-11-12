/* ===== Episódios: itens 7 e 8 do edital (cultura popular e aspectos afro-brasileiros) e revisão final ===== */
function vg(id,inner){return act(id,0,0,inner,{o:id==='v1'?1:0,h:0})}
function dn(inner){return `<g class="dance">${inner}</g>`}
function seq(ids){let last=null;return ids.map(id=>function(){if(last)hide(last);show(id);last=id})}
function casinha(x,y,c){return `<g transform="translate(${x},${y})"><rect x="-70" y="-84" width="140" height="84" fill="${c||'#fdf8ea'}" ${ST}/><path d="M-84,-84 L0,-130 L84,-84Z" fill="#b5532f" ${ST}/><rect x="-14" y="-52" width="28" height="52" fill="#7a4a24" ${ST3}/><rect x="-56" y="-60" width="26" height="26" fill="#3a6fa5" ${ST3}/><rect x="30" y="-60" width="26" height="26" fill="#3a6fa5" ${ST3}/></g>`}
const PASSO={propR:'sombrinha',up:1};

S({id:'frevo',g:7,item:7,year:'Fim do séc. XIX',title:'Frevo: a rua que ferve',
  art:()=>sky('day')+sun(1150,90)+act('galo',1010,760,galo(),{s:1.6,o:0,h:0})+pave(520,'#d9cba8')+sobrados(-10,520,17,.72)+bunting(0,640,160)+bunting(640,1280,160)
    +act('conf',0,0,confetti(50),{h:0})+notes(250,400)
    +act('b1',170,694,P('soldadoAzul',{hat:'quepe',propR:'trombone',c:'#b3261e'}))+act('b2',310,698,P('soldadoAzul',{hat:'quepe',drum:1,propR:'baquetas',c:'#b3261e',sk:'af',hc:'#1d120b'}))
    +act('cp1',500,694,P('escravo',{c:'#fdf8ea',c2:'#fdf8ea',upL:1}),{o:0})+act('cp2',640,698,P('escravo',{c:'#fdf8ea',c2:'#fdf8ea',sk:'mi',up:1}),{o:0,f:1})
    +act('d1',830,694,P('passista',PASSO))+act('d2',960,698,P('passista',Object.assign({sk:'af',c:'#2a9d8f',c2:'#f6c21c',hc:'#1d120b'},PASSO)))+act('d3',1100,694,P('passista',Object.assign({sk:'eu',c:'#ff66c4',c2:'#3a86ff'},PASSO)))
    +sg('s1',640,80,'FREVO · RECIFE · FIM DO SÉCULO XIX',{bg:Y})+sg('s2',640,80,'MÚSICA: BANDAS MILITARES · MARCHA, DOBRADO E MAXIXE',{fs:22,bg:BL})+sg('s3',640,80,'DANÇA (O PASSO): VEM DA CAPOEIRA',{bg:GR})
    +sk2('s4',640,70,['“FREVO” VEM DE FERVER (“FREVER”)','9 DE FEVEREIRO DE 1907 · DIA DO FREVO'],{fs:25,bg:Y})
    +sk2('s5',640,60,['FREVO DE RUA: SÓ INSTRUMENTAL','FREVO-CANÇÃO: COM LETRA','FREVO DE BLOCO: PAU E CORDA + CORAL FEMININO'],{fs:23,bg:'#f3d9ff'})
    +sk2('s6',640,70,['PATRIMÔNIO IMATERIAL: BRASIL (2007) · UNESCO (2012)','GALO DA MADRUGADA · SÁBADO DE ZÉ PEREIRA'],{fs:22,bg:Y}),
  beats:[
    {t:'O frevo nasceu no Recife, no fim do século dezenove, nas ruas do carnaval. É música e é dança.',do(){show('s1');['d1','d2','d3'].forEach(k=>cls(k,'dance'))}},
    {t:'A música veio das bandas militares, que misturavam marcha, dobrado, polca e maxixe e disputavam quem tocava mais forte e mais rápido.',do(){hide('s1');show('s2')},say:['b1','Mais forte! Mais rápido!']},
    {t:'A dança, o passo, veio da capoeira. Os capoeiristas abriam caminho à frente das bandas, e seus golpes viraram passos. A sombrinha é herança dos guarda-chuvas que eles usavam para se defender e se equilibrar.',do(){hide('s2');show('s3');show('cp1');show('cp2');cls('cp1','dance');cls('cp2','dance')}},
    {t:'A palavra vem de ferver, que o povo pronunciava “frever”. Apareceu impressa pela primeira vez em 9 de fevereiro de 1907. Por isso, essa data é o Dia do Frevo.',do(){hide('s3');show('s4')}},
    {t:'São três tipos. O frevo de rua é só instrumental. O frevo-canção tem letra. E o frevo de bloco tem orquestra de pau e corda e coral feminino.',do(){hide('s4');show('s5')}},
    {t:'O frevo é Patrimônio Cultural Imaterial do Brasil desde 2007 e da Humanidade, pela Unesco, desde 2012. E, no sábado de Zé Pereira, o Galo da Madrugada arrasta uma multidão pelo centro do Recife.',do(){hide('s5');show('s6');go('galo',{y:522,o:1},3)}}
  ],
  facts:['Origem: Recife, fim do século XIX. Música das bandas militares, dança vinda da capoeira.','“Frevo” vem de ferver. Dia do Frevo: 9 de fevereiro, por causa de 1907.','Três tipos: frevo de rua, frevo-canção e frevo de bloco.','Patrimônio Imaterial da Humanidade, pela Unesco, desde 2012.'],
  trap:'Frevo de rua não tem letra: é só instrumental. Quem tem letra é o frevo-canção e o frevo de bloco.'});

S({id:'maracatu',g:7,item:7,year:'Origem colonial',title:'Maracatu: nação e rural',
  art:()=>sky('sunset')+pave(520,'#cdbf9f')+sobrados(30,520,6,.66)+church(1070,520,.95)+bunting(180,900,170)
    +act('palio',450,694,ln('M0,0 V-300','#c9a227',5)+`<path d="M-110,-296 A110,70 0 0 1 110,-296Z" fill="#e63946" ${ST}/><path d="M-110,-296 q18,22 37,0 q18,22 37,0 q18,22 36,0 q18,22 37,0 q18,22 37,0 q18,22 36,0" fill="none" stroke="#f6c21c" stroke-width="7"/>`,{h:0})
    +act('bt1',110,694,P('batuqueiro'))+act('bt2',225,698,P('batuqueiro',{sk:'mi'}))
    +act('rei',370,694,P('nobre',{sk:'af',c:'#b3261e',hat:'coroa',hc:'#1d120b',beard:null,propR:'espada'}))+act('rai',530,694,P('dama',{sk:'af',c:'#f6c21c',c2:'#b3261e',hat:'coroa',hair:'bald'}))
    +act('dam',700,698,P('escrava',{c:'#fdf8ea',c2:'#3a86ff',propR:'calunga',hatc:'#fdf8ea'}))
    +act('b3',1500,698,P('batuqueiro',{drum:0,propR:'trombone'}),{f:1})+act('cab',1500,694,P('campones',{fit:'gola',c:'#e63946',c2:'#1f6b3a',hat:'tinsel',propR:'lancaFita'}),{f:1,h:260})
    +dark('noite')
    +sg('s1',640,80,'DOIS MARACATUS: NAÇÃO E RURAL',{bg:Y})+sk2('s2',640,70,['MARACATU NAÇÃO = BAQUE VIRADO · RECIFE','ORIGEM: A COROAÇÃO DOS REIS DO CONGO'],{fs:24,bg:BL})
    +sg('s3',640,80,'REI · RAINHA · DAMA DO PAÇO COM A CALUNGA · ALFAIAS',{fs:22,bg:BL})+sk2('s4',640,70,['MARACATU RURAL = BAQUE SOLTO','ZONA DA MATA NORTE · CABOCLO DE LANÇA'],{fs:24,bg:GR})
    +sg('s5',640,80,'BAQUE SOLTO: SOPROS + MESTRE QUE IMPROVISA VERSOS',{fs:22,bg:GR})+sk2('s6',640,70,['NOITE DOS TAMBORES SILENCIOSOS','PÁTIO DO TERÇO · SEGUNDA-FEIRA DE CARNAVAL'],{fs:24,bg:Y}),
  beats:[
    {t:'O maracatu é uma das manifestações afro-brasileiras mais antigas de Pernambuco. Existem dois tipos, e a banca adora confundi-los.',do(){show('s1')}},
    {t:'O maracatu nação, ou de baque virado, nasceu no Recife, das festas de coroação dos Reis do Congo, feitas por africanos escravizados nas irmandades de Nossa Senhora do Rosário dos Homens Pretos.',do(){hide('s1');show('s2')}},
    {t:'É um cortejo real: rei, rainha, a dama do paço, que carrega a calunga, uma boneca sagrada, e a batida forte das alfaias, os grandes tambores. As nações são ligadas aos terreiros de xangô.',do(){hide('s2');show('s3')},say:['dam','Esta é a calunga.']},
    {t:'O maracatu rural, ou de baque solto, é da Zona da Mata Norte, terra da cana, em cidades como Nazaré da Mata. Sua figura principal é o caboclo de lança, com a gola bordada de lantejoulas, os chocalhos nas costas e um cravo na boca.',do(){hide('s3');show('s4');go('cab',{x:930},2.6);later(2700,()=>cls('cab','dance'))}},
    {t:'No baque solto, a orquestra tem instrumentos de sopro, e um mestre improvisa versos. Ele mistura heranças africanas e indígenas.',do(){hide('s4');show('s5');walk('b3',{x:1110},2)}},
    {t:'Na segunda-feira de carnaval, as nações se reúnem no Pátio do Terço, no Recife, para a Noite dos Tambores Silenciosos, em homenagem aos ancestrais.',do(){hide('s5');hide('cab');hide('b3');go('noite',{o:.5},1.5);show('s6')}}
  ],
  facts:['Maracatu nação é o de baque virado: Recife, coroação dos Reis do Congo, alfaias e calunga.','Maracatu rural é o de baque solto: Zona da Mata Norte, caboclo de lança e instrumentos de sopro.','Noite dos Tambores Silenciosos: Pátio do Terço, na segunda-feira de carnaval.'],
  trap:'Caboclo de lança é do maracatu rural, de baque solto. Rei, rainha e calunga são do maracatu nação, de baque virado.'});

S({id:'festas',g:7,item:7,year:'O ano inteiro',title:'Festas populares de Pernambuco',
  art:()=>sky('day')+sun(1160,90)+clouds()+pave(540,'#e2cfa0')
    +vg('v1',sobrados(40,540,5,.6)+confetti(30)+crowd(760,1160,704,6,.62)+at(540,700,P('doutor',{c:'#1f6b3a',c2:'#1f6b3a',hatc:'#1f6b3a',fc:'#f6c21c'}),2)+stack(880,80,['HOMEM DA MEIA-NOITE','OLINDA · DESDE 1932'],{fs:25,bg:Y}))
    +vg('v2',at(400,696,dn(P('povo',{mask:'#e63946',c:'#f6c21c',c2:'#3a86ff',hat:null,hair:'bald',barefoot:0})))+at(540,696,dn(P('povo',{mask:'#2a9d8f',c:'#ff66c4',c2:'#f6c21c',hat:'tinsel',barefoot:0})))+at(830,696,P('cacique',{propR:'arco'}))+at(960,696,P('cacique',{sk:'mi',propR:'arco'}))+sign(470,330,'PAPANGUS DE BEZERROS',{fs:23,bg:RD})+sign(895,330,'CABOCLINHOS',{fs:23,bg:GR}))
    +vg('v3',bunting(80,1200,130)+notes(330,400)+at(640,700,bonfire(),1.2)+at(320,696,P('campones',{c:'#e63946',stripe:'#fdf8ea',sanfona:1,barefoot:0}))+at(460,696,dn(P('escrava',{sk:'mi',c:'#f6c21c',c2:'#e63946',hat:'palha',hatc:null})))+at(830,696,dn(P('campones',{c:'#3a86ff',stripe:'#fdf8ea',barefoot:0})))+at(960,696,dn(P('dama',{sk:'mi',c:'#ff66c4',c2:'#fdf8ea'})))+stack(640,80,['SÃO JOÃO · FOGUEIRA, QUADRILHA E MILHO','CARUARU, A CAPITAL DO FORRÓ'],{fs:25,bg:Y}))
    +vg('v4',fort(640,560,1.7,'#d9cba8')+crowd(120,400,704,4,.62)+crowd(900,1180,704,4,.62)+at(450,696,P('holandes',{c:'#b3261e',hatc:'#c9a227',propR:'lanca',beard:null}))+at(660,696,P('frei',{c:'#fdf8ea',hair:'long',beard:'full',hc:'#5a3a22',cord:0,propR:'cruz'}))+stack(640,80,['PAIXÃO DE CRISTO · NOVA JERUSALÉM','BREJO DA MADRE DE DEUS · MAIOR TEATRO AO AR LIVRE'],{fs:24,bg:BL}))
    +vg('v5',cactus(180,600,1.1)+cactus(1110,620,1.2)+at(420,700,rider({sk:'mi',fit:'gibao',c:'#8a5a2b',c2:'#8a5a2b',hat:'vaqueiro'}))+at(760,696,P('padre',{propR:'cruz'}))+at(900,696,P('campones',{hat:'vaqueiro',c:'#8a5a2b',sanfona:1,barefoot:0}))+stack(640,80,['MISSA DO VAQUEIRO · SERRITA, NO SERTÃO','FESTIVAL DE INVERNO · GARANHUNS'],{fs:25,bg:'#ffe0a8'}))
    +vg('v6',church(640,560,1.15)+crowd(160,500,704,5,.64)+crowd(800,1140,704,5,.64)+at(600,700,P('padre',{propR:'cruz',c:'#fdf8ea'}))+stack(640,60,['N. SRA. DO CARMO, PADROEIRA DO RECIFE · 16 DE JULHO','MORRO DA CONCEIÇÃO · 8 DE DEZEMBRO'],{fs:23,bg:BL})),
  beats:(()=>{const f=seq(['v1','v2','v3','v4','v5','v6']);return [
    {t:'O calendário pernambucano é uma festa só. No carnaval, Olinda sobe e desce ladeiras com os bonecos gigantes, como o Homem da Meia-Noite, que sai desde 1932.',do:f[0]},
    {t:'No interior, o carnaval tem os papangus de Bezerros, sempre mascarados, e os caboclinhos, com arcos e flechas, de herança indígena.',do:f[1]},
    {t:'Em junho, o São João toma conta do Agreste e do Sertão: fogueira, quadrilha, comidas de milho e muito forró. Caruaru se orgulha do título de capital do forró.',do:f[2]},
    {t:'Na Semana Santa, a Paixão de Cristo de Nova Jerusalém, em Brejo da Madre de Deus, é encenada no maior teatro ao ar livre do mundo.',do:f[3]},
    {t:'Em julho, a Missa do Vaqueiro, em Serrita, no Sertão, homenageia o vaqueiro Raimundo Jacó. E, no inverno, Garanhuns recebe o seu festival.',do:f[4]},
    {t:'Há ainda as festas religiosas: a de Nossa Senhora do Carmo, padroeira do Recife, em julho, e a do Morro da Conceição, em 8 de dezembro.',do:f[5]}
  ]})(),
  facts:['Carnaval: frevo, maracatu, caboclinhos, bonecos gigantes de Olinda e papangus de Bezerros.','São João: Caruaru, a capital do forró.','Paixão de Cristo: Nova Jerusalém, em Brejo da Madre de Deus.','Missa do Vaqueiro: Serrita, no Sertão.'],
  trap:'Nova Jerusalém fica em Brejo da Madre de Deus, no Agreste. Não fica em Caruaru nem no Recife.'});

S({id:'culinaria',g:7,item:7,year:'Três heranças',title:'A cozinha pernambucana',
  art:()=>{const row=(id,list)=>vg(id,list.map((d,i)=>at(640+(i-(list.length-1)/2)*236,584,dish(d[0],d[1]),1.12)).join(''));
    return sky('room')+`<rect x="-10" y="600" width="1300" height="130" fill="#b9853f"/><path d="M-10,600 H1290" stroke="#8a5a2b" stroke-width="5"/><rect x="80" y="130" width="200" height="150" fill="#8ecae6" ${ST}/><path d="M180,130 V280 M80,205 H280" stroke="${OL}" stroke-width="4"/>`
    +act('in',250,640,P('india'))+act('af',640,640,P('escrava',{c:'#fdf8ea',c2:'#f6c21c'}))+act('pt',1030,640,P('dama'))
    +at(640,700,table(1000))
    +row('g1',[['tapioca','TAPIOCA'],['mandioca','MANDIOCA'],['milho','MILHO']])+row('g2',[['inhame','INHAME'],['quiabo','QUIABO'],['dende','DENDÊ'],['panela','MUNGUZÁ']])
    +row('g3',[['doce','DOCES DE OVOS'],['panela','SARAPATEL'],['panela','BUCHADA']])+row('g4',[['rolo','BOLO DE ROLO'],['souza','BOLO SOUZA LEÃO']])
    +row('g5',[['cartola','CARTOLA'],['carne','CARNE DE SOL'],['coalho','QUEIJO DE COALHO'],['peixe','PEIXADA']])
    +act('gf',1180,700,P('politico',{glasses:1,c:'#6b4a2b',c2:'#6b4a2b',propR:'livro',book:'#b3261e'}),{o:0,f:1})
    +sg('s1',640,80,'HERANÇA INDÍGENA',{bg:GR})+sg('s2',640,80,'HERANÇA AFRICANA',{bg:Y})+sg('s3',640,80,'HERANÇA PORTUGUESA',{bg:BL})
    +sk2('s4',640,70,['BOLO DE ROLO E BOLO SOUZA LEÃO','PATRIMÔNIOS IMATERIAIS DE PERNAMBUCO'],{fs:25,bg:Y})+sg('s5',640,80,'DO SERTÃO AO LITORAL',{bg:'#ffe0a8'})+sg('s6',640,80,'GILBERTO FREYRE · “AÇÚCAR” · 1939',{bg:RD})},
  beats:[
    {t:'A cozinha pernambucana mistura três heranças. Dos povos indígenas vieram a mandioca, a farinha, a tapioca, o beiju e o milho.',do(){show('s1');show('g1')},say:['in','Da mandioca se faz quase tudo!']},
    {t:'Dos africanos vieram o inhame, o quiabo, o azeite de dendê, o munguzá e o jeito de temperar, que as cozinheiras escravizadas levaram para a casa-grande.',do(){hide('s1');hide('g1');show('s2');show('g2')},say:['af','O tempero é nosso.']},
    {t:'Dos portugueses vieram os doces de ovos e a tradição dos bolos, que encontraram aqui o açúcar dos engenhos. Pratos como o sarapatel, a buchada e a galinha à cabidela ganharam o tempero da terra.',do(){hide('s2');hide('g2');show('s3');show('g3')},say:['pt','E açúcar não falta!']},
    {t:'Do encontro nasceram joias: o bolo de rolo, de massa bem fina enrolada com goiabada, e o bolo Souza Leão, de massa de mandioca. Os dois são patrimônios imateriais de Pernambuco.',do(){hide('s3');hide('g3');show('s4');show('g4')}},
    {t:'E a cartola: banana frita, queijo manteiga, açúcar e canela. No Sertão reinam a carne de sol, o bode e o queijo de coalho. No litoral, os peixes e os caldinhos.',do(){hide('s4');hide('g4');show('s5');show('g5')}},
    {t:'Foi o pernambucano Gilberto Freyre quem mostrou, no livro Açúcar, que uma receita também é um documento histórico.',do(){hide('s5');show('s6');show('gf')},say:['gf','Receita também é história.']}
  ],
  facts:['Três matrizes: indígena, com a mandioca e a tapioca; africana, com o inhame, o quiabo e o dendê; e portuguesa, com os doces e os bolos.','Bolo de rolo e bolo Souza Leão são patrimônios imateriais de Pernambuco.','Cartola: banana, queijo manteiga, açúcar e canela.','O açúcar dos engenhos explica a força da doçaria pernambucana.'],
  trap:'Bolo de rolo não é rocambole: a massa é bem fininha, em muitas voltas, e o recheio tradicional é a goiabada.'});

S({id:'artes',g:7,item:7,year:'Século XX',title:'Do barro ao mangue: artes e movimentos',
  art:()=>{const clay={sk:'#b9733f',c:'#a0622f',c2:'#a0622f',hc:'#8a5a2b',barefoot:1};const book=(x,c,k)=>`<g transform="translate(${x},276)"><rect x="-42" y="0" width="84" height="116" fill="${c}" ${ST3}/>${k===0?`<circle cx="0" cy="40" r="18" fill="${OL}"/><path d="M-26,90 h52" stroke="${OL}" stroke-width="7"/>`:k===1?`<path d="M0,96 V34 M0,60 h-20 v-22 M0,50 h20 v-26" stroke="${OL}" stroke-width="8" fill="none"/>`:`<path d="M-26,84 Q0,20 26,84Z" fill="${OL}"/><circle cx="16" cy="30" r="9" fill="${OL}"/>`}</g>`;
    return sky('day')+sun(1160,90)+clouds()+pave(540,'#e2cfa0')
    +vg('v1',at(360,700,P('campones',{sk:'mi',barefoot:0}))+at(740,700,table(460))+at(600,610,person(Object.assign({hat:'vaqueiro'},clay)),.42)+at(730,610,quad('boi','#b9733f'),.42)+at(860,610,person(Object.assign({sanfona:1},clay)),.42)+stack(640,80,['MESTRE VITALINO · CARUARU','ALTO DO MOURA · ARTE NO BARRO'],{fs:25,bg:'#ffe0a8'}))
    +vg('v2',`<path d="M200,270 Q640,300 1080,270" fill="none" stroke="${OL}" stroke-width="4"/>`+[300,440,580,720,860,1000].map((x,i)=>book(x,['#f6c21c','#ff9e6b','#8ecae6','#b8e0a8','#f28482','#fdf8ea'][i],i%3)).join('')+at(640,700,P('campones',{propR:'papel',barefoot:0}))+stack(640,80,['LITERATURA DE CORDEL · XILOGRAVURA','J. BORGES, DE BEZERROS'],{fs:25,bg:Y}))
    +vg('v3',cactus(240,700,1.1)+cactus(1060,700,1)+notes(720,380)+at(640,700,P('campones',{sk:'mi',hat:'couro',c:'#8a5a2b',c2:'#5e3b1a',sanfona:1,barefoot:0}))+stack(640,80,['LUIZ GONZAGA, O REI DO BAIÃO','NASCEU EM EXU, NO SERTÃO DO ARARIPE'],{fs:25,bg:GR}))
    +vg('v4',at(520,700,P('politico',{glasses:1,c:'#6b4a2b',c2:'#6b4a2b'}))+`<g transform="translate(800,640)"><rect x="-110" y="-260" width="220" height="260" rx="6" fill="#1f6b3a" ${ST}/><path d="M-90,-260 v260" stroke="${OL}" stroke-width="4"/><text x="10" y="-170" text-anchor="middle" font-size="25" fill="#fdf8ea">CASA-GRANDE</text><text x="10" y="-136" text-anchor="middle" font-size="25" fill="#fdf8ea">&amp; SENZALA</text><text x="10" y="-60" text-anchor="middle" font-size="30" fill="#f6c21c">1933</text></g>`+stack(640,80,['GILBERTO FREYRE','MOVIMENTO REGIONALISTA · 1926'],{fs:25,bg:BL}))
    +vg('v5',at(500,700,P('politico',{c:'#f1ead9',c2:'#f1ead9',hc:'#5a5f66',propR:'rabeca'}))+`<g transform="translate(800,620)"><path d="M-90,-230 H90 V-90 Q90,0 0,36 Q-90,0 -90,-90Z" fill="#b3261e" ${ST}/>${star(0,-110,56,'#f6c21c',8)}<circle cx="0" cy="-110" r="22" fill="#f6c21c" ${ST3}/></g>`+stack(640,80,['MOVIMENTO ARMORIAL · 1970 · ARIANO SUASSUNA','ARTE ERUDITA COM RAIZ POPULAR'],{fs:24,bg:RD}))
    +vg('v6',`<rect x="-10" y="610" width="1300" height="120" fill="#5a4632"/><path d="M-10,610 q40,-14 80,0 t80,0 t80,0 t80,0 t80,0 t80,0 t80,0 t80,0 t80,0 t80,0 t80,0 t80,0 t80,0 t80,0 t80,0 t80,0 t80,0" fill="none" stroke="#3f2f20" stroke-width="6"/>`+at(400,650,antena(),1.2)+at(700,700,P('passista',{hat:'palha',glasses:1,shades:1,propR:'mic',c:'#2a9d8f',c2:'#3a3a48',stripe:null}))+at(960,706,crab(),1.5)+at(220,710,crab(),1)+stack(640,70,['MANGUEBEAT · ANOS 1990 · CHICO SCIENCE E NAÇÃO ZUMBI','“CARANGUEJOS COM CÉREBRO” (1992) · MARACATU + ROCK'],{fs:23,bg:GR}))
    +vg('v7',[340,490,640,790,940].map((x,i)=>at(x,700,dn(P(i%2?'dama':'campones',{sk:['mi','af','eu','mi','af'][i],c:['#e63946','#f6c21c','#3a86ff','#2a9d8f','#ff66c4'][i],c2:'#fdf8ea',armL:74,armR:-74,barefoot:0,hat:null,hair:i%2?'long':'short'})))).join('')+stack(640,70,['CIRANDA (LIA DE ITAMARACÁ) · COCO · CAVALO-MARINHO','PASTORIL · MAMULENGO, O TEATRO DE BONECOS'],{fs:23,bg:BL}))},
  beats:(()=>{const f=seq(['v1','v2','v3','v4','v5','v6','v7']);return [
    {t:'Em Caruaru, no Alto do Moura, Mestre Vitalino moldou no barro a vida do povo do Agreste: retirantes, vaqueiros e bandas de pífanos.',do:f[0]},
    {t:'Nas feiras, a literatura de cordel conta histórias em versos, com capas em xilogravura, arte de mestres como J. Borges, de Bezerros.',do:f[1]},
    {t:'De Exu, no Sertão do Araripe, saiu Luiz Gonzaga, o Rei do Baião, que levou a sanfona, o xote e o forró para todo o Brasil.',do:f[2]},
    {t:'Em 1926, Gilberto Freyre liderou o Movimento Regionalista. Em 1933, publicou Casa-Grande e Senzala, sobre a formação da sociedade brasileira nos engenhos.',do:f[3]},
    {t:'Em 1970, Ariano Suassuna criou o Movimento Armorial, para fazer uma arte erudita a partir das raízes populares do Nordeste, como o cordel, a rabeca e o pífano.',do:f[4]},
    {t:'Nos anos 1990, Chico Science e a Nação Zumbi misturaram maracatu com rock e hip-hop. Era o manguebeat, do manifesto Caranguejos com Cérebro, de 1992, com sua antena parabólica fincada na lama.',do:f[5]},
    {t:'E há ainda a ciranda, de Lia de Itamaracá, o coco, o cavalo-marinho, o pastoril e o mamulengo, o teatro de bonecos.',do:f[6]}
  ]})(),
  facts:['Mestre Vitalino: Caruaru, Alto do Moura, arte no barro. Luiz Gonzaga: Exu, Rei do Baião.','Movimento Regionalista: Gilberto Freyre, 1926.','Movimento Armorial: Ariano Suassuna, 1970.','Manguebeat: Chico Science, anos 1990, maracatu com rock.'],
  trap:'Regionalista é de Gilberto Freyre. Armorial é de Ariano Suassuna. Manguebeat é de Chico Science. A banca troca os autores.'});

S({id:'afro',g:8,item:8,year:'Séc. XVI até hoje',title:'A herança afro-brasileira em Pernambuco',
  art:()=>sky('day')+sun(120,100)+clouds()+pave(540,'#e2cfa0')
    +vg('v1',at(640,330,inset(760,340,`<rect width="760" height="340" fill="#2f93da"/><path d="M0,20 Q220,10 250,120 Q240,280 90,340 H0Z" fill="#63b04d" stroke="${OL}" stroke-width="4"/><path d="M760,0 H520 Q450,90 500,180 Q540,280 600,340 H760Z" fill="#e2b96a" stroke="${OL}" stroke-width="4"/><circle cx="238" cy="150" r="10" fill="#d42a2a" stroke="${OL}" stroke-width="3"/><text x="20" y="140" font-size="24" fill="${OL}">PERNAMBUCO</text><text x="20" y="172" font-size="20" fill="${OL}">PORTO DO RECIFE</text><text x="744" y="96" font-size="21" fill="${OL}" text-anchor="end">COSTA DA MINA</text><text x="744" y="124" font-size="18" fill="${OL}" text-anchor="end">nagôs e jejes</text><text x="744" y="250" font-size="21" fill="${OL}" text-anchor="end">ANGOLA E CONGO</text><text x="744" y="278" font-size="18" fill="${OL}" text-anchor="end">povos bantos</text><path d="M506,110 Q380,80 262,140 M540,256 Q390,250 262,164" fill="none" stroke="#fff" stroke-width="6" stroke-dasharray="14 10"/>`,'UM DOS PRINCIPAIS PORTOS DO TRÁFICO NO BRASIL'))+at(520,700,P('escravo'))+at(660,700,P('escrava'))+at(800,700,P('escravo',{sk:'#5e3a22',propR:'enxada'})))
    +vg('v2',church(300,560,1)+palm(900,560,.9)+at(1000,560,oca(0,0,.8))+palisade(880,570,300,60)+at(560,700,P('escravo',{propR:'lanca'}))+at(700,700,P('escrava'))+sign(310,250,'ROSÁRIO DOS HOMENS PRETOS',{fs:21,bg:BL})+sign(1020,400,'QUILOMBOS',{fs:23,bg:GR})+sign(640,80,'RESISTÊNCIA: QUILOMBOS E IRMANDADES',{bg:Y}))
    +vg('v3',casarao(190,560,'SÍTIO DE PAI ADÃO','RECIFE','#fdf8ea')+tree(820,570,1.3)+at(620,700,P('frei',{sk:'af',c:'#fdf8ea',hair:'short',hc:'#1d120b',cord:0,hat:'solideo',hatc:'#fdf8ea'}))+at(900,700,drum())+at(970,700,drum())+at(1040,700,drum())+at(1150,700,P('escrava',{c:'#fdf8ea',c2:'#3a86ff',hatc:'#fdf8ea'}))+stack(700,70,['XANGÔ: A RELIGIÃO DOS ORIXÁS EM PERNAMBUCO','JUREMA SAGRADA: TRADIÇÃO AFRO-INDÍGENA'],{fs:23,bg:Y}))
    +vg('v4',notes(760,400)+at(330,700,dn(P('escravo',{c:'#fdf8ea',c2:'#fdf8ea',upL:1})))+at(480,700,dn(P('escravo',{c:'#fdf8ea',c2:'#fdf8ea',sk:'mi',up:1})))+at(690,700,P('batuqueiro'))+at(850,700,dn(P('escrava',{c:'#f6c21c',c2:'#fdf8ea',hatc:'#f6c21c'})))+at(1010,700,dn(P('passista',PASSO)))+stack(640,70,['MARACATU · AFOXÉ · COCO · CAPOEIRA','A CAPOEIRA DEU ORIGEM AO PASSO DO FREVO'],{fs:24,bg:GR}))
    +vg('v5',at(440,700,P('nobre',{sk:'af',c:'#b3261e',fc:'#f6c21c',hc:'#1d120b',beard:null,propR:'espada'}))+sign(440,400,'HENRIQUE DIAS',{fs:22})+at(840,700,P('politico',{sk:'af',hc:'#1d120b',propR:'livro',c:'#6b4a2b',c2:'#6b4a2b'}))+sign(840,400,'SOLANO TRINDADE',{fs:22})+stack(640,70,['HERÓIS NEGROS DE PERNAMBUCO','FRENTE NEGRA PERNAMBUCANA · ANOS 1930'],{fs:25,bg:Y}))
    +vg('v6',hill(640,620,700,200,'#63b04d')+casinha(330,560,'#f7d06a')+casinha(560,540,'#fdf8ea')+casinha(830,560,'#8ecae6')+palm(1040,580,.9)+at(440,700,P('escrava',{c:'#ff66c4',c2:'#fdf8ea',hatc:'#f6c21c'}))+at(600,700,P('escravo',{propR:'enxada'}))+at(760,700,P('escrava',{sk:'#5e3a22',c:'#f6c21c',c2:'#e63946',hatc:'#2a9d8f'}))+stack(640,60,['COMUNIDADES QUILOMBOLAS HOJE','CONCEIÇÃO DAS CRIOULAS (SALGUEIRO) · CASTAINHO (GARANHUNS)','20 DE NOVEMBRO · DIA DA CONSCIÊNCIA NEGRA'],{fs:22,bg:Y})),
  beats:(()=>{const f=seq(['v1','v2','v3','v4','v5','v6']);return [
    {t:'O Recife foi um dos principais portos de desembarque de africanos escravizados do Brasil. Eles vieram principalmente de Angola e do Congo, povos bantos, e da Costa da Mina, povos nagôs e jejes.',do:f[0]},
    {t:'Resistiram de muitas formas: nos quilombos, como Palmares e Catucá; nas irmandades religiosas, como a de Nossa Senhora do Rosário dos Homens Pretos; e guardando a sua fé e a sua cultura.',do:f[1]},
    {t:'A religião dos orixás ganhou em Pernambuco o nome de xangô. O terreiro mais antigo do estado é o Sítio de Pai Adão, no Recife, fundado no século dezenove. Há também a Jurema Sagrada, que une tradições indígenas e africanas.',do:f[2]},
    {t:'Da herança africana vêm o maracatu, o afoxé, o coco e a capoeira, que deu origem ao passo do frevo, além de muito da nossa culinária e do nosso vocabulário.',do:f[3]},
    {t:'Pernambuco teve heróis negros, como Henrique Dias, na guerra contra os holandeses, e o poeta Solano Trindade, que fundou no Recife a Frente Negra Pernambucana, nos anos 1930.',do:f[4]},
    {t:'Hoje, comunidades quilombolas como Conceição das Crioulas, em Salgueiro, e Castainho, em Garanhuns, mantêm viva essa história. E o 20 de novembro, dia da morte de Zumbi, é o Dia da Consciência Negra.',do:f[5]}
  ]})(),
  facts:['Origens: povos bantos, de Angola e do Congo, e sudaneses, como nagôs e jejes, da Costa da Mina.','Xangô é o nome da religião dos orixás em Pernambuco. Sítio de Pai Adão: o terreiro mais antigo do estado.','Irmandade do Rosário dos Homens Pretos e coroação dos Reis do Congo: origem do maracatu nação.','Quilombolas hoje: Conceição das Crioulas, em Salgueiro, e Castainho, em Garanhuns.'],
  trap:'Em Pernambuco, xangô é o nome da religião, além de ser um orixá. Os terreiros foram perseguidos no Estado Novo.'});

S({id:'revisao',g:9,tag:'Revisão',year:'1535–1988',title:'A linha do tempo do Leão do Norte',
  art:()=>sky('day')+sun(1180,90)+clouds()+sea(430)+beach(590)+palm(60,640,1)
    +act('flag',850,694,pole('pe',440,366,244),{h:0})+act('leao',720,694,lion(),{s:1.1,h:190})
    +act('d1',1010,700,P('passista',PASSO),{o:0})+act('d2',1140,700,P('passista',Object.assign({sk:'af',c:'#2a9d8f',c2:'#f6c21c',hc:'#1d120b'},PASSO)),{o:0})
    +act('conf',0,0,confetti(50),{o:0,h:0})
    +sk2('t1',340,70,['1535 · DUARTE COELHO E A NOVA LUSITÂNIA','1630 · INVASÃO HOLANDESA','1637–1644 · GOVERNO DE NASSAU'],{fs:22,bg:Y})
    +sk2('t2',340,70,['1654 · EXPULSÃO DOS HOLANDESES','1695 · MORTE DE ZUMBI','1710 · GUERRA DOS MASCATES'],{fs:22,bg:Y})
    +sk2('t3',340,70,['1817 · REVOLUÇÃO PERNAMBUCANA','1824 · CONFEDERAÇÃO DO EQUADOR','1832–1835 · GUERRA DOS CABANOS','1848 · REVOLUÇÃO PRAIEIRA'],{fs:22,bg:Y})
    +sk2('t4',340,70,['AZUL: O CÉU','BRANCO: A PAZ','ARCO-ÍRIS: A UNIÃO','ESTRELA: O ESTADO','SOL: FORÇA E ENERGIA','CRUZ: FÉ NA JUSTIÇA'],{fs:22,bg:BL})
    +sk2('t5',340,70,['1930 · MORTE DE JOÃO PESSOA','1955 · LIGAS CAMPONESAS','1964 · GOLPE E PRISÃO DE ARRAES','1988 · NORONHA VOLTA A PERNAMBUCO'],{fs:22,bg:Y}),
  beats:(()=>{const f=seq(['t1','t2','t3','t4','t5']);return [
    {t:'Hora da revisão relâmpago! 1535: Duarte Coelho e a Nova Lusitânia. 1630: chegam os holandeses. De 1637 a 1644: o governo de Nassau.',do:f[0],say:['leao','Repita comigo!']},
    {t:'1654: expulsão dos holandeses. 1695: morte de Zumbi. 1710: Guerra dos Mascates.',do:f[1]},
    {t:'1817: Revolução Pernambucana. 1824: Confederação do Equador. De 1832 a 1835: Guerra dos Cabanos. 1848: Revolução Praieira.',do:f[2]},
    {t:'Na bandeira, criada em 1817, o azul é o céu; o branco, a paz; o arco-íris, a união de todos os pernambucanos; a estrela, o estado; o sol, a força e a energia; e a cruz, a fé na justiça.',do:f[3]},
    {t:'Na República: 1930, a morte de João Pessoa. 1955, as Ligas Camponesas. 1964, o golpe e a prisão de Arraes. 1988, a volta de Fernando de Noronha.',do:f[4]},
    {t:'Agora é com você, futuro soldado. Reveja os episódios em que ficou em dúvida. Boa prova!',do(){show('conf');show('d1');show('d2');cls('d1','dance');cls('d2','dance')},say:['leao','Boa prova, futuro soldado!']}
  ]})(),
  facts:['1535, Duarte Coelho. 1630, invasão holandesa. 1637 a 1644, Nassau. 1654, expulsão dos holandeses.','1695, morte de Zumbi. 1710, Mascates. 1817, Revolução Pernambucana. 1824, Confederação do Equador.','1832 a 1835, Cabanos. 1848, Praieira. 1930, João Pessoa. 1964, golpe militar. 1988, volta de Noronha.','Perdas de território: Alagoas, em 1817, e a Comarca do São Francisco, em 1824.'],
  trap:'A bandeira de Pernambuco nasceu na Revolução de 1817, mas só foi oficializada em 1917, no centenário.'});
