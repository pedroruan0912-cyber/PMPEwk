# Videoaulas de Office 2019 e LibreOffice 7 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Gerar 9 videoaulas MP4 em português sobre Office 2019 e LibreOffice 7 (interface, recursos, atalhos) a partir de roteiros em texto, com um comando.

**Architecture:** Cada aula é uma lista de cenas (`fala` + `tela`). Para cada cena, o Kokoro grava a fala em WAV e o Chromium (Playwright) fotografa a tela desenhada em HTML/CSS; o ffmpeg junta imagens e áudio num MP4. Roteiros, tabela de atalhos e desenho das telas são módulos separados; o gerador só os conecta.

**Tech Stack:** Node 22 (ESM, `node:test`), Playwright 1.63 com Chromium já instalados, Python 3.13 com `kokoro-onnx`, `soundfile` e `num2words`, ffmpeg (libx264, aac).

**Spec:** `docs/superpowers/specs/2026-11-11-videoaulas-office-libreoffice-design.md`

## Global Constraints

- Vídeo 1280×720, 10 quadros por segundo, H.264 `yuv420p`, `-movflags +faststart`; áudio AAC mono 64 kbps.
- Cada aula dura de 8 a 12 minutos; meta de até 15 MB, limite rígido de 50 MB por arquivo.
- Voz Kokoro `pf_dora`, `lang='pt-br'`, volume com `loudnorm=I=-17:TP=-1.5:LRA=11` (igual a `ebook/historia-src/voz/gerar_voz.py`).
- Todo texto visível e falado em português do Brasil. Nomes de guias, menus e comandos como nas versões 2019 (Office) e 7 (LibreOffice) em português.
- Nenhuma aula afirma o que o edital pede nem atribui questão a prova real; usar "como as bancas costumam cobrar" e "no estilo da banca".
- Atalho nunca é digitado dentro de um roteiro: a cena cita a ação e a tela busca as teclas em `src/atalhos.mjs`.
- Fontes das telas: Inter (interface), JetBrains Mono (teclas e fórmulas), Carlito (texto dentro do "documento"). Todas já instaladas no sistema; nada de fonte remota.
- Modelos de voz, WAV e PNG intermediários ficam em `videoaulas/.trabalho/`, fora do Git. Os MP4 entram no Git na `main`, sem LFS.
- Mensagens de commit em inglês, com o rodapé de atribuição da sessão.
- Playwright é carregado com `createRequire(import.meta.url)('playwright')` (a instalação é global e o `import` de ESM não a encontra).

## Review Focus

1. **Texto que não cabe na tela** (balão, alternativa ou fala longa): deve parar a geração dizendo aula e cena, nunca sair cortado no vídeo. Teste na Tarefa 4.
2. **Símbolos lidos errado pela voz** (`Ctrl+N`, `F5`, `.docx`, `A1:B3`, `;`, `=SOMA(...)`): a fala gravada deve dizer o nome das teclas e dos sinais. Testes na Tarefa 2.
3. **Áudio e imagem fora de sincronia no fim de uma aula de 10 minutos**: a duração de cada cena é múltiplo exato de 0,1 s e igual no áudio e no vídeo. Teste na Tarefa 5.
4. **Geração que falha no meio**: o MP4 bom anterior continua no lugar; nunca fica um arquivo truncado. Teste na Tarefa 5.
5. **Roteiro editado mas áudio antigo reaproveitado**: o cache é por conteúdo (texto falável + voz); mudar uma palavra regrava a cena. Teste na Tarefa 3.

## Estrutura de arquivos

```
videoaulas/
  build.sh               prepara dependências e modelos, chama build.mjs
  build.mjs              linha de comando: valida, grava, renderiza, monta, confere
  .gitignore             .trabalho/
  src/roteiro.mjs        validação de aula e cena
  src/atalhos.mjs        tabela única de atalhos
  src/pronuncia.mjs      texto escrito -> texto falável
  src/voz.py             Kokoro: lista de falas -> WAV
  src/voz.mjs            cache por conteúdo e chamada do voz.py
  src/telas/tela.html    página que desenha uma cena
  src/telas/tela.css
  src/telas/tela.js      window.desenhar(cena, meta)
  src/render.mjs         Playwright: cenas -> PNG
  src/tempo.mjs          linha do tempo e junção de WAV
  src/montar.mjs         ffmpeg e conferência com ffprobe
  src/aulas/01-visao-geral.mjs … 09-atalhos.mjs
  test/*.test.mjs
  aula-01-visao-geral.mp4 … aula-09-atalhos.mp4
```

Todos os testes rodam com `node --test videoaulas/test/`.

---

### Task 1: Formato do roteiro e tabela de atalhos

**Files:**
- Create: `videoaulas/src/roteiro.mjs`, `videoaulas/src/atalhos.mjs`, `videoaulas/.gitignore`
- Test: `videoaulas/test/roteiro.test.mjs`, `videoaulas/test/atalhos.test.mjs`

**Interfaces:**
- Produces:
  - `ATALHOS: Record<string, {nome: string, office: string|null, libre: string|null, onde: 'geral'|'texto'|'planilha'|'slides'}>` em `atalhos.mjs`. Teclas escritas como `Ctrl+Shift+S`.
  - `validarAula(aula, atalhos): string[]` (lista de erros, vazia se válida), cada erro no formato `aula 3, cena 12: mensagem`.
  - `TIPOS: string[]` = `capa, secao, janela, planilha, teclas, compara, lista, pegadinha, questao`.
  - `LIMITE_FALA = 300` (caracteres).
- Formato da aula: `{ n: 1, slug: 'visao-geral', titulo: string, cenas: Cena[] }`.
- Formato da cena: `{ fala: string, voz?: string, tela: { tipo, ... } }`. `voz` substitui `fala` só no áudio.
- Campos de `tela` por tipo:
  - `capa`: `titulo`, `subtitulo`
  - `secao`: `titulo`, `itens?: string[]`
  - `janela`: `app: 'word'|'excel'|'powerpoint'|'writer'|'calc'|'impress'`, `aba: string` (guia ativa no Office, menu aberto no LibreOffice), `itens: string[] | {grupo: string, itens: string[]}[]`, `destaque?: string`, `balao?: string`
  - `planilha`: `app: 'excel'|'calc'`, `celulas: Record<string, string|number>`, `em: string`, `formula?: string`, `resultado?: string`, `destaque?: string[]`, `nota?: string`
  - `teclas`: `acoes: string[]` (chaves de `ATALHOS`), `titulo?: string`
  - `compara`: `titulo`, `office: string[]`, `libre: string[]`
  - `lista`: `titulo`, `itens: string[]`
  - `pegadinha`: `titulo`, `texto`
  - `questao`: `enunciado`, `alternativas: string[5]`, `correta: 0..4`, `gabarito: boolean`, `comentario?: string`

- [ ] **Step 1: Escrever os testes que falham** em `roteiro.test.mjs`:
  - aula válida mínima (uma `capa`) → `[]`;
  - cena sem `fala` → erro contendo `cena 1` e `fala`;
  - `fala` com 301 caracteres → erro contendo `300`;
  - `tipo: 'video'` → erro contendo `tipo`;
  - `teclas` com `acoes: ['inexistente']` → erro contendo `inexistente`;
  - `janela` com `destaque` que não está em `itens` → erro contendo o nome do destaque;
  - `questao` com 4 alternativas ou `correta: 5` → erro;
  - `planilha` com `em: 'AA'` (referência inválida) → erro;
  - aula sem `cenas` ou com lista vazia → erro.
  Em `atalhos.test.mjs`: toda entrada tem `nome` e ao menos um de `office`/`libre`; toda tecla casa com `/^(Ctrl\+|Shift\+|Alt\+)*(F\d{1,2}|[A-Z0-9]|Enter|Espaço|Home|End|PgUp|PgDn|Esc|Tab|[=;.,*<>\[\]+-])$/`; as 7 pegadinhas clássicas têm os valores da tabela abaixo.
- [ ] **Step 2: Rodar** `node --test videoaulas/test/` → FALHA (módulos não existem).
- [ ] **Step 3: Implementar `validarAula` e `ATALHOS`.** Valores iniciais da tabela (conferidos na Tarefa 6; se a documentação oficial divergir, vale a documentação):

  | chave | ação | Office 2019 pt-BR | LibreOffice 7 | onde |
  |---|---|---|---|---|
  | novo | Novo documento | Ctrl+O | Ctrl+N | geral |
  | abrir | Abrir | Ctrl+A | Ctrl+O | geral |
  | salvar | Salvar | Ctrl+B | Ctrl+S | geral |
  | salvarComo | Salvar como | F12 | Ctrl+Shift+S | geral |
  | imprimir | Imprimir | Ctrl+P | Ctrl+P | geral |
  | fechar | Fechar documento | Ctrl+W | Ctrl+W | geral |
  | sair | Sair do programa | Alt+F4 | Ctrl+Q | geral |
  | desfazer | Desfazer | Ctrl+Z | Ctrl+Z | geral |
  | refazer | Refazer | Ctrl+R | Ctrl+Y | geral |
  | selecionarTudo | Selecionar tudo | Ctrl+T | Ctrl+A | geral |
  | copiar / recortar / colar | Copiar, Recortar, Colar | Ctrl+C, Ctrl+X, Ctrl+V | iguais | geral |
  | colarEspecial | Colar especial | Ctrl+Alt+V | Ctrl+Shift+V | geral |
  | negrito | Negrito | Ctrl+N | Ctrl+B | geral |
  | italico | Itálico | Ctrl+I | Ctrl+I | geral |
  | sublinhado | Sublinhado | Ctrl+S | Ctrl+U | geral |
  | localizar | Localizar | Ctrl+L | Ctrl+F | geral |
  | substituir | Localizar e substituir | Ctrl+U | Ctrl+H | geral |
  | ortografia | Ortografia e gramática | F7 | F7 | geral |
  | hiperlink | Inserir hiperlink | Ctrl+K | Ctrl+K | geral |
  | ajuda | Ajuda | F1 | F1 | geral |
  | esquerda | Alinhar à esquerda | Ctrl+Q | Ctrl+L | texto |
  | centralizar | Centralizar | Ctrl+E | Ctrl+E | texto |
  | direita | Alinhar à direita | Ctrl+G | Ctrl+R | texto |
  | justificar | Justificar | Ctrl+J | Ctrl+J | texto |
  | quebraPagina | Quebra de página | Ctrl+Enter | Ctrl+Enter | texto |
  | marcas | Mostrar marcas de formatação | Ctrl+* | Ctrl+F10 | texto |
  | maiusculas | Alternar maiúsculas e minúsculas | Shift+F3 | Shift+F3 | texto |
  | sobrescrito | Sobrescrito | Ctrl+Shift++ | Ctrl+Shift+P | texto |
  | subscrito | Subscrito | Ctrl+= | Ctrl+Shift+B | texto |
  | alteracoes | Controlar/registrar alterações | Ctrl+Shift+E | Ctrl+Shift+C | texto |
  | navegador | Navegador | — | F5 | texto |
  | estilos | Painel de estilos | — | F11 | texto |
  | inserirTabela | Inserir tabela | — | Ctrl+F12 | texto |
  | limparFormatacao | Limpar formatação direta | — | Ctrl+M | texto |
  | editarCelula | Editar a célula | F2 | F2 | planilha |
  | refAbsoluta | Alternar referência relativa/absoluta | F4 | F4 | planilha |
  | formatarCelulas | Formatar células | Ctrl+1 | Ctrl+1 | planilha |
  | dataAtual | Inserir a data de hoje | Ctrl+; | Ctrl+; | planilha |
  | filtro | Filtro / Autofiltro | Ctrl+Shift+L | Ctrl+Shift+L | planilha |
  | autoSoma | AutoSoma | Alt+= | Alt+= | planilha |
  | inserirFuncao | Inserir função / Assistente de funções | Shift+F3 | Ctrl+F2 | planilha |
  | recalcular | Recalcular | F9 | F9 | planilha |
  | proximaPlanilha | Próxima planilha | Ctrl+PgDn | Ctrl+PgDn | planilha |
  | inicioApresentacao | Apresentar desde o primeiro slide | F5 | F5 | slides |
  | slideAtual | Apresentar a partir do slide atual | Shift+F5 | Shift+F5 | slides |
  | novoSlide | Novo slide | Ctrl+M | Ctrl+M | slides |
  | encerrar | Encerrar a apresentação | Esc | Esc | slides |

- [ ] **Step 4: Rodar** `node --test videoaulas/test/` → PASSA.
- [ ] **Step 5: Commit** (`Add lesson script format and shortcut table for the video lessons`).

### Task 2: Pronúncia

**Files:**
- Create: `videoaulas/src/pronuncia.mjs`
- Test: `videoaulas/test/pronuncia.test.mjs`

**Interfaces:**
- Produces: `falavel(texto: string): string`. Números ficam em algarismos (o `voz.py` os converte com `num2words`).

- [ ] **Step 1: Testes que falham**, com estas entradas e saídas exatas:
  - `'Ctrl+N'` → `'control ene'`; `'Ctrl+Shift+S'` → `'control xift esse'`; `'Alt+F4'` → `'alt efe 4'`
  - `'F12'` → `'efe 12'`; `'Ctrl+Enter'` → `'control ênter'`; `'Ctrl+;'` → `'control ponto e vírgula'`
  - `'.docx'` → `'ponto doc xis'`; `'.odt'` → `'ponto ó dê tê'`; `'.xlsx'` → `'ponto xis éle esse xis'`; `'.ods'` → `'ponto ó dê esse'`; `'.pptx'` → `'ponto pê pê tê xis'`; `'.odp'` → `'ponto ó dê pê'`; `'PDF'` → `'pê dê efe'`
  - `'A1:B3'` → `'a 1 até bê 3'`; `'$A$1'` → `'cifrão a cifrão 1'`
  - `'=SOMA(A1;A3)'` → `'igual soma, abre parênteses, a 1, ponto e vírgula, a 3, fecha parênteses'`
  - `'PROCV'` → `'proc vê'`; `'CONT.SE'` → `'cont ponto se'`; `'SOMASE'` → `'soma se'`
  - `'Writer'` → `'ráiter'`; `'Calc'` → `'cálc'`; `'Impress'` → `'imprés'`; `'Excel'` → `'ecsél'`; `'PowerPoint'` → `'páuer póint'`; `'LibreOffice'` → `'libre ófice'`; `'Office'` → `'ófice'`; `'Word'` → `'uârd'`; `'AOCP'` → `'a ó cê pê'`; `'PMPE'` → `'pê eme pê é'`
  - texto comum sem símbolos volta igual; aspas e parênteses são tratados como no `falavel` do `gerar_voz.py`.
- [ ] **Step 2: Rodar** → FALHA.
- [ ] **Step 3: Implementar `falavel`.** Ordem das substituições: fórmulas (começam com `=`), intervalos e referências de célula, combinações de teclas, extensões, léxico de nomes. Letra isolada só vira nome de letra dentro de combinação de teclas ou referência de célula.
- [ ] **Step 4: Rodar** → PASSA.
- [ ] **Step 5: Commit** (`Add pronunciation rules for the video lessons narration`).

### Task 3: Voz

**Files:**
- Create: `videoaulas/src/voz.py`, `videoaulas/src/voz.mjs`, `videoaulas/build.sh`
- Test: `videoaulas/test/voz.test.mjs`

**Interfaces:**
- Consumes: `falavel` (Tarefa 2).
- Produces:
  - `chaveDaFala(cena, voz = 'pf_dora'): string` → 16 caracteres hexadecimais do SHA-1 de `voz + '\n' + falavel(cena.voz ?? cena.fala)`.
  - `gravarFalas(cenas, dirTrabalho, {gravar} = {}): Promise<{wav: string, duracao: number}[]>` na ordem das cenas. `gravar(lista, dirSaida)` é o gravador (padrão: o `voz.py`), trocável nos testes. Grava só as chaves cujo `<dirTrabalho>/voz/<chave>.wav` não existe; chama `python3 src/voz.py` uma vez por execução.
  - `voz.py --modelos DIR --saida DIR --voz pf_dora < JSON [{chave, texto}]`: grava `<chave>.wav` (24 kHz, mono, PCM 16 bits, 0,06 s de silêncio antes e 0,12 s depois, `loudnorm` das Global Constraints) e imprime um JSON `{chave: segundos}`. Converte algarismos com `num2words(lang='pt_BR')`. Sem os modelos, sai com código 2 e a mensagem `Modelos de voz não encontrados em DIR. Rode videoaulas/build.sh com internet.`
  - `build.sh [n…]`: instala `kokoro-onnx soundfile num2words` se faltarem, baixa `kokoro-v1.0.onnx` e `voices-v1.0.bin` de `https://github.com/thewh1teagle/kokoro-onnx/releases/download/model-files-v1.0/` para `videoaulas/.trabalho/modelos/` se faltarem (reserva: `https://huggingface.co/fastrtc/kokoro-onnx/resolve/main/`), e roda `node build.mjs "$@"`.

- [ ] **Step 1: Testes que falham:** `chaveDaFala` é estável; muda quando muda uma palavra da fala; muda quando muda a voz; usa `voz` no lugar de `fala` quando existe; duas falas escritas diferente mas com o mesmo texto falável têm a mesma chave. `gravarFalas` com um gravador falso injetado não regrava chave cujo WAV já existe.
- [ ] **Step 2: Rodar** → FALHA.
- [ ] **Step 3: Implementar** `voz.mjs`, `voz.py` e `build.sh`.
- [ ] **Step 4: Rodar os testes** → PASSA.
- [ ] **Step 5: Teste real:** rodar a parte de preparo do `build.sh`, gravar a fala `Negrito no Word é Ctrl+N; no Writer, Ctrl+B.` e conferir com `ffprobe` que o WAV tem 24000 Hz, 1 canal e de 3 a 8 segundos; `ffmpeg -af volumedetect` com `mean_volume` entre −30 e −12 dB.
- [ ] **Step 6: Commit** (`Add Kokoro narration with content-based caching for the video lessons`).

### Task 4: Telas

**Files:**
- Create: `videoaulas/src/telas/tela.html`, `tela.css`, `tela.js`, `videoaulas/src/render.mjs`
- Test: `videoaulas/test/render.test.mjs`

**Interfaces:**
- Consumes: `ATALHOS`, formato de cena (Tarefa 1).
- Produces:
  - No navegador: `window.desenhar(cena, meta): {transbordou: string[]}`, onde `meta = {n, titulo, indice, total, atalhos}` e `transbordou` lista os blocos cujo conteúdo passou do espaço (`scrollHeight > clientHeight` ou `scrollWidth > clientWidth` em todo elemento com `data-caber`, mais o palco inteiro).
  - `renderizarCenas(aula, dirTrabalho): Promise<string[]>` (caminhos dos PNG, na ordem). PNG 1280×720, `deviceScaleFactor: 1`, espera `document.fonts.ready`. Cache em `<dirTrabalho>/png/<hash>.png`, hash do JSON da cena + meta + conteúdo dos três arquivos de `telas/`. Se `transbordou` não for vazio, lança erro `aula N, cena M: texto não cabe em <bloco>`.
- Desenho:
  - Palco 1280×720. Faixa superior de 48 px com `Aula N · título` e `cena/total`; rodapé de 132 px com a fala em até 3 linhas (Inter 24 px); área útil no meio.
  - Cores de identidade por programa: Word `#2B579A`, Excel `#217346`, PowerPoint `#B7472A`, LibreOffice Writer `#0369A3`, Calc `#43A047`, Impress `#D0530F`. Fundo do palco `#F3F4F6`, texto `#111827`, destaque `#FFD43B` com contorno `#B45309`.
  - `janela` Office: barra de título na cor do programa, linha de guias com a ativa marcada, faixa de opções com grupos nomeados e itens em botões. `janela` LibreOffice: barra de menus com o menu `aba` aberto em lista suspensa com os `itens`, e barra de ferramentas genérica abaixo. O `destaque` ganha fundo de destaque e o `balao` aponta para ele.
  - `planilha`: caixa de nome com `em`, barra de fórmulas com `formula`, grade de colunas A–F e linhas 1–8; `destaque` pinta os intervalos; `resultado` aparece na célula `em`.
  - `teclas`: uma linha por ação, com o nome à esquerda e duas colunas, **Office 2019** e **LibreOffice 7**, cada tecla num "botão" em JetBrains Mono; `—` quando não há atalho padrão; fundo de destaque na linha em que as duas colunas diferem.
  - `compara`: duas colunas com cabeçalho nas cores das suítes. `questao`: enunciado, 5 alternativas com letras A–E; com `gabarito: true`, a correta fica verde (`#1C6E45`) e aparece o `comentario`.

- [ ] **Step 1: Testes que falham** (usam Playwright de verdade):
  - uma cena de cada um dos 9 tipos gera PNG 1280×720 (ler as dimensões no cabeçalho do PNG) e `transbordou` vazio;
  - `janela` com `balao` de 600 caracteres → `renderizarCenas` rejeita com mensagem contendo `aula 1, cena 1` e `não cabe`;
  - `questao` com alternativas de 250 caracteres → rejeita;
  - fala de 300 caracteres (o limite) cabe no rodapé;
  - `teclas` com `['negrito', 'italico']`: o texto da página contém `Ctrl+N` e `Ctrl+B`, e só a linha do negrito tem a classe de diferença;
  - renderizar a mesma cena duas vezes devolve o mesmo caminho sem refazer o arquivo (mesma data de modificação).
- [ ] **Step 2: Rodar** → FALHA.
- [ ] **Step 3: Implementar** as telas e `render.mjs`.
- [ ] **Step 4: Rodar** → PASSA.
- [ ] **Step 5: Revisão visual:** gerar um PNG de cada tipo para os seis programas, abrir cada imagem e corrigir desalinhamento, texto pequeno demais (mínimo de 20 px em qualquer texto de conteúdo) e contraste.
- [ ] **Step 6: Commit** (`Add drawn screens and Playwright rendering for the video lessons`).

### Task 5: Linha do tempo, montagem e linha de comando

**Files:**
- Create: `videoaulas/src/tempo.mjs`, `videoaulas/src/montar.mjs`, `videoaulas/build.mjs`
- Test: `videoaulas/test/tempo.test.mjs`, `videoaulas/test/montar.test.mjs`

**Interfaces:**
- Consumes: `validarAula`, `gravarFalas`, `renderizarCenas`.
- Produces:
  - `linhaDoTempo(duracoes: number[], {pausa = 0.4, fps = 10} = {}): {inicio: number, duracao: number}[]`, com `duracao = ceil((d + pausa) * fps) / fps`.
  - `juntarWav(wavs: string[], duracoes: number[], saida: string): void`: concatena os WAV PCM 16 bits mono 24 kHz, completando cada um com silêncio até `duracao * 24000` amostras exatas.
  - `montarAula({pngs, audio, linha, saida, ffmpeg = 'ffmpeg'}): Promise<void>`: lista para o concat demuxer (`file` + `duration`, último arquivo repetido), codifica com os parâmetros das Global Constraints mais `-tune stillimage -crf 23`, grava em `<saida>.parcial.mp4`, confere e só então renomeia para `saida`.
  - `conferirMp4(caminho): Promise<{duracao: number, bytes: number, video: boolean, audio: boolean}>` via `ffprobe`; `problemasDoMp4(info, {min = 480, max = 720, limite = 50e6}): string[]`.
  - `node build.mjs [n…] [--texto] [--sem-limite]`: sem números, gera todas as aulas de `src/aulas/`. `--texto` só imprime o texto falável de cada cena. `--sem-limite` não reprova duração fora de 8–12 min (usado em testes). Código de saída diferente de zero em qualquer erro, com aula e cena na mensagem.

- [ ] **Step 1: Testes que falham:**
  - `linhaDoTempo([1.23, 2.0, 0.07])` → durações `[1.7, 2.4, 0.5]` e inícios `[0, 1.7, 4.1]` (comparar com tolerância de 1e-9);
  - com 600 durações pseudoaleatórias, todo `duracao * 10` é inteiro e o último `inicio + duracao` é igual à soma;
  - `juntarWav` com dois WAV sintéticos de 0,25 s e 0,31 s e durações `[0.7, 0.8]` gera um WAV com exatamente 36000 amostras;
  - `problemasDoMp4` reprova 7 min, 13 min, 51 MB, sem áudio, sem vídeo, e aprova 10 min com 12 MB;
  - `montarAula` com `ffmpeg: 'false'` rejeita e um `saida` já existente continua com o mesmo conteúdo, sem `.parcial.mp4` sobrando;
  - ponta a ponta com voz falsa (WAV de tom gerado no teste): aula de 3 cenas vira MP4 com vídeo 1280×720, áudio, e duração igual à da linha do tempo com tolerância de 0,15 s.
- [ ] **Step 2: Rodar** → FALHA.
- [ ] **Step 3: Implementar** `tempo.mjs`, `montar.mjs` e `build.mjs`.
- [ ] **Step 4: Rodar** → PASSA.
- [ ] **Step 5: Commit** (`Add timeline, assembly and command line for the video lessons`).

### Task 6: Conferir a tabela de atalhos e produzir a aula 1

**Files:**
- Create: `videoaulas/src/aulas/01-visao-geral.mjs`, `videoaulas/aula-01-visao-geral.mp4`
- Modify: `videoaulas/src/atalhos.mjs`, `README.md`
- Test: `videoaulas/test/aulas.test.mjs`

**Interfaces:**
- Consumes: tudo das tarefas 1 a 5.
- Produces: `aulas.test.mjs`, que carrega todo arquivo de `src/aulas/` e exige: `validarAula` sem erros; `n` e `slug` batendo com o nome do arquivo; de 2 a 3 perguntas por aula, cada uma em duas cenas `questao` seguidas com o mesmo enunciado (a primeira com `gabarito: false`, a segunda com `gabarito: true`); nenhum texto com a palavra `edital`.

- [ ] **Step 1: Conferir cada linha da tabela de atalhos** na documentação oficial (suporte da Microsoft em português para Word, Excel e PowerPoint; ajuda do LibreOffice 7 em português para Writer, Calc e Impress). Corrigir o que divergir e ajustar o teste de `atalhos`. Anotar num comentário no topo de `atalhos.mjs` a fonte de cada grupo e, se algum não pôde ser conferido, a lista deles.
- [ ] **Step 2: Escrever `aulas.test.mjs`** e rodar → FALHA (não há aulas).
- [ ] **Step 3: Escrever o roteiro da aula 1** com os tópicos da spec (suítes, programas equivalentes, licença, extensões, faixa de opções x menus, onde ficam salvar/abrir/imprimir/exportar) e o bloco "Como cai na prova".
- [ ] **Step 4: Rodar** `node --test videoaulas/test/` → PASSA. Rodar `node videoaulas/build.mjs 1 --texto` e ler o texto falável inteiro, corrigindo pronúncia no roteiro (`voz`) ou em `pronuncia.mjs`.
- [ ] **Step 5: Gerar** `./videoaulas/build.sh 1` → `aula-01-visao-geral.mp4` com duração entre 8 e 12 min e menos de 15 MB. Conferir o áudio: `ffmpeg -i <mp4> -af silencedetect=d=3 -f null -` sem nenhum silêncio de 3 s ou mais, e `volumedetect` com `mean_volume` entre −30 e −12 dB.
- [ ] **Step 6: Revisão visual:** extrair um quadro de cada cena (`ffmpeg -ss <inicio + 0.2>`), abrir todos e corrigir o que estiver errado ou feio; regerar.
- [ ] **Step 7: Acrescentar ao `README.md`** a seção "Videoaulas – Office 2019 e LibreOffice 7": lista das aulas, como assistir, como editar um roteiro e gerar de novo.
- [ ] **Step 8: Commit e push** (`Add video lesson 1: overview of Office 2019 and LibreOffice 7`).
- [ ] **Step 9: Enviar a aula 1 ao usuário** e pedir a avaliação da voz e do visual. Ajustes pedidos entram antes da Tarefa 7.

### Tasks 7 a 14: Aulas 2 a 9

Uma tarefa por aula, na ordem, cada uma com o mesmo procedimento:

| Tarefa | Arquivo do roteiro | MP4 | Tópicos (da spec) |
|---|---|---|---|
| 7 | `02-word.mjs` | `aula-02-word.mp4` | Word 2019 |
| 8 | `03-writer.mjs` | `aula-03-writer.mp4` | Writer 7 |
| 9 | `04-excel.mjs` | `aula-04-excel.mp4` | Excel 2019 |
| 10 | `05-calc.mjs` | `aula-05-calc.mp4` | Calc 7 |
| 11 | `06-funcoes.mjs` | `aula-06-funcoes.mp4` | Funções de planilha |
| 12 | `07-powerpoint.mjs` | `aula-07-powerpoint.mp4` | PowerPoint 2019 |
| 13 | `08-impress.mjs` | `aula-08-impress.mp4` | Impress 7 |
| 14 | `09-atalhos.mjs` | `aula-09-atalhos.mp4` | Atalhos lado a lado |

- [ ] **Step 1: Escrever o roteiro** cobrindo todos os tópicos que a spec lista para a aula. Nomes de guias, grupos, menus e comandos conferidos na documentação oficial. Na aula 6, cada função tem uma cena `planilha` com dados, fórmula e resultado calculado à mão e conferido. Na aula 9, toda entrada de `ATALHOS` aparece em alguma cena `teclas`.
- [ ] **Step 2: Rodar** `node --test videoaulas/test/` → PASSA. (Aula 6: acrescentar ao `aulas.test.mjs` um teste que recalcula o `resultado` das cenas de SOMA, MÉDIA, MÁXIMO, MÍNIMO, CONT.NÚM e CONT.SE a partir de `celulas`. Aula 9: teste de que todas as chaves de `ATALHOS` são usadas.)
- [ ] **Step 3: Ler o texto falável** (`--texto`) e corrigir pronúncia.
- [ ] **Step 4: Gerar** `./videoaulas/build.sh N` → duração entre 8 e 12 min, menos de 15 MB, e a mesma conferência de áudio da Tarefa 6 (sem silêncio de 3 s ou mais, volume médio entre −30 e −12 dB).
- [ ] **Step 5: Revisão visual** de um quadro por cena; corrigir e regerar.
- [ ] **Step 6: Atualizar a lista no `README.md`**, commit e push (`Add video lesson N: <tema>`).

### Task 15: Conferência final

- [ ] **Step 1:** `node --test videoaulas/test/` → tudo passa.
- [ ] **Step 2:** apagar `videoaulas/.trabalho/png` e `voz`, rodar `./videoaulas/build.sh` inteiro e confirmar que os 9 MP4 são gerados e aprovados pela conferência (prova de que "gerar tudo de novo com um comando" funciona).
- [ ] **Step 3:** tabela final com duração e tamanho de cada aula; soma abaixo de 135 MB.
- [ ] **Step 4:** percorrer a spec item por item e marcar onde cada um foi atendido; listar o que não pôde ser verificado (qualidade da voz ao ouvido, atalhos sem fonte acessível).
- [ ] **Step 5:** commit e push de qualquer ajuste; relatório ao usuário.
