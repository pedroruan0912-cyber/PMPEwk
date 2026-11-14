/* ===== Episódios: item 4 do edital (presença holandesa e Nassau) ===== */
const OR='#ffd9a8';

S({id:'invasao',g:4,item:4,year:'1630',title:'Os holandeses desembarcam',
  art:()=>sky('dawn')+sun(200,150,50,'#ffe08a')+clouds()+sea(330)
    +act('h3',1800,392,ship({flag:'nl'}),{s:.45,f:1,h:0})+act('h1',1500,402,ship({flag:'nl'}),{s:.52,f:1,h:0})+act('h2',1650,452,ship({flag:'nl'}),{s:.66,f:1,h:0})+act('h4',1950,474,ship({flag:'nl'}),{s:.74,f:1,h:0})
    +beach(570)+palm(1200,640,1)+palm(70,640,1.1)
    +act('nlp',560,668,pole('nl',260,110,74),{o:0,h:0})
    +act('cmd',1400,672,P('holandes',{hat:'plume',fc:'#f28c28',propR:'espada'}),{f:1})+act('hs1',1500,668,P('holandes',{propR:'mosquete'}),{f:1})+act('hs2',1600,674,P('holandes',{propR:'mosquete',hc:'#5a3a22'}),{f:1})+act('hs3',1700,670,P('holandes',{propR:'lanca'}),{f:1})
    +ins('uni',640,300,520,280,`<rect width="520" height="280" fill="#f6ead0"/>`+at(70,40,flag('es',120,80))+at(330,40,flag('pt',120,80))+`<text x="260" y="96" text-anchor="middle" font-size="44" fill="${OL}">+</text>`+at(260,262,P('nobre',{hat:'coroa',beard:'full',c:'#5e3a87'}),.75)+`<text x="100" y="230" text-anchor="middle" font-size="19" fill="${OL}">ESPANHA</text><text x="420" y="230" text-anchor="middle" font-size="19" fill="${OL}">PORTUGAL</text>`,'UNIÃO IBÉRICA · 1580–1640')
    +act('wic',0,0,sign(640,220,'WIC · COMPANHIA DAS ÍNDIAS OCIDENTAIS · 1621',{fs:26,bg:OR})+sign(640,290,'BAHIA, 1624–1625: EXPULSOS',{fs:25,bg:RD}),{o:0,h:0})
    +sg('s3',640,80,'PAU AMARELO · FEVEREIRO DE 1630',{bg:Y})+sg('s4',640,80,'DOMÍNIO HOLANDÊS: 1630–1654 · 24 ANOS',{bg:OR}),
  beats:[
    {t:'Em 1580, o rei da Espanha assumiu também a coroa de Portugal. Era a União Ibérica. Os inimigos da Espanha viraram inimigos de Portugal, e a Holanda, em guerra com os espanhóis, perdeu o negócio do açúcar.',do(){show('uni')}},
    {t:'A resposta foi a Companhia das Índias Ocidentais, a WIC, uma empresa criada em 1621 para atacar e lucrar nas Américas. Em 1624 ela tomou Salvador, mas foi expulsa no ano seguinte.',do(){hide('uni');show('wic')}},
    {t:'Em fevereiro de 1630 veio o alvo certo: Pernambuco, a terra do açúcar. Uma esquadra de 67 navios e cerca de 7 mil homens, comandada por Hendrick Lonck, desembarcou na praia de Pau Amarelo.',do(){hide('wic');show('s3');go('h1',{x:960},5);go('h2',{x:1090},5.5);go('h3',{x:720},6);go('h4',{x:840},6);later(2400,()=>{walk('cmd',{x:760},2.6);walk('hs1',{x:900},2.8);walk('hs2',{x:1020},3);walk('hs3',{x:1140},3.2)})}},
    {t:'Olinda e o Recife caíram em poucos dias. Começavam 24 anos de domínio holandês no Nordeste, de 1630 a 1654.',do(){hide('s3');show('s4');show('nlp')},say:['cmd','Pela Companhia! O açúcar é nosso!']}
  ],
  facts:['Causa: União Ibérica, de 1580 a 1640, somada ao interesse holandês no açúcar.','WIC, criada em 1621: fracassou na Bahia em 1624 e 1625 e invadiu Pernambuco em 1630.','Desembarque em Pau Amarelo. Domínio holandês de 1630 a 1654: 24 anos.'],
  trap:'A invasão foi obra de uma empresa, a Companhia das Índias Ocidentais (WIC), e não diretamente do governo da Holanda.'});

S({id:'resistencia',g:4,item:4,year:'1630–1635',title:'Arraial do Bom Jesus e Calabar',
  art:()=>sky('day')+clouds()+hill(250,540,500,230,'#3f8f3a','#2f7a30')+hill(1000,560,560,220,'#4a9a40','#2f7a30')+field(510,'#5aa84a','#3f8f3a')
    +trees([[80,540,.9],[220,520,.8],[1040,530,.9],[1210,540,1],[930,520,.7]])
    +act('ptf',570,612,pole('pt',200,84,56),{h:0})+act('nlf',570,612,pole('nl',200,84,56),{o:0,h:0})
    +at(340,604,oca(0,0,.62))+at(460,604,oca(0,0,.56))+palisade(230,614,340,78)
    +act('fogo',400,612,smoke(0,-130,1.6,'#666')+fire(-90,-30,1)+fire(60,-40,1.1),{o:0,h:0})
    +act('mat',170,676,P('nobre',{c:'#3d5a80',propR:'espada',fc:'#f6c21c'}))+act('cal',660,676,P('povo',{c:'#d98b2b',c2:'#6b4a2b',sk:'mi'}))
    +act('g1',800,668,P('indio',{propR:'arco'}))+act('g2',910,672,P('escravo',{propR:'lanca'}))
    +tree(860,712,1.15)+tree(1240,716,1.1)
    +act('h1',1420,676,P('holandes',{propR:'mosquete'}),{f:1})+act('h2',1520,680,P('holandes',{propR:'mosquete',hc:'#5a3a22'}),{f:1})
    +sg('s1',400,330,'ARRAIAL DO BOM JESUS',{bg:GR})+sg('s2',900,330,'COMPANHIAS DE EMBOSCADA',{bg:Y})
    +sg('s3',640,80,'1632: CALABAR PASSA PARA O LADO HOLANDÊS',{fs:26,bg:RD})+sg('s4',640,80,'1635: O ARRAIAL CAI',{bg:RD})+sg('s5',640,80,'CALABAR: EXECUTADO EM PORTO CALVO · 1635',{fs:26,bg:'#e9e9e9'}),
  beats:[
    {t:'O governador Matias de Albuquerque recuou para o interior e montou a resistência no Arraial do Bom Jesus, entre Olinda e o Recife.',do(){show('s1')},say:['mat','Daqui eles não passam!']},
    {t:'Sem tropas suficientes, a tática foi a guerrilha: as companhias de emboscada, pequenos grupos de colonos, indígenas e negros que atacavam de surpresa e sumiam na mata.',do(){show('s2');walk('h1',{x:1090},2);walk('h2',{x:1190},2.2);later(2300,()=>booms([[1090,560,1,'ZÁS'],[1180,540,.8]]));later(3200,()=>{go('h1',{f:1},.1);go('h2',{f:1},.1);walk('h1',{x:1420},1.6);walk('h2',{x:1520},1.6)})}},
    {t:'Por dois anos, os holandeses ficaram presos ao litoral. Até que, em 1632, Domingos Fernandes Calabar, que conhecia cada caminho da região, passou para o lado deles.',do(){hide('s1');hide('s2');show('s3');go('h1',{f:-1},.1);go('h2',{f:-1},.1);walk('h1',{x:1180},2);walk('h2',{x:1280},2);walk('cal',{x:1060},2.6)},say:['cal','Eu conheço os caminhos.']},
    {t:'Com Calabar como guia, os invasores avançaram. O Arraial do Bom Jesus caiu em 1635. No mesmo ano, Calabar foi capturado em Porto Calvo e executado como traidor.',do(){hide('s3');show('s4');walk('h1',{x:560},3);walk('h2',{x:680},3);walk('cal',{x:800},3);go('g1',{o:0});go('g2',{o:0});later(2000,()=>{show('fogo');hide('ptf');show('nlf');walk('mat',{x:-140},2)})}},
    {t:'Traidor, ou alguém que escolheu o lado que achava melhor? Os historiadores discutem até hoje. Para a prova, guarde: Calabar ajudou os holandeses e morreu em 1635.',do(){hide('s4');show('s5');go('cal',{o:.35})}}
  ],
  facts:['Matias de Albuquerque organizou a resistência no Arraial do Bom Jesus, de 1630 a 1635.','Tática: guerrilha, com as companhias de emboscada.','Calabar passou para os holandeses em 1632 e foi executado em Porto Calvo, em 1635.'],
  trap:'Calabar morreu em 1635, antes da chegada de Nassau, que foi em 1637. Os dois nunca atuaram juntos.'});

S({id:'nassau',g:4,item:4,year:'1637–1644',title:'O governo de Maurício de Nassau',
  art:()=>sky('day')+sun(1150,96)+clouds()+pave(470,'#d9cba8')+palace(240,470,.9)+sobrados(480,470,6,.62)+sobrados(760,470,7,.62)
    +`<rect x="-10" y="500" width="1300" height="96" fill="#2f93da"/><path d="M-10,500 H1290 M-10,596 H1290" stroke="#1f6fb0" stroke-width="5"/>`+bridge(720,540,540)
    +`<rect x="-10" y="598" width="1300" height="130" fill="#cdbf9f"/>`
    +act('boi',860,470,quad('boi','#e2c36b'),{o:0,s:.7,h:0})
    +act('ast',130,676,P('nobre',{c:'#3d5a80',hat:null,hair:'short',propR:'luneta',armR:-75}),{o:0})
    +act('nas',300,676,P('nobre',{c:'#1f2a44',c2:'#1f2a44',hair:'wig',hc:'#6b4a2b',beard:'mustache',fc:'#f28c28',propR:'cajado'}))
    +act('sen',520,676,P('senhor'),{f:1})+act('sac',360,640,at(0,0,PROP.saco(),1.3),{o:0,h:0})
    +act('jud',740,676,P('doutor',{hat:'kipa',beard:'full',propR:'livro',book:'#1f3a6b',c:'#2a2333'}),{o:0})+act('pad',860,676,P('padre',{propR:'cruz'}),{o:0})+act('calv',980,676,P('nobre',{c:'#2c3e50',fc:'#fdf8ea',propR:'livro',hc:'#c98a2b'}),{o:0})
    +act('eas',1190,680,easel(),{o:0,h:0})+act('post',1090,676,P('nobre',{c:'#8a2f6b',fc:'#3a86ff',propR:'pincel',hc:'#c98a2b'}),{o:0})
    +act('wicman',1420,676,P('holandes',{propR:'saco',angry:1,hat:'plume',fc:'#1d1d28'}),{f:1})
    +sg('s1',640,80,'1637: CHEGA MAURÍCIO DE NASSAU',{bg:OR})+sg('s2',640,80,'BRASIL HOLANDÊS: DO MARANHÃO A SERGIPE',{fs:26,bg:OR})+sg('s3',640,80,'CRÉDITO AOS SENHORES DE ENGENHO',{bg:Y})
    +sk2('s4',640,70,['TOLERÂNCIA RELIGIOSA','KAHAL ZUR ISRAEL: 1ª SINAGOGA DAS AMÉRICAS'],{fs:24,bg:BL})+sk2('s5',640,70,['CIDADE MAURÍCIA · ILHA DE ANTÔNIO VAZ','PONTES · PALÁCIOS · OBSERVATÓRIO'],{fs:24,bg:GR})
    +sg('s6',640,80,'FRANS POST · ALBERT ECKHOUT · PISO E MARCGRAF',{fs:24,bg:'#f3d9ff'})+sg('s7',640,80,'1644: O BOI VOADOR',{bg:Y})+sg('s8',640,80,'1644: NASSAU VAI EMBORA',{bg:RD}),
  beats:[
    {t:'Em 1637, a WIC mandou um governador: o conde João Maurício de Nassau. Sua missão era pacificar a colônia e fazer o açúcar voltar a dar lucro.',do(){show('s1')},say:['nas','Vim governar em nome da Companhia.']},
    {t:'No auge, o Brasil Holandês ia do Maranhão até Sergipe, com capital no Recife.',do(){hide('s1');show('s2')}},
    {t:'Nassau fez as pazes com os senhores de engenho: emprestou dinheiro, vendeu a crédito os engenhos abandonados e garantiu mão de obra escravizada, tomando na África os portos de São Jorge da Mina e de Luanda.',do(){hide('s2');show('s3');show('sac');go('sac',{x:480},1.8)},say:['sen','Assim eu volto a plantar!']},
    {t:'Decretou tolerância religiosa. Católicos, calvinistas e judeus conviviam no Recife, onde funcionou a Kahal Zur Israel, a primeira sinagoga das Américas.',do(){hide('s3');hide('sac');show('s4');show('jud');show('pad');show('calv')}},
    {t:'Urbanizou o Recife e criou a Cidade Maurícia, na ilha de Antônio Vaz, com palácios, pontes, jardim botânico, zoológico e o primeiro observatório astronômico das Américas.',do(){hide('s4');show('s5');show('ast')}},
    {t:'Trouxe artistas e cientistas. Frans Post pintou as paisagens. Albert Eckhout pintou a gente e os frutos da terra. Piso e Marcgraf estudaram a natureza e as doenças tropicais.',do(){hide('s5');show('s6');show('post');show('eas')}},
    {t:'Para inaugurar a ponte do Recife, em 1644, Nassau prometeu que um boi ia voar. E voou: um couro de boi recheado de palha, puxado por cordas. O pedágio da ponte encheu o caixa.',do(){hide('s6');show('s7');show('boi');go('boi',{x:1090,y:250,r:-14},4)},say:['pad','O boi voou!']},
    {t:'Mas a WIC queria lucro rápido, e Nassau gastava muito e perdoava dívidas. Em 1644 ele foi chamado de volta. Sem ele, a companhia apertou a cobrança, e a revolta começou.',do(){hide('s7');hide('boi');show('s8');go('nas',{f:-1},.1);walk('nas',{x:-160},3);walk('wicman',{x:640},2.6)},say:['wicman','Paguem as dívidas. Agora!']}
  ],
  facts:['Nassau governou de 1637 a 1644, a serviço da WIC.','Tolerância religiosa: no Recife funcionou a primeira sinagoga das Américas, a Kahal Zur Israel.','Cidade Maurícia, pontes e observatório. Artistas: Frans Post e Albert Eckhout.','Deu crédito aos senhores de engenho. Saiu em 1644, por conflito com a WIC.'],
  trap:'Tolerância religiosa não era liberdade para todos. A escravidão continuou, e os holandeses tomaram portos na África para garantir o tráfico.'});
