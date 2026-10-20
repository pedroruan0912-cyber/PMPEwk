// Exercícios. e = enunciado, o = opções, a = índice da correta, x = comentário.
const QUIZ = {
tese:[
 {e:'Tema: "Os desafios para reduzir os acidentes de trânsito no Brasil". Tese: "O trânsito brasileiro é um assunto muito importante que merece a atenção de todos."',
  o:['Tese boa','Tese fraca'], a:1, x:'Não responde por que é difícil reduzir os acidentes e não anuncia argumentos. É só uma frase genérica.'},
 {e:'Mesmo tema. Tese: "Esse cenário persiste, sobretudo, devido à imprudência dos condutores e à fiscalização insuficiente."',
  o:['Tese boa','Tese fraca'], a:0, x:'Responde ao "por quê" e já anuncia D1 (imprudência) e D2 (fiscalização).'},
 {e:'Tema: "A importância da saúde mental dos policiais". Tese: "Cuidar da saúde mental dos policiais é essencial, pois melhora o serviço prestado à população e reduz o adoecimento e o suicídio na corporação."',
  o:['Tese boa','Tese fraca'], a:0, x:'Tema de "importância": a tese traz dois benefícios claros.'},
 {e:'Tema: "Caminhos para combater os golpes digitais". Tese: "Na minha opinião, os golpes são terríveis e eu acho que o governo deveria fazer alguma coisa."',
  o:['Tese boa','Tese fraca'], a:1, x:'Primeira pessoa, linguagem informal e nenhum argumento. Troque por: "Os golpes avançam devido à falta de educação digital e ao anonimato dos criminosos."'},
 {e:'Tema: "Os impactos das notícias falsas na segurança pública". Tese: "As notícias falsas comprometem a segurança pública ao provocar pânico e linchamentos e ao enfraquecer a confiança nas instituições."',
  o:['Tese boa','Tese fraca'], a:0, x:'Tema de "impactos": a tese aponta dois efeitos e liga ao recorte (segurança pública).'}
],
fuga:[
 {e:'Tema: "A violência contra a pessoa idosa". O texto fala sobre a violência urbana em geral e o aumento de assaltos nas cidades.',
  o:['Fuga','Tangenciamento','Dentro do tema'], a:1, x:'Fala de violência, mas não do recorte (pessoa idosa). Não zera, mas perde muitos pontos.'},
 {e:'Tema: "Os desafios da mobilidade urbana". O texto fala sobre a importância da reciclagem do lixo.',
  o:['Fuga','Tangenciamento','Dentro do tema'], a:0, x:'Assunto totalmente diferente: fuga ao tema, nota zero.'},
 {e:'Tema: "A importância da polícia comunitária". O texto defende que a aproximação entre policiais e moradores aumenta a confiança e a prevenção.',
  o:['Fuga','Tangenciamento','Dentro do tema'], a:2, x:'Responde exatamente ao recorte "importância" + "polícia comunitária".'},
 {e:'Tema: "Caminhos para combater o feminicídio". O texto descreve os tipos de violência doméstica, mas não fala em mortes de mulheres nem em soluções.',
  o:['Fuga','Tangenciamento','Dentro do tema'], a:1, x:'Fica no assunto geral (violência doméstica) e ignora o recorte (feminicídio) e o comando (caminhos para combater).'}
],
con:[
 {e:'A Lei Seca é rigorosa; ___, muitos motoristas ainda dirigem embriagados.', o:['portanto','no entanto','além disso'], a:1, x:'Há oposição entre a lei rigorosa e o desrespeito: "no entanto".'},
 {e:'___ a polícia aumente o patrulhamento, a participação da comunidade continua essencial.', o:['Embora','Porque','Logo'], a:0, x:'Concessão: "embora" + subjuntivo ("aumente").'},
 {e:'Muitas vítimas não denunciam, ___ temem represálias do agressor.', o:['pois','contudo','a fim de'], a:0, x:'Causa/explicação: "pois".'},
 {e:'O efetivo policial é insuficiente. ___, faltam equipamentos e viaturas.', o:['Entretanto','Além disso','Portanto'], a:1, x:'Acréscimo de um novo problema: "Além disso".'},
 {e:'A fiscalização foi ampliada, ___ os acidentes diminuíram.', o:['de modo que','embora','ao passo que'], a:0, x:'Consequência: "de modo que".'},
 {e:'O Estado deve investir em educação, ___ afastar os jovens do crime.', o:['a fim de','visto que','todavia'], a:0, x:'Finalidade: "a fim de".'},
 {e:'___ a impunidade aumenta, a confiança da população diminui.', o:['À medida que','Na medida que','Ao invés de'], a:0, x:'Proporção: "à medida que" (com crase). "Na medida que" não existe.'},
 {e:'___, conclui-se que a violência contra a mulher exige ações em várias frentes.', o:['Diante do exposto','Em primeiro lugar','Por exemplo'], a:0, x:'Abertura de conclusão: "Diante do exposto".'},
 {e:'A desigualdade social expõe os jovens ao tráfico, ___ os torna vulneráveis ao aliciamento.', o:['o que','onde','sendo que'], a:0, x:'"O que" retoma a ideia anterior. "Onde" é só para lugar e "sendo que" é vício.'},
 {e:'Os golpes digitais exploram a confiança das vítimas, ___ dos idosos.', o:['sobretudo','contudo','logo'], a:0, x:'Destaque/inclusão: "sobretudo".'},
 {e:'A prisão deveria ressocializar; ___, muitas vezes devolve à sociedade alguém mais violento.', o:['todavia','assim','por isso'], a:0, x:'Oposição entre o que deveria acontecer e o que acontece: "todavia".'},
 {e:'___ prevenir, o poder público tem apostado apenas na repressão.', o:['Em vez de','Ao invés de','Afim de'], a:0, x:'Substituição de uma coisa por outra: "em vez de". "Ao invés de" é para opostos.'}
],
gram:[
 {e:'"A população pernambucana, sofre com a violência urbana."', o:['Certo','Errado'], a:1, x:'Vírgula entre sujeito e verbo. Correto: "A população pernambucana sofre..."'},
 {e:'"Haviam muitos casos de feminicídio no estado."', o:['Certo','Errado'], a:1, x:'"Haver" no sentido de existir é impessoal: "Havia muitos casos".'},
 {e:'"Existem muitos desafios para a segurança pública."', o:['Certo','Errado'], a:0, x:'"Existir" concorda com o sujeito "desafios".'},
 {e:'"Cabe à sociedade denunciar os casos de violência."', o:['Certo','Errado'], a:0, x:'Cabe a + a sociedade = "à sociedade".'},
 {e:'"A Lei Maria da Penha visa à proteção das mulheres."', o:['Certo','Errado'], a:0, x:'"Visar" (ter como objetivo) pede "a": visa à proteção.'},
 {e:'"Me parece que a fiscalização é insuficiente."', o:['Certo','Errado'], a:1, x:'Não se inicia frase com pronome oblíquo na norma-padrão: "Parece-me que...".'},
 {e:'"Os jovens tem direito à educação de qualidade."', o:['Certo','Errado'], a:1, x:'Plural de "ter" leva acento: "Os jovens têm direito...".'},
 {e:'"Isso leva à mudanças no comportamento dos motoristas."', o:['Certo','Errado'], a:1, x:'Não há crase antes de palavra no plural sem artigo: "leva a mudanças".'},
 {e:'"Faz muitos anos que o Estatuto do Desarmamento foi criado."', o:['Certo','Errado'], a:0, x:'"Fazer" indicando tempo é impessoal: fica no singular.'},
 {e:'"A violência é um mau que atinge toda a sociedade."', o:['Certo','Errado'], a:1, x:'Substantivo oposto de "bem" é "mal": "um mal que atinge...".'},
 {e:'"É preciso combater o problema, mas a falta de verbas dificulta as ações."', o:['Certo','Errado'], a:0, x:'Vírgula antes de "mas" e uso correto de "mas" (oposição).'},
 {e:'"Vivemos em uma sociedade onde a informação circula rapidamente."', o:['Certo','Errado'], a:1, x:'Sociedade não é lugar físico: "em que a informação circula".'},
 {e:'"Essa ideia é defendida por muitos especialistas."', o:['Certo','Errado'], a:0, x:'"Ideia" não tem acento desde o Acordo Ortográfico.'},
 {e:'"A muito tempo o Brasil enfrenta esse problema."', o:['Certo','Errado'], a:1, x:'Tempo passado se indica com "há": "Há muito tempo...".'},
 {e:'"Portanto, é necessário que o Estado invista em educação."', o:['Certo','Errado'], a:0, x:'Conectivo seguido de vírgula e subjuntivo "invista" depois de "é necessário que".'},
 {e:'"Embora a lei existe, ela não é cumprida."', o:['Certo','Errado'], a:1, x:'"Embora" pede subjuntivo: "Embora a lei exista...".'}
]
};
