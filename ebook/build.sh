#!/usr/bin/env bash
# Monta o e-book em um único arquivo HTML a partir de src/.
#   ./build.sh                 -> gera direitos-humanos-pmpe.html (documento completo)
#   ./build.sh caminho.html    -> também gera um fragmento sem <html>/<head>/<body> (para publicar como Artifact)
set -euo pipefail
cd "$(dirname "$0")"

SRC=src
PARTS=(01-open.html c01-03.html c04-05.html c06.html c07-08.html c09-10.html c11-13.html c14-17.html 90-tools.html)
SCRIPTS=(flash.js q1.js q2.js q3.js q4.js q5.js q6.js 99-app.js)

body() {
  for p in "${PARTS[@]}"; do cat "$SRC/$p"; done
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
} > direitos-humanos-pmpe.html

if [ "${1:-}" != "" ]; then
  { cat "$SRC/00-head.html"; body; } > "$1"
fi

echo "ok: direitos-humanos-pmpe.html ($(wc -c < direitos-humanos-pmpe.html) bytes)"
