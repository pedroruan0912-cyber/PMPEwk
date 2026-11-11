# E-book interativo – Direitos Humanos e Legislação Especial (PMPE)

E-book em HTML para a prova de Soldado PMPE (banca do edital: Instituto AOCP; também questões no estilo FCC e Vunesp), com teoria, quadros de pegadinhas e questões comentadas.

**Abrir:** baixe `ebook/direitos-humanos-pmpe.html` e abra no navegador (funciona offline; as fontes carregam do Google Fonts quando há internet).

## Conteúdo

17 capítulos:

1. Teoria geral dos Direitos Humanos
2. Evolução histórica e gerações
3. Incorporação dos tratados (art. 5º, §§ 2º e 3º, CF) e hierarquia
4. Declaração Universal dos Direitos Humanos (1948)
5. Pacto de San José da Costa Rica (Decreto 678/1992)
6. ECA (Lei 8.069/1990)
7. Abuso de Autoridade (Lei 13.869/2019)
8. Tortura (Lei 9.455/1997)
9. Maria da Penha (Lei 11.340/2006)
10. Crimes de preconceito de raça ou de cor (Lei 7.716/1989)
11. Crimes ambientais (Lei 9.605/1998)
12. Crimes hediondos (Lei 8.072/1990)
13. Lei de Drogas (Lei 11.343/2006)
14. Estatuto dos Policiais Militares de Pernambuco (Lei 6.783/1974)
15. Estatuto da Pessoa Idosa (Lei 10.741/2003)
16. Estatuto da Juventude (Lei 12.852/2013)
17. Súmulas e jurisprudência dos Tribunais Superiores

Adequado ao **Edital de Soldado PMPE 2026 (Instituto AOCP)**: painel na capa com o formato da prova (10 questões de Direitos Humanos e Legislação Extravagante no Bloco III) e o mapa dos 18 itens do conteúdo programático; em cada capítulo, um quadro "Na prova da AOCP" (o que o edital pede, como a banca cobra, pares para o "relacione as colunas" e foco) e um treino de verdadeiro ou falso (138 afirmações no total); filtro de banca nas questões com AOCP como padrão; e simulado no formato da prova (10 questões AOCP, uma por capítulo sorteado).

Recursos: 796 questões comentadas (312 no estilo Instituto AOCP, 236 FCC e 248 Vunesp), simulado com filtro por banca, correção e desempenho por capítulo, 107 flashcards de pegadinhas, caderno de erros e progresso salvo no navegador.

Sistema (jogo): cada questão, item de V/F e flashcard rende XP; há nível e rank (E a S) no topo da página, missão diária (10 questões, 5 itens de V/F e 5 flashcards) com sequência de dias, missão de penalidade opcional para recuperar a sequência perdida, um "chefe" por capítulo (mini-simulado de 10 questões, 7 acertos para vencer), títulos e uma tropa formada pelas questões erradas que depois foram acertadas. A lógica fica em `ebook/src/sys.js`.

## Editar e gerar de novo

Os fontes ficam em `ebook/src/` (capítulos em HTML, questões em `q1.js` a `q11.js`, sendo `q7.js` a `q11.js` as do estilo AOCP, flashcards em `flash.js`, o Sistema em `sys.js`, quadros AOCP e treino V/F em `aocp.js`, lógica em `99-app.js`). Depois de editar:

```bash
./ebook/build.sh
```

Cada questão segue o formato `{c:'c6', b:'AOCP', e:'enunciado', o:[5 alternativas], a:índice_da_correta, x:'comentário'}`, com `b` igual a `'AOCP'`, `'FCC'` ou `'Vunesp'`. As alternativas são embaralhadas de forma estável na exibição (exceto as de assertivas I, II, III).

---

# E-book interativo – Redação Nota 40 (Soldado PMPE · Instituto AOCP)

Método para a redação de Soldado PMPE (Edital 001/2026, banca Instituto AOCP): 40 pontos, mínimo de 12, texto dissertativo-argumentativo de 15 a 20 linhas. O e-book trabalha com a meta de **exatamente 20 linhas** no mapa 4 + 6 + 6 + 4.

**Abrir:** baixe `ebook/redacao-pmpe-aocp.html` e abra no navegador (funciona offline).

## Conteúdo

1. A prova e o edital (pontuação, nota zero, título, divisão do tempo)
2. Como a AOCP corrige (os 4 critérios de 10 pontos e o tom adequado)
3. O mapa das 20 linhas (o que vai em cada linha, calibrar a letra, esticar e encolher)
4. Estrutura e moldes (introdução, desenvolvimentos e conclusão com lacunas)
5. Lendo o tema e criando a tese (tipos de tema, fórmula da tese, argumentos coringa)
6. Conectivos (por parágrafo e por função, erros comuns)
7. Coesão, coerência e gramática (os erros que mais derrubam a nota)
8. Repertórios (95, com filtro por tema e tipo, e frase pronta de uso)
9. Possíveis temas (42 kits com tese, argumentos, repertórios e proposta)
10. Redações nota 40 (55 redações de 20 linhas com marcações: uma por tema e uma segunda versão dos 13 temas de chance alta)
11. Laboratório (montador de redação, contador de 20 linhas, cronômetro, autoavaliação)
12. Plano de treino de 4 semanas e checklist do dia da prova

Exercícios: teses, fuga ao tema, conectivos e gramática. Progresso, rascunhos e respostas ficam salvos no navegador.

Sistema (jogo): cada questão, item de V/F e flashcard rende XP; há nível e rank (E a S) no topo da página, missão diária (10 questões, 5 itens de V/F e 5 flashcards) com sequência de dias, missão de penalidade opcional para recuperar a sequência perdida, um "chefe" por capítulo (mini-simulado de 10 questões, 7 acertos para vencer), títulos e uma tropa formada pelas questões erradas que depois foram acertadas. A lógica fica em `ebook/src/sys.js`.

## Editar e gerar de novo

Os fontes ficam em `ebook/redacao-src/` (capítulos em HTML; dados em `modelos.js`, `repertorios.js`, `temas.js`, `quiz.js`; lógica em `99-app.js`). Depois de editar:

```bash
./ebook/build-redacao.sh
```

Nas redações-modelo (`modelos.js`) cada parágrafo é uma lista de linhas; mantenha 4-6-6-4. Marcações: `{t}tese{/}`, `{r}repertório{/}`, `{p}proposta{/}`; conectivos são destacados automaticamente.
