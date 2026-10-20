#!/usr/bin/env bash
# Monta o e-book de redação em um único arquivo HTML a partir de redacao-src/.
#   ./build-redacao.sh                 -> gera redacao-pmpe-aocp.html (documento completo)
#   ./build-redacao.sh caminho.html    -> também gera um fragmento sem <html>/<head>/<body> (para publicar como Artifact)
set -euo pipefail
cd "$(dirname "$0")"

SRC=redacao-src
OUT=redacao-pmpe-aocp.html
PARTS=(01-open.html c03-05.html c06-07.html c08-12.html 90-tools.html)
SCRIPTS=(modelos.js repertorios.js temas.js quiz.js 99-app.js)

body() {
  for p in "${PARTS[@]}"; do cat "$SRC/$p"; done
  echo '  </div>'
  echo '</div>'
  echo '</div>'
  echo '<script>'
  for s in "${SCRIPTS[@]}"; do cat "$SRC/$s"; echo; done
  echo '</script>'
}

{
  echo '<!doctype html>'
  echo '<html lang="pt-BR">'
  echo '<head>'
  echo '<meta charset="utf-8">'
  echo '<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">'
  cat "$SRC/00-head.html"
  echo '<style>[hidden]{display:none!important}img{max-width:100%}</style>'
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
