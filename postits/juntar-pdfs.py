"""Junta os PDFs coloridos de todos os conjuntos num arquivo só, na ordem do edital.

    python3 postits/juntar-pdfs.py

Cria postits/postits-pmpe-2026-colorido.pdf, com um marcador por conjunto
(o leitor de PDF mostra a lista na barra lateral). Precisa do pacote pypdf.
"""
import sys
from pathlib import Path

from pypdf import PdfReader, PdfWriter

PASTA = Path(__file__).resolve().parent
SAIDA = PASTA / "postits-pmpe-2026-colorido.pdf"

# Mesma ordem dos capítulos do e-book (e do conteúdo programático do edital)
CONJUNTOS = [
    ("direitos-humanos-geral", "Direitos Humanos: parte geral"),
    ("eca", "ECA"),
    ("abuso-de-autoridade", "Abuso de Autoridade"),
    ("tortura", "Tortura"),
    ("maria-da-penha", "Maria da Penha"),
    ("racismo", "Racismo"),
    ("crimes-ambientais", "Crimes Ambientais"),
    ("crimes-hediondos", "Crimes Hediondos"),
    ("lei-de-drogas", "Lei de Drogas"),
    ("estatuto-pmpe", "Estatuto da PMPE"),
    ("pessoa-idosa", "Estatuto da Pessoa Idosa"),
    ("estatuto-juventude", "Estatuto da Juventude"),
    ("sumulas-jurisprudencia", "Súmulas e Jurisprudência"),
]


def main() -> int:
    faltando = [n for n, _ in CONJUNTOS if not (PASTA / f"{n}-colorido.pdf").exists()]
    if faltando:
        print("faltam os PDFs de: " + ", ".join(faltando), file=sys.stderr)
        return 1

    escritor = PdfWriter()
    for nome, titulo in CONJUNTOS:
        inicio = len(escritor.pages)
        escritor.append(PdfReader(PASTA / f"{nome}-colorido.pdf"), import_outline=False)
        escritor.add_outline_item(titulo, inicio)
        print(f"  folhas {inicio + 1:>2}-{len(escritor.pages):>2}  {titulo}")

    escritor.page_mode = "/UseOutlines"
    escritor.add_metadata({"/Title": "Post-its PMPE 2026: Direitos Humanos e Legislação"})
    # As fontes se repetem em cada conjunto: tirar as cópias reduz o arquivo pela metade
    escritor.compress_identical_objects(remove_duplicates=True, remove_unreferenced=True)
    with open(SAIDA, "wb") as f:
        escritor.write(f)
    print(f"ok: {SAIDA.relative_to(PASTA.parent)} ({len(escritor.pages)} folhas)")
    return 0


if __name__ == "__main__":
    sys.exit(main())
