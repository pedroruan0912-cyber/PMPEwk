# Videoaula – Direitos Humanos PMPE (Turma Avançada) – 60 questões comentadas

Resolução narrada das 60 questões do material do professor Daniel Cândido (CPPEM), em duas partes:

| Arquivo | Conteúdo |
| --- | --- |
| `direitos-humanos-pmpe-parte1.mp4` | Questões 01 a 30 |
| `direitos-humanos-pmpe-parte2.mp4` | Questões 31 a 60 |
| `direitos-humanos-pmpe-parteN-capitulos.txt` | Minutagem de cada questão (os MP4 também têm capítulos embutidos) |

Em cada questão a aula lê o enunciado e as alternativas (com a alternativa da vez em destaque), dá uma pausa para o aluno responder e depois comenta letra por letra, a partir do gabarito.

## Como foi feita

- **Imagem:** os próprios slides dos dois PDFs, com um realce dourado na alternativa que está sendo lida ou comentada.
- **Narração:** voz sintética em português do Brasil (RHVoice, voz Letícia), gerada a partir do texto dos slides. O roteiro converte a escrita jurídica em fala ("art. 5º, § 2º" → "artigo quinto, parágrafo segundo"; "art. 1º, III" → "artigo primeiro, inciso três"; "DUDH" → "Declaração Universal").
- **Resolução 60:** o PDF termina no enunciado da questão 60, sem a resolução. O slide e o comentário dessa questão (gabarito E) foram escritos para a videoaula e estão identificados no próprio slide.

## Gerar de novo

```bash
sudo apt install poppler-utils ffmpeg rhvoice rhvoice-brazilian-portuguese
```

```bash
python3 videoaula/gerar.py PARTE1.pdf PARTE2.pdf
```

`roteiro.py` monta a narração (rode `python3 videoaula/roteiro.py PARTE1.pdf PARTE2.pdf` para ler o roteiro completo); `gerar.py` sintetiza a voz, desenha os quadros e codifica os vídeos. Os textos de abertura, de encerramento e da resolução 60 ficam no início de `gerar.py`.
