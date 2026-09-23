#!/usr/bin/env bash
exec /home/imtraf/.local/bin/google-chrome \
  --run-all-compositor-stages-before-draw \
  --disable-threaded-animation \
  --disable-threaded-scrolling \
  --disable-gpu-rasterization \
  "$@"


