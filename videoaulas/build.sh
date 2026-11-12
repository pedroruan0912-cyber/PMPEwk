#!/usr/bin/env bash
# Gera as videoaulas (MP4) a partir dos roteiros em src/aulas/.
#   ./build.sh            -> todas as aulas
#   ./build.sh 1 4        -> só as aulas 1 e 4
#   ./build.sh --preparar -> só instala o que falta e baixa os modelos de voz
# Precisa de: node 22+, python3 com pip, ffmpeg, e Chromium com Playwright.
set -euo pipefail
cd "$(dirname "$0")"

MODELOS=.trabalho/modelos
mkdir -p "$MODELOS"

python3 -c 'import kokoro_onnx, soundfile, num2words' 2>/dev/null || {
  echo "Instalando kokoro-onnx, soundfile e num2words..."
  pip install --quiet kokoro-onnx soundfile
  # --no-deps: a única dependência do num2words (docopt) serve só à linha de comando dele
  # e não instala em alguns ambientes com Python novo.
  pip install --quiet --no-deps num2words
}

baixar() {
  local nome=$1
  [ -s "$MODELOS/$nome" ] && return 0
  echo "Baixando $nome (modelo de voz)..."
  for base in \
    https://github.com/thewh1teagle/kokoro-onnx/releases/download/model-files-v1.0 \
    https://huggingface.co/fastrtc/kokoro-onnx/resolve/main; do
    if curl -fL --retry 3 -sS -o "$MODELOS/$nome.parcial" "$base/$nome"; then
      mv "$MODELOS/$nome.parcial" "$MODELOS/$nome"
      return 0
    fi
  done
  rm -f "$MODELOS/$nome.parcial"
  echo "Não foi possível baixar $nome. Sem internet? Coloque o arquivo em videoaulas/$MODELOS/." >&2
  return 1
}
baixar kokoro-v1.0.onnx
baixar voices-v1.0.bin

[ "${1:-}" = "--preparar" ] && exit 0
exec node build.mjs "$@"
