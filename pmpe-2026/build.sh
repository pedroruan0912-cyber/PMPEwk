#!/usr/bin/env bash
# Monta o material completo da prova objetiva (6 disciplinas) em um único HTML.
# Reaproveita o módulo de Direitos Humanos e Legislação Extravagante de ../ebook/src.
#   ./build.sh   -> gera pmpe-soldado-2026.html
set -euo pipefail
cd "$(dirname "$0")"

SRC=src
DH=../ebook/src
PARTS=(
  "$SRC/02-open.html"
  "$SRC/lp1-3.html" "$SRC/lp4-6.html"
  "$SRC/hpe.html"
  "$SRC/rlm.html"
  "$SRC/inf.html"
  "$SRC/dc1-3.html" "$SRC/dc4-6.html"
  "$DH/c01-03.html" "$DH/c04-05.html" "$DH/c06.html" "$DH/c07-08.html"
  "$DH/c09-10.html" "$DH/c11-13.html" "$DH/c14-17.html"
  "$SRC/dh-eca-lei.html" "$SRC/dh-mp-lei.html"
  "$SRC/90-tools.html"
)
SCRIPTS=(
  "$DH/flash.js" "$SRC/flash2.js"
  "$SRC/qn-lp.js" "$SRC/qn-hpe.js" "$SRC/qn-rlm.js" "$SRC/qn-inf.js" "$SRC/qn-dc.js"
  "$DH/q1.js" "$DH/q2.js" "$DH/q3.js" "$DH/q4.js" "$DH/q5.js" "$DH/q6.js"
  "$SRC/99-app.js"
)
OUT=pmpe-soldado-2026.html

{
  echo '<!doctype html>'
  echo '<html lang="pt-BR">'
  echo '<head>'
  echo '<meta charset="utf-8">'
  echo '<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">'
  echo '<meta name="description" content="Material interativo completo da prova objetiva de Soldado PMPE 2026 (Instituto AOCP): teoria, letra da lei, bizus, questões e simulado.">'
  cat "$SRC/00-head.html"
  cat "$SRC/01-style.html"
  echo '<style>[hidden]{display:none!important}img{max-width:100%}</style>'
  echo '</head>'
  echo '<body>'
  for p in "${PARTS[@]}"; do cat "$p"; done
  echo '<script>'
  for s in "${SCRIPTS[@]}"; do cat "$s"; echo; done
  echo '</script>'
  echo '</body>'
  echo '</html>'
} > "$OUT"

echo "ok: $OUT ($(wc -c < "$OUT") bytes)"
