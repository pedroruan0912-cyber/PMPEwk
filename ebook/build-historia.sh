#!/usr/bin/env bash
# Monta o desenho animado da História de Pernambuco em um único arquivo HTML a partir de historia-src/.
#   ./build-historia.sh                 -> gera historia-pernambuco-desenho.html (documento completo)
#   ./build-historia.sh caminho.html    -> também gera um fragmento sem <html>/<head>/<body> (para publicar como Artifact)
# A narração gravada fica em historia-voz/ (um arquivo por episódio) e é carregada pela página sob demanda;
# para regravar depois de mudar um texto, veja historia-src/voz/gerar_voz.py.
set -euo pipefail
cd "$(dirname "$0")"

SRC=historia-src
PARTS=(01-open.html)
SCRIPTS=(10-art.js 20-cenas-1.js 21-cenas-2.js 22-cenas-3.js 23-cenas-4.js 24-cenas-5.js 99-app.js)
OUT=historia-pernambuco-desenho.html

body() {
  for p in "${PARTS[@]}"; do cat "$SRC/$p"; done
  echo '<script>'
  for s in "${SCRIPTS[@]}"; do [ -f "$SRC/$s" ] && { cat "$SRC/$s"; echo; }; done
  echo '</script>'
}

{
  echo '<!doctype html>'
  echo '<html lang="pt-BR">'
  echo '<head>'
  echo '<meta charset="utf-8">'
  echo '<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">'
  cat "$SRC/00-head.html"
  echo '<style>[hidden]{display:none!important}img{max-width:100%}html,body{min-height:100%}</style>'
  echo '</head>'
  echo '<body>'
  body
  echo '</body>'
  echo '</html>'
} > "$OUT"

if [ "${1:-}" != "" ]; then
  { cat "$SRC/00-head.html"; body; } > "$1"
fi

echo "ok: $OUT ($(wc -c < "$OUT") bytes)"
