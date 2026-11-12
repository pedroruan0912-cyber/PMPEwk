# Videoaulas de Office 2019 e LibreOffice 7 (design)

Data: 2026-11-11

## Objetivo

Produzir uma série de 9 videoaulas em MP4, em português, que ensinam a usar o Microsoft Office 2019 (Word, Excel, PowerPoint) e o LibreOffice 7 (Writer, Calc, Impress): interface, recursos e atalhos. O público é quem estuda para Soldado PMPE 2026 (Instituto AOCP), o mesmo dos dois e-books do repositório, então a ênfase é no que cai em prova e nas diferenças entre as duas suítes.

Dito pelo usuário: videoaula completa, Office 2019 e LibreOffice 7, funções e atalhos, MP4 de verdade, arquivos guardados no Git.

Suposição minha: o foco em concurso (PMPE/AOCP). O edital não foi consultado, então nenhuma aula afirma o que o edital pede; as aulas dizem apenas "como as bancas costumam cobrar".

## Sucesso

- 9 arquivos MP4 que tocam em celular e computador (H.264 + AAC), com imagem nítida em 720p e narração compreensível.
- Cada aula cobre todos os itens do seu roteiro (lista abaixo) e cada atalho mostrado na tela confere com a tabela única de atalhos.
- Qualquer pessoa consegue gerar tudo de novo com um comando depois de editar um roteiro.

## Fora do escopo

- Outlook, Access, Publisher, Base, Draw e Math.
- Captura de tela real. Não há Office neste ambiente, e o LibreOffice instalado é o 24.2 em inglês. As telas são desenhadas em HTML/CSS, em português, com os nomes de guias e menus das versões 2019 e 7.
- Todas as mais de 400 funções do Excel. Entram as funções mais cobradas em concurso (lista na aula 6).
- Legenda em arquivo separado (.srt). A fala aparece escrita na própria tela.

## As 9 aulas

Cada aula tem de 8 a 12 minutos (cerca de 1.200 a 1.800 palavras de narração) e termina com um bloco "Como cai na prova" com 2 ou 3 itens no estilo da banca, sem atribuir a uma prova real.

1. **Visão geral.** As duas suítes, programas equivalentes, licença (proprietária x livre), extensões de arquivo (.docx/.odt, .xlsx/.ods, .pptx/.odp, modelos, PDF), faixa de opções x menus e barras, onde ficam salvar/abrir/imprimir/exportar.
2. **Word 2019.** Guias Arquivo, Página Inicial, Inserir, Design, Layout, Referências, Correspondências, Revisão e Exibir; fonte e parágrafo, estilos, pincel de formatação, quebras, cabeçalho e rodapé, sumário, notas, mala direta, controle de alterações, modos de exibição, atalhos em português.
3. **Writer 7.** Menus Arquivo, Editar, Exibir, Inserir, Formatar, Estilos, Tabela, Formulário, Ferramentas, Janela e Ajuda; barra lateral, Navegador, estilos de parágrafo e de página, exportar como PDF, registrar alterações, atalhos.
4. **Excel 2019.** Pasta, planilha, célula, intervalo; guias; referências relativa, absoluta e mista; operadores e precedência; alça de preenchimento; formatos numéricos; classificar e filtrar; formatação condicional; gráficos; congelar painéis; mensagens de erro; atalhos.
5. **Calc 7.** O mesmo roteiro da aula 4 no Calc, destacando as diferenças: referência a outra planilha (`Planilha2.A1` x `Planilha2!A1`), menus Planilha e Dados, Autofiltro, tabela dinâmica, atalhos.
6. **Funções de planilha.** SOMA, MÉDIA, MÁXIMO, MÍNIMO, MAIOR, MENOR, CONT.NÚM, CONT.VALORES, CONT.SE, SOMASE, SE, E, OU, PROCV, PROCH, CONCATENAR, ARRED, TRUNCAR, INT, MOD, HOJE, AGORA, MED, MODO; diferença entre `:` e `;`; exemplos resolvidos passo a passo.
7. **PowerPoint 2019.** Guias; layouts; slide mestre; transições x animações; modos de exibição; anotações; apresentação a partir do início e do slide atual; atalhos.
8. **Impress 7.** Menus; painel de slides e barra lateral; slide mestre; transição x animação; modos de exibição; exportar; atalhos.
9. **Atalhos lado a lado.** Tabela comparada Office em português x LibreOffice, com as pegadinhas clássicas (negrito, salvar, novo, abrir, selecionar tudo, localizar, alinhamentos), teclas de função e revisão final.

## Como o vídeo é feito

Um vídeo é uma sequência de **cenas**. Cada cena tem uma fala e uma tela. A duração da cena é a duração do áudio da fala, mais uma pausa curta.

```
roteiro da aula (dados)
   ├─ fala  ──> Kokoro (voz pt-BR) ──> WAV + duração
   └─ tela  ──> HTML/CSS ──> Chromium (Playwright) ──> PNG 1280×720
                         └──> ffmpeg junta PNG + WAV de cada cena ──> MP4 da aula
```

### Componentes

- **Roteiros** (`videoaulas/src/aulas/01-visao-geral.js` até `09-atalhos.js`). Cada arquivo exporta título e lista de cenas: `{ fala, tela: { tipo, ... } }`. É o único lugar onde se edita o conteúdo.
- **Tabela de atalhos** (`videoaulas/src/atalhos.js`). Fonte única: ação, atalho no Office em português, atalho no LibreOffice, programa. As cenas referenciam a tabela pelo nome da ação em vez de digitar teclas, para a aula 9 e as demais nunca divergirem.
- **Telas** (`videoaulas/src/telas/`). Um HTML com CSS e funções que desenham cada tipo de tela:
  - `capa` e `secao`: título da aula ou do bloco;
  - `janela`: janela simulada do programa (faixa de opções do Office ou menus e barras do LibreOffice), com um item destacado e balão explicativo;
  - `planilha`: grade com células, barra de fórmulas e resultado, para Excel e Calc;
  - `teclas`: atalho desenhado como teclas, com a ação ao lado;
  - `compara`: Office de um lado, LibreOffice do outro;
  - `lista`: tópicos curtos;
  - `pegadinha` e `questao`: quadro de armadilha e item no estilo da banca com gabarito.
  Toda tela mostra no rodapé a fala da cena por escrito e o número da aula.
- **Pronúncia** (`videoaulas/src/pronuncia.js`). Mesma ideia da lista `LEXICO` do desenho de História, com o vocabulário de informática. Converte o texto da fala para o que a voz deve ler: "Ctrl" vira "control", "F5" vira "efe cinco", "PROCV" vira "proc vê", ".docx" vira "ponto doc xis". A tela mostra o texto original; só o áudio usa o convertido.
- **Gerador** (`videoaulas/build.mjs`, chamado por `videoaulas/build.sh`). Para cada aula: valida o roteiro, gera os áudios, renderiza os PNG, monta o MP4. Aceita o número da aula para gerar só uma. Áudios e imagens intermediários vão para uma pasta de trabalho ignorada pelo Git, com cache por conteúdo (cena não alterada não é gerada de novo).

### Parâmetros do vídeo

- 1280×720, 10 quadros por segundo (as telas são estáticas), H.264 `yuv420p`, `+faststart`.
- Áudio AAC mono, 64 kbps.
- Meta de tamanho: até 15 MB por aula; limite rígido de 50 MB (acima disso o GitHub avisa).

### Dependências

- `ffmpeg` e Chromium com Playwright: já instalados.
- `kokoro-onnx`, `soundfile` e `num2words` (pip) e os modelos `kokoro-v1.0.onnx` e `voices-v1.0.bin`, baixados para a pasta de trabalho. Os modelos não entram no Git. O `build.sh` instala e baixa se faltar.

### Voz

A narração usa o Kokoro com a voz `pf_dora`, a mesma do desenho animado de História de Pernambuco que já está no repositório (`ebook/historia-src/voz/gerar_voz.py`), para o material todo ter uma voz só. O volume é normalizado do mesmo jeito (`loudnorm`).

## Onde fica no repositório

```
videoaulas/
  aula-01-visao-geral.mp4 … aula-09-atalhos.mp4
  build.sh, build.mjs
  src/aulas/, src/telas/, src/atalhos.js, src/pronuncia.js
  src/voz.py        (chama o Kokoro; o resto do gerador é Node)
  test/
  .gitignore        (pasta de trabalho)
README.md           (nova seção "Videoaulas")
```

Os MP4 são commitados direto na `main`, sem Git LFS.

## Erros e limites

- Roteiro inválido (cena sem fala, tipo de tela desconhecido, ação que não existe na tabela de atalhos, fala que não cabe no rodapé): o gerador para e diz a aula e a cena.
- Falha do Kokoro ou do ffmpeg numa cena: o gerador para com a saída do programa; nada de MP4 parcial é deixado no lugar do antigo.
- Sem rede e sem os modelos de voz baixados: mensagem clara de como obtê-los.

## Verificação

- **Testes automáticos** (`node --test`): validação de roteiro, conversão de pronúncia, montagem da linha do tempo (durações e ordem), e uma checagem de que os 9 roteiros reais passam na validação e só usam ações existentes na tabela de atalhos.
- **Conferência de cada MP4** com `ffprobe`: tem vídeo e áudio, duração entre 8 e 12 minutos, tamanho abaixo do limite.
- **Revisão visual**: abrir quadros de todos os tipos de tela de cada aula e conferir texto cortado, sobreposição e legibilidade.
- **Revisão de conteúdo**: cada atalho da tabela conferido contra a documentação oficial (Microsoft e The Document Foundation) quando acessível; o que não puder ser conferido fica listado no relatório final, não é afirmado como verificado.
- **Áudio**: ouvir não é possível aqui; a conferência é por duração, volume medido pelo ffmpeg e ausência de trechos mudos. A qualidade da voz depende da sua avaliação depois da primeira aula.

## Ordem de entrega

Primeiro o gerador e a aula 1 completa, enviada para você avaliar a voz e o visual. Depois as aulas 2 a 9, uma por commit.
