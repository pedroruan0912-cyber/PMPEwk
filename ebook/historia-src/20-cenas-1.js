/* ===== Episódios: abertura e itens 1 a 3 do edital ===== */
const G=['Abertura','Item 1 · Ocupação e colonização','Item 2 · A importância do açúcar','Item 3 · Formação de Olinda e Recife','Item 4 · A presença holandesa e Nassau','Item 5 · Resistência e emancipação','Item 6 · Pernambuco na República','Item 7 · Cultura popular','Item 8 · Aspectos afro-brasileiros','Revisão final'];
function S(o){o.group=G[o.g];SCENES.push(o)}
/* atalhos: placa, pilha de placas e pergaminho como atores escondidos */
function sg(id,x,y,t,o){return act(id,0,0,sign(x,y,t,o),{o:0,h:0})}
function sk2(id,x,y,list,o){return act(id,0,0,stack(x,y,list,o),{o:0,h:0})}
function scr(id,x,y,title,lines,w){return act(id,x,y,scroll(title,lines,w),{o:0,h:0})}
function ins(id,x,y,w,h,inner,title){return act(id,x,y,inset(w,h,inner,title),{o:0,h:0})}
const Y='#f6c21c',BL='#bfe3ff',GR='#c9f0c9',RD='#ffd0c2';

S({id:'abertura',g:0,tag:'Abertura',year:'',title:'Pernambuco, o Leão do Norte',
  art:()=>sky('day')+sun(1090,120)+clouds()+sea(400)+beach(560)+palm(110,600,1.2)+palm(1190,590,1.1)
    +act('flag',640,640,pole('pe',360,330,220),{h:380})
    +act('leao',320,655,lion(),{s:1.3,h:190})
    +act('d1',930,655,P('passista',{propR:'sombrinha',up:1}))
    +act('d2',1060,655,P('passista',{sk:'af',c:'#2a9d8f',c2:'#f6c21c',propR:'sombrinha',up:1,hc:'#1d120b'}))
    +sk2('st',640,90,['8 ITENS DO EDITAL · 10 QUESTÕES NA PROVA'],{bg:Y}),
  beats:[
    {t:'Pernambuco já foi a capitania mais rica do Brasil. Foi invadido, expulsou os invasores e se rebelou tantas vezes que ganhou o apelido de Leão do Norte.',say:['leao','Eu sou o Leão do Norte!']},
    {t:'Neste desenho, você vai percorrer essa história na ordem dos oito itens do edital da PMPE: colonização, açúcar, Olinda e Recife, holandeses, revoltas, República, cultura popular e herança afro-brasileira.',do(){show('st')}},
    {t:'No fim de cada episódio aparece o quadro Cai na Prova, com as datas, os nomes e a pegadinha de que a banca gosta. Vamos começar!',do(){cls('d1','dance');cls('d2','dance')},say:['leao','Simbora estudar!']}
  ],
  facts:['Item 1: ocupação e colonização. Item 2: o açúcar. Item 3: Olinda e Recife. Item 4: holandeses e Nassau.','Item 5: quilombos, Insurreição Pernambucana, Mascates, 1817, Confederação do Equador, Cabanos e Praieira.','Item 6: República. Item 7: frevo, maracatu, culinária e festas. Item 8: aspectos afro-brasileiros.'],
  trap:''});

S({id:'povos',g:1,item:1,year:'Antes de 1500',title:'Os primeiros pernambucanos',
  art:()=>sky('dawn')+sun(1040,210,50,'#ffe08a')+hill(300,540,470,230,'#6b9f4a')+hill(1000,560,520,200,'#4f9f44')
    +`<path d="M-10,540 Q30,250 250,236 Q420,250 450,540Z" fill="#c98e5a" ${ST}/><g stroke="#a12a1a" stroke-width="6" fill="none" stroke-linecap="round"><circle cx="150" cy="330" r="10"/><path d="M150,340 v40 m-18,-26 h36 m-18,26 l-14,26 m14,-26 l14,26"/><circle cx="240" cy="350" r="10"/><path d="M240,360 v40 m-18,-30 l18,10 18,-10 m-18,30 l-14,26 m14,-26 l14,26"/><path d="M300,420 h60 l14,-14 m-74,14 v24 m60,-24 v24"/></g>`
    +field(520)+trees([[620,500,.8],[1180,490,.9],[1090,510,.7]])+oca(790,580,1)+oca(990,560,.85)+at(640,668,bonfire(),.6)
    +act('ina',400,660,P('india'))+act('cac',530,655,P('cacique',{propR:'lanca'}))+act('arq',1140,655,P('indio',{propR:'arco'}),{f:1})
    +sg('s1',370,110,'VALE DO CATIMBAU · FURNA DO ESTRAGO',{fs:26})+sg('s2',640,110,'LITORAL: TUPIS · CAETÉS E TABAJARAS',{bg:BL})
    +sg('s3',640,110,'INTERIOR: “TAPUIAS” · CARIRIS E OUTROS',{bg:'#ffe0a8'})+sg('s4',640,110,'PARANÃ-PUKA = “MAR FURADO”',{bg:Y}),
  beats:[
    {t:'Muito antes dos europeus, Pernambuco já era habitado. No Vale do Catimbau e na Furna do Estrago, no Agreste, há pinturas rupestres e vestígios humanos com milhares de anos.',do(){show('s1')}},
    {t:'No litoral viviam povos de língua tupi: os Caetés, de Olinda até o rio São Francisco, e os Tabajaras. Mais ao norte ficavam os Potiguaras.',do(){hide('s1');show('s2')}},
    {t:'No interior viviam povos de outras línguas, que os tupis chamavam de Tapuias, como os Cariris. Deles descendem povos de hoje, como os Xukuru, os Pankararu e os Fulni-ô.',do(){hide('s2');show('s3')}},
    {t:'Viviam em aldeias, da mandioca, da caça, da pesca e da coleta, sem propriedade privada da terra. A farinha, a tapioca e a rede são heranças indígenas.',do(){hide('s3')},say:['ina','Mandioca, tapioca e rede: tudo nosso!']},
    {t:'Até o nome Pernambuco é indígena: vem do tupi paranã-puka, “mar furado” ou “buraco no mar”, por causa das aberturas nos arrecifes do litoral.',do(){show('s4')},say:['cac','Paranã-puka!']}
  ],
  facts:['Litoral: povos tupis, como Caetés e Tabajaras. Interior: os chamados Tapuias, como os Cariris.','Pernambuco vem do tupi paranã-puka, “mar furado”, referência aos arrecifes.','Os Fulni-ô, de Águas Belas, mantêm viva a sua língua, o Yaathe.','Heranças indígenas: mandioca, farinha, tapioca, rede e muitos nomes de lugares.'],
  trap:'Tapuia não é o nome de um povo. Era como os tupis chamavam, de forma genérica, quem não falava tupi.'});

S({id:'contato',g:1,item:1,year:'1500–1534',title:'Pau-brasil, escambo e feitorias',
  art:()=>sky('day')+sun(180,120)+clouds()+sea(380)
    +act('fr',1520,440,ship({flag:'fr'}),{s:.5,f:1,h:0})+act('nau',-240,462,ship({cross:1}),{s:.78,h:0})
    +beach(540)+tree(960,565,.8,'#2f8f3f','#b3261e')+tree(1090,570,1.1,'#2f8f3f','#b3261e')+tree(1200,600,.9,'#2f8f3f','#b3261e')+palm(60,610,1)
    +act('feit',790,596,palisade(-140,0,280,64)+`<rect x="-64" y="-120" width="128" height="76" fill="#c9a26b" ${ST}/><path d="M-80,-120 L0,-168 L80,-120Z" fill="#a9743f" ${ST}/>`+at(96,-44,pole('pt',150,60,40)),{o:0,h:0})
    +act('pt2',360,662,P('port',{propR:'espada'}),{o:0})+act('pt1',480,656,P('port',{c:'#7b1e2b',propR:'machado',hat:'plume'}),{o:0})
    +act('i1',900,656,P('indio',{propR:'tora'}),{f:1})+act('i2',1010,662,P('cacique'),{f:1})
    +sg('s1',640,80,'CABO DE SANTO AGOSTINHO · 1500?')+sg('s2',1080,330,'PAU-BRASIL',{bg:RD})+sg('s3',640,80,'ESCAMBO = TROCA, SEM MOEDA',{bg:Y})
    +sg('s4',790,400,'FEITORIA · 1516')+sg('s5',640,80,'CONTRABANDO FRANCÊS!',{bg:RD}),
  beats:[
    {t:'Em janeiro de 1500, antes de Cabral, o espanhol Vicente Pinzón teria avistado o Cabo de Santo Agostinho. A tese é polêmica, mas aparece em provas.',do(){go('nau',{x:300},5);show('s1')}},
    {t:'Nas primeiras décadas, Portugal não colonizou a terra: explorou o pau-brasil, madeira que dava tinta vermelha para tingir tecidos.',do(){hide('s1');show('pt1');show('pt2');show('s2')}},
    {t:'O trabalho era feito pelos indígenas, por meio do escambo: eles cortavam e carregavam as toras em troca de machados, facas, espelhos e tecidos.',do(){hide('s2');show('s3');walk('i1',{x:590},2.2)},say:['pt1','Um machado por essa madeira?']},
    {t:'Para guardar a madeira e vigiar a costa surgiram as feitorias. A de Cristóvão Jacques, de 1516, no Canal de Santa Cruz, junto a Itamaracá, foi uma das primeiras do Brasil.',do(){hide('s3');show('feit');show('s4')}},
    {t:'Mas navios franceses contrabandeavam pau-brasil, aliados a grupos indígenas. Para não perder a terra, o rei Dom João III decidiu colonizar de verdade.',do(){hide('s4');show('s5');go('fr',{x:1040},4)},say:['pt1','Franceses! Avisem o rei!']}
  ],
  facts:['De 1500 a 1530: período pré-colonial, com pau-brasil, escambo e feitorias.','Feitoria de Cristóvão Jacques, 1516, na região de Itamaracá e Igarassu.','A ameaça francesa levou Portugal à colonização efetiva.'],
  trap:'Escambo é troca de trabalho por objetos, sem moeda. Não é escravidão: a escravização dos indígenas veio depois, com a lavoura da cana.'});

S({id:'duarte',g:1,item:1,year:'1534–1535',title:'Capitanias Hereditárias e Duarte Coelho',
  art:()=>sky('day')+sun(1130,110)+clouds()+sea(400)+act('nau',-260,476,ship({cross:1}),{s:.85,h:0})+beach(560)
    +hill(1070,600,300,190,'#63b04d')+act('igr',1070,440,church(0,0,.55),{o:0,h:0})+palm(70,610,1)+palm(1230,640,.8)
    +act('du',520,660,P('nobre',{propR:'espada',fc:'#e63946',beard:'full'}),{o:0})+act('br',650,660,P('dama'),{o:0})+act('je',790,660,P('port',{hat:'plume',c:'#2f6b4f',beard:'mustache',fc:'#f6c21c'}),{o:0})
    +act('mu',900,660,P('india'),{o:0,f:1})+act('cac',1010,656,P('cacique',{propR:'lanca'}),{o:0,f:1})
    +ins('map',640,300,520,300,`<rect width="520" height="300" fill="#2f93da"/><path d="M0,0 H300 Q372,60 336,140 Q300,224 236,300 H0Z" fill="#63b04d" stroke="${OL}" stroke-width="4"/><rect x="0" y="60" width="352" height="30" fill="#f6c21c" stroke="${OL}" stroke-width="3"/><rect x="0" y="210" width="286" height="30" fill="#ffe9a8" stroke="${OL}" stroke-width="3"/>${[30,120,150,180,270].map(v=>`<path d="M0,${v} H${v<150?350:300}" stroke="${OL}" stroke-width="2" stroke-dasharray="8 6"/>`).join('')}<text x="14" y="83" font-size="21" fill="${OL}">PERNAMBUCO</text><text x="14" y="233" font-size="21" fill="${OL}">SÃO VICENTE</text><text x="410" y="160" font-size="20" fill="#fff" text-anchor="middle">OCEANO</text>`,'CAPITANIAS HEREDITÁRIAS · 1534')
    +scr('carta',410,290,'CARTA DE DOAÇÃO',['dá a posse da capitania','ao donatário'],350)+scr('foral',870,290,'FORAL',['fixa direitos, deveres','e tributos'],350)
    +sg('s1',640,610,'NOVA LUSITÂNIA · DUARTE COELHO',{bg:Y})+sg('s2',1010,250,'IGARASSU E OLINDA · 1535')+sg('s3',640,80,'SÓ PERNAMBUCO E SÃO VICENTE PROSPERARAM',{bg:GR,fs:26}),
  beats:[
    {t:'Em 1534, o rei Dom João III dividiu o Brasil em capitanias hereditárias: faixas de terra entregues a donatários, que deviam colonizar com recursos próprios.',do(){show('map')}},
    {t:'A capitania de Pernambuco, batizada de Nova Lusitânia, coube a Duarte Coelho. Ela ia do Canal de Santa Cruz, ao norte, até a foz do rio São Francisco, ao sul.',do(){go('nau',{x:250},4);show('s1')}},
    {t:'Dois documentos regulavam tudo. A Carta de Doação dava a posse da capitania ao donatário. O Foral fixava os direitos, os deveres e os tributos.',do(){hide('map');hide('s1');show('carta');show('foral')}},
    {t:'Duarte Coelho chegou em 9 de março de 1535, com a esposa, Dona Brites de Albuquerque, e o cunhado Jerônimo de Albuquerque. Fundou Igarassu e, logo depois, Olinda.',do(){hide('carta');hide('foral');show('du');show('br');show('je');show('igr');show('s2')},say:['du','Ó linda situação para se fundar uma vila!']},
    {t:'Jerônimo uniu-se à filha do cacique tabajara Arcoverde. A aliança com os Tabajaras ajudou na guerra contra os Caetés, e ele ficou conhecido como o Adão Pernambucano.',do(){hide('s2');show('cac');show('mu')},say:['je','Tabajaras, somos aliados!']},
    {t:'Resultado: Pernambuco e São Vicente foram as únicas capitanias que prosperaram. E, depois da morte de Duarte Coelho, Dona Brites governou a capitania: a primeira mulher a governar nas Américas.',do(){show('s3')},say:['br','Agora quem governa sou eu.']}
  ],
  facts:['1534: capitanias hereditárias. Pernambuco era a Nova Lusitânia, do donatário Duarte Coelho, que chegou em 1535.','Carta de Doação dá a posse. Foral fixa direitos, deveres e tributos.','Só Pernambuco e São Vicente prosperaram.','Dona Brites de Albuquerque governou a capitania. Jerônimo de Albuquerque foi o “Adão Pernambucano”.'],
  trap:'O donatário não era dono da terra. Tinha a posse e o governo, passados por herança, mas não podia vender a capitania, que continuava do rei.'});

S({id:'acucar',g:2,item:2,year:'Séc. XVI e XVII',title:'O engenho: a fábrica de açúcar',
  art:()=>sky('day')+sun(1130,100)+clouds()+hill(300,490,430,170,'#5aa84a')+hill(990,500,480,160,'#4f9f44')+field(480,'#7cc15a','#5a9a3e')
    +casaGrande(280,440,.95)+church(566,450,.5)+senzala(710,530,.8)+moenda(960,510,.95)
    +canefield(20,330,600,1)+canefield(0,540,690,1.1)
    +act('boi',1330,665,at(-170,0,cart())+quad('boi'),{h:150,f:1})
    +act('e1',190,668,P('escravo',{propR:'facao'}))+act('e2',400,674,P('escrava',{propR:'cana'}))+act('sr',610,650,P('senhor',{propR:'cajado'}))
    +act('paes',1090,668,sugarLoaf(-50,0)+sugarLoaf(-10,0)+sugarLoaf(30,0)+crate(104,0,'AÇÚCAR'),{o:0,h:0})
    +act('pir',1380,660,P('mercador',{c:'#7a1f1f',propR:'espada',beard:'full'}),{f:1})
    +act('parts',0,0,sign(280,200,'CASA-GRANDE')+sign(580,290,'CAPELA',{fs:22})+sign(712,430,'SENZALA',{fs:22})+sign(990,260,'MOENDA'),{o:0,h:0})
    +act('plant',0,0,sign(640,80,'PLANTATION',{fs:36,bg:'#0b3fa8',fg:'#fff'})+stack(640,150,['LATIFÚNDIO','MONOCULTURA','MÃO DE OBRA ESCRAVIZADA','EXPORTAÇÃO'],{bg:Y}),{o:0,h:0})
    +ins('atl',640,270,500,240,`<rect width="500" height="240" fill="#2f93da"/><path d="M0,20 Q160,10 176,90 Q166,200 60,240 H0Z" fill="#63b04d" stroke="${OL}" stroke-width="4"/><path d="M500,0 H340 Q296,70 330,130 Q356,200 400,240 H500Z" fill="#e2b96a" stroke="${OL}" stroke-width="4"/><text x="12" y="116" font-size="18" fill="${OL}">PERNAMBUCO</text><text x="488" y="84" font-size="18" fill="${OL}" text-anchor="end">COSTA DA MINA</text><text x="488" y="186" font-size="18" fill="${OL}" text-anchor="end">ANGOLA</text><path d="M326,84 Q250,60 196,104 M344,180 Q270,170 196,124" fill="none" stroke="#fff" stroke-width="5" stroke-dasharray="12 9"/><path d="M190,106 l22,-14 -2,22z M190,124 l24,-4 -10,20z" fill="#fff"/>`,'TRÁFICO ATLÂNTICO')
    +sg('s5',640,80,'A CAPITANIA MAIS RICA DA COLÔNIA',{bg:GR})
    +ins('gado',640,280,480,240,sky('sertao').replace('width="1280" height="720"','width="480" height="240"')+`<rect y="170" width="480" height="70" fill="#d9a55b"/><path d="M0,150 Q240,120 480,160 V176 Q240,140 0,170Z" fill="#2f93da"/>`+cactus(60,190,.5)+cactus(430,200,.45)+at(190,222,quad('boi'),.6)+at(320,226,quad('boi','#8a5a2b'),.5),'SERTÃO · O “RIO DOS CURRAIS”'),
  beats:[
    {t:'O que fez Pernambuco enriquecer foi o açúcar. O solo de massapê da Zona da Mata, o clima quente e úmido e a proximidade da Europa eram perfeitos para a cana.',do(){walk('boi',{x:1100},3)}},
    {t:'A unidade de produção era o engenho: a casa-grande do senhor, a senzala dos escravizados, a capela e a moenda, onde a cana era moída para virar açúcar.',do(){show('parts')}},
    {t:'O modelo era o da plantation: latifúndio, monocultura, mão de obra escravizada e produção voltada para a exportação.',do(){hide('parts');show('plant')}},
    {t:'No começo, os senhores escravizaram indígenas. Depois, o tráfico atlântico trouxe à força milhares de africanos, sobretudo de Angola e da Costa da Mina. Dizia-se que eles eram as mãos e os pés do senhor de engenho.',do(){hide('plant');show('atl')}},
    {t:'No fim do século dezesseis, Pernambuco era a capitania mais rica da colônia e um dos maiores produtores de açúcar do mundo. Tanta riqueza atraiu piratas: o inglês James Lancaster saqueou o Recife em 1595.',do(){hide('atl');show('paes');show('s5');walk('pir',{x:1230},2)},say:['pir','Sou Lancaster. Esse açúcar é meu!']},
    {t:'No interior, o gado ocupou o Agreste e o Sertão, seguindo o rio São Francisco, o rio dos currais. A pecuária abastecia os engenhos com carne, couro e animais de tração.',do(){hide('s5');go('pir',{x:1400},1.5);show('gado')}}
  ],
  facts:['Plantation: latifúndio, monocultura, mão de obra escravizada e exportação.','Engenho: casa-grande, senzala, capela e moenda. Solo de massapê, na Zona da Mata.','Mão de obra: primeiro indígena, depois africana, trazida pelo tráfico atlântico.','A pecuária levou a ocupação para o Agreste e o Sertão.'],
  trap:'Antes mesmo da invasão, os holandeses já lucravam com o açúcar de Pernambuco: financiavam, refinavam e distribuíam o produto na Europa.'});

S({id:'olinda-recife',g:3,item:3,year:'1535–1827',title:'Olinda no alto, Recife no porto',
  art:()=>sky('day')+sun(1060,100)+clouds()+sea(430)
    +act('n1',1170,560,ship({cross:1}),{s:.42,h:0})
    +land(`M-10,480 Q120,250 330,240 Q520,250 610,480 V730 H-10Z`,'#63b04d','#4a913a')+church(300,264,.62)+sobrados(70,430,3,.55)+sobrados(390,440,3,.5)+palm(540,480,.6)+palm(40,500,.7)
    +land(`M690,600 Q860,566 1060,592 L1084,730 H670Z`,'#f4e0a1','#d9bf74')
    +act('nlp',880,520,pole('nl',120,72,48),{o:0,h:0})+sobrados(740,596,5,.42,['#e8d5a8','#d9c8a0','#c9a26b','#efe4c9'])
    +`<path d="M1096,676 q20,-24 44,-4 q22,-22 46,0 q26,-20 50,2 q24,-16 46,4 v16 h-186z" fill="#7a5a3a" ${ST3}/>`
    +act('fogo',0,0,smoke(300,230,1.8,'#666')+fire(240,330,1)+fire(390,370,.9)+fire(140,410,.8),{o:0,h:0})
    +act('nob',200,470,P('nobre'),{s:.62})+act('mer',930,668,P('mercador',{propR:'saco'}),{s:.62,f:1})
    +act('pel',1010,668,pelourinho(),{s:.6,o:0,h:0})
    +sg('sO',620,170,'OLINDA · 1535 · VILA EM 1537',{bg:GR})+sg('sR',900,410,'RECIFE: O PORTO',{bg:BL})+sg('sA',1150,706,'ARRECIFES',{fs:20})
    +sg('s4',640,60,'1631: OLINDA INCENDIADA · RECIFE, CAPITAL HOLANDESA',{fs:24,bg:RD})
    +sk2('st5',920,250,['VILA · 1710','CIDADE · 1823','CAPITAL · 1827'],{bg:Y})+sg('s6',640,170,'UNESCO · 1982 · PATRIMÔNIO DA HUMANIDADE',{fs:22,bg:Y}),
  beats:[
    {t:'Olinda nasceu no alto das colinas, em 1535, e virou vila em 1537, com o Foral de Olinda. Era a sede da capitania: cidade dos senhores de engenho, das igrejas e dos conventos.',do(){show('sO')}},
    {t:'Lá embaixo, protegido por uma muralha natural de arrecifes, ficava o porto, o Arrecife dos Navios. Era só um povoado de pescadores, marinheiros e armazéns de açúcar.',do(){show('sR');show('sA')}},
    {t:'Por quase cem anos, a relação foi esta: Olinda mandava e o Recife trabalhava. O Recife era apenas o porto de Olinda.',say:[['nob','Olinda manda!'],['mer','E o Recife carrega o açúcar...']]},
    {t:'Com os holandeses, tudo se inverteu. Eles incendiaram Olinda, em 1631, e fizeram do Recife a sua capital. O porto virou cidade.',do(){hide('sO');hide('sR');hide('sA');show('fogo');show('nlp');show('s4')}},
    {t:'Depois, a rivalidade entre a Olinda dos senhores de engenho e o Recife dos comerciantes explodiu na Guerra dos Mascates. O Recife virou vila em 1710, cidade em 1823 e capital de Pernambuco em 1827.',do(){hide('fogo');hide('nlp');hide('s4');show('pel');show('st5')}},
    {t:'Olinda guardou o casario colonial e, em 1982, foi declarada Patrimônio Cultural da Humanidade pela Unesco.',do(){hide('st5');show('s6')}}
  ],
  facts:['Olinda: fundada em 1535, vila em 1537, pelo Foral de Olinda. Primeira capital.','O Recife nasceu como porto de Olinda. O nome vem dos arrecifes.','Recife: vila em 1710, cidade em 1823 e capital em 1827.','Olinda é Patrimônio Cultural da Humanidade, pela Unesco, desde 1982.'],
  trap:'Na época colonial, a capital era Olinda, e não o Recife. O Recife só ganhou importância com os holandeses.'});
