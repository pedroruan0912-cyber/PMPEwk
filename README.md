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

## Editar e gerar de novo

Os fontes ficam em `ebook/src/` (capítulos em HTML, questões em `q1.js` a `q11.js`, sendo `q7.js` a `q11.js` as do estilo AOCP, flashcards em `flash.js`, quadros AOCP e treino V/F em `aocp.js`, lógica em `99-app.js`). Depois de editar:

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

## Editar e gerar de novo

Os fontes ficam em `ebook/redacao-src/` (capítulos em HTML; dados em `modelos.js`, `repertorios.js`, `temas.js`, `quiz.js`; lógica em `99-app.js`). Depois de editar:

```bash
./ebook/build-redacao.sh
```

Nas redações-modelo (`modelos.js`) cada parágrafo é uma lista de linhas; mantenha 4-6-6-4. Marcações: `{t}tese{/}`, `{r}repertório{/}`, `{p}proposta{/}`; conectivos são destacados automaticamente.

---

# Desenho animado – História de Pernambuco (Soldado PMPE · Instituto AOCP)

Toda a História de Pernambuco em 31 episódios animados (mais a abertura), na ordem dos 8 itens do conteúdo programático do Edital 001/2026: ocupação e colonização, açúcar, Olinda e Recife, holandeses e Nassau, movimentos de resistência e emancipacionistas, período republicano, cultura popular e aspectos afro-brasileiros. Na prova de Soldado são 10 questões de História de Pernambuco, no Bloco I.

**Abrir:** baixe `ebook/historia-pernambuco-desenho.html` **junto com a pasta `ebook/historia-voz/`** (os dois lado a lado) e abra o HTML no navegador. Funciona offline; as fontes carregam do Google Fonts quando há internet. Sem a pasta de voz, o desenho usa a voz do próprio navegador ou segue só com a legenda.

## Como funciona

- Cada episódio tem cenas desenhadas em SVG, narração gravada com voz neural em português (cerca de 50 minutos no total) e legenda.
- Barra de volume da narração, além do botão que liga e desliga a voz.
- No fim de cada episódio aparece o quadro **Cai na prova**, com os fatos para memorizar e a **pegadinha da AOCP**.
- Controles: tocar e pausar, episódio anterior e próximo, voz ligada ou desligada, velocidade (1×, 1,25×, 1,5× e 2×) e tela cheia. Atalhos: espaço, setas e F.
- A lista de episódios marca os já assistidos, e o desenho continua de onde você parou.

## Editar e gerar de novo

Os fontes ficam em `ebook/historia-src/`: `10-art.js` (biblioteca de desenho: personagens, cenários, bandeiras), `20-cenas-1.js` a `24-cenas-5.js` (os episódios) e `99-app.js` (o player). Depois de editar:

```bash
./ebook/build-historia.sh
```

### Regravar a narração

A voz é gerada com o modelo aberto [Kokoro](https://github.com/thewh1teagle/kokoro-onnx) (licença Apache 2.0), voz `pf_dora`, e fica em `ebook/historia-voz/`, um arquivo por episódio. Depois de mudar o texto de alguma fala:

```bash
pip install kokoro-onnx soundfile num2words
```

```bash
node ebook/historia-src/voz/falas.js > falas.json
```

```bash
python ebook/historia-src/voz/gerar_voz.py falas.json --modelos PASTA_COM_OS_MODELOS
```

O script precisa do `ffmpeg` e dos arquivos `kokoro-v1.0.onnx` e `voices-v1.0.bin` (baixados da página de releases do kokoro-onnx). Ele só regrava as falas cujo texto mudou. Se uma fala mudar e não for regravada, o player percebe (cada gravação guarda um código do texto) e usa a voz do navegador naquela fala. Pronúncias especiais (siglas, nomes estrangeiros, algarismos romanos) ficam na lista `LEXICO` do script.

Cada episódio segue o formato `S({id, g: grupo, item: item do edital, year, title, art: () => SVG, beats: [{t: 'narração', say: ['ator', 'balão'], do() { ... }}], facts: [...], trap: 'pegadinha'})`. Em `do()`, use `show`, `hide`, `go`, `walk` e `booms` para animar os atores criados com `act(...)`.

---

# Videoaulas – Office 2019 e LibreOffice 7

Série de 9 videoaulas em MP4 (1280×720, de 8 a 12 minutos cada) sobre o Microsoft Office 2019 (Word, Excel, PowerPoint) e o LibreOffice 7 (Writer, Calc, Impress): interface, recursos e atalhos, com foco no que as bancas costumam cobrar e nas diferenças entre as duas suítes. Cada aula termina com questões no estilo de prova.

**Assistir:** baixe os arquivos `videoaulas/aula-NN-*.mp4` e abra em qualquer player (celular ou computador).

| Aula | Arquivo | Assunto |
|---|---|---|
| 1 | `aula-01-visao-geral.mp4` | As duas suítes, programas equivalentes, licença, extensões de arquivo, faixa de opções × menus, comandos de arquivo |
| 2 | `aula-02-word.mp4` | Word 2019: as guias uma a uma, fonte, parágrafo, estilos, quebras, sumário, mala direta, revisão, modos de exibição e atalhos em português |
| 3 | `aula-03-writer.mp4` | Writer 7: os menus um a um, barra lateral, Navegador, estilos, exportar como PDF, registrar alterações e atalhos |
| 4 | `aula-04-excel.mp4` | Excel 2019: célula e intervalo, operadores, referências relativa e absoluta, alça de preenchimento, as guias, mensagens de erro e atalhos |
| 5 | `aula-05-calc.mp4` | Calc 7: o que é igual ao Excel, tamanho da planilha, referência a outra planilha, alça de preenchimento, menus Planilha, Dados e Formatar, e atalhos |
| 6 | `aula-06-funcoes.mp4` | Funções de planilha: SOMA, MÉDIA, MÁXIMO, MÍNIMO, MAIOR, MENOR, MED, MODO, contagens, SE, E, OU, PROCV, arredondamentos, CONCATENAR, HOJE e AGORA, com exemplos resolvidos |

## Como são feitas

- As telas são **desenhadas**, não gravadas de um computador: reproduzem em português as guias, grupos, menus e comandos do Office 2019 e do LibreOffice 7, com o item explicado em destaque e a fala escrita no rodapé.
- A narração usa a mesma voz neural do desenho de História ([Kokoro](https://github.com/thewh1teagle/kokoro-onnx), voz `pf_dora`).
- Todo atalho mostrado vem de uma tabela única (`videoaulas/src/atalhos.mjs`), conferida na documentação da Microsoft e do LibreOffice; o cabeçalho do arquivo diz o que foi confirmado e o que não foi.

## Editar e gerar de novo

Cada aula é um roteiro em `videoaulas/src/aulas/` (por exemplo `01-visao-geral.mjs`): uma lista de cenas, cada uma com a fala e a tela. Depois de editar:

```bash
./videoaulas/build.sh 1
```

Sem número, gera todas as aulas. Na primeira vez o script instala `kokoro-onnx`, `soundfile` e `num2words` e baixa os modelos de voz (cerca de 350 MB, em `videoaulas/.trabalho/`, fora do Git). Precisa de Node 22, Python 3, ffmpeg e Chromium com Playwright. Só as cenas alteradas são gravadas e desenhadas de novo.

Para ver o texto que a voz vai ler (com as teclas e siglas já por extenso) sem gerar nada:

```bash
node videoaulas/build.mjs 1 --texto
```

Para rodar os testes:

```bash
node --test 'videoaulas/test/*.test.mjs'
```

Tipos de tela (`tela.tipo`): `capa`, `secao`, `janela` (janela do programa com uma guia ou menu aberto), `planilha`, `teclas` (atalhos das duas suítes lado a lado), `compara`, `lista`, `pegadinha` e `questao`. Se um texto não couber na tela, a geração para e diz a aula e a cena. Pronúncias especiais (nomes em inglês, siglas, teclas) ficam em `videoaulas/src/pronuncia.mjs`; quando a fala escrita não serve para a voz, a cena pode trazer um terceiro texto só para o áudio.
