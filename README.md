# E-book interativo – Direitos Humanos e Legislação Especial (PMPE)

E-book em HTML para a prova de Soldado PMPE (bancas FCC e Vunesp), com teoria, quadros de pegadinhas e questões comentadas.

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

Recursos: 309 questões comentadas (estilos FCC e Vunesp), simulado com correção e desempenho por capítulo, 100 flashcards de pegadinhas, caderno de erros e progresso salvo no navegador.

## Editar e gerar de novo

Os fontes ficam em `ebook/src/` (capítulos em HTML, questões em `q1.js` a `q4.js`, flashcards em `flash.js`, lógica em `99-app.js`). Depois de editar:

```bash
./ebook/build.sh
```

Cada questão segue o formato `{c:'c6', b:'FCC', e:'enunciado', o:[5 alternativas], a:índice_da_correta, x:'comentário'}`. As alternativas são embaralhadas de forma estável na exibição (exceto as de assertivas I, II, III).
