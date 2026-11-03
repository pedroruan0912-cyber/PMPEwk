# Material interativo – Soldado PMPE 2026 (prova objetiva)

## Novo: prova objetiva completa (6 disciplinas)

**Abrir:** baixe `pmpe-2026/pmpe-soldado-2026.html` e abra no navegador (funciona offline; as fontes carregam do Google Fonts quando há internet).

Organizado pelo Edital nº 001/2026 (Instituto AOCP, prova em 21/02/2027): 60 questões em 3 blocos, 10 por disciplina.

| Bloco | Disciplina | Capítulos |
|---|---|---|
| I | Língua Portuguesa | Interpretação e textualidade · Ortografia e acentuação · Classes de palavras · Sintaxe, QUE e SE · Concordância, regência, crase e colocação · Pontuação, semântica e figuras |
| I | História de Pernambuco | Colônia, açúcar e Palmares · Domínio holandês e Insurreição · Revoltas (Mascates, 1817, Confederação do Equador, Cabanada, Praieira, Quebra-Quilos) · República e PE atual · Cultura, símbolos, PMPE e linha do tempo |
| II | Raciocínio Lógico | Proposições e tabelas-verdade · Equivalências, negações e quantificadores · Argumentação, falácias e diagramas · Contagem e probabilidade |
| II | Informática | Hardware, Windows e arquivos · Internet, e-mail e nuvem · Segurança da informação · Word/Excel/PowerPoint e LibreOffice |
| III | Direito Constitucional | Princípios fundamentais (arts. 1º–4º) · Art. 5º integral e remédios · Direitos sociais, nacionalidade e políticos (arts. 6º–17) · Organização do Estado, Adm. Pública e art. 42 · Defesa do Estado e art. 144 integral · Poderes e Justiça Militar |
| III | Direitos Humanos e Legislação Extravagante | Os 17 capítulos do e-book abaixo + texto integral e atualizado (até 2026, copiado do Planalto) do ECA (Lei 8.069/1990) e da Lei Maria da Penha (Lei 11.340/2006) |

Recursos:

- **Ir para…** (`Ctrl+K`): pula para qualquer capítulo, seção, artigo, inciso ou parágrafo (ex.: `art 5 LXI`, `art 144 § 5`, `abuso art 4`, `crase`, `Nassau`).
- **Buscar** (`/`): pesquisa qualquer palavra ou frase (com "aspas" para frase exata) em toda a teoria, ignorando acentos, e leva ao trecho destacado.
- **Só bizus** (`B`): a teoria mostra apenas títulos, bizus, macetes e pegadinhas. **Mural de bizus**: todos os quadros em uma página, com filtro.
- 665 questões comentadas, simulado no formato da prova (60 questões, correção pelos critérios eliminatórios do edital), 209 flashcards, caderno de erros, capítulos marcados como estudados, contagem regressiva.
- Ferramentas: gerador de tabela-verdade, calculadora de contagem, filtros nas tabelas e na linha do tempo.

Para editar: os fontes ficam em `pmpe-2026/src/` (o módulo de Direitos Humanos é lido de `ebook/src/`). Depois de editar, rode `./pmpe-2026/build.sh`.

---

## E-book – Direitos Humanos e Legislação Especial (PMPE)

E-book em HTML com teoria, quadros de pegadinhas e questões comentadas.

**Abrir:** baixe `ebook/direitos-humanos-pmpe.html` e abra no navegador.

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

Recursos: 484 questões comentadas, simulado com correção e desempenho por capítulo, 100 flashcards de pegadinhas, caderno de erros e progresso salvo no navegador.

Os fontes ficam em `ebook/src/` (capítulos em HTML, questões em `q1.js` a `q6.js`, flashcards em `flash.js`, lógica em `99-app.js`). Depois de editar, rode `./ebook/build.sh`.

Cada questão segue o formato `{c:'c6', b:'FCC', e:'enunciado', o:[5 alternativas], a:índice_da_correta, x:'comentário'}`. As alternativas são embaralhadas de forma estável na exibição (exceto as de assertivas I, II, III).
